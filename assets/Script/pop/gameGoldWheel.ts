import soundController from "../soundController";
import NameTs from "../common/NameTs"
import util from "../util/util";
import { updateType } from "../common/faceTs";
import baseTs from "../base/baseTs";
import gameGoldWheelReward from "./gameGoldWheelReward"
import RewardController from "../controlelr/RewardController";
import { AssistCtr } from "../Assist/AssistCtr";
import { t } from "../Language/LanguageData";
import { ApiService } from "../tg/ApiService";
import { REWARD_TYPE } from "../common/PropConst";
import { Tools } from "../util/Tools";


//#region 抽奖 转盘
const { ccclass, property } = cc._decorator;

@ccclass
export default class gameGoldWheel extends baseTs {
    @property(cc.ProgressBar)
    private Progress: cc.ProgressBar = null; //进度

    @property([cc.Node])
    private coinItemArr: cc.Node[] = []; //金币奖励

    @property(cc.Node)
    private wheel: cc.Node = null;

    @property(cc.Node)
    private wheel_reward: cc.Node = null;

    @property(cc.Node)
    private btn_clickVideoGet: cc.Node = null;

    @property(cc.Node)
    private btnCloseNode: cc.Node = null;

    @property(cc.Node)
    private GodWheel_deng2: cc.Node = null;

    @property(cc.Node)
    private gameGoldWheelReward: cc.Node = null;

    private wheelState;//转盘当前阶段
    private curSpeed;  //当前速度
    private spinTime;//减速前旋转时间
    private gearNum;//齿轮数量
    private defaultAngle;//修正默认角度
    private gearAngle;//每个齿轮的角度
    private finalAngle;//最终结果指定的角度
    private maxSpeed;//最大速度
    private duration;//减速前旋转时间
    private acc;//加速度
    private decAngle;//减速前转动角度
    private endCallBack;//转完触发回调
    private targetId;//转动到目标值
    private wheelItems: any;
    private isCanClickWheel: boolean;
    private closeCall: any;
    private prizeData: any;

    // 转盘默认数据
    private default_rewardList = [
        { id: 0, value: 1000, type: 2 },
        { id: 1, value: 5, type: 1 },
        { id: 2, value: 2000, type: 2 },
        { id: 3, value: 10, type: 1 },
        { id: 4, value: 5000, type: 2 },
        { id: 5, value: 15, type: 1 },
        { id: 6, value: 8000, type: 2 },
        { id: 7, value: 20, type: 1 }
    ]

    private defaultTurntableStageReward = {
        current: 0,
        //status :0:未达到  //1可领 2//已领  
        rewardDetailDtoList: [
            { status: 0, node: 3, reward: 1000 },
            { status: 0, node: 6, reward: 2000 },
            { status: 0, node: 10, reward: 5000 }
        ]
    }
    // 奖励进度
    private userTurntableStageReward = null;

    onLoad() {
        this.wheelItems = {}
        this.isCanClickWheel = true;

        let turntableStageReward = util.getStorage(util.localDiary.TurntableStageReward);
        if (turntableStageReward == null) {
            let dds = JSON.stringify(this.defaultTurntableStageReward);
            util.setStorage(util.localDiary.TurntableStageReward, dds)
            this.userTurntableStageReward = this.defaultTurntableStageReward;
        } else {
            this.userTurntableStageReward = JSON.parse(turntableStageReward)
        }
        console.log("userTurntableStageReward=====>", this.userTurntableStageReward);
        this.initData();
    }

    private initData() {
        this.wheelState = 0;
        this.curSpeed = 0;
        this.spinTime = 0;//减速前旋转时间
        this.gearNum = 8;
        this.defaultAngle = 0;//修正默认角度
        this.gearAngle = 360 / this.gearNum;//每个齿轮的角度
        this.wheel.angle = this.defaultAngle;
        this.finalAngle = 0;//最终结果指定的角度
        this.maxSpeed = 15;
        this.duration = 1.5;//减速前旋转时间
        this.acc = 0.6;//加速度

        this.gameGoldWheelReward.active = false;
        this.isCanClickWheel = true;
        this.btnCloseNode.active = true;
        this.GodWheel_deng2.active = false;

        let reward_list = this.wheel_reward.children
        if (reward_list.length < 8) {
            for (let m = reward_list.length; m < 8; m++) {
                let node = cc.instantiate(reward_list[0])
                node.parent = this.wheel_reward
            }
            reward_list = this.wheel_reward.children
            for (let m = 0; m < reward_list.length; m++) {
                reward_list[m].angle = -360 / 8 * m
            }
        }

        // 设置转盘的item 数据
        this.setInitWheel()// 策划强烈要求要默认数据，不能有数据切换效果
        this.updateItem();

    }

