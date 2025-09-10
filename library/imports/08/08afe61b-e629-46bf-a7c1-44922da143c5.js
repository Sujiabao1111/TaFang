"use strict";
cc._RF.push(module, '08afeYb5ilGv6fBRJItoUPF', 'jsonSingleton');
// Script/base/jsonSingleton.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonSingleton = /** @class */ (function () {
    function jsonSingleton() {
        this.jsonData = {};
    }
    /**
     * 加载哪些
     * @param arr 数组
     * @param call 回调
     */
    jsonSingleton.prototype.loadJson = function (arr, call) {
        var _this = this;
        if (call === void 0) { call = function () { }; }
        var len = arr.length;
        if (len <= 0) {
            call && call();
            return;
        }
        if (arr) {
            arr.forEach(function (name) {
                cc.resources.load('data/' + name, function (err, jsonAsset) {
                    len--;
                    _this.jsonData[name] = jsonAsset.json;
                    if (len == 0) {
                        call && call();
                    }
                });
            });
        }
    };
    /**
     *
     * @param name 哪个数据
     */
    jsonSingleton.prototype.getJson = function (name) {
        return this.jsonData[name];
    };
    jsonSingleton.singleton = null;
    return jsonSingleton;
}());
jsonSingleton.singleton = new jsonSingleton();
exports.default = jsonSingleton;

cc._RF.pop();