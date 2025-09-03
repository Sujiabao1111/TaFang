
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTYXZpbmdQb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHlDQUFvQztBQUVwQywyQ0FBMkQ7QUFDM0QsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFFOUMsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFDaEMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFNO0lBQWpEO1FBQUEscUVBeUpDO1FBdEpXLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixxQkFBZSxHQUFXLElBQUksQ0FBQztRQUd2QyxxQkFBZSxHQUFhLElBQUksQ0FBQyxDQUFDLE1BQU07UUFHaEMsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsVUFBSSxHQUFVLENBQUMsQ0FBQyxDQUFBLE1BQU07O1FBb0k5QixpQkFBaUI7SUFDckIsQ0FBQztJQW5JRyw4QkFBTSxHQUFOO1FBQUEsaUJBb0JDO1FBbEJHLE1BQU07UUFDTixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLHdCQUF3QixFQUFDLFVBQUMsR0FBRztZQUUzQyxJQUFHLEdBQUcsSUFBRSxtQkFBVSxDQUFDLElBQUksRUFBQztnQkFDcEIsSUFBSSxRQUFRLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuRDtRQUVMLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVSLEVBQUUs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QUNWO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxDQUFDOzBEQUNMO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFlBQVksRUFBQyxDQUFDOzBEQUNuQjtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQztzREFDVDtJQWxCbkIsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXlKakM7SUFBRCxvQkFBQztDQXpKRCxBQXlKQyxDQXpKMEMsZ0JBQU0sR0F5SmhEO2tCQXpKb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgY3VzdG9tc0luZm8sIHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lU2F2aW5nUG90IGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIumHkeW4gVwifSlcbiAgICBwcml2YXRlIGNvaW5MYWJlbDpjYy5MYWJlbCA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5YCS6K6h5pe2XCJ9KVxuICAgIHByaXZhdGUgdGltZUxhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi6aKG5Y+W5oyJ6ZKuXCJ9KVxuICAgIHByaXZhdGUgZ2V0QnRuTm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuaYjuaXpeaMiemSrlwifSlcbiAgICBwcml2YXRlIHRvbW9ycm93QnRuTm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuV2lkZ2V0LGRpc3BsYXlOYW1lOlwi5o+Q546w5oyJ6ZKud2lkZ2V0XCJ9KVxuICAgIHdhbGxldEJ0bldpZGdldDpjYy5XaWRnZXQgPSBudWxsOyAvL+aPkOeOsOaMiemSrlxuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi6ZKx5YyF6YeR5biBXCJ9KVxuICAgIHByaXZhdGUgd2FsbGV0TGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjb2luOm51bWJlciA9IDA7Ly/pmo/mnLrph5HluIFcbiAgICBcbiAgICBvbkxvYWQoKXtcblxuICAgICAgICAvL+aVsOaNruabtOaWsFxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1ZpZXdfVXNlckRhdGFVcGRhdGEsKHJlcyk9PntcblxuICAgICAgICAgICAgaWYocmVzPT11cGRhdGVUeXBlLmNvaW4pe1xuICAgICAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHV0aWwudXNlckRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsZXRMYWJlbC5zdHJpbmcgPSBTdHJpbmcodXNlckRhdGEuY29pbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVmlld19Vc2VyRGF0YVVwZGF0YSx1cGRhdGVUeXBlLmNvaW4pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy53YWxsZXRCdG5XaWRnZXQudG9wICs9IE51bWJlcih1dGlsLmlwaG9uZVhUb3ApO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWtmOmSsee9kOW8ueeql1wiLFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyWICovXG4gICAgaW5pdCgpe1xuXG4gICAgICAgIHV0aWwucG9zdCh7XG4gICAgICAgICAgICB1cmw6VXJsQ29uc3Quc2F2aW5nUG90SW5kZXgsXG4gICAgICAgICAgICBzdWNjZXNzOihkYXRhKT0+e1xuICAgICAgICAgICAgICAgIGxldCBzdGF0ZTpudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvaW4gPSBkYXRhLnBvaW50O1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IGRhdGEuc3RhdHVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzdGF0ZT09MCl7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TYXZpbmdQb3N0X0ljb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRvbW9ycm93QnRuTm9kZSYmKHRoaXMudG9tb3Jyb3dCdG5Ob2RlLmFjdGl2ZSA9IHN0YXRlPT0wP3RydWU6ZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QnRuTm9kZSYmKHRoaXMuZ2V0QnRuTm9kZS5hY3RpdmUgPSBzdGF0ZT09MT90cnVlOmZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMudG9tb3Jyb3dCdG5Ob2RlJiYodGhpcy50b21vcnJvd0J0bk5vZGUuYWN0aXZlID0gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCdG5Ob2RlJiYodGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSA9IGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIue9kee7nOmXrumimO+8jOivt+eojeWQju+8gVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKuiuvue9ruS4nOilvyAqL1xuICAgIHNldFN0YXRlKCl7XG4gICAgICAgIHRoaXMuY29pbkxhYmVsLnN0cmluZyA9IHRoaXMuY29pbitcIue6ouWMheW4gVwiO1xuICAgICAgICB0aGlzLmdldEJ0bk5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgaWYodGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSl7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmdldEJ0bk5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oKS50byguNSx7c2NhbGU6MS4xfSkudG8oLjUse3NjYWxlOjF9KVxuICAgICAgICAgICAgKS5zdGFydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy50b21vcnJvd0J0bk5vZGUuYWN0aXZlKXtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID1cIuWAkuiuoeaXtiBcIit0b29sLmZvcm1hdERhdGEoNSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID1cIuWAkuiuoeaXtiBcIisgdG9vbC5mb3JtYXREYXRhKDUpO1xuICAgICAgICAgICAgICAgIGlmKHRvb2wuZm9ybWF0RGF0YSg1KT09XCIwMDowMDowMFwiKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJ0bigpe1xuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIHV0aWwucG9zdCh7XG4gICAgICAgICAgICB1cmw6VXJsQ29uc3Quc2F2aW5nUG90UmVjZWl2ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6KCk9PntcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWtmOmSsee9kOW8ueeql1wiLFxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfZW50ZXI6IFwi6aKG5Y+WXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgc2F2aW5nUG90SWNvbjpjYy5Ob2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwic2F2aW5nUG90XCIpfHx0aGlzLm5vZGU7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLHtub2RlOnNhdmluZ1BvdEljb24sdmFsdWU6dGhpcy5jb2luLG51bToxMH0pO1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TYXZpbmdQb3N0X0ljb24pO1xuICAgICAgICAgICAgICAgIHRoaXMudG9tb3Jyb3dCdG5Ob2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCdG5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6I635Y+WXCIrdGhpcy5jb2luK1wi57qi5YyF5biBXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLnvZHnu5zpl67popjvvIzor7fnqI3lkI7vvIFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63pobXpnaJcbiAgICAgKi9cbiAgICBjbG9zZUJ0bigpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5a2Y6ZKx572Q5by556qXXCIsXG4gICAgICAgICAgICBkaWFsb2dfZW50ZXI6IFwi5YWz6ZetXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgfVxuXG4gICAgXG4gICAgLyoq5o+Q546wICovXG4gICAgd2FsbGV0QnRuKCl7XG4gICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIui9rOebmFwiLFxuICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogXCLmj5DnjrBcIixcbiAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImljb25cIixcbiAgICAgICAgfSlcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3BlbixwYWdlVHMucGFnZU5hbWUuR2FtZVdhbGxldCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==