
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnV2hlZWxQcml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFFaEQsbURBQWtEO0FBQ2xELDJDQUFzQztBQUV0QyxtRUFBOEQ7QUFFOUQsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxxREFBZ0Q7QUFDaEQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUNoQyxpRUFBNEQ7QUFJdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUF5TkM7UUF2TkcsZUFBUyxHQUFjLElBQUksQ0FBQTtRQUUzQixpQkFBVyxHQUFZLElBQUksQ0FBQTtRQUUzQixtQkFBYSxHQUFhLElBQUksQ0FBQTtRQUU5QixjQUFRLEdBQVksSUFBSSxDQUFBO1FBRXhCLGdCQUFVLEdBQVksSUFBSSxDQUFBO1FBRTFCLHNCQUFnQixHQUFnQixJQUFJLENBQUE7UUFFcEMsaUJBQVcsR0FBZ0IsSUFBSSxDQUFBO1FBRS9CLGdCQUFVLEdBQVksSUFBSSxDQUFBO1FBRTFCLGFBQU8sR0FBWSxJQUFJLENBQUE7UUFFdkIsbUJBQWEsR0FBZ0IsSUFBSSxDQUFBO1FBRWpDLG1CQUFhLEdBQWEsSUFBSSxDQUFBO1FBRTlCLGNBQVEsR0FBZ0IsSUFBSSxDQUFBO1FBRTVCLFlBQU0sR0FBWSxJQUFJLENBQUE7UUFFdEIsZUFBUyxHQUFZLElBQUksQ0FBQTtRQVV6QiwyQkFBcUIsR0FBMEIsSUFBSSxDQUFBOztJQW1MdkQsQ0FBQztJQWpMRyxnQ0FBSyxHQUFMO0lBRUEsQ0FBQztJQUVELGlDQUFNLEdBQU47SUFFQSxDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNJLHNCQUFZLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsZUFBZSxF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QUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzJEQUNXO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ1c7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztzREFDTTtJQUU1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ087SUFVekI7UUFEQyxRQUFRLENBQUMsK0JBQXFCLENBQUM7bUVBQ21CO0lBdENsQyxnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQXlOcEM7SUFBRCx1QkFBQztDQXpORCxBQXlOQyxDQXpONkMsRUFBRSxDQUFDLFNBQVMsR0F5TnpEO2tCQXpOb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcclxuaW1wb3J0IFJld2FyZENvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xlbHIvUmV3YXJkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgUGFnZU1hbmFnZSBmcm9tIFwiLi4vUGFnZU1hbmFnZVwiO1xyXG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcclxuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuaW1wb3J0IE5ld0JpZ1doZWVsUHJpemVBd2FyZCBmcm9tIFwiLi9OZXdCaWdXaGVlbFByaXplQXdhcmRcIjtcclxuXHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0JpZ1doZWVsUHJpemUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIGFkd2FyZEltZzogY2MuU3ByaXRlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcm9ncmVzc0JhcjogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmxlX3N1aUJpYW46IGNjLkxhYmVsID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmZWVkTm9kZTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaHdQcm9ncmVzczogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGxhYmVsX3ByaXplVGl0bGU6IGNjLlJpY2hUZXh0ID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgbGFibGVfdGl0bGU6IGNjLlJpY2hUZXh0ID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5TdWlQaWFuOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5Hb2xkOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgbGFibGVfYnRuR29sZDogY2MuUmljaFRleHQgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV9nb2xkTnVtOiBjYy5MYWJlbCA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIHBob25lVGlwOiBjYy5SaWNoVGV4dCA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbGF5b3V0OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzb3JyeU5vZGU6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgb3BlbkFkVGltZXI6IGFueTtcclxuICAgIHR5cGU6IGFueTtcclxuICAgIGRvdWJsZURhdGE6IGFueTtcclxuICAgIGRpYWxvYWRCYXNlUHJvcDogeyBhd2FkX2RpYWxvZzogc3RyaW5nOyBhd2FkX2RvdWJsZV9kaWFsb2c6IHN0cmluZzsgfTtcclxuICAgIGNhbkdldERvdWJsZTogYW55O1xyXG4gICAgbWFpRGlhblN0cjogYW55O1xyXG5cclxuICAgIEBwcm9wZXJ0eShOZXdCaWdXaGVlbFByaXplQXdhcmQpXHJcbiAgICBuZXdCaWdXaGVlbFByaXplQXdhcmQ6IE5ld0JpZ1doZWVsUHJpemVBd2FyZCA9IG51bGxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH1cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uV2hlZWxEaWFsb2dGZWVkLCA2MzYsIHRoaXMuZmVlZE5vZGUpXHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tJc09wZW5JbnNlckFkKCkpIHtcclxuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLkluc2VydEJpZ1doZWVsLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyB0aGlzLm9wZW5BZFRpbWVyICYmIGNsZWFyVGltZW91dCh0aGlzLm9wZW5BZFRpbWVyKVxyXG4gICAgICAgICAgICAvLyB0aGlzLm9wZW5BZFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm9wZW5BZFRpbWVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5XaGVlbERpYWxvZ0ZlZWQpXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChcIm1vdmVDaG91UG9zXCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcGVuQWRUaW1lciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm9wZW5BZFRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQWRUaW1lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hlY2tJc09wZW5JbnNlckFkKCkge1xyXG4gICAgICAgIGxldCByYW5kb20gPSBNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmmK/lkKbmkq3mlL7mj5LlsY9cIiwgcmFuZG9tLCB1dGlsLnVzZXJEYXRhLm5ld1VzZXIpXHJcbiAgICAgICAgcmV0dXJuIHJhbmRvbSA8PSAwLjQgJiYgIXV0aWwudXNlckRhdGEubmV3VXNlclxyXG4gICAgfVxyXG4gICAgYmFyVXBkYXRlKGRhdGEsIHR5cGUsIG1haURpYW5TdHIsIGRvdWJsZURhdGEpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgLy8gc2VsZi5idG5TdWlQaWFuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuYnRuR29sZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLmxheW91dC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLnNvcnJ5Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gNCB8fCB0eXBlID09IDUpIHtcclxuICAgICAgICAgICAgc2VsZi5sYXlvdXQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5od1Byb2dyZXNzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGRhdGEuY3VycmVudFBob25lRnJhZ21lbnRzIC8gZGF0YS5waG9uZUZyYWdtZW50c0V4Y2hhbmdlVG90YWwgKiB0aGlzLnByb2dyZXNzQmFyLnBhcmVudC53aWR0aDtcclxuICAgICAgICAgICAgaWYgKHdpZHRoID4gMCAmJiB3aWR0aCA8IDIwKSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCA9IDIwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMucHJvZ3Jlc3NCYXIpXHJcbiAgICAgICAgICAgICAgICAudG8oLjIsIHsgd2lkdGg6IHdpZHRoIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfc3VpQmlhbi5zdHJpbmcgPSBkYXRhLmN1cnJlbnRQaG9uZUZyYWdtZW50cyArICcvJyArIGRhdGEucGhvbmVGcmFnbWVudHNFeGNoYW5nZVRvdGFsO1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpdGxlLnN0cmluZyA9IGA8Y29sb3I9I2ZmZmZmZj48b3V0bGluZSBjb2xvcj0jRDI1NDAwIHdpZHRoPTQ+6I635b6X56KO54mHPC9vdXRsaW5lPjwvY29sb3I+YDtcclxuICAgICAgICAgICAgc2VsZi5idG5TdWlQaWFuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZG91YmxlRGF0YSAmJiBkb3VibGVEYXRhLnJld2FyZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnBob25lVGlwLnN0cmluZyA9IGA8Y29sb3I9I0QyNTQwMCA+5oGt5Zac6I635b6XPGNvbG9yPSNGRjNFMkE+JHtkb3VibGVEYXRhLnJld2FyZFZhbHVlfTwvY29sb3I+5omL5py656KO54mHPC9jb2xvcj5gO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYWJlbF9wcml6ZVRpdGxlLnN0cmluZyA9IGA8Y29sb3I9I2ZmZmZmZj48b3V0bGluZSBjb2xvcj0jNEY3QTAwIHdpZHRoPTQ+57un57ut5oq95aWWPC9vdXRsaW5lPjwvY29sb3I+YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkb3VibGVEYXRhICYmIGRvdWJsZURhdGEucmV3YXJkUGhvbmVGcmFnbWVudHMpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucGhvbmVUaXAuc3RyaW5nID0gYDxjb2xvcj0jRDI1NDAwID7mga3llpzojrflvpc8Y29sb3I9I0ZGM0UyQT4ke2RvdWJsZURhdGEucmV3YXJkUGhvbmVGcmFnbWVudHN9PC9jb2xvcj7miYvmnLrnoo7niYc8L2NvbG9yPmA7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxhYmVsX3ByaXplVGl0bGUuc3RyaW5nID0gYDxjb2xvcj0jZmZmZmZmPjxvdXRsaW5lIGNvbG9yPSM0RjdBMDAgd2lkdGg9ND7ljrvmir3lpZY8L291dGxpbmU+PC9jb2xvcj5gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLnBob25lVGlwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vIHNlbGYubGF5b3V0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHNlbGYucGhvbmVUaXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gc2VsZi5od1Byb2dyZXNzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpdGxlLnN0cmluZyA9IGA8Y29sb3I9I2ZmZmZmZj48b3V0bGluZSBjb2xvcj0jRDI1NDAwIHdpZHRoPTQ+6I635b6X6YeR5biBPC9vdXRsaW5lPjwvY29sb3I+YDtcclxuICAgICAgICAgICAgc2VsZi5idG5Hb2xkLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZG91YmxlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3VibGVEYXRhID0gZG91YmxlRGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfYnRuR29sZC5zdHJpbmcgPSBgPG91dGxpbmUgY29sb3I9IzRGN0EwMCB3aWR0aD0zPjxjb2xvcj0jZmZmZmZmPiR7dGhpcy5kb3VibGVEYXRhLmRvdWJsZVZhbHVlfeWAjeWGjemihuWPljwvY29sb3I+PGNvbG9yPSNGRkZDMDA+JHt0aGlzLmRvdWJsZURhdGEuZG91YmxlVmFsdWUgKiB0aGlzLmRvdWJsZURhdGEucmV3YXJkVmFsdWV9PGNvbG9yPjwvb3V0bGluZT5gXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX2dvbGROdW0uc3RyaW5nID0gYCske3RoaXMuZG91YmxlRGF0YS5yZXdhcmRWYWx1ZX1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpdGxlLnN0cmluZyA9IGA8Y29sb3I9I2ZmZmZmZj48b3V0bGluZSBjb2xvcj0jRDI1NDAwIHdpZHRoPTQ+6LCi6LCi5Y+C5LiOPC9vdXRsaW5lPjwvY29sb3I+YDtcclxuICAgICAgICAgICAgc2VsZi5zb3JyeU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGlhbG9hZEJhc2VQcm9wID0ge1xyXG4gICAgICAgICAgICBhd2FkX2RpYWxvZzogbWFpRGlhblN0ciArICflpZblirHlvLnnqpcnLFxyXG4gICAgICAgICAgICBhd2FkX2RvdWJsZV9kaWFsb2c6IHRoaXMuY2FuR2V0RG91YmxlID8gYCR7bWFpRGlhblN0cn3lpZblirHnv7vlgI3lvLnnqpdgIDogJydcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRyYWNrTWdyLkx1Y2tEcmF3UHJvZHVjdERpYWxvZyh0aGlzLmRpYWxvYWRCYXNlUHJvcClcclxuICAgICAgICAvLyBYTVNESy50cmFjayh7XHJcbiAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC53aGVlbC5MdWNrRHJhd1Byb2R1Y3REaWFsb2csXHJcbiAgICAgICAgLy8gICAgIHByb3BzOiB0aGlzLmRpYWxvYWRCYXNlUHJvcCxcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYWlEaWFuU3RyID0gbWFpRGlhblN0cjtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0RvdWJsZSgpIHtcclxuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uV2hlZWxEb3VibGUsICgpID0+IHtcclxuICAgICAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0Lm5ld0JpZ1doZWVsX2FjdGlvbkRvdWJsZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBkb3VibGVJZDogdGhpcy5kb3VibGVEYXRhLmRvdWJsZUlkLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQXdhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkF3YXJkKCkge1xyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuZG91YmxlRGF0YS5kb3VibGVWYWx1ZSAqIHRoaXMuZG91YmxlRGF0YS5yZXdhcmRWYWx1ZVxyXG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IG51bGxcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgc3ByaXRlRnJhbWUgPSBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlLmZpbmRQb2ludEJpZ1Nwcml0ZSgxKVxyXG4gICAgICAgICAgICAvLyB1dGlsLmFkZFRlcm1Db2luKGNvdW50KTtcclxuICAgICAgICAgICAgLy8gdXRpbC5hZGRUZXJtQ29pbih0aGlzLmRvdWJsZURhdGEucmV3YXJkVmFsdWUpO1xyXG4gICAgICAgICAgICBjb3VudCArPXRoaXMuZG91YmxlRGF0YS5yZXdhcmRWYWx1ZTtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IHZhbHVlOiBjb3VudH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDQpIHtcclxuICAgICAgICAgICAgc3ByaXRlRnJhbWUgPSBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlLmZpbmRQaG9uZVNwcml0ZSgxKVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDUpIHtcclxuICAgICAgICAgICAgc3ByaXRlRnJhbWUgPSBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlLmZpbmRQb2ludEJpZ1Nwcml0ZSgxKVxyXG4gICAgICAgICAgICAvLyB1dGlsLmFkZFRlcm1Db2luKHRoaXMuZG91YmxlRGF0YS5yZXdhcmRWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNvdW50ICs9dGhpcy5kb3VibGVEYXRhLnJld2FyZFZhbHVlO1xyXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgdmFsdWU6IGNvdW50fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmV3QmlnV2hlZWxQcml6ZUF3YXJkLnN0YXJ0QW5pKHNwcml0ZUZyYW1lLCBjb3VudClcclxuICAgICAgICAvLyBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuTmV3QmlnV2hlZWxQcml6ZUF3YXJkKVxyXG4gICAgICAgIC8vIGxldCBwcmVmYWIgPSBQYWdlTWFuYWdlLnNpbmdsZXRvbi5maW5kUGFnZShwYWdlVHMucGFnZU5hbWUuTmV3QmlnV2hlZWxQcml6ZUF3YXJkKVxyXG4gICAgICAgIC8vIGlmIChwcmVmYWIgJiYgcHJlZmFiLmdldENvbXBvbmVudChwYWdlVHMucGFnZU5hbWUuTmV3QmlnV2hlZWxQcml6ZUF3YXJkKSkge1xyXG4gICAgICAgIC8vICAgICBwcmVmYWIuZ2V0Q29tcG9uZW50KHBhZ2VUcy5wYWdlTmFtZS5OZXdCaWdXaGVlbFByaXplQXdhcmQpLnN0YXJ0QW5pKHRoaXMuZG91YmxlRGF0YS5kb3VibGVWYWx1ZSAqIHRoaXMuZG91YmxlRGF0YS5yZXdhcmRWYWx1ZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ2hvdSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChcIk5ld0JpZ1doZWVsUHJpemVfYWdhaW5DaG91XCIsIHsgaXNDaGVja0tpbmc6IHRydWUgfSk7XHJcbiAgICAgICAgVHJhY2tNZ3IuTHVja0RyYXdEaWFsb2dDbGljayhPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRpYWxvYWRCYXNlUHJvcCwgeyBja19tb2R1bGU6IGDljrvmir3lpZZgIH0pKVxyXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LndoZWVsLkx1Y2tEcmF3RGlhbG9nQ2xpY2ssXHJcbiAgICAgICAgLy8gICAgIHByb3BzOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRpYWxvYWRCYXNlUHJvcCwgeyBja19tb2R1bGU6IGDljrvmir3lpZZgIH0pXHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDbG9zZSgpIHtcclxuICAgICAgICAvLyBYTVNESy50cmFjayh7XHJcbiAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC53aGVlbC5MdWNrRHJhd0RpYWxvZ0NsaWNrLFxyXG4gICAgICAgIC8vICAgICBwcm9wczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kaWFsb2FkQmFzZVByb3AsIHsgY2tfbW9kdWxlOiBg5YWz6ZetYCB9KVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIFRyYWNrTWdyLkx1Y2tEcmF3RGlhbG9nQ2xpY2soT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kaWFsb2FkQmFzZVByb3AsIHsgY2tfbW9kdWxlOiBg5YWz6ZetYCB9KSlcclxuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLldoZWVsRGlhbG9nRmVlZClcclxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgfVxyXG4gICAgY2xvc2VQYWdlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfVxyXG59XHJcbiJdfQ==