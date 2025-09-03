
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/hpBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d1e4OIt45CAppOdaIWeCH9', 'hpBox');
// Script/game/hpBox.ts

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
var NameTs_1 = require("../common/NameTs");
var pool_1 = require("../common/pool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var hpBox = /** @class */ (function (_super) {
    __extends(hpBox, _super);
    function hpBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpPre = null;
        return _this;
        // update (dt) {}
    }
    hpBox.prototype.onLoad = function () {
        var _this = this;
        var item = cc.instantiate(this.hpPre);
        this.hpPool = new pool_1.default(item);
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Monster_Hp_Creater, function (data) {
            _this.hpPool.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Monster_Hp_Killed, function (data) {
            // data.destroy();
            // return
            _this.hpPool.onEnemyKilled(data);
        }, this);
    };
    hpBox.prototype.start = function () {
    };
    __decorate([
        property({ type: cc.Prefab, displayName: "血量条" })
    ], hpBox.prototype, "hpPre", void 0);
    hpBox = __decorate([
        ccclass
    ], hpBox);
    return hpBox;
}(cc.Component));
exports.default = hpBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxocEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBRTVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW1DLHlCQUFZO0lBQS9DO1FBQUEscUVBaUNDO1FBOUJXLFdBQUssR0FBYSxJQUFJLENBQUM7O1FBNkIvQixpQkFBaUI7SUFDckIsQ0FBQztJQXhCRyxzQkFBTSxHQUFOO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsVUFBVTtRQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsdUJBQXVCLEVBQUMsVUFBQyxJQUFJO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRVIsVUFBVTtRQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsc0JBQXNCLEVBQUMsVUFBQyxJQUFJO1lBQzFDLGtCQUFrQjtZQUNsQixTQUFTO1lBQ1QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBR1osQ0FBQztJQUVELHFCQUFLLEdBQUw7SUFFQSxDQUFDO0lBM0JEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDO3dDQUNkO0lBSGQsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQWlDekI7SUFBRCxZQUFDO0NBakNELEFBaUNDLENBakNrQyxFQUFFLENBQUMsU0FBUyxHQWlDOUM7a0JBakNvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb29sXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaHBCb3ggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlByZWZhYixkaXNwbGF5TmFtZTpcIuihgOmHj+adoVwifSlcbiAgICBwcml2YXRlIGhwUHJlOmNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBcbiAgICAvKirooYDph4/lr7nosaHmsaAgKi9cbiAgICBwcml2YXRlIGhwUG9vbDpwb29sOyBcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhwUHJlKTtcbiAgICAgICAgdGhpcy5ocFBvb2wgPSBuZXcgcG9vbChpdGVtKTtcbiAgICAgICAgXG4gICAgICAgIC8qKuebkeWQrOWIm+W7uiAqL1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX01vbnN0ZXJfSHBfQ3JlYXRlciwoZGF0YSk9PntcbiAgICAgICAgICAgIHRoaXMuaHBQb29sLmNyZWF0ZUVuZW15KHRoaXMubm9kZSxkYXRhKTtcbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICAvKirnm5HlkKzplIDmr4EgKi9cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Nb25zdGVyX0hwX0tpbGxlZCwoZGF0YSk9PntcbiAgICAgICAgICAgIC8vIGRhdGEuZGVzdHJveSgpO1xuICAgICAgICAgICAgLy8gcmV0dXJuXG4gICAgICAgICAgICB0aGlzLmhwUG9vbC5vbkVuZW15S2lsbGVkKGRhdGEpO1xuICAgICAgICB9LHRoaXMpO1xuXG5cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19