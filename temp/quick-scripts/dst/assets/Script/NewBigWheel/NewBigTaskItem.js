
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/NewBigWheel/NewBigTaskItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '382c4Wp/qtNH5ZF3bMP4UaD', 'NewBigTaskItem');
// Script/NewBigWheel/NewBigTaskItem.ts

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
var AdPosition_1 = require("../common/AdPosition");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewBigTaskItem = /** @class */ (function (_super) {
    __extends(NewBigTaskItem, _super);
    function NewBigTaskItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controller = null;
        _this.controllerJs = null;
        _this.curNum = null;
        _this.allNum = null;
        return _this;
    }
    NewBigTaskItem.prototype.onLoad = function () {
        this.controllerJs = this.controller.getComponent("NewBigWheelController");
    };
    NewBigTaskItem.prototype.start = function () {
    };
    NewBigTaskItem.prototype.setVideoTast = function (curNum, allNum) {
        var self = this;
        self.node.getChildByName("btn_taskClick").active = false;
        self.node.getChildByName("btn_taskGo").active = false;
        self.node.getChildByName("btn_taskGray").active = false;
        self.node.getChildByName("New Node").getChildByName("lable_taskCount").getComponent(cc.RichText).string = "<color=#AA520D>\uFF08</c><color=#F5663F>" + curNum + "</color><color=#AA520D>/" + allNum + "\uFF09</c>";
        if (curNum < allNum) {
            self.node.getChildByName("btn_taskGo").active = true;
        }
        else {
            self.node.getChildByName("btn_taskGray").active = true;
        }
        this.curNum = curNum;
        this.allNum = allNum;
    };
    NewBigTaskItem.prototype.clickVideoTask = function () {
        var self = this;
        if (this.curNum >= this.allNum) {
            XMSDK_1.default.toast("今日已领取，请明日再来");
            return;
        }
        this.controllerJs.moveChouPos();
        AdController_1.default.loadAd(AdPosition_1.AdPosition.WheelGetRestTimes, function () {
            //广告观看完毕，关闭后
            setTimeout(function () {
                cc.director.emit("NewBigWheelPrize_againChou", { isNewBigTaskItem: true });
            }, 10);
        }, function () {
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    NewBigTaskItem.prototype.setTaskItem = function (taskItemData) {
        var self = this;
        self.node.getChildByName("New Node").getChildByName("lable_taskTitle").getComponent(cc.Label).string = taskItemData.taskTitle;
        self.node.getChildByName("btn_taskClick").active = false;
        self.node.getChildByName("btn_taskGo").active = false;
        self.node.getChildByName("btn_taskGray").active = false;
        if (taskItemData.buttonType == 2) {
            self.node.getChildByName("btn_taskGo").active = true;
        }
        else if (taskItemData.buttonType == 3) {
            self.node.getChildByName("btn_taskClick").active = true;
        }
        else if (taskItemData.buttonType == 4) {
            self.node.getChildByName("btn_taskGray").active = true;
        }
        self.node.getChildByName("New Node").getChildByName("lable_taskCount").getComponent(cc.RichText).string = "<color=#AA520D>\uFF08</c><color=#F5663F>" + taskItemData.userTaskValue + "</color><color=#AA520D>/" + taskItemData.taskValue + "\uFF09</c>";
        self.taskItemData = taskItemData;
    };
    NewBigTaskItem.prototype.clickItem = function () {
        var _this = this;
        var self = this;
        if (self.isClickItem) {
            return;
        }
        self.isClickItem = true;
        setTimeout(function () {
            self.isClickItem = false;
        }, 1000);
        // Global.audioUtils.playClick();
        soundController_1.default.singleton.clickAudio();
        var type = self.taskItemData.taskType;
        if (self.taskItemData.buttonType == 3) {
            TrackMgr_1.default.lotto_phone_click({
                activity_button_click: "领取抽奖机会",
                activity_state: self.taskItemData.taskTitle,
            });
            var taskId = self.taskItemData.id;
            XMSDK_1.default.post({
                url: UrlConst_1.UrlConst.newBigWheel_taskCheckIn,
                data: {
                    id: taskId
                },
                onSuccess: function (res) {
                    if (!_this.isValid) {
                        return;
                    }
                    if (res.code === 0) {
                        _this.controllerJs.updateWinData();
                        XMSDK_1.default.toast("抽奖次数+1");
                        _this.controllerJs.moveChouPos();
                    }
                    else {
                        XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                    }
                },
                onFail: function (res) {
                    XMSDK_1.default.toast('网络出错~', 2.5, 1);
                }
            });
            return;
        }
        else if (self.taskItemData.buttonType == 4) {
            XMSDK_1.default.toast("今日已领取，请明日再来");
            return;
        }
        else if (self.taskItemData.buttonType == 2) {
            this.controllerJs.closePage();
        }
    };
    __decorate([
        property(cc.Node)
    ], NewBigTaskItem.prototype, "controller", void 0);
    NewBigTaskItem = __decorate([
        ccclass
    ], NewBigTaskItem);
    return NewBigTaskItem;
}(cc.Component));
exports.default = NewBigTaskItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnVGFza0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELG1EQUFrRDtBQUVsRCwrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBQ3RDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBK0hDO1FBNUhXLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRW5DLGtCQUFZLEdBQVEsSUFBSSxDQUFBO1FBQ3hCLFlBQU0sR0FBUSxJQUFJLENBQUE7UUFDbEIsWUFBTSxHQUFRLElBQUksQ0FBQTs7SUF3SHRCLENBQUM7SUFySEcsK0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsOEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxxQ0FBWSxHQUFaLFVBQWEsTUFBTSxFQUFFLE1BQU07UUFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxD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SSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFDbkM7eUJBQ0k7d0JBQ0QsZUFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQy9DO2dCQUNMLENBQUM7Z0JBQ0QsTUFBTSxFQUFFLFVBQUEsR0FBRztvQkFDUCxlQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7YUFDSixDQUFDLENBQUE7WUFDRixPQUFPO1NBQ1Y7YUFDSSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRTtZQUN4QyxlQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNCLE9BQU87U0FDVjthQUFNLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUE7U0FDaEM7SUFDTCxDQUFDO0lBM0hEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ2lCO0lBSGxCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0ErSGxDO0lBQUQscUJBQUM7Q0EvSEQsQUErSEMsQ0EvSDJDLEVBQUUsQ0FBQyxTQUFTLEdBK0h2RDtrQkEvSG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IEFqYXggZnJvbSBcIi4uL3NlcnZlci9TZXJ2ZXJNZ3IvQWpheFwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3QmlnVGFza0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBjb250cm9sbGVyOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIGNvbnRyb2xsZXJKczogYW55ID0gbnVsbFxuICAgIGN1ck51bTogYW55ID0gbnVsbFxuICAgIGFsbE51bTogYW55ID0gbnVsbFxuICAgIHRhc2tJdGVtRGF0YVxuICAgIGlzQ2xpY2tJdGVtXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJKcyA9IHRoaXMuY29udHJvbGxlci5nZXRDb21wb25lbnQoXCJOZXdCaWdXaGVlbENvbnRyb2xsZXJcIik7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBzZXRWaWRlb1Rhc3QoY3VyTnVtLCBhbGxOdW0pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdGFza0NsaWNrXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdGFza0dvXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdGFza0dyYXlcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShcIk5ldyBOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfdGFza0NvdW50XCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0jQUE1MjBEPu+8iDwvYz48Y29sb3I9I0Y1NjYzRj4ke2N1ck51bX08L2NvbG9yPjxjb2xvcj0jQUE1MjBEPi8ke2FsbE51bX3vvIk8L2M+YDtcbiAgICAgICAgaWYgKGN1ck51bSA8IGFsbE51bSkge1xuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3Rhc2tHb1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3Rhc2tHcmF5XCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJOdW0gPSBjdXJOdW07XG4gICAgICAgIHRoaXMuYWxsTnVtID0gYWxsTnVtO1xuICAgIH1cblxuICAgIGNsaWNrVmlkZW9UYXNrKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmN1ck51bSA+PSB0aGlzLmFsbE51bSkge1xuICAgICAgICAgICAgWE1TREsudG9hc3QoXCLku4rml6Xlt7Lpooblj5bvvIzor7fmmI7ml6Xlho3mnaVcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJKcy5tb3ZlQ2hvdVBvcygpO1xuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uV2hlZWxHZXRSZXN0VGltZXMsICgpID0+IHtcbiAgICAgICAgICAgIC8v5bm/5ZGK6KeC55yL5a6M5q+V77yM5YWz6Zet5ZCOXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5lbWl0KFwiTmV3QmlnV2hlZWxQcml6ZV9hZ2FpbkNob3VcIiwgeyBpc05ld0JpZ1Rhc2tJdGVtOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldFRhc2tJdGVtKHRhc2tJdGVtRGF0YSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiTmV3IE5vZGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV90YXNrVGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0YXNrSXRlbURhdGEudGFza1RpdGxlO1xuICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdGFza0NsaWNrXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdGFza0dvXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdGFza0dyYXlcIikuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRhc2tJdGVtRGF0YS5idXR0b25UeXBlID09IDIpIHtcbiAgICAgICAgICAgIHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl90YXNrR29cIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0YXNrSXRlbURhdGEuYnV0dG9uVHlwZSA9PSAzKSB7XG4gICAgICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdGFza0NsaWNrXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGFza0l0ZW1EYXRhLmJ1dHRvblR5cGUgPT0gNCkge1xuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3Rhc2tHcmF5XCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJOZXcgTm9kZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3Rhc2tDb3VudFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGA8Y29sb3I9I0FBNTIwRD7vvIg8L2M+PGNvbG9yPSNGNTY2M0Y+JHt0YXNrSXRlbURhdGEudXNlclRhc2tWYWx1ZX08L2NvbG9yPjxjb2xvcj0jQUE1MjBEPi8ke3Rhc2tJdGVtRGF0YS50YXNrVmFsdWV977yJPC9jPmA7XG4gICAgICAgIHNlbGYudGFza0l0ZW1EYXRhID0gdGFza0l0ZW1EYXRhO1xuICAgIH1cblxuICAgIGNsaWNrSXRlbSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5pc0NsaWNrSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaXNDbGlja0l0ZW0gPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuaXNDbGlja0l0ZW0gPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgLy8gR2xvYmFsLmF1ZGlvVXRpbHMucGxheUNsaWNrKCk7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIGxldCB0eXBlID0gc2VsZi50YXNrSXRlbURhdGEudGFza1R5cGU7XG5cbiAgICAgICAgaWYgKHNlbGYudGFza0l0ZW1EYXRhLmJ1dHRvblR5cGUgPT0gMykge1xuICAgICAgICAgICAgVHJhY2tNZ3IubG90dG9fcGhvbmVfY2xpY2soe1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5X2J1dHRvbl9jbGljazogXCLpooblj5bmir3lpZbmnLrkvJpcIixcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpzZWxmLnRhc2tJdGVtRGF0YS50YXNrVGl0bGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbGV0IHRhc2tJZCA9IHNlbGYudGFza0l0ZW1EYXRhLmlkO1xuICAgICAgICAgICAgWE1TREsucG9zdCh7XG4gICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5uZXdCaWdXaGVlbF90YXNrQ2hlY2tJbixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0YXNrSWRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckpzLnVwZGF0ZVdpbkRhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KFwi5oq95aWW5qyh5pWwKzFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJKcy5tb3ZlQ2hvdVBvcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QocmVzLm1lc3NhZ2UgfHwgJ+e9kee7nOWHuumUmX4nLCAyLjUsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkZhaWw6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KCfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGYudGFza0l0ZW1EYXRhLmJ1dHRvblR5cGUgPT0gNCkge1xuICAgICAgICAgICAgWE1TREsudG9hc3QoXCLku4rml6Xlt7Lpooblj5bvvIzor7fmmI7ml6Xlho3mnaVcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZi50YXNrSXRlbURhdGEuYnV0dG9uVHlwZSA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJKcy5jbG9zZVBhZ2UoKVxuICAgICAgICB9XG4gICAgfVxufVxuIl19