"use strict";
cc._RF.push(module, '4d963+Xx1FABLmlLngMLUbu', 'AndroidCocosBridge');
// Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AndroidCocosBridge = /** @class */ (function () {
    function AndroidCocosBridge() {
    }
    AndroidCocosBridge.checkAndInit = function () {
        if (!window[AndroidCocosBridge.COCOS_CALLBACK_PREFIX]) {
            window[AndroidCocosBridge.COCOS_CALLBACK_PREFIX] = {};
        }
    };
    AndroidCocosBridge.call = function (methodName, arg, callBackFun) {
        if (!methodName || !methodName.trim()) {
            return;
        }
        AndroidCocosBridge.checkAndInit();
        var nativeArg = JSON.stringify(arg || {});
        var cocosCallbackFunName = "";
        if (callBackFun) {
            var name = "call" + (++AndroidCocosBridge.sCurCallbackFunCount);
            cocosCallbackFunName = AndroidCocosBridge.COCOS_CALLBACK_PREFIX + "." + name;
            window[AndroidCocosBridge.COCOS_CALLBACK_PREFIX][name] = function (res) {
                callBackFun(res);
            };
        }
        return jsb.reflection.callStaticMethod(AndroidCocosBridge.CLASS_NAME, AndroidCocosBridge.METHOD_NAME, "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", methodName, nativeArg, cocosCallbackFunName);
    };
    //安卓端调用的名字
    AndroidCocosBridge.CLASS_NAME = "org/cocos2dx/javascript/bridge/CocosBridgeHandle";
    AndroidCocosBridge.METHOD_NAME = "call";
    AndroidCocosBridge.COCOS_CALLBACK_PREFIX = "CocosBridgeCallbacks";
    AndroidCocosBridge.sCurCallbackFunCount = 0;
    return AndroidCocosBridge;
}());
exports.default = AndroidCocosBridge;

cc._RF.pop();