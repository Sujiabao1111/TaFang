"use strict";
cc._RF.push(module, 'e052b4vbOdDKZM0iFd/wFFp', 'gameEarnPro');
// Script/pop/gameEarnPro.ts

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
var gameEarnPro = /** @class */ (function (_super) {
    __extends(gameEarnPro, _super);
    function gameEarnPro() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_redAddNum = null;
        _this.lable_goldNum = null;
        _this.feed_node = null;
        _this.multipleNode = null;
        _this.redAmountNum = 500;
        _this.coinItem = null;
        return _this;
    }
    gameEarnPro.prototype.start = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    gameEarnPro.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.randomRedPrizeView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
    };
    gameEarnPro.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.randomRedPrizeView);
    };
    gameEarnPro.prototype.init = function (data) {
        this.redAmountNum = data.coin;
        this.lable_goldNum.string = "+" + this.redAmountNum;
        this.lable_redAddNum.string = this.redAmountNum * 3 + "";
        this.coinItem = util_1.default.GlobalMap.get("earnProgress") || this.node;
        TrackMgr_1.default.luckybag_task({
            activity_state: "红包任务奖励弹窗",
        });
    };
    gameEarnPro.prototype.clickGet = function (e, src) {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        var isVideo = src == 1 ? true : false;
        var successFn = function () {
            var coin = _this.redAmountNum * (isVideo ? 3 : 1);
            util_1.default.getdataStr({
                url: UrlConst_1.UrlConst.earnProgressReceive,
                success: function (res) {
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.coinItem, value: coin, num: 10 });
                    if (isVideo) {
                        util_1.default.addTermCoin(_this.redAmountNum * 2);
                    }
                    cc.game.emit(NameTs_1.default.Game_EarnProgress_Updata);
                    AssistCtr_1.AssistCtr.showToastTip("获得" + coin + "红包币");
                    _this.closePage();
                },
                fail: function (res) {
                    AssistCtr_1.AssistCtr.showToastTip("网络出错~");
                    _this.closePage();
                }
            });
        };
        if (isVideo) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.earnProgressVideo, function () {
                successFn();
                TrackMgr_1.default.luckybag_task({
                    activity_state: "红包任务奖励弹窗",
                    button_name: "多倍领取"
                });
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }
        else {
            TrackMgr_1.default.luckybag_task({
                activity_state: "红包任务奖励弹窗",
                button_name: "普通领取"
            });
            successFn();
        }
    };
    __decorate([
        property(cc.Label)
    ], gameEarnPro.prototype, "lable_redAddNum", void 0);
    __decorate([
        property(cc.Label)
    ], gameEarnPro.prototype, "lable_goldNum", void 0);
    __decorate([
        property(cc.Node)
    ], gameEarnPro.prototype, "feed_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameEarnPro.prototype, "multipleNode", void 0);
    gameEarnPro = __decorate([
        ccclass
    ], gameEarnPro);
    return gameEarnPro;
}(baseTs_1.default));
exports.default = gameEarnPro;

cc._RF.pop();