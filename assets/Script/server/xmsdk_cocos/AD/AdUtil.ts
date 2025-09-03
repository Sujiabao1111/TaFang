import { AdPosition } from '../../../common/AdPosition';
import NameTs from '../../../common/NameTs';
import { UrlConst } from '../../UrlConst';
import PlatformFactory from '../Adapter/PlatformFactory';
import { FeedAdStatus, VideoAdStatus } from '../Adapter/Type/AdStatus';
import PxTransUtils from '../Utils/PxTransUtils';
import XMSDK from '../XMSDK';
import { AdviewUtil } from './AdviewUtil';

/**
 * 激励视频广告工具库
 */
export namespace AdUtil {
    export let hasInit: Boolean = false;

    export let adLoad: object = {};              //存放load过的广告的组

    export let adReady: object = {};             //广告是否准备好的组

    export let adLoading: object = {};           // 广告是否在加载中

    export let adloadPre: object = {};           //是否为预加载

    export let adListener: object = {};          //存放广告监听回调的组

    export let currentPosition: number = 0;      //当前播放的广告位

    export let inserAdIsPlay:object = {};       //提前检查插屏广告是否播放

    export let takeOverAd: object = {};
    export let isPreAd: object = {};

    export interface RES {
        position: any,
        currentPosition: number,
        status: number,
    };
    export const AD_CODE = {
        LOAD_SUCCESS: 1,//加载成功
        LOAD_FAIL: 2,//加载失败
        CLICK_AD: 3,//点击成功
        SHOW_SUCCESS: 4,//显示成功
        SHOW_FAIL: 5,//显示失败
        CLOSE_AD: 6,//关闭
        REWARD_SUCCESS: 9,//奖励成功
    }
    export function init() {
        if (AdUtil.hasInit) {
            return;
        }
        PlatformFactory.Ins.enableUploadAdSdkStatistic({ enable: true });
        window["sdkAdListener"] = (res: AdUtil.RES) => {
            if (AdUtil.takeOverAd[res.position]) {
                typeof AdUtil.adListener[res.position] == 'function' && AdUtil.adListener[res.position](res);
                return;
            }
            res.position = +res.position;
            res.currentPosition = +res.position;

            console.log("广告状态", res.status);

            //广告加载成功了--1, 加载失败了--2, 广告点击了--3, 广告展示--4, 展示失败--5, 广告关闭了--6, 可以获取奖励了--9
            switch (res.status) {
                case 1:
                    AdUtil.adReady[res.position] = true;
                    AdUtil.adLoading[res.position] = false;
                    console.log("加载广告成功" + res.position)
                    if (!AdUtil.adloadPre[res.position]) {
                        AdUtil.showAd(+res.position);
                    } else {
                        if (AdUtil.isPreAd[res.position]) {
                            AdUtil.showAd(+res.position);
                        }
                        AdUtil.isPreAd[res.position] = false
                    }

                    break;
                case 2:
                    console.log("加载广告失败" + res.position)
                    AdUtil.adReady[res.position] = false;
                    AdUtil.adLoading[res.position] = false;                    
                    if (AdPosition && AdPosition.AppExposure[res.position]) {
                        //统计广告展示失败
                        let AppExposurePostion = AdPosition.AppExposure[res.position];
                        // XMSDK.track({
                        //     eventName: SAConst.AppSceneAdResult,
                        //     props: {
                        //         cs_app_ad_type: AppExposurePostion,
                        //         app_adstatus: 0
                        //     }
                        // });
                    }                    
                    break;
                case 6:
                    AdUtil.adLoading[res.position] = false;
                    // 解决插屏广告关闭之后调起虚拟按键
                    // CMbridge.cocosFinishAdClose();
                    break;
                case 5:
                case 4:
                    if (AdPosition && AdPosition.AppExposure[res.position]) {
                        let AppExposurePostion = AdPosition.AppExposure[res.position];
                        // XMSDK.track({
                        //     eventName: SAConst.AppSceneAdResult,
                        //     props: {
                        //         cs_app_ad_type: AppExposurePostion,
                        //         app_adstatus: 1
                        //     }
                        // });

                    }
                case 3:
                    if (AdPosition && AdPosition.AppExposure[res.position]) {
                        //统计广告点击
                        // XMSDK.track({
                        //     eventName: SAConst.AppExposureClick,
                        //     props: {
                        //         app_exposure_address: AdPosition["AppExposure"][res.position]
                        //     }
                        // });
                    }

                case 9:

                    AdUtil.adLoading[res.position] = false;
                    break;
                default:

                    break;
            }
            cc.game.emit(NameTs.Close_AdLoading);

            let tempRes = JSON.stringify(res);
            // let parseRes = JSON.parse(tempRes);
            // AdUtil.adListener[parseRes.position] && AdUtil.adListener[parseRes.position](parseRes);
            setTimeout(() => {
                let parseRes = JSON.parse(tempRes);
                typeof AdUtil.adListener[parseRes.position] == 'function' && AdUtil.adListener[parseRes.position](parseRes);
            }, 200);
        }

        if (cc.sys.isNative) {                        
            window["SystemInterface"].sdkAdListener = (res) => {                        
                window["sdkAdListener"](JSON.parse(res));
            }
        }


        AdUtil.hasInit = true;
    }

