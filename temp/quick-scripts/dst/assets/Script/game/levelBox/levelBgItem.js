
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/levelBox/levelBgItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84f27TYRC1FXrivEq1I27Rw', 'levelBgItem');
// Script/game/levelBox/levelBgItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var levelBgItem = /** @class */ (function (_super) {
    __extends(levelBgItem, _super);
    function levelBgItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**目标位置 */
        _this.targetNode = null;
        //是否在删除
        _this.isKilled = false;
        return _this;
    }
    levelBgItem.prototype.start = function () {
    };
    levelBgItem.prototype.init = function (data) {
        var _this = this;
        this.initData = data;
        this.targetNode = data.node;
        this.isKilled = false;
        this.turretFn = cc.game.on("turret_bg_" + data.no, function () {
            _this.killSelf();
        }, this);
    };
    /**删除自己 */
    levelBgItem.prototype.killSelf = function () {
        this.isKilled = true;
        cc.game.off("turret_bg_" + this.initData.no, this.turretFn, this);
        cc.game.emit(NameTs_1.default.Game_LevelLabel_Killed, this.node);
    };
    levelBgItem.prototype.update = function (dt) {
        if (this.isKilled)
            return;
        if (!this.targetNode || !this.targetNode.isValid) {
            this.killSelf();
            return;
        }
        var pos = this.targetNode && this.targetNode.getPosition && this.targetNode.getPosition();
        this.node.x = pos.x - 47.931;
        this.node.y = pos.y + 36.495;
    };
    levelBgItem = __decorate([
        ccclass
    ], levelBgItem);
    return levelBgItem;
}(cc.Component));
exports.default = levelBgItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxsZXZlbEJveFxcbGV2ZWxCZ0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBRW5DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBMENDO1FBeENHLFVBQVU7UUFDRixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUlsQyxPQUFPO1FBQ0MsY0FBUSxHQUFXLEtBQUssQ0FBQzs7SUFrQ3JDLENBQUM7SUE5QkcsMkJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCwwQkFBSSxHQUFKLFVBQUssSUFBSTtRQUFULGlCQU9DO1FBTkcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxFQUFFLEVBQUM7WUFDNUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNaLENBQUM7SUFDRCxVQUFVO0lBQ1YsOEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlELEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUcsSUFBSSxDQUFDLFFBQVE7WUFBQyxPQUFPO1FBQ3hCLElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUM7WUFDNUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU87U0FDVjtRQUNELElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxVQUFVLElBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLElBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5RixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQztJQUUvQixDQUFDO0lBekNnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBMEMvQjtJQUFELGtCQUFDO0NBMUNELEFBMENDLENBMUN3QyxFQUFFLENBQUMsU0FBUyxHQTBDcEQ7a0JBMUNvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vLi4vY29tbW9uL05hbWVUc1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxldmVsQmdJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8qKuebruagh+S9jee9riAqL1xuICAgIHByaXZhdGUgdGFyZ2V0Tm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgdHVycmV0Rm46YW55O1xuXG4gICAgLy/mmK/lkKblnKjliKDpmaRcbiAgICBwcml2YXRlIGlzS2lsbGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBwcml2YXRlIGluaXREYXRhOmFueTtcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIGluaXQoZGF0YSl7XG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnRhcmdldE5vZGUgPSBkYXRhLm5vZGU7XG4gICAgICAgIHRoaXMuaXNLaWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50dXJyZXRGbiA9IGNjLmdhbWUub24oXCJ0dXJyZXRfYmdfXCIrZGF0YS5ubywoKT0+e1xuICAgICAgICAgICAgdGhpcy5raWxsU2VsZigpO1xuICAgICAgICB9LHRoaXMpO1xuICAgIH1cbiAgICAvKirliKDpmaToh6rlt7EgKi9cbiAgICBraWxsU2VsZigpe1xuICAgICAgICB0aGlzLmlzS2lsbGVkID0gdHJ1ZTtcbiAgICAgICAgY2MuZ2FtZS5vZmYoXCJ0dXJyZXRfYmdfXCIrdGhpcy5pbml0RGF0YS5ubyx0aGlzLnR1cnJldEZuLHRoaXMpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTGV2ZWxMYWJlbF9LaWxsZWQsdGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGlmKHRoaXMuaXNLaWxsZWQpcmV0dXJuO1xuICAgICAgICBpZighdGhpcy50YXJnZXROb2RlIHx8ICF0aGlzLnRhcmdldE5vZGUuaXNWYWxpZCl7XG4gICAgICAgICAgICB0aGlzLmtpbGxTZWxmKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgICAgIGxldCBwb3M6Y2MuVmVjMiA9IHRoaXMudGFyZ2V0Tm9kZSYmdGhpcy50YXJnZXROb2RlLmdldFBvc2l0aW9uJiZ0aGlzLnRhcmdldE5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5ub2RlLnggPSBwb3MueC00Ny45MzE7XG4gICAgICAgIHRoaXMubm9kZS55ID0gcG9zLnkrMzYuNDk1O1xuICAgICAgICBcbiAgICB9XG59XG4iXX0=