
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameTuJian.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8f32eaRlIBCSIxkm136CUSi', 'gameTuJian');
// Script/pop/gameTuJian.ts

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
var baseTs_1 = require("../base/baseTs");
var jsonSingleton_1 = require("../base/jsonSingleton");
var NameTs_1 = require("../common/NameTs");
var scrollTs_1 = require("../common/scrollTs");
var tuJianItem_1 = require("../game/tuJian/tuJianItem");
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
        _this.onceEnter = false; //是否初次进入
        _this.curClickTurretTujian = null; //当前选中的炮塔
        _this.curClickTurretData = null; //当前选中的炮塔信息
        _this.curClickMonsterTujian = null; //当前选中的怪兽
        _this.curClickMonsterData = null; //当前选中的怪兽信息
        _this.tabData = null;
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
    gameTuJian = __decorate([
        ccclass
    ], gameTuJian);
    return gameTuJian;
}(baseTs_1.default));
exports.default = gameTuJian;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUdUppYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBQ3BDLHVEQUFrRDtBQUNsRCwyQ0FBc0M7QUFFdEMsK0NBQTBDO0FBQzFDLHdEQUFtRDtBQUduRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBR3RDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFNO0lBQTlDO1FBQUEscUVBNFdDO1FBeldHLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLG9CQUFjLEdBQWMsSUFBSSxDQUFDO1FBR2pDLDBCQUFvQixHQUFZLElBQUksQ0FBQztRQUdyQyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQTBCLEVBQUUsQ0FBQztRQUdoQyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFHakMsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFHL0IsaUJBQVcsR0FBa0IsSUFBSSxDQUFDO1FBR2xDLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFHakMscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFHakMsMEJBQW9CLEdBQWEsSUFBSSxDQUFDO1FBR3RDLDBCQUFvQixHQUFhLElBQUksQ0FBQztRQUd0Qyx5QkFBbUIsR0FBYSxJQUFJLENBQUM7UUFHckMsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFJeEMsZUFBUyxH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aW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IGpzb25TaW5nbGV0b24gZnJvbSBcIi4uL2Jhc2UvanNvblNpbmdsZXRvblwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcclxuaW1wb3J0IHNjcm9sbFRzIGZyb20gXCIuLi9jb21tb24vc2Nyb2xsVHNcIjtcclxuaW1wb3J0IHR1Smlhbkl0ZW0gZnJvbSBcIi4uL2dhbWUvdHVKaWFuL3R1Smlhbkl0ZW1cIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XHJcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lVHVKaWFuIGV4dGVuZHMgYmFzZVRzIHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgaW1hZ2Vfc2hvd0ltZzogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgaW1hZ2Vfc2hvd0ltZzI6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpbWFnZV9wcm9wZXJ0eUZyYW1lMjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0YWJfdHVycmV0OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRhYl9tb25zdGVyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG5vVGFiTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoYXZlVGFiTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgdGFiU3ByQXJyYXk6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIueCruWhlGNvbnRlbnRcIiB9KVxyXG4gICAgcHJpdmF0ZSB0dXJyZXRDb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TY3JvbGxWaWV3LCBkaXNwbGF5TmFtZTogXCLngq7loZTmu5rliqjmoI9cIiB9KVxyXG4gICAgcHJpdmF0ZSB0dXJyZXRWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLmgKrlhb1jb250ZW50XCIgfSlcclxuICAgIHByaXZhdGUgbW9uc3RlckNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNjcm9sbFZpZXcsIGRpc3BsYXlOYW1lOiBcIuaAquWFvea7muWKqOagj1wiIH0pXHJcbiAgICBwcml2YXRlIG1vbnN0ZXJWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIGRpc3BsYXlOYW1lOiBcIkl0ZW1cIiB9KVxyXG4gICAgcHJpdmF0ZSB0dXJyZXRJdGVtOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLlm77pibTlkI3lrZdcIiB9KVxyXG4gICAgcHJpdmF0ZSBsYWJsZV9uYW1lOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuWbvumJtOetiee6p1wiIH0pXHJcbiAgICBwcml2YXRlIGxhYmxlX2x2OiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuWbvumJtOWxnuaApzFcIiB9KVxyXG4gICAgcHJpdmF0ZSBsYWJsZV9wcm9wZXJ0eTE6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5Zu+6Ym05bGe5oCnMlwiIH0pXHJcbiAgICBwcml2YXRlIGxhYmxlX3Byb3BlcnR5MjogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLlm77pibTmoIfpopgxXCIgfSlcclxuICAgIHByaXZhdGUgbGFibGVfcHJvcGVydHlUaXRsZTE6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5Zu+6Ym05qCH6aKYMlwiIH0pXHJcbiAgICBwcml2YXRlIGxhYmxlX3Byb3BlcnR5VGl0bGUyOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuaPj+i/sOagh+mimFwiIH0pXHJcbiAgICBwcml2YXRlIGxhYmxlX2Rlc2NyaWJlVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5o+P6L+wXCIgfSlcclxuICAgIHByaXZhdGUgbGFibGVfZGVzY3JpYmU6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcblxyXG5cclxuICAgIG9uY2VFbnRlciA9IGZhbHNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5Yid5qyh6L+b5YWlXHJcblxyXG4gICAgY3VyQ2xpY2tUdXJyZXRUdWppYW46IHR1Smlhbkl0ZW0gPSBudWxsOyAgICAgICAgLy/lvZPliY3pgInkuK3nmoTngq7loZRcclxuICAgIGN1ckNsaWNrVHVycmV0RGF0YSA9IG51bGw7ICAgICAgICAgICAgICAgICAgICAgIC8v5b2T5YmN6YCJ5Lit55qE54Ku5aGU5L+h5oGvXHJcblxyXG4gICAgY3VyQ2xpY2tNb25zdGVyVHVqaWFuOiB0dUppYW5JdGVtID0gbnVsbDsgICAgICAgLy/lvZPliY3pgInkuK3nmoTmgKrlhb1cclxuICAgIGN1ckNsaWNrTW9uc3RlckRhdGEgPSBudWxsOyAgICAgICAgICAgICAgICAgICAgIC8v5b2T5YmN6YCJ5Lit55qE5oCq5YW95L+h5oGvXHJcblxyXG4gICAgdGFiRGF0YSA9IG51bGw7XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25jZUVudGVyKSB7ICAgICAgICAgICAgICAgICAvL+S4jeaYr+WIneasoei/m+WFpeS4jemcgOimgeWIt+aWsOWbvumJtOS/oeaBr1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1haW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbmNlRW50ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWbvumJtOW8ueeql1wiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCB0dXJyZXREYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMudHVycmV0RGF0YSk7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJEYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMubW9uc3RlckRhdGEpO1xyXG5cclxuICAgICAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgdHVycmV0RGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBwcmUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnR1cnJldEl0ZW0pO1xyXG4gICAgICAgIC8vICAgICBwcmUuZ2V0Q29tcG9uZW50KHR1Smlhbkl0ZW0pLmluaXQodHVycmV0RGF0YVtpXSk7XHJcbiAgICAgICAgLy8gICAgIHByZS5wYXJlbnQgPSB0aGlzLnR1cnJldENvbnRlbnQ7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IG1vbnN0ZXJEYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAvLyAgICAgbGV0IHByZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudHVycmV0SXRlbSk7XHJcbiAgICAgICAgLy8gICAgIHByZS5nZXRDb21wb25lbnQodHVKaWFuSXRlbSkuaW5pdChtb25zdGVyRGF0YVtpXSk7XHJcbiAgICAgICAgLy8gICAgIHByZS5wYXJlbnQgPSB0aGlzLm1vbnN0ZXJDb250ZW50O1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gbGV0IGFhYSA9IE1hdGgubWF4KHR1cnJldERhdGEubGVuZ3RoLCBtb25zdGVyRGF0YS5sZW5ndGgpO1xyXG4gICAgICAgIC8vIGxldCBtYXhEYXRhTnVtID0gTWF0aC5jZWlsKE1hdGgubWF4KHR1cnJldERhdGEubGVuZ3RoLCBtb25zdGVyRGF0YS5sZW5ndGgpIC8gNCk7XHJcbiAgICAgICAgLy8gaWYobWF4RGF0YU51bSA9PSAwKXtcclxuICAgICAgICAvLyAgICAgbWF4RGF0YU51bSA9IDE7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBsZXQgbWF4SGVpZ2h0ID0gKDE0MS42ICogMikgKiBtYXhEYXRhTnVtICsgdGhpcy50dXJyZXRDb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnNwYWNpbmdZO1xyXG4gICAgICAgIC8vIHRoaXMudHVycmV0Q29udGVudC5oZWlnaHQgPSBtYXhIZWlnaHQ7XHJcbiAgICAgICAgLy8gdGhpcy5tb25zdGVyQ29udGVudC5oZWlnaHQgPSBtYXhIZWlnaHQ7XHJcbiAgICAgICAgLy8gY2MuZXJyb3IoXCJhYWFcIiwgYWFhLCBtYXhEYXRhTnVtLCBtYXhIZWlnaHQpO1xyXG5cclxuICAgICAgICBuZXcgc2Nyb2xsVHModGhpcy50dXJyZXRDb250ZW50LCB0aGlzLnR1cnJldFZpZXcsIHRoaXMudHVycmV0SXRlbSwgdHVycmV0RGF0YSk7XHJcbiAgICAgICAgbmV3IHNjcm9sbFRzKHRoaXMubW9uc3RlckNvbnRlbnQsIHRoaXMubW9uc3RlclZpZXcsIHRoaXMudHVycmV0SXRlbSwgbW9uc3RlckRhdGEpO1xyXG5cclxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1R1Smlhbl9VcERhdGEsIHRoaXMudXBkYXRlVHVKaWFuLCB0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmNsaWNrVGFiKG51bGwsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ2xvc2UoKSB7XHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDlm77pibTlvLnnqpdgLFxyXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5YWz6ZetXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcclxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZSBcclxuICAgICAqIEBwYXJhbSBkYXRhIDEu6Ziy5b6h5aGUIDIu5oCq5YW9XHJcbiAgICAgKi9cclxuICAgIGNsaWNrVGFiKGUsIGRhdGEpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xyXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YSA9PSAxICYmIHNlbGYudGFiRGF0YSAhPSAxKSB7XHJcbiAgICAgICAgICAgIHNlbGYudGFiX3R1cnJldC55ICs9IDExO1xyXG4gICAgICAgICAgICBzZWxmLnRhYl9tb25zdGVyLnkgLT0gMTE7XHJcbiAgICAgICAgICAgIHNlbGYudGFiX3R1cnJldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGFiU3ByQXJyYXlbMV07XHJcbiAgICAgICAgICAgIHNlbGYudGFiX3R1cnJldC5nZXRDaGlsZEJ5TmFtZShcImxhYmxlXCIpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCNGRkZGRkZgKTtcclxuICAgICAgICAgICAgc2VsZi50YWJfdHVycmV0LmdldENoaWxkQnlOYW1lKFwibGFibGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgI0JCNDIwRWApO1xyXG5cclxuICAgICAgICAgICAgc2VsZi50YWJfbW9uc3Rlci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGFiU3ByQXJyYXlbMF07XHJcbiAgICAgICAgICAgIHNlbGYudGFiX21vbnN0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZVwiKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjRkZDNDk4YCk7XHJcbiAgICAgICAgICAgIHNlbGYudGFiX21vbnN0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjOTQyQzAwYCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnR1cnJldFZpZXcubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLm1vbnN0ZXJWaWV3Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmN1ckNsaWNrVHVycmV0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVUdUppYW4oc2VsZi5jdXJDbGlja1R1cnJldERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR1cnJldENvbnRlbnQgPSB0aGlzLnR1cnJldENvbnRlbnQuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICBpZiAodHVycmV0Q29udGVudCAmJiB0dXJyZXRDb250ZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0dXJyZXRDb250ZW50WzBdLmdldENvbXBvbmVudCh0dUppYW5JdGVtKS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLnRhYl9tb25zdGVyLnBhcmVudCA9IHRoaXMubm9UYWJOb2RlO1xyXG4gICAgICAgICAgICBzZWxmLnRhYl90dXJyZXQucGFyZW50ID0gdGhpcy5oYXZlVGFiTm9kZTtcclxuXHJcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOWbvumJtOW8ueeql2AsXHJcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi54Ku5aGUXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YSA9PSAyICYmIHNlbGYudGFiRGF0YSAhPSAyKSB7XHJcbiAgICAgICAgICAgIHNlbGYudGFiX3R1cnJldC55IC09IDExO1xyXG4gICAgICAgICAgICBzZWxmLnRhYl9tb25zdGVyLnkgKz0gMTE7XHJcbiAgICAgICAgICAgIHNlbGYudGFiX3R1cnJldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGFiU3ByQXJyYXlbMF07XHJcbiAgICAgICAgICAgIHNlbGYudGFiX3R1cnJldC5nZXRDaGlsZEJ5TmFtZShcImxhYmxlXCIpLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCNGRkM0OThgKTtcclxuICAgICAgICAgICAgc2VsZi50YWJfdHVycmV0LmdldENoaWxkQnlOYW1lKFwibGFibGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChgIzk0MkMwMGApO1xyXG5cclxuICAgICAgICAgICAgc2VsZi50YWJfbW9uc3Rlci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGFiU3ByQXJyYXlbMV07XHJcbiAgICAgICAgICAgIHNlbGYudGFiX21vbnN0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZVwiKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjRkZGRkZGYCk7XHJcbiAgICAgICAgICAgIHNlbGYudGFiX21vbnN0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjQkI0MjBFYCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnR1cnJldFZpZXcubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2VsZi5tb25zdGVyVmlldy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmN1ckNsaWNrTW9uc3RlckRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlVHVKaWFuKHNlbGYuY3VyQ2xpY2tNb25zdGVyRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlckNvbnRlbnQgPSB0aGlzLm1vbnN0ZXJDb250ZW50LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJDb250ZW50ICYmIG1vbnN0ZXJDb250ZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29udGVudFswXS5nZXRDb21wb25lbnQodHVKaWFuSXRlbSkuY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi50YWJfbW9uc3Rlci5wYXJlbnQgPSB0aGlzLmhhdmVUYWJOb2RlO1xyXG4gICAgICAgICAgICBzZWxmLnRhYl90dXJyZXQucGFyZW50ID0gdGhpcy5ub1RhYk5vZGU7XHJcblxyXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDlm77pibTlvLnnqpdgLFxyXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaAqueJqVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYudGFiRGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVHVKaWFuKGluZm8pIHtcclxuICAgICAgICBpZiAoaW5mbykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGluZm8uZGF0YTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldDogdHVKaWFuSXRlbSA9IGluZm8udGFyZ2V0OyAgICAvL+mUgeWumuW9k+WJjeeCueWHu+ahhlxyXG4gICAgICAgICAgICBpZiAoZGF0YS53YWxrQ2QpIHsgICAgICAgIC8v5oCq5YW9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb3BlcnR5VGl0bGUxLnN0cmluZyA9IGDpgJ8gICDluqY6YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfcHJvcGVydHkxLnN0cmluZyA9IGAke2RhdGEuc3BlZWR9YDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxhYmxlX3Byb3BlcnR5VGl0bGUyLnN0cmluZyA9IGDooYAgICDph486YDtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubGFibGVfcHJvcGVydHkyLnN0cmluZyA9IGAke2RhdGEuaHB9YDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb3BlcnR5VGl0bGUyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb3BlcnR5Mi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZV9wcm9wZXJ0eUZyYW1lMi5hY3RpdmUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyQ2xpY2tNb25zdGVyVHVqaWFuKSB7ICAgICAgICAgICAgICAgIC8v5Y+W5raI5b2T5YmN6YCJ5Lit5qGG54q25oCBXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJDbGlja01vbnN0ZXJUdWppYW4uc2V0Q2xpQ2tTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckNsaWNrTW9uc3RlclR1amlhbiA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyQ2xpY2tNb25zdGVyRGF0YSA9IGluZm87XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2UoTnVtYmVyKGRhdGEuc3ByaXRlKSwgMiwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2Vfc2hvd0ltZy5zcHJpdGVGcmFtZSA9IHJlcztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX2Rlc2NyaWJlVGl0bGUuc3RyaW5nID0gYOaAquWFveivtOaYjmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgIC8v54Ku5aGUXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb3BlcnR5VGl0bGUxLnN0cmluZyA9IGDmlLsgICDpgJ86YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfcHJvcGVydHlUaXRsZTIuc3RyaW5nID0gYOaUu+WHu+WKmzpgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9wcm9wZXJ0eTEuc3RyaW5nID0gYCR7ZGF0YS5zcGVlZH3lj5Ev56eSYDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfcHJvcGVydHkyLnN0cmluZyA9IGAke2RhdGEuYXRrfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9wcm9wZXJ0eVRpdGxlMi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb3BlcnR5Mi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlX3Byb3BlcnR5RnJhbWUyLmFjdGl2ZSA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1ckNsaWNrVHVycmV0VHVqaWFuKSB7ICAgICAgICAgICAgICAgIC8v5Y+W5raI5b2T5YmN6YCJ5Lit5qGG54q25oCBXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJDbGlja1R1cnJldFR1amlhbi5zZXRDbGlDa1N0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyQ2xpY2tUdXJyZXRUdWppYW4gPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckNsaWNrVHVycmV0RGF0YSA9IGluZm87XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQW55KGRhdGEuYm9keSwgY2MuU3ByaXRlRnJhbWUsIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlX3Nob3dJbWcuc3ByaXRlRnJhbWUgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7IGlmICh0aGlzLm5vZGUpIHRoaXMubm9kZS5kZXN0cm95KCk7IH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQW55KGRhdGEuZm9vdCwgY2MuU3ByaXRlRnJhbWUsIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLnNwcml0ZUZyYW1lID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUpIHRoaXMuaW1hZ2Vfc2hvd0ltZzIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2Vfc2hvd0ltZzIubm9kZS54ID0gTnVtYmVyKGRhdGEuVHVqaWFuWCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUueSA9IE51bWJlcihkYXRhLlR1amlhblkpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKEFzc2lzdEN0ci5jaGVja1R1SmlhbihkYXRhLmxldmVsKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuaW1hZ2Vfc2hvd0ltZzIubm9kZS54ID0gLTIxNC42MztcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUueSA9IDg1O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChkYXRhLmxldmVsID09IDUpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9zaG93SW1nMi5ub2RlLnkgPSA4NztcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZiAoZGF0YS5sZXZlbCA9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vIHRoaXMuaW1hZ2Vfc2hvd0ltZzIubm9kZS54ID0gLTIxNTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy8gdGhpcy5pbWFnZV9zaG93SW1nMi5ub2RlLnkgPSA4MjtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZihkYXRhLmxldmVsID09IDE3KXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9zaG93SW1nMi5ub2RlLnkgPSA4MjtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9ICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZiAoZGF0YS5sZXZlbCA9PSAyMikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUueSA9IDg4O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIGlmKGRhdGEubGV2ZWwgPT0gMjkpeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUueSA9IDgxO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGVsc2UgaWYgKGRhdGEubGV2ZWwgPT0gMzApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9zaG93SW1nMi5ub2RlLnggPSAtMjEyO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUueSA9IDg2O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIGlmKGRhdGEubGV2ZWwgPT0gMzgpeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUueSA9IDY4O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5pbWFnZV9zaG93SW1nMi5ub2RlLnggPSAtMjE0O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuaW1hZ2Vfc2hvd0ltZzIubm9kZS55ID0gNDI7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYoQXNzaXN0Q3RyLmNoZWNrVHVKaWFuKGRhdGEubGV2ZWwpKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueCA9IDA7IFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS55ID0gMDtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZihkYXRhLmxldmVsID09IDUpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueSA9IC0yO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIGlmKGRhdGEubGV2ZWwgPT0gOSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS54ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS55ID0gLTM7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZihkYXRhLmxldmVsID09IDE3KXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAtMztcclxuICAgICAgICAgICAgICAgIC8vICAgICB9ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGVsc2UgaWYoZGF0YS5sZXZlbCA9PSAzMCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS54ID0gMjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAxO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0gXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZihkYXRhLmxldmVsID09IDI5KXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAtNDtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9ICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZihkYXRhLmxldmVsID09IDM4KXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAtMTc7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAtMjY7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYoQXNzaXN0Q3RyLmNoZWNrVHVKaWFuKGRhdGEubGV2ZWwpKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUueSA9IDg1O1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUueSA9IDQwO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlX3Nob3dJbWcyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX2Rlc2NyaWJlVGl0bGUuc3RyaW5nID0gYOeCruWhlOivtOaYjmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9kZXNjcmliZS5zdHJpbmcgPSBkYXRhLmRlc2NyaWJlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX25hbWUuc3RyaW5nID0gZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX2x2LnN0cmluZyA9IGBMdiR7ZGF0YS5sZXZlbH1gO1xyXG5cclxuICAgICAgICAgICAgdGFyZ2V0LnNldENsaUNrU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1haW4oKSB7XHJcbiAgICAgICAgbGV0IHR1cnJldENvbnRlbnQgPSB0aGlzLnR1cnJldENvbnRlbnQuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0dXJyZXRDb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR1cnJldENvbnRlbnRbaV0uZ2V0Q29tcG9uZW50KHR1Smlhbkl0ZW0pLnVwZGF0ZURhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgbW9uc3RlckNvbnRlbnQgPSB0aGlzLm1vbnN0ZXJDb250ZW50LmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9uc3RlckNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbW9uc3RlckNvbnRlbnRbaV0uZ2V0Q29tcG9uZW50KHR1Smlhbkl0ZW0pLnVwZGF0ZURhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=