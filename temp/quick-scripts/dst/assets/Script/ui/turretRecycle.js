
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/turretRecycle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9745aWTyl5EqaFFx9uR9EGh', 'turretRecycle');
// Script/ui/turretRecycle.ts

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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretRecycle = /** @class */ (function (_super) {
    __extends(turretRecycle, _super);
    function turretRecycle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelLabel = null;
        _this.paoBody = null;
        //是否在接触
        _this.isTouch = false;
        _this.level = null;
        return _this;
    }
    turretRecycle.prototype.onLoad = function () {
        var _this = this;
        //拿起
        cc.game.on(NameTs_1.default.Game_Turret_PickUp, function (res) {
            _this.isTouch = true;
            _this.targetNode = util_1.default.GlobalMap.get("turret_" + res.host);
            if (_this.level !== res.level) {
                _this.level = res.level;
                _this.setLevel();
            }
        }, this);
        //放下
        cc.game.on(NameTs_1.default.Game_Turret_PutDown, function (res) {
            _this.isTouch = false;
            _this.targetNode = null;
            _this.node.setPosition(cc.winSize.width, 0);
        }, this);
    };
    turretRecycle.prototype.update = function () {
        if (this.isTouch && this.targetNode) {
            this.node.setPosition(this.targetNode.getPosition());
        }
    };
    /**
     * 更新炮塔
     */
    turretRecycle.prototype.setLevel = function () {
        //炮塔属性
        this.turretData = util_1.default.GetTurretData(this.level);
        this.levelLabel.string = String(this.level);
        this.loadSpine(this.paoBody, "pao");
    };
    /**
     * 加载图片
     */
    turretRecycle.prototype.loadSpine = function (spine, name) {
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + this.turretData.spineName, sp.SkeletonData, function (error, sp) {
            spine.skeletonData = sp;
        });
    };
    __decorate([
        property({ displayName: "等级", type: cc.Label })
    ], turretRecycle.prototype, "levelLabel", void 0);
    __decorate([
        property({ type: sp.Skeleton, displayName: "炮" })
    ], turretRecycle.prototype, "paoBody", void 0);
    turretRecycle = __decorate([
        ccclass
    ], turretRecycle);
    return turretRecycle;
}(baseTs_1.default));
exports.default = turretRecycle;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcdHVycmV0UmVjeWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBTTtJQUFqRDtRQUFBLHFFQW1FQztRQWhFRyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixhQUFPLEdBQWdCLElBQUksQ0FBQztRQUU1QixPQUFPO1FBQ0MsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixXQUFLLEdBQVcsSUFBSSxDQUFDOztJQXdEakMsQ0FBQztJQWxERyw4QkFBTSxHQUFOO1FBQUEsaUJBdUJDO1FBcEJHLElBQUk7UUFDSixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGtCQUFrQixFQUFFLFVBQUMsR0FBRztZQUN0QyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixLQUFJLENBQUMsVUFBVSxHQUFHLGNBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxLQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0JBQzFCLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDdkIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1FBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSTtRQUNKLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxHQUFHO1lBQ3ZDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRS9DLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUliLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0NBQVEsR0FBUjtRQUNJLE1BQU07UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLGNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNILGlDQUFTLEdBQVQsVUFBVSxLQUFrQixFQUFFLElBQVk7UUFDdEMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLEtBQUssRUFBRSxFQUFtQjtZQUM3SixLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUEvREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7cURBQ3BCO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDO2tEQUN0QjtJQU5YLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FtRWpDO0lBQUQsb0JBQUM7Q0FuRUQsQUFtRUMsQ0FuRTBDLGdCQUFNLEdBbUVoRDtrQkFuRW9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHVycmV0UmVjeWNsZSBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLnrYnnuqdcIiwgdHlwZTogY2MuTGFiZWwgfSlcbiAgICBsZXZlbExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBzcC5Ta2VsZXRvbiwgZGlzcGxheU5hbWU6IFwi54KuXCIgfSlcbiAgICBwYW9Cb2R5OiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICAvL+aYr+WQpuWcqOaOpeinplxuICAgIHByaXZhdGUgaXNUb3VjaDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBsZXZlbDogbnVtYmVyID0gbnVsbDtcblxuICAgIHByaXZhdGUgdGFyZ2V0Tm9kZTogY2MuTm9kZTtcblxuICAgIHByaXZhdGUgdHVycmV0RGF0YTogYW55O1xuXG4gICAgb25Mb2FkKCkge1xuXG5cbiAgICAgICAgLy/mi7/otbdcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UdXJyZXRfUGlja1VwLCAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzVG91Y2ggPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50YXJnZXROb2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwidHVycmV0X1wiICsgcmVzLmhvc3QpO1xuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWwgIT09IHJlcy5sZXZlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwgPSByZXMubGV2ZWw7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMZXZlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvL+aUvuS4i1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1R1cnJldF9QdXREb3duLCAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzVG91Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCwgMCk7XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cblxuXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5pc1RvdWNoICYmIHRoaXMudGFyZ2V0Tm9kZSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMudGFyZ2V0Tm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOeCruWhlFxuICAgICAqL1xuICAgIHNldExldmVsKCkge1xuICAgICAgICAvL+eCruWhlOWxnuaAp1xuICAgICAgICB0aGlzLnR1cnJldERhdGEgPSB1dGlsLkdldFR1cnJldERhdGEodGhpcy5sZXZlbCk7XG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSBTdHJpbmcodGhpcy5sZXZlbCk7XG4gICAgICAgIHRoaXMubG9hZFNwaW5lKHRoaXMucGFvQm9keSwgXCJwYW9cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mHXG4gICAgICovXG4gICAgbG9hZFNwaW5lKHNwaW5lOiBzcC5Ta2VsZXRvbiwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFwic3BpbmUvdHVycmV0L1wiICsgdGhpcy50dXJyZXREYXRhLkR5bmFtaWNSZXNvdXJjZXMgKyBcIi9cIiArIG5hbWUgKyBcIi9cIiArIHRoaXMudHVycmV0RGF0YS5zcGluZU5hbWUsIHNwLlNrZWxldG9uRGF0YSwgKGVycm9yLCBzcDogc3AuU2tlbGV0b25EYXRhKSA9PiB7XG4gICAgICAgICAgICBzcGluZS5za2VsZXRvbkRhdGEgPSBzcDtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=