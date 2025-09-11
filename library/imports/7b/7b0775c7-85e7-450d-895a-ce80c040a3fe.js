"use strict";
cc._RF.push(module, '7b077XHhedFDYlazoDAQKP+', 'gameGetOtherTurret');
// Script/pop/gameGetOtherTurret.ts

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
var LanguageData_1 = require("../Language/LanguageData");
var soundController_1 = require("../soundController");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameGetOtherTurret = /** @class */ (function (_super) {
    __extends(gameGetOtherTurret, _super);
    function gameGetOtherTurret() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.turretBody = null;
        _this.turretFoot = null;
        _this.multipleNode = null;
        _this.lable_addGold2 = null;
        _this.ArrBtn = [];
        _this.feed_node = null;
        /**金币 */
        _this.num = 0;
        _this.isVideo = false;
        return _this;
    }
    gameGetOtherTurret.prototype.onLoad = function () {
    };
    gameGetOtherTurret.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**初始化 */
    gameGetOtherTurret.prototype.init = function (data) {
        var _this = this;
        this.initData = util_1.default.GetTurretData(data);
        // this.num = Tools.GetRandom(3,8);
        this.num = 2;
        this.numLabel.string = "+" + this.num + LanguageData_1.t("main.炮塔");
        this.lable_addGold2.string = this.num * 3 + "";
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
        this.ArrBtn[0].active = this.ArrBtn[1].active = true;
        this.ArrBtn[2].active = false;
        this.isVideo = false;
    };
    /**
     * 获取
     */
    gameGetOtherTurret.prototype.getBtn = function (e, res) {
        soundController_1.default.singleton.clickAudio();
        this.isVideo = res == 1; //是否看视频
        this.successFn();
    };
    /**获取宝塔 */
    gameGetOtherTurret.prototype.successFn = function () {
        var num = this.num * (this.isVideo ? 3 : 1);
        this.closePage();
        util_1.default.userData.airborneCount -= 1;
        util_1.default.productTurret(num);
        cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: this.node, num: num });
        AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('main.Got_turrets', num));
    };
    /**看完视频 */
    gameGetOtherTurret.prototype.videoShow = function () {
        this.numLabel.string = "+" + this.num * (this.isVideo ? 3 : 1);
        this.ArrBtn[0].active = this.ArrBtn[1].active = false;
        this.ArrBtn[2].active = true;
    };
    /**
      * 加载图片
      */
    gameGetOtherTurret.prototype.loadSprite = function (name, call) {
        cc.resources.load(this.initData[name], cc.SpriteFrame, function (err, res) {
            if (err) {
                console.error("找不到该图片", err);
            }
            call(res);
        });
    };
    __decorate([
        property({ type: cc.Label, displayName: "数量" })
    ], gameGetOtherTurret.prototype, "numLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔身" })
    ], gameGetOtherTurret.prototype, "turretBody", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔脚" })
    ], gameGetOtherTurret.prototype, "turretFoot", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameGetOtherTurret.prototype, "multipleNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数金币" })
    ], gameGetOtherTurret.prototype, "lable_addGold2", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "按钮" })
    ], gameGetOtherTurret.prototype, "ArrBtn", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameGetOtherTurret.prototype, "feed_node", void 0);
    gameGetOtherTurret = __decorate([
        ccclass
    ], gameGetOtherTurret);
    return gameGetOtherTurret;
}(baseTs_1.default));
exports.default = gameGetOtherTurret;

cc._RF.pop();