
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBRFxcQWRVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUN4RCxpREFBNEM7QUFFNUMsOERBQXlEO0FBQ3pELHFEQUF1RTtBQUV2RSxrQ0FBNkI7QUFHN0I7O0dBRUc7QUFDSCxJQUFpQixNQUFNLENBcVB0QjtBQXJQRCxXQUFpQixNQUFNO0lBQ1IsY0FBTyxHQUFZLEtBQUssQ0FBQztJQUV6QixhQUFNLEdBQVcsRUFBRSxDQUFDLENBQWMsY0FBYztJQUVoRCxjQUFPLEdBQVcsRUFBRSxDQUFDLENBQWEsV0FBVztJQUU3QyxnQkFBUyxHQUFXLEVBQUUsQ0FBQyxDQUFXLFdBQVc7SUFFN0MsZ0JBQVMsR0FBVyxFQUFFLENBQUMsQ0FBVyxRQUFRO0lBRTFDLGlCQUFVLEdBQVcsRUFBRSxDQUFDLENBQVUsWUFBWTtJQUU5QyxzQkFBZSxHQUFXLENBQUMsQ0FBQyxDQUFNLFVBQVU7SUFFNUMsb0JBQWEsR0FBVSxFQUFFLENBQUMsQ0FBTyxjQUFjO0lBRS9DLGlCQUFVLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLGNBQU8sR0FBVyxFQUFFLENBQUM7SUFNL0IsQ0FBQztJQUNXLGNBQU8sR0FBRztRQUNuQixZQUFZLEVBQUUsQ0FBQztRQUNmLFNBQVMsRUFBRSxDQUFDO1FBQ1osUUFBUSxFQUFFLENBQUM7UUFDWCxZQUFZLEVBQUUsQ0FBQztRQUNmLFNBQVMsRUFBRSxDQUFDO1FBQ1osUUFBUSxFQUFFLENBQUM7UUFDWCxjQUFjLEVBQUUsQ0FBQztLQUNwQixDQUFBO0lBQ0QsU0FBZ0IsSUFBSTtRQUNoQixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsT0FBTztTQUNWO1FBQ0QseUJBQWUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMs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QUZlLGtCQUFXLGNBRTFCLENBQUE7SUFDRDs7O09BR0c7SUFDSCxTQUFnQixlQUFlLENBQUMsR0FBZTtRQUMzQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLElBQUksT0FBQSxPQUFPLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksT0FBQSxPQUFPLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQy9HLENBQUM7SUFGZSxzQkFBZSxrQkFFOUIsQ0FBQTtJQUNEOztPQUVHO0lBQ0gsU0FBZ0IsV0FBVyxDQUFDLFFBQWdCO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFBO1FBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLHlCQUFlLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUMxQixRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsd0JBQWEsQ0FBQyxZQUFZO1NBQ3JDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFSZSxrQkFBVyxjQVExQixDQUFBO0FBRUwsQ0FBQyxFQXJQZ0IsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBcVB0QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi9jb21tb24vQWRQb3NpdGlvbic7XG5pbXBvcnQgTmFtZVRzIGZyb20gJy4uLy4uLy4uL2NvbW1vbi9OYW1lVHMnO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tICcuLi8uLi9VcmxDb25zdCc7XG5pbXBvcnQgUGxhdGZvcm1GYWN0b3J5IGZyb20gJy4uL0FkYXB0ZXIvUGxhdGZvcm1GYWN0b3J5JztcbmltcG9ydCB7IEZlZWRBZFN0YXR1cywgVmlkZW9BZFN0YXR1cyB9IGZyb20gJy4uL0FkYXB0ZXIvVHlwZS9BZFN0YXR1cyc7XG5pbXBvcnQgUHhUcmFuc1V0aWxzIGZyb20gJy4uL1V0aWxzL1B4VHJhbnNVdGlscyc7XG5pbXBvcnQgWE1TREsgZnJvbSAnLi4vWE1TREsnO1xuaW1wb3J0IHsgQWR2aWV3VXRpbCB9IGZyb20gJy4vQWR2aWV3VXRpbCc7XG5cbi8qKlxuICog5r+A5Yqx6KeG6aKR5bm/5ZGK5bel5YW35bqTXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQWRVdGlsIHtcbiAgICBleHBvcnQgbGV0IGhhc0luaXQ6IEJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGV4cG9ydCBsZXQgYWRMb2FkOiBvYmplY3QgPSB7fTsgICAgICAgICAgICAgIC8v5a2Y5pS+bG9hZOi/h+eahOW5v+WRiueahOe7hFxuXG4gICAgZXhwb3J0IGxldCBhZFJlYWR5OiBvYmplY3QgPSB7fTsgICAgICAgICAgICAgLy/lub/lkYrmmK/lkKblh4blpIflpb3nmoTnu4RcblxuICAgIGV4cG9ydCBsZXQgYWRMb2FkaW5nOiBvYmplY3QgPSB7fTsgICAgICAgICAgIC8vIOW5v+WRiuaYr+WQpuWcqOWKoOi9veS4rVxuXG4gICAgZXhwb3J0IGxldCBhZGxvYWRQcmU6IG9iamVjdCA9IHt9OyAgICAgICAgICAgLy/mmK/lkKbkuLrpooTliqDovb1cblxuICAgIGV4cG9ydCBsZXQgYWRMaXN0ZW5lcjogb2JqZWN0ID0ge307ICAgICAgICAgIC8v5a2Y5pS+5bm/5ZGK55uR5ZCs5Zue6LCD55qE57uEXG5cbiAgICBleHBvcnQgbGV0IGN1cnJlbnRQb3NpdGlvbjogbnVtYmVyID0gMDsgICAgICAvL+W9k+WJjeaSreaUvueahOW5v+WRiuS9jVxuXG4gICAgZXhwb3J0IGxldCBpbnNlckFkSXNQbGF5Om9iamVjdCA9IHt9OyAgICAgICAvL+aPkOWJjeajgOafpeaPkuWxj+W5v+WRiuaYr+WQpuaSreaUvlxuXG4gICAgZXhwb3J0IGxldCB0YWtlT3ZlckFkOiBvYmplY3QgPSB7fTtcbiAgICBleHBvcnQgbGV0IGlzUHJlQWQ6IG9iamVjdCA9IHt9O1xuXG4gICAgZXhwb3J0IGludGVyZmFjZSBSRVMge1xuICAgICAgICBwb3NpdGlvbjogYW55LFxuICAgICAgICBjdXJyZW50UG9zaXRpb246IG51bWJlcixcbiAgICAgICAgc3RhdHVzOiBudW1iZXIsXG4gICAgfTtcbiAgICBleHBvcnQgY29uc3QgQURfQ09ERSA9IHtcbiAgICAgICAgTE9BRF9TVUNDRVNTOiAxLC8v5Yqg6L295oiQ5YqfXG4gICAgICAgIExPQURfRkFJTDogMiwvL+WKoOi9veWksei0pVxuICAgICAgICBDTElDS19BRDogMywvL+eCueWHu+aIkOWKn1xuICAgICAgICBTSE9XX1NVQ0NFU1M6IDQsLy/mmL7npLrmiJDlip9cbiAgICAgICAgU0hPV19GQUlMOiA1LC8v5pi+56S65aSx6LSlXG4gICAgICAgIENMT1NFX0FEOiA2LC8v5YWz6ZetXG4gICAgICAgIFJFV0FSRF9TVUNDRVNTOiA5LC8v5aWW5Yqx5oiQ5YqfXG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAoQWRVdGlsLmhhc0luaXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLmVuYWJsZVVwbG9hZEFkU2RrU3RhdGlzdGljKHsgZW5hYmxlOiB0cnVlIH0pO1xuICAgICAgICB3aW5kb3dbXCJzZGtBZExpc3RlbmVyXCJdID0gKHJlczogQWRVdGlsLlJFUykgPT4ge1xuICAgICAgICAgICAgaWYgKEFkVXRpbC50YWtlT3ZlckFkW3Jlcy5wb3NpdGlvbl0pIHtcbiAgICAgICAgICAgICAgICB0eXBlb2YgQWRVdGlsLmFkTGlzdGVuZXJbcmVzLnBvc2l0aW9uXSA9PSAnZnVuY3Rpb24nICYmIEFkVXRpbC5hZExpc3RlbmVyW3Jlcy5wb3NpdGlvbl0ocmVzKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXMucG9zaXRpb24gPSArcmVzLnBvc2l0aW9uO1xuICAgICAgICAgICAgcmVzLmN1cnJlbnRQb3NpdGlvbiA9ICtyZXMucG9zaXRpb247XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK54q25oCBXCIsIHJlcy5zdGF0dXMpO1xuXG4gICAgICAgICAgICAvL+W5v+WRiuWKoOi9veaIkOWKn+S6hi0tMSwg5Yqg6L295aSx6LSl5LqGLS0yLCDlub/lkYrngrnlh7vkuoYtLTMsIOW5v+WRiuWxleekui0tNCwg5bGV56S65aSx6LSlLS01LCDlub/lkYrlhbPpl63kuoYtLTYsIOWPr+S7peiOt+WPluWlluWKseS6hi0tOVxuICAgICAgICAgICAgc3dpdGNoIChyZXMuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBBZFV0aWwuYWRSZWFkeVtyZXMucG9zaXRpb25dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgQWRVdGlsLmFkTG9hZGluZ1tyZXMucG9zaXRpb25dID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295bm/5ZGK5oiQ5YqfXCIgKyByZXMucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgICAgIGlmICghQWRVdGlsLmFkbG9hZFByZVtyZXMucG9zaXRpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBZFV0aWwuc2hvd0FkKCtyZXMucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFkVXRpbC5pc1ByZUFkW3Jlcy5wb3NpdGlvbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZFV0aWwuc2hvd0FkKCtyZXMucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgQWRVdGlsLmlzUHJlQWRbcmVzLnBvc2l0aW9uXSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295bm/5ZGK5aSx6LSlXCIgKyByZXMucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgICAgIEFkVXRpbC5hZFJlYWR5W3Jlcy5wb3NpdGlvbl0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgQWRVdGlsLmFkTG9hZGluZ1tyZXMucG9zaXRpb25dID0gZmFsc2U7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFkUG9zaXRpb24gJiYgQWRQb3NpdGlvbi5BcHBFeHBvc3VyZVtyZXMucG9zaXRpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+e7n+iuoeW5v+WRiuWxleekuuWksei0pVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IEFwcEV4cG9zdXJlUG9zdGlvbiA9IEFkUG9zaXRpb24uQXBwRXhwb3N1cmVbcmVzLnBvc2l0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QuQXBwU2NlbmVBZFJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjc19hcHBfYWRfdHlwZTogQXBwRXhwb3N1cmVQb3N0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhcHBfYWRzdGF0dXM6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgQWRVdGlsLmFkTG9hZGluZ1tyZXMucG9zaXRpb25dID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIOino+WGs+aPkuWxj+W5v+WRiuWFs+mXreS5i+WQjuiwg+i1t+iZmuaLn+aMiemUrlxuICAgICAgICAgICAgICAgICAgICAvLyBDTWJyaWRnZS5jb2Nvc0ZpbmlzaEFkQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFkUG9zaXRpb24gJiYgQWRQb3NpdGlvbi5BcHBFeHBvc3VyZVtyZXMucG9zaXRpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgQXBwRXhwb3N1cmVQb3N0aW9uID0gQWRQb3NpdGlvbi5BcHBFeHBvc3VyZVtyZXMucG9zaXRpb25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5BcHBTY2VuZUFkUmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNzX2FwcF9hZF90eXBlOiBBcHBFeHBvc3VyZVBvc3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGFwcF9hZHN0YXR1czogMVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGlmIChBZFBvc2l0aW9uICYmIEFkUG9zaXRpb24uQXBwRXhwb3N1cmVbcmVzLnBvc2l0aW9uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/nu5/orqHlub/lkYrngrnlh7tcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QuQXBwRXhwb3N1cmVDbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhcHBfZXhwb3N1cmVfYWRkcmVzczogQWRQb3NpdGlvbltcIkFwcEV4cG9zdXJlXCJdW3Jlcy5wb3NpdGlvbl1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuXG4gICAgICAgICAgICAgICAgICAgIEFkVXRpbC5hZExvYWRpbmdbcmVzLnBvc2l0aW9uXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5DbG9zZV9BZExvYWRpbmcpO1xuXG4gICAgICAgICAgICBsZXQgdGVtcFJlcyA9IEpTT04uc3RyaW5naWZ5KHJlcyk7XG4gICAgICAgICAgICAvLyBsZXQgcGFyc2VSZXMgPSBKU09OLnBhcnNlKHRlbXBSZXMpO1xuICAgICAgICAgICAgLy8gQWRVdGlsLmFkTGlzdGVuZXJbcGFyc2VSZXMucG9zaXRpb25dICYmIEFkVXRpbC5hZExpc3RlbmVyW3BhcnNlUmVzLnBvc2l0aW9uXShwYXJzZVJlcyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyc2VSZXMgPSBKU09OLnBhcnNlKHRlbXBSZXMpO1xuICAgICAgICAgICAgICAgIHR5cGVvZiBBZFV0aWwuYWRMaXN0ZW5lcltwYXJzZVJlcy5wb3NpdGlvbl0gPT0gJ2Z1bmN0aW9uJyAmJiBBZFV0aWwuYWRMaXN0ZW5lcltwYXJzZVJlcy5wb3NpdGlvbl0ocGFyc2VSZXMpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHdpbmRvd1tcIlN5c3RlbUludGVyZmFjZVwiXS5zZGtBZExpc3RlbmVyID0gKHJlcykgPT4geyAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHdpbmRvd1tcInNka0FkTGlzdGVuZXJcIl0oSlNPTi5wYXJzZShyZXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgQWRVdGlsLmhhc0luaXQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtc2c6IOWKoOi9vea/gOWKseinhumikVxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiDlub/lkYrkvY1cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5bm/5ZGK55uR5ZCs5Zue6LCDXG4gICAgICogQHBhcmFtIGZvcmNlIOaYr+WQpuW8uuWItuWKoOi9veW5v+WRilxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkQWQocG9zaXRpb246IG51bWJlciwgY2FsbGJhY2s/OiBhbnksIGZvcmNlID0gdHJ1ZSwgaXNUYWtlT3ZlciA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChBZFV0aWwuYWRMb2FkaW5nW3Bvc2l0aW9uXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+WKoOi9veW5v+WRilwiICsgcG9zaXRpb24pXG4gICAgICAgIGlmIChwb3NpdGlvbiA+IDAgJiYgKGZvcmNlIHx8ICFBZFV0aWwuYWRMb2FkW3Bvc2l0aW9uXSkpIHtcbiAgICAgICAgICAgIEFkVXRpbC5hZExvYWRpbmdbcG9zaXRpb25dID0gdHJ1ZTtcbiAgICAgICAgICAgIEFkVXRpbC5hZExvYWRbcG9zaXRpb25dID0gdHJ1ZTtcbiAgICAgICAgICAgIEFkVXRpbC50YWtlT3ZlckFkW3Bvc2l0aW9uXSA9IGlzVGFrZU92ZXI7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiAoQWRVdGlsLmFkTGlzdGVuZXJbcG9zaXRpb25dID0gY2FsbGJhY2spO1xuICAgICAgICAgICAgaWYgKEFkVXRpbC5hZGxvYWRQcmVbcG9zaXRpb25dKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFkVXRpbC5hZFJlYWR5W3Bvc2l0aW9uXSA9PSB0cnVlKSB7Ly/lt7Llh4blpIdcbiAgICAgICAgICAgICAgICAgICAgQWRVdGlsLnNob3dBZChwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBBZFV0aWwuYWRsb2FkUHJlW3Bvc2l0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmkq3mlL7pooTliqDovb3lub/lkYrmiJDlip9cIiArIHBvc2l0aW9uKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQWRVdGlsLmFkUmVhZHlbcG9zaXRpb25dID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pKt5pS+6aKE5Yqg6L295bm/5ZGK5aSx6LSl6L2s5pmu6YCa5Yqg6L29XCIgKyBwb3NpdGlvbilcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIEFkVXRpbC5hZGxvYWRQcmVbcG9zaXRpb25dO1xuICAgICAgICAgICAgICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLmxvYWRBZFNkayh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFZpZGVvQWRTdGF0dXMuTE9BRF9TVUNDRVNTLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBBZFV0aWwuaXNQcmVBZFtwb3NpdGlvbl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumihOWKoOi9veW5v+WRiuWwmuacquWKoOi9vVwiLCBBZFV0aWwuaXNQcmVBZFtwb3NpdGlvbl0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaZrumAmuWKoOi9veW5v+WRilwiICsgcG9zaXRpb24pXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5sb2FkQWRTZGsoe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogVmlkZW9BZFN0YXR1cy5MT0FEX1NVQ0NFU1MsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICAvLyB9LCAxMDApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1zZzog5pi+56S65bm/5ZGKXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uIOW5v+WRiuS9jVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBzaG93QWQocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICBpZiAoQWRVdGlsLmFkUmVhZHlbcG9zaXRpb25dKSB7XG4gICAgICAgICAgICBkZWxldGUgQWRVdGlsLmFkUmVhZHlbcG9zaXRpb25dO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlsZXnpLrlub/lkYos5YeG5aSH54q25oCB6YeN572uXCIgKyBwb3NpdGlvbilcbiAgICAgICAgICAgIEFkVXRpbC5jdXJyZW50UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIGxldCBzaG93QWRUaXBzID0gZmFsc2UvL+e6ouWMheeJueauiuWkhOeQhlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmkq3mlL7lub/lkYrml7Z0aXBcIiwgc2hvd0FkVGlwcylcbiAgICAgICAgICAgIFBsYXRmb3JtRmFjdG9yeS5JbnMuc2hvd0FkKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBGZWVkQWRTdGF0dXMuT05fU0hPVyxcbiAgICAgICAgICAgICAgICBzaG93QWRUaXBzOiBzaG93QWRUaXBzLFxuICAgICAgICAgICAgICAgIGFkVGlwczogXCLop4LnnIvlrozmlbTop4bpopHpooblj5blpZblirFcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzVmlld0ZpbmlzaGVkKHJlczogQWRVdGlsLlJFUywgaXNDbG9zZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIC8vIOiOt+WPluWIsOWlluWKseeahOWFs+mXrVxuICAgICAgICBsZXQgcmVzdWx0ID0gcmVzLnN0YXR1cyA9PSBBRF9DT0RFLlJFV0FSRF9TVUNDRVNTO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIue7n+iuoeaOpeWPo++8jOS4iuaKpeWQjuWPsOW5v+WRiuingueci+WujOavlVwiLCByZXMuc3RhdHVzKTtcbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF3aW5kb3dbJ2FkdmVydGlzaW5nX251bSddKSB7XG4gICAgICAgICAgICB3aW5kb3dbJ2FkdmVydGlzaW5nX251bSddID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvd1snYWR2ZXJ0aXNpbmdfbnVtJ10gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBYTVNESy50cmFja1VzZXJQcm9wZXJ0aWVzKHtcbiAgICAgICAgICAgIGFkdmVydGlzaW5nX251bTogd2luZG93WydhZHZlcnRpc2luZ19udW0nXSArICcnLFxuICAgICAgICAgICAgYWR2ZXJ0aXNfbnVtOiB3aW5kb3dbJ2FkdmVydGlzaW5nX251bSddXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1ZpZXdFcnJvcihyZXM6IEFkVXRpbC5SRVMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMgPT0gQURfQ09ERS5MT0FEX0ZBSUwgfHwgcmVzLnN0YXR1cyA9PSBBRF9DT0RFLlNIT1dfRkFJTFxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlhajlsY/lub/lkYrliqDovb3lrozmiJDvvIzljIXmi6zliqDovb3miJDlip/miJblpLHotKXjgIJcbiAgICAgKiBAcGFyYW0gcmVzIFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBmaW5pc2hGdWxsVmlkZW8ocmVzOiBBZFV0aWwuUkVTKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzID09IEFEX0NPREUuTE9BRF9GQUlMIHx8IHJlcy5zdGF0dXMgPT0gQURfQ09ERS5TSE9XX0ZBSUwgfHwgcmVzLnN0YXR1cyA9PSBBRF9DT0RFLkNMT1NFX0FEXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmihOWKoOi9veinhumikeW5v+WRilxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkQWRWaWRlbyhwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi6aKE5Yqg6L295bm/5ZGKXCIgKyBwb3NpdGlvbilcbiAgICAgICAgQWRVdGlsLmlzUHJlQWRbcG9zaXRpb25dID0gZmFsc2U7XG4gICAgICAgIEFkVXRpbC5hZGxvYWRQcmVbcG9zaXRpb25dID0gdHJ1ZTtcbiAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5sb2FkQWRTZGsoe1xuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgc3RhdHVzOiBWaWRlb0FkU3RhdHVzLkxPQURfU1VDQ0VTU1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59Il19