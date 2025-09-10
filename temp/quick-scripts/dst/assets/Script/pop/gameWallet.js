
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameWallet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ab1ciE7xFOeb8enGVsGtJj', 'gameWallet');
// Script/pop/gameWallet.ts

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
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var pool_1 = require("../common/pool");
var LanguageData_1 = require("../Language/LanguageData");
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
                    AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t("tips.reward_obtain_failed"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVXYWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUNwQyxtREFBa0Q7QUFDbEQsMkNBQThDO0FBQzlDLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBQ2xDLHlEQUE2QztBQUM3QywrQ0FBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQW1ENUM7SUFBd0MsOEJBQU07SUFBOUM7UUFBQSxxRUE4K0JDO1FBMytCRyxrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixvQkFBYyxHQUEwQixFQUFFLENBQUM7UUFHM0MsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBR2pDLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQTBCLEVBQUUsQ0FBQztRQUd4QyxxQkFBZSxHQUFZLElBQUksQ0FBQztRQUVoQyxpQ0FBaUM7UUFFakMsdUJBQWlCLEdBQWEsSUFBSSxDQUFDO1FBRW5DLGlDQUFpQztRQUVqQyxrQkFBWSxHQUFhLElBQUksQ0FBQztRQUU5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QUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDVztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7c0RBQ2dCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNlO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDZTtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNjO0lBSWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ2dCO0lBSW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1c7SUFJOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDZ0I7SUFJbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNTO0lBaEVWLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0E4K0I5QjtJQUFELGlCQUFDO0NBOStCRCxBQTgrQkMsQ0E5K0J1QyxnQkFBTSxHQTgrQjdDO2tCQTkrQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHBvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb29sXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCBpbnRlcmZhY2UgY2FzaE1hcCB7XG4gICAgYW1vdW50OiBzdHJpbmdcdCAgICAvL+aPkOeOsOmHkemine+8iOWFg++8iVxuICAgIGJhbm5lcjogc3RyaW5nXHQgICAgLy/mjInpkq5cbiAgICBpZDogbnVtYmVyXHQgICAgICAgIC8v5Lia5YqhSURcbiAgICByZXF1aXJlZDogbnVtYmVyXHQvL+WFs+WNoeimgeaxglxuICAgIG1hcms6IHN0cmluZ1x0ICAgIC8v6KeS5qCHXG4gICAgbWFya1Jlc291cmNlOiBzdHJpbmcgLy/op5LmoIfotYTmupBcbiAgICBwb2ludDogbnVtYmVyXHQgICAgLy/mj5DnjrDmiYDpnIDph5HluIFcbiAgICBzb3J0Tm86IG51bWJlclx0ICAgIC8v5o6S5bqP5Y+3ICAgIFxuICAgIHR5cGU6IG51bWJlciAgICAgICAgLy/nsbvlnos6IDAt5pmu6YCaIDEt5paw5Lq6XG4gICAgZ3JvdXBpbmc6IG51bWJlciAgICAgLy/liIbnu4TvvIwxLeW/q+mAn+aPkOeOsDIt5pel5bi45o+Q546wXG4gICAgaGFzV2l0aGRyYXc6IG51bWJlciAgLy/or6XpgInpobnmmK/lkKblt7Lmj5DnjrDvvIwxLeW3suaPkOeOsDIt5pyq5o+Q546wXG4gICAgcnVsZXM6IEFycmF5PEFycmF5PHJ1bGU+PlxuICAgIGNsb2NrSW5Ub2RheTogbnVtYmVyIC8v5LuK5pel5piv5ZCm5omT5Y2hMC3ku4rml6Xlt7LmiZPljaHvvIwxLeebtOaOpeaJk+WNoe+8jDIt6KeG6aKR5omT5Y2hXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgcnVsZSB7XG4gICAgZGVtYW5kOiBudW1iZXIgICAgICAgICAgICAgICAgICAgLy/opoHmsYLmlbDph49cbiAgICB0eXBlOiBudW1iZXIgICAgICAgICAgICAgICAgICAgICAvL+inhOWImeexu+Wei++8jDEt54Ku5aGU562J57qnMi3nuqLljIXph5Hpop0zLeaJk+WNoeaAu+asoeaVsDQt57Sv6K6h5r+A5Yqx6KeG6aKR5oC75qyh5pWwNS3liY3nva7ku7vliqFcbiAgICB1c2VyQ3VycmVudFByb2dyZXNzOiBudW1iZXIgICAgICAvL+eUqOaIt+W9k+WJjei/m+W6plxufVxuXG5leHBvcnQgaW50ZXJmYWNlIHdhbGxldERhdGEge1xuICAgIGJpbmRBbGlQYXk6IGJvb2xlYW4gICAgICAgICAgLy/mmK/lkKblt7Lnu5HlrprmlK/ku5jlrp3otKblj7dcbiAgICBjYXNoT3V0TWFwOiB7XG4gICAgICAgIDE6IEFycmF5PGNhc2hNYXA+ICAgICAgICAgICAgICAgLy/mj5DnjrDliJfooahcbiAgICAgICAgMjogQXJyYXk8Y2FzaE1hcD4gICAgICAgICAgICAgICAvL+aPkOeOsOWIl+ihqFxuICAgIH1cbiAgICBnb2xkOiB7ICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biBXG4gICAgICAgIGV4Y2hhbmdlQW1vdW50OiBzdHJpbmdcdCAvL+WPr+WFkeaNoumHkeminSjlhYMpXG4gICAgICAgIGV4Y2hhbmdlUmF0ZTogbnVtYmVyXHQgLy/msYfnjofvvIzlhZHmjaLkuIDlhYPmiYDpnIDph5HluIHlgLxcbiAgICAgICAgZ29sZFBvaW50OiBudW1iZXJcdCAgICAgLy/ph5HluIHlgLxcbiAgICB9XG4gICAgbWFycXVlZTogQXJyYXk8c3RyaW5nPiwgICAgICAgLy/ot5Hpqaznga9cbiAgICBuZXdVc2VyTGlzdDogQXJyYXk8Y2FzaE1hcD4gIC8v5paw5Lq65LiT5Lqr5YiX6KGoXG4gICAgcnVsZTogc3RyaW5nXHQgICAgICAgICAgICAgLy/mj5DnjrDop4TliJlcbiAgICB3ZUNoYXQ6IHsgICAgICAgICAgICAgICAgICAgIC8v5b6u5L+h5L+h5oGvXG4gICAgICAgIGF2YXRhclVybDogc3RyaW5nXHQgICAgIC8v5aS05YOPXG4gICAgICAgIG5pY2tuYW1lOiBzdHJpbmcgICAgICAgICAvL+aYteensFxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSB2aWRlb0NhcmRNYWluIHtcbiAgICBjbG9ja0luRGF5czogbnVtYmVyLCAgICAgICAgLy/lt7LmiZPljaHlpKnmlbBcbiAgICBuZWVkQ2xvY2tJbkRheXM6IG51bWJlciwgICAgLy/pnIDopoHmiZPljaHnmoTlpKnmlbBcbiAgICB0b2RheUNoZWNrZWQ6IGJvb2xlYW4sICAgICAgLy/ku4rml6XmmK/lkKblt7LmiZPljaEgZmFsc2Ut5pyq5omT5Y2hIHRydWUt5bey5omT5Y2hXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lV2FsbGV0IGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9teUdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9tb25leTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3VjVmlldzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBydWxlVmlldzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0aXBGcmFtZVZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2VsZWN0TGF5b3V0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNlbGVjdExheW91dDI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaW1nX2ZyYW1lOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHNlbGVjdFNwckFycmF5OiBBcnJheTxjYy5TcHJpdGVGcmFtZT4gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNwaW5lX3Nob3U6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY29uZGl0aW9uTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsYXlvdXRfdGlYaWFuVGlwOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9nb1Bhc3M6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIGJ0blNwckFycmF5OiBBcnJheTxjYy5TcHJpdGVGcmFtZT4gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl9zZWxlY3RNb25leTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvL+aPkOeOsOinhOWImS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9ydWxlQ29udGVudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy/mj5DnjrDmiJDlip8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfc3VjVGlwOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvL+aPkOeOsOaPkOekulxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV90aXBOZWVkUGFzczogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy/lop7liqDkuJzopb9cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGFkZENvaW5JdGVtOiBjYy5QcmVmYWIgPSBudWxsO1xuICAgIC8v5Zyo5ZOq6YeM5aKe5YqgXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYWRkQ29pbkJveDogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIC8vLS0tLS0t6ISa5pys5Y+Y6YePLS0tLS0tXG4gICAgcHJpdmF0ZSBjdXJTZWxlY3ROb2RlOiBjYy5Ob2RlID0gbnVsbDsgICAgICAgLy/lvZPliY3pgInkuK3nmoTph5Hpop3moYYgICAgICAgXG4gICAgcHJpdmF0ZSBjbG9zZUNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSB3eERhdGEgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpc0luc2VydDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgb25jZUVudGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgdGVtcFJ1bGVzOiBBcnJheTxydWxlPiA9IFtdO1xuXG4gICAgcHJpdmF0ZSBidG5EYXRhU3RyID0gYGNhc2hEYXRhYDtcblxuICAgIHByaXZhdGUgdGl4aWFuX3N0YXRlID0gYOW9k+WJjemAieaLqeeahOaPkOeOsOaho+S9jWA7XG5cbiAgICBwcml2YXRlIHdhbGxldFBvb2w6IHBvb2w7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLmJpbmRXZWNoYXRTdWNjZXNzLCB0aGlzLnd4U3VjRnVuLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpbml0KGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNJbnNlcnQgPSBNYXRoLnJhbmRvbSgpID4gLjU7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJbnNlcnQpIHtcbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5wcmVWaWRlb0FkKEFkUG9zaXRpb24uV2FsbGV0QXdhcmRJbnNlcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/mlbDmja7mm7TmlrBcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzID09IHVwZGF0ZVR5cGUuY29pbikge1xuICAgICAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHV0aWwudXNlckRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9teUdvbGQuc3RyaW5nID0gU3RyaW5nKHVzZXJEYXRhLmNvaW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvL+WinuWKoOmHkeW4gVxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1dhbGxldF9BZGRDb2luLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTnVtKHJlcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy53YWxsZXRQb29sID0gbmV3IHBvb2woY2MuaW5zdGFudGlhdGUodGhpcy5hZGRDb2luSXRlbSkpO1xuXG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIC8vdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICBUcmFja01nci5BcHBWaWV3U2NyZWVuKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIuaPkOeOsOmhtVwiXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5zcGluZV9zaG91LmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zcGluZV9zaG91LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucnVsZVZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3VjVmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aXBGcmFtZVZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VDYWxsYmFjayAmJiB0aGlzLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgdGhpcy5jbG9zZUNhbGxiYWNrID0gbnVsbDtcblxuICAgICAgICB0aGlzLndhbGxldFBvb2wuY2xlYXJQb29sKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5HdWlkZSgpIHtcbiAgICAgICAgdGhpcy5zcGluZV9zaG91LmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgd3hTdWNGdW4oKSB7XG4gICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLnu5HlrprmiJDlip9cIik7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICB9XG5cbiAgICBpbml0RGF0YSgpIHtcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LndhbGxldF9tYWluMixcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBzZXRDbG9zZUNhbGwoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuY2xvc2VDYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgfVxuXG4gICAgc2V0bGF5b3V0KHBhcmVudE5vZGU6IGNjLk5vZGUsIGRhdGE6IEFycmF5PGNhc2hNYXA+LCBwcmU6IGNjLk5vZGUsIG1heE51bTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwYXJlbnROb2RlQ2hpbGQgPSBwYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICBsZXQgYWRkTnVtID0gZGF0YS5sZW5ndGggLSBwYXJlbnROb2RlQ2hpbGQubGVuZ3RoO1xuICAgICAgICBpZiAoYWRkTnVtID4gbWF4TnVtKSB7XG4gICAgICAgICAgICBhZGROdW0gPSBtYXhOdW07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkZE51bSA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5zID0gY2MuaW5zdGFudGlhdGUocHJlKTtcbiAgICAgICAgICAgICAgICBpbnMucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFkZE51bSA9IE1hdGguYWJzKGFkZE51bSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZE51bTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudE5vZGVDaGlsZFswXSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbMF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50Tm9kZUNoaWxkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbaV0udGFyZ2V0T2ZmKHRoaXMpO1xuICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlQ2hpbGRbaV0gJiYgcGFyZW50Tm9kZUNoaWxkW2ldW2Ake3RoaXMuYnRuRGF0YVN0cn1gXSAmJiBwYXJlbnROb2RlQ2hpbGRbaV1bYCR7dGhpcy5idG5EYXRhU3RyfWBdLmhhc1dpdGhkcmF3ID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuW3suaPkOeOsFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja1NlbGVjdE1vbmV5KHBhcmVudE5vZGVDaGlsZFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0ZW1wQ29sb3IgPSBuZXcgY2MuQ29sb3IoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7ICAgLy/pgY3ljobmj5DnjrDliJfooaggICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlQ2hpbGRbaV0gJiYgZGF0YVtpXSkge1xuICAgICAgICAgICAgICAgIGxldCBjYXNoOiBjYXNoTWFwID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEFsbFJ1bGVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGNhc2gucnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEFsbFJ1bGVzLnB1c2goY2FzaC5ydWxlc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzaC5ydWxlcyA9IHRlbXBBbGxSdWxlcztcblxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImxheW91dFwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX251bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNhc2guYW1vdW50O1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF0gPSBjYXNoO1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwibGF5b3V0XCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfbnVtXCIpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjQkI0MjBFXCIpO1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3N0YXRlXCIpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjRkZGRkZGXCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGJ0blR5cGUgPSAoY2FzaC5tYXJrICE9IFwi5Y+v5omT5Y2hXCIgfHwgKGNhc2guY2xvY2tJblRvZGF5ICE9IDAgJiYgY2FzaC5jbG9ja0luVG9kYXkgIT0gMykpO1xuICAgICAgICAgICAgICAgIGlmIChjYXNoLm1hcmsgJiYgY2FzaC5tYXJrICE9IFwiXCIgJiYgY2FzaC5oYXNXaXRoZHJhdyA9PSAyICYmIGNhc2gubWFya1Jlc291cmNlICYmIGNhc2gubWFya1Jlc291cmNlICE9IFwiXCIgJiYgYnRuVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FzaC5zb3J0Tm8gPT0gMiAmJiBjYXNoLmNsb2NrSW5Ub2RheSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWxsUnVsZXMgPSBjYXNoLnJ1bGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzQ2FuQ2FyZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJ1bGVzID0gYWxsUnVsZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBydWxlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZXNbal0udHlwZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZXNbal0udXNlckN1cnJlbnRQcm9ncmVzcyA+PSBydWxlc1tqXS5kZW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NhbkNhcmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FuQ2FyZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDYW5DYXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciA9IEFzc2lzdEN0ci5mb3JtYXREYXRhMjQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9zdGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciA9IEFzc2lzdEN0ci5mb3JtYXREYXRhMjQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfc3RhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXJrSW1hZ2UocGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBgJHtjYXNoLm1hcmtSZXNvdXJjZX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfc3RhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjYXNoLm1hcms7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjYXNoLm1hcms7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXJrSW1hZ2UocGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBgJHtjYXNoLm1hcmtSZXNvdXJjZX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfc3RhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjYXNoLm1hcms7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNhc2gubWFyaztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWFya0ltYWdlKHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgYCR7Y2FzaC5tYXJrUmVzb3VyY2V9YClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfc3RhdGVcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FzaC5oYXNXaXRoZHJhdyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5vcGFjaXR5ID0gMTUwO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW3suaPkOeOsDpcIiwgY2FzaC5hbW91bnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGNhc2gudHlwZSA9PSAxICYmIEFzc2lzdEN0ci5pc0FUZXN0KCkpIHx8IChjYXNoLnR5cGUgPT0gOSAmJiAhQXNzaXN0Q3RyLmlzQVRlc3QoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TYXZpbmdQb3N0X0xvY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbaV0ub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXREYXRhKGRhdGE6IHdhbGxldERhdGEpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmIChzZWxmLmxhYmxlX215R29sZCkge1xuICAgICAgICAgICAgLy8gc2VsZi5sYWJsZV9teUdvbGQuc3RyaW5nID0gYCR7QXNzaXN0Q3RyLmNvbnZlcnROdW1iZXIoZGF0YS5nb2xkLmdvbGRQb2ludCl9YDtcbiAgICAgICAgICAgIHNlbGYubGFibGVfbXlHb2xkLnN0cmluZyA9IGRhdGEuZ29sZC5nb2xkUG9pbnQgKyBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmxhYmxlX21vbmV5KSB7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX21vbmV5LnN0cmluZyA9IGDnuqYke2RhdGEuZ29sZC5leGNoYW5nZUFtb3VudH3lhYNgO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc2V0bGF5b3V0KHNlbGYuc2VsZWN0TGF5b3V0LCBkYXRhLmNhc2hPdXRNYXBbMV0sIHNlbGYuYnRuX3NlbGVjdE1vbmV5LCA2KTtcbiAgICAgICAgc2VsZi5zZXRsYXlvdXQoc2VsZi5zZWxlY3RMYXlvdXQyLCBkYXRhLmNhc2hPdXRNYXBbMl0sIHNlbGYuYnRuX3NlbGVjdE1vbmV5LCAzKTtcblxuICAgICAgICBzZWxmLnNldEVmZmVjdCgpO1xuXG4gICAgICAgIGlmIChkYXRhLndlQ2hhdCkge1xuICAgICAgICAgICAgdGhpcy53eERhdGEgPSBkYXRhLndlQ2hhdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud3hEYXRhID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLmxhYmxlX3J1bGVDb250ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX3J1bGVDb250ZW50LnN0cmluZyA9IGRhdGEucnVsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuc2V0Q2xpY2tCdG4oKTtcbiAgICB9XG5cbiAgICAvL+iuvue9ruWKqOaAgeaViOaenFxuICAgIHNldEVmZmVjdCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc2VsZWN0TGF5b3V0ID0gc2VsZi5zZWxlY3RMYXlvdXQuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0TGF5b3V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0TGF5b3V0W2ldKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJ0bkRhdGE6IGNhc2hNYXAgPSBzZWxlY3RMYXlvdXRbaV1bYCR7dGhpcy5idG5EYXRhU3RyfWBdO1xuICAgICAgICAgICAgICAgIGlmIChidG5EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBidG5UeXBlID0gKGJ0bkRhdGEubWFyayAhPSBcIuWPr+aJk+WNoVwiIHx8IChidG5EYXRhLmNsb2NrSW5Ub2RheSAhPSAwICYmIGJ0bkRhdGEuY2xvY2tJblRvZGF5ICE9IDMpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgoYnRuRGF0YS5hbW91bnQgPT0gXCIwLjNcIiAmJiBidG5EYXRhLm1hcmsgPT0gXCLku4rml6Xlj6/pooZcIikgfHwgYnRuRGF0YS5hbW91bnQgPT0gXCIxMFwiKSAmJiBidG5EYXRhLmhhc1dpdGhkcmF3ID09IDIgJiYgYnRuVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jbG9ja0luVG9kYXk6IG51bWJlciAvL+S7iuaXpeaYr+WQpuaJk+WNoTAt5LuK5pel5bey5omT5Y2h77yMMS3nm7TmjqXmiZPljaHvvIwyLeinhumikeaJk+WNoVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdExheW91dFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikgJiYgc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MudHdlZW4oc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY2MudHdlZW4oKS5ieSgwLjMyLCB7IHk6IDEwIH0sIHsgZWFzaW5nOiBcImVhc2VJblNpbmVcIiB9KS5ieSgwLjMyLCB7IHk6IC0xMCB9LCB7IGVhc2luZzogXCJlYXNlT3V0U2luZVwiIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICkuc3RhcnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLCB7IGFuZ2xlOiAxMCB9KS50byguMiwgeyBhbmdsZTogMCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJndWFuZ05vZGVcIikgJiYgc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwic2FvZ3VhbmdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNhb0d1YW5nOiBjYy5Ob2RlID0gc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwic2FvZ3VhbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhb0d1YW5nLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhb0d1YW5nLnggPSAtMTQ1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJndWFuZ05vZGVcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oc2FvR3VhbmcpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKDAuNjQsIHsgeDogMTUwIH0pLmRlbGF5KDAuNjQpLmNhbGwoKCkgPT4geyBzYW9HdWFuZy54ID0gLTE0NSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdExheW91dFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdExheW91dFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdExheW91dFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5hbmdsZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdOb2RlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNhb0d1YW5nOiBjYy5Ob2RlID0gc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwic2FvZ3VhbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FvR3Vhbmcuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW9HdWFuZy54ID0gLTE0NTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJndWFuZ05vZGVcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+iuvue9ruinkuagh1xuICAgIHNldE1hcmtJbWFnZSh0YXJnZXRTcHI6IGNjLlNwcml0ZSwgdXJsU3RyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sb2FkQW55KHVybFN0ciwgY2MuU3ByaXRlRnJhbWUsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRTcHIpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTcHIuc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U3ByLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKCkgPT4geyBpZiAodGFyZ2V0U3ByKSB0YXJnZXRTcHIubm9kZS5hY3RpdmUgPSBmYWxzZTsgfSlcbiAgICB9XG5cbiAgICBzZXRDbGlja0J0bigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc2VsZWN0Tm9kZSA9IHNlbGYuc2VsZWN0TGF5b3V0LmNoaWxkcmVuO1xuICAgICAgICBsZXQgb25jZVRhcmdldCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Tm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNlbGVjdE5vZGVbaV0gJiYgc2VsZWN0Tm9kZVtpXVtgJHtzZWxmLmJ0bkRhdGFTdHJ9YF0gJiYgc2VsZWN0Tm9kZVtpXVtgJHtzZWxmLmJ0bkRhdGFTdHJ9YF0uaGFzV2l0aGRyYXcgPT0gMikge1xuICAgICAgICAgICAgICAgIG9uY2VUYXJnZXQgPSBzZWxlY3ROb2RlW2ldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghb25jZVRhcmdldCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdE5vZGUyID0gc2VsZi5zZWxlY3RMYXlvdXQyLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3ROb2RlMi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3ROb2RlMltpXSAmJiBzZWxlY3ROb2RlMltpXVtgJHtzZWxmLmJ0bkRhdGFTdHJ9YF0gJiYgc2VsZWN0Tm9kZTJbaV1bYCR7c2VsZi5idG5EYXRhU3RyfWBdLmhhc1dpdGhkcmF3ID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgb25jZVRhcmdldCA9IHNlbGVjdE5vZGUyW2ldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChzZWxlY3ROb2RlICYmIHNlbGVjdE5vZGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHNlbGYub25jZUVudGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9uY2VUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbGlja1NlbGVjdE1vbmV5KG9uY2VUYXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLm9uY2VFbnRlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY3VyU2VsZWN0Tm9kZSAmJiBzZWxmLmN1clNlbGVjdE5vZGVbYCR7dGhpcy5idG5EYXRhU3RyfWBdICYmIHNlbGYuY3VyU2VsZWN0Tm9kZVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF0uaGFzV2l0aGRyYXcgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsaWNrU2VsZWN0TW9uZXkoc2VsZi5jdXJTZWxlY3ROb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbmNlVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsaWNrU2VsZWN0TW9uZXkob25jZVRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jdXJTZWxlY3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJTZWxlY3ROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi5zZWxlY3RTcHJBcnJheVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZGl0aW9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nX2ZyYW1lLmhlaWdodCA9IDc4MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrU2VsZWN0TW9uZXkodGFyZ2V0OiBjYy5Ob2RlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAoc2VsZi5jdXJTZWxlY3ROb2RlKSB7XG4gICAgICAgICAgICBzZWxmLmN1clNlbGVjdE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLnNlbGVjdFNwckFycmF5WzBdO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuY3VyU2VsZWN0Tm9kZSA9IHRhcmdldDtcbiAgICAgICAgaWYgKCFzZWxmLmN1clNlbGVjdE5vZGVbYCR7dGhpcy5idG5EYXRhU3RyfWBdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VyU2VsZWN0RGF0YTogY2FzaE1hcCA9IHNlbGYuY3VyU2VsZWN0Tm9kZVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF07XG4gICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuc2VsZWN0U3ByQXJyYXlbMV07XG5cbiAgICAgICAgbGV0IGlzSGF2ZUNhcmQgPSBmYWxzZTsgICAgICAgICAvL+aYr+WQpuacieaJk+WNoeS7u+WKoSAgICAgICAgXG4gICAgICAgIGxldCB0ZW1wUnVsZSA9IFtdOyAgICAgICAgICAgICAgICAgICAgICAvL+WIhuexu+WlveW9k+WJjee7hOaPkOeOsOimgeaxglxuICAgICAgICBsZXQgdGVtcFJ1bGVEYXRhOiBBcnJheTxydWxlPiA9IFtdOyAgICAgIC8v5b2T5YmN57uE5o+Q546w6KaB5rGC5pWw5o2uXG4gICAgICAgIGxldCBhbGxSdWxlcyA9IGN1clNlbGVjdERhdGEucnVsZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBydWxlcyA9IGFsbFJ1bGVzW2ldO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBydWxlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChydWxlc1tqXS50eXBlICE9IDUgJiYgcnVsZXNbal0udXNlckN1cnJlbnRQcm9ncmVzcyA8IHJ1bGVzW2pdLmRlbWFuZCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wUnVsZURhdGEgPSBydWxlcztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlbXBSdWxlRGF0YSAmJiB0ZW1wUnVsZURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0ZW1wUnVsZURhdGEgJiYgdGVtcFJ1bGVEYXRhLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0ZW1wUnVsZURhdGEgPSBhbGxSdWxlc1thbGxSdWxlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnRlbXBSdWxlcyA9IHRlbXBSdWxlRGF0YTtcblxuXG4gICAgICAgIGlmICh0ZW1wUnVsZURhdGEgJiYgdGVtcFJ1bGVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBydWxlc0EgPSB0ZW1wUnVsZURhdGE7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJ1bGVzQS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChydWxlc0FbaV0udHlwZSAhPSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChydWxlc0FbaV0udHlwZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0hhdmVDYXJkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZW1wUnVsZS5wdXNoKHJ1bGVzQVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRlbXBSdWxlICYmIHRlbXBSdWxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlbGYuY29uZGl0aW9uTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGxheW91dENoaWxkID0gc2VsZi5sYXlvdXRfdGlYaWFuVGlwLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXlvdXRDaGlsZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxheW91dENoaWxkW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHNlbGYuaW1nX2ZyYW1lLmhlaWdodCA9IDk4MztcbiAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgc2VsZi5idG5fZ29QYXNzLnNjYWxlID0gMTtcbiAgICAgICAgICAgIGxldCBpc09rUnVsZXMgPSBmYWxzZTsgICAgICAgICAgLy/mmK/lkKblrozmiJDpnIDmsYIgICAgICAgICAgICBcblxuICAgICAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgICAgICAgICAgbGV0IHJ1bGVzID0gdGVtcFJ1bGU7XG4gICAgICAgICAgICBsZXQgb2tOdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBydWxlRGF0YSA9IHJ1bGVzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBsYWJsZVRpWGlhblRpcCA9IHNlbGYubGF5b3V0X3RpWGlhblRpcC5jaGlsZHJlbltpXTtcblxuICAgICAgICAgICAgICAgIGlmIChsYWJsZVRpWGlhblRpcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZURhdGEudXNlckN1cnJlbnRQcm9ncmVzcyA+PSBydWxlRGF0YS5kZW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmxlVGlYaWFuVGlwLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjNTA3OTAwXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFibGVUaVhpYW5UaXAuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChcIiNGMDBGMDBcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZURhdGEudHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJsZVRpWGlhblRpcC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDngq7loZTnrYnnuqfovr7liLAke3J1bGVEYXRhLmRlbWFuZH3nuqcoJHtydWxlRGF0YS51c2VyQ3VycmVudFByb2dyZXNzfS8ke3J1bGVEYXRhLmRlbWFuZH0pYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChydWxlRGF0YS50eXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmxlVGlYaWFuVGlwLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOmcgOe6ouWMhemHkeminSR7QXNzaXN0Q3RyLmNvbnZlcnROdW1iZXIocnVsZURhdGEuZGVtYW5kKX0oJHtBc3Npc3RDdHIuY29udmVydE51bWJlcihydWxlRGF0YS51c2VyQ3VycmVudFByb2dyZXNzKX0vJHtBc3Npc3RDdHIuY29udmVydE51bWJlcihydWxlRGF0YS5kZW1hbmQpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJ1bGVEYXRhLnR5cGUgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFibGVUaVhpYW5UaXAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg6ZyA5omT5Y2hJHtydWxlRGF0YS5kZW1hbmR95qyhLOW3suaJk+WNoSgke3J1bGVEYXRhLnVzZXJDdXJyZW50UHJvZ3Jlc3N9LyR7cnVsZURhdGEuZGVtYW5kfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJ1bGVEYXRhLnR5cGUgPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFibGVUaVhpYW5UaXAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg6ZyA57Sv6K6h5r+A5Yqx6KeG6aKR5oC75qyh5pWwJHtydWxlRGF0YS5kZW1hbmR95qyhKCR7cnVsZURhdGEudXNlckN1cnJlbnRQcm9ncmVzc30vJHtydWxlRGF0YS5kZW1hbmR9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGFibGVUaVhpYW5UaXAuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bGVEYXRhLnVzZXJDdXJyZW50UHJvZ3Jlc3MgPj0gcnVsZURhdGEuZGVtYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIG9rTnVtKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9rTnVtID49IHJ1bGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlzT2tSdWxlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc09rUnVsZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25kaXRpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2ZpbmlzaFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5idG5fZ29QYXNzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25kaXRpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2ZpbmlzaFwiKS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0hhdmVDYXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJTZWxlY3REYXRhLmNsb2NrSW5Ub2RheSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOW3suaJk+WNoWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCM3NTc1NzVgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuYnRuU3ByQXJyYXlbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBpbWdfaWNvbmApLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1clNlbGVjdERhdGEuY2xvY2tJblRvZGF5ID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDaGlsZEJ5TmFtZShgbGF5b3V0YCkuZ2V0Q2hpbGRCeU5hbWUoYGltZ19pY29uYCkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOWOu+WQiOaIkGA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCM1MDc5MDBgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuYnRuU3ByQXJyYXlbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyU2VsZWN0RGF0YS5jbG9ja0luVG9kYXkgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDaGlsZEJ5TmFtZShgbGF5b3V0YCkuZ2V0Q2hpbGRCeU5hbWUoYGltZ19pY29uYCkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBpbWdfaWNvbmApLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHNlbGYuYnRuX2dvUGFzcykucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKC40LCB7IHNjYWxlOiAxLjIgfSkudG8oLjQsIHsgc2NhbGU6IDEgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkuc3RhcnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5idG5fZ29QYXNzLmdldENoaWxkQnlOYW1lKGBsYXlvdXRgKS5nZXRDaGlsZEJ5TmFtZShgbGFibGVgKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDmiZPljaFgO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5idG5fZ29QYXNzLmdldENoaWxkQnlOYW1lKGBsYXlvdXRgKS5nZXRDaGlsZEJ5TmFtZShgbGFibGVgKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjNTA3OTAwYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLmJ0blNwckFycmF5WzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBpbWdfaWNvbmApLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOWOu+WQiOaIkGA7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDaGlsZEJ5TmFtZShgbGF5b3V0YCkuZ2V0Q2hpbGRCeU5hbWUoYGxhYmxlYCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgIzUwNzkwMGApO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLmJ0blNwckFycmF5WzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuY29uZGl0aW9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuaW1nX2ZyYW1lLmhlaWdodCA9IDc4MDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNIYXZlQ2FyZCkge1xuICAgICAgICAgICAgaWYgKGN1clNlbGVjdERhdGEubWFyaykge1xuICAgICAgICAgICAgICAgIHNlbGYudGl4aWFuX3N0YXRlID0gYCR7Y3VyU2VsZWN0RGF0YS5hbW91bnR95omT5Y2h5Lu75YqhPCR7Y3VyU2VsZWN0RGF0YS5tYXJrfT5gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpeGlhbl9zdGF0ZSA9IGAke2N1clNlbGVjdERhdGEuYW1vdW50feaJk+WNoeS7u+WKoTzml6A+YFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGN1clNlbGVjdERhdGEubWFyaykge1xuICAgICAgICAgICAgICAgIHNlbGYudGl4aWFuX3N0YXRlID0gYCR7Y3VyU2VsZWN0RGF0YS5hbW91bnR95qGj5L2NPCR7Y3VyU2VsZWN0RGF0YS5tYXJrfT5gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpeGlhbl9zdGF0ZSA9IGAke2N1clNlbGVjdERhdGEuYW1vdW50feaho+S9jTzml6A+YFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzdHIxID0gdGhpcy5jaGVja0lzVGlYaWFuKGN1clNlbGVjdERhdGEpO1xuICAgICAgICBsZXQgc3RyMiA9IHRoaXMuY2hlY2tJc1RpWGlhbjIoKTtcbiAgICAgICAgaWYgKHN0cjEgPT0gXCJcIiAmJiBzdHIyID09IFwiXCIpIHtcbiAgICAgICAgICAgIGlmICghdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLmdldFdhbGxldE1vbmV5VmlkZW9dKSB7XG4gICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5nZXRXYWxsZXRNb25leVZpZGVvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYy5lcnJvcihcIumAieS4reeahOaMiemSrlwiLCBjdXJTZWxlY3REYXRhKTtcbiAgICB9XG5cbiAgICBjbGlja09wZW5SdWxlKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5ydWxlVmlldy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg5o+Q546w6KeE5YiZYCxcbiAgICAgICAgfSlcblxuICAgICAgICBUcmFja01nci5BcHBDbGljayh7XG4gICAgICAgICAgICBhcHBfcGFnZV90aXRsZTogXCLmiJHnmoTpkrHljIVcIixcbiAgICAgICAgICAgIGFwcF9ja19tb2R1bGU6IFwi5o+Q546w6KeE5YiZXCIsXG4gICAgICAgICAgICBhcHBfZXhwb3N1cmVfdHlwZTogXCJpY29uXCIsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2xpY2tHZXRNb25leSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICBsZXQgY3VyU2VsZWN0RGF0YSA9IHNlbGYuY3VyU2VsZWN0Tm9kZVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF07XG5cbiAgICAgICAgaWYgKCFzZWxmLmN1clNlbGVjdE5vZGUgfHwgIWN1clNlbGVjdERhdGEpIHtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLor7fpgInmi6nmj5DnjrDph5Hpop1cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZi5jdXJTZWxlY3ROb2RlICYmIGN1clNlbGVjdERhdGEgJiYgc2VsZi53eERhdGEpIHtcbiAgICAgICAgICAgIGxldCBzdHIxID0gdGhpcy5jaGVja0lzVGlYaWFuKGN1clNlbGVjdERhdGEpO1xuICAgICAgICAgICAgbGV0IHN0cjIgPSB0aGlzLmNoZWNrSXNUaVhpYW4yKCk7XG4gICAgICAgICAgICBpZiAoc3RyMSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChzdHIxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5nZXRXYWxsZXRNb25leVZpZGVvLCAocmVzKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5nZXRXYWxsZXRNb25leVZpZGVvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5nZXRXYWxsZXRNb25leVZpZGVvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHIyICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoc3RyMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuc2VuZENvaW5EYXRhKCgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFhNU0RLLnBvc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LndhbGxldF9nZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjdXJTZWxlY3REYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdWNWaWV3LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYWJsZV9zdWNUaXAuc3RyaW5nID0gYOS9oOeahOaPkOeOsOW3sueUs+ivt+aIkOWKn++8jOeojeWQjuWPr+WcqOW+ruS/oVxcbuafpeeci+aYr+WQpui9rOi0puaIkOWKn+OAgmA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbml0RGF0YSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRDb2luKC1jdXJTZWxlY3REYXRhLnBvaW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vR2FtZUluZm8udXNlR29sZChwYXJzZUludChjdXJTZWxlY3REYXRhLmFtb3VudCkgKiBHYW1lSW5mby5nZXRDaGFuZ2VSYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFwcGx5X2Zvcl93aXRoZHJhd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2Ftb3VudDogTnVtYmVyKGN1clNlbGVjdERhdGEuYW1vdW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25fc3RhdHVzOiBg5oiQ5YqfYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2xldmVsOiBOdW1iZXIoY3VyU2VsZWN0RGF0YS5hbW91bnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc19zYXRpc2Z5X2NvbmRpdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya1N0cjogY3VyU2VsZWN0RGF0YS5tYXJrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg5o+Q546w55Sz6K+35oiQ5YqfYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciA9IGAke3Jlcy5tZXNzYWdlfWA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5hcHBseV9mb3Jfd2l0aGRyYXdhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uc19hbW91bnQ6IE51bWJlcihjdXJTZWxlY3REYXRhLmFtb3VudCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uX3N0YXR1czogYOWksei0pWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWx1cmVfY2F1c2U6IGAke3Jlcy5tZXNzYWdlfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uc19sZXZlbDogTnVtYmVyKGN1clNlbGVjdERhdGEuYW1vdW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNfc2F0aXNmeV9jb25kaXRpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrU3RyOiBjdXJTZWxlY3REYXRhLm1hcmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLmxhYmxlX3RpcE5lZWRQYXNzLnN0cmluZyA9IGAke3N0cn1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGYudGlwRnJhbWVWaWV3LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChzdHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5hcHBseV9mb3Jfd2l0aGRyYXdhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbnNfYW1vdW50OiBOdW1iZXIoY3VyU2VsZWN0RGF0YS5hbW91bnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25fc3RhdHVzOiBg5aSx6LSlYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWx1cmVfY2F1c2U6IGDmiJDlip/mj5DnjrDmv4DlirHop4bpopHml6DlrozmlbTmkq3mlL5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2xldmVsOiBOdW1iZXIoY3VyU2VsZWN0RGF0YS5hbW91bnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNfc2F0aXNmeV9jb25kaXRpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya1N0cjogY3VyU2VsZWN0RGF0YS5tYXJrLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghc2VsZi53eERhdGEpIHtcbiAgICAgICAgICAgIHNlbGYuY2xpY2tCYW5nRGluZ3d4KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0lzVGlYaWFuKGN1clNlbGVjdERhdGE6IGNhc2hNYXApOiBzdHJpbmcge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xuICAgICAgICBsZXQgcnVsZXMgPSBzZWxmLnRlbXBSdWxlcztcbiAgICAgICAgbGV0IHRlbXBSdWxlMjogQXJyYXk8cnVsZT4gPSBbXTtcblxuICAgICAgICBpZiAocnVsZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocnVsZXNbaV0udHlwZSAhPSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBSdWxlMi5wdXNoKHJ1bGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy/op4TliJnnsbvlnovvvIwxLeeCruWhlOetiee6pzIt57qi5YyF6YeR6aKdMy3miZPljaHmgLvmrKHmlbA0Lee0r+iuoea/gOWKseinhumikeaAu+asoeaVsDUt5YmN572u5Lu75YqhXG4gICAgICAgIGlmIChzdHIgPT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKHNlbGYuY29uZGl0aW9uTm9kZS5hY3RpdmUgJiYgIXNlbGYuY29uZGl0aW9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19maW5pc2hcIikuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBSdWxlMiAmJiB0ZW1wUnVsZTIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBSdWxlMi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJ1bGVEYXRhID0gdGVtcFJ1bGUyW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bGVEYXRhLnVzZXJDdXJyZW50UHJvZ3Jlc3MgPCBydWxlRGF0YS5kZW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZURhdGEudHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGDngq7loZTnrYnnuqfliLAke3J1bGVEYXRhLmRlbWFuZH3nuqflj6/mj5DnjrBgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChydWxlRGF0YS50eXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWwudXNlckRhdGEuY29pbiA8IGN1clNlbGVjdERhdGEucG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJHb2xkID0gcGFyc2VJbnQoY3VyU2VsZWN0RGF0YS5hbW91bnQpIC0gcGFyc2VJbnQodXRpbC5maW5kR29sZENhc2goKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyR29sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGDlho3otZoke2N1ckdvbGR95YWD5bCx6IO95o+Q546w5ZWmIWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBg5YaN6LWaJHtjdXJTZWxlY3REYXRhLmFtb3VudH3lhYPlsLHog73mj5DnjrDllaYhYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuYXBwbHlfZm9yX3dpdGhkcmF3YWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uc19hbW91bnQ6IE51bWJlcihjdXJTZWxlY3REYXRhLmFtb3VudCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25fc3RhdHVzOiBg5aSx6LSlYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsdXJlX2NhdXNlOiBcIumHkeW4geaVsOS4jei2s1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uc19sZXZlbDogTnVtYmVyKGN1clNlbGVjdERhdGEuYW1vdW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc19zYXRpc2Z5X2NvbmRpdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya1N0cjogY3VyU2VsZWN0RGF0YS5tYXJrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChydWxlRGF0YS50eXBlID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gYOi/mOmcgOaJk+WNoSR7cnVsZURhdGEuZGVtYW5kIC0gcnVsZURhdGEudXNlckN1cnJlbnRQcm9ncmVzc33lpKkhYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocnVsZURhdGEudHlwZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGDov5jpnIDntK/np6/nnIvop4bpopEke3J1bGVEYXRhLmRlbWFuZCAtIHJ1bGVEYXRhLnVzZXJDdXJyZW50UHJvZ3Jlc3N95qyhIWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgY2hlY2tJc1RpWGlhbjIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XG4gICAgICAgIGxldCBydWxlcyA9IHNlbGYudGVtcFJ1bGVzO1xuICAgICAgICBsZXQgdGVtcFJ1bGUxOiBBcnJheTxydWxlPiA9IFtdO1xuXG4gICAgICAgIGlmIChydWxlcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChydWxlc1tpXS50eXBlID09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcFJ1bGUxLnB1c2gocnVsZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3RCdG5DaGlsZDEgPSB0aGlzLnNlbGVjdExheW91dC5jaGlsZHJlbjtcbiAgICAgICAgbGV0IHNlbGVjdEJ0bkNoaWxkMiA9IHRoaXMuc2VsZWN0TGF5b3V0Mi5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wUnVsZTEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRJZCA9IHRlbXBSdWxlMVtpXS5kZW1hbmQ7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlbGVjdEJ0bkNoaWxkMS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RCdG5DaGlsZDFbal0gJiYgc2VsZWN0QnRuQ2hpbGQxW2pdW2Ake3RoaXMuYnRuRGF0YVN0cn1gXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuRGF0YTogY2FzaE1hcCA9IHNlbGVjdEJ0bkNoaWxkMVtqXVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChidG5EYXRhLmlkID09IHRhcmdldElkICYmIGJ0bkRhdGEuaGFzV2l0aGRyYXcgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ0bkRhdGEubWFyayAmJiBidG5EYXRhLm1hcmsgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGDor7flhYjmj5DnjrAke2J0bkRhdGEubWFya30ke2J0bkRhdGEuYW1vdW50feWFg2A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBg6K+35YWI5o+Q546wJHtidG5EYXRhLmFtb3VudH3lhYNgO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdHIgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2VsZWN0QnRuQ2hpbGQyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RCdG5DaGlsZDJbal0gJiYgc2VsZWN0QnRuQ2hpbGQyW2pdW2Ake3RoaXMuYnRuRGF0YVN0cn1gXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bkRhdGE6IGNhc2hNYXAgPSBzZWxlY3RCdG5DaGlsZDJbal1bYCR7dGhpcy5idG5EYXRhU3RyfWBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ0bkRhdGEuaWQgPT0gdGFyZ2V0SWQgJiYgYnRuRGF0YS5oYXNXaXRoZHJhdyA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ0bkRhdGEubWFyayAmJiBidG5EYXRhLm1hcmsgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBg6K+35YWI5o+Q546wJHtidG5EYXRhLm1hcmt9JHtidG5EYXRhLmFtb3VudH3lhYNgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gYOivt+WFiOaPkOeOsCR7YnRuRGF0YS5hbW91bnR95YWDYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIGNsaWNrT3BlblJlY29yZCgpIHtcbiAgICAgICAgLy8gVUlGdW5jLm9wZW5VSShBY3Rpdml0eVBhbm5lbE5hbWUuUGFubmVsV2FsbGV0UmVjb3JkLCAobm9kZSwgc2NyaXB0KSA9PiB7XG5cbiAgICAgICAgLy8gfSlcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwVmlld1NjcmVlbih7XG4gICAgICAgICAgICBhcHBfcGFnZV90aXRsZTogXCLmj5DnjrDorrDlvZVcIlxuICAgICAgICB9KVxuXG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIuaIkeeahOmSseWMhVwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLmj5DnjrDorrDlvZVcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcbiAgICAgICAgfSlcblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lV2FsbGV0UmVjb3JkKTtcbiAgICB9XG5cbiAgICBjbGlja0JhbmdEaW5nd3goKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgWE1TREsuYXV0aFdlY2hhdCgpO1xuICAgIH1cblxuICAgIGNsaWNrQ2xvc2UoKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzSW5zZXJ0KSB7XG4gICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uV2FsbGV0QXdhcmRJbnNlcnQsICgpID0+IHsgY29uc29sZS5sb2coXCLlhbPpl63mj5DnjrDlpZblirHmj5LlsY/lub/lkYrmkq3mlL7lrozmiJBcIikgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+aPkOeOsOaIkOWKny0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGNsaWNrQ2xvc2VTdWNUaXAoKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLnN1Y1ZpZXcuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg5o+Q546w55Sz6K+35oiQ5YqfYCxcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLmiJHnn6XpgZPkuoZcIixcbiAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOiBcIua/gOWKseinhumikVwiXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy/mj5DnjrDop4TliJktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBjbGlja0Nsb3NlUnVsZSgpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMucnVsZVZpZXcuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg5o+Q546w6KeE5YiZYCxcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLmiJHnn6XpgZPkuoZcIlxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8v5o+Q546w5o+Q56S6LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgY2xpY2tHb1Bhc3MoKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICBsZXQgY3VyU2VsZWN0RGF0YTogY2FzaE1hcCA9IHRoaXMuY3VyU2VsZWN0Tm9kZVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF07XG4gICAgICAgIGxldCBydWxlcyA9IHRoaXMudGVtcFJ1bGVzO1xuICAgICAgICBsZXQgY2xvY2tJbkRheXMgPSAwO1xuICAgICAgICBpZiAocnVsZXMgJiYgcnVsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChydWxlc1tpXS50eXBlID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvY2tJbkRheXMgPSBydWxlc1tpXS51c2VyQ3VycmVudFByb2dyZXNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+inhOWImeexu+Wei++8jDEt54Ku5aGU562J57qnMi3nuqLljIXph5Hpop0zLeaJk+WNoeaAu+asoeaVsDQt57Sv6K6h5r+A5Yqx6KeG6aKR5oC75qyh5pWwNS3liY3nva7ku7vliqFcblxuICAgICAgICBsZXQgYnRuU3RyID0gdGhpcy5idG5fZ29QYXNzLmdldENoaWxkQnlOYW1lKGBsYXlvdXRgKS5nZXRDaGlsZEJ5TmFtZShgbGFibGVgKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZztcbiAgICAgICAgaWYgKGJ0blN0ciA9PSBcIuaJk+WNoVwiKSB7XG4gICAgICAgICAgICBpZiAoY3VyU2VsZWN0RGF0YS5jbG9ja0luVG9kYXkgPT0gMSkge1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFjdGl2aXR5X2dldE1vbmV5KHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDngrnlh7vmiZPljaFgLFxuICAgICAgICAgICAgICAgICAgICBidXR0b25faGNkZzE6IGDmiZPljaFgLFxuICAgICAgICAgICAgICAgICAgICB0aXhpYW5fc3RhdGU6IHRoaXMudGl4aWFuX3N0YXRlLFxuICAgICAgICAgICAgICAgICAgICBkYWthX2RheXM6IGDnrKwke2Nsb2NrSW5EYXlzfeWkqWAsXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZERhQ2FyZChjdXJTZWxlY3REYXRhLnR5cGUsIGNsb2NrSW5EYXlzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuYWN0aXZpdHlfZ2V0TW9uZXkoe1xuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogYOeCueWHu+aJk+WNoWAsXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbl9oY2RnMTogYOinhumikeaJk+WNoWAsXG4gICAgICAgICAgICAgICAgICAgIHRpeGlhbl9zdGF0ZTogdGhpcy50aXhpYW5fc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIGRha2FfZGF5czogYOesrCR7Y2xvY2tJbkRheXN95aSpYCxcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLndhbGxldENhcmRWaWRlbywgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmREYUNhcmQoY3VyU2VsZWN0RGF0YS50eXBlLCBjbG9ja0luRGF5cylcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodChcInRpcHMucmV3YXJkX29idGFpbl9mYWlsZWRcIikpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYnRuU3RyID09IFwi5bey5omT5Y2hXCIpIHtcbiAgICAgICAgICAgIFRyYWNrTWdyLmFjdGl2aXR5X2dldE1vbmV5KHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogYOeCueWHu+aJk+WNoWAsXG4gICAgICAgICAgICAgICAgYnV0dG9uX2hjZGcxOiBg5bey5omT5Y2hYCxcbiAgICAgICAgICAgICAgICB0aXhpYW5fc3RhdGU6IHRoaXMudGl4aWFuX3N0YXRlLFxuICAgICAgICAgICAgICAgIGRha2FfZGF5czogYOesrCR7Y2xvY2tJbkRheXN95aSpYCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKGDku4rml6Xlt7LmiZPljaEs5piO5pel5YaN5p2lfmApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYnRuU3RyID09IFwi5Y675ZCI5oiQXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZW5kRGFDYXJkKHR5cGU6IG51bWJlciwgY2xvY2tJbkRheXMpIHtcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LnZpZGVvQ2FyZE9rLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGNhc2hPdXRUeXBlOiB0eXBlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuYWN0aXZpdHlfZ2V0TW9uZXkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDmiZPljaHov4fnqItgLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uX2hjZGcxOiBg5omT5Y2hYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpeGlhbl9zdGF0ZTogdGhpcy50aXhpYW5fc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzZnVsX2Nsb2NrX2luOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFrYV9kYXlzOiBg56ysJHtjbG9ja0luRGF5c33lpKlgLFxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoYOaJk+WNoeaIkOWKn2ApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5hY3Rpdml0eV9nZXRNb25leSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogYOaJk+WNoei/h+eoi2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25faGNkZzE6IGDmiZPljaFgLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl4aWFuX3N0YXRlOiB0aGlzLnRpeGlhbl9zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWxfY2xvY2tfaW46IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFrYV9kYXlzOiBg56ysJHtjbG9ja0luRGF5c33lpKlgLFxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAocmVzLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNsaWNrQ2xvc2VUaXAoKSB7XG4gICAgICAgIHRoaXMudGlwRnJhbWVWaWV3LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIG51bSDmlbDph49cbiAgICAgKiBAcGFyYW0gcG9zIOS9jee9rlxuICAgICAqL1xuICAgIGNyZWF0ZU51bShudW06IG51bWJlcikge1xuICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IHRoaXMud2FsbGV0UG9vbC5jcmVhdGVFbmVteSh0aGlzLmFkZENvaW5Cb3gpO1xuICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLmFkZENvaW5Cb3gpO1xuICAgICAgICBpdGVtLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgaXRlbS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICBpdGVtLmNoaWxkcmVuWzFdICYmIChpdGVtLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBudW0pO1xuICAgICAgICBpdGVtLnNjYWxlID0gMS4xO1xuICAgICAgICBjYy50d2VlbihpdGVtKS5wYXJhbGxlbChcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkuYnkoLjUsIHsgeTogODQgfSksXG4gICAgICAgICAgICBjYy50d2VlbigpLmRlbGF5KC4yNSkudG8oLjI1LCB7IG9wYWNpdHk6IDAgfSlcbiAgICAgICAgKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2FsbGV0UG9vbC5vbkVuZW15S2lsbGVkKGl0ZW0pO1xuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxufVxuIl19