
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/turretLevel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3d18eUK0idBp4wmpcVl2vZo', 'turretLevel');
// Script/ui/turretLevel.ts

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
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretLevel = /** @class */ (function (_super) {
    __extends(turretLevel, _super);
    function turretLevel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelLabel = null;
        _this.rbmLabel = null;
        _this.lightNode = null;
        // @property({type:sp.Skeleton,displayName:"炮"})
        // paoBody: sp.Skeleton = null;
        _this.rmbProgress = null;
        _this.level = null;
        _this.data = [
        // {
        //     amount:0.1,
        //     level:10,
        // },
        // {
        //     amount:0.3,
        //     level:20,
        // },
        ];
        //当前进行
        _this.nowNo = 0;
        return _this;
    }
    turretLevel.prototype.onLoad = function () {
        cc.tween(this.rbmLabel.node.getParent()).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
        cc.tween(this.lightNode).by(1, { angle: -360 }).repeatForever().start();
    };
    turretLevel.prototype.update = function () {
    };
    /**
     * 更新炮塔
     */
    turretLevel.prototype.setLevel = function () {
        //炮塔属性
        if (this.data.length == 0) {
            this.node.active = false;
            return;
        }
        this.turretData = util_1.default.GetTurretData(this.data[this.nowNo].level);
        //this.rbmLabel.string = this.data[this.nowNo].amount+"元";
        this.levelLabel.string = "Lv" + this.data[this.nowNo].level;
        this.rmbProgress.progress = util_1.default.userData.turretLevel / this.data[this.nowNo].level;
        // this.loadSpine(this.paoBody,"pao");
        this.setState();
    };
    /**
     * 设置状态
     */
    turretLevel.prototype.setState = function () {
        console.log(this.rmbProgress.progress >= 1, 'this.rmbProgress.progress>=1');
        this.lightNode.active = this.rmbProgress.progress >= 1;
        this.lightNode.stopAllActions();
        if (this.lightNode.active) {
            cc.tween(this.lightNode).by(1, { angle: -360 }).repeatForever().start();
        }
    };
    /**
     * 加载图片
     */
    turretLevel.prototype.loadSpine = function (spine, name) {
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + this.turretData.spineName, sp.SkeletonData, function (error, sp) {
            spine.skeletonData = sp;
        });
    };
    __decorate([
        property({ displayName: "等级", type: cc.Label })
    ], turretLevel.prototype, "levelLabel", void 0);
    __decorate([
        property({ displayName: "renminb", type: cc.Label })
    ], turretLevel.prototype, "rbmLabel", void 0);
    __decorate([
        property({ displayName: "光", type: cc.Node })
    ], turretLevel.prototype, "lightNode", void 0);
    __decorate([
        property({ type: cc.ProgressBar, displayName: "进度" })
    ], turretLevel.prototype, "rmbProgress", void 0);
    turretLevel = __decorate([
        ccclass
    ], turretLevel);
    return turretLevel;
}(baseTs_1.default));
exports.default = turretLevel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcdHVycmV0TGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBSXBDLHFDQUFnQztBQUUxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQTZGQztRQTFGRyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsZ0RBQWdEO1FBQ2hELCtCQUErQjtRQUcvQixpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHM0IsV0FBSyxHQUFVLElBQUksQ0FBQztRQUlwQixVQUFJLEdBQUc7UUFDWCxJQUFJO1FBQ0osa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixLQUFLO1FBQ0wsSUFBSTtRQUNKLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsS0FBSztTQUNSLENBQUM7UUFFRixNQUFNO1FBQ0UsV0FBSyxHQUFVLENBQUMsQ0FBQzs7SUEyRDdCLENBQUM7SUExREcsNEJBQU0sR0FBTjtRQUlJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQ2xELEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUNoRCxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRVYsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMs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NkY5QztrQkE3Rm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHVycmV0TGV2ZWwgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIuetiee6p1wiLHR5cGU6Y2MuTGFiZWx9KVxuICAgIGxldmVsTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwicmVubWluYlwiLHR5cGU6Y2MuTGFiZWx9KVxuICAgIHJibUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIuWFiVwiLHR5cGU6Y2MuTm9kZX0pXG4gICAgbGlnaHROb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6c3AuU2tlbGV0b24sZGlzcGxheU5hbWU6XCLngq5cIn0pXG4gICAgLy8gcGFvQm9keTogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlByb2dyZXNzQmFyLGRpc3BsYXlOYW1lOlwi6L+b5bqmXCJ9KVxuICAgIHJtYlByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG5cblxuICAgIHByaXZhdGUgbGV2ZWw6bnVtYmVyID0gbnVsbDtcblxuICAgIHByaXZhdGUgdHVycmV0RGF0YTphbnk7XG5cbiAgICBwcml2YXRlIGRhdGEgPSBbXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIGFtb3VudDowLjEsXG4gICAgICAgIC8vICAgICBsZXZlbDoxMCxcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgYW1vdW50OjAuMyxcbiAgICAgICAgLy8gICAgIGxldmVsOjIwLFxuICAgICAgICAvLyB9LFxuICAgIF07XG5cbiAgICAvL+W9k+WJjei/m+ihjFxuICAgIHByaXZhdGUgbm93Tm86bnVtYmVyID0gMDtcbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgXG5cbiAgICAgICAgY2MudHdlZW4odGhpcy5yYm1MYWJlbC5ub2RlLmdldFBhcmVudCgpKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMyx7YW5nbGU6MTB9KS50byguMix7YW5nbGU6MH0pXG4gICAgICAgICkuc3RhcnQoKTtcblxuICAgICAgICBjYy50d2Vlbih0aGlzLmxpZ2h0Tm9kZSkuYnkoMSx7YW5nbGU6LTM2MH0pLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDngq7loZRcbiAgICAgKi9cbiAgICBzZXRMZXZlbCgpe1xuICAgICAgICAvL+eCruWhlOWxnuaAp1xuICAgICAgICBpZih0aGlzLmRhdGEubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMudHVycmV0RGF0YSA9IHV0aWwuR2V0VHVycmV0RGF0YSh0aGlzLmRhdGFbdGhpcy5ub3dOb10ubGV2ZWwpO1xuICAgICAgICAvL3RoaXMucmJtTGFiZWwuc3RyaW5nID0gdGhpcy5kYXRhW3RoaXMubm93Tm9dLmFtb3VudCtcIuWFg1wiO1xuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gXCJMdlwiK3RoaXMuZGF0YVt0aGlzLm5vd05vXS5sZXZlbDtcbiAgICAgICAgdGhpcy5ybWJQcm9ncmVzcy5wcm9ncmVzcyAgPSB1dGlsLnVzZXJEYXRhLnR1cnJldExldmVsL3RoaXMuZGF0YVt0aGlzLm5vd05vXS5sZXZlbDtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMubG9hZFNwaW5lKHRoaXMucGFvQm9keSxcInBhb1wiKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9rueKtuaAgVxuICAgICAqL1xuICAgIHNldFN0YXRlKCl7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJtYlByb2dyZXNzLnByb2dyZXNzPj0xLCd0aGlzLnJtYlByb2dyZXNzLnByb2dyZXNzPj0xJylcbiAgICAgICAgdGhpcy5saWdodE5vZGUuYWN0aXZlID0gdGhpcy5ybWJQcm9ncmVzcy5wcm9ncmVzcz49MTtcblxuICAgICAgICB0aGlzLmxpZ2h0Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5saWdodE5vZGUuYWN0aXZlKXtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubGlnaHROb2RlKS5ieSgxLHthbmdsZTotMzYwfSkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3lm77niYdcbiAgICAgKi9cbiAgICBsb2FkU3BpbmUoc3BpbmU6c3AuU2tlbGV0b24sbmFtZTpzdHJpbmcpe1xuXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFwic3BpbmUvdHVycmV0L1wiK3RoaXMudHVycmV0RGF0YS5EeW5hbWljUmVzb3VyY2VzK1wiL1wiK25hbWUrXCIvXCIrdGhpcy50dXJyZXREYXRhLnNwaW5lTmFtZSxzcC5Ta2VsZXRvbkRhdGEsIChlcnJvciwgc3A6c3AuU2tlbGV0b25EYXRhKSA9PiB7XG4gICAgICAgICAgICBzcGluZS5za2VsZXRvbkRhdGEgPSBzcDtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=