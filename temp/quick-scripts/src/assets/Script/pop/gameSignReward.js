"use strict";
cc._RF.push(module, 'ef80fLK9xtIgawrlAUMMwE4', 'gameSignReward');
// Script/pop/gameSignReward.ts

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
exports.SignDayRedpack = void 0;
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
exports.SignDayRedpack = [0, 0, 1, 0, 0, 0, 1];
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PannelReward = /** @class */ (function (_super) {
    __extends(PannelReward, _super);
    function PannelReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewport = null;
        _this.passView = null;
        _this.doubleGoldNode = null;
        _this.lable_redAddNum = null;
        _this.lable_changNum = null;
        _this.lable_rewardListTipGold = null;
        _this.feed_node = null;
        _this.doubleBtnNode = null;
        _this.closeBtnNode = null;
        _this.getBtnNode = null;
        //---------------过度页------------------------
        _this.img_prize = null;
        _this.lable_prize = null;
        _this.img_goldIcon = null;
        _this.img_redIcon = null;
        _this.multipleNode = null;
        _this.lable_addGold2 = null;
        _this.data = null;
        _this.gaintype = null;
        _this.rewardList = null;
        _this.rewardNodeList = null;
        _this.tempNode = null;
        _this.isRedpack = null;
        _this.addGold = null;
        /**签到天数 */
        _this.signDays = 1;
        /**是否改变了 */
        _this.isChange = false;
        return _this;
    }
    PannelReward.prototype.onEnable = function () {
        var _this = this;
        // UIFunc.openUI(ActivityPannelName.PannelTempNode, (node, script) => {
        //     this.tempNode = node;
        // })        
        AssistCtr_1.AssistCtr.checkIsOpenInserAd(AdPosition_1.AdPosition.SignAwardInsert);
        this.scheduleOnce(function () {
            _this.closeBtnNode.active = true;
        }, faceTs_1.gameNumerical.closeTime);
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    PannelReward.prototype.onDisable = function () {
        // if (this.tempNode) {
        //     UIFunc.closeUI(ActivityPannelName.PannelTempNode);
        //     this.tempNode = null;
        // }
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.InfoSignRewardView);
        if (util_1.default.adPreObj[AdPosition_1.AdPosition.InfoSignRewardView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.InfoSignRewardView, true);
        }
        if (this.data && this.data["callBack"]) {
            this.data["callBack"]();
        }
        util_1.default.isOkSign = true;
        cc.game.emit(NameTs_1.default.Game_KingPaoTask_Update);
    };
    PannelReward.prototype.init = function (signAwardData) {
        var _this = this;
        this.isChange = false;
        var data = signAwardData.list;
        var index = signAwardData.currentDay;
        var gaintype = signAwardData.type;
        this.signDays = signAwardData.signDays;
        if (gaintype == 1) {
            this.viewport.active = true;
            this.passView.active = false;
            AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.InfoSignRewardView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度            
        }
        else {
            this.viewport.active = false;
            this.passView.active = true;
            AdController_1.default.loadAd(AdPosition_1.AdPosition.VideoSignDouble, function (res) {
                AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.InfoSignRewardView, 636, _this.feed_node); //636:feedNode信息流容器节点的宽度  
                if (util_1.default.adPreObj[AdPosition_1.AdPosition.VideoSignDouble]) {
                    util_1.default.preloadAd(AdPosition_1.AdPosition.VideoSignDouble);
                }
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
            setTimeout(function () {
                _this.viewport && (_this.viewport.active = true);
                _this.passView && (_this.passView.active = false);
            }, 10000);
        }
        this.data = signAwardData;
        this.gaintype = gaintype;
        this.viewport.opacity = 255;
        this.rewardList = data.rewardList;
        this.isRedpack = exports.SignDayRedpack[index];
        var item = this.rewardList[0];
        var change = util_1.default.userData.exchangeRate;
        var gold = 0;
        this.doubleBtnNode.active = this.gaintype == 1;
        this.getBtnNode.active = this.gaintype == 2;
        if (item) {
            gold = this.gaintype == 1 ? item.rewardValue : this.gaintype == 2 ? item.rewardPlusValue : item.rewardPlusValue - item.rewardValue;
            this.lable_redAddNum.string = "+" + gold + "红包币";
            this.lable_changNum.string = "\u7EA2\u5305" + (util_1.default.userData.coin + gold) + " \u2248 " + ((util_1.default.userData.coin + gold) / change).toFixed(2) + "\u5143";
            this.lable_rewardListTipGold.string = util_1.default.userData.coin + gold + " \u2248 " + ((util_1.default.userData.coin + gold) / change).toFixed(2) + "\u5143";
            this.lable_addGold2.string = gold * 2 + "";
        }
        if (!this.isRedpack) {
            this.img_prize.spriteFrame = this.img_goldIcon;
            this.lable_prize.string = "+" + gold + "红包币";
        }
        else {
            this.img_prize.spriteFrame = this.img_redIcon;
            this.lable_prize.string = "+" + gold / util_1.default.userData.exchangeRate + "\u5143";
        }
        this.addGold = gold;
        //GameInfo.gainGold(gold);
        if (this.gaintype == 2) {
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "普通签到成功弹窗"
            });
        }
    };
    PannelReward.prototype.finishAnimation = function () {
        this.closePage();
    };
    PannelReward.prototype.startAnimation = function () {
        var _this = this;
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u7B7E\u5230\u6210\u529F\u5F39\u7A97",
            ck_module: "收下"
        });
        soundController_1.default.singleton.clickAudio();
        var callback = function () {
            if (!_this.isRedpack) {
                for (var m in _this.rewardList) {
                    // AssistCtr.findPropSprite(this.rewardList[m].type, this.rewardList[m].keyId, (spriteFrame) => {
                    //     if (this.rewardNodeList[m]) {
                    //         let temp = this.tempNode.getComponent(PannelTempNode).getGoldNode();
                    //         AssistCtr.playAnimate(spriteFrame, this.rewardNodeList[m], temp, () => {
                    //             this.finishAnimation();
                    //         });
                    //     }
                    // }, () => {
                    //     cc.error("加载图片失败", this.rewardList[m].type, this.rewardList[m].keyId);
                    //     this.quit();
                    // })
                    //cc.game.emit(NameTs.Game_Effect_coin,{node:this.rewardNodeList[m], value:res.coin});
                }
                cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.doubleGoldNode, value: _this.addGold });
                _this.finishAnimation();
            }
            else {
                cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.doubleGoldNode, value: _this.addGold });
                _this.finishAnimation();
                // let temp = this.tempNode.getComponent(PannelTempNode).getGoldNode();
                // AssistCtr.playAnimate(this.doubleGoldNode.getComponent(cc.Sprite).spriteFrame, this.doubleGoldNode, temp, () => {
                //     this.finishAnimation();
                // });
            }
            AssistCtr_1.AssistCtr.loadAdInsertVideo(AdPosition_1.AdPosition.SignAwardInsert, function () { console.log("签到奖励插屏广告播放完成"); });
        };
        this.viewport.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(callback)));
    };
    /**双倍收下 */
    PannelReward.prototype.doubleBtn = function (e, res) {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        var num = Number(res);
        if (this.gaintype == 2 || this.isChange) {
            num = 1;
        }
        var url = num ? UrlConst_1.UrlConst.sign_videoGet : UrlConst_1.UrlConst.sign_commonGet;
        var day = "\u7B2C" + this.signDays + "\u5929";
        var coin = num ? this.rewardList[0].rewardPlusValue : this.rewardList[0].rewardValue;
        var successFn = function () {
            XMSDK_1.default.getdataStr({
                url: url,
                onSuccess: function (res) {
                    if (res.code === 0) {
                        _this.closePage();
                        AssistCtr_1.AssistCtr.loadAdInsertVideo(AdPosition_1.AdPosition.SignAwardInsert, function () { console.log("签到奖励插屏广告播放完成"); });
                        cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.doubleGoldNode, value: coin, num: 10 });
                    }
                    else {
                        TrackMgr_1.default.Signin_new({
                            get_state: false,
                            get_type: _this.isChange || _this.gaintype == 2 ? "双倍领取" : "单倍直接领取",
                            get_days: day,
                        });
                    }
                },
                onFail: function (err) {
                }
            });
            _this.closePage();
            //AssistCtr.loadAdInsertVideo(AdPosition.SignAwardInsert, ()=>{console.log("签到奖励插屏广告播放完成")});
            //cc.game.emit(NameTs.Game_Effect_coin, { node: this.doubleGoldNode, value: coin ,num:10});
        };
        if (num == 1 && this.gaintype == 1 && !this.isChange) {
            this.viewport && (this.viewport.active = false);
            this.passView && (this.passView.active = true);
            this.lable_prize.string = "+" + coin + "红包币";
            AdController_1.default.loadAd(AdPosition_1.AdPosition.VideoSignDouble, function (res) {
                // successFn();
                if (util_1.default.adPreObj[AdPosition_1.AdPosition.VideoSignDouble]) {
                    util_1.default.preloadAd(AdPosition_1.AdPosition.VideoSignDouble);
                }
                console.log("看视频");
                _this.doubleBtnNode && (_this.doubleBtnNode.active = false);
                _this.getBtnNode && (_this.getBtnNode.active = true);
                _this.lable_redAddNum.string = "+" + coin + "红包币";
                // this.gaintype = 2;
                _this.isChange = true;
                AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.InfoSignRewardView, 636, _this.feed_node); //636:feedNode信息流容器节点的宽度  
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
            AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.InfoSignRewardView);
            setTimeout(function () {
                _this.viewport && (_this.viewport.active = true);
                _this.passView && (_this.passView.active = false);
            }, 10000);
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "\u666E\u901A\u7B7E\u5230\u6210\u529F\u5F39\u7A97",
                ck_module: "翻倍领取",
                active_ad_hcdg: "激励视频"
            });
        }
        else {
            successFn();
            var text = this.isChange || this.gaintype == 2 ? "双倍领取" : "单倍直接领取";
            TrackMgr_1.default.Signin_new({
                get_state: true,
                get_type: text,
                get_days: day,
            });
            console.log("不看视频");
            if (!this.isChange && this.gaintype !== 2) {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "\u666E\u901A\u7B7E\u5230\u6210\u529F\u5F39\u7A97",
                    ck_module: "直接领取"
                });
            }
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "\u7B7E\u5230\u6210\u529F\u5F39\u7A97",
                ck_module: "收下"
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], PannelReward.prototype, "viewport", void 0);
    __decorate([
        property(cc.Node)
    ], PannelReward.prototype, "passView", void 0);
    __decorate([
        property(cc.Node)
    ], PannelReward.prototype, "doubleGoldNode", void 0);
    __decorate([
        property(cc.Label)
    ], PannelReward.prototype, "lable_redAddNum", void 0);
    __decorate([
        property(cc.Label)
    ], PannelReward.prototype, "lable_changNum", void 0);
    __decorate([
        property(cc.Label)
    ], PannelReward.prototype, "lable_rewardListTipGold", void 0);
    __decorate([
        property(cc.Node)
    ], PannelReward.prototype, "feed_node", void 0);
    __decorate([
        property(cc.Node)
    ], PannelReward.prototype, "doubleBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], PannelReward.prototype, "closeBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], PannelReward.prototype, "getBtnNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], PannelReward.prototype, "img_prize", void 0);
    __decorate([
        property(cc.Label)
    ], PannelReward.prototype, "lable_prize", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PannelReward.prototype, "img_goldIcon", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PannelReward.prototype, "img_redIcon", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], PannelReward.prototype, "multipleNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数金币" })
    ], PannelReward.prototype, "lable_addGold2", void 0);
    PannelReward = __decorate([
        ccclass
    ], PannelReward);
    return PannelReward;
}(baseTs_1.default));
exports.default = PannelReward;
;

cc._RF.pop();