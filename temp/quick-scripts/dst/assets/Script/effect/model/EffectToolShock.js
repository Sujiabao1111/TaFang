
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/effect/model/EffectToolShock.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dc40agIkPdD/4mXDmHEo6Nh', 'EffectToolShock');
// Script/effect/model/EffectToolShock.ts

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
var EffectToolShock = /** @class */ (function (_super) {
    __extends(EffectToolShock, _super);
    function EffectToolShock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EffectToolShock.prototype.onEnable = function () {
        this.node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, this.completeAnimation, this);
        this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation("shandian", 1);
    };
    EffectToolShock.prototype.onDisable = function () {
        this.node.getComponent(dragonBones.ArmatureDisplay).off(dragonBones.EventObject.COMPLETE, this.completeAnimation, this);
    };
    EffectToolShock.prototype.completeAnimation = function () {
        ModelFunc_1.default.removeModel(NameTs_1.default.Tool_Effect_Name.Game_Prop_Frozen, this.node);
    };
    EffectToolShock = __decorate([
        ccclass
    ], EffectToolShock);
    return EffectToolShock;
}(cc.Component));
exports.default = EffectToolShock;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxlZmZlY3RcXG1vZGVsXFxFZmZlY3RUb29sU2hvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQXlDO0FBQ3pDLDBDQUFxQztBQUUvQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDs7SUFZQSxDQUFDO0lBVkcsa0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3RILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3BGLENBQUM7SUFDRCxtQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDM0gsQ0FBQztJQUNELDJDQUFpQixHQUFqQjtRQUNJLG1CQUFTLENBQUMsV0FBVyxDQUFDLGdCQUFNLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFYZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQVluQztJQUFELHNCQUFDO0NBWkQsQUFZQyxDQVo0QyxFQUFFLENBQUMsU0FBUyxHQVl4RDtrQkFab0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCBNb2RlbEZ1bmMgZnJvbSBcIi4uL01vZGVsRnVuY1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZmZlY3RUb29sU2hvY2sgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KS5vbihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURSwgdGhpcy5jb21wbGV0ZUFuaW1hdGlvbiwgdGhpcylcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSkucGxheUFuaW1hdGlvbihcInNoYW5kaWFuXCIsIDEpXHJcbiAgICB9XHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpLm9mZihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURSwgdGhpcy5jb21wbGV0ZUFuaW1hdGlvbiwgdGhpcylcclxuICAgIH1cclxuICAgIGNvbXBsZXRlQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIE1vZGVsRnVuYy5yZW1vdmVNb2RlbChOYW1lVHMuVG9vbF9FZmZlY3RfTmFtZS5HYW1lX1Byb3BfRnJvemVuLCB0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==