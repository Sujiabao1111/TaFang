
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Assist/TextCtr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxBc3Npc3RcXFRleHRDdHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTztBQUNNLFFBQUEsT0FBTyxHQUFHO0lBQ25COzs7O09BSUc7SUFDSCxZQUFZLEVBQVosVUFBYSxJQUFZLEVBQUUsS0FBeUI7UUFBekIsc0JBQUEsRUFBQSxVQUF5QjtRQUNoRCxJQUFJLElBQUksRUFBRTtZQUNOLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFO2dCQUNqQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDMUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUNELGFBQWEsRUFBYixVQUFjLElBQVksRUFBRSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFNBQWlCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsbUJBQW1CLEVBQW5CLFVBQW9CLEdBQVc7UUFDM0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ25DLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUE7UUFFbEIsSUFBSSxJQUFJLEdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUM1QyxJQUFJLE1BQU0sR0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzlDLElBQUksTUFBTSxHQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFFOUMsT0FBTyxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFBO0lBQzdDLENBQUM7SUFDRDs7O09BR0c7SUFDSCxnQkFBZ0IsRUFBaEIsVUFBaUIsR0FBVztRQUN4QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFBO1FBRWxCLElBQUksTUFBTSxHQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDOUMsSUFBSSxNQUFNLEdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUU5QyxPQUFPLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFBO0lBQ2hDLENBQUM7Q0FDSixDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/mlofmnKzlpITnkIbnsbtcbmV4cG9ydCBjb25zdCBUZXh0Q3RyID0ge1xuICAgIC8qKlxuICAgICAqIOS9v+eUqHBhcm1z55qE5YC85LiA5LiA5pu/5o2idGV4dOS4reeahHtwYXJtfVxuICAgICAqIEBwYXJhbSB0ZXh0IFxuICAgICAqIEBwYXJhbSBwYXJtcyBcbiAgICAgKi9cbiAgICB0cmlnZ2VyVG9hc3QodGV4dDogc3RyaW5nLCBwYXJtczogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBtIGluIHBhcm1zKSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgve3Bhcm19LywgcGFybXNbbV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHRcbiAgICB9LFxuICAgIHRyaWdnZXJOdW1iZXIoaW5mbzogbnVtYmVyLCBsaW1pdDogbnVtYmVyID0gMikge1xuICAgICAgICByZXR1cm4gaW5mby50b0ZpeGVkKGxpbWl0KVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogc2Vj56eS6L2s5Li65pe2OuWIhjrnp5LmoLzlvI9cbiAgICAgKiBAcGFyYW0gc2VjIFxuICAgICAqL1xuICAgIGZvcm1hdEhvdXJBbmRNaW51dGUoc2VjOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGggPSBNYXRoLmZsb29yKHNlYyAvIDM2MDApXG4gICAgICAgIGxldCBtID0gTWF0aC5mbG9vcihzZWMgJSAzNjAwIC8gNjApXG4gICAgICAgIGxldCBzID0gc2VjICUgMzYwMFxuXG4gICAgICAgIGxldCBob3VyOiBzdHJpbmcgPSBoIDwgMTAgPyBcIjBcIiArIGggOiBcIlwiICsgaFxuICAgICAgICBsZXQgbWludXRlOiBzdHJpbmcgPSBtIDwgMTAgPyBcIjBcIiArIG0gOiBcIlwiICsgbVxuICAgICAgICBsZXQgc2Vjb25kOiBzdHJpbmcgPSBzIDwgMTAgPyBcIjBcIiArIHMgOiBcIlwiICsgc1xuXG4gICAgICAgIHJldHVybiBob3VyICsgXCI6XCIgKyBtaW51dGUgKyBcIjpcIiArIHNlY29uZFxuICAgIH0sXG4gICAgLyoqXG4gICAgICogc2Vj56eS6L2s5Li65YiGOuenkuagvOW8j1xuICAgICAqIEBwYXJhbSBzZWMgXG4gICAgICovXG4gICAgZm9ybWF0T25seU1pbnV0ZShzZWM6IG51bWJlcikge1xuICAgICAgICBsZXQgbSA9IE1hdGguZmxvb3Ioc2VjIC8gNjApXG4gICAgICAgIGxldCBzID0gc2VjICUgMzYwMFxuXG4gICAgICAgIGxldCBtaW51dGU6IHN0cmluZyA9IG0gPCAxMCA/IFwiMFwiICsgbSA6IFwiXCIgKyBtXG4gICAgICAgIGxldCBzZWNvbmQ6IHN0cmluZyA9IHMgPCAxMCA/IFwiMFwiICsgcyA6IFwiXCIgKyBzXG5cbiAgICAgICAgcmV0dXJuIG1pbnV0ZSArIFwiOlwiICsgc2Vjb25kXG4gICAgfVxufSJdfQ==