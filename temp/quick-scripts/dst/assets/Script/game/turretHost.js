
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRIb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLHFDQUFnQztBQUNoQywwQ0FBcUM7QUFFL0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQU07SUFBOUM7UUFBQSxxRUEwQ0M7UUF2Q1csZUFBUyxHQUFhLElBQUksQ0FBQztRQUVuQyxVQUFVO1FBQ0YsY0FBUSxHQUFVLElBQUksQ0FBQzs7SUFvQ25DLENBQUM7SUFsQ0csMkJBQU0sR0FBTjtRQUFBLGlCQVdDO1FBVEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTNDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsYUFBYSxFQUFDLFVBQUMsR0FBRztZQUNoQyxJQUFHLEdBQUcsSUFBSSxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtRQUVMLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUVaLENBQUM7SUFFRDs7O09BR0c7SUFDSCwrQkFBVSxHQUFWLFVBQVcsS0FBWTtRQUNuQixJQUFJLElBQUksR0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLE9BQUEsRUFBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQztRQUMxQyx3REFBd0Q7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQXBDRDtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQztpREFDVDtJQUhsQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMEM5QjtJQUFELGlCQUFDO0NBMUNELEFBMENDLENBMUN1QyxnQkFBTSxHQTBDN0M7a0JBMUNvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbmltcG9ydCB0dXJyZXQgZnJvbSBcIi4vdHVycmV0L3R1cnJldFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHR1cnJldEhvc3QgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIueCruWhlFwiLHR5cGU6Y2MuUHJlZmFifSlcbiAgICBwcml2YXRlIHR1cnJldFByZTpjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgLyoq54Ku5aGUanMgKi9cbiAgICBwcml2YXRlIHR1cnJldEpzOnR1cnJldCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKXtcblxuICAgICAgICB0aGlzLmluaXRUdXJyZXQodXRpbC51c2VyRGF0YS50dXJyZXRMZXZlbCk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Qb3BfT3BlbiwocmVzKT0+e1xuICAgICAgICAgICAgaWYocmVzID09IHBhZ2VUcy5wYWdlTmFtZS5HYW1lVXBncmFkZSl7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUdXJyZXJ0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi/mOWOn+eUqOaIt+eCruWhlFxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqdcbiAgICAgKi9cbiAgICBpbml0VHVycmV0KGxldmVsOm51bWJlcil7XG4gICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnR1cnJldFByZSk7XG4gICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGl0ZW0ubmFtZSkuaW5pdCh7bGV2ZWx9KTtcbiAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcbiAgICAgICAgaXRlbS5zZXRQb3NpdGlvbigxMCwzMjApO1xuICAgICAgICB0aGlzLnR1cnJldEpzID0gaXRlbS5nZXRDb21wb25lbnQodHVycmV0KTtcbiAgICAgICAgLy8gdGhpcy5jcmVhdGVUdXJyZXQoe2xldmVsOjM4LGxvY2F0aW9uOjEsaXNGcmVlOnRydWV9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDngq7loZRcbiAgICAgKi9cbiAgICB1cGRhdGVUdXJyZXJ0KCl7XG4gICAgICAgIHRoaXMudHVycmV0SnMudXBMZXZlbCgpO1xuICAgIH1cblxuICAgIFxufVxuIl19