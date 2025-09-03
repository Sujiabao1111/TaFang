
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxtREFBa0Q7QUFFbEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBQ2hDLHFDQUFnQztBQUUxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBTTtJQUE1QztRQUdJLG9EQUFvRDtRQUNwRCxvQ0FBb0M7UUFKeEMscUVBMEhDO1FBbkhXLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBQ3BDLDZCQUE2QjtRQUU3Qiw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBSXhCLGVBQVMsR0FBVyxJQUFJLENBQUM7O1FBMEdqQyxpQkFBaUI7SUFDckIsQ0FBQztJQTFHRyx3QkFBSyxHQUFMO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO0lBRWpCLENBQUM7SUFFRDs7T0FFRztJQUNILHVCQUFJLEdBQUo7UUFBQSxpQkFpREM7UUE5Q0csSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEtBQUksSUFBSSxDQUFDLEdBQUUsQ0FBQyxFQUFDLENBQUMsR0FBQyxjQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ2hELElBQUksSUFBSSxHQUFHLGNBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUM5QyxRQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUM7Z0JBRTNCLEtB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QUN6QyxjQUFJLENBQUMsU0FBUyxDQUFDLHVCQUFVLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQztJQUdELDRCQUFTLEdBQVQ7UUFDSSxzQkFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUEvR0Q7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUM7aURBQ1A7SUFRcEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLENBQUM7K0NBQ1Y7SUFmaEIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTBINUI7SUFBRCxlQUFDO0NBMUhELEFBMEhDLENBMUhxQyxnQkFBTSxHQTBIM0M7a0JBMUhvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGN1c3RvbXNJbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vdXRpbC90b29sXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVBhc3MgZXh0ZW5kcyBiYXNlVHMge1xuXG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLlgJLorqHml7ZMYWJlbFwifSlcbiAgICAvLyBwcml2YXRlIGRqc0xhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIuWFs+WNoVwifSlcbiAgICBwcml2YXRlIGN1c3RvbUxhYmVsOmNjLkxhYmVsID0gbnVsbDtcbiAgICAvLyBwcml2YXRlIGRqc051bTpudW1iZXIgPSAzO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlhYlcIn0pXG4gICAgLy8gcHJpdmF0ZSBsaWdodDpjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLkv6Hmga/mtYFcIn0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6Y2MuTm9kZSA9IG51bGw7XG4gICAgc3RhcnQgKCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKi9cbiAgICBpbml0KCl7XG5cbiAgXG4gICAgICAgIGxldCB0ZXh0ID0gbnVsbDtcbiAgICAgICAgZm9yKGxldCBpID0wO2k8dXRpbC5iZWhhdmlvclJld2FyZFZvTGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdXRpbC5iZWhhdmlvclJld2FyZFZvTGlzdFtpXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0ucmV3YXJkVHlwZSwnaXRlbS5yZXdhcmRUeXBlJylcbiAgICAgICAgICAgIHN3aXRjaChOdW1iZXIoaXRlbS5yZXdhcmRUeXBlKSl7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBcIumBk+WFt1wiXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwi5Zyw5Z2XXCJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gXCLph5HluIFcIlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0ICs9IHRleHQgK1wiK1wiOyBcblxuICAgICAgICB9XG4gICAgICAgIFxuICBcbiAgICAgICAgXG4gICAgICAgIGxldCBjdXN0b21zOmN1c3RvbXNJbmZvID0gdXRpbC51c2VyRGF0YS5jdXN0b21zO1xuICAgICAgICB0aGlzLmN1c3RvbUxhYmVsLnN0cmluZyA9IFwi5YWz5Y2hXCIrY3VzdG9tcy5iaWcrXCItXCIrY3VzdG9tcy5zbWFsbDtcblxuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOlVybENvbnN0LmdhbWVMZXZlbEluZGV4LFxuICAgICAgICAgICAgc3VjY2VzczooZGF0YSk9PntcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbmNvbnNvbGUubG9nKFwi6K6+572uZXLmrKEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIgKyBKU09OLnN0cmluZ2lmeSggZGF0YS5tYXBDb25maWcgKSApXG4gICAgICAgICAgICAgICAgLy91dGlsLmJlaGF2aW9yUmV3YXJkVm9MaXN0ID0gZGF0YS5iZWhhdmlvclJld2FyZFZvTGlzdDtcbiAgICAgICAgICAgICAgIC8vIHV0aWwubWFwQ29uZmlnID0gZGF0YS5tYXBDb25maWc7XG5cdFx0XHQgICB1dGlsLmdldG5vd21hcGRhdGEoKTtcbiAgICAgICAgICAgICAgICB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmROZXh0Vm9MaXN0ID0gZGF0YS5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0fHxbXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b29sLkdldEFyckRhdGEoXCJ0eXBlXCIsNCxkYXRhLmJlaGF2aW9yUmV3YXJkVm9MaXN0KS5yZXdhcmQsZGF0YS5iZWhhdmlvclJld2FyZFZvTGlzdCwndG9vbC5HZXRBcnJEYXRhKFwidHlwZVwiLDQsZGF0YS5iZWhhdmlvclJld2FyZFZvTGlzdCkucmV3YXJkJylcbiAgICAgICAgICAgICAgICB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmROZXh0Vm9MaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICByZXdhcmRUeXBlOjIsXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZFZhbHVlOnRvb2wuR2V0QXJyRGF0YShcInR5cGVcIiw0LGRhdGEuYmVoYXZpb3JSZXdhcmRWb0xpc3QpLnJld2FyZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6Zet6aG16Z2iXG4gICAgICovXG4gICAgY2xvc2UoKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICBpZih1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3QubGVuZ3RoPjApe1xuICAgICAgICAgICAgLy8gZm9yKGxldCBpID0gMDtpPHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZFZvTGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lUGFzc1Jld2FyZCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIumAmuWFs+aIkOWKn1wiLFxuICAgICAgICAgICAgY2tfbW9kdWxlOlwi54K55Ye76aKG5Y+WXCIsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uR2FtZVBzc1ZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXG4gICAgICAgIFxuICAgICAgICAvLyBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uR2FtZVBzc1ZpZXddKXtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2FtZVBzc1ZpZXcsdHJ1ZSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdhbWVQYXNzQ29pblZpZXddKXtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2FtZVBhc3NDb2luVmlldyx0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVW5sY29rUHJvcFZpZXddKXtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVW5sY29rUHJvcFZpZXcsdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5HYW1lUHNzVmlldyk7XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19