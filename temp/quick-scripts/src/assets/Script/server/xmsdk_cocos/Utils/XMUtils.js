"use strict";
cc._RF.push(module, 'aefdbYQwGVCtacMs1FcXGLw', 'XMUtils');
// Script/server/xmsdk_cocos/Utils/XMUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMUtils = void 0;
var XMUtils;
(function (XMUtils) {
    /**在两个范围内取值 min ≤ r ≤ max */
    function RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入         
        return num;
    }
    XMUtils.RandomNumBoth = RandomNumBoth;
    /**判断是否是同一天，将传入的timer与当前的时间进行对比
     * timer 是秒
    */
    function IsToday(timer) {
        var oldTimer = timer * 1000; //将秒转换为毫秒
        if (new Date(oldTimer).toDateString() === new Date().toDateString()) {
            return true;
        }
        else {
            return false;
        }
    }
    XMUtils.IsToday = IsToday;
    /**深度拷贝 */
    function deepCopy(p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
            }
            else {
                c[i] = p[i];
            }
        }
        return c;
    }
    XMUtils.deepCopy = deepCopy;
    /**是否记录过channe字段 */
    function HasChannel() {
        var key = "channel";
        if (cc.sys.localStorage.getItem(key)) {
            return true;
        }
        else {
            return false;
        }
    }
    XMUtils.HasChannel = HasChannel;
    /**
     *
     * @param arr 数组
     * @param isDesc 升序降序 true:升序 false:降序
     * @param  key  键名
     */
    function SortFunction(arr, isDesc, key) {
        if (isDesc === void 0) { isDesc = true; }
        var sort = null;
        var temp = [];
        if (key) {
            sort = function (a, b) {
                if (a[key] > b[key]) {
                    return isDesc ? 1 : -1;
                }
                else if (a[key] < b[key]) {
                    return isDesc ? -1 : 1;
                }
                else if (a[key] == b[key]) {
                    return 0;
                }
            };
        }
        else {
            sort = function (a, b) {
                if (a > b) {
                    return isDesc ? 1 : -1;
                }
                else if (a < b) {
                    return isDesc ? -1 : 1;
                }
                else if (a == b) {
                    return 0;
                }
            };
        }
        temp = arr.sort(sort);
        return temp;
    }
    XMUtils.SortFunction = SortFunction;
    /**
     * 返回数组中最大数的索引
     */
    function returnIndexLarge(arr) {
        var length = arr ? arr.length : 0;
        var index = 0;
        var max = arr ? arr[0] : 0;
        for (var i = 1; i < length; i++) {
            if (arr[i] > max) {
                max = arr[i];
                index = i;
            }
        }
        return index;
    }
    XMUtils.returnIndexLarge = returnIndexLarge;
    function CheckNameLenght(name) {
        if (name && name.length > 0) {
            if (name.length > 7) {
                return name.substring(0, 7) + "..";
            }
            else {
                return name;
            }
        }
        else {
            return "";
        }
    }
    XMUtils.CheckNameLenght = CheckNameLenght;
    //获取url encode过的数据
    function getUrlDecodeParam(param_name) {
        param_name = param_name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var urlReg = new RegExp("[\\?&]" + param_name + "=([^&#]*)");
        var result = urlReg.exec(window.location.search);
        if (result) {
            return decodeURI(result[1].replace(/\+/g, " "));
        }
        return null;
    }
    XMUtils.getUrlDecodeParam = getUrlDecodeParam;
    // 浮点加法
    function numberAdd(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split('.')[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace('.', ''));
                arg2 = Number(arg2.toString().replace('.', '')) * cm;
            }
            else {
                arg1 = Number(arg1.toString().replace('.', '')) * cm;
                arg2 = Number(arg2.toString().replace('.', ''));
            }
        }
        else {
            arg1 = Number(arg1.toString().replace('.', ''));
            arg2 = Number(arg2.toString().replace('.', ''));
        }
        return (arg1 + arg2) / m;
    }
    XMUtils.numberAdd = numberAdd;
    // 浮点减法
    function numberSub(a, b) {
        return XMUtils.numberAdd(a, -b);
    }
    XMUtils.numberSub = numberSub;
    //浮点乘法
    function numberMul(a, b) {
        var A = a.toString(), B = b.toString(), r, p, ap = A.indexOf('.'), bp = B.indexOf('.');
        if (ap < 0 && bp < 0) {
            r = a * b;
        }
        else {
            ap = ap === -1 ? A.length + 1 : ap;
            bp = bp === -1 ? B.length + 1 : bp;
            p = Math.pow(10, Math.max(A.length - ap - 1, B.length - bp - 1));
            A = A.indexOf(".") > -1 ? parseInt(A.replace('.', '')) : A * p;
            B = B.indexOf(".") > -1 ? parseInt(B.replace('.', '')) : B * p;
            r = (A * B) / (p * p);
        }
        return r;
    }
    XMUtils.numberMul = numberMul;
    //浮点除法
    function numberDiv(a, b) {
        var A = a.toString(), B = b.toString(), r, p, ap = A.indexOf('.'), bp = B.indexOf('.');
        if (ap < 0 && bp < 0) {
            r = a / b;
        }
        else {
            ap = ap === -1 ? A.length + 1 : ap;
            bp = bp === -1 ? B.length + 1 : bp;
            p = Math.pow(10, Math.max(A.length - ap - 1, B.length - bp - 1));
            A = A.indexOf(".") > -1 ? parseInt(A.replace('.', '')) : A * p;
            B = B.indexOf(".") > -1 ? parseInt(B.replace('.', '')) : B * p;
            r = A / B;
        }
        return r;
    }
    XMUtils.numberDiv = numberDiv;
})(XMUtils = exports.XMUtils || (exports.XMUtils = {}));

cc._RF.pop();