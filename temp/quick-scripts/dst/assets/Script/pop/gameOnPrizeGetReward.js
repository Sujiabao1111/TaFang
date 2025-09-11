
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameOnPrizeGetReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aa8637LIt1BnKwQUa9+w2O8', 'gameOnPrizeGetReward');
// Script/pop/gameOnPrizeGetReward.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_prizeNum = null;
        _this.btn_closeNode = null;
        _this.lable_goldNum = null;
        _this.feed_node = null;
        _this.multipleNode = null;
        _this.multipleLabel = null;
        _this.initData = null;
        _this.isClick = false;
        return _this;
    }
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.init = function (data) {
        var _this = this;
        if (data) {
            this.initData = data;
            this.lable_prizeNum.string = "<color=#FFFFFF><outline color=#D25400 width=4><color=#FFFC00>" + data.doubleAmount + "</color>";
            this.lable_goldNum.string = "+" + this.initData.amount;
            this.multipleLabel.string = parseInt(String(data.doubleAmount / this.initData.amount)) + "倍";
            this.btn_closeNode.active = false;
            this.scheduleOnce(function () {
                _this.btn_closeNode.active = true;
            }, 3);
            TrackMgr_1.default.Online_rewards({
                activity_state: "奖励弹窗展示",
                reward_state: this.initData.waitTime / 60 + "\u5206\u949F",
            });
        }
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    NewClass.prototype.clickGet = function () {
        var _this = this;
        if (!this.initData) {
            return;
        }
        if (this.isClick) {
            return;
        }
        this.isClick = true;
        TrackMgr_1.default.Online_rewards({
            activity_state: "奖励弹窗点击",
            button_name_hcdg: "\u76F4\u63A5\u9886\u53D6",
            reward_state: this.initData.waitTime / 60 + "\u5206\u949F",
        });
        TrackMgr_1.default.Online_rewards({
            activity_state: "领取完毕",
            collection_completed: "\u76F4\u63A5\u9886\u53D6\u6210\u529F",
        });
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.onPrizeGetRewardGet,
            onSuccess: function (res) {
                if (!_this.isValid) {
                    return;
                }
                if (res.code === 0) {
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { value: _this.initData.amount, num: 5, parent: cc.director.getScene().getChildByName('Canvas') });
                    util_1.default.addTermCoin(_this.initData.amount);
                    _this.closePage();
                }
                else {
                    _this.closePage();
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
                _this.isClick = false;
            },
            onFail: function (res) {
                _this.closePage();
                _this.isClick = false;
            }
        });
    };
    NewClass.prototype.clickDoubleGet = function () {
        var _this = this;
        if (!this.initData || (this.initData && !this.initData.doubleAmount)) {
            return;
        }
        if (this.isClick) {
            return;
        }
        this.isClick = true;
        TrackMgr_1.default.Online_rewards({
            activity_state: "奖励弹窗点击",
            button_name_hcdg: "\u7FFB\u500D\u9886" + this.initData.doubleAmount,
            reward_state: this.initData.waitTime / 60 + "\u5206\u949F",
        });
        // AdController.loadAd(AdPosition.OnPrizeGet, (res) => {
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.onPrizeGetRewardGet,
            onSuccess: function (res) {
                if (res.code === 0) {
                    if (!_this.isValid) {
                        return;
                    }
                    TrackMgr_1.default.Online_rewards({
                        activity_state: "领取完毕",
                        collection_completed: "\u89C6\u9891\u9886\u53D6\u6210\u529F",
                    });
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { value: _this.initData.doubleAmount, num: 5, parent: cc.director.getScene().getChildByName('Canvas') });
                    util_1.default.addTermCoin(_this.initData.doubleAmount);
                    _this.closePage();
                }
                else {
                    _this.closePage();
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
                _this.isClick = false;
            },
            onFail: function (res) {
                _this.closePage();
                _this.isClick = false;
            }
        });
        // }, () => {
        //     TrackMgr.Online_rewards({
        //         activity_state: "领取完毕",
        //         collection_completed: `视频领取失败`,
        //     })            
        //     this.closePage();
        //     this.isClick = false;
        //     AssistCtr.showToastTip("加载视频失败，请稍后！");
        // })
    };
    NewClass.prototype.onEnable = function () {
    };
    NewClass.prototype.onDisable = function () {
        cc.game.emit(NameTs_1.default.onPrizeGetUpdate);
    };
    __decorate([
        property(cc.RichText)
    ], NewClass.prototype, "lable_prizeNum", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btn_closeNode", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lable_goldNum", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "feed_node", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], NewClass.prototype, "multipleNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数字" })
    ], NewClass.prototype, "multipleLabel", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(baseTs_1.default));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVPblByaXplR2V0UmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLHlDQUFvQztBQUVwQywyQ0FBc0M7QUFFdEMsK0NBQThDO0FBRTlDLHFEQUFnRDtBQUNoRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFNO0lBQTVDO1FBQUEscUVBK0pDO1FBNUpHLG9CQUFjLEdBQWdCLElBQUksQ0FBQztRQUduQyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBR2xCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRXRDLGNBQVEsR0FBdUIsSUFBSSxDQUFDO1FBRXBDLGFBQU8sR0FBRyxLQUFLLENBQUM7O0lBeUlwQixDQUFDO0lBdklHLHdCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsdUJBQUksR0FBSixVQUFLLElBQXdCO1FBQTdCLGlCQXNCQztRQXJCRyxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLGtFQUFnRSxJQUFJLENBQUMsWUFBWSxhQUFVLENBQUE7WUFDeEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQVEsQ0FBQztZQUV2RCxJQUFJLENBQUMsYUFB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LElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQzttREFDTjtJQWxCckIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQStKNUI7SUFBRCxlQUFDO0NBL0pELEFBK0pDLENBL0pxQyxnQkFBTSxHQStKM0M7a0JBL0pvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCB7IG9uUHJpemVSZWRJdGVtRGF0YSB9IGZyb20gXCIuLi9vblByaXplR2V0L09uUHJpemVHZXRcIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3Q2xhc3MgZXh0ZW5kcyBiYXNlVHMge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGxhYmxlX3ByaXplTnVtOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5fY2xvc2VOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV9nb2xkTnVtOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuWAjeaVsFwifSlcclxuICAgIHByaXZhdGUgbXVsdGlwbGVOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsZGlzcGxheU5hbWU6XCLlgI3mlbDlrZdcIn0pXHJcbiAgICBwcml2YXRlIG11bHRpcGxlTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIGluaXREYXRhOiBvblByaXplUmVkSXRlbURhdGEgPSBudWxsO1xyXG5cclxuICAgIGlzQ2xpY2sgPSBmYWxzZTtcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkYXRhOiBvblByaXplUmVkSXRlbURhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9wcml6ZU51bS5zdHJpbmcgPSBgPGNvbG9yPSNGRkZGRkY+PG91dGxpbmUgY29sb3I9I0QyNTQwMCB3aWR0aD00Pjxjb2xvcj0jRkZGQzAwPiR7ZGF0YS5kb3VibGVBbW91bnR9PC9jb2xvcj5gXHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfZ29sZE51bS5zdHJpbmcgPSBgKyR7dGhpcy5pbml0RGF0YS5hbW91bnR9YDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVMYWJlbC5zdHJpbmcgPSBwYXJzZUludChTdHJpbmcoZGF0YS5kb3VibGVBbW91bnQvdGhpcy5pbml0RGF0YS5hbW91bnQpKStcIuWAjVwiO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idG5fY2xvc2VOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl9jbG9zZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgMylcclxuXHJcbiAgICAgICAgICAgIFRyYWNrTWdyLk9ubGluZV9yZXdhcmRzKHtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuWlluWKseW8ueeql+WxleekulwiLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX3N0YXRlOiBgJHt0aGlzLmluaXREYXRhLndhaXRUaW1lIC8gNjB95YiG6ZKfYCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5tdWx0aXBsZU5vZGUpLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjMse2FuZ2xlOjEwfSkudG8oLjIse2FuZ2xlOjB9KVxyXG4gICAgICAgICkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0dldCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdERhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmlzQ2xpY2spe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNDbGljayA9IHRydWU7XHJcblxyXG4gICAgICAgIFRyYWNrTWdyLk9ubGluZV9yZXdhcmRzKHtcclxuICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5aWW5Yqx5by556qX54K55Ye7XCIsXHJcbiAgICAgICAgICAgIGJ1dHRvbl9uYW1lX2hjZGc6IGDnm7TmjqXpooblj5ZgLFxyXG4gICAgICAgICAgICByZXdhcmRfc3RhdGU6IGAke3RoaXMuaW5pdERhdGEud2FpdFRpbWUgLyA2MH3liIbpkp9gLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgVHJhY2tNZ3IuT25saW5lX3Jld2FyZHMoe1xyXG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLpooblj5blrozmr5VcIixcclxuICAgICAgICAgICAgY29sbGVjdGlvbl9jb21wbGV0ZWQ6IGDnm7TmjqXpooblj5bmiJDlip9gLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgWE1TREsuZ2V0ZGF0YVN0cih7XHJcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3Qub25Qcml6ZUdldFJld2FyZEdldCxcclxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgdmFsdWU6IHRoaXMuaW5pdERhdGEuYW1vdW50LCBudW06IDUsIHBhcmVudDogY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJykgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLmluaXREYXRhLmFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRmFpbDogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tEb3VibGVHZXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXREYXRhfHwodGhpcy5pbml0RGF0YSYmIXRoaXMuaW5pdERhdGEuZG91YmxlQW1vdW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaXNDbGljayl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0NsaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuT25saW5lX3Jld2FyZHMoe1xyXG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLlpZblirHlvLnnqpfngrnlh7tcIixcclxuICAgICAgICAgICAgYnV0dG9uX25hbWVfaGNkZzogYOe/u+WAjemihiR7dGhpcy5pbml0RGF0YS5kb3VibGVBbW91bnR9YCxcclxuICAgICAgICAgICAgcmV3YXJkX3N0YXRlOiBgJHt0aGlzLmluaXREYXRhLndhaXRUaW1lIC8gNjB95YiG6ZKfYCxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uT25Qcml6ZUdldCwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcclxuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3Qub25Qcml6ZUdldFJld2FyZEdldCxcclxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuT25saW5lX3Jld2FyZHMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi6aKG5Y+W5a6M5q+VXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uX2NvbXBsZXRlZDogYOinhumikemihuWPluaIkOWKn2AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IHZhbHVlOiB0aGlzLmluaXREYXRhLmRvdWJsZUFtb3VudCwgbnVtOiA1LCBwYXJlbnQ6IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmFkZFRlcm1Db2luKHRoaXMuaW5pdERhdGEuZG91YmxlQW1vdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWE1TREsudG9hc3QocmVzLm1lc3NhZ2UgfHwgJ+e9kee7nOWHuumUmX4nLCAyLjUsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25GYWlsOiByZXMgPT4geyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vIH0sICgpID0+IHtcclxuICAgICAgICAvLyAgICAgVHJhY2tNZ3IuT25saW5lX3Jld2FyZHMoe1xyXG4gICAgICAgIC8vICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi6aKG5Y+W5a6M5q+VXCIsXHJcbiAgICAgICAgLy8gICAgICAgICBjb2xsZWN0aW9uX2NvbXBsZXRlZDogYOinhumikemihuWPluWksei0pWAsXHJcbiAgICAgICAgLy8gICAgIH0pICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaXNDbGljayA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5vblByaXplR2V0VXBkYXRlKTtcclxuICAgIH1cclxufVxyXG4iXX0=