"use strict";
cc._RF.push(module, 'e3a7c/8OaxE2YriOKJymWux', 'gameDetention');
// Script/pop/gameDetention.ts

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
var AdPosition_1 = require("../common/AdPosition");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameDetention = /** @class */ (function (_super) {
    __extends(gameDetention, _super);
    function gameDetention() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.feed_node = null;
        return _this;
    }
    gameDetention.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.InfoDetentionView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "挽留弹窗"
        });
    };
    gameDetention.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.InfoDetentionView);
    };
    gameDetention.prototype.start = function () {
    };
    gameDetention.prototype.clickClose = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u633D\u7559\u5F39\u7A97",
            ck_module: "继续游戏"
        });
        this.closePage();
    };
    gameDetention.prototype.clickExit = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u633D\u7559\u5F39\u7A97",
            ck_module: "残忍离去"
        });
        XMSDK_1.default.exitGame();
        //退出时间
        util_1.default.setStorage(util_1.default.localDiary.offlineTime, new Date().getTime());
        XMSDK_1.default.trackUserProperties({
            synthesis_times_hcdg: util_1.default.userData.synthesis_All,
        });
        util_1.default.userData.synthesis_All = 0;
    };
    __decorate([
        property(cc.Node)
    ], gameDetention.prototype, "feed_node", void 0);
    gameDetention = __decorate([
        ccclass
    ], gameDetention);
    return gameDetention;
}(baseTs_1.default));
exports.default = gameDetention;

cc._RF.pop();