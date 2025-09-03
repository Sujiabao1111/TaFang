
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxVdGlsc1xcWE1Mb2FkMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBb0M7QUFFcEM7SUFBQTtJQTRCQSxDQUFDO0lBdkJHOztPQUVHO0lBQ1csbUJBQVcsR0FBekIsVUFBMEIsSUFBaUIsRUFBRSxZQUE2QjtRQUExRSxpQkFPQztRQVB5QixxQkFBQSxFQUFBLFNBQWlCO1FBQUUsNkJBQUEsRUFBQSxvQkFBNkI7UUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO2dCQUM1QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ2xELEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1o7SUFDTCxDQUFDO0lBQ2Esb0JBQVksR0FBMUI7UUFDSSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO1lBQzVCLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDN0I7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUMxQjtJQUNMLENBQUM7SUF6QmMsa0JBQVUsR0FBWSxJQUFJLENBQUM7SUFDM0IsaUJBQVMsR0FBRyxJQUFJLENBQUM7SUFDakIscUJBQWEsR0FBRyxJQUFJLENBQUM7SUF5QnhDLGNBQUM7Q0E1QkQsQUE0QkMsSUFBQTtBQTVCWSwwQkFBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRpbmcgfSBmcm9tIFwiLi9Mb2FkaW5nXCI7XG5cbmV4cG9ydCBjbGFzcyBYTUxvYWQyIHtcbiAgICBwcml2YXRlIHN0YXRpYyBMb2FkaW5nT2JqOiBMb2FkaW5nID0gbnVsbDtcbiAgICBwcml2YXRlIHN0YXRpYyBMb2FkdGltZXIgPSBudWxsO1xuICAgIHByaXZhdGUgc3RhdGljIExvYWRPcGVuVGltZXIgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHQg5pi+56S655qE5YaF5a65XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBvcGVuTG9hZGluZyh0ZXh0OiBzdHJpbmcgPSAnJywgZGlzYWJsZUNsaWNrOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHsgICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMuTG9hZE9wZW5UaW1lciAmJiAhdGhpcy5Mb2FkaW5nT2JqKSB7XG4gICAgICAgICAgICB0aGlzLkxvYWRPcGVuVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLkxvYWRpbmdPYmogPSBuZXcgTG9hZGluZyh0ZXh0LCBkaXNhYmxlQ2xpY2spO1xuICAgICAgICAgICAgICAgIHRoaXMuTG9hZGluZ09iai5vcGVuTG9hZGluZygpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBjbG9zZUxvYWRpbmcoKTogdm9pZCB7ICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuTG9hZE9wZW5UaW1lciAhPSBudWxsKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5Mb2FkT3BlblRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMuTG9hZE9wZW5UaW1lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5Mb2FkaW5nT2JqKSB7XG4gICAgICAgICAgICB0aGlzLkxvYWRpbmdPYmouY2xvc2VMb2FkaW5nKCk7XG4gICAgICAgICAgICB0aGlzLkxvYWRpbmdPYmogPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=