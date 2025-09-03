"use strict";
cc._RF.push(module, 'f6f7dJ1pGJLebNgzQLJd0Qq', 'gameGoldWheel');
// Script/pop/gameGoldWheel.ts

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
var soundController_1 = require("../soundController");
var NameTs_1 = require("../common/NameTs");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var UrlConst_1 = require("../server/UrlConst");
var util_1 = require("../util/util");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var baseTs_1 = require("../base/baseTs");
var gameGoldWheelReward_1 = require("./gameGoldWheelReward");
var RewardController_1 = require("../controlelr/RewardController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var pageTs_1 = require("../common/pageTs");
var RedController_1 = require("../controlelr/RedController");
var AssistCtr_1 = require("../Assist/AssistCtr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var default_data = { "code": 0, "message": "success", "data": { "times": 20, "state": 2, "rewardList": [{ "id": "101", "value": 1000, "type": 2 }, { "id": "105", "value": 5, "type": 1 }, { "id": "102", "value": 500, "type": 2 }, { "id": "106", "value": 10, "type": 1 }, { "id": "103", "value": 300, "type": 2 }, { "id": "107", "value": 15, "type": 1 }, { "id": "104", "value": 100, "type": 2 }, { "id": "108", "value": 20, "type": 1 }] } };
var gameGoldWheel = /** @class */ (function (_super) {
    __extends(gameGoldWheel, _super);
    function gameGoldWheel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.walletBtnWidget = null; //提现按钮
        _this.coinLabel = null; //金币
        _this.Progress = null; //进度
        _this.coinItemArr = []; //金币奖励
        _this.wheel = null;
        _this.wheel_reward = null;
        _this.btn_clickGet = null;
        _this.btn_clickVideoGet = null;
        _this.btn_clickGrayGet = null;
        _this.btnCloseNode = null;
        _this.lable_remainNum = null;
        _this.img_gold = null;
        _this.img_red = null;
        _this.gameGoldWheelReward = null;
        _this.timeNode1 = null; //剩余次数
        _this.timeNode2 = null; //完了几次
        // LIFE-CYCLE CALLBACKS:
        //进度
        _this.data = [
            {
                value: 3,
                num: 1000,
                status: 0,
            },
            {
                value: 6,
                num: 6000,
                status: 0,
            },
            {
                value: 10,
                num: 10000,
                status: 0,
            },
        ];
        //用户进度
        _this.turntableProgress = null;
        return _this;
    }
    gameGoldWheel.prototype.onLoad = function () {
        var _this = this;
        this.wheelItems = {};
        // this.TempNodeController = Global.TempNode.getComponent('TempNodeController')
        // this.TempNodeController.showNode();
        this.isCanClickWheel = true;
        //数据更新
        cc.game.on(NameTs_1.default.Game_View_UserDataUpdata, function (res) {
            if (res == faceTs_1.updateType.coin) {
                var userData = util_1.default.userData;
                _this.coinLabel.string = String(userData.coin);
            }
        }, this);
        cc.game.emit(NameTs_1.default.Game_View_UserDataUpdata, faceTs_1.updateType.coin);
        this.walletBtnWidget.top += Number(util_1.default.iphoneXTop);
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "大转盘弹窗",
        });
    };
    gameGoldWheel.prototype.start = function () {
    };
    gameGoldWheel.prototype.onEnable = function () {
        var self = this;
        self.wheelState = 0;
        self.curSpeed = 0;
        self.spinTime = 0; //减速前旋转时间
        self.gearNum = 8;
        self.defaultAngle = 0; //修正默认角度
        self.gearAngle = 360 / self.gearNum; //每个齿轮的角度
        self.wheel.angle = self.defaultAngle;
        self.finalAngle = 0; //最终结果指定的角度
        self.maxSpeed = 15,
            self.duration = 1.5; //减速前旋转时间
        self.acc = 0.6; //加速度
        self.gameGoldWheelReward.active = false;
        var reward_list = this.wheel_reward.children;
        if (reward_list.length < 8) {
            for (var m = reward_list.length; m < 8; m++) {
                var node = cc.instantiate(reward_list[0]);
                node.parent = this.wheel_reward;
            }
            reward_list = this.wheel_reward.children;
            for (var m = 0; m < reward_list.length; m++) {
                reward_list[m].angle = -360 / 8 * m;
            }
        }
        self.updateData2(default_data.data); //策划强烈要求要默认数据，不能有数据切换效果
        self.isClickGetPrize = true;
        self.updateData();
        self.isCanClickWheel = true;
        self.btnCloseNode && (self.btnCloseNode.active = false);
        setTimeout(function () {
            self.btnCloseNode && (self.btnCloseNode.active = true);
        }, 2000);
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "金币转盘弹窗",
            dialog_enter: "首页金币转盘"
        });
        TrackMgr_1.default.big_turntable({
            activity_state: "大转盘弹窗展示"
        });
        // XMSDK.track({
        //     eventName: SAConst.AppBuyProductDialog,
        //     props: {
        //         dialog_name2: "金币转盘弹窗",
        //         dialog_enter: "首页金币转盘"
        //     }
        // });
        // TempParm.setDailyData(NormalPageList.GoldWheel, 1)
    };
    gameGoldWheel.prototype.onDisable = function () {
        // if (this.TempNodeController) this.TempNodeController.hideNode()
        // ClientEvent.dispatch("goldWheel_dot_update", LocalData.query(DataItem.goldWheelCount) < 20);
        this.closeCall && this.closeCall();
        this.closeCall = null;
        TrackMgr_1.default.big_turntable({
            activity_state: "大转盘弹窗点击关闭"
        });
    };
    gameGoldWheel.prototype.setCloseCall = function (callback) {
        this.closeCall = callback;
    };
    gameGoldWheel.prototype.startWheel = function (targetId, endCallBack) {
        if (this.wheelState !== 0) {
            return;
        }
        this.decAngle = 360; // 减速旋转两圈
        this.wheelState = 1;
        this.curSpeed = 0;
        this.spinTime = 0;
        this.endCallBack = endCallBack;
        this.targetId = targetId;
        soundController_1.default.singleton.playMusic(NameTs_1.default.Gold_Wheel);
    };
    gameGoldWheel.prototype.update = function (dt) {
        if (this.wheelState === 0) {
            return;
        }
        if (this.wheelState == 1) {
            this.spinTime += dt;
            this.wheel.angle = this.wheel.angle - this.curSpeed;
            if (this.curSpeed <= this.maxSpeed) {
                this.curSpeed += this.acc;
            }
            else {
                if (this.spinTime < this.duration) {
                    return;
                }
                this.finalAngle = this.targetId * this.gearAngle + this.defaultAngle;
                this.maxSpeed = this.curSpeed;
                this.wheel.angle = this.finalAngle;
                this.wheelState = 2;
            }
        }
        else if (this.wheelState == 2) {
            var curRo = this.wheel.angle;
            var hadRo = -(curRo - this.finalAngle);
            this.curSpeed = this.maxSpeed * ((this.decAngle - hadRo) / this.decAngle) + 0.2;
            this.wheel.angle = curRo - this.curSpeed;
            if ((this.decAngle - hadRo) <= 0) {
                this.wheelState = 0;
                this.wheel.angle = this.finalAngle;
                this.endCallBack();
                console.error("this:", this.targetId, this.gearAngle, this.prizeData);
            }
        }
    };
    //'/xxl-account/api/turntable/index'
    gameGoldWheel.prototype.updateData = function () {
        var _this = this;
        var self = this;
        // let data = {
        //     rewardList:[
        //         {id:1111,type:1,value:1000},
        //         {id:2222,type:2,value:5},
        //         {id:3333,type:1,value:2000},
        //         {id:4444,type:2,value:6},
        //         {id:5555,type:1,value:5000},
        //         {id:6666,type:2,value:7},
        //         {id:7777,type:1,value:7000},
        //         {id:7777,type:2,value:10},
        //     ],
        //     state:1,
        //     times:10
        // }
        // self.updateData2(data)
        // return
        if (self.turntableProgress && self.turntableProgress.current && self.turntableProgress.current + 1 > 10) {
            this.checkFill();
        }
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.goldWheel_index,
            onSuccess: function (res) {
                if (res.code === 0) {
                    if (!_this.isValid) {
                        return;
                    }
                    var data = res.data;
                    self.formatData(data.userTurntableStageReward);
                    self.updateData2(data);
                }
                else {
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                    if (self.godWheelData) {
                        self.updateData2(self.godWheelData);
                    }
                }
            },
            onFail: function (err) {
                XMSDK_1.default.toast('网络出错~', 2.5, 1);
                if (self.godWheelData) {
                    self.updateData2(self.godWheelData);
                }
            }
        });
    };
    gameGoldWheel.prototype.updateData2 = function (data) {
        var self = this;
        self.godWheelData = data;
        RedController_1.default.wheelCount = data.times;
        var action = cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1)));
        self.btn_clickVideoGet.stopAllActions();
        self.btn_clickGet.stopAllActions();
        // if (data.times <= 0) {
        //     self.lable_remainNum.string = `今日剩余0次机会,请明日再来`;
        // }
        // else {
        //     self.lable_remainNum.string = `还剩${data.times}次抽奖机会`;
        // }
        this.timeNode1.active = data.times <= 0;
        this.timeNode2.active = data.times > 0;
        this.updateItem();
        util_1.default.setTempParm("goldWheelRemainNum", data.times);
        // self.btn_clickGet.active =self.btn_clickVideoGet.active = self.btn_clickGrayGet.active = false;
        if (data.state == 1) {
            self.btn_clickGet.active = true;
            self.btn_clickVideoGet.active = false;
            self.btn_clickGrayGet.active = false;
            self.btn_clickGet.runAction(action);
        }
        else if (data.state == 2) {
            self.btn_clickGet.active = false;
            self.btn_clickVideoGet.active = true;
            self.btn_clickGrayGet.active = false;
            self.btn_clickVideoGet.runAction(action);
        }
        else if (data.state == 3) {
            self.btn_clickGet.active = false;
            self.btn_clickVideoGet.active = false;
            self.btn_clickGrayGet.active = true;
        }
        var itemData = self.wheel_reward.children;
        self.wheelItems = {};
        var exchangeRate = util_1.default.userData.exchangeRate || 10000;
        for (var i = 0; i < itemData.length; i++) {
            var prize = itemData[i];
            var spriteFrame = data.rewardList[i].type == 1 ? RewardController_1.default.instance.findPointSprite(2) : RewardController_1.default.instance.findPointSprite(1);
            if (data.rewardList[i].value < 1000 || data.rewardList[i].type == faceTs_1.updateType.product) {
                prize.getChildByName("GodWheel_gold").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                prize.getChildByName("goldNum").getComponent(cc.RichText).string = "" + data.rewardList[i].value;
                self.wheelItems["" + data.rewardList[i].id] = i;
            }
            else {
                prize.getChildByName("GodWheel_gold").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                if (exchangeRate) {
                    prize.getChildByName("goldNum").getComponent(cc.RichText).string = (data.rewardList[i].value / exchangeRate).toFixed(1) + "<size = 26>\u5143</size>";
                }
                else {
                    prize.getChildByName("goldNum").getComponent(cc.RichText).string = (data.rewardList[i].value / 10000).toFixed(1) + "<size = 26>\u5143</size>";
                }
                self.wheelItems["" + data.rewardList[i].id] = i;
            }
        }
    };
    gameGoldWheel.prototype.clickWater = function () {
        var self = this;
        if (self.btn_clickGet.active) {
            self.clickBtnWheel();
        }
        else if (self.btn_clickVideoGet.active) {
            self.clickWheelVideo();
        }
        else if (self.btn_clickGrayGet.active) {
        }
    };
    gameGoldWheel.prototype.clickWheel = function (isVideo) {
        var _this = this;
        if (isVideo === void 0) { isVideo = false; }
        var self = this;
        if (!isVideo) {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "金币转盘弹窗",
                ck_module: "普通抽奖",
                dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
            });
            // XMSDK.track({
            //     eventName: SAConst.AppDialogClick,
            //     props: {
            //         dialog_name2: "金币转盘弹窗",
            //         ck_module: "普通抽奖",
            //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
            //     }
            // });
        }
        else {
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "金币转盘弹窗",
                ck_module: "视频抽奖",
                dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
                active_ad_hcdg: "激励视频"
            });
            // XMSDK.track({
            //     eventName: SAConst.AppDialogClick,
            //     props: {
            //         dialog_name2: "金币转盘弹窗",
            //         ck_module: "视频抽奖",
            //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
            //     }
            // });
        }
        if (!this.checkIsCanClickWheel()) {
            return;
        }
        if (self.isCanClickWheel) {
            self.isCanClickWheel = false;
            //
            // this.startWheel(5, () => {
            //     this.prizeData ={
            //         id:"11111",
            //         reward:{
            //             id:1,
            //             type:1,
            //             value:5000
            //         }
            //     }
            //     this.openGetViewNode();
            // })
            // return
            //
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.goldWheel_action,
                onSuccess: function (res) {
                    if (res.code === 0) {
                        // XMSDK.track({
                        //     eventName: SAConst.coin_wheels_draw,
                        //     props: {
                        //         draw_count: 1,
                        //         draw_type: isVideo ? "视频抽奖" : "普通抽奖"
                        //     }
                        // });
                        var data = res.data.reward;
                        if (data && _this.wheelItems) {
                            _this.prizeData = res.data;
                            var prizeId = _this.wheelItems["" + data.id];
                            _this.startWheel(prizeId, function () {
                                _this.openGetViewNode(null, isVideo);
                            });
                            self.godWheelData.times -= 1;
                            if (self.godWheelData.times <= 0) {
                                self.godWheelData.times = 0;
                            }
                            // if (data.times <= 0) {
                            //     self.lable_remainNum.string = `今日剩余0次机会,请明日再来`;
                            // }
                            // else {
                            //     self.lable_remainNum.string = `还剩${self.godWheelData.times}次抽奖机会`;
                            // }
                            // this.updateItem();
                            self.isCanClickWheel = true;
                        }
                    }
                    else {
                        XMSDK_1.default.toast(res.message || '网络出错~~', 2.5, 1);
                        self.isCanClickWheel = true;
                    }
                },
                onFail: function (err) {
                    XMSDK_1.default.toast('网络出错~~~', 2.5, 1);
                    self.isCanClickWheel = true;
                }
            });
        }
    };
    gameGoldWheel.prototype.clickBtnWheel = function () {
        this.clickWheel();
    };
    gameGoldWheel.prototype.clickWheelVideo = function () {
        var _this = this;
        var self = this;
        if (!this.checkIsCanClickWheel()) {
            return;
        }
        if (self.isCanClickWheel) {
            self.isCanClickWheel = false;
            setTimeout(function () {
                self.isCanClickWheel = true;
            }, 3000);
            AdController_1.default.loadAd(AdPosition_1.AdPosition.GoldWheel, function () {
                XMSDK_1.default.toast("感谢观看，额外免费抽奖次数已发放", 1.5);
                _this.isCanClickWheel = true;
                _this.clickWheel(true);
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }
    };
    gameGoldWheel.prototype.checkIsCanClickWheel = function () {
        var self = this;
        if (this.wheelState != 0 || (this.gameGoldWheelReward && this.gameGoldWheelReward.active)) {
            return false;
        }
        return true;
    };
    gameGoldWheel.prototype.openGetViewNode = function (node, isVideo) {
        var _this = this;
        soundController_1.default.singleton.playMusic(NameTs_1.default.Gola_Wheel_Get);
        util_1.default.userData.goldWheelCount++;
        this.gameGoldWheelReward.active = true;
        var gameGoldWheelRewardTs = this.gameGoldWheelReward.getComponent(gameGoldWheelReward_1.default);
        if (gameGoldWheelRewardTs) {
            gameGoldWheelRewardTs.init(this.prizeData, function () {
                _this.updateData();
            });
        }
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "金币转盘获得奖励弹窗",
            dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
        });
        TrackMgr_1.default.big_turntable({
            activity_state: "抽奖成功",
            lucky_draw: this.godWheelData.times,
            lucky_draw_nowly: 1,
            watch_videos: Boolean(isVideo),
            prize: this.prizeData.reward.value
        });
        // let playerCurGold = util.userData.coin;
        // let temp = this.TempNodeController.showComp(playerCurGold, 2, 2);
        // XMSDK.track({
        //     eventName: SAConst.AppBuyProductDialog,
        //     props: {
        //         dialog_name2: "金币转盘获得奖励弹窗",
        //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
        //     }
        // });
    };
    gameGoldWheel.prototype.clickClose = function () {
        var self = this;
        if (this.wheelState != 0) {
            return;
        }
        cc.game.emit(NameTs_1.default.Game_Task_updata);
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "金币转盘弹窗",
            ck_module: "关闭",
            dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
        });
        // XMSDK.track({
        //     eventName: SAConst.AppDialogClick,
        //     props: {
        //         dialog_name2: "金币转盘弹窗",
        //         ck_module: "关闭",
        //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
        //     }
        // });
    };
    /**提现 */
    gameGoldWheel.prototype.walletBtn = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "转盘",
            app_ck_module: "提现",
            app_exposure_type: "icon",
        });
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameWallet);
    };
    /**
     * 更新进度item
     */
    gameGoldWheel.prototype.updateItem = function () {
        var _this = this;
        if (!this.turntableProgress)
            return;
        //玩了几次
        var playTime = this.turntableProgress.current || 0;
        var nowState = 0; //当前进度
        if (playTime < 3) {
            nowState = 0;
        }
        else if (playTime >= 3 && playTime < 6) {
            nowState = 1;
        }
        else {
            nowState = 2;
        }
        // let item = this.turntableProgress.rewardDetailDtoList[nowState];
        this.lable_remainNum.string = "第" + 10 + "次";
        this.Progress.progress = playTime / 10;
        this.turntableProgress.rewardDetailDtoList.forEach(function (value, index) {
            if (value.status == 0 && playTime >= value.node) {
                value.status = 1;
            }
            _this.changeItemState(index, value.status);
        });
    };
    /**
     * 领取金币奖励
     */
    gameGoldWheel.prototype.getCoinBtn = function (e, num) {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        if (!this.turntableProgress)
            return;
        num = Number(num);
        var itemData = this.turntableProgress.rewardDetailDtoList[num];
        if (itemData.status !== 1) {
            return;
        }
        util_1.default.post({
            url: UrlConst_1.UrlConst.goldWheel_receive,
            data: { node: itemData.node },
            success: function () {
                itemData.status = 2; //变成已经状态
                _this.changeItemState(num, 2);
                AssistCtr_1.AssistCtr.showToastTip("获取" + itemData.reward + "红包币");
                cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: e.target, value: itemData.reward, num: 10, parent: _this.node.getParent() });
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "大转盘弹窗",
                    ck_module: "第" + (num + 1) + "档进度奖励",
                });
            },
            fail: function () {
                AssistCtr_1.AssistCtr.showToastTip("领取失败！");
            }
        });
    };
    /**
     * 修改状态
     * @param index //第几个
     * @param num //0未领 //1可领 2//已领
     */
    gameGoldWheel.prototype.changeItemState = function (index, num) {
        var parent = this.coinItemArr[index];
        var data = this.turntableProgress.rewardDetailDtoList[index];
        var light = parent.children[0];
        var label = parent.children[index == 2 ? 3 : 2].getComponent(cc.Label);
        //最后一个的字体
        var label2 = null;
        if (index == 2) {
            label2 = parent.children[2];
            label2.active = true;
            label.node.active = false;
        }
        light.active = false;
        switch (num) {
            case 0:
                label.string = "+" + data.reward;
                break;
            case 1:
                light.active = true;
                label.string = "+" + data.reward;
                break;
            case 2:
                if (index == 2) {
                    label2.active = false;
                    label.node.active = true;
                }
                label.string = "已领";
                parent.opacity = 200;
                break;
        }
    };
    /**
     * 格式化一下数据
     */
    gameGoldWheel.prototype.formatData = function (data) {
        this.turntableProgress = data;
        var time = data.current; //玩的次数
        this.turntableProgress.rewardDetailDtoList.forEach(function (value, index) {
            if (value.status == 1) {
                value.status = 2;
            }
            else {
                if (value.node <= time) {
                    value.status = 1;
                }
                else {
                    value.status = 0;
                }
            }
        });
    };
    /**
     * 检查是否超过11
     */
    gameGoldWheel.prototype.checkFill = function () {
        var _this = this;
        console.log("满了10次");
        var coin = 0; //多少金币
        this.turntableProgress.rewardDetailDtoList.forEach(function (value, index) {
            if (value.status == 1) {
                coin += value.reward;
                cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.coinItemArr[index], value: value.reward, num: 10, parent: _this.node.getParent() });
                TrackMgr_1.default.AppDialogClick_hcdg({
                    dialog_name_hcdg: "大转盘弹窗",
                    ck_module: "第" + (index + 1) + "档进度奖励",
                });
            }
        });
        this.turntableProgress = null;
        if (coin > 0) {
            AssistCtr_1.AssistCtr.showToastTip("获取" + coin + "红包币");
        }
    };
    __decorate([
        property(cc.Widget)
    ], gameGoldWheel.prototype, "walletBtnWidget", void 0);
    __decorate([
        property(cc.Label)
    ], gameGoldWheel.prototype, "coinLabel", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], gameGoldWheel.prototype, "Progress", void 0);
    __decorate([
        property([cc.Node])
    ], gameGoldWheel.prototype, "coinItemArr", void 0);
    __decorate([
        property(cc.Node)
    ], gameGoldWheel.prototype, "wheel", void 0);
    __decorate([
        property(cc.Node)
    ], gameGoldWheel.prototype, "wheel_reward", void 0);
    __decorate([
        property(cc.Node)
    ], gameGoldWheel.prototype, "btn_clickGet", void 0);
    __decorate([
        property(cc.Node)
    ], gameGoldWheel.prototype, "btn_clickVideoGet", void 0);
    __decorate([
        property(cc.Node)
    ], gameGoldWheel.prototype, "btn_clickGrayGet", void 0);
    __decorate([
        property(cc.Node)
    ], gameGoldWheel.prototype, "btnCloseNode", void 0);
    __decorate([
        property(cc.Label)
    ], gameGoldWheel.prototype, "lable_remainNum", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], gameGoldWheel.prototype, "img_gold", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], gameGoldWheel.prototype, "img_red", void 0);
    __decorate([
        property(cc.Node)
    ], gameGoldWheel.prototype, "gameGoldWheelReward", void 0);
    __decorate([
        property(cc.Node)
    ], gameGoldWheel.prototype, "timeNode1", void 0);
    __decorate([
        property(cc.Node)
    ], gameGoldWheel.prototype, "timeNode2", void 0);
    gameGoldWheel = __decorate([
        ccclass
    ], gameGoldWheel);
    return gameGoldWheel;
}(baseTs_1.default));
exports.default = gameGoldWheel;

cc._RF.pop();