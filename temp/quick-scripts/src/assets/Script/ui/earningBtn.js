"use strict";
cc._RF.push(module, '4a603a+WKJML4xXpx74Etq3', 'earningBtn');
// Script/ui/earningBtn.ts

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
var NameTs_1 = require("../common/NameTs");
var tool_1 = require("../util/tool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var earningBtn = /** @class */ (function (_super) {
    __extends(earningBtn, _super);
    function earningBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pic = null; //图片
        _this.spine = null; //收益
        _this.timeLabel = null; //时间
        return _this;
        // update (dt) {}
    }
    earningBtn.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Earnings_Linster, function (res) {
            _this.time = res;
            _this.setState();
        }, this);
    };
    earningBtn.prototype.start = function () {
    };
    /**
     * 设置状态
     */
    earningBtn.prototype.setState = function () {
        this.pic.active = this.time <= 0;
        this.spine.active = this.time > 0;
        this.timeLabel.node.getParent().active = this.time > 0;
        if (this.time > 0) {
            this.djs();
        }
    };
    /**
     * 倒计时
    */
    earningBtn.prototype.djs = function () {
        var _this = this;
        this.schedule(function () {
            _this.time--;
            if (_this.time <= 0) {
                _this.unscheduleAllCallbacks();
                _this.setState();
                return;
            }
            _this.timeLabel.string = tool_1.default.changeTime(_this.time);
        }, 1);
    };
    __decorate([
        property(cc.Node)
    ], earningBtn.prototype, "pic", void 0);
    __decorate([
        property(cc.Node)
    ], earningBtn.prototype, "spine", void 0);
    __decorate([
        property(cc.Label)
    ], earningBtn.prototype, "timeLabel", void 0);
    earningBtn = __decorate([
        ccclass
    ], earningBtn);
    return earningBtn;
}(cc.Component));
exports.default = earningBtn;

cc._RF.pop();