    /**
     * @msg: 加载激励视频
     * @param position 广告位
     * @param callback 广告监听回调
     * @param force 是否强制加载广告
     */
    export function loadAd(position: number, callback?: any, force = true, isTakeOver = false) {
        if (AdUtil.adLoading[position]) {
            return false;
        }
        // setTimeout(() => {
        console.log("开始加载广告" + position)
        if (position > 0 && (force || !AdUtil.adLoad[position])) {
            AdUtil.adLoading[position] = true;
            AdUtil.adLoad[position] = true;
            AdUtil.takeOverAd[position] = isTakeOver;
            callback && (AdUtil.adListener[position] = callback);
            if (AdUtil.adloadPre[position]) {
                if (AdUtil.adReady[position] == true) {//已准备
                    AdUtil.showAd(position);
                    delete AdUtil.adloadPre[position];
                    console.log("播放预加载广告成功" + position)
                } else if (AdUtil.adReady[position] == false) {
                    console.log("播放预加载广告失败转普通加载" + position)
                    delete AdUtil.adloadPre[position];
                    PlatformFactory.Ins.loadAdSdk({
                        position: position,
                        status: VideoAdStatus.LOAD_SUCCESS,
                    });
                } else {
                    AdUtil.isPreAd[position] = true;
                    console.log("预加载广告尚未加载", AdUtil.isPreAd[position])
                }
            } else {
                console.log("普通加载广告" + position)
                PlatformFactory.Ins.loadAdSdk({
                    position: position,
                    status: VideoAdStatus.LOAD_SUCCESS,
                });
            }

        }
        // }, 100);

    }

    /**
     * @msg: 显示广告
     * @param {number} position 广告位
     */
    export function showAd(position: number) {
        if (AdUtil.adReady[position]) {
            delete AdUtil.adReady[position];
            console.log("展示广告,准备状态重置" + position)
            AdUtil.currentPosition = position;
            let showAdTips = false//红包特殊处理
            console.log("播放广告时tip", showAdTips)
            PlatformFactory.Ins.showAd({
                position: position,
                status: FeedAdStatus.ON_SHOW,
                showAdTips: showAdTips,
                adTips: "观看完整视频领取奖励"
            });
        }
    }
    export function isViewFinished(res: AdUtil.RES, isClose: boolean = false) {
        // 获取到奖励的关闭
        let result = res.status == AD_CODE.REWARD_SUCCESS;
        if (result) {
            console.log("统计接口，上报后台广告观看完毕", res.status);
           
        }
        if (!window['advertising_num']) {
            window['advertising_num'] = 1;
        } else {
            window['advertising_num'] += 1;
        }
        XMSDK.trackUserProperties({
            advertising_num: window['advertising_num'] + '',
            advertis_num: window['advertising_num']
        })
        return result;
    }
    export function isViewError(res: AdUtil.RES) {
        return res.status == AD_CODE.LOAD_FAIL || res.status == AD_CODE.SHOW_FAIL
    }
    /**
     * 全屏广告加载完成，包括加载成功或失败。
     * @param res 
     */
    export function finishFullVideo(res: AdUtil.RES) {
        return res.status == AD_CODE.LOAD_FAIL || res.status == AD_CODE.SHOW_FAIL || res.status == AD_CODE.CLOSE_AD
    }
    /**
     * 预加载视频广告
     */
    export function loadAdVideo(position: number) {
        console.log("预加载广告" + position)
        AdUtil.isPreAd[position] = false;
        AdUtil.adloadPre[position] = true;
        PlatformFactory.Ins.loadAdSdk({
            position: position,
            status: VideoAdStatus.LOAD_SUCCESS
        });
    }
    
}