
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
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
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
            this.rewardLabel.string = "+" + this.coin + LanguageData_1.t("main.金币");
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
                AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t("tips.reward_obtain_failed"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUYXNrUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBQ2xELDJDQUFpRDtBQUNqRCwyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLHlEQUE2QztBQUM3Qyw0Q0FBdUM7QUFDdkMsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBTTtJQUFsRDtRQUFBLHFFQWdLQztRQTdKVyxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUVyQyw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBR3hCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRXJDLGlEQUFpRDtRQUNqRCxvQ0FBb0M7UUFHNUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUVsQyxPQUFPO1FBQ0MsVUFBSSxHQUFXLElBQUksQ0FBQzs7UUE2STVCLGlCQUFpQjtJQUNyQixDQUFDO0lBeElHLCtCQUFNLEdBQU47UUFFSSxzQ0FBc0M7UUFDdEMsbURBQW1EO1FBQ25ELGFBQWE7UUFKakIsaUJBV0M7UUFMRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRWQsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXBDLENBQUMsRUFBRSxzQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFHRDs7O09BR0c7SUFDSCw2QkFBSSxHQUFKLFVBQUssSUFBSTtRQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIs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RUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7cURBQ2Q7SUFmakIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWdLbEM7SUFBRCxxQkFBQztDQWhLRCxBQWdLQyxDQWhLMkMsZ0JBQU0sR0FnS2pEO2tCQWhLb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4uL1BhZ2VNYW5hZ2VcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lVGFza1Jld2FyZCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5paH5a2XXCIgfSlcbiAgICBwcml2YXRlIHJld2FyZExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5pS+5byD6aKG5Y+WXCIgfSlcbiAgICBwcml2YXRlIGNsb3NlQnRuTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuinhumikWljb25cIn0pXG4gICAgLy8gcHJpdmF0ZSB2aWRlb0ljb246Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8v5aSa5bCR5Liq6YeR5biBXG4gICAgcHJpdmF0ZSBjb2luOiBudW1iZXIgPSBudWxsO1xuICAgIC8vXG4gICAgcHJpdmF0ZSBpbml0RGF0YTogYW55O1xuXG5cblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmxpZ2h0KS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyAgICAgY2MudHdlZW4oKS50bygxLHtzY2FsZToxfSkudG8oMSx7c2NhbGU6MS4xfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bk5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB9LCBnYW1lTnVtZXJpY2FsLmNsb3NlVGltZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja5cbiAgICAgKi9cbiAgICBpbml0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5jb2luID0gZGF0YS5jb2luO1xuICAgICAgICBpZiAodGhpcy5yZXdhcmRMYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMuY29pbiArIHQoXCJtYWluLumHkeW4gVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YTtcbiAgICAgICAgaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVGFza0RheURvdWJsZUdldF0pIHtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVGFza0RheURvdWJsZUdldCk7XG4gICAgICAgIH1cblxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogKHRoaXMuaW5pdERhdGEudHlwZVRhc2sgPT0gMCA/IFwi5pel5bi45Lu75YqhXCIgOiBcIuaIkOWwseS7u+WKoVwiKSArIGDnuqLljIXlvoXpooblj5blvLnnqpdgLFxuICAgICAgICB9KVxuXG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pbml0RGF0YSwgJ3RoaXMuaW5pdERhdGEnKVxuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oZSwgcmVzKSB7XG5cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiAodGhpcy5pbml0RGF0YS50eXBlVGFzayA9PSAwID8gXCLml6XluLjku7vliqFcIiA6IFwi5oiQ5bCx5Lu75YqhXCIpICsgYOe6ouWMheW+hemihuWPluW8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi6aKG5Y+WXCIsXG4gICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzogXCLmv4DlirHop4bpopFcIlxuICAgICAgICB9KVxuICAgICAgICBpZiAodGhpcy5pbml0RGF0YSAmJiB0aGlzLmluaXREYXRhLnRhc2tUaXRsZSkge1xuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbml0RGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLmluaXREYXRhLnVybCB8fCAodGhpcy5pbml0RGF0YS50eXBlVGFzayA9PSAwID8gVXJsQ29uc3QudGFza19kYXlfY29tbW9uR2V0IDogVXJsQ29uc3QuYWNoaWV2ZW1lbnRfY29tbW9uR2V0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuaW5pdERhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5maW5pc2hfdGFzayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Npb25fbmFtZTogdGhpcy5pbml0RGF0YS50YXNrVGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Npb25fdHlwZTogdGhpcy5pbml0RGF0YS50eXBlVGFzayA9PSAwID8gXCLml6XluLjku7vliqFcIiA6IFwi5oiQ5bCx5Lu75YqhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Npb25fY29pbjogdGhpcy5jb2luXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICh0aGlzLmluaXREYXRhLnR5cGVUYXNrID09IDAgPyBcIuaXpeW4uOS7u+WKoVwiIDogXCLmiJDlsLHku7vliqFcIikgKyBg57qi5YyF6aKG5Y+W5oiQ5Yqf5by556qXYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIumihuWPllwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogKHRoaXMuaW5pdERhdGEudHlwZVRhc2sgPT0gMCA/IFwi5pel5bi45Lu75YqhXCIgOiBcIuaIkOWwseS7u+WKoVwiKSArIGDnuqLljIXpooblj5bmiJDlip/lvLnnqpdgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVDb2luUmV3YXJkLCB7IGNvaW46IHRoaXMuY29pbiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6aKG5Y+W5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVGFza0RheURvdWJsZUdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodChcInRpcHMucmV3YXJkX29idGFpbl9mYWlsZWRcIikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6aKG5Y+W5aSx6LSlXCIpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bigpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl61cbiAgICAgKi9cbiAgICBjbG9zZUJ0bigpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIC8vIHRoaXMuU2VuZFBvc3QoKTtcbiAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrKTtcbiAgICAgICAgLy8gVHJhY2tNZ3IuTWlzc2lvblByaWNlQ2xpY2soe1xuICAgICAgICAvLyAgICAgbWlzc2lvbl9uYW1lOiB0aGlzLmluaXREYXRhLnRhc2tUaXRsZSxcbiAgICAgICAgLy8gICAgIG1pc3Npb25fdHlwZTogdGhpcy5pbml0RGF0YS50eXBlVGFzaz09MD9cIuaXpeW4uOS7u+WKoVwiOlwi5oiQ5bCx5Lu75YqhXCIsXG4gICAgICAgIC8vICAgICBtaXNzaW9uX2J1dHRvbjogXCLmlL7lvIPpooblj5ZcIixcbiAgICAgICAgLy8gICAgIG1pc3Npb25fY29pbjogdGhpcy5jb2luXG4gICAgICAgIC8vIH0pXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogKHRoaXMuaW5pdERhdGEudHlwZVRhc2sgPT0gMCA/IFwi5pel5bi45Lu75YqhXCIgOiBcIuaIkOWwseS7u+WKoVwiKSArIGDnuqLljIXlvoXpooblj5blvLnnqpdgLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuWFs+mXrVwiXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uVGFza1Jld2FyZFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXG5cbiAgICAgICAgaWYgKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrUmV3YXJkVmlld10pIHtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVGFza1Jld2FyZFZpZXcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uVGFza1Jld2FyZFZpZXcpO1xuICAgICAgICAvL+mihOWKoOi9vemHkeW4geS/oeaBr+a1gVxuICAgICAgICBpZiAoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrUmV3YXJkVmlld10gJiYgdXRpbC5nZXRIZWF2ZW5Qb29sKCkgPiAwKSB7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=