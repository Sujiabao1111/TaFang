"use strict";
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