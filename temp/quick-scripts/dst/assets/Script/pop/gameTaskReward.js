
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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var LanguageData_1 = require("../Language/LanguageData");
var PageManage_1 = require("../PageManage");
var UrlConst_1 = require("../server/UrlConst");
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
            // AdController.loadAd(AdPosition.TaskDayDoubleGet, () => {
            if (this.initData) {
                util_1.default.getdataStr({
                    url: this.initData.url || (this.initData.typeTask == 0 ? UrlConst_1.UrlConst.task_day_commonGet : UrlConst_1.UrlConst.achievement_commonGet),
                    data: this.initData.data,
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
            // if (util.adPreObj[AdPosition.TaskDayDoubleGet]) {
            //     util.preloadAd(AdPosition.TaskDayDoubleGet);
            // }
            // }, () => {
            //     AssistCtr.showToastTip(t("tips.reward_obtain_failed"));
            // });
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
        // AdController.loadInfoAd(AdPosition.TaskRewardView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        // if (util.adPreObj[AdPosition.TaskRewardView]) {
        //     util.preloadAd(AdPosition.TaskRewardView, true);
        // }
    };
    gameTaskReward.prototype.onDisable = function () {
        // AdController.hideInfoAd(AdPosition.TaskRewardView);
        // //预加载金币信息流
        // if (!util.adPreObj[AdPosition.TaskRewardView] && util.getHeavenPool() > 0) {
        //     util.preloadAd(AdPosition.TaskRewardView, true);
        // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUYXNrUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFFcEMsMkNBQWlEO0FBQ2pELDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMseURBQTZDO0FBQzdDLDRDQUF1QztBQUN2QywrQ0FBOEM7QUFFOUMsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQU07SUFBbEQ7UUFBQSxxRUEwSkM7UUF2SlcsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFFckMsNENBQTRDO1FBQzVDLGdDQUFnQztRQUd4QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUVyQyxpREFBaUQ7UUFDakQsb0NBQW9DO1FBRzVCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFbEMsT0FBTztRQUNDLFVBQUksR0FBVyxJQUFJLENBQUM7O1FBdUk1QixpQkFBaUI7SUFDckIsQ0FBQztJQWxJRywrQkFBTSxHQUFOO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO1FBSmpCLGlCQVdDO1FBTEcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUVkLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVwQyxDQUFDLEVBQUUsc0JBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBR0Q7OztPQUdHO0lBQ0gsNkJBQUksR0FBSixVQUFLLElBQUk7UUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxH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LEVBQUUsQ0FBQzt3REFDWjtJQU1yQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQztxREFDZDtJQWZqQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBMEpsQztJQUFELHFCQUFDO0NBMUpELEFBMEpDLENBMUoyQyxnQkFBTSxHQTBKakQ7a0JBMUpvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBnYW1lTnVtZXJpY2FsIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XG5pbXBvcnQgUGFnZU1hbmFnZSBmcm9tIFwiLi4vUGFnZU1hbmFnZVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVUYXNrUmV3YXJkIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmloflrZdcIiB9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YWJXCJ9KVxuICAgIC8vIHByaXZhdGUgbGlnaHQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLmlL7lvIPpooblj5ZcIiB9KVxuICAgIHByaXZhdGUgY2xvc2VCdG5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi6KeG6aKRaWNvblwifSlcbiAgICAvLyBwcml2YXRlIHZpZGVvSWNvbjpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuS/oeaBr+a1gVwiIH0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLy/lpJrlsJHkuKrph5HluIFcbiAgICBwcml2YXRlIGNvaW46IG51bWJlciA9IG51bGw7XG4gICAgLy9cbiAgICBwcml2YXRlIGluaXREYXRhOiBhbnk7XG5cblxuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIH0sIGdhbWVOdW1lcmljYWwuY2xvc2VUaW1lKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxuICAgICAqL1xuICAgIGluaXQoZGF0YSkge1xuICAgICAgICB0aGlzLmNvaW4gPSBkYXRhLmNvaW47XG4gICAgICAgIGlmICh0aGlzLnJld2FyZExhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLnJld2FyZExhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5jb2luICsgdChcIm1haW4u6YeR5biBXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICBcblxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5pdERhdGEsICd0aGlzLmluaXREYXRhJylcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKGUsIHJlcykge1xuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogKHRoaXMuaW5pdERhdGEudHlwZVRhc2sgPT0gMCA/IFwi5pel5bi45Lu75YqhXCIgOiBcIuaIkOWwseS7u+WKoVwiKSArIGDnuqLljIXlvoXpooblj5blvLnnqpdgLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIumihuWPllwiLFxuICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6IFwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHRoaXMuaW5pdERhdGEgJiYgdGhpcy5pbml0RGF0YS50YXNrVGl0bGUpIHtcbiAgICAgICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5pdERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy5pbml0RGF0YS51cmwgfHwgKHRoaXMuaW5pdERhdGEudHlwZVRhc2sgPT0gMCA/IFVybENvbnN0LnRhc2tfZGF5X2NvbW1vbkdldCA6IFVybENvbnN0LmFjaGlldmVtZW50X2NvbW1vbkdldCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmluaXREYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UYXNrX3VwZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuZmluaXNoX3Rhc2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX25hbWU6IHRoaXMuaW5pdERhdGEudGFza1RpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX3R5cGU6IHRoaXMuaW5pdERhdGEudHlwZVRhc2sgPT0gMCA/IFwi5pel5bi45Lu75YqhXCIgOiBcIuaIkOWwseS7u+WKoVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX2NvaW46IHRoaXMuY29pblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiAodGhpcy5pbml0RGF0YS50eXBlVGFzayA9PSAwID8gXCLml6XluLjku7vliqFcIiA6IFwi5oiQ5bCx5Lu75YqhXCIpICsgYOe6ouWMhemihuWPluaIkOWKn+W8ueeql2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLpooblj5ZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICh0aGlzLmluaXREYXRhLnR5cGVUYXNrID09IDAgPyBcIuaXpeW4uOS7u+WKoVwiIDogXCLmiJDlsLHku7vliqFcIikgKyBg57qi5YyF6aKG5Y+W5oiQ5Yqf5by556qXYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lQ29pblJld2FyZCwgeyBjb2luOiB0aGlzLmNvaW4gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIumihuWPluWksei0pVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrRGF5RG91YmxlR2V0XSkge1xuICAgICAgICAgICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tEYXlEb3VibGVHZXQpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHQoXCJ0aXBzLnJld2FyZF9vYnRhaW5fZmFpbGVkXCIpKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIumihuWPluWksei0pVwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG4oKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6ZetXG4gICAgICovXG4gICAgY2xvc2VCdG4oKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAvLyB0aGlzLlNlbmRQb3N0KCk7XG4gICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVGFzayk7XG4gICAgICAgIC8vIFRyYWNrTWdyLk1pc3Npb25QcmljZUNsaWNrKHtcbiAgICAgICAgLy8gICAgIG1pc3Npb25fbmFtZTogdGhpcy5pbml0RGF0YS50YXNrVGl0bGUsXG4gICAgICAgIC8vICAgICBtaXNzaW9uX3R5cGU6IHRoaXMuaW5pdERhdGEudHlwZVRhc2s9PTA/XCLml6XluLjku7vliqFcIjpcIuaIkOWwseS7u+WKoVwiLFxuICAgICAgICAvLyAgICAgbWlzc2lvbl9idXR0b246IFwi5pS+5byD6aKG5Y+WXCIsXG4gICAgICAgIC8vICAgICBtaXNzaW9uX2NvaW46IHRoaXMuY29pblxuICAgICAgICAvLyB9KVxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICh0aGlzLmluaXREYXRhLnR5cGVUYXNrID09IDAgPyBcIuaXpeW4uOS7u+WKoVwiIDogXCLmiJDlsLHku7vliqFcIikgKyBg57qi5YyF5b6F6aKG5Y+W5by556qXYCxcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLlhbPpl61cIlxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuXG4gICAgICAgIC8vIGlmICh1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVGFza1Jld2FyZFZpZXddKSB7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3LCB0cnVlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICAvLyBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3KTtcbiAgICAgICAgLy8gLy/pooTliqDovb3ph5HluIHkv6Hmga/mtYFcbiAgICAgICAgLy8gaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVGFza1Jld2FyZFZpZXddICYmIHV0aWwuZ2V0SGVhdmVuUG9vbCgpID4gMCkge1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5UYXNrUmV3YXJkVmlldywgdHJ1ZSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19