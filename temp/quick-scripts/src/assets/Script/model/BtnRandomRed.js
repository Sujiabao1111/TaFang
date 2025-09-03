"use strict";
cc._RF.push(module, 'ac0ebYVWZJOn6uGq/NHz8rY', 'BtnRandomRed');
// Script/model/BtnRandomRed.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnRandomRed = /** @class */ (function (_super) {
    __extends(BtnRandomRed, _super);
    function BtnRandomRed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_time = null;
        _this.img_closeRed = null;
        _this.img_openRed = null;
        _this.onceEnter = true;
        return _this;
    }
    BtnRandomRed.prototype.onEnable = function () {
        var self = this;
        if (!util_1.default.chekcToday()) {
            util_1.default.setStorage(util_1.default.localDiary.randomRedTimeNum, 60);
        }
        var randomRedTimeNum = util_1.default.getStorage(util_1.default.localDiary.randomRedTimeNum);
        if (randomRedTimeNum == null) {
            util_1.default.setStorage(util_1.default.localDiary.randomRedTimeNum, 60);
        }
        util_1.default.randomRedTimeNum = randomRedTimeNum;
        self.lable_time.string = AssistCtr_1.AssistCtr.formatSeconds(util_1.default.randomRedTimeNum);
        self.updateData();
        util_1.default.GlobalMap.set("RandomRed", this.node);
    };
    BtnRandomRed.prototype.onLoad = function () {
        cc.game.on(NameTs_1.default.randomRedUpdate, this.updateData, this);
    };
    BtnRandomRed.prototype.clickOpen = function () {
        var self = this;
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "福利红包",
            app_exposure_type: "icon",
        });
        if (self.lable_time.node.active) {
            AssistCtr_1.AssistCtr.showToastTip(util_1.default.randomRedTimeNum + "s\u540E\u53EF\u9886\u53D6");
        }
        else {
            cc.game.emit(NameTs_1.default.Game_Pop_Open, { name: pageTs_1.default.pageName.GameRandomRedPrize });
        }
        TrackMgr_1.default.welfare_red_envelope({
            activity_state: "点击福利红包"
        });
    };
    BtnRandomRed.prototype.openTimer = function () {
        var self = this;
        if (util_1.default.randomRedTimeNum > 0) {
            self.lable_time.string = AssistCtr_1.AssistCtr.formatSeconds(util_1.default.randomRedTimeNum);
            self.lable_time.node.active = true;
            self.img_closeRed.active = true;
            self.img_openRed.node.active = false;
            self.schedule(self.timerFun, 1);
        }
        else {
            self.lable_time.node.active = false;
            self.img_closeRed.active = false;
            self.img_openRed.node.active = true;
            self.img_openRed.playAnimation("fulihongbao", 0);
            TrackMgr_1.default.welfare_red_envelope({
                activity_state: "福利红包待领取"
            });
        }
    };
    BtnRandomRed.prototype.timerFun = function () {
        var self = this;
        if (util_1.default.randomRedTimeNum > 0) {
            self.lable_time.string = AssistCtr_1.AssistCtr.formatSeconds(util_1.default.randomRedTimeNum);
        }
        else {
            self.unschedule(self.timerFun);
            self.lable_time.node.active = false;
            self.img_closeRed.active = false;
            self.img_openRed.node.active = true;
            self.img_openRed.playAnimation("fulihongbao", 0);
            util_1.default.randomRedTimeNum = 0;
            TrackMgr_1.default.welfare_red_envelope({
                activity_state: "福利红包待领取"
            });
        }
        util_1.default.randomRedTimeNum--;
    };
    BtnRandomRed.prototype.updateData = function () {
        var _this = this;
        var self = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.btnRandomRedCount,
            onSuccess: function (res) {
                if (res.code === 0 && res.data) {
                    if (!_this.isValid) {
                        return;
                    }
                    if (res.data.remainingTimes > 0) {
                        if (res.data.remainingTimes == 99) {
                            self.lable_time.node.active = false;
                            self.img_closeRed.active = false;
                            self.img_openRed.node.active = true;
                            self.img_openRed.playAnimation("fulihongbao", 0);
                            TrackMgr_1.default.welfare_red_envelope({
                                activity_state: "福利红包待领取"
                            });
                        }
                        else {
                            if (!self.onceEnter) {
                                util_1.default.randomRedTimeNum = 60;
                            }
                            _this.onceEnter = false;
                            _this.openTimer();
                        }
                    }
                    else {
                        _this.node.active = false;
                    }
                }
                else {
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: function (res) {
            }
        });
    };
    __decorate([
        property(cc.Label)
    ], BtnRandomRed.prototype, "lable_time", void 0);
    __decorate([
        property(cc.Node)
    ], BtnRandomRed.prototype, "img_closeRed", void 0);
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], BtnRandomRed.prototype, "img_openRed", void 0);
    BtnRandomRed = __decorate([
        ccclass
    ], BtnRandomRed);
    return BtnRandomRed;
}(cc.Component));
exports.default = BtnRandomRed;

cc._RF.pop();