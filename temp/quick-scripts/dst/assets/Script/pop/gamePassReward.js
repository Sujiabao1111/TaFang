
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gamePassReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19b942aBrdEc6tZ+2QO0APA', 'gamePassReward');
// Script/pop/gamePassReward.ts

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
var LanguageData_1 = require("../Language/LanguageData");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gamePassReward = /** @class */ (function (_super) {
    __extends(gamePassReward, _super);
    function gamePassReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel1 = null;
        _this.rewardLabel2 = null;
        _this.multipleNode = null;
        return _this;
    }
    gamePassReward.prototype.onLoad = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**
     *
     */
    gamePassReward.prototype.init = function () {
        var _this = this;
        //获取用户行为4
        this.coin = Tools_1.Tools.GetArrData("type", 4, util_1.default.behaviorRewardVoList).reward || 150;
        this.rewardLabel1.string = "+" + this.coin + LanguageData_1.t("main.金币");
        this.rewardLabel2.string = this.coin * 10 + "";
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.gameLevelIndex,
            success: function (data) {
                if (!_this.isValid) {
                    return;
                }
                console.log("设置一次----------------------------------------------------------" + JSON.stringify(data.mapConfig));
                // util.behaviorRewardVoList = data.behaviorRewardVoList
                util_1.default.getnowmapdata();
                util_1.default.mapConfig = data.mapConfig;
            }
        });
    };
    /**
     * 获取
     */
    gamePassReward.prototype.getBtn = function (str, e) {
        var _this = this;
        var isVideo = e == 1;
        soundController_1.default.singleton.clickAudio();
        var successFn = function () {
            var coin = _this.coin * (isVideo ? 10 : 1);
            cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: _this.node, value: coin, num: 10 });
            util_1.default.addTermCoin(coin);
            _this.closeBtn();
            cc.game.emit(NameTs_1.default.Game_Start);
        };
        successFn();
    };
    /**
     * 关闭
     */
    gamePassReward.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    __decorate([
        property({ type: cc.Label, displayName: "金币" })
    ], gamePassReward.prototype, "rewardLabel1", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "翻倍金币" })
    ], gamePassReward.prototype, "rewardLabel2", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gamePassReward.prototype, "multipleNode", void 0);
    gamePassReward = __decorate([
        ccclass
    ], gamePassReward);
    return gamePassReward;
}(baseTs_1.default));
exports.default = gamePassReward;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQYXNzUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUdwQywyQ0FBc0M7QUFFdEMseURBQTZDO0FBQzdDLCtDQUE4QztBQUU5QyxzREFBaUQ7QUFFakQsdUNBQXNDO0FBQ3RDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBTTtJQUFsRDtRQUFBLHFFQXVGQztRQXBGVyxrQkFBWSxHQUFhLElBQUksQ0FBQztRQUk5QixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUs5QixrQkFBWSxHQUFZLElBQUksQ0FBQzs7SUEyRXpDLENBQUM7SUF0RUcsK0JBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FDckMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQ3hELENBQUMsS0FBSyxFQUFFLENBQUM7SUFFZCxDQUFDO0lBR0Q7O09BRUc7SUFDSCw2QkFBSSxHQUFKO1FBQUEsaUJBc0JDO1FBckJHLFNBQVM7UUFDVCxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxjQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1FBRWpGLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRS9DLGNBQUksQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsbUJBQVEsQ0FBQyxjQUFjO1lBQzVCLE9BQU8sRUFBRSxVQUFDLElBQUk7Z0JBQ1YsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2YsT0FBTztpQkFDVjtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7Z0JBQzlHLHdEQUF3RDtnQkFDeEQsY0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixjQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFcEMsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFHRDs7T0FFRztJQUNILCtCQUFNLEdBQU4sVUFBTyxHQUFHLEVBQUUsQ0FBQztRQUFiLGlCQXFCQztRQW5CRyxJQUFJLE9BQU8sR0FBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXZDLElBQUksU0FBUyxHQUFhO1lBRXRCLElBQUksSUFBSSxHQUFXLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEQsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFakYsY0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUE7UUFHRCxTQUFTLEVBQUUsQ0FBQztJQUdoQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQ0FBUSxHQUFSO1FBQ0kseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFsRkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7d0RBQ1Y7SUFJdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7d0RBQ1o7SUFLdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7d0RBQ1Y7SUFacEIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXVGbEM7SUFBRCxxQkFBQztDQXZGRCxBQXVGQyxDQXZGMkMsZ0JBQU0sR0F1RmpEO2tCQXZGb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCwgcHJvcFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi91dGlsL1Rvb2xzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lUGFzc1Jld2FyZCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi6YeR5biBXCIgfSlcbiAgICBwcml2YXRlIHJld2FyZExhYmVsMTogY2MuTGFiZWwgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi57+75YCN6YeR5biBXCIgfSlcbiAgICBwcml2YXRlIHJld2FyZExhYmVsMjogY2MuTGFiZWwgPSBudWxsO1xuXG5cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuWAjeaVsFwiIH0pXG4gICAgcHJpdmF0ZSBtdWx0aXBsZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjb2luOiBhbnk7XG5cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5tdWx0aXBsZU5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICAgICBjYy50d2VlbigpLnRvKC4zLCB7IGFuZ2xlOiAxMCB9KS50byguMiwgeyBhbmdsZTogMCB9KVxuICAgICAgICApLnN0YXJ0KCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIC8v6I635Y+W55So5oi36KGM5Li6NFxuICAgICAgICB0aGlzLmNvaW4gPSBUb29scy5HZXRBcnJEYXRhKFwidHlwZVwiLCA0LCB1dGlsLmJlaGF2aW9yUmV3YXJkVm9MaXN0KS5yZXdhcmQgfHwgMTUwO1xuXG4gICAgICAgIHRoaXMucmV3YXJkTGFiZWwxLnN0cmluZyA9IFwiK1wiICsgdGhpcy5jb2luICsgdChcIm1haW4u6YeR5biBXCIpO1xuXG4gICAgICAgIHRoaXMucmV3YXJkTGFiZWwyLnN0cmluZyA9IHRoaXMuY29pbiAqIDEwICsgXCJcIjtcblxuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nYW1lTGV2ZWxJbmRleCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiuvue9ruS4gOasoS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIiArIEpTT04uc3RyaW5naWZ5KGRhdGEubWFwQ29uZmlnKSlcbiAgICAgICAgICAgICAgICAvLyB1dGlsLmJlaGF2aW9yUmV3YXJkVm9MaXN0ID0gZGF0YS5iZWhhdmlvclJld2FyZFZvTGlzdFxuICAgICAgICAgICAgICAgIHV0aWwuZ2V0bm93bWFwZGF0YSgpO1xuICAgICAgICAgICAgICAgIHV0aWwubWFwQ29uZmlnID0gZGF0YS5tYXBDb25maWc7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6I635Y+WXG4gICAgICovXG4gICAgZ2V0QnRuKHN0ciwgZSkge1xuXG4gICAgICAgIGxldCBpc1ZpZGVvOiBib29sZWFuID0gZSA9PSAxO1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICBsZXQgc3VjY2Vzc0ZuOiBGdW5jdGlvbiA9ICgpID0+IHtcblxuICAgICAgICAgICAgbGV0IGNvaW46IG51bWJlciA9IHRoaXMuY29pbiAqIChpc1ZpZGVvID8gMTAgOiAxKTtcblxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMubm9kZSwgdmFsdWU6IGNvaW4sIG51bTogMTAgfSk7XG5cbiAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4oY29pbik7XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG4oKTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdGFydCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN1Y2Nlc3NGbigpO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl61cbiAgICAgKi9cbiAgICBjbG9zZUJ0bigpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgfVxuXG59XG4iXX0=