/**
 * @description 广告sdk
 */

// 初始化
import { AppInfo, setUpTesting } from './Config/AppInfo';
import PlatformFactory from "./Adapter/PlatformFactory";
import { AdUtil } from './AD/AdUtil';
import { AdviewUtil } from './AD/AdviewUtil';
import LaunchSdkPageType from './Adapter/Type/LaunchSdkPageType';
import { XMLoad } from './Utils/XMLoad';
import { ServerConfig } from '../UrlConst';
import NameTs from '../../common/NameTs';
import pageTs from '../../common/pageTs';
import Ajax from '../ServerMgr/Ajax';
import { AssistCtr } from '../../Assist/AssistCtr';

export default class XMSDK {

    // 初始化SDK
    static initialize() {
        console.log('=======  开始初始化商业化SDK  =======');
        // 获取adHead  如果 调用交互接口获取AdHead报错，直接调用连接上的adhead

        setUpTesting(PlatformFactory.Ins.isTestServer());//获取测试or正式
        AppInfo.phead = JSON.parse(PlatformFactory.Ins.getPheadString());
        // AppInfo.phead = mock1.PHEAD;
		console.log("处理数据-----------------------")
        AppInfo.version = "v1.2.9"
        console.log('获取取phead');

        // 广告初始化 游戏中只需要初始化一次
        AdviewUtil.init();//初始化信息流
        AdUtil.init();//初始化激励视频/插屏广告
        console.log('=======  结束初始化商业化SDK  =======')
    }

    /**
     * 与SDK交互通信
     * @param funName 方法名
     * @param params 参数
     * @param callback 回调
     */
    static call(funcName: string, params?: any, callback?: Function): any {
        return PlatformFactory.Ins.call(funcName, params, callback);
    }

    /**
     * 获取AdHead
     */
    static getAdHead() {
        return PlatformFactory.Ins.getAdheadString();
    }

    /**
     * 获取当前服务器Host
     */
    static getSeverHost() {
        return AppInfo.appHost;
    }

    /**
     * 是否为debug模式
     */
    static isDebug() {
        return PlatformFactory.Ins.isDebug();
    }

    /**
     * 是否为测试服
     */
    static isTestServer() {
        return PlatformFactory.Ins.isTestServer();
    }
    /**
         * 获取app名字
         */
    static getAppName(){
        return PlatformFactory.Ins.getAppName&&PlatformFactory.Ins.getAppName();
    }


    /**
     * 设置震动
     * @param time 时长，单位毫秒
     * @param callback 回调
     */
    static setVibrator(time: number, callback?: Function) {
        PlatformFactory.Ins.setVibrator(time, callback);
    }

    /**
     * 通用跳转 跳转网页等
     * @param param 参数
     */
    static launchSceneSdkPage(param: LaunchSdkPageType) {
        PlatformFactory.Ins.launchSceneSdkPage(param);
    }

    /**
     * 显示一个toast
     * @param text 文本
     * @param duration 延迟关闭，默认1.5s
     * @param pos toast位置，0顶部，1中间，2底部，默认底部
     */
    static toast(text: string, duration?: number, pos?: number, state?: number) {
        AssistCtr.showToastTip(text);
        // XMToast.showText(text);
        //XMToast.ShowText(text, duration, pos);
    }

    /**
     * @msg: 显示loading
     * @param text load文案，可不传
     */
    static showLoading(text?: string,) {
        XMLoad.ShowLoading(text);
    }

    /**
     * @msg: 隐藏loading
     */
    static hideLoading() {
        XMLoad.HideLoading();
    }

    /**
     * 提交埋点
     * @param obj 神策参数
     * @param callback 回调
     */
    static track(obj: { eventName: string, props: any }, callback?: Function) {
        PlatformFactory.Ins.track(obj, callback);
    }

    /**
    * 提交神策预置属性
    * @param obj 神策参数
    * @param callback 回调
    */
    static trackUserProperties(obj: any, callback?: Function) {
        PlatformFactory.Ins.trackUserProperties(obj, callback);
    }


    /**
     * 消除启动黑屏
     */
    static finishCocosLaunch() {
        PlatformFactory.Ins.finishCocosLaunch();
    }

