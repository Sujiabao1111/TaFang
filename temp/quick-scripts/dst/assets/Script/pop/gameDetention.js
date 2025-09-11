
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameDetention.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3a7c/8OaxE2YriOKJymWux', 'gameDetention');
// Script/pop/gameDetention.ts

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
var baseTs_1 = require("../base/baseTs");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameDetention = /** @class */ (function (_super) {
    __extends(gameDetention, _super);
    function gameDetention() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.feed_node = null;
        return _this;
    }
    gameDetention.prototype.onEnable = function () {
    };
    gameDetention.prototype.onDisable = function () {
    };
    gameDetention.prototype.start = function () {
    };
    gameDetention.prototype.clickClose = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u633D\u7559\u5F39\u7A97",
            ck_module: "继续游戏"
        });
        this.closePage();
    };
    gameDetention.prototype.clickExit = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "\u633D\u7559\u5F39\u7A97",
            ck_module: "残忍离去"
        });
        XMSDK_1.default.exitGame();
        //退出时间
        util_1.default.setStorage(util_1.default.localDiary.offlineTime, new Date().getTime());
        XMSDK_1.default.trackUserProperties({
            synthesis_times_hcdg: util_1.default.userData.synthesis_All,
        });
        util_1.default.userData.synthesis_All = 0;
    };
    __decorate([
        property(cc.Node)
    ], gameDetention.prototype, "feed_node", void 0);
    gameDetention = __decorate([
        ccclass
    ], gameDetention);
    return gameDetention;
}(baseTs_1.default));
exports.default = gameDetention;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVEZXRlbnRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBR3BDLHFEQUFnRDtBQUNoRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFNO0lBQWpEO1FBQUEscUVBMENDO1FBdkNHLGVBQVMsR0FBWSxJQUFJLENBQUM7O0lBdUM5QixDQUFDO0lBckNHLGdDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsaUNBQVMsR0FBVDtJQUNBLENBQUM7SUFHRCw2QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELGtDQUFVLEdBQVY7UUFDSSxrQkFBUSxDQUFDLG1CQUFtQixDQUFDO1lBQ3pCLGdCQUFnQixFQUFFLDBCQUFNO1lBQ3hCLFNBQVMsRUFBRSxNQUFNO1NBQ3BCLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7WUFDekIsZ0JBQWdCLEVBQUUsMEJBQU07WUFDeEIsU0FBUyxFQUFFLE1BQU07U0FDcEIsQ0FBQyxDQUFBO1FBRUYsZUFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLE1BQU07UUFDTixjQUFJLENBQUMsVUFBVSxDQUFDLGNBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNsRSxlQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDdEIsb0JBQW9CLEVBQUUsY0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO1NBQ3BELENBQUMsQ0FBQztRQUNILGNBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBcENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1E7SUFIVCxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBMENqQztJQUFELG9CQUFDO0NBMUNELEFBMENDLENBMUMwQyxnQkFBTSxHQTBDaEQ7a0JBMUNvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XHJcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XHJcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lRGV0ZW50aW9uIGV4dGVuZHMgYmFzZVRzIHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgb25FbmFibGUoKXtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpe1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ2xvc2UoKXtcclxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IGDmjL3nlZnlvLnnqpdgLFxyXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi57un57ut5ri45oiPXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrRXhpdCgpe1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOaMveeVmeW8ueeql2AsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLmrovlv43nprvljrtcIlxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFhNU0RLLmV4aXRHYW1lKCk7XHJcbiAgICAgICAgLy/pgIDlh7rml7bpl7RcclxuICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5Lm9mZmxpbmVUaW1lLG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICBYTVNESy50cmFja1VzZXJQcm9wZXJ0aWVzKHtcclxuICAgICAgICAgICAgc3ludGhlc2lzX3RpbWVzX2hjZGc6IHV0aWwudXNlckRhdGEuc3ludGhlc2lzX0FsbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICB1dGlsLnVzZXJEYXRhLnN5bnRoZXNpc19BbGwgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG59XHJcbiJdfQ==