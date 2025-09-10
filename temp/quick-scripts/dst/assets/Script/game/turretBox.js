
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
//#region 炮台 炮台 炮台 炮台 炮台
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
        //预加载解锁炮塔信息流
        // if(!util.adPreObj[AdPosition.UnlcokTurretView]&&util.chekPoolHaveTwo()){
        //     util.preloadAd(AdPosition.UnlcokTurretView,true);
        // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUVwQywyQ0FBdUQ7QUFDdkQsMkNBQXNDO0FBR3RDLHlEQUE2QztBQUU3QyxxQ0FBZ0M7QUFDaEMsMENBQXFDO0FBRXJDLHdCQUF3QjtBQUNsQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBTTtJQUE3QztRQUFBLHFFQXNMQztRQWpMVyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRTVCLGdCQUFVLEdBQVksS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUxQyxNQUFNO1FBQ0UsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUU3QixNQUFNO1FBQ0UsYUFBTyxHQUFZLEtBQUssQ0FBQzs7SUF5S3JDLENBQUM7SUF2S0csc0JBQVcsZ0NBQVM7YUFBcEI7WUFDSSxPQUFPLGNBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCwwQkFBTSxHQUFOO1FBQUEsaUJBeURDO1FBdkRHLFNBQVM7UUFDVCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLG1CQUFtQixFQUFFLFVBQUEsR0FBRztZQUN0QyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVULFNBQVM7UUFDVCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGtCQUFrQixFQUFFLFVBQUEsR0FBRztZQUNyQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ1YsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLElBQUks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RUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7Z0RBQ2I7SUFMbkIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXNMN0I7SUFBRCxnQkFBQztDQXRMRCxBQXNMQyxDQXRMc0MsZ0JBQU0sR0FzTDVDO2tCQXRMb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZVN0YXRlLCBwcm9wVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcG9vbCBmcm9tIFwiLi4vY29tbW9uL3Bvb2xcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbmltcG9ydCB0dXJyZXQgZnJvbSBcIi4vdHVycmV0L3R1cnJldFwiO1xuXG4vLyNyZWdpb24g54Ku5Y+wIOeCruWPsCDngq7lj7Ag54Ku5Y+wIOeCruWPsFxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHR1cnJldEJveCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBwcml2YXRlIHR1cnJldFBvb2w6IHBvb2w7IC8v5a+56LGh5rGgXG5cbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLngq7loZRcIiwgdHlwZTogY2MuUHJlZmFiIH0pXG4gICAgcHJpdmF0ZSB0dXJyZXRQcmU6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzT3BlbkF1dG86IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWQr+WKqFxuXG4gICAgLy/lkIjmiJDml7bpl7RcbiAgICBwcml2YXRlIGF1dG9UaW1lOiBudW1iZXIgPSAxO1xuXG4gICAgLy/mmK/lkKbmi7/otbdcbiAgICBwcml2YXRlIGlzVG91Y2g6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBnZXQgX3VzZXJEYXRhKCk6IFVzZXJEYXRhIHtcbiAgICAgICAgcmV0dXJuIHV0aWwudXNlckRhdGE7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgICAgIC8vIOebkeWQrOWIm+W7uueCruWPsFxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1R1cnJldF9DcmVhdG9yLCByZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVUdXJyZXQocmVzKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy8g55uR5ZCs6ZSA5q+B54Ku5Y+wXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHVycmV0X0tpbGxlZCwgcmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMubm9kZSkge1xuICAgICAgICAgICAgICAgIHJlcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICByZXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgcmVzLm5vZGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcy5ubyB8fCByZXMubm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChcInR1cnJldF9iZ19cIiArIHJlcy5ubyk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFwidHVycmV0X2xhYmVsX1wiICsgcmVzLm5vKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoaXMudHVycmV0UG9vbC5vbkVuZW15S2lsbGVkKHJlcyk7XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy8g55uR5ZCs6Ieq5Yqo5ZCI5oiQXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLlRvb2xfRWZmZWN0X05hbWUuR2FtZV9Qcm9wX0F0dW8sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQXV0byA9IHRydWU7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIOebkeWQrOWFs+mXreiHquWKqOWQiOaIkFxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5DbG9zZV9Qcm9wX0F0dW8sICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YWz6Zet6Ieq5Yqo5ZCI5oiQXCIpO1xuICAgICAgICAgICAgdGhpcy5pc09wZW5BdXRvID0gZmFsc2U7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIOaLv+i1t1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1R1cnJldF9QaWNrVXAsIChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNUb3VjaCA9IHRydWU7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIOaUvuS4i1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1R1cnJldF9QdXREb3duLCAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzVG91Y2ggPSBmYWxzZTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy/ngrnlh7vkuobnqbrlnLDlrp3nrrFcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuQ2xpY2tfRW1wdHlfQm94LCAobm8pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVHVycmV0KHsgbGV2ZWw6IG51bGwsIGxvY2F0aW9uOiBubywgaXNGcmVlOiB0cnVlIH0sIHRydWUpO1xuICAgICAgICB9LCB0aGlzKTtcblxuXG4gICAgICAgIC8vIHRoaXMubG9hZEFueShcInByZWZhYi90dXJyZXQvdHVycmV0XCIsY2MuUHJlZmFiLChyZXMpPT57ICAgICAgICAgICAgXG4gICAgICAgIC8vIHRoaXMudHVycmV0UG9vbCA9IG5ldyBwb29sKHJlcywxNik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudHVycmV0UG9vbCwndHVycmV0UG9vbCcpXG5cbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgdGhpcy5pbml0VHVycmV0KCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDov5jljp/nlKjmiLfngq7loZRcbiAgICAgKi9cbiAgICBpbml0VHVycmV0KCkge1xuICAgICAgICBpZiAodXRpbCAmJiB0aGlzLl91c2VyRGF0YSAmJiB0aGlzLl91c2VyRGF0YS5wb29sKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/mOWOn+eUqOaIt+eCruWhlOaVsOaNrlwiLCB0aGlzLl91c2VyRGF0YS5wb29sKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJEYXRhLnBvb2wuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZXZlbCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUdXJyZXQoeyBsZXZlbDogaXRlbS5sZXZlbCwgbG9jYXRpb246IGl0ZW0ubm8sIGlzRnJlZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v6aKE5Yqg6L296Kej6ZSB54Ku5aGU5L+h5oGv5rWBXG4gICAgICAgIC8vIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVW5sY29rVHVycmV0Vmlld10mJnV0aWwuY2hla1Bvb2xIYXZlVHdvKCkpe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5Vbmxjb2tUdXJyZXRWaWV3LHRydWUpO1xuICAgICAgICAvLyB9XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIm+W7uueCruWhlFxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqdcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24g5L2N572uXG4gICAgICovXG4gICAgY3JlYXRlVHVycmV0KGRhdGE6IHsgbGV2ZWw6IG51bWJlciwgbG9jYXRpb246IG51bWJlciwgaXNGcmVlOiBib29sZWFuIH0gPSB7IGxldmVsOiBudWxsLCBsb2NhdGlvbjogbnVsbCwgaXNGcmVlOiBmYWxzZSB9LCBpc0NsaWNrRW1wdHlCb3ggPSBmYWxzZSkge1xuICAgICAgICBsZXQgbGV2ZWw6IG51bWJlciA9IGRhdGEubGV2ZWw7XG4gICAgICAgIGxldCBsb2NhdGlvbjogbnVtYmVyID0gZGF0YS5sb2NhdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fdXNlckRhdGEucHJvZHVjdCA8PSAwICYmICFkYXRhLmlzRnJlZSkge1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KCd0aXBzLkluc3VmZmljaWVudEVuZXJneScpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2FjdGlvbiA9IGxvY2F0aW9uIHx8IHV0aWwuY2hlY2tQb29sKCk7IC8v55yL55yL5piv5ZOq5LiqXG5cbiAgICAgICAgaWYgKGxvYWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodCgndGlwcy5ub0VtcHR5U3BhY2UnKSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KCd0aXBzLm5vRW1wdHlTcGFjZTInKSk7XG4gICAgICAgICAgICB9LCAwLjUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlpoLmnpzmnInlsLHnm7TmjqXnrYnnuqfmsqHmnInlsLHpmo/mnLpcbiAgICAgICAgbGV2ZWwgPSBsZXZlbCB8fCB1dGlsLmdldEJ1eVJhbmRvbUxldmVsKCk7XG4gICAgICAgIGlmICghZGF0YS5pc0ZyZWUpIHV0aWwuYWRkUHJvZHVjdCgtMSk7XG4gICAgICAgIHRoaXMuX3VzZXJEYXRhLmJ1eUNvdW50ICs9IDE7XG4gICAgICAgIHV0aWwuc2F2ZVBvb2wobG9hY3Rpb24sIGxldmVsKTtcbiAgICAgICAgaWYgKCFkYXRhLmlzRnJlZSkgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0J1eV91cGRhdGUpO1xuICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudHVycmV0UHJlKTtcbiAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoaXRlbS5uYW1lKS5pbml0KHsgbGV2ZWw6IGxldmVsLCBubzogbG9hY3Rpb24gfSk7XG4gICAgICAgIGl0ZW0uc2V0UGFyZW50KHRoaXMubm9kZSk7XG5cbiAgICAgICAgLy8gdGhpcy50dXJyZXRQb29sLmNyZWF0ZUVuZW15KHRoaXMubm9kZSx7bGV2ZWw6bGV2ZWwsbm86bG9hY3Rpb259KTsgICAgICBcblxuICAgICAgICBpZiAoaXNDbGlja0VtcHR5Qm94KSB7XG4gICAgICAgICAgICBpdGVtLnNjYWxlID0gMC42O1xuICAgICAgICAgICAgY2MudHdlZW4oaXRlbSkudG8oMC4wOCwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMDQsIHsgc2NhbGU6IDEgfSkuc3RhcnQoKTtcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKirlvIDlkK/oh6rliqjlkIjmiJAgKi9cbiAgICAvKioqKioqKioqKioqKioq6Ieq5Yqo5ZCI5oiQ54Ku5Y+wKioqKioqKioqKiogKi9cbiAgICBvcGVuQXV0bygpIHtcblxuICAgICAgICAvLyBpZighdGhpcy5fdXNlckRhdGEucHJvcFtwcm9wVHlwZS5hdXRvLTFdLnVzZSl7XG4gICAgICAgIC8vICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGxldCBhcnIgPSB1dGlsLkdldFR1cnJldEF1dG8oKTtcbiAgICAgICAgaWYgKCFhcnIpIHJldHVybjtcbiAgICAgICAgbGV0IG5vZGUxOiBjYy5Ob2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwidHVycmV0X1wiICsgYXJyWzBdLm5vKTtcbiAgICAgICAgaWYgKCFub2RlMSkgcmV0dXJuO1xuICAgICAgICBsZXQgbm9kZTI6IGNjLk5vZGUgPSB1dGlsLkdsb2JhbE1hcC5nZXQoXCJ0dXJyZXRfXCIgKyBhcnJbMV0ubm8pO1xuICAgICAgICBpZiAoIW5vZGUyKSByZXR1cm47XG4gICAgICAgIGxldCBub2RlMlBvczogY2MuVmVjMiA9IGNjLnYyKCk7XG4gICAgICAgIGlmIChub2RlMi5nZXRQb3NpdGlvbikge1xuICAgICAgICAgICAgbm9kZTJQb3MgPSBub2RlMi5nZXRQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUxLnpJbmRleCA9IDk5O1xuXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUxKS50byguMiwgeyB4OiBub2RlMlBvcy54LCB5OiBub2RlMlBvcy55IH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgbm9kZTEuZ2V0Q29tcG9uZW50KHR1cnJldCkuR2V0VHlwZShhcnJbMV0ubm8pO1xuICAgICAgICB9KS5zdGFydCgpO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3BlbkF1dG8gJiYgIXRoaXMuaXNUb3VjaCAmJiB1dGlsLmxldmVsU3RhdGUgPT0gZ2FtZVN0YXRlLnN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9UaW1lIC09IGR0O1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1RpbWUgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvVGltZSA9IDAuNTsgLy8g5ZCI5oiQ5pe26Ze0XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQXV0bygpO1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfQ3JlYXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuIl19