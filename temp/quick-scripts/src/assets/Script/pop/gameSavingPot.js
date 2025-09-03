"use strict";
cc._RF.push(module, '13b9bbRoa9MqraQg0XCIdng', 'gameSavingPot');
// Script/pop/gameSavingPot.ts

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
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameSavingPot = /** @class */ (function (_super) {
    __extends(gameSavingPot, _super);
    function gameSavingPot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coinLabel = null;
        _this.timeLabel = null;
        _this.getBtnNode = null;
        _this.tomorrowBtnNode = null;
        _this.walletBtnWidget = null; //提现按钮
        _this.walletLabel = null;
        _this.coin = 0; //随机金币
        return _this;
        // update (dt) {}
    }
    gameSavingPot.prototype.onLoad = function () {
        var _this = this;
        //数据更新
        cc.game.on(NameTs_1.default.Game_View_UserDataUpdata, function (res) {
            if (res == faceTs_1.updateType.coin) {
                var userData = util_1.default.userData;
                _this.walletLabel.string = String(userData.coin);
            }
        }, this);
        cc.game.emit(NameTs_1.default.Game_View_UserDataUpdata, faceTs_1.updateType.coin);
        this.walletBtnWidget.top += Number(util_1.default.iphoneXTop);
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "存钱罐弹窗",
        });
    };
    gameSavingPot.prototype.start = function () {
    };
    /**初始化 */
    gameSavingPot.prototype.init = function () {
        var _this = this;
        util_1.default.post({
            url: UrlConst_1.UrlConst.savingPotIndex,
            success: function (data) {
                var state = 0;
                if (data) {
                    _this.coin = data.point;
                    state = data.status;
                }
                if (state == 0) {
                    cc.game.emit(NameTs_1.default.Game_SavingPost_Icon);
                }
                _this.tomorrowBtnNode && (_this.tomorrowBtnNode.active = state == 0 ? true : false);
                _this.getBtnNode && (_this.getBtnNode.active = state == 1 ? true : false);
                _this.setState();
            },
            fail: function () {
                _this.tomorrowBtnNode && (_this.tomorrowBtnNode.active = true);
                _this.getBtnNode && (_this.getBtnNode.active = false);
                _this.setState();
                AssistCtr_1.AssistCtr.showToastTip("网络问题，请稍后！");
            }
        });
    };
    /**设置东西 */
    gameSavingPot.prototype.setState = function () {
        var _this = this;
        this.coinLabel.string = this.coin + "红包币";
        this.getBtnNode.stopAllActions();
        if (this.getBtnNode.active) {
            cc.tween(this.getBtnNode).repeatForever(cc.tween().to(.5, { scale: 1.1 }).to(.5, { scale: 1 })).start();
        }
        if (this.tomorrowBtnNode.active) {
            this.unscheduleAllCallbacks();
            this.timeLabel.string = "倒计时 " + tool_1.default.formatData(5);
            this.schedule(function () {
                _this.timeLabel.string = "倒计时 " + tool_1.default.formatData(5);
                if (tool_1.default.formatData(5) == "00:00:00") {
                    _this.init();
                }
            }, 1);
        }
    };
    gameSavingPot.prototype.getBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        util_1.default.post({
            url: UrlConst_1.UrlConst.savingPotReceive,
            success: function () {
                TrackMgr_1.default.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "存钱罐弹窗",
                    dialog_enter: "领取"
                });
                var savingPotIcon = util_1.default.GlobalMap.get("savingPot") || _this.node;
                cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: savingPotIcon, value: _this.coin, num: 10 });
                cc.game.emit(NameTs_1.default.Game_SavingPost_Icon);
                _this.tomorrowBtnNode.active = true;
                _this.getBtnNode.active = false;
                _this.setState();
                AssistCtr_1.AssistCtr.showToastTip("获取" + _this.coin + "红包币");
                _this.closePage();
            },
            fail: function () {
                AssistCtr_1.AssistCtr.showToastTip("网络问题，请稍后！");
            }
        });
    };
    /**
     * 关闭页面
     */
    gameSavingPot.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "存钱罐弹窗",
            dialog_enter: "关闭"
        });
        this.closePage();
    };
    /**提现 */
    gameSavingPot.prototype.walletBtn = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "转盘",
            app_ck_module: "提现",
            app_exposure_type: "icon",
        });
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameWallet);
    };
    __decorate([
        property({ type: cc.Label, displayName: "金币" })
    ], gameSavingPot.prototype, "coinLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倒计时" })
    ], gameSavingPot.prototype, "timeLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "领取按钮" })
    ], gameSavingPot.prototype, "getBtnNode", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "明日按钮" })
    ], gameSavingPot.prototype, "tomorrowBtnNode", void 0);
    __decorate([
        property({ type: cc.Widget, displayName: "提现按钮widget" })
    ], gameSavingPot.prototype, "walletBtnWidget", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "钱包金币" })
    ], gameSavingPot.prototype, "walletLabel", void 0);
    gameSavingPot = __decorate([
        ccclass
    ], gameSavingPot);
    return gameSavingPot;
}(baseTs_1.default));
exports.default = gameSavingPot;

cc._RF.pop();