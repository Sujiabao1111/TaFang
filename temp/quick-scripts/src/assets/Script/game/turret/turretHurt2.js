"use strict";
cc._RF.push(module, '1944d5gBURJ45p46GgH8aJL', 'turretHurt2');
// Script/game/turret/turretHurt2.ts

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
var tool_1 = require("../../util/tool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretHurt2 = /** @class */ (function (_super) {
    __extends(turretHurt2, _super);
    function turretHurt2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hurtLabel = null;
        return _this;
    }
    turretHurt2.prototype.start = function () {
    };
    /**初始化 */
    turretHurt2.prototype.init = function (data) {
        var _this = this;
        //设置出生位置
        var pos = data.pos;
        this.node.setPosition(pos);
        // this.node.scale = 0;
        // this.node.opacity = 255;
        // cc.tween(this.node).to(.1,{scale:1}).by(.3,{x:20,y:-10}).call(()=>{
        //     this.destroyhurt();
        // }).start();
        this.hurtLabel.string = "~" + tool_1.default.changeUnit(data.value);
        this.node.scale = 1;
        this.node.opacity = 255;
        cc.tween(this.node).parallel(cc.tween().by(.8, { y: 100 }), cc.tween().to(.15, { scale: 1.2 }).to(.15, { scale: 1 }), cc.tween().delay(.4).to(.4, { opacity: 0 })).call(function () {
            _this.destroyhurt();
        }).start();
    };
    /**回收自己 */
    turretHurt2.prototype.destroyhurt = function () {
        //回收自己
        // this.node.destroy();
        // this.node.removeFromParent();
        // return
        cc.game.emit(NameTs_1.default.Game_Hurt_Crit_Killed, this.node);
    };
    __decorate([
        property({ type: cc.Label, displayName: "数值" })
    ], turretHurt2.prototype, "hurtLabel", void 0);
    turretHurt2 = __decorate([
        ccclass
    ], turretHurt2);
    return turretHurt2;
}(cc.Component));
exports.default = turretHurt2;

cc._RF.pop();