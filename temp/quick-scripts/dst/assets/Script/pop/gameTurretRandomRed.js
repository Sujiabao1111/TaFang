
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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
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
    };
    gameTurretRandomRed.prototype.clickDoubleGet = function () {
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '合成炮塔奖励弹窗',
            ck_module: '领取奖励',
            active_ad_hcdg: "激励视频"
        });
        // AdController.loadAd(AdPosition.turretRandomRed, (res) => {
        cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: this.node, value: this.prizeNum, num: 10 });
        util_1.default.addTermCoin(this.prizeNum);
        this.closePage();
        // if(util.adPreObj[AdPosition.turretRandomRed]){
        //     util.preloadAd(AdPosition.turretRandomRed);
        // } 
        // }, () => {
        //     this.closePage();
        //     AssistCtr.showToastTip(t("tips.reward_obtain_failed"));
        // })
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
        // AdController.loadInfoAd(AdPosition.turretRandomRedView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
    };
    gameTurretRandomRed.prototype.onDisable = function () {
        // AdController.hideInfoAd(AdPosition.turretRandomRedView);        
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVUdXJyZXRSYW5kb21SZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHbEYseUNBQW9DO0FBRXBDLDJDQUFzQztBQUd0QyxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWlELHVDQUFNO0lBQXZEO1FBQUEscUVBaUVDO1FBOURHLG9CQUFjLEdBQWdCLElBQUksQ0FBQztRQUduQyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGNBQVEsR0FBVyxHQUFHLENBQUM7O0lBc0QzQixDQUFDO0lBcERHLG1DQUFLLEdBQUw7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNULENBQUM7SUFFRCxvQ0FBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDRDQUFjLEdBQWQ7UUFDSSxrQkFBUSxDQUFDLG1CQUFtQixDQUFDO1lBQ3pCLGdCQUFnQixFQUFFLFVBQVU7WUFDNUIsU0FBUyxFQUFFLE1BQU07WUFDakIsY0FBYyxFQUFDLE1BQU07U0FDeEIsQ0FBQyxDQUFBO1FBRUYsNkRBQTZEO1FBQ3pELEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNyRixjQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsaURBQWlEO1FBQ2pELGtEQUFrRDtRQUNsRCxLQUFLO1FBQ1QsYUFBYTtRQUNiLHdCQUF3QjtRQUN4Qiw4REFBOEQ7UUFFOUQsS0FBSztJQUNULENBQUM7SUFFRCx3Q0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7WUFDekIsZ0JBQWdCLEVBQUUsVUFBVTtZQUM1QixTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLGtCQUFRLENBQUMsd0JBQXdCLENBQUM7WUFDOUIsZ0JBQWdCLEVBQUUsVUFBVTtTQUMvQixDQUFDLENBQUE7UUFFRix3R0FBd0c7SUFDNUcsQ0FBQztJQUdELHVDQUFTLEdBQVQ7UUFDSSxtRUFBbUU7SUFDdkUsQ0FBQztJQTdERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOytEQUNhO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OERBQ1k7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDUTtJQVRULG1CQUFtQjtRQUR2QyxPQUFPO09BQ2EsbUJBQW1CLENBaUV2QztJQUFELDBCQUFDO0NBakVELEFBaUVDLENBakVnRCxnQkFBTSxHQWlFdEQ7a0JBakVvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xyXG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xyXG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XHJcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcclxuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcclxuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lVHVycmV0UmFuZG9tUmVkIGV4dGVuZHMgYmFzZVRzIHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBsYWJsZV9wcml6ZU51bTogY2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuX2Nsb3NlTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXplTnVtOiBudW1iZXIgPSA2MDA7XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5idG5fY2xvc2VOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5idG5fY2xvc2VOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSwgMylcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0RvdWJsZUdldCgpIHtcclxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogJ+WQiOaIkOeCruWhlOWlluWKseW8ueeqlycsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogJ+mihuWPluWlluWKsScsXHJcbiAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBBZENvbnRyb2xsZXIubG9hZEFkKEFkUG9zaXRpb24udHVycmV0UmFuZG9tUmVkLCAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOnRoaXMubm9kZSx2YWx1ZTogdGhpcy5wcml6ZU51bSxudW06MTB9KTtcclxuICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbih0aGlzLnByaXplTnVtKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAgICAgLy8gaWYodXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLnR1cnJldFJhbmRvbVJlZF0pe1xyXG4gICAgICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi50dXJyZXRSYW5kb21SZWQpO1xyXG4gICAgICAgICAgICAvLyB9IFxyXG4gICAgICAgIC8vIH0sICgpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuICAgICAgICAvLyAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KFwidGlwcy5yZXdhcmRfb2J0YWluX2ZhaWxlZFwiKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDbG9zZSgpe1xyXG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7ICAgICAgIFxyXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiAn5ZCI5oiQ54Ku5aGU5aWW5Yqx5by556qXJyxcclxuICAgICAgICAgICAgY2tfbW9kdWxlOiAn5pS+5byD5aWW5YqxJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcclxuICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLlkIjmiJDngq7loZTlpZblirHlvLnnqpdcIlxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24udHVycmV0UmFuZG9tUmVkVmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIC8vIEFkQ29udHJvbGxlci5oaWRlSW5mb0FkKEFkUG9zaXRpb24udHVycmV0UmFuZG9tUmVkVmlldyk7ICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=