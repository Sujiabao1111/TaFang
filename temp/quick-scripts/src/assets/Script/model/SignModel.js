"use strict";
cc._RF.push(module, '60bf0sxzRNKdreiYGghy+qb', 'SignModel');
// Script/model/SignModel.ts

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
var propPacakgeName = ["", "开局道具包", "局内道具包"];
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PageSignReward = /** @class */ (function (_super) {
    __extends(PageSignReward, _super);
    function PageSignReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.img_single = null;
        _this.img_double = null;
        _this.lable_reward = null;
        _this.lable_propNum = null;
        _this.bg_image_list = [];
        _this.img_frame = null;
        _this.day_label = null;
        _this.check_node = null;
        _this.img_signMask = null;
        _this.day = null;
        _this.data = null;
        _this.isPropPackage = null;
        _this.rewardList = null;
        _this.showDouble = null;
        _this.hasGain = null;
        _this.isCurrent = null;
        _this.isSeven = null;
        _this.isNewGain = null;
        return _this;
    }
    PageSignReward.prototype.init = function (data) {
        this.day = data.day;
        this.data = data;
        this.isPropPackage = data.isPropPackage;
        this.rewardList = data.rewardList;
        this.showDouble = data.showDouble;
        this.hasGain = data.hasGain;
        this.isCurrent = data.isCurrent;
        this.isSeven = data.day == 7;
        this.day_label.string = this.day;
        //this.img_prop.node.opacity = this.hasGain ? 153 : 255
        this.updateUI();
    };
    PageSignReward.prototype.updateIsNewGain = function () {
        this.isNewGain = true;
    };
    PageSignReward.prototype.updateUI = function () {
        if (this.img_single && this.img_double) {
            this.img_single.active = false;
            this.img_double.active = false;
        }
        if (this.rewardList && this.rewardList[0]) {
            var item = this.rewardList[0];
            var isPoint = false;
            if (this.isPropPackage) {
                this.lable_reward.string = propPacakgeName[this.isPropPackage];
                //this.img_prop.spriteFrame = this.pacakge_image_list[this.isPropPackage]
                this.lable_propNum.string = this.showDouble ? "x2" : "";
                this.lable_propNum.node.active = Number(this.lable_propNum.string) > 1;
                this.lable_reward.fontSize = this.day == 7 ? 28 : 20;
            }
            else {
                if (!this.isSeven && this.day != 3) {
                    // AssistCtr.findPropSprite(item.type, item.keyId, (spr)=>{
                    //     this.img_prop.spriteFrame = spr;
                    // })
                }
                var reward_prop_text = "";
                if (item.type == 1) {
                    reward_prop_text = this.showDouble ? item.rewardPlusValue : item.rewardValue;
                    reward_prop_text = Number(reward_prop_text) > 1 ? "x" + reward_prop_text : "";
                    this.lable_propNum.string = reward_prop_text;
                    this.lable_reward.fontSize = 20;
                }
                else {
                    if (this.day != 3 && this.day != 7) {
                        this.lable_reward.string = this.showDouble ? item.rewardPlusValue : item.rewardValue;
                    }
                    else {
                        var gold = this.showDouble ? item.rewardPlusValue : item.rewardValue;
                        // this.lable_reward.string = `${gold/util.userData.exchangeRate}元`;     
                        this.lable_reward.string = gold;
                    }
                    if (this.isSeven || this.day == 3) {
                        //this.lable_reward.string = `${parseInt(this.lable_reward.string) / GameInfo.getChangeRate()}元`;
                    }
                    this.lable_reward.fontSize = 28;
                    this.lable_propNum.string = reward_prop_text;
                    isPoint = true;
                }
            }
            var reward_prop_color = this.isCurrent && !this.hasGain ? new cc.Color(83, 158, 13, 255) : new cc.Color(197, 102, 0, 255);
            var tempColor = new cc.Color();
            if (this.isCurrent && !this.hasGain) {
                this.lable_reward.node.color = tempColor.fromHEX("#E50000");
            }
            else {
                this.lable_reward.node.color = tempColor.fromHEX("#E6682A");
            }
            if (this.isSeven) {
                if (!this.hasGain && !this.isCurrent) {
                    reward_prop_color = new cc.Color(68, 130, 245, 255);
                }
            }
            if (this.lable_reward) {
                this.lable_reward.node.active = true;
                if (!this.isSeven) {
                    //this.lable_reward.getComponent(cc.LabelOutline).color = reward_color;
                }
            }
            if (this.lable_propNum) {
                this.lable_propNum.node.active = !isPoint;
                this.lable_propNum.getComponent(cc.LabelOutline).color = reward_prop_color;
            }
            // if (this.data.userPeriod >= 1 && (this.isSeven || this.day == 3)) {
            //     this.lable_reward.string = "红包币";                   
            // }
        }
        if (this.img_single && this.img_double && this.day != 3) {
            if (this.showDouble) {
                this.img_double.active = true;
                //this.img_double.opacity = this.hasGain ? 153 : 255
                this.img_single.active = false;
            }
            else {
                this.img_double.active = false;
                this.img_single.active = true;
                //this.img_single.opacity = this.hasGain ? 153 : 255
            }
        }
        this.check_node.active = this.hasGain;
        if (this.hasGain) {
            if (this.isNewGain) {
                this.isNewGain = false;
                this.check_node.active = true;
            }
            //this.node.opacity = 204;
            this.img_signMask.active = true;
        }
        else {
            this.check_node.active = false;
            //this.node.opacity = 255;
            this.img_signMask.active = false;
        }
        if (this.img_frame && !this.isSeven) {
            var key = this.hasGain ? 2 : this.isCurrent ? 1 : 0;
            if (key == 2) {
                this.img_frame.node.opacity = 204;
            }
            else {
                this.img_frame.node.opacity = 255;
            }
            if (this.hasGain) {
                this.img_frame.spriteFrame = this.bg_image_list[1];
            }
            else {
                this.img_frame.spriteFrame = this.bg_image_list[key];
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], PageSignReward.prototype, "img_single", void 0);
    __decorate([
        property(cc.Node)
    ], PageSignReward.prototype, "img_double", void 0);
    __decorate([
        property(cc.Label)
    ], PageSignReward.prototype, "lable_reward", void 0);
    __decorate([
        property(cc.Label)
    ], PageSignReward.prototype, "lable_propNum", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PageSignReward.prototype, "bg_image_list", void 0);
    __decorate([
        property(cc.Sprite)
    ], PageSignReward.prototype, "img_frame", void 0);
    __decorate([
        property(cc.Label)
    ], PageSignReward.prototype, "day_label", void 0);
    __decorate([
        property(cc.Node)
    ], PageSignReward.prototype, "check_node", void 0);
    __decorate([
        property(cc.Node)
    ], PageSignReward.prototype, "img_signMask", void 0);
    PageSignReward = __decorate([
        ccclass
    ], PageSignReward);
    return PageSignReward;
}(cc.Component));
exports.default = PageSignReward;
;

cc._RF.pop();