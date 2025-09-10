"use strict";
cc._RF.push(module, '6a7a7xrKbVCh43WINFD22c0', 'RandomCtr');
// Script/Assist/RandomCtr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomCtr = void 0;
//随机数常用方法工具类
exports.RandomCtr = {
    /**
     * 获取[min,max)之间的随机数
     * @param area
     */
    findRandomBase: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    /**
     * 获取[min,max)之间的随机整数
     * @param min
     * @param max
     */
    findRandomInteger: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    /**
     * 按照arr获取权重值，arr为权重列表
     * @param arr
     */
    findRandomArray: function (arr) {
        if (arr === void 0) { arr = []; }
        var count = 0;
        for (var m in arr) {
            if (arr[m]) {
                count += arr[m];
            }
        }
        var ran = this.findRandomBase() * count;
        for (var m in arr) {
            if (ran <= arr[m]) {
                return m;
            }
        }
        return 0;
    },
    /**
     * 从数组data中取出cout个随机值
     * @param count
     * @param data
     */
    findListFromArray: function (count, data) {
        if (data === void 0) { data = []; }
        if (count >= data.length) {
            return data;
        }
        else if (count < data.length) {
            var temp = [];
            var arr = this.randomNumBoth(data.length, count);
            for (var m in arr) {
                if (data[arr[m]]) {
                    temp.push(data[arr[m]]);
                }
            }
            return temp;
        }
    },
    /**
    * 从数组data中取出cout个随机值
    * @param count
    * @param data
    */
    findListFromObject: function (count, data) {
        var obj = Object.keys(data);
        if (count >= obj.length) {
            return data;
        }
        else if (count < obj.length) {
            var temp = {};
            var arr = this.randomNumBoth(obj.length, count);
            for (var m in arr) {
                if (data[arr[m]]) {
                    temp[arr[m]] = data[arr[m]];
                }
            }
            return temp;
        }
    },
    isCheckOk: function (limit, max) {
        var random = this.findRandomBase(0, max);
        console.error("ischeckOk:", limit, max, random, random <= limit);
        return random <= limit;
    },
    //取出0，maxLen内的maxNum个数字
    randomNumBoth: function (maxLen, maxNum) {
        var arr = [];
        for (var i = 0; i < maxLen; i++) {
            arr.push(i);
        }
        var numArr = [];
        //最大的循环次数
        var arrLength = arr.length;
        for (var i = 0; i < arrLength; i++) {
            //取出随机数 
            var number = Math.floor(Math.random() * arr.length); //生成随机数num
            //往新建的数组里面传入数值
            numArr.push(arr[number]);
            //传入一个删除一个，避免重复
            arr.splice(number, 1);
            if (arr.length <= arrLength - maxNum) {
                return numArr;
            }
        }
    }
};

cc._RF.pop();