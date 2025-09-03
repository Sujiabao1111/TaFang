
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Message/MessageCenter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1b2a8Z2nnVIsrqBXLuzCLVg', 'MessageCenter');
// Script/server/xmsdk_cocos/Message/MessageCenter.ts

"use strict";
/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-03-09 20:20:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-03-09 20:32:01
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCenter = void 0;
var MessageCenter;
(function (MessageCenter) {
    MessageCenter.callbacks = {};
    /**
     * 注册消息回调通知， message：注册的事件名称， callback：回掉执行的方法
     */
    function registerCallback(message, callback) {
        if ((!message || !callback) || (typeof callback != 'function')) {
            return;
        }
        if (!MessageCenter.callbacks[message]) {
            MessageCenter.callbacks[message] = [];
        }
        if (MessageCenter.callbacks[message].indexOf(callback) == -1) {
            MessageCenter.callbacks[message].push(callback);
        }
    }
    MessageCenter.registerCallback = registerCallback;
    /**
     * 反注册消息回调通知， message：注册的事件名称， callback：回掉执行的方法
     */
    function unRegisterCallback(message, callback) {
        if (!message || !callback) {
            return;
        }
        var callbacksWithType = MessageCenter.callbacks[message];
        if (callbacksWithType) {
            var index = callbacksWithType.indexOf(callback);
            callbacksWithType.splice(index, 1);
        }
    }
    MessageCenter.unRegisterCallback = unRegisterCallback;
    /**
     * 删除同一消息下的所有回调通知
     */
    function removeAllCallbackWithMessage(message) {
        if (!message) {
            return;
        }
        delete MessageCenter.callbacks[message];
    }
    MessageCenter.removeAllCallbackWithMessage = removeAllCallbackWithMessage;
    /**
     * 发送消息
     */
    function sendMessage(message, value) {
        if (!message) {
            return;
        }
        var callbacksWithType = MessageCenter.callbacks[message];
        if (callbacksWithType && callbacksWithType.length > 0) {
            for (var i = 0; i < callbacksWithType.length; i++) {
                try {
                    var callbackFun = callbacksWithType[i];
                    callbackFun && callbackFun(value);
                }
                catch (e) { }
            }
        }
    }
    MessageCenter.sendMessage = sendMessage;
})(MessageCenter = exports.MessageCenter || (exports.MessageCenter = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxNZXNzYWdlXFxNZXNzYWdlQ2VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztHQU9HOzs7QUFFSCxJQUFpQixhQUFhLENBK0Q3QjtBQS9ERCxXQUFpQixhQUFhO0lBQ2YsdUJBQVMsR0FBRyxFQUFFLENBQUE7SUFDekI7O09BRUc7SUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxPQUFlLEVBQUUsUUFBa0I7UUFDaEUsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLFFBQVEsSUFBSSxVQUFVLENBQUMsRUFBRTtZQUM1RCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNuQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN6QztRQUVELElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDMUQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDO0lBWmUsOEJBQWdCLG1CQVkvQixDQUFBO0lBRUQ7O09BRUc7SUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxPQUFlLEVBQUUsUUFBa0I7UUFDbEUsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFNLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsSUFBSSxpQkFBaUIsRUFBRTtZQUNuQixJQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFUZSxnQ0FBa0IscUJBU2pDLENBQUE7SUFFRDs7T0FFRztJQUNILFNBQWdCLDRCQUE0QixDQUFDLE9BQWU7UUFDeEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU87U0FDVjtRQUVELE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBTmUsMENBQTRCLCtCQU0zQyxDQUFBO0lBRUQ7O09BRUc7SUFDSCxTQUFnQixXQUFXLENBQUMsT0FBZSxFQUFFLEtBQVc7UUFDcEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU87U0FDVjtRQUVELElBQU0saUJBQWlCLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzRCxJQUFJLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0MsSUFBSTtvQkFDQSxJQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckM7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRzthQUNsQjtTQUNKO0lBQ0wsQ0FBQztJQWZlLHlCQUFXLGNBZTFCLENBQUE7QUFDTCxDQUFDLEVBL0RnQixhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQStEN0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQERlc2NyaXB0dGlvbjogXG4gKiBAdmVyc2lvbjogXG4gKiBAQXV0aG9yOiBzdWVSaW1uXG4gKiBARGF0ZTogMjAyMC0wMy0wOSAyMDoyMDozNlxuICogQExhc3RFZGl0b3JzOiBzdWVSaW1uXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIwLTAzLTA5IDIwOjMyOjAxXG4gKi9cblxuZXhwb3J0IG5hbWVzcGFjZSBNZXNzYWdlQ2VudGVyIHtcbiAgICBleHBvcnQgbGV0IGNhbGxiYWNrcyA9IHt9XG4gICAgLyoqXG4gICAgICog5rOo5YaM5raI5oGv5Zue6LCD6YCa55+l77yMIG1lc3NhZ2XvvJrms6jlhoznmoTkuovku7blkI3np7DvvIwgY2FsbGJhY2vvvJrlm57mjonmiafooYznmoTmlrnms5VcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDYWxsYmFjayhtZXNzYWdlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAoKCFtZXNzYWdlIHx8ICFjYWxsYmFjaykgfHwgKHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFNZXNzYWdlQ2VudGVyLmNhbGxiYWNrc1ttZXNzYWdlXSkge1xuICAgICAgICAgICAgTWVzc2FnZUNlbnRlci5jYWxsYmFja3NbbWVzc2FnZV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChNZXNzYWdlQ2VudGVyLmNhbGxiYWNrc1ttZXNzYWdlXS5pbmRleE9mKGNhbGxiYWNrKSA9PSAtMSkge1xuICAgICAgICAgICAgTWVzc2FnZUNlbnRlci5jYWxsYmFja3NbbWVzc2FnZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlj43ms6jlhozmtojmga/lm57osIPpgJrnn6XvvIwgbWVzc2FnZe+8muazqOWGjOeahOS6i+S7tuWQjeensO+8jCBjYWxsYmFja++8muWbnuaOieaJp+ihjOeahOaWueazlVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiB1blJlZ2lzdGVyQ2FsbGJhY2sobWVzc2FnZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKCFtZXNzYWdlIHx8ICFjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrc1dpdGhUeXBlID0gTWVzc2FnZUNlbnRlci5jYWxsYmFja3NbbWVzc2FnZV07XG4gICAgICAgIGlmIChjYWxsYmFja3NXaXRoVHlwZSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3NXaXRoVHlwZS5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGNhbGxiYWNrc1dpdGhUeXBlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKDpmaTlkIzkuIDmtojmga/kuIvnmoTmiYDmnInlm57osIPpgJrnn6VcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsQ2FsbGJhY2tXaXRoTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgTWVzc2FnZUNlbnRlci5jYWxsYmFja3NbbWVzc2FnZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+R6YCB5raI5oGvXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZywgdmFsdWU/OiBhbnkpIHtcbiAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjYWxsYmFja3NXaXRoVHlwZSA9IE1lc3NhZ2VDZW50ZXIuY2FsbGJhY2tzW21lc3NhZ2VdO1xuXG4gICAgICAgIGlmIChjYWxsYmFja3NXaXRoVHlwZSAmJiBjYWxsYmFja3NXaXRoVHlwZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrc1dpdGhUeXBlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tGdW4gPSBjYWxsYmFja3NXaXRoVHlwZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tGdW4gJiYgY2FsbGJhY2tGdW4odmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==