
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/task/taskItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0d98atMZH5OEpMj/lR78GxM', 'taskItem');
// Script/task/taskItem.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var LanguageData_1 = require("../Language/LanguageData");
var PageManage_1 = require("../PageManage");
var UrlConst_1 = require("../server/UrlConst");
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
            // AdController.loadAd(AdPosition.TaskDayDoubleGet, () => {
            if (this.initData) {
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
            // if (util.adPreObj[AdPosition.TaskDayDoubleGet]) {
            //     util.preloadAd(AdPosition.TaskDayDoubleGet);
            // }
            // }, () => {
            //     AssistCtr.showToastTip("加载视频失败，请稍后！");
            // });
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
            // AdController.loadAd(AdPosition.TaskDayDoubleGet, () => {
            call && call();
            // cc.game.emit(NameTs.Game_Task_updata);
            //     if (util.adPreObj[AdPosition.TaskDayDoubleGet]) {
            //         util.preloadAd(AdPosition.TaskDayDoubleGet);
            //     }
            // }, () => {
            // });
        };
        if (this.isTurntable) {
            PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.GameGoldWheel);
        }
        else if (this.initData.taskType == 8 && this.typeTask == 0) {
            //每日任务看视频补充炮塔
            successFn(function () {
                util_1.default.sendTurretNum();
                util_1.default.productTurret(10);
                util_1.default.userData.GetTurretNum -= 1;
                AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('main.Got_turrets', 10));
                util_1.default.setStorage(util_1.default.localDiary.GetTurretNum, util_1.default.userData.GetTurretNum);
                cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: _this.node, num: 10, parent: null });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0YXNrXFx0YXNrSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFFaEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0Qyx5REFBNkM7QUFDN0MsNENBQXVDO0FBQ3ZDLCtDQUE4QztBQUU5QyxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQW9OQztRQWpOVyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLFlBQU0sR0FBYyxFQUFFLENBQUM7UUFFL0Isd0JBQXdCO1FBRXhCLGVBQWU7UUFFUCxjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQzdCLElBQUk7UUFDSSxjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRTdCLElBQUk7UUFDSSxnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUNwQyxJQUFJO1FBQ0ksaUJBQVcsR0FBWSxLQUFLLENBQUM7O1FBdUxyQyxpQkFBaUI7SUFDckIsQ0FBQztJQXRMRyx3QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx1QkFBSSxHQUFKLFVBQUssSUFBSSxFQUFFLElBQUk7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUVqRCxJQUFJLElBQUksQ0FBQyxRQUFRLENB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eEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUM7bURBQ1o7SUFHdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7K0NBQ2I7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDOzRDQUNwQjtJQWZkLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FvTjVCO0lBQUQsZUFBQztDQXBORCxBQW9OQyxDQXBOcUMsRUFBRSxDQUFDLFNBQVMsR0FvTmpEO2tCQXBOb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4uL1BhZ2VNYW5hZ2VcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0YXNrSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5qCH6aKYXCIgfSlcbiAgICBwcml2YXRlIHRpdGxlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByb2dyZXNzQmFyLCBkaXNwbGF5TmFtZTogXCLov5vluqbmnaFcIiB9KVxuICAgIHByaXZhdGUgUHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLov5vluqbmnaHmloflrZdcIiB9KVxuICAgIHByaXZhdGUgUHJvZ3Jlc3NMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIumHkeW4gVwiIH0pXG4gICAgcHJpdmF0ZSBjb2luTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5Ob2RlXSwgZGlzcGxheU5hbWU6IFwi54q25oCB5oyJ6ZKuXCIgfSlcbiAgICBwcml2YXRlIGJ0bkFycjogY2MuTm9kZVtdID0gW107XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YTogYW55ID0gbnVsbDtcbiAgICAvL+exu+Wei1xuICAgIHByaXZhdGUgdHlwZVRhc2s6IG51bWJlciA9IDA7XG5cbiAgICAvL+aUtuebilxuICAgIHByaXZhdGUgaXNFYXJuaW5nczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8v6L2s55uYXG4gICAgcHJpdmF0ZSBpc1R1cm50YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja5cbiAgICAgKiBAcGFyYW0gdHlwZSDnsbvlnosgMOaYr+avj+aXpSAx5oiQ5bCxXG4gICAgICovXG4gICAgaW5pdChkYXRhLCB0eXBlKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnR5cGVUYXNrID0gdHlwZTtcbiAgICAgICAgdGhpcy50aXRsZUxhYmVsLnN0cmluZyA9IHRoaXMuaW5pdERhdGEudGFza1RpdGxlO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXREYXRhLnRhc2tUeXBlID09IDYgJiYgdGhpcy50eXBlVGFzayA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzRWFybmluZ3MgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdERhdGEudGFza1R5cGUgPT0gMyAmJiB0aGlzLnR5cGVUYXNrID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNUdXJudGFibGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5Qcm9ncmVzcy5wcm9ncmVzcyA9IHRoaXMuaW5pdERhdGEudXNlclRhc2tWYWx1ZSAvIHRoaXMuaW5pdERhdGEudGFza1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuUHJvZ3Jlc3NMYWJlbC5zdHJpbmcgPSB0aGlzLmluaXREYXRhLnVzZXJUYXNrVmFsdWUgKyBcIi9cIiArIHRoaXMuaW5pdERhdGEudGFza1ZhbHVlO1xuICAgICAgICB0aGlzLlByb2dyZXNzTGFiZWwubm9kZS5hY3RpdmUgPSB0aGlzLlByb2dyZXNzLnByb2dyZXNzIDwgMTtcblxuICAgICAgICBpZiAodGhpcy50eXBlVGFzayA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvaW5MYWJlbC5zdHJpbmcgPSB0aGlzLmluaXREYXRhLnJld2FyZFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2luTGFiZWwuc3RyaW5nID0gdGhpcy5pbml0RGF0YS5yZXdhcmQucmV3YXJkVmFsdWU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuYnRuQXJyWzBdLmFjdGl2ZSA9IHRoaXMuYnRuQXJyWzFdLmFjdGl2ZSA9IHRoaXMuYnRuQXJyWzJdLmFjdGl2ZSA9IHRoaXMuYnRuQXJyWzNdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgc2hvd051bTogbnVtYmVyID0gMDtcbiAgICAgICAgc3dpdGNoICh0aGlzLmluaXREYXRhLmJ1dHRvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBzaG93TnVtID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBzaG93TnVtID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBzaG93TnVtID0gdGhpcy50eXBlVGFzayA9PSAwID8gMiA6IDM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idG5BcnJbc2hvd051bV0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cblxuICAgIC8qKuaMiemSriAqL1xuICAgIGdldEJ0bihldmVudCwgcmVzKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICAvL+WcsOWdgFxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLnR5cGVUYXNrID09IDAgPyBVcmxDb25zdC50YXNrX2RheV9jb21tb25HZXQgOiBVcmxDb25zdC5hY2hpZXZlbWVudF9jb21tb25HZXQ7XG4gICAgICAgIC8v6YeR5biB5pWwXG4gICAgICAgIGxldCBjb2luOiBudW1iZXIgPSB0aGlzLnR5cGVUYXNrID09IDAgPyB0aGlzLmluaXREYXRhLnJld2FyZFZhbHVlIDogdGhpcy5pbml0RGF0YS5yZXdhcmQucmV3YXJkVmFsdWU7XG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMudHlwZVRhc2sgPT0gMCkge1xuICAgICAgICAgICAgZGF0YS5pZCA9IHRoaXMuaW5pdERhdGEuaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhLnRhc2tJZCA9IHRoaXMuaW5pdERhdGEuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgVHJhY2tNZ3IuTWlzc2lvblByaWNlQ2xpY2soe1xuICAgICAgICAgICAgbWlzc2lvbl9uYW1lOiB0aGlzLmluaXREYXRhLnRhc2tUaXRsZSxcbiAgICAgICAgICAgIG1pc3Npb25fdHlwZTogdGhpcy50eXBlVGFzayA9PSAwID8gXCLml6XluLjku7vliqFcIiA6IFwi5oiQ5bCx5Lu75YqhXCIsXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbjogXCLpooblj5ZcIixcbiAgICAgICAgICAgIG1pc3Npb25fY29pbjogY29pblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIGlmICh0aGlzLmluaXREYXRhICYmIHRoaXMuaW5pdERhdGEudGFza1RpdGxlKSB7XG4gICAgICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVGFza0RheURvdWJsZUdldCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluaXREYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVUYXNrLCAndGhpcy5pbml0RGF0YS50eXBlVGFzaycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuZmluaXNoX3Rhc2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX25hbWU6IHRoaXMuaW5pdERhdGEudGFza1RpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX3R5cGU6IHRoaXMudHlwZVRhc2sgPT0gMCA/IFwi5pel5bi45Lu75YqhXCIgOiBcIuaIkOWwseS7u+WKoVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX2NvaW46IGNvaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5jbG9zZVBhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5ub2RlLCB2YWx1ZTogY29pbiwgbnVtOiAxMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5a6M5oiQXCIgKyAodGhpcy50eXBlVGFzayA9PSAwID8gXCLml6XluLhcIiA6IFwi5oiQ5bCxXCIpICsgXCLku7vliqHojrflvpdcIiArIGNvaW4gKyBcIue6ouWMheW4gVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIumihuWPluWksei0pVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0XSkge1xuICAgICAgICAgICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6aKG5Y+W5aSx6LSlXCIpO1xuICAgICAgICAgICAgLy8gdGhpcy5jbG9zZUJ0bigpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVRhc2tSZXdhcmQse1xuICAgICAgICAvLyAgICAgY29pbixcbiAgICAgICAgLy8gICAgIHVybCxcbiAgICAgICAgLy8gICAgIGRhdGEsXG4gICAgICAgIC8vICAgICB0eXBlVGFzazp0aGlzLnR5cGVUYXNrLFxuICAgICAgICAvLyAgICAgdGFza1RpdGxlOnRoaXMuaW5pdERhdGEudGFza1RpdGxlXG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyBQYWdlTWFuYWdlLnNpbmdsZXRvbi5jbG9zZVBhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl61cbiAgICAgKi9cbiAgICBjbG9zZUJ0bigpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLmNsb3NlUGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVRhc2spO1xuICAgICAgICBsZXQgc3VjY2Vzc0ZuID0gKGNhbGw/KSA9PiB7XG4gICAgICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVGFza0RheURvdWJsZUdldCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGwgJiYgY2FsbCgpO1xuICAgICAgICAgICAgICAgIC8vIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UYXNrX3VwZGF0YSk7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0XSkge1xuICAgICAgICAgICAgLy8gICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNUdXJudGFibGUpIHtcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lR29sZFdoZWVsKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluaXREYXRhLnRhc2tUeXBlID09IDggJiYgdGhpcy50eXBlVGFzayA9PSAwKSB7XG4gICAgICAgICAgICAvL+avj+aXpeS7u+WKoeeci+inhumikeihpeWFheeCruWhlFxuICAgICAgICAgICAgc3VjY2Vzc0ZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB1dGlsLnNlbmRUdXJyZXROdW0oKTtcbiAgICAgICAgICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQoMTApO1xuICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEuR2V0VHVycmV0TnVtIC09IDE7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KCdtYWluLkdvdF90dXJyZXRzJywgMTApKTtcblxuICAgICAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkuR2V0VHVycmV0TnVtLCB1dGlsLnVzZXJEYXRhLkdldFR1cnJldE51bSk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF90dXJyZXQsIHsgbm9kZTogdGhpcy5ub2RlLCBudW06IDEwLCBwYXJlbnQ6IG51bGwgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdERhdGEudGFza1R5cGUgPT0gNCAmJiB0aGlzLnR5cGVUYXNrID09IDApIHtcbiAgICAgICAgICAgIC8v5q+P5pel5Lu75Yqh57Sv6K6h55yL6KeG6aKRXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuS7u+WKoeW8ueeql1wiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLntK/orqExNeasoea/gOWKseinhumikVwiLFxuICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOiBcIua/gOWKseinhumikVwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc3VjY2Vzc0ZuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbml0RGF0YS50YXNrVHlwZSA9PSA1ICYmIHRoaXMudHlwZVRhc2sgPT0gMSkge1xuICAgICAgICAgICAgLy/miZPlvIDmvILmta7lrp3nrrFcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHJlYXN1cmUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdERhdGEudGFza1R5cGUgPT0gNiAmJiB0aGlzLnR5cGVUYXNrID09IDEpIHtcbiAgICAgICAgICAgIC8v5oiQ5bCx5Lu75Yqh57Sv6K6h6KeC55yL6KeG6aKRXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaIkOWwseW8ueeql1wiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogdGhpcy5pbml0RGF0YS50YXNrVGl0bGUsXG4gICAgICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6IFwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLmNsb3NlUGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVRhc2spO1xuICAgICAgICB9XG4gICAgICAgIFRyYWNrTWdyLk1pc3Npb25QcmljZUNsaWNrKHtcbiAgICAgICAgICAgIG1pc3Npb25fbmFtZTogdGhpcy5pbml0RGF0YS50YXNrVGl0bGUsXG4gICAgICAgICAgICBtaXNzaW9uX3R5cGU6IHRoaXMudHlwZVRhc2sgPT0gMCA/IFwi5pel5bi45Lu75YqhXCIgOiBcIuaIkOWwseS7u+WKoVwiLFxuICAgICAgICAgICAgbWlzc2lvbl9idXR0b246IFwi5YmN5b6AXCIsXG4gICAgICAgIH0pXG5cblxuICAgIH1cblxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==