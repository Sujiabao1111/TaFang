"use strict";
cc._RF.push(module, '2c31dAfRPdIGoAhVIp57+8m', 'PreviewPlatform');
// Script/server/xmsdk_cocos/Adapter/PreviewPlatform.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rsa_1 = require("./rsa");
var AdStatus_1 = require("./Type/AdStatus");
var AppInfo_1 = require("../Config/AppInfo");
var mock1_1 = require("../mock1");
var PxTransUtils_1 = require("../Utils/PxTransUtils");
/**
 * 写死的一个假的adHeader
 */
var ADHEADER = { "prdId": "18800", "deviceId": "1234567890", "version": "1.9.1", "sysVersion": "9", "phoneType": "OnePlus", "activityChannel": "1", "currentChannel": "1", "startFrom": "index", "appVersion": "v1.0.0", "appVersionCode": "23", "versionCode": "91", "platform": "android", "service": "xkX2Ab1P3KuI214V", "signature": "52dde4320c06f616da2ad9558e506ad2", "timestamp": 1584628717084 };
var PHEAD = null;
if (AppInfo_1.AppInfo.isLocal) {
    PHEAD = mock1_1.default.PHEAD;
}
/**
 * cocos直接点击那个预览按钮，在浏览器打开
 */
var PreviewPlatform = /** @class */ (function () {
    function PreviewPlatform() {
    }
    PreviewPlatform.prototype.getNavigationBarHeight = function () {
        return "";
    };
    PreviewPlatform.prototype.getScreenWidth = function () {
        return "";
    };
    PreviewPlatform.prototype.getScreenHeight = function () {
        return "";
    };
    PreviewPlatform.prototype.showPrivacyPolicy = function () {
    };
    PreviewPlatform.prototype.showUserProtocol = function () {
    };
    PreviewPlatform.prototype.openWebUrl = function () {
    };
    PreviewPlatform.prototype.authWechat = function () {
    };
    PreviewPlatform.prototype.requestAlipayAuth = function () {
    };
    /**
     * 与SDK交互通信
     * @param funcName 方法名
     * @param params 参数
     * @param callback 回调
     */
    PreviewPlatform.prototype.call = function (funcName, params, callback) {
        console.log('模拟调用' + funcName);
    };
    PreviewPlatform.prototype.getAdheadString = function () {
        return JSON.stringify(ADHEADER);
    };
    PreviewPlatform.prototype.getPheadString = function () {
        return JSON.stringify(PHEAD);
    };
    PreviewPlatform.prototype.toNewIdiomAnswer = function () { };
    PreviewPlatform.prototype.openCalendarPermit = function () {
        console.error("调用客户端方法，打开日历权限弹窗");
    };
    PreviewPlatform.prototype.checkCalendarPermit = function () {
        console.error("调用客户端方法，获取日历权限状态");
    };
    PreviewPlatform.prototype.setCalendarPrompt = function (fuc) {
        console.error("调用客户端方法，开启或关闭日历" + fuc);
    };
    PreviewPlatform.prototype.toScratchCard = function () { };
    PreviewPlatform.prototype.enableOnResumeOnPause = function (args) {
    };
    PreviewPlatform.prototype.enableUploadAdSdkStatistic = function (args) {
    };
    PreviewPlatform.prototype.hideAdView = function (adConfig) {
    };
    PreviewPlatform.prototype.launchSceneSdkPage = function (launchParams) {
        cc.log('模拟了通用跳转');
    };
    PreviewPlatform.prototype.loadAdSdk = function (adConfig) {
        adConfig.status = AdStatus_1.VideoAdStatus.LOAD_SUCCESS;
        window["sdkAdListener"] && window["sdkAdListener"](adConfig);
    };
    PreviewPlatform.prototype.loadAdView = function (adConfig, callback) {
    };
    PreviewPlatform.prototype.showAd = function (adConfig) {
        adConfig.status = AdStatus_1.VideoAdStatus.ON_SHOW;
        window["sdkAdListener"] && window["sdkAdListener"](adConfig);
        setTimeout(function () {
            adConfig.status = AdStatus_1.VideoAdStatus.ON_CLOSE;
            window["sdkAdListener"] && window["sdkAdListener"](adConfig);
            adConfig.status = AdStatus_1.VideoAdStatus.ON_REWARD_FINISH;
            window["sdkAdListener"] && window["sdkAdListener"](adConfig);
        }, 1000);
    };
    PreviewPlatform.prototype.showAdView = function (adConfig) {
    };
    PreviewPlatform.prototype.signRequestBody = function (args, callback) {
        //之前ssl生成的公钥，复制的时候要小心不要有空格
        var pubKey = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxx8PSMcw9ENErZG8quNJ3NaUgBzCuMZZFDTSCdQ9Z/C6ts0v4SGqAgzyF1BFdvEhiIikUMdkcVlhWO+Hvm6Kp+CC91R1S8oQ8GKX5EhbbN2z+NQE+gUc4r0OwAgm0cPLS65kH15rVUszZTnsBn48j+JrbkPCJHozdQuASQwLBhKAOch/gFdA0agMESo75a4tnvqn8u4INfeT2HQhVF5EEkqUGi1TOBHTpuqRZrNojkv0mUMrghuOJ9IniAb2LR8TpL7lHNHex8s0Mms4EZEHYnpuINqvZIqXfCOWeP+u5SuUIxPGXpCAA+OSrCju6Pi8Ng43xvxzH5uS5TeihkuVjQIDAQAB-----END PUBLIC KEY-----';
        var pub = rsa_1.RSA.KEYUTIL.getKey(pubKey);
        var enc = rsa_1.RSA.KJUR.crypto.Cipher.encryptLong2(args, pub);
        callback(enc);
    };
    PreviewPlatform.prototype.getNetworkState = function (callback) {
        callback("WIFI");
    };
    PreviewPlatform.prototype.isDebug = function () {
        return true;
    };
    //todo 要改
    PreviewPlatform.prototype.isTestServer = function () {
        return true;
    };
    PreviewPlatform.prototype.updateHealthValue = function () {
    };
    PreviewPlatform.prototype.retryToken = function () {
    };
    PreviewPlatform.prototype.recordLog = function (tag, content) {
    };
    /**
     * 打开新人红包
     */
    PreviewPlatform.prototype.OpenNewBirdRed = function (callback) {
        cc.log('模拟打开新人红包');
        if (callback) {
            callback();
        }
    };
    /**
     * 消除时打开游戏内红包
     * @param type ("1 全屏广告3秒关闭 2 激励视频 看完可关闭 3 不看广告")
     * @param adid 全屏广告或激励视频的广告id
     */
    PreviewPlatform.prototype.OpenGameRed = function (type, adid, callback) {
        cc.log('模拟打开游戏内红包');
        if (callback) {
            callback();
        }
    };
    /**
     * 打开余额弹窗
     * @param callback
     */
    PreviewPlatform.prototype.OpenBalanceDialog = function (callback) {
        cc.log('模拟打开余额弹窗');
        if (callback) {
            callback();
        }
    };
    /**
     * 获取用户余额
     * @param callback
     */
    PreviewPlatform.prototype.ReqBalance = function (callback) {
        var obj = { "coin": 0, "coinRemain": 0, "earnAgain": "100", "remain": "0", "type": 1, "withdrawLimited": "100" };
        callback(obj);
    };
    /**
     * 获取用户信息
     */
    PreviewPlatform.prototype.ReqUserInfo = function (callback) {
        var obj = { "awarDtime": 0, "awardCoin": 0, "balance": 0.01, "coinRate": 10000, "doubleBusinessType": 0, "isNewUser": 0, "newUserCoin": 0, "userCoin": { "coin": 12546, "todayCoin": 37, "totalAdd": 12546 } };
        callback(obj);
    };
    /**
     * 展示通用弹窗
     */
    PreviewPlatform.prototype.OpenGeneralDialog = function (coin, multiple, callback) {
        //cc.log('模拟展示通用弹窗');
        if (callback) {
            callback();
        }
    };
    /**
     * 震动
     * @param time 时长
     */
    PreviewPlatform.prototype.setVibrator = function (time, callback) {
        //cc.log('模拟已震动');
        if (callback) {
            callback();
        }
    };
    /**
    * 提交埋点
    * @param obj 神策参数
    * @param callback 回调
    */
    PreviewPlatform.prototype.track = function (obj, callback) {
        //console.log('模拟统计上报');
        //console.log(obj);
        if (callback) {
            callback();
        }
    };
    /**
     * 提交预置属性
     * @param obj 神策参数
     * @param callback 回调
     */
    PreviewPlatform.prototype.trackUserProperties = function (obj, callback) {
        //cc.log('模拟统计上报');
        //cc.log(obj);
        if (callback) {
            callback();
        }
    };
    /**
    * 消除启动黑屏
    */
    PreviewPlatform.prototype.finishCocosLaunch = function () {
        cc.log('模拟消除启动黑屏');
    };
    /**
     * 更新当前无尽等级
     * @param current_level 等级
     * @param callback 回调
     */
    PreviewPlatform.prototype.updateCurrentLevel = function (current_level, callback) {
        cc.log('模拟更新当前无尽等级');
        var obj = {
            'current_level': current_level
        };
        cc.log(obj);
        if (callback) {
            callback();
        }
    };
    /**
     * 更新当前闯关等级
     * @param current_pass_level 过关等级
     * @param callback 回调
     */
    PreviewPlatform.prototype.updateCurrentPassLevel = function (current_pass_level, callback) {
        cc.log('模拟更新当前闯关等级');
        var obj = {
            'current_pass_level': current_pass_level
        };
        cc.log(obj);
        if (callback) {
            callback();
        }
    };
    /**
     * 获取刘海高度
     */
    PreviewPlatform.prototype.getLiuHaiHeight = function () {
        cc.log('获取刘海高度');
        var result = 0;
        if (PxTransUtils_1.default.getScreenHeight() / PxTransUtils_1.default.getScreenWidth() > 1.78) {
            result = 50;
        }
        return String(result);
    };
    /**
     * 获取刘海高度
     */
    PreviewPlatform.prototype.exitGame = function () {
        console.log('模拟退出游戏');
    };
    /**
     * 设置是否监听虚拟键点击事件
     */
    PreviewPlatform.prototype.enableOnBackpressed = function (enable) {
        cc.log('模拟设置监听虚拟键-' + enable);
    };
    /**
     * 获取网络状态
     * @returns {boolean} false无网络
     */
    PreviewPlatform.prototype.isNetworkConnected = function () {
        return navigator.onLine;
    };
    PreviewPlatform.prototype.notifyConfig = function () { };
    PreviewPlatform.prototype.showCustomerService = function () {
    };
    PreviewPlatform.prototype.cancelAccount = function () {
    };
    PreviewPlatform.prototype.downloadNewVersionApk = function () {
    };
    PreviewPlatform.prototype.hasNewVersionReward = function () {
    };
    PreviewPlatform.prototype.resetNewVersionReward = function () {
    };
    PreviewPlatform.prototype.getNewVersionName = function () {
    };
    PreviewPlatform.prototype.isNotificationEnabled = function () {
    };
    PreviewPlatform.prototype.startNotificationSetting = function () {
    };
    return PreviewPlatform;
}());
exports.default = PreviewPlatform;

cc._RF.pop();