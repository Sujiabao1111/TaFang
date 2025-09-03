"use strict";
cc._RF.push(module, '0ab1ciE7xFOeb8enGVsGtJj', 'gameWallet');
// Script/pop/gameWallet.ts

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
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var pool_1 = require("../common/pool");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameWallet = /** @class */ (function (_super) {
    __extends(gameWallet, _super);
    function gameWallet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_myGold = null;
        _this.lable_money = null;
        _this.sucView = null;
        _this.ruleView = null;
        _this.tipFrameView = null;
        _this.selectLayout = null;
        _this.selectLayout2 = null;
        _this.img_frame = null;
        _this.selectSprArray = [];
        _this.spine_shou = null;
        _this.conditionNode = null;
        _this.layout_tiXianTip = null;
        _this.btn_goPass = null;
        _this.btnSprArray = [];
        _this.btn_selectMoney = null;
        //提现规则---------------------------
        _this.lable_ruleContent = null;
        //提现成功---------------------------
        _this.lable_sucTip = null;
        //提现提示
        _this.lable_tipNeedPass = null;
        //增加东西
        _this.addCoinItem = null;
        //在哪里增加
        _this.addCoinBox = null;
        //------脚本变量------
        _this.curSelectNode = null; //当前选中的金额框       
        _this.closeCallback = null;
        _this.wxData = null;
        _this.isInsert = false;
        _this.onceEnter = true;
        _this.tempRules = [];
        _this.btnDataStr = "cashData";
        _this.tixian_state = "\u5F53\u524D\u9009\u62E9\u7684\u63D0\u73B0\u6863\u4F4D";
        return _this;
    }
    gameWallet.prototype.onLoad = function () {
        cc.game.on(NameTs_1.default.bindWechatSuccess, this.wxSucFun, this);
    };
    gameWallet.prototype.init = function (data) {
        var _this = this;
        if (data) {
            this.setData(data);
        }
        this.isInsert = Math.random() > .5;
        if (this.isInsert) {
            AdController_1.default.preVideoAd(AdPosition_1.AdPosition.WalletAwardInsert);
        }
        //数据更新
        cc.game.on(NameTs_1.default.Game_View_UserDataUpdata, function (res) {
            if (res == faceTs_1.updateType.coin) {
                var userData = util_1.default.userData;
                _this.lable_myGold.string = String(userData.coin);
            }
        }, this);
        //增加金币
        cc.game.on(NameTs_1.default.Game_Wallet_AddCoin, function (res) {
            if (res > 0) {
                _this.createNum(res);
            }
        }, this);
        this.walletPool = new pool_1.default(cc.instantiate(this.addCoinItem));
    };
    gameWallet.prototype.onEnable = function () {
        //this.initData();
        TrackMgr_1.default.AppViewScreen({
            app_page_title: "提现页"
        });
    };
    gameWallet.prototype.onDisable = function () {
        if (this.spine_shou.active) {
            this.spine_shou.active = false;
        }
        this.ruleView.active = false;
        this.sucView.active = false;
        this.tipFrameView.active = false;
        this.closeCallback && this.closeCallback();
        this.closeCallback = null;
        this.walletPool.clearPool();
    };
    gameWallet.prototype.openGuide = function () {
        this.spine_shou.active = true;
    };
    gameWallet.prototype.wxSucFun = function () {
        AssistCtr_1.AssistCtr.showToastTip("绑定成功");
        this.initData();
    };
    gameWallet.prototype.initData = function () {
        var _this = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.wallet_main2,
            onSuccess: function (res) {
                if (!_this.isValid) {
                    return;
                }
                if (res.code === 0 && res.data) {
                    _this.setData(res.data);
                }
                else {
                }
            },
            onFail: function (err) {
            }
        });
    };
    gameWallet.prototype.setCloseCall = function (callback) {
        this.closeCallback = callback;
    };
    gameWallet.prototype.setlayout = function (parentNode, data, pre, maxNum) {
        var _this = this;
        var parentNodeChild = parentNode.children;
        var addNum = data.length - parentNodeChild.length;
        if (addNum > maxNum) {
            addNum = maxNum;
        }
        if (addNum > 0) {
            for (var i = 0; i < addNum; i++) {
                var ins = cc.instantiate(pre);
                ins.parent = parentNode;
            }
        }
        else {
            addNum = Math.abs(addNum);
            for (var i = 0; i < addNum; i++) {
                if (parentNodeChild[0]) {
                    parentNodeChild[0].destroy();
                }
            }
        }
        var _loop_1 = function (i) {
            parentNodeChild[i].targetOff(this_1);
            parentNodeChild[i].on(cc.Node.EventType.TOUCH_END, function () {
                soundController_1.default.singleton.clickAudio();
                if (parentNodeChild[i] && parentNodeChild[i]["" + _this.btnDataStr] && parentNodeChild[i]["" + _this.btnDataStr].hasWithdraw == 1) {
                    AssistCtr_1.AssistCtr.showToastTip("已提现");
                }
                else {
                    _this.clickSelectMoney(parentNodeChild[i]);
                }
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < parentNodeChild.length; i++) {
            _loop_1(i);
        }
        var tempColor = new cc.Color();
        var _loop_2 = function (i) {
            if (parentNodeChild[i] && data[i]) {
                var cash = data[i];
                var tempAllRules = [];
                for (var key in cash.rules) {
                    tempAllRules.push(cash.rules[key]);
                }
                cash.rules = tempAllRules;
                parentNodeChild[i].getChildByName("layout").getChildByName("lable_num").getComponent(cc.Label).string = cash.amount;
                parentNodeChild[i]["" + this_2.btnDataStr] = cash;
                parentNodeChild[i].active = true;
                parentNodeChild[i].getChildByName("layout").getChildByName("lable_num").color = tempColor.fromHEX("#BB420E");
                parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").color = tempColor.fromHEX("#FFFFFF");
                var btnType = (cash.mark != "可打卡" || (cash.clockInToday != 0 && cash.clockInToday != 3));
                if (cash.mark && cash.mark != "" && cash.hasWithdraw == 2 && cash.markResource && cash.markResource != "" && btnType) {
                    if (cash.sortNo == 2 && cash.clockInToday == 0) {
                        var allRules = cash.rules;
                        var isCanCard = true;
                        for (var i_1 = 0; i_1 < allRules.length; i_1++) {
                            var rules = allRules[i_1];
                            for (var j = 0; j < rules.length; j++) {
                                if (rules[j].type == 3) {
                                    if (rules[j].userCurrentProgress >= rules[j].demand) {
                                        isCanCard = false;
                                    }
                                    else {
                                        isCanCard = true;
                                    }
                                }
                            }
                        }
                        if (isCanCard) {
                            var str = AssistCtr_1.AssistCtr.formatData24();
                            parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").getComponent(cc.Label).string = str;
                            parentNodeChild[i].getChildByName("img_state").getChildByName("lable").getComponent(cc.Label).string = str;
                            this_2.schedule(function () {
                                var str = AssistCtr_1.AssistCtr.formatData24();
                                parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").getComponent(cc.Label).string = str;
                                parentNodeChild[i].getChildByName("img_state").getChildByName("lable").getComponent(cc.Label).string = str;
                            }, 1);
                            this_2.setMarkImage(parentNodeChild[i].getChildByName("img_state").getComponent(cc.Sprite), "" + cash.markResource);
                        }
                        else {
                            parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").getComponent(cc.Label).string = cash.mark;
                            parentNodeChild[i].getChildByName("img_state").getChildByName("lable").getComponent(cc.Label).string = cash.mark;
                            this_2.setMarkImage(parentNodeChild[i].getChildByName("img_state").getComponent(cc.Sprite), "" + cash.markResource);
                        }
                    }
                    else {
                        parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").getComponent(cc.Label).string = cash.mark;
                        parentNodeChild[i].getChildByName("img_state").getChildByName("lable").getComponent(cc.Label).string = cash.mark;
                        this_2.setMarkImage(parentNodeChild[i].getChildByName("img_state").getComponent(cc.Sprite), "" + cash.markResource);
                    }
                }
                else {
                    parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").active = false;
                    parentNodeChild[i].getChildByName("img_state").active = false;
                }
                if (cash.hasWithdraw == 1) {
                    parentNodeChild[i].opacity = 150;
                    console.log("已提现:", cash.amount);
                    if ((cash.type == 1 && AssistCtr_1.AssistCtr.isATest()) || (cash.type == 9 && !AssistCtr_1.AssistCtr.isATest())) {
                        cc.game.emit(NameTs_1.default.Game_SavingPost_Lock);
                    }
                }
                else {
                    parentNodeChild[i].opacity = 255;
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < data.length; i++) {
            _loop_2(i);
        }
    };
    gameWallet.prototype.setData = function (data) {
        var self = this;
        if (self.lable_myGold) {
            // self.lable_myGold.string = `${AssistCtr.convertNumber(data.gold.goldPoint)}`;
            self.lable_myGold.string = data.gold.goldPoint + "";
        }
        if (self.lable_money) {
            self.lable_money.string = "\u7EA6" + data.gold.exchangeAmount + "\u5143";
        }
        self.setlayout(self.selectLayout, data.cashOutMap[1], self.btn_selectMoney, 6);
        self.setlayout(self.selectLayout2, data.cashOutMap[2], self.btn_selectMoney, 3);
        self.setEffect();
        if (data.weChat) {
            this.wxData = data.weChat;
        }
        else {
            this.wxData = null;
        }
        if (self.lable_ruleContent) {
            self.lable_ruleContent.string = data.rule;
        }
        self.setClickBtn();
    };
    //设置动态效果
    gameWallet.prototype.setEffect = function () {
        var self = this;
        var selectLayout = self.selectLayout.children;
        var _loop_3 = function (i) {
            if (selectLayout[i]) {
                var btnData = selectLayout[i]["" + this_3.btnDataStr];
                if (btnData) {
                    var btnType = (btnData.mark != "可打卡" || (btnData.clockInToday != 0 && btnData.clockInToday != 3));
                    if (((btnData.amount == "0.3" && btnData.mark == "今日可领") || btnData.amount == "10") && btnData.hasWithdraw == 2 && btnType) {
                        //clockInToday: number //今日是否打卡0-今日已打卡，1-直接打卡，2-视频打卡
                        if (selectLayout[i]) {
                            if (selectLayout[i].getChildByName("img_state") && selectLayout[i].getChildByName("img_state").active) {
                                selectLayout[i].getChildByName("img_state").stopAllActions();
                                // cc.tween(selectLayout[i].getChildByName("img_state")).repeatForever(
                                //     cc.tween().by(0.32, { y: 10 }, { easing: "easeInSine" }).by(0.32, { y: -10 }, { easing: "easeOutSine" })
                                // ).start();
                                cc.tween(selectLayout[i].getChildByName("img_state")).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
                            }
                            if (selectLayout[i].getChildByName("guangNode") && selectLayout[i].getChildByName("guangNode").getChildByName("saoguang")) {
                                var saoGuang_1 = selectLayout[i].getChildByName("guangNode").getChildByName("saoguang");
                                saoGuang_1.stopAllActions();
                                saoGuang_1.x = -145;
                                selectLayout[i].getChildByName("guangNode").active = true;
                                cc.tween(saoGuang_1).repeatForever(cc.tween().to(0.64, { x: 150 }).delay(0.64).call(function () { saoGuang_1.x = -145; })).start();
                            }
                        }
                    }
                    else {
                        if (selectLayout[i].getChildByName("img_state")) {
                            selectLayout[i].getChildByName("img_state").stopAllActions();
                            selectLayout[i].getChildByName("img_state").angle = 0;
                        }
                        if (selectLayout[i].getChildByName("guangNode")) {
                            var saoGuang = selectLayout[i].getChildByName("guangNode").getChildByName("saoguang");
                            saoGuang.stopAllActions();
                            saoGuang.x = -145;
                            selectLayout[i].getChildByName("guangNode").active = false;
                        }
                    }
                }
            }
        };
        var this_3 = this;
        for (var i = 0; i < selectLayout.length; i++) {
            _loop_3(i);
        }
    };
    //设置角标
    gameWallet.prototype.setMarkImage = function (targetSpr, urlStr) {
        this.loadAny(urlStr, cc.SpriteFrame, function (res) {
            if (targetSpr) {
                targetSpr.spriteFrame = res;
                targetSpr.node.active = true;
            }
        }, function () { if (targetSpr)
            targetSpr.node.active = false; });
    };
    gameWallet.prototype.setClickBtn = function () {
        var self = this;
        var selectNode = self.selectLayout.children;
        var onceTarget = null;
        for (var i = 0; i < selectNode.length; i++) {
            if (selectNode[i] && selectNode[i]["" + self.btnDataStr] && selectNode[i]["" + self.btnDataStr].hasWithdraw == 2) {
                onceTarget = selectNode[i];
                break;
            }
        }
        if (!onceTarget) {
            var selectNode2 = self.selectLayout2.children;
            for (var i = 0; i < selectNode2.length; i++) {
                if (selectNode2[i] && selectNode2[i]["" + self.btnDataStr] && selectNode2[i]["" + self.btnDataStr].hasWithdraw == 2) {
                    onceTarget = selectNode2[i];
                    break;
                }
            }
        }
        if (selectNode && selectNode.length > 0) {
            if (self.onceEnter) {
                if (onceTarget) {
                    self.clickSelectMoney(onceTarget);
                }
                self.onceEnter = false;
            }
            else {
                if (self.curSelectNode && self.curSelectNode["" + this.btnDataStr] && self.curSelectNode["" + this.btnDataStr].hasWithdraw == 2) {
                    self.clickSelectMoney(self.curSelectNode);
                }
                else {
                    if (onceTarget) {
                        self.clickSelectMoney(onceTarget);
                    }
                    else {
                        if (self.curSelectNode) {
                            self.curSelectNode.getComponent(cc.Sprite).spriteFrame = self.selectSprArray[0];
                        }
                        self.conditionNode.active = false;
                        self.img_frame.height = 780;
                    }
                }
            }
        }
    };
    gameWallet.prototype.clickSelectMoney = function (target) {
        var self = this;
        if (self.curSelectNode) {
            self.curSelectNode.getComponent(cc.Sprite).spriteFrame = self.selectSprArray[0];
        }
        self.curSelectNode = target;
        if (!self.curSelectNode["" + this.btnDataStr]) {
            return;
        }
        var curSelectData = self.curSelectNode["" + this.btnDataStr];
        target.getComponent(cc.Sprite).spriteFrame = self.selectSprArray[1];
        var isHaveCard = false; //是否有打卡任务        
        var tempRule = []; //分类好当前组提现要求
        var tempRuleData = []; //当前组提现要求数据
        var allRules = curSelectData.rules;
        for (var i = 0; i < allRules.length; i++) {
            var rules = allRules[i];
            for (var j = 0; j < rules.length; j++) {
                if (rules[j].type != 5 && rules[j].userCurrentProgress < rules[j].demand) {
                    tempRuleData = rules;
                    break;
                }
            }
            if (tempRuleData && tempRuleData.length > 0) {
                break;
            }
        }
        if (tempRuleData && tempRuleData.length == 0) {
            tempRuleData = allRules[allRules.length - 1];
        }
        self.tempRules = tempRuleData;
        if (tempRuleData && tempRuleData.length > 0) {
            var rulesA = tempRuleData;
            for (var i = 0; i < rulesA.length; i++) {
                if (rulesA[i].type != 5) {
                    if (rulesA[i].type == 3) {
                        isHaveCard = true;
                    }
                    tempRule.push(rulesA[i]);
                }
            }
        }
        if (tempRule && tempRule.length > 0) {
            self.conditionNode.active = true;
            var layoutChild = self.layout_tiXianTip.children;
            for (var i = 0; i < layoutChild.length; i++) {
                layoutChild[i].active = false;
            }
            self.img_frame.height = 983;
            self.btn_goPass.stopAllActions();
            self.btn_goPass.scale = 1;
            var isOkRules = false; //是否完成需求            
            var tempColor = new cc.Color();
            var rules = tempRule;
            var okNum = 0;
            for (var i = 0; i < rules.length; i++) {
                var ruleData = rules[i];
                var lableTiXianTip = self.layout_tiXianTip.children[i];
                if (lableTiXianTip) {
                    if (ruleData.userCurrentProgress >= ruleData.demand) {
                        lableTiXianTip.color = tempColor.fromHEX("#507900");
                    }
                    else {
                        lableTiXianTip.color = tempColor.fromHEX("#F00F00");
                    }
                    if (ruleData.type == 1) {
                        lableTiXianTip.getComponent(cc.Label).string = "\u70AE\u5854\u7B49\u7EA7\u8FBE\u5230" + ruleData.demand + "\u7EA7(" + ruleData.userCurrentProgress + "/" + ruleData.demand + ")";
                    }
                    else if (ruleData.type == 2) {
                        lableTiXianTip.getComponent(cc.Label).string = "\u9700\u7EA2\u5305\u91D1\u989D" + AssistCtr_1.AssistCtr.convertNumber(ruleData.demand) + "(" + AssistCtr_1.AssistCtr.convertNumber(ruleData.userCurrentProgress) + "/" + AssistCtr_1.AssistCtr.convertNumber(ruleData.demand) + ")";
                    }
                    else if (ruleData.type == 3) {
                        lableTiXianTip.getComponent(cc.Label).string = "\u9700\u6253\u5361" + ruleData.demand + "\u6B21,\u5DF2\u6253\u5361(" + ruleData.userCurrentProgress + "/" + ruleData.demand + ")";
                    }
                    else if (ruleData.type == 4) {
                        lableTiXianTip.getComponent(cc.Label).string = "\u9700\u7D2F\u8BA1\u6FC0\u52B1\u89C6\u9891\u603B\u6B21\u6570" + ruleData.demand + "\u6B21(" + ruleData.userCurrentProgress + "/" + ruleData.demand + ")";
                    }
                    lableTiXianTip.active = true;
                }
                if (ruleData.userCurrentProgress >= ruleData.demand) {
                    okNum++;
                }
            }
            if (okNum >= rules.length) {
                isOkRules = true;
            }
            if (isOkRules) {
                self.btn_goPass.active = false;
                self.conditionNode.getChildByName("img_finish").active = true;
            }
            else {
                self.btn_goPass.active = true;
                self.conditionNode.getChildByName("img_finish").active = false;
                if (isHaveCard) {
                    if (curSelectData.clockInToday == 0) {
                        self.btn_goPass.getChildByName("layout").getChildByName("lable").getComponent(cc.Label).string = "\u5DF2\u6253\u5361";
                        self.btn_goPass.getChildByName("layout").getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#757575");
                        self.btn_goPass.getComponent(cc.Sprite).spriteFrame = self.btnSprArray[1];
                        self.btn_goPass.getChildByName("layout").getChildByName("img_icon").active = false;
                    }
                    else if (curSelectData.clockInToday == 3) {
                        self.btn_goPass.getChildByName("layout").getChildByName("img_icon").active = false;
                        self.btn_goPass.getChildByName("layout").getChildByName("lable").getComponent(cc.Label).string = "\u53BB\u5408\u6210";
                        self.btn_goPass.getChildByName("layout").getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#507900");
                        self.btn_goPass.getComponent(cc.Sprite).spriteFrame = self.btnSprArray[0];
                    }
                    else {
                        if (curSelectData.clockInToday == 1) {
                            self.btn_goPass.getChildByName("layout").getChildByName("img_icon").active = false;
                        }
                        else {
                            self.btn_goPass.getChildByName("layout").getChildByName("img_icon").active = true;
                        }
                        cc.tween(self.btn_goPass).repeatForever(cc.tween().to(.4, { scale: 1.2 }).to(.4, { scale: 1 })).start();
                        self.btn_goPass.getChildByName("layout").getChildByName("lable").getComponent(cc.Label).string = "\u6253\u5361";
                        self.btn_goPass.getChildByName("layout").getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#507900");
                        self.btn_goPass.getComponent(cc.Sprite).spriteFrame = self.btnSprArray[0];
                    }
                }
                else {
                    self.btn_goPass.getChildByName("layout").getChildByName("img_icon").active = false;
                    self.btn_goPass.getChildByName("layout").getChildByName("lable").getComponent(cc.Label).string = "\u53BB\u5408\u6210";
                    self.btn_goPass.getChildByName("layout").getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#507900");
                    self.btn_goPass.getComponent(cc.Sprite).spriteFrame = self.btnSprArray[0];
                }
            }
        }
        else {
            self.conditionNode.active = false;
            self.img_frame.height = 780;
        }
        if (isHaveCard) {
            if (curSelectData.mark) {
                self.tixian_state = curSelectData.amount + "\u6253\u5361\u4EFB\u52A1<" + curSelectData.mark + ">";
            }
            else {
                self.tixian_state = curSelectData.amount + "\u6253\u5361\u4EFB\u52A1<\u65E0>";
            }
        }
        else {
            if (curSelectData.mark) {
                self.tixian_state = curSelectData.amount + "\u6863\u4F4D<" + curSelectData.mark + ">";
            }
            else {
                self.tixian_state = curSelectData.amount + "\u6863\u4F4D<\u65E0>";
            }
        }
        var str1 = this.checkIsTiXian(curSelectData);
        var str2 = this.checkIsTiXian2();
        if (str1 == "" && str2 == "") {
            if (!util_1.default.adPreObj[AdPosition_1.AdPosition.getWalletMoneyVideo]) {
                util_1.default.preloadAd(AdPosition_1.AdPosition.getWalletMoneyVideo);
            }
        }
        cc.error("选中的按钮", curSelectData);
    };
    gameWallet.prototype.clickOpenRule = function () {
        soundController_1.default.singleton.clickAudio();
        this.ruleView.active = true;
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "\u63D0\u73B0\u89C4\u5219",
        });
        TrackMgr_1.default.AppClick({
            app_page_title: "我的钱包",
            app_ck_module: "提现规则",
            app_exposure_type: "icon",
        });
    };
    gameWallet.prototype.clickGetMoney = function () {
        var _this = this;
        var self = this;
        soundController_1.default.singleton.clickAudio();
        var curSelectData = self.curSelectNode["" + this.btnDataStr];
        if (!self.curSelectNode || !curSelectData) {
            AssistCtr_1.AssistCtr.showToastTip("请选择提现金额");
        }
        else if (self.curSelectNode && curSelectData && self.wxData) {
            var str1 = this.checkIsTiXian(curSelectData);
            var str2_1 = this.checkIsTiXian2();
            if (str1 != "") {
                AssistCtr_1.AssistCtr.showToastTip(str1);
            }
            else {
                AdController_1.default.loadAd(AdPosition_1.AdPosition.getWalletMoneyVideo, function (res) {
                    if (util_1.default.adPreObj[AdPosition_1.AdPosition.getWalletMoneyVideo]) {
                        util_1.default.preloadAd(AdPosition_1.AdPosition.getWalletMoneyVideo);
                    }
                    if (str2_1 != "") {
                        AssistCtr_1.AssistCtr.showToastTip(str2_1);
                    }
                    else {
                        util_1.default.sendCoinData(function () {
                            XMSDK_1.default.post({
                                url: UrlConst_1.UrlConst.wallet_get,
                                data: {
                                    id: curSelectData.id,
                                    type: 0
                                },
                                onSuccess: function (res) {
                                    if (!_this.isValid) {
                                        return;
                                    }
                                    if (res.code === 0) {
                                        soundController_1.default.singleton.clickAudio();
                                        self.sucView.active = true;
                                        self.lable_sucTip.string = "\u4F60\u7684\u63D0\u73B0\u5DF2\u7533\u8BF7\u6210\u529F\uFF0C\u7A0D\u540E\u53EF\u5728\u5FAE\u4FE1\n\u67E5\u770B\u662F\u5426\u8F6C\u8D26\u6210\u529F\u3002";
                                        self.initData();
                                        util_1.default.addCoin(-curSelectData.point);
                                        //GameInfo.useGold(parseInt(curSelectData.amount) * GameInfo.getChangeRate());
                                        TrackMgr_1.default.apply_for_withdrawal({
                                            applications_amount: Number(curSelectData.amount),
                                            application_status: "\u6210\u529F",
                                            applications_level: Number(curSelectData.amount),
                                            is_satisfy_condition: true,
                                            markStr: curSelectData.mark,
                                        });
                                        TrackMgr_1.default.AppBuyProductDialog_hcdg({
                                            dialog_name_hcdg: "\u63D0\u73B0\u7533\u8BF7\u6210\u529F",
                                        });
                                    }
                                    else {
                                        var str = "" + res.message;
                                        TrackMgr_1.default.apply_for_withdrawal({
                                            applications_amount: Number(curSelectData.amount),
                                            application_status: "\u5931\u8D25",
                                            failure_cause: "" + res.message,
                                            applications_level: Number(curSelectData.amount),
                                            is_satisfy_condition: false,
                                            markStr: curSelectData.mark,
                                        });
                                        // self.lable_tipNeedPass.string = `${str}`;
                                        // self.tipFrameView.active = true;
                                        AssistCtr_1.AssistCtr.showToastTip(str);
                                    }
                                },
                                onFail: function (err) {
                                }
                            });
                        });
                    }
                }, function () {
                    TrackMgr_1.default.apply_for_withdrawal({
                        applications_amount: Number(curSelectData.amount),
                        application_status: "\u5931\u8D25",
                        failure_cause: "\u6210\u529F\u63D0\u73B0\u6FC0\u52B1\u89C6\u9891\u65E0\u5B8C\u6574\u64AD\u653E",
                        applications_level: Number(curSelectData.amount),
                        is_satisfy_condition: false,
                        markStr: curSelectData.mark,
                    });
                    AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
                });
            }
        }
        else if (!self.wxData) {
            self.clickBangDingwx();
        }
    };
    gameWallet.prototype.checkIsTiXian = function (curSelectData) {
        var self = this;
        var str = "";
        var rules = self.tempRules;
        var tempRule2 = [];
        if (rules) {
            for (var i = 0; i < rules.length; i++) {
                if (rules[i].type != 5) {
                    tempRule2.push(rules[i]);
                }
            }
        }
        ///规则类型，1-炮塔等级2-红包金额3-打卡总次数4-累计激励视频总次数5-前置任务
        if (str == "") {
            if (self.conditionNode.active && !self.conditionNode.getChildByName("img_finish").active) {
                if (tempRule2 && tempRule2.length > 0) {
                    for (var i = 0; i < tempRule2.length; i++) {
                        var ruleData = tempRule2[i];
                        if (ruleData.userCurrentProgress < ruleData.demand) {
                            if (ruleData.type == 1) {
                                str = "\u70AE\u5854\u7B49\u7EA7\u5230" + ruleData.demand + "\u7EA7\u53EF\u63D0\u73B0";
                            }
                            else if (ruleData.type == 2) {
                                if (util_1.default.userData.coin < curSelectData.point) {
                                    var curGold = parseInt(curSelectData.amount) - parseInt(util_1.default.findGoldCash());
                                    if (curGold) {
                                        str = "\u518D\u8D5A" + curGold + "\u5143\u5C31\u80FD\u63D0\u73B0\u5566!";
                                    }
                                    else {
                                        str = "\u518D\u8D5A" + curSelectData.amount + "\u5143\u5C31\u80FD\u63D0\u73B0\u5566!";
                                    }
                                    TrackMgr_1.default.apply_for_withdrawal({
                                        applications_amount: Number(curSelectData.amount),
                                        application_status: "\u5931\u8D25",
                                        failure_cause: "金币数不足",
                                        applications_level: Number(curSelectData.amount),
                                        is_satisfy_condition: false,
                                        markStr: curSelectData.mark,
                                    });
                                }
                            }
                            else if (ruleData.type == 3) {
                                str = "\u8FD8\u9700\u6253\u5361" + (ruleData.demand - ruleData.userCurrentProgress) + "\u5929!";
                            }
                            else if (ruleData.type == 4) {
                                str = "\u8FD8\u9700\u7D2F\u79EF\u770B\u89C6\u9891" + (ruleData.demand - ruleData.userCurrentProgress) + "\u6B21!";
                            }
                            break;
                        }
                    }
                }
            }
        }
        return str;
    };
    gameWallet.prototype.checkIsTiXian2 = function () {
        var self = this;
        var str = "";
        var rules = self.tempRules;
        var tempRule1 = [];
        if (rules) {
            for (var i = 0; i < rules.length; i++) {
                if (rules[i].type == 5) {
                    tempRule1.push(rules[i]);
                }
            }
        }
        var selectBtnChild1 = this.selectLayout.children;
        var selectBtnChild2 = this.selectLayout2.children;
        for (var i = 0; i < tempRule1.length; i++) {
            var targetId = tempRule1[i].demand;
            for (var j = 0; j < selectBtnChild1.length; j++) {
                if (selectBtnChild1[j] && selectBtnChild1[j]["" + this.btnDataStr]) {
                    var btnData = selectBtnChild1[j]["" + this.btnDataStr];
                    if (btnData.id == targetId && btnData.hasWithdraw == 2) {
                        if (btnData.mark && btnData.mark != "") {
                            str = "\u8BF7\u5148\u63D0\u73B0" + btnData.mark + btnData.amount + "\u5143";
                        }
                        else {
                            str = "\u8BF7\u5148\u63D0\u73B0" + btnData.amount + "\u5143";
                        }
                        break;
                    }
                }
            }
            if (str == "") {
                for (var j = 0; j < selectBtnChild2.length; j++) {
                    if (selectBtnChild2[j] && selectBtnChild2[j]["" + this.btnDataStr]) {
                        var btnData = selectBtnChild2[j]["" + this.btnDataStr];
                        if (btnData.id == targetId && btnData.hasWithdraw == 2) {
                            if (btnData.mark && btnData.mark != "") {
                                str = "\u8BF7\u5148\u63D0\u73B0" + btnData.mark + btnData.amount + "\u5143";
                            }
                            else {
                                str = "\u8BF7\u5148\u63D0\u73B0" + btnData.amount + "\u5143";
                            }
                            break;
                        }
                    }
                }
            }
            else {
                break;
            }
        }
        return str;
    };
    gameWallet.prototype.clickOpenRecord = function () {
        // UIFunc.openUI(ActivityPannelName.PannelWalletRecord, (node, script) => {
        // })
        soundController_1.default.singleton.clickAudio();
        TrackMgr_1.default.AppViewScreen({
            app_page_title: "提现记录"
        });
        TrackMgr_1.default.AppClick({
            app_page_title: "我的钱包",
            app_ck_module: "提现记录",
            app_exposure_type: "icon",
        });
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameWalletRecord);
    };
    gameWallet.prototype.clickBangDingwx = function () {
        var self = this;
        XMSDK_1.default.authWechat();
    };
    gameWallet.prototype.clickClose = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        if (this.isInsert) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.WalletAwardInsert, function () { console.log("关闭提现奖励插屏广告播放完成"); });
        }
    };
    //提现成功------------------------------
    gameWallet.prototype.clickCloseSucTip = function () {
        soundController_1.default.singleton.clickAudio();
        this.sucView.active = false;
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u63D0\u73B0\u7533\u8BF7\u6210\u529F",
            ck_module: "我知道了",
            active_ad_hcdg: "激励视频"
        });
    };
    //提现规则------------------------------
    gameWallet.prototype.clickCloseRule = function () {
        soundController_1.default.singleton.clickAudio();
        this.ruleView.active = false;
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u63D0\u73B0\u89C4\u5219",
            ck_module: "我知道了"
        });
    };
    //提现提示------------------------------
    gameWallet.prototype.clickGoPass = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        var curSelectData = this.curSelectNode["" + this.btnDataStr];
        var rules = this.tempRules;
        var clockInDays = 0;
        if (rules && rules.length > 0) {
            for (var i = 0; i < rules.length; i++) {
                if (rules[i].type == 3) {
                    clockInDays = rules[i].userCurrentProgress;
                }
            }
        }
        //规则类型，1-炮塔等级2-红包金额3-打卡总次数4-累计激励视频总次数5-前置任务
        var btnStr = this.btn_goPass.getChildByName("layout").getChildByName("lable").getComponent(cc.Label).string;
        if (btnStr == "打卡") {
            if (curSelectData.clockInToday == 1) {
                TrackMgr_1.default.activity_getMoney({
                    activity_state: "\u70B9\u51FB\u6253\u5361",
                    button_hcdg1: "\u6253\u5361",
                    tixian_state: this.tixian_state,
                    daka_days: "\u7B2C" + clockInDays + "\u5929",
                });
                this.sendDaCard(curSelectData.type, clockInDays);
            }
            else {
                TrackMgr_1.default.activity_getMoney({
                    activity_state: "\u70B9\u51FB\u6253\u5361",
                    button_hcdg1: "\u89C6\u9891\u6253\u5361",
                    tixian_state: this.tixian_state,
                    daka_days: "\u7B2C" + clockInDays + "\u5929",
                });
                AdController_1.default.loadAd(AdPosition_1.AdPosition.walletCardVideo, function (res) {
                    _this.sendDaCard(curSelectData.type, clockInDays);
                }, function () {
                    AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
                });
            }
        }
        else if (btnStr == "已打卡") {
            TrackMgr_1.default.activity_getMoney({
                activity_state: "\u70B9\u51FB\u6253\u5361",
                button_hcdg1: "\u5DF2\u6253\u5361",
                tixian_state: this.tixian_state,
                daka_days: "\u7B2C" + clockInDays + "\u5929",
            });
            AssistCtr_1.AssistCtr.showToastTip("\u4ECA\u65E5\u5DF2\u6253\u5361,\u660E\u65E5\u518D\u6765~");
        }
        else if (btnStr == "去合成") {
            this.closePage();
        }
    };
    gameWallet.prototype.sendDaCard = function (type, clockInDays) {
        var _this = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.videoCardOk,
            data: {
                cashOutType: type
            },
            onSuccess: function (res) {
                if (!_this.isValid) {
                    return;
                }
                if (res.code === 0) {
                    TrackMgr_1.default.activity_getMoney({
                        activity_state: "\u6253\u5361\u8FC7\u7A0B",
                        button_hcdg1: "\u6253\u5361",
                        tixian_state: _this.tixian_state,
                        successful_clock_in: true,
                        daka_days: "\u7B2C" + clockInDays + "\u5929",
                    });
                    AssistCtr_1.AssistCtr.showToastTip("\u6253\u5361\u6210\u529F");
                    _this.initData();
                }
                else {
                    TrackMgr_1.default.activity_getMoney({
                        activity_state: "\u6253\u5361\u8FC7\u7A0B",
                        button_hcdg1: "\u6253\u5361",
                        tixian_state: _this.tixian_state,
                        successful_clock_in: false,
                        daka_days: "\u7B2C" + clockInDays + "\u5929",
                    });
                    if (res) {
                        AssistCtr_1.AssistCtr.showToastTip(res.message);
                    }
                }
            },
            onFail: function (err) {
            }
        });
    };
    gameWallet.prototype.clickCloseTip = function () {
        this.tipFrameView.active = false;
    };
    /**
     *
     * @param num 数量
     * @param pos 位置
     */
    gameWallet.prototype.createNum = function (num) {
        var _this = this;
        var item = this.walletPool.createEnemy(this.addCoinBox);
        item.setParent(this.addCoinBox);
        item.setPosition(0, 0);
        item.getComponent(cc.Sprite).enabled = false;
        item.opacity = 255;
        item.children[1] && (item.children[1].getComponent(cc.Label).string = "+" + num);
        item.scale = 1.1;
        cc.tween(item).parallel(cc.tween().by(.5, { y: 84 }), cc.tween().delay(.25).to(.25, { opacity: 0 })).call(function () {
            _this.walletPool.onEnemyKilled(item);
        }).start();
    };
    __decorate([
        property(cc.Label)
    ], gameWallet.prototype, "lable_myGold", void 0);
    __decorate([
        property(cc.Label)
    ], gameWallet.prototype, "lable_money", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "sucView", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "ruleView", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "tipFrameView", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "selectLayout", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "selectLayout2", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "img_frame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], gameWallet.prototype, "selectSprArray", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "spine_shou", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "conditionNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "layout_tiXianTip", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "btn_goPass", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], gameWallet.prototype, "btnSprArray", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "btn_selectMoney", void 0);
    __decorate([
        property(cc.Label)
    ], gameWallet.prototype, "lable_ruleContent", void 0);
    __decorate([
        property(cc.Label)
    ], gameWallet.prototype, "lable_sucTip", void 0);
    __decorate([
        property(cc.Label)
    ], gameWallet.prototype, "lable_tipNeedPass", void 0);
    __decorate([
        property(cc.Prefab)
    ], gameWallet.prototype, "addCoinItem", void 0);
    __decorate([
        property(cc.Node)
    ], gameWallet.prototype, "addCoinBox", void 0);
    gameWallet = __decorate([
        ccclass
    ], gameWallet);
    return gameWallet;
}(baseTs_1.default));
exports.default = gameWallet;

cc._RF.pop();