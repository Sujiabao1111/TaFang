
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Assist/RandomCtr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxBc3Npc3RcXFJhbmRvbUN0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxZQUFZO0FBQ0MsUUFBQSxTQUFTLEdBQUc7SUFFckI7OztPQUdHO0lBQ0gsY0FBYyxFQUFkLFVBQWUsR0FBVyxFQUFFLEdBQVc7UUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFBO0lBQzVDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsaUJBQWlCLEVBQWpCLFVBQWtCLEdBQVcsRUFBRSxHQUFXO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILGVBQWUsRUFBZixVQUFnQixHQUF1QjtRQUF2QixvQkFBQSxFQUFBLFFBQXVCO1FBQ25DLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2YsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1IsS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNsQjtTQUNKO1FBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLEtBQUssQ0FBQTtRQUN2QyxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNmLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZixPQUFPLENBQUMsQ0FBQTthQUNYO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsaUJBQWlCLEVBQWpCLFVBQWtCLEtBQWEsRUFBRSxJQUFxQjtRQUFyQixxQkFBQSxFQUFBLFNBQXFCO1FBQ2xELElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUE7U0FDZDthQUFNLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsSUFBSSxJQUFJLEdBQWUsRUFBRSxDQUFBO1lBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUNoRCxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDZixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUMxQjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUE7U0FDZDtJQUNMLENBQUM7SUFDRDs7OztNQUlFO0lBQ0Ysa0JBQWtCLEVBQWxCLFVBQW1CLEtBQWEsRUFBRSxJQUFZO1FBQzFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0IsSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNyQixPQUFPLElBQUksQ0FBQTtTQUNkO2FBQU0sSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUMzQixJQUFJLElBQUksR0FBVyxFQUFFLENBQUE7WUFDckIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQy9DLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNmLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQzlCO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQTtTQUNkO0lBQ0wsQ0FBQztJQUNELFNBQVMsWUFBQyxLQUFLLEVBQUUsR0FBRztRQUNoQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN4QyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxNQUFNLElBQUUsS0FBSyxDQUFDLENBQUE7UUFDMUQsT0FBTyxNQUFNLElBQUksS0FBSyxDQUFBO0lBQzFCLENBQUM7SUFDRCx1QkFBdUI7SUFDdkIsYUFBYSxZQUFDLE1BQU0sRUFBRSxNQUFNO1FBQ3hCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNkO1FBRUQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFNBQVM7UUFDVCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsUUFBUTtZQUNSLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVU7WUFDL0QsY0FBYztZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsZUFBZTtZQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxTQUFTLEdBQUcsTUFBTSxFQUFFO2dCQUNsQyxPQUFPLE1BQU0sQ0FBQzthQUNqQjtTQUNKO0lBRUwsQ0FBQztDQUVKLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL+maj+acuuaVsOW4uOeUqOaWueazleW3peWFt+exu1xuZXhwb3J0IGNvbnN0IFJhbmRvbUN0ciA9IHtcblxuICAgIC8qKlxuICAgICAqIOiOt+WPllttaW4sbWF4KeS5i+mXtOeahOmaj+acuuaVsFxuICAgICAqIEBwYXJhbSBhcmVhIFxuICAgICAqL1xuICAgIGZpbmRSYW5kb21CYXNlKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOiOt+WPllttaW4sbWF4KeS5i+mXtOeahOmaj+acuuaVtOaVsFxuICAgICAqIEBwYXJhbSBtaW4gXG4gICAgICogQHBhcmFtIG1heCBcbiAgICAgKi9cbiAgICBmaW5kUmFuZG9tSW50ZWdlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmjInnhadhcnLojrflj5bmnYPph43lgLzvvIxhcnLkuLrmnYPph43liJfooahcbiAgICAgKiBAcGFyYW0gYXJyIFxuICAgICAqL1xuICAgIGZpbmRSYW5kb21BcnJheShhcnI6IEFycmF5PG51bWJlcj4gPSBbXSkge1xuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIGZvciAobGV0IG0gaW4gYXJyKSB7XG4gICAgICAgICAgICBpZiAoYXJyW21dKSB7XG4gICAgICAgICAgICAgICAgY291bnQgKz0gYXJyW21dXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJhbiA9IHRoaXMuZmluZFJhbmRvbUJhc2UoKSAqIGNvdW50XG4gICAgICAgIGZvciAobGV0IG0gaW4gYXJyKSB7XG4gICAgICAgICAgICBpZiAocmFuIDw9IGFyclttXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDBcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOS7juaVsOe7hGRhdGHkuK3lj5blh7pjb3V05Liq6ZqP5py65YC8XG4gICAgICogQHBhcmFtIGNvdW50IFxuICAgICAqIEBwYXJhbSBkYXRhIFxuICAgICAqL1xuICAgIGZpbmRMaXN0RnJvbUFycmF5KGNvdW50OiBudW1iZXIsIGRhdGE6IEFycmF5PGFueT4gPSBbXSkge1xuICAgICAgICBpZiAoY291bnQgPj0gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgIH0gZWxzZSBpZiAoY291bnQgPCBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHRlbXA6IEFycmF5PGFueT4gPSBbXVxuICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMucmFuZG9tTnVtQm90aChkYXRhLmxlbmd0aCwgY291bnQpXG4gICAgICAgICAgICBmb3IgKGxldCBtIGluIGFycikge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhW2FyclttXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcC5wdXNoKGRhdGFbYXJyW21dXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVtcFxuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAqIOS7juaVsOe7hGRhdGHkuK3lj5blh7pjb3V05Liq6ZqP5py65YC8XG4gICAgKiBAcGFyYW0gY291bnQgXG4gICAgKiBAcGFyYW0gZGF0YSBcbiAgICAqL1xuICAgIGZpbmRMaXN0RnJvbU9iamVjdChjb3VudDogbnVtYmVyLCBkYXRhOiBvYmplY3QpIHtcbiAgICAgICAgbGV0IG9iaiA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAgIGlmIChjb3VudCA+PSBvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICB9IGVsc2UgaWYgKGNvdW50IDwgb2JqLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHRlbXA6IG9iamVjdCA9IHt9XG4gICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5yYW5kb21OdW1Cb3RoKG9iai5sZW5ndGgsIGNvdW50KVxuICAgICAgICAgICAgZm9yIChsZXQgbSBpbiBhcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVthcnJbbV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBbYXJyW21dXSA9IGRhdGFbYXJyW21dXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZW1wXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGlzQ2hlY2tPayhsaW1pdCwgbWF4KSB7XG4gICAgICAgIGxldCByYW5kb20gPSB0aGlzLmZpbmRSYW5kb21CYXNlKDAsIG1heClcbiAgICAgICAgY29uc29sZS5lcnJvcihcImlzY2hlY2tPazpcIixsaW1pdCxtYXgscmFuZG9tLHJhbmRvbTw9bGltaXQpXG4gICAgICAgIHJldHVybiByYW5kb20gPD0gbGltaXRcbiAgICB9LFxuICAgIC8v5Y+W5Ye6MO+8jG1heExlbuWGheeahG1heE51beS4quaVsOWtl1xuICAgIHJhbmRvbU51bUJvdGgobWF4TGVuLCBtYXhOdW0pIHtcbiAgICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heExlbjsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaChpKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG51bUFyciA9IFtdO1xuICAgICAgICAvL+acgOWkp+eahOW+queOr+asoeaVsFxuICAgICAgICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy/lj5blh7rpmo/mnLrmlbAgXG4gICAgICAgICAgICB2YXIgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCk7IC8v55Sf5oiQ6ZqP5py65pWwbnVtXG4gICAgICAgICAgICAvL+W+gOaWsOW7uueahOaVsOe7hOmHjOmdouS8oOWFpeaVsOWAvFxuICAgICAgICAgICAgbnVtQXJyLnB1c2goYXJyW251bWJlcl0pO1xuICAgICAgICAgICAgLy/kvKDlhaXkuIDkuKrliKDpmaTkuIDkuKrvvIzpgb/lhY3ph43lpI1cbiAgICAgICAgICAgIGFyci5zcGxpY2UobnVtYmVyLCAxKTtcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoIDw9IGFyckxlbmd0aCAtIG1heE51bSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudW1BcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufSJdfQ==