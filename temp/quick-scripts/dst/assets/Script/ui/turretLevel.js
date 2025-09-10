
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
        // cc.tween(this.rbmLabel.node.getParent()).repeatForever(
        //     cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        // ).start();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcdHVycmV0TGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBSXBDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQTRGQztRQXpGRyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsZ0RBQWdEO1FBQ2hELCtCQUErQjtRQUcvQixpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHM0IsV0FBSyxHQUFXLElBQUksQ0FBQztRQUlyQixVQUFJLEdBQUc7UUFDWCxJQUFJO1FBQ0osa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixLQUFLO1FBQ0wsSUFBSTtRQUNKLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsS0FBSztTQUNSLENBQUM7UUFFRixNQUFNO1FBQ0UsV0FBSyxHQUFXLENBQUMsQ0FBQzs7SUEwRDlCLENBQUM7SUF6REcsNEJBQU0sR0FBTjtRQUlJLDBEQUEwRDtRQUMxRCw0REFBNEQ7UUFDNUQsYUFBYTtRQUViLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVFLENBQUM7SUFFRCw0QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVEOztPQUVHO0lBQ0gsOEJBQVEsR0FBUjtRQUNJLE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDekIsT0FBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xFLDBEQUEwRDtRQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVwRixzQ0FBc0M7UUFFdEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRDs7T0FFRztJQUNILDhCQUFRLEdBQVI7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFBO1FBQzNFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRWhDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0U7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwrQkFBUyxHQUFULFVBQVUsS0FBa0IsRUFBRSxJQUFZO1FBQ3RDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxLQUFLLEVBQUUsRUFBbUI7WUFDN0osS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBeEZEO1FBREMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO21EQUNwQjtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpREFDM0I7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7a0RBQ3BCO0lBTTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO29EQUNuQjtJQWZsQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBNEYvQjtJQUFELGtCQUFDO0NBNUZELEFBNEZDLENBNUZ3QyxnQkFBTSxHQTRGOUM7a0JBNUZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHVycmV0TGV2ZWwgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi562J57qnXCIsIHR5cGU6IGNjLkxhYmVsIH0pXG4gICAgbGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwicmVubWluYlwiLCB0eXBlOiBjYy5MYWJlbCB9KVxuICAgIHJibUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLlhYlcIiwgdHlwZTogY2MuTm9kZSB9KVxuICAgIGxpZ2h0Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6c3AuU2tlbGV0b24sZGlzcGxheU5hbWU6XCLngq5cIn0pXG4gICAgLy8gcGFvQm9keTogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsIGRpc3BsYXlOYW1lOiBcIui/m+W6plwiIH0pXG4gICAgcm1iUHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuXG4gICAgcHJpdmF0ZSBsZXZlbDogbnVtYmVyID0gbnVsbDtcblxuICAgIHByaXZhdGUgdHVycmV0RGF0YTogYW55O1xuXG4gICAgcHJpdmF0ZSBkYXRhID0gW1xuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICBhbW91bnQ6MC4xLFxuICAgICAgICAvLyAgICAgbGV2ZWw6MTAsXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIGFtb3VudDowLjMsXG4gICAgICAgIC8vICAgICBsZXZlbDoyMCxcbiAgICAgICAgLy8gfSxcbiAgICBdO1xuXG4gICAgLy/lvZPliY3ov5vooYxcbiAgICBwcml2YXRlIG5vd05vOiBudW1iZXIgPSAwO1xuICAgIG9uTG9hZCgpIHtcblxuXG5cbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5yYm1MYWJlbC5ub2RlLmdldFBhcmVudCgpKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyAgICAgY2MudHdlZW4oKS50byguMywgeyBhbmdsZTogMTAgfSkudG8oLjIsIHsgYW5nbGU6IDAgfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubGlnaHROb2RlKS5ieSgxLCB7IGFuZ2xlOiAtMzYwIH0pLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOeCruWhlFxuICAgICAqL1xuICAgIHNldExldmVsKCkge1xuICAgICAgICAvL+eCruWhlOWxnuaAp1xuICAgICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnR1cnJldERhdGEgPSB1dGlsLkdldFR1cnJldERhdGEodGhpcy5kYXRhW3RoaXMubm93Tm9dLmxldmVsKTtcbiAgICAgICAgLy90aGlzLnJibUxhYmVsLnN0cmluZyA9IHRoaXMuZGF0YVt0aGlzLm5vd05vXS5hbW91bnQrXCLlhYNcIjtcbiAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IFwiTHZcIiArIHRoaXMuZGF0YVt0aGlzLm5vd05vXS5sZXZlbDtcbiAgICAgICAgdGhpcy5ybWJQcm9ncmVzcy5wcm9ncmVzcyA9IHV0aWwudXNlckRhdGEudHVycmV0TGV2ZWwgLyB0aGlzLmRhdGFbdGhpcy5ub3dOb10ubGV2ZWw7XG5cbiAgICAgICAgLy8gdGhpcy5sb2FkU3BpbmUodGhpcy5wYW9Cb2R5LFwicGFvXCIpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u54q25oCBXG4gICAgICovXG4gICAgc2V0U3RhdGUoKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ybWJQcm9ncmVzcy5wcm9ncmVzcyA+PSAxLCAndGhpcy5ybWJQcm9ncmVzcy5wcm9ncmVzcz49MScpXG4gICAgICAgIHRoaXMubGlnaHROb2RlLmFjdGl2ZSA9IHRoaXMucm1iUHJvZ3Jlc3MucHJvZ3Jlc3MgPj0gMTtcblxuICAgICAgICB0aGlzLmxpZ2h0Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuXG4gICAgICAgIGlmICh0aGlzLmxpZ2h0Tm9kZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubGlnaHROb2RlKS5ieSgxLCB7IGFuZ2xlOiAtMzYwIH0pLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mHXG4gICAgICovXG4gICAgbG9hZFNwaW5lKHNwaW5lOiBzcC5Ta2VsZXRvbiwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFwic3BpbmUvdHVycmV0L1wiICsgdGhpcy50dXJyZXREYXRhLkR5bmFtaWNSZXNvdXJjZXMgKyBcIi9cIiArIG5hbWUgKyBcIi9cIiArIHRoaXMudHVycmV0RGF0YS5zcGluZU5hbWUsIHNwLlNrZWxldG9uRGF0YSwgKGVycm9yLCBzcDogc3AuU2tlbGV0b25EYXRhKSA9PiB7XG4gICAgICAgICAgICBzcGluZS5za2VsZXRvbkRhdGEgPSBzcDtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=