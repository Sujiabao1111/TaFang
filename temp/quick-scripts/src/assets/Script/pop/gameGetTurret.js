"use strict";
cc._RF.push(module, 'df8b8p/iAdBSYY0bCdsLEsz', 'gameGetTurret');
// Script/pop/gameGetTurret.ts

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
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameGetTurret = /** @class */ (function (_super) {
    __extends(gameGetTurret, _super);
    function gameGetTurret() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.turretBody = null;
        _this.turretFoot = null;
        _this.feed_node = null;
        /**金币 */
        _this.num = 0;
        _this.dataName = null;
        return _this;
        // update (dt) {}
    }
    gameGetTurret.prototype.onLoad = function () {
    };
    gameGetTurret.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
    };
    /**初始化 */
    gameGetTurret.prototype.init = function (data) {
        var _this = this;
        var level = data.level || util_1.default.getBuyRandomLevel();
        this.initData = util_1.default.GetTurretData(level);
        this.num = data.num;
        this.numLabel.string = "+" + this.num;
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
        this.dataName = data.name;
        if (this.dataName) {
            if (this.dataName == pageTs_1.default.pageName.GameUpgrade) {
                TrackMgr_1.default.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "获得炮塔弹窗（解锁新炮塔）",
                });
            }
            else {
                TrackMgr_1.default.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "获得炮塔弹窗（额外获得炮塔）",
                });
            }
        }
        // util.preloadAd(AdPosition.GetTurretView);
        // util.preloadAd(AdPosition.GetTurret);
    };
    /**
     * 获取
     */
    gameGetTurret.prototype.getBtn = function () {
        soundController_1.default.singleton.clickAudio();
        util_1.default.productTurret(this.num);
        cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: this.node, num: this.num });
        AssistCtr_1.AssistCtr.showToastTip("获得" + this.num + "个炮塔！");
        this.closePage();
        if (this.dataName) {
            if (this.dataName == pageTs_1.default.pageName.GameUpgrade) {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "获得炮塔弹窗（解锁新炮塔）",
                    ck_module: "收下"
                });
            }
            else {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "获得炮塔弹窗（额外获得炮塔）",
                    ck_module: "收下"
                });
            }
        }
        else {
            util_1.default.userData.GetTurretNum -= 1;
            util_1.default.setStorage(util_1.default.localDiary.GetTurretNum, util_1.default.userData.GetTurretNum);
        }
    };
    /**
      * 加载图片
      */
    gameGetTurret.prototype.loadSprite = function (name, call) {
        cc.resources.load(this.initData[name], cc.SpriteFrame, function (err, res) {
            if (err) {
                console.error("找不到该图片", err);
                return;
            }
            call(res);
        });
    };
    gameGetTurret.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.GetTurretView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.GetTurretView]){
        //     util.preloadAd(AdPosition.GetTurretView,true);
        // } 
    };
    gameGetTurret.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.GetTurretView);
    };
    __decorate([
        property({ type: cc.Label, displayName: "数量" })
    ], gameGetTurret.prototype, "numLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔身" })
    ], gameGetTurret.prototype, "turretBody", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔脚" })
    ], gameGetTurret.prototype, "turretFoot", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameGetTurret.prototype, "feed_node", void 0);
    gameGetTurret = __decorate([
        ccclass
    ], gameGetTurret);
    return gameGetTurret;
}(baseTs_1.default));
exports.default = gameGetTurret;

cc._RF.pop();