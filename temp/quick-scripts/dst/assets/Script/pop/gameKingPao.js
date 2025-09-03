
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameKingPao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5e70HIy/dNa6iAaaDhXjiv', 'gameKingPao');
// Script/pop/gameKingPao.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var Marquee_1 = require("../model/Marquee");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameKingPao = /** @class */ (function (_super) {
    __extends(gameKingPao, _super);
    function gameKingPao() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ruleNode = null;
        _this.marquee = null;
        _this.lable_shareMoney = null;
        _this.lable_dayMoney = null;
        _this.lable_dayNum = null;
        _this.lable_goNum = null;
        _this.kingTaskContent = null;
        _this.KingTaskItem = null;
        _this.kingPaoData = null;
        return _this;
    }
    gameKingPao.prototype.onLoad = function () {
        cc.game.on(NameTs_1.default.Game_KingPaoTask_Update, this.updateData, this);
    };
    gameKingPao.prototype.onEnable = function () {
        TrackMgr_1.default.artillery_bonus({
            activity_state: "\u300C\u767E\u4E07\u5206\u7EA2\u300D\u9875\u9762\u5C55\u793A"
        });
    };
    gameKingPao.prototype.start = function () {
    };
    gameKingPao.prototype.init = function (data) {
        this.kingPaoData = data;
        this.setData();
        this.marquee.updateMarqueeList(data.marquee);
    };
    gameKingPao.prototype.setData = function () {
        var _this = this;
        var data = this.kingPaoData;
        if (data) {
            this.lable_shareMoney.string = data.turretKingRedEnvelopeDetailDTO.yesterdayRedEnvelope + "";
            this.lable_dayMoney.string = data.turretKingRedEnvelopeDetailDTO.bonusPerCapita + "";
            this.lable_dayNum.string = data.turretKingRedEnvelopeDetailDTO.total + "";
            this.lable_goNum.string = data.turretKingRedEnvelopeDetailDTO.todayReceive + "";
        }
        var kingTask = data.taskList;
        var childAll = this.kingTaskContent.children;
        var addNum = kingTask.length - childAll.length;
        if (addNum > 0) {
            for (var i = 0; i < addNum; i++) {
                var itemNode = cc.instantiate(this.KingTaskItem);
                itemNode.x = childAll[0].x;
                itemNode.y = childAll[0].y;
                itemNode.parent = this.kingTaskContent;
                itemNode.active = true;
            }
        }
        var _loop_1 = function (i) {
            var item = childAll[i];
            item.name = "" + i;
            if (kingTask[i] && item) {
                if (kingTask[i].achieve == 1) {
                    item.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = "\u5151\u6362";
                }
                else if (kingTask[i].achieve == 2) {
                    item.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = "\u5DF2\u5151\u6362";
                }
                if (i == 0) {
                    var strNum = (kingTask[i].process / kingTask[i].processTarget) * 100;
                    y = String(strNum).indexOf(".") + 1; //获取小数点的位置                    
                    if (y > 0) {
                        strNum = Number(strNum.toFixed(2));
                    }
                    item.getChildByName("lable_kindProgress").getComponent(cc.RichText).string = "<color=#FFFFFF>" + kingTask[i].title + ":</c><color=#FCFF15>" + strNum + "%</color>";
                    item.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = "\u52A0" + 30 + "%";
                    XMSDK_1.default.getdataStr({
                        url: UrlConst_1.UrlConst.kingPaoProgress,
                        onSuccess: function (res) {
                            if (res.code === 0) {
                                if (!_this.isValid) {
                                    return;
                                }
                                if (res.data) {
                                    item.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = "\u52A0" + res.data.percent + "%";
                                }
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
                else {
                    if (kingTask[i].type == 2) {
                        item.getChildByName("lable_kindProgress").getComponent(cc.RichText).string = "<color=#FFFFFF>" + kingTask[i].title + ":</c><color=#FCFF15>" + Math.floor(kingTask[i].process / util_1.default.userData.exchangeRate) + "</color><color=#FFFFFF>/" + Math.floor(kingTask[i].processTarget / util_1.default.userData.exchangeRate) + "</color>";
                    }
                    else {
                        item.getChildByName("lable_kindProgress").getComponent(cc.RichText).string = "<color=#FFFFFF>" + kingTask[i].title + ":</c><color=#FCFF15>" + kingTask[i].process + "</color><color=#FFFFFF>/" + kingTask[i].processTarget + "</color>";
                    }
                }
                var process = (kingTask[i].process / kingTask[i].processTarget);
                if (process >= 1) {
                    process = 1;
                }
                var proGressWidth = (item.getChildByName("rectNode").width - 7) * process;
                if (proGressWidth > 1 && proGressWidth < 25) {
                    proGressWidth = 25;
                }
                item.getChildByName("rectNode").getChildByName("progressNode").width = proGressWidth;
            }
        };
        var y;
        for (var i = 0; i < childAll.length; i++) {
            _loop_1(i);
        }
    };
    gameKingPao.prototype.clickGet = function () {
        TrackMgr_1.default.artillery_bonus({
            activity_state: "\u70B9\u51FB\u300C\u9886\u73B0\u91D1\u300D\u6309\u94AE"
        });
        if (this.kingPaoData && this.kingPaoData.taskList) {
            if (this.kingPaoData.taskList[0] && (this.kingPaoData.taskList[0].processTarget == this.kingPaoData.taskList[0].process)) {
                AssistCtr_1.AssistCtr.showToastTip("\u4EBA\u5DE5\u5BA1\u6838\u4E2D");
            }
        }
        AssistCtr_1.AssistCtr.showToastTip("\u83B7\u5F97\u70AE\u738B\u53EF\u6BCF\u65E5\u9886\u53D6\u5206\u7EA2");
    };
    gameKingPao.prototype.updateData = function () {
        var _this = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.kingPaoTaskData,
            onSuccess: function (res) {
                if (res.code === 0 && res.data) {
                    if (!_this.isValid) {
                        return;
                    }
                    _this.init(res.data);
                }
                else {
                }
            },
            onFail: function (err) {
            }
        });
    };
    gameKingPao.prototype.clickTaskGo = function (e) {
        var _this = this;
        var clickIndex = parseInt(e.target.parent.name);
        if (this.kingPaoData && this.kingPaoData.taskList) {
            if (this.kingPaoData.taskList[clickIndex] && this.kingPaoData.taskList[clickIndex].achieve == 1) {
                XMSDK_1.default.post({
                    url: UrlConst_1.UrlConst.kingPaoGet,
                    data: {
                        id: this.kingPaoData.taskList[clickIndex].id
                    },
                    onSuccess: function (res) {
                        if (res.code === 0) {
                            if (!_this.isValid) {
                                return;
                            }
                            AssistCtr_1.AssistCtr.showToastTip("\u5151\u6362\u6210\u529F\uFF0C\u4EBA\u5DE5\u5BA1\u6838\u4E2D");
                            _this.updateData();
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
                return;
            }
            else if (this.kingPaoData.taskList[clickIndex] && this.kingPaoData.taskList[clickIndex].achieve == 2) {
                AssistCtr_1.AssistCtr.showToastTip("\u5DF2\u5151\u6362");
                return;
            }
        }
        if (clickIndex == 0) {
            cc.game.emit(NameTs_1.default.Game_Pop_Open, {
                name: pageTs_1.default.pageName.GameKingPaoProgress,
                data: {
                    clickTarget: 0,
                    progress: this.kingPaoData.taskList[clickIndex].process + "/" + this.kingPaoData.taskList[clickIndex].processTarget
                },
            });
        }
        else {
            if (this.kingPaoData && this.kingPaoData.taskList) {
                if (this.kingPaoData.taskList[clickIndex]) {
                    TrackMgr_1.default.artillery_bonus({
                        activity_state: "" + this.kingPaoData.taskList[clickIndex].title,
                        button_hcdg: this.kingPaoData.taskList[clickIndex].title + "\u6309\u94AE",
                        task_progress: this.kingPaoData.taskList[clickIndex].process + "/" + this.kingPaoData.taskList[clickIndex].processTarget
                    });
                }
            }
            this.closePage();
        }
    };
    gameKingPao.prototype.clickClose = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u767E\u4E07\u5206\u7EA2",
            ck_module: "\u8FD4\u56DE"
        });
        this.closePage();
    };
    gameKingPao.prototype.clickOpenProgress = function () {
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameKingPaoProgress);
    };
    gameKingPao.prototype.clickCloseRule = function () {
        this.ruleNode.active = false;
    };
    gameKingPao.prototype.clickOpenRule = function (e, index) {
        if (index == 0) {
            TrackMgr_1.default.artillery_bonus({
                activity_state: "\u300C\u73A9\u5BB6\u8BF4\u660E\u300D\u70B9\u51FB"
            });
        }
        else if (index == 1) {
            TrackMgr_1.default.artillery_bonus({
                activity_state: "\u300C\u83B7\u5F97\u5206\u7EA2\u70AE\u738B\u8BF4\u660E\u300D\u70B9\u51FB"
            });
        }
        this.ruleNode.active = true;
    };
    __decorate([
        property(cc.Node)
    ], gameKingPao.prototype, "ruleNode", void 0);
    __decorate([
        property(Marquee_1.default)
    ], gameKingPao.prototype, "marquee", void 0);
    __decorate([
        property(cc.Label)
    ], gameKingPao.prototype, "lable_shareMoney", void 0);
    __decorate([
        property(cc.Label)
    ], gameKingPao.prototype, "lable_dayMoney", void 0);
    __decorate([
        property(cc.Label)
    ], gameKingPao.prototype, "lable_dayNum", void 0);
    __decorate([
        property(cc.Label)
    ], gameKingPao.prototype, "lable_goNum", void 0);
    __decorate([
        property(cc.Node)
    ], gameKingPao.prototype, "kingTaskContent", void 0);
    __decorate([
        property(cc.Node)
    ], gameKingPao.prototype, "KingTaskItem", void 0);
    gameKingPao = __decorate([
        ccclass
    ], gameKingPao);
    return gameKingPao;
}(baseTs_1.default));
exports.default = gameKingPao;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVLaW5nUGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0Qyw0Q0FBdUM7QUFDdkMsK0NBQThDO0FBQzlDLHFEQUFnRDtBQUNoRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBOEIxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQW9RQztRQWpRRyxjQUFRLEdBQVcsSUFBSSxDQUFDO1FBR3hCLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFHdkIsc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBR2pDLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLHFCQUFlLEdBQVcsSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRXBCLGlCQUFXLEdBQWUsSUFBSSxDQUFDOztJQTBPM0MsQ0FBQztJQXhPRyw0QkFBTSxHQUFOO1FBQ0ksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksa0JBQVEsQ0FBQyxlQUFlLENBQUM7WUFDckIsY0FBYyxFQUFDLDhEQUFZO1NBQzlCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCwyQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxJQUFnQjtRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztR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aUJBQU8sQ0FBQztnREFDSztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNjO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ1k7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNTO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ2E7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVTtJQXhCWCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBb1EvQjtJQUFELGtCQUFDO0NBcFFELEFBb1FDLENBcFF3QyxnQkFBTSxHQW9ROUM7a0JBcFFvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xyXG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XHJcbmltcG9ydCBNYXJxdWVlIGZyb20gXCIuLi9tb2RlbC9NYXJxdWVlXCI7XHJcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xyXG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Uga2luZ1Bhb1Rhc2sge1xyXG4gICAgYWNoaWV2ZTogbnVtYmVyXHQgICAgICAgICAgICAgICAgICAgIC8vMDrmnKrlrozmiJAgMTrlrozmiJBcclxuICAgIGlkOiBudW1iZXIgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Li76ZSuXHJcbiAgICBwcm9jZXNzOiBudW1iZXIgICAgICAgICAgICAgICAgICAgICAvL+i/m+W6puaDheWGtSAgICAgICAgXHJcbiAgICBwcm9jZXNzVGFyZ2V0OiBudW1iZXJcdCAgICAgICAgICAgIC8v6L+b5bqm55uu5qCHXHJcbiAgICBzdGF0dXM6IG51bWJlclx0ICAgICAgICAgICAgICAgICAgICAvL+S7u+WKoeeKtuaAge+8mjDvvJrml6DnirbmgIHvvJsx77ya562+5Yiw5Lu75Yqh77ybMu+8mumAmuWFs+S7u+WKoe+8mzPvvJrnnIvop4bpopHku7vliqFcclxuICAgIHR5cGU6IG51bWJlclx0ICAgICAgICAgICAgICAgICAgICAvL+S7u+WKoeexu+Wei++8miAw77ya54Ku546L6L+b5bqm5Lu75YqhIDHvvJrngq7njovlkIjmiJDku7vliqEgMu+8mueCrueOizIwMOWFkeaNouS7u+WKoVxyXG4gICAgdGl0bGU6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIG1hcnF1ZWV7XHJcbiAgICBtc2c6c3RyaW5nLFxyXG4gICAgdGltZTpudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBraW5nUGFvRGF0YSB7XHJcbiAgICB0YXNrTGlzdDpBcnJheTxraW5nUGFvVGFzaz5cclxuICAgIHR1cnJldEtpbmdSZWRFbnZlbG9wZURldGFpbERUTzp7XHJcbiAgICAgICAgYm9udXNQZXJDYXBpdGE6bnVtYmVyLFxyXG4gICAgICAgIGNyZWF0ZURhdGU6c3RyaW5nLFxyXG4gICAgICAgIHRvZGF5UmVjZWl2ZTpudW1iZXIsXHJcbiAgICAgICAgdG90YWw6bnVtYmVyLFxyXG4gICAgICAgIHllc3RlcmRheVJlZEVudmVsb3BlOm51bWJlclxyXG4gICAgfVxyXG4gICAgbWFycXVlZTpBcnJheTxtYXJxdWVlPlxyXG59XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lS2luZ1BhbyBleHRlbmRzIGJhc2VUcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBydWxlTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTWFycXVlZSlcclxuICAgIG1hcnF1ZWU6TWFycXVlZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFibGVfc2hhcmVNb25leTpjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFibGVfZGF5TW9uZXk6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmxlX2RheU51bTpjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFibGVfZ29OdW06Y2MuTGFiZWwgPSBudWxsOyAgICBcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGtpbmdUYXNrQ29udGVudDpjYy5Ob2RlID0gbnVsbDsgICAgICAgIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgS2luZ1Rhc2tJdGVtOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUga2luZ1Bhb0RhdGE6a2luZ1Bhb0RhdGEgPSBudWxsOyAgICBcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0tpbmdQYW9UYXNrX1VwZGF0ZSwgdGhpcy51cGRhdGVEYXRhLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIFRyYWNrTWdyLmFydGlsbGVyeV9ib251cyh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOmDjgIznmb7kuIfliIbnuqLjgI3pobXpnaLlsZXnpLpgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoZGF0YTpraW5nUGFvRGF0YSl7XHJcbiAgICAgICAgdGhpcy5raW5nUGFvRGF0YSA9IGRhdGE7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNldERhdGEoKTsgIFxyXG4gICAgICAgIHRoaXMubWFycXVlZS51cGRhdGVNYXJxdWVlTGlzdChkYXRhLm1hcnF1ZWUpOyBcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhKCl7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmtpbmdQYW9EYXRhOyAgICAgICAgXHJcbiAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfc2hhcmVNb25leS5zdHJpbmcgPSBkYXRhLnR1cnJldEtpbmdSZWRFbnZlbG9wZURldGFpbERUTy55ZXN0ZXJkYXlSZWRFbnZlbG9wZSArIFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfZGF5TW9uZXkuc3RyaW5nID0gZGF0YS50dXJyZXRLaW5nUmVkRW52ZWxvcGVEZXRhaWxEVE8uYm9udXNQZXJDYXBpdGEgKyBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX2RheU51bS5zdHJpbmcgPSBkYXRhLnR1cnJldEtpbmdSZWRFbnZlbG9wZURldGFpbERUTy50b3RhbCArIFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfZ29OdW0uc3RyaW5nID0gZGF0YS50dXJyZXRLaW5nUmVkRW52ZWxvcGVEZXRhaWxEVE8udG9kYXlSZWNlaXZlICsgXCJcIjsgICBcclxuICAgICAgICB9ICAgICBcclxuXHJcbiAgICAgICAgbGV0IGtpbmdUYXNrID0gZGF0YS50YXNrTGlzdDtcclxuICAgICAgICBsZXQgY2hpbGRBbGwgPSB0aGlzLmtpbmdUYXNrQ29udGVudC5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgYWRkTnVtID0ga2luZ1Rhc2subGVuZ3RoIC0gY2hpbGRBbGwubGVuZ3RoO1xyXG4gICAgICAgIGlmKGFkZE51bSA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYWRkTnVtOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5LaW5nVGFza0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbU5vZGUueCA9IGNoaWxkQWxsWzBdLng7XHJcbiAgICAgICAgICAgICAgICBpdGVtTm9kZS55ID0gY2hpbGRBbGxbMF0ueTtcclxuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLnBhcmVudCA9IHRoaXMua2luZ1Rhc2tDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgaXRlbU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNoaWxkQWxsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjaGlsZEFsbFtpXTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lID0gYCR7aX1gO1xyXG4gICAgICAgICAgICBpZihraW5nVGFza1tpXSAmJiBpdGVtKXtcclxuICAgICAgICAgICAgICAgIGlmKGtpbmdUYXNrW2ldLmFjaGlldmUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bk5vZGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDlhZHmjaJgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihraW5nVGFza1tpXS5hY2hpZXZlID09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ob2RlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5bey5YWR5o2iYDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihpID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHJOdW0gPSAoa2luZ1Rhc2tbaV0ucHJvY2Vzcy9raW5nVGFza1tpXS5wcm9jZXNzVGFyZ2V0KSAqIDEwMDsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB5ID0gU3RyaW5nKHN0ck51bSkuaW5kZXhPZihcIi5cIikgKyAxOy8v6I635Y+W5bCP5pWw54K555qE5L2N572uICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZih5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJOdW0gPSBOdW1iZXIoc3RyTnVtLnRvRml4ZWQoMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShgbGFibGVfa2luZFByb2dyZXNzYCkuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSNGRkZGRkY+JHtraW5nVGFza1tpXS50aXRsZX06PC9jPjxjb2xvcj0jRkNGRjE1PiR7c3RyTnVtfSU8L2NvbG9yPmA7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuTm9kZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOWKoCR7MzB9JWA7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5raW5nUGFvUHJvZ3Jlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ob2RlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5YqgJHtyZXMuZGF0YS5wZXJjZW50fSVgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAocmVzLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGtpbmdUYXNrW2ldLnR5cGUgPT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoYGxhYmxlX2tpbmRQcm9ncmVzc2ApLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0jRkZGRkZGPiR7a2luZ1Rhc2tbaV0udGl0bGV9OjwvYz48Y29sb3I9I0ZDRkYxNT4ke01hdGguZmxvb3Ioa2luZ1Rhc2tbaV0ucHJvY2VzcyAvIHV0aWwudXNlckRhdGEuZXhjaGFuZ2VSYXRlKX08L2NvbG9yPjxjb2xvcj0jRkZGRkZGPi8ke01hdGguZmxvb3Ioa2luZ1Rhc2tbaV0ucHJvY2Vzc1RhcmdldCAvIHV0aWwudXNlckRhdGEuZXhjaGFuZ2VSYXRlKX08L2NvbG9yPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoYGxhYmxlX2tpbmRQcm9ncmVzc2ApLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0jRkZGRkZGPiR7a2luZ1Rhc2tbaV0udGl0bGV9OjwvYz48Y29sb3I9I0ZDRkYxNT4ke2tpbmdUYXNrW2ldLnByb2Nlc3N9PC9jb2xvcj48Y29sb3I9I0ZGRkZGRj4vJHtraW5nVGFza1tpXS5wcm9jZXNzVGFyZ2V0fTwvY29sb3I+YDtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvY2VzcyA9IChraW5nVGFza1tpXS5wcm9jZXNzL2tpbmdUYXNrW2ldLnByb2Nlc3NUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYocHJvY2VzcyA+PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBwcm9HcmVzc1dpZHRoID0gKGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoYHJlY3ROb2RlYCkud2lkdGggLSA3KSAqIHByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICBpZihwcm9HcmVzc1dpZHRoID4gMSAmJiBwcm9HcmVzc1dpZHRoIDwgMjUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb0dyZXNzV2lkdGggPSAyNTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKGByZWN0Tm9kZWApLmdldENoaWxkQnlOYW1lKGBwcm9ncmVzc05vZGVgKS53aWR0aCA9IHByb0dyZXNzV2lkdGg7ICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tHZXQoKXtcclxuICAgICAgICBUcmFja01nci5hcnRpbGxlcnlfYm9udXMoe1xyXG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpg54K55Ye744CM6aKG546w6YeR44CN5oyJ6ZKuYFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGlmKHRoaXMua2luZ1Bhb0RhdGEgJiYgdGhpcy5raW5nUGFvRGF0YS50YXNrTGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMua2luZ1Bhb0RhdGEudGFza0xpc3RbMF0gJiYgKHRoaXMua2luZ1Bhb0RhdGEudGFza0xpc3RbMF0ucHJvY2Vzc1RhcmdldCA9PSB0aGlzLmtpbmdQYW9EYXRhLnRhc2tMaXN0WzBdLnByb2Nlc3MpKXtcclxuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoYOS6uuW3peWuoeaguOS4rWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChg6I635b6X54Ku546L5Y+v5q+P5pel6aKG5Y+W5YiG57qiYClcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEYXRhKCl7XHJcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XHJcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3Qua2luZ1Bhb1Rhc2tEYXRhLFxyXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tUYXNrR28oZSl7XHJcbiAgICAgICAgbGV0IGNsaWNrSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5wYXJlbnQubmFtZSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMua2luZ1Bhb0RhdGEgJiYgdGhpcy5raW5nUGFvRGF0YS50YXNrTGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMua2luZ1Bhb0RhdGEudGFza0xpc3RbY2xpY2tJbmRleF0gJiYgdGhpcy5raW5nUGFvRGF0YS50YXNrTGlzdFtjbGlja0luZGV4XS5hY2hpZXZlID09IDEpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFhNU0RLLnBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3Qua2luZ1Bhb0dldCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmtpbmdQYW9EYXRhLnRhc2tMaXN0W2NsaWNrSW5kZXhdLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoYOWFkeaNouaIkOWKn++8jOS6uuW3peWuoeaguOS4rWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAocmVzLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybjsgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMua2luZ1Bhb0RhdGEudGFza0xpc3RbY2xpY2tJbmRleF0gJiYgdGhpcy5raW5nUGFvRGF0YS50YXNrTGlzdFtjbGlja0luZGV4XS5hY2hpZXZlID09IDIpe1xyXG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChg5bey5YWR5o2iYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBpZihjbGlja0luZGV4ID09IDApeyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3Blbiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTpwYWdlVHMucGFnZU5hbWUuR2FtZUtpbmdQYW9Qcm9ncmVzcyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGlja1RhcmdldDowLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOmAke3RoaXMua2luZ1Bhb0RhdGEudGFza0xpc3RbY2xpY2tJbmRleF0ucHJvY2Vzc30vJHt0aGlzLmtpbmdQYW9EYXRhLnRhc2tMaXN0W2NsaWNrSW5kZXhdLnByb2Nlc3NUYXJnZXR9YFxyXG4gICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmtpbmdQYW9EYXRhICYmIHRoaXMua2luZ1Bhb0RhdGEudGFza0xpc3Qpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5raW5nUGFvRGF0YS50YXNrTGlzdFtjbGlja0luZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuYXJ0aWxsZXJ5X2JvbnVzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6YCR7dGhpcy5raW5nUGFvRGF0YS50YXNrTGlzdFtjbGlja0luZGV4XS50aXRsZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25faGNkZzpgJHt0aGlzLmtpbmdQYW9EYXRhLnRhc2tMaXN0W2NsaWNrSW5kZXhdLnRpdGxlfeaMiemSrmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tfcHJvZ3Jlc3M6YCR7dGhpcy5raW5nUGFvRGF0YS50YXNrTGlzdFtjbGlja0luZGV4XS5wcm9jZXNzfS8ke3RoaXMua2luZ1Bhb0RhdGEudGFza0xpc3RbY2xpY2tJbmRleF0ucHJvY2Vzc1RhcmdldH1gXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDbG9zZSgpe1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOeZvuS4h+WIhue6omAsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogYOi/lOWbnmBcclxuICAgICAgICB9KSAgXHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tPcGVuUHJvZ3Jlc3MoKXtcclxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lS2luZ1Bhb1Byb2dyZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0Nsb3NlUnVsZSgpe1xyXG4gICAgICAgIHRoaXMucnVsZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tPcGVuUnVsZShlLCBpbmRleCl7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gMCl7XHJcbiAgICAgICAgICAgIFRyYWNrTWdyLmFydGlsbGVyeV9ib251cyh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpg44CM546p5a626K+05piO44CN54K55Ye7YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGluZGV4ID09IDEpe1xyXG4gICAgICAgICAgICBUcmFja01nci5hcnRpbGxlcnlfYm9udXMoe1xyXG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6YOOAjOiOt+W+l+WIhue6oueCrueOi+ivtOaYjuOAjeeCueWHu2BcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ydWxlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==