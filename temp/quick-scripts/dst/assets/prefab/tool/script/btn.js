
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/prefab/tool/script/btn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '04d45coE25IEIO2XqV1Wz/7', 'btn');
// prefab/tool/script/btn.ts

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
var btn = /** @class */ (function (_super) {
    __extends(btn, _super);
    function btn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.doubleTime = 2;
        return _this;
    }
    btn.prototype.start = function () {
        var _this = this;
        var button = this.getComponent(cc.Button);
        if (!button) {
            return;
        }
        this.clickEvents = button.clickEvents;
        this.node.on('click', function () {
            if (button.clickEvents && button.clickEvents.length != 0) {
                button.clickEvents = [];
                setTimeout(function (dt) {
                    if (button) {
                        button.clickEvents = _this.clickEvents;
                    }
                }, _this.doubleTime * 1000);
            }
        }, this);
    };
    __decorate([
        property
    ], btn.prototype, "doubleTime", void 0);
    btn = __decorate([
        ccclass
    ], btn);
    return btn;
}(cc.Component));
exports.default = btn;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccHJlZmFiXFx0b29sXFxzY3JpcHRcXGJ0bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFpQyx1QkFBWTtJQUE3QztRQUFBLHFFQTBCQztRQXZCRyxnQkFBVSxHQUFVLENBQUMsQ0FBQzs7SUF1QjFCLENBQUM7SUFuQkcsbUJBQUssR0FBTDtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQ1IsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRXRDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUNsQixJQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO2dCQUNwRCxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsVUFBVSxDQUFDLFVBQUMsRUFBRTtvQkFDVixJQUFHLE1BQU0sRUFBQzt3QkFDTixNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUM7cUJBQ3pDO2dCQUNMLENBQUMsRUFBRSxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQXRCRDtRQURDLFFBQVE7MkNBQ2E7SUFITCxHQUFHO1FBRHZCLE9BQU87T0FDYSxHQUFHLENBMEJ2QjtJQUFELFVBQUM7Q0ExQkQsQUEwQkMsQ0ExQmdDLEVBQUUsQ0FBQyxTQUFTLEdBMEI1QztrQkExQm9CLEdBQUciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJ0biBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHlcbiAgICBkb3VibGVUaW1lOm51bWJlciA9IDI7XG5cbiAgICBjbGlja0V2ZW50cztcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIGlmICghYnV0dG9uKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xpY2tFdmVudHMgPSBidXR0b24uY2xpY2tFdmVudHM7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKCdjbGljaycsICgpPT57XG4gICAgICAgICAgICBpZihidXR0b24uY2xpY2tFdmVudHMgJiYgYnV0dG9uLmNsaWNrRXZlbnRzLmxlbmd0aCAhPSAwKXsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnV0dG9uLmNsaWNrRXZlbnRzID0gW107XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoZHQpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKGJ1dHRvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uY2xpY2tFdmVudHMgPSB0aGlzLmNsaWNrRXZlbnRzO1xuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9LCB0aGlzLmRvdWJsZVRpbWUgKiAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSAgICBcbn1cbiJdfQ==