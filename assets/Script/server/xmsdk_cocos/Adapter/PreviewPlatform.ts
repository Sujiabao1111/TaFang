import IPlatform from "./Base/IPlatform";
import { RSA } from './rsa'
import CommonSettingType from "./Type/CommonSettingType";
import AdConfigType from "./Type/AdConfigType";
import LaunchSdkPageType from "./Type/LaunchSdkPageType";
import { LoadAdViewConfigType, ShowAdViewConfigType } from "./Type/AdViewConfig";
import { VideoAdStatus } from "./Type/AdStatus";
import { AppInfo } from "../Config/AppInfo";
import mock from "../mock1";
import PxTransUtils from "../Utils/PxTransUtils";

/**
 * 写死的一个假的adHeader
 */
const ADHEADER: object = { "prdId": "18800", "deviceId": "1234567890", "version": "1.9.1", "sysVersion": "9", "phoneType": "OnePlus", "activityChannel": "1", "currentChannel": "1", "startFrom": "index", "appVersion": "v1.0.0", "appVersionCode": "23", "versionCode": "91", "platform": "android", "service": "xkX2Ab1P3KuI214V", "signature": "52dde4320c06f616da2ad9558e506ad2", "timestamp": 1584628717084 };
let PHEAD: any = null;
if (AppInfo.isLocal) {
    PHEAD = mock.PHEAD;
}
/**
 * cocos直接点击那个预览按钮，在浏览器打开
 */
export default class PreviewPlatform implements IPlatform {
    getNavigationBarHeight(): string {
        return ""
    }
    getScreenWidth(): string {
        return ""
    }
    getScreenHeight(): string {
        return ""
    }
    showPrivacyPolicy() {

    }
    showUserProtocol() {

    }
    openWebUrl() {

    }
    authWechat() {

    }
    requestAlipayAuth() {

    }

    /**
     * 与SDK交互通信
     * @param funcName 方法名
     * @param params 参数
     * @param callback 回调
     */
    call(funcName: string, params?: any, callback?: Function) {
        console.log('模拟调用' + funcName);
    }

    getAdheadString(): string {
        return JSON.stringify(ADHEADER);
    }

    getPheadString(): string {
        return JSON.stringify(PHEAD);
    }
    toNewIdiomAnswer() { }
    openCalendarPermit() {
        console.error("调用客户端方法，打开日历权限弹窗")
    }
    checkCalendarPermit() {
        console.error("调用客户端方法，获取日历权限状态")
    }
    setCalendarPrompt(fuc) {
        console.error("调用客户端方法，开启或关闭日历" + fuc)
    }
    toScratchCard() { }
    enableOnResumeOnPause(args: CommonSettingType) {
    }

    enableUploadAdSdkStatistic(args: CommonSettingType) {
    }

    hideAdView(adConfig: AdConfigType) {
    }

    launchSceneSdkPage(launchParams: LaunchSdkPageType) {
        cc.log('模拟了通用跳转');
    }

    loadAdSdk(adConfig: AdConfigType) {
        adConfig.status = VideoAdStatus.LOAD_SUCCESS;
        window["sdkAdListener"] && window["sdkAdListener"](adConfig);
    }

    loadAdView(adConfig: LoadAdViewConfigType, callback?: Function) {
    }

    showAd(adConfig: AdConfigType) {
        adConfig.status = VideoAdStatus.ON_SHOW;
        window["sdkAdListener"] && window["sdkAdListener"](adConfig);

        setTimeout(() => {
            adConfig.status = VideoAdStatus.ON_CLOSE;
            window["sdkAdListener"] && window["sdkAdListener"](adConfig);

            adConfig.status = VideoAdStatus.ON_REWARD_FINISH;
            window["sdkAdListener"] && window["sdkAdListener"](adConfig);
        }, 1000)
    }

    showAdView(adConfig: ShowAdViewConfigType) {
    }

    signRequestBody(args: string, callback: Function) {
        //之前ssl生成的公钥，复制的时候要小心不要有空格
        var pubKey = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxx8PSMcw9ENErZG8quNJ3NaUgBzCuMZZFDTSCdQ9Z/C6ts0v4SGqAgzyF1BFdvEhiIikUMdkcVlhWO+Hvm6Kp+CC91R1S8oQ8GKX5EhbbN2z+NQE+gUc4r0OwAgm0cPLS65kH15rVUszZTnsBn48j+JrbkPCJHozdQuASQwLBhKAOch/gFdA0agMESo75a4tnvqn8u4INfeT2HQhVF5EEkqUGi1TOBHTpuqRZrNojkv0mUMrghuOJ9IniAb2LR8TpL7lHNHex8s0Mms4EZEHYnpuINqvZIqXfCOWeP+u5SuUIxPGXpCAA+OSrCju6Pi8Ng43xvxzH5uS5TeihkuVjQIDAQAB-----END PUBLIC KEY-----';
        let pub = RSA.KEYUTIL.getKey(pubKey);
        let enc = RSA.KJUR.crypto.Cipher.encryptLong2(args, pub);
        callback(enc);
    }

