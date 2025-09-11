
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHZXRWaWRlb1R1cnJldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBRXBDLDJDQUE2RDtBQUM3RCwyQ0FBc0M7QUFFdEMseURBQTZDO0FBRTdDLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMsdUNBQXNDO0FBQ3RDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFnRCxzQ0FBTTtJQUF0RDtRQUFBLHFFQWtJQztRQS9IVyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRWxDLDRDQUE0QztRQUM1QyxnQ0FBZ0M7UUFHeEIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUVsQyxRQUFRO1FBQ0EsU0FBRyxHQUFXLENBQUMsQ0FBQzs7SUE2RzVCLENBQUM7SUF6R0csbUNBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCxrQ0FBSyxHQUFMO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO1FBSmpCLGlCQVlDO1FBTEcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUVkLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVwQyxDQUFDLEVBQUUsc0JBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsU0FBUztJQUNULGlDQUFJLEdBQUosVUFBSyxJQUFJO1FBQVQsaUJBMEJDO1FBeEJHLElBQUksS0FBSyxHQUFXLGNBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBSSxD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QyxHQUFHLEVBQUUsR0FBbUI7WUFDNUUsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDaEM7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUEzSEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7d0RBQ2Q7SUFNbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7MERBQ2I7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7MERBQ2I7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7NERBQ1Y7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7eURBQ2Q7SUFsQmpCLGtCQUFrQjtRQUR0QyxPQUFPO09BQ2Esa0JBQWtCLENBa0l0QztJQUFELHlCQUFDO0NBbElELEFBa0lDLENBbEkrQyxnQkFBTSxHQWtJckQ7a0JBbElvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGdhbWVOdW1lcmljYWwsIHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi4vdXRpbC9Ub29sc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZUdldFZpZGVvVHVycmV0IGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmlbDph49cIiB9KVxuICAgIHByaXZhdGUgbnVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YWJXCJ9KVxuICAgIC8vIHByaXZhdGUgbGlnaHQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIGRpc3BsYXlOYW1lOiBcIueCruWhlOi6q1wiIH0pXG4gICAgcHJpdmF0ZSB0dXJyZXRCb2R5OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLngq7loZTohJpcIiB9KVxuICAgIHByaXZhdGUgdHVycmV0Rm9vdDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuWFs+mXrVwiIH0pXG4gICAgcHJpdmF0ZSBjbG9zZUJ0bk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5L+h5oGv5rWBXCIgfSlcbiAgICBwcml2YXRlIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvKirph5HluIEgKi9cbiAgICBwcml2YXRlIG51bTogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgaW5pdERhdGE6IGFueTtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG5cblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG5Ob2RlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgfSwgZ2FtZU51bWVyaWNhbC5jbG9zZVRpbWUpO1xuICAgIH1cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoZGF0YSkge1xuXG4gICAgICAgIGxldCBsZXZlbDogbnVtYmVyID0gdXRpbC5nZXRCdXlSYW5kb21MZXZlbCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSB1dGlsLkdldFR1cnJldERhdGEobGV2ZWwpO1xuICAgICAgICB0aGlzLm51bSA9IGRhdGEubnVtIHx8IFRvb2xzLkdldFJhbmRvbSg4LCAxMik7XG4gICAgICAgIHRoaXMubnVtTGFiZWwuc3RyaW5nID0gXCIrXCIgKyB0aGlzLm51bSArIHQoXCJtYWluLueCruWhlFwiKTtcblxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJib2R5XCIsIChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHVycmV0Qm9keSAmJiAodGhpcy50dXJyZXRCb2R5LnNwcml0ZUZyYW1lID0gcmVzKTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKFwiZm9vdFwiLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50dXJyZXRGb290ICYmIHJlcykge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290LnNwcml0ZUZyYW1lID0gcmVzXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3QgJiYgKHRoaXMudHVycmV0Rm9vdC5ub2RlLnkgPSBOdW1iZXIodGhpcy5pbml0RGF0YS5zcHJpdGVGb290WSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIC8vIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAvLyAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnnIvop4bpopHpooblj5bngq7loZTlvLnnqpdcIixcbiAgICAgICAgLy8gICAgIGNrX21vZHVsZTpcIumihuWPllwiLFxuICAgICAgICAvLyAgICAgYWN0aXZlX2FkX2hjZGc6XCLmv4DlirHop4bpopFcIlxuICAgICAgICAvLyB9KTtcblxuXG4gICAgICAgIC8vIHV0aWwuc2VuZFR1cnJldE51bSgpO1xuICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQodGhpcy5udW0pO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X3R1cnJldCwgeyBub2RlOiB0aGlzLm5vZGUsIG51bTogdGhpcy5udW0gfSk7XG5cbiAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KCdtYWluLkdvdF90dXJyZXRzJywgdGhpcy5udW0pKTtcblxuXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0gLT0gMTtcblxuICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LkdldFR1cnJldE51bSwgdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0pO1xuICAgICAgICAvLyB9LCAoKSA9PiB7XG4gICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAvLyB9KTtcblxuICAgIH1cblxuICAgIC8qKuWFs+mXrWNsb3NlICovXG4gICAgY2xvc2VCdG4oKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi55yL6KeG6aKR6aKG5Y+W54Ku5aGU5by556qXXCIsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5YWz6ZetXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICAqIOWKoOi9veWbvueJh1xuICAgICAgKi9cbiAgICBsb2FkU3ByaXRlKG5hbWU6IHN0cmluZywgY2FsbDogRnVuY3Rpb24pIHtcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodGhpcy5pbml0RGF0YVtuYW1lXSwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHJlczogY2MuU3ByaXRlRnJhbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5om+5LiN5Yiw6K+l5Zu+54mHXCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsKHJlcyk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxufVxuIl19