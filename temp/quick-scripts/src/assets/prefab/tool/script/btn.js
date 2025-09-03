"use strict";
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