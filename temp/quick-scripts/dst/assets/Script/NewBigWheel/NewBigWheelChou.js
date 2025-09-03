
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/NewBigWheel/NewBigWheelChou.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '27996LIHZ9KWIZqUtz/ICLp', 'NewBigWheelChou');
// Script/NewBigWheel/NewBigWheelChou.ts

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
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var RewardController_1 = require("../controlelr/RewardController");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewBigWheelChou = /** @class */ (function (_super) {
    __extends(NewBigWheelChou, _super);
    function NewBigWheelChou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prizeNode = null;
        _this.btn_clickChou = null;
        _this.chouItemNode = null;
        _this.btn_clickFreeChou = null;
        _this.btn_clickNoCountChou = null;
        _this.btn_clickVideoChou = null;
        _this.btn_clickTaskChou = null;
        _this.lable_remainChou = null;
        _this.selectImg = [];
        _this.turnIdArray = [];
        return _this;
    }
    NewBigWheelChou.prototype.onLoad = function () {
        var self = this;
        self.maxPrizeIndex = self.prizeNode.children.length;
        self.lotteryData = null;
        self.wheelItems = [];
        self.wheelAwardCount = 0;
        self.wheelIsRunning = false;
        self.turnNumber = 0; // 转动格数
        self.speed = 0; // 速度（多少帧跳一格）
        self.currentFps = 0; // 与speed配合
        self.turnId = 0; // 下发的要转到的坑位
        self.hasWheelDraw = false; // 与turnId配合
        self.getPrizeIndex = 0; // 当前选中坑位（实际坑位从1开始）
        self.wheelRunEndallback = null;
        self.controllerJs = this.controller.getComponent("NewBigWheelController");
    };
    NewBigWheelChou.prototype.start = function () {
    };
    NewBigWheelChou.prototype.clickChou = function (eventData) {
        var _this = this;
        var self = this;
        if (!self.controllerJs)
            return;
        var data = self.controllerJs.getData();
        var isLookVideo = false;
        if (eventData && eventData.isNewBigTaskItem) {
            isLookVideo = true;
        }
        // 是否可以点击旋转：数据是否下载完成、奖品是否全部装载完成、转盘是否在转动
        if (self.wheelIsRunning) {
            return;
        }
        // Global.audioUtils.playClick();
        var type = data.buttonType;
        if (type == 1 && !isLookVideo) { //免费抽
            TrackMgr_1.default.lotto_phone_click({
                activity_button_click: "免费抽奖"
            });
            XMSDK_1.default.getdataStr({
                url: UrlConst_1.UrlConst.newBigWheel_action,
                onSuccess: function (res) {
                    if (res.code === 0) {
                        _this.turnId = _this.checkTurnId(res.data.id);
                        if (_this.turnId == null) {
                            return;
                        }
                        _this.doubleData = res.data;
                        _this.startAni();
                        TrackMgr_1.default.LuckDraw({
                            awad_name: _this.getStr(res.data.id),
                            awad_result: true
                        });
                    }
                    else {
                        if (res.data && res.data.id) {
                            TrackMgr_1.default.LuckDraw({
                                awad_name: _this.getStr(res.data.id),
                                awad_result: false
                            });
                        }
                        XMSDK_1.default.toast(res.message || '网络出错~');
                    }
                },
                onFail: function (err) {
                    XMSDK_1.default.toast('网络出错~');
                }
            });
        }
        else if (type == 2 || isLookVideo) { //看视频
            if (!eventData || !eventData.isNewBigTaskItem) {
                AdController_1.default.loadAd(AdPosition_1.AdPosition.WheelGetRestTimes, function () {
                    //延迟10毫秒，才不会出现请求超时失败问题
                    XMSDK_1.default.post({
                        url: UrlConst_1.UrlConst.newBigWheel_watch,
                        onSuccess: function (res) {
                            if (res.code === 0) {
                                _this.turnId = _this.checkTurnId(res.data.id);
                                if (_this.turnId == null) {
                                    return;
                                }
                                _this.doubleData = res.data;
                                _this.startAni();
                                TrackMgr_1.default.LuckDraw({
                                    awad_name: _this.getStr(res.data.id),
                                    awad_result: true
                                });
                                // XMSDK.track({
                                //     eventName: SAConst.wheel.LuckDraw,
                                //     props: {
                                //         awad_name: this.getStr(res.data.id),
                                //         awad_result: true
                                //     }
                                // });
                            }
                            else {
                                if (res.data && res.data.id) {
                                    TrackMgr_1.default.LuckDraw({
                                        awad_name: _this.getStr(res.data.id),
                                        awad_result: false
                                    });
                                    // XMSDK.track({
                                    //     eventName: SAConst.wheel.LuckDraw,
                                    //     props: {
                                    //         awad_name: this.getStr(res.data.id),
                                    //         awad_result: false
                                    //     }
                                    // });
                                }
                                XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                            }
                        },
                        onFail: function (res) {
                        }
                    });
                }, function () {
                    AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
                });
            }
            else {
                XMSDK_1.default.post({
                    url: UrlConst_1.UrlConst.newBigWheel_watch,
                    onSuccess: function (res) {
                        if (res.code === 0) {
                            _this.turnId = _this.checkTurnId(res.data.id);
                            if (_this.turnId == null) {
                                return;
                            }
                            _this.doubleData = res.data;
                            _this.startAni();
                            TrackMgr_1.default.LuckDraw({
                                awad_name: _this.getStr(res.data.id),
                                awad_result: true
                            });
                            // XMSDK.track({
                            //     eventName: SAConst.wheel.LuckDraw,
                            //     props: {
                            //         awad_name: this.getStr(res.data.id),
                            //         awad_result: true
                            //     }
                            // });
                        }
                        else {
                            if (res.data && res.data.id) {
                                TrackMgr_1.default.LuckDraw({
                                    awad_name: _this.getStr(res.data.id),
                                    awad_result: false
                                });
                                // XMSDK.track({
                                //     eventName: SAConst.wheel.LuckDraw,
                                //     props: {
                                //         awad_name: this.getStr(res.data.id),
                                //         awad_result: false
                                //     }
                                // });
                            }
                            XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                        }
                    },
                    onFail: function (res) {
                    }
                });
            }
        }
        else if (type == 3) { //做任务
            this.controllerJs.moveTaskPos();
            XMSDK_1.default.toast("完成任务可获得抽奖次数");
        }
        else if (type == 4) { //任务次数用完
            XMSDK_1.default.toast("今日抽奖次数已用完，请明日再来");
        }
    };
    NewBigWheelChou.prototype.startAni = function () {
        var self = this;
        this.turnNumber = this.maxPrizeIndex * 2 - this.turnId;
        this.speed = 5;
        this.wheelIsRunning = true;
        util_1.default.setTempParm("newBigWheel_wheelIsRunning", true);
        self.controllerJs.setScroller(false);
    };
    NewBigWheelChou.prototype.update = function (dt) {
        if (this.wheelIsRunning && (this.turnNumber > 0)) {
            this.currentFps++;
            if (this.currentFps >= this.speed) {
                // 转了一格
                this.turnNumber--;
                if (this.turnNumber <= 0) {
                    if (this.turnId >= 0) {
                        if (this.hasWheelDraw) {
                            this.wheelIsRunning = false;
                            this.hasWheelDraw = false;
                            //this.wheelRunEndallback && this.wheelRunEndallback();
                            this.openPrizeWin();
                        }
                        else {
                            this.hasWheelDraw = true;
                        }
                        this.turnNumber = this.maxPrizeIndex + (this.maxPrizeIndex - this.getPrizeIndex) + (this.getPrizeIndex + (this.turnId - this.getPrizeIndex));
                        if (this.turnNumber >= 16) {
                            this.turnNumber -= 8;
                        }
                    }
                }
                if (this.wheelIsRunning) {
                    // 转动效果
                    var child = this.prizeNode.children[this.getPrizeIndex];
                    this.getPrizeIndex++;
                    if (this.getPrizeIndex >= this.maxPrizeIndex) {
                        this.getPrizeIndex = 0;
                    }
                    var childEnd = this.prizeNode.children[this.getPrizeIndex];
                    if (child && childEnd) {
                        child.getComponent(cc.Sprite).spriteFrame = this.selectImg[0];
                        childEnd.getComponent(cc.Sprite).spriteFrame = this.selectImg[1];
                    }
                    // 调整速度
                    this.currentFps = 0;
                    if (this.hasWheelDraw) {
                        // this.speed++;
                        this.speed = this.easeOutCirc(this.speed);
                    }
                }
                else {
                    var child = this.prizeNode.children[this.getPrizeIndex];
                    if (child) {
                        child.getComponent(cc.Sprite).spriteFrame = this.selectImg[1];
                    }
                }
            }
        }
    };
    NewBigWheelChou.prototype.checkTurnId = function (id) {
        var self = this;
        var turnIdArray = self.turnIdArray;
        self.prizeData = null;
        if (turnIdArray && turnIdArray.length) {
            for (var i = 0; i < turnIdArray.length; i++) {
                if (turnIdArray[i].id == id) {
                    self.prizeData = turnIdArray[i];
                    return turnIdArray[i].index;
                }
            }
        }
        return null;
    };
    NewBigWheelChou.prototype.easeOutCirc = function (pos) {
        return Math.sqrt(Math.pow((pos + 1), 2) + 16);
    };
    NewBigWheelChou.prototype.updateWinData = function (data) {
        var self = this;
        var chouNodeArray = self.chouItemNode.children; //更新转盘信息
        var itemListV2 = data.itemListV2;
        var times = data.times;
        self.freeTimes = times;
        self.itemListV2 = itemListV2;
        self.lable_remainChou.string = "\u8FD8\u5269" + times + "\u6B21";
        self.turnIdArray = [];
        for (var i = 0; i < itemListV2.length; i++) {
            var item = chouNodeArray[i];
            if (item) {
                var chouItemData = itemListV2[i];
                if (chouItemData.type == 1) { //道具
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController_1.default.instance.findPropSprite(chouItemData.keyId);
                }
                else if (chouItemData.type == 2) { //点值
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController_1.default.instance.findPointSprite(chouItemData.keyId);
                }
                else if (chouItemData.type == 4) { //手机碎片
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController_1.default.instance.findPhoneSprite(0);
                }
                else if (chouItemData.type == 5) {
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController_1.default.instance.findPhoneSprite(1);
                }
                else {
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController_1.default.instance.findPhoneSprite(2);
                }
                if (chouItemData.rewardValue) {
                    item.getChildByName("num").getComponent(cc.Label).string = "\u624B\u673A\u788E\u7247*" + chouItemData.rewardValue;
                }
                else {
                    if (chouItemData.type == 5) {
                        item.getChildByName("num").getComponent(cc.Label).string = "手机";
                    }
                    else if (chouItemData.type == 2) {
                        if (chouItemData.keyId == faceTs_1.updateType.hongbao) {
                            item.getChildByName("num").getComponent(cc.Label).string = "红包币";
                        }
                        else if (chouItemData.keyId == faceTs_1.updateType.product) {
                            item.getChildByName("num").getComponent(cc.Label).string = "炮台";
                        }
                    }
                    else {
                        item.getChildByName("num").getComponent(cc.Label).string = "\u8C22\u8C22\u53C2\u4E0E";
                    }
                }
                self.turnIdArray.push({ index: i, id: chouItemData.id, type: chouItemData.type });
            }
        }
        self.setChouBtnType(data.buttonType);
        if (!self.isOnEvent) {
            cc.director.on("NewBigWheelPrize_againChou", self.clickChou, self);
        }
        self.isOnEvent = true;
    };
    NewBigWheelChou.prototype.getStr = function (id) {
        var self = this;
        var itemListV2 = self.itemListV2;
        var str = "";
        for (var i = 0; i < itemListV2.length; i++) {
            var chouItemData = itemListV2[i];
            if (chouItemData.id == id) {
                var chouItemData_1 = itemListV2[i];
                if (chouItemData_1.type == 1) {
                    str = RewardController_1.default.instance.findPropName(chouItemData_1.keyId);
                }
                else if (chouItemData_1.type == 2) {
                    str = RewardController_1.default.instance.findPointName(chouItemData_1.keyId);
                }
                else if (chouItemData_1.type == 4) {
                    str = "\u624B\u673A\u788E\u7247";
                }
                else if (chouItemData_1.type == 5) {
                    str = "\u624B\u673A";
                }
            }
        }
        return str;
    };
    NewBigWheelChou.prototype.getType = function (id) {
        var self = this;
        var itemListV2 = self.itemListV2;
        var str = "";
        for (var i = 0; i < itemListV2.length; i++) {
            var chouItemData = itemListV2[i];
            if (chouItemData.id == id) {
                return chouItemData.type;
            }
        }
    };
    NewBigWheelChou.prototype.setChouBtnType = function (type) {
        var self = this;
        self.btn_clickFreeChou.active = false;
        self.btn_clickNoCountChou.active = false;
        self.btn_clickVideoChou.active = false;
        self.btn_clickTaskChou.active = false;
        if (type == 1) {
            self.btn_clickFreeChou.active = true;
            self.btn_clickFreeChou.stopAllActions();
            self.btn_clickFreeChou.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 0.9), cc.scaleTo(0.3, 1))));
            TrackMgr_1.default.lotto_dial({
                click_lotto_state: "还剩1次"
            });
            // XMSDK.track({
            //     eventName: SAConst.lotto_dial,
            //     props: {
            //         click_lotto_state: "还剩1次",
            //     }
            // });
        }
        else if (type == 2) {
            self.btn_clickVideoChou.active = true;
            self.btn_clickVideoChou.stopAllActions();
            self.btn_clickVideoChou.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 0.9), cc.scaleTo(0.3, 1))));
            TrackMgr_1.default.lotto_dial({
                click_lotto_state: "看视频"
            });
            // XMSDK.track({
            //     eventName: SAConst.lotto_dial,
            //     props: {
            //         click_lotto_state: "看视频",
            //     }
            // });
        }
        else if (type == 3) {
            self.btn_clickTaskChou.active = true;
            TrackMgr_1.default.lotto_dial({
                click_lotto_state: "去做任务"
            });
            // XMSDK.track({
            //     eventName: SAConst.lotto_dial,
            //     props: {
            //         click_lotto_state: "去做任务",
            //     }
            // });
        }
        else if (type == 4) {
            self.btn_clickNoCountChou.active = true;
            TrackMgr_1.default.lotto_dial({
                click_lotto_state: "明日再来"
            });
            // XMSDK.track({
            //     eventName: SAConst.lotto_dial,
            //     props: {
            //         click_lotto_state: "明日再来",
            //     }
            // });
        }
    };
    NewBigWheelChou.prototype.openPrizeWin = function () {
        var self = this;
        var prizeData = self.prizeData;
        if (!prizeData) {
            return;
        }
        if (prizeData.type == 6) {
            var mainStr = this.getStr(prizeData.id);
            this.controllerJs.openPrizeWin(null, mainStr, this.doubleData);
            util_1.default.setTempParm("newBigWheel_wheelIsRunning", false);
            this.controllerJs.setScroller(true);
        }
        else {
            var mainStr = this.getStr(prizeData.id);
            this.controllerJs.openPrizeWin(prizeData.type, mainStr, this.doubleData);
            util_1.default.setTempParm("newBigWheel_wheelIsRunning", false);
            this.controllerJs.setScroller(true);
        }
    };
    NewBigWheelChou.prototype.chouOk = function () {
        var self = this;
    };
    __decorate([
        property(cc.Node)
    ], NewBigWheelChou.prototype, "prizeNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelChou.prototype, "btn_clickChou", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelChou.prototype, "chouItemNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelChou.prototype, "btn_clickFreeChou", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelChou.prototype, "btn_clickNoCountChou", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelChou.prototype, "btn_clickVideoChou", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelChou.prototype, "btn_clickTaskChou", void 0);
    __decorate([
        property(cc.Label)
    ], NewBigWheelChou.prototype, "lable_remainChou", void 0);
    __decorate([
        property(cc.Node)
    ], NewBigWheelChou.prototype, "controller", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NewBigWheelChou.prototype, "selectImg", void 0);
    NewBigWheelChou = __decorate([
        ccclass
    ], NewBigWheelChou);
    return NewBigWheelChou;
}(cc.Component));
exports.default = NewBigWheelChou;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnV2hlZWxDaG91LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCxtREFBa0Q7QUFDbEQsMkNBQThDO0FBQzlDLG1FQUE4RDtBQUU5RCwrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBRWpFLHFEQUFnRDtBQUNoRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBNmZDO1FBM2ZHLGVBQVMsR0FBWSxJQUFJLENBQUE7UUFFekIsbUJBQWEsR0FBWSxJQUFJLENBQUE7UUFFN0Isa0JBQVksR0FBWSxJQUFJLENBQUE7UUFFNUIsdUJBQWlCLEdBQVksSUFBSSxDQUFBO1FBRWpDLDBCQUFvQixHQUFZLElBQUksQ0FBQTtRQUVwQyx3QkFBa0IsR0FBWSxJQUFJLENBQUE7UUFFbEMsdUJBQWlCLEdBQVksSUFBSSxDQUFBO1FBRWpDLHNCQUFnQixHQUFhLElBQUksQ0FBQTtRQUlqQyxlQUFTLEdBQTBCLEVBQUUsQ0FBQTtRQWtCckMsaUJBQVcsR0FBUSxFQUFFLENBQUM7O0lBdWQxQixDQUFDO0lBbGRHLGdDQUFNLEdBQU47UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFFcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7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QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNDO0lBRW5CO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3NEQUNVO0lBcEJwQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBNmZuQztJQUFELHNCQUFDO0NBN2ZELEFBNmZDLENBN2Y0QyxFQUFFLENBQUMsU0FBUyxHQTZmeEQ7a0JBN2ZvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IFJld2FyZENvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xlbHIvUmV3YXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IEFqYXggZnJvbSBcIi4uL3NlcnZlci9TZXJ2ZXJNZ3IvQWpheFwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBBZFV0aWwgfSBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkVXRpbFwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0JpZ1doZWVsQ2hvdSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpemVOb2RlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9jbGlja0Nob3U6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2hvdUl0ZW1Ob2RlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9jbGlja0ZyZWVDaG91OiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9jbGlja05vQ291bnRDaG91OiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9jbGlja1ZpZGVvQ2hvdTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5fY2xpY2tUYXNrQ2hvdTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfcmVtYWluQ2hvdTogY2MuTGFiZWwgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY29udHJvbGxlcjogY2MuTm9kZVxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHNlbGVjdEltZzogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW11cblxuICAgIG1heFByaXplSW5kZXg6IG51bWJlcjtcbiAgICBsb3R0ZXJ5RGF0YTogYW55O1xuICAgIHdoZWVsSXRlbXM6IGFueVtdO1xuICAgIHdoZWVsQXdhcmRDb3VudDogbnVtYmVyO1xuICAgIHdoZWVsSXNSdW5uaW5nOiBib29sZWFuO1xuICAgIHR1cm5OdW1iZXI6IG51bWJlcjtcbiAgICBzcGVlZDogbnVtYmVyO1xuICAgIGN1cnJlbnRGcHM6IG51bWJlcjtcbiAgICB0dXJuSWQ6IG51bWJlcjtcbiAgICBoYXNXaGVlbERyYXc6IGJvb2xlYW47XG4gICAgZ2V0UHJpemVJbmRleDogbnVtYmVyO1xuICAgIHdoZWVsUnVuRW5kYWxsYmFjazogYW55O1xuICAgIGNvbnRyb2xsZXJKczogYW55O1xuICAgIGZyZWVUaW1lczogbnVtYmVyO1xuICAgIGRvdWJsZURhdGE6IGFueTtcbiAgICBwcml6ZURhdGE6IGFueTtcbiAgICB0dXJuSWRBcnJheTogYW55ID0gW107XG4gICAgaXRlbUxpc3RWMjogYW55O1xuICAgIGlzT25FdmVudDogYW55O1xuXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLm1heFByaXplSW5kZXggPSBzZWxmLnByaXplTm9kZS5jaGlsZHJlbi5sZW5ndGg7XG5cbiAgICAgICAgc2VsZi5sb3R0ZXJ5RGF0YSA9IG51bGw7XG4gICAgICAgIHNlbGYud2hlZWxJdGVtcyA9IFtdO1xuICAgICAgICBzZWxmLndoZWVsQXdhcmRDb3VudCA9IDA7XG4gICAgICAgIHNlbGYud2hlZWxJc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgc2VsZi50dXJuTnVtYmVyID0gMDsvLyDovazliqjmoLzmlbBcbiAgICAgICAgc2VsZi5zcGVlZCA9IDA7Ly8g6YCf5bqm77yI5aSa5bCR5bin6Lez5LiA5qC877yJXG4gICAgICAgIHNlbGYuY3VycmVudEZwcyA9IDA7Ly8g5LiOc3BlZWTphY3lkIhcbiAgICAgICAgc2VsZi50dXJuSWQgPSAwOy8vIOS4i+WPkeeahOimgei9rOWIsOeahOWdkeS9jVxuICAgICAgICBzZWxmLmhhc1doZWVsRHJhdyA9IGZhbHNlOy8vIOS4jnR1cm5JZOmFjeWQiFxuICAgICAgICBzZWxmLmdldFByaXplSW5kZXggPSAwOy8vIOW9k+WJjemAieS4reWdkeS9je+8iOWunumZheWdkeS9jeS7jjHlvIDlp4vvvIlcbiAgICAgICAgc2VsZi53aGVlbFJ1bkVuZGFsbGJhY2sgPSBudWxsO1xuXG4gICAgICAgIHNlbGYuY29udHJvbGxlckpzID0gdGhpcy5jb250cm9sbGVyLmdldENvbXBvbmVudChcIk5ld0JpZ1doZWVsQ29udHJvbGxlclwiKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIGNsaWNrQ2hvdShldmVudERhdGEpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuY29udHJvbGxlckpzKSByZXR1cm5cbiAgICAgICAgbGV0IGRhdGEgPSBzZWxmLmNvbnRyb2xsZXJKcy5nZXREYXRhKCk7XG4gICAgICAgIGxldCBpc0xvb2tWaWRlbyA9IGZhbHNlO1xuICAgICAgICBpZiAoZXZlbnREYXRhICYmIGV2ZW50RGF0YS5pc05ld0JpZ1Rhc2tJdGVtKSB7XG4gICAgICAgICAgICBpc0xvb2tWaWRlbyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmmK/lkKblj6/ku6Xngrnlh7vml4vovazvvJrmlbDmja7mmK/lkKbkuIvovb3lrozmiJDjgIHlpZblk4HmmK/lkKblhajpg6joo4Xovb3lrozmiJDjgIHovaznm5jmmK/lkKblnKjovazliqhcbiAgICAgICAgaWYgKHNlbGYud2hlZWxJc1J1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBHbG9iYWwuYXVkaW9VdGlscy5wbGF5Q2xpY2soKTtcbiAgICAgICAgbGV0IHR5cGUgPSBkYXRhLmJ1dHRvblR5cGU7XG4gICAgICAgIGlmICh0eXBlID09IDEgJiYgIWlzTG9va1ZpZGVvKSB7ICAgICAgICAgIC8v5YWN6LS55oq9XG4gICAgICAgICAgICBUcmFja01nci5sb3R0b19waG9uZV9jbGljayh7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfYnV0dG9uX2NsaWNrOiBcIuWFjei0ueaKveWlllwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5uZXdCaWdXaGVlbF9hY3Rpb24sXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHVybklkID0gdGhpcy5jaGVja1R1cm5JZChyZXMuZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50dXJuSWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3VibGVEYXRhID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QW5pKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLkx1Y2tEcmF3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX25hbWU6IHRoaXMuZ2V0U3RyKHJlcy5kYXRhLmlkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX3Jlc3VsdDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLkx1Y2tEcmF3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9uYW1lOiB0aGlzLmdldFN0cihyZXMuZGF0YS5pZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWRfcmVzdWx0OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFhNU0RLLnRvYXN0KHJlcy5tZXNzYWdlIHx8ICfnvZHnu5zlh7rplJl+Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QoJ+e9kee7nOWHuumUmX4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMiB8fCBpc0xvb2tWaWRlbykgeyAgICAgICAgLy/nnIvop4bpopFcbiAgICAgICAgICAgIGlmICghZXZlbnREYXRhIHx8ICFldmVudERhdGEuaXNOZXdCaWdUYXNrSXRlbSkge1xuICAgICAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5XaGVlbEdldFJlc3RUaW1lcywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL+W7tui/nzEw5q+r56eS77yM5omN5LiN5Lya5Ye6546w6K+35rGC6LaF5pe25aSx6LSl6Zeu6aKYXG4gICAgICAgICAgICAgICAgICAgIFhNU0RLLnBvc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5uZXdCaWdXaGVlbF93YXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50dXJuSWQgPSB0aGlzLmNoZWNrVHVybklkKHJlcy5kYXRhLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHVybklkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG91YmxlRGF0YSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QW5pKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLkx1Y2tEcmF3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWRfbmFtZTogdGhpcy5nZXRTdHIocmVzLmRhdGEuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9yZXN1bHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LndoZWVsLkx1Y2tEcmF3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FkX25hbWU6IHRoaXMuZ2V0U3RyKHJlcy5kYXRhLmlkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FkX3Jlc3VsdDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuTHVja0RyYXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWRfbmFtZTogdGhpcy5nZXRTdHIocmVzLmRhdGEuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWRfcmVzdWx0OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3Qud2hlZWwuTHVja0RyYXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgYXdhZF9uYW1lOiB0aGlzLmdldFN0cihyZXMuZGF0YS5pZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGF3YWRfcmVzdWx0OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QocmVzLm1lc3NhZ2UgfHwgJ+e9kee7nOWHuumUmX4nLCAyLjUsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWw6IHJlcyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgWE1TREsucG9zdCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QubmV3QmlnV2hlZWxfd2F0Y2gsXG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHVybklkID0gdGhpcy5jaGVja1R1cm5JZChyZXMuZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHVybklkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG91YmxlRGF0YSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBbmkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5MdWNrRHJhdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWRfbmFtZTogdGhpcy5nZXRTdHIocmVzLmRhdGEuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX3Jlc3VsdDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3Qud2hlZWwuTHVja0RyYXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FkX25hbWU6IHRoaXMuZ2V0U3RyKHJlcy5kYXRhLmlkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGF3YWRfcmVzdWx0OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuTHVja0RyYXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9uYW1lOiB0aGlzLmdldFN0cihyZXMuZGF0YS5pZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX3Jlc3VsdDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LndoZWVsLkx1Y2tEcmF3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FkX25hbWU6IHRoaXMuZ2V0U3RyKHJlcy5kYXRhLmlkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FkX3Jlc3VsdDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QocmVzLm1lc3NhZ2UgfHwgJ+e9kee7nOWHuumUmX4nLCAyLjUsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvbkZhaWw6IHJlcyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAzKSB7ICAgICAgICAgLy/lgZrku7vliqFcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckpzLm1vdmVUYXNrUG9zKCk7XG4gICAgICAgICAgICBYTVNESy50b2FzdChcIuWujOaIkOS7u+WKoeWPr+iOt+W+l+aKveWlluasoeaVsFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDQpIHsgICAgICAgICAvL+S7u+WKoeasoeaVsOeUqOWujFxuICAgICAgICAgICAgWE1TREsudG9hc3QoXCLku4rml6Xmir3lpZbmrKHmlbDlt7LnlKjlrozvvIzor7fmmI7ml6Xlho3mnaVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEFuaSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLnR1cm5OdW1iZXIgPSB0aGlzLm1heFByaXplSW5kZXggKiAyIC0gdGhpcy50dXJuSWQ7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA1O1xuXG4gICAgICAgIHRoaXMud2hlZWxJc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICB1dGlsLnNldFRlbXBQYXJtKFwibmV3QmlnV2hlZWxfd2hlZWxJc1J1bm5pbmdcIiwgdHJ1ZSk7XG4gICAgICAgIHNlbGYuY29udHJvbGxlckpzLnNldFNjcm9sbGVyKGZhbHNlKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMud2hlZWxJc1J1bm5pbmcgJiYgKHRoaXMudHVybk51bWJlciA+IDApKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRGcHMrKztcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRGcHMgPj0gdGhpcy5zcGVlZCkge1xuICAgICAgICAgICAgICAgIC8vIOi9rOS6huS4gOagvFxuICAgICAgICAgICAgICAgIHRoaXMudHVybk51bWJlci0tO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR1cm5OdW1iZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50dXJuSWQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzV2hlZWxEcmF3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aGVlbElzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzV2hlZWxEcmF3ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLndoZWVsUnVuRW5kYWxsYmFjayAmJiB0aGlzLndoZWVsUnVuRW5kYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblByaXplV2luKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzV2hlZWxEcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHVybk51bWJlciA9IHRoaXMubWF4UHJpemVJbmRleCArICh0aGlzLm1heFByaXplSW5kZXggLSB0aGlzLmdldFByaXplSW5kZXgpICsgKHRoaXMuZ2V0UHJpemVJbmRleCArICh0aGlzLnR1cm5JZCAtIHRoaXMuZ2V0UHJpemVJbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHVybk51bWJlciA+PSAxNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHVybk51bWJlciAtPSA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxJc1J1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6L2s5Yqo5pWI5p6cXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMucHJpemVOb2RlLmNoaWxkcmVuW3RoaXMuZ2V0UHJpemVJbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQcml6ZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFByaXplSW5kZXggPj0gdGhpcy5tYXhQcml6ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByaXplSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkRW5kID0gdGhpcy5wcml6ZU5vZGUuY2hpbGRyZW5bdGhpcy5nZXRQcml6ZUluZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgJiYgY2hpbGRFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zZWxlY3RJbWdbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVuZC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2VsZWN0SW1nWzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIOiwg+aVtOmAn+W6plxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRGcHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNXaGVlbERyYXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3BlZWQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLmVhc2VPdXRDaXJjKHRoaXMuc3BlZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLnByaXplTm9kZS5jaGlsZHJlblt0aGlzLmdldFByaXplSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zZWxlY3RJbWdbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1R1cm5JZChpZCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCB0dXJuSWRBcnJheSA9IHNlbGYudHVybklkQXJyYXk7XG4gICAgICAgIHNlbGYucHJpemVEYXRhID0gbnVsbDtcbiAgICAgICAgaWYodHVybklkQXJyYXkmJnR1cm5JZEFycmF5Lmxlbmd0aCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR1cm5JZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR1cm5JZEFycmF5W2ldLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHJpemVEYXRhID0gdHVybklkQXJyYXlbaV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0dXJuSWRBcnJheVtpXS5pbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGVhc2VPdXRDaXJjKHBvcykge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KChwb3MgKyAxKSwgMikgKyAxNik7XG4gICAgfVxuXG4gICAgdXBkYXRlV2luRGF0YShkYXRhKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGNob3VOb2RlQXJyYXkgPSBzZWxmLmNob3VJdGVtTm9kZS5jaGlsZHJlbjsgICAgICAgICAgICAgICAgIC8v5pu05paw6L2s55uY5L+h5oGvXG4gICAgICAgIGxldCBpdGVtTGlzdFYyID0gZGF0YS5pdGVtTGlzdFYyO1xuICAgICAgICBsZXQgdGltZXMgPSBkYXRhLnRpbWVzO1xuICAgICAgICBzZWxmLmZyZWVUaW1lcyA9IHRpbWVzO1xuICAgICAgICBzZWxmLml0ZW1MaXN0VjIgPSBpdGVtTGlzdFYyO1xuICAgICAgICBzZWxmLmxhYmxlX3JlbWFpbkNob3Uuc3RyaW5nID0gYOi/mOWJqSR7dGltZXN95qyhYDtcblxuICAgICAgICBzZWxmLnR1cm5JZEFycmF5ID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtTGlzdFYyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNob3VOb2RlQXJyYXlbaV07XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBjaG91SXRlbURhdGEgPSBpdGVtTGlzdFYyW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNob3VJdGVtRGF0YS50eXBlID09IDEpIHsvL+mBk+WFt1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUHJvcFNwcml0ZShjaG91SXRlbURhdGEua2V5SWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNob3VJdGVtRGF0YS50eXBlID09IDIpIHsvL+eCueWAvFxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUG9pbnRTcHJpdGUoY2hvdUl0ZW1EYXRhLmtleUlkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaG91SXRlbURhdGEudHlwZSA9PSA0KSB7Ly/miYvmnLrnoo7niYdcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFBob25lU3ByaXRlKDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaG91SXRlbURhdGEudHlwZSA9PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlLmZpbmRQaG9uZVNwcml0ZSgxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlLmZpbmRQaG9uZVNwcml0ZSgyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hvdUl0ZW1EYXRhLnJld2FyZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5omL5py656KO54mHKiR7Y2hvdUl0ZW1EYXRhLnJld2FyZFZhbHVlfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hvdUl0ZW1EYXRhLnR5cGUgPT0gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5omL5py6XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hvdUl0ZW1EYXRhLnR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNob3VJdGVtRGF0YS5rZXlJZCA9PSB1cGRhdGVUeXBlLmhvbmdiYW8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLnuqLljIXluIFcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hvdUl0ZW1EYXRhLmtleUlkID09IHVwZGF0ZVR5cGUucHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIueCruWPsFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOiwouiwouWPguS4jmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLnR1cm5JZEFycmF5LnB1c2goeyBpbmRleDogaSwgaWQ6IGNob3VJdGVtRGF0YS5pZCwgdHlwZTogY2hvdUl0ZW1EYXRhLnR5cGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zZXRDaG91QnRuVHlwZShkYXRhLmJ1dHRvblR5cGUpO1xuXG4gICAgICAgIGlmICghc2VsZi5pc09uRXZlbnQpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLm9uKFwiTmV3QmlnV2hlZWxQcml6ZV9hZ2FpbkNob3VcIiwgc2VsZi5jbGlja0Nob3UsIHNlbGYpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaXNPbkV2ZW50ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRTdHIoaWQpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgaXRlbUxpc3RWMiA9IHNlbGYuaXRlbUxpc3RWMjtcbiAgICAgICAgbGV0IHN0ciA9IGBgO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1MaXN0VjIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjaG91SXRlbURhdGEgPSBpdGVtTGlzdFYyW2ldO1xuICAgICAgICAgICAgaWYgKGNob3VJdGVtRGF0YS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgIGxldCBjaG91SXRlbURhdGEgPSBpdGVtTGlzdFYyW2ldO1xuICAgICAgICAgICAgICAgIGlmIChjaG91SXRlbURhdGEudHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFByb3BOYW1lKGNob3VJdGVtRGF0YS5rZXlJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNob3VJdGVtRGF0YS50eXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUG9pbnROYW1lKGNob3VJdGVtRGF0YS5rZXlJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNob3VJdGVtRGF0YS50eXBlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gYOaJi+acuueijueJh2A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNob3VJdGVtRGF0YS50eXBlID09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gYOaJi+acumA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgZ2V0VHlwZShpZCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBpdGVtTGlzdFYyID0gc2VsZi5pdGVtTGlzdFYyO1xuICAgICAgICBsZXQgc3RyID0gYGA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbUxpc3RWMi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNob3VJdGVtRGF0YSA9IGl0ZW1MaXN0VjJbaV07XG4gICAgICAgICAgICBpZiAoY2hvdUl0ZW1EYXRhLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNob3VJdGVtRGF0YS50eXBlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDaG91QnRuVHlwZSh0eXBlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLmJ0bl9jbGlja0ZyZWVDaG91LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzZWxmLmJ0bl9jbGlja05vQ291bnRDaG91LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvQ2hvdS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5idG5fY2xpY2tUYXNrQ2hvdS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBpZiAodHlwZSA9PSAxKSB7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0ZyZWVDaG91LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0ZyZWVDaG91LnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0ZyZWVDaG91LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAwLjkpLCBjYy5zY2FsZVRvKDAuMywgMSkpKSk7XG4gICAgICAgICAgICBUcmFja01nci5sb3R0b19kaWFsKHtcbiAgICAgICAgICAgICAgICBjbGlja19sb3R0b19zdGF0ZTogXCLov5jliakx5qyhXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBYTVNESy50cmFjayh7XG4gICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LmxvdHRvX2RpYWwsXG4gICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2xpY2tfbG90dG9fc3RhdGU6IFwi6L+Y5YmpMeasoVwiLFxuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMikge1xuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tWaWRlb0Nob3UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrVmlkZW9DaG91LnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvQ2hvdS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMywgMC45KSwgY2Muc2NhbGVUbygwLjMsIDEpKSkpO1xuICAgICAgICAgICAgVHJhY2tNZ3IubG90dG9fZGlhbCh7XG4gICAgICAgICAgICAgICAgY2xpY2tfbG90dG9fc3RhdGU6IFwi55yL6KeG6aKRXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBYTVNESy50cmFjayh7XG4gICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LmxvdHRvX2RpYWwsXG4gICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2xpY2tfbG90dG9fc3RhdGU6IFwi55yL6KeG6aKRXCIsXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAzKSB7XG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja1Rhc2tDaG91LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBUcmFja01nci5sb3R0b19kaWFsKHtcbiAgICAgICAgICAgICAgICBjbGlja19sb3R0b19zdGF0ZTogXCLljrvlgZrku7vliqFcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcbiAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QubG90dG9fZGlhbCxcbiAgICAgICAgICAgIC8vICAgICBwcm9wczoge1xuICAgICAgICAgICAgLy8gICAgICAgICBjbGlja19sb3R0b19zdGF0ZTogXCLljrvlgZrku7vliqFcIixcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDQpIHtcbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrTm9Db3VudENob3UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIFRyYWNrTWdyLmxvdHRvX2RpYWwoe1xuICAgICAgICAgICAgICAgIGNsaWNrX2xvdHRvX3N0YXRlOiBcIuaYjuaXpeWGjeadpVwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gWE1TREsudHJhY2soe1xuICAgICAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5sb3R0b19kaWFsLFxuICAgICAgICAgICAgLy8gICAgIHByb3BzOiB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNsaWNrX2xvdHRvX3N0YXRlOiBcIuaYjuaXpeWGjeadpVwiLFxuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlblByaXplV2luKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBwcml6ZURhdGEgPSBzZWxmLnByaXplRGF0YTtcbiAgICAgICAgaWYgKCFwcml6ZURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcml6ZURhdGEudHlwZSA9PSA2KSB7XG4gICAgICAgICAgICBsZXQgbWFpblN0ciA9IHRoaXMuZ2V0U3RyKHByaXplRGF0YS5pZCk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckpzLm9wZW5Qcml6ZVdpbihudWxsLCBtYWluU3RyLCB0aGlzLmRvdWJsZURhdGEpO1xuXG4gICAgICAgICAgICB1dGlsLnNldFRlbXBQYXJtKFwibmV3QmlnV2hlZWxfd2hlZWxJc1J1bm5pbmdcIiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVySnMuc2V0U2Nyb2xsZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgbWFpblN0ciA9IHRoaXMuZ2V0U3RyKHByaXplRGF0YS5pZCk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckpzLm9wZW5Qcml6ZVdpbihwcml6ZURhdGEudHlwZSwgbWFpblN0ciwgdGhpcy5kb3VibGVEYXRhKTtcblxuICAgICAgICAgICAgdXRpbC5zZXRUZW1wUGFybShcIm5ld0JpZ1doZWVsX3doZWVsSXNSdW5uaW5nXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckpzLnNldFNjcm9sbGVyKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hvdU9rKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgfVxuXG59XG4iXX0=