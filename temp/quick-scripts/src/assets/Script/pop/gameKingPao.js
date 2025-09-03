"use strict";
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