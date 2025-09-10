
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/base/Singleton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7996cNbgY1LzLfxOZ4py8eT', 'Singleton');
// Script/base/Singleton.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/***
 * 泛型单例模式接口
 */
var Singleton = /** @class */ (function () {
    function Singleton() {
    }
    Singleton.getInstance = function () {
        if (this._insatnce === null) {
            this._insatnce = new this();
        }
        return this._insatnce;
    };
    Singleton._insatnce = null;
    return Singleton;
}());
exports.default = Singleton;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYXNlXFxTaW5nbGV0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNIO0lBQUE7SUFRQSxDQUFDO0lBTlUscUJBQVcsR0FBbEI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUMvQjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBTmMsbUJBQVMsR0FBUSxJQUFJLENBQUM7SUFPekMsZ0JBQUM7Q0FSRCxBQVFDLElBQUE7a0JBUm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKioqXG4gKiDms5vlnovljZXkvovmqKHlvI/mjqXlj6NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2luZ2xldG9uIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zYXRuY2U6IGFueSA9IG51bGw7XG4gICAgc3RhdGljIGdldEluc3RhbmNlPFQ+KCk6IFQge1xuICAgICAgICBpZiAodGhpcy5faW5zYXRuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc2F0bmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW5zYXRuY2U7XG4gICAgfVxufVxuXG4iXX0=