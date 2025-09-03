
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
var NameTs_1 = require("./common/NameTs");
var util_1 = require("./util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var soundController = /** @class */ (function (_super) {
    __extends(soundController, _super);
    function soundController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Map = new Map();
        return _this;
    }
    soundController_1 = soundController;
    soundController.prototype.onLoad = function () {
        if (soundController_1.singleton === null) {
            soundController_1.singleton = this;
        }
        else {
            return;
        }
    };
    /**
     * 播放背景音乐
     */
    soundController.prototype.playBGM = function () {
        var _this = this;
        if (util_1.default && util_1.default.soundSet) {
            if (util_1.default.soundSet.bgm != 0) {
                this.loadMusic(NameTs_1.default.Game_Music_BGM, function (res) {
                    _this.bgmId = cc.audioEngine.play(res, true, 1);
                });
            }
            else if (cc.audioEngine.getState(soundController_1.singleton.bgmId) < 0) {
                this.loadMusic(NameTs_1.default.Game_Music_BGM, function (res) {
                    _this.bgmId = cc.audioEngine.play(res, true, 1);
                });
            }
        }
    };
    /**
     * 点击
     */
    soundController.prototype.clickAudio = function () {
        if (!util_1.default.soundSet.sound)
            return;
        this.playSound(NameTs_1.default.Game_Music_Click, false, 1);
    };
    /**
     * 播放死亡音效
     */
    soundController.prototype.playDeadAudio = function () {
        if (!util_1.default.soundSet.sound)
            return;
        this.playSound(NameTs_1.default.Game_Monster_Dead, false, 1);
    };
    /**
     * 播放音效
     */
    soundController.prototype.playMusic = function (name) {
        if (!util_1.default.soundSet.sound)
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
        if (!soundController_1.isPlayMusic)
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
    soundController.isPlayMusic = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzb3VuZENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXFDO0FBQ3JDLG9DQUErQjtBQUV6QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQWlLQztRQS9KVyxTQUFHLEdBQW1CLElBQUksR0FBRyxFQUFFLENBQUM7O0lBK0o1QyxDQUFDO3dCQWpLb0IsZUFBZTtJQVVoQyxnQ0FBTSxHQUFOO1FBRUksSUFBRyxpQkFBZSxDQUFDLFNBQVMsS0FBRyxJQUFJLEVBQUM7WUFDaEMsaUJBQWUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO2FBQUk7WUFDRCxPQUFPO1NBQ1Y7SUFFTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQ0FBTyxHQUFQO1FBQUEsaUJBYUM7UUFaRyxJQUFHLGNBQUksSUFBSSxjQUFJLENBQUMsUUFBUSxFQUFDO1lBQ3JCLElBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFDO2dCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFNLENBQUMsY0FBYyxFQUFDLFVBQUMsR0FBRztvQkFDckMsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUNJLElBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsaUJBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFNLENBQUMsY0FBYyxFQUFDLFVBQUMsR0FBRztvQkFD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LEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFOUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUNBQWEsR0FBYjtRQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsc0NBQVksR0FBWjtRQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsd0NBQWMsR0FBZDtRQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN0QyxDQUFDOztJQTNKYSx5QkFBUyxHQUFtQixJQUFJLENBQUM7SUFFakMsMkJBQVcsR0FBRyxLQUFLLENBQUM7SUFOakIsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQWlLbkM7SUFBRCxzQkFBQztDQWpLRCxBQWlLQyxDQWpLNEMsRUFBRSxDQUFDLFNBQVMsR0FpS3hEO2tCQWpLb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYW1lVHMgZnJvbSBcIi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc291bmRDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgTWFwOk1hcDxzdHJpbmcsYW55PiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBzdGF0aWMgc2luZ2xldG9uOnNvdW5kQ29udHJvbGxlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzUGxheU11c2ljID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGJnbUlkOyAgICAgIC8vYmdt5Yib5bu6aWRcblxuICAgIG9uTG9hZCgpe1xuXG4gICAgICAgIGlmKHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b249PT1udWxsKXtcbiAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24gPSB0aGlzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+6IOM5pmv6Z+z5LmQXG4gICAgICovXG4gICAgcGxheUJHTSgpe1xuICAgICAgICBpZih1dGlsICYmIHV0aWwuc291bmRTZXQpeyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodXRpbC5zb3VuZFNldC5iZ20gIT0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTXVzaWMoTmFtZVRzLkdhbWVfTXVzaWNfQkdNLChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmdtSWQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KHJlcyx0cnVlLDEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjYy5hdWRpb0VuZ2luZS5nZXRTdGF0ZShzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmJnbUlkKSA8IDApe1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZE11c2ljKE5hbWVUcy5HYW1lX011c2ljX0JHTSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnbUlkID0gY2MuYXVkaW9FbmdpbmUucGxheShyZXMsdHJ1ZSwxKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeCueWHu1xuICAgICAqL1xuICAgIGNsaWNrQXVkaW8oKXtcbiAgICAgICAgaWYoIXV0aWwuc291bmRTZXQuc291bmQpcmV0dXJuOyAgICAgICAgICAgIFxuXG4gICAgICAgIHRoaXMucGxheVNvdW5kKE5hbWVUcy5HYW1lX011c2ljX0NsaWNrLCBmYWxzZSwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+5q275Lqh6Z+z5pWIXG4gICAgICovXG4gICAgcGxheURlYWRBdWRpbygpe1xuICAgICAgICBpZighdXRpbC5zb3VuZFNldC5zb3VuZClyZXR1cm47ICAgICAgICAgICAgXG5cbiAgICAgICAgdGhpcy5wbGF5U291bmQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9EZWFkLCBmYWxzZSwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+6Z+z5pWIXG4gICAgICovXG4gICAgcGxheU11c2ljKG5hbWU6c3RyaW5nKXtcbiAgICAgICAgaWYoIXV0aWwuc291bmRTZXQuc291bmQpcmV0dXJuOyAgICAgICAgICAgIFxuXG4gICAgICAgIHRoaXMucGxheVNvdW5kKG5hbWUsIGZhbHNlLCAxKTtcbiAgICB9XG4gICAgXG5cblxuICAgIFxuICAgIC8qKlxuICAgICAqIOaaguWBnOiDjOaZr+mfs+S5kFxuICAgICAqL1xuICAgIHN0b3BCR00oKXtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmJnbUlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5oGi5aSN6IOM5pmv6Z+z5LmQXG4gICAgICovXG4gICAgcmVzdW1lQkdNKCl7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L29XG4gICAgICogQHBhcmFtIFVybCDlnLDlnYBcbiAgICAgKiBAcGFyYW0gY2FsbCDlm57osINcbiAgICAgKi9cbiAgICBsb2FkTXVzaWMoVXJsOnN0cmluZyxjYWxsOkZ1bmN0aW9uKXtcblxuICAgICAgICBsZXQgc3VjY2Vzc0ZuID0gKGRhdGE6Y2MuQXVkaW9DbGlwKT0+e1xuICAgICAgICAgICAgY2FsbChkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuTWFwLmhhcyhVcmwpKXtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5NYXAuZ2V0KFVybCk7XG4gICAgICAgICAgICBzdWNjZXNzRm4oZGF0YS5hdWRpbyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoVXJsLGNjLkF1ZGlvQ2xpcCwoZXJyLHJlczpjYy5BdWRpb0NsaXApPT57XG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5NYXAuc2V0KFVybCx7XG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvOnJlcyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6bnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbihyZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7pn7PmlYhcbiAgICAgKiBAcGFyYW0gVXJsIOWcsOWdgFxuICAgICAqIEBwYXJhbSBsb29wIOaYr+WQpuW+queOr1xuICAgICAqIEBwYXJhbSBWb2x1bWUg5aOw6Z+z5aSn5bCPMC0xXG4gICAgICovXG4gICAgcGxheVNvdW5kKFVybDpzdHJpbmcsbG9vcDpib29sZWFuLFZvbHVtZTpudW1iZXIpe1xuICAgICAgICBpZighc291bmRDb250cm9sbGVyLmlzUGxheU11c2ljKSAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5sb2FkTXVzaWMoVXJsLChyZXMpPT57XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHJlcywgbG9vcCxWb2x1bWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuIXnkIbpn7PmlYhcbiAgICAgKiBAcGFyYW0gVXJsIOWcsOWdgFxuICAgICAqL1xuICAgIGNsZWFyU291bmQoVXJsOnN0cmluZyl7XG5cbiAgICAgICAgaWYodGhpcy5NYXAuaGFzKFVybCkpe1xuXG4gICAgICAgICAgICBsZXQgYXVkaW8gPSB0aGlzLk1hcC5nZXQoVXJsKTtcblxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUudW5jYWNoZShhdWRpby5hdWRpbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuIXnkIbmiYDmnInpn7PmlYhcbiAgICAgKi9cbiAgICBjbGVhckFsbFNvdW5kKCl7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnVuY2FjaGVBbGwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmoLlgZzmiYDmnInpn7PmlYhcbiAgICAgKi9cbiAgICBzdG9wQWxsU291bmQoKXtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbEVmZmVjdHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmoLlgZzmiYDmnInpn7PmlYhcbiAgICAgKi9cbiAgICByZXN1bWVBbGxTb3VuZCgpe1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGxFZmZlY3RzKCk7XG4gICAgfVxuXG59XG4iXX0=