    onDisable() {
        this.closeCall && this.closeCall()
        this.closeCall = null
    }

    setCloseCall(callback) {
        this.closeCall = callback
    }

    startWheel(targetId, endCallBack) {
        if (this.wheelState !== 0) {
            return;
        }

        this.decAngle = 360;  // 减速旋转两圈
        this.wheelState = 1;
        this.curSpeed = 0;
        this.spinTime = 0;
        this.endCallBack = endCallBack;
        this.targetId = targetId
        this.setGodWheelDeng();
        soundController.singleton.playMusic(NameTs.Gold_Wheel)
    }

    private setGodWheelDeng() {
        this.GodWheel_deng2.active = true;
        this.GodWheel_deng2.opacity = 0;
        cc.tween(this.GodWheel_deng2).delay(0.2)
            .call(() => {
                this.GodWheel_deng2.opacity = 255;
            })
            .delay(0.2)
            .call(() => {
                this.GodWheel_deng2.opacity = 0;
            })
            .union()
            .repeatForever()
            .start();

    }


    update(dt) {
        if (this.wheelState === 0) {
            return;
        }
        if (this.wheelState == 1) {
            this.spinTime += dt;
            this.wheel.angle = this.wheel.angle - this.curSpeed;
            if (this.curSpeed <= this.maxSpeed) {
                this.curSpeed += this.acc;
            } else {
                if (this.spinTime < this.duration) {
                    return;
                }
                this.finalAngle = this.targetId * this.gearAngle + this.defaultAngle;
                this.maxSpeed = this.curSpeed;
                this.wheel.angle = this.finalAngle;
                this.wheelState = 2;
            }
        } else if (this.wheelState == 2) {
            var curRo = this.wheel.angle;
            var hadRo = -(curRo - this.finalAngle);
            this.curSpeed = this.maxSpeed * ((this.decAngle - hadRo) / this.decAngle) + 0.2;
            this.wheel.angle = curRo - this.curSpeed;

            if ((this.decAngle - hadRo) <= 0) {
                this.wheelState = 0;
                this.wheel.angle = this.finalAngle;
                this.endCallBack();
                cc.Tween.stopAllByTarget(this.GodWheel_deng2);
                this.GodWheel_deng2.active = false;
                console.error("this:", this.targetId, this.gearAngle, this.prizeData)
            }
        }
    }

    private setInitWheel() {
        this.btn_clickVideoGet.active = true;
        cc.Tween.stopAllByTarget(this.btn_clickVideoGet);
        cc.tween(this.btn_clickVideoGet)
            .to(0.5, { scale: 1.2 })
            .to(0.5, { scale: 1 })
            .union()
            .repeatForever()
            .start();

        let itemData = this.wheel_reward.children;
        this.wheelItems = {};

        for (let i = 0; i < itemData.length; i++) {
            let prize = itemData[i];
            let spriteFrame = this.default_rewardList[i].type == 1 ? RewardController.instance.findPointSprite(2) : RewardController.instance.findPointSprite(1)
            if (this.default_rewardList[i].value < 1000 || this.default_rewardList[i].type == updateType.product) {
                prize.getChildByName("GodWheel_gold").getComponent(cc.Sprite).spriteFrame = spriteFrame
                prize.getChildByName("goldNum").getComponent(cc.RichText).string = `${this.default_rewardList[i].value}`;
                this.wheelItems[`${this.default_rewardList[i].id}`] = i;
            } else {
                prize.getChildByName("GodWheel_gold").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                this.wheelItems[`${this.default_rewardList[i].id}`] = i;
            }
        }
    }


    clickWheel() {
        if (!this.checkIsCanClickWheel()) {
            return;
        }
        if (this.isCanClickWheel) {
            this.isCanClickWheel = false;

            let rewardKey = Tools.GetRandom(0, this.default_rewardList.length - 1);
            //转盘结果
            let res = { "id": "1414895542793797633", "reward": { "id": "6", "value": 8000, "type": 2 }, }
            let data = this.default_rewardList[rewardKey];
            if (data && this.wheelItems) {
                this.prizeData = data;
                let prizeId = this.wheelItems[`${data.id}`];
                console.log("中奖是哪个：", prizeId, data, this.wheelItems);
                this.startWheel(prizeId, () => {
                    this.userTurntableStageReward.current += 1;
                    this.updateItem();
                    console.log("抽奖次数:", this.userTurntableStageReward.current);
                    this.openGetViewNode();
                })
                this.isCanClickWheel = true;
            }
        }
    }

