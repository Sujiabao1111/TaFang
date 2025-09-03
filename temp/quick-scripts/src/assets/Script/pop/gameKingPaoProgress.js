"use strict";
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