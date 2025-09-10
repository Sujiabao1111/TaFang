"use strict";
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