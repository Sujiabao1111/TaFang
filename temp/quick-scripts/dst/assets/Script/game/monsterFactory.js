
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/monsterFactory.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9f263p8gh5CyLWFNH4sNgLD', 'monsterFactory');
// Script/game/monsterFactory.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
    Object.defineProperty(monsterFactory.prototype, "_userData", {
        get: function () {
            return util_1.default.userData;
        },
        enumerable: false,
        configurable: true
    });
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
            console.log("走到终点了");
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
        var energizedNum = this._userData.prop[faceTs_1.propType.energized - 1].use ? 1 : 0;
        //电击
        var shockNum = this._userData.prop[faceTs_1.propType.shock - 1].use ? .2 : 0;
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
        if (this._userData.prop[faceTs_1.propType.frozen - 1].use == faceTs_1.propState.start && this.walkNo > 0 && !this.isFrozen) {
            this.isFrozen = true;
            this.openFrozen();
            this.stopWalk();
        }
        else if (this._userData.prop[faceTs_1.propType.frozen - 1].use == faceTs_1.propState.end && this.isFrozen) {
            this.closeFrozen();
            this.resumeWalk();
        }
        if (this._userData.prop[faceTs_1.propType.shield - 1].use == faceTs_1.propState.start && !this.isShield) {
            this.isShield = true;
        }
        else if (this._userData.prop[faceTs_1.propType.shield - 1].use == faceTs_1.propState.end && this.isShield) {
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxtb25zdGVyRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBb0c7QUFDcEcsMkNBQXNDO0FBRXRDLHNEQUFpRDtBQUNqRCxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUE2UEM7UUF6T0csYUFBYTtRQUNiLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsYUFBYTtRQUNiLGNBQVEsR0FBWSxLQUFLLENBQUM7O0lBcU85QixDQUFDO0lBdE5HLHNCQUFXLHFDQUFTO2FBQXBCO1lBQ0ksT0FBTyxjQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsK0JBQU0sR0FBTjtRQUFBLGlCQStCQztRQTdCRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLFFBQVEsRUFBRTtZQUN4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsUUFBUTtRQUNSLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsU0FBUyxFQUFFO1lBRXpCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVwQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxRQUFRO1FBQ1IsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxXQUFXLEVBQUU7WUFFM0IsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXRCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVULE1BQU07UUFDTixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGdC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QyxXQUFXLENBQUMsQ0FBQztRQUNwRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0NBQVMsR0FBVDtRQUVJLHdHQUF3RztRQUV4RyxlQUFlO1FBQ2YsdUNBQXVDO1FBQ3ZDLGtCQUFrQjtRQUNsQixRQUFRO1FBRVIsTUFBTTtRQUNOLGdEQUFnRDtRQUNoRCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBR3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSCwrQkFBTSxHQUFOLFVBQU8sSUFBYyxJQUFJLENBQUM7SUE1UFQsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQTZQbEM7SUFBRCxxQkFBQztDQTdQRCxBQTZQQyxDQTdQMkMsRUFBRSxDQUFDLFNBQVMsR0E2UHZEO2tCQTdQb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVQYXNzLCBnYW1lU3RhdGUsIG1vbnN0ZXJJbmZvLCBwcm9wU3RhdGUsIHByb3BUeXBlLCB0aGluZ1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9kYXRhL3VzZXJEYXRhXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1vbnN0ZXJGYWN0b3J5IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuXG4gICAgLyoq5Yid5aeL5pWw5o2uICovXG4gICAgaW5pdERhdGE6IG1vbnN0ZXJJbmZvO1xuXG4gICAgLyoq5Ye655Sf5Zyo5ZOq6YeMICovXG4gICAgaW5pdFBvczogY2MuVmVjMjtcblxuICAgIC8qKuW9k+WJjeihjOi1sOesrOWHoOS4quaVsOe7hCjpu5jorqTkuLowKSovXG4gICAgd2Fsa05vOiBudW1iZXI7XG4gICAgLyoq5b2T5YmN6KGM6LWw6L2o6L+5Ki9cbiAgICB3YWxrQXJyOiBhbnlbXTtcblxuICAgIC8qKuaAqueJqeeahGlkICovXG4gICAgaWQ6IG51bWJlcjtcblxuICAgIC8qKuaAquWFveihgOmHjyAqL1xuICAgIG1vbnN0ZXJIcDogbnVtYmVyO1xuXG4gICAgLyoq5piv5ZCm6L+b6KGM5Lit5Yaw5Ya7ICovXG4gICAgaXNGcm96ZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKuaYr+WQpui/m+ihjOS4reS/neaKpCAqL1xuICAgIGlzU2hpZWxkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKirmgKrlhb3lm77niYcgKi9cbiAgICBtb25zdGVyU3BpbmU6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheTtcblxuICAgIC8qKm1hcE5hbWUgKi9cbiAgICBtb25zZXRyTmFtZTogc3RyaW5nO1xuXG4gICAgLyoq6aKc6Imy562J57qnICovXG4gICAgY29sb3JMZXZlbDogbnVtYmVyO1xuXG4gICAgLyoq5oCq5YW95pWw5o2uICovXG4gICAgbW9uc3RlckRhdGE6IGFueTtcblxuXG4gICAgcHVibGljIGdldCBfdXNlckRhdGEoKTogVXNlckRhdGEge1xuICAgICAgICByZXR1cm4gdXRpbC51c2VyRGF0YTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9FbmQsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFdhbGsoKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy/nm5HlkKzmuLjmiI/mmoLlgZxcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TdG9wLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcFdhbGsoKTtcblxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvL+ebkeWQrOa4uOaIj+e7p+e7rVxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1Jlc3VtZSwgKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnJlc3VtZVdhbGsoKTtcblxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvL+a4heWxj+mBk+WFt1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9DbHMsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLndhbGtObyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyTW9uc3RlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvL+aZrumAmua2iOmZpO+8jOS4jeS8muaciemHkeW4gVxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX01vbnN0ZXJfY2xlYXJBbGwsIChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJNb25zdGVyMigpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cblxuICAgIC8qKuihjOi1sCAqL1xuICAgIHdhbGsoKSB7XG4gICAgICAgIGlmICh0aGlzLndhbGtObyA+PSB0aGlzLndhbGtBcnIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaGllbGQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuR2FtZUVuZCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLotbDliLDnu4jngrnkuoZcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2Fsa05vKys7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSB0aGlzLndhbGtObztcbiAgICAgICAgLy/orr7nva7lvZPliY1cbiAgICAgICAgdXRpbC5zZXRMZXZlbE1vbnN0ZXJEYXRhKHRoaXMuaWQsIHRoaXMud2Fsa0Fyci5sZW5ndGggLSAxIC0gdGhpcy53YWxrTm8pO1xuICAgICAgICBsZXQgbmV4dFBvczogY2MuVmVjMiA9IHV0aWwuR2V0TWFwUG9zKHRoaXMud2Fsa0Fyclt0aGlzLndhbGtOb10ueSwgdGhpcy53YWxrQXJyW3RoaXMud2Fsa05vXS54KTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50byhOdW1iZXIodGhpcy5pbml0RGF0YS5zcGVlZCkgLyA3NywgeyB4OiBuZXh0UG9zLngsIHk6IG5leHRQb3MueSB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2FsaygpO1xuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOe7k+adn+a4uOaIj1xuICAgICAqL1xuICAgIEdhbWVFbmQoKSB7XG5cbiAgICAgICAgdXRpbC5zZW5kVHVycmV0RGF0YSgpO1xuICAgICAgICB1dGlsLmxldmVsU3RhdGUgPSBnYW1lU3RhdGUuZW5kO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRW5kLCBnYW1lUGFzcy5mYWlsKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaAquWFveWPl+S8pFxuICAgICAqIEBwYXJhbSBhdGsg5omj5aSa5bCR6KGAXG4gICAgICogQHBhcmFtIGNpdHIg5pq05Ye7XG4gICAgICovXG5cbiAgICBtb25zdGVyQnJ1aXNlKGF0azogbnVtYmVyLCBjcml0OiBudW1iZXIgPSAxKSB7XG4gICAgICAgIC8vIGlmKHRoaXMuKVxuICAgICAgICAvL+aatOWHu1xuICAgICAgICBhdGsgKj0gY3JpdDtcbiAgICAgICAgLy/lop7og71cbiAgICAgICAgbGV0IGVuZXJnaXplZE51bTogbnVtYmVyID0gdGhpcy5fdXNlckRhdGEucHJvcFtwcm9wVHlwZS5lbmVyZ2l6ZWQgLSAxXS51c2UgPyAxIDogMDtcbiAgICAgICAgLy/nlLXlh7tcbiAgICAgICAgbGV0IHNob2NrTnVtOiBudW1iZXIgPSB0aGlzLl91c2VyRGF0YS5wcm9wW3Byb3BUeXBlLnNob2NrIC0gMV0udXNlID8gLjIgOiAwO1xuICAgICAgICAvL+S8pOWus1xuICAgICAgICBsZXQgaHVydE51bTogbnVtYmVyID0gTWF0aC5mbG9vcihOdW1iZXIoYXRrKSAqICgxICsgc2hvY2tOdW0gKyBlbmVyZ2l6ZWROdW0pKTtcbiAgICAgICAgLy/miaPooYBcbiAgICAgICAgdGhpcy5tb25zdGVySHAgLT0gaHVydE51bTtcblxuXG4gICAgICAgIC8v5Lyk5a6z5YC8XG4gICAgICAgIGlmIChjcml0ID09IDEpIHtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9IdXJ0X0NyZWF0b3IsIHsgdmFsdWU6IGh1cnROdW0sIHBvczogdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfSHVydF9Dcml0X0NyZWF0b3IsIHsgdmFsdWU6IGh1cnROdW0gKiBjcml0LCBwb3M6IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRIcCh0aGlzLm1vbnN0ZXJIcCAvIHRoaXMuaW5pdERhdGEuaHApO1xuXG4gICAgICAgIGlmICh0aGlzLm1vbnN0ZXJIcCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTW9uc3RlcigpO1xuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5RGVhZEF1ZGlvKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirorr7nva7ooYDph48gKi9cbiAgICBzZXRIcChudW0pIHtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfSHBfTGluc3RlciArIHRoaXMubW9uc2V0ck5hbWUsIG51bSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG5cbiAgICAgICAgaWYgKHV0aWwubGV2ZWxTdGF0ZSAhPT0gZ2FtZVN0YXRlLnN0YXJ0KSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGF0YS5wcm9wW3Byb3BUeXBlLmZyb3plbiAtIDFdLnVzZSA9PSBwcm9wU3RhdGUuc3RhcnQgJiYgdGhpcy53YWxrTm8gPiAwICYmICF0aGlzLmlzRnJvemVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzRnJvemVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub3BlbkZyb3plbigpO1xuICAgICAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3VzZXJEYXRhLnByb3BbcHJvcFR5cGUuZnJvemVuIC0gMV0udXNlID09IHByb3BTdGF0ZS5lbmQgJiYgdGhpcy5pc0Zyb3plbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUZyb3plbigpO1xuICAgICAgICAgICAgdGhpcy5yZXN1bWVXYWxrKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLnByb3BbcHJvcFR5cGUuc2hpZWxkIC0gMV0udXNlID09IHByb3BTdGF0ZS5zdGFydCAmJiAhdGhpcy5pc1NoaWVsZCkge1xuICAgICAgICAgICAgdGhpcy5pc1NoaWVsZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fdXNlckRhdGEucHJvcFtwcm9wVHlwZS5zaGllbGQgLSAxXS51c2UgPT0gcHJvcFN0YXRlLmVuZCAmJiB0aGlzLmlzU2hpZWxkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU2hpZWxkID0gZmFsc2U7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoq5pqC5YGc6LWwICovXG4gICAgc3RvcFdhbGsoKSB7XG4gICAgICAgIHRoaXMubm9kZS5wYXVzZUFsbEFjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3BpbmUubm9kZS5wYXVzZUFsbEFjdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvKirnu6fnu63otbAgKi9cbiAgICByZXN1bWVXYWxrKCkge1xuICAgICAgICB0aGlzLmlzRnJvemVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW9uc3RlclNwaW5lLm5vZGUucmVzdW1lQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLm5vZGUucmVzdW1lQWxsQWN0aW9ucygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW8gOWQr+WGsOWGu1xuICAgICAqL1xuICAgIG9wZW5Gcm96ZW4oKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6Zet5Yaw5Ya7XG4gICAgICovXG4gICAgY2xvc2VGcm96ZW4oKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5riF55CG5oCq5YW9XG4gICAgICovXG4gICAgY2xlYXJNb25zdGVyKCkge1xuICAgICAgICB1dGlsLk1vbnN0ZXJNYXAuZGVsZXRlKHRoaXMubW9uc2V0ck5hbWUpO1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgdXRpbC5kZWxlY3RMZXZlbE1vbnN0ZXIodGhpcy5pZCk7XG4gICAgICAgIGxldCBFYXJuOiBudW1iZXIgPSAxO1xuICAgICAgICBpZiAodXRpbC5kb3VibGVFYXJuLnVzZSkge1xuICAgICAgICAgICAgRWFybiA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgY29pbjogbnVtYmVyID0gdXRpbC5HZXRCZWhhdmlvclJld2FyZFZvKDIpO1xuICAgICAgICBsZXQgY29sb3I6IGNjLkNvbG9yID0gdXRpbC5HZXRNb25zdGVyQ29sb3IodGhpcy5jb2xvckxldmVsKTtcbiAgICAgICAgY2MuZ2FtZS5vZmYoTmFtZVRzLkdhbWVfTW9uc3Rlcl9CcnVpc2UgKyB0aGlzLm1vbnNldHJOYW1lKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfS2lsbGVkLCB7IGlkOiB0aGlzLmlkLCBub2RlOiB0aGlzLm5vZGUsIGNvaW46IGNvaW4gKiBFYXJuIH0pO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9TaGFkb3dfTGluc3RlciArIHRoaXMubW9uc2V0ck5hbWUpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9IcF9MaW5zdGVyICsgdGhpcy5tb25zZXRyTmFtZSwgMCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Nb25zdGVyX0Jsb29kX0NyZWF0ZXIsIHsgcG9zLCBjb2xvciB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmma7pgJrmuIXpmaRcbiAgICAgKi9cbiAgICBjbGVhck1vbnN0ZXIyKCkge1xuICAgICAgICB1dGlsLk1vbnN0ZXJNYXAuZGVsZXRlKHRoaXMubW9uc2V0ck5hbWUpO1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgdXRpbC5kZWxlY3RMZXZlbE1vbnN0ZXIodGhpcy5pZCk7XG4gICAgICAgIGNjLmdhbWUub2ZmKE5hbWVUcy5HYW1lX01vbnN0ZXJfQnJ1aXNlICsgdGhpcy5tb25zZXRyTmFtZSk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Nb25zdGVyX0tpbGxlZCwgeyBpZDogdGhpcy5pZCwgbm9kZTogdGhpcy5ub2RlLCBjb2luOiAwIH0pO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9TaGFkb3dfTGluc3RlciArIHRoaXMubW9uc2V0ck5hbWUpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9IcF9MaW5zdGVyICsgdGhpcy5tb25zZXRyTmFtZSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mHXG4gICAgICovXG4gICAgbG9hZFNwaW5lKCkge1xuXG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKFwiL3RleHR1cmUvbW9uc3Rlci9tb25zdGVyXCIrTnVtYmVyKGxldmVsKSxjYy5TcHJpdGVGcmFtZSwoZXJyLHJlczpjYy5TcHJpdGVGcmFtZSk9PntcblxuICAgICAgICAvLyAgICAgaWYoZXJyKXtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKFwi5om+5LiN5Yiw6K+l5Zu+54mHXCIsZXJyKTtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm47XG4gICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIGxldCBtb25zdGVyRGF0YSA9IHV0aWwuR2V0TW9uc3RlckRhdGEobGV2ZWwpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtb25zdGVyRGF0YSwnbW9uc3RlckRhdGEnKVxuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5hcm1hdHVyZU5hbWUgPSB0aGlzLm1vbnN0ZXJEYXRhLmFybWF0dXJlO1xuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5hbmltYXRpb25OYW1lID0gdGhpcy5tb25zdGVyRGF0YS5hbmltYXRpb247XG4gICAgICAgIHRoaXMubW9uc3RlclNwaW5lLnBsYXlUaW1lcyA9IDA7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOatu+S6oeWKqOeUu1xuICAgICAqIEBwYXJhbSBjYWxsIOWbnuiwg1xuICAgICAqL1xuICAgIGRpZUFuaShjYWxsOiBGdW5jdGlvbikgeyB9XG59XG4iXX0=