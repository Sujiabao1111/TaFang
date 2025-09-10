
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcZWFybmluZ0J0bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFFdEMscUNBQWdDO0FBRzFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBNERDO1FBekRHLFNBQUcsR0FBWSxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBR3pCLFdBQUssR0FBWSxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBRzNCLGVBQVMsR0FBYSxJQUFJLENBQUMsQ0FBQyxJQUFJOztRQWtEaEMsaUJBQWlCO0lBQ3JCLENBQUM7SUE1Q0csMkJBQU0sR0FBTjtRQUFBLGlCQU9DO1FBTEcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxxQkFBcUIsRUFBQyxVQUFDLEdBQUc7WUFDeEMsS0FBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDaEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUVaLENBQUM7SUFFRCwwQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNkJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQztRQUVyRCxJQUFHLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDO1lBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7SUFFTCxDQUFDO0lBRUQ7O01BRUU7SUFDRix3QkFBRyxHQUFIO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBRyxLQUFJLENBQUMsSUFBSSxJQUFFLENBQUMsRUFBQztnQkFDWixLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixPQUFPO2FBQ1Y7WUFDRCxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFFVCxDQUFDO0lBdkREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0U7SUFHcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDSTtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNRO0lBVFYsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQTREOUI7SUFBRCxpQkFBQztDQTVERCxBQTREQyxDQTVEdUMsRUFBRSxDQUFDLFNBQVMsR0E0RG5EO2tCQTVEb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XHJcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlYXJuaW5nQnRuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHBpYzogY2MuTm9kZSA9IG51bGw7IC8v5Zu+54mHXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzcGluZTogY2MuTm9kZSA9IG51bGw7IC8v5pS255uKXHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHRpbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsOyAvL+aXtumXtFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8qKuaXtumXtCAqL1xyXG4gICAgcHJpdmF0ZSB0aW1lOm51bWJlcjtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0Vhcm5pbmdzX0xpbnN0ZXIsKHJlcyk9PntcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gcmVzO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCk7XHJcbiAgICAgICAgfSx0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rueKtuaAgVxyXG4gICAgICovXHJcbiAgICBzZXRTdGF0ZSgpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGljLmFjdGl2ZSA9IHRoaXMudGltZTw9MDtcclxuICAgICAgICB0aGlzLnNwaW5lLmFjdGl2ZSA9IHRoaXMudGltZT4wO1xyXG4gICAgICAgIHRoaXMudGltZUxhYmVsLm5vZGUuZ2V0UGFyZW50KCkuYWN0aXZlID0gdGhpcy50aW1lPjA7XHJcblxyXG4gICAgICAgIGlmKHRoaXMudGltZT4wKXtcclxuICAgICAgICAgICAgdGhpcy5kanMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YCS6K6h5pe2IFxyXG4gICAgKi9cclxuICAgIGRqcygpe1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgdGhpcy50aW1lLS07XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGltZTw9MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSB0b29sLmNoYW5nZVRpbWUodGhpcy50aW1lKTtcclxuICAgICAgICB9LDEpO1xyXG5cclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19