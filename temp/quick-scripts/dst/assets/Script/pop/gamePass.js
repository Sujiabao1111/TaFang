
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUdwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLHlEQUE2QztBQUM3QywrQ0FBOEM7QUFFOUMsc0RBQWlEO0FBRWpELHVDQUFzQztBQUN0QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQU07SUFBNUM7UUFHSSxvREFBb0Q7UUFDcEQsb0NBQW9DO1FBSnhDLHFFQXFIQztRQTlHVyxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUNyQyw2QkFBNkI7UUFFN0IsNENBQTRDO1FBQzVDLGdDQUFnQztRQUl4QixlQUFTLEdBQVksSUFBSSxDQUFDOztJQXNHdEMsQ0FBQztJQXJHRyx3QkFBSyxHQUFMO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO0lBRWpCLENBQUM7SUFFRDs7T0FFRztJQUNILHVCQUFJLEdBQUo7UUFBQSxpQkFpREM7UUE5Q0csSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZELElBQUksSUFBSSxHQUFHLGNBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtZQUMvQyxRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBRTdCLEtBQUssQ0FBQztvQkFDRixJQUFJLEdBQUcsSUFBSSxDQUFBO29CQUNYLE1BQU07Z0JBQ1YsS0FBSyxDQUFDO29CQUNGLElBQUksR0FBRyxJQUFJLENBQUE7b0JBQ1gsTUFBTTtnQkFDVixLQUFLLENBQUM7b0JBQ0YsSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDWCxNQUFNO2FBRWI7WUFFRCxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUV0QjtRQUlELElBQUksT0FBTyxHQUFnQixjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxnQkFBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFFOUUsY0FBSSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxtQkFBUSxDQUFDLGNBQWM7WUFDNUIsT0FBTyxFQUFFLFVBQUMsSUFBSTtnQkFDVixJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRTtvQkFDZixPQUFPO2lCQUNWO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtnQkFDeEYsd0RBQXdEO2dCQUN4RCxtQ0FBbUM7Z0JBQ25DLGNBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsY0FBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyx5QkFBeUIsSUFBSSxFQUFFLENBQUM7Z0JBQzFFLHVLQUF1SztnQkFDdkssY0FBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQztvQkFDcEMsVUFBVSxFQUFFLENBQUM7b0JBQ2IsV0FBVyxFQUFFLGFBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNO2lCQUM3RSxDQUFDLENBQUM7WUFDUCxDQUFDO1NBQ0osQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVEOztPQUVHO0lBQ0gsd0JBQUssR0FBTDtRQUNJLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXZDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLGNBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNDLDhEQUE4RDtZQUM5RCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzlDLElBQUk7U0FDUDthQUFNO1lBQ0gsNENBQTRDO1lBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRUQsMkJBQVEsR0FBUjtRQUNJLGdHQUFnRztRQUVoRyw2Q0FBNkM7UUFDN0MsbURBQW1EO1FBQ25ELElBQUk7UUFFSixxREFBcUQ7UUFDckQseURBQXlEO1FBQ3pELElBQUk7UUFFSixtREFBbUQ7UUFDbkQsdURBQXVEO1FBQ3ZELElBQUk7SUFDUixDQUFDO0lBR0QsNEJBQVMsR0FBVDtRQUNJLG1EQUFtRDtJQUN2RCxDQUFDO0lBM0dEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO2lEQUNYO0lBUXJDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDOytDQUNkO0lBZmpCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FxSDVCO0lBQUQsZUFBQztDQXJIRCxBQXFIQyxDQXJIcUMsZ0JBQU0sR0FxSDNDO2tCQXJIb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBjdXN0b21zSW5mbyB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uL3V0aWwvVG9vbHNcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVQYXNzIGV4dGVuZHMgYmFzZVRzIHtcblxuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5YCS6K6h5pe2TGFiZWxcIn0pXG4gICAgLy8gcHJpdmF0ZSBkanNMYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5YWz5Y2hXCIgfSlcbiAgICBwcml2YXRlIGN1c3RvbUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgLy8gcHJpdmF0ZSBkanNOdW06bnVtYmVyID0gMztcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YWJXCJ9KVxuICAgIC8vIHByaXZhdGUgbGlnaHQ6Y2MuTm9kZSA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuS/oeaBr+a1gVwiIH0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKi9cbiAgICBpbml0KCkge1xuXG5cbiAgICAgICAgbGV0IHRleHQgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHV0aWwuYmVoYXZpb3JSZXdhcmRWb0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdXRpbC5iZWhhdmlvclJld2FyZFZvTGlzdFtpXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0ucmV3YXJkVHlwZSwgJ2l0ZW0ucmV3YXJkVHlwZScpXG4gICAgICAgICAgICBzd2l0Y2ggKE51bWJlcihpdGVtLnJld2FyZFR5cGUpKSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBcIumBk+WFt1wiXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwi5Zyw5Z2XXCJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gXCLph5HluIFcIlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0ICs9IHRleHQgKyBcIitcIjtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGxldCBjdXN0b21zOiBjdXN0b21zSW5mbyA9IHV0aWwudXNlckRhdGEuY3VzdG9tcztcbiAgICAgICAgdGhpcy5jdXN0b21MYWJlbC5zdHJpbmcgPSB0KFwibWFpbi5sZXZlbFwiKSArIGN1c3RvbXMuYmlnICsgXCItXCIgKyBjdXN0b21zLnNtYWxsO1xuXG4gICAgICAgIHV0aWwuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmdhbWVMZXZlbEluZGV4LFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K6+572uZXLmrKEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YS5tYXBDb25maWcpKVxuICAgICAgICAgICAgICAgIC8vdXRpbC5iZWhhdmlvclJld2FyZFZvTGlzdCA9IGRhdGEuYmVoYXZpb3JSZXdhcmRWb0xpc3Q7XG4gICAgICAgICAgICAgICAgLy8gdXRpbC5tYXBDb25maWcgPSBkYXRhLm1hcENvbmZpZztcbiAgICAgICAgICAgICAgICB1dGlsLmdldG5vd21hcGRhdGEoKTtcbiAgICAgICAgICAgICAgICB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmROZXh0Vm9MaXN0ID0gZGF0YS5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0IHx8IFtdO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFRvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsIDQsIGRhdGEuYmVoYXZpb3JSZXdhcmRWb0xpc3QpLnJld2FyZCwgZGF0YS5iZWhhdmlvclJld2FyZFZvTGlzdCwgJ1Rvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsNCxkYXRhLmJlaGF2aW9yUmV3YXJkVm9MaXN0KS5yZXdhcmQnKVxuICAgICAgICAgICAgICAgIHV0aWwuZ2FtZUxldmVsUGFzc1Jld2FyZE5leHRWb0xpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHJld2FyZFR5cGU6IDIsXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZFZhbHVlOiBUb29scy5HZXRBcnJEYXRhKFwidHlwZVwiLCA0LCBkYXRhLmJlaGF2aW9yUmV3YXJkVm9MaXN0KS5yZXdhcmRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXremhtemdolxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICBpZiAodXRpbC5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIGZvcihsZXQgaSA9IDA7aTx1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lUGFzc1Jld2FyZCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lU3RhcnQpO1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1N0YXJ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLkdhbWVQc3NWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuXG4gICAgICAgIC8vIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5HYW1lUHNzVmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HYW1lUHNzVmlldyx0cnVlKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGlmICghdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdhbWVQYXNzQ29pblZpZXddKSB7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdhbWVQYXNzQ29pblZpZXcsIHRydWUpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVW5sY29rUHJvcFZpZXddKSB7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlVubGNva1Byb3BWaWV3LCB0cnVlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICAvLyBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkdhbWVQc3NWaWV3KTtcbiAgICB9XG5cblxufVxuIl19