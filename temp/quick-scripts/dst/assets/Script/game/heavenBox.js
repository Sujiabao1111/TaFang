
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/heavenBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '22b39qApJJC0K8nRYiVZDse', 'heavenBox');
// Script/game/heavenBox.ts

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
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pool_1 = require("../common/pool");
var UrlConst_1 = require("../server/UrlConst");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var heavenBox = /** @class */ (function (_super) {
    __extends(heavenBox, _super);
    function heavenBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this.heavenPre = null;
        //池塘
        _this.pool = null;
        //天降次数
        _this.heavenNum = 100; //剩余次数
        // //存在多少个
        _this.existCoinNum = 0;
        //判断是否进行天降金币
        _this.HeavenData = { ing: false, time: null };
        return _this;
    }
    heavenBox.prototype.onLoad = function () {
        var _this = this;
        util_1.default.initHeavenPool();
        var item = cc.instantiate(this.heavenPre);
        this.pool = new pool_1.default(item, 5);
        //天降金币
        // cc.game.on(NameTs.Game_Start,(res)=>{
        //     if(this.HeavenData.ing)return;
        this.HeavenData.time = util_1.default.GetHeavenTime();
        this.HeavenData.ing = true;
        // },this);
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.heavenCoin_main,
            success: function (res) {
                if (res && res.list) {
                    if (!_this.isValid) {
                        return;
                    }
                    _this.heavenNum = res.remainingTimes + res.list.length;
                    res.list.forEach(function (element) {
                        _this.createHeaven(element);
                    });
                }
            },
            fail: function () {
            }
        });
        //回收
        cc.game.on(NameTs_1.default.Game_Heaven_killed, function (node) {
            _this.pool.onEnemyKilled(node);
            _this.existCoinNum--;
        }, this);
        // this.createHeaven();
        // console.log(util.userData.heavenPool,'this.userData.heavenPool')
    };
    heavenBox.prototype.start = function () {
    };
    /**
     * 添加金币监听
     * @param dt
     */
    heavenBox.prototype.HeavenMonitor = function (dt) {
        if (util_1.default.levelState !== faceTs_1.gameState.start || this.heavenNum <= 0)
            return;
        if (this.HeavenData.ing) {
            this.HeavenData.time -= dt;
            // console.log(this.HeavenData.time,'this.HeavenData.time')
            if (this.HeavenData.time < 0) {
                this.HeavenData.time = util_1.default.GetHeavenTime();
                this.createHeaven();
            }
        }
    };
    /**
     * 创建天降金币
     * @param data {id:numberm,coin:number}
     */
    heavenBox.prototype.createHeaven = function (data) {
        var _this = this;
        //超过12个就886
        if (this.existCoinNum >= 12)
            return;
        //预加载金币信息流
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoinView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoinView, true);
        }
        var location = util_1.default.GetHeavenPlace();
        if (!location) {
            //console.error("没有位置");
            TrackMgr_1.default.airborne_gold({
                activity_state: "金币下发",
                distribution_status: false,
                failure_reasons: "没有位置"
            });
            return;
        }
        //占位置
        var successFn = function (data) {
            if (util_1.default.checkHeavenPool(location)) {
                location = util_1.default.GetHeavenPlace();
            }
            _this.existCoinNum++;
            util_1.default.saveHeavenPool(location, data.id, data.point);
            _this.pool.createEnemy(_this.node, { no: location, data: data });
        };
        if (data) {
            successFn(data);
        }
        else {
            util_1.default.saveHeavenPool(location, 1, 1);
            util_1.default.getdataStr({
                url: UrlConst_1.UrlConst.heavenCoin_get,
                success: function (res) {
                    if (!_this.isValid) {
                        return;
                    }
                    util_1.default.saveHeavenPool(location, null);
                    if (res.id !== null) {
                        successFn(res);
                        TrackMgr_1.default.airborne_gold({
                            activity_state: "金币下发",
                            distribution_status: true,
                        });
                    }
                    else {
                        if (res.id == null && res.distanceTime == null) {
                            _this.existCoinNum = 12;
                            util_1.default.saveHeavenPool(location, null);
                            return;
                        }
                        _this.HeavenData.time = Math.floor(res.distanceTime / 1000);
                        console.error("未到时间");
                        TrackMgr_1.default.airborne_gold({
                            activity_state: "金币下发",
                            distribution_status: false,
                            failure_reasons: "未到时间"
                        });
                    }
                },
                fail: function (error) {
                    util_1.default.saveHeavenPool(location, null);
                    TrackMgr_1.default.airborne_gold({
                        activity_state: "金币下发",
                        distribution_status: false,
                        failure_reasons: error
                    });
                    console.error("错误：" + error);
                }
            });
        }
        ;
    };
    /**
     *
     * @param dt
     */
    heavenBox.prototype.update = function (dt) {
        this.HeavenMonitor(dt);
    };
    __decorate([
        property({ type: cc.Prefab, displayName: "天降金币的预制体" })
    ], heavenBox.prototype, "heavenPre", void 0);
    heavenBox = __decorate([
        ccclass
    ], heavenBox);
    return heavenBox;
}(cc.Component));
exports.default = heavenBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxoZWF2ZW5Cb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWtEO0FBQ2xELDJDQUE2QztBQUM3QywyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBQ2xDLCtDQUE4QztBQUU5QyxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBdUxDO1FBbkxHLHdCQUF3QjtRQUVoQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRW5DLElBQUk7UUFDSSxVQUFJLEdBQVEsSUFBSSxDQUFDO1FBRXpCLE1BQU07UUFDRSxlQUFTLEdBQVUsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUNyQyxVQUFVO1FBQ0Ysa0JBQVksR0FBVSxDQUFDLENBQUM7UUFJaEMsWUFBWTtRQUNKLGdCQUFVLEdBQTZCLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUM7O0lBb0t6RSxDQUFDO0lBbEtHLDBCQUFNLEdBQU47UUFBQSxpQkE2Q0M7UUEzQ0csY0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdCLE1BQU07UUFDTix3Q0FBd0M7UUFDeEMscUNBQXFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLGNBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7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a0JBQVEsQ0FBQyxhQUFhLENBQUM7NEJBQ25CLGNBQWMsRUFBRSxNQUFNOzRCQUN0QixtQkFBbUIsRUFBRSxLQUFLOzRCQUMxQixlQUFlLEVBQUUsTUFBTTt5QkFDMUIsQ0FBQyxDQUFBO3FCQUNMO2dCQUNMLENBQUM7Z0JBQ0QsSUFBSSxFQUFDLFVBQUMsS0FBSztvQkFDUCxjQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkMsa0JBQVEsQ0FBQyxhQUFhLENBQUM7d0JBQ25CLGNBQWMsRUFBRSxNQUFNO3dCQUN0QixtQkFBbUIsRUFBRSxLQUFLO3dCQUMxQixlQUFlLEVBQUUsS0FBSztxQkFDekIsQ0FBQyxDQUFBO29CQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUM5QixDQUFDO2FBQ0osQ0FBQyxDQUFBO1NBQ0w7UUFBQSxDQUFDO0lBR04sQ0FBQztJQUdEOzs7T0FHRztJQUdILDBCQUFNLEdBQU4sVUFBUSxFQUFFO1FBRU4sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBN0tEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxDQUFDO2dEQUNmO0lBTmxCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0F1TDdCO0lBQUQsZ0JBQUM7Q0F2TEQsQUF1TEMsQ0F2THNDLEVBQUUsQ0FBQyxTQUFTLEdBdUxsRDtrQkF2TG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb29sXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBoZWF2ZW5Cb3ggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUHJlZmFiLGRpc3BsYXlOYW1lOlwi5aSp6ZmN6YeR5biB55qE6aKE5Yi25L2TXCJ9KVxuICAgIHByaXZhdGUgaGVhdmVuUHJlOmNjLlByZWZhYiA9IG51bGw7XG5cbiAgICAvL+axoOWhmFxuICAgIHByaXZhdGUgcG9vbDpwb29sID0gbnVsbDtcblxuICAgIC8v5aSp6ZmN5qyh5pWwXG4gICAgcHJpdmF0ZSBoZWF2ZW5OdW06bnVtYmVyID0gMTAwOy8v5Ymp5L2Z5qyh5pWwXG4gICAgLy8gLy/lrZjlnKjlpJrlsJHkuKpcbiAgICBwcml2YXRlIGV4aXN0Q29pbk51bTpudW1iZXIgPSAwO1xuXG4gICAgXG5cbiAgICAvL+WIpOaWreaYr+WQpui/m+ihjOWkqemZjemHkeW4gVxuICAgIHByaXZhdGUgSGVhdmVuRGF0YTp7aW5nOmJvb2xlYW4sdGltZTpudW1iZXJ9ID0ge2luZzpmYWxzZSx0aW1lOm51bGx9O1xuXG4gICAgb25Mb2FkICgpIHtcblxuICAgICAgICB1dGlsLmluaXRIZWF2ZW5Qb29sKCk7XG5cbiAgICAgICAgbGV0IGl0ZW06Y2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGVhdmVuUHJlKTtcbiAgICAgICAgdGhpcy5wb29sID0gbmV3IHBvb2woaXRlbSw1KTtcblxuICAgICAgICAvL+WkqemZjemHkeW4gVxuICAgICAgICAvLyBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1N0YXJ0LChyZXMpPT57XG4gICAgICAgIC8vICAgICBpZih0aGlzLkhlYXZlbkRhdGEuaW5nKXJldHVybjtcbiAgICAgICAgICAgIHRoaXMuSGVhdmVuRGF0YS50aW1lID0gdXRpbC5HZXRIZWF2ZW5UaW1lKCk7XG4gICAgICAgICAgICB0aGlzLkhlYXZlbkRhdGEuaW5nID0gdHJ1ZTtcbiAgICAgICAgLy8gfSx0aGlzKTtcblxuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOlVybENvbnN0LmhlYXZlbkNvaW5fbWFpbixcbiAgICAgICAgICAgIHN1Y2Nlc3M6KHJlcyk9PntcbiAgICAgICAgICAgICAgICBpZihyZXMgJiYgcmVzLmxpc3Qpe1xuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhdmVuTnVtID0gcmVzLnJlbWFpbmluZ1RpbWVzK3Jlcy5saXN0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmxpc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlSGVhdmVuKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDooKT0+e1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL+WbnuaUtlxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0hlYXZlbl9raWxsZWQsKG5vZGUpPT57XG4gICAgICAgICAgICB0aGlzLnBvb2wub25FbmVteUtpbGxlZChub2RlKTtcbiAgICAgICAgICAgIHRoaXMuZXhpc3RDb2luTnVtLS07XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgLy8gdGhpcy5jcmVhdGVIZWF2ZW4oKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyh1dGlsLnVzZXJEYXRhLmhlYXZlblBvb2wsJ3RoaXMudXNlckRhdGEuaGVhdmVuUG9vbCcpXG4gICAgXG5cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDph5HluIHnm5HlkKxcbiAgICAgKiBAcGFyYW0gZHQgXG4gICAgICovXG4gICAgSGVhdmVuTW9uaXRvcihkdCl7XG4gICAgICAgIGlmKHV0aWwubGV2ZWxTdGF0ZSE9PWdhbWVTdGF0ZS5zdGFydHx8dGhpcy5oZWF2ZW5OdW08PTApcmV0dXJuO1xuICAgICAgICBpZih0aGlzLkhlYXZlbkRhdGEuaW5nKXtcbiAgICAgICAgICAgIHRoaXMuSGVhdmVuRGF0YS50aW1lLT1kdDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuSGVhdmVuRGF0YS50aW1lLCd0aGlzLkhlYXZlbkRhdGEudGltZScpXG4gICAgICAgICAgICBpZih0aGlzLkhlYXZlbkRhdGEudGltZTwwKXtcbiAgICAgICAgICAgICAgICB0aGlzLkhlYXZlbkRhdGEudGltZSA9IHV0aWwuR2V0SGVhdmVuVGltZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlSGVhdmVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJvlu7rlpKnpmY3ph5HluIFcbiAgICAgKiBAcGFyYW0gZGF0YSB7aWQ6bnVtYmVybSxjb2luOm51bWJlcn1cbiAgICAgKi9cbiAgICBjcmVhdGVIZWF2ZW4oZGF0YT86e2lkOm51bWJlcixwb2ludDpudW1iZXJ9KXtcbiAgICAgICAgLy/otoXov4cxMuS4quWwsTg4NlxuICAgICAgICBpZih0aGlzLmV4aXN0Q29pbk51bT49MTIpcmV0dXJuO1xuXG4gICAgICAgIC8v6aKE5Yqg6L296YeR5biB5L+h5oGv5rWBXG4gICAgICAgIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uSGVhdmVuQ29pblZpZXddKXtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uSGVhdmVuQ29pblZpZXcsdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9jYXRpb246bnVtYmVyID0gdXRpbC5HZXRIZWF2ZW5QbGFjZSgpO1xuICAgICAgICBpZighbG9jYXRpb24pe1xuICAgICAgICAgICAgLy9jb25zb2xlLmVycm9yKFwi5rKh5pyJ5L2N572uXCIpO1xuICAgICAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfZ29sZCh7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi6YeR5biB5LiL5Y+RXCIsXG4gICAgICAgICAgICAgICAgZGlzdHJpYnV0aW9uX3N0YXR1czogZmFsc2UsXG4gICAgICAgICAgICAgICAgZmFpbHVyZV9yZWFzb25zOiBcIuayoeacieS9jee9rlwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL+WNoOS9jee9rlxuICAgICAgICBsZXQgc3VjY2Vzc0ZuID0gKGRhdGEpPT57XG4gICAgICAgICAgICBpZih1dGlsLmNoZWNrSGVhdmVuUG9vbChsb2NhdGlvbikpe1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gdXRpbC5HZXRIZWF2ZW5QbGFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5leGlzdENvaW5OdW0rKztcbiAgICAgICAgICAgIHV0aWwuc2F2ZUhlYXZlblBvb2wobG9jYXRpb24sZGF0YS5pZCxkYXRhLnBvaW50KTtcbiAgICAgICAgICAgIHRoaXMucG9vbC5jcmVhdGVFbmVteSh0aGlzLm5vZGUse25vOmxvY2F0aW9uLGRhdGF9KTtcbiAgICAgICAgfVxuICAgICAgICBpZihkYXRhKXtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbihkYXRhKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB1dGlsLnNhdmVIZWF2ZW5Qb29sKGxvY2F0aW9uLDEsMSk7XG4gICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgIHVybDpVcmxDb25zdC5oZWF2ZW5Db2luX2dldCxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOihyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdXRpbC5zYXZlSGVhdmVuUG9vbChsb2NhdGlvbixudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLmlkIT09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzRm4ocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFpcmJvcm5lX2dvbGQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIumHkeW4geS4i+WPkVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGlvbl9zdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5pZD09bnVsbCYmcmVzLmRpc3RhbmNlVGltZT09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGlzdENvaW5OdW0gPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnNhdmVIZWF2ZW5Qb29sKGxvY2F0aW9uLG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuSGVhdmVuRGF0YS50aW1lID0gTWF0aC5mbG9vcihyZXMuZGlzdGFuY2VUaW1lLzEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuacquWIsOaXtumXtFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfZ29sZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi6YeR5biB5LiL5Y+RXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdHJpYnV0aW9uX3N0YXR1czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbHVyZV9yZWFzb25zOiBcIuacquWIsOaXtumXtFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOihlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5zYXZlSGVhdmVuUG9vbChsb2NhdGlvbixudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfZ29sZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLph5HluIHkuIvlj5FcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGlvbl9zdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbHVyZV9yZWFzb25zOiBlcnJvclxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6ZSZ6K+v77yaXCIrZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBkdCBcbiAgICAgKi9cblxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5IZWF2ZW5Nb25pdG9yKGR0KTtcbiAgICB9XG5cblxuICAgIFxufVxuIl19