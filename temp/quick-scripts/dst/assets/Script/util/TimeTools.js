
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/util/TimeTools.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3a1feUdiOBDirCm1mpBQbBX', 'TimeTools');
// Script/util/TimeTools.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTools = void 0;
/** 时间戳相关工具类 */
var TimeTools = /** @class */ (function () {
    function TimeTools() {
    }
    Object.defineProperty(TimeTools, "_ins", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    //  注意 Time 不传时 默认就是当前的时间戳
    /** 获取当前时间戳 */
    TimeTools.prototype.getNowTime = function () {
        return new Date().getTime();
    };
    ;
    /** 通过时间戳 获取时间 */
    TimeTools.prototype.getTimeData = function (nowTime) {
        nowTime = nowTime || new Date().getTime();
        var time = {};
        time.day = this.getDayForTime(nowTime);
        time.hour = this.getHourForTime(nowTime);
        time.minute = this.getMinuteForTime(nowTime);
        time.second = this.getSecondForTime(nowTime);
        return time;
    };
    ;
    /** 通过 时间戳 获取 时分秒 类型的字符串 */
    TimeTools.prototype.getStrToHMSForSecond = function (time) {
        var second = this.getSecondForTime(time);
        return this.secondToHMS(second);
    };
    ;
    /** 通过 时间戳 获取 分秒 类型的字符串 */
    TimeTools.prototype.getStrToMSForSecond = function (time) {
        var second = this.getSecondForTime(time);
        return this.secondToMS(second);
    };
    ;
    TimeTools.prototype.secondToHMS = function (second) {
        var H = this.prefixInteger(Math.floor(second / 60 / 60)); //整数前边补零
        var M = this.prefixInteger(Math.floor(second / 60 % 60));
        var S = this.prefixInteger(Math.floor(second % 60 % 60));
        return H + ":" + M + ":" + S;
    };
    TimeTools.prototype.secondToMS = function (second) {
        var M = this.prefixInteger(Math.floor(second / 60 % 60));
        var S = this.prefixInteger(Math.floor(second % 60 % 60));
        return M + ":" + S;
    };
    /** 通过时间戳 获取年月日 */
    TimeTools.prototype.getStrToYMDForDate = function (time) {
        var date = new Date(time);
        var Y = date.getFullYear();
        var M = date.getMonth() + 1;
        var D = date.getDate();
        return Y + "." + M + "." + D;
    };
    ;
    /** 获取两个时间戳相差的秒数 */
    TimeTools.prototype.getSecondTimeDiff = function (time1, time2) {
        return this.getSecondForTime(time2) - this.getSecondForTime(time1);
    };
    ;
    /** 获取两个时间戳相差的分钟数 */
    TimeTools.prototype.getMinuteTimeDiff = function (time1, time2) {
        return this.getMinuteForTime(time2) - this.getMinuteForTime(time1);
    };
    ;
    /** 获取两个时间戳相差的小时数 */
    TimeTools.prototype.getHourTimeDiff = function (time1, time2) {
        // cc.log(this.getHourForTime(time2), this.getHourForTime(time1), this.getHourForTime(time2) - this.getHourForTime(time1));
        return this.getHourForTime(time2) - this.getHourForTime(time1);
    };
    ;
    /** 获取两个时间戳相差的天数 */
    TimeTools.prototype.getDayTimeDiff = function (time1, time2) {
        return this.getDayForTime(time2) - this.getDayForTime(time1);
    };
    ;
    /** 通过时间戳获取天数 */
    TimeTools.prototype.getDayForTime = function (time) {
        time = time || new Date().getTime();
        return Math.floor(time / (24 * 60 * 60 * 1000));
    };
    ;
    /** 通过时间戳获取小时数 */
    TimeTools.prototype.getHourForTime = function (time) {
        time = time || new Date().getTime();
        return Math.floor(time / (60 * 60 * 1000));
    };
    ;
    /** 通过时间戳获取分钟数 */
    TimeTools.prototype.getMinuteForTime = function (time) {
        time = time || new Date().getTime();
        return Math.floor(time / (60 * 1000));
    };
    ;
    /** 通过时间戳获取秒数 */
    TimeTools.prototype.getSecondForTime = function (time) {
        time = time || new Date().getTime();
        return Math.floor(time / (1000));
    };
    ;
    /**
 * 数字整数前边补零 并返回字符串
 * @param num 传入的数字
 * @param length 前边补几个零
 */
    TimeTools.prototype.prefixInteger = function (num, length) {
        if (length === void 0) { length = 2; }
        return (Array(length).join('0') + num).slice(-length);
    };
    ;
    /** 单例模式 */
    TimeTools._instance = new TimeTools();
    return TimeTools;
}());
exports.TimeTools = TimeTools;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsXFxUaW1lVG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZTtBQUNmO0lBR0k7SUFBd0IsQ0FBQztJQUN6QixzQkFBa0IsaUJBQUk7YUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFDRCwwQkFBMEI7SUFFMUIsY0FBYztJQUNkLDhCQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUFBLENBQUM7SUFFRixpQkFBaUI7SUFDakIsK0JBQVcsR0FBWCxVQUFZLE9BQWdCO1FBQ3hCLE9BQU8sR0FBRyxPQUFPLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUxQyxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU3QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUNGLDJCQUEyQjtJQUMzQix3Q0FBb0IsR0FBcEIsVUFBcUIsSUFBYTtRQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFBQSxDQUFD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UUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUFBLENBQUM7SUFwR0YsV0FBVztJQUNJLG1CQUFTLEdBQWMsSUFBSSxTQUFTLEVBQUUsQ0FBQztJQW9HMUQsZ0JBQUM7Q0F0R0QsQUFzR0MsSUFBQTtBQXRHWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiDml7bpl7TmiLPnm7jlhbPlt6XlhbfnsbsgKi9cbmV4cG9ydCBjbGFzcyBUaW1lVG9vbHMge1xuICAgIC8qKiDljZXkvovmqKHlvI8gKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFRpbWVUb29scyA9IG5ldyBUaW1lVG9vbHMoKTtcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XG4gICAgcHVibGljIHN0YXRpYyBnZXQgX2lucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgIH1cbiAgICAvLyAg5rOo5oSPIFRpbWUg5LiN5Lyg5pe2IOm7mOiupOWwseaYr+W9k+WJjeeahOaXtumXtOaIs1xuXG4gICAgLyoqIOiOt+WPluW9k+WJjeaXtumXtOaIsyAqL1xuICAgIGdldE5vd1RpbWUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKiDpgJrov4fml7bpl7TmiLMg6I635Y+W5pe26Ze0ICovXG4gICAgZ2V0VGltZURhdGEobm93VGltZT86IG51bWJlcikge1xuICAgICAgICBub3dUaW1lID0gbm93VGltZSB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICBsZXQgdGltZSA9IDxUaW1lRGF0YT57fTtcbiAgICAgICAgdGltZS5kYXkgPSB0aGlzLmdldERheUZvclRpbWUobm93VGltZSk7XG4gICAgICAgIHRpbWUuaG91ciA9IHRoaXMuZ2V0SG91ckZvclRpbWUobm93VGltZSk7XG4gICAgICAgIHRpbWUubWludXRlID0gdGhpcy5nZXRNaW51dGVGb3JUaW1lKG5vd1RpbWUpO1xuICAgICAgICB0aW1lLnNlY29uZCA9IHRoaXMuZ2V0U2Vjb25kRm9yVGltZShub3dUaW1lKTtcblxuICAgICAgICByZXR1cm4gdGltZTtcbiAgICB9O1xuICAgIC8qKiDpgJrov4cg5pe26Ze05oizIOiOt+WPliDml7bliIbnp5Ig57G75Z6L55qE5a2X56ym5LiyICovXG4gICAgZ2V0U3RyVG9ITVNGb3JTZWNvbmQodGltZT86IG51bWJlcikge1xuICAgICAgICBsZXQgc2Vjb25kID0gdGhpcy5nZXRTZWNvbmRGb3JUaW1lKHRpbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWNvbmRUb0hNUyhzZWNvbmQpO1xuICAgIH07XG4gICAgLyoqIOmAmui/hyDml7bpl7TmiLMg6I635Y+WIOWIhuenkiDnsbvlnovnmoTlrZfnrKbkuLIgKi9cbiAgICBnZXRTdHJUb01TRm9yU2Vjb25kKHRpbWU/OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHNlY29uZCA9IHRoaXMuZ2V0U2Vjb25kRm9yVGltZSh0aW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vjb25kVG9NUyhzZWNvbmQpO1xuICAgIH07XG4gICAgc2Vjb25kVG9ITVMoc2Vjb25kOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IEggPSB0aGlzLnByZWZpeEludGVnZXIoTWF0aC5mbG9vcihzZWNvbmQgLyA2MCAvIDYwKSk7ICAvL+aVtOaVsOWJjei+ueihpembtlxuICAgICAgICBsZXQgTSA9IHRoaXMucHJlZml4SW50ZWdlcihNYXRoLmZsb29yKHNlY29uZCAvIDYwICUgNjApKTtcbiAgICAgICAgbGV0IFMgPSB0aGlzLnByZWZpeEludGVnZXIoTWF0aC5mbG9vcihzZWNvbmQgJSA2MCAlIDYwKSk7XG4gICAgICAgIHJldHVybiBIICsgXCI6XCIgKyBNICsgXCI6XCIgKyBTO1xuICAgIH1cbiAgICBzZWNvbmRUb01TKHNlY29uZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBNID0gdGhpcy5wcmVmaXhJbnRlZ2VyKE1hdGguZmxvb3Ioc2Vjb25kIC8gNjAgJSA2MCkpO1xuICAgICAgICBsZXQgUyA9IHRoaXMucHJlZml4SW50ZWdlcihNYXRoLmZsb29yKHNlY29uZCAlIDYwICUgNjApKTtcbiAgICAgICAgcmV0dXJuIE0gKyBcIjpcIiArIFM7XG4gICAgfVxuICAgIC8qKiDpgJrov4fml7bpl7TmiLMg6I635Y+W5bm05pyI5pelICovXG4gICAgZ2V0U3RyVG9ZTURGb3JEYXRlKHRpbWU/OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lKTtcbiAgICAgICAgbGV0IFkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGxldCBNID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgbGV0IEQgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgcmV0dXJuIFkgKyBcIi5cIiArIE0gKyBcIi5cIiArIEQ7XG4gICAgfTtcblxuICAgIC8qKiDojrflj5bkuKTkuKrml7bpl7TmiLPnm7jlt67nmoTnp5LmlbAgKi9cbiAgICBnZXRTZWNvbmRUaW1lRGlmZih0aW1lMT86IG51bWJlciwgdGltZTI/OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kRm9yVGltZSh0aW1lMikgLSB0aGlzLmdldFNlY29uZEZvclRpbWUodGltZTEpO1xuICAgIH07XG4gICAgLyoqIOiOt+WPluS4pOS4quaXtumXtOaIs+ebuOW3rueahOWIhumSn+aVsCAqL1xuICAgIGdldE1pbnV0ZVRpbWVEaWZmKHRpbWUxPzogbnVtYmVyLCB0aW1lMj86IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNaW51dGVGb3JUaW1lKHRpbWUyKSAtIHRoaXMuZ2V0TWludXRlRm9yVGltZSh0aW1lMSk7XG4gICAgfTtcbiAgICAvKiog6I635Y+W5Lik5Liq5pe26Ze05oiz55u45beu55qE5bCP5pe25pWwICovXG4gICAgZ2V0SG91clRpbWVEaWZmKHRpbWUxPzogbnVtYmVyLCB0aW1lMj86IG51bWJlcikge1xuICAgICAgICAvLyBjYy5sb2codGhpcy5nZXRIb3VyRm9yVGltZSh0aW1lMiksIHRoaXMuZ2V0SG91ckZvclRpbWUodGltZTEpLCB0aGlzLmdldEhvdXJGb3JUaW1lKHRpbWUyKSAtIHRoaXMuZ2V0SG91ckZvclRpbWUodGltZTEpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SG91ckZvclRpbWUodGltZTIpIC0gdGhpcy5nZXRIb3VyRm9yVGltZSh0aW1lMSk7XG4gICAgfTtcbiAgICAvKiog6I635Y+W5Lik5Liq5pe26Ze05oiz55u45beu55qE5aSp5pWwICovXG4gICAgZ2V0RGF5VGltZURpZmYodGltZTE/OiBudW1iZXIsIHRpbWUyPzogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERheUZvclRpbWUodGltZTIpIC0gdGhpcy5nZXREYXlGb3JUaW1lKHRpbWUxKTtcbiAgICB9O1xuXG4gICAgLyoqIOmAmui/h+aXtumXtOaIs+iOt+WPluWkqeaVsCAqL1xuICAgIGdldERheUZvclRpbWUodGltZT86IG51bWJlcikge1xuICAgICAgICB0aW1lID0gdGltZSB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGltZSAvICgyNCAqIDYwICogNjAgKiAxMDAwKSk7XG4gICAgfTtcbiAgICAvKiog6YCa6L+H5pe26Ze05oiz6I635Y+W5bCP5pe25pWwICovXG4gICAgZ2V0SG91ckZvclRpbWUodGltZT86IG51bWJlcikge1xuICAgICAgICB0aW1lID0gdGltZSB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGltZSAvICg2MCAqIDYwICogMTAwMCkpO1xuICAgIH07XG4gICAgLyoqIOmAmui/h+aXtumXtOaIs+iOt+WPluWIhumSn+aVsCAqL1xuICAgIGdldE1pbnV0ZUZvclRpbWUodGltZT86IG51bWJlcikge1xuICAgICAgICB0aW1lID0gdGltZSB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGltZSAvICg2MCAqIDEwMDApKTtcbiAgICB9O1xuICAgIC8qKiDpgJrov4fml7bpl7TmiLPojrflj5bnp5LmlbAgKi9cbiAgICBnZXRTZWNvbmRGb3JUaW1lKHRpbWU/OiBudW1iZXIpIHtcbiAgICAgICAgdGltZSA9IHRpbWUgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRpbWUgLyAoMTAwMCkpO1xuICAgIH07XG4gICAgLyoqXG4gKiDmlbDlrZfmlbTmlbDliY3ovrnooaXpm7Yg5bm26L+U5Zue5a2X56ym5LiyXG4gKiBAcGFyYW0gbnVtIOS8oOWFpeeahOaVsOWtl1xuICogQHBhcmFtIGxlbmd0aCDliY3ovrnooaXlh6DkuKrpm7ZcbiAqL1xuICAgIHByaXZhdGUgcHJlZml4SW50ZWdlcihudW06IG51bWJlciwgbGVuZ3RoID0gMik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAoQXJyYXkobGVuZ3RoKS5qb2luKCcwJykgKyBudW0pLnNsaWNlKC1sZW5ndGgpO1xuICAgIH07XG59XG5cbi8qKiDml7bpl7TmlbDmja4gICAqL1xudHlwZSBUaW1lRGF0YSA9IHtcbiAgICBkYXk6IG51bWJlciwgICAvL+WkqVxuICAgIGhvdXI6IG51bWJlciwgICAvL+Wwj+aXtlxuICAgIG1pbnV0ZTogbnVtYmVyLCAgLy/liIbpkp9cbiAgICBzZWNvbmQ6IG51bWJlciwgICAvL+enklxufSJdfQ==