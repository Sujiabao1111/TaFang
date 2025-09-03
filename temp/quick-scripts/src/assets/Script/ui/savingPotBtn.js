"use strict";
cc._RF.push(module, 'dbe6aHTg1tMSbQnJMAWiLiE', 'savingPotBtn');
// Script/ui/savingPotBtn.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var savingPotBtn = /** @class */ (function (_super) {
    __extends(savingPotBtn, _super);
    function savingPotBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeLabel = null;
        _this.getPoint = null;
        _this.dragon = null; //龙骨
        _this.isUnlock = false; //是否解锁
        _this.btn = null;
        return _this;
        // update (dt) {}
    }
    savingPotBtn.prototype.onLoad = function () {
        var _this = this;
        this.btn = this.node.getComponent(cc.Button);
        // this.dragon = this.node.getComponent(dragonBones.ArmatureDisplay);
        cc.game.on(NameTs_1.default.Game_SavingPost_Icon, function () {
            if (!_this.isUnlock)
                return;
            util_1.default.savingPotLock = true;
            _this.setSate();
        }, this);
        cc.game.on(NameTs_1.default.Game_SavingPost_Lock, function () {
            if (_this.isUnlock)
                return;
            _this.LockFn();
        }, this);
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.wallet_main2,
            success: function (data) {
                console.log(data, 'data=========');
                if (data && data.cashOutMap && data.cashOutMap[1]) {
                    for (var i = 0; i < data.cashOutMap[1].length; i++) {
                        if ((data.cashOutMap[1][i].type == 1 && AssistCtr_1.AssistCtr.isATest()) || (data.cashOutMap[1][i].type == 9 && !AssistCtr_1.AssistCtr.isATest())) {
                            _this.isUnlock = data.cashOutMap[1][i].hasWithdraw == 1;
                            break;
                        }
                    }
                }
                if (!_this.isUnlock) {
                    _this.btn.enabled = false;
                    _this.node.opacity = 0;
                }
                else {
                    _this.LockFn();
                }
                console.log("是否解锁了该功能：" + (_this.isUnlock ? "是" : "不是"));
            },
            fail: function () {
                _this.btn.enabled = false;
                _this.node.opacity = 0;
                console.log("请求失败");
            }
        });
    };
    /**解锁功能 */
    savingPotBtn.prototype.LockFn = function () {
        var _this = this;
        console.log("解锁该功能！");
        // util.savingPotLock = true;
        this.btn.enabled = true;
        this.node.opacity = 255;
        util_1.default.post({
            url: UrlConst_1.UrlConst.savingPotIndex,
            success: function (data) {
                if (_this.isUnlock) {
                    util_1.default.savingPotLock = data.status == 0;
                }
                _this.setSate(Number(data && data.status) || 0);
            },
            fail: function () {
                _this.btn.enabled = false;
                _this.node.opacity = 0;
                console.log("获取失败,暂时关闭");
            }
        });
    };
    savingPotBtn.prototype.start = function () {
    };
    /**
     * 设置状态
     * @param num 0不能拿1能拿
     */
    savingPotBtn.prototype.setSate = function (num) {
        var _this = this;
        if (num === void 0) { num = 0; }
        if (this.timeLabel) {
            this.timeLabel.node.active = num == 0;
            if (this.timeLabel.node.active) {
                this.unscheduleAllCallbacks();
                this.timeLabel.string = tool_1.default.formatData(5);
                this.schedule(function () {
                    _this.timeLabel.string = tool_1.default.formatData(5);
                    if (tool_1.default.formatData(5) == "00:00:00") {
                        _this.setSate(1);
                    }
                }, 1);
            }
        }
        this.dragon && this.dragon.playAnimation(num == 1 ? "kelingqu" : "normal", -1);
        console.log(num, 'num============');
        this.getPoint.active = num == 1;
        if (num == 1) {
            this.getPoint.stopAllActions();
            cc.tween(this.getPoint).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
        }
    };
    /**
     * 展现
     */
    savingPotBtn.prototype.showPot = function () {
        soundController_1.default.singleton.clickAudio();
        this.showPage(pageTs_1.default.pageName.GameSavingPot);
    };
    __decorate([
        property({ type: cc.Label, displayName: "时间" })
    ], savingPotBtn.prototype, "timeLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "角标" })
    ], savingPotBtn.prototype, "getPoint", void 0);
    __decorate([
        property({ type: dragonBones.ArmatureDisplay, displayName: "龙骨" })
    ], savingPotBtn.prototype, "dragon", void 0);
    savingPotBtn = __decorate([
        ccclass
    ], savingPotBtn);
    return savingPotBtn;
}(baseTs_1.default));
exports.default = savingPotBtn;

cc._RF.pop();