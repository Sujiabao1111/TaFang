"use strict";
cc._RF.push(module, 'fd1dc8KvB1LLrFO4/UQDytK', 'gameTaskReward');
// Script/pop/gameTaskReward.ts

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
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var PageManage_1 = require("../PageManage");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameTaskReward = /** @class */ (function (_super) {
    __extends(gameTaskReward, _super);
    function gameTaskReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.closeBtnNode = null;
        // @property({type:cc.Node,displayName:"视频icon"})
        // private videoIcon:cc.Node = null;
        _this.feed_node = null;
        //多少个金币
        _this.coin = null;
        return _this;
        // update (dt) {}
    }
    gameTaskReward.prototype.onLoad = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        var _this = this;
        this.scheduleOnce(function () {
            _this.closeBtnNode.active = true;
        }, faceTs_1.gameNumerical.closeTime);
    };
    /**
     *
     * @param data 数据
     */
    gameTaskReward.prototype.init = function (data) {
        this.coin = data.coin;
        if (this.rewardLabel) {
            this.rewardLabel.string = "+" + this.coin + "红包币";
        }
        this.initData = data;
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.TaskDayDoubleGet]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.TaskDayDoubleGet);
        }
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: (this.initData.typeTask == 0 ? "日常任务" : "成就任务") + "\u7EA2\u5305\u5F85\u9886\u53D6\u5F39\u7A97",
        });
        console.log(this.initData, 'this.initData');
    };
    gameTaskReward.prototype.start = function () {
    };
    /**
     * 获取
     */
    gameTaskReward.prototype.getBtn = function (e, res) {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: (this.initData.typeTask == 0 ? "日常任务" : "成就任务") + "\u7EA2\u5305\u5F85\u9886\u53D6\u5F39\u7A97",
            ck_module: "领取",
            active_ad_hcdg: "激励视频"
        });
        if (this.initData && this.initData.taskTitle) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.TaskDayDoubleGet, function () {
                if (_this.initData) {
                    util_1.default.getdataStr({
                        url: _this.initData.url || (_this.initData.typeTask == 0 ? UrlConst_1.UrlConst.task_day_commonGet : UrlConst_1.UrlConst.achievement_commonGet),
                        data: _this.initData.data,
                        success: function () {
                            if (!_this.isValid) {
                                return;
                            }
                            cc.game.emit(NameTs_1.default.Game_Task_updata);
                            TrackMgr_1.default.finish_task({
                                mission_name: _this.initData.taskTitle,
                                mission_type: _this.initData.typeTask == 0 ? "日常任务" : "成就任务",
                                mission_coin: _this.coin
                            });
                            TrackMgr_1.default.AppDialogClick_hcdg({
                                dialog_name_hcdg: (_this.initData.typeTask == 0 ? "日常任务" : "成就任务") + "\u7EA2\u5305\u9886\u53D6\u6210\u529F\u5F39\u7A97",
                                ck_module: "领取",
                            });
                            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                                dialog_name_hcdg: (_this.initData.typeTask == 0 ? "日常任务" : "成就任务") + "\u7EA2\u5305\u9886\u53D6\u6210\u529F\u5F39\u7A97",
                            });
                            PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.GameCoinReward, { coin: _this.coin });
                            _this.closePage();
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
            this.closeBtn();
        }
    };
    /**
     * 关闭
     */
    gameTaskReward.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        // this.SendPost();
        PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.GameTask);
        // TrackMgr.MissionPriceClick({
        //     mission_name: this.initData.taskTitle,
        //     mission_type: this.initData.typeTask==0?"日常任务":"成就任务",
        //     mission_button: "放弃领取",
        //     mission_coin: this.coin
        // })
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: (this.initData.typeTask == 0 ? "日常任务" : "成就任务") + "\u7EA2\u5305\u5F85\u9886\u53D6\u5F39\u7A97",
            ck_module: "关闭"
        });
    };
    gameTaskReward.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.TaskRewardView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        if (util_1.default.adPreObj[AdPosition_1.AdPosition.TaskRewardView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.TaskRewardView, true);
        }
    };
    gameTaskReward.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.TaskRewardView);
        //预加载金币信息流
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.TaskRewardView] && util_1.default.getHeavenPool() > 0) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.TaskRewardView, true);
        }
    };
    __decorate([
        property({ type: cc.Label, displayName: "文字" })
    ], gameTaskReward.prototype, "rewardLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "放弃领取" })
    ], gameTaskReward.prototype, "closeBtnNode", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameTaskReward.prototype, "feed_node", void 0);
    gameTaskReward = __decorate([
        ccclass
    ], gameTaskReward);
    return gameTaskReward;
}(baseTs_1.default));
exports.default = gameTaskReward;

cc._RF.pop();