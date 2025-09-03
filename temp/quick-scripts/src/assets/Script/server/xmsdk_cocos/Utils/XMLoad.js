"use strict";
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