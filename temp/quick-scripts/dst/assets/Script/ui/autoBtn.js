
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/autoBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '64859sFAm1Gg7uc/WfjK6hp', 'autoBtn');
// Script/ui/autoBtn.ts

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
var AdPosition_1 = require("../common/AdPosition");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var autoBtn = /** @class */ (function (_super) {
    __extends(autoBtn, _super);
    function autoBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //时间
        _this.timeLabel = null;
        //锁
        _this.lockIcon = null;
        //手
        _this.hand = null;
        _this.time = 10;
        return _this;
        // update (dt) {}
    }
    autoBtn.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Start, function (res) {
            if (util_1.default.userData.customs.big == _this.initData.level && _this.isLock) {
                util_1.default.userData.autoProp = 0;
                _this.setState();
            }
        }, this);
    };
    /**设置状态 */
    autoBtn.prototype.setState = function () {
        if (util_1.default.userData.customs.big >= this.initData.level) {
            this.node.color = cc.color(255, 255, 255, 255);
            this.lockIcon.active = false;
            this.isLock = false;
        }
        else {
            this.node.color = cc.color(107, 107, 107, 255);
            this.lockIcon.active = true;
            this.isLock = true;
        }
        if (util_1.default.userData.autoProp == 0) {
            this.hand.active = true;
            this.time = 10;
        }
    };
    autoBtn.prototype.start = function () {
        if (util_1.default && util_1.default.propData) {
            for (var i = 0; i < util_1.default.propData.length; i++) {
                var item = util_1.default.propData[i];
                if (item.propIssueDetailList[0].propsId == faceTs_1.propType.auto) {
                    this.initData = item.propIssueDetailList[0];
                    break;
                }
            }
            this.setState();
        }
    };
    /**
     * 使用道具
     */
    autoBtn.prototype.useBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "自动合成按钮",
            app_exposure_type: "icon",
        });
        if (this.timeLabel.node.getParent().active) {
            AssistCtr_1.AssistCtr.showToastTip("正在使用中!");
            return;
        }
        if (this.isLock) {
            AssistCtr_1.AssistCtr.showToastTip(this.initData.level + "关解锁!");
            return;
        }
        var isVideo = true;
        if (util_1.default.userData.prop[faceTs_1.propType.auto - 1].num > 0 || util_1.default.userData.autoProp == 0) {
            isVideo = false;
        }
        var successFn = function () {
            util_1.default.UseProp(_this.initData.propsId);
            // this.setData();
            console.log("使用道具", _this.initData.propsId);
            _this.sendMTrack(true, isVideo);
            util_1.default.gamePropNum += 1;
            _this.djs();
            util_1.default.userData.autoProp = 1;
            _this.closeHand();
            util_1.default.setStorage(util_1.default.localDiary.autoProp, util_1.default.userData.autoProp);
        };
        console.log(isVideo, 'isVideo');
        if (isVideo) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.autoVideo, function () {
                util_1.default.post({
                    url: UrlConst_1.UrlConst.getUseProp,
                    data: { propId: _this.initData.propsId },
                    success: function () {
                        if (!_this.isValid) {
                            return;
                        }
                        successFn();
                    },
                    fail: function () {
                        _this.sendMTrack(false, false);
                    }
                });
            }, function () {
                AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }
        else {
            successFn();
        }
    };
    /**倒计时 */
    autoBtn.prototype.djs = function () {
        var _this = this;
        this.timeLabel.node.getParent().active = true;
        this.schedule(function () {
            var time = util_1.default.userData.prop[faceTs_1.propType.auto - 1].time;
            if (!time) {
                _this.unscheduleAllCallbacks();
                _this.timeLabel.node.getParent().active = false;
                return;
            }
            _this.timeLabel.string = tool_1.default.changeTime(time);
        }, 1);
    };
    autoBtn.prototype.update = function (dt) {
        if (this.time > 0) {
            this.time -= dt;
            if (this.time < 0) {
                this.time = 0;
                this.closeHand();
            }
        }
    };
    /**关闭手势 */
    autoBtn.prototype.closeHand = function () {
        this.hand.active = false;
        if (util_1.default.userData.autoProp == 2) {
            util_1.default.setStorage(util_1.default.localDiary.autoProp, 2);
        }
    };
    /**是否 */
    autoBtn.prototype.sendMTrack = function (isSuccess, isVideo) {
        var data = tool_1.default.GetArrData("type", this.initData.propsId, util_1.default.propConfig);
        TrackMgr_1.default.tool_used({
            tool_name: data.name,
            use_success: isSuccess,
            is_video_tool: isVideo,
            level: "第" + util_1.default.userData.customs.big + "关",
        });
    };
    __decorate([
        property(cc.Label)
    ], autoBtn.prototype, "timeLabel", void 0);
    __decorate([
        property(cc.Node)
    ], autoBtn.prototype, "lockIcon", void 0);
    __decorate([
        property(cc.Node)
    ], autoBtn.prototype, "hand", void 0);
    autoBtn = __decorate([
        ccclass
    ], autoBtn);
    return autoBtn;
}(cc.Component));
exports.default = autoBtn;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcYXV0b0J0bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQsbURBQWtEO0FBQ2xELDJDQUE0QztBQUM1QywyQ0FBc0M7QUFFdEMsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUFnTEM7UUE5S0csSUFBSTtRQUVKLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFFM0IsR0FBRztRQUVILGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsR0FBRztRQUVILFVBQUksR0FBWSxJQUFJLENBQUM7UUFTYixVQUFJLEdBQVUsRUFBRSxDQUFDOztRQTBKekIsaUJBQWlCO0lBQ3JCLENBQUM7SUF6Skcsd0JBQU0sR0FBTjtRQUFBLGlCQVFDO1FBTkcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLEVBQUMsVUFBQSxHQUFHO1lBQzVCLElBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFFLEtBQUksQ0FBQyxNQUFNLEVBQUM7Z0JBQzdELGNBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1FBQ0wsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELFVBQVU7SUFDViwwQkFBUSxHQUFSO1FBQ0ksSUFBRyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFH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QUUsT0FBZ0I7UUFFM0MsSUFBSSxJQUFJLEdBQUcsY0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsY0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTNFLGtCQUFRLENBQUMsU0FBUyxDQUFDO1lBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ3BCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLEtBQUssRUFBRSxHQUFHLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUc7U0FDL0MsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQXpLRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNRO0lBSTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ087SUFJekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5Q0FDRztJQVpKLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FnTDNCO0lBQUQsY0FBQztDQWhMRCxBQWdMQyxDQWhMb0MsRUFBRSxDQUFDLFNBQVMsR0FnTGhEO2tCQWhMb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBwcm9wVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4uL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGF1dG9CdG4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLy/ml7bpl7RcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGltZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgXG4gICAgLy/plIFcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsb2NrSWNvbjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvL+aJi1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGhhbmQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBwcml2YXRlIGluaXREYXRhOmFueTtcblxuICAgIC8v5piv5ZCm6ZSB552AXG4gICAgcHJpdmF0ZSBpc0xvY2s6Ym9vbGVhbjtcblxuICAgIHByaXZhdGUgdGltZTpudW1iZXIgPSAxMDtcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TdGFydCxyZXM9PntcbiAgICAgICAgICAgIGlmKHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcgPT0gdGhpcy5pbml0RGF0YS5sZXZlbCYmdGhpcy5pc0xvY2spe1xuICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEuYXV0b1Byb3AgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSx0aGlzKTtcbiAgICB9ICAgIFxuXG4gICAgLyoq6K6+572u54q25oCBICovXG4gICAgc2V0U3RhdGUoKXtcbiAgICAgICAgaWYodXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZz49dGhpcy5pbml0RGF0YS5sZXZlbCl7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsMjU1LDI1NSwyNTUpO1xuICAgICAgICAgICAgdGhpcy5sb2NrSWNvbi5hY3RpdmUgID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTG9jayA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jb2xvciA9IGNjLmNvbG9yKDEwNywxMDcsMTA3LDI1NSk7XG4gICAgICAgICAgICB0aGlzLmxvY2tJY29uLmFjdGl2ZSAgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc0xvY2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih1dGlsLnVzZXJEYXRhLmF1dG9Qcm9wPT0wKXtcbiAgICAgICAgICAgIHRoaXMuaGFuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gMTA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgaWYodXRpbCAmJiB1dGlsLnByb3BEYXRhKXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aTx1dGlsLnByb3BEYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdXRpbC5wcm9wRGF0YVtpXTtcbiAgICAgICAgICAgICAgICBpZihpdGVtLnByb3BJc3N1ZURldGFpbExpc3RbMF0ucHJvcHNJZD09cHJvcFR5cGUuYXV0byl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEgPSBpdGVtLnByb3BJc3N1ZURldGFpbExpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgfSAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkvb/nlKjpgZPlhbdcbiAgICAgKi9cbiAgICB1c2VCdG4oKXtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIummlumhtVwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLoh6rliqjlkIjmiJDmjInpkq5cIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHRoaXMudGltZUxhYmVsLm5vZGUuZ2V0UGFyZW50KCkuYWN0aXZlKXtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLmraPlnKjkvb/nlKjkuK0hXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaXNMb2NrKXtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodGhpcy5pbml0RGF0YS5sZXZlbCtcIuWFs+ino+mUgSFcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlzVmlkZW86Ym9vbGVhbiA9IHRydWU7XG4gICAgICAgIGlmKHV0aWwudXNlckRhdGEucHJvcFtwcm9wVHlwZS5hdXRvLTFdLm51bT4wfHx1dGlsLnVzZXJEYXRhLmF1dG9Qcm9wPT0wKXtcbiAgICAgICAgICAgIGlzVmlkZW8gPSBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN1Y2Nlc3NGbiA9ICgpPT57XG4gICAgICAgICAgICB1dGlsLlVzZVByb3AodGhpcy5pbml0RGF0YS5wcm9wc0lkKTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0RGF0YSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLkvb/nlKjpgZPlhbdcIiwgdGhpcy5pbml0RGF0YS5wcm9wc0lkKTtcbiAgICAgICAgICAgIHRoaXMuc2VuZE1UcmFjayh0cnVlLCBpc1ZpZGVvKTtcbiAgICAgICAgICAgIHV0aWwuZ2FtZVByb3BOdW0gKz0gMTtcbiAgICAgICAgICAgIHRoaXMuZGpzKCk7XG4gICAgICAgICAgICB1dGlsLnVzZXJEYXRhLmF1dG9Qcm9wID0gMTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VIYW5kKCk7XG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LmF1dG9Qcm9wLHV0aWwudXNlckRhdGEuYXV0b1Byb3ApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGlzVmlkZW8sJ2lzVmlkZW8nKVxuICAgICAgICBpZihpc1ZpZGVvKXtcbiAgICAgICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5hdXRvVmlkZW8sKCk9PntcbiAgICAgICAgICAgICAgICB1dGlsLnBvc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmdldFVzZVByb3AsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcHJvcElkOiB0aGlzLmluaXREYXRhLnByb3BzSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0ZuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1UcmFjayhmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICAvKirlgJLorqHml7YgKi9cbiAgICBkanMoKXtcbiAgICAgICAgdGhpcy50aW1lTGFiZWwubm9kZS5nZXRQYXJlbnQoKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpPT57XG4gICAgICAgICAgICBsZXQgdGltZTpudW1iZXIgPSB1dGlsLnVzZXJEYXRhLnByb3BbcHJvcFR5cGUuYXV0by0xXS50aW1lO1xuICAgICAgICAgICAgaWYoIXRpbWUpe1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLm5vZGUuZ2V0UGFyZW50KCkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gdG9vbC5jaGFuZ2VUaW1lKHRpbWUpO1xuICAgICAgICB9LDEpO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KXtcblxuICAgICAgICBpZih0aGlzLnRpbWU+MCl7XG4gICAgICAgICAgICB0aGlzLnRpbWUtPWR0O1xuICAgICAgICAgICAgaWYodGhpcy50aW1lPDApe1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUhhbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvKirlhbPpl63miYvlir8gKi9cbiAgICBjbG9zZUhhbmQoKXtcbiAgICAgICAgdGhpcy5oYW5kLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZih1dGlsLnVzZXJEYXRhLmF1dG9Qcm9wPT0yKXtcbiAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkuYXV0b1Byb3AsMik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmmK/lkKYgKi9cbiAgICBzZW5kTVRyYWNrKGlzU3VjY2VzczogYm9vbGVhbiwgaXNWaWRlbzogYm9vbGVhbikge1xuXG4gICAgICAgIGxldCBkYXRhID0gdG9vbC5HZXRBcnJEYXRhKFwidHlwZVwiLCB0aGlzLmluaXREYXRhLnByb3BzSWQsIHV0aWwucHJvcENvbmZpZyk7XG5cbiAgICAgICAgVHJhY2tNZ3IudG9vbF91c2VkKHtcbiAgICAgICAgICAgIHRvb2xfbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICAgICAgdXNlX3N1Y2Nlc3M6IGlzU3VjY2VzcyxcbiAgICAgICAgICAgIGlzX3ZpZGVvX3Rvb2w6IGlzVmlkZW8sXG4gICAgICAgICAgICBsZXZlbDogXCLnrKxcIiArIHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcgKyBcIuWFs1wiLFxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==