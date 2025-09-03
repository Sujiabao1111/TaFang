"use strict";
cc._RF.push(module, '22b89Xb03ZFiYMKDLFgpcLc', 'game');
// Script/game/game.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var RedController_1 = require("../controlelr/RedController");
var GameEffect_1 = require("../effect/GameEffect");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var game = /** @class */ (function (_super) {
    __extends(game, _super);
    function game() {
        // @property(cc.Label)
        // customsLabel: cc.Label = null; //关卡label
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.crystal = null; //水晶
        _this.ske_hudun = null; //护盾
        _this.image_bg = null; //背景图
        _this.image_bgArray = []; //背景图集
        _this.onceOpenGame = true; //是否第一次开始游戏
        _this.onLinePrizeTimeNum = 0; //在线奖励倒计时时间
        return _this;
    }
    game.prototype.onLoad = function () {
        var _this = this;
        util_1.default.offlineTurretProduct();
        cc.game.on(NameTs_1.default.Game_End, function (res) {
            switch (res) {
                case faceTs_1.gamePass.success:
                    _this.showPass();
                    _this.checkBgImage();
                    break;
                case faceTs_1.gamePass.fail:
                    // this.showEnd();
                    _this.crystal.playAnimation("paota_boom", 1);
                    _this.scheduleOnce(function () {
                        _this.crystal.playAnimation("paota_piaofu", -1);
                        cc.game.emit(NameTs_1.default.Game_Again);
                        util_1.default.showEmptyBox(); //送一个空降宝箱
                    }, 1);
                    TrackMgr_1.default.AppGamedate({
                        is_challenge_suc: false,
                        game_level_hcdg: "第" + util_1.default.userData.customs.big + "关",
                        level_hcdg: "第" + util_1.default.userData.customs.small + "波",
                        game_time: util_1.default.gameTime.toFixed(1) + "s",
                        use_tool: String(util_1.default.gamePropNum),
                    });
                    break;
            }
        }, this);
        cc.game.on(NameTs_1.default.Game_Start, function () {
            if (!_this.onceOpenGame) { //不是第一次开始游戏才送
                util_1.default.showEmptyBox(); //送一个空降宝箱
            }
            _this.onceOpenGame = false;
            if (util_1.default.userData.customs.big == 2 && util_1.default.userData.customs.small == 2) {
                if (!util_1.default.isOkSign) {
                    _this.showSign();
                }
            }
            // if (util.userData.customs.small == util.mapConfig.length) {
            //     if (!util.adPreObj[AdPosition.GamePssView]) {
            //         util.preloadAd(AdPosition.GamePssView, true);
            //     }
            // }
            // util.levelState = gameState.start;
            //更新关卡title
            cc.game.emit(NameTs_1.default.Game_View_CustomsUpdata);
            //加载关卡怪兽
            cc.game.emit(NameTs_1.default.Game_Load_Monster);
            for (var i = 0; i < util_1.default.userData.prop.length; i++) {
                if (i == faceTs_1.propType.auto - 1)
                    continue;
                util_1.default.userData.prop[i].time = null;
                util_1.default.userData.prop[i].use = faceTs_1.propState.end;
                if (util_1.default.userData.prop[i].type == 3) {
                    _this.closeShield();
                }
            }
            util_1.default.Opening_times_level++;
            TrackMgr_1.default.level_open({
                number_of_levels: "第" + util_1.default.userData.customs.big + "关",
                level: "第" + util_1.default.userData.customs.small + "波",
                Opening_times: util_1.default.Opening_times_level,
            });
            XMSDK_1.default.trackUserProperties({
                level_num: util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small,
            });
        }, this);
        //监听弹窗
        cc.game.on(NameTs_1.default.Game_Pop_Open, function (res) {
            var name = res.name ? res.name : res;
            switch (name) {
                case pageTs_1.default.pageName.GameSet:
                    _this.showSet();
                    break;
                case pageTs_1.default.pageName.GameProp:
                    _this.showProp();
                    break;
                case pageTs_1.default.pageName.GameSign:
                    _this.showSign(res.data);
                    break;
                case pageTs_1.default.pageName.GameSignReward:
                    _this.showSignReward(res.data);
                    break;
                case pageTs_1.default.pageName.GameWallet:
                    _this.showWallet();
                    break;
                case pageTs_1.default.pageName.GameWalletRecord:
                    _this.showWalletRecord();
                    break;
                case pageTs_1.default.pageName.GameNetworkLost:
                    _this.showNetworkLost(res.data);
                    break;
                case pageTs_1.default.pageName.GameTuJian:
                    _this.showTuJian();
                    break;
                case pageTs_1.default.pageName.GameEarnings:
                    _this.showEarnings();
                    break;
                case pageTs_1.default.pageName.GameTask:
                    _this.showTask();
                    break;
                case pageTs_1.default.pageName.GameDetention:
                    _this.showDetention();
                    break;
                case pageTs_1.default.pageName.GameAdLoading:
                    _this.showAdLoading();
                    break;
                case pageTs_1.default.pageName.GameUpgrade:
                    var nowTime = new Date().getTime();
                    var time = Math.floor((nowTime - util_1.default.userData.unlocking_time) / 1000);
                    console.log(time, 'time');
                    TrackMgr_1.default.turret_unlock({
                        unlock_turret_level: util_1.default.userData.turretLevel,
                        unlocking_time: time + "s",
                        synthesis_times: util_1.default.userData.synthesis_times,
                        level: "第" + util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "关"
                    });
                    util_1.default.userData.unlocking_time = nowTime;
                    util_1.default.userData.synthesis_times = 0;
                    console.log(util_1.default.userData.noviceGuide, 'util.userData.noviceGuide');
                    if (util_1.default.userData.turretLevel == 5) {
                        //等级5级时候主动弹出
                        _this.showPage(pageTs_1.default.pageName.GameGoldWheel);
                    }
                    if (util_1.default.checkTestB(NameTs_1.default.new_hand_test) && util_1.default.userData.noviceGuide == 3) {
                        cc.game.emit(NameTs_1.default.Game_Novice_Open, 4);
                        util_1.default.sendTurretData();
                    }
                    else {
                        if (util_1.default.checkTestB(NameTs_1.default.lock_turret_test) && (util_1.default.userData.turretLevel > 2 && util_1.default.userData.turretLevel < 8)) {
                            console.log("B用户3-7级，不触发弹窗");
                            util_1.default.sendTurretData();
                        }
                        else {
                            _this.showUpgrade();
                        }
                    }
                    break;
                case pageTs_1.default.pageName.GameToolGet:
                    _this.showToolGet(res.data);
                    break;
                case pageTs_1.default.pageName.GameOnLinePrize:
                    _this.showOnLinePrize(res.data);
                    break;
                case pageTs_1.default.pageName.GameNewPlayerTask:
                    _this.showNewPlayerTask();
                    break;
                case pageTs_1.default.pageName.GameKingPao:
                    _this.showKingPao();
                    break;
                case pageTs_1.default.pageName.GameKingPaoProgress:
                    _this.showKingPaoProgress(res.data);
                    break;
                case pageTs_1.default.pageName.GameOnPrizeGetReward:
                    _this.showOnPrizeGetRewared(res.data);
                    break;
                case pageTs_1.default.pageName.GameRandomRedPrize:
                    _this.showRandomRedPrize(res.data);
                    break;
                case pageTs_1.default.pageName.GameTurretRandomRed:
                    _this.showTurretRandomRed();
                    break;
            }
        }, this);
        // XMSDK.post({
        //     url: UrlConst.sign_main,
        //     onSuccess: res => {
        //         cc.error("请求成功", res)
        //         if (res.code === 0 && res.data) {
        //         }
        //         else {
        //         }
        //     },
        //     onFail: err => {
        //     }
        // }
        // )        
        // this.showPage(pageTs.pageName.GameOffline);
        // cc.game.emit(NameTs.Game_Pop_Open, {
        //     name: pageTs.pageName.GameOnLinePrize,
        //     data: {
        //         point: 300
        //     }
        // });
        cc.game.on(NameTs_1.default.Game_Tool_Use, function (type) {
            if (type == faceTs_1.propType.cls) { //清屏        
                soundController_1.default.singleton.playMusic(NameTs_1.default.ToolMusicCls);
                GameEffect_1.GameEffect.playToolCls();
            }
            else if (type == faceTs_1.propType.auto) { //自动合成
            }
            else if (type == faceTs_1.propType.shock) { //电击
                soundController_1.default.singleton.playMusic(NameTs_1.default.ToolMusicShock);
                GameEffect_1.GameEffect.playToolShock();
            }
            else if (type == faceTs_1.propType.shield) { //护盾
                soundController_1.default.singleton.playMusic(NameTs_1.default.ToolMusicShield);
                _this.openShield();
            }
            else if (type == faceTs_1.propType.frozen) { //冰冻
                GameEffect_1.GameEffect.playToolFrozen();
            }
        }, this);
        cc.game.on(NameTs_1.default.Close_Shield, function () {
            _this.closeShield();
        }, this);
        console.log(util_1.default.userData.noviceGuide, 'util.userData.noviceGuide');
        if (util_1.default.userData.noviceGuide !== -1 && util_1.default.userData.turretLevel < 2) {
            util_1.default.userData.noviceGuide = 1;
            if (util_1.default.checkTestB(NameTs_1.default.new_hand_test)) {
                this.showPage(pageTs_1.default.pageName.GameGuide);
            }
            else {
                this.showPage(pageTs_1.default.pageName.GameGuide2);
            }
            util_1.default.sendTurretData();
            //fix bug
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.sign_main,
                onSuccess: function (res) {
                    if (res.code === 0 && res.data) {
                        if (res && res.data) {
                            util_1.default.isOkSign = res.data.todayChecked;
                        }
                    }
                },
                onFail: function (err) {
                }
            });
        }
        else {
            if (util_1.default.userData.newUser) {
                if (util_1.default.userData.offlineIncome && util_1.default.userData.offlineIncome.reward > 0) {
                    this.showPage(pageTs_1.default.pageName.GameOffline);
                }
                else {
                    // this.showPage(pageTs.pageName.GameStart);
                    this.FistGameStart(1);
                }
                //fix bug
                XMSDK_1.default.getdataStr({
                    url: UrlConst_1.UrlConst.sign_main,
                    onSuccess: function (res) {
                        if (res.code === 0 && res.data) {
                            if (res && res.data) {
                                util_1.default.isOkSign = res.data.todayChecked;
                            }
                        }
                    },
                    onFail: function (err) {
                    }
                });
            }
            else {
                //fix bug
                XMSDK_1.default.getdataStr({
                    url: UrlConst_1.UrlConst.sign_main,
                    onSuccess: function (res) {
                        if (res.code === 0 && res.data) {
                            console.log(res.data, 'res.data');
                            if (res.data && !res.data.todayChecked) {
                                res.data["callBack"] = function () {
                                    // this.showPage(pageTs.pageName.GameStart);
                                    _this.FistGameStart(2);
                                };
                                _this.showPage(pageTs_1.default.pageName.GameSign, res.data);
                            }
                            else {
                                if (util_1.default.userData.offlineIncome && util_1.default.userData.offlineIncome.reward > 0) {
                                    _this.showPage(pageTs_1.default.pageName.GameOffline);
                                }
                                else {
                                    res.data["callBack"] = function () {
                                        // this.showPage(pageTs.pageName.GameStart);
                                        _this.FistGameStart(3);
                                    };
                                    _this.showPage(pageTs_1.default.pageName.GameSign, res.data);
                                }
                            }
                            if (res && res.data) {
                                util_1.default.isOkSign = res.data.todayChecked;
                                //预加载离线
                                // if (!util.adPreObj[AdPosition.Offline]) {
                                //     util.preloadAd(AdPosition.Offline);
                                // }
                                // if (!util.adPreObj[AdPosition.OfflineView]) {
                                //     util.preloadAd(AdPosition.OfflineView, true);
                                // }
                            }
                        }
                        else {
                            // this.showPage(pageTs.pageName.GameStart);
                            _this.FistGameStart(4);
                        }
                    },
                    onFail: function (err) {
                    }
                });
            }
        }
        this.openOnlineTime();
        this.openOnLinePrizeTimer();
        this.checkBgImage();
        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log("cocos游戏进入后台时触发的事件。");
            //退出时间
            util_1.default.setStorage(util_1.default.localDiary.offlineTime, new Date().getTime());
            XMSDK_1.default.trackUserProperties({
                synthesis_times_hcdg: util_1.default.userData.synthesis_All,
            });
            util_1.default.userData.synthesis_All = 0;
            util_1.default.setStorage(util_1.default.localDiary.onlineTime, util_1.default.onlineTimeNum);
            util_1.default.setStorage(util_1.default.localDiary.randomRedTimeNum, util_1.default.randomRedTimeNum);
        }, this);
        cc.game.on(cc.game.EVENT_SHOW, function () {
            console.log("cocos游戏进入前台运行时触发的事件。");
            util_1.default.offlineTurretProduct();
        }, this);
        TrackMgr_1.default.AppViewScreen({
            app_page_title: "首页"
        });
        if (!util_1.default.userData.unlocking_time) {
            util_1.default.userData.unlocking_time = new Date().getTime();
            util_1.default.setStorage(util_1.default.localDiary.unlocking_time, util_1.default.userData.unlocking_time);
        }
    };
    game.prototype.openOnlineTime = function () {
        if (!util_1.default.chekcToday()) {
            util_1.default.setStorage(util_1.default.localDiary.onlineTime, 0);
        }
        var onTime = util_1.default.getStorage(util_1.default.localDiary.onlineTime);
        if (onTime == null) {
            util_1.default.setStorage(util_1.default.localDiary.onlineTime, 0);
        }
        util_1.default.onlineTimeNum = onTime;
        this.schedule(function () {
            util_1.default.onlineTimeNum++;
            RedController_1.default.checkMainSignRed();
        }, 1);
    };
    game.prototype.checkBgImage = function () {
        //替换背景图片
        var bgImageData = AssistCtr_1.AssistCtr.checkLvBg(util_1.default.userData.customs.big);
        var bgIndex = bgImageData.mapId - 1;
        if (this.image_bg && this.image_bgArray) {
            if (this.image_bgArray[bgIndex]) {
                this.image_bg.spriteFrame = this.image_bgArray[bgIndex];
            }
            else {
                this.image_bg.spriteFrame = this.image_bgArray[0];
            }
        }
        // let tempColor = new cc.Color();
        // this.customsLabel.node.color = tempColor.fromHEX(bgImageData.color);
    };
    game.prototype.start = function () {
        cc.game.emit(NameTs_1.default.Close_LoadPage);
    };
    /**
     * 打开在线奖励
     */
    game.prototype.openOnLinePrizeTimer = function () {
        var _this = this;
        if (!this.onLinePrizeTimer) {
            this.onLinePrizeTimer = setInterval(function () {
                if (util_1.default.levelState != faceTs_1.gameState.stop) {
                    _this.onLinePrizeTimeNum++;
                    if (_this.onLinePrizeTimeNum > util_1.default.online_time) { //在线打怪半个小时后自动弹窗在线奖励弹窗
                        _this.closeOnLinePrizeTimer();
                        //fix bug
                        XMSDK_1.default.getdataStr({
                            url: UrlConst_1.UrlConst.getOnLinePrize,
                            onSuccess: function (res) {
                                if (res.code == 0 && res.data) {
                                    var data = res.data;
                                    if (data.point) {
                                        cc.game.emit(NameTs_1.default.Game_Pop_Open, {
                                            name: pageTs_1.default.pageName.GameOnLinePrize,
                                            data: {
                                                point: data.point
                                            }
                                        });
                                        _this.onLinePrizeTimeNum = 0;
                                    }
                                    else if (Math.floor(Number(data.leftTime) / 1000) < util_1.default.online_time) {
                                        _this.onLinePrizeTimeNum = Math.floor(Number(data.leftTime) / 1000);
                                    }
                                    _this.openOnLinePrizeTimer();
                                }
                                else {
                                    AssistCtr_1.AssistCtr.showToastTip(res.message);
                                }
                            },
                            onFail: function (err) {
                            }
                        });
                    }
                }
            }, 1000);
        }
    };
    /**
     * 关闭在线奖励
     */
    game.prototype.closeOnLinePrizeTimer = function () {
        if (this.onLinePrizeTimer != null) {
            clearInterval(this.onLinePrizeTimer);
            this.onLinePrizeTimer = null;
        }
    };
    /**
     * 开启护盾
     */
    game.prototype.openShield = function () {
        this.ske_hudun.getComponent(dragonBones.ArmatureDisplay).playAnimation("hudun", 1);
        this.ske_hudun.active = true;
    };
    /**
     * 关闭护盾
     */
    game.prototype.closeShield = function () {
        this.ske_hudun.active = false;
    };
    /**
     * 结束游戏
     */
    game.prototype.showEnd = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "通关失败"
        });
        this.showPage(pageTs_1.default.pageName.GameEnd);
    };
    /**
     * 通关成功
     */
    game.prototype.showPass = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "通关成功"
        });
        util_1.default.Opening_times_level = 0;
        // this.showPage(pageTs.pageName.GamePass);
        this.showPage(pageTs_1.default.pageName.GamePassReward2);
        // XMSDK.post({
        //     url: UrlConst.gameLevelCompleted,
        //     data:{
        //         // level:
        //     },
        //     onSuccess: res => {
        //         console.log("请求成功gameLevelIndex", res)
        //         if (res.code === 0 && res.data) {
        //         }
        //         else {
        //         }
        //     },
        //     onFail: err => {
        //     }
        // });
    };
    /**
     * 设置
     */
    game.prototype.showSet = function () {
        this.showPage(pageTs_1.default.pageName.GameSet);
    };
    /**
     * 道具
     */
    game.prototype.showProp = function () {
        this.showPage(pageTs_1.default.pageName.GameProp);
    };
    /**
     * 签到
     */
    game.prototype.showSign = function (data) {
        //fix bug
        var _this = this;
        if (data === void 0) { data = null; }
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.sign_main,
            onSuccess: function (res) {
                if (res.code === 0 && res.data) {
                    _this.showPage(pageTs_1.default.pageName.GameSign, res.data);
                }
                else {
                }
            },
            onFail: function (err) {
            }
        });
    };
    /**
     * 签到奖励
     */
    game.prototype.showSignReward = function (data) {
        if (data === void 0) { data = null; }
        this.showPage(pageTs_1.default.pageName.GameSignReward, data);
    };
    /**
    * 提现
     */
    game.prototype.showWallet = function () {
        var _this = this;
        util_1.default.sendTurretData(function () {
            //fix bug
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.wallet_main2,
                onSuccess: function (res) {
                    if (res.code === 0 && res.data) {
                        _this.showPage(pageTs_1.default.pageName.GameWallet, res.data);
                    }
                    else {
                    }
                },
                onFail: function (err) {
                }
            });
        });
    };
    /**
     * 提现记录页
     */
    game.prototype.showWalletRecord = function () {
        this.showPage(pageTs_1.default.pageName.GameWalletRecord);
    };
    /**
     * 请求失败框
     */
    game.prototype.showNetworkLost = function (data) {
        this.showPage(pageTs_1.default.pageName.GameNetworkLost, data);
    };
    /**
     * 图鉴
     */
    game.prototype.showTuJian = function () {
        this.showPage(pageTs_1.default.pageName.GameTuJian);
    };
    /**
     * 收益翻倍
     */
    game.prototype.showEarnings = function () {
        this.showPage(pageTs_1.default.pageName.GameEarnings);
    };
    /**
     * 任务
     */
    game.prototype.showTask = function () {
        var _this = this;
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.task_day_main,
            success: function (res) {
                _this.showPage(pageTs_1.default.pageName.GameTask, res);
            }
        });
    };
    /**
     * 挽留
     */
    game.prototype.showDetention = function () {
        this.showPage(pageTs_1.default.pageName.GameDetention);
    };
    /**
     * 视频加载loading
     */
    game.prototype.showAdLoading = function () {
        this.showPage(pageTs_1.default.pageName.GameAdLoading);
    };
    /**
     * 升级
     */
    game.prototype.showUpgrade = function () {
        this.showPage(pageTs_1.default.pageName.GameUpgrade);
    };
    /**
     * 道具获取弹窗
     */
    game.prototype.showToolGet = function (data) {
        this.showPage(pageTs_1.default.pageName.GameToolGet, data);
    };
    /**
    * 开启在线奖励倒计时
    */
    game.prototype.showOnLinePrize = function (data) {
        this.showPage(pageTs_1.default.pageName.GameOnLinePrize, data);
    };
    /**
     * 开启新手任务
     */
    game.prototype.showNewPlayerTask = function () {
        var _this = this;
        //fix bug
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.newPlayerTaskData,
            onSuccess: function (res) {
                console.log("99999999999999999### showNewPlayerTask ： " + res.data);
                if (res.code === 0 && res.data) {
                    _this.showPage(pageTs_1.default.pageName.GameNewPlayerTask, res.data);
                }
                else {
                }
            },
            onFail: function (err) {
            }
        });
    };
    /**
     * 炮王任务
     */
    game.prototype.showKingPao = function () {
        //fix bug
        var _this = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.kingPaoTaskData,
            onSuccess: function (res) {
                if (res.code === 0 && res.data) {
                    _this.showPage(pageTs_1.default.pageName.GameKingPao, res.data);
                }
                else {
                    if (res) {
                        AssistCtr_1.AssistCtr.showToastTip(res.message);
                    }
                }
            },
            onFail: function (err) {
            }
        });
    };
    /**
     * 炮王任务进度
     */
    game.prototype.showKingPaoProgress = function (clickData) {
        var _this = this;
        if (clickData) {
            TrackMgr_1.default.artillery_bonus({
                activity_state: "\u70B9\u51FB\u300C\u70AE\u738B\u8FDB\u5EA6\u300D\u4EFB\u52A1",
                button_hcdg: "\u52A010%\u6309\u94AE",
                task_progress: "" + clickData.progress,
                Page_source: clickData.clickTarget ? "图鉴" : "百万分红"
            });
        }
        //fix bug
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.kingPaoProgress,
            onSuccess: function (res) {
                if (res.code === 0) {
                    if (res.data && res.data.status == 1 && res.data.sign) {
                        AssistCtr_1.AssistCtr.showToastTip("\u4ECA\u65E5\u6253\u5361\u6210\u529F!\u660E\u65E5\u518D\u6765\u54E6~");
                    }
                    else if (res.data && res.data.status == 2 && util_1.default.isOkSign) {
                        AssistCtr_1.AssistCtr.showToastTip("\u4ECA\u65E5\u5DF2\u7B7E\u5230!\u660E\u65E5\u518D\u6765\u54E6~");
                    }
                    else {
                        _this.showPage(pageTs_1.default.pageName.GameKingPaoProgress, res.data);
                    }
                }
                else {
                    if (res) {
                        AssistCtr_1.AssistCtr.showToastTip(res.message);
                    }
                }
            },
            onFail: function (err) {
            }
        });
    };
    /**
     * 签到处在线奖励红包
     */
    game.prototype.showOnPrizeGetRewared = function (data) {
        if (data && data.prizeRedData) {
            this.showPage(pageTs_1.default.pageName.GameOnPrizeGetReward, data.prizeRedData);
        }
    };
    /**
     * 打开随机红包
     */
    game.prototype.showRandomRedPrize = function (data) {
        this.showPage(pageTs_1.default.pageName.GameRandomRedPrize, data);
    };
    /**
     * 打开合成炮塔随机红包
     */
    game.prototype.showTurretRandomRed = function () {
        this.showPage(pageTs_1.default.pageName.GameTurretRandomRed);
    };
    /**
     * 第一次开始游戏
     */
    game.prototype.FistGameStart = function (e) {
        this.scheduleOnce(function () {
            cc.game.emit(NameTs_1.default.Game_Start);
        }, .3);
    };
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], game.prototype, "crystal", void 0);
    __decorate([
        property(cc.Node)
    ], game.prototype, "ske_hudun", void 0);
    __decorate([
        property(cc.Sprite)
    ], game.prototype, "image_bg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], game.prototype, "image_bgArray", void 0);
    game = __decorate([
        ccclass
    ], game);
    return game;
}(baseTs_1.default));
exports.default = game;

cc._RF.pop();