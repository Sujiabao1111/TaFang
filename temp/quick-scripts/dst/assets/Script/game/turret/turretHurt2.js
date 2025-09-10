
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
var LanguageData_1 = require("../../Language/LanguageData");
var Tools_1 = require("../../util/Tools");
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
        this.hurtLabel.string = LanguageData_1.t("main.暴击") + Tools_1.Tools.changeUnit(data.value);
        // console.log("hurtLabel.string", this.hurtLabel.string);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRcXHR1cnJldEh1cnQyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6Qyw0REFBZ0Q7QUFDaEQsMENBQXlDO0FBRW5DLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBZ0RDO1FBN0NHLGVBQVMsR0FBYSxJQUFJLENBQUM7O0lBNkMvQixDQUFDO0lBM0NHLDJCQUFLLEdBQUw7SUFHQSxDQUFDO0lBRUQsU0FBUztJQUNULDBCQUFJLEdBQUosVUFBSyxJQUFJO1FBQVQsaUJBMEJDO1FBekJHLFFBQVE7UUFDUixJQUFJLEdBQUcsR0FBWSxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLHVCQUF1QjtRQUN2QiwyQkFBMkI7UUFDM0Isc0VBQXNFO1FBQ3RFLDBCQUEwQjtRQUMxQixjQUFjO1FBRWQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsZ0JBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxhQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSwwREFBMEQ7UUFFMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN4QixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQ3hCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQzdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUN4RCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDOUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFJZixDQUFDO0lBRUQsVUFBVTtJQUNWLGlDQUFXLEdBQVg7UUFDSSxNQUFNO1FBQ04sdUJBQXVCO1FBQ3ZCLGdDQUFnQztRQUNoQyxTQUFTO1FBQ1QsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQTNDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztrREFDckI7SUFIVixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBZ0QvQjtJQUFELGtCQUFDO0NBaERELEFBZ0RDLENBaER3QyxFQUFFLENBQUMsU0FBUyxHQWdEcEQ7a0JBaERvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi8uLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uLy4uL3V0aWwvVG9vbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHR1cnJldEh1cnQyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmlbDlgLxcIiB9KVxuICAgIGh1cnRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgc3RhcnQoKSB7XG5cblxuICAgIH1cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoZGF0YSkge1xuICAgICAgICAvL+iuvue9ruWHuueUn+S9jee9rlxuICAgICAgICBsZXQgcG9zOiBjYy5WZWMyID0gZGF0YS5wb3M7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xuXG4gICAgICAgIC8vIHRoaXMubm9kZS5zY2FsZSA9IDA7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKC4xLHtzY2FsZToxfSkuYnkoLjMse3g6MjAseTotMTB9KS5jYWxsKCgpPT57XG4gICAgICAgIC8vICAgICB0aGlzLmRlc3Ryb3lodXJ0KCk7XG4gICAgICAgIC8vIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5odXJ0TGFiZWwuc3RyaW5nID0gdChcIm1haW4u5pq05Ye7XCIpICsgVG9vbHMuY2hhbmdlVW5pdChkYXRhLnZhbHVlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJodXJ0TGFiZWwuc3RyaW5nXCIsIHRoaXMuaHVydExhYmVsLnN0cmluZyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkucGFyYWxsZWwoXG4gICAgICAgICAgICBjYy50d2VlbigpLmJ5KC44LCB7IHk6IDEwMCB9KSxcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjE1LCB7IHNjYWxlOiAxLjIgfSkudG8oLjE1LCB7IHNjYWxlOiAxIH0pLFxuICAgICAgICAgICAgY2MudHdlZW4oKS5kZWxheSguNCkudG8oLjQsIHsgb3BhY2l0eTogMCB9KVxuICAgICAgICApLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95aHVydCgpO1xuICAgICAgICB9KS5zdGFydCgpO1xuXG5cblxuICAgIH1cblxuICAgIC8qKuWbnuaUtuiHquW3sSAqL1xuICAgIGRlc3Ryb3lodXJ0KCkge1xuICAgICAgICAvL+WbnuaUtuiHquW3sVxuICAgICAgICAvLyB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAvLyB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAvLyByZXR1cm5cbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0h1cnRfQ3JpdF9LaWxsZWQsIHRoaXMubm9kZSk7XG4gICAgfVxuXG59XG4iXX0=