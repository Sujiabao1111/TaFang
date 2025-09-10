
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameGetTurret.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df8b8p/iAdBSYY0bCdsLEsz', 'gameGetTurret');
// Script/pop/gameGetTurret.ts

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
        AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('main.Got_turrets', this.num));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHZXRUdXJyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUNwQyxtREFBa0Q7QUFFbEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0Qyx5REFBNkM7QUFDN0Msc0VBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFNO0lBQWpEO1FBQUEscUVBeUlDO1FBdElXLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFFbEMsNENBQTRDO1FBQzVDLGdDQUFnQztRQUd4QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRWxDLFFBQVE7UUFDQSxTQUFHLEdBQVcsQ0FBQyxDQUFDO1FBSWhCLGNBQVEsR0FBVyxJQUFJLENBQUM7O1FBa0hoQyxpQkFBaUI7SUFDckIsQ0FBQztJQWpIRyw4QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFFSSxzQ0FBc0M7UUFDdEMsbURBQW1EO1FBQ25ELGFBQWE7SUFDakIsQ0FBQztJQUVELFNBQVM7SUFDVCw0QkFBSSxHQUFKLFVBQUssSUFBSTtRQUFULGlCQXNDQztRQXJDRyxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsS0FBSyxJQUFJLGNBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTNELElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFB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LEVBQUUsS0FBSyxFQUFFLENBQUM7b0RBQ2Q7SUFmakIsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXlJakM7SUFBRCxvQkFBQztDQXpJRCxBQXlJQyxDQXpJMEMsZ0JBQU0sR0F5SWhEO2tCQXpJb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgdXBkYXRlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lR2V0VHVycmV0IGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmlbDph49cIiB9KVxuICAgIHByaXZhdGUgbnVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YWJXCJ9KVxuICAgIC8vIHByaXZhdGUgbGlnaHQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIGRpc3BsYXlOYW1lOiBcIueCruWhlOi6q1wiIH0pXG4gICAgcHJpdmF0ZSB0dXJyZXRCb2R5OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLngq7loZTohJpcIiB9KVxuICAgIHByaXZhdGUgdHVycmV0Rm9vdDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuS/oeaBr+a1gVwiIH0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLyoq6YeR5biBICovXG4gICAgcHJpdmF0ZSBudW06IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGluaXREYXRhOiBhbnk7XG5cbiAgICBwcml2YXRlIGRhdGFOYW1lOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5saWdodCkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkudG8oMSx7c2NhbGU6MX0pLnRvKDEse3NjYWxlOjEuMX0pXG4gICAgICAgIC8vICkuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvKirliJ3lp4vljJYgKi9cbiAgICBpbml0KGRhdGEpIHtcbiAgICAgICAgbGV0IGxldmVsOiBudW1iZXIgPSBkYXRhLmxldmVsIHx8IHV0aWwuZ2V0QnV5UmFuZG9tTGV2ZWwoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhID0gdXRpbC5HZXRUdXJyZXREYXRhKGxldmVsKTtcbiAgICAgICAgdGhpcy5udW0gPSBkYXRhLm51bTtcbiAgICAgICAgdGhpcy5udW1MYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMubnVtO1xuXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZShcImJvZHlcIiwgKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy50dXJyZXRCb2R5ICYmICh0aGlzLnR1cnJldEJvZHkuc3ByaXRlRnJhbWUgPSByZXMpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJmb290XCIsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR1cnJldEZvb3QgJiYgcmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Quc3ByaXRlRnJhbWUgPSByZXNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMuaW5pdERhdGEuc3ByaXRlRm9vdFkpID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdCAmJiAodGhpcy50dXJyZXRGb290Lm5vZGUueSA9IE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZGF0YU5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLmRhdGFOYW1lKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFOYW1lID09IHBhZ2VUcy5wYWdlTmFtZS5HYW1lVXBncmFkZSkge1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6I635b6X54Ku5aGU5by556qX77yI6Kej6ZSB5paw54Ku5aGU77yJXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6I635b6X54Ku5aGU5by556qX77yI6aKd5aSW6I635b6X54Ku5aGU77yJXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2V0VHVycmV0Vmlldyk7XG4gICAgICAgIC8vIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2V0VHVycmV0KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOiOt+WPllxuICAgICAqL1xuICAgIGdldEJ0bigpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgdXRpbC5wcm9kdWN0VHVycmV0KHRoaXMubnVtKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF90dXJyZXQsIHsgbm9kZTogdGhpcy5ub2RlLCBudW06IHRoaXMubnVtIH0pO1xuXG4gICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodCgnbWFpbi5Hb3RfdHVycmV0cycsIHRoaXMubnVtKSk7XG5cbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICBpZiAodGhpcy5kYXRhTmFtZSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhTmFtZSA9PSBwYWdlVHMucGFnZU5hbWUuR2FtZVVwZ3JhZGUpIHtcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLojrflvpfngq7loZTlvLnnqpfvvIjop6PplIHmlrDngq7loZTvvIlcIixcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaUtuS4i1wiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuiOt+W+l+eCruWhlOW8ueeql++8iOmineWkluiOt+W+l+eCruWhlO+8iVwiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5pS25LiLXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB1dGlsLnVzZXJEYXRhLkdldFR1cnJldE51bSAtPSAxO1xuXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LkdldFR1cnJldE51bSwgdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAqIOWKoOi9veWbvueJh1xuICAgICAgKi9cbiAgICBsb2FkU3ByaXRlKG5hbWU6IHN0cmluZywgY2FsbDogRnVuY3Rpb24pIHtcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodGhpcy5pbml0RGF0YVtuYW1lXSwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHJlczogY2MuU3ByaXRlRnJhbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5om+5LiN5Yiw6K+l5Zu+54mHXCIsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbChyZXMpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXRWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuICAgICAgICAvLyBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uR2V0VHVycmV0Vmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXRWaWV3LHRydWUpO1xuICAgICAgICAvLyB9IFxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkdldFR1cnJldFZpZXcpO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19