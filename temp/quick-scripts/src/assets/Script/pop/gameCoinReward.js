"use strict";
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