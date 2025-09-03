import CommonSettingType from "../Type/CommonSettingType";
import LaunchSdkPageType from "../Type/LaunchSdkPageType";
import {LoadAdViewConfigType, ShowAdViewConfigType} from "../Type/AdViewConfig";
import AdConfigType from "../Type/AdConfigType";

export default interface IPlatform {

    /**
     * 与SDK交互通信
     * @param funcName 方法名
     * @param params 参数
     * @param callback 回调
     */
    call(funcName: string, params?: any, callback?: Function) : any;

    /**
     * 获取 adHeader
     */
    getAdheadString(): string;

    /**
     * 获取 phead
     */
    getPheadString(): string;

    /**
     * 是不是要监听OnResume、OnPause
     * @param args
     */
    enableOnResumeOnPause(args: CommonSettingType);

    /**
     * 是不是要webview容器传递日志
     * @param args
     */
    enableUploadAdSdkStatistic(args: CommonSettingType);

    /**
     * 跳转sdk页面
     * @param launchParams
     */
    launchSceneSdkPage(launchParams: LaunchSdkPageType);

    /**
     * 加载信息流广告。
     * @param adConfig
     * @param callback
     */
    loadAdView(adConfig: LoadAdViewConfigType, callback ?: Function);

    /**
     * 展示信息流广告
     * @param adConfig
     */
    showAdView(adConfig: ShowAdViewConfigType);

    /**
     * 隐藏信息流广告
     * @param adConfig
     */
    hideAdView(adConfig: AdConfigType);

    /**
     * 加载插屏，视频广告
     * @param adConfig
     */
    loadAdSdk(adConfig: AdConfigType);

    /**
     * 展示插屏，视频广告
     * @param adConfig
     */
    showAd(adConfig: AdConfigType);

    /**
     * 加密请求体
     * @param args
     * @param callback
     */
    signRequestBody(args: string, callback: Function);

    /**
     * 获取网络状态
     * @param callback
     */
    getNetworkState(callback: Function);

    /**
     * 获取是否是Release包(决定是否去掉Log)
     * recordLog
     */
    recordLog(tag: string, content: string);

    /**
     * 是否是测试服
     */
    isTestServer(): boolean;

    /**
     * 是否是Debug模式
     */
    isDebug(): boolean;

    /**
     * 打开新人红包
     */
    OpenNewBirdRed(callback?: Function);

    /**
     * 游戏内红包
     * @param type ("1 全屏广告3秒关闭 2 激励视频 看完可关闭 3 不看广告")
     * @param adid 全屏广告或激励视频的广告id
     * @param callback 关闭红包
     */
    OpenGameRed(type: number, adid: number, callback?: Function);

    /**
     * 打开余额弹窗
     * @param callback 
     */
    OpenBalanceDialog(callback?: Function);

    /**
     * 获取用户余额
     * @param callback 
     */
    ReqBalance(callback: Function);

    /**
     * 获取用户信息
     */
    ReqUserInfo(callback: Function);

    /** 
     * 展示通用弹窗
     */
    OpenGeneralDialog(coin: number, multiple: number, callback?: Function);

    /**
     * 震动
     * @param time 时长
     */
    setVibrator(time: number, callback?: Function);

    /**
     * 提交埋点
     * @param obj 神策参数
     * @param callback 回调
     */
    track(obj:any, callback?: Function);
    /**
     * 提交预置属性
     * @param obj 神策参数
     * @param callback 回调
     */
    trackUserProperties(obj:any, callback?: Function);
    /**
     * 消除启动黑屏
     */
    finishCocosLaunch();

    /**
     * 更新当前无尽等级
     * @param current_level 等级
     * @param callback 回调
     */
    updateCurrentLevel(current_level: number, callback?: Function);

    /**
     * 更新当前闯关等级
     * @param current_pass_level 过关等级
     * @param callback 回调
     */
    updateCurrentPassLevel(current_pass_level:number, callback?: Function);
    /**
     * 获取app名字
     */
    getAppName();

}