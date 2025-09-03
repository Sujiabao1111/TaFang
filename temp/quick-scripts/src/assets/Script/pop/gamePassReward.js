"use strict";
cc._RF.push(module, '3f4b6yz/01Ly6iMQ4VhhRIX', 'gamePassReward');
// Script/pop/gamePassReward.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gamePassReward = /** @class */ (function (_super) {
    __extends(gamePassReward, _super);
    function gamePassReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel = null;
        _this.propLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.titleArr = [];
        _this.pic = null;
        _this.picSpriteFrame = [];
        _this.feed_node = null;
        //类型
        _this.typeNum = 1;
        return _this;
        // update (dt) {}
    }
    gamePassReward.prototype.onLoad = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
    };
    /**
     *
     */
    gamePassReward.prototype.init = function () {
        var _this = this;
        this.initData = util_1.default.gameLevelPassRewardVoList[0];
        var text = null;
        var titleNum = 0;
        switch (Number(this.initData.rewardType)) {
            case 1:
                titleNum = 2;
                var data = tool_1.default.GetArrData("type", this.initData.rewardKey, util_1.default.propConfig);
                text = data.explain;
                this.loadAny("texture/prop/prop" + data.type, cc.SpriteFrame, function (res) {
                    _this.pic.spriteFrame = res;
                });
                this.xinxiliui = AdPosition_1.AdPosition.UnlcokPropView;
                TrackMgr_1.default.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "恭喜获得新道具"
                });
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "恭喜获得新道具",
                    ck_module: "收下",
                });
                break;
            case 3:
                text = "";
                titleNum = 1;
                this.pic.spriteFrame = this.picSpriteFrame[1];
                this.xinxiliui = AdPosition_1.AdPosition.UnlcokPlaceView;
                break;
            case 2:
                titleNum = 0;
                text = "+" + this.initData.rewardValue + "红包币";
                this.pic.spriteFrame = this.picSpriteFrame[0];
                this.xinxiliui = AdPosition_1.AdPosition.GamePassCoinView;
                break;
        }
        console.log(this.xinxiliui, 'this.xinxiliui');
        if (this.xinxiliui)
            AdController_1.default.loadInfoAd(this.xinxiliui, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        this.titleArr[titleNum].active = true;
        this.propLabel.node.active = this.rewardLabel.node.active = false;
        if (this.initData.rewardType && this.initData.rewardType == 1) {
            this.propLabel.string = text;
            this.propLabel.node.active = true;
        }
        else {
            this.rewardLabel.string = text;
            this.rewardLabel.node.active = true;
        }
    };
    gamePassReward.prototype.start = function () {
    };
    /**
     * 获取
     */
    gamePassReward.prototype.getBtn = function () {
        soundController_1.default.singleton.clickAudio();
        // cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:this.coin});
        // util.addTermCoin(this.coin);
        switch (Number(this.initData.rewardType)) {
            case 1:
                util_1.default.userData.prop[this.initData.rewardKey - 1].num += this.initData.rewardValue;
                break;
            case 3:
                util_1.default.unlockPlace();
                break;
            case 2:
                cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: this.node, value: this.initData.rewardValue, num: 10 });
                util_1.default.addTermCoin(this.initData.rewardValue);
                break;
        }
        util_1.default.gameLevelPassRewardVoList.splice(0, 1);
        this.closeBtn();
        if (util_1.default.gameLevelPassRewardVoList.length > 0) {
            this.showPage(pageTs_1.default.pageName.GamePassReward);
        }
        else {
            for (var i = 0; i < util_1.default.gameLevelPassRewardNextVoList.length; i++) {
                util_1.default.gameLevelPassRewardVoList.push(util_1.default.gameLevelPassRewardNextVoList[i]);
            }
            util_1.default.gameLevelPassRewardNextVoList = [];
            console.log(util_1.default.gameLevelPassRewardNextVoList, util_1.default.gameLevelPassRewardVoList, 'util.gameLevelPassRewardNextVoList');
            // this.showPage(pageTs.pageName.GameStart);
            cc.game.emit(NameTs_1.default.Game_Start);
        }
    };
    /**
     * 关闭
     */
    gamePassReward.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    gamePassReward.prototype.onEnable = function () {
    };
    gamePassReward.prototype.onDisable = function () {
        if (this.xinxiliui)
            AdController_1.default.hideInfoAd(this.xinxiliui);
        cc.game.emit(NameTs_1.default.Game_PropItem_Update);
    };
    __decorate([
        property({ type: cc.Label, displayName: "文字" })
    ], gamePassReward.prototype, "rewardLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "道具文字" })
    ], gamePassReward.prototype, "propLabel", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "标题" })
    ], gamePassReward.prototype, "titleArr", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "图片" })
    ], gamePassReward.prototype, "pic", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], displayName: "图片集合" })
    ], gamePassReward.prototype, "picSpriteFrame", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gamePassReward.prototype, "feed_node", void 0);
    gamePassReward = __decorate([
        ccclass
    ], gamePassReward);
    return gamePassReward;
}(baseTs_1.default));
exports.default = gamePassReward;

cc._RF.pop();