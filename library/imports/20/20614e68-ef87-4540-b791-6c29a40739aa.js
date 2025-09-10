"use strict";
cc._RF.push(module, '206145o74dFQLeRbCmkBzmq', 'AdController');
// Script/server/xmsdk_cocos/AD/AdController.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameTs_1 = require("../../../common/NameTs");
var pageTs_1 = require("../../../common/pageTs");
var util_1 = require("../../../util/util");
var XMSDK_1 = require("../XMSDK");
var AdUtil_1 = require("./AdUtil");
var AdviewUtil_1 = require("./AdviewUtil");
var AdController = /** @class */ (function () {
    function AdController() {
    }
    //普通广告
    AdController.loadAd = function (position, callback, failback) {
        console.log(position, '播放视频');
        if (true) {
            callback && callback();
            return;
        }
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameAdLoading);
        AdUtil_1.AdUtil.loadAd(position, function (res) {
            console.log("检查", JSON.stringify(res), position);
            if (AdUtil_1.AdUtil.isViewFinished(res) && res.position == position) {
                setTimeout(function () {
                    console.log("播放视频广告成功");
                    util_1.default.advertising_num++;
                    XMSDK_1.default.trackUserProperties({
                        coin_balance: util_1.default.advertising_num,
                    });
                    cc.game.emit(NameTs_1.default.Game_SavingPost_AddCoin);
                    callback && callback();
                }, 200);
            }
            else if (res.status == AdController.AD_CODE.LOAD_FAIL) {
                failback && failback();
            }
        });
    };
    AdController.loadInsertAd = function (position, callback) {
        if (true) {
            callback && callback();
            return;
        }
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameAdLoading);
        AdUtil_1.AdUtil.loadAd(position, function (res) {
            // console.log("接收loadAd", res)
            setTimeout(function () {
                console.log("检查", res, position);
                if (AdUtil_1.AdUtil.isViewFinished(res, true) && res.position == position) {
                    console.log("播放插屏广告成功");
                    callback && callback();
                }
            }, 200);
        });
    };
    AdController.loadInfoAd = function (position, adBoxWidth, adBox, isGdtMinAd) {
        if (isGdtMinAd === void 0) { isGdtMinAd = false; }
        console.log("asfasfas11" + position);
        if (true) {
            return;
        }
        console.log("调用loadInfoad:" + position);
        // cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameAdLoading);
        AdviewUtil_1.AdviewUtil.loadAd(position, adBoxWidth, adBox, isGdtMinAd);
    };
    AdController.hideInfoAd = function (position) {
        AdviewUtil_1.AdviewUtil.hideAd(position);
    };
    AdController.showAd = function (position) {
        AdUtil_1.AdUtil.showAd(position);
    };
    /**预加载视频或者插屏 */
    AdController.preVideoAd = function (position) {
        AdUtil_1.AdUtil.loadAdVideo(position);
    };
    /**预加载信息流 */
    AdController.preViewAd = function (position) {
        var adBoxWidth = 636; // 一般固定为636
        AdviewUtil_1.AdviewUtil.loadPreAd(position, adBoxWidth);
        console.log("asfasfas22" + position);
    };
    AdController.AD_CODE = {
        LOAD_SUCCESS: 1,
        LOAD_FAIL: 2,
        CLICK_AD: 3,
        SHOW_SUCCESS: 4,
        SHOW_FAIL: 5,
        CLOSE_AD: 6,
        REWARD_SUCCESS: 9,
    };
    return AdController;
}());
exports.default = AdController;

cc._RF.pop();