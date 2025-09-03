
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/model/NewPlayerTaskModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxtb2RlbFxcTmV3UGxheWVyVGFza01vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCwyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLDRDQUF1QztBQUV2QywrQ0FBOEM7QUFDOUMscURBQWdEO0FBQ2hELGlEQUE0QztBQUV0QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFnRCxzQ0FBWTtJQUE1RDtRQUFBLHFFQTRHQztRQXpHRyxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixvQkFBYyxHQUFnQixJQUFJLENBQUM7UUFHbkMsdUJBQWlCLEdBQWEsSUFBSSxDQUFDO1FBR25DLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsaUJBQVcsR0FBMEIsRUFBRSxDQUFDO1FBRXhDLFlBQU0sR0FBMEIsSUFBSSxDQUFDOztJQTJGekMsQ0FBQztJQXhGRyxrQ0FBSyxHQUFMO0lBRUEsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBUyxJQUEyQjtRQUNoQyxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLDBEQUF5QyxJQUFJLENBQUMsYUFBYSw0QkFBdUIsSUFBSSxDQUFDLFNBQVMsU0FBTSxDQUFDO1lBQ3BJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsTUFBSSxJQUFJLENBQUMsUUFBVSxDQUFDO1lBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdB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LFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MkRBQ2U7SUFmdkIsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0E0R3RDO0lBQUQseUJBQUM7Q0E1R0QsQUE0R0MsQ0E1RytDLEVBQUUsQ0FBQyxTQUFTLEdBNEczRDtrQkE1R29CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xyXG5pbXBvcnQgUGFnZU1hbmFnZSBmcm9tIFwiLi4vUGFnZU1hbmFnZVwiO1xyXG5pbXBvcnQgeyB3aXRoZHJhd1Rhc2tJdGVtVm9NYXAgfSBmcm9tIFwiLi4vcG9wL2dhbWVOZXdQbGF5ZXJUYXNrXCI7XHJcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xyXG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3UGxheWVyVGFza01vZGVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV90aXRsZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGxhYmxlX3Byb2dyZXNzOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFibGVfYWRkUHJvZ3Jlc3M6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bl9Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBidG5TcHJBcnJheTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW107XHJcblxyXG4gICAgbXlEYXRhOiB3aXRoZHJhd1Rhc2tJdGVtVm9NYXAgPSBudWxsO1xyXG5cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERhdGEoZGF0YTogd2l0aGRyYXdUYXNrSXRlbVZvTWFwKSB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpdGxlLnN0cmluZyA9IGRhdGEudGFza1RpdGxlO1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3Byb2dyZXNzLnN0cmluZyA9IGA8Y29sb3I9I0QyNkM0MT7lrozmiJDluqY6PC9jPjxjb2xvcj0jNjY5RTAwPiR7ZGF0YS51c2VyVGFza1ZhbHVlfTwvYz4vPGNvbG9yPSNEMjZDNDE+JHtkYXRhLnRhc2tWYWx1ZX08L2M+YDtcclxuICAgICAgICAgICAgc2VsZi5sYWJsZV9hZGRQcm9ncmVzcy5zdHJpbmcgPSBgKyR7ZGF0YS5wcm9ncmVzc31gO1xyXG4gICAgICAgICAgICBzZWxmLmJ0bl9Ob2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5idG5TcHJBcnJheVtkYXRhLmJ1dHRvblR5cGVdO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5idXR0b25UeXBlID09IDEpIHsgICAgICAgICAgICAgICAvL+aMiemSruexu+WeizogMS3ov5vooYzkuK0sIDIt5b6F6aKG5Y+WLCAzLeW3sumihuWPllxyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKGBsYWJsZV9idG5gKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDliY3lvoBgO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKGBsYWJsZV9idG5gKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiI0QyNTQwMFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLmJ1dHRvblR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKGBsYWJsZV9idG5gKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDpooblj5ZgO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKGBsYWJsZV9idG5gKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiIzRGN0EwMFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLmJ1dHRvblR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKGBsYWJsZV9idG5gKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDlt7Lpooblj5ZgO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKGBsYWJsZV9idG5gKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiIzc1NzU3NVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLm15RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5teURhdGE7XHJcbiAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgIFRyYWNrTWdyLm5ld2NvbWVyX21pc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDku7vliqHpobnmjInpkq7ngrnlh7tgLFxyXG4gICAgICAgICAgICAgICAgZGF5czogYOesrCR7dGhpcy5teURhdGEuZGF5feWkqWAsXHJcbiAgICAgICAgICAgICAgICB0YXNrX3R5cGU6IHRoaXMubXlEYXRhLnRhc2tUaXRsZSxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbl9oY2RnOiB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYGxhYmxlX2J0bmApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAoZGF0YS5idXR0b25UeXBlID09IDEpIHsgICAgICAgICAgICAgICAvL+aMiemSruexu+WeizogMS3ov5vooYzkuK0sIDIt5YmN5b6ALCAzLeW+hemihuWPliwgNC3lt7Lpooblj5ZcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVUYXNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLmNsb3NlUGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZU5ld1BsYXllclRhc2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuYnV0dG9uVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0Lm5ld1BsYXllclRhc2tHZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrSWQ6IHRoaXMubXlEYXRhLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubXlEYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6aKG5Y+W5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9OZXdQbGF5ZXJUYXNrR2V0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5idG5fTm9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLm5ld2NvbWVyX21pc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogYOS7u+WKoemihuWPluaIkOWKn2AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheXM6IHRoaXMubXlEYXRhLmRheSArIFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tfdHlwZTogdGhpcy5teURhdGEudGFza1RpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChyZXMubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLmJ1dHRvblR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuW3sumihuWPllwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==