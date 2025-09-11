
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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var LanguageData_1 = require("../Language/LanguageData");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHZXRUdXJyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUdwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLHlEQUE2QztBQUU3QyxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBTTtJQUFqRDtRQUFBLHFFQThIQztRQTNIVyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRWxDLDRDQUE0QztRQUM1QyxnQ0FBZ0M7UUFHeEIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUVsQyxRQUFRO1FBQ0EsU0FBRyxHQUFXLENBQUMsQ0FBQztRQUloQixjQUFRLEdBQVcsSUFBSSxDQUFDOztJQXdHcEMsQ0FBQztJQXRHRyw4QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFFSSxzQ0FBc0M7UUFDdEMsbURBQW1EO1FBQ25ELGFBQWE7SUFDakIsQ0FBQztJQUVELFNBQVM7SUFDVCw0QkFBSSxHQUFKLFVBQUssSUFBSTtRQUFULGlCQXNDQztRQXJDRyxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsS0FBSyxJQUFJLGNBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTNELElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElB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OztRQUVJO0lBQ0osa0NBQVUsR0FBVixVQUFXLElBQVksRUFBRSxJQUFjO1FBQ25DLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFtQjtZQUM1RSxJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDN0IsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBekhEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO21EQUNkO0lBTWxDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO3FEQUNiO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO3FEQUNiO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO29EQUNkO0lBZmpCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0E4SGpDO0lBQUQsb0JBQUM7Q0E5SEQsQUE4SEMsQ0E5SDBDLGdCQUFNLEdBOEhoRDtrQkE5SG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZUdldFR1cnJldCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5pWw6YePXCIgfSlcbiAgICBwcml2YXRlIG51bUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWFiVwifSlcbiAgICAvLyBwcml2YXRlIGxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLngq7loZTouqtcIiB9KVxuICAgIHByaXZhdGUgdHVycmV0Qm9keTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZSwgZGlzcGxheU5hbWU6IFwi54Ku5aGU6ISaXCIgfSlcbiAgICBwcml2YXRlIHR1cnJldEZvb3Q6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8qKumHkeW4gSAqL1xuICAgIHByaXZhdGUgbnVtOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBpbml0RGF0YTogYW55O1xuXG4gICAgcHJpdmF0ZSBkYXRhTmFtZTogc3RyaW5nID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyWICovXG4gICAgaW5pdChkYXRhKSB7XG4gICAgICAgIGxldCBsZXZlbDogbnVtYmVyID0gZGF0YS5sZXZlbCB8fCB1dGlsLmdldEJ1eVJhbmRvbUxldmVsKCk7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IHV0aWwuR2V0VHVycmV0RGF0YShsZXZlbCk7XG4gICAgICAgIHRoaXMubnVtID0gZGF0YS5udW07XG4gICAgICAgIHRoaXMubnVtTGFiZWwuc3RyaW5nID0gXCIrXCIgKyB0aGlzLm51bTtcblxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJib2R5XCIsIChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHVycmV0Qm9keSAmJiAodGhpcy50dXJyZXRCb2R5LnNwcml0ZUZyYW1lID0gcmVzKTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKFwiZm9vdFwiLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50dXJyZXRGb290ICYmIHJlcykge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290LnNwcml0ZUZyYW1lID0gcmVzXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3QgJiYgKHRoaXMudHVycmV0Rm9vdC5ub2RlLnkgPSBOdW1iZXIodGhpcy5pbml0RGF0YS5zcHJpdGVGb290WSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmRhdGFOYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5kYXRhTmFtZSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhTmFtZSA9PSBwYWdlVHMucGFnZU5hbWUuR2FtZVVwZ3JhZGUpIHtcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuiOt+W+l+eCruWhlOW8ueeql++8iOino+mUgeaWsOeCruWhlO+8iVwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuiOt+W+l+eCruWhlOW8ueeql++8iOmineWkluiOt+W+l+eCruWhlO+8iVwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdldFR1cnJldFZpZXcpO1xuICAgICAgICAvLyB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdldFR1cnJldCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIHV0aWwucHJvZHVjdFR1cnJldCh0aGlzLm51bSk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfdHVycmV0LCB7IG5vZGU6IHRoaXMubm9kZSwgbnVtOiB0aGlzLm51bSB9KTtcblxuICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHQoJ21haW4uR290X3R1cnJldHMnLCB0aGlzLm51bSkpO1xuXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YU5hbWUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YU5hbWUgPT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVVcGdyYWRlKSB7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6I635b6X54Ku5aGU5by556qX77yI6Kej6ZSB5paw54Ku5aGU77yJXCIsXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLmlLbkuItcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLojrflvpfngq7loZTlvLnnqpfvvIjpop3lpJbojrflvpfngq7loZTvvIlcIixcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaUtuS4i1wiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0gLT0gMTtcblxuICAgICAgICAgICAgdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5HZXRUdXJyZXROdW0sIHV0aWwudXNlckRhdGEuR2V0VHVycmV0TnVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAgKiDliqDovb3lm77niYdcbiAgICAgICovXG4gICAgbG9hZFNwcml0ZShuYW1lOiBzdHJpbmcsIGNhbGw6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHRoaXMuaW5pdERhdGFbbmFtZV0sIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCByZXM6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaJvuS4jeWIsOivpeWbvueJh1wiLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGwocmVzKTtcblxuICAgICAgICB9KTtcbiAgICB9XG4gICBcbn1cbiJdfQ==