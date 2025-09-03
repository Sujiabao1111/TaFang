
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/monster/monster.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a8103bjkxFIqZn4VUhkhv1x', 'monster');
// Script/game/monster/monster.ts

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
var tool_1 = require("../../util/tool");
var util_1 = require("../../util/util");
var monsterFactory_1 = require("../monsterFactory");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var monster = /** @class */ (function (_super) {
    __extends(monster, _super);
    function monster() {
        // @property({type:cc.ProgressBar,displayName:"血条"})
        // hp: cc.ProgressBar = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property({type:cc.Node,displayName:"冰冻"})
        // FrozenNode: cc.Node = null;
        _this.monsterSpine = null;
        return _this;
        //  /**暂停走 */
        //  stopWalk(){
        //     this.monsterSprite.node.pauseAllActions();
        // }
        // /**继续走 */
        // resumeWalk(){
        //     this.monsterSprite.node.resumeAllActions();
        // }
        // update (dt) {}
    }
    monster.prototype.start = function () {
    };
    /**
     * 攻击
     */
    monster.prototype.attackFn = function () {
    };
    monster.prototype.init = function (data) {
        var _this = this;
        this.initData = data.data;
        this.monsterSpine.node.opacity = 255;
        var randomNum = tool_1.default.GetRandom(1, 16);
        if (randomNum == 4 || randomNum == 9 || randomNum == 14) {
            randomNum += 1;
        }
        var level = this.initData.level > 16 ? randomNum : this.initData.level;
        this.colorLevel = level;
        this.monsterData = util_1.default.GetMonsterData(this.colorLevel);
        this.walkNo = 0;
        this.walkArr = tool_1.default.deepClone(data.walk);
        //初始位置
        this.initPos = cc.Vec2.clone(util_1.default.GetMapPos(this.walkArr[this.walkNo].y, this.walkArr[this.walkNo].x));
        this.node.setPosition(this.initPos);
        this.setName();
        this.monsterSpine.node.scale = 0;
        //默认变小
        this.id = data.id;
        //设置血量
        this.monsterHp = Number(this.initData.hp);
        /**储存怪物的node */
        this.monsetrName = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + this.id;
        util_1.default.MonsterMap.set(this.monsetrName, this.node);
        /**初始化冰冻效果 */
        this.isFrozen = false;
        // this.FrozenNode.active = false;
        this.closeFrozen();
        /**初始化护罩效果 */
        this.isShield = false;
        // this.shadowNode.active = false;
        this.startAni();
        this.monsterSpine = this.monsterSpine;
        cc.game.on(NameTs_1.default.Game_Monster_Bruise + this.monsetrName, function (res) {
            _this.monsterBruise(res.num, res.crit);
        }, this);
    };
    /**
     * 设置名字
     */
    monster.prototype.setName = function () {
        // this.loadSprite((res)=>{
        //     this.monsterPicNode.spriteFrame = res;
        // });
        this.loadSpine();
    };
    /**
     * 出厂动画
     */
    monster.prototype.startAni = function () {
        var _this = this;
        //停止提前的动画
        this.node.stopAllActions();
        this.monsterSpine.node.y = Number(this.monsterData.y);
        cc.tween(this.monsterSpine.node).delay(this.id).to(.3, { scale: Number(this.monsterData.scale) }).call(function () {
            cc.game.emit(NameTs_1.default.Game_Monster_Hp_Creater, { id: _this.id });
            _this.walk();
            // this.shadowNode.active = true;
            cc.game.emit(NameTs_1.default.Game_Monster_Shadow_Creater, { id: _this.id });
        }).start();
    };
    /**
     * 死亡动画
     */
    monster.prototype.dieAni = function (call) {
        this.node.stopAllActions();
        cc.tween(this.monsterSpine.node).to(.3, { scale: 0 }).call(function () { call(); }).start();
    };
    // /**
    //  * 设置血条
    //  * @param num 血条
    //  */
    // setHp(num:number){
    //     this.hp.node.opacity = 255;
    //     this.hp.progress = num;
    // }
    /**
     * 开启冰冻
     */
    monster.prototype.openFrozen = function () {
        // this.FrozenNode.active = true;
        this.monsterSpine.node.color = cc.color(11, 190, 255, 255);
        this.monsterSpine.node.opacity = 178;
    };
    /**
     * 关闭冰冻
     */
    monster.prototype.closeFrozen = function () {
        // this.FrozenNode.active = false;
        this.monsterSpine.node.color = cc.color(255, 255, 255, 255);
        this.monsterSpine.node.opacity = 255;
    };
    __decorate([
        property({ type: dragonBones.ArmatureDisplay, displayName: "怪兽图片" })
    ], monster.prototype, "monsterSpine", void 0);
    monster = __decorate([
        ccclass
    ], monster);
    return monster;
}(monsterFactory_1.default));
exports.default = monster;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxtb25zdGVyXFxtb25zdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6Qyx3Q0FBbUM7QUFDbkMsd0NBQW1DO0FBQ25DLG9EQUErQztBQUV6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBYztJQUFuRDtRQUVJLG9EQUFvRDtRQUNwRCw2QkFBNkI7UUFIakMscUVBMEpDO1FBckpHLDZDQUE2QztRQUM3Qyw4QkFBOEI7UUFHOUIsa0JBQVksR0FBK0IsSUFBSSxDQUFDOztRQXNJaEQsYUFBYTtRQUNiLGVBQWU7UUFDZixpREFBaUQ7UUFDakQsSUFBSTtRQUVKLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsa0RBQWtEO1FBQ2xELElBQUk7UUFFSixpQkFBaUI7SUFDckIsQ0FBQztJQTFJRyx1QkFBSyxHQUFMO0lBSUEsQ0FBQztJQUlEOztPQUVHO0lBQ0gsMEJBQVEsR0FBUjtJQUlBLENBQUM7SUFFRCxzQkFBSSxHQUFKLFVBQUssSUFBSTtRQUFULGlCQXVDQztRQXRDRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBVyxjQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFHLFNBQVMsSUFBRSxDQUFDLElBQUUsU0FBUyxJQUFFLENBQUMsSUFBRSxTQUFTLElBQUUsRUFBRSxFQUFDO1lBQ3pDLFNBQVMsSUFBSSxDQUFDLENBQUM7U0FDbEI7UUFDRCxJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FB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QyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCw2QkFBVyxHQUFYO1FBQ0ksa0NBQWtDO1FBRWxDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDekMsQ0FBQztJQXBJRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxXQUFXLENBQUMsZUFBZSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQztpREFDaEI7SUFUL0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTBKM0I7SUFBRCxjQUFDO0NBMUpELEFBMEpDLENBMUpvQyx3QkFBYyxHQTBKbEQ7a0JBMUpvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4uLy4uL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uLy4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IG1vbnN0ZXJGYWN0b3J5IGZyb20gXCIuLi9tb25zdGVyRmFjdG9yeVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1vbnN0ZXIgZXh0ZW5kcyBtb25zdGVyRmFjdG9yeSB7XG4gICAgXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLlByb2dyZXNzQmFyLGRpc3BsYXlOYW1lOlwi6KGA5p2hXCJ9KVxuICAgIC8vIGhwOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWGsOWGu1wifSlcbiAgICAvLyBGcm96ZW5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6ZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5LGRpc3BsYXlOYW1lOlwi5oCq5YW95Zu+54mHXCJ9KVxuICAgIG1vbnN0ZXJTcGluZTpkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xuICAgIFxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5b2x5a2QXCJ9KVxuICAgIC8vIHNoYWRvd05vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIGluaXREYXRhOy8v5Yid5aeL5YyW5pWw5o2uXG5cbiAgICBzdGFydCAoKSB7XG5cblxuICAgICAgICBcbiAgICB9XG4gICAgICAgIFxuXG5cbiAgICAvKipcbiAgICAgKiDmlLvlh7tcbiAgICAgKi9cbiAgICBhdHRhY2tGbigpe1xuXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgaW5pdChkYXRhKXtcbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IGRhdGEuZGF0YTtcblxuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIGxldCByYW5kb21OdW06bnVtYmVyICA9IHRvb2wuR2V0UmFuZG9tKDEsMTYpO1xuICAgICAgICBpZihyYW5kb21OdW09PTR8fHJhbmRvbU51bT09OXx8cmFuZG9tTnVtPT0xNCl7XG4gICAgICAgICAgICByYW5kb21OdW0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGV2ZWw6bnVtYmVyID0gdGhpcy5pbml0RGF0YS5sZXZlbD4xNj9yYW5kb21OdW06dGhpcy5pbml0RGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5jb2xvckxldmVsID0gbGV2ZWw7XG5cbiAgICAgICAgdGhpcy5tb25zdGVyRGF0YSA9IHV0aWwuR2V0TW9uc3RlckRhdGEodGhpcy5jb2xvckxldmVsKTtcbiAgICAgICAgdGhpcy53YWxrTm8gPSAwO1xuICAgICAgICB0aGlzLndhbGtBcnIgPSB0b29sLmRlZXBDbG9uZShkYXRhLndhbGspO1xuICAgICAgICAvL+WIneWni+S9jee9rlxuICAgICAgICB0aGlzLmluaXRQb3M9IGNjLlZlYzIuY2xvbmUodXRpbC5HZXRNYXBQb3ModGhpcy53YWxrQXJyW3RoaXMud2Fsa05vXS55LHRoaXMud2Fsa0Fyclt0aGlzLndhbGtOb10ueCkpO1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5pbml0UG9zKTtcbiAgICAgICAgdGhpcy5zZXROYW1lKCk7XG4gICAgICAgIHRoaXMubW9uc3RlclNwaW5lLm5vZGUuc2NhbGUgPSAwO1xuICAgICAgICAvL+m7mOiupOWPmOWwj1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICAgICAgLy/orr7nva7ooYDph49cbiAgICAgICAgdGhpcy5tb25zdGVySHAgPSBOdW1iZXIodGhpcy5pbml0RGF0YS5ocCk7XG4gICAgICAgIC8qKuWCqOWtmOaAqueJqeeahG5vZGUgKi9cbiAgICAgICAgdGhpcy5tb25zZXRyTmFtZSA9IHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcrXCItXCIrdXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsK1wiX01vbnN0ZXJfXCIrdGhpcy5pZDtcbiAgICAgICAgdXRpbC5Nb25zdGVyTWFwLnNldCh0aGlzLm1vbnNldHJOYW1lLHRoaXMubm9kZSk7XG4gICAgICAgIC8qKuWIneWni+WMluWGsOWGu+aViOaenCAqL1xuICAgICAgICB0aGlzLmlzRnJvemVuID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuRnJvemVuTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbG9zZUZyb3plbigpO1xuICAgICAgICAvKirliJ3lp4vljJbmiqTnvanmlYjmnpwgKi9cbiAgICAgICAgdGhpcy5pc1NoaWVsZCA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLnNoYWRvd05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhcnRBbmkoKTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3BpbmUgPSB0aGlzLm1vbnN0ZXJTcGluZTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX01vbnN0ZXJfQnJ1aXNlK3RoaXMubW9uc2V0ck5hbWUsKHJlcyk9PntcbiAgICAgICAgICAgIHRoaXMubW9uc3RlckJydWlzZShyZXMubnVtLHJlcy5jcml0KTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7lkI3lrZdcbiAgICAgKi9cbiAgICBzZXROYW1lKCl7XG4gICAgICAgIC8vIHRoaXMubG9hZFNwcml0ZSgocmVzKT0+e1xuICAgICAgICAvLyAgICAgdGhpcy5tb25zdGVyUGljTm9kZS5zcHJpdGVGcmFtZSA9IHJlcztcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkU3BpbmUoKTtcblxuICAgIH1cblxuICAgIFxuXG4gICAgLyoqXG4gICAgICog5Ye65Y6C5Yqo55S7XG4gICAgICovXG4gICAgc3RhcnRBbmkoKXtcblxuICAgICAgICAvL+WBnOatouaPkOWJjeeahOWKqOeUu1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3BpbmUubm9kZS55ID0gTnVtYmVyKHRoaXMubW9uc3RlckRhdGEueSk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubW9uc3RlclNwaW5lLm5vZGUpLmRlbGF5KHRoaXMuaWQpLnRvKC4zLHtzY2FsZTpOdW1iZXIodGhpcy5tb25zdGVyRGF0YS5zY2FsZSl9KS5jYWxsKCgpPT57XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9IcF9DcmVhdGVyLHtpZDp0aGlzLmlkfSk7XG4gICAgICAgICAgICB0aGlzLndhbGsoKTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2hhZG93Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfU2hhZG93X0NyZWF0ZXIse2lkOnRoaXMuaWR9KTtcbiAgICAgICAgfSkuc3RhcnQoKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5q275Lqh5Yqo55S7XG4gICAgICovXG4gICAgZGllQW5pKGNhbGwpeyAgICAgICAgXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICBjYy50d2Vlbih0aGlzLm1vbnN0ZXJTcGluZS5ub2RlKS50byguMyx7c2NhbGU6MH0pLmNhbGwoKCk9PntjYWxsKCl9KS5zdGFydCgpO1xuICAgIH1cbiAgICBcblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiuvue9ruihgOadoVxuICAgIC8vICAqIEBwYXJhbSBudW0g6KGA5p2hXG4gICAgLy8gICovXG4gICAgLy8gc2V0SHAobnVtOm51bWJlcil7XG4gICAgLy8gICAgIHRoaXMuaHAubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgIC8vICAgICB0aGlzLmhwLnByb2dyZXNzID0gbnVtO1xuXG4gICAgLy8gfVxuICAgIC8qKlxuICAgICAqIOW8gOWQr+WGsOWGu1xuICAgICAqL1xuICAgIG9wZW5Gcm96ZW4oKXtcbiAgICAgICAgLy8gdGhpcy5Gcm96ZW5Ob2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubW9uc3RlclNwaW5lLm5vZGUuY29sb3IgPSBjYy5jb2xvcigxMSwxOTAsMjU1LDI1NSk7XG4gICAgICAgIHRoaXMubW9uc3RlclNwaW5lLm5vZGUub3BhY2l0eSA9IDE3ODtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63lhrDlhrtcbiAgICAgKi9cbiAgICBjbG9zZUZyb3plbigpe1xuICAgICAgICAvLyB0aGlzLkZyb3plbk5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUsMjU1KTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3BpbmUubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgIH1cblxuICAgIC8vICAvKirmmoLlgZzotbAgKi9cbiAgICAvLyAgc3RvcFdhbGsoKXtcbiAgICAvLyAgICAgdGhpcy5tb25zdGVyU3ByaXRlLm5vZGUucGF1c2VBbGxBY3Rpb25zKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoq57un57ut6LWwICovXG4gICAgLy8gcmVzdW1lV2Fsaygpe1xuICAgIC8vICAgICB0aGlzLm1vbnN0ZXJTcHJpdGUubm9kZS5yZXN1bWVBbGxBY3Rpb25zKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==