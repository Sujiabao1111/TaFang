
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Init.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxVdGlsc1xcSW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUE0QztBQUM1Qyw0REFBdUQ7QUFHdkQsOERBQXlEO0FBQ3pELDZDQUE0QztBQUU1QyxDQUFDO0FBQUMsQ0FBQyxVQUFVLENBQUM7SUFDVixVQUFVO0lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRTdCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUUvQixNQUFNO0lBQ0wsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHO1FBQ3BCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7SUFDSCxTQUFTO0lBQ1IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHO1FBQ3JCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7SUFDSCxhQUFhO0lBQ2IsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUc7UUFDMUIsZ0JBQWdCO1FBQ2hCLGlCQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQWUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQTtRQUNoRSxpQkFBTyxDQUFDLE9BQU8sR0FBRSxRQUFRLENBQUU7UUFDM0IsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQzFDLENBQUMsQ0FBQztJQUNGLE1BQU07SUFDTixNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLElBQUkseUJBQWUsSUFBSSx5QkFBZSxDQUFDLFNBQVMsRUFBRTtZQUM5Qyx5QkFBZSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDcEMseUJBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkM7SUFDTCxDQUFDLENBQUE7SUFDRCxNQUFNO0lBQ04sTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUc7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLHlCQUFlLElBQUkseUJBQWUsQ0FBQyxTQUFTLEVBQUU7WUFDOUMseUJBQWUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ25DLHlCQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZDO2FBQ0k7WUFDRCx5QkFBZSxDQUFDLFNBQVMsR0FBRyxJQUFJLHlCQUFlLEVBQUUsQ0FBQztZQUNsRCx5QkFBZSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDbkMseUJBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkM7SUFDTCxDQUFDLENBQUE7SUFDRCxTQUFTO0lBQ1QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdEIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUN0QyxDQUFDLENBQUM7SUFDRixXQUFXO0lBQ1gsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsVUFBQyxHQUFHO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDeEIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQTtJQUNELFdBQVc7SUFDWCxNQUFNLENBQUMsa0JBQWtCLENBQUMsR0FBRztJQUU3QixDQUFDLENBQUE7QUFDTCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYW1lVHMgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uLy4uLy4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uLy4uLy4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IHsgQWRVdGlsIH0gZnJvbSBcIi4uL0FEL0FkVXRpbFwiO1xuaW1wb3J0IFBsYXRmb3JtRmFjdG9yeSBmcm9tIFwiLi4vQWRhcHRlci9QbGF0Zm9ybUZhY3RvcnlcIjtcbmltcG9ydCB7IEFwcEluZm8gfSBmcm9tIFwiLi4vQ29uZmlnL0FwcEluZm9cIjtcblxuOyAoZnVuY3Rpb24gKCQpIHtcbiAgICAvL+WIneWni3dpbmRvd1xuICAgIGNvbnNvbGUubG9nKFwi5Yid5aeL5YyWd2luZG93LOazqOWGjOebkeWQrFwiKVxuXG4gICAgd2luZG93W2BTeXN0ZW1JbnRlcmZhY2VgXSA9IHt9O1xuXG4gICAgLy/ov5vlhaXlkI7lj7BcbiAgICAgd2luZG93W1wib25HYW1lUGF1c2VcIl0gPSAoKSA9PiB7ICAgICAgICBcbiAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMub25HYW1lUGF1c2UpXG4gICAgICAgICBjb25zb2xlLmxvZyhcIuWuieWNk+a4uOaIj+i/m+WFpeWQjuWPsFwiKTtcbiAgICAgfTtcbiAgICAvLyAvL+WbnuWIsOWJjeWPsFxuICAgICB3aW5kb3dbXCJvbkdhbWVSZXN1bWVcIl0gPSAoKSA9PiB7XG4gICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLm9uR2FtZVJlc3VtZSlcbiAgICAgICAgIGNvbnNvbGUubG9nKFwi5a6J5Y2T6YeN5paw6L+U5Zue5ri45oiPXCIpO1xuICAgICB9O1xuICAgIC8v6YeN5paw6I635Y+WdG9rZW7miJDlip9cbiAgICB3aW5kb3dbXCJyZXRyeVRva2VuU3VjY2Vzc1wiXSA9ICgpID0+IHtcbiAgICAgICAgLy/ph43mlrDojrflj5Z0b2tlbizph43mlrDor7fmsYJcbiAgICAgICAgQXBwSW5mby5waGVhZCA9IEpTT04ucGFyc2UoUGxhdGZvcm1GYWN0b3J5Lklucy5nZXRQaGVhZFN0cmluZygpKVxuICAgICAgICBBcHBJbmZvLnZlcnNpb24gPVwidjEuMi45XCIgO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLnJldHJ5VG9rZW5TdWNjZXNzKVxuICAgIH07XG4gICAgLy/mmoLlgZzpn7PmlYhcbiAgICB3aW5kb3dbXCJwYXVzZUdhbWVNdXNpY1wiXSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCLlronljZPmmoLlgZzpn7PmlYhcIik7XG4gICAgICAgIGlmIChzb3VuZENvbnRyb2xsZXIgJiYgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbikge1xuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLmlzUGxheU11c2ljID0gZmFsc2U7XG4gICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLnN0b3BCR00oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL+aBouWkjemfs+aViFxuICAgIHdpbmRvd1tcInJlcGxheUdhbWVNdXNpY1wiXSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCLlronljZPmgaLlpI3pn7PmlYhcIik7XG4gICAgICAgIGlmIChzb3VuZENvbnRyb2xsZXIgJiYgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbikge1xuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLmlzUGxheU11c2ljID0gdHJ1ZTtcbiAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24ucGxheUJHTSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbiA9IG5ldyBzb3VuZENvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5pc1BsYXlNdXNpYyA9IHRydWU7XG4gICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLnBsYXlCR00oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL+eJqeeQhui/lOWbnumUruebkeWQrFxuICAgIHdpbmRvd1tcIm9uQmFja1ByZXNzZWRcIl0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi54K55Ye754mp55CG6L+U5Zue6ZSuXCIpXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMub25CYWNrUHJlc3NlZClcbiAgICB9O1xuICAgIC8v5b6u5L+h5o6I5p2D5oiQ5Yqf5ZCO5Zue6LCDXG4gICAgd2luZG93W1wiYmluZFdlY2hhdFN1Y2Nlc3NcIl0gPSAocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5b6u5L+h5o6I5p2D5oiQ5Yqf5ZCO5Zue6LCDXCIpXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuYmluZFdlY2hhdFN1Y2Nlc3MpO1xuICAgIH1cbiAgICAvL+W+ruS/oeaOiOadg+Wksei0peWQjuWbnuiwg1xuICAgIHdpbmRvd1tgYmluZFdlY2hhdEZhaWxlZGBdID0gKCkgPT4ge1xuICAgICAgICBcbiAgICB9XG59KSh0aGlzKSJdfQ==