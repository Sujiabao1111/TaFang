
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
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
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
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.TaskDayDoubleGet]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.TaskDayDoubleGet);
        }
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "任务弹窗",
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxtREFBa0Q7QUFDbEQsMkNBQXNDO0FBQ3RDLCtDQUE4QztBQUM5QyxzREFBaUQ7QUFDakQsNkNBQXdDO0FBQ3hDLGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQU07SUFBNUM7UUFBQSxxRUFtVEM7UUEvU1csY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFjLEVBQUUsQ0FBQztRQUc1Qix1QkFBaUIsR0FBYyxFQUFFLENBQUM7UUFHbEMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixxQkFBZSxHQUFZLElBQUksQ0FBQztRQUdoQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3Qix3QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFHbkMsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixvQkFBYyxHQUFZLElBQUksQ0FBQztRQUV2QyxPQUFPO1FBQ0MsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUU5QixNQUFNO1FBQ0UsZUFBUyxHQUFRLEVBQUUsQ0FBQztRQUM1QixNQUFNO1FBQ0UscUJBQWUsR0FBUSxFQUFFLENBQUM7UUFFbEMsc0NBQXNDO1FBRTlCLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxnQkFBVSxHQUFHLENBQUMsQ0FBQzs7UUF5UXZCLGlCQUFpQjtJQUNyQixDQUFDO0lBeFFHLHlCQUFNLEdBQU47UUFBQSxpQkFxQkM7UUFuQkcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsRUFBRTtZQUdoQyxJQUFJLEtBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFFO2dC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USIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IHRhc2tJdGVtIGZyb20gXCIuLi90YXNrL3Rhc2tJdGVtXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lVGFzayBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIGRpc3BsYXlOYW1lOiBcIml0ZW3poJDoo73pq5RcIiB9KVxuICAgIHByaXZhdGUgZGFpbHlQcmU6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTm9kZV0sIGRpc3BsYXlOYW1lOiBcIuavj+aXpeS7u+WKoeaMiemSrlwiIH0pXG4gICAgcHJpdmF0ZSBEYWlseVNlbGVjdDogY2MuTm9kZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTm9kZV0sIGRpc3BsYXlOYW1lOiBcIuaIkOWwseS7u+WKoeaMiemSrlwiIH0pXG4gICAgcHJpdmF0ZSBBY2hpZXZlbWVudFNlbGVjdDogY2MuTm9kZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLmr4/ml6Xnm5LlrZBcIiB9KVxuICAgIHByaXZhdGUgRGFpbHlWaWV3OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuaIkOWwseebkuWtkFwiIH0pXG4gICAgcHJpdmF0ZSBBY2hpZXZlbWVudFZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5q+P5pelQ29udGVudFwiIH0pXG4gICAgcHJpdmF0ZSBEYWlseUNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5oiQ5bCxQ29udGVudFwiIH0pXG4gICAgcHJpdmF0ZSBBY2hpZXZlbWVudENvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5q+P5pel5Lu75Yqh57qi54K5XCIgfSlcbiAgICBwcml2YXRlIHRhc2tSZWQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5oiQ5bCx5Lu75Yqh57qi54K5XCIgfSlcbiAgICBwcml2YXRlIGFjaGlldmVtZW50UmVkOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8v5b2T5YmN56ys5Yeg5LiqXG4gICAgcHJpdmF0ZSBzZWxlY3ROdW06IG51bWJlciA9IDA7XG5cbiAgICAvL+avj+aXpeaVsOaNrlxuICAgIHByaXZhdGUgRGFpbHlEYXRhOiBhbnkgPSBbXTtcbiAgICAvL+aIkOWwseaVsOaNrlxuICAgIHByaXZhdGUgQWNoaWV2ZW1lbnREYXRhOiBhbnkgPSBbXTtcblxuICAgIC8vIHByaXZhdGUgZGFpbHlQcmU6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBwcml2YXRlIGRheVJlZE51bSA9IDA7XG4gICAgcHJpdmF0ZSBwYXNzUmVkTnVtID0gMDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhLCAoKSA9PiB7XG5cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0TnVtID09IDApIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuRGFpbHlDb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5BY2hpZXZlbWVudENvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRhVGFzayh0aGlzLnNlbGVjdE51bSk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIFxuICAgICAgICBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXRdKXtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVGFza0RheURvdWJsZUdldCk7XG4gICAgICAgIH1cblxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLku7vliqHlvLnnqpdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCl7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9NYWluX1Rhc2tfdXBkYXRhLCB0aGlzLmRheVJlZE51bSArIHRoaXMucGFzc1JlZE51bSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAieaLqeWTquS4qlxuICAgICAqIEBwYXJhbSBldmVudCBcbiAgICAgKiBAcGFyYW0gcmVzIFxuICAgICAqL1xuICAgIHNlbGVjdEJ0bihldmVudCwgcmVzKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBsZXQgbnVtOiBudW1iZXIgPSBOdW1iZXIocmVzKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0TnVtID09IG51bSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNlbGVjdE51bSA9IG51bTtcbiAgICAgICAgdGhpcy5EYWlseVNlbGVjdFswXS5hY3RpdmUgPSB0aGlzLkFjaGlldmVtZW50U2VsZWN0WzBdLmFjdGl2ZSA9IHRoaXMuRGFpbHlWaWV3LmFjdGl2ZSA9IHJlcyA9PSAwO1xuICAgICAgICB0aGlzLkRhaWx5U2VsZWN0WzFdLmFjdGl2ZSA9IHRoaXMuQWNoaWV2ZW1lbnRTZWxlY3RbMV0uYWN0aXZlID0gdGhpcy5BY2hpZXZlbWVudFZpZXcuYWN0aXZlID0gcmVzID09IDE7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IG51bT09MD9cIuS7u+WKoeW8ueeql1wiOlwi5oiQ5bCx5by556qXXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsGl0ZW1cbiAgICAgKiBAcGFyYW0gbnVtIDA65q+P5pelIDHvvJrmiJDlsLFcbiAgICAgKiBAcGFyYW0gcmVzIOaYr+WQpuacieaVsOaNrlxuICAgICAqL1xuICAgIHVwZGF0YVRhc2sobnVtOiBudW1iZXIgPSAwLGRhdGE6YW55PW51bGwpIHtcbiAgICAgICAgaWYgKG51bSA9PSAwKSB7XG5cbiAgICAgICAgICAgIGxldCBzdWNjZXNzRm4gPSAocmVzKT0+e1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGF5UmVkTnVtID0gMDsgICBcbiAgICAgICAgICAgICAgICB0aGlzLkRhaWx5RGF0YSA9IHJlcy5saXN0O1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRGFpbHlJdGVtKG51bSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5saXN0O1xuICAgICAgICAgICAgICAgIGxldCBEYWlseUNvbnRlbnRMZW46bnVtYmVyID0gMDtcbiAgICAgICAgICAgICAgICBpZih0aGlzLkRhaWx5Q29udGVudCYmdGhpcy5EYWlseUNvbnRlbnQuY2hpbGRyZW4pe1xuICAgICAgICAgICAgICAgICAgICBEYWlseUNvbnRlbnRMZW4gPSB0aGlzLkRhaWx5Q29udGVudC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBhZGROdW0gPSBsaXN0Lmxlbmd0aCAtIERhaWx5Q29udGVudExlbjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZE51bTsgaSsrKSB7ICAgICAgICAgICAgICAgICAgICAgICAgLy/nlJ/miJBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmRhaWx5UHJlKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQgPSB0aGlzLkRhaWx5Q29udGVudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRBcnJheSA9IHRoaXMuRGFpbHlDb250ZW50LmNoaWxkcmVuOyAgICAgIC8v6K6+572u5pWw5o2uXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEFycmF5W2ldLmdldENvbXBvbmVudCh0YXNrSXRlbSkuaW5pdChsaXN0W2ldLCBudW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZihsaXN0KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9rTnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS5idXR0b25UeXBlID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva051bSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKG9rTnVtID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tSZWQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tSZWQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXlSZWROdW0gPSBva051bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrUmVkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihkYXRhKXtcbiAgICAgICAgICAgICAgICBzdWNjZXNzRm4oZGF0YSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LnRhc2tfZGF5X21haW4sXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHsgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0ZuKHJlcyk7ICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHN1Y2Nlc3NGbiA9IChyZXMpPT57XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLkFjaGlldmVtZW50RGF0YSA9IHJlcy5saXN0O1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRGFpbHlJdGVtKG51bSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzUmVkTnVtID0gMDtcblxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmxpc3Q7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuQWNoaWV2ZW1lbnRDb250ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgQWNoaWV2ZW1lbnRDb250ZW50TGVuOm51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5BY2hpZXZlbWVudENvbnRlbnQmJnRoaXMuQWNoaWV2ZW1lbnRDb250ZW50LmNoaWxkcmVuKXtcbiAgICAgICAgICAgICAgICAgICAgQWNoaWV2ZW1lbnRDb250ZW50TGVuID0gdGhpcy5BY2hpZXZlbWVudENvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgYWRkTnVtID0gbGlzdC5sZW5ndGggLSBBY2hpZXZlbWVudENvbnRlbnRMZW47XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGROdW07IGkrKykgeyAgICAgICAgICAgICAgICAgICAgICAgIC8v55Sf5oiQXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5kYWlseVByZSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5BY2hpZXZlbWVudENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkQXJyYXkgPSB0aGlzLkFjaGlldmVtZW50Q29udGVudC5jaGlsZHJlbjsgICAgICAvL+iuvue9ruaVsOaNrlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRBcnJheVtpXS5nZXRDb21wb25lbnQodGFza0l0ZW0pLmluaXQobGlzdFtpXSwgbnVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb2tOdW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2ldLmJ1dHRvblR5cGUgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rTnVtKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9rTnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2hpZXZlbWVudFJlZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2hpZXZlbWVudFJlZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhc3NSZWROdW0gPSBva051bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWNoaWV2ZW1lbnRSZWQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZGF0YSl7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc0ZuKGRhdGEpO1xuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmFjaGlldmVtZW50X21haW4sXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbihyZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuXG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMllxuICAgICAqL1xuICAgIGluaXQoZGF0YSkge1xuXG4gICAgICAgIC8vIGlmICghdGhpcy5kYWlseVByZSkge1xuICAgICAgICAvLyAgICAgdGhpcy5sb2FkQW55KFwicHJlZmFiL2dhbWVUYXNrL3Rhc2tJdGVtXCIsIGNjLlByZWZhYiwgKHJlcykgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuZGFpbHlQcmUgPSByZXM7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGFUYXNrKDAsZGF0YXx8bnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGFUYXNrKDEpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5Lu75Yqh5by556qXXCIsXG4gICAgICAgICAgICBja19tb2R1bGU6XCLlsZXnjrBcIixcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIm+W7uuS7u+WKoWl0ZW1cbiAgICAgKi9cbiAgICBjcmVhdGVEYWlseUl0ZW0obnVtKSB7XG5cbiAgICAgICAgLy8gbGV0IHBhcmVudDpjYy5Ob2RlID0gbnVtPT0wP3RoaXMuRGFpbHlDb250ZW50OnRoaXMuQWNoaWV2ZW1lbnRDb250ZW50O1xuXG5cblxuICAgICAgICAvLyBsZXQgZGF0YSA9IG51bT09MD90aGlzLkRhaWx5RGF0YTp0aGlzLkFjaGlldmVtZW50RGF0YTtcbiAgICAgICAgLy8gbGV0IHN1Y2Nlc3NGbiA9ICgpPT57XG4gICAgICAgIC8vICAgICBkYXRhLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGl0ZW06Y2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZGFpbHlQcmUpO1xuICAgICAgICAvLyAgICAgICAgIGl0ZW0uc2V0UGFyZW50KHBhcmVudCk7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGl0ZW1UcyA9IGl0ZW0uZ2V0Q29tcG9uZW50KGl0ZW0ubmFtZSk7XG5cbiAgICAgICAgLy8gICAgICAgICBpdGVtVHMuaW5pdChlbGVtZW50LG51bSk7XG5cbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gaWYodGhpcy5kYWlseVByZSl7XG4gICAgICAgIC8vICAgICBzdWNjZXNzRm4oKTtcblxuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMubG9hZEFueShcInByZWZhYi9nYW1lVGFzay90YXNrSXRlbVwiLGNjLlByZWZhYiwocmVzKT0+e1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuZGFpbHlQcmUgPSByZXM7XG4gICAgICAgIC8vICAgICAgICAgc3VjY2Vzc0ZuKCk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfVxuXG5cblxuXG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICAvL+mHiuaUvlxuICAgICAgICAvLyBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0KHRoaXMuZGFpbHlQcmUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlhbPpl61cbiAgICAgKi9cblxuICAgIGNsb3NlQnRuKCkge1xuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICB9XG5cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=