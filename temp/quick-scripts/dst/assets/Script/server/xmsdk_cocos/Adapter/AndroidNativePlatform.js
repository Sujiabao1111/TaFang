
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2b328WdEYpNn6Rfc+j8CKEv', 'AndroidNativePlatform');
// Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AndroidCocosBridge_1 = require("./Bridge/AndroidCocosBridge");
var AppInfo_1 = require("../Config/AppInfo");
var mock1_1 = require("../mock1");
/**
 * 安卓原生
 */
var AndroidNativePlatform = /** @class */ (function () {
    function AndroidNativePlatform() {
    }
    /**
     * 与SDK交互通信
     * @param funcName 方法名
     * @param params 参数
     * @param callback 回调
     */
    AndroidNativePlatform.prototype.call = function (funcName, params, callback) {
        return AndroidCocosBridge_1.default.call(funcName, params, callback);
    };
    AndroidNativePlatform.prototype.getAdheadString = function () {
        return AndroidCocosBridge_1.default.call("createRequestHeaderStr");
    };
    AndroidNativePlatform.prototype.getPheadString = function () {
        if (AppInfo_1.AppInfo.isLocal) {
            return mock1_1.default.PHEAD;
        }
        return AndroidCocosBridge_1.default.call("getPhead");
    };
    AndroidNativePlatform.prototype.toNewIdiomAnswer = function () {
        return AndroidCocosBridge_1.default.call("toNewIdiomAnswer");
    };
    AndroidNativePlatform.prototype.openCalendarPermit = function () {
        AndroidCocosBridge_1.default.call("openCalendarPermit");
    };
    AndroidNativePlatform.prototype.checkCalendarPermit = function () {
        return AndroidCocosBridge_1.default.call("checkCalendarPermit");
    };
    AndroidNativePlatform.prototype.setCalendarPrompt = function (isStart) {
        AndroidCocosBridge_1.default.call("setCalendarPrompt", { isStart: isStart });
    };
    AndroidNativePlatform.prototype.loadAdView = function (adConfig, callback) {
        AndroidCocosBridge_1.default.call("loadAdView", adConfig);
    };
    AndroidNativePlatform.prototype.hideAdView = function (adConfig) {
        AndroidCocosBridge_1.default.call("hideAdView", adConfig);
    };
    AndroidNativePlatform.prototype.showAdView = function (adConfig) {
        AndroidCocosBridge_1.default.call("showAdView", adConfig);
    };
    AndroidNativePlatform.prototype.loadAdSdk = function (adConfig) {
        AndroidCocosBridge_1.default.call("loadAdSdk", adConfig);
    };
    AndroidNativePlatform.prototype.showAd = function (adConfig) {
        AndroidCocosBridge_1.default.call("showAd", adConfig);
    };
    AndroidNativePlatform.prototype.enableUploadAdSdkStatistic = function (args) {
    };
    AndroidNativePlatform.prototype.launchSceneSdkPage = function (launchParams) {
        AndroidCocosBridge_1.default.call("launchSceneSdkPage", launchParams);
    };
    AndroidNativePlatform.prototype.signRequestBody = function (args, callback) {
        var signStr = AndroidCocosBridge_1.default.call("signRequestBody", { data: args });
        callback(signStr);
    };
    AndroidNativePlatform.prototype.getNetworkState = function (callback) {
        var state = AndroidCocosBridge_1.default.call("getNetworkState");
        callback(state);
    };
    AndroidNativePlatform.prototype.recordLog = function (tag, content) {
        AndroidCocosBridge_1.default.call("recordLog", { tag: tag, content: content });
    };
    AndroidNativePlatform.prototype.updateHealthValue = function (health) {
        AndroidCocosBridge_1.default.call("updateHealthValue", { "health": health });
    };
    AndroidNativePlatform.prototype.isTestServer = function () {
        var call = AndroidCocosBridge_1.default.call("isTestServer");
        return call == "true";
    };
    AndroidNativePlatform.prototype.isDebug = function () {
        var call = AndroidCocosBridge_1.default.call("isDebug");
        return call == "true";
    };
    AndroidNativePlatform.prototype.getAppName = function () {
        var name = AndroidCocosBridge_1.default.call("getAppName");
        return name;
    };
    AndroidNativePlatform.prototype.enableOnResumeOnPause = function (args) {
        console.log("启动后台监听2", args);
        AndroidCocosBridge_1.default.call('enableOnResumeOnPause', args, null);
    };
    AndroidNativePlatform.prototype.retryToken = function () {
        AndroidCocosBridge_1.default.call("retryToken");
    };
    AndroidNativePlatform.prototype.authWechat = function () {
        AndroidCocosBridge_1.default.call("authWechat");
    };
    AndroidNativePlatform.prototype.requestAlipayAuth = function () {
        AndroidCocosBridge_1.default.call("requestAlipayAuth");
    };
    /**
     * 打开新人红包
     */
    AndroidNativePlatform.prototype.OpenNewBirdRed = function (callback) {
        AndroidCocosBridge_1.default.call('OpenNewBirdRed', {}, callback);
    };
    /**
     * 消除时打开游戏内红包
     * @param type ("1 全屏广告3秒关闭 2 激励视频 看完可关闭 3 不看广告")
     * @param adid 全屏广告或激励视频的广告id
     */
    AndroidNativePlatform.prototype.OpenGameRed = function (type, adid, callback) {
        var obj = {
            'type': type,
            'adid': adid,
        };
        AndroidCocosBridge_1.default.call('OpenGameRed', obj, callback);
    };
    /**
     * 打开余额弹窗
     * @param callback
     */
    AndroidNativePlatform.prototype.OpenBalanceDialog = function (callback) {
        AndroidCocosBridge_1.default.call('OpenBalanceDialog', {}, callback);
    };
    /**
     * 获取用户余额
     * @param callback
     */
    AndroidNativePlatform.prototype.ReqBalance = function (callback) {
        AndroidCocosBridge_1.default.call('ReqBalance', {}, callback);
    };
    /**
     * 获取用户信息
     */
    AndroidNativePlatform.prototype.ReqUserInfo = function (callback) {
        AndroidCocosBridge_1.default.call('ReqUserInfo', {}, callback);
    };
    /**
     * 展示通用弹窗
     */
    AndroidNativePlatform.prototype.OpenGeneralDialog = function (coin, multiple, callback) {
        var obj = {
            'coin': coin,
            'multiple': multiple,
        };
        if (coin >= 200) {
            obj.exchangeMoney = coin / 10000.0;
        }
        AndroidCocosBridge_1.default.call('OpenGeneralDialog', obj, callback);
    };
    /**
     * 震动
     * @param time 时长
     */
    AndroidNativePlatform.prototype.setVibrator = function (time, callback) {
        var obj = {
            'time': time,
        };
        AndroidCocosBridge_1.default.call('setVibrator', obj, callback);
    };
    /**
     * 提交埋点
     * @param obj 神策参数
     * @param callback 回调
     */
    AndroidNativePlatform.prototype.track = function (obj, callback) {
        AndroidCocosBridge_1.default.call('track', obj, callback);
    };
    /**
     * 提交预置属性
     * @param obj 神策参数
     * @param callback 回调
     */
    AndroidNativePlatform.prototype.trackUserProperties = function (obj, callback) {
        AndroidCocosBridge_1.default.call('trackUserProperties', obj, callback);
    };
    /**
     * 消除启动黑屏
     */
    AndroidNativePlatform.prototype.finishCocosLaunch = function () {
        AndroidCocosBridge_1.default.call('finishCocosLaunch');
    };
    /**
     * 更新当前无尽等级
     * @param current_level 等级
     * @param callback 回调
     */
    AndroidNativePlatform.prototype.updateCurrentLevel = function (current_level, callback) {
        var obj = {
            'current_level': current_level
        };
        AndroidCocosBridge_1.default.call('updateCurrentLevel', obj, callback);
    };
    /**
     * 更新当前闯关等级
     * @param current_pass_level 过关等级
     * @param callback 回调
     */
    AndroidNativePlatform.prototype.updateCurrentPassLevel = function (current_pass_level, callback) {
        var obj = {
            'current_pass_level': current_pass_level
        };
        AndroidCocosBridge_1.default.call('updateCurrentPassLevel', obj, callback);
    };
    /**
     * 获取刘海高度
     */
    AndroidNativePlatform.prototype.getLiuHaiHeight = function () {
        return AndroidCocosBridge_1.default.call("getLiuHaiHeight");
    };
    /**
     * 退出游戏
     */
    AndroidNativePlatform.prototype.exitGame = function () {
        AndroidCocosBridge_1.default.call("exitGame");
    };
    /**
     *
     * 启用后退键监控
     */
    AndroidNativePlatform.prototype.enableOnBackpressed = function (enable) {
        AndroidCocosBridge_1.default.call('enableOnBackpressed', { 'enable': enable }, null);
    };
    /**
     * 获取网络状态
     */
    AndroidNativePlatform.prototype.isNetworkConnected = function () {
        return AndroidCocosBridge_1.default.call('isNetworkConnected');
    };
    /**
     * 红包信息
     */
    AndroidNativePlatform.prototype.notifyConfig = function (obj) {
        AndroidCocosBridge_1.default.call('notifyConfig', obj, null);
    };
    /**
     * 反馈界面
     */
    AndroidNativePlatform.prototype.showCustomerService = function () {
        AndroidCocosBridge_1.default.call("showCustomerService");
    };
    /**
     * 注销界面
     */
    AndroidNativePlatform.prototype.cancelAccount = function () {
        AndroidCocosBridge_1.default.call("cancelAccount");
    };
    /**
    * 下载apk的方法
    */
    AndroidNativePlatform.prototype.downloadNewVersionApk = function () {
        AndroidCocosBridge_1.default.call("downloadNewVersionApk");
    };
    /**
     * 用户是否使用了更新有奖去更新apk
     */
    AndroidNativePlatform.prototype.hasNewVersionReward = function () {
        return AndroidCocosBridge_1.default.call("hasNewVersionReward");
    };
    /**
    * 重置更新有奖打点，下次不再调用
    */
    AndroidNativePlatform.prototype.resetNewVersionReward = function () {
        AndroidCocosBridge_1.default.call("resetNewVersionReward");
    };
    /**
     * 获取非强制更新版本
     */
    AndroidNativePlatform.prototype.getNewVersionName = function () {
        return AndroidCocosBridge_1.default.call("getNewVersionName");
    };
    /**
     * 判断通知栏权限是否开启
     */
    AndroidNativePlatform.prototype.isNotificationEnabled = function () {
        return AndroidCocosBridge_1.default.call("isNotificationEnabled");
    };
    /**
    * 跳转到通知设置界面
    */
    AndroidNativePlatform.prototype.startNotificationSetting = function () {
        AndroidCocosBridge_1.default.call("startNotificationSetting");
    };
    return AndroidNativePlatform;
}());
exports.default = AndroidNativePlatform;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBZGFwdGVyXFxBbmRyb2lkTmF0aXZlUGxhdGZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxrRUFBNkQ7QUFDN0QsNkNBQTRDO0FBQzVDLGtDQUE0QjtBQUU1Qjs7R0FFRztBQUNIO0lBQUE7SUFzVEEsQ0FBQztJQXBURzs7Ozs7T0FLRztJQUNILG9DQUFJLEdBQUosVUFBSyxRQUFnQixFQUFFLE1BQVksRUFBRSxRQUFtQjtRQUNwRCxPQUFPLDRCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQ0ksT0FBTyw0QkFBa0IsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNJLElBQUksaUJBQU8sQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxlQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyw0QkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELGdEQUFnQixHQUFoQjtRQUNJLE9BQU8sNEJBQWtCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDdEQsQ0FBQztJQUNELGtEQUFrQixHQUFsQjtRQUNJLDRCQUFrQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCxtREFBbUIsR0FBbkI7UUFDSSxPQUFPLDRCQUFrQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxpREFBaUIsR0FBakIsVUFBa0IsT0FBZ0I7UUFDOUIsNEJBQWtCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENB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Q0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7O01BRUU7SUFDRixxREFBcUIsR0FBckI7UUFDSSw0QkFBa0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpREFBaUIsR0FBakI7UUFDSSxPQUFPLDRCQUFrQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7T0FFRztJQUNILHFEQUFxQixHQUFyQjtRQUNJLE9BQU8sNEJBQWtCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOztNQUVFO0lBQ0Ysd0RBQXdCLEdBQXhCO1FBQ0ksNEJBQWtCLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVMLDRCQUFDO0FBQUQsQ0F0VEEsQUFzVEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJUGxhdGZvcm0gZnJvbSBcIi4vQmFzZS9JUGxhdGZvcm1cIjtcbmltcG9ydCB7IExvYWRBZFZpZXdDb25maWdUeXBlLCBTaG93QWRWaWV3Q29uZmlnVHlwZSB9IGZyb20gXCIuL1R5cGUvQWRWaWV3Q29uZmlnXCI7XG5pbXBvcnQgQWRDb25maWdUeXBlIGZyb20gXCIuL1R5cGUvQWRDb25maWdUeXBlXCI7XG5pbXBvcnQgQ29tbW9uU2V0dGluZ1R5cGUgZnJvbSBcIi4vVHlwZS9Db21tb25TZXR0aW5nVHlwZVwiO1xuaW1wb3J0IExhdW5jaFNka1BhZ2VUeXBlIGZyb20gXCIuL1R5cGUvTGF1bmNoU2RrUGFnZVR5cGVcIjtcbmltcG9ydCBBbmRyb2lkQ29jb3NCcmlkZ2UgZnJvbSBcIi4vQnJpZGdlL0FuZHJvaWRDb2Nvc0JyaWRnZVwiO1xuaW1wb3J0IHsgQXBwSW5mbyB9IGZyb20gXCIuLi9Db25maWcvQXBwSW5mb1wiO1xuaW1wb3J0IG1vY2sgZnJvbSBcIi4uL21vY2sxXCI7XG5cbi8qKlxuICog5a6J5Y2T5Y6f55SfXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuZHJvaWROYXRpdmVQbGF0Zm9ybSBpbXBsZW1lbnRzIElQbGF0Zm9ybSB7XG5cbiAgICAvKipcbiAgICAgKiDkuI5TREvkuqTkupLpgJrkv6FcbiAgICAgKiBAcGFyYW0gZnVuY05hbWUg5pa55rOV5ZCNXG4gICAgICogQHBhcmFtIHBhcmFtcyDlj4LmlbBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgICovXG4gICAgY2FsbChmdW5jTmFtZTogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKGZ1bmNOYW1lLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBnZXRBZGhlYWRTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwiY3JlYXRlUmVxdWVzdEhlYWRlclN0clwiKTtcbiAgICB9XG5cbiAgICBnZXRQaGVhZFN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBpZiAoQXBwSW5mby5pc0xvY2FsKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9jay5QSEVBRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJnZXRQaGVhZFwiKTtcbiAgICB9XG4gICAgdG9OZXdJZGlvbUFuc3dlcigpIHtcbiAgICAgICAgcmV0dXJuIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwidG9OZXdJZGlvbUFuc3dlclwiKVxuICAgIH1cbiAgICBvcGVuQ2FsZW5kYXJQZXJtaXQoKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwib3BlbkNhbGVuZGFyUGVybWl0XCIpO1xuICAgIH1cbiAgICBjaGVja0NhbGVuZGFyUGVybWl0KCkge1xuICAgICAgICByZXR1cm4gQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJjaGVja0NhbGVuZGFyUGVybWl0XCIpO1xuICAgIH1cbiAgICBzZXRDYWxlbmRhclByb21wdChpc1N0YXJ0OiBib29sZWFuKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwic2V0Q2FsZW5kYXJQcm9tcHRcIiwgeyBpc1N0YXJ0OiBpc1N0YXJ0IH0pO1xuICAgIH1cbiAgICBsb2FkQWRWaWV3KGFkQ29uZmlnOiBMb2FkQWRWaWV3Q29uZmlnVHlwZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbChcImxvYWRBZFZpZXdcIiwgYWRDb25maWcpO1xuICAgIH1cblxuICAgIGhpZGVBZFZpZXcoYWRDb25maWc6IEFkQ29uZmlnVHlwZSkge1xuICAgICAgICBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbChcImhpZGVBZFZpZXdcIiwgYWRDb25maWcpO1xuICAgIH1cblxuICAgIHNob3dBZFZpZXcoYWRDb25maWc6IFNob3dBZFZpZXdDb25maWdUeXBlKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwic2hvd0FkVmlld1wiLCBhZENvbmZpZyk7XG4gICAgfVxuXG4gICAgbG9hZEFkU2RrKGFkQ29uZmlnOiBBZENvbmZpZ1R5cGUpIHtcbiAgICAgICAgQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJsb2FkQWRTZGtcIiwgYWRDb25maWcpO1xuICAgIH1cblxuICAgIHNob3dBZChhZENvbmZpZzogQWRDb25maWdUeXBlKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwic2hvd0FkXCIsIGFkQ29uZmlnKTtcbiAgICB9XG5cbiAgICBlbmFibGVVcGxvYWRBZFNka1N0YXRpc3RpYyhhcmdzOiBDb21tb25TZXR0aW5nVHlwZSkge1xuICAgIH1cblxuICAgIGxhdW5jaFNjZW5lU2RrUGFnZShsYXVuY2hQYXJhbXM6IExhdW5jaFNka1BhZ2VUeXBlKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwibGF1bmNoU2NlbmVTZGtQYWdlXCIsIGxhdW5jaFBhcmFtcyk7XG4gICAgfVxuXG4gICAgc2lnblJlcXVlc3RCb2R5KGFyZ3M6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBzaWduU3RyOiBzdHJpbmcgPSBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbChcInNpZ25SZXF1ZXN0Qm9keVwiLCB7IGRhdGE6IGFyZ3MgfSk7XG4gICAgICAgIGNhbGxiYWNrKHNpZ25TdHIpO1xuICAgIH1cblxuICAgIGdldE5ldHdvcmtTdGF0ZShjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IHN0YXRlOiBzdHJpbmcgPSBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbChcImdldE5ldHdvcmtTdGF0ZVwiKTtcbiAgICAgICAgY2FsbGJhY2soc3RhdGUpO1xuICAgIH1cblxuICAgIHJlY29yZExvZyh0YWc6IHN0cmluZywgY29udGVudDogc3RyaW5nKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwicmVjb3JkTG9nXCIsIHsgdGFnOiB0YWcsIGNvbnRlbnQ6IGNvbnRlbnQgfSlcbiAgICB9XG4gICAgdXBkYXRlSGVhbHRoVmFsdWUoaGVhbHRoOiBudW1iZXIpIHtcbiAgICAgICAgQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJ1cGRhdGVIZWFsdGhWYWx1ZVwiLCB7IFwiaGVhbHRoXCI6IGhlYWx0aCB9KVxuICAgIH1cbiAgICBpc1Rlc3RTZXJ2ZXIoKSB7XG4gICAgICAgIGxldCBjYWxsID0gQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJpc1Rlc3RTZXJ2ZXJcIik7XG4gICAgICAgIHJldHVybiBjYWxsID09IFwidHJ1ZVwiO1xuICAgIH1cblxuICAgIGlzRGVidWcoKSB7XG4gICAgICAgIGxldCBjYWxsID0gQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJpc0RlYnVnXCIpO1xuICAgICAgICByZXR1cm4gY2FsbCA9PSBcInRydWVcIjtcbiAgICB9XG5cbiAgICBnZXRBcHBOYW1lKCkge1xuICAgICAgICBsZXQgbmFtZSA9ICBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbChcImdldEFwcE5hbWVcIik7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cblxuICAgIGVuYWJsZU9uUmVzdW1lT25QYXVzZShhcmdzOiB7IGVuYWJsZTogYm9vbGVhbiB9KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5ZCv5Yqo5ZCO5Y+w55uR5ZCsMlwiLCBhcmdzKVxuICAgICAgICBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbCgnZW5hYmxlT25SZXN1bWVPblBhdXNlJywgYXJncywgbnVsbCk7XG4gICAgfVxuICAgIHJldHJ5VG9rZW4oKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwicmV0cnlUb2tlblwiKVxuICAgIH1cblxuICAgIGF1dGhXZWNoYXQoKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwiYXV0aFdlY2hhdFwiKTtcbiAgICB9XG4gICAgcmVxdWVzdEFsaXBheUF1dGgoKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwicmVxdWVzdEFsaXBheUF1dGhcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaJk+W8gOaWsOS6uue6ouWMhVxuICAgICAqL1xuICAgIE9wZW5OZXdCaXJkUmVkKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgICAgQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoJ09wZW5OZXdCaXJkUmVkJywge30sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmtojpmaTml7bmiZPlvIDmuLjmiI/lhoXnuqLljIVcbiAgICAgKiBAcGFyYW0gdHlwZSAoXCIxIOWFqOWxj+W5v+WRijPnp5LlhbPpl60gMiDmv4DlirHop4bpopEg55yL5a6M5Y+v5YWz6ZetIDMg5LiN55yL5bm/5ZGKXCIpXG4gICAgICogQHBhcmFtIGFkaWQg5YWo5bGP5bm/5ZGK5oiW5r+A5Yqx6KeG6aKR55qE5bm/5ZGKaWRcbiAgICAgKi9cbiAgICBPcGVuR2FtZVJlZCh0eXBlOiBudW1iZXIsIGFkaWQ6IG51bWJlciwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgJ3R5cGUnOiB0eXBlLFxuICAgICAgICAgICAgJ2FkaWQnOiBhZGlkLFxuICAgICAgICB9XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCdPcGVuR2FtZVJlZCcsIG9iaiwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJk+W8gOS9memineW8ueeql1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcbiAgICAgKi9cbiAgICBPcGVuQmFsYW5jZURpYWxvZyhjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCdPcGVuQmFsYW5jZURpYWxvZycsIHt9LCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W55So5oi35L2Z6aKdXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxuICAgICAqL1xuICAgIFJlcUJhbGFuY2UoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCdSZXFCYWxhbmNlJywge30sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnlKjmiLfkv6Hmga9cbiAgICAgKi9cbiAgICBSZXFVc2VySW5mbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoJ1JlcVVzZXJJbmZvJywge30sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKiogXG4gICAgICog5bGV56S66YCa55So5by556qXXG4gICAgICovXG4gICAgT3BlbkdlbmVyYWxEaWFsb2coY29pbjogbnVtYmVyLCBtdWx0aXBsZTogbnVtYmVyLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIHZhciBvYmo6IGFueSA9IHtcbiAgICAgICAgICAgICdjb2luJzogY29pbixcbiAgICAgICAgICAgICdtdWx0aXBsZSc6IG11bHRpcGxlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb2luID49IDIwMCkge1xuICAgICAgICAgICAgb2JqLmV4Y2hhbmdlTW9uZXkgPSBjb2luIC8gMTAwMDAuMDtcbiAgICAgICAgfVxuXG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCdPcGVuR2VuZXJhbERpYWxvZycsIG9iaiwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmch+WKqFxuICAgICAqIEBwYXJhbSB0aW1lIOaXtumVv1xuICAgICAqL1xuICAgIHNldFZpYnJhdG9yKHRpbWU6IG51bWJlciwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgJ3RpbWUnOiB0aW1lLFxuICAgICAgICB9XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCdzZXRWaWJyYXRvcicsIG9iaiwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaPkOS6pOWfi+eCuVxuICAgICAqIEBwYXJhbSBvYmog56We562W5Y+C5pWwXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg1xuICAgICAqL1xuICAgIHRyYWNrKG9iajogYW55LCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCd0cmFjaycsIG9iaiwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmj5DkuqTpooTnva7lsZ7mgKdcbiAgICAgKiBAcGFyYW0gb2JqIOelnuetluWPguaVsFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICB0cmFja1VzZXJQcm9wZXJ0aWVzKG9iajogYW55LCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCd0cmFja1VzZXJQcm9wZXJ0aWVzJywgb2JqLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5raI6Zmk5ZCv5Yqo6buR5bGPXG4gICAgICovXG4gICAgZmluaXNoQ29jb3NMYXVuY2goKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCdmaW5pc2hDb2Nvc0xhdW5jaCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOW9k+WJjeaXoOWwveetiee6p1xuICAgICAqIEBwYXJhbSBjdXJyZW50X2xldmVsIOetiee6p1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICB1cGRhdGVDdXJyZW50TGV2ZWwoY3VycmVudF9sZXZlbDogbnVtYmVyLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAnY3VycmVudF9sZXZlbCc6IGN1cnJlbnRfbGV2ZWxcbiAgICAgICAgfVxuICAgICAgICBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbCgndXBkYXRlQ3VycmVudExldmVsJywgb2JqLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw5b2T5YmN6Zev5YWz562J57qnXG4gICAgICogQHBhcmFtIGN1cnJlbnRfcGFzc19sZXZlbCDov4flhbPnrYnnuqdcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgICovXG4gICAgdXBkYXRlQ3VycmVudFBhc3NMZXZlbChjdXJyZW50X3Bhc3NfbGV2ZWw6IG51bWJlciwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgJ2N1cnJlbnRfcGFzc19sZXZlbCc6IGN1cnJlbnRfcGFzc19sZXZlbFxuICAgICAgICB9XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCd1cGRhdGVDdXJyZW50UGFzc0xldmVsJywgb2JqLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluWImOa1t+mrmOW6plxuICAgICAqL1xuICAgIGdldExpdUhhaUhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwiZ2V0TGl1SGFpSGVpZ2h0XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgIDlh7rmuLjmiI9cbiAgICAgKi9cbiAgICBleGl0R2FtZSgpIHtcbiAgICAgICAgQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJleGl0R2FtZVwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICog5ZCv55So5ZCO6YCA6ZSu55uR5o6nXG4gICAgICovXG4gICAgZW5hYmxlT25CYWNrcHJlc3NlZChlbmFibGU6IGJvb2xlYW4pIHtcbiAgICAgICAgQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoJ2VuYWJsZU9uQmFja3ByZXNzZWQnLCB7ICdlbmFibGUnOiBlbmFibGUgfSwgbnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPlue9kee7nOeKtuaAgVxuICAgICAqL1xuICAgIGlzTmV0d29ya0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKCdpc05ldHdvcmtDb25uZWN0ZWQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog57qi5YyF5L+h5oGvXG4gICAgICovXG4gICAgbm90aWZ5Q29uZmlnKG9iaikge1xuICAgICAgICBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbCgnbm90aWZ5Q29uZmlnJywgb2JqLCBudWxsKTtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlj43ppojnlYzpnaJcbiAgICAgKi9cbiAgICBzaG93Q3VzdG9tZXJTZXJ2aWNlKCkge1xuICAgICAgICBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbChcInNob3dDdXN0b21lclNlcnZpY2VcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5rOo6ZSA55WM6Z2iXG4gICAgICovXG4gICAgY2FuY2VsQWNjb3VudCgpIHtcbiAgICAgICAgQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJjYW5jZWxBY2NvdW50XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICog5LiL6L29YXBr55qE5pa55rOVXG4gICAgKi9cbiAgICBkb3dubG9hZE5ld1ZlcnNpb25BcGsoKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwiZG93bmxvYWROZXdWZXJzaW9uQXBrXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnlKjmiLfmmK/lkKbkvb/nlKjkuobmm7TmlrDmnInlpZbljrvmm7TmlrBhcGtcbiAgICAgKi9cbiAgICBoYXNOZXdWZXJzaW9uUmV3YXJkKCkge1xuICAgICAgICByZXR1cm4gQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJoYXNOZXdWZXJzaW9uUmV3YXJkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICog6YeN572u5pu05paw5pyJ5aWW5omT54K577yM5LiL5qyh5LiN5YaN6LCD55SoXG4gICAgKi9cbiAgICByZXNldE5ld1ZlcnNpb25SZXdhcmQoKSB7XG4gICAgICAgIEFuZHJvaWRDb2Nvc0JyaWRnZS5jYWxsKFwicmVzZXROZXdWZXJzaW9uUmV3YXJkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlumdnuW8uuWItuabtOaWsOeJiOacrFxuICAgICAqL1xuICAgIGdldE5ld1ZlcnNpb25OYW1lKCkge1xuICAgICAgICByZXR1cm4gQW5kcm9pZENvY29zQnJpZGdlLmNhbGwoXCJnZXROZXdWZXJzaW9uTmFtZVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3pgJrnn6XmoI/mnYPpmZDmmK/lkKblvIDlkK9cbiAgICAgKi9cbiAgICBpc05vdGlmaWNhdGlvbkVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbChcImlzTm90aWZpY2F0aW9uRW5hYmxlZFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOi3s+i9rOWIsOmAmuefpeiuvue9rueVjOmdolxuICAgICovXG4gICAgc3RhcnROb3RpZmljYXRpb25TZXR0aW5nKCkge1xuICAgICAgICBBbmRyb2lkQ29jb3NCcmlkZ2UuY2FsbChcInN0YXJ0Tm90aWZpY2F0aW9uU2V0dGluZ1wiKTtcbiAgICB9XG5cbn0iXX0=