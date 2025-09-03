"use strict";
cc._RF.push(module, '7b077XHhedFDYlazoDAQKP+', 'gameGetOtherTurret');
// Script/pop/gameGetOtherTurret.ts

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
        // update (dt) {}
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
        // this.num = tool.GetRandom(3,8);
        this.num = 2;
        this.numLabel.string = "+" + this.num + "炮塔";
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
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.GetOtherTurret]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.GetOtherTurret);
        }
        this.ArrBtn[0].active = this.ArrBtn[1].active = true;
        this.ArrBtn[2].active = false;
        this.isVideo = false;
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "额外获得炮塔弹窗",
        });
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "空降炮塔弹窗",
        });
    };
    /**
     * 获取
     */
    gameGetOtherTurret.prototype.getBtn = function (e, res) {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        var isVideo = res == 1; //是否看视频
        if (isVideo) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.GetOtherTurret, function () {
                _this.isVideo = true;
                _this.successFn();
                util_1.default.preloadAd(AdPosition_1.AdPosition.GetOtherTurret);
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }
        else {
            this.successFn();
        }
    };
    /**获取宝塔 */
    gameGetOtherTurret.prototype.successFn = function () {
        var num = this.num * (this.isVideo ? 3 : 1);
        this.closePage();
        util_1.default.userData.airborneCount -= 1;
        // this.showPage(pageTs.pageName.GameGetTurret,{num,name:pageTs.pageName.GameGetOtherTurret}); 
        util_1.default.productTurret(num);
        cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: this.node, num: num });
        AssistCtr_1.AssistCtr.showToastTip("获得" + num + "个炮塔！");
        util_1.default.post({
            url: UrlConst_1.UrlConst.receiveAirborneBattery,
            success: function (res) {
                console.log("扣除成功");
            },
            fail: function () {
                console.log("扣除失败");
            }
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "空降炮塔弹窗",
            ck_module: this.isVideo ? "观看视频" : "立即领取"
        });
        if (this.isVideo) {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "额外获得炮塔弹窗",
                ck_module: "翻倍领取",
                active_ad_hcdg: "激励视频"
            });
        }
        else {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "额外获得炮塔弹窗",
                ck_module: "直接收下"
            });
        }
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
    gameGetOtherTurret.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.GetOtherTurretView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.GetOtherTurretView]){
        //     util.preloadAd(AdPosition.GetOtherTurretView,true);
        // } 
    };
    gameGetOtherTurret.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.GetOtherTurretView);
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