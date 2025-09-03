
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVVcGdyYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBQ2xELDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsc0VBQWlFO0FBQ2pFLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQThNQztRQTNNVyxvQkFBYyxHQUFZLElBQUksQ0FBQztRQUV2Qyw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBR3hCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBSTVCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFJMUIsWUFBTSxHQUFhLEVBQUUsQ0FBQztRQUU5Qiw2Q0FBNkM7UUFDN0MsdUNBQXVDO1FBRy9CLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFJekIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHNUIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFHdkMsUUFBUTtRQUNBLFVBQUksR0FBVSxDQUFDLENBQUM7UUFDeEIsVUFBVTtRQUNGLFNBQUcsR0FBVSxDQUFDLENBQUM7O1FBbUt2QixpQkFBaUI7SUFDckIsQ0FBQztJQWhLRyw0QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFFSSxzQ0FBc0M7UUFDdEMsbURBQW1EO1FBQ25ELGFBQWE7UUFFYixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQ3JDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUNoRCxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELFNBQVM7SUFDVCwwQkFBSSxHQUFKLFVBQUssSUFBSTtRQUFULGlCQWlFQztRQS9ERyxrQkFBUSxDQUFDLHdCQUF3QixDQUFDO1lBQzlCLGdCQUFnQixFQUFFLE9BQU87U0FDNUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFJLENBQUMsYUFBYSxDQUFDLGNBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFOUQsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBRSxDQUFDLEVBQUM7WUFDdEIsa0JBQVEsQ0FBQyxjQUFjLENBQUM7Z0JBQ3BCLGNBQWMsRUFBRSxVQUFVO2dCQUMxQixvQkFBb0IsRUFBQyxJQUFJO2FBQzVCLENBQUMsQ0FBQztZQUNILElBQUcsY0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7Z0JBQ3hDLGNBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ3BCO2lCQUFJO2dCQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDO1NBQ3JEO2FBQUk7WUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUM7U0FDbkQ7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsV0FBVyxDQUFDLENBQUE7UUFJbEMsVUFBVTtRQUNWLGNBQUksQ0FBQyxVQUFVLENBQUMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUMsY0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUc3RSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsVUFBQyxHQUFHO1lBQ3ZCLEtBQUksQ0FBQyxVQUFVLElBQUUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLFVBQUMsR0FBRztZQUN2QixJQUFHLEtBQUksQ0FBQyxVQUFVLElBQUUsR0FBRyxFQUFDO2dCQUNwQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUE7YUFDcEM7aUJBQUk7Z0JBQ0QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN2QztZQUNELElBQUcsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUMsQ0FBQyxFQUFDO2dCQUMvQixLQUFJLENBQUMsVUFBVSxJQUFFLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDckY7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUVGLGNBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXJDLGVBQUssQ0FBQyxtQkFBbUIsQ0FBQztZQUN0QixhQUFhLEVBQUUsY0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO1NBQzdDLENBQUMsQ0FBQztRQUVILElBQUcsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsWUFBWSxDQUFDLEVBQUM7WUFDdkMsY0FBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFJLGNBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFHLENBQUMsQ0FBQztJQUVuRixDQUFDO0lBR0Q7O09BRUc7SUFDSCw0QkFBTSxHQUFOLFVBQU8sQ0FBQyxFQUFDLEdBQUc7UUFBWixpQkE4Q0M7UUE3Q0cseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsSUFBRyxjQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBRSxDQUFDLEVBQUM7WUFDNUIsSUFBRyxDQUFDLGNBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsRUFBQztnQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0M7WUFDRCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDN0UsY0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsY0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLFNBQVMsR0FBRztZQUNaLElBQUksR0FBRyxHQUFVLEtBQUksQ0FBQyxHQUFHLEdBQUMsQ0FBQyxHQUFHLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsa0JBQWtCLEVBQUMsRUFBQyxJQUFJLEVBQUMsS0FBSSxDQUFDLElBQUksRUFBQyxHQUFHLEtBQUEsRUFBQyxDQUFDLENBQUM7WUFDN0QsY0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsd0ZBQXdGO1lBRXhGLElBQUcsR0FBRyxJQUFJLENBQUMsRUFBQztnQkFDUixrQkFBUSxDQUFDLG1CQUFtQixDQUFDO29CQUN6QixnQkFBZ0IsRUFBRSxPQUFPO29CQUN6QixTQUFTLEVBQUMsTUFBTTtvQkFDaEIsY0FBYyxFQUFDLE1BQU07aUJBQ3hCLENBQUMsQ0FBQzthQUNOO2lCQUNHO2dCQUNBLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7b0JBQ3pCLGdCQUFnQixFQUFFLE9BQU87b0JBQ3pCLFNBQVMsRUFBQyxNQUFNO2lCQUNuQixDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQTtRQUVELElBQUcsR0FBRyxJQUFFLENBQUMsRUFBQztZQUNOLHNCQUFZLENBQUMsTUFBTSxDQUFDLHVCQUFVLENBQUMsWUFBWSxFQUFDO2dCQUN4QyxjQUFJLENBQUMsU0FBUyxDQUFDLHVCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3hDLFNBQVMsRUFBRSxDQUFDO1lBQ2hCLENBQUMsRUFBRTtnQkFDQyxxQkFBUyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQUk7WUFDRCxTQUFTLEVBQUUsQ0FBQztTQUNmO0lBRUwsQ0FBQztJQUVGOztRQUVJO0lBQ0gsZ0NBQVUsR0FBVixVQUFXLElBQVcsRUFBQyxJQUFhO1FBQ2hDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxDQUFDLFdBQVcsRUFBQyxVQUFDLEdBQUcsRUFBQyxHQUFrQjtZQUV4RSxJQUFHLEdBQUcsRUFBQztnQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQzthQUMvQjtZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDhCQUFRLEdBQVI7UUFDSSxzQkFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSx3QkFBd0I7UUFDbEcsa0RBQWtEO1FBQ2xELHdEQUF3RDtRQUN4RCxJQUFJO0lBQ1IsQ0FBQztJQUdELCtCQUFTLEdBQVQ7UUFDSSxzQkFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQXpNRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQzt1REFDTjtJQU12QztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQzttREFDVDtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQzttREFDVDtJQUlwQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQzttREFDUjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQztrREFDVDtJQUlsQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUM7K0NBQ2Q7SUFNOUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLENBQUM7a0RBQ1Y7SUFJakM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUM7cURBQ047SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7dURBQ047SUFwQ3RCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0E4TS9CO0lBQUQsa0JBQUM7Q0E5TUQsQUE4TUMsQ0E5TXdDLGdCQUFNLEdBOE05QztrQkE5TW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lVXBncmFkZSBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLngq7loZTmlbDph49cIn0pXG4gICAgcHJpdmF0ZSB0dXJyZXROdW1MYWJlbDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSxkaXNwbGF5TmFtZTpcIueCruWhlOi6q1wifSlcbiAgICBwcml2YXRlIHR1cnJldEJvZHk6Y2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsZGlzcGxheU5hbWU6XCLngq7loZTohJpcIn0pXG4gICAgcHJpdmF0ZSB0dXJyZXRGb290OmNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLnrYnnuqdcIn0pXG4gICAgcHJpdmF0ZSBsZXZlbExhYmVsOmNjLkxhYmVsID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLlkI3lrZdcIn0pXG4gICAgcHJpdmF0ZSBuYW1lTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuICAgIFxuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbY2MuTm9kZV0sZGlzcGxheU5hbWU6XCLmjInpkq5cIn0pXG4gICAgcHJpdmF0ZSBhcnJCdG46Y2MuTm9kZVtdID0gW107XG4gICAgXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlgI3mlbBcIn0pXG4gICAgLy8gcHJpdmF0ZSBtdWx0aXBsZU5vZGU6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuS/oeaBr+a1gVwifSlcbiAgICBwcml2YXRlIGZlZWRfbm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWAjeaVsFwifSlcbiAgICBwcml2YXRlIG11bHRpcGxlTm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLlgI3mlbDph5HluIFcIn0pXG4gICAgcHJpdmF0ZSBsYWJsZV9hZGRHb2xkMjpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBcbiAgICAvKirph5HluIEgKi9cbiAgICBwcml2YXRlIGNvaW46bnVtYmVyID0gMTtcbiAgICAvKirljp/lp4vmlbDph48gKi9cbiAgICBwcml2YXRlIG51bTpudW1iZXIgPSA1O1xuXG4gICAgcHJpdmF0ZSBpbml0RGF0YTphbnk7XG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG4gICAgICAgIFxuICAgICAgICBjYy50d2Vlbih0aGlzLm11bHRpcGxlTm9kZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjMse2FuZ2xlOjEwfSkudG8oLjIse2FuZ2xlOjB9KVxuICAgICAgICApLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyWICovXG4gICAgaW5pdChkYXRhKXtcblxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLop6PplIHmlrDngq7loZRcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IHV0aWwuR2V0VHVycmV0RGF0YSh1dGlsLnVzZXJEYXRhLnR1cnJldExldmVsKTtcblxuICAgICAgICBpZih0aGlzLmluaXREYXRhLmxldmVsPT0yKXtcbiAgICAgICAgICAgIFRyYWNrTWdyLnJvb2tpZV9wcm9jZXNzKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZSA6XCLpppbmrKHop6PplIHngq7loZTlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBzeW50aGVzaXNfc3VjY2Vzc2Z1bDp0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmKHV0aWwuY2hlY2tUZXN0QihOYW1lVHMubG9ja190dXJyZXRfdGVzdCkpe1xuICAgICAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4oMjgwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2luID0gMjgwMDtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuY29pbiA9IHV0aWwuR2V0QmVoYXZpb3JSZXdhcmRWbygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudHVycmV0TnVtTGFiZWwuc3RyaW5nICA9IFwiK1wiK3RoaXMuY29pbitcIue6ouWMheW4gVwiO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy50dXJyZXROdW1MYWJlbC5zdHJpbmcgID0gXCIrXCIrdGhpcy5udW0rXCLngq7loZRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29pbiwndGhpcy5jb2luJylcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8v5a2Y5ZCI5oiQ5qyh5pWw5ZKM5pe26Ze0XG4gICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkudW5sb2NraW5nX3RpbWUsdXRpbC51c2VyRGF0YS51bmxvY2tpbmdfdGltZSk7XG5cbiAgICAgICAgXG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSBcIkx2LlwiK3RoaXMuaW5pdERhdGEubGV2ZWw7XG4gICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyA9IHRoaXMuaW5pdERhdGEubmFtZTtcblxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJib2R5XCIsKHJlcyk9PntcbiAgICAgICAgICAgIHRoaXMudHVycmV0Qm9keSYmKHRoaXMudHVycmV0Qm9keS5zcHJpdGVGcmFtZSA9IHJlcyk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZShcImZvb3RcIiwocmVzKT0+e1xuICAgICAgICAgICAgaWYodGhpcy50dXJyZXRGb290JiZyZXMpe1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290LnNwcml0ZUZyYW1lID0gcmVzXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKT4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290JiYodGhpcy50dXJyZXRGb290Lm5vZGUueSA9IE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdXRpbC5zZW5kVHVycmV0RGF0YSgpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfQnV5X3VwZGF0ZSk7XG5cbiAgICAgICAgWE1TREsudHJhY2tVc2VyUHJvcGVydGllcyh7XG4gICAgICAgICAgICB0b3Bfc3ludGhlc2lzOiB1dGlsLnVzZXJEYXRhLmNvbXBvdW5kVGltZXMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVW5sY29rVHVycmV0XSl7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlVubGNva1R1cnJldCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFyckJ0blswXS5hY3RpdmUgPSB1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlPT0yO1xuICAgICAgICB0aGlzLmFyckJ0blsxXS5hY3RpdmUgPSB0aGlzLmFyckJ0blsyXS5hY3RpdmUgPSAgdXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSE9PTI7XG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKGUscmVzKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGlmKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGU9PTIpe1xuICAgICAgICAgICAgaWYoIXV0aWwuY2hlY2tUZXN0QihOYW1lVHMubmV3X2hhbmRfdGVzdCkpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHdWlkZTIsMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4se25vZGU6dGhpcy5ub2RlLHZhbHVlOnRoaXMuY29pbixudW06NX0pO1xuICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLmNvaW4pO1xuICAgICAgICAgICAgdXRpbC5zZW5kVHVycmV0RGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdWNjZXNzRm4gPSAoKT0+e1xuICAgICAgICAgICAgbGV0IG51bTpudW1iZXIgPSB0aGlzLm51bSoocmVzPT0xPzI6MSk7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X3R1cnJldCx7bm9kZTp0aGlzLm5vZGUsbnVtfSk7XG4gICAgICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQobnVtKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICAvLyB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lR2V0VHVycmV0LHtudW0sbmFtZTpwYWdlVHMucGFnZU5hbWUuR2FtZVVwZ3JhZGV9KTsgXG5cbiAgICAgICAgICAgIGlmKHJlcyA9PSAxKXtcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLop6PplIHmlrDngq7loZRcIixcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOlwi5aSa5YCN6aKG5Y+WXCIsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgICAgICB9KTsgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuino+mUgeaWsOeCruWhlFwiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLmma7pgJrpooblj5ZcIiwgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHJlcz09MSl7XG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVW5sY29rVHVycmV0LCgpPT57XG4gICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5Vbmxjb2tUdXJyZXQpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAvKipcbiAgICAgKiDliqDovb3lm77niYdcbiAgICAgKi9cbiAgICBsb2FkU3ByaXRlKG5hbWU6c3RyaW5nLGNhbGw6RnVuY3Rpb24pe1xuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh0aGlzLmluaXREYXRhW25hbWVdLGNjLlNwcml0ZUZyYW1lLChlcnIscmVzOmNjLlNwcml0ZUZyYW1lKT0+e1xuXG4gICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmib7kuI3liLDor6Xlm77niYdcIixlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbChyZXMpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5Vbmxjb2tUdXJyZXRWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuICAgICAgICAvLyBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVW5sY29rVHVycmV0Vmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5Vbmxjb2tUdXJyZXRWaWV3LHRydWUpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uVW5sY29rVHVycmV0Vmlldyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=