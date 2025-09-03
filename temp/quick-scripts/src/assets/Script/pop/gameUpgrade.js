"use strict";
cc._RF.push(module, '0f129YYDudCp4LM8j3tpPok', 'gameUpgrade');
// Script/pop/gameUpgrade.ts

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
var pageTs_1 = require("../common/pageTs");
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
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
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