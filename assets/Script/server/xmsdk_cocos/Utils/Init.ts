import NameTs from "../../../common/NameTs";
import soundController from "../../../soundController";
import util from "../../../util/util";
import { AdUtil } from "../AD/AdUtil";
import PlatformFactory from "../Adapter/PlatformFactory";
import { AppInfo } from "../Config/AppInfo";

; (function ($) {
    //初始window
    console.log("初始化window,注册监听")

    window[`SystemInterface`] = {};

    //进入后台
     window["onGamePause"] = () => {        
         cc.game.emit(NameTs.onGamePause)
         console.log("安卓游戏进入后台");
     };
    // //回到前台
     window["onGameResume"] = () => {
         cc.game.emit(NameTs.onGameResume)
         console.log("安卓重新返回游戏");
     };
    //重新获取token成功
    window["retryTokenSuccess"] = () => {
        //重新获取token,重新请求
        AppInfo.phead = JSON.parse(PlatformFactory.Ins.getPheadString())
        AppInfo.version ="v1.2.9" ;
        cc.game.emit(NameTs.retryTokenSuccess)
    };
    //暂停音效
    window["pauseGameMusic"] = () => {
        console.log("安卓暂停音效");
        if (soundController && soundController.singleton) {
            soundController.isPlayMusic = false;
            soundController.singleton.stopBGM();
        }
    }
    //恢复音效
    window["replayGameMusic"] = () => {
        console.log("安卓恢复音效");
        if (soundController && soundController.singleton) {
            soundController.isPlayMusic = true;
            soundController.singleton.playBGM();
        }
        else {
            soundController.singleton = new soundController();
            soundController.isPlayMusic = true;
            soundController.singleton.playBGM();
        }
    }
    //物理返回键监听
    window["onBackPressed"] = () => {
        console.log("点击物理返回键")
        cc.game.emit(NameTs.onBackPressed)
    };
    //微信授权成功后回调
    window["bindWechatSuccess"] = (res) => {
        console.log("微信授权成功后回调")
        cc.game.emit(NameTs.bindWechatSuccess);
    }
    //微信授权失败后回调
    window[`bindWechatFailed`] = () => {
        
    }
})(this)