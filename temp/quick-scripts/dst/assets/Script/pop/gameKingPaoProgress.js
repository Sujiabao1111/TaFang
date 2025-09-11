
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameKingPaoProgress.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c9512DavoBD8K0pHX1Z9rjD', 'gameKingPaoProgress');
// Script/pop/gameKingPaoProgress.ts

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
var pageTs_1 = require("../common/pageTs");
var PageManage_1 = require("../PageManage");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameKingPaoProgress = /** @class */ (function (_super) {
    __extends(gameKingPaoProgress, _super);
    function gameKingPaoProgress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.img_videoIcon = null;
        _this.lable_btnType = null;
        _this.lable_progress = null;
        _this.lable_progressTip = null;
        _this.kingPaoPressData = null;
        return _this;
    }
    gameKingPaoProgress.prototype.start = function () {
    };
    gameKingPaoProgress.prototype.onEnable = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "\u767E\u4E07\u5206\u7EA2"
        });
    };
    gameKingPaoProgress.prototype.init = function (data) {
        this.kingPaoPressData = data;
        this.img_videoIcon.active = false;
        this.lable_btnType.x = 0;
        if (data.status == 1) {
            this.lable_progress.string = "<color=#BB420E>\u7D2F\u8BA1\u6253\u5361" + data.processTarget + "\u5929(</c><color=#669E00>" + data.process + "</color><color=#BB420E>/" + data.processTarget + ")</color>";
            this.img_videoIcon.active = true;
            this.lable_btnType.x = 29;
            this.lable_btnType.getComponent(cc.Label).string = "\u6253\u5361";
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "打卡任务弹窗"
            });
        }
        else if (data.status == 2) {
            this.lable_progress.string = "<color=#BB420E>\u7D2F\u8BA1\u7B7E\u5230" + data.processTarget + "\u5929(</c><color=#669E00>" + data.process + "</color><color=#BB420E>/" + data.processTarget + ")</color>";
            this.lable_btnType.getComponent(cc.Label).string = "\u53BB\u7B7E\u5230";
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "签到任务弹窗"
            });
        }
        else if (data.status == 3) {
            this.lable_progress.string = "<color=#BB420E>\u901A\u8FC7" + data.processTarget + "\u5173(</c><color=#669E00>" + data.process + "</color><color=#BB420E>/" + data.processTarget + ")</color>";
            this.lable_btnType.getComponent(cc.Label).string = "\u53BB\u95EF\u5173";
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "通关任务弹窗"
            });
        }
        else if (data.status == 4) {
            this.lable_progress.string = "<color=#BB420E>\u7D2F\u8BA1\u89C2\u770B\u89C6\u9891" + data.processTarget + "\u4E2A(</c><color=#669E00>" + data.process + "</color><color=#BB420E>/" + data.processTarget + ")</color>";
            this.lable_btnType.getComponent(cc.Label).string = "\u53BB\u5B8C\u6210";
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "\u770B" + data.processTarget + "\u4E2A\u89C6\u9891\u4EFB\u52A1\u5F39\u7A97"
            });
        }
        else {
            this.closePage();
            return;
        }
        this.lable_progressTip.string = "<color=#D26C41>\u5373\u53EF\u589E\u52A0</c><color=#F92222>" + data.percent + "%</color><color=#D26C41>\u8FDB\u5EA6</color>";
    };
    gameKingPaoProgress.prototype.updateData = function () {
        var _this = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.kingPaoProgress,
            onSuccess: function (res) {
                if (res.code === 0 && res.data) {
                    if (!_this.isValid) {
                        return;
                    }
                    _this.init(res.data);
                }
                else {
                    if (res) {
                        AssistCtr_1.AssistCtr.showToastTip(res.message);
                    }
                }
            },
            onFail: function (err) {
            }
        });
    };
    gameKingPaoProgress.prototype.clickOk = function () {
        var _this = this;
        if (this.kingPaoPressData) {
            if (this.kingPaoPressData.status != 4) {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: this.lable_btnType.getComponent(cc.Label).string + "\u4EFB\u52A1\u5F39\u7A97",
                    ck_module: "" + this.lable_btnType.getComponent(cc.Label).string
                });
            }
            else {
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "\u770B500\u89C6\u9891\u4EFB\u52A1\u5F39\u7A97\u5F39\u7A97",
                    ck_module: "\u53BB\u5B8C\u6210"
                });
            }
            if (this.kingPaoPressData.status == 1) {
                // AdController.loadAd(AdPosition.kingTaskSign, (res) => {
                if (this && this.kingPaoPressData) {
                    XMSDK_1.default.post({
                        url: UrlConst_1.UrlConst.kingPaoOpen,
                        data: {
                            status: this.kingPaoPressData.status
                        },
                        onSuccess: function (res) {
                            if (res.code === 0) {
                                if (!_this.isValid) {
                                    return;
                                }
                                AssistCtr_1.AssistCtr.showToastTip("\u4ECA\u65E5\u6253\u5361\u6210\u529F!\u660E\u65E5\u518D\u6765\u54E6~");
                                _this.closePage();
                                cc.game.emit(NameTs_1.default.Game_KingPaoTask_Update);
                            }
                            else {
                                if (res) {
                                    AssistCtr_1.AssistCtr.showToastTip(res.message);
                                }
                            }
                        },
                        onFail: function (err) {
                        }
                    });
                }
                // }, () => {
                //     AssistCtr.showToastTip("加载视频失败，请稍后！");
                // })     
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "打卡任务弹窗",
                    ck_module: "打卡",
                    active_ad_hcdg: "激励视频"
                });
            }
            else if (this.kingPaoPressData.status == 2) {
                cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameSign);
                this.closePage();
            }
            else {
                this.closePage();
                if (PageManage_1.default.singleton.findPage(pageTs_1.default.pageName.GameKingPao)) {
                    PageManage_1.default.singleton.closePage(pageTs_1.default.pageName.GameKingPao, false);
                }
            }
        }
    };
    gameKingPaoProgress.prototype.clickClose = function () {
        if (this.kingPaoPressData.status != 4) {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: this.lable_btnType.getComponent(cc.Label).string + "\u4EFB\u52A1\u5F39\u7A97",
                ck_module: "关闭"
            });
        }
        else {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "\u770B500\u89C6\u9891\u4EFB\u52A1\u5F39\u7A97\u5F39\u7A97",
                ck_module: "\u5173\u95ED"
            });
        }
        this.closePage();
    };
    __decorate([
        property(cc.Node)
    ], gameKingPaoProgress.prototype, "img_videoIcon", void 0);
    __decorate([
        property(cc.Node)
    ], gameKingPaoProgress.prototype, "lable_btnType", void 0);
    __decorate([
        property(cc.RichText)
    ], gameKingPaoProgress.prototype, "lable_progress", void 0);
    __decorate([
        property(cc.RichText)
    ], gameKingPaoProgress.prototype, "lable_progressTip", void 0);
    gameKingPaoProgress = __decorate([
        ccclass
    ], gameKingPaoProgress);
    return gameKingPaoProgress;
}(baseTs_1.default));
exports.default = gameKingPaoProgress;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVLaW5nUGFvUHJvZ3Jlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUVwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLDRDQUF1QztBQUN2QywrQ0FBOEM7QUFFOUMscURBQWdEO0FBQ2hELGlEQUE0QztBQVd0QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFpRCx1Q0FBTTtJQUF2RDtRQUFBLHFFQXFMQztRQWxMRyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixvQkFBYyxHQUFnQixJQUFJLENBQUM7UUFHbkMsdUJBQWlCLEdBQWdCLElBQUksQ0FBQztRQUV0QyxzQkFBZ0IsR0FBcUIsSUFBSSxDQUFDOztJQXVLOUMsQ0FBQztJQXJLRyxtQ0FBSyxHQUFMO0lBRUEsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxrQkFBUSxDQUFDLHdCQUF3QixDQUFDO1lBQzlCLGdCQUFnQixFQUFFLDBCQUFNO1NBQzNCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxrQ0FBSSxHQUFKLFVBQUssSUFBc0I7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsNENBQXNCLElBQUksQ0FBQyxhQUFhLGtDQUF3QixJQUFJLENBQUMsT0FBTyxnQ0FBMkIsSUFB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QUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sNkJBQU07Z0JBQzNFLFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQTtTQUVMO2FBQ0k7WUFDRCxrQkFBUSxDQUFDLG1CQUFtQixDQUFDO2dCQUN6QixnQkFBZ0IsRUFBRSwyREFBYztnQkFDaEMsU0FBUyxFQUFFLGNBQUk7YUFDbEIsQ0FBQyxDQUFBO1NBQ0w7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQWpMRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OERBQ1k7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrREFDYTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2tFQUNnQjtJQVpyQixtQkFBbUI7UUFEdkMsT0FBTztPQUNhLG1CQUFtQixDQXFMdkM7SUFBRCwwQkFBQztDQXJMRCxBQXFMQyxDQXJMZ0QsZ0JBQU0sR0FxTHREO2tCQXJMb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcclxuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4uL1BhZ2VNYW5hZ2VcIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBraW5nUGFvUHJlc3NEYXRhIHtcclxuICAgIHBlcmNlbnQ6IG51bWJlciwgICAgICAgICAgICAgICAgLy/ov5vluqbnmb7liIbmr5RcclxuICAgIHByb2Nlc3M6IG51bWJlciwgICAgICAgICAgICAgICAgLy/ku7vliqHov5vluqZcclxuICAgIHByb2Nlc3NUYXJnZXQ6IG51bWJlciwgICAgICAgICAgLy/ku7vliqHmgLvnm67moIdcclxuICAgIHN0YXR1czogbnVtYmVyLCAgICAgICAgICAgICAgICAgIC8v5Lu75Yqh54q25oCB77yaMO+8muaXoOeKtuaAge+8mzHvvJrmiZPljaHku7vliqHvvJsyOuetvuWIsOS7u+WKoe+8mzPvvJrpgJrlhbPku7vliqHvvJs077ya55yL6KeG6aKR5Lu75YqhXHJcbiAgICBzaWduOiBib29sZWFuLCAgICAgICAgICAgICAgICAgICAvL+W9k+aYr+aJk+WNoeS7u+WKoeeahOaXtuWAmemAgueUqO+8jOaYr+WQpuaJk+WNoVxyXG59XHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVLaW5nUGFvUHJvZ3Jlc3MgZXh0ZW5kcyBiYXNlVHMge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaW1nX3ZpZGVvSWNvbjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsYWJsZV9idG5UeXBlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBsYWJsZV9wcm9ncmVzczogY2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGxhYmxlX3Byb2dyZXNzVGlwOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAga2luZ1Bhb1ByZXNzRGF0YToga2luZ1Bhb1ByZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnmb7kuIfliIbnuqJgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGRhdGE6IGtpbmdQYW9QcmVzc0RhdGEpIHtcclxuICAgICAgICB0aGlzLmtpbmdQYW9QcmVzc0RhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuaW1nX3ZpZGVvSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxhYmxlX2J0blR5cGUueCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfcHJvZ3Jlc3Muc3RyaW5nID0gYDxjb2xvcj0jQkI0MjBFPue0r+iuoeaJk+WNoSR7ZGF0YS5wcm9jZXNzVGFyZ2V0feWkqSg8L2M+PGNvbG9yPSM2NjlFMDA+JHtkYXRhLnByb2Nlc3N9PC9jb2xvcj48Y29sb3I9I0JCNDIwRT4vJHtkYXRhLnByb2Nlc3NUYXJnZXR9KTwvY29sb3I+YFxyXG4gICAgICAgICAgICB0aGlzLmltZ192aWRlb0ljb24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9idG5UeXBlLnggPSAyOTtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9idG5UeXBlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOaJk+WNoWA7XHJcblxyXG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmiZPljaHku7vliqHlvLnnqpdcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnN0YXR1cyA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfcHJvZ3Jlc3Muc3RyaW5nID0gYDxjb2xvcj0jQkI0MjBFPue0r+iuoeetvuWIsCR7ZGF0YS5wcm9jZXNzVGFyZ2V0feWkqSg8L2M+PGNvbG9yPSM2NjlFMDA+JHtkYXRhLnByb2Nlc3N9PC9jb2xvcj48Y29sb3I9I0JCNDIwRT4vJHtkYXRhLnByb2Nlc3NUYXJnZXR9KTwvY29sb3I+YDtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9idG5UeXBlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOWOu+etvuWIsGA7XHJcblxyXG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLnrb7liLDku7vliqHlvLnnqpdcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnN0YXR1cyA9PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfcHJvZ3Jlc3Muc3RyaW5nID0gYDxjb2xvcj0jQkI0MjBFPumAmui/hyR7ZGF0YS5wcm9jZXNzVGFyZ2V0feWFsyg8L2M+PGNvbG9yPSM2NjlFMDA+JHtkYXRhLnByb2Nlc3N9PC9jb2xvcj48Y29sb3I9I0JCNDIwRT4vJHtkYXRhLnByb2Nlc3NUYXJnZXR9KTwvY29sb3I+YDtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9idG5UeXBlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOWOu+mXr+WFs2A7XHJcblxyXG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLpgJrlhbPku7vliqHlvLnnqpdcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnN0YXR1cyA9PSA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfcHJvZ3Jlc3Muc3RyaW5nID0gYDxjb2xvcj0jQkI0MjBFPue0r+iuoeingueci+inhumikSR7ZGF0YS5wcm9jZXNzVGFyZ2V0feS4qig8L2M+PGNvbG9yPSM2NjlFMDA+JHtkYXRhLnByb2Nlc3N9PC9jb2xvcj48Y29sb3I9I0JCNDIwRT4vJHtkYXRhLnByb2Nlc3NUYXJnZXR9KTwvY29sb3I+YFxyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX2J0blR5cGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5Y675a6M5oiQYDtcclxuXHJcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg55yLJHtkYXRhLnByb2Nlc3NUYXJnZXR95Liq6KeG6aKR5Lu75Yqh5by556qXYFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhYmxlX3Byb2dyZXNzVGlwLnN0cmluZyA9IGA8Y29sb3I9I0QyNkM0MT7ljbPlj6/lop7liqA8L2M+PGNvbG9yPSNGOTIyMjI+JHtkYXRhLnBlcmNlbnR9JTwvY29sb3I+PGNvbG9yPSNEMjZDNDE+6L+b5bqmPC9jb2xvcj5gXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGF0YSgpIHtcclxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5raW5nUGFvUHJvZ3Jlc3MsXHJcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdChyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAocmVzLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tPaygpIHtcclxuICAgICAgICBpZiAodGhpcy5raW5nUGFvUHJlc3NEYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmtpbmdQYW9QcmVzc0RhdGEuc3RhdHVzICE9IDQpIHtcclxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGAke3RoaXMubGFibGVfYnRuVHlwZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZ33ku7vliqHlvLnnqpdgLFxyXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogYCR7dGhpcy5sYWJsZV9idG5UeXBlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nfWBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg55yLNTAw6KeG6aKR5Lu75Yqh5by556qX5by556qXYCxcclxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IGDljrvlrozmiJBgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmtpbmdQYW9QcmVzc0RhdGEuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5raW5nVGFza1NpZ24sIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzICYmIHRoaXMua2luZ1Bhb1ByZXNzRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmtpbmdQYW9PcGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRoaXMua2luZ1Bhb1ByZXNzRGF0YS5zdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChg5LuK5pel5omT5Y2h5oiQ5YqfIeaYjuaXpeWGjeadpeWTpn5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9LaW5nUGFvVGFza19VcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHJlcy5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAvLyB9KSAgICAgXHJcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaJk+WNoeS7u+WKoeW8ueeql1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLmiZPljaFcIixcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzogXCLmv4DlirHop4bpopFcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5raW5nUGFvUHJlc3NEYXRhLnN0YXR1cyA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lU2lnbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgICAgIGlmIChQYWdlTWFuYWdlLnNpbmdsZXRvbi5maW5kUGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUtpbmdQYW8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uY2xvc2VQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lS2luZ1BhbywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ2xvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMua2luZ1Bhb1ByZXNzRGF0YS5zdGF0dXMgIT0gNCkge1xyXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGAke3RoaXMubGFibGVfYnRuVHlwZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZ33ku7vliqHlvLnnqpdgLFxyXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuWFs+mXrVwiXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg55yLNTAw6KeG6aKR5Lu75Yqh5by556qX5by556qXYCxcclxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogYOWFs+mXrWBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19