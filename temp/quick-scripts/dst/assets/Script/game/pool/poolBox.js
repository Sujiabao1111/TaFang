
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxwb29sXFxwb29sQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUN2Qyw4Q0FBZ0Q7QUFJaEQsd0NBQW1DO0FBRTdCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFNO0lBQTNDO1FBQUEscUVBaUlDO1FBN0hXLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBSTlCLGNBQVEsR0FBVyxDQUFDLENBQUM7O0lBZ0hqQyxDQUFDO0lBOUdHLHdCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHVCQUFLLEdBQUw7SUFJQSxDQUFDO0lBRU0sc0JBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsTUFBTTtJQUNOLHlCQUFPLEdBQVA7UUFDSSxJQUFJLE9BQU8sR0FBRyxjQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEIsT0FBTztTQUNWO1FBQ0QsUUFBUTtRQUNSLGNBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRXRDLFFBQVE7UUFDUixjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3RELFVBQVU7UUFDVixjQUFJ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QUNiO0lBYnJCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FpSTNCO0lBQUQsY0FBQztDQWpJRCxBQWlJQyxDQWpJb0MsZ0JBQU0sR0FpSTFDO2tCQWpJb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uLy4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyB0aGluZ1R5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uLy4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uLy4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcG9vbEJveCBleHRlbmRzIGJhc2VUcyB7XG5cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgZGlzcGxheU5hbWU6IFwi5oCq54mp6YGT6LevXCIgfSlcbiAgICBwcml2YXRlIG1vbnN0ZXJXYXlQcmU6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIGRpc3BsYXlOYW1lOiBcIueCruWhlOS9jee9rlwiIH0pXG4gICAgcHJpdmF0ZSBQbGFjZUl0ZW1QcmU6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIGRpc3BsYXlOYW1lOiBcIuW8gOWni+S9jee9rlwiIH0pXG4gICAgcHJpdmF0ZSBzdGFydFBvaW50UHJlOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiLCBkaXNwbGF5TmFtZTogXCLnu5PmnZ/kvY3nva5cIiB9KVxuICAgIHByaXZhdGUgZW5kUG9pbnRQcmU6IGNjLlByZWZhYiA9IG51bGw7XG5cblxuXG4gICAgcHJpdmF0ZSB0dXJyZXRObzogbnVtYmVyID0gMDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cblxuXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMubG9hZE1hcCgpO1xuICAgIH1cblxuICAgIC8v5Yqg6L295Zyw5Zu+XG4gICAgbG9hZE1hcCgpIHtcbiAgICAgICAgbGV0IG1hcERhdGEgPSB1dGlsLkdldEN1c3RvbXNNYXAoKTtcbiAgICAgICAgaWYgKCFtYXBEYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5Yqg6L295Zyw5Zu+5aSx6LSlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8v6K6+572u5Zyw5Zu+5aSn5bCPXG4gICAgICAgIHV0aWwubWFwU2l6ZS53aWR0aCA9IGNjLndpblNpemUud2lkdGg7XG5cbiAgICAgICAgLy/orr7nva7moLzlrZDlpKflsI9cbiAgICAgICAgdXRpbC5tYXBTaXplLmdyaWQgPSB1dGlsLm1hcFNpemUud2lkdGggLyBtYXBEYXRhLnhMZW47XG4gICAgICAgIC8v6K6+572u5Yid5aeL5qC85a2Q5L2N572uXG4gICAgICAgIHV0aWwubWFwU2l6ZS5zdGFydEdyaWRQb3MgPSB7XG4gICAgICAgICAgICB4OiAtdXRpbC5tYXBTaXplLmdyaWQgKiBtYXBEYXRhLnhMZW4gLyAyICsgdXRpbC5tYXBTaXplLmdyaWQgLyAyLFxuICAgICAgICAgICAgeTogdXRpbC5tYXBTaXplLmdyaWQgKiBtYXBEYXRhLnlMZW4gLyAyIC0gdXRpbC5tYXBTaXplLmdyaWQgLyAyXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcERhdGEubWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeTogbnVtYmVyID0gaTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWFwRGF0YS5tYXBbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gajtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRUeXBlKHsgeCwgeSwgdHlwZTogbWFwRGF0YS5tYXBbaV1bal0gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICog5Yqg6L2957G75Z6LXG4gICAgICovXG5cbiAgICBsb2FkVHlwZShkYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IHN0ciA9IHtcbiAgICAgICAgICAgIG5vZGU6IG51bGwsXG4gICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgcG9zOiBudWxsLFxuICAgICAgICAgICAgZGF0YTogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEudHlwZSAhPT0gMCkge1xuICAgICAgICAgICAgc3RyLnBvcyA9IHtcbiAgICAgICAgICAgICAgICB4OiB1dGlsLm1hcFNpemUuc3RhcnRHcmlkUG9zLnggKyBkYXRhLnggKiB1dGlsLm1hcFNpemUuZ3JpZCxcbiAgICAgICAgICAgICAgICB5OiB1dGlsLm1hcFNpemUuc3RhcnRHcmlkUG9zLnkgLSBkYXRhLnkgKiB1dGlsLm1hcFNpemUuZ3JpZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcblxuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOi8v54Ku5aGU5L2N572uXG4gICAgICAgICAgICAgICAgc3RyLm5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlBsYWNlSXRlbVByZSk7XG4gICAgICAgICAgICAgICAgc3RyLm5hbWUgPSBcInBsYWNlSXRlbVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Tm8rKztcbiAgICAgICAgICAgICAgICB1dGlsLmxldmVsTWFwLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB4OiBkYXRhLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IGRhdGEueSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpbmdUeXBlLnR1cnJldCxcbiAgICAgICAgICAgICAgICAgICAgbm86IHRoaXMudHVycmV0Tm8sXG4gICAgICAgICAgICAgICAgICAgIHBvczogc3RyLnBvc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0ci5kYXRhID0geyBpZDogdGhpcy50dXJyZXRObyB9O1xuXG4gICAgICAgICAgICAgICAgLy8gaWYoIXV0aWwuY2hlY2tOb0V4aXN0KHRoaXMudHVycmV0Tm8pKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgdXRpbC51c2VyRGF0YS5wb29sLnB1c2goe25vOnRoaXMudHVycmV0Tm8sbGV2ZWw6LTEsc3RhdGU6dGhpcy50dXJyZXRObzw5PzE6MH0pO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjovL+W8gOWni+S9jee9rlxuICAgICAgICAgICAgICAgIC8vIHN0ci5ub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFydFBvaW50UHJlKTtcbiAgICAgICAgICAgICAgICAvLyBzdHIubmFtZSA9IFwic3RhcnRQb2ludFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOi8v57uT5p2f5L2N572uXG4gICAgICAgICAgICAgICAgLy8gc3RyLm5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZFBvaW50UHJlKTtcbiAgICAgICAgICAgICAgICAvLyBzdHIubmFtZSA9IFwiZW5kUG9pbnRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDovL+aAqueJqemBk+i3r1xuICAgICAgICAgICAgICAgIC8vIHN0ci5ub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb25zdGVyV2F5UHJlKTtcbiAgICAgICAgICAgICAgICAvLyBzdHIubmFtZSA9IFwibW9uc3RlcldheVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0ci5uYW1lKSB7XG4gICAgICAgICAgICBzdHIubm9kZS5zZXRQb3NpdGlvbihcbiAgICAgICAgICAgICAgICB1dGlsLm1hcFNpemUuc3RhcnRHcmlkUG9zLnggKyBkYXRhLnggKiB1dGlsLm1hcFNpemUuZ3JpZCxcbiAgICAgICAgICAgICAgICB1dGlsLm1hcFNpemUuc3RhcnRHcmlkUG9zLnkgLSBkYXRhLnkgKiB1dGlsLm1hcFNpemUuZ3JpZCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHN0ci5ub2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgbGV0IG5vZGVUcyA9IHN0ci5ub2RlLmdldENvbXBvbmVudChzdHIubmFtZSk7XG4gICAgICAgICAgICAvL+WIneWni+WMllxuICAgICAgICAgICAgaWYgKG5vZGVUcykgbm9kZVRzLmluaXQgJiYgbm9kZVRzLmluaXQoc3RyLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxufVxuIl19