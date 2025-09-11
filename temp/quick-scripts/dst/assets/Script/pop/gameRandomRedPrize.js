
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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
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
        // AdController.loadAd(AdPosition.randomRedPrize, (res) => {
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
        // }, () => {
        //     cc.game.emit(NameTs.randomRedUpdate);
        //     this.closePage();
        //     AssistCtr.showToastTip("加载视频失败，请稍后！");
        // })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVSYW5kb21SZWRQcml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBRXBDLDJDQUFzQztBQUV0QywrQ0FBOEM7QUFFOUMscURBQWdEO0FBQ2hELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFHMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBZ0Qsc0NBQU07SUFBdEQ7UUFBQSxxRUE4TEM7UUExTEcsb0JBQWMsR0FBZ0IsSUFBSSxDQUFDO1FBR25DLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBS25CLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGtCQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ25CLFdBQUssR0FBRyxDQUFDLENBQUM7UUFFVixjQUFRLEdBQVksSUFBSSxDQUFDOztJQXVLckMsQ0FBQztJQXJLRyxrQ0FBSyxHQUFMO1FBRUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUNyQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDeEQsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUdWLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUU3RCxPQUFPLENBQUMsR0FBRyxDQUFD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Q0FBQzs2REFDWTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNTO0lBSzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOzREQUNWO0lBbEJwQixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQThMdEM7SUFBRCx5QkFBQztDQTlMRCxBQThMQyxDQTlMK0MsZ0JBQU0sR0E4THJEO2tCQTlMb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCB0dXJyZXQgZnJvbSBcIi4uL2dhbWUvdHVycmV0L3R1cnJldFwiO1xyXG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcclxuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVJhbmRvbVJlZFByaXplIGV4dGVuZHMgYmFzZVRzIHtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgbGFibGVfcHJpemVOdW06IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bl9jbG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmxlX2dvbGROdW06IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGZlZWRfbm9kZTE6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5YCN5pWwXCIgfSlcclxuICAgIHByaXZhdGUgbXVsdGlwbGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHJlZEFtb3VudE51bSA9IDIwMDtcclxuICAgIHByaXZhdGUgcG93ZXIgPSAzO1xyXG5cclxuICAgIHByaXZhdGUgY29pbkl0ZW06IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm11bHRpcGxlTm9kZSkucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMywgeyBhbmdsZTogMTAgfSkudG8oLjIsIHsgYW5nbGU6IDAgfSlcclxuICAgICAgICApLnN0YXJ0KCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmNvaW5JdGVtID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwiUmFuZG9tUmVkXCIpIHx8IHRoaXMubm9kZTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb2luSXRlbS54LCB0aGlzLmNvaW5JdGVtLnksICdhc2Zhc2Zhc2YxMjQxMj09PT09PT09PT09PT09PT09JylcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGluaXQoZGF0YSkge1xyXG5cclxuICAgICAgICBUcmFja01nci53ZWxmYXJlX3JlZF9lbnZlbG9wZSh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuemj+WIqee6ouWMheW8ueeql+WxleekulwiXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMubGFibGVfZ29sZE51bS5zdHJpbmcgPSBgKyR7dGhpcy5yZWRBbW91bnROdW19YDtcclxuICAgICAgICB0aGlzLmxhYmxlX3ByaXplTnVtLnN0cmluZyA9IGA8b3V0bGluZSBjb2xvcj0jRDI1NDAwIHdpZHRoPTQ+PGNvbG9yPSNGRkZDMDA+JHt0aGlzLnJlZEFtb3VudE51bSAqIHRoaXMucG93ZXJ9PC9jb2xvcj5gXHJcblxyXG4gICAgICAgIHRoaXMuYnRuX2Nsb3NlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2Nsb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0sIDMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrR2V0KCkge1xyXG4gICAgICAgIFRyYWNrTWdyLndlbGZhcmVfcmVkX2VudmVsb3BlKHtcclxuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi56aP5Yip57qi5YyF5by556qX54K55Ye7XCIsXHJcbiAgICAgICAgICAgIGJ1dHRvbl9uYW1lX2hjZGc6IFwi55u05o6l6aKG5Y+WXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBUcmFja01nci53ZWxmYXJlX3JlZF9lbnZlbG9wZSh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIumihuWPluaIkOWKn1wiLFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uX2NvbXBsZXRlZDogXCLnm7TmjqXpooblj5bmiJDlip9cIlxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiAn56aP5Yip57qi5YyF5by556qX5bGV56S6JyxcclxuICAgICAgICAgICAgY2tfbW9kdWxlOiAn55u05o6l6aKG5Y+WJ1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmJ0blJhbmRvbVJlZEdldCxcclxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaZrumAmumihuWPlu+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLmNvaW5JdGVtLCB2YWx1ZTogdGhpcy5yZWRBbW91bnROdW0sIG51bTogMTAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLnJlZEFtb3VudE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuiOt+W+l1wiICsgKHRoaXMucmVkQW1vdW50TnVtKSArIFwi57qi5YyF5biBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMucmFuZG9tUmVkVXBkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5yYW5kb21SZWRVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRmFpbDogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLnvZHnu5zlh7rplJl+XCIpO1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5yYW5kb21SZWRVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0RvdWJsZUdldCgpIHtcclxuICAgICAgICBUcmFja01nci53ZWxmYXJlX3JlZF9lbnZlbG9wZSh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuemj+WIqee6ouWMheW8ueeql+eCueWHu1wiLFxyXG4gICAgICAgICAgICBidXR0b25fbmFtZV9oY2RnOiBcIumihuWPljYwMOe6ouWMheW4gVwiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICfnpo/liKnnuqLljIXlvLnnqpflsZXnpLonLFxyXG4gICAgICAgICAgICBja19tb2R1bGU6ICfpooblj5Y2MDDnuqLljIXluIEnLFxyXG4gICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzogXCLmv4DlirHop4bpopFcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLnJhbmRvbVJlZFByaXplLCAocmVzKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgLy8gICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56aP5Yip57qi5YyF57+75YCN5oiQ5Yqf5by556qX5bGV56S6XCJcclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICBUcmFja01nci53ZWxmYXJlX3JlZF9lbnZlbG9wZSh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIumihuWPluaIkOWKn1wiLFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uX2NvbXBsZXRlZDogXCLop4bpopHpooblj5bmiJDlip9cIlxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmJ0blJhbmRvbVJlZEdldCxcclxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIue/u+WAjemihuWPlu+8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMucmFuZG9tUmVkVXBkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5jb2luSXRlbSwgdmFsdWU6IHRoaXMucmVkQW1vdW50TnVtICogdGhpcy5wb3dlciwgbnVtOiAxMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMucmVkQW1vdW50TnVtICogdGhpcy5wb3dlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuiOt+W+l1wiICsgKHRoaXMucmVkQW1vdW50TnVtICogdGhpcy5wb3dlcikgKyBcIue6ouWMheW4gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5yYW5kb21SZWRVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRmFpbDogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLnvZHnu5zlh7rplJl+XCIpO1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5yYW5kb21SZWRVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gfSwgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLnJhbmRvbVJlZFVwZGF0ZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgLy8gICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XHJcblxyXG4gICAgICAgIC8vIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tEb3VibGVHZXQyKCkge1xyXG4gICAgICAgIFRyYWNrTWdyLndlbGZhcmVfcmVkX2VudmVsb3BlKHtcclxuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi6aKG5Y+W5oiQ5YqfXCIsXHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb25fY29tcGxldGVkOiBcIuinhumikemihuWPluaIkOWKn1wiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICfnpo/liKnnuqLljIXnv7vlgI3miJDlip/lvLnnqpflsZXnpLonLFxyXG4gICAgICAgICAgICBja19tb2R1bGU6ICflvIDlv4PmlLbkuIsnXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XHJcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuYnRuUmFuZG9tUmVkR2V0LFxyXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi57+75YCN6aKG5Y+W77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMuY29pbkl0ZW0sIHZhbHVlOiB0aGlzLnJlZEFtb3VudE51bSAqIHRoaXMucG93ZXIsIG51bTogMTAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLnJlZEFtb3VudE51bSAqIHRoaXMucG93ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflvpdcIiArICh0aGlzLnJlZEFtb3VudE51bSAqIHRoaXMucG93ZXIpICsgXCLnuqLljIXluIFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25GYWlsOiByZXMgPT4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVGFza191cGRhdGEpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==