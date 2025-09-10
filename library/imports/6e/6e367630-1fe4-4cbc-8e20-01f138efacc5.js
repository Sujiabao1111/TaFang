"use strict";
cc._RF.push(module, '6e367YwH+RMvI4gAfE476zF', 'WalletMgr');
// Script/tg/WalletMgr.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletMgr = void 0;
var Singleton_1 = require("../base/Singleton");
var connector = window["connector"];
var WalletMgr = /** @class */ (function (_super) {
    __extends(WalletMgr, _super);
    function WalletMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WalletMgr, "ins", {
        get: function () {
            return _super.getInstance.call(this);
        },
        enumerable: false,
        configurable: true
    });
    // 链接钱包
    WalletMgr.prototype.doInitWalletContext = function (callbacks) {
        if (!window["Telegram"]) {
            console.log("web不支持");
            return;
        }
        console.log("链接钱包");
        // @ts-ignore
        doInitWalletContext(function () {
            console.log("链接钱包成功");
            // GameApp.send({
            //     MsgId: CMsgDefine.MsgId_C2S_BindWallet,
            //     WalletAddr: this.getAddress()
            // })
            callbacks && callbacks();
        });
    };
    // 断开链接钱包
    WalletMgr.prototype.doTonDisconnect = function (callbacks) {
        if (!window["Telegram"]) {
            console.log("web不支持");
            return;
        }
        console.log("断开链接钱包");
        // @ts-ignore
        doTonDisconnect().then(function () {
            console.log("断开链接钱包成功");
            // GameApp.dispatchEvent("E_OnRefreshWalletContext")
            callbacks && callbacks();
        });
    };
    // 获取Ton 可以换多少Usd
    WalletMgr.prototype.GetTonUsdPrice = function (callbacks) {
        if (!window["Telegram"]) {
            console.log("web不支持");
            callbacks(1);
            return;
        }
        // @ts-ignore
        GetTonUsdPrice().then(function (rate) {
            callbacks(rate);
        });
    };
    // 钱包是否链接
    WalletMgr.prototype.isConnected = function () {
        if (!window["Telegram"]) {
            console.log("WEB默认没有链接");
            // 
            //web返回true
            // if (GameConfig.Mode == "dev") {
            //     return true
            // }
            return false;
        }
        return connector ? connector.connected : false;
    };
    // 获取钱包地址
    WalletMgr.prototype.getAddress = function () {
        if (!window["Telegram"]) {
            console.log("WEB默认没有链接");
            return "fakeAddress";
        }
        if (!connector) {
            console.log("先判断钱包是否链接");
            return "fakeAddress";
        }
        return connector.account.address;
    };
    // 获取钱包名字
    WalletMgr.prototype.getAppName = function () {
        if (!window["Telegram"]) {
            console.log("WEB默认没有链接");
            return "fakeAppName";
        }
        if (!connector) {
            console.log("先判断钱包是否链接");
            return "fakeAppName";
        }
        return connector.walletInfo.appName;
    };
    return WalletMgr;
}(Singleton_1.default));
exports.WalletMgr = WalletMgr;

cc._RF.pop();