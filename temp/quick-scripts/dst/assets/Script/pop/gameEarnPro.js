
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
                    // AssistCtr.showToastTip("获得"+coin+"红包币");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVFYXJuUHJvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFFcEMsMkNBQXNDO0FBRXRDLCtDQUE4QztBQUc5QyxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUcxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQStGQztRQTVGRyxxQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBR2xCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGtCQUFZLEdBQUcsR0FBRyxDQUFDO1FBRW5CLGNBQVEsR0FBWSxJQUFJLENBQUM7O0lBK0VyQyxDQUFDO0lBN0VHLDJCQUFLLEdBQUw7UUFFSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQ3JDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUN4RCxDQUFDLEtBQUssRUFBRSxDQUFDO0lBSWQsQ0FBQztJQUVELDhCQUFRLEdBQVI7SUFDQSxDQUFDO0lBR0QsK0JBQVMsR0FBVDtJQUNBLENBQUM7SUFFRCwwQkFBSSxHQUFKLFVBQUssSUFBSTtRQUVMLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdB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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCB0dXJyZXQgZnJvbSBcIi4uL2dhbWUvdHVycmV0L3R1cnJldFwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVFYXJuUHJvIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9yZWRBZGROdW06IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9nb2xkTnVtOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5YCN5pWwXCIgfSlcbiAgICBwcml2YXRlIG11bHRpcGxlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIHJlZEFtb3VudE51bSA9IDUwMDtcblxuICAgIHByaXZhdGUgY29pbkl0ZW06IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgY2MudHdlZW4odGhpcy5tdWx0aXBsZU5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLCB7IGFuZ2xlOiAxMCB9KS50byguMiwgeyBhbmdsZTogMCB9KVxuICAgICAgICApLnN0YXJ0KCk7XG5cblxuXG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICB9XG5cbiAgICBpbml0KGRhdGEpIHtcblxuICAgICAgICB0aGlzLnJlZEFtb3VudE51bSA9IGRhdGEuY29pbjtcbiAgICAgICAgdGhpcy5sYWJsZV9nb2xkTnVtLnN0cmluZyA9IFwiK1wiICsgdGhpcy5yZWRBbW91bnROdW07XG4gICAgICAgIHRoaXMubGFibGVfcmVkQWRkTnVtLnN0cmluZyA9IHRoaXMucmVkQW1vdW50TnVtICogMyArIFwiXCI7XG5cbiAgICAgICAgdGhpcy5jb2luSXRlbSA9IHV0aWwuR2xvYmFsTWFwLmdldChcImVhcm5Qcm9ncmVzc1wiKSB8fCB0aGlzLm5vZGU7XG5cblxuICAgICAgICBUcmFja01nci5sdWNreWJhZ190YXNrKHtcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIue6ouWMheS7u+WKoeWlluWKseW8ueeql1wiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGlja0dldChlLCBzcmMpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGxldCBpc1ZpZGVvOiBib29sZWFuID0gc3JjID09IDEgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgbGV0IHN1Y2Nlc3NGbiA9ICgpID0+IHtcblxuICAgICAgICAgICAgbGV0IGNvaW46IG51bWJlciA9IHRoaXMucmVkQW1vdW50TnVtICogKGlzVmlkZW8gPyAzIDogMSk7XG4gICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZWFyblByb2dyZXNzUmVjZWl2ZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5jb2luSXRlbSwgdmFsdWU6IGNvaW4sIG51bTogMTAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ZpZGVvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMucmVkQW1vdW50TnVtICogMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0Vhcm5Qcm9ncmVzc19VcGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635b6XXCIrY29pbitcIue6ouWMheW4gVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLnvZHnu5zlh7rplJl+XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVmlkZW8pIHtcbiAgICAgICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5lYXJuUHJvZ3Jlc3NWaWRlbywgKCkgPT4ge1xuICAgICAgICAgICAgc3VjY2Vzc0ZuKCk7XG4gICAgICAgICAgICBUcmFja01nci5sdWNreWJhZ190YXNrKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLnuqLljIXku7vliqHlpZblirHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBidXR0b25fbmFtZTogXCLlpJrlgI3pooblj5ZcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVHJhY2tNZ3IubHVja3liYWdfdGFzayh7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi57qi5YyF5Lu75Yqh5aWW5Yqx5by556qXXCIsXG4gICAgICAgICAgICAgICAgYnV0dG9uX25hbWU6IFwi5pmu6YCa6aKG5Y+WXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3VjY2Vzc0ZuKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbn1cbiJdfQ==