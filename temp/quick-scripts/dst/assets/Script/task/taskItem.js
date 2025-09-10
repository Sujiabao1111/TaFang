
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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var LanguageData_1 = require("../Language/LanguageData");
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
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0YXNrXFx0YXNrSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQsbURBQWtEO0FBQ2xELDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMseURBQTZDO0FBQzdDLDRDQUF1QztBQUN2QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBb05DO1FBak5XLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsWUFBTSxHQUFjLEVBQUUsQ0FBQztRQUUvQix3QkFBd0I7UUFFeEIsZUFBZTtRQUVQLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFDN0IsSUFBSTtRQUNJLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFFN0IsSUFBSTtRQUNJLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQ3BDLElBQUk7UUFDSSxpQkFBVyxHQUFZLEtBQUssQ0FBQzs7UUF1THJDLGlCQUFpQjtJQUNyQixDQUFDO0lBdExHLHdCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHVCQUFJLEdBQUosVUFBSyxJQUFJLEVBQUUsSUFBSTtRQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FB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QUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztZQUNyQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNsRCxjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUE7SUFHTixDQUFDO0lBN01EO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO2dEQUNaO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDOzhDQUNmO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDO21EQUNaO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOytDQUNiO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQzs0Q0FDcEI7SUFmZCxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBb041QjtJQUFELGVBQUM7Q0FwTkQsQUFvTkMsQ0FwTnFDLEVBQUUsQ0FBQyxTQUFTLEdBb05qRDtrQkFwTm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcbmltcG9ydCBQYWdlTWFuYWdlIGZyb20gXCIuLi9QYWdlTWFuYWdlXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGFza0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuagh+mimFwiIH0pXG4gICAgcHJpdmF0ZSB0aXRsZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Qcm9ncmVzc0JhciwgZGlzcGxheU5hbWU6IFwi6L+b5bqm5p2hXCIgfSlcbiAgICBwcml2YXRlIFByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi6L+b5bqm5p2h5paH5a2XXCIgfSlcbiAgICBwcml2YXRlIFByb2dyZXNzTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLph5HluIFcIiB9KVxuICAgIHByaXZhdGUgY29pbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTm9kZV0sIGRpc3BsYXlOYW1lOiBcIueKtuaAgeaMiemSrlwiIH0pXG4gICAgcHJpdmF0ZSBidG5BcnI6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge31cblxuICAgIHByaXZhdGUgaW5pdERhdGE6IGFueSA9IG51bGw7XG4gICAgLy/nsbvlnotcbiAgICBwcml2YXRlIHR5cGVUYXNrOiBudW1iZXIgPSAwO1xuXG4gICAgLy/mlLbnm4pcbiAgICBwcml2YXRlIGlzRWFybmluZ3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL+i9rOebmFxuICAgIHByaXZhdGUgaXNUdXJudGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyWXG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LIDDmmK/mr4/ml6UgMeaIkOWwsVxuICAgICAqL1xuICAgIGluaXQoZGF0YSwgdHlwZSkge1xuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy50eXBlVGFzayA9IHR5cGU7XG4gICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSB0aGlzLmluaXREYXRhLnRhc2tUaXRsZTtcblxuICAgICAgICBpZiAodGhpcy5pbml0RGF0YS50YXNrVHlwZSA9PSA2ICYmIHRoaXMudHlwZVRhc2sgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pc0Vhcm5pbmdzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluaXREYXRhLnRhc2tUeXBlID09IDMgJiYgdGhpcy50eXBlVGFzayA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHVybnRhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuUHJvZ3Jlc3MucHJvZ3Jlc3MgPSB0aGlzLmluaXREYXRhLnVzZXJUYXNrVmFsdWUgLyB0aGlzLmluaXREYXRhLnRhc2tWYWx1ZTtcblxuICAgICAgICB0aGlzLlByb2dyZXNzTGFiZWwuc3RyaW5nID0gdGhpcy5pbml0RGF0YS51c2VyVGFza1ZhbHVlICsgXCIvXCIgKyB0aGlzLmluaXREYXRhLnRhc2tWYWx1ZTtcbiAgICAgICAgdGhpcy5Qcm9ncmVzc0xhYmVsLm5vZGUuYWN0aXZlID0gdGhpcy5Qcm9ncmVzcy5wcm9ncmVzcyA8IDE7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZVRhc2sgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb2luTGFiZWwuc3RyaW5nID0gdGhpcy5pbml0RGF0YS5yZXdhcmRWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29pbkxhYmVsLnN0cmluZyA9IHRoaXMuaW5pdERhdGEucmV3YXJkLnJld2FyZFZhbHVlO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmJ0bkFyclswXS5hY3RpdmUgPSB0aGlzLmJ0bkFyclsxXS5hY3RpdmUgPSB0aGlzLmJ0bkFyclsyXS5hY3RpdmUgPSB0aGlzLmJ0bkFyclszXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNob3dOdW06IG51bWJlciA9IDA7XG4gICAgICAgIHN3aXRjaCAodGhpcy5pbml0RGF0YS5idXR0b25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgc2hvd051bSA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgc2hvd051bSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgc2hvd051bSA9IHRoaXMudHlwZVRhc2sgPT0gMCA/IDIgOiAzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnRuQXJyW3Nob3dOdW1dLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG5cbiAgICAvKirmjInpkq4gKi9cbiAgICBnZXRCdG4oZXZlbnQsIHJlcykge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgLy/lnLDlnYBcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy50eXBlVGFzayA9PSAwID8gVXJsQ29uc3QudGFza19kYXlfY29tbW9uR2V0IDogVXJsQ29uc3QuYWNoaWV2ZW1lbnRfY29tbW9uR2V0O1xuICAgICAgICAvL+mHkeW4geaVsFxuICAgICAgICBsZXQgY29pbjogbnVtYmVyID0gdGhpcy50eXBlVGFzayA9PSAwID8gdGhpcy5pbml0RGF0YS5yZXdhcmRWYWx1ZSA6IHRoaXMuaW5pdERhdGEucmV3YXJkLnJld2FyZFZhbHVlO1xuICAgICAgICBsZXQgZGF0YTogYW55ID0ge307XG4gICAgICAgIGlmICh0aGlzLnR5cGVUYXNrID09IDApIHtcbiAgICAgICAgICAgIGRhdGEuaWQgPSB0aGlzLmluaXREYXRhLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YS50YXNrSWQgPSB0aGlzLmluaXREYXRhLmlkO1xuICAgICAgICB9XG4gICAgICAgIFRyYWNrTWdyLk1pc3Npb25QcmljZUNsaWNrKHtcbiAgICAgICAgICAgIG1pc3Npb25fbmFtZTogdGhpcy5pbml0RGF0YS50YXNrVGl0bGUsXG4gICAgICAgICAgICBtaXNzaW9uX3R5cGU6IHRoaXMudHlwZVRhc2sgPT0gMCA/IFwi5pel5bi45Lu75YqhXCIgOiBcIuaIkOWwseS7u+WKoVwiLFxuICAgICAgICAgICAgbWlzc2lvbl9idXR0b246IFwi6aKG5Y+WXCIsXG4gICAgICAgICAgICBtaXNzaW9uX2NvaW46IGNvaW5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBpZiAodGhpcy5pbml0RGF0YSAmJiB0aGlzLmluaXREYXRhLnRhc2tUaXRsZSkge1xuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbml0RGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UYXNrX3VwZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50eXBlVGFzaywgJ3RoaXMuaW5pdERhdGEudHlwZVRhc2snKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmZpbmlzaF90YXNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2lvbl9uYW1lOiB0aGlzLmluaXREYXRhLnRhc2tUaXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2lvbl90eXBlOiB0aGlzLnR5cGVUYXNrID09IDAgPyBcIuaXpeW4uOS7u+WKoVwiIDogXCLmiJDlsLHku7vliqFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2lvbl9jb2luOiBjb2luXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uY2xvc2VQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVGFzayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMubm9kZSwgdmFsdWU6IGNvaW4sIG51bTogMTAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWujOaIkFwiICsgKHRoaXMudHlwZVRhc2sgPT0gMCA/IFwi5pel5bi4XCIgOiBcIuaIkOWwsVwiKSArIFwi5Lu75Yqh6I635b6XXCIgKyBjb2luICsgXCLnuqLljIXluIFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLpooblj5blpLHotKVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVGFza0RheURvdWJsZUdldF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIumihuWPluWksei0pVwiKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2xvc2VCdG4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gUGFnZU1hbmFnZS5zaW5nbGV0b24uc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrUmV3YXJkLHtcbiAgICAgICAgLy8gICAgIGNvaW4sXG4gICAgICAgIC8vICAgICB1cmwsXG4gICAgICAgIC8vICAgICBkYXRhLFxuICAgICAgICAvLyAgICAgdHlwZVRhc2s6dGhpcy50eXBlVGFzayxcbiAgICAgICAgLy8gICAgIHRhc2tUaXRsZTp0aGlzLmluaXREYXRhLnRhc2tUaXRsZVxuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gUGFnZU1hbmFnZS5zaW5nbGV0b24uY2xvc2VQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVGFzayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6ZetXG4gICAgICovXG4gICAgY2xvc2VCdG4oKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5jbG9zZVBhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrKTtcbiAgICAgICAgbGV0IHN1Y2Nlc3NGbiA9IChjYWxsPykgPT4ge1xuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsICYmIGNhbGwoKTtcbiAgICAgICAgICAgICAgICAvLyBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVGFza191cGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmICh1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVGFza0RheURvdWJsZUdldF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzVHVybnRhYmxlKSB7XG4gICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUdvbGRXaGVlbCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbml0RGF0YS50YXNrVHlwZSA9PSA4ICYmIHRoaXMudHlwZVRhc2sgPT0gMCkge1xuICAgICAgICAgICAgLy/mr4/ml6Xku7vliqHnnIvop4bpopHooaXlhYXngq7loZRcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdXRpbC5zZW5kVHVycmV0TnVtKCk7XG4gICAgICAgICAgICAgICAgdXRpbC5wcm9kdWN0VHVycmV0KDEwKTtcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLkdldFR1cnJldE51bSAtPSAxO1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodCgnbWFpbi5Hb3RfdHVycmV0cycsIDEwKSk7XG5cbiAgICAgICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LkdldFR1cnJldE51bSwgdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0pO1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfdHVycmV0LCB7IG5vZGU6IHRoaXMubm9kZSwgbnVtOiAxMCwgcGFyZW50OiBudWxsIH0pO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluaXREYXRhLnRhc2tUeXBlID09IDQgJiYgdGhpcy50eXBlVGFzayA9PSAwKSB7XG4gICAgICAgICAgICAvL+avj+aXpeS7u+WKoee0r+iuoeeci+inhumikVxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLku7vliqHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi57Sv6K6hMTXmrKHmv4DlirHop4bpopFcIixcbiAgICAgICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzogXCLmv4DlirHop4bpopFcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdERhdGEudGFza1R5cGUgPT0gNSAmJiB0aGlzLnR5cGVUYXNrID09IDEpIHtcbiAgICAgICAgICAgIC8v5omT5byA5ryC5rWu5a6d566xXG4gICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVRyZWFzdXJlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluaXREYXRhLnRhc2tUeXBlID09IDYgJiYgdGhpcy50eXBlVGFzayA9PSAxKSB7XG4gICAgICAgICAgICAvL+aIkOWwseS7u+WKoee0r+iuoeingueci+inhumikVxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmiJDlsLHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IHRoaXMuaW5pdERhdGEudGFza1RpdGxlLFxuICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOiBcIua/gOWKseinhumikVwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc3VjY2Vzc0ZuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5jbG9zZVBhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrKTtcbiAgICAgICAgfVxuICAgICAgICBUcmFja01nci5NaXNzaW9uUHJpY2VDbGljayh7XG4gICAgICAgICAgICBtaXNzaW9uX25hbWU6IHRoaXMuaW5pdERhdGEudGFza1RpdGxlLFxuICAgICAgICAgICAgbWlzc2lvbl90eXBlOiB0aGlzLnR5cGVUYXNrID09IDAgPyBcIuaXpeW4uOS7u+WKoVwiIDogXCLmiJDlsLHku7vliqFcIixcbiAgICAgICAgICAgIG1pc3Npb25fYnV0dG9uOiBcIuWJjeW+gFwiLFxuICAgICAgICB9KVxuXG5cbiAgICB9XG5cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=