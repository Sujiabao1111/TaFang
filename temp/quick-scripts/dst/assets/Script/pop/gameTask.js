
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameTask.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dd056B99nFE4Iebg/lfbang', 'gameTask');
// Script/pop/gameTask.ts

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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var taskItem_1 = require("../task/taskItem");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameTask = /** @class */ (function (_super) {
    __extends(gameTask, _super);
    function gameTask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dailyPre = null;
        _this.DailySelect = [];
        _this.AchievementSelect = [];
        _this.DailyView = null;
        _this.AchievementView = null;
        _this.DailyContent = null;
        _this.AchievementContent = null;
        _this.taskRed = null;
        _this.achievementRed = null;
        //当前第几个
        _this.selectNum = 0;
        //每日数据
        _this.DailyData = [];
        //成就数据
        _this.AchievementData = [];
        // private dailyPre: cc.Prefab = null;
        _this.dayRedNum = 0;
        _this.passRedNum = 0;
        return _this;
        // update (dt) {}
    }
    gameTask.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Task_updata, function () {
            if (_this.selectNum == 0) {
                //this.DailyContent.removeAllChildren();
            }
            else {
                //this.AchievementContent.removeAllChildren();
            }
            _this.updataTask(_this.selectNum);
        }, this);
        // if(!util.adPreObj[AdPosition.TaskDayDoubleGet]){
        //     util.preloadAd(AdPosition.TaskDayDoubleGet);
        // }
        // TrackMgr.AppBuyProductDialog_hcdg({
        //     dialog_name_hcdg: "任务弹窗",
        // });
    };
    gameTask.prototype.onDisable = function () {
        cc.game.emit(NameTs_1.default.Game_Main_Task_updata, this.dayRedNum + this.passRedNum);
    };
    gameTask.prototype.start = function () {
    };
    /**
     * 选择哪个
     * @param event
     * @param res
     */
    gameTask.prototype.selectBtn = function (event, res) {
        soundController_1.default.singleton.clickAudio();
        var num = Number(res);
        if (this.selectNum == num)
            return;
        this.selectNum = num;
        this.DailySelect[0].active = this.AchievementSelect[0].active = this.DailyView.active = res == 0;
        this.DailySelect[1].active = this.AchievementSelect[1].active = this.AchievementView.active = res == 1;
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: num == 0 ? "任务弹窗" : "成就弹窗",
        });
    };
    /**
     * 更新item
     * @param num 0:每日 1：成就
     * @param res 是否有数据
     */
    gameTask.prototype.updataTask = function (num, data) {
        var _this = this;
        if (num === void 0) { num = 0; }
        if (data === void 0) { data = null; }
        if (num == 0) {
            var successFn_1 = function (res) {
                if (!_this.isValid) {
                    return;
                }
                _this.dayRedNum = 0;
                _this.DailyData = res.list;
                _this.createDailyItem(num);
                var list = res.list;
                var DailyContentLen = 0;
                if (_this.DailyContent && _this.DailyContent.children) {
                    DailyContentLen = _this.DailyContent.children.length;
                }
                var addNum = list.length - DailyContentLen;
                for (var i = 0; i < addNum; i++) { //生成
                    var item = cc.instantiate(_this.dailyPre);
                    item.parent = _this.DailyContent;
                }
                var childArray = _this.DailyContent.children; //设置数据
                for (var i = 0; i < childArray.length; i++) {
                    if (list[i]) {
                        childArray[i].getComponent(taskItem_1.default).init(list[i], num);
                    }
                }
                if (list) {
                    var okNum = 0;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].buttonType == 3) {
                            okNum++;
                        }
                    }
                    if (okNum > 0) {
                        _this.taskRed.active = true;
                    }
                    else {
                        _this.taskRed.active = false;
                    }
                    _this.dayRedNum = okNum;
                }
                else {
                    _this.taskRed.active = false;
                }
            };
            if (data) {
                successFn_1(data);
            }
            else {
                util_1.default.getdataStr({
                    url: UrlConst_1.UrlConst.task_day_main,
                    success: function (res) {
                        successFn_1(res);
                    }
                });
            }
        }
        else {
            var successFn_2 = function (res) {
                if (!_this.isValid) {
                    return;
                }
                _this.AchievementData = res.list;
                _this.createDailyItem(num);
                _this.passRedNum = 0;
                var list = res.list;
                if (!_this.AchievementContent) {
                    return;
                }
                var AchievementContentLen = 0;
                if (_this.AchievementContent && _this.AchievementContent.children) {
                    AchievementContentLen = _this.AchievementContent.children.length;
                }
                var addNum = list.length - AchievementContentLen;
                for (var i = 0; i < addNum; i++) { //生成
                    var item = cc.instantiate(_this.dailyPre);
                    item.parent = _this.AchievementContent;
                }
                var childArray = _this.AchievementContent.children; //设置数据
                for (var i = 0; i < childArray.length; i++) {
                    if (list[i]) {
                        childArray[i].getComponent(taskItem_1.default).init(list[i], num);
                    }
                }
                if (list) {
                    var okNum = 0;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].buttonType == 3) {
                            okNum++;
                        }
                    }
                    if (okNum > 0) {
                        _this.achievementRed.active = true;
                    }
                    else {
                        _this.achievementRed.active = false;
                    }
                    _this.passRedNum = okNum;
                }
                else {
                    _this.achievementRed.active = false;
                }
            };
            if (data) {
                successFn_2(data);
            }
            else {
                util_1.default.getdataStr({
                    url: UrlConst_1.UrlConst.achievement_main,
                    success: function (res) {
                        successFn_2(res);
                    }
                });
            }
        }
    };
    /**
     * 初始化
     */
    gameTask.prototype.init = function (data) {
        // if (!this.dailyPre) {
        //     this.loadAny("prefab/gameTask/taskItem", cc.Prefab, (res) => {
        //         this.dailyPre = res;
        this.updataTask(0, data || null);
        this.updataTask(1);
        //     });
        // }
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "任务弹窗",
            ck_module: "展现",
        });
    };
    /**
     * 创建任务item
     */
    gameTask.prototype.createDailyItem = function (num) {
        // let parent:cc.Node = num==0?this.DailyContent:this.AchievementContent;
        // let data = num==0?this.DailyData:this.AchievementData;
        // let successFn = ()=>{
        //     data.forEach(element => {
        //         let item:cc.Node = cc.instantiate(this.dailyPre);
        //         item.setParent(parent);
        //         let itemTs = item.getComponent(item.name);
        //         itemTs.init(element,num);
        //     });
        // }
        // if(this.dailyPre){
        //     successFn();
        // }else{
        //     this.loadAny("prefab/gameTask/taskItem",cc.Prefab,(res)=>{
        //         this.dailyPre = res;
        //         successFn();
        //     });
        // }
    };
    gameTask.prototype.onDestroy = function () {
        //释放
        // cc.assetManager.releaseAsset(this.dailyPre);
    };
    /**
     * 关闭
     */
    gameTask.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    __decorate([
        property({ type: cc.Prefab, displayName: "item預製體" })
    ], gameTask.prototype, "dailyPre", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "每日任务按钮" })
    ], gameTask.prototype, "DailySelect", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "成就任务按钮" })
    ], gameTask.prototype, "AchievementSelect", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "每日盒子" })
    ], gameTask.prototype, "DailyView", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "成就盒子" })
    ], gameTask.prototype, "AchievementView", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "每日Content" })
    ], gameTask.prototype, "DailyContent", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "成就Content" })
    ], gameTask.prototype, "AchievementContent", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "每日任务红点" })
    ], gameTask.prototype, "taskRed", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "成就任务红点" })
    ], gameTask.prototype, "achievementRed", void 0);
    gameTask = __decorate([
        ccclass
    ], gameTask);
    return gameTask;
}(baseTs_1.default));
exports.default = gameTask;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUVwQywyQ0FBc0M7QUFDdEMsK0NBQThDO0FBQzlDLHNEQUFpRDtBQUNqRCw2Q0FBd0M7QUFDeEMsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQyw0QkFBTTtJQUE1QztRQUFBLHFFQW1UQztRQS9TVyxjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQWMsRUFBRSxDQUFDO1FBRzVCLHVCQUFpQixHQUFjLEVBQUUsQ0FBQztRQUdsQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLHdCQUFrQixHQUFZLElBQUksQ0FBQztRQUduQyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRXZDLE9BQU87UUFDQyxlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRTlCLE1BQU07UUFDRSxlQUFTLEdBQVEsRUFBRSxDQUFDO1FBQzVCLE1BQU07UUFDRSxxQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUVsQyxzQ0FBc0M7UUFFOUIsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGdCQUFVLEdBQUcsQ0FBQyxDQUFDOztRQXlRdkIsaUJBQWlCO0lBQ3JCLENBQUM7SUF4UUcseUJBQU0sR0FBTjtRQUFBLGlCQXFCQztRQW5CRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFFO1lBR2hDLElBQUksS0FBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLHdDQUF3Qzth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QUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7aURBQ2pCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQzt1REFDWDtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQzsrQ0FDZjtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQztxREFDVDtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQztrREFDakI7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUM7d0RBQ1g7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7NkNBQ25CO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDO29EQUNaO0lBNUJ0QixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBbVQ1QjtJQUFELGVBQUM7Q0FuVEQsQUFtVEMsQ0FuVHFDLGdCQUFNLEdBbVQzQztrQkFuVG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCB0YXNrSXRlbSBmcm9tIFwiLi4vdGFzay90YXNrSXRlbVwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVRhc2sgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCBkaXNwbGF5TmFtZTogXCJpdGVt6aCQ6KO96auUXCIgfSlcbiAgICBwcml2YXRlIGRhaWx5UHJlOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdLCBkaXNwbGF5TmFtZTogXCLmr4/ml6Xku7vliqHmjInpkq5cIiB9KVxuICAgIHByaXZhdGUgRGFpbHlTZWxlY3Q6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdLCBkaXNwbGF5TmFtZTogXCLmiJDlsLHku7vliqHmjInpkq5cIiB9KVxuICAgIHByaXZhdGUgQWNoaWV2ZW1lbnRTZWxlY3Q6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5q+P5pel55uS5a2QXCIgfSlcbiAgICBwcml2YXRlIERhaWx5VmlldzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLmiJDlsLHnm5LlrZBcIiB9KVxuICAgIHByaXZhdGUgQWNoaWV2ZW1lbnRWaWV3OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuavj+aXpUNvbnRlbnRcIiB9KVxuICAgIHByaXZhdGUgRGFpbHlDb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuaIkOWwsUNvbnRlbnRcIiB9KVxuICAgIHByaXZhdGUgQWNoaWV2ZW1lbnRDb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuavj+aXpeS7u+WKoee6oueCuVwiIH0pXG4gICAgcHJpdmF0ZSB0YXNrUmVkOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuaIkOWwseS7u+WKoee6oueCuVwiIH0pXG4gICAgcHJpdmF0ZSBhY2hpZXZlbWVudFJlZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvL+W9k+WJjeesrOWHoOS4qlxuICAgIHByaXZhdGUgc2VsZWN0TnVtOiBudW1iZXIgPSAwO1xuXG4gICAgLy/mr4/ml6XmlbDmja5cbiAgICBwcml2YXRlIERhaWx5RGF0YTogYW55ID0gW107XG4gICAgLy/miJDlsLHmlbDmja5cbiAgICBwcml2YXRlIEFjaGlldmVtZW50RGF0YTogYW55ID0gW107XG5cbiAgICAvLyBwcml2YXRlIGRhaWx5UHJlOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBkYXlSZWROdW0gPSAwO1xuICAgIHByaXZhdGUgcGFzc1JlZE51bSA9IDA7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UYXNrX3VwZGF0YSwgKCkgPT4ge1xuXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdE51bSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLkRhaWx5Q29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuQWNoaWV2ZW1lbnRDb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0YVRhc2sodGhpcy5zZWxlY3ROdW0pO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBcbiAgICAgICAgLy8gaWYoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0XSl7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgLy8gICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5Lu75Yqh5by556qXXCIsXG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpe1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTWFpbl9UYXNrX3VwZGF0YSwgdGhpcy5kYXlSZWROdW0gKyB0aGlzLnBhc3NSZWROdW0pO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgInmi6nlk6rkuKpcbiAgICAgKiBAcGFyYW0gZXZlbnQgXG4gICAgICogQHBhcmFtIHJlcyBcbiAgICAgKi9cbiAgICBzZWxlY3RCdG4oZXZlbnQsIHJlcykge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gTnVtYmVyKHJlcyk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdE51bSA9PSBudW0pIHJldHVybjtcbiAgICAgICAgdGhpcy5zZWxlY3ROdW0gPSBudW07XG4gICAgICAgIHRoaXMuRGFpbHlTZWxlY3RbMF0uYWN0aXZlID0gdGhpcy5BY2hpZXZlbWVudFNlbGVjdFswXS5hY3RpdmUgPSB0aGlzLkRhaWx5Vmlldy5hY3RpdmUgPSByZXMgPT0gMDtcbiAgICAgICAgdGhpcy5EYWlseVNlbGVjdFsxXS5hY3RpdmUgPSB0aGlzLkFjaGlldmVtZW50U2VsZWN0WzFdLmFjdGl2ZSA9IHRoaXMuQWNoaWV2ZW1lbnRWaWV3LmFjdGl2ZSA9IHJlcyA9PSAxO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBudW09PTA/XCLku7vliqHlvLnnqpdcIjpcIuaIkOWwseW8ueeql1wiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrBpdGVtXG4gICAgICogQHBhcmFtIG51bSAwOuavj+aXpSAx77ya5oiQ5bCxXG4gICAgICogQHBhcmFtIHJlcyDmmK/lkKbmnInmlbDmja5cbiAgICAgKi9cbiAgICB1cGRhdGFUYXNrKG51bTogbnVtYmVyID0gMCxkYXRhOmFueT1udWxsKSB7XG4gICAgICAgIGlmIChudW0gPT0gMCkge1xuXG4gICAgICAgICAgICBsZXQgc3VjY2Vzc0ZuID0gKHJlcyk9PntcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRheVJlZE51bSA9IDA7ICAgXG4gICAgICAgICAgICAgICAgdGhpcy5EYWlseURhdGEgPSByZXMubGlzdDtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURhaWx5SXRlbShudW0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMubGlzdDtcbiAgICAgICAgICAgICAgICBsZXQgRGFpbHlDb250ZW50TGVuOm51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5EYWlseUNvbnRlbnQmJnRoaXMuRGFpbHlDb250ZW50LmNoaWxkcmVuKXtcbiAgICAgICAgICAgICAgICAgICAgRGFpbHlDb250ZW50TGVuID0gdGhpcy5EYWlseUNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgYWRkTnVtID0gbGlzdC5sZW5ndGggLSBEYWlseUNvbnRlbnRMZW47XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGROdW07IGkrKykgeyAgICAgICAgICAgICAgICAgICAgICAgIC8v55Sf5oiQXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5kYWlseVByZSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5EYWlseUNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkQXJyYXkgPSB0aGlzLkRhaWx5Q29udGVudC5jaGlsZHJlbjsgICAgICAvL+iuvue9ruaVsOaNrlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRBcnJheVtpXS5nZXRDb21wb25lbnQodGFza0l0ZW0pLmluaXQobGlzdFtpXSwgbnVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYobGlzdCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBva051bSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0uYnV0dG9uVHlwZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tOdW0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihva051bSA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrUmVkLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrUmVkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF5UmVkTnVtID0gb2tOdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFza1JlZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZGF0YSl7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc0ZuKGRhdGEpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC50YXNrX2RheV9tYWluLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbihyZXMpOyAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdWNjZXNzRm4gPSAocmVzKT0+e1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5BY2hpZXZlbWVudERhdGEgPSByZXMubGlzdDtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURhaWx5SXRlbShudW0pO1xuICAgICAgICAgICAgICAgIHRoaXMucGFzc1JlZE51bSA9IDA7XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5saXN0O1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLkFjaGlldmVtZW50Q29udGVudCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IEFjaGlldmVtZW50Q29udGVudExlbjpudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuQWNoaWV2ZW1lbnRDb250ZW50JiZ0aGlzLkFjaGlldmVtZW50Q29udGVudC5jaGlsZHJlbil7XG4gICAgICAgICAgICAgICAgICAgIEFjaGlldmVtZW50Q29udGVudExlbiA9IHRoaXMuQWNoaWV2ZW1lbnRDb250ZW50LmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGFkZE51bSA9IGxpc3QubGVuZ3RoIC0gQWNoaWV2ZW1lbnRDb250ZW50TGVuO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkTnVtOyBpKyspIHsgICAgICAgICAgICAgICAgICAgICAgICAvL+eUn+aIkFxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZGFpbHlQcmUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMuQWNoaWV2ZW1lbnRDb250ZW50O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBjaGlsZEFycmF5ID0gdGhpcy5BY2hpZXZlbWVudENvbnRlbnQuY2hpbGRyZW47ICAgICAgLy/orr7nva7mlbDmja5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQXJyYXlbaV0uZ2V0Q29tcG9uZW50KHRhc2tJdGVtKS5pbml0KGxpc3RbaV0sIG51bSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9rTnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS5idXR0b25UeXBlID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva051bSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChva051bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNoaWV2ZW1lbnRSZWQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNoaWV2ZW1lbnRSZWQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzUmVkTnVtID0gb2tOdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjaGlldmVtZW50UmVkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGRhdGEpe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbihkYXRhKTtcbiAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5hY2hpZXZlbWVudF9tYWluLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzRm4ocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKi9cbiAgICBpbml0KGRhdGEpIHtcblxuICAgICAgICAvLyBpZiAoIXRoaXMuZGFpbHlQcmUpIHtcbiAgICAgICAgLy8gICAgIHRoaXMubG9hZEFueShcInByZWZhYi9nYW1lVGFzay90YXNrSXRlbVwiLCBjYy5QcmVmYWIsIChyZXMpID0+IHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmRhaWx5UHJlID0gcmVzO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRhVGFzaygwLGRhdGF8fG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRhVGFzaygxKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuS7u+WKoeW8ueeql1wiLFxuICAgICAgICAgICAgY2tfbW9kdWxlOlwi5bGV546wXCIsXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJvlu7rku7vliqFpdGVtXG4gICAgICovXG4gICAgY3JlYXRlRGFpbHlJdGVtKG51bSkge1xuXG4gICAgICAgIC8vIGxldCBwYXJlbnQ6Y2MuTm9kZSA9IG51bT09MD90aGlzLkRhaWx5Q29udGVudDp0aGlzLkFjaGlldmVtZW50Q29udGVudDtcblxuXG5cbiAgICAgICAgLy8gbGV0IGRhdGEgPSBudW09PTA/dGhpcy5EYWlseURhdGE6dGhpcy5BY2hpZXZlbWVudERhdGE7XG4gICAgICAgIC8vIGxldCBzdWNjZXNzRm4gPSAoKT0+e1xuICAgICAgICAvLyAgICAgZGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmRhaWx5UHJlKTtcbiAgICAgICAgLy8gICAgICAgICBpdGVtLnNldFBhcmVudChwYXJlbnQpO1xuICAgICAgICAvLyAgICAgICAgIGxldCBpdGVtVHMgPSBpdGVtLmdldENvbXBvbmVudChpdGVtLm5hbWUpO1xuXG4gICAgICAgIC8vICAgICAgICAgaXRlbVRzLmluaXQoZWxlbWVudCxudW0pO1xuXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGlmKHRoaXMuZGFpbHlQcmUpe1xuICAgICAgICAvLyAgICAgc3VjY2Vzc0ZuKCk7XG5cbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgIC8vICAgICB0aGlzLmxvYWRBbnkoXCJwcmVmYWIvZ2FtZVRhc2svdGFza0l0ZW1cIixjYy5QcmVmYWIsKHJlcyk9PntcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmRhaWx5UHJlID0gcmVzO1xuICAgICAgICAvLyAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH1cblxuXG5cblxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgLy/ph4rmlL5cbiAgICAgICAgLy8gY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldCh0aGlzLmRhaWx5UHJlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5YWz6ZetXG4gICAgICovXG5cbiAgICBjbG9zZUJ0bigpIHtcblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuXG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19