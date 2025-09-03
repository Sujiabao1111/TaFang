"use strict";
cc._RF.push(module, 'd079dDjtXpL5b/SfTUmJ1hK', 'gamePass');
// Script/pop/gamePass.ts

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
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gamePass = /** @class */ (function (_super) {
    __extends(gamePass, _super);
    function gamePass() {
        // @property({type:cc.Label,displayName:"倒计时Label"})
        // private djsLabel:cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customLabel = null;
        // private djsNum:number = 3;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.feed_node = null;
        return _this;
        // update (dt) {}
    }
    gamePass.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
    };
    /**
     * 初始化
     */
    gamePass.prototype.init = function () {
        var _this = this;
        var text = null;
        for (var i = 0; i < util_1.default.behaviorRewardVoList.length; i++) {
            var item = util_1.default.behaviorRewardVoList[i];
            console.log(item.rewardType, 'item.rewardType');
            switch (Number(item.rewardType)) {
                case 1:
                    text = "道具";
                    break;
                case 2:
                    text = "地块";
                    break;
                case 3:
                    text = "金币";
                    break;
            }
            text += text + "+";
        }
        var customs = util_1.default.userData.customs;
        this.customLabel.string = "关卡" + customs.big + "-" + customs.small;
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.gameLevelIndex,
            success: function (data) {
                if (!_this.isValid) {
                    return;
                }
                console.log("设置er次----------------------------------------------------------" + JSON.stringify(data.mapConfig));
                //util.behaviorRewardVoList = data.behaviorRewardVoList;
                // util.mapConfig = data.mapConfig;
                util_1.default.getnowmapdata();
                util_1.default.gameLevelPassRewardNextVoList = data.gameLevelPassRewardVoList || [];
                console.log(tool_1.default.GetArrData("type", 4, data.behaviorRewardVoList).reward, data.behaviorRewardVoList, 'tool.GetArrData("type",4,data.behaviorRewardVoList).reward');
                util_1.default.gameLevelPassRewardNextVoList.push({
                    rewardType: 2,
                    rewardValue: tool_1.default.GetArrData("type", 4, data.behaviorRewardVoList).reward
                });
            }
        });
    };
    /**
     * 关闭页面
     */
    gamePass.prototype.close = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        if (util_1.default.gameLevelPassRewardVoList.length > 0) {
            // for(let i = 0;i<util.gameLevelPassRewardVoList.length;i++){
            this.showPage(pageTs_1.default.pageName.GamePassReward);
            // }
        }
        else {
            // this.showPage(pageTs.pageName.GameStart);
            cc.game.emit(NameTs_1.default.Game_Start);
        }
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "通关成功",
            ck_module: "点击领取",
        });
    };
    gamePass.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.GamePssView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.GamePssView]){
        //     util.preloadAd(AdPosition.GamePssView,true);
        // }
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.GamePassCoinView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.GamePassCoinView, true);
        }
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.UnlcokPropView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.UnlcokPropView, true);
        }
    };
    gamePass.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.GamePssView);
    };
    __decorate([
        property({ type: cc.Label, displayName: "关卡" })
    ], gamePass.prototype, "customLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gamePass.prototype, "feed_node", void 0);
    gamePass = __decorate([
        ccclass
    ], gamePass);
    return gamePass;
}(baseTs_1.default));
exports.default = gamePass;

cc._RF.pop();