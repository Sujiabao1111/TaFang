
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/hurtCirtBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4adb7vHf1VFUrVWnYJDQDhI', 'hurtCirtBox');
// Script/game/hurtCirtBox.ts

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
var pool_1 = require("../common/pool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var hurtCirtBox = /** @class */ (function (_super) {
    __extends(hurtCirtBox, _super);
    function hurtCirtBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    hurtCirtBox.prototype.onLoad = function () {
        var _this = this;
        this.loadAny("prefab/turret/turretHurt2", cc.Prefab, function (res) {
            _this.hurtPool2 = new pool_1.default(res, 20);
        });
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Hurt_Crit_Creator, function (data) {
            _this.hurtPool2.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Hurt_Crit_Killed, function (data) {
            _this.hurtPool2.onEnemyKilled(data);
        }, this);
    };
    hurtCirtBox.prototype.start = function () {
    };
    hurtCirtBox = __decorate([
        ccclass
    ], hurtCirtBox);
    return hurtCirtBox;
}(baseTs_1.default));
exports.default = hurtCirtBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxodXJ0Q2lydEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLHVDQUFrQztBQUU1QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBTTtJQUEvQzs7SUFxQ0EsQ0FBQztJQWhDRyw0QkFBTSxHQUFOO1FBQUEsaUJBb0JDO1FBbkJHLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxVQUFDLEdBQUc7WUFDbkQsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGNBQUksQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxVQUFVO1FBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxzQkFBc0IsRUFBQyxVQUFDLElBQUk7WUFFMUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUUvQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFUixVQUFVO1FBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxxQkFBcUIsRUFBQyxVQUFDLElBQUk7WUFFekMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBR1osQ0FBQztJQUVELDJCQUFLLEdBQUw7SUFFQSxDQUFDO0lBN0JnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBcUMvQjtJQUFELGtCQUFDO0NBckNELEFBcUNDLENBckN3QyxnQkFBTSxHQXFDOUM7a0JBckNvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwb29sIGZyb20gXCIuLi9jb21tb24vcG9vbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGh1cnRDaXJ0Qm94IGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIC8qKuaatOWHu+S8pOWus+WvueixoeaxoCAqL1xuICAgIHByaXZhdGUgaHVydFBvb2wyOnBvb2w7IFxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5sb2FkQW55KFwicHJlZmFiL3R1cnJldC90dXJyZXRIdXJ0MlwiLGNjLlByZWZhYiwocmVzKT0+eyAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5odXJ0UG9vbDIgPSBuZXcgcG9vbChyZXMsMjApO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8qKuebkeWQrOWIm+W7uiAqL1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0h1cnRfQ3JpdF9DcmVhdG9yLChkYXRhKT0+e1xuXG4gICAgICAgICAgICB0aGlzLmh1cnRQb29sMi5jcmVhdGVFbmVteSh0aGlzLm5vZGUsZGF0YSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICAvKirnm5HlkKzplIDmr4EgKi9cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9IdXJ0X0NyaXRfS2lsbGVkLChkYXRhKT0+e1xuXG4gICAgICAgICAgICB0aGlzLmh1cnRQb29sMi5vbkVuZW15S2lsbGVkKGRhdGEpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sdGhpcyk7XG5cblxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuXG4gICAgXG5cbiAgICBcbiAgICBcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19