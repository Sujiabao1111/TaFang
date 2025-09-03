"use strict";
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