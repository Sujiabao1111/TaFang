"use strict";
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