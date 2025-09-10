
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameGetVideoTurret.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var LanguageData_1 = require("../Language/LanguageData");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
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
        // update (dt) {}
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
        this.numLabel.string = "+" + this.num + "炮塔";
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
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.GetTurret]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.GetTurret);
        }
        // util.preloadAd(AdPosition.GetTurretView);
        // util.preloadAd(AdPosition.GetTurret);
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "看视频领取炮塔弹窗"
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
        // AdController.loadAd(AdPosition.GetTurret, (res) => {
        if (util_1.default.adPreObj[AdPosition_1.AdPosition.GetTurret]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.GetTurret);
        }
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
    gameGetVideoTurret.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.GetTurretView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.GetTurretView]){
        //     util.preloadAd(AdPosition.GetTurretView,true);
        // } 
    };
    gameGetVideoTurret.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.GetTurretView);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHZXRWaWRlb1R1cnJldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBNkQ7QUFDN0QsMkNBQXNDO0FBRXRDLHlEQUE2QztBQUM3QyxzRUFBaUU7QUFDakUsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1Qyx1Q0FBc0M7QUFDdEMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWdELHNDQUFNO0lBQXREO1FBQUEscUVBcUpDO1FBbEpXLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFFbEMsNENBQTRDO1FBQzVDLGdDQUFnQztRQUd4QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRWxDLFFBQVE7UUFDQSxTQUFHLEdBQVcsQ0FBQyxDQUFDOztRQStIeEIsaUJBQWlCO0lBQ3JCLENBQUM7SUE1SEcsbUNBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCxrQ0FBSyxHQUFMO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO1FBSmpCLGlCQVlDO1FBTEcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUVkLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVwQyxDQUFDLEVBQUUsc0JBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsU0FBUztJQUNULGlDQUFJLEdBQUosVUFBSyxJQUFJO1FBQVQsaUJBaUNDO1FBL0JHLElBQUksS0FBSyxHQUFXLGNBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBRTdDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRztZQUN4QixLQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUc7WUFDeEIsSUFBSSxLQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtnQkFDeEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFBO2FBQ3BDO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDdkM7WUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdkMsS0FBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQ25GO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsY0FBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RDLGNBQUksQ0FBQyxTQUFTLENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN4QztRQUVELDRDQUE0QztRQUM1Qyx3Q0FBd0M7UUFFeEMsa0JBQVEsQ0FBQyx3QkFBd0IsQ0FBQztZQUM5QixnQkFBZ0IsRUFBRSxXQUFXO1NBQ2hDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHRDs7T0FFRztJQUNILG1DQUFNLEdBQU47UUFDSSx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV2QyxpQ0FBaUM7UUFDakMscUNBQXFDO1FBQ3JDLHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsTUFBTTtRQUVOLHVEQUF1RDtRQUN2RCxJQUFJLGNBQUksQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxjQUFJLENBQUMsU0FBUyxDQUFDLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEM7UUFDRCx3QkFBd0I7UUFDeEIsY0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUU1RSxxQkFBUyxDQUFDLFlBQVksQ0FBQyxnQkFBQyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBR3hELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixjQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7UUFFaEMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxjQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxjQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFFLGFBQWE7UUFDYiw2Q0FBNkM7UUFDN0MsTUFBTTtJQUVWLENBQUM7SUFFRCxhQUFhO0lBQ2IscUNBQVEsR0FBUjtRQUNJLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixrQkFBUSxDQUFDLG1CQUFtQixDQUFDO1lBQ3pCLGdCQUFnQixFQUFFLFdBQVc7WUFDN0IsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdEOztRQUVJO0lBQ0osdUNBQVUsR0FBVixVQUFXLElBQVksRUFBRSxJQUFjO1FBQ25DLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFtQjtZQUM1RSxJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNoQztZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELHFDQUFRLEdBQVI7UUFDSSxzQkFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsd0JBQXdCO1FBQy9GLCtDQUErQztRQUMvQyxxREFBcUQ7UUFDckQsS0FBSztJQUNULENBQUM7SUFHRCxzQ0FBUyxHQUFUO1FBQ0ksc0JBQVksQ0FBQyxVQUFVLENBQUMsdUJBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBaEpEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO3dEQUNkO0lBTWxDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDOzBEQUNiO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDOzBEQUNiO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOzREQUNWO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO3lEQUNkO0lBbEJqQixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQXFKdEM7SUFBRCx5QkFBQztDQXJKRCxBQXFKQyxDQXJKK0MsZ0JBQU0sR0FxSnJEO2tCQXJKb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBnYW1lTnVtZXJpY2FsLCB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uL3V0aWwvVG9vbHNcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVHZXRWaWRlb1R1cnJldCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5pWw6YePXCIgfSlcbiAgICBwcml2YXRlIG51bUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLngq7loZTouqtcIiB9KVxuICAgIHByaXZhdGUgdHVycmV0Qm9keTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZSwgZGlzcGxheU5hbWU6IFwi54Ku5aGU6ISaXCIgfSlcbiAgICBwcml2YXRlIHR1cnJldEZvb3Q6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLlhbPpl61cIiB9KVxuICAgIHByaXZhdGUgY2xvc2VCdG5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuS/oeaBr+a1gVwiIH0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLyoq6YeR5biBICovXG4gICAgcHJpdmF0ZSBudW06IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGluaXREYXRhOiBhbnk7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmxpZ2h0KS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyAgICAgY2MudHdlZW4oKS50bygxLHtzY2FsZToxfSkudG8oMSx7c2NhbGU6MS4xfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuXG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIH0sIGdhbWVOdW1lcmljYWwuY2xvc2VUaW1lKTtcbiAgICB9XG5cbiAgICAvKirliJ3lp4vljJYgKi9cbiAgICBpbml0KGRhdGEpIHtcblxuICAgICAgICBsZXQgbGV2ZWw6IG51bWJlciA9IHV0aWwuZ2V0QnV5UmFuZG9tTGV2ZWwoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhID0gdXRpbC5HZXRUdXJyZXREYXRhKGxldmVsKTtcbiAgICAgICAgdGhpcy5udW0gPSBkYXRhLm51bSB8fCBUb29scy5HZXRSYW5kb20oOCwgMTIpO1xuICAgICAgICB0aGlzLm51bUxhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5udW0gKyBcIueCruWhlFwiO1xuXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZShcImJvZHlcIiwgKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy50dXJyZXRCb2R5ICYmICh0aGlzLnR1cnJldEJvZHkuc3ByaXRlRnJhbWUgPSByZXMpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJmb290XCIsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR1cnJldEZvb3QgJiYgcmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Quc3ByaXRlRnJhbWUgPSByZXNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMuaW5pdERhdGEuc3ByaXRlRm9vdFkpID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdCAmJiAodGhpcy50dXJyZXRGb290Lm5vZGUueSA9IE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uR2V0VHVycmV0XSkge1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXRWaWV3KTtcbiAgICAgICAgLy8gdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXQpO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIueci+inhumikemihuWPlueCruWhlOW8ueeql1wiXG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIC8vIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAvLyAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnnIvop4bpopHpooblj5bngq7loZTlvLnnqpdcIixcbiAgICAgICAgLy8gICAgIGNrX21vZHVsZTpcIumihuWPllwiLFxuICAgICAgICAvLyAgICAgYWN0aXZlX2FkX2hjZGc6XCLmv4DlirHop4bpopFcIlxuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uR2V0VHVycmV0LCAocmVzKSA9PiB7XG4gICAgICAgIGlmICh1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uR2V0VHVycmV0XSkge1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHV0aWwuc2VuZFR1cnJldE51bSgpO1xuICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQodGhpcy5udW0pO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X3R1cnJldCwgeyBub2RlOiB0aGlzLm5vZGUsIG51bTogdGhpcy5udW0gfSk7XG5cbiAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KCdtYWluLkdvdF90dXJyZXRzJywgdGhpcy5udW0pKTtcblxuXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0gLT0gMTtcblxuICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LkdldFR1cnJldE51bSwgdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0pO1xuICAgICAgICAvLyB9LCAoKSA9PiB7XG4gICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAvLyB9KTtcblxuICAgIH1cblxuICAgIC8qKuWFs+mXrWNsb3NlICovXG4gICAgY2xvc2VCdG4oKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi55yL6KeG6aKR6aKG5Y+W54Ku5aGU5by556qXXCIsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5YWz6ZetXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICAqIOWKoOi9veWbvueJh1xuICAgICAgKi9cbiAgICBsb2FkU3ByaXRlKG5hbWU6IHN0cmluZywgY2FsbDogRnVuY3Rpb24pIHtcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodGhpcy5pbml0RGF0YVtuYW1lXSwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHJlczogY2MuU3ByaXRlRnJhbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5om+5LiN5Yiw6K+l5Zu+54mHXCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsKHJlcyk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLkdldFR1cnJldFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXG4gICAgICAgIC8vIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5HZXRUdXJyZXRWaWV3XSl7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdldFR1cnJldFZpZXcsdHJ1ZSk7XG4gICAgICAgIC8vIH0gXG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uR2V0VHVycmV0Vmlldyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=