import { AssistCtr } from "../Assist/AssistCtr";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import RedController from "../controlelr/RedController";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

export interface onPrizeData {
    onPrizeRedData: Array<onPrizeRedItemData>           //全部红包全部信息
}

export interface onPrizeRedItemData {
    state: number,           //0.未领取  1.已领取
    amount: number,          //红包金额
    doubleAmount: number     //翻倍后红包金额
    waitTime: number,        //需要等待的总时间 (秒)
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class OnPrizeGet extends cc.Component {

    //在线奖励
    @property(cc.Node)
    private btn_onPrizeGet: cc.Node = null;

    @property(cc.SpriteFrame)
    private btnSprFrame: Array<cc.SpriteFrame> = [];

    @property(cc.Node)
    private timeNode: cc.Node = null;

    @property(cc.Node)
    private redLayout: cc.Node = null;

    @property(cc.Label)
    private lable_time: cc.Label = null;

    @property(cc.SpriteFrame)
    private redSprArray: Array<cc.SpriteFrame> = [];

    @property(cc.Node)
    private img_rect: cc.Node = null;


    private onPrizeData: onPrizeData = null;
    private curOnPrizeRedData: onPrizeRedItemData = null;

    private timeNum: number = 0;

    private maxRectNum: number = 0; //进度条最大宽度
    private getRedNum: number = 0; //红包数(未领取+已领取)
    private onceTimer = 0;      //下一个红包所需要时间(秒)
    private curTime = 0;        //当前时间

    onLoad() {
        this.maxRectNum = this.img_rect.parent.width;

        cc.game.on(NameTs.onPrizeGetUpdate, this.updateData, this);
    }

    onEnable() {
        this.updateData();
    }

    onDisable() {

    }

    updateData() {
        XMSDK.getdataStr({
            url: UrlConst.onPrizeGetRewardMain,
            onSuccess: res => {
                if(!this.isValid){
                    return;
                }

                if (res.code === 0 && res.data) {
                    this.curTime = util.onlineTimeNum;
                    this.onPrizeData = res.data;

                    RedController.onPrizeData = this.onPrizeData;

                    this.init();
                } else {
                    XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: res => {

            }
        })
    }

    init() {
        let self = this;
        if (self && self.redLayout) {
            let onPrizeData: onPrizeData = this.onPrizeData;
            let redChild = self.redLayout.children;
            let allRedData = onPrizeData.onPrizeRedData;
            let isHaveGet = false;  //是否有可领取的红包
            let isWait = false;     //是否要等待
            let getRedNum = 0;      //红包数(未领取+已领取)
            let onceTimer = 0;      //下一个红包所需要时间(秒)
            let nextRedTime = 0;                //领取下一个红包剩余时间 (秒)
            for (let i = 0; i < allRedData.length; i++) {
                if (allRedData[i] && redChild[i]) {
                    redChild[i].active = true;

                    let redData: onPrizeRedItemData = allRedData[i];
                    let targetNode = redChild[i];
                    targetNode.getChildByName("lable_money").getComponent(cc.Label).string = redData.amount + "";
                    targetNode.getChildByName("guangNode").active = false;
                    if (redData.waitTime >= this.curTime && redData.state == 0) {
                        targetNode.getChildByName("lable_getTip").getComponent(cc.Label).string = `${redData.waitTime / 60}分钟`;
                        if (!onceTimer) {
                            isWait = true;
                            nextRedTime = redData.waitTime - this.curTime;
                            onceTimer = redData.waitTime;
                        }
                        targetNode.getChildByName("img_state").getComponent(cc.Sprite).spriteFrame = self.redSprArray[0];
                    }
                    else if (redData.state == 0) {
                        targetNode.getChildByName("img_state").getComponent(cc.Sprite).spriteFrame = self.redSprArray[2];
                        targetNode.getChildByName("lable_getTip").getComponent(cc.Label).string = `可领`;
                        if (!isHaveGet) {
                            if (targetNode.getChildByName("guangNode") && targetNode.getChildByName("guangNode").getChildByName("saoguang")) {
                                let saoGuang: cc.Node = targetNode.getChildByName("guangNode").getChildByName("saoguang");
                                saoGuang.stopAllActions();
                                saoGuang.x = -100;
                                targetNode.getChildByName("guangNode").active = true;
                                cc.tween(saoGuang).repeatForever(
                                    cc.tween().to(0.64, { x: 100 }).delay(0.64).call(() => { saoGuang.x = -100 })
                                ).start();
                                this.curOnPrizeRedData = redData;
                            }
                        }

                        isHaveGet = true;
                        getRedNum++;
                    }
                    else if (redData.state == 1) {
                        targetNode.getChildByName("img_state").getComponent(cc.Sprite).spriteFrame = self.redSprArray[1];
                        targetNode.getChildByName("lable_getTip").getComponent(cc.Label).string = `已领取`;
                        getRedNum++;
                    }
                }
                else if (redChild[i]) {
                    redChild[i].active = false;
                }
            }
            self.btn_onPrizeGet.stopAllActions();
            self.btn_onPrizeGet.scale = 1;
            self.timeNum = nextRedTime;

            if (isHaveGet) {
                let tempColor = new cc.Color();
                self.btn_onPrizeGet.active = true;
                self.timeNode.active = false;
                self.btn_onPrizeGet.getComponent(cc.Sprite).spriteFrame = self.btnSprFrame[0];
                self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.Label).string = `领取`;
                self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#507900");
                cc.tween(self.btn_onPrizeGet).repeatForever(
                    cc.tween().to(.4, { scale: 1.2 }).to(.4, { scale: 1 })
                ).start();
            }
            else if (isWait && nextRedTime) {
                self.btn_onPrizeGet.active = false;
                self.openTimer();
            }
            else {
                let tempColor = new cc.Color();
                self.btn_onPrizeGet.active = true;
                self.btn_onPrizeGet.getComponent(cc.Sprite).spriteFrame = self.btnSprFrame[1];
                self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.Label).string = `明日再来`;
                self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#838383");
            }
            self.getRedNum = getRedNum;
            self.onceTimer = onceTimer;

            self.updateRec();
        }
    }

    openTimer() {
        let self = this;
        self.timeNode.active = true;
        if (self.timeNum > 0) {
            self.lable_time.string = AssistCtr.formatSeconds(self.timeNum);
            self.schedule(self.timeFun, 1);
        }
    }

    timeFun() {
        let self = this;
        if (self.timeNum > 0) {
            self.lable_time.string = AssistCtr.formatSeconds(self.timeNum);
            self.updateRec()
        }
        else {
            self.unschedule(self.timeFun);
            self.timeNum = 0;
            self.updateData();
        }
        self.timeNum--;
    }

    /**
     * 
     * @param getRedNum 红包数(未领取+已领取)
     * @param rab 距离下一个红包所需时间百分比     
     */
    updateRec() {
        let self = this;
        let getRedNum = self.getRedNum;
        let pad = self.maxRectNum / 3;
        let rab = 0;
        if (self.onceTimer) {
            rab = (self.onceTimer - self.timeNum) / self.onceTimer;
        }

        let addWidth = (getRedNum - 1) * pad + rab * pad;
        if (addWidth > self.maxRectNum) {
            addWidth = self.maxRectNum;
        }
        else if (!addWidth || addWidth < 0) {
            addWidth = 0;
        }
        self.img_rect.width = addWidth;
    }

    clickGet() {
        let self = this;
        let str = self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.Label).string;
        if (str == "明日再来") {
            AssistCtr.showToastTip("请明日再来")
        }
        else if (str == "领取" && this.curOnPrizeRedData) {
            cc.game.emit(NameTs.Game_Pop_Open, {
                name: pageTs.pageName.GameOnPrizeGetReward,
                data: {
                    prizeRedData: this.curOnPrizeRedData
                },
            },this);
        }

        if (this.curOnPrizeRedData) {
            TrackMgr.Online_rewards({
                activity_state: "点击主按钮",
                reward_state: `${this.curOnPrizeRedData.waitTime / 60}分钟`,
                button_name_hcdg: str
            })
        }
    }
}
