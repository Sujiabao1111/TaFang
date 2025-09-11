
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameGetOtherTurret.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7b077XHhedFDYlazoDAQKP+', 'gameGetOtherTurret');
// Script/pop/gameGetOtherTurret.ts

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
var NameTs_1 = require("../common/NameTs");
var LanguageData_1 = require("../Language/LanguageData");
var soundController_1 = require("../soundController");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameGetOtherTurret = /** @class */ (function (_super) {
    __extends(gameGetOtherTurret, _super);
    function gameGetOtherTurret() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numLabel = null;
        // @property({type:cc.Node,displayName:"光"})
        // private light:cc.Node = null;
        _this.turretBody = null;
        _this.turretFoot = null;
        _this.multipleNode = null;
        _this.lable_addGold2 = null;
        _this.ArrBtn = [];
        _this.feed_node = null;
        /**金币 */
        _this.num = 0;
        _this.isVideo = false;
        return _this;
    }
    gameGetOtherTurret.prototype.onLoad = function () {
    };
    gameGetOtherTurret.prototype.start = function () {
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**初始化 */
    gameGetOtherTurret.prototype.init = function (data) {
        var _this = this;
        this.initData = util_1.default.GetTurretData(data);
        // this.num = Tools.GetRandom(3,8);
        this.num = 2;
        this.numLabel.string = "+" + this.num + LanguageData_1.t("main.炮塔");
        this.lable_addGold2.string = this.num * 3 + "";
        this.loadSprite("body", function (res) {
            _this.turretBody && (_this.turretBody.spriteFrame = res);
        });
        this.loadSprite("foot", function (res) {
            if (_this.turretFoot && res) {
                _this.turretFoot.node.active = true;
                _this.turretFoot.spriteFrame = res;
            }
            else {
                _this.turretFoot.node.active = false;
            }
            if (Number(_this.initData.spriteFootY) > 0) {
                _this.turretFoot && (_this.turretFoot.node.y = Number(_this.initData.spriteFootY));
            }
        });
        this.ArrBtn[0].active = this.ArrBtn[1].active = true;
        this.ArrBtn[2].active = false;
        this.isVideo = false;
    };
    /**
     * 获取
     */
    gameGetOtherTurret.prototype.getBtn = function (e, res) {
        soundController_1.default.singleton.clickAudio();
        this.isVideo = res == 1; //是否看视频
        this.successFn();
    };
    /**获取宝塔 */
    gameGetOtherTurret.prototype.successFn = function () {
        var num = this.num * (this.isVideo ? 3 : 1);
        this.closePage();
        util_1.default.userData.airborneCount -= 1;
        util_1.default.productTurret(num);
        cc.game.emit(NameTs_1.default.Game_Effect_turret, { node: this.node, num: num });
        AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t('main.Got_turrets', num));
    };
    /**看完视频 */
    gameGetOtherTurret.prototype.videoShow = function () {
        this.numLabel.string = "+" + this.num * (this.isVideo ? 3 : 1);
        this.ArrBtn[0].active = this.ArrBtn[1].active = false;
        this.ArrBtn[2].active = true;
    };
    /**
      * 加载图片
      */
    gameGetOtherTurret.prototype.loadSprite = function (name, call) {
        cc.resources.load(this.initData[name], cc.SpriteFrame, function (err, res) {
            if (err) {
                console.error("找不到该图片", err);
            }
            call(res);
        });
    };
    __decorate([
        property({ type: cc.Label, displayName: "数量" })
    ], gameGetOtherTurret.prototype, "numLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔身" })
    ], gameGetOtherTurret.prototype, "turretBody", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "炮塔脚" })
    ], gameGetOtherTurret.prototype, "turretFoot", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gameGetOtherTurret.prototype, "multipleNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "倍数金币" })
    ], gameGetOtherTurret.prototype, "lable_addGold2", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "按钮" })
    ], gameGetOtherTurret.prototype, "ArrBtn", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameGetOtherTurret.prototype, "feed_node", void 0);
    gameGetOtherTurret = __decorate([
        ccclass
    ], gameGetOtherTurret);
    return gameGetOtherTurret;
}(baseTs_1.default));
exports.default = gameGetOtherTurret;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHZXRPdGhlclR1cnJldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBR3BDLDJDQUFzQztBQUV0Qyx5REFBNkM7QUFHN0Msc0RBQWlEO0FBR2pELHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFnRCxzQ0FBTTtJQUF0RDtRQUFBLHFFQW9JQztRQWpJVyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRWxDLDRDQUE0QztRQUM1QyxnQ0FBZ0M7UUFHeEIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0Isb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFHaEMsWUFBTSxHQUFjLEVBQUUsQ0FBQztRQUd2QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRWxDLFFBQVE7UUFDQSxTQUFHLEdBQVcsQ0FBQyxDQUFDO1FBSWhCLGFBQU8sR0FBWSxLQUFLLENBQUM7O0lBcUdyQyxDQUFDO0lBbkdHLG1DQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsa0NBQUssR0FBTDtRQUVJLHNDQUFzQztRQUN0QyxtREFBbUQ7UUFDbkQsYUFBYTtRQUNiLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FDckMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQ3hELENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZCxD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QUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQzs0REFDVjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQzs4REFDVjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7c0RBQ2xCO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO3lEQUNkO0lBeEJqQixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQW9JdEM7SUFBRCx5QkFBQztDQXBJRCxBQW9JQyxDQXBJK0MsZ0JBQU0sR0FvSXJEO2tCQXBJb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi4vdXRpbC9Ub29sc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZUdldE90aGVyVHVycmV0IGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmlbDph49cIiB9KVxuICAgIHByaXZhdGUgbnVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5YWJXCJ9KVxuICAgIC8vIHByaXZhdGUgbGlnaHQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIGRpc3BsYXlOYW1lOiBcIueCruWhlOi6q1wiIH0pXG4gICAgcHJpdmF0ZSB0dXJyZXRCb2R5OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLngq7loZTohJpcIiB9KVxuICAgIHByaXZhdGUgdHVycmV0Rm9vdDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuWAjeaVsFwiIH0pXG4gICAgcHJpdmF0ZSBtdWx0aXBsZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuWAjeaVsOmHkeW4gVwiIH0pXG4gICAgcHJpdmF0ZSBsYWJsZV9hZGRHb2xkMjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdLCBkaXNwbGF5TmFtZTogXCLmjInpkq5cIiB9KVxuICAgIHByaXZhdGUgQXJyQnRuOiBjYy5Ob2RlW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuS/oeaBr+a1gVwiIH0pXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLyoq6YeR5biBICovXG4gICAgcHJpdmF0ZSBudW06IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGluaXREYXRhOiBhbnk7XG5cbiAgICBwcml2YXRlIGlzVmlkZW86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubGlnaHQpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vICAgICBjYy50d2VlbigpLnRvKDEse3NjYWxlOjF9KS50bygxLHtzY2FsZToxLjF9KVxuICAgICAgICAvLyApLnN0YXJ0KCk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubXVsdGlwbGVOb2RlKS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgY2MudHdlZW4oKS50byguMywgeyBhbmdsZTogMTAgfSkudG8oLjIsIHsgYW5nbGU6IDAgfSlcbiAgICAgICAgKS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoZGF0YSkge1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSB1dGlsLkdldFR1cnJldERhdGEoZGF0YSk7XG5cbiAgICAgICAgLy8gdGhpcy5udW0gPSBUb29scy5HZXRSYW5kb20oMyw4KTtcbiAgICAgICAgdGhpcy5udW0gPSAyO1xuXG4gICAgICAgIHRoaXMubnVtTGFiZWwuc3RyaW5nID0gXCIrXCIgKyB0aGlzLm51bSArIHQoXCJtYWluLueCruWhlFwiKTtcblxuICAgICAgICB0aGlzLmxhYmxlX2FkZEdvbGQyLnN0cmluZyA9IHRoaXMubnVtICogMyArIFwiXCI7XG5cbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKFwiYm9keVwiLCAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnR1cnJldEJvZHkgJiYgKHRoaXMudHVycmV0Qm9keS5zcHJpdGVGcmFtZSA9IHJlcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZShcImZvb3RcIiwgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudHVycmV0Rm9vdCAmJiByZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Qubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Rm9vdC5zcHJpdGVGcmFtZSA9IHJlc1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEZvb3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5pbml0RGF0YS5zcHJpdGVGb290WSkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRGb290ICYmICh0aGlzLnR1cnJldEZvb3Qubm9kZS55ID0gTnVtYmVyKHRoaXMuaW5pdERhdGEuc3ByaXRlRm9vdFkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIHRoaXMuQXJyQnRuWzBdLmFjdGl2ZSA9IHRoaXMuQXJyQnRuWzFdLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5BcnJCdG5bMl0uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5pc1ZpZGVvID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oZSwgcmVzKSB7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIHRoaXMuaXNWaWRlbyA9IHJlcyA9PSAxOy8v5piv5ZCm55yL6KeG6aKRXG5cbiAgICAgICAgdGhpcy5zdWNjZXNzRm4oKTtcblxuICAgIH1cblxuICAgIC8qKuiOt+WPluWuneWhlCAqL1xuICAgIHN1Y2Nlc3NGbigpIHtcblxuICAgICAgICBsZXQgbnVtOiBudW1iZXIgPSB0aGlzLm51bSAqICh0aGlzLmlzVmlkZW8gPyAzIDogMSk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIHV0aWwudXNlckRhdGEuYWlyYm9ybmVDb3VudCAtPSAxO1xuXG4gICAgICAgIHV0aWwucHJvZHVjdFR1cnJldChudW0pO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X3R1cnJldCwgeyBub2RlOiB0aGlzLm5vZGUsIG51bSB9KTtcblxuICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHQoJ21haW4uR290X3R1cnJldHMnLCBudW0pKTtcbiAgICB9XG5cblxuICAgIC8qKueci+WujOinhumikSAqL1xuICAgIHZpZGVvU2hvdygpIHtcbiAgICAgICAgdGhpcy5udW1MYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMubnVtICogKHRoaXMuaXNWaWRlbyA/IDMgOiAxKTtcbiAgICAgICAgdGhpcy5BcnJCdG5bMF0uYWN0aXZlID0gdGhpcy5BcnJCdG5bMV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuQXJyQnRuWzJdLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgICog5Yqg6L295Zu+54mHXG4gICAgICAqL1xuICAgIGxvYWRTcHJpdGUobmFtZTogc3RyaW5nLCBjYWxsOiBGdW5jdGlvbikge1xuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh0aGlzLmluaXREYXRhW25hbWVdLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmib7kuI3liLDor6Xlm77niYdcIiwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGwocmVzKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==