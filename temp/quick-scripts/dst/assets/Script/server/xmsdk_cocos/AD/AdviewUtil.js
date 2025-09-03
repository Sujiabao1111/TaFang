
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdviewUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBRFxcQWR2aWV3VXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUQ7QUFFbkQsOERBQXlEO0FBQ3pELHFEQUF3RDtBQUN4RCxpREFBNEM7QUFFNUMsSUFBaUIsVUFBVSxDQWdRMUI7QUFoUUQsV0FBaUIsVUFBVTtJQUNaLGtCQUFPLEdBQVksS0FBSyxDQUFDO0lBRXpCLGdCQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRVYsb0JBQVMsR0FBRyxHQUFHLENBQUMsQ0FBYyxxQ0FBcUM7SUFFbkUsbUJBQVEsR0FBVyxFQUFFLENBQUMsQ0FBUSxjQUFjO0lBRTVDLHdCQUFhLEdBQVcsRUFBRSxDQUFDLENBQUcsZ0JBQWdCO0lBRTlDLGdCQUFLLEdBQVcsRUFBRSxDQUFDLENBQVcsZUFBZTtJQUU3QyxvQkFBUyxHQUFXLEVBQUUsQ0FBQyxDQUFPLGNBQWM7SUFFNUMsc0JBQVcsR0FBVyxFQUFFLENBQUMsQ0FBTSxPQUFPO0lBRXRDLG9CQUFTLEdBQVcsRUFBRSxDQUFDLENBQVEsVUFBVTtJQUN6QyxxQkFBVSxHQUFHO1FBQ3BCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsUUFBUSxFQUFFLENBQUM7UUFDWCxRQUFRLEVBQUUsQ0FBQztRQUNYLGFBQWEsRUFBRSxDQUFDO0tBQ25CLENBQUE7SUFNQSxDQUFDO0lBRUYsU0FBZ0IsSUFBSTtRQUNoQixJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsT0FBTztTQUNWO1FBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsVUFBQyxHQUFtQjtZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEQsd0RBQXdEO1lBQ3hELFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsS0FBSyxDQUFDO29CQUNGLE9B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QzFCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQztJQUN6RixDQUFDO0lBRmUseUJBQWMsaUJBRTdCLENBQUE7SUFFRCxTQUFnQixlQUFlO1FBQzNCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQztJQUM1RixDQUFDO0lBRmUsMEJBQWUsa0JBRTlCLENBQUE7QUFDTCxDQUFDLEVBaFFnQixVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQWdRMUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHhUcmFuc1V0aWxzIGZyb20gXCIuLy4uL1V0aWxzL1B4VHJhbnNVdGlsc1wiO1xuaW1wb3J0IHsgU2hvd0FkVmlld0NvbmZpZ1R5cGUgfSBmcm9tIFwiLi8uLi9BZGFwdGVyL1R5cGUvQWRWaWV3Q29uZmlnXCI7XG5pbXBvcnQgUGxhdGZvcm1GYWN0b3J5IGZyb20gJy4uL0FkYXB0ZXIvUGxhdGZvcm1GYWN0b3J5JztcbmltcG9ydCB7IEZlZWRBZFN0YXR1cyB9IGZyb20gXCIuLi9BZGFwdGVyL1R5cGUvQWRTdGF0dXNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi8uLi8uLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5leHBvcnQgbmFtZXNwYWNlIEFkdmlld1V0aWwge1xuICAgIGV4cG9ydCBsZXQgaGFzSW5pdDogQm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZXhwb3J0IGxldCByZXRyeSA9IDM7XG5cbiAgICBleHBvcnQgbGV0IGRlZkhlaWdodCA9IDIyMDsgICAgICAgICAgICAgIC8vIOW6lOWuouaIt+err+imgeaxgu+8jOW5v+eCuemAmuW5v+WRiuiOt+WPluS4jeWIsOmrmOW6pu+8jOe7mem7mOiupOWAvO+8jOWwj+eahDkw77yM5aSn55qEMjIwXG5cbiAgICBleHBvcnQgbGV0IGFkQm94U2V0OiBvYmplY3QgPSB7fTsgICAgICAgIC8vIOWtmOaUvuWvueW6lOW5v+WRiueahOWuueWZqOeahOe7hFxuXG4gICAgZXhwb3J0IGxldCBhZEJveFdpZHRoU2V0OiBvYmplY3QgPSB7fTsgICAvLyDlrZjmlL7lr7nlupTlub/lkYrkvY3nmoTlrrnlmajnmoTlrr3luqZcblxuICAgIGV4cG9ydCBsZXQgYWRTZXQ6IG9iamVjdCA9IHt9OyAgICAgICAgICAgLy8g5a2Y5pS+5a+55bqU5bm/5ZGK6L+U5Zue5YC8UkVTXG5cbiAgICBleHBvcnQgbGV0IGFkSGlkZVNldDogb2JqZWN0ID0ge307ICAgICAgIC8vIOWtmOaUvuaYr+WQpueCueWHu+makOiXj+S/oeaBr+a1gVxuXG4gICAgZXhwb3J0IGxldCBhZFN0YXR1c1NldDogb2JqZWN0ID0ge307ICAgICAgLy/lrZjmlL7nirbmgIHnoIFcblxuICAgIGV4cG9ydCBsZXQgYWRsb2FkUHJlOiBvYmplY3QgPSB7fTsgICAgICAgIC8v5a2Y5pS+5piv5ZCm5bm/5ZGK57yT5a2YXG4gICAgZXhwb3J0IGxldCBTdGF0dXNDb2RlID0ge1xuICAgICAgICBsb2FkaW5nOiAxLC8v5rKh5pyJ5aW9XG4gICAgICAgIGxvYWRTdWNjOiAyLC8v5Yqg6L295oiQ5YqfXG4gICAgICAgIGxvYWRGYWlsOiAzLC8v5Yqg6L295aSx6LSlXG4gICAgICAgIGNvbmZpcm1IZWlnaHQ6IDQsLy/pq5jluqbnoa7lrprkuoZcbiAgICB9XG4gICAgZXhwb3J0IGludGVyZmFjZSBSRVMge1xuICAgICAgICBwb3NpdGlvbjogYW55LCAgICAvL+i/lOWbnueahOW5v+WRiuS9jVxuICAgICAgICBzdGF0dXM6IG51bWJlciwgICAvL+i/lOWbnueahOW5v+WRiueKtuaAgVxuICAgICAgICB3aWR0aDogbnVtYmVyLCAgICAvL+i/lOWbnueahOW5v+WRiuWuveW6pu+8jOWuouaIt+err+WOn+eUn1xuICAgICAgICBoZWlnaHQ6IG51bWJlciwgICAvL+i/lOWbnueahOW5v+WRiumrmOW6pu+8jOWuouaIt+err+WOn+eUn1xuICAgIH07XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKEFkdmlld1V0aWwuaGFzSW5pdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvd1tcImFkVmlld0xpc3RlbmVyXCJdID0gKHJlczogQWR2aWV3VXRpbC5SRVMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnYWRWaWV3VXRpbDonICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gICAgICAgICAgICAvL+W5v+WRiuWKoOi9veaIkOWKn+S6hi0tMSzliqDovb3lpLHotKXkuoYtLTIs5bm/5ZGK54K55Ye75LqGLS0zLOW5v+WRiuWxleekui0tNCzlub/lkYrlhbPpl63kuoYtLTYs6auY5bqm56Gu6K6k5LqGLS05XG4gICAgICAgICAgICBzd2l0Y2ggKHJlcy5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5L+h5oGv5rWB5Yqg6L295oiQ5YqfXCIsIHJlcy5wb3NpdGlvbilcbiAgICAgICAgICAgICAgICAgICAgQWR2aWV3VXRpbC5yZXRyeSA9IDM7XG4gICAgICAgICAgICAgICAgICAgIEFkdmlld1V0aWwuYWRTdGF0dXNTZXRbcmVzLnBvc2l0aW9uXSA9IFN0YXR1c0NvZGUubG9hZFN1Y2NcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS/oeaBr+a1geWKoOi9veWksei0pVwiLCByZXMucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgICAgIEFkdmlld1V0aWwuYWRTdGF0dXNTZXRbcmVzLnBvc2l0aW9uXSA9IFN0YXR1c0NvZGUubG9hZEZhaWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBZHZpZXdVdGlsLmFkbG9hZFByZVtyZXMucG9zaXRpb25dICYmIEFkdmlld1V0aWwucmV0cnkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWR2aWV3VXRpbC5sb2FkQWQocmVzLnBvc2l0aW9uLCBBZHZpZXdVdGlsLmFkQm94V2lkdGhTZXRbcmVzLnBvc2l0aW9uXSwgQWR2aWV3VXRpbC5hZEJveFNldFtyZXMucG9zaXRpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLUFkdmlld1V0aWwucmV0cnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1lc3NhZ2VDZW50ZXIuc2VuZE1lc3NhZ2UoJ0ZBRF9DTE9TRV9SRVMnLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICBBZHZpZXdVdGlsLmhpZGVBZChyZXMucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5L+h5oGv5rWB6auY5bqm56Gu5a6aXCIsIHJlcy5wb3NpdGlvbiwgQWR2aWV3VXRpbC5hZEJveFNldClcbiAgICAgICAgICAgICAgICAgICAgLy/kv6Hmga/mtYHnmoTpq5jluqbnoa7lrprkuoZcbiAgICAgICAgICAgICAgICAgICAgQWR2aWV3VXRpbC5hZFNldFtyZXMucG9zaXRpb25dID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICBBZHZpZXdVdGlsLmFkU3RhdHVzU2V0W3Jlcy5wb3NpdGlvbl0gPSBTdGF0dXNDb2RlLmNvbmZpcm1IZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgLy/ov5nph4zlhYjlj5Hlh7rkuIDkuKrpgJrnn6XlkKdcbiAgICAgICAgICAgICAgICAgICAgLy8gTWVzc2FnZUNlbnRlci5zZW5kTWVzc2FnZSgnRkFEX0hFSUdIVF9PSycsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghQWR2aWV3VXRpbC5hZGxvYWRQcmVbcmVzLnBvc2l0aW9uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgQWR2aWV3VXRpbC5zaG93QWQocmVzLnBvc2l0aW9uLCBBZHZpZXdVdGlsLmFkQm94U2V0W3Jlcy5wb3NpdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5DbG9zZV9BZExvYWRpbmcpO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgIHdpbmRvd1tcIlN5c3RlbUludGVyZmFjZVwiXS5hZFZpZXdMaXN0ZW5lciA9IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbXCJhZFZpZXdMaXN0ZW5lclwiXShKU09OLnBhcnNlKHJlcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgQWR2aWV3VXRpbC5oYXNJbml0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYWRWaWV3RW5hYmxlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gY29uc3QgYWRIZWFkID0gZ2V0QWRIZWFkKCkgPyB0eXBlb2YgZ2V0QWRIZWFkKCkgPT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGdldEFkSGVhZCgpKSA6IGdldEFkSGVhZCgpIDoge307XG4gICAgICAgIC8vIHJldHVybiAodXRpbHMuYklzQW5kcm9pZCgpICYmIGFkSGVhZC52ZXJzaW9uQ29kZSA+PSAyMjIpIHx8ICh1dGlscy5iSXNJT1MoKSAmJiBhZEhlYWQudmVyc2lvbkNvZGUgPj0gMTUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBhZFZpZXdIZWlnaHQocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICAvLyDlupTlrqLmiLfnq6/opoHmsYLvvIzlub/ngrnpgJrlub/lkYrojrflj5bkuI3liLDpq5jluqbvvIznu5npu5jorqTlgLzvvIzlsI/nmoQ5MO+8jOWkp+eahDIyMFxuICAgICAgICBsZXQgZGVmSGVpZ2h0ID0gQWR2aWV3VXRpbC5kZWZIZWlnaHQ7XG4gICAgICAgIHJldHVybiBBZHZpZXdVdGlsLmFkU2V0W3Bvc2l0aW9uXSAmJiBBZHZpZXdVdGlsLmFkU2V0W3Bvc2l0aW9uXS5zaG93ID8gKEFkdmlld1V0aWwuYWRTZXRbcG9zaXRpb25dLmhlaWdodCB8fCBkZWZIZWlnaHQpIDogMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbXNnOiDliqDovb3kv6Hmga/mtYFcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb24g5L+h5oGv5rWB5bm/5ZGK5L2NaWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYWRCb3hXaWR0aCDlub/lkYrkvY3lrrnlmajnmoTlrr3luqZcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IGFkQm94IOW5v+WRiuS9jeWuueWZqFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNHZHRNaW5BZCDmmK/lkKbkuLrlub/ngrnpgJrlub/lkYrvvIh0cnVl5Li65aSn55qEMjIw77yMZmFsc2XkuLrlsI/nmoQ5MO+8iVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkQWQocG9zaXRpb246IG51bWJlciwgYWRCb3hXaWR0aDogbnVtYmVyLCBhZEJveDogY2MuTm9kZSwgaXNHZHRNaW5BZCA9IGZhbHNlKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzR2R0TWluQWQpIHtcbiAgICAgICAgICAgIEFkdmlld1V0aWwuZGVmSGVpZ2h0ID0gOTA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPiAwKSB7XG4gICAgICAgICAgICBBZHZpZXdVdGlsLmFkQm94V2lkdGhTZXRbcG9zaXRpb25dID0gYWRCb3hXaWR0aDtcbiAgICAgICAgICAgIEFkdmlld1V0aWwuYWRCb3hTZXRbcG9zaXRpb25dID0gYWRCb3g7XG4gICAgICAgICAgICBBZHZpZXdVdGlsLmFkSGlkZVNldFtwb3NpdGlvbl0gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5a695bqmXCIsIHBvc2l0aW9uLCBhZEJveFdpZHRoKVxuICAgICAgICAgICAgaWYgKEFkdmlld1V0aWwuYWRsb2FkUHJlW3Bvc2l0aW9uXSkge1xuICAgICAgICAgICAgICAgIEFkdmlld1V0aWwuYWRsb2FkUHJlW3Bvc2l0aW9uXSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKEFkdmlld1V0aWwuYWRTdGF0dXNTZXRbcG9zaXRpb25dID09IFN0YXR1c0NvZGUubG9hZGluZyB8fCBBZHZpZXdVdGlsLmFkU3RhdHVzU2V0W3Bvc2l0aW9uXSA9PSBTdGF0dXNDb2RlLmxvYWRTdWNjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6aKE5Yqg6L295L+h5oGv5rWB77yM5pyq56Gu5a6a6auY5bqmXCIsIHBvc2l0aW9uKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQWR2aWV3VXRpbC5hZFN0YXR1c1NldFtwb3NpdGlvbl0gPT0gU3RhdHVzQ29kZS5sb2FkRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumihOWKoOi9veS/oeaBr+a1geWksei0pei9rOaZrumAmuWKoOi9vVwiLCBwb3NpdGlvbilcbiAgICAgICAgICAgICAgICAgICAgQWR2aWV3VXRpbC5hZFN0YXR1c1NldFtwb3NpdGlvbl0gPSBTdGF0dXNDb2RlLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgYWRCb3hXaWR0aCAmJiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmxvYWRBZFZpZXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFB4VHJhbnNVdGlscy5sb2NhbFRvTmF0aXZlKGFkQm94V2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFkdmlld1V0aWwuYWRTdGF0dXNTZXRbcG9zaXRpb25dID09IFN0YXR1c0NvZGUuY29uZmlybUhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumihOWKoOi9veS/oeaBr+a1ge+8jOW3suehruWumumrmOW6pu+8jOebtOaOpeaSreaUvlwiLCBwb3NpdGlvbilcbiAgICAgICAgICAgICAgICAgICAgQWR2aWV3VXRpbC5zaG93QWQocG9zaXRpb24sIEFkdmlld1V0aWwuYWRCb3hTZXRbcG9zaXRpb25dLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pmu6YCa5Yqg6L295L+h5oGv5rWBXCIsIHBvc2l0aW9uKVxuICAgICAgICAgICAgICAgIEFkdmlld1V0aWwuYWRTdGF0dXNTZXRbcG9zaXRpb25dID0gU3RhdHVzQ29kZS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgYWRCb3hXaWR0aCAmJiBQbGF0Zm9ybUZhY3RvcnkuSW5zLmxvYWRBZFZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBQeFRyYW5zVXRpbHMubG9jYWxUb05hdGl2ZShhZEJveFdpZHRoKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gbG9hZFByZUFkKHBvc2l0aW9uOiBudW1iZXIsIGFkQm94V2lkdGg6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+mihOWKoOi9veS/oeaBr+a1gVwiLCBwb3NpdGlvbilcbiAgICAgICAgaWYoQWR2aWV3VXRpbC5hZGxvYWRQcmVbcG9zaXRpb25dKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bey57uP5pyJ6aKE5Yqg6L295aW955qE5L+h5oGv5rWBXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZihBZHZpZXdVdGlsLmFkU3RhdHVzU2V0W3Bvc2l0aW9uXSA9PSBTdGF0dXNDb2RlLmxvYWRpbmcpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5DliY3osIPnlKjkuobliqDovb3kv6Hmga/mtYHmlrnms5VcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIEFkdmlld1V0aWwuYWRsb2FkUHJlW3Bvc2l0aW9uXSA9IHRydWVcbiAgICAgICAgQWR2aWV3VXRpbC5hZFN0YXR1c1NldFtwb3NpdGlvbl0gPT0gU3RhdHVzQ29kZS5sb2FkaW5nXG4gICAgICAgIGFkQm94V2lkdGggJiYgUGxhdGZvcm1GYWN0b3J5Lklucy5sb2FkQWRWaWV3KHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgIHdpZHRoOiBQeFRyYW5zVXRpbHMubG9jYWxUb05hdGl2ZShhZEJveFdpZHRoKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiBwcmVTaG93QWQocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICBsZXQgcmVzID0gQWR2aWV3VXRpbC5hZFNldFtwb3NpdGlvbl07XG4gICAgICAgIHJlcyAmJiAocmVzLnNob3cgPSB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAg5pS56L+b5LqGXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIOW5v+WRiuS9jVxuICAgICAqIEBwYXJhbSBhZEJveCDlub/lkYrnmoTlrrnlmahcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc2hvd0FkKHBvc2l0aW9uOiBudW1iZXIsIGFkQm94OiBhbnksIGlzUHJlOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcbiAgICAgICAgY29uc29sZS5sb2coXCLlsZXnjrDkv6Hmga/mtYExXCIrcG9zaXRpb24pO1xuICAgICAgICBpZiAoQWR2aWV3VXRpbC5hZEhpZGVTZXRbcG9zaXRpb25dKSB7XG4gICAgICAgICAgICBBZHZpZXdVdGlsLmFkU2V0W3Bvc2l0aW9uXSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCLlsZXnjrDkv6Hmga/mtYEyXCIrcG9zaXRpb24pO1xuICAgICAgICBsZXQgZGVmSGVpZ2h0ID0gQWR2aWV3VXRpbC5kZWZIZWlnaHQ7XG4gICAgICAgIGxldCByZXMgPSBBZHZpZXdVdGlsLmFkU2V0W3Bvc2l0aW9uXTtcblxuICAgICAgICBpZiAocmVzICYmIGFkQm94KSB7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gcmVzLmhlaWdodCA/IHJlcy5oZWlnaHQgOiBkZWZIZWlnaHQ7XG4gICAgICAgICAgICBsZXQgbG9jYWxIZWlnaHQgPSBQeFRyYW5zVXRpbHMubmF0aXZlVG9Mb2NhbChoZWlnaHQpO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8v6L+Z6YeM5bu26L+f5LiA5LiL77yM5pyJ5Y+v6IO95pyJ55qE6IqC54K55LiK6Z2i5L+u5pS55LqG6auY5bqm77yM6L+Y5rKh5Y+N5bqU6L+H5p2lXG4gICAgICAgICAgICAgICAgbGV0IGRlbGF5VGltZSA9IGlzUHJlID8gODAwIDogMjAwIC8vIOmihOWKoOi9veW7tui/n+S5heeCuVxuICAgICAgICAgICAgICAgIGFkQm94ICYmIChhZEJveC5oZWlnaHQgPSBsb2NhbEhlaWdodCk7XG4gICAgICAgICAgICAgICAgYWRCb3ggJiYgYWRCb3gucGFyZW50ICYmIGFkQm94LnBhcmVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KSAmJiAoYWRCb3gucGFyZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnVwZGF0ZUxheW91dCgpKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5L+h5oGv5rWB6auY5bqm77yM6YCC6YWN5YmNXCIgKyBhZEJveC55LCBwb3NpdGlvbilcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkQm94ICYmIGFkQm94LnBhcmVudCAmJiBhZEJveC5wYXJlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkgJiYgKGFkQm94LnBhcmVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS51cGRhdGVMYXlvdXQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2ZWMyID0gYWRCb3guY29udmVydFRvV29ybGRTcGFjZShjYy52MigwLCAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmF0aXZlWSA9IGNjLnZpZXcuZ2V0RnJhbWVTaXplKCkuaGVpZ2h0IC0gaGVpZ2h0IC0gUHhUcmFuc1V0aWxzLmxvY2FsVG9OYXRpdmUodmVjMi55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5L+h5oGv5rWB6auY5bqm77yM6YCC6YWN5ZCOXCIgKyBhZEJveC55LCBwb3NpdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbTogU2hvd0FkVmlld0NvbmZpZ1R5cGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHJlcy5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogcmVzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IChBZHZpZXdVdGlsLmdldERldmljZVdpZHRoKCkgLSByZXMud2lkdGgpIC8gMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBuYXRpdmVZXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2FkVmlld1V0aWw6c2hvd0FkX3BhcmFtOicgKyBKU09OLnN0cmluZ2lmeShwYXJhbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgUGxhdGZvcm1GYWN0b3J5Lklucy5zaG93QWRWaWV3KHBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zaG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L2s55uY5LiW55WM5Z2Q5qCHXCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgZGVsYXlUaW1lKTtcblxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbXNnOiDpmpDol4/kv6Hmga/mtYFcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gaGlkZUFkKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHBvc2l0aW9uID4gMCkge1xuICAgICAgICAgICAgaWYgKEFkdmlld1V0aWwuYWRCb3hTZXRbcG9zaXRpb25dKSB7XG4gICAgICAgICAgICAgICAgQWR2aWV3VXRpbC5hZEJveFNldFtwb3NpdGlvbl0uaGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFkdmlld1V0aWwuYWRIaWRlU2V0W3Bvc2l0aW9uXSA9IHRydWU7XG4gICAgICAgICAgICBBZHZpZXdVdGlsLmFkU2V0W3Bvc2l0aW9uXSA9IG51bGw7XG4gICAgICAgICAgICBBZHZpZXdVdGlsLmFkQm94U2V0W3Bvc2l0aW9uXSA9IG51bGw7XG4gICAgICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuSW5zLmhpZGVBZFZpZXcoeyBwb3NpdGlvbjogcG9zaXRpb24sIHN0YXR1czogRmVlZEFkU3RhdHVzLk9OX0NMT1NFIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnRIZWlnaHQobm9kZSwgaGVpZ2h0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgbm9kZSAmJiAobm9kZS5oZWlnaHQgPSBoZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlICYmIChub2RlLmhlaWdodCA9IGhlaWdodCAqIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHsgfVxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXREZXZpY2VXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnZpZXcuZ2V0RnJhbWVTaXplKCkud2lkdGggfHwgd2luZG93LmlubmVyV2lkdGggfHwgd2luZG93Lm91dGVyV2lkdGggfHwgMzYwO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXREZXZpY2VIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBjYy52aWV3LmdldEZyYW1lU2l6ZSgpLmhlaWdodCB8fCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgd2luZG93Lm91dGVySGVpZ2h0IHx8IDY3NztcbiAgICB9XG59Il19