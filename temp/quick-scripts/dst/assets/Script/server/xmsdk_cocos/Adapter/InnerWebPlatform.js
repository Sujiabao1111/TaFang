
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '096c5ShPypKf4wxcnutjrVd', 'InnerWebPlatform');
// Script/server/xmsdk_cocos/Adapter/InnerWebPlatform.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsBridge = require("./Bridge/JsBridge");
var AppInfo_1 = require("../Config/AppInfo");
var mock1_1 = require("../mock1");
/**
 * 应用内的浏览器
 */
var InnerWebPlatform = /** @class */ (function () {
    function InnerWebPlatform() {
    }
    /**
     * 与SDK交互通信
     * @param funcName 方法名
     * @param params 参数
     * @param callback 回调
     */
    InnerWebPlatform.prototype.call = function (funcName, params, callback) {
        return JsBridge.call('call', { 'methodName': funcName, 'args': params }, callback);
    };
    // 调用方法
    InnerWebPlatform.jsCall = function (methodName, args, cb) {
        return JsBridge.call('call', { 'methodName': methodName, 'args': args }, cb);
    };
    InnerWebPlatform.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    };
    InnerWebPlatform.prototype.getAdheadString = function () {
        var adHead = InnerWebPlatform.jsCall('createRequestHeaderStr', {});
        if (!adHead || adHead == "") {
            var adHead_1 = InnerWebPlatform.getQueryString("adhead");
            if (adHead_1) {
                console.warn("链接上带adhead参数");
            }
            else {
                console.warn("交互方法拿不到adhead --- 链接上没有带adhead参数");
            }
        }
        return adHead;
    };
    InnerWebPlatform.prototype.getPheadString = function () {
        if (AppInfo_1.AppInfo.isLocal) {
            return mock1_1.default.PHEAD;
        }
        return InnerWebPlatform.jsCall("getPheadString", {});
    };
    InnerWebPlatform.prototype.enableOnResumeOnPause = function (args) {
        InnerWebPlatform.jsCall('enableOnResumeOnPause', args);
    };
    InnerWebPlatform.prototype.hideAdView = function (adConfig) {
        InnerWebPlatform.jsCall('hideAdView', adConfig);
    };
    InnerWebPlatform.prototype.loadAdView = function (adConfig, callback) {
        InnerWebPlatform.jsCall('loadAdView', adConfig);
    };
    InnerWebPlatform.prototype.showAdView = function (adConfig) {
        InnerWebPlatform.jsCall('showAdView', adConfig);
    };
    InnerWebPlatform.prototype.loadAdSdk = function (adConfig) {
        InnerWebPlatform.jsCall('loadAdSdk', adConfig, function () { });
    };
    InnerWebPlatform.prototype.showAd = function (adConfig) {
        InnerWebPlatform.jsCall('showAd', adConfig);
    };
    InnerWebPlatform.prototype.enableUploadAdSdkStatistic = function (args) {
        InnerWebPlatform.jsCall('enableUploadAdSdkStatistic', args);
    };
    InnerWebPlatform.prototype.launchSceneSdkPage = function (args) {
        InnerWebPlatform.jsCall('launchSceneSdkPage', args);
    };
    InnerWebPlatform.prototype.signRequestBody = function (args, callback) {
        // cc.log("args : " + args)
        InnerWebPlatform.jsCall("signRequestBody", { data: args }, function (result) {
            callback(JSON.parse(result).data);
        });
    };
    InnerWebPlatform.prototype.getNetworkState = function (callback) {
        InnerWebPlatform.jsCall("getNetworkState", {}, function (state) {
            callback(state);
        });
    };
    //todo 要改
    InnerWebPlatform.prototype.isDebug = function () {
        return true;
    };
    //todo 要改
    InnerWebPlatform.prototype.isTestServer = function () {
        return false;
    };
    InnerWebPlatform.prototype.recordLog = function (tag, content) {
    };
    /**
     * 打开新人红包
     */
    InnerWebPlatform.prototype.OpenNewBirdRed = function (callback) {
        InnerWebPlatform.jsCall('OpenNewBirdRed');
    };
    /**
     * 消除时打开游戏内红包
     * @param type ("1 全屏广告3秒关闭 2 激励视频 看完可关闭 3 不看广告")
     * @param adid 全屏广告或激励视频的广告id
     */
    InnerWebPlatform.prototype.OpenGameRed = function (type, adid, callback) {
        var obj = {
            'type': type,
            'adid': adid,
        };
        InnerWebPlatform.jsCall('OpenGameRed', obj);
    };
    /**
     * 打开余额弹窗
     * @param callback
     */
    InnerWebPlatform.prototype.OpenBalanceDialog = function (callback) {
        InnerWebPlatform.jsCall('OpenBalanceDialog', {}, callback);
    };
    /**
     * 获取用户余额
     * @param callback
     */
    InnerWebPlatform.prototype.ReqBalance = function (callback) {
        InnerWebPlatform.jsCall('ReqBalance', {}, callback);
    };
    /**
     * 获取用户信息
     */
    InnerWebPlatform.prototype.ReqUserInfo = function (callback) {
        InnerWebPlatform.jsCall('ReqUserInfo', {}, callback);
    };
    /**
     * 展示通用弹窗
     */
    InnerWebPlatform.prototype.OpenGeneralDialog = function (coin, multiple, callback) {
        var obj = {
            'coin': coin,
            'multiple': multiple,
        };
        if (coin >= 200) {
            obj.exchangeMoney = coin / 10000.0;
        }
        InnerWebPlatform.jsCall('ReqUserInfo', obj, callback);
    };
    /**
     * 震动
     * @param time 时长
     */
    InnerWebPlatform.prototype.setVibrator = function (time, callback) {
        var obj = {
            'time': time,
        };
        InnerWebPlatform.jsCall('setVibrator', obj, callback);
    };
    /**
     * 提交埋点
     * @param obj 神策参数
     * @param callback 回调
     */
    InnerWebPlatform.prototype.track = function (obj, callback) {
        InnerWebPlatform.jsCall('track', obj, callback);
    };
    /**
     * 提交预置属性
     * @param obj 神策参数
     * @param callback 回调
     */
    InnerWebPlatform.prototype.trackUserProperties = function (obj, callback) {
        InnerWebPlatform.jsCall('trackUserProperties', obj, callback);
    };
    /**
     * 消除启动黑屏
     */
    InnerWebPlatform.prototype.finishCocosLaunch = function () {
        InnerWebPlatform.jsCall('finishCocosLaunch');
    };
    /**
     * 更新当前无尽等级
     * @param current_level 等级
     * @param callback 回调
     */
    InnerWebPlatform.prototype.updateCurrentLevel = function (current_level, callback) {
        var obj = {
            'current_level': current_level
        };
        InnerWebPlatform.jsCall('updateCurrentLevel', obj, callback);
    };
    /**
     * 更新当前闯关等级
     * @param current_pass_level 过关等级
     * @param callback 回调
     */
    InnerWebPlatform.prototype.updateCurrentPassLevel = function (current_pass_level, callback) {
        var obj = {
            'current_pass_level': current_pass_level
        };
        InnerWebPlatform.jsCall('updateCurrentPassLevel', obj, callback);
    };
    /*
     * 获取刘海高度
     */
    InnerWebPlatform.prototype.getLiuHaiHeight = function () {
        return InnerWebPlatform.jsCall("getLiuHaiHeight", {});
    };
    /**
     * 退出游戏
     */
    InnerWebPlatform.prototype.exitGame = function () {
        InnerWebPlatform.jsCall("exitGame", {});
    };
    /**
     * 设置是否监听虚拟键点击事件
     */
    InnerWebPlatform.prototype.enableOnBackpressed = function (enable) {
        var obj = {
            'enable': enable
        };
        InnerWebPlatform.jsCall('enableOnBackpressed', obj, null);
    };
    /**
     * 获取网络状态
     * @returns {boolean} false无网络
     */
    InnerWebPlatform.prototype.isNetworkConnected = function () {
        return InnerWebPlatform.jsCall("isNetworkConnected", {});
    };
    InnerWebPlatform.prototype.notifyConfig = function () { };
    return InnerWebPlatform;
}());
exports.default = InnerWebPlatform;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBZGFwdGVyXFxJbm5lcldlYlBsYXRmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQThDO0FBSzlDLDZDQUE0QztBQUM1QyxrQ0FBNEI7QUFFNUI7O0dBRUc7QUFDSDtJQUFBO0lBd1BBLENBQUM7SUF0UEc7Ozs7O09BS0c7SUFDSCwrQkFBSSxHQUFKLFVBQUssUUFBZ0IsRUFBRSxNQUFZLEVBQUUsUUFBbUI7UUFDcEQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxPQUFPO0lBQ0EsdUJBQU0sR0FBYixVQUFjLFVBQVUsRUFBRSxJQUFLLEVBQUUsRUFBRztRQUNoQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLCtCQUFjLEdBQXJCLFVBQXNCLElBQUk7UUFDdEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxlQUFlLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLElBQUk7WUFBRSxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsMENBQWUsR0FBZjtRQUNJLElBQUksTUFBTSxHQUFH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SSxPQUFPLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxtQ0FBUSxHQUFSO1FBQ0ksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Q7O09BRUc7SUFDSCw4Q0FBbUIsR0FBbkIsVUFBb0IsTUFBZTtRQUMvQixJQUFJLEdBQUcsR0FBRztZQUNOLFFBQVEsRUFBRSxNQUFNO1NBQ25CLENBQUE7UUFDRCxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFDRDs7O09BR0c7SUFDSCw2Q0FBa0IsR0FBbEI7UUFDSSxPQUFPLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0QsdUNBQVksR0FBWixjQUFlLENBQUM7SUFDcEIsdUJBQUM7QUFBRCxDQXhQQSxBQXdQQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElQbGF0Zm9ybSBmcm9tIFwiLi9CYXNlL0lQbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgSnNCcmlkZ2UgZnJvbSAnLi9CcmlkZ2UvSnNCcmlkZ2UnO1xuaW1wb3J0IENvbW1vblNldHRpbmdUeXBlIGZyb20gXCIuL1R5cGUvQ29tbW9uU2V0dGluZ1R5cGVcIjtcbmltcG9ydCBMYXVuY2hTZGtQYWdlVHlwZSBmcm9tIFwiLi9UeXBlL0xhdW5jaFNka1BhZ2VUeXBlXCI7XG5pbXBvcnQgQWRDb25maWdUeXBlIGZyb20gXCIuL1R5cGUvQWRDb25maWdUeXBlXCI7XG5pbXBvcnQge0xvYWRBZFZpZXdDb25maWdUeXBlLCBTaG93QWRWaWV3Q29uZmlnVHlwZX0gZnJvbSBcIi4vVHlwZS9BZFZpZXdDb25maWdcIjtcbmltcG9ydCB7IEFwcEluZm8gfSBmcm9tIFwiLi4vQ29uZmlnL0FwcEluZm9cIjtcbmltcG9ydCBtb2NrIGZyb20gXCIuLi9tb2NrMVwiO1xuXG4vKipcbiAqIOW6lOeUqOWGheeahOa1j+iniOWZqFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbm5lcldlYlBsYXRmb3JtIGltcGxlbWVudHMgSVBsYXRmb3JtIHtcblxuICAgIC8qKlxuICAgICAqIOS4jlNES+S6pOS6kumAmuS/oVxuICAgICAqIEBwYXJhbSBmdW5jTmFtZSDmlrnms5XlkI1cbiAgICAgKiBAcGFyYW0gcGFyYW1zIOWPguaVsFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICBjYWxsKGZ1bmNOYW1lOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gSnNCcmlkZ2UuY2FsbCgnY2FsbCcsIHsnbWV0aG9kTmFtZSc6ZnVuY05hbWUsICdhcmdzJzogcGFyYW1zfSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8vIOiwg+eUqOaWueazlVxuICAgIHN0YXRpYyBqc0NhbGwobWV0aG9kTmFtZSwgYXJncz8sIGNiPyk6YW55e1xuICAgICAgICByZXR1cm4gSnNCcmlkZ2UuY2FsbCgnY2FsbCcsIHsnbWV0aG9kTmFtZSc6bWV0aG9kTmFtZSwgJ2FyZ3MnOiBhcmdzfSwgY2IpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRRdWVyeVN0cmluZyhuYW1lKTogc3RyaW5nIHtcbiAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoXnwmKVwiICsgbmFtZSArIFwiPShbXiZdKikoJnwkKVwiKTtcbiAgICAgICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xuICAgICAgICBpZiAociAhPSBudWxsKSByZXR1cm4gdW5lc2NhcGUoclsyXSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldEFkaGVhZFN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBsZXQgYWRIZWFkID0gSW5uZXJXZWJQbGF0Zm9ybS5qc0NhbGwoJ2NyZWF0ZVJlcXVlc3RIZWFkZXJTdHInLCB7fSk7XG4gICAgICAgIGlmICghYWRIZWFkIHx8IGFkSGVhZCA9PSBcIlwiKSB7XG4gICAgICAgICAgICBsZXQgYWRIZWFkID0gSW5uZXJXZWJQbGF0Zm9ybS5nZXRRdWVyeVN0cmluZyhcImFkaGVhZFwiKTtcbiAgICAgICAgICAgIGlmIChhZEhlYWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCLpk77mjqXkuIrluKZhZGhlYWTlj4LmlbBcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIuS6pOS6kuaWueazleaLv+S4jeWIsGFkaGVhZCAtLS0g6ZO+5o6l5LiK5rKh5pyJ5bimYWRoZWFk5Y+C5pWwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhZEhlYWQ7XG4gICAgfVxuXG4gICAgZ2V0UGhlYWRTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgaWYoQXBwSW5mby5pc0xvY2FsKXtcbiAgICAgICAgICAgIHJldHVybiBtb2NrLlBIRUFEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbChcImdldFBoZWFkU3RyaW5nXCIsIHt9KTtcbiAgICB9XG5cbiAgICBlbmFibGVPblJlc3VtZU9uUGF1c2UoYXJnczogQ29tbW9uU2V0dGluZ1R5cGUpIHtcbiAgICAgICAgSW5uZXJXZWJQbGF0Zm9ybS5qc0NhbGwoJ2VuYWJsZU9uUmVzdW1lT25QYXVzZScsIGFyZ3MpO1xuICAgIH1cblxuICAgIGhpZGVBZFZpZXcoYWRDb25maWc6IEFkQ29uZmlnVHlwZSkge1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgnaGlkZUFkVmlldycsIGFkQ29uZmlnKTtcbiAgICB9XG5cbiAgICBsb2FkQWRWaWV3KGFkQ29uZmlnOiBMb2FkQWRWaWV3Q29uZmlnVHlwZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgnbG9hZEFkVmlldycsIGFkQ29uZmlnKTtcbiAgICB9XG5cbiAgICBzaG93QWRWaWV3KGFkQ29uZmlnOiBTaG93QWRWaWV3Q29uZmlnVHlwZSkge1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgnc2hvd0FkVmlldycsIGFkQ29uZmlnKTtcbiAgICB9XG5cbiAgICBsb2FkQWRTZGsoYWRDb25maWc6IEFkQ29uZmlnVHlwZSkge1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgnbG9hZEFkU2RrJywgYWRDb25maWcsICgpID0+IHt9KTtcbiAgICB9XG5cbiAgICBzaG93QWQoYWRDb25maWc6IEFkQ29uZmlnVHlwZSkge1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgnc2hvd0FkJywgYWRDb25maWcpO1xuICAgIH1cblxuICAgIGVuYWJsZVVwbG9hZEFkU2RrU3RhdGlzdGljKGFyZ3M6IENvbW1vblNldHRpbmdUeXBlKSB7XG4gICAgICAgIElubmVyV2ViUGxhdGZvcm0uanNDYWxsKCdlbmFibGVVcGxvYWRBZFNka1N0YXRpc3RpYycsIGFyZ3MpO1xuICAgIH1cblxuICAgIGxhdW5jaFNjZW5lU2RrUGFnZShhcmdzOiBMYXVuY2hTZGtQYWdlVHlwZSkge1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgnbGF1bmNoU2NlbmVTZGtQYWdlJywgYXJncyk7XG4gICAgfVxuXG4gICAgc2lnblJlcXVlc3RCb2R5KGFyZ3M6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIC8vIGNjLmxvZyhcImFyZ3MgOiBcIiArIGFyZ3MpXG4gICAgICAgIElubmVyV2ViUGxhdGZvcm0uanNDYWxsKFwic2lnblJlcXVlc3RCb2R5XCIsIHtkYXRhIDogYXJnc30sIChyZXN1bHQpPT57XG4gICAgICAgICAgICBjYWxsYmFjayhKU09OLnBhcnNlKHJlc3VsdCkuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE5ldHdvcmtTdGF0ZShjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgSW5uZXJXZWJQbGF0Zm9ybS5qc0NhbGwoXCJnZXROZXR3b3JrU3RhdGVcIiwge30sIChzdGF0ZSk9PntcbiAgICAgICAgICAgIGNhbGxiYWNrKHN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy90b2RvIOimgeaUuVxuICAgIGlzRGVidWcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vdG9kbyDopoHmlLlcbiAgICBpc1Rlc3RTZXJ2ZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZWNvcmRMb2codGFnOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJk+W8gOaWsOS6uue6ouWMhVxuICAgICAqL1xuICAgIE9wZW5OZXdCaXJkUmVkKGNhbGxiYWNrPzogRnVuY3Rpb24pe1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgnT3Blbk5ld0JpcmRSZWQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmtojpmaTml7bmiZPlvIDmuLjmiI/lhoXnuqLljIVcbiAgICAgKiBAcGFyYW0gdHlwZSAoXCIxIOWFqOWxj+W5v+WRijPnp5LlhbPpl60gMiDmv4DlirHop4bpopEg55yL5a6M5Y+v5YWz6ZetIDMg5LiN55yL5bm/5ZGKXCIpXG4gICAgICogQHBhcmFtIGFkaWQg5YWo5bGP5bm/5ZGK5oiW5r+A5Yqx6KeG6aKR55qE5bm/5ZGKaWRcbiAgICAgKi9cbiAgICBPcGVuR2FtZVJlZCh0eXBlOiBudW1iZXIsIGFkaWQ6IG51bWJlciwgY2FsbGJhY2s/OiBGdW5jdGlvbil7XG4gICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAndHlwZSc6IHR5cGUsXG4gICAgICAgICAgICAnYWRpZCc6IGFkaWQsXG4gICAgICAgIH1cbiAgICAgICAgSW5uZXJXZWJQbGF0Zm9ybS5qc0NhbGwoJ09wZW5HYW1lUmVkJywgb2JqKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiZPlvIDkvZnpop3lvLnnqpdcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAgICovXG4gICAgT3BlbkJhbGFuY2VEaWFsb2coY2FsbGJhY2s6IEZ1bmN0aW9uKXtcbiAgICAgICAgSW5uZXJXZWJQbGF0Zm9ybS5qc0NhbGwoJ09wZW5CYWxhbmNlRGlhbG9nJywge30sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnlKjmiLfkvZnpop1cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBSZXFCYWxhbmNlKGNhbGxiYWNrOiBGdW5jdGlvbil7XG4gICAgICAgIElubmVyV2ViUGxhdGZvcm0uanNDYWxsKCdSZXFCYWxhbmNlJywge30sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnlKjmiLfkv6Hmga9cbiAgICAgKi9cbiAgICBSZXFVc2VySW5mbyhjYWxsYmFjazogRnVuY3Rpb24pe1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgnUmVxVXNlckluZm8nLCB7fSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiDlsZXnpLrpgJrnlKjlvLnnqpdcbiAgICAgKi9cbiAgICBPcGVuR2VuZXJhbERpYWxvZyhjb2luOiBudW1iZXIsIG11bHRpcGxlOiBudW1iZXIsIGNhbGxiYWNrPzogRnVuY3Rpb24pe1xuICAgICAgICB2YXIgb2JqOiBhbnkgPSB7XG4gICAgICAgICAgICAnY29pbic6IGNvaW4sXG4gICAgICAgICAgICAnbXVsdGlwbGUnOiBtdWx0aXBsZSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY29pbiA+PSAyMDApe1xuICAgICAgICAgICAgIG9iai5leGNoYW5nZU1vbmV5ID0gY29pbiAvIDEwMDAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIElubmVyV2ViUGxhdGZvcm0uanNDYWxsKCdSZXFVc2VySW5mbycsIG9iaiwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmch+WKqFxuICAgICAqIEBwYXJhbSB0aW1lIOaXtumVv1xuICAgICAqL1xuICAgIHNldFZpYnJhdG9yKHRpbWU6IG51bWJlciwgY2FsbGJhY2s/OiBGdW5jdGlvbil7XG4gICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAndGltZSc6IHRpbWUsXG4gICAgICAgIH1cbiAgICAgICAgSW5uZXJXZWJQbGF0Zm9ybS5qc0NhbGwoJ3NldFZpYnJhdG9yJywgb2JqLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+Q5Lqk5Z+L54K5XG4gICAgICogQHBhcmFtIG9iaiDnpZ7nrZblj4LmlbBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDXG4gICAgICovXG4gICAgdHJhY2sob2JqOmFueSwgY2FsbGJhY2s/OiBGdW5jdGlvbil7XG4gICAgICAgIElubmVyV2ViUGxhdGZvcm0uanNDYWxsKCd0cmFjaycsIG9iaiwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmj5DkuqTpooTnva7lsZ7mgKdcbiAgICAgKiBAcGFyYW0gb2JqIOelnuetluWPguaVsFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICB0cmFja1VzZXJQcm9wZXJ0aWVzKG9iajphbnksIGNhbGxiYWNrPzogRnVuY3Rpb24pe1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgndHJhY2tVc2VyUHJvcGVydGllcycsIG9iaiwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa2iOmZpOWQr+WKqOm7keWxj1xuICAgICAqL1xuICAgIGZpbmlzaENvY29zTGF1bmNoKCl7XG4gICAgICAgIElubmVyV2ViUGxhdGZvcm0uanNDYWxsKCdmaW5pc2hDb2Nvc0xhdW5jaCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOW9k+WJjeaXoOWwveetiee6p1xuICAgICAqIEBwYXJhbSBjdXJyZW50X2xldmVsIOetiee6p1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICB1cGRhdGVDdXJyZW50TGV2ZWwoY3VycmVudF9sZXZlbDogbnVtYmVyLCBjYWxsYmFjaz86IEZ1bmN0aW9uKXtcbiAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICdjdXJyZW50X2xldmVsJzogY3VycmVudF9sZXZlbFxuICAgICAgICB9XG4gICAgICAgIElubmVyV2ViUGxhdGZvcm0uanNDYWxsKCd1cGRhdGVDdXJyZW50TGV2ZWwnLCBvYmosIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDlvZPliY3pl6/lhbPnrYnnuqdcbiAgICAgKiBAcGFyYW0gY3VycmVudF9wYXNzX2xldmVsIOi/h+WFs+etiee6p1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKi9cbiAgICB1cGRhdGVDdXJyZW50UGFzc0xldmVsKGN1cnJlbnRfcGFzc19sZXZlbDpudW1iZXIsIGNhbGxiYWNrPzogRnVuY3Rpb24pe1xuICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgJ2N1cnJlbnRfcGFzc19sZXZlbCc6IGN1cnJlbnRfcGFzc19sZXZlbFxuICAgICAgICB9XG4gICAgICAgIElubmVyV2ViUGxhdGZvcm0uanNDYWxsKCd1cGRhdGVDdXJyZW50UGFzc0xldmVsJywgb2JqLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qXG4gICAgICog6I635Y+W5YiY5rW36auY5bqmXG4gICAgICovXG4gICAgZ2V0TGl1SGFpSGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbChcImdldExpdUhhaUhlaWdodFwiLCB7fSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAgOWHuua4uOaIj1xuICAgICAqL1xuICAgIGV4aXRHYW1lKCkge1xuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbChcImV4aXRHYW1lXCIsIHt9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u5piv5ZCm55uR5ZCs6Jma5ouf6ZSu54K55Ye75LqL5Lu2XG4gICAgICovXG4gICAgZW5hYmxlT25CYWNrcHJlc3NlZChlbmFibGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICdlbmFibGUnOiBlbmFibGVcbiAgICAgICAgfVxuICAgICAgICBJbm5lcldlYlBsYXRmb3JtLmpzQ2FsbCgnZW5hYmxlT25CYWNrcHJlc3NlZCcsIG9iaiwgbnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPlue9kee7nOeKtuaAgVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBmYWxzZeaXoOe9kee7nFxuICAgICAqL1xuICAgIGlzTmV0d29ya0Nvbm5lY3RlZCgpe1xuICAgICAgICByZXR1cm4gSW5uZXJXZWJQbGF0Zm9ybS5qc0NhbGwoXCJpc05ldHdvcmtDb25uZWN0ZWRcIiwge30pO1xuICAgIH1cbiAgICBub3RpZnlDb25maWcoKXt9XG59Il19