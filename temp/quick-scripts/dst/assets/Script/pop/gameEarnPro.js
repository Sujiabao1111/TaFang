
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameEarnPro.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e052b4vbOdDKZM0iFd/wFFp', 'gameEarnPro');
// Script/pop/gameEarnPro.ts

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
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameEarnPro = /** @class */ (function (_super) {
    __extends(gameEarnPro, _super);
    function gameEarnPro() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_redAddNum = null;
        _this.lable_goldNum = null;
        _this.feed_node = null;
        _this.multipleNode = null;
        _this.redAmountNum = 500;
        _this.coinItem = null;
        return _this;
    }
    gameEarnPro.prototype.start = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    gameEarnPro.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.randomRedPrizeView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
    };
    gameEarnPro.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.randomRedPrizeView);
    };
    gameEarnPro.prototype.init = function (data) {
        this.redAmountNum = data.coin;
        this.lable_goldNum.string = "+" + this.redAmountNum;
        this.lable_redAddNum.string = this.redAmountNum * 3 + "";
        this.coinItem = util_1.default.GlobalMap.get("earnProgress") || this.node;
        TrackMgr_1.default.luckybag_task({
            activity_state: "红包任务奖励弹窗",
        });
    };
    gameEarnPro.prototype.clickGet = function (e, src) {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        var isVideo = src == 1 ? true : false;
        var successFn = function () {
            var coin = _this.redAmountNum * (isVideo ? 3 : 1);
            util_1.default.getdataStr({
                url: UrlConst_1.UrlConst.earnProgressReceive,
                success: function (res) {
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.coinItem, value: coin, num: 10 });
                    if (isVideo) {
                        util_1.default.addTermCoin(_this.redAmountNum * 2);
                    }
                    cc.game.emit(NameTs_1.default.Game_EarnProgress_Updata);
                    AssistCtr_1.AssistCtr.showToastTip("获得" + coin + "红包币");
                    _this.closePage();
                },
                fail: function (res) {
                    AssistCtr_1.AssistCtr.showToastTip("网络出错~");
                    _this.closePage();
                }
            });
        };
        if (isVideo) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.earnProgressVideo, function () {
                successFn();
                TrackMgr_1.default.luckybag_task({
                    activity_state: "红包任务奖励弹窗",
                    button_name: "多倍领取"
                });
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }
        else {
            TrackMgr_1.default.luckybag_task({
                activity_state: "红包任务奖励弹窗",
                button_name: "普通领取"
            });
            successFn();
        }
    };
    __decorate([
        property(cc.Label)
    ], gameEarnPro.prototype, "lable_redAddNum", void 0);
    __decorate([
        property(cc.Label)
    ], gameEarnPro.prototype, "lable_goldNum", void 0);
    __decorate([
        property(cc.Node)
    ], gameEarnPro.prototype, "feed_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameEarnPro.prototype, "multipleNode", void 0);
    gameEarnPro = __decorate([
        ccclass
    ], gameEarnPro);
    return gameEarnPro;
}(baseTs_1.default));
exports.default = gameEarnPro;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVFYXJuUHJvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBQ2xELDJDQUFzQztBQUV0QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBRWpFLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRzFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFNO0lBQS9DO1FBQUEscUVBaUdDO1FBOUZHLHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBR2hDLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHbEIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFFNUIsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFFbkIsY0FBUSxHQUFXLElBQUksQ0FBQzs7SUFpRnBDLENBQUM7SUEvRUcsMkJBQUssR0FBTDtRQUVJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FDckMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQ2hELENBQUMsS0FBSyxFQUFFLENBQUM7SUFJZCxDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNJLHNCQUFZLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBLHdCQUF3QjtJQUN4RyxDQUFDO0lBR0QsK0JBQVMsR0FBVDtR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Q2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDVztJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDO3FEQUNOO0lBWm5CLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FpRy9CO0lBQUQsa0JBQUM7Q0FqR0QsQUFpR0MsQ0FqR3dDLGdCQUFNLEdBaUc5QztrQkFqR29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCB0dXJyZXQgZnJvbSBcIi4uL2dhbWUvdHVycmV0L3R1cnJldFwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVFYXJuUHJvIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9yZWRBZGROdW06Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmxlX2dvbGROdW06Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWAjeaVsFwifSlcbiAgICBwcml2YXRlIG11bHRpcGxlTm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgcmVkQW1vdW50TnVtID0gNTAwO1xuXG4gICAgcHJpdmF0ZSBjb2luSXRlbTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubXVsdGlwbGVOb2RlKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMyx7YW5nbGU6MTB9KS50byguMix7YW5nbGU6MH0pXG4gICAgICAgICkuc3RhcnQoKTtcblxuICAgICAgICBcblxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLnJhbmRvbVJlZFByaXplVmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHsgICAgICAgIFxuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLnJhbmRvbVJlZFByaXplVmlldyk7XG4gICAgfVxuXG4gICAgaW5pdChkYXRhKSB7XG5cbiAgICAgICAgdGhpcy5yZWRBbW91bnROdW0gPSBkYXRhLmNvaW47XG4gICAgICAgIHRoaXMubGFibGVfZ29sZE51bS5zdHJpbmcgPSBcIitcIit0aGlzLnJlZEFtb3VudE51bTtcbiAgICAgICAgdGhpcy5sYWJsZV9yZWRBZGROdW0uc3RyaW5nID0gdGhpcy5yZWRBbW91bnROdW0qMytcIlwiO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb2luSXRlbSA9IHV0aWwuR2xvYmFsTWFwLmdldChcImVhcm5Qcm9ncmVzc1wiKXx8dGhpcy5ub2RlO1xuXG4gICAgICAgIFxuICAgICAgICBUcmFja01nci5sdWNreWJhZ190YXNrKHtcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIue6ouWMheS7u+WKoeWlluWKseW8ueeql1wiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGlja0dldChlLHNyYykge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgbGV0IGlzVmlkZW86Ym9vbGVhbiA9IHNyYz09MT90cnVlOmZhbHNlO1xuXG4gICAgICAgIGxldCBzdWNjZXNzRm4gPSAoKT0+e1xuXG4gICAgICAgICAgICBsZXQgY29pbjpudW1iZXIgPSB0aGlzLnJlZEFtb3VudE51bSooaXNWaWRlbz8zOjEpO1xuICAgICAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmVhcm5Qcm9ncmVzc1JlY2VpdmUsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7bm9kZTp0aGlzLmNvaW5JdGVtLCB2YWx1ZTogY29pbixudW06MTAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlzVmlkZW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLnJlZEFtb3VudE51bSoyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWFyblByb2dyZXNzX1VwZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflvpdcIitjb2luK1wi57qi5YyF5biBXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIue9kee7nOWHuumUmX5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZihpc1ZpZGVvKXtcbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5lYXJuUHJvZ3Jlc3NWaWRlbywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLmx1Y2t5YmFnX3Rhc2soe1xuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLnuqLljIXku7vliqHlpZblirHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uX25hbWU6XCLlpJrlgI3pooblj5ZcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBUcmFja01nci5sdWNreWJhZ190YXNrKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLnuqLljIXku7vliqHlpZblirHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBidXR0b25fbmFtZTpcIuaZrumAmumihuWPllwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIFxuXG59XG4iXX0=