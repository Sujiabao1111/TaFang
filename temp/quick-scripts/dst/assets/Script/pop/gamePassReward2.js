
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gamePassReward2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '35a97KKRwxOV4iqwmgDmXcG', 'gamePassReward2');
// Script/pop/gamePassReward2.ts

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
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gamePassReward2 = /** @class */ (function (_super) {
    __extends(gamePassReward2, _super);
    function gamePassReward2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel1 = null;
        _this.rewardLabel2 = null;
        _this.feed_node = null;
        _this.multipleNode = null;
        return _this;
        // update (dt) {}
    }
    gamePassReward2.prototype.onLoad = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**
     *
     */
    gamePassReward2.prototype.init = function () {
        var _this = this;
        //获取用户行为4
        this.coin = Tools_1.Tools.GetArrData("type", 4, util_1.default.behaviorRewardVoList).reward || 150;
        this.rewardLabel1.string = "+" + this.coin + "红包币";
        this.rewardLabel2.string = this.coin * 10 + "";
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.GamePassCoinView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "通关成功",
        });
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.gameLevelIndex,
            success: function (data) {
                if (!_this.isValid) {
                    return;
                }
                console.log("设置一次----------------------------------------------------------" + JSON.stringify(data.mapConfig));
                // util.behaviorRewardVoList = data.behaviorRewardVoList
                util_1.default.getnowmapdata();
                util_1.default.mapConfig = data.mapConfig;
            }
        });
    };
    gamePassReward2.prototype.start = function () {
    };
    /**
     * 获取
     */
    gamePassReward2.prototype.getBtn = function (str, e) {
        var _this = this;
        var isVideo = e == 1;
        soundController_1.default.singleton.clickAudio();
        var successFn = function () {
            var coin = _this.coin * (isVideo ? 10 : 1);
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.node, value: coin, num: 10 });
            util_1.default.addTermCoin(coin);
            _this.closeBtn();
            cc.game.emit(NameTs_1.default.Game_Start);
        };
        if (isVideo) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.GamePassReward, function () {
                successFn();
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "通关成功",
                ck_module: "多倍领取",
                active_ad_hcdg: "激励视频"
            });
        }
        else {
            successFn();
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "通关成功",
                ck_module: "领取",
            });
        }
    };
    /**
     * 关闭
     */
    gamePassReward2.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "通关成功",
            ck_module: "点击领取",
        });
    };
    gamePassReward2.prototype.onEnable = function () {
    };
    gamePassReward2.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.GamePassCoinView);
    };
    __decorate([
        property({ type: cc.Label, displayName: "金币" })
    ], gamePassReward2.prototype, "rewardLabel1", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "翻倍金币" })
    ], gamePassReward2.prototype, "rewardLabel2", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gamePassReward2.prototype, "feed_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gamePassReward2.prototype, "multipleNode", void 0);
    gamePassReward2 = __decorate([
        ccclass
    ], gamePassReward2);
    return gamePassReward2;
}(baseTs_1.default));
exports.default = gamePassReward2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQYXNzUmV3YXJkMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUVsRCwyQ0FBc0M7QUFFdEMsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHVDQUFzQztBQUN0QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQU07SUFBbkQ7UUFBQSxxRUFpSkM7UUE5SVcsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFJOUIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUkxQixrQkFBWSxHQUFZLElBQUksQ0FBQzs7UUFrSXJDLGlCQUFpQjtJQUNyQixDQUFDO0lBN0hHLGdDQUFNLEdBQU47UUFFSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQ3JDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUN4RCxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWQsQ0FBQztJQUNEOztPQUVHO0lBQ0gsOEJBQUksR0FBSjtRQUFBLGlCQWdDQztRQS9CRyxTQUFTO1FBQ1QsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsY0FBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztR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LGdCQUFnQixFQUFFLE1BQU07WUFDeEIsU0FBUyxFQUFFLE1BQU07U0FDcEIsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELGtDQUFRLEdBQVI7SUFFQSxDQUFDO0lBR0QsbUNBQVMsR0FBVDtRQUVJLHNCQUFZLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUV6RCxDQUFDO0lBM0lEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO3lEQUNWO0lBSXRDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO3lEQUNaO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO3NEQUNkO0lBSWxDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO3lEQUNWO0lBZHBCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0FpSm5DO0lBQUQsc0JBQUM7Q0FqSkQsQUFpSkMsQ0FqSjRDLGdCQUFNLEdBaUpsRDtrQkFqSm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGdhbWVOdW1lcmljYWwsIHByb3BUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi91dGlsL1Rvb2xzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lUGFzc1Jld2FyZDIgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIumHkeW4gVwiIH0pXG4gICAgcHJpdmF0ZSByZXdhcmRMYWJlbDE6IGNjLkxhYmVsID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIue/u+WAjemHkeW4gVwiIH0pXG4gICAgcHJpdmF0ZSByZXdhcmRMYWJlbDI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuS/oeaBr+a1gVwiIH0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLlgI3mlbBcIiB9KVxuICAgIHByaXZhdGUgbXVsdGlwbGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgY29pbjogYW55O1xuXG4gICAgcHJpdmF0ZSB4aW54aWxpdWk6IG51bWJlcjtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICBjYy50d2Vlbih0aGlzLm11bHRpcGxlTm9kZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjMsIHsgYW5nbGU6IDEwIH0pLnRvKC4yLCB7IGFuZ2xlOiAwIH0pXG4gICAgICAgICkuc3RhcnQoKTtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICAvL+iOt+WPlueUqOaIt+ihjOS4ujRcbiAgICAgICAgdGhpcy5jb2luID0gVG9vbHMuR2V0QXJyRGF0YShcInR5cGVcIiwgNCwgdXRpbC5iZWhhdmlvclJld2FyZFZvTGlzdCkucmV3YXJkIHx8IDE1MDtcblxuICAgICAgICB0aGlzLnJld2FyZExhYmVsMS5zdHJpbmcgPSBcIitcIiArIHRoaXMuY29pbiArIFwi57qi5YyF5biBXCI7XG5cbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbDIuc3RyaW5nID0gdGhpcy5jb2luICogMTAgKyBcIlwiO1xuXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uR2FtZVBhc3NDb2luVmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcblxuXG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6YCa5YWz5oiQ5YqfXCIsXG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nYW1lTGV2ZWxJbmRleCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiuvue9ruS4gOasoS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIiArIEpTT04uc3RyaW5naWZ5KGRhdGEubWFwQ29uZmlnKSlcbiAgICAgICAgICAgICAgICAvLyB1dGlsLmJlaGF2aW9yUmV3YXJkVm9MaXN0ID0gZGF0YS5iZWhhdmlvclJld2FyZFZvTGlzdFxuICAgICAgICAgICAgICAgIHV0aWwuZ2V0bm93bWFwZGF0YSgpO1xuICAgICAgICAgICAgICAgIHV0aWwubWFwQ29uZmlnID0gZGF0YS5tYXBDb25maWc7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKHN0ciwgZSkge1xuXG4gICAgICAgIGxldCBpc1ZpZGVvOiBib29sZWFuID0gZSA9PSAxO1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICBsZXQgc3VjY2Vzc0ZuOiBGdW5jdGlvbiA9ICgpID0+IHtcblxuICAgICAgICAgICAgbGV0IGNvaW46IG51bWJlciA9IHRoaXMuY29pbiAqIChpc1ZpZGVvID8gMTAgOiAxKTtcblxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMubm9kZSwgdmFsdWU6IGNvaW4sIG51bTogMTAgfSk7XG4gICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKGNvaW4pO1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnRuKCk7XG5cbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdGFydCk7XG5cblxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNWaWRlbykge1xuXG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uR2FtZVBhc3NSZXdhcmQsICgpID0+IHtcblxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLpgJrlhbPmiJDlip9cIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5aSa5YCN6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6IFwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6YCa5YWz5oiQ5YqfXCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIumihuWPllwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXrVxuICAgICAqL1xuICAgIGNsb3NlQnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6YCa5YWz5oiQ5YqfXCIsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi54K55Ye76aKG5Y+WXCIsXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcblxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuXG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uR2FtZVBhc3NDb2luVmlldyk7XG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19