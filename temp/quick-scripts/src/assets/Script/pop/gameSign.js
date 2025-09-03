"use strict";
cc._RF.push(module, 'd02cd6KMFlPy7w4Kj7/3FJ8', 'gameSign');
// Script/pop/gameSign.ts

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
        // tool.changeUnit(100000,1);
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