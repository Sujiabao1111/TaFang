
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
var NameTs_1 = require("../common/NameTs");
var LanguageData_1 = require("../Language/LanguageData");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
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
        // this.num = Tools.GetRandom(3,8);
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
    };
    /**
     * 获取
     */
    gameGetOtherTurret.prototype.getBtn = function (e, res) {
        soundController_1.default.singleton.clickAudio();
        // let isVideo: boolean = res == 1;//是否看视频
        this.successFn();
        // if (isVideo) {
        //     AdController.loadAd(AdPosition.GetOtherTurret, () => {
        //         this.isVideo = true;
        //         util.preloadAd(AdPosition.GetOtherTurret);
        //     }, () => {
        //         AssistCtr.showToastTip("加载视频失败，请稍后！");
        //     });
        // } else {
        //     this.successFn();
        // }
    };
    /**获取宝塔 */
    gameGetOtherTurret.prototype.successFn = function () {
        var num = this.num * (this.isVideo ? 3 : 1);
        this.closePage();
        util_1.default.userData.airborneCount -= 1;
        // this.showPage(pageTs.pageName.GameGetTurret,{num,name:pageTs.pageName.GameGetOtherTurret}); 
        util_1.default.productTurret(num);
        cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: this.node, num: num });
        AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('main.Got_turrets', num));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHZXRPdGhlclR1cnJldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUVsRCwyQ0FBc0M7QUFFdEMseURBQTZDO0FBRTdDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFHakQscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWdELHNDQUFNO0lBQXREO1FBQUEscUVBNEpDO1FBekpXLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFFbEMsNENBQTRDO1FBQzVDLGdDQUFnQztRQUd4QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxZQUFNLEdBQWMsRUFBRSxDQUFDO1FBR3ZCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFbEMsUUFBUTtRQUNBLFNBQUcsR0FBVyxDQUFDLENBQUM7UUFJaEIsYUFBTyxHQUFZLEtBQUssQ0FBQzs7UUE0SGpDLGlCQUFpQjtJQUNyQixDQUFDO0lBM0hHLG1DQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsa0NBQUssR0FBTDtRQUVJLHNDQUFzQztRQUN0QyxtREFBbUQ7UUFDbkQsYUFBYTtRQUNiLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FDckMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFB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NUorQyxnQkFBTSxHQTRKckQ7a0JBNUpvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi91dGlsL1Rvb2xzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lR2V0T3RoZXJUdXJyZXQgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuaVsOmHj1wiIH0pXG4gICAgcHJpdmF0ZSBudW1MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlhYlcIn0pXG4gICAgLy8gcHJpdmF0ZSBsaWdodDpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZSwgZGlzcGxheU5hbWU6IFwi54Ku5aGU6LqrXCIgfSlcbiAgICBwcml2YXRlIHR1cnJldEJvZHk6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIGRpc3BsYXlOYW1lOiBcIueCruWhlOiEmlwiIH0pXG4gICAgcHJpdmF0ZSB0dXJyZXRGb290OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5YCN5pWwXCIgfSlcbiAgICBwcml2YXRlIG11bHRpcGxlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5YCN5pWw6YeR5biBXCIgfSlcbiAgICBwcml2YXRlIGxhYmxlX2FkZEdvbGQyOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTm9kZV0sIGRpc3BsYXlOYW1lOiBcIuaMiemSrlwiIH0pXG4gICAgcHJpdmF0ZSBBcnJCdG46IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5L+h5oGv5rWBXCIgfSlcbiAgICBwcml2YXRlIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvKirph5HluIEgKi9cbiAgICBwcml2YXRlIG51bTogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgaW5pdERhdGE6IGFueTtcblxuICAgIHByaXZhdGUgaXNWaWRlbzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5saWdodCkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkudG8oMSx7c2NhbGU6MX0pLnRvKDEse3NjYWxlOjEuMX0pXG4gICAgICAgIC8vICkuc3RhcnQoKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5tdWx0aXBsZU5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLCB7IGFuZ2xlOiAxMCB9KS50byguMiwgeyBhbmdsZTogMCB9KVxuICAgICAgICApLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyWICovXG4gICAgaW5pdChkYXRhKSB7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IHV0aWwuR2V0VHVycmV0RGF0YShkYXRhKTtcblxuICAgICAgICAvLyB0aGlzLm51bSA9IFRvb2xzLkdldFJhbmRvbSgzLDgpO1xuICAgICAgICB0aGlzLm51bSA9IDI7XG5cbiAgICAgICAgdGhpcy5udW1MYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMubnVtICsgXCLngq7loZRcIjtcblxuICAgICAgICB0aGlzLmxhYmxlX2FkZEdvbGQyLnN0cmluZyA9IHRoaXMubnVtICogMyArIFwiXCI7XG5cbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKFwiYm9keVwiLCAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnR1cnJldEJvZHkgJiYgKHRoaXMudHVycmV0Qm9keS5zcHJpdGVGcmFtZSA9IHJlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJmb290XCIsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR1cnJldEZvb3QgJiYgcmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Quc3ByaXRlRnJhbWUgPSByZXNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMuaW5pdERhdGEuc3ByaXRlRm9vdFkpID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdCAmJiAodGhpcy50dXJyZXRGb290Lm5vZGUueSA9IE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdldE90aGVyVHVycmV0XSkge1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRPdGhlclR1cnJldCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLkFyckJ0blswXS5hY3RpdmUgPSB0aGlzLkFyckJ0blsxXS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuQXJyQnRuWzJdLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaXNWaWRlbyA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKGUsIHJlcykge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICAvLyBsZXQgaXNWaWRlbzogYm9vbGVhbiA9IHJlcyA9PSAxOy8v5piv5ZCm55yL6KeG6aKRXG5cbiAgICAgICAgdGhpcy5zdWNjZXNzRm4oKTtcbiAgICAgICAgLy8gaWYgKGlzVmlkZW8pIHtcbiAgICAgICAgLy8gICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5HZXRPdGhlclR1cnJldCwgKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuaXNWaWRlbyA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRPdGhlclR1cnJldCk7XG4gICAgICAgIC8vICAgICB9LCAoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5zdWNjZXNzRm4oKTtcbiAgICAgICAgLy8gfVxuXG4gICAgfVxuXG4gICAgLyoq6I635Y+W5a6d5aGUICovXG4gICAgc3VjY2Vzc0ZuKCkge1xuXG4gICAgICAgIGxldCBudW06IG51bWJlciA9IHRoaXMubnVtICogKHRoaXMuaXNWaWRlbyA/IDMgOiAxKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgdXRpbC51c2VyRGF0YS5haXJib3JuZUNvdW50IC09IDE7XG4gICAgICAgIC8vIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHZXRUdXJyZXQse251bSxuYW1lOnBhZ2VUcy5wYWdlTmFtZS5HYW1lR2V0T3RoZXJUdXJyZXR9KTsgXG5cblxuICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQobnVtKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF90dXJyZXQsIHsgbm9kZTogdGhpcy5ub2RlLCBudW0gfSk7XG5cbiAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KCdtYWluLkdvdF90dXJyZXRzJywgbnVtKSk7XG4gICAgfVxuXG5cbiAgICAvKirnnIvlrozop4bpopEgKi9cbiAgICB2aWRlb1Nob3coKSB7XG4gICAgICAgIHRoaXMubnVtTGFiZWwuc3RyaW5nID0gXCIrXCIgKyB0aGlzLm51bSAqICh0aGlzLmlzVmlkZW8gPyAzIDogMSk7XG4gICAgICAgIHRoaXMuQXJyQnRuWzBdLmFjdGl2ZSA9IHRoaXMuQXJyQnRuWzFdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkFyckJ0blsyXS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICAqIOWKoOi9veWbvueJh1xuICAgICAgKi9cbiAgICBsb2FkU3ByaXRlKG5hbWU6IHN0cmluZywgY2FsbDogRnVuY3Rpb24pIHtcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodGhpcy5pbml0RGF0YVtuYW1lXSwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHJlczogY2MuU3ByaXRlRnJhbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5om+5LiN5Yiw6K+l5Zu+54mHXCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsKHJlcyk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLkdldE90aGVyVHVycmV0VmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICAgICAgLy8gaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdldE90aGVyVHVycmV0Vmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRPdGhlclR1cnJldFZpZXcsdHJ1ZSk7XG4gICAgICAgIC8vIH0gXG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uR2V0T3RoZXJUdXJyZXRWaWV3KTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==