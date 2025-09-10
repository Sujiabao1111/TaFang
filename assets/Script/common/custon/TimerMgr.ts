
const { ccclass, property } = cc._decorator;

@ccclass
export class NewComponent extends cc.Component {
    start() {

    }

    update(deltaTime: number) {

    }
}

declare global {
    /**
     * 计时器发送消息
     */
    interface TimerMsg {
        /**每秒更新时 */
        updata: string[];
        /**结束时 */
        end?: string[];
        /**取消时 */
        cancel?: string[];
    }

    interface TimerData {
        /**计时器id，唯一标识一个计时器 */
        id: string;
        /**计时回调*/
        cb: Function;
    }

    type TimerName =
        'mining';
}

/**计时器管理器 */
export default class TimerMgr {
    private static _ins: TimerMgr;
    static get ins() {
        if (!this._ins) {
            this._ins = new TimerMgr();
        }
        return this._ins;
    }

    /**计时器容器 */
    private timerMap: Map<string, number> = new Map();
    /**发送的消息容器 */
    private emitMsgMap: Map<string, TimerMsg> = new Map();

    /**计时器回调容器 */
    private cbMap: Map<string, Map<string, Function>> = new Map();

    /**
     * 注册计时器回调
     *
     * @param msg 计时器消息
     * @param data 计时器数据对象
     */
    timer_on(msg: string, data: TimerData) {
        let cbMap = this.cbMap.get(msg)!;
        if (!cbMap) {
            cbMap = new Map();
            this.cbMap.set(msg, cbMap);
        }
        cbMap.set(data.id, data.cb);
    }

    /**
     * 注销计时器回调
     *
     * @param msg 计时器消息名
     * @param id 计时器ID
     */
    timer_off(msg: string, id: string) {
        const cbMap = this.cbMap.get(msg);
        if (cbMap) {
            cbMap.delete(id);
        }
    }

    /**
     * 触发指定消息的回调函数
     *
     * @param msg 要触发的消息
     * @param time 时间参数，将作为回调函数的参数传递
     */
    timer_emit(msg: string, time: number) {
        this.cbMap.get(msg)?.forEach(data => data(time));
    }

    /**
     * 取消计时
     * @param id 
     */
    cancelTimer(id: string) {
        id = String(id);
        const timer = this.timerMap.get(id);
        if (timer) {
            clearTimeout(timer);
            this.timerMap.delete(id);
        }

        console.log('cancelTimer', id);

        const emitMsg = this.emitMsgMap.get(id);
        if (emitMsg?.cancel) {
            for (let index = 0; index < emitMsg.cancel.length; index++) {
                const msg = emitMsg.updata[index];
                if (msg) {
                    this.cbMap.delete(msg);
                }
                else {
                    console.log('没有计时器取消束消息');
                }
            }
        }
        this.emitMsgMap.delete(id);
    }

    /**
     * 启动计时器
     *
     * @param name 计时器名称
     * @param stamp 计时器结束时的时间戳（毫秒）
     * @param emitMsg 计时器更新和结束时的消息，默认为空对象,发送的
     * @param nextStart 是否在计时器结束时立即重新启动计时器，默认为false
     */
    startTimer(name: TimerName, stamp: number, emitMsg?: TimerMsg, nextStart: boolean = false) {
        // 检查是否传入了有效的计时时间
        if (stamp == undefined) {
            console.warn('没有计时时间');
            return;
        }

        // 计算剩余时间
        // let stamp = Date.now() + time * 1000;
        // 如果没有传入emitMsg且，则使用默认值
        if (emitMsg == undefined) {
            emitMsg = this.emitMsgMap.get(name);
            if (emitMsg == undefined) {
                emitMsg = {
                    updata: [name],
                    end: [name],
                };
                // 存储emitMsg
                this.emitMsgMap.set(name, emitMsg);
            }
        }
        else {
            // 存储emitMsg
            this.emitMsgMap.set(name, emitMsg);
        }

        console.log('startCollect', name, stamp, stamp - Date.now(), emitMsg);

        // 获取已有的计时器
        let timer = this.timerMap.get(name);
        // 如果已有计时器，则清除并删除
        if (timer) {
            clearTimeout(timer);
            this.timerMap.delete(name);
        }

        // 如果需要立即启动下一个计时器
        if (nextStart) {
            // --stamp;
            timer = setTimeout(() => {
                // 更新计时器
                this.updateTimer(name, stamp);
            }, 1000);
            this.timerMap.set(name, timer);
        }
        // 如果不需要立即启动下一个计时器，则直接更新计时器
        else {
            this.updateTimer(name, stamp);
        }
    }

    /**
     * 每秒更新
     * @param id 计时器ID
     * @param stamp 结束时间戳
     * @returns 
     */
    updateTimer(id: string, stamp: number) {
        if (!stamp) {
            this.endTimer(id);
            return;
        }

        let time = stamp - Date.now();
        if (!time || time < 0) {
            this.endTimer(id);
            return;
        }
        const emitMsg = this.emitMsgMap.get(id);
        if (emitMsg?.updata) {
            for (let index = 0; index < emitMsg.updata.length; index++) {
                const msg = emitMsg.updata[index];
                if (msg) {
                    this.timer_emit(msg, time);
                    // console.log('updateTimer', id, time);

                }
                else {
                    console.log('没有计时器更新消息');
                }
            }
        }

        // --stamp;
        let timer = setTimeout(() => {
            this.updateTimer(id, stamp);
        }, 1000);
        this.timerMap.set(id, timer);
    }

    /**
     * 计时结束
     * @param id 计时id
     */
    endTimer(id: string) {
        const timer = this.timerMap.get(id);
        if (timer) {
            clearTimeout(timer);
            this.timerMap.delete(id);
        }

        console.log('endTimer', id);

        const emitMsg = this.emitMsgMap.get(id);
        this.emitMsgMap.delete(id);
        if (emitMsg?.end) {
            for (let index = 0; index < emitMsg.end.length; index++) {
                const msg = emitMsg.end[index];
                if (msg) {
                    this.timer_emit(msg, 0);
                }
                else {
                    console.log('没有计时器结束消息');
                }
            }
        }
    }
}