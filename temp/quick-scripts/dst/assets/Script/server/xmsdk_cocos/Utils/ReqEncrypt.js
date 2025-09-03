
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '693718gFXhPf5hOACy1WSUS', 'ReqEncrypt');
// Script/server/xmsdk_cocos/Utils/ReqEncrypt.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppInfo_1 = require("./../Config/AppInfo");
var PlatformFactory_1 = require("./../Adapter/PlatformFactory");
var reqEncrypt = function (data, callback) {
    //获取签到的
    if (AppInfo_1.AppInfo.isEncryptData) {
        PlatformFactory_1.default.Ins.signRequestBody(JSON.stringify(data), function (res) {
            callback({ "code": res });
        });
    }
    else {
        callback(data);
    }
};
exports.default = reqEncrypt;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxVdGlsc1xcUmVxRW5jcnlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE0QztBQUM1QyxnRUFBMkQ7QUFFM0QsSUFBTSxVQUFVLEdBQUcsVUFBUyxJQUFJLEVBQUUsUUFBUTtJQUN0QyxPQUFPO0lBQ1AsSUFBRyxpQkFBTyxDQUFDLGFBQWEsRUFBQztRQUNyQix5QkFBZSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFDLEdBQUc7WUFDMUQsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFHLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUE7S0FDTDtTQUFNO1FBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcHBJbmZvfSBmcm9tICcuLy4uL0NvbmZpZy9BcHBJbmZvJztcbmltcG9ydCBQbGF0Zm9ybUZhY3RvcnkgZnJvbSBcIi4vLi4vQWRhcHRlci9QbGF0Zm9ybUZhY3RvcnlcIjtcblxuY29uc3QgcmVxRW5jcnlwdCA9IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKXtcbiAgICAvL+iOt+WPluetvuWIsOeahFxuICAgIGlmKEFwcEluZm8uaXNFbmNyeXB0RGF0YSl7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuc2lnblJlcXVlc3RCb2R5KEpTT04uc3RyaW5naWZ5KGRhdGEpLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XCJjb2RlXCIgOiByZXN9KTtcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXFFbmNyeXB0OyJdfQ==