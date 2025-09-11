"use strict";
cc._RF.push(module, '22b89Xb03ZFiYMKDLFgpcLc', 'game');
// Script/game/game.ts

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
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var RedController_1 = require("../controlelr/RedController");
var GameEffect_1 = require("../effect/GameEffect");
var LanguageData_1 = require("../Language/LanguageData");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var game = /** @class */ (function (_super) {
    __extends(game, _super);
    function game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.crystal = null; //水晶
        _this.ske_hudun = null; //护盾
        _this.image_bg = null; //背景图
        _this.image_bgArray = []; //背景图集
        _this.onceOpenGame = true; //是否第一次开始游戏
        _this.onLinePrizeTimeNum = 0; //在线奖励倒计时时间
        return _this;
    }
    Object.defineProperty(game.prototype, "_userData", {
        get: function () {
            return util_1.default.userData;
        },
        enumerable: false,
        configurable: true
    });
    game.prototype.onLoad = function () {
        var _this = this;
        util_1.default.offlineTurretProduct();
        // 设置语言
        var languageType = Tools_1.Tools.getStorage("LanguageType");
        var index = languageType == undefined || languageType == null ? 1 : languageType;
        LanguageData_1.setLanguage(Number(index));
        soundController_1.default.singleton.initIsPlayMusic();
        soundController_1.default.singleton.playBGM();
        cc.game.on(NameTs_1.default.Game_End, function (res) {
            switch (res) {
                case faceTs_1.gamePass.success:
                    console.log("==========大关结束===========");
                    _this.showPass();
                    _this.checkBgImage();
                    break;
                case faceTs_1.gamePass.fail:
                    // this.showEnd();
                    _this.crystal.playAnimation("paota_boom", 1);
                    _this.scheduleOnce(function () {
                        _this.crystal.playAnimation("paota_piaofu", -1);
                        cc.game.emit(NameTs_1.default.Game_Again);
                        console.log("送一个空降宝箱Game_End");
                        util_1.default.showEmptyBox(); //送一个空降宝箱
                    }, 1);
                    break;
                case faceTs_1.gamePass.smallSuccess:
                    console.log("==========小关结束===========");
                    _this.showPage(pageTs_1.default.pageName.GamePassReward);
                    break;
            }
        }, this);
        cc.game.on(NameTs_1.default.Game_Start, function () {
            if (!_this.onceOpenGame) { //不是第一次开始游戏才送
                console.log("送一个空降宝箱Game_Start");
                util_1.default.showEmptyBox(); //送一个空降宝箱
            }
            _this.onceOpenGame = false;
            if (_this._userData.customs.big == 2 && _this._userData.customs.small == 2) {
                if (!util_1.default.isOkSign) {
                    _this.showSign();
                }
            }
            // util.levelState = gameState.start;
            // 更新关卡title
            cc.game.emit(NameTs_1.default.Game_View_CustomsUpdata);
            //加载关卡怪兽
            cc.game.emit(NameTs_1.default.Game_Load_Monster);
            // 道具
            for (var i = 0; i < _this._userData.prop.length; i++) {
                if (i == faceTs_1.propType.auto - 1)
                    continue;
                _this._userData.prop[i].time = null;
                _this._userData.prop[i].use = faceTs_1.propState.end;
                if (_this._userData.prop[i].type == 3) {
                    _this.closeShield();
                }
            }
            util_1.default.Opening_times_level++;
            // XMSDK.trackUserProperties({
            //     level_num: this._userData.customs.big + "-" + this._userData.customs.small,
            // });
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
                    var time = Math.floor((nowTime - _this._userData.unlocking_time) / 1000);
                    console.log(time, 'time');
                    _this._userData.unlocking_time = nowTime;
                    _this._userData.synthesis_times = 0;
                    console.log(_this._userData.noviceGuide, 'this._userData.noviceGuide');
                    if (_this._userData.turretLevel == 5) {
                        //等级5级时候主动弹出
                        _this.showPage(pageTs_1.default.pageName.GameGoldWheel);
                    }
                    if (util_1.default.checkTestB(NameTs_1.default.new_hand_test) && _this._userData.noviceGuide == 3) {
                        cc.game.emit(NameTs_1.default.Game_Novice_Open, 4);
                        util_1.default.sendTurretData();
                    }
                    else {
                        if (util_1.default.checkTestB(NameTs_1.default.lock_turret_test) && (_this._userData.turretLevel > 2 && _this._userData.turretLevel < 8)) {
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
        // 关闭护盾
        cc.game.on(NameTs_1.default.Close_Shield, function () {
            _this.closeShield();
        }, this);
        console.log("新手引导是否过了:", 'this._userData.noviceGuide');
        if (this._userData.noviceGuide !== -1 && this._userData.turretLevel < 2) {
            this._userData.noviceGuide = 1;
            if (util_1.default.checkTestB(NameTs_1.default.new_hand_test)) {
                this.showPage(pageTs_1.default.pageName.GameGuide);
            }
            else {
                this.showPage(pageTs_1.default.pageName.GameGuide2);
            }
            util_1.default.sendTurretData();
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
            if (this._userData.newUser) {
                if (this._userData.offlineIncome && this._userData.offlineIncome.reward > 0) {
                    this.showPage(pageTs_1.default.pageName.GameOffline);
                }
                else {
                    // this.showPage(pageTs.pageName.GameStart);
                    this.FistGameStart(1);
                }
            }
            else {
            }
        }
        this.openOnlineTime();
        // this.openOnLinePrizeTimer();
        this.checkBgImage();
        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log("cocos游戏进入后台时触发的事件。");
            //退出时间
            util_1.default.setStorage(util_1.default.localDiary.offlineTime, new Date().getTime());
            XMSDK_1.default.trackUserProperties({
                synthesis_times_hcdg: _this._userData.synthesis_All,
            });
            _this._userData.synthesis_All = 0;
            util_1.default.setStorage(util_1.default.localDiary.onlineTime, util_1.default.onlineTimeNum);
            util_1.default.setStorage(util_1.default.localDiary.randomRedTimeNum, util_1.default.randomRedTimeNum);
        }, this);
        cc.game.on(cc.game.EVENT_SHOW, function () {
            console.log("cocos游戏进入前台运行时触发的事件。");
            util_1.default.offlineTurretProduct();
        }, this);
        if (!this._userData.unlocking_time) {
            this._userData.unlocking_time = new Date().getTime();
            util_1.default.setStorage(util_1.default.localDiary.unlocking_time, this._userData.unlocking_time);
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
    /**
    * 替换背景图片
    */
    game.prototype.checkBgImage = function () {
        var bgImageData = AssistCtr_1.AssistCtr.checkLvBg(this._userData.customs.big);
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
        this.showPage(pageTs_1.default.pageName.GameEnd);
    };
    /**
     * 通关成功
     */
    game.prototype.showPass = function () {
        util_1.default.Opening_times_level = 0;
        this.showPage(pageTs_1.default.pageName.GamePassReward);
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
   * 挽留
   */
    game.prototype.showDetention = function () {
        this.showPage(pageTs_1.default.pageName.GameDetention);
    };
    /**
     * 开启新手任务
     */
    game.prototype.showNewPlayerTask = function () {
        var _this = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.newPlayerTaskData,
            onSuccess: function (res) {
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