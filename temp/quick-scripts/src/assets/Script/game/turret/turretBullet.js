"use strict";
cc._RF.push(module, '4aaa4accOJH2ZynSNQIzBF6', 'turretBullet');
// Script/game/turret/turretBullet.ts

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
var tool_1 = require("../../util/tool");
var util_1 = require("../../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretBullet = /** @class */ (function (_super) {
    __extends(turretBullet, _super);
    function turretBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletPic = null;
        _this.bulletSpine = null;
        /**是否瞬间 */
        _this.isMoment = false;
        //是否旋转
        _this.isAngle = null;
        return _this;
    }
    turretBullet.prototype.start = function () {
    };
    /**初始化 */
    turretBullet.prototype.init = function (data) {
        this.initData = data.data;
        this.bulletPic.node.active = this.bulletSpine.node.active = false;
        this.bulletData = util_1.default.GetBulletData(this.initData.type);
        // if(!this.bulletPic){
        //     let aaa = this.initData.type;
        // }
        var pos = cc.Vec2.clone(data.pos);
        //设置出生位置
        // this.destroyIng = false;
        this.isMoment = false;
        this.node.setPosition(pos);
        this.node.angle = this.bulletSpine.node.angle = this.bulletPic.node.angle = 0;
        this.isAngle = this.bulletData.type == 1 ? false : null;
        this.bulletSpine.node.scale = 1;
        //用于出厂动画
        // this.node.scale = 0;
        var name = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + this.initData.targetId;
        this.targetNode = util_1.default.MonsterMap.get(name);
        //如果找不到就删除
        if (!this.targetNode) {
            this.destroyBullet();
            return;
        }
        if (this.bulletData.bulletSpine == 1) {
            this.bulletSpine.node.active = true;
            this.isMoment = true;
            this.loadSpine();
        }
        else {
            this.bulletPic.node.active = true;
            this.isMoment = false;
            this.loadSprite();
        }
    };
    /**
     * 加载图片
     */
    turretBullet.prototype.loadSprite = function () {
        var _this = this;
        if (this.bulletPic) {
            this.bulletPic.spriteFrame = null;
        }
        cc.resources.load("spine/turret/" + this.bulletData.type + "/bullet/paodan", cc.SpriteFrame, function (error, res) {
            if (_this.bulletPic) {
                _this.bulletPic.spriteFrame = res;
            }
        });
    };
    /**
     * 加载龙骨
     */
    turretBullet.prototype.loadSpine = function () {
        var _this = this;
        if (this.bulletSpine) {
            this.bulletSpine.skeletonData = null;
        }
        cc.resources.load("spine/turret/" + this.bulletData.type + "/bullet/" + this.bulletData.name, sp.SkeletonData, function (error, sp) {
            if (error) {
                cc.warn(error);
                return;
            }
            _this.bulletSpine.skeletonData = sp;
            if (_this.bulletData.Spine == 1) {
                _this.bulletSpine.setAnimation(0, _this.bulletData.animationName, _this.bulletData.loop == "1");
                _this.isMoment = false;
            }
            else {
                _this.bulletSpine.clearTracks();
                _this.playAni();
            }
        });
    };
    turretBullet.prototype.update = function (dt) {
        //游戏暂停
        if (util_1.default.levelState == faceTs_1.gameState.stop || this.isMoment)
            return;
        //没有父节点或者目标
        if (!this.targetNode || !this.targetNode.parent) {
            this.destroyBullet();
            return;
        }
        ;
        //目标点
        var targetPos = cc.Vec2.clone(this.targetNode.getPosition());
        targetPos = this.targetNode.parent.convertToWorldSpaceAR(targetPos);
        targetPos = this.node.parent.convertToNodeSpaceAR(targetPos);
        var selfPos = this.node.getPosition();
        //距离
        if (this.isAngle == null) {
            this.node.angle = tool_1.default.GetPosAngle(selfPos, targetPos);
        }
        var distance = selfPos.sub(targetPos).mag();
        if (distance <= this.targetNode.width / 2) {
            this.targetNode = null;
            this.hurtMonster();
            this.destroyBullet();
            return;
        }
        var normalizeVec = targetPos.subtract(selfPos).normalize();
        this.node.x += normalizeVec.x * this.initData.speed * dt;
        this.node.y += normalizeVec.y * this.initData.speed * dt;
    };
    /**
     * 播放动画
     */
    turretBullet.prototype.playAni = function () {
        var _this = this;
        if (!this.targetNode || !this.targetNode.parent || !this.isMoment) {
            this.destroyBullet();
            return;
        }
        //目标点
        var targetPos = this.targetNode.getPosition();
        if (!targetPos || !this.node.parent) {
            this.destroyBullet();
            return;
        }
        targetPos = this.targetNode.parent.convertToWorldSpaceAR(targetPos);
        targetPos = this.node.parent.convertToNodeSpaceAR(targetPos);
        var selfPos = this.node.getPosition();
        //距离
        this.node.angle = tool_1.default.GetPosAngle(selfPos, targetPos);
        var distance = targetPos.sub(selfPos).mag();
        this.bulletSpine.node.y = Number(this.bulletData.Y);
        var nodeWidth = Number(this.bulletData.width);
        this.bulletSpine.node.scaleY = distance / (this.bulletData.bulletSpine == 1 ? nodeWidth : this.bulletSpine.node.height) * 1.3;
        if (!targetPos || !this.node.parent) {
            this.destroyBullet();
            return;
        }
        // this.bulletSpine.node.opacity = 0;
        this.bulletSpine.setAnimation(0, this.bulletData.animationName, false);
        if (this.bulletData.type == 30) {
            this.scheduleOnce(function () {
                _this.hurtMonster();
            }, .1);
        }
        else {
            this.hurtMonster();
        }
        // this.bulletSpine.setCompleteListener(()=>{
        //     this.destroyBullet();
        // });
        this.scheduleOnce(function () {
            _this.destroyBullet();
        }, .5);
    };
    /**回收自己 */
    turretBullet.prototype.destroyBullet = function () {
        //回收自己
        cc.game.emit(NameTs_1.default.Game_Turret_Bullet_Killed, this.node);
    };
    /**受伤 */
    turretBullet.prototype.hurtMonster = function () {
        //暴击
        var crit = (Math.random() < (this.initData.crit / 100)) ? 2 : 1;
        //爆炸伤害
        cc.game.emit(NameTs_1.default.Game_Bullet_Boom_Creator, { type: this.initData.type, id: this.initData.targetId });
        //怪物受伤
        var monsetrName = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + this.initData.targetId;
        cc.game.emit(NameTs_1.default.Game_Monster_Bruise + monsetrName, { num: this.initData.atk, crit: crit });
    };
    __decorate([
        property({ type: cc.Sprite, displayName: "炮弹图片" })
    ], turretBullet.prototype, "bulletPic", void 0);
    __decorate([
        property({ type: sp.Skeleton, displayName: "炮弹骨骼" })
    ], turretBullet.prototype, "bulletSpine", void 0);
    turretBullet = __decorate([
        ccclass
    ], turretBullet);
    return turretBullet;
}(cc.Component));
exports.default = turretBullet;

cc._RF.pop();