
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
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
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
            // AdController.loadAd(AdPosition.Prop, () => {
            _this.getTool(info);
            // }, () => {
            //     this.closePage();
            //     AssistCtr.showToastTip(t("tips.reward_obtain_failed"));
            // });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUb29sR2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFFcEMsMkNBQXNDO0FBRXRDLCtDQUE4QztBQUU5QyxpREFBNEM7QUFDNUMsdUNBQXNDO0FBQ3RDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQWdGQztRQTdFRyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsYUFBTyxHQUFjLElBQUksQ0FBQztRQUcxQixpQkFBVyxHQUFnQyxJQUFJLENBQUM7O1FBbUVoRCxpQkFBaUI7SUFDckIsQ0FBQztJQWxFRywyQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUVELDhCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUUxQixrQkFBUSxDQUFDLHdCQUF3QixDQUFDO1lBQzlCLGdCQUFnQixFQUFFLE9BQU87U0FDNUIsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxJQUFJO1FBQVQsaUJBYUM7UUFaRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFBLEdBQUc7WUFDL0QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQy9CLCtDQUErQztZQUMvQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLGFBQWE7WUFDYix3QkFBd0I7WUFDeEIsOERBQThEO1lBRTlELE1BQU07UUFDVixDQUFDLEVBQUU7WUFDQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxJQUFJO1FBQVosaUJBd0JDO1FBdkJHLGNBQUksQ0FBQyxJQUFJLENBQUM7WUFDTixHQUFHLEVBQUUsbUJBQVEsQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQzNCLE9BQU8sRUFBRSxVQUFDLEdBQUc7Z0JBQ1QsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2YsT0FBTztpQkFDVjtnQkFFRCxJQUFJLElBQUksR0FBRyxhQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEUsY0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEUsNEJBQTRCO2dCQUM1QiwyRUFBMkU7Z0JBQzNFLG9CQUFvQjtnQkFDcEIsMERBQTBEO2dCQUMxRCx3Q0FBd0M7Z0JBRXhDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFDRCxJQUFJLEVBQUU7Z0JBRUYsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLElBQWE7UUFBcEIsaUJBUUM7UUFQRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4RCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLHFCQUFTLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtnQkFDckUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUMxQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUExRUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ007SUFHMUI7UUFEQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztvREFDVTtJQVovQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBZ0YvQjtJQUFELGtCQUFDO0NBaEZELEFBZ0ZDLENBaEZ3QyxnQkFBTSxHQWdGOUM7a0JBaEZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XHJcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xyXG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XHJcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi4vdXRpbC9Ub29sc1wiO1xyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVRvb2xHZXQgZXh0ZW5kcyBiYXNlVHMge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdmlld3BvcnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmdOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgdG9vbFNwcjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KVxyXG4gICAgZm9ndWFuZ19za2U6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5mb2d1YW5nX3NrZS5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KS5wbGF5QW5pbWF0aW9uKFwiZm9ndWFuZy1hbGxcIiwgMSlcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnRvb2xTcHIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYmdOb2RlLm9wYWNpdHkgPSAyNTU7XHJcblxyXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6YGT5YW36L+H5rih6aG1XCJcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0KGluZm8pIHtcclxuICAgICAgICB0aGlzLmxvYWRBbnkoXCJ0ZXh0dXJlL3Byb3AvcHJvcFwiICsgaW5mby5wcm9wSWQsIGNjLlNwcml0ZUZyYW1lLCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2xTcHIuc3ByaXRlRnJhbWUgPSByZXM7XHJcbiAgICAgICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5Qcm9wLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9vbChpbmZvKTtcclxuICAgICAgICAgICAgLy8gfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgLy8gICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodChcInRpcHMucmV3YXJkX29idGFpbl9mYWlsZWRcIikpO1xyXG5cclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldFRvb2woaW5mbyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9vbChpbmZvKSB7XHJcbiAgICAgICAgdXRpbC5wb3N0KHtcclxuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nZXRQcm9wLFxyXG4gICAgICAgICAgICBkYXRhOiB7IGNvbmZpZ0lkOiBpbmZvLmlkIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gVG9vbHMuR2V0QXJyRGF0YShcInByb3BJZFwiLCBpbmZvLnByb3BJZCwgcmVzLnByb3BzTGlzdCk7XHJcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnByb3BbTnVtYmVyKGRhdGEucHJvcElkKSAtIDFdLm51bSArPSBOdW1iZXIoZGF0YS5wcm9wTnVtKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCLojrflj5bpgZPlhbdcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcHJvcENvbmZpZyA9IFRvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsIGluZm8ucHJvcElkLCB1dGlsLnByb3BDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHByb3BDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKGDmga3llpzojrflvpcke3Byb3BDb25maWcubmFtZX3pgZPlhbdgKTtcclxuICAgICAgICAgICAgICAgIC8vIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZseUFuaShpbmZvLm5vZGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZseUFuaShub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5iZ05vZGUpLmRlbGF5KDEpLnRvKDAuMywgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2xTcHIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgQXNzaXN0Q3RyLnBsYXlBbmltYXRlKHRoaXMudG9vbFNwci5zcHJpdGVGcmFtZSwgdGhpcy50b29sU3ByLm5vZGUsIG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qcm9wSXRlbV9VcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19