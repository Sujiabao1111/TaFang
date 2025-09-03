"use strict";
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