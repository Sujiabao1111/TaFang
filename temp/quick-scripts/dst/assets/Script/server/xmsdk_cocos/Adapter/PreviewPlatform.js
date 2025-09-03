
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBZGFwdGVyXFxQcmV2aWV3UGxhdGZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2QkFBMkI7QUFLM0IsNENBQWdEO0FBQ2hELDZDQUE0QztBQUM1QyxrQ0FBNEI7QUFDNUIsc0RBQWlEO0FBRWpEOztHQUVHO0FBQ0gsSUFBTSxRQUFRLEdBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGtDQUFrQyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsQ0FBQztBQUNwWixJQUFJLEtBQUssR0FBUSxJQUFJLENBQUM7QUFDdEIsSUFBSSxpQkFBTyxDQUFDLE9BQU8sRUFBRTtJQUNqQixLQUFLLEdBQUcsZUFBSSxDQUFDLEtBQUssQ0FBQztDQUN0QjtBQUNEOztHQUVHO0FBQ0g7SUFBQTtJQTZUQSxDQUFDO0lBNVRHLGdEQUFzQixHQUF0QjtRQUNJLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUNELHdDQUFjLEdBQWQ7UUFDSSxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFDRCx5Q0FBZSxHQUFmO1FBQ0ksT0FBTyxFQUFFLENBQUE7SUFDYixDQUFDO0lBQ0QsMkNBQWlCLEdBQWpCO0lBRUEsQ0FBQztJQUNELDBDQUFnQixHQUFoQjtJQUVBLENBQUM7SUFDRCxvQ0FBVSxHQUFWO0lB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QW5CLFVBQW9CLE1BQWU7UUFDL0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNEOzs7T0FHRztJQUNILDRDQUFrQixHQUFsQjtRQUNJLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDO0lBQ0Qsc0NBQVksR0FBWixjQUFpQixDQUFDO0lBRWxCLDZDQUFtQixHQUFuQjtJQUVBLENBQUM7SUFFRCx1Q0FBYSxHQUFiO0lBRUEsQ0FBQztJQUVELCtDQUFxQixHQUFyQjtJQUVBLENBQUM7SUFFRCw2Q0FBbUIsR0FBbkI7SUFFQSxDQUFDO0lBRUQsK0NBQXFCLEdBQXJCO0lBRUEsQ0FBQztJQUVELDJDQUFpQixHQUFqQjtJQUVBLENBQUM7SUFFRCwrQ0FBcUIsR0FBckI7SUFFQSxDQUFDO0lBRUQsa0RBQXdCLEdBQXhCO0lBRUEsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0E3VEEsQUE2VEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJUGxhdGZvcm0gZnJvbSBcIi4vQmFzZS9JUGxhdGZvcm1cIjtcbmltcG9ydCB7IFJTQSB9IGZyb20gJy4vcnNhJ1xuaW1wb3J0IENvbW1vblNldHRpbmdUeXBlIGZyb20gXCIuL1R5cGUvQ29tbW9uU2V0dGluZ1R5cGVcIjtcbmltcG9ydCBBZENvbmZpZ1R5cGUgZnJvbSBcIi4vVHlwZS9BZENvbmZpZ1R5cGVcIjtcbmltcG9ydCBMYXVuY2hTZGtQYWdlVHlwZSBmcm9tIFwiLi9UeXBlL0xhdW5jaFNka1BhZ2VUeXBlXCI7XG5pbXBvcnQgeyBMb2FkQWRWaWV3Q29uZmlnVHlwZSwgU2hvd0FkVmlld0NvbmZpZ1R5cGUgfSBmcm9tIFwiLi9UeXBlL0FkVmlld0NvbmZpZ1wiO1xuaW1wb3J0IHsgVmlkZW9BZFN0YXR1cyB9IGZyb20gXCIuL1R5cGUvQWRTdGF0dXNcIjtcbmltcG9ydCB7IEFwcEluZm8gfSBmcm9tIFwiLi4vQ29uZmlnL0FwcEluZm9cIjtcbmltcG9ydCBtb2NrIGZyb20gXCIuLi9tb2NrMVwiO1xuaW1wb3J0IFB4VHJhbnNVdGlscyBmcm9tIFwiLi4vVXRpbHMvUHhUcmFuc1V0aWxzXCI7XG5cbi8qKlxuICog5YaZ5q2755qE5LiA5Liq5YGH55qEYWRIZWFkZXJcbiAqL1xuY29uc3QgQURIRUFERVI6IG9iamVjdCA9IHsgXCJwcmRJZFwiOiBcIjE4ODAwXCIsIFwiZGV2aWNlSWRcIjogXCIxMjM0NTY3ODkwXCIsIFwidmVyc2lvblwiOiBcIjEuOS4xXCIsIFwic3lzVmVyc2lvblwiOiBcIjlcIiwgXCJwaG9uZVR5cGVcIjogXCJPbmVQbHVzXCIsIFwiYWN0aXZpdHlDaGFubmVsXCI6IFwiMVwiLCBcImN1cnJlbnRDaGFubmVsXCI6IFwiMVwiLCBcInN0YXJ0RnJvbVwiOiBcImluZGV4XCIsIFwiYXBwVmVyc2lvblwiOiBcInYxLjAuMFwiLCBcImFwcFZlcnNpb25Db2RlXCI6IFwiMjNcIiwgXCJ2ZXJzaW9uQ29kZVwiOiBcIjkxXCIsIFwicGxhdGZvcm1cIjogXCJhbmRyb2lkXCIsIFwic2VydmljZVwiOiBcInhrWDJBYjFQM0t1STIxNFZcIiwgXCJzaWduYXR1cmVcIjogXCI1MmRkZTQzMjBjMDZmNjE2ZGEyYWQ5NTU4ZTUwNmFkMlwiLCBcInRpbWVzdGFtcFwiOiAxNTg0NjI4NzE3MDg0IH07XG5sZXQgUEhFQUQ6IGFueSA9IG51bGw7XG5pZiAoQXBwSW5mby5pc0xvY2FsKSB7XG4gICAgUEhFQUQgPSBtb2NrLlBIRUFEO1xufVxuLyoqXG4gKiBjb2Nvc+ebtOaOpeeCueWHu+mCo+S4qumihOiniOaMiemSru+8jOWcqOa1j+iniOWZqOaJk+W8gFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3UGxhdGZvcm0gaW1wbGVtZW50cyBJUGxhdGZvcm0ge1xuICAgIGdldE5hdmlnYXRpb25CYXJIZWlnaHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiXCJcbiAgICB9XG4gICAgZ2V0U2NyZWVuV2lkdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiXCJcbiAgICB9XG4gICAgZ2V0U2NyZWVuSGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIlwiXG4gICAgfVxuICAgIHNob3dQcml2YWN5UG9saWN5KCkge1xuXG4gICAgfVxuICAgIHNob3dVc2VyUHJvdG9jb2woKSB7XG5cbiAgICB9XG4gICAgb3BlbldlYlVybCgpIHtcblxuICAgIH1cbiAgICBhdXRoV2VjaGF0KCkge1xuXG4gICAgfVxuICAgIHJlcXVlc3RBbGlwYXlBdXRoKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiOU0RL5Lqk5LqS6YCa5L+hXG4gICAgICogQHBhcmFtIGZ1bmNOYW1lIOaWueazleWQjVxuICAgICAqIEBwYXJhbSBwYXJhbXMg5Y+C5pWwXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg1xuICAgICAqL1xuICAgIGNhbGwoZnVuY05hbWU6IHN0cmluZywgcGFyYW1zPzogYW55LCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfmqKHmi5/osIPnlKgnICsgZnVuY05hbWUpO1xuICAgIH1cblxuICAgIGdldEFkaGVhZFN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoQURIRUFERVIpO1xuICAgIH1cblxuICAgIGdldFBoZWFkU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShQSEVBRCk7XG4gICAgfVxuICAgIHRvTmV3SWRpb21BbnN3ZXIoKSB7IH1cbiAgICBvcGVuQ2FsZW5kYXJQZXJtaXQoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLosIPnlKjlrqLmiLfnq6/mlrnms5XvvIzmiZPlvIDml6XljobmnYPpmZDlvLnnqpdcIilcbiAgICB9XG4gICAgY2hlY2tDYWxlbmRhclBlcm1pdCgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuiwg+eUqOWuouaIt+err+aWueazle+8jOiOt+WPluaXpeWOhuadg+mZkOeKtuaAgVwiKVxuICAgIH1cbiAgICBzZXRDYWxlbmRhclByb21wdChmdWMpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuiwg+eUqOWuouaIt+err+aWueazle+8jOW8gOWQr+aIluWFs+mXreaXpeWOhlwiICsgZnVjKVxuICAgIH1cbiAgICB0b1NjcmF0Y2hDYXJkKCkgeyB9XG4gICAgZW5hYmxlT25SZXN1bWVPblBhdXNlKGFyZ3M6IENvbW1vblNldHRpbmdUeXBlKSB7XG4gICAgfVxuXG4gICAgZW5hYmxlVXBsb2FkQWRTZGtTdGF0aXN0aWMoYXJnczogQ29tbW9uU2V0dGluZ1R5cGUpIHtcbiAgICB9XG5cbiAgICBoaWRlQWRWaWV3KGFkQ29uZmlnOiBBZENvbmZpZ1R5cGUpIHtcbiAgICB9XG5cbiAgICBsYXVuY2hTY2VuZVNka1BhZ2UobGF1bmNoUGFyYW1zOiBMYXVuY2hTZGtQYWdlVHlwZSkge1xuICAgICAgICBjYy5sb2coJ+aooeaLn+S6humAmueUqOi3s+i9rCcpO1xuICAgIH1cblxuICAgIGxvYWRBZFNkayhhZENvbmZpZzogQWRDb25maWdUeXBlKSB7XG4gICAgICAgIGFkQ29uZmlnLnN0YXR1cyA9IFZpZGVvQWRTdGF0dXMuTE9BRF9TVUNDRVNTO1xuICAgICAgICB3aW5kb3dbXCJzZGtBZExpc3RlbmVyXCJdICYmIHdpbmRvd1tcInNka0FkTGlzdGVuZXJcIl0oYWRDb25maWcpO1xuICAgIH1cblxuICAgIGxvYWRBZFZpZXcoYWRDb25maWc6IExvYWRBZFZpZXdDb25maWdUeXBlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgfVxuXG4gICAgc2hvd0FkKGFkQ29uZmlnOiBBZENvbmZpZ1R5cGUpIHtcbiAgICAgICAgYWRDb25maWcuc3RhdHVzID0gVmlkZW9BZFN0YXR1cy5PTl9TSE9XO1xuICAgICAgICB3aW5kb3dbXCJzZGtBZExpc3RlbmVyXCJdICYmIHdpbmRvd1tcInNka0FkTGlzdGVuZXJcIl0oYWRDb25maWcpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYWRDb25maWcuc3RhdHVzID0gVmlkZW9BZFN0YXR1cy5PTl9DTE9TRTtcbiAgICAgICAgICAgIHdpbmRvd1tcInNka0FkTGlzdGVuZXJcIl0gJiYgd2luZG93W1wic2RrQWRMaXN0ZW5lclwiXShhZENvbmZpZyk7XG5cbiAgICAgICAgICAgIGFkQ29uZmlnLnN0YXR1cyA9IFZpZGVvQWRTdGF0dXMuT05fUkVXQVJEX0ZJTklTSDtcbiAgICAgICAgICAgIHdpbmRvd1tcInNka0FkTGlzdGVuZXJcIl0gJiYgd2luZG93W1wic2RrQWRMaXN0ZW5lclwiXShhZENvbmZpZyk7XG4gICAgICAgIH0sIDEwMDApXG4gICAgfVxuXG4gICAgc2hvd0FkVmlldyhhZENvbmZpZzogU2hvd0FkVmlld0NvbmZpZ1R5cGUpIHtcbiAgICB9XG5cbiAgICBzaWduUmVxdWVzdEJvZHkoYXJnczogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgLy/kuYvliY1zc2znlJ/miJDnmoTlhazpkqXvvIzlpI3liLbnmoTml7blgJnopoHlsI/lv4PkuI3opoHmnInnqbrmoLxcbiAgICAgICAgdmFyIHB1YktleSA9ICctLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLU1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeHg4UFNNY3c5RU5FclpHOHF1TkozTmFVZ0J6Q3VNWlpGRFRTQ2RROVovQzZ0czB2NFNHcUFnenlGMUJGZHZFaGlJaWtVTWRrY1ZsaFdPK0h2bTZLcCtDQzkxUjFTOG9ROEdLWDVFaGJiTjJ6K05RRStnVWM0cjBPd0FnbTBjUExTNjVrSDE1clZVc3paVG5zQm40OGorSnJia1BDSkhvemRRdUFTUXdMQmhLQU9jaC9nRmRBMGFnTUVTbzc1YTR0bnZxbjh1NElOZmVUMkhRaFZGNUVFa3FVR2kxVE9CSFRwdXFSWnJOb2prdjBtVU1yZ2h1T0o5SW5pQWIyTFI4VHBMN2xITkhleDhzME1tczRFWkVIWW5wdUlOcXZaSXFYZkNPV2VQK3U1U3VVSXhQR1hwQ0FBK09TckNqdTZQaThOZzQzeHZ4ekg1dVM1VGVpaGt1VmpRSURBUUFCLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tJztcbiAgICAgICAgbGV0IHB1YiA9IFJTQS5LRVlVVElMLmdldEtleShwdWJLZXkpO1xuICAgICAgICBsZXQgZW5jID0gUlNBLktKVVIuY3J5cHRvLkNpcGhlci5lbmNyeXB0TG9uZzIoYXJncywgcHViKTtcbiAgICAgICAgY2FsbGJhY2soZW5jKTtcbiAgICB9XG5cbiAgICBnZXROZXR3b3JrU3RhdGUoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNhbGxiYWNrKFwiV0lGSVwiKTtcbiAgICB9XG5cbiAgICBpc0RlYnVnKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvL3RvZG8g6KaB5pS5XG4gICAgaXNUZXN0U2VydmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdXBkYXRlSGVhbHRoVmFsdWUoKSB7XG5cbiAgICB9XG4gICAgcmV0cnlUb2tlbigpIHtcblxuICAgIH1cblxuICAgIHJlY29yZExvZyh0YWc6IHN0cmluZywgY29udGVudDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omT5byA5paw5Lq657qi5YyFXG4gICAgICovXG4gICAgT3Blbk5ld0JpcmRSZWQoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBjYy5sb2coJ+aooeaLn+aJk+W8gOaWsOS6uue6ouWMhScpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmtojpmaTml7bmiZPlvIDmuLjmiI/lhoXnuqLljIVcbiAgICAgKiBAcGFyYW0gdHlwZSAoXCIxIOWFqOWxj+W5v+WRijPnp5LlhbPpl60gMiDmv4DlirHop4bpopEg55yL5a6M5Y+v5YWz6ZetIDMg5LiN55yL5bm/5ZGKXCIpXG4gICAgICogQHBhcmFtIGFkaWQg5YWo5bGP5bm/5ZGK5oiW5r+A5Yqx6KeG6aKR55qE5bm/5ZGKaWRcbiAgICAgKi9cbiAgICBPcGVuR2FtZVJlZCh0eXBlOiBudW1iZXIsIGFkaWQ6IG51bWJlciwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBjYy5sb2coJ+aooeaLn+aJk+W8gOa4uOaIj+WGhee6ouWMhScpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiZPlvIDkvZnpop3lvLnnqpdcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAgICovXG4gICAgT3BlbkJhbGFuY2VEaWFsb2coY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBjYy5sb2coJ+aooeaLn+aJk+W8gOS9memineW8ueeqlycpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnlKjmiLfkvZnpop1cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAgICovXG4gICAgUmVxQmFsYW5jZShjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIG9iaiA9IHsgXCJjb2luXCI6IDAsIFwiY29pblJlbWFpblwiOiAwLCBcImVhcm5BZ2FpblwiOiBcIjEwMFwiLCBcInJlbWFpblwiOiBcIjBcIiwgXCJ0eXBlXCI6IDEsIFwid2l0aGRyYXdMaW1pdGVkXCI6IFwiMTAwXCIgfTtcbiAgICAgICAgY2FsbGJhY2sob2JqKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnlKjmiLfkv6Hmga9cbiAgICAgKi9cbiAgICBSZXFVc2VySW5mbyhjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIG9iaiA9IHsgXCJhd2FyRHRpbWVcIjogMCwgXCJhd2FyZENvaW5cIjogMCwgXCJiYWxhbmNlXCI6IDAuMDEsIFwiY29pblJhdGVcIjogMTAwMDAsIFwiZG91YmxlQnVzaW5lc3NUeXBlXCI6IDAsIFwiaXNOZXdVc2VyXCI6IDAsIFwibmV3VXNlckNvaW5cIjogMCwgXCJ1c2VyQ29pblwiOiB7IFwiY29pblwiOiAxMjU0NiwgXCJ0b2RheUNvaW5cIjogMzcsIFwidG90YWxBZGRcIjogMTI1NDYgfSB9O1xuICAgICAgICBjYWxsYmFjayhvYmopO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiDlsZXnpLrpgJrnlKjlvLnnqpdcbiAgICAgKi9cbiAgICBPcGVuR2VuZXJhbERpYWxvZyhjb2luOiBudW1iZXIsIG11bHRpcGxlOiBudW1iZXIsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgICAgLy9jYy5sb2coJ+aooeaLn+WxleekuumAmueUqOW8ueeqlycpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog6ZyH5YqoXG4gICAgICogQHBhcmFtIHRpbWUg5pe26ZW/XG4gICAgICovXG4gICAgc2V0VmlicmF0b3IodGltZTogbnVtYmVyLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIC8vY2MubG9nKCfmqKHmi5/lt7LpnIfliqgnKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDmj5DkuqTln4vngrlcbiAgICAqIEBwYXJhbSBvYmog56We562W5Y+C5pWwXG4gICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgKi9cbiAgICB0cmFjayhvYmo6IGFueSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCfmqKHmi5/nu5/orqHkuIrmiqUnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhvYmopO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5o+Q5Lqk6aKE572u5bGe5oCnXG4gICAgICogQHBhcmFtIG9iaiDnpZ7nrZblj4LmlbBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgICovXG4gICAgdHJhY2tVc2VyUHJvcGVydGllcyhvYmo6IGFueSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICAvL2NjLmxvZygn5qih5ouf57uf6K6h5LiK5oqlJyk7XG4gICAgICAgIC8vY2MubG9nKG9iaik7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIOa2iOmZpOWQr+WKqOm7keWxj1xuICAgICovXG4gICAgZmluaXNoQ29jb3NMYXVuY2goKSB7XG4gICAgICAgIGNjLmxvZygn5qih5ouf5raI6Zmk5ZCv5Yqo6buR5bGPJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw5b2T5YmN5peg5bC9562J57qnXG4gICAgICogQHBhcmFtIGN1cnJlbnRfbGV2ZWwg562J57qnXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg1xuICAgICAqL1xuICAgIHVwZGF0ZUN1cnJlbnRMZXZlbChjdXJyZW50X2xldmVsOiBudW1iZXIsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgICAgY2MubG9nKCfmqKHmi5/mm7TmlrDlvZPliY3ml6DlsL3nrYnnuqcnKTtcbiAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICdjdXJyZW50X2xldmVsJzogY3VycmVudF9sZXZlbFxuICAgICAgICB9XG4gICAgICAgIGNjLmxvZyhvYmopO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDlvZPliY3pl6/lhbPnrYnnuqdcbiAgICAgKiBAcGFyYW0gY3VycmVudF9wYXNzX2xldmVsIOi/h+WFs+etiee6p1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICB1cGRhdGVDdXJyZW50UGFzc0xldmVsKGN1cnJlbnRfcGFzc19sZXZlbDogbnVtYmVyLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNjLmxvZygn5qih5ouf5pu05paw5b2T5YmN6Zev5YWz562J57qnJyk7XG4gICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAnY3VycmVudF9wYXNzX2xldmVsJzogY3VycmVudF9wYXNzX2xldmVsXG4gICAgICAgIH1cbiAgICAgICAgY2MubG9nKG9iaik7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bliJjmtbfpq5jluqZcbiAgICAgKi9cbiAgICBnZXRMaXVIYWlIZWlnaHQoKSB7XG4gICAgICAgIGNjLmxvZygn6I635Y+W5YiY5rW36auY5bqmJyk7XG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xuICAgICAgICBpZiAoUHhUcmFuc1V0aWxzLmdldFNjcmVlbkhlaWdodCgpIC8gUHhUcmFuc1V0aWxzLmdldFNjcmVlbldpZHRoKCkgPiAxLjc4KSB7XG4gICAgICAgICAgICByZXN1bHQgPSA1MDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBTdHJpbmcocmVzdWx0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5YiY5rW36auY5bqmXG4gICAgICovXG4gICAgZXhpdEdhbWUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfmqKHmi5/pgIDlh7rmuLjmiI8nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u5piv5ZCm55uR5ZCs6Jma5ouf6ZSu54K55Ye75LqL5Lu2XG4gICAgICovXG4gICAgZW5hYmxlT25CYWNrcHJlc3NlZChlbmFibGU6IGJvb2xlYW4pIHtcbiAgICAgICAgY2MubG9nKCfmqKHmi5/orr7nva7nm5HlkKzomZrmi5/plK4tJyArIGVuYWJsZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPlue9kee7nOeKtuaAgVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBmYWxzZeaXoOe9kee7nFxuICAgICAqL1xuICAgIGlzTmV0d29ya0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5vbkxpbmU7XG4gICAgfVxuICAgIG5vdGlmeUNvbmZpZygpIHsgfVxuXG4gICAgc2hvd0N1c3RvbWVyU2VydmljZSgpIHtcblxuICAgIH1cblxuICAgIGNhbmNlbEFjY291bnQoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZG93bmxvYWROZXdWZXJzaW9uQXBrKCkge1xuXG4gICAgfVxuXG4gICAgaGFzTmV3VmVyc2lvblJld2FyZCgpIHtcblxuICAgIH1cblxuICAgIHJlc2V0TmV3VmVyc2lvblJld2FyZCgpIHtcblxuICAgIH1cblxuICAgIGdldE5ld1ZlcnNpb25OYW1lKCkge1xuXG4gICAgfVxuXG4gICAgaXNOb3RpZmljYXRpb25FbmFibGVkKCkge1xuXG4gICAgfVxuXG4gICAgc3RhcnROb3RpZmljYXRpb25TZXR0aW5nKCkge1xuXG4gICAgfVxufSJdfQ==