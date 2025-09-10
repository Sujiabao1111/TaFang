
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUcmVhc3VyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBaUQ7QUFDakQsMkNBQXNDO0FBQ3RDLCtDQUE4QztBQUM5QyxzRUFBaUU7QUFDakUsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUFvT0M7UUFqT1csY0FBUSxHQUFrQixJQUFJLENBQUM7UUFHL0IsY0FBUSxHQUFXLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBR3hCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFHN0IsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFHN0IsY0FBUSxHQUFXLElBQUksQ0FBQztRQUd4QixhQUFPLEdBQVcsSUFBSSxDQUFDO1FBSXZCLFVBQUksR0FBVyxJQUFJLENBQUM7UUFHcEIsZUFBUyxHQUErQixJQUFJLENBQUM7UUFFckQsdURBQXVEO1FBQ3ZELDZDQUE2QztRQUlyQyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRWpDLFFBQVE7UUFDQSxVQUFJLEdBQVUsQ0FBQyxDQUFDO1FBRXhCLE1BQU07UUFDRSxRQUFFLEdBQVUsSUFBSSxDQUFDO1FBRXpCLE1BQU07UUFDRSxjQUFRLEdBQVcsS0FBSyxDQUFDO1FBRWpDLE1BQU07UUFDRSxjQUFRLEdBQVUsQ0FBQyxDQUFDO1FBRXBCLGFBQU8sR0FBVyxLQUFLLENBQUM7O0lBZ0xwQyxDQUFDO0lBOUtHLDZCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFB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QUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDOzhDQUNkO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxDQUFDO21EQUNYO0lBT3JEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDO21EQUNWO0lBdENoQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBb09oQztJQUFELG1CQUFDO0NBcE9ELEFBb09DLENBcE95QyxnQkFBTSxHQW9PL0M7a0JBcE9vQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBnYW1lTnVtZXJpY2FsIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVRyZWFzdXJlIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Qcm9ncmVzc0JhcixkaXNwbGF5TmFtZTpcIui/m+W6puadoVwifSlcbiAgICBwcml2YXRlIHByb2dyZXNzOmNjLlByb2dyZXNzQmFyID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWuneeusemhtemdolwifSlcbiAgICBwcml2YXRlIGNvbnRlbnQxOmNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi6YeR5biB6aG1XCJ9KVxuICAgIHByaXZhdGUgY29udGVudDI6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLph5HluIFsYWJlbFwifSlcbiAgICBwcml2YXRlIGNvaW5MYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFs+mXrTFcIn0pXG4gICAgcHJpdmF0ZSBjbG9zZUJ0bk5vZGUxOmNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YWz6ZetMlwifSlcbiAgICBwcml2YXRlIGNsb3NlQnRuTm9kZTI6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLph5HluIFcIn0pXG4gICAgcHJpdmF0ZSBnb2xkTm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIumHkeW4gUJveFwifSlcbiAgICBwcml2YXRlIGdvbGRCb3g6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuaJi+aMh1wifSlcbiAgICBwcml2YXRlIGhhbmQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6ZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5LGRpc3BsYXlOYW1lOlwi5a6d566x6aqo6aq8XCJ9KVxuICAgIHByaXZhdGUgYm94RHJhZ29uOmRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuUGFydGljbGVTeXN0ZW0sZGlzcGxheU5hbWU6XCLnspLlrZBcIn0pXG4gICAgLy8gcHJpdmF0ZSBQYXJ0aWNsZTpjYy5QYXJ0aWNsZVN5c3RlbSA9IG51bGw7XG5cbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuS/oeaBr+a1gVwifSlcbiAgICBwcml2YXRlIGZlZWRfbm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICAvKirph5HluIEgKi9cbiAgICBwcml2YXRlIGNvaW46bnVtYmVyID0gMDtcblxuICAgIC8v5a6d566xaWRcbiAgICBwcml2YXRlIGlkOm51bWJlciA9IG51bGw7XG5cbiAgICAvL+aYr+WQpuaSreaUvlxuICAgIHByaXZhdGUgaXNSdW5pbmc6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy/ngrnlh7vmrKHmlbBcbiAgICBwcml2YXRlIGNsaWNrTnVtOm51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGlzU3RhcnQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IDA7XG4gICAgICAgIHRoaXMuY2xvc2VCdG5Ob2RlMS5hY3RpdmUgPSB0aGlzLmNsb3NlQnRuTm9kZTIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG5Ob2RlMS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9LGdhbWVOdW1lcmljYWwuY2xvc2VUaW1lKTtcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBpbml0KGRhdGEpe1xuICAgICAgICAvLyB0aGlzLmlkID0gZGF0YTtcbiAgICAgICAgXG5cbiAgICAgICAgdGhpcy5pc1N0YXJ0ID0gdHJ1ZTtcblxuICAgICAgICBUcmFja01nci5haXJib3JuZV90cmVhc3VyZSh7XG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLmvILmta7lrp3nrrHlvLnnqpdcIixcbiAgICAgICAgfSlcblxuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOlVybENvbnN0LnRyZWFzdXJlQm94X3Jlc2lkdWFsLFxuICAgICAgICAgICAgc3VjY2VzczpyZXM9PntcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY29pbiA9IHJlcy5jb2luO1xuICAgICAgICAgICAgICAgIHRoaXMuY29pbkxhYmVsLnN0cmluZyA9XCIrXCIrIHRoaXMuY29pbitcIue6ouWMheW4gVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL+mihOWKoOi9veWuneeusVxuICAgICAgICBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlRyZWFzdXJlQm94XSl7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRyZWFzdXJlQm94KTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeCueWHu1xuICAgICAqL1xuICAgIGNsaWNrQnRuKCl7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzICs9IC4xO1xuICAgICAgICAvLyB0aGlzLlBhcnRpY2xlLnJlc2V0U3lzdGVtKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlR29sZCgpO1xuICAgICAgICB0aGlzLmJveERyYWdvbi5wbGF5QW5pbWF0aW9uKFwic2hha2UtcmVkXCIsMSk7XG4gICAgICAgIHRoaXMuY2xpY2tOdW0rKztcbiAgICAgICAgaWYodGhpcy5wcm9ncmVzcy5wcm9ncmVzcz49MSl7XG4gICAgICAgICAgICB0aGlzLmlzU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudDEuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VCdG5Ob2RlMi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSxnYW1lTnVtZXJpY2FsLmNsb3NlVGltZSk7XG5cbiAgICAgICAgICAgIFRyYWNrTWdyLmFpcmJvcm5lX3RyZWFzdXJlKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLngrnlh7vjgIznoLjlvIDlrp3nrrHjgI3mjInpkq5cIixcbiAgICAgICAgICAgICAgICBidXR0b246dGhpcy5jbGlja051bSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnqbrpmY3lrp3nrrHvvIjmnKrnoLjlvIDvvIlcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLni4LngrnnoLjlvIBcIixcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvKirkuqfph5HluIEgKi9cbiAgICBjcmVhdGVHb2xkKCl7XG5cbiAgICAgICAgbGV0IGl0ZW06Y2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ29sZE5vZGUpO1xuICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGl0ZW0uc2V0UGFyZW50KHRoaXMuZ29sZEJveCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63nmoRcbiAgICAgKi9cbiAgICBjbG9zZUJ0bihlLHJlcyl7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICAvLyB1dGlsLnNhdmVUcmVhc3VyZURhdGEodGhpcy5pZCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIFRyYWNrTWdyLmFpcmJvcm5lX3RyZWFzdXJlKHtcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIueCueWHu+OAjOaUvuW8g+WlluWKseOAjeaMiemSrlwiLFxuICAgICAgICAgICAgY29pbjp0aGlzLmNvaW4sXG4gICAgICAgICAgICBnZXRjb2luX3N0YXR1czpmYWxzZVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmKHJlcz09MCl7XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuumZjeWuneeuse+8iOacqueguOW8gO+8iVwiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTpcIuaui+W/jeaUvuW8g1wiLFxuICAgICAgICAgICAgfSk7IFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m66ZmN5a6d566x77yI5bey56C45byA77yJXCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOlwi5pS+5byD6aKG5Y+WXCIsXG4gICAgICAgICAgICB9KTsgXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlop7liqDph5HluIFcbiAgICAgKi9cbiAgICBnZXRCdG4oKXtcblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5UcmVhc3VyZUJveCwoKT0+e1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlRyZWFzdXJlQm94KTtcbiAgICAgICAgICAgIC8vIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UcmVhc3VyZV9TdGFydFRpbWUpO1xuXG4gICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgIHVybDpVcmxDb25zdC50cmVhc3VyZUJveF9nZXQyLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocmVzPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLlrp3nrrHov5jmnKrliLDml7bpl7RcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbix7bm9kZTp0aGlzLm5vZGUsdmFsdWU6dGhpcy5jb2luLG51bToxMH0pO1xuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635b6XXCIrdGhpcy5jb2luK1wi57qi5YyF5biBXCIpO1xuICAgICAgICAgICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMuY29pbik7XG4gICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFpcmJvcm5lX3RyZWFzdXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIueCueWHu+OAjOmihumHkeW4geOAjeaMiemSrlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29pbjp0aGlzLmNvaW5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UcmVhc3VyZV9TdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkgeyAgIFxuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLlRyZWFzdXJlQm94VmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5UcmVhc3VyZUJveFZpZXcpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUgKGR0KSB7XG5cbiAgICAgICAgaWYodGhpcy5pc1N0YXJ0KXtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgLT0gMC4wMDM7XG4gICAgICAgICAgICBpZih0aGlzLnByb2dyZXNzLnByb2dyZXNzPDApe1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=