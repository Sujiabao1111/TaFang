"use strict";
cc._RF.push(module, '542b8gBKF5O8KQlnCr6ccEX', 'PxTransUtils');
// Script/server/xmsdk_cocos/Utils/PxTransUtils.ts

"use strict";
/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-03-10 10:55:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-03-10 13:41:24
 */
Object.defineProperty(exports, "__esModule", { value: true });
var XMSDK_1 = require("../XMSDK");
var PxTransUtils = /** @class */ (function () {
    function PxTransUtils() {
    }
    PxTransUtils.initScreen = function () {
        this.screenHeight = Number(XMSDK_1.default.getScreenHeight()) || cc.view.getFrameSize().height;
        this.screenWidth = Number(XMSDK_1.default.getScreenWidth()) || cc.view.getFrameSize().width;
        this.liuhaiHeight = Number(XMSDK_1.default.getLiuHaiHeight());
        this.caidanHeght = Number(XMSDK_1.default.getNavigationBarHeight());
    };
    /**
     * 转化成本地的像素值
     * @param distance 像素值
     */
    PxTransUtils.nativeToLocal = function (distance) {
        return (PxTransUtils.UI_SIZE_WIDTH / cc.view.getFrameSize().width) * distance;
    };
    /**
     * 转化成原生的像素值
     * @param distance 像素值
     */
    PxTransUtils.localToNative = function (distance) {
        return cc.view.getFrameSize().width / PxTransUtils.UI_SIZE_WIDTH * distance;
    };
    PxTransUtils.getScreenHeight = function () {
        console.log(this.screenWidth, this.screenHeight, cc.director.getWinSize().height, cc.director.getWinSize().width);
        return this.screenWidth * (cc.director.getWinSize().height / cc.director.getWinSize().width);
    };
    PxTransUtils.getScreenWidth = function () {
        return this.screenWidth;
    };
    PxTransUtils.getScreenLiuhai = function () {
        return this.liuhaiHeight;
    };
    PxTransUtils.getScreenCaidan = function () {
        return this.caidanHeght;
    };
    PxTransUtils.screenHeight = 1280;
    PxTransUtils.screenWidth = 720;
    PxTransUtils.liuhaiHeight = 0; //刘海屏高度
    PxTransUtils.caidanHeght = 0; //底部菜单栏高度
    PxTransUtils.UI_SIZE_WIDTH = 720;
    return PxTransUtils;
}());
exports.default = PxTransUtils;

cc._RF.pop();