    /**
     * 获取刘海高度
     */
    static getLiuHaiHeight() {
        return PlatformFactory.Ins.getLiuHaiHeight();
    }
    /**
     * 获取导航栏高度
     */
    static getNavigationBarHeight() {
        return PlatformFactory.Ins.getNavigationBarHeight();
    }
    /**
     * 获取网页host
     */
    static getHost() {
        return AppInfo.host;
    }
    /**
     * 退出APP
     */
    static exitGame() {
        PlatformFactory.Ins.exitGame();
    }
    /**
     * 启动/关闭 前后台监听
     */
    static enableOnResumeOnPause(enable: boolean) {
        console.log("启动后台监听1", enable)
        PlatformFactory.Ins.enableOnResumeOnPause({ enable: enable })
    }
    /**
     * 获取网络状态
     * @returns {boolean} false无网络
     */
    static isNetworkConnected() {
        return PlatformFactory.Ins.isNetworkConnected();
    }
    /**
     * 通知刷新客户端token
     */
    static retryToken() {
        PlatformFactory.Ins.retryToken();
    }
    /**
    * 微信授权
    */
    static authWechat() {
        PlatformFactory.Ins.authWechat();
    }
    /**
    * 支付宝授权
    */
    static requestAlipayAuth() {
        PlatformFactory.Ins.requestAlipayAuth();
    }

    /**
   * 反馈界面
   */
    static showCustomerService() {
        PlatformFactory.Ins.showCustomerService();
    }
    static showPrivacyPolicy() {
        PlatformFactory.Ins.showPrivacyPolicy();
    }
    static showUserProtocol() {
        PlatformFactory.Ins.showUserProtocol();
    }
    static cancelAccount(){
        PlatformFactory.Ins.cancelAccount();
    }

    /**
     * 打开链接
     */
    static openWebUrl(obj) {
        PlatformFactory.Ins.openWebUrl(obj);
    }
    /**
     * 获取原生的尺寸
     */
    static getScreenWidth() {
        return PlatformFactory.Ins.getScreenWidth()
    }
    static getScreenHeight() {
        return PlatformFactory.Ins.getScreenHeight()
    }
    /**
    * 获取非强制更新版本
    */
    static getNewVersionName() {
        return PlatformFactory.Ins.getNewVersionName();
    }

    /**
     * 添加游戏恢复监听
     * @param callback 回调
     */
    static onListenGameResume(callback: Function) {
        window["SystemInterface"].onListenGameResume = callback;
    }

    /**
     * 添加游戏停止监听
     * @param callback 回调
     */
    static onListenGameStop(callback: Function) {
        window["SystemInterface"].OnGameStop = callback;
    }

    static openNetWorkCount = 0;
    static post(config: ServerConfig) {        
        let configData: ServerConfig = {
            url: config.url,
            data: config.data,
            method: "POST",
            header: config.header,
            onSuccess: function (res) {
                XMSDK.openNetWorkCount = 0;
				console.log("成功回调--------------------post" );
                config.onSuccess && config.onSuccess(res)
            },
            onFail: function (res) {
                XMSDK.openNetWorkCount++

                config.onFail && config.onFail(res)
               
            },
            onComplete: function (res) {
                config.onComplete && config.onComplete(res);                
            },

        }
        Ajax.send(configData);
    }
	
	
	  static getdataStr(config: ServerConfig) {        
        let configData: ServerConfig = {
            url: config.url,
            data: config.data,
            method: "POST",
            header: config.header,
            onSuccess: function (res) {
                XMSDK.openNetWorkCount = 0;

                config.onSuccess && config.onSuccess(res)
            },
            onFail: function (res) {
                XMSDK.openNetWorkCount++

                config.onFail && config.onFail(res)
      
            },
            onComplete: function (res) {
                config.onComplete && config.onComplete(res);                
            },

        }
        Ajax.getdata(configData);
    }
	
	
    static get(config: ServerConfig) {
        //UIFunc.openUI(ActivityPannelName.PannelAdLoading)
        let configData: ServerConfig = {
            url: config.url,
            data: config.data,
            method: "GET",
            header: config.header,
            onSuccess: function (res) {
                XMSDK.openNetWorkCount = 0;
console.log("成功回调--------------------get" );
                config.onSuccess && config.onSuccess(res)
            },
            onFail: function (res) {
                XMSDK.openNetWorkCount++

                config.onFail && config.onFail(res)
            },
            onComplete: function (res) {
                config.onComplete && config.onComplete(res)                
            },

        }
        Ajax.send(configData);
    }
}
