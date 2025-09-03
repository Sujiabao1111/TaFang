
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/model/Marquee.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxtb2RlbFxcTWFycXVlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBWTtJQUFqRDtRQUFBLHFFQWtEQztRQS9DRyxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1Qix1QkFBaUIsR0FBWSxJQUFJLENBQUM7O0lBNEN0QyxDQUFDO0lBekNHLHVCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsbUNBQWlCLEdBQWpCLFVBQWtCLFFBQVE7UUFBMUIsaUJBb0NDO1FBbkNHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7UUFFdkIsSUFBRyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztZQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3ZDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFZLEVBQUUsS0FBSztnQkFDN0IsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDekQsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFNLElBQUksQ0FBQyxHQUFHLFdBQU0sSUFBSSxDQUFDLElBQU0sQ0FBQztnQkFDNUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN2QyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ25DLGFBQWEsQ0FDVixFQUFFLENBQUMsS0FBSyxFQUFFO2FBQ0wsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzNDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDUixJQUFJLENBQUM7WUFDRixLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksS0FBSyxJQUFJLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtnQkFDN0MsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDVixLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FDVCxDQUFDO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBOUNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDZ0I7SUFOakIsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQWtEM0I7SUFBRCxjQUFDO0NBbERELEFBa0RDLENBbERvQyxFQUFFLENBQUMsU0FBUyxHQWtEaEQ7a0JBbERvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCB7IG1hcnF1ZWUgfSBmcm9tIFwiLi4vcG9wL2dhbWVLaW5nUGFvXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFycXVlZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtYXJxdWVlTGlzdDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsYWJsZV9tYXJxdWVlSXRlbTogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0gICAgXG5cbiAgICB1cGRhdGVNYXJxdWVlTGlzdChzdHJBcnJheSkge1xuICAgICAgICB0aGlzLm1hcnF1ZWVMaXN0LnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMubWFycXVlZUxpc3QucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgbGV0IHRvdGFsSGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5tYXJxdWVlTGlzdC55ID0gMjdcblxuICAgICAgICBpZihzdHJBcnJheS5sZW5ndGggPT0gMil7XG4gICAgICAgICAgICBzdHJBcnJheS5wdXNoKHN0ckFycmF5WzBdKTtcbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgaWYgKHRoaXMubWFycXVlZUxpc3QuY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHN0ckFycmF5Lm1hcCgoaXRlbTptYXJxdWVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtYXJxdWVlSXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGFibGVfbWFycXVlZUl0ZW0pO1xuICAgICAgICAgICAgICAgIG1hcnF1ZWVJdGVtLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7aXRlbS5tc2d9ICAgJHtpdGVtLnRpbWV9YDtcbiAgICAgICAgICAgICAgICBtYXJxdWVlSXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubWFycXVlZUxpc3QuYWRkQ2hpbGQobWFycXVlZUl0ZW0pO1xuICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IG1hcnF1ZWVJdGVtLmhlaWdodDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGxldCBydW5uaW5nID0gY2MudHdlZW4odGhpcy5tYXJxdWVlTGlzdClcbiAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKClcbiAgICAgICAgICAgICAgICAgICAgLmJ5KDEsIHsgeTogdG90YWxIZWlnaHQgLyBzdHJBcnJheS5sZW5ndGggfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDIpXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gdGhpcy5tYXJxdWVlTGlzdC5jaGlsZHJlbkNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcnF1ZWVMaXN0LnkgPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHJ1bm5pbmcuc3RhcnQoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxufVxuIl19