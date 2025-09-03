"use strict";
cc._RF.push(module, '1f820/J3cpCCKVB7ilFYspS', 'monsterBlood');
// Script/game/monster/monsterBlood.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var monsterBlood = /** @class */ (function (_super) {
    __extends(monsterBlood, _super);
    function monsterBlood() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this.ArmatureDisplay = null;
        return _this;
        // update (dt) {}
    }
    monsterBlood.prototype.onLoad = function () {
    };
    monsterBlood.prototype.init = function (data) {
        var _this = this;
        var tempColor = new cc.Color();
        tempColor.fromHEX(data.color);
        this.node.setPosition(data.pos);
        this.ArmatureDisplay.node.color = tempColor;
        this.ArmatureDisplay.playAnimation("monsterblood", 1);
        this.scheduleOnce(function () {
            _this.destroySelf();
        }, 1);
    };
    monsterBlood.prototype.start = function () {
    };
    /**回收自己 */
    monsterBlood.prototype.destroySelf = function () {
        //回收自己
        cc.game.emit(NameTs_1.default.Game_Monster_Blood_Killed, this.node);
    };
    __decorate([
        property({ displayName: "龙骨", type: dragonBones.ArmatureDisplay })
    ], monsterBlood.prototype, "ArmatureDisplay", void 0);
    monsterBlood = __decorate([
        ccclass
    ], monsterBlood);
    return monsterBlood;
}(cc.Component));
exports.default = monsterBlood;

cc._RF.pop();