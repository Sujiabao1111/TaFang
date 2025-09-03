
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Utils/PxTransUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxVdGlsc1xcUHhUcmFuc1V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztHQU9HOztBQUVILGtDQUE2QjtBQUU3QjtJQUFBO0lBMENBLENBQUM7SUFwQ2lCLHVCQUFVLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsZUFBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUE7UUFDcEYsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUE7UUFDakYsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsZUFBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBSyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ1csMEJBQWEsR0FBM0IsVUFBNEIsUUFBZ0I7UUFDeEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7T0FHRztJQUNXLDBCQUFhLEdBQTNCLFVBQTRCLFFBQWdCO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7SUFDaEYsQ0FBQztJQUNhLDRCQUFlLEdBQTdCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNqSCxPQUFPLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hHLENBQUM7SUFDYSwyQkFBYyxHQUE1QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUMzQixDQUFDO0lBQ2EsNEJBQWUsR0FBN0I7UUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUE7SUFDNUIsQ0FBQztJQUNhLDRCQUFlLEdBQTdCO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQzNCLENBQUM7SUF2Q2EseUJBQVksR0FBVyxJQUFJLENBQUM7SUFDNUIsd0JBQVcsR0FBVyxHQUFHLENBQUM7SUFDMUIseUJBQVksR0FBVyxDQUFDLENBQUMsQ0FBQSxPQUFPO0lBQ2hDLHdCQUFXLEdBQVcsQ0FBQyxDQUFDLENBQUEsU0FBUztJQUNqQywwQkFBYSxHQUFHLEdBQUcsQ0FBQztJQXFDdEMsbUJBQUM7Q0ExQ0QsQUEwQ0MsSUFBQTtrQkExQ29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQERlc2NyaXB0dGlvbjogXG4gKiBAdmVyc2lvbjogXG4gKiBAQXV0aG9yOiBzdWVSaW1uXG4gKiBARGF0ZTogMjAyMC0wMy0xMCAxMDo1NTowOFxuICogQExhc3RFZGl0b3JzOiBzdWVSaW1uXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIwLTAzLTEwIDEzOjQxOjI0XG4gKi9cblxuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9YTVNES1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeFRyYW5zVXRpbHMge1xuICAgIHB1YmxpYyBzdGF0aWMgc2NyZWVuSGVpZ2h0OiBudW1iZXIgPSAxMjgwO1xuICAgIHB1YmxpYyBzdGF0aWMgc2NyZWVuV2lkdGg6IG51bWJlciA9IDcyMDtcbiAgICBwdWJsaWMgc3RhdGljIGxpdWhhaUhlaWdodDogbnVtYmVyID0gMDsvL+WImOa1t+Wxj+mrmOW6plxuICAgIHB1YmxpYyBzdGF0aWMgY2FpZGFuSGVnaHQ6IG51bWJlciA9IDA7Ly/lupXpg6joj5zljZXmoI/pq5jluqZcbiAgICBwdWJsaWMgc3RhdGljIFVJX1NJWkVfV0lEVEggPSA3MjA7XG4gICAgcHVibGljIHN0YXRpYyBpbml0U2NyZWVuKCkge1xuICAgICAgICB0aGlzLnNjcmVlbkhlaWdodCA9IE51bWJlcihYTVNESy5nZXRTY3JlZW5IZWlnaHQoKSkgfHwgY2Mudmlldy5nZXRGcmFtZVNpemUoKS5oZWlnaHRcbiAgICAgICAgdGhpcy5zY3JlZW5XaWR0aCA9IE51bWJlcihYTVNESy5nZXRTY3JlZW5XaWR0aCgpKSB8fCBjYy52aWV3LmdldEZyYW1lU2l6ZSgpLndpZHRoXG4gICAgICAgIHRoaXMubGl1aGFpSGVpZ2h0ID0gTnVtYmVyKFhNU0RLLmdldExpdUhhaUhlaWdodCgpKVxuICAgICAgICB0aGlzLmNhaWRhbkhlZ2h0ID0gTnVtYmVyKFhNU0RLLmdldE5hdmlnYXRpb25CYXJIZWlnaHQoKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDovazljJbmiJDmnKzlnLDnmoTlg4/ntKDlgLxcbiAgICAgKiBAcGFyYW0gZGlzdGFuY2Ug5YOP57Sg5YC8XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBuYXRpdmVUb0xvY2FsKGRpc3RhbmNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKFB4VHJhbnNVdGlscy5VSV9TSVpFX1dJRFRIIC8gY2Mudmlldy5nZXRGcmFtZVNpemUoKS53aWR0aCkgKiBkaXN0YW5jZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDovazljJbmiJDljp/nlJ/nmoTlg4/ntKDlgLxcbiAgICAgKiBAcGFyYW0gZGlzdGFuY2Ug5YOP57Sg5YC8XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsb2NhbFRvTmF0aXZlKGRpc3RhbmNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gY2Mudmlldy5nZXRGcmFtZVNpemUoKS53aWR0aCAvIFB4VHJhbnNVdGlscy5VSV9TSVpFX1dJRFRIICogZGlzdGFuY2U7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2NyZWVuSGVpZ2h0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNjcmVlbldpZHRoLCB0aGlzLnNjcmVlbkhlaWdodCwgY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpLmhlaWdodCwgY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpLndpZHRoKVxuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5XaWR0aCAqIChjYy5kaXJlY3Rvci5nZXRXaW5TaXplKCkuaGVpZ2h0IC8gY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpLndpZHRoKVxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdldFNjcmVlbldpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5XaWR0aFxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdldFNjcmVlbkxpdWhhaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGl1aGFpSGVpZ2h0XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2NyZWVuQ2FpZGFuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWlkYW5IZWdodFxuICAgIH1cblxufSJdfQ==