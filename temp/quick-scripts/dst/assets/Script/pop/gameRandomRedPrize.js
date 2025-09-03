
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameRandomRedPrize.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '93c4b6GMHFEpb11hDGJsscE', 'gameRandomRedPrize');
// Script/pop/gameRandomRedPrize.ts

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
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameRandomRedPrize = /** @class */ (function (_super) {
    __extends(gameRandomRedPrize, _super);
    function gameRandomRedPrize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_prizeNum = null;
        _this.btn_closeNode = null;
        _this.lable_goldNum = null;
        _this.feed_node1 = null;
        _this.multipleNode = null;
        _this.redAmountNum = 200;
        _this.power = 3;
        _this.coinItem = null;
        return _this;
    }
    gameRandomRedPrize.prototype.start = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
        this.coinItem = util_1.default.GlobalMap.get("RandomRed") || this.node;
        console.log(this.coinItem.x, this.coinItem.y, 'asfasfasf12412=================');
    };
    gameRandomRedPrize.prototype.onEnable = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "福利红包弹窗展示"
        });
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.randomRedPrizeView, 636, this.feed_node1); //636:feedNode信息流容器节点的宽度
    };
    gameRandomRedPrize.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.randomRedPrizeView);
    };
    gameRandomRedPrize.prototype.init = function (data) {
        var _this = this;
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "福利红包弹窗展示"
        });
        this.lable_goldNum.string = "+" + this.redAmountNum;
        this.lable_prizeNum.string = "<outline color=#D25400 width=4><color=#FFFC00>" + this.redAmountNum * this.power + "</color>";
        this.btn_closeNode.active = false;
        this.scheduleOnce(function () {
            _this.btn_closeNode.active = true;
        }, 3);
    };
    gameRandomRedPrize.prototype.clickGet = function () {
        var _this = this;
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "福利红包弹窗点击",
            button_name_hcdg: "直接领取"
        });
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "领取成功",
            collection_completed: "直接领取成功"
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '福利红包弹窗展示',
            ck_module: '直接领取'
        });
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.btnRandomRedGet,
            onSuccess: function (res) {
                if (res.code === 0) {
                    if (!_this.isValid) {
                        return;
                    }
                    console.log("普通领取！");
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.coinItem, value: _this.redAmountNum, num: 10 });
                    util_1.default.addTermCoin(_this.redAmountNum);
                    AssistCtr_1.AssistCtr.showToastTip("获得" + (_this.redAmountNum) + "红包币");
                    cc.game.emit(NameTs_1.default.randomRedUpdate);
                    _this.closePage();
                }
                else {
                    AssistCtr_1.AssistCtr.showToastTip(res.message || '网络出错~');
                    cc.game.emit(NameTs_1.default.randomRedUpdate);
                    _this.closePage();
                }
            },
            onFail: function (res) {
                AssistCtr_1.AssistCtr.showToastTip("网络出错~");
                cc.game.emit(NameTs_1.default.randomRedUpdate);
                _this.closePage();
            }
        });
        cc.game.emit(NameTs_1.default.Game_Task_updata);
    };
    gameRandomRedPrize.prototype.clickDoubleGet = function () {
        var _this = this;
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "福利红包弹窗点击",
            button_name_hcdg: "领取600红包币"
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '福利红包弹窗展示',
            ck_module: '领取600红包币',
            active_ad_hcdg: "激励视频"
        });
        AdController_1.default.loadAd(AdPosition_1.AdPosition.randomRedPrize, function (res) {
            // TrackMgr.AppBuyProductDialog_hcdg({
            //     dialog_name_hcdg: "福利红包翻倍成功弹窗展示"
            // })
            TrackMgr_1.default.welfare_red_envelope({
                activity_state: "领取成功",
                collection_completed: "视频领取成功"
            });
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.btnRandomRedGet,
                onSuccess: function (res) {
                    if (res.code === 0) {
                        if (!_this.isValid) {
                            return;
                        }
                        console.log("翻倍领取！");
                        cc.game.emit(NameTs_1.default.randomRedUpdate);
                        cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.coinItem, value: _this.redAmountNum * _this.power, num: 10 });
                        util_1.default.addTermCoin(_this.redAmountNum * _this.power);
                        AssistCtr_1.AssistCtr.showToastTip("获得" + (_this.redAmountNum * _this.power) + "红包币");
                        _this.closePage();
                    }
                    else {
                        XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                        cc.game.emit(NameTs_1.default.randomRedUpdate);
                        _this.closePage();
                    }
                },
                onFail: function (res) {
                    AssistCtr_1.AssistCtr.showToastTip("网络出错~");
                    cc.game.emit(NameTs_1.default.randomRedUpdate);
                    _this.closePage();
                }
            });
        }, function () {
            cc.game.emit(NameTs_1.default.randomRedUpdate);
            _this.closePage();
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    gameRandomRedPrize.prototype.clickDoubleGet2 = function () {
        var _this = this;
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "领取成功",
            collection_completed: "视频领取成功"
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '福利红包翻倍成功弹窗展示',
            ck_module: '开心收下'
        });
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.btnRandomRedGet,
            onSuccess: function (res) {
                if (res.code === 0) {
                    if (!_this.isValid) {
                        return;
                    }
                    console.log("翻倍领取！");
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.coinItem, value: _this.redAmountNum * _this.power, num: 10 });
                    util_1.default.addTermCoin(_this.redAmountNum * _this.power);
                    AssistCtr_1.AssistCtr.showToastTip("获得" + (_this.redAmountNum * _this.power) + "红包币");
                }
                else {
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: function (res) {
            }
        });
        this.closePage();
        cc.game.emit(NameTs_1.default.Game_Task_updata);
    };
    __decorate([
        property(cc.RichText)
    ], gameRandomRedPrize.prototype, "lable_prizeNum", void 0);
    __decorate([
        property(cc.Node)
    ], gameRandomRedPrize.prototype, "btn_closeNode", void 0);
    __decorate([
        property(cc.Label)
    ], gameRandomRedPrize.prototype, "lable_goldNum", void 0);
    __decorate([
        property(cc.Node)
    ], gameRandomRedPrize.prototype, "feed_node1", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameRandomRedPrize.prototype, "multipleNode", void 0);
    gameRandomRedPrize = __decorate([
        ccclass
    ], gameRandomRedPrize);
    return gameRandomRedPrize;
}(baseTs_1.default));
exports.default = gameRandomRedPrize;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVSYW5kb21SZWRQcml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBc0M7QUFFdEMsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxxREFBZ0Q7QUFDaEQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUcxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFnRCxzQ0FBTTtJQUF0RDtRQUFBLHFFQXlNQztRQXJNRyxvQkFBYyxHQUFnQixJQUFJLENBQUM7UUFHbkMsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFLbkIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFFNUIsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsV0FBSyxHQUFHLENBQUMsQ0FBQztRQUVWLGNBQVEsR0FBVyxJQUFJLENBQUM7O0lBa0xwQyxDQUFDO0lBaExHLGtDQUFLLEdBQUw7UUFFSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQ3JDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUNoRCxDQUFDLEtBQUssRUFBRSxDQUFDO1FBR1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFD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QUFDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN2RTtxQkFBTTtvQkFDSCxlQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDL0M7WUFDTCxDQUFDO1lBQ0QsTUFBTSxFQUFFLFVBQUEsR0FBRztZQUVYLENBQUM7U0FDSixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFqTUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs4REFDYTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZEQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkRBQ1c7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDUztJQUszQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQzs0REFDTjtJQWxCbkIsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0F5TXRDO0lBQUQseUJBQUM7Q0F6TUQsQUF5TUMsQ0F6TStDLGdCQUFNLEdBeU1yRDtrQkF6TW9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XHJcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcclxuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xyXG5pbXBvcnQgdHVycmV0IGZyb20gXCIuLi9nYW1lL3R1cnJldC90dXJyZXRcIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVSYW5kb21SZWRQcml6ZSBleHRlbmRzIGJhc2VUcyB7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGxhYmxlX3ByaXplTnVtOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5fY2xvc2VOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV9nb2xkTnVtOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGZlZWRfbm9kZTE6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YCN5pWwXCJ9KVxyXG4gICAgcHJpdmF0ZSBtdWx0aXBsZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSByZWRBbW91bnROdW0gPSAyMDA7XHJcbiAgICBwcml2YXRlIHBvd2VyID0gMztcclxuXHJcbiAgICBwcml2YXRlIGNvaW5JdGVtOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm11bHRpcGxlTm9kZSkucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMyx7YW5nbGU6MTB9KS50byguMix7YW5nbGU6MH0pXHJcbiAgICAgICAgKS5zdGFydCgpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvaW5JdGVtID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwiUmFuZG9tUmVkXCIpfHx0aGlzLm5vZGU7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29pbkl0ZW0ueCx0aGlzLmNvaW5JdGVtLnksJ2FzZmFzZmFzZjEyNDEyPT09PT09PT09PT09PT09PT0nKVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56aP5Yip57qi5YyF5by556qX5bGV56S6XCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24ucmFuZG9tUmVkUHJpemVWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlMSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25EaXNhYmxlKCkgeyAgICAgICAgXHJcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5yYW5kb21SZWRQcml6ZVZpZXcpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0KGRhdGEpIHtcclxuXHJcbiAgICAgICAgVHJhY2tNZ3Iud2VsZmFyZV9yZWRfZW52ZWxvcGUoe1xyXG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpcIuemj+WIqee6ouWMheW8ueeql+WxleekulwiXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMubGFibGVfZ29sZE51bS5zdHJpbmcgPSBgKyR7dGhpcy5yZWRBbW91bnROdW19YDtcclxuICAgICAgICB0aGlzLmxhYmxlX3ByaXplTnVtLnN0cmluZyA9IGA8b3V0bGluZSBjb2xvcj0jRDI1NDAwIHdpZHRoPTQ+PGNvbG9yPSNGRkZDMDA+JHt0aGlzLnJlZEFtb3VudE51bSAqIHRoaXMucG93ZXJ9PC9jb2xvcj5gXHJcblxyXG4gICAgICAgIHRoaXMuYnRuX2Nsb3NlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2Nsb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0sIDMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrR2V0KCkge1xyXG4gICAgICAgIFRyYWNrTWdyLndlbGZhcmVfcmVkX2VudmVsb3BlKHtcclxuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6XCLnpo/liKnnuqLljIXlvLnnqpfngrnlh7tcIixcclxuICAgICAgICAgICAgYnV0dG9uX25hbWVfaGNkZzpcIuebtOaOpemihuWPllwiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgVHJhY2tNZ3Iud2VsZmFyZV9yZWRfZW52ZWxvcGUoe1xyXG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpcIumihuWPluaIkOWKn1wiLFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uX2NvbXBsZXRlZDpcIuebtOaOpemihuWPluaIkOWKn1wiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICfnpo/liKnnuqLljIXlvLnnqpflsZXnpLonLFxyXG4gICAgICAgICAgICBja19tb2R1bGU6ICfnm7TmjqXpooblj5YnXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XHJcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuYnRuUmFuZG9tUmVkR2V0LFxyXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaZrumAmumihuWPlu+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwge25vZGU6dGhpcy5jb2luSXRlbSwgdmFsdWU6IHRoaXMucmVkQW1vdW50TnVtLG51bToxMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMucmVkQW1vdW50TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635b6XXCIrKHRoaXMucmVkQW1vdW50TnVtKStcIue6ouWMheW4gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLnJhbmRvbVJlZFVwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMucmFuZG9tUmVkVXBkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkZhaWw6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi572R57uc5Ye66ZSZflwiKTtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMucmFuZG9tUmVkVXBkYXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UYXNrX3VwZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tEb3VibGVHZXQoKSB7XHJcbiAgICAgICAgVHJhY2tNZ3Iud2VsZmFyZV9yZWRfZW52ZWxvcGUoe1xyXG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpcIuemj+WIqee6ouWMheW8ueeql+eCueWHu1wiLFxyXG4gICAgICAgICAgICBidXR0b25fbmFtZV9oY2RnOlwi6aKG5Y+WNjAw57qi5YyF5biBXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogJ+emj+WIqee6ouWMheW8ueeql+WxleekuicsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogJ+mihuWPljYwMOe6ouWMheW4gScsXHJcbiAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5yYW5kb21SZWRQcml6ZSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcclxuICAgICAgICAgICAgLy8gICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56aP5Yip57qi5YyF57+75YCN5oiQ5Yqf5by556qX5bGV56S6XCJcclxuICAgICAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgICAgIFRyYWNrTWdyLndlbGZhcmVfcmVkX2VudmVsb3BlKHtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOlwi6aKG5Y+W5oiQ5YqfXCIsXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uX2NvbXBsZXRlZDpcIuinhumikemihuWPluaIkOWKn1wiXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuYnRuUmFuZG9tUmVkR2V0LFxyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIue/u+WAjemihuWPlu+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLnJhbmRvbVJlZFVwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOnRoaXMuY29pbkl0ZW0sdmFsdWU6IHRoaXMucmVkQW1vdW50TnVtICogdGhpcy5wb3dlcixudW06MTB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLnJlZEFtb3VudE51bSAqIHRoaXMucG93ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635b6XXCIrKHRoaXMucmVkQW1vdW50TnVtICogdGhpcy5wb3dlcikrXCLnuqLljIXluIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QocmVzLm1lc3NhZ2UgfHwgJ+e9kee7nOWHuumUmX4nLCAyLjUsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLnJhbmRvbVJlZFVwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uRmFpbDogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi572R57uc5Ye66ZSZflwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLnJhbmRvbVJlZFVwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMucmFuZG9tUmVkVXBkYXRlKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0RvdWJsZUdldDIoKSB7XHJcbiAgICAgICAgVHJhY2tNZ3Iud2VsZmFyZV9yZWRfZW52ZWxvcGUoe1xyXG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpcIumihuWPluaIkOWKn1wiLFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uX2NvbXBsZXRlZDpcIuinhumikemihuWPluaIkOWKn1wiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICfnpo/liKnnuqLljIXnv7vlgI3miJDlip/lvLnnqpflsZXnpLonLFxyXG4gICAgICAgICAgICBja19tb2R1bGU6ICflvIDlv4PmlLbkuIsnXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XHJcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuYnRuUmFuZG9tUmVkR2V0LFxyXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIue/u+WAjemihuWPlu+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwge25vZGU6dGhpcy5jb2luSXRlbSwgdmFsdWU6IHRoaXMucmVkQW1vdW50TnVtICogdGhpcy5wb3dlcixudW06MTB9KTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMucmVkQW1vdW50TnVtICogdGhpcy5wb3dlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuiOt+W+l1wiKyh0aGlzLnJlZEFtb3VudE51bSAqIHRoaXMucG93ZXIpK1wi57qi5YyF5biBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRmFpbDogcmVzID0+IHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG4iXX0=