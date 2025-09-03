"use strict";
cc._RF.push(module, 'aa8637LIt1BnKwQUa9+w2O8', 'gameOnPrizeGetReward');
// Script/pop/gameOnPrizeGetReward.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_prizeNum = null;
        _this.btn_closeNode = null;
        _this.lable_goldNum = null;
        _this.feed_node = null;
        _this.multipleNode = null;
        _this.multipleLabel = null;
        _this.initData = null;
        _this.isClick = false;
        return _this;
    }
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.init = function (data) {
        var _this = this;
        if (data) {
            this.initData = data;
            this.lable_prizeNum.string = "<color=#FFFFFF><outline color=#D25400 width=4><color=#FFFC00>" + data.doubleAmount + "</color>";
            this.lable_goldNum.string = "+" + this.initData.amount;
            this.multipleLabel.string = parseInt(String(data.doubleAmount / this.initData.amount)) + "倍";
            this.btn_closeNode.active = false;
            this.scheduleOnce(function () {
                _this.btn_closeNode.active = true;
            }, 3);
            TrackMgr_1.default.Online_rewards({
                activity_state: "奖励弹窗展示",
                reward_state: this.initData.waitTime / 60 + "\u5206\u949F",
            });
        }
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    NewClass.prototype.clickGet = function () {
        var _this = this;
        if (!this.initData) {
            return;
        }
        if (this.isClick) {
            return;
        }
        this.isClick = true;
        TrackMgr_1.default.Online_rewards({
            activity_state: "奖励弹窗点击",
            button_name_hcdg: "\u76F4\u63A5\u9886\u53D6",
            reward_state: this.initData.waitTime / 60 + "\u5206\u949F",
        });
        TrackMgr_1.default.Online_rewards({
            activity_state: "领取完毕",
            collection_completed: "\u76F4\u63A5\u9886\u53D6\u6210\u529F",
        });
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.onPrizeGetRewardGet,
            onSuccess: function (res) {
                if (!_this.isValid) {
                    return;
                }
                if (res.code === 0) {
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { value: _this.initData.amount, num: 5, parent: cc.director.getScene().getChildByName('Canvas') });
                    util_1.default.addTermCoin(_this.initData.amount);
                    _this.closePage();
                }
                else {
                    _this.closePage();
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
                _this.isClick = false;
            },
            onFail: function (res) {
                _this.closePage();
                _this.isClick = false;
            }
        });
    };
    NewClass.prototype.clickDoubleGet = function () {
        var _this = this;
        if (!this.initData || (this.initData && !this.initData.doubleAmount)) {
            return;
        }
        if (this.isClick) {
            return;
        }
        this.isClick = true;
        TrackMgr_1.default.Online_rewards({
            activity_state: "奖励弹窗点击",
            button_name_hcdg: "\u7FFB\u500D\u9886" + this.initData.doubleAmount,
            reward_state: this.initData.waitTime / 60 + "\u5206\u949F",
        });
        AdController_1.default.loadAd(AdPosition_1.AdPosition.OnPrizeGet, function (res) {
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.onPrizeGetRewardGet,
                onSuccess: function (res) {
                    if (res.code === 0) {
                        if (!_this.isValid) {
                            return;
                        }
                        TrackMgr_1.default.Online_rewards({
                            activity_state: "领取完毕",
                            collection_completed: "\u89C6\u9891\u9886\u53D6\u6210\u529F",
                        });
                        cc.game.emit(NameTs_1.default.Game_Effect_coin, { value: _this.initData.doubleAmount, num: 5, parent: cc.director.getScene().getChildByName('Canvas') });
                        util_1.default.addTermCoin(_this.initData.doubleAmount);
                        _this.closePage();
                    }
                    else {
                        _this.closePage();
                        XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                    }
                    _this.isClick = false;
                },
                onFail: function (res) {
                    _this.closePage();
                    _this.isClick = false;
                }
            });
        }, function () {
            TrackMgr_1.default.Online_rewards({
                activity_state: "领取完毕",
                collection_completed: "\u89C6\u9891\u9886\u53D6\u5931\u8D25",
            });
            _this.closePage();
            _this.isClick = false;
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    NewClass.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.onPrizeGetView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
    };
    NewClass.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.onPrizeGetView);
        cc.game.emit(NameTs_1.default.onPrizeGetUpdate);
    };
    __decorate([
        property(cc.RichText)
    ], NewClass.prototype, "lable_prizeNum", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btn_closeNode", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lable_goldNum", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "feed_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], NewClass.prototype, "multipleNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数字" })
    ], NewClass.prototype, "multipleLabel", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(baseTs_1.default));
exports.default = NewClass;

cc._RF.pop();