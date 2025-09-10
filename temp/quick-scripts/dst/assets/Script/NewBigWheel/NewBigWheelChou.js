
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
        _this.controller = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcTmV3QmlnV2hlZWxDaG91LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCxtREFBa0Q7QUFDbEQsMkNBQThDO0FBQzlDLG1FQUE4RDtBQUU5RCwrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBRWpFLHFEQUFnRDtBQUNoRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBNmZDO1FBM2ZHLGVBQVMsR0FBWSxJQUFJLENBQUE7UUFFekIsbUJBQWEsR0FBWSxJQUFJLENBQUE7UUFFN0Isa0JBQVksR0FBWSxJQUFJLENBQUE7UUFFNUIsdUJBQWlCLEdBQVksSUFBSSxDQUFBO1FBRWpDLDBCQUFvQixHQUFZLElBQUksQ0FBQTtRQUVwQyx3QkFBa0IsR0FBWSxJQUFJLENBQUE7UUFFbEMsdUJBQWlCLEdBQVksSUFBSSxDQUFBO1FBRWpDLHNCQUFnQixHQUFhLElBQUksQ0FBQTtRQUVqQyxnQkFBVSxHQUFZLElBQUksQ0FBQTtRQUUxQixlQUFTLEdBQTBCLEVBQUUsQ0FBQTtRQWtCckMsaUJBQVcsR0FBUSxFQUFFLENBQUM7O0lBdWQxQixDQUFDO0lBbGRHLGdDQUFNLEdBQU47UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFFcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFB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RSxDQUFDLEtBQUssQ0FBQzs2REFDYztJQUVqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNRO0lBRTFCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3NEQUNVO0lBcEJwQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBNmZuQztJQUFELHNCQUFDO0NBN2ZELEFBNmZDLENBN2Y0QyxFQUFFLENBQUMsU0FBUyxHQTZmeEQ7a0JBN2ZvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgeyB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcclxuaW1wb3J0IFJld2FyZENvbnRyb2xsZXIgZnJvbSBcIi4uL2NvbnRyb2xlbHIvUmV3YXJkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgQWpheCBmcm9tIFwiLi4vc2VydmVyL1NlcnZlck1nci9BamF4XCI7XHJcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xyXG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IEFkVXRpbCB9IGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRVdGlsXCI7XHJcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XHJcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0JpZ1doZWVsQ2hvdSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXplTm9kZTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuX2NsaWNrQ2hvdTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2hvdUl0ZW1Ob2RlOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5fY2xpY2tGcmVlQ2hvdTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuX2NsaWNrTm9Db3VudENob3U6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bl9jbGlja1ZpZGVvQ2hvdTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuX2NsaWNrVGFza0Nob3U6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV9yZW1haW5DaG91OiBjYy5MYWJlbCA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY29udHJvbGxlcjogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc2VsZWN0SW1nOiBBcnJheTxjYy5TcHJpdGVGcmFtZT4gPSBbXVxyXG5cclxuICAgIG1heFByaXplSW5kZXg6IG51bWJlcjtcclxuICAgIGxvdHRlcnlEYXRhOiBhbnk7XHJcbiAgICB3aGVlbEl0ZW1zOiBhbnlbXTtcclxuICAgIHdoZWVsQXdhcmRDb3VudDogbnVtYmVyO1xyXG4gICAgd2hlZWxJc1J1bm5pbmc6IGJvb2xlYW47XHJcbiAgICB0dXJuTnVtYmVyOiBudW1iZXI7XHJcbiAgICBzcGVlZDogbnVtYmVyO1xyXG4gICAgY3VycmVudEZwczogbnVtYmVyO1xyXG4gICAgdHVybklkOiBudW1iZXI7XHJcbiAgICBoYXNXaGVlbERyYXc6IGJvb2xlYW47XHJcbiAgICBnZXRQcml6ZUluZGV4OiBudW1iZXI7XHJcbiAgICB3aGVlbFJ1bkVuZGFsbGJhY2s6IGFueTtcclxuICAgIGNvbnRyb2xsZXJKczogYW55O1xyXG4gICAgZnJlZVRpbWVzOiBudW1iZXI7XHJcbiAgICBkb3VibGVEYXRhOiBhbnk7XHJcbiAgICBwcml6ZURhdGE6IGFueTtcclxuICAgIHR1cm5JZEFycmF5OiBhbnkgPSBbXTtcclxuICAgIGl0ZW1MaXN0VjI6IGFueTtcclxuICAgIGlzT25FdmVudDogYW55O1xyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLm1heFByaXplSW5kZXggPSBzZWxmLnByaXplTm9kZS5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgICAgIHNlbGYubG90dGVyeURhdGEgPSBudWxsO1xyXG4gICAgICAgIHNlbGYud2hlZWxJdGVtcyA9IFtdO1xyXG4gICAgICAgIHNlbGYud2hlZWxBd2FyZENvdW50ID0gMDtcclxuICAgICAgICBzZWxmLndoZWVsSXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgc2VsZi50dXJuTnVtYmVyID0gMDsvLyDovazliqjmoLzmlbBcclxuICAgICAgICBzZWxmLnNwZWVkID0gMDsvLyDpgJ/luqbvvIjlpJrlsJHluKfot7PkuIDmoLzvvIlcclxuICAgICAgICBzZWxmLmN1cnJlbnRGcHMgPSAwOy8vIOS4jnNwZWVk6YWN5ZCIXHJcbiAgICAgICAgc2VsZi50dXJuSWQgPSAwOy8vIOS4i+WPkeeahOimgei9rOWIsOeahOWdkeS9jVxyXG4gICAgICAgIHNlbGYuaGFzV2hlZWxEcmF3ID0gZmFsc2U7Ly8g5LiOdHVybklk6YWN5ZCIXHJcbiAgICAgICAgc2VsZi5nZXRQcml6ZUluZGV4ID0gMDsvLyDlvZPliY3pgInkuK3lnZHkvY3vvIjlrp7pmYXlnZHkvY3ku44x5byA5aeL77yJXHJcbiAgICAgICAgc2VsZi53aGVlbFJ1bkVuZGFsbGJhY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBzZWxmLmNvbnRyb2xsZXJKcyA9IHRoaXMuY29udHJvbGxlci5nZXRDb21wb25lbnQoXCJOZXdCaWdXaGVlbENvbnRyb2xsZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ2hvdShldmVudERhdGEpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFzZWxmLmNvbnRyb2xsZXJKcykgcmV0dXJuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBzZWxmLmNvbnRyb2xsZXJKcy5nZXREYXRhKCk7XHJcbiAgICAgICAgbGV0IGlzTG9va1ZpZGVvID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGV2ZW50RGF0YSAmJiBldmVudERhdGEuaXNOZXdCaWdUYXNrSXRlbSkge1xyXG4gICAgICAgICAgICBpc0xvb2tWaWRlbyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDmmK/lkKblj6/ku6Xngrnlh7vml4vovazvvJrmlbDmja7mmK/lkKbkuIvovb3lrozmiJDjgIHlpZblk4HmmK/lkKblhajpg6joo4Xovb3lrozmiJDjgIHovaznm5jmmK/lkKblnKjovazliqhcclxuICAgICAgICBpZiAoc2VsZi53aGVlbElzUnVubmluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEdsb2JhbC5hdWRpb1V0aWxzLnBsYXlDbGljaygpO1xyXG4gICAgICAgIGxldCB0eXBlID0gZGF0YS5idXR0b25UeXBlO1xyXG4gICAgICAgIGlmICh0eXBlID09IDEgJiYgIWlzTG9va1ZpZGVvKSB7ICAgICAgICAgIC8v5YWN6LS55oq9XHJcbiAgICAgICAgICAgIFRyYWNrTWdyLmxvdHRvX3Bob25lX2NsaWNrKHtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXR5X2J1dHRvbl9jbGljazogXCLlhY3otLnmir3lpZZcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QubmV3QmlnV2hlZWxfYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR1cm5JZCA9IHRoaXMuY2hlY2tUdXJuSWQocmVzLmRhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50dXJuSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdWJsZURhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEFuaSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuTHVja0RyYXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9uYW1lOiB0aGlzLmdldFN0cihyZXMuZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX3Jlc3VsdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5MdWNrRHJhdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9uYW1lOiB0aGlzLmdldFN0cihyZXMuZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9yZXN1bHQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QoJ+e9kee7nOWHuumUmX4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAyIHx8IGlzTG9va1ZpZGVvKSB7ICAgICAgICAvL+eci+inhumikVxyXG4gICAgICAgICAgICBpZiAoIWV2ZW50RGF0YSB8fCAhZXZlbnREYXRhLmlzTmV3QmlnVGFza0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5XaGVlbEdldFJlc3RUaW1lcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5bu26L+fMTDmr6vnp5LvvIzmiY3kuI3kvJrlh7rnjrDor7fmsYLotoXml7blpLHotKXpl67pophcclxuICAgICAgICAgICAgICAgICAgICBYTVNESy5wb3N0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5uZXdCaWdXaGVlbF93YXRjaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50dXJuSWQgPSB0aGlzLmNoZWNrVHVybklkKHJlcy5kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50dXJuSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdWJsZURhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuTHVja0RyYXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX25hbWU6IHRoaXMuZ2V0U3RyKHJlcy5kYXRhLmlkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9yZXN1bHQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LndoZWVsLkx1Y2tEcmF3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgYXdhZF9uYW1lOiB0aGlzLmdldFN0cihyZXMuZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FkX3Jlc3VsdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuTHVja0RyYXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9uYW1lOiB0aGlzLmdldFN0cihyZXMuZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX3Jlc3VsdDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LndoZWVsLkx1Y2tEcmF3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FkX25hbWU6IHRoaXMuZ2V0U3RyKHJlcy5kYXRhLmlkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FkX3Jlc3VsdDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbDogcmVzID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDovb3op4bpopHlpLHotKXvvIzor7fnqI3lkI7vvIFcIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIFhNU0RLLnBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QubmV3QmlnV2hlZWxfd2F0Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHVybklkID0gdGhpcy5jaGVja1R1cm5JZChyZXMuZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50dXJuSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdWJsZURhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLkx1Y2tEcmF3KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX25hbWU6IHRoaXMuZ2V0U3RyKHJlcy5kYXRhLmlkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX3Jlc3VsdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3Qud2hlZWwuTHVja0RyYXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgYXdhZF9uYW1lOiB0aGlzLmdldFN0cihyZXMuZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGF3YWRfcmVzdWx0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuTHVja0RyYXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FkX25hbWU6IHRoaXMuZ2V0U3RyKHJlcy5kYXRhLmlkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhZF9yZXN1bHQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC53aGVlbC5MdWNrRHJhdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGF3YWRfbmFtZTogdGhpcy5nZXRTdHIocmVzLmRhdGEuaWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgYXdhZF9yZXN1bHQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbDogcmVzID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDMpIHsgICAgICAgICAvL+WBmuS7u+WKoVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJKcy5tb3ZlVGFza1BvcygpO1xyXG4gICAgICAgICAgICBYTVNESy50b2FzdChcIuWujOaIkOS7u+WKoeWPr+iOt+W+l+aKveWlluasoeaVsFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSA0KSB7ICAgICAgICAgLy/ku7vliqHmrKHmlbDnlKjlroxcclxuICAgICAgICAgICAgWE1TREsudG9hc3QoXCLku4rml6Xmir3lpZbmrKHmlbDlt7LnlKjlrozvvIzor7fmmI7ml6Xlho3mnaVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QW5pKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnR1cm5OdW1iZXIgPSB0aGlzLm1heFByaXplSW5kZXggKiAyIC0gdGhpcy50dXJuSWQ7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDU7XHJcblxyXG4gICAgICAgIHRoaXMud2hlZWxJc1J1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgIHV0aWwuc2V0VGVtcFBhcm0oXCJuZXdCaWdXaGVlbF93aGVlbElzUnVubmluZ1wiLCB0cnVlKTtcclxuICAgICAgICBzZWxmLmNvbnRyb2xsZXJKcy5zZXRTY3JvbGxlcihmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxJc1J1bm5pbmcgJiYgKHRoaXMudHVybk51bWJlciA+IDApKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEZwcysrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50RnBzID49IHRoaXMuc3BlZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIOi9rOS6huS4gOagvFxyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuTnVtYmVyLS07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50dXJuTnVtYmVyIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50dXJuSWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNXaGVlbERyYXcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2hlZWxJc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzV2hlZWxEcmF3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMud2hlZWxSdW5FbmRhbGxiYWNrICYmIHRoaXMud2hlZWxSdW5FbmRhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Qcml6ZVdpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNXaGVlbERyYXcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHVybk51bWJlciA9IHRoaXMubWF4UHJpemVJbmRleCArICh0aGlzLm1heFByaXplSW5kZXggLSB0aGlzLmdldFByaXplSW5kZXgpICsgKHRoaXMuZ2V0UHJpemVJbmRleCArICh0aGlzLnR1cm5JZCAtIHRoaXMuZ2V0UHJpemVJbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50dXJuTnVtYmVyID49IDE2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR1cm5OdW1iZXIgLT0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53aGVlbElzUnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi9rOWKqOaViOaenFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMucHJpemVOb2RlLmNoaWxkcmVuW3RoaXMuZ2V0UHJpemVJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJpemVJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFByaXplSW5kZXggPj0gdGhpcy5tYXhQcml6ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJpemVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRFbmQgPSB0aGlzLnByaXplTm9kZS5jaGlsZHJlblt0aGlzLmdldFByaXplSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgJiYgY2hpbGRFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNlbGVjdEltZ1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbmQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNlbGVjdEltZ1sxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6LCD5pW06YCf5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RnBzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNXaGVlbERyYXcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zcGVlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gdGhpcy5lYXNlT3V0Q2lyYyh0aGlzLnNwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLnByaXplTm9kZS5jaGlsZHJlblt0aGlzLmdldFByaXplSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2VsZWN0SW1nWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1R1cm5JZChpZCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdHVybklkQXJyYXkgPSBzZWxmLnR1cm5JZEFycmF5O1xyXG4gICAgICAgIHNlbGYucHJpemVEYXRhID0gbnVsbDtcclxuICAgICAgICBpZiAodHVybklkQXJyYXkgJiYgdHVybklkQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHVybklkQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0dXJuSWRBcnJheVtpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHJpemVEYXRhID0gdHVybklkQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR1cm5JZEFycmF5W2ldLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBlYXNlT3V0Q2lyYyhwb3MpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KChwb3MgKyAxKSwgMikgKyAxNik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlV2luRGF0YShkYXRhKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjaG91Tm9kZUFycmF5ID0gc2VsZi5jaG91SXRlbU5vZGUuY2hpbGRyZW47ICAgICAgICAgICAgICAgICAvL+abtOaWsOi9rOebmOS/oeaBr1xyXG4gICAgICAgIGxldCBpdGVtTGlzdFYyID0gZGF0YS5pdGVtTGlzdFYyO1xyXG4gICAgICAgIGxldCB0aW1lcyA9IGRhdGEudGltZXM7XHJcbiAgICAgICAgc2VsZi5mcmVlVGltZXMgPSB0aW1lcztcclxuICAgICAgICBzZWxmLml0ZW1MaXN0VjIgPSBpdGVtTGlzdFYyO1xyXG4gICAgICAgIHNlbGYubGFibGVfcmVtYWluQ2hvdS5zdHJpbmcgPSBg6L+Y5YmpJHt0aW1lc33mrKFgO1xyXG5cclxuICAgICAgICBzZWxmLnR1cm5JZEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbUxpc3RWMi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNob3VOb2RlQXJyYXlbaV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hvdUl0ZW1EYXRhID0gaXRlbUxpc3RWMltpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hvdUl0ZW1EYXRhLnR5cGUgPT0gMSkgey8v6YGT5YW3XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFByb3BTcHJpdGUoY2hvdUl0ZW1EYXRhLmtleUlkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hvdUl0ZW1EYXRhLnR5cGUgPT0gMikgey8v54K55YC8XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFBvaW50U3ByaXRlKGNob3VJdGVtRGF0YS5rZXlJZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNob3VJdGVtRGF0YS50eXBlID09IDQpIHsvL+aJi+acuueijueJh1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlLmZpbmRQaG9uZVNwcml0ZSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNob3VJdGVtRGF0YS50eXBlID09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUGhvbmVTcHJpdGUoMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUGhvbmVTcHJpdGUoMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNob3VJdGVtRGF0YS5yZXdhcmRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5omL5py656KO54mHKiR7Y2hvdUl0ZW1EYXRhLnJld2FyZFZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hvdUl0ZW1EYXRhLnR5cGUgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmiYvmnLpcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hvdUl0ZW1EYXRhLnR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hvdUl0ZW1EYXRhLmtleUlkID09IHVwZGF0ZVR5cGUuaG9uZ2Jhbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi57qi5YyF5biBXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hvdUl0ZW1EYXRhLmtleUlkID09IHVwZGF0ZVR5cGUucHJvZHVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi54Ku5Y+wXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOiwouiwouWPguS4jmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYudHVybklkQXJyYXkucHVzaCh7IGluZGV4OiBpLCBpZDogY2hvdUl0ZW1EYXRhLmlkLCB0eXBlOiBjaG91SXRlbURhdGEudHlwZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnNldENob3VCdG5UeXBlKGRhdGEuYnV0dG9uVHlwZSk7XHJcblxyXG4gICAgICAgIGlmICghc2VsZi5pc09uRXZlbnQpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3Iub24oXCJOZXdCaWdXaGVlbFByaXplX2FnYWluQ2hvdVwiLCBzZWxmLmNsaWNrQ2hvdSwgc2VsZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuaXNPbkV2ZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHIoaWQpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGl0ZW1MaXN0VjIgPSBzZWxmLml0ZW1MaXN0VjI7XHJcbiAgICAgICAgbGV0IHN0ciA9IGBgO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbUxpc3RWMi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hvdUl0ZW1EYXRhID0gaXRlbUxpc3RWMltpXTtcclxuICAgICAgICAgICAgaWYgKGNob3VJdGVtRGF0YS5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNob3VJdGVtRGF0YSA9IGl0ZW1MaXN0VjJbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hvdUl0ZW1EYXRhLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IFJld2FyZENvbnRyb2xsZXIuaW5zdGFuY2UuZmluZFByb3BOYW1lKGNob3VJdGVtRGF0YS5rZXlJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaG91SXRlbURhdGEudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZS5maW5kUG9pbnROYW1lKGNob3VJdGVtRGF0YS5rZXlJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaG91SXRlbURhdGEudHlwZSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gYOaJi+acuueijueJh2A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaG91SXRlbURhdGEudHlwZSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gYOaJi+acumA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUeXBlKGlkKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBpdGVtTGlzdFYyID0gc2VsZi5pdGVtTGlzdFYyO1xyXG4gICAgICAgIGxldCBzdHIgPSBgYDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1MaXN0VjIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNob3VJdGVtRGF0YSA9IGl0ZW1MaXN0VjJbaV07XHJcbiAgICAgICAgICAgIGlmIChjaG91SXRlbURhdGEuaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaG91SXRlbURhdGEudHlwZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldENob3VCdG5UeXBlKHR5cGUpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHNlbGYuYnRuX2NsaWNrRnJlZUNob3UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc2VsZi5idG5fY2xpY2tOb0NvdW50Q2hvdS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLmJ0bl9jbGlja1ZpZGVvQ2hvdS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLmJ0bl9jbGlja1Rhc2tDaG91LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHNlbGYuYnRuX2NsaWNrRnJlZUNob3UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tGcmVlQ2hvdS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja0ZyZWVDaG91LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAwLjkpLCBjYy5zY2FsZVRvKDAuMywgMSkpKSk7XHJcbiAgICAgICAgICAgIFRyYWNrTWdyLmxvdHRvX2RpYWwoe1xyXG4gICAgICAgICAgICAgICAgY2xpY2tfbG90dG9fc3RhdGU6IFwi6L+Y5YmpMeasoVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5sb3R0b19kaWFsLFxyXG4gICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBjbGlja19sb3R0b19zdGF0ZTogXCLov5jliakx5qyhXCIsXHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDIpIHtcclxuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tWaWRlb0Nob3UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tWaWRlb0Nob3Uuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tWaWRlb0Nob3UucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDAuOSksIGNjLnNjYWxlVG8oMC4zLCAxKSkpKTtcclxuICAgICAgICAgICAgVHJhY2tNZ3IubG90dG9fZGlhbCh7XHJcbiAgICAgICAgICAgICAgICBjbGlja19sb3R0b19zdGF0ZTogXCLnnIvop4bpopFcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIC8vICAgICBldmVudE5hbWU6IFNBQ29uc3QubG90dG9fZGlhbCxcclxuICAgICAgICAgICAgLy8gICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY2xpY2tfbG90dG9fc3RhdGU6IFwi55yL6KeG6aKRXCIsXHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDMpIHtcclxuICAgICAgICAgICAgc2VsZi5idG5fY2xpY2tUYXNrQ2hvdS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBUcmFja01nci5sb3R0b19kaWFsKHtcclxuICAgICAgICAgICAgICAgIGNsaWNrX2xvdHRvX3N0YXRlOiBcIuWOu+WBmuS7u+WKoVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgLy8gICAgIGV2ZW50TmFtZTogU0FDb25zdC5sb3R0b19kaWFsLFxyXG4gICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBjbGlja19sb3R0b19zdGF0ZTogXCLljrvlgZrku7vliqFcIixcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICBzZWxmLmJ0bl9jbGlja05vQ291bnRDaG91LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIFRyYWNrTWdyLmxvdHRvX2RpYWwoe1xyXG4gICAgICAgICAgICAgICAgY2xpY2tfbG90dG9fc3RhdGU6IFwi5piO5pel5YaN5p2lXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICAvLyAgICAgZXZlbnROYW1lOiBTQUNvbnN0LmxvdHRvX2RpYWwsXHJcbiAgICAgICAgICAgIC8vICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNsaWNrX2xvdHRvX3N0YXRlOiBcIuaYjuaXpeWGjeadpVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3BlblByaXplV2luKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcHJpemVEYXRhID0gc2VsZi5wcml6ZURhdGE7XHJcbiAgICAgICAgaWYgKCFwcml6ZURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByaXplRGF0YS50eXBlID09IDYpIHtcclxuICAgICAgICAgICAgbGV0IG1haW5TdHIgPSB0aGlzLmdldFN0cihwcml6ZURhdGEuaWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVySnMub3BlblByaXplV2luKG51bGwsIG1haW5TdHIsIHRoaXMuZG91YmxlRGF0YSk7XHJcblxyXG4gICAgICAgICAgICB1dGlsLnNldFRlbXBQYXJtKFwibmV3QmlnV2hlZWxfd2hlZWxJc1J1bm5pbmdcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJKcy5zZXRTY3JvbGxlcih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBtYWluU3RyID0gdGhpcy5nZXRTdHIocHJpemVEYXRhLmlkKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckpzLm9wZW5Qcml6ZVdpbihwcml6ZURhdGEudHlwZSwgbWFpblN0ciwgdGhpcy5kb3VibGVEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWwuc2V0VGVtcFBhcm0oXCJuZXdCaWdXaGVlbF93aGVlbElzUnVubmluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckpzLnNldFNjcm9sbGVyKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaG91T2soKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=