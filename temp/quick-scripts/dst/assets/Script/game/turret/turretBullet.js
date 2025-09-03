
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRcXHR1cnJldEJ1bGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBNEQ7QUFDNUQsOENBQXlDO0FBQ3pDLHdDQUFtQztBQUNuQyx3Q0FBbUM7QUFFN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUE0TkM7UUF6TkcsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFTaEMsVUFBVTtRQUNGLGNBQVEsR0FBVyxLQUFLLENBQUM7UUFLakMsTUFBTTtRQUNFLGFBQU8sR0FBVyxJQUFJLENBQUM7O0lBc01uQyxDQUFDO0lBcE1HLDRCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsU0FBUztJQUNULDJCQUFJLEdBQUosVUFBSyxJQUFJO1FBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELHVCQUF1QjtRQUN2QixvQ0FBb0M7UUFDcEMsSUFBSTtRQUNKLElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxRQUFRO1FBQ1IsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJ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TyxDQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsY0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUN0SCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLG1CQUFtQixHQUFDLFdBQVcsRUFBQyxFQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxJQUFJLE1BQUEsRUFBQyxDQUFDLENBQUM7SUFFdEYsQ0FBQztJQXhORDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQzttREFDbEI7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7cURBQ2hCO0lBTmYsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQTROaEM7SUFBRCxtQkFBQztDQTVORCxBQTROQyxDQTVOeUMsRUFBRSxDQUFDLFNBQVMsR0E0TnJEO2tCQTVOb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uLy4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBidWxsZXRJbmZvLCBnYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4uLy4uL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uLy4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHR1cnJldEJ1bGxldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU3ByaXRlLGRpc3BsYXlOYW1lOlwi54Ku5by55Zu+54mHXCJ9KVxuICAgIGJ1bGxldFBpYzogY2MuU3ByaXRlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6c3AuU2tlbGV0b24sZGlzcGxheU5hbWU6XCLngq7lvLnpqqjpqrxcIn0pXG4gICAgYnVsbGV0U3BpbmU6IHNwLlNrZWxldG9uID0gbnVsbDtcblxuICAgIC8vIG9uTG9hZCAoKSB7fVxuICAgIC8qKuebruagh+iKgueCuSovXG4gICAgcHJpdmF0ZSB0YXJnZXROb2RlOmNjLk5vZGU7XG5cbiAgICAvKirliJ3lp4vmlbDmja4gKi9cbiAgICBwcml2YXRlIGluaXREYXRhO1xuXG4gICAgLyoq5piv5ZCm556s6Ze0ICovXG4gICAgcHJpdmF0ZSBpc01vbWVudDpib29sZWFuID0gZmFsc2U7XG5cbiAgICAvL+WtkOW8ueaVsOaNrlxuICAgIHByaXZhdGUgYnVsbGV0RGF0YTphbnk7XG5cbiAgICAvL+aYr+WQpuaXi+i9rFxuICAgIHByaXZhdGUgaXNBbmdsZTpib29sZWFuID0gbnVsbDtcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyWICovXG4gICAgaW5pdChkYXRhKXsgICAgICAgIFxuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YS5kYXRhO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idWxsZXRQaWMubm9kZS5hY3RpdmUgPSB0aGlzLmJ1bGxldFNwaW5lLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYnVsbGV0RGF0YSA9IHV0aWwuR2V0QnVsbGV0RGF0YSh0aGlzLmluaXREYXRhLnR5cGUpO1xuICAgICAgICAvLyBpZighdGhpcy5idWxsZXRQaWMpe1xuICAgICAgICAvLyAgICAgbGV0IGFhYSA9IHRoaXMuaW5pdERhdGEudHlwZTtcbiAgICAgICAgLy8gfVxuICAgICAgICBsZXQgcG9zOmNjLlZlYzIgPSBjYy5WZWMyLmNsb25lKGRhdGEucG9zKTtcbiAgICAgICAgLy/orr7nva7lh7rnlJ/kvY3nva5cbiAgICAgICAgLy8gdGhpcy5kZXN0cm95SW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNb21lbnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IHRoaXMuYnVsbGV0U3BpbmUubm9kZS5hbmdsZSA9IHRoaXMuYnVsbGV0UGljLm5vZGUuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmlzQW5nbGUgPSB0aGlzLmJ1bGxldERhdGEudHlwZSA9PSAxP2ZhbHNlOm51bGw7XG4gICAgICAgIHRoaXMuYnVsbGV0U3BpbmUubm9kZS5zY2FsZSA9IDE7XG5cbiAgICAgICAgLy/nlKjkuo7lh7rljoLliqjnlLtcbiAgICAgICAgLy8gdGhpcy5ub2RlLnNjYWxlID0gMDtcblxuICAgICAgICBsZXQgbmFtZTpzdHJpbmcgPSB1dGlsLnVzZXJEYXRhLmN1c3RvbXMuYmlnK1wiLVwiK3V0aWwudXNlckRhdGEuY3VzdG9tcy5zbWFsbCtcIl9Nb25zdGVyX1wiK3RoaXMuaW5pdERhdGEudGFyZ2V0SWQ7XG4gICAgICAgIHRoaXMudGFyZ2V0Tm9kZSA9IHV0aWwuTW9uc3Rlck1hcC5nZXQobmFtZSk7XG5cbiAgICAgICAgLy/lpoLmnpzmib7kuI3liLDlsLHliKDpmaRcbiAgICAgICAgaWYoIXRoaXMudGFyZ2V0Tm9kZSl7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCdWxsZXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuYnVsbGV0RGF0YS5idWxsZXRTcGluZT09MSl7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldFNwaW5lLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNNb21lbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2FkU3BpbmUoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldFBpYy5ub2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuaXNNb21lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3lm77niYdcbiAgICAgKi9cbiAgICBsb2FkU3ByaXRlKCl7XG4gICAgICAgIGlmKHRoaXMuYnVsbGV0UGljKXtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0UGljLnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgfSBcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoXCJzcGluZS90dXJyZXQvXCIrdGhpcy5idWxsZXREYXRhLnR5cGUrXCIvYnVsbGV0L3Bhb2RhblwiLGNjLlNwcml0ZUZyYW1lLCAoZXJyb3IsIHJlczpjYy5TcHJpdGVGcmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5idWxsZXRQaWMpe1xuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0UGljLnNwcml0ZUZyYW1lID0gcmVzO1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3pvpnpqqhcbiAgICAgKi9cbiAgICBsb2FkU3BpbmUoKXtcbiAgICAgICAgaWYodGhpcy5idWxsZXRTcGluZSl7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldFNwaW5lLnNrZWxldG9uRGF0YSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoXCJzcGluZS90dXJyZXQvXCIrdGhpcy5idWxsZXREYXRhLnR5cGUrXCIvYnVsbGV0L1wiK3RoaXMuYnVsbGV0RGF0YS5uYW1lLHNwLlNrZWxldG9uRGF0YSwgKGVycm9yLCBzcDpzcC5Ta2VsZXRvbkRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmKGVycm9yKXtcbiAgICAgICAgICAgICAgICBjYy53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJ1bGxldFNwaW5lLnNrZWxldG9uRGF0YSA9IHNwO1xuICAgICAgICAgICAgaWYodGhpcy5idWxsZXREYXRhLlNwaW5lPT0xKXtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldFNwaW5lLnNldEFuaW1hdGlvbigwLHRoaXMuYnVsbGV0RGF0YS5hbmltYXRpb25OYW1lLHRoaXMuYnVsbGV0RGF0YS5sb29wPT1cIjFcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5pc01vbWVudCA9IGZhbHNlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXRTcGluZS5jbGVhclRyYWNrcygpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUFuaSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgLy/muLjmiI/mmoLlgZxcbiAgICAgICAgaWYodXRpbC5sZXZlbFN0YXRlID09IGdhbWVTdGF0ZS5zdG9wfHx0aGlzLmlzTW9tZW50KXJldHVybjtcbiAgICAgICAgLy/msqHmnInniLboioLngrnmiJbogIXnm67moIdcbiAgICAgICAgaWYoIXRoaXMudGFyZ2V0Tm9kZXx8IXRoaXMudGFyZ2V0Tm9kZS5wYXJlbnQpe1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95QnVsbGV0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIC8v55uu5qCH54K5XG4gICAgICAgIGxldCB0YXJnZXRQb3M6Y2MuVmVjMiA9IGNjLlZlYzIuY2xvbmUodGhpcy50YXJnZXROb2RlLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgIHRhcmdldFBvcyA9IHRoaXMudGFyZ2V0Tm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRhcmdldFBvcyk7XG4gICAgICAgIHRhcmdldFBvcyA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcbiAgICAgICBcbiAgICAgICAgbGV0IHNlbGZQb3M6Y2MuVmVjMiA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAvL+i3neemu1xuICAgICAgICBpZih0aGlzLmlzQW5nbGU9PW51bGwpe1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gdG9vbC5HZXRQb3NBbmdsZShzZWxmUG9zLHRhcmdldFBvcyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlzdGFuY2U6bnVtYmVyID0gc2VsZlBvcy5zdWIodGFyZ2V0UG9zKS5tYWcoKTtcbiAgICAgICAgaWYoZGlzdGFuY2U8PXRoaXMudGFyZ2V0Tm9kZS53aWR0aC8yKXtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmh1cnRNb25zdGVyKCk7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCdWxsZXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IG5vcm1hbGl6ZVZlYzogY2MuVmVjMiA9IHRhcmdldFBvcy5zdWJ0cmFjdChzZWxmUG9zKS5ub3JtYWxpemUoKTtcblxuICAgICAgICB0aGlzLm5vZGUueCArPSBub3JtYWxpemVWZWMueCAqIHRoaXMuaW5pdERhdGEuc3BlZWQgKiBkdDtcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gbm9ybWFsaXplVmVjLnkgKiB0aGlzLmluaXREYXRhLnNwZWVkICogZHQ7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+5Yqo55S7XG4gICAgICovXG4gICAgcGxheUFuaSgpe1xuICAgICAgICBpZighdGhpcy50YXJnZXROb2RlfHwhdGhpcy50YXJnZXROb2RlLnBhcmVudHx8IXRoaXMuaXNNb21lbnQpe1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95QnVsbGV0KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8v55uu5qCH54K5XG4gICAgICAgIGxldCB0YXJnZXRQb3M6Y2MuVmVjMiA9IHRoaXMudGFyZ2V0Tm9kZS5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAgIGlmKCF0YXJnZXRQb3N8fCF0aGlzLm5vZGUucGFyZW50KXtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUJ1bGxldCgpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0UG9zID0gdGhpcy50YXJnZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGFyZ2V0UG9zKTtcbiAgICAgICAgdGFyZ2V0UG9zID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xuICAgICAgIFxuICAgICAgICBsZXQgc2VsZlBvczpjYy5WZWMyID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgLy/ot53nprtcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gdG9vbC5HZXRQb3NBbmdsZShzZWxmUG9zLHRhcmdldFBvcyk7XG5cbiAgICAgICAgbGV0IGRpc3RhbmNlOm51bWJlciA9IHRhcmdldFBvcy5zdWIoc2VsZlBvcykubWFnKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1bGxldFNwaW5lLm5vZGUueSA9IE51bWJlcih0aGlzLmJ1bGxldERhdGEuWSk7XG4gICAgICAgIGxldCBub2RlV2lkdGg6bnVtYmVyID0gTnVtYmVyKHRoaXMuYnVsbGV0RGF0YS53aWR0aCk7XG5cbiAgICAgICAgdGhpcy5idWxsZXRTcGluZS5ub2RlLnNjYWxlWSA9IGRpc3RhbmNlLyh0aGlzLmJ1bGxldERhdGEuYnVsbGV0U3BpbmU9PTE/bm9kZVdpZHRoOnRoaXMuYnVsbGV0U3BpbmUubm9kZS5oZWlnaHQpKjEuMztcbiAgICAgICAgaWYoIXRhcmdldFBvc3x8IXRoaXMubm9kZS5wYXJlbnQpe1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95QnVsbGV0KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLmJ1bGxldFNwaW5lLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgICAgIHRoaXMuYnVsbGV0U3BpbmUuc2V0QW5pbWF0aW9uKDAsdGhpcy5idWxsZXREYXRhLmFuaW1hdGlvbk5hbWUsZmFsc2UpO1xuXG4gICAgICAgIGlmKHRoaXMuYnVsbGV0RGF0YS50eXBlID09IDMwKXtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5odXJ0TW9uc3RlcigpO1xuICAgICAgICAgICAgfSwuMSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5odXJ0TW9uc3RlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcy5idWxsZXRTcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57XG4gICAgICAgIC8vICAgICB0aGlzLmRlc3Ryb3lCdWxsZXQoKTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCdWxsZXQoKTtcbiAgICAgICAgfSwuNSk7XG5cbiAgICB9XG5cbiAgICAvKirlm57mlLboh6rlt7EgKi9cbiAgICBkZXN0cm95QnVsbGV0KCl7XG4gICAgICAgIC8v5Zue5pS26Ieq5bexXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfQnVsbGV0X0tpbGxlZCx0aGlzLm5vZGUpO1xuICAgICAgIFxuICAgIH1cblxuICAgIC8qKuWPl+S8pCAqL1xuICAgIGh1cnRNb25zdGVyKCl7XG4gICAgICAgIC8v5pq05Ye7XG4gICAgICAgIGxldCBjcml0Om51bWJlciA9IChNYXRoLnJhbmRvbSgpPCh0aGlzLmluaXREYXRhLmNyaXQvMTAwKSk/MjoxO1xuICAgICAgICAvL+eIhueCuOS8pOWus1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfQnVsbGV0X0Jvb21fQ3JlYXRvcix7dHlwZTp0aGlzLmluaXREYXRhLnR5cGUsaWQ6dGhpcy5pbml0RGF0YS50YXJnZXRJZH0pO1xuICAgICAgICAvL+aAqueJqeWPl+S8pFxuICAgICAgICBsZXQgbW9uc2V0ck5hbWU6c3RyaW5nID0gdXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZytcIi1cIit1dGlsLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwrXCJfTW9uc3Rlcl9cIit0aGlzLmluaXREYXRhLnRhcmdldElkO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9CcnVpc2UrbW9uc2V0ck5hbWUse251bTp0aGlzLmluaXREYXRhLmF0ayxjcml0fSk7XG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==