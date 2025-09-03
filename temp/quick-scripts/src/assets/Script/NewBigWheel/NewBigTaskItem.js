"use strict";
cc._RF.push(module, '382c4Wp/qtNH5ZF3bMP4UaD', 'NewBigTaskItem');
// Script/NewBigWheel/NewBigTaskItem.ts

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
var AdPosition_1 = require("../common/AdPosition");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewBigTaskItem = /** @class */ (function (_super) {
    __extends(NewBigTaskItem, _super);
    function NewBigTaskItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controller = null;
        _this.controllerJs = null;
        _this.curNum = null;
        _this.allNum = null;
        return _this;
    }
    NewBigTaskItem.prototype.onLoad = function () {
        this.controllerJs = this.controller.getComponent("NewBigWheelController");
    };
    NewBigTaskItem.prototype.start = function () {
    };
    NewBigTaskItem.prototype.setVideoTast = function (curNum, allNum) {
        var self = this;
        self.node.getChildByName("btn_taskClick").active = false;
        self.node.getChildByName("btn_taskGo").active = false;
        self.node.getChildByName("btn_taskGray").active = false;
        self.node.getChildByName("New Node").getChildByName("lable_taskCount").getComponent(cc.RichText).string = "<color=#AA520D>\uFF08</c><color=#F5663F>" + curNum + "</color><color=#AA520D>/" + allNum + "\uFF09</c>";
        if (curNum < allNum) {
            self.node.getChildByName("btn_taskGo").active = true;
        }
        else {
            self.node.getChildByName("btn_taskGray").active = true;
        }
        this.curNum = curNum;
        this.allNum = allNum;
    };
    NewBigTaskItem.prototype.clickVideoTask = function () {
        var self = this;
        if (this.curNum >= this.allNum) {
            XMSDK_1.default.toast("今日已领取，请明日再来");
            return;
        }
        this.controllerJs.moveChouPos();
        AdController_1.default.loadAd(AdPosition_1.AdPosition.WheelGetRestTimes, function () {
            //广告观看完毕，关闭后
            setTimeout(function () {
                cc.director.emit("NewBigWheelPrize_againChou", { isNewBigTaskItem: true });
            }, 10);
        }, function () {
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    NewBigTaskItem.prototype.setTaskItem = function (taskItemData) {
        var self = this;
        self.node.getChildByName("New Node").getChildByName("lable_taskTitle").getComponent(cc.Label).string = taskItemData.taskTitle;
        self.node.getChildByName("btn_taskClick").active = false;
        self.node.getChildByName("btn_taskGo").active = false;
        self.node.getChildByName("btn_taskGray").active = false;
        if (taskItemData.buttonType == 2) {
            self.node.getChildByName("btn_taskGo").active = true;
        }
        else if (taskItemData.buttonType == 3) {
            self.node.getChildByName("btn_taskClick").active = true;
        }
        else if (taskItemData.buttonType == 4) {
            self.node.getChildByName("btn_taskGray").active = true;
        }
        self.node.getChildByName("New Node").getChildByName("lable_taskCount").getComponent(cc.RichText).string = "<color=#AA520D>\uFF08</c><color=#F5663F>" + taskItemData.userTaskValue + "</color><color=#AA520D>/" + taskItemData.taskValue + "\uFF09</c>";
        self.taskItemData = taskItemData;
    };
    NewBigTaskItem.prototype.clickItem = function () {
        var _this = this;
        var self = this;
        if (self.isClickItem) {
            return;
        }
        self.isClickItem = true;
        setTimeout(function () {
            self.isClickItem = false;
        }, 1000);
        // Global.audioUtils.playClick();
        soundController_1.default.singleton.clickAudio();
        var type = self.taskItemData.taskType;
        if (self.taskItemData.buttonType == 3) {
            TrackMgr_1.default.lotto_phone_click({
                activity_button_click: "领取抽奖机会",
                activity_state: self.taskItemData.taskTitle,
            });
            var taskId = self.taskItemData.id;
            XMSDK_1.default.post({
                url: UrlConst_1.UrlConst.newBigWheel_taskCheckIn,
                data: {
                    id: taskId
                },
                onSuccess: function (res) {
                    if (!_this.isValid) {
                        return;
                    }
                    if (res.code === 0) {
                        _this.controllerJs.updateWinData();
                        XMSDK_1.default.toast("抽奖次数+1");
                        _this.controllerJs.moveChouPos();
                    }
                    else {
                        XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                    }
                },
                onFail: function (res) {
                    XMSDK_1.default.toast('网络出错~', 2.5, 1);
                }
            });
            return;
        }
        else if (self.taskItemData.buttonType == 4) {
            XMSDK_1.default.toast("今日已领取，请明日再来");
            return;
        }
        else if (self.taskItemData.buttonType == 2) {
            this.controllerJs.closePage();
        }
    };
    __decorate([
        property(cc.Node)
    ], NewBigTaskItem.prototype, "controller", void 0);
    NewBigTaskItem = __decorate([
        ccclass
    ], NewBigTaskItem);
    return NewBigTaskItem;
}(cc.Component));
exports.default = NewBigTaskItem;

cc._RF.pop();