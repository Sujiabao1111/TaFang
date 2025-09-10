
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/treasureBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a74852h5rVLLpTCdL7pT2sB', 'treasureBox');
// Script/game/treasureBox.ts

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
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var treasureBox = /** @class */ (function (_super) {
    __extends(treasureBox, _super);
    function treasureBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.treasure = null;
        // LIFE-CYCLE CALLBACKS:
        //当前宝箱id
        _this.nowId = null;
        //宝箱时间
        _this.time = null;
        //金币
        _this.coin = 0;
        //剩余次数
        _this.treasureNum = 20;
        return _this;
    }
    Object.defineProperty(treasureBox.prototype, "_userData", {
        get: function () {
            return util_1.default.userData;
        },
        enumerable: false,
        configurable: true
    });
    treasureBox.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Treasure_StartTime, function () {
            _this.treasureNum -= 1;
            _this.treasure.active = false;
            _this.time = 180;
        }, this);
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.treasureBox_residual,
            success: function (res) {
                if (!_this.isValid) {
                    return;
                }
                _this.treasureNum = res.times;
                if (_this._userData.noviceGuide == -1) {
                    _this.time = 0;
                }
            }
        });
        cc.game.on(NameTs_1.default.Game_Treasure_Show, function () {
            _this.time = 0;
        }, this);
    };
    treasureBox.prototype.start = function () {
    };
    /**
     * 起飞
     */
    treasureBox.prototype.flyAni = function () {
        console.log("漂浮宝箱出现");
        this.treasure.active = true;
    };
    /**点击宝箱 */
    treasureBox.prototype.clickBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.showPage(pageTs_1.default.pageName.GameTreasure);
    };
    treasureBox.prototype.update = function (dt) {
        // if (this.time == null || this.treasureNum <= 0) return;
        // this.time -= dt;
        // if (this.time <= 0) {
        //     this.time = null;
        //     this.flyAni();
        // }
    };
    __decorate([
        property({ type: cc.Node, displayName: "宝箱" })
    ], treasureBox.prototype, "treasure", void 0);
    treasureBox = __decorate([
        ccclass
    ], treasureBox);
    return treasureBox;
}(baseTs_1.default));
exports.default = treasureBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0cmVhc3VyZUJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFHcEMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUV0QywrQ0FBOEM7QUFFOUMsc0RBQWlEO0FBRWpELHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQWlGQztRQTlFVyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBRWpDLHdCQUF3QjtRQUV4QixRQUFRO1FBQ0EsV0FBSyxHQUFXLElBQUksQ0FBQztRQUU3QixNQUFNO1FBQ0UsVUFBSSxHQUFXLElBQUksQ0FBQztRQUU1QixJQUFJO1FBQ0ksVUFBSSxHQUFXLENBQUMsQ0FBQztRQUV6QixNQUFNO1FBQ0UsaUJBQVcsR0FBVyxFQUFFLENBQUM7O0lBZ0VyQyxDQUFDO0lBOURHLHNCQUFXLGtDQUFTO2FBQXBCO1lBQ0ksT0FBTyxjQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsNEJBQU0sR0FBTjtRQUFBLGlCQXlCQztRQXZCRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLHVCQUF1QixFQUFFO1lBQ3ZDLEtBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUM3QixLQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNwQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxjQUFJLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLG1CQUFRLENBQUMsb0JBQW9CO1lBQ2xDLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBQ1IsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2YsT0FBTztpQkFDVjtnQkFDRCxLQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ2xDLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNqQjtZQUNMLENBQUM7U0FDSixDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGtCQUFrQixFQUFFO1lBQ2xDLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUViLENBQUM7SUFFRCwyQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNEJBQU0sR0FBTjtRQUVJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBR2hDLENBQUM7SUFHRCxVQUFVO0lBQ1YsOEJBQVEsR0FBUjtRQUNJLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdELDRCQUFNLEdBQU4sVUFBTyxFQUFFO1FBQ0wsMERBQTBEO1FBQzFELG1CQUFtQjtRQUNuQix3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLHFCQUFxQjtRQUNyQixJQUFJO0lBQ1IsQ0FBQztJQTdFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztpREFDZDtJQUhoQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBaUYvQjtJQUFELGtCQUFDO0NBakZELEFBaUZDLENBakZ3QyxnQkFBTSxHQWlGOUM7a0JBakZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBqc29uU2luZ2xldG9uIGZyb20gXCIuLi9iYXNlL2pzb25TaW5nbGV0b25cIjtcbmltcG9ydCB7IGdhbWVTdGF0ZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL2RhdGEvdXNlckRhdGFcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHJlYXN1cmVCb3ggZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5a6d566xXCIgfSlcbiAgICBwcml2YXRlIHRyZWFzdXJlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy/lvZPliY3lrp3nrrFpZFxuICAgIHByaXZhdGUgbm93SWQ6IG51bWJlciA9IG51bGw7XG5cbiAgICAvL+WuneeuseaXtumXtFxuICAgIHByaXZhdGUgdGltZTogbnVtYmVyID0gbnVsbDtcblxuICAgIC8v6YeR5biBXG4gICAgcHJpdmF0ZSBjb2luOiBudW1iZXIgPSAwO1xuXG4gICAgLy/liankvZnmrKHmlbBcbiAgICBwcml2YXRlIHRyZWFzdXJlTnVtOiBudW1iZXIgPSAyMDtcblxuICAgIHB1YmxpYyBnZXQgX3VzZXJEYXRhKCk6IFVzZXJEYXRhIHtcbiAgICAgICAgcmV0dXJuIHV0aWwudXNlckRhdGE7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHJlYXN1cmVfU3RhcnRUaW1lLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRyZWFzdXJlTnVtIC09IDE7XG4gICAgICAgICAgICB0aGlzLnRyZWFzdXJlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gMTgwO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC50cmVhc3VyZUJveF9yZXNpZHVhbCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRyZWFzdXJlTnVtID0gcmVzLnRpbWVzO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl91c2VyRGF0YS5ub3ZpY2VHdWlkZSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UcmVhc3VyZV9TaG93LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6LW36aOeXG4gICAgICovXG4gICAgZmx5QW5pKCkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5ryC5rWu5a6d566x5Ye6546wXCIpXG4gICAgICAgIHRoaXMudHJlYXN1cmUuYWN0aXZlID0gdHJ1ZTtcblxuXG4gICAgfVxuXG5cbiAgICAvKirngrnlh7vlrp3nrrEgKi9cbiAgICBjbGlja0J0bigpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVUcmVhc3VyZSk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMudGltZSA9PSBudWxsIHx8IHRoaXMudHJlYXN1cmVOdW0gPD0gMCkgcmV0dXJuO1xuICAgICAgICAvLyB0aGlzLnRpbWUgLT0gZHQ7XG4gICAgICAgIC8vIGlmICh0aGlzLnRpbWUgPD0gMCkge1xuICAgICAgICAvLyAgICAgdGhpcy50aW1lID0gbnVsbDtcbiAgICAgICAgLy8gICAgIHRoaXMuZmx5QW5pKCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG59XG4iXX0=