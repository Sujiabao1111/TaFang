import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import pageTs from "../common/pageTs";
import userData from "../data/userData";
import PageManage from "../PageManage";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";
import NewBigWheelPrize from "./NewBigWheelPrize";
import NewBigWheelPrizeAward from "./NewBigWheelPrizeAward";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBigWheelController extends baseTs {
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null
    @property(cc.Node)
    frameNode: cc.Node = null
    @property(cc.Node)
    content: cc.Node = null
    @property(cc.Node)
    signItemNode: cc.Node = null
    @property([cc.SpriteFrame])
    signSprArray: Array<cc.SpriteFrame> = []
    @property([cc.SpriteFrame])
    signSprFrameArray: Array<cc.SpriteFrame> = []
    @property(cc.Node)
    btn_signDisable: cc.Node = null
    @property(cc.Node)
    btn_signGet: cc.Node = null
    @property(cc.RichText)
    lable_sevenSign: cc.RichText = null
    @property(cc.Node)
    signNode: cc.Node = null
    @property(cc.Node)
    chouNode: cc.Node = null
    @property(cc.Node)
    taskNode: cc.Node = null
    @property(cc.Node)
    taskTempItem: cc.Node = null
    @property(cc.Node)
    taskContent: cc.Node = null
    @property(cc.Node)
    tabSignRed: cc.Node = null
    @property(cc.Node)
    tabChouRed: cc.Node = null
    @property([cc.SpriteFrame])
    tabSprArray: Array<cc.SpriteFrame> = []
    @property(cc.Node)
    signTab: cc.Node = null
    @property(cc.Node)
    chouTab: cc.Node = null
    @property(cc.Node)
    lableNode_signTab: cc.Node = null
    @property(cc.Node)
    lableNode_chouTab: cc.Node = null
    @property(cc.Node)
    bigWheelMarquee: cc.Node = null
    @property(cc.Label)
    lable_currentPhoneFragments: cc.Label
    @property(cc.Node)
    progressBar: cc.Node = null
    @property(cc.Node)
    btn_rule: cc.Node = null

    //活动规则
    @property(cc.Prefab)
    BigWheelRuleModalPrefab: cc.Prefab

    @property(NewBigWheelPrize)
    newBigWheelPrize: NewBigWheelPrize = null


    //界面


    data: {};
    dayEnterSignNum: any;
    closeCall: any;
    onceEnter: any;
    maiDianSignDay: number;
    creatItemOk: any;
    isClickSign: boolean = false;

    onLoad() {
        cc.director.on("NewBigWheelPrize_againChou", this.moveChouPos, this);
        cc.director.on("moveChouPos", this.moveChouPos, this);
        this.data = {};
    }

    onEnable() {
        let self = this;
        this.dayEnterSignNum = util.userData.dayEnterSignNum
        if (this.dayEnterSignNum < 2) {
            util.userData.dayEnterSignNum = this.dayEnterSignNum + 1
        }


        self.updateWinData(null, true);
        TrackMgr.lotto_phone_show({
            activity_show: "免费拿手机"
        })
        // XMSDK.track({
        //     eventName: SAConst.lotto_phone_show,
        //     props: {
        //         activity_show: "免费拿手机",
        //     }
        // });

        self.scrollMoveTop();
        util.setTempParm("newBigWheel_wheelIsRunning", false);
        util.setTempParm("NormalPageList_BigWheel", 1)
        self.setScroller(true);
    }
    setCloseCall(callback) {
        this.closeCall = callback
    }
    scrollMoveTop() {
        this.scrollView.scrollToTop(0.1);
    }

    gotoChouPos() {

    }

    onDisable() {
        let self = this;
        self.onceEnter = null;
    }

    start() {

    }

    updateWinData(callback?: Function, isAdjust = false) {
        let self = this;
        XMSDK.getdataStr({
            url: UrlConst.newBigWheel_index,
            onSuccess: res => {
                if (res.code === 0) {
                    if(!this.isValid){
                        return;
                    }

                    let data = res.data;
                    if (data.itemListV2) {
                        for (let m = 0; m < data.itemListV2.length; m++) {
                            if (data.itemListV2[m] && data.itemListV2[m].type == 2) {
                                if (data.itemListV2[m].keyId == 2) {
                                    data.itemListV2[m].keyId = 1
                                } else if (data.itemListV2[m].keyId == 1) {
                                    data.itemListV2[m].keyId = 2
                                }
                            }
                        }
                    }
                    this.initWindowData(data, isAdjust);
                    if (callback) callback()
                }
                else {
                    XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: err => {
                XMSDK.toast('网络出错~', 2.5, 1);
            }
        })
    }

    initWindowData(data, isAdjust) {
        let self = this;
        self.data = data;

        let signPrizeArray = self.signItemNode.children;              //更新签到信息
        let signList = data.signList;
        let signTimes = data.signTimes;
        let todayChecked = data.todayChecked;

        if (todayChecked) {
            self.btn_signDisable.active = true;
            self.btn_signGet.active = false;
        }
        else {
            self.btn_signDisable.active = false;
            self.btn_signGet.active = true;
        }

        let sevenPrize = 0;
        for (let i = 0; i < signList.length; i++) {
            let item = signPrizeArray[i];
            if (item && item.getChildByName("lable_signPrizeNum")) {
                item.getChildByName("lable_signPrizeNum").getComponent(cc.Label).string = signList[i];
                if (i == signList.length - 1) {
                    sevenPrize = signList[i];
                }

                if (item.getChildByName("newBigWheel_signGet")) {
                    if (signTimes >= i + 1) {
                        item.getChildByName("newBigWheel_signGet").active = true;
                    }
                    else {
                        item.getChildByName("newBigWheel_signGet").active = false;
                    }

                    if (item.getChildByName("lable_signDay")) {
                        if (!todayChecked && signTimes + 1 == i + 1) {
                            let tempColor = new cc.Color();
                            item.getChildByName("newBigWheel_signFrame").getComponent(cc.Sprite).spriteFrame = self.signSprArray[0];
                            item.getChildByName("newBigWheel_signkuang1").getComponent(cc.Sprite).spriteFrame = self.signSprFrameArray[1];
                            item.getChildByName("lable_signDay").color = tempColor.fromHEX(`#C07B00`);
                            item.getChildByName("lable_signPrizeNum").getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#703300`);

                            this.maiDianSignDay = i + 1;
                        }
                        else {
                            let tempColor = new cc.Color();
                            item.getChildByName("newBigWheel_signFrame").getComponent(cc.Sprite).spriteFrame = self.signSprArray[0];
                            item.getChildByName("newBigWheel_signkuang1").getComponent(cc.Sprite).spriteFrame = self.signSprFrameArray[0];
                            item.getChildByName("lable_signDay").color = tempColor.fromHEX(`#964400`);
                            item.getChildByName("lable_signPrizeNum").getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#703300`);
                        }
                    }
                    item.getChildByName("lable_signDay").getComponent(cc.Label).string = `第${i + 1}天`;
                }
            }
        }
        // if(sevenPrize){
        //     self.lable_sevenSign.string = `<color=#58379F>第7天领</c><color=#FA59B3>${sevenPrize}个</color><color=#58379F>碎片</c>`;
        //     self.lable_sevenSign.node.active = true;
        // }        
        // else{
        //     self.lable_sevenSign.node.active = false;
        // }

        self.chouNode.getComponent("NewBigWheelChou").updateWinData(data);      //初始化碎片转盘

        self.setTaskItem();     //更新任务信息

        self.lable_currentPhoneFragments.string = `${data.currentPhoneFragments}/${data.phoneFragmentsExchangeTotal}`;      //首页碎片进度
        let width = data.currentPhoneFragments / data.phoneFragmentsExchangeTotal * self.progressBar.parent.width;
        if (width > 0 && width < 20) {
            width = 20;
        }
        cc.tween(self.progressBar)
            .to(.2, { width: width })
            .start();

        if (data.prevPeriodList && data.prevPeriodList.length) {                //轮播图
            self.bigWheelMarquee.getComponent("NewBigWheelMarquee").updateMarqueeList(data);
            self.bigWheelMarquee.active = true;
        }
        else {
            self.bigWheelMarquee.active = false;
        }
        self.frameNode.active = true;
        self.btn_rule.active = true;
        self.taskNode.active = true;

        if (!self.onceEnter) {
            let dayEnterSignNum = this.dayEnterSignNum;
            if (dayEnterSignNum >= 2) {
                self.clickChouTab();
            }
            else {
                if (!todayChecked) {
                    self.clickSignTab();
                }
                else {
                    self.clickChouTab();
                }
            }
            self.onceEnter = true;
        }
        else if (todayChecked) {
            self.clickChouTab();
        }
    }

    clickSignTab() {
        let self = this;
        self.signNode.active = true;
        self.tabSignRed.active = false;

        self.chouNode.active = false;

        self.signTab.getComponent(cc.Sprite).spriteFrame = self.tabSprArray[0];
        self.chouTab.getComponent(cc.Sprite).spriteFrame = self.tabSprArray[1];

        let tempColor = new cc.Color();
        self.lableNode_signTab.color = tempColor.fromHEX(`#9C4803`);
        self.lableNode_chouTab.color = tempColor.fromHEX(`#DA8C01`);

        if (self.data["buttonType"] == 4) {
            self.tabChouRed.active = false;
        }
        else {
            self.tabChouRed.active = true;
        }
    }

    clickChouTab() {
        let self = this;
        self.signNode.active = false;
        self.tabChouRed.active = false;

        self.chouNode.active = true;
        self.signTab.getComponent(cc.Sprite).spriteFrame = self.tabSprArray[1];
        self.chouTab.getComponent(cc.Sprite).spriteFrame = self.tabSprArray[0];

        let tempColor = new cc.Color();
        self.lableNode_signTab.color = tempColor.fromHEX(`#DA8C01`);
        self.lableNode_chouTab.color = tempColor.fromHEX(`#9C4803`);

        if (self.data["todayChecked"]) {
            self.tabSignRed.active = false;
        }
        else {
            self.tabSignRed.active = true;
        }
    }

    setTaskItem() {
        let self = this;
        let taskList = self.data["taskList"];

        if (!self.creatItemOk) {
            for (let i = 0; i < taskList.length; i++) {
                let taskItem = cc.instantiate(self.taskTempItem);
                taskItem.parent = self.taskContent;
                taskItem.active = true;
            }
            self.creatItemOk = true;
        }

        let taskListItem = self.taskContent.children;

        let taskItem00 = taskListItem[0];
        if (taskItem00) {
            taskItem00.getComponent("NewBigTaskItem").setVideoTast(this.data["watchCount"], this.data["watchCountLimit"]);
        }

        for (let i = 0; i < taskList.length; i++) {
            if (taskListItem[i + 1]) {
                let taskItem = taskListItem[i + 1];
                let taskItemData = taskList[i];
                taskItem.getComponent("NewBigTaskItem").setTaskItem(taskItemData);
            }
        }
    }

    clickSign() {
        if (this.data && this.data["todayChecked"]) {
            return;
        }


        if (this.isClickSign) {
            return;
        }
        this.isClickSign = true;
        setTimeout(() => {
            this.isClickSign = false;
        }, 3000);

        // XMSDK.track({
        //     eventName: SAConst.lotto_phone_click,
        //     props: {
        //         activity_button_click: "签到领取碎片",
        //     }
        // });
        TrackMgr.lotto_phone_click({
            activity_button_click: "签到领取碎片",
        })
        soundController.singleton.clickAudio();
        AdController.loadAd(AdPosition.WheelGetSign, () => {
            //延迟10毫秒，才不会出现请求超时失败问题
            XMSDK.getdataStr({
                url: UrlConst.newBigWheel_checkIn,
                onSuccess: res => {
                    if (res.code === 0) {
                        let data = res.data;
                        this.openPrizeWin(4, "手机碎片", { rewardPhoneFragments: data.rewardPhoneFragments })
                        this.updateWinData();
                        TrackMgr.LuckDrawProductDialog({
                            awad_dialog: "签到奖励弹窗",
                            awad_double_dialog: "手机碎片奖励翻倍弹窗",
                        })
                        // XMSDK.track({
                        //     eventName: SAConst.wheel.LuckDrawProductDialog,
                        //     props: {
                        //         awad_dialog: "签到奖励弹窗",
                        //         awad_double_dialog: "手机碎片奖励翻倍弹窗",
                        //     }
                        // });

                        TrackMgr.lotto_sign_chip({
                            click_sign_button: 1,
                            is_sign_suc: true,
                            sign_day: this.maiDianSignDay
                        })
                        

                    } else {
                        TrackMgr.lotto_sign_chip({
                            click_sign_button: 1,
                            is_sign_suc: false,
                            sign_day: this.maiDianSignDay
                        })
                      

                        XMSDK.toast('网络请求错误，请重试', 1.5, 2);
                    }
                },
                onFail: res => {
                    AssistCtr.showToastTip("加载视频失败，请稍后！");
                    
                }
            })
        }, () => {
            AssistCtr.showToastTip("加载视频失败，请稍后！");
        })
    }

    openPrizeWin(type, maiDianStr, doubleData) {
        this.updateWinData(() => {
            this.newBigWheelPrize.node.active = true
            this.newBigWheelPrize.barUpdate(this.data, type, maiDianStr, doubleData);
        })
    }

    onClickRuleButton() {
        let self = this;
        soundController.singleton.clickAudio();
        let BigWheelRuleModal = cc.instantiate(this.BigWheelRuleModalPrefab);
        BigWheelRuleModal.getComponent('BigWheelRuleModal').open(self.data["beginDate"], self.data["endDate"]);
        TrackMgr.AppClick({
            app_page_title: '幸运大转盘页',
            app_ck_module: '活动规则',
        })
        // XMSDK.track({
        //     eventName: SAConst.AppClick,
        //     props: {
        //         app_page_title: '幸运大转盘页',
        //         app_ck_module: '活动规则',
        //     }
        // });
    }

    moveChouPos() {
        let self = this;
        self.content.stopAllActions();
        // let action = cc.moveTo(0.2, 0, 840);
        // self.content.runAction(action);
        self.scrollMoveTop();
        self.clickChouTab();
    }

    moveTaskPos() {
        let self = this;
        self.content.stopAllActions();
        let action = cc.moveTo(0.2, 0, 1740);
        self.content.runAction(action);
    }

    getData() {
        return this.data;
    }

    clickToast() {
        let data = this.data;
        if (!data) return
        XMSDK.toast(`还差${data["phoneFragmentsExchangeTotal"] - data["currentPhoneFragments"]}碎片即可兑换华为P40手机`);
        TrackMgr.lotto_phone_click({
            activity_button_click: "兑换",
        })
        // XMSDK.track({
        //     eventName: SAConst.lotto_phone_click,
        //     props: {
        //         activity_button_click: "兑换",
        //     }
        // });
    }

    clickClose() {
        if (util.getTempParm("newBigWheel_wheelIsRunning")) {
            return;
        }
        soundController.singleton.clickAudio()

        this.closePage()
        this.closeCall && this.closeCall()
        this.closeCall = null
    }

    clickDisableSign() {
        soundController.singleton.clickAudio()
        XMSDK.toast("今日已领取，请明日再来");
    }

    setScroller(state) {
        this.scrollView.vertical = state;
    }

    // update (dt) {},
}
