/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-09 20:20:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-03-09 20:32:01
 */

export namespace MessageCenter {
    export let callbacks = {}
    /**
     * 注册消息回调通知， message：注册的事件名称， callback：回掉执行的方法
     */
    export function registerCallback(message: string, callback: Function) {
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

    /**
     * 反注册消息回调通知， message：注册的事件名称， callback：回掉执行的方法
     */
    export function unRegisterCallback(message: string, callback: Function) {
        if (!message || !callback) {
            return;
        }
        const callbacksWithType = MessageCenter.callbacks[message];
        if (callbacksWithType) {
            const index = callbacksWithType.indexOf(callback);
            callbacksWithType.splice(index, 1);
        }
    }

    /**
     * 删除同一消息下的所有回调通知
     */
    export function removeAllCallbackWithMessage(message: string) {
        if (!message) {
            return;
        }

        delete MessageCenter.callbacks[message];
    }

    /**
     * 发送消息
     */
    export function sendMessage(message: string, value?: any) {
        if (!message) {
            return;
        }

        const callbacksWithType = MessageCenter.callbacks[message];

        if (callbacksWithType && callbacksWithType.length > 0) {
            for (var i = 0; i < callbacksWithType.length; i++) {
                try {
                    const callbackFun = callbacksWithType[i];
                    callbackFun && callbackFun(value);
                } catch (e) { }
            }
        }
    }
}