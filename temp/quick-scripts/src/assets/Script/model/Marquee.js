"use strict";
cc._RF.push(module, 'e3692J48b9Jbo4AZg4aII+1', 'Marquee');
// Script/model/Marquee.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Marquee = /** @class */ (function (_super) {
    __extends(Marquee, _super);
    function Marquee() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.marqueeList = null;
        _this.lable_marqueeItem = null;
        return _this;
    }
    Marquee.prototype.start = function () {
    };
    Marquee.prototype.updateMarqueeList = function (strArray) {
        var _this = this;
        this.marqueeList.stopAllActions();
        this.marqueeList.removeAllChildren();
        var totalHeight = 0;
        this.marqueeList.y = 27;
        if (strArray.length == 2) {
            strArray.push(strArray[0]);
        }
        if (this.marqueeList.children.length == 0) {
            strArray.map(function (item, index) {
                var marqueeItem = cc.instantiate(_this.lable_marqueeItem);
                marqueeItem.getComponent(cc.RichText).string = item.msg + "   " + item.time;
                marqueeItem.active = true;
                _this.marqueeList.addChild(marqueeItem);
                totalHeight += marqueeItem.height;
            });
        }
        var count = 0;
        var running = cc.tween(this.marqueeList)
            .repeatForever(cc.tween()
            .by(1, { y: totalHeight / strArray.length })
            .delay(2)
            .call(function () {
            count++;
            if (count >= _this.marqueeList.childrenCount - 1) {
                count = 0;
                _this.marqueeList.y = 27;
            }
        }));
        this.scheduleOnce(function () {
            running.start();
        }, 0);
    };
    __decorate([
        property(cc.Node)
    ], Marquee.prototype, "marqueeList", void 0);
    __decorate([
        property(cc.Node)
    ], Marquee.prototype, "lable_marqueeItem", void 0);
    Marquee = __decorate([
        ccclass
    ], Marquee);
    return Marquee;
}(cc.Component));
exports.default = Marquee;

cc._RF.pop();