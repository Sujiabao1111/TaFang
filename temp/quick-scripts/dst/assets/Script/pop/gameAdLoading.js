
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameAdLoading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '594b5PfTe9DYrIcMK0D3mEq', 'gameAdLoading');
// Script/pop/gameAdLoading.ts

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
var NameTs_1 = require("../common/NameTs");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameAdLoading = /** @class */ (function (_super) {
    __extends(gameAdLoading, _super);
    function gameAdLoading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    gameAdLoading.prototype.onLoad = function () {
        cc.game.once(NameTs_1.default.Close_AdLoading, this.closePage, this);
    };
    gameAdLoading.prototype.onEnable = function () {
        var _this = this;
        this.node.zIndex = 3001;
        this.scheduleOnce(function () {
            if (_this.node)
                _this.closePage();
        }, 5);
    };
    gameAdLoading = __decorate([
        ccclass
    ], gameAdLoading);
    return gameAdLoading;
}(baseTs_1.default));
exports.default = gameAdLoading;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVBZExvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLDJDQUFzQztBQUVoQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBTTtJQUFqRDs7SUFhQSxDQUFDO0lBWEcsOEJBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsSUFBRyxLQUFJLENBQUMsSUFBSTtnQkFBRSxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQVpnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBYWpDO0lBQUQsb0JBQUM7Q0FiRCxBQWFDLENBYjBDLGdCQUFNLEdBYWhEO2tCQWJvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVBZExvYWRpbmcgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgb25Mb2FkKCl7XG4gICAgICAgIGNjLmdhbWUub25jZShOYW1lVHMuQ2xvc2VfQWRMb2FkaW5nLCB0aGlzLmNsb3NlUGFnZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAzMDAxOyAgICAgICAgXG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5ub2RlKSB0aGlzLmNsb3NlUGFnZSgpOyAgICAgICAgICAgIFxuICAgICAgICB9LCA1KTtcbiAgICB9XG59XG4iXX0=