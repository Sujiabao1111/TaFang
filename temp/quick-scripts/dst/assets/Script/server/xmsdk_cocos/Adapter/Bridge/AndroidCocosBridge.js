
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBZGFwdGVyXFxCcmlkZ2VcXEFuZHJvaWRDb2Nvc0JyaWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFtQ0EsQ0FBQztJQTVCa0IsK0JBQVksR0FBM0I7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDbkQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3pEO0lBQ0wsQ0FBQztJQUVhLHVCQUFJLEdBQWxCLFVBQW1CLFVBQWtCLEVBQUUsR0FBYSxFQUFFLFdBQXVCO1FBQ3pFLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkMsT0FBTztTQUNWO1FBRUQsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFbEMsSUFBSSxTQUFTLEdBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7UUFFOUIsSUFBSSxXQUFXLEVBQUU7WUFDYixJQUFJLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDaEUsb0JBQW9CLEdBQUcsa0JBQWtCLENBQUMscUJBQXFCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztZQUM3RSxNQUFNLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFDLEdBQUc7Z0JBQ3pELFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUM7U0FDTDtRQUVELE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsV0FBVyxFQUNoRyw0RUFBNEUsRUFDNUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFqQ0QsVUFBVTtJQUNLLDZCQUFVLEdBQVcsa0RBQWtELENBQUM7SUFDeEUsOEJBQVcsR0FBVyxNQUFNLENBQUM7SUFDN0Isd0NBQXFCLEdBQUcsc0JBQXNCLENBQUM7SUFDL0MsdUNBQW9CLEdBQVksQ0FBQyxDQUFDO0lBOEJyRCx5QkFBQztDQW5DRCxBQW1DQyxJQUFBO2tCQW5Db0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5kcm9pZENvY29zQnJpZGdlIHtcbiAgICAvL+WuieWNk+err+iwg+eUqOeahOWQjeWtl1xuICAgIHByaXZhdGUgc3RhdGljIENMQVNTX05BTUU6IHN0cmluZyA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvYnJpZGdlL0NvY29zQnJpZGdlSGFuZGxlXCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgTUVUSE9EX05BTUU6IHN0cmluZyA9IFwiY2FsbFwiO1xuICAgIHByaXZhdGUgc3RhdGljIENPQ09TX0NBTExCQUNLX1BSRUZJWCA9IFwiQ29jb3NCcmlkZ2VDYWxsYmFja3NcIjtcbiAgICBwcml2YXRlIHN0YXRpYyBzQ3VyQ2FsbGJhY2tGdW5Db3VudCA6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjaGVja0FuZEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghd2luZG93W0FuZHJvaWRDb2Nvc0JyaWRnZS5DT0NPU19DQUxMQkFDS19QUkVGSVhdKSB7XG4gICAgICAgICAgICB3aW5kb3dbQW5kcm9pZENvY29zQnJpZGdlLkNPQ09TX0NBTExCQUNLX1BSRUZJWF0gPSB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2FsbChtZXRob2ROYW1lOiBzdHJpbmcsIGFyZyA/OiBvYmplY3QsIGNhbGxCYWNrRnVuID86IEZ1bmN0aW9uKTogbnVsbCB7XG4gICAgICAgIGlmICghbWV0aG9kTmFtZSB8fCAhbWV0aG9kTmFtZS50cmltKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jaGVja0FuZEluaXQoKTtcblxuICAgICAgICBsZXQgbmF0aXZlQXJnIDogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoYXJnIHx8IHt9KTtcbiAgICAgICAgbGV0IGNvY29zQ2FsbGJhY2tGdW5OYW1lID0gXCJcIjtcblxuICAgICAgICBpZiAoY2FsbEJhY2tGdW4pIHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gXCJjYWxsXCIgKyAoKytBbmRyb2lkQ29jb3NCcmlkZ2Uuc0N1ckNhbGxiYWNrRnVuQ291bnQpO1xuICAgICAgICAgICAgY29jb3NDYWxsYmFja0Z1bk5hbWUgPSBBbmRyb2lkQ29jb3NCcmlkZ2UuQ09DT1NfQ0FMTEJBQ0tfUFJFRklYICsgXCIuXCIgKyBuYW1lO1xuICAgICAgICAgICAgd2luZG93W0FuZHJvaWRDb2Nvc0JyaWRnZS5DT0NPU19DQUxMQkFDS19QUkVGSVhdW25hbWVdID0gKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxCYWNrRnVuKHJlcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoQW5kcm9pZENvY29zQnJpZGdlLkNMQVNTX05BTUUsIEFuZHJvaWRDb2Nvc0JyaWRnZS5NRVRIT0RfTkFNRSxcbiAgICAgICAgICAgIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZztcIixcbiAgICAgICAgICAgIG1ldGhvZE5hbWUsIG5hdGl2ZUFyZywgY29jb3NDYWxsYmFja0Z1bk5hbWUpO1xuICAgIH1cbn0iXX0=