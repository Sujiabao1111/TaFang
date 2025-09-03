
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxnYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFFcEMsMkNBQTRFO0FBQzVFLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsNkRBQXdEO0FBRXhELG1EQUFrRDtBQUNsRCwrQ0FBOEM7QUFFOUMscURBQWdEO0FBQ2hELHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFNO0lBQXhDO1FBR0ksc0JBQXNCO1FBQ3RCLDJDQUEyQztRQUovQyxxRUFzekJDO1FBL3lCRyxhQUFPLEdBQWdDLElBQUksQ0FBQyxDQUFHLElBQUk7UUFHbkQsZUFBUyxHQUFZLElBQUksQ0FBQyxDQUFHLElBQUk7UUFHakMsY0FBUSxHQUFjLElBQUksQ0FBQyxDQUFFLEtBQUs7UUFHbEMsbUJBQWEsR0FBMEIsRUFBRSxDQUFDLENBQUUsTUFBTTtRQUUxQyxrQkFBWSxHQUFHLElBQUksQ0FBQyxDQUFJLFdBQVc7UUFzWm5DLHdCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFLLFdBQVc7O0lBOFluRCxDQUFDO0lBbHlCRyxxQkFBTSxHQUFOO1FBQUEsaUJBMldDO1FBeFdHLGNBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsUUFBUSxFQUFFLFVBQUMsR0FBRztZQUM1QixRQUFRLEdBQUcsRUFBRTtnQkFDVCxLQUFLLGlCQUFRLENBQUMsT0FBTztvQkFDakIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNoQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLE1BQU07Z0JBQ1Ys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O0lBRUQ7O09BRUc7SUFDSCxrQ0FBbUIsR0FBbkI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUdEOztPQUVHO0lBRUgsNEJBQWEsR0FBYixVQUFjLENBQUM7UUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFDVixDQUFDO0lBOXlCRDtRQURDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO3lDQUNNO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswQ0FDTztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOytDQUNpQjtJQWhCekIsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXN6QnhCO0lBQUQsV0FBQztDQXR6QkQsQUFzekJDLENBdHpCaUMsZ0JBQU0sR0FzekJ2QztrQkF0ekJvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBnYW1lUGFzcywgZ2FtZVN0YXRlLCBwcm9wU3RhdGUsIHByb3BUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBSZWRDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sZWxyL1JlZENvbnRyb2xsZXJcIjtcbmltcG9ydCB1c2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xuaW1wb3J0IHsgR2FtZUVmZmVjdCB9IGZyb20gXCIuLi9lZmZlY3QvR2FtZUVmZmVjdFwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lIGV4dGVuZHMgYmFzZVRzIHtcblxuXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIC8vIGN1c3RvbXNMYWJlbDogY2MuTGFiZWwgPSBudWxsOyAvL+WFs+WNoWxhYmVsXG5cbiAgICBAcHJvcGVydHkoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KVxuICAgIGNyeXN0YWw6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7ICAgLy/msLTmmbZcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNrZV9odWR1bjogY2MuTm9kZSA9IG51bGw7ICAgLy/miqTnm75cblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaW1hZ2VfYmc6IGNjLlNwcml0ZSA9IG51bGw7ICAvL+iDjOaZr+WbvlxuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIGltYWdlX2JnQXJyYXk6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdOyAgLy/og4zmma/lm77pm4ZcblxuICAgIHByaXZhdGUgb25jZU9wZW5HYW1lID0gdHJ1ZTsgICAgLy/mmK/lkKbnrKzkuIDmrKHlvIDlp4vmuLjmiI9cblxuICAgIG9uTG9hZCgpIHtcblxuXG4gICAgICAgIHV0aWwub2ZmbGluZVR1cnJldFByb2R1Y3QoKTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0VuZCwgKHJlcykgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChyZXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGdhbWVQYXNzLnN1Y2Nlc3M6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Bhc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0JnSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBnYW1lUGFzcy5mYWlsOlxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dFbmQoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyeXN0YWwucGxheUFuaW1hdGlvbihcInBhb3RhX2Jvb21cIiwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcnlzdGFsLnBsYXlBbmltYXRpb24oXCJwYW90YV9waWFvZnVcIiwgLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0FnYWluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuc2hvd0VtcHR5Qm94KCk7ICAgLy/pgIHkuIDkuKrnqbrpmY3lrp3nrrFcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwR2FtZWRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNfY2hhbGxlbmdlX3N1YzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lX2xldmVsX2hjZGc6IFwi56ysXCIgKyB1dGlsLnVzZXJEYXRhLmN1c3RvbXMuYmlnICsgXCLlhbNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsX2hjZGc6IFwi56ysXCIgKyB1dGlsLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwgKyBcIuazolwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZV90aW1lOiB1dGlsLmdhbWVUaW1lLnRvRml4ZWQoMSkgKyBcInNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZV90b29sOiBTdHJpbmcodXRpbC5nYW1lUHJvcE51bSksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TdGFydCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9uY2VPcGVuR2FtZSkgeyAgICAvL+S4jeaYr+esrOS4gOasoeW8gOWni+a4uOaIj+aJjemAgVxuICAgICAgICAgICAgICAgIHV0aWwuc2hvd0VtcHR5Qm94KCk7ICAgLy/pgIHkuIDkuKrnqbrpmY3lrp3nrrFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25jZU9wZW5HYW1lID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLmN1c3RvbXMuYmlnID09IDIgJiYgdXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsID09IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXV0aWwuaXNPa1NpZ24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2lnbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgKHV0aWwudXNlckRhdGEuY3VzdG9tcy5zbWFsbCA9PSB1dGlsLm1hcENvbmZpZy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vICAgICBpZiAoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5HYW1lUHNzVmlld10pIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HYW1lUHNzVmlldywgdHJ1ZSk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gdXRpbC5sZXZlbFN0YXRlID0gZ2FtZVN0YXRlLnN0YXJ0O1xuICAgICAgICAgICAgLy/mm7TmlrDlhbPljaF0aXRsZVxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1ZpZXdfQ3VzdG9tc1VwZGF0YSk7XG4gICAgICAgICAgICAvL+WKoOi9veWFs+WNoeaAquWFvVxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0xvYWRfTW9uc3Rlcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHV0aWwudXNlckRhdGEucHJvcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpID09IHByb3BUeXBlLmF1dG8gLSAxKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnByb3BbaV0udGltZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5wcm9wW2ldLnVzZSA9IHByb3BTdGF0ZS5lbmQ7XG4gICAgICAgICAgICAgICAgaWYgKHV0aWwudXNlckRhdGEucHJvcFtpXS50eXBlID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaWVsZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHV0aWwuT3BlbmluZ190aW1lc19sZXZlbCsrO1xuICAgICAgICAgICAgVHJhY2tNZ3IubGV2ZWxfb3Blbih7XG4gICAgICAgICAgICAgICAgbnVtYmVyX29mX2xldmVsczogXCLnrKxcIiArIHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcgKyBcIuWFs1wiLFxuICAgICAgICAgICAgICAgIGxldmVsOiBcIuesrFwiICsgdXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsICsgXCLms6JcIixcbiAgICAgICAgICAgICAgICBPcGVuaW5nX3RpbWVzOiB1dGlsLk9wZW5pbmdfdGltZXNfbGV2ZWwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFhNU0RLLnRyYWNrVXNlclByb3BlcnRpZXMoe1xuICAgICAgICAgICAgICAgIGxldmVsX251bTogdXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZyArIFwiLVwiICsgdXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG5cbiAgICAgICAgLy/nm5HlkKzlvLnnqpdcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcmVzID0+IHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gcmVzLm5hbWUgPyByZXMubmFtZSA6IHJlcztcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVTZXQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NldCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lUHJvcDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvcCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lU2lnbjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2lnbihyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVTaWduUmV3YXJkOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTaWduUmV3YXJkKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZVdhbGxldDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93V2FsbGV0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVXYWxsZXRSZWNvcmQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1dhbGxldFJlY29yZCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lTmV0d29ya0xvc3Q6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05ldHdvcmtMb3N0KHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZVR1SmlhbjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VHVKaWFuKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVFYXJuaW5nczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RWFybmluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZVRhc2s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Rhc2soKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZURldGVudGlvbjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RGV0ZW50aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVBZExvYWRpbmc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FkTG9hZGluZygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lVXBncmFkZTpcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vd1RpbWU6bnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lID0gTWF0aC5mbG9vcigobm93VGltZSAtIHV0aWwudXNlckRhdGEudW5sb2NraW5nX3RpbWUpLzEwMDApO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aW1lLCd0aW1lJylcbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IudHVycmV0X3VubG9jayh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxvY2tfdHVycmV0X2xldmVsIDogdXRpbC51c2VyRGF0YS50dXJyZXRMZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubG9ja2luZ190aW1lOnRpbWUrXCJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzeW50aGVzaXNfdGltZXM6dXRpbC51c2VyRGF0YS5zeW50aGVzaXNfdGltZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDpcIuesrFwiK3V0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcrXCItXCIrdXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsK1wi5YWzXCJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC51c2VyRGF0YS51bmxvY2tpbmdfdGltZSA9IG5vd1RpbWU7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEuc3ludGhlc2lzX3RpbWVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSwndXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZScpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYodXRpbC51c2VyRGF0YS50dXJyZXRMZXZlbD09NSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+etiee6pzXnuqfml7blgJnkuLvliqjlvLnlh7pcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHb2xkV2hlZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5uZXdfaGFuZF90ZXN0KSYmdXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZT09Myl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTm92aWNlX09wZW4sNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnNlbmRUdXJyZXREYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5sb2NrX3R1cnJldF90ZXN0KSYmKHV0aWwudXNlckRhdGEudHVycmV0TGV2ZWw+MiYmdXRpbC51c2VyRGF0YS50dXJyZXRMZXZlbDw4KSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJC55So5oi3My0357qn77yM5LiN6Kem5Y+R5by556qXXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5zZW5kVHVycmV0RGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VXBncmFkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVUb29sR2V0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUb29sR2V0KHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZU9uTGluZVByaXplOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPbkxpbmVQcml6ZShyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVOZXdQbGF5ZXJUYXNrOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXdQbGF5ZXJUYXNrKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dLaW5nUGFvKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvUHJvZ3Jlc3M6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0tpbmdQYW9Qcm9ncmVzcyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVPblByaXplR2V0UmV3YXJkOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPblByaXplR2V0UmV3YXJlZChyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVSYW5kb21SZWRQcml6ZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmFuZG9tUmVkUHJpemUocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHVycmV0UmFuZG9tUmVkOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUdXJyZXRSYW5kb21SZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy8gWE1TREsucG9zdCh7XG4gICAgICAgIC8vICAgICB1cmw6IFVybENvbnN0LnNpZ25fbWFpbixcbiAgICAgICAgLy8gICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjYy5lcnJvcihcIuivt+axguaIkOWKn1wiLCByZXMpXG4gICAgICAgIC8vICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XG5cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gKSAgICAgICAgXG5cbiAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZU9mZmxpbmUpO1xuXG4gICAgICAgIC8vIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3Blbiwge1xuICAgICAgICAvLyAgICAgbmFtZTogcGFnZVRzLnBhZ2VOYW1lLkdhbWVPbkxpbmVQcml6ZSxcbiAgICAgICAgLy8gICAgIGRhdGE6IHtcbiAgICAgICAgLy8gICAgICAgICBwb2ludDogMzAwXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuXG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Ub29sX1VzZSwgKHR5cGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlID09IHByb3BUeXBlLmNscykgeyAgICAgICAgICAgICAgICAgICAgICAgICAvL+a4heWxjyAgICAgICAgXG4gICAgICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5TXVzaWMoTmFtZVRzLlRvb2xNdXNpY0Nscyk7XG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdC5wbGF5VG9vbENscygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLmF1dG8pIHsgICAgICAgICAgICAgICAgICAvL+iHquWKqOWQiOaIkFxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLnNob2NrKSB7ICAgICAgICAgICAgICAgICAgLy/nlLXlh7tcbiAgICAgICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLnBsYXlNdXNpYyhOYW1lVHMuVG9vbE11c2ljU2hvY2spO1xuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3QucGxheVRvb2xTaG9jaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBwcm9wVHlwZS5zaGllbGQpIHsgICAgICAgICAgICAgICAgIC8v5oqk55u+XG4gICAgICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5TXVzaWMoTmFtZVRzLlRvb2xNdXNpY1NoaWVsZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuU2hpZWxkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLmZyb3plbikgeyAgICAgICAgICAgICAgICAgLy/lhrDlhrtcbiAgICAgICAgICAgIEdhbWVFZmZlY3QucGxheVRvb2xGcm96ZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuQ2xvc2VfU2hpZWxkLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VTaGllbGQoKTtcblxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBjb25zb2xlLmxvZyh1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlLCAndXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZScpXG4gICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlICE9PSAtMSAmJiB1dGlsLnVzZXJEYXRhLnR1cnJldExldmVsIDwgMikge1xuICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9IDE7XG4gICAgICAgICAgICBpZih1dGlsLmNoZWNrVGVzdEIoTmFtZVRzLm5ld19oYW5kX3Rlc3QpKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lR3VpZGUpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUd1aWRlMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1dGlsLnNlbmRUdXJyZXREYXRhKCk7XG4gLy9maXggYnVnXG5cbiAgICAgICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3Quc2lnbl9tYWluLFxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5pc09rU2lnbiA9IHJlcy5kYXRhLnRvZGF5Q2hlY2tlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHV0aWwudXNlckRhdGEubmV3VXNlcikge1xuICAgICAgICAgICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLm9mZmxpbmVJbmNvbWUmJnV0aWwudXNlckRhdGEub2ZmbGluZUluY29tZS5yZXdhcmQ+MCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lT2ZmbGluZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5GaXN0R2FtZVN0YXJ0KDEpO1xuICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0IC8vZml4IGJ1Z1xuXHRcdFx0XHQgXG4gICAgICAgICAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3Quc2lnbl9tYWluLFxuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDAgJiYgcmVzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuaXNPa1NpZ24gPSByZXMuZGF0YS50b2RheUNoZWNrZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXHRcdFx0XHQgLy9maXggYnVnXG5cdFx0XHRcdCBcbiAgICAgICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5zaWduX21haW4sXG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLCAncmVzLmRhdGEnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YSAmJiAhcmVzLmRhdGEudG9kYXlDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhW2BjYWxsQmFja2BdID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRmlzdEdhbWVTdGFydCgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lU2lnbiwgcmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWwudXNlckRhdGEub2ZmbGluZUluY29tZSYmdXRpbC51c2VyRGF0YS5vZmZsaW5lSW5jb21lLnJld2FyZD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lT2ZmbGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtgY2FsbEJhY2tgXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRmlzdEdhbWVTdGFydCgzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVTaWduLCByZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuaXNPa1NpZ24gPSByZXMuZGF0YS50b2RheUNoZWNrZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/pooTliqDovb3nprvnur9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uT2ZmbGluZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uT2ZmbGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uT2ZmbGluZVZpZXddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLk9mZmxpbmVWaWV3LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkZpc3RHYW1lU3RhcnQoNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wZW5PbmxpbmVUaW1lKCk7XG4gICAgICAgIHRoaXMub3Blbk9uTGluZVByaXplVGltZXIoKTtcbiAgICAgICAgdGhpcy5jaGVja0JnSW1hZ2UoKTsgICAgICAgXG5cbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29jb3PmuLjmiI/ov5vlhaXlkI7lj7Dml7bop6blj5HnmoTkuovku7bjgIJcIilcbiAgICAgICAgICAgIC8v6YCA5Ye65pe26Ze0XG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5Lm9mZmxpbmVUaW1lLG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIFhNU0RLLnRyYWNrVXNlclByb3BlcnRpZXMoe1xuICAgICAgICAgICAgICAgIHN5bnRoZXNpc190aW1lc19oY2RnOiB1dGlsLnVzZXJEYXRhLnN5bnRoZXNpc19BbGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHV0aWwudXNlckRhdGEuc3ludGhlc2lzX0FsbCA9IDA7ICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5Lm9ubGluZVRpbWUsIHV0aWwub25saW5lVGltZU51bSk7XG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LnJhbmRvbVJlZFRpbWVOdW0sIHV0aWwucmFuZG9tUmVkVGltZU51bSk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvY29z5ri45oiP6L+b5YWl5YmN5Y+w6L+Q6KGM5pe26Kem5Y+R55qE5LqL5Lu244CCXCIpICAgICAgICAgICAgXG4gICAgICAgICAgICB1dGlsLm9mZmxpbmVUdXJyZXRQcm9kdWN0KCk7ICAgICAgXG4gICAgICAgIH0sIHRoaXMpO1xuXG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwVmlld1NjcmVlbih7XG4gICAgICAgICAgICBhcHBfcGFnZV90aXRsZTogXCLpppbpobVcIlxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXV0aWwudXNlckRhdGEudW5sb2NraW5nX3RpbWUpIHtcbiAgICAgICAgICAgIHV0aWwudXNlckRhdGEudW5sb2NraW5nX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkudW5sb2NraW5nX3RpbWUsIHV0aWwudXNlckRhdGEudW5sb2NraW5nX3RpbWUpXG4gICAgICAgIH0gICAgICBcbiAgICB9XG4gICAgICAgICAgICBcbiAgICBvcGVuT25saW5lVGltZSgpe1xuICAgICAgICBpZighdXRpbC5jaGVrY1RvZGF5KCkpeyAgICAgICAgICAgIFxuICAgICAgICAgICAgdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5vbmxpbmVUaW1lLCAwKTsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBsZXQgb25UaW1lID0gdXRpbC5nZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5vbmxpbmVUaW1lKVxuICAgICAgICBpZihvblRpbWUgPT0gbnVsbCl7ICAgICAgICAgICAgXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5Lm9ubGluZVRpbWUsIDApO1xuICAgICAgICB9IFxuXG4gICAgICAgIHV0aWwub25saW5lVGltZU51bSA9IG9uVGltZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKT0+e1xuICAgICAgICAgICAgdXRpbC5vbmxpbmVUaW1lTnVtKys7ICAgICAgICAgICAgIFxuICAgICAgICAgICAgUmVkQ29udHJvbGxlci5jaGVja01haW5TaWduUmVkKCk7XG4gICAgICAgIH0sIDEpXG4gICAgfVxuXG4gICAgY2hlY2tCZ0ltYWdlKCkge1xuICAgICAgICAvL+abv+aNouiDjOaZr+WbvueJh1xuICAgICAgICBsZXQgYmdJbWFnZURhdGEgPSBBc3Npc3RDdHIuY2hlY2tMdkJnKHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcpO1xuICAgICAgICBsZXQgYmdJbmRleCA9IGJnSW1hZ2VEYXRhLm1hcElkIC0gMTtcblxuICAgICAgICBpZih0aGlzLmltYWdlX2JnICYmIHRoaXMuaW1hZ2VfYmdBcnJheSl7XG4gICAgICAgICAgICBpZiAodGhpcy5pbWFnZV9iZ0FycmF5W2JnSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZV9iZy5zcHJpdGVGcmFtZSA9IHRoaXMuaW1hZ2VfYmdBcnJheVtiZ0luZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VfYmcuc3ByaXRlRnJhbWUgPSB0aGlzLmltYWdlX2JnQXJyYXlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgICAgICAvLyB0aGlzLmN1c3RvbXNMYWJlbC5ub2RlLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYmdJbWFnZURhdGEuY29sb3IpO1xuICAgIH1cblxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuQ2xvc2VfTG9hZFBhZ2UpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkxpbmVQcml6ZVRpbWVyOyAgICAgICAgICAgLy/lnKjnur/lpZblirHlgJLorqHml7blmahcbiAgICBwcml2YXRlIG9uTGluZVByaXplVGltZU51bSA9IDA7ICAgICAvL+WcqOe6v+WlluWKseWAkuiuoeaXtuaXtumXtFxuICAgIC8qKlxuICAgICAqIOaJk+W8gOWcqOe6v+WlluWKsVxuICAgICAqL1xuICAgIG9wZW5PbkxpbmVQcml6ZVRpbWVyKCkge1xuICAgICAgICBpZiAoIXRoaXMub25MaW5lUHJpemVUaW1lcikge1xuICAgICAgICAgICAgdGhpcy5vbkxpbmVQcml6ZVRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1dGlsLmxldmVsU3RhdGUgIT0gZ2FtZVN0YXRlLnN0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxpbmVQcml6ZVRpbWVOdW0rKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub25MaW5lUHJpemVUaW1lTnVtID4gdXRpbC5vbmxpbmVfdGltZSkgeyAgICAgICAgLy/lnKjnur/miZPmgKrljYrkuKrlsI/ml7blkI7oh6rliqjlvLnnqpflnKjnur/lpZblirHlvLnnqpdcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VPbkxpbmVQcml6ZVRpbWVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLy9maXggYnVnXG5cdFx0XHRcdFx0XHQgXG5cdFx0XHRcdFx0XHRYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmdldE9uTGluZVByaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDAgJiYgcmVzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5wb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3Blbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwYWdlVHMucGFnZU5hbWUuR2FtZU9uTGluZVByaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludDogZGF0YS5wb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxpbmVQcml6ZVRpbWVOdW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoTWF0aC5mbG9vcihOdW1iZXIoZGF0YS5sZWZ0VGltZSkgLyAxMDAwKSA8IHV0aWwub25saW5lX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTGluZVByaXplVGltZU51bSA9IE1hdGguZmxvb3IoTnVtYmVyKGRhdGEubGVmdFRpbWUpIC8gMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5PbkxpbmVQcml6ZVRpbWVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHJlcy5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63lnKjnur/lpZblirFcbiAgICAgKi9cbiAgICBjbG9zZU9uTGluZVByaXplVGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uTGluZVByaXplVGltZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLm9uTGluZVByaXplVGltZXIpO1xuICAgICAgICAgICAgdGhpcy5vbkxpbmVQcml6ZVRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5byA5ZCv5oqk55u+XG4gICAgICovXG4gICAgb3BlblNoaWVsZCgpIHtcbiAgICAgICAgdGhpcy5za2VfaHVkdW4uZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSkucGxheUFuaW1hdGlvbihcImh1ZHVuXCIsIDEpXG4gICAgICAgIHRoaXMuc2tlX2h1ZHVuLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6Zet5oqk55u+XG4gICAgICovXG4gICAgY2xvc2VTaGllbGQoKSB7XG4gICAgICAgIHRoaXMuc2tlX2h1ZHVuLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog57uT5p2f5ri45oiPXG4gICAgICovXG4gICAgc2hvd0VuZCgpIHtcbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi6YCa5YWz5aSx6LSlXCJcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lRW5kKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmuWFs+aIkOWKn1xuICAgICAqL1xuXG4gICAgc2hvd1Bhc3MoKSB7XG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIumAmuWFs+aIkOWKn1wiXG4gICAgICAgIH0pXG5cblxuICAgICAgICB1dGlsLk9wZW5pbmdfdGltZXNfbGV2ZWwgPSAwO1xuICAgICAgICAvLyB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lUGFzcyk7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVQYXNzUmV3YXJkMik7XG5cbiAgICAgICAgLy8gWE1TREsucG9zdCh7XG4gICAgICAgIC8vICAgICB1cmw6IFVybENvbnN0LmdhbWVMZXZlbENvbXBsZXRlZCxcbiAgICAgICAgLy8gICAgIGRhdGE6e1xuICAgICAgICAvLyAgICAgICAgIC8vIGxldmVsOlxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuivt+axguaIkOWKn2dhbWVMZXZlbEluZGV4XCIsIHJlcylcbiAgICAgICAgLy8gICAgICAgICBpZiAocmVzLmNvZGUgPT09IDAgJiYgcmVzLmRhdGEpIHtcblxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICBlbHNlIHtcblxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva5cbiAgICAgKi9cblxuICAgIHNob3dTZXQoKSB7XG5cbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVNldCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgZPlhbdcbiAgICAgKi9cblxuICAgIHNob3dQcm9wKCkge1xuXG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVQcm9wKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog562+5YiwXG4gICAgICovXG4gICAgc2hvd1NpZ24oZGF0YSA9IG51bGwpIHtcblx0XHQgLy9maXggYnVnXG5cdFx0IFxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3Quc2lnbl9tYWluLFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lU2lnbiwgcmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuXG4gICAgLyoqICAgICBcbiAgICAgKiDnrb7liLDlpZblirFcbiAgICAgKi9cbiAgICBzaG93U2lnblJld2FyZChkYXRhID0gbnVsbCkge1xuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lU2lnblJld2FyZCwgZGF0YSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICog5o+Q546wXG4gICAgICovXG4gICAgc2hvd1dhbGxldCgpIHtcbiAgICAgICAgdXRpbC5zZW5kVHVycmV0RGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgLy9maXggYnVnXG5cdFx0XHQgXG5cdFx0XHRYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LndhbGxldF9tYWluMixcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVdhbGxldCwgcmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmj5DnjrDorrDlvZXpobVcbiAgICAgKi9cbiAgICBzaG93V2FsbGV0UmVjb3JkKCkge1xuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lV2FsbGV0UmVjb3JkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDor7fmsYLlpLHotKXmoYZcbiAgICAgKi9cbiAgICBzaG93TmV0d29ya0xvc3QoZGF0YSkge1xuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lTmV0d29ya0xvc3QsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWbvumJtFxuICAgICAqL1xuICAgIHNob3dUdUppYW4oKSB7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUdUppYW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmlLbnm4rnv7vlgI1cbiAgICAgKi9cbiAgICBzaG93RWFybmluZ3MoKSB7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVFYXJuaW5ncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Lu75YqhXG4gICAgICovXG4gICAgc2hvd1Rhc2soKSB7XG5cbiAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QudGFza19kYXlfbWFpbixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVGFzayxyZXMpOyAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5oy955WZXG4gICAgICovXG4gICAgc2hvd0RldGVudGlvbigpIHtcbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZURldGVudGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6KeG6aKR5Yqg6L29bG9hZGluZ1xuICAgICAqL1xuICAgIHNob3dBZExvYWRpbmcoKSB7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVBZExvYWRpbmcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDljYfnuqdcbiAgICAgKi9cbiAgICBzaG93VXBncmFkZSgpIHtcbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVVwZ3JhZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmBk+WFt+iOt+WPluW8ueeql1xuICAgICAqL1xuICAgIHNob3dUb29sR2V0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVRvb2xHZXQsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICog5byA5ZCv5Zyo57q/5aWW5Yqx5YCS6K6h5pe2XG4gICAgKi9cbiAgICBzaG93T25MaW5lUHJpemUoZGF0YSkge1xuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lT25MaW5lUHJpemUsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW8gOWQr+aWsOaJi+S7u+WKoVxuICAgICAqL1xuICAgIHNob3dOZXdQbGF5ZXJUYXNrKCkge1xuICAgICAgIC8vZml4IGJ1Z1xuXHQgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0Lm5ld1BsYXllclRhc2tEYXRhLFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIjk5OTk5OTk5OTk5OTk5OTk5IyMjIHNob3dOZXdQbGF5ZXJUYXNrIO+8miBcIityZXMuZGF0YSApXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVOZXdQbGF5ZXJUYXNrLCByZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIClcblx0XHRcblx0XHRcblx0XHRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngq7njovku7vliqFcbiAgICAgKi9cbiAgICBzaG93S2luZ1BhbygpIHtcblx0XHQgLy9maXggYnVnXG5cdFx0IFxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3Qua2luZ1Bhb1Rhc2tEYXRhLFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lS2luZ1BhbywgcmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChyZXMubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog54Ku546L5Lu75Yqh6L+b5bqmXG4gICAgICovXG4gICAgc2hvd0tpbmdQYW9Qcm9ncmVzcyhjbGlja0RhdGEpIHtcbiAgICAgICAgaWYgKGNsaWNrRGF0YSkge1xuICAgICAgICAgICAgVHJhY2tNZ3IuYXJ0aWxsZXJ5X2JvbnVzKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogYOeCueWHu+OAjOeCrueOi+i/m+W6puOAjeS7u+WKoWAsXG4gICAgICAgICAgICAgICAgYnV0dG9uX2hjZGc6IGDliqAxMCXmjInpkq5gLFxuICAgICAgICAgICAgICAgIHRhc2tfcHJvZ3Jlc3M6IGAke2NsaWNrRGF0YS5wcm9ncmVzc31gLFxuICAgICAgICAgICAgICAgIFBhZ2Vfc291cmNlOiBjbGlja0RhdGEuY2xpY2tUYXJnZXQgPyBcIuWbvumJtFwiIDogXCLnmb7kuIfliIbnuqJcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXHRcdFxuXHRcdCAvL2ZpeCBidWdcblx0XHRcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmtpbmdQYW9Qcm9ncmVzcyxcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLnN0YXR1cyA9PSAxICYmIHJlcy5kYXRhLnNpZ24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoYOS7iuaXpeaJk+WNoeaIkOWKnyHmmI7ml6Xlho3mnaXlk6Z+YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEuc3RhdHVzID09IDIgJiYgdXRpbC5pc09rU2lnbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChg5LuK5pel5bey562+5YiwIeaYjuaXpeWGjeadpeWTpn5gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvUHJvZ3Jlc3MsIHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChyZXMubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog562+5Yiw5aSE5Zyo57q/5aWW5Yqx57qi5YyFXG4gICAgICovXG4gICAgc2hvd09uUHJpemVHZXRSZXdhcmVkKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5wcml6ZVJlZERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVPblByaXplR2V0UmV3YXJkLCBkYXRhLnByaXplUmVkRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiZPlvIDpmo/mnLrnuqLljIVcbiAgICAgKi9cbiAgICBzaG93UmFuZG9tUmVkUHJpemUoZGF0YSkge1xuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lUmFuZG9tUmVkUHJpemUsZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omT5byA5ZCI5oiQ54Ku5aGU6ZqP5py657qi5YyFXG4gICAgICovXG4gICAgc2hvd1R1cnJldFJhbmRvbVJlZCgpe1xuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHVycmV0UmFuZG9tUmVkKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOesrOS4gOasoeW8gOWni+a4uOaIj1xuICAgICAqL1xuXG4gICAgRmlzdEdhbWVTdGFydChlKXtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdGFydCk7XG4gICAgICAgIH0sLjMpO1xuICAgIH1cbn1cbiJdfQ==