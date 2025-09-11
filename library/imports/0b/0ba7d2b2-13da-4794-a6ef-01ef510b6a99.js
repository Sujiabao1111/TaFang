"use strict";
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