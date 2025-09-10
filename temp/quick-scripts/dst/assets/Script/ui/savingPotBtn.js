
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/savingPotBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dbe6aHTg1tMSbQnJMAWiLiE', 'savingPotBtn');
// Script/ui/savingPotBtn.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var savingPotBtn = /** @class */ (function (_super) {
    __extends(savingPotBtn, _super);
    function savingPotBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeLabel = null;
        _this.getPoint = null;
        _this.dragon = null; //龙骨
        _this.isUnlock = false; //是否解锁
        _this.btn = null;
        return _this;
        // update (dt) {}
    }
    savingPotBtn.prototype.onLoad = function () {
        var _this = this;
        this.btn = this.node.getComponent(cc.Button);
        // this.dragon = this.node.getComponent(dragonBones.ArmatureDisplay);
        cc.game.on(NameTs_1.default.Game_SavingPost_Icon, function () {
            if (!_this.isUnlock)
                return;
            util_1.default.savingPotLock = true;
            _this.setSate();
        }, this);
        cc.game.on(NameTs_1.default.Game_SavingPost_Lock, function () {
            if (_this.isUnlock)
                return;
            _this.LockFn();
        }, this);
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.wallet_main2,
            success: function (data) {
                console.log(data, 'data=========');
                if (data && data.cashOutMap && data.cashOutMap[1]) {
                    for (var i = 0; i < data.cashOutMap[1].length; i++) {
                        if ((data.cashOutMap[1][i].type == 1 && AssistCtr_1.AssistCtr.isATest()) || (data.cashOutMap[1][i].type == 9 && !AssistCtr_1.AssistCtr.isATest())) {
                            _this.isUnlock = data.cashOutMap[1][i].hasWithdraw == 1;
                            break;
                        }
                    }
                }
                if (!_this.isUnlock) {
                    _this.btn.enabled = false;
                    _this.node.opacity = 0;
                }
                else {
                    _this.LockFn();
                }
                console.log("是否解锁了该功能：" + (_this.isUnlock ? "是" : "不是"));
            },
            fail: function () {
                _this.btn.enabled = false;
                _this.node.opacity = 0;
                console.log("请求失败");
            }
        });
    };
    /**解锁功能 */
    savingPotBtn.prototype.LockFn = function () {
        var _this = this;
        console.log("解锁该功能！");
        // util.savingPotLock = true;
        this.btn.enabled = true;
        this.node.opacity = 255;
        util_1.default.post({
            url: UrlConst_1.UrlConst.savingPotIndex,
            success: function (data) {
                if (_this.isUnlock) {
                    util_1.default.savingPotLock = data.status == 0;
                }
                _this.setSate(Number(data && data.status) || 0);
            },
            fail: function () {
                _this.btn.enabled = false;
                _this.node.opacity = 0;
                console.log("获取失败,暂时关闭");
            }
        });
    };
    savingPotBtn.prototype.start = function () {
    };
    /**
     * 设置状态
     * @param num 0不能拿1能拿
     */
    savingPotBtn.prototype.setSate = function (num) {
        var _this = this;
        if (num === void 0) { num = 0; }
        if (this.timeLabel) {
            this.timeLabel.node.active = num == 0;
            if (this.timeLabel.node.active) {
                this.unscheduleAllCallbacks();
                this.timeLabel.string = tool_1.default.formatData(5);
                this.schedule(function () {
                    _this.timeLabel.string = tool_1.default.formatData(5);
                    if (tool_1.default.formatData(5) == "00:00:00") {
                        _this.setSate(1);
                    }
                }, 1);
            }
        }
        this.dragon && this.dragon.playAnimation(num == 1 ? "kelingqu" : "normal", -1);
        console.log(num, 'num============');
        this.getPoint.active = num == 1;
        if (num == 1) {
            this.getPoint.stopAllActions();
            cc.tween(this.getPoint).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
        }
    };
    /**
     * 展现
     */
    savingPotBtn.prototype.showPot = function () {
        soundController_1.default.singleton.clickAudio();
        this.showPage(pageTs_1.default.pageName.GameSavingPot);
    };
    __decorate([
        property({ type: cc.Label, displayName: "时间" })
    ], savingPotBtn.prototype, "timeLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "角标" })
    ], savingPotBtn.prototype, "getPoint", void 0);
    __decorate([
        property({ type: dragonBones.ArmatureDisplay, displayName: "龙骨" })
    ], savingPotBtn.prototype, "dragon", void 0);
    savingPotBtn = __decorate([
        ccclass
    ], savingPotBtn);
    return savingPotBtn;
}(baseTs_1.default));
exports.default = savingPotBtn;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcc2F2aW5nUG90QnRuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFDOUMsc0RBQWlEO0FBQ2pELHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFDaEMsOEJBQThCO0FBQzlCLDRDQUE0QztBQUM1Qyw0QkFBNEI7QUFDdEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUFzSUM7UUFuSVcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBR3hCLFlBQU0sR0FBK0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU5QyxjQUFRLEdBQVcsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUvQixTQUFHLEdBQWEsSUFBSSxDQUFDOztRQXdIN0IsaUJBQWlCO0lBQ3JCLENBQUM7SUF2SEcsNkJBQU0sR0FBTjtRQUFBLGlCQTRDQztRQTFDRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QyxxRUFBcUU7UUFFckUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxvQkFBb0IsRUFBQztZQUNuQyxJQUFHLENBQUMsS0FBSSxDQUFDLFFBQVE7Z0JBQUMsT0FBTztZQUN6QixjQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRVIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENB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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XHJcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xyXG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcclxuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XHJcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xyXG4vL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxyXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cclxuLy/nlLXmiqVodHRwczovL3QubWUvZ2FtZWNvZGU5OTlcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzYXZpbmdQb3RCdG4gZXh0ZW5kcyBiYXNlVHMge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIuaXtumXtFwifSlcclxuICAgIHByaXZhdGUgdGltZUxhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsZGlzcGxheU5hbWU6XCLop5LmoIdcIn0pXHJcbiAgICBwcml2YXRlIGdldFBvaW50OmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXksZGlzcGxheU5hbWU6XCLpvpnpqqhcIn0pXHJcbiAgICBwcml2YXRlIGRyYWdvbjpkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsOy8v6b6Z6aqoXHJcblxyXG4gICAgcHJpdmF0ZSBpc1VubG9jazpib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbop6PplIFcclxuXHJcbiAgICBwcml2YXRlIGJ0bjpjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuYnRuID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmRyYWdvbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TYXZpbmdQb3N0X0ljb24sKCk9PntcclxuICAgICAgICAgICAgaWYoIXRoaXMuaXNVbmxvY2spcmV0dXJuO1xyXG4gICAgICAgICAgICB1dGlsLnNhdmluZ1BvdExvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNhdGUoKTtcclxuICAgICAgICB9LHRoaXMpO1xyXG5cclxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1NhdmluZ1Bvc3RfTG9jaywoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzVW5sb2NrKXJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5Mb2NrRm4oKTtcclxuICAgICAgICB9LHRoaXMpO1xyXG5cclxuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xyXG4gICAgICAgICAgICB1cmw6VXJsQ29uc3Qud2FsbGV0X21haW4yLFxyXG4gICAgICAgICAgICBzdWNjZXNzOihkYXRhKT0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnZGF0YT09PT09PT09PScpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSYmZGF0YS5jYXNoT3V0TWFwJiZkYXRhLmNhc2hPdXRNYXBbMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aTxkYXRhLmNhc2hPdXRNYXBbMV0ubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKChkYXRhLmNhc2hPdXRNYXBbMV1baV0udHlwZT09MSYmQXNzaXN0Q3RyLmlzQVRlc3QoKSl8fChkYXRhLmNhc2hPdXRNYXBbMV1baV0udHlwZT09OSYmIUFzc2lzdEN0ci5pc0FUZXN0KCkpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNVbmxvY2sgPSBkYXRhLmNhc2hPdXRNYXBbMV1baV0uaGFzV2l0aGRyYXc9PTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVW5sb2NrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bi5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Mb2NrRm4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5piv5ZCm6Kej6ZSB5LqG6K+l5Yqf6IO977yaXCIrKHRoaXMuaXNVbmxvY2s/XCLmmK9cIjpcIuS4jeaYr1wiKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6KCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+35rGC5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuino+mUgeWKn+iDvSAqL1xyXG4gICAgTG9ja0ZuKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLop6PplIHor6Xlip/og73vvIFcIik7XHJcbiAgICAgICAgLy8gdXRpbC5zYXZpbmdQb3RMb2NrID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJ0bi5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB1dGlsLnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6VXJsQ29uc3Quc2F2aW5nUG90SW5kZXgsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6KGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzVW5sb2NrKXtcclxuICAgICAgICAgICAgICAgICAgICB1dGlsLnNhdmluZ1BvdExvY2sgPSBkYXRhLnN0YXR1cz09MDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2F0ZShOdW1iZXIoZGF0YSYmZGF0YS5zdGF0dXMpfHwwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDooKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG4uZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5blpLHotKUs5pqC5pe25YWz6ZetXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rueKtuaAgVxyXG4gICAgICogQHBhcmFtIG51bSAw5LiN6IO95ou/MeiDveaLv1xyXG4gICAgICovXHJcbiAgICBzZXRTYXRlKG51bTpudW1iZXIgPSAwKXtcclxuICAgICAgICBpZih0aGlzLnRpbWVMYWJlbCl7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLm5vZGUuYWN0aXZlID0gbnVtPT0wO1xyXG4gICAgICAgICAgICBpZih0aGlzLnRpbWVMYWJlbC5ub2RlLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9IHRvb2wuZm9ybWF0RGF0YSg1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSB0b29sLmZvcm1hdERhdGEoNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodG9vbC5mb3JtYXREYXRhKDUpPT1cIjAwOjAwOjAwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kcmFnb24mJnRoaXMuZHJhZ29uLnBsYXlBbmltYXRpb24obnVtPT0xP1wia2VsaW5ncXVcIjpcIm5vcm1hbFwiLC0xKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2cobnVtLCdudW09PT09PT09PT09PT0nKVxyXG5cclxuICAgICAgICB0aGlzLmdldFBvaW50LmFjdGl2ZSA9IG51bT09MTtcclxuXHJcbiAgICAgICAgaWYobnVtPT0xKXtcclxuICAgICAgICAgICAgdGhpcy5nZXRQb2ludC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmdldFBvaW50KS5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oKS50byguMyx7YW5nbGU6MTB9KS50byguMix7YW5nbGU6MH0pXHJcbiAgICAgICAgICAgICkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsZXnjrBcclxuICAgICAqL1xyXG4gICAgc2hvd1BvdCgpe1xyXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xyXG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVTYXZpbmdQb3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19