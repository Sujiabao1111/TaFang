//文本处理类
export const TextCtr = {
    /**
     * 使用parms的值一一替换text中的{parm}
     * @param text 
     * @param parms 
     */
    triggerToast(text: string, parms: Array<string> = []) {
        if (text) {
            for (let m in parms) {
                text = text.replace(/{parm}/, parms[m])
            }
        }
        return text
    },
    triggerNumber(info: number, limit: number = 2) {
        return info.toFixed(limit)
    },
    /**
     * sec秒转为时:分:秒格式
     * @param sec 
     */
    formatHourAndMinute(sec: number) {
        let h = Math.floor(sec / 3600)
        let m = Math.floor(sec % 3600 / 60)
        let s = sec % 3600

        let hour: string = h < 10 ? "0" + h : "" + h
        let minute: string = m < 10 ? "0" + m : "" + m
        let second: string = s < 10 ? "0" + s : "" + s

        return hour + ":" + minute + ":" + second
    },
    /**
     * sec秒转为分:秒格式
     * @param sec 
     */
    formatOnlyMinute(sec: number) {
        let m = Math.floor(sec / 60)
        let s = sec % 3600

        let minute: string = m < 10 ? "0" + m : "" + m
        let second: string = s < 10 ? "0" + s : "" + s

        return minute + ":" + second
    }
}