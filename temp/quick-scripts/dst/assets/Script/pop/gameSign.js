
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameSign.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd02cd6KMFlPy7w4Kj7/3FJ8', 'gameSign');
// Script/pop/gameSign.ts

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
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameSign = /** @class */ (function (_super) {
    __extends(gameSign, _super);
    function gameSign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layoutSignItem = null;
        _this.btnsNode = null;
        _this.btn_close = null;
        _this.check_toggle = null;
        _this.label_check = null;
        _this.feed_node = null;
        _this.data = null;
        _this.currentDay = null;
        _this.isInsert = false;
        return _this;
    }
    gameSign.prototype.onEnable = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "\u7B7E\u5230\u5F39\u7A97",
        });
    };
    gameSign.prototype.init = function (data) {
        if (data) {
            this.setData(data);
        }
        this.isInsert = Math.random() > .5;
        if (this.isInsert) {
            if (!util_1.default.adPreObj[AdPosition_1.AdPosition.SignAwardInsert]) {
                util_1.default.preloadAd(AdPosition_1.AdPosition.SignAwardInsert);
            }
        }
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.VideoSignDouble]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.VideoSignDouble);
        }
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.InfoSignRewardView]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.InfoSignRewardView, true);
        }
    };
    gameSign.prototype.onDisable = function () {
        // AdController.hideInfoAd(AdPosition.InfoSignView);           
        // if(!util.adPreObj[AdPosition.InfoSignView]){
        //     util.preloadAd(AdPosition.InfoSignView,true)
        // }        
    };
    gameSign.prototype.isTodaySignOk = function () {
        return this.btnsNode.getChildByName("btn_has").active == true;
    };
    gameSign.prototype.setData = function (data) {
        var _this = this;
        this.data = data;
        //console.log("#######################setData : " + JSON.stringify(data))
        this.currentDay = this.data.todayChecked ? this.data.signDays - 1 : this.data.signDays;
        for (var m in this.data.list) { //签到item内容更新
            var item = this.data.list[m];
            var sign_list = this.layoutSignItem.children;
            if (item && sign_list[m]) {
                var script = sign_list[m].getComponent("SignModel");
                if (this.currentDay == parseInt(m)) {
                    if (this.data.list[m].rewardList && this.data.list[m].rewardList[0]) {
                        this.label_check.string = "观看视频额外领取一份";
                    }
                    if (item.rewardList[0]) {
                        //this.lable_otherNum.string = item.rewardList[0].rewardPlusValue - item.rewardList[0].rewardValue + "";
                    }
                }
                var hasGain = Number(m) < this.data.signDays;
                script && script.init({
                    day: Number(m) + 1,
                    rewardList: item.rewardList,
                    isCurrent: this.currentDay == parseInt(m),
                    hasGain: hasGain,
                    showDouble: hasGain ? item.state == 2 : this.check_toggle.isChecked,
                    userPeriod: this.data.userPeriod,
                });
            }
        }
        var delay = 0;
        if (!this.data.todayChecked) {
            delay = 2;
        }
        this.scheduleOnce(function () {
            _this.btn_close.active = true;
        }, delay);
        this.setBtnsVis();
    };
    gameSign.prototype.setBtnsVis = function () {
        var showBtnName = "";
        if (this.data.todayChecked) { //是否已经签到
            showBtnName = "btn_has";
        }
        // else if (this.data.todayChecked && (this.data.list[this.currentDay] && this.data.list[this.currentDay].state == 1)) {     //是否再领一次
        //     showBtnName = `btn_againGet`;
        // }
        else if (!this.data.todayChecked && !this.check_toggle.isChecked) { //是否普通签到
            showBtnName = "btn_single";
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "单倍签到弹窗"
            });
        }
        else if (!this.data.todayChecked && this.check_toggle.isChecked) { //是否视频签到
            showBtnName = "btn_double";
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "双倍签到弹窗"
            });
        }
        var btns = this.btnsNode.children;
        for (var i = 0; i < btns.length; i++) {
            btns[i].active = false;
        }
        if (this.btnsNode.getChildByName(showBtnName)) {
            this.btnsNode.getChildByName(showBtnName).active = true;
            //预加载离线
            // if(!util.adPreObj[AdPosition.Offline]){
            //     util.preloadAd(AdPosition.Offline);
            // }
            // if(!util.adPreObj[AdPosition.OfflineView]){
            //     util.preloadAd(AdPosition.OfflineView,true);
            // }
        }
    };
    gameSign.prototype.clickSingle = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u7B7E\u5230\u5F39\u7A97",
            ck_module: "普通领取"
        });
        this.closePage();
        this.openSignReward(1);
    };
    gameSign.prototype.clickDouble = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u7B7E\u5230\u5F39\u7A97",
            ck_module: "双倍领取",
            active_ad_hcdg: "激励视频"
        });
        // XMSDK.post({
        //     url: UrlConst.sign_videoGet,
        //     onSuccess: res => {
        //         if (res.code === 0) {
        //             TrackMgr.Signin_new({
        //                 get_state: true,
        //                 get_type: "双倍领取",                                                
        //                 get_days: `第${this.data.signDays + 1}天`,                        
        //             })
        // AdController.loadAd(AdPosition.VideoSignDouble, (res) => {
        //     util.preloadAd(AdPosition.VideoSignDouble);      
        //     this.openSignReward(2);    
        //     this.closePage();
        // })
        this.openSignReward(2);
        this.closePage();
        //         }
        //         else {
        //             TrackMgr.Signin_new({
        //                 get_state: false,
        //                 get_type: "双倍领取",                                                
        //                 get_days: `第${this.data.signDays + 1}天`,                        
        //             })
        //         }
        //     },
        //     onFail: err => {
        //     }
        // }
        // )
    };
    gameSign.prototype.clickAgainGet = function () {
        // TrackMgr.AppDialogClick_hcdg({
        //     dialog_page: "游戏中",
        //     dialog_name_hcdg: `签到弹窗`,
        //     ck_module: "额外领取"
        // })
        // AdController.loadAd(AdPosition.VideoAgainGet, (res) => {
        //     XMSDK.post({
        //         url: UrlConst.sign_extraGet,
        //         onSuccess: res => {
        //             if (res.code === 0) {
        //                 this.closePage();
        //                 // TrackMgr.Signin_new({
        //                 //     get_state: true,
        //                 //     get_type: "额外领取",
        //                 //     activity_state: "点击额外领取",
        //                 //     get_coin_num: this.data.list[this.currentDay].rewardList[0].rewardPlusValue - this.data.list[this.currentDay].rewardList[0].rewardValue,
        //                 //     get_days: `第${this.data.signDays + 1}天`,
        //                 //     rounds: this.data.userPeriod + 1
        //                 // })
        //                 this.openSignReward(3);
        //                 // TrackMgr.Signin_new({
        //                 //     get_state: true,
        //                 //     get_type: "额外领取",
        //                 //     activity_state: "领取成功",
        //                 //     get_coin_num: this.data.list[this.currentDay].rewardList[0].rewardPlusValue - this.data.list[this.currentDay].rewardList[0].rewardValue,
        //                 //     get_days: `第${this.data.signDays + 1}天`,
        //                 //     rounds: this.data.userPeriod + 1
        //                 // })
        //             }
        //             else {
        //                 // TrackMgr.Signin_new({
        //                 //     get_state: false,
        //                 //     get_type: "额外领取",
        //                 //     activity_state: "点击额外领取",
        //                 //     get_coin_num: this.data.list[this.currentDay].rewardList[0].rewardPlusValue - this.data.list[this.currentDay].rewardList[0].rewardValue,
        //                 //     get_days: `第${this.data.signDays + 1}天`,
        //                 //     rounds: this.data.userPeriod + 1
        //                 // })
        //             }
        //         },
        //         onFail: err => {
        //         }
        //     }
        //     )
        // })
    };
    gameSign.prototype.openSignReward = function (type) {
        // UIFunc.openUI(ActivityPannelName.PannelReward, (node, script: PannelReward) => {
        //     if (script) {
        //         script.init(this.data.list[this.currentDay], this.currentDay, type);
        //     }
        // })        
        soundController_1.default.singleton.clickAudio();
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "签到成功弹窗"
        });
        var data = {
            list: this.data.list[this.currentDay],
            currentDay: this.currentDay,
            type: type,
            signDays: this.data.signDays + 1
        };
        if (this.data && this.data["callBack"]) {
            data["callBack"] = this.data["callBack"];
        }
        cc.game.emit(NameTs_1.default.Game_Pop_Open, {
            name: pageTs_1.default.pageName.GameSignReward,
            data: data
        });
    };
    gameSign.prototype.clickClose = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u7B7E\u5230\u5F39\u7A97",
            ck_module: "关闭"
        });
        if (this.data && this.data["callBack"]) {
            this.data["callBack"]();
        }
        if (this.isInsert) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.SignAwardInsert, function () { console.log("关闭签到奖励插屏广告播放完成"); });
            if (util_1.default.adPreObj[AdPosition_1.AdPosition.SignAwardInsert]) {
                util_1.default.preloadAd(AdPosition_1.AdPosition.SignAwardInsert);
            }
        }
    };
    gameSign.prototype.cllickCheckMark = function () {
        this.setData(this.data);
        if (!this.check_toggle.isChecked) {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "\u7B7E\u5230\u5F39\u7A97",
                ck_module: "取消勾选"
            });
        }
    };
    __decorate([
        property({ type: cc.Node, tooltip: "" })
    ], gameSign.prototype, "layoutSignItem", void 0);
    __decorate([
        property(cc.Node)
    ], gameSign.prototype, "btnsNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameSign.prototype, "btn_close", void 0);
    __decorate([
        property(cc.Toggle)
    ], gameSign.prototype, "check_toggle", void 0);
    __decorate([
        property(cc.Label)
    ], gameSign.prototype, "label_check", void 0);
    __decorate([
        property(cc.Node)
    ], gameSign.prototype, "feed_node", void 0);
    gameSign = __decorate([
        ccclass
    ], gameSign);
    return gameSign;
}(baseTs_1.default));
exports.default = gameSign;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxtREFBa0Q7QUFDbEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUV0QyxzRUFBaUU7QUFFakUsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUF1QjFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQXNDLDRCQUFNO0lBQTVDO1FBQUEscUVBZ1VDO1FBN1RHLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLFVBQUksR0FBYSxJQUFJLENBQUM7UUFDdEIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFFbEIsY0FBUSxHQUFZLEtBQUssQ0FBQzs7SUF5U3RDLENBQUM7SUF2U0csMkJBQVEsR0FBUjtRQUVJLGtCQUFRLENBQUMsd0JBQXdCLENBQUM7WUFDOUIsZ0JBQWdCLEVBQUUsMEJBQU07U0FDM0IsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELHVCQUFJLEdBQUosVUFBSyxJQUFJO1FBRUwsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQzVDLGNBQUksQ0FBQyxTQUFTLENBQUMsdUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUM5QztTQUNKO1FBQ0QsSUFBSSxDQUFDLGNBQUksQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM1QyxjQUFJLENBQUMsU0FBUyxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDOUM7UUFHRCxJQUFJLENBQUMsY0FBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDL0MsY0FBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBVSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3ZEO0lBRUwsQ0FBQztJQUtELDRCQUFTLEdBQVQ7UUFDSSwrREFBK0Q7UUFFL0QsK0NBQStDO1FBQy9DLG1EQUFtRDtRQUNuRCxZQUFZO0lBQ2hCLENBQUM7SUFFRCxnQ0FBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO0lBQ2xFLENBQUM7SUFFRCwwQkFBTyxHQUFQLFVBQVEsSUFBYztRQUF0QixpQkF1Q0M7UUF0Q0csSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIseUVBQXlFO1FBQ3pFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7UUFFdEYsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUEwQixZQUFZO1lBQ2hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzVCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO1lBQzdDLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFDbkQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7cUJBQzFDO29CQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDcEIsd0dBQXdHO3FCQUMzRztpQkFDSjtnQkFDRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7Z0JBQzVDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNsQixHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQ2xCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDekMsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7b0JBQ25FLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7aUJBQ25DLENBQUMsQ0FBQTthQUNMO1NBQ0o7UUFFRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDekIsS0FBSyxHQUFHLENBQUMsQ0FBQTtTQUNaO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNoQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFFVCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELDZCQUFVLEdBQVY7UUFDSSxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFPLFFBQVE7WUFDdkMsV0FBVyxHQUFHLFNBQVMsQ0FBQTtTQUMxQjtRQUNELHFJQUFxSTtRQUNySSxvQ0FBb0M7UUFDcEMsSUFBSTthQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQVksUUFBUTtZQUNsRixXQUFXLEdBQUcsWUFBWSxDQUFDO1lBRTNCLGtCQUFRLENBQUMsd0JBQXdCLENBQUM7Z0JBQzlCLGdCQUFnQixFQUFFLFFBQVE7YUFDN0IsQ0FBQyxDQUFBO1NBQ0w7YUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBYSxRQUFRO1lBQ2xGLFdBQVcsR0FBRyxZQUFZLENBQUE7WUFFMUIsa0JBQVEsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDOUIsZ0JBQWdCLEVBQUUsUUFBUTthQUM3QixDQUFDLENBQUE7U0FDTDtRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3hELE9BQU87WUFDUCwwQ0FBMEM7WUFDMUMsMENBQTBDO1lBQzFDLElBQUk7WUFDSiw4Q0FBOEM7WUFDOUMsbURBQW1EO1lBQ25ELElBQUk7U0FDUDtJQUNMLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0ksa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQztZQUN6QixnQkFBZ0IsRUFBRSwwQkFBTTtZQUN4QixTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUkzQixDQUFDO0lBRUQsOEJBQVcsR0FBWDtRQUNJLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7WUFDekIsZ0JBQWdCLEVBQUUsMEJBQU07WUFDeEIsU0FBUyxFQUFFLE1BQU07WUFDakIsY0FBYyxFQUFFLE1BQU07U0FDekIsQ0FBQyxDQUFBO1FBRUYsZUFBZTtRQUNmLG1DQUFtQztRQUNuQywwQkFBMEI7UUFDMUIsZ0NBQWdDO1FBQ2hDLG9DQUFvQztRQUNwQyxtQ0FBbUM7UUFDbkMsb0ZBQW9GO1FBQ3BGLG1GQUFtRjtRQUNuRixpQkFBaUI7UUFFakIsNkRBQTZEO1FBQzdELHdEQUF3RDtRQUN4RCxrQ0FBa0M7UUFDbEMsd0JBQXdCO1FBQ3hCLEtBQUs7UUFFTCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLG9DQUFvQztRQUNwQyxvQ0FBb0M7UUFDcEMsb0ZBQW9GO1FBQ3BGLG1GQUFtRjtRQUNuRixpQkFBaUI7UUFDakIsWUFBWTtRQUNaLFNBQVM7UUFDVCx1QkFBdUI7UUFFdkIsUUFBUTtRQUNSLElBQUk7UUFDSixJQUFJO0lBQ1IsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDSSxpQ0FBaUM7UUFDakMsMEJBQTBCO1FBQzFCLGdDQUFnQztRQUNoQyx3QkFBd0I7UUFDeEIsS0FBSztRQUVMLDJEQUEyRDtRQUMzRCxtQkFBbUI7UUFDbkIsdUNBQXVDO1FBQ3ZDLDhCQUE4QjtRQUM5QixvQ0FBb0M7UUFDcEMsb0NBQW9DO1FBRXBDLDJDQUEyQztRQUMzQywwQ0FBMEM7UUFDMUMsMkNBQTJDO1FBQzNDLG1EQUFtRDtRQUNuRCxrS0FBa0s7UUFDbEssa0VBQWtFO1FBQ2xFLDBEQUEwRDtRQUMxRCx3QkFBd0I7UUFFeEIsMENBQTBDO1FBRTFDLDJDQUEyQztRQUMzQywwQ0FBMEM7UUFDMUMsMkNBQTJDO1FBQzNDLGlEQUFpRDtRQUNqRCxrS0FBa0s7UUFDbEssa0VBQWtFO1FBQ2xFLDBEQUEwRDtRQUMxRCx3QkFBd0I7UUFDeEIsZ0JBQWdCO1FBQ2hCLHFCQUFxQjtRQUNyQiwyQ0FBMkM7UUFDM0MsMkNBQTJDO1FBQzNDLDJDQUEyQztRQUMzQyxtREFBbUQ7UUFDbkQsa0tBQWtLO1FBQ2xLLGtFQUFrRTtRQUNsRSwwREFBMEQ7UUFDMUQsd0JBQXdCO1FBQ3hCLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsMkJBQTJCO1FBRTNCLFlBQVk7UUFDWixRQUFRO1FBQ1IsUUFBUTtRQUNSLEtBQUs7SUFDVCxDQUFDO0lBRUQsaUNBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixtRkFBbUY7UUFDbkYsb0JBQW9CO1FBQ3BCLCtFQUErRTtRQUMvRSxRQUFRO1FBQ1IsYUFBYTtRQUNiLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXZDLGtCQUFRLENBQUMsd0JBQXdCLENBQUM7WUFDOUIsZ0JBQWdCLEVBQUUsUUFBUTtTQUM3QixDQUFDLENBQUE7UUFFRixJQUFJLElBQUksR0FBRztZQUNQLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3JDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO1NBQ25DLENBQUE7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUMzQztRQUVELEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsYUFBYSxFQUFFO1lBQy9CLElBQUksRUFBRSxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjO1lBQ3BDLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZCQUFVLEdBQVY7UUFDSSx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV2QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQztZQUN6QixnQkFBZ0IsRUFBRSwwQkFBTTtZQUN4QixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7UUFFRixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixzQkFBWSxDQUFDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLGVBQWUsRUFBRSxjQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pGLElBQUksY0FBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUMzQyxjQUFJLENBQUMsU0FBUyxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDOUM7U0FDSjtJQUVMLENBQUM7SUFFRCxrQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFO1lBQzlCLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3pCLGdCQUFnQixFQUFFLDBCQUFNO2dCQUN4QixTQUFTLEVBQUUsTUFBTTthQUNwQixDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUE1VEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUM7b0RBQ1Y7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNRO0lBbEJULFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FnVTVCO0lBQUQsZUFBQztDQWhVRCxBQWdVQyxDQWhVcUMsZ0JBQU0sR0FnVTNDO2tCQWhVb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuZXhwb3J0IGludGVyZmFjZSBzaWduUmV3YXJkRGF0YSB7XG4gICAga2V5SWQ6IG51bWJlclx0ICAgICAgICAgICAgLy90eXBlIOS4uiBbMS3pgZPlhbddIOaXtuihqOekuiBbUHJvcHNJZF0sIOS4uiBbMi3ngrnlgLxdIOaXtuihqOekuiBbUG9pbnRUeXBlXVxuICAgIHJld2FyZFBsdXNWYWx1ZTogbnVtYmVyXHQgICAgLy/pq5jnuqflpZblirHmlbDph49cbiAgICByZXdhcmRWYWx1ZTogbnVtYmVyXHQgICAgICAgIC8v5pmu6YCa5aWW5Yqx5pWw6YePXG4gICAgdHlwZTogbnVtYmVyXHQgICAgICAgICAgICAvL+exu+WeizogMS3pgZPlhbcsIDIt54K55YC8XG59XG5cbmV4cG9ydCBpbnRlcmZhY2Ugc2lnbkl0ZW1EYXRhIHtcbiAgICByZXdhcmRMaXN0OiBBcnJheTxzaWduUmV3YXJkRGF0YT4gICAgLy/lpZblirFcbiAgICBzdGF0ZTogbnVtYmVyICAgICAgICAgICAgICAgICAgICAgICAgLy/nirbmgIE6IDEt5pmu6YCa5aWW5YqxLCAyLemrmOe6p+WlluWKsVxufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2Ugc2lnbkRhdGEge1xuICAgIGxpc3Q6IEFycmF5PHNpZ25JdGVtRGF0YT4gICAvL+avj+aXpeetvuWIsOWlluWKseWIl+ihqFxuICAgIHNpZ25EYXlzOiBudW1iZXJcdCAgICAgICAgLy/nrb7liLDlpKnmlbBcbiAgICB0b2RheUNoZWNrZWQ6IGJvb2xlYW4sXHQgICAgLy/ku4rml6Xlt7Lnrb7liLBcbiAgICB1c2VyUGVyaW9kOiBudW1iZXIsXHQgICAgICAgIC8v55So5oi35pyf5pWwXG59XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lU2lnbiBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCB0b29sdGlwOiBcIlwiIH0pXG4gICAgbGF5b3V0U2lnbkl0ZW06IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuc05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuX2Nsb3NlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXG4gICAgY2hlY2tfdG9nZ2xlOiBjYy5Ub2dnbGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmVsX2NoZWNrOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgZGF0YTogc2lnbkRhdGEgPSBudWxsO1xuICAgIGN1cnJlbnREYXk6IG51bWJlciA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzSW5zZXJ0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkVuYWJsZSgpIHtcblxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOetvuWIsOW8ueeql2AsXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBpbml0KGRhdGEpIHtcblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzSW5zZXJ0ID0gTWF0aC5yYW5kb20oKSA+IC41O1xuXG4gICAgICAgIGlmICh0aGlzLmlzSW5zZXJ0KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5TaWduQXdhcmRJbnNlcnRdKSB7XG4gICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5TaWduQXdhcmRJbnNlcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlZpZGVvU2lnbkRvdWJsZV0pIHtcbiAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uSW5mb1NpZ25SZXdhcmRWaWV3XSkge1xuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5JbmZvU2lnblJld2FyZFZpZXcsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24uSW5mb1NpZ25WaWV3KTsgICAgICAgICAgIFxuXG4gICAgICAgIC8vIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uSW5mb1NpZ25WaWV3XSl7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkluZm9TaWduVmlldyx0cnVlKVxuICAgICAgICAvLyB9ICAgICAgICBcbiAgICB9XG5cbiAgICBpc1RvZGF5U2lnbk9rKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5idG5zTm9kZS5nZXRDaGlsZEJ5TmFtZShgYnRuX2hhc2ApLmFjdGl2ZSA9PSB0cnVlO1xuICAgIH1cblxuICAgIHNldERhdGEoZGF0YTogc2lnbkRhdGEpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjc2V0RGF0YSA6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgICAgIHRoaXMuY3VycmVudERheSA9IHRoaXMuZGF0YS50b2RheUNoZWNrZWQgPyB0aGlzLmRhdGEuc2lnbkRheXMgLSAxIDogdGhpcy5kYXRhLnNpZ25EYXlzXG5cbiAgICAgICAgZm9yIChsZXQgbSBpbiB0aGlzLmRhdGEubGlzdCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAvL+etvuWIsGl0ZW3lhoXlrrnmm7TmlrBcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5kYXRhLmxpc3RbbV1cbiAgICAgICAgICAgIGxldCBzaWduX2xpc3QgPSB0aGlzLmxheW91dFNpZ25JdGVtLmNoaWxkcmVuO1xuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgc2lnbl9saXN0W21dKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjcmlwdCA9IHNpZ25fbGlzdFttXS5nZXRDb21wb25lbnQoXCJTaWduTW9kZWxcIilcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50RGF5ID09IHBhcnNlSW50KG0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGlzdFttXS5yZXdhcmRMaXN0ICYmIHRoaXMuZGF0YS5saXN0W21dLnJld2FyZExpc3RbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfY2hlY2suc3RyaW5nID0gXCLop4LnnIvop4bpopHpop3lpJbpooblj5bkuIDku71cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5yZXdhcmRMaXN0WzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubGFibGVfb3RoZXJOdW0uc3RyaW5nID0gaXRlbS5yZXdhcmRMaXN0WzBdLnJld2FyZFBsdXNWYWx1ZSAtIGl0ZW0ucmV3YXJkTGlzdFswXS5yZXdhcmRWYWx1ZSArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGhhc0dhaW4gPSBOdW1iZXIobSkgPCB0aGlzLmRhdGEuc2lnbkRheXNcbiAgICAgICAgICAgICAgICBzY3JpcHQgJiYgc2NyaXB0LmluaXQoe1xuICAgICAgICAgICAgICAgICAgICBkYXk6IE51bWJlcihtKSArIDEsXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZExpc3Q6IGl0ZW0ucmV3YXJkTGlzdCxcbiAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50OiB0aGlzLmN1cnJlbnREYXkgPT0gcGFyc2VJbnQobSksXG4gICAgICAgICAgICAgICAgICAgIGhhc0dhaW46IGhhc0dhaW4sXG4gICAgICAgICAgICAgICAgICAgIHNob3dEb3VibGU6IGhhc0dhaW4gPyBpdGVtLnN0YXRlID09IDIgOiB0aGlzLmNoZWNrX3RvZ2dsZS5pc0NoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJQZXJpb2Q6IHRoaXMuZGF0YS51c2VyUGVyaW9kLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVsYXkgPSAwO1xuICAgICAgICBpZiAoIXRoaXMuZGF0YS50b2RheUNoZWNrZWQpIHtcbiAgICAgICAgICAgIGRlbGF5ID0gMlxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnRuX2Nsb3NlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgfSwgZGVsYXkpXG5cbiAgICAgICAgdGhpcy5zZXRCdG5zVmlzKCk7XG4gICAgfVxuXG4gICAgc2V0QnRuc1ZpcygpIHtcbiAgICAgICAgbGV0IHNob3dCdG5OYW1lID0gXCJcIjtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS50b2RheUNoZWNrZWQpIHsgICAgICAvL+aYr+WQpuW3sue7j+etvuWIsFxuICAgICAgICAgICAgc2hvd0J0bk5hbWUgPSBgYnRuX2hhc2BcbiAgICAgICAgfVxuICAgICAgICAvLyBlbHNlIGlmICh0aGlzLmRhdGEudG9kYXlDaGVja2VkICYmICh0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldICYmIHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0uc3RhdGUgPT0gMSkpIHsgICAgIC8v5piv5ZCm5YaN6aKG5LiA5qyhXG4gICAgICAgIC8vICAgICBzaG93QnRuTmFtZSA9IGBidG5fYWdhaW5HZXRgO1xuICAgICAgICAvLyB9XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLmRhdGEudG9kYXlDaGVja2VkICYmICF0aGlzLmNoZWNrX3RvZ2dsZS5pc0NoZWNrZWQpIHsgICAgICAgICAgIC8v5piv5ZCm5pmu6YCa562+5YiwXG4gICAgICAgICAgICBzaG93QnRuTmFtZSA9IGBidG5fc2luZ2xlYDtcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWNleWAjeetvuWIsOW8ueeql1wiXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLmRhdGEudG9kYXlDaGVja2VkICYmIHRoaXMuY2hlY2tfdG9nZ2xlLmlzQ2hlY2tlZCkgeyAgICAgICAgICAgIC8v5piv5ZCm6KeG6aKR562+5YiwXG4gICAgICAgICAgICBzaG93QnRuTmFtZSA9IGBidG5fZG91YmxlYFxuXG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5Y+M5YCN562+5Yiw5by556qXXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnRucyA9IHRoaXMuYnRuc05vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnRucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYnRuc1tpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5idG5zTm9kZS5nZXRDaGlsZEJ5TmFtZShzaG93QnRuTmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYnRuc05vZGUuZ2V0Q2hpbGRCeU5hbWUoc2hvd0J0bk5hbWUpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAvL+mihOWKoOi9veemu+e6v1xuICAgICAgICAgICAgLy8gaWYoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5PZmZsaW5lXSl7XG4gICAgICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5PZmZsaW5lKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uT2ZmbGluZVZpZXddKXtcbiAgICAgICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLk9mZmxpbmVWaWV3LHRydWUpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tTaW5nbGUoKSB7XG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOetvuWIsOW8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5pmu6YCa6aKG5Y+WXCJcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgdGhpcy5vcGVuU2lnblJld2FyZCgxKTtcblxuXG5cbiAgICB9XG5cbiAgICBjbGlja0RvdWJsZSgpIHtcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg562+5Yiw5by556qXYCxcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLlj4zlgI3pooblj5ZcIixcbiAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOiBcIua/gOWKseinhumikVwiXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gWE1TREsucG9zdCh7XG4gICAgICAgIC8vICAgICB1cmw6IFVybENvbnN0LnNpZ25fdmlkZW9HZXQsXG4gICAgICAgIC8vICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIFRyYWNrTWdyLlNpZ25pbl9uZXcoe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X3N0YXRlOiB0cnVlLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X3R5cGU6IFwi5Y+M5YCN6aKG5Y+WXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBnZXRfZGF5czogYOesrCR7dGhpcy5kYXRhLnNpZ25EYXlzICsgMX3lpKlgLCAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxuXG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5WaWRlb1NpZ25Eb3VibGUsIChyZXMpID0+IHtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlKTsgICAgICBcbiAgICAgICAgLy8gICAgIHRoaXMub3BlblNpZ25SZXdhcmQoMik7ICAgIFxuICAgICAgICAvLyAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgLy8gfSlcblxuICAgICAgICB0aGlzLm9wZW5TaWduUmV3YXJkKDIpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgVHJhY2tNZ3IuU2lnbmluX25ldyh7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBnZXRfc3RhdGU6IGZhbHNlLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X3R5cGU6IFwi5Y+M5YCN6aKG5Y+WXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBnZXRfZGF5czogYOesrCR7dGhpcy5kYXRhLnNpZ25EYXlzICsgMX3lpKlgLCAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyApXG4gICAgfVxuXG4gICAgY2xpY2tBZ2FpbkdldCgpIHtcbiAgICAgICAgLy8gVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgIC8vICAgICBkaWFsb2dfcGFnZTogXCLmuLjmiI/kuK1cIixcbiAgICAgICAgLy8gICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnrb7liLDlvLnnqpdgLFxuICAgICAgICAvLyAgICAgY2tfbW9kdWxlOiBcIumineWklumihuWPllwiXG4gICAgICAgIC8vIH0pXG5cbiAgICAgICAgLy8gQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLlZpZGVvQWdhaW5HZXQsIChyZXMpID0+IHtcbiAgICAgICAgLy8gICAgIFhNU0RLLnBvc3Qoe1xuICAgICAgICAvLyAgICAgICAgIHVybDogVXJsQ29uc3Quc2lnbl9leHRyYUdldCxcbiAgICAgICAgLy8gICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gVHJhY2tNZ3IuU2lnbmluX25ldyh7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X3N0YXRlOiB0cnVlLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF90eXBlOiBcIumineWklumihuWPllwiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGFjdGl2aXR5X3N0YXRlOiBcIueCueWHu+mineWklumihuWPllwiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF9jb2luX251bTogdGhpcy5kYXRhLmxpc3RbdGhpcy5jdXJyZW50RGF5XS5yZXdhcmRMaXN0WzBdLnJld2FyZFBsdXNWYWx1ZSAtIHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0ucmV3YXJkTGlzdFswXS5yZXdhcmRWYWx1ZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfZGF5czogYOesrCR7dGhpcy5kYXRhLnNpZ25EYXlzICsgMX3lpKlgLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIHJvdW5kczogdGhpcy5kYXRhLnVzZXJQZXJpb2QgKyAxXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLm9wZW5TaWduUmV3YXJkKDMpO1xuXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyBUcmFja01nci5TaWduaW5fbmV3KHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfc3RhdGU6IHRydWUsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X3R5cGU6IFwi6aKd5aSW6aKG5Y+WXCIsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgYWN0aXZpdHlfc3RhdGU6IFwi6aKG5Y+W5oiQ5YqfXCIsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X2NvaW5fbnVtOiB0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldLnJld2FyZExpc3RbMF0ucmV3YXJkUGx1c1ZhbHVlIC0gdGhpcy5kYXRhLmxpc3RbdGhpcy5jdXJyZW50RGF5XS5yZXdhcmRMaXN0WzBdLnJld2FyZFZhbHVlLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF9kYXlzOiBg56ysJHt0aGlzLmRhdGEuc2lnbkRheXMgKyAxfeWkqWAsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgcm91bmRzOiB0aGlzLmRhdGEudXNlclBlcmlvZCArIDFcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyBUcmFja01nci5TaWduaW5fbmV3KHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfc3RhdGU6IGZhbHNlLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF90eXBlOiBcIumineWklumihuWPllwiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGFjdGl2aXR5X3N0YXRlOiBcIueCueWHu+mineWklumihuWPllwiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF9jb2luX251bTogdGhpcy5kYXRhLmxpc3RbdGhpcy5jdXJyZW50RGF5XS5yZXdhcmRMaXN0WzBdLnJld2FyZFBsdXNWYWx1ZSAtIHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0ucmV3YXJkTGlzdFswXS5yZXdhcmRWYWx1ZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfZGF5czogYOesrCR7dGhpcy5kYXRhLnNpZ25EYXlzICsgMX3lpKlgLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIHJvdW5kczogdGhpcy5kYXRhLnVzZXJQZXJpb2QgKyAxXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICApXG4gICAgICAgIC8vIH0pXG4gICAgfVxuXG4gICAgb3BlblNpZ25SZXdhcmQodHlwZSkge1xuICAgICAgICAvLyBVSUZ1bmMub3BlblVJKEFjdGl2aXR5UGFubmVsTmFtZS5QYW5uZWxSZXdhcmQsIChub2RlLCBzY3JpcHQ6IFBhbm5lbFJld2FyZCkgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKHNjcmlwdCkge1xuICAgICAgICAvLyAgICAgICAgIHNjcmlwdC5pbml0KHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0sIHRoaXMuY3VycmVudERheSwgdHlwZSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pICAgICAgICBcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi562+5Yiw5oiQ5Yqf5by556qXXCJcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIGxpc3Q6IHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0sXG4gICAgICAgICAgICBjdXJyZW50RGF5OiB0aGlzLmN1cnJlbnREYXksXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgc2lnbkRheXM6IHRoaXMuZGF0YS5zaWduRGF5cyArIDFcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhW2BjYWxsQmFja2BdKSB7XG4gICAgICAgICAgICBkYXRhW2BjYWxsQmFja2BdID0gdGhpcy5kYXRhW2BjYWxsQmFja2BdXG4gICAgICAgIH1cblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHtcbiAgICAgICAgICAgIG5hbWU6IHBhZ2VUcy5wYWdlTmFtZS5HYW1lU2lnblJld2FyZCxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xpY2tDbG9zZSgpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnrb7liLDlvLnnqpdgLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuWFs+mXrVwiXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGFbYGNhbGxCYWNrYF0pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVtgY2FsbEJhY2tgXSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJbnNlcnQpIHtcbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5TaWduQXdhcmRJbnNlcnQsICgpID0+IHsgY29uc29sZS5sb2coXCLlhbPpl63nrb7liLDlpZblirHmj5LlsY/lub/lkYrmkq3mlL7lrozmiJBcIikgfSk7XG4gICAgICAgICAgICBpZiAodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlNpZ25Bd2FyZEluc2VydF0pIHtcbiAgICAgICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlNpZ25Bd2FyZEluc2VydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNsbGlja0NoZWNrTWFyaygpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuZGF0YSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrX3RvZ2dsZS5pc0NoZWNrZWQpIHtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnrb7liLDlvLnnqpdgLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLlj5bmtojli77pgIlcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==