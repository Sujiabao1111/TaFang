"use strict";
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