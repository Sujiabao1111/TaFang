
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameOnPrizeGetReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVPblByaXplR2V0UmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBQ2xELDJDQUFzQztBQUV0QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLHFEQUFnRDtBQUNoRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFNO0lBQTVDO1FBQUEscUVBaUtDO1FBOUpHLG9CQUFjLEdBQWdCLElBQUksQ0FBQztRQUduQyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBR2xCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRXRDLGNBQVEsR0FBdUIsSUFBSSxDQUFDO1FBRXBDLGFBQU8sR0FBRyxLQUFLLENBQUM7O0lBMklwQixDQUFDO0lBeklHLHdCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsdUJBQUksR0FBSixVQUFLLElBQXdCO1FBQTdCLGlCQXNCQztRQXJCRyxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLGtFQUFnRSxJQUFJLENBQUMsWUFBWSxhQUFVLENBQUE7WUFDeEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBSSxJQUFJLENBQUMs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SUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQTdKRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO29EQUNhO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ1k7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDWTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDO2tEQUNOO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDO21EQUNOO0lBbEJyQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBaUs1QjtJQUFELGVBQUM7Q0FqS0QsQUFpS0MsQ0FqS3FDLGdCQUFNLEdBaUszQztrQkFqS29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xyXG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xyXG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XHJcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IHsgb25Qcml6ZVJlZEl0ZW1EYXRhIH0gZnJvbSBcIi4uL29uUHJpemVHZXQvT25Qcml6ZUdldFwiO1xyXG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcclxuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGJhc2VUcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgbGFibGVfcHJpemVOdW06IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bl9jbG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmxlX2dvbGROdW06IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YCN5pWwXCJ9KVxyXG4gICAgcHJpdmF0ZSBtdWx0aXBsZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIuWAjeaVsOWtl1wifSlcclxuICAgIHByaXZhdGUgbXVsdGlwbGVMYWJlbDpjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgaW5pdERhdGE6IG9uUHJpemVSZWRJdGVtRGF0YSA9IG51bGw7XHJcblxyXG4gICAgaXNDbGljayA9IGZhbHNlO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0KGRhdGE6IG9uUHJpemVSZWRJdGVtRGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX3ByaXplTnVtLnN0cmluZyA9IGA8Y29sb3I9I0ZGRkZGRj48b3V0bGluZSBjb2xvcj0jRDI1NDAwIHdpZHRoPTQ+PGNvbG9yPSNGRkZDMDA+JHtkYXRhLmRvdWJsZUFtb3VudH08L2NvbG9yPmBcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9nb2xkTnVtLnN0cmluZyA9IGArJHt0aGlzLmluaXREYXRhLmFtb3VudH1gO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tdWx0aXBsZUxhYmVsLnN0cmluZyA9IHBhcnNlSW50KFN0cmluZyhkYXRhLmRvdWJsZUFtb3VudC90aGlzLmluaXREYXRhLmFtb3VudCkpK1wi5YCNXCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ0bl9jbG9zZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuX2Nsb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LCAzKVxyXG5cclxuICAgICAgICAgICAgVHJhY2tNZ3IuT25saW5lX3Jld2FyZHMoe1xyXG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5aWW5Yqx5by556qX5bGV56S6XCIsXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfc3RhdGU6IGAke3RoaXMuaW5pdERhdGEud2FpdFRpbWUgLyA2MH3liIbpkp9gLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm11bHRpcGxlTm9kZSkucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMyx7YW5nbGU6MTB9KS50byguMix7YW5nbGU6MH0pXHJcbiAgICAgICAgKS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrR2V0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0RGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaXNDbGljayl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0NsaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuT25saW5lX3Jld2FyZHMoe1xyXG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLlpZblirHlvLnnqpfngrnlh7tcIixcclxuICAgICAgICAgICAgYnV0dG9uX25hbWVfaGNkZzogYOebtOaOpemihuWPlmAsXHJcbiAgICAgICAgICAgIHJld2FyZF9zdGF0ZTogYCR7dGhpcy5pbml0RGF0YS53YWl0VGltZSAvIDYwfeWIhumSn2AsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBUcmFja01nci5PbmxpbmVfcmV3YXJkcyh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIumihuWPluWujOavlVwiLFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uX2NvbXBsZXRlZDogYOebtOaOpemihuWPluaIkOWKn2AsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5vblByaXplR2V0UmV3YXJkR2V0LFxyXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyB2YWx1ZTogdGhpcy5pbml0RGF0YS5hbW91bnQsIG51bTogNSwgcGFyZW50OiBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMuaW5pdERhdGEuYW1vdW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25GYWlsOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0RvdWJsZUdldCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdERhdGF8fCh0aGlzLmluaXREYXRhJiYhdGhpcy5pbml0RGF0YS5kb3VibGVBbW91bnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5pc0NsaWNrKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzQ2xpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICBUcmFja01nci5PbmxpbmVfcmV3YXJkcyh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuWlluWKseW8ueeql+eCueWHu1wiLFxyXG4gICAgICAgICAgICBidXR0b25fbmFtZV9oY2RnOiBg57+75YCN6aKGJHt0aGlzLmluaXREYXRhLmRvdWJsZUFtb3VudH1gLFxyXG4gICAgICAgICAgICByZXdhcmRfc3RhdGU6IGAke3RoaXMuaW5pdERhdGEud2FpdFRpbWUgLyA2MH3liIbpkp9gLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5PblByaXplR2V0LCAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5vblByaXplR2V0UmV3YXJkR2V0LFxyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5PbmxpbmVfcmV3YXJkcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLpooblj5blrozmr5VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25fY29tcGxldGVkOiBg6KeG6aKR6aKG5Y+W5oiQ5YqfYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgdmFsdWU6IHRoaXMuaW5pdERhdGEuZG91YmxlQW1vdW50LCBudW06IDUsIHBhcmVudDogY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJykgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4odGhpcy5pbml0RGF0YS5kb3VibGVBbW91bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkZhaWw6IHJlcyA9PiB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBUcmFja01nci5PbmxpbmVfcmV3YXJkcyh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLpooblj5blrozmr5VcIixcclxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25fY29tcGxldGVkOiBg6KeG6aKR6aKG5Y+W5aSx6LSlYCxcclxuICAgICAgICAgICAgfSkgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5pc0NsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5vblByaXplR2V0VmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24ub25Qcml6ZUdldFZpZXcpO1xyXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMub25Qcml6ZUdldFVwZGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19