    getNetworkState(callback: Function) {
        callback("WIFI");
    }

    isDebug(): boolean {
        return true;
    }

    //todo 要改
    isTestServer(): boolean {
        return true;
    }
    updateHealthValue() {

    }
    retryToken() {

    }

    recordLog(tag: string, content: string) {
    }

    /**
     * 打开新人红包
     */
    OpenNewBirdRed(callback?: Function) {
        cc.log('模拟打开新人红包');
        if (callback) {
            callback();
        }
    }

    /**
     * 消除时打开游戏内红包
     * @param type ("1 全屏广告3秒关闭 2 激励视频 看完可关闭 3 不看广告")
     * @param adid 全屏广告或激励视频的广告id
     */
    OpenGameRed(type: number, adid: number, callback?: Function) {
        cc.log('模拟打开游戏内红包');
        if (callback) {
            callback();
        }
    }

    /**
     * 打开余额弹窗
     * @param callback 
     */
    OpenBalanceDialog(callback?: Function) {
        cc.log('模拟打开余额弹窗');
        if (callback) {
            callback();
        }
    }

    /**
     * 获取用户余额
     * @param callback 
     */
    ReqBalance(callback: Function) {
        var obj = { "coin": 0, "coinRemain": 0, "earnAgain": "100", "remain": "0", "type": 1, "withdrawLimited": "100" };
        callback(obj);
    }

    /**
     * 获取用户信息
     */
    ReqUserInfo(callback: Function) {
        var obj = { "awarDtime": 0, "awardCoin": 0, "balance": 0.01, "coinRate": 10000, "doubleBusinessType": 0, "isNewUser": 0, "newUserCoin": 0, "userCoin": { "coin": 12546, "todayCoin": 37, "totalAdd": 12546 } };
        callback(obj);
    }

    /** 
     * 展示通用弹窗
     */
    OpenGeneralDialog(coin: number, multiple: number, callback?: Function) {
        //cc.log('模拟展示通用弹窗');
        if (callback) {
            callback();
        }
    }
    /**
     * 震动
     * @param time 时长
     */
    setVibrator(time: number, callback?: Function) {
        //cc.log('模拟已震动');
        if (callback) {
            callback();
        }
    }

    /**
    * 提交埋点
    * @param obj 神策参数
    * @param callback 回调
    */
    track(obj: any, callback?: Function) {
        //console.log('模拟统计上报');
        //console.log(obj);
        if (callback) {
            callback();
        }
    }
    /**
     * 提交预置属性
     * @param obj 神策参数
     * @param callback 回调
     */
    trackUserProperties(obj: any, callback?: Function) {
        //cc.log('模拟统计上报');
        //cc.log(obj);
        if (callback) {
            callback();
        }
    }
    /**
    * 消除启动黑屏
    */
    finishCocosLaunch() {
        cc.log('模拟消除启动黑屏');
    }

    /**
     * 更新当前无尽等级
     * @param current_level 等级
     * @param callback 回调
     */
    updateCurrentLevel(current_level: number, callback?: Function) {
        cc.log('模拟更新当前无尽等级');
        var obj = {
            'current_level': current_level
        }
        cc.log(obj);
        if (callback) {
            callback();
        }
    }

    /**
     * 更新当前闯关等级
     * @param current_pass_level 过关等级
     * @param callback 回调
     */
    updateCurrentPassLevel(current_pass_level: number, callback?: Function) {
        cc.log('模拟更新当前闯关等级');
        var obj = {
            'current_pass_level': current_pass_level
        }
        cc.log(obj);
        if (callback) {
            callback();
        }
    }
    /**
     * 获取刘海高度
     */
    getLiuHaiHeight() {
        cc.log('获取刘海高度');
        let result = 0;
        if (PxTransUtils.getScreenHeight() / PxTransUtils.getScreenWidth() > 1.78) {
            result = 50;
        }

        return String(result);
    }
    /**
     * 获取刘海高度
     */
    exitGame() {
        console.log('模拟退出游戏');
    }
    /**
     * 设置是否监听虚拟键点击事件
     */
    enableOnBackpressed(enable: boolean) {
        cc.log('模拟设置监听虚拟键-' + enable);
    }
    /**
     * 获取网络状态
     * @returns {boolean} false无网络
     */
    isNetworkConnected() {
        return navigator.onLine;
    }
    notifyConfig() { }

    showCustomerService() {

    }

    cancelAccount(){
        
    }

    downloadNewVersionApk() {

    }

    hasNewVersionReward() {

    }

    resetNewVersionReward() {

    }

    getNewVersionName() {

    }

    isNotificationEnabled() {

    }

    startNotificationSetting() {

    }
}