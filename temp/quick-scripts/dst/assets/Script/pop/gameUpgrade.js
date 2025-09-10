
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameUpgrade.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0f129YYDudCp4LM8j3tpPok', 'gameUpgrade');
// Script/pop/gameUpgrade.ts

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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var LanguageData_1 = require("../Language/LanguageData");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameUpgrade = /** @class */ (function (_super) {
    __extends(gameUpgrade, _super);
    function gameUpgrade() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.turretNumLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.turretBody = null;
        _this.turretFoot = null;
        _this.levelLabel = null;
        _this.nameLabel = null;
        _this.arrBtn = [];
        // @property({type:cc.Node,displayName:"倍数"})
        // private multipleNode:cc.Node = null;
        _this.feed_node = null;
        _this.multipleNode = null;
        _this.lable_addGold2 = null;
        /**金币 */
        _this.coin = 1;
        /**原始数量 */
        _this.num = 5;
        return _this;
        // update (dt) {}
    }
    gameUpgrade.prototype.onLoad = function () {
    };
    gameUpgrade.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**初始化 */
    gameUpgrade.prototype.init = function (data) {
        var _this = this;
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "解锁新炮塔",
        });
        this.initData = util_1.default.GetTurretData(util_1.default.userData.turretLevel);
        if (this.initData.level == 2) {
            TrackMgr_1.default.rookie_process({
                activity_state: "首次解锁炮塔弹窗",
                synthesis_successful: true
            });
            if (util_1.default.checkTestB(NameTs_1.default.lock_turret_test)) {
                util_1.default.addTermCoin(2800);
                this.coin = 2800;
            }
            else {
                this.coin = util_1.default.GetBehaviorRewardVo(1);
            }
            this.turretNumLabel.string = "+" + this.coin + "红包币";
        }
        else {
            this.turretNumLabel.string = "+" + this.num + "炮塔";
        }
        console.log(this.coin, 'this.coin');
        //存合成次数和时间
        util_1.default.setStorage(util_1.default.localDiary.unlocking_time, util_1.default.userData.unlocking_time);
        this.levelLabel.string = "Lv." + this.initData.level;
        this.nameLabel.string = this.initData.name;
        this.loadSprite("body", function (res) {
            _this.turretBody && (_this.turretBody.spriteFrame = res);
        });
        this.loadSprite("foot", function (res) {
            if (_this.turretFoot && res) {
                _this.turretFoot.node.active = true;
                _this.turretFoot.spriteFrame = res;
            }
            else {
                _this.turretFoot.node.active = false;
            }
            if (Number(_this.initData.spriteFootY) > 0) {
                _this.turretFoot && (_this.turretFoot.node.y = Number(_this.initData.spriteFootY));
            }
        });
        util_1.default.sendTurretData();
        cc.game.emit(NameTs_1.default.Game_Buy_update);
        XMSDK_1.default.trackUserProperties({
            top_synthesis: util_1.default.userData.compoundTimes,
        });
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.UnlcokTurret]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.UnlcokTurret);
        }
        this.arrBtn[0].active = util_1.default.userData.noviceGuide == 2;
        this.arrBtn[1].active = this.arrBtn[2].active = util_1.default.userData.noviceGuide !== 2;
    };
    /**
     * 获取
     */
    gameUpgrade.prototype.getBtn = function (e, res) {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        if (util_1.default.userData.noviceGuide == 2) {
            if (!util_1.default.checkTestB(NameTs_1.default.new_hand_test)) {
                this.showPage(pageTs_1.default.pageName.GameGuide2, 3);
            }
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: this.node, value: this.coin, num: 5 });
            util_1.default.addTermCoin(this.coin);
            util_1.default.sendTurretData();
            this.closePage();
            return;
        }
        var successFn = function () {
            var num = _this.num * (res == 1 ? 2 : 1);
            cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: _this.node, num: num });
            util_1.default.productTurret(num);
            _this.closePage();
            // this.showPage(pageTs.pageName.GameGetTurret,{num,name:pageTs.pageName.GameUpgrade}); 
            if (res == 1) {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "解锁新炮塔",
                    ck_module: "多倍领取",
                    active_ad_hcdg: "激励视频"
                });
            }
            else {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "解锁新炮塔",
                    ck_module: "普通领取",
                });
            }
        };
        if (res == 1) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.UnlcokTurret, function () {
                util_1.default.preloadAd(AdPosition_1.AdPosition.UnlcokTurret);
                successFn();
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t("tips.reward_obtain_failed"));
            });
        }
        else {
            successFn();
        }
    };
    /**
      * 加载图片
      */
    gameUpgrade.prototype.loadSprite = function (name, call) {
        cc.resources.load(this.initData[name], cc.SpriteFrame, function (err, res) {
            if (err) {
                console.error("找不到该图片", err);
            }
            call(res);
        });
    };
    gameUpgrade.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.UnlcokTurretView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.UnlcokTurretView]){
        //     util.preloadAd(AdPosition.UnlcokTurretView,true);
        // }
    };
    gameUpgrade.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.UnlcokTurretView);
    };
    __decorate([
        property({ type: cc.Label, displayName: "炮塔数量" })
    ], gameUpgrade.prototype, "turretNumLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔身" })
    ], gameUpgrade.prototype, "turretBody", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔脚" })
    ], gameUpgrade.prototype, "turretFoot", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "等级" })
    ], gameUpgrade.prototype, "levelLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "名字" })
    ], gameUpgrade.prototype, "nameLabel", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "按钮" })
    ], gameUpgrade.prototype, "arrBtn", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameUpgrade.prototype, "feed_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameUpgrade.prototype, "multipleNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数金币" })
    ], gameUpgrade.prototype, "lable_addGold2", void 0);
    gameUpgrade = __decorate([
        ccclass
    ], gameUpgrade);
    return gameUpgrade;
}(baseTs_1.default));
exports.default = gameUpgrade;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVVcGdyYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBQ2xELDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMseURBQTZDO0FBQzdDLHNFQUFpRTtBQUNqRSxxREFBZ0Q7QUFDaEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQU07SUFBL0M7UUFBQSxxRUE4TUM7UUEzTVcsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFFeEMsNENBQTRDO1FBQzVDLGdDQUFnQztRQUd4QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUk3QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBSTNCLFlBQU0sR0FBYyxFQUFFLENBQUM7UUFFL0IsNkNBQTZDO1FBQzdDLHVDQUF1QztRQUcvQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBSTFCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR3hDLFFBQVE7UUFDQSxVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFVBQVU7UUFDRixTQUFHLEdBQVcsQ0FBQyxDQUFDOztRQW1LeEIsaUJBQWlCO0lBQ3JCLENBQUM7SUFoS0csNEJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCwyQkFBSyxHQUFMO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO1FBRWIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUNyQyxF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QUUsS0FBSyxFQUFFLENBQUM7bURBQ2I7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7bURBQ2I7SUFJckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7bURBQ1o7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7a0RBQ2I7SUFJbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOytDQUNsQjtJQU0vQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQztrREFDZDtJQUlsQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztxREFDVjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQzt1REFDVjtJQXBDdkIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQThNL0I7SUFBRCxrQkFBQztDQTlNRCxBQThNQyxDQTlNd0MsZ0JBQU0sR0E4TTlDO2tCQTlNb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVVcGdyYWRlIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLngq7loZTmlbDph49cIiB9KVxuICAgIHByaXZhdGUgdHVycmV0TnVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YWJXCJ9KVxuICAgIC8vIHByaXZhdGUgbGlnaHQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIGRpc3BsYXlOYW1lOiBcIueCruWhlOi6q1wiIH0pXG4gICAgcHJpdmF0ZSB0dXJyZXRCb2R5OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLngq7loZTohJpcIiB9KVxuICAgIHByaXZhdGUgdHVycmV0Rm9vdDogY2MuU3ByaXRlID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuetiee6p1wiIH0pXG4gICAgcHJpdmF0ZSBsZXZlbExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5ZCN5a2XXCIgfSlcbiAgICBwcml2YXRlIG5hbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTm9kZV0sIGRpc3BsYXlOYW1lOiBcIuaMiemSrlwiIH0pXG4gICAgcHJpdmF0ZSBhcnJCdG46IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlgI3mlbBcIn0pXG4gICAgLy8gcHJpdmF0ZSBtdWx0aXBsZU5vZGU6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5YCN5pWwXCIgfSlcbiAgICBwcml2YXRlIG11bHRpcGxlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5YCN5pWw6YeR5biBXCIgfSlcbiAgICBwcml2YXRlIGxhYmxlX2FkZEdvbGQyOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIC8qKumHkeW4gSAqL1xuICAgIHByaXZhdGUgY29pbjogbnVtYmVyID0gMTtcbiAgICAvKirljp/lp4vmlbDph48gKi9cbiAgICBwcml2YXRlIG51bTogbnVtYmVyID0gNTtcblxuICAgIHByaXZhdGUgaW5pdERhdGE6IGFueTtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG5cbiAgICAgICAgY2MudHdlZW4odGhpcy5tdWx0aXBsZU5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLCB7IGFuZ2xlOiAxMCB9KS50byguMiwgeyBhbmdsZTogMCB9KVxuICAgICAgICApLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyWICovXG4gICAgaW5pdChkYXRhKSB7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6Kej6ZSB5paw54Ku5aGUXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSB1dGlsLkdldFR1cnJldERhdGEodXRpbC51c2VyRGF0YS50dXJyZXRMZXZlbCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdERhdGEubGV2ZWwgPT0gMikge1xuICAgICAgICAgICAgVHJhY2tNZ3Iucm9va2llX3Byb2Nlc3Moe1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIummluasoeino+mUgeeCruWhlOW8ueeql1wiLFxuICAgICAgICAgICAgICAgIHN5bnRoZXNpc19zdWNjZXNzZnVsOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh1dGlsLmNoZWNrVGVzdEIoTmFtZVRzLmxvY2tfdHVycmV0X3Rlc3QpKSB7XG4gICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbigyODAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW4gPSAyODAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW4gPSB1dGlsLkdldEJlaGF2aW9yUmV3YXJkVm8oMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnR1cnJldE51bUxhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5jb2luICsgXCLnuqLljIXluIFcIjtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy50dXJyZXROdW1MYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMubnVtICsgXCLngq7loZRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29pbiwgJ3RoaXMuY29pbicpXG5cblxuXG4gICAgICAgIC8v5a2Y5ZCI5oiQ5qyh5pWw5ZKM5pe26Ze0XG4gICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkudW5sb2NraW5nX3RpbWUsIHV0aWwudXNlckRhdGEudW5sb2NraW5nX3RpbWUpO1xuXG5cbiAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IFwiTHYuXCIgKyB0aGlzLmluaXREYXRhLmxldmVsO1xuICAgICAgICB0aGlzLm5hbWVMYWJlbC5zdHJpbmcgPSB0aGlzLmluaXREYXRhLm5hbWU7XG5cbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKFwiYm9keVwiLCAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnR1cnJldEJvZHkgJiYgKHRoaXMudHVycmV0Qm9keS5zcHJpdGVGcmFtZSA9IHJlcyk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZShcImZvb3RcIiwgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudHVycmV0Rm9vdCAmJiByZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Qubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5zcHJpdGVGcmFtZSA9IHJlc1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5pbml0RGF0YS5zcHJpdGVGb290WSkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290ICYmICh0aGlzLnR1cnJldEZvb3Qubm9kZS55ID0gTnVtYmVyKHRoaXMuaW5pdERhdGEuc3ByaXRlRm9vdFkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB1dGlsLnNlbmRUdXJyZXREYXRhKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9CdXlfdXBkYXRlKTtcblxuICAgICAgICBYTVNESy50cmFja1VzZXJQcm9wZXJ0aWVzKHtcbiAgICAgICAgICAgIHRvcF9zeW50aGVzaXM6IHV0aWwudXNlckRhdGEuY29tcG91bmRUaW1lcyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVW5sY29rVHVycmV0XSkge1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5Vbmxjb2tUdXJyZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcnJCdG5bMF0uYWN0aXZlID0gdXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9PSAyO1xuICAgICAgICB0aGlzLmFyckJ0blsxXS5hY3RpdmUgPSB0aGlzLmFyckJ0blsyXS5hY3RpdmUgPSB1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlICE9PSAyO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oZSwgcmVzKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBpZiAodXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9PSAyKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWwuY2hlY2tUZXN0QihOYW1lVHMubmV3X2hhbmRfdGVzdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lR3VpZGUyLCAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLm5vZGUsIHZhbHVlOiB0aGlzLmNvaW4sIG51bTogNSB9KTtcbiAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4odGhpcy5jb2luKTtcbiAgICAgICAgICAgIHV0aWwuc2VuZFR1cnJldERhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3VjY2Vzc0ZuID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG51bTogbnVtYmVyID0gdGhpcy5udW0gKiAocmVzID09IDEgPyAyIDogMSk7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X3R1cnJldCwgeyBub2RlOiB0aGlzLm5vZGUsIG51bSB9KTtcbiAgICAgICAgICAgIHV0aWwucHJvZHVjdFR1cnJldChudW0pO1xuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHZXRUdXJyZXQse251bSxuYW1lOnBhZ2VUcy5wYWdlTmFtZS5HYW1lVXBncmFkZX0pOyBcblxuICAgICAgICAgICAgaWYgKHJlcyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6Kej6ZSB5paw54Ku5aGUXCIsXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLlpJrlgI3pooblj5ZcIixcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6IFwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuino+mUgeaWsOeCruWhlFwiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5pmu6YCa6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzID09IDEpIHtcbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5Vbmxjb2tUdXJyZXQsICgpID0+IHtcbiAgICAgICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlVubGNva1R1cnJldCk7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc0ZuKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KFwidGlwcy5yZXdhcmRfb2J0YWluX2ZhaWxlZFwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgICog5Yqg6L295Zu+54mHXG4gICAgICAqL1xuICAgIGxvYWRTcHJpdGUobmFtZTogc3RyaW5nLCBjYWxsOiBGdW5jdGlvbikge1xuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh0aGlzLmluaXREYXRhW25hbWVdLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaJvuS4jeWIsOivpeWbvueJh1wiLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbChyZXMpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5Vbmxjb2tUdXJyZXRWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuICAgICAgICAvLyBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVW5sY29rVHVycmV0Vmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5Vbmxjb2tUdXJyZXRWaWV3LHRydWUpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uVW5sY29rVHVycmV0Vmlldyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=