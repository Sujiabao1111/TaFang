
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTaWduUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBaUQ7QUFDakQsMkNBQXNDO0FBQ3RDLCtDQUE4QztBQUM5QyxzRUFBaUU7QUFDakUscURBQWdEO0FBQ2hELHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBR25CLFFBQUEsY0FBYyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDN0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUF3VUM7UUF0VUcsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLHFCQUFlLEdBQWEsSUFBSSxDQUFDO1FBR2pDLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLDZCQUF1QixHQUFhLElBQUksQ0FBQztRQUd6QyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLDRDQUE0QztRQUU1QyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGtCQUFZLEdBQW1CLElBQUksQ0FBQztRQUdwQyxpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFFM0Isa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHNUIsb0JB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RUFBRSxDQUFDLFdBQVcsQ0FBQztxREFDVTtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQztzREFDTjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQzt3REFDTjtJQWhEdEIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXdVaEM7SUFBRCxtQkFBQztDQXhVRCxBQXdVQyxDQXhVeUMsZ0JBQU0sR0F3VS9DO2tCQXhVb0IsWUFBWTtBQXdVaEMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbmltcG9ydCBnYW1lU2lnbiwgeyBzaWduSXRlbURhdGEsIHNpZ25SZXdhcmREYXRhIH0gZnJvbSBcIi4vZ2FtZVNpZ25cIjtcblxuZXhwb3J0IGNvbnN0IFNpZ25EYXlSZWRwYWNrID0gWzAsIDAsIDEsIDAsIDAsIDAsIDFdXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFubmVsUmV3YXJkIGV4dGVuZHMgYmFzZVRzIHtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB2aWV3cG9ydDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwYXNzVmlldzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkb3VibGVHb2xkTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfcmVkQWRkTnVtOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfY2hhbmdOdW06IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9yZXdhcmRMaXN0VGlwR29sZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkb3VibGVCdG5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjbG9zZUJ0bk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZ2V0QnRuTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0t6L+H5bqm6aG1LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpbWdfcHJpemU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfcHJpemU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBpbWdfZ29sZEljb246IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBpbWdfcmVkSWNvbjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YCN5pWwXCJ9KVxuICAgIHByaXZhdGUgbXVsdGlwbGVOb2RlOmNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIuWAjeaVsOmHkeW4gVwifSlcbiAgICBwcml2YXRlIGxhYmxlX2FkZEdvbGQyOmNjLkxhYmVsID0gbnVsbDtcbiAgICBcblxuICAgIGRhdGEgPSBudWxsO1xuICAgIGdhaW50eXBlID0gbnVsbDtcbiAgICByZXdhcmRMaXN0OiBBcnJheTxzaWduUmV3YXJkRGF0YT4gPSBudWxsO1xuICAgIHJld2FyZE5vZGVMaXN0ID0gbnVsbDtcblxuXG4gICAgdGVtcE5vZGUgPSBudWxsO1xuICAgIGlzUmVkcGFjayA9IG51bGw7XG4gICAgYWRkR29sZCA9IG51bGw7ICAgXG4gICAgLyoq562+5Yiw5aSp5pWwICovXG4gICAgc2lnbkRheXM6bnVtYmVyID0gMTtcblxuICAgIC8qKuaYr+WQpuaUueWPmOS6hiAqL1xuICAgIGlzQ2hhbmdlOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICAvLyBVSUZ1bmMub3BlblVJKEFjdGl2aXR5UGFubmVsTmFtZS5QYW5uZWxUZW1wTm9kZSwgKG5vZGUsIHNjcmlwdCkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy50ZW1wTm9kZSA9IG5vZGU7XG4gICAgICAgIC8vIH0pICAgICAgICBcbiAgICAgICAgQXNzaXN0Q3RyLmNoZWNrSXNPcGVuSW5zZXJBZChBZFBvc2l0aW9uLlNpZ25Bd2FyZEluc2VydClcblxuICAgICAgICBcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcblxuICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bk5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB9LGdhbWVOdW1lcmljYWwuY2xvc2VUaW1lKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5tdWx0aXBsZU5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLHthbmdsZToxMH0pLnRvKC4yLHthbmdsZTowfSlcbiAgICAgICAgKS5zdGFydCgpO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMudGVtcE5vZGUpIHtcbiAgICAgICAgLy8gICAgIFVJRnVuYy5jbG9zZVVJKEFjdGl2aXR5UGFubmVsTmFtZS5QYW5uZWxUZW1wTm9kZSk7XG4gICAgICAgIC8vICAgICB0aGlzLnRlbXBOb2RlID0gbnVsbDtcbiAgICAgICAgLy8gfVxuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkluZm9TaWduUmV3YXJkVmlldyk7XG5cbiAgICAgICAgaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkluZm9TaWduUmV3YXJkVmlld10pe1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5JbmZvU2lnblJld2FyZFZpZXcsdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmRhdGEgJiYgdGhpcy5kYXRhW2BjYWxsQmFja2BdKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YVtgY2FsbEJhY2tgXSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbC5pc09rU2lnbiA9IHRydWU7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9LaW5nUGFvVGFza19VcGRhdGUpO1xuICAgIH1cblxuICAgIGluaXQoc2lnbkF3YXJkRGF0YSkge1xuICAgICAgICB0aGlzLmlzQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBkYXRhID0gc2lnbkF3YXJkRGF0YS5saXN0O1xuICAgICAgICBsZXQgaW5kZXggPSBzaWduQXdhcmREYXRhLmN1cnJlbnREYXk7XG4gICAgICAgIGxldCBnYWludHlwZSA9IHNpZ25Bd2FyZERhdGEudHlwZTtcbiAgICAgICAgdGhpcy5zaWduRGF5cyA9IHNpZ25Bd2FyZERhdGEuc2lnbkRheXM7XG4gICAgICAgIGlmIChnYWludHlwZSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBhc3NWaWV3LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5JbmZvU2lnblJld2FyZFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wYXNzVmlldy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlLCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5JbmZvU2lnblJld2FyZFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmICBcbiAgICAgICAgICAgICAgICBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlXSl7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld3BvcnQmJih0aGlzLnZpZXdwb3J0LmFjdGl2ZSA9IHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFzc1ZpZXcmJih0aGlzLnBhc3NWaWV3LmFjdGl2ZSA9IGZhbHNlKTsgXG4gICAgICAgICAgICB9LCAxMDAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGEgPSBzaWduQXdhcmREYXRhO1xuICAgICAgICB0aGlzLmdhaW50eXBlID0gZ2FpbnR5cGU7XG4gICAgICAgIHRoaXMudmlld3BvcnQub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgdGhpcy5yZXdhcmRMaXN0ID0gZGF0YS5yZXdhcmRMaXN0O1xuICAgICAgICB0aGlzLmlzUmVkcGFjayA9IFNpZ25EYXlSZWRwYWNrW2luZGV4XTtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnJld2FyZExpc3RbMF07XG4gICAgICAgIGxldCBjaGFuZ2UgPSB1dGlsLnVzZXJEYXRhLmV4Y2hhbmdlUmF0ZTtcbiAgICAgICAgbGV0IGdvbGQgPSAwO1xuXG4gICAgICAgIHRoaXMuZG91YmxlQnRuTm9kZS5hY3RpdmUgPSB0aGlzLmdhaW50eXBlPT0xO1xuXG4gICAgICAgIHRoaXMuZ2V0QnRuTm9kZS5hY3RpdmUgPSB0aGlzLmdhaW50eXBlPT0yO1xuXG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICBnb2xkID0gdGhpcy5nYWludHlwZSA9PSAxID8gaXRlbS5yZXdhcmRWYWx1ZSA6IHRoaXMuZ2FpbnR5cGUgPT0gMiA/IGl0ZW0ucmV3YXJkUGx1c1ZhbHVlIDogaXRlbS5yZXdhcmRQbHVzVmFsdWUgLSBpdGVtLnJld2FyZFZhbHVlXG4gICAgICAgICAgICB0aGlzLmxhYmxlX3JlZEFkZE51bS5zdHJpbmcgPSBcIitcIiArIGdvbGQrXCLnuqLljIXluIFcIjtcbiAgICAgICAgICAgIHRoaXMubGFibGVfY2hhbmdOdW0uc3RyaW5nID0gYOe6ouWMhSR7dXRpbC51c2VyRGF0YS5jb2luICsgZ29sZH0g4omIICR7KCh1dGlsLnVzZXJEYXRhLmNvaW4gKyBnb2xkKSAvIGNoYW5nZSkudG9GaXhlZCgyKX3lhYNgO1xuICAgICAgICAgICAgdGhpcy5sYWJsZV9yZXdhcmRMaXN0VGlwR29sZC5zdHJpbmcgPSBgJHt1dGlsLnVzZXJEYXRhLmNvaW4gKyBnb2xkfSDiiYggJHsoKHV0aWwudXNlckRhdGEuY29pbiArIGdvbGQpIC8gY2hhbmdlKS50b0ZpeGVkKDIpfeWFg2A7XG5cbiAgICAgICAgICAgIHRoaXMubGFibGVfYWRkR29sZDIuc3RyaW5nID0gZ29sZCoyK1wiXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaXNSZWRwYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmltZ19wcml6ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaW1nX2dvbGRJY29uO1xuICAgICAgICAgICAgdGhpcy5sYWJsZV9wcml6ZS5zdHJpbmcgPSBgKyR7Z29sZH1gK1wi57qi5YyF5biBXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmltZ19wcml6ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaW1nX3JlZEljb247XG4gICAgICAgICAgICB0aGlzLmxhYmxlX3ByaXplLnN0cmluZyA9IGArJHtnb2xkIC8gdXRpbC51c2VyRGF0YS5leGNoYW5nZVJhdGV95YWDYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkR29sZCA9IGdvbGQ7XG4gICAgICAgIC8vR2FtZUluZm8uZ2FpbkdvbGQoZ29sZCk7XG5cbiAgICAgICAgaWYodGhpcy5nYWludHlwZT09Mil7XG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6XCLmma7pgJrnrb7liLDmiJDlip/lvLnnqpdcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBcblxuICAgIGZpbmlzaEFuaW1hdGlvbigpIHsgICAgICAgIFxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgIH1cblxuICAgIHN0YXJ0QW5pbWF0aW9uKCkge1xuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg562+5Yiw5oiQ5Yqf5by556qXYCxcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLmlLbkuItcIlxuICAgICAgICB9KVxuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBsZXQgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNSZWRwYWNrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbSBpbiB0aGlzLnJld2FyZExpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzaXN0Q3RyLmZpbmRQcm9wU3ByaXRlKHRoaXMucmV3YXJkTGlzdFttXS50eXBlLCB0aGlzLnJld2FyZExpc3RbbV0ua2V5SWQsIChzcHJpdGVGcmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHRoaXMucmV3YXJkTm9kZUxpc3RbbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgdGVtcCA9IHRoaXMudGVtcE5vZGUuZ2V0Q29tcG9uZW50KFBhbm5lbFRlbXBOb2RlKS5nZXRHb2xkTm9kZSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIEFzc2lzdEN0ci5wbGF5QW5pbWF0ZShzcHJpdGVGcmFtZSwgdGhpcy5yZXdhcmROb2RlTGlzdFttXSwgdGVtcCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmZpbmlzaEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNjLmVycm9yKFwi5Yqg6L295Zu+54mH5aSx6LSlXCIsIHRoaXMucmV3YXJkTGlzdFttXS50eXBlLCB0aGlzLnJld2FyZExpc3RbbV0ua2V5SWQpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5xdWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgIC8vY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLHtub2RlOnRoaXMucmV3YXJkTm9kZUxpc3RbbV0sIHZhbHVlOnJlcy5jb2lufSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLmRvdWJsZUdvbGROb2RlLCB2YWx1ZTogdGhpcy5hZGRHb2xkIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5kb3VibGVHb2xkTm9kZSwgdmFsdWU6IHRoaXMuYWRkR29sZCB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaEFuaW1hdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgLy8gbGV0IHRlbXAgPSB0aGlzLnRlbXBOb2RlLmdldENvbXBvbmVudChQYW5uZWxUZW1wTm9kZSkuZ2V0R29sZE5vZGUoKTtcbiAgICAgICAgICAgICAgICAvLyBBc3Npc3RDdHIucGxheUFuaW1hdGUodGhpcy5kb3VibGVHb2xkTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSwgdGhpcy5kb3VibGVHb2xkTm9kZSwgdGVtcCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmZpbmlzaEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQXNzaXN0Q3RyLmxvYWRBZEluc2VydFZpZGVvKEFkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0LCAoKT0+e2NvbnNvbGUubG9nKFwi562+5Yiw5aWW5Yqx5o+S5bGP5bm/5ZGK5pKt5pS+5a6M5oiQXCIpfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWV3cG9ydC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZU91dCgwLjMpLCBjYy5jYWxsRnVuYyhjYWxsYmFjaykpKVxuICAgIH1cblxuXG4gICAgLyoq5Y+M5YCN5pS25LiLICovXG4gICAgZG91YmxlQnRuKGUscmVzKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICAgICAgbGV0IG51bSA9IE51bWJlcihyZXMpO1xuXG4gICAgICAgIGlmKHRoaXMuZ2FpbnR5cGU9PTJ8fHRoaXMuaXNDaGFuZ2Upe1xuICAgICAgICAgICAgbnVtID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB1cmw6c3RyaW5nID0gbnVtP1VybENvbnN0LnNpZ25fdmlkZW9HZXQ6VXJsQ29uc3Quc2lnbl9jb21tb25HZXQ7XG5cbiAgICAgICAgbGV0IGRheTpzdHJpbmcgPSBg56ysJHt0aGlzLnNpZ25EYXlzfeWkqWA7XG5cbiAgICAgICAgbGV0IGNvaW46bnVtYmVyID0gbnVtP3RoaXMucmV3YXJkTGlzdFswXS5yZXdhcmRQbHVzVmFsdWU6dGhpcy5yZXdhcmRMaXN0WzBdLnJld2FyZFZhbHVlO1xuXG4gICAgICAgIGxldCBzdWNjZXNzRm4gPSAoKT0+e1xuXHRcdFx0XG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5sb2FkQWRJbnNlcnRWaWRlbyhBZFBvc2l0aW9uLlNpZ25Bd2FyZEluc2VydCwgKCk9Pntjb25zb2xlLmxvZyhcIuetvuWIsOWlluWKseaPkuWxj+W5v+WRiuaSreaUvuWujOaIkFwiKX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMuZG91YmxlR29sZE5vZGUsIHZhbHVlOiBjb2luICxudW06MTB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLlNpZ25pbl9uZXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldF9zdGF0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0X3R5cGU6IHRoaXMuaXNDaGFuZ2V8fHRoaXMuZ2FpbnR5cGU9PTI/XCLlj4zlgI3pooblj5ZcIjpcIuWNleWAjeebtOaOpemihuWPllwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldF9kYXlzOiBkYXksICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG5cdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblx0XHRcdFx0XHRcdHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQXNzaXN0Q3RyLmxvYWRBZEluc2VydFZpZGVvKEFkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0LCAoKT0+e2NvbnNvbGUubG9nKFwi562+5Yiw5aWW5Yqx5o+S5bGP5bm/5ZGK5pKt5pS+5a6M5oiQXCIpfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLmRvdWJsZUdvbGROb2RlLCB2YWx1ZTogY29pbiAsbnVtOjEwfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG51bT09MSYmdGhpcy5nYWludHlwZT09MSYmIXRoaXMuaXNDaGFuZ2Upe1xuICAgICAgICAgICAgdGhpcy52aWV3cG9ydCYmKHRoaXMudmlld3BvcnQuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5wYXNzVmlldyYmKHRoaXMucGFzc1ZpZXcuYWN0aXZlID0gdHJ1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMubGFibGVfcHJpemUuc3RyaW5nID0gXCIrXCIgKyBjb2luK1wi57qi5YyF5biBXCI7XG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlLCAocmVzKSA9PiB7IFxuICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgICAgIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5WaWRlb1NpZ25Eb3VibGVdKXtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5WaWRlb1NpZ25Eb3VibGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueci+inhumikVwiKVxuICAgICAgICAgICAgICAgIHRoaXMuZG91YmxlQnRuTm9kZSYmKHRoaXMuZG91YmxlQnRuTm9kZS5hY3RpdmUgPSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCdG5Ob2RlJiYodGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSA9IHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfcmVkQWRkTnVtLnN0cmluZyA9IFwiK1wiICsgY29pbitcIue6ouWMheW4gVwiO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FpbnR5cGUgPSAyO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uSW5mb1NpZ25SZXdhcmRWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6piAgXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkluZm9TaWduUmV3YXJkVmlldyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdwb3J0JiYodGhpcy52aWV3cG9ydC5hY3RpdmUgPSB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NWaWV3JiYodGhpcy5wYXNzVmlldy5hY3RpdmUgPSBmYWxzZSk7IFxuICAgICAgICAgICAgfSwgMTAwMDApO1xuXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg5pmu6YCa562+5Yiw5oiQ5Yqf5by556qXYCxcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi57+75YCN6aKG5Y+WXCIsICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCIgICBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgICAgIGxldCB0ZXh0OnN0cmluZyA9IHRoaXMuaXNDaGFuZ2V8fHRoaXMuZ2FpbnR5cGU9PTI/XCLlj4zlgI3pooblj5ZcIjpcIuWNleWAjeebtOaOpemihuWPllwiO1xuICAgICAgICAgICAgVHJhY2tNZ3IuU2lnbmluX25ldyh7XG4gICAgICAgICAgICAgICAgZ2V0X3N0YXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGdldF90eXBlOiB0ZXh0LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGdldF9kYXlzOiBkYXksICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KSAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4jeeci+inhumikVwiKSAgICAgXG4gICAgICAgICAgICBpZighdGhpcy5pc0NoYW5nZSYmdGhpcy5nYWludHlwZSE9PTIpe1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg5pmu6YCa562+5Yiw5oiQ5Yqf5by556qXYCxcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuebtOaOpemihuWPllwiXG4gICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOetvuWIsOaIkOWKn+W8ueeql2AsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaUtuS4i1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuXG4gICAgfVxufTtcbiJdfQ==