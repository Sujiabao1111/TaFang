
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcdHVycmV0UmVjeWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLHFDQUFnQztBQUUxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBTTtJQUFqRDtRQUFBLHFFQXVFQztRQXBFRyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixhQUFPLEdBQWdCLElBQUksQ0FBQztRQUU1QixPQUFPO1FBQ0MsYUFBTyxHQUFXLEtBQUssQ0FBQztRQUV4QixXQUFLLEdBQVUsSUFBSSxDQUFDOztJQTREaEMsQ0FBQztJQXRERyw4QkFBTSxHQUFOO1FBQUEsaUJBdUJDO1FBcEJHLElBQUk7UUFDSixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGtCQUFrQixFQUFDLFVBQUMsR0FBRztZQUNyQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixLQUFJLENBQUMsVUFBVSxHQUFHLGNBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsSUFBRyxLQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDdkIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1FBQ0wsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRVIsSUFBSTtRQUNKLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsbUJBQW1CLEVBQUMsVUFBQyxHQUFHO1lBQ3RDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUlaLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0NBQVEsR0FBUjtRQUdJLE1BQU07UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLGNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRDs7T0FFRztJQUNILGlDQUFTLEdBQVQsVUFBVSxLQUFpQixFQUFDLElBQVc7UUFFbkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEdBQUMsR0FBRyxHQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLEtBQUssRUFBRSxFQUFrQjtZQUNqSixLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFuRUQ7UUFEQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLENBQUM7cURBQ2Y7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsR0FBRyxFQUFDLENBQUM7a0RBQ2pCO0lBTlgsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXVFakM7SUFBRCxvQkFBQztDQXZFRCxBQXVFQyxDQXZFMEMsZ0JBQU0sR0F1RWhEO2tCQXZFb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHVycmV0UmVjeWNsZSBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi562J57qnXCIsdHlwZTpjYy5MYWJlbH0pXG4gICAgbGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpzcC5Ta2VsZXRvbixkaXNwbGF5TmFtZTpcIueCrlwifSlcbiAgICBwYW9Cb2R5OiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICAvL+aYr+WQpuWcqOaOpeinplxuICAgIHByaXZhdGUgaXNUb3VjaDpib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGxldmVsOm51bWJlciA9IG51bGw7XG5cbiAgICBwcml2YXRlIHRhcmdldE5vZGU6Y2MuTm9kZSA7XG5cbiAgICBwcml2YXRlIHR1cnJldERhdGE6YW55O1xuXG4gICAgb25Mb2FkICgpIHtcblxuXG4gICAgICAgIC8v5ou/6LW3XG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHVycmV0X1BpY2tVcCwocmVzKT0+e1xuICAgICAgICAgICAgdGhpcy5pc1RvdWNoID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Tm9kZSA9IHV0aWwuR2xvYmFsTWFwLmdldChcInR1cnJldF9cIityZXMuaG9zdCk7XG4gICAgICAgICAgICBpZih0aGlzLmxldmVsICE9PSByZXMubGV2ZWwpe1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwgPSByZXMubGV2ZWw7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMZXZlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIC8v5pS+5LiLXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHVycmV0X1B1dERvd24sKHJlcyk9PntcbiAgICAgICAgICAgIHRoaXMuaXNUb3VjaCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50YXJnZXROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjYy53aW5TaXplLndpZHRoLDApO1xuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgaWYodGhpcy5pc1RvdWNoICYmIHRoaXMudGFyZ2V0Tm9kZSl7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy50YXJnZXROb2RlLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw54Ku5aGUXG4gICAgICovXG4gICAgc2V0TGV2ZWwoKXtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvL+eCruWhlOWxnuaAp1xuICAgICAgICB0aGlzLnR1cnJldERhdGEgPSB1dGlsLkdldFR1cnJldERhdGEodGhpcy5sZXZlbCk7XG5cbiAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IFN0cmluZyh0aGlzLmxldmVsKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9hZFNwaW5lKHRoaXMucGFvQm9keSxcInBhb1wiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mHXG4gICAgICovXG4gICAgbG9hZFNwaW5lKHNwaW5lOnNwLlNrZWxldG9uLG5hbWU6c3RyaW5nKXtcblxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcInNwaW5lL3R1cnJldC9cIit0aGlzLnR1cnJldERhdGEuRHluYW1pY1Jlc291cmNlcytcIi9cIituYW1lK1wiL1wiK3RoaXMudHVycmV0RGF0YS5zcGluZU5hbWUsc3AuU2tlbGV0b25EYXRhLCAoZXJyb3IsIHNwOnNwLlNrZWxldG9uRGF0YSkgPT4ge1xuICAgICAgICAgICAgc3BpbmUuc2tlbGV0b25EYXRhID0gc3A7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuIl19