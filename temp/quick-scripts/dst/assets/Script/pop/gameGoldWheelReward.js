
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHb2xkV2hlZWxSZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBRWxELDJDQUFzQztBQUV0QyxtRUFBOEQ7QUFFOUQsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxxREFBZ0Q7QUFDaEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBaUQsdUNBQU07SUFBdkQ7UUFBQSxxRUFrSkM7UUEvSVcsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFFckMsaURBQWlEO1FBQ2pELGlDQUFpQztRQUd6QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUV2QyxpREFBaUQ7UUFDakQsb0NBQW9DO1FBRzVCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFbEMsT0FBTztRQUNDLFVBQUksR0FBVyxJQUFJLENBQUM7UUFJNUIscUJBQWUsR0FBWSxLQUFLLENBQUM7O1FBd0hqQyxpQkFBaUI7SUFDckIsQ0FBQztJQXZIRzs7O09BR0c7SUFDSCxrQ0FBSSxHQUFKLFVBQUssSUFBSSxFQUFFLFNBQVU7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLDBCQUFnQixDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsMEJBQWdCLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFBO0lBQy9CLENBQUM7SUFFRCxtQ0FBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0NBQU0sR0FBTixVQUFPLENBQUMsRUFBRSxHQUFHO1FBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRztJQUNILHNDQUFRLEdBQVI7UUFDSSx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsbUJBQW1CO0lBQ3ZCLENBQUM7SUFDRCxzQ0FBUSxHQUFSO1FBQUEsaUJBaURDO1FBaERHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFFN0IseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFdkMsZUFBSyxDQUFDLFVBQVUsQ0FBQztnQkFDYixHQUFHLEVBQUUsbUJBQVEsQ0FBQyxpQkFBaUI7Z0JBQy9CLElBQUksRUFBRTtvQkFDRixFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUUsVUFBQSxHQUFHO29CQUNWLElBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFDO3dCQUNiLE9BQU87cUJBQ1Y7b0JBRUQsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTt3QkFDaEIsa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQzs0QkFDekIsZ0JBQWdCLEVBQUUsWUFBWTs0QkFDOUIsU0FBUyxFQUFFLElBQUk7NEJBQ2YsWUFBWSxFQUFFLFFBQVE7eUJBQ3pCLENBQUMsQ0FBQTt3QkFDRixnQkFBZ0I7d0JBQ2hCLHlDQUF5Qzt3QkFDekMsZUFBZTt3QkFDZixzQ0FBc0M7d0JBQ3RDLDJCQUEyQjt3QkFDM0IsNkRBQTZEO3dCQUM3RCxRQUFRO3dCQUNSLE1BQU07d0JBQ04sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUN0Qix5REFBeUQ7d0JBQ3pELCtEQUErRDt3QkFDL0QsZ0VBQWdFO3dCQUNoRSxrRUFBa0U7d0JBQ2xFLElBQUk7cUJBQ1A7eUJBQ0k7d0JBQ0QsZUFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzVDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3FCQUMvQjtnQkFDTCxDQUFDO2dCQUNELE1BQU0sRUFBRSxVQUFBLEdBQUc7b0JBQ1AsZUFBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDaEMsQ0FBQzthQUNKLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUNELDRDQUFjLEdBQWQ7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNoQyw4QkFBOEI7WUFDOUIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDdkoscUJBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDdkMsY0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ2pKLHFCQUFTLENBQUMsWUFBWSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pEO0lBQ0wsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxzQkFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsd0JBQXdCO1FBRS9GLGdEQUFnRDtRQUNoRCxzREFBc0Q7UUFDdEQsS0FBSztRQUNMLHNDQUFzQztRQUN0QywyREFBMkQ7UUFDM0QsYUFBYTtJQUNqQixDQUFDO0lBR0QsdUNBQVMsR0FBVDtRQUNJLHNCQUFZLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEQsYUFBYTtRQUNiLHlFQUF5RTtRQUN6RSxzREFBc0Q7UUFDdEQsSUFBSTtJQUNSLENBQUM7SUE1SUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7NERBQ1g7SUFNckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7NkRBQ1o7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2REFDbUI7SUFNdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7MERBQ2Q7SUFsQmpCLG1CQUFtQjtRQUR2QyxPQUFPO09BQ2EsbUJBQW1CLENBa0p2QztJQUFELDBCQUFDO0NBbEpELEFBa0pDLENBbEpnRCxnQkFBTSxHQWtKdEQ7a0JBbEpvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQERlc2NyaXB0dGlvbjogXG4gKiBAdmVyc2lvbjogXG4gKiBAQXV0aG9yOiBtaWVzXG4gKiBARGF0ZTogMjAyMS0wMi0yNCAxNzo0MTo0N1xuICogQExhc3RFZGl0b3JzOiBtaWVzXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIxLTAyLTI2IDE0OjUwOjU1XG4gKi9cbmltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCwgdXBkYXRlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgUmV3YXJkQ29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGVsci9SZXdhcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgUGFnZU1hbmFnZSBmcm9tIFwiLi4vUGFnZU1hbmFnZVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lR29sZFdoZWVsUmV3YXJkIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmloflrZdcIiB9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuWFiVwiIH0pXG4gICAgLy8gcHJpdmF0ZSBsaWdodDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLmlL7lvIPpooblj5ZcIiB9KVxuICAgIHByaXZhdGUgY2xvc2VCdG5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSByZXdhcmRTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuinhumikWljb25cIn0pXG4gICAgLy8gcHJpdmF0ZSB2aWRlb0ljb246Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8v5aSa5bCR5Liq6YeR5biBXG4gICAgcHJpdmF0ZSBjb2luOiBudW1iZXIgPSBudWxsO1xuICAgIC8vXG4gICAgcHJpdmF0ZSBpbml0RGF0YTogYW55O1xuICAgIGNsb3NlQ2FsbDogYW55O1xuICAgIGlzQ2xpY2tHZXRQcml6ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICovXG4gICAgaW5pdChkYXRhLCBjbG9zZUNhbGw/KSB7XG4gICAgICAgIHRoaXMuY29pbiA9IGRhdGEucmV3YXJkLnZhbHVlO1xuICAgICAgICB0aGlzLmNsb3NlQ2FsbCA9IGNsb3NlQ2FsbDtcbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMuY29pbjtcbiAgICAgICAgdGhpcy5yZXdhcmRTcHJpdGUuc3ByaXRlRnJhbWUgPSBkYXRhLnJld2FyZC50eXBlID09IDEgPyBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlLmZpbmRQb2ludEJpZ1Nwcml0ZSgyKSA6IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFBvaW50QmlnU3ByaXRlKDEpXG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmlzQ2xpY2tHZXRQcml6ZSA9IHRydWVcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPllxuICAgICAqL1xuICAgIGdldEJ0bihlLCByZXMpIHtcbiAgICAgICAgdGhpcy5nZXRQcml6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXrVxuICAgICAqL1xuICAgIGNsb3NlQnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLlNlbmRQb3N0KCk7XG4gICAgfVxuICAgIGdldFByaXplKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLmlzQ2xpY2tHZXRQcml6ZSkge1xuICAgICAgICAgICAgc2VsZi5pc0NsaWNrR2V0UHJpemUgPSBmYWxzZTtcblxuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ29sZFdoZWVsX2NoZWNrSW4sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5pbml0RGF0YS5pZFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLph5HluIHovaznm5jojrflvpflpZblirHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5pS25LiLXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nX2VudGVyOiBcIummlumhtemHkeW4gei9rOebmFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QuQXBwRGlhbG9nQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZGlhbG9nX25hbWUyOiBcIumHkeW4gei9rOebmOiOt+W+l+WlluWKseW8ueeql1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBja19tb2R1bGU6IFwi5pS25LiLXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGRpYWxvZ19lbnRlcjogdGhpcy5pc01haW4gPyBcIummlumhtemHkeW4gei9rOebmFwiIDogXCLpmZDml7bnpLzljIXmlLbkuIvot7PovaxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChzZWxmLmluaXREYXRhLnJld2FyZC50eXBlID09IHVwZGF0ZVR5cGUuaG9uZ2Jhbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWwudXNlckRhdGEuY29pbiArPSBOdW1iZXIoc2VsZi5pbml0RGF0YS5yZXdhcmQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHNlbGYuaW5pdERhdGEucmV3YXJkLnR5cGUgPT0gdXBkYXRlVHlwZS5wcm9kdWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXRpbC51c2VyRGF0YS5wcm9kdWN0ICs9IE51bWJlcihzZWxmLmluaXREYXRhLnJld2FyZC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNDbGlja0dldFByaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdCgn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaXNDbGlja0dldFByaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0QW5pbWF0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuaXNDbGlja0dldFByaXplID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5jbG9zZUNhbGwgJiYgc2VsZi5jbG9zZUNhbGwoKTtcbiAgICAgICAgc2VsZi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pbml0RGF0YS5yZXdhcmQudHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAvLyB1dGlsLmFkZFRlcm1Db2luKHRoaXMuY29pbilcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLnJld2FyZFNwcml0ZS5ub2RlLCB2YWx1ZTogdGhpcy5jb2luLG51bToxMCxwYXJlbnQ6Y2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJyl9KTtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflj5ZcIit0aGlzLmNvaW4rXCLnuqLljIXluIFcIik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbml0RGF0YS5yZXdhcmQudHlwZSA9PSAxKSB7XG4gICAgICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQodGhpcy5jb2luKTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfdHVycmV0LCB7IG5vZGU6IHRoaXMucmV3YXJkU3ByaXRlLm5vZGUsIG51bTogdGhpcy5jb2luICxwYXJlbnQ6Y2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJyl9KTtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflvpdcIit0aGlzLmNvaW4rXCLkuKrngq7loZTvvIFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5nb2xkV2hlZWxJbmZvLCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuXG4gICAgICAgIC8vIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UYXNrUmV3YXJkVmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5UYXNrUmV3YXJkVmlldyx0cnVlKTtcbiAgICAgICAgLy8gfSBcbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5saWdodCkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkudG8oMSwgeyBzY2FsZTogMSB9KS50bygxLCB7IHNjYWxlOiAxLjEgfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLmdvbGRXaGVlbEluZm8pO1xuICAgICAgICAvLyAvL+mihOWKoOi9vemHkeW4geS/oeaBr+a1gVxuICAgICAgICAvLyBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3XSYmdXRpbC5nZXRIZWF2ZW5Qb29sKCk+MCl7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRhc2tSZXdhcmRWaWV3LHRydWUpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==