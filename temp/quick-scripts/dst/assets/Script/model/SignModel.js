
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/model/SignModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxtb2RlbFxcU2lnbk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQUksZUFBZSxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUV0QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQXdMQztRQXJMRyxnQkFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixtQkFBYSxHQUF5QixFQUFFLENBQUM7UUFHekMsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRzFCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRTVCLFNBQUcsR0FBRyxJQUFJLENBQUM7UUFDWCxVQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osbUJBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsYUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGVBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsYUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGVBQVMsR0FBRyxJQUFJLENBQUM7O0lBbUpyQixDQUFDO0lBakpHLDZCQUFJLEdBQUosVUFBSyxJQUFJO1FBQ0wsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxh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VyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEQ7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4RDtTQUNKO0lBQ0wsQ0FBQztJQXBMRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNXO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7eURBQ2dCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ087SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ1U7SUEzQlgsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXdMbEM7SUFBRCxxQkFBQztDQXhMRCxBQXdMQyxDQXhMMkMsRUFBRSxDQUFDLFNBQVMsR0F3THZEO2tCQXhMb0IsY0FBYztBQXdMbEMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxubGV0IHByb3BQYWNha2dlTmFtZSA9IFtcIlwiLCBcIuW8gOWxgOmBk+WFt+WMhVwiLCBcIuWxgOWGhemBk+WFt+WMhVwiXVxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZVNpZ25SZXdhcmQgZXh0ZW5kcyBjYy5Db21wb25lbnR7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBpbWdfc2luZ2xlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaW1nX2RvdWJsZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfcmV3YXJkOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9wcm9wTnVtOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBiZ19pbWFnZV9saXN0OkFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpbWdfZnJhbWU6Y2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkYXlfbGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2hlY2tfbm9kZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGltZ19zaWduTWFzazpjYy5Ob2RlID0gbnVsbDtcblxuICAgIGRheSA9IG51bGw7XG4gICAgZGF0YSA9IG51bGw7XG4gICAgaXNQcm9wUGFja2FnZSA9IG51bGw7XG4gICAgcmV3YXJkTGlzdCA9IG51bGw7XG4gICAgc2hvd0RvdWJsZSA9IG51bGw7XG4gICAgaGFzR2FpbiA9IG51bGw7XG4gICAgaXNDdXJyZW50ID0gbnVsbDtcbiAgICBpc1NldmVuID0gbnVsbDsgICAgXG4gICAgaXNOZXdHYWluID0gbnVsbDtcblxuICAgIGluaXQoZGF0YSkge1xuICAgICAgICB0aGlzLmRheSA9IGRhdGEuZGF5XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICAgICAgdGhpcy5pc1Byb3BQYWNrYWdlID0gZGF0YS5pc1Byb3BQYWNrYWdlXG4gICAgICAgIHRoaXMucmV3YXJkTGlzdCA9IGRhdGEucmV3YXJkTGlzdFxuICAgICAgICB0aGlzLnNob3dEb3VibGUgPSBkYXRhLnNob3dEb3VibGVcbiAgICAgICAgdGhpcy5oYXNHYWluID0gZGF0YS5oYXNHYWluXG4gICAgICAgIHRoaXMuaXNDdXJyZW50ID0gZGF0YS5pc0N1cnJlbnRcbiAgICAgICAgdGhpcy5pc1NldmVuID0gZGF0YS5kYXkgPT0gNyAgICAgICAgXG4gICAgICAgIHRoaXMuZGF5X2xhYmVsLnN0cmluZyA9IHRoaXMuZGF5OyBcbiAgICAgICAgLy90aGlzLmltZ19wcm9wLm5vZGUub3BhY2l0eSA9IHRoaXMuaGFzR2FpbiA/IDE1MyA6IDI1NVxuICAgICAgICB0aGlzLnVwZGF0ZVVJKClcbiAgICB9XG5cbiAgICB1cGRhdGVJc05ld0dhaW4oKSB7XG4gICAgICAgIHRoaXMuaXNOZXdHYWluID0gdHJ1ZVxuICAgIH1cblxuICAgIHVwZGF0ZVVJKCkgeyAgICAgXG4gICAgICAgIGlmKHRoaXMuaW1nX3NpbmdsZSAmJiB0aGlzLmltZ19kb3VibGUpe1xuICAgICAgICAgICAgdGhpcy5pbWdfc2luZ2xlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbWdfZG91YmxlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmV3YXJkTGlzdCAmJiB0aGlzLnJld2FyZExpc3RbMF0pIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5yZXdhcmRMaXN0WzBdXG4gICAgICAgICAgICBsZXQgaXNQb2ludCA9IGZhbHNlXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Byb3BQYWNrYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZXdhcmQuc3RyaW5nID0gcHJvcFBhY2FrZ2VOYW1lW3RoaXMuaXNQcm9wUGFja2FnZV1cbiAgICAgICAgICAgICAgICAvL3RoaXMuaW1nX3Byb3Auc3ByaXRlRnJhbWUgPSB0aGlzLnBhY2FrZ2VfaW1hZ2VfbGlzdFt0aGlzLmlzUHJvcFBhY2thZ2VdXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9wcm9wTnVtLnN0cmluZyA9IHRoaXMuc2hvd0RvdWJsZSA/IFwieDJcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb3BOdW0ubm9kZS5hY3RpdmUgPSBOdW1iZXIodGhpcy5sYWJsZV9wcm9wTnVtLnN0cmluZykgPiAxXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZXdhcmQuZm9udFNpemUgPSB0aGlzLmRheSA9PSA3ID8gMjggOiAyMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNTZXZlbiAmJiB0aGlzLmRheSAhPSAzKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzaXN0Q3RyLmZpbmRQcm9wU3ByaXRlKGl0ZW0udHlwZSwgaXRlbS5rZXlJZCwgKHNwcik9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuaW1nX3Byb3Auc3ByaXRlRnJhbWUgPSBzcHI7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZXdhcmRfcHJvcF90ZXh0ID0gXCJcIlxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXdhcmRfcHJvcF90ZXh0ID0gdGhpcy5zaG93RG91YmxlID8gaXRlbS5yZXdhcmRQbHVzVmFsdWUgOiBpdGVtLnJld2FyZFZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZF9wcm9wX3RleHQgPSBOdW1iZXIocmV3YXJkX3Byb3BfdGV4dCkgPiAxID8gXCJ4XCIgKyByZXdhcmRfcHJvcF90ZXh0IDogXCJcIiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFibGVfcHJvcE51bS5zdHJpbmcgPSByZXdhcmRfcHJvcF90ZXh0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFibGVfcmV3YXJkLmZvbnRTaXplID0gMjBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRheSAhPSAzICYmIHRoaXMuZGF5ICE9IDcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZXdhcmQuc3RyaW5nID0gdGhpcy5zaG93RG91YmxlID8gaXRlbS5yZXdhcmRQbHVzVmFsdWUgOiBpdGVtLnJld2FyZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnb2xkID0gdGhpcy5zaG93RG91YmxlID8gaXRlbS5yZXdhcmRQbHVzVmFsdWUgOiBpdGVtLnJld2FyZFZhbHVlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubGFibGVfcmV3YXJkLnN0cmluZyA9IGAke2dvbGQvdXRpbC51c2VyRGF0YS5leGNoYW5nZVJhdGV95YWDYDsgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZXdhcmQuc3RyaW5nID0gZ29sZDsgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNTZXZlbiB8fCB0aGlzLmRheSA9PSAzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5sYWJsZV9yZXdhcmQuc3RyaW5nID0gYCR7cGFyc2VJbnQodGhpcy5sYWJsZV9yZXdhcmQuc3RyaW5nKSAvIEdhbWVJbmZvLmdldENoYW5nZVJhdGUoKX3lhYNgO1xuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZXdhcmQuZm9udFNpemUgPSAyOFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb3BOdW0uc3RyaW5nID0gcmV3YXJkX3Byb3BfdGV4dFxuICAgICAgICAgICAgICAgICAgICBpc1BvaW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgcmV3YXJkX3Byb3BfY29sb3IgPSB0aGlzLmlzQ3VycmVudCAmJiAhdGhpcy5oYXNHYWluID8gbmV3IGNjLkNvbG9yKDgzLCAxNTgsIDEzLCAyNTUpIDogbmV3IGNjLkNvbG9yKDE5NywgMTAyLCAwLCAyNTUpICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgdGVtcENvbG9yID0gbmV3IGNjLkNvbG9yKCk7XG4gICAgICAgICAgICBpZih0aGlzLmlzQ3VycmVudCAmJiAhdGhpcy5oYXNHYWluKXtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Jld2FyZC5ub2RlLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoYCNFNTAwMDBgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9yZXdhcmQubm9kZS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKGAjRTY2ODJBYCk7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTZXZlbikge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNHYWluICYmICF0aGlzLmlzQ3VycmVudCkgeyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZF9wcm9wX2NvbG9yID0gbmV3IGNjLkNvbG9yKDY4LCAxMzAsIDI0NSwgMjU1KVxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxhYmxlX3Jld2FyZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfcmV3YXJkLm5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzU2V2ZW4pe1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMubGFibGVfcmV3YXJkLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gcmV3YXJkX2NvbG9yO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5sYWJsZV9wcm9wTnVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJsZV9wcm9wTnVtLm5vZGUuYWN0aXZlID0gIWlzUG9pbnRcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX3Byb3BOdW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSByZXdhcmRfcHJvcF9jb2xvclxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmRhdGEudXNlclBlcmlvZCA+PSAxICYmICh0aGlzLmlzU2V2ZW4gfHwgdGhpcy5kYXkgPT0gMykpIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmxhYmxlX3Jld2FyZC5zdHJpbmcgPSBcIue6ouWMheW4gVwiOyAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmltZ19zaW5nbGUgJiYgdGhpcy5pbWdfZG91YmxlICYmIHRoaXMuZGF5ICE9IDMpe1xuICAgICAgICAgICAgaWYodGhpcy5zaG93RG91YmxlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmltZ19kb3VibGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuaW1nX2RvdWJsZS5vcGFjaXR5ID0gdGhpcy5oYXNHYWluID8gMTUzIDogMjU1XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5pbWdfc2luZ2xlLmFjdGl2ZSA9IGZhbHNlOyAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmltZ19kb3VibGUuYWN0aXZlID0gZmFsc2U7XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5pbWdfc2luZ2xlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy90aGlzLmltZ19zaW5nbGUub3BhY2l0eSA9IHRoaXMuaGFzR2FpbiA/IDE1MyA6IDI1NVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmNoZWNrX25vZGUuYWN0aXZlID0gdGhpcy5oYXNHYWluXG4gICAgICAgIGlmICh0aGlzLmhhc0dhaW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTmV3R2Fpbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNOZXdHYWluID0gZmFsc2UgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrX25vZGUuYWN0aXZlID0gdHJ1ZTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgLy90aGlzLm5vZGUub3BhY2l0eSA9IDIwNDtcbiAgICAgICAgICAgIHRoaXMuaW1nX3NpZ25NYXNrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAvL3RoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgdGhpcy5pbWdfc2lnbk1hc2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmltZ19mcmFtZSAmJiAhdGhpcy5pc1NldmVuKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5oYXNHYWluID8gMiA6IHRoaXMuaXNDdXJyZW50ID8gMSA6IDBcbiAgICAgICAgICAgIGlmKGtleSA9PSAyKXtcbiAgICAgICAgICAgICAgICB0aGlzLmltZ19mcmFtZS5ub2RlLm9wYWNpdHkgPSAyMDQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaW1nX2ZyYW1lLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oYXNHYWluKXtcbiAgICAgICAgICAgICAgICB0aGlzLmltZ19mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYmdfaW1hZ2VfbGlzdFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWdfZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJnX2ltYWdlX2xpc3Rba2V5XTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufTtcbiJdfQ==