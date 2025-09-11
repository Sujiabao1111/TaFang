
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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
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
        // if (this.isInsert) {
        //     if (!util.adPreObj[AdPosition.SignAwardInsert]) {
        //         util.preloadAd(AdPosition.SignAwardInsert);
        //     }
        // }
        // if (!util.adPreObj[AdPosition.VideoSignDouble]) {
        //     util.preloadAd(AdPosition.VideoSignDouble);
        // }
        // if (!util.adPreObj[AdPosition.InfoSignRewardView]) {
        //     util.preloadAd(AdPosition.InfoSignRewardView, true);
        // }
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
            // AdController.loadAd(AdPosition.SignAwardInsert, () => { console.log("关闭签到奖励插屏广告播放完成") });
            // if (util.adPreObj[AdPosition.SignAwardInsert]) {
            //     util.preloadAd(AdPosition.SignAwardInsert);
            // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUVwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBSXRDLHNEQUFpRDtBQUNqRCxpREFBNEM7QUF3QnRDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQXNDLDRCQUFNO0lBQTVDO1FBQUEscUVBZ1VDO1FBN1RHLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLFVBQUksR0FBYSxJQUFJLENBQUM7UUFDdEIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFFbEIsY0FBUSxHQUFZLEtBQUssQ0FBQzs7SUF5U3RDLENBQUM7SUF2U0csMkJBQVEsR0FBUjtRQUVJLGtCQUFRLENBQUMsd0JBQXdCLENBQUM7WUFDOUIsZ0JBQWdCLEVBQUUsMEJBQU07U0FDM0IsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELHVCQUFJLEdBQUosVUFBSyxJQUFJO1FBRUwsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRW5DLHVCQUF1QjtRQUN2Qix3REFBd0Q7UUFDeEQsc0RBQXNEO1FBQ3RELFFBQVE7UUFDUixJQUFJO1FBQ0osb0RBQW9EO1FBQ3BELGtEQUFrRDtRQUNsRCxJQUFJO1FBR0osdURBQXVEO1FBQ3ZE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UUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDUTtJQWxCVCxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBZ1U1QjtJQUFELGVBQUM7Q0FoVUQsQUFnVUMsQ0FoVXFDLGdCQUFNLEdBZ1UzQztrQkFoVW9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2Ugc2lnblJld2FyZERhdGEge1xuICAgIGtleUlkOiBudW1iZXJcdCAgICAgICAgICAgIC8vdHlwZSDkuLogWzEt6YGT5YW3XSDml7booajnpLogW1Byb3BzSWRdLCDkuLogWzIt54K55YC8XSDml7booajnpLogW1BvaW50VHlwZV1cbiAgICByZXdhcmRQbHVzVmFsdWU6IG51bWJlclx0ICAgIC8v6auY57qn5aWW5Yqx5pWw6YePXG4gICAgcmV3YXJkVmFsdWU6IG51bWJlclx0ICAgICAgICAvL+aZrumAmuWlluWKseaVsOmHj1xuICAgIHR5cGU6IG51bWJlclx0ICAgICAgICAgICAgLy/nsbvlnos6IDEt6YGT5YW3LCAyLeeCueWAvFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIHNpZ25JdGVtRGF0YSB7XG4gICAgcmV3YXJkTGlzdDogQXJyYXk8c2lnblJld2FyZERhdGE+ICAgIC8v5aWW5YqxXG4gICAgc3RhdGU6IG51bWJlciAgICAgICAgICAgICAgICAgICAgICAgIC8v54q25oCBOiAxLeaZrumAmuWlluWKsSwgMi3pq5jnuqflpZblirFcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIHNpZ25EYXRhIHtcbiAgICBsaXN0OiBBcnJheTxzaWduSXRlbURhdGE+ICAgLy/mr4/ml6Xnrb7liLDlpZblirHliJfooahcbiAgICBzaWduRGF5czogbnVtYmVyXHQgICAgICAgIC8v562+5Yiw5aSp5pWwXG4gICAgdG9kYXlDaGVja2VkOiBib29sZWFuLFx0ICAgIC8v5LuK5pel5bey562+5YiwXG4gICAgdXNlclBlcmlvZDogbnVtYmVyLFx0ICAgICAgICAvL+eUqOaIt+acn+aVsFxufVxuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVNpZ24gZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCJcIiB9KVxuICAgIGxheW91dFNpZ25JdGVtOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bnNOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9jbG9zZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuVG9nZ2xlKVxuICAgIGNoZWNrX3RvZ2dsZTogY2MuVG9nZ2xlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbF9jaGVjazogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIGRhdGE6IHNpZ25EYXRhID0gbnVsbDtcbiAgICBjdXJyZW50RGF5OiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpc0luc2VydDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25FbmFibGUoKSB7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnrb7liLDlvLnnqpdgLFxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgaW5pdChkYXRhKSB7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0luc2VydCA9IE1hdGgucmFuZG9tKCkgPiAuNTtcblxuICAgICAgICAvLyBpZiAodGhpcy5pc0luc2VydCkge1xuICAgICAgICAvLyAgICAgaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0XSkge1xuICAgICAgICAvLyAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0KTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZiAoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5WaWRlb1NpZ25Eb3VibGVdKSB7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlZpZGVvU2lnbkRvdWJsZSk7XG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIC8vIGlmICghdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkluZm9TaWduUmV3YXJkVmlld10pIHtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uSW5mb1NpZ25SZXdhcmRWaWV3LCB0cnVlKTtcbiAgICAgICAgLy8gfVxuXG4gICAgfVxuXG5cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICAvLyBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkluZm9TaWduVmlldyk7ICAgICAgICAgICBcblxuICAgICAgICAvLyBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkluZm9TaWduVmlld10pe1xuICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5JbmZvU2lnblZpZXcsdHJ1ZSlcbiAgICAgICAgLy8gfSAgICAgICAgXG4gICAgfVxuXG4gICAgaXNUb2RheVNpZ25PaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnRuc05vZGUuZ2V0Q2hpbGRCeU5hbWUoYGJ0bl9oYXNgKS5hY3RpdmUgPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXREYXRhKGRhdGE6IHNpZ25EYXRhKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI3NldERhdGEgOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgICAgICB0aGlzLmN1cnJlbnREYXkgPSB0aGlzLmRhdGEudG9kYXlDaGVja2VkID8gdGhpcy5kYXRhLnNpZ25EYXlzIC0gMSA6IHRoaXMuZGF0YS5zaWduRGF5c1xuXG4gICAgICAgIGZvciAobGV0IG0gaW4gdGhpcy5kYXRhLmxpc3QpIHsgICAgICAgICAgICAgICAgICAgICAgICAgLy/nrb7liLBpdGVt5YaF5a655pu05pawXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZGF0YS5saXN0W21dXG4gICAgICAgICAgICBsZXQgc2lnbl9saXN0ID0gdGhpcy5sYXlvdXRTaWduSXRlbS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIHNpZ25fbGlzdFttXSkge1xuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSBzaWduX2xpc3RbbV0uZ2V0Q29tcG9uZW50KFwiU2lnbk1vZGVsXCIpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudERheSA9PSBwYXJzZUludChtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLmxpc3RbbV0ucmV3YXJkTGlzdCAmJiB0aGlzLmRhdGEubGlzdFttXS5yZXdhcmRMaXN0WzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2NoZWNrLnN0cmluZyA9IFwi6KeC55yL6KeG6aKR6aKd5aSW6aKG5Y+W5LiA5Lu9XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmV3YXJkTGlzdFswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmxhYmxlX290aGVyTnVtLnN0cmluZyA9IGl0ZW0ucmV3YXJkTGlzdFswXS5yZXdhcmRQbHVzVmFsdWUgLSBpdGVtLnJld2FyZExpc3RbMF0ucmV3YXJkVmFsdWUgKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBoYXNHYWluID0gTnVtYmVyKG0pIDwgdGhpcy5kYXRhLnNpZ25EYXlzXG4gICAgICAgICAgICAgICAgc2NyaXB0ICYmIHNjcmlwdC5pbml0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF5OiBOdW1iZXIobSkgKyAxLFxuICAgICAgICAgICAgICAgICAgICByZXdhcmRMaXN0OiBpdGVtLnJld2FyZExpc3QsXG4gICAgICAgICAgICAgICAgICAgIGlzQ3VycmVudDogdGhpcy5jdXJyZW50RGF5ID09IHBhcnNlSW50KG0pLFxuICAgICAgICAgICAgICAgICAgICBoYXNHYWluOiBoYXNHYWluLFxuICAgICAgICAgICAgICAgICAgICBzaG93RG91YmxlOiBoYXNHYWluID8gaXRlbS5zdGF0ZSA9PSAyIDogdGhpcy5jaGVja190b2dnbGUuaXNDaGVja2VkLFxuICAgICAgICAgICAgICAgICAgICB1c2VyUGVyaW9kOiB0aGlzLmRhdGEudXNlclBlcmlvZCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRlbGF5ID0gMDtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEudG9kYXlDaGVja2VkKSB7XG4gICAgICAgICAgICBkZWxheSA9IDJcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ0bl9jbG9zZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgIH0sIGRlbGF5KVxuXG4gICAgICAgIHRoaXMuc2V0QnRuc1ZpcygpO1xuICAgIH1cblxuICAgIHNldEJ0bnNWaXMoKSB7XG4gICAgICAgIGxldCBzaG93QnRuTmFtZSA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLmRhdGEudG9kYXlDaGVja2VkKSB7ICAgICAgLy/mmK/lkKblt7Lnu4/nrb7liLBcbiAgICAgICAgICAgIHNob3dCdG5OYW1lID0gYGJ0bl9oYXNgXG4gICAgICAgIH1cbiAgICAgICAgLy8gZWxzZSBpZiAodGhpcy5kYXRhLnRvZGF5Q2hlY2tlZCAmJiAodGhpcy5kYXRhLmxpc3RbdGhpcy5jdXJyZW50RGF5XSAmJiB0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldLnN0YXRlID09IDEpKSB7ICAgICAvL+aYr+WQpuWGjemihuS4gOasoVxuICAgICAgICAvLyAgICAgc2hvd0J0bk5hbWUgPSBgYnRuX2FnYWluR2V0YDtcbiAgICAgICAgLy8gfVxuICAgICAgICBlbHNlIGlmICghdGhpcy5kYXRhLnRvZGF5Q2hlY2tlZCAmJiAhdGhpcy5jaGVja190b2dnbGUuaXNDaGVja2VkKSB7ICAgICAgICAgICAvL+aYr+WQpuaZrumAmuetvuWIsFxuICAgICAgICAgICAgc2hvd0J0bk5hbWUgPSBgYnRuX3NpbmdsZWA7XG5cbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLljZXlgI3nrb7liLDlvLnnqpdcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghdGhpcy5kYXRhLnRvZGF5Q2hlY2tlZCAmJiB0aGlzLmNoZWNrX3RvZ2dsZS5pc0NoZWNrZWQpIHsgICAgICAgICAgICAvL+aYr+WQpuinhumikeetvuWIsFxuICAgICAgICAgICAgc2hvd0J0bk5hbWUgPSBgYnRuX2RvdWJsZWBcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWPjOWAjeetvuWIsOW8ueeql1wiXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJ0bnMgPSB0aGlzLmJ0bnNOb2RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ0bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJ0bnNbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYnRuc05vZGUuZ2V0Q2hpbGRCeU5hbWUoc2hvd0J0bk5hbWUpKSB7XG4gICAgICAgICAgICB0aGlzLmJ0bnNOb2RlLmdldENoaWxkQnlOYW1lKHNob3dCdG5OYW1lKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgLy/pooTliqDovb3nprvnur9cbiAgICAgICAgICAgIC8vIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uT2ZmbGluZV0pe1xuICAgICAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uT2ZmbGluZSk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLk9mZmxpbmVWaWV3XSl7XG4gICAgICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5PZmZsaW5lVmlldyx0cnVlKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrU2luZ2xlKCkge1xuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDnrb7liLDlvLnnqpdgLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaZrumAmumihuWPllwiXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIHRoaXMub3BlblNpZ25SZXdhcmQoMSk7XG5cblxuXG4gICAgfVxuXG4gICAgY2xpY2tEb3VibGUoKSB7XG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOetvuWIsOW8ueeql2AsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5Y+M5YCN6aKG5Y+WXCIsXG4gICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzogXCLmv4DlirHop4bpopFcIlxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIFhNU0RLLnBvc3Qoe1xuICAgICAgICAvLyAgICAgdXJsOiBVcmxDb25zdC5zaWduX3ZpZGVvR2V0LFxuICAgICAgICAvLyAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICBUcmFja01nci5TaWduaW5fbmV3KHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGdldF9zdGF0ZTogdHJ1ZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGdldF90eXBlOiBcIuWPjOWAjemihuWPllwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X2RheXM6IGDnrKwke3RoaXMuZGF0YS5zaWduRGF5cyArIDF95aSpYCwgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcblxuICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVmlkZW9TaWduRG91YmxlLCAocmVzKSA9PiB7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlZpZGVvU2lnbkRvdWJsZSk7ICAgICAgXG4gICAgICAgIC8vICAgICB0aGlzLm9wZW5TaWduUmV3YXJkKDIpOyAgICBcbiAgICAgICAgLy8gICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIC8vIH0pXG5cbiAgICAgICAgdGhpcy5vcGVuU2lnblJld2FyZCgyKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIFRyYWNrTWdyLlNpZ25pbl9uZXcoe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X3N0YXRlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGdldF90eXBlOiBcIuWPjOWAjemihuWPllwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZ2V0X2RheXM6IGDnrKwke3RoaXMuZGF0YS5zaWduRGF5cyArIDF95aSpYCwgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gKVxuICAgIH1cblxuICAgIGNsaWNrQWdhaW5HZXQoKSB7XG4gICAgICAgIC8vIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAvLyAgICAgZGlhbG9nX3BhZ2U6IFwi5ri45oiP5LitXCIsXG4gICAgICAgIC8vICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg562+5Yiw5by556qXYCxcbiAgICAgICAgLy8gICAgIGNrX21vZHVsZTogXCLpop3lpJbpooblj5ZcIlxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5WaWRlb0FnYWluR2V0LCAocmVzKSA9PiB7XG4gICAgICAgIC8vICAgICBYTVNESy5wb3N0KHtcbiAgICAgICAgLy8gICAgICAgICB1cmw6IFVybENvbnN0LnNpZ25fZXh0cmFHZXQsXG4gICAgICAgIC8vICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vIFRyYWNrTWdyLlNpZ25pbl9uZXcoe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF9zdGF0ZTogdHJ1ZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfdHlwZTogXCLpop3lpJbpooblj5ZcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBhY3Rpdml0eV9zdGF0ZTogXCLngrnlh7vpop3lpJbpooblj5ZcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfY29pbl9udW06IHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0ucmV3YXJkTGlzdFswXS5yZXdhcmRQbHVzVmFsdWUgLSB0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldLnJld2FyZExpc3RbMF0ucmV3YXJkVmFsdWUsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X2RheXM6IGDnrKwke3RoaXMuZGF0YS5zaWduRGF5cyArIDF95aSpYCxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICByb3VuZHM6IHRoaXMuZGF0YS51c2VyUGVyaW9kICsgMVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5vcGVuU2lnblJld2FyZCgzKTtcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gVHJhY2tNZ3IuU2lnbmluX25ldyh7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X3N0YXRlOiB0cnVlLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF90eXBlOiBcIumineWklumihuWPllwiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGFjdGl2aXR5X3N0YXRlOiBcIumihuWPluaIkOWKn1wiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIGdldF9jb2luX251bTogdGhpcy5kYXRhLmxpc3RbdGhpcy5jdXJyZW50RGF5XS5yZXdhcmRMaXN0WzBdLnJld2FyZFBsdXNWYWx1ZSAtIHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0ucmV3YXJkTGlzdFswXS5yZXdhcmRWYWx1ZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfZGF5czogYOesrCR7dGhpcy5kYXRhLnNpZ25EYXlzICsgMX3lpKlgLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIHJvdW5kczogdGhpcy5kYXRhLnVzZXJQZXJpb2QgKyAxXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gVHJhY2tNZ3IuU2lnbmluX25ldyh7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X3N0YXRlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfdHlwZTogXCLpop3lpJbpooblj5ZcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBhY3Rpdml0eV9zdGF0ZTogXCLngrnlh7vpop3lpJbpooblj5ZcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICBnZXRfY29pbl9udW06IHRoaXMuZGF0YS5saXN0W3RoaXMuY3VycmVudERheV0ucmV3YXJkTGlzdFswXS5yZXdhcmRQbHVzVmFsdWUgLSB0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldLnJld2FyZExpc3RbMF0ucmV3YXJkVmFsdWUsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgZ2V0X2RheXM6IGDnrKwke3RoaXMuZGF0YS5zaWduRGF5cyArIDF95aSpYCxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICByb3VuZHM6IHRoaXMuZGF0YS51c2VyUGVyaW9kICsgMVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgKVxuICAgICAgICAvLyB9KVxuICAgIH1cblxuICAgIG9wZW5TaWduUmV3YXJkKHR5cGUpIHtcbiAgICAgICAgLy8gVUlGdW5jLm9wZW5VSShBY3Rpdml0eVBhbm5lbE5hbWUuUGFubmVsUmV3YXJkLCAobm9kZSwgc2NyaXB0OiBQYW5uZWxSZXdhcmQpID0+IHtcbiAgICAgICAgLy8gICAgIGlmIChzY3JpcHQpIHtcbiAgICAgICAgLy8gICAgICAgICBzY3JpcHQuaW5pdCh0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldLCB0aGlzLmN1cnJlbnREYXksIHR5cGUpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KSAgICAgICAgXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuetvuWIsOaIkOWKn+W8ueeql1wiXG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBsaXN0OiB0aGlzLmRhdGEubGlzdFt0aGlzLmN1cnJlbnREYXldLFxuICAgICAgICAgICAgY3VycmVudERheTogdGhpcy5jdXJyZW50RGF5LFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIHNpZ25EYXlzOiB0aGlzLmRhdGEuc2lnbkRheXMgKyAxXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YVtgY2FsbEJhY2tgXSkge1xuICAgICAgICAgICAgZGF0YVtgY2FsbEJhY2tgXSA9IHRoaXMuZGF0YVtgY2FsbEJhY2tgXVxuICAgICAgICB9XG5cbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1BvcF9PcGVuLCB7XG4gICAgICAgICAgICBuYW1lOiBwYWdlVHMucGFnZU5hbWUuR2FtZVNpZ25SZXdhcmQsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsaWNrQ2xvc2UoKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg562+5Yiw5by556qXYCxcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLlhbPpl61cIlxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhW2BjYWxsQmFja2BdKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFbYGNhbGxCYWNrYF0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW5zZXJ0KSB7XG4gICAgICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uU2lnbkF3YXJkSW5zZXJ0LCAoKSA9PiB7IGNvbnNvbGUubG9nKFwi5YWz6Zet562+5Yiw5aWW5Yqx5o+S5bGP5bm/5ZGK5pKt5pS+5a6M5oiQXCIpIH0pO1xuICAgICAgICAgICAgLy8gaWYgKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5TaWduQXdhcmRJbnNlcnRdKSB7XG4gICAgICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5TaWduQXdhcmRJbnNlcnQpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjbGxpY2tDaGVja01hcmsoKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLmRhdGEpO1xuXG4gICAgICAgIGlmICghdGhpcy5jaGVja190b2dnbGUuaXNDaGVja2VkKSB7XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg562+5Yiw5by556qXYCxcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5Y+W5raI5Yu+6YCJXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=