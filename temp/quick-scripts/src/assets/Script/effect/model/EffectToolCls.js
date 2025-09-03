"use strict";
cc._RF.push(module, '2b5d5j/iTtPPqotuwsH0dEp', 'EffectToolCls');
// Script/effect/model/EffectToolCls.ts

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
var EffectToolCls = /** @class */ (function (_super) {
    __extends(EffectToolCls, _super);
    function EffectToolCls() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EffectToolCls.prototype.onEnable = function () {
        this.node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, this.completeAnimation, this);
        this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation("zhadan", 1);
    };
    EffectToolCls.prototype.onDisable = function () {
        this.node.getComponent(dragonBones.ArmatureDisplay).off(dragonBones.EventObject.COMPLETE, this.completeAnimation, this);
    };
    EffectToolCls.prototype.completeAnimation = function () {
        ModelFunc_1.default.removeModel(NameTs_1.default.Tool_Effect_Name.Game_Prop_Cls, this.node);
    };
    EffectToolCls = __decorate([
        ccclass
    ], EffectToolCls);
    return EffectToolCls;
}(cc.Component));
exports.default = EffectToolCls;

cc._RF.pop();