"use strict";
cc._RF.push(module, '796adA9zfhNt7qa0rj7i0GM', 'turretBuy');
// Script/ui/turretBuy.ts

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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretBuy = /** @class */ (function (_super) {
    __extends(turretBuy, _super);
    function turretBuy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.touchNode = null; //用于拖动位置的
        _this.buyBtnNode = null; //购买按钮
        _this.levelLabel = null;
        _this.videoNum = null;
        _this.paoBody = null;
        //接触时间
        _this.touchTime = 0;
        //是否在接触
        _this.isTouch = false;
        _this.level = null;
        _this.turretNum = 0;
        return _this;
    }
    Object.defineProperty(turretBuy.prototype, "_userData", {
        get: function () {
            return util_1.default.userData;
        },
        enumerable: false,
        configurable: true
    });
    turretBuy.prototype.onLoad = function () {
        var _this = this;
        this.setVideoNum();
        var initPos = this.node.getPosition();
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            _this.touchTime = 0;
            _this.isTouch = true;
            cc.tween(_this.buyBtnNode).to(.1, { scale: 1.1 }).start();
            cc.tween(_this.node).to(.1, { scale: 1.1 }).start();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (_this._userData.noviceGuide == 1 || _this._userData.product == 0)
                return;
            var movePos = event.getDelta();
            _this.node.x += movePos.x;
            _this.node.y += movePos.y;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            soundController_1.default.singleton.clickAudio();
            if (util_1.default.checkTestB(NameTs_1.default.new_hand_test)) {
                if (_this._userData.noviceGuide == 2) {
                    cc.game.emit(NameTs_1.default.Game_Turret_Creator);
                    cc.game.emit(NameTs_1.default.Game_Novice_Open, 3);
                    return;
                }
            }
            else if (_this._userData.noviceGuide == 1) {
                cc.game.emit(NameTs_1.default.Game_Turret_Creator);
                cc.game.emit(NameTs_1.default.Game_Novice_Open, 2);
                return;
            }
            if (_this._userData.product == 5 && Math.random() < 0.5 && _this._userData.airborneCount > 0) {
                _this.showPage(pageTs_1.default.pageName.GameGetOtherTurret, _this.level);
                return;
            }
            else {
                // console.log("不出现天降炮塔!")
            }
            if (_this._userData.product == 1) {
                _this.setVideoNum();
            }
            if (_this._userData.product == 0 && _this._userData.GetTurretNum > 0) {
                _this.showPage(pageTs_1.default.pageName.GameGetVideoTurret, { num: _this.turretNum });
                return;
            }
            if (_this.touchTime < 0.3) {
                cc.game.emit(NameTs_1.default.Game_Turret_Creator, { level: _this.level });
            }
            else {
                var poolBox = _this.touchNode;
                var pos = _this.node.getParent().convertToWorldSpaceAR(_this.node.getPosition());
                pos = poolBox.convertToNodeSpaceAR(pos);
                util_1.default.checkTouchPool(pos, function (num) {
                    if (num !== 100 && num && util_1.default.checkNoExist(num)) {
                        cc.game.emit(NameTs_1.default.Game_Turret_Creator, { level: _this.level, location: num });
                    }
                });
            }
            soundController_1.default.singleton.clickAudio();
            _this.node.setPosition(initPos);
            cc.tween(_this.buyBtnNode).to(.1, { scale: 1 }).start();
            cc.tween(_this.node).to(.1, { scale: 1 }).start();
        }, this);
        cc.game.on(NameTs_1.default.Game_Buy_update, function () {
            _this.setLevel();
        }, this);
        this.setLevel();
    };
    turretBuy.prototype.start = function () {
    };
    /**
     * 更新炮塔
     */
    turretBuy.prototype.setLevel = function () {
        this.level = util_1.default.getBuyRandomLevel();
        this.levelLabel.string = String(this.level);
        //炮塔属性
        this.turretData = util_1.default.GetTurretData(this.level);
        // this.loadSprite("body",res=>{
        //     this.paoBody.spriteFrame = res;
        // });
        // this.loadSprite("foot",res=>{
        //     this.paoFoot.spriteFrame = res;
        // });
        this.loadSpine(this.paoBody, "pao");
    };
    turretBuy.prototype.update = function (dt) {
        if (this.isTouch) {
            this.touchTime += dt;
        }
    };
    /**
     * 设置视频炮塔数量
     */
    turretBuy.prototype.setVideoNum = function () {
        this.turretNum = Tools_1.Tools.GetRandom(8, 12);
        this.videoNum.string = "+" + this.turretNum;
    };
    /**
     * 加载图片
     */
    turretBuy.prototype.loadSpine = function (spine, name) {
        var _this = this;
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + this.turretData.spineName, sp.SkeletonData, function (error, sp) {
            spine.skeletonData = sp;
            _this.paoBody.node.y = Number(_this.turretData.buyY);
        });
    };
    __decorate([
        property(cc.Node)
    ], turretBuy.prototype, "touchNode", void 0);
    __decorate([
        property(cc.Node)
    ], turretBuy.prototype, "buyBtnNode", void 0);
    __decorate([
        property({ displayName: "等级", type: cc.Label })
    ], turretBuy.prototype, "levelLabel", void 0);
    __decorate([
        property({ displayName: "视频炮塔", type: cc.Label })
    ], turretBuy.prototype, "videoNum", void 0);
    __decorate([
        property({ type: sp.Skeleton, displayName: "炮" })
    ], turretBuy.prototype, "paoBody", void 0);
    turretBuy = __decorate([
        ccclass
    ], turretBuy);
    return turretBuy;
}(baseTs_1.default));
exports.default = turretBuy;

cc._RF.pop();