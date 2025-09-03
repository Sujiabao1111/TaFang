"use strict";
cc._RF.push(module, 'da298i6qL9IDYt2VWabVjo9', 'gameOffline');
// Script/pop/gameOffline.ts

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
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameOffline = /** @class */ (function (_super) {
    __extends(gameOffline, _super);
    function gameOffline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coinLabel = null;
        _this.coinAllLabel = null;
        _this.rmbLabel = null;
        _this.videoIcon = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.feed_node = null;
        _this.coin = null; //单倍
        _this.coin2 = 0; //多倍
        _this.isVideo = true;
        return _this;
        // update (dt) {}
    }
    gameOffline.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
    };
    /**
     * 初始化
     */
    gameOffline.prototype.init = function () {
        this.coin = util_1.default.userData.offlineIncome.reward;
        this.coin2 = util_1.default.userData.offlineIncome.multipleReward;
        this.coinLabel.string = "+" + this.coin2 + "红包币";
        this.coinAllLabel.string = String(util_1.default.userData.coin);
        this.rmbLabel.string = "= " + util_1.default.userData.coin / 10000 + "元";
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "离线金币弹窗"
        });
    };
    gameOffline.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.OfflineView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度   
        // if(util.adPreObj[AdPosition.OfflineView]){
        //    util.preloadAd(AdPosition.OfflineView,true);
        // } 
    };
    gameOffline.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.OfflineView);
    };
    /**获取 */
    gameOffline.prototype.getBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        var coin = this.isVideo ? this.coin2 : this.coin;
        var successFn = function () {
            util_1.default.post({
                url: _this.isVideo ? UrlConst_1.UrlConst.getOfflineDouble : UrlConst_1.UrlConst.getOfflineCommon,
                success: function (res) {
                    if (!_this.isValid) {
                        return;
                    }
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.node, value: coin, num: 10 });
                    AssistCtr_1.AssistCtr.showToastTip("获得" + coin + "红包币");
                    _this.closePage();
                    // this.showPage(pageTs.pageName.GameStart);
                    cc.game.emit(NameTs_1.default.Game_Start);
                },
                fail: function (res) {
                    AssistCtr_1.AssistCtr.showToastTip("领取失败！");
                    _this.closePage();
                }
            });
        };
        if (this.isVideo) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.Offline, function () {
                successFn();
                // util.preloadAd(AdPosition.Offline);
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "离线金币弹窗",
                ck_module: "翻倍领取",
                active_ad_hcdg: "激励视频"
            });
        }
        else {
            successFn();
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "离线金币弹窗",
                ck_module: "直接收下",
            });
        }
    };
    /**选择*/
    gameOffline.prototype.selectBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.isVideo = !this.isVideo;
        this.videoIcon.active = this.isVideo;
        this.coinLabel.string = "+" + (this.isVideo ? this.coin2 : this.coin) + "金币";
    };
    __decorate([
        property({ type: cc.Label, displayName: "获得金币" })
    ], gameOffline.prototype, "coinLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "自己一共多少金币" })
    ], gameOffline.prototype, "coinAllLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "兑换rmb" })
    ], gameOffline.prototype, "rmbLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "勾选" })
    ], gameOffline.prototype, "videoIcon", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameOffline.prototype, "feed_node", void 0);
    gameOffline = __decorate([
        ccclass
    ], gameOffline);
    return gameOffline;
}(baseTs_1.default));
exports.default = gameOffline;

cc._RF.pop();