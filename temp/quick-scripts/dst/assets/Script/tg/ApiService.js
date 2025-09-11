
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/tg/ApiService.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ba7dKyE9pHlKbvAe9RC2qZ', 'ApiService');
// Script/tg/ApiService.ts

"use strict";
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
exports.ApiService = exports.ChannelType = exports.TaskNotifyType = exports.ErrorMsg = exports.ErrorCode = void 0;
var AssistCtr_1 = require("../Assist/AssistCtr");
var LanguageData_1 = require("../Language/LanguageData");
var Global_1 = require("./Global");
var HttpClient_1 = require("./HttpClient");
var WalletMgr_1 = require("./WalletMgr");
var Telegram = window["Telegram"];
//#region 枚举
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["iota"] = 0] = "iota";
    /** 数据解析错误 */
    ErrorCode[ErrorCode["ErrorParseError"] = 1] = "ErrorParseError";
    /** 数据库错误 */
    ErrorCode[ErrorCode["ErrorSQLError"] = 2] = "ErrorSQLError";
    /** 错误的openid */
    ErrorCode[ErrorCode["ErrorOpenidError"] = 3] = "ErrorOpenidError";
    /** 创建用户失败 */
    ErrorCode[ErrorCode["ErrorCreateUser"] = 4] = "ErrorCreateUser";
    /** 用户不存在 */
    ErrorCode[ErrorCode["ErrorUserNotExist"] = 5] = "ErrorUserNotExist";
    /** 创建角色token失败 */
    ErrorCode[ErrorCode["ErrorCreateToken"] = 6] = "ErrorCreateToken";
    /** 签名验证失败 */
    ErrorCode[ErrorCode["ErrorValidateError"] = 7] = "ErrorValidateError";
    /** 用户未登录 */
    ErrorCode[ErrorCode["ErrorUserNotLogin"] = 8] = "ErrorUserNotLogin";
    /** 配置不存在 */
    ErrorCode[ErrorCode["ErrorConfigNotExist"] = 9] = "ErrorConfigNotExist";
    /** 资源不足 */
    ErrorCode[ErrorCode["ErrorResourceNotEnough"] = 10] = "ErrorResourceNotEnough";
    /** 最低%.2f才可以提现 */
    ErrorCode[ErrorCode["ErrorCoinNotEnough"] = 11] = "ErrorCoinNotEnough";
    /** 周卡等级不足 */
    ErrorCode[ErrorCode["ErrorRankNotEnough"] = 12] = "ErrorRankNotEnough";
    /** 尚未实现 */
    ErrorCode[ErrorCode["ErrorNotImpleted"] = 13] = "ErrorNotImpleted";
    /** 今日已领取 */
    ErrorCode[ErrorCode["ErrorAlreadyTake"] = 14] = "ErrorAlreadyTake";
    /** 已经购买该卡 */
    ErrorCode[ErrorCode["ErrorAlreadyHaveRank"] = 15] = "ErrorAlreadyHaveRank";
    /** 未找到记录 */
    ErrorCode[ErrorCode["ErrorNotfound"] = 16] = "ErrorNotfound";
    /** 订单状态错误 */
    ErrorCode[ErrorCode["ErrorOrderStatuWrong"] = 17] = "ErrorOrderStatuWrong";
    /** 今日已分享 */
    ErrorCode[ErrorCode["ErrorTodayShared"] = 18] = "ErrorTodayShared";
    /** 获取列表失败 */
    ErrorCode[ErrorCode["ErrorDynamicError"] = 19] = "ErrorDynamicError";
    /** 无法领取奖励 */
    ErrorCode[ErrorCode["ErrorClaimReward"] = 20] = "ErrorClaimReward";
    /** 不能重复购买 */
    ErrorCode[ErrorCode["ErrorRepeatPurchase"] = 21] = "ErrorRepeatPurchase";
    /** 不能使用道具 */
    ErrorCode[ErrorCode["ErrorUseProp"] = 22] = "ErrorUseProp";
    /** 广告中途退出 */
    ErrorCode[ErrorCode["ErrorAdExitsMidway"] = 23] = "ErrorAdExitsMidway";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var ErrorMsg;
(function (ErrorMsg) {
    /** 不显示错误 */
    // null = 0,
    /** 数据解析错误 */
    ErrorMsg[ErrorMsg["ErrorParseErrorStr"] = 1] = "ErrorParseErrorStr";
    /** 数据库错误 */
    ErrorMsg[ErrorMsg["ErrorSQLErrorStr"] = 2] = "ErrorSQLErrorStr";
    /** 错误的openid */
    ErrorMsg[ErrorMsg["ErrorOpenidErrorStr"] = 3] = "ErrorOpenidErrorStr";
    /** 创建用户失败 */
    ErrorMsg[ErrorMsg["ErrorCreateUserStr"] = 4] = "ErrorCreateUserStr";
    /** 用户不存在 */
    ErrorMsg[ErrorMsg["ErrorUserNotExistStr"] = 5] = "ErrorUserNotExistStr";
    /** 创建角色token失败 */
    ErrorMsg[ErrorMsg["ErrorCreateTokenStr"] = 6] = "ErrorCreateTokenStr";
    /** 签名验证失败 */
    ErrorMsg[ErrorMsg["ErrorValidateErrorStr"] = 7] = "ErrorValidateErrorStr";
    /** 用户未登录 */
    ErrorMsg[ErrorMsg["ErrorUserNotLoginStr"] = 8] = "ErrorUserNotLoginStr";
    /** 配置不存在 */
    ErrorMsg[ErrorMsg["ErrorConfigNotExistStr"] = 9] = "ErrorConfigNotExistStr";
    /** 资源不足 */
    ErrorMsg[ErrorMsg["ErrorResourceNotEnoughStr"] = 10] = "ErrorResourceNotEnoughStr";
    /** 最低%.2f才可以提现 */
    ErrorMsg[ErrorMsg["ErrorCoinNotEnoughStr"] = 11] = "ErrorCoinNotEnoughStr";
    /** 周卡等级不足 */
    ErrorMsg[ErrorMsg["ErrorRankNotEnoughStr"] = 12] = "ErrorRankNotEnoughStr";
    /** 尚未实现 */
    ErrorMsg[ErrorMsg["ErrorNotImpletedStr"] = 13] = "ErrorNotImpletedStr";
    /** 今日已领取 */
    ErrorMsg[ErrorMsg["ErrorAlreadyTakeStr"] = 14] = "ErrorAlreadyTakeStr";
    /** 已经购买该卡 */
    ErrorMsg[ErrorMsg["ErrorAlreadyHaveRankStr"] = 15] = "ErrorAlreadyHaveRankStr";
    /** 未找到记录 */
    ErrorMsg[ErrorMsg["ErrorNotfoundStr"] = 16] = "ErrorNotfoundStr";
    /** 订单状态错误 */
    ErrorMsg[ErrorMsg["ErrorOrderStatuWrongStr"] = 17] = "ErrorOrderStatuWrongStr";
    /** 今日已分享 */
    ErrorMsg[ErrorMsg["ErrorTodaySharedStr"] = 18] = "ErrorTodaySharedStr";
    /** 获取列表失败 */
    ErrorMsg[ErrorMsg["ErrorDynamicError"] = 19] = "ErrorDynamicError";
    /** 无法领取奖励 */
    ErrorMsg[ErrorMsg["ErrorClaimRewardStr"] = 20] = "ErrorClaimRewardStr";
    /** 不能重复购买 */
    ErrorMsg[ErrorMsg["ErrorRepeatPurchaseStr"] = 21] = "ErrorRepeatPurchaseStr";
    /** 不能使用道具 */
    ErrorMsg[ErrorMsg["ErrorUsePropStr"] = 22] = "ErrorUsePropStr";
    /** 广告中途退出 */
    ErrorMsg[ErrorMsg["ErrorAdExitsMidway"] = 23] = "ErrorAdExitsMidway";
})(ErrorMsg = exports.ErrorMsg || (exports.ErrorMsg = {}));
/**
 * 任务通知类型
 */
