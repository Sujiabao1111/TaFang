
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
    // showError(response: ApiMsg) {
    //   const msg = this.getErrorMessage(response?.response);
    //   UIManager.ins.showToast(msg);
    // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0Z1xcQXBpU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5REFBNkM7QUFDN0MsbUNBQWtDO0FBQ2xDLDJDQUFzQztBQUN0Qyx5Q0FBd0M7QUFDeEMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBaW5DbkMsWUFBWTtBQUNaLElBQVksU0FpRFg7QUFqREQsV0FBWSxTQUFTO0lBQ25CLHlDQUFRLENBQUE7SUFFUixhQUFhO0lBQ2IsK0RBQWUsQ0FBQTtJQUNmLFlBQVk7SUFDWiwyREFBYSxDQUFBO0lBQ2IsZ0JBQWdCO0lBQ2hCLGlFQUFnQixDQUFBO0lBQ2hCLGFBQWE7SUFDYiwrREFBZSxDQUFBO0lBQ2YsWUFBWTtJQUNaLG1FQUFpQixDQUFBO0lBQ2pCLGtCQUFrQjtJQUNsQixpRUFBZ0IsQ0FBQTtJQUNoQixhQUFhO0lBQ2IscUVBQWtCLENBQUE7SUFDbEIsWUFBWTtJQUNaLG1FQUFpQixDQUFBO0lBQ2pCLFlBQVk7SUFDWix1RUFBbUIsQ0FBQTtJQUNuQixXQUFXO0lBQ1gsOEVBQXNCLENBQUE7SUFDdEIsa0JBQWtCO0lBQ2xCLHNFQUFrQixDQUFBO0lBQ2xCLGFBQWE7SUFDYixzRUFBa0IsQ0FBQTtJQUNsQixXQUFXO0lBQ1gsa0VBQWdCLENBQUE7SUFDaEIsWUFBWTtJQUNaLGtFQUFnQixDQUFBO0lBQ2hCLGFBQWE7SUFDYiwwRUFBb0IsQ0FBQTtJQUNwQixZQUFZO0lBQ1osNERBQWEsQ0FBQTtJQUNiLGFBQWE7SUFDYiwwRUFBb0IsQ0FBQTtJQUNwQixZQUFZO0lBQ1osa0VBQWdCLENBQUE7SUFDaEIsYUFBYTtJQUNiLG9FQUFpQixDQUFBO0lBQ2pCLGFBQWE7SUFDYixrRUFBZ0IsQ0FBQTtJQUNoQixhQUFhO0lBQ2Isd0VBQW1CLENBQUE7SUFDbkIsYUFBYTtJQUNi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UUFBUSxHQUFHLFNBSWhCO3dCQUVELFVBQUksUUFBUSxDQUFDLFFBQVEsMENBQUUsT0FBTyxFQUFFOzRCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUN0RDt3QkFDRCxzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDakI7SUF2Z0RELGlFQUFpRTtJQUNqRSx3REFBd0Q7SUFDeEQsNkRBQTZEO0lBRTdDLGVBQUksR0FBRyxLQUFLLENBQUM7SUF5a0QvQixpQkFBQztDQS9rREQsQUEra0RDLElBQUE7QUEva0RZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xyXG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xyXG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tIFwiLi9HbG9iYWxcIjtcclxuaW1wb3J0IEh0dHBDbGllbnQgZnJvbSBcIi4vSHR0cENsaWVudFwiO1xyXG5pbXBvcnQgeyBXYWxsZXRNZ3IgfSBmcm9tIFwiLi9XYWxsZXRNZ3JcIjtcclxuY29uc3QgVGVsZWdyYW0gPSB3aW5kb3dbXCJUZWxlZ3JhbVwiXVxyXG5cclxuXHJcbi8vI3JlZ2lvbiDmjqXlj6PlrprkuYlcclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gIC8qKlxyXG4gICAqIOaOpeWPo+WTjeW6lOaVsOaNrue7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBBcGlSZXNwb25zZSB7XHJcbiAgICAvKiog6ZSZ6K+v56CBICovXHJcbiAgICBjb2RlPzogbnVtYmVyO1xyXG4gICAgLyoqIOi/lOWbnuaVsOaNriAqL1xyXG4gICAgZGF0YT86IGFueTtcclxuICAgIC8qKiDplJnor6/kv6Hmga8gKi9cclxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICAvKiog5piv5ZCm5oiQ5YqfICovXHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog55m75b2V5o6l5Y+j5ZON5bqU5pWw5o2u57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIExvZ2luUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBKV1Tku6TniYzlrZfnrKbkuLJcclxuICAgICAgICovXHJcbiAgICAgIGp3dDogc3RyaW5nO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIOeUqOaIt+i0puaIt+S/oeaBr1xyXG4gICAgICAgKi9cclxuICAgICAgdXNlcjogVXNlcjtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiDnlKjmiLfmuLjmiI/mlbDmja5cclxuICAgICAgICovXHJcbiAgICAgIHVzZXJkYXRhOiBVc2VyRGF0YTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiDnrb7liLDlpKnmlbBcclxuICAgICAgICovXHJcbiAgICAgIHJlY2VpdmVfZGF5OiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKiDov5Tlm57nlKjmiLfmlbDmja4gKi9cclxuICBpbnRlcmZhY2UgVXNlckRhdGFSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGNvZGU/OiBudW1iZXI7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHVzZXJkYXRhOiBVc2VyRGF0YTtcclxuICAgIH07XHJcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeUqOaIt+WfuuehgOS/oeaBr1xyXG4gICAqL1xyXG4gIGludGVyZmFjZSBVc2VyIHtcclxuICAgIC8qKlxyXG4gICAgICog55So5oi35pWw5o2u5bqTSURcclxuICAgICAqL1xyXG4gICAgaWQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW5s+WPsOaWueeUqOaIt0lEXHJcbiAgICAgKi9cclxuICAgIG9wZW5pZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YKA6K+3XHJcbiAgICAgKi9cclxuICAgIGludml0ZXI6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuaXtumXtChJU0/moLzlvI8pXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZXQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIOacgOWQjueZu+W9leaXtumXtChJU0/moLzlvI8pXHJcbiAgICAgKi9cclxuICAgIGxhc3RfbG9naW46IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmSseWMheWcsOWdgFxyXG4gICAgICovXHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjmiLflkI1cclxuICAgICAqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aS05YOPVVJMXHJcbiAgICAgKi9cclxuICAgIGF2YXRhcjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+G56CB5Y2g5L2N56ymKOWunumZheW6lOS4uuWKoOWvhuWAvClcclxuICAgICAqL1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogfOeUqOaIt+WcsOWMuizmoLzlvI865Zu95a62fOecgXzluIJ85Yy6fOacjeWKoeWZqOacjeWKoeWVhnws5L6L5a2QOumfqeWbvXwwfOmmluWwlHzpppblsJR85Lqa6ams6YCKfFxyXG4gICAgICovXHJcbiAgICBsYXN0cmVnaW9uOiBzdHJpbmc7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5ri45oiP6YWN572u5o6l5Y+j5ZON5bqU5pWw5o2u57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEdhbWVDb25maWdSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgY2ZnOiBHYW1lQ29uZmlnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ri45oiP6YWN572u5pWw5o2uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEdhbWVDb25maWcge1xyXG4gICAgLyoqXHJcbiAgICAgKiDnrrHlrZDphY3nva5cclxuICAgICAqL1xyXG4gICAgQm94Q29uZmlnczogeyBba2V5OiBzdHJpbmddOiBCb3hEYXRhIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrnlKjphY3nva5cclxuICAgICAqL1xyXG4gICAgQ29uZmlnOiBjb25maWdEYXRhO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZWG5ZOBU0tVXHJcbiAgICAgKi9cclxuICAgIFNrdXM6IHsgW2tleTogc3RyaW5nXTogU2t1RGF0YSB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pel5bi45Lu75Yqh6YWN572uXHJcbiAgICAgKi9cclxuICAgIERhaWx5Q2ZnOiBDZmdEYXRhW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvqrnjq/ku7vliqHphY3nva5cclxuICAgICAqL1xyXG4gICAgTG9vcENmZzogQ2ZnRGF0YVtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YGT5YW36YWN572uXHJcbiAgICAgKi9cclxuICAgIFByb3BDZmc6IHByb3BDZmdEYXRhW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5ZGo5Y2h5aWW5Yqx6YWN572uXHJcbiAgICAgICovXHJcbiAgICBDYXJkc1Jld2FyZENmZzoge1xyXG4gICAgICAxOiBjYXJkc1Jld2FyZENmZ0RhdGFbXVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaOkuihjOamnOmFjee9rlxyXG4gICAgICovXHJcbiAgICBSYW5rUmV3YXJkQ2ZnOiByYW5rQ2ZnRGF0YVtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOaOkuihjOamnOWlluWKsemFjee9ruaVsOaNrlxyXG4gICAgKi9cclxuICBpbnRlcmZhY2UgcmFua0NmZ0RhdGEge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICog5o6S6KGM5qac57Si5byVXHJcbiAgICAgKi9cclxuICAgIHJhbmtpZHg6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICog5o6S6KGM57G75Z6LIDHonrrkuJ3mppwgMuWFs+WNoeamnCAz6YKA6K+35qacXHJcbiAgICAgKi9cclxuICAgIHJhbmtfdHlwZTogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlpZblirHnsbvlnosgMeieuuS4nSAy566x5a2QIDPpkqXljJkgNOmBk+WFt1xyXG4gICAgICovXHJcbiAgICByZXdhcmRfdHlwZTogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDnrrHlrZDmiJbpkqXljJnmiJbpgZPlhbdpZFxyXG4gICAgICovXHJcbiAgICByZXdhcmRpZDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlpZblirHmlbDph49cclxuICAgICAqL1xyXG4gICAgcmV3YXJkbnVtOiBudW1iZXI7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOWRqOWNoeWlluWKsemFjee9ruaVsOaNrlxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBjYXJkc1Jld2FyZENmZ0RhdGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiDml6XmnJ9JRFxyXG4gICAgICovXHJcbiAgICBpZDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aWW5Yqx57G75Z6LIDHonrrkuJ0gMueuseWtkCAz6ZKl5YyZXHJcbiAgICAgKi9cclxuICAgIHJld2FyZF90eXBlOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpZblirHmlbDph49cclxuICAgICAqL1xyXG4gICAgcmV3YXJkX251bTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aWW5YqxSURcclxuICAgICAqL1xyXG4gICAgcmV3YXJkX2lkOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml7bpl7TmiLNcclxuICAgICAqL1xyXG4gICAgdDogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJmYWNlIENmZ0RhdGEge1xyXG4gICAgaWQ6IG51bWJlclxyXG4gICAgcmV3YXJkX2lkOiBudW1iZXJcclxuICAgIHJld2FyZF9udW06IG51bWJlclxyXG4gICAgcmV3YXJkX3R5cGU6IG51bWJlclxyXG4gICAgc29ydDogbnVtYmVyXHJcbiAgICB0OiBudW1iZXJcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmBk+WFt+mFjee9ruaVsOaNrlxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBwcm9wQ2ZnRGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIOmBk+WFt0lEXHJcbiAgICAgKi9cclxuICAgIGlkOiBudW1iZXIsXHJcbiAgICAvKipcclxuICAgICAqIOmBk+WFt+eahOaPj+i/sOS/oeaBr1xyXG4gICAgICovXHJcbiAgICBkZXNjOiBzdHJpbmdcclxuICAgIC8qKlxyXG4gICAgICog6YGT5YW355qE5Lu35qC8IOWNleS9jeS4uue+juWIhiDovazmmJ/mmJ/nrYnkuo46TWF0aC5mbG9vcihwcmljZSAvIDEwMCAvIDAuNDk1ICogMjUpXHJcbiAgICAgKi9cclxuICAgIHByaWNlOiBudW1iZXIsXHJcbiAgICAvKipcclxuICAgICAqIOmBk+WFt+eahOi/h+acn+aXtumXtFxyXG4gICAgICovXHJcbiAgICBleHBpcmU6IG51bWJlclxyXG4gICAgLyoqXHJcbiAgICAqIOmBk+WFt+eahOWbvuagh1xyXG4gICAgKi9cclxuICAgIGltZzogc3RyaW5nLFxyXG5cclxuICB9XHJcblxyXG4gIC8qKiDov5Tlm57mj5DnjrDmlbDmja4gKi9cclxuICBpbnRlcmZhY2UgU3VibWl0V2l0aGRyYXdSZXNwb25zZSBleHRlbmRzIFVzZXJEYXRhUmVzcG9uc2Uge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog566x5a2Q5pWw5o2uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEJveERhdGEge1xyXG4gICAgaWQ6IG51bWJlcixcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIHNjcmV3bmVlZDogbnVtYmVyLFxyXG4gICAgbWludG9uOiBudW1iZXIsXHJcbiAgICBtYXh0b246IG51bWJlcixcclxuICAgIGxldmVsOiBudW1iZXIsXHJcbiAgICBtaW50b25fc2hvdzogbnVtYmVyLFxyXG4gICAgbWF4dG9uX3Nob3c6IG51bWJlclxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YCa55So6YWN572u5pWw5o2uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIGNvbmZpZ0RhdGEge1xyXG4gICAgaWQ6IG51bWJlcixcclxuICAgIG1pbndpdGhkcmF3OiBudW1iZXIsXHJcbiAgICBwYXNzdmFsaWRhdGU6IG51bWJlcixcclxuICAgIGRhaWx5Y29pbjogbnVtYmVyLFxyXG4gICAgZGFpbHlib3gxOiBudW1iZXIsXHJcbiAgICBkYWlseWJveDI6IG51bWJlcixcclxuICAgIGRhaWx5Ym94MzogbnVtYmVyLFxyXG4gICAgZGFpbHlnYW1lY29pbjogbnVtYmVyLFxyXG4gICAgZnJlZV9nYW1lY29pbl9taW46IG51bWJlcixcclxuICAgIGZyZWVfZ2FtZWNvaW5fbWF4OiBudW1iZXIsXHJcbiAgICBkYWlseXNoYXJlX2dhbWVjb2luOiBudW1iZXIsXHJcbiAgICBkYWlseWludml0ZV9rZXkxOiBudW1iZXIsXHJcbiAgICBkYWlseWludml0ZV9rZXkyOiBudW1iZXIsXHJcbiAgICBkYWlseWludml0ZV9rZXkzOiBudW1iZXJcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWVhuWTgVNLVemFjee9ruaVsOaNrlxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBTa3VEYXRhIHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICB0OiBudW1iZXI7XHJcbiAgICBwcmljZTogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGVzYzogc3RyaW5nO1xyXG4gICAgcHJpY2VzdGFyOiBudW1iZXI7XHJcbiAgICBxdWV1ZTogbnVtYmVyO1xyXG4gICAgZGFpbHltaW46IG51bWJlcjtcclxuICAgIGRhaWx5bWF4OiBudW1iZXI7XHJcbiAgICBjYXRhbG9nOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDku7vliqHmlbDmja5cclxuICAgKi9cclxuICBpbnRlcmZhY2UgQ2ZnRGF0YSB7XHJcbiAgICAvKiog5byA5aeL5YWz5Y2hICovXHJcbiAgICBiZWdpbmxvb3A6IG51bWJlcixcclxuICAgIC8qKiDnu5PmnZ/lhbPljaEgKi9cclxuICAgIGVuZGxvb3A6IG51bWJlcixcclxuICAgIC8qKiDlpZblirEgW+exu+WeiyzmlbDph48s5qaC546HXSAqL1xyXG4gICAgcHJpemVfcHJvYjogbnVtYmVyW11cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWFs+WNoXRpY2tldOi/lOWbnuaVsOaNrlxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBUaWNrZXRSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGNvZGU/OiBudW1iZXI7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHRpY2tldDogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blhbPljaHlpZblirHov5Tlm57mlbDmja5cclxuICAgKi9cclxuICBpbnRlcmZhY2UgTHZQcml6ZVJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgY29kZT86IG51bWJlcjtcclxuICAgIGRhdGE6IEx2UHJpemVEYXRhO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWFs+WNoeWlluWKseaVsOaNrlxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBMdlByaXplRGF0YSB7XHJcbiAgICAvKiog5Y2h5YyF6YWN572u5L+h5oGvICovXHJcbiAgICBjYXJkcGFjaz86IENhcmRQYWNrQ29uZmlnSW5mbztcclxuICAgIC8qKiDmr4/ml6XlpZblirEgKi9cclxuICAgIGRhaWx5UHJpemVJbmZvOiBQcml6ZUluZm9bXTtcclxuICAgIC8qKiDlvqrnjq/lpZblirEgKi9cclxuICAgIGxvb3BQcml6ZUluZm86IFByaXplSW5mb1tdO1xyXG4gICAgLyoqIOeUqOaIt+aVsOaNriAqL1xyXG4gICAgdXNlcmRhdGE6IFVzZXJEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5aWW5Yqx5L+h5oGv5pWw5o2uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFByaXplSW5mbyB7XHJcbiAgICBUcDogbnVtYmVyO1xyXG4gICAgQW10OiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKiog5YWR5o2i6ZKl5YyZ5ZON5bqU57G75Z6LICovXHJcbiAgaW50ZXJmYWNlIEV4Y2hhbmdlQm94S2V5UmVzcG9uc2UgZXh0ZW5kcyBVc2VyRGF0YVJlc3BvbnNlIHtcclxuICB9XHJcblxyXG4gIC8qKiDlvIDlrp3nrrHlk43lupTnsbvlnosgKi9cclxuICBpbnRlcmZhY2UgT3BlbkJveFJlc3BvbnNlIGV4dGVuZHMgVXNlckRhdGFSZXNwb25zZSB7XHJcbiAgfVxyXG5cclxuICAvKiog6aKG5Y+W5ZGo5Y2h5q+P5pel5aWW5Yqx5ZON5bqU57G75Z6LICovXHJcbiAgaW50ZXJmYWNlIEdldENhcmREYWlseVJlc3BvbnNlIGV4dGVuZHMgVXNlckRhdGFSZXNwb25zZSB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHVzZXJkYXRhOiBVc2VyRGF0YSxcclxuICAgICAgcmV3YXJkczogUmV3YXJkRGF0YVtdLFxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIOetvuWIsOWkqeaVsFxyXG4gICAgICAgKi9cclxuICAgICAgcmVjZWl2ZV9kYXk6IG51bWJlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWlluWKseaVsOaNrue7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBSZXdhcmREYXRhIHtcclxuICAgIC8qKiDorqLljZXmlbDmja7lupNpZCAqL1xyXG4gICAgaWQ6IG51bWJlcixcclxuICAgIC8qKiDljaHnsbvlnosgKi9cclxuICAgIHQ6IG51bWJlcixcclxuICAgIC8qKiDlpZblirHnsbvlnosgMeieuuS4nSAy566x5a2QIDPpkqXljJkgKi9cclxuICAgIHJld2FyZF90eXBlOiBudW1iZXIsXHJcbiAgICAvKiog5aWW5YqxaWQg566x5a2QaWTmiJbogIXpkqXljJlpZCAqL1xyXG4gICAgcmV3YXJkX2lkOiBudW1iZXIsXHJcbiAgICAvKiog5aWW5Yqx5pWw6YePICovXHJcbiAgICByZXdhcmRfbnVtOiBudW1iZXIsXHJcbiAgICAvKiog6aKG5Y+W55qE5piv5bGe5LqO56ys5Yeg5aSp55qE5aWW5YqxICovXHJcbiAgICBzb3J0OiBudW1iZXJcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDliJvlu7rmlK/ku5jorqLljZXlk43lupTmlbDmja7nu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgUHVyY2hhc2VDcmVhdGVSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGNvZGU/OiBudW1iZXI7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG9yZGVyOiBQYXltZW50T3JkZXI7XHJcbiAgICB9O1xyXG4gICAgbWVzc2FnZT86IHN0cmluZztcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmlK/ku5jorqLljZXmlbDmja7nu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgUGF5bWVudE9yZGVyIHtcclxuICAgIC8qKiDorqLljZXmlbDmja7lupNpZCAqL1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIC8qKiDnlKjmiLdpZCAqL1xyXG4gICAgdWlkOiBudW1iZXI7XHJcbiAgICAvKiog6K6i5Y2VaWQgKi9cclxuICAgIG9pZDogc3RyaW5nO1xyXG4gICAgLyoqIOiuouWNleihjOS4ujEt6LSt5Y2hMi3lhbbku5YgKi9cclxuICAgIG9iOiBudW1iZXI7XHJcbiAgICAvKiog6K6i5Y2V5pWw5o2uKHNrdWlkKSAqL1xyXG4gICAgb3A6IHN0cmluZztcclxuICAgIC8qKiDorqLljZXnirbmgIExLeW3suWPkei1t+W+heWFheWAvDIt5bey5a6M5oiQMy3lt7LlpLHotKXlnKhgICovXHJcbiAgICBvczogbnVtYmVyO1xyXG4gICAgLyoqIOiuouWNleaUr+S7mOmTvuaOpSh0Z3N0YXIpICovXHJcbiAgICBsaW5rOiBzdHJpbmc7XHJcbiAgICAvKiog6K6i5Y2V5pSv5LuY5pe26Ze0ICovXHJcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XHJcblxyXG4gICAgdXNkOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmlK/ku5jmiJDlip/noa7orqTlk43lupTmlbDmja7nu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgUHVyY2hhc2VEb25lUmVzcG9uc2UgZXh0ZW5kcyBVc2VyRGF0YVJlc3BvbnNlIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOS7u+WKoeaVsOaNruaOpeWPo1xyXG4gICAqL1xyXG4gIGludGVyZmFjZSBUYXNrRGF0YSB7XHJcbiAgICAvKiog5Lu75YqhaWQgKi9cclxuICAgIGlkOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIOeugOS9k+S7u+WKoeaPj+i/sCAqL1xyXG4gICAgZGVzYzogc3RyaW5nO1xyXG4gICAgLyoqIOmYv+aLieS8r+ivreaPj+i/sCAqL1xyXG4gICAgZGVzY19hcjogc3RyaW5nO1xyXG4gICAgLyoqIOiLseivreaPj+i/sCAqL1xyXG4gICAgZGVzY19lbjogc3RyaW5nO1xyXG4gICAgLyoqIOWNsOWwvOivreaPj+i/sCAqL1xyXG4gICAgZGVzY19pZDogc3RyaW5nO1xyXG4gICAgLyoqIOS/hOivreaPj+i/sCAqL1xyXG4gICAgZGVzY19ydTogc3RyaW5nO1xyXG4gICAgLyoqIOazsOivreaPj+i/sCAqL1xyXG4gICAgZGVzY190aDogc3RyaW5nO1xyXG4gICAgLyoqIOe5geS9k+aPj+i/sCAqL1xyXG4gICAgZGVzY196aGhhbnQ6IHN0cmluZztcclxuXHJcbiAgICAvKiog5YiG5qCP57G75Z6LIDHmr4/ml6Xku7vliqEgMuekvuWMuuS7u+WKoSAqL1xyXG4gICAgY29sdW1uX3R5cGU6IG51bWJlcjtcclxuICAgIC8qKiDku7vliqHnsbvlnosgMeavj+aXpeS7u+WKoSAy5LiA5qyh5oCn5Lu75YqhICovXHJcbiAgICB0YXNrX3R5cGU6IG51bWJlcjtcclxuICAgIC8qKiDlpZblirHnsbvlnosgIDHonrrkuJ0gMueuseWtkCAz6ZKl5YyZICovXHJcbiAgICByZXdhcmRfdHlwZTogbnVtYmVyO1xyXG4gICAgLyoqIOWlluWKsWlkIOWmguaenHJld2FyZF90eXBlPTLmiJYzLOihqOekuueuseWtkGlk5ZKM6ZKl5YyZaWQgKi9cclxuICAgIHJld2FyZGlkOiBudW1iZXI7XHJcbiAgICAvKiog5aWW5Yqx5pWw6YePICovXHJcbiAgICByZXdhcmRudW06IG51bWJlcjtcclxuICAgIC8qKiDku7vliqHpnIDmsYLnsbvlnosgICovXHJcbiAgICB0YXNrX3JlcXVpcmVfdHlwZTogbnVtYmVyO1xyXG4gICAgLyoqIOS7u+WKoemcgOaxguasoeaVsCAqL1xyXG4gICAgdGFza19yZXF1aXJlOiBudW1iZXI7XHJcbiAgICAvKiog5Lu75Yqh6L+b5bqmICovXHJcbiAgICB0YXNrX3Byb2dyZXNzOiBudW1iZXI7XHJcbiAgICAvKiog5piv5ZCm5Y+v6aKG5Y+WIDHlj6/pooblj5YgMOS4jeWPr+mihuWPliAqL1xyXG4gICAgY2FuX3JlY2VpdmU6IG51bWJlcjtcclxuICAgIC8qKiDlm77moIcgKi9cclxuICAgIGljb246IHN0cmluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOS7u+WKoeWIl+ihqOWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBUYXNrTGlzdFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgY29kZT86IG51bWJlcjtcclxuICAgIGRhdGE6IFRhc2tEYXRhW107XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6aKG5Y+W5Lu75Yqh5aWW5Yqx5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFRhc2tSZXdhcmRSZXNwb25zZSBleHRlbmRzIFVzZXJEYXRhUmVzcG9uc2Uge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YKA6K+35aWW5Yqx6YWN572uXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEludml0ZVJld2FyZCB7XHJcblxyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIC8qKiDlpZblirHnsbvlnosgIDHonrrkuJ0gMueuseWtkCAz6ZKl5YyZICovXHJcbiAgICByZXdhcmRfdHlwZTogbnVtYmVyO1xyXG4gICAgLyoqIOWlluWKsWlkIOWmguaenHJld2FyZF90eXBlPTLmiJYzLOihqOekuueuseWtkGlk5ZKM6ZKl5YyZaWQgKi9cclxuICAgIHJld2FyZGlkOiBudW1iZXI7XHJcbiAgICAvKiog5aWW5Yqx5pWw6YePICovXHJcbiAgICByZXdhcmRudW06IG51bWJlcjtcclxuICAgIC8qKiDpnIDopoHpgoDor7fnmoTmlbDph48gKi9cclxuICAgIHJlcXVpcmVfdXNlcnM6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmCgOivt+S/oeaBr+WTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBJbnZpdGVJbmZvUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBjb2RlPzogbnVtYmVyO1xyXG4gICAgZGF0YToge1xyXG4gICAgICAvKiog5bey6YKA6K+35Lq65pWwICovXHJcbiAgICAgIGludml0ZWNudDogbnVtYmVyO1xyXG4gICAgICAvKiog5bey6aKG5Y+W5aWW5Yqx55qEaWQgKi9cclxuICAgICAgcmV3YXJkZWQ6IG51bWJlcltdO1xyXG4gICAgICAvKiog5aWW5Yqx5YiX6KGoICovXHJcbiAgICAgIHJld2FyZHM6IEludml0ZVJld2FyZFtdO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpooblj5bpgoDor7flpZblirHlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgSW52aXRlUmV3YXJkUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIC8qKiDlt7Lpooblj5blpZblirHnmoRpZCAqL1xyXG4gICAgICBpZDogbnVtYmVyO1xyXG4gICAgICByZXdhcmRlZDogbnVtYmVyW107XHJcbiAgICAgIC8qKiDojrflvpfnmoTlpZblirHmlbDmja4gW+WlluWKseexu+WeiyznrrHlrZDmiJbogIXpkqXljJlpZCzmlbDph49dIOexu+Wei++8mjHonrrkuJ0gMuWuneeusSAz6ZKl5YyZIDTpgZPlhbcgKi9cclxuICAgICAgcmV3YXJkczogbnVtYmVyW107XHJcbiAgICAgIHVzZXJkYXRhOiBVc2VyRGF0YTtcclxuICAgIH07XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YKA6K+3546p5a625YiX6KGo6aG5XHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEludml0ZVBsYXllciBleHRlbmRzIFVzZXIge1xyXG4gICAgLyoqIOmCgOivt+aXtumXtCAqL1xyXG4gICAgY3JlYXRldDogc3RyaW5nO1xyXG4gICAgLyoqIOmCgOivt+S6uklEICovXHJcbiAgICBpbnZpdGVyOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpgoDor7fliJfooajlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgSW52aXRlTGlzdFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YToge1xyXG4gICAgICBsaXN0OiBJbnZpdGVQbGF5ZXJbXTtcclxuICAgIH07XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuICAvKipcclxuICAgKiDliIbkuqvlpZblirHlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgU2hhcmVSZXdhcmRSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgZ290Y29pbjogbnVtYmVyO1xyXG4gICAgICAvLyB1c2VyZGF0YTogVXNlckRhdGE7XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWktOWDj+aVsOaNruWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBBdmF0YXJSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgZGF0YTogc3RyaW5nO1xyXG4gICAgICB0eXBlOiAnc3ZnJyB8ICdwbmcnO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmjpLooYzmppzmnaHnm67mlbDmja5cclxuICAgKi9cclxuICBpbnRlcmZhY2UgUmFua0l0ZW0ge1xyXG4gICAgLyoqICAqL1xyXG4gICAgdWlkPzogbnVtYmVyO1xyXG4gICAgLyoqIOWktOWDjyAqL1xyXG4gICAgYXZhdGFyPzogc3RyaW5nO1xyXG4gICAgLyoqIOaYteensCAqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgLyoqICAqL1xyXG4gICAgb3BlbmlkPzogc3RyaW5nO1xyXG4gICAgLyoqIOWIhuaVsCAqL1xyXG4gICAgc2NvcmU6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaOkuihjOamnOWTjeW6lOe7k+aehFxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBSYW5rUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIC8qKiDmjpLooYzmppzliJfooaggKi9cclxuICAgICAgbGlzdDogUmFua0l0ZW1bXTtcclxuICAgICAgLyoqIOeUqOaIt+iHquW3seeahOaOkuWQjSAqL1xyXG4gICAgICBteXJhbms6IG51bWJlcjtcclxuICAgICAgLyoqIOeUqOaIt+iHquW3seeahOWIhuaVsCAqL1xyXG4gICAgICBteXNjb3JlOiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaOkuihjOamnOWTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIFRhc2tub3RpZnlSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE/OiB7XHJcbiAgICAgIC8qKiB0eXBlPTEyKOS9v+eUqOW6lemDqOS4ieS4qumBk+WFtykvMTMo5L2/55So5aSN5rS7KeaIkOWKn+aXtuiOt+W+l+eahGF6ZW7luIHmlbDph48gKi9cclxuICAgICAgYXplbjogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICog6LSt5Lmw6YGT5YW35ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEJ1eVByb3BSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgb3JkZXI6IFBheW1lbnRPcmRlcjtcclxuICAgIH07XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5L2/55So6YGT5YW35ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFVzZVByb3BSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAqIOi0reS5sOmBk+WFt+WTjeW6lOe7k+aehFxyXG4gKi9cclxuICBpbnRlcmZhY2UgR2V0VXNlcnByb3BsaXN0IGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgLy8gZGF0YTogW3tcclxuICAgIC8vICAgXCJwcm9wX2lkXCI6IG51bWJlcjtcclxuICAgIC8vICAgXCJudW1cIjogbnVtYmVyO1xyXG4gICAgLy8gfV07XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qOA5p+l6K6i5Y2V54q25oCB5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIENoZWNrT3JkZXJSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDms6jlhozmtLvliqjlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgUmVnQWN0aXZpdHlSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blhY3otLnph5HluIHlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgRnJlZUdhbWVDb2luUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBjb2RlPzogbnVtYmVyO1xyXG4gICAgZGF0YToge1xyXG4gICAgICAvKiog5pys5qyh6I635Y+W55qE6YeR5biB5pWw6YePICovXHJcbiAgICAgIGdvdGNvaW46IG51bWJlcjtcclxuICAgICAgLyoqIOeUqOaIt+aVsOaNriAqL1xyXG4gICAgICB1c2VyZGF0YTogVXNlckRhdGE7XHJcbiAgICB9O1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaMluefv+S/oeaBr1xyXG4gICAqL1xyXG4gIGludGVyZmFjZSBNaW5pbmdJbmZvIHtcclxuICAgIC8qKiDnlKjmiLdJRCAqL1xyXG4gICAgdWlkOiBudW1iZXI7XHJcbiAgICAvKiog5b2T5YmN6L+b5bqmICovXHJcbiAgICBwb3dlcjogbnVtYmVyO1xyXG4gICAgLyoqIOS4i+asoeWPr+eci+W5v+WRiuaXtumXtCAqL1xyXG4gICAgdHM6IG51bWJlcjtcclxuICAgIC8qKiDmgLvov5vluqYgKi9cclxuICAgIG1heF9wb3dlcjogbnVtYmVyO1xyXG4gICAgLyoqIOWFi+iOt+W+l+eahOWlluWKsSAqL1xyXG4gICAgcmV3YXJkX251bTogbnVtYmVyO1xyXG4gICAgLyoqIOWlluWKseeahOW4geexu+Wei++8jHRvbuaIlnVzZHQgKi9cclxuICAgIGNvaW5fdHlwZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKiDlvZPliY3mjJbnn7/lpZblirHliqDlgI3nirbmgIEgMOaXoCAx5pmu6YCaIDLotoXnuqcgKi9cclxuICAgIGRvdWJsZV9zdGF0dXM6IG51bWJlcjtcclxuICAgIC8qKiAw5pyq6LaF57qn5Yqg5YCNIDHlt7Lkvb/nlKjotoXnuqfliqDlgI0gKi9cclxuICAgIHRvZGF5X3N1cGVyOiBudW1iZXI7XHJcbiAgICAvKiog5Li6MeihqOekuuW9k+WJjeWKoOWAjeeKtuaAgeS7juaZrumAmuWNh+e6p+WIsOi2hee6pyAqL1xyXG4gICAgYXV0b191cDogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5oyW55+/5L+h5oGv5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIE1pbmluZ0luZm9SZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IE1pbmluZ0luZm87XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oyW55+/5pON5L2c5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIE1pbmluZ1Jlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogTWluaW5nSW5mbztcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpooblj5bmjJbnn7/lpZblirHlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgTWluaW5nUmV3YXJkUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBNaW5pbmdJbmZvO1xyXG4gICAgcmV3YXJkbnVtOiBudW1iZXI7XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6+572u5oyW55+/57+75YCN5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIE1pbmVSZXdhcmREb3VibGVSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgLyoqIOe/u+WAjeexu+WeiyAqL1xyXG4gICAgICBkb3VibGVfc3RhdHVzOiBudW1iZXI7XHJcbiAgICAgIC8qKiDku4rml6XmmK/lkKblt7Lnu4/otoXnuqfliqDlgI0gKi9cclxuICAgICAgdG9kYXlfc3VwZXI6IG51bWJlcjtcclxuICAgIH07XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAgKiDmjJbnn7/pgoDor7fliJfooajpoblcclxuICAgICAqL1xyXG4gIGludGVyZmFjZSBNaW5lSW52aXRlSXRlbSB7XHJcbiAgICAvKiog55So5oi3SUQgKi9cclxuICAgIHVpZDogbnVtYmVyO1xyXG4gICAgLyoqIOaYteensCAqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgLyoqIOWktOWDjyAqL1xyXG4gICAgYXZhdGFyOiBzdHJpbmc7XHJcbiAgICAvKiog5piv5ZCm6YCa6L+H5byV5a+85YWz5Y2hICovXHJcbiAgICBwYXNzX2d1aWRlX3N0YWdlOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bmjJbnn7/pgoDor7fliJfooajlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgTWluZUludml0ZUxpc3RSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgLyoqIOmCgOivt+WIl+ihqCAqL1xyXG4gICAgICBsaXN0OiBNaW5lSW52aXRlSXRlbVtdO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlhY3lub/lkYrnirbmgIHlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgQWRGcmVlUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIC8qKiDku4rml6XlhY3lub/lkYrmrKHmlbAgKi9cclxuICAgICAgdG9kYXlfYWRfZnJlZTogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiDojrflj5bmuLjmiI/phY3nva7mjqXlj6Plk43lupTmlbDmja7nu5PmnoRcclxuICAqL1xyXG4gIGludGVyZmFjZSBDYXJkUGFja0NvbmZpZ1Jlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogQ2FyZFBhY2tDb25maWdJbmZvW11cclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOWNoeWMheezu+WIl+WTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIENhcmRMaXN0UmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBDYXJkTGlzdEluZm9bXTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG4gIC8qKlxyXG4gICog5Y2h5YyF5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQ2FyZERldGFpbFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogQ2FyZERldGFpbEluZm9bXTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICog5Y2h5YyF56KO54mH5ZON5bqU57uT5p6EXHJcbiAgICAqL1xyXG4gIGludGVyZmFjZSBDYXJkRGVicmlzUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBDYXJkRGVicmlzSW5mb1tdO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog6I635Y+W5pS26JeP55qE57O75YiX5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQ29sbGVjdGVkU2VyaWVSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IENhcmRMaXN0SW5mb1tdO1xyXG4gICAgc3VjY2VzczogYm9vbGVhbjtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiDojrflj5bmlLbol4/nmoTljaHniYflk43lupTnu5PmnoRcclxuICAqL1xyXG4gIGludGVyZmFjZSBDb2xsZWN0ZWRDYXJkc1Jlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogQ2FyZERldGFpbEluZm9bXTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOiOt+WPluaLpeacieWNoeWMheeahOWIl+ihqOWTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIE93bmVkUGFja3NMaXN0UmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBPd25lZFBhY2tzTGlzdEluZm9bXTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG4gIC8qKlxyXG4gICog6I635Y+W5oul5pyJ5Y2h5YyF55qE5YiX6KGo5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgT3BlbkNhcmRQYWNrc1Jlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogT3BlbkNhcmRQYWNrc0luZm9bXTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG4gIC8qKlxyXG4gICog5pS26JeP5Y2h5ZON5bqU57uT5p6EXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQ2FyZENvbGxlY3RSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOWPlua2iOaUtuiXj+WNoeWTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIENhcmRVbkNvbGxlY3RSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOWIhuino+WNoeeJh+WTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIENhcmREZWNvbXBvc2VSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOWQiOaIkOWNoeeJh+WTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIENhcmRDb21wb3NlUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuICAvKipcclxuICAqIOWHuuWUruWNoeeJh+WTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIFNlbGxDYXJkUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuICAvKipcclxuICAqIOmihuWPluezu+WIl+WlluWKseWTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIEdldFJld2FyZFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogQ2FyZFBhcmtSZXdhcmRJbmZvW107XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOWNoeWMhemFjee9ruS/oeaBr1xyXG4gICAqL1xyXG4gIGludGVyZmFjZSBDYXJkUGFja0NvbmZpZ0luZm8ge1xyXG4gICAgLyoqIGlkICovXHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgLyoqIOS7t+agvCAqL1xyXG4gICAgcHJpY2U6IG51bWJlcjtcclxuICAgIC8qKiBpY29uICovXHJcbiAgICBpY29uOiBzdHJpbmc7XHJcbiAgICAvKiogaW1nICovXHJcbiAgICBpbWc6IHN0cmluZztcclxuICAgIC8qKiDlkI3lrZcgKi9cclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIC8qKiDkv6Hmga8gKi9cclxuICAgIGluZm86IHN0cmluZztcclxuICAgIC8qKiBwdCAqL1xyXG4gICAgcHQ6IG51bWJlcjtcclxuICAgIC8qKiDlpZblirEgKi9cclxuICAgIHJld2FyZHM6IHN0cmluZztcclxuICAgIC8qKiDotZvlraNpZCAqL1xyXG4gICAgc2Vhc29uX2lkOiBudW1iZXI7XHJcbiAgICAvKiogdXNkICovXHJcbiAgICB1c2Q6IG51bWJlcjtcclxuICAgIC8qKiDlvIDlp4sgKi9cclxuICAgIHN0YXJ0X3RpbWU6IHN0cmluZztcclxuICAgIC8qKiDnu5PmnZ/ml7bpl7QgKi9cclxuICAgIGVuZF90aW1lOiBzdHJpbmc7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiDljaHljIXns7vliJfkv6Hmga9cclxuICAqL1xyXG4gIGludGVyZmFjZSBDYXJkTGlzdEluZm8ge1xyXG4gICAgLyoqIOezu+WIl2lkICovXHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgLyoqIOaYr+WQpuaUtuiXjyAgMDrmsqHmlLbol48gIDE65pS26JePICovXHJcbiAgICBpc19jb2xsZWN0ZWQ6IG51bWJlcjtcclxuICAgIC8qKiDlm77niYcgKi9cclxuICAgIGltZzogc3RyaW5nO1xyXG4gICAgLyoqIOezu+WIl+S/oeaBryAqL1xyXG4gICAgaW5mbzogc3RyaW5nO1xyXG4gICAgLyoqIOezu+WIl+WQjeensCAqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgLyoqIOWNoeWMhWlkICovXHJcbiAgICBwYWNraWQ6IG51bWJlcjtcclxuICAgIC8qKiDliJvlu7rml7bpl7QgKi9cclxuICAgIGNyZWF0ZV90aW1lOiBzdHJpbmc7XHJcbiAgICAvKiog6aKG5Y+W5aWW5YqxIDE65Y+v6aKG5Y+WICAwOuS4jeWPr+mihuWPliAgMjrlt7Lpooblj5YgKi9cclxuICAgIGdldGFsbDogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiDljaHor6bnu4bkv6Hmga9cclxuICAqL1xyXG4gIGludGVyZmFjZSBDYXJkRGV0YWlsSW5mbyB7XHJcbiAgICAvKiog57O75YiXaWQgKi9cclxuICAgIHNlcmllc19pZDogbnVtYmVyO1xyXG4gICAgLyoqIOWHuuWUruS7t+agvCAqL1xyXG4gICAgc2VsbF9wcmljZTogbnVtYmVyO1xyXG4gICAgLyoqIHJhcml0eTox5pmu6YCaIOS+neasoeexu+aOqCAqL1xyXG4gICAgcmFyaXR5OiBudW1iZXI7XHJcbiAgICAvKiogbnVtPTDlsLHmmK/msqHmi6XmnIkgKi9cclxuICAgIG51bTogbnVtYmVyO1xyXG4gICAgLyoqIOaYr+WQpuaUtuiXjyAgMDrmsqHmlLbol48gIDE65pS26JePICovXHJcbiAgICBpc19jb2xsZWN0ZWQ6IG51bWJlcjtcclxuICAgIC8qKiDns7vliJfmmK/lkKbmlLbol48gIDA65rKh5pS26JePICAxOuaUtuiXjyAqL1xyXG4gICAgaXNfY29sbGVjdGVkX3NlcmllczogbnVtYmVyO1xyXG4gICAgLyoqIOWbvueJhyAqL1xyXG4gICAgaW1hZ2VfdXJsOiBzdHJpbmc7XHJcbiAgICAvKiog5YiG6Kej6I635b6XICDlkIjmiJDmiYDpnIAg56KO54mH5pWw6YePICovXHJcbiAgICBkZWJyaXNfbnVtOiBudW1iZXI7XHJcbiAgICAvKiog5Y2h54mHaWQgKi9cclxuICAgIGNhcmRfaWQ6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog5Y2h5YyF57O75YiX5L+h5oGvXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQ2FyZERlYnJpc0luZm8ge1xyXG4gICAgLyoqIGlkICovXHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgLyoqIOeUqOaIt3VpZCAqL1xyXG4gICAgdWlkOiBudW1iZXI7XHJcbiAgICAvKiogcmFyaXR5OjHmma7pgJog5L6d5qyh57G75o6oICovXHJcbiAgICByYXJpdHk6IG51bWJlcjtcclxuICAgIC8qKiDmlbDph48gKi9cclxuICAgIG51bTogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAqIOWNoeWMheezu+WIl+S/oeaBr1xyXG4gKi9cclxuICBpbnRlcmZhY2UgQ2FyZFBhcmtSZXdhcmRJbmZvIHtcclxuICAgIC8qKiDlpZblirHnsbvlnovvvIwx6J665Lid77yMMuWuneeuse+8jDPpkqXljJkgKi9cclxuICAgIDA6IG51bWJlcjtcclxuICAgIC8qKiDlrp3nrrHmiJbpkqXljJlpZCAgMTrpnZLpk5wgIDI655m96ZO2ICAzOum7hOmHkSAgKi9cclxuICAgIDE6IG51bWJlcjtcclxuICAgIC8qKiDmlbDph48gKi9cclxuICAgIDI6IG51bWJlcjtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICog5Y2h5YyF57O75YiX5L+h5oGvXHJcbiAqL1xyXG4gIGludGVyZmFjZSBPd25lZFBhY2tzTGlzdEluZm8ge1xyXG4gICAgLyoqIGljb24gKi9cclxuICAgIGljb246IHN0cmluZztcclxuICAgIC8qKiBpbWcgKi9cclxuICAgIGltZzogc3RyaW5nO1xyXG4gICAgLyoqIGluZm8qL1xyXG4gICAgaW5mbzogc3RyaW5nO1xyXG4gICAgLyoqIG5hbWUqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgLyoqIG51bSAqL1xyXG4gICAgbnVtOiBudW1iZXI7XHJcbiAgICAvKiog5YyFaWQgKi9cclxuICAgIHBhY2tpZDogbnVtYmVyO1xyXG4gICAgLyoqIOmSu+efs+S7t+agvCAqL1xyXG4gICAgcHJpY2U6IG51bWJlcjtcclxuICAgIC8qKiDotZvlraNpZCAqL1xyXG4gICAgc2Vhc29uX2lkOiBudW1iZXI7XHJcbiAgICAvKiogdXNkICovXHJcbiAgICB1c2Q6IG51bWJlcjtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiDlvIDljaHljIXns7vliJfkv6Hmga9cclxuICAqL1xyXG4gIGludGVyZmFjZSBPcGVuQ2FyZFBhY2tzSW5mbyB7XHJcbiAgICAvKiog56KO54mH5pWw6YePICovXHJcbiAgICBkZWJyaXNfbnVtOiBudW1iZXI7XHJcbiAgICAvKiogaWQgKi9cclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICAvKiogaW1hZ2VfdXJsKi9cclxuICAgIGltYWdlX3VybDogc3RyaW5nO1xyXG4gICAgLyoqIG5hbWUqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgLyoqIHJhcml0eTox5pmu6YCaIOS+neasoeexu+aOqCAqL1xyXG4gICAgcmFyaXR5OiBudW1iZXI7XHJcbiAgICAvKiog5Ye65ZSu5Lu35qC8ICovXHJcbiAgICBzZWxsX3ByaWNlOiBudW1iZXI7XHJcbiAgICAvKiog57O75YiXaWQgKi9cclxuICAgIHNlcmllc19pZDogbnVtYmVyO1xyXG4gICAgLyoqIOi1m+Wto2lkICovXHJcbiAgICBzZWFzb25faWQ6IG51bWJlcjtcclxuICAgIC8qKiBjcmVhdGVfdGltZSAqL1xyXG4gICAgY3JlYXRlX3RpbWU6IHN0cmluZztcclxuICAgIC8qKiDmnYPph40gKi9cclxuICAgIHdlaWdodDogbnVtYmVyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICog5Luj55CG55qE5bm/5ZGK6YWN572uXHJcbiAgKi9cclxuICBpbnRlcmZhY2UgQWdlbnRBZENvbmZpZ0l0ZW0ge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIGFkX3R5cGU6IHN0cmluZztcclxuICAgIGFkX2lkOiBzdHJpbmc7XHJcbiAgICBkYWlsaV9pZDogbnVtYmVyO1xyXG4gICAgd2VpZ2h0OiBudW1iZXI7XHJcbiAgICBzdGF0ZTogbnVtYmVyO1xyXG4gIH1cclxuICAvKipcclxuICAqIOiOt+WPluS7o+eQhueahOW5v+WRiumFjee9ruWTjeW6lOe7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIEFnZW50QWRDb25maWdSZXNwb25zZSBleHRlbmRzIEFwaVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IEFnZW50QWRDb25maWdJdGVtW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOmCruS7tumhueaVsOaNrue7k+aehFxyXG4gICovXHJcbiAgaW50ZXJmYWNlIE1haWxJdGVtIHtcclxuICAgIC8qKiDpgq7ku7ZJRCAqL1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIC8qKiDnlKjmiLdJRCAqL1xyXG4gICAgdWlkOiBudW1iZXI7XHJcbiAgICAvKiog6YKu5Lu25qCH6aKYICovXHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgLyoqIOmCruS7tuWGheWuuSAqL1xyXG4gICAgY29udGVudDogc3RyaW5nO1xyXG4gICAgLyoqIOWlluWKseaVsOaNru+8iOS6jOe7tOaVsOe7hOWtl+espuS4su+8iSAqL1xyXG4gICAgcmV3YXJkczogc3RyaW5nIHwgbnVsbDtcclxuICAgIC8qKiDliJvlu7rml7bpl7QgKi9cclxuICAgIGNyZWF0ZXQ6IHN0cmluZztcclxuICAgIC8qKiDmm7TmlrDml7bpl7QgKi9cclxuICAgIHVwZGF0ZXQ6IHN0cmluZztcclxuICAgIC8qKiDnirbmgIHvvJow5pyq6K+7IDHlt7Lor7vmnKrpooblj5YgMuW3suivu+W3sumihuWPliA05Yig6ZmkICovXHJcbiAgICBzdGF0ZTogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YKu5Lu25YiX6KGo5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIE1haWxMaXN0UmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhOiBNYWlsSXRlbVtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6ZiF6K+76YKu5Lu25ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIFJlYWRNYWlsUmVzcG9uc2UgZXh0ZW5kcyBBcGlSZXNwb25zZSB7XHJcbiAgICBkYXRhPzoge1xyXG4gICAgICAvKiog5pu05paw5ZCO55qE55So5oi35pWw5o2u77yI6aKG5Y+W5aWW5Yqx5pe26L+U5Zue77yJICovXHJcbiAgICAgIHVzZXJkYXRhPzogVXNlckRhdGE7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5o2i6YeP5Lu75Yqh6aG55pWw5o2u57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEV4Y2hhbmdlVGFza0l0ZW0gZXh0ZW5kcyBUYXNrRGF0YSB7XHJcbiAgICAvKiog6Lez6L2s6ZO+5o6lICovXHJcbiAgICBqdW1wX3VybD86IHN0cmluZztcclxuXHJcbiAgICB1cGRhdGV0Pzogc3RyaW5nO1xyXG4gICAgY29tcGxldGU/OiBudW1iZXI7XHJcbiAgICBudW0/OiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmjaLph4/ku7vliqHliJfooajlk43lupTnu5PmnoRcclxuICAgKi9cclxuICBpbnRlcmZhY2UgRXhjaGFuZ2VUYXNrTGlzdFJlc3BvbnNlIGV4dGVuZHMgQXBpUmVzcG9uc2Uge1xyXG4gICAgZGF0YTogRXhjaGFuZ2VUYXNrSXRlbVtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6aKG5Y+W5o2i6YeP5Lu75Yqh5aWW5Yqx5ZON5bqU57uT5p6EXHJcbiAgICovXHJcbiAgaW50ZXJmYWNlIEV4Y2hhbmdlVGFza1Jld2FyZFJlc3BvbnNlIGV4dGVuZHMgVXNlckRhdGFSZXNwb25zZSB7XHJcbiAgICAvLyDnu6fmib/oh6ogVXNlckRhdGFSZXNwb25zZe+8jOW3suWMheWQqyB1c2VyZGF0YVxyXG4gIH1cclxufVxyXG5cclxuLy8jcmVnaW9uIOaemuS4vlxyXG5leHBvcnQgZW51bSBFcnJvckNvZGUge1xyXG4gIGlvdGEgPSAwLFxyXG5cclxuICAvKiog5pWw5o2u6Kej5p6Q6ZSZ6K+vICovXHJcbiAgRXJyb3JQYXJzZUVycm9yLFxyXG4gIC8qKiDmlbDmja7lupPplJnor68gKi9cclxuICBFcnJvclNRTEVycm9yLFxyXG4gIC8qKiDplJnor6/nmoRvcGVuaWQgKi9cclxuICBFcnJvck9wZW5pZEVycm9yLFxyXG4gIC8qKiDliJvlu7rnlKjmiLflpLHotKUgKi9cclxuICBFcnJvckNyZWF0ZVVzZXIsXHJcbiAgLyoqIOeUqOaIt+S4jeWtmOWcqCAqL1xyXG4gIEVycm9yVXNlck5vdEV4aXN0LFxyXG4gIC8qKiDliJvlu7rop5LoibJ0b2tlbuWksei0pSAqL1xyXG4gIEVycm9yQ3JlYXRlVG9rZW4sXHJcbiAgLyoqIOetvuWQjemqjOivgeWksei0pSAqL1xyXG4gIEVycm9yVmFsaWRhdGVFcnJvcixcclxuICAvKiog55So5oi35pyq55m75b2VICovXHJcbiAgRXJyb3JVc2VyTm90TG9naW4sXHJcbiAgLyoqIOmFjee9ruS4jeWtmOWcqCAqL1xyXG4gIEVycm9yQ29uZmlnTm90RXhpc3QsXHJcbiAgLyoqIOi1hOa6kOS4jei2syAqL1xyXG4gIEVycm9yUmVzb3VyY2VOb3RFbm91Z2gsXHJcbiAgLyoqIOacgOS9jiUuMmbmiY3lj6/ku6Xmj5DnjrAgKi9cclxuICBFcnJvckNvaW5Ob3RFbm91Z2gsXHJcbiAgLyoqIOWRqOWNoeetiee6p+S4jei2syAqL1xyXG4gIEVycm9yUmFua05vdEVub3VnaCxcclxuICAvKiog5bCa5pyq5a6e546wICovXHJcbiAgRXJyb3JOb3RJbXBsZXRlZCxcclxuICAvKiog5LuK5pel5bey6aKG5Y+WICovXHJcbiAgRXJyb3JBbHJlYWR5VGFrZSxcclxuICAvKiog5bey57uP6LSt5Lmw6K+l5Y2hICovXHJcbiAgRXJyb3JBbHJlYWR5SGF2ZVJhbmssXHJcbiAgLyoqIOacquaJvuWIsOiusOW9lSAqL1xyXG4gIEVycm9yTm90Zm91bmQsXHJcbiAgLyoqIOiuouWNleeKtuaAgemUmeivryAqL1xyXG4gIEVycm9yT3JkZXJTdGF0dVdyb25nLFxyXG4gIC8qKiDku4rml6Xlt7LliIbkuqsgKi9cclxuICBFcnJvclRvZGF5U2hhcmVkLFxyXG4gIC8qKiDojrflj5bliJfooajlpLHotKUgKi9cclxuICBFcnJvckR5bmFtaWNFcnJvcixcclxuICAvKiog5peg5rOV6aKG5Y+W5aWW5YqxICovXHJcbiAgRXJyb3JDbGFpbVJld2FyZCxcclxuICAvKiog5LiN6IO96YeN5aSN6LSt5LmwICovXHJcbiAgRXJyb3JSZXBlYXRQdXJjaGFzZSxcclxuICAvKiog5LiN6IO95L2/55So6YGT5YW3ICovXHJcbiAgRXJyb3JVc2VQcm9wLFxyXG4gIC8qKiDlub/lkYrkuK3pgJTpgIDlh7ogKi9cclxuICBFcnJvckFkRXhpdHNNaWR3YXksXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVycm9yTXNnIHtcclxuICAvKiog5LiN5pi+56S66ZSZ6K+vICovXHJcbiAgLy8gbnVsbCA9IDAsXHJcbiAgLyoqIOaVsOaNruino+aekOmUmeivryAqL1xyXG4gIEVycm9yUGFyc2VFcnJvclN0ciA9IDEsXHJcbiAgLyoqIOaVsOaNruW6k+mUmeivryAqL1xyXG4gIEVycm9yU1FMRXJyb3JTdHIgPSAyLFxyXG4gIC8qKiDplJnor6/nmoRvcGVuaWQgKi9cclxuICBFcnJvck9wZW5pZEVycm9yU3RyLFxyXG4gIC8qKiDliJvlu7rnlKjmiLflpLHotKUgKi9cclxuICBFcnJvckNyZWF0ZVVzZXJTdHIsXHJcbiAgLyoqIOeUqOaIt+S4jeWtmOWcqCAqL1xyXG4gIEVycm9yVXNlck5vdEV4aXN0U3RyLFxyXG4gIC8qKiDliJvlu7rop5LoibJ0b2tlbuWksei0pSAqL1xyXG4gIEVycm9yQ3JlYXRlVG9rZW5TdHIsXHJcbiAgLyoqIOetvuWQjemqjOivgeWksei0pSAqL1xyXG4gIEVycm9yVmFsaWRhdGVFcnJvclN0cixcclxuICAvKiog55So5oi35pyq55m75b2VICovXHJcbiAgRXJyb3JVc2VyTm90TG9naW5TdHIsXHJcbiAgLyoqIOmFjee9ruS4jeWtmOWcqCAqL1xyXG4gIEVycm9yQ29uZmlnTm90RXhpc3RTdHIsXHJcbiAgLyoqIOi1hOa6kOS4jei2syAqL1xyXG4gIEVycm9yUmVzb3VyY2VOb3RFbm91Z2hTdHIsXHJcbiAgLyoqIOacgOS9jiUuMmbmiY3lj6/ku6Xmj5DnjrAgKi9cclxuICBFcnJvckNvaW5Ob3RFbm91Z2hTdHIsXHJcbiAgLyoqIOWRqOWNoeetiee6p+S4jei2syAqL1xyXG4gIEVycm9yUmFua05vdEVub3VnaFN0cixcclxuICAvKiog5bCa5pyq5a6e546wICovXHJcbiAgRXJyb3JOb3RJbXBsZXRlZFN0cixcclxuICAvKiog5LuK5pel5bey6aKG5Y+WICovXHJcbiAgRXJyb3JBbHJlYWR5VGFrZVN0cixcclxuICAvKiog5bey57uP6LSt5Lmw6K+l5Y2hICovXHJcbiAgRXJyb3JBbHJlYWR5SGF2ZVJhbmtTdHIgPSAxNSxcclxuXHJcbiAgLyoqIOacquaJvuWIsOiusOW9lSAqL1xyXG4gIEVycm9yTm90Zm91bmRTdHIgPSAxNixcclxuICAvKiog6K6i5Y2V54q25oCB6ZSZ6K+vICovXHJcbiAgRXJyb3JPcmRlclN0YXR1V3JvbmdTdHIgPSAxNyxcclxuICAvKiog5LuK5pel5bey5YiG5LqrICovXHJcbiAgRXJyb3JUb2RheVNoYXJlZFN0ciA9IDE4LFxyXG4gIC8qKiDojrflj5bliJfooajlpLHotKUgKi9cclxuICBFcnJvckR5bmFtaWNFcnJvcixcclxuXHJcbiAgLyoqIOaXoOazlemihuWPluWlluWKsSAqL1xyXG4gIEVycm9yQ2xhaW1SZXdhcmRTdHIgPSAyMCxcclxuICAvKiog5LiN6IO96YeN5aSN6LSt5LmwICovXHJcbiAgRXJyb3JSZXBlYXRQdXJjaGFzZVN0ciA9IDIxLFxyXG4gIC8qKiDkuI3og73kvb/nlKjpgZPlhbcgKi9cclxuICBFcnJvclVzZVByb3BTdHIgPSAyMixcclxuICAvKiog5bm/5ZGK5Lit6YCU6YCA5Ye6ICovXHJcbiAgRXJyb3JBZEV4aXRzTWlkd2F5ID0gMjMsXHJcblxyXG59XHJcblxyXG4vKipcclxuICog5Lu75Yqh6YCa55+l57G75Z6LXHJcbiAqL1xyXG5leHBvcnQgZW51bSBUYXNrTm90aWZ5VHlwZSB7XHJcbiAgLyoqIOiuoumYhSAqL1xyXG4gIFN1YnNjcmliZSA9ICdzdWJzY3JpYmUnLFxyXG4gIC8qKiDliqDnvqQgKi9cclxuICBBZGRHcm91cCA9ICdhZGRncm91cCcsXHJcbiAgLyoqIOaKleelqCAqL1xyXG4gIFZvdGUgPSAndm90ZScsXHJcbiAgLyoqIOS9v+eUqOW6lemDqOS4ieS4qumBk+WFtyAqL1xyXG4gIGl0ZW0gPSAnMTInLFxyXG4gIC8qKiDkvb/nlKjlpI3mtLsgKi9cclxuICByZXZpdmUgPSAnMTMnLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBDaGFubmVsVHlwZSB7XHJcbiAgdG9uID0gJ3RvbicsXHJcbiAgYXplbiA9ICdhemVuJyxcclxufVxyXG5cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbi8vI3JlZ2lvbiBBUElcclxuXHJcbi8qKlxyXG4gKiDkuJrliqFBUEnmnI3liqHnsbvvvIzlsIHoo4XlhbfkvZPkuJrliqHmjqXlj6NcclxuICogQGNsYXNzXHJcbiAqIEBleGFtcGxlXHJcbiAqIGNvbnN0IGFwaSA9IG5ldyBBcGlTZXJ2aWNlKHtcclxuICogICBiYXNlVXJsOiAnaHR0cDovL2FwaS5leGFtcGxlLmNvbSdcclxuICogfSk7XHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2Uge1xyXG5cclxuICAvLyBwcml2YXRlIGJhc2VVcmw6IHN0cmluZyA9ICdodHRwczovL3NjcmV3aXQudmF6aGVuaW5hLmNvbS9hcGknO1xyXG4gIC8vIHByaXZhdGUgYmFzZVVybDogc3RyaW5nID0gJ2h0dHA6Ly8xOTIuMTY4LjIuMjU6MzU1OSc7XHJcbiAgLy8gcHJpdmF0ZSBiYXNlVXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly9jYXIudmF6aGVuaW5hLmNvbS9hcGknO1xyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgVEVTVCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgZ2V0IGJhc2VVcmwoKSB7XHJcbiAgICBpZiAoQXBpU2VydmljZS5URVNUKSB7IC8vIOa1i+ivlVxyXG4gICAgICByZXR1cm4gJ2h0dHBzOi8vY2FyLnZhemhlbmluYS5jb20vdGVzdGFwaSdcclxuICAgIH1cclxuICAgIHJldHVybiAnaHR0cHM6Ly9jYXIudmF6aGVuaW5hLmNvbS9hcGknO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSFRUUOWuouaIt+err+WunuS+i1xyXG4gICAqL1xyXG4gIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCA9IG5ldyBIdHRwQ2xpZW50KHtcclxuICAgIGJhc2VVcmw6IHRoaXMuYmFzZVVybFxyXG4gIH0pO1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBfaW5zOiBBcGlTZXJ2aWNlO1xyXG4gIHN0YXRpYyBnZXQgaW5zKCkge1xyXG4gICAgaWYgKCF0aGlzLl9pbnMpIHtcclxuICAgICAgdGhpcy5faW5zID0gbmV3IEFwaVNlcnZpY2UoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9pbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmnoTpgKDlh73mlbBcclxuICAgKlxyXG4gICAqIEBwYXJhbSBiYXNlVXJsIOWfuuehgFVSTFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKiDmmK/lkKbnmbvlvZUgKi9cclxuICBsb2dpbmVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog55So5oi355m75b2VXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3BlbklkIOeUqOaIt09wZW5JRFxyXG4gICAqIEBwYXJhbSBpbml0RGF0YSDliJ3lp4vljJbmlbDmja5cclxuICAgKiBAcGFyYW0gaWlkIOmCgOivt+iAheeahHVpZCAgICBcclxuICAgKiBAcmV0dXJucyDov5Tlm57ljIXlkKt0b2tlbueahOWvueixoVxyXG4gICAqL1xyXG4gIGFzeW5jIGxvZ2luKG9wZW5JZDogc3RyaW5nLCBpbml0RGF0YTogc3RyaW5nLCBpaWQ/OiBudW1iZXIsIGxvZ2luVHlwZT86IHN0cmluZyk6IFByb21pc2U8TG9naW5SZXNwb25zZT4ge1xyXG4gICAgb3BlbklkID0gU3RyaW5nKG9wZW5JZClcclxuICAgIC8vIGNvbnNvbGUubG9nKCdsb2dpbjonLCBvcGVuSWQsIGluaXREYXRhKTtcclxuICAgIGlmICghaWlkKSB7XHJcbiAgICAgIGlpZCA9IDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWlkID0gTnVtYmVyKGlpZCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PExvZ2luUmVzcG9uc2U+KCcvbG9naW50ZycsIHtcclxuICAgICAgb3Blbl9pZDogb3BlbklkLFxyXG4gICAgICBpaWQsXHJcbiAgICAgIGluaXRfZGF0YTogaW5pdERhdGEsXHJcbiAgICAgIGxvZ2luX3R5cGU6IGxvZ2luVHlwZSxcclxuICAgIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlPy5yZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICB0aGlzLmh0dHAuc2V0QXV0aFRva2VuKHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEuand0KTtcclxuICAgICAgR2xvYmFsLmlucy5yZWNlaXZlX2RheSA9IHJlc3BvbnNlLnJlc3BvbnNlPy5kYXRhPy5yZWNlaXZlX2RheTtcclxuICAgICAgLy8gR2xvYmFsLmlucy5pbml0UGxheWVyKHJlc3BvbnNlLmRhdGEudXNlciwgcmVzcG9uc2UuZGF0YS51c2VyZGF0YSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwi55m75b2V5oiQ5YqfXCIsIHJlc3BvbnNlKTtcclxuICAgICAgdGhpcy5sb2dpbmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIueZu+W9leWksei0pVwiLCByZXNwb25zZSk7XHJcbiAgICAgIHRoaXMubG9naW5lZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlLnJlc3BvbnNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAqXHJcbiAgICogQHJldHVybnMg6L+U5Zue55So5oi35L+h5oGv55qE5ZON5bqU5pWw5o2uXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0VXNlcmluZm8oaXNfdXBkYXRlX3VzZXI6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxVc2VyRGF0YVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PFVzZXJEYXRhUmVzcG9uc2U+KCcvZ2V0dXNlcmluZm8nLCBudWxsLCB7IGF1dGg6IHRydWUgfSk7XHJcbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2U/LnJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi35L+h5oGvXCIsIHJlc3BvbnNlKTtcclxuICAgICAgR2xvYmFsLmlucy5zZXRVc2VyRGF0YShyZXNwb25zZS5yZXNwb25zZS5kYXRhPy51c2VyZGF0YSwgaXNfdXBkYXRlX3VzZXIpO1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2U/LnJlc3BvbnNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi35L+h5oGv5aSx6LSlXCIsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPlua4uOaIj+mFjee9ruS/oeaBr1xyXG4gICAqXHJcbiAgICogQHJldHVybnMg6L+U5Zue6I635Y+W55qE6YWN572u5L+h5oGvXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0Q29uZmlncygpOiBQcm9taXNlPEdhbWVDb25maWdSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxHYW1lQ29uZmlnUmVzcG9uc2U+KCcvY29uZmlncycsIG51bGwsIHsgYXV0aDogZmFsc2UgfSk7XHJcbiAgICBjb25zb2xlLmxvZygnZ2V0Q29uZmlncyAgZ2FtZUNvbmZpZzonLCByZXNwb25zZSk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDQwMCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIEdsb2JhbC5pbnMuZ2FtZUNvbmZpZyA9IHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEuY2ZnO1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLnJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5o+Q5Lqk5o+Q546w6K+35rGCXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYW1vdW50IOaPkOeOsOmHkeminVxyXG4gICAqIEBwYXJhbSBjaGFubmVsIOaPkOeOsOa4oOmBk++8jOWPr+mAieWPguaVsO+8jOa4oOmBkyzkuI3kvKDmiJbogIXnqbrlrZfnrKbpu5jorqTkuLp0b25cclxuICAgKiBAcGFyYW0gd2FsbGV0QWRkcmVzcyDmj5DnjrDlnLDlnYBcclxuICAgKiBAcmV0dXJucyDmj5DkuqTnu5PmnpxcclxuICAgKi9cclxuICBhc3luYyBzdWJtaXRXaXRoZHJhdyhhbW91bnQ6IG51bWJlciwgY2hhbm5lbD86IENoYW5uZWxUeXBlKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PFN1Ym1pdFdpdGhkcmF3UmVzcG9uc2U+KCcvc3VibWl0d2l0aGRyYXcnLFxyXG4gICAgICB7IGE6IGFtb3VudCwgY2hhbm5lbCwgYWRkcjogV2FsbGV0TWdyLmlucy5nZXRBZGRyZXNzKCkgfSwgeyBhdXRoOiB0cnVlIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDAgJiYgcmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgR2xvYmFsLmlucy5zZXRVc2VyRGF0YShyZXNwb25zZS5yZXNwb25zZS5kYXRhLnVzZXJkYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57npajmja7kv6Hmga9cclxuICAgICovXHJcbiAgYXN5bmMgZ2V0VGlja2V0KGdpZDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PFRpY2tldFJlc3BvbnNlPignL29wZW5zdGFnZScsIHsgZ2lkIH0sIHsgYXV0aDogdHJ1ZSB9KTtcclxuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5yZXNwb25zZS5kYXRhPy50aWNrZXQpIHtcclxuICAgICAgR2xvYmFsLmlucy50aWNrZXQgPSByZXNwb25zZS5yZXNwb25zZS5kYXRhLnRpY2tldDtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudGlja2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVJTWFuYWdlci5pbnMuc2hvd1dpbmRvd1RpcHMoe1xyXG4gICAgLy8gICAvLyB0aXRsZTogdCgndGlwcy5uZXR3b3JrRXJyb3InKSxcclxuICAgIC8vICAgdGlwczogdGhpcy5nZXRFcnJvck1lc3NhZ2UocmVzcG9uc2UucmVzcG9uc2UpICsgJ1xcblxcbkNvZGU6JyArIHJlc3BvbnNlLnN0YXR1cyArICctJyArIGdpZCArICctJyArIEdsb2JhbC5pbnMudXNlckRhdGEuc3RhZ2UgKyAnLScgKyBHbG9iYWwuaW5zLmN1cl9nb3RfY29pbnMsXHJcbiAgICAvLyAgIHllc190ZXh0OiB0KCd0aXBzLnJldHJ5JyksXHJcbiAgICAvLyAgIHllc19jYjogYXN5bmMgKCkgPT4ge1xyXG4gICAgLy8gICAgIHRoaXMuZ2V0VGlja2V0KGdpZCk7XHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIG5vX3RleHQ6IHQoJ21haW4uYmFja0hvbWUnKSxcclxuICAgIC8vICAgbm9fY2I6ICgpID0+IHtcclxuICAgIC8vICAgICBVSU1hbmFnZXIuaW5zLmNsb3NlQWxsKCk7XHJcbiAgICAvLyAgICAgVUlNYW5hZ2VyLmlucy5zaG93VUkoXCJNZW51VUlcIiwgQlVORExFX1RZUEVfRU5VTS5HQU1FX1BMQVkpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KVxyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAqIOiOt+WPluWFs+WNoeWlluWKseS/oeaBr1xyXG4gKiBAcGFyYW0gZ2lkIOWFs+WNoWlkXHJcbiAqIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbiAgYXN5bmMgZ2V0THZQcml6ZShnaWQ6IG51bWJlciwgY2hlY2tfY29pbjogbnVtYmVyKSB7XHJcbiAgICBsZXQgdGlja2V0ID0gR2xvYmFsLmlucy50aWNrZXQ7XHJcbiAgICBpZiAoIXRpY2tldCkge1xyXG4gICAgICAvLyBHbG9iYWwuaW5zLnRpY2tldCA9IHRpY2tldCA9IGF3YWl0IHRoaXMuZ2V0VGlja2V0KEdsb2JhbERhdGEuY3VyX2x2bCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8THZQcml6ZVJlc3BvbnNlPignL3Bhc3NzdGFnZScsIHsgdGlja2V0LCBnaWQsIGNoZWNrX2NvaW4gfSwgeyBhdXRoOiB0cnVlIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDAgJiYgcmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgR2xvYmFsLmlucy5zZXRVc2VyRGF0YShyZXNwb25zZS5yZXNwb25zZS5kYXRhLnVzZXJkYXRhKTtcclxuICAgICAgR2xvYmFsLmlucy50aWNrZXQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gLyoqXHJcbiAgLy8gICog5YWR5o2i5a6d566x6ZKl5YyZXHJcbiAgLy8gICogQHBhcmFtIHR5cGUg5a6d566x57G75Z6LICjkvb/nlKhCb3hUeXBl5p6a5Li+KVxyXG4gIC8vICAqL1xyXG4gIC8vIGFzeW5jIGV4Y2hhbmdlQm94S2V5KHR5cGU6IEJveFR5cGUpOiBQcm9taXNlPEFwaU1zZzxFeGNoYW5nZUJveEtleVJlc3BvbnNlPj4ge1xyXG4gIC8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxFeGNoYW5nZUJveEtleVJlc3BvbnNlPihcclxuICAvLyAgICAgJy9leGNoYW5nZWJveGtleScsXHJcbiAgLy8gICAgIHsgdDogdHlwZSB9LFxyXG4gIC8vICAgICB7IGF1dGg6IHRydWUgfVxyXG4gIC8vICAgKTtcclxuXHJcbiAgLy8gICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgLy8gfVxyXG5cclxuICAvLyAvKipcclxuICAvLyAgKiDlvIDlkK/lrp3nrrFcclxuICAvLyAgKiBAcGFyYW0gdHlwZSDlrp3nrrHnsbvlnosgKOS9v+eUqEJveFR5cGXmnprkuL4pXHJcbiAgLy8gICovXHJcbiAgLy8gYXN5bmMgb3BlbkJveCh0eXBlOiBCb3hUeXBlKTogUHJvbWlzZTxBcGlNc2c8T3BlbkJveFJlc3BvbnNlPj4ge1xyXG4gIC8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxPcGVuQm94UmVzcG9uc2U+KFxyXG4gIC8vICAgICAnL29wZW5ib3gnLFxyXG4gIC8vICAgICB7IHQ6IHR5cGUgfSxcclxuICAvLyAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAvLyAgICk7XHJcbiAgLy8gICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgLy8gfVxyXG5cclxuICAvKipcclxuICAgKiDnu5HlrprpkrHljIVcclxuICAgKlxyXG4gICAqIEBwYXJhbSBhZGRyIOmSseWMheWcsOWdgFxyXG4gICAqIEByZXR1cm5zIOi/lOWbnui/nuaOpemSseWMheeahOWTjeW6lOe7k+aenFxyXG4gICAqL1xyXG4gIGFzeW5jIGJpbmRXYWxsZXQoYWRkcjogc3RyaW5nKTogUHJvbWlzZTxBcGlNc2c8SVJlc3BvbnNlRGF0YT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8SVJlc3BvbnNlRGF0YT4oJy9iaW5kd2FsbGV0Jywge1xyXG4gICAgICBhZGRyXHJcbiAgICB9LCB7IGF1dGg6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDop6Pnu5HpkrHljIVcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIOino+e7keaTjeS9nOeahOWTjeW6lOaVsOaNrlxyXG4gICAqL1xyXG4gIGFzeW5jIHVuYmluZFdhbGxldCgpOiBQcm9taXNlPEFwaU1zZzxJUmVzcG9uc2VEYXRhPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxJUmVzcG9uc2VEYXRhPignL3VuYmluZGluZ3dhbGxldCcsIHt9LCB7IGF1dGg6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvLyAvKipcclxuICAvLyAgKiDpooblj5bljaHmr4/ml6XlpZblirFcclxuICAvLyAgKiBAcGFyYW0gdHlwZSDljaHnsbvlnosgMeWRqOWNoTLmnIjljaEz5bm05Y2hXHJcbiAgLy8gICovXHJcbiAgLy8gYXN5bmMgY2FyZGRhaWx5KHR5cGU6IENhcmRUeXBlKTogUHJvbWlzZTxBcGlNc2c8R2V0Q2FyZERhaWx5UmVzcG9uc2U+PiB7XHJcbiAgLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEdldENhcmREYWlseVJlc3BvbnNlPihcclxuICAvLyAgICAgJy9jYXJkZGFpbHknLFxyXG4gIC8vICAgICB7IHQ6IHR5cGUgfSxcclxuICAvLyAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAvLyAgICk7XHJcbiAgLy8gICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gIC8vICAgICBHbG9iYWwuaW5zLnJlY2VpdmVfZGF5ID0gcmVzcG9uc2UucmVzcG9uc2UuZGF0YS5yZWNlaXZlX2RheTtcclxuICAvLyAgICAgR2xvYmFsLmlucy5zZXRVc2VyRGF0YShyZXNwb25zZS5yZXNwb25zZS5kYXRhLnVzZXJkYXRhKTtcclxuICAvLyAgIH1cclxuICAvLyAgIHJldHVybiByZXNwb25zZTtcclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWIm+W7uuaUr+S7mOiuouWNlVxyXG4gICAqIEBwYXJhbSBza3VpZCDllYblk4FTS1UgSURcclxuICAgKiBAcmV0dXJucyDmlK/ku5jorqLljZXkv6Hmga9cclxuICAgKi9cclxuICBhc3luYyBwdXJjaGFzZUNyZWF0ZShza3VpZDogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8UHVyY2hhc2VDcmVhdGVSZXNwb25zZT4+IHtcclxuICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgIHNrdWlkXHJcbiAgICB9O1xyXG4gICAgaWYgKHdpbmRvdz8ucGxheWRlY2tJc09wZW4pIHtcclxuICAgICAgcGFyYW1zW1wicGF5bWVudF9mcm9tXCJdID0gXCJwbGF5ZGVja1wiXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PFB1cmNoYXNlQ3JlYXRlUmVzcG9uc2U+KFxyXG4gICAgICAnL3B1cmNoYXNlY3JlYXRlJyxcclxuICAgICAgeyBza3VpZCB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+iuouWNleWIm+W7uuaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhLm9yZGVyKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOehruiupOaUr+S7mOaIkOWKn1xyXG4gICAqIEBwYXJhbSBpZCDorqLljZXmlbDmja7lupNJRFxyXG4gICAqIEBwYXJhbSBvcmRlcklkIOiuouWNleWtl+espuS4sklEXHJcbiAgICogQHJldHVybnMg5pu05paw5ZCO55qE6K6i5Y2V5L+h5oGv5Y+K55So5oi35pWw5o2uXHJcbiAgICovXHJcbiAgYXN5bmMgcHVyY2hhc2VEb25lKGlkOiBudW1iZXIsIG9yZGVySWQ6IHN0cmluZyk6IFByb21pc2U8QXBpTXNnPFB1cmNoYXNlRG9uZVJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxQdXJjaGFzZURvbmVSZXNwb25zZT4oXHJcbiAgICAgICcvcHVyY2hhc2Vkb25lJyxcclxuICAgICAge1xyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIG9yZGVyX2lkOiBvcmRlcklkXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCfmlK/ku5jnoa7orqQnLCByZXNwb25zZSk7XHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgLy8g5aaC5p6c6ZyA6KaB5pu05paw5pys5Zyw55So5oi35pWw5o2u5Y+v5Zyo5q2k5aSE55CGXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bku7vliqHliJfooahcclxuICAgKiBAcmV0dXJucyDku7vliqHmlbDmja7mlbDnu4RcclxuICAgKi9cclxuICBhc3luYyBnZXRUYXNrTGlzdCgpOiBQcm9taXNlPEFwaU1zZzxUYXNrTGlzdFJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxUYXNrTGlzdFJlc3BvbnNlPihcclxuICAgICAgJy90YXNrbGlzdCcsXHJcbiAgICAgIHt9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+S7u+WKoeWIl+ihqOiOt+WPluaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmihuWPluS7u+WKoeWlluWKsVxyXG4gICAqIEBwYXJhbSB0aWQg5Lu75YqhSURcclxuICAgKiBAcmV0dXJucyDmm7TmlrDlkI7nmoTnlKjmiLfmlbDmja5cclxuICAgKi9cclxuICBhc3luYyBjbGFpbVRhc2tSZXdhcmQodGlkOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxUYXNrUmV3YXJkUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PFRhc2tSZXdhcmRSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0dGFza3Jld2FyZCcsXHJcbiAgICAgIHsgdGlkIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5Lu75Yqh5aWW5Yqx6aKG5Y+W5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudXNlcmRhdGEpO1xyXG4gICAgICAvLyDlj6/lnKjmraTlpITmt7vliqDnlKjmiLfmlbDmja7mm7TmlrDpgLvovpFcclxuICAgICAgR2xvYmFsLmlucy5zZXRVc2VyRGF0YShyZXNwb25zZS5yZXNwb25zZS5kYXRhLnVzZXJkYXRhLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICog6I635Y+W6YKA6K+35L+h5oGvXHJcbiAgICAqIEByZXR1cm5zIOWMheWQq+mCgOivt+aVsOaNruWSjOWlluWKsemFjee9rueahOWTjeW6lFxyXG4gICAgKi9cclxuICBhc3luYyBnZXRJbnZpdGVJbmZvKCk6IFByb21pc2U8QXBpTXNnPEludml0ZUluZm9SZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8SW52aXRlSW5mb1Jlc3BvbnNlPihcclxuICAgICAgJy9nZXRpbnZpdGVpbmZvJyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6YKA6K+35L+h5oGv6I635Y+W5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6aKG5Y+W6YKA6K+35aWW5YqxXHJcbiAgICogQHBhcmFtIHJld2FyZElkIOWlluWKsemFjee9rklEXHJcbiAgICogQHJldHVybnMg5pu05paw5ZCO55qE55So5oi35pWw5o2uXHJcbiAgICovXHJcbiAgYXN5bmMgY2xhaW1JbnZpdGVSZXdhcmQocmV3YXJkSWQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPEludml0ZVJld2FyZFJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxJbnZpdGVSZXdhcmRSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0aW52aXRlcmV3YXJkJyxcclxuICAgICAgeyB0aWQ6IHJld2FyZElkIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6YKA6K+35aWW5Yqx6aKG5Y+W5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudXNlcmRhdGEpO1xyXG4gICAgICBHbG9iYWwuaW5zLnNldFVzZXJEYXRhKHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudXNlcmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W6YKA6K+3546p5a625YiX6KGoXHJcbiAgICogQHBhcmFtIHBhZ2VObyDpobXnoIHvvIjku44w5byA5aeL77yJXHJcbiAgICogQHBhcmFtIHBhZ2VTaXplIOavj+mhteaVsOmHj1xyXG4gICAqL1xyXG4gIGFzeW5jIGdldEludml0ZUxpc3QocGFnZU5vOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxJbnZpdGVMaXN0UmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEludml0ZUxpc3RSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0aW52aXRlbGlzdCcsXHJcbiAgICAgIHsgcGFnZU5vLCBwYWdlU2l6ZSB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+mCgOivt+WIl+ihqOiOt+WPluaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhLmxpc3QpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5LiK5oql5YiG5Lqr6KGM5Li66I635Y+W5aWW5YqxXHJcbiAgICogQHJldHVybnMg5YyF5ZCr6I635b6X55qE5ri45oiP5biB5ZKM55So5oi35pWw5o2uXHJcbiAgICovXHJcbiAgYXN5bmMgcmVwb3J0U2hhcmUoZ2lkPzogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8U2hhcmVSZXdhcmRSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8U2hhcmVSZXdhcmRSZXNwb25zZT4oXHJcbiAgICAgICcvYWZ0ZXJzaGFyZScsXHJcbiAgICAgIHsgZ2lkIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5YiG5Lqr5oiQ5YqfOicsIHJlc3BvbnNlKTtcclxuICAgICAgLy8gR2xvYmFsLmlucy5zZXRVc2VyRGF0YShyZXNwb25zZS5yZXNwb25zZS5kYXRhLnVzZXJkYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog6I635Y+W5o6S6KGM5qac5pWw5o2uXHJcbiAgKiBAcGFyYW0gcmFua1R5cGUg5o6S6KGM5qac57G75Z6L77yI5L2/55SoUmFua1R5cGXmnprkuL7vvIlcclxuICAqIEBwYXJhbSBwYWdlTm8g6aG156CB77yI5LuOMOW8gOWni++8iVxyXG4gICogQHBhcmFtIHBhZ2VTaXplIOavj+mhteaVsOmHj1xyXG4gICogQHJldHVybnMg5YyF5ZCr5o6S6KGM5qac5YiX6KGo5ZKM55So5oi35Liq5Lq65o6S5ZCN5pWw5o2uXHJcbiAgKi9cclxuICBhc3luYyBnZXRSYW5rTGlzdChcclxuICAgIC8vIHJhbmtUeXBlOiBSYW5rVHlwZSxcclxuICAgIHBhZ2VObzogbnVtYmVyLFxyXG4gICAgcGFnZVNpemU6IG51bWJlclxyXG4gICk6IFByb21pc2U8QXBpTXNnPFJhbmtSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8UmFua1Jlc3BvbnNlPihcclxuICAgICAgJy9yYW5rJyxcclxuICAgICAge1xyXG4gICAgICAgIC8vIHJhbmtfdHlwZTogcmFua1R5cGUsXHJcbiAgICAgICAgcGFnZU5vLFxyXG4gICAgICAgIHBhZ2VTaXplXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhg6I635Y+WJHtSYW5rVHlwZVtyYW5rVHlwZV195qac5oiQ5YqfYCwgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDkuIrmiqXku7vliqHlrozmiJDmg4XlhrXvvIjorqLpmIUv5Yqg576kL+aKleelqO+8iVxyXG4gICAqIEBwYXJhbSBub3RpZnlUeXBlIOmAmuefpeexu+WeiyBzdWJzY3JpYmUvYWRkZ3JvdXAvdm90ZS8xMijkvb/nlKjlupXpg6jkuInkuKrpgZPlhbcpLzEzKOS9v+eUqOWkjea0uykg5a2X56ym5LiyXHJcbiAgICovXHJcbiAgYXN5bmMgcmVwb3J0VGFza05vdGlmeShcclxuICAgIG5vdGlmeVR5cGU6IFRhc2tOb3RpZnlUeXBlLFxyXG4gICk6IFByb21pc2U8QXBpTXNnPFRhc2tub3RpZnlSZXNwb25zZT4+IHtcclxuICAgIGxldCB0aWNrZXQ7XHJcbiAgICBsZXQgZ2lkO1xyXG4gICAgc3dpdGNoIChub3RpZnlUeXBlKSB7XHJcbiAgICAgIGNhc2UgVGFza05vdGlmeVR5cGUuU3Vic2NyaWJlOlxyXG4gICAgICBjYXNlIFRhc2tOb3RpZnlUeXBlLkFkZEdyb3VwOlxyXG4gICAgICBjYXNlIFRhc2tOb3RpZnlUeXBlLlZvdGU6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gZ2lkID0gR2xvYmFsRGF0YS5jdXJfbHZsXHJcbiAgICAgICAgdGlja2V0ID0gR2xvYmFsLmlucy50aWNrZXQ7XHJcbiAgICAgICAgaWYgKCF0aWNrZXQpIHtcclxuICAgICAgICAgIC8vIEdsb2JhbC5pbnMudGlja2V0ID0gdGlja2V0ID0gYXdhaXQgdGhpcy5nZXRUaWNrZXQoR2xvYmFsRGF0YS5jdXJfbHZsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PHsgc3VjY2VzczogYm9vbGVhbiB9PihcclxuICAgICAgJy90YXNrbm90aWZ5JyxcclxuICAgICAge1xyXG4gICAgICAgIG9wZW5faWQ6IEdsb2JhbC5pbnMudXNlcj8ub3BlbmlkLFxyXG4gICAgICAgIHR5cGU6IFN0cmluZyhub3RpZnlUeXBlKSxcclxuICAgICAgICB0aWNrZXQsXHJcbiAgICAgICAgZ2lkLFxyXG4gICAgICB9LFxyXG4gICAgICB7IGF1dGg6IGZhbHNlIH0gLy8g5LiN6ZyA6KaB6K6k6K+BXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAgKiDotK3kubDpgZPlhbdcclxuICAgICogQHBhcmFtIHByb3BJZCDpgZPlhbdJRFxyXG4gICAgKiBAcmV0dXJucyDmlK/ku5jorqLljZXkv6Hmga9cclxuICAgICovXHJcbiAgYXN5bmMgYnV5UHJvcChwcm9wSWQ6IG51bWJlciwgc3RhZ2U6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPEJ1eVByb3BSZXNwb25zZT4+IHtcclxuICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgIHByb3BfaWQ6IHByb3BJZCxcclxuICAgICAgc3RhZ2VcclxuICAgIH1cclxuICAgIGlmICh3aW5kb3c/LnBsYXlkZWNrSXNPcGVuKSB7XHJcbiAgICAgIHBhcmFtc1tcInBheW1lbnRfZnJvbVwiXSA9IFwicGxheWRlY2tcIlxyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxCdXlQcm9wUmVzcG9uc2U+KFxyXG4gICAgICAnL2J1eXByb3AnLFxyXG4gICAgICBwYXJhbXMsXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6YGT5YW36K6i5Y2V5Yib5bu65oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEub3JkZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAgKiDotK3kubDpgZPlhbdcclxuICAgICogQHBhcmFtIHByb3BJZCDpgZPlhbdJRFxyXG4gICAgKiBAcmV0dXJucyDmlK/ku5jorqLljZXkv6Hmga9cclxuICAgICovXHJcbiAgYXN5bmMgbWFsbGJ1eVByb3AocHJvcElkOiBudW1iZXIsIG51bTogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8QnV5UHJvcFJlc3BvbnNlPj4ge1xyXG4gICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgcHJvcF9pZDogcHJvcElkLFxyXG4gICAgICBudW06IG51bVxyXG4gICAgfVxyXG4gICAgaWYgKHdpbmRvdz8ucGxheWRlY2tJc09wZW4pIHtcclxuICAgICAgcGFyYW1zW1wicGF5bWVudF9mcm9tXCJdID0gXCJwbGF5ZGVja1wiXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEJ1eVByb3BSZXNwb25zZT4oXHJcbiAgICAgICcvbWFsbGJ1eXByb3AnLFxyXG4gICAgICBwYXJhbXMsXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5ZWG5Z+O6YGT5YW36K6i5Y2V5Yib5bu65oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiDotK3kubDpgZPlhbfmk43kvZzmtYHnqIvlsIHoo4VcclxuICAqXHJcbiAgKiBAcGFyYW0gc3VjY2Vzc0NhbGxiYWNrIOaIkOWKn+Wbnuiwg1xyXG4gICogQHBhcmFtIHByb3BJZCDpgZPlhbdJRFxyXG4gICogQHBhcmFtIHN0YWdlIOWFs+WNoVxyXG4gICovXHJcbiAgLy8gYXN5bmMgYnV5UHJvcE9wZXJhdGlvbihzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBwcm9wSWQ6IFByb3BUeXBlLCBudW06IG51bWJlcikge1xyXG4gIC8vICAgY29uc3QgYnV5UmVzdWx0ID0gYXdhaXQgdGhpcy5tYWxsYnV5UHJvcChwcm9wSWQsIG51bSk7XHJcbiAgLy8gICBpZiAoYnV5UmVzdWx0LnN0YXR1cyAhPSAyMDAgfHwgIWJ1eVJlc3VsdC5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gIC8vICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5vcmRlckNyZWF0ZUZhaWxlZFwiKSk7XHJcbiAgLy8gICAgIHJldHVybjtcclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICBpZiAoQ0NfREVCVUcpIHtcclxuICAvLyAgICAgbGV0IG9pZCA9IGJ1eVJlc3VsdC5yZXNwb25zZS5kYXRhLm9yZGVyLm9pZDtcclxuICAvLyAgICAgYXdhaXQgQXBpU2VydmljZS5pbnMuZ2V0UHVyY2hhc2Vkb25lKG9pZCk7XHJcbiAgLy8gICAgIHN1Y2Nlc3NDYWxsYmFjaygpO1xyXG4gIC8vICAgICBBcGlTZXJ2aWNlLmlucy5nZXRVc2VyUHJvcGxpc3QoKTtcclxuICAvLyAgICAgVUlNYW5hZ2VyLmlucy5zaG93VG9hc3QodChcInRpcHMucHVyY2hhc2VTdWNjZXNzXCIpKTtcclxuICAvLyAgICAgcmV0dXJuO1xyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIHRyeSB7XHJcbiAgLy8gICAgIGxldCByc3AgPSBidXlSZXN1bHQucmVzcG9uc2U7XHJcbiAgLy8gICAgIGxldCB1cmwgPSByc3AuZGF0YS5vcmRlci5saW5rO1xyXG4gIC8vICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gIC8vICAgICAgIEdsb2JhbC5pbnMucGF5bWVudChyc3AuZGF0YS5vcmRlciwgYXN5bmMgKHN0YXR1cykgPT4ge1xyXG4gIC8vICAgICAgICAgY29uc29sZS5sb2coYHRnIHN0YXIgcGF5IHN0YXR1cyA6JHtzdGF0dXN9YCk7XHJcbiAgLy8gICAgICAgICBjb25zdCBjaGVja0Z1biA9IGFzeW5jIChjb3VudDogbnVtYmVyKSA9PiB7XHJcbiAgLy8gICAgICAgICAgIGNvbnN0IG0gPSBhd2FpdCBBcGlTZXJ2aWNlLmlucy5jaGVja09yZGVyKHJzcC5kYXRhLm9yZGVyLm9pZCk7XHJcbiAgLy8gICAgICAgICAgIGlmIChtLnN0YXR1cyA9PT0gMjAwICYmIG0ucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAvLyAgICAgICAgICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5wdXJjaGFzZVN1Y2Nlc3NcIikpO1xyXG4gIC8vICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjaygpO1xyXG4gIC8vICAgICAgICAgICAgIEFwaVNlcnZpY2UuaW5zLmdldFVzZXJQcm9wbGlzdCgpO1xyXG4gIC8vICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgLy8gICAgICAgICAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICAgICAgICAgaWYgKC0tY291bnQgPiAwKSB7XHJcbiAgLy8gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tPcmRlciBhZ2FpbicsIGNvdW50KTtcclxuICAvLyAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDAwKSk7XHJcbiAgLy8gICAgICAgICAgICAgICBhd2FpdCBjaGVja0Z1bihjb3VudCk7XHJcbiAgLy8gICAgICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgICAgIGVsc2Uge1xyXG4gIC8vICAgICAgICAgICAgICAgQXBpU2VydmljZS5pbnMuc2hvd0Vycm9yKG0pO1xyXG4gIC8vICAgICAgICAgICAgIH1cclxuICAvLyAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAvLyAgICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgfVxyXG5cclxuICAvLyAgICAgICAgIGlmIChzdGF0dXMgPT09IFwicGFpZFwiKSB7XHJcbiAgLy8gICAgICAgICAgIC8vIDQuIOehruiupOiuouWNleaUr+S7mOeKtuaAgVxyXG4gIC8vICAgICAgICAgICAvL+i/memHjOWkhOeQhuajgOafpeiuouWNle+8jOivt+axgmNoZWNrb3JkZXJcclxuICAvLyAgICAgICAgICAgYXdhaXQgY2hlY2tGdW4oNSk7XHJcbiAgLy8gICAgICAgICB9XHJcbiAgLy8gICAgICAgICBlbHNlIHtcclxuICAvLyAgICAgICAgICAgY29uc29sZS5sb2coXCJ0ZyBzdGFyIHBheSBzdGF0dXMgOlwiICsgc3RhdHVzKTtcclxuICAvLyAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgLy8gICAgICAgICB9XHJcbiAgLy8gICAgICAgfSlcclxuICAvLyAgICAgfSk7XHJcblxyXG4gIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coJ2hhbmRsZVByb3BPcGVyYXRpb24gZXJyb3InLCBlcnJvcik7XHJcbiAgLy8gICAgIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoXCJ0aXBzLnBheW1lbnRQZW5kaW5nXCIpKTtcclxuICAvLyAgIH1cclxuXHJcblxyXG4gIC8vIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPlueOqeWutui6q+S4iueahOmBk+WFt+WIl+ihqFxyXG4gICAqIEBwYXJhbSBwcm9wSWQg6YGT5YW3SURcclxuICAgKi9cclxuICAvLyBhc3luYyBnZXRVc2VyUHJvcGxpc3QoKTogUHJvbWlzZTxBcGlNc2c8R2V0VXNlcnByb3BsaXN0Pj4ge1xyXG4gIC8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxHZXRVc2VycHJvcGxpc3Q+KFxyXG4gIC8vICAgICAnL2dldHVzZXJwcm9wbGlzdCcsXHJcbiAgLy8gICAgIHt9LCAvLyDnqbror7fmsYLkvZNcclxuICAvLyAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAvLyAgICk7XHJcblxyXG4gIC8vICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgIEdsb2JhbC5pbnMucHJvcGxpc3QgPSByZXNwb25zZS5yZXNwb25zZS5kYXRhLnByb3BzO1xyXG4gIC8vICAgICBHbG9iYWwuaW5zLmdldFVzZXJQcm9wbGlzdCgpO1xyXG4gIC8vICAgICBFdmVudE1hbmFnZXIuaW5zLmVtaXQoRVZFTlRfTkFNRV9FTlVNLlVQREFURV9QUk9QTElTVCk7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKCfojrflj5bnjqnlrrbouqvkuIrnmoTpgZPlhbfliJfooag6JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgLy8gfVxyXG5cclxuICAvKipcclxuICAqIOiOt+WPlueOqeWutui6q+S4iueahOmBk+WFt+WIl+ihqFxyXG4gICogQHBhcmFtIG9yZGVyX2lkIOaUr+S7mOiuouWNleS/oeaBr1xyXG4gICogQHJldHVybnMgXHJcbiAgKi9cclxuICBhc3luYyBnZXRQdXJjaGFzZWRvbmUob3JkZXJfaWQpOiBQcm9taXNlPEFwaU1zZzxHZXRVc2VycHJvcGxpc3Q+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEdldFVzZXJwcm9wbGlzdD4oXHJcbiAgICAgICcvcHVyY2hhc2Vkb25lJyxcclxuICAgICAgeyBvcmRlcl9pZDogb3JkZXJfaWQgfSwgLy8g56m66K+35rGC5L2TXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAvLyAvKipcclxuICAvLyAgKiDnoa7orqTpgZPlhbfotK3kubDmiJDlip9cclxuICAvLyAgKiBAcGFyYW0gb3JkZXJJZCDorqLljZVJRFxyXG4gIC8vICAqL1xyXG4gIC8vIGFzeW5jIGNvbmZpcm1Qcm9wUHVyY2hhc2Uob3JkZXJJZDogc3RyaW5nKTogUHJvbWlzZTxBcGlNc2c8eyBzdWNjZXNzOiBib29sZWFuIH0+PiB7XHJcbiAgLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PHsgc3VjY2VzczogYm9vbGVhbiB9PihcclxuICAvLyAgICAgJy9idXlwcm9wZG9uZScsXHJcbiAgLy8gICAgIHsgb3JkZXJfaWQ6IG9yZGVySWQgfSxcclxuICAvLyAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAvLyAgICk7XHJcblxyXG4gIC8vICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKCfpgZPlhbfotK3kubDnoa7orqTmiJDlip8nKTtcclxuICAvLyAgIH1cclxuICAvLyAgIHJldHVybiByZXNwb25zZTtcclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiDveWQpuS9v+eUqOmBk+WFt1xyXG4gICAqIEBwYXJhbSBwcm9wSWQg6YGT5YW3SURcclxuICAgKi9cclxuICAvLyBhc3luYyBnZXRVc2VycHJvcChwcm9wSWQ6IFByb3BUeXBlID0gUHJvcFR5cGUuU2tpcFN0YWdlKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgLy8gICBjb25zdCBwYXlsb2FkOiBhbnkgPSB7IHByb3BfaWQ6IHByb3BJZCB9O1xyXG5cclxuICAvLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8VXNlUHJvcFJlc3BvbnNlPihcclxuICAvLyAgICAgJy9nZXR1c2VycHJvcCcsXHJcbiAgLy8gICAgIHBheWxvYWQsXHJcbiAgLy8gICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgLy8gICApO1xyXG5cclxuICAvLyAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwICYmIHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKCfpgZPlhbflj6/ku6Xkvb/nlKgnKTtcclxuICAvLyAgICAgcmV0dXJuIHRydWU7XHJcbiAgLy8gICB9XHJcbiAgLy8gICBjb25zb2xlLmxvZygn6YGT5YW35LiN5Y+v5Lul5L2/55SoJyk7XHJcbiAgLy8gICByZXR1cm4gZmFsc2U7XHJcbiAgLy8gfVxyXG4gIC8qKlxyXG4gICAqIOS9v+eUqOmBk+WFt1xyXG4gICAqIEBwYXJhbSBwcm9wSWQg6YGT5YW3SURcclxuICAgKiBAcGFyYW0gc3RhZ2Ug55uu5qCH5YWz5Y2h77yI5Y+v6YCJ77yJXHJcbiAgICovXHJcbiAgLy8gYXN5bmMgdXNlUHJvcChwcm9wSWQ6IFByb3BUeXBlLCBzdGFnZT86IG51bWJlcik6IFByb21pc2U8QXBpTXNnPFVzZVByb3BSZXNwb25zZT4+IHtcclxuICAvLyAgIGNvbnN0IHBheWxvYWQ6IGFueSA9IHsgcHJvcF9pZDogcHJvcElkLCBzdGFnZSB9O1xyXG4gIC8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxVc2VQcm9wUmVzcG9uc2U+KFxyXG4gIC8vICAgICAnL3VzZXByb3AnLFxyXG4gIC8vICAgICBwYXlsb2FkLFxyXG4gIC8vICAgICB7IGF1dGg6IHRydWUgfVxyXG4gIC8vICAgKTtcclxuXHJcbiAgLy8gICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coJ+mBk+WFt+S9v+eUqOaIkOWKnycpO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIC8vIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICog6YGT5YW35pON5L2c5rWB56iL5bCB6KOFXHJcbiAgKlxyXG4gICogQHBhcmFtIHN1Y2Nlc3NDYWxsYmFjayDmiJDlip/lm57osINcclxuICAqIEBwYXJhbSBwcm9wSWQg6YGT5YW3SURcclxuICAqIEBwYXJhbSBzdGFnZSDlhbPljaFcclxuICAqL1xyXG4gIC8vIGFzeW5jIGhhbmRsZVByb3BPcGVyYXRpb24oc3VjY2Vzc0NhbGxiYWNrOiBGdW5jdGlvbiwgcHJvcElkOiBQcm9wVHlwZSwgc3RhZ2U/OiBudW1iZXIpIHtcclxuICAvLyAgIHRyeSB7XHJcbiAgLy8gICAgIC8vIDEuIOWwneivleS9v+eUqOmBk+WFt1xyXG4gIC8vICAgICBjb25zdCBjYW5Vc2UgPSBhd2FpdCB0aGlzLmdldFVzZXJwcm9wKHByb3BJZCk7XHJcbiAgLy8gICAgIGlmIChjYW5Vc2UpIHtcclxuICAvLyAgICAgICBjb25zdCB1c2VSZXN1bHQgPSBhd2FpdCB0aGlzLnVzZVByb3AocHJvcElkLCBzdGFnZSk7XHJcbiAgLy8gICAgICAgaWYgKHVzZVJlc3VsdC5zdGF0dXMgPT0gMjAwICYmIHVzZVJlc3VsdC5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gIC8vICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKCk7XHJcbiAgLy8gICAgICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5wcm9wc3VjY2Vzc1wiKSk7XHJcbiAgLy8gICAgICAgICByZXR1cm47XHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICB9XHJcblxyXG5cclxuICAvLyAgICAgLy8gMi4g5L2/55So5aSx6LSl5pe25by55Ye656Gu6K6k56qX5Y+jXHJcbiAgLy8gICAgIFVJTWFuYWdlci5pbnMuc2hvd1dpbmRvd1RpcHMoe1xyXG4gIC8vICAgICAgIC8qKiDnoa7orqTmjInpkq7lm57osIMgKi9cclxuICAvLyAgICAgICB5ZXNfY2I6IGFzeW5jICgpID0+IHtcclxuICAvLyAgICAgICAgIC8vIDMuIOWIm+W7uui0reS5sOiuouWNlVxyXG4gIC8vICAgICAgICAgY29uc3QgYnV5UmVzdWx0ID0gYXdhaXQgdGhpcy5idXlQcm9wKHByb3BJZCwgc3RhZ2UpO1xyXG4gIC8vICAgICAgICAgaWYgKGJ1eVJlc3VsdC5zdGF0dXMgIT0gMjAwIHx8ICFidXlSZXN1bHQucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAvLyAgICAgICAgICAgVUlNYW5hZ2VyLmlucy5zaG93VG9hc3QodChcInRpcHMub3JkZXJDcmVhdGVGYWlsZWRcIikpO1xyXG4gIC8vICAgICAgICAgICByZXR1cm47XHJcbiAgLy8gICAgICAgICB9XHJcbiAgLy8gICAgICAgICB0cnkge1xyXG4gIC8vICAgICAgICAgICBsZXQgcnNwID0gYnV5UmVzdWx0LnJlc3BvbnNlO1xyXG4gIC8vICAgICAgICAgICBsZXQgdXJsID0gcnNwLmRhdGEub3JkZXIubGluaztcclxuICAvLyAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAvLyAgICAgICAgICAgICBHbG9iYWwuaW5zLnBheW1lbnQocnNwLmRhdGEub3JkZXIsIGFzeW5jIChzdGF0dXMpID0+IHtcclxuICAvLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0ZyBzdGFyIHBheSBzdGF0dXMgOiR7c3RhdHVzfWApO1xyXG5cclxuICAvLyAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrRnVuID0gYXN5bmMgKGNvdW50OiBudW1iZXIpID0+IHtcclxuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgbSA9IGF3YWl0IEFwaVNlcnZpY2UuaW5zLmNoZWNrT3JkZXIocnNwLmRhdGEub3JkZXIub2lkKTtcclxuICAvLyAgICAgICAgICAgICAgICAgaWYgKG0uc3RhdHVzID09PSAyMDAgJiYgbS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gIC8vICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoXCJ0aXBzLnB1cmNoYXNlU3VjY2Vzc1wiKSk7XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgLy8gNS4g5bCd6K+V5L2/55So6YGT5YW3XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgY29uc3QgdXNlUmVzdWx0ID0gYXdhaXQgdGhpcy51c2VQcm9wKHByb3BJZCwgc3RhZ2UpO1xyXG5cclxuICAvLyAgICAgICAgICAgICAgICAgICBpZiAodXNlUmVzdWx0LnN0YXR1cyA9PSAyMDAgJiYgdXNlUmVzdWx0LnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soKTtcclxuICAvLyAgICAgICAgICAgICAgICAgICB9XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIuaW5zLmVtaXQoRVZFTlRfTkFNRV9FTlVNLlVQREFURV9VU0VSKTtcclxuICAvLyAgICAgICAgICAgICAgICAgICAgIEFwaVNlcnZpY2UuaW5zLnNob3dFcnJvcih1c2VSZXN1bHQpO1xyXG4gIC8vICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgLy8gICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAvLyAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmhvbWVfYWN0aW9uLnVwZGF0YVBhZ2UoKTtcclxuICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAvLyAgICAgICAgICAgICAgICAgICAvLyBQb3BNZ3IuaW5zLnBvcExheWVyLnNob3dMYWJlbFRpcHMobS5tZXNzYWdlKTtcclxuICAvLyAgICAgICAgICAgICAgICAgICBpZiAoLS1jb3VudCA+IDApIHtcclxuICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGVja09yZGVyIGFnYWluJywgY291bnQpO1xyXG4gIC8vICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMDApKTtcclxuICAvLyAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGNoZWNrRnVuKGNvdW50KTtcclxuICAvLyAgICAgICAgICAgICAgICAgICB9XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgICBBcGlTZXJ2aWNlLmlucy5zaG93RXJyb3IobSk7XHJcbiAgLy8gICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAvLyAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAvLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAvLyAgICAgICAgICAgICAgIH1cclxuXHJcbiAgLy8gICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBcInBhaWRcIikge1xyXG4gIC8vICAgICAgICAgICAgICAgICAvLyA0LiDnoa7orqTorqLljZXmlK/ku5jnirbmgIFcclxuICAvLyAgICAgICAgICAgICAgICAgLy/ov5nph4zlpITnkIbmo4Dmn6XorqLljZXvvIzor7fmsYJjaGVja29yZGVyXHJcbiAgLy8gICAgICAgICAgICAgICAgIGF3YWl0IGNoZWNrRnVuKDUpO1xyXG4gIC8vICAgICAgICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgLy8gICAgICAgICAgICAgICAgIC8vIGF3YWl0IGNoZWNrRnVuKDUpO1xyXG4gIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRnIHN0YXIgcGF5IHN0YXR1cyA6XCIgKyBzdGF0dXMpO1xyXG5cclxuICAvLyAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcblxyXG4gIC8vICAgICAgICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgICAgIH0pXHJcbiAgLy8gICAgICAgICAgIH0pO1xyXG5cclxuICAvLyAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVQcm9wT3BlcmF0aW9uIGVycm9yJywgZXJyb3IpO1xyXG4gIC8vICAgICAgICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5wYXltZW50UGVuZGluZ1wiKSk7XHJcbiAgLy8gICAgICAgICB9XHJcbiAgLy8gICAgICAgfSxcclxuICAvLyAgICAgICB5ZXNfdGV4dDogdChcInRpcHMuY29uZmlybVwiKSxcclxuICAvLyAgICAgICBub190ZXh0OiB0KFwidGlwcy5jYW5jZWxcIiksXHJcbiAgLy8gICAgICAgdGlwczogdChcInRpcHMuaW5zdWZmaWNpZW50UHJvcHNDb25maXJtXCIpXHJcbiAgLy8gICAgIH0pO1xyXG4gIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5lcnJvcihcIumBk+WFt+aTjeS9nOa1geeoi+W8guW4uDpcIiwgZXJyb3IpO1xyXG4gIC8vICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5uZXR3b3JrRXJyb3JcIikpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qOA5p+l6K6i5Y2V5pSv5LuY54q25oCBXHJcbiAgICogQHBhcmFtIG9yZGVySWQg6K6i5Y2VSUQgKOWIm+W7uuiuouWNleaXtui/lOWbnueahG9yZGVyLm9pZClcclxuICAgKiBAcmV0dXJucyDorqLljZXmmK/lkKbmlK/ku5jmiJDlip9cclxuICAgKi9cclxuICBhc3luYyBjaGVja09yZGVyKG9yZGVySWQ6IHN0cmluZyk6IFByb21pc2U8QXBpTXNnPENoZWNrT3JkZXJSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8Q2hlY2tPcmRlclJlc3BvbnNlPihcclxuICAgICAgJy9jaGVja29yZGVyJyxcclxuICAgICAgeyBvcmRlcl9pZDogb3JkZXJJZCB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfSAvLyDpnIDopoHorqTor4FcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSA0MDAgfHwgIXJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ+iuouWNleeKtuaAgeajgOafpeWksei0pTonLCByZXNwb25zZSk7XHJcbiAgICAgIC8vIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoJ3RpcHMub3JkZXJDaGVja0ZhaWxlZCcpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCforqLljZXnirbmgIHmo4Dmn6XmiJDlip86JywgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOazqOWGjOa0u+WKqO+8iOmihuWPluWlluWKse+8iVxyXG4gICAqIEByZXR1cm5zIOa0u+WKqOaYr+WQpuazqOWGjOaIkOWKn1xyXG4gICAqL1xyXG4gIGFzeW5jIHJlZ0FjdGl2aXR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxSZWdBY3Rpdml0eVJlc3BvbnNlPihcclxuICAgICAgJy9yZWdhY3Rpdml0eScsXHJcbiAgICAgIHt9LCAvLyDnqbror7fmsYLkvZNcclxuICAgICAgeyBhdXRoOiB0cnVlIH0gLy8g6ZyA6KaB6K6k6K+BXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gNDAwIHx8ICFyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ+ayoeacieazqOWGjOWlluWKsTonLCByZXNwb25zZSk7XHJcbiAgICAgIC8vIFBvcE1nci5pbnMucG9wTGF5ZXIuc2hvd0xhYmVsVGlwcyhpMThuLnQoJ3RpcHMuYWN0aXZpdHlSZWdpc3RyYXRpb25GYWlsZWQnKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygn5rOo5YaM5aWW5Yqx6aKG5Y+W5oiQ5YqfOicsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3M7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICog5Yqg5YWl6aKR6YGTXHJcbiAgICovXHJcbiAgLy8gam9pbkNoYW5uZWwoKSB7XHJcbiAgLy8gICBpZiAoQ0NfREVCVUcpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJqb2luQ2hhbm5lbFwiKTtcclxuICAvLyAgICAgRXZlbnRNYW5hZ2VyLmlucy5lbWl0KEVWRU5UX05BTUVfRU5VTS5BQ1RJVkFURUQpO1xyXG4gIC8vICAgICByZXR1cm47XHJcbiAgLy8gICB9XHJcbiAgLy8gICBsZXQgdXJsID0gXCJodHRwczovL3QubWUvR2VtSmFtQ2hhbm5lbFwiO1xyXG4gIC8vICAgR2xvYmFsLmlucy5vcGVuVGVsZWdyYW1MaW5rKHVybCk7XHJcbiAgLy8gfVxyXG5cclxuICAvKipcclxuICAgKiDliqDlhaXnvqTnu4RcclxuICAgKi9cclxuICAvLyBqb2luR3JvdXAoKSB7XHJcbiAgLy8gICBpZiAoQ0NfREVCVUcpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJqb2luR3JvdXBcIik7XHJcbiAgLy8gICAgIEV2ZW50TWFuYWdlci5pbnMuZW1pdChFVkVOVF9OQU1FX0VOVU0uQUNUSVZBVEVEKTtcclxuICAvLyAgICAgcmV0dXJuO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgbGV0IHVybCA9IFwiaHR0cHM6Ly90Lm1lL0dlbUphbU9mZmNpYWxDb21tdW5pdHlcIjtcclxuICAvLyAgIEdsb2JhbC5pbnMub3BlblRlbGVncmFtTGluayh1cmwpO1xyXG4gIC8vIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Y675oqV56WoXHJcbiAgICovXHJcbiAgLy8gYXN5bmMgdG9Wb3RlKCkge1xyXG4gIC8vICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwidG9Wb3RlXCIpO1xyXG4gIC8vICAgICBFdmVudE1hbmFnZXIuaW5zLmVtaXQoRVZFTlRfTkFNRV9FTlVNLkFDVElWQVRFRCk7XHJcbiAgLy8gICAgIHJldHVybjtcclxuICAvLyAgIH1cclxuICAvLyAgIGF3YWl0IEFwaVNlcnZpY2UuaW5zLnJlcG9ydFRhc2tOb3RpZnkoVGFza05vdGlmeVR5cGUuVm90ZSk7XHJcbiAgLy8gICBsZXQgdXJsID0gXCJodHRwczovL3QubWUvdGFwcHNfYm90L2NlbnRlcj9zdGFydGFwcD1hcHBfZ2VtamFtXCI7XHJcbiAgLy8gICBHbG9iYWwuaW5zLm9wZW5UZWxlZ3JhbUxpbmsodXJsKTtcclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICog5YiG5Lqr5ri45oiPXHJcbiAgKi9cclxuICAvLyBhc3luYyBzaGFyZUdhbWUoX2dpZD86IG51bWJlcik6IFByb21pc2U8QXBpTXNnPFNoYXJlUmV3YXJkUmVzcG9uc2U+PiB7XHJcbiAgLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IEFwaVNlcnZpY2UuaW5zLnJlcG9ydFNoYXJlKF9naWQpO1xyXG4gIC8vICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwic2hhcmVHYW1lXCIpO1xyXG4gIC8vICAgICBFdmVudE1hbmFnZXIuaW5zLmVtaXQoRVZFTlRfTkFNRV9FTlVNLkFDVElWQVRFRCk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBsZXQgc2hhcmVUZXh0ID0gJ/CfmpkgWW914oCZcmUgbm8gaGVyby5cXG5Zb3XigJlyZSBhIHRoaWVm4oCUb24geW91ciBmaXJzdCBtaXNzaW9uLlxcbk5vIHdlYXBvbnMuIEp1c3Qgc3BlZWQgYW5kIGJyYWlucy5cXG7wn5KOIEdldCBpbi4gR3JhYiB0aGUgbG9vdC4gR2V0IG91dCBhbGl2ZS5cXG5CdXQgdGhpcyBpcyBqdXN0IHRoZSBiZWdpbm5pbmfigKYnO1xyXG4gIC8vICAgICBjb25zdCBlbmNvZGVkVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudChzaGFyZVRleHQpO1xyXG4gIC8vICAgICBsZXQgdXJsID0gXCJodHRwczovL3QubWUvc2hhcmUvdXJsP3VybD1odHRwczovL3QubWUvR2VtSmFtX2JvdC9nZW1qYW0/c3RhcnRhcHA9XCIgKyBHbG9iYWwuaW5zLnVzZXIuaWQgKyAnJnRleHQ9JyArIGVuY29kZWRUZXh0O1xyXG4gIC8vICAgICBHbG9iYWwuaW5zLm9wZW5UZWxlZ3JhbUxpbmsodXJsKTtcclxuICAvLyAgIH1cclxuICAvLyAgIHJldHVybiByZXNwb25zZTtcclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICog5YiG5Lqr5ri45oiP5YiwWFxyXG4gICAqL1xyXG4gIC8vIGFzeW5jIHNoYXJlR2FtZV9YKF9naWQ/OiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxTaGFyZVJld2FyZFJlc3BvbnNlPj4ge1xyXG4gIC8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBBcGlTZXJ2aWNlLmlucy5yZXBvcnRTaGFyZShfZ2lkKTtcclxuXHJcbiAgLy8gICBpZiAoQ0NfREVCVUcpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJzaGFyZUdhbWVcIik7XHJcbiAgLy8gICAgIEV2ZW50TWFuYWdlci5pbnMuZW1pdChFVkVOVF9OQU1FX0VOVU0uQUNUSVZBVEVEKTtcclxuICAvLyAgIH1cclxuICAvLyAgIGVsc2Uge1xyXG4gIC8vICAgICAvLyDliIbnprvmlofmnKzlkoxVUkzvvIzliIbliKvnvJbnoIFcclxuICAvLyAgICAgY29uc3QgcmF3VGV4dCA9IHQoJ3RpcHMuc2hhcmVNZXNzYWdlJyk7XHJcbiAgLy8gICAgIGNvbnN0IGFwcFVybCA9IGBodHRwczovL3QubWUvR2VtSmFtX2JvdC9nZW1qYW0/c3RhcnRhcHA9JHtHbG9iYWwuaW5zLnVzZXIuaWR9YDtcclxuXHJcbiAgLy8gICAgIC8vIOS9v+eUqFR3aXR0ZXLlrpjmlrnmjqjojZDnmoTlj4LmlbDmoLzlvI/vvJp0ZXh0ICsgdXJsXHJcbiAgLy8gICAgIGNvbnN0IGVuY29kZWRUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHJhd1RleHQpO1xyXG4gIC8vICAgICBjb25zdCBlbmNvZGVkVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGFwcFVybCk7XHJcblxyXG4gIC8vICAgICAvLyDmnoTpgKDmoIflh4ZUd2l0dGVy5YiG5Lqr6ZO+5o6lXHJcbiAgLy8gICAgIGNvbnN0IHR3aXR0ZXJJbnRlbnRVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2VuY29kZWRUZXh0fSZ1cmw9JHtlbmNvZGVkVXJsfWA7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKHR3aXR0ZXJJbnRlbnRVcmwpO1xyXG4gIC8vICAgICBHbG9iYWwuaW5zLm9wZW5MaW5rKHR3aXR0ZXJJbnRlbnRVcmwpXHJcbiAgLy8gICB9XHJcbiAgLy8gICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgLy8gfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiDojrflj5blhY3otLnph5HluIFcclxuICAqIEByZXR1cm5zIOWMheWQq+acrOasoeiOt+WPlumHkeW4geaVsOWSjOeUqOaIt+aVsOaNrueahOWTjeW6lFxyXG4gICovXHJcbiAgYXN5bmMgZ2V0RnJlZUdhbWVDb2luKCk6IFByb21pc2U8QXBpTXNnPEZyZWVHYW1lQ29pblJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxGcmVlR2FtZUNvaW5SZXNwb25zZT4oXHJcbiAgICAgICcvY2FpZGFuJyxcclxuICAgICAge30sIC8vIOepuuivt+axguS9k1xyXG4gICAgICB7IGF1dGg6IHRydWUgfSAvLyDpnIDopoF0b2tlbuiupOivgVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgLy8g5pu05paw5YWo5bGA55So5oi35pWw5o2uXHJcbiAgICAgIC8vIEdsb2JhbC5pbnMuc2V0VXNlckRhdGEocmVzcG9uc2UucmVzcG9uc2UuZGF0YS51c2VyZGF0YSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfojrflj5blhY3otLnph5HluIHmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YS5nb3Rjb2luKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ+iOt+WPluWFjei0uemHkeW4geWksei0pTonLCByZXNwb25zZSk7XHJcbiAgICAgIC8vIOaYvuekuumUmeivr+aPkOekulxyXG4gICAgICAvLyBQb3BNZ3IuaW5zLnBvcExheWVyLnNob3dMYWJlbFRpcHMoaTE4bi50KCd0aXBzLmdldEZyZWVDb2luRmFpbGVkJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDojrflj5ZUZWxlZ3JhbeWktOWDj1xyXG4gICAqIEBwYXJhbSBpY29uVXJsIFRlbGVncmFt5aS05YOPVVJMXHJcbiAgICogQHJldHVybnMg5YyF5ZCrYmFzZTY057yW56CB55qE5Zu+54mH5pWw5o2uXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0VGVsZWdyYW1BdmF0YXIoaWNvblVybDogc3RyaW5nKTogUHJvbWlzZTxBcGlNc2c8QXZhdGFyUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEF2YXRhclJlc3BvbnNlPihcclxuICAgICAgJy9nZXRBdmF0YXInLFxyXG4gICAgICB7IGljb251cmw6IGljb25VcmwgfSxcclxuICAgICAgeyBhdXRoOiBmYWxzZSwgcmVwZWF0TW9kZTogJ3F1ZXVlJyB9IC8vIOS4jemcgOimgeiupOivgVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ+WktOWDj+iOt+WPluaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICAvKipcclxuICog6I635Y+W6ZSZ6K+v5L+h5oGvXHJcbiAqXHJcbiAqIEBwYXJhbSBjb2RlIOmUmeivr+WTjeW6lO+8jOWPr+S7peaYr+Wtl+espuS4suaIlkVycm9yTXNn5a+56LGhXHJcbiAqIEByZXR1cm5zIOi/lOWbnuWvueW6lOeahOmUmeivr+aPkOekuuS/oeaBr++8jOWmguaenOacquaJvuWIsOWImei/lOWbnlwi5pyq55+l6ZSZ6K+vXCJcclxuICovXHJcbiAgZ2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPzogQXBpUmVzcG9uc2UsIGRlZmF1bHRNc2c6IHN0cmluZyA9IHQoJ3RpcHMubmV0d29ya0Vycm9yJykpIHtcclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UuY29kZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIGRlZmF1bHRNc2c7XHJcbiAgICB9XHJcbiAgICBjb25zdCBrZXkgPSBFcnJvck1zZ1tyZXNwb25zZT8uY29kZV1cclxuICAgIGxldCBtc2cgPSB0KCd0aXBzLicgKyBrZXkpXHJcbiAgICBpZiAobXNnKSB7XHJcbiAgICAgIHJldHVybiBtc2c7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRlZmF1bHRNc2c7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmmL7npLrplJnor6/kv6Hmga9cclxuICAgKlxyXG4gICAqIEBwYXJhbSByZXNwb25zZSDplJnor6/lk43lupTvvIzlj6/ku6XmmK/lrZfnrKbkuLLmiJZFcnJvck1zZ+WvueixoVxyXG4gICAqL1xyXG4gIC8vIHNob3dFcnJvcihyZXNwb25zZTogQXBpTXNnKSB7XHJcbiAgLy8gICBjb25zdCBtc2cgPSB0aGlzLmdldEVycm9yTWVzc2FnZShyZXNwb25zZT8ucmVzcG9uc2UpO1xyXG4gIC8vICAgVUlNYW5hZ2VyLmlucy5zaG93VG9hc3QobXNnKTtcclxuICAvLyB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDmo4Dmn6Xku4rml6XlhY3lub/lkYrnirbmgIFcclxuICAgKiBAcmV0dXJucyDljIXlkKvlhY3lub/lkYrmrKHmlbDnmoTlk43lupTmlbDmja5cclxuICAgKi9cclxuICBhc3luYyBpc0FkRnJlZSgpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxBZEZyZWVSZXNwb25zZT4oXHJcbiAgICAgICcvYWRmcmVlJyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9IC8vIOmcgOimgXRva2Vu6K6k6K+BXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5YWN5bm/5ZGK54q25oCBOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEudG9kYXlfYWRfZnJlZSk7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5yZXNwb25zZS5kYXRhLnRvZGF5X2FkX2ZyZWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygn6I635Y+W5YWN5bm/5ZGK54q25oCB5aSx6LSlOicsIHJlc3BvbnNlKTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiDojrflj5bnlKjmiLfmjJbnn7/kv6Hmga9cclxuICAqIEByZXR1cm5zIOaMluefv+S/oeaBr+WTjeW6lFxyXG4gICovXHJcbiAgYXN5bmMgZ2V0TWluZUluZm8oKTogUHJvbWlzZTxBcGlNc2c8TWluaW5nSW5mb1Jlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxNaW5pbmdJbmZvUmVzcG9uc2U+KFxyXG4gICAgICAnL2dldG1pbmVpbmZvJyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6I635Y+W5oyW55+/5L+h5oGv5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6aKG5Y+W5oyW55+/5aWW5YqxXHJcbiAgICogQHBhcmFtIGFkZHIg6ZKx5YyF5Zyw5Z2AXHJcbiAgICogQHJldHVybnMg5aWW5Yqx6aKG5Y+W57uT5p6cXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0TWluZVJld2FyZChhZGRyOiBzdHJpbmcpOiBQcm9taXNlPEFwaU1zZzxNaW5pbmdSZXdhcmRSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8TWluaW5nUmV3YXJkUmVzcG9uc2U+KFxyXG4gICAgICAnL2dldG1pbmVyZXdhcmQnLFxyXG4gICAgICB7IGFkZHIgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfpooblj5bmjJbnn7/lpZblirHmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICog5Zyo5oyW55+/5YaF54K55Ye755yL5bm/5ZGK55qE5pe25YCZ5LiK5oqlXHJcbiAqIEByZXR1cm5zIOS4iuaKpee7k+aenFxyXG4gKi9cclxuICBhc3luYyByZXBvcnRNaW5lVmlkZW8oKTogUHJvbWlzZTxBcGlNc2c8QXBpUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEFwaVJlc3BvbnNlPihcclxuICAgICAgJy9yZXBvcnRtaW5ldmlkZW8nLFxyXG4gICAgICB7fSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCflub/lkYrngrnlh7vkuIrmiqXmiJDlip8nKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog5omn6KGM5oyW55+/5pON5L2cXHJcbiAgKiBAcmV0dXJucyDmjJbnn7/nu5PmnpxcclxuICAqL1xyXG4gIGFzeW5jIG1pbmluZygpOiBQcm9taXNlPEFwaU1zZzxNaW5pbmdSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8TWluaW5nUmVzcG9uc2U+KFxyXG4gICAgICAnL21pbmluZycsXHJcbiAgICAgIHt9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+aMluefv+aIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gKiDorr7nva7mjJbnn7/nv7vlgI1cclxuICogQHBhcmFtIHR5cGUg57+75YCN57G75Z6LXHJcbiAqIEByZXR1cm5zIOe/u+WAjeaTjeS9nOe7k+aenFxyXG4gKi9cclxuICBhc3luYyBtaW5lcmV3YXJkZG91YmxlKHR5cGU6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPE1pbmVSZXdhcmREb3VibGVSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8TWluZVJld2FyZERvdWJsZVJlc3BvbnNlPihcclxuICAgICAgJy9taW5lcmV3YXJkZG91YmxlJyxcclxuICAgICAgeyB0OiB0eXBlIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiByZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5oyW55+/57+75YCN6K6+572u5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiDojrflj5bmjJbnn7/pgoDor7fliJfooahcclxuICAqIEByZXR1cm5zIOWMheWQq+aMluefv+mCgOivt+WIl+ihqOeahOWTjeW6lFxyXG4gICovXHJcbiAgYXN5bmMgZ2V0bWluZWludml0ZWxpc3QoKTogUHJvbWlzZTxBcGlNc2c8TWluZUludml0ZUxpc3RSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8TWluZUludml0ZUxpc3RSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0bWluZWludml0ZWxpc3QnLFxyXG4gICAgICB7fSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfmjJbnn7/pgoDor7fliJfooajojrflj5bmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YS5saXN0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog6I635Y+W5Luj55CG5bm/5ZGK6YWN572uXHJcbiAgKiBAcGFyYW0gaW52aXRlciDlvZPliY3njqnlrrbnmoTpgoDor7fogIVJRFxyXG4gICogQHJldHVybnMg5Luj55CG5bm/5ZGK6YWN572u5YiX6KGoXHJcbiAgKi9cclxuICBhc3luYyBnZXRBZ2VudEFkQ29uZmlnKGludml0ZXI6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPEFnZW50QWRDb25maWdSZXNwb25zZT4+IHtcclxuICAgIGlmICghaW52aXRlcikge1xyXG4gICAgICByZXR1cm4geyBzdGF0dXM6IDQwMCwgbWVzc2FnZTogJycsIHJlc3BvbnNlOiBudWxsIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEFnZW50QWRDb25maWdSZXNwb25zZT4oXHJcbiAgICAgICcvYWdlbnRhZGNvbmZpZycsXHJcbiAgICAgIHsgaW52aXRlciB9LFxyXG4gICAgICB7IGF1dGg6IGZhbHNlIH0gLy8g5LiN6ZyA6KaB6K6k6K+BXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5Luj55CG5bm/5ZGK6YWN572u6I635Y+W5oiQ5YqfOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKCfojrflj5bku6PnkIblub/lkYrphY3nva7lpLHotKU6JywgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog6I635Y+W6YKu5Lu25YiX6KGoXHJcbiAgKiBAcGFyYW0gcGFnZU5vIOmhteegge+8iOS7jjDlvIDlp4vvvIlcclxuICAqIEBwYXJhbSBwYWdlU2l6ZSDmr4/pobXmlbDmja7mlbDph49cclxuICAqIEByZXR1cm5zIOmCruS7tuWIl+ihqOaVsOaNrlxyXG4gICovXHJcbiAgYXN5bmMgZ2V0TWFpbExpc3QoXHJcbiAgICBwYWdlTm86IG51bWJlciA9IDAsXHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyID0gMTVcclxuICApOiBQcm9taXNlPEFwaU1zZzxNYWlsTGlzdFJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxNYWlsTGlzdFJlc3BvbnNlPihcclxuICAgICAgJy9nZXRtYWlsJyxcclxuICAgICAgeyBwYWdlTm8sIHBhZ2VTaXplIH0sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9IC8vIOmcgOimgeiupOivgVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+mCruS7tuWIl+ihqOiOt+WPluaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybign6YKu5Lu25YiX6KGo6I635Y+W5aSx6LSlOicsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAqIOmYheivuy/pooblj5bpgq7ku7ZcclxuICAqIEBwYXJhbSBtYWlsSWQg6YKu5Lu2SURcclxuICAqIEBwYXJhbSBzdGF0ZSDmk43kvZznsbvlnovvvJoxPemYheivu+mCruS7tu+8jDI96aKG5Y+W5aWW5Yqx77yMND3liKDpmaTpgq7ku7ZcclxuICAqIEByZXR1cm5zIOaTjeS9nOe7k+aenO+8iOmihuWPluWlluWKseaXtuWMheWQq+eUqOaIt+aVsOaNru+8iVxyXG4gICovXHJcbiAgLy8gYXN5bmMgcmVhZE1haWwobWFpbElkOiBudW1iZXIsIHN0YXRlOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxSZWFkTWFpbFJlc3BvbnNlPj4ge1xyXG4gIC8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxSZWFkTWFpbFJlc3BvbnNlPihcclxuICAvLyAgICAgJy9yZWFkbWFpbCcsXHJcbiAgLy8gICAgIHsgbWFpbF9pZDogbWFpbElkLCBzdGF0ZSB9LFxyXG4gIC8vICAgICB7IGF1dGg6IHRydWUgfSAvLyDpnIDopoHorqTor4FcclxuICAvLyAgICk7XHJcblxyXG4gIC8vICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKCfpgq7ku7bmk43kvZzmiJDlip86JywgcmVzcG9uc2UucmVzcG9uc2UpO1xyXG5cclxuICAvLyAgICAgLy8g5aaC5p6c6aKG5Y+W5aWW5Yqx5oiQ5Yqf77yM5pu05paw5pys5Zyw55So5oi35pWw5o2uXHJcbiAgLy8gICAgIGlmIChzdGF0ZSA9PT0gMiAmJiByZXNwb25zZS5yZXNwb25zZS5kYXRhPy51c2VyZGF0YSkge1xyXG4gIC8vICAgICAgIEdsb2JhbC5pbnMuc2V0VXNlckRhdGEocmVzcG9uc2UucmVzcG9uc2UuZGF0YS51c2VyZGF0YSk7XHJcbiAgLy8gICAgICAgRXZlbnRNYW5hZ2VyLmlucy5lbWl0KEVWRU5UX05BTUVfRU5VTS5VUERBVEVfTUFJTCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgIGNvbnNvbGUud2Fybign6YKu5Lu25pON5L2c5aSx6LSlOicsIHJlc3BvbnNlKTtcclxuICAvLyAgIH1cclxuICAvLyAgIHJldHVybiByZXNwb25zZTtcclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICog6I635Y+W5o2i6YeP5Lu75Yqh5YiX6KGoXHJcbiAgKiBAcmV0dXJucyDmjaLph4/ku7vliqHliJfooahcclxuICAqL1xyXG4gIGFzeW5jIGdldEV4Y2hhbmdlVGFza0xpc3QoKTogUHJvbWlzZTxBcGlNc2c8RXhjaGFuZ2VUYXNrTGlzdFJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxFeGNoYW5nZVRhc2tMaXN0UmVzcG9uc2U+KFxyXG4gICAgICAnL2dldGV4Y2hhbmdldGFza2xpc3QnLFxyXG4gICAgICB7fSwgLy8g56m66K+35rGC5L2TXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9IC8vIOmcgOimgeiupOivgVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDAgJiYgcmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+aNoumHj+S7u+WKoeWIl+ihqOiOt+WPluaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybign5o2i6YeP5Lu75Yqh5YiX6KGo6I635Y+W5aSx6LSlOicsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmAmuefpeWujOaIkOaNoumHj+S7u+WKoVxyXG4gICAqIEBwYXJhbSB0aWQg5Lu75YqhSURcclxuICAgKiBAcmV0dXJucyDmk43kvZznu5PmnpxcclxuICAgKi9cclxuICBhc3luYyBjb21wbGV0ZUV4Y2hhbmdlVGFzayh0aWQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPEFwaVJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxBcGlSZXNwb25zZT4oXHJcbiAgICAgICcvY29tcGxldGVleGNoYW5nZXRhc2snLFxyXG4gICAgICB7IHRpZCB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfSAvLyDpnIDopoHorqTor4FcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGDku7vliqEgJHt0aWR9IOWujOaIkOS4iuaKpeaIkOWKn2ApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGDku7vliqEgJHt0aWR9IOWujOaIkOS4iuaKpeWksei0pTpgLCByZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpooblj5bmjaLph4/ku7vliqHlpZblirFcclxuICAgKiBAcGFyYW0gdGlkIOS7u+WKoUlEXHJcbiAgICogQHJldHVybnMg5pu05paw5ZCO55qE55So5oi35pWw5o2uXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0RXhjaGFuZ2VUYXNrUmV3YXJkKHRpZDogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8RXhjaGFuZ2VUYXNrUmV3YXJkUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEV4Y2hhbmdlVGFza1Jld2FyZFJlc3BvbnNlPihcclxuICAgICAgJy9nZXRleGNoYW5nZXRhc2tyZXdhcmQnLFxyXG4gICAgICB7IHRpZCB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfSAvLyDpnIDopoHorqTor4FcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGDku7vliqEgJHt0aWR9IOWlluWKsemihuWPluaIkOWKn2ApO1xyXG4gICAgICAvLyDmm7TmlrDlhajlsYDnlKjmiLfmlbDmja5cclxuICAgICAgR2xvYmFsLmlucy5zZXRVc2VyRGF0YShyZXNwb25zZS5yZXNwb25zZS5kYXRhLnVzZXJkYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PeWNoeWMhT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gIC8qKlxyXG4gKiDojrflj5bmuLjmiI/phY3nva7kv6Hmga9cclxuICpcclxuICogQHJldHVybnMg6L+U5Zue6I635Y+W55qE6YWN572u5L+h5oGvXHJcbiAqL1xyXG4gIGFzeW5jIGdldENhcmRQYWNrQ29uZmlncygpOiBQcm9taXNlPENhcmRQYWNrQ29uZmlnUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8Q2FyZFBhY2tDb25maWdSZXNwb25zZT4oJy9nZXRjYXJkcGFja2NvbmZpZycsIG51bGwsIHsgYXV0aDogZmFsc2UgfSk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDQwMCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIEdsb2JhbC5pbnMuY2FyZFBhY2tDb25maWcgPSByZXNwb25zZS5yZXNwb25zZS5kYXRhO1xyXG4gICAgY29uc29sZS5sb2coJ2dldGNhcmRwYWNrY29uZmlnICBnZXRjYXJkcGFja2NvbmZpZzonLCBHbG9iYWwuaW5zLmNhcmRQYWNrQ29uZmlnKTtcclxuICAgIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiAgIC8vIOiOt+WPluezu+WIl+WIl+ihqFxyXG4gICAgKiBAcmV0dXJucyDojrflj5bns7vliJfliJfooajnu5PmnpxcclxuICAgICovXHJcbiAgYXN5bmMgc2VyaWVzTGlzdCgpOiBQcm9taXNlPEFwaU1zZzxDYXJkTGlzdFJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxDYXJkTGlzdFJlc3BvbnNlPihcclxuICAgICAgJy9nZXRzZXJpZXNsaXN0JyxcclxuICAgICAge30sXHJcbiAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn6I635Y+W57O75YiX5YiX6KGo57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuICAvKipcclxuICAgICogIOiOt+WPluezu+WIl+ivpuaDhSDluKZ0b2tlbu+8jHtcInNlcmllc19pZFwiOiAxfSAgXHJcbiAgICAqIEByZXR1cm5zIOiOt+WPluezu+WIl+ivpuaDhee7k+aenFxyXG4gICAgKi9cclxuICBhc3luYyBzZXJpZXNEZXRhaWwoc2VyaWVzX2lkOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxDYXJkRGV0YWlsUmVzcG9uc2U+PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PENhcmREZXRhaWxSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0c2VyaWVzZGV0YWlsJyxcclxuICAgICAgeyBzZXJpZXNfaWQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfojrflj5bns7vliJfor6bmg4Xnu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAgIC8vIOiOt+WPlueijueJh+aVsOmHj1xyXG4gICAqIEByZXR1cm5zIOiOt+WPlueijueJh+aVsOmHj+e7k+aenFxyXG4gICAqL1xyXG4gIGFzeW5jIGNhcmREZWJyaXMoKTogUHJvbWlzZTxBcGlNc2c8Q2FyZERlYnJpc1Jlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxDYXJkRGVicmlzUmVzcG9uc2U+KFxyXG4gICAgICAnL2dldGNhcmRkZWJyaXMnLFxyXG4gICAgICB7fSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnoo7niYfnu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqICAgLy8g6I635Y+W5pS26JeP55qE57O75YiXXHJcbiAgKiBAcmV0dXJucyDojrflj5bmlLbol4/nmoTns7vliJfnu5PmnpxcclxuICAqL1xyXG4gIGFzeW5jIGNvbGxlY3RlZFNlcmllcygpOiBQcm9taXNlPEFwaU1zZzxDb2xsZWN0ZWRTZXJpZVJlc3BvbnNlPj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxDb2xsZWN0ZWRTZXJpZVJlc3BvbnNlPihcclxuICAgICAgJy9nZXRjb2xsZWN0ZWRzZXJpZXMnLFxyXG4gICAgICB7fSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfojrflj5bmlLbol4/nmoTns7vliJfnu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqICAgLy8g6I635Y+W5pS26JeP55qE5Y2h54mMXHJcbiAgKiBAcmV0dXJucyDojrflj5bmlLbol4/nmoTljaHniYznu5PmnpwgIC9nZXRjb2xsZWN0ZWRjYXJkcyAg5bimdG9rZW7vvIx7XCJwYWdlTm9cIjogMCwgXCJwYWdlU2l6ZVwiOiAxNX0gICAvLyDojrflj5bmlLbol4/nmoTljaHniYxcclxuICAqL1xyXG4gIGFzeW5jIGNvbGxlY3RlZENhcmRzKHBhZ2VObzogbnVtYmVyID0gMCwgcGFnZVNpemU6IG51bWJlciA9IDE1KTogUHJvbWlzZTxBcGlNc2c8Q29sbGVjdGVkQ2FyZHNSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8Q29sbGVjdGVkQ2FyZHNSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0Y29sbGVjdGVkY2FyZHMnLFxyXG4gICAgICB7IHBhZ2VObywgcGFnZVNpemUgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfojrflj5bmlLbol4/nmoTljaHniYznu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICogICAvLyDojrflj5bmi6XmnInljaHljIXnmoTliJfooahcclxuICAgICogQHJldHVybnMg6I635Y+W5oul5pyJ5Y2h5YyF55qE5YiX6KGo57uT5p6cICAvZ2V0b3duZWRwYWNrc2xpc3QgIOW4pnRva2Vu5bCx6KGMICAvLyDojrflj5bmi6XmnInljaHljIXnmoTliJfooahcclxuICAgICovXHJcbiAgYXN5bmMgb3duZWRQYWNrc0xpc3QoKTogUHJvbWlzZTxBcGlNc2c8T3duZWRQYWNrc0xpc3RSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8T3duZWRQYWNrc0xpc3RSZXNwb25zZT4oXHJcbiAgICAgICcvZ2V0b3duZWRwYWNrc2xpc3QnLFxyXG4gICAgICB7fSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfojrflj5bmi6XmnInljaHljIXnmoTliJfooajnu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICogIOW8gOWMhVxyXG4gICAgKiAgcGFja19pZFxyXG4gICAgKiAgY291bnRcclxuICAgICogQHJldHVybnMg5byA5YyF57uT5p6cIFxyXG4gICAgKi9cclxuICBhc3luYyBvcGVuQ2FyZFBhY2tzKHBhY2tfaWQ6IG51bWJlciwgY291bnQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPE9wZW5DYXJkUGFja3NSZXNwb25zZT4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8T3BlbkNhcmRQYWNrc1Jlc3BvbnNlPihcclxuICAgICAgJy9vcGVuY2FyZHBhY2tzJyxcclxuICAgICAgeyBwYWNrX2lkLCBjb3VudCB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+W8gOWMheWIl+ihqOe7k+aenDonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDmlLbol49cclxuICAgICog5Lyge1wiY2FyZF9pZFwiOiDljaHniYdpZH0vLyDmlLbol4/ljaHniYwg77yM5Lyge1wic2VyaWVzX2lkXCI6IOezu+WIl2lkfSAgLy8g5pS26JeP57O75YiXXHJcbiAgICAqIGlzU2VyaWVzOm51bWJlciAxPeezu+WIlyAwPeWNoeeJh1xyXG4gICAgKiBAcmV0dXJucyDmlLbol4/nu5PmnpwgXHJcbiAgICAqL1xyXG4gIGFzeW5jIGNhcmRDb2xsZWN0KGlzU2VyaWVzOiBudW1iZXIsIGlkOiBudW1iZXIpOiBQcm9taXNlPEFwaU1zZzxDYXJkQ29sbGVjdFJlc3BvbnNlPj4ge1xyXG4gICAgbGV0IHJlc3BvbnNlID0gbnVsbDtcclxuICAgIGlmIChpc1NlcmllcyA9PSAxKSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8Q2FyZENvbGxlY3RSZXNwb25zZT4oXHJcbiAgICAgICAgJy9jYXJkcGFjay9jb2xsZWN0JyxcclxuICAgICAgICB7IHNlcmllc19pZDogaWQgfSxcclxuICAgICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxDYXJkQ29sbGVjdFJlc3BvbnNlPihcclxuICAgICAgICAnL2NhcmRwYWNrL2NvbGxlY3QnLFxyXG4gICAgICAgIHsgY2FyZF9pZDogaWQgfSxcclxuICAgICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5pS26JeP57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLnN1Y2Nlc3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOWPlua2iOaUtuiXj1xyXG4gICAgKiDkvKB7XCJjYXJkX2lkXCI6IOWNoeeJh2lkfS8vIOWPlua2iOaUtuiXj+WNoeeJjCDvvIzkvKB7XCJzZXJpZXNfaWRcIjog57O75YiXaWR9IC8vIOWPlua2iOaUtuiXj+ezu+WIl1xyXG4gICAgKiBAcmV0dXJucyDlj5bmtojmlLbol4/nu5PmnpwgXHJcbiAgICAqL1xyXG4gIGFzeW5jIGNhcmRVbkNvbGxlY3QoaXNTZXJpZXM6IG51bWJlciwgaWQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPENhcmRVbkNvbGxlY3RSZXNwb25zZT4+IHtcclxuICAgIGxldCByZXNwb25zZSA9IG51bGw7XHJcbiAgICBpZiAoaXNTZXJpZXMgPT0gMSkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PENhcmRVbkNvbGxlY3RSZXNwb25zZT4oXHJcbiAgICAgICAgJy9jYXJkcGFjay91bmNvbGxlY3QnLFxyXG4gICAgICAgIHsgc2VyaWVzX2lkOiBpZCB9LFxyXG4gICAgICAgIHsgYXV0aDogdHJ1ZSB9XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PENhcmRVbkNvbGxlY3RSZXNwb25zZT4oXHJcbiAgICAgICAgJy9jYXJkcGFjay91bmNvbGxlY3QnLFxyXG4gICAgICAgIHsgY2FyZF9pZDogaWQgfSxcclxuICAgICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXNwb25zZS5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZygn5Y+W5raI5pS26JeP57uT5p6cOicsIHJlc3BvbnNlLnJlc3BvbnNlLnN1Y2Nlc3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOWIhuino+WNoeeJjFxyXG4gICAqICB7XCJjYXJkX2lkXCI6IOWNoeeJjGlkLFwiY291bnRcIjog5pWw6YePfSAgLy8g5YiG6Kej5Y2h54mMXHJcbiAgICogQHJldHVybnMg5YiG6Kej57uT5p6cIFxyXG4gICAqL1xyXG4gIGFzeW5jIGNhcmREZWNvbXBvc2UoY2FyZF9pZDogbnVtYmVyLCBjb3VudDogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8Q2FyZERlY29tcG9zZVJlc3BvbnNlPj4ge1xyXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8Q2FyZERlY29tcG9zZVJlc3BvbnNlPihcclxuICAgICAgJy9jYXJkcGFjay9kZWNvbXBvc2UnLFxyXG4gICAgICB7IGNhcmRfaWQ6IGNhcmRfaWQsIGNvdW50OiBjb3VudCB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+WIhuino+WNoeeJjOe7k+aenDonLCByZXNwb25zZS5yZXNwb25zZS5zdWNjZXNzKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDlkIjmiJDljaHniYdcclxuICAgICogIHtcImNhcmRfaWRcIjog5Y2h54mHaWR9XHJcbiAgICAqIEByZXR1cm5zIOWQiOaIkOe7k+aenCBcclxuICAgICovXHJcbiAgYXN5bmMgY2FyZENvbXBvc2UoY2FyZF9pZDogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8Q2FyZENvbXBvc2VSZXNwb25zZT4+IHtcclxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PENhcmRDb21wb3NlUmVzcG9uc2U+KFxyXG4gICAgICAnL2NhcmRwYWNrL2NvbXBvc2UnLFxyXG4gICAgICB7IGNhcmRfaWQ6IGNhcmRfaWQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCflkIjmiJDnu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2Uuc3VjY2Vzcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiDlh7rllK7ljaHniYxcclxuICAqIHtcImNhcmRfaWRcIjog5Y2h54mMaWQsXCJjb3VudFwiOiDmlbDph499ICAgICAgICAvLyDlh7rllK7ljaHniYxcclxuICAqIEByZXR1cm5zIOWIhuino+e7k+aenCBcclxuICAqL1xyXG4gIGFzeW5jIHNlbGxDYXJkKGNhcmRfaWQ6IG51bWJlciwgY291bnQ6IG51bWJlcik6IFByb21pc2U8QXBpTXNnPFNlbGxDYXJkUmVzcG9uc2U+PiB7XHJcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxTZWxsQ2FyZFJlc3BvbnNlPihcclxuICAgICAgJy9jYXJkcGFjay9zZWxsJyxcclxuICAgICAgeyBjYXJkX2lkOiBjYXJkX2lkLCBjb3VudDogY291bnQgfSxcclxuICAgICAgeyBhdXRoOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlPy5zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCflh7rllK7ljaHniYznu5Pmnpw6JywgcmVzcG9uc2UucmVzcG9uc2Uuc3VjY2Vzcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOmihuWPluezu+WIl+WlluWKsVxyXG4gICoge1wic2VyaWVzX2lkXCI6IOezu+WIl2lkfSAvL+mihuWPluezu+WIl+WlluWKsVxyXG4gICogQHJldHVybnMg6aKG5Y+W57O75YiX5aWW5Yqx57uT5p6cIFxyXG4gICovXHJcbiAgYXN5bmMgZ2V0UmV3YXJkKHNlcmllc19pZDogbnVtYmVyKTogUHJvbWlzZTxBcGlNc2c8R2V0UmV3YXJkUmVzcG9uc2U+PiB7XHJcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxHZXRSZXdhcmRSZXNwb25zZT4oXHJcbiAgICAgICcvY2FyZHBhY2svZ2V0cmV3YXJkJyxcclxuICAgICAgeyBzZXJpZXNfaWQ6IHNlcmllc19pZCB9LFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+mihuWPluezu+WIl+WlluWKsee7k+aenDonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOi0reS5sOWNoeWMhVxyXG4gICAqIEBwYXJhbSBza3VpZCDljaHljIVpZFxyXG4gICAqIEBwYXJhbSBudW0g6LSt5Lmw5pWw6YePXHJcbiAgICogQHBhcmFtIG9yZGVyX3R5cGUg6K6i5Y2V57G75Z6L77yMMz3otK3kubDljaHljIVcclxuICAgKiBAcGFyYW0gcGF5X3R5cGUg5pSv5LuY57G75Z6L77yMXCJ1c2RcIuaIllwiZ2FtZV9jb2luXCJcclxuICAgKiBAcGFyYW0gcGF5bWVudF9mcm9tIOadpea6kO+8jFwi5oiWXCJwbGF5ZGVja1wi5oiWXCJhemVuXCLmiJZcImF6ZW4tYXBwXCJcclxuICAgKiBAcmV0dXJucyDmlK/ku5jorqLljZXkv6Hmga9cclxuICAgKi9cclxuXHJcbiAgYXN5bmMgYnV5Q2FyZFBhY2tzKHNrdWlkOiBudW1iZXIsIG51bTogbnVtYmVyLCBvcmRlcl90eXBlOiBudW1iZXIgPSAzLCBwYXlfdHlwZTogc3RyaW5nLCBwYXltZW50X2Zyb206IHN0cmluZyk6IFByb21pc2U8QXBpTXNnPEJ1eVByb3BSZXNwb25zZT4+IHtcclxuICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgIHNrdWlkOiBza3VpZCxcclxuICAgICAgbnVtOiBudW0sXHJcbiAgICAgIG9yZGVyX3R5cGU6IG9yZGVyX3R5cGUsXHJcbiAgICAgIHBheV90eXBlOiBwYXlfdHlwZSwgLy8gXCJ1c2RcIuaIllwiZ2FtZV9jb2luXCJcclxuICAgICAgcGF5bWVudF9mcm9tOiBcIlwiIC8vIFwiXCLmiJZcInBsYXlkZWNrXCLmiJZcImF6ZW5cIuaIllwiYXplbi1hcHBcIlxyXG4gICAgfVxyXG4gICAgaWYgKHdpbmRvdz8ucGxheWRlY2tJc09wZW4pIHtcclxuICAgICAgcGFyYW1zW1wicGF5bWVudF9mcm9tXCJdID0gXCJwbGF5ZGVja1wiXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PEJ1eVByb3BSZXNwb25zZT4oXHJcbiAgICAgICcvYnV5Y2FyZHBhY2tzJyxcclxuICAgICAgcGFyYW1zLFxyXG4gICAgICB7IGF1dGg6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+WVhuWfjuWNoeWMhemBk+WFt+iuouWNleWIm+W7uuaIkOWKnzonLCByZXNwb25zZS5yZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgICog6LSt5Lmw5Y2h5YyF5pON5L2c5rWB56iL5bCB6KOFXHJcbiAgICAgKiBAcGFyYW0gc2t1aWQg5Y2h5YyFaWRcclxuICAgKiBAcGFyYW0gbnVtIOi0reS5sOaVsOmHj1xyXG4gICAqIEBwYXJhbSBvcmRlcl90eXBlIOiuouWNleexu+Wei++8jDM96LSt5Lmw5Y2h5YyFXHJcbiAgICogQHBhcmFtIHBheV90eXBlIOaUr+S7mOexu+Wei++8jFwidXNkXCLmiJZcImdhbWVfY29pblwiXHJcbiAgICogQHBhcmFtIHBheW1lbnRfZnJvbSDmnaXmupDvvIxcIuaIllwicGxheWRlY2tcIuaIllwiYXplblwi5oiWXCJhemVuLWFwcFwiXHJcbiAgICogQHJldHVybnMg5pSv5LuY6K6i5Y2V5L+h5oGvXHJcbiAgICAqL1xyXG4gIC8vIGFzeW5jIGJ1eUNhcmRQYWNrc0Z1bihzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBza3VpZDogbnVtYmVyLCBudW06IG51bWJlciwgb3JkZXJfdHlwZTogbnVtYmVyID0gMyxcclxuICAvLyAgIHBheV90eXBlOiBzdHJpbmcsIHBheW1lbnRfZnJvbTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gIC8vICAgY29uc3QgYnV5UmVzdWx0ID0gYXdhaXQgdGhpcy5idXlDYXJkUGFja3Moc2t1aWQsIG51bSwgb3JkZXJfdHlwZSwgcGF5X3R5cGUsIHBheW1lbnRfZnJvbSk7XHJcbiAgLy8gICBpZiAoYnV5UmVzdWx0LnN0YXR1cyAhPSAyMDAgfHwgIWJ1eVJlc3VsdC5yZXNwb25zZT8uc3VjY2Vzcykge1xyXG4gIC8vICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5vcmRlckNyZWF0ZUZhaWxlZFwiKSk7XHJcbiAgLy8gICAgIHJldHVybjtcclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICBpZiAoQ0NfREVCVUcpIHtcclxuICAvLyAgICAgbGV0IG9pZCA9IGJ1eVJlc3VsdC5yZXNwb25zZS5kYXRhLm9yZGVyLm9pZDtcclxuICAvLyAgICAgYXdhaXQgQXBpU2VydmljZS5pbnMuZ2V0UHVyY2hhc2Vkb25lKG9pZCk7XHJcbiAgLy8gICAgIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoXCJ0aXBzLnB1cmNoYXNlU3VjY2Vzc1wiKSk7XHJcbiAgLy8gICAgIHJldHVybjtcclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICB0cnkge1xyXG4gIC8vICAgICBsZXQgcnNwID0gYnV5UmVzdWx0LnJlc3BvbnNlO1xyXG4gIC8vICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gIC8vICAgICAgIEdsb2JhbC5pbnMucGF5bWVudChyc3AuZGF0YS5vcmRlciwgYXN5bmMgKHN0YXR1cykgPT4ge1xyXG4gIC8vICAgICAgICAgY29uc29sZS5sb2coYHRnIHN0YXIgcGF5IHN0YXR1cyA6JHtzdGF0dXN9YCk7XHJcbiAgLy8gICAgICAgICBjb25zdCBjaGVja0Z1biA9IGFzeW5jIChjb3VudDogbnVtYmVyKSA9PiB7XHJcbiAgLy8gICAgICAgICAgIGNvbnN0IG0gPSBhd2FpdCBBcGlTZXJ2aWNlLmlucy5jaGVja09yZGVyKHJzcC5kYXRhLm9yZGVyLm9pZCk7XHJcbiAgLy8gICAgICAgICAgIGlmIChtLnN0YXR1cyA9PT0gMjAwICYmIG0ucmVzcG9uc2U/LnN1Y2Nlc3MpIHtcclxuICAvLyAgICAgICAgICAgICBVSU1hbmFnZXIuaW5zLnNob3dUb2FzdCh0KFwidGlwcy5wdXJjaGFzZVN1Y2Nlc3NcIikpO1xyXG4gIC8vICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjaygpO1xyXG4gIC8vICAgICAgICAgICAgIC8vIEFwaVNlcnZpY2UuaW5zLmdldFVzZXJQcm9wbGlzdCgpO1xyXG4gIC8vICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgLy8gICAgICAgICAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICAgICAgICAgaWYgKC0tY291bnQgPiAwKSB7XHJcbiAgLy8gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tPcmRlciBhZ2FpbicsIGNvdW50KTtcclxuICAvLyAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDAwKSk7XHJcbiAgLy8gICAgICAgICAgICAgICBhd2FpdCBjaGVja0Z1bihjb3VudCk7XHJcbiAgLy8gICAgICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgICAgIGVsc2Uge1xyXG4gIC8vICAgICAgICAgICAgICAgQXBpU2VydmljZS5pbnMuc2hvd0Vycm9yKG0pO1xyXG4gIC8vICAgICAgICAgICAgIH1cclxuICAvLyAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAvLyAgICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgfVxyXG5cclxuICAvLyAgICAgICAgIGlmIChzdGF0dXMgPT09IFwicGFpZFwiKSB7XHJcbiAgLy8gICAgICAgICAgIC8vIDQuIOehruiupOiuouWNleaUr+S7mOeKtuaAgVxyXG4gIC8vICAgICAgICAgICAvL+i/memHjOWkhOeQhuajgOafpeiuouWNle+8jOivt+axgmNoZWNrb3JkZXJcclxuICAvLyAgICAgICAgICAgYXdhaXQgY2hlY2tGdW4oNSk7XHJcbiAgLy8gICAgICAgICB9XHJcbiAgLy8gICAgICAgICBlbHNlIHtcclxuICAvLyAgICAgICAgICAgY29uc29sZS5sb2coXCJ0ZyBzdGFyIHBheSBzdGF0dXMgOlwiICsgc3RhdHVzKTtcclxuICAvLyAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgLy8gICAgICAgICB9XHJcbiAgLy8gICAgICAgfSlcclxuICAvLyAgICAgfSk7XHJcblxyXG4gIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coJ2hhbmRsZVByb3BPcGVyYXRpb24gZXJyb3InLCBlcnJvcik7XHJcbiAgLy8gICAgIFVJTWFuYWdlci5pbnMuc2hvd1RvYXN0KHQoXCJ0aXBzLnBheW1lbnRQZW5kaW5nXCIpKTtcclxuICAvLyAgIH1cclxuICAvLyB9XHJcbn0iXX0=