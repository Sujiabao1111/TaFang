
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHZXRUdXJyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUNwQyxtREFBa0Q7QUFFbEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QyxzRUFBaUU7QUFDakUsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUU1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQU07SUFBakQ7UUFBQSxxRUEwSUM7UUF2SVcsY0FBUSxHQUFZLElBQUksQ0FBQztRQUVqQyw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBR3hCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFFakMsUUFBUTtRQUNBLFNBQUcsR0FBVSxDQUFDLENBQUM7UUFJZixjQUFRLEdBQVUsSUFBSSxDQUFDOztRQW1IL0IsaUJBQWlCO0lBQ3JCLENBQUM7SUFsSEcsOEJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBRUksc0NBQXNDO1FBQ3RDLG1EQUFtRDtRQUNuRCxhQUFhO0lBQ2pCLENBQUM7SUFFRCxTQUFTO0lBQ1QsNEJBQUksR0FBSixVQUFLLElBQUk7UUFBVCxpQkFzQ0M7UUFyQ0csSUFBSSxLQUFLLEdBQVUsSUFBSSxDQUFDLEtBQUssSUFBRSxjQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV4RCxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENB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REFDVjtJQWZoQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBMElqQztJQUFELG9CQUFDO0NBMUlELEFBMElDLENBMUkwQyxnQkFBTSxHQTBJaEQ7a0JBMUlvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4uL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVHZXRUdXJyZXQgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5pWw6YePXCJ9KVxuICAgIHByaXZhdGUgbnVtTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLlhYlcIn0pXG4gICAgLy8gcHJpdmF0ZSBsaWdodDpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsZGlzcGxheU5hbWU6XCLngq7loZTouqtcIn0pXG4gICAgcHJpdmF0ZSB0dXJyZXRCb2R5OmNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU3ByaXRlLGRpc3BsYXlOYW1lOlwi54Ku5aGU6ISaXCJ9KVxuICAgIHByaXZhdGUgdHVycmV0Rm9vdDpjYy5TcHJpdGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5L+h5oGv5rWBXCJ9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOmNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIC8qKumHkeW4gSAqL1xuICAgIHByaXZhdGUgbnVtOm51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGluaXREYXRhOmFueTtcblxuICAgIHByaXZhdGUgZGF0YU5hbWU6c3RyaW5nID0gbnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5saWdodCkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkudG8oMSx7c2NhbGU6MX0pLnRvKDEse3NjYWxlOjEuMX0pXG4gICAgICAgIC8vICkuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvKirliJ3lp4vljJYgKi9cbiAgICBpbml0KGRhdGEpe1xuICAgICAgICBsZXQgbGV2ZWw6bnVtYmVyID0gZGF0YS5sZXZlbHx8dXRpbC5nZXRCdXlSYW5kb21MZXZlbCgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IHV0aWwuR2V0VHVycmV0RGF0YShsZXZlbCk7XG4gICAgICAgIHRoaXMubnVtID0gZGF0YS5udW07XG4gICAgICAgIHRoaXMubnVtTGFiZWwuc3RyaW5nID0gXCIrXCIrdGhpcy5udW07XG5cbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKFwiYm9keVwiLChyZXMpPT57XG4gICAgICAgICAgICB0aGlzLnR1cnJldEJvZHkmJih0aGlzLnR1cnJldEJvZHkuc3ByaXRlRnJhbWUgPSByZXMpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoXCJmb290XCIsKHJlcyk9PntcbiAgICAgICAgICAgIGlmKHRoaXMudHVycmV0Rm9vdCYmcmVzKXtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Qubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5zcHJpdGVGcmFtZSA9IHJlc1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihOdW1iZXIodGhpcy5pbml0RGF0YS5zcHJpdGVGb290WSk+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290JiYodGhpcy50dXJyZXRGb290Lm5vZGUueSA9IE51bWJlcih0aGlzLmluaXREYXRhLnNwcml0ZUZvb3RZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZGF0YU5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLmRhdGFOYW1lKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFOYW1lID09IHBhZ2VUcy5wYWdlTmFtZS5HYW1lVXBncmFkZSkge1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6I635b6X54Ku5aGU5by556qX77yI6Kej6ZSB5paw54Ku5aGU77yJXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6I635b6X54Ku5aGU5by556qX77yI6aKd5aSW6I635b6X54Ku5aGU77yJXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2V0VHVycmV0Vmlldyk7XG4gICAgICAgIC8vIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2V0VHVycmV0KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOiOt+WPllxuICAgICAqL1xuICAgIGdldEJ0bigpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQodGhpcy5udW0pO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X3R1cnJldCx7bm9kZTp0aGlzLm5vZGUsbnVtOnRoaXMubnVtfSk7XG5cbiAgICAgICAgXG4gICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflvpdcIit0aGlzLm51bStcIuS4queCruWhlO+8gVwiKTtcblxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuXG4gICAgICAgIGlmKHRoaXMuZGF0YU5hbWUpe1xuXG4gICAgICAgICAgICBpZih0aGlzLmRhdGFOYW1lPT1wYWdlVHMucGFnZU5hbWUuR2FtZVVwZ3JhZGUpe1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuiOt+W+l+eCruWhlOW8ueeql++8iOino+mUgeaWsOeCruWhlO+8iVwiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLmlLbkuItcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6I635b6X54Ku5aGU5by556qX77yI6aKd5aSW6I635b6X54Ku5aGU77yJXCIsXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTpcIuaUtuS4i1wiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHV0aWwudXNlckRhdGEuR2V0VHVycmV0TnVtLT0xO1xuXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LkdldFR1cnJldE51bSx1dGlsLnVzZXJEYXRhLkdldFR1cnJldE51bSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgIC8qKlxuICAgICAqIOWKoOi9veWbvueJh1xuICAgICAqL1xuICAgIGxvYWRTcHJpdGUobmFtZTpzdHJpbmcsY2FsbDpGdW5jdGlvbil7XG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHRoaXMuaW5pdERhdGFbbmFtZV0sY2MuU3ByaXRlRnJhbWUsKGVycixyZXM6Y2MuU3ByaXRlRnJhbWUpPT57XG4gICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmib7kuI3liLDor6Xlm77niYdcIixlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGwocmVzKTtcblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uR2V0VHVycmV0VmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICAgICAgLy8gaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdldFR1cnJldFZpZXddKXtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2V0VHVycmV0Vmlldyx0cnVlKTtcbiAgICAgICAgLy8gfSBcbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXRWaWV3KTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==