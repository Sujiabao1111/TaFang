
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/levelBgBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '722c1HQRohHXI3k1FxdsQU3', 'levelBgBox');
// Script/game/levelBgBox.ts

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
var levelBox = /** @class */ (function (_super) {
    __extends(levelBox, _super);
    function levelBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**背景对象池 */
        _this.levelBgItem = null;
        return _this;
        // update (dt) {}
    }
    levelBox.prototype.onLoad = function () {
        var _this = this;
        var item = cc.instantiate(this.levelBgItem);
        this.bgPool = new pool_1.default(item, 16);
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_LevelBg_Creator, function (data) {
            _this.bgPool.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_LevelBg_Killed, function (data) {
            if (data) {
                _this.bgPool.onEnemyKilled(data);
            }
        }, this);
    };
    levelBox.prototype.start = function () {
    };
    __decorate([
        property(cc.Prefab)
    ], levelBox.prototype, "levelBgItem", void 0);
    levelBox = __decorate([
        ccclass
    ], levelBox);
    return levelBox;
}(baseTs_1.default));
exports.default = levelBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxsZXZlbEJnQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBRTVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFNO0lBQTVDO1FBQUEscUVBc0NDO1FBcENHLFdBQVc7UUFFSCxpQkFBVyxHQUFhLElBQUksQ0FBQzs7UUFpQ3JDLGlCQUFpQjtJQUNyQixDQUFDO0lBN0JHLHlCQUFNLEdBQU47UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxJQUFJLEdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEMsVUFBVTtRQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsb0JBQW9CLEVBQUMsVUFBQyxJQUFJO1lBQ3hDLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRVIsVUFBVTtRQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsbUJBQW1CLEVBQUMsVUFBQyxJQUFJO1lBQ3ZDLElBQUcsSUFBSSxFQUFDO2dCQUNKLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO1FBQ0wsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBR1osQ0FBQztJQUVELHdCQUFLLEdBQUw7SUFFQSxDQUFDO0lBMUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ2lCO0lBSnBCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FzQzVCO0lBQUQsZUFBQztDQXRDRCxBQXNDQyxDQXRDcUMsZ0JBQU0sR0FzQzNDO2tCQXRDb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcG9vbCBmcm9tIFwiLi4vY29tbW9uL3Bvb2xcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsZXZlbEJveCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICAvKirog4zmma/lr7nosaHmsaAgKi9cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHByaXZhdGUgbGV2ZWxCZ0l0ZW06Y2MuUHJlZmFiID0gbnVsbDtcblxuICAgIC8qKuiDjOaZr+WvueixoeaxoCAqL1xuICAgIHByaXZhdGUgYmdQb29sOnBvb2w7IFxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgbGV0IGl0ZW06Y2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGV2ZWxCZ0l0ZW0pO1xuICAgICAgICB0aGlzLmJnUG9vbCA9IG5ldyBwb29sKGl0ZW0sMTYpO1xuXG4gICAgICAgIC8qKuebkeWQrOWIm+W7uiAqL1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0xldmVsQmdfQ3JlYXRvciwoZGF0YSk9PntcbiAgICAgICAgICAgIHRoaXMuYmdQb29sLmNyZWF0ZUVuZW15KHRoaXMubm9kZSxkYXRhKTtcbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICAvKirnm5HlkKzplIDmr4EgKi9cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9MZXZlbEJnX0tpbGxlZCwoZGF0YSk9PntcbiAgICAgICAgICAgIGlmKGRhdGEpe1xuICAgICAgICAgICAgICAgIHRoaXMuYmdQb29sLm9uRW5lbXlLaWxsZWQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sdGhpcyk7XG5cblxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuXG4gICAgXG5cbiAgICBcbiAgICBcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19