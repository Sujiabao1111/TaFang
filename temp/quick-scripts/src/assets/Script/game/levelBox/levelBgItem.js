"use strict";
cc._RF.push(module, '84f27TYRC1FXrivEq1I27Rw', 'levelBgItem');
// Script/game/levelBox/levelBgItem.ts

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
var levelBgItem = /** @class */ (function (_super) {
    __extends(levelBgItem, _super);
    function levelBgItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**目标位置 */
        _this.targetNode = null;
        //是否在删除
        _this.isKilled = false;
        return _this;
    }
    levelBgItem.prototype.start = function () {
    };
    levelBgItem.prototype.init = function (data) {
        var _this = this;
        this.initData = data;
        this.targetNode = data.node;
        this.isKilled = false;
        this.turretFn = cc.game.on("turret_bg_" + data.no, function () {
            _this.killSelf();
        }, this);
    };
    /**删除自己 */
    levelBgItem.prototype.killSelf = function () {
        this.isKilled = true;
        cc.game.off("turret_bg_" + this.initData.no, this.turretFn, this);
        cc.game.emit(NameTs_1.default.Game_LevelLabel_Killed, this.node);
    };
    levelBgItem.prototype.update = function (dt) {
        if (this.isKilled)
            return;
        if (!this.targetNode || !this.targetNode.isValid) {
            this.killSelf();
            return;
        }
        var pos = this.targetNode && this.targetNode.getPosition && this.targetNode.getPosition();
        this.node.x = pos.x - 47.931;
        this.node.y = pos.y + 36.495;
    };
    levelBgItem = __decorate([
        ccclass
    ], levelBgItem);
    return levelBgItem;
}(cc.Component));
exports.default = levelBgItem;

cc._RF.pop();