
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcc2F2aW5nUG90QnRuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUNoRCx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFDOUMsc0RBQWlEO0FBQ2pELHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFDaEMsOEJBQThCO0FBQzlCLDRDQUE0QztBQUM1Qyw0QkFBNEI7QUFDdEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUFzSUM7UUFuSVcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBR3hCLFlBQU0sR0FBK0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU5QyxjQUFRLEdBQVcsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUvQixTQUFHLEdBQWEsSUFBSSxDQUFDOztRQXdIN0IsaUJBQWlCO0lBQ3JCLENBQUM7SUF2SEcsNkJBQU0sR0FBTjtRQUFBLGlCQTRDQztRQTFDRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QyxxRUFBcUU7UUFFckUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxvQkFBb0IsRUFBQztZQUNuQyxJQUFHLENBQUMsS0FBSSxDQUFDLFFBQVE7Z0JBQUMsT0FBTztZQUN6QixjQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRVIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENB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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbi8v55S15a2Q6YKu5Lu2cHVoYWxza2lqc2VtZW5AZ21haWwuY29tXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cbi8v55S15oqlaHR0cHM6Ly90Lm1lL2dhbWVjb2RlOTk5XG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNhdmluZ1BvdEJ0biBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLml7bpl7RcIn0pXG4gICAgcHJpdmF0ZSB0aW1lTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi6KeS5qCHXCJ9KVxuICAgIHByaXZhdGUgZ2V0UG9pbnQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6ZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5LGRpc3BsYXlOYW1lOlwi6b6Z6aqoXCJ9KVxuICAgIHByaXZhdGUgZHJhZ29uOmRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7Ly/pvpnpqqhcblxuICAgIHByaXZhdGUgaXNVbmxvY2s6Ym9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm6Kej6ZSBXG5cbiAgICBwcml2YXRlIGJ0bjpjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgb25Mb2FkICgpIHtcblxuICAgICAgICB0aGlzLmJ0biA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcblxuICAgICAgICAvLyB0aGlzLmRyYWdvbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1NhdmluZ1Bvc3RfSWNvbiwoKT0+e1xuICAgICAgICAgICAgaWYoIXRoaXMuaXNVbmxvY2spcmV0dXJuO1xuICAgICAgICAgICAgdXRpbC5zYXZpbmdQb3RMb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2F0ZSgpO1xuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfU2F2aW5nUG9zdF9Mb2NrLCgpPT57XG4gICAgICAgICAgICBpZih0aGlzLmlzVW5sb2NrKXJldHVybjtcbiAgICAgICAgICAgIHRoaXMuTG9ja0ZuKCk7XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDpVcmxDb25zdC53YWxsZXRfbWFpbjIsXG4gICAgICAgICAgICBzdWNjZXNzOihkYXRhKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2RhdGE9PT09PT09PT0nKTtcbiAgICAgICAgICAgICAgICBpZihkYXRhJiZkYXRhLmNhc2hPdXRNYXAmJmRhdGEuY2FzaE91dE1hcFsxXSl7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aTxkYXRhLmNhc2hPdXRNYXBbMV0ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZigoZGF0YS5jYXNoT3V0TWFwWzFdW2ldLnR5cGU9PTEmJkFzc2lzdEN0ci5pc0FUZXN0KCkpfHwoZGF0YS5jYXNoT3V0TWFwWzFdW2ldLnR5cGU9PTkmJiFBc3Npc3RDdHIuaXNBVGVzdCgpKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1VubG9jayA9IGRhdGEuY2FzaE91dE1hcFsxXVtpXS5oYXNXaXRoZHJhdz09MTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc1VubG9jayl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkxvY2tGbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaYr+WQpuino+mUgeS6huivpeWKn+iDve+8mlwiKyh0aGlzLmlzVW5sb2NrP1wi5pivXCI6XCLkuI3mmK9cIikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6KCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bi5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+35rGC5aSx6LSlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG5cbiAgICAvKirop6PplIHlip/og70gKi9cbiAgICBMb2NrRm4oKXtcbiAgICAgICAgY29uc29sZS5sb2coXCLop6PplIHor6Xlip/og73vvIFcIik7XG4gICAgICAgIC8vIHV0aWwuc2F2aW5nUG90TG9jayA9IHRydWU7XG4gICAgICAgIHRoaXMuYnRuLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgdXRpbC5wb3N0KHtcbiAgICAgICAgICAgIHVybDpVcmxDb25zdC5zYXZpbmdQb3RJbmRleCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6KGRhdGEpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc1VubG9jayl7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwuc2F2aW5nUG90TG9jayA9IGRhdGEuc3RhdHVzPT0wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldFNhdGUoTnVtYmVyKGRhdGEmJmRhdGEuc3RhdHVzKXx8MCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuYnRuLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5blpLHotKUs5pqC5pe25YWz6ZetXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u54q25oCBXG4gICAgICogQHBhcmFtIG51bSAw5LiN6IO95ou/MeiDveaLv1xuICAgICAqL1xuICAgIHNldFNhdGUobnVtOm51bWJlciA9IDApe1xuICAgICAgICBpZih0aGlzLnRpbWVMYWJlbCl7XG4gICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5ub2RlLmFjdGl2ZSA9IG51bT09MDtcbiAgICAgICAgICAgIGlmKHRoaXMudGltZUxhYmVsLm5vZGUuYWN0aXZlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSB0b29sLmZvcm1hdERhdGEoNSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSB0b29sLmZvcm1hdERhdGEoNSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRvb2wuZm9ybWF0RGF0YSg1KT09XCIwMDowMDowMFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2F0ZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kcmFnb24mJnRoaXMuZHJhZ29uLnBsYXlBbmltYXRpb24obnVtPT0xP1wia2VsaW5ncXVcIjpcIm5vcm1hbFwiLC0xKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhudW0sJ251bT09PT09PT09PT09PScpXG5cbiAgICAgICAgdGhpcy5nZXRQb2ludC5hY3RpdmUgPSBudW09PTE7XG5cbiAgICAgICAgaWYobnVtPT0xKXtcbiAgICAgICAgICAgIHRoaXMuZ2V0UG9pbnQuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuZ2V0UG9pbnQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oKS50byguMyx7YW5nbGU6MTB9KS50byguMix7YW5nbGU6MH0pXG4gICAgICAgICAgICApLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWxleeOsFxuICAgICAqL1xuICAgIHNob3dQb3QoKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVTYXZpbmdQb3QpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=