
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrizeAward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1e98dpFyxdK2pPRxlRgbThZ', 'NewBigWheelPrizeAward');
// Script/NewBigWheel/NewBigWheelPrizeAward.ts

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
/*
 * @Descripttion:
 * @version:
 * @Author: mies
 * @Date: 2021-02-23 17:14:05
 * @LastEditors: mies
 * @LastEditTime: 2021-03-01 10:20:35
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewBigWheelPrizeAward = /** @class */ (function (_super) {
    __extends(NewBigWheelPrizeAward, _super);
    function NewBigWheelPrizeAward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_num = null;
        _this.iconImage = null;
        _this.viewport = null;
        return _this;
        // update (dt) {},
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    NewBigWheelPrizeAward.prototype.onEnable = function () {
        // this.TempNodeController = Global.TempNode.getComponent('TempNodeController')
        // this.TempNodeController.showNode();
        this.viewport.opacity = 255;
    };
    NewBigWheelPrizeAward.prototype.startAni = function (spriteFrame, point) {
        var _this = this;
        this.node.active = true;
        this.iconImage.spriteFrame = spriteFrame;
        this.lable_num.string = "+" + point;
        // let gameIndex = Global.get("playerCurGold");
        // let spriteFrame = this.showImgGold;
        // let userPoint = gameIndex - point;
        // let temp = this.TempNodeController.showComp(userPoint, 2, 2);
        // this.lable_num.string = `+${point}`;
        setTimeout(function () {
            //     this.playAnimate(false, spriteFrame, null, temp, () => {
            //         let temp = this.TempNodeController.showComp(gameIndex, 2, 2);
            //         uiFunc.closeUI("NewBigWheelPrizeAward");
            //     });
            //     this.closePage();
            _this.node.active = false;
        }, 1500);
    };
    // closeMy(){    
    //     console.log("奖励后进来44");    
    //     uiFunc.closeUI("NewBigWheelPrizeAward");
    // },
    NewBigWheelPrizeAward.prototype.onDisable = function () {
        // if (this.TempNodeController) this.TempNodeController.hideNode()
        // ClientEvent.dispatch("gold_count", {});
    };
    NewBigWheelPrizeAward.prototype.start = function () {
    };
    NewBigWheelPrizeAward.prototype.closePage = function () {
    };
    __decorate([
        property(cc.Label)
    ], NewBigWheelPrizeAward.prototype, "lable_num", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewBigWheelPrizeAward.prototype, "iconImage", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelPrizeAward.prototype, "viewport", void 0);
    NewBigWheelPrizeAward = __decorate([
        ccclass
    ], NewBigWheelPrizeAward);
    return NewBigWheelPrizeAward;
}(cc.Component));
exports.default = NewBigWheelPrizeAward;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnV2hlZWxQcml6ZUF3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7O0dBT0c7QUFDRyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQXlEQztRQXZERyxlQUFTLEdBQWEsSUFBSSxDQUFBO1FBRTFCLGVBQVMsR0FBYyxJQUFJLENBQUE7UUFFM0IsY0FBUSxHQUFZLElBQUksQ0FBQTs7UUFrRHhCLGtCQUFrQjtJQUN0QixDQUFDO0lBakRHLHdCQUF3QjtJQUV4QixnQkFBZ0I7SUFFaEIsd0NBQVEsR0FBUjtRQUNJLCtFQUErRTtRQUMvRSxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3Q0FBUSxHQUFSLFVBQVMsV0FBVyxFQUFFLEtBQUs7UUFBM0IsaUJBbUJDO1FBbEJHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQTtRQUNuQywrQ0FBK0M7UUFDL0Msc0NBQXNDO1FBQ3RDLHFDQUFxQztRQUNyQyxnRUFBZ0U7UUFDaEUsdUNBQXVDO1FBRXZDLFVBQVUsQ0FBQztZQUNQLCtEQUErRDtZQUMvRCx3RUFBd0U7WUFDeEUsbURBQW1EO1lBQ25ELFVBQVU7WUFDVix3QkFBd0I7WUFDeEIsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQzVCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUViLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsa0NBQWtDO0lBQ2xDLCtDQUErQztJQUMvQyxLQUFLO0lBRUwseUNBQVMsR0FBVDtRQUNJLGtFQUFrRTtRQUVsRSwwQ0FBMEM7SUFDOUMsQ0FBQztJQUVELHFDQUFLLEdBQUw7SUFFQSxDQUFDO0lBQ0QseUNBQVMsR0FBVDtJQUVBLENBQUM7SUFyREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0REFDTztJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzREQUNPO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkRBQ007SUFOUCxxQkFBcUI7UUFEekMsT0FBTztPQUNhLHFCQUFxQixDQXlEekM7SUFBRCw0QkFBQztDQXpERCxBQXlEQyxDQXpEa0QsRUFBRSxDQUFDLFNBQVMsR0F5RDlEO2tCQXpEb0IscUJBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcblxuLypcbiAqIEBEZXNjcmlwdHRpb246IFxuICogQHZlcnNpb246IFxuICogQEF1dGhvcjogbWllc1xuICogQERhdGU6IDIwMjEtMDItMjMgMTc6MTQ6MDVcbiAqIEBMYXN0RWRpdG9yczogbWllc1xuICogQExhc3RFZGl0VGltZTogMjAyMS0wMy0wMSAxMDoyMDozNVxuICovXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3QmlnV2hlZWxQcml6ZUF3YXJkIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfbnVtOiBjYy5MYWJlbCA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGljb25JbWFnZTogY2MuU3ByaXRlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHZpZXdwb3J0OiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgLy8gdGhpcy5UZW1wTm9kZUNvbnRyb2xsZXIgPSBHbG9iYWwuVGVtcE5vZGUuZ2V0Q29tcG9uZW50KCdUZW1wTm9kZUNvbnRyb2xsZXInKVxuICAgICAgICAvLyB0aGlzLlRlbXBOb2RlQ29udHJvbGxlci5zaG93Tm9kZSgpO1xuICAgICAgICB0aGlzLnZpZXdwb3J0Lm9wYWNpdHkgPSAyNTU7XG4gICAgfVxuXG4gICAgc3RhcnRBbmkoc3ByaXRlRnJhbWUsIHBvaW50KSB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMuaWNvbkltYWdlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWVcbiAgICAgICAgdGhpcy5sYWJsZV9udW0uc3RyaW5nID0gXCIrXCIgKyBwb2ludFxuICAgICAgICAvLyBsZXQgZ2FtZUluZGV4ID0gR2xvYmFsLmdldChcInBsYXllckN1ckdvbGRcIik7XG4gICAgICAgIC8vIGxldCBzcHJpdGVGcmFtZSA9IHRoaXMuc2hvd0ltZ0dvbGQ7XG4gICAgICAgIC8vIGxldCB1c2VyUG9pbnQgPSBnYW1lSW5kZXggLSBwb2ludDtcbiAgICAgICAgLy8gbGV0IHRlbXAgPSB0aGlzLlRlbXBOb2RlQ29udHJvbGxlci5zaG93Q29tcCh1c2VyUG9pbnQsIDIsIDIpO1xuICAgICAgICAvLyB0aGlzLmxhYmxlX251bS5zdHJpbmcgPSBgKyR7cG9pbnR9YDtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBsYXlBbmltYXRlKGZhbHNlLCBzcHJpdGVGcmFtZSwgbnVsbCwgdGVtcCwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgdGVtcCA9IHRoaXMuVGVtcE5vZGVDb250cm9sbGVyLnNob3dDb21wKGdhbWVJbmRleCwgMiwgMik7XG4gICAgICAgICAgICAvLyAgICAgICAgIHVpRnVuYy5jbG9zZVVJKFwiTmV3QmlnV2hlZWxQcml6ZUF3YXJkXCIpO1xuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgfSwgMTUwMCk7XG5cbiAgICB9XG5cbiAgICAvLyBjbG9zZU15KCl7ICAgIFxuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuWlluWKseWQjui/m+adpTQ0XCIpOyAgICBcbiAgICAvLyAgICAgdWlGdW5jLmNsb3NlVUkoXCJOZXdCaWdXaGVlbFByaXplQXdhcmRcIik7XG4gICAgLy8gfSxcblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuVGVtcE5vZGVDb250cm9sbGVyKSB0aGlzLlRlbXBOb2RlQ29udHJvbGxlci5oaWRlTm9kZSgpXG5cbiAgICAgICAgLy8gQ2xpZW50RXZlbnQuZGlzcGF0Y2goXCJnb2xkX2NvdW50XCIsIHt9KTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cbiAgICBjbG9zZVBhZ2UoKSB7XG5cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59XG4iXX0=