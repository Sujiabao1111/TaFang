"use strict";
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