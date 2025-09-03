
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/shop/shopItem1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '67565/KIQ9ODZgELyHHUSue', 'shopItem1');
// Script/game/shop/shopItem1.ts

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
var NameTs_1 = require("../../common/NameTs");
var soundController_1 = require("../../soundController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var shopItem1 = /** @class */ (function (_super) {
    __extends(shopItem1, _super);
    function shopItem1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stateLabel = null;
        _this.pic = null;
        return _this;
        // update (dt) {}
    }
    shopItem1.prototype.start = function () {
    };
    shopItem1.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Shop_TurretItem, function (res) {
            if (res == _this.initData.level) {
                _this.stateLabel.string = "选中";
            }
            else {
                _this.stateLabel.string = "";
            }
        }, this);
    };
    shopItem1.prototype.init = function (data) {
        // cc.resources.load()
        this.initData = data.data;
        this.stateLabel.string = data.id;
        this.node.zIndex = data.id;
    };
    /**
     * 点击
     */
    shopItem1.prototype.click = function () {
        soundController_1.default.singleton.clickAudio();
        console.log(this.initData.level, 'this.initData.level');
        cc.game.emit(NameTs_1.default.Game_Shop_UpData, this.initData.level);
        cc.game.emit(NameTs_1.default.Game_Shop_TurretItem, this.initData.level);
    };
    __decorate([
        property({ type: cc.Label, displayName: "状态文本" })
    ], shopItem1.prototype, "stateLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "图片" })
    ], shopItem1.prototype, "pic", void 0);
    shopItem1 = __decorate([
        ccclass
    ], shopItem1);
    return shopItem1;
}(cc.Component));
exports.default = shopItem1;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxzaG9wXFxzaG9wSXRlbTEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLHlEQUFvRDtBQUU5QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTZDQztRQTFDVyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixTQUFHLEdBQWMsSUFBSSxDQUFDOztRQXNDOUIsaUJBQWlCO0lBQ3JCLENBQUM7SUFuQ0cseUJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQUEsaUJBVUM7UUFSRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLG9CQUFvQixFQUFDLFVBQUMsR0FBRztZQUN2QyxJQUFHLEdBQUcsSUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQztnQkFDeEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO2FBQ2hDO2lCQUFJO2dCQUNELEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzthQUMvQjtRQUNMLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUVaLENBQUM7SUFFRCx3QkFBSSxHQUFKLFVBQUssSUFBSTtRQUVMLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBSSxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILHlCQUFLLEdBQUw7UUFDSSx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDdEQsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBdkNEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxDQUFDO2lEQUNUO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDOzBDQUNkO0lBTmIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTZDN0I7SUFBRCxnQkFBQztDQTdDRCxBQTZDQyxDQTdDc0MsRUFBRSxDQUFDLFNBQVMsR0E2Q2xEO2tCQTdDb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYW1lVHMgZnJvbSBcIi4uLy4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL3NvdW5kQ29udHJvbGxlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNob3BJdGVtMSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLnirbmgIHmlofmnKxcIn0pXG4gICAgcHJpdmF0ZSBzdGF0ZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU3ByaXRlLGRpc3BsYXlOYW1lOlwi5Zu+54mHXCJ9KVxuICAgIHByaXZhdGUgcGljOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpbml0RGF0YTphbnk7XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICBvbkxvYWQoKXtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1Nob3BfVHVycmV0SXRlbSwocmVzKT0+e1xuICAgICAgICAgICAgaWYocmVzPT10aGlzLmluaXREYXRhLmxldmVsKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlTGFiZWwuc3RyaW5nID0gXCLpgInkuK1cIlxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLnN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICB9XG5cbiAgICBpbml0KGRhdGEpe1xuXG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKClcbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IGRhdGEuZGF0YTtcbiAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLnN0cmluZyA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggID0gZGF0YS5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7tcbiAgICAgKi9cbiAgICBjbGljaygpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pbml0RGF0YS5sZXZlbCwndGhpcy5pbml0RGF0YS5sZXZlbCcpXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TaG9wX1VwRGF0YSx0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Nob3BfVHVycmV0SXRlbSx0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19