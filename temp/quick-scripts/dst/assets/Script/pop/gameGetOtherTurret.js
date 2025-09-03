
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameGetOtherTurret.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7b077XHhedFDYlazoDAQKP+', 'gameGetOtherTurret');
// Script/pop/gameGetOtherTurret.ts

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
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameGetOtherTurret = /** @class */ (function (_super) {
    __extends(gameGetOtherTurret, _super);
    function gameGetOtherTurret() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.turretBody = null;
        _this.turretFoot = null;
        _this.multipleNode = null;
        _this.lable_addGold2 = null;
        _this.ArrBtn = [];
        _this.feed_node = null;
        /**金币 */
        _this.num = 0;
        _this.isVideo = false;
        return _this;
        // update (dt) {}
    }
    gameGetOtherTurret.prototype.onLoad = function () {
    };
    gameGetOtherTurret.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**初始化 */
    gameGetOtherTurret.prototype.init = function (data) {
        var _this = this;
        this.initData = util_1.default.GetTurretData(data);
        // this.num = tool.GetRandom(3,8);
        this.num = 2;
        this.numLabel.string = "+" + this.num + "炮塔";
        this.lable_addGold2.string = this.num * 3 + "";
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
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.GetOtherTurret]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.GetOtherTurret);
        }
        this.ArrBtn[0].active = this.ArrBtn[1].active = true;
        this.ArrBtn[2].active = false;
        this.isVideo = false;
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "额外获得炮塔弹窗",
        });
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "空降炮塔弹窗",
        });
    };
    /**
     * 获取
     */
    gameGetOtherTurret.prototype.getBtn = function (e, res) {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        var isVideo = res == 1; //是否看视频
        if (isVideo) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.GetOtherTurret, function () {
                _this.isVideo = true;
                _this.successFn();
                util_1.default.preloadAd(AdPosition_1.AdPosition.GetOtherTurret);
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }
        else {
            this.successFn();
        }
    };
    /**获取宝塔 */
    gameGetOtherTurret.prototype.successFn = function () {
        var num = this.num * (this.isVideo ? 3 : 1);
        this.closePage();
        util_1.default.userData.airborneCount -= 1;
        // this.showPage(pageTs.pageName.GameGetTurret,{num,name:pageTs.pageName.GameGetOtherTurret}); 
        util_1.default.productTurret(num);
        cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: this.node, num: num });
        AssistCtr_1.AssistCtr.showToastTip("获得" + num + "个炮塔！");
        util_1.default.post({
            url: UrlConst_1.UrlConst.receiveAirborneBattery,
            success: function (res) {
                console.log("扣除成功");
            },
            fail: function () {
                console.log("扣除失败");
            }
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "空降炮塔弹窗",
            ck_module: this.isVideo ? "观看视频" : "立即领取"
        });
        if (this.isVideo) {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "额外获得炮塔弹窗",
                ck_module: "翻倍领取",
                active_ad_hcdg: "激励视频"
            });
        }
        else {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "额外获得炮塔弹窗",
                ck_module: "直接收下"
            });
        }
    };
    /**看完视频 */
    gameGetOtherTurret.prototype.videoShow = function () {
        this.numLabel.string = "+" + this.num * (this.isVideo ? 3 : 1);
        this.ArrBtn[0].active = this.ArrBtn[1].active = false;
        this.ArrBtn[2].active = true;
    };
    /**
      * 加载图片
      */
    gameGetOtherTurret.prototype.loadSprite = function (name, call) {
        cc.resources.load(this.initData[name], cc.SpriteFrame, function (err, res) {
            if (err) {
                console.error("找不到该图片", err);
            }
            call(res);
        });
    };
    gameGetOtherTurret.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.GetOtherTurretView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.GetOtherTurretView]){
        //     util.preloadAd(AdPosition.GetOtherTurretView,true);
        // } 
    };
    gameGetOtherTurret.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.GetOtherTurretView);
    };
    __decorate([
        property({ type: cc.Label, displayName: "数量" })
    ], gameGetOtherTurret.prototype, "numLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔身" })
    ], gameGetOtherTurret.prototype, "turretBody", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔脚" })
    ], gameGetOtherTurret.prototype, "turretFoot", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameGetOtherTurret.prototype, "multipleNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数金币" })
    ], gameGetOtherTurret.prototype, "lable_addGold2", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "按钮" })
    ], gameGetOtherTurret.prototype, "ArrBtn", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameGetOtherTurret.prototype, "feed_node", void 0);
    gameGetOtherTurret = __decorate([
        ccclass
    ], gameGetOtherTurret);
    return gameGetOtherTurret;
}(baseTs_1.default));
exports.default = gameGetOtherTurret;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHZXRPdGhlclR1cnJldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUVsRCwyQ0FBc0M7QUFFdEMsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFDakQsaURBQTRDO0FBRTVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFnRCxzQ0FBTTtJQUF0RDtRQUFBLHFFQXFNQztRQWxNVyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBRWpDLDRDQUE0QztRQUM1QyxnQ0FBZ0M7UUFHeEIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHNUIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFHL0IsWUFBTSxHQUFhLEVBQUUsQ0FBQztRQUd0QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRWpDLFFBQVE7UUFDQSxTQUFHLEdBQVUsQ0FBQyxDQUFDO1FBSWYsYUFBTyxHQUFXLEtBQUssQ0FBQzs7UUFxS2hDLGlCQUFpQjtJQUNyQixDQUFDO0lBcEtHLG1DQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsa0NBQUssR0FBTDtRQUVJLHNDQUFzQztRQUN0QyxtREFBbUQ7UUFDbkQsYUFBYTtRQUNiLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FDckMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxF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RHRDLE9BQU87T0FDYSxrQkFBa0IsQ0FxTXRDO0lBQUQseUJBQUM7Q0FyTUQsQUFxTUMsQ0FyTStDLGdCQUFNLEdBcU1yRDtrQkFyTW9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgdXBkYXRlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4uL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVHZXRPdGhlclR1cnJldCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLmlbDph49cIn0pXG4gICAgcHJpdmF0ZSBudW1MYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSxkaXNwbGF5TmFtZTpcIueCruWhlOi6q1wifSlcbiAgICBwcml2YXRlIHR1cnJldEJvZHk6Y2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsZGlzcGxheU5hbWU6XCLngq7loZTohJpcIn0pXG4gICAgcHJpdmF0ZSB0dXJyZXRGb290OmNjLlNwcml0ZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlgI3mlbBcIn0pXG4gICAgcHJpdmF0ZSBtdWx0aXBsZU5vZGU6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5YCN5pWw6YeR5biBXCJ9KVxuICAgIHByaXZhdGUgbGFibGVfYWRkR29sZDI6Y2MuTGFiZWwgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbY2MuTm9kZV0sZGlzcGxheU5hbWU6XCLmjInpkq5cIn0pXG4gICAgcHJpdmF0ZSBBcnJCdG46Y2MuTm9kZVtdID0gW107XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLkv6Hmga/mtYFcIn0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgLyoq6YeR5biBICovXG4gICAgcHJpdmF0ZSBudW06bnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgaW5pdERhdGE6YW55O1xuXG4gICAgcHJpdmF0ZSBpc1ZpZGVvOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5saWdodCkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkudG8oMSx7c2NhbGU6MX0pLnRvKDEse3NjYWxlOjEuMX0pXG4gICAgICAgIC8vICkuc3RhcnQoKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5tdWx0aXBsZU5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLHthbmdsZToxMH0pLnRvKC4yLHthbmdsZTowfSlcbiAgICAgICAgKS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoZGF0YSl7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IHV0aWwuR2V0VHVycmV0RGF0YShkYXRhKTtcblxuICAgICAgICAvLyB0aGlzLm51bSA9IHRvb2wuR2V0UmFuZG9tKDMsOCk7XG4gICAgICAgIHRoaXMubnVtID0gMjtcblxuICAgICAgICB0aGlzLm51bUxhYmVsLnN0cmluZyA9IFwiK1wiK3RoaXMubnVtK1wi54Ku5aGUXCI7XG5cbiAgICAgICAgdGhpcy5sYWJsZV9hZGRHb2xkMi5zdHJpbmcgPSB0aGlzLm51bSozK1wiXCI7XG5cbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKFwiYm9keVwiLChyZXMpPT57XG4gICAgICAgICAgICB0aGlzLnR1cnJldEJvZHkmJih0aGlzLnR1cnJldEJvZHkuc3ByaXRlRnJhbWUgPSByZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKFwiZm9vdFwiLChyZXMpPT57XG4gICAgICAgICAgICBpZih0aGlzLnR1cnJldEZvb3QmJnJlcyl7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Quc3ByaXRlRnJhbWUgPSByZXNcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoTnVtYmVyKHRoaXMuaW5pdERhdGEuc3ByaXRlRm9vdFkpPjApe1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdCYmKHRoaXMudHVycmV0Rm9vdC5ub2RlLnkgPSBOdW1iZXIodGhpcy5pbml0RGF0YS5zcHJpdGVGb290WSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdldE90aGVyVHVycmV0XSl7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdldE90aGVyVHVycmV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuQXJyQnRuWzBdLmFjdGl2ZSA9IHRoaXMuQXJyQnRuWzFdLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5BcnJCdG5bMl0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmlzVmlkZW8gPSBmYWxzZTtcblxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLpop3lpJbojrflvpfngq7loZTlvLnnqpdcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m66ZmN54Ku5aGU5by556qXXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKGUscmVzKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgbGV0IGlzVmlkZW86Ym9vbGVhbiA9IHJlcz09MTsvL+aYr+WQpueci+inhumikVxuXG4gICAgICAgIGlmKGlzVmlkZW8pe1xuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLkdldE90aGVyVHVycmV0LCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ZpZGVvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2V0T3RoZXJUdXJyZXQpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NGbigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKuiOt+WPluWuneWhlCAqL1xuICAgIHN1Y2Nlc3NGbigpe1xuXG4gICAgICAgIGxldCBudW06bnVtYmVyID0gdGhpcy5udW0qKHRoaXMuaXNWaWRlbz8zOjEpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICB1dGlsLnVzZXJEYXRhLmFpcmJvcm5lQ291bnQtPTE7XG4gICAgICAgIC8vIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHZXRUdXJyZXQse251bSxuYW1lOnBhZ2VUcy5wYWdlTmFtZS5HYW1lR2V0T3RoZXJUdXJyZXR9KTsgXG5cbiAgICAgICAgXG4gICAgICAgIHV0aWwucHJvZHVjdFR1cnJldChudW0pO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X3R1cnJldCx7bm9kZTp0aGlzLm5vZGUsbnVtfSk7XG4gICAgICAgIFxuICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635b6XXCIrbnVtK1wi5Liq54Ku5aGU77yBXCIpO1xuXG4gICAgICAgIHV0aWwucG9zdCh7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LnJlY2VpdmVBaXJib3JuZUJhdHRlcnksXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiaPpmaTmiJDlip9cIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omj6Zmk5aSx6LSlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuumZjeeCruWhlOW8ueeql1wiLFxuICAgICAgICAgICAgY2tfbW9kdWxlOnRoaXMuaXNWaWRlbz9cIuingueci+inhumikVwiOlwi56uL5Y2z6aKG5Y+WXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy5pc1ZpZGVvKXtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6aKd5aSW6I635b6X54Ku5aGU5by556qXXCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOlwi57+75YCN6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6XCLmv4DlirHop4bpopFcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLpop3lpJbojrflvpfngq7loZTlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLnm7TmjqXmlLbkuItcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBcblxuICAgIH1cblxuXG4gICAgLyoq55yL5a6M6KeG6aKRICovXG4gICAgdmlkZW9TaG93KCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm51bUxhYmVsLnN0cmluZyA9IFwiK1wiK3RoaXMubnVtKih0aGlzLmlzVmlkZW8/MzoxKTtcblxuICAgICAgICB0aGlzLkFyckJ0blswXS5hY3RpdmUgPSB0aGlzLkFyckJ0blsxXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5BcnJCdG5bMl0uYWN0aXZlID0gdHJ1ZTtcblxuICAgIH1cbiAgICBcblxuICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mHXG4gICAgICovXG4gICAgbG9hZFNwcml0ZShuYW1lOnN0cmluZyxjYWxsOkZ1bmN0aW9uKXtcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodGhpcy5pbml0RGF0YVtuYW1lXSxjYy5TcHJpdGVGcmFtZSwoZXJyLHJlczpjYy5TcHJpdGVGcmFtZSk9PntcbiAgICAgICAgICAgIGlmKGVycil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaJvuS4jeWIsOivpeWbvueJh1wiLGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsKHJlcyk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLkdldE90aGVyVHVycmV0VmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICAgICAgLy8gaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdldE90aGVyVHVycmV0Vmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRPdGhlclR1cnJldFZpZXcsdHJ1ZSk7XG4gICAgICAgIC8vIH0gXG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uR2V0T3RoZXJUdXJyZXRWaWV3KTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==