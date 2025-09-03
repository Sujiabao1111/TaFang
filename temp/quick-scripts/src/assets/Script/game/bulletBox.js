"use strict";
cc._RF.push(module, 'd66b7rxShZHwKH9nxWf7FjU', 'bulletBox');
// Script/game/bulletBox.ts

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
var bulletBox = /** @class */ (function (_super) {
    __extends(bulletBox, _super);
    function bulletBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bulletBox.prototype.onLoad = function () {
        var _this = this;
        /**初始化对象池 */
        this.loadAny("prefab/turret/turretBullet", cc.Prefab, function (res) {
            var item = cc.instantiate(res);
            _this.bulletPool = new pool_1.default(item, 10);
        });
        /**初始化对象池 */
        this.loadAny("prefab/turret/BulletBoom", cc.Prefab, function (res) {
            var item = cc.instantiate(res);
            _this.boomPool = new pool_1.default(item, 40);
        });
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Turret_Bullet_Creator, function (data) {
            _this.bulletPool.createEnemy(_this.node, data);
        }, this);
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Bullet_Boom_Creator, function (data) {
            _this.boomPool.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Turret_Bullet_Killed, function (data) {
            _this.bulletPool.onEnemyKilled(data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Bullet_Boom_Killed, function (data) {
            _this.boomPool.onEnemyKilled(data);
        }, this);
    };
    bulletBox.prototype.start = function () {
    };
    bulletBox = __decorate([
        ccclass
    ], bulletBox);
    return bulletBox;
}(baseTs_1.default));
exports.default = bulletBox;

cc._RF.pop();