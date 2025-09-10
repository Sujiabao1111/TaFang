
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/soundController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzb3VuZENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXFDO0FBQ3JDLHNDQUFxQztBQUUvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQWdLQztRQTlKVyxTQUFHLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7UUFJbkMsaUJBQVcsR0FBRyxLQUFLLENBQUM7UUFFbkIsV0FBSyxHQUFHLElBQUksQ0FBQyxDQUFNLFNBQVM7O0lBd0p4QyxDQUFDO3dCQWhLb0IsZUFBZTtJQVVoQyxnQ0FBTSxHQUFOO1FBRUksSUFBSSxpQkFBZSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDcEMsaUJBQWUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVNLHlDQUFlLEdBQXRCO1FBQ0ksSUFBSSxXQUFXLEdBQUcsYUFBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRCxpQkFBZSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlGLENBQUM7SUFFRDs7T0FFRztJQUNJLGlDQUFPLEdBQWQ7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBTSxDQUFDLGNBQWMsRUFBRSxVQUFDLEdBQUc7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R0FBVixVQUFXLEdBQVc7UUFFbEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUVuQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU5QixFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx1Q0FBYSxHQUFiO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQ0FBWSxHQUFaO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3Q0FBYyxHQUFkO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3RDLENBQUM7O0lBMUphLHlCQUFTLEdBQW9CLElBQUksQ0FBQztJQUovQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBZ0tuQztJQUFELHNCQUFDO0NBaEtELEFBZ0tDLENBaEs0QyxFQUFFLENBQUMsU0FBUyxHQWdLeEQ7a0JBaEtvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuL3V0aWwvVG9vbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNvdW5kQ29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIE1hcDogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBzdGF0aWMgc2luZ2xldG9uOiBzb3VuZENvbnRyb2xsZXIgPSBudWxsO1xuXG4gICAgcHVibGljIGlzUGxheU11c2ljID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGJnbUlkID0gbnVsbDsgICAgICAvL2JnbeWIm+W7umlkXG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgaWYgKHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24gPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRJc1BsYXlNdXNpYygpIHtcbiAgICAgICAgbGV0IGlzUGxheUF1ZGlvID0gVG9vbHMuZ2V0U3RvcmFnZShcImlzUGxheUF1ZGlvXCIpO1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmlzUGxheU11c2ljID0gaXNQbGF5QXVkaW8gfHwgaXNQbGF5QXVkaW8gPT0gbnVsbCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7og4zmma/pn7PkuZBcbiAgICAgKi9cbiAgICBwdWJsaWMgcGxheUJHTSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheU11c2ljKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmJnbUlkICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VtZUJHTSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZE11c2ljKE5hbWVUcy5HYW1lX011c2ljX0JHTSwgKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5iZ21JZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkocmVzLCB0cnVlLCAxKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog54K55Ye7XG4gICAgICovXG4gICAgcHVibGljIGNsaWNrQXVkaW8oKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlNdXNpYykgcmV0dXJuO1xuICAgICAgICB0aGlzLnBsYXlTb3VuZChOYW1lVHMuR2FtZV9NdXNpY19DbGljaywgZmFsc2UsIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaSreaUvuatu+S6oemfs+aViFxuICAgICAqL1xuICAgIHB1YmxpYyBwbGF5RGVhZEF1ZGlvKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5TXVzaWMpIHJldHVybjtcbiAgICAgICAgdGhpcy5wbGF5U291bmQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9EZWFkLCBmYWxzZSwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+6Z+z5pWIXG4gICAgICovXG4gICAgcHVibGljIHBsYXlNdXNpYyhuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheU11c2ljKSByZXR1cm47XG4gICAgICAgIHRoaXMucGxheVNvdW5kKG5hbWUsIGZhbHNlLCAxKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOaaguWBnOiDjOaZr+mfs+S5kFxuICAgICAqL1xuICAgIHB1YmxpYyBzdG9wQkdNKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wKHRoaXMuYmdtSWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmgaLlpI3og4zmma/pn7PkuZBcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVzdW1lQkdNKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpO1xuICAgIH1cblxuXG4gICAgLyoqIOWBnOatouaSreaUvuaJgOaciemfs+aViCDljIXlkKvpn7PkuZAgKi9cbiAgICBwdWJsaWMgc3RvcEFsbEF1ZGlvKCkge1xuICAgICAgICB0aGlzLnN0b3BCR00oKTtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiDliqDovb1cbiAgICAgKiBAcGFyYW0gVXJsIOWcsOWdgFxuICAgICAqIEBwYXJhbSBjYWxsIOWbnuiwg1xuICAgICAqL1xuICAgIGxvYWRNdXNpYyhVcmw6IHN0cmluZywgY2FsbDogRnVuY3Rpb24pIHtcblxuICAgICAgICBsZXQgc3VjY2Vzc0ZuID0gKGRhdGE6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xuICAgICAgICAgICAgY2FsbChkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLk1hcC5oYXMoVXJsKSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLk1hcC5nZXQoVXJsKTtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbihkYXRhLmF1ZGlvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFVybCwgY2MuQXVkaW9DbGlwLCAoZXJyLCByZXM6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5NYXAuc2V0KFVybCwge1xuICAgICAgICAgICAgICAgICAgICBhdWRpbzogcmVzLFxuICAgICAgICAgICAgICAgICAgICBpZDogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbihyZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+6Z+z5pWIXG4gICAgICogQHBhcmFtIFVybCDlnLDlnYBcbiAgICAgKiBAcGFyYW0gbG9vcCDmmK/lkKblvqrnjq9cbiAgICAgKiBAcGFyYW0gVm9sdW1lIOWjsOmfs+Wkp+WwjzAtMVxuICAgICAqL1xuICAgIHBsYXlTb3VuZChVcmw6IHN0cmluZywgbG9vcDogYm9vbGVhbiwgVm9sdW1lOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheU11c2ljKSByZXR1cm47XG4gICAgICAgIHRoaXMubG9hZE11c2ljKFVybCwgKHJlcykgPT4ge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShyZXMsIGxvb3AsIFZvbHVtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4heeQhumfs+aViFxuICAgICAqIEBwYXJhbSBVcmwg5Zyw5Z2AXG4gICAgICovXG4gICAgY2xlYXJTb3VuZChVcmw6IHN0cmluZykge1xuXG4gICAgICAgIGlmICh0aGlzLk1hcC5oYXMoVXJsKSkge1xuXG4gICAgICAgICAgICBsZXQgYXVkaW8gPSB0aGlzLk1hcC5nZXQoVXJsKTtcblxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUudW5jYWNoZShhdWRpby5hdWRpbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuIXnkIbmiYDmnInpn7PmlYhcbiAgICAgKi9cbiAgICBjbGVhckFsbFNvdW5kKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS51bmNhY2hlQWxsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pqC5YGc5omA5pyJ6Z+z5pWIXG4gICAgICovXG4gICAgc3RvcEFsbFNvdW5kKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsRWZmZWN0cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaaguWBnOaJgOaciemfs+aViFxuICAgICAqL1xuICAgIHJlc3VtZUFsbFNvdW5kKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGxFZmZlY3RzKCk7XG4gICAgfVxuXG59XG4iXX0=