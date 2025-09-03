
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameNewPlayerTask.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVOZXdQbGF5ZXJUYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUF5RDtBQUN6RCxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBRXBDLDJDQUFzQztBQUN0QyxrRUFBNkQ7QUFDN0QsK0NBQThDO0FBQzlDLHFEQUFnRDtBQUNoRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBOEIxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUErQyxxQ0FBTTtJQUFyRDtRQUFBLHFFQStTQztRQTVTRyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsd0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBR2xCLGlCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLGVBQVMsR0FBRyxJQUFJLENBQUMsQ0FBTyxTQUFTOztJQTJSN0MsQ0FBQztJQXpSRyxrQ0FBTSxHQUFOO1FBQ0ksMkNBQTJDO1FBQzNDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSSxrQkFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQ3RCLGNBQWMsRUFBRSw4REFBWTtTQUMvQixDQUFDLENBQUE7UUFFRixrQkFBUSxDQUFDLHdCQUF3QixDQUFDO1lB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O3VEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkRBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lFQUNNO0lBZlQsaUJBQWlCO1FBRHJDLE9BQU87T0FDYSxpQkFBaUIsQ0ErU3JDO0lBQUQsd0JBQUM7Q0EvU0QsQUErU0MsQ0EvUzhDLGdCQUFNLEdBK1NwRDtrQkEvU29CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9ncmVzcyBmcm9tIFwiLi4vLi4vcHJlZmFiL3Rvb2wvc2NyaXB0L1Byb2dyZXNzXCI7XHJcbmltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XHJcbmltcG9ydCB7IHByb3BUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcclxuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xyXG5pbXBvcnQgTmV3UGxheWVyVGFza01vZGVsIGZyb20gXCIuLi9tb2RlbC9OZXdQbGF5ZXJUYXNrTW9kZWxcIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XHJcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugd2l0aGRyYXdUYXNrSXRlbVZvTWFwIHtcclxuICAgIGJ1dHRvblR5cGU6IG51bWJlclx0ICAgICAgICAgLy/mjInpkq7nsbvlnos6IDEt6L+b6KGM5LitLCAyLeW+hemihuWPliwgMy3lt7Lpooblj5ZcclxuICAgIGRheTogbnVtYmVyICAgICAgICAgICAgICAgICAgLy/lpKnmlbBcclxuICAgIGlkOiBudW1iZXIgICAgICAgICAgICAgICAgICAgLy/ku7vliqFJRCAgICAgICAgXHJcbiAgICBwcm9ncmVzczogbnVtYmVyXHQgICAgICAgIC8v5o+Q546w6L+b5bqmXHJcbiAgICB0YXNrVGl0bGU6IHN0cmluZ1x0ICAgICAgICAvL+S7u+WKoeagh+mimFxyXG4gICAgdHlwZTogbnVtYmVyXHQgICAgICAgIC8v5Lu75Yqh57G75Z6L77yaMS3lrozmiJDku7vliqEsIDIt6YCa5YWzLCAzLeiOt+W+l+aYn+aYnywgNC3op4LnnIvlub/lkYrop4bpopEsIDUt5L2/55So6YGT5YW3LCA2LeaKveaJi+acuiwgNy3ph5HluIHovaznm5jvvIw5LeWQiOaIkOS7u+WKoVxyXG4gICAgdGFza1ZhbHVlOiBudW1iZXJcdCAgICAgICAgLy/ku7vliqHovr7moIfmlbDph48gICAgXHJcbiAgICB1c2VyVGFza1ZhbHVlOiBudW1iZXIgICAgICAgLy/nlKjmiLflvZPliY3ovr7moIfmlbDph49cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBuZXdQbGF5ZXJUYXNrIHtcclxuICAgIHRvdGFsUHJvZ3Jlc3M6IG51bWJlciAgICAgICAgICAgICAgICAgIC8v5o+Q546w5oC76L+b5bqmXHJcbiAgICB1c2VyQ3VycmVudFByb2dyZXNzOiBudW1iZXIgICAgICAgICAgICAvL+eUqOaIt+WujOaIkOi/m+W6plxyXG4gICAgd2l0aGRyYXdUYXNrSXRlbVZvTWFwOiBPYmplY3RcclxuICAgIHdlQ2hhdDogeyAgICAgICAgICAgICAgICAgICAgLy/lvq7kv6Hkv6Hmga9cclxuICAgICAgICBhdmF0YXJVcmw6IHN0cmluZ1x0ICAgICAvL+WktOWDj1xyXG4gICAgICAgIG5pY2tuYW1lOiBzdHJpbmcgICAgICAgICAvL+aYteensFxyXG4gICAgfVxyXG4gICAgd2l0aGRyYXdJdGVtVm86IHtcclxuICAgICAgICBhbW91bnQ6IHN0cmluZ1xyXG4gICAgICAgIGlkOiBudW1iZXJcclxuICAgICAgICBwb2ludDogbnVtYmVyXHJcbiAgICB9XHJcbiAgICBjdXJyZW50RGF5OiBudW1iZXIgICAgICAgICAgICAvL+W9k+WJjeWkqeaVsFxyXG59XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZU5ld1BsYXllclRhc2sgZXh0ZW5kcyBiYXNlVHMge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdG9nZ2xlQ29udGVudDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFByb2dyZXNzKVxyXG4gICAgcHJvZ3Jlc3M6IFByb2dyZXNzID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV9wcm9ncmVzczogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY29udGVudDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIG5ld1BsYXllclRhc2tNb2RlbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBuZXdQbGF5ZXJUYXNrOiBuZXdQbGF5ZXJUYXNrO1xyXG4gICAgcHJpdmF0ZSBjdXJDbGlja1RhYiA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBvbmNlRW50ZXIgPSB0cnVlOyAgICAgICAvL+aYr+WQpuesrOS4gOasoei/m+WFpVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvL3RoaXMuYWxsTmV3UGxheWVyVGFzayA9IGFsbE5ld1BsYXllclRhc2s7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9OZXdQbGF5ZXJUYXNrR2V0LCB0aGlzLnVwZGF0ZVByb0dyZXNzLCB0aGlzKTtcclxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5iaW5kV2VjaGF0U3VjY2VzcywgdGhpcy53eFN1Y0Z1biwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgVHJhY2tNZ3IubmV3Y29tZXJfbWlzc2lvbih7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBg44CM5paw5Lq65Lu75Yqh44CN5by556qX5bGV56S6YFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDmlrDkurrku7vliqFgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGRhdGE6IG5ld1BsYXllclRhc2spIHtcclxuICAgICAgICBsZXQgdG9nZ2xlSXRlbXMgPSB0aGlzLnRvZ2dsZUNvbnRlbnQuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2dnbGVJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0b2dnbGVJdGVtc1tpXS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX2ZvbnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg56ysJHtpICsgMX3lpKlgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdQbGF5ZXJUYXNrID0gZGF0YTtcclxuICAgICAgICAgICAgaWYodGhpcy5sYWJsZV9wcm9ncmVzcyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb2dyZXNzLnN0cmluZyA9IGDmj5DnjrDov5vluqY6JHt0aGlzLm5ld1BsYXllclRhc2sudXNlckN1cnJlbnRQcm9ncmVzc30vJHt0aGlzLm5ld1BsYXllclRhc2sudG90YWxQcm9ncmVzc31gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc2V0UHJvZ3Jlc3NJbWFnZSh0aGlzLm5ld1BsYXllclRhc2sudXNlckN1cnJlbnRQcm9ncmVzcyAvIHRoaXMubmV3UGxheWVyVGFzay50b3RhbFByb2dyZXNzKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVkKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93UmVkKGlzTG9jOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHRvZ2dsZUl0ZW1zID0gdGhpcy50b2dnbGVDb250ZW50LmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBuZXdQbGF5ZXJUYXNrID0gdGhpcy5uZXdQbGF5ZXJUYXNrLndpdGhkcmF3VGFza0l0ZW1Wb01hcDtcclxuICAgICAgICBsZXQgb25jZVJlZCA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBuZXdQbGF5ZXJUYXNrKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXNrVGFiT25BbGwgPSBuZXdQbGF5ZXJUYXNrW2ldO1xyXG4gICAgICAgICAgICBsZXQgaXNTaG93UmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBkYXkgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGFza1RhYk9uQWxsLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFza0l0ZW0gPSB0YXNrVGFiT25BbGxbal07XHJcbiAgICAgICAgICAgICAgICBpZiAodGFza0l0ZW0gJiYgdGhpcy5vbmNlRW50ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5uZXdjb21lcl9taXNzaW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDku7vliqHlrozmiJDmg4XlhrXmsYfmgLvkuIrmiqVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlzOiB0YXNrSXRlbS5kYXkgKyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrX3R5cGU6IHRhc2tJdGVtLnRhc2tUaXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFza19jb21wbGV0aW9uX3N0YXR1czogdGFza0l0ZW0uYnV0dG9uVHlwZSA9PSAxID8gYOW+heWujOaIkGAgOiBg5a6M5oiQYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2tJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5ID0gdGFza0l0ZW0uZGF5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXNrSXRlbS5idXR0b25UeXBlID09IDIgJiYgdG9nZ2xlSXRlbXNbZGF5IC0gMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTaG93UmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0b2dnbGVJdGVtc1tkYXkgLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlSXRlbXNbZGF5IC0gMV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfcmVkXCIpLmFjdGl2ZSA9IGlzU2hvd1JlZDtcclxuICAgICAgICAgICAgICAgIGlmIChpc1Nob3dSZWQgJiYgb25jZVJlZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25jZVJlZCA9IGRheSAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5vbmNlRW50ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGlzTG9jICYmIG9uY2VSZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5ld1BsYXllclRhc2suY3VycmVudERheSArIDEgPCBvbmNlUmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25jZVJlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrVGFiKG51bGwsIG9uY2VSZWQsIGlzTG9jKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tUYWIobnVsbCwgMCwgaXNMb2MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMub25jZUVudGVyID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tUYWIoZSwgaW5kZXgsIGlzTG9jID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5uZXdQbGF5ZXJUYXNrICYmIHRoaXMubmV3UGxheWVyVGFzay5jdXJyZW50RGF5ICsgMSA+PSBwYXJzZUludChpbmRleCkpIHtcclxuICAgICAgICAgICAgbGV0IGN1ckNsaWNrVGFiID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wQ29sb3IgPSBuZXcgY2MuQ29sb3IoKTtcclxuICAgICAgICAgICAgbGV0IHRvZ2dsZUl0ZW1zID0gdGhpcy50b2dnbGVDb250ZW50LmNoaWxkcmVuO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9nZ2xlSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlSXRlbXNbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUl0ZW1zW2ldLmdldENoaWxkQnlOYW1lKFwiY2hlY2ttYXJrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlSXRlbXNbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9mb250XCIpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjQkMxOTAyXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN1ckNsaWNrVGFiID0gaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTG9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlQ29udGVudC54ID0gLTI1NCAtIDEwMyAqIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLm5ld2NvbWVyX21pc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDngrnlh7vnrKx45aSp5oyJ6ZKuYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZF9kb3Q6IHRvZ2dsZUl0ZW1zW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3JlZFwiKS5hY3RpdmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlzOiBg56ysJHsocGFyc2VJbnQoaW5kZXgpICsgMSl95aSpYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tfc2hvdzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IubmV3Y29tZXJfbWlzc2lvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogYOeCueWHu+esrHjlpKnmjInpkq5gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkX2RvdDogdG9nZ2xlSXRlbXNbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfcmVkXCIpLmFjdGl2ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheXM6IGDnrKwkeyhwYXJzZUludChpbmRleCkgKyAxKX3lpKlgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza19zaG93OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUl0ZW1zW2ldLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUl0ZW1zW2ldLmdldENoaWxkQnlOYW1lKFwiY2hlY2ttYXJrXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUl0ZW1zW2ldLmdldENoaWxkQnlOYW1lKFwibGFibGVfZm9udFwiKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiI0QyNkM0MVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJEYXRhKGN1ckNsaWNrVGFiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoYOe0r+enr+eZu+W9lSR7cGFyc2VJbnQoaW5kZXggPyBpbmRleCA6IDEpfeWkqeWPr+W8gOWQr2ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRUYWJEYXRhKGN1ckNsaWNrVGFiKSB7XHJcbiAgICAgICAgaWYgKGN1ckNsaWNrVGFiICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJDbGlja1RhYiA9IGN1ckNsaWNrVGFiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRhYlRhc2tEYXRhID0gdGhpcy5uZXdQbGF5ZXJUYXNrLndpdGhkcmF3VGFza0l0ZW1Wb01hcFtgJHtjdXJDbGlja1RhYiArIDF9YF07XHJcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zb3J0QXJyYXkoWzIsIDEsIDNdLCBcImJ1dHRvblR5cGVcIiwgdGFiVGFza0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFkZE51bSA9IHRhYlRhc2tEYXRhLmxlbmd0aCAtIHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChhZGROdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZE51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubmV3UGxheWVyVGFza01vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICBwcmUucGFyZW50ID0gdGhpcy5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFkZE51bSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGFkZE51bSA9IE1hdGguYWJzKGFkZE51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4Q2hpbGRyZW5JbmRleCA9IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF4Q2hpbGRyZW5JbmRleCA+IDAgJiYgdGhpcy5jb250ZW50LmNoaWxkcmVuW21heENoaWxkcmVuSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlblttYXhDaGlsZHJlbkluZGV4XS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heENoaWxkcmVuSW5kZXgtLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBwcmVDaGlsZCA9IHRoaXMuY29udGVudC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVDaGlsZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcHJlQ2hpbGRbaV0uZ2V0Q29tcG9uZW50KE5ld1BsYXllclRhc2tNb2RlbCkuaW5pdERhdGEodGFiVGFza0RhdGFbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVByb0dyZXNzKGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5uZXdQbGF5ZXJUYXNrKSB7XHJcblx0XHRcdFxyXG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QubmV3UGxheWVyVGFza0RhdGEsXHJcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld1BsYXllclRhc2sgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sYWJsZV9wcm9ncmVzcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb2dyZXNzLnN0cmluZyA9IGDmj5DnjrDov5vluqY6JHt0aGlzLm5ld1BsYXllclRhc2sudXNlckN1cnJlbnRQcm9ncmVzc30vJHt0aGlzLm5ld1BsYXllclRhc2sudG90YWxQcm9ncmVzc31gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnNldFBlcmNlbnQodGhpcy5uZXdQbGF5ZXJUYXNrLnVzZXJDdXJyZW50UHJvZ3Jlc3MgLyB0aGlzLm5ld1BsYXllclRhc2sudG90YWxQcm9ncmVzcywgZGF0YS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zZXRQcm9ncmVzc0ltYWdlKHRoaXMubmV3UGxheWVyVGFzay51c2VyQ3VycmVudFByb2dyZXNzIC8gdGhpcy5uZXdQbGF5ZXJUYXNrLnRvdGFsUHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGFiRGF0YSh0aGlzLmN1ckNsaWNrVGFiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0dldE1vbmV5KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5uZXdQbGF5ZXJUYXNrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5ld1BsYXllclRhc2sudG90YWxQcm9ncmVzcyA9PSB0aGlzLm5ld1BsYXllclRhc2sudXNlckN1cnJlbnRQcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5ld1BsYXllclRhc2sud2VDaGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgWE1TREsuYXV0aFdlY2hhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLm5ld2NvbWVyX21pc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogYOeCueWHu+OAjOmihueOsOmHkeOAjeaMiemSrmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpdmluZ19zdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aXRoZHJhd2FsX3Byb2dyZXNzOiBg5o+Q546w6L+b5bqmOiR7dGhpcy5uZXdQbGF5ZXJUYXNrLnVzZXJDdXJyZW50UHJvZ3Jlc3N9LyR7dGhpcy5uZXdQbGF5ZXJUYXNrLnRvdGFsUHJvZ3Jlc3N9YFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBYTVNESy5wb3N0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC53YWxsZXRfZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogc2VsZi5uZXdQbGF5ZXJUYXNrLndpdGhkcmF3SXRlbVZvLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChg5L2g55qE5o+Q546w5bey55Sz6K+35oiQ5Yqf77yM56iN5ZCO5Y+v5Zyo5b6u5L+h5p+l55yL5piv5ZCm6L2s6LSm5oiQ5Yqf44CCYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRDb2luKC1zZWxmLm5ld1BsYXllclRhc2sud2l0aGRyYXdJdGVtVm8ucG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0Nsb3NlTmV3UGxheWVyVGFzayk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLm5ld2NvbWVyX21pc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogYOeCueWHu+OAjOmihueOsOmHkeOAjeaMiemSrmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpdmluZ19zdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhkcmF3YWxfcHJvZ3Jlc3M6IGDmj5DnjrDov5vluqY6JHt0aGlzLm5ld1BsYXllclRhc2sudXNlckN1cnJlbnRQcm9ncmVzc30vJHt0aGlzLm5ld1BsYXllclRhc2sudG90YWxQcm9ncmVzc31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHIgPSBgJHtyZXMubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoc3RyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5uZXdjb21lcl9taXNzaW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDngrnlh7vjgIzpoobnjrDph5HjgI3mjInpkq5gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlaXZpbmdfc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aGRyYXdhbF9wcm9ncmVzczogYOaPkOeOsOi/m+W6pjoke3RoaXMubmV3UGxheWVyVGFzay51c2VyQ3VycmVudFByb2dyZXNzfS8ke3RoaXMubmV3UGxheWVyVGFzay50b3RhbFByb2dyZXNzfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLm5ld2NvbWVyX21pc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBg54K55Ye744CM6aKG546w6YeR44CN5oyJ6ZKuYCxcclxuICAgICAgICAgICAgICAgICAgICByZWNlaXZpbmdfc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB3aXRoZHJhd2FsX3Byb2dyZXNzOiBg5o+Q546w6L+b5bqmOiR7dGhpcy5uZXdQbGF5ZXJUYXNrLnVzZXJDdXJyZW50UHJvZ3Jlc3N9LyR7dGhpcy5uZXdQbGF5ZXJUYXNrLnRvdGFsUHJvZ3Jlc3N9YFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6L+b5bqm5p2h5pyq5ruhLOS4jeiDveaPkOeOsDXlhYPnjrDph5FcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3eFN1Y0Z1bigpIHtcclxuICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi57uR5a6a5oiQ5YqfXCIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvR3Jlc3MobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDbG9zZSgpIHtcclxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOaWsOS6uuS7u+WKoWAsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogYOWFs+mXrWBcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==