
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
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
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
        this.coin = tool_1.default.GetArrData("type", 4, util_1.default.behaviorRewardVoList).reward || 150;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQYXNzUmV3YXJkMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUVsRCwyQ0FBc0M7QUFFdEMsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNkMsbUNBQU07SUFBbkQ7UUFBQSxxRUFpSkM7UUE5SVcsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFJN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsZUFBUyxHQUFXLElBQUksQ0FBQztRQUl6QixrQkFBWSxHQUFXLElBQUksQ0FBQzs7UUFrSXBDLGlCQUFpQjtJQUNyQixDQUFDO0lBN0hHLGdDQUFNLEdBQU47UUFFSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQ3JDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUNoRCxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWQsQ0FBQztJQUNEOztPQUVHO0lBQ0gsOEJBQUksR0FBSjtRQUFBLGlCQWdDQztRQS9CRyxTQUFTO1FBQ1QsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsY0FBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxJQUFFLEdBQUcsQ0FBQztR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Z0JBQWdCLEVBQUUsTUFBTTtZQUN4QixTQUFTLEVBQUMsTUFBTTtTQUNuQixDQUFDLENBQUE7SUFFTixDQUFDO0lBRUQsa0NBQVEsR0FBUjtJQUVBLENBQUM7SUFHRCxtQ0FBUyxHQUFUO1FBRUksc0JBQVksQ0FBQyxVQUFVLENBQUMsdUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXpELENBQUM7SUEzSUQ7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUM7eURBQ047SUFJckM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7eURBQ1I7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLENBQUM7c0RBQ1Y7SUFJakM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUM7eURBQ047SUFkbkIsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQWlKbkM7SUFBRCxzQkFBQztDQWpKRCxBQWlKQyxDQWpKNEMsZ0JBQU0sR0FpSmxEO2tCQWpKb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCwgcHJvcFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lUGFzc1Jld2FyZDIgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi6YeR5biBXCJ9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWwxOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIue/u+WAjemHkeW4gVwifSlcbiAgICBwcml2YXRlIHJld2FyZExhYmVsMjpjYy5MYWJlbCA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLkv6Hmga/mtYFcIn0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWAjeaVsFwifSlcbiAgICBwcml2YXRlIG11bHRpcGxlTm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgY29pbjphbnk7XG5cbiAgICBwcml2YXRlIHhpbnhpbGl1aTpudW1iZXI7XG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubXVsdGlwbGVOb2RlKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMyx7YW5nbGU6MTB9KS50byguMix7YW5nbGU6MH0pXG4gICAgICAgICkuc3RhcnQoKTtcbiAgICAgICAgXG4gICAgfSAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBpbml0KCl7XG4gICAgICAgIC8v6I635Y+W55So5oi36KGM5Li6NFxuICAgICAgICB0aGlzLmNvaW4gPSB0b29sLkdldEFyckRhdGEoXCJ0eXBlXCIsIDQsIHV0aWwuYmVoYXZpb3JSZXdhcmRWb0xpc3QpLnJld2FyZHx8MTUwO1xuXG4gICAgICAgIHRoaXMucmV3YXJkTGFiZWwxLnN0cmluZyA9IFwiK1wiK3RoaXMuY29pbitcIue6ouWMheW4gVwiO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbDIuc3RyaW5nID0gdGhpcy5jb2luKjEwK1wiXCI7XG5cbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5HYW1lUGFzc0NvaW5WaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuXG4gICAgICAgIFxuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIumAmuWFs+aIkOWKn1wiLFxuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDpVcmxDb25zdC5nYW1lTGV2ZWxJbmRleCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6KGRhdGEpPT57XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwi6K6+572u5LiA5qyhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiICsgSlNPTi5zdHJpbmdpZnkoIGRhdGEubWFwQ29uZmlnICkgKVxuICAgICAgICAgICAgICAgLy8gdXRpbC5iZWhhdmlvclJld2FyZFZvTGlzdCA9IGRhdGEuYmVoYXZpb3JSZXdhcmRWb0xpc3Rcblx0XHRcdCAgIHV0aWwuZ2V0bm93bWFwZGF0YSgpO1xuICAgICAgICAgICAgICAgIHV0aWwubWFwQ29uZmlnID0gZGF0YS5tYXBDb25maWc7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKHN0cixlKXtcblxuICAgICAgICBsZXQgaXNWaWRlbzpib29sZWFuID0gZT09MTtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgbGV0IHN1Y2Nlc3NGbjpGdW5jdGlvbiAgPSAoKT0+e1xuXG4gICAgICAgICAgICBsZXQgY29pbjpudW1iZXIgPSB0aGlzLmNvaW4qKGlzVmlkZW8/MTA6MSk7XG5cbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbix7bm9kZTp0aGlzLm5vZGUsdmFsdWU6Y29pbixudW06MTB9KTtcbiAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4oY29pbik7XG4gICAgXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnRuKCk7XG4gICAgXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfU3RhcnQpO1xuXG4gICAgICAgICAgICBcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYoaXNWaWRlbyl7XG5cbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5HYW1lUGFzc1Jld2FyZCwoKT0+e1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLpgJrlhbPmiJDlip9cIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLlpJrlgI3pooblj5ZcIixcbiAgICAgICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzpcIua/gOWKseinhumikVwiXG4gICAgICAgICAgICB9KTsgXG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6YCa5YWz5oiQ5YqfXCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOlwi6aKG5Y+WXCIsXG4gICAgICAgICAgICB9KTsgXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXrVxuICAgICAqL1xuICAgIGNsb3NlQnRuKCl7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLpgJrlhbPmiJDlip9cIixcbiAgICAgICAgICAgIGNrX21vZHVsZTpcIueCueWHu+mihuWPllwiLFxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICBcbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHtcblxuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkdhbWVQYXNzQ29pblZpZXcpO1xuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==