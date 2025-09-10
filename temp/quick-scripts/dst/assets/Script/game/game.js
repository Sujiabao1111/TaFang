
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
            // if (this._userData.customs.small == util.mapConfig.length) {
            //     if (!util.adPreObj[AdPosition.GamePssView]) {
            //         util.preloadAd(AdPosition.GamePssView, true);
            //     }
            // }
            // util.levelState = gameState.start;
            // 更新关卡title
            cc.game.emit(NameTs_1.default.Game_View_CustomsUpdata);
            //加载关卡怪兽
            cc.game.emit(NameTs_1.default.Game_Load_Monster);
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
        // this.showPage(pageTs.pageName.GamePass);
        this.showPage(pageTs_1.default.pageName.GamePassReward2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxnYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsMkNBQTRFO0FBQzVFLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsNkRBQXdEO0FBRXhELG1EQUFrRDtBQUNsRCx5REFBdUQ7QUFDdkQsK0NBQThDO0FBQzlDLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsdUNBQXNDO0FBQ3RDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFrQyx3QkFBTTtJQUF4QztRQUFBLHFFQTZxQkM7UUExcUJXLGFBQU8sR0FBZ0MsSUFBSSxDQUFDLENBQUcsSUFBSTtRQUduRCxlQUFTLEdBQVksSUFBSSxDQUFDLENBQUcsSUFBSTtRQUdqQyxjQUFRLEdBQWMsSUFBSSxDQUFDLENBQUUsS0FBSztRQUdsQyxtQkFBYSxHQUEwQixFQUFFLENBQUMsQ0FBRSxNQUFNO1FBRWxELGtCQUFZLEdBQUcsSUFBSSxDQUFDLENBQUksV0FBVztRQTRUbkMsd0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUssV0FBVzs7SUFtV25ELENBQUM7SUE3cEJHLHNCQUFXLDJCQUFTO2FBQXBCO1lBQ0ksT0FBTyxjQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBR0QscUJBQU0sR0FBTjtRQUFBLGlCQTBRQztRQXpRRyxjQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUU1QixPQUFPO1FBQ1AsSUFBSSxZQUFZLEdBQUcsYUFBSyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxJQUFJLEtBQUssR0FBRyxZQUFZLElBQUksU0FBUyxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENB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QUFDO0lBQ1gsQ0FBQztJQXpxQkQ7UUFEQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQzt5Q0FDYztJQUdwRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJDQUNnQjtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBDQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7K0NBQ3lCO0lBWmpDLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0E2cUJ4QjtJQUFELFdBQUM7Q0E3cUJELEFBNnFCQyxDQTdxQmlDLGdCQUFNLEdBNnFCdkM7a0JBN3FCb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XHJcbmltcG9ydCB7IGdhbWVQYXNzLCBnYW1lU3RhdGUsIHByb3BTdGF0ZSwgcHJvcFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcclxuaW1wb3J0IFJlZENvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xlbHIvUmVkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL2RhdGEvdXNlckRhdGFcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdCB9IGZyb20gXCIuLi9lZmZlY3QvR2FtZUVmZmVjdFwiO1xyXG5pbXBvcnQgeyBzZXRMYW5ndWFnZSB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XHJcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi91dGlsL1Rvb2xzXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lIGV4dGVuZHMgYmFzZVRzIHtcclxuXHJcbiAgICBAcHJvcGVydHkoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KVxyXG4gICAgcHJpdmF0ZSBjcnlzdGFsOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsOyAgIC8v5rC05pm2XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHNrZV9odWR1bjogY2MuTm9kZSA9IG51bGw7ICAgLy/miqTnm75cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBpbWFnZV9iZzogY2MuU3ByaXRlID0gbnVsbDsgIC8v6IOM5pmv5Zu+XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgcHJpdmF0ZSBpbWFnZV9iZ0FycmF5OiBBcnJheTxjYy5TcHJpdGVGcmFtZT4gPSBbXTsgIC8v6IOM5pmv5Zu+6ZuGXHJcblxyXG4gICAgcHJpdmF0ZSBvbmNlT3BlbkdhbWUgPSB0cnVlOyAgICAvL+aYr+WQpuesrOS4gOasoeW8gOWni+a4uOaIj1xyXG5cclxuICAgIHB1YmxpYyBnZXQgX3VzZXJEYXRhKCk6IFVzZXJEYXRhIHtcclxuICAgICAgICByZXR1cm4gdXRpbC51c2VyRGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHV0aWwub2ZmbGluZVR1cnJldFByb2R1Y3QoKTtcclxuXHJcbiAgICAgICAgLy8g6K6+572u6K+t6KiAXHJcbiAgICAgICAgbGV0IGxhbmd1YWdlVHlwZSA9IFRvb2xzLmdldFN0b3JhZ2UoXCJMYW5ndWFnZVR5cGVcIik7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gbGFuZ3VhZ2VUeXBlID09IHVuZGVmaW5lZCB8fCBsYW5ndWFnZVR5cGUgPT0gbnVsbCA/IDEgOiBsYW5ndWFnZVR5cGU7XHJcbiAgICAgICAgc2V0TGFuZ3VhZ2UoTnVtYmVyKGluZGV4KSk7XHJcblxyXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uaW5pdElzUGxheU11c2ljKCk7XHJcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5QkdNKCk7XHJcblxyXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfRW5kLCAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGdhbWVQYXNzLnN1Y2Nlc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UGFzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tCZ0ltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGdhbWVQYXNzLmZhaWw6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93RW5kKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3J5c3RhbC5wbGF5QW5pbWF0aW9uKFwicGFvdGFfYm9vbVwiLCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyeXN0YWwucGxheUFuaW1hdGlvbihcInBhb3RhX3BpYW9mdVwiLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9BZ2Fpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YCB5LiA5Liq56m66ZmN5a6d566xR2FtZV9FbmRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuc2hvd0VtcHR5Qm94KCk7ICAgLy/pgIHkuIDkuKrnqbrpmY3lrp3nrrFcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1N0YXJ0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vbmNlT3BlbkdhbWUpIHsgICAgLy/kuI3mmK/nrKzkuIDmrKHlvIDlp4vmuLjmiI/miY3pgIFcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YCB5LiA5Liq56m66ZmN5a6d566xR2FtZV9TdGFydFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB1dGlsLnNob3dFbXB0eUJveCgpOyAgIC8v6YCB5LiA5Liq56m66ZmN5a6d566xXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub25jZU9wZW5HYW1lID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdXNlckRhdGEuY3VzdG9tcy5iaWcgPT0gMiAmJiB0aGlzLl91c2VyRGF0YS5jdXN0b21zLnNtYWxsID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdXRpbC5pc09rU2lnbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NpZ24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuX3VzZXJEYXRhLmN1c3RvbXMuc21hbGwgPT0gdXRpbC5tYXBDb25maWcubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5HYW1lUHNzVmlld10pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdhbWVQc3NWaWV3LCB0cnVlKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyB1dGlsLmxldmVsU3RhdGUgPSBnYW1lU3RhdGUuc3RhcnQ7XHJcblxyXG4gICAgICAgICAgICAvLyDmm7TmlrDlhbPljaF0aXRsZVxyXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVmlld19DdXN0b21zVXBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8v5Yqg6L295YWz5Y2h5oCq5YW9XHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Mb2FkX01vbnN0ZXIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl91c2VyRGF0YS5wcm9wLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBwcm9wVHlwZS5hdXRvIC0gMSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyRGF0YS5wcm9wW2ldLnRpbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlckRhdGEucHJvcFtpXS51c2UgPSBwcm9wU3RhdGUuZW5kO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLnByb3BbaV0udHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaWVsZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1dGlsLk9wZW5pbmdfdGltZXNfbGV2ZWwrKztcclxuXHJcbiAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrVXNlclByb3BlcnRpZXMoe1xyXG4gICAgICAgICAgICAvLyAgICAgbGV2ZWxfbnVtOiB0aGlzLl91c2VyRGF0YS5jdXN0b21zLmJpZyArIFwiLVwiICsgdGhpcy5fdXNlckRhdGEuY3VzdG9tcy5zbWFsbCxcclxuICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuXHJcbiAgICAgICAgLy/nm5HlkKzlvLnnqpdcclxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1BvcF9PcGVuLCByZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHJlcy5uYW1lID8gcmVzLm5hbWUgOiByZXM7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZVNldDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVQcm9wOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Byb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVTaWduOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NpZ24ocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZVNpZ25SZXdhcmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2lnblJld2FyZChyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lV2FsbGV0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1dhbGxldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZVdhbGxldFJlY29yZDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dXYWxsZXRSZWNvcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVOZXR3b3JrTG9zdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXR3b3JrTG9zdChyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHVKaWFuOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1R1SmlhbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZUVhcm5pbmdzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vhcm5pbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZVRhc2s6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGFzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZURldGVudGlvbjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dEZXRlbnRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lQWRMb2FkaW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FkTG9hZGluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZVVwZ3JhZGU6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vd1RpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lID0gTWF0aC5mbG9vcigobm93VGltZSAtIHRoaXMuX3VzZXJEYXRhLnVubG9ja2luZ190aW1lKSAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpbWUsICd0aW1lJylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyRGF0YS51bmxvY2tpbmdfdGltZSA9IG5vd1RpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXNlckRhdGEuc3ludGhlc2lzX3RpbWVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl91c2VyRGF0YS5ub3ZpY2VHdWlkZSwgJ3RoaXMuX3VzZXJEYXRhLm5vdmljZUd1aWRlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLnR1cnJldExldmVsID09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nrYnnuqc157qn5pe25YCZ5Li75Yqo5by55Ye6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHb2xkV2hlZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWwuY2hlY2tUZXN0QihOYW1lVHMubmV3X2hhbmRfdGVzdCkgJiYgdGhpcy5fdXNlckRhdGEubm92aWNlR3VpZGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTm92aWNlX09wZW4sIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnNlbmRUdXJyZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWwuY2hlY2tUZXN0QihOYW1lVHMubG9ja190dXJyZXRfdGVzdCkgJiYgKHRoaXMuX3VzZXJEYXRhLnR1cnJldExldmVsID4gMiAmJiB0aGlzLl91c2VyRGF0YS50dXJyZXRMZXZlbCA8IDgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkLnlKjmiLczLTfnuqfvvIzkuI3op6blj5HlvLnnqpdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuc2VuZFR1cnJldERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1VwZ3JhZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVUb29sR2V0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Rvb2xHZXQocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZU9uTGluZVByaXplOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd09uTGluZVByaXplKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVOZXdQbGF5ZXJUYXNrOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05ld1BsYXllclRhc2soKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0tpbmdQYW8oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgcGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvUHJvZ3Jlc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93S2luZ1Bhb1Byb2dyZXNzKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lT25Qcml6ZUdldFJld2FyZDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPblByaXplR2V0UmV3YXJlZChyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHBhZ2VUcy5wYWdlTmFtZS5HYW1lUmFuZG9tUmVkUHJpemU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmFuZG9tUmVkUHJpemUocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBwYWdlVHMucGFnZU5hbWUuR2FtZVR1cnJldFJhbmRvbVJlZDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUdXJyZXRSYW5kb21SZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcblxyXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVG9vbF9Vc2UsICh0eXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IHByb3BUeXBlLmNscykgeyAgICAgICAgICAgICAgICAgICAgICAgICAvL+a4heWxjyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLnBsYXlNdXNpYyhOYW1lVHMuVG9vbE11c2ljQ2xzKTtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3QucGxheVRvb2xDbHMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLmF1dG8pIHsgICAgICAgICAgICAgICAgICAvL+iHquWKqOWQiOaIkFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLnNob2NrKSB7ICAgICAgICAgICAgICAgICAgLy/nlLXlh7tcclxuICAgICAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24ucGxheU11c2ljKE5hbWVUcy5Ub29sTXVzaWNTaG9jayk7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0LnBsYXlUb29sU2hvY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLnNoaWVsZCkgeyAgICAgICAgICAgICAgICAgLy/miqTnm75cclxuICAgICAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24ucGxheU11c2ljKE5hbWVUcy5Ub29sTXVzaWNTaGllbGQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuU2hpZWxkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBwcm9wVHlwZS5mcm96ZW4pIHsgICAgICAgICAgICAgICAgIC8v5Yaw5Ya7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0LnBsYXlUb29sRnJvemVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgLy8g5YWz6Zet5oqk55u+XHJcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuQ2xvc2VfU2hpZWxkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTaGllbGQoKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmlrDmiYvlvJXlr7zmmK/lkKbov4fkuoY6XCIsICd0aGlzLl91c2VyRGF0YS5ub3ZpY2VHdWlkZScpXHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLm5vdmljZUd1aWRlICE9PSAtMSAmJiB0aGlzLl91c2VyRGF0YS50dXJyZXRMZXZlbCA8IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlckRhdGEubm92aWNlR3VpZGUgPSAxO1xyXG4gICAgICAgICAgICBpZiAodXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5uZXdfaGFuZF90ZXN0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUd1aWRlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHdWlkZTIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1dGlsLnNlbmRUdXJyZXREYXRhKCk7XHJcblxyXG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3Quc2lnbl9tYWluLFxyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmlzT2tTaWduID0gcmVzLmRhdGEudG9kYXlDaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl91c2VyRGF0YS5uZXdVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdXNlckRhdGEub2ZmbGluZUluY29tZSAmJiB0aGlzLl91c2VyRGF0YS5vZmZsaW5lSW5jb21lLnJld2FyZCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lT2ZmbGluZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVTdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5GaXN0R2FtZVN0YXJ0KDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcGVuT25saW5lVGltZSgpO1xyXG4gICAgICAgIC8vIHRoaXMub3Blbk9uTGluZVByaXplVGltZXIoKTtcclxuICAgICAgICB0aGlzLmNoZWNrQmdJbWFnZSgpO1xyXG5cclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvY29z5ri45oiP6L+b5YWl5ZCO5Y+w5pe26Kem5Y+R55qE5LqL5Lu244CCXCIpXHJcbiAgICAgICAgICAgIC8v6YCA5Ye65pe26Ze0XHJcbiAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkub2ZmbGluZVRpbWUsIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgWE1TREsudHJhY2tVc2VyUHJvcGVydGllcyh7XHJcbiAgICAgICAgICAgICAgICBzeW50aGVzaXNfdGltZXNfaGNkZzogdGhpcy5fdXNlckRhdGEuc3ludGhlc2lzX0FsbCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJEYXRhLnN5bnRoZXNpc19BbGwgPSAwO1xyXG5cclxuICAgICAgICAgICAgdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5vbmxpbmVUaW1lLCB1dGlsLm9ubGluZVRpbWVOdW0pO1xyXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LnJhbmRvbVJlZFRpbWVOdW0sIHV0aWwucmFuZG9tUmVkVGltZU51bSk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29jb3PmuLjmiI/ov5vlhaXliY3lj7Dov5DooYzml7bop6blj5HnmoTkuovku7bjgIJcIilcclxuICAgICAgICAgICAgdXRpbC5vZmZsaW5lVHVycmV0UHJvZHVjdCgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl91c2VyRGF0YS51bmxvY2tpbmdfdGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyRGF0YS51bmxvY2tpbmdfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LnVubG9ja2luZ190aW1lLCB0aGlzLl91c2VyRGF0YS51bmxvY2tpbmdfdGltZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3Blbk9ubGluZVRpbWUoKSB7XHJcbiAgICAgICAgaWYgKCF1dGlsLmNoZWtjVG9kYXkoKSkge1xyXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5Lm9ubGluZVRpbWUsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb25UaW1lID0gdXRpbC5nZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5vbmxpbmVUaW1lKVxyXG4gICAgICAgIGlmIChvblRpbWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5Lm9ubGluZVRpbWUsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXRpbC5vbmxpbmVUaW1lTnVtID0gb25UaW1lO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICB1dGlsLm9ubGluZVRpbWVOdW0rKztcclxuICAgICAgICAgICAgUmVkQ29udHJvbGxlci5jaGVja01haW5TaWduUmVkKCk7XHJcbiAgICAgICAgfSwgMSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5pu/5o2i6IOM5pmv5Zu+54mHXHJcbiAgICAqL1xyXG4gICAgY2hlY2tCZ0ltYWdlKCkge1xyXG4gICAgICAgIGxldCBiZ0ltYWdlRGF0YSA9IEFzc2lzdEN0ci5jaGVja0x2QmcodGhpcy5fdXNlckRhdGEuY3VzdG9tcy5iaWcpO1xyXG4gICAgICAgIGxldCBiZ0luZGV4ID0gYmdJbWFnZURhdGEubWFwSWQgLSAxO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pbWFnZV9iZyAmJiB0aGlzLmltYWdlX2JnQXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2VfYmdBcnJheVtiZ0luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZV9iZy5zcHJpdGVGcmFtZSA9IHRoaXMuaW1hZ2VfYmdBcnJheVtiZ0luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VfYmcuc3ByaXRlRnJhbWUgPSB0aGlzLmltYWdlX2JnQXJyYXlbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xyXG4gICAgICAgIC8vIHRoaXMuY3VzdG9tc0xhYmVsLm5vZGUuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChiZ0ltYWdlRGF0YS5jb2xvcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuQ2xvc2VfTG9hZFBhZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxpbmVQcml6ZVRpbWVyOyAgICAgICAgICAgLy/lnKjnur/lpZblirHlgJLorqHml7blmahcclxuICAgIHByaXZhdGUgb25MaW5lUHJpemVUaW1lTnVtID0gMDsgICAgIC8v5Zyo57q/5aWW5Yqx5YCS6K6h5pe25pe26Ze0XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDlnKjnur/lpZblirFcclxuICAgICAqL1xyXG4gICAgb3Blbk9uTGluZVByaXplVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm9uTGluZVByaXplVGltZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkxpbmVQcml6ZVRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWwubGV2ZWxTdGF0ZSAhPSBnYW1lU3RhdGUuc3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25MaW5lUHJpemVUaW1lTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub25MaW5lUHJpemVUaW1lTnVtID4gdXRpbC5vbmxpbmVfdGltZSkgeyAgICAgICAgLy/lnKjnur/miZPmgKrljYrkuKrlsI/ml7blkI7oh6rliqjlvLnnqpflnKjnur/lpZblirHlvLnnqpdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZU9uTGluZVByaXplVGltZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maXggYnVnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ2V0T25MaW5lUHJpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3Blbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHBhZ2VUcy5wYWdlTmFtZS5HYW1lT25MaW5lUHJpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludDogZGF0YS5wb2ludFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxpbmVQcml6ZVRpbWVOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKE1hdGguZmxvb3IoTnVtYmVyKGRhdGEubGVmdFRpbWUpIC8gMTAwMCkgPCB1dGlsLm9ubGluZV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTGluZVByaXplVGltZU51bSA9IE1hdGguZmxvb3IoTnVtYmVyKGRhdGEubGVmdFRpbWUpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuT25MaW5lUHJpemVUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChyZXMubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreWcqOe6v+WlluWKsVxyXG4gICAgICovXHJcbiAgICBjbG9zZU9uTGluZVByaXplVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25MaW5lUHJpemVUaW1lciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5vbkxpbmVQcml6ZVRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5vbkxpbmVQcml6ZVRpbWVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5ZCv5oqk55u+XHJcbiAgICAgKi9cclxuICAgIG9wZW5TaGllbGQoKSB7XHJcbiAgICAgICAgdGhpcy5za2VfaHVkdW4uZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSkucGxheUFuaW1hdGlvbihcImh1ZHVuXCIsIDEpXHJcbiAgICAgICAgdGhpcy5za2VfaHVkdW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreaKpOebvlxyXG4gICAgICovXHJcbiAgICBjbG9zZVNoaWVsZCgpIHtcclxuICAgICAgICB0aGlzLnNrZV9odWR1bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5PmnZ/muLjmiI9cclxuICAgICAqL1xyXG4gICAgc2hvd0VuZCgpIHtcclxuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lRW5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmuWFs+aIkOWKn1xyXG4gICAgICovXHJcblxyXG4gICAgc2hvd1Bhc3MoKSB7XHJcbiAgICAgICAgdXRpbC5PcGVuaW5nX3RpbWVzX2xldmVsID0gMDtcclxuICAgICAgICAvLyB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lUGFzcyk7XHJcbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVBhc3NSZXdhcmQyKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5cclxuICAgICAqL1xyXG5cclxuICAgIHNob3dTZXQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgZPlhbdcclxuICAgICAqL1xyXG5cclxuICAgIHNob3dQcm9wKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVQcm9wKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnrb7liLBcclxuICAgICAqL1xyXG4gICAgc2hvd1NpZ24oZGF0YSA9IG51bGwpIHtcclxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5zaWduX21haW4sXHJcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVTaWduLCByZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiAgICAgXHJcbiAgICAgKiDnrb7liLDlpZblirFcclxuICAgICAqL1xyXG4gICAgc2hvd1NpZ25SZXdhcmQoZGF0YSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lU2lnblJld2FyZCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaPkOeOsFxyXG4gICAgICovXHJcbiAgICBzaG93V2FsbGV0KCkge1xyXG4gICAgICAgIHV0aWwuc2VuZFR1cnJldERhdGEoKCkgPT4ge1xyXG4gICAgICAgICAgICAvL2ZpeCBidWdcclxuXHJcbiAgICAgICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC53YWxsZXRfbWFpbjIsXHJcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVXYWxsZXQsIHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkOeOsOiusOW9lemhtVxyXG4gICAgICovXHJcbiAgICBzaG93V2FsbGV0UmVjb3JkKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVXYWxsZXRSZWNvcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC5aSx6LSl5qGGXHJcbiAgICAgKi9cclxuICAgIHNob3dOZXR3b3JrTG9zdChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZU5ldHdvcmtMb3N0LCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWbvumJtFxyXG4gICAgICovXHJcbiAgICBzaG93VHVKaWFuKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUdUppYW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS255uK57+75YCNXHJcbiAgICAgKi9cclxuICAgIHNob3dFYXJuaW5ncygpIHtcclxuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lRWFybmluZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lu75YqhXHJcbiAgICAgKi9cclxuICAgIHNob3dUYXNrKCkge1xyXG4gICAgICAgIHV0aWwuZ2V0ZGF0YVN0cih7XHJcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QudGFza19kYXlfbWFpbixcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVRhc2ssIHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop4bpopHliqDovb1sb2FkaW5nXHJcbiAgICAgKi9cclxuICAgIHNob3dBZExvYWRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUFkTG9hZGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljYfnuqdcclxuICAgICAqL1xyXG4gICAgc2hvd1VwZ3JhZGUoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVVwZ3JhZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YGT5YW36I635Y+W5by556qXXHJcbiAgICAgKi9cclxuICAgIHNob3dUb29sR2V0KGRhdGEpIHtcclxuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVG9vbEdldCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOW8gOWQr+WcqOe6v+WlluWKseWAkuiuoeaXtlxyXG4gICAgKi9cclxuICAgIHNob3dPbkxpbmVQcml6ZShkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZU9uTGluZVByaXplLCBkYXRhKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICog5oy955WZXHJcbiAgICovXHJcbiAgICBzaG93RGV0ZW50aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVEZXRlbnRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5ZCv5paw5omL5Lu75YqhXHJcbiAgICAgKi9cclxuICAgIHNob3dOZXdQbGF5ZXJUYXNrKCkge1xyXG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0Lm5ld1BsYXllclRhc2tEYXRhLFxyXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lTmV3UGxheWVyVGFzaywgcmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAqIOeCrueOi+S7u+WKoVxyXG4gICAgICAgKi9cclxuICAgIHNob3dLaW5nUGFvKCkge1xyXG4gICAgICAgIC8vZml4IGJ1Z1xyXG5cclxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5raW5nUGFvVGFza0RhdGEsXHJcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvLCByZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAocmVzLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngq7njovku7vliqHov5vluqZcclxuICAgICAqL1xyXG4gICAgc2hvd0tpbmdQYW9Qcm9ncmVzcyhjbGlja0RhdGEpIHtcclxuICAgICAgICBpZiAoY2xpY2tEYXRhKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9maXggYnVnXHJcblxyXG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmtpbmdQYW9Qcm9ncmVzcyxcclxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLnN0YXR1cyA9PSAxICYmIHJlcy5kYXRhLnNpZ24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChg5LuK5pel5omT5Y2h5oiQ5YqfIeaYjuaXpeWGjeadpeWTpn5gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEuc3RhdHVzID09IDIgJiYgdXRpbC5pc09rU2lnbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKGDku4rml6Xlt7Lnrb7liLAh5piO5pel5YaN5p2l5ZOmfmApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUtpbmdQYW9Qcm9ncmVzcywgcmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChyZXMubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnrb7liLDlpITlnKjnur/lpZblirHnuqLljIVcclxuICAgICAqL1xyXG4gICAgc2hvd09uUHJpemVHZXRSZXdhcmVkKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnByaXplUmVkRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lT25Qcml6ZUdldFJld2FyZCwgZGF0YS5wcml6ZVJlZERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOmaj+acuue6ouWMhVxyXG4gICAgICovXHJcbiAgICBzaG93UmFuZG9tUmVkUHJpemUoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVSYW5kb21SZWRQcml6ZSwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDlkIjmiJDngq7loZTpmo/mnLrnuqLljIVcclxuICAgICAqL1xyXG4gICAgc2hvd1R1cnJldFJhbmRvbVJlZCgpIHtcclxuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHVycmV0UmFuZG9tUmVkKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnrKzkuIDmrKHlvIDlp4vmuLjmiI9cclxuICAgICAqL1xyXG5cclxuICAgIEZpc3RHYW1lU3RhcnQoZSkge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1N0YXJ0KTtcclxuICAgICAgICB9LCAuMyk7XHJcbiAgICB9XHJcbn1cclxuIl19