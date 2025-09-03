
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameTreasure.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '23695YGBxVGaKYUC/tiILUg', 'gameTreasure');
// Script/pop/gameTreasure.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameTreasure = /** @class */ (function (_super) {
    __extends(gameTreasure, _super);
    function gameTreasure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progress = null;
        _this.content1 = null;
        _this.content2 = null;
        _this.coinLabel = null;
        _this.closeBtnNode1 = null;
        _this.closeBtnNode2 = null;
        _this.goldNode = null;
        _this.goldBox = null;
        _this.hand = null;
        _this.boxDragon = null;
        // @property({type:cc.ParticleSystem,displayName:"粒子"})
        // private Particle:cc.ParticleSystem = null;
        _this.feed_node = null;
        /**金币 */
        _this.coin = 0;
        //宝箱id
        _this.id = null;
        //是否播放
        _this.isRuning = false;
        //点击次数
        _this.clickNum = 0;
        _this.isStart = false;
        return _this;
    }
    gameTreasure.prototype.onLoad = function () {
        this.progress.progress = 0;
        this.closeBtnNode1.active = this.closeBtnNode2.active = false;
        this.unscheduleAllCallbacks();
    };
    gameTreasure.prototype.start = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.closeBtnNode1.active = true;
        }, faceTs_1.gameNumerical.closeTime);
    };
    gameTreasure.prototype.init = function (data) {
        // this.id = data;
        var _this = this;
        this.isStart = true;
        TrackMgr_1.default.airborne_treasure({
            activity_state: "漂浮宝箱弹窗",
        });
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.treasureBox_residual,
            success: function (res) {
                if (!_this.isValid) {
                    return;
                }
                _this.coin = res.coin;
                _this.coinLabel.string = "+" + _this.coin + "红包币";
            }
        });
        //预加载宝箱
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.TreasureBox]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.TreasureBox);
        }
    };
    /**
     * 点击
     */
    gameTreasure.prototype.clickBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        this.progress.progress += .1;
        // this.Particle.resetSystem();
        this.createGold();
        this.boxDragon.playAnimation("shake-red", 1);
        this.clickNum++;
        if (this.progress.progress >= 1) {
            this.isStart = false;
            this.content1.active = false;
            this.content2.active = true;
            this.scheduleOnce(function () {
                _this.closeBtnNode2.active = true;
            }, faceTs_1.gameNumerical.closeTime);
            TrackMgr_1.default.airborne_treasure({
                activity_state: "点击「砸开宝箱」按钮",
                button: this.clickNum,
            });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降宝箱（未砸开）",
                ck_module: "狂点砸开",
            });
        }
    };
    /**产金币 */
    gameTreasure.prototype.createGold = function () {
        var item = cc.instantiate(this.goldNode);
        item.active = true;
        item.setParent(this.goldBox);
    };
    /**
     * 关闭的
     */
    gameTreasure.prototype.closeBtn = function (e, res) {
        soundController_1.default.singleton.clickAudio();
        // util.saveTreasureData(this.id);
        this.closePage();
        TrackMgr_1.default.airborne_treasure({
            activity_state: "点击「放弃奖励」按钮",
            coin: this.coin,
            getcoin_status: false
        });
        if (res == 0) {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降宝箱（未砸开）",
                ck_module: "残忍放弃",
            });
        }
        else {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降宝箱（已砸开）",
                ck_module: "放弃领取",
            });
        }
    };
    /**
     * 增加金币
     */
    gameTreasure.prototype.getBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "空降宝箱（已砸开）",
            ck_module: "领取1000红包币",
            active_ad_hcdg: "激励视频"
        });
        AdController_1.default.loadAd(AdPosition_1.AdPosition.TreasureBox, function () {
            util_1.default.preloadAd(AdPosition_1.AdPosition.TreasureBox);
            // cc.game.emit(NameTs.Game_Treasure_StartTime);
            util_1.default.getdataStr({
                url: UrlConst_1.UrlConst.treasureBox_get2,
                success: function (res) {
                    if (!_this.isValid) {
                        return;
                    }
                    if (res == null) {
                        AssistCtr_1.AssistCtr.showToastTip("宝箱还未到时间");
                        _this.closePage();
                        return;
                    }
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.node, value: _this.coin, num: 10 });
                    AssistCtr_1.AssistCtr.showToastTip("获得" + _this.coin + "红包币");
                    util_1.default.addTermCoin(_this.coin);
                    TrackMgr_1.default.airborne_treasure({
                        activity_state: "点击「领金币」按钮",
                        coin: _this.coin
                    });
                    cc.game.emit(NameTs_1.default.Game_Treasure_StartTime);
                    _this.closePage();
                }
            });
        }, function () {
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    gameTreasure.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.TreasureBoxView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
    };
    gameTreasure.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.TreasureBoxView);
    };
    gameTreasure.prototype.update = function (dt) {
        if (this.isStart) {
            this.progress.progress -= 0.003;
            if (this.progress.progress < 0) {
                this.progress.progress = 0;
            }
        }
    };
    __decorate([
        property({ type: cc.ProgressBar, displayName: "进度条" })
    ], gameTreasure.prototype, "progress", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "宝箱页面" })
    ], gameTreasure.prototype, "content1", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "金币页" })
    ], gameTreasure.prototype, "content2", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "金币label" })
    ], gameTreasure.prototype, "coinLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "关闭1" })
    ], gameTreasure.prototype, "closeBtnNode1", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "关闭2" })
    ], gameTreasure.prototype, "closeBtnNode2", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "金币" })
    ], gameTreasure.prototype, "goldNode", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "金币Box" })
    ], gameTreasure.prototype, "goldBox", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "手指" })
    ], gameTreasure.prototype, "hand", void 0);
    __decorate([
        property({ type: dragonBones.ArmatureDisplay, displayName: "宝箱骨骼" })
    ], gameTreasure.prototype, "boxDragon", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameTreasure.prototype, "feed_node", void 0);
    gameTreasure = __decorate([
        ccclass
    ], gameTreasure);
    return gameTreasure;
}(baseTs_1.default));
exports.default = gameTreasure;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUcmVhc3VyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBaUQ7QUFDakQsMkNBQXNDO0FBQ3RDLCtDQUE4QztBQUM5QyxzRUFBaUU7QUFDakUsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUF5T0M7UUF0T1csY0FBUSxHQUFrQixJQUFJLENBQUM7UUFHL0IsY0FBUSxHQUFXLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBR3hCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFHN0IsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFHN0IsY0FBUSxHQUFXLElBQUksQ0FBQztRQUd4QixhQUFPLEdBQVcsSUFBSSxDQUFDO1FBSXZCLFVBQUksR0FBVyxJQUFJLENBQUM7UUFHcEIsZUFBUyxHQUErQixJQUFJLENBQUM7UUFFckQsdURBQXVEO1FBQ3ZELDZDQUE2QztRQUlyQyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRWpDLFFBQVE7UUFDQSxVQUFJLEdBQVUsQ0FBQyxDQUFDO1FBRXhCLE1BQU07UUFDRSxRQUFFLEdBQVUsSUFBSSxDQUFDO1FBRXpCLE1BQU07UUFDRSxjQUFRLEdBQVcsS0FBSyxDQUFDO1FBRWpDLE1BQU07UUFDRSxjQUFRLEdBQVUsQ0FBQyxDQUFDO1FBRXBCLGFBQU8sR0FBVyxLQUFLLENBQUM7O0lBcUxwQyxDQUFDO0lBbkxHLDZCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzlELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBR2xDLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLENBQUMsRUFBQyxzQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRy9CLENBQUM7SUFFRCwyQkFBSSxHQUFKLFVBQUssSUFBSTtRQUNMLGtCQUFrQjtRQUR0QixpQkE0QkM7UUF4QkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsa0JBQVEsQ0FBQyxpQkFBaUIsQ0FBQztZQUN2QixjQUFjLEVBQUUsUUFBUTtTQUMzQixDQUFDLENBQUE7UUFFRixjQUFJLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFDLG1CQUFRLENBQUMsb0JBQW9CO1lBQ2pDLE9BQU8sRUFBQyxVQUFBLEdBQUc7Z0JBQ1AsSUFBRyxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUM7b0JBQ2IsT0FBTztpQkFDVjtnQkFFRCxLQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFFLEdBQUcsR0FBRSxLQUFJLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQztZQUNoRCxDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsT0FBTztRQUNQLElBQUcsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLEVBQUM7WUFDdEMsY0FBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFDO0lBR0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsK0JBQVEsR0FBUjtRQUFBLGlCQXlCQztRQXhCRyx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDN0IsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUUsQ0FBQyxFQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDckMsQ0FBQyxFQUFDLHNCQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFM0Isa0JBQVEsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDdkIsY0FBYyxFQUFFLFlBQVk7Z0JBQzVCLE1BQU0sRUFBQyxJQUFJLENBQUMsUUFBUTthQUN2QixDQUFDLENBQUM7WUFDSCxrQkFBUSxDQUFDLG1CQUFtQixDQUFDO2dCQUN6QixnQkFBZ0IsRUFBRSxXQUFXO2dCQUM3QixTQUFTLEVBQUMsTUFBTTthQUNuQixDQUFDLENBQUM7U0FDTjtJQUVMLENBQUM7SUFFRCxTQUFTO0lBQ1QsaUNBQVUsR0FBVjtRQUVJLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWpDLENBQUM7SUFFRDs7T0FFRztJQUNILCtCQUFRLEdBQVIsVUFBUyxDQUFDLEVBQUMsR0FBRztRQUNWLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3ZDLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsa0JBQVEsQ0FBQyxpQkFBaUIsQ0FBQztZQUN2QixjQUFjLEVBQUUsWUFBWTtZQUM1QixJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUk7WUFDZCxjQUFjLEVBQUMsS0FBSztTQUN2QixDQUFDLENBQUE7UUFFRixJQUFHLEdBQUcsSUFBRSxDQUFDLEVBQUM7WUFDTixrQkFBUSxDQUFDLG1CQUFtQixDQUFDO2dCQUN6QixnQkFBZ0IsRUFBRSxXQUFXO2dCQUM3QixTQUFTLEVBQUMsTUFBTTthQUNuQixDQUFDLENBQUM7U0FDTjthQUFJO1lBQ0Qsa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDekIsZ0JBQWdCLEVBQUUsV0FBVztnQkFDN0IsU0FBUyxFQUFDLE1BQU07YUFDbkIsQ0FBQyxDQUFDO1NBQ047SUFHTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCw2QkFBTSxHQUFOO1FBQUEsaUJBMENDO1FBeENHLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXZDLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7WUFDekIsZ0JBQWdCLEVBQUUsV0FBVztZQUM3QixTQUFTLEVBQUMsV0FBVztZQUNyQixjQUFjLEVBQUMsTUFBTTtTQUN4QixDQUFDLENBQUM7UUFFSCxzQkFBWSxDQUFDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLFdBQVcsRUFBQztZQUV2QyxjQUFJLENBQUMsU0FBUyxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsZ0RBQWdEO1lBRWhELGNBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ1osR0FBRyxFQUFDLG1CQUFRLENBQUMsZ0JBQWdCO2dCQUM3QixPQUFPLEVBQUMsVUFBQSxHQUFHO29CQUNQLElBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFDO3dCQUNiLE9BQU87cUJBQ1Y7b0JBRUQsSUFBRyxHQUFHLElBQUUsSUFBSSxFQUFDO3dCQUNULHFCQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNsQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ2pCLE9BQU87cUJBQ1Y7b0JBQ0QsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsRUFBQyxFQUFDLElBQUksRUFBQyxLQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFJLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO29CQUM5RSxxQkFBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUMsS0FBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0MsY0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLGtCQUFRLENBQUMsaUJBQWlCLENBQUM7d0JBQ3ZCLGNBQWMsRUFBRSxXQUFXO3dCQUMzQixJQUFJLEVBQUMsS0FBSSxDQUFDLElBQUk7cUJBQ2pCLENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBQzdDLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRTtZQUNDLHFCQUFTLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDSSxzQkFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsd0JBQXdCO0lBQ3JHLENBQUM7SUFHRCxnQ0FBUyxHQUFUO1FBQ0ksc0JBQVksQ0FBQyxVQUFVLENBQUMsdUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFRLEVBQUU7UUFFTixJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7WUFDaEMsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUM7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQzthQUM5QjtTQUNKO0lBRUwsQ0FBQztJQXJPRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQztrREFDWDtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQztrREFDWjtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQztrREFDWDtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsQ0FBQzttREFDZDtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQzt1REFDTjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQzt1REFDTjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQztrREFDVjtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsQ0FBQztpREFDZDtJQUkvQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQzs4Q0FDZDtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxXQUFXLENBQUMsZUFBZSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQzttREFDWDtJQU9yRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQzttREFDVjtJQXRDaEIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXlPaEM7SUFBRCxtQkFBQztDQXpPRCxBQXlPQyxDQXpPeUMsZ0JBQU0sR0F5Ty9DO2tCQXpPb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVUcmVhc3VyZSBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUHJvZ3Jlc3NCYXIsZGlzcGxheU5hbWU6XCLov5vluqbmnaFcIn0pXG4gICAgcHJpdmF0ZSBwcm9ncmVzczpjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlrp3nrrHpobXpnaJcIn0pXG4gICAgcHJpdmF0ZSBjb250ZW50MTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIumHkeW4gemhtVwifSlcbiAgICBwcml2YXRlIGNvbnRlbnQyOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi6YeR5biBbGFiZWxcIn0pXG4gICAgcHJpdmF0ZSBjb2luTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlhbPpl60xXCJ9KVxuICAgIHByaXZhdGUgY2xvc2VCdG5Ob2RlMTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFs+mXrTJcIn0pXG4gICAgcHJpdmF0ZSBjbG9zZUJ0bk5vZGUyOmNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi6YeR5biBXCJ9KVxuICAgIHByaXZhdGUgZ29sZE5vZGU6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLph5HluIFCb3hcIn0pXG4gICAgcHJpdmF0ZSBnb2xkQm94OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLmiYvmjIdcIn0pXG4gICAgcHJpdmF0ZSBoYW5kOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSxkaXNwbGF5TmFtZTpcIuWuneeusemqqOmqvFwifSlcbiAgICBwcml2YXRlIGJveERyYWdvbjpkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLlBhcnRpY2xlU3lzdGVtLGRpc3BsYXlOYW1lOlwi57KS5a2QXCJ9KVxuICAgIC8vIHByaXZhdGUgUGFydGljbGU6Y2MuUGFydGljbGVTeXN0ZW0gPSBudWxsO1xuXG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLkv6Hmga/mtYFcIn0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgLyoq6YeR5biBICovXG4gICAgcHJpdmF0ZSBjb2luOm51bWJlciA9IDA7XG5cbiAgICAvL+WuneeusWlkXG4gICAgcHJpdmF0ZSBpZDpudW1iZXIgPSBudWxsO1xuXG4gICAgLy/mmK/lkKbmkq3mlL5cbiAgICBwcml2YXRlIGlzUnVuaW5nOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8v54K55Ye75qyh5pWwXG4gICAgcHJpdmF0ZSBjbGlja051bTpudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBpc1N0YXJ0OmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwO1xuICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZTEuYWN0aXZlID0gdGhpcy5jbG9zZUJ0bk5vZGUyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZTEuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSxnYW1lTnVtZXJpY2FsLmNsb3NlVGltZSk7XG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgaW5pdChkYXRhKXtcbiAgICAgICAgLy8gdGhpcy5pZCA9IGRhdGE7XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuaXNTdGFydCA9IHRydWU7XG5cbiAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfdHJlYXN1cmUoe1xuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5ryC5rWu5a6d566x5by556qXXCIsXG4gICAgICAgIH0pXG5cbiAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDpVcmxDb25zdC50cmVhc3VyZUJveF9yZXNpZHVhbCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvaW4gPSByZXMuY29pbjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW5MYWJlbC5zdHJpbmcgPVwiK1wiKyB0aGlzLmNvaW4rXCLnuqLljIXluIFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy/pooTliqDovb3lrp3nrrFcbiAgICAgICAgaWYoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5UcmVhc3VyZUJveF0pe1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5UcmVhc3VyZUJveCk7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7tcbiAgICAgKi9cbiAgICBjbGlja0J0bigpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyArPSAuMTtcbiAgICAgICAgLy8gdGhpcy5QYXJ0aWNsZS5yZXNldFN5c3RlbSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUdvbGQoKTtcbiAgICAgICAgdGhpcy5ib3hEcmFnb24ucGxheUFuaW1hdGlvbihcInNoYWtlLXJlZFwiLDEpO1xuICAgICAgICB0aGlzLmNsaWNrTnVtKys7XG4gICAgICAgIGlmKHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3M+PTEpe1xuICAgICAgICAgICAgdGhpcy5pc1N0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQxLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Mi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZTIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sZ2FtZU51bWVyaWNhbC5jbG9zZVRpbWUpO1xuXG4gICAgICAgICAgICBUcmFja01nci5haXJib3JuZV90cmVhc3VyZSh7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi54K55Ye744CM56C45byA5a6d566x44CN5oyJ6ZKuXCIsXG4gICAgICAgICAgICAgICAgYnV0dG9uOnRoaXMuY2xpY2tOdW0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m66ZmN5a6d566x77yI5pyq56C45byA77yJXCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOlwi54uC54K556C45byAXCIsXG4gICAgICAgICAgICB9KTsgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoq5Lqn6YeR5biBICovXG4gICAgY3JlYXRlR29sZCgpe1xuXG4gICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdvbGROb2RlKTtcbiAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLmdvbGRCb3gpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6Zet55qEXG4gICAgICovXG4gICAgY2xvc2VCdG4oZSxyZXMpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgLy8gdXRpbC5zYXZlVHJlYXN1cmVEYXRhKHRoaXMuaWQpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICBUcmFja01nci5haXJib3JuZV90cmVhc3VyZSh7XG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLngrnlh7vjgIzmlL7lvIPlpZblirHjgI3mjInpkq5cIixcbiAgICAgICAgICAgIGNvaW46dGhpcy5jb2luLFxuICAgICAgICAgICAgZ2V0Y29pbl9zdGF0dXM6ZmFsc2VcbiAgICAgICAgfSlcblxuICAgICAgICBpZihyZXM9PTApe1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnqbrpmY3lrp3nrrHvvIjmnKrnoLjlvIDvvIlcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLmrovlv43mlL7lvINcIixcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuumZjeWuneeuse+8iOW3sueguOW8gO+8iVwiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTpcIuaUvuW8g+mihuWPllwiLFxuICAgICAgICAgICAgfSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aKe5Yqg6YeR5biBXG4gICAgICovXG4gICAgZ2V0QnRuKCl7XG5cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuumZjeWuneeuse+8iOW3sueguOW8gO+8iVwiLFxuICAgICAgICAgICAgY2tfbW9kdWxlOlwi6aKG5Y+WMTAwMOe6ouWMheW4gVwiLFxuICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6XCLmv4DlirHop4bpopFcIlxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5UcmVhc3VyZUJveCwoKT0+e1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRyZWFzdXJlQm94KTtcbiAgICAgICAgICAgIC8vIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UcmVhc3VyZV9TdGFydFRpbWUpO1xuXG4gICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgIHVybDpVcmxDb25zdC50cmVhc3VyZUJveF9nZXQyLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocmVzPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLlrp3nrrHov5jmnKrliLDml7bpl7RcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbix7bm9kZTp0aGlzLm5vZGUsdmFsdWU6dGhpcy5jb2luLG51bToxMH0pO1xuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635b6XXCIrdGhpcy5jb2luK1wi57qi5YyF5biBXCIpO1xuICAgICAgICAgICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMuY29pbik7XG4gICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFpcmJvcm5lX3RyZWFzdXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIueCueWHu+OAjOmihumHkeW4geOAjeaMiemSrlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29pbjp0aGlzLmNvaW5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UcmVhc3VyZV9TdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkgeyAgIFxuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLlRyZWFzdXJlQm94VmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5UcmVhc3VyZUJveFZpZXcpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUgKGR0KSB7XG5cbiAgICAgICAgaWYodGhpcy5pc1N0YXJ0KXtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgLT0gMC4wMDM7XG4gICAgICAgICAgICBpZih0aGlzLnByb2dyZXNzLnByb2dyZXNzPDApe1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=