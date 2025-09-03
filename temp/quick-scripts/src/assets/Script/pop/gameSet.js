"use strict";
cc._RF.push(module, '26c8aN9C9BEZYNdGYXhzmUO', 'gameSet');
// Script/pop/gameSet.ts

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
var AppInfo_1 = require("../server/xmsdk_cocos/Config/AppInfo");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameSet = /** @class */ (function (_super) {
    __extends(gameSet, _super);
    function gameSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BGMSprite = null;
        _this.soundSprite = null;
        _this.switchSpriteFrame = [];
        _this.lable_version = null;
        return _this;
        // update (dt) {}
    }
    //初始化
    gameSet.prototype.init = function () {
        this.BGMSprite.spriteFrame = this.switchSpriteFrame[util_1.default.soundSet.bgm];
        this.soundSprite.spriteFrame = this.switchSpriteFrame[util_1.default.soundSet.sound];
    };
    gameSet.prototype.onEnable = function () {
        this.BGMSprite.spriteFrame = this.switchSpriteFrame[util_1.default.soundSet.bgm];
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "设置弹窗"
        });
        this.lable_version.string = "\u5F53\u524D\u6E38\u620F\u7248\u672C" + AppInfo_1.AppInfo.version;
    };
    gameSet.prototype.start = function () {
        //console.log("tt当前版本号", AppInfo.version);
    };
    /**
     * 点击音效开关
     * @param event 点击的反馈
     * @param res 传参
     */
    gameSet.prototype.clickSound = function (event, res) {
        if (res == 0) {
            util_1.default.soundSet.bgm = util_1.default.soundSet.bgm == 1 ? 0 : 1;
            if (util_1.default.soundSet.bgm) {
                soundController_1.default.singleton.playBGM();
            }
            else {
                soundController_1.default.singleton.stopBGM();
            }
            this.BGMSprite.spriteFrame = this.switchSpriteFrame[util_1.default.soundSet.bgm];
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "\u8BBE\u7F6E\u5F39\u7A97",
                ck_module: "音乐"
            });
        }
        else {
            util_1.default.soundSet.sound = util_1.default.soundSet.sound == 1 ? 0 : 1;
            this.soundSprite.spriteFrame = this.switchSpriteFrame[util_1.default.soundSet.sound];
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "\u8BBE\u7F6E\u5F39\u7A97",
                ck_module: "音效"
            });
        }
    };
    gameSet.prototype.clickUserh5 = function () {
        soundController_1.default.singleton.clickAudio();
        XMSDK_1.default.launchSceneSdkPage({
            "type": "webview",
            "param": {
                "title": '用户协议',
                "isFullScreen": false,
                "htmlUrl": "http://ilovevideo.cn/callshow-front/agreements/term-service-fkdgs.html",
                "showTitle": true
            }
        });
        TrackMgr_1.default.AppViewScreen({
            app_page_title: "用户协议"
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u8BBE\u7F6E\u5F39\u7A97",
            ck_module: "用户协议"
        });
    };
    gameSet.prototype.clickPrivacyh5 = function () {
        soundController_1.default.singleton.clickAudio();
        XMSDK_1.default.launchSceneSdkPage({
            "type": "webview",
            "param": {
                "title": '隐私政策',
                "isFullScreen": false,
                "htmlUrl": "http://ilovevideo.cn/callshow-front/agreements/privacy-policy-fkdgs.html",
                "showTitle": true
            }
        });
        TrackMgr_1.default.AppViewScreen({
            app_page_title: "隐私政策"
        });
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u8BBE\u7F6E\u5F39\u7A97",
            ck_module: "隐私政策"
        });
    };
    gameSet.prototype.clickFanKui = function () {
        soundController_1.default.singleton.clickAudio();
        XMSDK_1.default.showCustomerService();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u8BBE\u7F6E\u5F39\u7A97",
            ck_module: "反馈建议"
        });
    };
    gameSet.prototype.clickRemoveMy = function () {
        soundController_1.default.singleton.clickAudio();
        XMSDK_1.default.cancelAccount();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u8BBE\u7F6E\u5F39\u7A97",
            ck_module: "注销账户"
        });
    };
    /**关闭页面 */
    gameSet.prototype.closeBtn = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u8BBE\u7F6E\u5F39\u7A97",
            ck_module: "关闭"
        });
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    __decorate([
        property({ type: cc.Sprite, displayName: "背景音效" })
    ], gameSet.prototype, "BGMSprite", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "普通音效" })
    ], gameSet.prototype, "soundSprite", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], displayName: "开关" })
    ], gameSet.prototype, "switchSpriteFrame", void 0);
    __decorate([
        property(cc.Label)
    ], gameSet.prototype, "lable_version", void 0);
    gameSet = __decorate([
        ccclass
    ], gameSet);
    return gameSet;
}(baseTs_1.default));
exports.default = gameSet;

cc._RF.pop();