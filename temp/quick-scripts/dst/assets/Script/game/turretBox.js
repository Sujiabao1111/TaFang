
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/turretBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUVwQywyQ0FBdUQ7QUFDdkQsMkNBQXNDO0FBRXRDLGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFDaEMsMENBQXFDO0FBRS9CLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFNO0lBQTdDO1FBQUEscUVBcU1DO1FBaE1XLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFFM0IsZ0JBQVUsR0FBVyxLQUFLLENBQUMsQ0FBQSxNQUFNO1FBRXpDLE1BQU07UUFDRSxjQUFRLEdBQVUsQ0FBQyxDQUFDO1FBQzVCLE1BQU07UUFDRSxhQUFPLEdBQVcsS0FBSyxDQUFDOztJQXlMcEMsQ0FBQztJQXZMRywwQkFBTSxHQUFOO1FBQUEsaUJBNkRDO1FBM0RHLE1BQU07UUFDTixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLG1CQUFtQixFQUFDLFVBQUEsR0FBRztZQUVyQyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUlSLE1BQU07UUFDTixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGtCQUFrQixFQUFDLFVBQUEsR0FBRztZQUNwQyxJQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUM7Z0JBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM1QixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNuQjtZQUNELElBQUcsR0FBRyxDQUFD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TUMsQ0FyTXNDLGdCQUFNLEdBcU01QztrQkFyTW9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGdhbWVTdGF0ZSwgcHJvcFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb29sXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5pbXBvcnQgdHVycmV0IGZyb20gXCIuL3R1cnJldC90dXJyZXRcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0dXJyZXRCb3ggZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgcHJpdmF0ZSB0dXJyZXRQb29sOnBvb2w7IC8v5a+56LGh5rGgXG5cbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi54Ku5aGUXCIsdHlwZTpjYy5QcmVmYWJ9KVxuICAgIHByaXZhdGUgdHVycmV0UHJlOmNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzT3BlbkF1dG86Ym9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5ZCv5YqoXG4gICAgXG4gICAgLy/lkIjmiJDml7bpl7RcbiAgICBwcml2YXRlIGF1dG9UaW1lOm51bWJlciA9IDE7XG4gICAgLy/mmK/lkKbmi7/otbdcbiAgICBwcml2YXRlIGlzVG91Y2g6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkKCl7XG5cbiAgICAgICAgLy/nm5HlkKzliJvlu7pcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UdXJyZXRfQ3JlYXRvcixyZXM9PntcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jcmVhdGVUdXJyZXQocmVzKTtcblxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIFxuXG4gICAgICAgIC8v55uR5ZCs6ZSA5q+BXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHVycmV0X0tpbGxlZCxyZXM9PntcbiAgICAgICAgICAgIGlmKHJlcy5ub2RlKXtcbiAgICAgICAgICAgICAgICByZXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgcmVzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgICAgIHJlcy5ub2RlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJlcy5ub3x8cmVzLm5vPT09dW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoXCJ0dXJyZXRfYmdfXCIrcmVzLm5vKTtcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoXCJ0dXJyZXRfbGFiZWxfXCIrcmVzLm5vKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoaXMudHVycmV0UG9vbC5vbkVuZW15S2lsbGVkKHJlcyk7XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICAvL+ebkeWQrOiHquWKqOWQiOaIkFxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9BdHVvLCgpPT57XG4gICAgICAgICAgICB0aGlzLmlzT3BlbkF1dG8gPSB0cnVlO1xuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIC8v5ou/6LW3XG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHVycmV0X1BpY2tVcCwocmVzKT0+e1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmlzVG91Y2ggPSB0cnVlO1xuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgLy/mlL7kuItcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UdXJyZXRfUHV0RG93biwocmVzKT0+e1xuXG4gICAgICAgICAgICB0aGlzLmlzVG91Y2ggPSBmYWxzZTtcblxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIC8v54K55Ye75LqG56m65Zyw5a6d566xXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkNsaWNrX0VtcHR5X0JveCwobm8pPT57XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVHVycmV0KHtsZXZlbDpudWxsLCBsb2NhdGlvbjpubywgaXNGcmVlOnRydWV9LCB0cnVlKTtcblxuICAgICAgICB9LHRoaXMpOyAgICAgICAgXG5cbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMubG9hZEFueShcInByZWZhYi90dXJyZXQvdHVycmV0XCIsY2MuUHJlZmFiLChyZXMpPT57ICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB0aGlzLnR1cnJldFBvb2wgPSBuZXcgcG9vbChyZXMsMTYpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy50dXJyZXRQb29sLCd0dXJyZXRQb29sJylcbiAgICAgICAgICAgIFxuICAgICAgICAvLyB9KTtcblxuICAgICAgICB0aGlzLmluaXRUdXJyZXQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi/mOWOn+eUqOaIt+eCruWhlFxuICAgICAqL1xuICAgIGluaXRUdXJyZXQoKXtcbiAgICAgICAgaWYodXRpbCAmJiB1dGlsLnVzZXJEYXRhICYmIHV0aWwudXNlckRhdGEucG9vbCl7XG4gICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnBvb2wuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5sZXZlbD4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUdXJyZXQoe2xldmVsOml0ZW0ubGV2ZWwsbG9jYXRpb246aXRlbS5ubyxpc0ZyZWU6dHJ1ZX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL+mihOWKoOi9veino+mUgeeCruWhlOS/oeaBr+a1gVxuICAgICAgICAvLyBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlVubGNva1R1cnJldFZpZXddJiZ1dGlsLmNoZWtQb29sSGF2ZVR3bygpKXtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVW5sY29rVHVycmV0Vmlldyx0cnVlKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGZvcihsZXQgaSA9IDE7aTw2O2krKyl7XG4gICAgICAgIC8vICAgICB0aGlzLmNyZWF0ZVR1cnJldCh7bGV2ZWw6aSsxNixsb2NhdGlvbjppLGlzRnJlZTp0cnVlfSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB0aGlzLmNyZWF0ZVR1cnJldCh7bGV2ZWw6Nyxsb2NhdGlvbjoxMyxpc0ZyZWU6dHJ1ZX0pO1xuICAgICAgICAvLyB0aGlzLmNyZWF0ZVR1cnJldCh7bGV2ZWw6MjAsbG9jYXRpb246MTQsaXNGcmVlOnRydWV9KTtcbiAgICAgICAgLy8gdGhpcy5jcmVhdGVUdXJyZXQoe2xldmVsOjE5LGxvY2F0aW9uOjQsaXNGcmVlOnRydWV9KTtcbiAgICAgICAgLy8gdGhpcy5jcmVhdGVUdXJyZXQoe2xldmVsOjE5LGxvY2F0aW9uOjUsaXNGcmVlOnRydWV9KTtcbiAgICAgICAgLy8gdGhpcy5jcmVhdGVUdXJyZXQoe2xldmVsOjE5LGxvY2F0aW9uOjYsaXNGcmVlOnRydWV9KTtcbiAgICAgICAgLy8gdGhpcy5jcmVhdGVUdXJyZXQoe2xldmVsOjE5LGxvY2F0aW9uOjcsaXNGcmVlOnRydWV9KTtcbiAgICAgICAgLy8gdGhpcy5jcmVhdGVUdXJyZXQoe2xldmVsOjE5LGxvY2F0aW9uOjgsaXNGcmVlOnRydWV9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJvlu7rngq7loZRcbiAgICAgKiBAcGFyYW0gbGV2ZWwg562J57qnXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOS9jee9rlxuICAgICAqL1xuICAgIGNyZWF0ZVR1cnJldChkYXRhOntsZXZlbDpudW1iZXIsbG9jYXRpb246bnVtYmVyLGlzRnJlZTpib29sZWFufT17bGV2ZWw6bnVsbCxsb2NhdGlvbjpudWxsLGlzRnJlZTpmYWxzZX0sIGlzQ2xpY2tFbXB0eUJveCA9IGZhbHNlKXtcbiAgICAgICAgbGV0IGxldmVsOm51bWJlciA9IGRhdGEubGV2ZWw7XG4gICAgICAgIGxldCBsb2NhdGlvbjpudW1iZXIgPSBkYXRhLmxvY2F0aW9uO1xuICAgICAgICBcbiAgICAgICAgaWYodXRpbC51c2VyRGF0YS5wcm9kdWN0PD0wJiYhZGF0YS5pc0ZyZWUpe1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuS4jeWkn+iDvemHj1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGxvYWN0aW9uID0gbG9jYXRpb258fHV0aWwuY2hlY2tQb29sKCk7IC8v55yL55yL5piv5ZOq5LiqXG5cbiAgICAgICAgaWYobG9hY3Rpb249PW51bGwpe1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuayoeacieepuuWcsOS6hu+8jOWFiOaKiueCruWhlOWQiOaIkOaIluWbnuaUtuWQp++8gVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5aaC5p6c5pyJ5bCx55u05o6l562J57qn5rKh5pyJ5bCx6ZqP5py6XG4gICAgICAgIGxldmVsID0gbGV2ZWx8fHV0aWwuZ2V0QnV5UmFuZG9tTGV2ZWwoKTtcbiAgICAgICAgaWYoIWRhdGEuaXNGcmVlKXV0aWwuYWRkUHJvZHVjdCgtMSk7XG4gICAgICAgIHV0aWwudXNlckRhdGEuYnV5Q291bnQrPTE7XG4gICAgICAgIHV0aWwuc2F2ZVBvb2wobG9hY3Rpb24sbGV2ZWwpO1xuICAgICAgICBpZighZGF0YS5pc0ZyZWUpY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0J1eV91cGRhdGUpO1xuICAgICAgICBsZXQgaXRlbTpjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50dXJyZXRQcmUpO1xuICAgICAgICBpdGVtLmdldENvbXBvbmVudChpdGVtLm5hbWUpLmluaXQoe2xldmVsOmxldmVsLG5vOmxvYWN0aW9ufSk7XG4gICAgICAgIGl0ZW0uc2V0UGFyZW50KHRoaXMubm9kZSk7XG5cbiAgICAgICAgLy8gdGhpcy50dXJyZXRQb29sLmNyZWF0ZUVuZW15KHRoaXMubm9kZSx7bGV2ZWw6bGV2ZWwsbm86bG9hY3Rpb259KTsgICAgICBcbiAgICAgICAgXG4gICAgICAgIGlmKGlzQ2xpY2tFbXB0eUJveCl7XG4gICAgICAgICAgICBpdGVtLnNjYWxlID0gMC42O1xuICAgICAgICAgICAgY2MudHdlZW4oaXRlbSkudG8oMC4wOCwge3NjYWxlOiAxLjF9KS50bygwLjA0LCB7c2NhbGU6IDF9KS5zdGFydCgpOyAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBUcmFja01nci5lbXB0eV90cmVhc3VyZSh7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6YOWuneeuseeCueWHu2AsXG4gICAgICAgICAgICAgICAgdHVycmV0X2xldmVsOiBsZXZlbCxcbiAgICAgICAgICAgICAgICBwdW5fbnVtYmVyOmDnrKwke3V0aWwudXNlckRhdGEuY3VzdG9tcy5iaWd9LSR7dXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsfeWFs2AgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOepuumZjeWuneeuse+8iOW3sueguOW8gO+8iWBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKuW8gOWQr+iHquWKqOWQiOaIkCAqL1xuICAgIG9wZW5BdXRvKCl7XG4gICAgICAgIFxuICAgICAgICBpZighdXRpbC51c2VyRGF0YS5wcm9wW3Byb3BUeXBlLmF1dG8tMV0udXNlKXtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhcnIgPSB1dGlsLkdldFR1cnJldEF1dG8oKTtcbiAgICAgICAgaWYoIWFycilyZXR1cm47XG4gICAgICAgIGxldCBub2RlMTpjYy5Ob2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwidHVycmV0X1wiK2FyclswXS5ubyk7XG4gICAgICAgIGlmKCFub2RlMSlyZXR1cm47XG4gICAgICAgIGxldCBub2RlMjpjYy5Ob2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwidHVycmV0X1wiK2FyclsxXS5ubyk7XG4gICAgICAgIGlmKCFub2RlMilyZXR1cm47XG4gICAgICAgIGxldCBub2RlMlBvczpjYy5WZWMyID0gY2MudjIoKTtcbiAgICAgICAgaWYobm9kZTIuZ2V0UG9zaXRpb24pe1xuICAgICAgICAgICAgbm9kZTJQb3MgPSBub2RlMi5nZXRQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUxLnpJbmRleCA9IDk5O1xuXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUxKS50byguMix7eDpub2RlMlBvcy54LHk6bm9kZTJQb3MueX0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgIG5vZGUxLmdldENvbXBvbmVudCh0dXJyZXQpLkdldFR5cGUoYXJyWzFdLm5vKTtcbiAgICAgICAgfSkuc3RhcnQoKTtcblxuICAgIH1cblxuICAgIHVwZGF0ZSAoZHQpIHtcblxuICAgICAgICBpZih0aGlzLmlzT3BlbkF1dG8mJiF0aGlzLmlzVG91Y2gmJnV0aWwubGV2ZWxTdGF0ZT09Z2FtZVN0YXRlLnN0YXJ0KXtcbiAgICAgICAgICAgIHRoaXMuYXV0b1RpbWUtPWR0O1xuICAgICAgICAgICAgaWYodGhpcy5hdXRvVGltZTwwKXtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9UaW1lID0gMS41O1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkF1dG8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgXG59XG4iXX0=