"use strict";
cc._RF.push(module, '7179bV4oCJHVIoQf0ULMBc4', 'Loading');
// Script/common/custon/Loading.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon = null;
        return _this;
    }
    Loading.prototype.onLoad = function () {
    };
    Loading.prototype.show = function (timeOut) {
        var _this = this;
        cc.Tween.stopAllByTarget(this.icon);
        this.icon.angle = 0;
        cc.tween(this.icon)
            .to(4, { angle: -360 })
            .call(function () {
            _this.icon.angle = 0;
        })
            .union()
            .repeatForever()
            .start();
        this.scheduleOnce(function () {
            cc.Tween.stopAllByTarget(_this.icon);
            _this.node.destroy();
        }, timeOut);
    };
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "icon", void 0);
    Loading = __decorate([
        ccclass
    ], Loading);
    return Loading;
}(cc.Component));
exports.default = Loading;

cc._RF.pop();