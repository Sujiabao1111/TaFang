
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameTaskReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUYXNrUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBQ2xELDJDQUFpRDtBQUNqRCwyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLDRDQUF1QztBQUN2QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFNO0lBQWxEO1FBQUEscUVBZ0tDO1FBN0pXLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRXBDLDRDQUE0QztRQUM1QyxnQ0FBZ0M7UUFHeEIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFFcEMsaURBQWlEO1FBQ2pELG9DQUFvQztRQUc1QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRWpDLE9BQU87UUFDQyxVQUFJLEdBQVUsSUFBSSxDQUFDOztRQTZJM0IsaUJBQWlCO0lBQ3JCLENBQUM7SUF4SUcsK0JBQU0sR0FBTjtRQUVJLHNDQUFzQztRQUN0QyxtREFBbUQ7UUFDbkQsYUFBYTtRQUpqQixpQkFXQztRQUxHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFFZCxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFcEMsQ0FBQyxFQUFDLHNCQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUdEOzs7T0FHRztJQUNILDZCQUFJLEdBQUosVUFBSyxJQUFJO1FBQ0wsSUFBSSxDQUFDLElBQUksR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBQztZQUNoQixJQUFJLENBQUMsV0FB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UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FnS2xDO0lBQUQscUJBQUM7Q0FoS0QsQUFnS0MsQ0FoSzJDLGdCQUFNLEdBZ0tqRDtrQkFoS29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGdhbWVOdW1lcmljYWwgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4uL1BhZ2VNYW5hZ2VcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVRhc2tSZXdhcmQgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5paH5a2XXCJ9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuICAgIFxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YWJXCJ9KVxuICAgIC8vIHByaXZhdGUgbGlnaHQ6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLmlL7lvIPpooblj5ZcIn0pXG4gICAgcHJpdmF0ZSBjbG9zZUJ0bk5vZGU6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLop4bpopFpY29uXCJ9KVxuICAgIC8vIHByaXZhdGUgdmlkZW9JY29uOmNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5L+h5oGv5rWBXCJ9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgLy/lpJrlsJHkuKrph5HluIFcbiAgICBwcml2YXRlIGNvaW46bnVtYmVyID0gbnVsbDtcbiAgICAvL1xuICAgIHByaXZhdGUgaW5pdERhdGE6YW55O1xuXG5cblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5saWdodCkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkudG8oMSx7c2NhbGU6MX0pLnRvKDEse3NjYWxlOjEuMX0pXG4gICAgICAgIC8vICkuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIH0sZ2FtZU51bWVyaWNhbC5jbG9zZVRpbWUpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICovXG4gICAgaW5pdChkYXRhKXtcbiAgICAgICAgdGhpcy5jb2luICA9IGRhdGEuY29pbjtcbiAgICAgICAgaWYodGhpcy5yZXdhcmRMYWJlbCl7XG4gICAgICAgICAgICB0aGlzLnJld2FyZExhYmVsLnN0cmluZyA9IFwiK1wiKyB0aGlzLmNvaW4rXCLnuqLljIXluIFcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YTtcbiAgICAgICAgaWYoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0XSl7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICh0aGlzLmluaXREYXRhLnR5cGVUYXNrPT0wP1wi5pel5bi45Lu75YqhXCI6XCLmiJDlsLHku7vliqFcIikrIGDnuqLljIXlvoXpooblj5blvLnnqpdgLFxuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmluaXREYXRhLCd0aGlzLmluaXREYXRhJylcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKGUscmVzKXtcbiAgICAgICAgXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6KHRoaXMuaW5pdERhdGEudHlwZVRhc2s9PTA/XCLml6XluLjku7vliqFcIjpcIuaIkOWwseS7u+WKoVwiKSsgYOe6ouWMheW+hemihuWPluW8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi6aKG5Y+WXCIsXG4gICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzpcIua/gOWKseinhumikVwiXG4gICAgICAgIH0pXG4gICAgICAgIGlmKHRoaXMuaW5pdERhdGEmJnRoaXMuaW5pdERhdGEudGFza1RpdGxlKXtcbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0LCgpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbml0RGF0YSl7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6dGhpcy5pbml0RGF0YS51cmx8fCh0aGlzLmluaXREYXRhLnR5cGVUYXNrPT0wP1VybENvbnN0LnRhc2tfZGF5X2NvbW1vbkdldDpVcmxDb25zdC5hY2hpZXZlbWVudF9jb21tb25HZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTp0aGlzLmluaXREYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVGFza191cGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmZpbmlzaF90YXNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2lvbl9uYW1lOiB0aGlzLmluaXREYXRhLnRhc2tUaXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2lvbl90eXBlOiB0aGlzLmluaXREYXRhLnR5cGVUYXNrPT0wP1wi5pel5bi45Lu75YqhXCI6XCLmiJDlsLHku7vliqFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2lvbl9jb2luOiB0aGlzLmNvaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICh0aGlzLmluaXREYXRhLnR5cGVUYXNrPT0wP1wi5pel5bi45Lu75YqhXCI6XCLmiJDlsLHku7vliqFcIikrIGDnuqLljIXpooblj5bmiJDlip/lvLnnqpdgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiAodGhpcy5pbml0RGF0YS50eXBlVGFzaz09MD9cIuaXpeW4uOS7u+WKoVwiOlwi5oiQ5bCx5Lu75YqhXCIpKyBg57qi5YyF6aKG5Y+W5oiQ5Yqf5by556qXYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lQ29pblJld2FyZCx7Y29pbjp0aGlzLmNvaW59KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6aKG5Y+W5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVGFza0RheURvdWJsZUdldF0pe1xuICAgICAgICAgICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIumihuWPluWksei0pVwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG4oKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl61cbiAgICAgKi9cbiAgICBjbG9zZUJ0bigpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgLy8gdGhpcy5TZW5kUG9zdCgpO1xuICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVRhc2spO1xuICAgICAgICAvLyBUcmFja01nci5NaXNzaW9uUHJpY2VDbGljayh7XG4gICAgICAgIC8vICAgICBtaXNzaW9uX25hbWU6IHRoaXMuaW5pdERhdGEudGFza1RpdGxlLFxuICAgICAgICAvLyAgICAgbWlzc2lvbl90eXBlOiB0aGlzLmluaXREYXRhLnR5cGVUYXNrPT0wP1wi5pel5bi45Lu75YqhXCI6XCLmiJDlsLHku7vliqFcIixcbiAgICAgICAgLy8gICAgIG1pc3Npb25fYnV0dG9uOiBcIuaUvuW8g+mihuWPllwiLFxuICAgICAgICAvLyAgICAgbWlzc2lvbl9jb2luOiB0aGlzLmNvaW5cbiAgICAgICAgLy8gfSlcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogKHRoaXMuaW5pdERhdGEudHlwZVRhc2s9PTA/XCLml6XluLjku7vliqFcIjpcIuaIkOWwseS7u+WKoVwiKSsgYOe6ouWMheW+hemihuWPluW8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5YWz6ZetXCJcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgb25FbmFibGUoKSB7ICAgXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uVGFza1Jld2FyZFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXG4gICAgICAgIFxuICAgICAgICBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVGFza1Jld2FyZFZpZXddKXtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVGFza1Jld2FyZFZpZXcsdHJ1ZSk7XG4gICAgICAgIH0gXG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uVGFza1Jld2FyZFZpZXcpO1xuICAgICAgICAvL+mihOWKoOi9vemHkeW4geS/oeaBr+a1gVxuICAgICAgICBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3XSYmdXRpbC5nZXRIZWF2ZW5Qb29sKCk+MCl7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3LHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==