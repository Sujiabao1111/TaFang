import { AssistCtr } from "../Assist/AssistCtr";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import RedController from "../controlelr/RedController";
import { t } from "../Language/LanguageData";
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


    private prizeData = {
        onPrizeRedData: [
            { state: 0, waitTime: 60, amount: 100, doubleAmount: 400 },
            { state: 0, waitTime: 120, amount: 200, doubleAmount: 1000 },
            { state: 0, waitTime: 300, amount: 300, doubleAmount: 1500 },
            { state: 0, waitTime: 600, amount: 500, doubleAmount: 2000 }
        ]
    }


    onLoad() {
        this.maxRectNum = this.img_rect.parent.width;
        cc.game.on(NameTs.onPrizeGetUpdate, this.updateData, this);
    }

    onEnable() {
        this.updateData();
    }



    updateData() {
        this.curTime = util.onlineTimeNum;

        this.onPrizeData = this.prizeData;

        RedController.onPrizeData = this.onPrizeData;

        this.init();
    }

    init() {
        if (this && this.redLayout) {
            let onPrizeData: onPrizeData = this.onPrizeData;
            let redChild = this.redLayout.children;
            let allRedData = onPrizeData.onPrizeRedData;

            let isHaveGet = false;  //是否有可领取的红包
            let isWait = false;     //是否要等待
            let getRedNum = 0;      //红包数(未领取+已领取)
            let onceTimer = 0;      //下一个红包所需要时间(秒)
            let nextRedTime = 0;    //领取下一个红包剩余时间 (秒)

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
                        targetNode.getChildByName("img_state").getComponent(cc.Sprite).spriteFrame = this.redSprArray[0];
                    } else if (redData.state == 0) {
                        targetNode.getChildByName("img_state").getComponent(cc.Sprite).spriteFrame = this.redSprArray[2];
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
                        targetNode.getChildByName("img_state").getComponent(cc.Sprite).spriteFrame = this.redSprArray[1];
                        targetNode.getChildByName("lable_getTip").getComponent(cc.Label).string = t("main.已领取");
                        getRedNum++;
                    }
                }
                else if (redChild[i]) {
                    redChild[i].active = false;
                }
            }
            this.btn_onPrizeGet.stopAllActions();
            this.btn_onPrizeGet.scale = 1;
            this.timeNum = nextRedTime;

            if (isHaveGet) {
                let tempColor = new cc.Color();
                this.btn_onPrizeGet.active = true;
                this.timeNode.active = false;
                this.btn_onPrizeGet.getComponent(cc.Sprite).spriteFrame = this.btnSprFrame[0];
                this.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.Label).string = `领取`;
                this.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#507900");
                cc.tween(this.btn_onPrizeGet).repeatForever(
                    cc.tween().to(.4, { scale: 1.2 }).to(.4, { scale: 1 })
                ).start();
            }
            else if (isWait && nextRedTime) {
                this.btn_onPrizeGet.active = false;
                this.openTimer();
            }
            else {
                let tempColor = new cc.Color();
                this.btn_onPrizeGet.active = true;
                this.btn_onPrizeGet.getComponent(cc.Sprite).spriteFrame = this.btnSprFrame[1];
                this.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.Label).string = `明日再来`;
                this.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#838383");
            }
            this.getRedNum = getRedNum;
            this.onceTimer = onceTimer;
            this.updateRec();
        }
    }

    openTimer() {
        this.timeNode.active = true;
        if (this.timeNum > 0) {
            this.lable_time.string = AssistCtr.formatSeconds(this.timeNum);
            this.schedule(this.timeFun, 1);
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
        let getRedNum = this.getRedNum;
        let pad = this.maxRectNum / 3;
        let rab = 0;
        if (this.onceTimer) {
            rab = (this.onceTimer - this.timeNum) / this.onceTimer;
        }

        let addWidth = (getRedNum - 1) * pad + rab * pad;
        if (addWidth > this.maxRectNum) {
            addWidth = this.maxRectNum;
        }
        else if (!addWidth || addWidth < 0) {
            addWidth = 0;
        }
        this.img_rect.width = addWidth;
    }

    clickGet() {

        let str = this.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.Label).string;
        if (str == "明日再来") {
            AssistCtr.showToastTip("请明日再来")
        }
        else if (str == "领取" && this.curOnPrizeRedData) {
            cc.game.emit(NameTs.Game_Pop_Open, {
                name: pageTs.pageName.GameOnPrizeGetReward,
                data: {
                    prizeRedData: this.curOnPrizeRedData
                },
            }, this);
        }
    }
}
