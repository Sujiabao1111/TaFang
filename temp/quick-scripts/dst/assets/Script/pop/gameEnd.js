
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameEnd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e570a8xm6xO07XogVYarkPX', 'gameEnd');
// Script/pop/gameEnd.ts

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
var NameTs_1 = require("../common/NameTs");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameEnd = /** @class */ (function (_super) {
    __extends(gameEnd, _super);
    function gameEnd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customLabel = null;
        _this.againLabel = null;
        _this.feed_node = null;
        // onLoad () {}
        //重来时间
        _this.time = 3;
        return _this;
        // update (dt) {}
    }
    gameEnd.prototype.start = function () {
    };
    /**初始化 */
    gameEnd.prototype.init = function () {
        var _this = this;
        var customs = util_1.default.userData.customs;
        this.customLabel.string = "关卡" + customs.big + "-" + customs.small;
        this.againLabel.string = "重来(" + this.time + ")";
        this.schedule(function () {
            _this.time -= 1;
            if (_this.time == 0) {
                _this.closeBtn();
                return;
            }
            _this.againLabel.string = "重来(" + _this.time + ")";
        }, 1);
        TrackMgr_1.default.AppGamedate({
            is_challenge_suc: true,
            game_level_hcdg: "第" + util_1.default.userData.customs.big + "关",
            level_hcdg: "第" + util_1.default.userData.customs.small + "波",
            game_time: util_1.default.gameTime + "s",
            use_tool: String(util_1.default.gamePropNum),
        });
    };
    /**
     * 关闭页面
     */
    gameEnd.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.unscheduleAllCallbacks();
        this.closePage();
        cc.game.emit(NameTs_1.default.Game_Again);
    };
    gameEnd.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.GameFailView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
    };
    gameEnd.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.GameFailView);
    };
    __decorate([
        property({ type: cc.Label, displayName: "关卡" })
    ], gameEnd.prototype, "customLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "重玩按钮label" })
    ], gameEnd.prototype, "againLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameEnd.prototype, "feed_node", void 0);
    gameEnd = __decorate([
        ccclass
    ], gameEnd);
    return gameEnd;
}(baseTs_1.default));
exports.default = gameEnd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVFbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUVsRCwyQ0FBc0M7QUFDdEMsc0VBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFNO0lBQTNDO1FBQUEscUVBaUVDO1FBN0RXLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBSTNCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFFakMsZUFBZTtRQUNmLE1BQU07UUFDRSxVQUFJLEdBQVUsQ0FBQyxDQUFDOztRQWlEeEIsaUJBQWlCO0lBQ3JCLENBQUM7SUFoREcsdUJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxTQUFTO0lBQ1Qsc0JBQUksR0FBSjtRQUFBLGlCQW9CQztRQW5CRyxJQUFJLE9BQU8sR0FBZSxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUMsT0FBTyxDQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM3RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLEtBQUksQ0FBQyxJQUFJLElBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBRyxLQUFJLENBQUMsSUFBSSxJQUFFLENBQUMsRUFBQztnQkFDWixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLE9BQU87YUFDVjtZQUNELEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFJLEtBQUssR0FBQyxLQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQztRQUNsRCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFTCxrQkFBUSxDQUFDLFdBQVcsQ0FBQztZQUNqQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGVBQWUsRUFBRSxHQUFHLEdBQUMsY0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFDLEdBQUc7WUFDbEQsVUFBVSxFQUFDLEdBQUcsR0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsR0FBRztZQUM5QyxTQUFTLEVBQUUsY0FBSSxDQUFDLFFBQVEsR0FBQyxHQUFHO1lBQzVCLFFBQVEsRUFBQyxNQUFNLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQztTQUNwQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBUSxHQUFSO1FBQ0kseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDBCQUFRLEdBQVI7UUFDSSxzQkFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsd0JBQXdCO0lBQ2xHLENBQUM7SUFHRCwyQkFBUyxHQUFUO1FBQ0ksc0JBQVksQ0FBQyxVQUFVLENBQUMsdUJBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBekREO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDO2dEQUNQO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxDQUFDOytDQUNmO0lBSW5DO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDOzhDQUNWO0lBWGhCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FpRTNCO0lBQUQsY0FBQztDQWpFRCxBQWlFQyxDQWpFb0MsZ0JBQU0sR0FpRTFDO2tCQWpFb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBjdXN0b21zSW5mbyB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lRW5kIGV4dGVuZHMgYmFzZVRzIHtcblxuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi5YWz5Y2hXCJ9KVxuICAgIHByaXZhdGUgY3VzdG9tTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLGRpc3BsYXlOYW1lOlwi6YeN546p5oyJ6ZKubGFiZWxcIn0pXG4gICAgcHJpdmF0ZSBhZ2FpbkxhYmVsOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwi5L+h5oGv5rWBXCJ9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgLy8gb25Mb2FkICgpIHt9XG4gICAgLy/ph43mnaXml7bpl7RcbiAgICBwcml2YXRlIHRpbWU6bnVtYmVyID0gMztcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoKXtcbiAgICAgICAgbGV0IGN1c3RvbXM6Y3VzdG9tc0luZm8gPSB1dGlsLnVzZXJEYXRhLmN1c3RvbXM7XG4gICAgICAgIHRoaXMuY3VzdG9tTGFiZWwuc3RyaW5nID0gXCLlhbPljaFcIitjdXN0b21zLmJpZytcIi1cIitjdXN0b21zLnNtYWxsO1xuICAgICAgICB0aGlzLmFnYWluTGFiZWwuc3RyaW5nID0gIFwi6YeN5p2lKFwiK3RoaXMudGltZStcIilcIjtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy50aW1lIC09MTtcbiAgICAgICAgICAgIGlmKHRoaXMudGltZT09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWdhaW5MYWJlbC5zdHJpbmcgPSAgXCLph43mnaUoXCIrdGhpcy50aW1lK1wiKVwiO1xuICAgICAgICB9LDEpO1xuXG4gICAgICAgIFRyYWNrTWdyLkFwcEdhbWVkYXRlKHtcbiAgICAgICAgICAgIGlzX2NoYWxsZW5nZV9zdWM6IHRydWUsXG4gICAgICAgICAgICBnYW1lX2xldmVsX2hjZGc6IFwi56ysXCIrdXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZytcIuWFs1wiLFxuICAgICAgICAgICAgbGV2ZWxfaGNkZzpcIuesrFwiK3V0aWwudXNlckRhdGEuY3VzdG9tcy5zbWFsbCtcIuazolwiLFxuICAgICAgICAgICAgZ2FtZV90aW1lOiB1dGlsLmdhbWVUaW1lK1wic1wiLCAgICAgXG4gICAgICAgICAgICB1c2VfdG9vbDpTdHJpbmcodXRpbC5nYW1lUHJvcE51bSksIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63pobXpnaJcbiAgICAgKi9cbiAgICBjbG9zZUJ0bigpe1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9BZ2Fpbik7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkSW5mb0FkKEFkUG9zaXRpb24uR2FtZUZhaWxWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxuICAgIH1cblxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBBZENvbnRyb2xsZXIuaGlkZUluZm9BZChBZFBvc2l0aW9uLkdhbWVGYWlsVmlldyk7XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19