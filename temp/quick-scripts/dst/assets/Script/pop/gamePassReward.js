
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gamePassReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3f4b6yz/01Ly6iMQ4VhhRIX', 'gamePassReward');
// Script/pop/gamePassReward.ts

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
var pageTs_1 = require("../common/pageTs");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gamePassReward = /** @class */ (function (_super) {
    __extends(gamePassReward, _super);
    function gamePassReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel = null;
        _this.propLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.titleArr = [];
        _this.pic = null;
        _this.picSpriteFrame = [];
        _this.feed_node = null;
        //类型
        _this.typeNum = 1;
        return _this;
        // update (dt) {}
    }
    gamePassReward.prototype.onLoad = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
    };
    /**
     *
     */
    gamePassReward.prototype.init = function () {
        var _this = this;
        this.initData = util_1.default.gameLevelPassRewardVoList[0];
        var text = null;
        var titleNum = 0;
        switch (Number(this.initData.rewardType)) {
            case 1:
                titleNum = 2;
                var data = tool_1.default.GetArrData("type", this.initData.rewardKey, util_1.default.propConfig);
                text = data.explain;
                this.loadAny("texture/prop/prop" + data.type, cc.SpriteFrame, function (res) {
                    _this.pic.spriteFrame = res;
                });
                this.xinxiliui = AdPosition_1.AdPosition.UnlcokPropView;
                TrackMgr_1.default.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "恭喜获得新道具"
                });
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "恭喜获得新道具",
                    ck_module: "收下",
                });
                break;
            case 3:
                text = "";
                titleNum = 1;
                this.pic.spriteFrame = this.picSpriteFrame[1];
                this.xinxiliui = AdPosition_1.AdPosition.UnlcokPlaceView;
                break;
            case 2:
                titleNum = 0;
                text = "+" + this.initData.rewardValue + "红包币";
                this.pic.spriteFrame = this.picSpriteFrame[0];
                this.xinxiliui = AdPosition_1.AdPosition.GamePassCoinView;
                break;
        }
        console.log(this.xinxiliui, 'this.xinxiliui');
        if (this.xinxiliui)
            AdController_1.default.loadInfoAd(this.xinxiliui, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        this.titleArr[titleNum].active = true;
        this.propLabel.node.active = this.rewardLabel.node.active = false;
        if (this.initData.rewardType && this.initData.rewardType == 1) {
            this.propLabel.string = text;
            this.propLabel.node.active = true;
        }
        else {
            this.rewardLabel.string = text;
            this.rewardLabel.node.active = true;
        }
    };
    gamePassReward.prototype.start = function () {
    };
    /**
     * 获取
     */
    gamePassReward.prototype.getBtn = function () {
        soundController_1.default.singleton.clickAudio();
        // cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:this.coin});
        // util.addTermCoin(this.coin);
        switch (Number(this.initData.rewardType)) {
            case 1:
                util_1.default.userData.prop[this.initData.rewardKey - 1].num += this.initData.rewardValue;
                break;
            case 3:
                util_1.default.unlockPlace();
                break;
            case 2:
                cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: this.node, value: this.initData.rewardValue, num: 10 });
                util_1.default.addTermCoin(this.initData.rewardValue);
                break;
        }
        util_1.default.gameLevelPassRewardVoList.splice(0, 1);
        this.closeBtn();
        if (util_1.default.gameLevelPassRewardVoList.length > 0) {
            this.showPage(pageTs_1.default.pageName.GamePassReward);
        }
        else {
            for (var i = 0; i < util_1.default.gameLevelPassRewardNextVoList.length; i++) {
                util_1.default.gameLevelPassRewardVoList.push(util_1.default.gameLevelPassRewardNextVoList[i]);
            }
            util_1.default.gameLevelPassRewardNextVoList = [];
            console.log(util_1.default.gameLevelPassRewardNextVoList, util_1.default.gameLevelPassRewardVoList, 'util.gameLevelPassRewardNextVoList');
            // this.showPage(pageTs.pageName.GameStart);
            cc.game.emit(NameTs_1.default.Game_Start);
        }
    };
    /**
     * 关闭
     */
    gamePassReward.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    gamePassReward.prototype.onEnable = function () {
    };
    gamePassReward.prototype.onDisable = function () {
        if (this.xinxiliui)
            AdController_1.default.hideInfoAd(this.xinxiliui);
        cc.game.emit(NameTs_1.default.Game_PropItem_Update);
    };
    __decorate([
        property({ type: cc.Label, displayName: "文字" })
    ], gamePassReward.prototype, "rewardLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "道具文字" })
    ], gamePassReward.prototype, "propLabel", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "标题" })
    ], gamePassReward.prototype, "titleArr", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "图片" })
    ], gamePassReward.prototype, "pic", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], displayName: "图片集合" })
    ], gamePassReward.prototype, "picSpriteFrame", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gamePassReward.prototype, "feed_node", void 0);
    gamePassReward = __decorate([
        ccclass
    ], gamePassReward);
    return gamePassReward;
}(baseTs_1.default));
exports.default = gamePassReward;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQYXNzUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxtREFBa0Q7QUFFbEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUV0QyxzRUFBaUU7QUFDakUsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFDaEMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFNO0lBQWxEO1FBQUEscUVBa0tDO1FBL0pXLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFbEMsNENBQTRDO1FBQzVDLGdDQUFnQztRQUd4QixjQUFRLEdBQWEsRUFBRSxDQUFDO1FBR3hCLFNBQUcsR0FBYSxJQUFJLENBQUM7UUFHckIsb0JBQWMsR0FBb0IsRUFBRSxDQUFDO1FBR3JDLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFFakMsSUFBSTtRQUNJLGFBQU8sR0FBVSxDQUFDLENBQUM7O1FBeUkzQixpQkFBaUI7SUFDckIsQ0FBQztJQXBJRywrQkFBTSxHQUFOO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO0lBR2pCLENBQUM7SUFDRDs7T0FFRztJQUNILDZCQUFJLEdBQUo7UUFBQSxpQkFzREM7UUFyREcsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEQsSUFBSSxJQUFJLEdBQVUsSUFBSSxDQUFDO1FBQ3ZCLElBQUksUUFBUSxHQUFVLENBQUMsQ0FBQztRQUl4QixRQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDO1lBRXBDLEtBQUssQ0FBQztnQkFDRixR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V0FBVyxDQUFDLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxDQUFDOzBEQUNSO0lBRzdDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDO3FEQUNWO0lBckJoQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBa0tsQztJQUFELHFCQUFDO0NBbEtELEFBa0tDLENBbEsyQyxnQkFBTSxHQWtLakQ7a0JBbEtvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGdhbWVOdW1lcmljYWwsIHByb3BUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vdXRpbC90b29sXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVBhc3NSZXdhcmQgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5paH5a2XXCJ9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi6YGT5YW35paH5a2XXCJ9KVxuICAgIHByaXZhdGUgcHJvcExhYmVsOmNjLkxhYmVsID0gbnVsbDtcbiAgICBcbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbY2MuTm9kZV0sZGlzcGxheU5hbWU6XCLmoIfpophcIn0pXG4gICAgcHJpdmF0ZSB0aXRsZUFycjpjYy5Ob2RlW10gPSBbXTtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU3ByaXRlLGRpc3BsYXlOYW1lOlwi5Zu+54mHXCJ9KVxuICAgIHByaXZhdGUgcGljOmNjLlNwcml0ZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOltjYy5TcHJpdGVGcmFtZV0sZGlzcGxheU5hbWU6XCLlm77niYfpm4blkIhcIn0pXG4gICAgcHJpdmF0ZSBwaWNTcHJpdGVGcmFtZTpjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLkv6Hmga/mtYFcIn0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICAvL+exu+Wei1xuICAgIHByaXZhdGUgdHlwZU51bTpudW1iZXIgPSAxO1xuICAgIC8vXG4gICAgcHJpdmF0ZSBpbml0RGF0YTphbnk7XG5cbiAgICBwcml2YXRlIHhpbnhpbGl1aTpudW1iZXI7XG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG5cbiAgICAgICAgXG4gICAgfSAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3RbMF07XG5cbiAgICAgICAgbGV0IHRleHQ6c3RyaW5nID0gbnVsbDtcbiAgICAgICAgbGV0IHRpdGxlTnVtOm51bWJlciA9IDA7XG5cbiAgICAgIFxuICAgICAgICBcbiAgICAgICAgc3dpdGNoKE51bWJlcih0aGlzLmluaXREYXRhLnJld2FyZFR5cGUpKXtcblxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRpdGxlTnVtID0gMjtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRvb2wuR2V0QXJyRGF0YShcInR5cGVcIix0aGlzLmluaXREYXRhLnJld2FyZEtleSx1dGlsLnByb3BDb25maWcpO1xuICAgICAgICAgICAgICAgIHRleHQgPSBkYXRhLmV4cGxhaW47XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQW55KFwidGV4dHVyZS9wcm9wL3Byb3BcIitkYXRhLnR5cGUsY2MuU3ByaXRlRnJhbWUsKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWMuc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy54aW54aWxpdWkgPSBBZFBvc2l0aW9uLlVubGNva1Byb3BWaWV3O1xuXG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzpcIuaBreWWnOiOt+W+l+aWsOmBk+WFt1wiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmga3llpzojrflvpfmlrDpgZPlhbdcIixcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOlwi5pS25LiLXCIsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aXRsZU51bSA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5waWMuc3ByaXRlRnJhbWUgPSAgdGhpcy5waWNTcHJpdGVGcmFtZVsxXTtcbiAgICAgICAgICAgICAgICB0aGlzLnhpbnhpbGl1aSA9IEFkUG9zaXRpb24uVW5sY29rUGxhY2VWaWV3O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRpdGxlTnVtID0gMDtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCIrXCIrdGhpcy5pbml0RGF0YS5yZXdhcmRWYWx1ZStcIue6ouWMheW4gVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucGljLnNwcml0ZUZyYW1lID0gIHRoaXMucGljU3ByaXRlRnJhbWVbMF07XG4gICAgICAgICAgICAgICAgdGhpcy54aW54aWxpdWkgPSBBZFBvc2l0aW9uLkdhbWVQYXNzQ29pblZpZXc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy54aW54aWxpdWksJ3RoaXMueGlueGlsaXVpJylcbiAgICAgICAgaWYodGhpcy54aW54aWxpdWkpQWRDb250cm9sbGVyLmxvYWRJbmZvQWQodGhpcy54aW54aWxpdWksIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXG5cbiAgICAgICAgdGhpcy50aXRsZUFyclt0aXRsZU51bV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wcm9wTGFiZWwubm9kZS5hY3RpdmUgPSB0aGlzLnJld2FyZExhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmluaXREYXRhLnJld2FyZFR5cGUmJnRoaXMuaW5pdERhdGEucmV3YXJkVHlwZT09MSl7XG4gICAgICAgICAgICB0aGlzLnByb3BMYWJlbC5zdHJpbmcgPSB0ZXh0O1xuICAgICAgICAgICAgdGhpcy5wcm9wTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMucmV3YXJkTGFiZWwuc3RyaW5nID0gdGV4dDtcbiAgICAgICAgICAgIHRoaXMucmV3YXJkTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oKXtcblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgLy8gY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLHtub2RlOnRoaXMubm9kZSx2YWx1ZTp0aGlzLmNvaW59KTtcbiAgICAgICAgLy8gdXRpbC5hZGRUZXJtQ29pbih0aGlzLmNvaW4pO1xuXG4gICAgICAgIHN3aXRjaChOdW1iZXIodGhpcy5pbml0RGF0YS5yZXdhcmRUeXBlKSl7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnByb3BbdGhpcy5pbml0RGF0YS5yZXdhcmRLZXktMV0ubnVtKz10aGlzLmluaXREYXRhLnJld2FyZFZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHV0aWwudW5sb2NrUGxhY2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4se25vZGU6dGhpcy5ub2RlLHZhbHVlOnRoaXMuaW5pdERhdGEucmV3YXJkVmFsdWUsbnVtOjEwfSk7XG4gICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLmluaXREYXRhLnJld2FyZFZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3Quc3BsaWNlKDAsMSk7XG5cbiAgICAgICAgdGhpcy5jbG9zZUJ0bigpO1xuXG4gICAgICAgIGlmKHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZFZvTGlzdC5sZW5ndGg+MCl7XG4gICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lUGFzc1Jld2FyZCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpPHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZE5leHRWb0xpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgdXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0LnB1c2godXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkTmV4dFZvTGlzdFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmROZXh0Vm9MaXN0ID0gW107XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZE5leHRWb0xpc3QsdXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0LCd1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmROZXh0Vm9MaXN0JylcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVTdGFydCk7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfU3RhcnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6ZetXG4gICAgICovXG4gICAgY2xvc2VCdG4oKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgIFxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBpZih0aGlzLnhpbnhpbGl1aSlBZENvbnRyb2xsZXIuaGlkZUluZm9BZCh0aGlzLnhpbnhpbGl1aSk7XG5cbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Byb3BJdGVtX1VwZGF0ZSk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==