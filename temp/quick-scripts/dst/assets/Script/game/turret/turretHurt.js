
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
var NameTs_1 = require("../../common/NameTs");
var Tools_1 = require("../../util/Tools");
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
        this.hurtLabel.string = Tools_1.Tools.changeUnit(data.value);
        var coinParentPos = cc.v2(pos.x + (80 * (Math.random() > .5 ? 1 : -1)), pos.y - 200);
        var centerPos = cc.Vec2.clone(pos.add(coinParentPos).div(2));
        var pos1 = cc.v2();
        pos1.x = centerPos.x + Math.cos(Math.PI * Tools_1.Tools.GetRandom(0, 360) / 180) * 50;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRcXHR1cnJldEh1cnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLDBDQUF5QztBQUVuQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQWlEQztRQTlDRyxlQUFTLEdBQWEsSUFBSSxDQUFDOztJQThDL0IsQ0FBQztJQTdDRywwQkFBSyxHQUFMO0lBR0EsQ0FBQztJQUVELFNBQVM7SUFDVCx5QkFBSSxHQUFKLFVBQUssSUFBSTtRQUFULGlCQTRCQztRQTNCRyxRQUFRO1FBQ1IsSUFBSSxHQUFHLEdBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQix1QkFBdUI7UUFDdkIsMkJBQTJCO1FBQzNCLHNFQUFzRTtRQUN0RSwwQkFBMEI7UUFDMUIsY0FBYztRQUVkLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLGFBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJELElBQUksYUFBYSxHQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDOUYsSUFBSSxTQUFTLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksR0FBWSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDOUUsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDeEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUN4QixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUN2QyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUNuQyxDQUFDLElBQUksQ0FBQztZQUNILEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUlmLENBQUM7SUFFRCxVQUFVO0lBQ1YsZ0NBQVcsR0FBWDtRQUNJLE1BQU07UUFDTix1QkFBdUI7UUFDdkIsZ0NBQWdDO1FBQ2hDLFNBQVM7UUFDVCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBNUNEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO2lEQUNyQjtJQUhWLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FpRDlCO0lBQUQsaUJBQUM7Q0FqREQsQUFpREMsQ0FqRHVDLEVBQUUsQ0FBQyxTQUFTLEdBaURuRDtrQkFqRG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi8uLi91dGlsL1Rvb2xzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0dXJyZXRIdXJ0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmlbDlgLxcIiB9KVxuICAgIGh1cnRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIHN0YXJ0KCkge1xuXG5cbiAgICB9XG5cbiAgICAvKirliJ3lp4vljJYgKi9cbiAgICBpbml0KGRhdGEpIHtcbiAgICAgICAgLy/orr7nva7lh7rnlJ/kvY3nva5cbiAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IGRhdGEucG9zO1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcblxuICAgICAgICAvLyB0aGlzLm5vZGUuc2NhbGUgPSAwO1xuICAgICAgICAvLyB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5ub2RlKS50byguMSx7c2NhbGU6MX0pLmJ5KC4zLHt4OjIwLHk6LTEwfSkuY2FsbCgoKT0+e1xuICAgICAgICAvLyAgICAgdGhpcy5kZXN0cm95aHVydCgpO1xuICAgICAgICAvLyB9KS5zdGFydCgpO1xuXG4gICAgICAgIHRoaXMuaHVydExhYmVsLnN0cmluZyA9IFRvb2xzLmNoYW5nZVVuaXQoZGF0YS52YWx1ZSk7XG5cbiAgICAgICAgbGV0IGNvaW5QYXJlbnRQb3M6IGNjLlZlYzIgPSBjYy52Mihwb3MueCArICg4MCAqIChNYXRoLnJhbmRvbSgpID4gLjUgPyAxIDogLTEpKSwgcG9zLnkgLSAyMDApO1xuICAgICAgICBsZXQgY2VudGVyUG9zOiBjYy5WZWMyID0gY2MuVmVjMi5jbG9uZShwb3MuYWRkKGNvaW5QYXJlbnRQb3MpLmRpdigyKSk7XG4gICAgICAgIGxldCBwb3MxOiBjYy5WZWMyID0gY2MudjIoKTtcbiAgICAgICAgcG9zMS54ID0gY2VudGVyUG9zLnggKyBNYXRoLmNvcyhNYXRoLlBJICogVG9vbHMuR2V0UmFuZG9tKDAsIDM2MCkgLyAxODApICogNTA7XG4gICAgICAgIHBvczEueSA9IGNlbnRlclBvcy55IC0gNTA7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnBhcmFsbGVsKFxuICAgICAgICAgICAgY2MudHdlZW4oKS5iZXppZXJUbygxLCBwb3MsIHBvczEsIHBvczEpLFxuICAgICAgICAgICAgY2MudHdlZW4oKS50bygxLCB7IG9wYWNpdHk6IDAgfSlcbiAgICAgICAgKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveWh1cnQoKTtcbiAgICAgICAgfSkuc3RhcnQoKTtcblxuXG5cbiAgICB9XG5cbiAgICAvKirlm57mlLboh6rlt7EgKi9cbiAgICBkZXN0cm95aHVydCgpIHtcbiAgICAgICAgLy/lm57mlLboh6rlt7FcbiAgICAgICAgLy8gdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgLy8gcmV0dXJuXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9IdXJ0X0tpbGxlZCwgdGhpcy5ub2RlKTtcbiAgICB9XG5cbn1cbiJdfQ==