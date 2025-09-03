"use strict";
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