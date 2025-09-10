"use strict";
cc._RF.push(module, '77ac1LAhoNPZ78G002XqeBP', 'TimerMgr');
// Script/common/custon/TimerMgr.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewComponent = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewComponent = /** @class */ (function (_super) {
    __extends(NewComponent, _super);
    function NewComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewComponent.prototype.start = function () {
    };
    NewComponent.prototype.update = function (deltaTime) {
    };
    NewComponent = __decorate([
        ccclass
    ], NewComponent);
    return NewComponent;
}(cc.Component));
exports.NewComponent = NewComponent;
/**计时器管理器 */
var TimerMgr = /** @class */ (function () {
    function TimerMgr() {
        /**计时器容器 */
        this.timerMap = new Map();
        /**发送的消息容器 */
        this.emitMsgMap = new Map();
        /**计时器回调容器 */
        this.cbMap = new Map();
    }
    Object.defineProperty(TimerMgr, "ins", {
        get: function () {
            if (!this._ins) {
                this._ins = new TimerMgr();
            }
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 注册计时器回调
     *
     * @param msg 计时器消息
     * @param data 计时器数据对象
     */
    TimerMgr.prototype.timer_on = function (msg, data) {
        var cbMap = this.cbMap.get(msg);
        if (!cbMap) {
            cbMap = new Map();
            this.cbMap.set(msg, cbMap);
        }
        cbMap.set(data.id, data.cb);
    };
    /**
     * 注销计时器回调
     *
     * @param msg 计时器消息名
     * @param id 计时器ID
     */
    TimerMgr.prototype.timer_off = function (msg, id) {
        var cbMap = this.cbMap.get(msg);
        if (cbMap) {
            cbMap.delete(id);
        }
    };
    /**
     * 触发指定消息的回调函数
     *
     * @param msg 要触发的消息
     * @param time 时间参数，将作为回调函数的参数传递
     */
    TimerMgr.prototype.timer_emit = function (msg, time) {
        var _a;
        (_a = this.cbMap.get(msg)) === null || _a === void 0 ? void 0 : _a.forEach(function (data) { return data(time); });
    };
    /**
     * 取消计时
     * @param id
     */
    TimerMgr.prototype.cancelTimer = function (id) {
        id = String(id);
        var timer = this.timerMap.get(id);
        if (timer) {
            clearTimeout(timer);
            this.timerMap.delete(id);
        }
        console.log('cancelTimer', id);
        var emitMsg = this.emitMsgMap.get(id);
        if (emitMsg === null || emitMsg === void 0 ? void 0 : emitMsg.cancel) {
            for (var index = 0; index < emitMsg.cancel.length; index++) {
                var msg = emitMsg.updata[index];
                if (msg) {
                    this.cbMap.delete(msg);
                }
                else {
                    console.log('没有计时器取消束消息');
                }
            }
        }
        this.emitMsgMap.delete(id);
    };
    /**
     * 启动计时器
     *
     * @param name 计时器名称
     * @param stamp 计时器结束时的时间戳（毫秒）
     * @param emitMsg 计时器更新和结束时的消息，默认为空对象,发送的
     * @param nextStart 是否在计时器结束时立即重新启动计时器，默认为false
     */
    TimerMgr.prototype.startTimer = function (name, stamp, emitMsg, nextStart) {
        var _this = this;
        if (nextStart === void 0) { nextStart = false; }
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
        var timer = this.timerMap.get(name);
        // 如果已有计时器，则清除并删除
        if (timer) {
            clearTimeout(timer);
            this.timerMap.delete(name);
        }
        // 如果需要立即启动下一个计时器
        if (nextStart) {
            // --stamp;
            timer = setTimeout(function () {
                // 更新计时器
                _this.updateTimer(name, stamp);
            }, 1000);
            this.timerMap.set(name, timer);
        }
        // 如果不需要立即启动下一个计时器，则直接更新计时器
        else {
            this.updateTimer(name, stamp);
        }
    };
    /**
     * 每秒更新
     * @param id 计时器ID
     * @param stamp 结束时间戳
     * @returns
     */
    TimerMgr.prototype.updateTimer = function (id, stamp) {
        var _this = this;
        if (!stamp) {
            this.endTimer(id);
            return;
        }
        var time = stamp - Date.now();
        if (!time || time < 0) {
            this.endTimer(id);
            return;
        }
        var emitMsg = this.emitMsgMap.get(id);
        if (emitMsg === null || emitMsg === void 0 ? void 0 : emitMsg.updata) {
            for (var index = 0; index < emitMsg.updata.length; index++) {
                var msg = emitMsg.updata[index];
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
        var timer = setTimeout(function () {
            _this.updateTimer(id, stamp);
        }, 1000);
        this.timerMap.set(id, timer);
    };
    /**
     * 计时结束
     * @param id 计时id
     */
    TimerMgr.prototype.endTimer = function (id) {
        var timer = this.timerMap.get(id);
        if (timer) {
            clearTimeout(timer);
            this.timerMap.delete(id);
        }
        console.log('endTimer', id);
        var emitMsg = this.emitMsgMap.get(id);
        this.emitMsgMap.delete(id);
        if (emitMsg === null || emitMsg === void 0 ? void 0 : emitMsg.end) {
            for (var index = 0; index < emitMsg.end.length; index++) {
                var msg = emitMsg.end[index];
                if (msg) {
                    this.timer_emit(msg, 0);
                }
                else {
                    console.log('没有计时器结束消息');
                }
            }
        }
    };
    return TimerMgr;
}());
exports.default = TimerMgr;

cc._RF.pop();