
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/taskProgress.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '02288pnCQhLLrd2YS2Z+YOg', 'taskProgress');
// Script/ui/taskProgress.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var taskProgress = /** @class */ (function (_super) {
    __extends(taskProgress, _super);
    function taskProgress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskProgress = null; //任务进度条
        _this.tasklabel1 = null; //任务标题
        _this.tasklabel2 = null; //任务标题
        _this.hongbao = null; //红包
        _this.taskType = null; //任务类型
        return _this;
        // update (dt) {}
    }
    taskProgress.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Task_Progress, function () {
            _this.setState();
        });
        cc.game.on(NameTs_1.default.Game_Task_updata, function () {
            _this.setState();
        });
    };
    /**
     * 展现任务
     */
    taskProgress.prototype.showGameTask = function () {
        this.showPage(pageTs_1.default.pageName.GameTask);
        if (this.initData) {
            TrackMgr_1.default.taskbar_click({
                activity_state: this.initData.taskTitle,
                task_progress: this.taskProgress.progress >= 1 ? "已完成" : ((this.initData.taskType == 2 ? util_1.default.userData.localCompoundTime : this.initData.userTaskValue) + "/" + this.initData.taskValue),
                task_type: this.taskType == 0 ? "日常任务" : "成就任务",
            });
            TrackMgr_1.default.AppClick({
                app_page_title: "首页",
                app_ck_module: "任务进度入口",
                app_exposure_type: "icon",
            });
        }
    };
    taskProgress.prototype.start = function () {
        this.setState();
    };
    /**设置状态 */
    taskProgress.prototype.setState = function () {
        var _this = this;
        // this.taskProgress.progress = 
        util_1.default.getFistTask(function (res, taskType) {
            _this.taskProgress.node.getParent().active = res !== null;
            _this.taskType = taskType;
            if (res) {
                _this.initData = res;
                _this.taskProgress.progress = (res.taskType == 2 ? util_1.default.userData.localCompoundTime : res.userTaskValue) / res.taskValue;
                _this.tasklabel1.string = res.taskTitle + "(";
                _this.tasklabel2.string = _this.taskProgress.progress >= 1 ? "已完成" : ((res.taskType == 2 ? util_1.default.userData.localCompoundTime : res.userTaskValue) + "/" + res.taskValue);
                _this.hongbao.stopAllActions();
                _this.hongbao.x = 162;
                if (_this.taskProgress.progress >= 1) {
                    cc.tween(_this.hongbao).repeatForever(cc.tween().by(.1, { x: 5 }).by(.2, { x: -10 }).by(.1, { x: 5 }).delay(.3)).start();
                }
            }
        });
    };
    __decorate([
        property(cc.ProgressBar)
    ], taskProgress.prototype, "taskProgress", void 0);
    __decorate([
        property(cc.Label)
    ], taskProgress.prototype, "tasklabel1", void 0);
    __decorate([
        property(cc.Label)
    ], taskProgress.prototype, "tasklabel2", void 0);
    __decorate([
        property(cc.Node)
    ], taskProgress.prototype, "hongbao", void 0);
    taskProgress = __decorate([
        ccclass
    ], taskProgress);
    return taskProgress;
}(baseTs_1.default));
exports.default = taskProgress;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcdGFza1Byb2dyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUFpR0M7UUE3Rkcsa0JBQVksR0FBa0IsSUFBSSxDQUFDLENBQUMsT0FBTztRQUczQyxnQkFBVSxHQUFZLElBQUksQ0FBQyxDQUFDLE1BQU07UUFHbEMsZ0JBQVUsR0FBWSxJQUFJLENBQUMsQ0FBQyxNQUFNO1FBR2xDLGFBQU8sR0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBS3BCLGNBQVEsR0FBVSxJQUFJLENBQUMsQ0FBQSxNQUFNOztRQThFckMsaUJBQWlCO0lBQ3JCLENBQUM7SUE3RUcsNkJBQU0sR0FBTjtRQUFBLGlCQVdDO1FBVEcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxrQkFBa0IsRUFBRTtZQUNsQyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFFO1lBQ2hDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUdQLENBQUM7SUFFRDs7T0FFRztJQUNILG1DQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhDLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUNiLGtCQUFRLENBQUMsYUFBYSxD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aUJBQ2I7YUFFSjtRQUVMLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQTFGRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3NEQUNVO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNLO0lBYk4sWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWlHaEM7SUFBRCxtQkFBQztDQWpHRCxBQWlHQyxDQWpHeUMsZ0JBQU0sR0FpRy9DO2tCQWpHb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGFza1Byb2dyZXNzIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIFxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICB0YXNrUHJvZ3Jlc3M6Y2MuUHJvZ3Jlc3NCYXIgPSBudWxsOyAvL+S7u+WKoei/m+W6puadoVxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRhc2tsYWJlbDE6Y2MuTGFiZWwgPSBudWxsOyAvL+S7u+WKoeagh+mimFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRhc2tsYWJlbDI6Y2MuTGFiZWwgPSBudWxsOyAvL+S7u+WKoeagh+mimFxuICAgIFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGhvbmdiYW86Y2MuTm9kZSA9IG51bGw7IC8v57qi5YyFXG5cblxuICAgIHByaXZhdGUgaW5pdERhdGE6YW55O1xuXG4gICAgcHJpdmF0ZSB0YXNrVHlwZTpudW1iZXIgPSBudWxsOy8v5Lu75Yqh57G75Z6LXG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVGFza19Qcm9ncmVzcywgKCk9PntcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UYXNrX3VwZGF0YSwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWxleeOsOS7u+WKoVxuICAgICAqL1xuICAgIHNob3dHYW1lVGFzaygpe1xuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVGFzayk7XG5cbiAgICAgICAgaWYodGhpcy5pbml0RGF0YSl7XG4gICAgICAgICAgICBUcmFja01nci50YXNrYmFyX2NsaWNrKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogdGhpcy5pbml0RGF0YS50YXNrVGl0bGUsXG4gICAgICAgICAgICAgICAgdGFza19wcm9ncmVzczogdGhpcy50YXNrUHJvZ3Jlc3MucHJvZ3Jlc3M+PTE/XCLlt7LlrozmiJBcIjooKHRoaXMuaW5pdERhdGEudGFza1R5cGU9PTI/dXRpbC51c2VyRGF0YS5sb2NhbENvbXBvdW5kVGltZTp0aGlzLmluaXREYXRhLnVzZXJUYXNrVmFsdWUpK1wiL1wiK3RoaXMuaW5pdERhdGEudGFza1ZhbHVlKSxcbiAgICAgICAgICAgICAgICB0YXNrX3R5cGU6IHRoaXMudGFza1R5cGU9PTA/XCLml6XluLjku7vliqFcIjpcIuaIkOWwseS7u+WKoVwiLCAgIFxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICBUcmFja01nci5BcHBDbGljayh7XG4gICAgICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6aaW6aG1XCIsXG4gICAgICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLku7vliqHov5vluqblhaXlj6NcIixcbiAgICAgICAgICAgICAgICBhcHBfZXhwb3N1cmVfdHlwZTogXCJpY29uXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgLyoq6K6+572u54q25oCBICovXG5cbiAgICBzZXRTdGF0ZSgpe1xuXG5cbiAgICAgICAgLy8gdGhpcy50YXNrUHJvZ3Jlc3MucHJvZ3Jlc3MgPSBcbiAgICAgICAgdXRpbC5nZXRGaXN0VGFzaygocmVzLHRhc2tUeXBlKT0+e1xuXG4gICAgICAgICAgICB0aGlzLnRhc2tQcm9ncmVzcy5ub2RlLmdldFBhcmVudCgpLmFjdGl2ZSA9IHJlcyE9PW51bGw7XG4gICAgICAgICAgICB0aGlzLnRhc2tUeXBlID0gdGFza1R5cGU7XG4gICAgICAgICAgICBpZihyZXMpe1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0RGF0YSA9IHJlcztcblxuICAgICAgICAgICAgICAgIHRoaXMudGFza1Byb2dyZXNzLnByb2dyZXNzID0gKHJlcy50YXNrVHlwZT09Mj91dGlsLnVzZXJEYXRhLmxvY2FsQ29tcG91bmRUaW1lOnJlcy51c2VyVGFza1ZhbHVlKS9yZXMudGFza1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrbGFiZWwxLnN0cmluZyA9IHJlcy50YXNrVGl0bGUrXCIoXCI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tsYWJlbDIuc3RyaW5nID0gdGhpcy50YXNrUHJvZ3Jlc3MucHJvZ3Jlc3M+PTE/XCLlt7LlrozmiJBcIjooKHJlcy50YXNrVHlwZT09Mj91dGlsLnVzZXJEYXRhLmxvY2FsQ29tcG91bmRUaW1lOnJlcy51c2VyVGFza1ZhbHVlKStcIi9cIityZXMudGFza1ZhbHVlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmhvbmdiYW8uc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbmdiYW8ueCA9IDE2MjtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRhc2tQcm9ncmVzcy5wcm9ncmVzcz49MSl7XG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuaG9uZ2JhbykucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKCkuYnkoLjEse3g6NX0pLmJ5KC4yLHt4Oi0xMH0pLmJ5KC4xLHt4OjV9KS5kZWxheSguMylcbiAgICAgICAgICAgICAgICAgICAgKS5zdGFydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=