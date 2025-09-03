"use strict";
cc._RF.push(module, '83b9aPJ7blB5r9sji6nD4dR', 'NewPlayerTaskModel');
// Script/model/NewPlayerTaskModel.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var PageManage_1 = require("../PageManage");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewPlayerTaskModel = /** @class */ (function (_super) {
    __extends(NewPlayerTaskModel, _super);
    function NewPlayerTaskModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_title = null;
        _this.lable_progress = null;
        _this.lable_addProgress = null;
        _this.btn_Node = null;
        _this.btnSprArray = [];
        _this.myData = null;
        return _this;
    }
    NewPlayerTaskModel.prototype.start = function () {
    };
    NewPlayerTaskModel.prototype.initData = function (data) {
        if (data) {
            var self = this;
            self.lable_title.string = data.taskTitle;
            self.lable_progress.string = "<color=#D26C41>\u5B8C\u6210\u5EA6:</c><color=#669E00>" + data.userTaskValue + "</c>/<color=#D26C41>" + data.taskValue + "</c>";
            self.lable_addProgress.string = "+" + data.progress;
            self.btn_Node.getComponent(cc.Sprite).spriteFrame = this.btnSprArray[data.buttonType];
            var tempColor = new cc.Color();
            if (data.buttonType == 1) { //按钮类型: 1-进行中, 2-待领取, 3-已领取
                self.node.getChildByName("lable_btn").getComponent(cc.Label).string = "\u524D\u5F80";
                self.node.getChildByName("lable_btn").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#D25400");
            }
            else if (data.buttonType == 2) {
                self.node.getChildByName("lable_btn").getComponent(cc.Label).string = "\u9886\u53D6";
                self.node.getChildByName("lable_btn").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#4F7A00");
            }
            else if (data.buttonType == 3) {
                self.node.getChildByName("lable_btn").getComponent(cc.Label).string = "\u5DF2\u9886\u53D6";
                self.node.getChildByName("lable_btn").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#757575");
            }
            self.myData = data;
        }
    };
    NewPlayerTaskModel.prototype.clickBtn = function () {
        var _this = this;
        var data = this.myData;
        if (data) {
            TrackMgr_1.default.newcomer_mission({
                activity_state: "\u4EFB\u52A1\u9879\u6309\u94AE\u70B9\u51FB",
                days: "\u7B2C" + this.myData.day + "\u5929",
                task_type: this.myData.taskTitle,
                button_hcdg: this.node.getChildByName("lable_btn").getComponent(cc.Label).string
            });
            if (data.buttonType == 1) { //按钮类型: 1-进行中, 2-前往, 3-待领取, 4-已领取
                if (data.type == 3) {
                    cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameTask);
                }
                PageManage_1.default.singleton.closePage(pageTs_1.default.pageName.GameNewPlayerTask);
            }
            else if (data.buttonType == 2) {
                XMSDK_1.default.getdataStr({
                    url: UrlConst_1.UrlConst.newPlayerTaskGet,
                    data: {
                        taskId: this.myData.id
                    },
                    onSuccess: function (res) {
                        if (res.code === 0) {
                            if (!_this.isValid) {
                                return;
                            }
                            if (_this.myData) {
                                AssistCtr_1.AssistCtr.showToastTip("领取成功");
                                cc.game.emit(NameTs_1.default.Game_NewPlayerTaskGet, {
                                    target: _this.btn_Node
                                });
                                TrackMgr_1.default.newcomer_mission({
                                    activity_state: "\u4EFB\u52A1\u9886\u53D6\u6210\u529F",
                                    days: _this.myData.day + "",
                                    task_type: _this.myData.taskTitle,
                                });
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
            else if (data.buttonType == 3) {
                AssistCtr_1.AssistCtr.showToastTip("已领取");
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], NewPlayerTaskModel.prototype, "lable_title", void 0);
    __decorate([
        property(cc.RichText)
    ], NewPlayerTaskModel.prototype, "lable_progress", void 0);
    __decorate([
        property(cc.Label)
    ], NewPlayerTaskModel.prototype, "lable_addProgress", void 0);
    __decorate([
        property(cc.Node)
    ], NewPlayerTaskModel.prototype, "btn_Node", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewPlayerTaskModel.prototype, "btnSprArray", void 0);
    NewPlayerTaskModel = __decorate([
        ccclass
    ], NewPlayerTaskModel);
    return NewPlayerTaskModel;
}(cc.Component));
exports.default = NewPlayerTaskModel;

cc._RF.pop();