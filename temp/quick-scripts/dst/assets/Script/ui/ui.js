
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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var RedController_1 = require("../controlelr/RedController");
var PageManage_1 = require("../PageManage");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
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
        _this.propBox = null; //道具弹窗
        _this.buyEnergy = null; //进度条
        _this.btn_newPlayerTask = null;
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
        // this.topBar.top += Number(util.iphoneXTop);
        var _this = this;
        //数据更新
        cc.game.on(NameTs_1.default.Game_View_UserDataUpdata, function (res) {
            _this.updateData(res);
        }, this);
        this.productNum = faceTs_1.gameNumerical.ProductTime;
        this.updateData(faceTs_1.updateType.product);
        this.updateData(faceTs_1.updateType.coin);
        util_1.default.GlobalMap.set("coin", this.coinLabel.node.getParent().children[0]);
        util_1.default.GlobalMap.set("turretBuy", this.turret);
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
        // cc.game.on(NameTs.onBackPressed, () => {
        //     console.log("安卓调用物理返回键并取消cocos监听");
        //     cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onBackPressed, this);
        //     this.onBackPressed();
        // }, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onBackPressed, this);
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
        //fix bug
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.newPlayerTaskData,
            onSuccess: function (res) {
                if (!_this.isValid) {
                    return;
                }
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
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameSet);
    };
    /**
     * 图鉴
     */
    ui.prototype.TuJianGame = function () {
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameTuJian);
    };
    /**
     * 道具
     */
    ui.prototype.PropGame = function () {
        soundController_1.default.singleton.clickAudio();
        this.propBox.active = !this.propBox.active;
        // cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameProp);
    };
    /**
     * 签到
     */
    ui.prototype.SignGame = function () {
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameSign);
    };
    /**
     * 提现
     */
    ui.prototype.walletGame = function (e, data) {
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameWallet);
    };
    /**
     * 任务
     */
    ui.prototype.TaskGame = function () {
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameTask);
    };
    /**
     * 点击物理返回键
     */
    ui.prototype.onBackPressed = function () {
    };
    /**
     * 展示新手任务
     */
    ui.prototype.clickNewPlayerTask = function () {
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameNewPlayerTask);
    };
    /**
     * 展示炮王任务
     */
    ui.prototype.clickKingPaoTask = function () {
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameKingPao);
    };
    /**
     * 点击金币转盘
     */
    ui.prototype.clickGoldWheel = function () {
        PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.GameGoldWheel);
        RedController_1.default.checkMainGoldWheelRed(false);
    };
    /**
    * 抽手机
    */
    ui.prototype.clickNewBigWheel = function () {
        PageManage_1.default.singleton.showPage(pageTs_1.default.pageName.NewBigWheelController);
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
    ], ui.prototype, "propBox", void 0);
    __decorate([
        property(cc.Node)
    ], ui.prototype, "buyEnergy", void 0);
    __decorate([
        property(cc.Node) //新手任务Icon
    ], ui.prototype, "btn_newPlayerTask", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQTRIO0FBQzVILDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsNkRBQXdEO0FBR3hELDRDQUF1QztBQUN2QywrQ0FBOEM7QUFDOUMscURBQWdEO0FBQ2hELHNEQUFpRDtBQUNqRCxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBZ0Msc0JBQVk7SUFBNUM7UUFBQSxxRUFtYkM7UUFoYlcsa0JBQVksR0FBYSxJQUFJLENBQUMsQ0FBQyxTQUFTO1FBR3hDLGVBQVMsR0FBWSxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBRy9CLFlBQU0sR0FBYyxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBRzlCLGtCQUFZLEdBQWEsSUFBSSxDQUFDLENBQUMsS0FBSztRQUdwQyxlQUFTLEdBQVksSUFBSSxDQUFDLENBQUMsU0FBUztRQUdwQyxlQUFTLEdBQWEsSUFBSSxDQUFDLENBQUMsSUFBSTtRQUdoQyxnQkFBVSxHQUFZLElBQUksQ0FBQyxDQUFDLE1BQU07UUFHbEMsWUFBTSxHQUFZLElBQUksQ0FBQyxDQUFDLElBQUk7UUFJNUIsYUFBTyxHQUFZLElBQUksQ0FBQyxDQUFDLE1BQU07UUFHL0IsZUFBUyxHQUFZLElBQUksQ0FBQyxDQUFDLEtBQUs7UUFHaEMsdUJBQWlCLEdBQVksSUFBSSxDQUFDO1FBSWxDLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQWMsSUFBSSxDQUFDLENBQUMsVUFBVTtRQUcxQywwQkFBb0IsR0FBcUIsRUFBRSxDQUFDLENBQUMsZUFBZTtRQUc1RCxlQUFTLEdBQVcsQ0FBQyxDQUFDLENBQUEsSUFBSTtRQUcxQixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFB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aEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5Q0FDZ0I7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFRLFVBQVU7aURBQ007SUFJMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7MkNBQ2Y7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FDbUI7SUFHdkM7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7b0RBQ3lCO0lBTXBEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBTSxRQUFROzRDQUNLO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBSyxhQUFhOzRDQUNDO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBTSxRQUFROzJDQUNJO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBTSxTQUFTO3lDQUNDO0lBM0RqQixFQUFFO1FBRHRCLE9BQU87T0FDYSxFQUFFLENBbWJ0QjtJQUFELFNBQUM7Q0FuYkQsQUFtYkMsQ0FuYitCLEVBQUUsQ0FBQyxTQUFTLEdBbWIzQztrQkFuYm9CLEVBQUUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCwgZ2FtZVBhc3MsIGdhbWVTdGF0ZSwgcHJvcEluZm8sIHByb3BTdGF0ZSwgcHJvcFR5cGUsIHRoaW5nVHlwZSwgdXBkYXRlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgUmVkQ29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGVsci9SZWRDb250cm9sbGVyXCI7XG5pbXBvcnQgdXNlckRhdGEgZnJvbSBcIi4uL2RhdGEvdXNlckRhdGFcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XG5pbXBvcnQgUGFnZU1hbmFnZSBmcm9tIFwiLi4vUGFnZU1hbmFnZVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgY3VzdG9tc0xhYmVsOiBjYy5MYWJlbCA9IG51bGw7IC8v5YWz5Y2hbGFiZWxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgdmlkZW9JY29uOiBjYy5Ob2RlID0gbnVsbDsgLy/op4bpopFcblxuICAgIEBwcm9wZXJ0eShjYy5XaWRnZXQpXG4gICAgcHJpdmF0ZSB0b3BCYXI6IGNjLldpZGdldCA9IG51bGw7IC8v6aG26YOoXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBwcm9kdWN0TGFiZWw6IGNjLkxhYmVsID0gbnVsbDsgLy/kuqfog73lgLxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgdG91Y2hOb2RlOiBjYy5Ob2RlID0gbnVsbDsgLy/nlKjkuo7mi5bliqjkvY3nva7nmoRcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGNvaW5MYWJlbDogY2MuTGFiZWwgPSBudWxsOyAvL+mHkeW4gVxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBidXlCdG5Ob2RlOiBjYy5Ob2RlID0gbnVsbDsgLy/otK3kubDmjInpkq5cblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgdHVycmV0OiBjYy5Ob2RlID0gbnVsbDsgLy/ngq7loZRcblxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBwcm9wQm94OiBjYy5Ob2RlID0gbnVsbDsgLy/pgZPlhbflvLnnqpdcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgYnV5RW5lcmd5OiBjYy5Ob2RlID0gbnVsbDsgLy/ov5vluqbmnaFcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSAgICAgICAgLy/mlrDmiYvku7vliqFJY29uXG4gICAgcHJpdmF0ZSBidG5fbmV3UGxheWVyVGFzazogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuWeg+WcvuWbnuaUtuiKgueCuVwiIH0pXG4gICAgcHJpdmF0ZSByZWN5Y2xlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgZ2FtZVN0YXRlUGljOiBjYy5TcHJpdGUgPSBudWxsOyAvL+W8gOWFs1Nwcml0ZVxuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgcHJpdmF0ZSBnYW1lU3RhdGVTcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdOyAvL+W8gOWFs1Nwcml0ZUZyYW1lXG5cbiAgICBwcml2YXRlIHByb2R1Y3ROdW06IG51bWJlcjsvL+S6p+iDvVxuICAgIHByaXZhdGUgRW5lcmd5TnVtOiBudW1iZXIgPSAwOy8v5Lqn6IO9XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgICAgICAvL+mmlumhteS7u+WKoee6oueCuVxuICAgIHByaXZhdGUgbWFpblRhc2tfcmVkOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbCkgICAgIC8v6aaW6aG157qi54K55Y+v6aKG5Y+W5Lu75Yqh5pWw6YePXG4gICAgcHJpdmF0ZSBsYWJsZV9yZWROdW06IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSAgICAgIC8v6aaW6aG1562+5Yiw57qi54K5XG4gICAgcHJpdmF0ZSBzaWduUmVkX3JlZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgICAgICAvL+mmlumhteWkp+i9rOebmOe6oueCuVxuICAgIHByaXZhdGUgd2hlZWxfcmVkOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICAvLyB0aGlzLnRvcEJhci50b3AgKz0gTnVtYmVyKHV0aWwuaXBob25lWFRvcCk7XG5cbiAgICAgICAgLy/mlbDmja7mm7TmlrBcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhLCAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGEocmVzKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0TnVtID0gZ2FtZU51bWVyaWNhbC5Qcm9kdWN0VGltZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEodXBkYXRlVHlwZS5wcm9kdWN0KTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKHVwZGF0ZVR5cGUuY29pbik7XG5cbiAgICAgICAgdXRpbC5HbG9iYWxNYXAuc2V0KFwiY29pblwiLCB0aGlzLmNvaW5MYWJlbC5ub2RlLmdldFBhcmVudCgpLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgdXRpbC5HbG9iYWxNYXAuc2V0KFwidHVycmV0QnV5XCIsIHRoaXMudHVycmV0KTtcblxuXG4gICAgICAgIC8v5ou/6LW3XG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHVycmV0X1BpY2tVcCwgKHJlcykgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmJ1eUJ0bk5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnR1cnJldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucmVjeWNsZU5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvL+aUvuS4i1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1R1cnJldF9QdXREb3duLCAocmVzKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuYnV5QnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50dXJyZXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVjeWNsZU5vZGUuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy/lhbPljaHmoIfpopjmm7TmlrBcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9WaWV3X0N1c3RvbXNVcGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTGV2ZWxEYXRhKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVG9vbF9Vc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh1dGlsLmxldmVsU3RhdGUgPT0gZ2FtZVN0YXRlLnN0b3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BHYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpXG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TdG9wLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZVBpYy5zcHJpdGVGcmFtZSA9IHRoaXMuZ2FtZVN0YXRlU3ByaXRlRnJhbWVbdXRpbC5sZXZlbFN0YXRlID09IDEgPyAxIDogMF07XG4gICAgICAgIH0sIHRoaXMpXG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9SZXN1bWUsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlUGljLnNwcml0ZUZyYW1lID0gdGhpcy5nYW1lU3RhdGVTcHJpdGVGcmFtZVt1dGlsLmxldmVsU3RhdGUgPT0gMSA/IDEgOiAwXTtcbiAgICAgICAgfSwgdGhpcylcblxuICAgICAgICAvLyBjYy5nYW1lLm9uKE5hbWVUcy5vbkJhY2tQcmVzc2VkLCAoKSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuWuieWNk+iwg+eUqOeJqeeQhui/lOWbnumUruW5tuWPlua2iGNvY29z55uR5ZCsXCIpO1xuICAgICAgICAvLyAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbkJhY2tQcmVzc2VkLCB0aGlzKTtcbiAgICAgICAgLy8gICAgIHRoaXMub25CYWNrUHJlc3NlZCgpO1xuICAgICAgICAvLyB9LCB0aGlzKTtcbiAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uQmFja1ByZXNzZWQsIHRoaXMpO1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfU3RhcnQsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh1dGlsLmlzQ2hlY2tUYXNrUmVkKSB7XG4gICAgICAgICAgICAgICAgdXRpbC5pc0NoZWNrVGFza1JlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIFJlZENvbnRyb2xsZXIuY2hlY2tUYXNrUmVkKChva051bSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2tOdW0gJiYgb2tOdW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5UYXNrX3JlZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZWROdW0uc3RyaW5nID0gb2tOdW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5UYXNrX3JlZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTWFpbl9UYXNrX3VwZGF0YSwgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdXRpbC5pc0NoZWNrVGFza1JlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubWFpblRhc2tfcmVkLmFjdGl2ZSA9IHJlcyA+IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZWROdW0uc3RyaW5nID0gcmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBpZiAoIXV0aWwuY2hla2NUb2RheSgpKSB7XG4gICAgICAgICAgICB1dGlsLnVzZXJEYXRhLkdldFR1cnJldE51bSA9IDE4O1xuICAgICAgICAgICAgdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5HZXRUdXJyZXROdW0sIHV0aWwudXNlckRhdGEuR2V0VHVycmV0TnVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuYnV5RW5lcmd5KS5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKCkudG8oMiwgeyB4OiAzMTkgLyAyIH0pLnRvKDAsIHsgeDogLTMxOSAvIDIgfSkpLnN0YXJ0KCk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9DbG9zZU5ld1BsYXllclRhc2ssICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnRuX25ld1BsYXllclRhc2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vZml4IGJ1Z1xuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QubmV3UGxheWVyVGFza0RhdGEsXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJlcyB8fCByZXMuY29kZSAhPSAwIHx8ICFyZXMuZGF0YSB8fCAhcmVzLmRhdGEud2l0aGRyYXdUYXNrSXRlbVZvTWFwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuX25ld1BsYXllclRhc2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bl9uZXdQbGF5ZXJUYXNrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ0bl9uZXdQbGF5ZXJUYXNrLmdldENoaWxkQnlOYW1lKFwibGlnaHRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IHRoaXMuYnRuX25ld1BsYXllclRhc2suZ2V0Q2hpbGRCeU5hbWUoXCJsaWdodFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihpbWFnZSkuYnkoMSwgeyBhbmdsZTogLTM2MCB9KS5yZXBlYXRGb3JldmVyKCkuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ0bl9uZXdQbGF5ZXJUYXNrLmdldENoaWxkQnlOYW1lKFwiaW1hZ2VcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IHRoaXMuYnRuX25ld1BsYXllclRhc2suZ2V0Q2hpbGRCeU5hbWUoXCJpbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGltYWdlKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjMsIHsgYW5nbGU6IDEwIH0pLnRvKC4yLCB7IGFuZ2xlOiAwIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKVxuXG4gICAgICAgIFJlZENvbnRyb2xsZXIuaW5pdEdvbGRXaGVlbERhdGEodGhpcy53aGVlbF9yZWQpO1xuICAgICAgICBSZWRDb250cm9sbGVyLmluaXRTaWduUmVkRGF0YSh0aGlzLnNpZ25SZWRfcmVkKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VMZXZlbERhdGEoKTtcbiAgICAgICAgLy8g5bCG5Z6D5Zy+566x5pS+6L+bbGV2ZWxNYXDmlbDnu4Tov5vljrtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IHRoaXMucmVjeWNsZU5vZGUuZ2V0UGFyZW50KCkuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMucmVjeWNsZU5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICBwb3MgPSB0aGlzLnRvdWNoTm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpO1xuICAgICAgICAgICAgdXRpbC5sZXZlbE1hcC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0aGluZ1R5cGUucmVjeWNsZSxcbiAgICAgICAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5yZWN5Y2xlTm9kZS53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMucmVjeWNsZU5vZGUuaGVpZ2h0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgLjEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6LSt5LmwXG4gICAgICovXG4gICAgYnV5QnRuKCkge1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0NyZWF0b3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaaguWBnOa4uOaIj1xuICAgICAqL1xuICAgIHN0b3BHYW1lKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdXRpbC5sZXZlbFN0YXRlID0gdXRpbC5sZXZlbFN0YXRlID09IGdhbWVTdGF0ZS5zdG9wID8gZ2FtZVN0YXRlLnN0YXJ0IDogZ2FtZVN0YXRlLnN0b3A7XG4gICAgICAgIGNjLmdhbWUuZW1pdCh1dGlsLmxldmVsU3RhdGUgPT0gZ2FtZVN0YXRlLnN0b3AgPyBOYW1lVHMuR2FtZV9TdG9wIDogTmFtZVRzLkdhbWVfUmVzdW1lKTtcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVQaWMuc3ByaXRlRnJhbWUgPSB0aGlzLmdhbWVTdGF0ZVNwcml0ZUZyYW1lW3V0aWwubGV2ZWxTdGF0ZSA9PSAxID8gMSA6IDBdO1xuICAgICAgICB1dGlsLmlzU3RvcCA9ICF1dGlsLmlzU3RvcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7muLjmiI9cbiAgICAgKi9cbiAgICBTZXRHYW1lKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1BvcF9PcGVuLCBwYWdlVHMucGFnZU5hbWUuR2FtZVNldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWbvumJtFxuICAgICAqL1xuICAgIFR1SmlhbkdhbWUoKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHVKaWFuKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgZPlhbdcbiAgICAgKi9cbiAgICBQcm9wR2FtZSgpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMucHJvcEJveC5hY3RpdmUgPSAhdGhpcy5wcm9wQm94LmFjdGl2ZTtcbiAgICAgICAgLy8gY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1BvcF9PcGVuLCBwYWdlVHMucGFnZU5hbWUuR2FtZVByb3ApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnrb7liLBcbiAgICAgKi9cbiAgICBTaWduR2FtZSgpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVTaWduKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5o+Q546wXG4gICAgICovXG4gICAgd2FsbGV0R2FtZShlLCBkYXRhKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lV2FsbGV0KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOS7u+WKoVxuICAgICAqL1xuICAgIFRhc2tHYW1lKCkge1xuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lVGFzayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeCueWHu+eJqeeQhui/lOWbnumUrlxuICAgICAqL1xuICAgIG9uQmFja1ByZXNzZWQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlsZXnpLrmlrDmiYvku7vliqFcbiAgICAgKi9cbiAgICBjbGlja05ld1BsYXllclRhc2soKSB7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVOZXdQbGF5ZXJUYXNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlsZXnpLrngq7njovku7vliqFcbiAgICAgKi9cbiAgICBjbGlja0tpbmdQYW9UYXNrKCkge1xuXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7vph5HluIHovaznm5hcbiAgICAgKi9cbiAgICBjbGlja0dvbGRXaGVlbCgpIHtcbiAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHb2xkV2hlZWwpXG4gICAgICAgIFJlZENvbnRyb2xsZXIuY2hlY2tNYWluR29sZFdoZWVsUmVkKGZhbHNlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICog5oq95omL5py6XG4gICAgKi9cbiAgICBjbGlja05ld0JpZ1doZWVsKCkge1xuICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuTmV3QmlnV2hlZWxDb250cm9sbGVyKVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aKe5Yqg5YKo5a2Y5YC8XG4gICAgICovXG5cbiAgICBwcm9kdWN0VHVycmV0KGR0OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHV0aWwudXNlckRhdGEucHJvZHVjdCA+PSBnYW1lTnVtZXJpY2FsLlByb2R1Y3RNYXgpIHtcbiAgICAgICAgICAgIHRoaXMuYnV5RW5lcmd5LnkgPSAtNTAgKyAzMCAqIDU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWwubGV2ZWxTdGF0ZSA9PSBnYW1lU3RhdGUuc3RvcCkgcmV0dXJuO1xuICAgICAgICB1dGlsLmdhbWVUaW1lICs9IGR0O1xuICAgICAgICB0aGlzLnByb2R1Y3ROdW0gLT0gZHQ7XG4gICAgICAgIHRoaXMuRW5lcmd5TnVtICs9IGR0O1xuICAgICAgICB0aGlzLmJ1eUVuZXJneS55ID0gLTUwICsgdGhpcy5FbmVyZ3lOdW0gKiA1O1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TnVtIDw9IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuRW5lcmd5TnVtLCAndGhpcy5FbmVyZ3lOdW0nKVxuICAgICAgICAgICAgdGhpcy5FbmVyZ3lOdW0gPSAwO1xuICAgICAgICAgICAgdGhpcy5idXlFbmVyZ3kueSA9IC01MDtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE51bSA9IGdhbWVOdW1lcmljYWwuUHJvZHVjdFRpbWU7XG4gICAgICAgICAgICB1dGlsLnByb2R1Y3RUdXJyZXQoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YSh1cGRhdGVUeXBlLnByb2R1Y3QpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDmlbDmja5cbiAgICAgKiBAcGFyYW0gdHlwZSDlk6rkuKpcbiAgICAgKi9cbiAgICB1cGRhdGVEYXRhKHR5cGU6IG51bWJlcikge1xuXG4gICAgICAgIGxldCB1c2VyRGF0YSA9IHV0aWwudXNlckRhdGE7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHVwZGF0ZVR5cGUuY29pbjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW5MYWJlbC5zdHJpbmcgPSBTdHJpbmcodXNlckRhdGEuY29pbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHVwZGF0ZVR5cGUuaG9uZ2JhbzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdXBkYXRlVHlwZS5wcm9kdWN0OlxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExhYmVsLnN0cmluZyA9IHVzZXJEYXRhLnByb2R1Y3QgKyBcIi9cIiArIGdhbWVOdW1lcmljYWwuUHJvZHVjdE1heDtcbiAgICAgICAgICAgICAgICBpZiAodXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExhYmVsLm5vZGUuYWN0aXZlID0gdXNlckRhdGEucHJvZHVjdCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9JY29uLmFjdGl2ZSA9IHVzZXJEYXRhLnByb2R1Y3QgPD0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvSWNvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBSZWRDb250cm9sbGVyLmNoZWNrTWFpbkdvbGRXaGVlbFJlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0VHVycmV0KGR0KTtcbiAgICAgICAgdGhpcy5wcm9wTW9uaXRvcihkdCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDpgZPlhbfkvb/nlKjnm5HlkKxcbiAgICAgKiBAcGFyYW0gZHQgXG4gICAgICovXG4gICAgcHJvcE1vbml0b3IoZHQpIHtcbiAgICAgICAgbGV0IHByb3BEYXRhOiBwcm9wSW5mb1tdID0gdXRpbC51c2VyRGF0YS5wcm9wO1xuICAgICAgICBsZXQgZnJvemVuRGF0YSA9IHByb3BEYXRhW3Byb3BUeXBlLmZyb3plbiAtIDFdO1xuICAgICAgICBsZXQgc2hvY2tEYXRhID0gcHJvcERhdGFbcHJvcFR5cGUuc2hvY2sgLSAxXTtcbiAgICAgICAgbGV0IHNoaWVsZERhdGEgPSBwcm9wRGF0YVtwcm9wVHlwZS5zaGllbGQgLSAxXTtcbiAgICAgICAgbGV0IGF1dG9EYXRhID0gcHJvcERhdGFbcHJvcFR5cGUuYXV0byAtIDFdO1xuICAgICAgICBsZXQgZW5lcmdpemVkRGF0YSA9IHByb3BEYXRhW3Byb3BUeXBlLmVuZXJnaXplZCAtIDFdO1xuICAgICAgICB0aGlzLnByb3BDb3VudERvd24oZnJvemVuRGF0YSwgZHQpO1xuICAgICAgICB0aGlzLnByb3BDb3VudERvd24oc2hvY2tEYXRhLCBkdCk7XG4gICAgICAgIHRoaXMucHJvcENvdW50RG93bihzaGllbGREYXRhLCBkdCk7XG4gICAgICAgIHRoaXMucHJvcENvdW50RG93bihhdXRvRGF0YSwgZHQpO1xuICAgICAgICB0aGlzLnByb3BDb3VudERvd24oZW5lcmdpemVkRGF0YSwgZHQpO1xuICAgICAgICB0aGlzLnByb3BDb3VudERvd24odXRpbC5kb3VibGVFYXJuLCBkdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YCS6K6h5pe2XG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICogQHBhcmFtIGR0IFxuICAgICAqL1xuICAgIHByb3BDb3VudERvd24oZGF0YSwgZHQpIHtcbiAgICAgICAgaWYgKGRhdGEudXNlID09IHByb3BTdGF0ZS5zdGFydCAmJiB1dGlsLmxldmVsU3RhdGUgPT0gZ2FtZVN0YXRlLnN0YXJ0KSB7XG4gICAgICAgICAgICBkYXRhLnRpbWUgLT0gZHQ7XG4gICAgICAgICAgICBpZiAoZGF0YS50aW1lIDw9IDApIHtcbiAgICAgICAgICAgICAgICBkYXRhLnVzZSA9IHByb3BTdGF0ZS5lbmQ7XG4gICAgICAgICAgICAgICAgZGF0YS50aW1lID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5DbG9zZV9TaGllbGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw5YWz5Y2hdGl0bGVcbiAgICAgKi9cbiAgICBjaGFuZ2VMZXZlbERhdGEoKSB7XG4gICAgICAgIGxldCB1c2VyRGF0YTogdXNlckRhdGEgPSB1dGlsLnVzZXJEYXRhOy8v55So5oi35pWw5o2uXG4gICAgICAgIGxldCBiaWdMZXZlbDogbnVtYmVyID0gdXNlckRhdGEuY3VzdG9tcy5iaWc7IC8v5aSn5YWz5Y2hXG4gICAgICAgIGxldCBzYW1sbExldmVsOiBudW1iZXIgPSB1c2VyRGF0YS5jdXN0b21zLnNtYWxsOy8v5bCP5YWz5Y2hXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5YWz5Y2hXCIgKyBiaWdMZXZlbCArIFwiLVwiICsgc2FtbGxMZXZlbCk7XG4gICAgICAgIHRoaXMuY3VzdG9tc0xhYmVsLnN0cmluZyA9IGJpZ0xldmVsICsgXCItXCIgKyBzYW1sbExldmVsO1xuICAgIH1cblxuXG4gICAgLyoqIFxuICAgICAqIOaUueWPmOeCruWhlOetiee6p1xuICAgICovXG4gICAgY2hhbmdlVHVycmV0QnV5KCkge1xuXG4gICAgICAgIC8vIGxldCBsZXZlbDpudW1iZXIgPSB1dGlsLmdldEJ1eVJhbmRvbUxldmVsKCk7XG5cbiAgICAgICAgLy8gdGhpcy5sb2FkQW55KClcblxuICAgIH1cblxuXG59XG4iXX0=