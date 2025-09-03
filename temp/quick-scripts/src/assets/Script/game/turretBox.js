"use strict";
cc._RF.push(module, 'ec718aE2nZP9KmjzfZq/ocC', 'turretBox');
// Script/game/turretBox.ts

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
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var turret_1 = require("./turret/turret");
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
    turretBox.prototype.onLoad = function () {
        var _this = this;
        //监听创建
        cc.game.on(NameTs_1.default.Game_Turret_Creator, function (res) {
            _this.createTurret(res);
        }, this);
        //监听销毁
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
        //监听自动合成
        cc.game.on(NameTs_1.default.Tool_Effect_Name.Game_Prop_Atuo, function () {
            _this.isOpenAuto = true;
        }, this);
        //拿起
        cc.game.on(NameTs_1.default.Game_Turret_PickUp, function (res) {
            _this.isTouch = true;
        }, this);
        //放下
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
        if (util_1.default && util_1.default.userData && util_1.default.userData.pool) {
            util_1.default.userData.pool.forEach(function (item) {
                if (item.level > 0) {
                    _this.createTurret({ level: item.level, location: item.no, isFree: true });
                }
            });
        }
        //预加载解锁炮塔信息流
        // if(!util.adPreObj[AdPosition.UnlcokTurretView]&&util.chekPoolHaveTwo()){
        //     util.preloadAd(AdPosition.UnlcokTurretView,true);
        // }
        // for(let i = 1;i<6;i++){
        //     this.createTurret({level:i+16,location:i,isFree:true});
        // }
        // this.createTurret({level:7,location:13,isFree:true});
        // this.createTurret({level:20,location:14,isFree:true});
        // this.createTurret({level:19,location:4,isFree:true});
        // this.createTurret({level:19,location:5,isFree:true});
        // this.createTurret({level:19,location:6,isFree:true});
        // this.createTurret({level:19,location:7,isFree:true});
        // this.createTurret({level:19,location:8,isFree:true});
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
        if (util_1.default.userData.product <= 0 && !data.isFree) {
            AssistCtr_1.AssistCtr.showToastTip("不够能量");
            return;
        }
        var loaction = location || util_1.default.checkPool(); //看看是哪个
        if (loaction == null) {
            AssistCtr_1.AssistCtr.showToastTip("没有空地了，先把炮塔合成或回收吧！");
            return;
        }
        //如果有就直接等级没有就随机
        level = level || util_1.default.getBuyRandomLevel();
        if (!data.isFree)
            util_1.default.addProduct(-1);
        util_1.default.userData.buyCount += 1;
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
            TrackMgr_1.default.empty_treasure({
                activity_state: "\u5B9D\u7BB1\u70B9\u51FB",
                turret_level: level,
                pun_number: "\u7B2C" + util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "\u5173"
            });
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "\u7A7A\u964D\u5B9D\u7BB1\uFF08\u5DF2\u7838\u5F00\uFF09"
            });
        }
    };
    /**开启自动合成 */
    turretBox.prototype.openAuto = function () {
        if (!util_1.default.userData.prop[faceTs_1.propType.auto - 1].use) {
            this.unscheduleAllCallbacks();
            return;
        }
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
                this.autoTime = 1.5;
                this.openAuto();
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