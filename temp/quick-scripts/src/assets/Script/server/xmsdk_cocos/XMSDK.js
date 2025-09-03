"use strict";
cc._RF.push(module, 'd94b5Apu9VOWL/ndSdwy7K+', 'XMSDK');
// Script/server/xmsdk_cocos/XMSDK.ts

"use strict";
/**
 * @description 广告sdk
 */
Object.defineProperty(exports, "__esModule", { value: true });
// 初始化
var AppInfo_1 = require("./Config/AppInfo");
var PlatformFactory_1 = require("./Adapter/PlatformFactory");
var AdUtil_1 = require("./AD/AdUtil");
var AdviewUtil_1 = require("./AD/AdviewUtil");
var XMLoad_1 = require("./Utils/XMLoad");
var Ajax_1 = require("../ServerMgr/Ajax");
var AssistCtr_1 = require("../../Assist/AssistCtr");
var XMSDK = /** @class */ (function () {
    function XMSDK() {
    }
    // 初始化SDK
    XMSDK.initialize = function () {
        console.log('=======  开始初始化商业化SDK  =======');
        // 获取adHead  如果 调用交互接口获取AdHead报错，直接调用连接上的adhead
        AppInfo_1.setUpTesting(PlatformFactory_1.default.Ins.isTestServer()); //获取测试or正式
        AppInfo_1.AppInfo.phead = JSON.parse(PlatformFactory_1.default.Ins.getPheadString());
        // AppInfo.phead = mock1.PHEAD;
        console.log("处理数据-----------------------");
        AppInfo_1.AppInfo.version = "v1.2.9";
        console.log('获取取phead');
        // 广告初始化 游戏中只需要初始化一次
        AdviewUtil_1.AdviewUtil.init(); //初始化信息流
        AdUtil_1.AdUtil.init(); //初始化激励视频/插屏广告
        console.log('=======  结束初始化商业化SDK  =======');
    };
    /**
     * 与SDK交互通信
     * @param funName 方法名
     * @param params 参数
     * @param callback 回调
     */
    XMSDK.call = function (funcName, params, callback) {
        return PlatformFactory_1.default.Ins.call(funcName, params, callback);
    };
    /**
     * 获取AdHead
     */
    XMSDK.getAdHead = function () {
        return PlatformFactory_1.default.Ins.getAdheadString();
    };
    /**
     * 获取当前服务器Host
     */
    XMSDK.getSeverHost = function () {
        return AppInfo_1.AppInfo.appHost;
    };
    /**
     * 是否为debug模式
     */
    XMSDK.isDebug = function () {
        return PlatformFactory_1.default.Ins.isDebug();
    };
    /**
     * 是否为测试服
     */
    XMSDK.isTestServer = function () {
        return PlatformFactory_1.default.Ins.isTestServer();
    };
    /**
         * 获取app名字
         */
    XMSDK.getAppName = function () {
        return PlatformFactory_1.default.Ins.getAppName && PlatformFactory_1.default.Ins.getAppName();
    };
    /**
     * 设置震动
     * @param time 时长，单位毫秒
     * @param callback 回调
     */
    XMSDK.setVibrator = function (time, callback) {
        PlatformFactory_1.default.Ins.setVibrator(time, callback);
    };
    /**
     * 通用跳转 跳转网页等
     * @param param 参数
     */
    XMSDK.launchSceneSdkPage = function (param) {
        PlatformFactory_1.default.Ins.launchSceneSdkPage(param);
    };
    /**
     * 显示一个toast
     * @param text 文本
     * @param duration 延迟关闭，默认1.5s
     * @param pos toast位置，0顶部，1中间，2底部，默认底部
     */
    XMSDK.toast = function (text, duration, pos, state) {
        AssistCtr_1.AssistCtr.showToastTip(text);
        // XMToast.showText(text);
        //XMToast.ShowText(text, duration, pos);
    };
    /**
     * @msg: 显示loading
     * @param text load文案，可不传
     */
    XMSDK.showLoading = function (text) {
        XMLoad_1.XMLoad.ShowLoading(text);
    };
    /**
     * @msg: 隐藏loading
     */
    XMSDK.hideLoading = function () {
        XMLoad_1.XMLoad.HideLoading();
    };
    /**
     * 提交埋点
     * @param obj 神策参数
     * @param callback 回调
     */
    XMSDK.track = function (obj, callback) {
        PlatformFactory_1.default.Ins.track(obj, callback);
    };
    /**
    * 提交神策预置属性
    * @param obj 神策参数
    * @param callback 回调
    */
    XMSDK.trackUserProperties = function (obj, callback) {
        PlatformFactory_1.default.Ins.trackUserProperties(obj, callback);
    };
    /**
     * 消除启动黑屏
     */
    XMSDK.finishCocosLaunch = function () {
        PlatformFactory_1.default.Ins.finishCocosLaunch();
    };
    /**
     * 获取刘海高度
     */
    XMSDK.getLiuHaiHeight = function () {
        return PlatformFactory_1.default.Ins.getLiuHaiHeight();
    };
    /**
     * 获取导航栏高度
     */
    XMSDK.getNavigationBarHeight = function () {
        return PlatformFactory_1.default.Ins.getNavigationBarHeight();
    };
    /**
     * 获取网页host
     */
    XMSDK.getHost = function () {
        return AppInfo_1.AppInfo.host;
    };
    /**
     * 退出APP
     */
    XMSDK.exitGame = function () {
        PlatformFactory_1.default.Ins.exitGame();
    };
    /**
     * 启动/关闭 前后台监听
     */
    XMSDK.enableOnResumeOnPause = function (enable) {
        console.log("启动后台监听1", enable);
        PlatformFactory_1.default.Ins.enableOnResumeOnPause({ enable: enable });
    };
    /**
     * 获取网络状态
     * @returns {boolean} false无网络
     */
    XMSDK.isNetworkConnected = function () {
        return PlatformFactory_1.default.Ins.isNetworkConnected();
    };
    /**
     * 通知刷新客户端token
     */
    XMSDK.retryToken = function () {
        PlatformFactory_1.default.Ins.retryToken();
    };
    /**
    * 微信授权
    */
    XMSDK.authWechat = function () {
        PlatformFactory_1.default.Ins.authWechat();
    };
    /**
    * 支付宝授权
    */
    XMSDK.requestAlipayAuth = function () {
        PlatformFactory_1.default.Ins.requestAlipayAuth();
    };
    /**
   * 反馈界面
   */
    XMSDK.showCustomerService = function () {
        PlatformFactory_1.default.Ins.showCustomerService();
    };
    XMSDK.showPrivacyPolicy = function () {
        PlatformFactory_1.default.Ins.showPrivacyPolicy();
    };
    XMSDK.showUserProtocol = function () {
        PlatformFactory_1.default.Ins.showUserProtocol();
    };
    XMSDK.cancelAccount = function () {
        PlatformFactory_1.default.Ins.cancelAccount();
    };
    /**
     * 打开链接
     */
    XMSDK.openWebUrl = function (obj) {
        PlatformFactory_1.default.Ins.openWebUrl(obj);
    };
    /**
     * 获取原生的尺寸
     */
    XMSDK.getScreenWidth = function () {
        return PlatformFactory_1.default.Ins.getScreenWidth();
    };
    XMSDK.getScreenHeight = function () {
        return PlatformFactory_1.default.Ins.getScreenHeight();
    };
    /**
    * 获取非强制更新版本
    */
    XMSDK.getNewVersionName = function () {
        return PlatformFactory_1.default.Ins.getNewVersionName();
    };
    /**
     * 添加游戏恢复监听
     * @param callback 回调
     */
    XMSDK.onListenGameResume = function (callback) {
        window["SystemInterface"].onListenGameResume = callback;
    };
    /**
     * 添加游戏停止监听
     * @param callback 回调
     */
    XMSDK.onListenGameStop = function (callback) {
        window["SystemInterface"].OnGameStop = callback;
    };
    XMSDK.post = function (config) {
        var configData = {
            url: config.url,
            data: config.data,
            method: "POST",
            header: config.header,
            onSuccess: function (res) {
                XMSDK.openNetWorkCount = 0;
                console.log("成功回调--------------------post");
                config.onSuccess && config.onSuccess(res);
            },
            onFail: function (res) {
                XMSDK.openNetWorkCount++;
                config.onFail && config.onFail(res);
            },
            onComplete: function (res) {
                config.onComplete && config.onComplete(res);
            },
        };
        Ajax_1.default.send(configData);
    };
    XMSDK.getdataStr = function (config) {
        var configData = {
            url: config.url,
            data: config.data,
            method: "POST",
            header: config.header,
            onSuccess: function (res) {
                XMSDK.openNetWorkCount = 0;
                config.onSuccess && config.onSuccess(res);
            },
            onFail: function (res) {
                XMSDK.openNetWorkCount++;
                config.onFail && config.onFail(res);
            },
            onComplete: function (res) {
                config.onComplete && config.onComplete(res);
            },
        };
        Ajax_1.default.getdata(configData);
    };
    XMSDK.get = function (config) {
        //UIFunc.openUI(ActivityPannelName.PannelAdLoading)
        var configData = {
            url: config.url,
            data: config.data,
            method: "GET",
            header: config.header,
            onSuccess: function (res) {
                XMSDK.openNetWorkCount = 0;
                console.log("成功回调--------------------get");
                config.onSuccess && config.onSuccess(res);
            },
            onFail: function (res) {
                XMSDK.openNetWorkCount++;
                config.onFail && config.onFail(res);
            },
            onComplete: function (res) {
                config.onComplete && config.onComplete(res);
            },
        };
        Ajax_1.default.send(configData);
    };
    XMSDK.openNetWorkCount = 0;
    return XMSDK;
}());
exports.default = XMSDK;

cc._RF.pop();