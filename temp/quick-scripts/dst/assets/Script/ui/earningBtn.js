
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/earningBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4a603a+WKJML4xXpx74Etq3', 'earningBtn');
// Script/ui/earningBtn.ts

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
var tool_1 = require("../util/tool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var earningBtn = /** @class */ (function (_super) {
    __extends(earningBtn, _super);
    function earningBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pic = null; //图片
        _this.spine = null; //收益
        _this.timeLabel = null; //时间
        return _this;
        // update (dt) {}
    }
    earningBtn.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Earnings_Linster, function (res) {
            _this.time = res;
            _this.setState();
        }, this);
    };
    earningBtn.prototype.start = function () {
    };
    /**
     * 设置状态
     */
    earningBtn.prototype.setState = function () {
        this.pic.active = this.time <= 0;
        this.spine.active = this.time > 0;
        this.timeLabel.node.getParent().active = this.time > 0;
        if (this.time > 0) {
            this.djs();
        }
    };
    /**
     * 倒计时
    */
    earningBtn.prototype.djs = function () {
        var _this = this;
        this.schedule(function () {
            _this.time--;
            if (_this.time <= 0) {
                _this.unscheduleAllCallbacks();
                _this.setState();
                return;
            }
            _this.timeLabel.string = tool_1.default.changeTime(_this.time);
        }, 1);
    };
    __decorate([
        property(cc.Node)
    ], earningBtn.prototype, "pic", void 0);
    __decorate([
        property(cc.Node)
    ], earningBtn.prototype, "spine", void 0);
    __decorate([
        property(cc.Label)
    ], earningBtn.prototype, "timeLabel", void 0);
    earningBtn = __decorate([
        ccclass
    ], earningBtn);
    return earningBtn;
}(cc.Component));
exports.default = earningBtn;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcZWFybmluZ0J0bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFFdEMscUNBQWdDO0FBRzFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBNERDO1FBekRHLFNBQUcsR0FBWSxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBR3pCLFdBQUssR0FBWSxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBRzNCLGVBQVMsR0FBYSxJQUFJLENBQUMsQ0FBQyxJQUFJOztRQWtEaEMsaUJBQWlCO0lBQ3JCLENBQUM7SUE1Q0csMkJBQU0sR0FBTjtRQUFBLGlCQU9DO1FBTEcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxxQkFBcUIsRUFBQyxVQUFDLEdBQUc7WUFDeEMsS0FBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDaEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUVaLENBQUM7SUFFRCwwQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNkJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQztRQUVyRCxJQUFHLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDO1lBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7SUFFTCxDQUFDO0lBRUQ7O01BRUU7SUFDRix3QkFBRyxHQUFIO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBRyxLQUFJLENBQUMsSUFBSSxJQUFFLENBQUMsRUFBQztnQkFDWixLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixPQUFPO2FBQ1Y7WUFDRCxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFFVCxDQUFDO0lBdkREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0U7SUFHcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDSTtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNRO0lBVFYsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQTREOUI7SUFBRCxpQkFBQztDQTVERCxBQTREQyxDQTVEdUMsRUFBRSxDQUFDLFNBQVMsR0E0RG5EO2tCQTVEb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4uL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGVhcm5pbmdCdG4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcGljOiBjYy5Ob2RlID0gbnVsbDsgLy/lm77niYdcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNwaW5lOiBjYy5Ob2RlID0gbnVsbDsgLy/mlLbnm4pcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGltZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7IC8v5pe26Ze0XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8qKuaXtumXtCAqL1xuICAgIHByaXZhdGUgdGltZTpudW1iZXI7XG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfRWFybmluZ3NfTGluc3RlciwocmVzKT0+e1xuICAgICAgICAgICAgdGhpcy50aW1lID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgpO1xuICAgICAgICB9LHRoaXMpO1xuXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u54q25oCBXG4gICAgICovXG4gICAgc2V0U3RhdGUoKXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGljLmFjdGl2ZSA9IHRoaXMudGltZTw9MDtcbiAgICAgICAgdGhpcy5zcGluZS5hY3RpdmUgPSB0aGlzLnRpbWU+MDtcbiAgICAgICAgdGhpcy50aW1lTGFiZWwubm9kZS5nZXRQYXJlbnQoKS5hY3RpdmUgPSB0aGlzLnRpbWU+MDtcblxuICAgICAgICBpZih0aGlzLnRpbWU+MCl7XG4gICAgICAgICAgICB0aGlzLmRqcygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgJLorqHml7YgXG4gICAgKi9cbiAgICBkanMoKXtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy50aW1lLS07XG4gICAgICAgICAgICBpZih0aGlzLnRpbWU8PTApe1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSB0b29sLmNoYW5nZVRpbWUodGhpcy50aW1lKTtcbiAgICAgICAgfSwxKTtcblxuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19