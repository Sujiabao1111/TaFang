
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameWallet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVXYWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUNwQywyQ0FBOEM7QUFDOUMsMkNBQXNDO0FBRXRDLHVDQUFrQztBQUNsQyx5REFBNkM7QUFHN0Msc0RBQWlEO0FBQ2pELCtDQUEyRDtBQUMzRCx1Q0FBc0M7QUFDdEMsNkNBQTRDO0FBRTVDLHVDQUFzQztBQUN0QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBd0MsOEJBQU07SUFBOUM7UUFBQSxxRUFxTkM7UUFsTlcsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFFOUIsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUNsQyxXQUFXO1FBRUgsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsYUFBTyxHQUFlLElBQUksQ0FBQztRQUczQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR2pDLE1BQU07UUFFRSxpQkFBVyxHQUFjLElBQUksQ0FBQztRQUN0QyxPQUFPO1FBRUMsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0Isa0JBQVksR0FBZ0Isd0JBQVcsQ0FBQyxHQUFHLENBQUM7O0lBdUx4RCxDQUFDO0lBbkxHLDJCQUFNLEdBQU47SUFHQSxDQUFDO0lBRUQseUJBQUksR0FBSixVQUFLLElBQUk7UUFBVCxpQkEyQkM7UUF6QkcsSUFBSSxRQUFRLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFD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aUI7SUEzQmxCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FxTjlCO0lBQUQsaUJBQUM7Q0FyTkQsQUFxTkMsQ0FyTnVDLGdCQUFNLEdBcU43QztrQkFyTm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHBvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb29sXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlLCBDaGFubmVsVHlwZSB9IGZyb20gXCIuLi90Zy9BcGlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tIFwiLi4vdGcvR2xvYmFsXCI7XG5pbXBvcnQgeyBXYWxsZXRNZ3IgfSBmcm9tIFwiLi4vdGcvV2FsbGV0TWdyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi91dGlsL1Rvb2xzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVdhbGxldCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJsZV9teUdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJsZV9teVRvbjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSB1bkJpbmRMYXllcjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBiaW5kTGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8qKiDpkrHljIXpk77mjqUgKi9cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCB9KVxuICAgIHByaXZhdGUgd2FsbGV0TGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVkaXRCb3ggfSlcbiAgICBwcml2YXRlIGVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBydWxlVmlldzogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIC8v5aKe5Yqg5Lic6KW/XG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBwcml2YXRlIGFkZENvaW5JdGVtOiBjYy5QcmVmYWIgPSBudWxsO1xuICAgIC8v5Zyo5ZOq6YeM5aKe5YqgXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBhZGRDb2luQm94OiBjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgcHJpdmF0ZSBjaGFubmVsX3R5cGU6IENoYW5uZWxUeXBlID0gQ2hhbm5lbFR5cGUudG9uO1xuXG4gICAgcHJpdmF0ZSB3YWxsZXRQb29sOiBwb29sO1xuXG4gICAgb25Mb2FkKCkge1xuXG5cbiAgICB9XG5cbiAgICBpbml0KGRhdGEpIHtcblxuICAgICAgICBsZXQgdXNlckRhdGEgPSB1dGlsLnVzZXJEYXRhO1xuICAgICAgICB0aGlzLmxhYmxlX215R29sZC5zdHJpbmcgPSBTdHJpbmcodXNlckRhdGEuY29pbik7XG4gICAgICAgIHRoaXMubGFibGVfbXlUb24uc3RyaW5nID0gXCIwXCI7XG5cblxuXG5cbiAgICAgICAgdGhpcy53YWxsZXRQb29sID0gbmV3IHBvb2woY2MuaW5zdGFudGlhdGUodGhpcy5hZGRDb2luSXRlbSkpO1xuICAgICAgICAvL+aVsOaNruabtOaWsFxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1ZpZXdfVXNlckRhdGFVcGRhdGEsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMgPT0gdXBkYXRlVHlwZS5jb2luKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gdXRpbC51c2VyRGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX215R29sZC5zdHJpbmcgPSBTdHJpbmcodXNlckRhdGEuY29pbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8v5aKe5Yqg6YeR5biBXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfV2FsbGV0X0FkZENvaW4sIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOdW0ocmVzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLnNldF9iaW5kX3dhbGxldChXYWxsZXRNZ3IuaW5zLmlzQ29ubmVjdGVkKCkpO1xuXG4gICAgfVxuXG4gICAgc2V0X2JpbmRfd2FsbGV0KGJpbmQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGJpbmQpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZExheWVyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVuQmluZExheWVyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy53YWxsZXRMYWJlbC5zdHJpbmcgPSBUb29scy50cnVuY2F0ZVN0cmluZyhXYWxsZXRNZ3IuaW5zLmdldEFkZHJlc3MoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRMYXllci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudW5CaW5kTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxuXG4gICAgLyoqXG4gICAgICog6L+e5o6l5Yiw6ZKx5YyFXG4gICAgICpcbiAgICAgKiDlsJ3or5Xov57mjqXliLDpkrHljIXvvIzlpoLmnpzov57mjqXmiJDlip/vvIzliJnmmL7npLrnu5HlrprpkrHljIXmiJDlip/nmoTmj5DnpLrkv6Hmga/jgIJcbiAgICAgKlxuICAgICAqL1xuICAgIGFzeW5jIGNvbm5lY3RUb1dhbGxldCgpIHtcbiAgICAgICAgLy8gYXV0b21hdGljbGx5IGNvbm5lY3Qgd2FsbGV0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIVdhbGxldE1nci5pbnMuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbm5lY3RlZFdhbGxldCA9IGF3YWl0IFdhbGxldE1nci5pbnMuZG9Jbml0V2FsbGV0Q29udGV4dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IGF3YWl0IEFwaVNlcnZpY2UuaW5zLmJpbmRXYWxsZXQoV2FsbGV0TWdyLmlucy5nZXRBZGRyZXNzKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gMjAwICYmIG1zZy5yZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9iaW5kX3dhbGxldCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAobXNnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFwaVNlcnZpY2UuaW5zLnNob3dFcnJvcihtc2cpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGNvbm5lY3RpbmcgdG8gd2FsbGV0OicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coU3RyaW5nKGVycm9yKSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaWreW8gOS4jumSseWMheeahOi/nuaOpVxuICAgICAqXG4gICAgICovXG4gICAgYXN5bmMgZGlzY25uZWN0V2FsbGV0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKFdhbGxldE1nci5pbnMuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IFdhbGxldE1nci5pbnMuZG9Ub25EaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBhd2FpdCBBcGlTZXJ2aWNlLmlucy51bmJpbmRXYWxsZXQoKTtcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09PSAyMDAgJiYgbXNnLnJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldF9iaW5kX3dhbGxldChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIHVuY29ubmVjdGluZyB0byB3YWxsZXQ6Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhTdHJpbmcoZXJyb3IpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWkjeWItumSseWMheWcsOWdgFxuICAgICAqL1xuICAgIGNvcHlfd2FsbGV0X2FkZHJlc3MoKSB7XG4gICAgICAgIGlmIChUb29scy5jb3B5VG9DbGlwYm9hcmQoV2FsbGV0TWdyLmlucy5nZXRBZGRyZXNzKCkpKSB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHQoJ3RpcHMuY29weV9zdWNjZXNzJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KCd0aXBzLmNvcHlfZmFpbCcpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgKiDmj5DnjrDlip/og73lpITnkIblh73mlbBcbiAgICpcbiAgICog5b2T6LCD55So6K+l5Ye95pWw5pe277yM5bCG5bCd6K+V5LuO6L6T5YWl5qGG77yIZWRpdEJveO+8ieS4reiOt+WPluaVsOWAvO+8jOW5tui/m+ihjOS4gOezu+WIl+agoemqjOOAglxuICAgKiDlpoLmnpzmlbDlgLzmnInmlYjvvIjpnZ7nqbrjgIHpnZ7otJ/kuJTkuLrmnInmlYjmlbDlrZfvvInvvIzliJnosIPnlKhBcGlTZXJ2aWNlLmlucy5zdWJtaXRXaXRoZHJhd+aWueazleaPkOS6pOaPkOeOsOivt+axgu+8jFxuICAgKiDlubblpITnkIblk43lupTnu5PmnpzjgIJcbiAgICovXG4gICAgb25XaXRoZHJhd2FsKCkge1xuICAgICAgICBsZXQgbnVtID0gTnVtYmVyKHRoaXMuZWRpdEJveC5zdHJpbmcpO1xuICAgICAgICBpZiAoIW51bSB8fCBudW0gPCAwIHx8IGlzTmFOKG51bSkpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdEJveC5zdHJpbmcgPSAnJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBBcGlTZXJ2aWNlLmlucy5zdWJtaXRXaXRoZHJhdyhudW0sIHRoaXMuY2hhbm5lbF90eXBlKS50aGVuKHJzcCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd2l0aGRyYXdhbCcsIHJzcCk7XG4gICAgICAgICAgICBpZiAocnNwLnN0YXR1cyA9PT0gMjAwICYmIHJzcC5yZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9teVRvbi5zdHJpbmcgPSBUb29scy5nZXROdW1TdHIoR2xvYmFsLmlucy50b25fY29pbik7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KCd0aXBzLndpdGhkcmF3YWxfc3VjY2VzcycpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgQXBpU2VydmljZS5pbnMuc2hvd0Vycm9yKHJzcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICAgIGNsaWNrQ2xvc2UoKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgIH1cblxuXG5cblxuXG5cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIG51bSDmlbDph49cbiAgICAgKiBAcGFyYW0gcG9zIOS9jee9rlxuICAgICAqL1xuICAgIGNyZWF0ZU51bShudW06IG51bWJlcikge1xuICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IHRoaXMud2FsbGV0UG9vbC5jcmVhdGVFbmVteSh0aGlzLmFkZENvaW5Cb3gpO1xuICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLmFkZENvaW5Cb3gpO1xuICAgICAgICBpdGVtLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgaXRlbS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICBpdGVtLmNoaWxkcmVuWzFdICYmIChpdGVtLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBudW0pO1xuICAgICAgICBpdGVtLnNjYWxlID0gMS4xO1xuICAgICAgICBjYy50d2VlbihpdGVtKS5wYXJhbGxlbChcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkuYnkoLjUsIHsgeTogODQgfSksXG4gICAgICAgICAgICBjYy50d2VlbigpLmRlbGF5KC4yNSkudG8oLjI1LCB7IG9wYWNpdHk6IDAgfSlcbiAgICAgICAgKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2FsbGV0UG9vbC5vbkVuZW15S2lsbGVkKGl0ZW0pO1xuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxufVxuIl19