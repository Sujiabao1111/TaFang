"use strict";
cc._RF.push(module, '26c8aN9C9BEZYNdGYXhzmUO', 'gameSet');
// Script/pop/gameSet.ts

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
var baseTs_1 = require("../base/baseTs");
var LanguageData_1 = require("../Language/LanguageData");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameSet = /** @class */ (function (_super) {
    __extends(gameSet, _super);
    function gameSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_sfx = null;
        _this.languageLayout = null;
        _this.lable_version = null;
        return _this;
    }
    gameSet.prototype.onLoad = function () {
        this.setLanguageState();
        this.setSfxBtnState();
    };
    /**
     * 点击音效开关
     * @param event 点击的反馈
     * @param res 传参
     */
    gameSet.prototype.clickSound = function (toggle) {
        console.log("set_sfx_btn", toggle.isChecked);
        Tools_1.Tools.setStorage("isPlayAudio", toggle.isChecked ? 1 : 0);
        soundController_1.default.singleton.isPlayMusic = toggle.isChecked;
        if (!toggle.isChecked) {
            soundController_1.default.singleton.stopAllAudio();
        }
        else {
            soundController_1.default.singleton.playBGM();
        }
        soundController_1.default.singleton.clickAudio();
        this.setSfxBtnState();
    };
    gameSet.prototype.setSfxBtnState = function () {
        var isPlayAudio = Tools_1.Tools.getStorage("isPlayAudio");
        console.log("set_sfx_isPlayAudio:", isPlayAudio);
        var isChecked = isPlayAudio || isPlayAudio == null ? true : false;
        console.log("set_sfx_toggle.isChecked:", isChecked);
        this.btn_sfx.getComponent(cc.Toggle).isChecked = isChecked;
    };
    /**
       * 设置语言
       *
       * @param e 事件对象
       * @param lang 语言类型，字符串类型
       */
    gameSet.prototype.set_Language = function (e, lang) {
        soundController_1.default.singleton.clickAudio();
        Tools_1.Tools.setStorage("LanguageType", Number(lang));
        this.setLanguageState();
    };
    gameSet.prototype.setLanguageState = function () {
        var languageType = Tools_1.Tools.getStorage("LanguageType");
        var index = languageType == undefined || languageType == null ? 1 : languageType;
        for (var i = 0; i < this.languageLayout.children.length; i++) {
            this.languageLayout.children[i].getComponent(cc.Toggle).isChecked = index == i;
            console.log("isChecked", this.languageLayout.children[i].getComponent(cc.Toggle).isChecked);
        }
        LanguageData_1.setLanguage(Number(index));
    };
    /**关闭页面 */
    gameSet.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    __decorate([
        property({ type: cc.Node, tooltip: "音效" })
    ], gameSet.prototype, "btn_sfx", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "语种" })
    ], gameSet.prototype, "languageLayout", void 0);
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