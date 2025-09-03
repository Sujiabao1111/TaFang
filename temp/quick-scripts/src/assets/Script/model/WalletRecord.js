"use strict";
cc._RF.push(module, '76d58CQSGFObp6iA+fvtlfG', 'WalletRecord');
// Script/model/WalletRecord.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WalletRecord = /** @class */ (function (_super) {
    __extends(WalletRecord, _super);
    function WalletRecord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_money = null;
        _this.lable_time = null;
        _this.lable_state = null;
        _this.lable_explain = null;
        _this.haveExplain = null;
        return _this;
        // update (dt) {},
    }
    WalletRecord.prototype.start = function () {
    };
    WalletRecord.prototype.onDisable = function () {
    };
    WalletRecord.prototype.updateData = function (data) {
        var self = this;
        self.lable_money.string = data.amount + "\u5143";
        self.lable_time.string = self.formatDate(data.createTime);
        var tempColor = new cc.Color();
        if (data.state == 0) {
            self.lable_state.string = "审核中";
            self.lable_state.node.color = tempColor.fromHEX("#FF7709");
        }
        else if (data.state == 2) {
            self.lable_state.string = "审核不通过";
            self.lable_state.node.color = tempColor.fromHEX("#CD241E");
        }
        else if (data.state == 3) {
            self.lable_state.string = "审核已转账";
            self.lable_state.node.color = tempColor.fromHEX("#1E9914");
        }
        if (data.state != 2) {
            self.haveExplain.active = false;
            self.lable_explain.node.active = false;
            self.node.height = 140;
        }
        else {
            self.lable_explain.string = data.remark;
            self.lable_explain.node.active = true;
            self.haveExplain.active = true;
            self.node.height = 280;
        }
    };
    WalletRecord.prototype.formatDate = function (date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
    };
    __decorate([
        property(cc.Label)
    ], WalletRecord.prototype, "lable_money", void 0);
    __decorate([
        property(cc.Label)
    ], WalletRecord.prototype, "lable_time", void 0);
    __decorate([
        property(cc.Label)
    ], WalletRecord.prototype, "lable_state", void 0);
    __decorate([
        property(cc.Label)
    ], WalletRecord.prototype, "lable_explain", void 0);
    __decorate([
        property(cc.Node)
    ], WalletRecord.prototype, "haveExplain", void 0);
    WalletRecord = __decorate([
        ccclass
    ], WalletRecord);
    return WalletRecord;
}(cc.Component));
exports.default = WalletRecord;
;

cc._RF.pop();