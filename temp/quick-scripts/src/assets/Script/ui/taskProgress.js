"use strict";
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