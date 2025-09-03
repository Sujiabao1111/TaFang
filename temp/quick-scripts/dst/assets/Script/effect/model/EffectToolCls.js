
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/effect/model/EffectToolCls.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxlZmZlY3RcXG1vZGVsXFxFZmZlY3RUb29sQ2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUN6QywwQ0FBcUM7QUFFL0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7O0lBWUEsQ0FBQztJQVZHLGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN0SCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNsRixDQUFDO0lBQ0QsaUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzNILENBQUM7SUFDRCx5Q0FBaUIsR0FBakI7UUFDSSxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQVhnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBWWpDO0lBQUQsb0JBQUM7Q0FaRCxBQVlDLENBWjBDLEVBQUUsQ0FBQyxTQUFTLEdBWXREO2tCQVpvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uLy4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IE1vZGVsRnVuYyBmcm9tIFwiLi4vTW9kZWxGdW5jXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVmZmVjdFRvb2xDbHMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KS5vbihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURSwgdGhpcy5jb21wbGV0ZUFuaW1hdGlvbiwgdGhpcylcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSkucGxheUFuaW1hdGlvbihcInpoYWRhblwiLCAxKVxyXG4gICAgfVxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KS5vZmYoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuQ09NUExFVEUsIHRoaXMuY29tcGxldGVBbmltYXRpb24sIHRoaXMpXHJcbiAgICB9XHJcbiAgICBjb21wbGV0ZUFuaW1hdGlvbigpIHtcclxuICAgICAgICBNb2RlbEZ1bmMucmVtb3ZlTW9kZWwoTmFtZVRzLlRvb2xfRWZmZWN0X05hbWUuR2FtZV9Qcm9wX0NscywgdGhpcy5ub2RlKTtcclxuICAgIH1cclxufVxyXG4iXX0=