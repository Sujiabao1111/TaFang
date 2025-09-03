
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09ff5SKiMNCS5FGitfLRxsz', 'XMLoad');
// Script/server/xmsdk_cocos/Utils/XMLoad.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLoad = exports.Configs = void 0;
var LoadObject_1 = require("./LoadObject");
var Configs = /** @class */ (function () {
    function Configs() {
    }
    Configs.LINE_HIGHT = 32; // 行高
    Configs.FONT_SIZE = 24; // 字体大小
    Configs.H_PADDING = 12; // 水平间距
    Configs.V_PADDING = 6; // 垂直间距
    Configs.W_SPACEING = 120; // 文本过长时，设置为自动换行与屏幕的间距
    Configs.B_SPACEING = 100; // 当toast距离顶部或者底部的间距
    Configs.PADDING = 20; // 间距
    Configs.WIDTH = 240; // load内容层节点宽度
    return Configs;
}());
exports.Configs = Configs;
var XMLoad = /** @class */ (function () {
    function XMLoad() {
    }
    /**
     * @param text 显示的内容
     */
    XMLoad.ShowLoading = function (text) {
        if (text === void 0) { text = ''; }
        this.LoadObj = new LoadObject_1.LoadObject(text);
        this.LoadObj.show();
    };
    /**
     * @msg: 隐藏load
     */
    XMLoad.HideLoading = function () {
        this.LoadObj.hide();
    };
    XMLoad.LoadObj = null;
    return XMLoad;
}());
exports.XMLoad = XMLoad;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxVdGlsc1xcWE1Mb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUUxQztJQUFBO0lBU0EsQ0FBQztJQVJpQixrQkFBVSxHQUFXLEVBQUUsQ0FBQyxDQUFTLEtBQUs7SUFDdEMsaUJBQVMsR0FBVyxFQUFFLENBQUMsQ0FBVSxPQUFPO0lBQ3hDLGlCQUFTLEdBQVcsRUFBRSxDQUFDLENBQVUsT0FBTztJQUN4QyxpQkFBUyxHQUFXLENBQUMsQ0FBQyxDQUFXLE9BQU87SUFDeEMsa0JBQVUsR0FBVyxHQUFHLENBQUMsQ0FBUSxzQkFBc0I7SUFDdkQsa0JBQVUsR0FBVyxHQUFHLENBQUMsQ0FBUSxvQkFBb0I7SUFDckQsZUFBTyxHQUFXLEVBQUUsQ0FBQyxDQUFZLEtBQUs7SUFDdEMsYUFBSyxHQUFXLEdBQUcsQ0FBQyxDQUFhLGNBQWM7SUFDakUsY0FBQztDQVRELEFBU0MsSUFBQTtBQVRZLDBCQUFPO0FBV3BCO0lBQUE7SUFpQkEsQ0FBQztJQWRHOztPQUVHO0lBQ1csa0JBQVcsR0FBekIsVUFBMEIsSUFBaUI7UUFBakIscUJBQUEsRUFBQSxTQUFpQjtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNXLGtCQUFXLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBZmMsY0FBTyxHQUFlLElBQUksQ0FBQztJQWdCOUMsYUFBQztDQWpCRCxBQWlCQyxJQUFBO0FBakJZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE9iamVjdCB9IGZyb20gXCIuL0xvYWRPYmplY3RcIjtcblxuZXhwb3J0IGNsYXNzIENvbmZpZ3Mge1xuICAgIHB1YmxpYyBzdGF0aWMgTElORV9ISUdIVDogbnVtYmVyID0gMzI7ICAgICAgICAgLy8g6KGM6auYXG4gICAgcHVibGljIHN0YXRpYyBGT05UX1NJWkU6IG51bWJlciA9IDI0OyAgICAgICAgICAvLyDlrZfkvZPlpKflsI9cbiAgICBwdWJsaWMgc3RhdGljIEhfUEFERElORzogbnVtYmVyID0gMTI7ICAgICAgICAgIC8vIOawtOW5s+mXtOi3nVxuICAgIHB1YmxpYyBzdGF0aWMgVl9QQURESU5HOiBudW1iZXIgPSA2OyAgICAgICAgICAgLy8g5Z6C55u06Ze06LedXG4gICAgcHVibGljIHN0YXRpYyBXX1NQQUNFSU5HOiBudW1iZXIgPSAxMjA7ICAgICAgICAvLyDmlofmnKzov4fplb/ml7bvvIzorr7nva7kuLroh6rliqjmjaLooYzkuI7lsY/luZXnmoTpl7Tot51cbiAgICBwdWJsaWMgc3RhdGljIEJfU1BBQ0VJTkc6IG51bWJlciA9IDEwMDsgICAgICAgIC8vIOW9k3RvYXN06Led56a76aG26YOo5oiW6ICF5bqV6YOo55qE6Ze06LedXG4gICAgcHVibGljIHN0YXRpYyBQQURESU5HOiBudW1iZXIgPSAyMDsgICAgICAgICAgICAvLyDpl7Tot51cbiAgICBwdWJsaWMgc3RhdGljIFdJRFRIOiBudW1iZXIgPSAyNDA7ICAgICAgICAgICAgIC8vIGxvYWTlhoXlrrnlsYLoioLngrnlrr3luqZcbn1cblxuZXhwb3J0IGNsYXNzIFhNTG9hZCB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgTG9hZE9iajogTG9hZE9iamVjdCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdGV4dCDmmL7npLrnmoTlhoXlrrlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFNob3dMb2FkaW5nKHRleHQ6IHN0cmluZyA9ICcnKTogdm9pZCB7XG4gICAgICAgIHRoaXMuTG9hZE9iaiA9IG5ldyBMb2FkT2JqZWN0KHRleHQpO1xuICAgICAgICB0aGlzLkxvYWRPYmouc2hvdygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtc2c6IOmakOiXj2xvYWRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEhpZGVMb2FkaW5nKCkge1xuICAgICAgICB0aGlzLkxvYWRPYmouaGlkZSgpO1xuICAgIH1cbn1cbiJdfQ==