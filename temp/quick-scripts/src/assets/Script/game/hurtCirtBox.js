"use strict";
cc._RF.push(module, '4adb7vHf1VFUrVWnYJDQDhI', 'hurtCirtBox');
// Script/game/hurtCirtBox.ts

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
var NameTs_1 = require("../common/NameTs");
var pool_1 = require("../common/pool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var hurtCirtBox = /** @class */ (function (_super) {
    __extends(hurtCirtBox, _super);
    function hurtCirtBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    hurtCirtBox.prototype.onLoad = function () {
        var _this = this;
        this.loadAny("prefab/turret/turretHurt2", cc.Prefab, function (res) {
            _this.hurtPool2 = new pool_1.default(res, 20);
        });
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Hurt_Crit_Creator, function (data) {
            _this.hurtPool2.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Hurt_Crit_Killed, function (data) {
            _this.hurtPool2.onEnemyKilled(data);
        }, this);
    };
    hurtCirtBox.prototype.start = function () {
    };
    hurtCirtBox = __decorate([
        ccclass
    ], hurtCirtBox);
    return hurtCirtBox;
}(baseTs_1.default));
exports.default = hurtCirtBox;

cc._RF.pop();