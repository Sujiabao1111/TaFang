
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/earnProgress.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '323c3eUyUpIiqm09JtiCnDj', 'earnProgress');
// Script/ui/earnProgress.ts

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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var earnProgress = /** @class */ (function (_super) {
    __extends(earnProgress, _super);
    function earnProgress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskProgress = null; //任务进度条
        _this.tasklabel1 = null; //任务标题
        _this.tasklabel2 = null; //任务标题
        _this.getTime = null; //可以领多少次
        _this.hongbao = null; //红包
        _this.hand = null; //手势
        _this.coin = 500; //默认500
        _this.initData = null;
        _this.isRuning = false; //是否在东
        _this.isHand = false; //是否在东
        _this.nowGear = null; //默认进度3000
        _this.handNum = 3; //默认次数
        _this.userCoin = null;
        return _this;
    }
    earnProgress.prototype.onLoad = function () {
        // cc.game.on(NameTs.Game_Task_Progress, ()=>{
        //     this.setState();
        // });
        var _this = this;
        this.handNum = util_1.default.getStorage(util_1.default.localDiary.earnProgress);
        if (this.handNum == null) {
            this.handNum = 3;
            util_1.default.setStorage(util_1.default.localDiary.earnProgress, 3);
        }
        this.init();
        //监听金币进度
        cc.game.on(NameTs_1.default.Game_EarnProgress_Updata, function () {
            if (!_this.initData)
                return;
            _this.initData.canReceiveTimes -= 1;
            _this.setState(_this.initData);
            _this.checkFill();
            if (_this.handNum > 0) {
                _this.handNum -= 1;
                // this.hand.active = true;
                util_1.default.setStorage(util_1.default.localDiary.earnProgress, _this.handNum);
            }
            else {
                _this.hand.active = false;
            }
        }, this);
        //监听金币进度
        cc.game.on(NameTs_1.default.Game_Wallet_AddCoin, function (res) {
            if (!_this.initData)
                return;
            if (res > 0) {
                _this.userCoin += res;
                _this.setState(_this.initData);
                _this.checkFill();
            }
        }, this);
        util_1.default.GlobalMap.set("earnProgress", this.hongbao.node);
    };
    /**
     * 检查是否满了
     */
    earnProgress.prototype.checkFill = function () {
        var _this = this;
        if (this.userCoin >= this.initData.nextGear) {
            console.log("进度已满，重新请求");
            util_1.default.sendCoinData(function () {
                _this.init();
            });
        }
    };
    earnProgress.prototype.init = function () {
        var _this = this;
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.earnProgressIndex,
            success: function (data) {
                _this.setState(data);
            },
            fail: function (err) {
                console.log("请求失败，暂时将这个关闭掉");
                _this.node.active = false;
            }
        });
    };
    /**
     * 展现任务
     */
    earnProgress.prototype.showGameEarn = function () {
        TrackMgr_1.default.luckybag_task({
            activity_state: "任务点击",
            task_level: String(this.initData.nextGear),
        });
        if (this.initData.canReceiveTimes <= 0) {
            AssistCtr_1.AssistCtr.showToastTip("再赚取" + (this.initData.nextGear - this.userCoin) + "红包");
            return;
        }
        soundController_1.default.singleton.clickAudio();
        this.showPage(pageTs_1.default.pageName.GameEarnPro, { coin: this.coin });
        this.isHand = false;
        this.hand.active = false;
        this.isRuning = false;
        this.hongbao.playAnimation("shake", 1);
    };
    /**设置状态 */
    earnProgress.prototype.setState = function (data) {
        this.initData = data;
        if (!this.initData || (this.initData && !this.initData.reward)) {
            console.log("初始化数据不存在！隐藏该功能!");
            this.node.active = false;
            return;
        }
        this.coin = this.initData.reward;
        if (this.nowGear) {
            if (this.nowGear !== this.initData.nextGear) {
                this.nowGear = this.initData.nextGear;
            }
        }
        else {
            this.nowGear = this.initData.nextGear;
        }
        if (!this.userCoin) {
            this.userCoin = this.initData.point;
        }
        this.tasklabel1.string = this.userCoin + "";
        this.tasklabel2.string = "/" + this.initData.nextGear;
        this.taskProgress.progress = this.userCoin / this.initData.nextGear;
        this.getTime.string = this.initData.canReceiveTimes;
        this.getTime.node.parent.active = this.initData.canReceiveTimes > 0;
        // if(this.initData.canReceiveTimes>0){
        //     this.playAni();
        //     // this.hongbao.playAnimation("shake",0);
        // }else{
        //     this.isRuning = false;
        //     this.hongbao.playAnimation("shake",1);
        // }
        // this.checkHand();
        // this.hand.active = this.handNum > 0 && this.initData.canReceiveTimes > 0;
        if (this.initData.canReceiveTimes > 0) {
            this.hongbao.playAnimation("shake", 0);
        }
        else {
            this.isRuning = false;
            this.hongbao.playAnimation("shake", 1);
        }
    };
    earnProgress.prototype.playAni = function () {
        if (this.isRuning)
            return;
        this.isRuning = true;
        this.hongbao.playAnimation("shake", 0);
        // cc.tween(this.hongbao).repeatForever(
        //     cc.tween().parallel(
        //         cc.tween().by(.1,{angle:-5}).by(.2,{angle:10}).by(.2,{angle:-10}).by(.1,{angle:5}).delay(.5),
        //         cc.tween().to(.3,{scale:1.2}).to(.3,{scale:1}).delay(.5)
        //     )
        // ).start();
    };
    __decorate([
        property(cc.ProgressBar)
    ], earnProgress.prototype, "taskProgress", void 0);
    __decorate([
        property(cc.Label)
    ], earnProgress.prototype, "tasklabel1", void 0);
    __decorate([
        property(cc.Label)
    ], earnProgress.prototype, "tasklabel2", void 0);
    __decorate([
        property(cc.Label)
    ], earnProgress.prototype, "getTime", void 0);
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], earnProgress.prototype, "hongbao", void 0);
    __decorate([
        property(cc.Node)
    ], earnProgress.prototype, "hand", void 0);
    earnProgress = __decorate([
        ccclass
    ], earnProgress);
    return earnProgress;
}(baseTs_1.default));
exports.default = earnProgress;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcZWFyblByb2dyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFDOUMsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUEwTUM7UUF0TVcsa0JBQVksR0FBbUIsSUFBSSxDQUFDLENBQUMsT0FBTztRQUc1QyxnQkFBVSxHQUFhLElBQUksQ0FBQyxDQUFDLE1BQU07UUFHbkMsZ0JBQVUsR0FBYSxJQUFJLENBQUMsQ0FBQyxNQUFNO1FBR25DLGFBQU8sR0FBYSxJQUFJLENBQUMsQ0FBQyxRQUFRO1FBR2xDLGFBQU8sR0FBZ0MsSUFBSSxDQUFDLENBQUMsSUFBSTtRQUdqRCxVQUFJLEdBQVksSUFBSSxDQUFDLENBQUMsSUFBSTtRQUUxQixVQUFJLEdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTztRQUUzQixjQUFRLEdBQVEsSUFBSSxDQUFDO1FBRXJCLGNBQVEsR0FBWSxLQUFLLENBQUMsQ0FBQSxNQUFNO1FBQ2hDLFlBQU0sR0FBWSxLQUFLLENBQUMsQ0FBQSxNQUFNO1FBRzlCLGFBQU8sR0FBVyxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBRWpDLGFBQU8sR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBRTFCLGNBQVEsR0FBVyxJQUFJLENBQUM7O0lBeUtwQyxDQUFDO0lBdktHLDZCQUFNLEdBQU47UUFFSSw4Q0FBOEM7UUFDOUMsdUJBQXVCO1FBQ3ZCLE1BQU07UUFKVixpQkErQ0M7UUF6Q0csSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFJLENBQUMsVUFB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MUM7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxQztJQUlMLENBQUM7SUFFTyw4QkFBTyxHQUFmO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLHdDQUF3QztRQUN4QywyQkFBMkI7UUFDM0Isd0dBQXdHO1FBQ3hHLG1FQUFtRTtRQUNuRSxRQUFRO1FBQ1IsYUFBYTtJQUNqQixDQUFDO0lBcE1EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7c0RBQ21CO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ2lCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ2lCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ2M7SUFHakM7UUFEQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztpREFDYztJQUdwRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNXO0lBbkJaLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0EwTWhDO0lBQUQsbUJBQUM7Q0ExTUQsQUEwTUMsQ0ExTXlDLGdCQUFNLEdBME0vQztrQkExTW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlYXJuUHJvZ3Jlc3MgZXh0ZW5kcyBiYXNlVHMge1xuXG5cbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgcHJpdmF0ZSB0YXNrUHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyID0gbnVsbDsgLy/ku7vliqHov5vluqbmnaFcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIHRhc2tsYWJlbDE6IGNjLkxhYmVsID0gbnVsbDsgLy/ku7vliqHmoIfpophcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIHRhc2tsYWJlbDI6IGNjLkxhYmVsID0gbnVsbDsgLy/ku7vliqHmoIfpophcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGdldFRpbWU6IGNjLkxhYmVsID0gbnVsbDsgLy/lj6/ku6XpooblpJrlsJHmrKFcblxuICAgIEBwcm9wZXJ0eShkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpXG4gICAgcHJpdmF0ZSBob25nYmFvOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsOyAvL+e6ouWMhVxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBoYW5kOiBjYy5Ob2RlID0gbnVsbDsgLy/miYvlir9cblxuICAgIHByaXZhdGUgY29pbjogbnVtYmVyID0gNTAwOyAvL+m7mOiupDUwMFxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YTogYW55ID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXNSdW5pbmc6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWcqOS4nFxuICAgIHByaXZhdGUgaXNIYW5kOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKblnKjkuJxcblxuXG4gICAgcHJpdmF0ZSBub3dHZWFyOiBudW1iZXIgPSBudWxsOy8v6buY6K6k6L+b5bqmMzAwMFxuXG4gICAgcHJpdmF0ZSBoYW5kTnVtOiBudW1iZXIgPSAzOy8v6buY6K6k5qyh5pWwXG5cbiAgICBwcml2YXRlIHVzZXJDb2luOiBudW1iZXIgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgICAgIC8vIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVGFza19Qcm9ncmVzcywgKCk9PntcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgdGhpcy5oYW5kTnVtID0gdXRpbC5nZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5lYXJuUHJvZ3Jlc3MpXG4gICAgICAgIGlmICh0aGlzLmhhbmROdW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kTnVtID0gMztcbiAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkuZWFyblByb2dyZXNzLCAzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG5cblxuICAgICAgICAvL+ebkeWQrOmHkeW4gei/m+W6plxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0Vhcm5Qcm9ncmVzc19VcGRhdGEsICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXREYXRhKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhLmNhblJlY2VpdmVUaW1lcyAtPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmluaXREYXRhKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaWxsKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kTnVtID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZE51bSAtPSAxO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuaGFuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkuZWFyblByb2dyZXNzLCB0aGlzLmhhbmROdW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG5cbiAgICAgICAgLy/nm5HlkKzph5HluIHov5vluqZcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9XYWxsZXRfQWRkQ29pbiwgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXREYXRhKSByZXR1cm47XG4gICAgICAgICAgICBpZiAocmVzID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlckNvaW4gKz0gcmVzO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0RGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZpbGwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCB0aGlzKTtcblxuXG4gICAgICAgIHV0aWwuR2xvYmFsTWFwLnNldChcImVhcm5Qcm9ncmVzc1wiLCB0aGlzLmhvbmdiYW8ubm9kZSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbmu6HkuoZcbiAgICAgKi9cbiAgICBjaGVja0ZpbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJDb2luID49IHRoaXMuaW5pdERhdGEubmV4dEdlYXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+b5bqm5bey5ruh77yM6YeN5paw6K+35rGCXCIpXG4gICAgICAgICAgICB1dGlsLnNlbmRDb2luRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5lYXJuUHJvZ3Jlc3NJbmRleCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+35rGC5aSx6LSl77yM5pqC5pe25bCG6L+Z5Liq5YWz6Zet5o6JXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlsZXnjrDku7vliqFcbiAgICAgKi9cbiAgICBzaG93R2FtZUVhcm4oKSB7XG4gICAgICAgIFRyYWNrTWdyLmx1Y2t5YmFnX3Rhc2soe1xuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5Lu75Yqh54K55Ye7XCIsXG4gICAgICAgICAgICB0YXNrX2xldmVsOiBTdHJpbmcodGhpcy5pbml0RGF0YS5uZXh0R2VhciksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5pbml0RGF0YS5jYW5SZWNlaXZlVGltZXMgPD0gMCkge1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWGjei1muWPllwiICsgKHRoaXMuaW5pdERhdGEubmV4dEdlYXIgLSB0aGlzLnVzZXJDb2luKSArIFwi57qi5YyFXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVFYXJuUHJvLCB7IGNvaW46IHRoaXMuY29pbiB9KTtcbiAgICAgICAgdGhpcy5pc0hhbmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYW5kLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaG9uZ2Jhby5wbGF5QW5pbWF0aW9uKFwic2hha2VcIiwgMSk7XG4gICAgfVxuXG4gICAgLyoq6K6+572u54q25oCBICovXG5cbiAgICBzZXRTdGF0ZShkYXRhKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICAgICAgICBpZiAoIXRoaXMuaW5pdERhdGEgfHwgKHRoaXMuaW5pdERhdGEgJiYgIXRoaXMuaW5pdERhdGEucmV3YXJkKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliJ3lp4vljJbmlbDmja7kuI3lrZjlnKjvvIHpmpDol4/or6Xlip/og70hXCIpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29pbiA9IHRoaXMuaW5pdERhdGEucmV3YXJkO1xuICAgICAgICBpZiAodGhpcy5ub3dHZWFyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ub3dHZWFyICE9PSB0aGlzLmluaXREYXRhLm5leHRHZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3dHZWFyID0gdGhpcy5pbml0RGF0YS5uZXh0R2VhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm93R2VhciA9IHRoaXMuaW5pdERhdGEubmV4dEdlYXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudXNlckNvaW4pIHtcbiAgICAgICAgICAgIHRoaXMudXNlckNvaW4gPSB0aGlzLmluaXREYXRhLnBvaW50O1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnRhc2tsYWJlbDEuc3RyaW5nID0gdGhpcy51c2VyQ29pbiArIFwiXCI7XG4gICAgICAgIHRoaXMudGFza2xhYmVsMi5zdHJpbmcgPSBcIi9cIiArIHRoaXMuaW5pdERhdGEubmV4dEdlYXI7XG5cbiAgICAgICAgdGhpcy50YXNrUHJvZ3Jlc3MucHJvZ3Jlc3MgPSB0aGlzLnVzZXJDb2luIC8gdGhpcy5pbml0RGF0YS5uZXh0R2VhcjtcblxuXG4gICAgICAgIHRoaXMuZ2V0VGltZS5zdHJpbmcgPSB0aGlzLmluaXREYXRhLmNhblJlY2VpdmVUaW1lcztcblxuICAgICAgICB0aGlzLmdldFRpbWUubm9kZS5wYXJlbnQuYWN0aXZlID0gdGhpcy5pbml0RGF0YS5jYW5SZWNlaXZlVGltZXMgPiAwO1xuXG4gICAgICAgIC8vIGlmKHRoaXMuaW5pdERhdGEuY2FuUmVjZWl2ZVRpbWVzPjApe1xuICAgICAgICAvLyAgICAgdGhpcy5wbGF5QW5pKCk7XG4gICAgICAgIC8vICAgICAvLyB0aGlzLmhvbmdiYW8ucGxheUFuaW1hdGlvbihcInNoYWtlXCIsMCk7XG4gICAgICAgIC8vIH1lbHNle1xuICAgICAgICAvLyAgICAgdGhpcy5pc1J1bmluZyA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgdGhpcy5ob25nYmFvLnBsYXlBbmltYXRpb24oXCJzaGFrZVwiLDEpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gdGhpcy5jaGVja0hhbmQoKTtcblxuXG4gICAgICAgIC8vIHRoaXMuaGFuZC5hY3RpdmUgPSB0aGlzLmhhbmROdW0gPiAwICYmIHRoaXMuaW5pdERhdGEuY2FuUmVjZWl2ZVRpbWVzID4gMDtcblxuICAgICAgICBpZiAodGhpcy5pbml0RGF0YS5jYW5SZWNlaXZlVGltZXMgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmhvbmdiYW8ucGxheUFuaW1hdGlvbihcInNoYWtlXCIsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1J1bmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ob25nYmFvLnBsYXlBbmltYXRpb24oXCJzaGFrZVwiLCAxKTtcbiAgICAgICAgfVxuXG5cblxuICAgIH1cblxuICAgIHByaXZhdGUgcGxheUFuaSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSdW5pbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc1J1bmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuaG9uZ2Jhby5wbGF5QW5pbWF0aW9uKFwic2hha2VcIiwgMCk7XG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMuaG9uZ2JhbykucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkucGFyYWxsZWwoXG4gICAgICAgIC8vICAgICAgICAgY2MudHdlZW4oKS5ieSguMSx7YW5nbGU6LTV9KS5ieSguMix7YW5nbGU6MTB9KS5ieSguMix7YW5nbGU6LTEwfSkuYnkoLjEse2FuZ2xlOjV9KS5kZWxheSguNSksXG4gICAgICAgIC8vICAgICAgICAgY2MudHdlZW4oKS50byguMyx7c2NhbGU6MS4yfSkudG8oLjMse3NjYWxlOjF9KS5kZWxheSguNSlcbiAgICAgICAgLy8gICAgIClcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuICAgIH1cblxufVxuIl19