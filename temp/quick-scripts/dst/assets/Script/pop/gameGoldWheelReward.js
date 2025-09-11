
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameGoldWheelReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '883c9S8u11Jya3hq3d2UMMT', 'gameGoldWheelReward');
// Script/pop/gameGoldWheelReward.ts

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
var NameTs_1 = require("../common/NameTs");
var RewardController_1 = require("../controlelr/RewardController");
var LanguageData_1 = require("../Language/LanguageData");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
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
            this.coin = 1000;
            util_1.default.productTurret(this.coin);
            // cc.game.emit(NameTs.Game_Effect_turret, { node: this.rewardSprite.node, num: this.coin, parent: cc.director.getScene().getChildByName('Canvas') });
            AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('main.Got_turrets', this.coin));
        }
    };
    gameGoldWheelReward.prototype.onEnable = function () {
        // AdController.loadInfoAd(AdPosition.goldWheelInfo, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.TaskRewardView]){
        //     util.preloadAd(AdPosition.TaskRewardView,true);
        // } 
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1, { scale: 1 }).to(1, { scale: 1.1 })
        // ).start();
    };
    gameGoldWheelReward.prototype.onDisable = function () {
        // AdController.hideInfoAd(AdPosition.goldWheelInfo);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHb2xkV2hlZWxSZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFHcEMsMkNBQXNDO0FBRXRDLG1FQUE4RDtBQUM5RCx5REFBNkM7QUFFN0MsK0NBQThDO0FBRTlDLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFFakQscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWlELHVDQUFNO0lBQXZEO1FBQUEscUVBeUlDO1FBdElXLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRXJDLGlEQUFpRDtRQUNqRCxpQ0FBaUM7UUFHekIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0Isa0JBQVksR0FBYyxJQUFJLENBQUM7UUFFdkMsaURBQWlEO1FBQ2pELG9DQUFvQztRQUc1QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRWxDLE9BQU87UUFDQyxVQUFJLEdBQVcsSUFBSSxDQUFDO1FBSTVCLHFCQUFlLEdBQVksS0FBSyxDQUFDOztRQStHakMsaUJBQWlCO0lBQ3JCLENBQUM7SUE5R0c7OztPQUdHO0lBQ0gsa0NBQUksR0FBSixVQUFLLElBQUksRUFBRSxTQUFVO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENB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bUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBEZXNjcmlwdHRpb246IFxuICogQHZlcnNpb246IFxuICogQEF1dGhvcjogbWllc1xuICogQERhdGU6IDIwMjEtMDItMjQgMTc6NDE6NDdcbiAqIEBMYXN0RWRpdG9yczogbWllc1xuICogQExhc3RFZGl0VGltZTogMjAyMS0wMi0yNiAxNDo1MDo1NVxuICovXG5pbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGdhbWVOdW1lcmljYWwsIHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IFJld2FyZENvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xlbHIvUmV3YXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcbmltcG9ydCBQYWdlTWFuYWdlIGZyb20gXCIuLi9QYWdlTWFuYWdlXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVHb2xkV2hlZWxSZXdhcmQgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuaWh+Wtl1wiIH0pXG4gICAgcHJpdmF0ZSByZXdhcmRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5YWJXCIgfSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuaUvuW8g+mihuWPllwiIH0pXG4gICAgcHJpdmF0ZSBjbG9zZUJ0bk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIHJld2FyZFNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi6KeG6aKRaWNvblwifSlcbiAgICAvLyBwcml2YXRlIHZpZGVvSWNvbjpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuS/oeaBr+a1gVwiIH0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLy/lpJrlsJHkuKrph5HluIFcbiAgICBwcml2YXRlIGNvaW46IG51bWJlciA9IG51bGw7XG4gICAgLy9cbiAgICBwcml2YXRlIGluaXREYXRhOiBhbnk7XG4gICAgY2xvc2VDYWxsOiBhbnk7XG4gICAgaXNDbGlja0dldFByaXplOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja5cbiAgICAgKi9cbiAgICBpbml0KGRhdGEsIGNsb3NlQ2FsbD8pIHtcbiAgICAgICAgdGhpcy5jb2luID0gZGF0YS5yZXdhcmQudmFsdWU7XG4gICAgICAgIHRoaXMuY2xvc2VDYWxsID0gY2xvc2VDYWxsO1xuICAgICAgICB0aGlzLnJld2FyZExhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5jb2luO1xuICAgICAgICB0aGlzLnJld2FyZFNwcml0ZS5zcHJpdGVGcmFtZSA9IGRhdGEucmV3YXJkLnR5cGUgPT0gMSA/IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFBvaW50QmlnU3ByaXRlKDIpIDogUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUG9pbnRCaWdTcHJpdGUoMSlcbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuaXNDbGlja0dldFByaXplID0gdHJ1ZVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKGUsIHJlcykge1xuICAgICAgICB0aGlzLmdldFByaXplKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6ZetXG4gICAgICovXG4gICAgY2xvc2VCdG4oKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuU2VuZFBvc3QoKTtcbiAgICB9XG5cbiAgICBnZXRQcml6ZSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5pc0NsaWNrR2V0UHJpemUpIHtcbiAgICAgICAgICAgIHNlbGYuaXNDbGlja0dldFByaXplID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmdvbGRXaGVlbF9jaGVja0luLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuaW5pdERhdGEuaWRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGFydEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHNlbGYuaW5pdERhdGEucmV3YXJkLnR5cGUgPT0gdXBkYXRlVHlwZS5ob25nYmFvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXRpbC51c2VyRGF0YS5jb2luICs9IE51bWJlcihzZWxmLmluaXREYXRhLnJld2FyZC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoc2VsZi5pbml0RGF0YS5yZXdhcmQudHlwZSA9PSB1cGRhdGVUeXBlLnByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB1dGlsLnVzZXJEYXRhLnByb2R1Y3QgKz0gTnVtYmVyKHNlbGYuaW5pdERhdGEucmV3YXJkLnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QocmVzLm1lc3NhZ2UgfHwgJ+e9kee7nOWHuumUmX4nLCAyLjUsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0NsaWNrR2V0UHJpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KCfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0NsaWNrR2V0UHJpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnRBbmltYXRpb24oKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5pc0NsaWNrR2V0UHJpemUgPSB0cnVlO1xuICAgICAgICBzZWxmLmNsb3NlQ2FsbCAmJiBzZWxmLmNsb3NlQ2FsbCgpO1xuICAgICAgICBzZWxmLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmluaXREYXRhLnJld2FyZC50eXBlID09IDIpIHtcbiAgICAgICAgICAgIC8vIHV0aWwuYWRkVGVybUNvaW4odGhpcy5jb2luKVxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMucmV3YXJkU3ByaXRlLm5vZGUsIHZhbHVlOiB0aGlzLmNvaW4sIG51bTogMTAsIHBhcmVudDogY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJykgfSk7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635Y+WXCIgKyB0aGlzLmNvaW4gKyBcIue6ouWMheW4gVwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluaXREYXRhLnJld2FyZC50eXBlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY29pbiA9IDEwMDA7XG4gICAgICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQodGhpcy5jb2luKTtcbiAgICAgICAgICAgIC8vIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfdHVycmV0LCB7IG5vZGU6IHRoaXMucmV3YXJkU3ByaXRlLm5vZGUsIG51bTogdGhpcy5jb2luLCBwYXJlbnQ6IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpIH0pO1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KCdtYWluLkdvdF90dXJyZXRzJywgdGhpcy5jb2luKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgLy8gQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5nb2xkV2hlZWxJbmZvLCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuXG4gICAgICAgIC8vIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrUmV3YXJkVmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5UYXNrUmV3YXJkVmlldyx0cnVlKTtcbiAgICAgICAgLy8gfSBcbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5saWdodCkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkudG8oMSwgeyBzY2FsZTogMSB9KS50bygxLCB7IHNjYWxlOiAxLjEgfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICAvLyBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLmdvbGRXaGVlbEluZm8pO1xuICAgICAgICAvLyAvL+mihOWKoOi9vemHkeW4geS/oeaBr+a1gVxuICAgICAgICAvLyBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3XSYmdXRpbC5nZXRIZWF2ZW5Qb29sKCk+MCl7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3LHRydWUpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==