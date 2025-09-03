
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
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
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
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
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
                var data = tool_1.default.GetArrData("propId", info.propId, res.propsList);
                util_1.default.userData.prop[Number(data.propId) - 1].num += Number(data.propNum);
                //console.log("获取道具", data);
                // let propConfig = tool.GetArrData("type", info.propId, util.propConfig);
                // if (propConfig) {
                //     AssistCtr.showToastTip(`恭喜获得${propConfig.name}道具`);
                // }                                    
                TrackMgr_1.default.tool_used({
                    tool_name: data.name,
                    use_success: true,
                    is_video_tool: true,
                    level: "第" + util_1.default.userData.customs.big + "关",
                });
                _this.flyAni(info.node);
            },
            fail: function () {
                var data = tool_1.default.GetArrData("type", info.propId, util_1.default.propConfig);
                TrackMgr_1.default.tool_used({
                    tool_name: data.name,
                    use_success: false,
                    is_video_tool: true,
                    level: "第" + util_1.default.userData.customs.big + "关",
                });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUb29sR2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsbURBQWtEO0FBQ2xELDJDQUFzQztBQUN0QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFDaEMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFNO0lBQS9DO1FBQUEscUVBMkZDO1FBeEZHLGNBQVEsR0FBVyxJQUFJLENBQUM7UUFHeEIsWUFBTSxHQUFXLElBQUksQ0FBQztRQUd0QixhQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGlCQUFXLEdBQStCLElBQUksQ0FBQzs7UUE4RS9DLGlCQUFpQjtJQUNyQixDQUFDO0lBN0VHLDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM5RixDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBRTFCLGtCQUFRLENBQUMsd0JBQXdCLENBQUM7WUFDOUIsZ0JBQWdCLEVBQUMsT0FBTztTQUMzQixDQUFDLENBQUE7SUFFTixDQUFDO0lBRUQsMEJBQUksR0FBSixVQUFLLElBQUk7UUFBVCxpQkFhQztRQVpHLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsV0FB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QU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO2dCQUNyRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQzFDLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQXJGRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ0k7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDSztJQUd6QjtRQURDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO29EQUNTO0lBWjlCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0EyRi9CO0lBQUQsa0JBQUM7Q0EzRkQsQUEyRkMsQ0EzRndDLGdCQUFNLEdBMkY5QztrQkEzRm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xyXG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xyXG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XHJcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vdXRpbC90b29sXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lVG9vbEdldCBleHRlbmRzIGJhc2VUcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB2aWV3cG9ydDpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJnTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgdG9vbFNwcjpjYy5TcHJpdGUgPSBudWxsOyAgICBcclxuXHJcbiAgICBAcHJvcGVydHkoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KVxyXG4gICAgZm9ndWFuZ19za2U6ZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5ID0gbnVsbDtcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmZvZ3Vhbmdfc2tlLmdldENvbXBvbmVudChkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpLnBsYXlBbmltYXRpb24oXCJmb2d1YW5nLWFsbFwiLCAxKVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgdGhpcy50b29sU3ByLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJnTm9kZS5vcGFjaXR5ID0gMjU1O1xyXG5cclxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOlwi6YGT5YW36L+H5rih6aG1XCJcclxuICAgICAgICB9KVxyXG4gICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGluZm8pe1xyXG4gICAgICAgIHRoaXMubG9hZEFueShcInRleHR1cmUvcHJvcC9wcm9wXCIgKyBpbmZvLnByb3BJZCwgY2MuU3ByaXRlRnJhbWUsIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbFNwci5zcHJpdGVGcmFtZSA9IHJlcztcclxuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLlByb3AsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9vbChpbmZvKTtcclxuICAgICAgICAgICAgfSwgKCk9PnsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmdldFRvb2woaW5mbyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9vbChpbmZvKXtcclxuICAgICAgICB1dGlsLnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmdldFByb3AsXHJcbiAgICAgICAgICAgIGRhdGE6IHsgY29uZmlnSWQ6IGluZm8uaWQgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdG9vbC5HZXRBcnJEYXRhKFwicHJvcElkXCIsIGluZm8ucHJvcElkLCByZXMucHJvcHNMaXN0KTtcclxuICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEucHJvcFtOdW1iZXIoZGF0YS5wcm9wSWQpIC0gMV0ubnVtICs9IE51bWJlcihkYXRhLnByb3BOdW0pOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi6I635Y+W6YGT5YW3XCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHByb3BDb25maWcgPSB0b29sLkdldEFyckRhdGEoXCJ0eXBlXCIsIGluZm8ucHJvcElkLCB1dGlsLnByb3BDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHByb3BDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKGDmga3llpzojrflvpcke3Byb3BDb25maWcubmFtZX3pgZPlhbdgKTtcclxuICAgICAgICAgICAgICAgIC8vIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLnRvb2xfdXNlZCh7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbF9uYW1lIDogZGF0YS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZV9zdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzX3ZpZGVvX3Rvb2w6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IFwi56ysXCIrdXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZytcIuWFs1wiLFxyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbHlBbmkoaW5mby5ub2RlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKCkgPT4geyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdG9vbC5HZXRBcnJEYXRhKFwidHlwZVwiLCBpbmZvLnByb3BJZCwgdXRpbC5wcm9wQ29uZmlnKTsgICAgICAgXHJcbiAgICAgICAgICAgICAgICBUcmFja01nci50b29sX3VzZWQoeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xfbmFtZSA6IGRhdGEubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2Vfc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNfdmlkZW9fdG9vbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbDogXCLnrKxcIit1dGlsLnVzZXJEYXRhLmN1c3RvbXMuYmlnK1wi5YWzXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZseUFuaShub2RlOmNjLk5vZGUpeyAgICAgICAgXHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5iZ05vZGUpLmRlbGF5KDEpLnRvKDAuMyx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnRvb2xTcHIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgQXNzaXN0Q3RyLnBsYXlBbmltYXRlKHRoaXMudG9vbFNwci5zcHJpdGVGcmFtZSwgdGhpcy50b29sU3ByLm5vZGUsIG5vZGUsICgpPT57XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUHJvcEl0ZW1fVXBkYXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==