    // 本地储存转盘奖励次数;
    private setTurntableStageReward() {
        let dds = JSON.stringify(this.userTurntableStageReward);
        util.setStorage(util.localDiary.TurntableStageReward, dds)
    }

    clickBtnWheel() {
        this.clickWheel();
    }

    clickWheelVideo() {
        if (!this.checkIsCanClickWheel()) {
            return;
        }

        if (this.isCanClickWheel) {
            this.isCanClickWheel = false;
            setTimeout(() => {
                this.isCanClickWheel = true;
            }, 3000);
            this.isCanClickWheel = true;
            this.clickWheel();
        }
    }

    checkIsCanClickWheel() {
        if (this.wheelState != 0 || (this.gameGoldWheelReward && this.gameGoldWheelReward.active)) {
            return false;
        }
        return true;
    }

    openGetViewNode() {
        soundController.singleton.playMusic(NameTs.Gola_Wheel_Get)
        this.gameGoldWheelReward.active = true;
        let gameGoldWheelRewardTs: gameGoldWheelReward = this.gameGoldWheelReward.getComponent(gameGoldWheelReward);
        if (gameGoldWheelRewardTs) {
            gameGoldWheelRewardTs.init(this.prizeData, () => {
            })
        }
    }



    clickClose() {
        if (this.wheelState != 0) {
            return;
        }
        cc.game.emit(NameTs.Game_Task_updata);
        soundController.singleton.clickAudio();
        this.closePage();
    }



    /**
     * 更新进度item
     */
    updateItem() {
        if (!this.userTurntableStageReward) return;
        // 玩了几次
        let playTime: number = this.userTurntableStageReward.current || 0;
        let nowState: number = 0;//当前进度
        if (playTime < 3) {
            nowState = 0;
        } else if (playTime >= 3 && playTime < 6) {
            nowState = 1;
        } else {
            nowState = 2;
        }
        this.Progress.progress = playTime / 10;
        this.userTurntableStageReward.rewardDetailDtoList.forEach((value, index) => {
            if (value.status == 0 && playTime >= value.node) {
                value.status = 1;
            }
            this.changeItemState(index, value.status);
        });

        this.setTurntableStageReward();
        console.log("this.userTurntableStageReward====", this.userTurntableStageReward);
    }

    /**
     * 领取金币奖励
     */
    async getCoinBtn(e, num) {
        if (!this.userTurntableStageReward) return;
        num = Number(num);
        let itemData = this.userTurntableStageReward.rewardDetailDtoList[num];
        if (itemData.status !== 1) { return; }
        soundController.singleton.clickAudio();
        let reward_key = 1001;
        let res = await ApiService.ins.getReward(reward_key, REWARD_TYPE.gold, itemData.reward);
        if (res.response.success) {
            itemData.status = 2;//变成已经状态
            this.changeItemState(num, 2);
            AssistCtr.showToastTip(t("tips.receive_success"));
            cc.game.emit(NameTs.Game_Effect_coin, { node: e.target, value: itemData.reward, num: 5, parent: this.node.getParent() });
        } else {
            AssistCtr.showToastTip(t("tips.rewardFail"));
        }
        this.setTurntableStageReward();
        this.isAllGet();
    }

    /**
     * 修改状态
     * @param index //第几个
     * @param num //0未领 //1可领 2//已领
     */
    changeItemState(index: number, num: number) {
        let parent: cc.Node = this.coinItemArr[index];
        let data: any = this.userTurntableStageReward.rewardDetailDtoList[index];
        let light: cc.Node = parent.children[0];
        let label: cc.Label = parent.getChildByName("label").getComponent(cc.Label);
        parent.getComponent(cc.Button).interactable = num == 1;
        Tools.setSpriteState(parent, num == 2, true)
        label.string = num == 2 ? t("main.已领取") : "+" + data.reward;
        light.active = num == 1;
    }

    // 是否全部领取了
    private isAllGet() {
        let isAll = true;
        this.userTurntableStageReward.rewardDetailDtoList.forEach((value, index) => {
            if (value.status !== 2) {
                isAll = false;
            }
        });

        if (isAll) {
            let dds = JSON.stringify(this.defaultTurntableStageReward);
            util.setStorage(util.localDiary.TurntableStageReward, dds)
            this.userTurntableStageReward = this.defaultTurntableStageReward;
            this.updateItem();
        }
    }



}