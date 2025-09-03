"use strict";
cc._RF.push(module, '086feaNM7hB4Znxoyz1j9ba', 'AdviewUtil');
// Script/server/xmsdk_cocos/AD/AdviewUtil.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdviewUtil = void 0;
var PxTransUtils_1 = require("./../Utils/PxTransUtils");
var PlatformFactory_1 = require("../Adapter/PlatformFactory");
var AdStatus_1 = require("../Adapter/Type/AdStatus");
var NameTs_1 = require("../../../common/NameTs");
var AdviewUtil;
(function (AdviewUtil) {
    AdviewUtil.hasInit = false;
    AdviewUtil.retry = 3;
    AdviewUtil.defHeight = 220; // 应客户端要求，广点通广告获取不到高度，给默认值，小的90，大的220
    AdviewUtil.adBoxSet = {}; // 存放对应广告的容器的组
    AdviewUtil.adBoxWidthSet = {}; // 存放对应广告位的容器的宽度
    AdviewUtil.adSet = {}; // 存放对应广告返回值RES
    AdviewUtil.adHideSet = {}; // 存放是否点击隐藏信息流
    AdviewUtil.adStatusSet = {}; //存放状态码
    AdviewUtil.adloadPre = {}; //存放是否广告缓存
    AdviewUtil.StatusCode = {
        loading: 1,
        loadSucc: 2,
        loadFail: 3,
        confirmHeight: 4,
    };
    ;
    function init() {
        if (AdviewUtil.hasInit) {
            return;
        }
        window["adViewListener"] = function (res) {
            console.info('adViewUtil:' + JSON.stringify(res));
            //广告加载成功了--1,加载失败了--2,广告点击了--3,广告展示--4,广告关闭了--6,高度确认了--9
            switch (res.status) {
                case 1:
                    console.log("信息流加载成功", res.position);
                    AdviewUtil.retry = 3;
                    AdviewUtil.adStatusSet[res.position] = AdviewUtil.StatusCode.loadSucc;
                    break;
                case 2:
                    console.log("信息流加载失败", res.position);
                    AdviewUtil.adStatusSet[res.position] = AdviewUtil.StatusCode.loadFail;
                    if (!AdviewUtil.adloadPre[res.position] && AdviewUtil.retry >= 0) {
                        setTimeout(function () {
                            AdviewUtil.loadAd(res.position, AdviewUtil.adBoxWidthSet[res.position], AdviewUtil.adBoxSet[res.position]);
                            --AdviewUtil.retry;
                        }, 1000);
                    }
                    break;
                case 6:
                    // MessageCenter.sendMessage('FAD_CLOSE_RES', res);
                    AdviewUtil.hideAd(res.position);
                    break;
                case 9:
                    console.log("信息流高度确定", res.position, AdviewUtil.adBoxSet);
                    //信息流的高度确定了
                    AdviewUtil.adSet[res.position] = res;
                    AdviewUtil.adStatusSet[res.position] = AdviewUtil.StatusCode.confirmHeight;
                    //这里先发出一个通知吧
                    // MessageCenter.sendMessage('FAD_HEIGHT_OK', res);
                    if (!AdviewUtil.adloadPre[res.position]) {
                        AdviewUtil.showAd(res.position, AdviewUtil.adBoxSet[res.position]);
                    }
                    break;
                default:
                    break;
            }
            cc.game.emit(NameTs_1.default.Close_AdLoading);
        };
        if (cc.sys.isNative) {
            window["SystemInterface"].adViewListener = function (res) {
                window["adViewListener"](JSON.parse(res));
            };
        }
        AdviewUtil.hasInit = true;
    }
    AdviewUtil.init = init;
    function adViewEnable() {
        return true;
        // const adHead = getAdHead() ? typeof getAdHead() == 'string' ? JSON.parse(getAdHead()) : getAdHead() : {};
        // return (utils.bIsAndroid() && adHead.versionCode >= 222) || (utils.bIsIOS() && adHead.versionCode >= 15);
    }
    AdviewUtil.adViewEnable = adViewEnable;
    function adViewHeight(position) {
        // 应客户端要求，广点通广告获取不到高度，给默认值，小的90，大的220
        var defHeight = AdviewUtil.defHeight;
        return AdviewUtil.adSet[position] && AdviewUtil.adSet[position].show ? (AdviewUtil.adSet[position].height || defHeight) : 0;
    }
    AdviewUtil.adViewHeight = adViewHeight;
    /**
     * @msg: 加载信息流
     * @param {number} position 信息流广告位id
     * @param {number} adBoxWidth 广告位容器的宽度
     * @param {cc.Node} adBox 广告位容器
     * @param {boolean} isGdtMinAd 是否为广点通广告（true为大的220，false为小的90）
     */
    function loadAd(position, adBoxWidth, adBox, isGdtMinAd) {
        if (isGdtMinAd === void 0) { isGdtMinAd = false; }
        if (true) {
            return;
        }
        if (isGdtMinAd) {
            AdviewUtil.defHeight = 90;
        }
        if (position > 0) {
            AdviewUtil.adBoxWidthSet[position] = adBoxWidth;
            AdviewUtil.adBoxSet[position] = adBox;
            AdviewUtil.adHideSet[position] = false;
            console.log("宽度", position, adBoxWidth);
            if (AdviewUtil.adloadPre[position]) {
                AdviewUtil.adloadPre[position] = false;
                if (AdviewUtil.adStatusSet[position] == AdviewUtil.StatusCode.loading || AdviewUtil.adStatusSet[position] == AdviewUtil.StatusCode.loadSucc) {
                    console.log("预加载信息流，未确定高度", position);
                }
                else if (AdviewUtil.adStatusSet[position] == AdviewUtil.StatusCode.loadFail) {
                    console.log("预加载信息流失败转普通加载", position);
                    AdviewUtil.adStatusSet[position] = AdviewUtil.StatusCode.loading;
                    adBoxWidth && PlatformFactory_1.default.Ins.loadAdView({
                        position: position,
                        width: PxTransUtils_1.default.localToNative(adBoxWidth),
                    });
                }
                else if (AdviewUtil.adStatusSet[position] == AdviewUtil.StatusCode.confirmHeight) {
                    console.log("预加载信息流，已确定高度，直接播放", position);
                    AdviewUtil.showAd(position, AdviewUtil.adBoxSet[position], true);
                }
            }
            else {
                console.log("普通加载信息流", position);
                AdviewUtil.adStatusSet[position] = AdviewUtil.StatusCode.loading;
                adBoxWidth && PlatformFactory_1.default.Ins.loadAdView({
                    position: position,
                    width: PxTransUtils_1.default.localToNative(adBoxWidth),
                });
            }
        }
    }
    AdviewUtil.loadAd = loadAd;
    function loadPreAd(position, adBoxWidth) {
        console.log("开始预加载信息流", position);
        if (AdviewUtil.adloadPre[position]) {
            console.log("已经有预加载好的信息流");
            return;
        }
        if (AdviewUtil.adStatusSet[position] == AdviewUtil.StatusCode.loading) {
            console.log("提前调用了加载信息流方法");
            return;
        }
        AdviewUtil.adloadPre[position] = true;
        AdviewUtil.adStatusSet[position] == AdviewUtil.StatusCode.loading;
        adBoxWidth && PlatformFactory_1.default.Ins.loadAdView({
            position: position,
            width: PxTransUtils_1.default.localToNative(adBoxWidth),
        });
    }
    AdviewUtil.loadPreAd = loadPreAd;
    function preShowAd(position) {
        var res = AdviewUtil.adSet[position];
        res && (res.show = true);
    }
    AdviewUtil.preShowAd = preShowAd;
    /**
     *  改进了
     * @param position 广告位
     * @param adBox 广告的容器
     * @returns {boolean}
     */
    function showAd(position, adBox, isPre) {
        if (isPre === void 0) { isPre = false; }
        console.log("展现信息流1" + position);
        if (AdviewUtil.adHideSet[position]) {
            AdviewUtil.adSet[position] = null;
            return false;
        }
        console.log("展现信息流2" + position);
        var defHeight = AdviewUtil.defHeight;
        var res = AdviewUtil.adSet[position];
        if (res && adBox) {
            var height_1 = res.height ? res.height : defHeight;
            var localHeight = PxTransUtils_1.default.nativeToLocal(height_1);
            try {
                //这里延迟一下，有可能有的节点上面修改了高度，还没反应过来
                var delayTime = isPre ? 800 : 200; // 预加载延迟久点
                adBox && (adBox.height = localHeight);
                adBox && adBox.parent && adBox.parent.getComponent(cc.Layout) && (adBox.parent.getComponent(cc.Layout).updateLayout());
                console.log("信息流高度，适配前" + adBox.y, position);
                setTimeout(function () {
                    try {
                        adBox && adBox.parent && adBox.parent.getComponent(cc.Layout) && (adBox.parent.getComponent(cc.Layout).updateLayout());
                        var vec2 = adBox.convertToWorldSpace(cc.v2(0, 0));
                        var nativeY = cc.view.getFrameSize().height - height_1 - PxTransUtils_1.default.localToNative(vec2.y);
                        console.log("信息流高度，适配后" + adBox.y, position);
                        var param = {
                            position: res.position,
                            width: res.width,
                            x: (AdviewUtil.getDeviceWidth() - res.width) / 2,
                            y: nativeY
                        };
                        console.info('adViewUtil:showAd_param:' + JSON.stringify(param));
                        PlatformFactory_1.default.Ins.showAdView(param);
                        res.show = true;
                    }
                    catch (error) {
                        console.log("转盘世界坐标", JSON.stringify(error));
                    }
                }, delayTime);
            }
            catch (e) {
            }
            return true;
        }
        return false;
    }
    AdviewUtil.showAd = showAd;
    /**
     * @msg: 隐藏信息流
     */
    function hideAd(position) {
        if (position > 0) {
            if (AdviewUtil.adBoxSet[position]) {
                AdviewUtil.adBoxSet[position].height = 0;
            }
            AdviewUtil.adHideSet[position] = true;
            AdviewUtil.adSet[position] = null;
            AdviewUtil.adBoxSet[position] = null;
            PlatformFactory_1.default.Ins.hideAdView({ position: position, status: AdStatus_1.FeedAdStatus.ON_CLOSE });
        }
    }
    AdviewUtil.hideAd = hideAd;
    function updateElementHeight(node, height) {
        try {
            if (cc.sys.isNative) {
                node && (node.height = height);
            }
            else {
                node && (node.height = height * 2);
            }
        }
        catch (ignore) { }
    }
    AdviewUtil.updateElementHeight = updateElementHeight;
    function getDeviceWidth() {
        return cc.view.getFrameSize().width || window.innerWidth || window.outerWidth || 360;
    }
    AdviewUtil.getDeviceWidth = getDeviceWidth;
    function getDeviceHeight() {
        return cc.view.getFrameSize().height || window.innerHeight || window.outerHeight || 677;
    }
    AdviewUtil.getDeviceHeight = getDeviceHeight;
})(AdviewUtil = exports.AdviewUtil || (exports.AdviewUtil = {}));

cc._RF.pop();