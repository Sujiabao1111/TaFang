
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/model/BtnRandomRed.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac0ebYVWZJOn6uGq/NHz8rY', 'BtnRandomRed');
// Script/model/BtnRandomRed.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnRandomRed = /** @class */ (function (_super) {
    __extends(BtnRandomRed, _super);
    function BtnRandomRed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_time = null;
        _this.img_closeRed = null;
        _this.img_openRed = null;
        _this.onceEnter = true;
        return _this;
    }
    BtnRandomRed.prototype.onEnable = function () {
        var self = this;
        if (!util_1.default.chekcToday()) {
            util_1.default.setStorage(util_1.default.localDiary.randomRedTimeNum, 60);
        }
        var randomRedTimeNum = util_1.default.getStorage(util_1.default.localDiary.randomRedTimeNum);
        if (randomRedTimeNum == null) {
            util_1.default.setStorage(util_1.default.localDiary.randomRedTimeNum, 60);
        }
        util_1.default.randomRedTimeNum = randomRedTimeNum;
        self.lable_time.string = AssistCtr_1.AssistCtr.formatSeconds(util_1.default.randomRedTimeNum);
        self.updateData();
        util_1.default.GlobalMap.set("RandomRed", this.node);
    };
    BtnRandomRed.prototype.onLoad = function () {
        cc.game.on(NameTs_1.default.randomRedUpdate, this.updateData, this);
    };
    BtnRandomRed.prototype.clickOpen = function () {
        var self = this;
        if (self.lable_time.node.active) {
            AssistCtr_1.AssistCtr.showToastTip(util_1.default.randomRedTimeNum + "s\u540E\u53EF\u9886\u53D6");
        }
        else {
            cc.game.emit(NameTs_1.default.Game_Pop_Open, { name: pageTs_1.default.pageName.GameRandomRedPrize });
        }
    };
    BtnRandomRed.prototype.openTimer = function () {
        var self = this;
        if (util_1.default.randomRedTimeNum > 0) {
            self.lable_time.string = AssistCtr_1.AssistCtr.formatSeconds(util_1.default.randomRedTimeNum);
            self.lable_time.node.active = true;
            self.img_closeRed.active = true;
            self.img_openRed.node.active = false;
            self.schedule(self.timerFun, 1);
        }
        else {
            self.lable_time.node.active = false;
            self.img_closeRed.active = false;
            self.img_openRed.node.active = true;
            self.img_openRed.playAnimation("fulihongbao", 0);
        }
    };
    BtnRandomRed.prototype.timerFun = function () {
        var self = this;
        if (util_1.default.randomRedTimeNum > 0) {
            self.lable_time.string = AssistCtr_1.AssistCtr.formatSeconds(util_1.default.randomRedTimeNum);
        }
        else {
            self.unschedule(self.timerFun);
            self.lable_time.node.active = false;
            self.img_closeRed.active = false;
            self.img_openRed.node.active = true;
            self.img_openRed.playAnimation("fulihongbao", 0);
            util_1.default.randomRedTimeNum = 0;
        }
        util_1.default.randomRedTimeNum--;
    };
    BtnRandomRed.prototype.updateData = function () {
        var _this = this;
        var self = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.btnRandomRedCount,
            onSuccess: function (res) {
                if (res.code === 0 && res.data) {
                    if (!_this.isValid) {
                        return;
                    }
                    if (res.data.remainingTimes > 0) {
                        if (res.data.remainingTimes == 99) {
                            self.lable_time.node.active = false;
                            self.img_closeRed.active = false;
                            self.img_openRed.node.active = true;
                            self.img_openRed.playAnimation("fulihongbao", 0);
                        }
                        else {
                            if (!self.onceEnter) {
                                util_1.default.randomRedTimeNum = 60;
                            }
                            _this.onceEnter = false;
                            _this.openTimer();
                        }
                    }
                    else {
                        _this.node.active = false;
                    }
                }
                else {
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: function (res) {
            }
        });
    };
    __decorate([
        property(cc.Label)
    ], BtnRandomRed.prototype, "lable_time", void 0);
    __decorate([
        property(cc.Node)
    ], BtnRandomRed.prototype, "img_closeRed", void 0);
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], BtnRandomRed.prototype, "img_openRed", void 0);
    BtnRandomRed = __decorate([
        ccclass
    ], BtnRandomRed);
    return BtnRandomRed;
}(cc.Component));
exports.default = BtnRandomRed;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxtb2RlbFxcQnRuUmFuZG9tUmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCwyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLCtDQUE4QztBQUM5QyxxREFBZ0Q7QUFFaEQscUNBQWdDO0FBTTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBMkhDO1FBeEhHLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQWdDLElBQUksQ0FBQztRQUVoRCxlQUFTLEdBQUcsSUFBSSxDQUFDOztJQWdIckIsQ0FBQztJQTlHRywrQkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxjQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDcEIsY0FBSSxDQUFDLFVBQVUsQ0FBQyxjQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsSUFBSSxnQkFBZ0IsR0FBRyxjQUFJLENBQUMsVUFBVSxDQUFDLGNBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUN4RSxJQUFJLGdCQUFnQixJQUFJLElBQUksRUFBRTtZQUMxQixjQUFJLENBQUMsVUFBVSxDQUFDLGNBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDekQ7UUFFRCxjQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsY0FBSSxDQUFDLGdCQUFnQixD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Q0FBQztJQXRIRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNTO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztxREFDVTtJQVQvQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBMkhoQztJQUFELG1CQUFDO0NBM0hELEFBMkhDLENBM0h5QyxFQUFFLENBQUMsU0FBUyxHQTJIckQ7a0JBM0hvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xyXG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XHJcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xyXG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcmFuZG9tUmVkRGF0YSB7XHJcbiAgICByZW1haW5OdW06IG51bWJlciwgICAgICAgICAgICAgICAgIC8v5Ymp5L2Z5qyh5pWwICAgIFxyXG59XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuUmFuZG9tUmVkIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV90aW1lOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpbWdfY2xvc2VSZWQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpXHJcbiAgICBpbWdfb3BlblJlZDogZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5ID0gbnVsbDtcclxuXHJcbiAgICBvbmNlRW50ZXIgPSB0cnVlO1xyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIXV0aWwuY2hla2NUb2RheSgpKSB7XHJcbiAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkucmFuZG9tUmVkVGltZU51bSwgNjApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJhbmRvbVJlZFRpbWVOdW0gPSB1dGlsLmdldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LnJhbmRvbVJlZFRpbWVOdW0pXHJcbiAgICAgICAgaWYgKHJhbmRvbVJlZFRpbWVOdW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LnJhbmRvbVJlZFRpbWVOdW0sIDYwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHV0aWwucmFuZG9tUmVkVGltZU51bSA9IHJhbmRvbVJlZFRpbWVOdW07XHJcbiAgICAgICAgc2VsZi5sYWJsZV90aW1lLnN0cmluZyA9IEFzc2lzdEN0ci5mb3JtYXRTZWNvbmRzKHV0aWwucmFuZG9tUmVkVGltZU51bSk7XHJcbiAgICAgICAgc2VsZi51cGRhdGVEYXRhKCk7XHJcblxyXG4gICAgICAgIHV0aWwuR2xvYmFsTWFwLnNldChcIlJhbmRvbVJlZFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5yYW5kb21SZWRVcGRhdGUsIHRoaXMudXBkYXRlRGF0YSwgdGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrT3BlbigpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICBpZiAoc2VsZi5sYWJsZV90aW1lLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoYCR7dXRpbC5yYW5kb21SZWRUaW1lTnVtfXPlkI7lj6/pooblj5ZgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgeyBuYW1lOiBwYWdlVHMucGFnZU5hbWUuR2FtZVJhbmRvbVJlZFByaXplIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb3BlblRpbWVyKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodXRpbC5yYW5kb21SZWRUaW1lTnVtID4gMCkge1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpbWUuc3RyaW5nID0gQXNzaXN0Q3RyLmZvcm1hdFNlY29uZHModXRpbC5yYW5kb21SZWRUaW1lTnVtKTtcclxuICAgICAgICAgICAgc2VsZi5sYWJsZV90aW1lLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5pbWdfY2xvc2VSZWQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5pbWdfb3BlblJlZC5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICBzZWxmLnNjaGVkdWxlKHNlbGYudGltZXJGdW4sIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2VsZi5pbWdfY2xvc2VSZWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuaW1nX29wZW5SZWQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLmltZ19vcGVuUmVkLnBsYXlBbmltYXRpb24oXCJmdWxpaG9uZ2Jhb1wiLCAwKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRpbWVyRnVuKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodXRpbC5yYW5kb21SZWRUaW1lTnVtID4gMCkge1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpbWUuc3RyaW5nID0gQXNzaXN0Q3RyLmZvcm1hdFNlY29uZHModXRpbC5yYW5kb21SZWRUaW1lTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYudW5zY2hlZHVsZShzZWxmLnRpbWVyRnVuKTtcclxuICAgICAgICAgICAgc2VsZi5sYWJsZV90aW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuaW1nX2Nsb3NlUmVkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLmltZ19vcGVuUmVkLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5pbWdfb3BlblJlZC5wbGF5QW5pbWF0aW9uKFwiZnVsaWhvbmdiYW9cIiwgMCk7XHJcbiAgICAgICAgICAgIHV0aWwucmFuZG9tUmVkVGltZU51bSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHV0aWwucmFuZG9tUmVkVGltZU51bS0tO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmJ0blJhbmRvbVJlZENvdW50LFxyXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEucmVtYWluaW5nVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5yZW1haW5pbmdUaW1lcyA9PSA5OSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYWJsZV90aW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ19jbG9zZVJlZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nX29wZW5SZWQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdfb3BlblJlZC5wbGF5QW5pbWF0aW9uKFwiZnVsaWhvbmdiYW9cIiwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLm9uY2VFbnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmFuZG9tUmVkVGltZU51bSA9IDYwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmNlRW50ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25GYWlsOiByZXMgPT4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==