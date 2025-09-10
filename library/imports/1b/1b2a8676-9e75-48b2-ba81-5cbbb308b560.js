"use strict";
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