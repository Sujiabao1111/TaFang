import IPlatform from "./Base/IPlatform";
import * as JsBridge from './Bridge/JsBridge';
import CommonSettingType from "./Type/CommonSettingType";
import LaunchSdkPageType from "./Type/LaunchSdkPageType";
import AdConfigType from "./Type/AdConfigType";
import {LoadAdViewConfigType, ShowAdViewConfigType} from "./Type/AdViewConfig";
import { AppInfo } from "../Config/AppInfo";
import mock from "../mock1";

/**
 * 应用内的浏览器
 */
export default class InnerWebPlatform implements IPlatform {

    /**
     * 与SDK交互通信
     * @param funcName 方法名
     * @param params 参数
     * @param callback 回调
     */
    call(funcName: string, params?: any, callback?: Function) {
        return JsBridge.call('call', {'methodName':funcName, 'args': params}, callback);
    }

    // 调用方法
    static jsCall(methodName, args?, cb?):any{
        return JsBridge.call('call', {'methodName':methodName, 'args': args}, cb);
    }

    static getQueryString(name): string {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    getAdheadString(): string {
        let adHead = InnerWebPlatform.jsCall('createRequestHeaderStr', {});
        if (!adHead || adHead == "") {
            let adHead = InnerWebPlatform.getQueryString("adhead");
            if (adHead) {
                console.warn("链接上带adhead参数");
            } else {
                console.warn("交互方法拿不到adhead --- 链接上没有带adhead参数");
            }
        }
        return adHead;
    }

    getPheadString(): string {
        if(AppInfo.isLocal){
            return mock.PHEAD;
        }
        return InnerWebPlatform.jsCall("getPheadString", {});
    }

    enableOnResumeOnPause(args: CommonSettingType) {
        InnerWebPlatform.jsCall('enableOnResumeOnPause', args);
    }

    hideAdView(adConfig: AdConfigType) {
        InnerWebPlatform.jsCall('hideAdView', adConfig);
    }

    loadAdView(adConfig: LoadAdViewConfigType, callback?: Function) {
        InnerWebPlatform.jsCall('loadAdView', adConfig);
    }

    showAdView(adConfig: ShowAdViewConfigType) {
        InnerWebPlatform.jsCall('showAdView', adConfig);
    }

    loadAdSdk(adConfig: AdConfigType) {
        InnerWebPlatform.jsCall('loadAdSdk', adConfig, () => {});
    }

    showAd(adConfig: AdConfigType) {
        InnerWebPlatform.jsCall('showAd', adConfig);
    }

    enableUploadAdSdkStatistic(args: CommonSettingType) {
        InnerWebPlatform.jsCall('enableUploadAdSdkStatistic', args);
    }

    launchSceneSdkPage(args: LaunchSdkPageType) {
        InnerWebPlatform.jsCall('launchSceneSdkPage', args);
    }

    signRequestBody(args: string, callback: Function) {
        // cc.log("args : " + args)
        InnerWebPlatform.jsCall("signRequestBody", {data : args}, (result)=>{
            callback(JSON.parse(result).data);
        });
    }

    getNetworkState(callback: Function) {
        InnerWebPlatform.jsCall("getNetworkState", {}, (state)=>{
            callback(state);
        });
    }

    //todo 要改
    isDebug(): boolean {
        return true;
    }

    //todo 要改
    isTestServer(): boolean {
        return false;
    }

    recordLog(tag: string, content: string) {
    }

    /**
     * 打开新人红包
     */
    OpenNewBirdRed(callback?: Function){
        InnerWebPlatform.jsCall('OpenNewBirdRed');
    }

    /**
     * 消除时打开游戏内红包
     * @param type ("1 全屏广告3秒关闭 2 激励视频 看完可关闭 3 不看广告")
     * @param adid 全屏广告或激励视频的广告id
     */
    OpenGameRed(type: number, adid: number, callback?: Function){
        var obj = {
            'type': type,
            'adid': adid,
        }
        InnerWebPlatform.jsCall('OpenGameRed', obj);
    }

    /**
     * 打开余额弹窗
     * @param callback 
     */
    OpenBalanceDialog(callback: Function){
        InnerWebPlatform.jsCall('OpenBalanceDialog', {}, callback);
    }

    /**
     * 获取用户余额
     * @param callback
     */
    ReqBalance(callback: Function){
        InnerWebPlatform.jsCall('ReqBalance', {}, callback);
    }

    /**
     * 获取用户信息
     */
    ReqUserInfo(callback: Function){
        InnerWebPlatform.jsCall('ReqUserInfo', {}, callback);
    }

    /** 
     * 展示通用弹窗
     */
    OpenGeneralDialog(coin: number, multiple: number, callback?: Function){
        var obj: any = {
            'coin': coin,
            'multiple': multiple,
        };

        if (coin >= 200){
             obj.exchangeMoney = coin / 10000.0;
        }
        
        InnerWebPlatform.jsCall('ReqUserInfo', obj, callback);
    }

    /**
     * 震动
     * @param time 时长
     */
    setVibrator(time: number, callback?: Function){
        var obj = {
            'time': time,
        }
        InnerWebPlatform.jsCall('setVibrator', obj, callback);
    }

    /**
     * 提交埋点
     * @param obj 神策参数
     * @param callback 回调
     */
    track(obj:any, callback?: Function){
        InnerWebPlatform.jsCall('track', obj, callback);
    }
    /**
     * 提交预置属性
     * @param obj 神策参数
     * @param callback 回调
     */
    trackUserProperties(obj:any, callback?: Function){
        InnerWebPlatform.jsCall('trackUserProperties', obj, callback);
    }

    /**
     * 消除启动黑屏
     */
    finishCocosLaunch(){
        InnerWebPlatform.jsCall('finishCocosLaunch');
    }

    /**
     * 更新当前无尽等级
     * @param current_level 等级
     * @param callback 回调
     */
    updateCurrentLevel(current_level: number, callback?: Function){
        var obj = {
            'current_level': current_level
        }
        InnerWebPlatform.jsCall('updateCurrentLevel', obj, callback);
    }

    /**
     * 更新当前闯关等级
     * @param current_pass_level 过关等级
     * @param callback 回调
     */
    updateCurrentPassLevel(current_pass_level:number, callback?: Function){
        var obj = {
            'current_pass_level': current_pass_level
        }
        InnerWebPlatform.jsCall('updateCurrentPassLevel', obj, callback);
    }
    /*
     * 获取刘海高度
     */
    getLiuHaiHeight(): string {
        return InnerWebPlatform.jsCall("getLiuHaiHeight", {});
    }
    /**
     * 退出游戏
     */
    exitGame() {
        InnerWebPlatform.jsCall("exitGame", {});
    }
    /**
     * 设置是否监听虚拟键点击事件
     */
    enableOnBackpressed(enable: boolean) {
        var obj = {
            'enable': enable
        }
        InnerWebPlatform.jsCall('enableOnBackpressed', obj, null);
    }
    /**
     * 获取网络状态
     * @returns {boolean} false无网络
     */
    isNetworkConnected(){
        return InnerWebPlatform.jsCall("isNetworkConnected", {});
    }
    notifyConfig(){}
}