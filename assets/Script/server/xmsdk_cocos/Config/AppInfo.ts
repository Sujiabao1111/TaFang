/**
 * 爱消除环境配置
 */
import * as MD5 from '../Utils/md5';
//web版本号，每次发版本修改
export const WebVersionCode = 103001;       //1030是安卓的，01是客户端的
//是否本地开发,上线前需要改成false
const isLocal = cc.sys.os != cc.sys.OS_ANDROID;
// 是否为测试服,上线前需要改成false
const isTest = true;
//网页的host
const getHost = function (hasTest) {
    return (hasTest ? 'https://finevideo.jidiandian.cn' : 'https://jidiandian.cn');

}
//客户端Host
const getAppHost = function (hasTest) {
    return (hasTest ? 'https://testapi.jidiandian.cn' : 'https://api.jidiandian.cn');
}

const getAppName = function (hasTest) {
    return (hasTest ? "Debug" : "Release");
}
// 是否加密数据
const isEncryptData = true;

const KEY = 'xkX2Ab1P3KuI214V';
const AppInfo = {
    prdId: null,
    code: "3",  // 服务器版本区分
    appName: getAppName(isTest),
    isEncryptData: isEncryptData,
    version: "1.0.1",
    isTest: isTest,
    host: getHost(isTest),
    appHost: getAppHost(isTest),
    adHead: null,
    phead: null,
    isLocal,

};

//设置测试/正式服
const setUpTesting = function (hasTest) {
    // hasTest = false
    AppInfo.appName = getAppName(hasTest);
    AppInfo.isTest = hasTest;
    AppInfo.host = getHost(hasTest);
    AppInfo.appHost = getAppHost(hasTest);
}
//获取phead 
const getPhead = function () {
    let phead = AppInfo.phead;
    if (typeof AppInfo.phead === 'string') {
        try {

            phead = JSON.parse(phead);
        } catch (e) {
            throw new Error(e);
        }
    }

    //console.log("phead",JSON.stringify(phead))
    return phead;
}
//获取adHead
const getAdHead = function () {
    let clientAdHead = AppInfo.adHead;

    if (typeof clientAdHead === 'string') {
        try {
            clientAdHead = JSON.parse(clientAdHead);
        } catch (e) {
            cc.log("获取adHead出错");
            throw new Error('获取adHead出错');
        }
    }
    const {
        prdId,
        deviceId,
    } = clientAdHead || {};
    const timestamp = Date.now();
    const phead = getPhead() || {};
    const sign = MD5(encodeURIComponent(`prdId=${prdId}&deviceId=${deviceId}&timestamp=${timestamp}&key=${KEY}`));
    return JSON.stringify(Object.assign(clientAdHead, { "timestamp": timestamp, "signature": sign, "token": phead.access_token || '' }));

}
const getPrdId = function () {
    if (AppInfo.prdId) return AppInfo.prdId;

    let clientAdHead = AppInfo.adHead;
    if (typeof clientAdHead === 'string') {
        try {
            clientAdHead = JSON.parse(clientAdHead);
        } catch (e) {
            cc.log("获取adHead出错");
            throw new Error('获取adHead出错');
        }
    }
    AppInfo.prdId = clientAdHead.prdId;

    return AppInfo.prdId;
}


export { AppInfo, getAdHead, getPhead, getPrdId, setUpTesting };