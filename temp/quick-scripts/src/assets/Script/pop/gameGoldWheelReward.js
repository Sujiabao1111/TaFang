"use strict";
cc._RF.push(module, '883c9S8u11Jya3hq3d2UMMT', 'gameGoldWheelReward');
// Script/pop/gameGoldWheelReward.ts

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
/*
 * @Descripttion:
 * @version:
 * @Author: mies
 * @Date: 2021-02-24 17:41:47
 * @LastEditors: mies
 * @LastEditTime: 2021-02-26 14:50:55
 */
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var RewardController_1 = require("../controlelr/RewardController");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameGoldWheelReward = /** @class */ (function (_super) {
    __extends(gameGoldWheelReward, _super);
    function gameGoldWheelReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel = null;
        // @property({ type: cc.Node, displayName: "光" })
        // private light: cc.Node = null;
        _this.closeBtnNode = null;
        _this.rewardSprite = null;
        // @property({type:cc.Node,displayName:"视频icon"})
        // private videoIcon:cc.Node = null;
        _this.feed_node = null;
        //多少个金币
        _this.coin = null;
        _this.isClickGetPrize = false;
        return _this;
        // update (dt) {}
    }
    /**
     *
     * @param data 数据
     */
    gameGoldWheelReward.prototype.init = function (data, closeCall) {
        this.coin = data.reward.value;
        this.closeCall = closeCall;
        this.rewardLabel.string = "+" + this.coin;
        this.rewardSprite.spriteFrame = data.reward.type == 1 ? RewardController_1.default.instance.findPointBigSprite(2) : RewardController_1.default.instance.findPointBigSprite(1);
        this.initData = data;
        this.isClickGetPrize = true;
    };
    gameGoldWheelReward.prototype.start = function () {
    };
    /**
     * 获取
     */
    gameGoldWheelReward.prototype.getBtn = function (e, res) {
        this.getPrize();
    };
    /**
     * 关闭
     */
    gameGoldWheelReward.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.node.active = false;
        // this.SendPost();
    };
    gameGoldWheelReward.prototype.getPrize = function () {
        var _this = this;
        var self = this;
        if (self.isClickGetPrize) {
            self.isClickGetPrize = false;
            soundController_1.default.singleton.clickAudio();
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.goldWheel_checkIn,
                data: {
                    id: this.initData.id
                },
                onSuccess: function (res) {
                    if (!_this.isValid) {
                        return;
                    }
                    if (res.code === 0) {
                        TrackMgr_1.default.AppDialogClick_hcdg({
                            dialog_name_hcdg: "金币转盘获得奖励弹窗",
                            ck_module: "收下",
                            dialog_enter: "首页金币转盘",
                        });
                        // XMSDK.track({
                        //     eventName: SAConst.AppDialogClick,
                        //     props: {
                        //         dialog_name2: "金币转盘获得奖励弹窗",
                        //         ck_module: "收下",
                        //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
                        //     }
                        // });
                        self.startAnimation();
                        // if (self.initData.reward.type == updateType.hongbao) {
                        //     util.userData.coin += Number(self.initData.reward.value)
                        // } else if (self.initData.reward.type == updateType.product) {
                        //     util.userData.product += Number(self.initData.reward.value)
                        // }
                    }
                    else {
                        XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                        self.isClickGetPrize = true;
                    }
                },
                onFail: function (err) {
                    XMSDK_1.default.toast('网络出错~', 2.5, 1);
                    self.isClickGetPrize = true;
                }
            });
        }
    };
    gameGoldWheelReward.prototype.startAnimation = function () {
        var self = this;
        self.isClickGetPrize = true;
        self.closeCall && self.closeCall();
        self.node.active = false;
        if (this.initData.reward.type == 2) {
            // util.addTermCoin(this.coin)
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: this.rewardSprite.node, value: this.coin, num: 10, parent: cc.director.getScene().getChildByName('Canvas') });
            AssistCtr_1.AssistCtr.showToastTip("获取" + this.coin + "红包币");
        }
        else if (this.initData.reward.type == 1) {
            util_1.default.productTurret(this.coin);
            cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: this.rewardSprite.node, num: this.coin, parent: cc.director.getScene().getChildByName('Canvas') });
            AssistCtr_1.AssistCtr.showToastTip("获得" + this.coin + "个炮塔！");
        }
    };
    gameGoldWheelReward.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.goldWheelInfo, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.TaskRewardView]){
        //     util.preloadAd(AdPosition.TaskRewardView,true);
        // } 
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1, { scale: 1 }).to(1, { scale: 1.1 })
        // ).start();
    };
    gameGoldWheelReward.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.goldWheelInfo);
        // //预加载金币信息流
        // if(!util.adPreObj[AdPosition.TaskRewardView]&&util.getHeavenPool()>0){
        //     util.preloadAd(AdPosition.TaskRewardView,true);
        // }
    };
    __decorate([
        property({ type: cc.Label, displayName: "文字" })
    ], gameGoldWheelReward.prototype, "rewardLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "放弃领取" })
    ], gameGoldWheelReward.prototype, "closeBtnNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], gameGoldWheelReward.prototype, "rewardSprite", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameGoldWheelReward.prototype, "feed_node", void 0);
    gameGoldWheelReward = __decorate([
        ccclass
    ], gameGoldWheelReward);
    return gameGoldWheelReward;
}(baseTs_1.default));
exports.default = gameGoldWheelReward;

cc._RF.pop();