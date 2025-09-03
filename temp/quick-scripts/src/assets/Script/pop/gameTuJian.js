"use strict";
cc._RF.push(module, '8f32eaRlIBCSIxkm136CUSi', 'gameTuJian');
// Script/pop/gameTuJian.ts

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
var jsonSingleton_1 = require("../base/jsonSingleton");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var scrollTs_1 = require("../common/scrollTs");
var tuJianItem_1 = require("../game/tuJian/tuJianItem");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameTuJian = /** @class */ (function (_super) {
    __extends(gameTuJian, _super);
    function gameTuJian() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.image_showImg = null;
        _this.image_showImg2 = null;
        _this.image_propertyFrame2 = null;
        _this.tab_turret = null;
        _this.tab_monster = null;
        _this.noTabNode = null;
        _this.haveTabNode = null;
        _this.tabSprArray = [];
        _this.turretContent = null;
        _this.turretView = null;
        _this.monsterContent = null;
        _this.monsterView = null;
        _this.turretItem = null;
        _this.lable_name = null;
        _this.lable_lv = null;
        _this.lable_property1 = null;
        _this.lable_property2 = null;
        _this.lable_propertyTitle1 = null;
        _this.lable_propertyTitle2 = null;
        _this.lable_describeTitle = null;
        _this.lable_describe = null;
        _this.kingTaskItem = null;
        _this.onceEnter = false; //是否初次进入
        _this.curClickTurretTujian = null; //当前选中的炮塔
        _this.curClickTurretData = null; //当前选中的炮塔信息
        _this.curClickMonsterTujian = null; //当前选中的怪兽
        _this.curClickMonsterData = null; //当前选中的怪兽信息
        _this.tabData = null;
        _this.kingItemData = null;
        return _this;
    }
    gameTuJian.prototype.onEnable = function () {
        if (this.onceEnter) { //不是初次进入不需要刷新图鉴信息
            this.updateMain();
        }
        this.onceEnter = true;
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "图鉴弹窗"
        });
        this.updatekingData();
    };
    gameTuJian.prototype.onLoad = function () {
        var turretData = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.turretData);
        var monsterData = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.monsterData);
        // for(let i = 0; i < turretData.length; i++){
        //     let pre = cc.instantiate(this.turretItem);
        //     pre.getComponent(tuJianItem).init(turretData[i]);
        //     pre.parent = this.turretContent;
        // }
        // for(let i = 0; i < monsterData.length; i++){
        //     let pre = cc.instantiate(this.turretItem);
        //     pre.getComponent(tuJianItem).init(monsterData[i]);
        //     pre.parent = this.monsterContent;
        // }
        // let aaa = Math.max(turretData.length, monsterData.length);
        // let maxDataNum = Math.ceil(Math.max(turretData.length, monsterData.length) / 4);
        // if(maxDataNum == 0){
        //     maxDataNum = 1;
        // }
        // let maxHeight = (141.6 * 2) * maxDataNum + this.turretContent.getComponent(cc.Layout).spacingY;
        // this.turretContent.height = maxHeight;
        // this.monsterContent.height = maxHeight;
        // cc.error("aaa", aaa, maxDataNum, maxHeight);
        new scrollTs_1.default(this.turretContent, this.turretView, this.turretItem, turretData);
        new scrollTs_1.default(this.monsterContent, this.monsterView, this.turretItem, monsterData);
        cc.game.on(NameTs_1.default.Game_TuJian_UpData, this.updateTuJian, this);
        cc.game.on(NameTs_1.default.Game_KingPaoTask_Update, this.updatekingData, this);
    };
    gameTuJian.prototype.updatekingData = function () {
        var _this = this;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.kingPaoTaskData,
            onSuccess: function (res) {
                if (res.code === 0 && res.data) {
                    if (!_this.isValid) {
                        return;
                    }
                    if (!_this || !_this.kingTaskItem) {
                        return;
                    }
                    var data = res.data;
                    var itemData = data.taskList[0];
                    _this.kingItemData = itemData;
                    var strNum = (itemData.process / itemData.processTarget) * 100;
                    var y = String(strNum).indexOf(".") + 1; //获取小数点的位置                    
                    if (y > 0) {
                        strNum = Number(strNum.toFixed(2));
                    }
                    _this.kingTaskItem.getChildByName("lable_kindProgress").getComponent(cc.RichText).string = "<color=#FFFFFF>" + itemData.title + ":</c><color=#FCFF15>" + strNum + "%</color>";
                    var process = (itemData.process / itemData.processTarget);
                    if (process >= 1) {
                        process = 1;
                    }
                    var proGressWidth = (_this.kingTaskItem.getChildByName("rectNode").width - 7) * process;
                    if (proGressWidth > 1 && proGressWidth < 25) {
                        proGressWidth = 25;
                    }
                    _this.kingTaskItem.getChildByName("rectNode").getChildByName("progressNode").width = proGressWidth;
                    _this.kingTaskItem.active = true;
                    if (itemData.achieve == 1) {
                        _this.kingTaskItem.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = "\u5151\u6362";
                    }
                    else if (itemData.achieve == 2) {
                        _this.kingTaskItem.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = "\u5DF2\u5151\u6362";
                    }
                    else {
                        _this.kingTaskItem.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = data.turretKingRedEnvelopeDetailDTO.bonusPerCapita + "\u5143";
                    }
                }
                else {
                    _this.kingTaskItem.active = false;
                }
            },
            onFail: function (err) {
            }
        });
    };
    gameTuJian.prototype.start = function () {
        this.clickTab(null, 1);
    };
    gameTuJian.prototype.clickClose = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u56FE\u9274\u5F39\u7A97",
            ck_module: "关闭"
        });
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    /**
     *
     * @param e
     * @param data 1.防御塔 2.怪兽
     */
    gameTuJian.prototype.clickTab = function (e, data) {
        var self = this;
        var tempColor = new cc.Color();
        soundController_1.default.singleton.clickAudio();
        if (data == 1 && self.tabData != 1) {
            self.tab_turret.y += 11;
            self.tab_monster.y -= 11;
            self.tab_turret.getComponent(cc.Sprite).spriteFrame = this.tabSprArray[1];
            self.tab_turret.getChildByName("lable").color = tempColor.fromHEX("#FFFFFF");
            self.tab_turret.getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#BB420E");
            self.tab_monster.getComponent(cc.Sprite).spriteFrame = this.tabSprArray[0];
            self.tab_monster.getChildByName("lable").color = tempColor.fromHEX("#FFC498");
            self.tab_monster.getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#942C00");
            self.turretView.node.active = true;
            self.monsterView.node.active = false;
            if (self.curClickTurretData) {
                self.updateTuJian(self.curClickTurretData);
            }
            else {
                var turretContent = this.turretContent.children;
                if (turretContent && turretContent.length > 0) {
                    turretContent[0].getComponent(tuJianItem_1.default).click();
                }
            }
            self.tab_monster.parent = this.noTabNode;
            self.tab_turret.parent = this.haveTabNode;
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "\u56FE\u9274\u5F39\u7A97",
                ck_module: "炮塔"
            });
        }
        else if (data == 2 && self.tabData != 2) {
            self.tab_turret.y -= 11;
            self.tab_monster.y += 11;
            self.tab_turret.getComponent(cc.Sprite).spriteFrame = this.tabSprArray[0];
            self.tab_turret.getChildByName("lable").color = tempColor.fromHEX("#FFC498");
            self.tab_turret.getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#942C00");
            self.tab_monster.getComponent(cc.Sprite).spriteFrame = this.tabSprArray[1];
            self.tab_monster.getChildByName("lable").color = tempColor.fromHEX("#FFFFFF");
            self.tab_monster.getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX("#BB420E");
            self.turretView.node.active = false;
            self.monsterView.node.active = true;
            if (self.curClickMonsterData) {
                self.updateTuJian(self.curClickMonsterData);
            }
            else {
                var monsterContent = this.monsterContent.children;
                if (monsterContent && monsterContent.length > 0) {
                    monsterContent[0].getComponent(tuJianItem_1.default).click();
                }
            }
            self.tab_monster.parent = this.haveTabNode;
            self.tab_turret.parent = this.noTabNode;
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "\u56FE\u9274\u5F39\u7A97",
                ck_module: "怪物"
            });
        }
        self.tabData = data;
    };
    gameTuJian.prototype.updateTuJian = function (info) {
        var _this = this;
        if (info) {
            var data = info.data;
            var target = info.target; //锁定当前点击框
            if (data.walkCd) { //怪兽
                this.lable_propertyTitle1.string = "\u901F   \u5EA6:";
                this.lable_property1.string = "" + data.speed;
                // this.lable_propertyTitle2.string = `血   量:`;
                // this.lable_property2.string = `${data.hp}`;                
                this.lable_propertyTitle2.node.active = false;
                this.lable_property2.node.active = false;
                this.image_propertyFrame2.active = false;
                if (this.curClickMonsterTujian) { //取消当前选中框状态
                    this.curClickMonsterTujian.setCliCkState(false);
                }
                this.curClickMonsterTujian = target;
                this.curClickMonsterData = info;
                this.loadImage(Number(data.sprite), 2, function (res) {
                    _this.image_showImg.spriteFrame = res;
                });
                this.image_showImg2.node.active = false;
                this.lable_describeTitle.string = "\u602A\u517D\u8BF4\u660E";
            }
            else { //炮塔
                this.lable_propertyTitle1.string = "\u653B   \u901F:";
                this.lable_propertyTitle2.string = "\u653B\u51FB\u529B:";
                this.lable_property1.string = data.speed + "\u53D1/\u79D2";
                this.lable_property2.string = "" + data.atk;
                this.lable_propertyTitle2.node.active = true;
                this.lable_property2.node.active = true;
                this.image_propertyFrame2.active = true;
                if (this.curClickTurretTujian) { //取消当前选中框状态
                    this.curClickTurretTujian.setCliCkState(false);
                }
                this.curClickTurretTujian = target;
                this.curClickTurretData = info;
                this.loadAny(data.body, cc.SpriteFrame, function (res) {
                    _this.image_showImg.spriteFrame = res;
                }, function () { if (_this.node)
                    _this.node.destroy(); });
                this.loadAny(data.foot, cc.SpriteFrame, function (res) {
                    _this.image_showImg2.spriteFrame = res;
                }, function () {
                    if (_this.node)
                        _this.image_showImg2.spriteFrame = null;
                });
                this.image_showImg2.node.x = Number(data.TujianX);
                this.image_showImg2.node.y = Number(data.TujianY);
                // if (AssistCtr.checkTuJian(data.level)) {
                //     this.image_showImg2.node.x = -214.63;
                //     this.image_showImg2.node.y = 85;
                //     if (data.level == 5) {
                //         this.image_showImg2.node.y = 87;
                //     }
                //     else if (data.level == 9) {
                //         // this.image_showImg2.node.x = -215;
                //         // this.image_showImg2.node.y = 82;
                //     }
                //     else if(data.level == 17){                        
                //         this.image_showImg2.node.y = 82;
                //     }   
                //     else if (data.level == 22) {
                //         this.image_showImg2.node.y = 88;
                //     }
                //     else if(data.level == 29){                        
                //         this.image_showImg2.node.y = 81;
                //     }  
                //     else if (data.level == 30) {
                //         this.image_showImg2.node.x = -212;
                //         this.image_showImg2.node.y = 86;
                //     }
                //     else if(data.level == 38){                        
                //         this.image_showImg2.node.y = 68;
                //     }  
                // }
                // else {
                //     this.image_showImg2.node.x = -214;
                //     this.image_showImg2.node.y = 42;
                // }
                // if(AssistCtr.checkTuJian(data.level)){
                //     this.image_icon2.node.x = 0; 
                //     this.image_icon2.node.y = 0;
                //     if(data.level == 5){
                //         this.image_icon2.node.y = -2;
                //     }
                //     else if(data.level == 9){
                //         this.image_icon2.node.x = -1;
                //         this.image_icon2.node.y = -3;
                //     }  
                //     else if(data.level == 17){                        
                //         this.image_icon2.node.y = -3;
                //     }       
                //     else if(data.level == 30){
                //         this.image_icon2.node.x = 2;
                //         this.image_icon2.node.y = 1;
                //     } 
                //     else if(data.level == 29){                        
                //         this.image_icon2.node.y = -4;
                //     }   
                //     else if(data.level == 38){                        
                //         this.image_icon2.node.y = -17;
                //     }                         
                // }
                // else{
                //     this.image_icon2.node.y = -26;
                // }
                // if(AssistCtr.checkTuJian(data.level)){
                //     this.image_showImg2.node.y = 85;
                // }
                // else{
                //     this.image_showImg2.node.y = 40;
                // }
                this.image_showImg2.node.active = true;
                this.lable_describeTitle.string = "\u70AE\u5854\u8BF4\u660E";
            }
            this.lable_describe.string = data.describe;
            this.lable_name.string = data.name;
            this.lable_lv.string = "Lv" + data.level;
            target.setCliCkState(true);
        }
    };
    gameTuJian.prototype.updateMain = function () {
        var turretContent = this.turretContent.children;
        for (var i = 0; i < turretContent.length; i++) {
            turretContent[i].getComponent(tuJianItem_1.default).updateData();
        }
        var monsterContent = this.monsterContent.children;
        for (var i = 0; i < monsterContent.length; i++) {
            monsterContent[i].getComponent(tuJianItem_1.default).updateData();
        }
    };
    gameTuJian.prototype.clickOpenKingPaoProgress = function () {
        var _this = this;
        if (this.kingItemData) {
            if (this.kingItemData.achieve == 1) {
                XMSDK_1.default.post({
                    url: UrlConst_1.UrlConst.kingPaoGet,
                    data: {
                        id: this.kingItemData.id
                    },
                    onSuccess: function (res) {
                        if (!_this.isValid) {
                            return;
                        }
                        if (res.code === 0) {
                            AssistCtr_1.AssistCtr.showToastTip("\u5151\u6362\u6210\u529F\uFF0C\u4EBA\u5DE5\u5BA1\u6838\u4E2D");
                            _this.kingItemData.achieve = 2;
                            _this.kingTaskItem.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = "\u5DF2\u5151\u6362";
                        }
                        else {
                            if (res) {
                                AssistCtr_1.AssistCtr.showToastTip(res.message);
                            }
                        }
                    },
                    onFail: function (err) {
                    }
                });
            }
            else if (this.kingItemData.achieve == 2) {
                AssistCtr_1.AssistCtr.showToastTip("\u5DF2\u5151\u6362");
            }
            else {
                cc.game.emit(NameTs_1.default.Game_Pop_Open, {
                    name: pageTs_1.default.pageName.GameKingPaoProgress,
                    data: {
                        clickTarget: 1,
                        progress: this.kingItemData.process + "/" + this.kingItemData.processTarget
                    },
                });
            }
        }
        else {
            cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameKingPaoProgress);
        }
    };
    __decorate([
        property(cc.Sprite)
    ], gameTuJian.prototype, "image_showImg", void 0);
    __decorate([
        property(cc.Sprite)
    ], gameTuJian.prototype, "image_showImg2", void 0);
    __decorate([
        property(cc.Node)
    ], gameTuJian.prototype, "image_propertyFrame2", void 0);
    __decorate([
        property(cc.Node)
    ], gameTuJian.prototype, "tab_turret", void 0);
    __decorate([
        property(cc.Node)
    ], gameTuJian.prototype, "tab_monster", void 0);
    __decorate([
        property(cc.Node)
    ], gameTuJian.prototype, "noTabNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameTuJian.prototype, "haveTabNode", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], gameTuJian.prototype, "tabSprArray", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "炮塔content" })
    ], gameTuJian.prototype, "turretContent", void 0);
    __decorate([
        property({ type: cc.ScrollView, displayName: "炮塔滚动栏" })
    ], gameTuJian.prototype, "turretView", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "怪兽content" })
    ], gameTuJian.prototype, "monsterContent", void 0);
    __decorate([
        property({ type: cc.ScrollView, displayName: "怪兽滚动栏" })
    ], gameTuJian.prototype, "monsterView", void 0);
    __decorate([
        property({ type: cc.Prefab, displayName: "Item" })
    ], gameTuJian.prototype, "turretItem", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "图鉴名字" })
    ], gameTuJian.prototype, "lable_name", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "图鉴等级" })
    ], gameTuJian.prototype, "lable_lv", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "图鉴属性1" })
    ], gameTuJian.prototype, "lable_property1", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "图鉴属性2" })
    ], gameTuJian.prototype, "lable_property2", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "图鉴标题1" })
    ], gameTuJian.prototype, "lable_propertyTitle1", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "图鉴标题2" })
    ], gameTuJian.prototype, "lable_propertyTitle2", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "描述标题" })
    ], gameTuJian.prototype, "lable_describeTitle", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "描述" })
    ], gameTuJian.prototype, "lable_describe", void 0);
    __decorate([
        property(cc.Node)
    ], gameTuJian.prototype, "kingTaskItem", void 0);
    gameTuJian = __decorate([
        ccclass
    ], gameTuJian);
    return gameTuJian;
}(baseTs_1.default));
exports.default = gameTuJian;

cc._RF.pop();