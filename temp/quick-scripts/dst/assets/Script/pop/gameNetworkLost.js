
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameNetworkLost.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ccf9f2S/Q5J7JvfAgcKemM3', 'gameNetworkLost');
// Script/pop/gameNetworkLost.ts

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
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameNetworkLost = /** @class */ (function (_super) {
    __extends(gameNetworkLost, _super);
    function gameNetworkLost() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_closeNode = null;
        _this.callback = null;
        return _this;
    }
    gameNetworkLost.prototype.onEnable = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "网络连接超时"
        });
    };
    gameNetworkLost.prototype.init = function (callback) {
        this.node.zIndex = 999;
        this.callback = callback;
        if (XMSDK_1.default.openNetWorkCount > 2) {
            this.btn_closeNode.active = true;
        }
        else {
            this.btn_closeNode.active = false;
        }
    };
    gameNetworkLost.prototype.btnComfirm = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "网络连接超时",
            ck_module: "重试"
        });
        this.callback && this.callback();
        this.callback = null;
        this.closePage();
    };
    gameNetworkLost.prototype.clickClose = function () {
        this.closePage();
    };
    __decorate([
        property(cc.Node)
    ], gameNetworkLost.prototype, "btn_closeNode", void 0);
    gameNetworkLost = __decorate([
        ccclass
    ], gameNetworkLost);
    return gameNetworkLost;
}(baseTs_1.default));
exports.default = gameNetworkLost;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVOZXR3b3JrTG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMscURBQWdEO0FBQ2hELGlEQUE0QztBQUV0QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBTTtJQUFuRDtRQUFBLHFFQXNDQztRQW5DRyxtQkFBYSxHQUFXLElBQUksQ0FBQztRQUU3QixjQUFRLEdBQWEsSUFBSSxDQUFBOztJQWlDN0IsQ0FBQztJQS9CRyxrQ0FBUSxHQUFSO1FBQ0ksa0JBQVEsQ0FBQyx3QkFBd0IsQ0FBQztZQUM5QixnQkFBZ0IsRUFBQyxRQUFRO1NBQzVCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCw4QkFBSSxHQUFKLFVBQUssUUFBa0I7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRXpCLElBQUcsZUFBSyxDQUFDLGdCQUFnQixHQUFHLENBQUMsRUFBQztZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDcEM7YUFDRztZQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNyQztJQUNMLENBQUM7SUFDRCxvQ0FBVSxHQUFWO1FBQ0ksa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQztZQUN6QixnQkFBZ0IsRUFBQyxRQUFRO1lBQ3pCLFNBQVMsRUFBQyxJQUFJO1NBQ2pCLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsb0NBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBbENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MERBQ1c7SUFIWixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBc0NuQztJQUFELHNCQUFDO0NBdENELEFBc0NDLENBdEM0QyxnQkFBTSxHQXNDbEQ7a0JBdENvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lTmV0d29ya0xvc3QgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuX2Nsb3NlTm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGxcblxuICAgIG9uRW5hYmxlKCl7XG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOlwi572R57uc6L+e5o6l6LaF5pe2XCIgICAgICAgICAgICBcbiAgICAgICAgfSkgICAgICAgIFxuICAgIH1cblxuICAgIGluaXQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSA5OTk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgICAgICBpZihYTVNESy5vcGVuTmV0V29ya0NvdW50ID4gMil7XG4gICAgICAgICAgICB0aGlzLmJ0bl9jbG9zZU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5idG5fY2xvc2VOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJ0bkNvbWZpcm0oKSB7XG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzpcIue9kee7nOi/nuaOpei2heaXtlwiLFxuICAgICAgICAgICAgY2tfbW9kdWxlOlwi6YeN6K+VXCJcbiAgICAgICAgfSkgICBcblxuICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2soKVxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbFxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgIH1cblxuICAgIGNsaWNrQ2xvc2UoKXtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICB9XG59XG4iXX0=