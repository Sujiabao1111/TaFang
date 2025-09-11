
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
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var LanguageData_1 = require("../Language/LanguageData");
var UrlConst_1 = require("../server/UrlConst");
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
        // UIFunc.openUI(ActivityPannelName.PannelTempNode, (node, script) => {
        //     this.tempNode = node;
        // })        
        var _this = this;
        this.scheduleOnce(function () {
            _this.closeBtnNode.active = true;
        }, faceTs_1.gameNumerical.closeTime);
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    PannelReward.prototype.onDisable = function () {
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
        }
        else {
            this.viewport.active = false;
            this.passView.active = true;
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
        };
        if (num == 1 && this.gaintype == 1 && !this.isChange) {
            this.viewport && (this.viewport.active = false);
            this.passView && (this.passView.active = true);
            this.lable_prize.string = "+" + coin + LanguageData_1.t('main.红包');
            // AdController.loadAd(AdPosition.VideoSignDouble, (res) => {
            // successFn();
            console.log("看视频");
            this.doubleBtnNode && (this.doubleBtnNode.active = false);
            this.getBtnNode && (this.getBtnNode.active = true);
            this.lable_redAddNum.string = "+" + coin + LanguageData_1.t('main.红包');
            // this.gaintype = 2;
            this.isChange = true; //636:feedNode信息流容器节点的宽度  
            // }, () => {
            //     AssistCtr.showToastTip(t("tips.reward_obtain_failed"));
            // });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTaWduUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBb0M7QUFFcEMsMkNBQWlEO0FBQ2pELDJDQUFzQztBQUN0Qyx5REFBNkM7QUFDN0MsK0NBQThDO0FBRTlDLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUduQixRQUFBLGNBQWMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzdDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFNO0lBQWhEO1FBQUEscUVBOFNDO1FBNVNHLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixvQkFBYyxHQUFZLElBQUksQ0FBQztRQUcvQixxQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyw2QkFBdUIsR0FBYSxJQUFJLENBQUM7UUFHekMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQiw0Q0FBNEM7UUFFNUMsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFtQixJQUFJLENBQUM7UUFHcEMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBRTNCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR3hDLFVB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O1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpRUFDc0I7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUztJQUszQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztzREFDVztJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3FEQUNVO0lBRW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO3NEQUNWO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO3dEQUNWO0lBaER2QixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBOFNoQztJQUFELG1CQUFDO0NBOVNELEFBOFNDLENBOVN5QyxnQkFBTSxHQThTL0M7a0JBOVNvQixZQUFZO0FBOFNoQyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBnYW1lTnVtZXJpY2FsIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbmltcG9ydCBnYW1lU2lnbiwgeyBzaWduSXRlbURhdGEsIHNpZ25SZXdhcmREYXRhIH0gZnJvbSBcIi4vZ2FtZVNpZ25cIjtcblxuZXhwb3J0IGNvbnN0IFNpZ25EYXlSZWRwYWNrID0gWzAsIDAsIDEsIDAsIDAsIDAsIDFdXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFubmVsUmV3YXJkIGV4dGVuZHMgYmFzZVRzIHtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB2aWV3cG9ydDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwYXNzVmlldzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkb3VibGVHb2xkTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfcmVkQWRkTnVtOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfY2hhbmdOdW06IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9yZXdhcmRMaXN0VGlwR29sZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGRvdWJsZUJ0bk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2xvc2VCdG5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdldEJ0bk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLei/h+W6pumhtS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaW1nX3ByaXplOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmxlX3ByaXplOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgaW1nX2dvbGRJY29uOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgaW1nX3JlZEljb246IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLlgI3mlbBcIiB9KVxuICAgIHByaXZhdGUgbXVsdGlwbGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLlgI3mlbDph5HluIFcIiB9KVxuICAgIHByaXZhdGUgbGFibGVfYWRkR29sZDI6IGNjLkxhYmVsID0gbnVsbDtcblxuXG4gICAgZGF0YSA9IG51bGw7XG4gICAgZ2FpbnR5cGUgPSBudWxsO1xuICAgIHJld2FyZExpc3Q6IEFycmF5PHNpZ25SZXdhcmREYXRhPiA9IG51bGw7XG4gICAgcmV3YXJkTm9kZUxpc3QgPSBudWxsO1xuXG5cbiAgICB0ZW1wTm9kZSA9IG51bGw7XG4gICAgaXNSZWRwYWNrID0gbnVsbDtcbiAgICBhZGRHb2xkID0gbnVsbDtcbiAgICAvKirnrb7liLDlpKnmlbAgKi9cbiAgICBzaWduRGF5czogbnVtYmVyID0gMTtcblxuICAgIC8qKuaYr+WQpuaUueWPmOS6hiAqL1xuICAgIGlzQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgLy8gVUlGdW5jLm9wZW5VSShBY3Rpdml0eVBhbm5lbE5hbWUuUGFubmVsVGVtcE5vZGUsIChub2RlLCBzY3JpcHQpID0+IHtcbiAgICAgICAgLy8gICAgIHRoaXMudGVtcE5vZGUgPSBub2RlO1xuICAgICAgICAvLyB9KSAgICAgICAgXG5cblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG5Ob2RlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgfSwgZ2FtZU51bWVyaWNhbC5jbG9zZVRpbWUpO1xuICAgICAgICBjYy50d2Vlbih0aGlzLm11bHRpcGxlTm9kZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjMsIHsgYW5nbGU6IDEwIH0pLnRvKC4yLCB7IGFuZ2xlOiAwIH0pXG4gICAgICAgICkuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgIFxuXG4gICAgICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhW2BjYWxsQmFja2BdKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFbYGNhbGxCYWNrYF0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWwuaXNPa1NpZ24gPSB0cnVlO1xuICAgIH1cblxuICAgIGluaXQoc2lnbkF3YXJkRGF0YSkge1xuICAgICAgICB0aGlzLmlzQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBkYXRhID0gc2lnbkF3YXJkRGF0YS5saXN0O1xuICAgICAgICBsZXQgaW5kZXggPSBzaWduQXdhcmREYXRhLmN1cnJlbnREYXk7XG4gICAgICAgIGxldCBnYWludHlwZSA9IHNpZ25Bd2FyZERhdGEudHlwZTtcbiAgICAgICAgdGhpcy5zaWduRGF5cyA9IHNpZ25Bd2FyZERhdGEuc2lnbkRheXM7XG4gICAgICAgIGlmIChnYWludHlwZSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBhc3NWaWV3LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52aWV3cG9ydC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucGFzc1ZpZXcuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgXG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld3BvcnQgJiYgKHRoaXMudmlld3BvcnQuYWN0aXZlID0gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzVmlldyAmJiAodGhpcy5wYXNzVmlldy5hY3RpdmUgPSBmYWxzZSk7XG4gICAgICAgICAgICB9LCAxMDAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGEgPSBzaWduQXdhcmREYXRhO1xuICAgICAgICB0aGlzLmdhaW50eXBlID0gZ2FpbnR5cGU7XG4gICAgICAgIHRoaXMudmlld3BvcnQub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgdGhpcy5yZXdhcmRMaXN0ID0gZGF0YS5yZXdhcmRMaXN0O1xuICAgICAgICB0aGlzLmlzUmVkcGFjayA9IFNpZ25EYXlSZWRwYWNrW2luZGV4XTtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnJld2FyZExpc3RbMF07XG4gICAgICAgIGxldCBjaGFuZ2UgPSB1dGlsLnVzZXJEYXRhLmV4Y2hhbmdlUmF0ZTtcbiAgICAgICAgbGV0IGdvbGQgPSAwO1xuXG4gICAgICAgIHRoaXMuZG91YmxlQnRuTm9kZS5hY3RpdmUgPSB0aGlzLmdhaW50eXBlID09IDE7XG5cbiAgICAgICAgdGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSA9IHRoaXMuZ2FpbnR5cGUgPT0gMjtcblxuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgZ29sZCA9IHRoaXMuZ2FpbnR5cGUgPT0gMSA/IGl0ZW0ucmV3YXJkVmFsdWUgOiB0aGlzLmdhaW50eXBlID09IDIgPyBpdGVtLnJld2FyZFBsdXNWYWx1ZSA6IGl0ZW0ucmV3YXJkUGx1c1ZhbHVlIC0gaXRlbS5yZXdhcmRWYWx1ZVxuICAgICAgICAgICAgdGhpcy5sYWJsZV9yZWRBZGROdW0uc3RyaW5nID0gXCIrXCIgKyBnb2xkICsgdCgnbWFpbi7nuqLljIUnKTtcbiAgICAgICAgICAgIHRoaXMubGFibGVfY2hhbmdOdW0uc3RyaW5nID0gYOe6ouWMhSR7dXRpbC51c2VyRGF0YS5jb2luICsgZ29sZH0g4omIICR7KCh1dGlsLnVzZXJEYXRhLmNvaW4gKyBnb2xkKSAvIGNoYW5nZSkudG9GaXhlZCgyKX3lhYNgO1xuICAgICAgICAgICAgdGhpcy5sYWJsZV9yZXdhcmRMaXN0VGlwR29sZC5zdHJpbmcgPSBgJHt1dGlsLnVzZXJEYXRhLmNvaW4gKyBnb2xkfSDiiYggJHsoKHV0aWwudXNlckRhdGEuY29pbiArIGdvbGQpIC8gY2hhbmdlKS50b0ZpeGVkKDIpfeWFg2A7XG5cbiAgICAgICAgICAgIHRoaXMubGFibGVfYWRkR29sZDIuc3RyaW5nID0gZ29sZCAqIDIgKyBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzUmVkcGFjaykge1xuICAgICAgICAgICAgdGhpcy5pbWdfcHJpemUuc3ByaXRlRnJhbWUgPSB0aGlzLmltZ19nb2xkSWNvbjtcbiAgICAgICAgICAgIHRoaXMubGFibGVfcHJpemUuc3RyaW5nID0gYCske2dvbGR9YCArIHQoJ21haW4u57qi5YyFJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmltZ19wcml6ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaW1nX3JlZEljb247XG4gICAgICAgICAgICB0aGlzLmxhYmxlX3ByaXplLnN0cmluZyA9IGArJHtnb2xkIC8gdXRpbC51c2VyRGF0YS5leGNoYW5nZVJhdGV95YWDYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkR29sZCA9IGdvbGQ7XG4gICAgICAgIC8vR2FtZUluZm8uZ2FpbkdvbGQoZ29sZCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2FpbnR5cGUgPT0gMikge1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaZrumAmuetvuWIsOaIkOWKn+W8ueeql1wiXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9XG5cblxuXG4gICAgZmluaXNoQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgIH1cblxuICAgIHN0YXJ0QW5pbWF0aW9uKCkge1xuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnrb7liLDmiJDlip/lvLnnqpdgLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaUtuS4i1wiXG4gICAgICAgIH0pXG5cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGxldCBjYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1JlZHBhY2spIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBtIGluIHRoaXMucmV3YXJkTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3Npc3RDdHIuZmluZFByb3BTcHJpdGUodGhpcy5yZXdhcmRMaXN0W21dLnR5cGUsIHRoaXMucmV3YXJkTGlzdFttXS5rZXlJZCwgKHNwcml0ZUZyYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5yZXdhcmROb2RlTGlzdFttXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCB0ZW1wID0gdGhpcy50ZW1wTm9kZS5nZXRDb21wb25lbnQoUGFubmVsVGVtcE5vZGUpLmdldEdvbGROb2RlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgQXNzaXN0Q3RyLnBsYXlBbmltYXRlKHNwcml0ZUZyYW1lLCB0aGlzLnJld2FyZE5vZGVMaXN0W21dLCB0ZW1wLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuZmluaXNoQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY2MuZXJyb3IoXCLliqDovb3lm77niYflpLHotKVcIiwgdGhpcy5yZXdhcmRMaXN0W21dLnR5cGUsIHRoaXMucmV3YXJkTGlzdFttXS5rZXlJZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnF1aXQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgLy9jYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4se25vZGU6dGhpcy5yZXdhcmROb2RlTGlzdFttXSwgdmFsdWU6cmVzLmNvaW59KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMuZG91YmxlR29sZE5vZGUsIHZhbHVlOiB0aGlzLmFkZEdvbGQgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hBbmltYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLmRvdWJsZUdvbGROb2RlLCB2YWx1ZTogdGhpcy5hZGRHb2xkIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoQW5pbWF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBsZXQgdGVtcCA9IHRoaXMudGVtcE5vZGUuZ2V0Q29tcG9uZW50KFBhbm5lbFRlbXBOb2RlKS5nZXRHb2xkTm9kZSgpO1xuICAgICAgICAgICAgICAgIC8vIEFzc2lzdEN0ci5wbGF5QW5pbWF0ZSh0aGlzLmRvdWJsZUdvbGROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lLCB0aGlzLmRvdWJsZUdvbGROb2RlLCB0ZW1wLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZmluaXNoQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWV3cG9ydC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZU91dCgwLjMpLCBjYy5jYWxsRnVuYyhjYWxsYmFjaykpKVxuICAgIH1cblxuXG4gICAgLyoq5Y+M5YCN5pS25LiLICovXG4gICAgZG91YmxlQnRuKGUsIHJlcykge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuXG5cblxuICAgICAgICBsZXQgbnVtID0gTnVtYmVyKHJlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2FpbnR5cGUgPT0gMiB8fCB0aGlzLmlzQ2hhbmdlKSB7XG4gICAgICAgICAgICBudW0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gbnVtID8gVXJsQ29uc3Quc2lnbl92aWRlb0dldCA6IFVybENvbnN0LnNpZ25fY29tbW9uR2V0O1xuXG4gICAgICAgIGxldCBkYXk6IHN0cmluZyA9IGDnrKwke3RoaXMuc2lnbkRheXN95aSpYDtcblxuICAgICAgICBsZXQgY29pbjogbnVtYmVyID0gbnVtID8gdGhpcy5yZXdhcmRMaXN0WzBdLnJld2FyZFBsdXNWYWx1ZSA6IHRoaXMucmV3YXJkTGlzdFswXS5yZXdhcmRWYWx1ZTtcblxuICAgICAgICBsZXQgc3VjY2Vzc0ZuID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLmRvdWJsZUdvbGROb2RlLCB2YWx1ZTogY29pbiwgbnVtOiAxMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLlNpZ25pbl9uZXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldF9zdGF0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0X3R5cGU6IHRoaXMuaXNDaGFuZ2UgfHwgdGhpcy5nYWludHlwZSA9PSAyID8gXCLlj4zlgI3pooblj5ZcIiA6IFwi5Y2V5YCN55u05o6l6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0X2RheXM6IGRheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuXG4gICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG51bSA9PSAxICYmIHRoaXMuZ2FpbnR5cGUgPT0gMSAmJiAhdGhpcy5pc0NoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy52aWV3cG9ydCAmJiAodGhpcy52aWV3cG9ydC5hY3RpdmUgPSBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnBhc3NWaWV3ICYmICh0aGlzLnBhc3NWaWV3LmFjdGl2ZSA9IHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLmxhYmxlX3ByaXplLnN0cmluZyA9IFwiK1wiICsgY29pbiArIHQoJ21haW4u57qi5YyFJyk7XG4gICAgICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlLCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gc3VjY2Vzc0ZuKCk7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnnIvop4bpopFcIilcbiAgICAgICAgICAgICAgICB0aGlzLmRvdWJsZUJ0bk5vZGUgJiYgKHRoaXMuZG91YmxlQnRuTm9kZS5hY3RpdmUgPSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCdG5Ob2RlICYmICh0aGlzLmdldEJ0bk5vZGUuYWN0aXZlID0gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZWRBZGROdW0uc3RyaW5nID0gXCIrXCIgKyBjb2luICsgdCgnbWFpbi7nuqLljIUnKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhaW50eXBlID0gMjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2hhbmdlID0gdHJ1ZTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6piAgXG4gICAgICAgICAgICAvLyB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KFwidGlwcy5yZXdhcmRfb2J0YWluX2ZhaWxlZFwiKSk7XG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3cG9ydCAmJiAodGhpcy52aWV3cG9ydC5hY3RpdmUgPSB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NWaWV3ICYmICh0aGlzLnBhc3NWaWV3LmFjdGl2ZSA9IGZhbHNlKTtcbiAgICAgICAgICAgIH0sIDEwMDAwKTtcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOaZrumAmuetvuWIsOaIkOWKn+W8ueeql2AsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIue/u+WAjemihuWPllwiLFxuICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOiBcIua/gOWKseinhumikVwiXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSB0aGlzLmlzQ2hhbmdlIHx8IHRoaXMuZ2FpbnR5cGUgPT0gMiA/IFwi5Y+M5YCN6aKG5Y+WXCIgOiBcIuWNleWAjeebtOaOpemihuWPllwiO1xuICAgICAgICAgICAgVHJhY2tNZ3IuU2lnbmluX25ldyh7XG4gICAgICAgICAgICAgICAgZ2V0X3N0YXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGdldF90eXBlOiB0ZXh0LFxuICAgICAgICAgICAgICAgIGdldF9kYXlzOiBkYXksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuI3nnIvop4bpopFcIilcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NoYW5nZSAmJiB0aGlzLmdhaW50eXBlICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDmma7pgJrnrb7liLDmiJDlip/lvLnnqpdgLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi55u05o6l6aKG5Y+WXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOetvuWIsOaIkOWKn+W8ueeql2AsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaUtuS4i1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cblxuICAgIH1cbn07XG4iXX0=