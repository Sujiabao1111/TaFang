"use strict";
cc._RF.push(module, '323c3eUyUpIiqm09JtiCnDj', 'earnProgress');
// Script/ui/earnProgress.ts

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
        _this.hongbao = null; //红包\
        _this.hand = null; //手势
        _this.coin = 500; //默认500
        _this.initData = null;
        _this.isRuning = false; //是否在东
        _this.isHand = false; //是否在东
        // private handArr:any[] = [{num:3000,isHand:false},{num:6000,isHand:false},{num:9000,isHand:false}];
        _this.nowGear = null; //默认进度3000
        _this.handNum = 3; //默认次数
        _this.userCoin = null;
        return _this;
        // update (dt) {}
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
                _this.hand.active = true;
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
            TrackMgr_1.default.luckybag_task({
                activity_state: "任务完成",
                task_level: String(this.initData.nextGear),
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
        // if(this.hongbao)
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
        this.hand.active = this.handNum > 0 && this.initData.canReceiveTimes > 0;
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
    /**检查手势 */
    earnProgress.prototype.checkHand = function () {
        // if(this.isHand)return;
        // if(this.nowGear==6000||this.nowGear==9000||this.nowGear==12000){
        //     if(this.initData.canReceiveTimes>0){
        //         this.isHand = true;
        //         this.hand.active = true;
        //     }else{
        //         this.isHand = false;
        //         this.hand.active = false;
        //     }
        // }
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