"use strict";
cc._RF.push(module, '93c4b6GMHFEpb11hDGJsscE', 'gameRandomRedPrize');
// Script/pop/gameRandomRedPrize.ts

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
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameRandomRedPrize = /** @class */ (function (_super) {
    __extends(gameRandomRedPrize, _super);
    function gameRandomRedPrize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_prizeNum = null;
        _this.btn_closeNode = null;
        _this.lable_goldNum = null;
        _this.feed_node1 = null;
        _this.multipleNode = null;
        _this.redAmountNum = 200;
        _this.power = 3;
        _this.coinItem = null;
        return _this;
    }
    gameRandomRedPrize.prototype.start = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
        this.coinItem = util_1.default.GlobalMap.get("RandomRed") || this.node;
        console.log(this.coinItem.x, this.coinItem.y, 'asfasfasf12412=================');
    };
    gameRandomRedPrize.prototype.onEnable = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "福利红包弹窗展示"
        });
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.randomRedPrizeView, 636, this.feed_node1); //636:feedNode信息流容器节点的宽度
    };
    gameRandomRedPrize.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.randomRedPrizeView);
    };
    gameRandomRedPrize.prototype.init = function (data) {
        var _this = this;
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "福利红包弹窗展示"
        });
        this.lable_goldNum.string = "+" + this.redAmountNum;
        this.lable_prizeNum.string = "<outline color=#D25400 width=4><color=#FFFC00>" + this.redAmountNum * this.power + "</color>";
        this.btn_closeNode.active = false;
        this.scheduleOnce(function () {
            _this.btn_closeNode.active = true;
        }, 3);
    };
    gameRandomRedPrize.prototype.clickGet = function () {
        var _this = this;
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "福利红包弹窗点击",
            button_name_hcdg: "直接领取"
        });
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "领取成功",
            collection_completed: "直接领取成功"
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '福利红包弹窗展示',
            ck_module: '直接领取'
        });
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.btnRandomRedGet,
            onSuccess: function (res) {
                if (res.code === 0) {
                    if (!_this.isValid) {
                        return;
                    }
                    console.log("普通领取！");
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.coinItem, value: _this.redAmountNum, num: 10 });
                    util_1.default.addTermCoin(_this.redAmountNum);
                    AssistCtr_1.AssistCtr.showToastTip("获得" + (_this.redAmountNum) + "红包币");
                    cc.game.emit(NameTs_1.default.randomRedUpdate);
                    _this.closePage();
                }
                else {
                    AssistCtr_1.AssistCtr.showToastTip(res.message || '网络出错~');
                    cc.game.emit(NameTs_1.default.randomRedUpdate);
                    _this.closePage();
                }
            },
            onFail: function (res) {
                AssistCtr_1.AssistCtr.showToastTip("网络出错~");
                cc.game.emit(NameTs_1.default.randomRedUpdate);
                _this.closePage();
            }
        });
        cc.game.emit(NameTs_1.default.Game_Task_updata);
    };
    gameRandomRedPrize.prototype.clickDoubleGet = function () {
        var _this = this;
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "福利红包弹窗点击",
            button_name_hcdg: "领取600红包币"
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '福利红包弹窗展示',
            ck_module: '领取600红包币',
            active_ad_hcdg: "激励视频"
        });
        AdController_1.default.loadAd(AdPosition_1.AdPosition.randomRedPrize, function (res) {
            // TrackMgr.AppBuyProductDialog_hcdg({
            //     dialog_name_hcdg: "福利红包翻倍成功弹窗展示"
            // })
            TrackMgr_1.default.welfare_red_envelope({
                activity_state: "领取成功",
                collection_completed: "视频领取成功"
            });
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.btnRandomRedGet,
                onSuccess: function (res) {
                    if (res.code === 0) {
                        if (!_this.isValid) {
                            return;
                        }
                        console.log("翻倍领取！");
                        cc.game.emit(NameTs_1.default.randomRedUpdate);
                        cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.coinItem, value: _this.redAmountNum * _this.power, num: 10 });
                        util_1.default.addTermCoin(_this.redAmountNum * _this.power);
                        AssistCtr_1.AssistCtr.showToastTip("获得" + (_this.redAmountNum * _this.power) + "红包币");
                        _this.closePage();
                    }
                    else {
                        XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                        cc.game.emit(NameTs_1.default.randomRedUpdate);
                        _this.closePage();
                    }
                },
                onFail: function (res) {
                    AssistCtr_1.AssistCtr.showToastTip("网络出错~");
                    cc.game.emit(NameTs_1.default.randomRedUpdate);
                    _this.closePage();
                }
            });
        }, function () {
            cc.game.emit(NameTs_1.default.randomRedUpdate);
            _this.closePage();
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    gameRandomRedPrize.prototype.clickDoubleGet2 = function () {
        var _this = this;
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "领取成功",
            collection_completed: "视频领取成功"
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '福利红包翻倍成功弹窗展示',
            ck_module: '开心收下'
        });
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.btnRandomRedGet,
            onSuccess: function (res) {
                if (res.code === 0) {
                    if (!_this.isValid) {
                        return;
                    }
                    console.log("翻倍领取！");
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.coinItem, value: _this.redAmountNum * _this.power, num: 10 });
                    util_1.default.addTermCoin(_this.redAmountNum * _this.power);
                    AssistCtr_1.AssistCtr.showToastTip("获得" + (_this.redAmountNum * _this.power) + "红包币");
                }
                else {
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: function (res) {
            }
        });
        this.closePage();
        cc.game.emit(NameTs_1.default.Game_Task_updata);
    };
    __decorate([
        property(cc.RichText)
    ], gameRandomRedPrize.prototype, "lable_prizeNum", void 0);
    __decorate([
        property(cc.Node)
    ], gameRandomRedPrize.prototype, "btn_closeNode", void 0);
    __decorate([
        property(cc.Label)
    ], gameRandomRedPrize.prototype, "lable_goldNum", void 0);
    __decorate([
        property(cc.Node)
    ], gameRandomRedPrize.prototype, "feed_node1", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameRandomRedPrize.prototype, "multipleNode", void 0);
    gameRandomRedPrize = __decorate([
        ccclass
    ], gameRandomRedPrize);
    return gameRandomRedPrize;
}(baseTs_1.default));
exports.default = gameRandomRedPrize;

cc._RF.pop();