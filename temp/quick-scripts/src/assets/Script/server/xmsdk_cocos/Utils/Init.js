"use strict";
cc._RF.push(module, '2967ce0PzVN67RmYJfqhhMW', 'Init');
// Script/server/xmsdk_cocos/Utils/Init.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameTs_1 = require("../../../common/NameTs");
var soundController_1 = require("../../../soundController");
var PlatformFactory_1 = require("../Adapter/PlatformFactory");
var AppInfo_1 = require("../Config/AppInfo");
;
(function ($) {
    //初始window
    console.log("初始化window,注册监听");
    window["SystemInterface"] = {};
    //进入后台
    window["onGamePause"] = function () {
        cc.game.emit(NameTs_1.default.onGamePause);
        console.log("安卓游戏进入后台");
    };
    // //回到前台
    window["onGameResume"] = function () {
        cc.game.emit(NameTs_1.default.onGameResume);
        console.log("安卓重新返回游戏");
    };
    //重新获取token成功
    window["retryTokenSuccess"] = function () {
        //重新获取token,重新请求
        AppInfo_1.AppInfo.phead = JSON.parse(PlatformFactory_1.default.Ins.getPheadString());
        AppInfo_1.AppInfo.version = "v1.2.9";
        cc.game.emit(NameTs_1.default.retryTokenSuccess);
    };
    //暂停音效
    window["pauseGameMusic"] = function () {
        console.log("安卓暂停音效");
        if (soundController_1.default && soundController_1.default.singleton) {
            soundController_1.default.isPlayMusic = false;
            soundController_1.default.singleton.stopBGM();
        }
    };
    //恢复音效
    window["replayGameMusic"] = function () {
        console.log("安卓恢复音效");
        if (soundController_1.default && soundController_1.default.singleton) {
            soundController_1.default.isPlayMusic = true;
            soundController_1.default.singleton.playBGM();
        }
        else {
            soundController_1.default.singleton = new soundController_1.default();
            soundController_1.default.isPlayMusic = true;
            soundController_1.default.singleton.playBGM();
        }
    };
    //物理返回键监听
    window["onBackPressed"] = function () {
        console.log("点击物理返回键");
        cc.game.emit(NameTs_1.default.onBackPressed);
    };
    //微信授权成功后回调
    window["bindWechatSuccess"] = function (res) {
        console.log("微信授权成功后回调");
        cc.game.emit(NameTs_1.default.bindWechatSuccess);
    };
    //微信授权失败后回调
    window["bindWechatFailed"] = function () {
    };
})(this);

cc._RF.pop();