"use strict";
cc._RF.push(module, '0e08bbPj75Kp6WnTRgA3d+L', 'XMLoad2');
// Script/server/xmsdk_cocos/Utils/XMLoad2.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLoad2 = void 0;
var Loading_1 = require("./Loading");
var XMLoad2 = /** @class */ (function () {
    function XMLoad2() {
    }
    /**
     * @param text 显示的内容
     */
    XMLoad2.openLoading = function (text, disableClick) {
        var _this = this;
        if (text === void 0) { text = ''; }
        if (disableClick === void 0) { disableClick = false; }
        if (!this.LoadOpenTimer && !this.LoadingObj) {
            this.LoadOpenTimer = setTimeout(function () {
                _this.LoadingObj = new Loading_1.Loading(text, disableClick);
                _this.LoadingObj.openLoading();
            }, 1000);
        }
    };
    XMLoad2.closeLoading = function () {
        if (this.LoadOpenTimer != null) {
            clearTimeout(this.LoadOpenTimer);
            this.LoadOpenTimer = null;
        }
        if (this.LoadingObj) {
            this.LoadingObj.closeLoading();
            this.LoadingObj = null;
        }
    };
    XMLoad2.LoadingObj = null;
    XMLoad2.Loadtimer = null;
    XMLoad2.LoadOpenTimer = null;
    return XMLoad2;
}());
exports.XMLoad2 = XMLoad2;

cc._RF.pop();