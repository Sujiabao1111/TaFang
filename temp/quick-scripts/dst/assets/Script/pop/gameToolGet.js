
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameToolGet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0eab3Iu0jBNCZxO/OBnOzpg', 'gameToolGet');
// Script/pop/gameToolGet.ts

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
var LanguageData_1 = require("../Language/LanguageData");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameToolGet = /** @class */ (function (_super) {
    __extends(gameToolGet, _super);
    function gameToolGet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewport = null;
        _this.bgNode = null;
        _this.toolSpr = null;
        _this.foguang_ske = null;
        return _this;
        // update (dt) {}
    }
    gameToolGet.prototype.start = function () {
        this.foguang_ske.getComponent(dragonBones.ArmatureDisplay).playAnimation("foguang-all", 1);
    };
    gameToolGet.prototype.onEnable = function () {
        this.toolSpr.node.active = true;
        this.bgNode.opacity = 255;
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "道具过渡页"
        });
    };
    gameToolGet.prototype.init = function (info) {
        var _this = this;
        this.loadAny("texture/prop/prop" + info.propId, cc.SpriteFrame, function (res) {
            _this.toolSpr.spriteFrame = res;
            AdController_1.default.loadAd(AdPosition_1.AdPosition.Prop, function () {
                _this.getTool(info);
            }, function () {
                _this.closePage();
                AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t("tips.reward_obtain_failed"));
            });
        }, function () {
            _this.getTool(info);
        });
    };
    gameToolGet.prototype.getTool = function (info) {
        var _this = this;
        util_1.default.post({
            url: UrlConst_1.UrlConst.getProp,
            data: { configId: info.id },
            success: function (res) {
                if (!_this.isValid) {
                    return;
                }
                var data = Tools_1.Tools.GetArrData("propId", info.propId, res.propsList);
                util_1.default.userData.prop[Number(data.propId) - 1].num += Number(data.propNum);
                //console.log("获取道具", data);
                // let propConfig = Tools.GetArrData("type", info.propId, util.propConfig);
                // if (propConfig) {
                //     AssistCtr.showToastTip(`恭喜获得${propConfig.name}道具`);
                // }                                    
                _this.flyAni(info.node);
            },
            fail: function () {
                _this.closePage();
            }
        });
    };
    gameToolGet.prototype.flyAni = function (node) {
        var _this = this;
        cc.tween(this.bgNode).delay(1).to(0.3, { opacity: 0 }).call(function () {
            _this.toolSpr.node.active = false;
            AssistCtr_1.AssistCtr.playAnimate(_this.toolSpr.spriteFrame, _this.toolSpr.node, node, function () {
                cc.game.emit(NameTs_1.default.Game_PropItem_Update);
                _this.closePage();
            });
        }).start();
    };
    __decorate([
        property(cc.Node)
    ], gameToolGet.prototype, "viewport", void 0);
    __decorate([
        property(cc.Node)
    ], gameToolGet.prototype, "bgNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], gameToolGet.prototype, "toolSpr", void 0);
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], gameToolGet.prototype, "foguang_ske", void 0);
    gameToolGet = __decorate([
        ccclass
    ], gameToolGet);
    return gameToolGet;
}(baseTs_1.default));
exports.default = gameToolGet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUb29sR2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBQ2xELDJDQUFzQztBQUN0Qyx5REFBNkM7QUFDN0MsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxpREFBNEM7QUFDNUMsdUNBQXNDO0FBQ3RDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQWdGQztRQTdFRyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsYUFBTyxHQUFjLElBQUksQ0FBQztRQUcxQixpQkFBVyxHQUFnQyxJQUFJLENBQUM7O1FBbUVoRCxpQkFBaUI7SUFDckIsQ0FBQztJQWxFRywyQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUVELDhCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUUxQixrQkFBUSxDQUFDLHdCQUF3QixDQUFDO1lBQzlCLGdCQUFnQixFQUFFLE9BQU87U0FDNUIsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxJQUFJO1FBQVQsaUJBYUM7UUFaRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUs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Z0JBQU0sR0FnRjlDO2tCQWhGb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XHJcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcclxuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xyXG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xyXG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcclxuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uL3V0aWwvVG9vbHNcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVUb29sR2V0IGV4dGVuZHMgYmFzZVRzIHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHZpZXdwb3J0OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJnTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHRvb2xTcHI6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcclxuICAgIGZvZ3Vhbmdfc2tlOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuZm9ndWFuZ19za2UuZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSkucGxheUFuaW1hdGlvbihcImZvZ3VhbmctYWxsXCIsIDEpXHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy50b29sU3ByLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJnTm9kZS5vcGFjaXR5ID0gMjU1O1xyXG5cclxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIumBk+WFt+i/h+a4oemhtVwiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChpbmZvKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkQW55KFwidGV4dHVyZS9wcm9wL3Byb3BcIiArIGluZm8ucHJvcElkLCBjYy5TcHJpdGVGcmFtZSwgcmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b29sU3ByLnNwcml0ZUZyYW1lID0gcmVzO1xyXG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uUHJvcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUb29sKGluZm8pO1xyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KFwidGlwcy5yZXdhcmRfb2J0YWluX2ZhaWxlZFwiKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9vbChpbmZvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb29sKGluZm8pIHtcclxuICAgICAgICB1dGlsLnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmdldFByb3AsXHJcbiAgICAgICAgICAgIGRhdGE6IHsgY29uZmlnSWQ6IGluZm8uaWQgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBUb29scy5HZXRBcnJEYXRhKFwicHJvcElkXCIsIGluZm8ucHJvcElkLCByZXMucHJvcHNMaXN0KTtcclxuICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEucHJvcFtOdW1iZXIoZGF0YS5wcm9wSWQpIC0gMV0ubnVtICs9IE51bWJlcihkYXRhLnByb3BOdW0pO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIuiOt+WPlumBk+WFt1wiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBwcm9wQ29uZmlnID0gVG9vbHMuR2V0QXJyRGF0YShcInR5cGVcIiwgaW5mby5wcm9wSWQsIHV0aWwucHJvcENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAocHJvcENvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoYOaBreWWnOiOt+W+lyR7cHJvcENvbmZpZy5uYW1lfemBk+WFt2ApO1xyXG4gICAgICAgICAgICAgICAgLy8gfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZseUFuaShpbmZvLm5vZGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmbHlBbmkobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuYmdOb2RlKS5kZWxheSgxKS50bygwLjMsIHsgb3BhY2l0eTogMCB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b29sU3ByLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEFzc2lzdEN0ci5wbGF5QW5pbWF0ZSh0aGlzLnRvb2xTcHIuc3ByaXRlRnJhbWUsIHRoaXMudG9vbFNwci5ub2RlLCBub2RlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUHJvcEl0ZW1fVXBkYXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==