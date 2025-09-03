
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameProp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '143dbDpUYJE+4l4zMgJ3BV5', 'gameProp');
// Script/pop/gameProp.ts

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
var jsonSingleton_1 = require("../base/jsonSingleton");
var NameTs_1 = require("../common/NameTs");
var propItem_1 = require("../prop/propItem");
var soundController_1 = require("../soundController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameProp = /** @class */ (function (_super) {
    __extends(gameProp, _super);
    function gameProp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layOutContent = null;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    /**初始化 */
    gameProp.prototype.init = function () {
        var _this = this;
        /**道具 */
        var propData = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.propData);
        this.loadAny("prefab/prop/propItem", cc.Prefab, function (pre) {
            _this.propPre = pre;
            if (propData) {
                propData.forEach(function (value) {
                    var item = cc.instantiate(pre);
                    item.setParent(_this.layOutContent);
                    var itemTs = item.getComponent(propItem_1.default);
                    if (itemTs)
                        itemTs.init && itemTs.init(value);
                });
            }
        });
    };
    gameProp.prototype.start = function () {
    };
    /**关闭 */
    gameProp.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.propPre = null;
        this.closePage();
    };
    __decorate([
        property({ type: cc.Node, displayName: "layout框" })
    ], gameProp.prototype, "layOutContent", void 0);
    gameProp = __decorate([
        ccclass
    ], gameProp);
    return gameProp;
}(baseTs_1.default));
exports.default = gameProp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyx1REFBa0Q7QUFDbEQsMkNBQXNDO0FBQ3RDLDZDQUF3QztBQUN4QyxzREFBaUQ7QUFFM0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQU07SUFBNUM7UUFBQSxxRUF5Q0M7UUF0Q1csbUJBQWEsR0FBWSxJQUFJLENBQUM7O1FBcUN0QyxpQkFBaUI7SUFDckIsQ0FBQztJQWxDRyxlQUFlO0lBRWYsU0FBUztJQUNULHVCQUFJLEdBQUo7UUFBQSxpQkFpQkM7UUFoQkcsUUFBUTtRQUNSLElBQUksUUFBUSxHQUFHLHVCQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxVQUFDLEdBQWE7WUFFeEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDbkIsSUFBRyxRQUFRLEVBQUM7Z0JBQ1IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7b0JBQ2xCLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNuQyxJQUFJLE1BQU0sR0FBWSxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztvQkFDbEQsSUFBRyxNQUFNO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELHdCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsUUFBUTtJQUNSLDJCQUFRLEdBQVI7UUFDSSx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQW5DRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsQ0FBQzttREFDVDtJQUhyQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBeUM1QjtJQUFELGVBQUM7Q0F6Q0QsQUF5Q0MsQ0F6Q3FDLGdCQUFNLEdBeUMzQztrQkF6Q29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IGpzb25TaW5nbGV0b24gZnJvbSBcIi4uL2Jhc2UvanNvblNpbmdsZXRvblwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHByb3BJdGVtIGZyb20gXCIuLi9wcm9wL3Byb3BJdGVtXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lUHJvcCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcImxheW91dOahhlwifSlcbiAgICBwcml2YXRlIGxheU91dENvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLyoq6YGT5YW36aKE5Yi25L2TICovXG4gICAgcHJpdmF0ZSBwcm9wUHJlOmNjLlByZWZhYjtcbiAgICAvLyBvbkxvYWQgKCkge31cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoKXtcbiAgICAgICAgLyoq6YGT5YW3ICovXG4gICAgICAgIGxldCBwcm9wRGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLnByb3BEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9hZEFueShcInByZWZhYi9wcm9wL3Byb3BJdGVtXCIsY2MuUHJlZmFiLChwcmU6Y2MuUHJlZmFiKT0+e1xuXG4gICAgICAgICAgICB0aGlzLnByb3BQcmUgPSBwcmU7XG4gICAgICAgICAgICBpZihwcm9wRGF0YSl7XG4gICAgICAgICAgICAgICAgcHJvcERhdGEuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLmxheU91dENvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVRzOnByb3BJdGVtID0gaXRlbS5nZXRDb21wb25lbnQocHJvcEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpZihpdGVtVHMpaXRlbVRzLmluaXQmJml0ZW1Ucy5pbml0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLyoq5YWz6ZetICovXG4gICAgY2xvc2VCdG4oKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMucHJvcFByZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==