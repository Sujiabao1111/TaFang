"use strict";
cc._RF.push(module, 'b423az3C9FACITSax5Uj3kp', 'gameStart');
// Script/pop/gameStart.ts

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
var NameTs_1 = require("../common/NameTs");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameStart = /** @class */ (function (_super) {
    __extends(gameStart, _super);
    function gameStart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customLabel = null;
        _this.djsNum = 0;
        return _this;
        // update (dt) {}
    }
    gameStart.prototype.start = function () {
    };
    /**
     * 初始化
     */
    gameStart.prototype.init = function () {
        var _this = this;
        this.djsNum = 1;
        this.schedule(function () {
            _this.djsNum--;
            if (_this.djsNum <= 0) {
                _this.close();
                _this.unscheduleAllCallbacks();
                return;
            }
        }, 1);
        var customs = util_1.default.userData.customs;
        this.customLabel.string = "关卡" + customs.big + "-" + customs.small;
    };
    /**
     * 关闭页面
     */
    gameStart.prototype.close = function () {
        this.unscheduleAllCallbacks();
        //soundController.singleton.clickAudio();
        console.log("asfasfasf===============");
        this.closePage();
        cc.game.emit(NameTs_1.default.Game_Start);
        util_1.default.gameTime = 0;
        util_1.default.gamePropNum = 0;
    };
    __decorate([
        property({ type: cc.Label, displayName: "关卡" })
    ], gameStart.prototype, "customLabel", void 0);
    gameStart = __decorate([
        ccclass
    ], gameStart);
    return gameStart;
}(baseTs_1.default));
exports.default = gameStart;

cc._RF.pop();