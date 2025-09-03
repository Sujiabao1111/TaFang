
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/effect/model/EffectToolFrozen.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '90708VJ4J1Mk4CoHUuYH70R', 'EffectToolFrozen');
// Script/effect/model/EffectToolFrozen.ts

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
var NameTs_1 = require("../../common/NameTs");
var ModelFunc_1 = require("../ModelFunc");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EffectToolFrozen = /** @class */ (function (_super) {
    __extends(EffectToolFrozen, _super);
    function EffectToolFrozen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //龙骨
        _this.dragon = null;
        return _this;
    }
    EffectToolFrozen.prototype.onLoad = function () {
        this.dragon.node.scaleX = cc.winSize.width / this.dragon.node.width * 1.2;
        this.dragon.node.scaleY = cc.winSize.height / this.dragon.node.height * 1.33;
        console.log(this.dragon.node.scaleX, cc.winSize.width, this.dragon.node.width, cc.winSize.height, 'this.dragon.node.scaleX');
    };
    EffectToolFrozen.prototype.onEnable = function () {
        var _this = this;
        setTimeout(function () {
            _this.completeAnimation();
        }, 3000);
    };
    EffectToolFrozen.prototype.onDisable = function () {
    };
    EffectToolFrozen.prototype.completeAnimation = function () {
        this.node.active = false;
        // this.dragon.node.active = false;
        ModelFunc_1.default.removeModel(NameTs_1.default.Tool_Effect_Name.Game_Prop_Frozen, this.node);
    };
    EffectToolFrozen.prototype.openPlist = function () {
        this.node.active = true;
        // this.dragon.playAnimation("bingdong",0);
    };
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], EffectToolFrozen.prototype, "dragon", void 0);
    EffectToolFrozen = __decorate([
        ccclass
    ], EffectToolFrozen);
    return EffectToolFrozen;
}(cc.Component));
exports.default = EffectToolFrozen;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxlZmZlY3RcXG1vZGVsXFxFZmZlY3RUb29sRnJvemVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUN6QywwQ0FBcUM7QUFFL0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUE2QkM7UUE1QkcsSUFBSTtRQUVJLFlBQU0sR0FBK0IsSUFBSSxDQUFDOztJQTBCdEQsQ0FBQztJQXhCRyxpQ0FBTSxHQUFOO1FBRUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUM7UUFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7UUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLHlCQUF5QixDQUFDLENBQUE7SUFDNUgsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhHLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxvQ0FBUyxHQUFUO0lBRUEsQ0FBQztJQUNELDRDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixtQ0FBbUM7UUFDbkMsbUJBQVMsQ0FBQyxXQUFXLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNELG9DQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsMkNBQTJDO0lBQy9DLENBQUM7SUF6QkQ7UUFEQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztvREFDWTtJQUhqQyxnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQTZCcEM7SUFBRCx1QkFBQztDQTdCRCxBQTZCQyxDQTdCNkMsRUFBRSxDQUFDLFNBQVMsR0E2QnpEO2tCQTdCb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uLy4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IE1vZGVsRnVuYyBmcm9tIFwiLi4vTW9kZWxGdW5jXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVmZmVjdFRvb2xGcm96ZW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgLy/pvpnpqqhcclxuICAgIEBwcm9wZXJ0eShkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpXHJcbiAgICBwcml2YXRlIGRyYWdvbjpkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpe1xyXG5cclxuICAgICAgICB0aGlzLmRyYWdvbi5ub2RlLnNjYWxlWCA9IGNjLndpblNpemUud2lkdGgvdGhpcy5kcmFnb24ubm9kZS53aWR0aCoxLjI7XHJcbiAgICAgICAgdGhpcy5kcmFnb24ubm9kZS5zY2FsZVkgPSBjYy53aW5TaXplLmhlaWdodC90aGlzLmRyYWdvbi5ub2RlLmhlaWdodCoxLjMzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZHJhZ29uLm5vZGUuc2NhbGVYLGNjLndpblNpemUud2lkdGgsdGhpcy5kcmFnb24ubm9kZS53aWR0aCxjYy53aW5TaXplLmhlaWdodCwndGhpcy5kcmFnb24ubm9kZS5zY2FsZVgnKVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkgeyAgICAgICAgXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVBbmltYXRpb24oKTsgICAgICAgICAgICBcclxuICAgICAgICB9LCAzMDAwKTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29tcGxldGVBbmltYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuZHJhZ29uLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgTW9kZWxGdW5jLnJlbW92ZU1vZGVsKE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9Gcm96ZW4sIHRoaXMubm9kZSk7XHJcbiAgICB9XHJcbiAgICBvcGVuUGxpc3QoKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLmRyYWdvbi5wbGF5QW5pbWF0aW9uKFwiYmluZ2RvbmdcIiwwKTtcclxuICAgIH1cclxufVxyXG4iXX0=