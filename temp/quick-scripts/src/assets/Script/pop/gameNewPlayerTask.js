"use strict";
cc._RF.push(module, 'd1a70DiXR1D1bkoPKa1acfW', 'gameNewPlayerTask');
// Script/pop/gameNewPlayerTask.ts

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
var Progress_1 = require("../../prefab/tool/script/Progress");
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var NewPlayerTaskModel_1 = require("../model/NewPlayerTaskModel");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameNewPlayerTask = /** @class */ (function (_super) {
    __extends(gameNewPlayerTask, _super);
    function gameNewPlayerTask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggleContent = null;
        _this.progress = null;
        _this.lable_progress = null;
        _this.content = null;
        _this.newPlayerTaskModel = null;
        _this.curClickTab = 0;
        _this.onceEnter = true; //是否第一次进入
        return _this;
    }
    gameNewPlayerTask.prototype.onLoad = function () {
        //this.allNewPlayerTask = allNewPlayerTask;
        cc.game.on(NameTs_1.default.Game_NewPlayerTaskGet, this.updateProGress, this);
        cc.game.on(NameTs_1.default.bindWechatSuccess, this.wxSucFun, this);
    };
    gameNewPlayerTask.prototype.onEnable = function () {
        TrackMgr_1.default.newcomer_mission({
            activity_state: "\u300C\u65B0\u4EBA\u4EFB\u52A1\u300D\u5F39\u7A97\u5C55\u793A"
        });
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "\u65B0\u4EBA\u4EFB\u52A1"
        });
    };
    gameNewPlayerTask.prototype.init = function (data) {
        var toggleItems = this.toggleContent.children;
        for (var i = 0; i < toggleItems.length; i++) {
            toggleItems[i].getChildByName("lable_font").getComponent(cc.Label).string = "\u7B2C" + (i + 1) + "\u5929";
        }
        if (data) {
            this.newPlayerTask = data;
            if (this.lable_progress) {
                this.lable_progress.string = "\u63D0\u73B0\u8FDB\u5EA6:" + this.newPlayerTask.userCurrentProgress + "/" + this.newPlayerTask.totalProgress;
            }
            this.progress.setProgressImage(this.newPlayerTask.userCurrentProgress / this.newPlayerTask.totalProgress);
            this.showRed(true);
        }
    };
    gameNewPlayerTask.prototype.showRed = function (isLoc) {
        var toggleItems = this.toggleContent.children;
        var newPlayerTask = this.newPlayerTask.withdrawTaskItemVoMap;
        var onceRed = null;
        for (var i in newPlayerTask) {
            var taskTabOnAll = newPlayerTask[i];
            var isShowRed = false;
            var day = -1;
            for (var j = 0; j < taskTabOnAll.length; j++) {
                var taskItem = taskTabOnAll[j];
                if (taskItem && this.onceEnter) {
                    TrackMgr_1.default.newcomer_mission({
                        activity_state: "\u4EFB\u52A1\u5B8C\u6210\u60C5\u51B5\u6C47\u603B\u4E0A\u62A5",
                        days: taskItem.day + "",
                        task_type: taskItem.taskTitle,
                        task_completion_status: taskItem.buttonType == 1 ? "\u5F85\u5B8C\u6210" : "\u5B8C\u6210"
                    });
                }
                if (taskItem) {
                    day = taskItem.day;
                    if (taskItem.buttonType == 2 && toggleItems[day - 1]) {
                        isShowRed = true;
                    }
                }
            }
            if (toggleItems[day - 1]) {
                toggleItems[day - 1].getChildByName("img_red").active = isShowRed;
                if (isShowRed && onceRed == null) {
                    onceRed = day - 1;
                }
            }
        }
        if (this.onceEnter) {
            if (isLoc && onceRed) {
                if (this.newPlayerTask.currentDay + 1 < onceRed) {
                    onceRed = 0;
                }
                this.clickTab(null, onceRed, isLoc);
            }
            else {
                this.clickTab(null, 0, isLoc);
            }
        }
        this.onceEnter = false;
    };
    gameNewPlayerTask.prototype.clickTab = function (e, index, isLoc) {
        if (isLoc === void 0) { isLoc = false; }
        if (this.newPlayerTask && this.newPlayerTask.currentDay + 1 >= parseInt(index)) {
            var curClickTab = null;
            var tempColor = new cc.Color();
            var toggleItems = this.toggleContent.children;
            for (var i = 0; i < toggleItems.length; i++) {
                if (i == index) {
                    toggleItems[i].getChildByName("Background").active = false;
                    toggleItems[i].getChildByName("checkmark").active = true;
                    toggleItems[i].getChildByName("lable_font").color = tempColor.fromHEX("#BC1902");
                    curClickTab = i;
                    if (isLoc) {
                        this.toggleContent.x = -254 - 103 * i;
                        TrackMgr_1.default.newcomer_mission({
                            activity_state: "\u70B9\u51FB\u7B2Cx\u5929\u6309\u94AE",
                            red_dot: toggleItems[i].getChildByName("img_red").active,
                            days: "\u7B2C" + (parseInt(index) + 1) + "\u5929",
                            task_show: true
                        });
                    }
                    else {
                        TrackMgr_1.default.newcomer_mission({
                            activity_state: "\u70B9\u51FB\u7B2Cx\u5929\u6309\u94AE",
                            red_dot: toggleItems[i].getChildByName("img_red").active,
                            days: "\u7B2C" + (parseInt(index) + 1) + "\u5929",
                            task_show: false
                        });
                    }
                }
                else {
                    toggleItems[i].getChildByName("Background").active = true;
                    toggleItems[i].getChildByName("checkmark").active = false;
                    toggleItems[i].getChildByName("lable_font").color = tempColor.fromHEX("#D26C41");
                }
            }
            this.setTabData(curClickTab);
        }
        else {
            AssistCtr_1.AssistCtr.showToastTip("\u7D2F\u79EF\u767B\u5F55" + parseInt(index ? index : 1) + "\u5929\u53EF\u5F00\u542F");
        }
    };
    gameNewPlayerTask.prototype.setTabData = function (curClickTab) {
        if (curClickTab != null) {
            this.curClickTab = curClickTab;
            var tabTaskData = this.newPlayerTask.withdrawTaskItemVoMap["" + (curClickTab + 1)];
            AssistCtr_1.AssistCtr.sortArray([2, 1, 3], "buttonType", tabTaskData);
            var addNum = tabTaskData.length - this.content.children.length;
            if (addNum > 0) {
                for (var i = 0; i < addNum; i++) {
                    var pre = cc.instantiate(this.newPlayerTaskModel);
                    pre.parent = this.content;
                }
            }
            else if (addNum < 0) {
                addNum = Math.abs(addNum);
                var maxChildrenIndex = this.content.children.length - 1;
                for (var i = 0; i < addNum; i++) {
                    if (maxChildrenIndex > 0 && this.content.children[maxChildrenIndex]) {
                        this.content.children[maxChildrenIndex].destroy();
                        maxChildrenIndex--;
                    }
                }
            }
            var preChild = this.content.children;
            for (var i = 0; i < preChild.length; i++) {
                preChild[i].getComponent(NewPlayerTaskModel_1.default).initData(tabTaskData[i]);
            }
        }
    };
    gameNewPlayerTask.prototype.updateProGress = function (data) {
        var _this = this;
        if (this.newPlayerTask) {
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.newPlayerTaskData,
                onSuccess: function (res) {
                    if (res.code === 0 && res.data) {
                        if (!_this.isValid) {
                            return;
                        }
                        _this.newPlayerTask = res.data;
                        if (_this.lable_progress) {
                            _this.lable_progress.string = "\u63D0\u73B0\u8FDB\u5EA6:" + _this.newPlayerTask.userCurrentProgress + "/" + _this.newPlayerTask.totalProgress;
                        }
                        if (data) {
                            _this.progress.setPercent(_this.newPlayerTask.userCurrentProgress / _this.newPlayerTask.totalProgress, data.target);
                        }
                        else {
                            _this.progress.setProgressImage(_this.newPlayerTask.userCurrentProgress / _this.newPlayerTask.totalProgress);
                        }
                        _this.setTabData(_this.curClickTab);
                        _this.showRed(true);
                    }
                    else {
                    }
                },
                onFail: function (err) {
                }
            });
        }
    };
    gameNewPlayerTask.prototype.clickGetMoney = function () {
        var _this = this;
        var self = this;
        if (this.newPlayerTask) {
            if (this.newPlayerTask.totalProgress == this.newPlayerTask.userCurrentProgress) {
                if (!this.newPlayerTask.weChat) {
                    XMSDK_1.default.authWechat();
                    TrackMgr_1.default.newcomer_mission({
                        activity_state: "\u70B9\u51FB\u300C\u9886\u73B0\u91D1\u300D\u6309\u94AE",
                        receiving_status: false,
                        withdrawal_progress: "\u63D0\u73B0\u8FDB\u5EA6:" + this.newPlayerTask.userCurrentProgress + "/" + this.newPlayerTask.totalProgress
                    });
                }
                else {
                    XMSDK_1.default.post({
                        url: UrlConst_1.UrlConst.wallet_get,
                        data: {
                            id: self.newPlayerTask.withdrawItemVo.id,
                            type: 0
                        },
                        onSuccess: function (res) {
                            if (res.code === 0) {
                                if (!_this.isValid) {
                                    return;
                                }
                                AssistCtr_1.AssistCtr.showToastTip("\u4F60\u7684\u63D0\u73B0\u5DF2\u7533\u8BF7\u6210\u529F\uFF0C\u7A0D\u540E\u53EF\u5728\u5FAE\u4FE1\u67E5\u770B\u662F\u5426\u8F6C\u8D26\u6210\u529F\u3002");
                                util_1.default.addCoin(-self.newPlayerTask.withdrawItemVo.point);
                                _this.closePage();
                                cc.game.emit(NameTs_1.default.Game_CloseNewPlayerTask);
                                TrackMgr_1.default.newcomer_mission({
                                    activity_state: "\u70B9\u51FB\u300C\u9886\u73B0\u91D1\u300D\u6309\u94AE",
                                    receiving_status: true,
                                    withdrawal_progress: "\u63D0\u73B0\u8FDB\u5EA6:" + _this.newPlayerTask.userCurrentProgress + "/" + _this.newPlayerTask.totalProgress
                                });
                            }
                            else {
                                var str = "" + res.message;
                                AssistCtr_1.AssistCtr.showToastTip(str);
                                TrackMgr_1.default.newcomer_mission({
                                    activity_state: "\u70B9\u51FB\u300C\u9886\u73B0\u91D1\u300D\u6309\u94AE",
                                    receiving_status: false,
                                    withdrawal_progress: "\u63D0\u73B0\u8FDB\u5EA6:" + _this.newPlayerTask.userCurrentProgress + "/" + _this.newPlayerTask.totalProgress
                                });
                            }
                        },
                        onFail: function (err) {
                        }
                    });
                }
            }
            else {
                TrackMgr_1.default.newcomer_mission({
                    activity_state: "\u70B9\u51FB\u300C\u9886\u73B0\u91D1\u300D\u6309\u94AE",
                    receiving_status: false,
                    withdrawal_progress: "\u63D0\u73B0\u8FDB\u5EA6:" + this.newPlayerTask.userCurrentProgress + "/" + this.newPlayerTask.totalProgress
                });
                AssistCtr_1.AssistCtr.showToastTip("进度条未满,不能提现5元现金");
            }
        }
    };
    gameNewPlayerTask.prototype.wxSucFun = function () {
        AssistCtr_1.AssistCtr.showToastTip("绑定成功");
        this.updateProGress(null);
    };
    gameNewPlayerTask.prototype.clickClose = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u65B0\u4EBA\u4EFB\u52A1",
            ck_module: "\u5173\u95ED"
        });
        this.closePage();
    };
    __decorate([
        property(cc.Node)
    ], gameNewPlayerTask.prototype, "toggleContent", void 0);
    __decorate([
        property(Progress_1.default)
    ], gameNewPlayerTask.prototype, "progress", void 0);
    __decorate([
        property(cc.Label)
    ], gameNewPlayerTask.prototype, "lable_progress", void 0);
    __decorate([
        property(cc.Node)
    ], gameNewPlayerTask.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], gameNewPlayerTask.prototype, "newPlayerTaskModel", void 0);
    gameNewPlayerTask = __decorate([
        ccclass
    ], gameNewPlayerTask);
    return gameNewPlayerTask;
}(baseTs_1.default));
exports.default = gameNewPlayerTask;

cc._RF.pop();