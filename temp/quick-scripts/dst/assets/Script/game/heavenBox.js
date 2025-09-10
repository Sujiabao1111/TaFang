
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
        this.HeavenData.time = util_1.default.GetHeavenTime();
        this.HeavenData.ing = false;
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
                console.log("111222222222222222211111111111111111111");
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
        console.log("1111111111111111111111111111111111111111111111");
        //超过12个就886
        if (this.existCoinNum >= 12)
            return;
        //预加载金币信息流
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoinView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoinView, true);
        }
        var location = util_1.default.GetHeavenPlace();
        if (!location) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxoZWF2ZW5Cb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWtEO0FBQ2xELDJDQUE2QztBQUM3QywyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBQ2xDLCtDQUE4QztBQUU5QyxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBNEtDO1FBeEtHLHdCQUF3QjtRQUVoQixlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRXBDLElBQUk7UUFDSSxVQUFJLEdBQVMsSUFBSSxDQUFDO1FBRTFCLE1BQU07UUFDRSxlQUFTLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUN0QyxVQUFVO1FBQ0Ysa0JBQVksR0FBVyxDQUFDLENBQUM7UUFJakMsWUFBWTtRQUNKLGdCQUFVLEdBQW1DLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7O0lBeUpwRixDQUFDO0lBdkpHLDBCQUFNLEdBQU47UUFBQSxpQkFtQ0M7UUFqQ0csY0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksSUFBSSxHQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTlCLE1BQU07UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxjQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBRTVCLGNBQUksQ0FBQyxVQUFVLENBQUM7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Q0FBQyxDQUFBO3FCQUNMO2dCQUNMLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLFVBQUMsS0FBSztvQkFDUixjQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEMsa0JBQVEsQ0FBQyxhQUFhLENBQUM7d0JBQ25CLGNBQWMsRUFBRSxNQUFNO3dCQUN0QixtQkFBbUIsRUFBRSxLQUFLO3dCQUMxQixlQUFlLEVBQUUsS0FBSztxQkFDekIsQ0FBQyxDQUFBO29CQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFBO2dCQUNoQyxDQUFDO2FBQ0osQ0FBQyxDQUFBO1NBQ0w7UUFBQSxDQUFDO0lBR04sQ0FBQztJQUdEOzs7T0FHRztJQUdILDBCQUFNLEdBQU4sVUFBTyxFQUFFO1FBRUwsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBbEtEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDO2dEQUNuQjtJQU5uQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBNEs3QjtJQUFELGdCQUFDO0NBNUtELEFBNEtDLENBNUtzQyxFQUFFLENBQUMsU0FBUyxHQTRLbEQ7a0JBNUtvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwb29sIGZyb20gXCIuLi9jb21tb24vcG9vbFwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBoZWF2ZW5Cb3ggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG5cblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiwgZGlzcGxheU5hbWU6IFwi5aSp6ZmN6YeR5biB55qE6aKE5Yi25L2TXCIgfSlcbiAgICBwcml2YXRlIGhlYXZlblByZTogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIC8v5rGg5aGYXG4gICAgcHJpdmF0ZSBwb29sOiBwb29sID0gbnVsbDtcblxuICAgIC8v5aSp6ZmN5qyh5pWwXG4gICAgcHJpdmF0ZSBoZWF2ZW5OdW06IG51bWJlciA9IDEwMDsvL+WJqeS9measoeaVsFxuICAgIC8vIC8v5a2Y5Zyo5aSa5bCR5LiqXG4gICAgcHJpdmF0ZSBleGlzdENvaW5OdW06IG51bWJlciA9IDA7XG5cblxuXG4gICAgLy/liKTmlq3mmK/lkKbov5vooYzlpKnpmY3ph5HluIFcbiAgICBwcml2YXRlIEhlYXZlbkRhdGE6IHsgaW5nOiBib29sZWFuLCB0aW1lOiBudW1iZXIgfSA9IHsgaW5nOiBmYWxzZSwgdGltZTogbnVsbCB9O1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgICAgIHV0aWwuaW5pdEhlYXZlblBvb2woKTtcblxuICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGVhdmVuUHJlKTtcbiAgICAgICAgdGhpcy5wb29sID0gbmV3IHBvb2woaXRlbSwgNSk7XG5cbiAgICAgICAgLy/lpKnpmY3ph5HluIFcbiAgICAgICAgdGhpcy5IZWF2ZW5EYXRhLnRpbWUgPSB1dGlsLkdldEhlYXZlblRpbWUoKTtcbiAgICAgICAgdGhpcy5IZWF2ZW5EYXRhLmluZyA9IGZhbHNlO1xuXG4gICAgICAgIHV0aWwuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmhlYXZlbkNvaW5fbWFpbixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5saXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYXZlbk51bSA9IHJlcy5yZW1haW5pbmdUaW1lcyArIHJlcy5saXN0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmxpc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlSGVhdmVuKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8v5Zue5pS2XG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfSGVhdmVuX2tpbGxlZCwgKG5vZGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9vbC5vbkVuZW15S2lsbGVkKG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5leGlzdENvaW5OdW0tLTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDph5HluIHnm5HlkKxcbiAgICAgKiBAcGFyYW0gZHQgXG4gICAgICovXG4gICAgSGVhdmVuTW9uaXRvcihkdCkge1xuICAgICAgICBpZiAodXRpbC5sZXZlbFN0YXRlICE9PSBnYW1lU3RhdGUuc3RhcnQgfHwgdGhpcy5oZWF2ZW5OdW0gPD0gMCkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5IZWF2ZW5EYXRhLmluZykge1xuICAgICAgICAgICAgdGhpcy5IZWF2ZW5EYXRhLnRpbWUgLT0gZHQ7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLkhlYXZlbkRhdGEudGltZSwndGhpcy5IZWF2ZW5EYXRhLnRpbWUnKVxuICAgICAgICAgICAgaWYgKHRoaXMuSGVhdmVuRGF0YS50aW1lIDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMTExMjIyMjIyMjIyMjIyMjIyMjExMTExMTExMTExMTExMTExMTExXCIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5IZWF2ZW5EYXRhLnRpbWUgPSB1dGlsLkdldEhlYXZlblRpbWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUhlYXZlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65aSp6ZmN6YeR5biBXG4gICAgICogQHBhcmFtIGRhdGEge2lkOm51bWJlcm0sY29pbjpudW1iZXJ9XG4gICAgICovXG4gICAgY3JlYXRlSGVhdmVuKGRhdGE/OiB7IGlkOiBudW1iZXIsIHBvaW50OiBudW1iZXIgfSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIjExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTFcIik7XG5cbiAgICAgICAgLy/otoXov4cxMuS4quWwsTg4NlxuICAgICAgICBpZiAodGhpcy5leGlzdENvaW5OdW0gPj0gMTIpIHJldHVybjtcblxuICAgICAgICAvL+mihOWKoOi9vemHkeW4geS/oeaBr+a1gVxuICAgICAgICBpZiAoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5IZWF2ZW5Db2luVmlld10pIHtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uSGVhdmVuQ29pblZpZXcsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvY2F0aW9uOiBudW1iZXIgPSB1dGlsLkdldEhlYXZlblBsYWNlKCk7XG4gICAgICAgIGlmICghbG9jYXRpb24pIHtcbiAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Y2g5L2N572uXG4gICAgICAgIGxldCBzdWNjZXNzRm4gPSAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKHV0aWwuY2hlY2tIZWF2ZW5Qb29sKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gdXRpbC5HZXRIZWF2ZW5QbGFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5leGlzdENvaW5OdW0rKztcbiAgICAgICAgICAgIHV0aWwuc2F2ZUhlYXZlblBvb2wobG9jYXRpb24sIGRhdGEuaWQsIGRhdGEucG9pbnQpO1xuICAgICAgICAgICAgdGhpcy5wb29sLmNyZWF0ZUVuZW15KHRoaXMubm9kZSwgeyBubzogbG9jYXRpb24sIGRhdGEgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbihkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWwuc2F2ZUhlYXZlblBvb2wobG9jYXRpb24sIDEsIDEpO1xuICAgICAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmhlYXZlbkNvaW5fZ2V0LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHV0aWwuc2F2ZUhlYXZlblBvb2wobG9jYXRpb24sIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmlkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzRm4ocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFpcmJvcm5lX2dvbGQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIumHkeW4geS4i+WPkVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGlvbl9zdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5pZCA9PSBudWxsICYmIHJlcy5kaXN0YW5jZVRpbWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpc3RDb2luTnVtID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5zYXZlSGVhdmVuUG9vbChsb2NhdGlvbiwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5IZWF2ZW5EYXRhLnRpbWUgPSBNYXRoLmZsb29yKHJlcy5kaXN0YW5jZVRpbWUgLyAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmnKrliLDml7bpl7RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFpcmJvcm5lX2dvbGQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIumHkeW4geS4i+WPkVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGlvbl9zdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWx1cmVfcmVhc29uczogXCLmnKrliLDml7bpl7RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwuc2F2ZUhlYXZlblBvb2wobG9jYXRpb24sIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5haXJib3JuZV9nb2xkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIumHkeW4geS4i+WPkVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdHJpYnV0aW9uX3N0YXR1czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsdXJlX3JlYXNvbnM6IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLplJnor6/vvJpcIiArIGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGR0IFxuICAgICAqL1xuXG5cbiAgICB1cGRhdGUoZHQpIHtcblxuICAgICAgICB0aGlzLkhlYXZlbk1vbml0b3IoZHQpO1xuICAgIH1cblxuXG5cbn1cbiJdfQ==