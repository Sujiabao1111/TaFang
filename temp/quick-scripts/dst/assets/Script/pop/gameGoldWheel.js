
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameGoldWheel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHb2xkV2hlZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBQ2pELDJDQUFxQztBQUNyQyxxREFBZ0Q7QUFDaEQsK0NBQThDO0FBQzlDLHFDQUFnQztBQUNoQyxzRUFBaUU7QUFDakUsbURBQWtEO0FBQ2xELDJDQUE4QztBQUM5Qyx5Q0FBb0M7QUFDcEMsNkRBQXVEO0FBQ3ZELG1FQUE4RDtBQUM5RCxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLDZEQUF3RDtBQUN4RCxpREFBZ0Q7QUFFMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsSUFBTSxZQUFZLEdBQUcsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLE9B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Q0FBQzt1REFDVztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBEQUNjO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7bURBQ087SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztrREFDTTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNrQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ087SUFoRFIsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXN1QmpDO0lBQUQsb0JBQUM7Q0F0dUJELEFBc3VCQyxDQXR1QjBDLGdCQUFNLEdBc3VCaEQ7a0JBdHVCb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiXG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgZ2FtZUdvbGRXaGVlbFJld2FyZCBmcm9tIFwiLi9nYW1lR29sZFdoZWVsUmV3YXJkXCJcbmltcG9ydCBSZXdhcmRDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sZWxyL1Jld2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBSZWRDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sZWxyL1JlZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBkZWZhdWx0X2RhdGEgPSB7XCJjb2RlXCI6MCxcIm1lc3NhZ2VcIjpcInN1Y2Nlc3NcIixcImRhdGFcIjp7XCJ0aW1lc1wiOjIwLFwic3RhdGVcIjoyLFwicmV3YXJkTGlzdFwiOlt7XCJpZFwiOlwiMTAxXCIsXCJ2YWx1ZVwiOjEwMDAsXCJ0eXBlXCI6Mn0se1wiaWRcIjpcIjEwNVwiLFwidmFsdWVcIjo1LFwidHlwZVwiOjF9LHtcImlkXCI6XCIxMDJcIixcInZhbHVlXCI6NTAwLFwidHlwZVwiOjJ9LHtcImlkXCI6XCIxMDZcIixcInZhbHVlXCI6MTAsXCJ0eXBlXCI6MX0se1wiaWRcIjpcIjEwM1wiLFwidmFsdWVcIjozMDAsXCJ0eXBlXCI6Mn0se1wiaWRcIjpcIjEwN1wiLFwidmFsdWVcIjoxNSxcInR5cGVcIjoxfSx7XCJpZFwiOlwiMTA0XCIsXCJ2YWx1ZVwiOjEwMCxcInR5cGVcIjoyfSx7XCJpZFwiOlwiMTA4XCIsXCJ2YWx1ZVwiOjIwLFwidHlwZVwiOjF9XX19XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZUdvbGRXaGVlbCBleHRlbmRzIGJhc2VUcyB7XG4gICAgXG4gICAgQHByb3BlcnR5KGNjLldpZGdldClcbiAgICB3YWxsZXRCdG5XaWRnZXQ6Y2MuV2lkZ2V0ID0gbnVsbDsgLy/mj5DnjrDmjInpkq5cbiAgICBcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY29pbkxhYmVsOmNjLkxhYmVsID0gbnVsbDsgLy/ph5HluIFcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgUHJvZ3Jlc3M6Y2MuUHJvZ3Jlc3NCYXIgPSBudWxsOyAvL+i/m+W6plxuICAgIFxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXG4gICAgY29pbkl0ZW1BcnI6Y2MuTm9kZVtdID0gW107IC8v6YeR5biB5aWW5YqxXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aGVlbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aGVlbF9yZXdhcmQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuX2NsaWNrR2V0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9jbGlja1ZpZGVvR2V0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9jbGlja0dyYXlHZXQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuQ2xvc2VOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9yZW1haW5OdW06IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBpbWdfZ29sZDogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIGltZ19yZWQ6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdhbWVHb2xkV2hlZWxSZXdhcmQ6IGNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRpbWVOb2RlMTpjYy5Ob2RlID0gbnVsbDsgLy/liankvZnmrKHmlbBcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRpbWVOb2RlMjpjYy5Ob2RlID0gbnVsbDsgLy/lrozkuoblh6DmrKFcblxuICAgIHdoZWVsU3RhdGU7Ly/ovaznm5jlvZPliY3pmLbmrrVcbiAgICBjdXJTcGVlZDsgIC8v5b2T5YmN6YCf5bqmXG4gICAgc3BpblRpbWU7Ly/lh4/pgJ/liY3ml4vovazml7bpl7RcbiAgICBnZWFyTnVtOy8v6b2/6L2u5pWw6YePXG4gICAgZGVmYXVsdEFuZ2xlOy8v5L+u5q2j6buY6K6k6KeS5bqmXG4gICAgZ2VhckFuZ2xlOy8v5q+P5Liq6b2/6L2u55qE6KeS5bqmXG4gICAgZmluYWxBbmdsZTsvL+acgOe7iOe7k+aenOaMh+WumueahOinkuW6plxuICAgIG1heFNwZWVkOy8v5pyA5aSn6YCf5bqmXG4gICAgZHVyYXRpb247Ly/lh4/pgJ/liY3ml4vovazml7bpl7RcbiAgICBhY2M7Ly/liqDpgJ/luqZcbiAgICBkZWNBbmdsZTsvL+WHj+mAn+WJjei9rOWKqOinkuW6plxuICAgIGVuZENhbGxCYWNrOy8v6L2s5a6M6Kem5Y+R5Zue6LCDXG4gICAgdGFyZ2V0SWQ7Ly/ovazliqjliLDnm67moIflgLxcbiAgICB3aGVlbEl0ZW1zOiBhbnk7XG4gICAgaXNDYW5DbGlja1doZWVsOiBib29sZWFuO1xuICAgIGlzQ2xpY2tHZXRQcml6ZTogYm9vbGVhbjtcbiAgICBpc01haW46IGFueTtcbiAgICBjbG9zZUNhbGw6IGFueTtcbiAgICBnb2RXaGVlbERhdGE6IGFueTtcbiAgICBsYWJsZV9wcml6ZU51bTogYW55O1xuICAgIHByaXplRGF0YTogYW55O1xuICAgIHBsYXllckN1ckdvbGQ6IGFueTtcbiAgICBzaG93SW1nR29sZDogYW55O1xuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy/ov5vluqZcbiAgICBwcml2YXRlIGRhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhbHVlOjMsIC8v5qyh5pWwXG4gICAgICAgICAgICBudW06MTAwMCwgLy/lpZblirFcbiAgICAgICAgICAgIHN0YXR1czowLCAvLzDmnKrpooYgLy8x5Y+v6aKGIDIvL+W3sumihlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB2YWx1ZTo2LFxuICAgICAgICAgICAgbnVtOjYwMDAsXG4gICAgICAgICAgICBzdGF0dXM6MCwgLy8w5pyq6aKGIC8vMeWPr+mihiAyLy/lt7LpooZcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdmFsdWU6MTAsXG4gICAgICAgICAgICBudW06MTAwMDAsXG4gICAgICAgICAgICBzdGF0dXM6MCwgLy8w5pyq6aKGIC8vMeWPr+mihiAyLy/lt7LpooZcbiAgICAgICAgfSxcbiAgICBdXG5cbiAgICAvL+eUqOaIt+i/m+W6plxuICAgIHByaXZhdGUgdHVybnRhYmxlUHJvZ3Jlc3M6YW55ID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy53aGVlbEl0ZW1zID0ge31cbiAgICAgICAgLy8gdGhpcy5UZW1wTm9kZUNvbnRyb2xsZXIgPSBHbG9iYWwuVGVtcE5vZGUuZ2V0Q29tcG9uZW50KCdUZW1wTm9kZUNvbnRyb2xsZXInKVxuICAgICAgICAvLyB0aGlzLlRlbXBOb2RlQ29udHJvbGxlci5zaG93Tm9kZSgpO1xuXG4gICAgICAgIHRoaXMuaXNDYW5DbGlja1doZWVsID0gdHJ1ZTtcblxuXG4gICAgICAgIC8v5pWw5o2u5pu05pawXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVmlld19Vc2VyRGF0YVVwZGF0YSwocmVzKT0+e1xuXG4gICAgICAgICAgICBpZihyZXM9PXVwZGF0ZVR5cGUuY29pbil7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gdXRpbC51c2VyRGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW5MYWJlbC5zdHJpbmcgPSBTdHJpbmcodXNlckRhdGEuY29pbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVmlld19Vc2VyRGF0YVVwZGF0YSx1cGRhdGVUeXBlLmNvaW4pO1xuXG4gICAgICAgIFxuICAgICAgICB0aGlzLndhbGxldEJ0bldpZGdldC50b3AgKz0gTnVtYmVyKHV0aWwuaXBob25lWFRvcCk7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5aSn6L2s55uY5by556qXXCIsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLndoZWVsU3RhdGUgPSAwO1xuICAgICAgICBzZWxmLmN1clNwZWVkID0gMDtcbiAgICAgICAgc2VsZi5zcGluVGltZSA9IDA7Ly/lh4/pgJ/liY3ml4vovazml7bpl7RcbiAgICAgICAgc2VsZi5nZWFyTnVtID0gODtcbiAgICAgICAgc2VsZi5kZWZhdWx0QW5nbGUgPSAwOy8v5L+u5q2j6buY6K6k6KeS5bqmXG4gICAgICAgIHNlbGYuZ2VhckFuZ2xlID0gMzYwIC8gc2VsZi5nZWFyTnVtOy8v5q+P5Liq6b2/6L2u55qE6KeS5bqmXG4gICAgICAgIHNlbGYud2hlZWwuYW5nbGUgPSBzZWxmLmRlZmF1bHRBbmdsZTtcbiAgICAgICAgc2VsZi5maW5hbEFuZ2xlID0gMDsvL+acgOe7iOe7k+aenOaMh+WumueahOinkuW6plxuICAgICAgICBzZWxmLm1heFNwZWVkID0gMTUsXG4gICAgICAgICAgICBzZWxmLmR1cmF0aW9uID0gMS41Oy8v5YeP6YCf5YmN5peL6L2s5pe26Ze0XG4gICAgICAgIHNlbGYuYWNjID0gMC42Oy8v5Yqg6YCf5bqmXG4gICAgICAgIHNlbGYuZ2FtZUdvbGRXaGVlbFJld2FyZC5hY3RpdmUgPSBmYWxzZVxuXG4gICAgICAgIGxldCByZXdhcmRfbGlzdCA9IHRoaXMud2hlZWxfcmV3YXJkLmNoaWxkcmVuXG4gICAgICAgIGlmIChyZXdhcmRfbGlzdC5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBtID0gcmV3YXJkX2xpc3QubGVuZ3RoOyBtIDwgODsgbSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShyZXdhcmRfbGlzdFswXSlcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMud2hlZWxfcmV3YXJkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXdhcmRfbGlzdCA9IHRoaXMud2hlZWxfcmV3YXJkLmNoaWxkcmVuXG4gICAgICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IHJld2FyZF9saXN0Lmxlbmd0aDsgbSsrKSB7XG4gICAgICAgICAgICAgICAgcmV3YXJkX2xpc3RbbV0uYW5nbGUgPSAtMzYwIC8gOCAqIG1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLnVwZGF0ZURhdGEyKGRlZmF1bHRfZGF0YS5kYXRhKS8v562W5YiS5by654OI6KaB5rGC6KaB6buY6K6k5pWw5o2u77yM5LiN6IO95pyJ5pWw5o2u5YiH5o2i5pWI5p6cXG5cbiAgICAgICAgc2VsZi5pc0NsaWNrR2V0UHJpemUgPSB0cnVlO1xuICAgICAgICBzZWxmLnVwZGF0ZURhdGEoKTtcblxuICAgICAgICBzZWxmLmlzQ2FuQ2xpY2tXaGVlbCA9IHRydWU7XG5cbiAgICAgICAgc2VsZi5idG5DbG9zZU5vZGUmJihzZWxmLmJ0bkNsb3NlTm9kZS5hY3RpdmUgPSBmYWxzZSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5idG5DbG9zZU5vZGUmJihzZWxmLmJ0bkNsb3NlTm9kZS5hY3RpdmUgPSB0cnVlKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIFxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLph5HluIHovaznm5jlvLnnqpdcIixcbiAgICAgICAgICAgIGRpYWxvZ19lbnRlcjogXCLpppbpobXph5HluIHovaznm5hcIlxuICAgICAgICB9KVxuICAgICAgICBUcmFja01nci5iaWdfdHVybnRhYmxlKHtcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuWkp+i9rOebmOW8ueeql+WxleekulwiXG4gICAgICAgIH0pXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5BcHBCdXlQcm9kdWN0RGlhbG9nLFxuICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgLy8gICAgICAgICBkaWFsb2dfbmFtZTI6IFwi6YeR5biB6L2s55uY5by556qXXCIsXG4gICAgICAgIC8vICAgICAgICAgZGlhbG9nX2VudGVyOiBcIummlumhtemHkeW4gei9rOebmFwiXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyBUZW1wUGFybS5zZXREYWlseURhdGEoTm9ybWFsUGFnZUxpc3QuR29sZFdoZWVsLCAxKVxuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuVGVtcE5vZGVDb250cm9sbGVyKSB0aGlzLlRlbXBOb2RlQ29udHJvbGxlci5oaWRlTm9kZSgpXG5cbiAgICAgICAgLy8gQ2xpZW50RXZlbnQuZGlzcGF0Y2goXCJnb2xkV2hlZWxfZG90X3VwZGF0ZVwiLCBMb2NhbERhdGEucXVlcnkoRGF0YUl0ZW0uZ29sZFdoZWVsQ291bnQpIDwgMjApO1xuXG4gICAgICAgIHRoaXMuY2xvc2VDYWxsICYmIHRoaXMuY2xvc2VDYWxsKClcbiAgICAgICAgdGhpcy5jbG9zZUNhbGwgPSBudWxsXG5cbiAgICAgICAgVHJhY2tNZ3IuYmlnX3R1cm50YWJsZSh7XG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLlpKfovaznm5jlvLnnqpfngrnlh7vlhbPpl61cIlxuICAgICAgICB9KVxuICAgIH1cbiAgICBzZXRDbG9zZUNhbGwoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jbG9zZUNhbGwgPSBjYWxsYmFja1xuICAgIH1cbiAgICBzdGFydFdoZWVsKHRhcmdldElkLCBlbmRDYWxsQmFjaykge1xuICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlY0FuZ2xlID0gMzYwOyAgLy8g5YeP6YCf5peL6L2s5Lik5ZyIXG4gICAgICAgIHRoaXMud2hlZWxTdGF0ZSA9IDE7XG4gICAgICAgIHRoaXMuY3VyU3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnNwaW5UaW1lID0gMDtcbiAgICAgICAgdGhpcy5lbmRDYWxsQmFjayA9IGVuZENhbGxCYWNrO1xuICAgICAgICB0aGlzLnRhcmdldElkID0gdGFyZ2V0SWRcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5TXVzaWMoTmFtZVRzLkdvbGRfV2hlZWwpXG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLndoZWVsU3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndoZWVsU3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5zcGluVGltZSArPSBkdDtcbiAgICAgICAgICAgIHRoaXMud2hlZWwuYW5nbGUgPSB0aGlzLndoZWVsLmFuZ2xlIC0gdGhpcy5jdXJTcGVlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1clNwZWVkIDw9IHRoaXMubWF4U3BlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1clNwZWVkICs9IHRoaXMuYWNjO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGluVGltZSA8IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZpbmFsQW5nbGUgPSB0aGlzLnRhcmdldElkICogdGhpcy5nZWFyQW5nbGUgKyB0aGlzLmRlZmF1bHRBbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1heFNwZWVkID0gdGhpcy5jdXJTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsLmFuZ2xlID0gdGhpcy5maW5hbEFuZ2xlO1xuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxTdGF0ZSA9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy53aGVlbFN0YXRlID09IDIpIHtcbiAgICAgICAgICAgIHZhciBjdXJSbyA9IHRoaXMud2hlZWwuYW5nbGU7XG4gICAgICAgICAgICB2YXIgaGFkUm8gPSAtKGN1clJvIC0gdGhpcy5maW5hbEFuZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuY3VyU3BlZWQgPSB0aGlzLm1heFNwZWVkICogKCh0aGlzLmRlY0FuZ2xlIC0gaGFkUm8pIC8gdGhpcy5kZWNBbmdsZSkgKyAwLjI7XG4gICAgICAgICAgICB0aGlzLndoZWVsLmFuZ2xlID0gY3VyUm8gLSB0aGlzLmN1clNwZWVkO1xuXG4gICAgICAgICAgICBpZiAoKHRoaXMuZGVjQW5nbGUgLSBoYWRSbykgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxTdGF0ZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbC5hbmdsZSA9IHRoaXMuZmluYWxBbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZENhbGxCYWNrKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInRoaXM6XCIsIHRoaXMudGFyZ2V0SWQsIHRoaXMuZ2VhckFuZ2xlLCB0aGlzLnByaXplRGF0YSlcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vJy94eGwtYWNjb3VudC9hcGkvdHVybnRhYmxlL2luZGV4J1xuICAgIHVwZGF0ZURhdGEoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gbGV0IGRhdGEgPSB7XG4gICAgICAgIC8vICAgICByZXdhcmRMaXN0OltcbiAgICAgICAgLy8gICAgICAgICB7aWQ6MTExMSx0eXBlOjEsdmFsdWU6MTAwMH0sXG4gICAgICAgIC8vICAgICAgICAge2lkOjIyMjIsdHlwZToyLHZhbHVlOjV9LFxuICAgICAgICAvLyAgICAgICAgIHtpZDozMzMzLHR5cGU6MSx2YWx1ZToyMDAwfSxcbiAgICAgICAgLy8gICAgICAgICB7aWQ6NDQ0NCx0eXBlOjIsdmFsdWU6Nn0sXG4gICAgICAgIC8vICAgICAgICAge2lkOjU1NTUsdHlwZToxLHZhbHVlOjUwMDB9LFxuICAgICAgICAvLyAgICAgICAgIHtpZDo2NjY2LHR5cGU6Mix2YWx1ZTo3fSxcbiAgICAgICAgLy8gICAgICAgICB7aWQ6Nzc3Nyx0eXBlOjEsdmFsdWU6NzAwMH0sXG4gICAgICAgIC8vICAgICAgICAge2lkOjc3NzcsdHlwZToyLHZhbHVlOjEwfSxcbiAgICAgICAgLy8gICAgIF0sXG4gICAgICAgIC8vICAgICBzdGF0ZToxLFxuICAgICAgICAvLyAgICAgdGltZXM6MTBcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBzZWxmLnVwZGF0ZURhdGEyKGRhdGEpXG4gICAgICAgIC8vIHJldHVyblxuXG4gICAgICAgIGlmKHNlbGYudHVybnRhYmxlUHJvZ3Jlc3MmJnNlbGYudHVybnRhYmxlUHJvZ3Jlc3MuY3VycmVudCYmc2VsZi50dXJudGFibGVQcm9ncmVzcy5jdXJyZW50KzE+MTApe1xuICAgICAgICAgICAgdGhpcy5jaGVja0ZpbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nb2xkV2hlZWxfaW5kZXgsXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mb3JtYXREYXRhKGRhdGEudXNlclR1cm50YWJsZVN0YWdlUmV3YXJkKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVEYXRhMihkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuZ29kV2hlZWxEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZURhdGEyKHNlbGYuZ29kV2hlZWxEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG4gICAgICAgICAgICAgICAgWE1TREsudG9hc3QoJ+e9kee7nOWHuumUmX4nLCAyLjUsIDEpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmdvZFdoZWVsRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZURhdGEyKHNlbGYuZ29kV2hlZWxEYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YTIoZGF0YSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuXG5cbiAgICAgICAgc2VsZi5nb2RXaGVlbERhdGEgPSBkYXRhO1xuICAgICAgICBSZWRDb250cm9sbGVyLndoZWVsQ291bnQgPSBkYXRhLnRpbWVzO1xuXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC41LCAxLjIpLCBjYy5zY2FsZVRvKDAuNSwgMSkpKTtcbiAgICAgICAgc2VsZi5idG5fY2xpY2tWaWRlb0dldC5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICBzZWxmLmJ0bl9jbGlja0dldC5zdG9wQWxsQWN0aW9ucygpO1xuXG4gICAgICAgIC8vIGlmIChkYXRhLnRpbWVzIDw9IDApIHtcbiAgICAgICAgLy8gICAgIHNlbGYubGFibGVfcmVtYWluTnVtLnN0cmluZyA9IGDku4rml6XliankvZkw5qyh5py65LyaLOivt+aYjuaXpeWGjeadpWA7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICBzZWxmLmxhYmxlX3JlbWFpbk51bS5zdHJpbmcgPSBg6L+Y5YmpJHtkYXRhLnRpbWVzfeasoeaKveWlluacuuS8mmA7XG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIHRoaXMudGltZU5vZGUxLmFjdGl2ZSA9IGRhdGEudGltZXMgPD0gMDtcbiAgICAgICAgdGhpcy50aW1lTm9kZTIuYWN0aXZlID0gZGF0YS50aW1lcz4wO1xuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW0oKTtcblxuICAgICAgICB1dGlsLnNldFRlbXBQYXJtKFwiZ29sZFdoZWVsUmVtYWluTnVtXCIsIGRhdGEudGltZXMpXG4gICAgICAgIFxuICAgICAgICAvLyBzZWxmLmJ0bl9jbGlja0dldC5hY3RpdmUgPXNlbGYuYnRuX2NsaWNrVmlkZW9HZXQuYWN0aXZlID0gc2VsZi5idG5fY2xpY2tHcmF5R2V0LmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChkYXRhLnN0YXRlID09IDEpIHtcbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrR2V0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHcmF5R2V0LmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0dldC5ydW5BY3Rpb24oYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhLnN0YXRlID09IDIpIHtcbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrR2V0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tWaWRlb0dldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHcmF5R2V0LmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGEuc3RhdGUgPT0gMykge1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHZXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHcmF5R2V0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXRlbURhdGEgPSBzZWxmLndoZWVsX3Jld2FyZC5jaGlsZHJlbjtcbiAgICAgICAgc2VsZi53aGVlbEl0ZW1zID0ge307XG5cbiAgICAgICAgbGV0IGV4Y2hhbmdlUmF0ZSA9IHV0aWwudXNlckRhdGEuZXhjaGFuZ2VSYXRlIHx8IDEwMDAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcml6ZSA9IGl0ZW1EYXRhW2ldO1xuICAgICAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gZGF0YS5yZXdhcmRMaXN0W2ldLnR5cGUgPT0gMSA/IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFBvaW50U3ByaXRlKDIpIDogUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUG9pbnRTcHJpdGUoMSlcbiAgICAgICAgICAgIGlmIChkYXRhLnJld2FyZExpc3RbaV0udmFsdWUgPCAxMDAwIHx8IGRhdGEucmV3YXJkTGlzdFtpXS50eXBlID09IHVwZGF0ZVR5cGUucHJvZHVjdCkge1xuICAgICAgICAgICAgICAgIHByaXplLmdldENoaWxkQnlOYW1lKFwiR29kV2hlZWxfZ29sZFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lXG4gICAgICAgICAgICAgICAgcHJpemUuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkTnVtXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7ZGF0YS5yZXdhcmRMaXN0W2ldLnZhbHVlfWA7XG4gICAgICAgICAgICAgICAgc2VsZi53aGVlbEl0ZW1zW2Ake2RhdGEucmV3YXJkTGlzdFtpXS5pZH1gXSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcml6ZS5nZXRDaGlsZEJ5TmFtZShcIkdvZFdoZWVsX2dvbGRcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxuICAgICAgICAgICAgICAgIGlmIChleGNoYW5nZVJhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpemUuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkTnVtXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7KGRhdGEucmV3YXJkTGlzdFtpXS52YWx1ZSAvIGV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgxKX08c2l6ZSA9IDI2PuWFgzwvc2l6ZT5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpemUuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkTnVtXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7KGRhdGEucmV3YXJkTGlzdFtpXS52YWx1ZSAvIDEwMDAwKS50b0ZpeGVkKDEpfTxzaXplID0gMjY+5YWDPC9zaXplPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYud2hlZWxJdGVtc1tgJHtkYXRhLnJld2FyZExpc3RbaV0uaWR9YF0gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tXYXRlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5idG5fY2xpY2tHZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICBzZWxmLmNsaWNrQnRuV2hlZWwoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LmFjdGl2ZSkge1xuICAgICAgICAgICAgc2VsZi5jbGlja1doZWVsVmlkZW8oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxmLmJ0bl9jbGlja0dyYXlHZXQuYWN0aXZlKSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrV2hlZWwoaXNWaWRlbyA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAoIWlzVmlkZW8pIHtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6YeR5biB6L2s55uY5by556qXXCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaZrumAmuaKveWlllwiLFxuICAgICAgICAgICAgICAgIGRpYWxvZ19lbnRlcjogdGhpcy5pc01haW4gPyBcIummlumhtemHkeW4gei9rOebmFwiIDogXCLpmZDml7bnpLzljIXmlLbkuIvot7PovaxcIixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBYTVNESy50cmFjayh7XG4gICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LkFwcERpYWxvZ0NsaWNrLFxuICAgICAgICAgICAgLy8gICAgIHByb3BzOiB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGRpYWxvZ19uYW1lMjogXCLph5HluIHovaznm5jlvLnnqpdcIixcbiAgICAgICAgICAgIC8vICAgICAgICAgY2tfbW9kdWxlOiBcIuaZrumAmuaKveWlllwiLFxuICAgICAgICAgICAgLy8gICAgICAgICBkaWFsb2dfZW50ZXI6IHRoaXMuaXNNYWluID8gXCLpppbpobXph5HluIHovaznm5hcIiA6IFwi6ZmQ5pe256S85YyF5pS25LiL6Lez6L2sXCIsXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIumHkeW4gei9rOebmOW8ueeql1wiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLop4bpopHmir3lpZZcIixcbiAgICAgICAgICAgICAgICBkaWFsb2dfZW50ZXI6IHRoaXMuaXNNYWluID8gXCLpppbpobXph5HluIHovaznm5hcIiA6IFwi6ZmQ5pe256S85YyF5pS25LiL6Lez6L2sXCIsXG4gICAgICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6XCLmv4DlirHop4bpopFcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QuQXBwRGlhbG9nQ2xpY2ssXG4gICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgZGlhbG9nX25hbWUyOiBcIumHkeW4gei9rOebmOW8ueeql1wiLFxuICAgICAgICAgICAgLy8gICAgICAgICBja19tb2R1bGU6IFwi6KeG6aKR5oq95aWWXCIsXG4gICAgICAgICAgICAvLyAgICAgICAgIGRpYWxvZ19lbnRlcjogdGhpcy5pc01haW4gPyBcIummlumhtemHkeW4gei9rOebmFwiIDogXCLpmZDml7bnpLzljIXmlLbkuIvot7PovaxcIixcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5jaGVja0lzQ2FuQ2xpY2tXaGVlbCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5pc0NhbkNsaWNrV2hlZWwpIHtcbiAgICAgICAgICAgIHNlbGYuaXNDYW5DbGlja1doZWVsID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGlzLnN0YXJ0V2hlZWwoNSwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucHJpemVEYXRhID17XG4gICAgICAgICAgICAvLyAgICAgICAgIGlkOlwiMTExMTFcIixcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV3YXJkOntcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlkOjEsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0eXBlOjEsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB2YWx1ZTo1MDAwXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5vcGVuR2V0Vmlld05vZGUoKTtcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAvLyByZXR1cm5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmdvbGRXaGVlbF9hY3Rpb24sXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QuY29pbl93aGVlbHNfZHJhdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkcmF3X2NvdW50OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkcmF3X3R5cGU6IGlzVmlkZW8gPyBcIuinhumikeaKveWlllwiIDogXCLmma7pgJrmir3lpZZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnJld2FyZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEgJiYgdGhpcy53aGVlbEl0ZW1zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaXplRGF0YSA9IHJlcy5kYXRhOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJpemVJZCA9IHRoaXMud2hlZWxJdGVtc1tgJHtkYXRhLmlkfWBdO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRXaGVlbChwcml6ZUlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkdldFZpZXdOb2RlKG51bGwsIGlzVmlkZW8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nb2RXaGVlbERhdGEudGltZXMgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5nb2RXaGVlbERhdGEudGltZXMgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdvZFdoZWVsRGF0YS50aW1lcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChkYXRhLnRpbWVzIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc2VsZi5sYWJsZV9yZW1haW5OdW0uc3RyaW5nID0gYOS7iuaXpeWJqeS9mTDmrKHmnLrkvJos6K+35piO5pel5YaN5p2lYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHNlbGYubGFibGVfcmVtYWluTnVtLnN0cmluZyA9IGDov5jliakke3NlbGYuZ29kV2hlZWxEYXRhLnRpbWVzfeasoeaKveWlluacuuS8mmA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudXBkYXRlSXRlbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNDYW5DbGlja1doZWVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+ficsIDIuNSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzQ2FuQ2xpY2tXaGVlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QoJ+e9kee7nOWHuumUmX5+ficsIDIuNSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaXNDYW5DbGlja1doZWVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tCdG5XaGVlbCgpIHtcbiAgICAgICAgdGhpcy5jbGlja1doZWVsKCk7XG4gICAgfVxuXG4gICAgY2xpY2tXaGVlbFZpZGVvKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5jaGVja0lzQ2FuQ2xpY2tXaGVlbCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5pc0NhbkNsaWNrV2hlZWwpIHtcbiAgICAgICAgICAgIHNlbGYuaXNDYW5DbGlja1doZWVsID0gZmFsc2U7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmlzQ2FuQ2xpY2tXaGVlbCA9IHRydWU7XG4gICAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5Hb2xkV2hlZWwsICgpID0+IHtcbiAgICAgICAgICAgICAgICBYTVNESy50b2FzdChcIuaEn+iwouingueci++8jOmineWkluWFjei0ueaKveWlluasoeaVsOW3suWPkeaUvlwiLCAxLjUpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNDYW5DbGlja1doZWVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrV2hlZWwodHJ1ZSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0lzQ2FuQ2xpY2tXaGVlbCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLndoZWVsU3RhdGUgIT0gMCB8fCAodGhpcy5nYW1lR29sZFdoZWVsUmV3YXJkICYmIHRoaXMuZ2FtZUdvbGRXaGVlbFJld2FyZC5hY3RpdmUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgb3BlbkdldFZpZXdOb2RlKG5vZGUsIGlzVmlkZW86IGJvb2xlYW4pIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5TXVzaWMoTmFtZVRzLkdvbGFfV2hlZWxfR2V0KVxuICAgICAgICB1dGlsLnVzZXJEYXRhLmdvbGRXaGVlbENvdW50Kys7XG4gICAgICAgIHRoaXMuZ2FtZUdvbGRXaGVlbFJld2FyZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBsZXQgZ2FtZUdvbGRXaGVlbFJld2FyZFRzOmdhbWVHb2xkV2hlZWxSZXdhcmQgPSB0aGlzLmdhbWVHb2xkV2hlZWxSZXdhcmQuZ2V0Q29tcG9uZW50KGdhbWVHb2xkV2hlZWxSZXdhcmQpO1xuICAgICAgICBpZihnYW1lR29sZFdoZWVsUmV3YXJkVHMpe1xuXG4gICAgICAgICAgICBnYW1lR29sZFdoZWVsUmV3YXJkVHMuaW5pdCh0aGlzLnByaXplRGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIumHkeW4gei9rOebmOiOt+W+l+WlluWKseW8ueeql1wiLFxuICAgICAgICAgICAgZGlhbG9nX2VudGVyOiB0aGlzLmlzTWFpbiA/IFwi6aaW6aG16YeR5biB6L2s55uYXCIgOiBcIumZkOaXtuekvOWMheaUtuS4i+i3s+i9rFwiLFxuICAgICAgICB9KVxuXG4gICAgICAgIFRyYWNrTWdyLmJpZ190dXJudGFibGUoe1xuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5oq95aWW5oiQ5YqfXCIsXG4gICAgICAgICAgICBsdWNreV9kcmF3OiB0aGlzLmdvZFdoZWVsRGF0YS50aW1lcyxcbiAgICAgICAgICAgIGx1Y2t5X2RyYXdfbm93bHk6IDEsXG4gICAgICAgICAgICB3YXRjaF92aWRlb3M6IEJvb2xlYW4oaXNWaWRlbyksXG4gICAgICAgICAgICBwcml6ZTogdGhpcy5wcml6ZURhdGEucmV3YXJkLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGxldCBwbGF5ZXJDdXJHb2xkID0gdXRpbC51c2VyRGF0YS5jb2luO1xuICAgICAgICAvLyBsZXQgdGVtcCA9IHRoaXMuVGVtcE5vZGVDb250cm9sbGVyLnNob3dDb21wKHBsYXllckN1ckdvbGQsIDIsIDIpO1xuXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5BcHBCdXlQcm9kdWN0RGlhbG9nLFxuICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgLy8gICAgICAgICBkaWFsb2dfbmFtZTI6IFwi6YeR5biB6L2s55uY6I635b6X5aWW5Yqx5by556qXXCIsXG4gICAgICAgIC8vICAgICAgICAgZGlhbG9nX2VudGVyOiB0aGlzLmlzTWFpbiA/IFwi6aaW6aG16YeR5biB6L2s55uYXCIgOiBcIumZkOaXtuekvOWMheaUtuS4i+i3s+i9rFwiLFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cblxuICAgIGNsaWNrQ2xvc2UoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSAhPSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhKTtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLph5HluIHovaznm5jlvLnnqpdcIixcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLlhbPpl61cIixcbiAgICAgICAgICAgIGRpYWxvZ19lbnRlcjogdGhpcy5pc01haW4gPyBcIummlumhtemHkeW4gei9rOebmFwiIDogXCLpmZDml7bnpLzljIXmlLbkuIvot7PovaxcIixcbiAgICAgICAgfSlcbiAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LkFwcERpYWxvZ0NsaWNrLFxuICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgLy8gICAgICAgICBkaWFsb2dfbmFtZTI6IFwi6YeR5biB6L2s55uY5by556qXXCIsXG4gICAgICAgIC8vICAgICAgICAgY2tfbW9kdWxlOiBcIuWFs+mXrVwiLFxuICAgICAgICAvLyAgICAgICAgIGRpYWxvZ19lbnRlcjogdGhpcy5pc01haW4gPyBcIummlumhtemHkeW4gei9rOebmFwiIDogXCLpmZDml7bnpLzljIXmlLbkuIvot7PovaxcIixcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgLyoq5o+Q546wICovXG4gICAgd2FsbGV0QnRuKCl7XG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIui9rOebmFwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLmj5DnjrBcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcbiAgICAgICAgfSlcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbixwYWdlVHMucGFnZU5hbWUuR2FtZVdhbGxldCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDov5vluqZpdGVtXG4gICAgICovXG4gICAgdXBkYXRlSXRlbSgpe1xuICAgICAgICBpZighdGhpcy50dXJudGFibGVQcm9ncmVzcylyZXR1cm47XG4gICAgICAgIC8v546p5LqG5Yeg5qyhXG4gICAgICAgIGxldCBwbGF5VGltZTpudW1iZXIgID0gdGhpcy50dXJudGFibGVQcm9ncmVzcy5jdXJyZW50fHwwO1xuICAgICAgICBsZXQgbm93U3RhdGU6bnVtYmVyID0gMDsvL+W9k+WJjei/m+W6plxuICAgICAgICBpZihwbGF5VGltZTwzKXtcbiAgICAgICAgICAgIG5vd1N0YXRlID0gMDtcbiAgICAgICAgfWVsc2UgaWYocGxheVRpbWU+PTMmJnBsYXlUaW1lPDYpe1xuICAgICAgICAgICAgbm93U3RhdGUgPSAxO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG5vd1N0YXRlID0gMjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gbGV0IGl0ZW0gPSB0aGlzLnR1cm50YWJsZVByb2dyZXNzLnJld2FyZERldGFpbER0b0xpc3Rbbm93U3RhdGVdO1xuICAgICAgICB0aGlzLmxhYmxlX3JlbWFpbk51bS5zdHJpbmcgPSBcIuesrFwiKzEwK1wi5qyhXCI7XG4gICAgICAgIHRoaXMuUHJvZ3Jlc3MucHJvZ3Jlc3MgPSBwbGF5VGltZS8xMDtcblxuICAgICAgICB0aGlzLnR1cm50YWJsZVByb2dyZXNzLnJld2FyZERldGFpbER0b0xpc3QuZm9yRWFjaCgodmFsdWUsaW5kZXgpPT57XG4gICAgICAgICAgICBpZih2YWx1ZS5zdGF0dXM9PTAmJnBsYXlUaW1lPj12YWx1ZS5ub2RlKXtcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJdGVtU3RhdGUoaW5kZXgsdmFsdWUuc3RhdHVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aKG5Y+W6YeR5biB5aWW5YqxXG4gICAgICovXG4gICAgZ2V0Q29pbkJ0bihlLG51bSl7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBpZighdGhpcy50dXJudGFibGVQcm9ncmVzcylyZXR1cm47XG4gICAgICAgIG51bSA9IE51bWJlcihudW0pO1xuICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLnR1cm50YWJsZVByb2dyZXNzLnJld2FyZERldGFpbER0b0xpc3RbbnVtXTtcbiAgICAgICAgaWYoaXRlbURhdGEuc3RhdHVzIT09MSl7cmV0dXJuO31cbiAgICAgICAgdXRpbC5wb3N0KHtcbiAgICAgICAgICAgIHVybDpVcmxDb25zdC5nb2xkV2hlZWxfcmVjZWl2ZSxcbiAgICAgICAgICAgIGRhdGE6e25vZGU6aXRlbURhdGEubm9kZX0sXG4gICAgICAgICAgICBzdWNjZXNzOigpPT57XG4gICAgICAgICAgICAgICAgaXRlbURhdGEuc3RhdHVzID0gMjsvL+WPmOaIkOW3sue7j+eKtuaAgVxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSXRlbVN0YXRlKG51bSwyKTtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635Y+WXCIraXRlbURhdGEucmV3YXJkK1wi57qi5YyF5biBXCIpO1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiBlLnRhcmdldCwgdmFsdWU6IGl0ZW1EYXRhLnJld2FyZCxudW06MTAscGFyZW50OnRoaXMubm9kZS5nZXRQYXJlbnQoKX0pO1xuXG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5aSn6L2s55uY5by556qXXCIsXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLnrKxcIisobnVtKzEpK1wi5qGj6L+b5bqm5aWW5YqxXCIsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOigpPT57XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIumihuWPluWksei0pe+8gVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkv67mlLnnirbmgIFcbiAgICAgKiBAcGFyYW0gaW5kZXggLy/nrKzlh6DkuKpcbiAgICAgKiBAcGFyYW0gbnVtIC8vMOacqumihiAvLzHlj6/pooYgMi8v5bey6aKGXG4gICAgICovXG4gICAgY2hhbmdlSXRlbVN0YXRlKGluZGV4Om51bWJlcixudW06bnVtYmVyKXtcbiAgICAgICAgbGV0IHBhcmVudDpjYy5Ob2RlID0gdGhpcy5jb2luSXRlbUFycltpbmRleF07XG4gICAgICAgIGxldCBkYXRhOmFueSA9IHRoaXMudHVybnRhYmxlUHJvZ3Jlc3MucmV3YXJkRGV0YWlsRHRvTGlzdFtpbmRleF07XG4gICAgICAgIGxldCBsaWdodDpjYy5Ob2RlID0gcGFyZW50LmNoaWxkcmVuWzBdO1xuICAgICAgICBsZXQgbGFiZWw6Y2MuTGFiZWwgPSBwYXJlbnQuY2hpbGRyZW5baW5kZXg9PTI/MzoyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAvL+acgOWQjuS4gOS4queahOWtl+S9k1xuICAgICAgICBsZXQgbGFiZWwyOmNjLk5vZGUgPSBudWxsO1xuICAgICAgICBpZihpbmRleD09Mil7XG4gICAgICAgICAgICBsYWJlbDIgPSBwYXJlbnQuY2hpbGRyZW5bMl07XG4gICAgICAgICAgICBsYWJlbDIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGlnaHQuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgc3dpdGNoKG51bSl7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gXCIrXCIrZGF0YS5yZXdhcmQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbGlnaHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIitcIitkYXRhLnJld2FyZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBpZihpbmRleD09Mil7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsMi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuW3sumihlwiO1xuICAgICAgICAgICAgICAgIHBhcmVudC5vcGFjaXR5ID0gMjAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLzlvI/ljJbkuIDkuIvmlbDmja5cbiAgICAgKi9cbiAgICBmb3JtYXREYXRhKGRhdGEpe1xuXG4gICAgICAgIHRoaXMudHVybnRhYmxlUHJvZ3Jlc3MgPSBkYXRhO1xuICAgICAgICBsZXQgdGltZTpudW1iZXIgPSBkYXRhLmN1cnJlbnQ7IC8v546p55qE5qyh5pWwXG4gICAgICAgIHRoaXMudHVybnRhYmxlUHJvZ3Jlc3MucmV3YXJkRGV0YWlsRHRvTGlzdC5mb3JFYWNoKCh2YWx1ZSxpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYodmFsdWUuc3RhdHVzPT0xKXtcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSAyO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlLm5vZGU8PXRpbWUpe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgICAgIFxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbotoXov4cxMVxuICAgICAqL1xuXG4gICAgY2hlY2tGaWxsKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5ruh5LqGMTDmrKFcIik7XG4gICAgICAgIGxldCBjb2luOm51bWJlciA9IDA7Ly/lpJrlsJHph5HluIFcbiAgICAgICAgdGhpcy50dXJudGFibGVQcm9ncmVzcy5yZXdhcmREZXRhaWxEdG9MaXN0LmZvckVhY2goKHZhbHVlLGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZih2YWx1ZS5zdGF0dXM9PTEpe1xuICAgICAgICAgICAgICAgIGNvaW4rPXZhbHVlLnJld2FyZDtcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5jb2luSXRlbUFycltpbmRleF0sIHZhbHVlOiB2YWx1ZS5yZXdhcmQsbnVtOjEwLHBhcmVudDp0aGlzLm5vZGUuZ2V0UGFyZW50KCl9KTtcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLlpKfovaznm5jlvLnnqpdcIixcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuesrFwiKyhpbmRleCsxKStcIuaho+i/m+W6puWlluWKsVwiLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnR1cm50YWJsZVByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgaWYoY29pbj4wKXtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflj5ZcIitjb2luK1wi57qi5YyF5biBXCIpO1xuICAgICAgICB9XG5cbiAgICB9XG59Il19