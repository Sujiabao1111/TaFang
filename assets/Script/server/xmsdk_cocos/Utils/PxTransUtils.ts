/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-10 10:55:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-03-10 13:41:24
 */

import XMSDK from "../XMSDK";

export default class PxTransUtils {
    public static screenHeight: number = 1280;
    public static screenWidth: number = 720;
    public static liuhaiHeight: number = 0;//刘海屏高度
    public static caidanHeght: number = 0;//底部菜单栏高度
    public static UI_SIZE_WIDTH = 720;
    public static initScreen() {
        this.screenHeight = Number(XMSDK.getScreenHeight()) || cc.view.getFrameSize().height
        this.screenWidth = Number(XMSDK.getScreenWidth()) || cc.view.getFrameSize().width
        this.liuhaiHeight = Number(XMSDK.getLiuHaiHeight())
        this.caidanHeght = Number(XMSDK.getNavigationBarHeight())
    }

    /**
     * 转化成本地的像素值
     * @param distance 像素值
     */
    public static nativeToLocal(distance: number): number {
        return (PxTransUtils.UI_SIZE_WIDTH / cc.view.getFrameSize().width) * distance;
    }

    /**
     * 转化成原生的像素值
     * @param distance 像素值
     */
    public static localToNative(distance: number): number {
        return cc.view.getFrameSize().width / PxTransUtils.UI_SIZE_WIDTH * distance;
    }
    public static getScreenHeight() {
        console.log(this.screenWidth, this.screenHeight, cc.director.getWinSize().height, cc.director.getWinSize().width)
        return this.screenWidth * (cc.director.getWinSize().height / cc.director.getWinSize().width)
    }
    public static getScreenWidth() {
        return this.screenWidth
    }
    public static getScreenLiuhai() {
        return this.liuhaiHeight
    }
    public static getScreenCaidan() {
        return this.caidanHeght
    }

}