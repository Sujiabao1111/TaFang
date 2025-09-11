
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
    };
    gameEnd.prototype.onDisable = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVFbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBR3BDLDJDQUFzQztBQUV0QyxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFxQywyQkFBTTtJQUEzQztRQUFBLHFFQStEQztRQTNEVyxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUk1QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRWxDLGVBQWU7UUFDZixNQUFNO1FBQ0UsVUFBSSxHQUFXLENBQUMsQ0FBQzs7UUErQ3pCLGlCQUFpQjtJQUNyQixDQUFDO0lBOUNHLHVCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsU0FBUztJQUNULHNCQUFJLEdBQUo7UUFBQSxpQkFvQkM7UUFuQkcsSUFBSSxPQUFPLEdBQWdCLGNBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ25FLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsS0FBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7WUFDZixJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUNoQixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLE9BQU87YUFDVjtZQUNELEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxLQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixrQkFBUSxDQUFDLFdBQVcsQ0FBQztZQUNqQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGVBQWUsRUFBRSxHQUFHLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUc7WUFDdEQsVUFBVSxFQUFFLEdBQUcsR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRztZQUNuRCxTQUFTLEVBQUUsY0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHO1lBQzlCLFFBQVEsRUFBRSxNQUFNLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQztTQUNyQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBUSxHQUFSO1FBQ0kseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDBCQUFRLEdBQVI7SUFDQSxDQUFDO0lBR0QsMkJBQVMsR0FBVDtJQUNBLENBQUM7SUF2REQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0RBQ1g7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUM7K0NBQ25CO0lBSXBDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDOzhDQUNkO0lBWGpCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0ErRDNCO0lBQUQsY0FBQztDQS9ERCxBQStEQyxDQS9Eb0MsZ0JBQU0sR0ErRDFDO2tCQS9Eb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBjdXN0b21zSW5mbyB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVFbmQgZXh0ZW5kcyBiYXNlVHMge1xuXG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5YWz5Y2hXCIgfSlcbiAgICBwcml2YXRlIGN1c3RvbUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi6YeN546p5oyJ6ZKubGFiZWxcIiB9KVxuICAgIHByaXZhdGUgYWdhaW5MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxuICAgIHByaXZhdGUgZmVlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8vIG9uTG9hZCAoKSB7fVxuICAgIC8v6YeN5p2l5pe26Ze0XG4gICAgcHJpdmF0ZSB0aW1lOiBudW1iZXIgPSAzO1xuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKirliJ3lp4vljJYgKi9cbiAgICBpbml0KCkge1xuICAgICAgICBsZXQgY3VzdG9tczogY3VzdG9tc0luZm8gPSB1dGlsLnVzZXJEYXRhLmN1c3RvbXM7XG4gICAgICAgIHRoaXMuY3VzdG9tTGFiZWwuc3RyaW5nID0gXCLlhbPljaFcIiArIGN1c3RvbXMuYmlnICsgXCItXCIgKyBjdXN0b21zLnNtYWxsO1xuICAgICAgICB0aGlzLmFnYWluTGFiZWwuc3RyaW5nID0gXCLph43mnaUoXCIgKyB0aGlzLnRpbWUgKyBcIilcIjtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgLT0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VCdG4oKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFnYWluTGFiZWwuc3RyaW5nID0gXCLph43mnaUoXCIgKyB0aGlzLnRpbWUgKyBcIilcIjtcbiAgICAgICAgfSwgMSk7XG5cbiAgICAgICAgVHJhY2tNZ3IuQXBwR2FtZWRhdGUoe1xuICAgICAgICAgICAgaXNfY2hhbGxlbmdlX3N1YzogdHJ1ZSxcbiAgICAgICAgICAgIGdhbWVfbGV2ZWxfaGNkZzogXCLnrKxcIiArIHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcgKyBcIuWFs1wiLFxuICAgICAgICAgICAgbGV2ZWxfaGNkZzogXCLnrKxcIiArIHV0aWwudXNlckRhdGEuY3VzdG9tcy5zbWFsbCArIFwi5rOiXCIsXG4gICAgICAgICAgICBnYW1lX3RpbWU6IHV0aWwuZ2FtZVRpbWUgKyBcInNcIixcbiAgICAgICAgICAgIHVzZV90b29sOiBTdHJpbmcodXRpbC5nYW1lUHJvcE51bSksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXremhtemdolxuICAgICAqL1xuICAgIGNsb3NlQnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9BZ2Fpbik7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgfVxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19