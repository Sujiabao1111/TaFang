"use strict";
cc._RF.push(module, 'd079dDjtXpL5b/SfTUmJ1hK', 'gamePass');
// Script/pop/gamePass.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var LanguageData_1 = require("../Language/LanguageData");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
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
        this.customLabel.string = LanguageData_1.t("main.level") + customs.big + "-" + customs.small;
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.gameLevelIndex,
            success: function (data) {
                if (!_this.isValid) {
                    return;
                }
                console.log("设置er次-----------------------------------" + JSON.stringify(data.mapConfig));
                //util.behaviorRewardVoList = data.behaviorRewardVoList;
                // util.mapConfig = data.mapConfig;
                util_1.default.getnowmapdata();
                util_1.default.gameLevelPassRewardNextVoList = data.gameLevelPassRewardVoList || [];
                // console.log(Tools.GetArrData("type", 4, data.behaviorRewardVoList).reward, data.behaviorRewardVoList, 'Tools.GetArrData("type",4,data.behaviorRewardVoList).reward')
                util_1.default.gameLevelPassRewardNextVoList.push({
                    rewardType: 2,
                    rewardValue: Tools_1.Tools.GetArrData("type", 4, data.behaviorRewardVoList).reward
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
    };
    gamePass.prototype.onEnable = function () {
        // AdController.loadInfoAd(AdPosition.GamePssView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.GamePssView]){
        //     util.preloadAd(AdPosition.GamePssView,true);
        // }
        // if (!util.adPreObj[AdPosition.GamePassCoinView]) {
        //     util.preloadAd(AdPosition.GamePassCoinView, true);
        // }
        // if (!util.adPreObj[AdPosition.UnlcokPropView]) {
        //     util.preloadAd(AdPosition.UnlcokPropView, true);
        // }
    };
    gamePass.prototype.onDisable = function () {
        // AdController.hideInfoAd(AdPosition.GamePssView);
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