//随机数常用方法工具类
export const RandomCtr = {

    /**
     * 获取[min,max)之间的随机数
     * @param area 
     */
    findRandomBase(min: number, max: number) {
        return Math.random() * (max - min) + min
    },

    /**
     * 获取[min,max)之间的随机整数
     * @param min 
     * @param max 
     */
    findRandomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min)
    },

    /**
     * 按照arr获取权重值，arr为权重列表
     * @param arr 
     */
    findRandomArray(arr: Array<number> = []) {
        let count = 0
        for (let m in arr) {
            if (arr[m]) {
                count += arr[m]
            }
        }
        let ran = this.findRandomBase() * count
        for (let m in arr) {
            if (ran <= arr[m]) {
                return m
            }
        }
        return 0
    },
    /**
     * 从数组data中取出cout个随机值
     * @param count 
     * @param data 
     */
    findListFromArray(count: number, data: Array<any> = []) {
        if (count >= data.length) {
            return data
        } else if (count < data.length) {
            let temp: Array<any> = []
            let arr = this.randomNumBoth(data.length, count)
            for (let m in arr) {
                if (data[arr[m]]) {
                    temp.push(data[arr[m]])
                }
            }
            return temp
        }
    },
    /**
    * 从数组data中取出cout个随机值
    * @param count 
    * @param data 
    */
    findListFromObject(count: number, data: object) {
        let obj = Object.keys(data)
        if (count >= obj.length) {
            return data
        } else if (count < obj.length) {
            let temp: object = {}
            let arr = this.randomNumBoth(obj.length, count)
            for (let m in arr) {
                if (data[arr[m]]) {
                    temp[arr[m]] = data[arr[m]]
                }
            }
            return temp
        }
    },
    isCheckOk(limit, max) {
        let random = this.findRandomBase(0, max)
        console.error("ischeckOk:",limit,max,random,random<=limit)
        return random <= limit
    },
    //取出0，maxLen内的maxNum个数字
    randomNumBoth(maxLen, maxNum) {
        var arr = [];
        for (var i = 0; i < maxLen; i++) {
            arr.push(i)
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

}