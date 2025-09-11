
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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
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
        // if (!util.adPreObj[AdPosition.UnlcokTurret]) {
        //     util.preloadAd(AdPosition.UnlcokTurret);
        // }
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
        };
        if (res == 1) {
            // AdController.loadAd(AdPosition.UnlcokTurret, () => {
            //     util.preloadAd(AdPosition.UnlcokTurret);
            successFn();
            // }, () => {
            //     AssistCtr.showToastTip(t("tips.reward_obtain_failed"));
            // });
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
        // AdController.loadInfoAd(AdPosition.UnlcokTurretView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.UnlcokTurretView]){
        //     util.preloadAd(AdPosition.UnlcokTurretView,true);
        // }
    };
    gameUpgrade.prototype.onDisable = function () {
        // AdController.hideInfoAd(AdPosition.UnlcokTurretView);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVVcGdyYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUVwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBR3RDLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQThMQztRQTNMVyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUV4Qyw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBR3hCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBSTdCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFJM0IsWUFBTSxHQUFjLEVBQUUsQ0FBQztRQUUvQiw2Q0FBNkM7UUFDN0MsdUNBQXVDO1FBSy9CLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR3hDLFFBQVE7UUFDQSxVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFVBQVU7UUFDRixTQUFHLEdBQVcsQ0FBQyxDQUFDOztRQXFKeEIsaUJBQWlCO0lBQ3JCLENBQUM7SUFsSkcsNEJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCwyQkFBSyxHQUFMO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO1FBRWIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUNyQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFD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dGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lVXBncmFkZSBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi54Ku5aGU5pWw6YePXCIgfSlcbiAgICBwcml2YXRlIHR1cnJldE51bUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLngq7loZTouqtcIiB9KVxuICAgIHByaXZhdGUgdHVycmV0Qm9keTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZSwgZGlzcGxheU5hbWU6IFwi54Ku5aGU6ISaXCIgfSlcbiAgICBwcml2YXRlIHR1cnJldEZvb3Q6IGNjLlNwcml0ZSA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLnrYnnuqdcIiB9KVxuICAgIHByaXZhdGUgbGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuWQjeWtl1wiIH0pXG4gICAgcHJpdmF0ZSBuYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdLCBkaXNwbGF5TmFtZTogXCLmjInpkq5cIiB9KVxuICAgIHByaXZhdGUgYXJyQnRuOiBjYy5Ob2RlW10gPSBbXTtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YCN5pWwXCJ9KVxuICAgIC8vIHByaXZhdGUgbXVsdGlwbGVOb2RlOmNjLk5vZGUgPSBudWxsO1xuXG5cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuWAjeaVsFwiIH0pXG4gICAgcHJpdmF0ZSBtdWx0aXBsZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuWAjeaVsOmHkeW4gVwiIH0pXG4gICAgcHJpdmF0ZSBsYWJsZV9hZGRHb2xkMjogY2MuTGFiZWwgPSBudWxsO1xuXG5cbiAgICAvKirph5HluIEgKi9cbiAgICBwcml2YXRlIGNvaW46IG51bWJlciA9IDE7XG4gICAgLyoq5Y6f5aeL5pWw6YePICovXG4gICAgcHJpdmF0ZSBudW06IG51bWJlciA9IDU7XG5cbiAgICBwcml2YXRlIGluaXREYXRhOiBhbnk7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmxpZ2h0KS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyAgICAgY2MudHdlZW4oKS50bygxLHtzY2FsZToxfSkudG8oMSx7c2NhbGU6MS4xfSlcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubXVsdGlwbGVOb2RlKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMywgeyBhbmdsZTogMTAgfSkudG8oLjIsIHsgYW5nbGU6IDAgfSlcbiAgICAgICAgKS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoZGF0YSkge1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuino+mUgeaWsOeCruWhlFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluaXREYXRhID0gdXRpbC5HZXRUdXJyZXREYXRhKHV0aWwudXNlckRhdGEudHVycmV0TGV2ZWwpO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXREYXRhLmxldmVsID09IDIpIHtcbiAgICAgICAgICAgIFRyYWNrTWdyLnJvb2tpZV9wcm9jZXNzKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLpppbmrKHop6PplIHngq7loZTlvLnnqpdcIixcbiAgICAgICAgICAgICAgICBzeW50aGVzaXNfc3VjY2Vzc2Z1bDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5sb2NrX3R1cnJldF90ZXN0KSkge1xuICAgICAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4oMjgwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2luID0gMjgwMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2luID0gdXRpbC5HZXRCZWhhdmlvclJld2FyZFZvKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50dXJyZXROdW1MYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMuY29pbiArIFwi57qi5YyF5biBXCI7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMudHVycmV0TnVtTGFiZWwuc3RyaW5nID0gXCIrXCIgKyB0aGlzLm51bSArIFwi54Ku5aGUXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvaW4sICd0aGlzLmNvaW4nKVxuXG5cblxuICAgICAgICAvL+WtmOWQiOaIkOasoeaVsOWSjOaXtumXtFxuICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LnVubG9ja2luZ190aW1lLCB1dGlsLnVzZXJEYXRhLnVubG9ja2luZ190aW1lKTtcblxuXG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSBcIkx2LlwiICsgdGhpcy5pbml0RGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gdGhpcy5pbml0RGF0YS5uYW1lO1xuXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZShcImJvZHlcIiwgKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy50dXJyZXRCb2R5ICYmICh0aGlzLnR1cnJldEJvZHkuc3ByaXRlRnJhbWUgPSByZXMpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJmb290XCIsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR1cnJldEZvb3QgJiYgcmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Quc3ByaXRlRnJhbWUgPSByZXNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMuaW5pdERhdGEuc3ByaXRlRm9vdFkpID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdCAmJiAodGhpcy50dXJyZXRGb290Lm5vZGUueSA9IE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdXRpbC5zZW5kVHVycmV0RGF0YSgpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfQnV5X3VwZGF0ZSk7XG5cbiAgICAgICAgWE1TREsudHJhY2tVc2VyUHJvcGVydGllcyh7XG4gICAgICAgICAgICB0b3Bfc3ludGhlc2lzOiB1dGlsLnVzZXJEYXRhLmNvbXBvdW5kVGltZXMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGlmICghdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlVubGNva1R1cnJldF0pIHtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVW5sY29rVHVycmV0KTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMuYXJyQnRuWzBdLmFjdGl2ZSA9IHV0aWwudXNlckRhdGEubm92aWNlR3VpZGUgPT0gMjtcbiAgICAgICAgdGhpcy5hcnJCdG5bMV0uYWN0aXZlID0gdGhpcy5hcnJCdG5bMl0uYWN0aXZlID0gdXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSAhPT0gMjtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKGUsIHJlcykge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgaWYgKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGUgPT0gMikge1xuICAgICAgICAgICAgaWYgKCF1dGlsLmNoZWNrVGVzdEIoTmFtZVRzLm5ld19oYW5kX3Rlc3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUd1aWRlMiwgMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5ub2RlLCB2YWx1ZTogdGhpcy5jb2luLCBudW06IDUgfSk7XG4gICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMuY29pbik7XG4gICAgICAgICAgICB1dGlsLnNlbmRUdXJyZXREYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN1Y2Nlc3NGbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBudW06IG51bWJlciA9IHRoaXMubnVtICogKHJlcyA9PSAxID8gMiA6IDEpO1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF90dXJyZXQsIHsgbm9kZTogdGhpcy5ub2RlLCBudW0gfSk7XG4gICAgICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQobnVtKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXMgPT0gMSkge1xuICAgICAgICAgICAgLy8gQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLlVubGNva1R1cnJldCwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVW5sY29rVHVycmV0KTtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAgICAgLy8gfSwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodChcInRpcHMucmV3YXJkX29idGFpbl9mYWlsZWRcIikpO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAqIOWKoOi9veWbvueJh1xuICAgICAgKi9cbiAgICBsb2FkU3ByaXRlKG5hbWU6IHN0cmluZywgY2FsbDogRnVuY3Rpb24pIHtcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodGhpcy5pbml0RGF0YVtuYW1lXSwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHJlczogY2MuU3ByaXRlRnJhbWUpID0+IHtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmib7kuI3liLDor6Xlm77niYdcIiwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGwocmVzKTtcblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uVW5sY29rVHVycmV0VmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICAgICAgLy8gaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlVubGNva1R1cnJldFZpZXddKXtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVW5sY29rVHVycmV0Vmlldyx0cnVlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICAvLyBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLlVubGNva1R1cnJldFZpZXcpO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19