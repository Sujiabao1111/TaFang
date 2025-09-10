
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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var RewardController_1 = require("../controlelr/RewardController");
var LanguageData_1 = require("../Language/LanguageData");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHb2xkV2hlZWxSZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBRWxELDJDQUFzQztBQUV0QyxtRUFBOEQ7QUFDOUQseURBQTZDO0FBRTdDLCtDQUE4QztBQUM5QyxzRUFBaUU7QUFDakUscURBQWdEO0FBQ2hELHNEQUFpRDtBQUVqRCxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBaUQsdUNBQU07SUFBdkQ7UUFBQSxxRUF5SUM7UUF0SVcsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFFckMsaURBQWlEO1FBQ2pELGlDQUFpQztRQUd6QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUV2QyxpREFBaUQ7UUFDakQsb0NBQW9DO1FBRzVCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFbEMsT0FBTztRQUNDLFVBQUksR0FBVyxJQUFJLENBQUM7UUFJNUIscUJBQWUsR0FBWSxLQUFLLENBQUM7O1FBK0dqQyxpQkFBaUI7SUFDckIsQ0FBQztJQTlHRzs7O09BR0c7SUFDSCxrQ0FBSSxHQUFKLFVBQUssSUFBSSxFQUFFLFNBQVU7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxD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RSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQzswREFDZDtJQWxCakIsbUJBQW1CO1FBRHZDLE9BQU87T0FDYSxtQkFBbUIsQ0F5SXZDO0lBQUQsMEJBQUM7Q0F6SUQsQUF5SUMsQ0F6SWdELGdCQUFNLEdBeUl0RDtrQkF6SW9CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBARGVzY3JpcHR0aW9uOiBcbiAqIEB2ZXJzaW9uOiBcbiAqIEBBdXRob3I6IG1pZXNcbiAqIEBEYXRlOiAyMDIxLTAyLTI0IDE3OjQxOjQ3XG4gKiBATGFzdEVkaXRvcnM6IG1pZXNcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjEtMDItMjYgMTQ6NTA6NTVcbiAqL1xuaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBnYW1lTnVtZXJpY2FsLCB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBSZXdhcmRDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sZWxyL1Jld2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XG5pbXBvcnQgUGFnZU1hbmFnZSBmcm9tIFwiLi4vUGFnZU1hbmFnZVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lR29sZFdoZWVsUmV3YXJkIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmloflrZdcIiB9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuWFiVwiIH0pXG4gICAgLy8gcHJpdmF0ZSBsaWdodDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLmlL7lvIPpooblj5ZcIiB9KVxuICAgIHByaXZhdGUgY2xvc2VCdG5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSByZXdhcmRTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuinhumikWljb25cIn0pXG4gICAgLy8gcHJpdmF0ZSB2aWRlb0ljb246Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8v5aSa5bCR5Liq6YeR5biBXG4gICAgcHJpdmF0ZSBjb2luOiBudW1iZXIgPSBudWxsO1xuICAgIC8vXG4gICAgcHJpdmF0ZSBpbml0RGF0YTogYW55O1xuICAgIGNsb3NlQ2FsbDogYW55O1xuICAgIGlzQ2xpY2tHZXRQcml6ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICovXG4gICAgaW5pdChkYXRhLCBjbG9zZUNhbGw/KSB7XG4gICAgICAgIHRoaXMuY29pbiA9IGRhdGEucmV3YXJkLnZhbHVlO1xuICAgICAgICB0aGlzLmNsb3NlQ2FsbCA9IGNsb3NlQ2FsbDtcbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMuY29pbjtcbiAgICAgICAgdGhpcy5yZXdhcmRTcHJpdGUuc3ByaXRlRnJhbWUgPSBkYXRhLnJld2FyZC50eXBlID09IDEgPyBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlLmZpbmRQb2ludEJpZ1Nwcml0ZSgyKSA6IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFBvaW50QmlnU3ByaXRlKDEpXG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmlzQ2xpY2tHZXRQcml6ZSA9IHRydWVcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPllxuICAgICAqL1xuICAgIGdldEJ0bihlLCByZXMpIHtcbiAgICAgICAgdGhpcy5nZXRQcml6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXrVxuICAgICAqL1xuICAgIGNsb3NlQnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLlNlbmRQb3N0KCk7XG4gICAgfVxuXG4gICAgZ2V0UHJpemUoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuaXNDbGlja0dldFByaXplKSB7XG4gICAgICAgICAgICBzZWxmLmlzQ2xpY2tHZXRQcml6ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nb2xkV2hlZWxfY2hlY2tJbixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmluaXREYXRhLmlkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChzZWxmLmluaXREYXRhLnJld2FyZC50eXBlID09IHVwZGF0ZVR5cGUuaG9uZ2Jhbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWwudXNlckRhdGEuY29pbiArPSBOdW1iZXIoc2VsZi5pbml0RGF0YS5yZXdhcmQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHNlbGYuaW5pdERhdGEucmV3YXJkLnR5cGUgPT0gdXBkYXRlVHlwZS5wcm9kdWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXRpbC51c2VyRGF0YS5wcm9kdWN0ICs9IE51bWJlcihzZWxmLmluaXREYXRhLnJld2FyZC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNDbGlja0dldFByaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdCgn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaXNDbGlja0dldFByaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0QW5pbWF0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuaXNDbGlja0dldFByaXplID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5jbG9zZUNhbGwgJiYgc2VsZi5jbG9zZUNhbGwoKTtcbiAgICAgICAgc2VsZi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pbml0RGF0YS5yZXdhcmQudHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAvLyB1dGlsLmFkZFRlcm1Db2luKHRoaXMuY29pbilcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLnJld2FyZFNwcml0ZS5ub2RlLCB2YWx1ZTogdGhpcy5jb2luLCBudW06IDEwLCBwYXJlbnQ6IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpIH0pO1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuiOt+WPllwiICsgdGhpcy5jb2luICsgXCLnuqLljIXluIFcIik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbml0RGF0YS5yZXdhcmQudHlwZSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmNvaW4gPSAxMDAwO1xuICAgICAgICAgICAgdXRpbC5wcm9kdWN0VHVycmV0KHRoaXMuY29pbik7XG4gICAgICAgICAgICAvLyBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X3R1cnJldCwgeyBub2RlOiB0aGlzLnJld2FyZFNwcml0ZS5ub2RlLCBudW06IHRoaXMuY29pbiwgcGFyZW50OiBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKSB9KTtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodCgnbWFpbi5Hb3RfdHVycmV0cycsIHRoaXMuY29pbikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uZ29sZFdoZWVsSW5mbywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcblxuICAgICAgICAvLyBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVGFza1Jld2FyZFZpZXddKXtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVGFza1Jld2FyZFZpZXcsdHJ1ZSk7XG4gICAgICAgIC8vIH0gXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEsIHsgc2NhbGU6IDEgfSkudG8oMSwgeyBzY2FsZTogMS4xIH0pXG4gICAgICAgIC8vICkuc3RhcnQoKTtcbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5nb2xkV2hlZWxJbmZvKTtcbiAgICAgICAgLy8gLy/pooTliqDovb3ph5HluIHkv6Hmga/mtYFcbiAgICAgICAgLy8gaWYoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrUmV3YXJkVmlld10mJnV0aWwuZ2V0SGVhdmVuUG9vbCgpPjApe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5UYXNrUmV3YXJkVmlldyx0cnVlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=