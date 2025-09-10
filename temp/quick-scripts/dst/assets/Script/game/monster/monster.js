
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
var NameTs_1 = require("../../common/NameTs");
var Tools_1 = require("../../util/Tools");
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
        var randomNum = Tools_1.Tools.GetRandom(1, 16);
        if (randomNum == 4 || randomNum == 9 || randomNum == 14) {
            randomNum += 1;
        }
        var level = this.initData.level > 16 ? randomNum : this.initData.level;
        this.colorLevel = level;
        this.monsterData = util_1.default.GetMonsterData(this.colorLevel);
        this.walkNo = 0;
        this.walkArr = Tools_1.Tools.deepClone(data.walk);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxtb25zdGVyXFxtb25zdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6QywwQ0FBeUM7QUFDekMsd0NBQW1DO0FBQ25DLG9EQUErQztBQUV6QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFxQywyQkFBYztJQUFuRDtRQUVJLG9EQUFvRDtRQUNwRCw2QkFBNkI7UUFIakMscUVBMEpDO1FBckpHLDZDQUE2QztRQUM3Qyw4QkFBOEI7UUFHOUIsa0JBQVksR0FBZ0MsSUFBSSxDQUFDOztRQXNJakQsYUFBYTtRQUNiLGVBQWU7UUFDZixpREFBaUQ7UUFDakQsSUFBSTtRQUVKLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsa0RBQWtEO1FBQ2xELElBQUk7UUFFSixpQkFBaUI7SUFDckIsQ0FBQztJQTFJRyx1QkFBSyxHQUFMO0lBSUEsQ0FBQztJQUlEOztPQUVHO0lBQ0gsMEJBQVEsR0FBUjtJQUlBLENBQUM7SUFFRCxzQkFBSSxHQUFKLFVBQUssSUFBSTtRQUFULGlCQXVDQztRQXRDRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBVyxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLFNBQVMsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksRUFBRSxFQUFFO1lBQ3JELFNBQVMsSUFBSSxDQUFDLENBQUM7U0FDbEI7UUFDRCxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FB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RSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCw2QkFBVyxHQUFYO1FBQ0ksa0NBQWtDO1FBRWxDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDekMsQ0FBQztJQXBJRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQztpREFDcEI7SUFUaEMsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTBKM0I7SUFBRCxjQUFDO0NBMUpELEFBMEpDLENBMUpvQyx3QkFBYyxHQTBKbEQ7a0JBMUpvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi4vLi4vdXRpbC9Ub29sc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uLy4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IG1vbnN0ZXJGYWN0b3J5IGZyb20gXCIuLi9tb25zdGVyRmFjdG9yeVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbW9uc3RlciBleHRlbmRzIG1vbnN0ZXJGYWN0b3J5IHtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Qcm9ncmVzc0JhcixkaXNwbGF5TmFtZTpcIuihgOadoVwifSlcbiAgICAvLyBocDogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlhrDlhrtcIn0pXG4gICAgLy8gRnJvemVuTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXksIGRpc3BsYXlOYW1lOiBcIuaAquWFveWbvueJh1wiIH0pXG4gICAgbW9uc3RlclNwaW5lOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlvbHlrZBcIn0pXG4gICAgLy8gc2hhZG93Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBpbml0RGF0YTsvL+WIneWni+WMluaVsOaNrlxuXG4gICAgc3RhcnQoKSB7XG5cblxuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIOaUu+WHu1xuICAgICAqL1xuICAgIGF0dGFja0ZuKCkge1xuXG5cblxuICAgIH1cblxuICAgIGluaXQoZGF0YSkge1xuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YS5kYXRhO1xuXG4gICAgICAgIHRoaXMubW9uc3RlclNwaW5lLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgbGV0IHJhbmRvbU51bTogbnVtYmVyID0gVG9vbHMuR2V0UmFuZG9tKDEsIDE2KTtcbiAgICAgICAgaWYgKHJhbmRvbU51bSA9PSA0IHx8IHJhbmRvbU51bSA9PSA5IHx8IHJhbmRvbU51bSA9PSAxNCkge1xuICAgICAgICAgICAgcmFuZG9tTnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxldmVsOiBudW1iZXIgPSB0aGlzLmluaXREYXRhLmxldmVsID4gMTYgPyByYW5kb21OdW0gOiB0aGlzLmluaXREYXRhLmxldmVsO1xuICAgICAgICB0aGlzLmNvbG9yTGV2ZWwgPSBsZXZlbDtcblxuICAgICAgICB0aGlzLm1vbnN0ZXJEYXRhID0gdXRpbC5HZXRNb25zdGVyRGF0YSh0aGlzLmNvbG9yTGV2ZWwpO1xuICAgICAgICB0aGlzLndhbGtObyA9IDA7XG4gICAgICAgIHRoaXMud2Fsa0FyciA9IFRvb2xzLmRlZXBDbG9uZShkYXRhLndhbGspO1xuICAgICAgICAvL+WIneWni+S9jee9rlxuICAgICAgICB0aGlzLmluaXRQb3MgPSBjYy5WZWMyLmNsb25lKHV0aWwuR2V0TWFwUG9zKHRoaXMud2Fsa0Fyclt0aGlzLndhbGtOb10ueSwgdGhpcy53YWxrQXJyW3RoaXMud2Fsa05vXS54KSk7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLmluaXRQb3MpO1xuICAgICAgICB0aGlzLnNldE5hbWUoKTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3BpbmUubm9kZS5zY2FsZSA9IDA7XG4gICAgICAgIC8v6buY6K6k5Y+Y5bCPXG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgICAgICAvL+iuvue9ruihgOmHj1xuICAgICAgICB0aGlzLm1vbnN0ZXJIcCA9IE51bWJlcih0aGlzLmluaXREYXRhLmhwKTtcbiAgICAgICAgLyoq5YKo5a2Y5oCq54mp55qEbm9kZSAqL1xuICAgICAgICB0aGlzLm1vbnNldHJOYW1lID0gdXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZyArIFwiLVwiICsgdXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsICsgXCJfTW9uc3Rlcl9cIiArIHRoaXMuaWQ7XG4gICAgICAgIHV0aWwuTW9uc3Rlck1hcC5zZXQodGhpcy5tb25zZXRyTmFtZSwgdGhpcy5ub2RlKTtcbiAgICAgICAgLyoq5Yid5aeL5YyW5Yaw5Ya75pWI5p6cICovXG4gICAgICAgIHRoaXMuaXNGcm96ZW4gPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5Gcm96ZW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNsb3NlRnJvemVuKCk7XG4gICAgICAgIC8qKuWIneWni+WMluaKpOe9qeaViOaenCAqL1xuICAgICAgICB0aGlzLmlzU2hpZWxkID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuc2hhZG93Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFydEFuaSgpO1xuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZSA9IHRoaXMubW9uc3RlclNwaW5lO1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTW9uc3Rlcl9CcnVpc2UgKyB0aGlzLm1vbnNldHJOYW1lLCAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJCcnVpc2UocmVzLm51bSwgcmVzLmNyaXQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7lkI3lrZdcbiAgICAgKi9cbiAgICBzZXROYW1lKCkge1xuICAgICAgICAvLyB0aGlzLmxvYWRTcHJpdGUoKHJlcyk9PntcbiAgICAgICAgLy8gICAgIHRoaXMubW9uc3RlclBpY05vZGUuc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHRoaXMubG9hZFNwaW5lKCk7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICog5Ye65Y6C5Yqo55S7XG4gICAgICovXG4gICAgc3RhcnRBbmkoKSB7XG5cbiAgICAgICAgLy/lgZzmraLmj5DliY3nmoTliqjnlLtcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMubW9uc3RlclNwaW5lLm5vZGUueSA9IE51bWJlcih0aGlzLm1vbnN0ZXJEYXRhLnkpO1xuICAgICAgICBjYy50d2Vlbih0aGlzLm1vbnN0ZXJTcGluZS5ub2RlKS5kZWxheSh0aGlzLmlkKS50byguMywgeyBzY2FsZTogTnVtYmVyKHRoaXMubW9uc3RlckRhdGEuc2NhbGUpIH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfSHBfQ3JlYXRlciwgeyBpZDogdGhpcy5pZCB9KTtcbiAgICAgICAgICAgIHRoaXMud2FsaygpO1xuICAgICAgICAgICAgLy8gdGhpcy5zaGFkb3dOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9TaGFkb3dfQ3JlYXRlciwgeyBpZDogdGhpcy5pZCB9KTtcbiAgICAgICAgfSkuc3RhcnQoKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5q275Lqh5Yqo55S7XG4gICAgICovXG4gICAgZGllQW5pKGNhbGwpIHtcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubW9uc3RlclNwaW5lLm5vZGUpLnRvKC4zLCB7IHNjYWxlOiAwIH0pLmNhbGwoKCkgPT4geyBjYWxsKCkgfSkuc3RhcnQoKTtcbiAgICB9XG5cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIOiuvue9ruihgOadoVxuICAgIC8vICAqIEBwYXJhbSBudW0g6KGA5p2hXG4gICAgLy8gICovXG4gICAgLy8gc2V0SHAobnVtOm51bWJlcil7XG4gICAgLy8gICAgIHRoaXMuaHAubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgIC8vICAgICB0aGlzLmhwLnByb2dyZXNzID0gbnVtO1xuXG4gICAgLy8gfVxuICAgIC8qKlxuICAgICAqIOW8gOWQr+WGsOWGu1xuICAgICAqL1xuICAgIG9wZW5Gcm96ZW4oKSB7XG4gICAgICAgIC8vIHRoaXMuRnJvemVuTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5ub2RlLmNvbG9yID0gY2MuY29sb3IoMTEsIDE5MCwgMjU1LCAyNTUpO1xuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5ub2RlLm9wYWNpdHkgPSAxNzg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6Zet5Yaw5Ya7XG4gICAgICovXG4gICAgY2xvc2VGcm96ZW4oKSB7XG4gICAgICAgIC8vIHRoaXMuRnJvemVuTm9kZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm1vbnN0ZXJTcGluZS5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3BpbmUubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgIH1cblxuICAgIC8vICAvKirmmoLlgZzotbAgKi9cbiAgICAvLyAgc3RvcFdhbGsoKXtcbiAgICAvLyAgICAgdGhpcy5tb25zdGVyU3ByaXRlLm5vZGUucGF1c2VBbGxBY3Rpb25zKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gLyoq57un57ut6LWwICovXG4gICAgLy8gcmVzdW1lV2Fsaygpe1xuICAgIC8vICAgICB0aGlzLm1vbnN0ZXJTcHJpdGUubm9kZS5yZXN1bWVBbGxBY3Rpb25zKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==