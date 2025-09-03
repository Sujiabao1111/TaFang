"use strict";
cc._RF.push(module, '9ea440ynzRC/5ZBqC+sbsf4', 'monsterShadow');
// Script/game/monster/monsterShadow.ts

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
var util_1 = require("../../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var monsterShadow = /** @class */ (function (_super) {
    __extends(monsterShadow, _super);
    function monsterShadow() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**目标 */
        _this.targetNode = null;
        return _this;
        // update (dt) {}
    }
    monsterShadow.prototype.onLoad = function () {
    };
    monsterShadow.prototype.init = function (data) {
        var _this = this;
        this.initData = data;
        this.monsetrName = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + this.initData.id;
        this.targetNode = util_1.default.MonsterMap.get(this.monsetrName);
        if (this.targetNode) {
            this.node.setPosition(this.targetNode.getPosition());
        }
        else {
            this.destroySelf();
        }
        cc.game.on(NameTs_1.default.Game_Monster_Shadow_Linster + this.monsetrName, function (data) {
            _this.destroySelf();
        }, this);
    };
    monsterShadow.prototype.update = function () {
        // console.log(this.initData.id,'this.initData.node')
        if (!this.targetNode) {
            this.destroySelf();
            this.targetNode = null;
            return;
        }
        // console.log(this.targetNode.x,'this.targetNode')
        var pos = this.targetNode.getPosition();
        this.node.x = pos.x;
        this.node.y = pos.y;
    };
    monsterShadow.prototype.start = function () {
    };
    /**回收自己 */
    monsterShadow.prototype.destroySelf = function () {
        //回收自己
        cc.game.off(NameTs_1.default.Game_Monster_Shadow_Linster + this.monsetrName, this.destroySelf);
        cc.game.emit(NameTs_1.default.Game_Monster_Hp_Killed, this.node);
    };
    monsterShadow = __decorate([
        ccclass
    ], monsterShadow);
    return monsterShadow;
}(cc.Component));
exports.default = monsterShadow;

cc._RF.pop();