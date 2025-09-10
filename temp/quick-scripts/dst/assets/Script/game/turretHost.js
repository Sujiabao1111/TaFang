
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/turretHost.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d959K8TulDcb2FXDuEbPKg', 'turretHost');
// Script/game/turretHost.ts

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
var pageTs_1 = require("../common/pageTs");
var util_1 = require("../util/util");
var turret_1 = require("./turret/turret");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretHost = /** @class */ (function (_super) {
    __extends(turretHost, _super);
    function turretHost() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.turretPre = null;
        /**炮塔js */
        _this.turretJs = null;
        return _this;
    }
    turretHost.prototype.onLoad = function () {
        var _this = this;
        this.initTurret(util_1.default.userData.turretLevel);
        cc.game.on(NameTs_1.default.Game_Pop_Open, function (res) {
            if (res == pageTs_1.default.pageName.GameUpgrade) {
                _this.updateTurrert();
            }
        }, this);
    };
    /**
     * 还原用户炮塔
     * @param level 等级
     */
    turretHost.prototype.initTurret = function (level) {
        var item = cc.instantiate(this.turretPre);
        item.getComponent(item.name).init({ level: level });
        item.setParent(this.node);
        item.setPosition(10, 320);
        this.turretJs = item.getComponent(turret_1.default);
        // this.createTurret({level:38,location:1,isFree:true});
    };
    /**
     * 更新炮塔
     */
    turretHost.prototype.updateTurrert = function () {
        this.turretJs.upLevel();
    };
    __decorate([
        property({ displayName: "炮塔", type: cc.Prefab })
    ], turretHost.prototype, "turretPre", void 0);
    turretHost = __decorate([
        ccclass
    ], turretHost);
    return turretHost;
}(baseTs_1.default));
exports.default = turretHost;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRIb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLHFDQUFnQztBQUNoQywwQ0FBcUM7QUFFL0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQU07SUFBOUM7UUFBQSxxRUEwQ0M7UUF2Q1csZUFBUyxHQUFjLElBQUksQ0FBQztRQUVwQyxVQUFVO1FBQ0YsY0FBUSxHQUFXLElBQUksQ0FBQzs7SUFvQ3BDLENBQUM7SUFsQ0csMkJBQU0sR0FBTjtRQUFBLGlCQVdDO1FBVEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTNDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsYUFBYSxFQUFFLFVBQUMsR0FBRztZQUNqQyxJQUFJLEdBQUcsSUFBSSxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BDLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtRQUVMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUViLENBQUM7SUFFRDs7O09BR0c7SUFDSCwrQkFBVSxHQUFWLFVBQVcsS0FBYTtRQUNwQixJQUFJLElBQUksR0FBWSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQztRQUMxQyx3REFBd0Q7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQXBDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpREFDYjtJQUhuQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMEM5QjtJQUFELGlCQUFDO0NBMUNELEFBMENDLENBMUN1QyxnQkFBTSxHQTBDN0M7a0JBMUNvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbmltcG9ydCB0dXJyZXQgZnJvbSBcIi4vdHVycmV0L3R1cnJldFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHVycmV0SG9zdCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLngq7loZRcIiwgdHlwZTogY2MuUHJlZmFiIH0pXG4gICAgcHJpdmF0ZSB0dXJyZXRQcmU6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICAvKirngq7loZRqcyAqL1xuICAgIHByaXZhdGUgdHVycmV0SnM6IHR1cnJldCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgdGhpcy5pbml0VHVycmV0KHV0aWwudXNlckRhdGEudHVycmV0TGV2ZWwpO1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfUG9wX09wZW4sIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMgPT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVVcGdyYWRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUdXJyZXJ0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDov5jljp/nlKjmiLfngq7loZRcbiAgICAgKiBAcGFyYW0gbGV2ZWwg562J57qnXG4gICAgICovXG4gICAgaW5pdFR1cnJldChsZXZlbDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpdGVtOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50dXJyZXRQcmUpO1xuICAgICAgICBpdGVtLmdldENvbXBvbmVudChpdGVtLm5hbWUpLmluaXQoeyBsZXZlbCB9KTtcbiAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcbiAgICAgICAgaXRlbS5zZXRQb3NpdGlvbigxMCwgMzIwKTtcbiAgICAgICAgdGhpcy50dXJyZXRKcyA9IGl0ZW0uZ2V0Q29tcG9uZW50KHR1cnJldCk7XG4gICAgICAgIC8vIHRoaXMuY3JlYXRlVHVycmV0KHtsZXZlbDozOCxsb2NhdGlvbjoxLGlzRnJlZTp0cnVlfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw54Ku5aGUXG4gICAgICovXG4gICAgdXBkYXRlVHVycmVydCgpIHtcbiAgICAgICAgdGhpcy50dXJyZXRKcy51cExldmVsKCk7XG4gICAgfVxuXG5cbn1cbiJdfQ==