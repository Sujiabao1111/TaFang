"use strict";
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