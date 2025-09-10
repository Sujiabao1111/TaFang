
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/custon/TimerMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXGN1c3RvblxcVGltZXJNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLGdDQUFZO0lBQTlDOztJQVFBLENBQUM7SUFQRyw0QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBTyxTQUFpQjtJQUV4QixDQUFDO0lBUFEsWUFBWTtRQUR4QixPQUFPO09BQ0ssWUFBWSxDQVF4QjtJQUFELG1CQUFDO0NBUkQsQUFRQyxDQVJpQyxFQUFFLENBQUMsU0FBUyxHQVE3QztBQVJZLG9DQUFZO0FBa0N6QixZQUFZO0FBQ1o7SUFBQTtRQVNJLFdBQVc7UUFDSCxhQUFRLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbEQsYUFBYTtRQUNMLGVBQVUsR0FBMEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUV0RCxhQUFhO1FBQ0wsVUFBSyxHQUF1QyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBa01sRSxDQUFDO0lBL01HLHNCQUFXLGVBQUc7YUFBZDtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQzthQUM5QjtZQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQVVEOzs7OztPQUtHO0lBQ0gsMkJBQVEsR0FBUixVQUFTLEdBQVcsRUFBRSxJQUFlO1FBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FB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SyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU1QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLEVBQUU7WUFDZCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3JELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLElBQUksR0FBRyxFQUFFO29CQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUMzQjtxQkFDSTtvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUM1QjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBQ0wsZUFBQztBQUFELENBak5BLEFBaU5DLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBOZXdDb21wb25lbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcikge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gICAgLyoqXHJcbiAgICAgKiDorqHml7blmajlj5HpgIHmtojmga9cclxuICAgICAqL1xyXG4gICAgaW50ZXJmYWNlIFRpbWVyTXNnIHtcclxuICAgICAgICAvKirmr4/np5Lmm7TmlrDml7YgKi9cclxuICAgICAgICB1cGRhdGE6IHN0cmluZ1tdO1xyXG4gICAgICAgIC8qKue7k+adn+aXtiAqL1xyXG4gICAgICAgIGVuZD86IHN0cmluZ1tdO1xyXG4gICAgICAgIC8qKuWPlua2iOaXtiAqL1xyXG4gICAgICAgIGNhbmNlbD86IHN0cmluZ1tdO1xyXG4gICAgfVxyXG5cclxuICAgIGludGVyZmFjZSBUaW1lckRhdGEge1xyXG4gICAgICAgIC8qKuiuoeaXtuWZqGlk77yM5ZSv5LiA5qCH6K+G5LiA5Liq6K6h5pe25ZmoICovXHJcbiAgICAgICAgaWQ6IHN0cmluZztcclxuICAgICAgICAvKirorqHml7blm57osIMqL1xyXG4gICAgICAgIGNiOiBGdW5jdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICB0eXBlIFRpbWVyTmFtZSA9XHJcbiAgICAgICAgJ21pbmluZyc7XHJcbn1cclxuXHJcbi8qKuiuoeaXtuWZqOeuoeeQhuWZqCAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lck1nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zOiBUaW1lck1ncjtcclxuICAgIHN0YXRpYyBnZXQgaW5zKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lucyA9IG5ldyBUaW1lck1ncigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuoeaXtuWZqOWuueWZqCAqL1xyXG4gICAgcHJpdmF0ZSB0aW1lck1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcclxuICAgIC8qKuWPkemAgeeahOa2iOaBr+WuueWZqCAqL1xyXG4gICAgcHJpdmF0ZSBlbWl0TXNnTWFwOiBNYXA8c3RyaW5nLCBUaW1lck1zZz4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgLyoq6K6h5pe25Zmo5Zue6LCD5a655ZmoICovXHJcbiAgICBwcml2YXRlIGNiTWFwOiBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBGdW5jdGlvbj4+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rOo5YaM6K6h5pe25Zmo5Zue6LCDXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1zZyDorqHml7blmajmtojmga9cclxuICAgICAqIEBwYXJhbSBkYXRhIOiuoeaXtuWZqOaVsOaNruWvueixoVxyXG4gICAgICovXHJcbiAgICB0aW1lcl9vbihtc2c6IHN0cmluZywgZGF0YTogVGltZXJEYXRhKSB7XHJcbiAgICAgICAgbGV0IGNiTWFwID0gdGhpcy5jYk1hcC5nZXQobXNnKSE7XHJcbiAgICAgICAgaWYgKCFjYk1hcCkge1xyXG4gICAgICAgICAgICBjYk1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5jYk1hcC5zZXQobXNnLCBjYk1hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNiTWFwLnNldChkYXRhLmlkLCBkYXRhLmNiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOazqOmUgOiuoeaXtuWZqOWbnuiwg1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtc2cg6K6h5pe25Zmo5raI5oGv5ZCNXHJcbiAgICAgKiBAcGFyYW0gaWQg6K6h5pe25ZmoSURcclxuICAgICAqL1xyXG4gICAgdGltZXJfb2ZmKG1zZzogc3RyaW5nLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgY2JNYXAgPSB0aGlzLmNiTWFwLmdldChtc2cpO1xyXG4gICAgICAgIGlmIChjYk1hcCkge1xyXG4gICAgICAgICAgICBjYk1hcC5kZWxldGUoaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinpuWPkeaMh+Wumua2iOaBr+eahOWbnuiwg+WHveaVsFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtc2cg6KaB6Kem5Y+R55qE5raI5oGvXHJcbiAgICAgKiBAcGFyYW0gdGltZSDml7bpl7Tlj4LmlbDvvIzlsIbkvZzkuLrlm57osIPlh73mlbDnmoTlj4LmlbDkvKDpgJJcclxuICAgICAqL1xyXG4gICAgdGltZXJfZW1pdChtc2c6IHN0cmluZywgdGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jYk1hcC5nZXQobXNnKT8uZm9yRWFjaChkYXRhID0+IGRhdGEodGltZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+W5raI6K6h5pe2XHJcbiAgICAgKiBAcGFyYW0gaWQgXHJcbiAgICAgKi9cclxuICAgIGNhbmNlbFRpbWVyKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZCA9IFN0cmluZyhpZCk7XHJcbiAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnRpbWVyTWFwLmdldChpZCk7XHJcbiAgICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXJNYXAuZGVsZXRlKGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjYW5jZWxUaW1lcicsIGlkKTtcclxuXHJcbiAgICAgICAgY29uc3QgZW1pdE1zZyA9IHRoaXMuZW1pdE1zZ01hcC5nZXQoaWQpO1xyXG4gICAgICAgIGlmIChlbWl0TXNnPy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGVtaXRNc2cuY2FuY2VsLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXNnID0gZW1pdE1zZy51cGRhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2JNYXAuZGVsZXRlKG1zZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5rKh5pyJ6K6h5pe25Zmo5Y+W5raI5p2f5raI5oGvJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0TXNnTWFwLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkK/liqjorqHml7blmahcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbmFtZSDorqHml7blmajlkI3np7BcclxuICAgICAqIEBwYXJhbSBzdGFtcCDorqHml7blmajnu5PmnZ/ml7bnmoTml7bpl7TmiLPvvIjmr6vnp5LvvIlcclxuICAgICAqIEBwYXJhbSBlbWl0TXNnIOiuoeaXtuWZqOabtOaWsOWSjOe7k+adn+aXtueahOa2iOaBr++8jOm7mOiupOS4uuepuuWvueixoSzlj5HpgIHnmoRcclxuICAgICAqIEBwYXJhbSBuZXh0U3RhcnQg5piv5ZCm5Zyo6K6h5pe25Zmo57uT5p2f5pe256uL5Y2z6YeN5paw5ZCv5Yqo6K6h5pe25Zmo77yM6buY6K6k5Li6ZmFsc2VcclxuICAgICAqL1xyXG4gICAgc3RhcnRUaW1lcihuYW1lOiBUaW1lck5hbWUsIHN0YW1wOiBudW1iZXIsIGVtaXRNc2c/OiBUaW1lck1zZywgbmV4dFN0YXJ0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICAvLyDmo4Dmn6XmmK/lkKbkvKDlhaXkuobmnInmlYjnmoTorqHml7bml7bpl7RcclxuICAgICAgICBpZiAoc3RhbXAgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybign5rKh5pyJ6K6h5pe25pe26Ze0Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOiuoeeul+WJqeS9meaXtumXtFxyXG4gICAgICAgIC8vIGxldCBzdGFtcCA9IERhdGUubm93KCkgKyB0aW1lICogMTAwMDtcclxuICAgICAgICAvLyDlpoLmnpzmsqHmnInkvKDlhaVlbWl0TXNn5LiU77yM5YiZ5L2/55So6buY6K6k5YC8XHJcbiAgICAgICAgaWYgKGVtaXRNc2cgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVtaXRNc2cgPSB0aGlzLmVtaXRNc2dNYXAuZ2V0KG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZW1pdE1zZyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGVtaXRNc2cgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRhOiBbbmFtZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBbbmFtZV0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy8g5a2Y5YKoZW1pdE1zZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0TXNnTWFwLnNldChuYW1lLCBlbWl0TXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5a2Y5YKoZW1pdE1zZ1xyXG4gICAgICAgICAgICB0aGlzLmVtaXRNc2dNYXAuc2V0KG5hbWUsIGVtaXRNc2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0Q29sbGVjdCcsIG5hbWUsIHN0YW1wLCBzdGFtcCAtIERhdGUubm93KCksIGVtaXRNc2cpO1xyXG5cclxuICAgICAgICAvLyDojrflj5blt7LmnInnmoTorqHml7blmahcclxuICAgICAgICBsZXQgdGltZXIgPSB0aGlzLnRpbWVyTWFwLmdldChuYW1lKTtcclxuICAgICAgICAvLyDlpoLmnpzlt7LmnInorqHml7blmajvvIzliJnmuIXpmaTlubbliKDpmaRcclxuICAgICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lck1hcC5kZWxldGUobmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDlpoLmnpzpnIDopoHnq4vljbPlkK/liqjkuIvkuIDkuKrorqHml7blmahcclxuICAgICAgICBpZiAobmV4dFN0YXJ0KSB7XHJcbiAgICAgICAgICAgIC8vIC0tc3RhbXA7XHJcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDmm7TmlrDorqHml7blmahcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZXIobmFtZSwgc3RhbXApO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lck1hcC5zZXQobmFtZSwgdGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlpoLmnpzkuI3pnIDopoHnq4vljbPlkK/liqjkuIvkuIDkuKrorqHml7blmajvvIzliJnnm7TmjqXmm7TmlrDorqHml7blmahcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lcihuYW1lLCBzdGFtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P56eS5pu05pawXHJcbiAgICAgKiBAcGFyYW0gaWQg6K6h5pe25ZmoSURcclxuICAgICAqIEBwYXJhbSBzdGFtcCDnu5PmnZ/ml7bpl7TmiLNcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVUaW1lcihpZDogc3RyaW5nLCBzdGFtcDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCFzdGFtcCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZFRpbWVyKGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpbWUgPSBzdGFtcCAtIERhdGUubm93KCk7XHJcbiAgICAgICAgaWYgKCF0aW1lIHx8IHRpbWUgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kVGltZXIoaWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGVtaXRNc2cgPSB0aGlzLmVtaXRNc2dNYXAuZ2V0KGlkKTtcclxuICAgICAgICBpZiAoZW1pdE1zZz8udXBkYXRhKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBlbWl0TXNnLnVwZGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IGVtaXRNc2cudXBkYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyX2VtaXQobXNnLCB0aW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXBkYXRlVGltZXInLCBpZCwgdGltZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+ayoeacieiuoeaXtuWZqOabtOaWsOa2iOaBrycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLXN0YW1wO1xyXG4gICAgICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWVyKGlkLCBzdGFtcCk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgdGhpcy50aW1lck1hcC5zZXQoaWQsIHRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeaXtue7k+adn1xyXG4gICAgICogQHBhcmFtIGlkIOiuoeaXtmlkXHJcbiAgICAgKi9cclxuICAgIGVuZFRpbWVyKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB0aW1lciA9IHRoaXMudGltZXJNYXAuZ2V0KGlkKTtcclxuICAgICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lck1hcC5kZWxldGUoaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2VuZFRpbWVyJywgaWQpO1xyXG5cclxuICAgICAgICBjb25zdCBlbWl0TXNnID0gdGhpcy5lbWl0TXNnTWFwLmdldChpZCk7XHJcbiAgICAgICAgdGhpcy5lbWl0TXNnTWFwLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgaWYgKGVtaXRNc2c/LmVuZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZW1pdE1zZy5lbmQubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSBlbWl0TXNnLmVuZFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcl9lbWl0KG1zZywgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5rKh5pyJ6K6h5pe25Zmo57uT5p2f5raI5oGvJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=