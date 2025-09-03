"use strict";
cc._RF.push(module, '8ed4fWoIrZPRrrSyt4JwMFs', 'levelLabelItem');
// Script/game/levelBox/levelLabelItem.ts

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
var levelLabelItem = /** @class */ (function (_super) {
    __extends(levelLabelItem, _super);
    function levelLabelItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null; //文字
        /**目标位置 */
        _this.targetNode = null;
        //是否在删除
        _this.isKilled = false;
        return _this;
    }
    levelLabelItem.prototype.start = function () {
    };
    levelLabelItem.prototype.init = function (data) {
        var _this = this;
        this.initData = data;
        this.targetNode = data.node;
        this.label.string = data.level;
        this.isKilled = false;
        this.turretFn = cc.game.on("turret_label_" + data.no, function () {
            _this.killSelf();
        }, this);
    };
    /**删除自己 */
    levelLabelItem.prototype.killSelf = function () {
        this.isKilled = true;
        cc.game.off("turret_label_" + this.initData.no, this.turretFn, this);
        cc.game.emit(NameTs_1.default.Game_LevelLabel_Killed, this.node);
    };
    levelLabelItem.prototype.update = function (dt) {
        if (this.isKilled)
            return;
        if (!this.targetNode || !this.targetNode.isValid) {
            this.killSelf();
            return;
        }
        try {
            if (this.targetNode && this.targetNode.getPosition) {
                var pos = this.targetNode.getPosition();
                this.node.x = pos.x - 48.878;
                this.node.y = pos.y + 40.735;
            }
        }
        catch (error) {
            console.log(error, this.initData.no, 'error');
        }
    };
    __decorate([
        property(cc.Label)
    ], levelLabelItem.prototype, "label", void 0);
    levelLabelItem = __decorate([
        ccclass
    ], levelLabelItem);
    return levelLabelItem;
}(cc.Component));
exports.default = levelLabelItem;

cc._RF.pop();