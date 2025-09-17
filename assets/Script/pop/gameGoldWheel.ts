import soundController from "../soundController";
import NameTs from "../common/NameTs"
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import { UrlConst } from "../server/UrlConst";
import util from "../util/util";
import { updateType } from "../common/faceTs";
import baseTs from "../base/baseTs";
import gameGoldWheelReward from "./gameGoldWheelReward"
import RewardController from "../controlelr/RewardController";
import TrackMgr from "../TrackMgr/TrackMgr";
import pageTs from "../common/pageTs";
import RedController from "../controlelr/RedController";
import { AssistCtr } from "../Assist/AssistCtr";
import { t } from "../Language/LanguageData";


//#region 抽奖 转盘
const { ccclass, property } = cc._decorator;

//默认数据
const default_data = {
    "code": 0,
    "message": "success",
    "data": {
        "times": 10,
        "state": 1,
        "rewardList": [
            { "id": "101", "value": 1000, "type": 2 },
            { "id": "105", "value": 5, "type": 1 },
            { "id": "102", "value": 500, "type": 2 },
            { "id": "106", "value": 10, "type": 1 },
            { "id": "103", "value": 300, "type": 2 },
            { "id": "107", "value": 15, "type": 1 },
            { "id": "104", "value": 100, "type": 2 },
            { "id": "108", "value": 20, "type": 1 }
        ],

    }
}

@ccclass
export default class gameGoldWheel extends baseTs {


    @property(cc.Label)
    private coinLabel: cc.Label = null; //金币

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
    private btn_clickGrayGet: cc.Node = null;

    @property(cc.Node)
    private btnCloseNode: cc.Node = null;
    ;


    @property(cc.Node)
    private gameGoldWheelReward: cc.Node = null;

    @property(cc.Node)
    private timeNode1: cc.Node = null; //剩余次数


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
    private isClickGetPrize: boolean;
    private isMain: any;
    private closeCall: any;
    private godWheelData: any;
    private lable_prizeNum: any;
    private prizeData: any;
    private playerCurGold: any;
    private showImgGold: any;






    // 奖励进度
    private userTurntableStageReward = {
        current: 8,
        rewardDetailDtoList: [
            { status: 0, node: 3, reward: 1000 },
            { status: 0, node: 6, reward: 2000 },
            { status: 0, node: 10, reward: 5000 }]
    }


    //用户进度
    private turntableProgress: any = default_data.data;

    onLoad() {
        this.wheelItems = {}
        this.isCanClickWheel = true;

        //数据更新
        cc.game.on(NameTs.Game_View_UserDataUpdata, (res) => {
            if (res == updateType.coin) {
                let userData = util.userData;
                this.coinLabel.string = String(userData.coin);
            }
        }, this);

        cc.game.emit(NameTs.Game_View_UserDataUpdata, updateType.coin);

    }

    onEnable() {
        let self = this;
        self.wheelState = 0;
        self.curSpeed = 0;
        self.spinTime = 0;//减速前旋转时间
        self.gearNum = 8;
        self.defaultAngle = 0;//修正默认角度
        self.gearAngle = 360 / self.gearNum;//每个齿轮的角度
        self.wheel.angle = self.defaultAngle;
        self.finalAngle = 0;//最终结果指定的角度
        self.maxSpeed = 15,
            self.duration = 1.5;//减速前旋转时间
        self.acc = 0.6;//加速度
        self.gameGoldWheelReward.active = false

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

        self.updateData2(default_data.data) // 策划强烈要求要默认数据，不能有数据切换效果

        self.isClickGetPrize = true;
        self.updateData();

        self.isCanClickWheel = true;

        self.btnCloseNode && (self.btnCloseNode.active = false);
        setTimeout(() => {
            self.btnCloseNode && (self.btnCloseNode.active = true);
        }, 2000);

    }

