"use strict";
cc._RF.push(module, '13729D2YT9GcpYSwQLml8pX', 'OnPrizeGet');
// Script/onPrizeGet/OnPrizeGet.ts

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
var RedController_1 = require("../controlelr/RedController");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OnPrizeGet = /** @class */ (function (_super) {
    __extends(OnPrizeGet, _super);
    function OnPrizeGet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //在线奖励
        _this.btn_onPrizeGet = null;
        _this.btnSprFrame = [];
        _this.timeNode = null;
        _this.redLayout = null;
        _this.lable_time = null;
        _this.redSprArray = [];
        _this.img_rect = null;
        _this.onPrizeData = null;
        _this.curOnPrizeRedData = null;
        _this.timeNum = 0;
        _this.maxRectNum = 0; //进度条最大宽度
        _this.getRedNum = 0; //红包数(未领取+已领取)
        _this.onceTimer = 0; //下一个红包所需要时间(秒)
        _this.curTime = 0; //当前时间
        return _this;
    }
    OnPrizeGet.prototype.onLoad = function () {
        this.maxRectNum = this.img_rect.parent.width;
        cc.game.on(NameTs_1.default.onPrizeGetUpdate, this.updateData, this);
    };
    OnPrizeGet.prototype.onEnable = function () {
        this.updateData();
    };
    OnPrizeGet.prototype.onDisable = function () {
    };
    OnPrizeGet.prototype.updateData = function () {
        var _this = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.onPrizeGetRewardMain,
            onSuccess: function (res) {
                if (!_this.isValid) {
                    return;
                }
                if (res.code === 0 && res.data) {
                    _this.curTime = util_1.default.onlineTimeNum;
                    _this.onPrizeData = res.data;
                    RedController_1.default.onPrizeData = _this.onPrizeData;
                    _this.init();
                }
                else {
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: function (res) {
            }
        });
    };
    OnPrizeGet.prototype.init = function () {
        var self = this;
        if (self && self.redLayout) {
            var onPrizeData = this.onPrizeData;
            var redChild = self.redLayout.children;
            var allRedData = onPrizeData.onPrizeRedData;
            var isHaveGet = false; //是否有可领取的红包
            var isWait = false; //是否要等待
            var getRedNum = 0; //红包数(未领取+已领取)
            var onceTimer = 0; //下一个红包所需要时间(秒)
            var nextRedTime = 0; //领取下一个红包剩余时间 (秒)
            var _loop_1 = function (i) {
                if (allRedData[i] && redChild[i]) {
                    redChild[i].active = true;
                    var redData = allRedData[i];
                    var targetNode = redChild[i];
                    targetNode.getChildByName("lable_money").getComponent(cc.Label).string = redData.amount + "";
                    targetNode.getChildByName("guangNode").active = false;
                    if (redData.waitTime >= this_1.curTime && redData.state == 0) {
                        targetNode.getChildByName("lable_getTip").getComponent(cc.Label).string = redData.waitTime / 60 + "\u5206\u949F";
                        if (!onceTimer) {
                            isWait = true;
                            nextRedTime = redData.waitTime - this_1.curTime;
                            onceTimer = redData.waitTime;
                        }
                        targetNode.getChildByName("img_state").getComponent(cc.Sprite).spriteFrame = self.redSprArray[0];
                    }
                    else if (redData.state == 0) {
                        targetNode.getChildByName("img_state").getComponent(cc.Sprite).spriteFrame = self.redSprArray[2];
                        targetNode.getChildByName("lable_getTip").getComponent(cc.Label).string = "\u53EF\u9886";
                        if (!isHaveGet) {
                            if (targetNode.getChildByName("guangNode") && targetNode.getChildByName("guangNode").getChildByName("saoguang")) {
                                var saoGuang_1 = targetNode.getChildByName("guangNode").getChildByName("saoguang");
                                saoGuang_1.stopAllActions();
                                saoGuang_1.x = -100;
                                targetNode.getChildByName("guangNode").active = true;
                                cc.tween(saoGuang_1).repeatForever(cc.tween().to(0.64, { x: 100 }).delay(0.64).call(function () { saoGuang_1.x = -100; })).start();
                                this_1.curOnPrizeRedData = redData;
                            }
                        }
                        isHaveGet = true;
                        getRedNum++;
                    }
                    else if (redData.state == 1) {
                        targetNode.getChildByName("img_state").getComponent(cc.Sprite).spriteFrame = self.redSprArray[1];
                        targetNode.getChildByName("lable_getTip").getComponent(cc.Label).string = "\u5DF2\u9886\u53D6";
                        getRedNum++;
                    }
                }
                else if (redChild[i]) {
                    redChild[i].active = false;
                }
            };
            var this_1 = this;
            for (var i = 0; i < allRedData.length; i++) {
                _loop_1(i);
            }
            self.btn_onPrizeGet.stopAllActions();
            self.btn_onPrizeGet.scale = 1;
            self.timeNum = nextRedTime;
            if (isHaveGet) {
                var tempColor = new cc.Color();
                self.btn_onPrizeGet.active = true;
                self.timeNode.active = false;
                self.btn_onPrizeGet.getComponent(cc.Sprite).spriteFrame = self.btnSprFrame[0];
                self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.Label).string = "\u9886\u53D6";
                self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#507900");
                cc.tween(self.btn_onPrizeGet).repeatForever(cc.tween().to(.4, { scale: 1.2 }).to(.4, { scale: 1 })).start();
            }
            else if (isWait && nextRedTime) {
                self.btn_onPrizeGet.active = false;
                self.openTimer();
            }
            else {
                var tempColor = new cc.Color();
                self.btn_onPrizeGet.active = true;
                self.btn_onPrizeGet.getComponent(cc.Sprite).spriteFrame = self.btnSprFrame[1];
                self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.Label).string = "\u660E\u65E5\u518D\u6765";
                self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#838383");
            }
            self.getRedNum = getRedNum;
            self.onceTimer = onceTimer;
            self.updateRec();
        }
    };
    OnPrizeGet.prototype.openTimer = function () {
        var self = this;
        self.timeNode.active = true;
        if (self.timeNum > 0) {
            self.lable_time.string = AssistCtr_1.AssistCtr.formatSeconds(self.timeNum);
            self.schedule(self.timeFun, 1);
        }
    };
    OnPrizeGet.prototype.timeFun = function () {
        var self = this;
        if (self.timeNum > 0) {
            self.lable_time.string = AssistCtr_1.AssistCtr.formatSeconds(self.timeNum);
            self.updateRec();
        }
        else {
            self.unschedule(self.timeFun);
            self.timeNum = 0;
            self.updateData();
        }
        self.timeNum--;
    };
    /**
     *
     * @param getRedNum 红包数(未领取+已领取)
     * @param rab 距离下一个红包所需时间百分比
     */
    OnPrizeGet.prototype.updateRec = function () {
        var self = this;
        var getRedNum = self.getRedNum;
        var pad = self.maxRectNum / 3;
        var rab = 0;
        if (self.onceTimer) {
            rab = (self.onceTimer - self.timeNum) / self.onceTimer;
        }
        var addWidth = (getRedNum - 1) * pad + rab * pad;
        if (addWidth > self.maxRectNum) {
            addWidth = self.maxRectNum;
        }
        else if (!addWidth || addWidth < 0) {
            addWidth = 0;
        }
        self.img_rect.width = addWidth;
    };
    OnPrizeGet.prototype.clickGet = function () {
        var self = this;
        var str = self.btn_onPrizeGet.getChildByName("lable_btn").getComponent(cc.Label).string;
        if (str == "明日再来") {
            AssistCtr_1.AssistCtr.showToastTip("请明日再来");
        }
        else if (str == "领取" && this.curOnPrizeRedData) {
            cc.game.emit(NameTs_1.default.Game_Pop_Open, {
                name: pageTs_1.default.pageName.GameOnPrizeGetReward,
                data: {
                    prizeRedData: this.curOnPrizeRedData
                },
            }, this);
        }
        if (this.curOnPrizeRedData) {
            TrackMgr_1.default.Online_rewards({
                activity_state: "点击主按钮",
                reward_state: this.curOnPrizeRedData.waitTime / 60 + "\u5206\u949F",
                button_name_hcdg: str
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], OnPrizeGet.prototype, "btn_onPrizeGet", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], OnPrizeGet.prototype, "btnSprFrame", void 0);
    __decorate([
        property(cc.Node)
    ], OnPrizeGet.prototype, "timeNode", void 0);
    __decorate([
        property(cc.Node)
    ], OnPrizeGet.prototype, "redLayout", void 0);
    __decorate([
        property(cc.Label)
    ], OnPrizeGet.prototype, "lable_time", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], OnPrizeGet.prototype, "redSprArray", void 0);
    __decorate([
        property(cc.Node)
    ], OnPrizeGet.prototype, "img_rect", void 0);
    OnPrizeGet = __decorate([
        ccclass
    ], OnPrizeGet);
    return OnPrizeGet;
}(cc.Component));
exports.default = OnPrizeGet;

cc._RF.pop();