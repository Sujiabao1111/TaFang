"use strict";
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