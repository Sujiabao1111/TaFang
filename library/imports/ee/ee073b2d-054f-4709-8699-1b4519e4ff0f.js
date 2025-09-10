"use strict";
cc._RF.push(module, 'ee073stBU9HCYaZG0UZ5P8P', 'TipBox');
// Script/model/TipBox.ts

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
var NameTs_1 = require("../common/NameTs");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TipBox = /** @class */ (function (_super) {
    __extends(TipBox, _super);
    function TipBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tipsNode = null;
        return _this;
        // showSpecailMessage(text: string, position: cc.Vec3, delayTime: number = 2) {
        //     this.tip_label.string = text
        //     this.node.position = position
        //     this.node.opacity = 255
        //     this.node.runAction(cc.sequence(cc.moveBy(delayTime / 2, 0, 100), cc.delayTime(delayTime / 4), cc.fadeOut(delayTime / 4), cc.callFunc(() => {
        //         this.node.active = false;
        //     })))
        // }
        // update (dt) {}
    }
    TipBox.prototype.onLoad = function () {
        var _this = this;
        this.node.removeAllChildren();
        cc.director.on(NameTs_1.default.Show_Toast, function (res) {
            var tipNode = cc.instantiate(_this.tipsNode);
            tipNode.parent = _this.node;
            tipNode.position = cc.v3(0, 0, 0);
            tipNode.getChildByName("label").getComponent(cc.Label).string = res;
            _this.showMessage(tipNode);
        }, this);
    };
    TipBox.prototype.showMessage = function (item) {
        item.active = true;
        item.position = cc.v3(0, 0, 0);
        // item.opacity = 255;
        //action
        cc.tween(item)
            .delay(1.3)
            .to(1, { opacity: 0 }, { easing: cc.easing.quintOut })
            .start();
        cc.tween(item)
            .to(1, { position: cc.v3(0, 150) }, { easing: cc.easing.quintOut })
            .delay(0.3)
            .to(1, { position: cc.v3(0, 0) }, { easing: cc.easing.quintOut })
            .call(function (node) { return node.destroy(); })
            .start();
        // cc.tween(item).to(1, { y: 250 }).to(0.8, { opacity: 0 }).call(() => {
        //     item.destroy();
        // }).start();
    };
    __decorate([
        property(cc.Node)
    ], TipBox.prototype, "tipsNode", void 0);
    TipBox = __decorate([
        ccclass
    ], TipBox);
    return TipBox;
}(cc.Component));
exports.default = TipBox;

cc._RF.pop();