
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
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
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
    };
    gameTreasure.prototype.onEnable = function () {
    };
    gameTreasure.prototype.onDisable = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUcmVhc3VyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBRXBDLDJDQUFpRDtBQUNqRCwyQ0FBc0M7QUFDdEMsK0NBQThDO0FBRTlDLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFNO0lBQWhEO1FBQUEscUVBME5DO1FBdk5XLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUl4QixVQUFJLEdBQVksSUFBSSxDQUFDO1FBR3JCLGVBQVMsR0FBZ0MsSUFBSSxDQUFDO1FBRXRELHVEQUF1RDtRQUN2RCw2Q0FBNkM7UUFJckMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUVsQyxRQUFRO1FBQ0EsVUFBSSxHQUFXLENBQUMsQ0FBQztRQUV6QixNQUFNO1FBQ0UsUUFBRSxHQUFXLElBQUksQ0FBQztRQUUxQixNQUFNO1FBQ0UsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUVsQyxNQUFNO1FBQ0UsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixhQUFPLEdBQVksS0FBSyxDQUFDOztJQXNLckMsQ0FBQztJQXBLRyw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5RCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUdsQyxDQUFDO0lBRUQsNEJBQUssR0FBTDtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNyQyxDQUFDLEVBQUUsc0JBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUdoQyxDQUFDO0lBRUQsMkJBQUksR0FBSixVQUFLLElBQUk7UUFDTCxrQkFBa0I7UUFEdEIsaUJBeUJDO1FBckJHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBCLGtCQUFRLENBQUMsaUJBQWlCLENBQUM7WUFDdkIsY0FBYyxFQUFFLFFBQVE7U0FDM0IsQ0FBQyxDQUFBO1FBRUYsY0FBSSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxtQkFBUSxDQUFDLG9CQUFvQjtZQUNsQyxPQUFPLEVBQUUsVUFBQSxHQUFHO2dCQUNSLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFO29CQUNmLE9BQU87aUJBQ1Y7Z0JBRUQsS0FBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNyQixLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDcEQsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUtQLENBQUM7SUFFRDs7T0FFRztJQUNILCtCQUFRLEdBQVI7UUFBQSxpQkF5QkM7UUF4QkcseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQzdCLCtCQUErQjtRQUMvQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLENBQUMsRUFBRSxzQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTVCLGtCQUFRLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3ZCLGNBQWMsRUFBRSxZQUFZO2dCQUM1QixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQyxDQUFDO1lBQ0gsa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDekIsZ0JBQWdCLEVBQUUsV0FBVztnQkFDN0IsU0FBUyxFQUFFLE1BQU07YUFDcEIsQ0FBQyxDQUFDO1NBQ047SUFFTCxDQUFDO0lBRUQsU0FBUztJQUNULGlDQUFVLEdBQVY7UUFFSSxJQUFJLElBQUksR0FBWSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCwrQkFBUSxHQUFSLFVBQVMsQ0FBQyxFQUFFLEdBQUc7UUFDWCx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QyxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGtCQUFRLENBQUMsaUJBQWlCLENBQUM7WUFDdkIsY0FBYyxFQUFFLFlBQVk7WUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsY0FBYyxFQUFFLEtBQUs7U0FDeEIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ1Ysa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDekIsZ0JBQWdCLEVBQUUsV0FBVztnQkFDN0IsU0FBUyxFQUFFLE1BQU07YUFDcEIsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILGtCQUFRLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3pCLGdCQUFnQixFQUFFLFdBQVc7Z0JBQzdCLFNBQVMsRUFBRSxNQUFNO2FBQ3BCLENBQUMsQ0FBQztTQUNOO0lBR0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNkJBQU0sR0FBTjtRQUFBLGlCQWdDQztRQTlCRyx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUt2QyxjQUFJLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLG1CQUFRLENBQUMsZ0JBQWdCO1lBQzlCLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBQ1IsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2YsT0FBTztpQkFDVjtnQkFFRCxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7b0JBQ2IscUJBQVMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2xDLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsT0FBTztpQkFDVjtnQkFDRCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3RGLHFCQUFTLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNqRCxjQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsa0JBQVEsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDdkIsY0FBYyxFQUFFLFdBQVc7b0JBQzNCLElBQUksRUFBRSxLQUFJLENBQUMsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO2dCQUNILEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDN0MsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLENBQUM7U0FDSixDQUFDLENBQUM7SUFHUCxDQUFDO0lBRUQsK0JBQVEsR0FBUjtJQUNBLENBQUM7SUFHRCxnQ0FBUyxHQUFUO0lBQ0EsQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBTyxFQUFFO1FBRUwsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDO1lBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDOUI7U0FDSjtJQUVMLENBQUM7SUF0TkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7a0RBQ2Y7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7a0RBQ2hCO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO2tEQUNmO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDO21EQUNsQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQzt1REFDVjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQzt1REFDVjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztrREFDZDtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQztpREFDbEI7SUFJaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7OENBQ2xCO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO21EQUNmO0lBT3REO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO21EQUNkO0lBdENqQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBME5oQztJQUFELG1CQUFDO0NBMU5ELEFBME5DLENBMU55QyxnQkFBTSxHQTBOL0M7a0JBMU5vQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBnYW1lTnVtZXJpY2FsIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lVHJlYXN1cmUgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsIGRpc3BsYXlOYW1lOiBcIui/m+W6puadoVwiIH0pXG4gICAgcHJpdmF0ZSBwcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5a6d566x6aG16Z2iXCIgfSlcbiAgICBwcml2YXRlIGNvbnRlbnQxOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIumHkeW4gemhtVwiIH0pXG4gICAgcHJpdmF0ZSBjb250ZW50MjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi6YeR5biBbGFiZWxcIiB9KVxuICAgIHByaXZhdGUgY29pbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLlhbPpl60xXCIgfSlcbiAgICBwcml2YXRlIGNsb3NlQnRuTm9kZTE6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5YWz6ZetMlwiIH0pXG4gICAgcHJpdmF0ZSBjbG9zZUJ0bk5vZGUyOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIumHkeW4gVwiIH0pXG4gICAgcHJpdmF0ZSBnb2xkTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLph5HluIFCb3hcIiB9KVxuICAgIHByaXZhdGUgZ29sZEJveDogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuaJi+aMh1wiIH0pXG4gICAgcHJpdmF0ZSBoYW5kOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSwgZGlzcGxheU5hbWU6IFwi5a6d566x6aqo6aq8XCIgfSlcbiAgICBwcml2YXRlIGJveERyYWdvbjogZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5ID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5QYXJ0aWNsZVN5c3RlbSxkaXNwbGF5TmFtZTpcIueykuWtkFwifSlcbiAgICAvLyBwcml2YXRlIFBhcnRpY2xlOmNjLlBhcnRpY2xlU3lzdGVtID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5L+h5oGv5rWBXCIgfSlcbiAgICBwcml2YXRlIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvKirph5HluIEgKi9cbiAgICBwcml2YXRlIGNvaW46IG51bWJlciA9IDA7XG5cbiAgICAvL+WuneeusWlkXG4gICAgcHJpdmF0ZSBpZDogbnVtYmVyID0gbnVsbDtcblxuICAgIC8v5piv5ZCm5pKt5pS+XG4gICAgcHJpdmF0ZSBpc1J1bmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy/ngrnlh7vmrKHmlbBcbiAgICBwcml2YXRlIGNsaWNrTnVtOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBpc1N0YXJ0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwO1xuICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZTEuYWN0aXZlID0gdGhpcy5jbG9zZUJ0bk5vZGUyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcblxuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG5Ob2RlMS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9LCBnYW1lTnVtZXJpY2FsLmNsb3NlVGltZSk7XG5cblxuICAgIH1cblxuICAgIGluaXQoZGF0YSkge1xuICAgICAgICAvLyB0aGlzLmlkID0gZGF0YTtcblxuXG4gICAgICAgIHRoaXMuaXNTdGFydCA9IHRydWU7XG5cbiAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfdHJlYXN1cmUoe1xuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5ryC5rWu5a6d566x5by556qXXCIsXG4gICAgICAgIH0pXG5cbiAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QudHJlYXN1cmVCb3hfcmVzaWR1YWwsXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvaW4gPSByZXMuY29pbjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW5MYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMuY29pbiArIFwi57qi5YyF5biBXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog54K55Ye7XG4gICAgICovXG4gICAgY2xpY2tCdG4oKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzICs9IC4xO1xuICAgICAgICAvLyB0aGlzLlBhcnRpY2xlLnJlc2V0U3lzdGVtKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlR29sZCgpO1xuICAgICAgICB0aGlzLmJveERyYWdvbi5wbGF5QW5pbWF0aW9uKFwic2hha2UtcmVkXCIsIDEpO1xuICAgICAgICB0aGlzLmNsaWNrTnVtKys7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzLnByb2dyZXNzID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50MS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudDIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZTIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIGdhbWVOdW1lcmljYWwuY2xvc2VUaW1lKTtcblxuICAgICAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfdHJlYXN1cmUoe1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIueCueWHu+OAjOeguOW8gOWuneeuseOAjeaMiemSrlwiLFxuICAgICAgICAgICAgICAgIGJ1dHRvbjogdGhpcy5jbGlja051bSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnqbrpmY3lrp3nrrHvvIjmnKrnoLjlvIDvvIlcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi54uC54K556C45byAXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoq5Lqn6YeR5biBICovXG4gICAgY3JlYXRlR29sZCgpIHtcblxuICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ29sZE5vZGUpO1xuICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGl0ZW0uc2V0UGFyZW50KHRoaXMuZ29sZEJveCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63nmoRcbiAgICAgKi9cbiAgICBjbG9zZUJ0bihlLCByZXMpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIC8vIHV0aWwuc2F2ZVRyZWFzdXJlRGF0YSh0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfdHJlYXN1cmUoe1xuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi54K55Ye744CM5pS+5byD5aWW5Yqx44CN5oyJ6ZKuXCIsXG4gICAgICAgICAgICBjb2luOiB0aGlzLmNvaW4sXG4gICAgICAgICAgICBnZXRjb2luX3N0YXR1czogZmFsc2VcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAocmVzID09IDApIHtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m66ZmN5a6d566x77yI5pyq56C45byA77yJXCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaui+W/jeaUvuW8g1wiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuumZjeWuneeuse+8iOW3sueguOW8gO+8iVwiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLmlL7lvIPpooblj5ZcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWinuWKoOmHkeW4gVxuICAgICAqL1xuICAgIGdldEJ0bigpIHtcblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuXG5cblxuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC50cmVhc3VyZUJveF9nZXQyLFxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLlrp3nrrHov5jmnKrliLDml7bpl7RcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMubm9kZSwgdmFsdWU6IHRoaXMuY29pbiwgbnVtOiAxMCB9KTtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635b6XXCIgKyB0aGlzLmNvaW4gKyBcIue6ouWMheW4gVwiKTtcbiAgICAgICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMuY29pbik7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfdHJlYXN1cmUoe1xuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLngrnlh7vjgIzpoobph5HluIHjgI3mjInpkq5cIixcbiAgICAgICAgICAgICAgICAgICAgY29pbjogdGhpcy5jb2luXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1RyZWFzdXJlX1N0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgLT0gMC4wMDM7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufVxuIl19