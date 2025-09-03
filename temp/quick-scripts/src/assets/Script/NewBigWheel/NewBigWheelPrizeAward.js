"use strict";
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