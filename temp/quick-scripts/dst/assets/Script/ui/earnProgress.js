
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcZWFyblByb2dyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFDOUMsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUErT0M7UUEzT0csa0JBQVksR0FBa0IsSUFBSSxDQUFDLENBQUMsT0FBTztRQUczQyxnQkFBVSxHQUFZLElBQUksQ0FBQyxDQUFDLE1BQU07UUFHbEMsZ0JBQVUsR0FBWSxJQUFJLENBQUMsQ0FBQyxNQUFNO1FBR2xDLGFBQU8sR0FBWSxJQUFJLENBQUMsQ0FBQyxRQUFRO1FBR2pDLGFBQU8sR0FBK0IsSUFBSSxDQUFDLENBQUMsS0FBSztRQUdqRCxVQUFJLEdBQVksSUFBSSxDQUFDLENBQUMsSUFBSTtRQUVsQixVQUFJLEdBQVUsR0FBRyxDQUFDLENBQUMsT0FBTztRQUUxQixjQUFRLEdBQU8sSUFBSSxDQUFDO1FBRXBCLGNBQVEsR0FBVyxLQUFLLENBQUMsQ0FBQSxNQUFNO1FBQy9CLFlBQU0sR0FBVyxLQUFLLENBQUMsQ0FBQSxNQUFNO1FBRXJDLHFHQUFxRztRQUU3RixhQUFPLEdBQVUsSUFBSSxDQUFDLENBQUEsVUFBVTtRQUVoQyxhQUFPLEdBQVUsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUV6QixjQUFRLEdBQVUsSUFBSSxDQUFDOztRQTRNL0IsaUJBQWlCO0lBQ3JCLENBQUM7SUEzTUcsNkJBQU0sR0FBTjtRQUVJLDhDQUE4QztRQUM5Qyx1QkFBdUI7UUFDdkIsTUFBTTtRQUpWLGlCQW9EQztRQTlDRyxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQUksQ0FBQyxVQUFVLENBQUMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUM1RCxJQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLGNBQUksQ0FBQyxVQUFVLENBQUMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7UUFHRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFHWixRQUFRO1FBQ1IsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyx3QkFBd0IsRUFBQztZQUV2QyxJQUFHLENBQUMsS0FBSSxDQUFDLFFBQVE7Z0JBQUMsT0FBTztZQUV6QixLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7WUFFbkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFN0IsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRWpCLElBQUcsS0FBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLEVBQUM7Z0JBQ2QsS0FBSSxDQUFDLE9BQU8sSUFBRyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDeEIsY0FBSSxDQUFDLFVBQVUsQ0FBQyxjQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDL0Q7aUJBQUk7Z0JBQ0QsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1FBRUwsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBR1IsUUFBUTtRQUNSLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsbUJBQW1CLEVBQUMsVUFBQyxHQUFHO1lBQ3RDLElBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUTtnQkFBQyxPQUFPO1lBQ3pCLElBQUcsR0FBRyxHQUFDLENBQUMsRUFBQztnQkFDTCxLQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQztnQkFDckIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQjtRQUVMLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUdSLGNBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpELENBQUM7SUFFRDs7T0FFRztJQUNILGdDQUFTLEdBQVQ7UUFBQSxpQkFZQztRQVhHLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3hCLGNBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsa0JBQVEsQ0FBQyxhQUFhLENBQUM7Z0JBQ25CLGNBQWMsRUFBRSxNQUFNO2dCQUN0QixVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2FBQzdDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELDJCQUFJLEdBQUo7UUFBQSxpQkFhQztRQVhHLGNBQUksQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUMsbUJBQVEsQ0FBQyxpQkFBaUI7WUFDOUIsT0FBTyxFQUFDLFVBQUEsSUFBSTtnQkFDUixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxJQUFJLEVBQUMsVUFBQyxHQUFHO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUM3QixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUNBQVksR0FBWjtRQUNJLGtCQUFRLENBQUMsYUFBYSxDQUFDO1lBQ25CLGNBQWMsRUFBRSxNQUFNO1lBQ3RCLFVBQVUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7U0FDN0MsQ0FBQyxDQUFDO1FBQ0gsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBRSxDQUFDLEVBQUM7WUFDaEMscUJBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFFLE9BQU87U0FDVjtRQUdELHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXZDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRzVELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFVBQVU7SUFFViwrQkFBUSxHQUFSLFVBQVMsSUFBSTtRQUVULElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUM7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN6QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRWpDLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUVaLElBQUcsSUFBSSxDQUFDLE9BQU8sS0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQztnQkFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUN6QztTQUVKO2FBQUk7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1NBRXpDO1FBRUQsSUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQ3ZDO1FBR0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBQyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBRXBELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFbEUsbUJBQW1CO1FBRW5CLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO1FBRXBELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUMsQ0FBQyxDQUFDO1FBRWxFLHVDQUF1QztRQUN2QyxzQkFBc0I7UUFDdEIsZ0RBQWdEO1FBQ2hELFNBQVM7UUFDVCw2QkFBNkI7UUFDN0IsNkNBQTZDO1FBQzdDLElBQUk7UUFFSixvQkFBb0I7UUFHcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUMsQ0FBQyxDQUFDO1FBRW5FLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUMsQ0FBQyxFQUFDO1lBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztTQUN6QzthQUFJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO0lBSUwsQ0FBQztJQUVELDhCQUFPLEdBQVA7UUFDSSxJQUFHLElBQUksQ0FBQyxRQUFRO1lBQUMsT0FBTztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsd0NBQXdDO1FBQ3hDLDJCQUEyQjtRQUMzQix3R0FBd0c7UUFDeEcsbUVBQW1FO1FBQ25FLFFBQVE7UUFDUixhQUFhO0lBRWpCLENBQUM7SUFFRCxVQUFVO0lBQ1YsZ0NBQVMsR0FBVDtRQUNJLHlCQUF5QjtRQUN6QixtRUFBbUU7UUFDbkUsMkNBQTJDO1FBQzNDLDhCQUE4QjtRQUM5QixtQ0FBbUM7UUFDbkMsYUFBYTtRQUNiLCtCQUErQjtRQUMvQixvQ0FBb0M7UUFDcEMsUUFBUTtRQUNSLElBQUk7SUFDUixDQUFDO0lBek9EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7c0RBQ1U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ0s7SUFHeEI7UUFEQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztpREFDSztJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNHO0lBbkJKLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0ErT2hDO0lBQUQsbUJBQUM7Q0EvT0QsQUErT0MsQ0EvT3lDLGdCQUFNLEdBK08vQztrQkEvT29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZWFyblByb2dyZXNzIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIFxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICB0YXNrUHJvZ3Jlc3M6Y2MuUHJvZ3Jlc3NCYXIgPSBudWxsOyAvL+S7u+WKoei/m+W6puadoVxuICAgIFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0YXNrbGFiZWwxOmNjLkxhYmVsID0gbnVsbDsgLy/ku7vliqHmoIfpophcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0YXNrbGFiZWwyOmNjLkxhYmVsID0gbnVsbDsgLy/ku7vliqHmoIfpophcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZ2V0VGltZTpjYy5MYWJlbCA9IG51bGw7IC8v5Y+v5Lul6aKG5aSa5bCR5qyhXG4gICAgXG4gICAgQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcbiAgICBob25nYmFvOmRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7IC8v57qi5YyFXFxcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBoYW5kOiBjYy5Ob2RlID0gbnVsbDsgLy/miYvlir9cblxuICAgIHByaXZhdGUgY29pbjpudW1iZXIgPSA1MDA7IC8v6buY6K6kNTAwXG5cbiAgICBwcml2YXRlIGluaXREYXRhOmFueSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzUnVuaW5nOmJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWcqOS4nFxuICAgIHByaXZhdGUgaXNIYW5kOmJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWcqOS4nFxuXG4gICAgLy8gcHJpdmF0ZSBoYW5kQXJyOmFueVtdID0gW3tudW06MzAwMCxpc0hhbmQ6ZmFsc2V9LHtudW06NjAwMCxpc0hhbmQ6ZmFsc2V9LHtudW06OTAwMCxpc0hhbmQ6ZmFsc2V9XTtcblxuICAgIHByaXZhdGUgbm93R2VhcjpudW1iZXIgPSBudWxsOy8v6buY6K6k6L+b5bqmMzAwMFxuXG4gICAgcHJpdmF0ZSBoYW5kTnVtOm51bWJlciA9IDM7Ly/pu5jorqTmrKHmlbBcblxuICAgIHByaXZhdGUgdXNlckNvaW46bnVtYmVyID0gbnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICAgICAgLy8gY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UYXNrX1Byb2dyZXNzLCAoKT0+e1xuICAgICAgICAvLyAgICAgdGhpcy5zZXRTdGF0ZSgpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgICB0aGlzLmhhbmROdW0gPSB1dGlsLmdldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LmVhcm5Qcm9ncmVzcylcbiAgICAgICAgaWYodGhpcy5oYW5kTnVtID09IG51bGwpeyAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaGFuZE51bSA9IDM7ICAgICBcbiAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkuZWFyblByb2dyZXNzLCAzKTtcbiAgICAgICAgfSBcbiAgICAgICAgXG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIFxuXG4gICAgICAgIC8v55uR5ZCs6YeR5biB6L+b5bqmXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfRWFyblByb2dyZXNzX1VwZGF0YSwoKT0+e1xuXG4gICAgICAgICAgICBpZighdGhpcy5pbml0RGF0YSlyZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEuY2FuUmVjZWl2ZVRpbWVzIC09IDE7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0RGF0YSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaWxsKCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGFuZE51bT4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmROdW0gLT0xOyBcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LmVhcm5Qcm9ncmVzcywgdGhpcy5oYW5kTnVtKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LHRoaXMpO1xuXG5cbiAgICAgICAgLy/nm5HlkKzph5HluIHov5vluqZcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9XYWxsZXRfQWRkQ29pbiwocmVzKT0+e1xuICAgICAgICAgICAgaWYoIXRoaXMuaW5pdERhdGEpcmV0dXJuO1xuICAgICAgICAgICAgaWYocmVzPjApe1xuICAgICAgICAgICAgICAgIHRoaXMudXNlckNvaW4gKz0gcmVzO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0RGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZpbGwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIFxuICAgICAgICB1dGlsLkdsb2JhbE1hcC5zZXQoXCJlYXJuUHJvZ3Jlc3NcIix0aGlzLmhvbmdiYW8ubm9kZSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbmu6HkuoZcbiAgICAgKi9cbiAgICBjaGVja0ZpbGwoKXtcbiAgICAgICAgaWYodGhpcy51c2VyQ29pbj49dGhpcy5pbml0RGF0YS5uZXh0R2Vhcil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/m+W6puW3sua7oe+8jOmHjeaWsOivt+axglwiKVxuICAgICAgICAgICAgdXRpbC5zZW5kQ29pbkRhdGEoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBUcmFja01nci5sdWNreWJhZ190YXNrKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLku7vliqHlrozmiJBcIixcbiAgICAgICAgICAgICAgICB0YXNrX2xldmVsOiBTdHJpbmcodGhpcy5pbml0RGF0YS5uZXh0R2VhciksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKXtcblxuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOlVybENvbnN0LmVhcm5Qcm9ncmVzc0luZGV4LFxuICAgICAgICAgICAgc3VjY2VzczpkYXRhPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOihlcnIpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor7fmsYLlpLHotKXvvIzmmoLml7blsIbov5nkuKrlhbPpl63mjolcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWxleeOsOS7u+WKoVxuICAgICAqL1xuICAgIHNob3dHYW1lRWFybigpe1xuICAgICAgICBUcmFja01nci5sdWNreWJhZ190YXNrKHtcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuS7u+WKoeeCueWHu1wiLFxuICAgICAgICAgICAgdGFza19sZXZlbDogU3RyaW5nKHRoaXMuaW5pdERhdGEubmV4dEdlYXIpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5pbml0RGF0YS5jYW5SZWNlaXZlVGltZXM8PTApe1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWGjei1muWPllwiKyh0aGlzLmluaXREYXRhLm5leHRHZWFyLXRoaXMudXNlckNvaW4pK1wi57qi5YyFXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lRWFyblBybyx7Y29pbjp0aGlzLmNvaW59KTtcblxuICAgICAgICBcbiAgICAgICAgdGhpcy5pc0hhbmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYW5kLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaG9uZ2Jhby5wbGF5QW5pbWF0aW9uKFwic2hha2VcIiwxKTtcbiAgICB9XG5cbiAgICAvKirorr7nva7nirbmgIEgKi9cblxuICAgIHNldFN0YXRlKGRhdGEpe1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IGRhdGE7XG5cbiAgICAgICAgaWYoIXRoaXMuaW5pdERhdGF8fCh0aGlzLmluaXREYXRhJiYhdGhpcy5pbml0RGF0YS5yZXdhcmQpKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yid5aeL5YyW5pWw5o2u5LiN5a2Y5Zyo77yB6ZqQ6JeP6K+l5Yqf6IO9IVwiKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29pbiA9IHRoaXMuaW5pdERhdGEucmV3YXJkO1xuXG4gICAgICAgIGlmKHRoaXMubm93R2Vhcil7XG5cbiAgICAgICAgICAgIGlmKHRoaXMubm93R2VhciE9PXRoaXMuaW5pdERhdGEubmV4dEdlYXIpe1xuICAgICAgICAgICAgICAgIHRoaXMubm93R2VhciA9IHRoaXMuaW5pdERhdGEubmV4dEdlYXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLm5vd0dlYXIgPSB0aGlzLmluaXREYXRhLm5leHRHZWFyO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKCF0aGlzLnVzZXJDb2luKXtcbiAgICAgICAgICAgIHRoaXMudXNlckNvaW4gPSB0aGlzLmluaXREYXRhLnBvaW50O1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnRhc2tsYWJlbDEuc3RyaW5nID0gdGhpcy51c2VyQ29pbitcIlwiO1xuICAgICAgICB0aGlzLnRhc2tsYWJlbDIuc3RyaW5nID0gXCIvXCIrdGhpcy5pbml0RGF0YS5uZXh0R2VhcjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudGFza1Byb2dyZXNzLnByb2dyZXNzID0gdGhpcy51c2VyQ29pbi90aGlzLmluaXREYXRhLm5leHRHZWFyO1xuXG4gICAgICAgIC8vIGlmKHRoaXMuaG9uZ2JhbylcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2V0VGltZS5zdHJpbmcgPSB0aGlzLmluaXREYXRhLmNhblJlY2VpdmVUaW1lcztcblxuICAgICAgICB0aGlzLmdldFRpbWUubm9kZS5wYXJlbnQuYWN0aXZlID0gdGhpcy5pbml0RGF0YS5jYW5SZWNlaXZlVGltZXM+MDtcblxuICAgICAgICAvLyBpZih0aGlzLmluaXREYXRhLmNhblJlY2VpdmVUaW1lcz4wKXtcbiAgICAgICAgLy8gICAgIHRoaXMucGxheUFuaSgpO1xuICAgICAgICAvLyAgICAgLy8gdGhpcy5ob25nYmFvLnBsYXlBbmltYXRpb24oXCJzaGFrZVwiLDApO1xuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMuaXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIHRoaXMuaG9uZ2Jhby5wbGF5QW5pbWF0aW9uKFwic2hha2VcIiwxKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIHRoaXMuY2hlY2tIYW5kKCk7XG5cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGFuZC5hY3RpdmUgPSB0aGlzLmhhbmROdW0+MCYmdGhpcy5pbml0RGF0YS5jYW5SZWNlaXZlVGltZXM+MDtcblxuICAgICAgICBpZih0aGlzLmluaXREYXRhLmNhblJlY2VpdmVUaW1lcz4wKXtcbiAgICAgICAgICAgIHRoaXMuaG9uZ2Jhby5wbGF5QW5pbWF0aW9uKFwic2hha2VcIiwwKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmhvbmdiYW8ucGxheUFuaW1hdGlvbihcInNoYWtlXCIsMSk7XG4gICAgICAgIH1cblxuICAgICAgICBcblxuICAgIH1cblxuICAgIHBsYXlBbmkoKXtcbiAgICAgICAgaWYodGhpcy5pc1J1bmluZylyZXR1cm47XG4gICAgICAgIHRoaXMuaXNSdW5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhvbmdiYW8ucGxheUFuaW1hdGlvbihcInNoYWtlXCIsMCk7XG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMuaG9uZ2JhbykucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKCkucGFyYWxsZWwoXG4gICAgICAgIC8vICAgICAgICAgY2MudHdlZW4oKS5ieSguMSx7YW5nbGU6LTV9KS5ieSguMix7YW5nbGU6MTB9KS5ieSguMix7YW5nbGU6LTEwfSkuYnkoLjEse2FuZ2xlOjV9KS5kZWxheSguNSksXG4gICAgICAgIC8vICAgICAgICAgY2MudHdlZW4oKS50byguMyx7c2NhbGU6MS4yfSkudG8oLjMse3NjYWxlOjF9KS5kZWxheSguNSlcbiAgICAgICAgLy8gICAgIClcbiAgICAgICAgLy8gKS5zdGFydCgpO1xuXG4gICAgfVxuXG4gICAgLyoq5qOA5p+l5omL5Yq/ICovXG4gICAgY2hlY2tIYW5kKCl7XG4gICAgICAgIC8vIGlmKHRoaXMuaXNIYW5kKXJldHVybjtcbiAgICAgICAgLy8gaWYodGhpcy5ub3dHZWFyPT02MDAwfHx0aGlzLm5vd0dlYXI9PTkwMDB8fHRoaXMubm93R2Vhcj09MTIwMDApe1xuICAgICAgICAvLyAgICAgaWYodGhpcy5pbml0RGF0YS5jYW5SZWNlaXZlVGltZXM+MCl7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5pc0hhbmQgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuaGFuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5pc0hhbmQgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmhhbmQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==