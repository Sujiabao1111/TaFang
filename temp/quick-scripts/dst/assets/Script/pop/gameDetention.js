
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
var baseTs_1 = require("../base/baseTs");
var AdPosition_1 = require("../common/AdPosition");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
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
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.InfoDetentionView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "挽留弹窗"
        });
    };
    gameDetention.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.InfoDetentionView);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVEZXRlbnRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCxzRUFBaUU7QUFDakUscURBQWdEO0FBQ2hELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQU07SUFBakQ7UUFBQSxxRUErQ0M7UUE1Q0csZUFBUyxHQUFZLElBQUksQ0FBQzs7SUE0QzlCLENBQUM7SUExQ0csZ0NBQVEsR0FBUjtRQUNJLHNCQUFZLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBLHdCQUF3QjtRQUVuRyxrQkFBUSxDQUFDLHdCQUF3QixDQUFDO1lBQzlCLGdCQUFnQixFQUFDLE1BQU07U0FDMUIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFDSSxzQkFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUdELDZCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNJLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7WUFDekIsZ0JBQWdCLEVBQUUsMEJBQU07WUFDeEIsU0FBUyxFQUFFLE1BQU07U0FDcEIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksa0JBQVEsQ0FBQyxtQkFBbUIsQ0FBQztZQUN6QixnQkFBZ0IsRUFBRSwwQkFBTTtZQUN4QixTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUE7UUFFRixlQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsTUFBTTtRQUNOLGNBQUksQ0FBQyxVQUFVLENBQUMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLGVBQUssQ0FBQyxtQkFBbUIsQ0FBQztZQUN0QixvQkFBb0IsRUFBRSxjQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7U0FDcEQsQ0FBQyxDQUFDO1FBQ0gsY0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUF6Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUTtJQUhULGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0ErQ2pDO0lBQUQsb0JBQUM7Q0EvQ0QsQUErQ0MsQ0EvQzBDLGdCQUFNLEdBK0NoRDtrQkEvQ29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xyXG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XHJcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVEZXRlbnRpb24gZXh0ZW5kcyBiYXNlVHMge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uSW5mb0RldGVudGlvblZpZXcsIDYzNiwgdGhpcy5mZWVkX25vZGUpOy8vNjM2OmZlZWROb2Rl5L+h5oGv5rWB5a655Zmo6IqC54K555qE5a695bqmXHJcblxyXG4gICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6XCLmjL3nlZnlvLnnqpdcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCl7XHJcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5JbmZvRGV0ZW50aW9uVmlldyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDbG9zZSgpe1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogYOaMveeVmeW8ueeql2AsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLnu6fnu63muLjmiI9cIlxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tFeGl0KCl7XHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg5oy955WZ5by556qXYCxcclxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaui+W/jeemu+WOu1wiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgWE1TREsuZXhpdEdhbWUoKTtcclxuICAgICAgICAvL+mAgOWHuuaXtumXtFxyXG4gICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkub2ZmbGluZVRpbWUsbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgICAgIFhNU0RLLnRyYWNrVXNlclByb3BlcnRpZXMoe1xyXG4gICAgICAgICAgICBzeW50aGVzaXNfdGltZXNfaGNkZzogdXRpbC51c2VyRGF0YS5zeW50aGVzaXNfQWxsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHV0aWwudXNlckRhdGEuc3ludGhlc2lzX0FsbCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuIl19