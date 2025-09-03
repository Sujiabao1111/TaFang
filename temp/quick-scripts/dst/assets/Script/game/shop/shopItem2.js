
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/shop/shopItem2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '32cdeOqhy1JN6chT9S5OIiO', 'shopItem2');
// Script/game/shop/shopItem2.ts

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
var NameTs_1 = require("../../common/NameTs");
var soundController_1 = require("../../soundController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var shopItem2 = /** @class */ (function (_super) {
    __extends(shopItem2, _super);
    function shopItem2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stateLabel = null;
        _this.pic = null;
        return _this;
        // update (dt) {}
    }
    shopItem2.prototype.start = function () {
    };
    shopItem2.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Shop_MonsterItem, function (res) {
            if (res == _this.initData.level) {
                _this.stateLabel.string = "选中";
            }
            else {
                _this.stateLabel.string = "";
            }
        }, this);
    };
    shopItem2.prototype.init = function (data) {
        // cc.resources.load()
        this.initData = data.data;
        this.stateLabel.string = data.id;
        this.node.zIndex = data.id;
    };
    /**
     * 点击
     */
    shopItem2.prototype.click = function () {
        soundController_1.default.singleton.clickAudio();
        cc.game.emit(NameTs_1.default.Game_Shop_UpData, this.initData.level);
        cc.game.emit(NameTs_1.default.Game_Shop_MonsterItem, this.initData.level);
    };
    __decorate([
        property({ type: cc.Label, displayName: "状态文本" })
    ], shopItem2.prototype, "stateLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "图片" })
    ], shopItem2.prototype, "pic", void 0);
    shopItem2 = __decorate([
        ccclass
    ], shopItem2);
    return shopItem2;
}(cc.Component));
exports.default = shopItem2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxzaG9wXFxzaG9wSXRlbTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLHlEQUFvRDtBQUU5QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTRDQztRQXpDVyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixTQUFHLEdBQWMsSUFBSSxDQUFDOztRQXFDOUIsaUJBQWlCO0lBQ3JCLENBQUM7SUFsQ0cseUJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQUEsaUJBVUM7UUFSRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLHFCQUFxQixFQUFDLFVBQUMsR0FBRztZQUN4QyxJQUFHLEdBQUcsSUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQztnQkFDeEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO2FBQ2hDO2lCQUFJO2dCQUNELEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzthQUMvQjtRQUNMLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUVaLENBQUM7SUFFRCx3QkFBSSxHQUFKLFVBQUssSUFBSTtRQUVMLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBSSxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILHlCQUFLLEdBQUw7UUFDSSx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxxQkFBcUIsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUF0Q0Q7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7aURBQ1Q7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUM7MENBQ2Q7SUFOYixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBNEM3QjtJQUFELGdCQUFDO0NBNUNELEFBNENDLENBNUNzQyxFQUFFLENBQUMsU0FBUyxHQTRDbEQ7a0JBNUNvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vLi4vc291bmRDb250cm9sbGVyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2hvcEl0ZW0yIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCxkaXNwbGF5TmFtZTpcIueKtuaAgeaWh+acrFwifSlcbiAgICBwcml2YXRlIHN0YXRlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsZGlzcGxheU5hbWU6XCLlm77niYdcIn0pXG4gICAgcHJpdmF0ZSBwaWM6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGluaXREYXRhOmFueTtcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIG9uTG9hZCgpe1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfU2hvcF9Nb25zdGVySXRlbSwocmVzKT0+e1xuICAgICAgICAgICAgaWYocmVzPT10aGlzLmluaXREYXRhLmxldmVsKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlTGFiZWwuc3RyaW5nID0gXCLpgInkuK1cIlxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLnN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICB9XG5cbiAgICBpbml0KGRhdGEpe1xuXG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKClcbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IGRhdGEuZGF0YTtcbiAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLnN0cmluZyA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggID0gZGF0YS5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7tcbiAgICAgKi9cbiAgICBjbGljaygpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Nob3BfVXBEYXRhLHRoaXMuaW5pdERhdGEubGV2ZWwpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfU2hvcF9Nb25zdGVySXRlbSx0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19