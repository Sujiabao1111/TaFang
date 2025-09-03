
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/turret/turretHurt.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '31549o4N/VIIKFQgfh5gtvb', 'turretHurt');
// Script/game/turret/turretHurt.ts

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
var NameTs_1 = require("../../common/NameTs");
var tool_1 = require("../../util/tool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretHurt = /** @class */ (function (_super) {
    __extends(turretHurt, _super);
    function turretHurt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hurtLabel = null;
        return _this;
    }
    turretHurt.prototype.start = function () {
    };
    /**初始化 */
    turretHurt.prototype.init = function (data) {
        var _this = this;
        //设置出生位置
        var pos = data.pos;
        this.node.setPosition(pos);
        // this.node.scale = 0;
        // this.node.opacity = 255;
        // cc.tween(this.node).to(.1,{scale:1}).by(.3,{x:20,y:-10}).call(()=>{
        //     this.destroyhurt();
        // }).start();
        this.hurtLabel.string = tool_1.default.changeUnit(data.value);
        var coinParentPos = cc.v2(pos.x + (80 * (Math.random() > .5 ? 1 : -1)), pos.y - 200);
        var centerPos = cc.Vec2.clone(pos.add(coinParentPos).div(2));
        var pos1 = cc.v2();
        pos1.x = centerPos.x + Math.cos(Math.PI * tool_1.default.GetRandom(0, 360) / 180) * 50;
        pos1.y = centerPos.y - 50;
        this.node.opacity = 255;
        cc.tween(this.node).parallel(cc.tween().bezierTo(1, pos, pos1, pos1), cc.tween().to(1, { opacity: 0 })).call(function () {
            _this.destroyhurt();
        }).start();
    };
    /**回收自己 */
    turretHurt.prototype.destroyhurt = function () {
        //回收自己
        // this.node.destroy();
        // this.node.removeFromParent();
        // return
        cc.game.emit(NameTs_1.default.Game_Hurt_Killed, this.node);
    };
    __decorate([
        property({ type: cc.Label, displayName: "数值" })
    ], turretHurt.prototype, "hurtLabel", void 0);
    turretHurt = __decorate([
        ccclass
    ], turretHurt);
    return turretHurt;
}(cc.Component));
exports.default = turretHurt;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRcXHR1cnJldEh1cnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLHdDQUFtQztBQUU3QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQWlEQztRQTlDRyxlQUFTLEdBQVksSUFBSSxDQUFDOztJQThDOUIsQ0FBQztJQTdDRywwQkFBSyxHQUFMO0lBR0EsQ0FBQztJQUVELFNBQVM7SUFDVCx5QkFBSSxHQUFKLFVBQUssSUFBSTtRQUFULGlCQTRCQztRQTNCRyxRQUFRO1FBQ1IsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQix1QkFBdUI7UUFDdkIsMkJBQTJCO1FBQzNCLHNFQUFzRTtRQUN0RSwwQkFBMEI7UUFDMUIsY0FBYztRQUVkLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLGNBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBELElBQUksYUFBYSxHQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsR0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxFQUFFLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEYsSUFBSSxTQUFTLEdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLElBQUksR0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxjQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxFQUFFLENBQUM7UUFDdEUsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBRTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDeEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUN4QixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUNwQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUMvQixDQUFDLElBQUksQ0FBQztZQUNILEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUlmLENBQUM7SUFFRCxVQUFVO0lBQ1YsZ0NBQVcsR0FBWDtRQUNJLE1BQU07UUFDTix1QkFBdUI7UUFDdkIsZ0NBQWdDO1FBQ2hDLFNBQVM7UUFDVCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBNUNEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDO2lEQUNqQjtJQUhULFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FpRDlCO0lBQUQsaUJBQUM7Q0FqREQsQUFpREMsQ0FqRHVDLEVBQUUsQ0FBQyxTQUFTLEdBaURuRDtrQkFqRG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vLi4vdXRpbC90b29sXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHVycmV0SHVydCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLmlbDlgLxcIn0pXG4gICAgaHVydExhYmVsOmNjLkxhYmVsID0gbnVsbDtcbiAgICBzdGFydCAoKSB7XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyWICovXG4gICAgaW5pdChkYXRhKXtcbiAgICAgICAgLy/orr7nva7lh7rnlJ/kvY3nva5cbiAgICAgICAgbGV0IHBvczpjYy5WZWMyID0gZGF0YS5wb3M7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5ub2RlLnNjYWxlID0gMDtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oLjEse3NjYWxlOjF9KS5ieSguMyx7eDoyMCx5Oi0xMH0pLmNhbGwoKCk9PntcbiAgICAgICAgLy8gICAgIHRoaXMuZGVzdHJveWh1cnQoKTtcbiAgICAgICAgLy8gfSkuc3RhcnQoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaHVydExhYmVsLnN0cmluZyA9IHRvb2wuY2hhbmdlVW5pdChkYXRhLnZhbHVlKTtcblxuICAgICAgICBsZXQgY29pblBhcmVudFBvczpjYy5WZWMyID0gY2MudjIocG9zLngrKDgwKihNYXRoLnJhbmRvbSgpPi41PzE6LTEpKSxwb3MueS0yMDApO1xuICAgICAgICBsZXQgY2VudGVyUG9zOmNjLlZlYzIgPSBjYy5WZWMyLmNsb25lKHBvcy5hZGQoY29pblBhcmVudFBvcykuZGl2KDIpKTtcbiAgICAgICAgbGV0IHBvczE6Y2MuVmVjMiA9IGNjLnYyKCk7XG4gICAgICAgIHBvczEueCA9IGNlbnRlclBvcy54ICsgTWF0aC5jb3MoTWF0aC5QSSp0b29sLkdldFJhbmRvbSgwLDM2MCkvMTgwKSo1MDtcbiAgICAgICAgcG9zMS55ID0gY2VudGVyUG9zLnktNTAgO1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5wYXJhbGxlbChcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkuYmV6aWVyVG8oMSxwb3MscG9zMSxwb3MxKSxcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oMSx7b3BhY2l0eTowfSlcbiAgICAgICAgKS5jYWxsKCgpPT57XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lodXJ0KCk7XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIFxuICAgICAgICBcblxuICAgIH1cblxuICAgIC8qKuWbnuaUtuiHquW3sSAqL1xuICAgIGRlc3Ryb3lodXJ0KCl7XG4gICAgICAgIC8v5Zue5pS26Ieq5bexXG4gICAgICAgIC8vIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgIC8vIHJldHVyblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfSHVydF9LaWxsZWQsdGhpcy5ub2RlKTtcbiAgICB9XG5cbn1cbiJdfQ==