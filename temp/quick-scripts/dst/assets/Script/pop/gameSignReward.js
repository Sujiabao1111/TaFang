
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameSignReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ef80fLK9xtIgawrlAUMMwE4', 'gameSignReward');
// Script/pop/gameSignReward.ts

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
exports.SignDayRedpack = void 0;
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var LanguageData_1 = require("../Language/LanguageData");
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
            this.lable_redAddNum.string = "+" + gold + LanguageData_1.t('main.红包');
            this.lable_changNum.string = "\u7EA2\u5305" + (util_1.default.userData.coin + gold) + " \u2248 " + ((util_1.default.userData.coin + gold) / change).toFixed(2) + "\u5143";
            this.lable_rewardListTipGold.string = util_1.default.userData.coin + gold + " \u2248 " + ((util_1.default.userData.coin + gold) / change).toFixed(2) + "\u5143";
            this.lable_addGold2.string = gold * 2 + "";
        }
        if (!this.isRedpack) {
            this.img_prize.spriteFrame = this.img_goldIcon;
            this.lable_prize.string = "+" + gold + LanguageData_1.t('main.红包');
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
            this.lable_prize.string = "+" + coin + LanguageData_1.t('main.红包');
            AdController_1.default.loadAd(AdPosition_1.AdPosition.VideoSignDouble, function (res) {
                // successFn();
                if (util_1.default.adPreObj[AdPosition_1.AdPosition.VideoSignDouble]) {
                    util_1.default.preloadAd(AdPosition_1.AdPosition.VideoSignDouble);
                }
                console.log("看视频");
                _this.doubleBtnNode && (_this.doubleBtnNode.active = false);
                _this.getBtnNode && (_this.getBtnNode.active = true);
                _this.lable_redAddNum.string = "+" + coin + LanguageData_1.t('main.红包');
                // this.gaintype = 2;
                _this.isChange = true;
                AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.InfoSignRewardView, 636, _this.feed_node); //636:feedNode信息流容器节点的宽度  
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t("tips.reward_obtain_failed"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTaWduUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBaUQ7QUFDakQsMkNBQXNDO0FBQ3RDLHlEQUE2QztBQUM3QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUduQixRQUFBLGNBQWMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzdDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFNO0lBQWhEO1FBQUEscUVBdVVDO1FBclVHLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixvQkFBYyxHQUFZLElBQUksQ0FBQztRQUcvQixxQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyw2QkFBdUIsR0FBYSxJQUFJLENBQUM7UUFHekMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQiw0Q0FBNEM7UUFFNUMsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFtQixJQUFJLENBQUM7UUFHcEMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBRTNCLGtCQUFZLEdBQVksSUFBSSxD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LENBQUM7c0RBQ1c7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztxREFDVTtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztzREFDVjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQzt3REFDVjtJQWhEdkIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXVVaEM7SUFBRCxtQkFBQztDQXZVRCxBQXVVQyxDQXZVeUMsZ0JBQU0sR0F1VS9DO2tCQXZVb0IsWUFBWTtBQXVVaEMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5pbXBvcnQgZ2FtZVNpZ24sIHsgc2lnbkl0ZW1EYXRhLCBzaWduUmV3YXJkRGF0YSB9IGZyb20gXCIuL2dhbWVTaWduXCI7XG5cbmV4cG9ydCBjb25zdCBTaWduRGF5UmVkcGFjayA9IFswLCAwLCAxLCAwLCAwLCAwLCAxXVxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbm5lbFJld2FyZCBleHRlbmRzIGJhc2VUcyB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdmlld3BvcnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcGFzc1ZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZG91YmxlR29sZE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmxlX3JlZEFkZE51bTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmxlX2NoYW5nTnVtOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfcmV3YXJkTGlzdFRpcEdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkb3VibGVCdG5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNsb3NlQnRuTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBnZXRCdG5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS3ov4fluqbpobUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGltZ19wcml6ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9wcml6ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIGltZ19nb2xkSWNvbjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIGltZ19yZWRJY29uOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5YCN5pWwXCIgfSlcbiAgICBwcml2YXRlIG11bHRpcGxlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5YCN5pWw6YeR5biBXCIgfSlcbiAgICBwcml2YXRlIGxhYmxlX2FkZEdvbGQyOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIGRhdGEgPSBudWxsO1xuICAgIGdhaW50eXBlID0gbnVsbDtcbiAgICByZXdhcmRMaXN0OiBBcnJheTxzaWduUmV3YXJkRGF0YT4gPSBudWxsO1xuICAgIHJld2FyZE5vZGVMaXN0ID0gbnVsbDtcblxuXG4gICAgdGVtcE5vZGUgPSBudWxsO1xuICAgIGlzUmVkcGFjayA9IG51bGw7XG4gICAgYWRkR29sZCA9IG51bGw7XG4gICAgLyoq562+5Yiw5aSp5pWwICovXG4gICAgc2lnbkRheXM6IG51bWJlciA9IDE7XG5cbiAgICAvKirmmK/lkKbmlLnlj5jkuoYgKi9cbiAgICBpc0NoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIC8vIFVJRnVuYy5vcGVuVUkoQWN0aXZpdHlQYW5uZWxOYW1lLlBhbm5lbFRlbXBOb2RlLCAobm9kZSwgc2NyaXB0KSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLnRlbXBOb2RlID0gbm9kZTtcbiAgICAgICAgLy8gfSkgICAgICAgIFxuICAgICAgICBBc3Npc3RDdHIuY2hlY2tJc09wZW5JbnNlckFkKEFkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0KVxuXG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIH0sIGdhbWVOdW1lcmljYWwuY2xvc2VUaW1lKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5tdWx0aXBsZU5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLCB7IGFuZ2xlOiAxMCB9KS50byguMiwgeyBhbmdsZTogMCB9KVxuICAgICAgICApLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICAvLyBpZiAodGhpcy50ZW1wTm9kZSkge1xuICAgICAgICAvLyAgICAgVUlGdW5jLmNsb3NlVUkoQWN0aXZpdHlQYW5uZWxOYW1lLlBhbm5lbFRlbXBOb2RlKTtcbiAgICAgICAgLy8gICAgIHRoaXMudGVtcE5vZGUgPSBudWxsO1xuICAgICAgICAvLyB9XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uSW5mb1NpZ25SZXdhcmRWaWV3KTtcblxuICAgICAgICBpZiAodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkluZm9TaWduUmV3YXJkVmlld10pIHtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uSW5mb1NpZ25SZXdhcmRWaWV3LCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhW2BjYWxsQmFja2BdKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFbYGNhbGxCYWNrYF0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWwuaXNPa1NpZ24gPSB0cnVlO1xuICAgIH1cblxuICAgIGluaXQoc2lnbkF3YXJkRGF0YSkge1xuICAgICAgICB0aGlzLmlzQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBkYXRhID0gc2lnbkF3YXJkRGF0YS5saXN0O1xuICAgICAgICBsZXQgaW5kZXggPSBzaWduQXdhcmREYXRhLmN1cnJlbnREYXk7XG4gICAgICAgIGxldCBnYWludHlwZSA9IHNpZ25Bd2FyZERhdGEudHlwZTtcbiAgICAgICAgdGhpcy5zaWduRGF5cyA9IHNpZ25Bd2FyZERhdGEuc2lnbkRheXM7XG4gICAgICAgIGlmIChnYWludHlwZSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBhc3NWaWV3LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5JbmZvU2lnblJld2FyZFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wYXNzVmlldy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlLCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5JbmZvU2lnblJld2FyZFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmICBcbiAgICAgICAgICAgICAgICBpZiAodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlZpZGVvU2lnbkRvdWJsZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5WaWRlb1NpZ25Eb3VibGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3cG9ydCAmJiAodGhpcy52aWV3cG9ydC5hY3RpdmUgPSB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NWaWV3ICYmICh0aGlzLnBhc3NWaWV3LmFjdGl2ZSA9IGZhbHNlKTtcbiAgICAgICAgICAgIH0sIDEwMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YSA9IHNpZ25Bd2FyZERhdGE7XG4gICAgICAgIHRoaXMuZ2FpbnR5cGUgPSBnYWludHlwZTtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB0aGlzLnJld2FyZExpc3QgPSBkYXRhLnJld2FyZExpc3Q7XG4gICAgICAgIHRoaXMuaXNSZWRwYWNrID0gU2lnbkRheVJlZHBhY2tbaW5kZXhdO1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucmV3YXJkTGlzdFswXTtcbiAgICAgICAgbGV0IGNoYW5nZSA9IHV0aWwudXNlckRhdGEuZXhjaGFuZ2VSYXRlO1xuICAgICAgICBsZXQgZ29sZCA9IDA7XG5cbiAgICAgICAgdGhpcy5kb3VibGVCdG5Ob2RlLmFjdGl2ZSA9IHRoaXMuZ2FpbnR5cGUgPT0gMTtcblxuICAgICAgICB0aGlzLmdldEJ0bk5vZGUuYWN0aXZlID0gdGhpcy5nYWludHlwZSA9PSAyO1xuXG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICBnb2xkID0gdGhpcy5nYWludHlwZSA9PSAxID8gaXRlbS5yZXdhcmRWYWx1ZSA6IHRoaXMuZ2FpbnR5cGUgPT0gMiA/IGl0ZW0ucmV3YXJkUGx1c1ZhbHVlIDogaXRlbS5yZXdhcmRQbHVzVmFsdWUgLSBpdGVtLnJld2FyZFZhbHVlXG4gICAgICAgICAgICB0aGlzLmxhYmxlX3JlZEFkZE51bS5zdHJpbmcgPSBcIitcIiArIGdvbGQgKyB0KCdtYWluLue6ouWMhScpO1xuICAgICAgICAgICAgdGhpcy5sYWJsZV9jaGFuZ051bS5zdHJpbmcgPSBg57qi5YyFJHt1dGlsLnVzZXJEYXRhLmNvaW4gKyBnb2xkfSDiiYggJHsoKHV0aWwudXNlckRhdGEuY29pbiArIGdvbGQpIC8gY2hhbmdlKS50b0ZpeGVkKDIpfeWFg2A7XG4gICAgICAgICAgICB0aGlzLmxhYmxlX3Jld2FyZExpc3RUaXBHb2xkLnN0cmluZyA9IGAke3V0aWwudXNlckRhdGEuY29pbiArIGdvbGR9IOKJiCAkeygodXRpbC51c2VyRGF0YS5jb2luICsgZ29sZCkgLyBjaGFuZ2UpLnRvRml4ZWQoMil95YWDYDtcblxuICAgICAgICAgICAgdGhpcy5sYWJsZV9hZGRHb2xkMi5zdHJpbmcgPSBnb2xkICogMiArIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaXNSZWRwYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmltZ19wcml6ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaW1nX2dvbGRJY29uO1xuICAgICAgICAgICAgdGhpcy5sYWJsZV9wcml6ZS5zdHJpbmcgPSBgKyR7Z29sZH1gICsgdCgnbWFpbi7nuqLljIUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW1nX3ByaXplLnNwcml0ZUZyYW1lID0gdGhpcy5pbWdfcmVkSWNvbjtcbiAgICAgICAgICAgIHRoaXMubGFibGVfcHJpemUuc3RyaW5nID0gYCske2dvbGQgLyB1dGlsLnVzZXJEYXRhLmV4Y2hhbmdlUmF0ZX3lhYNgO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRHb2xkID0gZ29sZDtcbiAgICAgICAgLy9HYW1lSW5mby5nYWluR29sZChnb2xkKTtcblxuICAgICAgICBpZiAodGhpcy5nYWludHlwZSA9PSAyKSB7XG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5pmu6YCa562+5Yiw5oiQ5Yqf5by556qXXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbiAgICBmaW5pc2hBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgfVxuXG4gICAgc3RhcnRBbmltYXRpb24oKSB7XG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOetvuWIsOaIkOWKn+W8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5pS25LiLXCJcbiAgICAgICAgfSlcblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgbGV0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzUmVkcGFjaykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG0gaW4gdGhpcy5yZXdhcmRMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFzc2lzdEN0ci5maW5kUHJvcFNwcml0ZSh0aGlzLnJld2FyZExpc3RbbV0udHlwZSwgdGhpcy5yZXdhcmRMaXN0W21dLmtleUlkLCAoc3ByaXRlRnJhbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLnJld2FyZE5vZGVMaXN0W21dKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHRlbXAgPSB0aGlzLnRlbXBOb2RlLmdldENvbXBvbmVudChQYW5uZWxUZW1wTm9kZSkuZ2V0R29sZE5vZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBBc3Npc3RDdHIucGxheUFuaW1hdGUoc3ByaXRlRnJhbWUsIHRoaXMucmV3YXJkTm9kZUxpc3RbbV0sIHRlbXAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5maW5pc2hBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjYy5lcnJvcihcIuWKoOi9veWbvueJh+Wksei0pVwiLCB0aGlzLnJld2FyZExpc3RbbV0udHlwZSwgdGhpcy5yZXdhcmRMaXN0W21dLmtleUlkKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMucXVpdCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICAvL2NjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbix7bm9kZTp0aGlzLnJld2FyZE5vZGVMaXN0W21dLCB2YWx1ZTpyZXMuY29pbn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5kb3VibGVHb2xkTm9kZSwgdmFsdWU6IHRoaXMuYWRkR29sZCB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMuZG91YmxlR29sZE5vZGUsIHZhbHVlOiB0aGlzLmFkZEdvbGQgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hBbmltYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIC8vIGxldCB0ZW1wID0gdGhpcy50ZW1wTm9kZS5nZXRDb21wb25lbnQoUGFubmVsVGVtcE5vZGUpLmdldEdvbGROb2RlKCk7XG4gICAgICAgICAgICAgICAgLy8gQXNzaXN0Q3RyLnBsYXlBbmltYXRlKHRoaXMuZG91YmxlR29sZE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUsIHRoaXMuZG91YmxlR29sZE5vZGUsIHRlbXAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5maW5pc2hBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFzc2lzdEN0ci5sb2FkQWRJbnNlcnRWaWRlbyhBZFBvc2l0aW9uLlNpZ25Bd2FyZEluc2VydCwgKCkgPT4geyBjb25zb2xlLmxvZyhcIuetvuWIsOWlluWKseaPkuWxj+W5v+WRiuaSreaUvuWujOaIkFwiKSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZXdwb3J0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuMyksIGNjLmNhbGxGdW5jKGNhbGxiYWNrKSkpXG4gICAgfVxuXG5cbiAgICAvKirlj4zlgI3mlLbkuIsgKi9cbiAgICBkb3VibGVCdG4oZSwgcmVzKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG5cblxuXG4gICAgICAgIGxldCBudW0gPSBOdW1iZXIocmVzKTtcblxuICAgICAgICBpZiAodGhpcy5nYWludHlwZSA9PSAyIHx8IHRoaXMuaXNDaGFuZ2UpIHtcbiAgICAgICAgICAgIG51bSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBudW0gPyBVcmxDb25zdC5zaWduX3ZpZGVvR2V0IDogVXJsQ29uc3Quc2lnbl9jb21tb25HZXQ7XG5cbiAgICAgICAgbGV0IGRheTogc3RyaW5nID0gYOesrCR7dGhpcy5zaWduRGF5c33lpKlgO1xuXG4gICAgICAgIGxldCBjb2luOiBudW1iZXIgPSBudW0gPyB0aGlzLnJld2FyZExpc3RbMF0ucmV3YXJkUGx1c1ZhbHVlIDogdGhpcy5yZXdhcmRMaXN0WzBdLnJld2FyZFZhbHVlO1xuXG4gICAgICAgIGxldCBzdWNjZXNzRm4gPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLmxvYWRBZEluc2VydFZpZGVvKEFkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0LCAoKSA9PiB7IGNvbnNvbGUubG9nKFwi562+5Yiw5aWW5Yqx5o+S5bGP5bm/5ZGK5pKt5pS+5a6M5oiQXCIpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMuZG91YmxlR29sZE5vZGUsIHZhbHVlOiBjb2luLCBudW06IDEwIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuU2lnbmluX25ldyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0X3N0YXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRfdHlwZTogdGhpcy5pc0NoYW5nZSB8fCB0aGlzLmdhaW50eXBlID09IDIgPyBcIuWPjOWAjemihuWPllwiIDogXCLljZXlgI3nm7TmjqXpooblj5ZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRfZGF5czogZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgICAgIC8vQXNzaXN0Q3RyLmxvYWRBZEluc2VydFZpZGVvKEFkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0LCAoKT0+e2NvbnNvbGUubG9nKFwi562+5Yiw5aWW5Yqx5o+S5bGP5bm/5ZGK5pKt5pS+5a6M5oiQXCIpfSk7XG4gICAgICAgICAgICAvL2NjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLmRvdWJsZUdvbGROb2RlLCB2YWx1ZTogY29pbiAsbnVtOjEwfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW0gPT0gMSAmJiB0aGlzLmdhaW50eXBlID09IDEgJiYgIXRoaXMuaXNDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMudmlld3BvcnQgJiYgKHRoaXMudmlld3BvcnQuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5wYXNzVmlldyAmJiAodGhpcy5wYXNzVmlldy5hY3RpdmUgPSB0cnVlKTtcblxuICAgICAgICAgICAgdGhpcy5sYWJsZV9wcml6ZS5zdHJpbmcgPSBcIitcIiArIGNvaW4gKyB0KCdtYWluLue6ouWMhScpO1xuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLlZpZGVvU2lnbkRvdWJsZSwgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgICAgIGlmICh1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlXSkge1xuICAgICAgICAgICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlZpZGVvU2lnbkRvdWJsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55yL6KeG6aKRXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5kb3VibGVCdG5Ob2RlICYmICh0aGlzLmRvdWJsZUJ0bk5vZGUuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QnRuTm9kZSAmJiAodGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSA9IHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfcmVkQWRkTnVtLnN0cmluZyA9IFwiK1wiICsgY29pbiArIHQoJ21haW4u57qi5YyFJyk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYWludHlwZSA9IDI7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5JbmZvU2lnblJld2FyZFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmICBcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHQoXCJ0aXBzLnJld2FyZF9vYnRhaW5fZmFpbGVkXCIpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkluZm9TaWduUmV3YXJkVmlldyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdwb3J0ICYmICh0aGlzLnZpZXdwb3J0LmFjdGl2ZSA9IHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFzc1ZpZXcgJiYgKHRoaXMucGFzc1ZpZXcuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICAgICAgfSwgMTAwMDApO1xuXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg5pmu6YCa562+5Yiw5oiQ5Yqf5by556qXYCxcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi57+75YCN6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6IFwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgbGV0IHRleHQ6IHN0cmluZyA9IHRoaXMuaXNDaGFuZ2UgfHwgdGhpcy5nYWludHlwZSA9PSAyID8gXCLlj4zlgI3pooblj5ZcIiA6IFwi5Y2V5YCN55u05o6l6aKG5Y+WXCI7XG4gICAgICAgICAgICBUcmFja01nci5TaWduaW5fbmV3KHtcbiAgICAgICAgICAgICAgICBnZXRfc3RhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZ2V0X3R5cGU6IHRleHQsXG4gICAgICAgICAgICAgICAgZ2V0X2RheXM6IGRheSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4jeeci+inhumikVwiKVxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ2hhbmdlICYmIHRoaXMuZ2FpbnR5cGUgIT09IDIpIHtcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOaZrumAmuetvuWIsOaIkOWKn+W8ueeql2AsXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLnm7TmjqXpooblj5ZcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg562+5Yiw5oiQ5Yqf5by556qXYCxcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5pS25LiLXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuXG4gICAgfVxufTtcbiJdfQ==