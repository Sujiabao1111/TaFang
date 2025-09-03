
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0YXNrXFx0YXNrSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQsbURBQWtEO0FBQ2xELDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsNENBQXVDO0FBQ3ZDLCtDQUE4QztBQUM5QyxzRUFBaUU7QUFDakUsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUEwTkM7UUF2TlcsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFHaEMsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixZQUFNLEdBQWMsRUFBRSxDQUFDO1FBRS9CLHdCQUF3QjtRQUV4QixlQUFlO1FBRVAsY0FBUSxHQUFPLElBQUksQ0FBQztRQUM1QixJQUFJO1FBQ0ksY0FBUSxHQUFVLENBQUMsQ0FBQztRQUU1QixJQUFJO1FBQ0ksZ0JBQVUsR0FBVyxLQUFLLENBQUM7UUFDbkMsSUFBSTtRQUNJLGlCQUFXLEdBQVcsS0FBSyxDQUFDOztRQTZMcEMsaUJBQWlCO0lBQ3JCLENBQUM7SUE1TEcsd0JBQUssR0FBTDtJQUVBLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsdUJBQUksR0FBSixVQUFLLElBQUksRUFBQyxJQUFJO1FBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFFakQsSUFBRyxJQUFJ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QUMsU0FBUyxHQTBOakQ7a0JBMU5vQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBQYWdlTWFuYWdlIGZyb20gXCIuLi9QYWdlTWFuYWdlXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRhc2tJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIuagh+mimFwifSlcbiAgICBwcml2YXRlIHRpdGxlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Qcm9ncmVzc0JhcixkaXNwbGF5TmFtZTpcIui/m+W6puadoVwifSlcbiAgICBwcml2YXRlIFByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi6L+b5bqm5p2h5paH5a2XXCJ9KVxuICAgIHByaXZhdGUgUHJvZ3Jlc3NMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi6YeR5biBXCJ9KVxuICAgIHByaXZhdGUgY29pbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOltjYy5Ob2RlXSxkaXNwbGF5TmFtZTpcIueKtuaAgeaMiemSrlwifSlcbiAgICBwcml2YXRlIGJ0bkFycjogY2MuTm9kZVtdID0gW107XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YTphbnkgPSBudWxsO1xuICAgIC8v57G75Z6LXG4gICAgcHJpdmF0ZSB0eXBlVGFzazpudW1iZXIgPSAwO1xuXG4gICAgLy/mlLbnm4pcbiAgICBwcml2YXRlIGlzRWFybmluZ3M6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIC8v6L2s55uYXG4gICAgcHJpdmF0ZSBpc1R1cm50YWJsZTpib29sZWFuID0gZmFsc2U7XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja5cbiAgICAgKiBAcGFyYW0gdHlwZSDnsbvlnosgMOaYr+avj+aXpSAx5oiQ5bCxXG4gICAgICovXG4gICAgaW5pdChkYXRhLHR5cGUpe1xuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy50eXBlVGFzayA9IHR5cGU7XG4gICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSB0aGlzLmluaXREYXRhLnRhc2tUaXRsZTtcblxuICAgICAgICBpZih0aGlzLmluaXREYXRhLnRhc2tUeXBlPT02JiZ0aGlzLnR5cGVUYXNrPT0wKXtcbiAgICAgICAgICAgIHRoaXMuaXNFYXJuaW5ncyA9IHRydWU7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaW5pdERhdGEudGFza1R5cGU9PTMmJnRoaXMudHlwZVRhc2s9PTApe1xuICAgICAgICAgICAgdGhpcy5pc1R1cm50YWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlByb2dyZXNzLnByb2dyZXNzID0gdGhpcy5pbml0RGF0YS51c2VyVGFza1ZhbHVlL3RoaXMuaW5pdERhdGEudGFza1ZhbHVlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5Qcm9ncmVzc0xhYmVsLnN0cmluZyA9IHRoaXMuaW5pdERhdGEudXNlclRhc2tWYWx1ZStcIi9cIit0aGlzLmluaXREYXRhLnRhc2tWYWx1ZTtcbiAgICAgICAgdGhpcy5Qcm9ncmVzc0xhYmVsLm5vZGUuYWN0aXZlID0gdGhpcy5Qcm9ncmVzcy5wcm9ncmVzczwxO1xuXG4gICAgICAgIGlmKHRoaXMudHlwZVRhc2s9PTApe1xuICAgICAgICAgICAgdGhpcy5jb2luTGFiZWwuc3RyaW5nID0gdGhpcy5pbml0RGF0YS5yZXdhcmRWYWx1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvaW5MYWJlbC5zdHJpbmcgPSB0aGlzLmluaXREYXRhLnJld2FyZC5yZXdhcmRWYWx1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5idG5BcnJbMF0uYWN0aXZlID0gdGhpcy5idG5BcnJbMV0uYWN0aXZlID10aGlzLmJ0bkFyclsyXS5hY3RpdmUgPXRoaXMuYnRuQXJyWzNdLmFjdGl2ZSA9ZmFsc2U7XG4gICAgICAgIGxldCBzaG93TnVtOm51bWJlciA9IDA7XG4gICAgICAgIHN3aXRjaCh0aGlzLmluaXREYXRhLmJ1dHRvblR5cGUpe1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHNob3dOdW0gPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHNob3dOdW0gPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHNob3dOdW0gPSB0aGlzLnR5cGVUYXNrPT0wPzI6MztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ0bkFycltzaG93TnVtXS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuXG4gICAgLyoq5oyJ6ZKuICovXG4gICAgZ2V0QnRuKGV2ZW50LHJlcyl7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICAvL+WcsOWdgFxuICAgICAgICBsZXQgdXJsOnN0cmluZyA9dGhpcy50eXBlVGFzaz09MD9VcmxDb25zdC50YXNrX2RheV9jb21tb25HZXQ6VXJsQ29uc3QuYWNoaWV2ZW1lbnRfY29tbW9uR2V0O1xuICAgICAgICAvL+mHkeW4geaVsFxuICAgICAgICBsZXQgY29pbjpudW1iZXIgID0gdGhpcy50eXBlVGFzaz09MD90aGlzLmluaXREYXRhLnJld2FyZFZhbHVlOnRoaXMuaW5pdERhdGEucmV3YXJkLnJld2FyZFZhbHVlO1xuICAgICAgICBsZXQgZGF0YTphbnkgPSB7fTtcbiAgICAgICAgaWYodGhpcy50eXBlVGFzaz09MCl7XG4gICAgICAgICAgICBkYXRhLmlkID0gdGhpcy5pbml0RGF0YS5pZDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkYXRhLnRhc2tJZCA9IHRoaXMuaW5pdERhdGEuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgVHJhY2tNZ3IuTWlzc2lvblByaWNlQ2xpY2soe1xuICAgICAgICAgICAgbWlzc2lvbl9uYW1lOiB0aGlzLmluaXREYXRhLnRhc2tUaXRsZSxcbiAgICAgICAgICAgIG1pc3Npb25fdHlwZTogdGhpcy50eXBlVGFzaz09MD9cIuaXpeW4uOS7u+WKoVwiOlwi5oiQ5bCx5Lu75YqhXCIsXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbjogXCLpooblj5ZcIixcbiAgICAgICAgICAgIG1pc3Npb25fY29pbjogY29pblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIGlmKHRoaXMuaW5pdERhdGEmJnRoaXMuaW5pdERhdGEudGFza1RpdGxlKXtcbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0LCgpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbml0RGF0YSl7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UYXNrX3VwZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50eXBlVGFzaywndGhpcy5pbml0RGF0YS50eXBlVGFzaycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuZmluaXNoX3Rhc2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX25hbWU6IHRoaXMuaW5pdERhdGEudGFza1RpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX3R5cGU6IHRoaXMudHlwZVRhc2s9PTA/XCLml6XluLjku7vliqFcIjpcIuaIkOWwseS7u+WKoVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX2NvaW46IGNvaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5jbG9zZVBhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4se25vZGU6dGhpcy5ub2RlLHZhbHVlOmNvaW4sbnVtOjEwfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWujOaIkFwiKyh0aGlzLnR5cGVUYXNrPT0wP1wi5pel5bi4XCI6XCLmiJDlsLFcIikrXCLku7vliqHojrflvpdcIitjb2luK1wi57qi5YyF5biBXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6aKG5Y+W5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVGFza0RheURvdWJsZUdldF0pe1xuICAgICAgICAgICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIumihuWPluWksei0pVwiKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2xvc2VCdG4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICAvLyBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVRhc2tSZXdhcmQse1xuICAgICAgICAvLyAgICAgY29pbixcbiAgICAgICAgLy8gICAgIHVybCxcbiAgICAgICAgLy8gICAgIGRhdGEsXG4gICAgICAgIC8vICAgICB0eXBlVGFzazp0aGlzLnR5cGVUYXNrLFxuICAgICAgICAvLyAgICAgdGFza1RpdGxlOnRoaXMuaW5pdERhdGEudGFza1RpdGxlXG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyBQYWdlTWFuYWdlLnNpbmdsZXRvbi5jbG9zZVBhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl61cbiAgICAgKi9cbiAgICBjbG9zZUJ0bigpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uY2xvc2VQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVGFzayk7XG4gICAgICAgIGxldCBzdWNjZXNzRm4gPSAoY2FsbD8pPT57XG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVGFza0RheURvdWJsZUdldCwoKT0+e1xuICAgICAgICAgICAgICAgIGNhbGwmJmNhbGwoKTtcbiAgICAgICAgICAgICAgICAvLyBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVGFza191cGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0XSl7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVGFza0RheURvdWJsZUdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwoKT0+e1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuaXNFYXJuaW5ncyl7XG4gICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUVhcm5pbmdzKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5pc1R1cm50YWJsZSl7XG4gICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUdvbGRXaGVlbCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaW5pdERhdGEudGFza1R5cGU9PTgmJnRoaXMudHlwZVRhc2s9PTApe1xuICAgICAgICAgICAgLy/mr4/ml6Xku7vliqHnnIvop4bpopHooaXlhYXngq7loZRcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigoKT0+e1xuICAgICAgICAgICAgICAgIHV0aWwuc2VuZFR1cnJldE51bSgpOyBcbiAgICAgICAgICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQoMTApO1xuICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEuR2V0VHVycmV0TnVtLT0xO1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflvpcxMOS4queCruWhlO+8gVwiKTtcbiAgICAgICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LkdldFR1cnJldE51bSx1dGlsLnVzZXJEYXRhLkdldFR1cnJldE51bSk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF90dXJyZXQse25vZGU6dGhpcy5ub2RlLG51bToxMCxwYXJlbnQ6bnVsbH0pO1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuS7u+WKoeW8ueeql1wiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi6KGl5YWF54Ku5aGUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaW5pdERhdGEudGFza1R5cGU9PTQmJnRoaXMudHlwZVRhc2s9PTApe1xuICAgICAgICAgICAgLy/mr4/ml6Xku7vliqHntK/orqHnnIvop4bpopFcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5Lu75Yqh5by556qXXCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIue0r+iuoTE15qyh5r+A5Yqx6KeG6aKRXCIsXG4gICAgICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6XCLmv4DlirHop4bpopFcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmluaXREYXRhLnRhc2tUeXBlPT01JiZ0aGlzLnR5cGVUYXNrPT0xKXtcbiAgICAgICAgICAgIC8v5omT5byA5ryC5rWu5a6d566xXG4gICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVRyZWFzdXJlKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5pbml0RGF0YS50YXNrVHlwZT09NiYmdGhpcy50eXBlVGFzaz09MSl7XG4gICAgICAgICAgICAvL+aIkOWwseS7u+WKoee0r+iuoeingueci+inhumikVxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmiJDlsLHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IHRoaXMuaW5pdERhdGEudGFza1RpdGxlLFxuICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5jbG9zZVBhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrKTtcbiAgICAgICAgfVxuICAgICAgICBUcmFja01nci5NaXNzaW9uUHJpY2VDbGljayh7XG4gICAgICAgICAgICBtaXNzaW9uX25hbWU6IHRoaXMuaW5pdERhdGEudGFza1RpdGxlLFxuICAgICAgICAgICAgbWlzc2lvbl90eXBlOiB0aGlzLnR5cGVUYXNrPT0wP1wi5pel5bi45Lu75YqhXCI6XCLmiJDlsLHku7vliqFcIixcbiAgICAgICAgICAgIG1pc3Npb25fYnV0dG9uOiBcIuWJjeW+gFwiLFxuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgIH1cbiAgICBcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=