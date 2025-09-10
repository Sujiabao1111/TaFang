
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/turret/turretBullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4aaa4accOJH2ZynSNQIzBF6', 'turretBullet');
// Script/game/turret/turretBullet.ts

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
var Tools_1 = require("../../util/Tools");
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
            this.node.angle = Tools_1.Tools.GetPosAngle(selfPos, targetPos);
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
        this.node.angle = Tools_1.Tools.GetPosAngle(selfPos, targetPos);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRcXHR1cnJldEJ1bGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBNEQ7QUFDNUQsOENBQXlDO0FBQ3pDLDBDQUF5QztBQUN6Qyx3Q0FBbUM7QUFFN0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUE0TkM7UUF6TkcsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFTaEMsVUFBVTtRQUNGLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFLbEMsTUFBTTtRQUNFLGFBQU8sR0FBWSxJQUFJLENBQUM7O0lBc01wQyxDQUFDO0lBcE1HLDRCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsU0FBUztJQUNULDJCQUFJLEdBQUosVUFBSyxJQUFJO1FBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELHVCQUF1QjtRQUN2QixvQ0FBb0M7UUFDcEMsSUFBSTtRQUNKLElBQUksR0FBRyxHQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxRQUFRO1FBQ1IsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJ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QUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQy9ILEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsbUJBQW1CLEdBQUcsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztJQUU3RixDQUFDO0lBeE5EO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO21EQUN2QjtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQztxREFDckI7SUFOZixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBNE5oQztJQUFELG1CQUFDO0NBNU5ELEFBNE5DLENBNU55QyxFQUFFLENBQUMsU0FBUyxHQTROckQ7a0JBNU5vQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IGJ1bGxldEluZm8sIGdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi8uLi91dGlsL1Rvb2xzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0dXJyZXRCdWxsZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLngq7lvLnlm77niYdcIiB9KVxuICAgIGJ1bGxldFBpYzogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IHNwLlNrZWxldG9uLCBkaXNwbGF5TmFtZTogXCLngq7lvLnpqqjpqrxcIiB9KVxuICAgIGJ1bGxldFNwaW5lOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICAvLyBvbkxvYWQgKCkge31cbiAgICAvKirnm67moIfoioLngrkqL1xuICAgIHByaXZhdGUgdGFyZ2V0Tm9kZTogY2MuTm9kZTtcblxuICAgIC8qKuWIneWni+aVsOaNriAqL1xuICAgIHByaXZhdGUgaW5pdERhdGE7XG5cbiAgICAvKirmmK/lkKbnnqzpl7QgKi9cbiAgICBwcml2YXRlIGlzTW9tZW50OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvL+WtkOW8ueaVsOaNrlxuICAgIHByaXZhdGUgYnVsbGV0RGF0YTogYW55O1xuXG4gICAgLy/mmK/lkKbml4vovaxcbiAgICBwcml2YXRlIGlzQW5nbGU6IGJvb2xlYW4gPSBudWxsO1xuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKirliJ3lp4vljJYgKi9cbiAgICBpbml0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IGRhdGEuZGF0YTtcblxuICAgICAgICB0aGlzLmJ1bGxldFBpYy5ub2RlLmFjdGl2ZSA9IHRoaXMuYnVsbGV0U3BpbmUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idWxsZXREYXRhID0gdXRpbC5HZXRCdWxsZXREYXRhKHRoaXMuaW5pdERhdGEudHlwZSk7XG4gICAgICAgIC8vIGlmKCF0aGlzLmJ1bGxldFBpYyl7XG4gICAgICAgIC8vICAgICBsZXQgYWFhID0gdGhpcy5pbml0RGF0YS50eXBlO1xuICAgICAgICAvLyB9XG4gICAgICAgIGxldCBwb3M6IGNjLlZlYzIgPSBjYy5WZWMyLmNsb25lKGRhdGEucG9zKTtcbiAgICAgICAgLy/orr7nva7lh7rnlJ/kvY3nva5cbiAgICAgICAgLy8gdGhpcy5kZXN0cm95SW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNb21lbnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IHRoaXMuYnVsbGV0U3BpbmUubm9kZS5hbmdsZSA9IHRoaXMuYnVsbGV0UGljLm5vZGUuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmlzQW5nbGUgPSB0aGlzLmJ1bGxldERhdGEudHlwZSA9PSAxID8gZmFsc2UgOiBudWxsO1xuICAgICAgICB0aGlzLmJ1bGxldFNwaW5lLm5vZGUuc2NhbGUgPSAxO1xuXG4gICAgICAgIC8v55So5LqO5Ye65Y6C5Yqo55S7XG4gICAgICAgIC8vIHRoaXMubm9kZS5zY2FsZSA9IDA7XG5cbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcgKyBcIi1cIiArIHV0aWwudXNlckRhdGEuY3VzdG9tcy5zbWFsbCArIFwiX01vbnN0ZXJfXCIgKyB0aGlzLmluaXREYXRhLnRhcmdldElkO1xuICAgICAgICB0aGlzLnRhcmdldE5vZGUgPSB1dGlsLk1vbnN0ZXJNYXAuZ2V0KG5hbWUpO1xuXG4gICAgICAgIC8v5aaC5p6c5om+5LiN5Yiw5bCx5Yig6ZmkXG4gICAgICAgIGlmICghdGhpcy50YXJnZXROb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCdWxsZXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJ1bGxldERhdGEuYnVsbGV0U3BpbmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5idWxsZXRTcGluZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlzTW9tZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9hZFNwaW5lKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldFBpYy5ub2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuaXNNb21lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3lm77niYdcbiAgICAgKi9cbiAgICBsb2FkU3ByaXRlKCkge1xuICAgICAgICBpZiAodGhpcy5idWxsZXRQaWMpIHtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0UGljLnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcInNwaW5lL3R1cnJldC9cIiArIHRoaXMuYnVsbGV0RGF0YS50eXBlICsgXCIvYnVsbGV0L3Bhb2RhblwiLCBjYy5TcHJpdGVGcmFtZSwgKGVycm9yLCByZXM6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5idWxsZXRQaWMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldFBpYy5zcHJpdGVGcmFtZSA9IHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3pvpnpqqhcbiAgICAgKi9cbiAgICBsb2FkU3BpbmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmJ1bGxldFNwaW5lKSB7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldFNwaW5lLnNrZWxldG9uRGF0YSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoXCJzcGluZS90dXJyZXQvXCIgKyB0aGlzLmJ1bGxldERhdGEudHlwZSArIFwiL2J1bGxldC9cIiArIHRoaXMuYnVsbGV0RGF0YS5uYW1lLCBzcC5Ta2VsZXRvbkRhdGEsIChlcnJvciwgc3A6IHNwLlNrZWxldG9uRGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5idWxsZXRTcGluZS5za2VsZXRvbkRhdGEgPSBzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1bGxldERhdGEuU3BpbmUgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0U3BpbmUuc2V0QW5pbWF0aW9uKDAsIHRoaXMuYnVsbGV0RGF0YS5hbmltYXRpb25OYW1lLCB0aGlzLmJ1bGxldERhdGEubG9vcCA9PSBcIjFcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5pc01vbWVudCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldFNwaW5lLmNsZWFyVHJhY2tzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5QW5pKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIC8v5ri45oiP5pqC5YGcXG4gICAgICAgIGlmICh1dGlsLmxldmVsU3RhdGUgPT0gZ2FtZVN0YXRlLnN0b3AgfHwgdGhpcy5pc01vbWVudCkgcmV0dXJuO1xuICAgICAgICAvL+ayoeacieeItuiKgueCueaIluiAheebruagh1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0Tm9kZSB8fCAhdGhpcy50YXJnZXROb2RlLnBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95QnVsbGV0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIC8v55uu5qCH54K5XG4gICAgICAgIGxldCB0YXJnZXRQb3M6IGNjLlZlYzIgPSBjYy5WZWMyLmNsb25lKHRoaXMudGFyZ2V0Tm9kZS5nZXRQb3NpdGlvbigpKTtcblxuICAgICAgICB0YXJnZXRQb3MgPSB0aGlzLnRhcmdldE5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0YXJnZXRQb3MpO1xuICAgICAgICB0YXJnZXRQb3MgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XG5cbiAgICAgICAgbGV0IHNlbGZQb3M6IGNjLlZlYzIgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgLy/ot53nprtcbiAgICAgICAgaWYgKHRoaXMuaXNBbmdsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBUb29scy5HZXRQb3NBbmdsZShzZWxmUG9zLCB0YXJnZXRQb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRpc3RhbmNlOiBudW1iZXIgPSBzZWxmUG9zLnN1Yih0YXJnZXRQb3MpLm1hZygpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPD0gdGhpcy50YXJnZXROb2RlLndpZHRoIC8gMikge1xuICAgICAgICAgICAgdGhpcy50YXJnZXROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuaHVydE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUJ1bGxldCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5vcm1hbGl6ZVZlYzogY2MuVmVjMiA9IHRhcmdldFBvcy5zdWJ0cmFjdChzZWxmUG9zKS5ub3JtYWxpemUoKTtcblxuICAgICAgICB0aGlzLm5vZGUueCArPSBub3JtYWxpemVWZWMueCAqIHRoaXMuaW5pdERhdGEuc3BlZWQgKiBkdDtcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gbm9ybWFsaXplVmVjLnkgKiB0aGlzLmluaXREYXRhLnNwZWVkICogZHQ7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+5Yqo55S7XG4gICAgICovXG4gICAgcGxheUFuaSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldE5vZGUgfHwgIXRoaXMudGFyZ2V0Tm9kZS5wYXJlbnQgfHwgIXRoaXMuaXNNb21lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUJ1bGxldCgpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvL+ebruagh+eCuVxuICAgICAgICBsZXQgdGFyZ2V0UG9zOiBjYy5WZWMyID0gdGhpcy50YXJnZXROb2RlLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXRQb3MgfHwgIXRoaXMubm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUJ1bGxldCgpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0UG9zID0gdGhpcy50YXJnZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGFyZ2V0UG9zKTtcbiAgICAgICAgdGFyZ2V0UG9zID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xuXG4gICAgICAgIGxldCBzZWxmUG9zOiBjYy5WZWMyID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgLy/ot53nprtcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gVG9vbHMuR2V0UG9zQW5nbGUoc2VsZlBvcywgdGFyZ2V0UG9zKTtcblxuICAgICAgICBsZXQgZGlzdGFuY2U6IG51bWJlciA9IHRhcmdldFBvcy5zdWIoc2VsZlBvcykubWFnKCk7XG5cbiAgICAgICAgdGhpcy5idWxsZXRTcGluZS5ub2RlLnkgPSBOdW1iZXIodGhpcy5idWxsZXREYXRhLlkpO1xuICAgICAgICBsZXQgbm9kZVdpZHRoOiBudW1iZXIgPSBOdW1iZXIodGhpcy5idWxsZXREYXRhLndpZHRoKTtcblxuICAgICAgICB0aGlzLmJ1bGxldFNwaW5lLm5vZGUuc2NhbGVZID0gZGlzdGFuY2UgLyAodGhpcy5idWxsZXREYXRhLmJ1bGxldFNwaW5lID09IDEgPyBub2RlV2lkdGggOiB0aGlzLmJ1bGxldFNwaW5lLm5vZGUuaGVpZ2h0KSAqIDEuMztcbiAgICAgICAgaWYgKCF0YXJnZXRQb3MgfHwgIXRoaXMubm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUJ1bGxldCgpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIHRoaXMuYnVsbGV0U3BpbmUubm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgdGhpcy5idWxsZXRTcGluZS5zZXRBbmltYXRpb24oMCwgdGhpcy5idWxsZXREYXRhLmFuaW1hdGlvbk5hbWUsIGZhbHNlKTtcblxuICAgICAgICBpZiAodGhpcy5idWxsZXREYXRhLnR5cGUgPT0gMzApIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmh1cnRNb25zdGVyKCk7XG4gICAgICAgICAgICB9LCAuMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmh1cnRNb25zdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLmJ1bGxldFNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKCk9PntcbiAgICAgICAgLy8gICAgIHRoaXMuZGVzdHJveUJ1bGxldCgpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95QnVsbGV0KCk7XG4gICAgICAgIH0sIC41KTtcblxuICAgIH1cblxuICAgIC8qKuWbnuaUtuiHquW3sSAqL1xuICAgIGRlc3Ryb3lCdWxsZXQoKSB7XG4gICAgICAgIC8v5Zue5pS26Ieq5bexXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfQnVsbGV0X0tpbGxlZCwgdGhpcy5ub2RlKTtcblxuICAgIH1cblxuICAgIC8qKuWPl+S8pCAqL1xuICAgIGh1cnRNb25zdGVyKCkge1xuICAgICAgICAvL+aatOWHu1xuICAgICAgICBsZXQgY3JpdDogbnVtYmVyID0gKE1hdGgucmFuZG9tKCkgPCAodGhpcy5pbml0RGF0YS5jcml0IC8gMTAwKSkgPyAyIDogMTtcbiAgICAgICAgLy/niIbngrjkvKTlrrNcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0J1bGxldF9Cb29tX0NyZWF0b3IsIHsgdHlwZTogdGhpcy5pbml0RGF0YS50eXBlLCBpZDogdGhpcy5pbml0RGF0YS50YXJnZXRJZCB9KTtcbiAgICAgICAgLy/mgKrnianlj5fkvKRcbiAgICAgICAgbGV0IG1vbnNldHJOYW1lOiBzdHJpbmcgPSB1dGlsLnVzZXJEYXRhLmN1c3RvbXMuYmlnICsgXCItXCIgKyB1dGlsLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwgKyBcIl9Nb25zdGVyX1wiICsgdGhpcy5pbml0RGF0YS50YXJnZXRJZDtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfQnJ1aXNlICsgbW9uc2V0ck5hbWUsIHsgbnVtOiB0aGlzLmluaXREYXRhLmF0aywgY3JpdCB9KTtcblxuICAgIH1cbn1cbiJdfQ==