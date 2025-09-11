
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameOnLinePrize.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '14290wpYXVMv6nPe96f+voY', 'gameOnLinePrize');
// Script/pop/gameOnLinePrize.ts

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
var NameTs_1 = require("../common/NameTs");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameOnLinePrize = /** @class */ (function (_super) {
    __extends(gameOnLinePrize, _super);
    function gameOnLinePrize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_gold = null;
        _this.lable_addGold = null;
        _this.feed_node = null;
        _this.titleSpr = null;
        _this.titleSprFrame = [];
        _this.btnCommon = null;
        _this.btnNode = null;
        _this.btn_get = null;
        _this.lable_addGold2 = null;
        _this.multipleNode = null;
        _this.addGold = 0;
        _this.isClickGet = false; //是否点击了领取
        return _this;
    }
    gameOnLinePrize.prototype.onLoad = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    gameOnLinePrize.prototype.clickDouble = function () {
        var _this = this;
        if (this.isClickGet) {
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(function () {
            _this.isClickGet = false;
        }, 2);
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "在线时长弹窗",
            ck_module: "双倍领取",
            active_ad_hcdg: "激励视频"
        });
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "在线时长翻倍成功弹窗",
        });
        // AdController.loadAd(AdPosition.VideoOnLinePrize, (res) => {
        // if(this.addGold){
        this.addGold = this.addGold * 2;
        //     this.lable_addGold.string = "+"+this.addGold+"红包币";
        // } 
        // this.showGetBtn();
        // if(this.titleSprFrame&&this.titleSprFrame[1]){
        //     this.titleSpr.spriteFrame = this.titleSprFrame[1];
        // }
        this.clickGet();
        // }, () => {
        //     AssistCtr.showToastTip("加载视频失败，请稍后！");
        // })               
    };
    gameOnLinePrize.prototype.clickCommon = function () {
        var _this = this;
        if (this.isClickGet) {
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(function () {
            _this.isClickGet = false;
        }, 2);
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "在线时长弹窗",
            ck_module: "普通领取"
        });
        this.clickGet();
    };
    gameOnLinePrize.prototype.clickGet = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: "在线时长弹窗",
            ck_module: "收下"
        });
        cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: this.node_gold, value: this.addGold, num: 10 });
        util_1.default.addTermCoin(this.addGold);
        this.closePage();
    };
    gameOnLinePrize.prototype.init = function (data) {
        if (data) {
            this.lable_addGold.string = "+" + data.point + "红包币";
            this.addGold = data.point;
            this.lable_addGold2.string = data.point * 2 + "";
        }
        else {
            this.lable_addGold.string = "";
            this.addGold = 0;
        }
    };
    gameOnLinePrize.prototype.showGetBtn = function () {
        if (this.btnNode) {
            this.btnNode.active = false;
        }
        if (this.btn_get) {
            this.btn_get.active = true;
        }
    };
    gameOnLinePrize.prototype.onEnable = function () {
        var _this = this;
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "在线时长弹窗"
        });
        this.titleSpr.spriteFrame = this.titleSprFrame[0];
        if (this.btnNode) {
            this.btnNode.active = true;
        }
        this.btnCommon.active = false;
        this.scheduleOnce(function () {
            if (_this.node)
                _this.btnCommon.active = true;
        }, 3);
        this.btn_get.active = false;
    };
    gameOnLinePrize.prototype.onDisable = function () {
    };
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "node_gold", void 0);
    __decorate([
        property(cc.Label)
    ], gameOnLinePrize.prototype, "lable_addGold", void 0);
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "feed_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], gameOnLinePrize.prototype, "titleSpr", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], gameOnLinePrize.prototype, "titleSprFrame", void 0);
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "btnCommon", void 0);
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "btnNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameOnLinePrize.prototype, "btn_get", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数金币" })
    ], gameOnLinePrize.prototype, "lable_addGold2", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameOnLinePrize.prototype, "multipleNode", void 0);
    gameOnLinePrize = __decorate([
        ccclass
    ], gameOnLinePrize);
    return gameOnLinePrize;
}(baseTs_1.default));
exports.default = gameOnLinePrize;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVPbkxpbmVQcml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBb0M7QUFFcEMsMkNBQXNDO0FBRXRDLGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQU07SUFBbkQ7UUFBQSxxRUFxSkM7UUFsSkcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBR2xCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFHM0IsbUJBQWEsR0FBMEIsRUFBRSxDQUFDO1FBR2xELGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR2hCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGFBQU8sR0FBRyxDQUFDLENBQUM7UUFFWixnQkFBVSxHQUFHLEtBQUssQ0FBQyxDQUFJLFNBQVM7O0lBbUg1QyxDQUFDO0lBakhHLGdDQUFNLEdBQU47UUFFSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQ3JDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUN4RCxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFBQSxpQkFrQ0M7UUFqQ0cs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QUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7MkRBQ1Y7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7eURBQ1Y7SUE5QnBCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0FxSm5DO0lBQUQsc0JBQUM7Q0FySkQsQUFxSkMsQ0FySjRDLGdCQUFNLEdBcUpsRDtrQkFySm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xyXG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xyXG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XHJcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lT25MaW5lUHJpemUgZXh0ZW5kcyBiYXNlVHMge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbm9kZV9nb2xkOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJsZV9hZGRHb2xkOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIHRpdGxlU3ByOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHByaXZhdGUgdGl0bGVTcHJGcmFtZTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5Db21tb246IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5fZ2V0OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5YCN5pWw6YeR5biBXCIgfSlcclxuICAgIHByaXZhdGUgbGFibGVfYWRkR29sZDI6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLlgI3mlbBcIiB9KVxyXG4gICAgcHJpdmF0ZSBtdWx0aXBsZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgYWRkR29sZCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NsaWNrR2V0ID0gZmFsc2U7ICAgIC8v5piv5ZCm54K55Ye75LqG6aKG5Y+WXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm11bHRpcGxlTm9kZSkucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMywgeyBhbmdsZTogMTAgfSkudG8oLjIsIHsgYW5nbGU6IDAgfSlcclxuICAgICAgICApLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tEb3VibGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDbGlja0dldCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNDbGlja0dldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ2xpY2tHZXQgPSBmYWxzZTtcclxuICAgICAgICB9LCAyKTtcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5Zyo57q/5pe26ZW/5by556qXXCIsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLlj4zlgI3pooblj5ZcIixcclxuICAgICAgICAgICAgYWN0aXZlX2FkX2hjZGc6IFwi5r+A5Yqx6KeG6aKRXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWcqOe6v+aXtumVv+e/u+WAjeaIkOWKn+W8ueeql1wiLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5WaWRlb09uTGluZVByaXplLCAocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gaWYodGhpcy5hZGRHb2xkKXtcclxuICAgICAgICB0aGlzLmFkZEdvbGQgPSB0aGlzLmFkZEdvbGQgKiAyO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxhYmxlX2FkZEdvbGQuc3RyaW5nID0gXCIrXCIrdGhpcy5hZGRHb2xkK1wi57qi5YyF5biBXCI7XHJcbiAgICAgICAgLy8gfSBcclxuXHJcbiAgICAgICAgLy8gdGhpcy5zaG93R2V0QnRuKCk7XHJcbiAgICAgICAgLy8gaWYodGhpcy50aXRsZVNwckZyYW1lJiZ0aGlzLnRpdGxlU3ByRnJhbWVbMV0pe1xyXG4gICAgICAgIC8vICAgICB0aGlzLnRpdGxlU3ByLnNwcml0ZUZyYW1lID0gdGhpcy50aXRsZVNwckZyYW1lWzFdO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGlja0dldCgpO1xyXG4gICAgICAgIC8vIH0sICgpID0+IHtcclxuICAgICAgICAvLyAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcclxuICAgICAgICAvLyB9KSAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ29tbW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ2xpY2tHZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzQ2xpY2tHZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0NsaWNrR2V0ID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMik7XHJcblxyXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWcqOe6v+aXtumVv+W8ueeql1wiLFxyXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5pmu6YCa6aKG5Y+WXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuY2xpY2tHZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0dldCgpIHtcclxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLlnKjnur/ml7bplb/lvLnnqpdcIixcclxuICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaUtuS4i1wiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMubm9kZV9nb2xkLCB2YWx1ZTogdGhpcy5hZGRHb2xkLCBudW06IDEwIH0pO1xyXG4gICAgICAgIHV0aWwuYWRkVGVybUNvaW4odGhpcy5hZGRHb2xkKTtcclxuICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFibGVfYWRkR29sZC5zdHJpbmcgPSBgKyR7ZGF0YS5wb2ludH1gICsgXCLnuqLljIXluIFcIjtcclxuICAgICAgICAgICAgdGhpcy5hZGRHb2xkID0gZGF0YS5wb2ludDtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9hZGRHb2xkMi5zdHJpbmcgPSBkYXRhLnBvaW50ICogMiArIFwiXCI7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9hZGRHb2xkLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkR29sZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dHZXRCdG4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYnRuTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmJ0bl9nZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5idG5fZ2V0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG5cclxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWcqOe6v+aXtumVv+W8ueeql1wiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy50aXRsZVNwci5zcHJpdGVGcmFtZSA9IHRoaXMudGl0bGVTcHJGcmFtZVswXTtcclxuICAgICAgICBpZiAodGhpcy5idG5Ob2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJ0bkNvbW1vbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUpIHRoaXMuYnRuQ29tbW9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSwgMyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnRuX2dldC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==