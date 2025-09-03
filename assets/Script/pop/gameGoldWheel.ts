import soundController from "../soundController";
import NameTs from "../common/NameTs"
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import { UrlConst } from "../server/UrlConst";
import util from "../util/util";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import { AdPosition } from "../common/AdPosition";
import { updateType } from "../common/faceTs";
import baseTs from "../base/baseTs";
import gameGoldWheelReward from "./gameGoldWheelReward"
import RewardController from "../controlelr/RewardController";
import TrackMgr from "../TrackMgr/TrackMgr";
import pageTs from "../common/pageTs";
import RedController from "../controlelr/RedController";
import { AssistCtr } from "../Assist/AssistCtr";

const { ccclass, property } = cc._decorator;
const default_data = {"code":0,"message":"success","data":{"times":20,"state":2,"rewardList":[{"id":"101","value":1000,"type":2},{"id":"105","value":5,"type":1},{"id":"102","value":500,"type":2},{"id":"106","value":10,"type":1},{"id":"103","value":300,"type":2},{"id":"107","value":15,"type":1},{"id":"104","value":100,"type":2},{"id":"108","value":20,"type":1}]}}
@ccclass
export default class gameGoldWheel extends baseTs {
    
    @property(cc.Widget)
    walletBtnWidget:cc.Widget = null; //提现按钮
    
    @property(cc.Label)
    coinLabel:cc.Label = null; //金币
    
    @property(cc.ProgressBar)
    Progress:cc.ProgressBar = null; //进度
    
    @property([cc.Node])
    coinItemArr:cc.Node[] = []; //金币奖励

    @property(cc.Node)
    wheel: cc.Node = null;

    @property(cc.Node)
    wheel_reward: cc.Node = null;

    @property(cc.Node)
    btn_clickGet: cc.Node = null;

    @property(cc.Node)
    btn_clickVideoGet: cc.Node = null;

    @property(cc.Node)
    btn_clickGrayGet: cc.Node = null;

    @property(cc.Node)
    btnCloseNode: cc.Node = null;

    @property(cc.Label)
    lable_remainNum: cc.Label = null;

    @property(cc.SpriteFrame)
    img_gold: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    img_red: cc.SpriteFrame = null;

    @property(cc.Node)
    gameGoldWheelReward: cc.Node = null;
    
    @property(cc.Node)
    timeNode1:cc.Node = null; //剩余次数

    @property(cc.Node)
    timeNode2:cc.Node = null; //完了几次

    wheelState;//转盘当前阶段
    curSpeed;  //当前速度
    spinTime;//减速前旋转时间
    gearNum;//齿轮数量
    defaultAngle;//修正默认角度
    gearAngle;//每个齿轮的角度
    finalAngle;//最终结果指定的角度
    maxSpeed;//最大速度
    duration;//减速前旋转时间
    acc;//加速度
    decAngle;//减速前转动角度
    endCallBack;//转完触发回调
    targetId;//转动到目标值
    wheelItems: any;
    isCanClickWheel: boolean;
    isClickGetPrize: boolean;
    isMain: any;
    closeCall: any;
    godWheelData: any;
    lable_prizeNum: any;
    prizeData: any;
    playerCurGold: any;
    showImgGold: any;
    // LIFE-CYCLE CALLBACKS:

    //进度
    private data = [
        {
            value:3, //次数
            num:1000, //奖励
            status:0, //0未领 //1可领 2//已领
        },
        {
            value:6,
            num:6000,
            status:0, //0未领 //1可领 2//已领
        },
        {
            value:10,
            num:10000,
            status:0, //0未领 //1可领 2//已领
        },
    ]

    //用户进度
    private turntableProgress:any = null;

