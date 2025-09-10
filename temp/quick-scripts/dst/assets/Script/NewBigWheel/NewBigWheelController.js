
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
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
        _this.lable_currentPhoneFragments = null;
        _this.progressBar = null;
        _this.btn_rule = null;
        //活动规则
        _this.BigWheelRuleModalPrefab = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnV2hlZWxDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBSWxELCtDQUE4QztBQUM5QyxzRUFBaUU7QUFDakUscURBQWdEO0FBQ2hELHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBQ2hDLHVEQUFrRDtBQUk1QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtRCx5Q0FBTTtJQUF6RDtRQUFBLHFFQTJlQztRQXplRyxnQkFBVSxHQUFrQixJQUFJLENBQUE7UUFFaEMsZUFBUyxHQUFZLElBQUksQ0FBQTtRQUV6QixhQUFPLEdBQVksSUFBSSxDQUFBO1FBRXZCLGtCQUFZLEdBQVksSUFBSSxDQUFBO1FBRTVCLGtCQUFZLEdBQTBCLEVBQUUsQ0FBQTtRQUV4Qyx1QkFBaUIsR0FBMEIsRUFBRSxDQUFBO1FBRTdDLHFCQUFlLEdBQVksSUFBSSxDQUFBO1FBRS9CLGlCQUFXLEdBQVksSUFBSSxDQUFBO1FBRTNCLHFCQUFlLEdBQWdCLElBQUksQ0FBQTtRQUVuQyxjQUFRLEdBQVksSUFBSSxDQUFBO1FBRXhCLGNBQVEsR0FBWSxJQUFJLENBQUE7UUFFeEIsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUV4QixrQkFBWSxHQUFZLElBQUksQ0FBQTtRQUU1QixpQkFBVyxHQUFZLElBQUksQ0FBQTtRQUUzQixnQkFBVSxHQUFZLElBQUksQ0FBQTtRQUUxQixnQkFBVSxHQUFZLElBQUksQ0FBQTtRQUUxQixpQkFBVyxHQUEwQixFQUFFLENBQUE7UUFFdkMsYUFBTyxHQUFZLElBQUksQ0FBQTtRQUV2QixhQUFPLEdBQVksSUFBSSxDQUFBO1FBRXZCLHVCQUFpQixHQUFZLElBQUksQ0FBQTtRQUVqQyx1QkFBaUIsR0FBWSxJQUFJLENBQUE7UUFFakMscUJBQWUsR0FBWSxJQUFJLENBQUE7UUFFL0IsaUNBQTJCLEdBQWEsSUFBSSxDQUFBO1FBRTVDLGlCQUFXLEdBQVksSUFBSSxDQUFBO1FBRTNCLGNBQVEsR0FBWSxJQUFJLENBQUE7UUFFeEIsTUFBTTtRQUVOLDZCQUF1QixHQUFjLElBQUksQ0FBQTtRQUd6QyxzQkFBZ0IsR0FBcUIsSUFBSSxDQUFBO1FBWXpDLGlCQUFXLEdBQVksS0FBSyxDQUFDOztRQXFhN0Isa0JBQWtCO0lBQ3RCLENBQUM7SUFwYUcsc0NBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQTtRQUNwRCxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLGNBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFBO1NBQzNEO1FBR0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0Isa0JBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN0QixhQUFhLEVBQUUsT0FBTztTQUN6QixDQUFDLENBQUE7UUFDRixnQkFBZ0I7UUFDaEIsMkNBQTJDO1FBQzNDLGVBQWU7UUFDZixrQ0FBa0M7UUFDbEMsUUFBUTtRQUNSLE1BQU07UUFFTixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsY0FBSSxDQUFDLFdBQVcsQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxjQUFJLENBQUMsV0FBVyxDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELDRDQUFZLEdBQVosVUFBYSxRQUFRO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO0lBQzdCLENBQUM7SUFDRCw2Q0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELDJDQUFXLEdBQVg7SUFFQSxDQUFDO0lBRUQseUNBQVMsR0FBVDtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQscUNBQUssR0FBTDtJQUVBLENBQUM7SUFFRCw2Q0FBYSxHQUFiLFVBQWMsUUFBbUIsRUFBRSxRQUFnQjtRQUFuRCxpQkFpQ0M7UUFqQ2tDLHlCQUFBLEVBQUEsZ0JBQWdCO1FBQy9DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixlQUFLLENBQUMsVUFBVSxDQUFDO1lBQ2IsR0FBRyxFQUFFLG1CQUFRLENBQUMsaUJBQWlCO1lBQy9CLFNBQVMsRUFBRSxVQUFBLEdBQUc7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQ2YsT0FBTztxQkFDVjtvQkFFRCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNwQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7d0JBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDN0MsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtnQ0FDcEQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7b0NBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtpQ0FDL0I7cUNBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7b0NBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtpQ0FDL0I7NkJBQ0o7eUJBQ0o7cUJBQ0o7b0JBQ0QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3BDLElBQUksUUFBUTt3QkFBRSxRQUFRLEVBQUUsQ0FBQTtpQkFDM0I7cUJBQ0k7b0JBQ0QsZUFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQy9DO1lBQ0wsQ0FBQztZQUNELE1BQU0sRUFBRSxVQUFBLEdBQUc7Z0JBQ1AsZUFBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsOENBQWMsR0FBZCxVQUFlLElBQUksRUFBRSxRQUFRO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFjLFFBQVE7UUFDdEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFckMsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ25DO2FBQ0k7WUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMxQixVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM1QjtnQkFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsRUFBRTtvQkFDNUMsSUFBSSxTQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7cUJBQzVEO3lCQUNJO3dCQUNELElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO3FCQUM3RDtvQkFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLEVBQUU7d0JBQ3RDLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUN6QyxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hHLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzlHLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQzFFLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUU3RyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQy9COzZCQUNJOzRCQUNELElBQUksU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDOUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDMUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQ2hIO3FCQUNKO29CQUNELElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFHLENBQUM7aUJBQ3JGO2FBQ0o7U0FDSjtRQUNELGtCQUFrQjtRQUNsQix5SEFBeUg7UUFDekgsK0NBQStDO1FBQy9DLFlBQVk7UUFDWixRQUFRO1FBQ1IsZ0RBQWdEO1FBQ2hELElBQUk7UUFFSixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLFNBQVM7UUFFakYsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUssUUFBUTtRQUVoQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxHQUFNLElBQUksQ0FBQyxxQkFBcUIsU0FBSSxJQUFJLENBQUMsMkJBQTZCLENBQUMsQ0FBTSxRQUFRO1FBQzVILElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFHLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1lBQ3pCLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDZDtRQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUNyQixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3hCLEtBQUssRUFBRSxDQUFDO1FBRWIsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQWlCLEtBQUs7WUFDekUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEM7YUFDSTtZQUNELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN2QztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRTVCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDM0MsSUFBSSxlQUFlLElBQUksQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3ZCO3FCQUNJO29CQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDdkI7YUFDSjtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO2FBQ0ksSUFBSSxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELDRDQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUUvQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RSxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ2xDO2FBQ0k7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsNENBQVksR0FBWjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRS9CLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZFLElBQUksU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNsQzthQUNJO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pELFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDbkMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDMUI7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRTdDLElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLFVBQVUsRUFBRTtZQUNaLFVBQVUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztTQUNqSDtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUksWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDckIsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixRQUFRLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3JFO1NBQ0o7SUFDTCxDQUFDO0lBRUQseUNBQVMsR0FBVDtRQUFBLGlCQXVFQztRQXRFRyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUN4QyxPQUFPO1NBQ1Y7UUFHRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsZ0JBQWdCO1FBQ2hCLDRDQUE0QztRQUM1QyxlQUFlO1FBQ2YsMkNBQTJDO1FBQzNDLFFBQVE7UUFDUixNQUFNO1FBQ04sa0JBQVEsQ0FBQyxpQkFBaUIsQ0FBQztZQUN2QixxQkFBcUIsRUFBRSxRQUFRO1NBQ2xDLENBQUMsQ0FBQTtRQUNGLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFZLENBQUMsTUFBTSxDQUFDLHVCQUFVLENBQUMsWUFBWSxFQUFFO1lBQ3pDLHNCQUFzQjtZQUN0QixlQUFLLENBQUMsVUFBVSxDQUFDO2dCQUNiLEdBQUcsRUFBRSxtQkFBUSxDQUFDLG1CQUFtQjtnQkFDakMsU0FBUyxFQUFFLFVBQUEsR0FBRztvQkFDVixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO3dCQUNoQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNwQixLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO3dCQUNqRixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLGtCQUFRLENBQUMscUJBQXFCLENBQUM7NEJBQzNCLFdBQVcsRUFBRSxRQUFROzRCQUNyQixrQkFBa0IsRUFBRSxZQUFZO3lCQUNuQyxDQUFDLENBQUE7d0JBQ0YsZ0JBQWdCO3dCQUNoQixzREFBc0Q7d0JBQ3RELGVBQWU7d0JBQ2YsaUNBQWlDO3dCQUNqQyw0Q0FBNEM7d0JBQzVDLFFBQVE7d0JBQ1IsTUFBTTt3QkFFTixrQkFBUSxDQUFDLGVBQWUsQ0FBQzs0QkFDckIsaUJBQWlCLEVBQUUsQ0FBQzs0QkFDcEIsV0FBVyxFQUFFLElBQUk7NEJBQ2pCLFFBQVEsRUFBRSxLQUFJLENBQUMsY0FBYzt5QkFDaEMsQ0FBQyxDQUFBO3FCQUdMO3lCQUFNO3dCQUNILGtCQUFRLENBQUMsZUFBZSxDQUFDOzRCQUNyQixpQkFBaUIsRUFBRSxDQUFDOzRCQUNwQixXQUFXLEVBQUUsS0FBSzs0QkFDbEIsUUFBUSxFQUFFLEtBQUksQ0FBQyxjQUFjO3lCQUNoQyxDQUFDLENBQUE7d0JBR0YsZUFBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNyQztnQkFDTCxDQUFDO2dCQUNELE1BQU0sRUFBRSxVQUFBLEdBQUc7b0JBQ1AscUJBQVMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRTFDLENBQUM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDLEVBQUU7WUFDQyxxQkFBUyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCw0Q0FBWSxHQUFaLFVBQWEsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVO1FBQXpDLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNmLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtZQUN4QyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxpREFBaUIsR0FBakI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JFLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN2RyxrQkFBUSxDQUFDLFFBQVEsQ0FBQztZQUNkLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLGFBQWEsRUFBRSxNQUFNO1NBQ3hCLENBQUMsQ0FBQTtRQUNGLGdCQUFnQjtRQUNoQixtQ0FBbUM7UUFDbkMsZUFBZTtRQUNmLG9DQUFvQztRQUNwQyxpQ0FBaUM7UUFDakMsUUFBUTtRQUNSLE1BQU07SUFDVixDQUFDO0lBRUQsMkNBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlCLHVDQUF1QztRQUN2QyxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsMkNBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsdUNBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsMENBQVUsR0FBVjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFNO1FBQ2pCLGVBQUssQ0FBQyxLQUFLLENBQUMsa0JBQUssSUFBSSxDQUFDLDZCQUE2QixDQUFDLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHFFQUFlLENBQUMsQ0FBQztRQUNyRyxrQkFBUSxDQUFDLGlCQUFpQixDQUFDO1lBQ3ZCLHFCQUFxQixFQUFFLElBQUk7U0FDOUIsQ0FBQyxDQUFBO1FBQ0YsZ0JBQWdCO1FBQ2hCLDRDQUE0QztRQUM1QyxlQUFlO1FBQ2YsdUNBQXVDO1FBQ3ZDLFFBQVE7UUFDUixNQUFNO0lBQ1YsQ0FBQztJQUVELDBDQUFVLEdBQVY7UUFDSSxJQUFJLGNBQUksQ0FBQyxXQUFXLENBQUMsNEJBQTRCLENBQUMsRUFBRTtZQUNoRCxPQUFPO1NBQ1Y7UUFDRCx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUV0QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDaEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7SUFDekIsQ0FBQztJQUVELGdEQUFnQixHQUFoQjtRQUNJLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ3RDLGVBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUF0ZUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQzs2REFDUTtJQUVoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzREQUNPO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MERBQ0s7SUFFdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrREFDVTtJQUU1QjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzsrREFDYTtJQUV4QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvRUFDa0I7SUFFN0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrRUFDYTtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNTO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7a0VBQ2E7SUFFbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyREFDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJEQUNNO0lBRXhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkRBQ007SUFFeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrREFDVTtJQUU1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNTO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkRBQ1E7SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2REFDUTtJQUUxQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs4REFDWTtJQUV2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNLO0lBRXZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MERBQ0s7SUFFdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvRUFDZTtJQUVqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29FQUNlO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0VBQ2E7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4RUFDeUI7SUFFNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4REFDUztJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJEQUNNO0lBSXhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MEVBQ3FCO0lBR3pDO1FBREMsUUFBUSxDQUFDLDBCQUFnQixDQUFDO21FQUNjO0lBekR4QixxQkFBcUI7UUFEekMsT0FBTztPQUNhLHFCQUFxQixDQTJlekM7SUFBRCw0QkFBQztDQTNlRCxBQTJlQyxDQTNla0QsZ0JBQU0sR0EyZXhEO2tCQTNlb0IscUJBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XHJcbmltcG9ydCB1c2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xyXG5pbXBvcnQgUGFnZU1hbmFnZSBmcm9tIFwiLi4vUGFnZU1hbmFnZVwiO1xyXG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcclxuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xyXG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XHJcbmltcG9ydCBOZXdCaWdXaGVlbFByaXplIGZyb20gXCIuL05ld0JpZ1doZWVsUHJpemVcIjtcclxuaW1wb3J0IE5ld0JpZ1doZWVsUHJpemVBd2FyZCBmcm9tIFwiLi9OZXdCaWdXaGVlbFByaXplQXdhcmRcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3QmlnV2hlZWxDb250cm9sbGVyIGV4dGVuZHMgYmFzZVRzIHtcclxuICAgIEBwcm9wZXJ0eShjYy5TY3JvbGxWaWV3KVxyXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZnJhbWVOb2RlOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzaWduSXRlbU5vZGU6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNpZ25TcHJBcnJheTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW11cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc2lnblNwckZyYW1lQXJyYXk6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bl9zaWduRGlzYWJsZTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuX3NpZ25HZXQ6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBsYWJsZV9zZXZlblNpZ246IGNjLlJpY2hUZXh0ID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzaWduTm9kZTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2hvdU5vZGU6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRhc2tOb2RlOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0YXNrVGVtcEl0ZW06IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRhc2tDb250ZW50OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0YWJTaWduUmVkOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0YWJDaG91UmVkOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICB0YWJTcHJBcnJheTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW11cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc2lnblRhYjogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2hvdVRhYjogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbGFibGVOb2RlX3NpZ25UYWI6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxhYmxlTm9kZV9jaG91VGFiOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiaWdXaGVlbE1hcnF1ZWU6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV9jdXJyZW50UGhvbmVGcmFnbWVudHM6IGNjLkxhYmVsID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcm9ncmVzc0JhcjogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuX3J1bGU6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgLy/mtLvliqjop4TliJlcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBCaWdXaGVlbFJ1bGVNb2RhbFByZWZhYjogY2MuUHJlZmFiID0gbnVsbFxyXG5cclxuICAgIEBwcm9wZXJ0eShOZXdCaWdXaGVlbFByaXplKVxyXG4gICAgbmV3QmlnV2hlZWxQcml6ZTogTmV3QmlnV2hlZWxQcml6ZSA9IG51bGxcclxuXHJcblxyXG4gICAgLy/nlYzpnaJcclxuXHJcblxyXG4gICAgZGF0YToge307XHJcbiAgICBkYXlFbnRlclNpZ25OdW06IGFueTtcclxuICAgIGNsb3NlQ2FsbDogYW55O1xyXG4gICAgb25jZUVudGVyOiBhbnk7XHJcbiAgICBtYWlEaWFuU2lnbkRheTogbnVtYmVyO1xyXG4gICAgY3JlYXRJdGVtT2s6IGFueTtcclxuICAgIGlzQ2xpY2tTaWduOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9uKFwiTmV3QmlnV2hlZWxQcml6ZV9hZ2FpbkNob3VcIiwgdGhpcy5tb3ZlQ2hvdVBvcywgdGhpcyk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oXCJtb3ZlQ2hvdVBvc1wiLCB0aGlzLm1vdmVDaG91UG9zLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kYXlFbnRlclNpZ25OdW0gPSB1dGlsLnVzZXJEYXRhLmRheUVudGVyU2lnbk51bVxyXG4gICAgICAgIGlmICh0aGlzLmRheUVudGVyU2lnbk51bSA8IDIpIHtcclxuICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5kYXlFbnRlclNpZ25OdW0gPSB0aGlzLmRheUVudGVyU2lnbk51bSArIDFcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzZWxmLnVwZGF0ZVdpbkRhdGEobnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgVHJhY2tNZ3IubG90dG9fcGhvbmVfc2hvdyh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3Nob3c6IFwi5YWN6LS55ou/5omL5py6XCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LmxvdHRvX3Bob25lX3Nob3csXHJcbiAgICAgICAgLy8gICAgIHByb3BzOiB7XHJcbiAgICAgICAgLy8gICAgICAgICBhY3Rpdml0eV9zaG93OiBcIuWFjei0ueaLv+aJi+aculwiLFxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIHNlbGYuc2Nyb2xsTW92ZVRvcCgpO1xyXG4gICAgICAgIHV0aWwuc2V0VGVtcFBhcm0oXCJuZXdCaWdXaGVlbF93aGVlbElzUnVubmluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgdXRpbC5zZXRUZW1wUGFybShcIk5vcm1hbFBhZ2VMaXN0X0JpZ1doZWVsXCIsIDEpXHJcbiAgICAgICAgc2VsZi5zZXRTY3JvbGxlcih0cnVlKTtcclxuICAgIH1cclxuICAgIHNldENsb3NlQ2FsbChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2xvc2VDYWxsID0gY2FsbGJhY2tcclxuICAgIH1cclxuICAgIHNjcm9sbE1vdmVUb3AoKSB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvVG9wKDAuMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ290b0Nob3VQb3MoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5vbmNlRW50ZXIgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVXaW5EYXRhKGNhbGxiYWNrPzogRnVuY3Rpb24sIGlzQWRqdXN0ID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XHJcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QubmV3QmlnV2hlZWxfaW5kZXgsXHJcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaXRlbUxpc3RWMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IGRhdGEuaXRlbUxpc3RWMi5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaXRlbUxpc3RWMlttXSAmJiBkYXRhLml0ZW1MaXN0VjJbbV0udHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaXRlbUxpc3RWMlttXS5rZXlJZCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaXRlbUxpc3RWMlttXS5rZXlJZCA9IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuaXRlbUxpc3RWMlttXS5rZXlJZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaXRlbUxpc3RWMlttXS5rZXlJZCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0V2luZG93RGF0YShkYXRhLCBpc0FkanVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KCfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFdpbmRvd0RhdGEoZGF0YSwgaXNBZGp1c3QpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgbGV0IHNpZ25Qcml6ZUFycmF5ID0gc2VsZi5zaWduSXRlbU5vZGUuY2hpbGRyZW47ICAgICAgICAgICAgICAvL+abtOaWsOetvuWIsOS/oeaBr1xyXG4gICAgICAgIGxldCBzaWduTGlzdCA9IGRhdGEuc2lnbkxpc3Q7XHJcbiAgICAgICAgbGV0IHNpZ25UaW1lcyA9IGRhdGEuc2lnblRpbWVzO1xyXG4gICAgICAgIGxldCB0b2RheUNoZWNrZWQgPSBkYXRhLnRvZGF5Q2hlY2tlZDtcclxuXHJcbiAgICAgICAgaWYgKHRvZGF5Q2hlY2tlZCkge1xyXG4gICAgICAgICAgICBzZWxmLmJ0bl9zaWduRGlzYWJsZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLmJ0bl9zaWduR2V0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5idG5fc2lnbkRpc2FibGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuYnRuX3NpZ25HZXQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZXZlblByaXplID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpZ25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2lnblByaXplQXJyYXlbaV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9zaWduUHJpemVOdW1cIikpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9zaWduUHJpemVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzaWduTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IHNpZ25MaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXZlblByaXplID0gc2lnbkxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJuZXdCaWdXaGVlbF9zaWduR2V0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ25UaW1lcyA+PSBpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibmV3QmlnV2hlZWxfc2lnbkdldFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5ld0JpZ1doZWVsX3NpZ25HZXRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3NpZ25EYXlcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0b2RheUNoZWNrZWQgJiYgc2lnblRpbWVzICsgMSA9PSBpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5ld0JpZ1doZWVsX3NpZ25GcmFtZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuc2lnblNwckFycmF5WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5ld0JpZ1doZWVsX3NpZ25rdWFuZzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLnNpZ25TcHJGcmFtZUFycmF5WzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3NpZ25EYXlcIikuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgI0MwN0IwMGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3NpZ25Qcml6ZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjNzAzMzAwYCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWlEaWFuU2lnbkRheSA9IGkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5ld0JpZ1doZWVsX3NpZ25GcmFtZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuc2lnblNwckFycmF5WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5ld0JpZ1doZWVsX3NpZ25rdWFuZzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLnNpZ25TcHJGcmFtZUFycmF5WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3NpZ25EYXlcIikuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgIzk2NDQwMGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3NpZ25Qcml6ZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjNzAzMzAwYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3NpZ25EYXlcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg56ysJHtpICsgMX3lpKlgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKHNldmVuUHJpemUpe1xyXG4gICAgICAgIC8vICAgICBzZWxmLmxhYmxlX3NldmVuU2lnbi5zdHJpbmcgPSBgPGNvbG9yPSM1ODM3OUY+56ysN+WkqemihjwvYz48Y29sb3I9I0ZBNTlCMz4ke3NldmVuUHJpemV95LiqPC9jb2xvcj48Y29sb3I9IzU4Mzc5Rj7noo7niYc8L2M+YDtcclxuICAgICAgICAvLyAgICAgc2VsZi5sYWJsZV9zZXZlblNpZ24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIH0gICAgICAgIFxyXG4gICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgLy8gICAgIHNlbGYubGFibGVfc2V2ZW5TaWduLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBzZWxmLmNob3VOb2RlLmdldENvbXBvbmVudChcIk5ld0JpZ1doZWVsQ2hvdVwiKS51cGRhdGVXaW5EYXRhKGRhdGEpOyAgICAgIC8v5Yid5aeL5YyW56KO54mH6L2s55uYXHJcblxyXG4gICAgICAgIHNlbGYuc2V0VGFza0l0ZW0oKTsgICAgIC8v5pu05paw5Lu75Yqh5L+h5oGvXHJcblxyXG4gICAgICAgIHNlbGYubGFibGVfY3VycmVudFBob25lRnJhZ21lbnRzLnN0cmluZyA9IGAke2RhdGEuY3VycmVudFBob25lRnJhZ21lbnRzfS8ke2RhdGEucGhvbmVGcmFnbWVudHNFeGNoYW5nZVRvdGFsfWA7ICAgICAgLy/pppbpobXnoo7niYfov5vluqZcclxuICAgICAgICBsZXQgd2lkdGggPSBkYXRhLmN1cnJlbnRQaG9uZUZyYWdtZW50cyAvIGRhdGEucGhvbmVGcmFnbWVudHNFeGNoYW5nZVRvdGFsICogc2VsZi5wcm9ncmVzc0Jhci5wYXJlbnQud2lkdGg7XHJcbiAgICAgICAgaWYgKHdpZHRoID4gMCAmJiB3aWR0aCA8IDIwKSB7XHJcbiAgICAgICAgICAgIHdpZHRoID0gMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnR3ZWVuKHNlbGYucHJvZ3Jlc3NCYXIpXHJcbiAgICAgICAgICAgIC50byguMiwgeyB3aWR0aDogd2lkdGggfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnByZXZQZXJpb2RMaXN0ICYmIGRhdGEucHJldlBlcmlvZExpc3QubGVuZ3RoKSB7ICAgICAgICAgICAgICAgIC8v6L2u5pKt5Zu+XHJcbiAgICAgICAgICAgIHNlbGYuYmlnV2hlZWxNYXJxdWVlLmdldENvbXBvbmVudChcIk5ld0JpZ1doZWVsTWFycXVlZVwiKS51cGRhdGVNYXJxdWVlTGlzdChkYXRhKTtcclxuICAgICAgICAgICAgc2VsZi5iaWdXaGVlbE1hcnF1ZWUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuYmlnV2hlZWxNYXJxdWVlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmZyYW1lTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHNlbGYuYnRuX3J1bGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLnRhc2tOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghc2VsZi5vbmNlRW50ZXIpIHtcclxuICAgICAgICAgICAgbGV0IGRheUVudGVyU2lnbk51bSA9IHRoaXMuZGF5RW50ZXJTaWduTnVtO1xyXG4gICAgICAgICAgICBpZiAoZGF5RW50ZXJTaWduTnVtID49IDIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2xpY2tDaG91VGFiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRvZGF5Q2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xpY2tTaWduVGFiKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsaWNrQ2hvdVRhYigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYub25jZUVudGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodG9kYXlDaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDaG91VGFiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrU2lnblRhYigpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zaWduTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHNlbGYudGFiU2lnblJlZC5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc2VsZi5jaG91Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc2VsZi5zaWduVGFiLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi50YWJTcHJBcnJheVswXTtcclxuICAgICAgICBzZWxmLmNob3VUYWIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLnRhYlNwckFycmF5WzFdO1xyXG5cclxuICAgICAgICBsZXQgdGVtcENvbG9yID0gbmV3IGNjLkNvbG9yKCk7XHJcbiAgICAgICAgc2VsZi5sYWJsZU5vZGVfc2lnblRhYi5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjOUM0ODAzYCk7XHJcbiAgICAgICAgc2VsZi5sYWJsZU5vZGVfY2hvdVRhYi5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjREE4QzAxYCk7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmRhdGFbXCJidXR0b25UeXBlXCJdID09IDQpIHtcclxuICAgICAgICAgICAgc2VsZi50YWJDaG91UmVkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi50YWJDaG91UmVkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ2hvdVRhYigpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zaWduTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLnRhYkNob3VSZWQuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHNlbGYuY2hvdU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLnNpZ25UYWIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLnRhYlNwckFycmF5WzFdO1xyXG4gICAgICAgIHNlbGYuY2hvdVRhYi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYudGFiU3ByQXJyYXlbMF07XHJcblxyXG4gICAgICAgIGxldCB0ZW1wQ29sb3IgPSBuZXcgY2MuQ29sb3IoKTtcclxuICAgICAgICBzZWxmLmxhYmxlTm9kZV9zaWduVGFiLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCNEQThDMDFgKTtcclxuICAgICAgICBzZWxmLmxhYmxlTm9kZV9jaG91VGFiLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCM5QzQ4MDNgKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuZGF0YVtcInRvZGF5Q2hlY2tlZFwiXSkge1xyXG4gICAgICAgICAgICBzZWxmLnRhYlNpZ25SZWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLnRhYlNpZ25SZWQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGFza0l0ZW0oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0YXNrTGlzdCA9IHNlbGYuZGF0YVtcInRhc2tMaXN0XCJdO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGYuY3JlYXRJdGVtT2spIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2tJdGVtID0gY2MuaW5zdGFudGlhdGUoc2VsZi50YXNrVGVtcEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdGFza0l0ZW0ucGFyZW50ID0gc2VsZi50YXNrQ29udGVudDtcclxuICAgICAgICAgICAgICAgIHRhc2tJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5jcmVhdEl0ZW1PayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGFza0xpc3RJdGVtID0gc2VsZi50YXNrQ29udGVudC5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgbGV0IHRhc2tJdGVtMDAgPSB0YXNrTGlzdEl0ZW1bMF07XHJcbiAgICAgICAgaWYgKHRhc2tJdGVtMDApIHtcclxuICAgICAgICAgICAgdGFza0l0ZW0wMC5nZXRDb21wb25lbnQoXCJOZXdCaWdUYXNrSXRlbVwiKS5zZXRWaWRlb1Rhc3QodGhpcy5kYXRhW1wid2F0Y2hDb3VudFwiXSwgdGhpcy5kYXRhW1wid2F0Y2hDb3VudExpbWl0XCJdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRhc2tMaXN0SXRlbVtpICsgMV0pIHtcclxuICAgICAgICAgICAgICAgIGxldCB0YXNrSXRlbSA9IHRhc2tMaXN0SXRlbVtpICsgMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFza0l0ZW1EYXRhID0gdGFza0xpc3RbaV07XHJcbiAgICAgICAgICAgICAgICB0YXNrSXRlbS5nZXRDb21wb25lbnQoXCJOZXdCaWdUYXNrSXRlbVwiKS5zZXRUYXNrSXRlbSh0YXNrSXRlbURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrU2lnbigpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YVtcInRvZGF5Q2hlY2tlZFwiXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNDbGlja1NpZ24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzQ2xpY2tTaWduID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0NsaWNrU2lnbiA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG5cclxuICAgICAgICAvLyBYTVNESy50cmFjayh7XHJcbiAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5sb3R0b19waG9uZV9jbGljayxcclxuICAgICAgICAvLyAgICAgcHJvcHM6IHtcclxuICAgICAgICAvLyAgICAgICAgIGFjdGl2aXR5X2J1dHRvbl9jbGljazogXCLnrb7liLDpooblj5bnoo7niYdcIixcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIFRyYWNrTWdyLmxvdHRvX3Bob25lX2NsaWNrKHtcclxuICAgICAgICAgICAgYWN0aXZpdHlfYnV0dG9uX2NsaWNrOiBcIuetvuWIsOmihuWPlueijueJh1wiLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XHJcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLldoZWVsR2V0U2lnbiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+W7tui/nzEw5q+r56eS77yM5omN5LiN5Lya5Ye6546w6K+35rGC6LaF5pe25aSx6LSl6Zeu6aKYXHJcbiAgICAgICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5uZXdCaWdXaGVlbF9jaGVja0luLFxyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Qcml6ZVdpbig0LCBcIuaJi+acuueijueJh1wiLCB7IHJld2FyZFBob25lRnJhZ21lbnRzOiBkYXRhLnJld2FyZFBob25lRnJhZ21lbnRzIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlV2luRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5MdWNrRHJhd1Byb2R1Y3REaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9kaWFsb2c6IFwi562+5Yiw5aWW5Yqx5by556qXXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX2RvdWJsZV9kaWFsb2c6IFwi5omL5py656KO54mH5aWW5Yqx57+75YCN5by556qXXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC53aGVlbC5MdWNrRHJhd1Byb2R1Y3REaWFsb2csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGF3YWRfZGlhbG9nOiBcIuetvuWIsOWlluWKseW8ueeql1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGF3YWRfZG91YmxlX2RpYWxvZzogXCLmiYvmnLrnoo7niYflpZblirHnv7vlgI3lvLnnqpdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5sb3R0b19zaWduX2NoaXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tfc2lnbl9idXR0b246IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc19zaWduX3N1YzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25fZGF5OiB0aGlzLm1haURpYW5TaWduRGF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5sb3R0b19zaWduX2NoaXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tfc2lnbl9idXR0b246IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc19zaWduX3N1YzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduX2RheTogdGhpcy5tYWlEaWFuU2lnbkRheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KCfnvZHnu5zor7fmsYLplJnor6/vvIzor7fph43or5UnLCAxLjUsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkZhaWw6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb3BlblByaXplV2luKHR5cGUsIG1haURpYW5TdHIsIGRvdWJsZURhdGEpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVdpbkRhdGEoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5ld0JpZ1doZWVsUHJpemUubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubmV3QmlnV2hlZWxQcml6ZS5iYXJVcGRhdGUodGhpcy5kYXRhLCB0eXBlLCBtYWlEaWFuU3RyLCBkb3VibGVEYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tSdWxlQnV0dG9uKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcclxuICAgICAgICBsZXQgQmlnV2hlZWxSdWxlTW9kYWwgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkJpZ1doZWVsUnVsZU1vZGFsUHJlZmFiKTtcclxuICAgICAgICBCaWdXaGVlbFJ1bGVNb2RhbC5nZXRDb21wb25lbnQoJ0JpZ1doZWVsUnVsZU1vZGFsJykub3BlbihzZWxmLmRhdGFbXCJiZWdpbkRhdGVcIl0sIHNlbGYuZGF0YVtcImVuZERhdGVcIl0pO1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcclxuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6ICflubjov5DlpKfovaznm5jpobUnLFxyXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiAn5rS75Yqo6KeE5YiZJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LkFwcENsaWNrLFxyXG4gICAgICAgIC8vICAgICBwcm9wczoge1xyXG4gICAgICAgIC8vICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6ICflubjov5DlpKfovaznm5jpobUnLFxyXG4gICAgICAgIC8vICAgICAgICAgYXBwX2NrX21vZHVsZTogJ+a0u+WKqOinhOWImScsXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlQ2hvdVBvcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5jb250ZW50LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgLy8gbGV0IGFjdGlvbiA9IGNjLm1vdmVUbygwLjIsIDAsIDg0MCk7XHJcbiAgICAgICAgLy8gc2VsZi5jb250ZW50LnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIHNlbGYuc2Nyb2xsTW92ZVRvcCgpO1xyXG4gICAgICAgIHNlbGYuY2xpY2tDaG91VGFiKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVRhc2tQb3MoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuY29udGVudC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5tb3ZlVG8oMC4yLCAwLCAxNzQwKTtcclxuICAgICAgICBzZWxmLmNvbnRlbnQucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrVG9hc3QoKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm5cclxuICAgICAgICBYTVNESy50b2FzdChg6L+Y5beuJHtkYXRhW1wicGhvbmVGcmFnbWVudHNFeGNoYW5nZVRvdGFsXCJdIC0gZGF0YVtcImN1cnJlbnRQaG9uZUZyYWdtZW50c1wiXX3noo7niYfljbPlj6/lhZHmjaLljY7kuLpQNDDmiYvmnLpgKTtcclxuICAgICAgICBUcmFja01nci5sb3R0b19waG9uZV9jbGljayh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X2J1dHRvbl9jbGljazogXCLlhZHmjaJcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LmxvdHRvX3Bob25lX2NsaWNrLFxyXG4gICAgICAgIC8vICAgICBwcm9wczoge1xyXG4gICAgICAgIC8vICAgICAgICAgYWN0aXZpdHlfYnV0dG9uX2NsaWNrOiBcIuWFkeaNolwiLFxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDbG9zZSgpIHtcclxuICAgICAgICBpZiAodXRpbC5nZXRUZW1wUGFybShcIm5ld0JpZ1doZWVsX3doZWVsSXNSdW5uaW5nXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKClcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKVxyXG4gICAgICAgIHRoaXMuY2xvc2VDYWxsICYmIHRoaXMuY2xvc2VDYWxsKClcclxuICAgICAgICB0aGlzLmNsb3NlQ2FsbCA9IG51bGxcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0Rpc2FibGVTaWduKCkge1xyXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpXHJcbiAgICAgICAgWE1TREsudG9hc3QoXCLku4rml6Xlt7Lpooblj5bvvIzor7fmmI7ml6Xlho3mnaVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2Nyb2xsZXIoc3RhdGUpIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcudmVydGljYWwgPSBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufVxyXG4iXX0=