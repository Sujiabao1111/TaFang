import IPlatform from "./Base/IPlatform";
import { LoadAdViewConfigType, ShowAdViewConfigType } from "./Type/AdViewConfig";
import AdConfigType from "./Type/AdConfigType";
import CommonSettingType from "./Type/CommonSettingType";
import LaunchSdkPageType from "./Type/LaunchSdkPageType";
import AndroidCocosBridge from "./Bridge/AndroidCocosBridge";
import { AppInfo } from "../Config/AppInfo";
import mock from "../mock1";

/**
 * 安卓原生
 */
export default class AndroidNativePlatform implements IPlatform {

    /**
     * 与SDK交互通信
     * @param funcName 方法名
     * @param params 参数
     * @param callback 回调
     */
    call(funcName: string, params?: any, callback?: Function) {
        return AndroidCocosBridge.call(funcName, params, callback);
    }

    getAdheadString(): string {
        return AndroidCocosBridge.call("createRequestHeaderStr");
    }

    getPheadString(): string {
        if (AppInfo.isLocal) {
            return mock.PHEAD;
        }
        return AndroidCocosBridge.call("getPhead");
    }
    toNewIdiomAnswer() {
        return AndroidCocosBridge.call("toNewIdiomAnswer")
    }
    openCalendarPermit() {
        AndroidCocosBridge.call("openCalendarPermit");
    }
    checkCalendarPermit() {
        return AndroidCocosBridge.call("checkCalendarPermit");
    }
    setCalendarPrompt(isStart: boolean) {
        AndroidCocosBridge.call("setCalendarPrompt", { isStart: isStart });
    }
    loadAdView(adConfig: LoadAdViewConfigType, callback?: Function) {
        AndroidCocosBridge.call("loadAdView", adConfig);
    }

    hideAdView(adConfig: AdConfigType) {
        AndroidCocosBridge.call("hideAdView", adConfig);
    }

    showAdView(adConfig: ShowAdViewConfigType) {
        AndroidCocosBridge.call("showAdView", adConfig);
    }

    loadAdSdk(adConfig: AdConfigType) {
        AndroidCocosBridge.call("loadAdSdk", adConfig);
    }

    showAd(adConfig: AdConfigType) {
        AndroidCocosBridge.call("showAd", adConfig);
    }

    enableUploadAdSdkStatistic(args: CommonSettingType) {
    }

    launchSceneSdkPage(launchParams: LaunchSdkPageType) {
        AndroidCocosBridge.call("launchSceneSdkPage", launchParams);
    }

    signRequestBody(args: string, callback: Function) {
        let signStr: string = AndroidCocosBridge.call("signRequestBody", { data: args });
        callback(signStr);
    }

    getNetworkState(callback: Function) {
        let state: string = AndroidCocosBridge.call("getNetworkState");
        callback(state);
    }

    recordLog(tag: string, content: string) {
        AndroidCocosBridge.call("recordLog", { tag: tag, content: content })
    }
    updateHealthValue(health: number) {
        AndroidCocosBridge.call("updateHealthValue", { "health": health })
    }
    isTestServer() {
        let call = AndroidCocosBridge.call("isTestServer");
        return call == "true";
    }

    isDebug() {
        let call = AndroidCocosBridge.call("isDebug");
        return call == "true";
    }

    getAppName() {
        let name =  AndroidCocosBridge.call("getAppName");
        return name;
    }

    enableOnResumeOnPause(args: { enable: boolean }) {
        console.log("启动后台监听2", args)
        AndroidCocosBridge.call('enableOnResumeOnPause', args, null);
    }
    retryToken() {
        AndroidCocosBridge.call("retryToken")
    }

    authWechat() {
        AndroidCocosBridge.call("authWechat");
    }
    requestAlipayAuth() {
        AndroidCocosBridge.call("requestAlipayAuth");
    }
    /**
     * 打开新人红包
     */
    OpenNewBirdRed(callback?: Function) {
        AndroidCocosBridge.call('OpenNewBirdRed', {}, callback);
    }

    /**
     * 消除时打开游戏内红包
     * @param type ("1 全屏广告3秒关闭 2 激励视频 看完可关闭 3 不看广告")
     * @param adid 全屏广告或激励视频的广告id
     */
    OpenGameRed(type: number, adid: number, callback?: Function) {
        var obj = {
            'type': type,
            'adid': adid,
        }
        AndroidCocosBridge.call('OpenGameRed', obj, callback);
    }

