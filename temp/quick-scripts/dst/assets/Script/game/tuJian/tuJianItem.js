
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/tuJian/tuJianItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b94a3yrlFNsrUHI2K2AYdD', 'tuJianItem');
// Script/game/tuJian/tuJianItem.ts

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
var baseTs_1 = require("../../base/baseTs");
var NameTs_1 = require("../../common/NameTs");
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
            ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dUppYW5cXHR1Smlhbkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQXVDO0FBQ3ZDLDhDQUF5QztBQUV6Qyx3Q0FBbUM7QUFFbkMsOEJBQThCO0FBQzlCLDZDQUE2QztBQUM3QyxzQ0FBc0M7QUFDdEMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6QyxJQUFJO0FBRUUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQU07SUFBOUM7UUFBQSxxRUE0SkM7UUF6SkcsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsbUJBQWEsR0FBMEIsRUFBRSxDQUFDO1FBRzFDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsWUFBTSxHQUFZLElBQUksQ0FBQztRQUd2QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7O0lBOEgvQixDQUFDO0lBMUhHLDBCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsMkJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCx5QkFBSSxHQUFKLFVBQUssSUFBSTtRQUNMLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO2FBQ0k7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELCtCQUFVLEdBQVY7UUFBQSxpQkFzRUM7UUFyRUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBUyxJQUFJO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFDLEdBQUc7Z0JBQ3ZDLElBQUcsS0FBSSxDQUFDLFVBQVU7b0JBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQzFELENBQUMsRUFBRSxjQUFLLElBQUcsS0FBSSxDQUFDLElBQUk7Z0JBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO1lBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDeEM7YUFDSSxFQUFvQixJQUFJO1lBQ3pCLElBQUksS0FBSyxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3RDLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFFL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFHO29CQUN4QyxJQUFHLEtBQUksQ0FBQyxVQUFVO3dCQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztnQkFDMUQsQ0FBQyxFQUFFLGNBQUssSUFBRyxLQUFJLENBQUMsSUFBSTtvQkFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7Z0JBRTVDLHVDQUF1QztnQkFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFHO29CQUN4QyxJQUFHLEtBQUksQ0FBQyxXQUFXO3dCQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztnQkFDNUQsQ0FBQyxFQUFFO29CQUNDLElBQUcsS0FBSSxDQUFDLElBQUk7d0JBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQTtnQkFFRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRW5ELHlDQUF5QztnQkFDekMsb0NBQW9DO2dCQUNwQyxtQ0FBbUM7Z0JBQ25DLDJCQUEyQjtnQkFDM0Isd0NBQXdDO2dCQUN4QyxRQUFRO2dCQUNSLGdDQUFnQztnQkFDaEMsd0NBQXdDO2dCQUN4Qyx3Q0FBd0M7Z0JBQ3hDLFVBQVU7Z0JBQ1YseURBQXlEO2dCQUN6RCx3Q0FBd0M7Z0JBQ3hDLGVBQWU7Z0JBQ2YsaUNBQWlDO2dCQUNqQyx1Q0FBdUM7Z0JBQ3ZDLHVDQUF1QztnQkFDdkMsU0FBUztnQkFDVCx5REFBeUQ7Z0JBQ3pELHdDQUF3QztnQkFDeEMsV0FBVztnQkFDWCx5REFBeUQ7Z0JBQ3pELHlDQUF5QztnQkFDekMsaUNBQWlDO2dCQUNqQyxJQUFJO2dCQUNKLFFBQVE7Z0JBQ1IscUNBQXFDO2dCQUNyQyxJQUFJO2FBQ1A7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUU3QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBRS9CO1NBQ0o7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxPQUFLLElBQUksQ0FBQyxLQUFPLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBRyxJQUFJLENBQUMsSUFBTSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNILDBCQUFLLEdBQUw7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQUMsQ0FBQztZQUV4QixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGtCQUFrQixFQUFFO2dCQUNwQyxNQUFNLEVBQUUsSUFBSTtnQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDdEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQ0FBYSxHQUFiLFVBQWMsS0FBSztRQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0IsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzdEO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM3RDtZQUVELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RjtJQUNMLENBQUM7SUF4SkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7a0RBQ3hCO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDO21EQUN4QjtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQzttREFDcEI7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztxREFDaUI7SUFHMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ0s7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNNO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ1E7SUE5QlYsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQTRKOUI7SUFBRCxpQkFBQztDQTVKRCxBQTRKQyxDQTVKdUMsZ0JBQU0sR0E0SjdDO2tCQTVKb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi8uLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uLy4uL2Jhc2UvYmFzZVRzXCI7XHJcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uLy4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi8uLi9UcmFja01nci9UcmFja01nclwiO1xyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XHJcblxyXG4vLyBleHBvcnQgaW50ZXJmYWNlIHNpZ25EYXRhIHtcclxuLy8gICAgIGxpc3Q6IEFycmF5PHNpZ25JdGVtRGF0YT4gICAvL+avj+aXpeetvuWIsOWlluWKseWIl+ihqFxyXG4vLyAgICAgc2lnbkRheXM6IG51bWJlclx0ICAgICAgICAvL+etvuWIsOWkqeaVsFxyXG4vLyAgICAgdG9kYXlDaGVja2VkOiBib29sZWFuLFx0ICAgIC8v5LuK5pel5bey562+5YiwXHJcbi8vICAgICB1c2VyUGVyaW9kOiBudW1iZXIsXHQgICAgICAgIC8v55So5oi35pyf5pWwXHJcbi8vIH1cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0dUppYW5JdGVtIGV4dGVuZHMgYmFzZVRzIHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIGRpc3BsYXlOYW1lOiBcIuWbvumJtGljb25cIiB9KVxyXG4gICAgaW1hZ2VfaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIGRpc3BsYXlOYW1lOiBcIuWbvumJtGljb24yXCIgfSlcclxuICAgIGltYWdlX2ljb24yOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZSwgZGlzcGxheU5hbWU6IFwi5Zu+6Ym05qGGXCIgfSlcclxuICAgIGltYWdlX2ZyYW1lOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGZyYW1lU3ByQXJyYXk6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGF2ZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbm9IYXZlTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0dXJyZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbW9uc3RlcjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFibGVfbHY6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmxlX25hbWU6Y2MuTGFiZWwgPSBudWxsOyAgICBcclxuXHJcbiAgICBwcml2YXRlIGluaXREYXRhOiBhbnk7XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSBkYXRhLmlkO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURhdGEoKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmluaXREYXRhO1xyXG4gICAgICAgIGlmIChkYXRhLndhbGtDZCkgeyAgICAgICAgLy/mgKrlhb1cclxuICAgICAgICAgICAgdGhpcy5oYXZlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vSGF2ZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvYWRJbWFnZShOdW1iZXIoZGF0YS5zcHJpdGUpLCAyLCAocmVzKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmltYWdlX2ljb24pIHRoaXMuaW1hZ2VfaWNvbi5zcHJpdGVGcmFtZSA9IHJlcztcclxuICAgICAgICAgICAgfSwgKCk9PntpZih0aGlzLm5vZGUpIHRoaXMubm9kZS5kZXN0cm95KCk7fSlcclxuICAgICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgICAgLy/ngq7loZRcclxuICAgICAgICAgICAgbGV0IGN1ckx2ID0gdXRpbC51c2VyRGF0YS50dXJyZXRMZXZlbDtcclxuICAgICAgICAgICAgaWYgKGN1ckx2ID49IHBhcnNlSW50KHRoaXMuaW5pdERhdGEubGV2ZWwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhdmVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vSGF2ZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQW55KGRhdGEuYm9keSwgY2MuU3ByaXRlRnJhbWUsIChyZXMpPT57ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmltYWdlX2ljb24pIHRoaXMuaW1hZ2VfaWNvbi5zcHJpdGVGcmFtZSA9IHJlcztcclxuICAgICAgICAgICAgICAgIH0sICgpPT57aWYodGhpcy5ub2RlKSB0aGlzLm5vZGUuZGVzdHJveSgpO30pXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5pbWFnZV9pY29uMi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQW55KGRhdGEuZm9vdCwgY2MuU3ByaXRlRnJhbWUsIChyZXMpPT57ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmltYWdlX2ljb24yKSB0aGlzLmltYWdlX2ljb24yLnNwcml0ZUZyYW1lID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwgKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUpIHRoaXMuaW1hZ2VfaWNvbjIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueCA9IE51bWJlcihkYXRhLlR1amlhbkl0ZW1YKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS55ID0gTnVtYmVyKGRhdGEuVHVqaWFuSXRlbVkpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBpZihBc3Npc3RDdHIuY2hlY2tUdUppYW4oZGF0YS5sZXZlbCkpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS54ID0gMDsgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKGRhdGEubGV2ZWwgPT0gNSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS55ID0gLTI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGVsc2UgaWYoZGF0YS5sZXZlbCA9PSA5KXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnggPSAtMTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAtMztcclxuICAgICAgICAgICAgICAgIC8vICAgICB9ICBcclxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIGlmKGRhdGEubGV2ZWwgPT0gMTcpeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueSA9IC0zO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0gICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZihkYXRhLmxldmVsID09IDMwKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnggPSAyO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueSA9IDE7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSBcclxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIGlmKGRhdGEubGV2ZWwgPT0gMjkpeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueSA9IC00O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0gICBcclxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIGlmKGRhdGEubGV2ZWwgPT0gMzgpeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueSA9IC0xNztcclxuICAgICAgICAgICAgICAgIC8vICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueSA9IC0yNjtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGF2ZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub0hhdmVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYWJsZV9sdi5zdHJpbmcgPSBgTHYke2RhdGEubGV2ZWx9YDsgICAgICAgIFxyXG4gICAgICAgIHRoaXMubGFibGVfbmFtZS5zdHJpbmcgPSBgJHtkYXRhLm5hbWV9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu1xyXG4gICAgICovXHJcbiAgICBjbGljaygpIHtcclxuICAgICAgICBpZiAodGhpcy5oYXZlTm9kZS5hY3RpdmUpIHs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVKaWFuX1VwRGF0YSwge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5pbml0RGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ngrnlh7vnirbmgIFcclxuICAgICAqL1xyXG4gICAgc2V0Q2xpQ2tTdGF0ZShzdGF0ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhdmVOb2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcENvbG9yID0gbmV3IGNjLkNvbG9yKCk7XHJcbiAgICAgICAgICAgIGlmKHN0YXRlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfbHYubm9kZS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiI0ZFRTZCN1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfbmFtZS5ub2RlLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjRkVFNkI3XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX2x2Lm5vZGUuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChcIiNCQjQyMEVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX25hbWUubm9kZS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiI0JCNDIwRVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbWFnZV9mcmFtZS5zcHJpdGVGcmFtZSA9IHN0YXRlID8gdGhpcy5mcmFtZVNwckFycmF5WzFdIDogdGhpcy5mcmFtZVNwckFycmF5WzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=