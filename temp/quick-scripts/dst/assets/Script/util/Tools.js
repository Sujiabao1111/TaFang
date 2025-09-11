
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsXFxUb29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRzs7O0FBRUgsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpFO0lBQUE7SUF5WEEsQ0FBQztJQXZYQzs7O09BR0c7SUFDVyxlQUFTLEdBQXZCLFVBQXdCLEdBQVE7UUFDOUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxnQkFBZ0I7WUFDMUIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksR0FBRyxZQUFZLElBQUksRUFBRTtZQUN2QixPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxHQUFHLFlBQVksTUFBTSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFDRCxJQUFJLEdBQUcsWUFBWSxRQUFRLEVBQUU7WUFDM0IsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksTUFBTSxDQUFDO1FBQ1gsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLFVBQVU7YUFDL0M7WUFDRCxPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQ0QsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO1lBQ25CLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3hCO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsVUFBVTtpQkFDbEQ7YUFDRjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNXLGdCQUFVLEdBQXhCLFVBQXlCLEdBQVcsRUFBRSxLQUFVLEVBQUUsR0FBVSxFQUFFLEdBQWU7UUFBZixvQkFBQSxFQUFBLE9BQWU7UUFDM0UsSUFBSSxNQUFNLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUVuQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEVBQUU7b0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO3dCQUN4QixNQUFNO3FCQUNQO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELHdEQUF3RDtRQUN4RCxrREFBa0Q7UUFDbEQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQ1osdURBQXVEO2dCQUN2RCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtpQkFBTTtnQkFDTCw0Q0FBNEM7Z0JBQzVDLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7U0FDRjthQUFNO1lBQ0wsNENBQTRDO1lBQzVDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBQ0Q7Ozs7Ozs7T0FPRztJQUNXLGdCQUFVLEdBQXhCLFVBQXlCLElBQVksRUFBRSxNQUFXLEVBQUUsSUFBWSxFQUFFLE1BQVcsRUFBRSxHQUFVO1FBQ3ZGLE1BQU07UUFDTixJQUFJLFNBQVMsR0FBWSxLQUFLLENBQUM7UUFFL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFFbkMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxFQUFFO2dCQUMxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUN0QixTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixNQUFNO2FBQ1A7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVyxlQUFTLEdBQXZCLFVBQXdCLEdBQVcsRUFBRSxHQUFXLEVBQUUsSUFBZ0I7UUFBaEIscUJBQUEsRUFBQSxRQUFnQjtRQUVoRSxJQUFJLE1BQU0sR0FBVyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQVcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDN0QsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLENBQUM7Z0JBQ0osR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDL0IsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixNQUFNO1NBQ1Q7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUViLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csaUJBQVcsR0FBekIsVUFBMEIsRUFBVyxFQUFFLEVBQVc7UUFDaEQsT0FBTztRQUNQLElBQUksRUFBRSxHQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLEVBQUUsR0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxHQUFHLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakMsYUFBYTtRQUNiLElBQUksS0FBSyxHQUFXLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvQyxXQUFXO1FBQ1gsSUFBSSxNQUFNLEdBQVcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUVoRCxPQUFPLENBQUMsTUFBTSxDQUFBO0lBRWhCLENBQUM7SUFFRDs7O09BR0c7SUFDVyxlQUFTLEdBQXZCLFVBQXdCLEdBQVU7UUFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxnQkFBVSxHQUF4QixVQUF5QixJQUFZLEVBQUUsR0FBZTtRQUFmLG9CQUFBLEVBQUEsT0FBZTtRQUVwRCxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFdEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBRWYsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ1osR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDdEM7YUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDbkIsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ1o7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUViLENBQUM7SUFFRDs7O01BR0U7SUFDWSxnQkFBVSxHQUF4QixVQUF5QixLQUFrQjtRQUFsQixzQkFBQSxFQUFBLFVBQWtCO1FBQ3pDLElBQUksSUFBSSxHQUFRLElBQUksSUFBSSxFQUFFLENBQUM7UUFDM0IsSUFBSSxNQUFNLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekMsSUFBSSxXQUFXLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QyxJQUFJLFdBQVcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pDLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNkLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksRUFBRSxHQUFHLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BFLElBQUksRUFBRSxHQUFHLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLGdCQUFVLEdBQXhCLFVBQXlCLElBQVksRUFBRSxJQUFnQjtRQUFoQixxQkFBQSxFQUFBLFFBQWdCO1FBQ3JELE1BQU07UUFDTixJQUFJLE1BQU0sR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksY0FBYyxHQUFZLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUk7UUFDSixJQUFJLElBQUksR0FBYSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsR0FBRyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxHQUFHLEdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUc7WUFDdEIsSUFBSSxPQUFPLEdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksT0FBTyxJQUFJLEdBQUcsRUFBRTtnQkFDbEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxFQUFFLENBQUM7YUFDTDtpQkFBTTtnQkFDTCxNQUFNO2FBQ1A7U0FDRjtRQUNELElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUN6QixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXpCLENBQUM7SUFLRDs7O1VBR007SUFDUSxnQkFBVSxHQUF4QixVQUF5QixHQUFXLEVBQUUsS0FBVSxFQUFFLFFBQWdCO1FBQWhCLHlCQUFBLEVBQUEsZ0JBQWdCO1FBQ2hFLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUM1QixJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkM7UUFDRCxJQUFJLFFBQVEsRUFBRTtZQUNaLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBQ0QscUJBQXFCO1FBQ3JCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUFBLENBQUM7SUFFRjs7O01BR0U7SUFDWSxnQkFBVSxHQUF4QixVQUF5QixHQUFXLEVBQUUsUUFBZ0I7UUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7UUFDcEQsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksR0FBUSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtnQkFDZCxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ2I7U0FDRjthQUFNO1lBQ0wsSUFBSSxHQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLE1BQU0sRUFBRTtnQkFDbEUsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNiO2lCQUFNLElBQUksUUFBUSxFQUFFO2dCQUNuQixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtpQkFBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLFNBQVMsRUFBRTthQUVyQztpQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2QixJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQSxDQUFDO0lBR0Y7Ozs7O01BS0U7SUFDWSxvQkFBYyxHQUE1QixVQUE2QixHQUFXO1FBQ3RDLE9BQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRyxDQUFDO0lBQ2pELENBQUM7SUFHRDs7OztLQUlDO0lBQ2EscUJBQWUsR0FBN0IsVUFBOEIsVUFBa0I7UUFDOUMsSUFBSSxVQUFVLElBQUksU0FBUyxJQUFJLFVBQVUsSUFBSSxFQUFFLEVBQUU7WUFDL0MsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELDRCQUE0QjtRQUM1QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBDLE9BQU87UUFDUCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJELElBQUk7WUFDRixXQUFXO1lBQ1gsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ3REO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxLQUFLLENBQUM7U0FFZDtRQUVELFNBQVM7UUFDVCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7OztLQU9DO0lBQ2EsZUFBUyxHQUF2QixVQUF3QixHQUFXLEVBQUUsUUFBb0IsRUFBRSxLQUFpQjtRQUF2Qyx5QkFBQSxFQUFBLFlBQW9CO1FBQUUsc0JBQUEsRUFBQSxTQUFpQjtRQUMxRSxJQUFJLEdBQUcsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxJQUFJLEdBQUcsR0FBRyxLQUFLLEVBQUU7WUFDZixzQkFBc0I7WUFDdEIsK0JBQStCO1lBQy9CLG1EQUFtRDtZQUNuRCxxQ0FBcUM7WUFDckMscURBQXFEO1lBQ3JELEtBQUs7WUFDTCwwQkFBMEI7WUFDMUIsSUFBSTtZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNqQztRQUNELE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN2QyxDQUFDO0lBRUQsU0FBUztJQUNLLHNCQUFnQixHQUE5QjtRQUNFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDdkUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0MsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6Qix3QkFBd0I7UUFDeEIsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUN4QixzREFBc0Q7WUFDdEQsc0VBQXNFO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWpJYSxnQkFBVSxHQUFXLFNBQVMsQ0FBQztJQW1JL0MsWUFBQztDQXpYRCxBQXlYQyxJQUFBO0FBelhZLHNCQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDlt6XlhbfnsbtcbiAqIOm7juS8n+adg1xuICogMjAyMS4xLjE0XG4gKi9cblxuY29uc3QgZW52ID0gd2luZG93W1wid3hcIl0gfHwgd2luZG93W1widHRcIl0gfHwgd2luZG93W1wia3NcIl0gfHwgd2luZG93W1wicXFcIl07XG5cbmV4cG9ydCBjbGFzcyBUb29scyB7XG5cbiAgLyoqXG4gICAqIOa3seW6puaLt+i0nVxuICAgKiBAcGFyYW0gb2JqIOS7u+S9leS4gOS4qlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBkZWVwQ2xvbmUob2JqOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmICghb2JqKSB7IC8vIG9iaiDmmK8gbnVsbOeahOaDheWGtVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShvYmopO1xuICAgIH1cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cChvYmopO1xuICAgIH1cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGxldCBuZXdPYmo7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBuZXdPYmogPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbmV3T2JqLnB1c2godGhpcy5kZWVwQ2xvbmUob2JqW2ldKSk7Ly/pgJLlvZLmk43kvZzltYzlpZflr7nosaFcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdPYmo7XG4gICAgfVxuICAgIG5ld09iaiA9IHt9O1xuICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIG5ld09ialtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3T2JqW2tleV0gPSB0aGlzLmRlZXBDbG9uZShvYmpba2V5XSk7Ly/pgJLlvZLmk43kvZzltYzlpZflr7nosaFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3T2JqO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluaVsOe7hOmHjOmdouafkOS4quS4nOilv+W5tui/lOWbnuS4nOilv++8jOayoeacieWImW51bGxcbiAgICogQHBhcmFtIGtleSBLZXnlkI1cbiAgICogQHBhcmFtIHZhbHVlIOWAvFxuICAgKiBAcGFyYW0gYXJyIOaVsOe7hFxuICAgKiBAcGFyYW0gbnVtIOWPluWkmuWwkeS4qu+8iOebuOWQjOeahOWAvOW+l+aXtuWAme+8ieS4jeWGmem7mOiupDHkuKrvvIwtMeWImeWFqOmDqFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBHZXRBcnJEYXRhKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBhcnI6IGFueVtdLCBudW06IG51bWJlciA9IDEpIHtcbiAgICBsZXQgbmV3QXJyOiBhbnlbXSA9IFtdO1xuICAgIGlmIChhcnIgJiYgYXJyLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgaWYgKGFycltpXVtrZXldID09IHZhbHVlKSB7XG4gICAgICAgICAgbmV3QXJyLnB1c2godGhpcy5kZWVwQ2xvbmUoYXJyW2ldKSk7XG4gICAgICAgICAgaWYgKG51bSA+PSBuZXdBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyhcIkdldEFyckRhdGEgLS0tLS0tLS0tLS06IFwiKyBuZXdBcnIubGVuZ3RoKVxuICAgIC8vY29uc29sZS5sb2coXCJHZXRBcnJEYXRhIC0tLS0yLS0tLS0tLTogXCIrIG5ld0FycilcbiAgICBpZiAobmV3QXJyLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChudW0gPT0gMSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2V0QXJyRGF0YSAtLS0tLS0tLS0tLTog6L+U5ZueIFwiKyBuZXdBcnJbMF0pXG4gICAgICAgIHJldHVybiBuZXdBcnJbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2V0QXJyRGF0YSAtLS0tLS0tLS0tLTog6L+U5ZueMlwiKVxuICAgICAgICByZXR1cm4gbmV3QXJyO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiR2V0QXJyRGF0YSAtLS0tLS0tLS0tLTog6L+U5Zue56m6XCIpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOmHjeiuvuaVsOe7hOmHjOmdouafkOS4quS4nOilv+W5tui/lOWbnuaYr+WQpuaIkOWKn1xuICAgKiBAcGFyYW0ga2V5MSDmn6Xmib5LZXnlkI1cbiAgICogQHBhcmFtIHZhbHVlMSDmn6Xmib7lgLxcbiAgICogQHBhcmFtIGtleTIg6ZyA6KaB5L+u5pS5S2V55ZCNXG4gICAqIEBwYXJhbSB2YWx1ZTIg6ZyA6KaB5L+u5pS555qE5YC8XG4gICAqIEBwYXJhbSBhcnIg5pWw57uEXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNldEFyckRhdGEoa2V5MTogc3RyaW5nLCB2YWx1ZTE6IGFueSwga2V5Mjogc3RyaW5nLCB2YWx1ZTI6IGFueSwgYXJyOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIC8v6buY6K6k5aSx6LSlXG4gICAgbGV0IGlzU3VjY2VzczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgaWYgKGFycltpXVtrZXkxXSA9PSB2YWx1ZTEpIHtcbiAgICAgICAgYXJyW2ldW2tleTJdID0gdmFsdWUyO1xuICAgICAgICBpc1N1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXNTdWNjZXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPlumaj+acuuaVsFxuICAgKiBAcGFyYW0gbWluIOacgOWwj1xuICAgKiBAcGFyYW0gbWF4IOacgOWkp1xuICAgKiBAcGFyYW0gdHlwZSDnsbvlnosgMDrkuKLlvIPlsI/mlbDpg6jliIYs5L+d55WZ5pW05pWw6YOo5YiGIDE65ZCR5LiK5Y+W5pW0LOacieWwj+aVsOWwseaVtOaVsOmDqOWIhuWKoDFcbiAgICogMjrlkJHkuIvlj5bmlbQs5Lii5byD5bCP5pWw6YOo5YiGIDM65Zub6IiN5LqU5YWlIDQ65LiN5YGa5Lu75L2V6L2s5LmJXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIEdldFJhbmRvbShtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHR5cGU6IG51bWJlciA9IDApIHtcblxuICAgIGxldCBtaW5OdW06IG51bWJlciA9IE51bWJlcihtaW4pO1xuICAgIGxldCBtYXhOdW06IG51bWJlciA9IE51bWJlcihtYXgpO1xuICAgIGxldCBudW06IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAobWF4TnVtIC0gbWluTnVtKSArIG1pbk51bTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbnVtID0gcGFyc2VJbnQobnVtLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgbnVtID0gTWF0aC5jZWlsKG51bSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBudW0gPSBNYXRoLmZsb29yKG51bSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBudW0gPSBNYXRoLnJvdW5kKG51bSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbnVtO1xuXG4gIH1cblxuICAvKipcbiAgICog5rGC5Lik54K55LmL6Ze055qE6KeS5bqmXG4gICAqIEBwYXJhbSBwMSDngrkxXG4gICAqIEBwYXJhbSBwMiDngrkyXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIEdldFBvc0FuZ2xlKHAxOiBjYy5WZWMyLCBwMjogY2MuVmVjMikge1xuICAgIC8v6K6h566X5Ye65pyd5ZCRXG4gICAgbGV0IGR4OiBudW1iZXIgPSBwMi54IC0gcDEueDtcbiAgICBsZXQgZHk6IG51bWJlciA9IHAyLnkgLSBwMS55O1xuICAgIGxldCBkaXI6IGNjLlZlYzIgPSBjYy52MihkeCwgZHkpO1xuXG4gICAgLy/moLnmja7mnJ3lkJHorqHnrpflh7rlpLnop5LlvKfluqZcbiAgICBsZXQgYW5nbGU6IG51bWJlciA9IGRpci5zaWduQW5nbGUoY2MudjIoMSwgMCkpO1xuXG4gICAgLy/lsIblvKfluqbovazmjaLkuLrmrKfmi4nop5JcbiAgICBsZXQgZGVncmVlOiBudW1iZXIgPSBhbmdsZSAvIE1hdGguUEkgKiAxODAgKyA5MDtcblxuICAgIHJldHVybiAtZGVncmVlXG5cbiAgfVxuXG4gIC8qKlxuICAgKiDmiZPkubHmlbDnu4RcbiAgICogQHBhcmFtIGFyciDmlbDnu4RcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmFuZG9tQXJyKGFycjogYW55W10pIHtcbiAgICBhcnIuc29ydCgoKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgLyoqXG4gICAqIOaXtumXtOaNoueul1xuICAgKiBAcGFyYW0gdGltZSBcbiAgICogQHBhcmFtIG51bSAxOuenkiAy77ya56eS5ZKM5YiGIDPvvJrlhajpg73mnIlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY2hhbmdlVGltZSh0aW1lOiBudW1iZXIsIG51bTogbnVtYmVyID0gMikge1xuXG4gICAgbGV0IGg6IG51bWJlciA9IE1hdGguZmxvb3IodGltZSAvIDYwIC8gNjApO1xuICAgIGxldCBtOiBudW1iZXIgPSBNYXRoLmZsb29yKHRpbWUgLyA2MCk7XG4gICAgbGV0IHM6IG51bWJlciA9IE1hdGguZmxvb3IodGltZSAlIDYwKTtcblxuICAgIGxldCBoU3RyID0gKGggPCAxMCA/IFwiMFwiIDogXCJcIikgKyBoO1xuICAgIGxldCBtU3RyID0gKG0gPCAxMCA/IFwiMFwiIDogXCJcIikgKyBtO1xuICAgIGxldCBzU3RyID0gKHMgPCAxMCA/IFwiMFwiIDogXCJcIikgKyBzO1xuXG4gICAgbGV0IHN0ciA9IG51bGw7XG5cbiAgICBpZiAobnVtID09IDMpIHtcbiAgICAgIHN0ciA9IGhTdHIgKyBcIjpcIiArIG1TdHIgKyBcIjpcIiArIHNTdHI7XG4gICAgfSBlbHNlIGlmIChudW0gPT0gMikge1xuICAgICAgc3RyID0gbVN0ciArIFwiOlwiICsgc1N0cjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gc1N0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcblxuICB9XG5cbiAgLyoqIFxuICAgKiDot53nprvnibnlrprnmoTml7bpl7Tov5jlt67lpJrlsJFcbiAgICogQHBhcmFtIGhvdXJzIOWwj+aXtiDpu5jorqTlh4zmmahcbiAgKi9cbiAgcHVibGljIHN0YXRpYyBmb3JtYXREYXRhKGhvdXJzOiBudW1iZXIgPSAyNCk6IHN0cmluZyB7XG4gICAgbGV0IGRhdGU6IGFueSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IHRlbXBoaCA9IGhvdXJzIC0gMSAtIGRhdGUuZ2V0SG91cnMoKTtcbiAgICBsZXQgdGVtcE1pbnV0ZXMgPSA1OSAtIGRhdGUuZ2V0TWludXRlcygpO1xuICAgIGxldCB0ZW1wU2Vjb25kcyA9IDU5IC0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgaWYgKHRlbXBoaCA8IDApIHtcbiAgICAgIHRlbXBoaCArPSAyNDtcbiAgICB9XG4gICAgbGV0IGhoID0gKHRlbXBoaCA8IDEwID8gJzAnICsgdGVtcGhoIDogdGVtcGhoKSArICc6JztcbiAgICBsZXQgbW0gPSAodGVtcE1pbnV0ZXMgPCAxMCA/ICcwJyArIHRlbXBNaW51dGVzIDogdGVtcE1pbnV0ZXMpICsgJzonO1xuICAgIGxldCBzcyA9ICh0ZW1wU2Vjb25kcyA8IDEwID8gJzAnICsgdGVtcFNlY29uZHMgOiB0ZW1wU2Vjb25kcyk7XG4gICAgcmV0dXJuIGhoICsgbW0gKyBzcztcbiAgfVxuXG4gIC8qKlxuICAgKiDljZXkvY3ovazmjaJcbiAgICogQHBhcmFtIG51bTEg5Lyg5YWl5pWw5a2XXG4gICAqIEBwYXJhbSBudW0yIOS/neeVmeWkmuWwkeS9jSjpu5jorqQyKVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBjaGFuZ2VVbml0KG51bTE6IG51bWJlciwgbnVtMjogbnVtYmVyID0gMik6IHN0cmluZyB7XG4gICAgLy/mjaLnrpfplb/luqZcbiAgICBsZXQgbmV3TnVtOiBudW1iZXIgPSBTdHJpbmcobnVtMSkubGVuZ3RoO1xuICAgIGxldCBpc1RyZWVNdWx0aXBsZTogYm9vbGVhbiA9IG5ld051bSAlIDMgPT0gMDtcbiAgICBsZXQgTGVuOiBudW1iZXIgPSBNYXRoLmZsb29yKG5ld051bSAvIDMpO1xuICAgIC8v5Y2V5L2NXG4gICAgbGV0IHVuaXQ6IHN0cmluZ1tdID0gW1wiXCIsIFwiS1wiLCBcIk1cIiwgXCJCXCIsIFwiVFwiLCBcIlFcIl07XG4gICAgaWYgKExlbiA+IHVuaXQubGVuZ3RoIC0gMSkge1xuICAgICAgTGVuID0gdW5pdC5sZW5ndGggLSAxO1xuICAgIH1cbiAgICBMZW4gLT0gaXNUcmVlTXVsdGlwbGUgPyAxIDogMDtcbiAgICBsZXQgc3RyOiBzdHJpbmcgPSAobnVtMSAvIChNYXRoLnBvdygxMDAwLCBMZW4pKSkudG9GaXhlZChudW0yKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7KSB7XG4gICAgICBsZXQgbGFzdE51bTogc3RyaW5nID0gc3RyLnN1YnN0cigtMSk7XG4gICAgICBpZiAobGFzdE51bSA9PSBcIjBcIikge1xuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKDAsIHN0ci5sYXN0SW5kZXhPZihcIjBcIikpO1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0ci5zdWJzdHIoLTEpID09IFwiLlwiKSB7XG4gICAgICBzdHIgPSBzdHIuc3Vic3RyKDAsIHN0ci5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyICsgdW5pdFtMZW5dO1xuXG4gIH1cblxuXG5cbiAgcHVibGljIHN0YXRpYyBzdG9yYWdlS2V5OiBzdHJpbmcgPSBcIl92MS4wLjBcIjtcbiAgLyoqXG4gICAgICAqIOWtmOWCqOacrOWcsOaVsOaNrlxuICAgICAgKiBAcGFyYW0geyp9IGlzT2JqZWN0IOaYr+WQpuaYr+S4gOS4quWvueixoeaIluiAheaVsOe7hFxuICAgICAgKi9cbiAgcHVibGljIHN0YXRpYyBzZXRTdG9yYWdlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBpc09iamVjdCA9IGZhbHNlKSB7XG4gICAga2V5ID0gdGhpcy5zdG9yYWdlS2V5ICsga2V5O1xuICAgIGlmIChlbnYpIHtcbiAgICAgIHJldHVybiBlbnYuc2V0U3RvcmFnZVN5bmMoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIGlmIChpc09iamVjdCkge1xuICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKiDpu5jorqRjb2NvcyDlrZjlgqjmlbDmja7mlrnms5UgKi9cbiAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICog6I635Y+W5a2Y5YKo5pWw5o2uXG4gICogQHBhcmFtIHsqfSBpc09iamVjdCDmmK/lkKbmmK/kuIDkuKrlr7nosaHmiJbogIXmlbDnu4RcbiAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRTdG9yYWdlKGtleTogc3RyaW5nLCBpc09iamVjdCA9IGZhbHNlKSB7XG4gICAga2V5ID0gdGhpcy5zdG9yYWdlS2V5ICsga2V5O1xuICAgIGxldCB0ZW1wID0gbnVsbDtcblxuICAgIGlmIChlbnYpIHtcbiAgICAgIHRlbXAgPSA8YW55PmVudi5nZXRTdG9yYWdlU3luYyhrZXkpO1xuICAgICAgaWYgKHRlbXAgPT0gXCJcIikge1xuICAgICAgICB0ZW1wID0gbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcCA9IDxhbnk+Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAoIXRlbXAgfHwgdGVtcC50b1N0cmluZygpID09IFwiTmFOXCIgfHwgdGVtcC50b1N0cmluZygpID09IFwibnVsbFwiKSB7XG4gICAgICAgIHRlbXAgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCkge1xuICAgICAgICB0ZW1wID0gSlNPTi5wYXJzZSh0ZW1wKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRlbXAgPT09IFwiYm9vbGVhblwiKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRlbXApKSB7XG4gICAgICAgIHRlbXAgPSBwYXJzZUludCh0ZW1wKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRlbXA7XG4gIH07XG5cblxuICAvKipcbiAgKiDmiKrmlq3lrZfnrKbkuLLlh73mlbBcbiAgKlxuICAqIEBwYXJhbSBzdHIg6KaB5oiq5pat55qE5a2X56ym5LiyXG4gICogQHJldHVybnMg5oiq5pat5ZCO55qE5a2X56ym5Liy77yM5qC85byP5Li6XCLliY015Liq5a2X56ymLi4u5pyA5ZCOMuS4quWtl+esplwiXG4gICovXG4gIHB1YmxpYyBzdGF0aWMgdHJ1bmNhdGVTdHJpbmcoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtzdHIuc2xpY2UoMCwgNSl9Li4uJHtzdHIuc2xpY2UoLTIpfWA7XG4gIH1cblxuXG4gIC8qKlxuICog5bCG5paH5pys5aSN5Yi25Yiw5Ymq6LS05p2/XG4gKlxuICogQHBhcmFtIHRleHRUb0NvcHkg6KaB5aSN5Yi25Yiw5Ymq6LS05p2/55qE5paH5pysXG4gKi9cbiAgcHVibGljIHN0YXRpYyBjb3B5VG9DbGlwYm9hcmQodGV4dFRvQ29weTogc3RyaW5nKSB7XG4gICAgaWYgKHRleHRUb0NvcHkgPT0gdW5kZWZpbmVkIHx8IHRleHRUb0NvcHkgPT0gJycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyDliJvlu7rkuIDkuKrkuLTml7bnmoR0ZXh0YXJlYeWFg+e0oO+8jOWwhuaWh+acrOaUvuWFpeWFtuS4rVxuICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB0ZXh0YXJlYS52YWx1ZSA9IHRleHRUb0NvcHk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0YXJlYSk7XG5cbiAgICAvLyDpgInkuK3mlofmnKxcbiAgICB0ZXh0YXJlYS5zZWxlY3QoKTtcbiAgICB0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIOWwneivleaJp+ihjOWkjeWItuaTjeS9nFxuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgIGNvbnNvbGUubG9nKCdUZXh0IGNvcGllZCB0byBjbGlwYm9hcmQ6JywgdGV4dFRvQ29weSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gY29weSB0ZXh0IHRvIGNsaXBib2FyZCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLy8g56e76Zmk5Li05pe25YWD57SgXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0YXJlYSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAqIOWwhuaVsOWtl+i9rOaNouS4uuWtl+espuS4su+8jOW5tuagueaNruaMh+WumuadoeS7tuagvOW8j+WMluaVsOWtl+OAglxuICpcbiAqIEBwYXJhbSBudW0g6ZyA6KaB6L2s5o2i55qE5pWw5a2X44CCXG4gKiBAcGFyYW0gbWluRml4ZWQg5b2T5bCP5pWw5a2X5LqOMTAwMDDml7bvvIzlpoLmnpzlsI/mlbDpg6jliIbkuI3otrPmraTlgLzvvIzliJnmjInmraTlgLzooaXotrPlsI/mlbDpg6jliIbjgILpu5jorqTkuLow44CCXG4gKiBAcGFyYW0gZml4ZWQg5bCP5pWw54K55ZCO55qE5Zu65a6a5L2N5pWw44CC6buY6K6k5Li6N+OAglxuICogQHJldHVybnMg5qC85byP5YyW5ZCO55qE5pWw5a2X5a2X56ym5Liy44CCXG4gKi9cbiAgcHVibGljIHN0YXRpYyBnZXROdW1TdHIobnVtOiBudW1iZXIsIG1pbkZpeGVkOiBudW1iZXIgPSAwLCBmaXhlZDogbnVtYmVyID0gNyk6IHN0cmluZyB7XG4gICAgaWYgKG51bSA9PSB1bmRlZmluZWQgfHwgaXNOYU4obnVtKSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAobnVtIDwgMTAwMDApIHtcbiAgICAgIC8vIGlmIChtaW5GaXhlZCA+IDApIHtcbiAgICAgIC8vIFx0Y29uc3Qgc3RyID0gbnVtLnRvU3RyaW5nKCk7XG4gICAgICAvLyBcdGNvbnN0IFtpbnRQYXJ0LCBkZWNQYXJ0ID0gJyddID0gc3RyLnNwbGl0KCcuJyk7XG4gICAgICAvLyBcdGlmIChkZWNQYXJ0Lmxlbmd0aCA+PSBtaW5GaXhlZCkge1xuICAgICAgLy8gXHRcdHJldHVybiArbnVtLnRvRml4ZWQoZml4ZWQpICsgJyc7IC8vIOW3suaciei2s+Wkn+Wwj+aVsOS9je+8jOebtOaOpei/lOWbnlxuICAgICAgLy8gXHR9XG4gICAgICAvLyBcdG51bS50b0ZpeGVkKG1pbkZpeGVkKTtcbiAgICAgIC8vIH1cbiAgICAgIHJldHVybiArbnVtLnRvRml4ZWQoZml4ZWQpICsgJyc7XG4gICAgfVxuICAgIHJldHVybiAobnVtIC8gMTAwMCkudG9GaXhlZCgyKSArICdrJztcbiAgfVxuXG4gIC8qKiDpgILphY0gKi9cbiAgcHVibGljIHN0YXRpYyB1cGRhdGVSZXNvbHV0aW9uKCkge1xuICAgIGxldCBjYW52YXMgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoY2MuQ2FudmFzKTtcbiAgICBsZXQgYSA9IGNhbnZhcy5kZXNpZ25SZXNvbHV0aW9uLndpZHRoIC8gY2FudmFzLmRlc2lnblJlc29sdXRpb24uaGVpZ2h0O1xuICAgIGxldCBiID0gY2Mud2luU2l6ZS53aWR0aCAvIGNjLndpblNpemUuaGVpZ2h0O1xuICAgIGNhbnZhcy5maXRIZWlnaHQgPSBhIDwgYjtcbiAgICBjYW52YXMuZml0V2lkdGggPSBhID49IGI7XG4gICAgLy8gY2MubG9nKGEgPCBiLCBhID49IGIpXG4gICAgY2Mudmlldy5zZXRSZXNpemVDYWxsYmFjaygoKSA9PiB7XG4gICAgICAvLyBjYy5sb2coY2FudmFzLmRlc2lnblJlc29sdXRpb24sIGNjLndpblNpemUsIGNhbnZhcylcbiAgICAgIC8vIGNjLmxvZyhjYy52aWV3LmdldERlc2lnblJlc29sdXRpb25TaXplKCksIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKSlcbiAgICB9KTtcbiAgfVxuXG59Il19