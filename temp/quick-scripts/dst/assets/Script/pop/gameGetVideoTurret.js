
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameGetVideoTurret.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fbbb2nsft5NE7ERfVSvEzxD', 'gameGetVideoTurret');
// Script/pop/gameGetVideoTurret.ts

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
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameGetVideoTurret = /** @class */ (function (_super) {
    __extends(gameGetVideoTurret, _super);
    function gameGetVideoTurret() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.turretBody = null;
        _this.turretFoot = null;
        _this.closeBtnNode = null;
        _this.feed_node = null;
        /**金币 */
        _this.num = 0;
        return _this;
        // update (dt) {}
    }
    gameGetVideoTurret.prototype.onLoad = function () {
    };
    gameGetVideoTurret.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        var _this = this;
        this.scheduleOnce(function () {
            _this.closeBtnNode.active = true;
        }, faceTs_1.gameNumerical.closeTime);
    };
    /**初始化 */
    gameGetVideoTurret.prototype.init = function (data) {
        var _this = this;
        var level = util_1.default.getBuyRandomLevel();
        this.initData = util_1.default.GetTurretData(level);
        // this.num = tool.GetRandom(8,12);
        this.num = data.num || tool_1.default.GetRandom(8, 12);
        this.numLabel.string = "+" + this.num + "炮塔";
        this.loadSprite("body", function (res) {
            _this.turretBody && (_this.turretBody.spriteFrame = res);
        });
        this.loadSprite("foot", function (res) {
            if (_this.turretFoot && res) {
                _this.turretFoot.node.active = true;
                _this.turretFoot.spriteFrame = res;
            }
            else {
                _this.turretFoot.node.active = false;
            }
            if (Number(_this.initData.spriteFootY) > 0) {
                _this.turretFoot && (_this.turretFoot.node.y = Number(_this.initData.spriteFootY));
            }
        });
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.GetTurret]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.GetTurret);
        }
        // util.preloadAd(AdPosition.GetTurretView);
        // util.preloadAd(AdPosition.GetTurret);
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "看视频领取炮塔弹窗"
        });
    };
    /**
     * 获取
     */
    gameGetVideoTurret.prototype.getBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "看视频领取炮塔弹窗",
            ck_module: "领取",
            active_ad_hcdg: "激励视频"
        });
        AdController_1.default.loadAd(AdPosition_1.AdPosition.GetTurret, function (res) {
            if (util_1.default.adPreObj[AdPosition_1.AdPosition.GetTurret]) {
                util_1.default.preloadAd(AdPosition_1.AdPosition.GetTurret);
            }
            util_1.default.sendTurretNum();
            util_1.default.productTurret(_this.num);
            cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: _this.node, num: _this.num });
            AssistCtr_1.AssistCtr.showToastTip("获得" + _this.num + "个炮塔！");
            _this.closePage();
            util_1.default.userData.GetTurretNum -= 1;
            util_1.default.setStorage(util_1.default.localDiary.GetTurretNum, util_1.default.userData.GetTurretNum);
        }, function () {
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    /**关闭close */
    gameGetVideoTurret.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "看视频领取炮塔弹窗",
            ck_module: "关闭",
        });
    };
    /**
      * 加载图片
      */
    gameGetVideoTurret.prototype.loadSprite = function (name, call) {
        cc.resources.load(this.initData[name], cc.SpriteFrame, function (err, res) {
            if (err) {
                console.error("找不到该图片", err);
            }
            call(res);
        });
    };
    gameGetVideoTurret.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.GetTurretView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.GetTurretView]){
        //     util.preloadAd(AdPosition.GetTurretView,true);
        // } 
    };
    gameGetVideoTurret.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.GetTurretView);
    };
    __decorate([
        property({ type: cc.Label, displayName: "数量" })
    ], gameGetVideoTurret.prototype, "numLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔身" })
    ], gameGetVideoTurret.prototype, "turretBody", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔脚" })
    ], gameGetVideoTurret.prototype, "turretFoot", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "关闭" })
    ], gameGetVideoTurret.prototype, "closeBtnNode", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameGetVideoTurret.prototype, "feed_node", void 0);
    gameGetVideoTurret = __decorate([
        ccclass
    ], gameGetVideoTurret);
    return gameGetVideoTurret;
}(baseTs_1.default));
exports.default = gameGetVideoTurret;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHZXRWaWRlb1R1cnJldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBNkQ7QUFDN0QsMkNBQXNDO0FBRXRDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBZ0Qsc0NBQU07SUFBdEQ7UUFBQSxxRUFxSkM7UUFsSlcsY0FBUSxHQUFZLElBQUksQ0FBQztRQUVqQyw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBR3hCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFFakMsUUFBUTtRQUNBLFNBQUcsR0FBVSxDQUFDLENBQUM7O1FBK0h2QixpQkFBaUI7SUFDckIsQ0FBQztJQTVIRyxtQ0FBTSxHQUFOO0lBRUEsQ0FBQztJQUVELGtDQUFLLEdBQUw7UUFFSSxzQ0FBc0M7UUFDdEMsbURBQW1EO1FBQ25ELGFBQWE7UUFKakIsaUJBWUM7UUFMRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRWQsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXBDLENBQUMsRUFBQyxzQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTO0lBQ1QsaUNBQUksR0FBSixVQUFLLElBQUk7UUFBVCxpQkFrQ0M7UUFoQ0csSUFBSSxLQUFLLEdBQVUsY0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFNUMs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QztJQUN0RCxDQUFDO0lBaEpEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDO3dEQUNWO0lBTWpDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDOzBEQUNUO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDOzBEQUNUO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDOzREQUNOO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDO3lEQUNWO0lBbEJoQixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQXFKdEM7SUFBRCx5QkFBQztDQXJKRCxBQXFKQyxDQXJKK0MsZ0JBQU0sR0FxSnJEO2tCQXJKb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBnYW1lTnVtZXJpY2FsLCB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4uL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVHZXRWaWRlb1R1cnJldCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLmlbDph49cIn0pXG4gICAgcHJpdmF0ZSBudW1MYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSxkaXNwbGF5TmFtZTpcIueCruWhlOi6q1wifSlcbiAgICBwcml2YXRlIHR1cnJldEJvZHk6Y2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsZGlzcGxheU5hbWU6XCLngq7loZTohJpcIn0pXG4gICAgcHJpdmF0ZSB0dXJyZXRGb290OmNjLlNwcml0ZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlhbPpl61cIn0pXG4gICAgcHJpdmF0ZSBjbG9zZUJ0bk5vZGU6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLkv6Hmga/mtYFcIn0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgLyoq6YeR5biBICovXG4gICAgcHJpdmF0ZSBudW06bnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgaW5pdERhdGE6YW55O1xuXG4gICAgb25Mb2FkICgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmxpZ2h0KS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyAgICAgY2MudHdlZW4oKS50bygxLHtzY2FsZToxfSkudG8oMSx7c2NhbGU6MS4xfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG5Ob2RlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgfSxnYW1lTnVtZXJpY2FsLmNsb3NlVGltZSk7XG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyWICovXG4gICAgaW5pdChkYXRhKXtcbiAgICAgICAgXG4gICAgICAgIGxldCBsZXZlbDpudW1iZXIgPSB1dGlsLmdldEJ1eVJhbmRvbUxldmVsKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXREYXRhID0gdXRpbC5HZXRUdXJyZXREYXRhKGxldmVsKTtcbiAgICAgICAgLy8gdGhpcy5udW0gPSB0b29sLkdldFJhbmRvbSg4LDEyKTtcbiAgICAgICAgdGhpcy5udW0gPSBkYXRhLm51bXx8dG9vbC5HZXRSYW5kb20oOCwxMik7XG4gICAgICAgIHRoaXMubnVtTGFiZWwuc3RyaW5nID0gXCIrXCIrdGhpcy5udW0rXCLngq7loZRcIjtcblxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJib2R5XCIsKHJlcyk9PntcbiAgICAgICAgICAgIHRoaXMudHVycmV0Qm9keSYmKHRoaXMudHVycmV0Qm9keS5zcHJpdGVGcmFtZSA9IHJlcyk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZShcImZvb3RcIiwocmVzKT0+e1xuICAgICAgICAgICAgaWYodGhpcy50dXJyZXRGb290JiZyZXMpe1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290LnNwcml0ZUZyYW1lID0gcmVzXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKT4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290JiYodGhpcy50dXJyZXRGb290Lm5vZGUueSA9IE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdldFR1cnJldF0pe1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXRWaWV3KTtcbiAgICAgICAgLy8gdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXQpO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIueci+inhumikemihuWPlueCruWhlOW8ueeql1wiXG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIueci+inhumikemihuWPlueCruWhlOW8ueeql1wiLFxuICAgICAgICAgICAgY2tfbW9kdWxlOlwi6aKG5Y+WXCIsXG4gICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzpcIua/gOWKseinhumikVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXQsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5HZXRUdXJyZXRdKXtcbiAgICAgICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdldFR1cnJldCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgdXRpbC5zZW5kVHVycmV0TnVtKCk7IFxuICAgICAgICAgICAgdXRpbC5wcm9kdWN0VHVycmV0KHRoaXMubnVtKTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfdHVycmV0LHtub2RlOnRoaXMubm9kZSxudW06dGhpcy5udW19KTtcblxuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuiOt+W+l1wiK3RoaXMubnVtK1wi5Liq54Ku5aGU77yBXCIpO1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuXG4gICAgICAgICAgICB1dGlsLnVzZXJEYXRhLkdldFR1cnJldE51bS09MTtcblxuICAgICAgICAgICAgdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5HZXRUdXJyZXROdW0sdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKuWFs+mXrWNsb3NlICovXG4gICAgY2xvc2VCdG4oKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnnIvop4bpopHpooblj5bngq7loZTlvLnnqpdcIixcbiAgICAgICAgICAgIGNrX21vZHVsZTpcIuWFs+mXrVwiLFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mHXG4gICAgICovXG4gICAgbG9hZFNwcml0ZShuYW1lOnN0cmluZyxjYWxsOkZ1bmN0aW9uKXtcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodGhpcy5pbml0RGF0YVtuYW1lXSxjYy5TcHJpdGVGcmFtZSwoZXJyLHJlczpjYy5TcHJpdGVGcmFtZSk9PntcbiAgICAgICAgICAgIGlmKGVycil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaJvuS4jeWIsOivpeWbvueJh1wiLGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsKHJlcyk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLkdldFR1cnJldFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXG4gICAgICAgIC8vIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5HZXRUdXJyZXRWaWV3XSl7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdldFR1cnJldFZpZXcsdHJ1ZSk7XG4gICAgICAgIC8vIH0gXG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uR2V0VHVycmV0Vmlldyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=