
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrize.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c143excL1ZEk682fkcR7XCN', 'NewBigWheelPrize');
// Script/NewBigWheel/NewBigWheelPrize.ts

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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var RewardController_1 = require("../controlelr/RewardController");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var NewBigWheelPrizeAward_1 = require("./NewBigWheelPrizeAward");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewBigWheelPrize = /** @class */ (function (_super) {
    __extends(NewBigWheelPrize, _super);
    function NewBigWheelPrize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adwardImg = null;
        _this.progressBar = null;
        _this.lable_suiBian = null;
        _this.feedNode = null;
        _this.hwProgress = null;
        _this.label_prizeTitle = null;
        _this.lable_title = null;
        _this.btnSuiPian = null;
        _this.btnGold = null;
        _this.lable_btnGold = null;
        _this.lable_goldNum = null;
        _this.phoneTip = null;
        _this.layout = null;
        _this.sorryNode = null;
        _this.newBigWheelPrizeAward = null;
        return _this;
    }
    NewBigWheelPrize.prototype.start = function () {
    };
    NewBigWheelPrize.prototype.onLoad = function () {
    };
    NewBigWheelPrize.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.WheelDialogFeed, 636, this.feedNode);
        if (this.checkIsOpenInserAd()) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.InsertBigWheel, function () {
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
            // this.openAdTimer && clearTimeout(this.openAdTimer)
            // this.openAdTimer = setTimeout(() => {
            //     this.openAdTimer = null;
            // }, 1000);
        }
    };
    NewBigWheelPrize.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.WheelDialogFeed);
        cc.director.emit("moveChouPos");
        if (this.openAdTimer != null) {
            clearTimeout(this.openAdTimer);
            this.openAdTimer = null;
        }
    };
    NewBigWheelPrize.prototype.checkIsOpenInserAd = function () {
        var random = Math.random();
        console.log("是否播放插屏", random, util_1.default.userData.newUser);
        return random <= 0.4 && !util_1.default.userData.newUser;
    };
    NewBigWheelPrize.prototype.barUpdate = function (data, type, maiDianStr, doubleData) {
        var self = this;
        self.type = type;
        // self.btnSuiPian.active = false;
        self.btnGold.active = false;
        self.layout.active = false;
        self.sorryNode.active = false;
        if (type == 4 || type == 5) {
            self.layout.active = true;
            self.hwProgress.active = true;
            var width = data.currentPhoneFragments / data.phoneFragmentsExchangeTotal * this.progressBar.parent.width;
            if (width > 0 && width < 20) {
                width = 20;
            }
            cc.tween(this.progressBar)
                .to(.2, { width: width })
                .start();
            this.lable_suiBian.string = data.currentPhoneFragments + '/' + data.phoneFragmentsExchangeTotal;
            self.lable_title.string = "<color=#ffffff><outline color=#D25400 width=4>\u83B7\u5F97\u788E\u7247</outline></color>";
            self.btnSuiPian.active = true;
            if (doubleData && doubleData.rewardValue) {
                self.phoneTip.string = "<color=#D25400 >\u606D\u559C\u83B7\u5F97<color=#FF3E2A>" + doubleData.rewardValue + "</color>\u624B\u673A\u788E\u7247</color>";
                self.label_prizeTitle.string = "<color=#ffffff><outline color=#4F7A00 width=4>\u7EE7\u7EED\u62BD\u5956</outline></color>";
            }
            else if (doubleData && doubleData.rewardPhoneFragments) {
                self.phoneTip.string = "<color=#D25400 >\u606D\u559C\u83B7\u5F97<color=#FF3E2A>" + doubleData.rewardPhoneFragments + "</color>\u624B\u673A\u788E\u7247</color>";
                self.label_prizeTitle.string = "<color=#ffffff><outline color=#4F7A00 width=4>\u53BB\u62BD\u5956</outline></color>";
            }
            self.phoneTip.node.active = true;
        }
        else if (type == 2) {
            // self.layout.active = true;
            // self.phoneTip.node.active = false;
            // self.hwProgress.active = false;
            self.lable_title.string = "<color=#ffffff><outline color=#D25400 width=4>\u83B7\u5F97\u91D1\u5E01</outline></color>";
            self.btnGold.active = true;
            if (doubleData) {
                this.doubleData = doubleData;
                this.lable_btnGold.string = "<outline color=#4F7A00 width=3><color=#ffffff>" + this.doubleData.doubleValue + "\u500D\u518D\u9886\u53D6</color><color=#FFFC00>" + this.doubleData.doubleValue * this.doubleData.rewardValue + "<color></outline>";
                this.lable_goldNum.string = "+" + this.doubleData.rewardValue;
            }
        }
        else {
            self.lable_title.string = "<color=#ffffff><outline color=#D25400 width=4>\u8C22\u8C22\u53C2\u4E0E</outline></color>";
            self.sorryNode.active = true;
        }
        this.dialoadBaseProp = {
            awad_dialog: maiDianStr + '奖励弹窗',
            awad_double_dialog: this.canGetDouble ? maiDianStr + "\u5956\u52B1\u7FFB\u500D\u5F39\u7A97" : ''
        };
        TrackMgr_1.default.LuckDrawProductDialog(this.dialoadBaseProp);
        // XMSDK.track({
        //     eventName: SAConst.wheel.LuckDrawProductDialog,
        //     props: this.dialoadBaseProp,
        // });
        this.maiDianStr = maiDianStr;
    };
    NewBigWheelPrize.prototype.clickDouble = function () {
        var _this = this;
        AdController_1.default.loadAd(AdPosition_1.AdPosition.WheelDouble, function () {
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.newBigWheel_actionDouble,
                data: {
                    doubleId: _this.doubleData.doubleId,
                },
                onSuccess: function (res) {
                    if (res.code === 0) {
                        _this.openAward();
                        _this.closePage();
                    }
                    else {
                    }
                },
                onFail: function (err) {
                }
            });
        }, function () {
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    NewBigWheelPrize.prototype.openAward = function () {
        var count = this.doubleData.doubleValue * this.doubleData.rewardValue;
        var spriteFrame = null;
        if (this.type == 2) {
            spriteFrame = RewardController_1.default.instance.findPointBigSprite(1);
            // util.addTermCoin(count);
            // util.addTermCoin(this.doubleData.rewardValue);
            count += this.doubleData.rewardValue;
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { value: count });
        }
        else if (this.type == 4) {
            spriteFrame = RewardController_1.default.instance.findPhoneSprite(1);
        }
        else if (this.type == 5) {
            spriteFrame = RewardController_1.default.instance.findPointBigSprite(1);
            // util.addTermCoin(this.doubleData.rewardValue);
            count += this.doubleData.rewardValue;
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { value: count });
        }
        this.newBigWheelPrizeAward.startAni(spriteFrame, count);
        // PageManage.singleton.showPage(pageTs.pageName.NewBigWheelPrizeAward)
        // let prefab = PageManage.singleton.findPage(pageTs.pageName.NewBigWheelPrizeAward)
        // if (prefab && prefab.getComponent(pageTs.pageName.NewBigWheelPrizeAward)) {
        //     prefab.getComponent(pageTs.pageName.NewBigWheelPrizeAward).startAni(this.doubleData.doubleValue * this.doubleData.rewardValue);
        // }
    };
    NewBigWheelPrize.prototype.clickChou = function () {
        var self = this;
        cc.director.emit("NewBigWheelPrize_againChou", { isCheckKing: true });
        TrackMgr_1.default.LuckDrawDialogClick(Object.assign({}, this.dialoadBaseProp, { ck_module: "\u53BB\u62BD\u5956" }));
        // XMSDK.track({
        //     eventName: SAConst.wheel.LuckDrawDialogClick,
        //     props: Object.assign({}, this.dialoadBaseProp, { ck_module: `去抽奖` })
        // });
        this.closePage();
    };
    NewBigWheelPrize.prototype.clickClose = function () {
        // XMSDK.track({
        //     eventName: SAConst.wheel.LuckDrawDialogClick,
        //     props: Object.assign({}, this.dialoadBaseProp, { ck_module: `关闭` })
        // });
        TrackMgr_1.default.LuckDrawDialogClick(Object.assign({}, this.dialoadBaseProp, { ck_module: "\u5173\u95ED" }));
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.WheelDialogFeed);
        this.closePage();
    };
    NewBigWheelPrize.prototype.closePage = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Sprite)
    ], NewBigWheelPrize.prototype, "adwardImg", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelPrize.prototype, "progressBar", void 0);
    __decorate([
        property(cc.Label)
    ], NewBigWheelPrize.prototype, "lable_suiBian", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelPrize.prototype, "feedNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelPrize.prototype, "hwProgress", void 0);
    __decorate([
        property(cc.RichText)
    ], NewBigWheelPrize.prototype, "label_prizeTitle", void 0);
    __decorate([
        property(cc.RichText)
    ], NewBigWheelPrize.prototype, "lable_title", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelPrize.prototype, "btnSuiPian", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelPrize.prototype, "btnGold", void 0);
    __decorate([
        property(cc.RichText)
    ], NewBigWheelPrize.prototype, "lable_btnGold", void 0);
    __decorate([
        property(cc.Label)
    ], NewBigWheelPrize.prototype, "lable_goldNum", void 0);
    __decorate([
        property(cc.RichText)
    ], NewBigWheelPrize.prototype, "phoneTip", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelPrize.prototype, "layout", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelPrize.prototype, "sorryNode", void 0);
    __decorate([
        property(NewBigWheelPrizeAward_1.default)
    ], NewBigWheelPrize.prototype, "newBigWheelPrizeAward", void 0);
    NewBigWheelPrize = __decorate([
        ccclass
    ], NewBigWheelPrize);
    return NewBigWheelPrize;
}(cc.Component));
exports.default = NewBigWheelPrize;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnV2hlZWxQcml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFFaEQsbURBQWtEO0FBQ2xELDJDQUFzQztBQUV0QyxtRUFBOEQ7QUFFOUQsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxxREFBZ0Q7QUFDaEQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUNoQyxpRUFBNEQ7QUFJdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUF5TkM7UUF2TkcsZUFBUyxHQUFjLElBQUksQ0FBQTtRQUUzQixpQkFBVyxHQUFZLElBQUksQ0FBQTtRQUUzQixtQkFBYSxHQUFhLElBQUksQ0FBQTtRQUU5QixjQUFRLEdBQVksSUFBSSxDQUFBO1FBRXhCLGdCQUFVLEdBQVksSUFBSSxDQUFBO1FBRTFCLHNCQUFnQixHQUFnQixJQUFJLENBQUE7UUFFcEMsaUJBQVcsR0FBZ0IsSUFBSSxDQUFBO1FBRS9CLGdCQUFVLEdBQVksSUFBSSxDQUFBO1FBRTFCLGFBQU8sR0FBWSxJQUFJLENBQUE7UUFFdkIsbUJBQWEsR0FBZ0IsSUFBSSxDQUFBO1FBRWpDLG1CQUFhLEdBQWEsSUFBSSxDQUFBO1FBRTlCLGNBQVEsR0FBZ0IsSUFBSSxDQUFBO1FBRTVCLFlBQU0sR0FBWSxJQUFJLENBQUE7UUFFdEIsZUFBUyxHQUFZLElBQUksQ0FBQTtRQVV6QiwyQkFBcUIsR0FBMEIsSUFBSSxDQUFBOztJQW1MdkQsQ0FBQztJQWpMRyxnQ0FBSyxHQUFMO0lBRUEsQ0FBQztJQUVELGlDQUFNLEdBQU47SUFFQSxDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNJLHNCQUFZLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsZUFBZSxF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QUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzJEQUNXO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ1c7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztzREFDTTtJQUU1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ087SUFVekI7UUFEQyxRQUFRLENBQUMsK0JBQXFCLENBQUM7bUVBQ21CO0lBdENsQyxnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQXlOcEM7SUFBRCx1QkFBQztDQXpORCxBQXlOQyxDQXpONkMsRUFBRSxDQUFDLFNBQVMsR0F5TnpEO2tCQXpOb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgUmV3YXJkQ29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGVsci9SZXdhcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgUGFnZU1hbmFnZSBmcm9tIFwiLi4vUGFnZU1hbmFnZVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IE5ld0JpZ1doZWVsUHJpemVBd2FyZCBmcm9tIFwiLi9OZXdCaWdXaGVlbFByaXplQXdhcmRcIjtcblxuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdCaWdXaGVlbFByaXplIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGFkd2FyZEltZzogY2MuU3ByaXRlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByb2dyZXNzQmFyOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9zdWlCaWFuOiBjYy5MYWJlbCA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBmZWVkTm9kZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBod1Byb2dyZXNzOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBsYWJlbF9wcml6ZVRpdGxlOiBjYy5SaWNoVGV4dCA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXG4gICAgbGFibGVfdGl0bGU6IGNjLlJpY2hUZXh0ID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0blN1aVBpYW46IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuR29sZDogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXG4gICAgbGFibGVfYnRuR29sZDogY2MuUmljaFRleHQgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmxlX2dvbGROdW06IGNjLkxhYmVsID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBwaG9uZVRpcDogY2MuUmljaFRleHQgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGF5b3V0OiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNvcnJ5Tm9kZTogY2MuTm9kZSA9IG51bGxcblxuICAgIG9wZW5BZFRpbWVyOiBhbnk7XG4gICAgdHlwZTogYW55O1xuICAgIGRvdWJsZURhdGE6IGFueTtcbiAgICBkaWFsb2FkQmFzZVByb3A6IHsgYXdhZF9kaWFsb2c6IHN0cmluZzsgYXdhZF9kb3VibGVfZGlhbG9nOiBzdHJpbmc7IH07XG4gICAgY2FuR2V0RG91YmxlOiBhbnk7XG4gICAgbWFpRGlhblN0cjogYW55O1xuXG4gICAgQHByb3BlcnR5KE5ld0JpZ1doZWVsUHJpemVBd2FyZClcbiAgICBuZXdCaWdXaGVlbFByaXplQXdhcmQ6IE5ld0JpZ1doZWVsUHJpemVBd2FyZCA9IG51bGxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLldoZWVsRGlhbG9nRmVlZCwgNjM2LCB0aGlzLmZlZWROb2RlKVxuICAgICAgICBpZiAodGhpcy5jaGVja0lzT3Blbkluc2VyQWQoKSkge1xuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLkluc2VydEJpZ1doZWVsLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIHRoaXMub3BlbkFkVGltZXIgJiYgY2xlYXJUaW1lb3V0KHRoaXMub3BlbkFkVGltZXIpXG4gICAgICAgICAgICAvLyB0aGlzLm9wZW5BZFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5vcGVuQWRUaW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLldoZWVsRGlhbG9nRmVlZClcbiAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChcIm1vdmVDaG91UG9zXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wZW5BZFRpbWVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm9wZW5BZFRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMub3BlbkFkVGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrSXNPcGVuSW5zZXJBZCgpIHtcbiAgICAgICAgbGV0IHJhbmRvbSA9IE1hdGgucmFuZG9tKClcbiAgICAgICAgY29uc29sZS5sb2coXCLmmK/lkKbmkq3mlL7mj5LlsY9cIiwgcmFuZG9tLCB1dGlsLnVzZXJEYXRhLm5ld1VzZXIpXG4gICAgICAgIHJldHVybiByYW5kb20gPD0gMC40ICYmICF1dGlsLnVzZXJEYXRhLm5ld1VzZXJcbiAgICB9XG4gICAgYmFyVXBkYXRlKGRhdGEsIHR5cGUsIG1haURpYW5TdHIsIGRvdWJsZURhdGEpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8vIHNlbGYuYnRuU3VpUGlhbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5idG5Hb2xkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzZWxmLmxheW91dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5zb3JyeU5vZGUuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHR5cGUgPT0gNCB8fCB0eXBlID09IDUpIHtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmh3UHJvZ3Jlc3MuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGRhdGEuY3VycmVudFBob25lRnJhZ21lbnRzIC8gZGF0YS5waG9uZUZyYWdtZW50c0V4Y2hhbmdlVG90YWwgKiB0aGlzLnByb2dyZXNzQmFyLnBhcmVudC53aWR0aDtcbiAgICAgICAgICAgIGlmICh3aWR0aCA+IDAgJiYgd2lkdGggPCAyMCkge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gMjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnByb2dyZXNzQmFyKVxuICAgICAgICAgICAgICAgIC50byguMiwgeyB3aWR0aDogd2lkdGggfSlcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcblxuICAgICAgICAgICAgdGhpcy5sYWJsZV9zdWlCaWFuLnN0cmluZyA9IGRhdGEuY3VycmVudFBob25lRnJhZ21lbnRzICsgJy8nICsgZGF0YS5waG9uZUZyYWdtZW50c0V4Y2hhbmdlVG90YWw7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpdGxlLnN0cmluZyA9IGA8Y29sb3I9I2ZmZmZmZj48b3V0bGluZSBjb2xvcj0jRDI1NDAwIHdpZHRoPTQ+6I635b6X56KO54mHPC9vdXRsaW5lPjwvY29sb3I+YDtcbiAgICAgICAgICAgIHNlbGYuYnRuU3VpUGlhbi5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoZG91YmxlRGF0YSAmJiBkb3VibGVEYXRhLnJld2FyZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5waG9uZVRpcC5zdHJpbmcgPSBgPGNvbG9yPSNEMjU0MDAgPuaBreWWnOiOt+W+lzxjb2xvcj0jRkYzRTJBPiR7ZG91YmxlRGF0YS5yZXdhcmRWYWx1ZX08L2NvbG9yPuaJi+acuueijueJhzwvY29sb3I+YDtcbiAgICAgICAgICAgICAgICBzZWxmLmxhYmVsX3ByaXplVGl0bGUuc3RyaW5nID0gYDxjb2xvcj0jZmZmZmZmPjxvdXRsaW5lIGNvbG9yPSM0RjdBMDAgd2lkdGg9ND7nu6fnu63mir3lpZY8L291dGxpbmU+PC9jb2xvcj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZG91YmxlRGF0YSAmJiBkb3VibGVEYXRhLnJld2FyZFBob25lRnJhZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5waG9uZVRpcC5zdHJpbmcgPSBgPGNvbG9yPSNEMjU0MDAgPuaBreWWnOiOt+W+lzxjb2xvcj0jRkYzRTJBPiR7ZG91YmxlRGF0YS5yZXdhcmRQaG9uZUZyYWdtZW50c308L2NvbG9yPuaJi+acuueijueJhzwvY29sb3I+YDtcbiAgICAgICAgICAgICAgICBzZWxmLmxhYmVsX3ByaXplVGl0bGUuc3RyaW5nID0gYDxjb2xvcj0jZmZmZmZmPjxvdXRsaW5lIGNvbG9yPSM0RjdBMDAgd2lkdGg9ND7ljrvmir3lpZY8L291dGxpbmU+PC9jb2xvcj5gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLnBob25lVGlwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDIpIHtcbiAgICAgICAgICAgIC8vIHNlbGYubGF5b3V0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAvLyBzZWxmLnBob25lVGlwLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBzZWxmLmh3UHJvZ3Jlc3MuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpdGxlLnN0cmluZyA9IGA8Y29sb3I9I2ZmZmZmZj48b3V0bGluZSBjb2xvcj0jRDI1NDAwIHdpZHRoPTQ+6I635b6X6YeR5biBPC9vdXRsaW5lPjwvY29sb3I+YDtcbiAgICAgICAgICAgIHNlbGYuYnRuR29sZC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoZG91YmxlRGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG91YmxlRGF0YSA9IGRvdWJsZURhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9idG5Hb2xkLnN0cmluZyA9IGA8b3V0bGluZSBjb2xvcj0jNEY3QTAwIHdpZHRoPTM+PGNvbG9yPSNmZmZmZmY+JHt0aGlzLmRvdWJsZURhdGEuZG91YmxlVmFsdWV95YCN5YaN6aKG5Y+WPC9jb2xvcj48Y29sb3I9I0ZGRkMwMD4ke3RoaXMuZG91YmxlRGF0YS5kb3VibGVWYWx1ZSAqIHRoaXMuZG91YmxlRGF0YS5yZXdhcmRWYWx1ZX08Y29sb3I+PC9vdXRsaW5lPmBcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX2dvbGROdW0uc3RyaW5nID0gYCske3RoaXMuZG91YmxlRGF0YS5yZXdhcmRWYWx1ZX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5sYWJsZV90aXRsZS5zdHJpbmcgPSBgPGNvbG9yPSNmZmZmZmY+PG91dGxpbmUgY29sb3I9I0QyNTQwMCB3aWR0aD00PuiwouiwouWPguS4jjwvb3V0bGluZT48L2NvbG9yPmA7XG4gICAgICAgICAgICBzZWxmLnNvcnJ5Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaWFsb2FkQmFzZVByb3AgPSB7XG4gICAgICAgICAgICBhd2FkX2RpYWxvZzogbWFpRGlhblN0ciArICflpZblirHlvLnnqpcnLFxuICAgICAgICAgICAgYXdhZF9kb3VibGVfZGlhbG9nOiB0aGlzLmNhbkdldERvdWJsZSA/IGAke21haURpYW5TdHJ95aWW5Yqx57+75YCN5by556qXYCA6ICcnXG4gICAgICAgIH07XG4gICAgICAgIFRyYWNrTWdyLkx1Y2tEcmF3UHJvZHVjdERpYWxvZyh0aGlzLmRpYWxvYWRCYXNlUHJvcClcbiAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LndoZWVsLkx1Y2tEcmF3UHJvZHVjdERpYWxvZyxcbiAgICAgICAgLy8gICAgIHByb3BzOiB0aGlzLmRpYWxvYWRCYXNlUHJvcCxcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgdGhpcy5tYWlEaWFuU3RyID0gbWFpRGlhblN0cjtcbiAgICB9XG5cbiAgICBjbGlja0RvdWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLldoZWVsRG91YmxlLCAoKSA9PiB7XG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0Lm5ld0JpZ1doZWVsX2FjdGlvbkRvdWJsZSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZUlkOiB0aGlzLmRvdWJsZURhdGEuZG91YmxlSWQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQXdhcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9wZW5Bd2FyZCgpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5kb3VibGVEYXRhLmRvdWJsZVZhbHVlICogdGhpcy5kb3VibGVEYXRhLnJld2FyZFZhbHVlXG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IG51bGxcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XG4gICAgICAgICAgICBzcHJpdGVGcmFtZSA9IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFBvaW50QmlnU3ByaXRlKDEpXG4gICAgICAgICAgICAvLyB1dGlsLmFkZFRlcm1Db2luKGNvdW50KTtcbiAgICAgICAgICAgIC8vIHV0aWwuYWRkVGVybUNvaW4odGhpcy5kb3VibGVEYXRhLnJld2FyZFZhbHVlKTtcbiAgICAgICAgICAgIGNvdW50ICs9dGhpcy5kb3VibGVEYXRhLnJld2FyZFZhbHVlO1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IHZhbHVlOiBjb3VudH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSA0KSB7XG4gICAgICAgICAgICBzcHJpdGVGcmFtZSA9IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFBob25lU3ByaXRlKDEpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDUpIHtcbiAgICAgICAgICAgIHNwcml0ZUZyYW1lID0gUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUG9pbnRCaWdTcHJpdGUoMSlcbiAgICAgICAgICAgIC8vIHV0aWwuYWRkVGVybUNvaW4odGhpcy5kb3VibGVEYXRhLnJld2FyZFZhbHVlKTtcbiAgICAgICAgICAgIGNvdW50ICs9dGhpcy5kb3VibGVEYXRhLnJld2FyZFZhbHVlO1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IHZhbHVlOiBjb3VudH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmV3QmlnV2hlZWxQcml6ZUF3YXJkLnN0YXJ0QW5pKHNwcml0ZUZyYW1lLCBjb3VudClcbiAgICAgICAgLy8gUGFnZU1hbmFnZS5zaW5nbGV0b24uc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLk5ld0JpZ1doZWVsUHJpemVBd2FyZClcbiAgICAgICAgLy8gbGV0IHByZWZhYiA9IFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLmZpbmRQYWdlKHBhZ2VUcy5wYWdlTmFtZS5OZXdCaWdXaGVlbFByaXplQXdhcmQpXG4gICAgICAgIC8vIGlmIChwcmVmYWIgJiYgcHJlZmFiLmdldENvbXBvbmVudChwYWdlVHMucGFnZU5hbWUuTmV3QmlnV2hlZWxQcml6ZUF3YXJkKSkge1xuICAgICAgICAvLyAgICAgcHJlZmFiLmdldENvbXBvbmVudChwYWdlVHMucGFnZU5hbWUuTmV3QmlnV2hlZWxQcml6ZUF3YXJkKS5zdGFydEFuaSh0aGlzLmRvdWJsZURhdGEuZG91YmxlVmFsdWUgKiB0aGlzLmRvdWJsZURhdGEucmV3YXJkVmFsdWUpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgY2xpY2tDaG91KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoXCJOZXdCaWdXaGVlbFByaXplX2FnYWluQ2hvdVwiLCB7IGlzQ2hlY2tLaW5nOiB0cnVlIH0pO1xuICAgICAgICBUcmFja01nci5MdWNrRHJhd0RpYWxvZ0NsaWNrKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGlhbG9hZEJhc2VQcm9wLCB7IGNrX21vZHVsZTogYOWOu+aKveWllmAgfSkpXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC53aGVlbC5MdWNrRHJhd0RpYWxvZ0NsaWNrLFxuICAgICAgICAvLyAgICAgcHJvcHM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGlhbG9hZEJhc2VQcm9wLCB7IGNrX21vZHVsZTogYOWOu+aKveWllmAgfSlcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICB9XG5cbiAgICBjbGlja0Nsb3NlKCkge1xuICAgICAgICAvLyBYTVNESy50cmFjayh7XG4gICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3Qud2hlZWwuTHVja0RyYXdEaWFsb2dDbGljayxcbiAgICAgICAgLy8gICAgIHByb3BzOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRpYWxvYWRCYXNlUHJvcCwgeyBja19tb2R1bGU6IGDlhbPpl61gIH0pXG4gICAgICAgIC8vIH0pO1xuICAgICAgICBUcmFja01nci5MdWNrRHJhd0RpYWxvZ0NsaWNrKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGlhbG9hZEJhc2VQcm9wLCB7IGNrX21vZHVsZTogYOWFs+mXrWAgfSkpXG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uV2hlZWxEaWFsb2dGZWVkKVxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgIH1cbiAgICBjbG9zZVBhZ2UoKSB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgIH1cbn1cbiJdfQ==