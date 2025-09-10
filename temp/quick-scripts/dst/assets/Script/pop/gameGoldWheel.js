
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHb2xkV2hlZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBQ2pELDJDQUFxQztBQUNyQyxxREFBZ0Q7QUFDaEQsK0NBQThDO0FBQzlDLHFDQUFnQztBQUNoQyxzRUFBaUU7QUFDakUsbURBQWtEO0FBQ2xELDJDQUE4QztBQUM5Qyx5Q0FBb0M7QUFDcEMsNkRBQXVEO0FBQ3ZELG1FQUE4RDtBQUM5RCxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLDZEQUF3RDtBQUN4RCxpREFBZ0Q7QUFHaEQsZUFBZTtBQUNULElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLElBQU0sWUFBWSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtB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eEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztrREFDYztJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUMwQjtJQUc1QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNnQjtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNnQjtJQWhEakIsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQTJxQmpDO0lBQUQsb0JBQUM7Q0EzcUJELEFBMnFCQyxDQTNxQjBDLGdCQUFNLEdBMnFCaEQ7a0JBM3FCb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiXG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgZ2FtZUdvbGRXaGVlbFJld2FyZCBmcm9tIFwiLi9nYW1lR29sZFdoZWVsUmV3YXJkXCJcbmltcG9ydCBSZXdhcmRDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sZWxyL1Jld2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBSZWRDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sZWxyL1JlZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5cblxuLy8jcmVnaW9uIOaKveWlliDovaznm5hcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBkZWZhdWx0X2RhdGEgPSB7IFwiY29kZVwiOiAwLCBcIm1lc3NhZ2VcIjogXCJzdWNjZXNzXCIsIFwiZGF0YVwiOiB7IFwidGltZXNcIjogMjAsIFwic3RhdGVcIjogMiwgXCJyZXdhcmRMaXN0XCI6IFt7IFwiaWRcIjogXCIxMDFcIiwgXCJ2YWx1ZVwiOiAxMDAwLCBcInR5cGVcIjogMiB9LCB7IFwiaWRcIjogXCIxMDVcIiwgXCJ2YWx1ZVwiOiA1LCBcInR5cGVcIjogMSB9LCB7IFwiaWRcIjogXCIxMDJcIiwgXCJ2YWx1ZVwiOiA1MDAsIFwidHlwZVwiOiAyIH0sIHsgXCJpZFwiOiBcIjEwNlwiLCBcInZhbHVlXCI6IDEwLCBcInR5cGVcIjogMSB9LCB7IFwiaWRcIjogXCIxMDNcIiwgXCJ2YWx1ZVwiOiAzMDAsIFwidHlwZVwiOiAyIH0sIHsgXCJpZFwiOiBcIjEwN1wiLCBcInZhbHVlXCI6IDE1LCBcInR5cGVcIjogMSB9LCB7IFwiaWRcIjogXCIxMDRcIiwgXCJ2YWx1ZVwiOiAxMDAsIFwidHlwZVwiOiAyIH0sIHsgXCJpZFwiOiBcIjEwOFwiLCBcInZhbHVlXCI6IDIwLCBcInR5cGVcIjogMSB9XSB9IH1cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lR29sZFdoZWVsIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eShjYy5XaWRnZXQpXG4gICAgcHJpdmF0ZSB3YWxsZXRCdG5XaWRnZXQ6IGNjLldpZGdldCA9IG51bGw7IC8v5o+Q546w5oyJ6ZKuXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBjb2luTGFiZWw6IGNjLkxhYmVsID0gbnVsbDsgLy/ph5HluIFcblxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBwcml2YXRlIFByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7IC8v6L+b5bqmXG5cbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxuICAgIHByaXZhdGUgY29pbkl0ZW1BcnI6IGNjLk5vZGVbXSA9IFtdOyAvL+mHkeW4geWlluWKsVxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSB3aGVlbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIHdoZWVsX3Jld2FyZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGJ0bl9jbGlja0dldDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGJ0bl9jbGlja1ZpZGVvR2V0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgYnRuX2NsaWNrR3JheUdldDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGJ0bkNsb3NlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJsZV9yZW1haW5OdW06IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBwcml2YXRlIGltZ19nb2xkOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgcHJpdmF0ZSBpbWdfcmVkOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGdhbWVHb2xkV2hlZWxSZXdhcmQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSB0aW1lTm9kZTE6IGNjLk5vZGUgPSBudWxsOyAvL+WJqeS9measoeaVsFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSB0aW1lTm9kZTI6IGNjLk5vZGUgPSBudWxsOyAvL+WujOS6huWHoOasoVxuXG4gICAgcHJpdmF0ZSB3aGVlbFN0YXRlOy8v6L2s55uY5b2T5YmN6Zi25q61XG4gICAgcHJpdmF0ZSBjdXJTcGVlZDsgIC8v5b2T5YmN6YCf5bqmXG4gICAgcHJpdmF0ZSBzcGluVGltZTsvL+WHj+mAn+WJjeaXi+i9rOaXtumXtFxuICAgIHByaXZhdGUgZ2Vhck51bTsvL+m9v+i9ruaVsOmHj1xuICAgIHByaXZhdGUgZGVmYXVsdEFuZ2xlOy8v5L+u5q2j6buY6K6k6KeS5bqmXG4gICAgcHJpdmF0ZSBnZWFyQW5nbGU7Ly/mr4/kuKrpvb/ova7nmoTop5LluqZcbiAgICBwcml2YXRlIGZpbmFsQW5nbGU7Ly/mnIDnu4jnu5PmnpzmjIflrprnmoTop5LluqZcbiAgICBwcml2YXRlIG1heFNwZWVkOy8v5pyA5aSn6YCf5bqmXG4gICAgcHJpdmF0ZSBkdXJhdGlvbjsvL+WHj+mAn+WJjeaXi+i9rOaXtumXtFxuICAgIHByaXZhdGUgYWNjOy8v5Yqg6YCf5bqmXG4gICAgcHJpdmF0ZSBkZWNBbmdsZTsvL+WHj+mAn+WJjei9rOWKqOinkuW6plxuICAgIHByaXZhdGUgZW5kQ2FsbEJhY2s7Ly/ovazlrozop6blj5Hlm57osINcbiAgICBwcml2YXRlIHRhcmdldElkOy8v6L2s5Yqo5Yiw55uu5qCH5YC8XG4gICAgcHJpdmF0ZSB3aGVlbEl0ZW1zOiBhbnk7XG4gICAgcHJpdmF0ZSBpc0NhbkNsaWNrV2hlZWw6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBpc0NsaWNrR2V0UHJpemU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBpc01haW46IGFueTtcbiAgICBwcml2YXRlIGNsb3NlQ2FsbDogYW55O1xuICAgIHByaXZhdGUgZ29kV2hlZWxEYXRhOiBhbnk7XG4gICAgcHJpdmF0ZSBsYWJsZV9wcml6ZU51bTogYW55O1xuICAgIHByaXZhdGUgcHJpemVEYXRhOiBhbnk7XG4gICAgcHJpdmF0ZSBwbGF5ZXJDdXJHb2xkOiBhbnk7XG4gICAgcHJpdmF0ZSBzaG93SW1nR29sZDogYW55O1xuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy/ov5vluqZcbiAgICBwcml2YXRlIGRhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhbHVlOiAzLCAvL+asoeaVsFxuICAgICAgICAgICAgbnVtOiAxMDAwLCAvL+WlluWKsVxuICAgICAgICAgICAgc3RhdHVzOiAwLCAvLzDmnKrpooYgLy8x5Y+v6aKGIDIvL+W3sumihlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB2YWx1ZTogNixcbiAgICAgICAgICAgIG51bTogNjAwMCxcbiAgICAgICAgICAgIHN0YXR1czogMCwgLy8w5pyq6aKGIC8vMeWPr+mihiAyLy/lt7LpooZcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgICAgICAgbnVtOiAxMDAwMCxcbiAgICAgICAgICAgIHN0YXR1czogMCwgLy8w5pyq6aKGIC8vMeWPr+mihiAyLy/lt7LpooZcbiAgICAgICAgfSxcbiAgICBdXG5cbiAgICAvL+eUqOaIt+i/m+W6plxuICAgIHByaXZhdGUgdHVybnRhYmxlUHJvZ3Jlc3M6IGFueSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMud2hlZWxJdGVtcyA9IHt9XG4gICAgICAgIC8vIHRoaXMuVGVtcE5vZGVDb250cm9sbGVyID0gR2xvYmFsLlRlbXBOb2RlLmdldENvbXBvbmVudCgnVGVtcE5vZGVDb250cm9sbGVyJylcbiAgICAgICAgLy8gdGhpcy5UZW1wTm9kZUNvbnRyb2xsZXIuc2hvd05vZGUoKTtcblxuICAgICAgICB0aGlzLmlzQ2FuQ2xpY2tXaGVlbCA9IHRydWU7XG5cblxuICAgICAgICAvL+aVsOaNruabtOaWsFxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1ZpZXdfVXNlckRhdGFVcGRhdGEsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMgPT0gdXBkYXRlVHlwZS5jb2luKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gdXRpbC51c2VyRGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW5MYWJlbC5zdHJpbmcgPSBTdHJpbmcodXNlckRhdGEuY29pbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhLCB1cGRhdGVUeXBlLmNvaW4pO1xuXG4gICAgICAgIC8vIHRoaXMud2FsbGV0QnRuV2lkZ2V0LnRvcCArPSBOdW1iZXIodXRpbC5pcGhvbmVYVG9wKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi53aGVlbFN0YXRlID0gMDtcbiAgICAgICAgc2VsZi5jdXJTcGVlZCA9IDA7XG4gICAgICAgIHNlbGYuc3BpblRpbWUgPSAwOy8v5YeP6YCf5YmN5peL6L2s5pe26Ze0XG4gICAgICAgIHNlbGYuZ2Vhck51bSA9IDg7XG4gICAgICAgIHNlbGYuZGVmYXVsdEFuZ2xlID0gMDsvL+S/ruato+m7mOiupOinkuW6plxuICAgICAgICBzZWxmLmdlYXJBbmdsZSA9IDM2MCAvIHNlbGYuZ2Vhck51bTsvL+avj+S4qum9v+i9rueahOinkuW6plxuICAgICAgICBzZWxmLndoZWVsLmFuZ2xlID0gc2VsZi5kZWZhdWx0QW5nbGU7XG4gICAgICAgIHNlbGYuZmluYWxBbmdsZSA9IDA7Ly/mnIDnu4jnu5PmnpzmjIflrprnmoTop5LluqZcbiAgICAgICAgc2VsZi5tYXhTcGVlZCA9IDE1LFxuICAgICAgICAgICAgc2VsZi5kdXJhdGlvbiA9IDEuNTsvL+WHj+mAn+WJjeaXi+i9rOaXtumXtFxuICAgICAgICBzZWxmLmFjYyA9IDAuNjsvL+WKoOmAn+W6plxuICAgICAgICBzZWxmLmdhbWVHb2xkV2hlZWxSZXdhcmQuYWN0aXZlID0gZmFsc2VcblxuICAgICAgICBsZXQgcmV3YXJkX2xpc3QgPSB0aGlzLndoZWVsX3Jld2FyZC5jaGlsZHJlblxuICAgICAgICBpZiAocmV3YXJkX2xpc3QubGVuZ3RoIDwgOCkge1xuICAgICAgICAgICAgZm9yIChsZXQgbSA9IHJld2FyZF9saXN0Lmxlbmd0aDsgbSA8IDg7IG0rKykge1xuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocmV3YXJkX2xpc3RbMF0pXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLndoZWVsX3Jld2FyZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV3YXJkX2xpc3QgPSB0aGlzLndoZWVsX3Jld2FyZC5jaGlsZHJlblxuICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCByZXdhcmRfbGlzdC5sZW5ndGg7IG0rKykge1xuICAgICAgICAgICAgICAgIHJld2FyZF9saXN0W21dLmFuZ2xlID0gLTM2MCAvIDggKiBtXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnVwZGF0ZURhdGEyKGRlZmF1bHRfZGF0YS5kYXRhKS8v562W5YiS5by654OI6KaB5rGC6KaB6buY6K6k5pWw5o2u77yM5LiN6IO95pyJ5pWw5o2u5YiH5o2i5pWI5p6cXG5cbiAgICAgICAgc2VsZi5pc0NsaWNrR2V0UHJpemUgPSB0cnVlO1xuICAgICAgICBzZWxmLnVwZGF0ZURhdGEoKTtcblxuICAgICAgICBzZWxmLmlzQ2FuQ2xpY2tXaGVlbCA9IHRydWU7XG5cbiAgICAgICAgc2VsZi5idG5DbG9zZU5vZGUgJiYgKHNlbGYuYnRuQ2xvc2VOb2RlLmFjdGl2ZSA9IGZhbHNlKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmJ0bkNsb3NlTm9kZSAmJiAoc2VsZi5idG5DbG9zZU5vZGUuYWN0aXZlID0gdHJ1ZSk7XG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICAvLyBpZiAodGhpcy5UZW1wTm9kZUNvbnRyb2xsZXIpIHRoaXMuVGVtcE5vZGVDb250cm9sbGVyLmhpZGVOb2RlKClcbiAgICAgICAgLy8gQ2xpZW50RXZlbnQuZGlzcGF0Y2goXCJnb2xkV2hlZWxfZG90X3VwZGF0ZVwiLCBMb2NhbERhdGEucXVlcnkoRGF0YUl0ZW0uZ29sZFdoZWVsQ291bnQpIDwgMjApO1xuICAgICAgICB0aGlzLmNsb3NlQ2FsbCAmJiB0aGlzLmNsb3NlQ2FsbCgpXG4gICAgICAgIHRoaXMuY2xvc2VDYWxsID0gbnVsbFxuICAgIH1cblxuXG4gICAgc2V0Q2xvc2VDYWxsKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2xvc2VDYWxsID0gY2FsbGJhY2tcbiAgICB9XG5cbiAgICBzdGFydFdoZWVsKHRhcmdldElkLCBlbmRDYWxsQmFjaykge1xuICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlY0FuZ2xlID0gMzYwOyAgLy8g5YeP6YCf5peL6L2s5Lik5ZyIXG4gICAgICAgIHRoaXMud2hlZWxTdGF0ZSA9IDE7XG4gICAgICAgIHRoaXMuY3VyU3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnNwaW5UaW1lID0gMDtcbiAgICAgICAgdGhpcy5lbmRDYWxsQmFjayA9IGVuZENhbGxCYWNrO1xuICAgICAgICB0aGlzLnRhcmdldElkID0gdGFyZ2V0SWRcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5TXVzaWMoTmFtZVRzLkdvbGRfV2hlZWwpXG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLndoZWVsU3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndoZWVsU3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5zcGluVGltZSArPSBkdDtcbiAgICAgICAgICAgIHRoaXMud2hlZWwuYW5nbGUgPSB0aGlzLndoZWVsLmFuZ2xlIC0gdGhpcy5jdXJTcGVlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1clNwZWVkIDw9IHRoaXMubWF4U3BlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1clNwZWVkICs9IHRoaXMuYWNjO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGluVGltZSA8IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZpbmFsQW5nbGUgPSB0aGlzLnRhcmdldElkICogdGhpcy5nZWFyQW5nbGUgKyB0aGlzLmRlZmF1bHRBbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1heFNwZWVkID0gdGhpcy5jdXJTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsLmFuZ2xlID0gdGhpcy5maW5hbEFuZ2xlO1xuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxTdGF0ZSA9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy53aGVlbFN0YXRlID09IDIpIHtcbiAgICAgICAgICAgIHZhciBjdXJSbyA9IHRoaXMud2hlZWwuYW5nbGU7XG4gICAgICAgICAgICB2YXIgaGFkUm8gPSAtKGN1clJvIC0gdGhpcy5maW5hbEFuZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuY3VyU3BlZWQgPSB0aGlzLm1heFNwZWVkICogKCh0aGlzLmRlY0FuZ2xlIC0gaGFkUm8pIC8gdGhpcy5kZWNBbmdsZSkgKyAwLjI7XG4gICAgICAgICAgICB0aGlzLndoZWVsLmFuZ2xlID0gY3VyUm8gLSB0aGlzLmN1clNwZWVkO1xuXG4gICAgICAgICAgICBpZiAoKHRoaXMuZGVjQW5nbGUgLSBoYWRSbykgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxTdGF0ZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbC5hbmdsZSA9IHRoaXMuZmluYWxBbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZENhbGxCYWNrKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInRoaXM6XCIsIHRoaXMudGFyZ2V0SWQsIHRoaXMuZ2VhckFuZ2xlLCB0aGlzLnByaXplRGF0YSlcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vJy94eGwtYWNjb3VudC9hcGkvdHVybnRhYmxlL2luZGV4J1xuICAgIHVwZGF0ZURhdGEoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gbGV0IGRhdGEgPSB7XG4gICAgICAgIC8vICAgICByZXdhcmRMaXN0OltcbiAgICAgICAgLy8gICAgICAgICB7aWQ6MTExMSx0eXBlOjEsdmFsdWU6MTAwMH0sXG4gICAgICAgIC8vICAgICAgICAge2lkOjIyMjIsdHlwZToyLHZhbHVlOjV9LFxuICAgICAgICAvLyAgICAgICAgIHtpZDozMzMzLHR5cGU6MSx2YWx1ZToyMDAwfSxcbiAgICAgICAgLy8gICAgICAgICB7aWQ6NDQ0NCx0eXBlOjIsdmFsdWU6Nn0sXG4gICAgICAgIC8vICAgICAgICAge2lkOjU1NTUsdHlwZToxLHZhbHVlOjUwMDB9LFxuICAgICAgICAvLyAgICAgICAgIHtpZDo2NjY2LHR5cGU6Mix2YWx1ZTo3fSxcbiAgICAgICAgLy8gICAgICAgICB7aWQ6Nzc3Nyx0eXBlOjEsdmFsdWU6NzAwMH0sXG4gICAgICAgIC8vICAgICAgICAge2lkOjc3NzcsdHlwZToyLHZhbHVlOjEwfSxcbiAgICAgICAgLy8gICAgIF0sXG4gICAgICAgIC8vICAgICBzdGF0ZToxLFxuICAgICAgICAvLyAgICAgdGltZXM6MTBcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBzZWxmLnVwZGF0ZURhdGEyKGRhdGEpXG4gICAgICAgIC8vIHJldHVyblxuXG4gICAgICAgIGlmIChzZWxmLnR1cm50YWJsZVByb2dyZXNzICYmIHNlbGYudHVybnRhYmxlUHJvZ3Jlc3MuY3VycmVudCAmJiBzZWxmLnR1cm50YWJsZVByb2dyZXNzLmN1cnJlbnQgKyAxID4gMTApIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaWxsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ29sZFdoZWVsX2luZGV4LFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZm9ybWF0RGF0YShkYXRhLnVzZXJUdXJudGFibGVTdGFnZVJld2FyZCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlRGF0YTIoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmdvZFdoZWVsRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVEYXRhMihzZWxmLmdvZFdoZWVsRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KCfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5nb2RXaGVlbERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVEYXRhMihzZWxmLmdvZFdoZWVsRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZURhdGEyKGRhdGEpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG5cblxuICAgICAgICBzZWxmLmdvZFdoZWVsRGF0YSA9IGRhdGE7XG4gICAgICAgIFJlZENvbnRyb2xsZXIud2hlZWxDb3VudCA9IGRhdGEudGltZXM7XG5cbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDEuMiksIGNjLnNjYWxlVG8oMC41LCAxKSkpO1xuICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHNlbGYuYnRuX2NsaWNrR2V0LnN0b3BBbGxBY3Rpb25zKCk7XG5cbiAgICAgICAgLy8gaWYgKGRhdGEudGltZXMgPD0gMCkge1xuICAgICAgICAvLyAgICAgc2VsZi5sYWJsZV9yZW1haW5OdW0uc3RyaW5nID0gYOS7iuaXpeWJqeS9mTDmrKHmnLrkvJos6K+35piO5pel5YaN5p2lYDtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICAgIHNlbGYubGFibGVfcmVtYWluTnVtLnN0cmluZyA9IGDov5jliakke2RhdGEudGltZXN95qyh5oq95aWW5py65LyaYDtcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgdGhpcy50aW1lTm9kZTEuYWN0aXZlID0gZGF0YS50aW1lcyA8PSAwO1xuICAgICAgICB0aGlzLnRpbWVOb2RlMi5hY3RpdmUgPSBkYXRhLnRpbWVzID4gMDtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtKCk7XG5cbiAgICAgICAgdXRpbC5zZXRUZW1wUGFybShcImdvbGRXaGVlbFJlbWFpbk51bVwiLCBkYXRhLnRpbWVzKVxuXG4gICAgICAgIC8vIHNlbGYuYnRuX2NsaWNrR2V0LmFjdGl2ZSA9c2VsZi5idG5fY2xpY2tWaWRlb0dldC5hY3RpdmUgPSBzZWxmLmJ0bl9jbGlja0dyYXlHZXQuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGRhdGEuc3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHZXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrVmlkZW9HZXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0dyYXlHZXQuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrR2V0LnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGEuc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tHZXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvR2V0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0dyYXlHZXQuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrVmlkZW9HZXQucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YS5zdGF0ZSA9PSAzKSB7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0dldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrVmlkZW9HZXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0dyYXlHZXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpdGVtRGF0YSA9IHNlbGYud2hlZWxfcmV3YXJkLmNoaWxkcmVuO1xuICAgICAgICBzZWxmLndoZWVsSXRlbXMgPSB7fTtcblxuICAgICAgICBsZXQgZXhjaGFuZ2VSYXRlID0gdXRpbC51c2VyRGF0YS5leGNoYW5nZVJhdGUgfHwgMTAwMDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHByaXplID0gaXRlbURhdGFbaV07XG4gICAgICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSBkYXRhLnJld2FyZExpc3RbaV0udHlwZSA9PSAxID8gUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUG9pbnRTcHJpdGUoMikgOiBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlLmZpbmRQb2ludFNwcml0ZSgxKVxuICAgICAgICAgICAgaWYgKGRhdGEucmV3YXJkTGlzdFtpXS52YWx1ZSA8IDEwMDAgfHwgZGF0YS5yZXdhcmRMaXN0W2ldLnR5cGUgPT0gdXBkYXRlVHlwZS5wcm9kdWN0KSB7XG4gICAgICAgICAgICAgICAgcHJpemUuZ2V0Q2hpbGRCeU5hbWUoXCJHb2RXaGVlbF9nb2xkXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWVcbiAgICAgICAgICAgICAgICBwcml6ZS5nZXRDaGlsZEJ5TmFtZShcImdvbGROdW1cIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgJHtkYXRhLnJld2FyZExpc3RbaV0udmFsdWV9YDtcbiAgICAgICAgICAgICAgICBzZWxmLndoZWVsSXRlbXNbYCR7ZGF0YS5yZXdhcmRMaXN0W2ldLmlkfWBdID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByaXplLmdldENoaWxkQnlOYW1lKFwiR29kV2hlZWxfZ29sZFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lXG4gICAgICAgICAgICAgICAgaWYgKGV4Y2hhbmdlUmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBwcml6ZS5nZXRDaGlsZEJ5TmFtZShcImdvbGROdW1cIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgJHsoZGF0YS5yZXdhcmRMaXN0W2ldLnZhbHVlIC8gZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDEpfTxzaXplID0gMjY+5YWDPC9zaXplPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcml6ZS5nZXRDaGlsZEJ5TmFtZShcImdvbGROdW1cIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgJHsoZGF0YS5yZXdhcmRMaXN0W2ldLnZhbHVlIC8gMTAwMDApLnRvRml4ZWQoMSl9PHNpemUgPSAyNj7lhYM8L3NpemU+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi53aGVlbEl0ZW1zW2Ake2RhdGEucmV3YXJkTGlzdFtpXS5pZH1gXSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja1dhdGVyKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLmJ0bl9jbGlja0dldC5hY3RpdmUpIHtcbiAgICAgICAgICAgIHNlbGYuY2xpY2tCdG5XaGVlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGYuYnRuX2NsaWNrVmlkZW9HZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICBzZWxmLmNsaWNrV2hlZWxWaWRlbygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGYuYnRuX2NsaWNrR3JheUdldC5hY3RpdmUpIHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tXaGVlbChpc1ZpZGVvID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG5cblxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJc0NhbkNsaWNrV2hlZWwoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuaXNDYW5DbGlja1doZWVsKSB7XG4gICAgICAgICAgICBzZWxmLmlzQ2FuQ2xpY2tXaGVlbCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmdvbGRXaGVlbF9hY3Rpb24sXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QuY29pbl93aGVlbHNfZHJhdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkcmF3X2NvdW50OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkcmF3X3R5cGU6IGlzVmlkZW8gPyBcIuinhumikeaKveWlllwiIDogXCLmma7pgJrmir3lpZZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXMuZGF0YS5yZXdhcmQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWQ6IFwiMTA2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdHlwZTogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB2YWx1ZTogMTBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5yZXdhcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiB0aGlzLndoZWVsSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaXplRGF0YSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcml6ZUlkID0gdGhpcy53aGVlbEl0ZW1zW2Ake2RhdGEuaWR9YF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4reWlluaYr+WTquS4qu+8mlwiLCBwcml6ZUlkLCBkYXRhLCB0aGlzLndoZWVsSXRlbXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFdoZWVsKHByaXplSWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuR2V0Vmlld05vZGUobnVsbCwgaXNWaWRlbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdvZFdoZWVsRGF0YS50aW1lcyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmdvZFdoZWVsRGF0YS50aW1lcyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ29kV2hlZWxEYXRhLnRpbWVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGRhdGEudGltZXMgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzZWxmLmxhYmxlX3JlbWFpbk51bS5zdHJpbmcgPSBg5LuK5pel5Ymp5L2ZMOasoeacuuS8mizor7fmmI7ml6Xlho3mnaVgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc2VsZi5sYWJsZV9yZW1haW5OdW0uc3RyaW5nID0gYOi/mOWJqSR7c2VsZi5nb2RXaGVlbERhdGEudGltZXN95qyh5oq95aWW5py65LyaYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnVwZGF0ZUl0ZW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzQ2FuQ2xpY2tXaGVlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZfn4nLCAyLjUsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0NhbkNsaWNrV2hlZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KCfnvZHnu5zlh7rplJl+fn4nLCAyLjUsIDEpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmlzQ2FuQ2xpY2tXaGVlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrQnRuV2hlZWwoKSB7XG4gICAgICAgIHRoaXMuY2xpY2tXaGVlbCgpO1xuICAgIH1cblxuICAgIGNsaWNrV2hlZWxWaWRlbygpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJc0NhbkNsaWNrV2hlZWwoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuaXNDYW5DbGlja1doZWVsKSB7XG4gICAgICAgICAgICBzZWxmLmlzQ2FuQ2xpY2tXaGVlbCA9IGZhbHNlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5pc0NhbkNsaWNrV2hlZWwgPSB0cnVlO1xuICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uR29sZFdoZWVsLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgWE1TREsudG9hc3QoXCLmhJ/osKLop4LnnIvvvIzpop3lpJblhY3otLnmir3lpZbmrKHmlbDlt7Llj5HmlL5cIiwgMS41KTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2FuQ2xpY2tXaGVlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja1doZWVsKHRydWUpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tJc0NhbkNsaWNrV2hlZWwoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlICE9IDAgfHwgKHRoaXMuZ2FtZUdvbGRXaGVlbFJld2FyZCAmJiB0aGlzLmdhbWVHb2xkV2hlZWxSZXdhcmQuYWN0aXZlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG9wZW5HZXRWaWV3Tm9kZShub2RlLCBpc1ZpZGVvOiBib29sZWFuKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24ucGxheU11c2ljKE5hbWVUcy5Hb2xhX1doZWVsX0dldClcbiAgICAgICAgdXRpbC51c2VyRGF0YS5nb2xkV2hlZWxDb3VudCsrO1xuICAgICAgICB0aGlzLmdhbWVHb2xkV2hlZWxSZXdhcmQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgbGV0IGdhbWVHb2xkV2hlZWxSZXdhcmRUczogZ2FtZUdvbGRXaGVlbFJld2FyZCA9IHRoaXMuZ2FtZUdvbGRXaGVlbFJld2FyZC5nZXRDb21wb25lbnQoZ2FtZUdvbGRXaGVlbFJld2FyZCk7XG4gICAgICAgIGlmIChnYW1lR29sZFdoZWVsUmV3YXJkVHMpIHtcblxuICAgICAgICAgICAgZ2FtZUdvbGRXaGVlbFJld2FyZFRzLmluaXQodGhpcy5wcml6ZURhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLph5HluIHovaznm5jojrflvpflpZblirHlvLnnqpdcIixcbiAgICAgICAgICAgIGRpYWxvZ19lbnRlcjogdGhpcy5pc01haW4gPyBcIummlumhtemHkeW4gei9rOebmFwiIDogXCLpmZDml7bnpLzljIXmlLbkuIvot7PovaxcIixcbiAgICAgICAgfSlcblxuICAgICAgICBUcmFja01nci5iaWdfdHVybnRhYmxlKHtcbiAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuaKveWlluaIkOWKn1wiLFxuICAgICAgICAgICAgbHVja3lfZHJhdzogdGhpcy5nb2RXaGVlbERhdGEudGltZXMsXG4gICAgICAgICAgICBsdWNreV9kcmF3X25vd2x5OiAxLFxuICAgICAgICAgICAgd2F0Y2hfdmlkZW9zOiBCb29sZWFuKGlzVmlkZW8pLFxuICAgICAgICAgICAgcHJpemU6IHRoaXMucHJpemVEYXRhLnJld2FyZC52YWx1ZVxuICAgICAgICB9KVxuICAgICAgICAvLyBsZXQgcGxheWVyQ3VyR29sZCA9IHV0aWwudXNlckRhdGEuY29pbjtcbiAgICAgICAgLy8gbGV0IHRlbXAgPSB0aGlzLlRlbXBOb2RlQ29udHJvbGxlci5zaG93Q29tcChwbGF5ZXJDdXJHb2xkLCAyLCAyKTtcblxuICAgICAgICAvLyBYTVNESy50cmFjayh7XG4gICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QuQXBwQnV5UHJvZHVjdERpYWxvZyxcbiAgICAgICAgLy8gICAgIHByb3BzOiB7XG4gICAgICAgIC8vICAgICAgICAgZGlhbG9nX25hbWUyOiBcIumHkeW4gei9rOebmOiOt+W+l+WlluWKseW8ueeql1wiLFxuICAgICAgICAvLyAgICAgICAgIGRpYWxvZ19lbnRlcjogdGhpcy5pc01haW4gPyBcIummlumhtemHkeW4gei9rOebmFwiIDogXCLpmZDml7bnpLzljIXmlLbkuIvot7PovaxcIixcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG5cbiAgICBjbGlja0Nsb3NlKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLndoZWVsU3RhdGUgIT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UYXNrX3VwZGF0YSk7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6YeR5biB6L2s55uY5by556qXXCIsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5YWz6ZetXCIsXG4gICAgICAgICAgICBkaWFsb2dfZW50ZXI6IHRoaXMuaXNNYWluID8gXCLpppbpobXph5HluIHovaznm5hcIiA6IFwi6ZmQ5pe256S85YyF5pS25LiL6Lez6L2sXCIsXG4gICAgICAgIH0pXG4gICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5BcHBEaWFsb2dDbGljayxcbiAgICAgICAgLy8gICAgIHByb3BzOiB7XG4gICAgICAgIC8vICAgICAgICAgZGlhbG9nX25hbWUyOiBcIumHkeW4gei9rOebmOW8ueeql1wiLFxuICAgICAgICAvLyAgICAgICAgIGNrX21vZHVsZTogXCLlhbPpl61cIixcbiAgICAgICAgLy8gICAgICAgICBkaWFsb2dfZW50ZXI6IHRoaXMuaXNNYWluID8gXCLpppbpobXph5HluIHovaznm5hcIiA6IFwi6ZmQ5pe256S85YyF5pS25LiL6Lez6L2sXCIsXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIC8qKuaPkOeOsCAqL1xuICAgIHdhbGxldEJ0bigpIHtcbiAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6L2s55uYXCIsXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBcIuaPkOeOsFwiLFxuICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiaWNvblwiLFxuICAgICAgICB9KVxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1BvcF9PcGVuLCBwYWdlVHMucGFnZU5hbWUuR2FtZVdhbGxldCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDov5vluqZpdGVtXG4gICAgICovXG4gICAgdXBkYXRlSXRlbSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnR1cm50YWJsZVByb2dyZXNzKSByZXR1cm47XG4gICAgICAgIC8v546p5LqG5Yeg5qyhXG4gICAgICAgIGxldCBwbGF5VGltZTogbnVtYmVyID0gdGhpcy50dXJudGFibGVQcm9ncmVzcy5jdXJyZW50IHx8IDA7XG4gICAgICAgIGxldCBub3dTdGF0ZTogbnVtYmVyID0gMDsvL+W9k+WJjei/m+W6plxuICAgICAgICBpZiAocGxheVRpbWUgPCAzKSB7XG4gICAgICAgICAgICBub3dTdGF0ZSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAocGxheVRpbWUgPj0gMyAmJiBwbGF5VGltZSA8IDYpIHtcbiAgICAgICAgICAgIG5vd1N0YXRlID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vd1N0YXRlID0gMjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gbGV0IGl0ZW0gPSB0aGlzLnR1cm50YWJsZVByb2dyZXNzLnJld2FyZERldGFpbER0b0xpc3Rbbm93U3RhdGVdO1xuICAgICAgICB0aGlzLmxhYmxlX3JlbWFpbk51bS5zdHJpbmcgPSBcIuesrFwiICsgMTAgKyBcIuasoVwiO1xuICAgICAgICB0aGlzLlByb2dyZXNzLnByb2dyZXNzID0gcGxheVRpbWUgLyAxMDtcblxuICAgICAgICB0aGlzLnR1cm50YWJsZVByb2dyZXNzLnJld2FyZERldGFpbER0b0xpc3QuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUuc3RhdHVzID09IDAgJiYgcGxheVRpbWUgPj0gdmFsdWUubm9kZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUl0ZW1TdGF0ZShpbmRleCwgdmFsdWUuc3RhdHVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aKG5Y+W6YeR5biB5aWW5YqxXG4gICAgICovXG4gICAgZ2V0Q29pbkJ0bihlLCBudW0pIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGlmICghdGhpcy50dXJudGFibGVQcm9ncmVzcykgcmV0dXJuO1xuICAgICAgICBudW0gPSBOdW1iZXIobnVtKTtcbiAgICAgICAgbGV0IGl0ZW1EYXRhID0gdGhpcy50dXJudGFibGVQcm9ncmVzcy5yZXdhcmREZXRhaWxEdG9MaXN0W251bV07XG4gICAgICAgIGlmIChpdGVtRGF0YS5zdGF0dXMgIT09IDEpIHsgcmV0dXJuOyB9XG4gICAgICAgIHV0aWwucG9zdCh7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmdvbGRXaGVlbF9yZWNlaXZlLFxuICAgICAgICAgICAgZGF0YTogeyBub2RlOiBpdGVtRGF0YS5ub2RlIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbURhdGEuc3RhdHVzID0gMjsvL+WPmOaIkOW3sue7j+eKtuaAgVxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSXRlbVN0YXRlKG51bSwgMik7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuiOt+WPllwiICsgaXRlbURhdGEucmV3YXJkICsgXCLnuqLljIXluIFcIik7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IGUudGFyZ2V0LCB2YWx1ZTogaXRlbURhdGEucmV3YXJkLCBudW06IDEwLCBwYXJlbnQ6IHRoaXMubm9kZS5nZXRQYXJlbnQoKSB9KTtcblxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWkp+i9rOebmOW8ueeql1wiLFxuICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi56ysXCIgKyAobnVtICsgMSkgKyBcIuaho+i/m+W6puWlluWKsVwiLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLpooblj5blpLHotKXvvIFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L+u5pS554q25oCBXG4gICAgICogQHBhcmFtIGluZGV4IC8v56ys5Yeg5LiqXG4gICAgICogQHBhcmFtIG51bSAvLzDmnKrpooYgLy8x5Y+v6aKGIDIvL+W3sumihlxuICAgICAqL1xuICAgIGNoYW5nZUl0ZW1TdGF0ZShpbmRleDogbnVtYmVyLCBudW06IG51bWJlcikge1xuICAgICAgICBsZXQgcGFyZW50OiBjYy5Ob2RlID0gdGhpcy5jb2luSXRlbUFycltpbmRleF07XG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSB0aGlzLnR1cm50YWJsZVByb2dyZXNzLnJld2FyZERldGFpbER0b0xpc3RbaW5kZXhdO1xuICAgICAgICBsZXQgbGlnaHQ6IGNjLk5vZGUgPSBwYXJlbnQuY2hpbGRyZW5bMF07XG4gICAgICAgIGxldCBsYWJlbDogY2MuTGFiZWwgPSBwYXJlbnQuY2hpbGRyZW5baW5kZXggPT0gMiA/IDMgOiAyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAvL+acgOWQjuS4gOS4queahOWtl+S9k1xuICAgICAgICBsZXQgbGFiZWwyOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgaWYgKGluZGV4ID09IDIpIHtcbiAgICAgICAgICAgIGxhYmVsMiA9IHBhcmVudC5jaGlsZHJlblsyXTtcbiAgICAgICAgICAgIGxhYmVsMi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsaWdodC5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBzd2l0Y2ggKG51bSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IFwiK1wiICsgZGF0YS5yZXdhcmQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbGlnaHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIitcIiArIGRhdGEucmV3YXJkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsMi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuW3sumihlwiO1xuICAgICAgICAgICAgICAgIHBhcmVudC5vcGFjaXR5ID0gMjAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLzlvI/ljJbkuIDkuIvmlbDmja5cbiAgICAgKi9cbiAgICBmb3JtYXREYXRhKGRhdGEpIHtcblxuICAgICAgICB0aGlzLnR1cm50YWJsZVByb2dyZXNzID0gZGF0YTtcbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IGRhdGEuY3VycmVudDsgLy/njqnnmoTmrKHmlbBcbiAgICAgICAgdGhpcy50dXJudGFibGVQcm9ncmVzcy5yZXdhcmREZXRhaWxEdG9MaXN0LmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlLnN0YXR1cyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLm5vZGUgPD0gdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5qOA5p+l5piv5ZCm6LaF6L+HMTFcbiAgICAgKi9cblxuICAgIGNoZWNrRmlsbCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCLmu6HkuoYxMOasoVwiKTtcbiAgICAgICAgbGV0IGNvaW46IG51bWJlciA9IDA7Ly/lpJrlsJHph5HluIFcbiAgICAgICAgdGhpcy50dXJudGFibGVQcm9ncmVzcy5yZXdhcmREZXRhaWxEdG9MaXN0LmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlLnN0YXR1cyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29pbiArPSB2YWx1ZS5yZXdhcmQ7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMuY29pbkl0ZW1BcnJbaW5kZXhdLCB2YWx1ZTogdmFsdWUucmV3YXJkLCBudW06IDEwLCBwYXJlbnQ6IHRoaXMubm9kZS5nZXRQYXJlbnQoKSB9KTtcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLlpKfovaznm5jlvLnnqpdcIixcbiAgICAgICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuesrFwiICsgKGluZGV4ICsgMSkgKyBcIuaho+i/m+W6puWlluWKsVwiLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnR1cm50YWJsZVByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgaWYgKGNvaW4gPiAwKSB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635Y+WXCIgKyBjb2luICsgXCLnuqLljIXluIFcIik7XG4gICAgICAgIH1cblxuICAgIH1cbn0iXX0=