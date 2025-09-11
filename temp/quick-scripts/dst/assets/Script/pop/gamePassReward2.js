
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gamePassReward2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '35a97KKRwxOV4iqwmgDmXcG', 'gamePassReward2');
// Script/pop/gamePassReward2.ts

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
var gamePassReward2 = /** @class */ (function (_super) {
    __extends(gamePassReward2, _super);
    function gamePassReward2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardLabel1 = null;
        _this.rewardLabel2 = null;
        _this.multipleNode = null;
        return _this;
    }
    gamePassReward2.prototype.onLoad = function () {
        cc.tween(this.multipleNode).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
    };
    /**
     *
     */
    gamePassReward2.prototype.init = function () {
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
    gamePassReward2.prototype.getBtn = function (str, e) {
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
    gamePassReward2.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    __decorate([
        property({ type: cc.Label, displayName: "金币" })
    ], gamePassReward2.prototype, "rewardLabel1", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "翻倍金币" })
    ], gamePassReward2.prototype, "rewardLabel2", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "倍数" })
    ], gamePassReward2.prototype, "multipleNode", void 0);
    gamePassReward2 = __decorate([
        ccclass
    ], gamePassReward2);
    return gamePassReward2;
}(baseTs_1.default));
exports.default = gamePassReward2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQYXNzUmV3YXJkMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBb0M7QUFHcEMsMkNBQXNDO0FBRXRDLHlEQUE2QztBQUM3QywrQ0FBOEM7QUFFOUMsc0RBQWlEO0FBRWpELHVDQUFzQztBQUN0QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQU07SUFBbkQ7UUFBQSxxRUF1RkM7UUFwRlcsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFJOUIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFLOUIsa0JBQVksR0FBWSxJQUFJLENBQUM7O0lBMkV6QyxDQUFDO0lBdEVHLGdDQUFNLEdBQU47UUFDSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQ3JDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUN4RCxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWQsQ0FBQztJQUdEOztPQUVHO0lBQ0gsOEJBQUksR0FBSjtRQUFBLGlCQXNCQztRQXJCRyxTQUFTO1FBQ1QsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsY0FBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztRQUVqRixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUUvQyxjQUFJLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLG1CQUFRLENBQUMsY0FBYztZQUM1QixPQUFPLEVBQUUsVUFBQyxJQUFJO2dCQUNWLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFO29CQUNmLE9BQU87aUJBQ1Y7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnRUFBZ0UsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO2dCQUM5Ryx3REFBd0Q7Z0JBQ3hELGNBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsY0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRXBDLENBQUM7U0FDSixDQUFDLENBQUE7SUFFTixDQUFDO0lBR0Q7O09BRUc7SUFDSCxnQ0FBTSxHQUFOLFVBQU8sR0FBRyxFQUFFLENBQUM7UUFBYixpQkFxQkM7UUFuQkcsSUFBSSxPQUFPLEdBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5Qix5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV2QyxJQUFJLFNBQVMsR0FBYTtZQUV0QixJQUFJLElBQUksR0FBVyxLQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWxELEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRWpGLGNBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFBO1FBR0QsU0FBUyxFQUFFLENBQUM7SUFHaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0NBQVEsR0FBUjtRQUNJLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBbEZEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO3lEQUNWO0lBSXRDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO3lEQUNaO0lBS3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO3lEQUNWO0lBWnBCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0F1Rm5DO0lBQUQsc0JBQUM7Q0F2RkQsQUF1RkMsQ0F2RjRDLGdCQUFNLEdBdUZsRDtrQkF2Rm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IGdhbWVOdW1lcmljYWwsIHByb3BUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi4vdXRpbC9Ub29sc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVBhc3NSZXdhcmQyIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLph5HluIFcIiB9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWwxOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLnv7vlgI3ph5HluIFcIiB9KVxuICAgIHByaXZhdGUgcmV3YXJkTGFiZWwyOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5YCN5pWwXCIgfSlcbiAgICBwcml2YXRlIG11bHRpcGxlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGNvaW46IGFueTtcblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjYy50d2Vlbih0aGlzLm11bHRpcGxlTm9kZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgIGNjLnR3ZWVuKCkudG8oLjMsIHsgYW5nbGU6IDEwIH0pLnRvKC4yLCB7IGFuZ2xlOiAwIH0pXG4gICAgICAgICkuc3RhcnQoKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy/ojrflj5bnlKjmiLfooYzkuLo0XG4gICAgICAgIHRoaXMuY29pbiA9IFRvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsIDQsIHV0aWwuYmVoYXZpb3JSZXdhcmRWb0xpc3QpLnJld2FyZCB8fCAxNTA7XG5cbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbDEuc3RyaW5nID0gXCIrXCIgKyB0aGlzLmNvaW4gKyB0KFwibWFpbi7ph5HluIFcIik7XG5cbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbDIuc3RyaW5nID0gdGhpcy5jb2luICogMTAgKyBcIlwiO1xuXG4gICAgICAgIHV0aWwuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmdhbWVMZXZlbEluZGV4LFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K6+572u5LiA5qyhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YS5tYXBDb25maWcpKVxuICAgICAgICAgICAgICAgIC8vIHV0aWwuYmVoYXZpb3JSZXdhcmRWb0xpc3QgPSBkYXRhLmJlaGF2aW9yUmV3YXJkVm9MaXN0XG4gICAgICAgICAgICAgICAgdXRpbC5nZXRub3dtYXBkYXRhKCk7XG4gICAgICAgICAgICAgICAgdXRpbC5tYXBDb25maWcgPSBkYXRhLm1hcENvbmZpZztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5ZcbiAgICAgKi9cbiAgICBnZXRCdG4oc3RyLCBlKSB7XG5cbiAgICAgICAgbGV0IGlzVmlkZW86IGJvb2xlYW4gPSBlID09IDE7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIGxldCBzdWNjZXNzRm46IEZ1bmN0aW9uID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgY29pbjogbnVtYmVyID0gdGhpcy5jb2luICogKGlzVmlkZW8gPyAxMCA6IDEpO1xuXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sIHsgbm9kZTogdGhpcy5ub2RlLCB2YWx1ZTogY29pbiwgbnVtOiAxMCB9KTtcblxuICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbihjb2luKTtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bigpO1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1N0YXJ0KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3VjY2Vzc0ZuKCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXrVxuICAgICAqL1xuICAgIGNsb3NlQnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICB9XG5cbn1cbiJdfQ==