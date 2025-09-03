"use strict";
cc._RF.push(module, 'ccf9f2S/Q5J7JvfAgcKemM3', 'gameNetworkLost');
// Script/pop/gameNetworkLost.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var baseTs_1 = require("../base/baseTs");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameNetworkLost = /** @class */ (function (_super) {
    __extends(gameNetworkLost, _super);
    function gameNetworkLost() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_closeNode = null;
        _this.callback = null;
        return _this;
    }
    gameNetworkLost.prototype.onEnable = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "网络连接超时"
        });
    };
    gameNetworkLost.prototype.init = function (callback) {
        this.node.zIndex = 999;
        this.callback = callback;
        if (XMSDK_1.default.openNetWorkCount > 2) {
            this.btn_closeNode.active = true;
        }
        else {
            this.btn_closeNode.active = false;
        }
    };
    gameNetworkLost.prototype.btnComfirm = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "网络连接超时",
            ck_module: "重试"
        });
        this.callback && this.callback();
        this.callback = null;
        this.closePage();
    };
    gameNetworkLost.prototype.clickClose = function () {
        this.closePage();
    };
    __decorate([
        property(cc.Node)
    ], gameNetworkLost.prototype, "btn_closeNode", void 0);
    gameNetworkLost = __decorate([
        ccclass
    ], gameNetworkLost);
    return gameNetworkLost;
}(baseTs_1.default));
exports.default = gameNetworkLost;

cc._RF.pop();