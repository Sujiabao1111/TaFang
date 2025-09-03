
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/NewBigWheel/NewBigWheelMarquee.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnV2hlZWxNYXJxdWVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztHQU9HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFnRCxzQ0FBWTtJQUE1RDtRQUFBLHFFQTJDQztRQTFDRyxRQUFRO1FBRVIsaUJBQVcsR0FBWSxJQUFJLENBQUE7UUFFM0IsZUFBUyxHQUFZLElBQUksQ0FBQTtRQUV6Qix1QkFBaUIsR0FBYyxJQUFJLENBQUE7O0lBb0N2QyxDQUFDO0lBbENHLGtDQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsOENBQWlCLEdBQWpCLFVBQWtCLElBQUk7UUFBdEIsaUJBNkJDO1FBNUJHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU87UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQ2hDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDekQsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNqRCxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2QyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUNuQyxhQUFhLENBQ1YsRUFBRSxDQUFDLEtBQUssRUFBRTthQUNMLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDdEQsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNSLElBQUksQ0FBQztZQUNGLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxLQUFLLElBQUksS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxQjtRQUNMLENBQUMsQ0FBQyxDQUNULENBQUM7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUF2Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyREFDUztJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNPO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUVBQ2U7SUFQbEIsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0EyQ3RDO0lBQUQseUJBQUM7Q0EzQ0QsQUEyQ0MsQ0EzQytDLEVBQUUsQ0FBQyxTQUFTLEdBMkMzRDtrQkEzQ29CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBARGVzY3JpcHR0aW9uOiBcbiAqIEB2ZXJzaW9uOiBcbiAqIEBBdXRob3I6IG1pZXNcbiAqIEBEYXRlOiAyMDIxLTAyLTIzIDE3OjE0OjA1XG4gKiBATGFzdEVkaXRvcnM6IG1pZXNcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjEtMDItMjQgMTE6NDA6MDRcbiAqL1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3QmlnV2hlZWxNYXJxdWVlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICAvL+iOt+W+l+WlluWKsei9ruaSrVxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1hcnF1ZWVMaXN0OiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1hcnF1ZWVCZzogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIG1hcnF1ZWVJdGVtUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZU1hcnF1ZWVMaXN0KGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhLnByZXZQZXJpb2RMaXN0KSByZXR1cm47XG4gICAgICAgIHRoaXMubWFycXVlZUxpc3Quc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5tYXJxdWVlTGlzdC55ID0gMDtcbiAgICAgICAgdGhpcy5tYXJxdWVlTGlzdC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICBsZXQgdG90YWxIZWlnaHQgPSAwO1xuICAgICAgICBkYXRhLnByZXZQZXJpb2RMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCBtYXJxdWVlSXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubWFycXVlZUl0ZW1QcmVmYWIpO1xuICAgICAgICAgICAgbWFycXVlZUl0ZW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy5tYXJxdWVlTGlzdC5hZGRDaGlsZChtYXJxdWVlSXRlbSk7XG4gICAgICAgICAgICB0b3RhbEhlaWdodCArPSBtYXJxdWVlSXRlbS5oZWlnaHQ7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBsZXQgcnVubmluZyA9IGNjLnR3ZWVuKHRoaXMubWFycXVlZUxpc3QpXG4gICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICBjYy50d2VlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ieSgxLCB7IHk6IHRvdGFsSGVpZ2h0IC8gZGF0YS5wcmV2UGVyaW9kTGlzdC5sZW5ndGggfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDIpXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gdGhpcy5tYXJxdWVlTGlzdC5jaGlsZHJlbkNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcnF1ZWVMaXN0LnkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgcnVubmluZy5zdGFydCgpO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG59XG4iXX0=