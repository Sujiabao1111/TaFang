
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameSet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGdFQUErRDtBQUMvRCxxREFBZ0Q7QUFDaEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQU07SUFBM0M7UUFBQSxxRUE0SUM7UUF6SVcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3Qix1QkFBaUIsR0FBb0IsRUFBRSxDQUFDO1FBR3hDLG1CQUFhLEdBQVksSUFBSSxDQUFDOztRQStIdEMsaUJBQWlCO0lBQ3JCLENBQUM7SUE5SEcsS0FBSztJQUNMLHNCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsMEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZFLGtCQUFRLENBQUMsd0JBQXdCLENBQUM7WUFDOUIsZ0JBQWdCLEVBQUMsTUFBTTtTQUMxQixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyx5Q0FBUyxpQkFBTyxDQUFDLE9BQVMsQ0FBQztJQUMz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dXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBcHBJbmZvIH0gZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9Db25maWcvQXBwSW5mb1wiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVTZXQgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSxkaXNwbGF5TmFtZTpcIuiDjOaZr+mfs+aViFwifSlcbiAgICBwcml2YXRlIEJHTVNwcml0ZTpjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSxkaXNwbGF5TmFtZTpcIuaZrumAmumfs+aViFwifSlcbiAgICBwcml2YXRlIHNvdW5kU3ByaXRlOmNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6W2NjLlNwcml0ZUZyYW1lXSxkaXNwbGF5TmFtZTpcIuW8gOWFs1wifSlcbiAgICBwcml2YXRlIHN3aXRjaFNwcml0ZUZyYW1lOmNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYmxlX3ZlcnNpb246Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy/liJ3lp4vljJZcbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMuQkdNU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zd2l0Y2hTcHJpdGVGcmFtZVt1dGlsLnNvdW5kU2V0LmJnbV07XG4gICAgICAgIHRoaXMuc291bmRTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnN3aXRjaFNwcml0ZUZyYW1lW3V0aWwuc291bmRTZXQuc291bmRdO1xuICAgIH1cblxuICAgIG9uRW5hYmxlKCl7XG4gICAgICAgIHRoaXMuQkdNU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zd2l0Y2hTcHJpdGVGcmFtZVt1dGlsLnNvdW5kU2V0LmJnbV07XG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOlwi6K6+572u5by556qXXCJcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5sYWJsZV92ZXJzaW9uLnN0cmluZyA9IGDlvZPliY3muLjmiI/niYjmnKwke0FwcEluZm8udmVyc2lvbn1gO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInR05b2T5YmN54mI5pys5Y+3XCIsIEFwcEluZm8udmVyc2lvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog54K55Ye76Z+z5pWI5byA5YWzXG4gICAgICogQHBhcmFtIGV2ZW50IOeCueWHu+eahOWPjemmiFxuICAgICAqIEBwYXJhbSByZXMg5Lyg5Y+CXG4gICAgICovXG4gICAgY2xpY2tTb3VuZChldmVudCxyZXMpe1xuXG4gICAgICAgIGlmKHJlcz09MCl7XG4gICAgICAgICAgICB1dGlsLnNvdW5kU2V0LmJnbSA9IHV0aWwuc291bmRTZXQuYmdtPT0xPzA6MTtcbiAgICAgICAgICAgIGlmKHV0aWwuc291bmRTZXQuYmdtKXtcbiAgICAgICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLnBsYXlCR00oKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uc3RvcEJHTSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5CR01TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnN3aXRjaFNwcml0ZUZyYW1lW3V0aWwuc291bmRTZXQuYmdtXTtcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDorr7nva7lvLnnqpdgLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLpn7PkuZBcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB1dGlsLnNvdW5kU2V0LnNvdW5kID0gdXRpbC5zb3VuZFNldC5zb3VuZD09MT8wOjE7XG4gICAgICAgICAgICB0aGlzLnNvdW5kU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zd2l0Y2hTcHJpdGVGcmFtZVt1dGlsLnNvdW5kU2V0LnNvdW5kXTtcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDorr7nva7lvLnnqpdgLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLpn7PmlYhcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY2xpY2tVc2VyaDUoKSB7ICAgICAgICBcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7ICAgIFxuICAgICAgICBYTVNESy5sYXVuY2hTY2VuZVNka1BhZ2Uoe1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwid2Vidmlld1wiLFxuICAgICAgICAgICAgXCJwYXJhbVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOifnlKjmiLfljY/orq4nLFxuICAgICAgICAgICAgICAgIFwiaXNGdWxsU2NyZWVuXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIFwiaHRtbFVybFwiOiBgaHR0cDovL2lsb3ZldmlkZW8uY24vY2FsbHNob3ctZnJvbnQvYWdyZWVtZW50cy90ZXJtLXNlcnZpY2UtZmtkZ3MuaHRtbGAsXG4gICAgICAgICAgICAgICAgXCJzaG93VGl0bGVcIjogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgVHJhY2tNZ3IuQXBwVmlld1NjcmVlbih7XG4gICAgICAgICAgICBhcHBfcGFnZV90aXRsZTogXCLnlKjmiLfljY/orq5cIlxuICAgICAgICB9KVxuXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDorr7nva7lvLnnqpdgLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIueUqOaIt+WNj+iurlwiXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2xpY2tQcml2YWN5aDUoKSB7ICAgICAgICBcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7ICAgIFxuICAgICAgICBYTVNESy5sYXVuY2hTY2VuZVNka1BhZ2Uoe1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwid2Vidmlld1wiLFxuICAgICAgICAgICAgXCJwYXJhbVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOifpmpDnp4HmlL/nrZYnLFxuICAgICAgICAgICAgICAgIFwiaXNGdWxsU2NyZWVuXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIFwiaHRtbFVybFwiOiBgaHR0cDovL2lsb3ZldmlkZW8uY24vY2FsbHNob3ctZnJvbnQvYWdyZWVtZW50cy9wcml2YWN5LXBvbGljeS1ma2Rncy5odG1sYCxcbiAgICAgICAgICAgICAgICBcInNob3dUaXRsZVwiOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBUcmFja01nci5BcHBWaWV3U2NyZWVuKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIumakOengeaUv+etllwiXG4gICAgICAgIH0pXG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOiuvue9ruW8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi6ZqQ56eB5pS/562WXCJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjbGlja0Zhbkt1aSgpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIFhNU0RLLnNob3dDdXN0b21lclNlcnZpY2UoKTsgICAgIFxuICAgICAgICBcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOiuvue9ruW8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5Y+N6aaI5bu66K6uXCJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjbGlja1JlbW92ZU15KCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgWE1TREsuY2FuY2VsQWNjb3VudCgpOyAgICAgXG4gICAgICAgIFxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg6K6+572u5by556qXYCxcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLms6jplIDotKbmiLdcIlxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKuWFs+mXremhtemdoiAqL1xuICAgIGNsb3NlQnRuKCl7XG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDorr7nva7lvLnnqpdgLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuWFs+mXrVwiXG4gICAgICAgIH0pXG5cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==