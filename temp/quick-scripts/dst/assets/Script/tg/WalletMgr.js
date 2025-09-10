
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/tg/WalletMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0Z1xcV2FsbGV0TWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFHMUMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBRXJDO0lBQStCLDZCQUFTO0lBQXhDOztJQThGQSxDQUFDO0lBN0ZHLHNCQUFXLGdCQUFHO2FBQWQ7WUFDSSxPQUFPLE9BQU0sV0FBVyxXQUFhLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFHRCxPQUFPO0lBQ1AsdUNBQW1CLEdBQW5CLFVBQW9CLFNBQW9CO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNyQixPQUFNO1NBQ1Q7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBCLGFBQWE7UUFDYixtQkFBbUIsQ0FBQztZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3JCLGlCQUFpQjtZQUNqQiw4Q0FBOEM7WUFDOUMsb0NBQW9DO1lBQ3BDLEtBQUs7WUFDTCxTQUFTLElBQUksU0FBUyxFQUFFLENBQUE7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsU0FBUztJQUNULG1DQUFlLEdBQWYsVUFBZ0IsU0FBb0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3JCLE9BQU07U0FDVDtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckIsYUFBYTtRQUNiLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3ZCLG9EQUFvRDtZQUNwRCxTQUFTLElBQUksU0FBUyxFQUFFLENBQUE7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLGtDQUFjLEdBQWQsVUFBZSxTQUFtQjtRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDckIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ1osT0FBTTtTQUNUO1FBQ0QsYUFBYTtRQUNiLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELFNBQVM7SUFDVCwrQkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3hCLEdBQUc7WUFDSCxXQUFXO1lBQ1gsa0NBQWtDO1lBQ2xDLGtCQUFrQjtZQUNsQixJQUFJO1lBQ0osT0FBTyxLQUFLLENBQUE7U0FDZjtRQUNELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFDbEQsQ0FBQztJQUVELFNBQVM7SUFDVCw4QkFBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3hCLE9BQU8sYUFBYSxDQUFBO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDeEIsT0FBTyxhQUFhLENBQUE7U0FDdkI7UUFDRCxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBO0lBQ3BDLENBQUM7SUFFRCxTQUFTO0lBQ1QsOEJBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUN4QixPQUFPLGFBQWEsQ0FBQTtTQUN2QjtRQUNELElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3hCLE9BQU8sYUFBYSxDQUFBO1NBQ3ZCO1FBQ0QsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQTtJQUN2QyxDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQTlGQSxBQThGQyxDQTlGOEIsbUJBQVMsR0E4RnZDO0FBOUZZLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNpbmdsZXRvbiBmcm9tIFwiLi4vYmFzZS9TaW5nbGV0b25cIjtcclxuXHJcblxyXG5jb25zdCBjb25uZWN0b3IgPSB3aW5kb3dbXCJjb25uZWN0b3JcIl1cclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxsZXRNZ3IgZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG4gICAgc3RhdGljIGdldCBpbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldEluc3RhbmNlPFdhbGxldE1ncj4oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g6ZO+5o6l6ZKx5YyFXHJcbiAgICBkb0luaXRXYWxsZXRDb250ZXh0KGNhbGxiYWNrcz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3dbXCJUZWxlZ3JhbVwiXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndlYuS4jeaUr+aMgVwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLpk77mjqXpkrHljIVcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGRvSW5pdFdhbGxldENvbnRleHQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIumTvuaOpemSseWMheaIkOWKn1wiKVxyXG4gICAgICAgICAgICAvLyBHYW1lQXBwLnNlbmQoe1xyXG4gICAgICAgICAgICAvLyAgICAgTXNnSWQ6IENNc2dEZWZpbmUuTXNnSWRfQzJTX0JpbmRXYWxsZXQsXHJcbiAgICAgICAgICAgIC8vICAgICBXYWxsZXRBZGRyOiB0aGlzLmdldEFkZHJlc3MoKVxyXG4gICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICBjYWxsYmFja3MgJiYgY2FsbGJhY2tzKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOaWreW8gOmTvuaOpemSseWMhVxyXG4gICAgZG9Ub25EaXNjb25uZWN0KGNhbGxiYWNrcz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3dbXCJUZWxlZ3JhbVwiXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndlYuS4jeaUr+aMgVwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmlq3lvIDpk77mjqXpkrHljIVcIilcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZG9Ub25EaXNjb25uZWN0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pat5byA6ZO+5o6l6ZKx5YyF5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgIC8vIEdhbWVBcHAuZGlzcGF0Y2hFdmVudChcIkVfT25SZWZyZXNoV2FsbGV0Q29udGV4dFwiKVxyXG4gICAgICAgICAgICBjYWxsYmFja3MgJiYgY2FsbGJhY2tzKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPllRvbiDlj6/ku6XmjaLlpJrlsJFVc2RcclxuICAgIEdldFRvblVzZFByaWNlKGNhbGxiYWNrczogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXdpbmRvd1tcIlRlbGVncmFtXCJdKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2Vi5LiN5pSv5oyBXCIpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcygxKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIEdldFRvblVzZFByaWNlKCkudGhlbigocmF0ZSkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFja3MocmF0ZSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOmSseWMheaYr+WQpumTvuaOpVxyXG4gICAgaXNDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3dbXCJUZWxlZ3JhbVwiXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldFQum7mOiupOayoeaciemTvuaOpVwiKVxyXG4gICAgICAgICAgICAvLyBcclxuICAgICAgICAgICAgLy93ZWLov5Tlm550cnVlXHJcbiAgICAgICAgICAgIC8vIGlmIChHYW1lQ29uZmlnLk1vZGUgPT0gXCJkZXZcIikge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbm5lY3RvciA/IGNvbm5lY3Rvci5jb25uZWN0ZWQgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPlumSseWMheWcsOWdgFxyXG4gICAgZ2V0QWRkcmVzcygpIHtcclxuICAgICAgICBpZiAoIXdpbmRvd1tcIlRlbGVncmFtXCJdKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV0VC6buY6K6k5rKh5pyJ6ZO+5o6lXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBcImZha2VBZGRyZXNzXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY29ubmVjdG9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YWI5Yik5pat6ZKx5YyF5piv5ZCm6ZO+5o6lXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBcImZha2VBZGRyZXNzXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rvci5hY2NvdW50LmFkZHJlc3NcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bpkrHljIXlkI3lrZdcclxuICAgIGdldEFwcE5hbWUoKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3dbXCJUZWxlZ3JhbVwiXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldFQum7mOiupOayoeaciemTvuaOpVwiKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJmYWtlQXBwTmFtZVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29ubmVjdG9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YWI5Yik5pat6ZKx5YyF5piv5ZCm6ZO+5o6lXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBcImZha2VBcHBOYW1lXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rvci53YWxsZXRJbmZvLmFwcE5hbWVcclxuICAgIH1cclxuXHJcbn0iXX0=