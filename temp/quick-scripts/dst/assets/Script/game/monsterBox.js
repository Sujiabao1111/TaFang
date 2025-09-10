
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/monsterBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                        // this.showPage(pageTs.pageName.GameStart);
                        cc.game.emit(NameTs_1.default.Game_Start);
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
            this.createMonster(monster, i, zIndex);
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
    monsertBox.prototype.createMonster = function (data, id, zIndex) {
        // this.pool.createEnemy(this.node,{data,walk:this.walkData.data,id});
        var item = cc.instantiate(this.monsertPre);
        item.getComponent(item.name).init({ data: data, walk: this.walkData.data, id: id });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxtb25zdGVyQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtQztBQUNuQyx5Q0FBb0M7QUFDcEMsMkNBQW9FO0FBQ3BFLDJDQUFzQztBQU10QyxpREFBNEM7QUFDNUMsdUNBQXNDO0FBQ3RDLHFDQUFnQztBQUdoQyx3QkFBd0I7QUFFbEIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQU07SUFBOUM7UUFBQSxxRUErTEM7UUEzTFcsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFNckMsVUFBVTtRQUNGLGNBQVEsR0FBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRWpELDJCQUEyQjtRQUduQixZQUFNLEdBQVksS0FBSyxDQUFDOztJQStLcEMsQ0FBQztJQTdLRyxzQkFBVyxpQ0FBUzthQUFwQjtZQUNJLE9BQU8sY0FBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELDJCQUFNLEdBQU47UUFBQSxpQkE2REM7UUEzREcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGdCQUFLLEVBQUUsQ0FBQztRQUV6QiwyREFBMkQ7UUFDM0QsaUNBQWlDO1FBQ2pDLE1BQU07UUFHTixNQUFNO1FBQ04sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxtQkFBbUIsRUFBRSxVQUFBLEdBQUc7WUFDdEMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNWLGNBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtvQkFDZCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGdC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QUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFHRDs7O09BR0c7SUFDSCxvQ0FBZSxHQUFmO1FBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDeEIsSUFBSSxPQUFPLEdBQUcsY0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNILG9DQUFlLEdBQWY7UUFDSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQXhMRDtRQURDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztrREFDWjtJQUpwQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBK0w5QjtJQUFELGlCQUFDO0NBL0xELEFBK0xDLENBL0x1QyxnQkFBTSxHQStMN0M7a0JBL0xvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFTdGFyIGZyb20gXCIuLi9iYXNlL0FTdGFydFwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IGdhbWVQYXNzLCBnYW1lU3RhdGUsIG1vbnN0ZXJJbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBwb29sIGZyb20gXCIuLi9jb21tb24vcG9vbFwiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9kYXRhL3VzZXJEYXRhXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi91dGlsL1Rvb2xzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cblxuLy8jcmVnaW9uIOaAquWFvSDmgKrlhb0g5oCq5YW9IOaAquWFvSDmgKrlhb1cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1vbnNlcnRCb3ggZXh0ZW5kcyBiYXNlVHMge1xuXG5cbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLmgKrlhb1cIiwgdHlwZTogY2MuUHJlZmFiIH0pXG4gICAgcHJpdmF0ZSBtb25zZXJ0UHJlOiBjYy5QcmVmYWIgPSBudWxsO1xuXG5cbiAgICAvKirlr7vot6/nrpfms5UgKi9cbiAgICBwcml2YXRlIEFTdGFyOiBBU3RhcjtcblxuICAgIC8qKuihjOi1sOi3r+e6vyAqL1xuICAgIHByaXZhdGUgd2Fsa0RhdGE6IGFueSA9IHsgaWQ6IG51bGwsIGRhdGE6IG51bGwgfTtcblxuICAgIC8vIHByaXZhdGUgcG9vbDpwb29sOyAvL+WvueixoeaxoFxuXG5cbiAgICBwcml2YXRlIGlzQ29tZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGdldCBfdXNlckRhdGEoKTogVXNlckRhdGEge1xuICAgICAgICByZXR1cm4gdXRpbC51c2VyRGF0YTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgdGhpcy5BU3RhciA9IG5ldyBBU3RhcigpO1xuXG4gICAgICAgIC8vIHRoaXMubG9hZEFueShcInByZWZhYi9tb25zdGVyL21vbnN0ZXJcIixjYy5QcmVmYWIsKHJlcyk9PntcbiAgICAgICAgLy8gICAgIHRoaXMucG9vbCA9IG5ldyBwb29sKHJlcyk7XG4gICAgICAgIC8vIH0pO1xuXG5cbiAgICAgICAgLy/nm5HlkKzplIDmr4FcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Nb25zdGVyX0tpbGxlZCwgcmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMubm9kZSkge1xuICAgICAgICAgICAgICAgIHV0aWwubGV2ZWxNb25zdGVyTnVtLS07XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2luID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogcmVzLm5vZGUsIHZhbHVlOiByZXMuY29pbiwgbm9NdXNpYzogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbihyZXMuY29pbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHRoaXMucG9vbC5vbkVuZW15S2lsbGVkKHJlcy5ub2RlKTtcbiAgICAgICAgICAgICAgICByZXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgcmVzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgICAgIHJlcy5ub2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyB1dGlsLmFkZENvaW4ocmVzLmNvaW4pO1xuICAgICAgICAgICAgICAgIGlmICh1dGlsLmxldmVsTW9uc3Rlck51bSA8PSAwICYmIHV0aWwubGV2ZWxTdGF0ZSA9PSBnYW1lU3RhdGUuc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiZPlrozkuoYs5YeG5aSH5Yqg6L295LiL5LiA5YWzXCIpO1xuICAgICAgICAgICAgICAgICAgICB1dGlsLmxldmVsU3RhdGUgPSBnYW1lU3RhdGUuZW5kO1xuICAgICAgICAgICAgICAgICAgICB1dGlsLnNlbmRUdXJyZXREYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJEYXRhLnJlc2lzdEF0dGFja1RpbWVzID0gMTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5nZXRub3dtYXBkYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UYXNrX1Byb2dyZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwR2FtZWRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNfY2hhbGxlbmdlX3N1YzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVfbGV2ZWxfaGNkZzogXCLnrKxcIiArIHRoaXMuX3VzZXJEYXRhLmN1c3RvbXMuYmlnICsgXCLlhbNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsX2hjZGc6IFwi56ysXCIgKyB0aGlzLl91c2VyRGF0YS5jdXN0b21zLnNtYWxsICsgXCLms6JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVfdGltZTogdXRpbC5nYW1lVGltZS50b0ZpeGVkKDEpICsgXCJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VfdG9vbDogU3RyaW5nKHV0aWwuZ2FtZVByb3BOdW0pLFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbC5zYXZlQ3VzdG9tTGV2ZWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VuZCwgZ2FtZVBhc3Muc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1N0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy8g5Yqg6L295LiL5LiA5YWzXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTG9hZF9Nb25zdGVyLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWROZXh0TW9uc3RlcigpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvLyDph43njqlcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9BZ2FpbiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhckFsbE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJEYXRhLmN1c3RvbXMuc21hbGwgPSAodGhpcy5fdXNlckRhdGEuY3VzdG9tcy5zbWFsbCAtIDEgPCAxKSA/IDEgOiAodGhpcy5fdXNlckRhdGEuY3VzdG9tcy5zbWFsbCAtIDEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fdXNlckRhdGEuY3VzdG9tcy5zbWFsbCwgJ3RoaXMuX3VzZXJEYXRhLmN1c3RvbXMuc21hbGwnKVxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1ZpZXdfQ3VzdG9tc1VwZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmxvYWROZXh0TW9uc3RlcigpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMllxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIOiOt+WPluWcsOWbvuaVsOaNrlxuICAgICAgICBsZXQgbWFwRGF0YSA9IHV0aWwuR2V0Q3VzdG9tc01hcCgpO1xuICAgICAgICAvL+WIneWni+WMluafkOS6m+aVsOaNrlxuICAgICAgICB1dGlsLmxldmVsTW9uc3RlckFyciA9IFtdO1xuICAgICAgICB1dGlsLmxldmVsTW9uc3Rlck51bSA9IDA7XG4gICAgICAgIHV0aWwuTW9uc3Rlck1hcC5jbGVhcigpO1xuXG4gICAgICAgIC8qKuihjOi1sOi3r+e6vyAqL1xuICAgICAgICB0aGlzLkFTdGFyLmluaXQobWFwRGF0YS5tYXAsIG1hcERhdGEueExlbiwgbWFwRGF0YS55TGVuKTtcbiAgICAgICAgdGhpcy5BU3Rhci5GaW5kUG9pbnQocmVzID0+IHtcbiAgICAgICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIumBk+i3r+S4jemAmlwiKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud2Fsa0RhdGEgPSB7IGlkOiBtYXBEYXRhLmlkLCBkYXRhOiByZXMgfTtcbiAgICAgICAgICAgIHRoaXMubG9hZE1vbnN0ZXIoKTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295b2T5YmN5YWz5Y2h5oCq5YW95pWw5o2uXG4gICAgKi9cbiAgICBsb2FkTW9uc3RlcigpIHtcbiAgICAgICAgdGhpcy5pc0NvbWUgPSB0cnVlO1xuXG4gICAgICAgIC8v5ou36LSd5LiA5Lu96Ziy5q2i5bGe5oCn5Liy5pS5XG4gICAgICAgIGxldCBtb25zdGVyRGF0YSA9IFRvb2xzLmRlZXBDbG9uZSh1dGlsLkdldEN1c3RvbXNNb25zdGVySW5mbygpKTtcblxuICAgICAgICBsZXQgbW9uc3RlckFycjogYW55W10gPSBtb25zdGVyRGF0YTtcbiAgICAgICAgLy/lsIbmgKrlhb3mlL7ov5vmlbDnu4RcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDtpPG1vbnN0ZXJEYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgbGV0IGl0ZW0gPSBtb25zdGVyRGF0YVtpXTtcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaiA9IDA7ajxpdGVtLm51bTtqKyspe1xuICAgICAgICAvLyAgICAgICAgIG1vbnN0ZXJBcnIucHVzaCh7bGV2ZWw6aXRlbS5sZXZlbCxocDppdGVtLmhwfSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy/mlbDnu4TmiZPkubFcblxuICAgICAgICAvLyBtb25zdGVyQXJyID0gWzEwMDEwMSwxMDAxMDIsMTAwMTAzLDEwMDEwNCwxMDAxMDUsMTAwMTA2LDEwMDEwNywxMDAxMDgsMTAwMTA5LDEwMDExMCwxMDAxMTEsMTAwMTEyLDEwMDExMywxMDAxMTQsMTAwMTE1LDEwMDExNl1cbiAgICAgICAgLy8gbW9uc3RlckFyciA9IFsxMDAxMDJdXG5cblxuXG4gICAgICAgIG1vbnN0ZXJBcnIgPSBUb29scy5yYW5kb21BcnIobW9uc3RlckFycik7XG4gICAgICAgIC8v6K6+572u57uT5p2f5p2h5Lu277yI5oCq5YW955qE5pWw6YeP77yJXG4gICAgICAgIHV0aWwubGV2ZWxNb25zdGVyTnVtID0gbW9uc3RlckFyci5sZW5ndGg7XG4gICAgICAgIHV0aWwubGV2ZWxTdGF0ZSA9IGdhbWVTdGF0ZS5zdGFydDtcbiAgICAgICAgbGV0IHpJbmRleDogbnVtYmVyID0gbW9uc3RlckFyci5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9uc3RlckFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG1vbnN0ZXI6IG1vbnN0ZXJJbmZvID0gdXRpbC5HZXRNb25zdGVySWREYXRhKG1vbnN0ZXJBcnJbaV0pO1xuICAgICAgICAgICAgekluZGV4LS07XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnN0ZXIobW9uc3RlciwgaSwgekluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNDb21lID0gZmFsc2U7XG4gICAgICAgIH0sIDAuMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65oCq5YW9XG4gICAgICogQHBhcmFtIGRhdGEg5oCq5YW95pWw5o2uXG4gICAgICogQHBhcmFtIGlkIOesrOWHoOS4qlxuICAgICAqIEBwYXJhbSB6SW5kZXgg5bGC57qnXG4gICAgICovXG4gICAgY3JlYXRlTW9uc3RlcihkYXRhOiBtb25zdGVySW5mbywgaWQ6IG51bWJlciwgekluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgLy8gdGhpcy5wb29sLmNyZWF0ZUVuZW15KHRoaXMubm9kZSx7ZGF0YSx3YWxrOnRoaXMud2Fsa0RhdGEuZGF0YSxpZH0pO1xuICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubW9uc2VydFByZSk7XG4gICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGl0ZW0ubmFtZSkuaW5pdCh7IGRhdGEsIHdhbGs6IHRoaXMud2Fsa0RhdGEuZGF0YSwgaWQgfSk7XG4gICAgICAgIGl0ZW0uc2V0UGFyZW50KHRoaXMubm9kZSk7XG4gICAgICAgIGl0ZW0uekluZGV4ID0gekluZGV4O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295LiL5LiA5YWz5oCq5YW9XG4gICAgICogQHBhcmFtIGlkIOWcsOWbvmlkXG4gICAgICovXG4gICAgbG9hZE5leHRNb25zdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5pc0NvbWUpIHJldHVybjtcbiAgICAgICAgbGV0IG1hcERhdGEgPSB1dGlsLkdldEN1c3RvbXNNYXAoKTtcbiAgICAgICAgaWYgKHRoaXMud2Fsa0RhdGEuaWQgJiYgdGhpcy53YWxrRGF0YS5pZCA9PSBtYXBEYXRhLmlkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRNb25zdGVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5riF6Zmk5omA5pyJXG4gICAgICovXG4gICAgY2xlYXJBbGxNb25zdGVyKCkge1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9jbGVhckFsbCk7XG4gICAgfVxuXG5cbn1cbiJdfQ==