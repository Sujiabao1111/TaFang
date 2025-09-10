
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/tg/Global.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '929751dGmJBSKplq4125oFU', 'Global');
// Script/tg/Global.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Global = void 0;
var Singleton_1 = require("../base/Singleton");
var Telegram = window["Telegram"];
var Global = /** @class */ (function (_super) {
    __extends(Global, _super);
    function Global() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.our_easing = { easing: 'quadInOut' }; //{ easing: 'quadInOut' };
        /** 是否上报过任务通知 */
        _this.isReportTask = {
            /** 订阅 */
            Subscribe: false,
            /** 加群 */
            AddGroup: false,
            /** 投票 */
            Vote: false,
            /** 使用底部三个道具 */
            item: false,
            /** 使用复活 */
            revive: false,
        };
        _this.show_mine = true;
        _this.isHaveAdFreeCount = true;
        _this.proplist = [];
        _this.loading_rate = 0;
        _this.ticket = "";
        _this.uid = 5190946;
        _this._userName = "";
        /** 金币(螺丝) */
        _this._game_coin = 0;
        /** 当前获取的的金币(螺丝) */
        _this.cur_got_coins = 0;
        /** 当前获取的箱子 */
        _this.cur_got_box = 0;
        /** 上一次的等级 */
        _this.after_lvl = 0;
        /**
         * 通过的等级
         */
        _this.game_lvl = 0;
        /** 获取今日已通过关卡数 */
        _this.today_passed = 0;
        /** 宝箱出现率提升关卡 */
        _this._box_up_lv = 0;
        /** 广告免费次数  2:复活 6:解锁 7:刷新 8:磁铁 */
        _this.AdTypeCount = [0, 0, 2, 0, 0, 0, 2, 2, 2];
        _this._reviveCount = 0;
        /** 玩家道具列表 */
        _this.userPropList = {
            6: 0,
            7: 0,
            8: 0,
            2: 0,
            5: 0,
        };
        return _this;
    }
    Object.defineProperty(Global, "ins", {
        get: function () {
            return _super.getInstance.call(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Global.prototype, "user_Name", {
        get: function () {
            return this._userName;
        },
        set: function (value) {
            this._userName = value;
        },
        enumerable: false,
        configurable: true
    });
    Global.prototype.initPlayer = function (user, userdata) {
        this.user = user;
        this.user_Name = user.name;
        this.setUserData(userdata);
        if (user.avatar != null && user.avatar != '' && this.avatar_url == null) {
            this.avatar_url = user.avatar;
        }
    };
    /**
     * 根据ID获取道具配置信息
     *
     * @param id 道具ID
     * @returns 返回对应的道具配置信息，如果未找到则返回undefined
     */
    Global.prototype.getPropsCfg = function (id) {
        return this.gameConfig.PropCfg.find(function (x) { return x.id == id; });
    };
    /**
     * 根据ID获取道具数量
     *
     * @param id 道具ID
     * @returns 返回对应的道具配置数量，如果未找到则返回undefined
     */
    Global.prototype.getPropsNum = function (id) {
        return this.proplist.find(function (x) { return x.prop_id == id; });
    };
    Object.defineProperty(Global.prototype, "ton_coin", {
        /** 游戏金币(ton) */
        get: function () {
            var _a, _b;
            return (_b = (_a = Global.ins) === null || _a === void 0 ? void 0 : _a.userData) === null || _b === void 0 ? void 0 : _b.coin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Global.prototype, "Azen_coin", {
        /** 游戏金币(Azen) */
        get: function () {
            var _a, _b;
            return (_b = (_a = Global.ins) === null || _a === void 0 ? void 0 : _a.userData) === null || _b === void 0 ? void 0 : _b.azen;
        },
        enumerable: false,
        configurable: true
    });
    /** 显示金额 */
    Global.prototype.usd_coin = function () {
        return __awaiter(this, void 0, Promise, function () {
            var price, usd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.GetTonUsdPrice()];
                    case 1:
                        price = _a.sent();
                        usd = this.ton_coin * price;
                        return [2 /*return*/, usd];
                }
            });
        });
    };
    ;
    /**
    * 获取TON与USD的汇率
    *
    * @returns 返回TON与USD的汇率，如果获取失败则返回0
    */
    Global.prototype.GetTonUsdPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, r, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("https://tonapi.io/v2/rates?tokens=ton&currencies=usd")];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        r = _a.sent();
                        return [2 /*return*/, r.rates.TON.prices.USD];
                    case 3:
                        e_1 = _a.sent();
                        console.warn('GetTonUsdPrice error: ', e_1);
                        return [2 /*return*/, 0];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Global.prototype, "game_coin", {
        /** 金币(螺丝) */
        get: function () {
            return this._game_coin;
        },
        set: function (value) {
            this._game_coin = value;
        },
        enumerable: false,
        configurable: true
    });
    /**  当前获取的的金币 箱子 */
    Global.prototype.resetCur_got = function () {
        Global.ins.cur_got_coins = 0;
        Global.ins.cur_got_box = 0;
    };
    Object.defineProperty(Global.prototype, "stage", {
        /**
        * 获取当前用户已经通过的关卡
        *
        * @returns 当前用户的阶段信息。如果reback_stage大于-1，则返回reback_stage；否则返回stage。
        */
        get: function () {
            if (this.userData.reback_stage > -1) {
                return this.userData.reback_stage;
            }
            else {
                return this.userData.stage;
            }
        },
        set: function (userData) {
            if (userData.reback_stage > -1) {
                this.game_lvl = userData.reback_stage;
            }
            else {
                this.game_lvl = userData.stage;
            }
        },
        enumerable: false,
        configurable: true
    });
    Global.prototype.setUserData = function (userData, is_update_user) {
        if (is_update_user === void 0) { is_update_user = true; }
        this.userData = userData;
        this.game_coin = this.userData.game_coin;
        this.stage = userData;
        // if (this.userData.reback_stage > -1) {
        //     GlobalData.cur_lvl = this.userData.reback_stage + 1;
        //     console.log("this.userData.reback_stage========", this.userData.reback_stage);
        // } else {
        //     if (!Global.ins.userData.pass_guide_stage) {
        //         GlobalData.cur_lvl = 0;
        //     } else {
        //         GlobalData.cur_lvl = this.userData.stage + 1;
        //     }
        // }
        // console.log("GlobalData.cur_lvl===========", GlobalData.cur_lvl);
        // if (is_update_user) {
        //     EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_USER);
        // }
    };
    Global.prototype.resetADCount = function () {
        /** 广告免费次数 */
        Global.ins.AdTypeCount = [0, 0, 2, 0, 0, 0, 2, 2, 2];
        if (CC_DEBUG) {
            Global.ins.AdTypeCount = [0, 0, 10, 0, 0, 0, 3, 3, 3];
        }
    };
    Object.defineProperty(Global.prototype, "reviveCount", {
        /**
         * 获取复活计数
         *
         */
        get: function () {
            return this._reviveCount;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 复活使用一次
     */
    Global.prototype.reviveUse = function () {
        this._reviveCount++;
    };
    /**
     * 重置复活次数
     */
    Global.prototype.resetReviveCount = function () {
        this._reviveCount = 0;
    };
    /**
   * 是否有周卡
   */
    Global.prototype.isHaveWeekCard = function () {
        var isWeek = (Global.ins.userData.card_type & Math.pow(2, 1)) !== 0;
        return isWeek;
    };
    Global.prototype.payment = function (order, cb) {
        if (window === null || window === void 0 ? void 0 : window.playdeckIsOpen) {
            this.set_playdeck_invoiceClosed_cb(cb);
            var amount = Math.floor(order.usd / 0.495 * 25);
            Playdeck_requestPayment(amount, "GemJam", order.oid);
            return;
        }
        this.openInvoice(order.link, cb);
    };
    Global.prototype.openInvoice = function (url, callback) {
        if (CC_DEBUG) {
            console.error("telegram web app is not inited!");
            return null;
        }
        Telegram === null || Telegram === void 0 ? void 0 : Telegram.WebApp.openInvoice(url, callback);
    };
    // 设置playdeck请求付款回调函数
    Global.prototype.set_playdeck_requestPayment_cb = function (callback) {
        // 获取支付回调函数
        window.requestPaymentCallback = callback;
    };
    //设置playdeck invoiceClosed回调
    Global.prototype.set_playdeck_invoiceClosed_cb = function (callback) {
        window.invoiceClosedCallback = callback;
    };
    Global.prototype.set_playdeck_showAd_cb = function (callback) {
        window.playdeckShowAdCallback = callback;
    };
    Global.prototype.openTelegramLink = function (url) {
        if (CC_DEBUG) {
            console.error("telegram web app is not inited!");
            return null;
        }
        Telegram === null || Telegram === void 0 ? void 0 : Telegram.WebApp.openTelegramLink(url);
    };
    Global.prototype.openLink = function (url) {
        if (CC_DEBUG) {
            console.error("telegram web app is not inited!");
            return null;
        }
        Telegram === null || Telegram === void 0 ? void 0 : Telegram.WebApp.openLink(url, {
            tryBrowser: 'chrome',
            tryInstantView: true,
        });
    };
    Global.prototype.getUserProplist = function () {
        var arr = [2, 5, 6, 7, 8];
        for (var i = 0; i < arr.length; i++) {
            var prop = this.getPropsNum(arr[i]);
            this.userPropList[arr[i]] = prop ? prop.num : 0;
        }
    };
    return Global;
}(Singleton_1.default));
exports.Global = Global;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0Z1xcR2xvYmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwrQ0FBMEM7QUFFMUMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBZ0JuQztJQUE0QiwwQkFBUztJQUFyQztRQUFBLHFFQTZUQztRQXRURyxnQkFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsMEJBQTBCO1FBRWhFLGdCQUFnQjtRQUNULGtCQUFZLEdBQUc7WUFDbEIsU0FBUztZQUNULFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFNBQVM7WUFDVCxRQUFRLEVBQUUsS0FBSztZQUNmLFNBQVM7WUFDVCxJQUFJLEVBQUUsS0FBSztZQUNYLGVBQWU7WUFDZixJQUFJLEVBQUUsS0FBSztZQUNYLFdBQVc7WUFDWCxNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDO1FBRUssZUFBUyxHQUFHLElBQUksQ0FBQztRQUNqQix1QkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsY0FBUSxHQUFHLEVBQUUsQ0FBQztRQUVkLGtCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLFlBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsU0FBRyxHQUFXLE9BQU8sQ0FBQztRQVFyQixlQUFTLEdBQUcsRUFBRSxDQUFDO1FBeUV2QixhQUFhO1FBQ0wsZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFhdkIsbUJBQW1CO1FBQ25CLG1CQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLGNBQWM7UUFDZCxpQkFBVyxHQUFHLENBQUMsQ0FBQztRQStCaEIsYUFBYTtRQUNiLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFDZDs7V0FFRztRQUNILGNBQVEsR0FBVyxDQUFDLENBQUM7UUFzQnJCLGlCQUFpQjtRQUNqQixrQkFBWSxHQUFXLENBQUMs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QyxDQTdUMkIsbUJBQVMsR0E2VHBDO0FBN1RZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgU2luZ2xldG9uIGZyb20gXCIuLi9iYXNlL1NpbmdsZXRvblwiO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gXCIuL0FwaVNlcnZpY2VcIjtcbmNvbnN0IFRlbGVncmFtID0gd2luZG93W1wiVGVsZWdyYW1cIl1cblxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIHBsYXlkZWNrSXNPcGVuOiBib29sZWFuO1xuICAgICAgICByZXF1ZXN0UGF5bWVudENhbGxiYWNrOiBGdW5jdGlvbjtcbiAgICAgICAgaW52b2ljZUNsb3NlZENhbGxiYWNrOiBGdW5jdGlvbjtcbiAgICAgICAgcGxheWRlY2tTaG93QWRDYWxsYmFjazogRnVuY3Rpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gUGxheWRlY2tfc2hvd0FkKCk6IHZvaWQ7XG4gICAgZnVuY3Rpb24gUGxheWRlY2tfcmVxdWVzdFBheW1lbnQoYW1vdW50OiBudW1iZXIsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG9yZGVySWQ6IHN0cmluZyk6IHZvaWQ7XG59XG5cblxuZXhwb3J0IGNsYXNzIEdsb2JhbCBleHRlbmRzIFNpbmdsZXRvbiB7XG4gICAgc3RhdGljIGdldCBpbnMoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5nZXRJbnN0YW5jZTxHbG9iYWw+KCk7XG4gICAgfVxuXG5cblxuICAgIG91cl9lYXNpbmcgPSB7IGVhc2luZzogJ3F1YWRJbk91dCcgfTsgLy97IGVhc2luZzogJ3F1YWRJbk91dCcgfTtcblxuICAgIC8qKiDmmK/lkKbkuIrmiqXov4fku7vliqHpgJrnn6UgKi9cbiAgICBwdWJsaWMgaXNSZXBvcnRUYXNrID0ge1xuICAgICAgICAvKiog6K6i6ZiFICovXG4gICAgICAgIFN1YnNjcmliZTogZmFsc2UsXG4gICAgICAgIC8qKiDliqDnvqQgKi9cbiAgICAgICAgQWRkR3JvdXA6IGZhbHNlLFxuICAgICAgICAvKiog5oqV56WoICovXG4gICAgICAgIFZvdGU6IGZhbHNlLFxuICAgICAgICAvKiog5L2/55So5bqV6YOo5LiJ5Liq6YGT5YW3ICovXG4gICAgICAgIGl0ZW06IGZhbHNlLFxuICAgICAgICAvKiog5L2/55So5aSN5rS7ICovXG4gICAgICAgIHJldml2ZTogZmFsc2UsXG4gICAgfTtcblxuICAgIHB1YmxpYyBzaG93X21pbmUgPSB0cnVlO1xuICAgIHB1YmxpYyBpc0hhdmVBZEZyZWVDb3VudCA9IHRydWU7XG4gICAgcHVibGljIHByb3BsaXN0ID0gW107XG5cbiAgICBwdWJsaWMgbG9hZGluZ19yYXRlID0gMDtcbiAgICBwdWJsaWMgdGlja2V0OiBzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyB1aWQ6IG51bWJlciA9IDUxOTA5NDY7XG5cbiAgICBwdWJsaWMgdXNlcjogVXNlcjtcbiAgICBwdWJsaWMgdXNlckRhdGE6IFVzZXJEYXRhO1xuICAgIC8qKiDmuLjmiI/phY3nva7kv6Hmga8gKi9cbiAgICBnYW1lQ29uZmlnOiBHYW1lQ29uZmlnO1xuICAgIGNhcmRQYWNrQ29uZmlnOiBDYXJkUGFja0NvbmZpZ0luZm9bXTtcblxuICAgIHByaXZhdGUgX3VzZXJOYW1lID0gXCJcIjtcbiAgICBwdWJsaWMgZ2V0IHVzZXJfTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck5hbWU7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgdXNlcl9OYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdXNlck5hbWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXZhdGFyX3VybDogc3RyaW5nO1xuICAgIHB1YmxpYyBpbml0UGxheWVyKHVzZXI6IFVzZXIsIHVzZXJkYXRhOiBVc2VyRGF0YSkge1xuICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB0aGlzLnVzZXJfTmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgdGhpcy5zZXRVc2VyRGF0YSh1c2VyZGF0YSk7XG5cbiAgICAgICAgaWYgKHVzZXIuYXZhdGFyICE9IG51bGwgJiYgdXNlci5hdmF0YXIgIT0gJycgJiYgdGhpcy5hdmF0YXJfdXJsID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXZhdGFyX3VybCA9IHVzZXIuYXZhdGFyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qC55o2uSUTojrflj5bpgZPlhbfphY3nva7kv6Hmga9cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCDpgZPlhbdJRFxuICAgICAqIEByZXR1cm5zIOi/lOWbnuWvueW6lOeahOmBk+WFt+mFjee9ruS/oeaBr++8jOWmguaenOacquaJvuWIsOWImei/lOWbnnVuZGVmaW5lZFxuICAgICAqL1xuICAgIGdldFByb3BzQ2ZnKGlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNvbmZpZy5Qcm9wQ2ZnLmZpbmQoeCA9PiB4LmlkID09IGlkKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOagueaNrklE6I635Y+W6YGT5YW35pWw6YePXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQg6YGT5YW3SURcbiAgICAgKiBAcmV0dXJucyDov5Tlm57lr7nlupTnmoTpgZPlhbfphY3nva7mlbDph4/vvIzlpoLmnpzmnKrmib7liLDliJnov5Tlm551bmRlZmluZWRcbiAgICAgKi9cbiAgICBnZXRQcm9wc051bShpZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BsaXN0LmZpbmQoeCA9PiB4LnByb3BfaWQgPT0gaWQpO1xuICAgIH1cblxuICAgIC8qKiDmuLjmiI/ph5HluIEodG9uKSAqL1xuICAgIHB1YmxpYyBnZXQgdG9uX2NvaW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5pbnM/LnVzZXJEYXRhPy5jb2luO1xuICAgIH1cblxuICAgIC8qKiDmuLjmiI/ph5HluIEoQXplbikgKi9cbiAgICBwdWJsaWMgZ2V0IEF6ZW5fY29pbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gR2xvYmFsLmlucz8udXNlckRhdGE/LmF6ZW47XG4gICAgfVxuXG4gICAgLyoqIOaYvuekuumHkeminSAqL1xuICAgIGFzeW5jIHVzZF9jb2luKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHByaWNlID0gYXdhaXQgdGhpcy5HZXRUb25Vc2RQcmljZSgpO1xuICAgICAgICBjb25zdCB1c2QgPSB0aGlzLnRvbl9jb2luICogcHJpY2U7XG4gICAgICAgIHJldHVybiB1c2Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICog6I635Y+WVE9O5LiOVVNE55qE5rGH546HXG4gICAgKlxuICAgICogQHJldHVybnMg6L+U5ZueVE9O5LiOVVNE55qE5rGH546H77yM5aaC5p6c6I635Y+W5aSx6LSl5YiZ6L+U5ZueMFxuICAgICovXG4gICAgYXN5bmMgR2V0VG9uVXNkUHJpY2UoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzcCA9IGF3YWl0IGZldGNoKGBodHRwczovL3RvbmFwaS5pby92Mi9yYXRlcz90b2tlbnM9dG9uJmN1cnJlbmNpZXM9dXNkYClcbiAgICAgICAgICAgIGxldCByID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgICAgICAgIHJldHVybiByLnJhdGVzLlRPTi5wcmljZXMuVVNEXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignR2V0VG9uVXNkUHJpY2UgZXJyb3I6ICcsIGUpO1xuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiDph5HluIEo6J665LidKSAqL1xuICAgIHByaXZhdGUgX2dhbWVfY29pbiA9IDA7XG4gICAgLyoqIOmHkeW4gSjonrrkuJ0pICovXG4gICAgcHVibGljIGdldCBnYW1lX2NvaW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVfY29pbjtcbiAgICB9XG4gICAgcHVibGljIHNldCBnYW1lX2NvaW4odmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9nYW1lX2NvaW4gPSB2YWx1ZTtcbiAgICB9XG5cblxuXG5cblxuICAgIC8qKiDlvZPliY3ojrflj5bnmoTnmoTph5HluIEo6J665LidKSAqL1xuICAgIGN1cl9nb3RfY29pbnMgPSAwO1xuICAgIC8qKiDlvZPliY3ojrflj5bnmoTnrrHlrZAgKi9cbiAgICBjdXJfZ290X2JveCA9IDA7XG4gICAgLyoqICDlvZPliY3ojrflj5bnmoTnmoTph5HluIEg566x5a2QICovXG4gICAgcmVzZXRDdXJfZ290KCkge1xuICAgICAgICBHbG9iYWwuaW5zLmN1cl9nb3RfY29pbnMgPSAwO1xuICAgICAgICBHbG9iYWwuaW5zLmN1cl9nb3RfYm94ID0gMDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICog6I635Y+W5b2T5YmN55So5oi35bey57uP6YCa6L+H55qE5YWz5Y2hXG4gICAgKlxuICAgICogQHJldHVybnMg5b2T5YmN55So5oi355qE6Zi25q615L+h5oGv44CC5aaC5p6ccmViYWNrX3N0YWdl5aSn5LqOLTHvvIzliJnov5Tlm55yZWJhY2tfc3RhZ2XvvJvlkKbliJnov5Tlm55zdGFnZeOAglxuICAgICovXG4gICAgZ2V0IHN0YWdlKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLnJlYmFja19zdGFnZSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YS5yZWJhY2tfc3RhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YS5zdGFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBzdGFnZSh1c2VyRGF0YTogVXNlckRhdGEpIHtcbiAgICAgICAgaWYgKHVzZXJEYXRhLnJlYmFja19zdGFnZSA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfbHZsID0gdXNlckRhdGEucmViYWNrX3N0YWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lX2x2bCA9IHVzZXJEYXRhLnN0YWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIOS4iuS4gOasoeeahOetiee6pyAqL1xuICAgIGFmdGVyX2x2bCA9IDA7XG4gICAgLyoqXG4gICAgICog6YCa6L+H55qE562J57qnXG4gICAgICovXG4gICAgZ2FtZV9sdmw6IG51bWJlciA9IDA7XG4gICAgc2V0VXNlckRhdGEodXNlckRhdGE6IFVzZXJEYXRhLCBpc191cGRhdGVfdXNlcjogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgdGhpcy51c2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgICAgICB0aGlzLmdhbWVfY29pbiA9IHRoaXMudXNlckRhdGEuZ2FtZV9jb2luO1xuICAgICAgICB0aGlzLnN0YWdlID0gdXNlckRhdGE7XG4gICAgICAgIC8vIGlmICh0aGlzLnVzZXJEYXRhLnJlYmFja19zdGFnZSA+IC0xKSB7XG4gICAgICAgIC8vICAgICBHbG9iYWxEYXRhLmN1cl9sdmwgPSB0aGlzLnVzZXJEYXRhLnJlYmFja19zdGFnZSArIDE7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcInRoaXMudXNlckRhdGEucmViYWNrX3N0YWdlPT09PT09PT1cIiwgdGhpcy51c2VyRGF0YS5yZWJhY2tfc3RhZ2UpO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgaWYgKCFHbG9iYWwuaW5zLnVzZXJEYXRhLnBhc3NfZ3VpZGVfc3RhZ2UpIHtcbiAgICAgICAgLy8gICAgICAgICBHbG9iYWxEYXRhLmN1cl9sdmwgPSAwO1xuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBHbG9iYWxEYXRhLmN1cl9sdmwgPSB0aGlzLnVzZXJEYXRhLnN0YWdlICsgMTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdsb2JhbERhdGEuY3VyX2x2bD09PT09PT09PT09XCIsIEdsb2JhbERhdGEuY3VyX2x2bCk7XG4gICAgICAgIC8vIGlmIChpc191cGRhdGVfdXNlcikge1xuICAgICAgICAvLyAgICAgRXZlbnRNYW5hZ2VyLmlucy5lbWl0KEVWRU5UX05BTUVfRU5VTS5VUERBVEVfVVNFUik7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cblxuICAgIC8qKiDojrflj5bku4rml6Xlt7LpgJrov4flhbPljaHmlbAgKi9cbiAgICB0b2RheV9wYXNzZWQ6IG51bWJlciA9IDA7XG5cbiAgICAvKiog5a6d566x5Ye6546w546H5o+Q5Y2H5YWz5Y2hICovXG4gICAgX2JveF91cF9sdjogbnVtYmVyID0gMDtcbiAgICAvKiog5a6d566x5Ye6546w546H5o+Q5Y2H5YWz5Y2hICovXG4gICAgLy8gZ2V0IGJveF91cF9sdigpOiBudW1iZXIge1xuICAgIC8vICAgICAvLyByZXR1cm4gTWF0aC5jZWlsKEdsb2JhbERhdGEuY3VyX2x2bCAvIDUpICogNTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAqIOetvuWIsOWkqeaVsFxuICAgICovXG4gICAgcmVjZWl2ZV9kYXk6IG51bWJlcjtcblxuXG5cblxuICAgIC8qKiDlub/lkYrlhY3otLnmrKHmlbAgIDI65aSN5rS7IDY66Kej6ZSBIDc65Yi35pawIDg656OB6ZOBICovXG4gICAgQWRUeXBlQ291bnQgPSBbMCwgMCwgMiwgMCwgMCwgMCwgMiwgMiwgMl1cbiAgICByZXNldEFEQ291bnQoKSB7XG4gICAgICAgIC8qKiDlub/lkYrlhY3otLnmrKHmlbAgKi9cbiAgICAgICAgR2xvYmFsLmlucy5BZFR5cGVDb3VudCA9IFswLCAwLCAyLCAwLCAwLCAwLCAyLCAyLCAyXVxuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIEdsb2JhbC5pbnMuQWRUeXBlQ291bnQgPSBbMCwgMCwgMTAsIDAsIDAsIDAsIDMsIDMsIDNdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcmV2aXZlQ291bnQ6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICog6I635Y+W5aSN5rS76K6h5pWwXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgcmV2aXZlQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXZpdmVDb3VudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpI3mtLvkvb/nlKjkuIDmrKFcbiAgICAgKi9cbiAgICByZXZpdmVVc2UoKSB7XG4gICAgICAgIHRoaXMuX3Jldml2ZUNvdW50Kys7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeN572u5aSN5rS75qyh5pWwXG4gICAgICovXG4gICAgcmVzZXRSZXZpdmVDb3VudCgpIHtcbiAgICAgICAgdGhpcy5fcmV2aXZlQ291bnQgPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgKiDmmK/lkKbmnInlkajljaFcbiAgICovXG4gICAgaXNIYXZlV2Vla0NhcmQoKSB7XG4gICAgICAgIGxldCBpc1dlZWsgPSAoR2xvYmFsLmlucy51c2VyRGF0YS5jYXJkX3R5cGUgJiBNYXRoLnBvdygyLCAxKSkgIT09IDBcbiAgICAgICAgcmV0dXJuIGlzV2Vla1xuICAgIH1cblxuICAgIHBheW1lbnQob3JkZXIsIGNiKSB7XG4gICAgICAgIGlmICh3aW5kb3c/LnBsYXlkZWNrSXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnNldF9wbGF5ZGVja19pbnZvaWNlQ2xvc2VkX2NiKGNiKVxuICAgICAgICAgICAgdmFyIGFtb3VudCA9IE1hdGguZmxvb3Iob3JkZXIudXNkIC8gMC40OTUgKiAyNSlcbiAgICAgICAgICAgIFBsYXlkZWNrX3JlcXVlc3RQYXltZW50KGFtb3VudCwgXCJHZW1KYW1cIiwgb3JkZXIub2lkKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5JbnZvaWNlKG9yZGVyLmxpbmssIGNiKVxuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuSW52b2ljZSh1cmw6IHN0cmluZywgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0ZWxlZ3JhbSB3ZWIgYXBwIGlzIG5vdCBpbml0ZWQhXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgVGVsZWdyYW0/LldlYkFwcC5vcGVuSW52b2ljZSh1cmwsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvLyDorr7nva5wbGF5ZGVja+ivt+axguS7mOasvuWbnuiwg+WHveaVsFxuICAgIHNldF9wbGF5ZGVja19yZXF1ZXN0UGF5bWVudF9jYihjYWxsYmFjaykge1xuICAgICAgICAvLyDojrflj5bmlK/ku5jlm57osIPlh73mlbBcbiAgICAgICAgd2luZG93LnJlcXVlc3RQYXltZW50Q2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIH1cblxuICAgIC8v6K6+572ucGxheWRlY2sgaW52b2ljZUNsb3NlZOWbnuiwg1xuICAgIHNldF9wbGF5ZGVja19pbnZvaWNlQ2xvc2VkX2NiKGNhbGxiYWNrKSB7XG4gICAgICAgIHdpbmRvdy5pbnZvaWNlQ2xvc2VkQ2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIH1cblxuICAgIHNldF9wbGF5ZGVja19zaG93QWRfY2IoY2FsbGJhY2spIHtcbiAgICAgICAgd2luZG93LnBsYXlkZWNrU2hvd0FkQ2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuVGVsZWdyYW1MaW5rKHVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInRlbGVncmFtIHdlYiBhcHAgaXMgbm90IGluaXRlZCFcIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBUZWxlZ3JhbT8uV2ViQXBwLm9wZW5UZWxlZ3JhbUxpbmsodXJsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbkxpbmsodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwidGVsZWdyYW0gd2ViIGFwcCBpcyBub3QgaW5pdGVkIVwiKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgVGVsZWdyYW0/LldlYkFwcC5vcGVuTGluayh1cmwsIHtcbiAgICAgICAgICAgIHRyeUJyb3dzZXI6ICdjaHJvbWUnLFxuICAgICAgICAgICAgdHJ5SW5zdGFudFZpZXc6IHRydWUsXG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAvKiog546p5a626YGT5YW35YiX6KGoICovXG4gICAgdXNlclByb3BMaXN0ID0ge1xuICAgICAgICA2OiAwLCAvLyDop6PplIEgNlxuICAgICAgICA3OiAwLCAvLyDovazmjaLliLfmlrAgN1xuICAgICAgICA4OiAwLCAvLyDno4Hpk4EgOFxuICAgICAgICAyOiAwLCAvLyDlpI3mtLsgMlxuICAgICAgICA1OiAwLCAvL+WbnuWIsOesrOS4gOWFszVcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlclByb3BsaXN0KCkge1xuICAgICAgICBsZXQgYXJyID0gWzIsIDUsIDYsIDcsIDhdXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcHJvcCA9IHRoaXMuZ2V0UHJvcHNOdW0oYXJyW2ldKTtcbiAgICAgICAgICAgIHRoaXMudXNlclByb3BMaXN0W2FycltpXV0gPSBwcm9wID8gcHJvcC5udW0gOiAwO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==