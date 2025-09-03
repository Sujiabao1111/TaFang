
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMToast.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxVdGlsc1xcWE1Ub2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEM7QUFFNUM7SUFBQTtJQUlBLENBQUM7SUFIaUIsb0JBQVUsR0FBVyxDQUFDLENBQUM7SUFDdkIsY0FBSSxHQUFXLENBQUMsQ0FBQztJQUNqQixlQUFLLEdBQVcsR0FBRyxDQUFDO0lBQ3RDLGdCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksOEJBQVM7QUFNdEI7SUFBQTtJQU9BLENBQUM7SUFOaUIscUJBQVUsR0FBVyxFQUFFLENBQUMsQ0FBUyxLQUFLO0lBQ3RDLG9CQUFTLEdBQVcsRUFBRSxDQUFDLENBQVUsT0FBTztJQUN4QyxvQkFBUyxHQUFXLEVBQUUsQ0FBQyxDQUFVLE9BQU87SUFDeEMsb0JBQVMsR0FBVyxFQUFFLENBQUMsQ0FBVyxPQUFPO0lBQ3pDLHFCQUFVLEdBQVcsR0FBRyxDQUFDLENBQVEsc0JBQXNCO0lBQ3ZELHFCQUFVLEdBQVcsR0FBRyxDQUFDLENBQVEsb0JBQW9CO0lBQ3ZFLGlCQUFDO0NBUEQsQUFPQyxJQUFBO0FBUFksZ0NBQVU7QUFTdkIsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ2pCLHVDQUFPLENBQUE7SUFDUCw2Q0FBVSxDQUFBO0lBQ1YsNkNBQVUsQ0FBQTtBQUNkLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtBQUVEO0lBQUE7SUFjQSxDQUFDO0lBWEc7Ozs7O09BS0c7SUFDVyxnQkFBUSxHQUF0QixVQUF1QixJQUFZLEVBQUUsUUFBaUIsRUFBRSxHQUFlO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx5QkFBVyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsZUFBZTtRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFaYyxnQkFBUSxHQUFnQixJQUFJLENBQUM7SUFhaEQsY0FBQztDQWRELEFBY0MsSUFBQTtBQWRZLDBCQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9hc3RPYmplY3QgfSBmcm9tIFwiLi9Ub2FzdE9iamVjdFwiO1xuXG5leHBvcnQgY2xhc3MgRHVyQ29uZmlnIHtcbiAgICBwdWJsaWMgc3RhdGljIExPTkdfTEFSR0U6IG51bWJlciA9IDQ7XG4gICAgcHVibGljIHN0YXRpYyBMT05HOiBudW1iZXIgPSAyO1xuICAgIHB1YmxpYyBzdGF0aWMgU0hPUlQ6IG51bWJlciA9IDEuNTtcbn1cblxuZXhwb3J0IGNsYXNzIFRleHRDb25maWcge1xuICAgIHB1YmxpYyBzdGF0aWMgTElORV9ISUdIVDogbnVtYmVyID0gMzI7ICAgICAgICAgLy8g6KGM6auYXG4gICAgcHVibGljIHN0YXRpYyBGT05UX1NJWkU6IG51bWJlciA9IDI0OyAgICAgICAgICAvLyDlrZfkvZPlpKflsI9cbiAgICBwdWJsaWMgc3RhdGljIEhfUEFERElORzogbnVtYmVyID0gMzA7ICAgICAgICAgIC8vIOawtOW5s+mXtOi3nVxuICAgIHB1YmxpYyBzdGF0aWMgVl9QQURESU5HOiBudW1iZXIgPSAxNTsgICAgICAgICAgIC8vIOWeguebtOmXtOi3nVxuICAgIHB1YmxpYyBzdGF0aWMgV19TUEFDRUlORzogbnVtYmVyID0gMTIwOyAgICAgICAgLy8g5paH5pys6L+H6ZW/5pe277yM6K6+572u5Li66Ieq5Yqo5o2i6KGM5LiO5bGP5bmV55qE6Ze06LedXG4gICAgcHVibGljIHN0YXRpYyBCX1NQQUNFSU5HOiBudW1iZXIgPSAxMDA7ICAgICAgICAvLyDlvZN0b2FzdOi3neemu+mhtumDqOaIluiAheW6lemDqOeahOmXtOi3nVxufVxuXG5leHBvcnQgZW51bSBQb3NDb25maWcge1xuICAgIFRPUCA9IDAsXG4gICAgQ0VOVEVSID0gMSxcbiAgICBCT1RUT00gPSAyLFxufVxuXG5leHBvcnQgY2xhc3MgWE1Ub2FzdCB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgdG9hc3RPYmo6IFRvYXN0T2JqZWN0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB0ZXh0IOaYvuekuueahOWGheWuuVxuICAgICAqIEBwYXJhbSBkdXJhdGlvbiDlpJrkuYXlhbPpl63vvIzpu5jorqQxLjVzXG4gICAgICogQHBhcmFtIHBvcyDmmL7npLrmloflrZfnmoTkvY3nva7vvIzpu5jorqTkuLrlupXpg6hcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFNob3dUZXh0KHRleHQ6IHN0cmluZywgZHVyYXRpb24/OiBudW1iZXIsIHBvcz86IFBvc0NvbmZpZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvYXN0T2JqID0gbmV3IFRvYXN0T2JqZWN0KHRleHQsIGR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy50b2FzdE9iai5zZXRQb3NpdGlvbihwb3MsIDAsIDApOy8v5Y+v5Lul6Ieq5a6a5LmJVG9hc3TnmoTkvY3nva5cbiAgICAgICAgdGhpcy50b2FzdE9iai5zaG93KCk7XG4gICAgfVxufVxuIl19