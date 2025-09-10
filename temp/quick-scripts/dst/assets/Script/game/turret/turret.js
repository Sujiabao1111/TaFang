
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/turret/turret.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c0ffeqNExI0ojMkd9+xPu1', 'turret');
// Script/game/turret/turret.ts

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
var faceTs_1 = require("../../common/faceTs");
var NameTs_1 = require("../../common/NameTs");
var pageTs_1 = require("../../common/pageTs");
var TrackMgr_1 = require("../../TrackMgr/TrackMgr");
var util_1 = require("../../util/util");
var turretFactory_1 = require("../turretFactory");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turret = /** @class */ (function (_super) {
    __extends(turret, _super);
    function turret() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paoBody = null;
        _this.paoFoot = null;
        // @property({type:cc.Sprite,displayName:"炮身"})
        // paoBody: cc.Sprite = null;
        // @property({type:cc.Sprite,displayName:"泡脚"})
        // paoFoot: cc.Sprite = null;
        _this.pao = null;
        _this.isAngle = false; //是否在旋转中
        return _this;
    }
    turret.prototype.start = function () {
    };
    /**
     * 攻击
     * @param id 子弹
     */
    turret.prototype.attackFn = function () {
        // this.pao.stopAllActions();
        // this.pao.scale = 0.4;
        var _this = this;
        //没有目标 停止动画
        // if(this.bullet.targetId==null||util.levelState==gameState.stop||util.levelState==gameState.end){
        //     this.stopAttack();
        //     return;
        // }
        // cc.tween(this.pao).call(()=>{
        //     cc.game.emit(NameTs.Game_Turret_Bullet_Creator,this.bullet);
        // }).delay(1/atkTime).call(()=>{
        //     this.attackFn();
        // }).start();
        var atkTime = this.turretData.speed; //攻击速度
        if (!atkTime) {
            atkTime = 2;
        }
        var nodeParent = this.node.getParent();
        this.unscheduleAllCallbacks();
        this.schedule(function () {
            if (util_1.default.levelState == faceTs_1.gameState.stop || util_1.default.levelState == faceTs_1.gameState.end)
                return;
            if (_this.bullet.targetId == null) {
                _this.attackData = null;
                return;
            }
            _this.isAngle = false;
            _this.setPao(function () {
                var bulletPos = cc.Vec2.clone(_this.paoFoot.node.getPosition());
                if (Number(_this.turretData.bulletY) > 0) {
                    bulletPos.y += Number(_this.turretData.bulletY);
                }
                bulletPos = _this.paoBody.node.convertToWorldSpaceAR(bulletPos);
                bulletPos = nodeParent.convertToNodeSpaceAR(bulletPos);
                _this.bullet.initPos = _this.node.getPosition();
                // this.paoBody.clearTracks();
                if (_this.initData.level !== 37) {
                    _this.paoBody.setAnimation(0, "animation", false);
                }
                if (_this.turretData.mouth) {
                    // this.paoFoot.clearTracks();
                    _this.paoFoot.setAnimation(0, "animation", false);
                }
                cc.game.emit(NameTs_1.default.Game_Turret_Bullet_Creator, { data: _this.bullet, pos: bulletPos });
            });
        }, 1 / atkTime);
    };
    turret.prototype.init = function (data) {
        this.initData = data;
        this.initData.level = Number(this.initData.level);
        if (data.no) {
            var pos = cc.Vec2.clone(util_1.default.GetPlaceData(data.no).pos);
            this.node.setPosition(pos);
        }
        this.setName();
        util_1.default.GlobalMap.set("turret_" + data.no, this.node);
        this.attackData = null;
    };
    /**
     * 设置属性
     */
    turret.prototype.setName = function () {
        var _this = this;
        this.node.zIndex = 0;
        // this.label.string = this.initData.level;
        this.pao.angle = 0;
        //炮塔属性
        this.turretData = util_1.default.GetTurretData(this.initData.level);
        this.paoFoot.node.active = this.turretData.mouth ? true : false;
        this.paoFoot.node.y = Number(this.turretData.mouthY);
        this.bullet = {
            type: this.turretData.bulletType || 1,
            targetId: null,
            initPos: cc.Vec2.clone(this.node.position),
            atk: Math.floor(this.turretData.atk),
            speed: 1000,
            crit: this.turretData.crit || 15 //默认15几率
        };
        this.loadSpine(this.paoBody, "pao");
        this.loadSpine(this.paoFoot, "mouth");
        // cc.game.emit(NameTs.Game_Turret_Killed,{no:this.initData.no});
        //销毁等级牌和文字
        setTimeout(function () {
            _this.createLevelBg(_this.initData.no, _this.initData.level);
        }, 100);
    };
    /**
     * 升级
     * @param no 哪个位置
     */
    turret.prototype.upLevel = function (no) {
        this.initData.level += 1;
        if (no) {
            this.initData.no = no;
        }
        if (util_1.default.upLevel(this.initData.level) && this.initData.no) {
            console.log("拖拽合成成功111111111111111111");
            cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameUpgrade);
            if (util_1.default.userData.noviceGuide == 2) {
                if (util_1.default.checkTestB(NameTs_1.default.new_hand_test)) {
                    TrackMgr_1.default.rookie_process_2({
                        activity_state: "拖拽合成成功"
                    });
                }
                else {
                    TrackMgr_1.default.rookie_process({
                        activity_state: "拖拽合成效果页",
                        click_event: "点击"
                    });
                    cc.game.emit(NameTs_1.default.Game_Novice_Close);
                }
            }
            // cc.game.emit(NameTs.Game_Treasure_create);
        }
        else if (util_1.default.userData.turretLevel >= 7 && this.initData.no) {
            // if (util.upTurretRandomRedTime) {
            //     let curTimer = new Date().getTime();
            //     let padTime = curTimer - util.upTurretRandomRedTime;
            //     if (padTime >= 60000) {
            //         util.upTurretRandomRedTime = curTimer;
            //         console.log("1111111111111111");
            //         cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTurretRandomRed);
            //     }
            //     else if (padTime >= 30000) {
            //         let randomNum = Math.random();
            //         if (randomNum <= 0.2) {
            //             util.upTurretRandomRedTime = curTimer;
            //             console.log("12222222222222222222222");
            //             cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTurretRandomRed);
            //         }
            //     }
            // }
            // else {
            //     util.upTurretRandomRedTime = new Date().getTime();
            //     console.log("333333333333333333333333");
            //     cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTurretRandomRed);
            // }
        }
        if (this.initData.no) {
            util_1.default.savePool(no, this.initData.level);
            util_1.default.buyCount = 0;
        }
        else if (this.initData.no === undefined) {
            cc.game.emit(NameTs_1.default.Game_Turret_Killed, { no: undefined });
        }
        this.setName();
        this.attackData = this.bullet.targetId = null;
    };
    /**
     * 设置炮塔角度
     * @param call 回调
     */
    turret.prototype.setPao = function (call) {
        var _this = this;
        if (this.turretData.rotation == 1) {
            if (this.isAngle)
                return;
            var lastAngle = this.pao.angle;
            var nowAngle = this.GetAngle();
            this.isAngle = true;
            var angleNum = Math.abs(lastAngle - nowAngle);
            if ((nowAngle > -260 && nowAngle <= -270)) {
                nowAngle += 360;
                this.pao.angle = nowAngle;
                angleNum = 10;
            }
            else if (nowAngle > 0 && nowAngle <= 90) {
                nowAngle -= 360;
                angleNum = 10;
            }
            if (angleNum > 5 && angleNum < 360) {
                cc.tween(this.pao).to(angleNum / 1000, { angle: nowAngle }).call(function () {
                    _this.isAngle = false;
                    call && call();
                }).start();
            }
            else {
                this.pao.angle = nowAngle;
                this.isAngle = false;
                call && call();
            }
        }
        else {
            call && call();
        }
    };
    /**停止攻击 */
    turret.prototype.stopAttack = function () {
        // this.paoBody.stop();
        // this.paoFoot.setAnimation(1,"",false);
        this.pao.stopAllActions();
        // this.pao.scale = 0.4;
    };
    /**继续攻击 */
    turret.prototype.resumeAttack = function () {
        this.attackFn();
    };
    __decorate([
        property({ type: sp.Skeleton, displayName: "炮" })
    ], turret.prototype, "paoBody", void 0);
    __decorate([
        property({ type: sp.Skeleton, displayName: "口" })
    ], turret.prototype, "paoFoot", void 0);
    __decorate([
        property(cc.Node)
    ], turret.prototype, "pao", void 0);
    turret = __decorate([
        ccclass
    ], turret);
    return turret;
}(turretFactory_1.default));
exports.default = turret;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRcXHR1cnJldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNEQ7QUFDNUQsOENBQXlDO0FBQ3pDLDhDQUF5QztBQUN6QyxvREFBK0M7QUFDL0Msd0NBQW1DO0FBQ25DLGtEQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQywwQkFBYztJQUFsRDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBaVFDO1FBM1BHLGFBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBRzVCLGFBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBRTVCLCtDQUErQztRQUMvQyw2QkFBNkI7UUFFN0IsK0NBQStDO1FBQy9DLDZCQUE2QjtRQUc3QixTQUFHLEdBQVksSUFBSSxDQUFDO1FBSVosYUFBTyxHQUFZLEtBQUssQ0FBQyxDQUFBLFFBQVE7O0lBMk83QyxDQUFDO0lBek9HLHNCQUFLLEdBQUw7SUFFQSxDQUFDO0lBSUQ7OztPQUdHO0lBQ0gseUJBQVEsR0FBUjtRQUNJLDZCQUE2QjtRQUM3Qix3QkFBd0I7UUFGNUIsaUJBMERDO1FBdERHLFdBQVc7UUFFWCxtR0FBbUc7UUFDbkcseUJBQXlCO1FBQ3pCLGNBQWM7UUFDZCxJQUFJO1FBR0osZ0NBQWdDO1FBQ2hDLG1FQUFtRTtRQUNuRSxpQ0FBaUM7UUFDakMsdUJBQXVCO1FBQ3ZCLGNBQWM7UUFFZCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU07UUFDbkQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FDZjtRQUVELElBQUksVUFBVSxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFD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QUFJLEVBQUUsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRCxVQUFVO0lBQ1YsMkJBQVUsR0FBVjtRQUVJLHVCQUF1QjtRQUN2Qix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQix3QkFBd0I7SUFDNUIsQ0FBQztJQUVELFVBQVU7SUFDViw2QkFBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUF6UEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUM7MkNBQ3RCO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDOzJDQUN0QjtJQVM1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VDQUNFO0lBbEJILE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FpUTFCO0lBQUQsYUFBQztDQWpRRCxBQWlRQyxDQWpRbUMsdUJBQWMsR0FpUWpEO2tCQWpRb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1bGxldEluZm8sIGdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi8uLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uLy4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5pbXBvcnQgdHVycmV0RmFjdGlvcnkgZnJvbSBcIi4uL3R1cnJldEZhY3RvcnlcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHR1cnJldCBleHRlbmRzIHR1cnJldEZhY3Rpb3J5IHtcblxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICAvLyBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogc3AuU2tlbGV0b24sIGRpc3BsYXlOYW1lOiBcIueCrlwiIH0pXG4gICAgcGFvQm9keTogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogc3AuU2tlbGV0b24sIGRpc3BsYXlOYW1lOiBcIuWPo1wiIH0pXG4gICAgcGFvRm9vdDogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSxkaXNwbGF5TmFtZTpcIueCrui6q1wifSlcbiAgICAvLyBwYW9Cb2R5OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSxkaXNwbGF5TmFtZTpcIuazoeiEmlwifSlcbiAgICAvLyBwYW9Gb290OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcGFvOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIGluaXREYXRhOy8v5Yid5aeL5YyW5pWw5o2uXG5cbiAgICBwcml2YXRlIGlzQW5nbGU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWcqOaXi+i9rOS4rVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICog5pS75Ye7XG4gICAgICogQHBhcmFtIGlkIOWtkOW8uVxuICAgICAqL1xuICAgIGF0dGFja0ZuKCkge1xuICAgICAgICAvLyB0aGlzLnBhby5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAvLyB0aGlzLnBhby5zY2FsZSA9IDAuNDtcblxuICAgICAgICAvL+ayoeacieebruaghyDlgZzmraLliqjnlLtcblxuICAgICAgICAvLyBpZih0aGlzLmJ1bGxldC50YXJnZXRJZD09bnVsbHx8dXRpbC5sZXZlbFN0YXRlPT1nYW1lU3RhdGUuc3RvcHx8dXRpbC5sZXZlbFN0YXRlPT1nYW1lU3RhdGUuZW5kKXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3RvcEF0dGFjaygpO1xuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG5cblxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLnBhbykuY2FsbCgoKT0+e1xuICAgICAgICAvLyAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9CdWxsZXRfQ3JlYXRvcix0aGlzLmJ1bGxldCk7XG4gICAgICAgIC8vIH0pLmRlbGF5KDEvYXRrVGltZSkuY2FsbCgoKT0+e1xuICAgICAgICAvLyAgICAgdGhpcy5hdHRhY2tGbigpO1xuICAgICAgICAvLyB9KS5zdGFydCgpO1xuXG4gICAgICAgIGxldCBhdGtUaW1lOiBudW1iZXIgPSB0aGlzLnR1cnJldERhdGEuc3BlZWQ7IC8v5pS75Ye76YCf5bqmXG4gICAgICAgIGlmICghYXRrVGltZSkge1xuICAgICAgICAgICAgYXRrVGltZSA9IDI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZVBhcmVudDogY2MuTm9kZSA9IHRoaXMubm9kZS5nZXRQYXJlbnQoKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHV0aWwubGV2ZWxTdGF0ZSA9PSBnYW1lU3RhdGUuc3RvcCB8fCB1dGlsLmxldmVsU3RhdGUgPT0gZ2FtZVN0YXRlLmVuZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVsbGV0LnRhcmdldElkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0RhdGEgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXNBbmdsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZXRQYW8oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBidWxsZXRQb3M6IGNjLlZlYzIgPSBjYy5WZWMyLmNsb25lKHRoaXMucGFvRm9vdC5ub2RlLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcih0aGlzLnR1cnJldERhdGEuYnVsbGV0WSkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldFBvcy55ICs9IE51bWJlcih0aGlzLnR1cnJldERhdGEuYnVsbGV0WSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBidWxsZXRQb3MgPSB0aGlzLnBhb0JvZHkubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYnVsbGV0UG9zKTtcbiAgICAgICAgICAgICAgICBidWxsZXRQb3MgPSBub2RlUGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGJ1bGxldFBvcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXQuaW5pdFBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucGFvQm9keS5jbGVhclRyYWNrcygpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluaXREYXRhLmxldmVsICE9PSAzNykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhb0JvZHkuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHVycmV0RGF0YS5tb3V0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnBhb0Zvb3QuY2xlYXJUcmFja3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW9Gb290LnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfQnVsbGV0X0NyZWF0b3IsIHsgZGF0YTogdGhpcy5idWxsZXQsIHBvczogYnVsbGV0UG9zIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSwgMSAvIGF0a1RpbWUpO1xuXG5cblxuICAgIH1cblxuICAgIGluaXQoZGF0YSkge1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmluaXREYXRhLmxldmVsID0gTnVtYmVyKHRoaXMuaW5pdERhdGEubGV2ZWwpO1xuICAgICAgICBpZiAoZGF0YS5ubykge1xuICAgICAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IGNjLlZlYzIuY2xvbmUodXRpbC5HZXRQbGFjZURhdGEoZGF0YS5ubykucG9zKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0TmFtZSgpO1xuICAgICAgICB1dGlsLkdsb2JhbE1hcC5zZXQoXCJ0dXJyZXRfXCIgKyBkYXRhLm5vLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLmF0dGFja0RhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9ruWxnuaAp1xuICAgICAqL1xuICAgIHNldE5hbWUoKSB7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAwO1xuICAgICAgICAvLyB0aGlzLmxhYmVsLnN0cmluZyA9IHRoaXMuaW5pdERhdGEubGV2ZWw7XG4gICAgICAgIHRoaXMucGFvLmFuZ2xlID0gMDtcbiAgICAgICAgLy/ngq7loZTlsZ7mgKdcbiAgICAgICAgdGhpcy50dXJyZXREYXRhID0gdXRpbC5HZXRUdXJyZXREYXRhKHRoaXMuaW5pdERhdGEubGV2ZWwpO1xuICAgICAgICB0aGlzLnBhb0Zvb3Qubm9kZS5hY3RpdmUgPSB0aGlzLnR1cnJldERhdGEubW91dGggPyB0cnVlIDogZmFsc2U7XG5cblxuICAgICAgICB0aGlzLnBhb0Zvb3Qubm9kZS55ID0gTnVtYmVyKHRoaXMudHVycmV0RGF0YS5tb3V0aFkpO1xuICAgICAgICB0aGlzLmJ1bGxldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHVycmV0RGF0YS5idWxsZXRUeXBlIHx8IDEsXG4gICAgICAgICAgICB0YXJnZXRJZDogbnVsbCxcbiAgICAgICAgICAgIGluaXRQb3M6IGNjLlZlYzIuY2xvbmUodGhpcy5ub2RlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIGF0azogTWF0aC5mbG9vcih0aGlzLnR1cnJldERhdGEuYXRrKSxcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgY3JpdDogdGhpcy50dXJyZXREYXRhLmNyaXQgfHwgMTUgLy/pu5jorqQxNeWHoOeOh1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2FkU3BpbmUodGhpcy5wYW9Cb2R5LCBcInBhb1wiKTtcblxuICAgICAgICB0aGlzLmxvYWRTcGluZSh0aGlzLnBhb0Zvb3QsIFwibW91dGhcIik7XG5cbiAgICAgICAgLy8gY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQse25vOnRoaXMuaW5pdERhdGEubm99KTtcbiAgICAgICAgLy/plIDmr4HnrYnnuqfniYzlkozmloflrZdcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUxldmVsQmcodGhpcy5pbml0RGF0YS5ubywgdGhpcy5pbml0RGF0YS5sZXZlbCk7XG4gICAgICAgIH0sIDEwMCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDljYfnuqdcbiAgICAgKiBAcGFyYW0gbm8g5ZOq5Liq5L2N572uXG4gICAgICovXG4gICAgdXBMZXZlbChubz86IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXREYXRhLmxldmVsICs9IDE7XG4gICAgICAgIGlmIChubykge1xuICAgICAgICAgICAgdGhpcy5pbml0RGF0YS5ubyA9IG5vO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlsLnVwTGV2ZWwodGhpcy5pbml0RGF0YS5sZXZlbCkgJiYgdGhpcy5pbml0RGF0YS5ubykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmi5bmi73lkIjmiJDmiJDlip8xMTExMTExMTExMTExMTExMTFcIik7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lVXBncmFkZSk7XG4gICAgICAgICAgICBpZiAodXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9PSAyKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5uZXdfaGFuZF90ZXN0KSkge1xuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5yb29raWVfcHJvY2Vzc18yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuaLluaLveWQiOaIkOaIkOWKn1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLnJvb2tpZV9wcm9jZXNzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuaLluaLveWQiOaIkOaViOaenOmhtVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tfZXZlbnQ6IFwi54K55Ye7XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Ob3ZpY2VfQ2xvc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHJlYXN1cmVfY3JlYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1dGlsLnVzZXJEYXRhLnR1cnJldExldmVsID49IDcgJiYgdGhpcy5pbml0RGF0YS5ubykge1xuICAgICAgICAgICAgLy8gaWYgKHV0aWwudXBUdXJyZXRSYW5kb21SZWRUaW1lKSB7XG4gICAgICAgICAgICAvLyAgICAgbGV0IGN1clRpbWVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAvLyAgICAgbGV0IHBhZFRpbWUgPSBjdXJUaW1lciAtIHV0aWwudXBUdXJyZXRSYW5kb21SZWRUaW1lO1xuICAgICAgICAgICAgLy8gICAgIGlmIChwYWRUaW1lID49IDYwMDAwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHV0aWwudXBUdXJyZXRSYW5kb21SZWRUaW1lID0gY3VyVGltZXI7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiMTExMTExMTExMTExMTExMVwiKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1BvcF9PcGVuLCBwYWdlVHMucGFnZU5hbWUuR2FtZVR1cnJldFJhbmRvbVJlZCk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gICAgIGVsc2UgaWYgKHBhZFRpbWUgPj0gMzAwMDApIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHJhbmRvbU51bSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChyYW5kb21OdW0gPD0gMC4yKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB1dGlsLnVwVHVycmV0UmFuZG9tUmVkVGltZSA9IGN1clRpbWVyO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCIxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMlwiKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVUdXJyZXRSYW5kb21SZWQpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgdXRpbC51cFR1cnJldFJhbmRvbVJlZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIjMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM1wiKTtcbiAgICAgICAgICAgIC8vICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHVycmV0UmFuZG9tUmVkKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdERhdGEubm8pIHtcbiAgICAgICAgICAgIHV0aWwuc2F2ZVBvb2wobm8sIHRoaXMuaW5pdERhdGEubGV2ZWwpO1xuICAgICAgICAgICAgdXRpbC5idXlDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbml0RGF0YS5ubyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0tpbGxlZCwgeyBubzogdW5kZWZpbmVkIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0TmFtZSgpO1xuICAgICAgICB0aGlzLmF0dGFja0RhdGEgPSB0aGlzLmJ1bGxldC50YXJnZXRJZCA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u54Ku5aGU6KeS5bqmXG4gICAgICogQHBhcmFtIGNhbGwg5Zue6LCDIFxuICAgICAqL1xuICAgIHNldFBhbyhjYWxsPzogRnVuY3Rpb24pIHtcblxuICAgICAgICBpZiAodGhpcy50dXJyZXREYXRhLnJvdGF0aW9uID09IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQW5nbGUpIHJldHVybjtcbiAgICAgICAgICAgIGxldCBsYXN0QW5nbGU6IG51bWJlciA9IHRoaXMucGFvLmFuZ2xlO1xuICAgICAgICAgICAgbGV0IG5vd0FuZ2xlOiBudW1iZXIgPSB0aGlzLkdldEFuZ2xlKCk7XG4gICAgICAgICAgICB0aGlzLmlzQW5nbGUgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGFuZ2xlTnVtOiBudW1iZXIgPSBNYXRoLmFicyhsYXN0QW5nbGUgLSBub3dBbmdsZSk7XG4gICAgICAgICAgICBpZiAoKG5vd0FuZ2xlID4gLTI2MCAmJiBub3dBbmdsZSA8PSAtMjcwKSkge1xuICAgICAgICAgICAgICAgIG5vd0FuZ2xlICs9IDM2MDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhby5hbmdsZSA9IG5vd0FuZ2xlO1xuICAgICAgICAgICAgICAgIGFuZ2xlTnVtID0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub3dBbmdsZSA+IDAgJiYgbm93QW5nbGUgPD0gOTApIHtcbiAgICAgICAgICAgICAgICBub3dBbmdsZSAtPSAzNjA7XG4gICAgICAgICAgICAgICAgYW5nbGVOdW0gPSAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbmdsZU51bSA+IDUgJiYgYW5nbGVOdW0gPCAzNjApIHtcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnBhbykudG8oYW5nbGVOdW0gLyAxMDAwLCB7IGFuZ2xlOiBub3dBbmdsZSB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FuZ2xlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNhbGwgJiYgY2FsbCgpO1xuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGFvLmFuZ2xlID0gbm93QW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0FuZ2xlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY2FsbCAmJiBjYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsICYmIGNhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuWBnOatouaUu+WHuyAqL1xuICAgIHN0b3BBdHRhY2soKSB7XG5cbiAgICAgICAgLy8gdGhpcy5wYW9Cb2R5LnN0b3AoKTtcbiAgICAgICAgLy8gdGhpcy5wYW9Gb290LnNldEFuaW1hdGlvbigxLFwiXCIsZmFsc2UpO1xuICAgICAgICB0aGlzLnBhby5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAvLyB0aGlzLnBhby5zY2FsZSA9IDAuNDtcbiAgICB9XG5cbiAgICAvKirnu6fnu63mlLvlh7sgKi9cbiAgICByZXN1bWVBdHRhY2soKSB7XG4gICAgICAgIHRoaXMuYXR0YWNrRm4oKTtcbiAgICB9XG5cbn1cbiJdfQ==