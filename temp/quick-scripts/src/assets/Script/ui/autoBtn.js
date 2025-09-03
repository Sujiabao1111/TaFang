"use strict";
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