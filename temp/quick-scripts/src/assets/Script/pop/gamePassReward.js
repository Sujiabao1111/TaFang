"use strict";
cc._RF.push(module, '19b942aBrdEc6tZ+2QO0APA', 'gamePassReward');
// Script/pop/gamePassReward.ts

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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var LanguageData_1 = require("../Language/LanguageData");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gamePassReward = /** @class */ (function (_super) {
    __extends(gamePassReward, _super);
    function gamePassReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel1 = null;
        _this.rewardLabel2 = null;
        _this.multipleNode = null;
        return _this;
    }
    gamePassReward.prototype.onLoad = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**
     *
     */
    gamePassReward.prototype.init = function () {
        var _this = this;
        //获取用户行为4
        this.coin = Tools_1.Tools.GetArrData("type", 4, util_1.default.behaviorRewardVoList).reward || 150;
        this.rewardLabel1.string = "+" + this.coin + LanguageData_1.t("main.金币");
        this.rewardLabel2.string = this.coin * 10 + "";
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
    /**
     * 获取
     */
    gamePassReward.prototype.getBtn = function (str, e) {
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
        successFn();
    };
    /**
     * 关闭
     */
    gamePassReward.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    __decorate([
        property({ type: cc.Label, displayName: "金币" })
    ], gamePassReward.prototype, "rewardLabel1", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "翻倍金币" })
    ], gamePassReward.prototype, "rewardLabel2", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gamePassReward.prototype, "multipleNode", void 0);
    gamePassReward = __decorate([
        ccclass
    ], gamePassReward);
    return gamePassReward;
}(baseTs_1.default));
exports.default = gamePassReward;

cc._RF.pop();