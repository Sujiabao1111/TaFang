
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Config/AppInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ae022IulnhLSqORlvb+3v/K', 'AppInfo');
// Script/server/xmsdk_cocos/Config/AppInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpTesting = exports.getPrdId = exports.getPhead = exports.getAdHead = exports.AppInfo = exports.WebVersionCode = void 0;
//web版本号，每次发版本修改
exports.WebVersionCode = 103001; //1030是安卓的，01是客户端的
//是否本地开发,上线前需要改成false
var isLocal = cc.sys.os != cc.sys.OS_ANDROID;
// 是否为测试服,上线前需要改成false
var isTest = false;
//网页的host
var getHost = function (hasTest) {
    return (hasTest ? 'https://finevideo.jidiandian.cn' : 'https://jidiandian.cn');
};
//客户端Host
var getAppHost = function (hasTest) {
    return (hasTest ? 'https://testapi.jidiandian.cn' : 'https://api.jidiandian.cn');
};
var getAppName = function (hasTest) {
    return (hasTest ? "Debug" : "Release");
};
// 是否加密数据
var isEncryptData = true;
var KEY = 'xkX2Ab1P3KuI214V';
var AppInfo = {
    prdId: null,
    code: "3",
    appName: getAppName(isTest),
    isEncryptData: isEncryptData,
    version: "1.0.1",
    isTest: isTest,
    host: getHost(isTest),
    appHost: getAppHost(isTest),
    adHead: null,
    phead: null,
    isLocal: isLocal,
};
exports.AppInfo = AppInfo;
//设置测试/正式服
var setUpTesting = function (hasTest) {
    // hasTest = false
    AppInfo.appName = getAppName(hasTest);
    AppInfo.isTest = hasTest;
    AppInfo.host = getHost(hasTest);
    AppInfo.appHost = getAppHost(hasTest);
};
exports.setUpTesting = setUpTesting;
//获取phead 
var getPhead = function () {
    var phead = AppInfo.phead;
    if (typeof AppInfo.phead === 'string') {
        try {
            phead = JSON.parse(phead);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    //console.log("phead",JSON.stringify(phead))
    return phead;
};
exports.getPhead = getPhead;
//获取adHead
var getAdHead = function () {
    var clientAdHead = AppInfo.adHead;
    if (typeof clientAdHead === 'string') {
        try {
            clientAdHead = JSON.parse(clientAdHead);
        }
        catch (e) {
            cc.log("获取adHead出错");
            throw new Error('获取adHead出错');
        }
    }
    var _a = clientAdHead || {}, prdId = _a.prdId, deviceId = _a.deviceId;
    var timestamp = Date.now();
    var phead = getPhead() || {};
    // const sign = MD5(encodeURIComponent(`prdId=${prdId}&deviceId=${deviceId}&timestamp=${timestamp}&key=${KEY}`));
    var sign = null;
    return JSON.stringify(Object.assign(clientAdHead, { "timestamp": timestamp, "signature": sign, "token": phead.access_token || '' }));
};
exports.getAdHead = getAdHead;
var getPrdId = function () {
    if (AppInfo.prdId)
        return AppInfo.prdId;
    var clientAdHead = AppInfo.adHead;
    if (typeof clientAdHead === 'string') {
        try {
            clientAdHead = JSON.parse(clientAdHead);
        }
        catch (e) {
            cc.log("获取adHead出错");
            throw new Error('获取adHead出错');
        }
    }
    AppInfo.prdId = clientAdHead.prdId;
    return AppInfo.prdId;
};
exports.getPrdId = getPrdId;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxDb25maWdcXEFwcEluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsZ0JBQWdCO0FBQ0gsUUFBQSxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQU8sa0JBQWtCO0FBQzlELHFCQUFxQjtBQUNyQixJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUMvQyxzQkFBc0I7QUFDdEIsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLFNBQVM7QUFDVCxJQUFNLE9BQU8sR0FBRyxVQUFVLE9BQU87SUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDbkYsQ0FBQyxDQUFBO0FBRUQsU0FBUztBQUNULElBQU0sVUFBVSxHQUFHLFVBQVUsT0FBTztJQUNoQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNyRixDQUFDLENBQUE7QUFFRCxJQUFNLFVBQVUsR0FBRyxVQUFVLE9BQU87SUFDaEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUE7QUFDRCxTQUFTO0FBQ1QsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBRTNCLElBQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFDO0FBQy9CLElBQU0sT0FBTyxHQUFHO0lBQ1osS0FBSyxFQUFFLElBQUk7SUFDWCxJQUFJLEVBQUUsR0FBRztJQUNULE9BQU8sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQzNCLGFBQWEsRUFBRSxhQUFhO0lBQzVCLE9BQU8sRUFB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R0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBRW5DLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQztBQUN6QixDQUFDLENBQUE7QUFHc0MsNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOeIsea2iOmZpOeOr+Wig+mFjee9rlxuICovXG5pbXBvcnQgKiBhcyBNRDUgZnJvbSAnLi4vVXRpbHMvbWQ1Jztcbi8vd2Vi54mI5pys5Y+377yM5q+P5qyh5Y+R54mI5pys5L+u5pS5XG5leHBvcnQgY29uc3QgV2ViVmVyc2lvbkNvZGUgPSAxMDMwMDE7ICAgICAgIC8vMTAzMOaYr+WuieWNk+eahO+8jDAx5piv5a6i5oi356uv55qEXG4vL+aYr+WQpuacrOWcsOW8gOWPkSzkuIrnur/liY3pnIDopoHmlLnmiJBmYWxzZVxuY29uc3QgaXNMb2NhbCA9IGNjLnN5cy5vcyAhPSBjYy5zeXMuT1NfQU5EUk9JRDtcbi8vIOaYr+WQpuS4uua1i+ivleacjSzkuIrnur/liY3pnIDopoHmlLnmiJBmYWxzZVxuY29uc3QgaXNUZXN0ID0gZmFsc2U7XG4vL+e9kemhteeahGhvc3RcbmNvbnN0IGdldEhvc3QgPSBmdW5jdGlvbiAoaGFzVGVzdCkge1xuICAgIHJldHVybiAoaGFzVGVzdCA/ICdodHRwczovL2ZpbmV2aWRlby5qaWRpYW5kaWFuLmNuJyA6ICdodHRwczovL2ppZGlhbmRpYW4uY24nKTtcbn1cblxuLy/lrqLmiLfnq69Ib3N0XG5jb25zdCBnZXRBcHBIb3N0ID0gZnVuY3Rpb24gKGhhc1Rlc3QpIHtcbiAgICByZXR1cm4gKGhhc1Rlc3QgPyAnaHR0cHM6Ly90ZXN0YXBpLmppZGlhbmRpYW4uY24nIDogJ2h0dHBzOi8vYXBpLmppZGlhbmRpYW4uY24nKTtcbn1cblxuY29uc3QgZ2V0QXBwTmFtZSA9IGZ1bmN0aW9uIChoYXNUZXN0KSB7XG4gICAgcmV0dXJuIChoYXNUZXN0ID8gXCJEZWJ1Z1wiIDogXCJSZWxlYXNlXCIpO1xufVxuLy8g5piv5ZCm5Yqg5a+G5pWw5o2uXG5jb25zdCBpc0VuY3J5cHREYXRhID0gdHJ1ZTtcblxuY29uc3QgS0VZID0gJ3hrWDJBYjFQM0t1STIxNFYnO1xuY29uc3QgQXBwSW5mbyA9IHtcbiAgICBwcmRJZDogbnVsbCxcbiAgICBjb2RlOiBcIjNcIiwgIC8vIOacjeWKoeWZqOeJiOacrOWMuuWIhlxuICAgIGFwcE5hbWU6IGdldEFwcE5hbWUoaXNUZXN0KSxcbiAgICBpc0VuY3J5cHREYXRhOiBpc0VuY3J5cHREYXRhLFxuICAgIHZlcnNpb246IFwiMS4wLjFcIixcbiAgICBpc1Rlc3Q6IGlzVGVzdCxcbiAgICBob3N0OiBnZXRIb3N0KGlzVGVzdCksXG4gICAgYXBwSG9zdDogZ2V0QXBwSG9zdChpc1Rlc3QpLFxuICAgIGFkSGVhZDogbnVsbCxcbiAgICBwaGVhZDogbnVsbCxcbiAgICBpc0xvY2FsLFxuXG59O1xuXG4vL+iuvue9rua1i+ivlS/mraPlvI/mnI1cbmNvbnN0IHNldFVwVGVzdGluZyA9IGZ1bmN0aW9uIChoYXNUZXN0KSB7XG4gICAgLy8gaGFzVGVzdCA9IGZhbHNlXG4gICAgQXBwSW5mby5hcHBOYW1lID0gZ2V0QXBwTmFtZShoYXNUZXN0KTtcbiAgICBBcHBJbmZvLmlzVGVzdCA9IGhhc1Rlc3Q7XG4gICAgQXBwSW5mby5ob3N0ID0gZ2V0SG9zdChoYXNUZXN0KTtcbiAgICBBcHBJbmZvLmFwcEhvc3QgPSBnZXRBcHBIb3N0KGhhc1Rlc3QpO1xufVxuXG4vL+iOt+WPlnBoZWFkIFxuY29uc3QgZ2V0UGhlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHBoZWFkID0gQXBwSW5mby5waGVhZDtcbiAgICBpZiAodHlwZW9mIEFwcEluZm8ucGhlYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwaGVhZCA9IEpTT04ucGFyc2UocGhlYWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2NvbnNvbGUubG9nKFwicGhlYWRcIixKU09OLnN0cmluZ2lmeShwaGVhZCkpXG4gICAgcmV0dXJuIHBoZWFkO1xufVxuXG4vL+iOt+WPlmFkSGVhZFxuY29uc3QgZ2V0QWRIZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBjbGllbnRBZEhlYWQgPSBBcHBJbmZvLmFkSGVhZDtcblxuICAgIGlmICh0eXBlb2YgY2xpZW50QWRIZWFkID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2xpZW50QWRIZWFkID0gSlNPTi5wYXJzZShjbGllbnRBZEhlYWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjYy5sb2coXCLojrflj5ZhZEhlYWTlh7rplJlcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+iOt+WPlmFkSGVhZOWHuumUmScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgICAgcHJkSWQsXG4gICAgICAgIGRldmljZUlkLFxuICAgIH0gPSBjbGllbnRBZEhlYWQgfHwge307XG4gICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBwaGVhZCA9IGdldFBoZWFkKCkgfHwge307XG4gICAgLy8gY29uc3Qgc2lnbiA9IE1ENShlbmNvZGVVUklDb21wb25lbnQoYHByZElkPSR7cHJkSWR9JmRldmljZUlkPSR7ZGV2aWNlSWR9JnRpbWVzdGFtcD0ke3RpbWVzdGFtcH0ma2V5PSR7S0VZfWApKTtcbiAgICBjb25zdCBzaWduID0gbnVsbDtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbihjbGllbnRBZEhlYWQsIHsgXCJ0aW1lc3RhbXBcIjogdGltZXN0YW1wLCBcInNpZ25hdHVyZVwiOiBzaWduLCBcInRva2VuXCI6IHBoZWFkLmFjY2Vzc190b2tlbiB8fCAnJyB9KSk7XG5cbn1cbmNvbnN0IGdldFByZElkID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChBcHBJbmZvLnByZElkKSByZXR1cm4gQXBwSW5mby5wcmRJZDtcblxuICAgIGxldCBjbGllbnRBZEhlYWQgPSBBcHBJbmZvLmFkSGVhZDtcbiAgICBpZiAodHlwZW9mIGNsaWVudEFkSGVhZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNsaWVudEFkSGVhZCA9IEpTT04ucGFyc2UoY2xpZW50QWRIZWFkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY2MubG9nKFwi6I635Y+WYWRIZWFk5Ye66ZSZXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfojrflj5ZhZEhlYWTlh7rplJknKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBBcHBJbmZvLnByZElkID0gY2xpZW50QWRIZWFkLnByZElkO1xuXG4gICAgcmV0dXJuIEFwcEluZm8ucHJkSWQ7XG59XG5cblxuZXhwb3J0IHsgQXBwSW5mbywgZ2V0QWRIZWFkLCBnZXRQaGVhZCwgZ2V0UHJkSWQsIHNldFVwVGVzdGluZyB9OyJdfQ==