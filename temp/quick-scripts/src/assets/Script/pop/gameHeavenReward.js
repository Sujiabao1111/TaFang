"use strict";
cc._RF.push(module, '5427cNbMs9KUoU7hTmzXNpm', 'gameHeavenReward');
// Script/pop/gameHeavenReward.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameHeavenReward = /** @class */ (function (_super) {
    __extends(gameHeavenReward, _super);
    function gameHeavenReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel = null;
        _this.multipleNode = null;
        _this.lable_addGold2 = null;
        _this.closeBtnNode = null;
        // @property({type:cc.Node,displayName:"视频icon"})
        // private videoIcon:cc.Node = null;
        _this.feed_node = null;
        _this.get_node = null;
        _this.get_node2 = null;
        //多少个金币
        _this.coin = null;
        //剩余次数
        _this.heavenNum = null;
        //是否需要看视频 
        _this.isVideo = false;
        _this.isClickGet = false; //是否点击了领取
        return _this;
        // update (dt) {}
    }
    gameHeavenReward.prototype.onLoad = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        var _this = this;
        this.scheduleOnce(function () {
            if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
                _this.closeBtnNode.active = true;
            }
            else {
                _this.get_node2.active = true;
            }
        }, faceTs_1.gameNumerical.closeTime);
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**
     *
     * @param data 数据
     */
    gameHeavenReward.prototype.init = function (data) {
        if (data && data.data) {
            this.initData = data.data;
            this.coin = this.initData.point;
            this.rewardLabel.string = "+" + this.coin + "红包币";
            this.lable_addGold2.string = this.coin * 10 + "";
            this.heavenItem = data.item || this.node;
            // this.isVideo = util.heavenClickNum==3;
            // if(this.isVideo){
            // }
            // this.videoIcon.active = this.isVideo;
            this.isVideo = data.isVideo ? true : false;
            this.get_node.active = !this.isVideo;
            this.closeBtnNode.getParent().active = this.isVideo;
        }
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoin]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoin);
        }
        TrackMgr_1.default.airborne_gold({
            activity_state: "金币奖励弹窗",
        });
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "空降金币"
        });
        if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "空投金币" + (this.isVideo ? "" : "不") + "需看视频弹窗（B用户）"
            });
        }
        this.item = data.item;
        this.no = data.no;
        util_1.default.heavenTouch = false;
        if (!this.initData.id || this.initData.id == "") {
            console.error("该空降金币没有id，给予消除");
            util_1.default.saveHeavenPool(this.no, null);
            cc.game.emit(NameTs_1.default.Game_Heaven_killed, this.item);
        }
    };
    gameHeavenReward.prototype.start = function () {
    };
    /**
     * 获取
     */
    gameHeavenReward.prototype.getBtn = function (e, res) {
        var _this = this;
        if (this.isClickGet) {
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(function () {
            _this.isClickGet = false;
        }, 2);
        var num = Number(res);
        soundController_1.default.singleton.clickAudio();
        var coin = this.coin * (num == 1 ? 10 : 1);
        var successFn = function () {
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.heavenItem, value: coin, num: 10 });
            util_1.default.addTermCoin(coin);
            _this.closePage();
            util_1.default.heavenClickNum++;
            util_1.default.saveHeavenPool(_this.no, null);
            cc.game.emit(NameTs_1.default.Game_Heaven_killed, _this.item);
            _this.SendPost();
        };
        if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "空投金币" + (num == 1 ? "" : "不") + "需看视频弹窗（B用户）"
            });
        }
        if (num == 1) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.HeavenCoin, function () {
                successFn();
                TrackMgr_1.default.airborne_gold({
                    activity_state: "点击「视频icon领取金币」按钮",
                });
                if (util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoin]) {
                    util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoin);
                }
                if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
                    util_1.default.existVideoCoinNum--;
                }
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降金币",
                ck_module: "翻倍领取",
                active_ad_hcdg: "激励视频"
            });
            if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "空投金币需看视频弹窗（B用户）",
                    ck_module: "领取",
                    active_ad_hcdg: "激励视频"
                });
            }
        }
        else {
            successFn();
            TrackMgr_1.default.airborne_gold({
                activity_state: "点击「领取金币」按钮",
            });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降金币",
                ck_module: "收下",
            });
            if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "空投金币不需看视频弹窗（B用户）",
                    ck_module: "直接领取",
                });
            }
        }
    };
    /**
     * 关闭
     */
    gameHeavenReward.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        TrackMgr_1.default.airborne_gold({
            activity_state: "点击「放弃奖励」按钮",
        });
        if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "空投金币需看视频弹窗（B用户）",
                ck_module: "关闭",
            });
        }
        // this.SendPost();
    };
    /**发送金币 */
    gameHeavenReward.prototype.SendPost = function () {
        if (this.initData) {
            util_1.default.getdataStr({
                url: UrlConst_1.UrlConst.heavenCoin_receive,
                data: { id: this.initData.id },
                success: function () {
                    console.log("领取成功," + UrlConst_1.UrlConst.heavenCoin_receive);
                },
                fail: function () {
                    console.log("失败了," + UrlConst_1.UrlConst.heavenCoin_receive);
                }
            });
        }
    };
    gameHeavenReward.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.HeavenCoinView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        if (util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoinView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoinView, true);
        }
    };
    gameHeavenReward.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.HeavenCoinView);
        //预加载金币信息流
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoinView] && util_1.default.getHeavenPool() > 0) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoinView, true);
        }
    };
    __decorate([
        property({ type: cc.Label, displayName: "文字" })
    ], gameHeavenReward.prototype, "rewardLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameHeavenReward.prototype, "multipleNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数金币" })
    ], gameHeavenReward.prototype, "lable_addGold2", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "放弃领取" })
    ], gameHeavenReward.prototype, "closeBtnNode", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameHeavenReward.prototype, "feed_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "直接领取B" })
    ], gameHeavenReward.prototype, "get_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "直接领取A" })
    ], gameHeavenReward.prototype, "get_node2", void 0);
    gameHeavenReward = __decorate([
        ccclass
    ], gameHeavenReward);
    return gameHeavenReward;
}(baseTs_1.default));
exports.default = gameHeavenReward;

cc._RF.pop();