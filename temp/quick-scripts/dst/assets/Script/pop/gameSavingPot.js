
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameSavingPot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '13b9bbRoa9MqraQg0XCIdng', 'gameSavingPot');
// Script/pop/gameSavingPot.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameSavingPot = /** @class */ (function (_super) {
    __extends(gameSavingPot, _super);
    function gameSavingPot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coinLabel = null;
        _this.timeLabel = null;
        _this.getBtnNode = null;
        _this.tomorrowBtnNode = null;
        _this.walletBtnWidget = null; //提现按钮
        _this.walletLabel = null;
        _this.coin = 0; //随机金币
        return _this;
        // update (dt) {}
    }
    gameSavingPot.prototype.onLoad = function () {
        var _this = this;
        //数据更新
        cc.game.on(NameTs_1.default.Game_View_UserDataUpdata, function (res) {
            if (res == faceTs_1.updateType.coin) {
                var userData = util_1.default.userData;
                _this.walletLabel.string = String(userData.coin);
            }
        }, this);
        cc.game.emit(NameTs_1.default.Game_View_UserDataUpdata, faceTs_1.updateType.coin);
        this.walletBtnWidget.top += Number(util_1.default.iphoneXTop);
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "存钱罐弹窗",
        });
    };
    gameSavingPot.prototype.start = function () {
    };
    /**初始化 */
    gameSavingPot.prototype.init = function () {
        var _this = this;
        util_1.default.post({
            url: UrlConst_1.UrlConst.savingPotIndex,
            success: function (data) {
                var state = 0;
                if (data) {
                    _this.coin = data.point;
                    state = data.status;
                }
                if (state == 0) {
                    cc.game.emit(NameTs_1.default.Game_SavingPost_Icon);
                }
                _this.tomorrowBtnNode && (_this.tomorrowBtnNode.active = state == 0 ? true : false);
                _this.getBtnNode && (_this.getBtnNode.active = state == 1 ? true : false);
                _this.setState();
            },
            fail: function () {
                _this.tomorrowBtnNode && (_this.tomorrowBtnNode.active = true);
                _this.getBtnNode && (_this.getBtnNode.active = false);
                _this.setState();
                AssistCtr_1.AssistCtr.showToastTip("网络问题，请稍后！");
            }
        });
    };
    /**设置东西 */
    gameSavingPot.prototype.setState = function () {
        var _this = this;
        this.coinLabel.string = this.coin + "红包币";
        this.getBtnNode.stopAllActions();
        if (this.getBtnNode.active) {
            cc.tween(this.getBtnNode).repeatForever(cc.tween().to(.5, { scale: 1.1 }).to(.5, { scale: 1 })).start();
        }
        if (this.tomorrowBtnNode.active) {
            this.unscheduleAllCallbacks();
            this.timeLabel.string = "倒计时 " + tool_1.default.formatData(5);
            this.schedule(function () {
                _this.timeLabel.string = "倒计时 " + tool_1.default.formatData(5);
                if (tool_1.default.formatData(5) == "00:00:00") {
                    _this.init();
                }
            }, 1);
        }
    };
    gameSavingPot.prototype.getBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        util_1.default.post({
            url: UrlConst_1.UrlConst.savingPotReceive,
            success: function () {
                TrackMgr_1.default.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "存钱罐弹窗",
                    dialog_enter: "领取"
                });
                var savingPotIcon = util_1.default.GlobalMap.get("savingPot") || _this.node;
                cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: savingPotIcon, value: _this.coin, num: 10 });
                cc.game.emit(NameTs_1.default.Game_SavingPost_Icon);
                _this.tomorrowBtnNode.active = true;
                _this.getBtnNode.active = false;
                _this.setState();
                AssistCtr_1.AssistCtr.showToastTip("获取" + _this.coin + "红包币");
                _this.closePage();
            },
            fail: function () {
                AssistCtr_1.AssistCtr.showToastTip("网络问题，请稍后！");
            }
        });
    };
    /**
     * 关闭页面
     */
    gameSavingPot.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "存钱罐弹窗",
            dialog_enter: "关闭"
        });
        this.closePage();
    };
    /**提现 */
    gameSavingPot.prototype.walletBtn = function () {
        TrackMgr_1.default.AppClick({
            app_page_title: "转盘",
            app_ck_module: "提现",
            app_exposure_type: "icon",
        });
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameWallet);
    };
    __decorate([
        property({ type: cc.Label, displayName: "金币" })
    ], gameSavingPot.prototype, "coinLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倒计时" })
    ], gameSavingPot.prototype, "timeLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "领取按钮" })
    ], gameSavingPot.prototype, "getBtnNode", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "明日按钮" })
    ], gameSavingPot.prototype, "tomorrowBtnNode", void 0);
    __decorate([
        property({ type: cc.Widget, displayName: "提现按钮widget" })
    ], gameSavingPot.prototype, "walletBtnWidget", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "钱包金币" })
    ], gameSavingPot.prototype, "walletLabel", void 0);
    gameSavingPot = __decorate([
        ccclass
    ], gameSavingPot);
    return gameSavingPot;
}(baseTs_1.default));
exports.default = gameSavingPot;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTYXZpbmdQb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUVwQywyQ0FBMkQ7QUFDM0QsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFFOUMsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFDaEMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFNO0lBQWpEO1FBQUEscUVBeUpDO1FBdEpXLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixxQkFBZSxHQUFXLElBQUksQ0FBQztRQUd2QyxxQkFBZSxHQUFhLElBQUksQ0FBQyxDQUFDLE1BQU07UUFHaEMsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsVUFBSSxHQUFVLENBQUMsQ0FBQyxDQUFBLE1BQU07O1FBb0k5QixpQkFBaUI7SUFDckIsQ0FBQztJQW5JRyw4QkFBTSxHQUFOO1FBQUEsaUJBb0JDO1FBbEJHLE1BQU07UUFDTixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLHdCQUF3QixFQUFDLFVBQUMsR0FBRztZQUUzQyxJQUFHLEdBQUcsSUFBRSxtQkFBVSxDQUFDLElBQUksRUFBQztnQkFDcEIsSUFBSSxRQUFRLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuRDtRQUVMLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVSLEVBQUUs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QUNWO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxDQUFDOzBEQUNMO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFlBQVksRUFBQyxDQUFDOzBEQUNuQjtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQztzREFDVDtJQWxCbkIsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXlKakM7SUFBRCxvQkFBQztDQXpKRCxBQXlKQyxDQXpKMEMsZ0JBQU0sR0F5SmhEO2tCQXpKb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XHJcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcclxuaW1wb3J0IHsgY3VzdG9tc0luZm8sIHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcclxuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XHJcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XHJcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcclxuaW1wb3J0IHRvb2wgZnJvbSBcIi4uL3V0aWwvdG9vbFwiO1xyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVTYXZpbmdQb3QgZXh0ZW5kcyBiYXNlVHMge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIumHkeW4gVwifSlcclxuICAgIHByaXZhdGUgY29pbkxhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5YCS6K6h5pe2XCJ9KVxyXG4gICAgcHJpdmF0ZSB0aW1lTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi6aKG5Y+W5oyJ6ZKuXCJ9KVxyXG4gICAgcHJpdmF0ZSBnZXRCdG5Ob2RlOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuaYjuaXpeaMiemSrlwifSlcclxuICAgIHByaXZhdGUgdG9tb3Jyb3dCdG5Ob2RlOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuV2lkZ2V0LGRpc3BsYXlOYW1lOlwi5o+Q546w5oyJ6ZKud2lkZ2V0XCJ9KVxyXG4gICAgd2FsbGV0QnRuV2lkZ2V0OmNjLldpZGdldCA9IG51bGw7IC8v5o+Q546w5oyJ6ZKuXHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi6ZKx5YyF6YeR5biBXCJ9KVxyXG4gICAgcHJpdmF0ZSB3YWxsZXRMYWJlbDpjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjb2luOm51bWJlciA9IDA7Ly/pmo/mnLrph5HluIFcclxuICAgIFxyXG4gICAgb25Mb2FkKCl7XHJcblxyXG4gICAgICAgIC8v5pWw5o2u5pu05pawXHJcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhLChyZXMpPT57XHJcblxyXG4gICAgICAgICAgICBpZihyZXM9PXVwZGF0ZVR5cGUuY29pbil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlckRhdGEgPSB1dGlsLnVzZXJEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsZXRMYWJlbC5zdHJpbmcgPSBTdHJpbmcodXNlckRhdGEuY29pbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSx0aGlzKTtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1ZpZXdfVXNlckRhdGFVcGRhdGEsdXBkYXRlVHlwZS5jb2luKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLndhbGxldEJ0bldpZGdldC50b3AgKz0gTnVtYmVyKHV0aWwuaXBob25lWFRvcCk7XHJcblxyXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5a2Y6ZKx572Q5by556qXXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirliJ3lp4vljJYgKi9cclxuICAgIGluaXQoKXtcclxuXHJcbiAgICAgICAgdXRpbC5wb3N0KHtcclxuICAgICAgICAgICAgdXJsOlVybENvbnN0LnNhdmluZ1BvdEluZGV4LFxyXG4gICAgICAgICAgICBzdWNjZXNzOihkYXRhKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlOm51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvaW4gPSBkYXRhLnBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gZGF0YS5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihzdGF0ZT09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1NhdmluZ1Bvc3RfSWNvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvbW9ycm93QnRuTm9kZSYmKHRoaXMudG9tb3Jyb3dCdG5Ob2RlLmFjdGl2ZSA9IHN0YXRlPT0wP3RydWU6ZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCdG5Ob2RlJiYodGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSA9IHN0YXRlPT0xP3RydWU6ZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOigpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvbW9ycm93QnRuTm9kZSYmKHRoaXMudG9tb3Jyb3dCdG5Ob2RlLmFjdGl2ZSA9IHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCdG5Ob2RlJiYodGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSA9IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLnvZHnu5zpl67popjvvIzor7fnqI3lkI7vvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7kuJzopb8gKi9cclxuICAgIHNldFN0YXRlKCl7XHJcbiAgICAgICAgdGhpcy5jb2luTGFiZWwuc3RyaW5nID0gdGhpcy5jb2luK1wi57qi5YyF5biBXCI7XHJcbiAgICAgICAgdGhpcy5nZXRCdG5Ob2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgaWYodGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuZ2V0QnRuTm9kZSkucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjUse3NjYWxlOjEuMX0pLnRvKC41LHtzY2FsZToxfSlcclxuICAgICAgICAgICAgKS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy50b21vcnJvd0J0bk5vZGUuYWN0aXZlKXtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9XCLlgJLorqHml7YgXCIrdG9vbC5mb3JtYXREYXRhKDUpO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPVwi5YCS6K6h5pe2IFwiKyB0b29sLmZvcm1hdERhdGEoNSk7XHJcbiAgICAgICAgICAgICAgICBpZih0b29sLmZvcm1hdERhdGEoNSk9PVwiMDA6MDA6MDBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJ0bigpe1xyXG5cclxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcclxuXHJcbiAgICAgICAgdXRpbC5wb3N0KHtcclxuICAgICAgICAgICAgdXJsOlVybENvbnN0LnNhdmluZ1BvdFJlY2VpdmUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6KCk9PntcclxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLlrZjpkrHnvZDlvLnnqpdcIixcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfZW50ZXI6IFwi6aKG5Y+WXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNhdmluZ1BvdEljb246Y2MuTm9kZSA9IHV0aWwuR2xvYmFsTWFwLmdldChcInNhdmluZ1BvdFwiKXx8dGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLHtub2RlOnNhdmluZ1BvdEljb24sdmFsdWU6dGhpcy5jb2luLG51bToxMH0pO1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1NhdmluZ1Bvc3RfSWNvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvbW9ycm93QnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuiOt+WPllwiK3RoaXMuY29pbitcIue6ouWMheW4gVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6KCk9PntcclxuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLnvZHnu5zpl67popjvvIzor7fnqI3lkI7vvIFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXremhtemdolxyXG4gICAgICovXHJcbiAgICBjbG9zZUJ0bigpe1xyXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5a2Y6ZKx572Q5by556qXXCIsXHJcbiAgICAgICAgICAgIGRpYWxvZ19lbnRlcjogXCLlhbPpl61cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKirmj5DnjrAgKi9cclxuICAgIHdhbGxldEJ0bigpe1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcclxuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6L2s55uYXCIsXHJcbiAgICAgICAgICAgIGFwcF9ja19tb2R1bGU6IFwi5o+Q546wXCIsXHJcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcclxuICAgICAgICB9KVxyXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xyXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbixwYWdlVHMucGFnZU5hbWUuR2FtZVdhbGxldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=