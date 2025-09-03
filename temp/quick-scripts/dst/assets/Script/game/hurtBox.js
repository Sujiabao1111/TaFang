
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/hurtBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a659blOwmdJ8o0GwEy1b7ZO', 'hurtBox');
// Script/game/hurtBox.ts

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
var hurtBox = /** @class */ (function (_super) {
    __extends(hurtBox, _super);
    function hurtBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    hurtBox.prototype.onLoad = function () {
        var _this = this;
        this.loadAny("prefab/turret/turretHurt", cc.Prefab, function (res) {
            _this.hurtPool = new pool_1.default(res, 20);
        });
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Hurt_Creator, function (data) {
            _this.hurtPool.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Hurt_Killed, function (data) {
            _this.hurtPool.onEnemyKilled(data);
        }, this);
    };
    hurtBox.prototype.start = function () {
    };
    hurtBox = __decorate([
        ccclass
    ], hurtBox);
    return hurtBox;
}(baseTs_1.default));
exports.default = hurtBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxodXJ0Qm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBRTVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFNO0lBQTNDOztJQXVDQSxDQUFDO0lBbENHLHdCQUFNLEdBQU47UUFBQSxpQkFzQkM7UUFwQkcsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLFVBQUMsR0FBRztZQUNsRCxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBSSxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUdILFVBQVU7UUFDVixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGlCQUFpQixFQUFDLFVBQUMsSUFBSTtZQUVyQyxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVSLFVBQVU7UUFDVixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFDLFVBQUMsSUFBSTtZQUVwQyxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFHWixDQUFDO0lBRUQsdUJBQUssR0FBTDtJQUVBLENBQUM7SUEvQmdCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0F1QzNCO0lBQUQsY0FBQztDQXZDRCxBQXVDQyxDQXZDb0MsZ0JBQU0sR0F1QzFDO2tCQXZDb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcG9vbCBmcm9tIFwiLi4vY29tbW9uL3Bvb2xcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBodXJ0Qm94IGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIC8qKuS8pOWus+WvueixoeaxoCAqL1xuICAgIHByaXZhdGUgaHVydFBvb2w6cG9vbDsgXG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIHRoaXMubG9hZEFueShcInByZWZhYi90dXJyZXQvdHVycmV0SHVydFwiLGNjLlByZWZhYiwocmVzKT0+eyAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5odXJ0UG9vbCA9IG5ldyBwb29sKHJlcywyMCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLyoq55uR5ZCs5Yib5bu6ICovXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfSHVydF9DcmVhdG9yLChkYXRhKT0+e1xuXG4gICAgICAgICAgICB0aGlzLmh1cnRQb29sLmNyZWF0ZUVuZW15KHRoaXMubm9kZSxkYXRhKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIC8qKuebkeWQrOmUgOavgSAqL1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0h1cnRfS2lsbGVkLChkYXRhKT0+e1xuXG4gICAgICAgICAgICB0aGlzLmh1cnRQb29sLm9uRW5lbXlLaWxsZWQoZGF0YSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSx0aGlzKTtcblxuXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG5cbiAgICBcblxuICAgIFxuICAgIFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=