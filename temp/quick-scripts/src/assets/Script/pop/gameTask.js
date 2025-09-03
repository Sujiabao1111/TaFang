"use strict";
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