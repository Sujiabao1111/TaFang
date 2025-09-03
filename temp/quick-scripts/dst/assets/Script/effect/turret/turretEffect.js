
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/effect/turret/turretEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82325WwqUNHg5aG6WfRfdu0', 'turretEffect');
// Script/effect/turret/turretEffect.ts

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
var util_1 = require("../../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretEffect = /** @class */ (function (_super) {
    __extends(turretEffect, _super);
    function turretEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bodySprite = null;
        _this.footSprite = null;
        // LIFE-CYCLE CALLBACKS:
        _this.level = 1;
        return _this;
        // update (dt) {}
    }
    turretEffect.prototype.init = function () {
        var _this = this;
        this.level = util_1.default.userData.turretLevel;
        this.initData = util_1.default.GetTurretData(this.level);
        this.loadSprite("body", function (res) {
            _this.bodySprite && (_this.bodySprite.spriteFrame = res);
        });
        this.loadSprite("foot", function (res) {
            if (_this.footSprite && res) {
                _this.footSprite.node.active = true;
                _this.footSprite.spriteFrame = res;
            }
            else {
                _this.footSprite.node.active = false;
            }
            if (Number(_this.initData.spriteFootY) > 0) {
                _this.footSprite && (_this.footSprite.node.y = Number(_this.initData.spriteFootY));
            }
        });
    };
    turretEffect.prototype.onLoad = function () { };
    turretEffect.prototype.start = function () {
    };
    /**
     * 加载图片
     */
    turretEffect.prototype.loadSprite = function (name, call) {
        cc.resources.load(this.initData[name], cc.SpriteFrame, function (err, res) {
            if (err) {
                console.error("找不到该图片", err);
                return;
            }
            call(res);
        });
    };
    __decorate([
        property(cc.Sprite)
    ], turretEffect.prototype, "bodySprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], turretEffect.prototype, "footSprite", void 0);
    turretEffect = __decorate([
        ccclass
    ], turretEffect);
    return turretEffect;
}(cc.Component));
exports.default = turretEffect;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxlZmZlY3RcXHR1cnJldFxcdHVycmV0RWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUFtQztBQUU3QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQTREQztRQXpERyxnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUU3Qix3QkFBd0I7UUFFaEIsV0FBSyxHQUFVLENBQUMsQ0FBQzs7UUFpRHpCLGlCQUFpQjtJQUNyQixDQUFDO0lBL0NHLDJCQUFJLEdBQUo7UUFBQSxpQkF1QkM7UUFwQkcsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUd2QyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLFVBQUMsR0FBRztZQUN2QixLQUFJLENBQUMsVUFBVSxJQUFFLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxVQUFDLEdBQUc7WUFDdkIsSUFBRyxLQUFJLENBQUMsVUFBVSxJQUFFLEdBQUcsRUFBQztnQkFDcEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFBO2FBQ3BDO2lCQUFJO2dCQUNELEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDdkM7WUFDRCxJQUFHLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFDLENBQUMsRUFBQztnQkFDbkMsS0FBSSxDQUFDLFVBQVUsSUFBRSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQ2pGO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBRUQsNkJBQU0sR0FBTixjQUFXLENBQUM7SUFFWiw0QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOztPQUVHO0lBQ0YsaUNBQVUsR0FBVixVQUFXLElBQVcsRUFBQyxJQUFhO1FBQ2pDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxDQUFDLFdBQVcsRUFBQyxVQUFDLEdBQUcsRUFBQyxHQUFrQjtZQUV4RSxJQUFHLEdBQUcsRUFBQztnQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBdEREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDUztJQU5aLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0E0RGhDO0lBQUQsbUJBQUM7Q0E1REQsQUE0REMsQ0E1RHlDLEVBQUUsQ0FBQyxTQUFTLEdBNERyRDtrQkE1RG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHVycmV0RWZmZWN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgYm9keVNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgZm9vdFNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgcHJpdmF0ZSBsZXZlbDpudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgaW5pdERhdGE6YW55O1xuXG4gICAgaW5pdCgpe1xuXG5cbiAgICAgICAgdGhpcy5sZXZlbCA9IHV0aWwudXNlckRhdGEudHVycmV0TGV2ZWw7XG5cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSB1dGlsLkdldFR1cnJldERhdGEodGhpcy5sZXZlbCk7XG5cbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKFwiYm9keVwiLChyZXMpPT57XG4gICAgICAgICAgICB0aGlzLmJvZHlTcHJpdGUmJih0aGlzLmJvZHlTcHJpdGUuc3ByaXRlRnJhbWUgPSByZXMpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJmb290XCIsKHJlcyk9PntcbiAgICAgICAgICAgIGlmKHRoaXMuZm9vdFNwcml0ZSYmcmVzKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZvb3RTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9vdFNwcml0ZS5zcHJpdGVGcmFtZSA9IHJlc1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5mb290U3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihOdW1iZXIodGhpcy5pbml0RGF0YS5zcHJpdGVGb290WSk+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5mb290U3ByaXRlJiYodGhpcy5mb290U3ByaXRlLm5vZGUueSA9IE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge31cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9veWbvueJh1xuICAgICAqL1xuICAgICBsb2FkU3ByaXRlKG5hbWU6c3RyaW5nLGNhbGw6RnVuY3Rpb24pe1xuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh0aGlzLmluaXREYXRhW25hbWVdLGNjLlNwcml0ZUZyYW1lLChlcnIscmVzOmNjLlNwcml0ZUZyYW1lKT0+e1xuXG4gICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmib7kuI3liLDor6Xlm77niYdcIixlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGwocmVzKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19