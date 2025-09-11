"use strict";
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
        // cc.log(a < b, a >= b)
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