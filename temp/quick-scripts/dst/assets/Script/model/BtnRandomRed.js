
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
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
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
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "福利红包",
            app_exposure_type: "icon",
        });
        if (self.lable_time.node.active) {
            AssistCtr_1.AssistCtr.showToastTip(util_1.default.randomRedTimeNum + "s\u540E\u53EF\u9886\u53D6");
        }
        else {
            cc.game.emit(NameTs_1.default.Game_Pop_Open, { name: pageTs_1.default.pageName.GameRandomRedPrize });
        }
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "点击福利红包"
        });
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
            TrackMgr_1.default.welfare_red_envelope({
                activity_state: "福利红包待领取"
            });
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
            TrackMgr_1.default.welfare_red_envelope({
                activity_state: "福利红包待领取"
            });
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
                            TrackMgr_1.default.welfare_red_envelope({
                                activity_state: "福利红包待领取"
                            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxtb2RlbFxcQnRuUmFuZG9tUmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCwyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLCtDQUE4QztBQUM5QyxxREFBZ0Q7QUFDaEQsaURBQTRDO0FBQzVDLHFDQUFnQztBQU0xQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQTZJQztRQTFJRyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixpQkFBVyxHQUFnQyxJQUFJLENBQUM7UUFFaEQsZUFBUyxHQUFHLElBQUksQ0FBQzs7SUFrSXJCLENBQUM7SUFoSUcsK0JBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFHLENBQUMsY0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFDO1lBQ2xCLGNBQUksQ0FBQyxVQUFVLENBQUMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN6RDtRQUVELElBQUksZ0JBQWdCLEdBQUcsY0FBSSxDQUFDLFVBQVUsQ0FBQyxjQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDeEUsSUFBRyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUM7WUFDeEIsY0FBSSxDQUFDLFVBQVUsQ0FBQyxjQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsY0FBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLGNBQUks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Q0QsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7Z0NBQ2YsY0FBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzs2QkFDOUI7NEJBQ0QsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7NEJBQ3ZCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt5QkFDcEI7cUJBQ0o7eUJBQ0k7d0JBQ0QsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO3FCQUM1QjtpQkFDSjtxQkFBTTtvQkFDSCxlQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDL0M7WUFDTCxDQUFDO1lBQ0QsTUFBTSxFQUFFLFVBQUEsR0FBRztZQUVYLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBeElEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDVztJQUc3QjtRQURDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO3FEQUNVO0lBVC9CLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0E2SWhDO0lBQUQsbUJBQUM7Q0E3SUQsQUE2SUMsQ0E3SXlDLEVBQUUsQ0FBQyxTQUFTLEdBNklyRDtrQkE3SW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XHJcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSByYW5kb21SZWREYXRhIHtcclxuICAgIHJlbWFpbk51bTogbnVtYmVyLCAgICAgICAgICAgICAgICAgLy/liankvZnmrKHmlbAgICAgXHJcbn1cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdG5SYW5kb21SZWQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmxlX3RpbWU6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGltZ19jbG9zZVJlZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcclxuICAgIGltZ19vcGVuUmVkOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsOyAgICBcclxuXHJcbiAgICBvbmNlRW50ZXIgPSB0cnVlO1xyXG5cclxuICAgIG9uRW5hYmxlKCkgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYoIXV0aWwuY2hla2NUb2RheSgpKXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5yYW5kb21SZWRUaW1lTnVtLCA2MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmFuZG9tUmVkVGltZU51bSA9IHV0aWwuZ2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkucmFuZG9tUmVkVGltZU51bSlcclxuICAgICAgICBpZihyYW5kb21SZWRUaW1lTnVtID09IG51bGwpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LnJhbmRvbVJlZFRpbWVOdW0sIDYwKTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICB1dGlsLnJhbmRvbVJlZFRpbWVOdW0gPSByYW5kb21SZWRUaW1lTnVtO1xyXG4gICAgICAgIHNlbGYubGFibGVfdGltZS5zdHJpbmcgPSBBc3Npc3RDdHIuZm9ybWF0U2Vjb25kcyh1dGlsLnJhbmRvbVJlZFRpbWVOdW0pO1xyXG4gICAgICAgIHNlbGYudXBkYXRlRGF0YSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHV0aWwuR2xvYmFsTWFwLnNldChcIlJhbmRvbVJlZFwiLHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLnJhbmRvbVJlZFVwZGF0ZSwgdGhpcy51cGRhdGVEYXRhLCB0aGlzKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja09wZW4oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcclxuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6aaW6aG1XCIsXHJcbiAgICAgICAgICAgIGFwcF9ja19tb2R1bGU6IFwi56aP5Yip57qi5YyFXCIsXHJcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGlmIChzZWxmLmxhYmxlX3RpbWUubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChgJHt1dGlsLnJhbmRvbVJlZFRpbWVOdW19c+WQjuWPr+mihuWPlmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1BvcF9PcGVuLCB7bmFtZTpwYWdlVHMucGFnZU5hbWUuR2FtZVJhbmRvbVJlZFByaXplfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUcmFja01nci53ZWxmYXJlX3JlZF9lbnZlbG9wZSh7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIueCueWHu+emj+WIqee6ouWMhVwiXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvcGVuVGltZXIoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICh1dGlsLnJhbmRvbVJlZFRpbWVOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgIHNlbGYubGFibGVfdGltZS5zdHJpbmcgPSBBc3Npc3RDdHIuZm9ybWF0U2Vjb25kcyh1dGlsLnJhbmRvbVJlZFRpbWVOdW0pO1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpbWUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLmltZ19jbG9zZVJlZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLmltZ19vcGVuUmVkLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgIHNlbGYuc2NoZWR1bGUoc2VsZi50aW1lckZ1biwgMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYubGFibGVfdGltZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLmltZ19jbG9zZVJlZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2VsZi5pbWdfb3BlblJlZC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuaW1nX29wZW5SZWQucGxheUFuaW1hdGlvbihcImZ1bGlob25nYmFvXCIsIDApO1xyXG5cclxuICAgICAgICAgICAgVHJhY2tNZ3Iud2VsZmFyZV9yZWRfZW52ZWxvcGUoe1xyXG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi56aP5Yip57qi5YyF5b6F6aKG5Y+WXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGltZXJGdW4oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICh1dGlsLnJhbmRvbVJlZFRpbWVOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgIHNlbGYubGFibGVfdGltZS5zdHJpbmcgPSBBc3Npc3RDdHIuZm9ybWF0U2Vjb25kcyh1dGlsLnJhbmRvbVJlZFRpbWVOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi51bnNjaGVkdWxlKHNlbGYudGltZXJGdW4pO1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2VsZi5pbWdfY2xvc2VSZWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuaW1nX29wZW5SZWQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLmltZ19vcGVuUmVkLnBsYXlBbmltYXRpb24oXCJmdWxpaG9uZ2Jhb1wiLCAwKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWwucmFuZG9tUmVkVGltZU51bSA9IDA7XHJcbiAgICAgICAgICAgIFRyYWNrTWdyLndlbGZhcmVfcmVkX2VudmVsb3BlKHtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuemj+WIqee6ouWMheW+hemihuWPllwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHV0aWwucmFuZG9tUmVkVGltZU51bS0tO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmJ0blJhbmRvbVJlZENvdW50LFxyXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnJlbWFpbmluZ1RpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEucmVtYWluaW5nVGltZXMgPT0gOTkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFibGVfdGltZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdfY2xvc2VSZWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ19vcGVuUmVkLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nX29wZW5SZWQucGxheUFuaW1hdGlvbihcImZ1bGlob25nYmFvXCIsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLndlbGZhcmVfcmVkX2VudmVsb3BlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLnpo/liKnnuqLljIXlvoXpooblj5ZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLm9uY2VFbnRlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yYW5kb21SZWRUaW1lTnVtID0gNjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmNlRW50ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25GYWlsOiByZXMgPT4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==