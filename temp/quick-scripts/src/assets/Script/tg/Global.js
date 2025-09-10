"use strict";
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