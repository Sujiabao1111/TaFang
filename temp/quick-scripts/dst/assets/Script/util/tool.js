
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/util/tool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '05ff8rVrVxDH4rTxmiAzf59', 'tool');
// Script/util/tool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 工具类
 * 黎伟权
 * 2021.1.14
 */
var tool = /** @class */ (function () {
    function tool() {
    }
    /**
     * 深度拷贝
     * @param obj 任何一个
     */
    tool.prototype.deepClone = function (obj) {
        if (typeof obj !== 'object') {
            return obj;
        }
        if (!obj) { // obj 是 null的情况
            return obj;
        }
        if (obj instanceof Date) {
            return new Date(obj);
        }
        if (obj instanceof RegExp) {
            return new RegExp(obj);
        }
        if (obj instanceof Function) {
            return obj;
        }
        var newObj;
        if (obj instanceof Array) {
            newObj = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                newObj.push(this.deepClone(obj[i])); //递归操作嵌套对象
            }
            return newObj;
        }
        newObj = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] !== 'object') {
                    newObj[key] = obj[key];
                }
                else {
                    newObj[key] = this.deepClone(obj[key]); //递归操作嵌套对象
                }
            }
        }
        return newObj;
    };
    /**
     * 获取数组里面某个东西并返回东西，没有则null
     * @param key Key名
     * @param value 值
     * @param arr 数组
     * @param num 取多少个（相同的值得时候）不写默认1个，-1则全部
     */
    tool.prototype.GetArrData = function (key, value, arr, num) {
        if (num === void 0) { num = 1; }
        var newArr = [];
        if (arr && arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][key] == value) {
                    newArr.push(this.deepClone(arr[i]));
                    if (num >= newArr.length) {
                        break;
                    }
                }
            }
        }
        //console.log("GetArrData -----------: "+ newArr.length)
        //console.log("GetArrData ----2-------: "+ newArr)
        if (newArr.length > 0) {
            if (num == 1) {
                //console.log("GetArrData -----------: 返回 "+ newArr[0])
                return newArr[0];
            }
            else {
                //console.log("GetArrData -----------: 返回2")
                return newArr;
            }
        }
        else {
            //console.log("GetArrData -----------: 返回空")
            return null;
        }
    };
    /**
     * 重设数组里面某个东西并返回是否成功
     * @param key1 查找Key名
     * @param value1 查找值
     * @param key2 需要修改Key名
     * @param value2 需要修改的值
     * @param arr 数组
     */
    tool.prototype.setArrData = function (key1, value1, key2, value2, arr) {
        //默认失败
        var isSuccess = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key1] == value1) {
                arr[i][key2] = value2;
                isSuccess = true;
                break;
            }
        }
        return isSuccess;
    };
    /**
     * 获取随机数
     * @param min 最小
     * @param max 最大
     * @param type 类型 0:丢弃小数部分,保留整数部分 1:向上取整,有小数就整数部分加1
     * 2:向下取整,丢弃小数部分 3:四舍五入 4:不做任何转义
     */
    tool.prototype.GetRandom = function (min, max, type) {
        if (type === void 0) { type = 0; }
        var minNum = Number(min);
        var maxNum = Number(max);
        var num = Math.random() * (maxNum - minNum) + minNum;
        switch (type) {
            case 0:
                num = parseInt(num.toString());
                break;
            case 1:
                num = Math.ceil(num);
                break;
            case 2:
                num = Math.floor(num);
                break;
            case 3:
                num = Math.round(num);
                break;
            case 4:
                break;
        }
        return num;
    };
    /**
     * 求两点之间的角度
     * @param p1 点1
     * @param p2 点2
     */
    tool.prototype.GetPosAngle = function (p1, p2) {
        //计算出朝向
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        var dir = cc.v2(dx, dy);
        //根据朝向计算出夹角弧度
        var angle = dir.signAngle(cc.v2(1, 0));
        //将弧度转换为欧拉角
        var degree = angle / Math.PI * 180 + 90;
        return -degree;
    };
    /**
     * 打乱数组
     * @param arr 数组
     */
    tool.prototype.randomArr = function (arr) {
        arr.sort(function () { return Math.random() - 0.5; });
        return arr;
    };
    /**
     * 时间换算
     * @param time
     * @param num 1:秒 2：秒和分 3：全都有
     */
    tool.prototype.changeTime = function (time, num) {
        if (num === void 0) { num = 2; }
        var h = Math.floor(time / 60 / 60);
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);
        var hStr = (h < 10 ? "0" : "") + h;
        var mStr = (m < 10 ? "0" : "") + m;
        var sStr = (s < 10 ? "0" : "") + s;
        var str = null;
        if (num == 3) {
            str = hStr + ":" + mStr + ":" + sStr;
        }
        else if (num == 2) {
            str = mStr + ":" + sStr;
        }
        else {
            str = sStr;
        }
        return str;
    };
    /**
     * 距离特定的时间还差多少
     * @param hours 小时 默认凌晨
    */
    tool.prototype.formatData = function (hours) {
        if (hours === void 0) { hours = 24; }
        var date = new Date();
        var temphh = hours - 1 - date.getHours();
        var tempMinutes = 59 - date.getMinutes();
        var tempSeconds = 59 - date.getSeconds();
        if (temphh < 0) {
            temphh += 24;
        }
        var hh = (temphh < 10 ? '0' + temphh : temphh) + ':';
        var mm = (tempMinutes < 10 ? '0' + tempMinutes : tempMinutes) + ':';
        var ss = (tempSeconds < 10 ? '0' + tempSeconds : tempSeconds);
        return hh + mm + ss;
    };
    /**
     * 单位转换
     * @param num1 传入数字
     * @param num2 保留多少位(默认2)
     */
    tool.prototype.changeUnit = function (num1, num2) {
        if (num2 === void 0) { num2 = 2; }
        //换算长度
        var newNum = String(num1).length;
        var isTreeMultiple = newNum % 3 == 0;
        var Len = Math.floor(newNum / 3);
        //单位
        var unit = ["", "K", "M", "B", "T", "Q"];
        if (Len > unit.length - 1) {
            Len = unit.length - 1;
        }
        Len -= isTreeMultiple ? 1 : 0;
        var str = (num1 / (Math.pow(1000, Len))).toFixed(num2);
        for (var i = 0; i < 2;) {
            var lastNum = str.substr(-1);
            if (lastNum == "0") {
                str = str.substr(0, str.lastIndexOf("0"));
                i++;
            }
            else {
                break;
            }
        }
        if (str.substr(-1) == ".") {
            str = str.substr(0, str.lastIndexOf("."));
        }
        return str + unit[Len];
    };
    return tool;
}());
exports.default = new tool();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsXFx0b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRztBQUNIO0lBQUE7SUFxUEEsQ0FBQztJQW5QQzs7O09BR0c7SUFDSCx3QkFBUyxHQUFULFVBQVcsR0FBTztRQUNaLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsZ0JBQWdCO1lBQzFCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLEdBQUcsWUFBWSxJQUFJLEVBQUU7WUFDdkIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUNELElBQUksR0FBRyxZQUFZLE1BQU0sRUFBRTtZQUN6QixPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxHQUFHLFlBQVksUUFBUSxFQUFFO1lBQzNCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxVQUFVO2FBQ2hEO1lBQ0QsT0FBTyxNQUFNLENBQUM7U0FDaEI7UUFDRCxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osS0FBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDbEIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcs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O0lBR0wsV0FBQztBQUFELENBclBBLEFBcVBDLElBQUE7QUFFRCxrQkFBZSxJQUFJLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOW3peWFt+exu1xyXG4gKiDpu47kvJ/mnYNcclxuICogMjAyMS4xLjE0XHJcbiAqL1xyXG5jbGFzcyB0b29sICB7XHJcblxyXG4gIC8qKlxyXG4gICAqIOa3seW6puaLt+i0nVxyXG4gICAqIEBwYXJhbSBvYmog5Lu75L2V5LiA5LiqXHJcbiAgICovXHJcbiAgZGVlcENsb25lIChvYmo6YW55KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW9iaikgeyAvLyBvYmog5pivIG51bGznmoTmg4XlhrVcclxuICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IERhdGUob2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAob2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3T2JqO1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgbmV3T2JqID0gW107XHJcbiAgICAgICAgICBmb3IobGV0IGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xyXG4gICAgICAgICAgICAgIG5ld09iai5wdXNoKHRoaXMuZGVlcENsb25lKG9ialtpXSkpOy8v6YCS5b2S5pON5L2c5bWM5aWX5a+56LGhXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIHJldHVybiBuZXdPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld09iaiA9IHt9O1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IHRoaXMuZGVlcENsb25lKG9ialtrZXldKTsvL+mAkuW9kuaTjeS9nOW1jOWll+WvueixoVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdPYmo7XHJcbiAgICB9XHJcbiAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmlbDnu4Tph4zpnaLmn5DkuKrkuJzopb/lubbov5Tlm57kuJzopb/vvIzmsqHmnInliJludWxsXHJcbiAgICAgKiBAcGFyYW0ga2V5IEtleeWQjVxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWAvFxyXG4gICAgICogQHBhcmFtIGFyciDmlbDnu4RcclxuICAgICAqIEBwYXJhbSBudW0g5Y+W5aSa5bCR5Liq77yI55u45ZCM55qE5YC85b6X5pe25YCZ77yJ5LiN5YaZ6buY6K6kMeS4qu+8jC0x5YiZ5YWo6YOoXHJcbiAgICAgKi9cclxuICAgIEdldEFyckRhdGEoa2V5OnN0cmluZyx2YWx1ZTphbnksYXJyOmFueVtdLG51bTpudW1iZXIgPSAxKXtcclxuICAgICAgICBsZXQgbmV3QXJyOmFueVtdID0gW107XHJcbiAgICAgICAgaWYoYXJyJiZhcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgZm9yKGxldCBpID0gMDtpPGFyci5sZW5ndGg7aSsrKXtcclxuXHJcbiAgICAgICAgICAgIGlmKGFycltpXVtrZXldPT12YWx1ZSl7XHJcbiAgICAgICAgICAgICAgbmV3QXJyLnB1c2godGhpcy5kZWVwQ2xvbmUoYXJyW2ldKSk7XHJcbiAgICAgICAgICAgICAgaWYobnVtPj1uZXdBcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0tLS0tLS0tOiBcIisgbmV3QXJyLmxlbmd0aClcclxuXHRcdC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0yLS0tLS0tLTogXCIrIG5ld0FycilcclxuICAgICAgICBpZihuZXdBcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgaWYobnVtPT0xKXtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcIkdldEFyckRhdGEgLS0tLS0tLS0tLS06IOi/lOWbniBcIisgbmV3QXJyWzBdKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3QXJyWzBdO1xyXG4gICAgICAgICAgfWVsc2V7XHJcblx0XHRcdC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0tLS0tLS0tOiDov5Tlm54yXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdBcnI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcblx0XHRcdC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0tLS0tLS0tOiDov5Tlm57nqbpcIilcclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+5pWw57uE6YeM6Z2i5p+Q5Liq5Lic6KW/5bm26L+U5Zue5piv5ZCm5oiQ5YqfXHJcbiAgICAgKiBAcGFyYW0ga2V5MSDmn6Xmib5LZXnlkI1cclxuICAgICAqIEBwYXJhbSB2YWx1ZTEg5p+l5om+5YC8XHJcbiAgICAgKiBAcGFyYW0ga2V5MiDpnIDopoHkv67mlLlLZXnlkI1cclxuICAgICAqIEBwYXJhbSB2YWx1ZTIg6ZyA6KaB5L+u5pS555qE5YC8XHJcbiAgICAgKiBAcGFyYW0gYXJyIOaVsOe7hFxyXG4gICAgICovXHJcbiAgICBzZXRBcnJEYXRhKGtleTE6c3RyaW5nLHZhbHVlMTphbnksa2V5MjpzdHJpbmcsdmFsdWUyOmFueSxhcnI6YW55W10pOmJvb2xlYW57XHJcbiAgICAgICAgLy/pu5jorqTlpLHotKVcclxuICAgICAgICBsZXQgaXNTdWNjZXNzOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPGFyci5sZW5ndGg7aSsrKXtcclxuXHJcbiAgICAgICAgICAgIGlmKGFycltpXVtrZXkxXT09dmFsdWUxKXtcclxuICAgICAgICAgICAgICAgIGFycltpXVtrZXkyXSA9IHZhbHVlMjtcclxuICAgICAgICAgICAgICAgIGlzU3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlzU3VjY2VzcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumaj+acuuaVsFxyXG4gICAgICogQHBhcmFtIG1pbiDmnIDlsI9cclxuICAgICAqIEBwYXJhbSBtYXgg5pyA5aSnXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDnsbvlnosgMDrkuKLlvIPlsI/mlbDpg6jliIYs5L+d55WZ5pW05pWw6YOo5YiGIDE65ZCR5LiK5Y+W5pW0LOacieWwj+aVsOWwseaVtOaVsOmDqOWIhuWKoDFcclxuICAgICAqIDI65ZCR5LiL5Y+W5pW0LOS4ouW8g+Wwj+aVsOmDqOWIhiAzOuWbm+iIjeS6lOWFpSA0OuS4jeWBmuS7u+S9lei9rOS5iVxyXG4gICAgICovXHJcbiAgICBHZXRSYW5kb20obWluOm51bWJlcixtYXg6bnVtYmVyLHR5cGU6bnVtYmVyPTApe1xyXG5cclxuICAgICAgbGV0IG1pbk51bTpudW1iZXIgPSBOdW1iZXIobWluKTtcclxuICAgICAgbGV0IG1heE51bTpudW1iZXIgPSBOdW1iZXIobWF4KTtcclxuICAgICAgbGV0IG51bTpudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogKG1heE51bSAtIG1pbk51bSApKyBtaW5OdW07XHJcbiAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgIGNhc2UgMCA6XHJcbiAgICAgICAgICAgIG51bSA9IHBhcnNlSW50KG51bS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIG51bSA9IE1hdGguY2VpbChudW0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgbnVtID0gTWF0aC5mbG9vcihudW0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgbnVtID0gTWF0aC5yb3VuZChudW0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBudW07XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOaxguS4pOeCueS5i+mXtOeahOinkuW6plxyXG4gICAgICogQHBhcmFtIHAxIOeCuTFcclxuICAgICAqIEBwYXJhbSBwMiDngrkyXHJcbiAgICAgKi9cclxuICAgIEdldFBvc0FuZ2xlKHAxOmNjLlZlYzIscDI6Y2MuVmVjMil7XHJcbiAgICAgIC8v6K6h566X5Ye65pyd5ZCRXHJcbiAgICAgICAgbGV0IGR4Om51bWJlciA9IHAyLnggLSBwMS54O1xyXG4gICAgICAgIGxldCBkeTpudW1iZXIgPSBwMi55IC0gcDEueTtcclxuICAgICAgICBsZXQgZGlyOmNjLlZlYzIgPSBjYy52MihkeCxkeSk7XHJcbiAgICBcclxuICAgICAgICAvL+agueaNruacneWQkeiuoeeul+WHuuWkueinkuW8p+W6plxyXG4gICAgICAgIGxldCBhbmdsZTpudW1iZXIgPSBkaXIuc2lnbkFuZ2xlKGNjLnYyKDEsMCkpO1xyXG4gIFxyXG4gICAgICAgIC8v5bCG5byn5bqm6L2s5o2i5Li65qyn5ouJ6KeSXHJcbiAgICAgICAgbGV0IGRlZ3JlZTpudW1iZXIgPSBhbmdsZSAvIE1hdGguUEkgKiAxODArOTA7XHJcblxyXG4gICAgICAgIHJldHVybiAtZGVncmVlXHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOaJk+S5seaVsOe7hFxyXG4gICAgICogQHBhcmFtIGFyciDmlbDnu4RcclxuICAgICAqL1xyXG4gICAgcmFuZG9tQXJyKGFycjphbnlbXSl7XHJcbiAgICAgICAgYXJyLnNvcnQoKCkgPT4gTWF0aC5yYW5kb20oKSAtIDAuNSk7XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXtumXtOaNoueul1xyXG4gICAgICogQHBhcmFtIHRpbWUgXHJcbiAgICAgKiBAcGFyYW0gbnVtIDE656eSIDLvvJrnp5LlkozliIYgM++8muWFqOmDveaciVxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VUaW1lKHRpbWU6bnVtYmVyLG51bTpudW1iZXI9Mil7XHJcblxyXG4gICAgICAgIGxldCBoOm51bWJlciA9IE1hdGguZmxvb3IodGltZS82MC82MCk7XHJcbiAgICAgICAgbGV0IG06bnVtYmVyID0gTWF0aC5mbG9vcih0aW1lLzYwKTtcclxuICAgICAgICBsZXQgczpudW1iZXIgPSBNYXRoLmZsb29yKHRpbWUlNjApO1xyXG5cclxuICAgICAgICBsZXQgaFN0ciA9IChoPDEwP1wiMFwiOlwiXCIpK2g7XHJcbiAgICAgICAgbGV0IG1TdHIgPSAobTwxMD9cIjBcIjpcIlwiKSttO1xyXG4gICAgICAgIGxldCBzU3RyID0gKHM8MTA/XCIwXCI6XCJcIikrcztcclxuXHJcbiAgICAgICAgbGV0IHN0ciA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmKG51bT09Myl7XHJcbiAgICAgICAgICBzdHIgPSBoU3RyK1wiOlwiK21TdHIrXCI6XCIrc1N0cjtcclxuICAgICAgICB9ZWxzZSBpZihudW09PTIpe1xyXG4gICAgICAgICAgc3RyID0gbVN0citcIjpcIitzU3RyO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgc3RyID0gc1N0cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICog6Led56a754m55a6a55qE5pe26Ze06L+Y5beu5aSa5bCRXHJcbiAgICAgKiBAcGFyYW0gaG91cnMg5bCP5pe2IOm7mOiupOWHjOaZqFxyXG4gICAgKi9cclxuICAgIGZvcm1hdERhdGEoaG91cnM6bnVtYmVyID0gMjQpOnN0cmluZ3sgICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRlOiBhbnkgPSBuZXcgRGF0ZSgpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHRlbXBoaCA9IGhvdXJzIC0gMSAtIGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICBsZXQgdGVtcE1pbnV0ZXMgPSA1OSAtIGRhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgIGxldCB0ZW1wU2Vjb25kcyA9IDU5IC0gZGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgaWYodGVtcGhoPDApe1xyXG4gICAgICAgICAgdGVtcGhoKz0yNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhoID0gKHRlbXBoaCA8IDEwID8gJzAnICsgdGVtcGhoIDogdGVtcGhoKSArICc6JztcclxuICAgICAgICBsZXQgbW0gPSAodGVtcE1pbnV0ZXMgPCAxMCA/ICcwJyArIHRlbXBNaW51dGVzIDogdGVtcE1pbnV0ZXMpICsgJzonO1xyXG4gICAgICAgIGxldCBzcyA9ICh0ZW1wU2Vjb25kcyA8IDEwID8gJzAnICsgdGVtcFNlY29uZHMgOiB0ZW1wU2Vjb25kcyk7XHJcbiAgICAgICAgcmV0dXJuIGhoICsgbW0gKyBzcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWNleS9jei9rOaNolxyXG4gICAgICogQHBhcmFtIG51bTEg5Lyg5YWl5pWw5a2XXHJcbiAgICAgKiBAcGFyYW0gbnVtMiDkv53nlZnlpJrlsJHkvY0o6buY6K6kMilcclxuICAgICAqL1xyXG4gICAgY2hhbmdlVW5pdChudW0xOm51bWJlcixudW0yOm51bWJlcj0yKTpzdHJpbmd7XHJcbiAgICAgIC8v5o2i566X6ZW/5bqmXHJcbiAgICAgIGxldCBuZXdOdW06bnVtYmVyID0gU3RyaW5nKG51bTEpLmxlbmd0aDtcclxuICAgICAgbGV0IGlzVHJlZU11bHRpcGxlOmJvb2xlYW4gPSBuZXdOdW0lMz09MDtcclxuICAgICAgbGV0IExlbjpudW1iZXIgPSBNYXRoLmZsb29yKG5ld051bS8zKTtcclxuICAgICAgLy/ljZXkvY1cclxuICAgICAgbGV0IHVuaXQ6c3RyaW5nW10gPSBbXCJcIixcIktcIixcIk1cIixcIkJcIixcIlRcIixcIlFcIl07XHJcbiAgICAgIGlmKExlbj51bml0Lmxlbmd0aC0xKXtcclxuICAgICAgICAgTGVuID0gdW5pdC5sZW5ndGgtMTtcclxuICAgICAgfVxyXG4gICAgICBMZW4gLT0gaXNUcmVlTXVsdGlwbGU/MTowO1xyXG4gICAgICBsZXQgc3RyOnN0cmluZyA9IChudW0xLyhNYXRoLnBvdygxMDAwLExlbikpKS50b0ZpeGVkKG51bTIpO1xyXG4gICAgICBmb3IobGV0IGkgPSAwO2k8Mjspe1xyXG4gICAgICAgIGxldCBsYXN0TnVtOnN0cmluZyA9IHN0ci5zdWJzdHIoLTEpO1xyXG4gICAgICAgIGlmKGxhc3ROdW0gPT0gXCIwXCIpe1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKDAsc3RyLmxhc3RJbmRleE9mKFwiMFwiKSk7XHJcbiAgICAgICAgICAgICBpKys7IFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYoc3RyLnN1YnN0cigtMSk9PVwiLlwiKXtcclxuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKDAsc3RyLmxhc3RJbmRleE9mKFwiLlwiKSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0cit1bml0W0xlbl07XHJcblxyXG4gICAgfVxyXG4gICBcclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgdG9vbCgpOyJdfQ==