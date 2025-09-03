
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/model/ModelTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4a20d4mnr9M6Zv0YW9qn2zW', 'ModelTip');
// Script/model/ModelTip.ts

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
var baseTs_1 = require("../base/baseTs");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ModelTip = /** @class */ (function (_super) {
    __extends(ModelTip, _super);
    function ModelTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tip_label = null;
        return _this;
    }
    ModelTip.prototype.showMessage = function (text) {
        var _this = this;
        this.tip_label.string = text;
        this.node.active = true;
        this.node.position = cc.v3(0, 0, 0);
        this.node.opacity = 255;
        // this.node.runAction(cc.sequence(cc.moveBy(1, 0, 100), cc.fadeOut(0.5), cc.callFunc(() => {
        //     this.node.active = true;
        // })));
        cc.tween(this.node).to(1, { y: 100 }).to(.5, { opacity: 0 }).call(function () {
            _this.node.active = false;
        }).start();
    };
    ModelTip.prototype.showSpecailMessage = function (text, position, delayTime) {
        var _this = this;
        if (delayTime === void 0) { delayTime = 2; }
        this.tip_label.string = text;
        this.node.position = position;
        this.node.opacity = 255;
        this.node.runAction(cc.sequence(cc.moveBy(delayTime / 2, 0, 100), cc.delayTime(delayTime / 4), cc.fadeOut(delayTime / 4), cc.callFunc(function () {
            _this.node.active = false;
        })));
    };
    __decorate([
        property(cc.Label)
    ], ModelTip.prototype, "tip_label", void 0);
    ModelTip = __decorate([
        ccclass
    ], ModelTip);
    return ModelTip;
}(baseTs_1.default));
exports.default = ModelTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxtb2RlbFxcTW9kZWxUaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBRTlCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFNO0lBQTVDO1FBQUEscUVBMEJDO1FBdkJHLGVBQVMsR0FBYSxJQUFJLENBQUM7O0lBdUIvQixDQUFDO0lBckJHLDhCQUFXLEdBQVgsVUFBWSxJQUFZO1FBQXhCLGlCQVdDO1FBVkcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLDZGQUE2RjtRQUM3RiwrQkFBK0I7UUFDL0IsUUFBUTtRQUNSLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3RELEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxxQ0FBa0IsR0FBbEIsVUFBbUIsSUFBWSxFQUFFLFFBQWlCLEVBQUUsU0FBcUI7UUFBekUsaUJBUUM7UUFSbUQsMEJBQUEsRUFBQSxhQUFxQjtRQUNyRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNsSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRVIsQ0FBQztJQXRCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNRO0lBSFYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTBCNUI7SUFBRCxlQUFDO0NBMUJELEFBMEJDLENBMUJxQyxnQkFBTSxHQTBCM0M7a0JBMUJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVsVGlwIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0aXBfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHNob3dNZXNzYWdlKHRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRpcF9sYWJlbC5zdHJpbmcgPSB0ZXh0XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlOyAgICAgICAgXG4gICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IGNjLnYzKDAsIDAsIDApXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAvLyB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxLCAwLCAxMDApLCBjYy5mYWRlT3V0KDAuNSksIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyB9KSkpO1xuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDEse3k6MTAwfSkudG8oLjUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSkuc3RhcnQoKTtcbiAgICB9XG4gICAgc2hvd1NwZWNhaWxNZXNzYWdlKHRleHQ6IHN0cmluZywgcG9zaXRpb246IGNjLlZlYzMsIGRlbGF5VGltZTogbnVtYmVyID0gMikge1xuICAgICAgICB0aGlzLnRpcF9sYWJlbC5zdHJpbmcgPSB0ZXh0XG4gICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IHBvc2l0aW9uXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KGRlbGF5VGltZSAvIDIsIDAsIDEwMCksIGNjLmRlbGF5VGltZShkZWxheVRpbWUgLyA0KSwgY2MuZmFkZU91dChkZWxheVRpbWUgLyA0KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9KSkpXG5cbiAgICB9XG59XG4iXX0=