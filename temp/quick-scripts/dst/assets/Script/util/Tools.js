
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/util/Tools.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '81ce80IMmhEJ53xzZA4GUDk', 'Tools');
// Script/util/Tools.ts

"use strict";
/**
 * 工具类
 * 黎伟权
 * 2021.1.14
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tools = void 0;
var env = window["wx"] || window["tt"] || window["ks"] || window["qq"];
var Tools = /** @class */ (function () {
    function Tools() {
    }
    /**
     * 深度拷贝
     * @param obj 任何一个
     */
    Tools.deepClone = function (obj) {
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
    Tools.GetArrData = function (key, value, arr, num) {
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
    Tools.setArrData = function (key1, value1, key2, value2, arr) {
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
    Tools.GetRandom = function (min, max, type) {
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
    Tools.GetPosAngle = function (p1, p2) {
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
    Tools.randomArr = function (arr) {
        arr.sort(function () { return Math.random() - 0.5; });
        return arr;
    };
    /**
     * 时间换算
     * @param time
     * @param num 1:秒 2：秒和分 3：全都有
     */
    Tools.changeTime = function (time, num) {
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
    Tools.formatData = function (hours) {
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
    Tools.changeUnit = function (num1, num2) {
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
    /**
        * 存储本地数据
        * @param {*} isObject 是否是一个对象或者数组
        */
    Tools.setStorage = function (key, value, isObject) {
        if (isObject === void 0) { isObject = false; }
        key = this.storageKey + key;
        if (env) {
            return env.setStorageSync(key, value);
        }
        if (isObject) {
            value = JSON.stringify(value);
        }
        /** 默认cocos 存储数据方法 */
        cc.sys.localStorage.setItem(key, value);
    };
    ;
    /**
    * 获取存储数据
    * @param {*} isObject 是否是一个对象或者数组
    */
    Tools.getStorage = function (key, isObject) {
        if (isObject === void 0) { isObject = false; }
        key = this.storageKey + key;
        var temp = null;
        if (env) {
            temp = env.getStorageSync(key);
            if (temp == "") {
                temp = null;
            }
        }
        else {
            temp = cc.sys.localStorage.getItem(key);
            if (!temp || temp.toString() == "NaN" || temp.toString() == "null") {
                temp = null;
            }
            else if (isObject) {
                temp = JSON.parse(temp);
            }
            else if (typeof temp === "boolean") {
            }
            else if (!isNaN(temp)) {
                temp = parseInt(temp);
            }
        }
        return temp;
    };
    ;
    /**
    * 截断字符串函数
    *
    * @param str 要截断的字符串
    * @returns 截断后的字符串，格式为"前5个字符...最后2个字符"
    */
    Tools.truncateString = function (str) {
        return str.slice(0, 5) + "..." + str.slice(-2);
    };
    /**
   * 将文本复制到剪贴板
   *
   * @param textToCopy 要复制到剪贴板的文本
   */
    Tools.copyToClipboard = function (textToCopy) {
        if (textToCopy == undefined || textToCopy == '') {
            return false;
        }
        // 创建一个临时的textarea元素，将文本放入其中
        var textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        // 选中文本
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        try {
            // 尝试执行复制操作
            document.execCommand('copy');
            console.log('Text copied to clipboard:', textToCopy);
        }
        catch (err) {
            console.error('Unable to copy text to clipboard');
            return false;
        }
        // 移除临时元素
        document.body.removeChild(textarea);
        return true;
    };
    /**
   * 将数字转换为字符串，并根据指定条件格式化数字。
   *
   * @param num 需要转换的数字。
   * @param minFixed 当小数字于10000时，如果小数部分不足此值，则按此值补足小数部分。默认为0。
   * @param fixed 小数点后的固定位数。默认为7。
   * @returns 格式化后的数字字符串。
   */
    Tools.getNumStr = function (num, minFixed, fixed) {
        if (minFixed === void 0) { minFixed = 0; }
        if (fixed === void 0) { fixed = 7; }
        if (num == undefined || isNaN(num)) {
            return '';
        }
        if (num < 10000) {
            // if (minFixed > 0) {
            // 	const str = num.toString();
            // 	const [intPart, decPart = ''] = str.split('.');
            // 	if (decPart.length >= minFixed) {
            // 		return +num.toFixed(fixed) + ''; // 已有足够小数位，直接返回
            // 	}
            // 	num.toFixed(minFixed);
            // }
            return +num.toFixed(fixed) + '';
        }
        return (num / 1000).toFixed(2) + 'k';
    };
    /** 适配 */
    Tools.updateResolution = function () {
        var canvas = cc.find('Canvas').getComponent(cc.Canvas);
        var a = canvas.designResolution.width / canvas.designResolution.height;
        var b = cc.winSize.width / cc.winSize.height;
        canvas.fitHeight = a < b;
        canvas.fitWidth = a >= b;
        cc.view.setResizeCallback(function () {
            // cc.log(canvas.designResolution, cc.winSize, canvas)
            // cc.log(cc.view.getDesignResolutionSize(), cc.view.getVisibleSize())
        });
    };
    Tools.storageKey = "_v1.0.0";
    return Tools;
}());
exports.Tools = Tools;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsXFxUb29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRzs7O0FBRUgsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpFO0lBQUE7SUF3WEEsQ0FBQztJQXRYQzs7O09BR0c7SUFDVyxlQUFTLEdBQXZCLFVBQXdCLEdBQVE7UUFDOUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxnQkFBZ0I7WUFDMUIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksR0FBRyxZQUFZLElBQUksRUFBRTtZQUN2QixPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxHQUFHLFlBQVksTUFBTSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFDRCxJQUFJLEdBQUcsWUFBWSxRQUFRLEVBQUU7WUFDM0IsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksTUFBTSxDQUFDO1FBQ1gsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLFVBQVU7YUFD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QUFNLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDdkUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0MsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ3hCLHNEQUFzRDtZQUN0RCxzRUFBc0U7UUFDeEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBaElhLGdCQUFVLEdBQVcsU0FBUyxDQUFDO0lBa0kvQyxZQUFDO0NBeFhELEFBd1hDLElBQUE7QUF4WFksc0JBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOW3peWFt+exu1xuICog6buO5Lyf5p2DXG4gKiAyMDIxLjEuMTRcbiAqL1xuXG5jb25zdCBlbnYgPSB3aW5kb3dbXCJ3eFwiXSB8fCB3aW5kb3dbXCJ0dFwiXSB8fCB3aW5kb3dbXCJrc1wiXSB8fCB3aW5kb3dbXCJxcVwiXTtcblxuZXhwb3J0IGNsYXNzIFRvb2xzIHtcblxuICAvKipcbiAgICog5rex5bqm5ou36LSdXG4gICAqIEBwYXJhbSBvYmog5Lu75L2V5LiA5LiqXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGRlZXBDbG9uZShvYmo6IGFueSkge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKCFvYmopIHsgLy8gb2JqIOaYryBudWxs55qE5oOF5Ya1XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKG9iaik7XG4gICAgfVxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKG9iaik7XG4gICAgfVxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgbGV0IG5ld09iajtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIG5ld09iaiA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBuZXdPYmoucHVzaCh0aGlzLmRlZXBDbG9uZShvYmpbaV0pKTsvL+mAkuW9kuaTjeS9nOW1jOWll+WvueixoVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld09iajtcbiAgICB9XG4gICAgbmV3T2JqID0ge307XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdPYmpba2V5XSA9IHRoaXMuZGVlcENsb25lKG9ialtrZXldKTsvL+mAkuW9kuaTjeS9nOW1jOWll+WvueixoVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdPYmo7XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5pWw57uE6YeM6Z2i5p+Q5Liq5Lic6KW/5bm26L+U5Zue5Lic6KW/77yM5rKh5pyJ5YiZbnVsbFxuICAgKiBAcGFyYW0ga2V5IEtleeWQjVxuICAgKiBAcGFyYW0gdmFsdWUg5YC8XG4gICAqIEBwYXJhbSBhcnIg5pWw57uEXG4gICAqIEBwYXJhbSBudW0g5Y+W5aSa5bCR5Liq77yI55u45ZCM55qE5YC85b6X5pe25YCZ77yJ5LiN5YaZ6buY6K6kMeS4qu+8jC0x5YiZ5YWo6YOoXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIEdldEFyckRhdGEoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGFycjogYW55W10sIG51bTogbnVtYmVyID0gMSkge1xuICAgIGxldCBuZXdBcnI6IGFueVtdID0gW107XG4gICAgaWYgKGFyciAmJiBhcnIubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBpZiAoYXJyW2ldW2tleV0gPT0gdmFsdWUpIHtcbiAgICAgICAgICBuZXdBcnIucHVzaCh0aGlzLmRlZXBDbG9uZShhcnJbaV0pKTtcbiAgICAgICAgICBpZiAobnVtID49IG5ld0Fyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKFwiR2V0QXJyRGF0YSAtLS0tLS0tLS0tLTogXCIrIG5ld0Fyci5sZW5ndGgpXG4gICAgLy9jb25zb2xlLmxvZyhcIkdldEFyckRhdGEgLS0tLTItLS0tLS0tOiBcIisgbmV3QXJyKVxuICAgIGlmIChuZXdBcnIubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKG51bSA9PSAxKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0tLS0tLS0tOiDov5Tlm54gXCIrIG5ld0FyclswXSlcbiAgICAgICAgcmV0dXJuIG5ld0FyclswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0tLS0tLS0tOiDov5Tlm54yXCIpXG4gICAgICAgIHJldHVybiBuZXdBcnI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0tLS0tLS0tOiDov5Tlm57nqbpcIilcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6YeN6K6+5pWw57uE6YeM6Z2i5p+Q5Liq5Lic6KW/5bm26L+U5Zue5piv5ZCm5oiQ5YqfXG4gICAqIEBwYXJhbSBrZXkxIOafpeaJvktleeWQjVxuICAgKiBAcGFyYW0gdmFsdWUxIOafpeaJvuWAvFxuICAgKiBAcGFyYW0ga2V5MiDpnIDopoHkv67mlLlLZXnlkI1cbiAgICogQHBhcmFtIHZhbHVlMiDpnIDopoHkv67mlLnnmoTlgLxcbiAgICogQHBhcmFtIGFyciDmlbDnu4RcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgc2V0QXJyRGF0YShrZXkxOiBzdHJpbmcsIHZhbHVlMTogYW55LCBrZXkyOiBzdHJpbmcsIHZhbHVlMjogYW55LCBhcnI6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgLy/pu5jorqTlpLHotKVcbiAgICBsZXQgaXNTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXG4gICAgICBpZiAoYXJyW2ldW2tleTFdID09IHZhbHVlMSkge1xuICAgICAgICBhcnJbaV1ba2V5Ml0gPSB2YWx1ZTI7XG4gICAgICAgIGlzU3VjY2VzcyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpc1N1Y2Nlc3M7XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W6ZqP5py65pWwXG4gICAqIEBwYXJhbSBtaW4g5pyA5bCPXG4gICAqIEBwYXJhbSBtYXgg5pyA5aSnXG4gICAqIEBwYXJhbSB0eXBlIOexu+WeiyAwOuS4ouW8g+Wwj+aVsOmDqOWIhizkv53nlZnmlbTmlbDpg6jliIYgMTrlkJHkuIrlj5bmlbQs5pyJ5bCP5pWw5bCx5pW05pWw6YOo5YiG5YqgMVxuICAgKiAyOuWQkeS4i+WPluaVtCzkuKLlvIPlsI/mlbDpg6jliIYgMzrlm5voiI3kupTlhaUgNDrkuI3lgZrku7vkvZXovazkuYlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgR2V0UmFuZG9tKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgdHlwZTogbnVtYmVyID0gMCkge1xuXG4gICAgbGV0IG1pbk51bTogbnVtYmVyID0gTnVtYmVyKG1pbik7XG4gICAgbGV0IG1heE51bTogbnVtYmVyID0gTnVtYmVyKG1heCk7XG4gICAgbGV0IG51bTogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIChtYXhOdW0gLSBtaW5OdW0pICsgbWluTnVtO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBudW0gPSBwYXJzZUludChudW0udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBudW0gPSBNYXRoLmNlaWwobnVtKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIG51bSA9IE1hdGguZmxvb3IobnVtKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIG51bSA9IE1hdGgucm91bmQobnVtKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBudW07XG5cbiAgfVxuXG4gIC8qKlxuICAgKiDmsYLkuKTngrnkuYvpl7TnmoTop5LluqZcbiAgICogQHBhcmFtIHAxIOeCuTFcbiAgICogQHBhcmFtIHAyIOeCuTJcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgR2V0UG9zQW5nbGUocDE6IGNjLlZlYzIsIHAyOiBjYy5WZWMyKSB7XG4gICAgLy/orqHnrpflh7rmnJ3lkJFcbiAgICBsZXQgZHg6IG51bWJlciA9IHAyLnggLSBwMS54O1xuICAgIGxldCBkeTogbnVtYmVyID0gcDIueSAtIHAxLnk7XG4gICAgbGV0IGRpcjogY2MuVmVjMiA9IGNjLnYyKGR4LCBkeSk7XG5cbiAgICAvL+agueaNruacneWQkeiuoeeul+WHuuWkueinkuW8p+W6plxuICAgIGxldCBhbmdsZTogbnVtYmVyID0gZGlyLnNpZ25BbmdsZShjYy52MigxLCAwKSk7XG5cbiAgICAvL+WwhuW8p+W6pui9rOaNouS4uuasp+aLieinklxuICAgIGxldCBkZWdyZWU6IG51bWJlciA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MCArIDkwO1xuXG4gICAgcmV0dXJuIC1kZWdyZWVcblxuICB9XG5cbiAgLyoqXG4gICAqIOaJk+S5seaVsOe7hFxuICAgKiBAcGFyYW0gYXJyIOaVsOe7hFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByYW5kb21BcnIoYXJyOiBhbnlbXSkge1xuICAgIGFyci5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICAvKipcbiAgICog5pe26Ze05o2i566XXG4gICAqIEBwYXJhbSB0aW1lIFxuICAgKiBAcGFyYW0gbnVtIDE656eSIDLvvJrnp5LlkozliIYgM++8muWFqOmDveaciVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBjaGFuZ2VUaW1lKHRpbWU6IG51bWJlciwgbnVtOiBudW1iZXIgPSAyKSB7XG5cbiAgICBsZXQgaDogbnVtYmVyID0gTWF0aC5mbG9vcih0aW1lIC8gNjAgLyA2MCk7XG4gICAgbGV0IG06IG51bWJlciA9IE1hdGguZmxvb3IodGltZSAvIDYwKTtcbiAgICBsZXQgczogbnVtYmVyID0gTWF0aC5mbG9vcih0aW1lICUgNjApO1xuXG4gICAgbGV0IGhTdHIgPSAoaCA8IDEwID8gXCIwXCIgOiBcIlwiKSArIGg7XG4gICAgbGV0IG1TdHIgPSAobSA8IDEwID8gXCIwXCIgOiBcIlwiKSArIG07XG4gICAgbGV0IHNTdHIgPSAocyA8IDEwID8gXCIwXCIgOiBcIlwiKSArIHM7XG5cbiAgICBsZXQgc3RyID0gbnVsbDtcblxuICAgIGlmIChudW0gPT0gMykge1xuICAgICAgc3RyID0gaFN0ciArIFwiOlwiICsgbVN0ciArIFwiOlwiICsgc1N0cjtcbiAgICB9IGVsc2UgaWYgKG51bSA9PSAyKSB7XG4gICAgICBzdHIgPSBtU3RyICsgXCI6XCIgKyBzU3RyO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBzU3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuXG4gIH1cblxuICAvKiogXG4gICAqIOi3neemu+eJueWumueahOaXtumXtOi/mOW3ruWkmuWwkVxuICAgKiBAcGFyYW0gaG91cnMg5bCP5pe2IOm7mOiupOWHjOaZqFxuICAqL1xuICBwdWJsaWMgc3RhdGljIGZvcm1hdERhdGEoaG91cnM6IG51bWJlciA9IDI0KTogc3RyaW5nIHtcbiAgICBsZXQgZGF0ZTogYW55ID0gbmV3IERhdGUoKTtcbiAgICBsZXQgdGVtcGhoID0gaG91cnMgLSAxIC0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCB0ZW1wTWludXRlcyA9IDU5IC0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgbGV0IHRlbXBTZWNvbmRzID0gNTkgLSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICBpZiAodGVtcGhoIDwgMCkge1xuICAgICAgdGVtcGhoICs9IDI0O1xuICAgIH1cbiAgICBsZXQgaGggPSAodGVtcGhoIDwgMTAgPyAnMCcgKyB0ZW1waGggOiB0ZW1waGgpICsgJzonO1xuICAgIGxldCBtbSA9ICh0ZW1wTWludXRlcyA8IDEwID8gJzAnICsgdGVtcE1pbnV0ZXMgOiB0ZW1wTWludXRlcykgKyAnOic7XG4gICAgbGV0IHNzID0gKHRlbXBTZWNvbmRzIDwgMTAgPyAnMCcgKyB0ZW1wU2Vjb25kcyA6IHRlbXBTZWNvbmRzKTtcbiAgICByZXR1cm4gaGggKyBtbSArIHNzO1xuICB9XG5cbiAgLyoqXG4gICAqIOWNleS9jei9rOaNolxuICAgKiBAcGFyYW0gbnVtMSDkvKDlhaXmlbDlrZdcbiAgICogQHBhcmFtIG51bTIg5L+d55WZ5aSa5bCR5L2NKOm7mOiupDIpXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGNoYW5nZVVuaXQobnVtMTogbnVtYmVyLCBudW0yOiBudW1iZXIgPSAyKTogc3RyaW5nIHtcbiAgICAvL+aNoueul+mVv+W6plxuICAgIGxldCBuZXdOdW06IG51bWJlciA9IFN0cmluZyhudW0xKS5sZW5ndGg7XG4gICAgbGV0IGlzVHJlZU11bHRpcGxlOiBib29sZWFuID0gbmV3TnVtICUgMyA9PSAwO1xuICAgIGxldCBMZW46IG51bWJlciA9IE1hdGguZmxvb3IobmV3TnVtIC8gMyk7XG4gICAgLy/ljZXkvY1cbiAgICBsZXQgdW5pdDogc3RyaW5nW10gPSBbXCJcIiwgXCJLXCIsIFwiTVwiLCBcIkJcIiwgXCJUXCIsIFwiUVwiXTtcbiAgICBpZiAoTGVuID4gdW5pdC5sZW5ndGggLSAxKSB7XG4gICAgICBMZW4gPSB1bml0Lmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIExlbiAtPSBpc1RyZWVNdWx0aXBsZSA/IDEgOiAwO1xuICAgIGxldCBzdHI6IHN0cmluZyA9IChudW0xIC8gKE1hdGgucG93KDEwMDAsIExlbikpKS50b0ZpeGVkKG51bTIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjspIHtcbiAgICAgIGxldCBsYXN0TnVtOiBzdHJpbmcgPSBzdHIuc3Vic3RyKC0xKTtcbiAgICAgIGlmIChsYXN0TnVtID09IFwiMFwiKSB7XG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHIoMCwgc3RyLmxhc3RJbmRleE9mKFwiMFwiKSk7XG4gICAgICAgIGkrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RyLnN1YnN0cigtMSkgPT0gXCIuXCIpIHtcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHIoMCwgc3RyLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gICAgfVxuICAgIHJldHVybiBzdHIgKyB1bml0W0xlbl07XG5cbiAgfVxuXG5cblxuICBwdWJsaWMgc3RhdGljIHN0b3JhZ2VLZXk6IHN0cmluZyA9IFwiX3YxLjAuMFwiO1xuICAvKipcbiAgICAgICog5a2Y5YKo5pys5Zyw5pWw5o2uXG4gICAgICAqIEBwYXJhbSB7Kn0gaXNPYmplY3Qg5piv5ZCm5piv5LiA5Liq5a+56LGh5oiW6ICF5pWw57uEXG4gICAgICAqL1xuICBwdWJsaWMgc3RhdGljIHNldFN0b3JhZ2Uoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGlzT2JqZWN0ID0gZmFsc2UpIHtcbiAgICBrZXkgPSB0aGlzLnN0b3JhZ2VLZXkgKyBrZXk7XG4gICAgaWYgKGVudikge1xuICAgICAgcmV0dXJuIGVudi5zZXRTdG9yYWdlU3luYyhrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KSB7XG4gICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9XG4gICAgLyoqIOm7mOiupGNvY29zIOWtmOWCqOaVsOaNruaWueazlSAqL1xuICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfTtcblxuICAvKipcbiAgKiDojrflj5blrZjlgqjmlbDmja5cbiAgKiBAcGFyYW0geyp9IGlzT2JqZWN0IOaYr+WQpuaYr+S4gOS4quWvueixoeaIluiAheaVsOe7hFxuICAqL1xuICBwdWJsaWMgc3RhdGljIGdldFN0b3JhZ2Uoa2V5OiBzdHJpbmcsIGlzT2JqZWN0ID0gZmFsc2UpIHtcbiAgICBrZXkgPSB0aGlzLnN0b3JhZ2VLZXkgKyBrZXk7XG4gICAgbGV0IHRlbXAgPSBudWxsO1xuXG4gICAgaWYgKGVudikge1xuICAgICAgdGVtcCA9IDxhbnk+ZW52LmdldFN0b3JhZ2VTeW5jKGtleSk7XG4gICAgICBpZiAodGVtcCA9PSBcIlwiKSB7XG4gICAgICAgIHRlbXAgPSBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wID0gPGFueT5jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgIGlmICghdGVtcCB8fCB0ZW1wLnRvU3RyaW5nKCkgPT0gXCJOYU5cIiB8fCB0ZW1wLnRvU3RyaW5nKCkgPT0gXCJudWxsXCIpIHtcbiAgICAgICAgdGVtcCA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KSB7XG4gICAgICAgIHRlbXAgPSBKU09OLnBhcnNlKHRlbXApO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGVtcCA9PT0gXCJib29sZWFuXCIpIHtcblxuICAgICAgfSBlbHNlIGlmICghaXNOYU4odGVtcCkpIHtcbiAgICAgICAgdGVtcCA9IHBhcnNlSW50KHRlbXApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGVtcDtcbiAgfTtcblxuXG4gIC8qKlxuICAqIOaIquaWreWtl+espuS4suWHveaVsFxuICAqXG4gICogQHBhcmFtIHN0ciDopoHmiKrmlq3nmoTlrZfnrKbkuLJcbiAgKiBAcmV0dXJucyDmiKrmlq3lkI7nmoTlrZfnrKbkuLLvvIzmoLzlvI/kuLpcIuWJjTXkuKrlrZfnrKYuLi7mnIDlkI4y5Liq5a2X56ymXCJcbiAgKi9cbiAgcHVibGljIHN0YXRpYyB0cnVuY2F0ZVN0cmluZyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3N0ci5zbGljZSgwLCA1KX0uLi4ke3N0ci5zbGljZSgtMil9YDtcbiAgfVxuXG5cbiAgLyoqXG4gKiDlsIbmlofmnKzlpI3liLbliLDliarotLTmnb9cbiAqXG4gKiBAcGFyYW0gdGV4dFRvQ29weSDopoHlpI3liLbliLDliarotLTmnb/nmoTmlofmnKxcbiAqL1xuICBwdWJsaWMgc3RhdGljIGNvcHlUb0NsaXBib2FyZCh0ZXh0VG9Db3B5OiBzdHJpbmcpIHtcbiAgICBpZiAodGV4dFRvQ29weSA9PSB1bmRlZmluZWQgfHwgdGV4dFRvQ29weSA9PSAnJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIOWIm+W7uuS4gOS4quS4tOaXtueahHRleHRhcmVh5YWD57Sg77yM5bCG5paH5pys5pS+5YWl5YW25LitXG4gICAgY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIHRleHRhcmVhLnZhbHVlID0gdGV4dFRvQ29weTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRhcmVhKTtcblxuICAgIC8vIOmAieS4reaWh+acrFxuICAgIHRleHRhcmVhLnNlbGVjdCgpO1xuICAgIHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKDAsIHRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG5cbiAgICB0cnkge1xuICAgICAgLy8g5bCd6K+V5omn6KGM5aSN5Yi25pON5L2cXG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgY29uc29sZS5sb2coJ1RleHQgY29waWVkIHRvIGNsaXBib2FyZDonLCB0ZXh0VG9Db3B5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBjb3B5IHRleHQgdG8gY2xpcGJvYXJkJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICAvLyDnp7vpmaTkuLTml7blhYPntKBcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRhcmVhKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICog5bCG5pWw5a2X6L2s5o2i5Li65a2X56ym5Liy77yM5bm25qC55o2u5oyH5a6a5p2h5Lu25qC85byP5YyW5pWw5a2X44CCXG4gKlxuICogQHBhcmFtIG51bSDpnIDopoHovazmjaLnmoTmlbDlrZfjgIJcbiAqIEBwYXJhbSBtaW5GaXhlZCDlvZPlsI/mlbDlrZfkuo4xMDAwMOaXtu+8jOWmguaenOWwj+aVsOmDqOWIhuS4jei2s+atpOWAvO+8jOWImeaMieatpOWAvOihpei2s+Wwj+aVsOmDqOWIhuOAgum7mOiupOS4ujDjgIJcbiAqIEBwYXJhbSBmaXhlZCDlsI/mlbDngrnlkI7nmoTlm7rlrprkvY3mlbDjgILpu5jorqTkuLo344CCXG4gKiBAcmV0dXJucyDmoLzlvI/ljJblkI7nmoTmlbDlrZflrZfnrKbkuLLjgIJcbiAqL1xuICBwdWJsaWMgc3RhdGljIGdldE51bVN0cihudW06IG51bWJlciwgbWluRml4ZWQ6IG51bWJlciA9IDAsIGZpeGVkOiBudW1iZXIgPSA3KTogc3RyaW5nIHtcbiAgICBpZiAobnVtID09IHVuZGVmaW5lZCB8fCBpc05hTihudW0pKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChudW0gPCAxMDAwMCkge1xuICAgICAgLy8gaWYgKG1pbkZpeGVkID4gMCkge1xuICAgICAgLy8gXHRjb25zdCBzdHIgPSBudW0udG9TdHJpbmcoKTtcbiAgICAgIC8vIFx0Y29uc3QgW2ludFBhcnQsIGRlY1BhcnQgPSAnJ10gPSBzdHIuc3BsaXQoJy4nKTtcbiAgICAgIC8vIFx0aWYgKGRlY1BhcnQubGVuZ3RoID49IG1pbkZpeGVkKSB7XG4gICAgICAvLyBcdFx0cmV0dXJuICtudW0udG9GaXhlZChmaXhlZCkgKyAnJzsgLy8g5bey5pyJ6Laz5aSf5bCP5pWw5L2N77yM55u05o6l6L+U5ZueXG4gICAgICAvLyBcdH1cbiAgICAgIC8vIFx0bnVtLnRvRml4ZWQobWluRml4ZWQpO1xuICAgICAgLy8gfVxuICAgICAgcmV0dXJuICtudW0udG9GaXhlZChmaXhlZCkgKyAnJztcbiAgICB9XG4gICAgcmV0dXJuIChudW0gLyAxMDAwKS50b0ZpeGVkKDIpICsgJ2snO1xuICB9XG5cbiAgLyoqIOmAgumFjSAqL1xuICBwdWJsaWMgc3RhdGljIHVwZGF0ZVJlc29sdXRpb24oKSB7XG4gICAgbGV0IGNhbnZhcyA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChjYy5DYW52YXMpO1xuICAgIGxldCBhID0gY2FudmFzLmRlc2lnblJlc29sdXRpb24ud2lkdGggLyBjYW52YXMuZGVzaWduUmVzb2x1dGlvbi5oZWlnaHQ7XG4gICAgbGV0IGIgPSBjYy53aW5TaXplLndpZHRoIC8gY2Mud2luU2l6ZS5oZWlnaHQ7XG4gICAgY2FudmFzLmZpdEhlaWdodCA9IGEgPCBiO1xuICAgIGNhbnZhcy5maXRXaWR0aCA9IGEgPj0gYjtcbiAgICBjYy52aWV3LnNldFJlc2l6ZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgIC8vIGNjLmxvZyhjYW52YXMuZGVzaWduUmVzb2x1dGlvbiwgY2Mud2luU2l6ZSwgY2FudmFzKVxuICAgICAgLy8gY2MubG9nKGNjLnZpZXcuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKSwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpKVxuICAgIH0pO1xuICB9XG5cbn0iXX0=