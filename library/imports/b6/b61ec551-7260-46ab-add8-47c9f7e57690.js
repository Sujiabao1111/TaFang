"use strict";
cc._RF.push(module, 'b61ecVRcmBGq63YR8n35XaQ', 'Act_Rotate');
// Script/common/custon/Act_Rotate.ts

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
exports.Act_Rotate = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var Act_Rotate = /** @class */ (function (_super) {
    __extends(Act_Rotate, _super);
    function Act_Rotate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 2;
        return _this;
    }
    Act_Rotate.prototype.onLoad = function () {
    };
    Act_Rotate.prototype.start = function () {
        cc.tween(this.node)
            .by(this.speed, { angle: 360 })
            .repeatForever()
            .start();
    };
    __decorate([
        property({ tooltip: '旋转1圈的时间' })
    ], Act_Rotate.prototype, "speed", void 0);
    Act_Rotate = __decorate([
        ccclass
    ], Act_Rotate);
    return Act_Rotate;
}(cc.Component));
exports.Act_Rotate = Act_Rotate;

cc._RF.pop();