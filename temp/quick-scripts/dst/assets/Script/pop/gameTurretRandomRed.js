
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameTurretRandomRed.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '75956mHYulPqbXnOurfDPUc', 'gameTurretRandomRed');
// Script/pop/gameTurretRandomRed.ts

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
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var LanguageData_1 = require("../Language/LanguageData");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameTurretRandomRed = /** @class */ (function (_super) {
    __extends(gameTurretRandomRed, _super);
    function gameTurretRandomRed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_prizeNum = null;
        _this.btn_closeNode = null;
        _this.feed_node = null;
        _this.prizeNum = 600;
        return _this;
    }
    gameTurretRandomRed.prototype.start = function () {
        var _this = this;
        this.btn_closeNode.active = false;
        this.scheduleOnce(function () {
            _this.btn_closeNode.active = true;
        }, 3);
    };
    gameTurretRandomRed.prototype.onLoad = function () {
        if (!util_1.default.adPreObj[AdPosition_1.AdPosition.turretRandomRed]) {
            util_1.default.preloadAd(AdPosition_1.AdPosition.turretRandomRed);
        }
    };
    gameTurretRandomRed.prototype.clickDoubleGet = function () {
        var _this = this;
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '合成炮塔奖励弹窗',
            ck_module: '领取奖励',
            active_ad_hcdg: "激励视频"
        });
        AdController_1.default.loadAd(AdPosition_1.AdPosition.turretRandomRed, function (res) {
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.node, value: _this.prizeNum, num: 10 });
            util_1.default.addTermCoin(_this.prizeNum);
            _this.closePage();
            if (util_1.default.adPreObj[AdPosition_1.AdPosition.turretRandomRed]) {
                util_1.default.preloadAd(AdPosition_1.AdPosition.turretRandomRed);
            }
        }, function () {
            _this.closePage();
            AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t("tips.reward_obtain_failed"));
        });
    };
    gameTurretRandomRed.prototype.clickClose = function () {
        this.closePage();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '合成炮塔奖励弹窗',
            ck_module: '放弃奖励'
        });
    };
    gameTurretRandomRed.prototype.onEnable = function () {
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "合成炮塔奖励弹窗"
        });
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.turretRandomRedView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
    };
    gameTurretRandomRed.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.turretRandomRedView);
    };
    __decorate([
        property(cc.RichText)
    ], gameTurretRandomRed.prototype, "lable_prizeNum", void 0);
    __decorate([
        property(cc.Node)
    ], gameTurretRandomRed.prototype, "btn_closeNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameTurretRandomRed.prototype, "feed_node", void 0);
    gameTurretRandomRed = __decorate([
        ccclass
    ], gameTurretRandomRed);
    return gameTurretRandomRed;
}(baseTs_1.default));
exports.default = gameTurretRandomRed;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUdXJyZXRSYW5kb21SZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQWdEO0FBQ2hELHlDQUFvQztBQUNwQyxtREFBa0Q7QUFDbEQsMkNBQXNDO0FBQ3RDLHlEQUE2QztBQUM3QyxzRUFBaUU7QUFDakUsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFpRCx1Q0FBTTtJQUF2RDtRQUFBLHFFQW1FQztRQWhFRyxvQkFBYyxHQUFnQixJQUFJLENBQUM7UUFHbkMsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixjQUFRLEdBQVcsR0FBRyxDQUFDOztJQXdEM0IsQ0FBQztJQXRERyxtQ0FBSyxHQUFMO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNyQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDVCxDQUFDO0lBRUQsb0NBQU0sR0FBTjtRQUNJLElBQUcsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLEVBQUM7WUFDMUMsY0FBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVELDRDQUFjLEdBQWQ7UUFBQSxpQkFtQkM7UUFsQkcsa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQztZQUN6QixnQkFBZ0IsRUFBRSxVQUFVO1lBQzVCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLGNBQWMsRUFBQyxNQUFNO1NBQ3hCLENBQUMsQ0FBQTtRQUVGLHNCQUFZLENBQUMsTUFBTSxDQUFDLHVCQUFVLENBQUMsZUFBZSxFQUFFLFVBQUMsR0FBRztZQUNoRCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFDckYsY0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFDO2dCQUN6QyxjQUFJLENBQUMsU0FBUyxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDOUM7UUFDTCxDQUFDLEVBQUU7WUFDQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIscUJBQVMsQ0FBQyxZQUFZLENBQUMsZ0JBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7UUFFM0QsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsd0NBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixrQkFBUSxDQUFDLG1CQUFtQixDQUFDO1lBQ3pCLGdCQUFnQixFQUFFLFVBQVU7WUFDNUIsU0FBUyxFQUFFLE1BQU07U0FDcEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxrQkFBUSxDQUFDLHdCQUF3QixDQUFDO1lBQzlCLGdCQUFnQixFQUFFLFVBQVU7U0FDL0IsQ0FBQyxDQUFBO1FBRUYsc0JBQVksQ0FBQyxVQUFVLENBQUMsdUJBQVUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsd0JBQXdCO0lBQ3pHLENBQUM7SUFHRCx1Q0FBUyxHQUFUO1FBQ0ksc0JBQVksQ0FBQyxVQUFVLENBQUMsdUJBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUEvREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrREFDYTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MERBQ1E7SUFUVCxtQkFBbUI7UUFEdkMsT0FBTztPQUNhLG1CQUFtQixDQW1FdkM7SUFBRCwwQkFBQztDQW5FRCxBQW1FQyxDQW5FZ0QsZ0JBQU0sR0FtRXREO2tCQW5Fb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XHJcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVR1cnJldFJhbmRvbVJlZCBleHRlbmRzIGJhc2VUcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgbGFibGVfcHJpemVOdW06IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bl9jbG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml6ZU51bTogbnVtYmVyID0gNjAwO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuYnRuX2Nsb3NlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2Nsb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0sIDMpXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgaWYoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi50dXJyZXRSYW5kb21SZWRdKXtcclxuICAgICAgICAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi50dXJyZXRSYW5kb21SZWQpO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tEb3VibGVHZXQoKSB7XHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICflkIjmiJDngq7loZTlpZblirHlvLnnqpcnLFxyXG4gICAgICAgICAgICBja19tb2R1bGU6ICfpooblj5blpZblirEnLFxyXG4gICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzpcIua/gOWKseinhumikVwiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLnR1cnJldFJhbmRvbVJlZCwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTp0aGlzLm5vZGUsdmFsdWU6IHRoaXMucHJpemVOdW0sbnVtOjEwfSk7XHJcbiAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4odGhpcy5wcml6ZU51bSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgIGlmKHV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi50dXJyZXRSYW5kb21SZWRdKXtcclxuICAgICAgICAgICAgICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24udHVycmV0UmFuZG9tUmVkKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAodChcInRpcHMucmV3YXJkX29idGFpbl9mYWlsZWRcIikpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ2xvc2UoKXtcclxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpOyAgICAgICBcclxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogJ+WQiOaIkOeCruWhlOWlluWKseW8ueeqlycsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogJ+aUvuW8g+WlluWKsSdcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5ZCI5oiQ54Ku5aGU5aWW5Yqx5by556qXXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLnR1cnJldFJhbmRvbVJlZFZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLnR1cnJldFJhbmRvbVJlZFZpZXcpOyAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19