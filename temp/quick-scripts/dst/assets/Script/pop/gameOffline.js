
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameOffline.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da298i6qL9IDYt2VWabVjo9', 'gameOffline');
// Script/pop/gameOffline.ts

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
var gameOffline = /** @class */ (function (_super) {
    __extends(gameOffline, _super);
    function gameOffline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coinLabel = null;
        _this.coinAllLabel = null;
        _this.rmbLabel = null;
        _this.videoIcon = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.feed_node = null;
        _this.coin = null; //单倍
        _this.coin2 = 0; //多倍
        _this.isVideo = true;
        return _this;
        // update (dt) {}
    }
    gameOffline.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
    };
    /**
     * 初始化
     */
    gameOffline.prototype.init = function () {
        this.coin = util_1.default.userData.offlineIncome.reward;
        this.coin2 = util_1.default.userData.offlineIncome.multipleReward;
        this.coinLabel.string = "+" + this.coin2 + "红包币";
        this.coinAllLabel.string = String(util_1.default.userData.coin);
        this.rmbLabel.string = "= " + util_1.default.userData.coin / 10000 + "元";
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "离线金币弹窗"
        });
    };
    gameOffline.prototype.onEnable = function () {
        // if(util.adPreObj[AdPosition.OfflineView]){
        //    util.preloadAd(AdPosition.OfflineView,true);
        // } 
    };
    gameOffline.prototype.onDisable = function () {
    };
    /**获取 */
    gameOffline.prototype.getBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        var coin = this.isVideo ? this.coin2 : this.coin;
        var successFn = function () {
            util_1.default.post({
                url: _this.isVideo ? UrlConst_1.UrlConst.getOfflineDouble : UrlConst_1.UrlConst.getOfflineCommon,
                success: function (res) {
                    if (!_this.isValid) {
                        return;
                    }
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.node, value: coin, num: 10 });
                    AssistCtr_1.AssistCtr.showToastTip("获得" + coin + "红包币");
                    _this.closePage();
                    // this.showPage(pageTs.pageName.GameStart);
                    cc.game.emit(NameTs_1.default.Game_Start);
                },
                fail: function (res) {
                    AssistCtr_1.AssistCtr.showToastTip("领取失败！");
                    _this.closePage();
                }
            });
        };
        if (this.isVideo) {
            // AdController.loadAd(AdPosition.Offline,()=>{
            successFn();
            // util.preloadAd(AdPosition.Offline);
            // }, () => {
            //     AssistCtr.showToastTip("加载视频失败，请稍后！");
            // });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "离线金币弹窗",
                ck_module: "翻倍领取",
                active_ad_hcdg: "激励视频"
            });
        }
        else {
            successFn();
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "离线金币弹窗",
                ck_module: "直接收下",
            });
        }
    };
    /**选择*/
    gameOffline.prototype.selectBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.isVideo = !this.isVideo;
        this.videoIcon.active = this.isVideo;
        this.coinLabel.string = "+" + (this.isVideo ? this.coin2 : this.coin) + "金币";
    };
    __decorate([
        property({ type: cc.Label, displayName: "获得金币" })
    ], gameOffline.prototype, "coinLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "自己一共多少金币" })
    ], gameOffline.prototype, "coinAllLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "兑换rmb" })
    ], gameOffline.prototype, "rmbLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "勾选" })
    ], gameOffline.prototype, "videoIcon", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameOffline.prototype, "feed_node", void 0);
    gameOffline = __decorate([
        ccclass
    ], gameOffline);
    return gameOffline;
}(baseTs_1.default));
exports.default = gameOffline;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVPZmZsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFHcEMsMkNBQXNDO0FBRXRDLCtDQUE4QztBQUU5QyxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQWlJQztRQTdIVyxlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUVsQyw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBSXhCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsVUFBSSxHQUFXLElBQUksQ0FBQyxDQUFDLElBQUk7UUFDekIsV0FBSyxHQUFXLENBQUMsQ0FBQyxDQUFBLElBQUk7UUFFdEIsYUFBTyxHQUFZLElBQUksQ0FBQzs7UUF1R2hDLGlCQUFpQjtJQUNyQixDQUFDO0lBdkdHLDJCQUFLLEdBQUw7UUFFSSxzQ0FBc0M7UUFDdEMsbURBQW1EO1FBQ25ELGFBQWE7SUFFakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMEJBQUksR0FBSjtRQUVJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRS9DLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO1FBRXhELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVq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QUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNqRixDQUFDO0lBekhEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO2tEQUNmO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDO3FEQUNoQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQztpREFDakI7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7a0RBQ2I7SUFPbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7a0RBQ2Q7SUFwQmpCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FpSS9CO0lBQUQsa0JBQUM7Q0FqSUQsQUFpSUMsQ0FqSXdDLGdCQUFNLEdBaUk5QztrQkFqSW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGN1c3RvbXNJbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lT2ZmbGluZSBleHRlbmRzIGJhc2VUcyB7XG5cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLojrflvpfph5HluIFcIiB9KVxuICAgIHByaXZhdGUgY29pbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi6Ieq5bex5LiA5YWx5aSa5bCR6YeR5biBXCIgfSlcbiAgICBwcml2YXRlIGNvaW5BbGxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuWFkeaNonJtYlwiIH0pXG4gICAgcHJpdmF0ZSBybWJMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5Yu+6YCJXCIgfSlcbiAgICBwcml2YXRlIHZpZGVvSWNvbjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgY29pbjogbnVtYmVyID0gbnVsbDsgLy/ljZXlgI1cbiAgICBwcml2YXRlIGNvaW4yOiBudW1iZXIgPSAwOy8v5aSa5YCNXG5cbiAgICBwcml2YXRlIGlzVmlkZW86IGJvb2xlYW4gPSB0cnVlO1xuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKi9cbiAgICBpbml0KCkge1xuXG4gICAgICAgIHRoaXMuY29pbiA9IHV0aWwudXNlckRhdGEub2ZmbGluZUluY29tZS5yZXdhcmQ7XG5cbiAgICAgICAgdGhpcy5jb2luMiA9IHV0aWwudXNlckRhdGEub2ZmbGluZUluY29tZS5tdWx0aXBsZVJld2FyZDtcblxuICAgICAgICB0aGlzLmNvaW5MYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMuY29pbjIgKyBcIue6ouWMheW4gVwiO1xuXG4gICAgICAgIHRoaXMuY29pbkFsbExhYmVsLnN0cmluZyA9IFN0cmluZyh1dGlsLnVzZXJEYXRhLmNvaW4pO1xuXG4gICAgICAgIHRoaXMucm1iTGFiZWwuc3RyaW5nID0gXCI9IFwiICsgdXRpbC51c2VyRGF0YS5jb2luIC8gMTAwMDAgKyBcIuWFg1wiO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuemu+e6v+mHkeW4geW8ueeql1wiXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgLy8gaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLk9mZmxpbmVWaWV3XSl7XG4gICAgICAgIC8vICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uT2ZmbGluZVZpZXcsdHJ1ZSk7XG4gICAgICAgIC8vIH0gXG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgfVxuXG4gICAgLyoq6I635Y+WICovXG4gICAgZ2V0QnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgbGV0IGNvaW46IG51bWJlciA9IHRoaXMuaXNWaWRlbyA/IHRoaXMuY29pbjIgOiB0aGlzLmNvaW47XG4gICAgICAgIGxldCBzdWNjZXNzRm4gPSAoKSA9PiB7XG4gICAgICAgICAgICB1dGlsLnBvc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogdGhpcy5pc1ZpZGVvID8gVXJsQ29uc3QuZ2V0T2ZmbGluZURvdWJsZSA6IFVybENvbnN0LmdldE9mZmxpbmVDb21tb24sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMubm9kZSwgdmFsdWU6IGNvaW4sIG51bTogMTAgfSk7XG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflvpdcIiArIGNvaW4gKyBcIue6ouWMheW4gVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1N0YXJ0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIumihuWPluWksei0pe+8gVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc1ZpZGVvKSB7XG4gICAgICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uT2ZmbGluZSwoKT0+e1xuICAgICAgICAgICAgc3VjY2Vzc0ZuKCk7XG4gICAgICAgICAgICAvLyB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLk9mZmxpbmUpO1xuICAgICAgICAgICAgLy8gfSwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnprvnur/ph5HluIHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi57+75YCN6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6IFwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VjY2Vzc0ZuKCk7XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuemu+e6v+mHkeW4geW8ueeql1wiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLnm7TmjqXmlLbkuItcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuXG4gICAgfVxuXG4gICAgLyoq6YCJ5oupKi9cbiAgICBzZWxlY3RCdG4oKSB7XG5cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgdGhpcy5pc1ZpZGVvID0gIXRoaXMuaXNWaWRlbztcblxuICAgICAgICB0aGlzLnZpZGVvSWNvbi5hY3RpdmUgPSB0aGlzLmlzVmlkZW87XG5cbiAgICAgICAgdGhpcy5jb2luTGFiZWwuc3RyaW5nID0gXCIrXCIgKyAodGhpcy5pc1ZpZGVvID8gdGhpcy5jb2luMiA6IHRoaXMuY29pbikgKyBcIumHkeW4gVwiO1xuICAgIH1cblxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==