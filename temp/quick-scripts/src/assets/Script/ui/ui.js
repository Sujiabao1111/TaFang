"use strict";
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