"use strict";
cc._RF.push(module, 'fbbb2nsft5NE7ERfVSvEzxD', 'gameGetVideoTurret');
// Script/pop/gameGetVideoTurret.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var LanguageData_1 = require("../Language/LanguageData");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameGetVideoTurret = /** @class */ (function (_super) {
    __extends(gameGetVideoTurret, _super);
    function gameGetVideoTurret() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.turretBody = null;
        _this.turretFoot = null;
        _this.closeBtnNode = null;
        _this.feed_node = null;
        /**金币 */
        _this.num = 0;
        return _this;
    }
    gameGetVideoTurret.prototype.onLoad = function () {
    };
    gameGetVideoTurret.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        var _this = this;
        this.scheduleOnce(function () {
            _this.closeBtnNode.active = true;
        }, faceTs_1.gameNumerical.closeTime);
    };
    /**初始化 */
    gameGetVideoTurret.prototype.init = function (data) {
        var _this = this;
        var level = util_1.default.getBuyRandomLevel();
        this.initData = util_1.default.GetTurretData(level);
        this.num = data.num || Tools_1.Tools.GetRandom(8, 12);
        this.numLabel.string = "+" + this.num + LanguageData_1.t("main.炮塔");
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
    };
    /**
     * 获取
     */
    gameGetVideoTurret.prototype.getBtn = function () {
        soundController_1.default.singleton.clickAudio();
        // TrackMgr.AppDialogClick_hcdg({
        //     dialog_name_hcdg: "看视频领取炮塔弹窗",
        //     ck_module:"领取",
        //     active_ad_hcdg:"激励视频"
        // });
        // util.sendTurretNum();
        util_1.default.productTurret(this.num);
        cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: this.node, num: this.num });
        AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('main.Got_turrets', this.num));
        this.closePage();
        util_1.default.userData.GetTurretNum -= 1;
        util_1.default.setStorage(util_1.default.localDiary.GetTurretNum, util_1.default.userData.GetTurretNum);
        // }, () => {
        //     AssistCtr.showToastTip("加载视频失败，请稍后！");
        // });
    };
    /**关闭close */
    gameGetVideoTurret.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "看视频领取炮塔弹窗",
            ck_module: "关闭",
        });
    };
    /**
      * 加载图片
      */
    gameGetVideoTurret.prototype.loadSprite = function (name, call) {
        cc.resources.load(this.initData[name], cc.SpriteFrame, function (err, res) {
            if (err) {
                console.error("找不到该图片", err);
            }
            call(res);
        });
    };
    __decorate([
        property({ type: cc.Label, displayName: "数量" })
    ], gameGetVideoTurret.prototype, "numLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔身" })
    ], gameGetVideoTurret.prototype, "turretBody", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔脚" })
    ], gameGetVideoTurret.prototype, "turretFoot", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "关闭" })
    ], gameGetVideoTurret.prototype, "closeBtnNode", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameGetVideoTurret.prototype, "feed_node", void 0);
    gameGetVideoTurret = __decorate([
        ccclass
    ], gameGetVideoTurret);
    return gameGetVideoTurret;
}(baseTs_1.default));
exports.default = gameGetVideoTurret;

cc._RF.pop();