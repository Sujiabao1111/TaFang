"use strict";
cc._RF.push(module, 'c568dAO1IhMioB5NGQPPoll', 'spineParticle');
// Script/spine/spineParticle.ts

"use strict";
/**
 * @ 图片绕指定圆心进行圆周运动
 */
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
var spineParticle = /** @class */ (function (_super) {
    __extends(spineParticle, _super);
    function spineParticle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 圆心
        _this.circleCenter = cc.v2(0, 0);
        // 半径
        _this.circleRadius = 0;
        // 车速
        _this.carSpeed = 30;
        // 弧度
        _this.radian = 0;
        return _this;
    }
    spineParticle.prototype.onLoad = function () {
        //this.circleRadius = this.node.parent.width / 2;        
        //this.schedule(this.circleMove, 0.01);
    };
    spineParticle.prototype.update = function (dt) {
        // 先计算弧度
        this.radian += dt * (this.carSpeed / 100);
        var x = this.circleRadius * Math.cos(this.radian) + this.circleCenter.x;
        var y = this.circleRadius * Math.sin(this.radian) + this.circleCenter.y;
        //let angle = 360- 180/Math.PI*this.radian;
        //this.sprCar.node.angle = angle;        
        this.node.x = x;
        this.node.y = y;
    };
    __decorate([
        property
    ], spineParticle.prototype, "circleCenter", void 0);
    __decorate([
        property
    ], spineParticle.prototype, "circleRadius", void 0);
    __decorate([
        property
    ], spineParticle.prototype, "carSpeed", void 0);
    spineParticle = __decorate([
        ccclass
    ], spineParticle);
    return spineParticle;
}(cc.Component));
exports.default = spineParticle;

cc._RF.pop();