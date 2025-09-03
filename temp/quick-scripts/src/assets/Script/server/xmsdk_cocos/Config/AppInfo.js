"use strict";
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