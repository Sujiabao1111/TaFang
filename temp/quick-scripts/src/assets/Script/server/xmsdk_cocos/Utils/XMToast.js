"use strict";
cc._RF.push(module, 'cfe842rx6JJLo9nXlK7LmL9', 'XMToast');
// Script/server/xmsdk_cocos/Utils/XMToast.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMToast = exports.PosConfig = exports.TextConfig = exports.DurConfig = void 0;
var ToastObject_1 = require("./ToastObject");
var DurConfig = /** @class */ (function () {
    function DurConfig() {
    }
    DurConfig.LONG_LARGE = 4;
    DurConfig.LONG = 2;
    DurConfig.SHORT = 1.5;
    return DurConfig;
}());
exports.DurConfig = DurConfig;
var TextConfig = /** @class */ (function () {
    function TextConfig() {
    }
    TextConfig.LINE_HIGHT = 32; // 行高
    TextConfig.FONT_SIZE = 24; // 字体大小
    TextConfig.H_PADDING = 30; // 水平间距
    TextConfig.V_PADDING = 15; // 垂直间距
    TextConfig.W_SPACEING = 120; // 文本过长时，设置为自动换行与屏幕的间距
    TextConfig.B_SPACEING = 100; // 当toast距离顶部或者底部的间距
    return TextConfig;
}());
exports.TextConfig = TextConfig;
var PosConfig;
(function (PosConfig) {
    PosConfig[PosConfig["TOP"] = 0] = "TOP";
    PosConfig[PosConfig["CENTER"] = 1] = "CENTER";
    PosConfig[PosConfig["BOTTOM"] = 2] = "BOTTOM";
})(PosConfig = exports.PosConfig || (exports.PosConfig = {}));
var XMToast = /** @class */ (function () {
    function XMToast() {
    }
    /**
     *
     * @param text 显示的内容
     * @param duration 多久关闭，默认1.5s
     * @param pos 显示文字的位置，默认为底部
     */
    XMToast.ShowText = function (text, duration, pos) {
        this.toastObj = new ToastObject_1.ToastObject(text, duration);
        this.toastObj.setPosition(pos, 0, 0); //可以自定义Toast的位置
        this.toastObj.show();
    };
    XMToast.toastObj = null;
    return XMToast;
}());
exports.XMToast = XMToast;

cc._RF.pop();