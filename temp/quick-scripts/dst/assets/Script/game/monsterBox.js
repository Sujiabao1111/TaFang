
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
var AStart_1 = require("../base/AStart");
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
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
        // update (dt) {}
    }
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
                    util_1.default.userData.resistAttackTimes = 1;
                    util_1.default.getnowmapdata();
                    cc.game.emit(NameTs_1.default.Game_Task_Progress);
                    TrackMgr_1.default.AppGamedate({
                        is_challenge_suc: true,
                        game_level_hcdg: "第" + util_1.default.userData.customs.big + "关",
                        level_hcdg: "第" + util_1.default.userData.customs.small + "波",
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
        //加载下一关
        cc.game.on(NameTs_1.default.Game_Load_Monster, function () {
            _this.loadNextMonster();
        }, this);
        //重玩
        cc.game.on(NameTs_1.default.Game_Again, function () {
            _this.clearAllMonster();
            util_1.default.userData.customs.small = (util_1.default.userData.customs.small - 1 < 1) ? 1 : (util_1.default.userData.customs.small - 1);
            console.log(util_1.default.userData.customs.small, 'util.userData.customs.small');
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
        var monsterData = tool_1.default.deepClone(util_1.default.GetCustomsMonsterInfo());
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
        monsterArr = tool_1.default.randomArr(monsterArr);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxtb25zdGVyQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtQztBQUNuQyx5Q0FBb0M7QUFDcEMsMkNBQW9FO0FBQ3BFLDJDQUFzQztBQUt0QyxpREFBNEM7QUFDNUMscUNBQWdDO0FBQ2hDLHFDQUFnQztBQUcxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBTTtJQUE5QztRQUFBLHFFQXlNQztRQXJNVyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQU1wQyxVQUFVO1FBQ0YsY0FBUSxHQUFPLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUM7UUFFM0MsMkJBQTJCO1FBR25CLFlBQU0sR0FBVyxLQUFLLENBQUM7O1FBd0wvQixpQkFBaUI7SUFDckIsQ0FBQztJQXZMRywyQkFBTSxHQUFOO1FBQUEsaUJBOERDO1FBNURHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxnQkFBSyxFQUFFLENBQUM7UUFFekIsMkRBQTJEO1FBQzNELGlDQUFpQztRQUNqQyxNQUFNO1FBR04sTUFBTTtRQUNOLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsbUJBQW1CLEVBQUMsVUFBQSxHQUFHO1lBQ3JDLElBQUcsR0FBRyxDQUFDLElBQUksRUFBQztnQkFDUixjQUFJLENBQUMsZUFBZSxFQUFHLENBQUM7Z0JBQ3hCLElBQUcsR0FBRyxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUM7b0JBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsRUFBQyxFQUFDLElBQUksRUFBQyxHQUFHLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsSUFBSSxF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SSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUdEOzs7T0FHRztJQUNILG9DQUFlLEdBQWY7UUFDSSxJQUFHLElBQUksQ0FBQyxNQUFNO1lBQUMsT0FBTztRQUN0QixJQUFJLE9BQU8sR0FBRyxjQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkMsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBRSxPQUFPLENBQUMsRUFBRSxFQUFDO1lBQzlDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0NBQWUsR0FBZjtRQUVJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUUvQyxDQUFDO0lBL0xEO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxDQUFDO2tEQUNSO0lBSm5CLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F5TTlCO0lBQUQsaUJBQUM7Q0F6TUQsQUF5TUMsQ0F6TXVDLGdCQUFNLEdBeU03QztrQkF6TW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVN0YXIgZnJvbSBcIi4uL2Jhc2UvQVN0YXJ0XCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgZ2FtZVBhc3MsIGdhbWVTdGF0ZSwgbW9uc3RlckluZm8gfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHBvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb29sXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vdXRpbC90b29sXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBtb25zZXJ0Qm94IGV4dGVuZHMgYmFzZVRzIHtcblxuXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIuaAquWFvVwiLHR5cGU6Y2MuUHJlZmFifSlcbiAgICBwcml2YXRlIG1vbnNlcnRQcmU6Y2MuUHJlZmFiID0gbnVsbDtcblxuXG4gICAgLyoq5a+76Lev566X5rOVICovXG4gICAgcHJpdmF0ZSBBU3RhcjpBU3RhcjtcblxuICAgIC8qKuihjOi1sOi3r+e6vyAqL1xuICAgIHByaXZhdGUgd2Fsa0RhdGE6YW55ID0ge2lkOm51bGwsZGF0YTpudWxsfTtcbiAgICBcbiAgICAvLyBwcml2YXRlIHBvb2w6cG9vbDsgLy/lr7nosaHmsaBcbiAgICBcblxuICAgIHByaXZhdGUgaXNDb21lOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIHRoaXMuQVN0YXIgPSBuZXcgQVN0YXIoKTtcblxuICAgICAgICAvLyB0aGlzLmxvYWRBbnkoXCJwcmVmYWIvbW9uc3Rlci9tb25zdGVyXCIsY2MuUHJlZmFiLChyZXMpPT57XG4gICAgICAgIC8vICAgICB0aGlzLnBvb2wgPSBuZXcgcG9vbChyZXMpO1xuICAgICAgICAvLyB9KTtcblxuXG4gICAgICAgIC8v55uR5ZCs6ZSA5q+BXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTW9uc3Rlcl9LaWxsZWQscmVzPT57XG4gICAgICAgICAgICBpZihyZXMubm9kZSl7XG4gICAgICAgICAgICAgICAgdXRpbC5sZXZlbE1vbnN0ZXJOdW0gLS07XG4gICAgICAgICAgICAgICAgaWYocmVzLmNvaW4+MCl7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbix7bm9kZTpyZXMubm9kZSx2YWx1ZTpyZXMuY29pbixub011c2ljOnRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbihyZXMuY29pbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHRoaXMucG9vbC5vbkVuZW15S2lsbGVkKHJlcy5ub2RlKTtcbiAgICAgICAgICAgICAgICByZXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgcmVzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgICAgIHJlcy5ub2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyB1dGlsLmFkZENvaW4ocmVzLmNvaW4pO1xuICAgICAgICAgICAgICAgIGlmKHV0aWwubGV2ZWxNb25zdGVyTnVtPD0wJiZ1dGlsLmxldmVsU3RhdGUgPT0gZ2FtZVN0YXRlLnN0YXJ0KXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiZPlrozkuoYs5YeG5aSH5Yqg6L295LiL5LiA5YWzXCIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5sZXZlbFN0YXRlID0gZ2FtZVN0YXRlLmVuZDtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5zZW5kVHVycmV0RGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnJlc2lzdEF0dGFja1RpbWVzID0gMTtcblx0XHRcdFx0XHR1dGlsLmdldG5vd21hcGRhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfUHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5BcHBHYW1lZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc19jaGFsbGVuZ2Vfc3VjOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZV9sZXZlbF9oY2RnOiBcIuesrFwiICsgdXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZyArIFwi5YWzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXZlbF9oY2RnOiBcIuesrFwiICsgdXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsICsgXCLms6JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVfdGltZTogdXRpbC5nYW1lVGltZS50b0ZpeGVkKDEpICsgXCJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VfdG9vbDogU3RyaW5nKHV0aWwuZ2FtZVByb3BOdW0pLFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZih1dGlsLnNhdmVDdXN0b21MZXZlbCgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FbmQsZ2FtZVBhc3Muc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgLy/liqDovb3kuIvkuIDlhbNcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Mb2FkX01vbnN0ZXIsKCk9PntcbiAgICAgICAgICAgIHRoaXMubG9hZE5leHRNb25zdGVyKCk7XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgLy/ph43njqlcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9BZ2FpbiwoKT0+e1xuICAgICAgICAgICAgdGhpcy5jbGVhckFsbE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIHV0aWwudXNlckRhdGEuY3VzdG9tcy5zbWFsbCA9ICh1dGlsLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwtMTwxKT8xOih1dGlsLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwtMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1dGlsLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwsJ3V0aWwudXNlckRhdGEuY3VzdG9tcy5zbWFsbCcpXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVmlld19DdXN0b21zVXBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMubG9hZE5leHRNb25zdGVyKCk7XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKi9cbiAgICBpbml0KCl7XG4gICAgICAgIC8vIOiOt+WPluWcsOWbvuaVsOaNrlxuICAgICAgICBsZXQgbWFwRGF0YSA9IHV0aWwuR2V0Q3VzdG9tc01hcCgpO1xuICAgICAgICAvL+WIneWni+WMluafkOS6m+aVsOaNrlxuICAgICAgICB1dGlsLmxldmVsTW9uc3RlckFyciA9IFtdO1xuICAgICAgICB1dGlsLmxldmVsTW9uc3Rlck51bSA9IDA7XG4gICAgICAgIHV0aWwuTW9uc3Rlck1hcC5jbGVhcigpO1xuXG4gICAgICAgIC8qKuihjOi1sOi3r+e6vyAqL1xuICAgICAgICB0aGlzLkFTdGFyLmluaXQobWFwRGF0YS5tYXAsbWFwRGF0YS54TGVuLG1hcERhdGEueUxlbik7XG4gICAgICAgIHRoaXMuQVN0YXIuRmluZFBvaW50KHJlcz0+e1xuXG4gICAgICAgICAgICBpZighcmVzKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6YGT6Lev5LiN6YCaXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLndhbGtEYXRhID0ge2lkOm1hcERhdGEuaWQsZGF0YTpyZXN9O1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRNb25zdGVyKCk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295b2T5YmN5YWz5Y2h5oCq5YW95pWw5o2uXG4gICAgKi9cbiAgICBsb2FkTW9uc3Rlcigpe1xuICAgICAgICB0aGlzLmlzQ29tZSA9IHRydWU7XG5cbiAgICAgICAgLy/mi7fotJ3kuIDku73pmLLmraLlsZ7mgKfkuLLmlLlcbiAgICAgICAgbGV0IG1vbnN0ZXJEYXRhID0gdG9vbC5kZWVwQ2xvbmUodXRpbC5HZXRDdXN0b21zTW9uc3RlckluZm8oKSk7XG5cbiAgICAgICAgXG5cbiAgICAgICAgbGV0IG1vbnN0ZXJBcnI6YW55W10gPSBtb25zdGVyRGF0YTtcbiAgICAgICAgLy/lsIbmgKrlhb3mlL7ov5vmlbDnu4RcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDtpPG1vbnN0ZXJEYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgbGV0IGl0ZW0gPSBtb25zdGVyRGF0YVtpXTtcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaiA9IDA7ajxpdGVtLm51bTtqKyspe1xuICAgICAgICAvLyAgICAgICAgIG1vbnN0ZXJBcnIucHVzaCh7bGV2ZWw6aXRlbS5sZXZlbCxocDppdGVtLmhwfSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy/mlbDnu4TmiZPkubFcblxuICAgICAgICAvLyBtb25zdGVyQXJyID0gWzEwMDEwMSwxMDAxMDIsMTAwMTAzLDEwMDEwNCwxMDAxMDUsMTAwMTA2LDEwMDEwNywxMDAxMDgsMTAwMTA5LDEwMDExMCwxMDAxMTEsMTAwMTEyLDEwMDExMywxMDAxMTQsMTAwMTE1LDEwMDExNl1cbiAgICAgICAgLy8gbW9uc3RlckFyciA9IFsxMDAxMDJdXG5cblxuXG4gICAgICAgIG1vbnN0ZXJBcnIgPSB0b29sLnJhbmRvbUFycihtb25zdGVyQXJyKTtcbiAgICAgICAgLy/orr7nva7nu5PmnZ/mnaHku7bvvIjmgKrlhb3nmoTmlbDph4/vvIlcbiAgICAgICAgdXRpbC5sZXZlbE1vbnN0ZXJOdW0gPSBtb25zdGVyQXJyLmxlbmd0aDtcbiAgICAgICAgdXRpbC5sZXZlbFN0YXRlID0gZ2FtZVN0YXRlLnN0YXJ0O1xuICAgICAgICBsZXQgekluZGV4Om51bWJlciA9IG1vbnN0ZXJBcnIubGVuZ3RoO1xuICAgICAgICBmb3IobGV0IGkgPSAwO2k8bW9uc3RlckFyci5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGxldCBtb25zdGVyOm1vbnN0ZXJJbmZvID0gdXRpbC5HZXRNb25zdGVySWREYXRhKG1vbnN0ZXJBcnJbaV0pO1xuICAgICAgICAgICAgekluZGV4LS07XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnN0ZXIobW9uc3RlcixpLHpJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5pc0NvbWUgPSBmYWxzZTtcbiAgICAgICAgfSwwLjIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIm+W7uuaAquWFvVxuICAgICAqIEBwYXJhbSBkYXRhIOaAquWFveaVsOaNrlxuICAgICAqIEBwYXJhbSBpZCDnrKzlh6DkuKpcbiAgICAgKiBAcGFyYW0gekluZGV4IOWxgue6p1xuICAgICAqL1xuICAgIGNyZWF0ZU1vbnN0ZXIoZGF0YTptb25zdGVySW5mbyxpZDpudW1iZXIsekluZGV4Om51bWJlcil7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLnBvb2wuY3JlYXRlRW5lbXkodGhpcy5ub2RlLHtkYXRhLHdhbGs6dGhpcy53YWxrRGF0YS5kYXRhLGlkfSk7XG4gICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vbnNlcnRQcmUpO1xuICAgICAgICBpdGVtLmdldENvbXBvbmVudChpdGVtLm5hbWUpLmluaXQoe2RhdGEsd2Fsazp0aGlzLndhbGtEYXRhLmRhdGEsaWR9KTtcbiAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcbiAgICAgICAgaXRlbS56SW5kZXggPSB6SW5kZXg7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDliqDovb3kuIvkuIDlhbPmgKrlhb1cbiAgICAgKiBAcGFyYW0gaWQg5Zyw5Zu+aWRcbiAgICAgKi9cbiAgICBsb2FkTmV4dE1vbnN0ZXIoKXtcbiAgICAgICAgaWYodGhpcy5pc0NvbWUpcmV0dXJuO1xuICAgICAgICBsZXQgbWFwRGF0YSA9IHV0aWwuR2V0Q3VzdG9tc01hcCgpO1xuICAgICAgICBpZih0aGlzLndhbGtEYXRhLmlkJiZ0aGlzLndhbGtEYXRhLmlkPT1tYXBEYXRhLmlkKXtcbiAgICAgICAgICAgIHRoaXMubG9hZE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuIXpmaTmiYDmnIlcbiAgICAgKi9cbiAgICBjbGVhckFsbE1vbnN0ZXIoKXtcblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9jbGVhckFsbCk7XG5cbiAgICB9XG5cblxuICAgIFxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==