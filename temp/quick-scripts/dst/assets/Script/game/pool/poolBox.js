
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/pool/poolBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0da9cz2E4FIO7oAQReT73BZ', 'poolBox');
// Script/game/pool/poolBox.ts

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
var baseTs_1 = require("../../base/baseTs");
var faceTs_1 = require("../../common/faceTs");
var util_1 = require("../../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var poolBox = /** @class */ (function (_super) {
    __extends(poolBox, _super);
    function poolBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monsterWayPre = null;
        _this.PlaceItemPre = null;
        _this.startPointPre = null;
        _this.endPointPre = null;
        _this.turretNo = 0;
        return _this;
        // update (dt) {}
    }
    poolBox.prototype.onLoad = function () {
        this.init();
    };
    poolBox.prototype.start = function () {
    };
    poolBox.prototype.init = function () {
        this.loadMap();
    };
    //加载地图
    poolBox.prototype.loadMap = function () {
        var mapData = util_1.default.GetCustomsMap();
        if (!mapData) {
            console.error("加载地图失败");
            return;
        }
        //设置地图大小
        util_1.default.mapSize.width = cc.winSize.width;
        //设置格子大小
        util_1.default.mapSize.grid = util_1.default.mapSize.width / mapData.xLen;
        //设置初始格子位置
        util_1.default.mapSize.startGridPos = {
            x: -util_1.default.mapSize.grid * mapData.xLen / 2 + util_1.default.mapSize.grid / 2,
            y: util_1.default.mapSize.grid * mapData.yLen / 2 - util_1.default.mapSize.grid / 2
        };
        for (var i = 0; i < mapData.map.length; i++) {
            var y = i;
            for (var j = 0; j < mapData.map[i].length; j++) {
                var x = j;
                //console.log('make---------------------------:' +mapData.map[i][j] )
                this.loadType({ x: x, y: y, type: mapData.map[i][j] });
            }
        }
    };
    /**
     * 加载类型
     */
    poolBox.prototype.loadType = function (data) {
        var str = {
            node: null,
            name: null,
            pos: null,
            data: null
        };
        if (data.type !== 0) {
            str.pos = {
                x: util_1.default.mapSize.startGridPos.x + data.x * util_1.default.mapSize.grid,
                y: util_1.default.mapSize.startGridPos.y - data.y * util_1.default.mapSize.grid
            };
        }
        switch (data.type) {
            case 0:
                break;
            case 1: //炮塔位置
                str.node = cc.instantiate(this.PlaceItemPre);
                str.name = "placeItem";
                this.turretNo++;
                util_1.default.levelMap.push({
                    x: data.x,
                    y: data.y,
                    type: faceTs_1.thingType.turret,
                    no: this.turretNo,
                    pos: str.pos
                });
                str.data = { id: this.turretNo };
                // if(!util.checkNoExist(this.turretNo)){
                //     util.userData.pool.push({no:this.turretNo,level:-1,state:this.turretNo<9?1:0});
                // }
                break;
            case 2: //开始位置
                // str.node = cc.instantiate(this.startPointPre);
                // str.name = "startPoint";
                break;
            case 3: //结束位置
                // str.node = cc.instantiate(this.endPointPre);
                // str.name = "endPoint";
                break;
            case 4: //怪物道路
                // str.node = cc.instantiate(this.monsterWayPre);
                // str.name = "monsterWay";
                break;
        }
        if (str.name) {
            str.node.setPosition(util_1.default.mapSize.startGridPos.x + data.x * util_1.default.mapSize.grid, util_1.default.mapSize.startGridPos.y - data.y * util_1.default.mapSize.grid);
            str.node.setParent(this.node);
            var nodeTs = str.node.getComponent(str.name);
            //初始化
            if (nodeTs)
                nodeTs.init && nodeTs.init(str.data);
        }
    };
    __decorate([
        property({ type: cc.Prefab, displayName: "怪物道路" })
    ], poolBox.prototype, "monsterWayPre", void 0);
    __decorate([
        property({ type: cc.Prefab, displayName: "炮塔位置" })
    ], poolBox.prototype, "PlaceItemPre", void 0);
    __decorate([
        property({ type: cc.Prefab, displayName: "开始位置" })
    ], poolBox.prototype, "startPointPre", void 0);
    __decorate([
        property({ type: cc.Prefab, displayName: "结束位置" })
    ], poolBox.prototype, "endPointPre", void 0);
    poolBox = __decorate([
        ccclass
    ], poolBox);
    return poolBox;
}(baseTs_1.default));
exports.default = poolBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxwb29sXFxwb29sQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUN2Qyw4Q0FBZ0Q7QUFJaEQsd0NBQW1DO0FBRTdCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFNO0lBQTNDO1FBQUEscUVBNklDO1FBeklXLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBSTdCLGNBQVEsR0FBUSxDQUFDLENBQUM7O1FBMkgxQixpQkFBaUI7SUFDckIsQ0FBQztJQTFIRyx3QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx1QkFBSyxHQUFMO0lBSUEsQ0FBQztJQUVNLHNCQUFJLEdBQVg7UUFFSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFHbkIsQ0FBQztJQUNELE1BQU07SUFDTix5QkFBTyxHQUFQO1FBRUksSUFBSSxPQUFPLEdBQUcsY0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25DLElBQUcsQ0FBQyxPQUFPLEVBQUM7WUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hCLE9BQU87U0FDVjtRQUNELFFBQVE7UUFDUixjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUV0QyxRQUFRO1FBQ1IsY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNwRCxV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QUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7Z0RBQ1Q7SUFicEIsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTZJM0I7SUFBRCxjQUFDO0NBN0lELEFBNklDLENBN0lvQyxnQkFBTSxHQTZJMUM7a0JBN0lvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IHRoaW5nVHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi8uLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcG9vbEJveCBleHRlbmRzIGJhc2VUcyB7XG4gICAgXG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUHJlZmFiLGRpc3BsYXlOYW1lOlwi5oCq54mp6YGT6LevXCJ9KVxuICAgIHByaXZhdGUgbW9uc3RlcldheVByZTpjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlByZWZhYixkaXNwbGF5TmFtZTpcIueCruWhlOS9jee9rlwifSlcbiAgICBwcml2YXRlIFBsYWNlSXRlbVByZTpjYy5QcmVmYWIgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5QcmVmYWIsZGlzcGxheU5hbWU6XCLlvIDlp4vkvY3nva5cIn0pXG4gICAgcHJpdmF0ZSBzdGFydFBvaW50UHJlOmNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUHJlZmFiLGRpc3BsYXlOYW1lOlwi57uT5p2f5L2N572uXCJ9KVxuICAgIHByaXZhdGUgZW5kUG9pbnRQcmU6Y2MuUHJlZmFiID0gbnVsbDtcblxuXG5cbiAgICBwcml2YXRlIHR1cnJldE5vOm51bWJlcj0wO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKXtcblxuICAgICAgICB0aGlzLmxvYWRNYXAoKTtcblxuXG4gICAgfVxuICAgIC8v5Yqg6L295Zyw5Zu+XG4gICAgbG9hZE1hcCgpe1xuICAgICAgICBcbiAgICAgICAgbGV0IG1hcERhdGEgPSB1dGlsLkdldEN1c3RvbXNNYXAoKTtcbiAgICAgICAgaWYoIW1hcERhdGEpe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuWKoOi9veWcsOWbvuWksei0pVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL+iuvue9ruWcsOWbvuWkp+Wwj1xuICAgICAgICB1dGlsLm1hcFNpemUud2lkdGggPSBjYy53aW5TaXplLndpZHRoO1xuXG4gICAgICAgIC8v6K6+572u5qC85a2Q5aSn5bCPXG4gICAgICAgIHV0aWwubWFwU2l6ZS5ncmlkID0gdXRpbC5tYXBTaXplLndpZHRoL21hcERhdGEueExlbjtcbiAgICAgICAgLy/orr7nva7liJ3lp4vmoLzlrZDkvY3nva5cbiAgICAgICAgdXRpbC5tYXBTaXplLnN0YXJ0R3JpZFBvcyA9IHtcbiAgICAgICAgICAgIHg6LXV0aWwubWFwU2l6ZS5ncmlkKm1hcERhdGEueExlbi8yK3V0aWwubWFwU2l6ZS5ncmlkLzIsXG4gICAgICAgICAgICB5OnV0aWwubWFwU2l6ZS5ncmlkKm1hcERhdGEueUxlbi8yLXV0aWwubWFwU2l6ZS5ncmlkLzJcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwO2k8bWFwRGF0YS5tYXAubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBsZXQgeTpudW1iZXIgPSBpO1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqPG1hcERhdGEubWFwW2ldLmxlbmd0aDtqKyspe1xuICAgICAgICAgICAgICAgIGxldCB4Om51bWJlciA9IGo7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ21ha2UtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS06JyArbWFwRGF0YS5tYXBbaV1bal0gKVxuICAgICAgICAgICAgICAgdGhpcy5sb2FkVHlwZSh7eCx5LHR5cGU6bWFwRGF0YS5tYXBbaV1bal19KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgXG5cbiAgICAvKipcbiAgICAgKiDliqDovb3nsbvlnotcbiAgICAgKi9cblxuICAgIGxvYWRUeXBlKGRhdGE6YW55KXtcbiAgICAgICAgbGV0IHN0ciA9IHtcbiAgICAgICAgICAgIG5vZGU6bnVsbCxcbiAgICAgICAgICAgIG5hbWU6bnVsbCxcbiAgICAgICAgICAgIHBvczpudWxsLFxuICAgICAgICAgICAgZGF0YTpudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZihkYXRhLnR5cGUhPT0wKXtcbiAgICAgICAgICAgIHN0ci5wb3MgPXtcbiAgICAgICAgICAgICAgICB4OnV0aWwubWFwU2l6ZS5zdGFydEdyaWRQb3MueCtkYXRhLngqdXRpbC5tYXBTaXplLmdyaWQsXG4gICAgICAgICAgICAgICAgeTp1dGlsLm1hcFNpemUuc3RhcnRHcmlkUG9zLnktZGF0YS55KnV0aWwubWFwU2l6ZS5ncmlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHN3aXRjaChkYXRhLnR5cGUpe1xuXG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6Ly/ngq7loZTkvY3nva5cbiAgICAgICAgICAgICAgICBzdHIubm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGxhY2VJdGVtUHJlKTtcbiAgICAgICAgICAgICAgICBzdHIubmFtZSA9IFwicGxhY2VJdGVtXCI7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRObysrO1xuICAgICAgICAgICAgICAgIHV0aWwubGV2ZWxNYXAucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHg6ZGF0YS54LFxuICAgICAgICAgICAgICAgICAgICB5OmRhdGEueSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTp0aGluZ1R5cGUudHVycmV0LFxuICAgICAgICAgICAgICAgICAgICBubzp0aGlzLnR1cnJldE5vLFxuICAgICAgICAgICAgICAgICAgICBwb3M6c3RyLnBvc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0ci5kYXRhID0ge2lkOnRoaXMudHVycmV0Tm99O1xuXG4gICAgICAgICAgICAgICAgLy8gaWYoIXV0aWwuY2hlY2tOb0V4aXN0KHRoaXMudHVycmV0Tm8pKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgdXRpbC51c2VyRGF0YS5wb29sLnB1c2goe25vOnRoaXMudHVycmV0Tm8sbGV2ZWw6LTEsc3RhdGU6dGhpcy50dXJyZXRObzw5PzE6MH0pO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjovL+W8gOWni+S9jee9rlxuICAgICAgICAgICAgICAgIC8vIHN0ci5ub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFydFBvaW50UHJlKTtcbiAgICAgICAgICAgICAgICAvLyBzdHIubmFtZSA9IFwic3RhcnRQb2ludFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOi8v57uT5p2f5L2N572uXG4gICAgICAgICAgICAgICAgLy8gc3RyLm5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZFBvaW50UHJlKTtcbiAgICAgICAgICAgICAgICAvLyBzdHIubmFtZSA9IFwiZW5kUG9pbnRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDovL+aAqueJqemBk+i3r1xuICAgICAgICAgICAgICAgIC8vIHN0ci5ub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb25zdGVyV2F5UHJlKTtcbiAgICAgICAgICAgICAgICAvLyBzdHIubmFtZSA9IFwibW9uc3RlcldheVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc3RyLm5hbWUpe1xuICAgICAgICAgICAgc3RyLm5vZGUuc2V0UG9zaXRpb24oXG4gICAgICAgICAgICAgICAgdXRpbC5tYXBTaXplLnN0YXJ0R3JpZFBvcy54K2RhdGEueCp1dGlsLm1hcFNpemUuZ3JpZCxcbiAgICAgICAgICAgICAgICB1dGlsLm1hcFNpemUuc3RhcnRHcmlkUG9zLnktZGF0YS55KnV0aWwubWFwU2l6ZS5ncmlkLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgc3RyLm5vZGUuc2V0UGFyZW50KHRoaXMubm9kZSk7XG4gICAgICAgICAgICBsZXQgbm9kZVRzID0gc3RyLm5vZGUuZ2V0Q29tcG9uZW50KHN0ci5uYW1lKTtcbiAgICAgICAgICAgIC8v5Yid5aeL5YyWXG4gICAgICAgICAgICBpZihub2RlVHMpbm9kZVRzLmluaXQmJm5vZGVUcy5pbml0KHN0ci5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cblxuICAgIFxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19