"use strict";
cc._RF.push(module, '0d98atMZH5OEpMj/lR78GxM', 'taskItem');
// Script/task/taskItem.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var PageManage_1 = require("../PageManage");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var taskItem = /** @class */ (function (_super) {
    __extends(taskItem, _super);
    function taskItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.Progress = null;
        _this.ProgressLabel = null;
        _this.coinLabel = null;
        _this.btnArr = [];
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.initData = null;
        //类型
        _this.typeTask = 0;
        //收益
        _this.isEarnings = false;
        //转盘
        _this.isTurntable = false;
        return _this;
        // update (dt) {}
    }
    taskItem.prototype.start = function () {
    };
    /**
     * 初始化
     * @param data 数据
     * @param type 类型 0是每日 1成就
     */
    taskItem.prototype.init = function (data, type) {
        this.initData = data;
        this.typeTask = type;
        this.titleLabel.string = this.initData.taskTitle;
        if (this.initData.taskType == 6 && this.typeTask == 0) {
            this.isEarnings = true;
        }
        else if (this.initData.taskType == 3 && this.typeTask == 0) {
            this.isTurntable = true;
        }
        this.Progress.progress = this.initData.userTaskValue / this.initData.taskValue;
        this.ProgressLabel.string = this.initData.userTaskValue + "/" + this.initData.taskValue;
        this.ProgressLabel.node.active = this.Progress.progress < 1;
        if (this.typeTask == 0) {
            this.coinLabel.string = this.initData.rewardValue;
        }
        else {
            this.coinLabel.string = this.initData.reward.rewardValue;
        }
        this.btnArr[0].active = this.btnArr[1].active = this.btnArr[2].active = this.btnArr[3].active = false;
        var showNum = 0;
        switch (this.initData.buttonType) {
            case 1:
                showNum = 0;
                break;
            case 3:
                showNum = 1;
                break;
            case 4:
                showNum = this.typeTask == 0 ? 2 : 3;
                break;
        }
        this.btnArr[showNum].active = true;
    };
    /**按钮 */
    taskItem.prototype.getBtn = function (event, res) {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        //地址
        var url = this.typeTask == 0 ? UrlConst_1.UrlConst.task_day_commonGet : UrlConst_1.UrlConst.achievement_commonGet;
        //金币数
        var coin = this.typeTask == 0 ? this.initData.rewardValue : this.initData.reward.rewardValue;
        var data = {};
        if (this.typeTask == 0) {
            data.id = this.initData.id;
        }
        else {
            data.taskId = this.initData.id;
        }
        TrackMgr_1.default.MissionPriceClick({
            mission_name: this.initData.taskTitle,
            mission_type: this.typeTask == 0 ? "日常任务" : "成就任务",
            mission_button: "领取",
            mission_coin: coin
        });
        if (this.initData && this.initData.taskTitle) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.TaskDayDoubleGet, function () {
                if (_this.initData) {
                    util_1.default.getdataStr({
                        url: url,
                        data: data,
                        success: function () {
                            if (!_this.isValid) {
                                return;
                            }
                            cc.game.emit(NameTs_1.default.Game_Task_updata);
                            console.log(_this.typeTask, 'this.initData.typeTask');
                            TrackMgr_1.default.finish_task({
                                mission_name: _this.initData.taskTitle,
                                mission_type: _this.typeTask == 0 ? "日常任务" : "成就任务",
                                mission_coin: coin
                            });
                            PageManage_1.default.singleton.closePage(pageTs_1.default.pageName.GameTask);
                            cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.node, value: coin, num: 10 });
                            AssistCtr_1.AssistCtr.showToastTip("完成" + (_this.typeTask == 0 ? "日常" : "成就") + "任务获得" + coin + "红包币");
                        },
                        fail: function () {
                            AssistCtr_1.AssistCtr.showToastTip("领取失败");
                        }
                    });
                }
                if (util_1.default.adPreObj[AdPosition_1.AdPosition.TaskDayDoubleGet]) {
                    util_1.default.preloadAd(AdPosition_1.AdPosition.TaskDayDoubleGet);
                }
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }
        else {
            AssistCtr_1.AssistCtr.showToastTip("领取失败");
            // this.closeBtn();
        }
        // PageManage.singleton.showPage(pageTs.pageName.GameTaskReward,{
        //     coin,
        //     url,
        //     data,
        //     typeTask:this.typeTask,
        //     taskTitle:this.initData.taskTitle
        // });
        // PageManage.singleton.closePage(pageTs.pageName.GameTask);
    };
    /**
     * 关闭
     */
    taskItem.prototype.closeBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        PageManage_1.default.singleton.closePage(pageTs_1.default.pageName.GameTask);
        var successFn = function (call) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.TaskDayDoubleGet, function () {
                call && call();
                // cc.game.emit(NameTs.Game_Task_updata);
                if (util_1.default.adPreObj[AdPosition_1.AdPosition.TaskDayDoubleGet]) {
                    util_1.default.preloadAd(AdPosition_1.AdPosition.TaskDayDoubleGet);
                }
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        };
        if (this.isEarnings) {
            PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.GameEarnings);
        }
        else if (this.isTurntable) {
            PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.GameGoldWheel);
        }
        else if (this.initData.taskType == 8 && this.typeTask == 0) {
            //每日任务看视频补充炮塔
            successFn(function () {
                util_1.default.sendTurretNum();
                util_1.default.productTurret(10);
                util_1.default.userData.GetTurretNum -= 1;
                AssistCtr_1.AssistCtr.showToastTip("获得10个炮塔！");
                util_1.default.setStorage(util_1.default.localDiary.GetTurretNum, util_1.default.userData.GetTurretNum);
                cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: _this.node, num: 10, parent: null });
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "任务弹窗",
                    ck_module: "补充炮塔",
                    active_ad_hcdg: "激励视频"
                });
            });
        }
        else if (this.initData.taskType == 4 && this.typeTask == 0) {
            //每日任务累计看视频
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "任务弹窗",
                ck_module: "累计15次激励视频",
                active_ad_hcdg: "激励视频"
            });
            successFn();
        }
        else if (this.initData.taskType == 5 && this.typeTask == 1) {
            //打开漂浮宝箱
            PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.GameTreasure);
        }
        else if (this.initData.taskType == 6 && this.typeTask == 1) {
            //成就任务累计观看视频
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "成就弹窗",
                ck_module: this.initData.taskTitle,
                active_ad_hcdg: "激励视频"
            });
            successFn();
        }
        else {
            PageManage_1.default.singleton.closePage(pageTs_1.default.pageName.GameTask);
        }
        TrackMgr_1.default.MissionPriceClick({
            mission_name: this.initData.taskTitle,
            mission_type: this.typeTask == 0 ? "日常任务" : "成就任务",
            mission_button: "前往",
        });
    };
    __decorate([
        property({ type: cc.Label, displayName: "标题" })
    ], taskItem.prototype, "titleLabel", void 0);
    __decorate([
        property({ type: cc.ProgressBar, displayName: "进度条" })
    ], taskItem.prototype, "Progress", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "进度条文字" })
    ], taskItem.prototype, "ProgressLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "金币" })
    ], taskItem.prototype, "coinLabel", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "状态按钮" })
    ], taskItem.prototype, "btnArr", void 0);
    taskItem = __decorate([
        ccclass
    ], taskItem);
    return taskItem;
}(cc.Component));
exports.default = taskItem;

cc._RF.pop();