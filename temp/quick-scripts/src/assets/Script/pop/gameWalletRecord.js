"use strict";
cc._RF.push(module, 'a0963AQdVxLZ5lKurpTCebI', 'gameWalletRecord');
// Script/pop/gameWalletRecord.ts

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
var WalletRecord_1 = require("../model/WalletRecord");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameWalletRecord = /** @class */ (function (_super) {
    __extends(gameWalletRecord, _super);
    function gameWalletRecord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.haveRecordNode = null;
        _this.noRecordNode = null;
        _this.walletRecordPre = null;
        _this.recordContent = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    gameWalletRecord.prototype.onEnable = function () {
        var _this = this;
        XMSDK_1.default.post({
            url: UrlConst_1.UrlConst.wallet_record,
            onSuccess: function (res) {
                if (!_this.isValid) {
                    return;
                }
                if (res.code === 0) {
                    var recordData = res.data.list;
                    var recordChild = _this.recordContent.children;
                    var addNum = 0; //需要添加的recordItem
                    if (recordChild.length < recordData.length) {
                        addNum = recordData.length - recordChild.length;
                    }
                    for (var i = 0; i < addNum; i++) {
                        var recordItem = cc.instantiate(_this.walletRecordPre);
                        recordItem.parent = _this.recordContent;
                        recordItem.active = true;
                    }
                    if (recordData.length > 0) {
                        _this.noRecordNode.active = false;
                        _this.haveRecordNode.active = true;
                        for (var i = 0; i < recordData.length; i++) {
                            if (recordChild[i]) {
                                recordChild[i].getComponent(WalletRecord_1.default).updateData(recordData[i]);
                            }
                        }
                    }
                    else {
                        _this.noRecordNode.active = true;
                        _this.haveRecordNode.active = false;
                    }
                }
                else {
                }
            },
            onFail: function (err) {
            }
        });
    };
    gameWalletRecord.prototype.clickClose = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    __decorate([
        property(cc.Node)
    ], gameWalletRecord.prototype, "haveRecordNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameWalletRecord.prototype, "noRecordNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], gameWalletRecord.prototype, "walletRecordPre", void 0);
    __decorate([
        property(cc.Node)
    ], gameWalletRecord.prototype, "recordContent", void 0);
    gameWalletRecord = __decorate([
        ccclass
    ], gameWalletRecord);
    return gameWalletRecord;
}(baseTs_1.default));
exports.default = gameWalletRecord;

cc._RF.pop();