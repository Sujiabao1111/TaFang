
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
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.OfflineView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度   
        // if(util.adPreObj[AdPosition.OfflineView]){
        //    util.preloadAd(AdPosition.OfflineView,true);
        // } 
    };
    gameOffline.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.OfflineView);
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
            AdController_1.default.loadAd(AdPosition_1.AdPosition.Offline, function () {
                successFn();
                // util.preloadAd(AdPosition.Offline);
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVPZmZsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBRWxELDJDQUFzQztBQUV0QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFNO0lBQS9DO1FBQUEscUVBbUlDO1FBL0hXLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRWpDLDRDQUE0QztRQUM1QyxnQ0FBZ0M7UUFJeEIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUV6QixVQUFJLEdBQVUsSUFBSSxDQUFDLENBQUMsSUFBSTtRQUN4QixXQUFLLEdBQVUsQ0FBQyxDQUFDLENBQUEsSUFBSTtRQUVyQixhQUFPLEdBQVcsSUFBSSxDQUFDOztRQXlHL0IsaUJBQWlCO0lBQ3JCLENBQUM7SUF6R0csMkJBQUssR0FBTDtRQUVJLHNDQUFzQztRQUN0QyxtREFBbUQ7UUFDbkQsYUFBYTtJQUVqQixDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBSSxHQUFKO1FBRUksSUFBSSxDQUFDLElBQUksR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7UUFFeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFDLElBQUksQ0FB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b3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgY3VzdG9tc0luZm8gfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lT2ZmbGluZSBleHRlbmRzIGJhc2VUcyB7XG5cblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIuiOt+W+l+mHkeW4gVwifSlcbiAgICBwcml2YXRlIGNvaW5MYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLoh6rlt7HkuIDlhbHlpJrlsJHph5HluIFcIn0pXG4gICAgcHJpdmF0ZSBjb2luQWxsTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5YWR5o2icm1iXCJ9KVxuICAgIHByaXZhdGUgcm1iTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLli77pgIlcIn0pXG4gICAgcHJpdmF0ZSB2aWRlb0ljb246Y2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuS/oeaBr+a1gVwifSlcbiAgICBwcml2YXRlIGZlZWRfbm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgY29pbjpudW1iZXIgPSBudWxsOyAvL+WNleWAjVxuICAgIHByaXZhdGUgY29pbjI6bnVtYmVyID0gMDsvL+WkmuWAjVxuXG4gICAgcHJpdmF0ZSBpc1ZpZGVvOmJvb2xlYW4gPSB0cnVlO1xuICAgIHN0YXJ0ICgpIHtcblxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmxpZ2h0KS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyAgICAgY2MudHdlZW4oKS50bygxLHtzY2FsZToxfSkudG8oMSx7c2NhbGU6MS4xfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyWXG4gICAgICovXG4gICAgaW5pdCgpe1xuICAgICAgIFxuICAgICAgICB0aGlzLmNvaW4gPSB1dGlsLnVzZXJEYXRhLm9mZmxpbmVJbmNvbWUucmV3YXJkO1xuXG4gICAgICAgIHRoaXMuY29pbjIgPSB1dGlsLnVzZXJEYXRhLm9mZmxpbmVJbmNvbWUubXVsdGlwbGVSZXdhcmQ7XG5cbiAgICAgICAgdGhpcy5jb2luTGFiZWwuc3RyaW5nID0gXCIrXCIrdGhpcy5jb2luMitcIue6ouWMheW4gVwiO1xuXG4gICAgICAgIHRoaXMuY29pbkFsbExhYmVsLnN0cmluZyA9IFN0cmluZyh1dGlsLnVzZXJEYXRhLmNvaW4pO1xuXG4gICAgICAgIHRoaXMucm1iTGFiZWwuc3RyaW5nID0gXCI9IFwiK3V0aWwudXNlckRhdGEuY29pbi8xMDAwMCtcIuWFg1wiO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuemu+e6v+mHkeW4geW8ueeql1wiXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5PZmZsaW5lVmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqYgICBcbiAgICAgICAgLy8gaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLk9mZmxpbmVWaWV3XSl7XG4gICAgICAgIC8vICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uT2ZmbGluZVZpZXcsdHJ1ZSk7XG4gICAgICAgIC8vIH0gXG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uT2ZmbGluZVZpZXcpO1xuICAgIH1cblxuICAgIC8qKuiOt+WPliAqL1xuICAgIGdldEJ0bigpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgbGV0IGNvaW46bnVtYmVyID0gdGhpcy5pc1ZpZGVvP3RoaXMuY29pbjI6dGhpcy5jb2luO1xuICAgICAgICBsZXQgc3VjY2Vzc0ZuID0gKCk9PntcbiAgICAgICAgICAgIHV0aWwucG9zdCh7XG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmlzVmlkZW8/VXJsQ29uc3QuZ2V0T2ZmbGluZURvdWJsZTpVcmxDb25zdC5nZXRPZmZsaW5lQ29tbW9uLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4se25vZGU6dGhpcy5ub2RlLHZhbHVlOmNvaW4sbnVtOjEwfSk7XG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflvpdcIitjb2luK1wi57qi5YyF5biBXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfU3RhcnQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDoocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6aKG5Y+W5aSx6LSl77yBXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaXNWaWRlbyl7XG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uT2ZmbGluZSwoKT0+e1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgICAgIC8vIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uT2ZmbGluZSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuemu+e6v+mHkeW4geW8ueeql1wiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTpcIue/u+WAjemihuWPllwiLFxuICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnprvnur/ph5HluIHlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLnm7TmjqXmlLbkuItcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuXG5cbiAgICB9XG5cbiAgICAvKirpgInmi6kqL1xuICAgIHNlbGVjdEJ0bigpe1xuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIHRoaXMuaXNWaWRlbyA9ICF0aGlzLmlzVmlkZW87XG5cbiAgICAgICAgdGhpcy52aWRlb0ljb24uYWN0aXZlID0gdGhpcy5pc1ZpZGVvO1xuXG4gICAgICAgIHRoaXMuY29pbkxhYmVsLnN0cmluZyA9IFwiK1wiKyh0aGlzLmlzVmlkZW8/dGhpcy5jb2luMjp0aGlzLmNvaW4pK1wi6YeR5biBXCI7XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19