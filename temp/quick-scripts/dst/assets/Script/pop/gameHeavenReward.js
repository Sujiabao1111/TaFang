
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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
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
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoin]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoin);
        }
        TrackMgr_1.default.airborne_gold({
            activity_state: "金币奖励弹窗",
        });
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "空降金币"
        });
        if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "空投金币" + (this.isVideo ? "" : "不") + "需看视频弹窗（B用户）"
            });
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
            AdController_1.default.loadAd(AdPosition_1.AdPosition.HeavenCoin, function () {
                successFn();
                TrackMgr_1.default.airborne_gold({
                    activity_state: "点击「视频icon领取金币」按钮",
                });
                if (util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoin]) {
                    util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoin);
                }
                if (util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
                    util_1.default.existVideoCoinNum--;
                }
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
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
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.HeavenCoinView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        if (util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoinView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoinView, true);
        }
    };
    gameHeavenReward.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.HeavenCoinView);
        //预加载金币信息流
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.HeavenCoinView] && util_1.default.getHeavenPool() > 0) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.HeavenCoinView, true);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVIZWF2ZW5SZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUNwQyxtREFBa0Q7QUFDbEQsMkNBQWlEO0FBQ2pELDJDQUFzQztBQUN0QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThDLG9DQUFNO0lBQXBEO1FBQUEscUVBMFFDO1FBdlFXLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBSTVCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRXBDLGlEQUFpRDtRQUNqRCxvQ0FBb0M7UUFHNUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBR3hCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFFakMsT0FBTztRQUNDLFVBQUksR0FBVSxJQUFJLENBQUM7UUFDM0IsTUFBTTtRQUNFLGVBQVMsR0FBVSxJQUFJLENBQUM7UUFDaEMsVUFBVTtRQUNGLGFBQU8sR0FBVyxLQUFLLENBQUM7UUFPeEIsZ0JBQVUsR0FBRyxLQUFLLENBQUMsQ0FBSSxTQUFTOztRQWtPeEMsaUJBQWlCO0lBQ3JCLENBQUM7SUEvTkcsaUNBQU0sR0FBTjtRQUVJLHNDQUFzQztRQUN0QyxtREFBbUQ7UUFDbkQsYUFBYTtRQUpqQixpQkFvQkM7UUFkRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRWQsSUFBRyxjQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBQztnQkFDeEMs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QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUM7eURBQ1A7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUM7MERBQ047SUFJcEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7NERBQ047SUFHdkM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7MERBQ1I7SUFNcEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLENBQUM7dURBQ1Y7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLENBQUM7c0RBQ2I7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLENBQUM7dURBQ1o7SUF6QmhCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBMFFwQztJQUFELHVCQUFDO0NBMVFELEFBMFFDLENBMVE2QyxnQkFBTSxHQTBRbkQ7a0JBMVFvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGdhbWVOdW1lcmljYWwgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lSGVhdmVuUmV3YXJkIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIuaWh+Wtl1wifSlcbiAgICBwcml2YXRlIHJld2FyZExhYmVsOmNjLkxhYmVsID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWAjeaVsFwifSlcbiAgICBwcml2YXRlIG11bHRpcGxlTm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIuWAjeaVsOmHkeW4gVwifSlcbiAgICBwcml2YXRlIGxhYmxlX2FkZEdvbGQyOmNjLkxhYmVsID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuaUvuW8g+mihuWPllwifSlcbiAgICBwcml2YXRlIGNsb3NlQnRuTm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuinhumikWljb25cIn0pXG4gICAgLy8gcHJpdmF0ZSB2aWRlb0ljb246Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLkv6Hmga/mtYFcIn0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuebtOaOpemihuWPlkJcIn0pXG4gICAgcHJpdmF0ZSBnZXRfbm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuebtOaOpemihuWPlkFcIn0pXG4gICAgcHJpdmF0ZSBnZXRfbm9kZTI6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICAvL+WkmuWwkeS4qumHkeW4gVxuICAgIHByaXZhdGUgY29pbjpudW1iZXIgPSBudWxsO1xuICAgIC8v5Ymp5L2Z5qyh5pWwXG4gICAgcHJpdmF0ZSBoZWF2ZW5OdW06bnVtYmVyID0gbnVsbDtcbiAgICAvL+aYr+WQpumcgOimgeeci+inhumikSBcbiAgICBwcml2YXRlIGlzVmlkZW86Ym9vbGVhbiA9IGZhbHNlO1xuICAgIC8vXG4gICAgcHJpdmF0ZSBpbml0RGF0YTphbnk7XG5cbiAgICBwcml2YXRlIGl0ZW06Y2MuTm9kZTtcbiAgICBwcml2YXRlIG5vOm51bWJlcjtcblxuICAgIHByaXZhdGUgaXNDbGlja0dldCA9IGZhbHNlOyAgICAvL+aYr+WQpueCueWHu+S6humihuWPllxuXG4gICAgcHJpdmF0ZSBoZWF2ZW5JdGVtOmNjLk5vZGU7XG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcblxuICAgICAgICAgICAgaWYodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5oZWF2ZW5fY29pbl90ZXN0KSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bk5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0X25vZGUyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxnYW1lTnVtZXJpY2FsLmNsb3NlVGltZSk7XG5cbiAgICAgICAgXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubXVsdGlwbGVOb2RlKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMyx7YW5nbGU6MTB9KS50byguMix7YW5nbGU6MH0pXG4gICAgICAgICkuc3RhcnQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxuICAgICAqL1xuICAgIGluaXQoZGF0YSl7XG4gICAgICAgIGlmKGRhdGEgJiYgZGF0YS5kYXRhKXtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICB0aGlzLmNvaW4gPSB0aGlzLmluaXREYXRhLnBvaW50O1xuICAgICAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSBcIitcIit0aGlzLmNvaW4rXCLnuqLljIXluIFcIjtcbiAgICBcbiAgICAgICAgICAgIHRoaXMubGFibGVfYWRkR29sZDIuc3RyaW5nID0gdGhpcy5jb2luKjEwK1wiXCI7XG5cbiAgICAgICAgICAgIHRoaXMuaGVhdmVuSXRlbSA9IGRhdGEuaXRlbXx8dGhpcy5ub2RlO1xuXG4gICAgICAgICAgICAvLyB0aGlzLmlzVmlkZW8gPSB1dGlsLmhlYXZlbkNsaWNrTnVtPT0zO1xuXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlzVmlkZW8pe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gfVxuICAgIFxuICAgICAgICAgICAgLy8gdGhpcy52aWRlb0ljb24uYWN0aXZlID0gdGhpcy5pc1ZpZGVvO1xuXG4gICAgICAgICAgICB0aGlzLmlzVmlkZW8gPSBkYXRhLmlzVmlkZW8/dHJ1ZTpmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0X25vZGUuYWN0aXZlID0gIXRoaXMuaXNWaWRlbztcbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG5Ob2RlLmdldFBhcmVudCgpLmFjdGl2ZSA9IHRoaXMuaXNWaWRlbztcblxuICAgICAgICAgICAgXG4gICAgICAgIH0gICAgXG4gICAgICAgIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uSGVhdmVuQ29pbl0pe1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5IZWF2ZW5Db2luKTtcbiAgICAgICAgfVxuICAgICAgICBUcmFja01nci5haXJib3JuZV9nb2xkKHtcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIumHkeW4geWlluWKseW8ueeql1wiLFxuICAgICAgICB9KVxuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuumZjemHkeW4gVwiXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5oZWF2ZW5fY29pbl90ZXN0KSl7XG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m65oqV6YeR5biBXCIrKHRoaXMuaXNWaWRlbz9cIlwiOlwi5LiNXCIpK1wi6ZyA55yL6KeG6aKR5by556qX77yIQueUqOaIt++8iVwiXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbSA9IGRhdGEuaXRlbTtcbiAgICAgICAgdGhpcy5ubyA9IGRhdGEubm87ICAgICBcbiAgICAgICAgdXRpbC5oZWF2ZW5Ub3VjaCA9IGZhbHNlOyAgXG5cbiAgICAgICAgaWYoIXRoaXMuaW5pdERhdGEuaWR8fHRoaXMuaW5pdERhdGEuaWQ9PVwiXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLor6XnqbrpmY3ph5HluIHmsqHmnIlpZO+8jOe7meS6iOa2iOmZpFwiKTtcbiAgICAgICAgICAgIHV0aWwuc2F2ZUhlYXZlblBvb2wodGhpcy5ubyxudWxsKTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9IZWF2ZW5fa2lsbGVkLHRoaXMuaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oZSxyZXMpe1xuICAgICAgICBpZih0aGlzLmlzQ2xpY2tHZXQpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNDbGlja0dldCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNDbGlja0dldCA9IGZhbHNlO1xuICAgICAgICB9LCAyKTtcblxuXG4gICAgICAgIGxldCBudW06bnVtYmVyID0gTnVtYmVyKHJlcyk7XG5cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgbGV0IGNvaW46bnVtYmVyID0gdGhpcy5jb2luKihudW09PTE/MTA6MSk7XG5cbiAgICAgICAgbGV0IHN1Y2Nlc3NGbiA9ICgpPT57XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4se25vZGU6dGhpcy5oZWF2ZW5JdGVtLHZhbHVlOmNvaW4sbnVtOjEwfSk7XG4gICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKGNvaW4pO1xuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgICAgIHV0aWwuaGVhdmVuQ2xpY2tOdW0rKztcbiAgICAgICAgICAgIHV0aWwuc2F2ZUhlYXZlblBvb2wodGhpcy5ubyxudWxsKTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9IZWF2ZW5fa2lsbGVkLHRoaXMuaXRlbSk7XG4gICAgICAgICAgICB0aGlzLlNlbmRQb3N0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5oZWF2ZW5fY29pbl90ZXN0KSl7XG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m65oqV6YeR5biBXCIrKG51bT09MT9cIlwiOlwi5LiNXCIpK1wi6ZyA55yL6KeG6aKR5by556qX77yIQueUqOaIt++8iVwiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXG4gICAgICAgIH0gXG4gICAgICAgIGlmKG51bT09MSl7XG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uSGVhdmVuQ29pbiwoKT0+e1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFpcmJvcm5lX2dvbGQoe1xuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLngrnlh7vjgIzop4bpopFpY29u6aKG5Y+W6YeR5biB44CN5oyJ6ZKuXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkhlYXZlbkNvaW5dKXtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5IZWF2ZW5Db2luKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5oZWF2ZW5fY29pbl90ZXN0KSl7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwuZXhpc3RWaWRlb0NvaW5OdW0tLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnqbrpmY3ph5HluIFcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLnv7vlgI3pooblj5ZcIixcbiAgICAgICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzpcIua/gOWKseinhumikVwiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5oZWF2ZW5fY29pbl90ZXN0KSl7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi56m65oqV6YeR5biB6ZyA55yL6KeG6aKR5by556qX77yIQueUqOaIt++8iVwiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLpooblj5ZcIixcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6XCLmv4DlirHop4bpopFcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfZ29sZCh7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi54K55Ye744CM6aKG5Y+W6YeR5biB44CN5oyJ6ZKuXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnqbrpmY3ph5HluIFcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLmlLbkuItcIixcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgIGlmKHV0aWwuY2hlY2tUZXN0QihOYW1lVHMuaGVhdmVuX2NvaW5fdGVzdCkpe1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuuaKlemHkeW4geS4jemcgOeci+inhumikeW8ueeql++8iELnlKjmiLfvvIlcIixcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOlwi55u05o6l6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6ZetXG4gICAgICovXG4gICAgY2xvc2VCdG4oKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIFRyYWNrTWdyLmFpcmJvcm5lX2dvbGQoe1xuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi54K55Ye744CM5pS+5byD5aWW5Yqx44CN5oyJ6ZKuXCIsXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5oZWF2ZW5fY29pbl90ZXN0KSl7XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuepuuaKlemHkeW4gemcgOeci+inhumikeW8ueeql++8iELnlKjmiLfvvIlcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLlhbPpl61cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuU2VuZFBvc3QoKTtcblxuICAgIH1cblxuICAgIC8qKuWPkemAgemHkeW4gSAqL1xuICAgIFNlbmRQb3N0KCl7XG4gICAgICAgIGlmKHRoaXMuaW5pdERhdGEpe1xuICAgICAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6VXJsQ29uc3QuaGVhdmVuQ29pbl9yZWNlaXZlLFxuICAgICAgICAgICAgICAgIGRhdGE6e2lkOnRoaXMuaW5pdERhdGEuaWR9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLpooblj5bmiJDlip8sXCIrVXJsQ29uc3QuaGVhdmVuQ29pbl9yZWNlaXZlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWksei0peS6hixcIitVcmxDb25zdC5oZWF2ZW5Db2luX3JlY2VpdmUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcbiAgICBvbkVuYWJsZSgpIHsgICBcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5IZWF2ZW5Db2luVmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICAgICAgXG4gICAgICAgIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5IZWF2ZW5Db2luVmlld10pe1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5IZWF2ZW5Db2luVmlldyx0cnVlKTtcbiAgICAgICAgfSBcbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5IZWF2ZW5Db2luVmlldyk7XG4gICAgICAgIC8v6aKE5Yqg6L296YeR5biB5L+h5oGv5rWBXG4gICAgICAgIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uSGVhdmVuQ29pblZpZXddJiZ1dGlsLmdldEhlYXZlblBvb2woKT4wKXtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uSGVhdmVuQ29pblZpZXcsdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19