"use strict";
cc._RF.push(module, 'ec718aE2nZP9KmjzfZq/ocC', 'turretBox');
// Script/game/turretBox.ts

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
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var LanguageData_1 = require("../Language/LanguageData");
var util_1 = require("../util/util");
var turret_1 = require("./turret/turret");
//#region 炮塔
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretBox = /** @class */ (function (_super) {
    __extends(turretBox, _super);
    function turretBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.turretPre = null;
        _this.isOpenAuto = false; //是否启动
        //合成时间
        _this.autoTime = 1;
        //是否拿起
        _this.isTouch = false;
        return _this;
    }
    Object.defineProperty(turretBox.prototype, "_userData", {
        get: function () {
            return util_1.default.userData;
        },
        enumerable: false,
        configurable: true
    });
    turretBox.prototype.onLoad = function () {
        var _this = this;
        // 监听创建炮台
        cc.game.on(NameTs_1.default.Game_Turret_Creator, function (res) {
            _this.createTurret(res);
        }, this);
        // 监听销毁炮台
        cc.game.on(NameTs_1.default.Game_Turret_Killed, function (res) {
            if (res.node) {
                res.node.destroy();
                res.node.removeFromParent();
                res.node = null;
            }
            if (res.no || res.no === undefined) {
                cc.game.emit("turret_bg_" + res.no);
                cc.game.emit("turret_label_" + res.no);
            }
            // this.turretPool.onEnemyKilled(res);
        }, this);
        // 监听自动合成
        cc.game.on(NameTs_1.default.Tool_Effect_Name.Game_Prop_Atuo, function () {
            _this.isOpenAuto = true;
        }, this);
        // 监听关闭自动合成
        cc.game.on(NameTs_1.default.Close_Prop_Atuo, function () {
            console.log("关闭自动合成");
            _this.isOpenAuto = false;
        }, this);
        // 拿起
        cc.game.on(NameTs_1.default.Game_Turret_PickUp, function (res) {
            _this.isTouch = true;
        }, this);
        // 放下
        cc.game.on(NameTs_1.default.Game_Turret_PutDown, function (res) {
            _this.isTouch = false;
        }, this);
        //点击了空地宝箱
        cc.game.on(NameTs_1.default.Click_Empty_Box, function (no) {
            _this.createTurret({ level: null, location: no, isFree: true }, true);
        }, this);
        // this.loadAny("prefab/turret/turret",cc.Prefab,(res)=>{            
        // this.turretPool = new pool(res,16);
        // console.log(this.turretPool,'turretPool')
        // });
        this.initTurret();
    };
    /**
     * 还原用户炮塔
     */
    turretBox.prototype.initTurret = function () {
        var _this = this;
        if (util_1.default && this._userData && this._userData.pool) {
            console.log("还原用户炮塔数据", this._userData.pool);
            this._userData.pool.forEach(function (item) {
                if (item.level > 0) {
                    _this.createTurret({ level: item.level, location: item.no, isFree: true });
                }
            });
        }
    };
    /**
     * 创建炮塔
     * @param level 等级
     * @param location 位置
     */
    turretBox.prototype.createTurret = function (data, isClickEmptyBox) {
        if (data === void 0) { data = { level: null, location: null, isFree: false }; }
        if (isClickEmptyBox === void 0) { isClickEmptyBox = false; }
        var level = data.level;
        var location = data.location;
        if (this._userData.product <= 0 && !data.isFree) {
            AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('tips.InsufficientEnergy'));
            return;
        }
        var loaction = location || util_1.default.checkPool(); //看看是哪个
        if (loaction == null) {
            AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('tips.noEmptySpace'));
            this.scheduleOnce(function () {
                AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('tips.noEmptySpace2'));
            }, 0.5);
            return;
        }
        // 如果有就直接等级没有就随机
        level = level || util_1.default.getBuyRandomLevel();
        if (!data.isFree)
            util_1.default.addProduct(-1);
        this._userData.buyCount += 1;
        util_1.default.savePool(loaction, level);
        if (!data.isFree)
            cc.game.emit(NameTs_1.default.Game_Buy_update);
        var item = cc.instantiate(this.turretPre);
        item.getComponent(item.name).init({ level: level, no: loaction });
        item.setParent(this.node);
        // this.turretPool.createEnemy(this.node,{level:level,no:loaction});      
        if (isClickEmptyBox) {
            item.scale = 0.6;
            cc.tween(item).to(0.08, { scale: 1.1 }).to(0.04, { scale: 1 }).start();
        }
    };
    /**开启自动合成 */
    /***************自动合成炮台*********** */
    turretBox.prototype.openAuto = function () {
        // if(!this._userData.prop[propType.auto-1].use){
        //     this.unscheduleAllCallbacks();
        //     return;
        // }
        var arr = util_1.default.GetTurretAuto();
        if (!arr)
            return;
        var node1 = util_1.default.GlobalMap.get("turret_" + arr[0].no);
        if (!node1)
            return;
        var node2 = util_1.default.GlobalMap.get("turret_" + arr[1].no);
        if (!node2)
            return;
        var node2Pos = cc.v2();
        if (node2.getPosition) {
            node2Pos = node2.getPosition();
        }
        node1.zIndex = 99;
        cc.tween(node1).to(.2, { x: node2Pos.x, y: node2Pos.y }).call(function () {
            node1.getComponent(turret_1.default).GetType(arr[1].no);
        }).start();
    };
    turretBox.prototype.update = function (dt) {
        if (this.isOpenAuto && !this.isTouch && util_1.default.levelState == faceTs_1.gameState.start) {
            this.autoTime -= dt;
            if (this.autoTime < 0) {
                this.autoTime = 0.5; // 合成时间
                this.openAuto();
                cc.game.emit(NameTs_1.default.Game_Turret_Creator);
            }
        }
    };
    __decorate([
        property({ displayName: "炮塔", type: cc.Prefab })
    ], turretBox.prototype, "turretPre", void 0);
    turretBox = __decorate([
        ccclass
    ], turretBox);
    return turretBox;
}(baseTs_1.default));
exports.default = turretBox;

cc._RF.pop();