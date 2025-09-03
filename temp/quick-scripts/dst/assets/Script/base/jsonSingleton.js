
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/base/jsonSingleton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYXNlXFxqc29uU2luZ2xldG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtRQUVJLGFBQVEsR0FBTyxFQUFFLENBQUM7SUFxQ3RCLENBQUM7SUFqQ0c7Ozs7T0FJRztJQUNILGdDQUFRLEdBQVIsVUFBUyxHQUFZLEVBQUMsSUFBb0I7UUFBMUMsaUJBbUJDO1FBbkJxQixxQkFBQSxFQUFBLHFCQUFtQixDQUFDO1FBQ3RDLElBQUksR0FBRyxHQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBRyxHQUFHLElBQUUsQ0FBQyxFQUFDO1lBQ04sSUFBSSxJQUFFLElBQUksRUFBRSxDQUFDO1lBQ2IsT0FBTztTQUNWO1FBQ0QsSUFBRyxHQUFHLEVBQUM7WUFDSCxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFFWixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLFNBQXNCO29CQUN4RCxHQUFHLEVBQUUsQ0FBQztvQkFDTixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBRXJDLElBQUcsR0FBRyxJQUFFLENBQUMsRUFBQzt3QkFDTixJQUFJLElBQUUsSUFBSSxFQUFFLENBQUM7cUJBQ2hCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFDRDs7O09BR0c7SUFDSCwrQkFBTyxHQUFQLFVBQVEsSUFBSTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBakNhLHVCQUFTLEdBQWlCLElBQUksQ0FBQztJQW1DakQsb0JBQUM7Q0F2Q0QsQUF1Q0MsSUFBQTtBQUVELGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztBQUM5QyxrQkFBZSxhQUFhLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBqc29uU2luZ2xldG9ue1xuXG4gICAganNvbkRhdGE6YW55ID0ge307XG5cbiAgICBwdWJsaWMgc3RhdGljIHNpbmdsZXRvbjpqc29uU2luZ2xldG9uID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOWKoOi9veWTquS6m1xuICAgICAqIEBwYXJhbSBhcnIg5pWw57uEXG4gICAgICogQHBhcmFtIGNhbGwg5Zue6LCDXG4gICAgICovXG4gICAgbG9hZEpzb24oYXJyOnN0cmluZ1tdLGNhbGw6RnVuY3Rpb249KCk9Pnt9KXtcbiAgICAgICAgbGV0IGxlbjpudW1iZXIgPSBhcnIubGVuZ3RoO1xuICAgICAgICBpZihsZW48PTApe1xuICAgICAgICAgICAgY2FsbCYmY2FsbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFycil7XG4gICAgICAgICAgICBhcnIuZm9yRWFjaChuYW1lPT57XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdkYXRhLycrbmFtZSwgKGVyciwganNvbkFzc2V0OmNjLkpzb25Bc3NldCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmpzb25EYXRhW25hbWVdID0ganNvbkFzc2V0Lmpzb247XG5cdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgIGlmKGxlbj09MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsJiZjYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIG5hbWUg5ZOq5Liq5pWw5o2uXG4gICAgICovXG4gICAgZ2V0SnNvbihuYW1lKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuanNvbkRhdGFbbmFtZV07XG4gICAgfVxuICAgIFxufVxuXG5qc29uU2luZ2xldG9uLnNpbmdsZXRvbiA9IG5ldyBqc29uU2luZ2xldG9uKCk7XG5leHBvcnQgZGVmYXVsdCBqc29uU2luZ2xldG9uO1xuIl19