"use strict";
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