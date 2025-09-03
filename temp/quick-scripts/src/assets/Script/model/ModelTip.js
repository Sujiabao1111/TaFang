"use strict";
cc._RF.push(module, '4a20d4mnr9M6Zv0YW9qn2zW', 'ModelTip');
// Script/model/ModelTip.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ModelTip = /** @class */ (function (_super) {
    __extends(ModelTip, _super);
    function ModelTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tip_label = null;
        return _this;
    }
    ModelTip.prototype.showMessage = function (text) {
        var _this = this;
        this.tip_label.string = text;
        this.node.active = true;
        this.node.position = cc.v3(0, 0, 0);
        this.node.opacity = 255;
        // this.node.runAction(cc.sequence(cc.moveBy(1, 0, 100), cc.fadeOut(0.5), cc.callFunc(() => {
        //     this.node.active = true;
        // })));
        cc.tween(this.node).to(1, { y: 100 }).to(.5, { opacity: 0 }).call(function () {
            _this.node.active = false;
        }).start();
    };
    ModelTip.prototype.showSpecailMessage = function (text, position, delayTime) {
        var _this = this;
        if (delayTime === void 0) { delayTime = 2; }
        this.tip_label.string = text;
        this.node.position = position;
        this.node.opacity = 255;
        this.node.runAction(cc.sequence(cc.moveBy(delayTime / 2, 0, 100), cc.delayTime(delayTime / 4), cc.fadeOut(delayTime / 4), cc.callFunc(function () {
            _this.node.active = false;
        })));
    };
    __decorate([
        property(cc.Label)
    ], ModelTip.prototype, "tip_label", void 0);
    ModelTip = __decorate([
        ccclass
    ], ModelTip);
    return ModelTip;
}(baseTs_1.default));
exports.default = ModelTip;

cc._RF.pop();