"use strict";
cc._RF.push(module, '4a7f3/60GtFRI1aOmnchQ9m', 'soundController');
// Script/soundController.ts

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
var NameTs_1 = require("./common/NameTs");
var Tools_1 = require("./util/Tools");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var soundController = /** @class */ (function (_super) {
    __extends(soundController, _super);
    function soundController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Map = new Map();
        _this.isPlayMusic = false;
        _this.bgmId = null; //bgm创建id
        return _this;
    }
    soundController_1 = soundController;
    soundController.prototype.onLoad = function () {
        if (soundController_1.singleton === null) {
            soundController_1.singleton = this;
        }
    };
    soundController.prototype.initIsPlayMusic = function () {
        var isPlayAudio = Tools_1.Tools.getStorage("isPlayAudio");
        soundController_1.singleton.isPlayMusic = isPlayAudio || isPlayAudio == null ? true : false;
    };
    /**
     * 播放背景音乐
     */
    soundController.prototype.playBGM = function () {
        var _this = this;
        if (!this.isPlayMusic)
            return;
        if (this.bgmId !== null) {
            this.resumeBGM();
            return;
        }
        this.loadMusic(NameTs_1.default.Game_Music_BGM, function (res) {
            _this.bgmId = cc.audioEngine.play(res, true, 1);
        });
    };
    /**
     * 点击
     */
    soundController.prototype.clickAudio = function () {
        if (!this.isPlayMusic)
            return;
        this.playSound(NameTs_1.default.Game_Music_Click, false, 1);
    };
    /**
     * 播放死亡音效
     */
    soundController.prototype.playDeadAudio = function () {
        if (!this.isPlayMusic)
            return;
        this.playSound(NameTs_1.default.Game_Monster_Dead, false, 1);
    };
    /**
     * 播放音效
     */
    soundController.prototype.playMusic = function (name) {
        if (!this.isPlayMusic)
            return;
        this.playSound(name, false, 1);
    };
    /**
     * 暂停背景音乐
     */
    soundController.prototype.stopBGM = function () {
        cc.audioEngine.stop(this.bgmId);
    };
    /**
     * 恢复背景音乐
     */
    soundController.prototype.resumeBGM = function () {
        cc.audioEngine.resumeMusic();
    };
    /** 停止播放所有音效 包含音乐 */
    soundController.prototype.stopAllAudio = function () {
        this.stopBGM();
        cc.audioEngine.stopAll();
    };
    ;
    /**
     * 加载
     * @param Url 地址
     * @param call 回调
     */
    soundController.prototype.loadMusic = function (Url, call) {
        var _this = this;
        var successFn = function (data) {
            call(data);
        };
        if (this.Map.has(Url)) {
            var data = this.Map.get(Url);
            successFn(data.audio);
        }
        else {
            cc.resources.load(Url, cc.AudioClip, function (err, res) {
                if (err) {
                    console.error(err);
                    return;
                }
                _this.Map.set(Url, {
                    audio: res,
                    id: null
                });
                successFn(res);
            });
        }
    };
    /**
     * 播放音效
     * @param Url 地址
     * @param loop 是否循环
     * @param Volume 声音大小0-1
     */
    soundController.prototype.playSound = function (Url, loop, Volume) {
        if (!this.isPlayMusic)
            return;
        this.loadMusic(Url, function (res) {
            cc.audioEngine.play(res, loop, Volume);
        });
    };
    /**
     * 清理音效
     * @param Url 地址
     */
    soundController.prototype.clearSound = function (Url) {
        if (this.Map.has(Url)) {
            var audio = this.Map.get(Url);
            cc.audioEngine.uncache(audio.audio);
        }
    };
    /**
     * 清理所有音效
     */
    soundController.prototype.clearAllSound = function () {
        cc.audioEngine.uncacheAll();
    };
    /**
     * 暂停所有音效
     */
    soundController.prototype.stopAllSound = function () {
        cc.audioEngine.stopAllEffects();
    };
    /**
     * 暂停所有音效
     */
    soundController.prototype.resumeAllSound = function () {
        cc.audioEngine.resumeAllEffects();
    };
    var soundController_1;
    soundController.singleton = null;
    soundController = soundController_1 = __decorate([
        ccclass
    ], soundController);
    return soundController;
}(cc.Component));
exports.default = soundController;

cc._RF.pop();