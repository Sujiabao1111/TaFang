
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f6997vhTAxLWosHflgFMqR2', 'ui');
// Script/ui/ui.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var RedController_1 = require("../controlelr/RedController");
var PageManage_1 = require("../PageManage");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//更-多-源-码-联-系-Q:30-387-459-55
var ui = /** @class */ (function (_super) {
    __extends(ui, _super);
    function ui() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customsLabel = null; //关卡label
        _this.videoIcon = null; //视频
        _this.topBar = null; //顶部
        _this.productLabel = null; //产能值
        _this.touchNode = null; //用于拖动位置的
        _this.coinLabel = null; //金币
        _this.buyBtnNode = null; //购买按钮
        _this.turret = null; //炮塔
        _this.savePotIcon = null; //存钱罐
        _this.propBox = null; //道具弹窗
        _this.buyEnergy = null; //进度条
        _this.btn_newPlayerTask = null;
        _this.btn_kingPao = null;
        _this.recycleNode = null;
        _this.gameStatePic = null; //开关Sprite
        _this.gameStateSpriteFrame = []; //开关SpriteFrame
        _this.EnergyNum = 0; //产能
        _this.mainTask_red = null;
        _this.lable_redNum = null;
        _this.signRed_red = null;
        _this.wheel_red = null;
        return _this;
    }
    ui.prototype.onLoad = function () {
        var _this = this;
        this.topBar.top += Number(util_1.default.iphoneXTop);
        //数据更新
        cc.game.on(NameTs_1.default.Game_View_UserDataUpdata, function (res) {
            _this.updateData(res);
        }, this);
        this.productNum = faceTs_1.gameNumerical.ProductTime;
        this.updateData(faceTs_1.updateType.product);
        this.updateData(faceTs_1.updateType.coin);
        util_1.default.GlobalMap.set("coin", this.coinLabel.node.getParent().children[0]);
        util_1.default.GlobalMap.set("turretBuy", this.turret);
        util_1.default.GlobalMap.set("savingPot", this.savePotIcon);
        //拿起
        cc.game.on(NameTs_1.default.Game_Turret_PickUp, function (res) {
            _this.buyBtnNode.active = false;
            _this.turret.active = false;
            _this.recycleNode.active = true;
        }, this);
        //放下
        cc.game.on(NameTs_1.default.Game_Turret_PutDown, function (res) {
            _this.buyBtnNode.active = true;
            _this.turret.active = true;
            _this.recycleNode.active = false;
        }, this);
        //关卡标题更新
        cc.game.on(NameTs_1.default.Game_View_CustomsUpdata, function () {
            _this.changeLevelData();
        }, this);
        cc.game.on(NameTs_1.default.Game_Tool_Use, function () {
            if (util_1.default.levelState == faceTs_1.gameState.stop) {
                _this.stopGame();
            }
        }, this);
        cc.game.on(NameTs_1.default.Game_Stop, function () {
            _this.gameStatePic.spriteFrame = _this.gameStateSpriteFrame[util_1.default.levelState == 1 ? 1 : 0];
        }, this);
        cc.game.on(NameTs_1.default.Game_Resume, function () {
            _this.gameStatePic.spriteFrame = _this.gameStateSpriteFrame[util_1.default.levelState == 1 ? 1 : 0];
        }, this);
        cc.game.on(NameTs_1.default.onBackPressed, function () {
            console.log("安卓调用物理返回键并取消cocos监听");
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, _this.onBackPressed, _this);
            _this.onBackPressed();
        }, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onBackPressed, this);
        cc.game.on(NameTs_1.default.Game_Start, function () {
            if (util_1.default.isCheckTaskRed) {
                util_1.default.isCheckTaskRed = false;
                RedController_1.default.checkTaskRed(function (okNum) {
                    if (okNum && okNum > 0) {
                        _this.mainTask_red.active = true;
                        _this.lable_redNum.string = okNum;
                    }
                    else {
                        _this.mainTask_red.active = false;
                    }
                });
            }
        }, this);
        cc.game.on(NameTs_1.default.Game_Main_Task_updata, function (res) {
            if (res != null) {
                util_1.default.isCheckTaskRed = false;
                _this.mainTask_red.active = res > 0;
                _this.lable_redNum.string = res;
            }
        }, this);
        if (!util_1.default.chekcToday()) {
            util_1.default.userData.GetTurretNum = 18;
            util_1.default.setStorage(util_1.default.localDiary.GetTurretNum, util_1.default.userData.GetTurretNum);
        }
        cc.tween(this.buyEnergy).repeatForever(cc.tween().to(2, { x: 319 / 2 }).to(0, { x: -319 / 2 })).start();
        cc.game.on(NameTs_1.default.Game_CloseNewPlayerTask, function () {
            _this.btn_newPlayerTask.active = false;
        }, this);
        console.log("------------------------开1始---------------------");
        //fix bug
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.newPlayerTaskData,
            onSuccess: function (res) {
                if (!_this.isValid) {
                    return;
                }
                console.log("2222222222 url: UrlConst.newPlayerTaskData, :" + res.data);
                if (!res || res.code != 0 || !res.data || !res.data.withdrawTaskItemVoMap) {
                    _this.btn_newPlayerTask.active = false;
                }
                else {
                    _this.btn_newPlayerTask.active = true;
                    if (_this.btn_newPlayerTask.getChildByName("light")) {
                        var image = _this.btn_newPlayerTask.getChildByName("light");
                        image.stopAllActions();
                        cc.tween(image).by(1, { angle: -360 }).repeatForever().start();
                    }
                    if (_this.btn_newPlayerTask.getChildByName("image")) {
                        var image = _this.btn_newPlayerTask.getChildByName("image");
                        cc.tween(image).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
                    }
                }
            },
            onFail: function (err) {
            }
        });
        if (this.btn_kingPao.getChildByName("light")) {
            var image = this.btn_kingPao.getChildByName("light");
            image.stopAllActions();
            cc.tween(image).by(1, { angle: -360 }).repeatForever().start();
        }
        RedController_1.default.initGoldWheelData(this.wheel_red);
        RedController_1.default.initSignRedData(this.signRed_red);
    };
    ui.prototype.start = function () {
        var _this = this;
        this.changeLevelData();
        // 将垃圾箱放进levelMap数组进去
        this.scheduleOnce(function () {
            var pos = _this.recycleNode.getParent().convertToWorldSpaceAR(_this.recycleNode.getPosition());
            pos = _this.touchNode.convertToNodeSpaceAR(pos);
            util_1.default.levelMap.push({
                type: faceTs_1.thingType.recycle,
                pos: pos,
                width: _this.recycleNode.width,
                height: _this.recycleNode.height
            });
        }, .1);
    };
    /**
     * 购买
     */
    ui.prototype.buyBtn = function () {
        cc.game.emit(NameTs_1.default.Game_Turret_Creator);
    };
    /**
     * 暂停游戏
     */
    ui.prototype.stopGame = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "暂停",
            app_exposure_type: "icon",
        });
        soundController_1.default.singleton.clickAudio();
        util_1.default.levelState = util_1.default.levelState == faceTs_1.gameState.stop ? faceTs_1.gameState.start : faceTs_1.gameState.stop;
        cc.game.emit(util_1.default.levelState == faceTs_1.gameState.stop ? NameTs_1.default.Game_Stop : NameTs_1.default.Game_Resume);
        this.gameStatePic.spriteFrame = this.gameStateSpriteFrame[util_1.default.levelState == 1 ? 1 : 0];
        util_1.default.isStop = !util_1.default.isStop;
    };
    /**
     * 设置游戏
     */
    ui.prototype.SetGame = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "设置",
            app_exposure_type: "icon",
        });
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameSet);
    };
    /**
     * 图鉴
     */
    ui.prototype.TuJianGame = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "图鉴",
            app_exposure_type: "banner",
        });
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameTuJian);
    };
    /**
     * 道具
     */
    ui.prototype.PropGame = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "道具",
            app_exposure_type: "banner",
        });
        soundController_1.default.singleton.clickAudio();
        this.propBox.active = !this.propBox.active;
        // cc.game.emit(NameTs.Game_Pop_Open,pageTs.pageName.GameProp);
    };
    /**
     * 签到
     */
    ui.prototype.SignGame = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "签到",
            app_exposure_type: "icon",
        });
        if (this.signRed_red.active) {
            TrackMgr_1.default.little_red_dots({
                activity_state: "小红点点击",
                activity_position: "签到",
            });
        }
        else {
            TrackMgr_1.default.little_red_dots({
                activity_state: "普通点击（非小红点）",
                activity_position: "签到",
            });
        }
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameSign);
    };
    /**
     * 提现
     */
    ui.prototype.walletGame = function (e, data) {
        if (data == 1) {
            TrackMgr_1.default.AppClick({
                app_page_title: "首页",
                app_ck_module: "升级提现",
                app_exposure_type: "icon",
            });
        }
        else {
            TrackMgr_1.default.AppClick({
                app_page_title: "首页",
                app_ck_module: "提现",
                app_exposure_type: "icon",
            });
        }
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameWallet);
    };
    /**
     * 收益翻倍
     */
    ui.prototype.EarnGame = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "收益翻倍",
            app_exposure_type: "banner",
        });
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameEarnings);
    };
    /**
     * 任务
     */
    ui.prototype.TaskGame = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "任务",
            app_exposure_type: "banner",
        });
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameTask);
    };
    /**
     * 点击物理返回键
     */
    ui.prototype.onBackPressed = function () {
        if (PageManage_1.default.singleton.findPage(pageTs_1.default.pageName.GameDetention)) {
            PageManage_1.default.singleton.closePage(pageTs_1.default.pageName.GameDetention, true);
        }
        else {
            cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameDetention);
        }
    };
    /**
     * 展示新手任务
     */
    ui.prototype.clickNewPlayerTask = function () {
        TrackMgr_1.default.newcomer_mission({
            activity_state: "\u300C\u65B0\u4EBA\u4EFB\u52A1\u300D\u6309\u94AE\u70B9\u51FB"
        });
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "新人提现",
            app_exposure_type: "Icon",
        });
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameNewPlayerTask);
    };
    /**
     * 展示炮王任务
     */
    ui.prototype.clickKingPaoTask = function () {
        TrackMgr_1.default.artillery_bonus({
            activity_state: "\u300C\u767E\u4E07\u5206\u7EA2\u300D\u6309\u94AE\u70B9\u51FB"
        });
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "百元分红",
            app_exposure_type: "Icon",
        });
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameKingPao);
    };
    /**
     * 点击金币转盘
     */
    ui.prototype.clickGoldWheel = function () {
        PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.GameGoldWheel);
        TrackMgr_1.default.big_turntable({
            activity_state: "首页抽手机位置点击"
        });
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "大转盘"
        });
        if (this.wheel_red.active) {
            TrackMgr_1.default.little_red_dots({
                activity_state: "小红点点击",
                activity_position: "大转盘",
            });
        }
        else {
            TrackMgr_1.default.little_red_dots({
                activity_state: "普通点击（非小红点）",
                activity_position: "大转盘",
            });
        }
        RedController_1.default.checkMainGoldWheelRed(false);
    };
    /**
     * 抽手机
     */
    ui.prototype.clickNewBigWheel = function () {
        PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.NewBigWheelController);
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "抽手机"
        });
    };
    /**
     * 增加储存值
     */
    ui.prototype.productTurret = function (dt) {
        if (util_1.default.userData.product >= faceTs_1.gameNumerical.ProductMax) {
            this.buyEnergy.y = -50 + 30 * 5;
            return;
        }
        if (util_1.default.levelState == faceTs_1.gameState.stop)
            return;
        util_1.default.gameTime += dt;
        this.productNum -= dt;
        this.EnergyNum += dt;
        this.buyEnergy.y = -50 + this.EnergyNum * 5;
        if (this.productNum <= 0) {
            console.log(this.EnergyNum, 'this.EnergyNum');
            this.EnergyNum = 0;
            this.buyEnergy.y = -50;
            this.productNum = faceTs_1.gameNumerical.ProductTime;
            util_1.default.productTurret();
            this.updateData(faceTs_1.updateType.product);
            return;
        }
    };
    /**
     * 更新数据
     * @param type 哪个
     */
    ui.prototype.updateData = function (type) {
        var userData = util_1.default.userData;
        switch (type) {
            case faceTs_1.updateType.coin:
                this.coinLabel.string = String(userData.coin);
                break;
            case faceTs_1.updateType.hongbao:
                break;
            case faceTs_1.updateType.product:
                this.productLabel.string = userData.product + "/" + faceTs_1.gameNumerical.ProductMax;
                if (util_1.default.userData.GetTurretNum > 0) {
                    this.productLabel.node.active = userData.product > 0;
                    this.videoIcon.active = userData.product <= 0;
                }
                else {
                    this.videoIcon.active = false;
                    this.productLabel.node.active = true;
                }
                RedController_1.default.checkMainGoldWheelRed();
                break;
        }
    };
    ui.prototype.update = function (dt) {
        this.productTurret(dt);
        this.propMonitor(dt);
    };
    /**
     * 道具使用监听
     * @param dt
     */
    ui.prototype.propMonitor = function (dt) {
        var propData = util_1.default.userData.prop;
        var frozenData = propData[faceTs_1.propType.frozen - 1];
        var shockData = propData[faceTs_1.propType.shock - 1];
        var shieldData = propData[faceTs_1.propType.shield - 1];
        var autoData = propData[faceTs_1.propType.auto - 1];
        var energizedData = propData[faceTs_1.propType.energized - 1];
        this.propCountDown(frozenData, dt);
        this.propCountDown(shockData, dt);
        this.propCountDown(shieldData, dt);
        this.propCountDown(autoData, dt);
        this.propCountDown(energizedData, dt);
        this.propCountDown(util_1.default.doubleEarn, dt);
    };
    /**
     * 倒计时
     * @param data 数据
     * @param dt
     */
    ui.prototype.propCountDown = function (data, dt) {
        if (data.use == faceTs_1.propState.start && util_1.default.levelState == faceTs_1.gameState.start) {
            data.time -= dt;
            if (data.time <= 0) {
                data.use = faceTs_1.propState.end;
                data.time = null;
                if (data.type == 3) {
                    cc.game.emit(NameTs_1.default.Close_Shield);
                }
            }
        }
    };
    /**
     * 更新关卡title
     */
    ui.prototype.changeLevelData = function () {
        var userData = util_1.default.userData; //用户数据
        var bigLevel = userData.customs.big; //大关卡
        var samllLevel = userData.customs.small; //小关卡
        console.log("关卡" + bigLevel + "-" + samllLevel);
        this.customsLabel.string = bigLevel + "-" + samllLevel;
    };
    /**
     * 改变炮塔等级
    */
    ui.prototype.changeTurretBuy = function () {
        // let level:number = util.getBuyRandomLevel();
        // this.loadAny()
    };
    __decorate([
        property(cc.Label)
    ], ui.prototype, "customsLabel", void 0);
    __decorate([
        property(cc.Node)
    ], ui.prototype, "videoIcon", void 0);
    __decorate([
        property(cc.Widget)
    ], ui.prototype, "topBar", void 0);
    __decorate([
        property(cc.Label)
    ], ui.prototype, "productLabel", void 0);
    __decorate([
        property(cc.Node)
    ], ui.prototype, "touchNode", void 0);
    __decorate([
        property(cc.Label)
    ], ui.prototype, "coinLabel", void 0);
    __decorate([
        property(cc.Node)
    ], ui.prototype, "buyBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], ui.prototype, "turret", void 0);
    __decorate([
        property(cc.Node)
    ], ui.prototype, "savePotIcon", void 0);
    __decorate([
        property(cc.Node)
    ], ui.prototype, "propBox", void 0);
    __decorate([
        property(cc.Node)
    ], ui.prototype, "buyEnergy", void 0);
    __decorate([
        property(cc.Node) //新手任务Icon
    ], ui.prototype, "btn_newPlayerTask", void 0);
    __decorate([
        property(cc.Node) //炮王任务Icon
    ], ui.prototype, "btn_kingPao", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "垃圾回收节点" })
    ], ui.prototype, "recycleNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], ui.prototype, "gameStatePic", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ui.prototype, "gameStateSpriteFrame", void 0);
    __decorate([
        property(cc.Node) //首页任务红点
    ], ui.prototype, "mainTask_red", void 0);
    __decorate([
        property(cc.Label) //首页红点可领取任务数量
    ], ui.prototype, "lable_redNum", void 0);
    __decorate([
        property(cc.Node) //首页签到红点
    ], ui.prototype, "signRed_red", void 0);
    __decorate([
        property(cc.Node) //首页大转盘红点
    ], ui.prototype, "wheel_red", void 0);
    ui = __decorate([
        ccclass
    ], ui);
    return ui;
}(cc.Component));
exports.default = ui;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQTRIO0FBQzVILDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsNkRBQXdEO0FBRXhELDRDQUF1QztBQUN2QywrQ0FBOEM7QUFDOUMscURBQWdEO0FBQ2hELHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBQzFDLDZCQUE2QjtBQUU3QjtJQUFnQyxzQkFBWTtJQUE1QztRQUFBLHFFQXNrQkM7UUFua0JHLGtCQUFZLEdBQWEsSUFBSSxDQUFDLENBQUMsU0FBUztRQUd4QyxlQUFTLEdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSTtRQUc5QixZQUFNLEdBQWEsSUFBSSxDQUFDLENBQUMsSUFBSTtRQUc3QixrQkFBWSxHQUFZLElBQUksQ0FBQyxDQUFDLEtBQUs7UUFHbkMsZUFBUyxHQUFXLElBQUksQ0FBQyxDQUFDLFNBQVM7UUFHbkMsZUFBUyxHQUFZLElBQUksQ0FBQyxDQUFDLElBQUk7UUFHL0IsZ0JBQVUsR0FBVyxJQUFJLENBQUMsQ0FBQyxNQUFNO1FBR2pDLFlBQU0sR0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBRzNCLGlCQUFXLEdBQVcsSUFBSSxDQUFDLENBQUMsS0FBSztRQUdqQyxhQUFPLEdBQVcsSUFBSSxDQUFDLENBQUMsTUFBTTtRQUc5QixlQUFTLEdBQVcsSUFBSSxDQUFDLENBQUMsS0FBSztRQUcvQix1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHakMsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFHbkIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFHbkMsa0JBQVksR0FBYSxJQUFJLENBQUMsQ0FBQyxVQUFVO1FBRXpDLDBCQUFvQixHQUFvQixF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MkNBQ1Q7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLENBQUM7MkNBQ1g7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FDVTtJQUU5QjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvREFDZ0I7SUFNM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFNLFFBQVE7NENBQ0k7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFLLGFBQWE7NENBQ0E7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFNLFFBQVE7MkNBQ0c7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFNLFNBQVM7eUNBQ0E7SUE5RGhCLEVBQUU7UUFEdEIsT0FBTztPQUNhLEVBQUUsQ0Fza0J0QjtJQUFELFNBQUM7Q0F0a0JELEFBc2tCQyxDQXRrQitCLEVBQUUsQ0FBQyxTQUFTLEdBc2tCM0M7a0JBdGtCb0IsRUFBRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgeyBnYW1lTnVtZXJpY2FsLCBnYW1lUGFzcywgZ2FtZVN0YXRlLCBwcm9wSW5mbywgcHJvcFN0YXRlLCBwcm9wVHlwZSwgdGhpbmdUeXBlLCB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBSZWRDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sZWxyL1JlZENvbnRyb2xsZXJcIjtcbmltcG9ydCB1c2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4uL1BhZ2VNYW5hZ2VcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcbi8v5pu0LeWkmi3mupAt56CBLeiBlC3ns7stUTozMC0zODctNDU5LTU1XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGN1c3RvbXNMYWJlbDogY2MuTGFiZWwgPSBudWxsOyAvL+WFs+WNoWxhYmVsXG4gICAgXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdmlkZW9JY29uOmNjLk5vZGUgPSBudWxsOyAvL+inhumikVxuICAgIFxuICAgIEBwcm9wZXJ0eShjYy5XaWRnZXQpXG4gICAgdG9wQmFyOmNjLldpZGdldCA9IG51bGw7IC8v6aG26YOoXG4gXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByb2R1Y3RMYWJlbDpjYy5MYWJlbCA9IG51bGw7IC8v5Lqn6IO95YC8XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0b3VjaE5vZGU6Y2MuTm9kZSA9IG51bGw7IC8v55So5LqO5ouW5Yqo5L2N572u55qEXG4gXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvaW5MYWJlbDpjYy5MYWJlbCA9IG51bGw7IC8v6YeR5biBXG4gICAgXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnV5QnRuTm9kZTpjYy5Ob2RlID0gbnVsbDsgLy/otK3kubDmjInpkq5cbiAgICBcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0dXJyZXQ6Y2MuTm9kZSA9IG51bGw7IC8v54Ku5aGUXG4gICAgXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2F2ZVBvdEljb246Y2MuTm9kZSA9IG51bGw7IC8v5a2Y6ZKx572QXG4gICAgXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvcEJveDpjYy5Ob2RlID0gbnVsbDsgLy/pgZPlhbflvLnnqpdcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidXlFbmVyZ3k6Y2MuTm9kZSA9IG51bGw7IC8v6L+b5bqm5p2hXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgICAgICAgIC8v5paw5omL5Lu75YqhSWNvblxuICAgIGJ0bl9uZXdQbGF5ZXJUYXNrOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpICAgICAgICAvL+eCrueOi+S7u+WKoUljb25cbiAgICBidG5fa2luZ1BhbzpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWeg+WcvuWbnuaUtuiKgueCuVwifSlcbiAgICBwcml2YXRlIHJlY3ljbGVOb2RlOmNjLk5vZGUgPSBudWxsOyBcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGdhbWVTdGF0ZVBpYzpjYy5TcHJpdGUgPSBudWxsOyAvL+W8gOWFs1Nwcml0ZVxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGdhbWVTdGF0ZVNwcml0ZUZyYW1lOmNjLlNwcml0ZUZyYW1lW10gPSBbXTsgLy/lvIDlhbNTcHJpdGVGcmFtZVxuXG4gICAgcHJpdmF0ZSBwcm9kdWN0TnVtOm51bWJlcjsvL+S6p+iDvVxuICAgIHByaXZhdGUgRW5lcmd5TnVtOm51bWJlciA9IDA7Ly/kuqfog71cblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSAgICAgIC8v6aaW6aG15Lu75Yqh57qi54K5XG4gICAgcHJpdmF0ZSBtYWluVGFza19yZWQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpICAgICAvL+mmlumhtee6oueCueWPr+mihuWPluS7u+WKoeaVsOmHj1xuICAgIHByaXZhdGUgbGFibGVfcmVkTnVtOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSAgICAgIC8v6aaW6aG1562+5Yiw57qi54K5XG4gICAgcHJpdmF0ZSBzaWduUmVkX3JlZDpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSAgICAgIC8v6aaW6aG15aSn6L2s55uY57qi54K5XG4gICAgcHJpdmF0ZSB3aGVlbF9yZWQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIHRoaXMudG9wQmFyLnRvcCArPSBOdW1iZXIodXRpbC5pcGhvbmVYVG9wKTtcblxuICAgICAgICAvL+aVsOaNruabtOaWsFxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1ZpZXdfVXNlckRhdGFVcGRhdGEsKHJlcyk9PntcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhKHJlcyk7XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICB0aGlzLnByb2R1Y3ROdW0gPSBnYW1lTnVtZXJpY2FsLlByb2R1Y3RUaW1lO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSh1cGRhdGVUeXBlLnByb2R1Y3QpO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGEodXBkYXRlVHlwZS5jb2luKTtcblxuICAgICAgICB1dGlsLkdsb2JhbE1hcC5zZXQoXCJjb2luXCIsdGhpcy5jb2luTGFiZWwubm9kZS5nZXRQYXJlbnQoKS5jaGlsZHJlblswXSk7XG4gICAgICAgIHV0aWwuR2xvYmFsTWFwLnNldChcInR1cnJldEJ1eVwiLHRoaXMudHVycmV0KTtcbiAgICAgICAgdXRpbC5HbG9iYWxNYXAuc2V0KFwic2F2aW5nUG90XCIsdGhpcy5zYXZlUG90SWNvbik7XG5cbiAgICAgICAgXG4gICAgICAgIC8v5ou/6LW3XG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHVycmV0X1BpY2tVcCwocmVzKT0+e1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmJ1eUJ0bk5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnR1cnJldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucmVjeWNsZU5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIC8v5pS+5LiLXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHVycmV0X1B1dERvd24sKHJlcyk9PntcblxuICAgICAgICAgICAgdGhpcy5idXlCdG5Ob2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnR1cnJldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWN5Y2xlTm9kZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIC8v5YWz5Y2h5qCH6aKY5pu05pawXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVmlld19DdXN0b21zVXBkYXRhLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTGV2ZWxEYXRhKCk7XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Ub29sX1VzZSwgKCk9PntcbiAgICAgICAgICAgIGlmKHV0aWwubGV2ZWxTdGF0ZSA9PSBnYW1lU3RhdGUuc3RvcCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgICBcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TdG9wLCAoKT0+eyAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGVQaWMuc3ByaXRlRnJhbWUgPSB0aGlzLmdhbWVTdGF0ZVNwcml0ZUZyYW1lW3V0aWwubGV2ZWxTdGF0ZT09MT8xOjBdO1xuICAgICAgICB9LCB0aGlzKVxuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfUmVzdW1lLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGVQaWMuc3ByaXRlRnJhbWUgPSB0aGlzLmdhbWVTdGF0ZVNwcml0ZUZyYW1lW3V0aWwubGV2ZWxTdGF0ZT09MT8xOjBdO1xuICAgICAgICB9LCB0aGlzKVxuXG4gICAgICAgIFxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5vbkJhY2tQcmVzc2VkLCAoKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlronljZPosIPnlKjniannkIbov5Tlm57plK7lubblj5bmtohjb2Nvc+ebkeWQrFwiKTtcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25CYWNrUHJlc3NlZCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uQmFja1ByZXNzZWQoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbkJhY2tQcmVzc2VkLCB0aGlzKTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1N0YXJ0LCAoKT0+e1xuICAgICAgICAgICAgaWYodXRpbC5pc0NoZWNrVGFza1JlZCl7XG4gICAgICAgICAgICAgICAgdXRpbC5pc0NoZWNrVGFza1JlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIFJlZENvbnRyb2xsZXIuY2hlY2tUYXNrUmVkKChva051bSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYob2tOdW0gJiYgb2tOdW0gPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblRhc2tfcmVkLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3JlZE51bS5zdHJpbmcgPSBva051bTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluVGFza19yZWQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX01haW5fVGFza191cGRhdGEsIChyZXMpPT57XG4gICAgICAgICAgICBpZihyZXMgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdXRpbC5pc0NoZWNrVGFza1JlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubWFpblRhc2tfcmVkLmFjdGl2ZSA9IHJlcyA+IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZWROdW0uc3RyaW5nID0gcmVzO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBpZighdXRpbC5jaGVrY1RvZGF5KCkpe1xuICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0gPSAxODtcbiAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkuR2V0VHVycmV0TnVtLHV0aWwudXNlckRhdGEuR2V0VHVycmV0TnVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuYnV5RW5lcmd5KS5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKCkudG8oMix7eDozMTkvMn0pLnRvKDAse3g6LTMxOS8yfSkpLnN0YXJ0KCk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9DbG9zZU5ld1BsYXllclRhc2ssICgpPT57XG4gICAgICAgICAgICB0aGlzLmJ0bl9uZXdQbGF5ZXJUYXNrLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LCB0aGlzKTtcblx0XHRjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeW8gDHlp4stLS0tLS0tLS0tLS0tLS0tLS0tLS1cIilcbiAgICAgICAgLy9maXggYnVnXG5cdFx0WE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0Lm5ld1BsYXllclRhc2tEYXRhLFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4geyAgIFxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMjIyMjIyMjIyMiB1cmw6IFVybENvbnN0Lm5ld1BsYXllclRhc2tEYXRhLCA6XCIgKyByZXMuZGF0YSApXG4gICAgICAgICAgICAgICAgaWYoIXJlcyB8fCByZXMuY29kZSAhPSAwIHx8ICFyZXMuZGF0YSB8fCAhcmVzLmRhdGEud2l0aGRyYXdUYXNrSXRlbVZvTWFwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5fbmV3UGxheWVyVGFzay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bl9uZXdQbGF5ZXJUYXNrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYnRuX25ld1BsYXllclRhc2suZ2V0Q2hpbGRCeU5hbWUoXCJsaWdodFwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSB0aGlzLmJ0bl9uZXdQbGF5ZXJUYXNrLmdldENoaWxkQnlOYW1lKFwibGlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSAuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGltYWdlKS5ieSgxLHthbmdsZTotMzYwfSkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYnRuX25ld1BsYXllclRhc2suZ2V0Q2hpbGRCeU5hbWUoXCJpbWFnZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSB0aGlzLmJ0bl9uZXdQbGF5ZXJUYXNrLmdldENoaWxkQnlOYW1lKFwiaW1hZ2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihpbWFnZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLHthbmdsZToxMH0pLnRvKC4yLHthbmdsZTowfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICkgICAgIFxuXG4gICAgICAgIGlmKHRoaXMuYnRuX2tpbmdQYW8uZ2V0Q2hpbGRCeU5hbWUoXCJsaWdodFwiKSl7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSB0aGlzLmJ0bl9raW5nUGFvLmdldENoaWxkQnlOYW1lKFwibGlnaHRcIik7XG4gICAgICAgICAgICBpbWFnZSAuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKGltYWdlKS5ieSgxLHthbmdsZTotMzYwfSkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XG4gICAgICAgIH0gICAgIFxuXG4gICAgICAgIFJlZENvbnRyb2xsZXIuaW5pdEdvbGRXaGVlbERhdGEodGhpcy53aGVlbF9yZWQpO1xuICAgICAgICBSZWRDb250cm9sbGVyLmluaXRTaWduUmVkRGF0YSh0aGlzLnNpZ25SZWRfcmVkKTtcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTGV2ZWxEYXRhKCk7XG5cbiAgICAgICAgLy8g5bCG5Z6D5Zy+566x5pS+6L+bbGV2ZWxNYXDmlbDnu4Tov5vljrtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHBvczpjYy5WZWMyID0gdGhpcy5yZWN5Y2xlTm9kZS5nZXRQYXJlbnQoKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5yZWN5Y2xlTm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIHBvcyA9IHRoaXMudG91Y2hOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcyk7XG4gICAgICAgICAgICB1dGlsLmxldmVsTWFwLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6dGhpbmdUeXBlLnJlY3ljbGUsXG4gICAgICAgICAgICAgICAgcG9zOnBvcyxcbiAgICAgICAgICAgICAgICB3aWR0aDp0aGlzLnJlY3ljbGVOb2RlLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDp0aGlzLnJlY3ljbGVOb2RlLmhlaWdodFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sLjEpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDotK3kubBcbiAgICAgKi9cbiAgICBidXlCdG4oKXtcblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0NyZWF0b3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaaguWBnOa4uOaIj1xuICAgICAqL1xuICAgIHN0b3BHYW1lKCl7XG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIummlumhtVwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLmmoLlgZxcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcbiAgICAgICAgfSlcblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdXRpbC5sZXZlbFN0YXRlID0gdXRpbC5sZXZlbFN0YXRlPT1nYW1lU3RhdGUuc3RvcD9nYW1lU3RhdGUuc3RhcnQ6Z2FtZVN0YXRlLnN0b3A7XG4gICAgICAgIGNjLmdhbWUuZW1pdCh1dGlsLmxldmVsU3RhdGU9PWdhbWVTdGF0ZS5zdG9wP05hbWVUcy5HYW1lX1N0b3A6TmFtZVRzLkdhbWVfUmVzdW1lKTtcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVQaWMuc3ByaXRlRnJhbWUgPSB0aGlzLmdhbWVTdGF0ZVNwcml0ZUZyYW1lW3V0aWwubGV2ZWxTdGF0ZT09MT8xOjBdO1xuICAgICAgICB1dGlsLmlzU3RvcCA9IXV0aWwuaXNTdG9wO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rua4uOaIj1xuICAgICAqL1xuICAgIFNldEdhbWUoKXtcbiAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6aaW6aG1XCIsXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBcIuiuvue9rlwiLFxuICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiaWNvblwiLFxuICAgICAgICB9KVxuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4scGFnZVRzLnBhZ2VOYW1lLkdhbWVTZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlm77pibRcbiAgICAgKi9cbiAgICBUdUppYW5HYW1lKCl7XG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIummlumhtVwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLlm77pibRcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImJhbm5lclwiLFxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbixwYWdlVHMucGFnZU5hbWUuR2FtZVR1Smlhbik7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIOmBk+WFt1xuICAgICAqL1xuICAgIFByb3BHYW1lKCl7XG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIummlumhtVwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLpgZPlhbdcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImJhbm5lclwiLFxuICAgICAgICB9KVxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5wcm9wQm94LmFjdGl2ZSA9ICF0aGlzLnByb3BCb3guYWN0aXZlO1xuICAgICAgICAvLyBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4scGFnZVRzLnBhZ2VOYW1lLkdhbWVQcm9wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog562+5YiwXG4gICAgICovXG4gICAgU2lnbkdhbWUoKXtcbiAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6aaW6aG1XCIsXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBcIuetvuWIsFwiLFxuICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiaWNvblwiLFxuICAgICAgICB9KVxuICAgICAgIFxuICAgICAgICBpZih0aGlzLnNpZ25SZWRfcmVkLmFjdGl2ZSl7XG4gICAgICAgICAgICBUcmFja01nci5saXR0bGVfcmVkX2RvdHMoe1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuWwj+e6oueCueeCueWHu1wiLFxuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3Bvc2l0aW9uOiBcIuetvuWIsFwiLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgVHJhY2tNZ3IubGl0dGxlX3JlZF9kb3RzKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLmma7pgJrngrnlh7vvvIjpnZ7lsI/nuqLngrnvvIlcIixcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9wb3NpdGlvbjogXCLnrb7liLBcIixcbiAgICAgICAgICAgIH0pICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbixwYWdlVHMucGFnZU5hbWUuR2FtZVNpZ24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmj5DnjrBcbiAgICAgKi9cbiAgICB3YWxsZXRHYW1lKGUsIGRhdGEpe1xuICAgICAgICBpZihkYXRhPT0xKXtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgICAgICBhcHBfcGFnZV90aXRsZTogXCLpppbpobVcIixcbiAgICAgICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBcIuWNh+e6p+aPkOeOsFwiLFxuICAgICAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIummlumhtVwiLFxuICAgICAgICAgICAgICAgIGFwcF9ja19tb2R1bGU6IFwi5o+Q546wXCIsXG4gICAgICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiaWNvblwiLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4scGFnZVRzLnBhZ2VOYW1lLkdhbWVXYWxsZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUtuebiue/u+WAjVxuICAgICAqL1xuICAgIEVhcm5HYW1lKCl7XG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIummlumhtVwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLmlLbnm4rnv7vlgI1cIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImJhbm5lclwiLFxuICAgICAgICB9KVxuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4scGFnZVRzLnBhZ2VOYW1lLkdhbWVFYXJuaW5ncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS7u+WKoVxuICAgICAqL1xuICAgIFRhc2tHYW1lKCl7XG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIummlumhtVwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLku7vliqFcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImJhbm5lclwiLFxuICAgICAgICB9KVxuXG5cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbixwYWdlVHMucGFnZU5hbWUuR2FtZVRhc2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDngrnlh7vniannkIbov5Tlm57plK5cbiAgICAgKi9cbiAgICBvbkJhY2tQcmVzc2VkKCkgeyAgICAgXG4gICAgICAgIGlmKFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLmZpbmRQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lRGV0ZW50aW9uKSl7XG4gICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5jbG9zZVBhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVEZXRlbnRpb24sIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4scGFnZVRzLnBhZ2VOYW1lLkdhbWVEZXRlbnRpb24pO1xuICAgICAgICB9ICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5bGV56S65paw5omL5Lu75YqhXG4gICAgICovXG4gICAgY2xpY2tOZXdQbGF5ZXJUYXNrKCl7XG4gICAgICAgIFRyYWNrTWdyLm5ld2NvbWVyX21pc3Npb24oe1xuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDjgIzmlrDkurrku7vliqHjgI3mjInpkq7ngrnlh7tgXG4gICAgICAgIH0pXG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6aaW6aG1XCIsXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBcIuaWsOS6uuaPkOeOsFwiLFxuICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiSWNvblwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4scGFnZVRzLnBhZ2VOYW1lLkdhbWVOZXdQbGF5ZXJUYXNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlsZXnpLrngq7njovku7vliqFcbiAgICAgKi9cbiAgICBjbGlja0tpbmdQYW9UYXNrKCl7XG4gICAgICAgIFRyYWNrTWdyLmFydGlsbGVyeV9ib251cyh7XG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpg44CM55m+5LiH5YiG57qi44CN5oyJ6ZKu54K55Ye7YFxuICAgICAgICB9KVxuXG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIummlumhtVwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLnmb7lhYPliIbnuqJcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcIkljb25cIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1BvcF9PcGVuLHBhZ2VUcy5wYWdlTmFtZS5HYW1lS2luZ1Bhbyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeCueWHu+mHkeW4gei9rOebmFxuICAgICAqL1xuICAgIGNsaWNrR29sZFdoZWVsKCl7XG4gICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lR29sZFdoZWVsKSAgICAgICAgXG5cbiAgICAgICAgVHJhY2tNZ3IuYmlnX3R1cm50YWJsZSh7XG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTpcIummlumhteaKveaJi+acuuS9jee9rueCueWHu1wiXG4gICAgICAgIH0pXG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOlwi6aaW6aG1XCIsXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOlwi5aSn6L2s55uYXCJcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgaWYodGhpcy53aGVlbF9yZWQuYWN0aXZlKXtcbiAgICAgICAgICAgIFRyYWNrTWdyLmxpdHRsZV9yZWRfZG90cyh7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5bCP57qi54K554K55Ye7XCIsXG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfcG9zaXRpb246IFwi5aSn6L2s55uYXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBUcmFja01nci5saXR0bGVfcmVkX2RvdHMoe1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuaZrumAmueCueWHu++8iOmdnuWwj+e6oueCue+8iVwiLFxuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3Bvc2l0aW9uOiBcIuWkp+i9rOebmFwiLFxuICAgICAgICAgICAgfSkgICAgXG4gICAgICAgIH1cblxuICAgICAgICBSZWRDb250cm9sbGVyLmNoZWNrTWFpbkdvbGRXaGVlbFJlZChmYWxzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaKveaJi+aculxuICAgICAqL1xuICAgIGNsaWNrTmV3QmlnV2hlZWwoKXtcbiAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLk5ld0JpZ1doZWVsQ29udHJvbGxlcilcbiAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6XCLpppbpobVcIixcbiAgICAgICAgICAgIGFwcF9ja19tb2R1bGU6XCLmir3miYvmnLpcIlxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWinuWKoOWCqOWtmOWAvFxuICAgICAqL1xuXG4gICAgcHJvZHVjdFR1cnJldChkdDpudW1iZXIpe1xuICAgICAgICBpZih1dGlsLnVzZXJEYXRhLnByb2R1Y3Q+PWdhbWVOdW1lcmljYWwuUHJvZHVjdE1heCl7XG4gICAgICAgICAgICB0aGlzLmJ1eUVuZXJneS55ID0gLTUwKzMwKjU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYodXRpbC5sZXZlbFN0YXRlID09IGdhbWVTdGF0ZS5zdG9wKXJldHVybjtcbiAgICAgICAgdXRpbC5nYW1lVGltZSs9ZHQ7XG4gICAgICAgIHRoaXMucHJvZHVjdE51bSAtPWR0O1xuICAgICAgICB0aGlzLkVuZXJneU51bSArPWR0O1xuICAgICAgICB0aGlzLmJ1eUVuZXJneS55ID0gLTUwK3RoaXMuRW5lcmd5TnVtKjU7XG4gICAgICAgIGlmKHRoaXMucHJvZHVjdE51bTw9MCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkVuZXJneU51bSwndGhpcy5FbmVyZ3lOdW0nKVxuICAgICAgICAgICAgdGhpcy5FbmVyZ3lOdW0gPSAwO1xuICAgICAgICAgICAgdGhpcy5idXlFbmVyZ3kueSA9IC01MDtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE51bSA9IGdhbWVOdW1lcmljYWwuUHJvZHVjdFRpbWU7XG4gICAgICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YSh1cGRhdGVUeXBlLnByb2R1Y3QpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDmlbDmja5cbiAgICAgKiBAcGFyYW0gdHlwZSDlk6rkuKpcbiAgICAgKi9cbiAgICB1cGRhdGVEYXRhKHR5cGU6bnVtYmVyKXtcblxuICAgICAgICBsZXQgdXNlckRhdGEgPSB1dGlsLnVzZXJEYXRhO1xuXG4gICAgICAgIHN3aXRjaCh0eXBlKXtcbiAgICAgICAgICAgIGNhc2UgdXBkYXRlVHlwZS5jb2luOlxuICAgICAgICAgICAgICAgIHRoaXMuY29pbkxhYmVsLnN0cmluZyA9IFN0cmluZyh1c2VyRGF0YS5jb2luKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdXBkYXRlVHlwZS5ob25nYmFvOlxuICAgICAgICAgICAgICAgIGJyZWFrOyBcbiAgICAgICAgICAgIGNhc2UgdXBkYXRlVHlwZS5wcm9kdWN0OlxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExhYmVsLnN0cmluZyA9IHVzZXJEYXRhLnByb2R1Y3QrXCIvXCIrZ2FtZU51bWVyaWNhbC5Qcm9kdWN0TWF4O1xuICAgICAgICAgICAgICAgIGlmKHV0aWwudXNlckRhdGEuR2V0VHVycmV0TnVtPjApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMYWJlbC5ub2RlLmFjdGl2ZSA9IHVzZXJEYXRhLnByb2R1Y3Q+MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb0ljb24uYWN0aXZlID0gdXNlckRhdGEucHJvZHVjdDw9MDtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb0ljb24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgUmVkQ29udHJvbGxlci5jaGVja01haW5Hb2xkV2hlZWxSZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhazsgICBcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wcm9kdWN0VHVycmV0KGR0KTtcblxuICAgICAgICBcbiAgICAgICAgdGhpcy5wcm9wTW9uaXRvcihkdCk7XG5cbiAgICB9XG5cbiAgICBcblxuXG4gICAgLyoqXG4gICAgICog6YGT5YW35L2/55So55uR5ZCsXG4gICAgICogQHBhcmFtIGR0IFxuICAgICAqL1xuICAgIHByb3BNb25pdG9yKGR0KXtcbiAgICAgICAgbGV0IHByb3BEYXRhOnByb3BJbmZvW10gPSB1dGlsLnVzZXJEYXRhLnByb3A7XG4gICAgICAgIGxldCBmcm96ZW5EYXRhID0gcHJvcERhdGFbcHJvcFR5cGUuZnJvemVuLTFdO1xuICAgICAgICBsZXQgc2hvY2tEYXRhID0gcHJvcERhdGFbcHJvcFR5cGUuc2hvY2stMV07XG4gICAgICAgIGxldCBzaGllbGREYXRhID0gcHJvcERhdGFbcHJvcFR5cGUuc2hpZWxkLTFdO1xuICAgICAgICBsZXQgYXV0b0RhdGEgPSBwcm9wRGF0YVtwcm9wVHlwZS5hdXRvLTFdO1xuICAgICAgICBsZXQgZW5lcmdpemVkRGF0YSA9IHByb3BEYXRhW3Byb3BUeXBlLmVuZXJnaXplZC0xXTtcbiAgICAgICAgdGhpcy5wcm9wQ291bnREb3duKGZyb3plbkRhdGEsZHQpO1xuICAgICAgICB0aGlzLnByb3BDb3VudERvd24oc2hvY2tEYXRhLGR0KTtcbiAgICAgICAgdGhpcy5wcm9wQ291bnREb3duKHNoaWVsZERhdGEsZHQpO1xuICAgICAgICB0aGlzLnByb3BDb3VudERvd24oYXV0b0RhdGEsZHQpO1xuICAgICAgICB0aGlzLnByb3BDb3VudERvd24oZW5lcmdpemVkRGF0YSxkdCk7XG4gICAgICAgIHRoaXMucHJvcENvdW50RG93bih1dGlsLmRvdWJsZUVhcm4sZHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWAkuiuoeaXtlxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxuICAgICAqIEBwYXJhbSBkdCBcbiAgICAgKi9cbiAgICBwcm9wQ291bnREb3duKGRhdGEsZHQpe1xuICAgICAgICBpZihkYXRhLnVzZT09cHJvcFN0YXRlLnN0YXJ0JiZ1dGlsLmxldmVsU3RhdGU9PWdhbWVTdGF0ZS5zdGFydCl7XG4gICAgICAgICAgICBkYXRhLnRpbWUtPWR0O1xuICAgICAgICAgICAgaWYoZGF0YS50aW1lPD0wKXtcbiAgICAgICAgICAgICAgICBkYXRhLnVzZSA9IHByb3BTdGF0ZS5lbmQ7XG4gICAgICAgICAgICAgICAgZGF0YS50aW1lID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZihkYXRhLnR5cGUgPT0gMyl7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuQ2xvc2VfU2hpZWxkKVxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOWFs+WNoXRpdGxlXG4gICAgICovXG5cbiAgICBjaGFuZ2VMZXZlbERhdGEoKSB7XG4gICAgICAgIGxldCB1c2VyRGF0YTogdXNlckRhdGEgPSB1dGlsLnVzZXJEYXRhOy8v55So5oi35pWw5o2uXG4gICAgICAgIGxldCBiaWdMZXZlbDogbnVtYmVyID0gdXNlckRhdGEuY3VzdG9tcy5iaWc7IC8v5aSn5YWz5Y2hXG4gICAgICAgIGxldCBzYW1sbExldmVsOiBudW1iZXIgPSB1c2VyRGF0YS5jdXN0b21zLnNtYWxsOy8v5bCP5YWz5Y2hXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5YWz5Y2hXCIgKyBiaWdMZXZlbCArIFwiLVwiICsgc2FtbGxMZXZlbCk7XG4gICAgICAgIHRoaXMuY3VzdG9tc0xhYmVsLnN0cmluZyA9IGJpZ0xldmVsICsgXCItXCIgKyBzYW1sbExldmVsO1xuICAgIH1cbiAgIFxuXG4gICAgLyoqIFxuICAgICAqIOaUueWPmOeCruWhlOetiee6p1xuICAgICovXG4gICAgY2hhbmdlVHVycmV0QnV5KCl7XG5cbiAgICAgICAgLy8gbGV0IGxldmVsOm51bWJlciA9IHV0aWwuZ2V0QnV5UmFuZG9tTGV2ZWwoKTtcblxuICAgICAgICAvLyB0aGlzLmxvYWRBbnkoKVxuXG4gICAgfVxuICAgXG5cbn1cbiJdfQ==