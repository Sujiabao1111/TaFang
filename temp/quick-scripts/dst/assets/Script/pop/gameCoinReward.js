
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameCoinReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '71d58qapo5C8qv2RoB6t32G', 'gameCoinReward');
// Script/pop/gameCoinReward.ts

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
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameCoinReward = /** @class */ (function (_super) {
    __extends(gameCoinReward, _super);
    function gameCoinReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel = null;
        _this.feed_node = null;
        //多少个金币
        _this.coin = null;
        return _this;
        // update (dt) {}
    }
    gameCoinReward.prototype.onLoad = function () {
    };
    /**
     *
     * @param data 数据
     */
    gameCoinReward.prototype.init = function (data) {
        this.coin = data.coin;
        this.rewardLabel.string = "+" + this.coin;
    };
    gameCoinReward.prototype.start = function () {
    };
    /**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             .,..........................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................
     * 获取
     */
    gameCoinReward.prototype.getBtn = function (e, res) {
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: e.target, value: this.coin, num: 10 });
        this.closePage();
    };
    gameCoinReward.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.CoinRewardView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        if (util_1.default.adPreObj[AdPosition_1.AdPosition.CoinRewardView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.CoinRewardView, true);
        }
    };
    gameCoinReward.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.CoinRewardView);
        //预加载金币信息流
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.CoinRewardView] && util_1.default.getHeavenPool() > 0) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.CoinRewardView, true);
        }
    };
    __decorate([
        property({ type: cc.Label, displayName: "文字" })
    ], gameCoinReward.prototype, "rewardLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameCoinReward.prototype, "feed_node", void 0);
    gameCoinReward = __decorate([
        ccclass
    ], gameCoinReward);
    return gameCoinReward;
}(baseTs_1.default));
exports.default = gameCoinReward;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVDb2luUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUNwQyxtREFBa0Q7QUFFbEQsMkNBQXNDO0FBSXRDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFFakQscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFNO0lBQWxEO1FBQUEscUVBK0RDO1FBNURXLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFFakMsT0FBTztRQUNDLFVBQUksR0FBVSxJQUFJLENBQUM7O1FBcUQzQixpQkFBaUI7SUFDckIsQ0FBQztJQWpERywrQkFBTSxHQUFOO0lBR0EsQ0FBQztJQUdEOzs7T0FHRztJQUNILDZCQUFJLEdBQUosVUFBSyxJQUFJO1FBQ0wsSUFBSSxDQUFDLElBQUksR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDO0lBRTdDLENBQUM7SUFFRCw4QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOztPQUVHO0lBQ0gsK0JBQU0sR0FBTixVQUFPLENBQUMsRUFBQyxHQUFHO1FBRVIseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsRUFBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJLHNCQUFZLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSx3QkFBd0I7UUFFaEcsSUFBRyxjQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsY0FBYyxDQUFDLEVBQUM7WUFDeEMsY0FBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBVSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFHRCxrQ0FBUyxHQUFUO1FBQ0ksc0JBQVksQ0FBQyxVQUFVLENBQUMsdUJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRCxVQUFVO1FBQ1YsSUFBRyxDQUFDLGNBQUksQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxjQUFjLENBQUMsSUFBRSxjQUFJLENBQUMsYUFBYSxFQUFFLEdBQUMsQ0FBQyxFQUFDO1lBQ2pFLGNBQUksQ0FBQyxTQUFTLENBQUMsdUJBQVUsQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEQ7SUFDTCxDQUFDO0lBekREO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDO3VEQUNQO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDO3FEQUNWO0lBTmhCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0ErRGxDO0lBQUQscUJBQUM7Q0EvREQsQUErREMsQ0EvRDJDLGdCQUFNLEdBK0RqRDtrQkEvRG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGdhbWVOdW1lcmljYWwgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4uL1BhZ2VNYW5hZ2VcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZUNvaW5SZXdhcmQgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5paH5a2XXCJ9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5L+h5oGv5rWBXCJ9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgLy/lpJrlsJHkuKrph5HluIFcbiAgICBwcml2YXRlIGNvaW46bnVtYmVyID0gbnVsbDtcbiAgICAvL1xuICAgIHByaXZhdGUgaW5pdERhdGE6YW55O1xuXG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja5cbiAgICAgKi9cbiAgICBpbml0KGRhdGEpe1xuICAgICAgICB0aGlzLmNvaW4gID0gZGF0YS5jb2luO1xuICAgICAgICB0aGlzLnJld2FyZExhYmVsLnN0cmluZyA9IFwiK1wiKyB0aGlzLmNvaW47XG4gICAgICAgIFxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8qKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4sLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKGUscmVzKXtcbiAgICAgICAgXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4se25vZGU6ZS50YXJnZXQsdmFsdWU6dGhpcy5jb2luLG51bToxMH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICB9XG4gICAgXG4gICAgb25FbmFibGUoKSB7ICAgXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uQ29pblJld2FyZFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXG4gICAgICAgIFxuICAgICAgICBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uQ29pblJld2FyZFZpZXddKXtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uQ29pblJld2FyZFZpZXcsdHJ1ZSk7XG4gICAgICAgIH0gXG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uQ29pblJld2FyZFZpZXcpO1xuICAgICAgICAvL+mihOWKoOi9vemHkeW4geS/oeaBr+a1gVxuICAgICAgICBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkNvaW5SZXdhcmRWaWV3XSYmdXRpbC5nZXRIZWF2ZW5Qb29sKCk+MCl7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkNvaW5SZXdhcmRWaWV3LHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==