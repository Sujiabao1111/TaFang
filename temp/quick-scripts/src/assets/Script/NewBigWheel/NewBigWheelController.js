"use strict";
cc._RF.push(module, '270fbqmasFIxKrUB/1tj8X/', 'NewBigWheelController');
// Script/NewBigWheel/NewBigWheelController.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var NewBigWheelPrize_1 = require("./NewBigWheelPrize");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewBigWheelController = /** @class */ (function (_super) {
    __extends(NewBigWheelController, _super);
    function NewBigWheelController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.frameNode = null;
        _this.content = null;
        _this.signItemNode = null;
        _this.signSprArray = [];
        _this.signSprFrameArray = [];
        _this.btn_signDisable = null;
        _this.btn_signGet = null;
        _this.lable_sevenSign = null;
        _this.signNode = null;
        _this.chouNode = null;
        _this.taskNode = null;
        _this.taskTempItem = null;
        _this.taskContent = null;
        _this.tabSignRed = null;
        _this.tabChouRed = null;
        _this.tabSprArray = [];
        _this.signTab = null;
        _this.chouTab = null;
        _this.lableNode_signTab = null;
        _this.lableNode_chouTab = null;
        _this.bigWheelMarquee = null;
        _this.progressBar = null;
        _this.btn_rule = null;
        _this.newBigWheelPrize = null;
        _this.isClickSign = false;
        return _this;
        // update (dt) {},
    }
    NewBigWheelController.prototype.onLoad = function () {
        cc.director.on("NewBigWheelPrize_againChou", this.moveChouPos, this);
        cc.director.on("moveChouPos", this.moveChouPos, this);
        this.data = {};
    };
    NewBigWheelController.prototype.onEnable = function () {
        var self = this;
        this.dayEnterSignNum = util_1.default.userData.dayEnterSignNum;
        if (this.dayEnterSignNum < 2) {
            util_1.default.userData.dayEnterSignNum = this.dayEnterSignNum + 1;
        }
        self.updateWinData(null, true);
        TrackMgr_1.default.lotto_phone_show({
            activity_show: "免费拿手机"
        });
        // XMSDK.track({
        //     eventName: SAConst.lotto_phone_show,
        //     props: {
        //         activity_show: "免费拿手机",
        //     }
        // });
        self.scrollMoveTop();
        util_1.default.setTempParm("newBigWheel_wheelIsRunning", false);
        util_1.default.setTempParm("NormalPageList_BigWheel", 1);
        self.setScroller(true);
    };
    NewBigWheelController.prototype.setCloseCall = function (callback) {
        this.closeCall = callback;
    };
    NewBigWheelController.prototype.scrollMoveTop = function () {
        this.scrollView.scrollToTop(0.1);
    };
    NewBigWheelController.prototype.gotoChouPos = function () {
    };
    NewBigWheelController.prototype.onDisable = function () {
        var self = this;
        self.onceEnter = null;
    };
    NewBigWheelController.prototype.start = function () {
    };
    NewBigWheelController.prototype.updateWinData = function (callback, isAdjust) {
        var _this = this;
        if (isAdjust === void 0) { isAdjust = false; }
        var self = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.newBigWheel_index,
            onSuccess: function (res) {
                if (res.code === 0) {
                    if (!_this.isValid) {
                        return;
                    }
                    var data = res.data;
                    if (data.itemListV2) {
                        for (var m = 0; m < data.itemListV2.length; m++) {
                            if (data.itemListV2[m] && data.itemListV2[m].type == 2) {
                                if (data.itemListV2[m].keyId == 2) {
                                    data.itemListV2[m].keyId = 1;
                                }
                                else if (data.itemListV2[m].keyId == 1) {
                                    data.itemListV2[m].keyId = 2;
                                }
                            }
                        }
                    }
                    _this.initWindowData(data, isAdjust);
                    if (callback)
                        callback();
                }
                else {
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: function (err) {
                XMSDK_1.default.toast('网络出错~', 2.5, 1);
            }
        });
    };
    NewBigWheelController.prototype.initWindowData = function (data, isAdjust) {
        var self = this;
        self.data = data;
        var signPrizeArray = self.signItemNode.children; //更新签到信息
        var signList = data.signList;
        var signTimes = data.signTimes;
        var todayChecked = data.todayChecked;
        if (todayChecked) {
            self.btn_signDisable.active = true;
            self.btn_signGet.active = false;
        }
        else {
            self.btn_signDisable.active = false;
            self.btn_signGet.active = true;
        }
        var sevenPrize = 0;
        for (var i = 0; i < signList.length; i++) {
            var item = signPrizeArray[i];
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
                            var tempColor = new cc.Color();
                            item.getChildByName("newBigWheel_signFrame").getComponent(cc.Sprite).spriteFrame = self.signSprArray[0];
                            item.getChildByName("newBigWheel_signkuang1").getComponent(cc.Sprite).spriteFrame = self.signSprFrameArray[1];
                            item.getChildByName("lable_signDay").color = tempColor.fromHEX("#C07B00");
                            item.getChildByName("lable_signPrizeNum").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#703300");
                            this.maiDianSignDay = i + 1;
                        }
                        else {
                            var tempColor = new cc.Color();
                            item.getChildByName("newBigWheel_signFrame").getComponent(cc.Sprite).spriteFrame = self.signSprArray[0];
                            item.getChildByName("newBigWheel_signkuang1").getComponent(cc.Sprite).spriteFrame = self.signSprFrameArray[0];
                            item.getChildByName("lable_signDay").color = tempColor.fromHEX("#964400");
                            item.getChildByName("lable_signPrizeNum").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#703300");
                        }
                    }
                    item.getChildByName("lable_signDay").getComponent(cc.Label).string = "\u7B2C" + (i + 1) + "\u5929";
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
        self.chouNode.getComponent("NewBigWheelChou").updateWinData(data); //初始化碎片转盘
        self.setTaskItem(); //更新任务信息
        self.lable_currentPhoneFragments.string = data.currentPhoneFragments + "/" + data.phoneFragmentsExchangeTotal; //首页碎片进度
        var width = data.currentPhoneFragments / data.phoneFragmentsExchangeTotal * self.progressBar.parent.width;
        if (width > 0 && width < 20) {
            width = 20;
        }
        cc.tween(self.progressBar)
            .to(.2, { width: width })
            .start();
        if (data.prevPeriodList && data.prevPeriodList.length) { //轮播图
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
            var dayEnterSignNum = this.dayEnterSignNum;
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
    };
    NewBigWheelController.prototype.clickSignTab = function () {
        var self = this;
        self.signNode.active = true;
        self.tabSignRed.active = false;
        self.chouNode.active = false;
        self.signTab.getComponent(cc.Sprite).spriteFrame = self.tabSprArray[0];
        self.chouTab.getComponent(cc.Sprite).spriteFrame = self.tabSprArray[1];
        var tempColor = new cc.Color();
        self.lableNode_signTab.color = tempColor.fromHEX("#9C4803");
        self.lableNode_chouTab.color = tempColor.fromHEX("#DA8C01");
        if (self.data["buttonType"] == 4) {
            self.tabChouRed.active = false;
        }
        else {
            self.tabChouRed.active = true;
        }
    };
    NewBigWheelController.prototype.clickChouTab = function () {
        var self = this;
        self.signNode.active = false;
        self.tabChouRed.active = false;
        self.chouNode.active = true;
        self.signTab.getComponent(cc.Sprite).spriteFrame = self.tabSprArray[1];
        self.chouTab.getComponent(cc.Sprite).spriteFrame = self.tabSprArray[0];
        var tempColor = new cc.Color();
        self.lableNode_signTab.color = tempColor.fromHEX("#DA8C01");
        self.lableNode_chouTab.color = tempColor.fromHEX("#9C4803");
        if (self.data["todayChecked"]) {
            self.tabSignRed.active = false;
        }
        else {
            self.tabSignRed.active = true;
        }
    };
    NewBigWheelController.prototype.setTaskItem = function () {
        var self = this;
        var taskList = self.data["taskList"];
        if (!self.creatItemOk) {
            for (var i = 0; i < taskList.length; i++) {
                var taskItem = cc.instantiate(self.taskTempItem);
                taskItem.parent = self.taskContent;
                taskItem.active = true;
            }
            self.creatItemOk = true;
        }
        var taskListItem = self.taskContent.children;
        var taskItem00 = taskListItem[0];
        if (taskItem00) {
            taskItem00.getComponent("NewBigTaskItem").setVideoTast(this.data["watchCount"], this.data["watchCountLimit"]);
        }
        for (var i = 0; i < taskList.length; i++) {
            if (taskListItem[i + 1]) {
                var taskItem = taskListItem[i + 1];
                var taskItemData = taskList[i];
                taskItem.getComponent("NewBigTaskItem").setTaskItem(taskItemData);
            }
        }
    };
    NewBigWheelController.prototype.clickSign = function () {
        var _this = this;
        if (this.data && this.data["todayChecked"]) {
            return;
        }
        if (this.isClickSign) {
            return;
        }
        this.isClickSign = true;
        setTimeout(function () {
            _this.isClickSign = false;
        }, 3000);
        // XMSDK.track({
        //     eventName: SAConst.lotto_phone_click,
        //     props: {
        //         activity_button_click: "签到领取碎片",
        //     }
        // });
        TrackMgr_1.default.lotto_phone_click({
            activity_button_click: "签到领取碎片",
        });
        soundController_1.default.singleton.clickAudio();
        AdController_1.default.loadAd(AdPosition_1.AdPosition.WheelGetSign, function () {
            //延迟10毫秒，才不会出现请求超时失败问题
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.newBigWheel_checkIn,
                onSuccess: function (res) {
                    if (res.code === 0) {
                        var data = res.data;
                        _this.openPrizeWin(4, "手机碎片", { rewardPhoneFragments: data.rewardPhoneFragments });
                        _this.updateWinData();
                        TrackMgr_1.default.LuckDrawProductDialog({
                            awad_dialog: "签到奖励弹窗",
                            awad_double_dialog: "手机碎片奖励翻倍弹窗",
                        });
                        // XMSDK.track({
                        //     eventName: SAConst.wheel.LuckDrawProductDialog,
                        //     props: {
                        //         awad_dialog: "签到奖励弹窗",
                        //         awad_double_dialog: "手机碎片奖励翻倍弹窗",
                        //     }
                        // });
                        TrackMgr_1.default.lotto_sign_chip({
                            click_sign_button: 1,
                            is_sign_suc: true,
                            sign_day: _this.maiDianSignDay
                        });
                    }
                    else {
                        TrackMgr_1.default.lotto_sign_chip({
                            click_sign_button: 1,
                            is_sign_suc: false,
                            sign_day: _this.maiDianSignDay
                        });
                        XMSDK_1.default.toast('网络请求错误，请重试', 1.5, 2);
                    }
                },
                onFail: function (res) {
                    AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
                }
            });
        }, function () {
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    NewBigWheelController.prototype.openPrizeWin = function (type, maiDianStr, doubleData) {
        var _this = this;
        this.updateWinData(function () {
            _this.newBigWheelPrize.node.active = true;
            _this.newBigWheelPrize.barUpdate(_this.data, type, maiDianStr, doubleData);
        });
    };
    NewBigWheelController.prototype.onClickRuleButton = function () {
        var self = this;
        soundController_1.default.singleton.clickAudio();
        var BigWheelRuleModal = cc.instantiate(this.BigWheelRuleModalPrefab);
        BigWheelRuleModal.getComponent('BigWheelRuleModal').open(self.data["beginDate"], self.data["endDate"]);
        TrackMgr_1.default.AppClick({
            app_page_title: '幸运大转盘页',
            app_ck_module: '活动规则',
        });
        // XMSDK.track({
        //     eventName: SAConst.AppClick,
        //     props: {
        //         app_page_title: '幸运大转盘页',
        //         app_ck_module: '活动规则',
        //     }
        // });
    };
    NewBigWheelController.prototype.moveChouPos = function () {
        var self = this;
        self.content.stopAllActions();
        // let action = cc.moveTo(0.2, 0, 840);
        // self.content.runAction(action);
        self.scrollMoveTop();
        self.clickChouTab();
    };
    NewBigWheelController.prototype.moveTaskPos = function () {
        var self = this;
        self.content.stopAllActions();
        var action = cc.moveTo(0.2, 0, 1740);
        self.content.runAction(action);
    };
    NewBigWheelController.prototype.getData = function () {
        return this.data;
    };
    NewBigWheelController.prototype.clickToast = function () {
        var data = this.data;
        if (!data)
            return;
        XMSDK_1.default.toast("\u8FD8\u5DEE" + (data["phoneFragmentsExchangeTotal"] - data["currentPhoneFragments"]) + "\u788E\u7247\u5373\u53EF\u5151\u6362\u534E\u4E3AP40\u624B\u673A");
        TrackMgr_1.default.lotto_phone_click({
            activity_button_click: "兑换",
        });
        // XMSDK.track({
        //     eventName: SAConst.lotto_phone_click,
        //     props: {
        //         activity_button_click: "兑换",
        //     }
        // });
    };
    NewBigWheelController.prototype.clickClose = function () {
        if (util_1.default.getTempParm("newBigWheel_wheelIsRunning")) {
            return;
        }
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        this.closeCall && this.closeCall();
        this.closeCall = null;
    };
    NewBigWheelController.prototype.clickDisableSign = function () {
        soundController_1.default.singleton.clickAudio();
        XMSDK_1.default.toast("今日已领取，请明日再来");
    };
    NewBigWheelController.prototype.setScroller = function (state) {
        this.scrollView.vertical = state;
    };
    __decorate([
        property(cc.ScrollView)
    ], NewBigWheelController.prototype, "scrollView", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "frameNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "signItemNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NewBigWheelController.prototype, "signSprArray", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NewBigWheelController.prototype, "signSprFrameArray", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "btn_signDisable", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "btn_signGet", void 0);
    __decorate([
        property(cc.RichText)
    ], NewBigWheelController.prototype, "lable_sevenSign", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "signNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "chouNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "taskNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "taskTempItem", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "taskContent", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "tabSignRed", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "tabChouRed", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NewBigWheelController.prototype, "tabSprArray", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "signTab", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "chouTab", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "lableNode_signTab", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "lableNode_chouTab", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "bigWheelMarquee", void 0);
    __decorate([
        property(cc.Label)
    ], NewBigWheelController.prototype, "lable_currentPhoneFragments", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "progressBar", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelController.prototype, "btn_rule", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewBigWheelController.prototype, "BigWheelRuleModalPrefab", void 0);
    __decorate([
        property(NewBigWheelPrize_1.default)
    ], NewBigWheelController.prototype, "newBigWheelPrize", void 0);
    NewBigWheelController = __decorate([
        ccclass
    ], NewBigWheelController);
    return NewBigWheelController;
}(baseTs_1.default));
exports.default = NewBigWheelController;

cc._RF.pop();