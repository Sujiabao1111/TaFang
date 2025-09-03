"use strict";
cc._RF.push(module, '096c5ShPypKf4wxcnutjrVd', 'InnerWebPlatform');
// Script/server/xmsdk_cocos/Adapter/InnerWebPlatform.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsBridge = require("./Bridge/JsBridge");
var AppInfo_1 = require("../Config/AppInfo");
var mock1_1 = require("../mock1");
/**
 * 应用内的浏览器
 */
var InnerWebPlatform = /** @class */ (function () {
    function InnerWebPlatform() {
    }
    /**
     * 与SDK交互通信
     * @param funcName 方法名
     * @param params 参数
     * @param callback 回调
     */
    InnerWebPlatform.prototype.call = function (funcName, params, callback) {
        return JsBridge.call('call', { 'methodName': funcName, 'args': params }, callback);
    };
    // 调用方法
    InnerWebPlatform.jsCall = function (methodName, args, cb) {
        return JsBridge.call('call', { 'methodName': methodName, 'args': args }, cb);
    };
    InnerWebPlatform.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    };
    InnerWebPlatform.prototype.getAdheadString = function () {
        var adHead = InnerWebPlatform.jsCall('createRequestHeaderStr', {});
        if (!adHead || adHead == "") {
            var adHead_1 = InnerWebPlatform.getQueryString("adhead");
            if (adHead_1) {
                console.warn("链接上带adhead参数");
            }
            else {
                console.warn("交互方法拿不到adhead --- 链接上没有带adhead参数");
            }
        }
        return adHead;
    };
    InnerWebPlatform.prototype.getPheadString = function () {
        if (AppInfo_1.AppInfo.isLocal) {
            return mock1_1.default.PHEAD;
        }
        return InnerWebPlatform.jsCall("getPheadString", {});
    };
    InnerWebPlatform.prototype.enableOnResumeOnPause = function (args) {
        InnerWebPlatform.jsCall('enableOnResumeOnPause', args);
    };
    InnerWebPlatform.prototype.hideAdView = function (adConfig) {
        InnerWebPlatform.jsCall('hideAdView', adConfig);
    };
    InnerWebPlatform.prototype.loadAdView = function (adConfig, callback) {
        InnerWebPlatform.jsCall('loadAdView', adConfig);
    };
    InnerWebPlatform.prototype.showAdView = function (adConfig) {
        InnerWebPlatform.jsCall('showAdView', adConfig);
    };
    InnerWebPlatform.prototype.loadAdSdk = function (adConfig) {
        InnerWebPlatform.jsCall('loadAdSdk', adConfig, function () { });
    };
    InnerWebPlatform.prototype.showAd = function (adConfig) {
        InnerWebPlatform.jsCall('showAd', adConfig);
    };
    InnerWebPlatform.prototype.enableUploadAdSdkStatistic = function (args) {
        InnerWebPlatform.jsCall('enableUploadAdSdkStatistic', args);
    };
    InnerWebPlatform.prototype.launchSceneSdkPage = function (args) {
        InnerWebPlatform.jsCall('launchSceneSdkPage', args);
    };
    InnerWebPlatform.prototype.signRequestBody = function (args, callback) {
        // cc.log("args : " + args)
        InnerWebPlatform.jsCall("signRequestBody", { data: args }, function (result) {
            callback(JSON.parse(result).data);
        });
    };
    InnerWebPlatform.prototype.getNetworkState = function (callback) {
        InnerWebPlatform.jsCall("getNetworkState", {}, function (state) {
            callback(state);
        });
    };
    //todo 要改
    InnerWebPlatform.prototype.isDebug = function () {
        return true;
    };
    //todo 要改
    InnerWebPlatform.prototype.isTestServer = function () {
        return false;
    };
    InnerWebPlatform.prototype.recordLog = function (tag, content) {
    };
    /**
     * 打开新人红包
     */
    InnerWebPlatform.prototype.OpenNewBirdRed = function (callback) {
        InnerWebPlatform.jsCall('OpenNewBirdRed');
    };
    /**
     * 消除时打开游戏内红包
     * @param type ("1 全屏广告3秒关闭 2 激励视频 看完可关闭 3 不看广告")
     * @param adid 全屏广告或激励视频的广告id
     */
    InnerWebPlatform.prototype.OpenGameRed = function (type, adid, callback) {
        var obj = {
            'type': type,
            'adid': adid,
        };
        InnerWebPlatform.jsCall('OpenGameRed', obj);
    };
    /**
     * 打开余额弹窗
     * @param callback
     */
    InnerWebPlatform.prototype.OpenBalanceDialog = function (callback) {
        InnerWebPlatform.jsCall('OpenBalanceDialog', {}, callback);
    };
    /**
     * 获取用户余额
     * @param callback
     */
    InnerWebPlatform.prototype.ReqBalance = function (callback) {
        InnerWebPlatform.jsCall('ReqBalance', {}, callback);
    };
    /**
     * 获取用户信息
     */
    InnerWebPlatform.prototype.ReqUserInfo = function (callback) {
        InnerWebPlatform.jsCall('ReqUserInfo', {}, callback);
    };
    /**
     * 展示通用弹窗
     */
    InnerWebPlatform.prototype.OpenGeneralDialog = function (coin, multiple, callback) {
        var obj = {
            'coin': coin,
            'multiple': multiple,
        };
        if (coin >= 200) {
            obj.exchangeMoney = coin / 10000.0;
        }
        InnerWebPlatform.jsCall('ReqUserInfo', obj, callback);
    };
    /**
     * 震动
     * @param time 时长
     */
    InnerWebPlatform.prototype.setVibrator = function (time, callback) {
        var obj = {
            'time': time,
        };
        InnerWebPlatform.jsCall('setVibrator', obj, callback);
    };
    /**
     * 提交埋点
     * @param obj 神策参数
     * @param callback 回调
     */
    InnerWebPlatform.prototype.track = function (obj, callback) {
        InnerWebPlatform.jsCall('track', obj, callback);
    };
    /**
     * 提交预置属性
     * @param obj 神策参数
     * @param callback 回调
     */
    InnerWebPlatform.prototype.trackUserProperties = function (obj, callback) {
        InnerWebPlatform.jsCall('trackUserProperties', obj, callback);
    };
    /**
     * 消除启动黑屏
     */
    InnerWebPlatform.prototype.finishCocosLaunch = function () {
        InnerWebPlatform.jsCall('finishCocosLaunch');
    };
    /**
     * 更新当前无尽等级
     * @param current_level 等级
     * @param callback 回调
     */
    InnerWebPlatform.prototype.updateCurrentLevel = function (current_level, callback) {
        var obj = {
            'current_level': current_level
        };
        InnerWebPlatform.jsCall('updateCurrentLevel', obj, callback);
    };
    /**
     * 更新当前闯关等级
     * @param current_pass_level 过关等级
     * @param callback 回调
     */
    InnerWebPlatform.prototype.updateCurrentPassLevel = function (current_pass_level, callback) {
        var obj = {
            'current_pass_level': current_pass_level
        };
        InnerWebPlatform.jsCall('updateCurrentPassLevel', obj, callback);
    };
    /*
     * 获取刘海高度
     */
    InnerWebPlatform.prototype.getLiuHaiHeight = function () {
        return InnerWebPlatform.jsCall("getLiuHaiHeight", {});
    };
    /**
     * 退出游戏
     */
    InnerWebPlatform.prototype.exitGame = function () {
        InnerWebPlatform.jsCall("exitGame", {});
    };
    /**
     * 设置是否监听虚拟键点击事件
     */
    InnerWebPlatform.prototype.enableOnBackpressed = function (enable) {
        var obj = {
            'enable': enable
        };
        InnerWebPlatform.jsCall('enableOnBackpressed', obj, null);
    };
    /**
     * 获取网络状态
     * @returns {boolean} false无网络
     */
    InnerWebPlatform.prototype.isNetworkConnected = function () {
        return InnerWebPlatform.jsCall("isNetworkConnected", {});
    };
    InnerWebPlatform.prototype.notifyConfig = function () { };
    return InnerWebPlatform;
}());
exports.default = InnerWebPlatform;

cc._RF.pop();