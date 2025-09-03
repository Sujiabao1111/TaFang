"use strict";
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