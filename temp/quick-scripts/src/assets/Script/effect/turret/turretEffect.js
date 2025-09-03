"use strict";
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