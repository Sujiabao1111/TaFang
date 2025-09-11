
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
var soundController_1 = require("../soundController");
var NameTs_1 = require("../common/NameTs");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var UrlConst_1 = require("../server/UrlConst");
var util_1 = require("../util/util");
var faceTs_1 = require("../common/faceTs");
var baseTs_1 = require("../base/baseTs");
var gameGoldWheelReward_1 = require("./gameGoldWheelReward");
var RewardController_1 = require("../controlelr/RewardController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var pageTs_1 = require("../common/pageTs");
var RedController_1 = require("../controlelr/RedController");
var AssistCtr_1 = require("../Assist/AssistCtr");
//#region 抽奖 转盘
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
        // this.walletBtnWidget.top += Number(util.iphoneXTop);
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
    };
    gameGoldWheel.prototype.onDisable = function () {
        // if (this.TempNodeController) this.TempNodeController.hideNode()
        // ClientEvent.dispatch("goldWheel_dot_update", LocalData.query(DataItem.goldWheelCount) < 20);
        this.closeCall && this.closeCall();
        this.closeCall = null;
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
        if (!this.checkIsCanClickWheel()) {
            return;
        }
        if (self.isCanClickWheel) {
            self.isCanClickWheel = false;
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
                        // res.data.reward = {
                        //     id: "106",
                        //     type: 2,
                        //     value: 10
                        // }
                        var data = res.data.reward;
                        if (data && _this.wheelItems) {
                            _this.prizeData = res.data;
                            var prizeId = _this.wheelItems["" + data.id];
                            console.log("中奖是哪个：", prizeId, data, _this.wheelItems);
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
        var self = this;
        if (!this.checkIsCanClickWheel()) {
            return;
        }
        if (self.isCanClickWheel) {
            self.isCanClickWheel = false;
            setTimeout(function () {
                self.isCanClickWheel = true;
            }, 3000);
            // AdController.loadAd(AdPosition.GoldWheel, () => {
            XMSDK_1.default.toast("感谢观看，额外免费抽奖次数已发放", 1.5);
            this.isCanClickWheel = true;
            this.clickWheel(true);
            // }, () => {
            //     AssistCtr.showToastTip("加载视频失败，请稍后！");
            // })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHb2xkV2hlZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBQ2pELDJDQUFxQztBQUNyQyxxREFBZ0Q7QUFDaEQsK0NBQThDO0FBQzlDLHFDQUFnQztBQUdoQywyQ0FBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLDZEQUF1RDtBQUN2RCxtRUFBOEQ7QUFDOUQsaURBQTRDO0FBQzVDLDJDQUFzQztBQUN0Qyw2REFBd0Q7QUFDeEQsaURBQWdEO0FBR2hELGVBQWU7QUFDVCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QyxJQUFNLFlBQVksR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFB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LElBQUksQ0FBQztvREFDZ0I7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDZ0I7SUFoRGpCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EycUJqQztJQUFELG9CQUFDO0NBM3FCRCxBQTJxQkMsQ0EzcUIwQyxnQkFBTSxHQTJxQmhEO2tCQTNxQm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIlxuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgdXBkYXRlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IGdhbWVHb2xkV2hlZWxSZXdhcmQgZnJvbSBcIi4vZ2FtZUdvbGRXaGVlbFJld2FyZFwiXG5pbXBvcnQgUmV3YXJkQ29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGVsci9SZXdhcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgUmVkQ29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGVsci9SZWRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuXG5cbi8vI3JlZ2lvbiDmir3lpZYg6L2s55uYXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuY29uc3QgZGVmYXVsdF9kYXRhID0geyBcImNvZGVcIjogMCwgXCJtZXNzYWdlXCI6IFwic3VjY2Vzc1wiLCBcImRhdGFcIjogeyBcInRpbWVzXCI6IDIwLCBcInN0YXRlXCI6IDIsIFwicmV3YXJkTGlzdFwiOiBbeyBcImlkXCI6IFwiMTAxXCIsIFwidmFsdWVcIjogMTAwMCwgXCJ0eXBlXCI6IDIgfSwgeyBcImlkXCI6IFwiMTA1XCIsIFwidmFsdWVcIjogNSwgXCJ0eXBlXCI6IDEgfSwgeyBcImlkXCI6IFwiMTAyXCIsIFwidmFsdWVcIjogNTAwLCBcInR5cGVcIjogMiB9LCB7IFwiaWRcIjogXCIxMDZcIiwgXCJ2YWx1ZVwiOiAxMCwgXCJ0eXBlXCI6IDEgfSwgeyBcImlkXCI6IFwiMTAzXCIsIFwidmFsdWVcIjogMzAwLCBcInR5cGVcIjogMiB9LCB7IFwiaWRcIjogXCIxMDdcIiwgXCJ2YWx1ZVwiOiAxNSwgXCJ0eXBlXCI6IDEgfSwgeyBcImlkXCI6IFwiMTA0XCIsIFwidmFsdWVcIjogMTAwLCBcInR5cGVcIjogMiB9LCB7IFwiaWRcIjogXCIxMDhcIiwgXCJ2YWx1ZVwiOiAyMCwgXCJ0eXBlXCI6IDEgfV0gfSB9XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZUdvbGRXaGVlbCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoY2MuV2lkZ2V0KVxuICAgIHByaXZhdGUgd2FsbGV0QnRuV2lkZ2V0OiBjYy5XaWRnZXQgPSBudWxsOyAvL+aPkOeOsOaMiemSrlxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgY29pbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7IC8v6YeR5biBXG5cbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgcHJpdmF0ZSBQcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsOyAvL+i/m+W6plxuXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcbiAgICBwcml2YXRlIGNvaW5JdGVtQXJyOiBjYy5Ob2RlW10gPSBbXTsgLy/ph5HluIHlpZblirFcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgd2hlZWw6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSB3aGVlbF9yZXdhcmQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBidG5fY2xpY2tHZXQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBidG5fY2xpY2tWaWRlb0dldDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGJ0bl9jbGlja0dyYXlHZXQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBidG5DbG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFibGVfcmVtYWluTnVtOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgcHJpdmF0ZSBpbWdfZ29sZDogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIHByaXZhdGUgaW1nX3JlZDogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBnYW1lR29sZFdoZWVsUmV3YXJkOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgdGltZU5vZGUxOiBjYy5Ob2RlID0gbnVsbDsgLy/liankvZnmrKHmlbBcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgdGltZU5vZGUyOiBjYy5Ob2RlID0gbnVsbDsgLy/lrozkuoblh6DmrKFcblxuICAgIHByaXZhdGUgd2hlZWxTdGF0ZTsvL+i9rOebmOW9k+WJjemYtuautVxuICAgIHByaXZhdGUgY3VyU3BlZWQ7ICAvL+W9k+WJjemAn+W6plxuICAgIHByaXZhdGUgc3BpblRpbWU7Ly/lh4/pgJ/liY3ml4vovazml7bpl7RcbiAgICBwcml2YXRlIGdlYXJOdW07Ly/pvb/ova7mlbDph49cbiAgICBwcml2YXRlIGRlZmF1bHRBbmdsZTsvL+S/ruato+m7mOiupOinkuW6plxuICAgIHByaXZhdGUgZ2VhckFuZ2xlOy8v5q+P5Liq6b2/6L2u55qE6KeS5bqmXG4gICAgcHJpdmF0ZSBmaW5hbEFuZ2xlOy8v5pyA57uI57uT5p6c5oyH5a6a55qE6KeS5bqmXG4gICAgcHJpdmF0ZSBtYXhTcGVlZDsvL+acgOWkp+mAn+W6plxuICAgIHByaXZhdGUgZHVyYXRpb247Ly/lh4/pgJ/liY3ml4vovazml7bpl7RcbiAgICBwcml2YXRlIGFjYzsvL+WKoOmAn+W6plxuICAgIHByaXZhdGUgZGVjQW5nbGU7Ly/lh4/pgJ/liY3ovazliqjop5LluqZcbiAgICBwcml2YXRlIGVuZENhbGxCYWNrOy8v6L2s5a6M6Kem5Y+R5Zue6LCDXG4gICAgcHJpdmF0ZSB0YXJnZXRJZDsvL+i9rOWKqOWIsOebruagh+WAvFxuICAgIHByaXZhdGUgd2hlZWxJdGVtczogYW55O1xuICAgIHByaXZhdGUgaXNDYW5DbGlja1doZWVsOiBib29sZWFuO1xuICAgIHByaXZhdGUgaXNDbGlja0dldFByaXplOiBib29sZWFuO1xuICAgIHByaXZhdGUgaXNNYWluOiBhbnk7XG4gICAgcHJpdmF0ZSBjbG9zZUNhbGw6IGFueTtcbiAgICBwcml2YXRlIGdvZFdoZWVsRGF0YTogYW55O1xuICAgIHByaXZhdGUgbGFibGVfcHJpemVOdW06IGFueTtcbiAgICBwcml2YXRlIHByaXplRGF0YTogYW55O1xuICAgIHByaXZhdGUgcGxheWVyQ3VyR29sZDogYW55O1xuICAgIHByaXZhdGUgc2hvd0ltZ0dvbGQ6IGFueTtcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8v6L+b5bqmXG4gICAgcHJpdmF0ZSBkYXRhID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB2YWx1ZTogMywgLy/mrKHmlbBcbiAgICAgICAgICAgIG51bTogMTAwMCwgLy/lpZblirFcbiAgICAgICAgICAgIHN0YXR1czogMCwgLy8w5pyq6aKGIC8vMeWPr+mihiAyLy/lt7LpooZcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdmFsdWU6IDYsXG4gICAgICAgICAgICBudW06IDYwMDAsXG4gICAgICAgICAgICBzdGF0dXM6IDAsIC8vMOacqumihiAvLzHlj6/pooYgMi8v5bey6aKGXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhbHVlOiAxMCxcbiAgICAgICAgICAgIG51bTogMTAwMDAsXG4gICAgICAgICAgICBzdGF0dXM6IDAsIC8vMOacqumihiAvLzHlj6/pooYgMi8v5bey6aKGXG4gICAgICAgIH0sXG4gICAgXVxuXG4gICAgLy/nlKjmiLfov5vluqZcbiAgICBwcml2YXRlIHR1cm50YWJsZVByb2dyZXNzOiBhbnkgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLndoZWVsSXRlbXMgPSB7fVxuICAgICAgICAvLyB0aGlzLlRlbXBOb2RlQ29udHJvbGxlciA9IEdsb2JhbC5UZW1wTm9kZS5nZXRDb21wb25lbnQoJ1RlbXBOb2RlQ29udHJvbGxlcicpXG4gICAgICAgIC8vIHRoaXMuVGVtcE5vZGVDb250cm9sbGVyLnNob3dOb2RlKCk7XG5cbiAgICAgICAgdGhpcy5pc0NhbkNsaWNrV2hlZWwgPSB0cnVlO1xuXG5cbiAgICAgICAgLy/mlbDmja7mm7TmlrBcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzID09IHVwZGF0ZVR5cGUuY29pbikge1xuICAgICAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHV0aWwudXNlckRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2luTGFiZWwuc3RyaW5nID0gU3RyaW5nKHVzZXJEYXRhLmNvaW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVmlld19Vc2VyRGF0YVVwZGF0YSwgdXBkYXRlVHlwZS5jb2luKTtcblxuICAgICAgICAvLyB0aGlzLndhbGxldEJ0bldpZGdldC50b3AgKz0gTnVtYmVyKHV0aWwuaXBob25lWFRvcCk7XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYud2hlZWxTdGF0ZSA9IDA7XG4gICAgICAgIHNlbGYuY3VyU3BlZWQgPSAwO1xuICAgICAgICBzZWxmLnNwaW5UaW1lID0gMDsvL+WHj+mAn+WJjeaXi+i9rOaXtumXtFxuICAgICAgICBzZWxmLmdlYXJOdW0gPSA4O1xuICAgICAgICBzZWxmLmRlZmF1bHRBbmdsZSA9IDA7Ly/kv67mraPpu5jorqTop5LluqZcbiAgICAgICAgc2VsZi5nZWFyQW5nbGUgPSAzNjAgLyBzZWxmLmdlYXJOdW07Ly/mr4/kuKrpvb/ova7nmoTop5LluqZcbiAgICAgICAgc2VsZi53aGVlbC5hbmdsZSA9IHNlbGYuZGVmYXVsdEFuZ2xlO1xuICAgICAgICBzZWxmLmZpbmFsQW5nbGUgPSAwOy8v5pyA57uI57uT5p6c5oyH5a6a55qE6KeS5bqmXG4gICAgICAgIHNlbGYubWF4U3BlZWQgPSAxNSxcbiAgICAgICAgICAgIHNlbGYuZHVyYXRpb24gPSAxLjU7Ly/lh4/pgJ/liY3ml4vovazml7bpl7RcbiAgICAgICAgc2VsZi5hY2MgPSAwLjY7Ly/liqDpgJ/luqZcbiAgICAgICAgc2VsZi5nYW1lR29sZFdoZWVsUmV3YXJkLmFjdGl2ZSA9IGZhbHNlXG5cbiAgICAgICAgbGV0IHJld2FyZF9saXN0ID0gdGhpcy53aGVlbF9yZXdhcmQuY2hpbGRyZW5cbiAgICAgICAgaWYgKHJld2FyZF9saXN0Lmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IG0gPSByZXdhcmRfbGlzdC5sZW5ndGg7IG0gPCA4OyBtKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHJld2FyZF9saXN0WzBdKVxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy53aGVlbF9yZXdhcmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJld2FyZF9saXN0ID0gdGhpcy53aGVlbF9yZXdhcmQuY2hpbGRyZW5cbiAgICAgICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgcmV3YXJkX2xpc3QubGVuZ3RoOyBtKyspIHtcbiAgICAgICAgICAgICAgICByZXdhcmRfbGlzdFttXS5hbmdsZSA9IC0zNjAgLyA4ICogbVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi51cGRhdGVEYXRhMihkZWZhdWx0X2RhdGEuZGF0YSkvL+etluWIkuW8uueDiOimgeaxguimgem7mOiupOaVsOaNru+8jOS4jeiDveacieaVsOaNruWIh+aNouaViOaenFxuXG4gICAgICAgIHNlbGYuaXNDbGlja0dldFByaXplID0gdHJ1ZTtcbiAgICAgICAgc2VsZi51cGRhdGVEYXRhKCk7XG5cbiAgICAgICAgc2VsZi5pc0NhbkNsaWNrV2hlZWwgPSB0cnVlO1xuXG4gICAgICAgIHNlbGYuYnRuQ2xvc2VOb2RlICYmIChzZWxmLmJ0bkNsb3NlTm9kZS5hY3RpdmUgPSBmYWxzZSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5idG5DbG9zZU5vZGUgJiYgKHNlbGYuYnRuQ2xvc2VOb2RlLmFjdGl2ZSA9IHRydWUpO1xuICAgICAgICB9LCAyMDAwKTtcblxuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuVGVtcE5vZGVDb250cm9sbGVyKSB0aGlzLlRlbXBOb2RlQ29udHJvbGxlci5oaWRlTm9kZSgpXG4gICAgICAgIC8vIENsaWVudEV2ZW50LmRpc3BhdGNoKFwiZ29sZFdoZWVsX2RvdF91cGRhdGVcIiwgTG9jYWxEYXRhLnF1ZXJ5KERhdGFJdGVtLmdvbGRXaGVlbENvdW50KSA8IDIwKTtcbiAgICAgICAgdGhpcy5jbG9zZUNhbGwgJiYgdGhpcy5jbG9zZUNhbGwoKVxuICAgICAgICB0aGlzLmNsb3NlQ2FsbCA9IG51bGxcbiAgICB9XG5cblxuICAgIHNldENsb3NlQ2FsbChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNsb3NlQ2FsbCA9IGNhbGxiYWNrXG4gICAgfVxuXG4gICAgc3RhcnRXaGVlbCh0YXJnZXRJZCwgZW5kQ2FsbEJhY2spIHtcbiAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZWNBbmdsZSA9IDM2MDsgIC8vIOWHj+mAn+aXi+i9rOS4pOWciFxuICAgICAgICB0aGlzLndoZWVsU3RhdGUgPSAxO1xuICAgICAgICB0aGlzLmN1clNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zcGluVGltZSA9IDA7XG4gICAgICAgIHRoaXMuZW5kQ2FsbEJhY2sgPSBlbmRDYWxsQmFjaztcbiAgICAgICAgdGhpcy50YXJnZXRJZCA9IHRhcmdldElkXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24ucGxheU11c2ljKE5hbWVUcy5Hb2xkX1doZWVsKVxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc3BpblRpbWUgKz0gZHQ7XG4gICAgICAgICAgICB0aGlzLndoZWVsLmFuZ2xlID0gdGhpcy53aGVlbC5hbmdsZSAtIHRoaXMuY3VyU3BlZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJTcGVlZCA8PSB0aGlzLm1heFNwZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJTcGVlZCArPSB0aGlzLmFjYztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BpblRpbWUgPCB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5maW5hbEFuZ2xlID0gdGhpcy50YXJnZXRJZCAqIHRoaXMuZ2VhckFuZ2xlICsgdGhpcy5kZWZhdWx0QW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhTcGVlZCA9IHRoaXMuY3VyU3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbC5hbmdsZSA9IHRoaXMuZmluYWxBbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsU3RhdGUgPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMud2hlZWxTdGF0ZSA9PSAyKSB7XG4gICAgICAgICAgICB2YXIgY3VyUm8gPSB0aGlzLndoZWVsLmFuZ2xlO1xuICAgICAgICAgICAgdmFyIGhhZFJvID0gLShjdXJSbyAtIHRoaXMuZmluYWxBbmdsZSk7XG4gICAgICAgICAgICB0aGlzLmN1clNwZWVkID0gdGhpcy5tYXhTcGVlZCAqICgodGhpcy5kZWNBbmdsZSAtIGhhZFJvKSAvIHRoaXMuZGVjQW5nbGUpICsgMC4yO1xuICAgICAgICAgICAgdGhpcy53aGVlbC5hbmdsZSA9IGN1clJvIC0gdGhpcy5jdXJTcGVlZDtcblxuICAgICAgICAgICAgaWYgKCh0aGlzLmRlY0FuZ2xlIC0gaGFkUm8pIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsU3RhdGUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMud2hlZWwuYW5nbGUgPSB0aGlzLmZpbmFsQW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRDYWxsQmFjaygpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0aGlzOlwiLCB0aGlzLnRhcmdldElkLCB0aGlzLmdlYXJBbmdsZSwgdGhpcy5wcml6ZURhdGEpXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLycveHhsLWFjY291bnQvYXBpL3R1cm50YWJsZS9pbmRleCdcbiAgICB1cGRhdGVEYXRhKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIGxldCBkYXRhID0ge1xuICAgICAgICAvLyAgICAgcmV3YXJkTGlzdDpbXG4gICAgICAgIC8vICAgICAgICAge2lkOjExMTEsdHlwZToxLHZhbHVlOjEwMDB9LFxuICAgICAgICAvLyAgICAgICAgIHtpZDoyMjIyLHR5cGU6Mix2YWx1ZTo1fSxcbiAgICAgICAgLy8gICAgICAgICB7aWQ6MzMzMyx0eXBlOjEsdmFsdWU6MjAwMH0sXG4gICAgICAgIC8vICAgICAgICAge2lkOjQ0NDQsdHlwZToyLHZhbHVlOjZ9LFxuICAgICAgICAvLyAgICAgICAgIHtpZDo1NTU1LHR5cGU6MSx2YWx1ZTo1MDAwfSxcbiAgICAgICAgLy8gICAgICAgICB7aWQ6NjY2Nix0eXBlOjIsdmFsdWU6N30sXG4gICAgICAgIC8vICAgICAgICAge2lkOjc3NzcsdHlwZToxLHZhbHVlOjcwMDB9LFxuICAgICAgICAvLyAgICAgICAgIHtpZDo3Nzc3LHR5cGU6Mix2YWx1ZToxMH0sXG4gICAgICAgIC8vICAgICBdLFxuICAgICAgICAvLyAgICAgc3RhdGU6MSxcbiAgICAgICAgLy8gICAgIHRpbWVzOjEwXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gc2VsZi51cGRhdGVEYXRhMihkYXRhKVxuICAgICAgICAvLyByZXR1cm5cblxuICAgICAgICBpZiAoc2VsZi50dXJudGFibGVQcm9ncmVzcyAmJiBzZWxmLnR1cm50YWJsZVByb2dyZXNzLmN1cnJlbnQgJiYgc2VsZi50dXJudGFibGVQcm9ncmVzcy5jdXJyZW50ICsgMSA+IDEwKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRmlsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmdvbGRXaGVlbF9pbmRleCxcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGE7XG5cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZvcm1hdERhdGEoZGF0YS51c2VyVHVybnRhYmxlU3RhZ2VSZXdhcmQpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZURhdGEyKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QocmVzLm1lc3NhZ2UgfHwgJ+e9kee7nOWHuumUmX4nLCAyLjUsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5nb2RXaGVlbERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlRGF0YTIoc2VsZi5nb2RXaGVlbERhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcbiAgICAgICAgICAgICAgICBYTVNESy50b2FzdCgn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZ29kV2hlZWxEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlRGF0YTIoc2VsZi5nb2RXaGVlbERhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhMihkYXRhKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuXG5cbiAgICAgICAgc2VsZi5nb2RXaGVlbERhdGEgPSBkYXRhO1xuICAgICAgICBSZWRDb250cm9sbGVyLndoZWVsQ291bnQgPSBkYXRhLnRpbWVzO1xuXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC41LCAxLjIpLCBjYy5zY2FsZVRvKDAuNSwgMSkpKTtcbiAgICAgICAgc2VsZi5idG5fY2xpY2tWaWRlb0dldC5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICBzZWxmLmJ0bl9jbGlja0dldC5zdG9wQWxsQWN0aW9ucygpO1xuXG4gICAgICAgIC8vIGlmIChkYXRhLnRpbWVzIDw9IDApIHtcbiAgICAgICAgLy8gICAgIHNlbGYubGFibGVfcmVtYWluTnVtLnN0cmluZyA9IGDku4rml6XliankvZkw5qyh5py65LyaLOivt+aYjuaXpeWGjeadpWA7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICBzZWxmLmxhYmxlX3JlbWFpbk51bS5zdHJpbmcgPSBg6L+Y5YmpJHtkYXRhLnRpbWVzfeasoeaKveWlluacuuS8mmA7XG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIHRoaXMudGltZU5vZGUxLmFjdGl2ZSA9IGRhdGEudGltZXMgPD0gMDtcbiAgICAgICAgdGhpcy50aW1lTm9kZTIuYWN0aXZlID0gZGF0YS50aW1lcyA+IDA7XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbSgpO1xuXG4gICAgICAgIHV0aWwuc2V0VGVtcFBhcm0oXCJnb2xkV2hlZWxSZW1haW5OdW1cIiwgZGF0YS50aW1lcylcblxuICAgICAgICAvLyBzZWxmLmJ0bl9jbGlja0dldC5hY3RpdmUgPXNlbGYuYnRuX2NsaWNrVmlkZW9HZXQuYWN0aXZlID0gc2VsZi5idG5fY2xpY2tHcmF5R2V0LmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChkYXRhLnN0YXRlID09IDEpIHtcbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrR2V0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHcmF5R2V0LmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0dldC5ydW5BY3Rpb24oYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhLnN0YXRlID09IDIpIHtcbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrR2V0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tWaWRlb0dldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHcmF5R2V0LmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGEuc3RhdGUgPT0gMykge1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHZXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHcmF5R2V0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXRlbURhdGEgPSBzZWxmLndoZWVsX3Jld2FyZC5jaGlsZHJlbjtcbiAgICAgICAgc2VsZi53aGVlbEl0ZW1zID0ge307XG5cbiAgICAgICAgbGV0IGV4Y2hhbmdlUmF0ZSA9IHV0aWwudXNlckRhdGEuZXhjaGFuZ2VSYXRlIHx8IDEwMDAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcml6ZSA9IGl0ZW1EYXRhW2ldO1xuICAgICAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gZGF0YS5yZXdhcmRMaXN0W2ldLnR5cGUgPT0gMSA/IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFBvaW50U3ByaXRlKDIpIDogUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUG9pbnRTcHJpdGUoMSlcbiAgICAgICAgICAgIGlmIChkYXRhLnJld2FyZExpc3RbaV0udmFsdWUgPCAxMDAwIHx8IGRhdGEucmV3YXJkTGlzdFtpXS50eXBlID09IHVwZGF0ZVR5cGUucHJvZHVjdCkge1xuICAgICAgICAgICAgICAgIHByaXplLmdldENoaWxkQnlOYW1lKFwiR29kV2hlZWxfZ29sZFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lXG4gICAgICAgICAgICAgICAgcHJpemUuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkTnVtXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7ZGF0YS5yZXdhcmRMaXN0W2ldLnZhbHVlfWA7XG4gICAgICAgICAgICAgICAgc2VsZi53aGVlbEl0ZW1zW2Ake2RhdGEucmV3YXJkTGlzdFtpXS5pZH1gXSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcml6ZS5nZXRDaGlsZEJ5TmFtZShcIkdvZFdoZWVsX2dvbGRcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxuICAgICAgICAgICAgICAgIGlmIChleGNoYW5nZVJhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpemUuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkTnVtXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7KGRhdGEucmV3YXJkTGlzdFtpXS52YWx1ZSAvIGV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgxKX08c2l6ZSA9IDI2PuWFgzwvc2l6ZT5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpemUuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkTnVtXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7KGRhdGEucmV3YXJkTGlzdFtpXS52YWx1ZSAvIDEwMDAwKS50b0ZpeGVkKDEpfTxzaXplID0gMjY+5YWDPC9zaXplPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYud2hlZWxJdGVtc1tgJHtkYXRhLnJld2FyZExpc3RbaV0uaWR9YF0gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tXYXRlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5idG5fY2xpY2tHZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICBzZWxmLmNsaWNrQnRuV2hlZWwoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LmFjdGl2ZSkge1xuICAgICAgICAgICAgc2VsZi5jbGlja1doZWVsVmlkZW8oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxmLmJ0bl9jbGlja0dyYXlHZXQuYWN0aXZlKSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrV2hlZWwoaXNWaWRlbyA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuXG5cbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrSXNDYW5DbGlja1doZWVsKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLmlzQ2FuQ2xpY2tXaGVlbCkge1xuICAgICAgICAgICAgc2VsZi5pc0NhbkNsaWNrV2hlZWwgPSBmYWxzZTtcblxuICAgICAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nb2xkV2hlZWxfYWN0aW9uLFxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBYTVNESy50cmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LmNvaW5fd2hlZWxzX2RyYXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZHJhd19jb3VudDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZHJhd190eXBlOiBpc1ZpZGVvID8gXCLop4bpopHmir3lpZZcIiA6IFwi5pmu6YCa5oq95aWWXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVzLmRhdGEucmV3YXJkID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlkOiBcIjEwNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHR5cGU6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdmFsdWU6IDEwXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEucmV3YXJkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgdGhpcy53aGVlbEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcml6ZURhdGEgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJpemVJZCA9IHRoaXMud2hlZWxJdGVtc1tgJHtkYXRhLmlkfWBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuK3lpZbmmK/lk6rkuKrvvJpcIiwgcHJpemVJZCwgZGF0YSwgdGhpcy53aGVlbEl0ZW1zKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRXaGVlbChwcml6ZUlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkdldFZpZXdOb2RlKG51bGwsIGlzVmlkZW8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nb2RXaGVlbERhdGEudGltZXMgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5nb2RXaGVlbERhdGEudGltZXMgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdvZFdoZWVsRGF0YS50aW1lcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChkYXRhLnRpbWVzIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc2VsZi5sYWJsZV9yZW1haW5OdW0uc3RyaW5nID0gYOS7iuaXpeWJqeS9mTDmrKHmnLrkvJos6K+35piO5pel5YaN5p2lYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHNlbGYubGFibGVfcmVtYWluTnVtLnN0cmluZyA9IGDov5jliakke3NlbGYuZ29kV2hlZWxEYXRhLnRpbWVzfeasoeaKveWlluacuuS8mmA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy51cGRhdGVJdGVtKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0NhbkNsaWNrV2hlZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QocmVzLm1lc3NhZ2UgfHwgJ+e9kee7nOWHuumUmX5+JywgMi41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNDYW5DbGlja1doZWVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdCgn572R57uc5Ye66ZSZfn5+JywgMi41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0NhbkNsaWNrV2hlZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja0J0bldoZWVsKCkge1xuICAgICAgICB0aGlzLmNsaWNrV2hlZWwoKTtcbiAgICB9XG5cbiAgICBjbGlja1doZWVsVmlkZW8oKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrSXNDYW5DbGlja1doZWVsKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLmlzQ2FuQ2xpY2tXaGVlbCkge1xuICAgICAgICAgICAgc2VsZi5pc0NhbkNsaWNrV2hlZWwgPSBmYWxzZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuaXNDYW5DbGlja1doZWVsID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgICAgLy8gQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLkdvbGRXaGVlbCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KFwi5oSf6LCi6KeC55yL77yM6aKd5aSW5YWN6LS55oq95aWW5qyh5pWw5bey5Y+R5pS+XCIsIDEuNSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NhbkNsaWNrV2hlZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tXaGVlbCh0cnVlKTtcbiAgICAgICAgICAgIC8vIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrSXNDYW5DbGlja1doZWVsKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSAhPSAwIHx8ICh0aGlzLmdhbWVHb2xkV2hlZWxSZXdhcmQgJiYgdGhpcy5nYW1lR29sZFdoZWVsUmV3YXJkLmFjdGl2ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBvcGVuR2V0Vmlld05vZGUobm9kZSwgaXNWaWRlbzogYm9vbGVhbikge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLnBsYXlNdXNpYyhOYW1lVHMuR29sYV9XaGVlbF9HZXQpXG4gICAgICAgIHV0aWwudXNlckRhdGEuZ29sZFdoZWVsQ291bnQrKztcbiAgICAgICAgdGhpcy5nYW1lR29sZFdoZWVsUmV3YXJkLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGxldCBnYW1lR29sZFdoZWVsUmV3YXJkVHM6IGdhbWVHb2xkV2hlZWxSZXdhcmQgPSB0aGlzLmdhbWVHb2xkV2hlZWxSZXdhcmQuZ2V0Q29tcG9uZW50KGdhbWVHb2xkV2hlZWxSZXdhcmQpO1xuICAgICAgICBpZiAoZ2FtZUdvbGRXaGVlbFJld2FyZFRzKSB7XG5cbiAgICAgICAgICAgIGdhbWVHb2xkV2hlZWxSZXdhcmRUcy5pbml0KHRoaXMucHJpemVEYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6YeR5biB6L2s55uY6I635b6X5aWW5Yqx5by556qXXCIsXG4gICAgICAgICAgICBkaWFsb2dfZW50ZXI6IHRoaXMuaXNNYWluID8gXCLpppbpobXph5HluIHovaznm5hcIiA6IFwi6ZmQ5pe256S85YyF5pS25LiL6Lez6L2sXCIsXG4gICAgICAgIH0pXG5cbiAgICAgICAgVHJhY2tNZ3IuYmlnX3R1cm50YWJsZSh7XG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLmir3lpZbmiJDlip9cIixcbiAgICAgICAgICAgIGx1Y2t5X2RyYXc6IHRoaXMuZ29kV2hlZWxEYXRhLnRpbWVzLFxuICAgICAgICAgICAgbHVja3lfZHJhd19ub3dseTogMSxcbiAgICAgICAgICAgIHdhdGNoX3ZpZGVvczogQm9vbGVhbihpc1ZpZGVvKSxcbiAgICAgICAgICAgIHByaXplOiB0aGlzLnByaXplRGF0YS5yZXdhcmQudmFsdWVcbiAgICAgICAgfSlcbiAgICAgICAgLy8gbGV0IHBsYXllckN1ckdvbGQgPSB1dGlsLnVzZXJEYXRhLmNvaW47XG4gICAgICAgIC8vIGxldCB0ZW1wID0gdGhpcy5UZW1wTm9kZUNvbnRyb2xsZXIuc2hvd0NvbXAocGxheWVyQ3VyR29sZCwgMiwgMik7XG5cbiAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LkFwcEJ1eVByb2R1Y3REaWFsb2csXG4gICAgICAgIC8vICAgICBwcm9wczoge1xuICAgICAgICAvLyAgICAgICAgIGRpYWxvZ19uYW1lMjogXCLph5HluIHovaznm5jojrflvpflpZblirHlvLnnqpdcIixcbiAgICAgICAgLy8gICAgICAgICBkaWFsb2dfZW50ZXI6IHRoaXMuaXNNYWluID8gXCLpppbpobXph5HluIHovaznm5hcIiA6IFwi6ZmQ5pe256S85YyF5pS25LiL6Lez6L2sXCIsXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuXG4gICAgY2xpY2tDbG9zZSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlICE9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVGFza191cGRhdGEpO1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIumHkeW4gei9rOebmOW8ueeql1wiLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuWFs+mXrVwiLFxuICAgICAgICAgICAgZGlhbG9nX2VudGVyOiB0aGlzLmlzTWFpbiA/IFwi6aaW6aG16YeR5biB6L2s55uYXCIgOiBcIumZkOaXtuekvOWMheaUtuS4i+i3s+i9rFwiLFxuICAgICAgICB9KVxuICAgICAgICAvLyBYTVNESy50cmFjayh7XG4gICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QuQXBwRGlhbG9nQ2xpY2ssXG4gICAgICAgIC8vICAgICBwcm9wczoge1xuICAgICAgICAvLyAgICAgICAgIGRpYWxvZ19uYW1lMjogXCLph5HluIHovaznm5jlvLnnqpdcIixcbiAgICAgICAgLy8gICAgICAgICBja19tb2R1bGU6IFwi5YWz6ZetXCIsXG4gICAgICAgIC8vICAgICAgICAgZGlhbG9nX2VudGVyOiB0aGlzLmlzTWFpbiA/IFwi6aaW6aG16YeR5biB6L2s55uYXCIgOiBcIumZkOaXtuekvOWMheaUtuS4i+i3s+i9rFwiLFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvKirmj5DnjrAgKi9cbiAgICB3YWxsZXRCdG4oKSB7XG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIui9rOebmFwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLmj5DnjrBcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcbiAgICAgICAgfSlcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVXYWxsZXQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5pu05paw6L+b5bqmaXRlbVxuICAgICAqL1xuICAgIHVwZGF0ZUl0ZW0oKSB7XG4gICAgICAgIGlmICghdGhpcy50dXJudGFibGVQcm9ncmVzcykgcmV0dXJuO1xuICAgICAgICAvL+eOqeS6huWHoOasoVxuICAgICAgICBsZXQgcGxheVRpbWU6IG51bWJlciA9IHRoaXMudHVybnRhYmxlUHJvZ3Jlc3MuY3VycmVudCB8fCAwO1xuICAgICAgICBsZXQgbm93U3RhdGU6IG51bWJlciA9IDA7Ly/lvZPliY3ov5vluqZcbiAgICAgICAgaWYgKHBsYXlUaW1lIDwgMykge1xuICAgICAgICAgICAgbm93U3RhdGUgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYXlUaW1lID49IDMgJiYgcGxheVRpbWUgPCA2KSB7XG4gICAgICAgICAgICBub3dTdGF0ZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub3dTdGF0ZSA9IDI7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIGxldCBpdGVtID0gdGhpcy50dXJudGFibGVQcm9ncmVzcy5yZXdhcmREZXRhaWxEdG9MaXN0W25vd1N0YXRlXTtcbiAgICAgICAgdGhpcy5sYWJsZV9yZW1haW5OdW0uc3RyaW5nID0gXCLnrKxcIiArIDEwICsgXCLmrKFcIjtcbiAgICAgICAgdGhpcy5Qcm9ncmVzcy5wcm9ncmVzcyA9IHBsYXlUaW1lIC8gMTA7XG5cbiAgICAgICAgdGhpcy50dXJudGFibGVQcm9ncmVzcy5yZXdhcmREZXRhaWxEdG9MaXN0LmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlLnN0YXR1cyA9PSAwICYmIHBsYXlUaW1lID49IHZhbHVlLm5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJdGVtU3RhdGUoaW5kZXgsIHZhbHVlLnN0YXR1cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmihuWPlumHkeW4geWlluWKsVxuICAgICAqL1xuICAgIGdldENvaW5CdG4oZSwgbnVtKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBpZiAoIXRoaXMudHVybnRhYmxlUHJvZ3Jlc3MpIHJldHVybjtcbiAgICAgICAgbnVtID0gTnVtYmVyKG51bSk7XG4gICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMudHVybnRhYmxlUHJvZ3Jlc3MucmV3YXJkRGV0YWlsRHRvTGlzdFtudW1dO1xuICAgICAgICBpZiAoaXRlbURhdGEuc3RhdHVzICE9PSAxKSB7IHJldHVybjsgfVxuICAgICAgICB1dGlsLnBvc3Qoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nb2xkV2hlZWxfcmVjZWl2ZSxcbiAgICAgICAgICAgIGRhdGE6IHsgbm9kZTogaXRlbURhdGEubm9kZSB9LFxuICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLnN0YXR1cyA9IDI7Ly/lj5jmiJDlt7Lnu4/nirbmgIFcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUl0ZW1TdGF0ZShudW0sIDIpO1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLojrflj5ZcIiArIGl0ZW1EYXRhLnJld2FyZCArIFwi57qi5YyF5biBXCIpO1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiBlLnRhcmdldCwgdmFsdWU6IGl0ZW1EYXRhLnJld2FyZCwgbnVtOiAxMCwgcGFyZW50OiB0aGlzLm5vZGUuZ2V0UGFyZW50KCkgfSk7XG5cbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLlpKfovaznm5jlvLnnqpdcIixcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuesrFwiICsgKG51bSArIDEpICsgXCLmoaPov5vluqblpZblirFcIixcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6aKG5Y+W5aSx6LSl77yBXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS/ruaUueeKtuaAgVxuICAgICAqIEBwYXJhbSBpbmRleCAvL+esrOWHoOS4qlxuICAgICAqIEBwYXJhbSBudW0gLy8w5pyq6aKGIC8vMeWPr+mihiAyLy/lt7LpooZcbiAgICAgKi9cbiAgICBjaGFuZ2VJdGVtU3RhdGUoaW5kZXg6IG51bWJlciwgbnVtOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHBhcmVudDogY2MuTm9kZSA9IHRoaXMuY29pbkl0ZW1BcnJbaW5kZXhdO1xuICAgICAgICBsZXQgZGF0YTogYW55ID0gdGhpcy50dXJudGFibGVQcm9ncmVzcy5yZXdhcmREZXRhaWxEdG9MaXN0W2luZGV4XTtcbiAgICAgICAgbGV0IGxpZ2h0OiBjYy5Ob2RlID0gcGFyZW50LmNoaWxkcmVuWzBdO1xuICAgICAgICBsZXQgbGFiZWw6IGNjLkxhYmVsID0gcGFyZW50LmNoaWxkcmVuW2luZGV4ID09IDIgPyAzIDogMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgLy/mnIDlkI7kuIDkuKrnmoTlrZfkvZNcbiAgICAgICAgbGV0IGxhYmVsMjogY2MuTm9kZSA9IG51bGw7XG4gICAgICAgIGlmIChpbmRleCA9PSAyKSB7XG4gICAgICAgICAgICBsYWJlbDIgPSBwYXJlbnQuY2hpbGRyZW5bMl07XG4gICAgICAgICAgICBsYWJlbDIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGlnaHQuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgc3dpdGNoIChudW0pIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIitcIiArIGRhdGEucmV3YXJkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGxpZ2h0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gXCIrXCIgKyBkYXRhLnJld2FyZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gXCLlt7LpooZcIjtcbiAgICAgICAgICAgICAgICBwYXJlbnQub3BhY2l0eSA9IDIwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qC85byP5YyW5LiA5LiL5pWw5o2uXG4gICAgICovXG4gICAgZm9ybWF0RGF0YShkYXRhKSB7XG5cbiAgICAgICAgdGhpcy50dXJudGFibGVQcm9ncmVzcyA9IGRhdGE7XG4gICAgICAgIGxldCB0aW1lOiBudW1iZXIgPSBkYXRhLmN1cnJlbnQ7IC8v546p55qE5qyh5pWwXG4gICAgICAgIHRoaXMudHVybnRhYmxlUHJvZ3Jlc3MucmV3YXJkRGV0YWlsRHRvTGlzdC5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5zdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5ub2RlIDw9IHRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOajgOafpeaYr+WQpui2hei/hzExXG4gICAgICovXG5cbiAgICBjaGVja0ZpbGwoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5ruh5LqGMTDmrKFcIik7XG4gICAgICAgIGxldCBjb2luOiBudW1iZXIgPSAwOy8v5aSa5bCR6YeR5biBXG4gICAgICAgIHRoaXMudHVybnRhYmxlUHJvZ3Jlc3MucmV3YXJkRGV0YWlsRHRvTGlzdC5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5zdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgICAgIGNvaW4gKz0gdmFsdWUucmV3YXJkO1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLmNvaW5JdGVtQXJyW2luZGV4XSwgdmFsdWU6IHZhbHVlLnJld2FyZCwgbnVtOiAxMCwgcGFyZW50OiB0aGlzLm5vZGUuZ2V0UGFyZW50KCkgfSk7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5aSn6L2s55uY5by556qXXCIsXG4gICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLnrKxcIiArIChpbmRleCArIDEpICsgXCLmoaPov5vluqblpZblirFcIixcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50dXJudGFibGVQcm9ncmVzcyA9IG51bGw7XG4gICAgICAgIGlmIChjb2luID4gMCkge1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuiOt+WPllwiICsgY29pbiArIFwi57qi5YyF5biBXCIpO1xuICAgICAgICB9XG5cbiAgICB9XG59Il19