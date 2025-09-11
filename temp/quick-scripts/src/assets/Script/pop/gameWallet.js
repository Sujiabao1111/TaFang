"use strict";
cc._RF.push(module, '0ab1ciE7xFOeb8enGVsGtJj', 'gameWallet');
// Script/pop/gameWallet.ts

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
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pool_1 = require("../common/pool");
var LanguageData_1 = require("../Language/LanguageData");
var soundController_1 = require("../soundController");
var ApiService_1 = require("../tg/ApiService");
var Global_1 = require("../tg/Global");
var WalletMgr_1 = require("../tg/WalletMgr");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameWallet = /** @class */ (function (_super) {
    __extends(gameWallet, _super);
    function gameWallet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_myGold = null;
        _this.lable_myTon = null;
        _this.unBindLayer = null;
        _this.bindLayer = null;
        /** 钱包链接 */
        _this.walletLabel = null;
        _this.editBox = null;
        _this.ruleView = null;
        //增加东西
        _this.addCoinItem = null;
        //在哪里增加
        _this.addCoinBox = null;
        _this.channel_type = ApiService_1.ChannelType.ton;
        return _this;
    }
    gameWallet.prototype.onLoad = function () {
    };
    gameWallet.prototype.init = function (data) {
        var _this = this;
        var userData = util_1.default.userData;
        this.lable_myGold.string = String(userData.coin);
        this.lable_myTon.string = "0";
        this.walletPool = new pool_1.default(cc.instantiate(this.addCoinItem));
        //数据更新
        cc.game.on(NameTs_1.default.Game_View_UserDataUpdata, function (res) {
            if (res == faceTs_1.updateType.coin) {
                var userData_1 = util_1.default.userData;
                _this.lable_myGold.string = String(userData_1.coin);
            }
        }, this);
        //增加金币
        cc.game.on(NameTs_1.default.Game_Wallet_AddCoin, function (res) {
            if (res > 0) {
                _this.createNum(res);
            }
        }, this);
        this.set_bind_wallet(WalletMgr_1.WalletMgr.ins.isConnected());
    };
    gameWallet.prototype.set_bind_wallet = function (bind) {
        if (bind) {
            this.bindLayer.active = true;
            this.unBindLayer.active = false;
            this.walletLabel.string = Tools_1.Tools.truncateString(WalletMgr_1.WalletMgr.ins.getAddress());
        }
        else {
            this.bindLayer.active = false;
            this.unBindLayer.active = true;
        }
    };
    /**
     * 连接到钱包
     *
     * 尝试连接到钱包，如果连接成功，则显示绑定钱包成功的提示信息。
     *
     */
    gameWallet.prototype.connectToWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connectedWallet, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!!WalletMgr_1.WalletMgr.ins.isConnected()) return [3 /*break*/, 2];
                        return [4 /*yield*/, WalletMgr_1.WalletMgr.ins.doInitWalletContext(function () { return __awaiter(_this, void 0, void 0, function () {
                                var msg;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, ApiService_1.ApiService.ins.bindWallet(WalletMgr_1.WalletMgr.ins.getAddress())];
                                        case 1:
                                            msg = _a.sent();
                                            if (msg.status === 200 && msg.response.success) {
                                                this.set_bind_wallet(true);
                                            }
                                            else {
                                                // AssistCtr.showToastTip(msg);
                                                ApiService_1.ApiService.ins.showError(msg);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        connectedWallet = _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.warn('Error connecting to wallet:');
                        console.log(String(error_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 断开与钱包的连接
     *
     */
    gameWallet.prototype.discnnectWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!WalletMgr_1.WalletMgr.ins.isConnected()) return [3 /*break*/, 2];
                        return [4 /*yield*/, WalletMgr_1.WalletMgr.ins.doTonDisconnect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, ApiService_1.ApiService.ins.unbindWallet()];
                    case 3:
                        msg = _a.sent();
                        if (msg.status === 200 && msg.response.success) {
                            this.set_bind_wallet(false);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.warn('Error unconnecting to wallet:');
                        console.log(String(error_2));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 复制钱包地址
     */
    gameWallet.prototype.copy_wallet_address = function () {
        if (Tools_1.Tools.copyToClipboard(WalletMgr_1.WalletMgr.ins.getAddress())) {
            AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('tips.copy_success'));
        }
        else {
            AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('tips.copy_fail'));
        }
    };
    /**
   * 提现功能处理函数
   *
   * 当调用该函数时，将尝试从输入框（editBox）中获取数值，并进行一系列校验。
   * 如果数值有效（非空、非负且为有效数字），则调用ApiService.ins.submitWithdraw方法提交提现请求，
   * 并处理响应结果。
   */
    gameWallet.prototype.onWithdrawal = function () {
        var _this = this;
        var num = Number(this.editBox.string);
        if (!num || num < 0 || isNaN(num)) {
            this.editBox.string = '';
            return;
        }
        ApiService_1.ApiService.ins.submitWithdraw(num, this.channel_type).then(function (rsp) {
            console.log('withdrawal', rsp);
            if (rsp.status === 200 && rsp.response.success) {
                _this.lable_myTon.string = Tools_1.Tools.getNumStr(Global_1.Global.ins.ton_coin);
                AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('tips.withdrawal_success'));
            }
            else {
                ApiService_1.ApiService.ins.showError(rsp);
            }
        });
    };
    gameWallet.prototype.clickClose = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    /**
     *
     * @param num 数量
     * @param pos 位置
     */
    gameWallet.prototype.createNum = function (num) {
        var _this = this;
        var item = this.walletPool.createEnemy(this.addCoinBox);
        item.setParent(this.addCoinBox);
        item.setPosition(0, 0);
        item.getComponent(cc.Sprite).enabled = false;
        item.opacity = 255;
        item.children[1] && (item.children[1].getComponent(cc.Label).string = "+" + num);
        item.scale = 1.1;
        cc.tween(item).parallel(cc.tween().by(.5, { y: 84 }), cc.tween().delay(.25).to(.25, { opacity: 0 })).call(function () {
            _this.walletPool.onEnemyKilled(item);
        }).start();
    };
    __decorate([
        property(cc.Label)
    ], gameWallet.prototype, "lable_myGold", void 0);
    __decorate([
        property(cc.Label)
    ], gameWallet.prototype, "lable_myTon", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "unBindLayer", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "bindLayer", void 0);
    __decorate([
        property({ type: cc.Label })
    ], gameWallet.prototype, "walletLabel", void 0);
    __decorate([
        property({ type: cc.EditBox })
    ], gameWallet.prototype, "editBox", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "ruleView", void 0);
    __decorate([
        property(cc.Prefab)
    ], gameWallet.prototype, "addCoinItem", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "addCoinBox", void 0);
    gameWallet = __decorate([
        ccclass
    ], gameWallet);
    return gameWallet;
}(baseTs_1.default));
exports.default = gameWallet;

cc._RF.pop();