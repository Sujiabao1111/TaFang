
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gamePassReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3f4b6yz/01Ly6iMQ4VhhRIX', 'gamePassReward');
// Script/pop/gamePassReward.ts

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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var Tools_1 = require("../util/Tools");
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
                var data = Tools_1.Tools.GetArrData("type", this.initData.rewardKey, util_1.default.propConfig);
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQYXNzUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxtREFBa0Q7QUFFbEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUV0QyxzRUFBaUU7QUFDakUsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1Qyx1Q0FBc0M7QUFDdEMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFNO0lBQWxEO1FBQUEscUVBa0tDO1FBL0pXLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFFbkMsNENBQTRDO1FBQzVDLGdDQUFnQztRQUd4QixjQUFRLEdBQWMsRUFBRSxDQUFDO1FBR3pCLFNBQUcsR0FBYyxJQUFJLENBQUM7UUFHdEIsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBR3RDLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFbEMsSUFBSTtRQUNJLGFBQU8sR0FBVyxDQUFDLENBQUM7O1FBeUk1QixpQkFBaUI7SUFDckIsQ0FBQztJQXBJRywrQkFBTSxHQUFOO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO0lBR2pCLENBQUM7SUFDRDs7T0FFRztJQUNILDZCQUFJLEdBQUo7UUFBQSxpQkFzREM7UUFyREcsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEQsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3hCLElBQUksUUFBUSxHQUFXLENBQUMsQ0FBQztRQUl6QixRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBRXRDLEtBQUssQ0FBQztnQkFDRixR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QyxXQUFXLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7MERBQ1o7SUFHOUM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7cURBQ2Q7SUFyQmpCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FrS2xDO0lBQUQscUJBQUM7Q0FsS0QsQUFrS0MsQ0FsSzJDLGdCQUFNLEdBa0tqRDtrQkFsS29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCwgcHJvcFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uL3V0aWwvVG9vbHNcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVQYXNzUmV3YXJkIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmloflrZdcIiB9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLpgZPlhbfmloflrZdcIiB9KVxuICAgIHByaXZhdGUgcHJvcExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdLCBkaXNwbGF5TmFtZTogXCLmoIfpophcIiB9KVxuICAgIHByaXZhdGUgdGl0bGVBcnI6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLlm77niYdcIiB9KVxuICAgIHByaXZhdGUgcGljOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSwgZGlzcGxheU5hbWU6IFwi5Zu+54mH6ZuG5ZCIXCIgfSlcbiAgICBwcml2YXRlIHBpY1Nwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8v57G75Z6LXG4gICAgcHJpdmF0ZSB0eXBlTnVtOiBudW1iZXIgPSAxO1xuICAgIC8vXG4gICAgcHJpdmF0ZSBpbml0RGF0YTogYW55O1xuXG4gICAgcHJpdmF0ZSB4aW54aWxpdWk6IG51bWJlcjtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmxpZ2h0KS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyAgICAgY2MudHdlZW4oKS50bygxLHtzY2FsZToxfSkudG8oMSx7c2NhbGU6MS4xfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuXG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZFZvTGlzdFswXTtcblxuICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gbnVsbDtcbiAgICAgICAgbGV0IHRpdGxlTnVtOiBudW1iZXIgPSAwO1xuXG5cblxuICAgICAgICBzd2l0Y2ggKE51bWJlcih0aGlzLmluaXREYXRhLnJld2FyZFR5cGUpKSB7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aXRsZU51bSA9IDI7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBUb29scy5HZXRBcnJEYXRhKFwidHlwZVwiLCB0aGlzLmluaXREYXRhLnJld2FyZEtleSwgdXRpbC5wcm9wQ29uZmlnKTtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gZGF0YS5leHBsYWluO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFueShcInRleHR1cmUvcHJvcC9wcm9wXCIgKyBkYXRhLnR5cGUsIGNjLlNwcml0ZUZyYW1lLCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGljLnNwcml0ZUZyYW1lID0gcmVzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMueGlueGlsaXVpID0gQWRQb3NpdGlvbi5Vbmxjb2tQcm9wVmlldztcblxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5oGt5Zac6I635b6X5paw6YGT5YW3XCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaBreWWnOiOt+W+l+aWsOmBk+WFt1wiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5pS25LiLXCIsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aXRsZU51bSA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5waWMuc3ByaXRlRnJhbWUgPSB0aGlzLnBpY1Nwcml0ZUZyYW1lWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMueGlueGlsaXVpID0gQWRQb3NpdGlvbi5Vbmxjb2tQbGFjZVZpZXc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGl0bGVOdW0gPSAwO1xuICAgICAgICAgICAgICAgIHRleHQgPSBcIitcIiArIHRoaXMuaW5pdERhdGEucmV3YXJkVmFsdWUgKyBcIue6ouWMheW4gVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucGljLnNwcml0ZUZyYW1lID0gdGhpcy5waWNTcHJpdGVGcmFtZVswXTtcbiAgICAgICAgICAgICAgICB0aGlzLnhpbnhpbGl1aSA9IEFkUG9zaXRpb24uR2FtZVBhc3NDb2luVmlldztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnhpbnhpbGl1aSwgJ3RoaXMueGlueGlsaXVpJylcbiAgICAgICAgaWYgKHRoaXMueGlueGlsaXVpKSBBZENvbnRyb2xsZXIubG9hZEluZm9BZCh0aGlzLnhpbnhpbGl1aSwgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcblxuICAgICAgICB0aGlzLnRpdGxlQXJyW3RpdGxlTnVtXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnByb3BMYWJlbC5ub2RlLmFjdGl2ZSA9IHRoaXMucmV3YXJkTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5pbml0RGF0YS5yZXdhcmRUeXBlICYmIHRoaXMuaW5pdERhdGEucmV3YXJkVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BMYWJlbC5zdHJpbmcgPSB0ZXh0O1xuICAgICAgICAgICAgdGhpcy5wcm9wTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSB0ZXh0O1xuICAgICAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKCkge1xuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICAvLyBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4se25vZGU6dGhpcy5ub2RlLHZhbHVlOnRoaXMuY29pbn0pO1xuICAgICAgICAvLyB1dGlsLmFkZFRlcm1Db2luKHRoaXMuY29pbik7XG5cbiAgICAgICAgc3dpdGNoIChOdW1iZXIodGhpcy5pbml0RGF0YS5yZXdhcmRUeXBlKSkge1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5wcm9wW3RoaXMuaW5pdERhdGEucmV3YXJkS2V5IC0gMV0ubnVtICs9IHRoaXMuaW5pdERhdGEucmV3YXJkVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgdXRpbC51bmxvY2tQbGFjZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLm5vZGUsIHZhbHVlOiB0aGlzLmluaXREYXRhLnJld2FyZFZhbHVlLCBudW06IDEwIH0pO1xuICAgICAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4odGhpcy5pbml0RGF0YS5yZXdhcmRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0LnNwbGljZSgwLCAxKTtcblxuICAgICAgICB0aGlzLmNsb3NlQnRuKCk7XG5cbiAgICAgICAgaWYgKHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZFZvTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lUGFzc1Jld2FyZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZE5leHRWb0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3QucHVzaCh1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmROZXh0Vm9MaXN0W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZE5leHRWb0xpc3QgPSBbXTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2codXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkTmV4dFZvTGlzdCwgdXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0LCAndXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkTmV4dFZvTGlzdCcpXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lU3RhcnQpO1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1N0YXJ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXrVxuICAgICAqL1xuICAgIGNsb3NlQnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuXG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnhpbnhpbGl1aSkgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQodGhpcy54aW54aWxpdWkpO1xuXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qcm9wSXRlbV9VcGRhdGUpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=