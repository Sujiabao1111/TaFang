
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/turret/turretHurt2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1944d5gBURJ45p46GgH8aJL', 'turretHurt2');
// Script/game/turret/turretHurt2.ts

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
var turretHurt2 = /** @class */ (function (_super) {
    __extends(turretHurt2, _super);
    function turretHurt2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hurtLabel = null;
        return _this;
    }
    turretHurt2.prototype.start = function () {
    };
    /**初始化 */
    turretHurt2.prototype.init = function (data) {
        var _this = this;
        //设置出生位置
        var pos = data.pos;
        this.node.setPosition(pos);
        // this.node.scale = 0;
        // this.node.opacity = 255;
        // cc.tween(this.node).to(.1,{scale:1}).by(.3,{x:20,y:-10}).call(()=>{
        //     this.destroyhurt();
        // }).start();
        this.hurtLabel.string = "~" + tool_1.default.changeUnit(data.value);
        this.node.scale = 1;
        this.node.opacity = 255;
        cc.tween(this.node).parallel(cc.tween().by(.8, { y: 100 }), cc.tween().to(.15, { scale: 1.2 }).to(.15, { scale: 1 }), cc.tween().delay(.4).to(.4, { opacity: 0 })).call(function () {
            _this.destroyhurt();
        }).start();
    };
    /**回收自己 */
    turretHurt2.prototype.destroyhurt = function () {
        //回收自己
        // this.node.destroy();
        // this.node.removeFromParent();
        // return
        cc.game.emit(NameTs_1.default.Game_Hurt_Crit_Killed, this.node);
    };
    __decorate([
        property({ type: cc.Label, displayName: "数值" })
    ], turretHurt2.prototype, "hurtLabel", void 0);
    turretHurt2 = __decorate([
        ccclass
    ], turretHurt2);
    return turretHurt2;
}(cc.Component));
exports.default = turretHurt2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRcXHR1cnJldEh1cnQyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6Qyx3Q0FBbUM7QUFFN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUE4Q0M7UUEzQ0csZUFBUyxHQUFZLElBQUksQ0FBQzs7SUEyQzlCLENBQUM7SUF6Q0csMkJBQUssR0FBTDtJQUdBLENBQUM7SUFFRCxTQUFTO0lBQ1QsMEJBQUksR0FBSixVQUFLLElBQUk7UUFBVCxpQkF3QkM7UUF2QkcsUUFBUTtRQUNSLElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0IsdUJBQXVCO1FBQ3ZCLDJCQUEyQjtRQUMzQixzRUFBc0U7UUFDdEUsMEJBQTBCO1FBQzFCLGNBQWM7UUFFZCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN4QixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQ3hCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQ3pCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUNoRCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FDMUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFJZixDQUFDO0lBRUQsVUFBVTtJQUNWLGlDQUFXLEdBQVg7UUFDSSxNQUFNO1FBQ04sdUJBQXVCO1FBQ3ZCLGdDQUFnQztRQUNoQyxTQUFTO1FBQ1QsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxxQkFBcUIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQXpDRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQztrREFDakI7SUFIVCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBOEMvQjtJQUFELGtCQUFDO0NBOUNELEFBOENDLENBOUN3QyxFQUFFLENBQUMsU0FBUyxHQThDcEQ7a0JBOUNvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4uLy4uL3V0aWwvdG9vbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHR1cnJldEh1cnQyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIuaVsOWAvFwifSlcbiAgICBodXJ0TGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICBcblxuICAgIH1cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoZGF0YSl7XG4gICAgICAgIC8v6K6+572u5Ye655Sf5L2N572uXG4gICAgICAgIGxldCBwb3M6Y2MuVmVjMiA9IGRhdGEucG9zO1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMubm9kZS5zY2FsZSA9IDA7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKC4xLHtzY2FsZToxfSkuYnkoLjMse3g6MjAseTotMTB9KS5jYWxsKCgpPT57XG4gICAgICAgIC8vICAgICB0aGlzLmRlc3Ryb3lodXJ0KCk7XG4gICAgICAgIC8vIH0pLnN0YXJ0KCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmh1cnRMYWJlbC5zdHJpbmcgPSBcIn5cIit0b29sLmNoYW5nZVVuaXQoZGF0YS52YWx1ZSk7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnBhcmFsbGVsKFxuICAgICAgICAgICAgY2MudHdlZW4oKS5ieSguOCx7eToxMDB9KSxcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjE1LHtzY2FsZToxLjJ9KS50byguMTUse3NjYWxlOjF9KSxcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkuZGVsYXkoLjQpLnRvKC40LHtvcGFjaXR5OjB9KVxuICAgICAgICApLmNhbGwoKCk9PntcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveWh1cnQoKTtcbiAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgLyoq5Zue5pS26Ieq5bexICovXG4gICAgZGVzdHJveWh1cnQoKXtcbiAgICAgICAgLy/lm57mlLboh6rlt7FcbiAgICAgICAgLy8gdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgLy8gcmV0dXJuXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9IdXJ0X0NyaXRfS2lsbGVkLHRoaXMubm9kZSk7XG4gICAgfVxuXG59XG4iXX0=