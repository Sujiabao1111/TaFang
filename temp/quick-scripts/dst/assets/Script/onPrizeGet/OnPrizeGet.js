
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/onPrizeGet/OnPrizeGet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxvblByaXplR2V0XFxPblByaXplR2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCwyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLDZEQUF3RDtBQUN4RCwrQ0FBOEM7QUFDOUMscURBQWdEO0FBQ2hELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFhMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUEwT0M7UUF4T0csTUFBTTtRQUVFLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLGlCQUFXLEdBQTBCLEVBQUUsQ0FBQztRQUd4QyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsaUJBQVcsR0FBMEIsRUFBRSxDQUFDO1FBR3hDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBQ2hDLHVCQUFpQixHQUF1QixJQUFJLENBQUM7UUFFN0MsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixnQkFBVSxHQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDakMsZUFBUyxHQUFXLENBQUMsQ0FBQyxDQUFDLGNBQWM7UUFDckMsZUFBUyxHQUFHLENBQUMsQ0FBQyxDQUFNLGVBQWU7UUFDbkMsYUFBTyxHQUFHLENBQUMsQ0FBQyxDQUFRLE1BQU07O0lBeU10QyxDQUFDO0lBdk1HLDJCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUU3QyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxD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QURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO21EQUN1QjtJQUdoRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNlO0lBdEJoQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBME85QjtJQUFELGlCQUFDO0NBMU9ELEFBME9DLENBMU91QyxFQUFFLENBQUMsU0FBUyxHQTBPbkQ7a0JBMU9vQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xyXG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XHJcbmltcG9ydCBSZWRDb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sZWxyL1JlZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XHJcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBvblByaXplRGF0YSB7XHJcbiAgICBvblByaXplUmVkRGF0YTogQXJyYXk8b25Qcml6ZVJlZEl0ZW1EYXRhPiAgICAgICAgICAgLy/lhajpg6jnuqLljIXlhajpg6jkv6Hmga9cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBvblByaXplUmVkSXRlbURhdGEge1xyXG4gICAgc3RhdGU6IG51bWJlciwgICAgICAgICAgIC8vMC7mnKrpooblj5YgIDEu5bey6aKG5Y+WXHJcbiAgICBhbW91bnQ6IG51bWJlciwgICAgICAgICAgLy/nuqLljIXph5Hpop1cclxuICAgIGRvdWJsZUFtb3VudDogbnVtYmVyICAgICAvL+e/u+WAjeWQjue6ouWMhemHkeminVxyXG4gICAgd2FpdFRpbWU6IG51bWJlciwgICAgICAgIC8v6ZyA6KaB562J5b6F55qE5oC75pe26Ze0ICjnp5IpXHJcbn1cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPblByaXplR2V0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL+WcqOe6v+WlluWKsVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0bl9vblByaXplR2V0OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBwcml2YXRlIGJ0blNwckZyYW1lOiBBcnJheTxjYy5TcHJpdGVGcmFtZT4gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgdGltZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByZWRMYXlvdXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGFibGVfdGltZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHByaXZhdGUgcmVkU3ByQXJyYXk6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBpbWdfcmVjdDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25Qcml6ZURhdGE6IG9uUHJpemVEYXRhID0gbnVsbDtcclxuICAgIHByaXZhdGUgY3VyT25Qcml6ZVJlZERhdGE6IG9uUHJpemVSZWRJdGVtRGF0YSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lTnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgbWF4UmVjdE51bTogbnVtYmVyID0gMDsgLy/ov5vluqbmnaHmnIDlpKflrr3luqZcclxuICAgIHByaXZhdGUgZ2V0UmVkTnVtOiBudW1iZXIgPSAwOyAvL+e6ouWMheaVsCjmnKrpooblj5Yr5bey6aKG5Y+WKVxyXG4gICAgcHJpdmF0ZSBvbmNlVGltZXIgPSAwOyAgICAgIC8v5LiL5LiA5Liq57qi5YyF5omA6ZyA6KaB5pe26Ze0KOenkilcclxuICAgIHByaXZhdGUgY3VyVGltZSA9IDA7ICAgICAgICAvL+W9k+WJjeaXtumXtFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm1heFJlY3ROdW0gPSB0aGlzLmltZ19yZWN0LnBhcmVudC53aWR0aDtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMub25Qcml6ZUdldFVwZGF0ZSwgdGhpcy51cGRhdGVEYXRhLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURhdGEoKSB7XHJcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XHJcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3Qub25Qcml6ZUdldFJld2FyZE1haW4sXHJcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clRpbWUgPSB1dGlsLm9ubGluZVRpbWVOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblByaXplRGF0YSA9IHJlcy5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBSZWRDb250cm9sbGVyLm9uUHJpemVEYXRhID0gdGhpcy5vblByaXplRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+JywgMi41LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25GYWlsOiByZXMgPT4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHNlbGYgJiYgc2VsZi5yZWRMYXlvdXQpIHtcclxuICAgICAgICAgICAgbGV0IG9uUHJpemVEYXRhOiBvblByaXplRGF0YSA9IHRoaXMub25Qcml6ZURhdGE7XHJcbiAgICAgICAgICAgIGxldCByZWRDaGlsZCA9IHNlbGYucmVkTGF5b3V0LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBsZXQgYWxsUmVkRGF0YSA9IG9uUHJpemVEYXRhLm9uUHJpemVSZWREYXRhO1xyXG4gICAgICAgICAgICBsZXQgaXNIYXZlR2V0ID0gZmFsc2U7ICAvL+aYr+WQpuacieWPr+mihuWPlueahOe6ouWMhVxyXG4gICAgICAgICAgICBsZXQgaXNXYWl0ID0gZmFsc2U7ICAgICAvL+aYr+WQpuimgeetieW+hVxyXG4gICAgICAgICAgICBsZXQgZ2V0UmVkTnVtID0gMDsgICAgICAvL+e6ouWMheaVsCjmnKrpooblj5Yr5bey6aKG5Y+WKVxyXG4gICAgICAgICAgICBsZXQgb25jZVRpbWVyID0gMDsgICAgICAvL+S4i+S4gOS4que6ouWMheaJgOmcgOimgeaXtumXtCjnp5IpXHJcbiAgICAgICAgICAgIGxldCBuZXh0UmVkVGltZSA9IDA7ICAgICAgICAgICAgICAgIC8v6aKG5Y+W5LiL5LiA5Liq57qi5YyF5Ymp5L2Z5pe26Ze0ICjnp5IpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUmVkRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFsbFJlZERhdGFbaV0gJiYgcmVkQ2hpbGRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRDaGlsZFtpXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVkRGF0YTogb25Qcml6ZVJlZEl0ZW1EYXRhID0gYWxsUmVkRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IHJlZENoaWxkW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9tb25leVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlZERhdGEuYW1vdW50ICsgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdOb2RlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWREYXRhLndhaXRUaW1lID49IHRoaXMuY3VyVGltZSAmJiByZWREYXRhLnN0YXRlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX2dldFRpcFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke3JlZERhdGEud2FpdFRpbWUgLyA2MH3liIbpkp9gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9uY2VUaW1lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNXYWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSZWRUaW1lID0gcmVkRGF0YS53YWl0VGltZSAtIHRoaXMuY3VyVGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2VUaW1lciA9IHJlZERhdGEud2FpdFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYucmVkU3ByQXJyYXlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlZERhdGEuc3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi5yZWRTcHJBcnJheVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX2dldFRpcFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDlj6/pooZgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzSGF2ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJndWFuZ05vZGVcIikgJiYgdGFyZ2V0Tm9kZS5nZXRDaGlsZEJ5TmFtZShcImd1YW5nTm9kZVwiKS5nZXRDaGlsZEJ5TmFtZShcInNhb2d1YW5nXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNhb0d1YW5nOiBjYy5Ob2RlID0gdGFyZ2V0Tm9kZS5nZXRDaGlsZEJ5TmFtZShcImd1YW5nTm9kZVwiKS5nZXRDaGlsZEJ5TmFtZShcInNhb2d1YW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhb0d1YW5nLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FvR3VhbmcueCA9IC0xMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZS5nZXRDaGlsZEJ5TmFtZShcImd1YW5nTm9kZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHNhb0d1YW5nKS5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKDAuNjQsIHsgeDogMTAwIH0pLmRlbGF5KDAuNjQpLmNhbGwoKCkgPT4geyBzYW9HdWFuZy54ID0gLTEwMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ck9uUHJpemVSZWREYXRhID0gcmVkRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNIYXZlR2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UmVkTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlZERhdGEuc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi5yZWRTcHJBcnJheVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX2dldFRpcFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDlt7Lpooblj5ZgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRSZWROdW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZWRDaGlsZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZENoaWxkW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuYnRuX29uUHJpemVHZXQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgc2VsZi5idG5fb25Qcml6ZUdldC5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIHNlbGYudGltZU51bSA9IG5leHRSZWRUaW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzSGF2ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5idG5fb25Qcml6ZUdldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi50aW1lTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYnRuX29uUHJpemVHZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLmJ0blNwckZyYW1lWzBdO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5idG5fb25Qcml6ZUdldC5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX2J0blwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDpooblj5ZgO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5idG5fb25Qcml6ZUdldC5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX2J0blwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiIzUwNzkwMFwiKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHNlbGYuYnRuX29uUHJpemVHZXQpLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oKS50byguNCwgeyBzY2FsZTogMS4yIH0pLnRvKC40LCB7IHNjYWxlOiAxIH0pXHJcbiAgICAgICAgICAgICAgICApLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaXNXYWl0ICYmIG5leHRSZWRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmJ0bl9vblByaXplR2V0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vcGVuVGltZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wQ29sb3IgPSBuZXcgY2MuQ29sb3IoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYnRuX29uUHJpemVHZXQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYnRuX29uUHJpemVHZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLmJ0blNwckZyYW1lWzFdO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5idG5fb25Qcml6ZUdldC5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX2J0blwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDmmI7ml6Xlho3mnaVgO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5idG5fb25Qcml6ZUdldC5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX2J0blwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiIzgzODM4M1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmdldFJlZE51bSA9IGdldFJlZE51bTtcclxuICAgICAgICAgICAgc2VsZi5vbmNlVGltZXIgPSBvbmNlVGltZXI7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVJlYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvcGVuVGltZXIoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYudGltZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAoc2VsZi50aW1lTnVtID4gMCkge1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpbWUuc3RyaW5nID0gQXNzaXN0Q3RyLmZvcm1hdFNlY29uZHMoc2VsZi50aW1lTnVtKTtcclxuICAgICAgICAgICAgc2VsZi5zY2hlZHVsZShzZWxmLnRpbWVGdW4sIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aW1lRnVuKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoc2VsZi50aW1lTnVtID4gMCkge1xyXG4gICAgICAgICAgICBzZWxmLmxhYmxlX3RpbWUuc3RyaW5nID0gQXNzaXN0Q3RyLmZvcm1hdFNlY29uZHMoc2VsZi50aW1lTnVtKTtcclxuICAgICAgICAgICAgc2VsZi51cGRhdGVSZWMoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi51bnNjaGVkdWxlKHNlbGYudGltZUZ1bik7XHJcbiAgICAgICAgICAgIHNlbGYudGltZU51bSA9IDA7XHJcbiAgICAgICAgICAgIHNlbGYudXBkYXRlRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnRpbWVOdW0tLTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGdldFJlZE51bSDnuqLljIXmlbAo5pyq6aKG5Y+WK+W3sumihuWPlilcclxuICAgICAqIEBwYXJhbSByYWIg6Led56a75LiL5LiA5Liq57qi5YyF5omA6ZyA5pe26Ze055m+5YiG5q+UICAgICBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlUmVjKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZ2V0UmVkTnVtID0gc2VsZi5nZXRSZWROdW07XHJcbiAgICAgICAgbGV0IHBhZCA9IHNlbGYubWF4UmVjdE51bSAvIDM7XHJcbiAgICAgICAgbGV0IHJhYiA9IDA7XHJcbiAgICAgICAgaWYgKHNlbGYub25jZVRpbWVyKSB7XHJcbiAgICAgICAgICAgIHJhYiA9IChzZWxmLm9uY2VUaW1lciAtIHNlbGYudGltZU51bSkgLyBzZWxmLm9uY2VUaW1lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhZGRXaWR0aCA9IChnZXRSZWROdW0gLSAxKSAqIHBhZCArIHJhYiAqIHBhZDtcclxuICAgICAgICBpZiAoYWRkV2lkdGggPiBzZWxmLm1heFJlY3ROdW0pIHtcclxuICAgICAgICAgICAgYWRkV2lkdGggPSBzZWxmLm1heFJlY3ROdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCFhZGRXaWR0aCB8fCBhZGRXaWR0aCA8IDApIHtcclxuICAgICAgICAgICAgYWRkV2lkdGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmltZ19yZWN0LndpZHRoID0gYWRkV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tHZXQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzdHIgPSBzZWxmLmJ0bl9vblByaXplR2V0LmdldENoaWxkQnlOYW1lKFwibGFibGVfYnRuXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nO1xyXG4gICAgICAgIGlmIChzdHIgPT0gXCLmmI7ml6Xlho3mnaVcIikge1xyXG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6K+35piO5pel5YaN5p2lXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN0ciA9PSBcIumihuWPllwiICYmIHRoaXMuY3VyT25Qcml6ZVJlZERhdGEpIHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1BvcF9PcGVuLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBwYWdlVHMucGFnZU5hbWUuR2FtZU9uUHJpemVHZXRSZXdhcmQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpemVSZWREYXRhOiB0aGlzLmN1ck9uUHJpemVSZWREYXRhXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyT25Qcml6ZVJlZERhdGEpIHtcclxuICAgICAgICAgICAgVHJhY2tNZ3IuT25saW5lX3Jld2FyZHMoe1xyXG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi54K55Ye75Li75oyJ6ZKuXCIsXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfc3RhdGU6IGAke3RoaXMuY3VyT25Qcml6ZVJlZERhdGEud2FpdFRpbWUgLyA2MH3liIbpkp9gLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uX25hbWVfaGNkZzogc3RyXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==