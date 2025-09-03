
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/XMSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxYTVNESy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7O0FBRUgsTUFBTTtBQUNOLDRDQUF5RDtBQUN6RCw2REFBd0Q7QUFDeEQsc0NBQXFDO0FBQ3JDLDhDQUE2QztBQUU3Qyx5Q0FBd0M7QUFJeEMsMENBQXFDO0FBQ3JDLG9EQUFtRDtBQUVuRDtJQUFBO0lBbVVBLENBQUM7SUFqVUcsU0FBUztJQUNGLGdCQUFVLEdBQWpCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzdDLCtDQUErQztRQUUvQyxzQkFBWSxDQUFDLHlCQUFlLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQSxVQUFVO1FBQzNELGlCQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQWUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNqRSwrQkFBK0I7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO1FBQ3BDLGlCQUFPLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXhCLG9CQUFvQjtRQUNwQix1QkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUEsUUFBUTtRQUMxQixlQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSxjQUFjO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxVQUFJLEdBQVgsVUFBWSxRQUFnQixFQUFFLE1BQVksRUFBRSxRQUFtQjtRQUMzRCxPQUFPLHlCQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7T0FFRztJQUNJLGVBQVMsR0FBaEI7UUFDSSxPQUFPLHlCQUFlLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRDs7T0FFRztJQUNJLGtCQUFZLEdBQW5CO1FBQ0ksT0FBTyxpQkFBTyxDQUFDLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxhQUFPLEdBQWQ7UUFDSSxPQUFPLHlCQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLGtCQUFZLEdBQW5CO1FBQ0ksT0FBTyx5QkFBZSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBQ0Q7O1dBRU87SUFDQSxnQkFBVSxHQUFqQjtRQUNJLE9BQU8seUJBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFFLHlCQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVFLENBQUM7SUFHRDs7OztPQUlHO0lBQ0ksaUJBQVcsR0FBbEIsVUFBbUIsSUFBWSxFQUFFLFFBQW1CO1FBQ2hELHlCQUFlLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHdCQUFrQixHQUF6QixVQUEwQixLQUF3QjtRQUM5Qyx5QkFBZSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxXQUFLLEdBQVosVUFBYSxJQUFZLEVBQUUsUUFBaUIsRUFBRSxHQUFZLEVBQUUsS0FBYztRQUN0RSxxQkFBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QiwwQkFBMEI7UUFDMUIsd0NBQXdDO0lBQzVDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxpQkFBVyxHQUFsQixVQUFtQixJQUFhO1FBQzVCLGVBQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUJBQVcsR0FBbEI7UUFDSSxlQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxXQUFLLEdBQVosVUFBYSxHQUFzQyxFQUFFLFFBQW1CO1FBQ3BFLHlCQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O01BSUU7SUFDSyx5QkFBbUIsR0FBMUIsVUFBMkIsR0FBUSxFQUFFLFFBQW1CO1FBQ3BELHlCQUFlLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBR0Q7O09BRUc7SUFDSSx1QkFBaUIsR0FBeEI7UUFDSSx5QkFBZSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNJLHFCQUFlLEdBQXRCO1FBQ0ksT0FBTyx5QkFBZSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBQ0Q7O09BRUc7SUFDSSw0QkFBc0IsR0FBN0I7UUFDSSxPQUFPLHlCQUFlLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUNEOztPQUVHO0lBQ0ksYUFBTyxHQUFkO1FBQ0ksT0FBTyxpQkFBTyxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBQ0Q7O09BRUc7SUFDSSxjQUFRLEdBQWY7UUFDSSx5QkFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0Q7O09BRUc7SUFDSSwyQkFBcUIsR0FBNUIsVUFBNkIsTUFBZTtRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUM5Qix5QkFBZSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFDRDs7O09BR0c7SUFDSSx3QkFBa0IsR0FBekI7UUFDSSxPQUFPLHlCQUFlLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNEOztPQUVHO0lBQ0ksZ0JBQVUsR0FBakI7UUFDSSx5QkFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBQ0Q7O01BRUU7SUFDSyxnQkFBVSxHQUFqQjtRQUNJLHlCQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFDRDs7TUFFRTtJQUNLLHVCQUFpQixHQUF4QjtRQUNJLHlCQUFlLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVEOztLQUVDO0lBQ00seUJBQW1CLEdBQTFCO1FBQ0kseUJBQWUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBQ00sdUJBQWlCLEdBQXhCO1FBQ0kseUJBQWUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ00sc0JBQWdCLEdBQXZCO1FBQ0kseUJBQWUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBQ00sbUJBQWEsR0FBcEI7UUFDSSx5QkFBZSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxnQkFBVSxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLHlCQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0Q7O09BRUc7SUFDSSxvQkFBYyxHQUFyQjtRQUNJLE9BQU8seUJBQWUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDL0MsQ0FBQztJQUNNLHFCQUFlLEdBQXRCO1FBQ0ksT0FBTyx5QkFBZSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUNoRCxDQUFDO0lBQ0Q7O01BRUU7SUFDSyx1QkFBaUIsR0FBeEI7UUFDSSxPQUFPLHlCQUFlLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHdCQUFrQixHQUF6QixVQUEwQixRQUFrQjtRQUN4QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHNCQUFnQixHQUF2QixVQUF3QixRQUFrQjtRQUN0QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO0lBQ3BELENBQUM7SUFHTSxVQUFJLEdBQVgsVUFBWSxNQUFvQjtRQUM1QixJQUFJLFVBQVUsR0FBaUI7WUFDM0IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLFNBQVMsRUFBRSxVQUFVLEdBQUc7Z0JBQ3BCLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUUsQ0FBQztnQkFDakMsTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzdDLENBQUM7WUFDRCxNQUFNLEVBQUUsVUFBVSxHQUFHO2dCQUNqQixLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtnQkFFeEIsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBRXZDLENBQUM7WUFDRCxVQUFVLEVBQUUsVUFBVSxHQUFHO2dCQUNyQixNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEQsQ0FBQztTQUVKLENBQUE7UUFDRCxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFHSyxnQkFBVSxHQUFqQixVQUFrQixNQUFvQjtRQUNqQyxJQUFJLFVBQVUsR0FBaUI7WUFDM0IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLFNBQVMsRUFBRSxVQUFVLEdBQUc7Z0JBQ3BCLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7Z0JBRTNCLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM3QyxDQUFDO1lBQ0QsTUFBTSxFQUFFLFVBQVUsR0FBRztnQkFDakIsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUE7Z0JBRXhCLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUV2QyxDQUFDO1lBQ0QsVUFBVSxFQUFFLFVBQVUsR0FBRztnQkFDckIsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hELENBQUM7U0FFSixDQUFBO1FBQ0QsY0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBR00sU0FBRyxHQUFWLFVBQVcsTUFBb0I7UUFDM0IsbURBQW1EO1FBQ25ELElBQUksVUFBVSxHQUFpQjtZQUMzQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDZixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7WUFDakIsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsU0FBUyxFQUFFLFVBQVUsR0FBRztnQkFDcEIsS0FBSyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBRSxDQUFDO2dCQUM1QixNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDN0MsQ0FBQztZQUNELE1BQU0sRUFBRSxVQUFVLEdBQUc7Z0JBQ2pCLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO2dCQUV4QixNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdkMsQ0FBQztZQUNELFVBQVUsRUFBRSxVQUFVLEdBQUc7Z0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMvQyxDQUFDO1NBRUosQ0FBQTtRQUNELGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQTVFTSxzQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUE2RWhDLFlBQUM7Q0FuVUQsQUFtVUMsSUFBQTtrQkFuVW9CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkZXNjcmlwdGlvbiDlub/lkYpzZGtcbiAqL1xuXG4vLyDliJ3lp4vljJZcbmltcG9ydCB7IEFwcEluZm8sIHNldFVwVGVzdGluZyB9IGZyb20gJy4vQ29uZmlnL0FwcEluZm8nO1xuaW1wb3J0IFBsYXRmb3JtRmFjdG9yeSBmcm9tIFwiLi9BZGFwdGVyL1BsYXRmb3JtRmFjdG9yeVwiO1xuaW1wb3J0IHsgQWRVdGlsIH0gZnJvbSAnLi9BRC9BZFV0aWwnO1xuaW1wb3J0IHsgQWR2aWV3VXRpbCB9IGZyb20gJy4vQUQvQWR2aWV3VXRpbCc7XG5pbXBvcnQgTGF1bmNoU2RrUGFnZVR5cGUgZnJvbSAnLi9BZGFwdGVyL1R5cGUvTGF1bmNoU2RrUGFnZVR5cGUnO1xuaW1wb3J0IHsgWE1Mb2FkIH0gZnJvbSAnLi9VdGlscy9YTUxvYWQnO1xuaW1wb3J0IHsgU2VydmVyQ29uZmlnIH0gZnJvbSAnLi4vVXJsQ29uc3QnO1xuaW1wb3J0IE5hbWVUcyBmcm9tICcuLi8uLi9jb21tb24vTmFtZVRzJztcbmltcG9ydCBwYWdlVHMgZnJvbSAnLi4vLi4vY29tbW9uL3BhZ2VUcyc7XG5pbXBvcnQgQWpheCBmcm9tICcuLi9TZXJ2ZXJNZ3IvQWpheCc7XG5pbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tICcuLi8uLi9Bc3Npc3QvQXNzaXN0Q3RyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWE1TREsge1xuXG4gICAgLy8g5Yid5aeL5YyWU0RLXG4gICAgc3RhdGljIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9PT09PT09ICDlvIDlp4vliJ3lp4vljJbllYbkuJrljJZTREsgID09PT09PT0nKTtcbiAgICAgICAgLy8g6I635Y+WYWRIZWFkICDlpoLmnpwg6LCD55So5Lqk5LqS5o6l5Y+j6I635Y+WQWRIZWFk5oql6ZSZ77yM55u05o6l6LCD55So6L+e5o6l5LiK55qEYWRoZWFkXG5cbiAgICAgICAgc2V0VXBUZXN0aW5nKFBsYXRmb3JtRmFjdG9yeS5JbnMuaXNUZXN0U2VydmVyKCkpOy8v6I635Y+W5rWL6K+Vb3LmraPlvI9cbiAgICAgICAgQXBwSW5mby5waGVhZCA9IEpTT04ucGFyc2UoUGxhdGZvcm1GYWN0b3J5Lklucy5nZXRQaGVhZFN0cmluZygpKTtcbiAgICAgICAgLy8gQXBwSW5mby5waGVhZCA9IG1vY2sxLlBIRUFEO1xuXHRcdGNvbnNvbGUubG9nKFwi5aSE55CG5pWw5o2uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIilcbiAgICAgICAgQXBwSW5mby52ZXJzaW9uID0gXCJ2MS4yLjlcIlxuICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5Y+WcGhlYWQnKTtcblxuICAgICAgICAvLyDlub/lkYrliJ3lp4vljJYg5ri45oiP5Lit5Y+q6ZyA6KaB5Yid5aeL5YyW5LiA5qyhXG4gICAgICAgIEFkdmlld1V0aWwuaW5pdCgpOy8v5Yid5aeL5YyW5L+h5oGv5rWBXG4gICAgICAgIEFkVXRpbC5pbml0KCk7Ly/liJ3lp4vljJbmv4DlirHop4bpopEv5o+S5bGP5bm/5ZGKXG4gICAgICAgIGNvbnNvbGUubG9nKCc9PT09PT09ICDnu5PmnZ/liJ3lp4vljJbllYbkuJrljJZTREsgID09PT09PT0nKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4jlNES+S6pOS6kumAmuS/oVxuICAgICAqIEBwYXJhbSBmdW5OYW1lIOaWueazleWQjVxuICAgICAqIEBwYXJhbSBwYXJhbXMg5Y+C5pWwXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg1xuICAgICAqL1xuICAgIHN0YXRpYyBjYWxsKGZ1bmNOYW1lOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgY2FsbGJhY2s/OiBGdW5jdGlvbik6IGFueSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmNhbGwoZnVuY05hbWUsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlkFkSGVhZFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRBZEhlYWQoKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmdldEFkaGVhZFN0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeacjeWKoeWZqEhvc3RcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0U2V2ZXJIb3N0KCkge1xuICAgICAgICByZXR1cm4gQXBwSW5mby5hcHBIb3N0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYr+WQpuS4umRlYnVn5qih5byPXG4gICAgICovXG4gICAgc3RhdGljIGlzRGVidWcoKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmlzRGVidWcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbkuLrmtYvor5XmnI1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNUZXN0U2VydmVyKCkge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1GYWN0b3J5Lklucy5pc1Rlc3RTZXJ2ZXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICAgICAqIOiOt+WPlmFwcOWQjeWtl1xuICAgICAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QXBwTmFtZSgpe1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1GYWN0b3J5Lklucy5nZXRBcHBOYW1lJiZQbGF0Zm9ybUZhY3RvcnkuSW5zLmdldEFwcE5hbWUoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOiuvue9rumch+WKqFxuICAgICAqIEBwYXJhbSB0aW1lIOaXtumVv++8jOWNleS9jeavq+enklxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0VmlicmF0b3IodGltZTogbnVtYmVyLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuc2V0VmlicmF0b3IodGltZSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmueUqOi3s+i9rCDot7PovaznvZHpobXnrYlcbiAgICAgKiBAcGFyYW0gcGFyYW0g5Y+C5pWwXG4gICAgICovXG4gICAgc3RhdGljIGxhdW5jaFNjZW5lU2RrUGFnZShwYXJhbTogTGF1bmNoU2RrUGFnZVR5cGUpIHtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5sYXVuY2hTY2VuZVNka1BhZ2UocGFyYW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYvuekuuS4gOS4qnRvYXN0XG4gICAgICogQHBhcmFtIHRleHQg5paH5pysXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIOW7tui/n+WFs+mXre+8jOm7mOiupDEuNXNcbiAgICAgKiBAcGFyYW0gcG9zIHRvYXN05L2N572u77yMMOmhtumDqO+8jDHkuK3pl7TvvIwy5bqV6YOo77yM6buY6K6k5bqV6YOoXG4gICAgICovXG4gICAgc3RhdGljIHRvYXN0KHRleHQ6IHN0cmluZywgZHVyYXRpb24/OiBudW1iZXIsIHBvcz86IG51bWJlciwgc3RhdGU/OiBudW1iZXIpIHtcbiAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0ZXh0KTtcbiAgICAgICAgLy8gWE1Ub2FzdC5zaG93VGV4dCh0ZXh0KTtcbiAgICAgICAgLy9YTVRvYXN0LlNob3dUZXh0KHRleHQsIGR1cmF0aW9uLCBwb3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtc2c6IOaYvuekumxvYWRpbmdcbiAgICAgKiBAcGFyYW0gdGV4dCBsb2Fk5paH5qGI77yM5Y+v5LiN5LygXG4gICAgICovXG4gICAgc3RhdGljIHNob3dMb2FkaW5nKHRleHQ/OiBzdHJpbmcsKSB7XG4gICAgICAgIFhNTG9hZC5TaG93TG9hZGluZyh0ZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbXNnOiDpmpDol49sb2FkaW5nXG4gICAgICovXG4gICAgc3RhdGljIGhpZGVMb2FkaW5nKCkge1xuICAgICAgICBYTUxvYWQuSGlkZUxvYWRpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmj5DkuqTln4vngrlcbiAgICAgKiBAcGFyYW0gb2JqIOelnuetluWPguaVsFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhY2sob2JqOiB7IGV2ZW50TmFtZTogc3RyaW5nLCBwcm9wczogYW55IH0sIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy50cmFjayhvYmosIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOaPkOS6pOelnuetlumihOe9ruWxnuaAp1xuICAgICogQHBhcmFtIG9iaiDnpZ7nrZblj4LmlbBcbiAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAqL1xuICAgIHN0YXRpYyB0cmFja1VzZXJQcm9wZXJ0aWVzKG9iajogYW55LCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMudHJhY2tVc2VyUHJvcGVydGllcyhvYmosIGNhbGxiYWNrKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOa2iOmZpOWQr+WKqOm7keWxj1xuICAgICAqL1xuICAgIHN0YXRpYyBmaW5pc2hDb2Nvc0xhdW5jaCgpIHtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5maW5pc2hDb2Nvc0xhdW5jaCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWImOa1t+mrmOW6plxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRMaXVIYWlIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmdldExpdUhhaUhlaWdodCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5blr7zoiKrmoI/pq5jluqZcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0TmF2aWdhdGlvbkJhckhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIFBsYXRmb3JtRmFjdG9yeS5JbnMuZ2V0TmF2aWdhdGlvbkJhckhlaWdodCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bnvZHpobVob3N0XG4gICAgICovXG4gICAgc3RhdGljIGdldEhvc3QoKSB7XG4gICAgICAgIHJldHVybiBBcHBJbmZvLmhvc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAgOWHukFQUFxuICAgICAqL1xuICAgIHN0YXRpYyBleGl0R2FtZSgpIHtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5leGl0R2FtZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlkK/liqgv5YWz6ZetIOWJjeWQjuWPsOebkeWQrFxuICAgICAqL1xuICAgIHN0YXRpYyBlbmFibGVPblJlc3VtZU9uUGF1c2UoZW5hYmxlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5ZCv5Yqo5ZCO5Y+w55uR5ZCsMVwiLCBlbmFibGUpXG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuZW5hYmxlT25SZXN1bWVPblBhdXNlKHsgZW5hYmxlOiBlbmFibGUgfSlcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W572R57uc54q25oCBXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGZhbHNl5peg572R57ucXG4gICAgICovXG4gICAgc3RhdGljIGlzTmV0d29ya0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIFBsYXRmb3JtRmFjdG9yeS5JbnMuaXNOZXR3b3JrQ29ubmVjdGVkKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmuefpeWIt+aWsOWuouaIt+err3Rva2VuXG4gICAgICovXG4gICAgc3RhdGljIHJldHJ5VG9rZW4oKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMucmV0cnlUb2tlbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIOW+ruS/oeaOiOadg1xuICAgICovXG4gICAgc3RhdGljIGF1dGhXZWNoYXQoKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuYXV0aFdlY2hhdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIOaUr+S7mOWuneaOiOadg1xuICAgICovXG4gICAgc3RhdGljIHJlcXVlc3RBbGlwYXlBdXRoKCkge1xuICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLnJlcXVlc3RBbGlwYXlBdXRoKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAqIOWPjemmiOeVjOmdolxuICAgKi9cbiAgICBzdGF0aWMgc2hvd0N1c3RvbWVyU2VydmljZSgpIHtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5zaG93Q3VzdG9tZXJTZXJ2aWNlKCk7XG4gICAgfVxuICAgIHN0YXRpYyBzaG93UHJpdmFjeVBvbGljeSgpIHtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5zaG93UHJpdmFjeVBvbGljeSgpO1xuICAgIH1cbiAgICBzdGF0aWMgc2hvd1VzZXJQcm90b2NvbCgpIHtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5zaG93VXNlclByb3RvY29sKCk7XG4gICAgfVxuICAgIHN0YXRpYyBjYW5jZWxBY2NvdW50KCl7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuY2FuY2VsQWNjb3VudCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJk+W8gOmTvuaOpVxuICAgICAqL1xuICAgIHN0YXRpYyBvcGVuV2ViVXJsKG9iaikge1xuICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLm9wZW5XZWJVcmwob2JqKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5Y6f55Sf55qE5bC65a+4XG4gICAgICovXG4gICAgc3RhdGljIGdldFNjcmVlbldpZHRoKCkge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1GYWN0b3J5Lklucy5nZXRTY3JlZW5XaWR0aCgpXG4gICAgfVxuICAgIHN0YXRpYyBnZXRTY3JlZW5IZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmdldFNjcmVlbkhlaWdodCgpXG4gICAgfVxuICAgIC8qKlxuICAgICog6I635Y+W6Z2e5by65Yi25pu05paw54mI5pysXG4gICAgKi9cbiAgICBzdGF0aWMgZ2V0TmV3VmVyc2lvbk5hbWUoKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmdldE5ld1ZlcnNpb25OYW1lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5re75Yqg5ri45oiP5oGi5aSN55uR5ZCsXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg1xuICAgICAqL1xuICAgIHN0YXRpYyBvbkxpc3RlbkdhbWVSZXN1bWUoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHdpbmRvd1tcIlN5c3RlbUludGVyZmFjZVwiXS5vbkxpc3RlbkdhbWVSZXN1bWUgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDmuLjmiI/lgZzmraLnm5HlkKxcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgICovXG4gICAgc3RhdGljIG9uTGlzdGVuR2FtZVN0b3AoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHdpbmRvd1tcIlN5c3RlbUludGVyZmFjZVwiXS5PbkdhbWVTdG9wID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgc3RhdGljIG9wZW5OZXRXb3JrQ291bnQgPSAwO1xuICAgIHN0YXRpYyBwb3N0KGNvbmZpZzogU2VydmVyQ29uZmlnKSB7ICAgICAgICBcbiAgICAgICAgbGV0IGNvbmZpZ0RhdGE6IFNlcnZlckNvbmZpZyA9IHtcbiAgICAgICAgICAgIHVybDogY29uZmlnLnVybCxcbiAgICAgICAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcjogY29uZmlnLmhlYWRlcixcbiAgICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIFhNU0RLLm9wZW5OZXRXb3JrQ291bnQgPSAwO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIuaIkOWKn+Wbnuiwgy0tLS0tLS0tLS0tLS0tLS0tLS0tcG9zdFwiICk7XG4gICAgICAgICAgICAgICAgY29uZmlnLm9uU3VjY2VzcyAmJiBjb25maWcub25TdWNjZXNzKHJlcylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBYTVNESy5vcGVuTmV0V29ya0NvdW50KytcblxuICAgICAgICAgICAgICAgIGNvbmZpZy5vbkZhaWwgJiYgY29uZmlnLm9uRmFpbChyZXMpXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLm9uQ29tcGxldGUgJiYgY29uZmlnLm9uQ29tcGxldGUocmVzKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgIH1cbiAgICAgICAgQWpheC5zZW5kKGNvbmZpZ0RhdGEpO1xuICAgIH1cblx0XG5cdFxuXHQgIHN0YXRpYyBnZXRkYXRhU3RyKGNvbmZpZzogU2VydmVyQ29uZmlnKSB7ICAgICAgICBcbiAgICAgICAgbGV0IGNvbmZpZ0RhdGE6IFNlcnZlckNvbmZpZyA9IHtcbiAgICAgICAgICAgIHVybDogY29uZmlnLnVybCxcbiAgICAgICAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcjogY29uZmlnLmhlYWRlcixcbiAgICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIFhNU0RLLm9wZW5OZXRXb3JrQ291bnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgY29uZmlnLm9uU3VjY2VzcyAmJiBjb25maWcub25TdWNjZXNzKHJlcylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBYTVNESy5vcGVuTmV0V29ya0NvdW50KytcblxuICAgICAgICAgICAgICAgIGNvbmZpZy5vbkZhaWwgJiYgY29uZmlnLm9uRmFpbChyZXMpXG4gICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLm9uQ29tcGxldGUgJiYgY29uZmlnLm9uQ29tcGxldGUocmVzKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgIH1cbiAgICAgICAgQWpheC5nZXRkYXRhKGNvbmZpZ0RhdGEpO1xuICAgIH1cblx0XG5cdFxuICAgIHN0YXRpYyBnZXQoY29uZmlnOiBTZXJ2ZXJDb25maWcpIHtcbiAgICAgICAgLy9VSUZ1bmMub3BlblVJKEFjdGl2aXR5UGFubmVsTmFtZS5QYW5uZWxBZExvYWRpbmcpXG4gICAgICAgIGxldCBjb25maWdEYXRhOiBTZXJ2ZXJDb25maWcgPSB7XG4gICAgICAgICAgICB1cmw6IGNvbmZpZy51cmwsXG4gICAgICAgICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcjogY29uZmlnLmhlYWRlcixcbiAgICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIFhNU0RLLm9wZW5OZXRXb3JrQ291bnQgPSAwO1xuY29uc29sZS5sb2coXCLmiJDlip/lm57osIMtLS0tLS0tLS0tLS0tLS0tLS0tLWdldFwiICk7XG4gICAgICAgICAgICAgICAgY29uZmlnLm9uU3VjY2VzcyAmJiBjb25maWcub25TdWNjZXNzKHJlcylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBYTVNESy5vcGVuTmV0V29ya0NvdW50KytcblxuICAgICAgICAgICAgICAgIGNvbmZpZy5vbkZhaWwgJiYgY29uZmlnLm9uRmFpbChyZXMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5vbkNvbXBsZXRlICYmIGNvbmZpZy5vbkNvbXBsZXRlKHJlcykgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgIH1cbiAgICAgICAgQWpheC5zZW5kKGNvbmZpZ0RhdGEpO1xuICAgIH1cbn1cbiJdfQ==