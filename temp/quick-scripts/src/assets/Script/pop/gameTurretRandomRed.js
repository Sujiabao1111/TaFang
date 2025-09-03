"use strict";
cc._RF.push(module, '75956mHYulPqbXnOurfDPUc', 'gameTurretRandomRed');
// Script/pop/gameTurretRandomRed.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameTurretRandomRed = /** @class */ (function (_super) {
    __extends(gameTurretRandomRed, _super);
    function gameTurretRandomRed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_prizeNum = null;
        _this.btn_closeNode = null;
        _this.feed_node = null;
        _this.prizeNum = 600;
        return _this;
    }
    gameTurretRandomRed.prototype.start = function () {
        var _this = this;
        this.btn_closeNode.active = false;
        this.scheduleOnce(function () {
            _this.btn_closeNode.active = true;
        }, 3);
    };
    gameTurretRandomRed.prototype.onLoad = function () {
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.turretRandomRed]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.turretRandomRed);
        }
    };
    gameTurretRandomRed.prototype.clickDoubleGet = function () {
        var _this = this;
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '合成炮塔奖励弹窗',
            ck_module: '领取奖励',
            active_ad_hcdg: "激励视频"
        });
        AdController_1.default.loadAd(AdPosition_1.AdPosition.turretRandomRed, function (res) {
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.node, value: _this.prizeNum, num: 10 });
            util_1.default.addTermCoin(_this.prizeNum);
            _this.closePage();
            if (util_1.default.adPreObj[AdPosition_1.AdPosition.turretRandomRed]) {
                util_1.default.preloadAd(AdPosition_1.AdPosition.turretRandomRed);
            }
        }, function () {
            _this.closePage();
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    gameTurretRandomRed.prototype.clickClose = function () {
        this.closePage();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '合成炮塔奖励弹窗',
            ck_module: '放弃奖励'
        });
    };
    gameTurretRandomRed.prototype.onEnable = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "合成炮塔奖励弹窗"
        });
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.turretRandomRedView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
    };
    gameTurretRandomRed.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.turretRandomRedView);
    };
    __decorate([
        property(cc.RichText)
    ], gameTurretRandomRed.prototype, "lable_prizeNum", void 0);
    __decorate([
        property(cc.Node)
    ], gameTurretRandomRed.prototype, "btn_closeNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameTurretRandomRed.prototype, "feed_node", void 0);
    gameTurretRandomRed = __decorate([
        ccclass
    ], gameTurretRandomRed);
    return gameTurretRandomRed;
}(baseTs_1.default));
exports.default = gameTurretRandomRed;

cc._RF.pop();