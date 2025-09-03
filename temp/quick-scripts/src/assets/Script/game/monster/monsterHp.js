"use strict";
cc._RF.push(module, '26ca1g5fM5OCL/7uTQtgq1+', 'monsterHp');
// Script/game/monster/monsterHp.ts

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
var monsterHp = /** @class */ (function (_super) {
    __extends(monsterHp, _super);
    function monsterHp() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hp = null;
        /**目标 */
        _this.targetNode = null;
        /**运动中 */
        _this.isRuning = false;
        return _this;
        // update (dt) {}
    }
    /**
     * 设置血条
     * @param num 血条
     */
    monsterHp.prototype.setHp = function (num) {
        this.hp.progress = num;
    };
    monsterHp.prototype.onLoad = function () {
    };
    monsterHp.prototype.init = function (data) {
        var _this = this;
        this.targetNode = null;
        this.node.opacity = 0;
        this.hp.progress = 1;
        this.setHp(1);
        this.isRuning = true;
        this.initData = data;
        this.monsetrName = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + this.initData.id;
        this.targetNode = util_1.default.MonsterMap.get(this.monsetrName);
        if (!this.targetNode) {
            this.isRuning = false;
            this.destroySelf();
        }
        this.cc_game = cc.game.on(NameTs_1.default.Game_Monster_Hp_Linster + this.monsetrName, function (data) {
            _this.checkSelf(data);
        }, this);
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
        }, .5);
    };
    /**判断是否自己 */
    monsterHp.prototype.checkSelf = function (data) {
        if (data == 0) {
            this.isRuning = false;
            this.destroySelf();
            return;
        }
        this.setHp(data);
    };
    monsterHp.prototype.update = function () {
        // console.log(this.initData.id,'this.initData.node')
        if (!this.isRuning)
            return;
        if (!this.targetNode || (this.targetNode && !this.targetNode.getPosition)) {
            this.isRuning = false;
            this.destroySelf();
            return;
        }
        // console.log(this.targetNode.x,'this.targetNode')
        // if(this.targetNode&&this.targetNode.getPosition){
        // let pos:cc.Vec2 = this.targetNode.getPosition();
        this.node.x = this.targetNode.x || 0;
        this.node.y = (this.targetNode.y || 0) + 60;
        // }
    };
    monsterHp.prototype.start = function () {
    };
    /**回收自己 */
    monsterHp.prototype.destroySelf = function () {
        //回收自己
        this.node.opacity = 0;
        cc.game.off(NameTs_1.default.Game_Monster_Hp_Linster + this.monsetrName, this.cc_game, this);
        this.cc_game = null;
        cc.game.emit(NameTs_1.default.Game_Monster_Hp_Killed, this.node);
    };
    __decorate([
        property({ type: cc.ProgressBar, displayName: "血条" })
    ], monsterHp.prototype, "hp", void 0);
    monsterHp = __decorate([
        ccclass
    ], monsterHp);
    return monsterHp;
}(cc.Component));
exports.default = monsterHp;

cc._RF.pop();