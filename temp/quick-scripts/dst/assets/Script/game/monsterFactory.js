
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxtb25zdGVyRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBb0c7QUFDcEcsMkNBQXNDO0FBQ3RDLHNEQUFpRDtBQUVqRCxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUEyUEM7UUF2T0csYUFBYTtRQUNiLGNBQVEsR0FBVyxLQUFLLENBQUM7UUFFekIsYUFBYTtRQUNiLGNBQVEsR0FBVyxLQUFLLENBQUM7O0lBbU83QixDQUFDO0lBck5HLCtCQUFNLEdBQU47UUFBQSxpQkFrQ0M7UUFoQ0csRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxRQUFRLEVBQUM7WUFFdkIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXBCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUlSLFFBQVE7UUFDUixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLFNBQVMsRUFBQztZQUV4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFcEIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRVIsUUFBUTtRQUNSLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsV0FBVyxFQUFDO1lBRTFCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV0QixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFUixNQUFNO1FBQ04sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUMsVUFBQyxHQUFHO1lBQ2pELElBQUcsS0FBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUM7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LElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0NBQVMsR0FBVDtRQUVJLHdHQUF3RztRQUV4RyxlQUFlO1FBQ2YsdUNBQXVDO1FBQ3ZDLGtCQUFrQjtRQUNsQixRQUFRO1FBRVIsTUFBTTtRQUNOLGdEQUFnRDtRQUNoRCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBR3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSCwrQkFBTSxHQUFOLFVBQU8sSUFBYSxJQUFFLENBQUM7SUExUE4sY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQTJQbEM7SUFBRCxxQkFBQztDQTNQRCxBQTJQQyxDQTNQMkMsRUFBRSxDQUFDLFNBQVMsR0EyUHZEO2tCQTNQb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVQYXNzLCBnYW1lU3RhdGUsIG1vbnN0ZXJJbmZvLCBwcm9wU3RhdGUsIHByb3BUeXBlLCB0aGluZ1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vdXRpbC90b29sXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbW9uc3RlckZhY3RvcnkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gXG4gICAgLyoq5Yid5aeL5pWw5o2uICovXG4gICAgaW5pdERhdGE6bW9uc3RlckluZm87XG5cbiAgICAvKirlh7rnlJ/lnKjlk6rph4wgKi9cbiAgICBpbml0UG9zOmNjLlZlYzI7XG5cbiAgICAvKirlvZPliY3ooYzotbDnrKzlh6DkuKrmlbDnu4Qo6buY6K6k5Li6MCkqL1xuICAgIHdhbGtObzpudW1iZXI7XG4gICAgLyoq5b2T5YmN6KGM6LWw6L2o6L+5Ki9cbiAgICB3YWxrQXJyOmFueVtdO1xuICAgIFxuICAgIC8qKuaAqueJqeeahGlkICovXG4gICAgaWQ6bnVtYmVyO1xuICAgIFxuICAgIC8qKuaAquWFveihgOmHjyAqL1xuICAgIG1vbnN0ZXJIcDpudW1iZXI7XG5cbiAgICAvKirmmK/lkKbov5vooYzkuK3lhrDlhrsgKi9cbiAgICBpc0Zyb3plbjpib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgLyoq5piv5ZCm6L+b6KGM5Lit5L+d5oqkICovXG4gICAgaXNTaGllbGQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoq5oCq5YW95Zu+54mHICovXG4gICAgbW9uc3RlclNwaW5lOmRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheTtcblxuICAgIC8qKm1hcE5hbWUgKi9cbiAgICBtb25zZXRyTmFtZTpzdHJpbmcgO1xuXG4gICAgLyoq6aKc6Imy562J57qnICovXG4gICAgY29sb3JMZXZlbDpudW1iZXI7XG5cbiAgICAvKirmgKrlhb3mlbDmja4gKi9cbiAgICBtb25zdGVyRGF0YTphbnk7XG5cbiAgICBvbkxvYWQoKXtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0VuZCwoKT0+e1xuXG4gICAgICAgICAgICB0aGlzLnN0b3BXYWxrKCk7XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICBcblxuICAgICAgICAvL+ebkeWQrOa4uOaIj+aaguWBnFxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1N0b3AsKCk9PntcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgLy/nm5HlkKzmuLjmiI/nu6fnu61cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9SZXN1bWUsKCk9PntcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5yZXN1bWVXYWxrKCk7XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICAvL+a4heWxj+mBk+WFt1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9DbHMsKHJlcyk9PntcbiAgICAgICAgICAgIGlmKHRoaXMud2Fsa05vPjApe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJNb25zdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sdGhpcyk7XG4gICAgICAgIC8v5pmu6YCa5raI6Zmk77yM5LiN5Lya5pyJ6YeR5biBXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTW9uc3Rlcl9jbGVhckFsbCwocmVzKT0+e1xuICAgICAgICAgICAgdGhpcy5jbGVhck1vbnN0ZXIyKCk7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgfVxuXG5cbiAgICAvKirooYzotbAgKi9cbiAgICB3YWxrKCl7XG4gICAgICAgIGlmKHRoaXMud2Fsa05vPj10aGlzLndhbGtBcnIubGVuZ3RoLTEpe1xuICAgICAgICAgICAgaWYodGhpcy5pc1NoaWVsZClyZXR1cm47XG4gICAgICAgICAgICB0aGlzLkdhbWVFbmQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6LWw5Yiw5oC75bqX5LqGXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndhbGtObysrO1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdGhpcy53YWxrTm87XG4gICAgICAgIC8v6K6+572u5b2T5YmNXG4gICAgICAgIHV0aWwuc2V0TGV2ZWxNb25zdGVyRGF0YSh0aGlzLmlkLHRoaXMud2Fsa0Fyci5sZW5ndGgtMS10aGlzLndhbGtObyk7XG4gICAgICAgIGxldCBuZXh0UG9zOmNjLlZlYzIgPSB1dGlsLkdldE1hcFBvcyh0aGlzLndhbGtBcnJbdGhpcy53YWxrTm9dLnksdGhpcy53YWxrQXJyW3RoaXMud2Fsa05vXS54KTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50byhOdW1iZXIodGhpcy5pbml0RGF0YS5zcGVlZCkvNzcse3g6bmV4dFBvcy54LHk6bmV4dFBvcy55fSkuY2FsbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy53YWxrKCk7XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog57uT5p2f5ri45oiPXG4gICAgICovXG4gICAgR2FtZUVuZCgpe1xuXG4gICAgICAgIHV0aWwuc2VuZFR1cnJldERhdGEoKTtcbiAgICAgICAgdXRpbC5sZXZlbFN0YXRlID0gZ2FtZVN0YXRlLmVuZDtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VuZCxnYW1lUGFzcy5mYWlsKTtcblxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiDmgKrlhb3lj5fkvKRcbiAgICAgKiBAcGFyYW0gYXRrIOaJo+WkmuWwkeihgFxuICAgICAqIEBwYXJhbSBjaXRyIOaatOWHu1xuICAgICAqL1xuXG4gICAgbW9uc3RlckJydWlzZShhdGs6bnVtYmVyLGNyaXQ6bnVtYmVyPTEpe1xuICAgICAgICAvLyBpZih0aGlzLilcbiAgICAgICAgLy/mmrTlh7tcbiAgICAgICAgYXRrICo9IGNyaXQ7XG4gICAgICAgIC8v5aKe6IO9XG4gICAgICAgIGxldCBlbmVyZ2l6ZWROdW06bnVtYmVyID0gdXRpbC51c2VyRGF0YS5wcm9wW3Byb3BUeXBlLmVuZXJnaXplZC0xXS51c2U/MTowO1xuICAgICAgICAvL+eUteWHu1xuICAgICAgICBsZXQgc2hvY2tOdW06bnVtYmVyID0gdXRpbC51c2VyRGF0YS5wcm9wW3Byb3BUeXBlLnNob2NrLTFdLnVzZT8uMjowO1xuICAgICAgICAvL+S8pOWus1xuICAgICAgICBsZXQgaHVydE51bTpudW1iZXIgID0gTWF0aC5mbG9vcihOdW1iZXIoYXRrKSooMStzaG9ja051bStlbmVyZ2l6ZWROdW0pKTtcbiAgICAgICAgLy/miaPooYBcbiAgICAgICAgdGhpcy5tb25zdGVySHAgLT0gaHVydE51bTtcblxuXG4gICAgICAgIC8v5Lyk5a6z5YC8XG4gICAgICAgIGlmKGNyaXQ9PTEpe1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0h1cnRfQ3JlYXRvcix7dmFsdWU6aHVydE51bSxwb3M6dGhpcy5ub2RlLmdldFBvc2l0aW9uKCl9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfSHVydF9Dcml0X0NyZWF0b3Ise3ZhbHVlOmh1cnROdW0qY3JpdCxwb3M6dGhpcy5ub2RlLmdldFBvc2l0aW9uKCl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SHAodGhpcy5tb25zdGVySHAvdGhpcy5pbml0RGF0YS5ocCk7XG5cbiAgICAgICAgaWYodGhpcy5tb25zdGVySHA8PTApe1xuICAgICAgICAgICAgdGhpcy5jbGVhck1vbnN0ZXIoKTtcbiAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24ucGxheURlYWRBdWRpbygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq6K6+572u6KGA6YePICovXG4gICAgc2V0SHAobnVtKXtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfSHBfTGluc3Rlcit0aGlzLm1vbnNldHJOYW1lLG51bSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KXtcblxuICAgICAgICBpZih1dGlsLmxldmVsU3RhdGUhPT1nYW1lU3RhdGUuc3RhcnQpcmV0dXJuO1xuICAgICAgICBpZih1dGlsLnVzZXJEYXRhLnByb3BbcHJvcFR5cGUuZnJvemVuLTFdLnVzZT09cHJvcFN0YXRlLnN0YXJ0JiZ0aGlzLndhbGtObz4wJiYhdGhpcy5pc0Zyb3plbil7XG4gICAgICAgICAgICB0aGlzLmlzRnJvemVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub3BlbkZyb3plbigpO1xuICAgICAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuICAgICAgICB9ZWxzZSBpZih1dGlsLnVzZXJEYXRhLnByb3BbcHJvcFR5cGUuZnJvemVuLTFdLnVzZSA9PSBwcm9wU3RhdGUuZW5kJiZ0aGlzLmlzRnJvemVuKXtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VGcm96ZW4oKTtcbiAgICAgICAgICAgIHRoaXMucmVzdW1lV2FsaygpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHV0aWwudXNlckRhdGEucHJvcFtwcm9wVHlwZS5zaGllbGQtMV0udXNlPT1wcm9wU3RhdGUuc3RhcnQmJiF0aGlzLmlzU2hpZWxkKXtcbiAgICAgICAgICAgIHRoaXMuaXNTaGllbGQgPSB0cnVlO1xuICAgICAgICB9ZWxzZSBpZih1dGlsLnVzZXJEYXRhLnByb3BbcHJvcFR5cGUuc2hpZWxkLTFdLnVzZT09cHJvcFN0YXRlLmVuZCYmdGhpcy5pc1NoaWVsZCl7XG4gICAgICAgICAgICB0aGlzLmlzU2hpZWxkID0gZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoq5pqC5YGc6LWwICovXG4gICAgc3RvcFdhbGsoKXtcbiAgICAgICAgdGhpcy5ub2RlLnBhdXNlQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5ub2RlLnBhdXNlQWxsQWN0aW9ucygpO1xuICAgIH1cblxuICAgIC8qKue7p+e7rei1sCAqL1xuICAgIHJlc3VtZVdhbGsoKXtcbiAgICAgICAgdGhpcy5pc0Zyb3plbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5ub2RlLnJlc3VtZUFsbEFjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5ub2RlLnJlc3VtZUFsbEFjdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlvIDlkK/lhrDlhrtcbiAgICAgKi9cbiAgICBvcGVuRnJvemVuKCl7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6Zet5Yaw5Ya7XG4gICAgICovXG4gICAgY2xvc2VGcm96ZW4oKXtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuIXnkIbmgKrlhb1cbiAgICAgKi9cbiAgICBjbGVhck1vbnN0ZXIoKXtcbiAgICAgICAgdXRpbC5Nb25zdGVyTWFwLmRlbGV0ZSh0aGlzLm1vbnNldHJOYW1lKTtcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHV0aWwuZGVsZWN0TGV2ZWxNb25zdGVyKHRoaXMuaWQpO1xuICAgICAgICBsZXQgRWFybjpudW1iZXIgPSAxO1xuICAgICAgICBpZih1dGlsLmRvdWJsZUVhcm4udXNlKXtcbiAgICAgICAgICAgIEVhcm4gPSAyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwb3M6Y2MuVmVjMiA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgY29pbjpudW1iZXIgPSB1dGlsLkdldEJlaGF2aW9yUmV3YXJkVm8oMik7XG4gICAgICAgIGxldCBjb2xvcjpjYy5Db2xvciA9IHV0aWwuR2V0TW9uc3RlckNvbG9yKHRoaXMuY29sb3JMZXZlbCk7XG4gICAgICAgIGNjLmdhbWUub2ZmKE5hbWVUcy5HYW1lX01vbnN0ZXJfQnJ1aXNlK3RoaXMubW9uc2V0ck5hbWUpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9LaWxsZWQse2lkOnRoaXMuaWQsbm9kZTp0aGlzLm5vZGUsY29pbjpjb2luKkVhcm59KTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfU2hhZG93X0xpbnN0ZXIrdGhpcy5tb25zZXRyTmFtZSk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Nb25zdGVyX0hwX0xpbnN0ZXIrdGhpcy5tb25zZXRyTmFtZSwwKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfQmxvb2RfQ3JlYXRlcix7cG9zLGNvbG9yfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pmu6YCa5riF6ZmkXG4gICAgICovXG4gICAgY2xlYXJNb25zdGVyMigpe1xuICAgICAgICB1dGlsLk1vbnN0ZXJNYXAuZGVsZXRlKHRoaXMubW9uc2V0ck5hbWUpO1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgdXRpbC5kZWxlY3RMZXZlbE1vbnN0ZXIodGhpcy5pZCk7XG4gICAgICAgIGNjLmdhbWUub2ZmKE5hbWVUcy5HYW1lX01vbnN0ZXJfQnJ1aXNlK3RoaXMubW9uc2V0ck5hbWUpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9LaWxsZWQse2lkOnRoaXMuaWQsbm9kZTp0aGlzLm5vZGUsY29pbjowfSk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Nb25zdGVyX1NoYWRvd19MaW5zdGVyK3RoaXMubW9uc2V0ck5hbWUpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9IcF9MaW5zdGVyK3RoaXMubW9uc2V0ck5hbWUsMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mHXG4gICAgICovXG4gICAgbG9hZFNwaW5lKCl7XG4gICAgICAgIFxuICAgICAgICAvLyBjYy5yZXNvdXJjZXMubG9hZChcIi90ZXh0dXJlL21vbnN0ZXIvbW9uc3RlclwiK051bWJlcihsZXZlbCksY2MuU3ByaXRlRnJhbWUsKGVycixyZXM6Y2MuU3ByaXRlRnJhbWUpPT57XG5cbiAgICAgICAgLy8gICAgIGlmKGVycil7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5lcnJvcihcIuaJvuS4jeWIsOivpeWbvueJh1wiLGVycik7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyAgICAgfVxuXG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyBsZXQgbW9uc3RlckRhdGEgPSB1dGlsLkdldE1vbnN0ZXJEYXRhKGxldmVsKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobW9uc3RlckRhdGEsJ21vbnN0ZXJEYXRhJylcbiAgICAgICAgdGhpcy5tb25zdGVyU3BpbmUuYXJtYXR1cmVOYW1lID0gdGhpcy5tb25zdGVyRGF0YS5hcm1hdHVyZTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3BpbmUuYW5pbWF0aW9uTmFtZSA9IHRoaXMubW9uc3RlckRhdGEuYW5pbWF0aW9uO1xuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5wbGF5VGltZXMgPSAwO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmrbvkuqHliqjnlLtcbiAgICAgKiBAcGFyYW0gY2FsbCDlm57osINcbiAgICAgKi9cbiAgICBkaWVBbmkoY2FsbDpGdW5jdGlvbil7fVxufVxuIl19