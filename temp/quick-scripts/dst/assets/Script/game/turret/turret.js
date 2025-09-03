
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
        var atkTime = this.turretData.speed;
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
                // if(this.initData.level==16||this.initData.level==38){
                //     bulletPos.y +=30;
                // }else if(this.initData.level==18||this.initData.level==29||this.initData.level==31||this.initData.level==21){
                //     bulletPos.y +=50;
                // }
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
        // if(this.turretData.level==5||this.initData.level==9||this.initData.level==11||this.initData.level==17||this.initData.level==22||this.initData.level==34){
        //     this.paoFoot.node.y = 0;
        // }else if(this.turretData.level==24||this.turretData.level==25||this.turretData.level==26||this.turretData.level==35){
        //     this.paoFoot.node.y = 80;
        // }else{
        //     this.paoFoot.node.y = 52;
        // }
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
            if (util_1.default.upTurretRandomRedTime) {
                var curTimer = new Date().getTime();
                var padTime = curTimer - util_1.default.upTurretRandomRedTime;
                if (padTime >= 60000) {
                    util_1.default.upTurretRandomRedTime = curTimer;
                    cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameTurretRandomRed);
                }
                else if (padTime >= 30000) {
                    var randomNum = Math.random();
                    if (randomNum <= 0.2) {
                        util_1.default.upTurretRandomRedTime = curTimer;
                        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameTurretRandomRed);
                    }
                }
            }
            else {
                util_1.default.upTurretRandomRedTime = new Date().getTime();
                cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameTurretRandomRed);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRcXHR1cnJldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNEQ7QUFDNUQsOENBQXlDO0FBQ3pDLDhDQUF5QztBQUN6QyxvREFBK0M7QUFFL0Msd0NBQW1DO0FBQ25DLGtEQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQywwQkFBYztJQUFsRDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBeVFDO1FBblFHLGFBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBRzVCLGFBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBRTVCLCtDQUErQztRQUMvQyw2QkFBNkI7UUFFN0IsK0NBQStDO1FBQy9DLDZCQUE2QjtRQUc3QixTQUFHLEdBQVksSUFBSSxDQUFDO1FBSVosYUFBTyxHQUFXLEtBQUssQ0FBQyxDQUFBLFFBQVE7O0lBbVA1QyxDQUFDO0lBalBHLHNCQUFLLEdBQUw7SUFFQSxDQUFDO0lBSUQ7OztPQUdHO0lBQ0gseUJBQVEsR0FBUjtRQUNJLDZCQUE2QjtRQUM3Qix3QkFBd0I7UUFGNUIsaUJBNERDO1FBeERHLFdBQVc7UUFFWCxtR0FBbUc7UUFDbkcseUJBQXlCO1FBQ3pCLGNBQWM7UUFDZCxJQUFJO1FBR0osZ0NBQWdDO1FBQ2hDLG1FQUFtRTtRQUNuRSxpQ0FBaUM7UUFDakMsdUJBQXVCO1FBQ3ZCLGNBQWM7UUFDZCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUNmO1FBRUQsSUFBSSxVQUFVLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENB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QUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDOzJDQUN0QjtJQVM1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VDQUNFO0lBbEJILE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0F5UTFCO0lBQUQsYUFBQztDQXpRRCxBQXlRQyxDQXpRbUMsdUJBQWMsR0F5UWpEO2tCQXpRb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1bGxldEluZm8sIGdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi8uLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uLy4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vLi4vdXRpbC90b29sXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5pbXBvcnQgdHVycmV0RmFjdGlvcnkgZnJvbSBcIi4uL3R1cnJldEZhY3RvcnlcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHR1cnJldCBleHRlbmRzIHR1cnJldEZhY3Rpb3J5IHtcblxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICAvLyBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogc3AuU2tlbGV0b24sIGRpc3BsYXlOYW1lOiBcIueCrlwiIH0pXG4gICAgcGFvQm9keTogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogc3AuU2tlbGV0b24sIGRpc3BsYXlOYW1lOiBcIuWPo1wiIH0pXG4gICAgcGFvRm9vdDogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSxkaXNwbGF5TmFtZTpcIueCrui6q1wifSlcbiAgICAvLyBwYW9Cb2R5OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSxkaXNwbGF5TmFtZTpcIuazoeiEmlwifSlcbiAgICAvLyBwYW9Gb290OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcGFvOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIGluaXREYXRhOy8v5Yid5aeL5YyW5pWw5o2uXG5cbiAgICBwcml2YXRlIGlzQW5nbGU6Ym9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5Zyo5peL6L2s5LitXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiDmlLvlh7tcbiAgICAgKiBAcGFyYW0gaWQg5a2Q5by5XG4gICAgICovXG4gICAgYXR0YWNrRm4oKSB7XG4gICAgICAgIC8vIHRoaXMucGFvLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIC8vIHRoaXMucGFvLnNjYWxlID0gMC40O1xuXG4gICAgICAgIC8v5rKh5pyJ55uu5qCHIOWBnOatouWKqOeUu1xuXG4gICAgICAgIC8vIGlmKHRoaXMuYnVsbGV0LnRhcmdldElkPT1udWxsfHx1dGlsLmxldmVsU3RhdGU9PWdhbWVTdGF0ZS5zdG9wfHx1dGlsLmxldmVsU3RhdGU9PWdhbWVTdGF0ZS5lbmQpe1xuICAgICAgICAvLyAgICAgdGhpcy5zdG9wQXR0YWNrKCk7XG4gICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMucGFvKS5jYWxsKCgpPT57XG4gICAgICAgIC8vICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0J1bGxldF9DcmVhdG9yLHRoaXMuYnVsbGV0KTtcbiAgICAgICAgLy8gfSkuZGVsYXkoMS9hdGtUaW1lKS5jYWxsKCgpPT57XG4gICAgICAgIC8vICAgICB0aGlzLmF0dGFja0ZuKCk7XG4gICAgICAgIC8vIH0pLnN0YXJ0KCk7XG4gICAgICAgIGxldCBhdGtUaW1lOiBudW1iZXIgPSB0aGlzLnR1cnJldERhdGEuc3BlZWQ7XG4gICAgICAgIGlmICghYXRrVGltZSkge1xuICAgICAgICAgICAgYXRrVGltZSA9IDI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZVBhcmVudDpjYy5Ob2RlID0gdGhpcy5ub2RlLmdldFBhcmVudCgpO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodXRpbC5sZXZlbFN0YXRlID09IGdhbWVTdGF0ZS5zdG9wIHx8IHV0aWwubGV2ZWxTdGF0ZSA9PSBnYW1lU3RhdGUuZW5kKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodGhpcy5idWxsZXQudGFyZ2V0SWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrRGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc0FuZ2xlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNldFBhbygoKT0+e1xuICAgICAgICAgICAgICAgIGxldCBidWxsZXRQb3M6Y2MuVmVjMiA9IGNjLlZlYzIuY2xvbmUodGhpcy5wYW9Gb290Lm5vZGUuZ2V0UG9zaXRpb24oKSk7XG5cbiAgICAgICAgICAgICAgICBpZihOdW1iZXIodGhpcy50dXJyZXREYXRhLmJ1bGxldFkpPjApe1xuICAgICAgICAgICAgICAgICAgICBidWxsZXRQb3MueSArPU51bWJlcih0aGlzLnR1cnJldERhdGEuYnVsbGV0WSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmKHRoaXMuaW5pdERhdGEubGV2ZWw9PTE2fHx0aGlzLmluaXREYXRhLmxldmVsPT0zOCl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJ1bGxldFBvcy55ICs9MzA7XG4gICAgICAgICAgICAgICAgLy8gfWVsc2UgaWYodGhpcy5pbml0RGF0YS5sZXZlbD09MTh8fHRoaXMuaW5pdERhdGEubGV2ZWw9PTI5fHx0aGlzLmluaXREYXRhLmxldmVsPT0zMXx8dGhpcy5pbml0RGF0YS5sZXZlbD09MjEpe1xuICAgICAgICAgICAgICAgIC8vICAgICBidWxsZXRQb3MueSArPTUwO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBidWxsZXRQb3MgPSB0aGlzLnBhb0JvZHkubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYnVsbGV0UG9zKTtcbiAgICAgICAgICAgICAgICBidWxsZXRQb3MgPSBub2RlUGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGJ1bGxldFBvcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXQuaW5pdFBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucGFvQm9keS5jbGVhclRyYWNrcygpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5pdERhdGEubGV2ZWwhPT0zNyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFvQm9keS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb25cIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0aGlzLnR1cnJldERhdGEubW91dGgpe1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnBhb0Zvb3QuY2xlYXJUcmFja3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW9Gb290LnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfQnVsbGV0X0NyZWF0b3IsIHtkYXRhOnRoaXMuYnVsbGV0LHBvczpidWxsZXRQb3N9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sIDEgLyBhdGtUaW1lKTtcblxuXG5cbiAgICB9XG5cbiAgICBpbml0KGRhdGEpIHtcblxuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5pbml0RGF0YS5sZXZlbCA9IE51bWJlcih0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICAgICAgaWYoZGF0YS5ubyl7XG4gICAgICAgICAgICBsZXQgcG9zOiBjYy5WZWMyID0gY2MuVmVjMi5jbG9uZSh1dGlsLkdldFBsYWNlRGF0YShkYXRhLm5vKS5wb3MpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXROYW1lKCk7XG4gICAgICAgIHV0aWwuR2xvYmFsTWFwLnNldChcInR1cnJldF9cIiArIGRhdGEubm8sIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMuYXR0YWNrRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5bGe5oCnXG4gICAgICovXG4gICAgc2V0TmFtZSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDA7XG4gICAgICAgIC8vIHRoaXMubGFiZWwuc3RyaW5nID0gdGhpcy5pbml0RGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5wYW8uYW5nbGUgPSAwO1xuICAgICAgICAvL+eCruWhlOWxnuaAp1xuICAgICAgICB0aGlzLnR1cnJldERhdGEgPSB1dGlsLkdldFR1cnJldERhdGEodGhpcy5pbml0RGF0YS5sZXZlbCk7XG4gICAgICAgIHRoaXMucGFvRm9vdC5ub2RlLmFjdGl2ZSA9IHRoaXMudHVycmV0RGF0YS5tb3V0aD90cnVlOmZhbHNlO1xuXG4gICAgICAgIC8vIGlmKHRoaXMudHVycmV0RGF0YS5sZXZlbD09NXx8dGhpcy5pbml0RGF0YS5sZXZlbD09OXx8dGhpcy5pbml0RGF0YS5sZXZlbD09MTF8fHRoaXMuaW5pdERhdGEubGV2ZWw9PTE3fHx0aGlzLmluaXREYXRhLmxldmVsPT0yMnx8dGhpcy5pbml0RGF0YS5sZXZlbD09MzQpe1xuICAgICAgICAvLyAgICAgdGhpcy5wYW9Gb290Lm5vZGUueSA9IDA7XG4gICAgICAgIC8vIH1lbHNlIGlmKHRoaXMudHVycmV0RGF0YS5sZXZlbD09MjR8fHRoaXMudHVycmV0RGF0YS5sZXZlbD09MjV8fHRoaXMudHVycmV0RGF0YS5sZXZlbD09MjZ8fHRoaXMudHVycmV0RGF0YS5sZXZlbD09MzUpe1xuICAgICAgICAvLyAgICAgdGhpcy5wYW9Gb290Lm5vZGUueSA9IDgwO1xuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMucGFvRm9vdC5ub2RlLnkgPSA1MjtcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLnBhb0Zvb3Qubm9kZS55ID0gTnVtYmVyKHRoaXMudHVycmV0RGF0YS5tb3V0aFkpO1xuICAgICAgICB0aGlzLmJ1bGxldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHVycmV0RGF0YS5idWxsZXRUeXBlIHx8IDEsXG4gICAgICAgICAgICB0YXJnZXRJZDogbnVsbCxcbiAgICAgICAgICAgIGluaXRQb3M6IGNjLlZlYzIuY2xvbmUodGhpcy5ub2RlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIGF0azogTWF0aC5mbG9vcih0aGlzLnR1cnJldERhdGEuYXRrKSxcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgY3JpdDp0aGlzLnR1cnJldERhdGEuY3JpdHx8MTUgLy/pu5jorqQxNeWHoOeOh1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2FkU3BpbmUodGhpcy5wYW9Cb2R5LCBcInBhb1wiKTtcblxuICAgICAgICB0aGlzLmxvYWRTcGluZSh0aGlzLnBhb0Zvb3QsIFwibW91dGhcIik7XG5cbiAgICAgICAgLy8gY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQse25vOnRoaXMuaW5pdERhdGEubm99KTtcbiAgICAgICAgLy/plIDmr4HnrYnnuqfniYzlkozmloflrZdcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUxldmVsQmcodGhpcy5pbml0RGF0YS5ubyx0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICAgICAgfSwgMTAwKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWNh+e6p1xuICAgICAqIEBwYXJhbSBubyDlk6rkuKrkvY3nva5cbiAgICAgKi9cbiAgICB1cExldmVsKG5vPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEubGV2ZWwgKz0gMTtcbiAgICAgICAgaWYobm8pe1xuICAgICAgICAgICAgdGhpcy5pbml0RGF0YS5ubyA9IG5vO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlsLnVwTGV2ZWwodGhpcy5pbml0RGF0YS5sZXZlbCkmJnRoaXMuaW5pdERhdGEubm8pIHtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVVcGdyYWRlKTtcbiAgICAgICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlID09IDIpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZih1dGlsLmNoZWNrVGVzdEIoTmFtZVRzLm5ld19oYW5kX3Rlc3QpKXtcbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3Iucm9va2llX3Byb2Nlc3NfMih7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpcIuaLluaLveWQiOaIkOaIkOWKn1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5yb29raWVfcHJvY2Vzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZSA6XCLmi5bmi73lkIjmiJDmlYjmnpzpobVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrX2V2ZW50OiBcIueCueWHu1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTm92aWNlX0Nsb3NlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UcmVhc3VyZV9jcmVhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodXRpbC51c2VyRGF0YS50dXJyZXRMZXZlbCA+PSA3ICYmIHRoaXMuaW5pdERhdGEubm8pe1xuICAgICAgICAgICAgaWYodXRpbC51cFR1cnJldFJhbmRvbVJlZFRpbWUpe1xuICAgICAgICAgICAgICAgIGxldCBjdXJUaW1lciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIGxldCBwYWRUaW1lID0gY3VyVGltZXIgLSB1dGlsLnVwVHVycmV0UmFuZG9tUmVkVGltZTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYocGFkVGltZSA+PSA2MDAwMCl7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwudXBUdXJyZXRSYW5kb21SZWRUaW1lID0gY3VyVGltZXI7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVUdXJyZXRSYW5kb21SZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHBhZFRpbWUgPj0gMzAwMDApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmFuZG9tTnVtID0gTWF0aC5yYW5kb20oKTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihyYW5kb21OdW0gPD0gMC4yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwudXBUdXJyZXRSYW5kb21SZWRUaW1lID0gY3VyVGltZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHVycmV0UmFuZG9tUmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdXRpbC51cFR1cnJldFJhbmRvbVJlZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHVycmV0UmFuZG9tUmVkKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYodGhpcy5pbml0RGF0YS5ubyl7XG4gICAgICAgICAgICB1dGlsLnNhdmVQb29sKG5vLCB0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICAgICAgICAgIHV0aWwuYnV5Q291bnQgPSAwOyBcbiAgICAgICAgfWVsc2UgaWYodGhpcy5pbml0RGF0YS5ubyA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfS2lsbGVkLHtubzp1bmRlZmluZWR9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldE5hbWUoKTtcbiAgICAgICAgdGhpcy5hdHRhY2tEYXRhID0gdGhpcy5idWxsZXQudGFyZ2V0SWQgPSBudWxsOyAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7ngq7loZTop5LluqZcbiAgICAgKiBAcGFyYW0gY2FsbCDlm57osIMgXG4gICAgICovXG4gICAgc2V0UGFvKGNhbGw/OkZ1bmN0aW9uKSB7XG5cbiAgICAgICAgaWYodGhpcy50dXJyZXREYXRhLnJvdGF0aW9uPT0xKXtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNBbmdsZSlyZXR1cm47XG4gICAgICAgICAgICBsZXQgbGFzdEFuZ2xlOm51bWJlciA9IHRoaXMucGFvLmFuZ2xlO1xuICAgICAgICAgICAgbGV0IG5vd0FuZ2xlOm51bWJlciA9IHRoaXMuR2V0QW5nbGUoKTtcbiAgICAgICAgICAgIHRoaXMuaXNBbmdsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgYW5nbGVOdW06bnVtYmVyID0gTWF0aC5hYnMobGFzdEFuZ2xlLW5vd0FuZ2xlKTtcbiAgICAgICAgICAgIGlmKChub3dBbmdsZT4tMjYwJiZub3dBbmdsZTw9LTI3MCkpe1xuICAgICAgICAgICAgICAgIG5vd0FuZ2xlICs9IDM2MDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhby5hbmdsZSA9IG5vd0FuZ2xlO1xuICAgICAgICAgICAgICAgIGFuZ2xlTnVtID0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKG5vd0FuZ2xlPjAmJm5vd0FuZ2xlPD05MCl7XG4gICAgICAgICAgICAgICAgbm93QW5nbGUgLT0gMzYwO1xuICAgICAgICAgICAgICAgIGFuZ2xlTnVtID0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihhbmdsZU51bT41JiZhbmdsZU51bTwzNjApe1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMucGFvKS50byhhbmdsZU51bS8xMDAwLHthbmdsZTpub3dBbmdsZX0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FuZ2xlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNhbGwmJmNhbGwoKTtcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5wYW8uYW5nbGUgPSBub3dBbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQW5nbGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjYWxsJiZjYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY2FsbCYmY2FsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICAvKirlgZzmraLmlLvlh7sgKi9cblxuICAgIHN0b3BBdHRhY2soKSB7XG5cbiAgICAgICAgLy8gdGhpcy5wYW9Cb2R5LnN0b3AoKTtcbiAgICAgICAgLy8gdGhpcy5wYW9Gb290LnNldEFuaW1hdGlvbigxLFwiXCIsZmFsc2UpO1xuICAgICAgICB0aGlzLnBhby5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAvLyB0aGlzLnBhby5zY2FsZSA9IDAuNDtcbiAgICB9XG5cbiAgICAvKirnu6fnu63mlLvlh7sgKi9cbiAgICByZXN1bWVBdHRhY2soKSB7XG4gICAgICAgIHRoaXMuYXR0YWNrRm4oKTtcbiAgICB9XG5cbn1cbiJdfQ==