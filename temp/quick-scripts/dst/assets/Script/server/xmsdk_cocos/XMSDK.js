
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxYTVNESy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7O0FBRUgsTUFBTTtBQUNOLDRDQUF5RDtBQUN6RCw2REFBd0Q7QUFDeEQsc0NBQXFDO0FBQ3JDLDhDQUE2QztBQUU3Qyx5Q0FBd0M7QUFJeEMsMENBQXFDO0FBQ3JDLG9EQUFtRDtBQUVuRDtJQUFBO0lBaVVBLENBQUM7SUEvVEcsU0FBUztJQUNGLGdCQUFVLEdBQWpCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzdDLCtDQUErQztRQUUvQyxzQkFBWSxDQUFDLHlCQUFlLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQSxVQUFVO1FBQzNELGlCQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQWUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNqRSwrQkFBK0I7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO1FBQzFDLGlCQUFPLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXhCLG9CQUFvQjtRQUNwQix1QkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUEsUUFBUTtRQUMxQixlQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSxjQUFjO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxVQUFJLEdBQVgsVUFBWSxRQUFnQixFQUFFLE1BQVksRUFBRSxRQUFtQjtRQUMzRCxPQUFPLHlCQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FB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QUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDN0MsQ0FBQztZQUNELE1BQU0sRUFBRSxVQUFVLEdBQUc7Z0JBQ2pCLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO2dCQUV4QixNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdkMsQ0FBQztZQUNELFVBQVUsRUFBRSxVQUFVLEdBQUc7Z0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMvQyxDQUFDO1NBRUosQ0FBQTtRQUNELGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQTFFTSxzQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUEyRWhDLFlBQUM7Q0FqVUQsQUFpVUMsSUFBQTtrQkFqVW9CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkZXNjcmlwdGlvbiDlub/lkYpzZGtcbiAqL1xuXG4vLyDliJ3lp4vljJZcbmltcG9ydCB7IEFwcEluZm8sIHNldFVwVGVzdGluZyB9IGZyb20gJy4vQ29uZmlnL0FwcEluZm8nO1xuaW1wb3J0IFBsYXRmb3JtRmFjdG9yeSBmcm9tIFwiLi9BZGFwdGVyL1BsYXRmb3JtRmFjdG9yeVwiO1xuaW1wb3J0IHsgQWRVdGlsIH0gZnJvbSAnLi9BRC9BZFV0aWwnO1xuaW1wb3J0IHsgQWR2aWV3VXRpbCB9IGZyb20gJy4vQUQvQWR2aWV3VXRpbCc7XG5pbXBvcnQgTGF1bmNoU2RrUGFnZVR5cGUgZnJvbSAnLi9BZGFwdGVyL1R5cGUvTGF1bmNoU2RrUGFnZVR5cGUnO1xuaW1wb3J0IHsgWE1Mb2FkIH0gZnJvbSAnLi9VdGlscy9YTUxvYWQnO1xuaW1wb3J0IHsgU2VydmVyQ29uZmlnIH0gZnJvbSAnLi4vVXJsQ29uc3QnO1xuaW1wb3J0IE5hbWVUcyBmcm9tICcuLi8uLi9jb21tb24vTmFtZVRzJztcbmltcG9ydCBwYWdlVHMgZnJvbSAnLi4vLi4vY29tbW9uL3BhZ2VUcyc7XG5pbXBvcnQgQWpheCBmcm9tICcuLi9TZXJ2ZXJNZ3IvQWpheCc7XG5pbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tICcuLi8uLi9Bc3Npc3QvQXNzaXN0Q3RyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWE1TREsge1xuXG4gICAgLy8g5Yid5aeL5YyWU0RLXG4gICAgc3RhdGljIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9PT09PT09ICDlvIDlp4vliJ3lp4vljJbllYbkuJrljJZTREsgID09PT09PT0nKTtcbiAgICAgICAgLy8g6I635Y+WYWRIZWFkICDlpoLmnpwg6LCD55So5Lqk5LqS5o6l5Y+j6I635Y+WQWRIZWFk5oql6ZSZ77yM55u05o6l6LCD55So6L+e5o6l5LiK55qEYWRoZWFkXG5cbiAgICAgICAgc2V0VXBUZXN0aW5nKFBsYXRmb3JtRmFjdG9yeS5JbnMuaXNUZXN0U2VydmVyKCkpOy8v6I635Y+W5rWL6K+Vb3LmraPlvI9cbiAgICAgICAgQXBwSW5mby5waGVhZCA9IEpTT04ucGFyc2UoUGxhdGZvcm1GYWN0b3J5Lklucy5nZXRQaGVhZFN0cmluZygpKTtcbiAgICAgICAgLy8gQXBwSW5mby5waGVhZCA9IG1vY2sxLlBIRUFEO1xuICAgICAgICBjb25zb2xlLmxvZyhcIuWkhOeQhuaVsOaNri0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpXG4gICAgICAgIEFwcEluZm8udmVyc2lvbiA9IFwidjEuMi45XCJcbiAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPluWPlnBoZWFkJyk7XG5cbiAgICAgICAgLy8g5bm/5ZGK5Yid5aeL5YyWIOa4uOaIj+S4reWPqumcgOimgeWIneWni+WMluS4gOasoVxuICAgICAgICBBZHZpZXdVdGlsLmluaXQoKTsvL+WIneWni+WMluS/oeaBr+a1gVxuICAgICAgICBBZFV0aWwuaW5pdCgpOy8v5Yid5aeL5YyW5r+A5Yqx6KeG6aKRL+aPkuWxj+W5v+WRilxuICAgICAgICBjb25zb2xlLmxvZygnPT09PT09PSAg57uT5p2f5Yid5aeL5YyW5ZWG5Lia5YyWU0RLICA9PT09PT09JylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuI5TREvkuqTkupLpgJrkv6FcbiAgICAgKiBAcGFyYW0gZnVuTmFtZSDmlrnms5XlkI1cbiAgICAgKiBAcGFyYW0gcGFyYW1zIOWPguaVsFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICBzdGF0aWMgY2FsbChmdW5jTmFtZTogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGNhbGxiYWNrPzogRnVuY3Rpb24pOiBhbnkge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1GYWN0b3J5Lklucy5jYWxsKGZ1bmNOYW1lLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZBZEhlYWRcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QWRIZWFkKCkge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1GYWN0b3J5Lklucy5nZXRBZGhlYWRTdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blvZPliY3mnI3liqHlmahIb3N0XG4gICAgICovXG4gICAgc3RhdGljIGdldFNldmVySG9zdCgpIHtcbiAgICAgICAgcmV0dXJuIEFwcEluZm8uYXBwSG9zdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbkuLpkZWJ1Z+aooeW8j1xuICAgICAqL1xuICAgIHN0YXRpYyBpc0RlYnVnKCkge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1GYWN0b3J5Lklucy5pc0RlYnVnKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5Li65rWL6K+V5pyNXG4gICAgICovXG4gICAgc3RhdGljIGlzVGVzdFNlcnZlcigpIHtcbiAgICAgICAgcmV0dXJuIFBsYXRmb3JtRmFjdG9yeS5JbnMuaXNUZXN0U2VydmVyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAgICAgKiDojrflj5ZhcHDlkI3lrZdcbiAgICAgICAgICovXG4gICAgc3RhdGljIGdldEFwcE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmdldEFwcE5hbWUgJiYgUGxhdGZvcm1GYWN0b3J5Lklucy5nZXRBcHBOYW1lKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDorr7nva7pnIfliqhcbiAgICAgKiBAcGFyYW0gdGltZSDml7bplb/vvIzljZXkvY3mr6vnp5JcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgICovXG4gICAgc3RhdGljIHNldFZpYnJhdG9yKHRpbWU6IG51bWJlciwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLnNldFZpYnJhdG9yKHRpbWUsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgJrnlKjot7Povawg6Lez6L2s572R6aG1562JXG4gICAgICogQHBhcmFtIHBhcmFtIOWPguaVsFxuICAgICAqL1xuICAgIHN0YXRpYyBsYXVuY2hTY2VuZVNka1BhZ2UocGFyYW06IExhdW5jaFNka1BhZ2VUeXBlKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMubGF1bmNoU2NlbmVTZGtQYWdlKHBhcmFtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrkuIDkuKp0b2FzdFxuICAgICAqIEBwYXJhbSB0ZXh0IOaWh+acrFxuICAgICAqIEBwYXJhbSBkdXJhdGlvbiDlu7bov5/lhbPpl63vvIzpu5jorqQxLjVzXG4gICAgICogQHBhcmFtIHBvcyB0b2FzdOS9jee9ru+8jDDpobbpg6jvvIwx5Lit6Ze077yMMuW6lemDqO+8jOm7mOiupOW6lemDqFxuICAgICAqL1xuICAgIHN0YXRpYyB0b2FzdCh0ZXh0OiBzdHJpbmcsIGR1cmF0aW9uPzogbnVtYmVyLCBwb3M/OiBudW1iZXIsIHN0YXRlPzogbnVtYmVyKSB7XG4gICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodGV4dCk7XG4gICAgICAgIC8vIFhNVG9hc3Quc2hvd1RleHQodGV4dCk7XG4gICAgICAgIC8vWE1Ub2FzdC5TaG93VGV4dCh0ZXh0LCBkdXJhdGlvbiwgcG9zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbXNnOiDmmL7npLpsb2FkaW5nXG4gICAgICogQHBhcmFtIHRleHQgbG9hZOaWh+ahiO+8jOWPr+S4jeS8oFxuICAgICAqL1xuICAgIHN0YXRpYyBzaG93TG9hZGluZyh0ZXh0Pzogc3RyaW5nLCkge1xuICAgICAgICBYTUxvYWQuU2hvd0xvYWRpbmcodGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1zZzog6ZqQ6JePbG9hZGluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBoaWRlTG9hZGluZygpIHtcbiAgICAgICAgWE1Mb2FkLkhpZGVMb2FkaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+Q5Lqk5Z+L54K5XG4gICAgICogQHBhcmFtIG9iaiDnpZ7nrZblj4LmlbBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgICovXG4gICAgc3RhdGljIHRyYWNrKG9iajogeyBldmVudE5hbWU6IHN0cmluZywgcHJvcHM6IGFueSB9LCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMudHJhY2sob2JqLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDmj5DkuqTnpZ7nrZbpooTnva7lsZ7mgKdcbiAgICAqIEBwYXJhbSBvYmog56We562W5Y+C5pWwXG4gICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgKi9cbiAgICBzdGF0aWMgdHJhY2tVc2VyUHJvcGVydGllcyhvYmo6IGFueSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLnRyYWNrVXNlclByb3BlcnRpZXMob2JqLCBjYWxsYmFjayk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDmtojpmaTlkK/liqjpu5HlsY9cbiAgICAgKi9cbiAgICBzdGF0aWMgZmluaXNoQ29jb3NMYXVuY2goKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuZmluaXNoQ29jb3NMYXVuY2goKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bliJjmtbfpq5jluqZcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0TGl1SGFpSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1GYWN0b3J5Lklucy5nZXRMaXVIYWlIZWlnaHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5a+86Iiq5qCP6auY5bqmXG4gICAgICovXG4gICAgc3RhdGljIGdldE5hdmlnYXRpb25CYXJIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmdldE5hdmlnYXRpb25CYXJIZWlnaHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W572R6aG1aG9zdFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRIb3N0KCkge1xuICAgICAgICByZXR1cm4gQXBwSW5mby5ob3N0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgIDlh7pBUFBcbiAgICAgKi9cbiAgICBzdGF0aWMgZXhpdEdhbWUoKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuZXhpdEdhbWUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZCv5YqoL+WFs+mXrSDliY3lkI7lj7Dnm5HlkKxcbiAgICAgKi9cbiAgICBzdGF0aWMgZW5hYmxlT25SZXN1bWVPblBhdXNlKGVuYWJsZTogYm9vbGVhbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuWQr+WKqOWQjuWPsOebkeWQrDFcIiwgZW5hYmxlKVxuICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLmVuYWJsZU9uUmVzdW1lT25QYXVzZSh7IGVuYWJsZTogZW5hYmxlIH0pXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPlue9kee7nOeKtuaAgVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBmYWxzZeaXoOe9kee7nFxuICAgICAqL1xuICAgIHN0YXRpYyBpc05ldHdvcmtDb25uZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmlzTmV0d29ya0Nvbm5lY3RlZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJrnn6XliLfmlrDlrqLmiLfnq690b2tlblxuICAgICAqL1xuICAgIHN0YXRpYyByZXRyeVRva2VuKCkge1xuICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLnJldHJ5VG9rZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiDlvq7kv6HmjojmnYNcbiAgICAqL1xuICAgIHN0YXRpYyBhdXRoV2VjaGF0KCkge1xuICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLmF1dGhXZWNoYXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiDmlK/ku5jlrp3mjojmnYNcbiAgICAqL1xuICAgIHN0YXRpYyByZXF1ZXN0QWxpcGF5QXV0aCgpIHtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5yZXF1ZXN0QWxpcGF5QXV0aCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgKiDlj43ppojnlYzpnaJcbiAgICovXG4gICAgc3RhdGljIHNob3dDdXN0b21lclNlcnZpY2UoKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuc2hvd0N1c3RvbWVyU2VydmljZSgpO1xuICAgIH1cbiAgICBzdGF0aWMgc2hvd1ByaXZhY3lQb2xpY3koKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuc2hvd1ByaXZhY3lQb2xpY3koKTtcbiAgICB9XG4gICAgc3RhdGljIHNob3dVc2VyUHJvdG9jb2woKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuc2hvd1VzZXJQcm90b2NvbCgpO1xuICAgIH1cbiAgICBzdGF0aWMgY2FuY2VsQWNjb3VudCgpIHtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5jYW5jZWxBY2NvdW50KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omT5byA6ZO+5o6lXG4gICAgICovXG4gICAgc3RhdGljIG9wZW5XZWJVcmwob2JqKSB7XG4gICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMub3BlbldlYlVybChvYmopO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bljp/nlJ/nmoTlsLrlr7hcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0U2NyZWVuV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmdldFNjcmVlbldpZHRoKClcbiAgICB9XG4gICAgc3RhdGljIGdldFNjcmVlbkhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIFBsYXRmb3JtRmFjdG9yeS5JbnMuZ2V0U2NyZWVuSGVpZ2h0KClcbiAgICB9XG4gICAgLyoqXG4gICAgKiDojrflj5bpnZ7lvLrliLbmm7TmlrDniYjmnKxcbiAgICAqL1xuICAgIHN0YXRpYyBnZXROZXdWZXJzaW9uTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFBsYXRmb3JtRmFjdG9yeS5JbnMuZ2V0TmV3VmVyc2lvbk5hbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDmuLjmiI/mgaLlpI3nm5HlkKxcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgICovXG4gICAgc3RhdGljIG9uTGlzdGVuR2FtZVJlc3VtZShjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgd2luZG93W1wiU3lzdGVtSW50ZXJmYWNlXCJdLm9uTGlzdGVuR2FtZVJlc3VtZSA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoOa4uOaIj+WBnOatouebkeWQrFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICBzdGF0aWMgb25MaXN0ZW5HYW1lU3RvcChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgd2luZG93W1wiU3lzdGVtSW50ZXJmYWNlXCJdLk9uR2FtZVN0b3AgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBzdGF0aWMgb3Blbk5ldFdvcmtDb3VudCA9IDA7XG4gICAgc3RhdGljIHBvc3QoY29uZmlnOiBTZXJ2ZXJDb25maWcpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0RhdGE6IFNlcnZlckNvbmZpZyA9IHtcbiAgICAgICAgICAgIHVybDogY29uZmlnLnVybCxcbiAgICAgICAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcjogY29uZmlnLmhlYWRlcixcbiAgICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIFhNU0RLLm9wZW5OZXRXb3JrQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oiQ5Yqf5Zue6LCDLS0tLS0tLS0tLS0tLS0tLS0tLS1wb3N0XCIpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5vblN1Y2Nlc3MgJiYgY29uZmlnLm9uU3VjY2VzcyhyZXMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgWE1TREsub3Blbk5ldFdvcmtDb3VudCsrXG5cbiAgICAgICAgICAgICAgICBjb25maWcub25GYWlsICYmIGNvbmZpZy5vbkZhaWwocmVzKVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5vbkNvbXBsZXRlICYmIGNvbmZpZy5vbkNvbXBsZXRlKHJlcyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgIH1cbiAgICAgICAgQWpheC5zZW5kKGNvbmZpZ0RhdGEpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGdldGRhdGFTdHIoY29uZmlnOiBTZXJ2ZXJDb25maWcpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0RhdGE6IFNlcnZlckNvbmZpZyA9IHtcbiAgICAgICAgICAgIHVybDogY29uZmlnLnVybCxcbiAgICAgICAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcjogY29uZmlnLmhlYWRlcixcbiAgICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIFhNU0RLLm9wZW5OZXRXb3JrQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5vblN1Y2Nlc3MgJiYgY29uZmlnLm9uU3VjY2VzcyhyZXMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgWE1TREsub3Blbk5ldFdvcmtDb3VudCsrXG4gICAgICAgICAgICAgICAgY29uZmlnLm9uRmFpbCAmJiBjb25maWcub25GYWlsKHJlcylcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25maWcub25Db21wbGV0ZSAmJiBjb25maWcub25Db21wbGV0ZShyZXMpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICB9XG4gICAgICAgIEFqYXguZ2V0ZGF0YShjb25maWdEYXRhKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZXQoY29uZmlnOiBTZXJ2ZXJDb25maWcpIHtcbiAgICAgICAgLy9VSUZ1bmMub3BlblVJKEFjdGl2aXR5UGFubmVsTmFtZS5QYW5uZWxBZExvYWRpbmcpXG4gICAgICAgIGxldCBjb25maWdEYXRhOiBTZXJ2ZXJDb25maWcgPSB7XG4gICAgICAgICAgICB1cmw6IGNvbmZpZy51cmwsXG4gICAgICAgICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcjogY29uZmlnLmhlYWRlcixcbiAgICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIFhNU0RLLm9wZW5OZXRXb3JrQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oiQ5Yqf5Zue6LCDLS0tLS0tLS0tLS0tLS0tLS0tLS1nZXRcIik7XG4gICAgICAgICAgICAgICAgY29uZmlnLm9uU3VjY2VzcyAmJiBjb25maWcub25TdWNjZXNzKHJlcylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBYTVNESy5vcGVuTmV0V29ya0NvdW50KytcblxuICAgICAgICAgICAgICAgIGNvbmZpZy5vbkZhaWwgJiYgY29uZmlnLm9uRmFpbChyZXMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5vbkNvbXBsZXRlICYmIGNvbmZpZy5vbkNvbXBsZXRlKHJlcylcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgfVxuICAgICAgICBBamF4LnNlbmQoY29uZmlnRGF0YSk7XG4gICAgfVxufVxuIl19