"use strict";
cc._RF.push(module, '52f0cs8k7xLQayGLWyfvRDd', 'monsterBox');
// Script/game/monsterBox.ts

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
var AStart_1 = require("../base/AStart");
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
//#region 怪兽 怪兽 怪兽 怪兽 怪兽
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var monsertBox = /** @class */ (function (_super) {
    __extends(monsertBox, _super);
    function monsertBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monsertPre = null;
        /**行走路线 */
        _this.walkData = { id: null, data: null };
        // private pool:pool; //对象池
        _this.isCome = false;
        return _this;
    }
    Object.defineProperty(monsertBox.prototype, "_userData", {
        get: function () {
            return util_1.default.userData;
        },
        enumerable: false,
        configurable: true
    });
    monsertBox.prototype.onLoad = function () {
        var _this = this;
        this.AStar = new AStart_1.default();
        // this.loadAny("prefab/monster/monster",cc.Prefab,(res)=>{
        //     this.pool = new pool(res);
        // });
        //监听销毁
        cc.game.on(NameTs_1.default.Game_Monster_Killed, function (res) {
            if (res.node) {
                util_1.default.levelMonsterNum--;
                if (res.coin > 0) {
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: res.node, value: res.coin, noMusic: true });
                    util_1.default.addTermCoin(res.coin);
                }
                // this.pool.onEnemyKilled(res.node);
                res.node.destroy();
                res.node.removeFromParent();
                res.node = null;
                // util.addCoin(res.coin);
                if (util_1.default.levelMonsterNum <= 0 && util_1.default.levelState == faceTs_1.gameState.start) {
                    console.log("打完了,准备加载下一关");
                    util_1.default.levelState = faceTs_1.gameState.end;
                    util_1.default.sendTurretData();
                    _this._userData.resistAttackTimes = 1;
                    util_1.default.getnowmapdata();
                    cc.game.emit(NameTs_1.default.Game_Task_Progress);
                    TrackMgr_1.default.AppGamedate({
                        is_challenge_suc: true,
                        game_level_hcdg: "第" + _this._userData.customs.big + "关",
                        level_hcdg: "第" + _this._userData.customs.small + "波",
                        game_time: util_1.default.gameTime.toFixed(1) + "s",
                        use_tool: String(util_1.default.gamePropNum),
                    });
                    if (util_1.default.saveCustomLevel()) {
                        cc.game.emit(NameTs_1.default.Game_End, faceTs_1.gamePass.success);
                    }
                    else {
                        cc.game.emit(NameTs_1.default.Game_End, faceTs_1.gamePass.smallSuccess);
                    }
                }
            }
        }, this);
        // 加载下一关
        cc.game.on(NameTs_1.default.Game_Load_Monster, function () {
            _this.loadNextMonster();
        }, this);
        // 重玩
        cc.game.on(NameTs_1.default.Game_Again, function () {
            _this.clearAllMonster();
            _this._userData.customs.small = (_this._userData.customs.small - 1 < 1) ? 1 : (_this._userData.customs.small - 1);
            console.log(_this._userData.customs.small, 'this._userData.customs.small');
            cc.game.emit(NameTs_1.default.Game_View_CustomsUpdata);
            _this.loadNextMonster();
        }, this);
    };
    /**
     * 初始化
     */
    monsertBox.prototype.init = function () {
        var _this = this;
        // 获取地图数据
        var mapData = util_1.default.GetCustomsMap();
        //初始化某些数据
        util_1.default.levelMonsterArr = [];
        util_1.default.levelMonsterNum = 0;
        util_1.default.MonsterMap.clear();
        /**行走路线 */
        this.AStar.init(mapData.map, mapData.xLen, mapData.yLen);
        this.AStar.FindPoint(function (res) {
            if (!res) {
                console.error("道路不通");
                return;
            }
            _this.walkData = { id: mapData.id, data: res };
            _this.loadMonster();
        });
    };
    monsertBox.prototype.start = function () {
    };
    /**
     * 加载当前关卡怪兽数据
    */
    monsertBox.prototype.loadMonster = function () {
        var _this = this;
        this.isCome = true;
        //拷贝一份防止属性串改
        var monsterData = Tools_1.Tools.deepClone(util_1.default.GetCustomsMonsterInfo());
        var monsterArr = monsterData;
        //将怪兽放进数组
        // for(let i = 0;i<monsterData.length;i++){
        //     let item = monsterData[i];
        //     for(let j = 0;j<item.num;j++){
        //         monsterArr.push({level:item.level,hp:item.hp});
        //     }
        // }
        //数组打乱
        // monsterArr = [100101,100102,100103,100104,100105,100106,100107,100108,100109,100110,100111,100112,100113,100114,100115,100116]
        // monsterArr = [100102]
        monsterArr = Tools_1.Tools.randomArr(monsterArr);
        //设置结束条件（怪兽的数量）
        util_1.default.levelMonsterNum = monsterArr.length;
        util_1.default.levelState = faceTs_1.gameState.start;
        var zIndex = monsterArr.length;
        for (var i = 0; i < monsterArr.length; i++) {
            var monster = util_1.default.GetMonsterIdData(monsterArr[i]);
            zIndex--;
            var isLast = (i == monsterArr.length - 1);
            this.createMonster(monster, i, zIndex, isLast);
        }
        this.scheduleOnce(function () {
            _this.isCome = false;
        }, 0.2);
    };
    /**
     * 创建怪兽
     * @param data 怪兽数据
     * @param id 第几个
     * @param zIndex 层级
     */
    monsertBox.prototype.createMonster = function (data, id, zIndex, isLast) {
        // this.pool.createEnemy(this.node,{data,walk:this.walkData.data,id});
        var item = cc.instantiate(this.monsertPre);
        item.getComponent(item.name).init({ data: data, walk: this.walkData.data, id: id, isLast: isLast });
        item.setParent(this.node);
        item.zIndex = zIndex;
    };
    /**
     * 加载下一关怪兽
     * @param id 地图id
     */
    monsertBox.prototype.loadNextMonster = function () {
        if (this.isCome)
            return;
        var mapData = util_1.default.GetCustomsMap();
        if (this.walkData.id && this.walkData.id == mapData.id) {
            this.loadMonster();
            return;
        }
        this.init();
    };
    /**
     * 清除所有
     */
    monsertBox.prototype.clearAllMonster = function () {
        cc.game.emit(NameTs_1.default.Game_Monster_clearAll);
    };
    __decorate([
        property({ displayName: "怪兽", type: cc.Prefab })
    ], monsertBox.prototype, "monsertPre", void 0);
    monsertBox = __decorate([
        ccclass
    ], monsertBox);
    return monsertBox;
}(baseTs_1.default));
exports.default = monsertBox;

cc._RF.pop();