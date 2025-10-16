/** 时间戳相关工具类 */
export class TimeTools {
    /** 单例模式 */
    private static _instance: TimeTools = new TimeTools();
    private constructor() { }
    public static get _ins() {
        return this._instance;
    }
    //  注意 Time 不传时 默认就是当前的时间戳

    /** 获取当前时间戳 */
    getNowTime() {
        return new Date().getTime();
    };

    /** 通过时间戳 获取时间 */
    getTimeData(nowTime?: number) {
        nowTime = nowTime || new Date().getTime();

        let time = <TimeData>{};
        time.day = this.getDayForTime(nowTime);
        time.hour = this.getHourForTime(nowTime);
        time.minute = this.getMinuteForTime(nowTime);
        time.second = this.getSecondForTime(nowTime);

        return time;
    };
    /** 通过 时间戳 获取 时分秒 类型的字符串 */
    getStrToHMSForSecond(time?: number) {
        let second = this.getSecondForTime(time);
        return this.secondToHMS(second);
    };
    /** 通过 时间戳 获取 分秒 类型的字符串 */
    getStrToMSForSecond(time?: number) {
        let second = this.getSecondForTime(time);
        return this.secondToMS(second);
    };
    secondToHMS(second: number) {
        let H = this.prefixInteger(Math.floor(second / 60 / 60));  //整数前边补零
        let M = this.prefixInteger(Math.floor(second / 60 % 60));
        let S = this.prefixInteger(Math.floor(second % 60 % 60));
        return H + ":" + M + ":" + S;
    }
    secondToMS(second: number) {
        let M = this.prefixInteger(Math.floor(second / 60 % 60));
        let S = this.prefixInteger(Math.floor(second % 60 % 60));
        return M + ":" + S;
    }
    /** 通过时间戳 获取年月日 */
    getStrToYMDForDate(time?: number) {
        let date = new Date(time);
        let Y = date.getFullYear();
        let M = date.getMonth() + 1;
        let D = date.getDate();
        return Y + "." + M + "." + D;
    };

    /** 获取两个时间戳相差的秒数 */
    getSecondTimeDiff(time1?: number, time2?: number) {
        return this.getSecondForTime(time2) - this.getSecondForTime(time1);
    };
    /** 获取两个时间戳相差的分钟数 */
    getMinuteTimeDiff(time1?: number, time2?: number) {
        return this.getMinuteForTime(time2) - this.getMinuteForTime(time1);
    };
    /** 获取两个时间戳相差的小时数 */
    getHourTimeDiff(time1?: number, time2?: number) {
        // cc.log(this.getHourForTime(time2), this.getHourForTime(time1), this.getHourForTime(time2) - this.getHourForTime(time1));
        return this.getHourForTime(time2) - this.getHourForTime(time1);
    };
    /** 获取两个时间戳相差的天数 */
    getDayTimeDiff(time1?: number, time2?: number) {
        return this.getDayForTime(time2) - this.getDayForTime(time1);
    };

    /** 通过时间戳获取天数 */
    getDayForTime(time?: number) {
        time = time || new Date().getTime();
        return Math.floor(time / (24 * 60 * 60 * 1000));
    };
    /** 通过时间戳获取小时数 */
    getHourForTime(time?: number) {
        time = time || new Date().getTime();
        return Math.floor(time / (60 * 60 * 1000));
    };
    /** 通过时间戳获取分钟数 */
    getMinuteForTime(time?: number) {
        time = time || new Date().getTime();
        return Math.floor(time / (60 * 1000));
    };
    /** 通过时间戳获取秒数 */
    getSecondForTime(time?: number) {
        time = time || new Date().getTime();
        return Math.floor(time / (1000));
    };
    /**
 * 数字整数前边补零 并返回字符串
 * @param num 传入的数字
 * @param length 前边补几个零
 */
    private prefixInteger(num: number, length = 2): string {
        return (Array(length).join('0') + num).slice(-length);
    };


    /**
     * 获取两个时间点之间的时间差，并格式化为时分秒格式
     * @param endTimestamp 结束时间的时间戳（毫秒）
     * @returns 返回格式为"HH:MM:SS"的字符串，如果时间差为负数或零，则返回"00:00:00"
     */
    getTimeHMS(endTimestamp: number) {
        // 计算时间差（毫秒）
        const now = Date.now();
        let diff = endTimestamp - now;

        // 处理过期情况
        if (diff <= 0) {
            return "00:00:00"
        };

        // 计算时分秒
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff %= (1000 * 60 * 60);
        const minutes = Math.floor(diff / (1000 * 60));
        diff %= (1000 * 60);
        const seconds = Math.floor(diff / 1000);

        // 格式化为两位数
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    /**
    * 获取两个时间点之间的时间差，并格式化为时分秒格式
    * @param endTimestamp 结束时间的时间戳（秒）
    * @returns 返回格式为"HH:MM:SS"的字符串，如果时间差为负数或零，则返回"00:00:00"
    */
    getTimeHMS2(endTimestamp: number) {
        // 计算时间差（秒）
        let diff = endTimestamp;

        // 处理过期情况
        if (diff <= 0) {
            return "00:00:00"
        };

        // 计算时分秒
        const hours = Math.floor(diff / (60 * 60));
        diff %= (60 * 60);
        const minutes = Math.floor(diff / (60));
        diff %= (60)
        const seconds = diff;

        // 格式化为两位数
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

/** 时间数据   */
type TimeData = {
    day: number,   //天
    hour: number,   //小时
    minute: number,  //分钟
    second: number,   //秒
}