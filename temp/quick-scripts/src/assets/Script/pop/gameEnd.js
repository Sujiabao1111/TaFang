"use strict";
cc._RF.push(module, 'e570a8xm6xO07XogVYarkPX', 'gameEnd');
// Script/pop/gameEnd.ts

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
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameEnd = /** @class */ (function (_super) {
    __extends(gameEnd, _super);
    function gameEnd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customLabel = null;
        _this.againLabel = null;
        _this.feed_node = null;
        // onLoad () {}
        //重来时间
        _this.time = 3;
        return _this;
        // update (dt) {}
    }
    gameEnd.prototype.start = function () {
    };
    /**初始化 */
    gameEnd.prototype.init = function () {
        var _this = this;
        var customs = util_1.default.userData.customs;
        this.customLabel.string = "关卡" + customs.big + "-" + customs.small;
        this.againLabel.string = "重来(" + this.time + ")";
        this.schedule(function () {
            _this.time -= 1;
            if (_this.time == 0) {
                _this.closeBtn();
                return;
            }
            _this.againLabel.string = "重来(" + _this.time + ")";
        }, 1);
        TrackMgr_1.default.AppGamedate({
            is_challenge_suc: true,
            game_level_hcdg: "第" + util_1.default.userData.customs.big + "关",
            level_hcdg: "第" + util_1.default.userData.customs.small + "波",
            game_time: util_1.default.gameTime + "s",
            use_tool: String(util_1.default.gamePropNum),
        });
    };
    /**
     * 关闭页面
     */
    gameEnd.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.unscheduleAllCallbacks();
        this.closePage();
        cc.game.emit(NameTs_1.default.Game_Again);
    };
    gameEnd.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.GameFailView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
    };
    gameEnd.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.GameFailView);
    };
    __decorate([
        property({ type: cc.Label, displayName: "关卡" })
    ], gameEnd.prototype, "customLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "重玩按钮label" })
    ], gameEnd.prototype, "againLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameEnd.prototype, "feed_node", void 0);
    gameEnd = __decorate([
        ccclass
    ], gameEnd);
    return gameEnd;
}(baseTs_1.default));
exports.default = gameEnd;

cc._RF.pop();