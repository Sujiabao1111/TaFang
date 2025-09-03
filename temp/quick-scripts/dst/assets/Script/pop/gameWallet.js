
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVXYWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUNwQyxtREFBa0Q7QUFDbEQsMkNBQThDO0FBQzlDLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBQ2xDLCtDQUE4QztBQUM5QyxzRUFBaUU7QUFDakUscURBQWdEO0FBQ2hELHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBbUQ1QztJQUF3Qyw4QkFBTTtJQUE5QztRQUFBLHFFQTgrQkM7UUEzK0JHLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLG9CQUFjLEdBQTBCLEVBQUUsQ0FBQztRQUczQyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFHakMsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsaUJBQVcsR0FBMEIsRUFBRSxDQUFDO1FBR3hDLHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBRWhDLGlDQUFpQztRQUVqQyx1QkFBaUIsR0FBYSxJQUFJLENBQUM7UUFFbkMsaUNBQWlDO1FBRWpDLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRTlCLE1BQU07UUFFTix1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QUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1k7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztzREFDZ0I7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ2U7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO21EQUNlO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ2M7SUFJaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDZ0I7SUFJbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDVztJQUk5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNnQjtJQUluQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNVO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1M7SUFoRVYsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQTgrQjlCO0lBQUQsaUJBQUM7Q0E5K0JELEFBOCtCQyxDQTkrQnVDLGdCQUFNLEdBOCtCN0M7a0JBOStCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgdXBkYXRlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgcG9vbCBmcm9tIFwiLi4vY29tbW9uL3Bvb2xcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgaW50ZXJmYWNlIGNhc2hNYXAge1xuICAgIGFtb3VudDogc3RyaW5nXHQgICAgLy/mj5DnjrDph5Hpop3vvIjlhYPvvIlcbiAgICBiYW5uZXI6IHN0cmluZ1x0ICAgIC8v5oyJ6ZKuXG4gICAgaWQ6IG51bWJlclx0ICAgICAgICAvL+S4muWKoUlEXG4gICAgcmVxdWlyZWQ6IG51bWJlclx0Ly/lhbPljaHopoHmsYJcbiAgICBtYXJrOiBzdHJpbmdcdCAgICAvL+inkuagh1xuICAgIG1hcmtSZXNvdXJjZTogc3RyaW5nIC8v6KeS5qCH6LWE5rqQXG4gICAgcG9pbnQ6IG51bWJlclx0ICAgIC8v5o+Q546w5omA6ZyA6YeR5biBXG4gICAgc29ydE5vOiBudW1iZXJcdCAgICAvL+aOkuW6j+WPtyAgICBcbiAgICB0eXBlOiBudW1iZXIgICAgICAgIC8v57G75Z6LOiAwLeaZrumAmiAxLeaWsOS6ulxuICAgIGdyb3VwaW5nOiBudW1iZXIgICAgIC8v5YiG57uE77yMMS3lv6vpgJ/mj5DnjrAyLeaXpeW4uOaPkOeOsFxuICAgIGhhc1dpdGhkcmF3OiBudW1iZXIgIC8v6K+l6YCJ6aG55piv5ZCm5bey5o+Q546w77yMMS3lt7Lmj5DnjrAyLeacquaPkOeOsFxuICAgIHJ1bGVzOiBBcnJheTxBcnJheTxydWxlPj5cbiAgICBjbG9ja0luVG9kYXk6IG51bWJlciAvL+S7iuaXpeaYr+WQpuaJk+WNoTAt5LuK5pel5bey5omT5Y2h77yMMS3nm7TmjqXmiZPljaHvvIwyLeinhumikeaJk+WNoVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIHJ1bGUge1xuICAgIGRlbWFuZDogbnVtYmVyICAgICAgICAgICAgICAgICAgIC8v6KaB5rGC5pWw6YePXG4gICAgdHlwZTogbnVtYmVyICAgICAgICAgICAgICAgICAgICAgLy/op4TliJnnsbvlnovvvIwxLeeCruWhlOetiee6pzIt57qi5YyF6YeR6aKdMy3miZPljaHmgLvmrKHmlbA0Lee0r+iuoea/gOWKseinhumikeaAu+asoeaVsDUt5YmN572u5Lu75YqhXG4gICAgdXNlckN1cnJlbnRQcm9ncmVzczogbnVtYmVyICAgICAgLy/nlKjmiLflvZPliY3ov5vluqZcbn1cblxuZXhwb3J0IGludGVyZmFjZSB3YWxsZXREYXRhIHtcbiAgICBiaW5kQWxpUGF5OiBib29sZWFuICAgICAgICAgIC8v5piv5ZCm5bey57uR5a6a5pSv5LuY5a6d6LSm5Y+3XG4gICAgY2FzaE91dE1hcDoge1xuICAgICAgICAxOiBBcnJheTxjYXNoTWFwPiAgICAgICAgICAgICAgIC8v5o+Q546w5YiX6KGoXG4gICAgICAgIDI6IEFycmF5PGNhc2hNYXA+ICAgICAgICAgICAgICAgLy/mj5DnjrDliJfooahcbiAgICB9XG4gICAgZ29sZDogeyAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4gVxuICAgICAgICBleGNoYW5nZUFtb3VudDogc3RyaW5nXHQgLy/lj6/lhZHmjaLph5Hpop0o5YWDKVxuICAgICAgICBleGNoYW5nZVJhdGU6IG51bWJlclx0IC8v5rGH546H77yM5YWR5o2i5LiA5YWD5omA6ZyA6YeR5biB5YC8XG4gICAgICAgIGdvbGRQb2ludDogbnVtYmVyXHQgICAgIC8v6YeR5biB5YC8XG4gICAgfVxuICAgIG1hcnF1ZWU6IEFycmF5PHN0cmluZz4sICAgICAgIC8v6LeR6ams54GvXG4gICAgbmV3VXNlckxpc3Q6IEFycmF5PGNhc2hNYXA+ICAvL+aWsOS6uuS4k+S6q+WIl+ihqFxuICAgIHJ1bGU6IHN0cmluZ1x0ICAgICAgICAgICAgIC8v5o+Q546w6KeE5YiZXG4gICAgd2VDaGF0OiB7ICAgICAgICAgICAgICAgICAgICAvL+W+ruS/oeS/oeaBr1xuICAgICAgICBhdmF0YXJVcmw6IHN0cmluZ1x0ICAgICAvL+WktOWDj1xuICAgICAgICBuaWNrbmFtZTogc3RyaW5nICAgICAgICAgLy/mmLXnp7BcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgdmlkZW9DYXJkTWFpbiB7XG4gICAgY2xvY2tJbkRheXM6IG51bWJlciwgICAgICAgIC8v5bey5omT5Y2h5aSp5pWwXG4gICAgbmVlZENsb2NrSW5EYXlzOiBudW1iZXIsICAgIC8v6ZyA6KaB5omT5Y2h55qE5aSp5pWwXG4gICAgdG9kYXlDaGVja2VkOiBib29sZWFuLCAgICAgIC8v5LuK5pel5piv5ZCm5bey5omT5Y2hIGZhbHNlLeacquaJk+WNoSB0cnVlLeW3suaJk+WNoVxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVdhbGxldCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfbXlHb2xkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfbW9uZXk6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHN1Y1ZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcnVsZVZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdGlwRnJhbWVWaWV3OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNlbGVjdExheW91dDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzZWxlY3RMYXlvdXQyOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGltZ19mcmFtZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBzZWxlY3RTcHJBcnJheTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW107XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzcGluZV9zaG91OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNvbmRpdGlvbk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGF5b3V0X3RpWGlhblRpcDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5fZ29QYXNzOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBidG5TcHJBcnJheTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW107XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5fc2VsZWN0TW9uZXk6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLy/mj5DnjrDop4TliJktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfcnVsZUNvbnRlbnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8v5o+Q546w5oiQ5YqfLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmxlX3N1Y1RpcDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy/mj5DnjrDmj5DnpLpcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfdGlwTmVlZFBhc3M6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8v5aKe5Yqg5Lic6KW/XG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBhZGRDb2luSXRlbTogY2MuUHJlZmFiID0gbnVsbDtcbiAgICAvL+WcqOWTqumHjOWinuWKoFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGFkZENvaW5Cb3g6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICAvLy0tLS0tLeiEmuacrOWPmOmHjy0tLS0tLVxuICAgIHByaXZhdGUgY3VyU2VsZWN0Tm9kZTogY2MuTm9kZSA9IG51bGw7ICAgICAgIC8v5b2T5YmN6YCJ5Lit55qE6YeR6aKd5qGGICAgICAgIFxuICAgIHByaXZhdGUgY2xvc2VDYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xuICAgIHByaXZhdGUgd3hEYXRhID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXNJbnNlcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG9uY2VFbnRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBwcml2YXRlIHRlbXBSdWxlczogQXJyYXk8cnVsZT4gPSBbXTtcblxuICAgIHByaXZhdGUgYnRuRGF0YVN0ciA9IGBjYXNoRGF0YWA7XG5cbiAgICBwcml2YXRlIHRpeGlhbl9zdGF0ZSA9IGDlvZPliY3pgInmi6nnmoTmj5DnjrDmoaPkvY1gO1xuXG4gICAgcHJpdmF0ZSB3YWxsZXRQb29sOnBvb2wgO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5iaW5kV2VjaGF0U3VjY2VzcywgdGhpcy53eFN1Y0Z1biwgdGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzSW5zZXJ0ID0gTWF0aC5yYW5kb20oKSA+IC41O1xuXG4gICAgICAgIGlmICh0aGlzLmlzSW5zZXJ0KSB7XG4gICAgICAgICAgICBBZENvbnRyb2xsZXIucHJlVmlkZW9BZChBZFBvc2l0aW9uLldhbGxldEF3YXJkSW5zZXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5pWw5o2u5pu05pawXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVmlld19Vc2VyRGF0YVVwZGF0YSwocmVzKT0+e1xuICAgICAgICAgICAgaWYocmVzPT11cGRhdGVUeXBlLmNvaW4pe1xuICAgICAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHV0aWwudXNlckRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9teUdvbGQuc3RyaW5nID0gU3RyaW5nKHVzZXJEYXRhLmNvaW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIC8v5aKe5Yqg6YeR5biBXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfV2FsbGV0X0FkZENvaW4sKHJlcyk9PntcbiAgICAgICAgICAgIGlmKHJlcz4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU51bShyZXMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgdGhpcy53YWxsZXRQb29sID0gbmV3IHBvb2woY2MuaW5zdGFudGlhdGUodGhpcy5hZGRDb2luSXRlbSkpO1xuXG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIC8vdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICBUcmFja01nci5BcHBWaWV3U2NyZWVuKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIuaPkOeOsOmhtVwiXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5zcGluZV9zaG91LmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zcGluZV9zaG91LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucnVsZVZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3VjVmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aXBGcmFtZVZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VDYWxsYmFjayAmJiB0aGlzLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgdGhpcy5jbG9zZUNhbGxiYWNrID0gbnVsbDtcblxuICAgICAgICB0aGlzLndhbGxldFBvb2wuY2xlYXJQb29sKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5HdWlkZSgpIHtcbiAgICAgICAgdGhpcy5zcGluZV9zaG91LmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgd3hTdWNGdW4oKSB7XG4gICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLnu5HlrprmiJDlip9cIik7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICB9XG5cbiAgICBpbml0RGF0YSgpIHtcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LndhbGxldF9tYWluMixcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBzZXRDbG9zZUNhbGwoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuY2xvc2VDYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgfVxuXG4gICAgc2V0bGF5b3V0KHBhcmVudE5vZGU6IGNjLk5vZGUsIGRhdGE6IEFycmF5PGNhc2hNYXA+LCBwcmU6IGNjLk5vZGUsIG1heE51bTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwYXJlbnROb2RlQ2hpbGQgPSBwYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICBsZXQgYWRkTnVtID0gZGF0YS5sZW5ndGggLSBwYXJlbnROb2RlQ2hpbGQubGVuZ3RoO1xuICAgICAgICBpZiAoYWRkTnVtID4gbWF4TnVtKSB7XG4gICAgICAgICAgICBhZGROdW0gPSBtYXhOdW07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkZE51bSA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5zID0gY2MuaW5zdGFudGlhdGUocHJlKTtcbiAgICAgICAgICAgICAgICBpbnMucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFkZE51bSA9IE1hdGguYWJzKGFkZE51bSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZE51bTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudE5vZGVDaGlsZFswXSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbMF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50Tm9kZUNoaWxkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbaV0udGFyZ2V0T2ZmKHRoaXMpO1xuICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlQ2hpbGRbaV0gJiYgcGFyZW50Tm9kZUNoaWxkW2ldW2Ake3RoaXMuYnRuRGF0YVN0cn1gXSAmJiBwYXJlbnROb2RlQ2hpbGRbaV1bYCR7dGhpcy5idG5EYXRhU3RyfWBdLmhhc1dpdGhkcmF3ID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuW3suaPkOeOsFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja1NlbGVjdE1vbmV5KHBhcmVudE5vZGVDaGlsZFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0ZW1wQ29sb3IgPSBuZXcgY2MuQ29sb3IoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7ICAgLy/pgY3ljobmj5DnjrDliJfooaggICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlQ2hpbGRbaV0gJiYgZGF0YVtpXSkge1xuICAgICAgICAgICAgICAgIGxldCBjYXNoOiBjYXNoTWFwID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEFsbFJ1bGVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGNhc2gucnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEFsbFJ1bGVzLnB1c2goY2FzaC5ydWxlc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzaC5ydWxlcyA9IHRlbXBBbGxSdWxlcztcblxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImxheW91dFwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX251bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNhc2guYW1vdW50O1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF0gPSBjYXNoO1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwibGF5b3V0XCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfbnVtXCIpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjQkI0MjBFXCIpO1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlX3N0YXRlXCIpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjRkZGRkZGXCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGJ0blR5cGUgPSAoY2FzaC5tYXJrICE9IFwi5Y+v5omT5Y2hXCIgfHwgKGNhc2guY2xvY2tJblRvZGF5ICE9IDAgJiYgY2FzaC5jbG9ja0luVG9kYXkgIT0gMykpO1xuICAgICAgICAgICAgICAgIGlmIChjYXNoLm1hcmsgJiYgY2FzaC5tYXJrICE9IFwiXCIgJiYgY2FzaC5oYXNXaXRoZHJhdyA9PSAyICYmIGNhc2gubWFya1Jlc291cmNlICYmIGNhc2gubWFya1Jlc291cmNlICE9IFwiXCIgJiYgYnRuVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FzaC5zb3J0Tm8gPT0gMiAmJiBjYXNoLmNsb2NrSW5Ub2RheSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWxsUnVsZXMgPSBjYXNoLnJ1bGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzQ2FuQ2FyZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJ1bGVzID0gYWxsUnVsZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBydWxlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZXNbal0udHlwZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZXNbal0udXNlckN1cnJlbnRQcm9ncmVzcyA+PSBydWxlc1tqXS5kZW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NhbkNhcmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FuQ2FyZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDYW5DYXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciA9IEFzc2lzdEN0ci5mb3JtYXREYXRhMjQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZV9zdGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciA9IEFzc2lzdEN0ci5mb3JtYXREYXRhMjQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfc3RhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXJrSW1hZ2UocGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBgJHtjYXNoLm1hcmtSZXNvdXJjZX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfc3RhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjYXNoLm1hcms7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjYXNoLm1hcms7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXJrSW1hZ2UocGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBgJHtjYXNoLm1hcmtSZXNvdXJjZX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfc3RhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjYXNoLm1hcms7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlQ2hpbGRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNhc2gubWFyaztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWFya0ltYWdlKHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgYCR7Y2FzaC5tYXJrUmVzb3VyY2V9YClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZUNoaWxkW2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFibGVfc3RhdGVcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FzaC5oYXNXaXRoZHJhdyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5vcGFjaXR5ID0gMTUwO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW3suaPkOeOsDpcIixjYXNoLmFtb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKChjYXNoLnR5cGU9PTEmJkFzc2lzdEN0ci5pc0FUZXN0KCkpfHwoY2FzaC50eXBlPT05JiYhQXNzaXN0Q3RyLmlzQVRlc3QoKSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1NhdmluZ1Bvc3RfTG9jayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVDaGlsZFtpXS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldERhdGEoZGF0YTogd2FsbGV0RGF0YSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHNlbGYubGFibGVfbXlHb2xkKSB7XG4gICAgICAgICAgICAvLyBzZWxmLmxhYmxlX215R29sZC5zdHJpbmcgPSBgJHtBc3Npc3RDdHIuY29udmVydE51bWJlcihkYXRhLmdvbGQuZ29sZFBvaW50KX1gO1xuICAgICAgICAgICAgc2VsZi5sYWJsZV9teUdvbGQuc3RyaW5nID0gZGF0YS5nb2xkLmdvbGRQb2ludCtcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmxhYmxlX21vbmV5KSB7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX21vbmV5LnN0cmluZyA9IGDnuqYke2RhdGEuZ29sZC5leGNoYW5nZUFtb3VudH3lhYNgO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc2V0bGF5b3V0KHNlbGYuc2VsZWN0TGF5b3V0LCBkYXRhLmNhc2hPdXRNYXBbMV0sIHNlbGYuYnRuX3NlbGVjdE1vbmV5LCA2KTtcbiAgICAgICAgc2VsZi5zZXRsYXlvdXQoc2VsZi5zZWxlY3RMYXlvdXQyLCBkYXRhLmNhc2hPdXRNYXBbMl0sIHNlbGYuYnRuX3NlbGVjdE1vbmV5LCAzKTtcblxuICAgICAgICBzZWxmLnNldEVmZmVjdCgpO1xuXG4gICAgICAgIGlmIChkYXRhLndlQ2hhdCkge1xuICAgICAgICAgICAgdGhpcy53eERhdGEgPSBkYXRhLndlQ2hhdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud3hEYXRhID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLmxhYmxlX3J1bGVDb250ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX3J1bGVDb250ZW50LnN0cmluZyA9IGRhdGEucnVsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuc2V0Q2xpY2tCdG4oKTtcbiAgICB9XG5cbiAgICAvL+iuvue9ruWKqOaAgeaViOaenFxuICAgIHNldEVmZmVjdCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc2VsZWN0TGF5b3V0ID0gc2VsZi5zZWxlY3RMYXlvdXQuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0TGF5b3V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0TGF5b3V0W2ldKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJ0bkRhdGE6IGNhc2hNYXAgPSBzZWxlY3RMYXlvdXRbaV1bYCR7dGhpcy5idG5EYXRhU3RyfWBdO1xuICAgICAgICAgICAgICAgIGlmIChidG5EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBidG5UeXBlID0gKGJ0bkRhdGEubWFyayAhPSBcIuWPr+aJk+WNoVwiIHx8IChidG5EYXRhLmNsb2NrSW5Ub2RheSAhPSAwICYmIGJ0bkRhdGEuY2xvY2tJblRvZGF5ICE9IDMpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgoYnRuRGF0YS5hbW91bnQgPT0gXCIwLjNcIiAmJiBidG5EYXRhLm1hcmsgPT0gXCLku4rml6Xlj6/pooZcIikgfHwgYnRuRGF0YS5hbW91bnQgPT0gXCIxMFwiKSAmJiBidG5EYXRhLmhhc1dpdGhkcmF3ID09IDIgJiYgYnRuVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jbG9ja0luVG9kYXk6IG51bWJlciAvL+S7iuaXpeaYr+WQpuaJk+WNoTAt5LuK5pel5bey5omT5Y2h77yMMS3nm7TmjqXmiZPljaHvvIwyLeinhumikeaJk+WNoVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdExheW91dFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikgJiYgc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MudHdlZW4oc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiaW1nX3N0YXRlXCIpKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY2MudHdlZW4oKS5ieSgwLjMyLCB7IHk6IDEwIH0sIHsgZWFzaW5nOiBcImVhc2VJblNpbmVcIiB9KS5ieSgwLjMyLCB7IHk6IC0xMCB9LCB7IGVhc2luZzogXCJlYXNlT3V0U2luZVwiIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICkuc3RhcnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfc3RhdGVcIikpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLCB7IGFuZ2xlOiAxMCB9KS50byguMiwgeyBhbmdsZTogMCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJndWFuZ05vZGVcIikgJiYgc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwic2FvZ3VhbmdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNhb0d1YW5nOiBjYy5Ob2RlID0gc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwic2FvZ3VhbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhb0d1YW5nLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhb0d1YW5nLnggPSAtMTQ1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJndWFuZ05vZGVcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oc2FvR3VhbmcpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKDAuNjQsIHsgeDogMTUwIH0pLmRlbGF5KDAuNjQpLmNhbGwoKCkgPT4geyBzYW9HdWFuZy54ID0gLTE0NSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdExheW91dFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdExheW91dFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdExheW91dFtpXS5nZXRDaGlsZEJ5TmFtZShcImltZ19zdGF0ZVwiKS5hbmdsZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdOb2RlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNhb0d1YW5nOiBjYy5Ob2RlID0gc2VsZWN0TGF5b3V0W2ldLmdldENoaWxkQnlOYW1lKFwiZ3VhbmdOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwic2FvZ3VhbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FvR3Vhbmcuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW9HdWFuZy54ID0gLTE0NTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RMYXlvdXRbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJndWFuZ05vZGVcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+iuvue9ruinkuagh1xuICAgIHNldE1hcmtJbWFnZSh0YXJnZXRTcHI6IGNjLlNwcml0ZSwgdXJsU3RyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sb2FkQW55KHVybFN0ciwgY2MuU3ByaXRlRnJhbWUsIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRTcHIpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTcHIuc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U3ByLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKCkgPT4geyBpZiAodGFyZ2V0U3ByKSB0YXJnZXRTcHIubm9kZS5hY3RpdmUgPSBmYWxzZTsgfSlcbiAgICB9XG5cbiAgICBzZXRDbGlja0J0bigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc2VsZWN0Tm9kZSA9IHNlbGYuc2VsZWN0TGF5b3V0LmNoaWxkcmVuO1xuICAgICAgICBsZXQgb25jZVRhcmdldCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Tm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNlbGVjdE5vZGVbaV0gJiYgc2VsZWN0Tm9kZVtpXVtgJHtzZWxmLmJ0bkRhdGFTdHJ9YF0gJiYgc2VsZWN0Tm9kZVtpXVtgJHtzZWxmLmJ0bkRhdGFTdHJ9YF0uaGFzV2l0aGRyYXcgPT0gMikge1xuICAgICAgICAgICAgICAgIG9uY2VUYXJnZXQgPSBzZWxlY3ROb2RlW2ldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghb25jZVRhcmdldCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdE5vZGUyID0gc2VsZi5zZWxlY3RMYXlvdXQyLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3ROb2RlMi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3ROb2RlMltpXSAmJiBzZWxlY3ROb2RlMltpXVtgJHtzZWxmLmJ0bkRhdGFTdHJ9YF0gJiYgc2VsZWN0Tm9kZTJbaV1bYCR7c2VsZi5idG5EYXRhU3RyfWBdLmhhc1dpdGhkcmF3ID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgb25jZVRhcmdldCA9IHNlbGVjdE5vZGUyW2ldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChzZWxlY3ROb2RlICYmIHNlbGVjdE5vZGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHNlbGYub25jZUVudGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9uY2VUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbGlja1NlbGVjdE1vbmV5KG9uY2VUYXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLm9uY2VFbnRlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY3VyU2VsZWN0Tm9kZSAmJiBzZWxmLmN1clNlbGVjdE5vZGVbYCR7dGhpcy5idG5EYXRhU3RyfWBdICYmIHNlbGYuY3VyU2VsZWN0Tm9kZVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF0uaGFzV2l0aGRyYXcgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsaWNrU2VsZWN0TW9uZXkoc2VsZi5jdXJTZWxlY3ROb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbmNlVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsaWNrU2VsZWN0TW9uZXkob25jZVRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jdXJTZWxlY3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJTZWxlY3ROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi5zZWxlY3RTcHJBcnJheVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZGl0aW9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nX2ZyYW1lLmhlaWdodCA9IDc4MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrU2VsZWN0TW9uZXkodGFyZ2V0OiBjYy5Ob2RlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAoc2VsZi5jdXJTZWxlY3ROb2RlKSB7XG4gICAgICAgICAgICBzZWxmLmN1clNlbGVjdE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLnNlbGVjdFNwckFycmF5WzBdO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuY3VyU2VsZWN0Tm9kZSA9IHRhcmdldDtcbiAgICAgICAgaWYgKCFzZWxmLmN1clNlbGVjdE5vZGVbYCR7dGhpcy5idG5EYXRhU3RyfWBdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VyU2VsZWN0RGF0YTogY2FzaE1hcCA9IHNlbGYuY3VyU2VsZWN0Tm9kZVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF07XG4gICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuc2VsZWN0U3ByQXJyYXlbMV07XG5cbiAgICAgICAgbGV0IGlzSGF2ZUNhcmQgPSBmYWxzZTsgICAgICAgICAvL+aYr+WQpuacieaJk+WNoeS7u+WKoSAgICAgICAgXG4gICAgICAgIGxldCB0ZW1wUnVsZSA9IFtdOyAgICAgICAgICAgICAgICAgICAgICAvL+WIhuexu+WlveW9k+WJjee7hOaPkOeOsOimgeaxglxuICAgICAgICBsZXQgdGVtcFJ1bGVEYXRhOiBBcnJheTxydWxlPiA9IFtdOyAgICAgIC8v5b2T5YmN57uE5o+Q546w6KaB5rGC5pWw5o2uXG4gICAgICAgIGxldCBhbGxSdWxlcyA9IGN1clNlbGVjdERhdGEucnVsZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBydWxlcyA9IGFsbFJ1bGVzW2ldO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBydWxlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChydWxlc1tqXS50eXBlICE9IDUgJiYgcnVsZXNbal0udXNlckN1cnJlbnRQcm9ncmVzcyA8IHJ1bGVzW2pdLmRlbWFuZCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wUnVsZURhdGEgPSBydWxlcztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlbXBSdWxlRGF0YSAmJiB0ZW1wUnVsZURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0ZW1wUnVsZURhdGEgJiYgdGVtcFJ1bGVEYXRhLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0ZW1wUnVsZURhdGEgPSBhbGxSdWxlc1thbGxSdWxlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnRlbXBSdWxlcyA9IHRlbXBSdWxlRGF0YTtcblxuXG4gICAgICAgIGlmICh0ZW1wUnVsZURhdGEgJiYgdGVtcFJ1bGVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBydWxlc0EgPSB0ZW1wUnVsZURhdGE7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJ1bGVzQS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChydWxlc0FbaV0udHlwZSAhPSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChydWxlc0FbaV0udHlwZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0hhdmVDYXJkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZW1wUnVsZS5wdXNoKHJ1bGVzQVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRlbXBSdWxlICYmIHRlbXBSdWxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlbGYuY29uZGl0aW9uTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGxheW91dENoaWxkID0gc2VsZi5sYXlvdXRfdGlYaWFuVGlwLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXlvdXRDaGlsZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxheW91dENoaWxkW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHNlbGYuaW1nX2ZyYW1lLmhlaWdodCA9IDk4MztcbiAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgc2VsZi5idG5fZ29QYXNzLnNjYWxlID0gMTtcbiAgICAgICAgICAgIGxldCBpc09rUnVsZXMgPSBmYWxzZTsgICAgICAgICAgLy/mmK/lkKblrozmiJDpnIDmsYIgICAgICAgICAgICBcblxuICAgICAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgICAgICAgICAgbGV0IHJ1bGVzID0gdGVtcFJ1bGU7XG4gICAgICAgICAgICBsZXQgb2tOdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBydWxlRGF0YSA9IHJ1bGVzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBsYWJsZVRpWGlhblRpcCA9IHNlbGYubGF5b3V0X3RpWGlhblRpcC5jaGlsZHJlbltpXTtcblxuICAgICAgICAgICAgICAgIGlmIChsYWJsZVRpWGlhblRpcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZURhdGEudXNlckN1cnJlbnRQcm9ncmVzcyA+PSBydWxlRGF0YS5kZW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmxlVGlYaWFuVGlwLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjNTA3OTAwXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFibGVUaVhpYW5UaXAuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChcIiNGMDBGMDBcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZURhdGEudHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJsZVRpWGlhblRpcC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDngq7loZTnrYnnuqfovr7liLAke3J1bGVEYXRhLmRlbWFuZH3nuqcoJHtydWxlRGF0YS51c2VyQ3VycmVudFByb2dyZXNzfS8ke3J1bGVEYXRhLmRlbWFuZH0pYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChydWxlRGF0YS50eXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmxlVGlYaWFuVGlwLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOmcgOe6ouWMhemHkeminSR7QXNzaXN0Q3RyLmNvbnZlcnROdW1iZXIocnVsZURhdGEuZGVtYW5kKX0oJHtBc3Npc3RDdHIuY29udmVydE51bWJlcihydWxlRGF0YS51c2VyQ3VycmVudFByb2dyZXNzKX0vJHtBc3Npc3RDdHIuY29udmVydE51bWJlcihydWxlRGF0YS5kZW1hbmQpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJ1bGVEYXRhLnR5cGUgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFibGVUaVhpYW5UaXAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg6ZyA5omT5Y2hJHtydWxlRGF0YS5kZW1hbmR95qyhLOW3suaJk+WNoSgke3J1bGVEYXRhLnVzZXJDdXJyZW50UHJvZ3Jlc3N9LyR7cnVsZURhdGEuZGVtYW5kfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJ1bGVEYXRhLnR5cGUgPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFibGVUaVhpYW5UaXAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg6ZyA57Sv6K6h5r+A5Yqx6KeG6aKR5oC75qyh5pWwJHtydWxlRGF0YS5kZW1hbmR95qyhKCR7cnVsZURhdGEudXNlckN1cnJlbnRQcm9ncmVzc30vJHtydWxlRGF0YS5kZW1hbmR9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGFibGVUaVhpYW5UaXAuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bGVEYXRhLnVzZXJDdXJyZW50UHJvZ3Jlc3MgPj0gcnVsZURhdGEuZGVtYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIG9rTnVtKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9rTnVtID49IHJ1bGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlzT2tSdWxlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc09rUnVsZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25kaXRpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2ZpbmlzaFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5idG5fZ29QYXNzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25kaXRpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2ZpbmlzaFwiKS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0hhdmVDYXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJTZWxlY3REYXRhLmNsb2NrSW5Ub2RheSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOW3suaJk+WNoWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCM3NTc1NzVgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuYnRuU3ByQXJyYXlbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBpbWdfaWNvbmApLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1clNlbGVjdERhdGEuY2xvY2tJblRvZGF5ID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDaGlsZEJ5TmFtZShgbGF5b3V0YCkuZ2V0Q2hpbGRCeU5hbWUoYGltZ19pY29uYCkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOWOu+WQiOaIkGA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCM1MDc5MDBgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuYnRuU3ByQXJyYXlbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyU2VsZWN0RGF0YS5jbG9ja0luVG9kYXkgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDaGlsZEJ5TmFtZShgbGF5b3V0YCkuZ2V0Q2hpbGRCeU5hbWUoYGltZ19pY29uYCkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBpbWdfaWNvbmApLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHNlbGYuYnRuX2dvUGFzcykucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKC40LCB7IHNjYWxlOiAxLjIgfSkudG8oLjQsIHsgc2NhbGU6IDEgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkuc3RhcnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5idG5fZ29QYXNzLmdldENoaWxkQnlOYW1lKGBsYXlvdXRgKS5nZXRDaGlsZEJ5TmFtZShgbGFibGVgKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDmiZPljaFgO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5idG5fZ29QYXNzLmdldENoaWxkQnlOYW1lKGBsYXlvdXRgKS5nZXRDaGlsZEJ5TmFtZShgbGFibGVgKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjNTA3OTAwYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLmJ0blNwckFycmF5WzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBpbWdfaWNvbmApLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOWOu+WQiOaIkGA7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYnRuX2dvUGFzcy5nZXRDaGlsZEJ5TmFtZShgbGF5b3V0YCkuZ2V0Q2hpbGRCeU5hbWUoYGxhYmxlYCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgIzUwNzkwMGApO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmJ0bl9nb1Bhc3MuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLmJ0blNwckFycmF5WzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuY29uZGl0aW9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuaW1nX2ZyYW1lLmhlaWdodCA9IDc4MDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNIYXZlQ2FyZCkge1xuICAgICAgICAgICAgaWYgKGN1clNlbGVjdERhdGEubWFyaykge1xuICAgICAgICAgICAgICAgIHNlbGYudGl4aWFuX3N0YXRlID0gYCR7Y3VyU2VsZWN0RGF0YS5hbW91bnR95omT5Y2h5Lu75YqhPCR7Y3VyU2VsZWN0RGF0YS5tYXJrfT5gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpeGlhbl9zdGF0ZSA9IGAke2N1clNlbGVjdERhdGEuYW1vdW50feaJk+WNoeS7u+WKoTzml6A+YFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGN1clNlbGVjdERhdGEubWFyaykge1xuICAgICAgICAgICAgICAgIHNlbGYudGl4aWFuX3N0YXRlID0gYCR7Y3VyU2VsZWN0RGF0YS5hbW91bnR95qGj5L2NPCR7Y3VyU2VsZWN0RGF0YS5tYXJrfT5gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpeGlhbl9zdGF0ZSA9IGAke2N1clNlbGVjdERhdGEuYW1vdW50feaho+S9jTzml6A+YFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzdHIxID0gdGhpcy5jaGVja0lzVGlYaWFuKGN1clNlbGVjdERhdGEpO1xuICAgICAgICBsZXQgc3RyMiA9IHRoaXMuY2hlY2tJc1RpWGlhbjIoKTtcbiAgICAgICAgaWYoc3RyMT09XCJcIiYmc3RyMj09XCJcIil7XG4gICAgICAgICAgICBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLmdldFdhbGxldE1vbmV5VmlkZW9dKXtcbiAgICAgICAgICAgICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLmdldFdhbGxldE1vbmV5VmlkZW8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNjLmVycm9yKFwi6YCJ5Lit55qE5oyJ6ZKuXCIsIGN1clNlbGVjdERhdGEpO1xuICAgIH1cblxuICAgIGNsaWNrT3BlblJ1bGUoKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuICAgICAgICB0aGlzLnJ1bGVWaWV3LmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDmj5DnjrDop4TliJlgLFxuICAgICAgICB9KVxuXG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIuaIkeeahOmSseWMhVwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLmj5DnjrDop4TliJlcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjbGlja0dldE1vbmV5KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIGxldCBjdXJTZWxlY3REYXRhID0gc2VsZi5jdXJTZWxlY3ROb2RlW2Ake3RoaXMuYnRuRGF0YVN0cn1gXTtcblxuICAgICAgICBpZiAoIXNlbGYuY3VyU2VsZWN0Tm9kZSB8fCAhY3VyU2VsZWN0RGF0YSkge1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuivt+mAieaLqeaPkOeOsOmHkeminVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxmLmN1clNlbGVjdE5vZGUgJiYgY3VyU2VsZWN0RGF0YSAmJiBzZWxmLnd4RGF0YSkge1xuICAgICAgICAgICAgbGV0IHN0cjEgPSB0aGlzLmNoZWNrSXNUaVhpYW4oY3VyU2VsZWN0RGF0YSk7XG4gICAgICAgICAgICBsZXQgc3RyMiA9IHRoaXMuY2hlY2tJc1RpWGlhbjIoKTtcbiAgICAgICAgICAgIGlmIChzdHIxICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHN0cjEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLmdldFdhbGxldE1vbmV5VmlkZW8sIChyZXMpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZih1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uZ2V0V2FsbGV0TW9uZXlWaWRlb10pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5nZXRXYWxsZXRNb25leVZpZGVvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHIyICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoc3RyMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuc2VuZENvaW5EYXRhKCgpPT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBYTVNESy5wb3N0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC53YWxsZXRfZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogY3VyU2VsZWN0RGF0YS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN1Y1ZpZXcuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxhYmxlX3N1Y1RpcC5zdHJpbmcgPSBg5L2g55qE5o+Q546w5bey55Sz6K+35oiQ5Yqf77yM56iN5ZCO5Y+v5Zyo5b6u5L+hXFxu5p+l55yL5piv5ZCm6L2s6LSm5oiQ5Yqf44CCYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmluaXREYXRhKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRDb2luKC1jdXJTZWxlY3REYXRhLnBvaW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vR2FtZUluZm8udXNlR29sZChwYXJzZUludChjdXJTZWxlY3REYXRhLmFtb3VudCkgKiBHYW1lSW5mby5nZXRDaGFuZ2VSYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFwcGx5X2Zvcl93aXRoZHJhd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2Ftb3VudDogTnVtYmVyKGN1clNlbGVjdERhdGEuYW1vdW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25fc3RhdHVzOiBg5oiQ5YqfYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2xldmVsOiBOdW1iZXIoY3VyU2VsZWN0RGF0YS5hbW91bnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc19zYXRpc2Z5X2NvbmRpdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya1N0cjogY3VyU2VsZWN0RGF0YS5tYXJrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOaPkOeOsOeUs+ivt+aIkOWKn2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHIgPSBgJHtyZXMubWVzc2FnZX1gO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFwcGx5X2Zvcl93aXRoZHJhd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2Ftb3VudDogTnVtYmVyKGN1clNlbGVjdERhdGEuYW1vdW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25fc3RhdHVzOiBg5aSx6LSlYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbHVyZV9jYXVzZTogYCR7cmVzLm1lc3NhZ2V9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2xldmVsOiBOdW1iZXIoY3VyU2VsZWN0RGF0YS5hbW91bnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc19zYXRpc2Z5X2NvbmRpdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtTdHI6IGN1clNlbGVjdERhdGEubWFyayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGYubGFibGVfdGlwTmVlZFBhc3Muc3RyaW5nID0gYCR7c3RyfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VsZi50aXBGcmFtZVZpZXcuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHN0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5hcHBseV9mb3Jfd2l0aGRyYXdhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbnNfYW1vdW50OiBOdW1iZXIoY3VyU2VsZWN0RGF0YS5hbW91bnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25fc3RhdHVzOiBg5aSx6LSlYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWx1cmVfY2F1c2U6IGDmiJDlip/mj5DnjrDmv4DlirHop4bpopHml6DlrozmlbTmkq3mlL5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2xldmVsOiBOdW1iZXIoY3VyU2VsZWN0RGF0YS5hbW91bnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNfc2F0aXNmeV9jb25kaXRpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya1N0cjogY3VyU2VsZWN0RGF0YS5tYXJrLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFzZWxmLnd4RGF0YSkge1xuICAgICAgICAgICAgc2VsZi5jbGlja0JhbmdEaW5nd3goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrSXNUaVhpYW4oY3VyU2VsZWN0RGF0YTogY2FzaE1hcCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XG4gICAgICAgIGxldCBydWxlcyA9IHNlbGYudGVtcFJ1bGVzO1xuICAgICAgICBsZXQgdGVtcFJ1bGUyOiBBcnJheTxydWxlPiA9IFtdO1xuXG4gICAgICAgIGlmIChydWxlcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChydWxlc1tpXS50eXBlICE9IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcFJ1bGUyLnB1c2gocnVsZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vL+inhOWImeexu+Wei++8jDEt54Ku5aGU562J57qnMi3nuqLljIXph5Hpop0zLeaJk+WNoeaAu+asoeaVsDQt57Sv6K6h5r+A5Yqx6KeG6aKR5oC75qyh5pWwNS3liY3nva7ku7vliqFcbiAgICAgICAgaWYgKHN0ciA9PSBcIlwiKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jb25kaXRpb25Ob2RlLmFjdGl2ZSAmJiAhc2VsZi5jb25kaXRpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2ZpbmlzaFwiKS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGVtcFJ1bGUyICYmIHRlbXBSdWxlMi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcFJ1bGUyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcnVsZURhdGEgPSB0ZW1wUnVsZTJbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZURhdGEudXNlckN1cnJlbnRQcm9ncmVzcyA8IHJ1bGVEYXRhLmRlbWFuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydWxlRGF0YS50eXBlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gYOeCruWhlOetiee6p+WIsCR7cnVsZURhdGEuZGVtYW5kfee6p+WPr+aPkOeOsGA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJ1bGVEYXRhLnR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbC51c2VyRGF0YS5jb2luIDwgY3VyU2VsZWN0RGF0YS5wb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1ckdvbGQgPSBwYXJzZUludChjdXJTZWxlY3REYXRhLmFtb3VudCkgLSBwYXJzZUludCh1dGlsLmZpbmRHb2xkQ2FzaCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJHb2xkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gYOWGjei1miR7Y3VyR29sZH3lhYPlsLHog73mj5DnjrDllaYhYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGDlho3otZoke2N1clNlbGVjdERhdGEuYW1vdW50feWFg+WwseiDveaPkOeOsOWVpiFgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFja01nci5hcHBseV9mb3Jfd2l0aGRyYXdhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2Ftb3VudDogTnVtYmVyKGN1clNlbGVjdERhdGEuYW1vdW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbl9zdGF0dXM6IGDlpLHotKVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWx1cmVfY2F1c2U6IFwi6YeR5biB5pWw5LiN6LazXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25zX2xldmVsOiBOdW1iZXIoY3VyU2VsZWN0RGF0YS5hbW91bnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzX3NhdGlzZnlfY29uZGl0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrU3RyOiBjdXJTZWxlY3REYXRhLm1hcmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJ1bGVEYXRhLnR5cGUgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBg6L+Y6ZyA5omT5Y2hJHtydWxlRGF0YS5kZW1hbmQgLSBydWxlRGF0YS51c2VyQ3VycmVudFByb2dyZXNzfeWkqSFgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChydWxlRGF0YS50eXBlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gYOi/mOmcgOe0r+enr+eci+inhumikSR7cnVsZURhdGEuZGVtYW5kIC0gcnVsZURhdGEudXNlckN1cnJlbnRQcm9ncmVzc33mrKEhYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBjaGVja0lzVGlYaWFuMigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc3RyID0gXCJcIjtcbiAgICAgICAgbGV0IHJ1bGVzID0gc2VsZi50ZW1wUnVsZXM7XG4gICAgICAgIGxldCB0ZW1wUnVsZTE6IEFycmF5PHJ1bGU+ID0gW107XG5cbiAgICAgICAgaWYgKHJ1bGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJ1bGVzW2ldLnR5cGUgPT0gNSkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wUnVsZTEucHVzaChydWxlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbGVjdEJ0bkNoaWxkMSA9IHRoaXMuc2VsZWN0TGF5b3V0LmNoaWxkcmVuO1xuICAgICAgICBsZXQgc2VsZWN0QnRuQ2hpbGQyID0gdGhpcy5zZWxlY3RMYXlvdXQyLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBSdWxlMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRhcmdldElkID0gdGVtcFJ1bGUxW2ldLmRlbWFuZDtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2VsZWN0QnRuQ2hpbGQxLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdEJ0bkNoaWxkMVtqXSAmJiBzZWxlY3RCdG5DaGlsZDFbal1bYCR7dGhpcy5idG5EYXRhU3RyfWBdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBidG5EYXRhOiBjYXNoTWFwID0gc2VsZWN0QnRuQ2hpbGQxW2pdW2Ake3RoaXMuYnRuRGF0YVN0cn1gXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ0bkRhdGEuaWQgPT0gdGFyZ2V0SWQgJiYgYnRuRGF0YS5oYXNXaXRoZHJhdyA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnRuRGF0YS5tYXJrICYmIGJ0bkRhdGEubWFyayAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gYOivt+WFiOaPkOeOsCR7YnRuRGF0YS5tYXJrfSR7YnRuRGF0YS5hbW91bnR95YWDYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGDor7flhYjmj5DnjrAke2J0bkRhdGEuYW1vdW50feWFg2A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0ciA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWxlY3RCdG5DaGlsZDIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdEJ0bkNoaWxkMltqXSAmJiBzZWxlY3RCdG5DaGlsZDJbal1bYCR7dGhpcy5idG5EYXRhU3RyfWBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnRuRGF0YTogY2FzaE1hcCA9IHNlbGVjdEJ0bkNoaWxkMltqXVtgJHt0aGlzLmJ0bkRhdGFTdHJ9YF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnRuRGF0YS5pZCA9PSB0YXJnZXRJZCAmJiBidG5EYXRhLmhhc1dpdGhkcmF3ID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnRuRGF0YS5tYXJrICYmIGJ0bkRhdGEubWFyayAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGDor7flhYjmj5DnjrAke2J0bkRhdGEubWFya30ke2J0bkRhdGEuYW1vdW50feWFg2A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBg6K+35YWI5o+Q546wJHtidG5EYXRhLmFtb3VudH3lhYNgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgY2xpY2tPcGVuUmVjb3JkKCkge1xuICAgICAgICAvLyBVSUZ1bmMub3BlblVJKEFjdGl2aXR5UGFubmVsTmFtZS5QYW5uZWxXYWxsZXRSZWNvcmQsIChub2RlLCBzY3JpcHQpID0+IHtcblxuICAgICAgICAvLyB9KVxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICBUcmFja01nci5BcHBWaWV3U2NyZWVuKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIuaPkOeOsOiusOW9lVwiXG4gICAgICAgIH0pXG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi5oiR55qE6ZKx5YyFXCIsXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBcIuaPkOeOsOiusOW9lVwiLFxuICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiaWNvblwiLFxuICAgICAgICB9KVxuXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbiwgcGFnZVRzLnBhZ2VOYW1lLkdhbWVXYWxsZXRSZWNvcmQpO1xuICAgIH1cblxuICAgIGNsaWNrQmFuZ0Rpbmd3eCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBYTVNESy5hdXRoV2VjaGF0KCk7XG4gICAgfVxuXG4gICAgY2xpY2tDbG9zZSgpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJbnNlcnQpIHtcbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5XYWxsZXRBd2FyZEluc2VydCwgKCkgPT4geyBjb25zb2xlLmxvZyhcIuWFs+mXreaPkOeOsOWlluWKseaPkuWxj+W5v+WRiuaSreaUvuWujOaIkFwiKSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5o+Q546w5oiQ5YqfLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgY2xpY2tDbG9zZVN1Y1RpcCgpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuc3VjVmlldy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDmj5DnjrDnlLPor7fmiJDlip9gLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaIkeefpemBk+S6hlwiLFxuICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6IFwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL+aPkOeOsOinhOWImS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGNsaWNrQ2xvc2VSdWxlKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5ydWxlVmlldy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDmj5DnjrDop4TliJlgLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaIkeefpemBk+S6hlwiXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy/mj5DnjrDmj5DnpLotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBjbGlja0dvUGFzcygpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGxldCBjdXJTZWxlY3REYXRhOiBjYXNoTWFwID0gdGhpcy5jdXJTZWxlY3ROb2RlW2Ake3RoaXMuYnRuRGF0YVN0cn1gXTtcbiAgICAgICAgbGV0IHJ1bGVzID0gdGhpcy50ZW1wUnVsZXM7XG4gICAgICAgIGxldCBjbG9ja0luRGF5cyA9IDA7XG4gICAgICAgIGlmIChydWxlcyAmJiBydWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJ1bGVzW2ldLnR5cGUgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICBjbG9ja0luRGF5cyA9IHJ1bGVzW2ldLnVzZXJDdXJyZW50UHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v6KeE5YiZ57G75Z6L77yMMS3ngq7loZTnrYnnuqcyLee6ouWMhemHkeminTMt5omT5Y2h5oC75qyh5pWwNC3ntK/orqHmv4DlirHop4bpopHmgLvmrKHmlbA1LeWJjee9ruS7u+WKoVxuXG4gICAgICAgIGxldCBidG5TdHIgPSB0aGlzLmJ0bl9nb1Bhc3MuZ2V0Q2hpbGRCeU5hbWUoYGxheW91dGApLmdldENoaWxkQnlOYW1lKGBsYWJsZWApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nO1xuICAgICAgICBpZiAoYnRuU3RyID09IFwi5omT5Y2hXCIpIHtcbiAgICAgICAgICAgIGlmIChjdXJTZWxlY3REYXRhLmNsb2NrSW5Ub2RheSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuYWN0aXZpdHlfZ2V0TW9uZXkoe1xuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogYOeCueWHu+aJk+WNoWAsXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbl9oY2RnMTogYOaJk+WNoWAsXG4gICAgICAgICAgICAgICAgICAgIHRpeGlhbl9zdGF0ZTogdGhpcy50aXhpYW5fc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIGRha2FfZGF5czogYOesrCR7Y2xvY2tJbkRheXN95aSpYCxcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kRGFDYXJkKGN1clNlbGVjdERhdGEudHlwZSwgY2xvY2tJbkRheXMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBUcmFja01nci5hY3Rpdml0eV9nZXRNb25leSh7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBg54K55Ye75omT5Y2hYCxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uX2hjZGcxOiBg6KeG6aKR5omT5Y2hYCxcbiAgICAgICAgICAgICAgICAgICAgdGl4aWFuX3N0YXRlOiB0aGlzLnRpeGlhbl9zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgZGFrYV9kYXlzOiBg56ysJHtjbG9ja0luRGF5c33lpKlgLFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24ud2FsbGV0Q2FyZFZpZGVvLCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZERhQ2FyZChjdXJTZWxlY3REYXRhLnR5cGUsIGNsb2NrSW5EYXlzKVxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGJ0blN0ciA9PSBcIuW3suaJk+WNoVwiKSB7XG4gICAgICAgICAgICBUcmFja01nci5hY3Rpdml0eV9nZXRNb25leSh7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDngrnlh7vmiZPljaFgLFxuICAgICAgICAgICAgICAgIGJ1dHRvbl9oY2RnMTogYOW3suaJk+WNoWAsXG4gICAgICAgICAgICAgICAgdGl4aWFuX3N0YXRlOiB0aGlzLnRpeGlhbl9zdGF0ZSxcbiAgICAgICAgICAgICAgICBkYWthX2RheXM6IGDnrKwke2Nsb2NrSW5EYXlzfeWkqWAsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChg5LuK5pel5bey5omT5Y2hLOaYjuaXpeWGjeadpX5gKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGJ0blN0ciA9PSBcIuWOu+WQiOaIkFwiKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VuZERhQ2FyZCh0eXBlOiBudW1iZXIsIGNsb2NrSW5EYXlzKSB7XG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC52aWRlb0NhcmRPayxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjYXNoT3V0VHlwZTogdHlwZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLmFjdGl2aXR5X2dldE1vbmV5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBg5omT5Y2h6L+H56iLYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbl9oY2RnMTogYOaJk+WNoWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXhpYW5fc3RhdGU6IHRoaXMudGl4aWFuX3N0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bF9jbG9ja19pbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRha2FfZGF5czogYOesrCR7Y2xvY2tJbkRheXN95aSpYCxcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKGDmiZPljaHmiJDlip9gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuYWN0aXZpdHlfZ2V0TW9uZXkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDmiZPljaHov4fnqItgLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uX2hjZGcxOiBg5omT5Y2hYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpeGlhbl9zdGF0ZTogdGhpcy50aXhpYW5fc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzZnVsX2Nsb2NrX2luOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRha2FfZGF5czogYOesrCR7Y2xvY2tJbkRheXN95aSpYCxcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHJlcy5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjbGlja0Nsb3NlVGlwKCkge1xuICAgICAgICB0aGlzLnRpcEZyYW1lVmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBudW0g5pWw6YePXG4gICAgICogQHBhcmFtIHBvcyDkvY3nva5cbiAgICAgKi9cbiAgICBjcmVhdGVOdW0obnVtOm51bWJlcil7XG4gICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSB0aGlzLndhbGxldFBvb2wuY3JlYXRlRW5lbXkodGhpcy5hZGRDb2luQm94KTtcbiAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5hZGRDb2luQm94KTtcbiAgICAgICAgaXRlbS5zZXRQb3NpdGlvbigwLDApO1xuICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgaXRlbS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICBpdGVtLmNoaWxkcmVuWzFdJiYoaXRlbS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiK1wiKyBudW0pO1xuICAgICAgICBpdGVtLnNjYWxlID0gMS4xO1xuICAgICAgICBjYy50d2VlbihpdGVtKS5wYXJhbGxlbChcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkuYnkoLjUse3k6ODR9KSxcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkuZGVsYXkoLjI1KS50byguMjUse29wYWNpdHk6MH0pXG4gICAgICAgICkuY2FsbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy53YWxsZXRQb29sLm9uRW5lbXlLaWxsZWQoaXRlbSk7XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgfVxuXG59XG4iXX0=