
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/NewBigWheel/NewBigWheelController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnV2hlZWxDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBSWxELCtDQUE4QztBQUM5QyxzRUFBaUU7QUFDakUscURBQWdEO0FBQ2hELHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBQ2hDLHVEQUFrRDtBQUk1QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtRCx5Q0FBTTtJQUF6RDtRQUFBLHFFQTJlQztRQXplRyxnQkFBVSxHQUFrQixJQUFJLENBQUE7UUFFaEMsZUFBUyxHQUFZLElBQUksQ0FBQTtRQUV6QixhQUFPLEdBQVksSUFBSSxDQUFBO1FBRXZCLGtCQUFZLEdBQVksSUFBSSxDQUFBO1FBRTVCLGtCQUFZLEdBQTBCLEVBQUUsQ0FBQTtRQUV4Qyx1QkFBaUIsR0FBMEIsRUFBRSxDQUFBO1FBRTdDLHFCQUFlLEdBQVksSUFBSSxDQUFBO1FBRS9CLGlCQUFXLEdBQVksSUFBSSxDQUFBO1FBRTNCLHFCQUFlLEdBQWdCLElBQUksQ0FBQTtRQUVuQyxjQUFRLEdBQVksSUFBSSxDQUFBO1FBRXhCLGNBQVEsR0FBWSxJQUFJLENBQUE7UUFFeEIsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUV4QixrQkFBWSxHQUFZLElBQUksQ0FBQTtRQUU1QixpQkFBVyxHQUFZLElBQUksQ0FBQTtRQUUzQixnQkFBVSxHQUFZLElBQUksQ0FBQTtRQUUxQixnQkFBVSxHQUFZLElBQUksQ0FBQTtRQUUxQixpQkFBVyxHQUEwQixFQUFFLENBQUE7UUFFdkMsYUFBTyxHQUFZLElBQUksQ0FBQTtRQUV2QixhQUFPLEdBQVksSUFBSSxDQUFBO1FBRXZCLHVCQUFpQixH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QUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4REFDUztJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJEQUNNO0lBSXhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MEVBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsMEJBQWdCLENBQUM7bUVBQ2M7SUF6RHhCLHFCQUFxQjtRQUR6QyxPQUFPO09BQ2EscUJBQXFCLENBMmV6QztJQUFELDRCQUFDO0NBM2VELEFBMmVDLENBM2VrRCxnQkFBTSxHQTJleEQ7a0JBM2VvQixxQkFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB1c2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4uL1BhZ2VNYW5hZ2VcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IE5ld0JpZ1doZWVsUHJpemUgZnJvbSBcIi4vTmV3QmlnV2hlZWxQcml6ZVwiO1xuaW1wb3J0IE5ld0JpZ1doZWVsUHJpemVBd2FyZCBmcm9tIFwiLi9OZXdCaWdXaGVlbFByaXplQXdhcmRcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3QmlnV2hlZWxDb250cm9sbGVyIGV4dGVuZHMgYmFzZVRzIHtcbiAgICBAcHJvcGVydHkoY2MuU2Nyb2xsVmlldylcbiAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGZyYW1lTm9kZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNpZ25JdGVtTm9kZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBzaWduU3ByQXJyYXk6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgc2lnblNwckZyYW1lQXJyYXk6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuX3NpZ25EaXNhYmxlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9zaWduR2V0OiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBsYWJsZV9zZXZlblNpZ246IGNjLlJpY2hUZXh0ID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNpZ25Ob2RlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNob3VOb2RlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRhc2tOb2RlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRhc2tUZW1wSXRlbTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0YXNrQ29udGVudDogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0YWJTaWduUmVkOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRhYkNob3VSZWQ6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgdGFiU3ByQXJyYXk6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2lnblRhYjogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjaG91VGFiOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxhYmxlTm9kZV9zaWduVGFiOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxhYmxlTm9kZV9jaG91VGFiOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJpZ1doZWVsTWFycXVlZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfY3VycmVudFBob25lRnJhZ21lbnRzOiBjYy5MYWJlbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByb2dyZXNzQmFyOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9ydWxlOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgLy/mtLvliqjop4TliJlcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIEJpZ1doZWVsUnVsZU1vZGFsUHJlZmFiOiBjYy5QcmVmYWJcblxuICAgIEBwcm9wZXJ0eShOZXdCaWdXaGVlbFByaXplKVxuICAgIG5ld0JpZ1doZWVsUHJpemU6IE5ld0JpZ1doZWVsUHJpemUgPSBudWxsXG5cblxuICAgIC8v55WM6Z2iXG5cblxuICAgIGRhdGE6IHt9O1xuICAgIGRheUVudGVyU2lnbk51bTogYW55O1xuICAgIGNsb3NlQ2FsbDogYW55O1xuICAgIG9uY2VFbnRlcjogYW55O1xuICAgIG1haURpYW5TaWduRGF5OiBudW1iZXI7XG4gICAgY3JlYXRJdGVtT2s6IGFueTtcbiAgICBpc0NsaWNrU2lnbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5vbihcIk5ld0JpZ1doZWVsUHJpemVfYWdhaW5DaG91XCIsIHRoaXMubW92ZUNob3VQb3MsIHRoaXMpO1xuICAgICAgICBjYy5kaXJlY3Rvci5vbihcIm1vdmVDaG91UG9zXCIsIHRoaXMubW92ZUNob3VQb3MsIHRoaXMpO1xuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRheUVudGVyU2lnbk51bSA9IHV0aWwudXNlckRhdGEuZGF5RW50ZXJTaWduTnVtXG4gICAgICAgIGlmICh0aGlzLmRheUVudGVyU2lnbk51bSA8IDIpIHtcbiAgICAgICAgICAgIHV0aWwudXNlckRhdGEuZGF5RW50ZXJTaWduTnVtID0gdGhpcy5kYXlFbnRlclNpZ25OdW0gKyAxXG4gICAgICAgIH1cblxuXG4gICAgICAgIHNlbGYudXBkYXRlV2luRGF0YShudWxsLCB0cnVlKTtcbiAgICAgICAgVHJhY2tNZ3IubG90dG9fcGhvbmVfc2hvdyh7XG4gICAgICAgICAgICBhY3Rpdml0eV9zaG93OiBcIuWFjei0ueaLv+aJi+aculwiXG4gICAgICAgIH0pXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5sb3R0b19waG9uZV9zaG93LFxuICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgLy8gICAgICAgICBhY3Rpdml0eV9zaG93OiBcIuWFjei0ueaLv+aJi+aculwiLFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICBzZWxmLnNjcm9sbE1vdmVUb3AoKTtcbiAgICAgICAgdXRpbC5zZXRUZW1wUGFybShcIm5ld0JpZ1doZWVsX3doZWVsSXNSdW5uaW5nXCIsIGZhbHNlKTtcbiAgICAgICAgdXRpbC5zZXRUZW1wUGFybShcIk5vcm1hbFBhZ2VMaXN0X0JpZ1doZWVsXCIsIDEpXG4gICAgICAgIHNlbGYuc2V0U2Nyb2xsZXIodHJ1ZSk7XG4gICAgfVxuICAgIHNldENsb3NlQ2FsbChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNsb3NlQ2FsbCA9IGNhbGxiYWNrXG4gICAgfVxuICAgIHNjcm9sbE1vdmVUb3AoKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1RvcCgwLjEpO1xuICAgIH1cblxuICAgIGdvdG9DaG91UG9zKCkge1xuXG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYub25jZUVudGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZVdpbkRhdGEoY2FsbGJhY2s/OiBGdW5jdGlvbiwgaXNBZGp1c3QgPSBmYWxzZSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5uZXdCaWdXaGVlbF9pbmRleCxcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pdGVtTGlzdFYyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IGRhdGEuaXRlbUxpc3RWMi5sZW5ndGg7IG0rKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLml0ZW1MaXN0VjJbbV0gJiYgZGF0YS5pdGVtTGlzdFYyW21dLnR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pdGVtTGlzdFYyW21dLmtleUlkID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaXRlbUxpc3RWMlttXS5rZXlJZCA9IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLml0ZW1MaXN0VjJbbV0ua2V5SWQgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pdGVtTGlzdFYyW21dLmtleUlkID0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFdpbmRvd0RhdGEoZGF0YSwgaXNBZGp1c3QpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KCfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpbml0V2luZG93RGF0YShkYXRhLCBpc0FkanVzdCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgbGV0IHNpZ25Qcml6ZUFycmF5ID0gc2VsZi5zaWduSXRlbU5vZGUuY2hpbGRyZW47ICAgICAgICAgICAgICAvL+abtOaWsOetvuWIsOS/oeaBr1xuICAgICAgICBsZXQgc2lnbkxpc3QgPSBkYXRhLnNpZ25MaXN0O1xuICAgICAgICBsZXQgc2lnblRpbWVzID0gZGF0YS5zaWduVGltZXM7XG4gICAgICAgIGxldCB0b2RheUNoZWNrZWQgPSBkYXRhLnRvZGF5Q2hlY2tlZDtcblxuICAgICAgICBpZiAodG9kYXlDaGVja2VkKSB7XG4gICAgICAgICAgICBzZWxmLmJ0bl9zaWduRGlzYWJsZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5idG5fc2lnbkdldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuYnRuX3NpZ25EaXNhYmxlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5idG5fc2lnbkdldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNldmVuUHJpemUgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpZ25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNpZ25Qcml6ZUFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3NpZ25Qcml6ZU51bVwiKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9zaWduUHJpemVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzaWduTGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBzaWduTGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldmVuUHJpemUgPSBzaWduTGlzdFtpXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5ld0JpZ1doZWVsX3NpZ25HZXRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ25UaW1lcyA+PSBpICsgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5ld0JpZ1doZWVsX3NpZ25HZXRcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJuZXdCaWdXaGVlbF9zaWduR2V0XCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9zaWduRGF5XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRvZGF5Q2hlY2tlZCAmJiBzaWduVGltZXMgKyAxID09IGkgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJuZXdCaWdXaGVlbF9zaWduRnJhbWVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLnNpZ25TcHJBcnJheVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibmV3QmlnV2hlZWxfc2lnbmt1YW5nMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuc2lnblNwckZyYW1lQXJyYXlbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3NpZ25EYXlcIikuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgI0MwN0IwMGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9zaWduUHJpemVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgIzcwMzMwMGApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWlEaWFuU2lnbkRheSA9IGkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJuZXdCaWdXaGVlbF9zaWduRnJhbWVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLnNpZ25TcHJBcnJheVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibmV3QmlnV2hlZWxfc2lnbmt1YW5nMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuc2lnblNwckZyYW1lQXJyYXlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3NpZ25EYXlcIikuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgIzk2NDQwMGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9zaWduUHJpemVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgIzcwMzMwMGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9zaWduRGF5XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOesrCR7aSArIDF95aSpYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYoc2V2ZW5Qcml6ZSl7XG4gICAgICAgIC8vICAgICBzZWxmLmxhYmxlX3NldmVuU2lnbi5zdHJpbmcgPSBgPGNvbG9yPSM1ODM3OUY+56ysN+WkqemihjwvYz48Y29sb3I9I0ZBNTlCMz4ke3NldmVuUHJpemV95LiqPC9jb2xvcj48Y29sb3I9IzU4Mzc5Rj7noo7niYc8L2M+YDtcbiAgICAgICAgLy8gICAgIHNlbGYubGFibGVfc2V2ZW5TaWduLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLy8gfSAgICAgICAgXG4gICAgICAgIC8vIGVsc2V7XG4gICAgICAgIC8vICAgICBzZWxmLmxhYmxlX3NldmVuU2lnbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgc2VsZi5jaG91Tm9kZS5nZXRDb21wb25lbnQoXCJOZXdCaWdXaGVlbENob3VcIikudXBkYXRlV2luRGF0YShkYXRhKTsgICAgICAvL+WIneWni+WMlueijueJh+i9rOebmFxuXG4gICAgICAgIHNlbGYuc2V0VGFza0l0ZW0oKTsgICAgIC8v5pu05paw5Lu75Yqh5L+h5oGvXG5cbiAgICAgICAgc2VsZi5sYWJsZV9jdXJyZW50UGhvbmVGcmFnbWVudHMuc3RyaW5nID0gYCR7ZGF0YS5jdXJyZW50UGhvbmVGcmFnbWVudHN9LyR7ZGF0YS5waG9uZUZyYWdtZW50c0V4Y2hhbmdlVG90YWx9YDsgICAgICAvL+mmlumhteeijueJh+i/m+W6plxuICAgICAgICBsZXQgd2lkdGggPSBkYXRhLmN1cnJlbnRQaG9uZUZyYWdtZW50cyAvIGRhdGEucGhvbmVGcmFnbWVudHNFeGNoYW5nZVRvdGFsICogc2VsZi5wcm9ncmVzc0Jhci5wYXJlbnQud2lkdGg7XG4gICAgICAgIGlmICh3aWR0aCA+IDAgJiYgd2lkdGggPCAyMCkge1xuICAgICAgICAgICAgd2lkdGggPSAyMDtcbiAgICAgICAgfVxuICAgICAgICBjYy50d2VlbihzZWxmLnByb2dyZXNzQmFyKVxuICAgICAgICAgICAgLnRvKC4yLCB7IHdpZHRoOiB3aWR0aCB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG5cbiAgICAgICAgaWYgKGRhdGEucHJldlBlcmlvZExpc3QgJiYgZGF0YS5wcmV2UGVyaW9kTGlzdC5sZW5ndGgpIHsgICAgICAgICAgICAgICAgLy/ova7mkq3lm75cbiAgICAgICAgICAgIHNlbGYuYmlnV2hlZWxNYXJxdWVlLmdldENvbXBvbmVudChcIk5ld0JpZ1doZWVsTWFycXVlZVwiKS51cGRhdGVNYXJxdWVlTGlzdChkYXRhKTtcbiAgICAgICAgICAgIHNlbGYuYmlnV2hlZWxNYXJxdWVlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmJpZ1doZWVsTWFycXVlZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmZyYW1lTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBzZWxmLmJ0bl9ydWxlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNlbGYudGFza05vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXNlbGYub25jZUVudGVyKSB7XG4gICAgICAgICAgICBsZXQgZGF5RW50ZXJTaWduTnVtID0gdGhpcy5kYXlFbnRlclNpZ25OdW07XG4gICAgICAgICAgICBpZiAoZGF5RW50ZXJTaWduTnVtID49IDIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNsaWNrQ2hvdVRhYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2RheUNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbGlja1NpZ25UYWIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xpY2tDaG91VGFiKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5vbmNlRW50ZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvZGF5Q2hlY2tlZCkge1xuICAgICAgICAgICAgc2VsZi5jbGlja0Nob3VUYWIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrU2lnblRhYigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnNpZ25Ob2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNlbGYudGFiU2lnblJlZC5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBzZWxmLmNob3VOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHNlbGYuc2lnblRhYi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYudGFiU3ByQXJyYXlbMF07XG4gICAgICAgIHNlbGYuY2hvdVRhYi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYudGFiU3ByQXJyYXlbMV07XG5cbiAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgICAgICBzZWxmLmxhYmxlTm9kZV9zaWduVGFiLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCM5QzQ4MDNgKTtcbiAgICAgICAgc2VsZi5sYWJsZU5vZGVfY2hvdVRhYi5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjREE4QzAxYCk7XG5cbiAgICAgICAgaWYgKHNlbGYuZGF0YVtcImJ1dHRvblR5cGVcIl0gPT0gNCkge1xuICAgICAgICAgICAgc2VsZi50YWJDaG91UmVkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi50YWJDaG91UmVkLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja0Nob3VUYWIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5zaWduTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2VsZi50YWJDaG91UmVkLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHNlbGYuY2hvdU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5zaWduVGFiLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi50YWJTcHJBcnJheVsxXTtcbiAgICAgICAgc2VsZi5jaG91VGFiLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi50YWJTcHJBcnJheVswXTtcblxuICAgICAgICBsZXQgdGVtcENvbG9yID0gbmV3IGNjLkNvbG9yKCk7XG4gICAgICAgIHNlbGYubGFibGVOb2RlX3NpZ25UYWIuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgI0RBOEMwMWApO1xuICAgICAgICBzZWxmLmxhYmxlTm9kZV9jaG91VGFiLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCM5QzQ4MDNgKTtcblxuICAgICAgICBpZiAoc2VsZi5kYXRhW1widG9kYXlDaGVja2VkXCJdKSB7XG4gICAgICAgICAgICBzZWxmLnRhYlNpZ25SZWQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxmLnRhYlNpZ25SZWQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFRhc2tJdGVtKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCB0YXNrTGlzdCA9IHNlbGYuZGF0YVtcInRhc2tMaXN0XCJdO1xuXG4gICAgICAgIGlmICghc2VsZi5jcmVhdEl0ZW1Paykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0YXNrSXRlbSA9IGNjLmluc3RhbnRpYXRlKHNlbGYudGFza1RlbXBJdGVtKTtcbiAgICAgICAgICAgICAgICB0YXNrSXRlbS5wYXJlbnQgPSBzZWxmLnRhc2tDb250ZW50O1xuICAgICAgICAgICAgICAgIHRhc2tJdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNyZWF0SXRlbU9rID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0YXNrTGlzdEl0ZW0gPSBzZWxmLnRhc2tDb250ZW50LmNoaWxkcmVuO1xuXG4gICAgICAgIGxldCB0YXNrSXRlbTAwID0gdGFza0xpc3RJdGVtWzBdO1xuICAgICAgICBpZiAodGFza0l0ZW0wMCkge1xuICAgICAgICAgICAgdGFza0l0ZW0wMC5nZXRDb21wb25lbnQoXCJOZXdCaWdUYXNrSXRlbVwiKS5zZXRWaWRlb1Rhc3QodGhpcy5kYXRhW1wid2F0Y2hDb3VudFwiXSwgdGhpcy5kYXRhW1wid2F0Y2hDb3VudExpbWl0XCJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0YXNrTGlzdEl0ZW1baSArIDFdKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhc2tJdGVtID0gdGFza0xpc3RJdGVtW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBsZXQgdGFza0l0ZW1EYXRhID0gdGFza0xpc3RbaV07XG4gICAgICAgICAgICAgICAgdGFza0l0ZW0uZ2V0Q29tcG9uZW50KFwiTmV3QmlnVGFza0l0ZW1cIikuc2V0VGFza0l0ZW0odGFza0l0ZW1EYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrU2lnbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGFbXCJ0b2RheUNoZWNrZWRcIl0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMuaXNDbGlja1NpZ24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzQ2xpY2tTaWduID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzQ2xpY2tTaWduID0gZmFsc2U7XG4gICAgICAgIH0sIDMwMDApO1xuXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5sb3R0b19waG9uZV9jbGljayxcbiAgICAgICAgLy8gICAgIHByb3BzOiB7XG4gICAgICAgIC8vICAgICAgICAgYWN0aXZpdHlfYnV0dG9uX2NsaWNrOiBcIuetvuWIsOmihuWPlueijueJh1wiLFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcbiAgICAgICAgVHJhY2tNZ3IubG90dG9fcGhvbmVfY2xpY2soe1xuICAgICAgICAgICAgYWN0aXZpdHlfYnV0dG9uX2NsaWNrOiBcIuetvuWIsOmihuWPlueijueJh1wiLFxuICAgICAgICB9KVxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLldoZWVsR2V0U2lnbiwgKCkgPT4ge1xuICAgICAgICAgICAgLy/lu7bov58xMOavq+enku+8jOaJjeS4jeS8muWHuueOsOivt+axgui2heaXtuWksei0pemXrumimFxuICAgICAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5uZXdCaWdXaGVlbF9jaGVja0luLFxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuUHJpemVXaW4oNCwgXCLmiYvmnLrnoo7niYdcIiwgeyByZXdhcmRQaG9uZUZyYWdtZW50czogZGF0YS5yZXdhcmRQaG9uZUZyYWdtZW50cyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVXaW5EYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5MdWNrRHJhd1Byb2R1Y3REaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWRfZGlhbG9nOiBcIuetvuWIsOWlluWKseW8ueeql1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWRfZG91YmxlX2RpYWxvZzogXCLmiYvmnLrnoo7niYflpZblirHnv7vlgI3lvLnnqpdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBYTVNESy50cmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LndoZWVsLkx1Y2tEcmF3UHJvZHVjdERpYWxvZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FkX2RpYWxvZzogXCLnrb7liLDlpZblirHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgYXdhZF9kb3VibGVfZGlhbG9nOiBcIuaJi+acuueijueJh+WlluWKsee/u+WAjeW8ueeql1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5sb3R0b19zaWduX2NoaXAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrX3NpZ25fYnV0dG9uOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzX3NpZ25fc3VjOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25fZGF5OiB0aGlzLm1haURpYW5TaWduRGF5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmxvdHRvX3NpZ25fY2hpcCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tfc2lnbl9idXR0b246IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNfc2lnbl9zdWM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25fZGF5OiB0aGlzLm1haURpYW5TaWduRGF5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdCgn572R57uc6K+35rGC6ZSZ6K+v77yM6K+36YeN6K+VJywgMS41LCAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25GYWlsOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9wZW5Qcml6ZVdpbih0eXBlLCBtYWlEaWFuU3RyLCBkb3VibGVEYXRhKSB7XG4gICAgICAgIHRoaXMudXBkYXRlV2luRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5ld0JpZ1doZWVsUHJpemUubm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLm5ld0JpZ1doZWVsUHJpemUuYmFyVXBkYXRlKHRoaXMuZGF0YSwgdHlwZSwgbWFpRGlhblN0ciwgZG91YmxlRGF0YSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25DbGlja1J1bGVCdXR0b24oKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGxldCBCaWdXaGVlbFJ1bGVNb2RhbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuQmlnV2hlZWxSdWxlTW9kYWxQcmVmYWIpO1xuICAgICAgICBCaWdXaGVlbFJ1bGVNb2RhbC5nZXRDb21wb25lbnQoJ0JpZ1doZWVsUnVsZU1vZGFsJykub3BlbihzZWxmLmRhdGFbXCJiZWdpbkRhdGVcIl0sIHNlbGYuZGF0YVtcImVuZERhdGVcIl0pO1xuICAgICAgICBUcmFja01nci5BcHBDbGljayh7XG4gICAgICAgICAgICBhcHBfcGFnZV90aXRsZTogJ+W5uOi/kOWkp+i9rOebmOmhtScsXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiAn5rS75Yqo6KeE5YiZJyxcbiAgICAgICAgfSlcbiAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LkFwcENsaWNrLFxuICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgLy8gICAgICAgICBhcHBfcGFnZV90aXRsZTogJ+W5uOi/kOWkp+i9rOebmOmhtScsXG4gICAgICAgIC8vICAgICAgICAgYXBwX2NrX21vZHVsZTogJ+a0u+WKqOinhOWImScsXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIG1vdmVDaG91UG9zKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuY29udGVudC5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAvLyBsZXQgYWN0aW9uID0gY2MubW92ZVRvKDAuMiwgMCwgODQwKTtcbiAgICAgICAgLy8gc2VsZi5jb250ZW50LnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICBzZWxmLnNjcm9sbE1vdmVUb3AoKTtcbiAgICAgICAgc2VsZi5jbGlja0Nob3VUYWIoKTtcbiAgICB9XG5cbiAgICBtb3ZlVGFza1BvcygpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmNvbnRlbnQuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLm1vdmVUbygwLjIsIDAsIDE3NDApO1xuICAgICAgICBzZWxmLmNvbnRlbnQucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgfVxuXG4gICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9XG5cbiAgICBjbGlja1RvYXN0KCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm5cbiAgICAgICAgWE1TREsudG9hc3QoYOi/mOW3riR7ZGF0YVtcInBob25lRnJhZ21lbnRzRXhjaGFuZ2VUb3RhbFwiXSAtIGRhdGFbXCJjdXJyZW50UGhvbmVGcmFnbWVudHNcIl1956KO54mH5Y2z5Y+v5YWR5o2i5Y2O5Li6UDQw5omL5py6YCk7XG4gICAgICAgIFRyYWNrTWdyLmxvdHRvX3Bob25lX2NsaWNrKHtcbiAgICAgICAgICAgIGFjdGl2aXR5X2J1dHRvbl9jbGljazogXCLlhZHmjaJcIixcbiAgICAgICAgfSlcbiAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LmxvdHRvX3Bob25lX2NsaWNrLFxuICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgLy8gICAgICAgICBhY3Rpdml0eV9idXR0b25fY2xpY2s6IFwi5YWR5o2iXCIsXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIGNsaWNrQ2xvc2UoKSB7XG4gICAgICAgIGlmICh1dGlsLmdldFRlbXBQYXJtKFwibmV3QmlnV2hlZWxfd2hlZWxJc1J1bm5pbmdcIikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKVxuXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKClcbiAgICAgICAgdGhpcy5jbG9zZUNhbGwgJiYgdGhpcy5jbG9zZUNhbGwoKVxuICAgICAgICB0aGlzLmNsb3NlQ2FsbCA9IG51bGxcbiAgICB9XG5cbiAgICBjbGlja0Rpc2FibGVTaWduKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKVxuICAgICAgICBYTVNESy50b2FzdChcIuS7iuaXpeW3sumihuWPlu+8jOivt+aYjuaXpeWGjeadpVwiKTtcbiAgICB9XG5cbiAgICBzZXRTY3JvbGxlcihzdGF0ZSkge1xuICAgICAgICB0aGlzLnNjcm9sbFZpZXcudmVydGljYWwgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn1cbiJdfQ==