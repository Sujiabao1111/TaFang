
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
/**
 * 爱消除环境配置
 */
var MD5 = require("../Utils/md5");
//web版本号，每次发版本修改
exports.WebVersionCode = 103001; //1030是安卓的，01是客户端的
//是否本地开发,上线前需要改成false
var isLocal = cc.sys.os != cc.sys.OS_ANDROID;
// 是否为测试服,上线前需要改成false
var isTest = true;
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
    var sign = MD5(encodeURIComponent("prdId=" + prdId + "&deviceId=" + deviceId + "&timestamp=" + timestamp + "&key=" + KEY));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxDb25maWdcXEFwcEluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCxrQ0FBb0M7QUFDcEMsZ0JBQWdCO0FBQ0gsUUFBQSxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQU8sa0JBQWtCO0FBQzlELHFCQUFxQjtBQUNyQixJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUMvQyxzQkFBc0I7QUFDdEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFNBQVM7QUFDVCxJQUFNLE9BQU8sR0FBRyxVQUFVLE9BQU87SUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFFbkYsQ0FBQyxDQUFBO0FBQ0QsU0FBUztBQUNULElBQU0sVUFBVSxHQUFHLFVBQVUsT0FBTztJQUNoQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNyRixDQUFDLENBQUE7QUFFRCxJQUFNLFVBQVUsR0FBRyxVQUFVLE9BQU87SUFDaEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUE7QUFDRCxTQUFTO0FBQ1QsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBRTNCLElBQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFDO0FBQy9CLElBQU0sT0FBTyxHQUFHO0lBQ1osS0FBSyxFQUFFLElBQUk7SUFDWCxJQUFJLEVBQUUsR0FBRztJQUNULE9BQU8sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQzNCLGFBQWEs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QUMsQ0FBQztZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2pDO0tBQ0o7SUFDRCxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFFbkMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3pCLENBQUMsQ0FBQTtBQUdzQyw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog54ix5raI6Zmk546v5aKD6YWN572uXG4gKi9cbmltcG9ydCAqIGFzIE1ENSBmcm9tICcuLi9VdGlscy9tZDUnO1xuLy93ZWLniYjmnKzlj7fvvIzmr4/mrKHlj5HniYjmnKzkv67mlLlcbmV4cG9ydCBjb25zdCBXZWJWZXJzaW9uQ29kZSA9IDEwMzAwMTsgICAgICAgLy8xMDMw5piv5a6J5Y2T55qE77yMMDHmmK/lrqLmiLfnq6/nmoRcbi8v5piv5ZCm5pys5Zyw5byA5Y+RLOS4iue6v+WJjemcgOimgeaUueaIkGZhbHNlXG5jb25zdCBpc0xvY2FsID0gY2Muc3lzLm9zICE9IGNjLnN5cy5PU19BTkRST0lEO1xuLy8g5piv5ZCm5Li65rWL6K+V5pyNLOS4iue6v+WJjemcgOimgeaUueaIkGZhbHNlXG5jb25zdCBpc1Rlc3QgPSB0cnVlO1xuLy/nvZHpobXnmoRob3N0XG5jb25zdCBnZXRIb3N0ID0gZnVuY3Rpb24gKGhhc1Rlc3QpIHtcbiAgICByZXR1cm4gKGhhc1Rlc3QgPyAnaHR0cHM6Ly9maW5ldmlkZW8uamlkaWFuZGlhbi5jbicgOiAnaHR0cHM6Ly9qaWRpYW5kaWFuLmNuJyk7XG5cbn1cbi8v5a6i5oi356uvSG9zdFxuY29uc3QgZ2V0QXBwSG9zdCA9IGZ1bmN0aW9uIChoYXNUZXN0KSB7XG4gICAgcmV0dXJuIChoYXNUZXN0ID8gJ2h0dHBzOi8vdGVzdGFwaS5qaWRpYW5kaWFuLmNuJyA6ICdodHRwczovL2FwaS5qaWRpYW5kaWFuLmNuJyk7XG59XG5cbmNvbnN0IGdldEFwcE5hbWUgPSBmdW5jdGlvbiAoaGFzVGVzdCkge1xuICAgIHJldHVybiAoaGFzVGVzdCA/IFwiRGVidWdcIiA6IFwiUmVsZWFzZVwiKTtcbn1cbi8vIOaYr+WQpuWKoOWvhuaVsOaNrlxuY29uc3QgaXNFbmNyeXB0RGF0YSA9IHRydWU7XG5cbmNvbnN0IEtFWSA9ICd4a1gyQWIxUDNLdUkyMTRWJztcbmNvbnN0IEFwcEluZm8gPSB7XG4gICAgcHJkSWQ6IG51bGwsXG4gICAgY29kZTogXCIzXCIsICAvLyDmnI3liqHlmajniYjmnKzljLrliIZcbiAgICBhcHBOYW1lOiBnZXRBcHBOYW1lKGlzVGVzdCksXG4gICAgaXNFbmNyeXB0RGF0YTogaXNFbmNyeXB0RGF0YSxcbiAgICB2ZXJzaW9uOiBcIjEuMC4xXCIsXG4gICAgaXNUZXN0OiBpc1Rlc3QsXG4gICAgaG9zdDogZ2V0SG9zdChpc1Rlc3QpLFxuICAgIGFwcEhvc3Q6IGdldEFwcEhvc3QoaXNUZXN0KSxcbiAgICBhZEhlYWQ6IG51bGwsXG4gICAgcGhlYWQ6IG51bGwsXG4gICAgaXNMb2NhbCxcblxufTtcblxuLy/orr7nva7mtYvor5Uv5q2j5byP5pyNXG5jb25zdCBzZXRVcFRlc3RpbmcgPSBmdW5jdGlvbiAoaGFzVGVzdCkge1xuICAgIC8vIGhhc1Rlc3QgPSBmYWxzZVxuICAgIEFwcEluZm8uYXBwTmFtZSA9IGdldEFwcE5hbWUoaGFzVGVzdCk7XG4gICAgQXBwSW5mby5pc1Rlc3QgPSBoYXNUZXN0O1xuICAgIEFwcEluZm8uaG9zdCA9IGdldEhvc3QoaGFzVGVzdCk7XG4gICAgQXBwSW5mby5hcHBIb3N0ID0gZ2V0QXBwSG9zdChoYXNUZXN0KTtcbn1cbi8v6I635Y+WcGhlYWQgXG5jb25zdCBnZXRQaGVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgcGhlYWQgPSBBcHBJbmZvLnBoZWFkO1xuICAgIGlmICh0eXBlb2YgQXBwSW5mby5waGVhZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgcGhlYWQgPSBKU09OLnBhcnNlKHBoZWFkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9jb25zb2xlLmxvZyhcInBoZWFkXCIsSlNPTi5zdHJpbmdpZnkocGhlYWQpKVxuICAgIHJldHVybiBwaGVhZDtcbn1cbi8v6I635Y+WYWRIZWFkXG5jb25zdCBnZXRBZEhlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGNsaWVudEFkSGVhZCA9IEFwcEluZm8uYWRIZWFkO1xuXG4gICAgaWYgKHR5cGVvZiBjbGllbnRBZEhlYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjbGllbnRBZEhlYWQgPSBKU09OLnBhcnNlKGNsaWVudEFkSGVhZCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIuiOt+WPlmFkSGVhZOWHuumUmVwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcign6I635Y+WYWRIZWFk5Ye66ZSZJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgICBwcmRJZCxcbiAgICAgICAgZGV2aWNlSWQsXG4gICAgfSA9IGNsaWVudEFkSGVhZCB8fCB7fTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBoZWFkID0gZ2V0UGhlYWQoKSB8fCB7fTtcbiAgICBjb25zdCBzaWduID0gTUQ1KGVuY29kZVVSSUNvbXBvbmVudChgcHJkSWQ9JHtwcmRJZH0mZGV2aWNlSWQ9JHtkZXZpY2VJZH0mdGltZXN0YW1wPSR7dGltZXN0YW1wfSZrZXk9JHtLRVl9YCkpO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShPYmplY3QuYXNzaWduKGNsaWVudEFkSGVhZCwgeyBcInRpbWVzdGFtcFwiOiB0aW1lc3RhbXAsIFwic2lnbmF0dXJlXCI6IHNpZ24sIFwidG9rZW5cIjogcGhlYWQuYWNjZXNzX3Rva2VuIHx8ICcnIH0pKTtcblxufVxuY29uc3QgZ2V0UHJkSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKEFwcEluZm8ucHJkSWQpIHJldHVybiBBcHBJbmZvLnByZElkO1xuXG4gICAgbGV0IGNsaWVudEFkSGVhZCA9IEFwcEluZm8uYWRIZWFkO1xuICAgIGlmICh0eXBlb2YgY2xpZW50QWRIZWFkID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2xpZW50QWRIZWFkID0gSlNPTi5wYXJzZShjbGllbnRBZEhlYWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjYy5sb2coXCLojrflj5ZhZEhlYWTlh7rplJlcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+iOt+WPlmFkSGVhZOWHuumUmScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIEFwcEluZm8ucHJkSWQgPSBjbGllbnRBZEhlYWQucHJkSWQ7XG5cbiAgICByZXR1cm4gQXBwSW5mby5wcmRJZDtcbn1cblxuXG5leHBvcnQgeyBBcHBJbmZvLCBnZXRBZEhlYWQsIGdldFBoZWFkLCBnZXRQcmRJZCwgc2V0VXBUZXN0aW5nIH07Il19