"use strict";
cc._RF.push(module, 'd9311kiaj9EJJxi5jIwNTdK', 'AdUtil');
// Script/server/xmsdk_cocos/AD/AdUtil.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdUtil = void 0;
var AdPosition_1 = require("../../../common/AdPosition");
var NameTs_1 = require("../../../common/NameTs");
var PlatformFactory_1 = require("../Adapter/PlatformFactory");
var AdStatus_1 = require("../Adapter/Type/AdStatus");
var XMSDK_1 = require("../XMSDK");
/**
 * 激励视频广告工具库
 */
var AdUtil;
(function (AdUtil) {
    AdUtil.hasInit = false;
    AdUtil.adLoad = {}; //存放load过的广告的组
    AdUtil.adReady = {}; //广告是否准备好的组
    AdUtil.adLoading = {}; // 广告是否在加载中
    AdUtil.adloadPre = {}; //是否为预加载
    AdUtil.adListener = {}; //存放广告监听回调的组
    AdUtil.currentPosition = 0; //当前播放的广告位
    AdUtil.inserAdIsPlay = {}; //提前检查插屏广告是否播放
    AdUtil.takeOverAd = {};
    AdUtil.isPreAd = {};
    ;
    AdUtil.AD_CODE = {
        LOAD_SUCCESS: 1,
        LOAD_FAIL: 2,
        CLICK_AD: 3,
        SHOW_SUCCESS: 4,
        SHOW_FAIL: 5,
        CLOSE_AD: 6,
        REWARD_SUCCESS: 9,
    };
    function init() {
        if (AdUtil.hasInit) {
            return;
        }
        PlatformFactory_1.default.Ins.enableUploadAdSdkStatistic({ enable: true });
        window["sdkAdListener"] = function (res) {
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
                    console.log("加载广告成功" + res.position);
                    if (!AdUtil.adloadPre[res.position]) {
                        AdUtil.showAd(+res.position);
                    }
                    else {
                        if (AdUtil.isPreAd[res.position]) {
                            AdUtil.showAd(+res.position);
                        }
                        AdUtil.isPreAd[res.position] = false;
                    }
                    break;
                case 2:
                    console.log("加载广告失败" + res.position);
                    AdUtil.adReady[res.position] = false;
                    AdUtil.adLoading[res.position] = false;
                    if (AdPosition_1.AdPosition && AdPosition_1.AdPosition.AppExposure[res.position]) {
                        //统计广告展示失败
                        var AppExposurePostion = AdPosition_1.AdPosition.AppExposure[res.position];
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
                    if (AdPosition_1.AdPosition && AdPosition_1.AdPosition.AppExposure[res.position]) {
                        var AppExposurePostion = AdPosition_1.AdPosition.AppExposure[res.position];
                        // XMSDK.track({
                        //     eventName: SAConst.AppSceneAdResult,
                        //     props: {
                        //         cs_app_ad_type: AppExposurePostion,
                        //         app_adstatus: 1
                        //     }
                        // });
                    }
                case 3:
                    if (AdPosition_1.AdPosition && AdPosition_1.AdPosition.AppExposure[res.position]) {
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
            cc.game.emit(NameTs_1.default.Close_AdLoading);
            var tempRes = JSON.stringify(res);
            // let parseRes = JSON.parse(tempRes);
            // AdUtil.adListener[parseRes.position] && AdUtil.adListener[parseRes.position](parseRes);
            setTimeout(function () {
                var parseRes = JSON.parse(tempRes);
                typeof AdUtil.adListener[parseRes.position] == 'function' && AdUtil.adListener[parseRes.position](parseRes);
            }, 200);
        };
        if (cc.sys.isNative) {
            window["SystemInterface"].sdkAdListener = function (res) {
                window["sdkAdListener"](JSON.parse(res));
            };
        }
        AdUtil.hasInit = true;
    }
    AdUtil.init = init;
    /**
     * @msg: 加载激励视频
     * @param position 广告位
     * @param callback 广告监听回调
     * @param force 是否强制加载广告
     */
    function loadAd(position, callback, force, isTakeOver) {
        if (force === void 0) { force = true; }
        if (isTakeOver === void 0) { isTakeOver = false; }
        if (AdUtil.adLoading[position]) {
            return false;
        }
        // setTimeout(() => {
        console.log("开始加载广告" + position);
        if (position > 0 && (force || !AdUtil.adLoad[position])) {
            AdUtil.adLoading[position] = true;
            AdUtil.adLoad[position] = true;
            AdUtil.takeOverAd[position] = isTakeOver;
            callback && (AdUtil.adListener[position] = callback);
            if (AdUtil.adloadPre[position]) {
                if (AdUtil.adReady[position] == true) { //已准备
                    AdUtil.showAd(position);
                    delete AdUtil.adloadPre[position];
                    console.log("播放预加载广告成功" + position);
                }
                else if (AdUtil.adReady[position] == false) {
                    console.log("播放预加载广告失败转普通加载" + position);
                    delete AdUtil.adloadPre[position];
                    PlatformFactory_1.default.Ins.loadAdSdk({
                        position: position,
                        status: AdStatus_1.VideoAdStatus.LOAD_SUCCESS,
                    });
                }
                else {
                    AdUtil.isPreAd[position] = true;
                    console.log("预加载广告尚未加载", AdUtil.isPreAd[position]);
                }
            }
            else {
                console.log("普通加载广告" + position);
                PlatformFactory_1.default.Ins.loadAdSdk({
                    position: position,
                    status: AdStatus_1.VideoAdStatus.LOAD_SUCCESS,
                });
            }
        }
        // }, 100);
    }
    AdUtil.loadAd = loadAd;
    /**
     * @msg: 显示广告
     * @param {number} position 广告位
     */
    function showAd(position) {
        if (AdUtil.adReady[position]) {
            delete AdUtil.adReady[position];
            console.log("展示广告,准备状态重置" + position);
            AdUtil.currentPosition = position;
            var showAdTips = false; //红包特殊处理
            console.log("播放广告时tip", showAdTips);
            PlatformFactory_1.default.Ins.showAd({
                position: position,
                status: AdStatus_1.FeedAdStatus.ON_SHOW,
                showAdTips: showAdTips,
                adTips: "观看完整视频领取奖励"
            });
        }
    }
    AdUtil.showAd = showAd;
    function isViewFinished(res, isClose) {
        if (isClose === void 0) { isClose = false; }
        // 获取到奖励的关闭
        var result = res.status == AdUtil.AD_CODE.REWARD_SUCCESS;
        if (result) {
            console.log("统计接口，上报后台广告观看完毕", res.status);
        }
        if (!window['advertising_num']) {
            window['advertising_num'] = 1;
        }
        else {
            window['advertising_num'] += 1;
        }
        XMSDK_1.default.trackUserProperties({
            advertising_num: window['advertising_num'] + '',
            advertis_num: window['advertising_num']
        });
        return result;
    }
    AdUtil.isViewFinished = isViewFinished;
    function isViewError(res) {
        return res.status == AdUtil.AD_CODE.LOAD_FAIL || res.status == AdUtil.AD_CODE.SHOW_FAIL;
    }
    AdUtil.isViewError = isViewError;
    /**
     * 全屏广告加载完成，包括加载成功或失败。
     * @param res
     */
    function finishFullVideo(res) {
        return res.status == AdUtil.AD_CODE.LOAD_FAIL || res.status == AdUtil.AD_CODE.SHOW_FAIL || res.status == AdUtil.AD_CODE.CLOSE_AD;
    }
    AdUtil.finishFullVideo = finishFullVideo;
    /**
     * 预加载视频广告
     */
    function loadAdVideo(position) {
        console.log("预加载广告" + position);
        AdUtil.isPreAd[position] = false;
        AdUtil.adloadPre[position] = true;
        PlatformFactory_1.default.Ins.loadAdSdk({
            position: position,
            status: AdStatus_1.VideoAdStatus.LOAD_SUCCESS
        });
    }
    AdUtil.loadAdVideo = loadAdVideo;
})(AdUtil = exports.AdUtil || (exports.AdUtil = {}));

cc._RF.pop();