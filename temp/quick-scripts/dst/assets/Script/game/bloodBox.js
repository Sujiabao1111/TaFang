
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/bloodBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9345dYEmhVIMI0593yFgfUe', 'bloodBox');
// Script/game/bloodBox.ts

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
var bloodBox = /** @class */ (function (_super) {
    __extends(bloodBox, _super);
    function bloodBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bloodPre = null;
        return _this;
        // update (dt) {}
    }
    bloodBox.prototype.onLoad = function () {
        var _this = this;
        var item = cc.instantiate(this.bloodPre);
        this.bloodPool = new pool_1.default(item, 1);
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Monster_Blood_Creater, function (data) {
            _this.bloodPool.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Monster_Blood_Killed, function (data) {
            _this.bloodPool.onEnemyKilled(data);
        }, this);
    };
    bloodBox.prototype.start = function () {
    };
    __decorate([
        property({ type: cc.Prefab, displayName: "血" })
    ], bloodBox.prototype, "bloodPre", void 0);
    bloodBox = __decorate([
        ccclass
    ], bloodBox);
    return bloodBox;
}(cc.Component));
exports.default = bloodBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxibG9vZEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBRTVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBK0JDO1FBNUJXLGNBQVEsR0FBYSxJQUFJLENBQUM7O1FBMkJsQyxpQkFBaUI7SUFDckIsQ0FBQztJQXRCRyx5QkFBTSxHQUFOO1FBQUEsaUJBZUM7UUFkRyxJQUFJLElBQUksR0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxVQUFVO1FBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQywwQkFBMEIsRUFBQyxVQUFDLElBQUk7WUFDOUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFUixVQUFVO1FBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyx5QkFBeUIsRUFBQyxVQUFDLElBQUk7WUFDN0MsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBR1osQ0FBQztJQUVELHdCQUFLLEdBQUw7SUFFQSxDQUFDO0lBekJEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBQyxDQUFDOzhDQUNUO0lBSGpCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0ErQjVCO0lBQUQsZUFBQztDQS9CRCxBQStCQyxDQS9CcUMsRUFBRSxDQUFDLFNBQVMsR0ErQmpEO2tCQS9Cb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwb29sIGZyb20gXCIuLi9jb21tb24vcG9vbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJsb29kQm94IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5QcmVmYWIsZGlzcGxheU5hbWU6XCLooYBcIn0pXG4gICAgcHJpdmF0ZSBibG9vZFByZTpjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgXG4gICAgLyoq6KGA5a+56LGh5rGgICovXG4gICAgcHJpdmF0ZSBibG9vZFBvb2w6cG9vbDsgXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBsZXQgaXRlbTpjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5ibG9vZFByZSk7XG4gICAgICAgIHRoaXMuYmxvb2RQb29sID0gbmV3IHBvb2woaXRlbSwxKTtcbiAgICAgICAgXG4gICAgICAgIC8qKuebkeWQrOWIm+W7uiAqL1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX01vbnN0ZXJfQmxvb2RfQ3JlYXRlciwoZGF0YSk9PntcbiAgICAgICAgICAgIHRoaXMuYmxvb2RQb29sLmNyZWF0ZUVuZW15KHRoaXMubm9kZSxkYXRhKTtcbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICAvKirnm5HlkKzplIDmr4EgKi9cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Nb25zdGVyX0Jsb29kX0tpbGxlZCwoZGF0YSk9PntcbiAgICAgICAgICAgIHRoaXMuYmxvb2RQb29sLm9uRW5lbXlLaWxsZWQoZGF0YSk7XG4gICAgICAgIH0sdGhpcyk7XG5cblxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=