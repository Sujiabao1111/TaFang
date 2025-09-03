export module XMUtils {

    /**在两个范围内取值 min ≤ r ≤ max */
    export function RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入         
        return num;
    }

    /**判断是否是同一天，将传入的timer与当前的时间进行对比 
     * timer 是秒
    */
    export function IsToday(timer) {
        let oldTimer = timer * 1000;       //将秒转换为毫秒
        if (new Date(oldTimer).toDateString() === new Date().toDateString()) {
            return true;
        } else {
            return false;
        }
    }

    /**深度拷贝 */
    export function deepCopy(p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    }

    /**是否记录过channe字段 */
    export function HasChannel() {
        let key = "channel";
        if (cc.sys.localStorage.getItem(key)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @param arr 数组
     * @param isDesc 升序降序 true:升序 false:降序
     * @param  key  键名
     */
    export function SortFunction(arr, isDesc = true, key?) {
        let sort = null;
        let temp = [];
        if (key) {
            sort = function (a, b) {
                if (a[key] > b[key]) {
                    return isDesc ? 1 : -1;
                } else if (a[key] < b[key]) {
                    return isDesc ? -1 : 1;
                } else if (a[key] == b[key]) {
                    return 0;
                }
            }
        } else {
            sort = function (a, b) {
                if (a > b) {
                    return isDesc ? 1 : -1;
                } else if (a < b) {
                    return isDesc ? -1 : 1;
                } else if (a == b) {
                    return 0;
                }
            }
        }
        temp = arr.sort(sort);
        return temp;
    }

    /**
     * 返回数组中最大数的索引
     */
    export function returnIndexLarge(arr) {
        let length = arr ? arr.length : 0;
        let index = 0;
        let max = arr ? arr[0] : 0;
        for (let i = 1; i < length; i++) {
            if (arr[i] > max) {
                max = arr[i];
                index = i;
            }
        }
        return index;
    }

    export function CheckNameLenght(name) {
        if (name && name.length > 0) {
            if (name.length > 7) {
                return name.substring(0, 7) + "..";
            } else {
                return name;
            }
        } else {
            return "";
        }
    }

    //获取url encode过的数据
    export function getUrlDecodeParam(param_name) {
        param_name = param_name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        const urlReg = new RegExp("[\\?&]" + param_name + "=([^&#]*)");
        const result = urlReg.exec(window.location.search);
        if (result) {
            return decodeURI(result[1].replace(/\+/g, " "));
        }
        return null;
    }

    // 浮点加法
    export function numberAdd(arg1, arg2) {
        let r1, r2, m, c;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            let cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace('.', ''));
                arg2 = Number(arg2.toString().replace('.', '')) * cm;
            } else {
                arg1 = Number(arg1.toString().replace('.', '')) * cm;
                arg2 = Number(arg2.toString().replace('.', ''));
            }
        } else {
            arg1 = Number(arg1.toString().replace('.', ''));
            arg2 = Number(arg2.toString().replace('.', ''));
        }
        return (arg1 + arg2) / m;
    }

    // 浮点减法
    export function numberSub(a, b) {
        return XMUtils.numberAdd(a, -b)
    }

    //浮点乘法
    export function numberMul(a, b) {
        var A = a.toString(),
            B = b.toString(),
            r,
            p,
            ap = A.indexOf('.'),
            bp = B.indexOf('.');
        if (ap < 0 && bp < 0) {
            r = a * b;
        } else {
            ap = ap === -1 ? A.length + 1 : ap
            bp = bp === -1 ? B.length + 1 : bp
            p = Math.pow(10, Math.max(A.length - ap - 1, B.length - bp - 1));
            A = A.indexOf(".") > -1 ? parseInt(A.replace('.', '')) : A * p;
            B = B.indexOf(".") > -1 ? parseInt(B.replace('.', '')) : B * p;
            r = (A * B) / (p * p);
        }
        return r
    }

    //浮点除法
    export function numberDiv(a, b) {
        var A = a.toString(),
            B = b.toString(),
            r,
            p,
            ap = A.indexOf('.'),
            bp = B.indexOf('.');
        if (ap < 0 && bp < 0) {
            r = a / b;
        } else {
            ap = ap === -1 ? A.length + 1 : ap
            bp = bp === -1 ? B.length + 1 : bp
            p = Math.pow(10, Math.max(A.length - ap - 1, B.length - bp - 1));
            A = A.indexOf(".") > -1 ? parseInt(A.replace('.', '')) : A * p;
            B = B.indexOf(".") > -1 ? parseInt(B.replace('.', '')) : B * p;
            r = A / B;
        }
        return r
    }
}