    onLoad() {
        this.wheelItems = {}
        // this.TempNodeController = Global.TempNode.getComponent('TempNodeController')
        // this.TempNodeController.showNode();

        this.isCanClickWheel = true;


        //数据更新
        cc.game.on(NameTs.Game_View_UserDataUpdata,(res)=>{

            if(res==updateType.coin){
                let userData = util.userData;
                this.coinLabel.string = String(userData.coin);
            }

        },this);

        cc.game.emit(NameTs.Game_View_UserDataUpdata,updateType.coin);

        
        this.walletBtnWidget.top += Number(util.iphoneXTop);

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "大转盘弹窗",
        })
    }

    start() {

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
        self.updateData2(default_data.data)//策划强烈要求要默认数据，不能有数据切换效果

        self.isClickGetPrize = true;
        self.updateData();

        self.isCanClickWheel = true;

        self.btnCloseNode&&(self.btnCloseNode.active = false);
        setTimeout(() => {
            self.btnCloseNode&&(self.btnCloseNode.active = true);
        }, 2000);
        
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "金币转盘弹窗",
            dialog_enter: "首页金币转盘"
        })
        TrackMgr.big_turntable({
            activity_state: "大转盘弹窗展示"
        })
        // XMSDK.track({
        //     eventName: SAConst.AppBuyProductDialog,
        //     props: {
        //         dialog_name2: "金币转盘弹窗",
        //         dialog_enter: "首页金币转盘"
        //     }
        // });
        // TempParm.setDailyData(NormalPageList.GoldWheel, 1)
    }

    onDisable() {
        // if (this.TempNodeController) this.TempNodeController.hideNode()

        // ClientEvent.dispatch("goldWheel_dot_update", LocalData.query(DataItem.goldWheelCount) < 20);

        this.closeCall && this.closeCall()
        this.closeCall = null

        TrackMgr.big_turntable({
            activity_state: "大转盘弹窗点击关闭"
        })
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
    //'/xxl-account/api/turntable/index'
    updateData() {
        let self = this;
        // let data = {
        //     rewardList:[
        //         {id:1111,type:1,value:1000},
        //         {id:2222,type:2,value:5},
        //         {id:3333,type:1,value:2000},
        //         {id:4444,type:2,value:6},
        //         {id:5555,type:1,value:5000},
        //         {id:6666,type:2,value:7},
        //         {id:7777,type:1,value:7000},
        //         {id:7777,type:2,value:10},
        //     ],
        //     state:1,
        //     times:10
        // }
        // self.updateData2(data)
        // return

        if(self.turntableProgress&&self.turntableProgress.current&&self.turntableProgress.current+1>10){
            this.checkFill();
        }

        XMSDK.getdataStr({
            url: UrlConst.goldWheel_index,
            onSuccess: res => {
                if (res.code === 0) {
                    if(!this.isValid){
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
        self.btn_clickGet.stopAllActions();

        // if (data.times <= 0) {
        //     self.lable_remainNum.string = `今日剩余0次机会,请明日再来`;
        // }
        // else {
        //     self.lable_remainNum.string = `还剩${data.times}次抽奖机会`;
        // }


        this.timeNode1.active = data.times <= 0;
        this.timeNode2.active = data.times>0;
        this.updateItem();

        util.setTempParm("goldWheelRemainNum", data.times)
        
        // self.btn_clickGet.active =self.btn_clickVideoGet.active = self.btn_clickGrayGet.active = false;

        if (data.state == 1) {
            self.btn_clickGet.active = true;
            self.btn_clickVideoGet.active = false;
            self.btn_clickGrayGet.active = false;

            self.btn_clickGet.runAction(action);
        }
        else if (data.state == 2) {
            self.btn_clickGet.active = false;
            self.btn_clickVideoGet.active = true;
            self.btn_clickGrayGet.active = false;

            self.btn_clickVideoGet.runAction(action);
        }
        else if (data.state == 3) {
            self.btn_clickGet.active = false;
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
        if (self.btn_clickGet.active) {
            self.clickBtnWheel();
        }
        else if (self.btn_clickVideoGet.active) {
            self.clickWheelVideo();
        }
        else if (self.btn_clickGrayGet.active) {

        }
    }

    clickWheel(isVideo = false) {
        let self = this;

        if (!isVideo) {
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "金币转盘弹窗",
                ck_module: "普通抽奖",
                dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
            })
            // XMSDK.track({
            //     eventName: SAConst.AppDialogClick,
            //     props: {
            //         dialog_name2: "金币转盘弹窗",
            //         ck_module: "普通抽奖",
            //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
            //     }
            // });
        }
        else {
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "金币转盘弹窗",
                ck_module: "视频抽奖",
                dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
                active_ad_hcdg:"激励视频"
            })
            // XMSDK.track({
            //     eventName: SAConst.AppDialogClick,
            //     props: {
            //         dialog_name2: "金币转盘弹窗",
            //         ck_module: "视频抽奖",
            //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
            //     }
            // });
        }

        if (!this.checkIsCanClickWheel()) {
            return;
        }

        if (self.isCanClickWheel) {
            self.isCanClickWheel = false;

            //
            // this.startWheel(5, () => {
            //     this.prizeData ={
            //         id:"11111",
            //         reward:{
            //             id:1,
            //             type:1,
            //             value:5000
            //         }
            //     }
            //     this.openGetViewNode();
            // })
            // return
            //
            XMSDK.getdataStr({
                url: UrlConst.goldWheel_action,
                onSuccess: res => {
                    if (res.code === 0) {
                        // XMSDK.track({
                        //     eventName: SAConst.coin_wheels_draw,
                        //     props: {
                        //         draw_count: 1,
                        //         draw_type: isVideo ? "视频抽奖" : "普通抽奖"
                        //     }
                        // });

                        let data = res.data.reward;
                        if(data && this.wheelItems){
                            this.prizeData = res.data;                            
                            let prizeId = this.wheelItems[`${data.id}`];
    
                            this.startWheel(prizeId, () => {
                                this.openGetViewNode(null, isVideo);
                            })   
                            self.godWheelData.times -= 1;
                            if (self.godWheelData.times <= 0) {
                                self.godWheelData.times = 0;
                            }
                            // if (data.times <= 0) {
                            //     self.lable_remainNum.string = `今日剩余0次机会,请明日再来`;
                            // }
                            // else {
                            //     self.lable_remainNum.string = `还剩${self.godWheelData.times}次抽奖机会`;
                            // }
    
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
            AdController.loadAd(AdPosition.GoldWheel, () => {
                XMSDK.toast("感谢观看，额外免费抽奖次数已发放", 1.5);
                this.isCanClickWheel = true;
                this.clickWheel(true);
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            })
        }
    }

    checkIsCanClickWheel() {
        let self = this;

        if (this.wheelState != 0 || (this.gameGoldWheelReward && this.gameGoldWheelReward.active)) {
            return false;
        }
        return true;
    }

    openGetViewNode(node, isVideo: boolean) {
        soundController.singleton.playMusic(NameTs.Gola_Wheel_Get)
        util.userData.goldWheelCount++;
        this.gameGoldWheelReward.active = true;
        let gameGoldWheelRewardTs:gameGoldWheelReward = this.gameGoldWheelReward.getComponent(gameGoldWheelReward);
        if(gameGoldWheelRewardTs){

            gameGoldWheelRewardTs.init(this.prizeData, () => {
                this.updateData()
            })
        }
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "金币转盘获得奖励弹窗",
            dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
        })

        TrackMgr.big_turntable({
            activity_state: "抽奖成功",
            lucky_draw: this.godWheelData.times,
            lucky_draw_nowly: 1,
            watch_videos: Boolean(isVideo),
            prize: this.prizeData.reward.value
        })
        // let playerCurGold = util.userData.coin;
        // let temp = this.TempNodeController.showComp(playerCurGold, 2, 2);

        // XMSDK.track({
        //     eventName: SAConst.AppBuyProductDialog,
        //     props: {
        //         dialog_name2: "金币转盘获得奖励弹窗",
        //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
        //     }
        // });
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
    walletBtn(){
        TrackMgr.AppClick({
            app_page_title: "转盘",
            app_ck_module: "提现",
            app_exposure_type: "icon",
        })
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Pop_Open,pageTs.pageName.GameWallet);
    }


    /**
     * 更新进度item
     */
    updateItem(){
        if(!this.turntableProgress)return;
        //玩了几次
        let playTime:number  = this.turntableProgress.current||0;
        let nowState:number = 0;//当前进度
        if(playTime<3){
            nowState = 0;
        }else if(playTime>=3&&playTime<6){
            nowState = 1;
        }else{
            nowState = 2;
        }


        // let item = this.turntableProgress.rewardDetailDtoList[nowState];
        this.lable_remainNum.string = "第"+10+"次";
        this.Progress.progress = playTime/10;

        this.turntableProgress.rewardDetailDtoList.forEach((value,index)=>{
            if(value.status==0&&playTime>=value.node){
                value.status = 1;
            }
            this.changeItemState(index,value.status);
        });
    }

    /**
     * 领取金币奖励
     */
    getCoinBtn(e,num){
        soundController.singleton.clickAudio();
        if(!this.turntableProgress)return;
        num = Number(num);
        let itemData = this.turntableProgress.rewardDetailDtoList[num];
        if(itemData.status!==1){return;}
        util.post({
            url:UrlConst.goldWheel_receive,
            data:{node:itemData.node},
            success:()=>{
                itemData.status = 2;//变成已经状态
                this.changeItemState(num,2);
                AssistCtr.showToastTip("获取"+itemData.reward+"红包币");
                cc.game.emit(NameTs.Game_Effect_coin, { node: e.target, value: itemData.reward,num:10,parent:this.node.getParent()});

                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "大转盘弹窗",
                    ck_module: "第"+(num+1)+"档进度奖励",
                })
            },
            fail:()=>{
                AssistCtr.showToastTip("领取失败！");
            }
        })
    }

    /**
     * 修改状态
     * @param index //第几个
     * @param num //0未领 //1可领 2//已领
     */
    changeItemState(index:number,num:number){
        let parent:cc.Node = this.coinItemArr[index];
        let data:any = this.turntableProgress.rewardDetailDtoList[index];
        let light:cc.Node = parent.children[0];
        let label:cc.Label = parent.children[index==2?3:2].getComponent(cc.Label);
        //最后一个的字体
        let label2:cc.Node = null;
        if(index==2){
            label2 = parent.children[2];
            label2.active = true;
            label.node.active = false;
        }
        light.active = false;

        switch(num){
            case 0:
                label.string = "+"+data.reward;
                break;
            case 1:
                light.active = true;
                label.string = "+"+data.reward;
                break;
            case 2:
                if(index==2){
                    label2.active = false;
                    label.node.active = true;
                }
                label.string = "已领";
                parent.opacity = 200;
                break;
        }

    }

    /**
     * 格式化一下数据
     */
    formatData(data){

        this.turntableProgress = data;
        let time:number = data.current; //玩的次数
        this.turntableProgress.rewardDetailDtoList.forEach((value,index) => {
            if(value.status==1){
                value.status = 2;
            }else {
                if(value.node<=time){
                    value.status = 1;
                }else{
                    value.status = 0;
                }
            }
        });
        

        

    }


    /**
     * 检查是否超过11
     */

    checkFill(){
        console.log("满了10次");
        let coin:number = 0;//多少金币
        this.turntableProgress.rewardDetailDtoList.forEach((value,index) => {
            if(value.status==1){
                coin+=value.reward;
                cc.game.emit(NameTs.Game_Effect_coin, { node: this.coinItemArr[index], value: value.reward,num:10,parent:this.node.getParent()});
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "大转盘弹窗",
                    ck_module: "第"+(index+1)+"档进度奖励",
                })
            }
        });
        this.turntableProgress = null;
        if(coin>0){
            AssistCtr.showToastTip("获取"+coin+"红包币");
        }

    }
}