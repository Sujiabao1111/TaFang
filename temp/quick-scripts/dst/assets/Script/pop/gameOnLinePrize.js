
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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
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
        AdController_1.default.loadAd(AdPosition_1.AdPosition.VideoOnLinePrize, function (res) {
            // if(this.addGold){
            _this.addGold = _this.addGold * 2;
            //     this.lable_addGold.string = "+"+this.addGold+"红包币";
            // } 
            // this.showGetBtn();
            // if(this.titleSprFrame&&this.titleSprFrame[1]){
            //     this.titleSpr.spriteFrame = this.titleSprFrame[1];
            // }
            _this.clickGet();
        }, function () {
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
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
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.InfoGameOnLinePrize, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
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
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.InfoGameOnLinePrize);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVPbkxpbmVQcml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBc0M7QUFDdEMsc0VBQWlFO0FBQ2pFLGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNkMsbUNBQU07SUFBbkQ7UUFBQSxxRUF1SkM7UUFwSkcsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBR2xCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsbUJBQWEsR0FBeUIsRUFBRSxDQUFDO1FBR2pELGVBQVMsR0FBVyxJQUFJLENBQUM7UUFHekIsYUFBTyxHQUFXLElBQUksQ0FBQztRQUd2QixhQUFPLEdBQVcsSUFBSSxDQUFDO1FBR2Ysb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFHL0Isa0JBQVksR0FBVyxJQUFJLENBQUM7UUFFNUIsYUFBTyxHQUFHLENBQUMsQ0FBQztRQUVaLGdCQUFVLEdBQUcsS0FBSyxDQUFDLENBQUksU0FBUzs7SUFxSDVDLENBQUM7SUFuSEcsZ0NBQU0sR0FBTjtRQUVJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FDckMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQ2hELENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZCxD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QztzREFDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MERBQ3dCO0lBR2pEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDSztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxDQUFDOzJEQUNOO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDO3lEQUNOO0lBOUJuQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBdUpuQztJQUFELHNCQUFDO0NBdkpELEFBdUpDLENBdko0QyxnQkFBTSxHQXVKbEQ7a0JBdkpvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVPbkxpbmVQcml6ZSBleHRlbmRzIGJhc2VUcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBub2RlX2dvbGQ6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFibGVfYWRkR29sZDpjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIHRpdGxlU3ByOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgcHJpdmF0ZSB0aXRsZVNwckZyYW1lOkFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuQ29tbW9uOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bl9nZXQ6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5YCN5pWw6YeR5biBXCJ9KVxyXG4gICAgcHJpdmF0ZSBsYWJsZV9hZGRHb2xkMjpjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YCN5pWwXCJ9KVxyXG4gICAgcHJpdmF0ZSBtdWx0aXBsZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRHb2xkID0gMDsgICAgICAgIFxyXG5cclxuICAgIHByaXZhdGUgaXNDbGlja0dldCA9IGZhbHNlOyAgICAvL+aYr+WQpueCueWHu+S6humihuWPllxyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubXVsdGlwbGVOb2RlKS5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLHthbmdsZToxMH0pLnRvKC4yLHthbmdsZTowfSlcclxuICAgICAgICApLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tEb3VibGUoKXtcclxuICAgICAgICBpZih0aGlzLmlzQ2xpY2tHZXQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNDbGlja0dldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ2xpY2tHZXQgPSBmYWxzZTtcclxuICAgICAgICB9LCAyKTtcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5Zyo57q/5pe26ZW/5by556qXXCIsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTpcIuWPjOWAjemihuWPllwiLFxyXG4gICAgICAgICAgICBhY3RpdmVfYWRfaGNkZzpcIua/gOWKseinhumikVwiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLlnKjnur/ml7bplb/nv7vlgI3miJDlip/lvLnnqpdcIixcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24uVmlkZW9PbkxpbmVQcml6ZSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmFkZEdvbGQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRHb2xkID0gdGhpcy5hZGRHb2xkICogMjtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMubGFibGVfYWRkR29sZC5zdHJpbmcgPSBcIitcIit0aGlzLmFkZEdvbGQrXCLnuqLljIXluIFcIjtcclxuICAgICAgICAgICAgLy8gfSBcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd0dldEJ0bigpO1xyXG4gICAgICAgICAgICAvLyBpZih0aGlzLnRpdGxlU3ByRnJhbWUmJnRoaXMudGl0bGVTcHJGcmFtZVsxXSl7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnRpdGxlU3ByLnNwcml0ZUZyYW1lID0gdGhpcy50aXRsZVNwckZyYW1lWzFdO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNsaWNrR2V0KCk7XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xyXG4gICAgICAgIH0pICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDb21tb24oKXtcclxuICAgICAgICBpZih0aGlzLmlzQ2xpY2tHZXQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNDbGlja0dldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ2xpY2tHZXQgPSBmYWxzZTtcclxuICAgICAgICB9LCAyKTtcclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5Zyo57q/5pe26ZW/5by556qXXCIsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTpcIuaZrumAmumihuWPllwiXHJcbiAgICAgICAgfSkgICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2xpY2tHZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0dldCgpe1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuWcqOe6v+aXtumVv+W8ueeql1wiLFxyXG4gICAgICAgICAgICBja19tb2R1bGU6XCLmlLbkuItcIlxyXG4gICAgICAgIH0pICAgICAgIFxyXG5cclxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5ub2RlX2dvbGQsIHZhbHVlOiB0aGlzLmFkZEdvbGQsbnVtOjEwfSk7XHJcbiAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLmFkZEdvbGQpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkYXRhKXtcclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9hZGRHb2xkLnN0cmluZyA9IGArJHtkYXRhLnBvaW50fWArXCLnuqLljIXluIFcIjtcclxuICAgICAgICAgICAgdGhpcy5hZGRHb2xkID0gZGF0YS5wb2ludDtcclxuICAgICAgICAgICAgdGhpcy5sYWJsZV9hZGRHb2xkMi5zdHJpbmcgPSBkYXRhLnBvaW50KjIrXCJcIjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICBcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxhYmxlX2FkZEdvbGQuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5hZGRHb2xkID0gMDtcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dHZXRCdG4oKXsgICAgXHJcbiAgICAgICAgaWYodGhpcy5idG5Ob2RlKXtcclxuICAgICAgICAgICAgdGhpcy5idG5Ob2RlLmFjdGl2ZSA9IGZhbHNlOyAgXHJcbiAgICAgICAgfSAgIFxyXG4gICAgICAgIGlmKHRoaXMuYnRuX2dldCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2dldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5JbmZvR2FtZU9uTGluZVByaXplLCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxyXG5cclxuICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOlwi5Zyo57q/5pe26ZW/5by556qXXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnRpdGxlU3ByLnNwcml0ZUZyYW1lID0gdGhpcy50aXRsZVNwckZyYW1lWzBdO1xyXG4gICAgICAgIGlmKHRoaXMuYnRuTm9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJ0bkNvbW1vbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZSkgdGhpcy5idG5Db21tb24uYWN0aXZlID0gdHJ1ZTsgICAgIFxyXG4gICAgICAgIH0sIDMpO1xyXG5cclxuICAgICAgICB0aGlzLmJ0bl9nZXQuYWN0aXZlID0gZmFsc2U7ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpeyAgICBcclxuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkluZm9HYW1lT25MaW5lUHJpemUpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==