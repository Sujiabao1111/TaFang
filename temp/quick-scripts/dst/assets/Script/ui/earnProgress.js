
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
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var earnProgress = /** @class */ (function (_super) {
    __extends(earnProgress, _super);
    function earnProgress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskProgress = null; //任务进度条
        _this.tasklabel1 = null; // 当前击杀数
        _this.tasklabel2 = null; // 需要击杀数
        _this.getTime = null; //可以领多少次
        _this.hongbao = null; //红包
        _this.hand = null; //手势
        _this.coin = 500; //默认500
        _this.initData = null;
        _this.isRuning = false; //是否在动
        _this.isHand = false; //是否在动
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
        // 监听击杀进度
        cc.game.on(NameTs_1.default.Game_Kills_Updata, function () {
            if (!_this.initData)
                return;
            _this.tasklabel1.string = (_this.userCoin += 1) + "";
            // this.initData.canReceiveTimes -= 1;
            // this.setState(this.initData);
            // this.checkFill();
            // if (this.handNum > 0) {
            //     this.handNum -= 1;
            //     // this.hand.active = true;
            //     util.setStorage(util.localDiary.earnProgress, this.handNum);
            // } else {
            //     this.hand.active = false;
            // }
        }, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcZWFyblByb2dyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFDOUMsc0RBQWlEO0FBRWpELHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBTTtJQUFoRDtRQUFBLHFFQXNOQztRQWxOVyxrQkFBWSxHQUFtQixJQUFJLENBQUMsQ0FBQyxPQUFPO1FBRzVDLGdCQUFVLEdBQWEsSUFBSSxDQUFDLENBQUMsUUFBUTtRQUdyQyxnQkFBVSxHQUFhLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFHckMsYUFBTyxHQUFhLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFHbEMsYUFBTyxHQUFnQyxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBR2pELFVBQUksR0FBWSxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBRTFCLFVBQUksR0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPO1FBRTNCLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFFckIsY0FBUSxHQUFZLEtBQUssQ0FBQyxDQUFDLE1BQU07UUFDakMsWUFBTSxHQUFZLEtBQUssQ0FBQyxDQUFDLE1BQU07UUFFL0IsYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLFVBQVU7UUFDakMsYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDMUIsY0FBUSxHQUFXLElBQUksQ0FBQzs7SUF3THBDLENBQUM7SUF0TEcsNkJBQU0sR0FBTjtRQUVJLDhDQUE4QztRQUM5Qyx1QkFBdUI7UUFDdkIsTUFBTTtRQUpWLGlCQWlFQztRQTNERyxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQUksQ0FBQyxVQUFVLENBQUMsY0FBSSxD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bUJBQUM7Q0F0TkQsQUFzTkMsQ0F0TnlDLGdCQUFNLEdBc04vQztrQkF0Tm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlYXJuUHJvZ3Jlc3MgZXh0ZW5kcyBiYXNlVHMge1xuXG5cbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgcHJpdmF0ZSB0YXNrUHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyID0gbnVsbDsgLy/ku7vliqHov5vluqbmnaFcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIHRhc2tsYWJlbDE6IGNjLkxhYmVsID0gbnVsbDsgLy8g5b2T5YmN5Ye75p2A5pWwXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSB0YXNrbGFiZWwyOiBjYy5MYWJlbCA9IG51bGw7IC8vIOmcgOimgeWHu+adgOaVsFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgZ2V0VGltZTogY2MuTGFiZWwgPSBudWxsOyAvL+WPr+S7pemihuWkmuWwkeasoVxuXG4gICAgQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcbiAgICBwcml2YXRlIGhvbmdiYW86IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7IC8v57qi5YyFXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGhhbmQ6IGNjLk5vZGUgPSBudWxsOyAvL+aJi+WKv1xuXG4gICAgcHJpdmF0ZSBjb2luOiBudW1iZXIgPSA1MDA7IC8v6buY6K6kNTAwXG5cbiAgICBwcml2YXRlIGluaXREYXRhOiBhbnkgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpc1J1bmluZzogYm9vbGVhbiA9IGZhbHNlOyAvL+aYr+WQpuWcqOWKqFxuICAgIHByaXZhdGUgaXNIYW5kOiBib29sZWFuID0gZmFsc2U7IC8v5piv5ZCm5Zyo5YqoXG5cbiAgICBwcml2YXRlIG5vd0dlYXI6IG51bWJlciA9IG51bGw7Ly/pu5jorqTov5vluqYzMDAwXG4gICAgcHJpdmF0ZSBoYW5kTnVtOiBudW1iZXIgPSAzOy8v6buY6K6k5qyh5pWwXG4gICAgcHJpdmF0ZSB1c2VyQ29pbjogbnVtYmVyID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICAvLyBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1Rhc2tfUHJvZ3Jlc3MsICgpPT57XG4gICAgICAgIC8vICAgICB0aGlzLnNldFN0YXRlKCk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHRoaXMuaGFuZE51bSA9IHV0aWwuZ2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkuZWFyblByb2dyZXNzKVxuICAgICAgICBpZiAodGhpcy5oYW5kTnVtID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZE51bSA9IDM7XG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LmVhcm5Qcm9ncmVzcywgMyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG5cbiAgICAgICAgLy8g55uR5ZCs5Ye75p2A6L+b5bqmXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfS2lsbHNfVXBkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdERhdGEpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMudGFza2xhYmVsMS5zdHJpbmcgPSAodGhpcy51c2VyQ29pbiArPSAxKSArIFwiXCI7XG5cbiAgICAgICAgICAgIC8vIHRoaXMuaW5pdERhdGEuY2FuUmVjZWl2ZVRpbWVzIC09IDE7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHRoaXMuaW5pdERhdGEpO1xuICAgICAgICAgICAgLy8gdGhpcy5jaGVja0ZpbGwoKTtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmhhbmROdW0gPiAwKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5oYW5kTnVtIC09IDE7XG4gICAgICAgICAgICAvLyAgICAgLy8gdGhpcy5oYW5kLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAvLyAgICAgdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5lYXJuUHJvZ3Jlc3MsIHRoaXMuaGFuZE51bSk7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuaGFuZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cblxuICAgICAgICAvL+ebkeWQrOmHkeW4gei/m+W6plxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0Vhcm5Qcm9ncmVzc19VcGRhdGEsICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXREYXRhKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhLmNhblJlY2VpdmVUaW1lcyAtPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmluaXREYXRhKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaWxsKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kTnVtID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZE51bSAtPSAxO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuaGFuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkuZWFyblByb2dyZXNzLCB0aGlzLmhhbmROdW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG5cbiAgICAgICAgLy/nm5HlkKzph5HluIHov5vluqZcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9XYWxsZXRfQWRkQ29pbiwgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXREYXRhKSByZXR1cm47XG4gICAgICAgICAgICBpZiAocmVzID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlckNvaW4gKz0gcmVzO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0RGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZpbGwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCB0aGlzKTtcblxuXG4gICAgICAgIHV0aWwuR2xvYmFsTWFwLnNldChcImVhcm5Qcm9ncmVzc1wiLCB0aGlzLmhvbmdiYW8ubm9kZSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbmu6HkuoZcbiAgICAgKi9cbiAgICBjaGVja0ZpbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJDb2luID49IHRoaXMuaW5pdERhdGEubmV4dEdlYXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+b5bqm5bey5ruh77yM6YeN5paw6K+35rGCXCIpXG4gICAgICAgICAgICB1dGlsLnNlbmRDb2luRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5lYXJuUHJvZ3Jlc3NJbmRleCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+35rGC5aSx6LSl77yM5pqC5pe25bCG6L+Z5Liq5YWz6Zet5o6JXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlsZXnjrDku7vliqFcbiAgICAgKi9cbiAgICBzaG93R2FtZUVhcm4oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdERhdGEuY2FuUmVjZWl2ZVRpbWVzIDw9IDApIHtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLlho3otZrlj5ZcIiArICh0aGlzLmluaXREYXRhLm5leHRHZWFyIC0gdGhpcy51c2VyQ29pbikgKyBcIue6ouWMhVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lRWFyblBybywgeyBjb2luOiB0aGlzLmNvaW4gfSk7XG4gICAgICAgIHRoaXMuaXNIYW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFuZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1J1bmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhvbmdiYW8ucGxheUFuaW1hdGlvbihcInNoYWtlXCIsIDEpO1xuICAgIH1cblxuICAgIC8qKuiuvue9rueKtuaAgSAqL1xuXG4gICAgc2V0U3RhdGUoZGF0YSkge1xuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YTtcbiAgICAgICAgaWYgKCF0aGlzLmluaXREYXRhIHx8ICh0aGlzLmluaXREYXRhICYmICF0aGlzLmluaXREYXRhLnJld2FyZCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yid5aeL5YyW5pWw5o2u5LiN5a2Y5Zyo77yB6ZqQ6JeP6K+l5Yqf6IO9IVwiKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvaW4gPSB0aGlzLmluaXREYXRhLnJld2FyZDtcbiAgICAgICAgaWYgKHRoaXMubm93R2Vhcikge1xuICAgICAgICAgICAgaWYgKHRoaXMubm93R2VhciAhPT0gdGhpcy5pbml0RGF0YS5uZXh0R2Vhcikge1xuICAgICAgICAgICAgICAgIHRoaXMubm93R2VhciA9IHRoaXMuaW5pdERhdGEubmV4dEdlYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vd0dlYXIgPSB0aGlzLmluaXREYXRhLm5leHRHZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnVzZXJDb2luKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJDb2luID0gdGhpcy5pbml0RGF0YS5wb2ludDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy50YXNrbGFiZWwxLnN0cmluZyA9IHRoaXMudXNlckNvaW4gKyBcIlwiO1xuICAgICAgICB0aGlzLnRhc2tsYWJlbDIuc3RyaW5nID0gXCIvXCIgKyB0aGlzLmluaXREYXRhLm5leHRHZWFyO1xuXG4gICAgICAgIHRoaXMudGFza1Byb2dyZXNzLnByb2dyZXNzID0gdGhpcy51c2VyQ29pbiAvIHRoaXMuaW5pdERhdGEubmV4dEdlYXI7XG5cblxuICAgICAgICB0aGlzLmdldFRpbWUuc3RyaW5nID0gdGhpcy5pbml0RGF0YS5jYW5SZWNlaXZlVGltZXM7XG5cbiAgICAgICAgdGhpcy5nZXRUaW1lLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRoaXMuaW5pdERhdGEuY2FuUmVjZWl2ZVRpbWVzID4gMDtcblxuICAgICAgICAvLyBpZih0aGlzLmluaXREYXRhLmNhblJlY2VpdmVUaW1lcz4wKXtcbiAgICAgICAgLy8gICAgIHRoaXMucGxheUFuaSgpO1xuICAgICAgICAvLyAgICAgLy8gdGhpcy5ob25nYmFvLnBsYXlBbmltYXRpb24oXCJzaGFrZVwiLDApO1xuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMuaXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIHRoaXMuaG9uZ2Jhby5wbGF5QW5pbWF0aW9uKFwic2hha2VcIiwxKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIHRoaXMuY2hlY2tIYW5kKCk7XG5cblxuICAgICAgICAvLyB0aGlzLmhhbmQuYWN0aXZlID0gdGhpcy5oYW5kTnVtID4gMCAmJiB0aGlzLmluaXREYXRhLmNhblJlY2VpdmVUaW1lcyA+IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdERhdGEuY2FuUmVjZWl2ZVRpbWVzID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ob25nYmFvLnBsYXlBbmltYXRpb24oXCJzaGFrZVwiLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaG9uZ2Jhby5wbGF5QW5pbWF0aW9uKFwic2hha2VcIiwgMSk7XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHBsYXlBbmkoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUnVuaW5nKSByZXR1cm47XG4gICAgICAgIHRoaXMuaXNSdW5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhvbmdiYW8ucGxheUFuaW1hdGlvbihcInNoYWtlXCIsIDApO1xuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmhvbmdiYW8pLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnBhcmFsbGVsKFxuICAgICAgICAvLyAgICAgICAgIGNjLnR3ZWVuKCkuYnkoLjEse2FuZ2xlOi01fSkuYnkoLjIse2FuZ2xlOjEwfSkuYnkoLjIse2FuZ2xlOi0xMH0pLmJ5KC4xLHthbmdsZTo1fSkuZGVsYXkoLjUpLFxuICAgICAgICAvLyAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjMse3NjYWxlOjEuMn0pLnRvKC4zLHtzY2FsZToxfSkuZGVsYXkoLjUpXG4gICAgICAgIC8vICAgICApXG4gICAgICAgIC8vICkuc3RhcnQoKTtcbiAgICB9XG5cbn1cbiJdfQ==