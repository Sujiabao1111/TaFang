"use strict";
cc._RF.push(module, '722c1HQRohHXI3k1FxdsQU3', 'levelBgBox');
// Script/game/levelBgBox.ts

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
var levelBox = /** @class */ (function (_super) {
    __extends(levelBox, _super);
    function levelBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**背景对象池 */
        _this.levelBgItem = null;
        return _this;
        // update (dt) {}
    }
    levelBox.prototype.onLoad = function () {
        var _this = this;
        var item = cc.instantiate(this.levelBgItem);
        this.bgPool = new pool_1.default(item, 16);
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_LevelBg_Creator, function (data) {
            _this.bgPool.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_LevelBg_Killed, function (data) {
            if (data) {
                _this.bgPool.onEnemyKilled(data);
            }
        }, this);
    };
    levelBox.prototype.start = function () {
    };
    __decorate([
        property(cc.Prefab)
    ], levelBox.prototype, "levelBgItem", void 0);
    levelBox = __decorate([
        ccclass
    ], levelBox);
    return levelBox;
}(baseTs_1.default));
exports.default = levelBox;

cc._RF.pop();