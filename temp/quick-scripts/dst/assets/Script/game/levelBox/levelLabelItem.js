
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/levelBox/levelLabelItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ed4fWoIrZPRrrSyt4JwMFs', 'levelLabelItem');
// Script/game/levelBox/levelLabelItem.ts

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
var levelLabelItem = /** @class */ (function (_super) {
    __extends(levelLabelItem, _super);
    function levelLabelItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null; //文字
        /**目标位置 */
        _this.targetNode = null;
        //是否在删除
        _this.isKilled = false;
        return _this;
    }
    levelLabelItem.prototype.start = function () {
    };
    levelLabelItem.prototype.init = function (data) {
        var _this = this;
        this.initData = data;
        this.targetNode = data.node;
        this.label.string = data.level;
        this.isKilled = false;
        this.turretFn = cc.game.on("turret_label_" + data.no, function () {
            _this.killSelf();
        }, this);
    };
    /**删除自己 */
    levelLabelItem.prototype.killSelf = function () {
        this.isKilled = true;
        cc.game.off("turret_label_" + this.initData.no, this.turretFn, this);
        cc.game.emit(NameTs_1.default.Game_LevelLabel_Killed, this.node);
    };
    levelLabelItem.prototype.update = function (dt) {
        if (this.isKilled)
            return;
        if (!this.targetNode || !this.targetNode.isValid) {
            this.killSelf();
            return;
        }
        try {
            if (this.targetNode && this.targetNode.getPosition) {
                var pos = this.targetNode.getPosition();
                this.node.x = pos.x - 48.878;
                this.node.y = pos.y + 40.735;
            }
        }
        catch (error) {
            console.log(error, this.initData.no, 'error');
        }
    };
    __decorate([
        property(cc.Label)
    ], levelLabelItem.prototype, "label", void 0);
    levelLabelItem = __decorate([
        ccclass
    ], levelLabelItem);
    return levelLabelItem;
}(cc.Component));
exports.default = levelLabelItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxsZXZlbEJveFxcbGV2ZWxMYWJlbEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBRW5DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBdURDO1FBcERXLFdBQUssR0FBWSxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBRWxDLFVBQVU7UUFDRixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUlsQyxPQUFPO1FBQ0MsY0FBUSxHQUFXLEtBQUssQ0FBQzs7SUE0Q3JDLENBQUM7SUF4Q0csOEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCw2QkFBSSxHQUFKLFVBQUssSUFBSTtRQUFULGlCQVFDO1FBUEcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQztZQUMvQyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELFVBQVU7SUFDVixpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxzQkFBc0IsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELCtCQUFNLEdBQU4sVUFBUSxFQUFFO1FBQ04sSUFBRyxJQUFJLENBQUMsUUFBUTtZQUFDLE9BQU87UUFDeEIsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsT0FBTztTQUNWO1FBQ0QsSUFBRztZQUNDLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBQztnQkFDNUMsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDO2FBQzlCO1NBQ0o7UUFBQSxPQUFNLEtBQUssRUFBQztZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQzlDO0lBRUwsQ0FBQztJQWpERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNXO0lBSGIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXVEbEM7SUFBRCxxQkFBQztDQXZERCxBQXVEQyxDQXZEMkMsRUFBRSxDQUFDLFNBQVMsR0F1RHZEO2tCQXZEb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYW1lVHMgZnJvbSBcIi4uLy4uL2NvbW1vbi9OYW1lVHNcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsZXZlbExhYmVsSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJlbDpjYy5MYWJlbCA9IG51bGw7Ly/mloflrZdcblxuICAgIC8qKuebruagh+S9jee9riAqL1xuICAgIHByaXZhdGUgdGFyZ2V0Tm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgdHVycmV0Rm46YW55O1xuICAgIFxuICAgIC8v5piv5ZCm5Zyo5Yig6ZmkXG4gICAgcHJpdmF0ZSBpc0tpbGxlZDpib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGluaXREYXRhOmFueTtcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIGluaXQoZGF0YSl7XG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnRhcmdldE5vZGUgPSBkYXRhLm5vZGU7XG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gZGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5pc0tpbGxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnR1cnJldEZuID0gY2MuZ2FtZS5vbihcInR1cnJldF9sYWJlbF9cIitkYXRhLm5vLCgpPT57XG4gICAgICAgICAgICB0aGlzLmtpbGxTZWxmKCk7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgfVxuXG4gICAgLyoq5Yig6Zmk6Ieq5bexICovXG4gICAga2lsbFNlbGYoKXtcbiAgICAgICAgdGhpcy5pc0tpbGxlZCA9IHRydWU7XG4gICAgICAgIGNjLmdhbWUub2ZmKFwidHVycmV0X2xhYmVsX1wiK3RoaXMuaW5pdERhdGEubm8sdGhpcy50dXJyZXRGbix0aGlzKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0xldmVsTGFiZWxfS2lsbGVkLHRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICBpZih0aGlzLmlzS2lsbGVkKXJldHVybjtcbiAgICAgICAgaWYoIXRoaXMudGFyZ2V0Tm9kZSB8fCAhdGhpcy50YXJnZXROb2RlLmlzVmFsaWQpe1xuICAgICAgICAgICAgdGhpcy5raWxsU2VsZigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGlmKHRoaXMudGFyZ2V0Tm9kZSYmdGhpcy50YXJnZXROb2RlLmdldFBvc2l0aW9uKXtcbiAgICAgICAgICAgICAgICBsZXQgcG9zOmNjLlZlYzIgPSB0aGlzLnRhcmdldE5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCA9IHBvcy54LTQ4Ljg3ODtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSA9IHBvcy55KzQwLjczNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLHRoaXMuaW5pdERhdGEubm8sJ2Vycm9yJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cblxufVxuIl19