
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxtREFBa0Q7QUFDbEQsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUV0QyxzRUFBaUU7QUFFakUsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUU1QyxxQ0FBZ0M7QUF1QjFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQXNDLDRCQUFNO0lBQTVDO1FBQUEscUVBaVVDO1FBOVRHLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLFVBQUksR0FBYSxJQUFJLENBQUM7UUFDdEIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFFbEIsY0FBUSxHQUFXLEtBQUssQ0FBQzs7SUEwU3JDLENBQUM7SUF4U0csMkJBQVEsR0FBUjtRQUVJLGtCQUFRLENBQUMsd0JBQXdCLENBQUM7WUFDOUIsZ0JBQWdCLEVBQUUsMEJBQU07U0FDM0IsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELHVCQUFJLEdBQUosVUFBSyxJQUFJO1FBRUwsSUFBRyxJQUFJLEVBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxDQUFDO1FBRWpDLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUNiLElBQUcsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFVLENB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QUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUNyRixJQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxlQUFlLENBQUMsRUFBQztnQkFDekMsY0FBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzlDO1NBQ0o7SUFFTCxDQUFDO0lBRUQsa0NBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRTtZQUM5QixrQkFBUSxDQUFDLG1CQUFtQixDQUFDO2dCQUN6QixnQkFBZ0IsRUFBRSwwQkFBTTtnQkFDeEIsU0FBUyxFQUFFLE1BQU07YUFDcEIsQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0lBN1REO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO29EQUNWO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDUTtJQWxCVCxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBaVU1QjtJQUFELGVBQUM7Q0FqVUQsQUFpVUMsQ0FqVXFDLGdCQUFNLEdBaVUzQztrQkFqVW9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vdXRpbC90b29sXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2Ugc2lnblJld2FyZERhdGEge1xuICAgIGtleUlkOiBudW1iZXJcdCAgICAgICAgICAgIC8vdHlwZSDkuLogWzEt6YGT5YW3XSDml7booajnpLogW1Byb3BzSWRdLCDkuLogWzIt54K55YC8XSDml7booajnpLogW1BvaW50VHlwZV1cbiAgICByZXdhcmRQbHVzVmFsdWU6IG51bWJlclx0ICAgIC8v6auY57qn5aWW5Yqx5pWw6YePXG4gICAgcmV3YXJkVmFsdWU6IG51bWJlclx0ICAgICAgICAvL+aZrumAmuWlluWKseaVsOmHj1xuICAgIHR5cGU6IG51bWJlclx0ICAgICAgICAgICAgLy/nsbvlnos6IDEt6YGT5YW3LCAyLeeCueWAvFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIHNpZ25JdGVtRGF0YSB7XG4gICAgcmV3YXJkTGlzdDogQXJyYXk8c2lnblJld2FyZERhdGE+ICAgIC8v5aWW5YqxXG4gICAgc3RhdGU6IG51bWJlciAgICAgICAgICAgICAgICAgICAgICAgIC8v54q25oCBOiAxLeaZrumAmuWlluWKsSwgMi3pq5jnuqflpZblirFcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIHNpZ25EYXRhIHtcbiAgICBsaXN0OiBBcnJheTxzaWduSXRlbURhdGE+ICAgLy/mr4/ml6Xnrb7liLDlpZblirHliJfooahcbiAgICBzaWduRGF5czogbnVtYmVyXHQgICAgICAgIC8v562+5Yiw5aSp5pWwXG4gICAgdG9kYXlDaGVja2VkOiBib29sZWFuLFx0ICAgIC8v5LuK5pel5bey562+5YiwXG4gICAgdXNlclBlcmlvZDogbnVtYmVyLFx0ICAgICAgICAvL+eUqOaIt+acn+aVsFxufVxuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVNpZ24gZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCJcIiB9KVxuICAgIGxheW91dFNpZ25JdGVtOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bnNOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9jbG9zZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuVG9nZ2xlKVxuICAgIGNoZWNrX3RvZ2dsZTogY2MuVG9nZ2xlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbF9jaGVjazogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIGRhdGE6IHNpZ25EYXRhID0gbnVsbDtcbiAgICBjdXJyZW50RGF5OiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpc0luc2VydDpib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICBcbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnrb7liLDlvLnnqpdgLFxuICAgICAgICB9KSAgICAgICAgXG4gICAgICAgXG4gICAgfVxuXG4gICAgaW5pdChkYXRhKXtcblx0XG4gICAgICAgIGlmKGRhdGEpe1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzSW5zZXJ0ID0gTWF0aC5yYW5kb20oKT4uNTtcblxuICAgICAgICBpZih0aGlzLmlzSW5zZXJ0KXtcbiAgICAgICAgICAgIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0XSl7XG4gICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5TaWduQXdhcmRJbnNlcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlXSl7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlZpZGVvU2lnbkRvdWJsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b29sLmNoYW5nZVVuaXQoMTAwMDAwLDEpO1xuXG4gICAgICAgIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uSW5mb1NpZ25SZXdhcmRWaWV3XSl7XG4gICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkluZm9TaWduUmV3YXJkVmlldyx0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIFxuXG5cbiAgICBvbkRpc2FibGUoKSB7ICAgICAgICBcbiAgICAgICAgLy8gQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5JbmZvU2lnblZpZXcpOyAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLyBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkluZm9TaWduVmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5JbmZvU2lnblZpZXcsdHJ1ZSlcbiAgICAgICAgLy8gfSAgICAgICAgXG4gICAgfVxuXG4gICAgaXNUb2RheVNpZ25PaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnRuc05vZGUuZ2V0Q2hpbGRCeU5hbWUoYGJ0bl9oYXNgKS5hY3RpdmUgPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXREYXRhKGRhdGE6IHNpZ25EYXRhKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0Ly9jb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjc2V0RGF0YSA6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgICAgIHRoaXMuY3VycmVudERheSA9IHRoaXMuZGF0YS50b2RheUNoZWNrZWQgPyB0aGlzLmRhdGEuc2lnbkRheXMgLSAxIDogdGhpcy5kYXRhLnNpZ25EYXlzXG5cbiAgICAgICAgZm9yIChsZXQgbSBpbiB0aGlzLmRhdGEubGlzdCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAvL+etvuWIsGl0ZW3lhoXlrrnmm7TmlrBcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5kYXRhLmxpc3RbbV1cbiAgICAgICAgICAgIGxldCBzaWduX2xpc3QgPSB0aGlzLmxheW91dFNpZ25JdGVtLmNoaWxkcmVuO1xuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgc2lnbl9saXN0W21dKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjcmlwdCA9IHNpZ25fbGlzdFttXS5nZXRDb21wb25lbnQoXCJTaWduTW9kZWxcIilcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50RGF5ID09IHBhcnNlSW50KG0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGlzdFttXS5yZXdhcmRMaXN0ICYmIHRoaXMuZGF0YS5saXN0W21dLnJld2FyZExpc3RbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfY2hlY2suc3RyaW5nID0gXCLop4LnnIvop4bpopHpop3lpJbpooblj5bkuIDku71cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5yZXdhcmRMaXN0WzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubGFibGVfb3RoZXJOdW0uc3RyaW5nID0gaXRlbS5yZXdhcmRMaXN0WzBdLnJld2FyZFBsdXNWYWx1ZSAtIGl0ZW0ucmV3YXJkTGlzdFswXS5yZXdhcmRWYWx1ZSArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGhhc0dhaW4gPSBOdW1iZXIobSkgPCB0aGlzLmRhdGEuc2lnbkRheXNcbiAgICAgICAgICAgICAgICBzY3JpcHQgJiYgc2NyaXB0LmluaXQoe1xuICAgICAgICAgICAgICAgICAgICBkYXk6IE51bWJlcihtKSArIDEsXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZExpc3Q6IGl0ZW0ucmV3YXJkTGlzdCxcbiAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50OiB0aGlzLmN1cnJlbnREYXkgPT0gcGFyc2VJbnQobSksXG4gICAgICAgICAgICAgICAgICAgIGhhc0dhaW46IGhhc0dhaW4sXG4gICAgICAgICAgICAgICAgICAgIHNob3dEb3VibGU6IGhhc0dhaW4gPyBpdGVtLnN0YXRlID09IDIgOiB0aGlzLmNoZWNrX3RvZ2dsZS5pc0NoZWNrZWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJQZXJpb2Q6IHRoaXMuZGF0YS51c2VyUGVyaW9kLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVsYXkgPSAwO1xuICAgICAgICBpZiAoIXRoaXMuZGF0YS50b2RheUNoZWNrZWQpIHtcbiAgICAgICAgICAgIGRlbGF5ID0gMlxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnRuX2Nsb3NlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgfSwgZGVsYXkpXG5cbiAgICAgICAgdGhpcy5zZXRCdG5zVmlzKCk7XG4gICAgfVxuXG4gICAgc2V0QnRuc1ZpcygpIHtcbiAgICAgICAgbGV0IHNob3dCdG5OYW1lID0gXCJcIjtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS50b2RheUNoZWNrZWQpIHsgICAgICAvL+aYr+WQpuW3sue7j+etvuWIsFxuICAgICAgICAgICAgc2hvd0J0bk5hbWUgPSBgYnRuX2hhc2BcbiAgICAgICAgfVxuICAgICAgICAvLyBlbHNlIGlmICh0aGlzLmRhdGEudG9kYXlDaGVja2VkICYmICh0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldICYmIHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0uc3RhdGUgPT0gMSkpIHsgICAgIC8v5piv5ZCm5YaN6aKG5LiA5qyhXG4gICAgICAgIC8vICAgICBzaG93QnRuTmFtZSA9IGBidG5fYWdhaW5HZXRgO1xuICAgICAgICAvLyB9XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLmRhdGEudG9kYXlDaGVja2VkICYmICF0aGlzLmNoZWNrX3RvZ2dsZS5pc0NoZWNrZWQpIHsgICAgICAgICAgIC8v5piv5ZCm5pmu6YCa562+5YiwXG4gICAgICAgICAgICBzaG93QnRuTmFtZSA9IGBidG5fc2luZ2xlYDtcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOlwi5Y2V5YCN562+5Yiw5by556qXXCIgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghdGhpcy5kYXRhLnRvZGF5Q2hlY2tlZCAmJiB0aGlzLmNoZWNrX3RvZ2dsZS5pc0NoZWNrZWQpIHsgICAgICAgICAgICAvL+aYr+WQpuinhumikeetvuWIsFxuICAgICAgICAgICAgc2hvd0J0bk5hbWUgPSBgYnRuX2RvdWJsZWBcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOlwi5Y+M5YCN562+5Yiw5by556qXXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnRucyA9IHRoaXMuYnRuc05vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnRucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYnRuc1tpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5idG5zTm9kZS5nZXRDaGlsZEJ5TmFtZShzaG93QnRuTmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYnRuc05vZGUuZ2V0Q2hpbGRCeU5hbWUoc2hvd0J0bk5hbWUpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAvL+mihOWKoOi9veemu+e6v1xuICAgICAgICAgICAgLy8gaWYoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5PZmZsaW5lXSl7XG4gICAgICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5PZmZsaW5lKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uT2ZmbGluZVZpZXddKXtcbiAgICAgICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLk9mZmxpbmVWaWV3LHRydWUpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tTaW5nbGUoKSB7XG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgIFxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOetvuWIsOW8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5pmu6YCa6aKG5Y+WXCJcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgdGhpcy5vcGVuU2lnblJld2FyZCgxKTtcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY2xpY2tEb3VibGUoKSB7XG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgIFxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOetvuWIsOW8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5Y+M5YCN6aKG5Y+WXCIsXG4gICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzpcIua/gOWKseinhumikVwiXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gWE1TREsucG9zdCh7XG4gICAgICAgIC8vICAgICB1cmw6IFVybENvbnN0LnNpZ25fdmlkZW9HZXQsXG4gICAgICAgIC8vICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIFRyYWNrTWdyLlNpZ25pbl9uZXcoe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X3N0YXRlOiB0cnVlLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X3R5cGU6IFwi5Y+M5YCN6aKG5Y+WXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBnZXRfZGF5czogYOesrCR7dGhpcy5kYXRhLnNpZ25EYXlzICsgMX3lpKlgLCAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxuXG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5WaWRlb1NpZ25Eb3VibGUsIChyZXMpID0+IHtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlKTsgICAgICBcbiAgICAgICAgLy8gICAgIHRoaXMub3BlblNpZ25SZXdhcmQoMik7ICAgIFxuICAgICAgICAvLyAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgLy8gfSlcblxuICAgICAgICB0aGlzLm9wZW5TaWduUmV3YXJkKDIpOyAgICBcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIFRyYWNrTWdyLlNpZ25pbl9uZXcoe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X3N0YXRlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGdldF90eXBlOiBcIuWPjOWAjemihuWPllwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X2RheXM6IGDnrKwke3RoaXMuZGF0YS5zaWduRGF5cyArIDF95aSpYCwgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gKVxuICAgIH1cblxuICAgIGNsaWNrQWdhaW5HZXQoKSB7XG4gICAgICAgIC8vIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAvLyAgICAgZGlhbG9nX3BhZ2U6IFwi5ri45oiP5LitXCIsXG4gICAgICAgIC8vICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg562+5Yiw5by556qXYCxcbiAgICAgICAgLy8gICAgIGNrX21vZHVsZTogXCLpop3lpJbpooblj5ZcIlxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5WaWRlb0FnYWluR2V0LCAocmVzKSA9PiB7XG4gICAgICAgIC8vICAgICBYTVNESy5wb3N0KHtcbiAgICAgICAgLy8gICAgICAgICB1cmw6IFVybENvbnN0LnNpZ25fZXh0cmFHZXQsXG4gICAgICAgIC8vICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vIFRyYWNrTWdyLlNpZ25pbl9uZXcoe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF9zdGF0ZTogdHJ1ZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfdHlwZTogXCLpop3lpJbpooblj5ZcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBhY3Rpdml0eV9zdGF0ZTogXCLngrnlh7vpop3lpJbpooblj5ZcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfY29pbl9udW06IHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0ucmV3YXJkTGlzdFswXS5yZXdhcmRQbHVzVmFsdWUgLSB0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldLnJld2FyZExpc3RbMF0ucmV3YXJkVmFsdWUsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X2RheXM6IGDnrKwke3RoaXMuZGF0YS5zaWduRGF5cyArIDF95aSpYCxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICByb3VuZHM6IHRoaXMuZGF0YS51c2VyUGVyaW9kICsgMVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5vcGVuU2lnblJld2FyZCgzKTtcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gVHJhY2tNZ3IuU2lnbmluX25ldyh7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X3N0YXRlOiB0cnVlLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF90eXBlOiBcIumineWklumihuWPllwiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGFjdGl2aXR5X3N0YXRlOiBcIumihuWPluaIkOWKn1wiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF9jb2luX251bTogdGhpcy5kYXRhLmxpc3RbdGhpcy5jdXJyZW50RGF5XS5yZXdhcmRMaXN0WzBdLnJld2FyZFBsdXNWYWx1ZSAtIHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0ucmV3YXJkTGlzdFswXS5yZXdhcmRWYWx1ZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfZGF5czogYOesrCR7dGhpcy5kYXRhLnNpZ25EYXlzICsgMX3lpKlgLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIHJvdW5kczogdGhpcy5kYXRhLnVzZXJQZXJpb2QgKyAxXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gVHJhY2tNZ3IuU2lnbmluX25ldyh7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X3N0YXRlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfdHlwZTogXCLpop3lpJbpooblj5ZcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBhY3Rpdml0eV9zdGF0ZTogXCLngrnlh7vpop3lpJbpooblj5ZcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfY29pbl9udW06IHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0ucmV3YXJkTGlzdFswXS5yZXdhcmRQbHVzVmFsdWUgLSB0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldLnJld2FyZExpc3RbMF0ucmV3YXJkVmFsdWUsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X2RheXM6IGDnrKwke3RoaXMuZGF0YS5zaWduRGF5cyArIDF95aSpYCxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICByb3VuZHM6IHRoaXMuZGF0YS51c2VyUGVyaW9kICsgMVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgKVxuICAgICAgICAvLyB9KVxuICAgIH1cblxuICAgIG9wZW5TaWduUmV3YXJkKHR5cGUpIHtcbiAgICAgICAgLy8gVUlGdW5jLm9wZW5VSShBY3Rpdml0eVBhbm5lbE5hbWUuUGFubmVsUmV3YXJkLCAobm9kZSwgc2NyaXB0OiBQYW5uZWxSZXdhcmQpID0+IHtcbiAgICAgICAgLy8gICAgIGlmIChzY3JpcHQpIHtcbiAgICAgICAgLy8gICAgICAgICBzY3JpcHQuaW5pdCh0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldLCB0aGlzLmN1cnJlbnREYXksIHR5cGUpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KSAgICAgICAgXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOlwi562+5Yiw5oiQ5Yqf5by556qXXCJcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIGxpc3Q6IHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0sXG4gICAgICAgICAgICBjdXJyZW50RGF5OiB0aGlzLmN1cnJlbnREYXksXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgc2lnbkRheXM6dGhpcy5kYXRhLnNpZ25EYXlzKzFcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGFbYGNhbGxCYWNrYF0peyAgICAgICAgICAgIFxuICAgICAgICAgICAgZGF0YVtgY2FsbEJhY2tgXSA9IHRoaXMuZGF0YVtgY2FsbEJhY2tgXVxuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHtcbiAgICAgICAgICAgIG5hbWU6IHBhZ2VUcy5wYWdlTmFtZS5HYW1lU2lnblJld2FyZCxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xpY2tDbG9zZSgpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnrb7liLDlvLnnqpdgLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuWFs+mXrVwiXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYodGhpcy5kYXRhICYmIHRoaXMuZGF0YVtgY2FsbEJhY2tgXSl7XG4gICAgICAgICAgICB0aGlzLmRhdGFbYGNhbGxCYWNrYF0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuaXNJbnNlcnQpe1xuICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLlNpZ25Bd2FyZEluc2VydCwgKCk9Pntjb25zb2xlLmxvZyhcIuWFs+mXreetvuWIsOWlluWKseaPkuWxj+W5v+WRiuaSreaUvuWujOaIkFwiKX0pO1xuICAgICAgICAgICAgaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlNpZ25Bd2FyZEluc2VydF0pe1xuICAgICAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY2xsaWNrQ2hlY2tNYXJrKCkge1xuICAgICAgICB0aGlzLnNldERhdGEodGhpcy5kYXRhKTtcblxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tfdG9nZ2xlLmlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnrb7liLDlvLnnqpdgLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLlj5bmtojli77pgIlcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==