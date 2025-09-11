
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameHeavenReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5427cNbMs9KUoU7hTmzXNpm', 'gameHeavenReward');
// Script/pop/gameHeavenReward.ts

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
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameHeavenReward = /** @class */ (function (_super) {
    __extends(gameHeavenReward, _super);
    function gameHeavenReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel = null;
        _this.multipleNode = null;
        _this.lable_addGold2 = null;
        _this.closeBtnNode = null;
        // @property({type:cc.Node,displayName:"视频icon"})
        // private videoIcon:cc.Node = null;
        _this.feed_node = null;
        _this.get_node = null;
        _this.get_node2 = null;
        //多少个金币
        _this.coin = null;
        //剩余次数
        _this.heavenNum = null;
        //是否需要看视频 
        _this.isVideo = false;
        _this.isClickGet = false; //是否点击了领取
        return _this;
        // update (dt) {}
    }
    gameHeavenReward.prototype.onLoad = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        var _this = this;
        this.scheduleOnce(function () {
            if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
                _this.closeBtnNode.active = true;
            }
            else {
                _this.get_node2.active = true;
            }
        }, faceTs_1.gameNumerical.closeTime);
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**
     *
     * @param data 数据
     */
    gameHeavenReward.prototype.init = function (data) {
        if (data && data.data) {
            this.initData = data.data;
            this.coin = this.initData.point;
            this.rewardLabel.string = "+" + this.coin + "红包币";
            this.lable_addGold2.string = this.coin * 10 + "";
            this.heavenItem = data.item || this.node;
            // this.isVideo = util.heavenClickNum==3;
            // if(this.isVideo){
            // }
            // this.videoIcon.active = this.isVideo;
            this.isVideo = data.isVideo ? true : false;
            this.get_node.active = !this.isVideo;
            this.closeBtnNode.getParent().active = this.isVideo;
        }
        // if(!util.adPreObj[AdPosition.HeavenCoin]){
        //     util.preloadAd(AdPosition.HeavenCoin);
        // }
        // TrackMgr.airborne_gold({
        //     activity_state: "金币奖励弹窗",
        // })
        // TrackMgr.AppBuyProductDialog_hcdg({
        //     dialog_name_hcdg: "空降金币"
        // })
        if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
            // TrackMgr.AppBuyProductDialog_hcdg({
            //     dialog_name_hcdg: "空投金币"+(this.isVideo?"":"不")+"需看视频弹窗（B用户）"
            // })
        }
        this.item = data.item;
        this.no = data.no;
        util_1.default.heavenTouch = false;
        if (!this.initData.id || this.initData.id == "") {
            console.error("该空降金币没有id，给予消除");
            util_1.default.saveHeavenPool(this.no, null);
            cc.game.emit(NameTs_1.default.Game_Heaven_killed, this.item);
        }
    };
    gameHeavenReward.prototype.start = function () {
    };
    /**
     * 获取
     */
    gameHeavenReward.prototype.getBtn = function (e, res) {
        var _this = this;
        if (this.isClickGet) {
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(function () {
            _this.isClickGet = false;
        }, 2);
        var num = Number(res);
        soundController_1.default.singleton.clickAudio();
        var coin = this.coin * (num == 1 ? 10 : 1);
        var successFn = function () {
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.heavenItem, value: coin, num: 10 });
            util_1.default.addTermCoin(coin);
            _this.closePage();
            util_1.default.heavenClickNum++;
            util_1.default.saveHeavenPool(_this.no, null);
            cc.game.emit(NameTs_1.default.Game_Heaven_killed, _this.item);
            _this.SendPost();
        };
        if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "空投金币" + (num == 1 ? "" : "不") + "需看视频弹窗（B用户）"
            });
        }
        if (num == 1) {
            // AdController.loadAd(AdPosition.HeavenCoin, () => {
            successFn();
            // TrackMgr.airborne_gold({
            //     activity_state: "点击「视频icon领取金币」按钮",
            // });
            // if (util.adPreObj[AdPosition.HeavenCoin]) {
            //     util.preloadAd(AdPosition.HeavenCoin);
            // }
            if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
                util_1.default.existVideoCoinNum--;
            }
            // }, () => {
            //     AssistCtr.showToastTip("加载视频失败，请稍后！");
            // });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降金币",
                ck_module: "翻倍领取",
                active_ad_hcdg: "激励视频"
            });
            if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "空投金币需看视频弹窗（B用户）",
                    ck_module: "领取",
                    active_ad_hcdg: "激励视频"
                });
            }
        }
        else {
            successFn();
            TrackMgr_1.default.airborne_gold({
                activity_state: "点击「领取金币」按钮",
            });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降金币",
                ck_module: "收下",
            });
            if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "空投金币不需看视频弹窗（B用户）",
                    ck_module: "直接领取",
                });
            }
        }
    };
    /**
     * 关闭
     */
    gameHeavenReward.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        TrackMgr_1.default.airborne_gold({
            activity_state: "点击「放弃奖励」按钮",
        });
        if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "空投金币需看视频弹窗（B用户）",
                ck_module: "关闭",
            });
        }
        // this.SendPost();
    };
    /**发送金币 */
    gameHeavenReward.prototype.SendPost = function () {
        if (this.initData) {
            util_1.default.getdataStr({
                url: UrlConst_1.UrlConst.heavenCoin_receive,
                data: { id: this.initData.id },
                success: function () {
                    console.log("领取成功," + UrlConst_1.UrlConst.heavenCoin_receive);
                },
                fail: function () {
                    console.log("失败了," + UrlConst_1.UrlConst.heavenCoin_receive);
                }
            });
        }
    };
    gameHeavenReward.prototype.onEnable = function () {
        // AdController.loadInfoAd(AdPosition.HeavenCoinView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        // if (util.adPreObj[AdPosition.HeavenCoinView]) {
        //     util.preloadAd(AdPosition.HeavenCoinView, true);
        // }
    };
    gameHeavenReward.prototype.onDisable = function () {
        // AdController.hideInfoAd(AdPosition.HeavenCoinView);
        // //预加载金币信息流
        // if (!util.adPreObj[AdPosition.HeavenCoinView] && util.getHeavenPool() > 0) {
        //     util.preloadAd(AdPosition.HeavenCoinView, true);
        // }
    };
    __decorate([
        property({ type: cc.Label, displayName: "文字" })
    ], gameHeavenReward.prototype, "rewardLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameHeavenReward.prototype, "multipleNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数金币" })
    ], gameHeavenReward.prototype, "lable_addGold2", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "放弃领取" })
    ], gameHeavenReward.prototype, "closeBtnNode", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameHeavenReward.prototype, "feed_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "直接领取B" })
    ], gameHeavenReward.prototype, "get_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "直接领取A" })
    ], gameHeavenReward.prototype, "get_node2", void 0);
    gameHeavenReward = __decorate([
        ccclass
    ], gameHeavenReward);
    return gameHeavenReward;
}(baseTs_1.default));
exports.default = gameHeavenReward;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVIZWF2ZW5SZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBRXBDLDJDQUFpRDtBQUNqRCwyQ0FBc0M7QUFDdEMsK0NBQThDO0FBRTlDLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFNO0lBQXBEO1FBQUEscUVBeVFDO1FBdFFXLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBSTdCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRXJDLGlEQUFpRDtRQUNqRCxvQ0FBb0M7UUFHNUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFbEMsT0FBTztRQUNDLFVBQUksR0FBVyxJQUFJLENBQUM7UUFDNUIsTUFBTTtRQUNFLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFDakMsVUFBVTtRQUNGLGFBQU8sR0FBWSxLQUFLLENBQUM7UUFPekIsZ0JBQVUsR0FBRyxLQUFLLENBQUMsQ0FBSSxTQUFTOztRQWlPeEMsaUJBQWlCO0lBQ3JCLENBQUM7SUE5TkcsaUNBQU0sR0FBTjtRQUVJLHNDQUFzQztRQUN0QyxtREFBbUQ7UUFDbkQsYUFBYTtRQUpqQixpQkFvQkM7UUFkRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRWQsSUFBSSxjQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDMUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFD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SSxzREFBc0Q7UUFDdEQsYUFBYTtRQUNiLCtFQUErRTtRQUMvRSx1REFBdUQ7UUFDdkQsSUFBSTtJQUNSLENBQUM7SUFuUUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7eURBQ1g7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7MERBQ1Y7SUFJckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7NERBQ1Y7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7MERBQ1o7SUFNckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7dURBQ2Q7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUM7c0RBQ2pCO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDO3VEQUNoQjtJQXpCakIsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0F5UXBDO0lBQUQsdUJBQUM7Q0F6UUQsQUF5UUMsQ0F6UTZDLGdCQUFNLEdBeVFuRDtrQkF6UW9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZUhlYXZlblJld2FyZCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5paH5a2XXCIgfSlcbiAgICBwcml2YXRlIHJld2FyZExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLlgI3mlbBcIiB9KVxuICAgIHByaXZhdGUgbXVsdGlwbGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuWAjeaVsOmHkeW4gVwiIH0pXG4gICAgcHJpdmF0ZSBsYWJsZV9hZGRHb2xkMjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5pS+5byD6aKG5Y+WXCIgfSlcbiAgICBwcml2YXRlIGNsb3NlQnRuTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuinhumikWljb25cIn0pXG4gICAgLy8gcHJpdmF0ZSB2aWRlb0ljb246Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuebtOaOpemihuWPlkJcIiB9KVxuICAgIHByaXZhdGUgZ2V0X25vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi55u05o6l6aKG5Y+WQVwiIH0pXG4gICAgcHJpdmF0ZSBnZXRfbm9kZTI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLy/lpJrlsJHkuKrph5HluIFcbiAgICBwcml2YXRlIGNvaW46IG51bWJlciA9IG51bGw7XG4gICAgLy/liankvZnmrKHmlbBcbiAgICBwcml2YXRlIGhlYXZlbk51bTogbnVtYmVyID0gbnVsbDtcbiAgICAvL+aYr+WQpumcgOimgeeci+inhumikSBcbiAgICBwcml2YXRlIGlzVmlkZW86IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL1xuICAgIHByaXZhdGUgaW5pdERhdGE6IGFueTtcblxuICAgIHByaXZhdGUgaXRlbTogY2MuTm9kZTtcbiAgICBwcml2YXRlIG5vOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGlzQ2xpY2tHZXQgPSBmYWxzZTsgICAgLy/mmK/lkKbngrnlh7vkuobpooblj5ZcblxuICAgIHByaXZhdGUgaGVhdmVuSXRlbTogY2MuTm9kZTtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmxpZ2h0KS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyAgICAgY2MudHdlZW4oKS50bygxLHtzY2FsZToxfSkudG8oMSx7c2NhbGU6MS4xfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcblxuICAgICAgICAgICAgaWYgKHV0aWwuY2hlY2tUZXN0QihOYW1lVHMuaGVhdmVuX2NvaW5fdGVzdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldF9ub2RlMi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGdhbWVOdW1lcmljYWwuY2xvc2VUaW1lKTtcblxuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubXVsdGlwbGVOb2RlKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMywgeyBhbmdsZTogMTAgfSkudG8oLjIsIHsgYW5nbGU6IDAgfSlcbiAgICAgICAgKS5zdGFydCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICovXG4gICAgaW5pdChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RGF0YSA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgIHRoaXMuY29pbiA9IHRoaXMuaW5pdERhdGEucG9pbnQ7XG4gICAgICAgICAgICB0aGlzLnJld2FyZExhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5jb2luICsgXCLnuqLljIXluIFcIjtcblxuICAgICAgICAgICAgdGhpcy5sYWJsZV9hZGRHb2xkMi5zdHJpbmcgPSB0aGlzLmNvaW4gKiAxMCArIFwiXCI7XG5cbiAgICAgICAgICAgIHRoaXMuaGVhdmVuSXRlbSA9IGRhdGEuaXRlbSB8fCB0aGlzLm5vZGU7XG5cbiAgICAgICAgICAgIC8vIHRoaXMuaXNWaWRlbyA9IHV0aWwuaGVhdmVuQ2xpY2tOdW09PTM7XG5cbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaXNWaWRlbyl7XG5cbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgLy8gdGhpcy52aWRlb0ljb24uYWN0aXZlID0gdGhpcy5pc1ZpZGVvO1xuXG4gICAgICAgICAgICB0aGlzLmlzVmlkZW8gPSBkYXRhLmlzVmlkZW8gPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdldF9ub2RlLmFjdGl2ZSA9ICF0aGlzLmlzVmlkZW87XG4gICAgICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZS5nZXRQYXJlbnQoKS5hY3RpdmUgPSB0aGlzLmlzVmlkZW87XG5cblxuICAgICAgICB9XG4gICAgICAgIC8vIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uSGVhdmVuQ29pbl0pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5IZWF2ZW5Db2luKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBUcmFja01nci5haXJib3JuZV9nb2xkKHtcbiAgICAgICAgLy8gICAgIGFjdGl2aXR5X3N0YXRlOiBcIumHkeW4geWlluWKseW8ueeql1wiLFxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgIC8vICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuumZjemHkeW4gVwiXG4gICAgICAgIC8vIH0pXG5cbiAgICAgICAgaWYgKHV0aWwuY2hlY2tUZXN0QihOYW1lVHMuaGVhdmVuX2NvaW5fdGVzdCkpIHtcbiAgICAgICAgICAgIC8vIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAvLyAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnqbrmipXph5HluIFcIisodGhpcy5pc1ZpZGVvP1wiXCI6XCLkuI1cIikrXCLpnIDnnIvop4bpopHlvLnnqpfvvIhC55So5oi377yJXCJcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtID0gZGF0YS5pdGVtO1xuICAgICAgICB0aGlzLm5vID0gZGF0YS5ubztcbiAgICAgICAgdXRpbC5oZWF2ZW5Ub3VjaCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghdGhpcy5pbml0RGF0YS5pZCB8fCB0aGlzLmluaXREYXRhLmlkID09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLor6XnqbrpmY3ph5HluIHmsqHmnIlpZO+8jOe7meS6iOa2iOmZpFwiKTtcbiAgICAgICAgICAgIHV0aWwuc2F2ZUhlYXZlblBvb2wodGhpcy5ubywgbnVsbCk7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfSGVhdmVuX2tpbGxlZCwgdGhpcy5pdGVtKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPllxuICAgICAqL1xuICAgIGdldEJ0bihlLCByZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDbGlja0dldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNDbGlja0dldCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNDbGlja0dldCA9IGZhbHNlO1xuICAgICAgICB9LCAyKTtcblxuXG4gICAgICAgIGxldCBudW06IG51bWJlciA9IE51bWJlcihyZXMpO1xuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIGxldCBjb2luOiBudW1iZXIgPSB0aGlzLmNvaW4gKiAobnVtID09IDEgPyAxMCA6IDEpO1xuXG4gICAgICAgIGxldCBzdWNjZXNzRm4gPSAoKSA9PiB7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5oZWF2ZW5JdGVtLCB2YWx1ZTogY29pbiwgbnVtOiAxMCB9KTtcbiAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4oY29pbik7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgdXRpbC5oZWF2ZW5DbGlja051bSsrO1xuICAgICAgICAgICAgdXRpbC5zYXZlSGVhdmVuUG9vbCh0aGlzLm5vLCBudWxsKTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9IZWF2ZW5fa2lsbGVkLCB0aGlzLml0ZW0pO1xuICAgICAgICAgICAgdGhpcy5TZW5kUG9zdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlsLmNoZWNrVGVzdEIoTmFtZVRzLmhlYXZlbl9jb2luX3Rlc3QpKSB7XG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m65oqV6YeR5biBXCIgKyAobnVtID09IDEgPyBcIlwiIDogXCLkuI1cIikgKyBcIumcgOeci+inhumikeW8ueeql++8iELnlKjmiLfvvIlcIlxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9XG4gICAgICAgIGlmIChudW0gPT0gMSkge1xuICAgICAgICAgICAgLy8gQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLkhlYXZlbkNvaW4sICgpID0+IHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgICAgICAgICAvLyBUcmFja01nci5haXJib3JuZV9nb2xkKHtcbiAgICAgICAgICAgICAgICAvLyAgICAgYWN0aXZpdHlfc3RhdGU6IFwi54K55Ye744CM6KeG6aKRaWNvbumihuWPlumHkeW4geOAjeaMiemSrlwiLFxuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIC8vIGlmICh1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uSGVhdmVuQ29pbl0pIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5IZWF2ZW5Db2luKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHV0aWwuY2hlY2tUZXN0QihOYW1lVHMuaGVhdmVuX2NvaW5fdGVzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5leGlzdFZpZGVvQ29pbk51bS0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuumZjemHkeW4gVwiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLnv7vlgI3pooblj5ZcIixcbiAgICAgICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzogXCLmv4DlirHop4bpopFcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh1dGlsLmNoZWNrVGVzdEIoTmFtZVRzLmhlYXZlbl9jb2luX3Rlc3QpKSB7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m65oqV6YeR5biB6ZyA55yL6KeG6aKR5by556qX77yIQueUqOaIt++8iVwiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOiBcIua/gOWKseinhumikVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfZ29sZCh7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi54K55Ye744CM6aKG5Y+W6YeR5biB44CN5oyJ6ZKuXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnqbrpmY3ph5HluIFcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5pS25LiLXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh1dGlsLmNoZWNrVGVzdEIoTmFtZVRzLmhlYXZlbl9jb2luX3Rlc3QpKSB7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m65oqV6YeR5biB5LiN6ZyA55yL6KeG6aKR5by556qX77yIQueUqOaIt++8iVwiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi55u05o6l6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXrVxuICAgICAqL1xuICAgIGNsb3NlQnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfZ29sZCh7XG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLngrnlh7vjgIzmlL7lvIPlpZblirHjgI3mjInpkq5cIixcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5oZWF2ZW5fY29pbl90ZXN0KSkge1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnqbrmipXph5HluIHpnIDnnIvop4bpopHlvLnnqpfvvIhC55So5oi377yJXCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuWFs+mXrVwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5TZW5kUG9zdCgpO1xuXG4gICAgfVxuXG4gICAgLyoq5Y+R6YCB6YeR5biBICovXG4gICAgU2VuZFBvc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXREYXRhKSB7XG4gICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuaGVhdmVuQ29pbl9yZWNlaXZlLFxuICAgICAgICAgICAgICAgIGRhdGE6IHsgaWQ6IHRoaXMuaW5pdERhdGEuaWQgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6aKG5Y+W5oiQ5YqfLFwiICsgVXJsQ29uc3QuaGVhdmVuQ29pbl9yZWNlaXZlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWksei0peS6hixcIiArIFVybENvbnN0LmhlYXZlbkNvaW5fcmVjZWl2ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uSGVhdmVuQ29pblZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXG5cbiAgICAgICAgLy8gaWYgKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5IZWF2ZW5Db2luVmlld10pIHtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uSGVhdmVuQ29pblZpZXcsIHRydWUpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uSGVhdmVuQ29pblZpZXcpO1xuICAgICAgICAvLyAvL+mihOWKoOi9vemHkeW4geS/oeaBr+a1gVxuICAgICAgICAvLyBpZiAoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5IZWF2ZW5Db2luVmlld10gJiYgdXRpbC5nZXRIZWF2ZW5Qb29sKCkgPiAwKSB7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkhlYXZlbkNvaW5WaWV3LCB0cnVlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=