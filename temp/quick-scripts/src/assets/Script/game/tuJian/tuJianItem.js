"use strict";
cc._RF.push(module, '5b94a3yrlFNsrUHI2K2AYdD', 'tuJianItem');
// Script/game/tuJian/tuJianItem.ts

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
var baseTs_1 = require("../../base/baseTs");
var NameTs_1 = require("../../common/NameTs");
var TrackMgr_1 = require("../../TrackMgr/TrackMgr");
var util_1 = require("../../util/util");
// export interface signData {
//     list: Array<signItemData>   //每日签到奖励列表
//     signDays: number	        //签到天数
//     todayChecked: boolean,	    //今日已签到
//     userPeriod: number,	        //用户期数
// }
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var tuJianItem = /** @class */ (function (_super) {
    __extends(tuJianItem, _super);
    function tuJianItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.image_icon = null;
        _this.image_icon2 = null;
        _this.image_frame = null;
        _this.frameSprArray = [];
        _this.haveNode = null;
        _this.noHaveNode = null;
        _this.turret = null;
        _this.monster = null;
        _this.lable_lv = null;
        _this.lable_name = null;
        return _this;
    }
    tuJianItem.prototype.start = function () {
    };
    tuJianItem.prototype.onLoad = function () {
    };
    tuJianItem.prototype.init = function (data) {
        if (data && data.data) {
            this.initData = data.data;
            this.node.zIndex = data.id;
            this.updateData();
        }
        else {
            this.node.destroy();
        }
    };
    tuJianItem.prototype.updateData = function () {
        var _this = this;
        var data = this.initData;
        if (data.walkCd) { //怪兽
            this.haveNode.active = true;
            this.noHaveNode.active = false;
            this.loadImage(Number(data.sprite), 2, function (res) {
                if (_this.image_icon)
                    _this.image_icon.spriteFrame = res;
            }, function () { if (_this.node)
                _this.node.destroy(); });
            this.image_icon2.node.active = false;
        }
        else { //炮塔
            var curLv = util_1.default.userData.turretLevel;
            if (curLv >= parseInt(this.initData.level)) {
                this.haveNode.active = true;
                this.noHaveNode.active = false;
                this.loadAny(data.body, cc.SpriteFrame, function (res) {
                    if (_this.image_icon)
                        _this.image_icon.spriteFrame = res;
                }, function () { if (_this.node)
                    _this.node.destroy(); });
                //this.image_icon2.node.active = false;
                this.loadAny(data.foot, cc.SpriteFrame, function (res) {
                    if (_this.image_icon2)
                        _this.image_icon2.spriteFrame = res;
                }, function () {
                    if (_this.node)
                        _this.image_icon2.spriteFrame = null;
                });
                this.image_icon2.node.x = Number(data.TujianItemX);
                this.image_icon2.node.y = Number(data.TujianItemY);
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
            }
            else {
                this.haveNode.active = false;
                this.noHaveNode.active = true;
                this.turret.active = true;
                this.monster.active = false;
            }
        }
        this.lable_lv.string = "Lv" + data.level;
        this.lable_name.string = "" + data.name;
    };
    /**
     * 点击
     */
    tuJianItem.prototype.click = function () {
        if (this.haveNode.active) {
            TrackMgr_1.default.AppClick({
                app_page_title: "图鉴",
                app_ck_module: "炮王进度",
                app_exposure_type: "Icon",
            });
            cc.game.emit(NameTs_1.default.Game_TuJian_UpData, {
                target: this,
                data: this.initData
            });
        }
    };
    /**
     * 设置点击状态
     */
    tuJianItem.prototype.setCliCkState = function (state) {
        if (this.haveNode.active) {
            var tempColor = new cc.Color();
            if (state) {
                this.lable_lv.node.color = tempColor.fromHEX("#FEE6B7");
                this.lable_name.node.color = tempColor.fromHEX("#FEE6B7");
            }
            else {
                this.lable_lv.node.color = tempColor.fromHEX("#BB420E");
                this.lable_name.node.color = tempColor.fromHEX("#BB420E");
            }
            this.image_frame.spriteFrame = state ? this.frameSprArray[1] : this.frameSprArray[0];
        }
    };
    __decorate([
        property({ type: cc.Sprite, displayName: "图鉴icon" })
    ], tuJianItem.prototype, "image_icon", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "图鉴icon2" })
    ], tuJianItem.prototype, "image_icon2", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "图鉴框" })
    ], tuJianItem.prototype, "image_frame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], tuJianItem.prototype, "frameSprArray", void 0);
    __decorate([
        property(cc.Node)
    ], tuJianItem.prototype, "haveNode", void 0);
    __decorate([
        property(cc.Node)
    ], tuJianItem.prototype, "noHaveNode", void 0);
    __decorate([
        property(cc.Node)
    ], tuJianItem.prototype, "turret", void 0);
    __decorate([
        property(cc.Node)
    ], tuJianItem.prototype, "monster", void 0);
    __decorate([
        property(cc.Label)
    ], tuJianItem.prototype, "lable_lv", void 0);
    __decorate([
        property(cc.Label)
    ], tuJianItem.prototype, "lable_name", void 0);
    tuJianItem = __decorate([
        ccclass
    ], tuJianItem);
    return tuJianItem;
}(baseTs_1.default));
exports.default = tuJianItem;

cc._RF.pop();