"use strict";
cc._RF.push(module, '14290wpYXVMv6nPe96f+voY', 'gameOnLinePrize');
// Script/pop/gameOnLinePrize.ts

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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameOnLinePrize = /** @class */ (function (_super) {
    __extends(gameOnLinePrize, _super);
    function gameOnLinePrize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_gold = null;
        _this.lable_addGold = null;
        _this.feed_node = null;
        _this.titleSpr = null;
        _this.titleSprFrame = [];
        _this.btnCommon = null;
        _this.btnNode = null;
        _this.btn_get = null;
        _this.lable_addGold2 = null;
        _this.multipleNode = null;
        _this.addGold = 0;
        _this.isClickGet = false; //是否点击了领取
        return _this;
    }
    gameOnLinePrize.prototype.onLoad = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    gameOnLinePrize.prototype.clickDouble = function () {
        var _this = this;
        if (this.isClickGet) {
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(function () {
            _this.isClickGet = false;
        }, 2);
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "在线时长弹窗",
            ck_module: "双倍领取",
            active_ad_hcdg: "激励视频"
        });
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "在线时长翻倍成功弹窗",
        });
        AdController_1.default.loadAd(AdPosition_1.AdPosition.VideoOnLinePrize, function (res) {
            // if(this.addGold){
            _this.addGold = _this.addGold * 2;
            //     this.lable_addGold.string = "+"+this.addGold+"红包币";
            // } 
            // this.showGetBtn();
            // if(this.titleSprFrame&&this.titleSprFrame[1]){
            //     this.titleSpr.spriteFrame = this.titleSprFrame[1];
            // }
            _this.clickGet();
        }, function () {
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    gameOnLinePrize.prototype.clickCommon = function () {
        var _this = this;
        if (this.isClickGet) {
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(function () {
            _this.isClickGet = false;
        }, 2);
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "在线时长弹窗",
            ck_module: "普通领取"
        });
        this.clickGet();
    };
    gameOnLinePrize.prototype.clickGet = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "在线时长弹窗",
            ck_module: "收下"
        });
        cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: this.node_gold, value: this.addGold, num: 10 });
        util_1.default.addTermCoin(this.addGold);
        this.closePage();
    };
    gameOnLinePrize.prototype.init = function (data) {
        if (data) {
            this.lable_addGold.string = "+" + data.point + "红包币";
            this.addGold = data.point;
            this.lable_addGold2.string = data.point * 2 + "";
        }
        else {
            this.lable_addGold.string = "";
            this.addGold = 0;
        }
    };
    gameOnLinePrize.prototype.showGetBtn = function () {
        if (this.btnNode) {
            this.btnNode.active = false;
        }
        if (this.btn_get) {
            this.btn_get.active = true;
        }
    };
    gameOnLinePrize.prototype.onEnable = function () {
        var _this = this;
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.InfoGameOnLinePrize, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "在线时长弹窗"
        });
        this.titleSpr.spriteFrame = this.titleSprFrame[0];
        if (this.btnNode) {
            this.btnNode.active = true;
        }
        this.btnCommon.active = false;
        this.scheduleOnce(function () {
            if (_this.node)
                _this.btnCommon.active = true;
        }, 3);
        this.btn_get.active = false;
    };
    gameOnLinePrize.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.InfoGameOnLinePrize);
    };
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "node_gold", void 0);
    __decorate([
        property(cc.Label)
    ], gameOnLinePrize.prototype, "lable_addGold", void 0);
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "feed_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], gameOnLinePrize.prototype, "titleSpr", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], gameOnLinePrize.prototype, "titleSprFrame", void 0);
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "btnCommon", void 0);
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "btnNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "btn_get", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数金币" })
    ], gameOnLinePrize.prototype, "lable_addGold2", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameOnLinePrize.prototype, "multipleNode", void 0);
    gameOnLinePrize = __decorate([
        ccclass
    ], gameOnLinePrize);
    return gameOnLinePrize;
}(baseTs_1.default));
exports.default = gameOnLinePrize;

cc._RF.pop();