var TaskNotifyType;
(function (TaskNotifyType) {
    /** 订阅 */
    TaskNotifyType["Subscribe"] = "subscribe";
    /** 加群 */
    TaskNotifyType["AddGroup"] = "addgroup";
    /** 投票 */
    TaskNotifyType["Vote"] = "vote";
    /** 使用底部三个道具 */
    TaskNotifyType["item"] = "12";
    /** 使用复活 */
    TaskNotifyType["revive"] = "13";
})(TaskNotifyType = exports.TaskNotifyType || (exports.TaskNotifyType = {}));
var ChannelType;
(function (ChannelType) {
    ChannelType["ton"] = "ton";
    ChannelType["azen"] = "azen";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
//#endregion
//#region API
/**
 * 业务API服务类，封装具体业务接口
 * @class
 * @example
 * const api = new ApiService({
 *   baseUrl: 'http://api.example.com'
 * });
 *
 */
var ApiService = /** @class */ (function () {
    /**
     * 构造函数
     *
     * @param baseUrl 基础URL
     */
    function ApiService() {
        /**
         * HTTP客户端实例
         */
        this.http = new HttpClient_1.default({
            baseUrl: this.baseUrl
        });
        /** 是否登录 */
        this.logined = false;
    }
    Object.defineProperty(ApiService.prototype, "baseUrl", {
        get: function () {
            if (ApiService.TEST) { // 测试
                return 'https://car.vazhenina.com/testapi';
            }
            return 'https://car.vazhenina.com/api';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiService, "ins", {
        get: function () {
            if (!this._ins) {
                this._ins = new ApiService();
            }
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 用户登录
     *
     * @param openId 用户OpenID
     * @param initData 初始化数据
     * @param iid 邀请者的uid
     * @returns 返回包含token的对象
     */
    ApiService.prototype.login = function (openId, initData, iid, loginType) {
        var _a, _b, _c;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        openId = String(openId);
                        // console.log('login:', openId, initData);
                        if (!iid) {
                            iid = 0;
                        }
                        else {
                            iid = Number(iid);
                        }
                        return [4 /*yield*/, this.http.post('/logintg', {
                                open_id: openId,
                                iid: iid,
                                init_data: initData,
                                login_type: loginType,
                            })];
                    case 1:
                        response = _d.sent();
                        if (response && (response === null || response === void 0 ? void 0 : response.response) && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            this.http.setAuthToken(response.response.data.jwt);
                            Global_1.Global.ins.receive_day = (_c = (_b = response.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.receive_day;
                            // Global.ins.initPlayer(response.data.user, response.data.userdata);
                            console.log("登录成功", response);
                            this.logined = true;
                        }
                        else {
                            console.log("登录失败", response);
                            this.logined = false;
                        }
                        return [2 /*return*/, response.response];
                }
            });
        });
    };
    /**
     * 获取用户信息
     *
     * @returns 返回用户信息的响应数据
     */
    ApiService.prototype.getUserinfo = function (is_update_user) {
        var _a, _b;
        if (is_update_user === void 0) { is_update_user = true; }
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getuserinfo', null, { auth: true })];
                    case 1:
                        response = _c.sent();
                        if (response && (response === null || response === void 0 ? void 0 : response.response) && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            console.log("获取用户信息", response);
                            Global_1.Global.ins.setUserData((_b = response.response.data) === null || _b === void 0 ? void 0 : _b.userdata, is_update_user);
                            return [2 /*return*/, response === null || response === void 0 ? void 0 : response.response];
                        }
                        else {
                            console.log("获取用户信息失败", response);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取游戏配置信息
     *
     * @returns 返回获取的配置信息
     */
    ApiService.prototype.getConfigs = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post('/configs', null, { auth: false })];
                    case 1:
                        response = _a.sent();
                        console.log('getConfigs  gameConfig:', response);
                        if (response.status >= 400) {
                            return [2 /*return*/, null];
                        }
                        Global_1.Global.ins.gameConfig = response.response.data.cfg;
                        return [2 /*return*/, response.response];
                }
            });
        });
    };
    /**
     * 提交提现请求
     *
     * @param amount 提现金额
     * @param channel 提现渠道，可选参数，渠道,不传或者空字符默认为ton
     * @param walletAddress 提现地址
     * @returns 提交结果
     */
    ApiService.prototype.submitWithdraw = function (amount, channel) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/submitwithdraw', { a: amount, channel: channel, addr: WalletMgr_1.WalletMgr.ins.getAddress() }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if (response.status == 200 && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            Global_1.Global.ins.setUserData(response.response.data.userdata);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      * 返回票据信息
      */
    ApiService.prototype.getTicket = function (gid) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/openstage', { gid: gid }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if (response && ((_a = response.response.data) === null || _a === void 0 ? void 0 : _a.ticket)) {
                            Global_1.Global.ins.ticket = response.response.data.ticket;
                            return [2 /*return*/, response.response.data.ticket];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
   * 获取关卡奖励信息
   * @param gid 关卡id
   *
   * @returns
   */
    ApiService.prototype.getLvPrize = function (gid, check_coin) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var ticket, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ticket = Global_1.Global.ins.ticket;
                        if (!ticket) {
                            // Global.ins.ticket = ticket = await this.getTicket(GlobalData.cur_lvl);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.http.post('/passstage', { ticket: ticket, gid: gid, check_coin: check_coin }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if (response.status == 200 && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            Global_1.Global.ins.setUserData(response.response.data.userdata);
                            Global_1.Global.ins.ticket = undefined;
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // /**
    //  * 兑换宝箱钥匙
    //  * @param type 宝箱类型 (使用BoxType枚举)
    //  */
    // async exchangeBoxKey(type: BoxType): Promise<ApiMsg<ExchangeBoxKeyResponse>> {
    //   const response = await this.http.post<ExchangeBoxKeyResponse>(
    //     '/exchangeboxkey',
    //     { t: type },
    //     { auth: true }
    //   );
    //   return response;
    // }
    // /**
    //  * 开启宝箱
    //  * @param type 宝箱类型 (使用BoxType枚举)
    //  */
    // async openBox(type: BoxType): Promise<ApiMsg<OpenBoxResponse>> {
    //   const response = await this.http.post<OpenBoxResponse>(
    //     '/openbox',
    //     { t: type },
    //     { auth: true }
    //   );
    //   return response;
    // }
    /**
     * 绑定钱包
     *
     * @param addr 钱包地址
     * @returns 返回连接钱包的响应结果
     */
    ApiService.prototype.bindWallet = function (addr) {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post('/bindwallet', {
                            addr: addr
                        }, { auth: true })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 解绑钱包
     *
     * @returns 解绑操作的响应数据
     */
    ApiService.prototype.unbindWallet = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post('/unbindingwallet', {}, { auth: true })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // /**
    //  * 领取卡每日奖励
    //  * @param type 卡类型 1周卡2月卡3年卡
    //  */
    // async carddaily(type: CardType): Promise<ApiMsg<GetCardDailyResponse>> {
    //   const response = await this.http.post<GetCardDailyResponse>(
    //     '/carddaily',
    //     { t: type },
    //     { auth: true }
    //   );
    //   if (response.status == 200 && response.response?.success) {
    //     Global.ins.receive_day = response.response.data.receive_day;
    //     Global.ins.setUserData(response.response.data.userdata);
    //   }
    //   return response;
    // }
    /**
     * 创建支付订单
     * @param skuid 商品SKU ID
     * @returns 支付订单信息
     */
    ApiService.prototype.purchaseCreate = function (skuid) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var params, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            skuid: skuid
                        };
                        if (window === null || window === void 0 ? void 0 : window.playdeckIsOpen) {
                            params["payment_from"] = "playdeck";
                        }
                        return [4 /*yield*/, this.http.post('/purchasecreate', { skuid: skuid }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('订单创建成功:', response.response.data.order);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 确认支付成功
     * @param id 订单数据库ID
     * @param orderId 订单字符串ID
     * @returns 更新后的订单信息及用户数据
     */
    ApiService.prototype.purchaseDone = function (id, orderId) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/purchasedone', {
                            id: id,
                            order_id: orderId
                        }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        console.log('支付确认', response);
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            // 如果需要更新本地用户数据可在此处理
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 获取任务列表
     * @returns 任务数据数组
     */
    ApiService.prototype.getTaskList = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/tasklist', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('任务列表获取成功:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 领取任务奖励
     * @param tid 任务ID
     * @returns 更新后的用户数据
     */
    ApiService.prototype.claimTaskReward = function (tid) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/gettaskreward', { tid: tid }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('任务奖励领取成功:', response.response.data.userdata);
                            // 可在此处添加用户数据更新逻辑
                            Global_1.Global.ins.setUserData(response.response.data.userdata, false);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      * 获取邀请信息
      * @returns 包含邀请数据和奖励配置的响应
      */
    ApiService.prototype.getInviteInfo = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getinviteinfo', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('邀请信息获取成功:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 领取邀请奖励
     * @param rewardId 奖励配置ID
     * @returns 更新后的用户数据
     */
    ApiService.prototype.claimInviteReward = function (rewardId) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getinvitereward', { tid: rewardId }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('邀请奖励领取成功:', response.response.data.userdata);
                            Global_1.Global.ins.setUserData(response.response.data.userdata);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 获取邀请玩家列表
     * @param pageNo 页码（从0开始）
     * @param pageSize 每页数量
     */
    ApiService.prototype.getInviteList = function (pageNo, pageSize) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getinvitelist', { pageNo: pageNo, pageSize: pageSize }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('邀请列表获取成功:', response.response.data.list);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 上报分享行为获取奖励
     * @returns 包含获得的游戏币和用户数据
     */
    ApiService.prototype.reportShare = function (gid) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/aftershare', { gid: gid }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('分享成功:', response);
                            // Global.ins.setUserData(response.response.data.userdata);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    * 获取排行榜数据
    * @param rankType 排行榜类型（使用RankType枚举）
    * @param pageNo 页码（从0开始）
    * @param pageSize 每页数量
    * @returns 包含排行榜列表和用户个人排名数据
    */
    ApiService.prototype.getRankList = function (
    // rankType: RankType,
    pageNo, pageSize) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/rank', {
                            // rank_type: rankType,
                            pageNo: pageNo,
                            pageSize: pageSize
                        }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            // console.log(`获取${RankType[rankType]}榜成功`, response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 上报任务完成情况（订阅/加群/投票）
     * @param notifyType 通知类型 subscribe/addgroup/vote/12(使用底部三个道具)/13(使用复活) 字符串
     */
    ApiService.prototype.reportTaskNotify = function (notifyType) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var ticket, gid, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        switch (notifyType) {
                            case TaskNotifyType.Subscribe:
                            case TaskNotifyType.AddGroup:
                            case TaskNotifyType.Vote:
                                break;
                            default:
                                // gid = GlobalData.cur_lvl
                                ticket = Global_1.Global.ins.ticket;
                                if (!ticket) {
                                    // Global.ins.ticket = ticket = await this.getTicket(GlobalData.cur_lvl);
                                }
                                break;
                        }
                        return [4 /*yield*/, this.http.post('/tasknotify', {
                                open_id: (_a = Global_1.Global.ins.user) === null || _a === void 0 ? void 0 : _a.openid,
                                type: String(notifyType),
                                ticket: ticket,
                                gid: gid,
                            }, { auth: false } // 不需要认证
                            )];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      * 购买道具
      * @param propId 道具ID
      * @returns 支付订单信息
      */
    ApiService.prototype.buyProp = function (propId, stage) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var params, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            prop_id: propId,
                            stage: stage
                        };
                        if (window === null || window === void 0 ? void 0 : window.playdeckIsOpen) {
                            params["payment_from"] = "playdeck";
                        }
                        return [4 /*yield*/, this.http.post('/buyprop', params, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('道具订单创建成功:', response.response.data.order);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      * 购买道具
      * @param propId 道具ID
      * @returns 支付订单信息
      */
    ApiService.prototype.mallbuyProp = function (propId, num) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var params, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            prop_id: propId,
                            num: num
                        };
                        if (window === null || window === void 0 ? void 0 : window.playdeckIsOpen) {
                            params["payment_from"] = "playdeck";
                        }
                        return [4 /*yield*/, this.http.post('/mallbuyprop', params, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('商城道具订单创建成功:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    * 购买道具操作流程封装
    *
    * @param successCallback 成功回调
    * @param propId 道具ID
    * @param stage 关卡
    */
    // async buyPropOperation(successCallback: Function, propId: PropType, num: number) {
    //   const buyResult = await this.mallbuyProp(propId, num);
    //   if (buyResult.status != 200 || !buyResult.response?.success) {
    //     UIManager.ins.showToast(t("tips.orderCreateFailed"));
    //     return;
    //   }
    //   if (CC_DEBUG) {
    //     let oid = buyResult.response.data.order.oid;
    //     await ApiService.ins.getPurchasedone(oid);
    //     successCallback();
    //     ApiService.ins.getUserProplist();
    //     UIManager.ins.showToast(t("tips.purchaseSuccess"));
    //     return;
    //   }
    //   try {
    //     let rsp = buyResult.response;
    //     let url = rsp.data.order.link;
    //     await new Promise((resolve) => {
    //       Global.ins.payment(rsp.data.order, async (status) => {
    //         console.log(`tg star pay status :${status}`);
    //         const checkFun = async (count: number) => {
    //           const m = await ApiService.ins.checkOrder(rsp.data.order.oid);
    //           if (m.status === 200 && m.response?.success) {
    //             UIManager.ins.showToast(t("tips.purchaseSuccess"));
    //             successCallback();
    //             ApiService.ins.getUserProplist();
    //             resolve(true);
    //           } else {
    //             if (--count > 0) {
    //               console.log('checkOrder again', count);
    //               await new Promise(resolve => setTimeout(resolve, 2000));
    //               await checkFun(count);
    //             }
    //             else {
    //               ApiService.ins.showError(m);
    //             }
    //             resolve(false);
    //           }
    //         }
    //         if (status === "paid") {
    //           // 4. 确认订单支付状态
    //           //这里处理检查订单，请求checkorder
    //           await checkFun(5);
    //         }
    //         else {
    //           console.log("tg star pay status :" + status);
    //           resolve(false);
    //         }
    //       })
    //     });
    //   } catch (error) {
    //     console.log('handlePropOperation error', error);
    //     UIManager.ins.showToast(t("tips.paymentPending"));
    //   }
    // }
    /**
     * 获取玩家身上的道具列表
     * @param propId 道具ID
     */
    // async getUserProplist(): Promise<ApiMsg<GetUserproplist>> {
    //   const response = await this.http.post<GetUserproplist>(
    //     '/getuserproplist',
    //     {}, // 空请求体
    //     { auth: true }
    //   );
    //   if (response.response?.success) {
    //     Global.ins.proplist = response.response.data.props;
    //     Global.ins.getUserProplist();
    //     EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_PROPLIST);
    //     console.log('获取玩家身上的道具列表:', response.response.data);
    //   }
    //   return response;
    // }
    /**
    * 获取玩家身上的道具列表
    * @param order_id 支付订单信息
    * @returns
    */
    ApiService.prototype.getPurchasedone = function (order_id) {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post('/purchasedone', { order_id: order_id }, // 空请求体
                        { auth: true })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // /**
    //  * 确认道具购买成功
    //  * @param orderId 订单ID
    //  */
    // async confirmPropPurchase(orderId: string): Promise<ApiMsg<{ success: boolean }>> {
    //   const response = await this.http.post<{ success: boolean }>(
    //     '/buypropdone',
    //     { order_id: orderId },
    //     { auth: true }
    //   );
    //   if (response.response?.success) {
    //     console.log('道具购买确认成功');
    //   }
    //   return response;
    // }
    /**
     * 能否使用道具
     * @param propId 道具ID
     */
    // async getUserprop(propId: PropType = PropType.SkipStage): Promise<boolean> {
    //   const payload: any = { prop_id: propId };
    //   const response = await this.http.post<UsePropResponse>(
    //     '/getuserprop',
    //     payload,
    //     { auth: true }
    //   );
    //   if (response.status == 200 && response.response?.success) {
    //     console.log('道具可以使用');
    //     return true;
    //   }
    //   console.log('道具不可以使用');
    //   return false;
    // }
    /**
     * 使用道具
     * @param propId 道具ID
     * @param stage 目标关卡（可选）
     */
    // async useProp(propId: PropType, stage?: number): Promise<ApiMsg<UsePropResponse>> {
    //   const payload: any = { prop_id: propId, stage };
    //   const response = await this.http.post<UsePropResponse>(
    //     '/useprop',
    //     payload,
    //     { auth: true }
    //   );
    //   if (response.response?.success) {
    //     console.log('道具使用成功');
    //   }
    //   return response;
    // }
    /**
    * 道具操作流程封装
    *
    * @param successCallback 成功回调
    * @param propId 道具ID
    * @param stage 关卡
    */
    // async handlePropOperation(successCallback: Function, propId: PropType, stage?: number) {
    //   try {
    //     // 1. 尝试使用道具
    //     const canUse = await this.getUserprop(propId);
    //     if (canUse) {
    //       const useResult = await this.useProp(propId, stage);
    //       if (useResult.status == 200 && useResult.response?.success) {
    //         successCallback();
    //         UIManager.ins.showToast(t("tips.propsuccess"));
    //         return;
    //       }
    //     }
    //     // 2. 使用失败时弹出确认窗口
    //     UIManager.ins.showWindowTips({
    //       /** 确认按钮回调 */
    //       yes_cb: async () => {
    //         // 3. 创建购买订单
    //         const buyResult = await this.buyProp(propId, stage);
    //         if (buyResult.status != 200 || !buyResult.response?.success) {
    //           UIManager.ins.showToast(t("tips.orderCreateFailed"));
    //           return;
    //         }
    //         try {
    //           let rsp = buyResult.response;
    //           let url = rsp.data.order.link;
    //           await new Promise((resolve) => {
    //             Global.ins.payment(rsp.data.order, async (status) => {
    //               console.log(`tg star pay status :${status}`);
    //               const checkFun = async (count: number) => {
    //                 const m = await ApiService.ins.checkOrder(rsp.data.order.oid);
    //                 if (m.status === 200 && m.response?.success) {
    //                   UIManager.ins.showToast(t("tips.purchaseSuccess"));
    //                   // 5. 尝试使用道具
    //                   const useResult = await this.useProp(propId, stage);
    //                   if (useResult.status == 200 && useResult.response?.success) {
    //                     successCallback();
    //                   }
    //                   else {
    //                     EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_USER);
    //                     ApiService.ins.showError(useResult);
    //                   }
    //                   resolve(true);
    //                   // this.home_action.updataPage();
    //                 }
    //                 else {
    //                   // PopMgr.ins.popLayer.showLabelTips(m.message);
    //                   if (--count > 0) {
    //                     console.log('checkOrder again', count);
    //                     await new Promise(resolve => setTimeout(resolve, 2000));
    //                     await checkFun(count);
    //                   }
    //                   else {
    //                     ApiService.ins.showError(m);
    //                   }
    //                   resolve(false);
    //                 }
    //               }
    //               if (status === "paid") {
    //                 // 4. 确认订单支付状态
    //                 //这里处理检查订单，请求checkorder
    //                 await checkFun(5);
    //               }
    //               else {
    //                 // await checkFun(5);
    //                 console.log("tg star pay status :" + status);
    //                 resolve(false);
    //               }
    //             })
    //           });
    //         } catch (error) {
    //           console.log('handlePropOperation error', error);
    //           UIManager.ins.showToast(t("tips.paymentPending"));
    //         }
    //       },
    //       yes_text: t("tips.confirm"),
    //       no_text: t("tips.cancel"),
    //       tips: t("tips.insufficientPropsConfirm")
    //     });
    //   } catch (error) {
    //     console.error("道具操作流程异常:", error);
    //     UIManager.ins.showToast(t("tips.networkError"));
    //   }
    // }
    /**
     * 检查订单支付状态
     * @param orderId 订单ID (创建订单时返回的order.oid)
     * @returns 订单是否支付成功
     */
    ApiService.prototype.checkOrder = function (orderId) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/checkorder', { order_id: orderId }, { auth: true } // 需要认证
                        )];
                    case 1:
                        response = _b.sent();
                        if (response.status >= 400 || !((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            console.error('订单状态检查失败:', response);
                            // UIManager.ins.showToast(t('tips.orderCheckFailed'));
                        }
                        else {
                            console.log('订单状态检查成功:', response);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 注册活动（领取奖励）
     * @returns 活动是否注册成功
     */
    ApiService.prototype.regActivity = function () {
        var _a, _b;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.http.post('/regactivity', {}, // 空请求体
                        { auth: true } // 需要认证
                        )];
                    case 1:
                        response = _c.sent();
                        if (response.status >= 400 || !((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            console.warn('没有注册奖励:', response);
                            // PopMgr.ins.popLayer.showLabelTips(i18n.t('tips.activityRegistrationFailed'));
                        }
                        else {
                            console.log('注册奖励领取成功:', response);
                        }
                        return [2 /*return*/, (_b = response.response) === null || _b === void 0 ? void 0 : _b.success];
                }
            });
        });
    };
    /**
     * 加入频道
     */
    // joinChannel() {
    //   if (CC_DEBUG) {
    //     console.log("joinChannel");
    //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
    //     return;
    //   }
    //   let url = "https://t.me/GemJamChannel";
    //   Global.ins.openTelegramLink(url);
    // }
    /**
     * 加入群组
     */
    // joinGroup() {
    //   if (CC_DEBUG) {
    //     console.log("joinGroup");
    //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
    //     return;
    //   }
    //   let url = "https://t.me/GemJamOffcialCommunity";
    //   Global.ins.openTelegramLink(url);
    // }
    /**
     * 去投票
     */
    // async toVote() {
    //   if (CC_DEBUG) {
    //     console.log("toVote");
    //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
    //     return;
    //   }
    //   await ApiService.ins.reportTaskNotify(TaskNotifyType.Vote);
    //   let url = "https://t.me/tapps_bot/center?startapp=app_gemjam";
    //   Global.ins.openTelegramLink(url);
    // }
    /**
    * 分享游戏
    */
    // async shareGame(_gid?: number): Promise<ApiMsg<ShareRewardResponse>> {
    //   const response = await ApiService.ins.reportShare(_gid);
    //   if (CC_DEBUG) {
    //     console.log("shareGame");
    //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
    //   } else {
    //     let shareText = '🚙 You’re no hero.\nYou’re a thief—on your first mission.\nNo weapons. Just speed and brains.\n💎 Get in. Grab the loot. Get out alive.\nBut this is just the beginning…';
    //     const encodedText = encodeURIComponent(shareText);
    //     let url = "https://t.me/share/url?url=https://t.me/GemJam_bot/gemjam?startapp=" + Global.ins.user.id + '&text=' + encodedText;
    //     Global.ins.openTelegramLink(url);
    //   }
    //   return response;
    // }
    /**
    * 分享游戏到X
     */
    // async shareGame_X(_gid?: number): Promise<ApiMsg<ShareRewardResponse>> {
    //   const response = await ApiService.ins.reportShare(_gid);
    //   if (CC_DEBUG) {
    //     console.log("shareGame");
    //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
    //   }
    //   else {
    //     // 分离文本和URL，分别编码
    //     const rawText = t('tips.shareMessage');
    //     const appUrl = `https://t.me/GemJam_bot/gemjam?startapp=${Global.ins.user.id}`;
    //     // 使用Twitter官方推荐的参数格式：text + url
    //     const encodedText = encodeURIComponent(rawText);
    //     const encodedUrl = encodeURIComponent(appUrl);
    //     // 构造标准Twitter分享链接
    //     const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    //     console.log(twitterIntentUrl);
    //     Global.ins.openLink(twitterIntentUrl)
    //   }
    //   return response;
    // }
    /**
    * 获取免费金币
    * @returns 包含本次获取金币数和用户数据的响应
    */
    ApiService.prototype.getFreeGameCoin = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/caidan', {}, // 空请求体
                        { auth: true } // 需要token认证
                        )];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            // 更新全局用户数据
                            // Global.ins.setUserData(response.response.data.userdata);
                            console.log('获取免费金币成功:', response.response.data.gotcoin);
                        }
                        else {
                            console.error('获取免费金币失败:', response);
                            // 显示错误提示
                            // PopMgr.ins.popLayer.showLabelTips(i18n.t('tips.getFreeCoinFailed'));
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 获取Telegram头像
     * @param iconUrl Telegram头像URL
     * @returns 包含base64编码的图片数据
     */
    ApiService.prototype.getTelegramAvatar = function (iconUrl) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getAvatar', { iconurl: iconUrl }, { auth: false, repeatMode: 'queue' } // 不需要认证
                        )];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            // console.log('头像获取成功:', response.response);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
   * 获取错误信息
   *
   * @param code 错误响应，可以是字符串或ErrorMsg对象
   * @returns 返回对应的错误提示信息，如果未找到则返回"未知错误"
   */
    ApiService.prototype.getErrorMessage = function (response, defaultMsg) {
        if (defaultMsg === void 0) { defaultMsg = LanguageData_1.t('tips.networkError'); }
        if (!response || response.code == undefined) {
            return defaultMsg;
        }
        var key = ErrorMsg[response === null || response === void 0 ? void 0 : response.code];
        var msg = LanguageData_1.t('tips.' + key);
        if (msg) {
            return msg;
        }
        return defaultMsg;
    };
    /**
     * 显示错误信息
     *
     * @param response 错误响应，可以是字符串或ErrorMsg对象
     */
    ApiService.prototype.showError = function (response) {
        var msg = this.getErrorMessage(response === null || response === void 0 ? void 0 : response.response);
        AssistCtr_1.AssistCtr.showToastTip(msg);
    };
    /**
     * 检查今日免广告状态
     * @returns 包含免广告次数的响应数据
     */
    ApiService.prototype.isAdFree = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/adfree', {}, { auth: true } // 需要token认证
                        )];
                    case 1:
                        response = _b.sent();
                        if (response.status === 200 && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            console.log('免广告状态:', response.response.data.today_ad_free);
                            return [2 /*return*/, response.response.data.today_ad_free];
                        }
                        else {
                            console.log('获取免广告状态失败:', response);
                            return [2 /*return*/, 0];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * 获取用户挖矿信息
    * @returns 挖矿信息响应
    */
    ApiService.prototype.getMineInfo = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getmineinfo', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('获取挖矿信息成功:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 领取挖矿奖励
     * @param addr 钱包地址
     * @returns 奖励领取结果
     */
    ApiService.prototype.getMineReward = function (addr) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getminereward', { addr: addr }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('领取挖矿奖励成功:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
   * 在挖矿内点击看广告的时候上报
   * @returns 上报结果
   */
    ApiService.prototype.reportMineVideo = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/reportminevideo', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('广告点击上报成功');
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    * 执行挖矿操作
    * @returns 挖矿结果
    */
    ApiService.prototype.mining = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/mining', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('挖矿成功:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
   * 设置挖矿翻倍
   * @param type 翻倍类型
   * @returns 翻倍操作结果
   */
    ApiService.prototype.minerewarddouble = function (type) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/minerewarddouble', { t: type }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if (response.status === 200 && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            console.log('挖矿翻倍设置成功:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    * 获取挖矿邀请列表
    * @returns 包含挖矿邀请列表的响应
    */
    ApiService.prototype.getmineinvitelist = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getmineinvitelist', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if (response.status === 200 && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            console.log('挖矿邀请列表获取成功:', response.response.data.list);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    * 获取代理广告配置
    * @param inviter 当前玩家的邀请者ID
    * @returns 代理广告配置列表
    */
    ApiService.prototype.getAgentAdConfig = function (inviter) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!inviter) {
                            return [2 /*return*/, { status: 400, message: '', response: null }];
                        }
                        return [4 /*yield*/, this.http.post('/agentadconfig', { inviter: inviter }, { auth: false } // 不需要认证
                            )];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('代理广告配置获取成功:', response.response.data);
                        }
                        else {
                            console.warn('获取代理广告配置失败:', response);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    * 获取邮件列表
    * @param pageNo 页码（从0开始）
    * @param pageSize 每页数据数量
    * @returns 邮件列表数据
    */
    ApiService.prototype.getMailList = function (pageNo, pageSize) {
        var _a;
        if (pageNo === void 0) { pageNo = 0; }
        if (pageSize === void 0) { pageSize = 15; }
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getmail', { pageNo: pageNo, pageSize: pageSize }, { auth: true } // 需要认证
                        )];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('邮件列表获取成功:', response.response.data);
                        }
                        else {
                            console.warn('邮件列表获取失败:', response);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    * 阅读/领取邮件
    * @param mailId 邮件ID
    * @param state 操作类型：1=阅读邮件，2=领取奖励，4=删除邮件
    * @returns 操作结果（领取奖励时包含用户数据）
    */
    // async readMail(mailId: number, state: number): Promise<ApiMsg<ReadMailResponse>> {
    //   const response = await this.http.post<ReadMailResponse>(
    //     '/readmail',
    //     { mail_id: mailId, state },
    //     { auth: true } // 需要认证
    //   );
    //   if (response.status === 200 && response.response?.success) {
    //     console.log('邮件操作成功:', response.response);
    //     // 如果领取奖励成功，更新本地用户数据
    //     if (state === 2 && response.response.data?.userdata) {
    //       Global.ins.setUserData(response.response.data.userdata);
    //       EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_MAIL);
    //     }
    //   } else {
    //     console.warn('邮件操作失败:', response);
    //   }
    //   return response;
    // }
    /**
    * 获取换量任务列表
    * @returns 换量任务列表
    */
    ApiService.prototype.getExchangeTaskList = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getexchangetasklist', {}, // 空请求体
                        { auth: true } // 需要认证
                        )];
                    case 1:
                        response = _b.sent();
                        if (response.status === 200 && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            console.log('换量任务列表获取成功:', response.response.data);
                        }
                        else {
                            console.warn('换量任务列表获取失败:', response);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 通知完成换量任务
     * @param tid 任务ID
     * @returns 操作结果
     */
    ApiService.prototype.completeExchangeTask = function (tid) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/completeexchangetask', { tid: tid }, { auth: true } // 需要认证
                        )];
                    case 1:
                        response = _b.sent();
                        if (response.status === 200 && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            console.log("\u4EFB\u52A1 " + tid + " \u5B8C\u6210\u4E0A\u62A5\u6210\u529F");
                        }
                        else {
                            console.warn("\u4EFB\u52A1 " + tid + " \u5B8C\u6210\u4E0A\u62A5\u5931\u8D25:", response);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 领取换量任务奖励
     * @param tid 任务ID
     * @returns 更新后的用户数据
     */
    ApiService.prototype.getExchangeTaskReward = function (tid) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getexchangetaskreward', { tid: tid }, { auth: true } // 需要认证
                        )];
                    case 1:
                        response = _b.sent();
                        if (response.status === 200 && ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success)) {
                            console.log("\u4EFB\u52A1 " + tid + " \u5956\u52B1\u9886\u53D6\u6210\u529F");
                            // 更新全局用户数据
                            Global_1.Global.ins.setUserData(response.response.data.userdata);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // ===================================卡包================================
    /**
   * 获取游戏配置信息
   *
   * @returns 返回获取的配置信息
   */
    ApiService.prototype.getCardPackConfigs = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getcardpackconfig', null, { auth: false })];
                    case 1:
                        response = _a.sent();
                        if (response.status >= 400) {
                            return [2 /*return*/, null];
                        }
                        Global_1.Global.ins.cardPackConfig = response.response.data;
                        console.log('getcardpackconfig  getcardpackconfig:', Global_1.Global.ins.cardPackConfig);
                        return [2 /*return*/, response.response];
                }
            });
        });
    };
    /**
      *   // 获取系列列表
      * @returns 获取系列列表结果
      */
    ApiService.prototype.seriesList = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getserieslist', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('获取系列列表结果:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      *  获取系列详情 带token，{"series_id": 1}
      * @returns 获取系列详情结果
      */
    ApiService.prototype.seriesDetail = function (series_id) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getseriesdetail', { series_id: series_id }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('获取系列详情结果:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     *   // 获取碎片数量
     * @returns 获取碎片数量结果
     */
    ApiService.prototype.cardDebris = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getcarddebris', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('获取碎片结果:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    *   // 获取收藏的系列
    * @returns 获取收藏的系列结果
    */
    ApiService.prototype.collectedSeries = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getcollectedseries', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('获取收藏的系列结果:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    *   // 获取收藏的卡牌
    * @returns 获取收藏的卡牌结果  /getcollectedcards  带token，{"pageNo": 0, "pageSize": 15}   // 获取收藏的卡牌
    */
    ApiService.prototype.collectedCards = function (pageNo, pageSize) {
        var _a;
        if (pageNo === void 0) { pageNo = 0; }
        if (pageSize === void 0) { pageSize = 15; }
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getcollectedcards', { pageNo: pageNo, pageSize: pageSize }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('获取收藏的卡牌结果:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      *   // 获取拥有卡包的列表
      * @returns 获取拥有卡包的列表结果  /getownedpackslist  带token就行  // 获取拥有卡包的列表
      */
    ApiService.prototype.ownedPacksList = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/getownedpackslist', {}, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('获取拥有卡包的列表结果:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      *  开包
      *  pack_id
      *  count
      * @returns 开包结果
      */
    ApiService.prototype.openCardPacks = function (pack_id, count) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/opencardpacks', { pack_id: pack_id, count: count }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('开包列表结果:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      * 收藏
      * 传{"card_id": 卡片id}// 收藏卡牌 ，传{"series_id": 系列id}  // 收藏系列
      * isSeries:number 1=系列 0=卡片
      * @returns 收藏结果
      */
    ApiService.prototype.cardCollect = function (isSeries, id) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        response = null;
                        if (!(isSeries == 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.http.post('/cardpack/collect', { series_id: id }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.http.post('/cardpack/collect', { card_id: id }, { auth: true })];
                    case 3:
                        response = _b.sent();
                        _b.label = 4;
                    case 4:
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('收藏结果:', response.response.success);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      * 取消收藏
      * 传{"card_id": 卡片id}// 取消收藏卡牌 ，传{"series_id": 系列id} // 取消收藏系列
      * @returns 取消收藏结果
      */
    ApiService.prototype.cardUnCollect = function (isSeries, id) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        response = null;
                        if (!(isSeries == 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.http.post('/cardpack/uncollect', { series_id: id }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.http.post('/cardpack/uncollect', { card_id: id }, { auth: true })];
                    case 3:
                        response = _b.sent();
                        _b.label = 4;
                    case 4:
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('取消收藏结果:', response.response.success);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 分解卡牌
     *  {"card_id": 卡牌id,"count": 数量}  // 分解卡牌
     * @returns 分解结果
     */
    ApiService.prototype.cardDecompose = function (card_id, count) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/cardpack/decompose', { card_id: card_id, count: count }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('分解卡牌结果:', response.response.success);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
      * 合成卡片
      *  {"card_id": 卡片id}
      * @returns 合成结果
      */
    ApiService.prototype.cardCompose = function (card_id) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/cardpack/compose', { card_id: card_id }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('合成结果:', response.response.success);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    * 出售卡牌
    * {"card_id": 卡牌id,"count": 数量}        // 出售卡牌
    * @returns 分解结果
    */
    ApiService.prototype.sellCard = function (card_id, count) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/cardpack/sell', { card_id: card_id, count: count }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('出售卡牌结果:', response.response.success);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
    * 领取系列奖励
    * {"series_id": 系列id} //领取系列奖励
    * @returns 领取系列奖励结果
    */
    ApiService.prototype.getReward = function (series_id) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.post('/cardpack/getreward', { series_id: series_id }, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('领取系列奖励结果:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * 购买卡包
     * @param skuid 卡包id
     * @param num 购买数量
     * @param order_type 订单类型，3=购买卡包
     * @param pay_type 支付类型，"usd"或"game_coin"
     * @param payment_from 来源，"或"playdeck"或"azen"或"azen-app"
     * @returns 支付订单信息
     */
    ApiService.prototype.buyCardPacks = function (skuid, num, order_type, pay_type, payment_from) {
        var _a;
        if (order_type === void 0) { order_type = 3; }
        return __awaiter(this, void 0, Promise, function () {
            var params, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            skuid: skuid,
                            num: num,
                            order_type: order_type,
                            pay_type: pay_type,
                            payment_from: "" // ""或"playdeck"或"azen"或"azen-app"
                        };
                        if (window === null || window === void 0 ? void 0 : window.playdeckIsOpen) {
                            params["payment_from"] = "playdeck";
                        }
                        return [4 /*yield*/, this.http.post('/buycardpacks', params, { auth: true })];
                    case 1:
                        response = _b.sent();
                        if ((_a = response.response) === null || _a === void 0 ? void 0 : _a.success) {
                            console.log('商城卡包道具订单创建成功:', response.response.data);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // private baseUrl: string = 'https://screwit.vazhenina.com/api';
    // private baseUrl: string = 'http://192.168.2.25:3559';
    // private baseUrl: string = 'https://car.vazhenina.com/api';
    ApiService.TEST = false;
    return ApiService;
}());
exports.ApiService = ApiService;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0Z1xcQXBpU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBZ0Q7QUFFaEQseURBQTZDO0FBQzdDLG1DQUFrQztBQUNsQywyQ0FBc0M7QUFDdEMseUNBQXdDO0FBQ3hDLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQWluQ25DLFlBQVk7QUFDWixJQUFZLFNBaURYO0FBakRELFdBQVksU0FBUztJQUNuQix5Q0FBUSxDQUFBO0lBRVIsYUFBYTtJQUNiLCtEQUFlLENBQUE7SUFDZixZQUFZO0lBQ1osMkRBQWEsQ0FBQTtJQUNiLGdCQUFnQjtJQUNoQixpRUFBZ0IsQ0FBQTtJQUNoQixhQUFhO0lBQ2IsK0RBQWUsQ0FBQTtJQUNmLFlBQVk7SUFDWixtRUFBaUIsQ0FBQTtJQUNqQixrQkFBa0I7SUFDbEIsaUVBQWdCLENBQUE7SUFDaEIsYUFBYTtJQUNiLHFFQUFrQixDQUFBO0lBQ2xCLFlBQVk7SUFDWixtRUFBaUIsQ0FBQTtJQUNqQixZQUFZO0lBQ1osdUVBQW1CLENBQUE7SUFDbkIsV0FBVztJQUNYLDhFQUFzQixDQUFBO0lBQ3RCLGtCQUFrQjtJQUNsQixzRUFBa0IsQ0FBQTtJQUNsQixhQUFhO0lBQ2Isc0VBQWtCLENBQUE7SUFDbEIsV0FBVztJQUNYLGtFQUFnQixDQUFBO0lBQ2hCLFlBQVk7SUFDWixrRUFBZ0IsQ0FBQTtJQUNoQixhQUFhO0lBQ2IsMEVBQW9CLENBQUE7SUFDcEIsWUFBWTtJQUNaLDREQUFhLENBQUE7SUFDYixhQUFhO0lBQ2IsMEVBQW9CLENBQUE7SUFDcEIsWUFBWTtJQUNaLGtFQUFnQixDQUFBO0lBQ2hCLGFBQWE7SUFDYixvRUFBaUIsQ0FBQTtJQUNqQixhQUFhO0lBQ2Isa0VBQWdCLENBQUE7SUFDaEIsYUFBYTtJQUNiLHdFQUFtQixDQUFBO0lB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QUMsR0FBRyxVQUFVLENBQUE7eUJBQ3BDO3dCQUNnQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDbkMsZUFBZSxFQUNmLE1BQU0sRUFDTixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FDZixFQUFBOzt3QkFKSyxRQUFRLEdBQUcsU0FJaEI7d0JBRUQsVUFBSSxRQUFRLENBQUMsUUFBUSwwQ0FBRSxPQUFPLEVBQUU7NEJBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ3REO3dCQUNELHNCQUFPLFFBQVEsRUFBQzs7OztLQUNqQjtJQXZnREQsaUVBQWlFO0lBQ2pFLHdEQUF3RDtJQUN4RCw2REFBNkQ7SUFFN0MsZUFBSSxHQUFHLEtBQUssQ0FBQztJQXlrRC9CLGlCQUFDO0NBL2tERCxBQStrREMsSUFBQTtBQS9rRFksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9kYXRhL3VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XHJcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gXCIuL0dsb2JhbFwiO1xyXG5pbXBvcnQgSHR0cENsaWVudCBmcm9tIFwiLi9IdHRwQ2xpZW50XCI7XHJcbmltcG9ydCB7IFdhbGxldE1nciB9IGZyb20gXCIuL1dhbGxldE1nclwiO1xyXG5jb25zdCBUZWxlZ3JhbSA9IHdpbmRvd1tcIlRlbGVncmFtXCJdXHJcblxyXG5cclxuLy8jcmVnaW9uIOaOpeWPo+WumuS5iVxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgLyoqXHJcbiAgICog5o6l5Y+j5ZON5bqU5pWw5o2u57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEFwaVJlc3BvbnNlIHtcclxuICAgIC8qKiDplJnor6/noIEgKi9cclxuICAgIGNvZGU/OiBudW1iZXI7XHJcbiAgICAvKiog6L+U5Zue5pWw5o2uICovXHJcbiAgICBkYXRhPzogYW55O1xyXG4gICAgLyoqIOmUmeivr+S/oeaBryAqL1xyXG4gICAgbWVzc2FnZT86IHN0cmluZztcclxuICAgIC8qKiDmmK/lkKbmiJDlip8gKi9cclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnmbvlvZXmjqXlj6Plk43lupTmlbDmja7nu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgTG9naW5SZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEpXVOS7pOeJjOWtl+espuS4slxyXG4gICAgICAgKi9cclxuICAgICAgand0OiBzdHJpbmc7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICog55So5oi36LSm5oi35L+h5oGvXHJcbiAgICAgICAqL1xyXG4gICAgICB1c2VyOiBVc2VyO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIOeUqOaIt+a4uOaIj+aVsOaNrlxyXG4gICAgICAgKi9cclxuICAgICAgdXNlcmRhdGE6IFVzZXJEYXRhO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIOetvuWIsOWkqeaVsFxyXG4gICAgICAgKi9cclxuICAgICAgcmVjZWl2ZV9kYXk6IG51bWJlcjtcclxuICAgIH07XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqIOi/lOWbnueUqOaIt+aVsOaNriAqL1xyXG4gIGludGVyZmFjZSBVc2VyRGF0YVJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgY29kZT86IG51bWJlcjtcclxuICAgIGRhdGE6IHtcclxuICAgICAgdXNlcmRhdGE6IFVzZXJEYXRhO1xyXG4gICAgfTtcclxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog55So5oi35Z+656GA5L+h5oGvXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFVzZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjmiLfmlbDmja7lupNJRFxyXG4gICAgICovXHJcbiAgICBpZDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bmz5Y+w5pa555So5oi3SURcclxuICAgICAqL1xyXG4gICAgb3BlbmlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgoDor7dcclxuICAgICAqL1xyXG4gICAgaW52aXRlcjogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65pe26Ze0KElTT+agvOW8jylcclxuICAgICAqL1xyXG4gICAgY3JlYXRldDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyA5ZCO55m75b2V5pe26Ze0KElTT+agvOW8jylcclxuICAgICAqL1xyXG4gICAgbGFzdF9sb2dpbjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZKx5YyF5Zyw5Z2AXHJcbiAgICAgKi9cclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUqOaIt+WQjVxyXG4gICAgICovXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpLTlg49VUkxcclxuICAgICAqL1xyXG4gICAgYXZhdGFyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr4bnoIHljaDkvY3nrKYo5a6e6ZmF5bqU5Li65Yqg5a+G5YC8KVxyXG4gICAgICovXHJcbiAgICBwYXNzd29yZDogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiB855So5oi35Zyw5Yy6LOagvOW8jzrlm73lrrZ855yBfOW4gnzljLp85pyN5Yqh5Zmo5pyN5Yqh5ZWGfCzkvovlrZA66Z+p5Zu9fDB86aaW5bCUfOmmluWwlHzkuprpqazpgIp8XHJcbiAgICAgKi9cclxuICAgIGxhc3RyZWdpb246IHN0cmluZztcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bmuLjmiI/phY3nva7mjqXlj6Plk43lupTmlbDmja7nu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgR2FtZUNvbmZpZ1Jlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YToge1xyXG4gICAgICBjZmc6IEdhbWVDb25maWdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmuLjmiI/phY3nva7mlbDmja5cclxuICAgKi9cclxuICBpbnRlcmZhY2UgR2FtZUNvbmZpZyB7XHJcbiAgICAvKipcclxuICAgICAqIOeuseWtkOmFjee9rlxyXG4gICAgICovXHJcbiAgICBCb3hDb25maWdzOiB7IFtrZXk6IHN0cmluZ106IEJveERhdGEgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmueUqOmFjee9rlxyXG4gICAgICovXHJcbiAgICBDb25maWc6IGNvbmZpZ0RhdGE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDllYblk4FTS1VcclxuICAgICAqL1xyXG4gICAgU2t1czogeyBba2V5OiBzdHJpbmddOiBTa3VEYXRhIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6XluLjku7vliqHphY3nva5cclxuICAgICAqL1xyXG4gICAgRGFpbHlDZmc6IENmZ0RhdGFbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW+queOr+S7u+WKoemFjee9rlxyXG4gICAgICovXHJcbiAgICBMb29wQ2ZnOiBDZmdEYXRhW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgZPlhbfphY3nva5cclxuICAgICAqL1xyXG4gICAgUHJvcENmZzogcHJvcENmZ0RhdGFbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlkajljaHlpZblirHphY3nva5cclxuICAgICAgKi9cclxuICAgIENhcmRzUmV3YXJkQ2ZnOiB7XHJcbiAgICAgIDE6IGNhcmRzUmV3YXJkQ2ZnRGF0YVtdXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o6S6KGM5qac6YWN572uXHJcbiAgICAgKi9cclxuICAgIFJhbmtSZXdhcmRDZmc6IHJhbmtDZmdEYXRhW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICog5o6S6KGM5qac5aWW5Yqx6YWN572u5pWw5o2uXHJcbiAgICAqL1xyXG4gIGludGVyZmFjZSByYW5rQ2ZnRGF0YSB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmjpLooYzmppzntKLlvJVcclxuICAgICAqL1xyXG4gICAgcmFua2lkeDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmjpLooYznsbvlnosgMeieuuS4neamnCAy5YWz5Y2h5qacIDPpgoDor7fmppxcclxuICAgICAqL1xyXG4gICAgcmFua190eXBlOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIOWlluWKseexu+WeiyAx6J665LidIDLnrrHlrZAgM+mSpeWMmSA06YGT5YW3XHJcbiAgICAgKi9cclxuICAgIHJld2FyZF90eXBlOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIOeuseWtkOaIlumSpeWMmeaIlumBk+WFt2lkXHJcbiAgICAgKi9cclxuICAgIHJld2FyZGlkOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIOWlluWKseaVsOmHj1xyXG4gICAgICovXHJcbiAgICByZXdhcmRudW06IG51bWJlcjtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog5ZGo5Y2h5aWW5Yqx6YWN572u5pWw5o2uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIGNhcmRzUmV3YXJkQ2ZnRGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIOaXpeacn0lEXHJcbiAgICAgKi9cclxuICAgIGlkOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpZblirHnsbvlnosgMeieuuS4nSAy566x5a2QIDPpkqXljJlcclxuICAgICAqL1xyXG4gICAgcmV3YXJkX3R5cGU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWlluWKseaVsOmHj1xyXG4gICAgICovXHJcbiAgICByZXdhcmRfbnVtOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpZblirFJRFxyXG4gICAgICovXHJcbiAgICByZXdhcmRfaWQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXtumXtOaIs1xyXG4gICAgICovXHJcbiAgICB0OiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICBpbnRlcmZhY2UgQ2ZnRGF0YSB7XHJcbiAgICBpZDogbnVtYmVyXHJcbiAgICByZXdhcmRfaWQ6IG51bWJlclxyXG4gICAgcmV3YXJkX251bTogbnVtYmVyXHJcbiAgICByZXdhcmRfdHlwZTogbnVtYmVyXHJcbiAgICBzb3J0OiBudW1iZXJcclxuICAgIHQ6IG51bWJlclxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YGT5YW36YWN572u5pWw5o2uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIHByb3BDZmdEYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICog6YGT5YW3SURcclxuICAgICAqL1xyXG4gICAgaWQ6IG51bWJlcixcclxuICAgIC8qKlxyXG4gICAgICog6YGT5YW355qE5o+P6L+w5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIGRlc2M6IHN0cmluZ1xyXG4gICAgLyoqXHJcbiAgICAgKiDpgZPlhbfnmoTku7fmoLwg5Y2V5L2N5Li6576O5YiGIOi9rOaYn+aYn+etieS6jjpNYXRoLmZsb29yKHByaWNlIC8gMTAwIC8gMC40OTUgKiAyNSlcclxuICAgICAqL1xyXG4gICAgcHJpY2U6IG51bWJlcixcclxuICAgIC8qKlxyXG4gICAgICog6YGT5YW355qE6L+H5pyf5pe26Ze0XHJcbiAgICAgKi9cclxuICAgIGV4cGlyZTogbnVtYmVyXHJcbiAgICAvKipcclxuICAgICog6YGT5YW355qE5Zu+5qCHXHJcbiAgICAqL1xyXG4gICAgaW1nOiBzdHJpbmcsXHJcblxyXG4gIH1cclxuXHJcbiAgLyoqIOi/lOWbnuaPkOeOsOaVsOaNriAqL1xyXG4gIGludGVyZmFjZSBTdWJtaXRXaXRoZHJhd1Jlc3BvbnNlIGV4dGVuZHMgVXNlckRhdGFSZXNwb25zZSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnrrHlrZDmlbDmja5cclxuICAgKi9cclxuICBpbnRlcmZhY2UgQm94RGF0YSB7XHJcbiAgICBpZDogbnVtYmVyLFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgc2NyZXduZWVkOiBudW1iZXIsXHJcbiAgICBtaW50b246IG51bWJlcixcclxuICAgIG1heHRvbjogbnVtYmVyLFxyXG4gICAgbGV2ZWw6IG51bWJlcixcclxuICAgIG1pbnRvbl9zaG93OiBudW1iZXIsXHJcbiAgICBtYXh0b25fc2hvdzogbnVtYmVyXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpgJrnlKjphY3nva7mlbDmja5cclxuICAgKi9cclxuICBpbnRlcmZhY2UgY29uZmlnRGF0YSB7XHJcbiAgICBpZDogbnVtYmVyLFxyXG4gICAgbWlud2l0aGRyYXc6IG51bWJlcixcclxuICAgIHBhc3N2YWxpZGF0ZTogbnVtYmVyLFxyXG4gICAgZGFpbHljb2luOiBudW1iZXIsXHJcbiAgICBkYWlseWJveDE6IG51bWJlcixcclxuICAgIGRhaWx5Ym94MjogbnVtYmVyLFxyXG4gICAgZGFpbHlib3gzOiBudW1iZXIsXHJcbiAgICBkYWlseWdhbWVjb2luOiBudW1iZXIsXHJcbiAgICBmcmVlX2dhbWVjb2luX21pbjogbnVtYmVyLFxyXG4gICAgZnJlZV9nYW1lY29pbl9tYXg6IG51bWJlcixcclxuICAgIGRhaWx5c2hhcmVfZ2FtZWNvaW46IG51bWJlcixcclxuICAgIGRhaWx5aW52aXRlX2tleTE6IG51bWJlcixcclxuICAgIGRhaWx5aW52aXRlX2tleTI6IG51bWJlcixcclxuICAgIGRhaWx5aW52aXRlX2tleTM6IG51bWJlclxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZWG5ZOBU0tV6YWN572u5pWw5o2uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFNrdURhdGEge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIHQ6IG51bWJlcjtcclxuICAgIHByaWNlOiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkZXNjOiBzdHJpbmc7XHJcbiAgICBwcmljZXN0YXI6IG51bWJlcjtcclxuICAgIHF1ZXVlOiBudW1iZXI7XHJcbiAgICBkYWlseW1pbjogbnVtYmVyO1xyXG4gICAgZGFpbHltYXg6IG51bWJlcjtcclxuICAgIGNhdGFsb2c6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOS7u+WKoeaVsOaNrlxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBDZmdEYXRhIHtcclxuICAgIC8qKiDlvIDlp4vlhbPljaEgKi9cclxuICAgIGJlZ2lubG9vcDogbnVtYmVyLFxyXG4gICAgLyoqIOe7k+adn+WFs+WNoSAqL1xyXG4gICAgZW5kbG9vcDogbnVtYmVyLFxyXG4gICAgLyoqIOWlluWKsSBb57G75Z6LLOaVsOmHjyzmpoLnjoddICovXHJcbiAgICBwcml6ZV9wcm9iOiBudW1iZXJbXVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5YWz5Y2hdGlja2V06L+U5Zue5pWw5o2uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFRpY2tldFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgY29kZT86IG51bWJlcjtcclxuICAgIGRhdGE6IHtcclxuICAgICAgdGlja2V0OiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWFs+WNoeWlluWKsei/lOWbnuaVsOaNrlxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBMdlByaXplUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBjb2RlPzogbnVtYmVyO1xyXG4gICAgZGF0YTogTHZQcml6ZURhdGE7XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5YWz5Y2h5aWW5Yqx5pWw5o2uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEx2UHJpemVEYXRhIHtcclxuICAgIC8qKiDljaHljIXphY3nva7kv6Hmga8gKi9cclxuICAgIGNhcmRwYWNrPzogQ2FyZFBhY2tDb25maWdJbmZvO1xyXG4gICAgLyoqIOavj+aXpeWlluWKsSAqL1xyXG4gICAgZGFpbHlQcml6ZUluZm86IFByaXplSW5mb1tdO1xyXG4gICAgLyoqIOW+queOr+WlluWKsSAqL1xyXG4gICAgbG9vcFByaXplSW5mbzogUHJpemVJbmZvW107XHJcbiAgICAvKiog55So5oi35pWw5o2uICovXHJcbiAgICB1c2VyZGF0YTogVXNlckRhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlpZblirHkv6Hmga/mlbDmja5cclxuICAgKi9cclxuICBpbnRlcmZhY2UgUHJpemVJbmZvIHtcclxuICAgIFRwOiBudW1iZXI7XHJcbiAgICBBbXQ6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKiDlhZHmjaLpkqXljJnlk43lupTnsbvlnosgKi9cclxuICBpbnRlcmZhY2UgRXhjaGFuZ2VCb3hLZXlSZXNwb25zZSBleHRlbmRzIFVzZXJEYXRhUmVzcG9uc2Uge1xyXG4gIH1cclxuXHJcbiAgLyoqIOW8gOWuneeuseWTjeW6lOexu+WeiyAqL1xyXG4gIGludGVyZmFjZSBPcGVuQm94UmVzcG9uc2UgZXh0ZW5kcyBVc2VyRGF0YVJlc3BvbnNlIHtcclxuICB9XHJcblxyXG4gIC8qKiDpooblj5blkajljaHmr4/ml6XlpZblirHlk43lupTnsbvlnosgKi9cclxuICBpbnRlcmZhY2UgR2V0Q2FyZERhaWx5UmVzcG9uc2UgZXh0ZW5kcyBVc2VyRGF0YVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgdXNlcmRhdGE6IFVzZXJEYXRhLFxyXG4gICAgICByZXdhcmRzOiBSZXdhcmREYXRhW10sXHJcblxyXG4gICAgICAvKipcclxuICAgICAgICog562+5Yiw5aSp5pWwXHJcbiAgICAgICAqL1xyXG4gICAgICByZWNlaXZlX2RheTogbnVtYmVyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5aWW5Yqx5pWw5o2u57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFJld2FyZERhdGEge1xyXG4gICAgLyoqIOiuouWNleaVsOaNruW6k2lkICovXHJcbiAgICBpZDogbnVtYmVyLFxyXG4gICAgLyoqIOWNoeexu+WeiyAqL1xyXG4gICAgdDogbnVtYmVyLFxyXG4gICAgLyoqIOWlluWKseexu+WeiyAx6J665LidIDLnrrHlrZAgM+mSpeWMmSAqL1xyXG4gICAgcmV3YXJkX3R5cGU6IG51bWJlcixcclxuICAgIC8qKiDlpZblirFpZCDnrrHlrZBpZOaIluiAhemSpeWMmWlkICovXHJcbiAgICByZXdhcmRfaWQ6IG51bWJlcixcclxuICAgIC8qKiDlpZblirHmlbDph48gKi9cclxuICAgIHJld2FyZF9udW06IG51bWJlcixcclxuICAgIC8qKiDpooblj5bnmoTmmK/lsZ7kuo7nrKzlh6DlpKnnmoTlpZblirEgKi9cclxuICAgIHNvcnQ6IG51bWJlclxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOWIm+W7uuaUr+S7mOiuouWNleWTjeW6lOaVsOaNrue7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBQdXJjaGFzZUNyZWF0ZVJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgY29kZT86IG51bWJlcjtcclxuICAgIGRhdGE6IHtcclxuICAgICAgb3JkZXI6IFBheW1lbnRPcmRlcjtcclxuICAgIH07XHJcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaUr+S7mOiuouWNleaVsOaNrue7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBQYXltZW50T3JkZXIge1xyXG4gICAgLyoqIOiuouWNleaVsOaNruW6k2lkICovXHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgLyoqIOeUqOaIt2lkICovXHJcbiAgICB1aWQ6IG51bWJlcjtcclxuICAgIC8qKiDorqLljZVpZCAqL1xyXG4gICAgb2lkOiBzdHJpbmc7XHJcbiAgICAvKiog6K6i5Y2V6KGM5Li6MS3otK3ljaEyLeWFtuS7liAqL1xyXG4gICAgb2I6IG51bWJlcjtcclxuICAgIC8qKiDorqLljZXmlbDmja4oc2t1aWQpICovXHJcbiAgICBvcDogc3RyaW5nO1xyXG4gICAgLyoqIOiuouWNleeKtuaAgTEt5bey5Y+R6LW35b6F5YWF5YC8Mi3lt7LlrozmiJAzLeW3suWksei0peWcqGAgKi9cclxuICAgIG9zOiBudW1iZXI7XHJcbiAgICAvKiog6K6i5Y2V5pSv5LuY6ZO+5o6lKHRnc3RhcikgKi9cclxuICAgIGxpbms6IHN0cmluZztcclxuICAgIC8qKiDorqLljZXmlK/ku5jml7bpl7QgKi9cclxuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZztcclxuXHJcbiAgICB1c2Q6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaUr+S7mOaIkOWKn+ehruiupOWTjeW6lOaVsOaNrue7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBQdXJjaGFzZURvbmVSZXNwb25zZSBleHRlbmRzIFVzZXJEYXRhUmVzcG9uc2Uge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Lu75Yqh5pWw5o2u5o6l5Y+jXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFRhc2tEYXRhIHtcclxuICAgIC8qKiDku7vliqFpZCAqL1xyXG4gICAgaWQ6IG51bWJlcjtcclxuXHJcbiAgICAvKiog566A5L2T5Lu75Yqh5o+P6L+wICovXHJcbiAgICBkZXNjOiBzdHJpbmc7XHJcbiAgICAvKiog6Zi/5ouJ5Lyv6K+t5o+P6L+wICovXHJcbiAgICBkZXNjX2FyOiBzdHJpbmc7XHJcbiAgICAvKiog6Iux6K+t5o+P6L+wICovXHJcbiAgICBkZXNjX2VuOiBzdHJpbmc7XHJcbiAgICAvKiog5Y2w5bC86K+t5o+P6L+wICovXHJcbiAgICBkZXNjX2lkOiBzdHJpbmc7XHJcbiAgICAvKiog5L+E6K+t5o+P6L+wICovXHJcbiAgICBkZXNjX3J1OiBzdHJpbmc7XHJcbiAgICAvKiog5rOw6K+t5o+P6L+wICovXHJcbiAgICBkZXNjX3RoOiBzdHJpbmc7XHJcbiAgICAvKiog57mB5L2T5o+P6L+wICovXHJcbiAgICBkZXNjX3poaGFudDogc3RyaW5nO1xyXG5cclxuICAgIC8qKiDliIbmoI/nsbvlnosgMeavj+aXpeS7u+WKoSAy56S+5Yy65Lu75YqhICovXHJcbiAgICBjb2x1bW5fdHlwZTogbnVtYmVyO1xyXG4gICAgLyoqIOS7u+WKoeexu+WeiyAx5q+P5pel5Lu75YqhIDLkuIDmrKHmgKfku7vliqEgKi9cclxuICAgIHRhc2tfdHlwZTogbnVtYmVyO1xyXG4gICAgLyoqIOWlluWKseexu+WeiyAgMeieuuS4nSAy566x5a2QIDPpkqXljJkgKi9cclxuICAgIHJld2FyZF90eXBlOiBudW1iZXI7XHJcbiAgICAvKiog5aWW5YqxaWQg5aaC5p6ccmV3YXJkX3R5cGU9MuaIljMs6KGo56S6566x5a2QaWTlkozpkqXljJlpZCAqL1xyXG4gICAgcmV3YXJkaWQ6IG51bWJlcjtcclxuICAgIC8qKiDlpZblirHmlbDph48gKi9cclxuICAgIHJld2FyZG51bTogbnVtYmVyO1xyXG4gICAgLyoqIOS7u+WKoemcgOaxguexu+WeiyAgKi9cclxuICAgIHRhc2tfcmVxdWlyZV90eXBlOiBudW1iZXI7XHJcbiAgICAvKiog5Lu75Yqh6ZyA5rGC5qyh5pWwICovXHJcbiAgICB0YXNrX3JlcXVpcmU6IG51bWJlcjtcclxuICAgIC8qKiDku7vliqHov5vluqYgKi9cclxuICAgIHRhc2tfcHJvZ3Jlc3M6IG51bWJlcjtcclxuICAgIC8qKiDmmK/lkKblj6/pooblj5YgMeWPr+mihuWPliAw5LiN5Y+v6aKG5Y+WICovXHJcbiAgICBjYW5fcmVjZWl2ZTogbnVtYmVyO1xyXG4gICAgLyoqIOWbvuaghyAqL1xyXG4gICAgaWNvbjogc3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Lu75Yqh5YiX6KGo5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFRhc2tMaXN0UmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBjb2RlPzogbnVtYmVyO1xyXG4gICAgZGF0YTogVGFza0RhdGFbXTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpooblj5bku7vliqHlpZblirHlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgVGFza1Jld2FyZFJlc3BvbnNlIGV4dGVuZHMgVXNlckRhdGFSZXNwb25zZSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpgoDor7flpZblirHphY3nva5cclxuICAgKi9cclxuICBpbnRlcmZhY2UgSW52aXRlUmV3YXJkIHtcclxuXHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgLyoqIOWlluWKseexu+WeiyAgMeieuuS4nSAy566x5a2QIDPpkqXljJkgKi9cclxuICAgIHJld2FyZF90eXBlOiBudW1iZXI7XHJcbiAgICAvKiog5aWW5YqxaWQg5aaC5p6ccmV3YXJkX3R5cGU9MuaIljMs6KGo56S6566x5a2QaWTlkozpkqXljJlpZCAqL1xyXG4gICAgcmV3YXJkaWQ6IG51bWJlcjtcclxuICAgIC8qKiDlpZblirHmlbDph48gKi9cclxuICAgIHJld2FyZG51bTogbnVtYmVyO1xyXG4gICAgLyoqIOmcgOimgemCgOivt+eahOaVsOmHjyAqL1xyXG4gICAgcmVxdWlyZV91c2VyczogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YKA6K+35L+h5oGv5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEludml0ZUluZm9SZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGNvZGU/OiBudW1iZXI7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIC8qKiDlt7LpgoDor7fkurrmlbAgKi9cclxuICAgICAgaW52aXRlY250OiBudW1iZXI7XHJcbiAgICAgIC8qKiDlt7Lpooblj5blpZblirHnmoRpZCAqL1xyXG4gICAgICByZXdhcmRlZDogbnVtYmVyW107XHJcbiAgICAgIC8qKiDlpZblirHliJfooaggKi9cclxuICAgICAgcmV3YXJkczogSW52aXRlUmV3YXJkW107XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmihuWPlumCgOivt+WlluWKseWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBJbnZpdGVSZXdhcmRSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgLyoqIOW3sumihuWPluWlluWKseeahGlkICovXHJcbiAgICAgIGlkOiBudW1iZXI7XHJcbiAgICAgIHJld2FyZGVkOiBudW1iZXJbXTtcclxuICAgICAgLyoqIOiOt+W+l+eahOWlluWKseaVsOaNriBb5aWW5Yqx57G75Z6LLOeuseWtkOaIluiAhemSpeWMmWlkLOaVsOmHj10g57G75Z6L77yaMeieuuS4nSAy5a6d566xIDPpkqXljJkgNOmBk+WFtyAqL1xyXG4gICAgICByZXdhcmRzOiBudW1iZXJbXTtcclxuICAgICAgdXNlcmRhdGE6IFVzZXJEYXRhO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpgoDor7fnjqnlrrbliJfooajpoblcclxuICAgKi9cclxuICBpbnRlcmZhY2UgSW52aXRlUGxheWVyIGV4dGVuZHMgVXNlciB7XHJcbiAgICAvKiog6YKA6K+35pe26Ze0ICovXHJcbiAgICBjcmVhdGV0OiBzdHJpbmc7XHJcbiAgICAvKiog6YKA6K+35Lq6SUQgKi9cclxuICAgIGludml0ZXI6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmCgOivt+WIl+ihqOWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBJbnZpdGVMaXN0UmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGxpc3Q6IEludml0ZVBsYXllcltdO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOWIhuS6q+WlluWKseWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBTaGFyZVJld2FyZFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YToge1xyXG4gICAgICBnb3Rjb2luOiBudW1iZXI7XHJcbiAgICAgIC8vIHVzZXJkYXRhOiBVc2VyRGF0YTtcclxuICAgIH07XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5aS05YOP5pWw5o2u5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEF2YXRhclJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YToge1xyXG4gICAgICBkYXRhOiBzdHJpbmc7XHJcbiAgICAgIHR5cGU6ICdzdmcnIHwgJ3BuZyc7XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaOkuihjOamnOadoeebruaVsOaNrlxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBSYW5rSXRlbSB7XHJcbiAgICAvKiogICovXHJcbiAgICB1aWQ/OiBudW1iZXI7XHJcbiAgICAvKiog5aS05YOPICovXHJcbiAgICBhdmF0YXI/OiBzdHJpbmc7XHJcbiAgICAvKiog5pi156ewICovXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAvKiogICovXHJcbiAgICBvcGVuaWQ/OiBzdHJpbmc7XHJcbiAgICAvKiog5YiG5pWwICovXHJcbiAgICBzY29yZTogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5o6S6KGM5qac5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFJhbmtSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgLyoqIOaOkuihjOamnOWIl+ihqCAqL1xyXG4gICAgICBsaXN0OiBSYW5rSXRlbVtdO1xyXG4gICAgICAvKiog55So5oi36Ieq5bex55qE5o6S5ZCNICovXHJcbiAgICAgIG15cmFuazogbnVtYmVyO1xyXG4gICAgICAvKiog55So5oi36Ieq5bex55qE5YiG5pWwICovXHJcbiAgICAgIG15c2NvcmU6IG51bWJlcjtcclxuICAgIH07XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5o6S6KGM5qac5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgVGFza25vdGlmeVJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YT86IHtcclxuICAgICAgLyoqIHR5cGU9MTIo5L2/55So5bqV6YOo5LiJ5Liq6YGT5YW3KS8xMyjkvb/nlKjlpI3mtLsp5oiQ5Yqf5pe26I635b6X55qEYXplbuW4geaVsOmHjyAqL1xyXG4gICAgICBhemVuOiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDotK3kubDpgZPlhbflk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgQnV5UHJvcFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YToge1xyXG4gICAgICBvcmRlcjogUGF5bWVudE9yZGVyO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDkvb/nlKjpgZPlhbflk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgVXNlUHJvcFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICog6LSt5Lmw6YGT5YW35ZON5bqU57uT5p6EXHJcbiAqL1xyXG4gIGludGVyZmFjZSBHZXRVc2VycHJvcGxpc3QgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICAvLyBkYXRhOiBbe1xyXG4gICAgLy8gICBcInByb3BfaWRcIjogbnVtYmVyO1xyXG4gICAgLy8gICBcIm51bVwiOiBudW1iZXI7XHJcbiAgICAvLyB9XTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmo4Dmn6XorqLljZXnirbmgIHlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgQ2hlY2tPcmRlclJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOazqOWGjOa0u+WKqOWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBSZWdBY3Rpdml0eVJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWFjei0uemHkeW4geWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBGcmVlR2FtZUNvaW5SZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGNvZGU/OiBudW1iZXI7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIC8qKiDmnKzmrKHojrflj5bnmoTph5HluIHmlbDph48gKi9cclxuICAgICAgZ290Y29pbjogbnVtYmVyO1xyXG4gICAgICAvKiog55So5oi35pWw5o2uICovXHJcbiAgICAgIHVzZXJkYXRhOiBVc2VyRGF0YTtcclxuICAgIH07XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oyW55+/5L+h5oGvXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIE1pbmluZ0luZm8ge1xyXG4gICAgLyoqIOeUqOaIt0lEICovXHJcbiAgICB1aWQ6IG51bWJlcjtcclxuICAgIC8qKiDlvZPliY3ov5vluqYgKi9cclxuICAgIHBvd2VyOiBudW1iZXI7XHJcbiAgICAvKiog5LiL5qyh5Y+v55yL5bm/5ZGK5pe26Ze0ICovXHJcbiAgICB0czogbnVtYmVyO1xyXG4gICAgLyoqIOaAu+i/m+W6piAqL1xyXG4gICAgbWF4X3Bvd2VyOiBudW1iZXI7XHJcbiAgICAvKiog5YWL6I635b6X55qE5aWW5YqxICovXHJcbiAgICByZXdhcmRfbnVtOiBudW1iZXI7XHJcbiAgICAvKiog5aWW5Yqx55qE5biB57G75Z6L77yMdG9u5oiWdXNkdCAqL1xyXG4gICAgY29pbl90eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIOW9k+WJjeaMluefv+WlluWKseWKoOWAjeeKtuaAgSAw5pegIDHmma7pgJogMui2hee6pyAqL1xyXG4gICAgZG91YmxlX3N0YXR1czogbnVtYmVyO1xyXG4gICAgLyoqIDDmnKrotoXnuqfliqDlgI0gMeW3suS9v+eUqOi2hee6p+WKoOWAjSAqL1xyXG4gICAgdG9kYXlfc3VwZXI6IG51bWJlcjtcclxuICAgIC8qKiDkuLox6KGo56S65b2T5YmN5Yqg5YCN54q25oCB5LuO5pmu6YCa5Y2H57qn5Yiw6LaF57qnICovXHJcbiAgICBhdXRvX3VwOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bmjJbnn7/kv6Hmga/lk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgTWluaW5nSW5mb1Jlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogTWluaW5nSW5mbztcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmjJbnn7/mk43kvZzlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgTWluaW5nUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBNaW5pbmdJbmZvO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmihuWPluaMluefv+WlluWKseWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBNaW5pbmdSZXdhcmRSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IE1pbmluZ0luZm87XHJcbiAgICByZXdhcmRudW06IG51bWJlcjtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorr7nva7mjJbnn7/nv7vlgI3lk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgTWluZVJld2FyZERvdWJsZVJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YToge1xyXG4gICAgICAvKiog57+75YCN57G75Z6LICovXHJcbiAgICAgIGRvdWJsZV9zdGF0dXM6IG51bWJlcjtcclxuICAgICAgLyoqIOS7iuaXpeaYr+WQpuW3sue7j+i2hee6p+WKoOWAjSAqL1xyXG4gICAgICB0b2RheV9zdXBlcjogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICAqIOaMluefv+mCgOivt+WIl+ihqOmhuVxyXG4gICAgICovXHJcbiAgaW50ZXJmYWNlIE1pbmVJbnZpdGVJdGVtIHtcclxuICAgIC8qKiDnlKjmiLdJRCAqL1xyXG4gICAgdWlkOiBudW1iZXI7XHJcbiAgICAvKiog5pi156ewICovXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAvKiog5aS05YOPICovXHJcbiAgICBhdmF0YXI6IHN0cmluZztcclxuICAgIC8qKiDmmK/lkKbpgJrov4flvJXlr7zlhbPljaEgKi9cclxuICAgIHBhc3NfZ3VpZGVfc3RhZ2U6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluaMluefv+mCgOivt+WIl+ihqOWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBNaW5lSW52aXRlTGlzdFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YToge1xyXG4gICAgICAvKiog6YKA6K+35YiX6KGoICovXHJcbiAgICAgIGxpc3Q6IE1pbmVJbnZpdGVJdGVtW107XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWFjeW5v+WRiueKtuaAgeWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBBZEZyZWVSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgLyoqIOS7iuaXpeWFjeW5v+WRiuasoeaVsCAqL1xyXG4gICAgICB0b2RheV9hZF9mcmVlOiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAqIOiOt+WPlua4uOaIj+mFjee9ruaOpeWPo+WTjeW6lOaVsOaNrue7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIENhcmRQYWNrQ29uZmlnUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBDYXJkUGFja0NvbmZpZ0luZm9bXVxyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog5Y2h5YyF57O75YiX5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQ2FyZExpc3RSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IENhcmRMaXN0SW5mb1tdO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiDljaHljIXlk43lupTnu5PmnoRcclxuICAqL1xyXG4gIGludGVyZmFjZSBDYXJkRGV0YWlsUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBDYXJkRGV0YWlsSW5mb1tdO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDljaHljIXnoo7niYflk43lupTnu5PmnoRcclxuICAgICovXHJcbiAgaW50ZXJmYWNlIENhcmREZWJyaXNSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IENhcmREZWJyaXNJbmZvW107XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiDojrflj5bmlLbol4/nmoTns7vliJflk43lupTnu5PmnoRcclxuICAqL1xyXG4gIGludGVyZmFjZSBDb2xsZWN0ZWRTZXJpZVJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogQ2FyZExpc3RJbmZvW107XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuICAvKipcclxuICAqIOiOt+WPluaUtuiXj+eahOWNoeeJh+WTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIENvbGxlY3RlZENhcmRzUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBDYXJkRGV0YWlsSW5mb1tdO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog6I635Y+W5oul5pyJ5Y2h5YyF55qE5YiX6KGo5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgT3duZWRQYWNrc0xpc3RSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IE93bmVkUGFja3NMaXN0SW5mb1tdO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiDojrflj5bmi6XmnInljaHljIXnmoTliJfooajlk43lupTnu5PmnoRcclxuICAqL1xyXG4gIGludGVyZmFjZSBPcGVuQ2FyZFBhY2tzUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBPcGVuQ2FyZFBhY2tzSW5mb1tdO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiDmlLbol4/ljaHlk43lupTnu5PmnoRcclxuICAqL1xyXG4gIGludGVyZmFjZSBDYXJkQ29sbGVjdFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog5Y+W5raI5pS26JeP5Y2h5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQ2FyZFVuQ29sbGVjdFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog5YiG6Kej5Y2h54mH5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQ2FyZERlY29tcG9zZVJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog5ZCI5oiQ5Y2h54mH5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQ2FyZENvbXBvc2VSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG4gIC8qKlxyXG4gICog5Ye65ZSu5Y2h54mH5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgU2VsbENhcmRSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG4gIC8qKlxyXG4gICog6aKG5Y+W57O75YiX5aWW5Yqx5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgR2V0UmV3YXJkUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBDYXJkUGFya1Jld2FyZEluZm9bXTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICog5Y2h5YyF6YWN572u5L+h5oGvXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIENhcmRQYWNrQ29uZmlnSW5mbyB7XHJcbiAgICAvKiogaWQgKi9cclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICAvKiog5Lu35qC8ICovXHJcbiAgICBwcmljZTogbnVtYmVyO1xyXG4gICAgLyoqIGljb24gKi9cclxuICAgIGljb246IHN0cmluZztcclxuICAgIC8qKiBpbWcgKi9cclxuICAgIGltZzogc3RyaW5nO1xyXG4gICAgLyoqIOWQjeWtlyAqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgLyoqIOS/oeaBryAqL1xyXG4gICAgaW5mbzogc3RyaW5nO1xyXG4gICAgLyoqIHB0ICovXHJcbiAgICBwdDogbnVtYmVyO1xyXG4gICAgLyoqIOWlluWKsSAqL1xyXG4gICAgcmV3YXJkczogc3RyaW5nO1xyXG4gICAgLyoqIOi1m+Wto2lkICovXHJcbiAgICBzZWFzb25faWQ6IG51bWJlcjtcclxuICAgIC8qKiB1c2QgKi9cclxuICAgIHVzZDogbnVtYmVyO1xyXG4gICAgLyoqIOW8gOWniyAqL1xyXG4gICAgc3RhcnRfdGltZTogc3RyaW5nO1xyXG4gICAgLyoqIOe7k+adn+aXtumXtCAqL1xyXG4gICAgZW5kX3RpbWU6IHN0cmluZztcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAqIOWNoeWMheezu+WIl+S/oeaBr1xyXG4gICovXHJcbiAgaW50ZXJmYWNlIENhcmRMaXN0SW5mbyB7XHJcbiAgICAvKiog57O75YiXaWQgKi9cclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICAvKiog5piv5ZCm5pS26JePICAwOuayoeaUtuiXjyAgMTrmlLbol48gKi9cclxuICAgIGlzX2NvbGxlY3RlZDogbnVtYmVyO1xyXG4gICAgLyoqIOWbvueJhyAqL1xyXG4gICAgaW1nOiBzdHJpbmc7XHJcbiAgICAvKiog57O75YiX5L+h5oGvICovXHJcbiAgICBpbmZvOiBzdHJpbmc7XHJcbiAgICAvKiog57O75YiX5ZCN56ewICovXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAvKiog5Y2h5YyFaWQgKi9cclxuICAgIHBhY2tpZDogbnVtYmVyO1xyXG4gICAgLyoqIOWIm+W7uuaXtumXtCAqL1xyXG4gICAgY3JlYXRlX3RpbWU6IHN0cmluZztcclxuICAgIC8qKiDpooblj5blpZblirEgMTrlj6/pooblj5YgIDA65LiN5Y+v6aKG5Y+WICAyOuW3sumihuWPliAqL1xyXG4gICAgZ2V0YWxsOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOWNoeivpue7huS/oeaBr1xyXG4gICovXHJcbiAgaW50ZXJmYWNlIENhcmREZXRhaWxJbmZvIHtcclxuICAgIC8qKiDns7vliJdpZCAqL1xyXG4gICAgc2VyaWVzX2lkOiBudW1iZXI7XHJcbiAgICAvKiog5Ye65ZSu5Lu35qC8ICovXHJcbiAgICBzZWxsX3ByaWNlOiBudW1iZXI7XHJcbiAgICAvKiogcmFyaXR5OjHmma7pgJog5L6d5qyh57G75o6oICovXHJcbiAgICByYXJpdHk6IG51bWJlcjtcclxuICAgIC8qKiBudW09MOWwseaYr+ayoeaLpeaciSAqL1xyXG4gICAgbnVtOiBudW1iZXI7XHJcbiAgICAvKiog5piv5ZCm5pS26JePICAwOuayoeaUtuiXjyAgMTrmlLbol48gKi9cclxuICAgIGlzX2NvbGxlY3RlZDogbnVtYmVyO1xyXG4gICAgLyoqIOezu+WIl+aYr+WQpuaUtuiXjyAgMDrmsqHmlLbol48gIDE65pS26JePICovXHJcbiAgICBpc19jb2xsZWN0ZWRfc2VyaWVzOiBudW1iZXI7XHJcbiAgICAvKiog5Zu+54mHICovXHJcbiAgICBpbWFnZV91cmw6IHN0cmluZztcclxuICAgIC8qKiDliIbop6PojrflvpcgIOWQiOaIkOaJgOmcgCDnoo7niYfmlbDph48gKi9cclxuICAgIGRlYnJpc19udW06IG51bWJlcjtcclxuICAgIC8qKiDljaHniYdpZCAqL1xyXG4gICAgY2FyZF9pZDogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiDljaHljIXns7vliJfkv6Hmga9cclxuICAqL1xyXG4gIGludGVyZmFjZSBDYXJkRGVicmlzSW5mbyB7XHJcbiAgICAvKiogaWQgKi9cclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICAvKiog55So5oi3dWlkICovXHJcbiAgICB1aWQ6IG51bWJlcjtcclxuICAgIC8qKiByYXJpdHk6MeaZrumAmiDkvp3mrKHnsbvmjqggKi9cclxuICAgIHJhcml0eTogbnVtYmVyO1xyXG4gICAgLyoqIOaVsOmHjyAqL1xyXG4gICAgbnVtOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICog5Y2h5YyF57O75YiX5L+h5oGvXHJcbiAqL1xyXG4gIGludGVyZmFjZSBDYXJkUGFya1Jld2FyZEluZm8ge1xyXG4gICAgLyoqIOWlluWKseexu+Wei++8jDHonrrkuJ3vvIwy5a6d566x77yMM+mSpeWMmSAqL1xyXG4gICAgMDogbnVtYmVyO1xyXG4gICAgLyoqIOWuneeuseaIlumSpeWMmWlkICAxOumdkumTnCAgMjrnmb3pk7YgIDM66buE6YeRICAqL1xyXG4gICAgMTogbnVtYmVyO1xyXG4gICAgLyoqIOaVsOmHjyAqL1xyXG4gICAgMjogbnVtYmVyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gKiDljaHljIXns7vliJfkv6Hmga9cclxuICovXHJcbiAgaW50ZXJmYWNlIE93bmVkUGFja3NMaXN0SW5mbyB7XHJcbiAgICAvKiogaWNvbiAqL1xyXG4gICAgaWNvbjogc3RyaW5nO1xyXG4gICAgLyoqIGltZyAqL1xyXG4gICAgaW1nOiBzdHJpbmc7XHJcbiAgICAvKiogaW5mbyovXHJcbiAgICBpbmZvOiBzdHJpbmc7XHJcbiAgICAvKiogbmFtZSovXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAvKiogbnVtICovXHJcbiAgICBudW06IG51bWJlcjtcclxuICAgIC8qKiDljIVpZCAqL1xyXG4gICAgcGFja2lkOiBudW1iZXI7XHJcbiAgICAvKiog6ZK755+z5Lu35qC8ICovXHJcbiAgICBwcmljZTogbnVtYmVyO1xyXG4gICAgLyoqIOi1m+Wto2lkICovXHJcbiAgICBzZWFzb25faWQ6IG51bWJlcjtcclxuICAgIC8qKiB1c2QgKi9cclxuICAgIHVzZDogbnVtYmVyO1xyXG4gIH1cclxuICAvKipcclxuICAqIOW8gOWNoeWMheezu+WIl+S/oeaBr1xyXG4gICovXHJcbiAgaW50ZXJmYWNlIE9wZW5DYXJkUGFja3NJbmZvIHtcclxuICAgIC8qKiDnoo7niYfmlbDph48gKi9cclxuICAgIGRlYnJpc19udW06IG51bWJlcjtcclxuICAgIC8qKiBpZCAqL1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIC8qKiBpbWFnZV91cmwqL1xyXG4gICAgaW1hZ2VfdXJsOiBzdHJpbmc7XHJcbiAgICAvKiogbmFtZSovXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAvKiogcmFyaXR5OjHmma7pgJog5L6d5qyh57G75o6oICovXHJcbiAgICByYXJpdHk6IG51bWJlcjtcclxuICAgIC8qKiDlh7rllK7ku7fmoLwgKi9cclxuICAgIHNlbGxfcHJpY2U6IG51bWJlcjtcclxuICAgIC8qKiDns7vliJdpZCAqL1xyXG4gICAgc2VyaWVzX2lkOiBudW1iZXI7XHJcbiAgICAvKiog6LWb5a2jaWQgKi9cclxuICAgIHNlYXNvbl9pZDogbnVtYmVyO1xyXG4gICAgLyoqIGNyZWF0ZV90aW1lICovXHJcbiAgICBjcmVhdGVfdGltZTogc3RyaW5nO1xyXG4gICAgLyoqIOadg+mHjSAqL1xyXG4gICAgd2VpZ2h0OiBudW1iZXI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiDku6PnkIbnmoTlub/lkYrphY3nva5cclxuICAqL1xyXG4gIGludGVyZmFjZSBBZ2VudEFkQ29uZmlnSXRlbSB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgYWRfdHlwZTogc3RyaW5nO1xyXG4gICAgYWRfaWQ6IHN0cmluZztcclxuICAgIGRhaWxpX2lkOiBudW1iZXI7XHJcbiAgICB3ZWlnaHQ6IG51bWJlcjtcclxuICAgIHN0YXRlOiBudW1iZXI7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICog6I635Y+W5Luj55CG55qE5bm/5ZGK6YWN572u5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQWdlbnRBZENvbmZpZ1Jlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogQWdlbnRBZENvbmZpZ0l0ZW1bXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog6YKu5Lu26aG55pWw5o2u57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgTWFpbEl0ZW0ge1xyXG4gICAgLyoqIOmCruS7tklEICovXHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgLyoqIOeUqOaIt0lEICovXHJcbiAgICB1aWQ6IG51bWJlcjtcclxuICAgIC8qKiDpgq7ku7bmoIfpopggKi9cclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAvKiog6YKu5Lu25YaF5a65ICovXHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICAvKiog5aWW5Yqx5pWw5o2u77yI5LqM57u05pWw57uE5a2X56ym5Liy77yJICovXHJcbiAgICByZXdhcmRzOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgLyoqIOWIm+W7uuaXtumXtCAqL1xyXG4gICAgY3JlYXRldDogc3RyaW5nO1xyXG4gICAgLyoqIOabtOaWsOaXtumXtCAqL1xyXG4gICAgdXBkYXRldDogc3RyaW5nO1xyXG4gICAgLyoqIOeKtuaAge+8mjDmnKror7sgMeW3suivu+acqumihuWPliAy5bey6K+75bey6aKG5Y+WIDTliKDpmaQgKi9cclxuICAgIHN0YXRlOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpgq7ku7bliJfooajlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgTWFpbExpc3RSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IE1haWxJdGVtW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpmIXor7vpgq7ku7blk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgUmVhZE1haWxSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE/OiB7XHJcbiAgICAgIC8qKiDmm7TmlrDlkI7nmoTnlKjmiLfmlbDmja7vvIjpooblj5blpZblirHml7bov5Tlm57vvIkgKi9cclxuICAgICAgdXNlcmRhdGE/OiBVc2VyRGF0YTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmjaLph4/ku7vliqHpobnmlbDmja7nu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgRXhjaGFuZ2VUYXNrSXRlbSBleHRlbmRzIFRhc2tEYXRhIHtcclxuICAgIC8qKiDot7Povazpk77mjqUgKi9cclxuICAgIGp1bXBfdXJsPzogc3RyaW5nO1xyXG5cclxuICAgIHVwZGF0ZXQ/OiBzdHJpbmc7XHJcbiAgICBjb21wbGV0ZT86IG51bWJlcjtcclxuICAgIG51bT86IG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaNoumHj+S7u+WKoeWIl+ihqOWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBFeGNoYW5nZVRhc2tMaXN0UmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBFeGNoYW5nZVRhc2tJdGVtW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpooblj5bmjaLph4/ku7vliqHlpZblirHlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgRXhjaGFuZ2VUYXNrUmV3YXJkUmVzcG9uc2UgZXh0ZW5kcyBVc2VyRGF0YVJlc3BvbnNlIHtcclxuICAgIC8vIOe7p+aJv+iHqiBVc2VyRGF0YVJlc3BvbnNl77yM5bey5YyF5ZCrIHVzZXJkYXRhXHJcbiAgfVxyXG59XHJcblxyXG4vLyNyZWdpb24g5p6a5Li+XHJcbmV4cG9ydCBlbnVtIEVycm9yQ29kZSB7XHJcbiAgaW90YSA9IDAsXHJcblxyXG4gIC8qKiDmlbDmja7op6PmnpDplJnor68gKi9cclxuICBFcnJvclBhcnNlRXJyb3IsXHJcbiAgLyoqIOaVsOaNruW6k+mUmeivryAqL1xyXG4gIEVycm9yU1FMRXJyb3IsXHJcbiAgLyoqIOmUmeivr+eahG9wZW5pZCAqL1xyXG4gIEVycm9yT3BlbmlkRXJyb3IsXHJcbiAgLyoqIOWIm+W7uueUqOaIt+Wksei0pSAqL1xyXG4gIEVycm9yQ3JlYXRlVXNlcixcclxuICAvKiog55So5oi35LiN5a2Y5ZyoICovXHJcbiAgRXJyb3JVc2VyTm90RXhpc3QsXHJcbiAgLyoqIOWIm+W7uuinkuiJsnRva2Vu5aSx6LSlICovXHJcbiAgRXJyb3JDcmVhdGVUb2tlbixcclxuICAvKiog562+5ZCN6aqM6K+B5aSx6LSlICovXHJcbiAgRXJyb3JWYWxpZGF0ZUVycm9yLFxyXG4gIC8qKiDnlKjmiLfmnKrnmbvlvZUgKi9cclxuICBFcnJvclVzZXJOb3RMb2dpbixcclxuICAvKiog6YWN572u5LiN5a2Y5ZyoICovXHJcbiAgRXJyb3JDb25maWdOb3RFeGlzdCxcclxuICAvKiog6LWE5rqQ5LiN6LazICovXHJcbiAgRXJyb3JSZXNvdXJjZU5vdEVub3VnaCxcclxuICAvKiog5pyA5L2OJS4yZuaJjeWPr+S7peaPkOeOsCAqL1xyXG4gIEVycm9yQ29pbk5vdEVub3VnaCxcclxuICAvKiog5ZGo5Y2h562J57qn5LiN6LazICovXHJcbiAgRXJyb3JSYW5rTm90RW5vdWdoLFxyXG4gIC8qKiDlsJrmnKrlrp7njrAgKi9cclxuICBFcnJvck5vdEltcGxldGVkLFxyXG4gIC8qKiDku4rml6Xlt7Lpooblj5YgKi9cclxuICBFcnJvckFscmVhZHlUYWtlLFxyXG4gIC8qKiDlt7Lnu4/otK3kubDor6XljaEgKi9cclxuICBFcnJvckFscmVhZHlIYXZlUmFuayxcclxuICAvKiog5pyq5om+5Yiw6K6w5b2VICovXHJcbiAgRXJyb3JOb3Rmb3VuZCxcclxuICAvKiog6K6i5Y2V54q25oCB6ZSZ6K+vICovXHJcbiAgRXJyb3JPcmRlclN0YXR1V3JvbmcsXHJcbiAgLyoqIOS7iuaXpeW3suWIhuS6qyAqL1xyXG4gIEVycm9yVG9kYXlTaGFyZWQsXHJcbiAgLyoqIOiOt+WPluWIl+ihqOWksei0pSAqL1xyXG4gIEVycm9yRHluYW1pY0Vycm9yLFxyXG4gIC8qKiDml6Dms5Xpooblj5blpZblirEgKi9cclxuICBFcnJvckNsYWltUmV3YXJkLFxyXG4gIC8qKiDkuI3og73ph43lpI3otK3kubAgKi9cclxuICBFcnJvclJlcGVhdFB1cmNoYXNlLFxyXG4gIC8qKiDkuI3og73kvb/nlKjpgZPlhbcgKi9cclxuICBFcnJvclVzZVByb3AsXHJcbiAgLyoqIOW5v+WRiuS4remAlOmAgOWHuiAqL1xyXG4gIEVycm9yQWRFeGl0c01pZHdheSxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRXJyb3JNc2cge1xyXG4gIC8qKiDkuI3mmL7npLrplJnor68gKi9cclxuICAvLyBudWxsID0gMCxcclxuICAvKiog5pWw5o2u6Kej5p6Q6ZSZ6K+vICovXHJcbiAgRXJyb3JQYXJzZUVycm9yU3RyID0gMSxcclxuICAvKiog5pWw5o2u5bqT6ZSZ6K+vICovXHJcbiAgRXJyb3JTUUxFcnJvclN0ciA9IDIsXHJcbiAgLyoqIOmUmeivr+eahG9wZW5pZCAqL1xyXG4gIEVycm9yT3BlbmlkRXJyb3JTdHIsXHJcbiAgLyoqIOWIm+W7uueUqOaIt+Wksei0pSAqL1xyXG4gIEVycm9yQ3JlYXRlVXNlclN0cixcclxuICAvKiog55So5oi35LiN5a2Y5ZyoICovXHJcbiAgRXJyb3JVc2VyTm90RXhpc3RTdHIsXHJcbiAgLyoqIOWIm+W7uuinkuiJsnRva2Vu5aSx6LSlICovXHJcbiAgRXJyb3JDcmVhdGVUb2tlblN0cixcclxuICAvKiog562+5ZCN6aqM6K+B5aSx6LSlICovXHJcbiAgRXJyb3JWYWxpZGF0ZUVycm9yU3RyLFxyXG4gIC8qKiDnlKjmiLfmnKrnmbvlvZUgKi9cclxuICBFcnJvclVzZXJOb3RMb2dpblN0cixcclxuICAvKiog6YWN572u5LiN5a2Y5ZyoICovXHJcbiAgRXJyb3JDb25maWdOb3RFeGlzdFN0cixcclxuICAvKiog6LWE5rqQ5LiN6LazICovXHJcbiAgRXJyb3JSZXNvdXJjZU5vdEVub3VnaFN0cixcclxuICAvKiog5pyA5L2OJS4yZuaJjeWPr+S7peaPkOeOsCAqL1xyXG4gIEVycm9yQ29pbk5vdEVub3VnaFN0cixcclxuICAvKiog5ZGo5Y2h562J57qn5LiN6LazICovXHJcbiAgRXJyb3JSYW5rTm90RW5vdWdoU3RyLFxyXG4gIC8qKiDlsJrmnKrlrp7njrAgKi9cclxuICBFcnJvck5vdEltcGxldGVkU3RyLFxyXG4gIC8qKiDku4rml6Xlt7Lpooblj5YgKi9cclxuICBFcnJvckFscmVhZHlUYWtlU3RyLFxyXG4gIC8qKiDlt7Lnu4/otK3kubDor6XljaEgKi9cclxuICBFcnJvckFscmVhZHlIYXZlUmFua1N0ciA9IDE1LFxyXG5cclxuICAvKiog5pyq5om+5Yiw6K6w5b2VICovXHJcbiAgRXJyb3JOb3Rmb3VuZFN0ciA9IDE2LFxyXG4gIC8qKiDorqLljZXnirbmgIHplJnor68gKi9cclxuICBFcnJvck9yZGVyU3RhdHVXcm9uZ1N0ciA9IDE3LFxyXG4gIC8qKiDku4rml6Xlt7LliIbkuqsgKi9cclxuICBFcnJvclRvZGF5U2hhcmVkU3RyID0gMTgsXHJcbiAgLyoqIOiOt+WPluWIl+ihqOWksei0pSAqL1xyXG4gIEVycm9yRHluYW1pY0Vycm9yLFxyXG5cclxuICAvKiog5peg5rOV6aKG5Y+W5aWW5YqxICovXHJcbiAgRXJyb3JDbGFpbVJld2FyZFN0ciA9IDIwLFxyXG4gIC8qKiDkuI3og73ph43lpI3otK3kubAgKi9cclxuICBFcnJvclJlcGVhdFB1cmNoYXNlU3RyID0gMjEsXHJcbiAgLyoqIOS4jeiDveS9v+eUqOmBk+WFtyAqL1xyXG4gIEVycm9yVXNlUHJvcFN0ciA9IDIyLFxyXG4gIC8qKiDlub/lkYrkuK3pgJTpgIDlh7ogKi9cclxuICBFcnJvckFkRXhpdHNNaWR3YXkgPSAyMyxcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDku7vliqHpgJrnn6XnsbvlnotcclxuICovXHJcbmV4cG9ydCBlbnVtIFRhc2tOb3RpZnlUeXBlIHtcclxuICAvKiog6K6i6ZiFICovXHJcbiAgU3Vic2NyaWJlID0gJ3N1YnNjcmliZScsXHJcbiAgLyoqIOWKoOe+pCAqL1xyXG4gIEFkZEdyb3VwID0gJ2FkZGdyb3VwJyxcclxuICAvKiog5oqV56WoICovXHJcbiAgVm90ZSA9ICd2b3RlJyxcclxuICAvKiog5L2/55So5bqV6YOo5LiJ5Liq6YGT5YW3ICovXHJcbiAgaXRlbSA9ICcxMicsXHJcbiAgLyoqIOS9v+eUqOWkjea0uyAqL1xyXG4gIHJldml2ZSA9ICcxMycsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENoYW5uZWxUeXBlIHtcclxuICB0b24gPSAndG9uJyxcclxuICBhemVuID0gJ2F6ZW4nLFxyXG59XHJcblxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuLy8jcmVnaW9uIEFQSVxyXG5cclxuLyoqXHJcbiAqIOS4muWKoUFQSeacjeWKoeexu++8jOWwgeijheWFt+S9k+S4muWKoeaOpeWPo1xyXG4gKiBAY2xhc3NcclxuICogQGV4YW1wbGVcclxuICogY29uc3QgYXBpID0gbmV3IEFwaVNlcnZpY2Uoe1xyXG4gKiAgIGJhc2VVcmw6ICdodHRwOi8vYXBpLmV4YW1wbGUuY29tJ1xyXG4gKiB9KTtcclxuICogXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZSB7XHJcblxyXG4gIC8vIHByaXZhdGUgYmFzZVVybDogc3RyaW5nID0gJ2h0dHBzOi8vc2NyZXdpdC52YXpoZW5pbmEuY29tL2FwaSc7XHJcbiAgLy8gcHJpdmF0ZSBiYXNlVXJsOiBzdHJpbmcgPSAnaHR0cDovLzE5Mi4xNjguMi4yNTozNTU5JztcclxuICAvLyBwcml2YXRlIGJhc2VVcmw6IHN0cmluZyA9ICdodHRwczovL2Nhci52YXpoZW5pbmEuY29tL2FwaSc7XHJcblxyXG4gIHN0YXRpYyByZWFkb25seSBURVNUID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBnZXQgYmFzZVVybCgpIHtcclxuICAgIGlmIChBcGlTZXJ2aWNlLlRFU1QpIHsgLy8g5rWL6K+VXHJcbiAgICAgIHJldHVybiAnaHR0cHM6Ly9jYXIudmF6aGVuaW5hLmNvbS90ZXN0YXBpJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdodHRwczovL2Nhci52YXpoZW5pbmEuY29tL2FwaSc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIVFRQ5a6i5oi356uv5a6e5L6LXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoe1xyXG4gICAgYmFzZVVybDogdGhpcy5iYXNlVXJsXHJcbiAgfSk7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9pbnM6IEFwaVNlcnZpY2U7XHJcbiAgc3RhdGljIGdldCBpbnMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2lucykge1xyXG4gICAgICB0aGlzLl9pbnMgPSBuZXcgQXBpU2VydmljZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2lucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaehOmAoOWHveaVsFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGJhc2VVcmwg5Z+656GAVVJMXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqIOaYr+WQpueZu+W9lSAqL1xyXG4gIGxvZ2luZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvKipcclxuICAgKiDnlKjmiLfnmbvlvZVcclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcGVuSWQg55So5oi3T3BlbklEXHJcbiAgICogQHBhcmFtIGluaXREYXRhIOWIneWni+WMluaVsOaNrlxyXG4gICAqIEBwYXJhbSBpaWQg6YKA6K+36ICF55qEdWlkICAgIFxyXG4gICAqIEByZXR1cm5zIOi/lOWbnuWMheWQq3Rva2Vu55qE5a+56LGhXHJcbiAgICovXHJcbiAgYXN5bmMgbG9naW4ob3BlbklkOiBzdHJpbmcsIGluaXREYXRhOiBzdHJpbmcsIGlpZD86IG51bWJlciwgbG9naW5UeXBlPzogc3RyaW5nKTogUHJvbWlzZTxMb2dpblJlc3BvbnNlPiB7XHJcbiAgICBvcGVuSWQgPSBTdHJpbmcob3BlbklkKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ2xvZ2luOicsIG9wZW5JZCwgaW5pdERhdGEpO1xyXG4gICAgaWYgKCFpaWQpIHtcclxuICAgICAgaWlkID0gMDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpaWQgPSBOdW1iZXIoaWlkKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8TG9naW5SZXNwb25zZT4oJy9sb2dpbnRnJywge1xyXG4gICAgICBvcGVuX2lkOiBvcGVuSWQsXHJcbiAgICAgIGlpZCxcclxuICAgICAgaW5pdF9kYXRhOiBpbml0RGF0YSxcclxuICAgICAgbG9naW5fdHlwZTogbG9naW5UeXBlLFxyXG4gICAgfSk7XHJcbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2U/LnJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIHRoaXMuaHR0cC5zZXRBdXRoVG9rZW4ocmVzcG9uc2UucmVzcG9uc2UuZGF0YS5qd3QpO1xyXG4gICAgICBHbG9iYWwuaW5zLnJlY2VpdmVfZGF5ID0gcmVzcG9uc2UucmVzcG9uc2U/LmRhdGE/LnJlY2VpdmVfZGF5O1xyXG4gICAgICAvLyBHbG9iYWwuaW5zLmluaXRQbGF5ZXIocmVzcG9uc2UuZGF0YS51c2VyLCByZXNwb25zZS5kYXRhLnVzZXJkYXRhKTtcclxuICAgICAgY29uc29sZS5sb2coXCLnmbvlvZXmiJDlip9cIiwgcmVzcG9uc2UpO1xyXG4gICAgICB0aGlzLmxvZ2luZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwi55m75b2V5aSx6LSlXCIsIHJlc3BvbnNlKTtcclxuICAgICAgdGhpcy5sb2dpbmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2UucmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W55So5oi35L+h5oGvXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyDov5Tlm57nlKjmiLfkv6Hmga/nmoTlk43lupTmlbDmja5cclxuICAgKi9cclxuICBhc3luYyBnZXRVc2VyaW5mbyhpc191cGRhdGVfdXNlcjogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPFVzZXJEYXRhUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8VXNlckRhdGFSZXNwb25zZT4oJy9nZXR1c2VyaW5mbycsIG51bGwsIHsgYXV0aDogdHJ1ZSB9KTtcclxuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZT8ucmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coXCLojrflj5bnlKjmiLfkv6Hmga9cIiwgcmVzcG9uc2UpO1xyXG4gICAgICBHbG9iYWwuaW5zLnNldFVzZXJEYXRhKHJlc3BvbnNlLnJlc3BvbnNlLmRhdGE/LnVzZXJkYXRhLCBpc191cGRhdGVfdXNlcik7XHJcbiAgICAgIHJldHVybiByZXNwb25zZT8ucmVzcG9uc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCLojrflj5bnlKjmiLfkv6Hmga/lpLHotKVcIiwgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5ri45oiP6YWN572u5L+h5oGvXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyDov5Tlm57ojrflj5bnmoTphY3nva7kv6Hmga9cclxuICAgKi9cclxuICBhc3luYyBnZXRDb25maWdzKCk6IFByb21pc2U8R2FtZUNvbmZpZ1Jlc3BvbnNlPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEdhbWVDb25maWdSZXNwb25zZT4oJy9jb25maWdzJywgbnVsbCwgeyBhdXRoOiBmYWxzZSB9KTtcclxuICAgIGNvbnNvbGUubG9nKCdnZXRDb25maWdzICBnYW1lQ29uZmlnOicsIHJlc3BvbnNlKTtcclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gNDAwKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgR2xvYmFsLmlucy5nYW1lQ29uZmlnID0gcmVzcG9uc2UucmVzcG9uc2UuZGF0YS5jZmc7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UucmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmj5DkuqTmj5DnjrDor7fmsYJcclxuICAgKlxyXG4gICAqIEBwYXJhbSBhbW91bnQg5o+Q546w6YeR6aKdXHJcbiAgICogQHBhcmFtIGNoYW5uZWwg5o+Q546w5rig6YGT77yM5Y+v6YCJ5Y+C5pWw77yM5rig6YGTLOS4jeS8oOaIluiAheepuuWtl+espum7mOiupOS4unRvblxyXG4gICAqIEBwYXJhbSB3YWxsZXRBZGRyZXNzIOaPkOeOsOWcsOWdgFxyXG4gICAqIEByZXR1cm5zIOaPkOS6pOe7k+aenFxyXG4gICAqL1xyXG4gIGFzeW5jIHN1Ym1pdFdpdGhkcmF3KGFtb3VudDogbnVtYmVyLCBjaGFubmVsPzogQ2hhbm5lbFR5cGUpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8U3VibWl0V2l0aGRyYXdSZXNwb25zZT4oJy9zdWJtaXR3aXRoZHJhdycsXHJcbiAgICAgIHsgYTogYW1vdW50LCBjaGFubmVsLCBhZGRyOiBXYWxsZXRNZ3IuaW5zLmdldEFkZHJlc3MoKSB9LCB7IGF1dGg6IHRydWUgfSk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBHbG9iYWwuaW5zLnNldFVzZXJEYXRhKHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudXNlcmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuelqOaNruS/oeaBr1xyXG4gICAgKi9cclxuICBhc3luYyBnZXRUaWNrZXQoZ2lkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8VGlja2V0UmVzcG9uc2U+KCcvb3BlbnN0YWdlJywgeyBnaWQgfSwgeyBhdXRoOiB0cnVlIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGE/LnRpY2tldCkge1xyXG4gICAgICBHbG9iYWwuaW5zLnRpY2tldCA9IHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudGlja2V0O1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UucmVzcG9uc2UuZGF0YS50aWNrZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVUlNYW5hZ2VyLmlucy5zaG93V2luZG93VGlwcyh7XHJcbiAgICAvLyAgIC8vIHRpdGxlOiB0KCd0aXBzLm5ldHdvcmtFcnJvcicpLFxyXG4gICAgLy8gICB0aXBzOiB0aGlzLmdldEVycm9yTWVzc2FnZShyZXNwb25zZS5yZXNwb25zZSkgKyAnXFxuXFxuQ29kZTonICsgcmVzcG9uc2Uuc3RhdHVzICsgJy0nICsgZ2lkICsgJy0nICsgR2xvYmFsLmlucy51c2VyRGF0YS5zdGFnZSArICctJyArIEdsb2JhbC5pbnMuY3VyX2dvdF9jb2lucyxcclxuICAgIC8vICAgeWVzX3RleHQ6IHQoJ3RpcHMucmV0cnknKSxcclxuICAgIC8vICAgeWVzX2NiOiBhc3luYyAoKSA9PiB7XHJcbiAgICAvLyAgICAgdGhpcy5nZXRUaWNrZXQoZ2lkKTtcclxuICAgIC8vICAgfSxcclxuICAgIC8vICAgbm9fdGV4dDogdCgnbWFpbi5iYWNrSG9tZScpLFxyXG4gICAgLy8gICBub19jYjogKCkgPT4ge1xyXG4gICAgLy8gICAgIFVJTWFuYWdlci5pbnMuY2xvc2VBbGwoKTtcclxuICAgIC8vICAgICBVSU1hbmFnZXIuaW5zLnNob3dVSShcIk1lbnVVSVwiLCBCVU5ETEVfVFlQRV9FTlVNLkdBTUVfUExBWSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pXHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICAvKipcclxuICog6I635Y+W5YWz5Y2h5aWW5Yqx5L+h5oGvXHJcbiAqIEBwYXJhbSBnaWQg5YWz5Y2haWRcclxuICogXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuICBhc3luYyBnZXRMdlByaXplKGdpZDogbnVtYmVyLCBjaGVja19jb2luOiBudW1iZXIpIHtcclxuICAgIGxldCB0aWNrZXQgPSBHbG9iYWwuaW5zLnRpY2tldDtcclxuICAgIGlmICghdGlja2V0KSB7XHJcbiAgICAgIC8vIEdsb2JhbC5pbnMudGlja2V0ID0gdGlja2V0ID0gYXdhaXQgdGhpcy5nZXRUaWNrZXQoR2xvYmFsRGF0YS5jdXJfbHZsKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxMdlByaXplUmVzcG9uc2U+KCcvcGFzc3N0YWdlJywgeyB0aWNrZXQsIGdpZCwgY2hlY2tfY29pbiB9LCB7IGF1dGg6IHRydWUgfSk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBHbG9iYWwuaW5zLnNldFVzZXJEYXRhKHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudXNlcmRhdGEpO1xyXG4gICAgICBHbG9iYWwuaW5zLnRpY2tldCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG5cclxuICAvLyAvKipcclxuICAvLyAgKiDlhZHmjaLlrp3nrrHpkqXljJlcclxuICAvLyAgKiBAcGFyYW0gdHlwZSDlrp3nrrHnsbvlnosgKOS9v+eUqEJveFR5cGXmnprkuL4pXHJcbiAgLy8gICovXHJcbiAgLy8gYXN5bmMgZXhjaGFuZ2VCb3hLZXkodHlwZTogQm94VHlwZSk6IFByb21pc2U8QXBpTXNnPEV4Y2hhbmdlQm94S2V5UmVzcG9uc2U+PiB7XHJcbiAgLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEV4Y2hhbmdlQm94S2V5UmVzcG9uc2U+KFxyXG4gIC8vICAgICAnL2V4Y2hhbmdlYm94a2V5JyxcclxuICAvLyAgICAgeyB0OiB0eXBlIH0sXHJcbiAgLy8gICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgLy8gICApO1xyXG5cclxuICAvLyAgIHJldHVybiByZXNwb25zZTtcclxuICAvLyB9XHJcblxyXG4gIC8vIC8qKlxyXG4gIC8vICAqIOW8gOWQr+WuneeusVxyXG4gIC8vICAqIEBwYXJhbSB0eXBlIOWuneeuseexu+WeiyAo5L2/55SoQm94VHlwZeaemuS4vilcclxuICAvLyAgKi9cclxuICAvLyBhc3luYyBvcGVuQm94KHR5cGU6IEJveFR5cGUpOiBQcm9taXNlPEFwaU1zZzxPcGVuQm94UmVzcG9uc2U+PiB7XHJcbiAgLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PE9wZW5Cb3hSZXNwb25zZT4oXHJcbiAgLy8gICAgICcvb3BlbmJveCcsXHJcbiAgLy8gICAgIHsgdDogdHlwZSB9LFxyXG4gIC8vICAgICB7IGF1dGg6IHRydWUgfVxyXG4gIC8vICAgKTtcclxuICAvLyAgIHJldHVybiByZXNwb25zZTtcclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOe7keWumumSseWMhVxyXG4gICAqXHJcbiAgICogQHBhcmFtIGFkZHIg6ZKx5YyF5Zyw5Z2AXHJcbiAgICogQHJldHVybnMg6L+U5Zue6L+e5o6l6ZKx5YyF55qE5ZON5bqU57uT5p6cXHJcbiAgICovXHJcbiAgYXN5bmMgYmluZFdhbGxldChhZGRyOiBzdHJpbmcpOiBQcm9taXNlPEFwaU1zZzxJUmVzcG9uc2VEYXRhPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxJUmVzcG9uc2VEYXRhPignL2JpbmR3YWxsZXQnLCB7XHJcbiAgICAgIGFkZHJcclxuICAgIH0sIHsgYXV0aDogdHJ1ZSB9KTtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOino+e7kemSseWMhVxyXG4gICAqXHJcbiAgICogQHJldHVybnMg6Kej57uR5pON5L2c55qE5ZON5bqU5pWw5o2uXHJcbiAgICovXHJcbiAgYXN5bmMgdW5iaW5kV2FsbGV0KCk6IFByb21pc2U8QXBpTXNnPElSZXNwb25zZURhdGE+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PElSZXNwb25zZURhdGE+KCcvdW5iaW5kaW5nd2FsbGV0Jywge30sIHsgYXV0aDogdHJ1ZSB9KTtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8vIC8qKlxyXG4gIC8vICAqIOmihuWPluWNoeavj+aXpeWlluWKsVxyXG4gIC8vICAqIEBwYXJhbSB0eXBlIOWNoeexu+WeiyAx5ZGo5Y2hMuaciOWNoTPlubTljaFcclxuICAvLyAgKi9cclxuICAvLyBhc3luYyBjYXJkZGFpbHkodHlwZTogQ2FyZFR5cGUpOiBQcm9taXNlPEFwaU1zZzxHZXRDYXJkRGFpbHlSZXNwb25zZT4+IHtcclxuICAvLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8R2V0Q2FyZERhaWx5UmVzcG9uc2U+KFxyXG4gIC8vICAgICAnL2NhcmRkYWlseScsXHJcbiAgLy8gICAgIHsgdDogdHlwZSB9LFxyXG4gIC8vICAgICB7IGF1dGg6IHRydWUgfVxyXG4gIC8vICAgKTtcclxuICAvLyAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwICYmIHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgIEdsb2JhbC5pbnMucmVjZWl2ZV9kYXkgPSByZXNwb25zZS5yZXNwb25zZS5kYXRhLnJlY2VpdmVfZGF5O1xyXG4gIC8vICAgICBHbG9iYWwuaW5zLnNldFVzZXJEYXRhKHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudXNlcmRhdGEpO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIC8vIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Yib5bu65pSv5LuY6K6i5Y2VXHJcbiAgICogQHBhcmFtIHNrdWlkIOWVhuWTgVNLVSBJRFxyXG4gICAqIEByZXR1cm5zIOaUr+S7mOiuouWNleS/oeaBr1xyXG4gICAqL1xyXG4gIGFzeW5jIHB1cmNoYXNlQ3JlYXRlKHNrdWlkOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxQdXJjaGFzZUNyZWF0ZVJlc3BvbnNlPj4ge1xyXG4gICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgc2t1aWRcclxuICAgIH07XHJcbiAgICBpZiAod2luZG93Py5wbGF5ZGVja0lzT3Blbikge1xyXG4gICAgICBwYXJhbXNbXCJwYXltZW50X2Zyb21cIl0gPSBcInBsYXlkZWNrXCJcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8UHVyY2hhc2VDcmVhdGVSZXNwb25zZT4oXHJcbiAgICAgICcvcHVyY2hhc2VjcmVhdGUnLFxyXG4gICAgICB7IHNrdWlkIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6K6i5Y2V5Yib5bu65oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEub3JkZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog56Gu6K6k5pSv5LuY5oiQ5YqfXHJcbiAgICogQHBhcmFtIGlkIOiuouWNleaVsOaNruW6k0lEXHJcbiAgICogQHBhcmFtIG9yZGVySWQg6K6i5Y2V5a2X56ym5LiySURcclxuICAgKiBAcmV0dXJucyDmm7TmlrDlkI7nmoTorqLljZXkv6Hmga/lj4rnlKjmiLfmlbDmja5cclxuICAgKi9cclxuICBhc3luYyBwdXJjaGFzZURvbmUoaWQ6IG51bWJlciwgb3JkZXJJZDogc3RyaW5nKTogUHJvbWlzZTxBcGlNc2c8UHVyY2hhc2VEb25lUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PFB1cmNoYXNlRG9uZVJlc3BvbnNlPihcclxuICAgICAgJy9wdXJjaGFzZWRvbmUnLFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgb3JkZXJfaWQ6IG9yZGVySWRcclxuICAgICAgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ+aUr+S7mOehruiupCcsIHJlc3BvbnNlKTtcclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICAvLyDlpoLmnpzpnIDopoHmm7TmlrDmnKzlnLDnlKjmiLfmlbDmja7lj6/lnKjmraTlpITnkIZcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluS7u+WKoeWIl+ihqFxyXG4gICAqIEByZXR1cm5zIOS7u+WKoeaVsOaNruaVsOe7hFxyXG4gICAqL1xyXG4gIGFzeW5jIGdldFRhc2tMaXN0KCk6IFByb21pc2U8QXBpTXNnPFRhc2tMaXN0UmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PFRhc2tMaXN0UmVzcG9uc2U+KFxyXG4gICAgICAnL3Rhc2tsaXN0JyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5Lu75Yqh5YiX6KGo6I635Y+W5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6aKG5Y+W5Lu75Yqh5aWW5YqxXHJcbiAgICogQHBhcmFtIHRpZCDku7vliqFJRFxyXG4gICAqIEByZXR1cm5zIOabtOaWsOWQjueahOeUqOaIt+aVsOaNrlxyXG4gICAqL1xyXG4gIGFzeW5jIGNsYWltVGFza1Jld2FyZCh0aWQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPFRhc2tSZXdhcmRSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8VGFza1Jld2FyZFJlc3BvbnNlPihcclxuICAgICAgJy9nZXR0YXNrcmV3YXJkJyxcclxuICAgICAgeyB0aWQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfku7vliqHlpZblirHpooblj5bmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YS51c2VyZGF0YSk7XHJcbiAgICAgIC8vIOWPr+WcqOatpOWkhOa3u+WKoOeUqOaIt+aVsOaNruabtOaWsOmAu+i+kVxyXG4gICAgICBHbG9iYWwuaW5zLnNldFVzZXJEYXRhKHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudXNlcmRhdGEsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDojrflj5bpgoDor7fkv6Hmga9cclxuICAgICogQHJldHVybnMg5YyF5ZCr6YKA6K+35pWw5o2u5ZKM5aWW5Yqx6YWN572u55qE5ZON5bqUXHJcbiAgICAqL1xyXG4gIGFzeW5jIGdldEludml0ZUluZm8oKTogUHJvbWlzZTxBcGlNc2c8SW52aXRlSW5mb1Jlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxJbnZpdGVJbmZvUmVzcG9uc2U+KFxyXG4gICAgICAnL2dldGludml0ZWluZm8nLFxyXG4gICAgICB7fSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfpgoDor7fkv6Hmga/ojrflj5bmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpooblj5bpgoDor7flpZblirFcclxuICAgKiBAcGFyYW0gcmV3YXJkSWQg5aWW5Yqx6YWN572uSURcclxuICAgKiBAcmV0dXJucyDmm7TmlrDlkI7nmoTnlKjmiLfmlbDmja5cclxuICAgKi9cclxuICBhc3luYyBjbGFpbUludml0ZVJld2FyZChyZXdhcmRJZDogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8SW52aXRlUmV3YXJkUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEludml0ZVJld2FyZFJlc3BvbnNlPihcclxuICAgICAgJy9nZXRpbnZpdGVyZXdhcmQnLFxyXG4gICAgICB7IHRpZDogcmV3YXJkSWQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfpgoDor7flpZblirHpooblj5bmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YS51c2VyZGF0YSk7XHJcbiAgICAgIEdsb2JhbC5pbnMuc2V0VXNlckRhdGEocmVzcG9uc2UucmVzcG9uc2UuZGF0YS51c2VyZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bpgoDor7fnjqnlrrbliJfooahcclxuICAgKiBAcGFyYW0gcGFnZU5vIOmhteegge+8iOS7jjDlvIDlp4vvvIlcclxuICAgKiBAcGFyYW0gcGFnZVNpemUg5q+P6aG15pWw6YePXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0SW52aXRlTGlzdChwYWdlTm86IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPEludml0ZUxpc3RSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8SW52aXRlTGlzdFJlc3BvbnNlPihcclxuICAgICAgJy9nZXRpbnZpdGVsaXN0JyxcclxuICAgICAgeyBwYWdlTm8sIHBhZ2VTaXplIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6YKA6K+35YiX6KGo6I635Y+W5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEubGlzdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDkuIrmiqXliIbkuqvooYzkuLrojrflj5blpZblirFcclxuICAgKiBAcmV0dXJucyDljIXlkKvojrflvpfnmoTmuLjmiI/luIHlkoznlKjmiLfmlbDmja5cclxuICAgKi9cclxuICBhc3luYyByZXBvcnRTaGFyZShnaWQ/OiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxTaGFyZVJld2FyZFJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxTaGFyZVJld2FyZFJlc3BvbnNlPihcclxuICAgICAgJy9hZnRlcnNoYXJlJyxcclxuICAgICAgeyBnaWQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfliIbkuqvmiJDlip86JywgcmVzcG9uc2UpO1xyXG4gICAgICAvLyBHbG9iYWwuaW5zLnNldFVzZXJEYXRhKHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudXNlcmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiDojrflj5bmjpLooYzmppzmlbDmja5cclxuICAqIEBwYXJhbSByYW5rVHlwZSDmjpLooYzmppznsbvlnovvvIjkvb/nlKhSYW5rVHlwZeaemuS4vu+8iVxyXG4gICogQHBhcmFtIHBhZ2VObyDpobXnoIHvvIjku44w5byA5aeL77yJXHJcbiAgKiBAcGFyYW0gcGFnZVNpemUg5q+P6aG15pWw6YePXHJcbiAgKiBAcmV0dXJucyDljIXlkKvmjpLooYzmppzliJfooajlkoznlKjmiLfkuKrkurrmjpLlkI3mlbDmja5cclxuICAqL1xyXG4gIGFzeW5jIGdldFJhbmtMaXN0KFxyXG4gICAgLy8gcmFua1R5cGU6IFJhbmtUeXBlLFxyXG4gICAgcGFnZU5vOiBudW1iZXIsXHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyXHJcbiAgKTogUHJvbWlzZTxBcGlNc2c8UmFua1Jlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxSYW5rUmVzcG9uc2U+KFxyXG4gICAgICAnL3JhbmsnLFxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gcmFua190eXBlOiByYW5rVHlwZSxcclxuICAgICAgICBwYWdlTm8sXHJcbiAgICAgICAgcGFnZVNpemVcclxuICAgICAgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGDojrflj5Yke1JhbmtUeXBlW3JhbmtUeXBlXX3mppzmiJDlip9gLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOS4iuaKpeS7u+WKoeWujOaIkOaDheWGte+8iOiuoumYhS/liqDnvqQv5oqV56Wo77yJXHJcbiAgICogQHBhcmFtIG5vdGlmeVR5cGUg6YCa55+l57G75Z6LIHN1YnNjcmliZS9hZGRncm91cC92b3RlLzEyKOS9v+eUqOW6lemDqOS4ieS4qumBk+WFtykvMTMo5L2/55So5aSN5rS7KSDlrZfnrKbkuLJcclxuICAgKi9cclxuICBhc3luYyByZXBvcnRUYXNrTm90aWZ5KFxyXG4gICAgbm90aWZ5VHlwZTogVGFza05vdGlmeVR5cGUsXHJcbiAgKTogUHJvbWlzZTxBcGlNc2c8VGFza25vdGlmeVJlc3BvbnNlPj4ge1xyXG4gICAgbGV0IHRpY2tldDtcclxuICAgIGxldCBnaWQ7XHJcbiAgICBzd2l0Y2ggKG5vdGlmeVR5cGUpIHtcclxuICAgICAgY2FzZSBUYXNrTm90aWZ5VHlwZS5TdWJzY3JpYmU6XHJcbiAgICAgIGNhc2UgVGFza05vdGlmeVR5cGUuQWRkR3JvdXA6XHJcbiAgICAgIGNhc2UgVGFza05vdGlmeVR5cGUuVm90ZTpcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBnaWQgPSBHbG9iYWxEYXRhLmN1cl9sdmxcclxuICAgICAgICB0aWNrZXQgPSBHbG9iYWwuaW5zLnRpY2tldDtcclxuICAgICAgICBpZiAoIXRpY2tldCkge1xyXG4gICAgICAgICAgLy8gR2xvYmFsLmlucy50aWNrZXQgPSB0aWNrZXQgPSBhd2FpdCB0aGlzLmdldFRpY2tldChHbG9iYWxEYXRhLmN1cl9sdmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8eyBzdWNjZXNzOiBib29sZWFuIH0+KFxyXG4gICAgICAnL3Rhc2tub3RpZnknLFxyXG4gICAgICB7XHJcbiAgICAgICAgb3Blbl9pZDogR2xvYmFsLmlucy51c2VyPy5vcGVuaWQsXHJcbiAgICAgICAgdHlwZTogU3RyaW5nKG5vdGlmeVR5cGUpLFxyXG4gICAgICAgIHRpY2tldCxcclxuICAgICAgICBnaWQsXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgYXV0aDogZmFsc2UgfSAvLyDkuI3pnIDopoHorqTor4FcclxuICAgICk7XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICAqIOi0reS5sOmBk+WFt1xyXG4gICAgKiBAcGFyYW0gcHJvcElkIOmBk+WFt0lEXHJcbiAgICAqIEByZXR1cm5zIOaUr+S7mOiuouWNleS/oeaBr1xyXG4gICAgKi9cclxuICBhc3luYyBidXlQcm9wKHByb3BJZDogbnVtYmVyLCBzdGFnZTogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8QnV5UHJvcFJlc3BvbnNlPj4ge1xyXG4gICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgcHJvcF9pZDogcHJvcElkLFxyXG4gICAgICBzdGFnZVxyXG4gICAgfVxyXG4gICAgaWYgKHdpbmRvdz8ucGxheWRlY2tJc09wZW4pIHtcclxuICAgICAgcGFyYW1zW1wicGF5bWVudF9mcm9tXCJdID0gXCJwbGF5ZGVja1wiXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEJ1eVByb3BSZXNwb25zZT4oXHJcbiAgICAgICcvYnV5cHJvcCcsXHJcbiAgICAgIHBhcmFtcyxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfpgZPlhbforqLljZXliJvlu7rmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YS5vcmRlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICAqIOi0reS5sOmBk+WFt1xyXG4gICAgKiBAcGFyYW0gcHJvcElkIOmBk+WFt0lEXHJcbiAgICAqIEByZXR1cm5zIOaUr+S7mOiuouWNleS/oeaBr1xyXG4gICAgKi9cclxuICBhc3luYyBtYWxsYnV5UHJvcChwcm9wSWQ6IG51bWJlciwgbnVtOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxCdXlQcm9wUmVzcG9uc2U+PiB7XHJcbiAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICBwcm9wX2lkOiBwcm9wSWQsXHJcbiAgICAgIG51bTogbnVtXHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93Py5wbGF5ZGVja0lzT3Blbikge1xyXG4gICAgICBwYXJhbXNbXCJwYXltZW50X2Zyb21cIl0gPSBcInBsYXlkZWNrXCJcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8QnV5UHJvcFJlc3BvbnNlPihcclxuICAgICAgJy9tYWxsYnV5cHJvcCcsXHJcbiAgICAgIHBhcmFtcyxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfllYbln47pgZPlhbforqLljZXliJvlu7rmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOi0reS5sOmBk+WFt+aTjeS9nOa1geeoi+WwgeijhVxyXG4gICpcclxuICAqIEBwYXJhbSBzdWNjZXNzQ2FsbGJhY2sg5oiQ5Yqf5Zue6LCDXHJcbiAgKiBAcGFyYW0gcHJvcElkIOmBk+WFt0lEXHJcbiAgKiBAcGFyYW0gc3RhZ2Ug5YWz5Y2hXHJcbiAgKi9cclxuICAvLyBhc3luYyBidXlQcm9wT3BlcmF0aW9uKHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb24sIHByb3BJZDogUHJvcFR5cGUsIG51bTogbnVtYmVyKSB7XHJcbiAgLy8gICBjb25zdCBidXlSZXN1bHQgPSBhd2FpdCB0aGlzLm1hbGxidXlQcm9wKHByb3BJZCwgbnVtKTtcclxuICAvLyAgIGlmIChidXlSZXN1bHQuc3RhdHVzICE9IDIwMCB8fCAhYnV5UmVzdWx0LnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoXCJ0aXBzLm9yZGVyQ3JlYXRlRmFpbGVkXCIpKTtcclxuICAvLyAgICAgcmV0dXJuO1xyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIGlmIChDQ19ERUJVRykge1xyXG4gIC8vICAgICBsZXQgb2lkID0gYnV5UmVzdWx0LnJlc3BvbnNlLmRhdGEub3JkZXIub2lkO1xyXG4gIC8vICAgICBhd2FpdCBBcGlTZXJ2aWNlLmlucy5nZXRQdXJjaGFzZWRvbmUob2lkKTtcclxuICAvLyAgICAgc3VjY2Vzc0NhbGxiYWNrKCk7XHJcbiAgLy8gICAgIEFwaVNlcnZpY2UuaW5zLmdldFVzZXJQcm9wbGlzdCgpO1xyXG4gIC8vICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5wdXJjaGFzZVN1Y2Nlc3NcIikpO1xyXG4gIC8vICAgICByZXR1cm47XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgdHJ5IHtcclxuICAvLyAgICAgbGV0IHJzcCA9IGJ1eVJlc3VsdC5yZXNwb25zZTtcclxuICAvLyAgICAgbGV0IHVybCA9IHJzcC5kYXRhLm9yZGVyLmxpbms7XHJcbiAgLy8gICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgLy8gICAgICAgR2xvYmFsLmlucy5wYXltZW50KHJzcC5kYXRhLm9yZGVyLCBhc3luYyAoc3RhdHVzKSA9PiB7XHJcbiAgLy8gICAgICAgICBjb25zb2xlLmxvZyhgdGcgc3RhciBwYXkgc3RhdHVzIDoke3N0YXR1c31gKTtcclxuICAvLyAgICAgICAgIGNvbnN0IGNoZWNrRnVuID0gYXN5bmMgKGNvdW50OiBudW1iZXIpID0+IHtcclxuICAvLyAgICAgICAgICAgY29uc3QgbSA9IGF3YWl0IEFwaVNlcnZpY2UuaW5zLmNoZWNrT3JkZXIocnNwLmRhdGEub3JkZXIub2lkKTtcclxuICAvLyAgICAgICAgICAgaWYgKG0uc3RhdHVzID09PSAyMDAgJiYgbS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gIC8vICAgICAgICAgICAgIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoXCJ0aXBzLnB1cmNoYXNlU3VjY2Vzc1wiKSk7XHJcbiAgLy8gICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKCk7XHJcbiAgLy8gICAgICAgICAgICAgQXBpU2VydmljZS5pbnMuZ2V0VXNlclByb3BsaXN0KCk7XHJcbiAgLy8gICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAvLyAgICAgICAgICAgfSBlbHNlIHtcclxuICAvLyAgICAgICAgICAgICBpZiAoLS1jb3VudCA+IDApIHtcclxuICAvLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGVja09yZGVyIGFnYWluJywgY291bnQpO1xyXG4gIC8vICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMDApKTtcclxuICAvLyAgICAgICAgICAgICAgIGF3YWl0IGNoZWNrRnVuKGNvdW50KTtcclxuICAvLyAgICAgICAgICAgICB9XHJcbiAgLy8gICAgICAgICAgICAgZWxzZSB7XHJcbiAgLy8gICAgICAgICAgICAgICBBcGlTZXJ2aWNlLmlucy5zaG93RXJyb3IobSk7XHJcbiAgLy8gICAgICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gIC8vICAgICAgICAgICB9XHJcbiAgLy8gICAgICAgICB9XHJcblxyXG4gIC8vICAgICAgICAgaWYgKHN0YXR1cyA9PT0gXCJwYWlkXCIpIHtcclxuICAvLyAgICAgICAgICAgLy8gNC4g56Gu6K6k6K6i5Y2V5pSv5LuY54q25oCBXHJcbiAgLy8gICAgICAgICAgIC8v6L+Z6YeM5aSE55CG5qOA5p+l6K6i5Y2V77yM6K+35rGCY2hlY2tvcmRlclxyXG4gIC8vICAgICAgICAgICBhd2FpdCBjaGVja0Z1big1KTtcclxuICAvLyAgICAgICAgIH1cclxuICAvLyAgICAgICAgIGVsc2Uge1xyXG4gIC8vICAgICAgICAgICBjb25zb2xlLmxvZyhcInRnIHN0YXIgcGF5IHN0YXR1cyA6XCIgKyBzdGF0dXMpO1xyXG4gIC8vICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAvLyAgICAgICAgIH1cclxuICAvLyAgICAgICB9KVxyXG4gIC8vICAgICB9KTtcclxuXHJcbiAgLy8gICB9IGNhdGNoIChlcnJvcikge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZygnaGFuZGxlUHJvcE9wZXJhdGlvbiBlcnJvcicsIGVycm9yKTtcclxuICAvLyAgICAgVUlNYW5hZ2VyLmlucy5zaG93VG9hc3QodChcInRpcHMucGF5bWVudFBlbmRpbmdcIikpO1xyXG4gIC8vICAgfVxyXG5cclxuXHJcbiAgLy8gfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W546p5a626Lqr5LiK55qE6YGT5YW35YiX6KGoXHJcbiAgICogQHBhcmFtIHByb3BJZCDpgZPlhbdJRFxyXG4gICAqL1xyXG4gIC8vIGFzeW5jIGdldFVzZXJQcm9wbGlzdCgpOiBQcm9taXNlPEFwaU1zZzxHZXRVc2VycHJvcGxpc3Q+PiB7XHJcbiAgLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEdldFVzZXJwcm9wbGlzdD4oXHJcbiAgLy8gICAgICcvZ2V0dXNlcnByb3BsaXN0JyxcclxuICAvLyAgICAge30sIC8vIOepuuivt+axguS9k1xyXG4gIC8vICAgICB7IGF1dGg6IHRydWUgfVxyXG4gIC8vICAgKTtcclxuXHJcbiAgLy8gICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAvLyAgICAgR2xvYmFsLmlucy5wcm9wbGlzdCA9IHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEucHJvcHM7XHJcbiAgLy8gICAgIEdsb2JhbC5pbnMuZ2V0VXNlclByb3BsaXN0KCk7XHJcbiAgLy8gICAgIEV2ZW50TWFuYWdlci5pbnMuZW1pdChFVkVOVF9OQU1FX0VOVU0uVVBEQVRFX1BST1BMSVNUKTtcclxuICAvLyAgICAgY29uc29sZS5sb2coJ+iOt+WPlueOqeWutui6q+S4iueahOmBk+WFt+WIl+ihqDonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAvLyAgIH1cclxuICAvLyAgIHJldHVybiByZXNwb25zZTtcclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICog6I635Y+W546p5a626Lqr5LiK55qE6YGT5YW35YiX6KGoXHJcbiAgKiBAcGFyYW0gb3JkZXJfaWQg5pSv5LuY6K6i5Y2V5L+h5oGvXHJcbiAgKiBAcmV0dXJucyBcclxuICAqL1xyXG4gIGFzeW5jIGdldFB1cmNoYXNlZG9uZShvcmRlcl9pZCk6IFByb21pc2U8QXBpTXNnPEdldFVzZXJwcm9wbGlzdD4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8R2V0VXNlcnByb3BsaXN0PihcclxuICAgICAgJy9wdXJjaGFzZWRvbmUnLFxyXG4gICAgICB7IG9yZGVyX2lkOiBvcmRlcl9pZCB9LCAvLyDnqbror7fmsYLkvZNcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC8vIC8qKlxyXG4gIC8vICAqIOehruiupOmBk+WFt+i0reS5sOaIkOWKn1xyXG4gIC8vICAqIEBwYXJhbSBvcmRlcklkIOiuouWNlUlEXHJcbiAgLy8gICovXHJcbiAgLy8gYXN5bmMgY29uZmlybVByb3BQdXJjaGFzZShvcmRlcklkOiBzdHJpbmcpOiBQcm9taXNlPEFwaU1zZzx7IHN1Y2Nlc3M6IGJvb2xlYW4gfT4+IHtcclxuICAvLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8eyBzdWNjZXNzOiBib29sZWFuIH0+KFxyXG4gIC8vICAgICAnL2J1eXByb3Bkb25lJyxcclxuICAvLyAgICAgeyBvcmRlcl9pZDogb3JkZXJJZCB9LFxyXG4gIC8vICAgICB7IGF1dGg6IHRydWUgfVxyXG4gIC8vICAgKTtcclxuXHJcbiAgLy8gICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coJ+mBk+WFt+i0reS5sOehruiupOaIkOWKnycpO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIC8vIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6IO95ZCm5L2/55So6YGT5YW3XHJcbiAgICogQHBhcmFtIHByb3BJZCDpgZPlhbdJRFxyXG4gICAqL1xyXG4gIC8vIGFzeW5jIGdldFVzZXJwcm9wKHByb3BJZDogUHJvcFR5cGUgPSBQcm9wVHlwZS5Ta2lwU3RhZ2UpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAvLyAgIGNvbnN0IHBheWxvYWQ6IGFueSA9IHsgcHJvcF9pZDogcHJvcElkIH07XHJcblxyXG4gIC8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxVc2VQcm9wUmVzcG9uc2U+KFxyXG4gIC8vICAgICAnL2dldHVzZXJwcm9wJyxcclxuICAvLyAgICAgcGF5bG9hZCxcclxuICAvLyAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAvLyAgICk7XHJcblxyXG4gIC8vICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDAgJiYgcmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coJ+mBk+WFt+WPr+S7peS9v+eUqCcpO1xyXG4gIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAvLyAgIH1cclxuICAvLyAgIGNvbnNvbGUubG9nKCfpgZPlhbfkuI3lj6/ku6Xkvb/nlKgnKTtcclxuICAvLyAgIHJldHVybiBmYWxzZTtcclxuICAvLyB9XHJcbiAgLyoqXHJcbiAgICog5L2/55So6YGT5YW3XHJcbiAgICogQHBhcmFtIHByb3BJZCDpgZPlhbdJRFxyXG4gICAqIEBwYXJhbSBzdGFnZSDnm67moIflhbPljaHvvIjlj6/pgInvvIlcclxuICAgKi9cclxuICAvLyBhc3luYyB1c2VQcm9wKHByb3BJZDogUHJvcFR5cGUsIHN0YWdlPzogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8VXNlUHJvcFJlc3BvbnNlPj4ge1xyXG4gIC8vICAgY29uc3QgcGF5bG9hZDogYW55ID0geyBwcm9wX2lkOiBwcm9wSWQsIHN0YWdlIH07XHJcbiAgLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PFVzZVByb3BSZXNwb25zZT4oXHJcbiAgLy8gICAgICcvdXNlcHJvcCcsXHJcbiAgLy8gICAgIHBheWxvYWQsXHJcbiAgLy8gICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgLy8gICApO1xyXG5cclxuICAvLyAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZygn6YGT5YW35L2/55So5oiQ5YqfJyk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgLy8gfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiDpgZPlhbfmk43kvZzmtYHnqIvlsIHoo4VcclxuICAqXHJcbiAgKiBAcGFyYW0gc3VjY2Vzc0NhbGxiYWNrIOaIkOWKn+Wbnuiwg1xyXG4gICogQHBhcmFtIHByb3BJZCDpgZPlhbdJRFxyXG4gICogQHBhcmFtIHN0YWdlIOWFs+WNoVxyXG4gICovXHJcbiAgLy8gYXN5bmMgaGFuZGxlUHJvcE9wZXJhdGlvbihzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBwcm9wSWQ6IFByb3BUeXBlLCBzdGFnZT86IG51bWJlcikge1xyXG4gIC8vICAgdHJ5IHtcclxuICAvLyAgICAgLy8gMS4g5bCd6K+V5L2/55So6YGT5YW3XHJcbiAgLy8gICAgIGNvbnN0IGNhblVzZSA9IGF3YWl0IHRoaXMuZ2V0VXNlcnByb3AocHJvcElkKTtcclxuICAvLyAgICAgaWYgKGNhblVzZSkge1xyXG4gIC8vICAgICAgIGNvbnN0IHVzZVJlc3VsdCA9IGF3YWl0IHRoaXMudXNlUHJvcChwcm9wSWQsIHN0YWdlKTtcclxuICAvLyAgICAgICBpZiAodXNlUmVzdWx0LnN0YXR1cyA9PSAyMDAgJiYgdXNlUmVzdWx0LnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgICAgICBzdWNjZXNzQ2FsbGJhY2soKTtcclxuICAvLyAgICAgICAgIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoXCJ0aXBzLnByb3BzdWNjZXNzXCIpKTtcclxuICAvLyAgICAgICAgIHJldHVybjtcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH1cclxuXHJcblxyXG4gIC8vICAgICAvLyAyLiDkvb/nlKjlpLHotKXml7blvLnlh7rnoa7orqTnqpflj6NcclxuICAvLyAgICAgVUlNYW5hZ2VyLmlucy5zaG93V2luZG93VGlwcyh7XHJcbiAgLy8gICAgICAgLyoqIOehruiupOaMiemSruWbnuiwgyAqL1xyXG4gIC8vICAgICAgIHllc19jYjogYXN5bmMgKCkgPT4ge1xyXG4gIC8vICAgICAgICAgLy8gMy4g5Yib5bu66LSt5Lmw6K6i5Y2VXHJcbiAgLy8gICAgICAgICBjb25zdCBidXlSZXN1bHQgPSBhd2FpdCB0aGlzLmJ1eVByb3AocHJvcElkLCBzdGFnZSk7XHJcbiAgLy8gICAgICAgICBpZiAoYnV5UmVzdWx0LnN0YXR1cyAhPSAyMDAgfHwgIWJ1eVJlc3VsdC5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gIC8vICAgICAgICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5vcmRlckNyZWF0ZUZhaWxlZFwiKSk7XHJcbiAgLy8gICAgICAgICAgIHJldHVybjtcclxuICAvLyAgICAgICAgIH1cclxuICAvLyAgICAgICAgIHRyeSB7XHJcbiAgLy8gICAgICAgICAgIGxldCByc3AgPSBidXlSZXN1bHQucmVzcG9uc2U7XHJcbiAgLy8gICAgICAgICAgIGxldCB1cmwgPSByc3AuZGF0YS5vcmRlci5saW5rO1xyXG4gIC8vICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gIC8vICAgICAgICAgICAgIEdsb2JhbC5pbnMucGF5bWVudChyc3AuZGF0YS5vcmRlciwgYXN5bmMgKHN0YXR1cykgPT4ge1xyXG4gIC8vICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHRnIHN0YXIgcGF5IHN0YXR1cyA6JHtzdGF0dXN9YCk7XHJcblxyXG4gIC8vICAgICAgICAgICAgICAgY29uc3QgY2hlY2tGdW4gPSBhc3luYyAoY291bnQ6IG51bWJlcikgPT4ge1xyXG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBtID0gYXdhaXQgQXBpU2VydmljZS5pbnMuY2hlY2tPcmRlcihyc3AuZGF0YS5vcmRlci5vaWQpO1xyXG4gIC8vICAgICAgICAgICAgICAgICBpZiAobS5zdGF0dXMgPT09IDIwMCAmJiBtLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmlucy5zaG93VG9hc3QodChcInRpcHMucHVyY2hhc2VTdWNjZXNzXCIpKTtcclxuICAvLyAgICAgICAgICAgICAgICAgICAvLyA1LiDlsJ3or5Xkvb/nlKjpgZPlhbdcclxuICAvLyAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VSZXN1bHQgPSBhd2FpdCB0aGlzLnVzZVByb3AocHJvcElkLCBzdGFnZSk7XHJcblxyXG4gIC8vICAgICAgICAgICAgICAgICAgIGlmICh1c2VSZXN1bHQuc3RhdHVzID09IDIwMCAmJiB1c2VSZXN1bHQucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAvLyAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjaygpO1xyXG4gIC8vICAgICAgICAgICAgICAgICAgIH1cclxuICAvLyAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAvLyAgICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5pbnMuZW1pdChFVkVOVF9OQU1FX0VOVU0uVVBEQVRFX1VTRVIpO1xyXG4gIC8vICAgICAgICAgICAgICAgICAgICAgQXBpU2VydmljZS5pbnMuc2hvd0Vycm9yKHVzZVJlc3VsdCk7XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAvLyAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gIC8vICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaG9tZV9hY3Rpb24udXBkYXRhUGFnZSgpO1xyXG4gIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gIC8vICAgICAgICAgICAgICAgICAgIC8vIFBvcE1nci5pbnMucG9wTGF5ZXIuc2hvd0xhYmVsVGlwcyhtLm1lc3NhZ2UpO1xyXG4gIC8vICAgICAgICAgICAgICAgICAgIGlmICgtLWNvdW50ID4gMCkge1xyXG4gIC8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrT3JkZXIgYWdhaW4nLCBjb3VudCk7XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwMCkpO1xyXG4gIC8vICAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hlY2tGdW4oY291bnQpO1xyXG4gIC8vICAgICAgICAgICAgICAgICAgIH1cclxuICAvLyAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAvLyAgICAgICAgICAgICAgICAgICAgIEFwaVNlcnZpY2UuaW5zLnNob3dFcnJvcihtKTtcclxuICAvLyAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gIC8vICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gIC8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4gIC8vICAgICAgICAgICAgICAgfVxyXG5cclxuICAvLyAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IFwicGFpZFwiKSB7XHJcbiAgLy8gICAgICAgICAgICAgICAgIC8vIDQuIOehruiupOiuouWNleaUr+S7mOeKtuaAgVxyXG4gIC8vICAgICAgICAgICAgICAgICAvL+i/memHjOWkhOeQhuajgOafpeiuouWNle+8jOivt+axgmNoZWNrb3JkZXJcclxuICAvLyAgICAgICAgICAgICAgICAgYXdhaXQgY2hlY2tGdW4oNSk7XHJcbiAgLy8gICAgICAgICAgICAgICB9XHJcbiAgLy8gICAgICAgICAgICAgICBlbHNlIHtcclxuICAvLyAgICAgICAgICAgICAgICAgLy8gYXdhaXQgY2hlY2tGdW4oNSk7XHJcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGcgc3RhciBwYXkgc3RhdHVzIDpcIiArIHN0YXR1cyk7XHJcblxyXG4gIC8vICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuXHJcbiAgLy8gICAgICAgICAgICAgICB9XHJcbiAgLy8gICAgICAgICAgICAgfSlcclxuICAvLyAgICAgICAgICAgfSk7XHJcblxyXG4gIC8vICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZVByb3BPcGVyYXRpb24gZXJyb3InLCBlcnJvcik7XHJcbiAgLy8gICAgICAgICAgIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoXCJ0aXBzLnBheW1lbnRQZW5kaW5nXCIpKTtcclxuICAvLyAgICAgICAgIH1cclxuICAvLyAgICAgICB9LFxyXG4gIC8vICAgICAgIHllc190ZXh0OiB0KFwidGlwcy5jb25maXJtXCIpLFxyXG4gIC8vICAgICAgIG5vX3RleHQ6IHQoXCJ0aXBzLmNhbmNlbFwiKSxcclxuICAvLyAgICAgICB0aXBzOiB0KFwidGlwcy5pbnN1ZmZpY2llbnRQcm9wc0NvbmZpcm1cIilcclxuICAvLyAgICAgfSk7XHJcbiAgLy8gICB9IGNhdGNoIChlcnJvcikge1xyXG4gIC8vICAgICBjb25zb2xlLmVycm9yKFwi6YGT5YW35pON5L2c5rWB56iL5byC5bi4OlwiLCBlcnJvcik7XHJcbiAgLy8gICAgIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoXCJ0aXBzLm5ldHdvcmtFcnJvclwiKSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxuICAvKipcclxuICAgKiDmo4Dmn6XorqLljZXmlK/ku5jnirbmgIFcclxuICAgKiBAcGFyYW0gb3JkZXJJZCDorqLljZVJRCAo5Yib5bu66K6i5Y2V5pe26L+U5Zue55qEb3JkZXIub2lkKVxyXG4gICAqIEByZXR1cm5zIOiuouWNleaYr+WQpuaUr+S7mOaIkOWKn1xyXG4gICAqL1xyXG4gIGFzeW5jIGNoZWNrT3JkZXIob3JkZXJJZDogc3RyaW5nKTogUHJvbWlzZTxBcGlNc2c8Q2hlY2tPcmRlclJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxDaGVja09yZGVyUmVzcG9uc2U+KFxyXG4gICAgICAnL2NoZWNrb3JkZXInLFxyXG4gICAgICB7IG9yZGVyX2lkOiBvcmRlcklkIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9IC8vIOmcgOimgeiupOivgVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDQwMCB8fCAhcmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5lcnJvcign6K6i5Y2V54q25oCB5qOA5p+l5aSx6LSlOicsIHJlc3BvbnNlKTtcclxuICAgICAgLy8gVUlNYW5hZ2VyLmlucy5zaG93VG9hc3QodCgndGlwcy5vcmRlckNoZWNrRmFpbGVkJykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ+iuouWNleeKtuaAgeajgOafpeaIkOWKnzonLCByZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5rOo5YaM5rS75Yqo77yI6aKG5Y+W5aWW5Yqx77yJXHJcbiAgICogQHJldHVybnMg5rS75Yqo5piv5ZCm5rOo5YaM5oiQ5YqfXHJcbiAgICovXHJcbiAgYXN5bmMgcmVnQWN0aXZpdHkoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PFJlZ0FjdGl2aXR5UmVzcG9uc2U+KFxyXG4gICAgICAnL3JlZ2FjdGl2aXR5JyxcclxuICAgICAge30sIC8vIOepuuivt+axguS9k1xyXG4gICAgICB7IGF1dGg6IHRydWUgfSAvLyDpnIDopoHorqTor4FcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSA0MDAgfHwgIXJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybign5rKh5pyJ5rOo5YaM5aWW5YqxOicsIHJlc3BvbnNlKTtcclxuICAgICAgLy8gUG9wTWdyLmlucy5wb3BMYXllci5zaG93TGFiZWxUaXBzKGkxOG4udCgndGlwcy5hY3Rpdml0eVJlZ2lzdHJhdGlvbkZhaWxlZCcpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfms6jlhozlpZblirHpooblj5bmiJDlip86JywgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2VzcztcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiDliqDlhaXpopHpgZNcclxuICAgKi9cclxuICAvLyBqb2luQ2hhbm5lbCgpIHtcclxuICAvLyAgIGlmIChDQ19ERUJVRykge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZyhcImpvaW5DaGFubmVsXCIpO1xyXG4gIC8vICAgICBFdmVudE1hbmFnZXIuaW5zLmVtaXQoRVZFTlRfTkFNRV9FTlVNLkFDVElWQVRFRCk7XHJcbiAgLy8gICAgIHJldHVybjtcclxuICAvLyAgIH1cclxuICAvLyAgIGxldCB1cmwgPSBcImh0dHBzOi8vdC5tZS9HZW1KYW1DaGFubmVsXCI7XHJcbiAgLy8gICBHbG9iYWwuaW5zLm9wZW5UZWxlZ3JhbUxpbmsodXJsKTtcclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWKoOWFpee+pOe7hFxyXG4gICAqL1xyXG4gIC8vIGpvaW5Hcm91cCgpIHtcclxuICAvLyAgIGlmIChDQ19ERUJVRykge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZyhcImpvaW5Hcm91cFwiKTtcclxuICAvLyAgICAgRXZlbnRNYW5hZ2VyLmlucy5lbWl0KEVWRU5UX05BTUVfRU5VTS5BQ1RJVkFURUQpO1xyXG4gIC8vICAgICByZXR1cm47XHJcbiAgLy8gICB9XHJcbiAgLy8gICBsZXQgdXJsID0gXCJodHRwczovL3QubWUvR2VtSmFtT2ZmY2lhbENvbW11bml0eVwiO1xyXG4gIC8vICAgR2xvYmFsLmlucy5vcGVuVGVsZWdyYW1MaW5rKHVybCk7XHJcbiAgLy8gfVxyXG5cclxuICAvKipcclxuICAgKiDljrvmipXnpahcclxuICAgKi9cclxuICAvLyBhc3luYyB0b1ZvdGUoKSB7XHJcbiAgLy8gICBpZiAoQ0NfREVCVUcpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJ0b1ZvdGVcIik7XHJcbiAgLy8gICAgIEV2ZW50TWFuYWdlci5pbnMuZW1pdChFVkVOVF9OQU1FX0VOVU0uQUNUSVZBVEVEKTtcclxuICAvLyAgICAgcmV0dXJuO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgYXdhaXQgQXBpU2VydmljZS5pbnMucmVwb3J0VGFza05vdGlmeShUYXNrTm90aWZ5VHlwZS5Wb3RlKTtcclxuICAvLyAgIGxldCB1cmwgPSBcImh0dHBzOi8vdC5tZS90YXBwc19ib3QvY2VudGVyP3N0YXJ0YXBwPWFwcF9nZW1qYW1cIjtcclxuICAvLyAgIEdsb2JhbC5pbnMub3BlblRlbGVncmFtTGluayh1cmwpO1xyXG4gIC8vIH1cclxuXHJcbiAgLyoqXHJcbiAgKiDliIbkuqvmuLjmiI9cclxuICAqL1xyXG4gIC8vIGFzeW5jIHNoYXJlR2FtZShfZ2lkPzogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8U2hhcmVSZXdhcmRSZXNwb25zZT4+IHtcclxuICAvLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQXBpU2VydmljZS5pbnMucmVwb3J0U2hhcmUoX2dpZCk7XHJcbiAgLy8gICBpZiAoQ0NfREVCVUcpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJzaGFyZUdhbWVcIik7XHJcbiAgLy8gICAgIEV2ZW50TWFuYWdlci5pbnMuZW1pdChFVkVOVF9OQU1FX0VOVU0uQUNUSVZBVEVEKTtcclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgIGxldCBzaGFyZVRleHQgPSAn8J+amSBZb3XigJlyZSBubyBoZXJvLlxcbllvdeKAmXJlIGEgdGhpZWbigJRvbiB5b3VyIGZpcnN0IG1pc3Npb24uXFxuTm8gd2VhcG9ucy4gSnVzdCBzcGVlZCBhbmQgYnJhaW5zLlxcbvCfko4gR2V0IGluLiBHcmFiIHRoZSBsb290LiBHZXQgb3V0IGFsaXZlLlxcbkJ1dCB0aGlzIGlzIGp1c3QgdGhlIGJlZ2lubmluZ+KApic7XHJcbiAgLy8gICAgIGNvbnN0IGVuY29kZWRUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHNoYXJlVGV4dCk7XHJcbiAgLy8gICAgIGxldCB1cmwgPSBcImh0dHBzOi8vdC5tZS9zaGFyZS91cmw/dXJsPWh0dHBzOi8vdC5tZS9HZW1KYW1fYm90L2dlbWphbT9zdGFydGFwcD1cIiArIEdsb2JhbC5pbnMudXNlci5pZCArICcmdGV4dD0nICsgZW5jb2RlZFRleHQ7XHJcbiAgLy8gICAgIEdsb2JhbC5pbnMub3BlblRlbGVncmFtTGluayh1cmwpO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIC8vIH1cclxuXHJcbiAgLyoqXHJcbiAgKiDliIbkuqvmuLjmiI/liLBYXHJcbiAgICovXHJcbiAgLy8gYXN5bmMgc2hhcmVHYW1lX1goX2dpZD86IG51bWJlcik6IFByb21pc2U8QXBpTXNnPFNoYXJlUmV3YXJkUmVzcG9uc2U+PiB7XHJcbiAgLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IEFwaVNlcnZpY2UuaW5zLnJlcG9ydFNoYXJlKF9naWQpO1xyXG5cclxuICAvLyAgIGlmIChDQ19ERUJVRykge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZyhcInNoYXJlR2FtZVwiKTtcclxuICAvLyAgICAgRXZlbnRNYW5hZ2VyLmlucy5lbWl0KEVWRU5UX05BTUVfRU5VTS5BQ1RJVkFURUQpO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgZWxzZSB7XHJcbiAgLy8gICAgIC8vIOWIhuemu+aWh+acrOWSjFVSTO+8jOWIhuWIq+e8lueggVxyXG4gIC8vICAgICBjb25zdCByYXdUZXh0ID0gdCgndGlwcy5zaGFyZU1lc3NhZ2UnKTtcclxuICAvLyAgICAgY29uc3QgYXBwVXJsID0gYGh0dHBzOi8vdC5tZS9HZW1KYW1fYm90L2dlbWphbT9zdGFydGFwcD0ke0dsb2JhbC5pbnMudXNlci5pZH1gO1xyXG5cclxuICAvLyAgICAgLy8g5L2/55SoVHdpdHRlcuWumOaWueaOqOiNkOeahOWPguaVsOagvOW8j++8mnRleHQgKyB1cmxcclxuICAvLyAgICAgY29uc3QgZW5jb2RlZFRleHQgPSBlbmNvZGVVUklDb21wb25lbnQocmF3VGV4dCk7XHJcbiAgLy8gICAgIGNvbnN0IGVuY29kZWRVcmwgPSBlbmNvZGVVUklDb21wb25lbnQoYXBwVXJsKTtcclxuXHJcbiAgLy8gICAgIC8vIOaehOmAoOagh+WHhlR3aXR0ZXLliIbkuqvpk77mjqVcclxuICAvLyAgICAgY29uc3QgdHdpdHRlckludGVudFVybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7ZW5jb2RlZFRleHR9JnVybD0ke2VuY29kZWRVcmx9YDtcclxuICAvLyAgICAgY29uc29sZS5sb2codHdpdHRlckludGVudFVybCk7XHJcbiAgLy8gICAgIEdsb2JhbC5pbnMub3BlbkxpbmsodHdpdHRlckludGVudFVybClcclxuICAvLyAgIH1cclxuICAvLyAgIHJldHVybiByZXNwb25zZTtcclxuICAvLyB9XHJcblxyXG5cclxuICAvKipcclxuICAqIOiOt+WPluWFjei0uemHkeW4gVxyXG4gICogQHJldHVybnMg5YyF5ZCr5pys5qyh6I635Y+W6YeR5biB5pWw5ZKM55So5oi35pWw5o2u55qE5ZON5bqUXHJcbiAgKi9cclxuICBhc3luYyBnZXRGcmVlR2FtZUNvaW4oKTogUHJvbWlzZTxBcGlNc2c8RnJlZUdhbWVDb2luUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEZyZWVHYW1lQ29pblJlc3BvbnNlPihcclxuICAgICAgJy9jYWlkYW4nLFxyXG4gICAgICB7fSwgLy8g56m66K+35rGC5L2TXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9IC8vIOmcgOimgXRva2Vu6K6k6K+BXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICAvLyDmm7TmlrDlhajlsYDnlKjmiLfmlbDmja5cclxuICAgICAgLy8gR2xvYmFsLmlucy5zZXRVc2VyRGF0YShyZXNwb25zZS5yZXNwb25zZS5kYXRhLnVzZXJkYXRhKTtcclxuICAgICAgY29uc29sZS5sb2coJ+iOt+WPluWFjei0uemHkeW4geaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhLmdvdGNvaW4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcign6I635Y+W5YWN6LS56YeR5biB5aSx6LSlOicsIHJlc3BvbnNlKTtcclxuICAgICAgLy8g5pi+56S66ZSZ6K+v5o+Q56S6XHJcbiAgICAgIC8vIFBvcE1nci5pbnMucG9wTGF5ZXIuc2hvd0xhYmVsVGlwcyhpMThuLnQoJ3RpcHMuZ2V0RnJlZUNvaW5GYWlsZWQnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPllRlbGVncmFt5aS05YOPXHJcbiAgICogQHBhcmFtIGljb25VcmwgVGVsZWdyYW3lpLTlg49VUkxcclxuICAgKiBAcmV0dXJucyDljIXlkKtiYXNlNjTnvJbnoIHnmoTlm77niYfmlbDmja5cclxuICAgKi9cclxuICBhc3luYyBnZXRUZWxlZ3JhbUF2YXRhcihpY29uVXJsOiBzdHJpbmcpOiBQcm9taXNlPEFwaU1zZzxBdmF0YXJSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8QXZhdGFyUmVzcG9uc2U+KFxyXG4gICAgICAnL2dldEF2YXRhcicsXHJcbiAgICAgIHsgaWNvbnVybDogaWNvblVybCB9LFxyXG4gICAgICB7IGF1dGg6IGZhbHNlLCByZXBlYXRNb2RlOiAncXVldWUnIH0gLy8g5LiN6ZyA6KaB6K6k6K+BXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygn5aS05YOP6I635Y+W5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gKiDojrflj5bplJnor6/kv6Hmga9cclxuICpcclxuICogQHBhcmFtIGNvZGUg6ZSZ6K+v5ZON5bqU77yM5Y+v5Lul5piv5a2X56ym5Liy5oiWRXJyb3JNc2flr7nosaFcclxuICogQHJldHVybnMg6L+U5Zue5a+55bqU55qE6ZSZ6K+v5o+Q56S65L+h5oGv77yM5aaC5p6c5pyq5om+5Yiw5YiZ6L+U5ZueXCLmnKrnn6XplJnor69cIlxyXG4gKi9cclxuICBnZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/OiBBcGlSZXNwb25zZSwgZGVmYXVsdE1zZzogc3RyaW5nID0gdCgndGlwcy5uZXR3b3JrRXJyb3InKSkge1xyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5jb2RlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gZGVmYXVsdE1zZztcclxuICAgIH1cclxuICAgIGNvbnN0IGtleSA9IEVycm9yTXNnW3Jlc3BvbnNlPy5jb2RlXVxyXG4gICAgbGV0IG1zZyA9IHQoJ3RpcHMuJyArIGtleSlcclxuICAgIGlmIChtc2cpIHtcclxuICAgICAgcmV0dXJuIG1zZztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVmYXVsdE1zZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYvuekuumUmeivr+S/oeaBr1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHJlc3BvbnNlIOmUmeivr+WTjeW6lO+8jOWPr+S7peaYr+Wtl+espuS4suaIlkVycm9yTXNn5a+56LGhXHJcbiAgICovXHJcbiAgc2hvd0Vycm9yKHJlc3BvbnNlOiBBcGlNc2cpIHtcclxuICAgIGNvbnN0IG1zZyA9IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5yZXNwb25zZSk7XHJcbiAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKG1zZyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICog5qOA5p+l5LuK5pel5YWN5bm/5ZGK54q25oCBXHJcbiAgICogQHJldHVybnMg5YyF5ZCr5YWN5bm/5ZGK5qyh5pWw55qE5ZON5bqU5pWw5o2uXHJcbiAgICovXHJcbiAgYXN5bmMgaXNBZEZyZWUoKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8QWRGcmVlUmVzcG9uc2U+KFxyXG4gICAgICAnL2FkZnJlZScsXHJcbiAgICAgIHt9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfSAvLyDpnIDopoF0b2tlbuiupOivgVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDAgJiYgcmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+WFjeW5v+WRiueKtuaAgTonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhLnRvZGF5X2FkX2ZyZWUpO1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UucmVzcG9uc2UuZGF0YS50b2RheV9hZF9mcmVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ+iOt+WPluWFjeW5v+WRiueKtuaAgeWksei0pTonLCByZXNwb25zZSk7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICog6I635Y+W55So5oi35oyW55+/5L+h5oGvXHJcbiAgKiBAcmV0dXJucyDmjJbnn7/kv6Hmga/lk43lupRcclxuICAqL1xyXG4gIGFzeW5jIGdldE1pbmVJbmZvKCk6IFByb21pc2U8QXBpTXNnPE1pbmluZ0luZm9SZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8TWluaW5nSW5mb1Jlc3BvbnNlPihcclxuICAgICAgJy9nZXRtaW5laW5mbycsXHJcbiAgICAgIHt9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+iOt+WPluaMluefv+S/oeaBr+aIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmihuWPluaMluefv+WlluWKsVxyXG4gICAqIEBwYXJhbSBhZGRyIOmSseWMheWcsOWdgFxyXG4gICAqIEByZXR1cm5zIOWlluWKsemihuWPlue7k+aenFxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE1pbmVSZXdhcmQoYWRkcjogc3RyaW5nKTogUHJvbWlzZTxBcGlNc2c8TWluaW5nUmV3YXJkUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PE1pbmluZ1Jld2FyZFJlc3BvbnNlPihcclxuICAgICAgJy9nZXRtaW5lcmV3YXJkJyxcclxuICAgICAgeyBhZGRyIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6aKG5Y+W5oyW55+/5aWW5Yqx5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAqIOWcqOaMluefv+WGheeCueWHu+eci+W5v+WRiueahOaXtuWAmeS4iuaKpVxyXG4gKiBAcmV0dXJucyDkuIrmiqXnu5PmnpxcclxuICovXHJcbiAgYXN5bmMgcmVwb3J0TWluZVZpZGVvKCk6IFByb21pc2U8QXBpTXNnPEFwaVJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxBcGlSZXNwb25zZT4oXHJcbiAgICAgICcvcmVwb3J0bWluZXZpZGVvJyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5bm/5ZGK54K55Ye75LiK5oql5oiQ5YqfJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOaJp+ihjOaMluefv+aTjeS9nFxyXG4gICogQHJldHVybnMg5oyW55+/57uT5p6cXHJcbiAgKi9cclxuICBhc3luYyBtaW5pbmcoKTogUHJvbWlzZTxBcGlNc2c8TWluaW5nUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PE1pbmluZ1Jlc3BvbnNlPihcclxuICAgICAgJy9taW5pbmcnLFxyXG4gICAgICB7fSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfmjJbnn7/miJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICog6K6+572u5oyW55+/57+75YCNXHJcbiAqIEBwYXJhbSB0eXBlIOe/u+WAjeexu+Wei1xyXG4gKiBAcmV0dXJucyDnv7vlgI3mk43kvZznu5PmnpxcclxuICovXHJcbiAgYXN5bmMgbWluZXJld2FyZGRvdWJsZSh0eXBlOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxNaW5lUmV3YXJkRG91YmxlUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PE1pbmVSZXdhcmREb3VibGVSZXNwb25zZT4oXHJcbiAgICAgICcvbWluZXJld2FyZGRvdWJsZScsXHJcbiAgICAgIHsgdDogdHlwZSB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDAgJiYgcmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+aMluefv+e/u+WAjeiuvue9ruaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog6I635Y+W5oyW55+/6YKA6K+35YiX6KGoXHJcbiAgKiBAcmV0dXJucyDljIXlkKvmjJbnn7/pgoDor7fliJfooajnmoTlk43lupRcclxuICAqL1xyXG4gIGFzeW5jIGdldG1pbmVpbnZpdGVsaXN0KCk6IFByb21pc2U8QXBpTXNnPE1pbmVJbnZpdGVMaXN0UmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PE1pbmVJbnZpdGVMaXN0UmVzcG9uc2U+KFxyXG4gICAgICAnL2dldG1pbmVpbnZpdGVsaXN0JyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5oyW55+/6YKA6K+35YiX6KGo6I635Y+W5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEubGlzdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOiOt+WPluS7o+eQhuW5v+WRiumFjee9rlxyXG4gICogQHBhcmFtIGludml0ZXIg5b2T5YmN546p5a6255qE6YKA6K+36ICFSURcclxuICAqIEByZXR1cm5zIOS7o+eQhuW5v+WRiumFjee9ruWIl+ihqFxyXG4gICovXHJcbiAgYXN5bmMgZ2V0QWdlbnRBZENvbmZpZyhpbnZpdGVyOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxBZ2VudEFkQ29uZmlnUmVzcG9uc2U+PiB7XHJcbiAgICBpZiAoIWludml0ZXIpIHtcclxuICAgICAgcmV0dXJuIHsgc3RhdHVzOiA0MDAsIG1lc3NhZ2U6ICcnLCByZXNwb25zZTogbnVsbCB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxBZ2VudEFkQ29uZmlnUmVzcG9uc2U+KFxyXG4gICAgICAnL2FnZW50YWRjb25maWcnLFxyXG4gICAgICB7IGludml0ZXIgfSxcclxuICAgICAgeyBhdXRoOiBmYWxzZSB9IC8vIOS4jemcgOimgeiupOivgVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+S7o+eQhuW5v+WRiumFjee9ruiOt+WPluaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybign6I635Y+W5Luj55CG5bm/5ZGK6YWN572u5aSx6LSlOicsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOiOt+WPlumCruS7tuWIl+ihqFxyXG4gICogQHBhcmFtIHBhZ2VObyDpobXnoIHvvIjku44w5byA5aeL77yJXHJcbiAgKiBAcGFyYW0gcGFnZVNpemUg5q+P6aG15pWw5o2u5pWw6YePXHJcbiAgKiBAcmV0dXJucyDpgq7ku7bliJfooajmlbDmja5cclxuICAqL1xyXG4gIGFzeW5jIGdldE1haWxMaXN0KFxyXG4gICAgcGFnZU5vOiBudW1iZXIgPSAwLFxyXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDE1XHJcbiAgKTogUHJvbWlzZTxBcGlNc2c8TWFpbExpc3RSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8TWFpbExpc3RSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0bWFpbCcsXHJcbiAgICAgIHsgcGFnZU5vLCBwYWdlU2l6ZSB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfSAvLyDpnIDopoHorqTor4FcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfpgq7ku7bliJfooajojrflj5bmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ+mCruS7tuWIl+ihqOiOt+WPluWksei0pTonLCByZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiDpmIXor7sv6aKG5Y+W6YKu5Lu2XHJcbiAgKiBAcGFyYW0gbWFpbElkIOmCruS7tklEXHJcbiAgKiBAcGFyYW0gc3RhdGUg5pON5L2c57G75Z6L77yaMT3pmIXor7vpgq7ku7bvvIwyPemihuWPluWlluWKse+8jDQ95Yig6Zmk6YKu5Lu2XHJcbiAgKiBAcmV0dXJucyDmk43kvZznu5PmnpzvvIjpooblj5blpZblirHml7bljIXlkKvnlKjmiLfmlbDmja7vvIlcclxuICAqL1xyXG4gIC8vIGFzeW5jIHJlYWRNYWlsKG1haWxJZDogbnVtYmVyLCBzdGF0ZTogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8UmVhZE1haWxSZXNwb25zZT4+IHtcclxuICAvLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8UmVhZE1haWxSZXNwb25zZT4oXHJcbiAgLy8gICAgICcvcmVhZG1haWwnLFxyXG4gIC8vICAgICB7IG1haWxfaWQ6IG1haWxJZCwgc3RhdGUgfSxcclxuICAvLyAgICAgeyBhdXRoOiB0cnVlIH0gLy8g6ZyA6KaB6K6k6K+BXHJcbiAgLy8gICApO1xyXG5cclxuICAvLyAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZygn6YKu5Lu25pON5L2c5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuXHJcbiAgLy8gICAgIC8vIOWmguaenOmihuWPluWlluWKseaIkOWKn++8jOabtOaWsOacrOWcsOeUqOaIt+aVsOaNrlxyXG4gIC8vICAgICBpZiAoc3RhdGUgPT09IDIgJiYgcmVzcG9uc2UucmVzcG9uc2UuZGF0YT8udXNlcmRhdGEpIHtcclxuICAvLyAgICAgICBHbG9iYWwuaW5zLnNldFVzZXJEYXRhKHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudXNlcmRhdGEpO1xyXG4gIC8vICAgICAgIEV2ZW50TWFuYWdlci5pbnMuZW1pdChFVkVOVF9OQU1FX0VOVU0uVVBEQVRFX01BSUwpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBjb25zb2xlLndhcm4oJ+mCruS7tuaTjeS9nOWksei0pTonLCByZXNwb25zZSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgLy8gfVxyXG5cclxuICAvKipcclxuICAqIOiOt+WPluaNoumHj+S7u+WKoeWIl+ihqFxyXG4gICogQHJldHVybnMg5o2i6YeP5Lu75Yqh5YiX6KGoXHJcbiAgKi9cclxuICBhc3luYyBnZXRFeGNoYW5nZVRhc2tMaXN0KCk6IFByb21pc2U8QXBpTXNnPEV4Y2hhbmdlVGFza0xpc3RSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8RXhjaGFuZ2VUYXNrTGlzdFJlc3BvbnNlPihcclxuICAgICAgJy9nZXRleGNoYW5nZXRhc2tsaXN0JyxcclxuICAgICAge30sIC8vIOepuuivt+axguS9k1xyXG4gICAgICB7IGF1dGg6IHRydWUgfSAvLyDpnIDopoHorqTor4FcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfmjaLph4/ku7vliqHliJfooajojrflj5bmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ+aNoumHj+S7u+WKoeWIl+ihqOiOt+WPluWksei0pTonLCByZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpgJrnn6XlrozmiJDmjaLph4/ku7vliqFcclxuICAgKiBAcGFyYW0gdGlkIOS7u+WKoUlEXHJcbiAgICogQHJldHVybnMg5pON5L2c57uT5p6cXHJcbiAgICovXHJcbiAgYXN5bmMgY29tcGxldGVFeGNoYW5nZVRhc2sodGlkOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxBcGlSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8QXBpUmVzcG9uc2U+KFxyXG4gICAgICAnL2NvbXBsZXRlZXhjaGFuZ2V0YXNrJyxcclxuICAgICAgeyB0aWQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH0gLy8g6ZyA6KaB6K6k6K+BXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhg5Lu75YqhICR7dGlkfSDlrozmiJDkuIrmiqXmiJDlip9gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybihg5Lu75YqhICR7dGlkfSDlrozmiJDkuIrmiqXlpLHotKU6YCwgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6aKG5Y+W5o2i6YeP5Lu75Yqh5aWW5YqxXHJcbiAgICogQHBhcmFtIHRpZCDku7vliqFJRFxyXG4gICAqIEByZXR1cm5zIOabtOaWsOWQjueahOeUqOaIt+aVsOaNrlxyXG4gICAqL1xyXG4gIGFzeW5jIGdldEV4Y2hhbmdlVGFza1Jld2FyZCh0aWQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPEV4Y2hhbmdlVGFza1Jld2FyZFJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxFeGNoYW5nZVRhc2tSZXdhcmRSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0ZXhjaGFuZ2V0YXNrcmV3YXJkJyxcclxuICAgICAgeyB0aWQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH0gLy8g6ZyA6KaB6K6k6K+BXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhg5Lu75YqhICR7dGlkfSDlpZblirHpooblj5bmiJDlip9gKTtcclxuICAgICAgLy8g5pu05paw5YWo5bGA55So5oi35pWw5o2uXHJcbiAgICAgIEdsb2JhbC5pbnMuc2V0VXNlckRhdGEocmVzcG9uc2UucmVzcG9uc2UuZGF0YS51c2VyZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3ljaHljIU9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAvKipcclxuICog6I635Y+W5ri45oiP6YWN572u5L+h5oGvXHJcbiAqXHJcbiAqIEByZXR1cm5zIOi/lOWbnuiOt+WPlueahOmFjee9ruS/oeaBr1xyXG4gKi9cclxuICBhc3luYyBnZXRDYXJkUGFja0NvbmZpZ3MoKTogUHJvbWlzZTxDYXJkUGFja0NvbmZpZ1Jlc3BvbnNlPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PENhcmRQYWNrQ29uZmlnUmVzcG9uc2U+KCcvZ2V0Y2FyZHBhY2tjb25maWcnLCBudWxsLCB7IGF1dGg6IGZhbHNlIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSA0MDApIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBHbG9iYWwuaW5zLmNhcmRQYWNrQ29uZmlnID0gcmVzcG9uc2UucmVzcG9uc2UuZGF0YTtcclxuICAgIGNvbnNvbGUubG9nKCdnZXRjYXJkcGFja2NvbmZpZyAgZ2V0Y2FyZHBhY2tjb25maWc6JywgR2xvYmFsLmlucy5jYXJkUGFja0NvbmZpZyk7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UucmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICogICAvLyDojrflj5bns7vliJfliJfooahcclxuICAgICogQHJldHVybnMg6I635Y+W57O75YiX5YiX6KGo57uT5p6cXHJcbiAgICAqL1xyXG4gIGFzeW5jIHNlcmllc0xpc3QoKTogUHJvbWlzZTxBcGlNc2c8Q2FyZExpc3RSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8Q2FyZExpc3RSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0c2VyaWVzbGlzdCcsXHJcbiAgICAgIHt9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+iOt+WPluezu+WIl+WIl+ihqOe7k+aenDonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICAqICDojrflj5bns7vliJfor6bmg4Ug5bimdG9rZW7vvIx7XCJzZXJpZXNfaWRcIjogMX0gIFxyXG4gICAgKiBAcmV0dXJucyDojrflj5bns7vliJfor6bmg4Xnu5PmnpxcclxuICAgICovXHJcbiAgYXN5bmMgc2VyaWVzRGV0YWlsKHNlcmllc19pZDogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8Q2FyZERldGFpbFJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxDYXJkRGV0YWlsUmVzcG9uc2U+KFxyXG4gICAgICAnL2dldHNlcmllc2RldGFpbCcsXHJcbiAgICAgIHsgc2VyaWVzX2lkIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6I635Y+W57O75YiX6K+m5oOF57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogICAvLyDojrflj5bnoo7niYfmlbDph49cclxuICAgKiBAcmV0dXJucyDojrflj5bnoo7niYfmlbDph4/nu5PmnpxcclxuICAgKi9cclxuICBhc3luYyBjYXJkRGVicmlzKCk6IFByb21pc2U8QXBpTXNnPENhcmREZWJyaXNSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8Q2FyZERlYnJpc1Jlc3BvbnNlPihcclxuICAgICAgJy9nZXRjYXJkZGVicmlzJyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6I635Y+W56KO54mH57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiAgIC8vIOiOt+WPluaUtuiXj+eahOezu+WIl1xyXG4gICogQHJldHVybnMg6I635Y+W5pS26JeP55qE57O75YiX57uT5p6cXHJcbiAgKi9cclxuICBhc3luYyBjb2xsZWN0ZWRTZXJpZXMoKTogUHJvbWlzZTxBcGlNc2c8Q29sbGVjdGVkU2VyaWVSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8Q29sbGVjdGVkU2VyaWVSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0Y29sbGVjdGVkc2VyaWVzJyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6I635Y+W5pS26JeP55qE57O75YiX57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiAgIC8vIOiOt+WPluaUtuiXj+eahOWNoeeJjFxyXG4gICogQHJldHVybnMg6I635Y+W5pS26JeP55qE5Y2h54mM57uT5p6cICAvZ2V0Y29sbGVjdGVkY2FyZHMgIOW4pnRva2Vu77yMe1wicGFnZU5vXCI6IDAsIFwicGFnZVNpemVcIjogMTV9ICAgLy8g6I635Y+W5pS26JeP55qE5Y2h54mMXHJcbiAgKi9cclxuICBhc3luYyBjb2xsZWN0ZWRDYXJkcyhwYWdlTm86IG51bWJlciA9IDAsIHBhZ2VTaXplOiBudW1iZXIgPSAxNSk6IFByb21pc2U8QXBpTXNnPENvbGxlY3RlZENhcmRzUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PENvbGxlY3RlZENhcmRzUmVzcG9uc2U+KFxyXG4gICAgICAnL2dldGNvbGxlY3RlZGNhcmRzJyxcclxuICAgICAgeyBwYWdlTm8sIHBhZ2VTaXplIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6I635Y+W5pS26JeP55qE5Y2h54mM57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqICAgLy8g6I635Y+W5oul5pyJ5Y2h5YyF55qE5YiX6KGoXHJcbiAgICAqIEByZXR1cm5zIOiOt+WPluaLpeacieWNoeWMheeahOWIl+ihqOe7k+aenCAgL2dldG93bmVkcGFja3NsaXN0ICDluKZ0b2tlbuWwseihjCAgLy8g6I635Y+W5oul5pyJ5Y2h5YyF55qE5YiX6KGoXHJcbiAgICAqL1xyXG4gIGFzeW5jIG93bmVkUGFja3NMaXN0KCk6IFByb21pc2U8QXBpTXNnPE93bmVkUGFja3NMaXN0UmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PE93bmVkUGFja3NMaXN0UmVzcG9uc2U+KFxyXG4gICAgICAnL2dldG93bmVkcGFja3NsaXN0JyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6I635Y+W5oul5pyJ5Y2h5YyF55qE5YiX6KGo57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqICDlvIDljIVcclxuICAgICogIHBhY2tfaWRcclxuICAgICogIGNvdW50XHJcbiAgICAqIEByZXR1cm5zIOW8gOWMhee7k+aenCBcclxuICAgICovXHJcbiAgYXN5bmMgb3BlbkNhcmRQYWNrcyhwYWNrX2lkOiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxPcGVuQ2FyZFBhY2tzUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PE9wZW5DYXJkUGFja3NSZXNwb25zZT4oXHJcbiAgICAgICcvb3BlbmNhcmRwYWNrcycsXHJcbiAgICAgIHsgcGFja19pZCwgY291bnQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCflvIDljIXliJfooajnu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICog5pS26JePXHJcbiAgICAqIOS8oHtcImNhcmRfaWRcIjog5Y2h54mHaWR9Ly8g5pS26JeP5Y2h54mMIO+8jOS8oHtcInNlcmllc19pZFwiOiDns7vliJdpZH0gIC8vIOaUtuiXj+ezu+WIl1xyXG4gICAgKiBpc1NlcmllczpudW1iZXIgMT3ns7vliJcgMD3ljaHniYdcclxuICAgICogQHJldHVybnMg5pS26JeP57uT5p6cIFxyXG4gICAgKi9cclxuICBhc3luYyBjYXJkQ29sbGVjdChpc1NlcmllczogbnVtYmVyLCBpZDogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8Q2FyZENvbGxlY3RSZXNwb25zZT4+IHtcclxuICAgIGxldCByZXNwb25zZSA9IG51bGw7XHJcbiAgICBpZiAoaXNTZXJpZXMgPT0gMSkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PENhcmRDb2xsZWN0UmVzcG9uc2U+KFxyXG4gICAgICAgICcvY2FyZHBhY2svY29sbGVjdCcsXHJcbiAgICAgICAgeyBzZXJpZXNfaWQ6IGlkIH0sXHJcbiAgICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8Q2FyZENvbGxlY3RSZXNwb25zZT4oXHJcbiAgICAgICAgJy9jYXJkcGFjay9jb2xsZWN0JyxcclxuICAgICAgICB7IGNhcmRfaWQ6IGlkIH0sXHJcbiAgICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+aUtuiXj+e7k+aenDonLCByZXNwb25zZS5yZXNwb25zZS5zdWNjZXNzKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDlj5bmtojmlLbol49cclxuICAgICog5Lyge1wiY2FyZF9pZFwiOiDljaHniYdpZH0vLyDlj5bmtojmlLbol4/ljaHniYwg77yM5Lyge1wic2VyaWVzX2lkXCI6IOezu+WIl2lkfSAvLyDlj5bmtojmlLbol4/ns7vliJdcclxuICAgICogQHJldHVybnMg5Y+W5raI5pS26JeP57uT5p6cIFxyXG4gICAgKi9cclxuICBhc3luYyBjYXJkVW5Db2xsZWN0KGlzU2VyaWVzOiBudW1iZXIsIGlkOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxDYXJkVW5Db2xsZWN0UmVzcG9uc2U+PiB7XHJcbiAgICBsZXQgcmVzcG9uc2UgPSBudWxsO1xyXG4gICAgaWYgKGlzU2VyaWVzID09IDEpIHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxDYXJkVW5Db2xsZWN0UmVzcG9uc2U+KFxyXG4gICAgICAgICcvY2FyZHBhY2svdW5jb2xsZWN0JyxcclxuICAgICAgICB7IHNlcmllc19pZDogaWQgfSxcclxuICAgICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxDYXJkVW5Db2xsZWN0UmVzcG9uc2U+KFxyXG4gICAgICAgICcvY2FyZHBhY2svdW5jb2xsZWN0JyxcclxuICAgICAgICB7IGNhcmRfaWQ6IGlkIH0sXHJcbiAgICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+WPlua2iOaUtuiXj+e7k+aenDonLCByZXNwb25zZS5yZXNwb25zZS5zdWNjZXNzKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDliIbop6PljaHniYxcclxuICAgKiAge1wiY2FyZF9pZFwiOiDljaHniYxpZCxcImNvdW50XCI6IOaVsOmHj30gIC8vIOWIhuino+WNoeeJjFxyXG4gICAqIEByZXR1cm5zIOWIhuino+e7k+aenCBcclxuICAgKi9cclxuICBhc3luYyBjYXJkRGVjb21wb3NlKGNhcmRfaWQ6IG51bWJlciwgY291bnQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPENhcmREZWNvbXBvc2VSZXNwb25zZT4+IHtcclxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PENhcmREZWNvbXBvc2VSZXNwb25zZT4oXHJcbiAgICAgICcvY2FyZHBhY2svZGVjb21wb3NlJyxcclxuICAgICAgeyBjYXJkX2lkOiBjYXJkX2lkLCBjb3VudDogY291bnQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfliIbop6PljaHniYznu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2Uuc3VjY2Vzcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICog5ZCI5oiQ5Y2h54mHXHJcbiAgICAqICB7XCJjYXJkX2lkXCI6IOWNoeeJh2lkfVxyXG4gICAgKiBAcmV0dXJucyDlkIjmiJDnu5PmnpwgXHJcbiAgICAqL1xyXG4gIGFzeW5jIGNhcmRDb21wb3NlKGNhcmRfaWQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPENhcmRDb21wb3NlUmVzcG9uc2U+PiB7XHJcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxDYXJkQ29tcG9zZVJlc3BvbnNlPihcclxuICAgICAgJy9jYXJkcGFjay9jb21wb3NlJyxcclxuICAgICAgeyBjYXJkX2lkOiBjYXJkX2lkIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5ZCI5oiQ57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLnN1Y2Nlc3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICog5Ye65ZSu5Y2h54mMXHJcbiAgKiB7XCJjYXJkX2lkXCI6IOWNoeeJjGlkLFwiY291bnRcIjog5pWw6YePfSAgICAgICAgLy8g5Ye65ZSu5Y2h54mMXHJcbiAgKiBAcmV0dXJucyDliIbop6Pnu5PmnpwgXHJcbiAgKi9cclxuICBhc3luYyBzZWxsQ2FyZChjYXJkX2lkOiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxTZWxsQ2FyZFJlc3BvbnNlPj4ge1xyXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8U2VsbENhcmRSZXNwb25zZT4oXHJcbiAgICAgICcvY2FyZHBhY2svc2VsbCcsXHJcbiAgICAgIHsgY2FyZF9pZDogY2FyZF9pZCwgY291bnQ6IGNvdW50IH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5Ye65ZSu5Y2h54mM57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLnN1Y2Nlc3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiDpooblj5bns7vliJflpZblirFcclxuICAqIHtcInNlcmllc19pZFwiOiDns7vliJdpZH0gLy/pooblj5bns7vliJflpZblirFcclxuICAqIEByZXR1cm5zIOmihuWPluezu+WIl+WlluWKsee7k+aenCBcclxuICAqL1xyXG4gIGFzeW5jIGdldFJld2FyZChzZXJpZXNfaWQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPEdldFJld2FyZFJlc3BvbnNlPj4ge1xyXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8R2V0UmV3YXJkUmVzcG9uc2U+KFxyXG4gICAgICAnL2NhcmRwYWNrL2dldHJld2FyZCcsXHJcbiAgICAgIHsgc2VyaWVzX2lkOiBzZXJpZXNfaWQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfpooblj5bns7vliJflpZblirHnu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDotK3kubDljaHljIVcclxuICAgKiBAcGFyYW0gc2t1aWQg5Y2h5YyFaWRcclxuICAgKiBAcGFyYW0gbnVtIOi0reS5sOaVsOmHj1xyXG4gICAqIEBwYXJhbSBvcmRlcl90eXBlIOiuouWNleexu+Wei++8jDM96LSt5Lmw5Y2h5YyFXHJcbiAgICogQHBhcmFtIHBheV90eXBlIOaUr+S7mOexu+Wei++8jFwidXNkXCLmiJZcImdhbWVfY29pblwiXHJcbiAgICogQHBhcmFtIHBheW1lbnRfZnJvbSDmnaXmupDvvIxcIuaIllwicGxheWRlY2tcIuaIllwiYXplblwi5oiWXCJhemVuLWFwcFwiXHJcbiAgICogQHJldHVybnMg5pSv5LuY6K6i5Y2V5L+h5oGvXHJcbiAgICovXHJcblxyXG4gIGFzeW5jIGJ1eUNhcmRQYWNrcyhza3VpZDogbnVtYmVyLCBudW06IG51bWJlciwgb3JkZXJfdHlwZTogbnVtYmVyID0gMywgcGF5X3R5cGU6IHN0cmluZywgcGF5bWVudF9mcm9tOiBzdHJpbmcpOiBQcm9taXNlPEFwaU1zZzxCdXlQcm9wUmVzcG9uc2U+PiB7XHJcbiAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICBza3VpZDogc2t1aWQsXHJcbiAgICAgIG51bTogbnVtLFxyXG4gICAgICBvcmRlcl90eXBlOiBvcmRlcl90eXBlLFxyXG4gICAgICBwYXlfdHlwZTogcGF5X3R5cGUsIC8vIFwidXNkXCLmiJZcImdhbWVfY29pblwiXHJcbiAgICAgIHBheW1lbnRfZnJvbTogXCJcIiAvLyBcIlwi5oiWXCJwbGF5ZGVja1wi5oiWXCJhemVuXCLmiJZcImF6ZW4tYXBwXCJcclxuICAgIH1cclxuICAgIGlmICh3aW5kb3c/LnBsYXlkZWNrSXNPcGVuKSB7XHJcbiAgICAgIHBhcmFtc1tcInBheW1lbnRfZnJvbVwiXSA9IFwicGxheWRlY2tcIlxyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxCdXlQcm9wUmVzcG9uc2U+KFxyXG4gICAgICAnL2J1eWNhcmRwYWNrcycsXHJcbiAgICAgIHBhcmFtcyxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfllYbln47ljaHljIXpgZPlhbforqLljZXliJvlu7rmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICAqIOi0reS5sOWNoeWMheaTjeS9nOa1geeoi+WwgeijhVxyXG4gICAgICogQHBhcmFtIHNrdWlkIOWNoeWMhWlkXHJcbiAgICogQHBhcmFtIG51bSDotK3kubDmlbDph49cclxuICAgKiBAcGFyYW0gb3JkZXJfdHlwZSDorqLljZXnsbvlnovvvIwzPei0reS5sOWNoeWMhVxyXG4gICAqIEBwYXJhbSBwYXlfdHlwZSDmlK/ku5jnsbvlnovvvIxcInVzZFwi5oiWXCJnYW1lX2NvaW5cIlxyXG4gICAqIEBwYXJhbSBwYXltZW50X2Zyb20g5p2l5rqQ77yMXCLmiJZcInBsYXlkZWNrXCLmiJZcImF6ZW5cIuaIllwiYXplbi1hcHBcIlxyXG4gICAqIEByZXR1cm5zIOaUr+S7mOiuouWNleS/oeaBr1xyXG4gICAgKi9cclxuICAvLyBhc3luYyBidXlDYXJkUGFja3NGdW4oc3VjY2Vzc0NhbGxiYWNrOiBGdW5jdGlvbiwgc2t1aWQ6IG51bWJlciwgbnVtOiBudW1iZXIsIG9yZGVyX3R5cGU6IG51bWJlciA9IDMsXHJcbiAgLy8gICBwYXlfdHlwZTogc3RyaW5nLCBwYXltZW50X2Zyb206IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG5cclxuICAvLyAgIGNvbnN0IGJ1eVJlc3VsdCA9IGF3YWl0IHRoaXMuYnV5Q2FyZFBhY2tzKHNrdWlkLCBudW0sIG9yZGVyX3R5cGUsIHBheV90eXBlLCBwYXltZW50X2Zyb20pO1xyXG4gIC8vICAgaWYgKGJ1eVJlc3VsdC5zdGF0dXMgIT0gMjAwIHx8ICFidXlSZXN1bHQucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAvLyAgICAgVUlNYW5hZ2VyLmlucy5zaG93VG9hc3QodChcInRpcHMub3JkZXJDcmVhdGVGYWlsZWRcIikpO1xyXG4gIC8vICAgICByZXR1cm47XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgLy8gICAgIGxldCBvaWQgPSBidXlSZXN1bHQucmVzcG9uc2UuZGF0YS5vcmRlci5vaWQ7XHJcbiAgLy8gICAgIGF3YWl0IEFwaVNlcnZpY2UuaW5zLmdldFB1cmNoYXNlZG9uZShvaWQpO1xyXG4gIC8vICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5wdXJjaGFzZVN1Y2Nlc3NcIikpO1xyXG4gIC8vICAgICByZXR1cm47XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgdHJ5IHtcclxuICAvLyAgICAgbGV0IHJzcCA9IGJ1eVJlc3VsdC5yZXNwb25zZTtcclxuICAvLyAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAvLyAgICAgICBHbG9iYWwuaW5zLnBheW1lbnQocnNwLmRhdGEub3JkZXIsIGFzeW5jIChzdGF0dXMpID0+IHtcclxuICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGB0ZyBzdGFyIHBheSBzdGF0dXMgOiR7c3RhdHVzfWApO1xyXG4gIC8vICAgICAgICAgY29uc3QgY2hlY2tGdW4gPSBhc3luYyAoY291bnQ6IG51bWJlcikgPT4ge1xyXG4gIC8vICAgICAgICAgICBjb25zdCBtID0gYXdhaXQgQXBpU2VydmljZS5pbnMuY2hlY2tPcmRlcihyc3AuZGF0YS5vcmRlci5vaWQpO1xyXG4gIC8vICAgICAgICAgICBpZiAobS5zdGF0dXMgPT09IDIwMCAmJiBtLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgICAgICAgICAgVUlNYW5hZ2VyLmlucy5zaG93VG9hc3QodChcInRpcHMucHVyY2hhc2VTdWNjZXNzXCIpKTtcclxuICAvLyAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soKTtcclxuICAvLyAgICAgICAgICAgICAvLyBBcGlTZXJ2aWNlLmlucy5nZXRVc2VyUHJvcGxpc3QoKTtcclxuICAvLyAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gIC8vICAgICAgICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgICAgICAgIGlmICgtLWNvdW50ID4gMCkge1xyXG4gIC8vICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrT3JkZXIgYWdhaW4nLCBjb3VudCk7XHJcbiAgLy8gICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwMCkpO1xyXG4gIC8vICAgICAgICAgICAgICAgYXdhaXQgY2hlY2tGdW4oY291bnQpO1xyXG4gIC8vICAgICAgICAgICAgIH1cclxuICAvLyAgICAgICAgICAgICBlbHNlIHtcclxuICAvLyAgICAgICAgICAgICAgIEFwaVNlcnZpY2UuaW5zLnNob3dFcnJvcihtKTtcclxuICAvLyAgICAgICAgICAgICB9XHJcbiAgLy8gICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgLy8gICAgICAgICAgIH1cclxuICAvLyAgICAgICAgIH1cclxuXHJcbiAgLy8gICAgICAgICBpZiAoc3RhdHVzID09PSBcInBhaWRcIikge1xyXG4gIC8vICAgICAgICAgICAvLyA0LiDnoa7orqTorqLljZXmlK/ku5jnirbmgIFcclxuICAvLyAgICAgICAgICAgLy/ov5nph4zlpITnkIbmo4Dmn6XorqLljZXvvIzor7fmsYJjaGVja29yZGVyXHJcbiAgLy8gICAgICAgICAgIGF3YWl0IGNoZWNrRnVuKDUpO1xyXG4gIC8vICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgZWxzZSB7XHJcbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKFwidGcgc3RhciBwYXkgc3RhdHVzIDpcIiArIHN0YXR1cyk7XHJcbiAgLy8gICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gIC8vICAgICAgICAgfVxyXG4gIC8vICAgICAgIH0pXHJcbiAgLy8gICAgIH0pO1xyXG5cclxuICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdoYW5kbGVQcm9wT3BlcmF0aW9uIGVycm9yJywgZXJyb3IpO1xyXG4gIC8vICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5wYXltZW50UGVuZGluZ1wiKSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG59Il19