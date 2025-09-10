
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gamePass.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var LanguageData_1 = require("../Language/LanguageData");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
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
        this.customLabel.string = LanguageData_1.t("main.level") + customs.big + "-" + customs.small;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxtREFBa0Q7QUFFbEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0Qyx5REFBNkM7QUFDN0MsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHVDQUFzQztBQUN0QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQU07SUFBNUM7UUFHSSxvREFBb0Q7UUFDcEQsb0NBQW9DO1FBSnhDLHFFQTBIQztRQW5IVyxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUNyQyw2QkFBNkI7UUFFN0IsNENBQTRDO1FBQzVDLGdDQUFnQztRQUl4QixlQUFTLEdBQVksSUFBSSxDQUFDOztRQTBHbEMsaUJBQWlCO0lBQ3JCLENBQUM7SUExR0csd0JBQUssR0FBTDtRQUVJLHNDQUFzQztRQUN0QyxtREFBbUQ7UUFDbkQsYUFBYTtJQUVqQixDQUFDO0lBRUQ7O09BRUc7SUFDSCx1QkFBSSxHQUFKO1FBQUEsaUJBaURDO1FBOUNHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2RCxJQUFJLElBQUksR0FBRyxjQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUE7WUFDL0MsUUFBUSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxF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QkFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUEvR0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7aURBQ1g7SUFRckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7K0NBQ2Q7SUFmakIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTBINUI7SUFBRCxlQUFDO0NBMUhELEFBMEhDLENBMUhxQyxnQkFBTSxHQTBIM0M7a0JBMUhvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGN1c3RvbXNJbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi4vdXRpbC9Ub29sc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVBhc3MgZXh0ZW5kcyBiYXNlVHMge1xuXG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLlgJLorqHml7ZMYWJlbFwifSlcbiAgICAvLyBwcml2YXRlIGRqc0xhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLlhbPljaFcIiB9KVxuICAgIHByaXZhdGUgY3VzdG9tTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgICAvLyBwcml2YXRlIGRqc051bTpudW1iZXIgPSAzO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlhYlcIn0pXG4gICAgLy8gcHJpdmF0ZSBsaWdodDpjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5L+h5oGv5rWBXCIgfSlcbiAgICBwcml2YXRlIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5saWdodCkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkudG8oMSx7c2NhbGU6MX0pLnRvKDEse3NjYWxlOjEuMX0pXG4gICAgICAgIC8vICkuc3RhcnQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMllxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cblxuICAgICAgICBsZXQgdGV4dCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXRpbC5iZWhhdmlvclJld2FyZFZvTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB1dGlsLmJlaGF2aW9yUmV3YXJkVm9MaXN0W2ldO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbS5yZXdhcmRUeXBlLCAnaXRlbS5yZXdhcmRUeXBlJylcbiAgICAgICAgICAgIHN3aXRjaCAoTnVtYmVyKGl0ZW0ucmV3YXJkVHlwZSkpIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwi6YGT5YW3XCJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gXCLlnLDlnZdcIlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBcIumHkeW4gVwiXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRleHQgKz0gdGV4dCArIFwiK1wiO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgbGV0IGN1c3RvbXM6IGN1c3RvbXNJbmZvID0gdXRpbC51c2VyRGF0YS5jdXN0b21zO1xuICAgICAgICB0aGlzLmN1c3RvbUxhYmVsLnN0cmluZyA9IHQoXCJtYWluLmxldmVsXCIpICsgY3VzdG9tcy5iaWcgKyBcIi1cIiArIGN1c3RvbXMuc21hbGw7XG5cbiAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ2FtZUxldmVsSW5kZXgsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLorr7nva5lcuasoS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIiArIEpTT04uc3RyaW5naWZ5KGRhdGEubWFwQ29uZmlnKSlcbiAgICAgICAgICAgICAgICAvL3V0aWwuYmVoYXZpb3JSZXdhcmRWb0xpc3QgPSBkYXRhLmJlaGF2aW9yUmV3YXJkVm9MaXN0O1xuICAgICAgICAgICAgICAgIC8vIHV0aWwubWFwQ29uZmlnID0gZGF0YS5tYXBDb25maWc7XG4gICAgICAgICAgICAgICAgdXRpbC5nZXRub3dtYXBkYXRhKCk7XG4gICAgICAgICAgICAgICAgdXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkTmV4dFZvTGlzdCA9IGRhdGEuZ2FtZUxldmVsUGFzc1Jld2FyZFZvTGlzdCB8fCBbXTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhUb29scy5HZXRBcnJEYXRhKFwidHlwZVwiLCA0LCBkYXRhLmJlaGF2aW9yUmV3YXJkVm9MaXN0KS5yZXdhcmQsIGRhdGEuYmVoYXZpb3JSZXdhcmRWb0xpc3QsICdUb29scy5HZXRBcnJEYXRhKFwidHlwZVwiLDQsZGF0YS5iZWhhdmlvclJld2FyZFZvTGlzdCkucmV3YXJkJylcbiAgICAgICAgICAgICAgICB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmROZXh0Vm9MaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICByZXdhcmRUeXBlOiAyLFxuICAgICAgICAgICAgICAgICAgICByZXdhcmRWYWx1ZTogVG9vbHMuR2V0QXJyRGF0YShcInR5cGVcIiwgNCwgZGF0YS5iZWhhdmlvclJld2FyZFZvTGlzdCkucmV3YXJkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63pobXpnaJcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgaWYgKHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZFZvTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBmb3IobGV0IGkgPSAwO2k8dXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVBhc3NSZXdhcmQpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIumAmuWFs+aIkOWKn1wiLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIueCueWHu+mihuWPllwiLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLkdhbWVQc3NWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuXG4gICAgICAgIC8vIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5HYW1lUHNzVmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HYW1lUHNzVmlldyx0cnVlKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmICghdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdhbWVQYXNzQ29pblZpZXddKSB7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdhbWVQYXNzQ29pblZpZXcsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVW5sY29rUHJvcFZpZXddKSB7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlVubGNva1Byb3BWaWV3LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkdhbWVQc3NWaWV3KTtcbiAgICB9XG5cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=