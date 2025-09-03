"use strict";
cc._RF.push(module, 'b5cdcu7VP1HRZ4LS+bj6wPg', 'TextCtr');
// Script/Assist/TextCtr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCtr = void 0;
//文本处理类
exports.TextCtr = {
    /**
     * 使用parms的值一一替换text中的{parm}
     * @param text
     * @param parms
     */
    triggerToast: function (text, parms) {
        if (parms === void 0) { parms = []; }
        if (text) {
            for (var m in parms) {
                text = text.replace(/{parm}/, parms[m]);
            }
        }
        return text;
    },
    triggerNumber: function (info, limit) {
        if (limit === void 0) { limit = 2; }
        return info.toFixed(limit);
    },
    /**
     * sec秒转为时:分:秒格式
     * @param sec
     */
    formatHourAndMinute: function (sec) {
        var h = Math.floor(sec / 3600);
        var m = Math.floor(sec % 3600 / 60);
        var s = sec % 3600;
        var hour = h < 10 ? "0" + h : "" + h;
        var minute = m < 10 ? "0" + m : "" + m;
        var second = s < 10 ? "0" + s : "" + s;
        return hour + ":" + minute + ":" + second;
    },
    /**
     * sec秒转为分:秒格式
     * @param sec
     */
    formatOnlyMinute: function (sec) {
        var m = Math.floor(sec / 60);
        var s = sec % 3600;
        var minute = m < 10 ? "0" + m : "" + m;
        var second = s < 10 ? "0" + s : "" + s;
        return minute + ":" + second;
    }
};

cc._RF.pop();