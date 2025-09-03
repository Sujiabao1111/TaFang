"use strict";
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