    /**
     * 打开余额弹窗
     * @param callback 
     */
    OpenBalanceDialog(callback?: Function) {
        AndroidCocosBridge.call('OpenBalanceDialog', {}, callback);
    }

    /**
     * 获取用户余额
     * @param callback 
     */
    ReqBalance(callback: Function) {
        AndroidCocosBridge.call('ReqBalance', {}, callback);
    }

    /**
     * 获取用户信息
     */
    ReqUserInfo(callback: Function) {
        AndroidCocosBridge.call('ReqUserInfo', {}, callback);
    }

    /** 
     * 展示通用弹窗
     */
    OpenGeneralDialog(coin: number, multiple: number, callback?: Function) {
        var obj: any = {
            'coin': coin,
            'multiple': multiple,
        };

        if (coin >= 200) {
            obj.exchangeMoney = coin / 10000.0;
        }

        AndroidCocosBridge.call('OpenGeneralDialog', obj, callback);
    }

    /**
     * 震动
     * @param time 时长
     */
    setVibrator(time: number, callback?: Function) {
        var obj = {
            'time': time,
        }
        AndroidCocosBridge.call('setVibrator', obj, callback);
    }

    /**
     * 提交埋点
     * @param obj 神策参数
     * @param callback 回调
     */
    track(obj: any, callback?: Function) {
        AndroidCocosBridge.call('track', obj, callback);
    }
    /**
     * 提交预置属性
     * @param obj 神策参数
     * @param callback 回调
     */
    trackUserProperties(obj: any, callback?: Function) {
        AndroidCocosBridge.call('trackUserProperties', obj, callback);
    }

    /**
     * 消除启动黑屏
     */
    finishCocosLaunch() {
        AndroidCocosBridge.call('finishCocosLaunch');
    }

    /**
     * 更新当前无尽等级
     * @param current_level 等级
     * @param callback 回调
     */
    updateCurrentLevel(current_level: number, callback?: Function) {
        var obj = {
            'current_level': current_level
        }
        AndroidCocosBridge.call('updateCurrentLevel', obj, callback);
    }

    /**
     * 更新当前闯关等级
     * @param current_pass_level 过关等级
     * @param callback 回调
     */
    updateCurrentPassLevel(current_pass_level: number, callback?: Function) {
        var obj = {
            'current_pass_level': current_pass_level
        }
        AndroidCocosBridge.call('updateCurrentPassLevel', obj, callback);
    }
    /**
     * 获取刘海高度
     */
    getLiuHaiHeight() {
        return AndroidCocosBridge.call("getLiuHaiHeight");
    }
    /**
     * 退出游戏
     */
    exitGame() {
        AndroidCocosBridge.call("exitGame");
    }
    /**
     * 
     * 启用后退键监控
     */
    enableOnBackpressed(enable: boolean) {
        AndroidCocosBridge.call('enableOnBackpressed', { 'enable': enable }, null);
    }
    /**
     * 获取网络状态
     */
    isNetworkConnected() {
        return AndroidCocosBridge.call('isNetworkConnected');
    }
    /**
     * 红包信息
     */
    notifyConfig(obj) {
        AndroidCocosBridge.call('notifyConfig', obj, null);

    }
    /**
     * 反馈界面
     */
    showCustomerService() {
        AndroidCocosBridge.call("showCustomerService");
    }

    /**
     * 注销界面
     */
    cancelAccount() {
        AndroidCocosBridge.call("cancelAccount");
    }

    /**
    * 下载apk的方法
    */
    downloadNewVersionApk() {
        AndroidCocosBridge.call("downloadNewVersionApk");
    }
    /**
     * 用户是否使用了更新有奖去更新apk
     */
    hasNewVersionReward() {
        return AndroidCocosBridge.call("hasNewVersionReward");
    }

    /**
    * 重置更新有奖打点，下次不再调用
    */
    resetNewVersionReward() {
        AndroidCocosBridge.call("resetNewVersionReward");
    }

    /**
     * 获取非强制更新版本
     */
    getNewVersionName() {
        return AndroidCocosBridge.call("getNewVersionName");
    }

    /**
     * 判断通知栏权限是否开启
     */
    isNotificationEnabled() {
        return AndroidCocosBridge.call("isNotificationEnabled");
    }

    /**
    * 跳转到通知设置界面
    */
    startNotificationSetting() {
        AndroidCocosBridge.call("startNotificationSetting");
    }

}