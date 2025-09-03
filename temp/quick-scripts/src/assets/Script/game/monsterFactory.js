"use strict";
cc._RF.push(module, '9f263p8gh5CyLWFNH4sNgLD', 'monsterFactory');
// Script/game/monsterFactory.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var soundController_1 = require("../soundController");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var monsterFactory = /** @class */ (function (_super) {
    __extends(monsterFactory, _super);
    function monsterFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**是否进行中冰冻 */
        _this.isFrozen = false;
        /**是否进行中保护 */
        _this.isShield = false;
        return _this;
    }
    monsterFactory.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_End, function () {
            _this.stopWalk();
        }, this);
        //监听游戏暂停
        cc.game.on(NameTs_1.default.Game_Stop, function () {
            _this.stopWalk();
        }, this);
        //监听游戏继续
        cc.game.on(NameTs_1.default.Game_Resume, function () {
            _this.resumeWalk();
        }, this);
        //清屏道具
        cc.game.on(NameTs_1.default.Tool_Effect_Name.Game_Prop_Cls, function (res) {
            if (_this.walkNo > 0) {
                _this.clearMonster();
            }
        }, this);
        //普通消除，不会有金币
        cc.game.on(NameTs_1.default.Game_Monster_clearAll, function (res) {
            _this.clearMonster2();
        }, this);
    };
    /**行走 */
    monsterFactory.prototype.walk = function () {
        var _this = this;
        if (this.walkNo >= this.walkArr.length - 1) {
            if (this.isShield)
                return;
            this.GameEnd();
            console.log("走到总店了");
            return;
        }
        this.walkNo++;
        this.node.zIndex = this.walkNo;
        //设置当前
        util_1.default.setLevelMonsterData(this.id, this.walkArr.length - 1 - this.walkNo);
        var nextPos = util_1.default.GetMapPos(this.walkArr[this.walkNo].y, this.walkArr[this.walkNo].x);
        cc.tween(this.node).to(Number(this.initData.speed) / 77, { x: nextPos.x, y: nextPos.y }).call(function () {
            _this.walk();
        }).start();
    };
    /**
     * 结束游戏
     */
    monsterFactory.prototype.GameEnd = function () {
        util_1.default.sendTurretData();
        util_1.default.levelState = faceTs_1.gameState.end;
        cc.game.emit(NameTs_1.default.Game_End, faceTs_1.gamePass.fail);
    };
    /**
     * 怪兽受伤
     * @param atk 扣多少血
     * @param citr 暴击
     */
    monsterFactory.prototype.monsterBruise = function (atk, crit) {
        if (crit === void 0) { crit = 1; }
        // if(this.)
        //暴击
        atk *= crit;
        //增能
        var energizedNum = util_1.default.userData.prop[faceTs_1.propType.energized - 1].use ? 1 : 0;
        //电击
        var shockNum = util_1.default.userData.prop[faceTs_1.propType.shock - 1].use ? .2 : 0;
        //伤害
        var hurtNum = Math.floor(Number(atk) * (1 + shockNum + energizedNum));
        //扣血
        this.monsterHp -= hurtNum;
        //伤害值
        if (crit == 1) {
            cc.game.emit(NameTs_1.default.Game_Hurt_Creator, { value: hurtNum, pos: this.node.getPosition() });
        }
        else {
            cc.game.emit(NameTs_1.default.Game_Hurt_Crit_Creator, { value: hurtNum * crit, pos: this.node.getPosition() });
        }
        this.setHp(this.monsterHp / this.initData.hp);
        if (this.monsterHp <= 0) {
            this.clearMonster();
            soundController_1.default.singleton.playDeadAudio();
            return;
        }
    };
    /**设置血量 */
    monsterFactory.prototype.setHp = function (num) {
        cc.game.emit(NameTs_1.default.Game_Monster_Hp_Linster + this.monsetrName, num);
    };
    monsterFactory.prototype.update = function (dt) {
        if (util_1.default.levelState !== faceTs_1.gameState.start)
            return;
        if (util_1.default.userData.prop[faceTs_1.propType.frozen - 1].use == faceTs_1.propState.start && this.walkNo > 0 && !this.isFrozen) {
            this.isFrozen = true;
            this.openFrozen();
            this.stopWalk();
        }
        else if (util_1.default.userData.prop[faceTs_1.propType.frozen - 1].use == faceTs_1.propState.end && this.isFrozen) {
            this.closeFrozen();
            this.resumeWalk();
        }
        if (util_1.default.userData.prop[faceTs_1.propType.shield - 1].use == faceTs_1.propState.start && !this.isShield) {
            this.isShield = true;
        }
        else if (util_1.default.userData.prop[faceTs_1.propType.shield - 1].use == faceTs_1.propState.end && this.isShield) {
            this.isShield = false;
        }
    };
    /**暂停走 */
    monsterFactory.prototype.stopWalk = function () {
        this.node.pauseAllActions();
        this.monsterSpine.node.pauseAllActions();
    };
    /**继续走 */
    monsterFactory.prototype.resumeWalk = function () {
        this.isFrozen = false;
        this.monsterSpine.node.resumeAllActions();
        this.node.resumeAllActions();
    };
    /**
     * 开启冰冻
     */
    monsterFactory.prototype.openFrozen = function () {
    };
    /**
     * 关闭冰冻
     */
    monsterFactory.prototype.closeFrozen = function () {
    };
    /**
     * 清理怪兽
     */
    monsterFactory.prototype.clearMonster = function () {
        util_1.default.MonsterMap.delete(this.monsetrName);
        this.node.stopAllActions();
        util_1.default.delectLevelMonster(this.id);
        var Earn = 1;
        if (util_1.default.doubleEarn.use) {
            Earn = 2;
        }
        var pos = this.node.getPosition();
        var coin = util_1.default.GetBehaviorRewardVo(2);
        var color = util_1.default.GetMonsterColor(this.colorLevel);
        cc.game.off(NameTs_1.default.Game_Monster_Bruise + this.monsetrName);
        cc.game.emit(NameTs_1.default.Game_Monster_Killed, { id: this.id, node: this.node, coin: coin * Earn });
        cc.game.emit(NameTs_1.default.Game_Monster_Shadow_Linster + this.monsetrName);
        cc.game.emit(NameTs_1.default.Game_Monster_Hp_Linster + this.monsetrName, 0);
        cc.game.emit(NameTs_1.default.Game_Monster_Blood_Creater, { pos: pos, color: color });
    };
    /**
     * 普通清除
     */
    monsterFactory.prototype.clearMonster2 = function () {
        util_1.default.MonsterMap.delete(this.monsetrName);
        this.node.stopAllActions();
        util_1.default.delectLevelMonster(this.id);
        cc.game.off(NameTs_1.default.Game_Monster_Bruise + this.monsetrName);
        cc.game.emit(NameTs_1.default.Game_Monster_Killed, { id: this.id, node: this.node, coin: 0 });
        cc.game.emit(NameTs_1.default.Game_Monster_Shadow_Linster + this.monsetrName);
        cc.game.emit(NameTs_1.default.Game_Monster_Hp_Linster + this.monsetrName, 0);
    };
    /**
     * 加载图片
     */
    monsterFactory.prototype.loadSpine = function () {
        // cc.resources.load("/texture/monster/monster"+Number(level),cc.SpriteFrame,(err,res:cc.SpriteFrame)=>{
        //     if(err){
        //         console.error("找不到该图片",err);
        //         return;
        //     }
        // });
        // let monsterData = util.GetMonsterData(level);
        // console.log(monsterData,'monsterData')
        this.monsterSpine.armatureName = this.monsterData.armature;
        this.monsterSpine.animationName = this.monsterData.animation;
        this.monsterSpine.playTimes = 0;
    };
    /**
     * 死亡动画
     * @param call 回调
     */
    monsterFactory.prototype.dieAni = function (call) { };
    monsterFactory = __decorate([
        ccclass
    ], monsterFactory);
    return monsterFactory;
}(cc.Component));
exports.default = monsterFactory;

cc._RF.pop();