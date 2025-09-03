
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dUppYW5cXHR1Smlhbkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQXVDO0FBQ3ZDLDhDQUF5QztBQUN6QyxvREFBK0M7QUFDL0Msd0NBQW1DO0FBRW5DLDhCQUE4QjtBQUM5Qiw2Q0FBNkM7QUFDN0Msc0NBQXNDO0FBQ3RDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMsSUFBSTtBQUVFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFNO0lBQTlDO1FBQUEscUVBaUtDO1FBOUpHLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQTBCLEVBQUUsQ0FBQztRQUcxQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGdCQUFVLEdBQVksSUFBSSxDQUFDOztJQW1JL0IsQ0FBQztJQS9IRywwQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDJCQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQseUJBQUksR0FBSixVQUFLLElBQUk7UUFDTCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjth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QUFDOzhDQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDTTtJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNRO0lBOUJWLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FpSzlCO0lBQUQsaUJBQUM7Q0FqS0QsQUFpS0MsQ0FqS3VDLGdCQUFNLEdBaUs3QztrQkFqS29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xyXG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi8uLi9iYXNlL2Jhc2VUc1wiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uLy4uL3V0aWwvdXRpbFwiO1xyXG5cclxuLy8gZXhwb3J0IGludGVyZmFjZSBzaWduRGF0YSB7XHJcbi8vICAgICBsaXN0OiBBcnJheTxzaWduSXRlbURhdGE+ICAgLy/mr4/ml6Xnrb7liLDlpZblirHliJfooahcclxuLy8gICAgIHNpZ25EYXlzOiBudW1iZXJcdCAgICAgICAgLy/nrb7liLDlpKnmlbBcclxuLy8gICAgIHRvZGF5Q2hlY2tlZDogYm9vbGVhbixcdCAgICAvL+S7iuaXpeW3suetvuWIsFxyXG4vLyAgICAgdXNlclBlcmlvZDogbnVtYmVyLFx0ICAgICAgICAvL+eUqOaIt+acn+aVsFxyXG4vLyB9XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHVKaWFuSXRlbSBleHRlbmRzIGJhc2VUcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLlm77pibRpY29uXCIgfSlcclxuICAgIGltYWdlX2ljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLlm77pibRpY29uMlwiIH0pXHJcbiAgICBpbWFnZV9pY29uMjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIGRpc3BsYXlOYW1lOiBcIuWbvumJtOahhlwiIH0pXHJcbiAgICBpbWFnZV9mcmFtZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBmcmFtZVNwckFycmF5OiBBcnJheTxjYy5TcHJpdGVGcmFtZT4gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhhdmVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG5vSGF2ZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdHVycmV0OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG1vbnN0ZXI6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmxlX2x2OmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV9uYW1lOmNjLkxhYmVsID0gbnVsbDsgICAgXHJcblxyXG4gICAgcHJpdmF0ZSBpbml0RGF0YTogYW55O1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gZGF0YS5pZDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEYXRhKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5pbml0RGF0YTtcclxuICAgICAgICBpZiAoZGF0YS53YWxrQ2QpIHsgICAgICAgIC8v5oCq5YW9XHJcbiAgICAgICAgICAgIHRoaXMuaGF2ZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub0hhdmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2UoTnVtYmVyKGRhdGEuc3ByaXRlKSwgMiwgKHJlcyk9PnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbWFnZV9pY29uKSB0aGlzLmltYWdlX2ljb24uc3ByaXRlRnJhbWUgPSByZXM7XHJcbiAgICAgICAgICAgIH0sICgpPT57aWYodGhpcy5ub2RlKSB0aGlzLm5vZGUuZGVzdHJveSgpO30pXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgIC8v54Ku5aGUXHJcbiAgICAgICAgICAgIGxldCBjdXJMdiA9IHV0aWwudXNlckRhdGEudHVycmV0TGV2ZWw7XHJcbiAgICAgICAgICAgIGlmIChjdXJMdiA+PSBwYXJzZUludCh0aGlzLmluaXREYXRhLmxldmVsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYXZlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub0hhdmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFueShkYXRhLmJvZHksIGNjLlNwcml0ZUZyYW1lLCAocmVzKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pbWFnZV9pY29uKSB0aGlzLmltYWdlX2ljb24uc3ByaXRlRnJhbWUgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCAoKT0+e2lmKHRoaXMubm9kZSkgdGhpcy5ub2RlLmRlc3Ryb3koKTt9KVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuaW1hZ2VfaWNvbjIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFueShkYXRhLmZvb3QsIGNjLlNwcml0ZUZyYW1lLCAocmVzKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pbWFnZV9pY29uMikgdGhpcy5pbWFnZV9pY29uMi5zcHJpdGVGcmFtZSA9IHJlcztcclxuICAgICAgICAgICAgICAgIH0sICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlKSB0aGlzLmltYWdlX2ljb24yLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnggPSBOdW1iZXIoZGF0YS5UdWppYW5JdGVtWCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueSA9IE51bWJlcihkYXRhLlR1amlhbkl0ZW1ZKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gaWYoQXNzaXN0Q3RyLmNoZWNrVHVKaWFuKGRhdGEubGV2ZWwpKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueCA9IDA7IFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS55ID0gMDtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZihkYXRhLmxldmVsID09IDUpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmltYWdlX2ljb24yLm5vZGUueSA9IC0yO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIGlmKGRhdGEubGV2ZWwgPT0gOSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS54ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS55ID0gLTM7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZihkYXRhLmxldmVsID09IDE3KXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAtMztcclxuICAgICAgICAgICAgICAgIC8vICAgICB9ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGVsc2UgaWYoZGF0YS5sZXZlbCA9PSAzMCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaW1hZ2VfaWNvbjIubm9kZS54ID0gMjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAxO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0gXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZihkYXRhLmxldmVsID09IDI5KXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAtNDtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9ICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxzZSBpZihkYXRhLmxldmVsID09IDM4KXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAtMTc7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5pbWFnZV9pY29uMi5ub2RlLnkgPSAtMjY7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhdmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubm9IYXZlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlci5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMubGFibGVfbHYuc3RyaW5nID0gYEx2JHtkYXRhLmxldmVsfWA7ICAgICAgICBcclxuICAgICAgICB0aGlzLmxhYmxlX25hbWUuc3RyaW5nID0gYCR7ZGF0YS5uYW1lfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7tcclxuICAgICAqL1xyXG4gICAgY2xpY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGF2ZU5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcclxuICAgICAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIuWbvumJtFwiLFxyXG4gICAgICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLngq7njovov5vluqZcIixcclxuICAgICAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcIkljb25cIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVKaWFuX1VwRGF0YSwge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5pbml0RGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ngrnlh7vnirbmgIFcclxuICAgICAqL1xyXG4gICAgc2V0Q2xpQ2tTdGF0ZShzdGF0ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhdmVOb2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcENvbG9yID0gbmV3IGNjLkNvbG9yKCk7XHJcbiAgICAgICAgICAgIGlmKHN0YXRlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfbHYubm9kZS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiI0ZFRTZCN1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFibGVfbmFtZS5ub2RlLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjRkVFNkI3XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX2x2Lm5vZGUuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChcIiNCQjQyMEVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmxlX25hbWUubm9kZS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiI0JCNDIwRVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbWFnZV9mcmFtZS5zcHJpdGVGcmFtZSA9IHN0YXRlID8gdGhpcy5mcmFtZVNwckFycmF5WzFdIDogdGhpcy5mcmFtZVNwckFycmF5WzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=