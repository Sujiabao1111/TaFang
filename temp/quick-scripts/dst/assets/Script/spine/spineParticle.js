
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/spine/spineParticle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzcGluZVxcc3BpbmVQYXJ0aWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0dBRUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVHLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBQ3pDLDhCQUE4QjtBQUMvQiw0Q0FBNEM7QUFDNUMsNEJBQTRCO0FBRTVCO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBZ0NDO1FBOUJHLEtBQUs7UUFFTCxrQkFBWSxHQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBDLEtBQUs7UUFFTCxrQkFBWSxHQUFXLENBQUMsQ0FBQztRQUV6QixLQUFLO1FBRUwsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUV0QixLQUFLO1FBQ0wsWUFBTSxHQUFXLENBQUMsQ0FBQzs7SUFpQnZCLENBQUM7SUFmRyw4QkFBTSxHQUFOO1FBQ0kseURBQXlEO1FBQ3pELHVDQUF1QztJQUMzQyxDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFRLEVBQUU7UUFDTixRQUFRO1FBQ1IsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN4RSwyQ0FBMkM7UUFDM0MseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQTNCRDtRQURDLFFBQVE7dURBQzJCO0lBSXBDO1FBREMsUUFBUTt1REFDZ0I7SUFJekI7UUFEQyxRQUFRO21EQUNhO0lBWkwsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQWdDakM7SUFBRCxvQkFBQztDQWhDRCxBQWdDQyxDQWhDMEMsRUFBRSxDQUFDLFNBQVMsR0FnQ3REO2tCQWhDb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKipcclxuICogQCDlm77niYfnu5XmjIflrprlnIblv4Pov5vooYzlnIblkajov5DliqhcclxuICovXHJcbiBcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbiAvL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxyXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cclxuLy/nlLXmiqVodHRwczovL3QubWUvZ2FtZWNvZGU5OTlcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3BpbmVQYXJ0aWNsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiBcclxuICAgIC8vIOWchuW/g1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBjaXJjbGVDZW50ZXI6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcclxuIFxyXG4gICAgLy8g5Y2K5b6EXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGNpcmNsZVJhZGl1czogbnVtYmVyID0gMDtcclxuIFxyXG4gICAgLy8g6L2m6YCfXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGNhclNwZWVkOiBudW1iZXIgPSAzMDtcclxuIFxyXG4gICAgLy8g5byn5bqmXHJcbiAgICByYWRpYW46IG51bWJlciA9IDA7XHJcbiBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy90aGlzLmNpcmNsZVJhZGl1cyA9IHRoaXMubm9kZS5wYXJlbnQud2lkdGggLyAyOyAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLnNjaGVkdWxlKHRoaXMuY2lyY2xlTW92ZSwgMC4wMSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICAvLyDlhYjorqHnrpflvKfluqZcclxuICAgICAgICB0aGlzLnJhZGlhbiArPSBkdCAqICh0aGlzLmNhclNwZWVkLzEwMCk7XHJcbiAgICAgICAgbGV0IHggPSB0aGlzLmNpcmNsZVJhZGl1cyAqIE1hdGguY29zKHRoaXMucmFkaWFuKSArIHRoaXMuY2lyY2xlQ2VudGVyLng7IFxyXG4gICAgICAgIGxldCB5ID0gdGhpcy5jaXJjbGVSYWRpdXMgKiBNYXRoLnNpbih0aGlzLnJhZGlhbikgKyB0aGlzLmNpcmNsZUNlbnRlci55O1xyXG4gICAgICAgIC8vbGV0IGFuZ2xlID0gMzYwLSAxODAvTWF0aC5QSSp0aGlzLnJhZGlhbjtcclxuICAgICAgICAvL3RoaXMuc3ByQ2FyLm5vZGUuYW5nbGUgPSBhbmdsZTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMubm9kZS54ID0geDtcclxuICAgICAgICB0aGlzLm5vZGUueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuIFxyXG4iXX0=