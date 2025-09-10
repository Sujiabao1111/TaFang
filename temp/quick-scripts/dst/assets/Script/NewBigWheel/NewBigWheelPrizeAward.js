
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
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnV2hlZWxQcml6ZUF3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7O0dBT0c7QUFDRyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQXlEQztRQXZERyxlQUFTLEdBQWEsSUFBSSxDQUFBO1FBRTFCLGVBQVMsR0FBYyxJQUFJLENBQUE7UUFFM0IsY0FBUSxHQUFZLElBQUksQ0FBQTs7UUFrRHhCLGtCQUFrQjtJQUN0QixDQUFDO0lBakRHLHdCQUF3QjtJQUV4QixnQkFBZ0I7SUFFaEIsd0NBQVEsR0FBUjtRQUNJLCtFQUErRTtRQUMvRSxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3Q0FBUSxHQUFSLFVBQVMsV0FBVyxFQUFFLEtBQUs7UUFBM0IsaUJBbUJDO1FBbEJHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQTtRQUNuQywrQ0FBK0M7UUFDL0Msc0NBQXNDO1FBQ3RDLHFDQUFxQztRQUNyQyxnRUFBZ0U7UUFDaEUsdUNBQXVDO1FBRXZDLFVBQVUsQ0FBQztZQUNQLCtEQUErRDtZQUMvRCx3RUFBd0U7WUFDeEUsbURBQW1EO1lBQ25ELFVBQVU7WUFDVix3QkFBd0I7WUFDeEIsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQzVCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUViLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsa0NBQWtDO0lBQ2xDLCtDQUErQztJQUMvQyxLQUFLO0lBRUwseUNBQVMsR0FBVDtRQUNJLGtFQUFrRTtRQUVsRSwwQ0FBMEM7SUFDOUMsQ0FBQztJQUVELHFDQUFLLEdBQUw7SUFFQSxDQUFDO0lBQ0QseUNBQVMsR0FBVDtJQUVBLENBQUM7SUFyREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0REFDTztJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzREQUNPO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkRBQ007SUFOUCxxQkFBcUI7UUFEekMsT0FBTztPQUNhLHFCQUFxQixDQXlEekM7SUFBRCw0QkFBQztDQXpERCxBQXlEQyxDQXpEa0QsRUFBRSxDQUFDLFNBQVMsR0F5RDlEO2tCQXpEb0IscUJBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuXHJcbi8qXHJcbiAqIEBEZXNjcmlwdHRpb246IFxyXG4gKiBAdmVyc2lvbjogXHJcbiAqIEBBdXRob3I6IG1pZXNcclxuICogQERhdGU6IDIwMjEtMDItMjMgMTc6MTQ6MDVcclxuICogQExhc3RFZGl0b3JzOiBtaWVzXHJcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjEtMDMtMDEgMTA6MjA6MzVcclxuICovXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdCaWdXaGVlbFByaXplQXdhcmQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFibGVfbnVtOiBjYy5MYWJlbCA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBpY29uSW1hZ2U6IGNjLlNwcml0ZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdmlld3BvcnQ6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIC8vIHRoaXMuVGVtcE5vZGVDb250cm9sbGVyID0gR2xvYmFsLlRlbXBOb2RlLmdldENvbXBvbmVudCgnVGVtcE5vZGVDb250cm9sbGVyJylcclxuICAgICAgICAvLyB0aGlzLlRlbXBOb2RlQ29udHJvbGxlci5zaG93Tm9kZSgpO1xyXG4gICAgICAgIHRoaXMudmlld3BvcnQub3BhY2l0eSA9IDI1NTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEFuaShzcHJpdGVGcmFtZSwgcG9pbnQpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuaWNvbkltYWdlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWVcclxuICAgICAgICB0aGlzLmxhYmxlX251bS5zdHJpbmcgPSBcIitcIiArIHBvaW50XHJcbiAgICAgICAgLy8gbGV0IGdhbWVJbmRleCA9IEdsb2JhbC5nZXQoXCJwbGF5ZXJDdXJHb2xkXCIpO1xyXG4gICAgICAgIC8vIGxldCBzcHJpdGVGcmFtZSA9IHRoaXMuc2hvd0ltZ0dvbGQ7XHJcbiAgICAgICAgLy8gbGV0IHVzZXJQb2ludCA9IGdhbWVJbmRleCAtIHBvaW50O1xyXG4gICAgICAgIC8vIGxldCB0ZW1wID0gdGhpcy5UZW1wTm9kZUNvbnRyb2xsZXIuc2hvd0NvbXAodXNlclBvaW50LCAyLCAyKTtcclxuICAgICAgICAvLyB0aGlzLmxhYmxlX251bS5zdHJpbmcgPSBgKyR7cG9pbnR9YDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBsYXlBbmltYXRlKGZhbHNlLCBzcHJpdGVGcmFtZSwgbnVsbCwgdGVtcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCB0ZW1wID0gdGhpcy5UZW1wTm9kZUNvbnRyb2xsZXIuc2hvd0NvbXAoZ2FtZUluZGV4LCAyLCAyKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB1aUZ1bmMuY2xvc2VVSShcIk5ld0JpZ1doZWVsUHJpemVBd2FyZFwiKTtcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsb3NlTXkoKXsgICAgXHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCLlpZblirHlkI7ov5vmnaU0NFwiKTsgICAgXHJcbiAgICAvLyAgICAgdWlGdW5jLmNsb3NlVUkoXCJOZXdCaWdXaGVlbFByaXplQXdhcmRcIik7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5UZW1wTm9kZUNvbnRyb2xsZXIpIHRoaXMuVGVtcE5vZGVDb250cm9sbGVyLmhpZGVOb2RlKClcclxuXHJcbiAgICAgICAgLy8gQ2xpZW50RXZlbnQuZGlzcGF0Y2goXCJnb2xkX2NvdW50XCIsIHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBjbG9zZVBhZ2UoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn1cclxuIl19