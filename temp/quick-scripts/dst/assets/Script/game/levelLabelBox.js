
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/levelLabelBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'edc57G3f5hEobuBlnQL77dW', 'levelLabelBox');
// Script/game/levelLabelBox.ts

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
        _this.levelLabelItem = null;
        return _this;
        // update (dt) {}
    }
    levelBox.prototype.onLoad = function () {
        // this.loadAny("prefab/levelBox/levelLabelItem",cc.Prefab,(res)=>{            
        //     this.labelPool = new pool(res,16);
        // });
        var _this = this;
        var item = cc.instantiate(this.levelLabelItem);
        this.labelPool = new pool_1.default(item, 16);
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_LevelLabel_Creator, function (data) {
            _this.labelPool.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_LevelLabel_Killed, function (data) {
            if (data && data.isValid) {
                _this.labelPool.onEnemyKilled(data);
            }
        }, this);
    };
    levelBox.prototype.start = function () {
    };
    __decorate([
        property(cc.Prefab)
    ], levelBox.prototype, "levelLabelItem", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxsZXZlbExhYmVsQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBRTVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFNO0lBQTVDO1FBQUEscUVBeUNDO1FBdkNHLFdBQVc7UUFFSCxvQkFBYyxHQUFhLElBQUksQ0FBQzs7UUFvQ3hDLGlCQUFpQjtJQUNyQixDQUFDO0lBakNHLHlCQUFNLEdBQU47UUFFSSwrRUFBK0U7UUFDL0UseUNBQXlDO1FBQ3pDLE1BQU07UUFKVixpQkFxQkM7UUFmRyxJQUFJLElBQUksR0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztRQUVuQyxVQUFVO1FBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyx1QkFBdUIsRUFBQyxVQUFDLElBQUk7WUFDM0MsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFUixVQUFVO1FBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxzQkFBc0IsRUFBQyxVQUFDLElBQUk7WUFDMUMsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBQztnQkFDcEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEM7UUFDTCxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFFWixDQUFDO0lBRUQsd0JBQUssR0FBTDtJQUVBLENBQUM7SUE3QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDb0I7SUFKdkIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXlDNUI7SUFBRCxlQUFDO0NBekNELEFBeUNDLENBekNxQyxnQkFBTSxHQXlDM0M7a0JBekNvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwb29sIGZyb20gXCIuLi9jb21tb24vcG9vbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxldmVsQm94IGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIC8qKuiDjOaZr+WvueixoeaxoCAqL1xuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcHJpdmF0ZSBsZXZlbExhYmVsSXRlbTpjYy5QcmVmYWIgPSBudWxsO1xuICAgIC8qKuWtl+WvueixoeaxoCAqL1xuICAgIHByaXZhdGUgbGFiZWxQb29sOnBvb2w7IFxuXG4gICAgb25Mb2FkICgpIHtcblxuICAgICAgICAvLyB0aGlzLmxvYWRBbnkoXCJwcmVmYWIvbGV2ZWxCb3gvbGV2ZWxMYWJlbEl0ZW1cIixjYy5QcmVmYWIsKHJlcyk9PnsgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgIHRoaXMubGFiZWxQb29sID0gbmV3IHBvb2wocmVzLDE2KTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgaXRlbTpjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5sZXZlbExhYmVsSXRlbSk7XG4gICAgICAgIHRoaXMubGFiZWxQb29sID0gbmV3IHBvb2woaXRlbSwxNik7XG5cbiAgICAgICAgLyoq55uR5ZCs5Yib5bu6ICovXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTGV2ZWxMYWJlbF9DcmVhdG9yLChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5sYWJlbFBvb2wuY3JlYXRlRW5lbXkodGhpcy5ub2RlLGRhdGEpO1xuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIC8qKuebkeWQrOmUgOavgSAqL1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0xldmVsTGFiZWxfS2lsbGVkLChkYXRhKT0+e1xuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxQb29sLm9uRW5lbXlLaWxsZWQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cblxuICAgIFxuXG4gICAgXG4gICAgXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==