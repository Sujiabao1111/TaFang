"use strict";
cc._RF.push(module, '2bffaeAsTVJza1QthleBGuy', 'NewBigWheelMarquee');
// Script/NewBigWheel/NewBigWheelMarquee.ts

"use strict";
/*
 * @Descripttion:
 * @version:
 * @Author: mies
 * @Date: 2021-02-23 17:14:05
 * @LastEditors: mies
 * @LastEditTime: 2021-02-24 11:40:04
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
var NewBigWheelMarquee = /** @class */ (function (_super) {
    __extends(NewBigWheelMarquee, _super);
    function NewBigWheelMarquee() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //获得奖励轮播
        _this.marqueeList = null;
        _this.marqueeBg = null;
        _this.marqueeItemPrefab = null;
        return _this;
    }
    NewBigWheelMarquee.prototype.start = function () {
    };
    NewBigWheelMarquee.prototype.updateMarqueeList = function (data) {
        var _this = this;
        if (!data.prevPeriodList)
            return;
        this.marqueeList.stopAllActions();
        this.marqueeList.y = 0;
        this.marqueeList.removeAllChildren();
        var totalHeight = 0;
        data.prevPeriodList.map(function (item, index) {
            var marqueeItem = cc.instantiate(_this.marqueeItemPrefab);
            marqueeItem.getComponent(cc.Label).string = item;
            _this.marqueeList.addChild(marqueeItem);
            totalHeight += marqueeItem.height;
        });
        var count = 0;
        var running = cc.tween(this.marqueeList)
            .repeatForever(cc.tween()
            .by(1, { y: totalHeight / data.prevPeriodList.length })
            .delay(2)
            .call(function () {
            count++;
            if (count >= _this.marqueeList.childrenCount - 1) {
                count = 0;
                _this.marqueeList.y = 0;
            }
        }));
        this.scheduleOnce(function () {
            running.start();
        }, 0);
    };
    __decorate([
        property(cc.Node)
    ], NewBigWheelMarquee.prototype, "marqueeList", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelMarquee.prototype, "marqueeBg", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewBigWheelMarquee.prototype, "marqueeItemPrefab", void 0);
    NewBigWheelMarquee = __decorate([
        ccclass
    ], NewBigWheelMarquee);
    return NewBigWheelMarquee;
}(cc.Component));
exports.default = NewBigWheelMarquee;

cc._RF.pop();