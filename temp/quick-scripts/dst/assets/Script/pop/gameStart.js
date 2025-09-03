
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameStart.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b423az3C9FACITSax5Uj3kp', 'gameStart');
// Script/pop/gameStart.ts

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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameStart = /** @class */ (function (_super) {
    __extends(gameStart, _super);
    function gameStart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customLabel = null;
        _this.djsNum = 0;
        return _this;
        // update (dt) {}
    }
    gameStart.prototype.start = function () {
    };
    /**
     * 初始化
     */
    gameStart.prototype.init = function () {
        var _this = this;
        this.djsNum = 1;
        this.schedule(function () {
            _this.djsNum--;
            if (_this.djsNum <= 0) {
                _this.close();
                _this.unscheduleAllCallbacks();
                return;
            }
        }, 1);
        var customs = util_1.default.userData.customs;
        this.customLabel.string = "关卡" + customs.big + "-" + customs.small;
    };
    /**
     * 关闭页面
     */
    gameStart.prototype.close = function () {
        this.unscheduleAllCallbacks();
        //soundController.singleton.clickAudio();
        console.log("asfasfasf===============");
        this.closePage();
        cc.game.emit(NameTs_1.default.Game_Start);
        util_1.default.gameTime = 0;
        util_1.default.gamePropNum = 0;
    };
    __decorate([
        property({ type: cc.Label, displayName: "关卡" })
    ], gameStart.prototype, "customLabel", void 0);
    gameStart = __decorate([
        ccclass
    ], gameStart);
    return gameStart;
}(baseTs_1.default));
exports.default = gameStart;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTdGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFFcEMsMkNBQXNDO0FBRXRDLHFDQUFnQztBQUUxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBTTtJQUE3QztRQUFBLHFFQW9EQztRQS9DVyxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixZQUFNLEdBQVUsQ0FBQyxDQUFDOztRQTRDMUIsaUJBQWlCO0lBQ3JCLENBQUM7SUEzQ0cseUJBQUssR0FBTDtJQUlBLENBQUM7SUFFRDs7T0FFRztJQUNILHdCQUFJLEdBQUo7UUFBQSxpQkFlQztRQWJHLElBQUksQ0FBQyxNQUFNLEdBQUUsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLEtBQUksQ0FBQyxNQUFNLEVBQUcsQ0FBQztZQUNmLElBQUcsS0FBSSxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUM7Z0JBQ2QsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUM5QixPQUFPO2FBQ1Y7UUFDTCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFTCxJQUFJLE9BQU8sR0FBZSxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUMsT0FBTyxDQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUVqRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCx5QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIseUNBQXlDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtRQUN2QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxjQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixjQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBekNEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDO2tEQUNQO0lBTG5CLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FvRDdCO0lBQUQsZ0JBQUM7Q0FwREQsQUFvREMsQ0FwRHNDLGdCQUFNLEdBb0Q1QztrQkFwRG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgY3VzdG9tc0luZm8gfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVN0YXJ0IGV4dGVuZHMgYmFzZVRzIHtcblxuXG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLlhbPljaFcIn0pXG4gICAgcHJpdmF0ZSBjdXN0b21MYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGRqc051bTpudW1iZXIgPSAwO1xuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgICBcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMllxuICAgICAqL1xuICAgIGluaXQoKXtcblxuICAgICAgICB0aGlzLmRqc051bSA9MTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5kanNOdW0gLS07XG4gICAgICAgICAgICBpZih0aGlzLmRqc051bTw9MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwxKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBjdXN0b21zOmN1c3RvbXNJbmZvID0gdXRpbC51c2VyRGF0YS5jdXN0b21zO1xuICAgICAgICB0aGlzLmN1c3RvbUxhYmVsLnN0cmluZyA9IFwi5YWz5Y2hXCIrY3VzdG9tcy5iaWcrXCItXCIrY3VzdG9tcy5zbWFsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXremhtemdolxuICAgICAqL1xuICAgIGNsb3NlKCl7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICAvL3NvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImFzZmFzZmFzZj09PT09PT09PT09PT09PVwiKVxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfU3RhcnQpO1xuICAgICAgICB1dGlsLmdhbWVUaW1lID0gMDtcbiAgICAgICAgdXRpbC5nYW1lUHJvcE51bSA9IDA7XG4gICAgfVxuXG5cblxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==