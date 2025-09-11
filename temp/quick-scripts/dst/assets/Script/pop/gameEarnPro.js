
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
    };
    gameEarnPro.prototype.onDisable = function () {
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
            // AdController.loadAd(AdPosition.earnProgressVideo, () => {
            successFn();
            TrackMgr_1.default.luckybag_task({
                activity_state: "红包任务奖励弹窗",
                button_name: "多倍领取"
            });
            // }, () => {
            //     AssistCtr.showToastTip("加载视频失败，请稍后！");
            // });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVFYXJuUHJvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFFcEMsMkNBQXNDO0FBRXRDLCtDQUE4QztBQUc5QyxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUcxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQStGQztRQTVGRyxxQkFBZSxHQUFZLElBQUksQ0FBQztRQUdoQyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBR2xCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRTVCLGtCQUFZLEdBQUcsR0FBRyxDQUFDO1FBRW5CLGNBQVEsR0FBVyxJQUFJLENBQUM7O0lBK0VwQyxDQUFDO0lBN0VHLDJCQUFLLEdBQUw7UUFFSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQ3JDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUNoRCxDQUFDLEtBQUssRUFBRSxDQUFDO0lBSWQsQ0FBQztJQUVELDhCQUFRLEdBQVI7SUFDQSxDQUFDO0lBR0QsK0JBQVMsR0FBVDtJQUNBLENBQUM7SUFFRCwwQkFBSSxHQUFKLFVBQUssSUFBSTtRQUVMLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdB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OUM7a0JBL0ZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgdHVycmV0IGZyb20gXCIuLi9nYW1lL3R1cnJldC90dXJyZXRcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lRWFyblBybyBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfcmVkQWRkTnVtOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9nb2xkTnVtOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlgI3mlbBcIn0pXG4gICAgcHJpdmF0ZSBtdWx0aXBsZU5vZGU6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIHJlZEFtb3VudE51bSA9IDUwMDtcblxuICAgIHByaXZhdGUgY29pbkl0ZW06Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBzdGFydCgpIHtcblxuICAgICAgICBjYy50d2Vlbih0aGlzLm11bHRpcGxlTm9kZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjMse2FuZ2xlOjEwfSkudG8oLjIse2FuZ2xlOjB9KVxuICAgICAgICApLnN0YXJ0KCk7XG5cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkgeyAgICAgICAgXG4gICAgfVxuXG4gICAgaW5pdChkYXRhKSB7XG5cbiAgICAgICAgdGhpcy5yZWRBbW91bnROdW0gPSBkYXRhLmNvaW47XG4gICAgICAgIHRoaXMubGFibGVfZ29sZE51bS5zdHJpbmcgPSBcIitcIit0aGlzLnJlZEFtb3VudE51bTtcbiAgICAgICAgdGhpcy5sYWJsZV9yZWRBZGROdW0uc3RyaW5nID0gdGhpcy5yZWRBbW91bnROdW0qMytcIlwiO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb2luSXRlbSA9IHV0aWwuR2xvYmFsTWFwLmdldChcImVhcm5Qcm9ncmVzc1wiKXx8dGhpcy5ub2RlO1xuXG4gICAgICAgIFxuICAgICAgICBUcmFja01nci5sdWNreWJhZ190YXNrKHtcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIue6ouWMheS7u+WKoeWlluWKseW8ueeql1wiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGlja0dldChlLHNyYykge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgbGV0IGlzVmlkZW86Ym9vbGVhbiA9IHNyYz09MT90cnVlOmZhbHNlO1xuXG4gICAgICAgIGxldCBzdWNjZXNzRm4gPSAoKT0+e1xuXG4gICAgICAgICAgICBsZXQgY29pbjpudW1iZXIgPSB0aGlzLnJlZEFtb3VudE51bSooaXNWaWRlbz8zOjEpO1xuICAgICAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmVhcm5Qcm9ncmVzc1JlY2VpdmUsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7bm9kZTp0aGlzLmNvaW5JdGVtLCB2YWx1ZTogY29pbixudW06MTAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlzVmlkZW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLnJlZEFtb3VudE51bSoyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWFyblByb2dyZXNzX1VwZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflvpdcIitjb2luK1wi57qi5YyF5biBXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIue9kee7nOWHuumUmX5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZihpc1ZpZGVvKXtcbiAgICAgICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5lYXJuUHJvZ3Jlc3NWaWRlbywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLmx1Y2t5YmFnX3Rhc2soe1xuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLnuqLljIXku7vliqHlpZblirHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uX25hbWU6XCLlpJrlgI3pooblj5ZcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gfSwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBUcmFja01nci5sdWNreWJhZ190YXNrKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLnuqLljIXku7vliqHlpZblirHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBidXR0b25fbmFtZTpcIuaZrumAmumihuWPllwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIFxuXG59XG4iXX0=