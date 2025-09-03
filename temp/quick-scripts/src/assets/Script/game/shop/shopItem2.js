"use strict";
cc._RF.push(module, '32cdeOqhy1JN6chT9S5OIiO', 'shopItem2');
// Script/game/shop/shopItem2.ts

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
var shopItem2 = /** @class */ (function (_super) {
    __extends(shopItem2, _super);
    function shopItem2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stateLabel = null;
        _this.pic = null;
        return _this;
        // update (dt) {}
    }
    shopItem2.prototype.start = function () {
    };
    shopItem2.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Shop_MonsterItem, function (res) {
            if (res == _this.initData.level) {
                _this.stateLabel.string = "选中";
            }
            else {
                _this.stateLabel.string = "";
            }
        }, this);
    };
    shopItem2.prototype.init = function (data) {
        // cc.resources.load()
        this.initData = data.data;
        this.stateLabel.string = data.id;
        this.node.zIndex = data.id;
    };
    /**
     * 点击
     */
    shopItem2.prototype.click = function () {
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Shop_UpData, this.initData.level);
        cc.game.emit(NameTs_1.default.Game_Shop_MonsterItem, this.initData.level);
    };
    __decorate([
        property({ type: cc.Label, displayName: "状态文本" })
    ], shopItem2.prototype, "stateLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "图片" })
    ], shopItem2.prototype, "pic", void 0);
    shopItem2 = __decorate([
        ccclass
    ], shopItem2);
    return shopItem2;
}(cc.Component));
exports.default = shopItem2;

cc._RF.pop();