
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsXFx0b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRztBQUNIO0lBQUE7SUFxUEEsQ0FBQztJQW5QQzs7O09BR0c7SUFDSCx3QkFBUyxHQUFULFVBQVcsR0FBTztRQUNaLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsZ0JBQWdCO1lBQzFCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLEdBQUcsWUFBWSxJQUFJLEVBQUU7WUFDdkIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUNELElBQUksR0FBRyxZQUFZLE1BQU0sRUFBRTtZQUN6QixPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxHQUFHLFlBQVksUUFBUSxFQUFFO1lBQzNCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxVQUFVO2FBQ2hEO1lBQ0QsT0FBTyxNQUFNLENBQUM7U0FDaEI7UUFDRCxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osS0FBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDbEIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcs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O0lBR0wsV0FBQztBQUFELENBclBBLEFBcVBDLElBQUE7QUFFRCxrQkFBZSxJQUFJLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDlt6XlhbfnsbtcbiAqIOm7juS8n+adg1xuICogMjAyMS4xLjE0XG4gKi9cbmNsYXNzIHRvb2wgIHtcblxuICAvKipcbiAgICog5rex5bqm5ou36LSdXG4gICAqIEBwYXJhbSBvYmog5Lu75L2V5LiA5LiqXG4gICAqL1xuICBkZWVwQ2xvbmUgKG9iajphbnkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9iaikgeyAvLyBvYmog5pivIG51bGznmoTmg4XlhrVcbiAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3T2JqO1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBuZXdPYmogPSBbXTtcbiAgICAgICAgICBmb3IobGV0IGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICAgICAgICBuZXdPYmoucHVzaCh0aGlzLmRlZXBDbG9uZShvYmpbaV0pKTsvL+mAkuW9kuaTjeS9nOW1jOWll+WvueixoVxuICAgICAgICAgICB9XG4gICAgICAgICAgIHJldHVybiBuZXdPYmo7XG4gICAgICAgIH1cbiAgICAgICAgbmV3T2JqID0ge307XG4gICAgICAgIGZvcihsZXQga2V5IGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld09ialtrZXldID0gdGhpcy5kZWVwQ2xvbmUob2JqW2tleV0pOy8v6YCS5b2S5pON5L2c5bWM5aWX5a+56LGhXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdPYmo7XG4gICAgfVxuICAgICAgXG4gICAgLyoqXG4gICAgICog6I635Y+W5pWw57uE6YeM6Z2i5p+Q5Liq5Lic6KW/5bm26L+U5Zue5Lic6KW/77yM5rKh5pyJ5YiZbnVsbFxuICAgICAqIEBwYXJhbSBrZXkgS2V55ZCNXG4gICAgICogQHBhcmFtIHZhbHVlIOWAvFxuICAgICAqIEBwYXJhbSBhcnIg5pWw57uEXG4gICAgICogQHBhcmFtIG51bSDlj5blpJrlsJHkuKrvvIjnm7jlkIznmoTlgLzlvpfml7blgJnvvInkuI3lhpnpu5jorqQx5Liq77yMLTHliJnlhajpg6hcbiAgICAgKi9cbiAgICBHZXRBcnJEYXRhKGtleTpzdHJpbmcsdmFsdWU6YW55LGFycjphbnlbXSxudW06bnVtYmVyID0gMSl7XG4gICAgICAgIGxldCBuZXdBcnI6YW55W10gPSBbXTtcbiAgICAgICAgaWYoYXJyJiZhcnIubGVuZ3RoPjApe1xuICAgICAgICAgIGZvcihsZXQgaSA9IDA7aTxhcnIubGVuZ3RoO2krKyl7XG5cbiAgICAgICAgICAgIGlmKGFycltpXVtrZXldPT12YWx1ZSl7XG4gICAgICAgICAgICAgIG5ld0Fyci5wdXNoKHRoaXMuZGVlcENsb25lKGFycltpXSkpO1xuICAgICAgICAgICAgICBpZihudW0+PW5ld0Fyci5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdldEFyckRhdGEgLS0tLS0tLS0tLS06IFwiKyBuZXdBcnIubGVuZ3RoKVxuXHRcdC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0yLS0tLS0tLTogXCIrIG5ld0FycilcbiAgICAgICAgaWYobmV3QXJyLmxlbmd0aD4wKXtcbiAgICAgICAgICBpZihudW09PTEpe1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcIkdldEFyckRhdGEgLS0tLS0tLS0tLS06IOi/lOWbniBcIisgbmV3QXJyWzBdKVxuICAgICAgICAgICAgcmV0dXJuIG5ld0FyclswXTtcbiAgICAgICAgICB9ZWxzZXtcblx0XHRcdC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0tLS0tLS0tOiDov5Tlm54yXCIpXG4gICAgICAgICAgICByZXR1cm4gbmV3QXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiR2V0QXJyRGF0YSAtLS0tLS0tLS0tLTog6L+U5Zue56m6XCIpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog6YeN6K6+5pWw57uE6YeM6Z2i5p+Q5Liq5Lic6KW/5bm26L+U5Zue5piv5ZCm5oiQ5YqfXG4gICAgICogQHBhcmFtIGtleTEg5p+l5om+S2V55ZCNXG4gICAgICogQHBhcmFtIHZhbHVlMSDmn6Xmib7lgLxcbiAgICAgKiBAcGFyYW0ga2V5MiDpnIDopoHkv67mlLlLZXnlkI1cbiAgICAgKiBAcGFyYW0gdmFsdWUyIOmcgOimgeS/ruaUueeahOWAvFxuICAgICAqIEBwYXJhbSBhcnIg5pWw57uEXG4gICAgICovXG4gICAgc2V0QXJyRGF0YShrZXkxOnN0cmluZyx2YWx1ZTE6YW55LGtleTI6c3RyaW5nLHZhbHVlMjphbnksYXJyOmFueVtdKTpib29sZWFue1xuICAgICAgICAvL+m7mOiupOWksei0pVxuICAgICAgICBsZXQgaXNTdWNjZXNzOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwO2k8YXJyLmxlbmd0aDtpKyspe1xuXG4gICAgICAgICAgICBpZihhcnJbaV1ba2V5MV09PXZhbHVlMSl7XG4gICAgICAgICAgICAgICAgYXJyW2ldW2tleTJdID0gdmFsdWUyO1xuICAgICAgICAgICAgICAgIGlzU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXNTdWNjZXNzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlumaj+acuuaVsFxuICAgICAqIEBwYXJhbSBtaW4g5pyA5bCPXG4gICAgICogQHBhcmFtIG1heCDmnIDlpKdcbiAgICAgKiBAcGFyYW0gdHlwZSDnsbvlnosgMDrkuKLlvIPlsI/mlbDpg6jliIYs5L+d55WZ5pW05pWw6YOo5YiGIDE65ZCR5LiK5Y+W5pW0LOacieWwj+aVsOWwseaVtOaVsOmDqOWIhuWKoDFcbiAgICAgKiAyOuWQkeS4i+WPluaVtCzkuKLlvIPlsI/mlbDpg6jliIYgMzrlm5voiI3kupTlhaUgNDrkuI3lgZrku7vkvZXovazkuYlcbiAgICAgKi9cbiAgICBHZXRSYW5kb20obWluOm51bWJlcixtYXg6bnVtYmVyLHR5cGU6bnVtYmVyPTApe1xuXG4gICAgICBsZXQgbWluTnVtOm51bWJlciA9IE51bWJlcihtaW4pO1xuICAgICAgbGV0IG1heE51bTpudW1iZXIgPSBOdW1iZXIobWF4KTtcbiAgICAgIGxldCBudW06bnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIChtYXhOdW0gLSBtaW5OdW0gKSsgbWluTnVtO1xuICAgICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICAgIGNhc2UgMCA6XG4gICAgICAgICAgICBudW0gPSBwYXJzZUludChudW0udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBudW0gPSBNYXRoLmNlaWwobnVtKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIG51bSA9IE1hdGguZmxvb3IobnVtKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIG51bSA9IE1hdGgucm91bmQobnVtKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVtO1xuXG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIOaxguS4pOeCueS5i+mXtOeahOinkuW6plxuICAgICAqIEBwYXJhbSBwMSDngrkxXG4gICAgICogQHBhcmFtIHAyIOeCuTJcbiAgICAgKi9cbiAgICBHZXRQb3NBbmdsZShwMTpjYy5WZWMyLHAyOmNjLlZlYzIpe1xuICAgICAgLy/orqHnrpflh7rmnJ3lkJFcbiAgICAgICAgbGV0IGR4Om51bWJlciA9IHAyLnggLSBwMS54O1xuICAgICAgICBsZXQgZHk6bnVtYmVyID0gcDIueSAtIHAxLnk7XG4gICAgICAgIGxldCBkaXI6Y2MuVmVjMiA9IGNjLnYyKGR4LGR5KTtcbiAgICBcbiAgICAgICAgLy/moLnmja7mnJ3lkJHorqHnrpflh7rlpLnop5LlvKfluqZcbiAgICAgICAgbGV0IGFuZ2xlOm51bWJlciA9IGRpci5zaWduQW5nbGUoY2MudjIoMSwwKSk7XG4gIFxuICAgICAgICAvL+WwhuW8p+W6pui9rOaNouS4uuasp+aLieinklxuICAgICAgICBsZXQgZGVncmVlOm51bWJlciA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MCs5MDtcblxuICAgICAgICByZXR1cm4gLWRlZ3JlZVxuXG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIOaJk+S5seaVsOe7hFxuICAgICAqIEBwYXJhbSBhcnIg5pWw57uEXG4gICAgICovXG4gICAgcmFuZG9tQXJyKGFycjphbnlbXSl7XG4gICAgICAgIGFyci5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaXtumXtOaNoueul1xuICAgICAqIEBwYXJhbSB0aW1lIFxuICAgICAqIEBwYXJhbSBudW0gMTrnp5IgMu+8muenkuWSjOWIhiAz77ya5YWo6YO95pyJXG4gICAgICovXG4gICAgY2hhbmdlVGltZSh0aW1lOm51bWJlcixudW06bnVtYmVyPTIpe1xuXG4gICAgICAgIGxldCBoOm51bWJlciA9IE1hdGguZmxvb3IodGltZS82MC82MCk7XG4gICAgICAgIGxldCBtOm51bWJlciA9IE1hdGguZmxvb3IodGltZS82MCk7XG4gICAgICAgIGxldCBzOm51bWJlciA9IE1hdGguZmxvb3IodGltZSU2MCk7XG5cbiAgICAgICAgbGV0IGhTdHIgPSAoaDwxMD9cIjBcIjpcIlwiKStoO1xuICAgICAgICBsZXQgbVN0ciA9IChtPDEwP1wiMFwiOlwiXCIpK207XG4gICAgICAgIGxldCBzU3RyID0gKHM8MTA/XCIwXCI6XCJcIikrcztcblxuICAgICAgICBsZXQgc3RyID0gbnVsbDtcblxuICAgICAgICBpZihudW09PTMpe1xuICAgICAgICAgIHN0ciA9IGhTdHIrXCI6XCIrbVN0citcIjpcIitzU3RyO1xuICAgICAgICB9ZWxzZSBpZihudW09PTIpe1xuICAgICAgICAgIHN0ciA9IG1TdHIrXCI6XCIrc1N0cjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgc3RyID0gc1N0cjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuXG4gICAgfVxuXG4gICAgLyoqIFxuICAgICAqIOi3neemu+eJueWumueahOaXtumXtOi/mOW3ruWkmuWwkVxuICAgICAqIEBwYXJhbSBob3VycyDlsI/ml7Yg6buY6K6k5YeM5pmoXG4gICAgKi9cbiAgICBmb3JtYXREYXRhKGhvdXJzOm51bWJlciA9IDI0KTpzdHJpbmd7ICAgICAgICBcbiAgICAgICAgbGV0IGRhdGU6IGFueSA9IG5ldyBEYXRlKCk7ICAgICAgICBcbiAgICAgICAgbGV0IHRlbXBoaCA9IGhvdXJzIC0gMSAtIGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgbGV0IHRlbXBNaW51dGVzID0gNTkgLSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgbGV0IHRlbXBTZWNvbmRzID0gNTkgLSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgaWYodGVtcGhoPDApe1xuICAgICAgICAgIHRlbXBoaCs9MjQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhoID0gKHRlbXBoaCA8IDEwID8gJzAnICsgdGVtcGhoIDogdGVtcGhoKSArICc6JztcbiAgICAgICAgbGV0IG1tID0gKHRlbXBNaW51dGVzIDwgMTAgPyAnMCcgKyB0ZW1wTWludXRlcyA6IHRlbXBNaW51dGVzKSArICc6JztcbiAgICAgICAgbGV0IHNzID0gKHRlbXBTZWNvbmRzIDwgMTAgPyAnMCcgKyB0ZW1wU2Vjb25kcyA6IHRlbXBTZWNvbmRzKTtcbiAgICAgICAgcmV0dXJuIGhoICsgbW0gKyBzcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDljZXkvY3ovazmjaJcbiAgICAgKiBAcGFyYW0gbnVtMSDkvKDlhaXmlbDlrZdcbiAgICAgKiBAcGFyYW0gbnVtMiDkv53nlZnlpJrlsJHkvY0o6buY6K6kMilcbiAgICAgKi9cbiAgICBjaGFuZ2VVbml0KG51bTE6bnVtYmVyLG51bTI6bnVtYmVyPTIpOnN0cmluZ3tcbiAgICAgIC8v5o2i566X6ZW/5bqmXG4gICAgICBsZXQgbmV3TnVtOm51bWJlciA9IFN0cmluZyhudW0xKS5sZW5ndGg7XG4gICAgICBsZXQgaXNUcmVlTXVsdGlwbGU6Ym9vbGVhbiA9IG5ld051bSUzPT0wO1xuICAgICAgbGV0IExlbjpudW1iZXIgPSBNYXRoLmZsb29yKG5ld051bS8zKTtcbiAgICAgIC8v5Y2V5L2NXG4gICAgICBsZXQgdW5pdDpzdHJpbmdbXSA9IFtcIlwiLFwiS1wiLFwiTVwiLFwiQlwiLFwiVFwiLFwiUVwiXTtcbiAgICAgIGlmKExlbj51bml0Lmxlbmd0aC0xKXtcbiAgICAgICAgIExlbiA9IHVuaXQubGVuZ3RoLTE7XG4gICAgICB9XG4gICAgICBMZW4gLT0gaXNUcmVlTXVsdGlwbGU/MTowO1xuICAgICAgbGV0IHN0cjpzdHJpbmcgPSAobnVtMS8oTWF0aC5wb3coMTAwMCxMZW4pKSkudG9GaXhlZChudW0yKTtcbiAgICAgIGZvcihsZXQgaSA9IDA7aTwyOyl7XG4gICAgICAgIGxldCBsYXN0TnVtOnN0cmluZyA9IHN0ci5zdWJzdHIoLTEpO1xuICAgICAgICBpZihsYXN0TnVtID09IFwiMFwiKXtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHIoMCxzdHIubGFzdEluZGV4T2YoXCIwXCIpKTtcbiAgICAgICAgICAgICBpKys7IFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihzdHIuc3Vic3RyKC0xKT09XCIuXCIpe1xuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKDAsc3RyLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyK3VuaXRbTGVuXTtcblxuICAgIH1cbiAgIFxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgdG9vbCgpOyJdfQ==