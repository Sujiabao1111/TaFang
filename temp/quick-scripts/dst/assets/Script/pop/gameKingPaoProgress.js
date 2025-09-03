
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
var pageTs_1 = require("../common/pageTs");
var PageManage_1 = require("../PageManage");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
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
                AdController_1.default.loadAd(AdPosition_1.AdPosition.kingTaskSign, function (res) {
                    if (_this && _this.kingPaoPressData) {
                        XMSDK_1.default.post({
                            url: UrlConst_1.UrlConst.kingPaoOpen,
                            data: {
                                status: _this.kingPaoPressData.status
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
                }, function () {
                    AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
                });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVLaW5nUGFvUHJvZ3Jlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUNwQyxtREFBa0Q7QUFDbEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0Qyw0Q0FBdUM7QUFDdkMsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxxREFBZ0Q7QUFDaEQsaURBQTRDO0FBV3RDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWlELHVDQUFNO0lBQXZEO1FBQUEscUVBcUxDO1FBbExHLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLG9CQUFjLEdBQWdCLElBQUksQ0FBQztRQUduQyx1QkFBaUIsR0FBZ0IsSUFBSSxDQUFDO1FBRXRDLHNCQUFnQixHQUFvQixJQUFJLENBQUM7O0lBdUs3QyxDQUFDO0lBcktHLG1DQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLGtCQUFRLENBQUMsd0JBQXdCLENBQUM7WUFDOUIsZ0JBQWdCLEVBQUUsMEJBQU07U0FDM0IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGtDQUFJLEdBQUosVUFBSyxJQUFxQjtRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFekIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztZQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyw0Q0FBc0IsSUFBSSxDQUFDLGFBQWEsa0NBQXdC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QUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ2pDLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3pCLGdCQUFnQixFQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLDZCQUFNO2dCQUMzRSxTQUFTLEVBQUUsSUFBSTthQUNsQixDQUFDLENBQUE7U0FFTDthQUNHO1lBQ0Esa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDekIsZ0JBQWdCLEVBQUUsMkRBQWM7Z0JBQ2hDLFNBQVMsRUFBRSxjQUFJO2FBQ2xCLENBQUMsQ0FBQTtTQUNMO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFqTEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4REFDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7K0RBQ2E7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztrRUFDZ0I7SUFackIsbUJBQW1CO1FBRHZDLE9BQU87T0FDYSxtQkFBbUIsQ0FxTHZDO0lBQUQsMEJBQUM7Q0FyTEQsQUFxTEMsQ0FyTGdELGdCQUFNLEdBcUx0RDtrQkFyTG9CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XHJcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcclxuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xyXG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XHJcbmltcG9ydCBQYWdlTWFuYWdlIGZyb20gXCIuLi9QYWdlTWFuYWdlXCI7XHJcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xyXG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XHJcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XHJcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Uga2luZ1Bhb1ByZXNzRGF0YSB7XHJcbiAgICBwZXJjZW50OiBudW1iZXIsICAgICAgICAgICAgICAgIC8v6L+b5bqm55m+5YiG5q+UXHJcbiAgICBwcm9jZXNzOiBudW1iZXIsICAgICAgICAgICAgICAgIC8v5Lu75Yqh6L+b5bqmXHJcbiAgICBwcm9jZXNzVGFyZ2V0OiBudW1iZXIsICAgICAgICAgIC8v5Lu75Yqh5oC755uu5qCHXHJcbiAgICBzdGF0dXM6bnVtYmVyLCAgICAgICAgICAgICAgICAgIC8v5Lu75Yqh54q25oCB77yaMO+8muaXoOeKtuaAge+8mzHvvJrmiZPljaHku7vliqHvvJsyOuetvuWIsOS7u+WKoe+8mzPvvJrpgJrlhbPku7vliqHvvJs077ya55yL6KeG6aKR5Lu75YqhXHJcbiAgICBzaWduOmJvb2xlYW4sICAgICAgICAgICAgICAgICAgIC8v5b2T5piv5omT5Y2h5Lu75Yqh55qE5pe25YCZ6YCC55So77yM5piv5ZCm5omT5Y2hXHJcbn1cclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZUtpbmdQYW9Qcm9ncmVzcyBleHRlbmRzIGJhc2VUcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpbWdfdmlkZW9JY29uOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxhYmxlX2J0blR5cGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGxhYmxlX3Byb2dyZXNzOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgbGFibGVfcHJvZ3Jlc3NUaXA6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBraW5nUGFvUHJlc3NEYXRhOmtpbmdQYW9QcmVzc0RhdGEgPSBudWxsOyAgICAgICAgICAgIFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnmb7kuIfliIbnuqJgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGRhdGE6a2luZ1Bhb1ByZXNzRGF0YSkge1xyXG4gICAgICAgIHRoaXMua2luZ1Bhb1ByZXNzRGF0YSA9IGRhdGE7ICAgICAgICBcclxuICAgICAgICB0aGlzLmltZ192aWRlb0ljb24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sYWJsZV9idG5UeXBlLnggPSAwO1xyXG5cclxuICAgICAgICBpZihkYXRhLnN0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9wcm9ncmVzcy5zdHJpbmcgPSBgPGNvbG9yPSNCQjQyMEU+57Sv6K6h5omT5Y2hJHtkYXRhLnByb2Nlc3NUYXJnZXR95aSpKDwvYz48Y29sb3I9IzY2OUUwMD4ke2RhdGEucHJvY2Vzc308L2NvbG9yPjxjb2xvcj0jQkI0MjBFPi8ke2RhdGEucHJvY2Vzc1RhcmdldH0pPC9jb2xvcj5gXHJcbiAgICAgICAgICAgIHRoaXMuaW1nX3ZpZGVvSWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX2J0blR5cGUueCA9IDI5O1xyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX2J0blR5cGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5omT5Y2hYDtcclxuXHJcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaJk+WNoeS7u+WKoeW8ueeql1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgZWxzZSBpZihkYXRhLnN0YXR1cyA9PSAyKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9wcm9ncmVzcy5zdHJpbmcgPSBgPGNvbG9yPSNCQjQyMEU+57Sv6K6h562+5YiwJHtkYXRhLnByb2Nlc3NUYXJnZXR95aSpKDwvYz48Y29sb3I9IzY2OUUwMD4ke2RhdGEucHJvY2Vzc308L2NvbG9yPjxjb2xvcj0jQkI0MjBFPi8ke2RhdGEucHJvY2Vzc1RhcmdldH0pPC9jb2xvcj5gO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX2J0blR5cGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5Y67562+5YiwYDtcclxuXHJcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuetvuWIsOS7u+WKoeW8ueeql1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGF0YS5zdGF0dXMgPT0gMyl7XHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfcHJvZ3Jlc3Muc3RyaW5nID0gYDxjb2xvcj0jQkI0MjBFPumAmui/hyR7ZGF0YS5wcm9jZXNzVGFyZ2V0feWFsyg8L2M+PGNvbG9yPSM2NjlFMDA+JHtkYXRhLnByb2Nlc3N9PC9jb2xvcj48Y29sb3I9I0JCNDIwRT4vJHtkYXRhLnByb2Nlc3NUYXJnZXR9KTwvY29sb3I+YDtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9idG5UeXBlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOWOu+mXr+WFs2A7XHJcblxyXG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLpgJrlhbPku7vliqHlvLnnqpdcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGRhdGEuc3RhdHVzID09IDQpe1xyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX3Byb2dyZXNzLnN0cmluZyA9IGA8Y29sb3I9I0JCNDIwRT7ntK/orqHop4LnnIvop4bpopEke2RhdGEucHJvY2Vzc1RhcmdldH3kuKooPC9jPjxjb2xvcj0jNjY5RTAwPiR7ZGF0YS5wcm9jZXNzfTwvY29sb3I+PGNvbG9yPSNCQjQyMEU+LyR7ZGF0YS5wcm9jZXNzVGFyZ2V0fSk8L2NvbG9yPmBcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9idG5UeXBlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOWOu+WujOaIkGA7XHJcblxyXG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOeciyR7ZGF0YS5wcm9jZXNzVGFyZ2V0feS4quinhumikeS7u+WKoeW8ueeql2BcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhYmxlX3Byb2dyZXNzVGlwLnN0cmluZyA9IGA8Y29sb3I9I0QyNkM0MT7ljbPlj6/lop7liqA8L2M+PGNvbG9yPSNGOTIyMjI+JHtkYXRhLnBlcmNlbnR9JTwvY29sb3I+PGNvbG9yPSNEMjZDNDE+6L+b5bqmPC9jb2xvcj5gXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGF0YSgpe1xyXG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmtpbmdQYW9Qcm9ncmVzcyxcclxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdChyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHJlcy5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrT2soKXtcclxuICAgICAgICBpZih0aGlzLmtpbmdQYW9QcmVzc0RhdGEpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmtpbmdQYW9QcmVzc0RhdGEuc3RhdHVzICE9IDQpe1xyXG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGAke3RoaXMubGFibGVfYnRuVHlwZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZ33ku7vliqHlvLnnqpdgLFxyXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogYCR7dGhpcy5sYWJsZV9idG5UeXBlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nfWBcclxuICAgICAgICAgICAgICAgIH0pICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOecizUwMOinhumikeS7u+WKoeW8ueeql+W8ueeql2AsXHJcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBg5Y675a6M5oiQYFxyXG4gICAgICAgICAgICAgICAgfSkgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5raW5nUGFvUHJlc3NEYXRhLnN0YXR1cyA9PSAxKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24ua2luZ1Rhc2tTaWduLCAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcyAmJiB0aGlzLmtpbmdQYW9QcmVzc0RhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBYTVNESy5wb3N0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3Qua2luZ1Bhb09wZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLmtpbmdQYW9QcmVzc0RhdGEuc3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChg5LuK5pel5omT5Y2h5oiQ5YqfIeaYjuaXpeWGjeadpeWTpn5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTsgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfS2luZ1Bhb1Rhc2tfVXBkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHJlcy5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9KSAgICAgXHJcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaJk+WNoeS7u+WKoeW8ueeql1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTpcIuaJk+WNoVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5raW5nUGFvUHJlc3NEYXRhLnN0YXR1cyA9PSAyKXtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVTaWduKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBpZihQYWdlTWFuYWdlLnNpbmdsZXRvbi5maW5kUGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUtpbmdQYW8pKXtcclxuICAgICAgICAgICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5jbG9zZVBhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDbG9zZSgpIHtcclxuICAgICAgICBpZih0aGlzLmtpbmdQYW9QcmVzc0RhdGEuc3RhdHVzICE9IDQpe1xyXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBgJHt0aGlzLmxhYmxlX2J0blR5cGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmd95Lu75Yqh5by556qXYCxcclxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLlhbPpl61cIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnnIs1MDDop4bpopHku7vliqHlvLnnqpflvLnnqpdgLFxyXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBg5YWz6ZetYFxyXG4gICAgICAgICAgICB9KSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19