    onDisable() {
        // if (this.TempNodeController) this.TempNodeController.hideNode()
        // ClientEvent.dispatch("goldWheel_dot_update", LocalData.query(DataItem.goldWheelCount) < 20);
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
        soundController.singleton.playMusic(NameTs.Gold_Wheel)
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
                console.error("this:", this.targetId, this.gearAngle, this.prizeData)

            }
        }
    }


    updateData() {
        let self = this;

        if (this.userTurntableStageReward.current && this.userTurntableStageReward.current + 1 > 10) {
            this.checkFill();
        }

        XMSDK.getdataStr({
            url: UrlConst.goldWheel_index,
            onSuccess: res => {
                if (res.code === 0) {
                    if (!this.isValid) {
                        return;
                    }

                    let data = res.data;
                    self.formatData(data.userTurntableStageReward);
                    self.updateData2(data);
                }
                else {
                    XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                    if (self.godWheelData) {
                        self.updateData2(self.godWheelData);
                    }
                }
            },
            onFail: err => {
                XMSDK.toast('网络出错~', 2.5, 1);
                if (self.godWheelData) {
                    self.updateData2(self.godWheelData);
                }
            }
        })
    }

    updateData2(data) {
        let self = this;
        self.godWheelData = data;
        RedController.wheelCount = data.times;

        let action = cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1)));
        self.btn_clickVideoGet.stopAllActions();

        this.timeNode1.active = true;
        this.timeNode1.getComponent(cc.Label).string = t("main.剩余机会", data.times);

        this.updateItem();

        util.setTempParm("goldWheelRemainNum", data.times)

        if (data.state == 1 || data.state == 2) {
            self.btn_clickVideoGet.active = true;
            self.btn_clickGrayGet.active = false;
            self.btn_clickVideoGet.runAction(action);
        }
        else if (data.state == 3) {
            self.btn_clickVideoGet.active = false;
            self.btn_clickGrayGet.active = true;
        }

        let itemData = self.wheel_reward.children;
        self.wheelItems = {};

        let exchangeRate = util.userData.exchangeRate || 10000;

        for (let i = 0; i < itemData.length; i++) {
            let prize = itemData[i];
            let spriteFrame = data.rewardList[i].type == 1 ? RewardController.instance.findPointSprite(2) : RewardController.instance.findPointSprite(1)
            if (data.rewardList[i].value < 1000 || data.rewardList[i].type == updateType.product) {
                prize.getChildByName("GodWheel_gold").getComponent(cc.Sprite).spriteFrame = spriteFrame
                prize.getChildByName("goldNum").getComponent(cc.RichText).string = `${data.rewardList[i].value}`;
                self.wheelItems[`${data.rewardList[i].id}`] = i;
            }
            else {
                prize.getChildByName("GodWheel_gold").getComponent(cc.Sprite).spriteFrame = spriteFrame
                if (exchangeRate) {
                    prize.getChildByName("goldNum").getComponent(cc.RichText).string = `${(data.rewardList[i].value / exchangeRate).toFixed(1)}<size = 26>元</size>`;
                }
                else {
                    prize.getChildByName("goldNum").getComponent(cc.RichText).string = `${(data.rewardList[i].value / 10000).toFixed(1)}<size = 26>元</size>`;
                }
                self.wheelItems[`${data.rewardList[i].id}`] = i;
            }
        }
    }

    clickWater() {
        let self = this;
        if (self.btn_clickVideoGet.active) {
            self.clickWheelVideo();
        }
        else if (self.btn_clickGrayGet.active) {

        }
    }

    clickWheel(isVideo = false) {
        let self = this;
        if (!this.checkIsCanClickWheel()) {
            return;
        }
        if (self.isCanClickWheel) {
            self.isCanClickWheel = false;
            XMSDK.getdataStr({
                url: UrlConst.goldWheel_action,
                onSuccess: res => {
                    if (res.code === 0) {


                        // res.data.reward = {
                        //     id: "106",
                        //     type: 2,
                        //     value: 10
                        // }

                        let data = res.data.reward;
                        if (data && this.wheelItems) {
                            this.prizeData = res.data;
                            let prizeId = this.wheelItems[`${data.id}`];

                            console.log("中奖是哪个：", prizeId, data, this.wheelItems);

                            this.startWheel(prizeId, () => {
                                this.openGetViewNode(null, isVideo);
                            })
                            self.godWheelData.times -= 1;
                            if (self.godWheelData.times <= 0) {
                                self.godWheelData.times = 0;
                            }


                            // this.updateItem();
                            self.isCanClickWheel = true;
                        }
                    }
                    else {
                        XMSDK.toast(res.message || '网络出错~~', 2.5, 1);
                        self.isCanClickWheel = true;
                    }
                },
                onFail: err => {
                    XMSDK.toast('网络出错~~~', 2.5, 1);
                    self.isCanClickWheel = true;
                }
            })
        }
    }

    clickBtnWheel() {
        this.clickWheel();
    }

    clickWheelVideo() {
        let self = this;
        if (!this.checkIsCanClickWheel()) {
            return;
        }

        if (self.isCanClickWheel) {
            self.isCanClickWheel = false;
            setTimeout(() => {
                self.isCanClickWheel = true;
            }, 3000);

            this.isCanClickWheel = true;
            this.clickWheel(true);
        }
    }

    checkIsCanClickWheel() {
        if (this.wheelState != 0 || (this.gameGoldWheelReward && this.gameGoldWheelReward.active)) {
            return false;
        }
        return true;
    }

    openGetViewNode(node, isVideo: boolean) {
        soundController.singleton.playMusic(NameTs.Gola_Wheel_Get)
        util.userData.goldWheelCount++;
        this.gameGoldWheelReward.active = true;
        let gameGoldWheelRewardTs: gameGoldWheelReward = this.gameGoldWheelReward.getComponent(gameGoldWheelReward);
        if (gameGoldWheelRewardTs) {
            gameGoldWheelRewardTs.init(this.prizeData, () => {
                this.updateData()
            })
        }
    }


    clickClose() {
        let self = this;
        if (this.wheelState != 0) {
            return;
        }
        cc.game.emit(NameTs.Game_Task_updata);
        soundController.singleton.clickAudio();
        this.closePage();
        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: "金币转盘弹窗",
            ck_module: "关闭",
            dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
        })
        // XMSDK.track({
        //     eventName: SAConst.AppDialogClick,
        //     props: {
        //         dialog_name2: "金币转盘弹窗",
        //         ck_module: "关闭",
        //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
        //     }
        // });
    }

    /**提现 */
    walletBtn() {
        TrackMgr.AppClick({
            app_page_title: "转盘",
            app_ck_module: "提现",
            app_exposure_type: "icon",
        })
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameWallet);
    }


    /**
     * 更新进度item
     */
    updateItem() {
        if (!this.turntableProgress) return;

        //玩了几次
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
    }

    /**
     * 领取金币奖励
     */
    getCoinBtn(e, num) {
        soundController.singleton.clickAudio();
        if (!this.turntableProgress) return;
        num = Number(num);
        let itemData = this.userTurntableStageReward.rewardDetailDtoList[num];
        if (itemData.status !== 1) { return; }
        util.post({
            url: UrlConst.goldWheel_receive,
            data: { node: itemData.node },
            success: () => {
                itemData.status = 2;//变成已经状态
                this.changeItemState(num, 2);
                AssistCtr.showToastTip("获取" + itemData.reward + "红包币");
                cc.game.emit(NameTs.Game_Effect_coin, { node: e.target, value: itemData.reward, num: 10, parent: this.node.getParent() });
            },
            fail: () => {
                AssistCtr.showToastTip("领取失败！");
            }
        })
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

        light.active = false;

        switch (num) {
            case 0:
                label.string = "+" + data.reward;
                break;
            case 1:
                light.active = true;
                label.string = "+" + data.reward;
                break;
            case 2:
                label.string = t("main.已领取");
                parent.opacity = 200;
                break;
        }

    }

    /**
     * 格式化一下数据
     */
    formatData(data) {
        // this.turntableProgress = data;
        let time: number = this.userTurntableStageReward.current; //玩的次数
        this.userTurntableStageReward.rewardDetailDtoList.forEach((value, index) => {
            if (value.status == 1) {
                value.status = 2;
            } else {
                if (value.node <= time) {
                    value.status = 1;
                } else {
                    value.status = 0;
                }
            }
        });
    }


    /**
     * 检查是否超过11
     */
    checkFill() {
        console.log("满了10次");
        let coin: number = 0;//多少金币
        this.userTurntableStageReward.rewardDetailDtoList.forEach((value, index) => {
            if (value.status == 1) {
                coin += value.reward;
                cc.game.emit(NameTs.Game_Effect_coin, { node: this.coinItemArr[index], value: value.reward, num: 10, parent: this.node.getParent() });

            }
        });
        this.turntableProgress = null;
        if (coin > 0) {
            AssistCtr.showToastTip("获取" + coin + "红包币");
        }
    }
}