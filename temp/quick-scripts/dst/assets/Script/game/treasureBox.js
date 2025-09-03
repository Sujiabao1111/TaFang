
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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
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
    treasureBox.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Treasure_StartTime, function () {
            _this.treasureNum -= 1;
            _this.treasure.active = false;
            _this.time = 180;
        }, this);
        //fix bug
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.treasureBox_residual,
            success: function (res) {
                if (!_this.isValid) {
                    return;
                }
                _this.treasureNum = res.times;
                console.log(util_1.default.userData.noviceGuide, 'util.userData.noviceGuide');
                if (util_1.default.userData.noviceGuide == -1) {
                    _this.time = 0;
                }
                // if(this.treasureNum>0&&this.time==0){
                //     this.flyAni();
                // }
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
        // XMSDK.post({
        // url: UrlConst.treasureBox_Isget,
        //     onSuccess: res => {
        //         if (res.code === 0 && res.data && res.data.showBox != 1) {       //领取过
        //             return null;
        //         }
        //         else {
        //             let data = jsonSingleton.singleton.getJson(NameTs.treasureData);
        //             let treasureId: number = null;
        //             for (let i = 0; i < data.length; i++) {
        //                 let item = data[i];
        //                 if (item.min <= util.userData.turretLevel && item.max > util.userData.turretLevel) {
        //                     treasureId = item.id;
        //                     break;
        //                 }
        //             }
        //             if (treasureId) {
        //                 let checkId = (id) => {
        //                     return id == treasureId;
        //                 }
        //                 let isExist: boolean = util.userData.haveTreasure.some(checkId);
        //                 if (isExist) {
        //                     return null;
        //                 } else {                            
        //                     if (this.nowId == treasureId) {
        //                         return;
        //                     }
        //                     this.nowId = treasureId;
        console.log("漂浮宝箱出现");
        this.treasure.active = true;
        TrackMgr_1.default.airborne_treasure({
            activity_state: "漂浮宝箱出现"
        });
        //                 }                       
        //             }
        //         }
        //     },
        //     onFail: err => {
        //     }
        // }
        // )
        // let id:number = util.checkTreasureShow();
        // if(this.nowId==id){
        //     return;
        // }
        // this.nowId = id;
        // this.treasure.active = true;
        // TrackMgr.airborne_treasure({
        //     activity_state: "漂浮宝箱出现"
        // });
    };
    /**点击宝箱 */
    treasureBox.prototype.clickBtn = function () {
        // if(util.userData.noviceGuide!==-1)return;
        // this.treasure.active = false;
        soundController_1.default.singleton.clickAudio();
        this.showPage(pageTs_1.default.pageName.GameTreasure);
        TrackMgr_1.default.airborne_treasure({
            activity_state: "打开漂浮宝箱"
        });
    };
    treasureBox.prototype.update = function (dt) {
        if (this.time == null || this.treasureNum <= 0)
            return;
        this.time -= dt;
        if (this.time <= 0) {
            this.time = null;
            this.flyAni();
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0cmVhc3VyZUJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFHcEMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFFOUMsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQU07SUFBL0M7UUFBQSxxRUFzSkM7UUFuSlcsY0FBUSxHQUFZLElBQUksQ0FBQztRQUVqQyx3QkFBd0I7UUFFeEIsUUFBUTtRQUNBLFdBQUssR0FBVyxJQUFJLENBQUM7UUFFN0IsTUFBTTtRQUNFLFVBQUksR0FBVSxJQUFJLENBQUM7UUFFM0IsSUFBSTtRQUNJLFVBQUksR0FBVSxDQUFDLENBQUM7UUFFeEIsTUFBTTtRQUNFLGlCQUFXLEdBQVUsRUFBRSxDQUFDOztJQXFJcEMsQ0FBQztJQW5JRyw0QkFBTSxHQUFOO1FBQUEsaUJBcUNDO1FBbkNHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsdUJBQXVCLEVBQUU7WUFFdkMsS0FBSSxDQUFDLFdBQVcsSUFBRyxDQUFDLENBQUM7WUFFckIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBRTdCLEtBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBRXBCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQixTQUFTO1FBRUQsY0FBSSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBQyxtQkFBUSxDQUFDLG9CQUFvQjtZQUNqQyxPQUFPLEVBQUMsVUFBQSxHQUFHO2dCQUNQLElBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFDO29CQUNiLE9BQU87aUJBQ1Y7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Q0FzSi9CO0lBQUQsa0JBQUM7Q0F0SkQsQUFzSkMsQ0F0SndDLGdCQUFNLEdBc0o5QztrQkF0Sm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IGpzb25TaW5nbGV0b24gZnJvbSBcIi4uL2Jhc2UvanNvblNpbmdsZXRvblwiO1xuaW1wb3J0IHsgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHJlYXN1cmVCb3ggZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5a6d566xXCIgfSlcbiAgICBwcml2YXRlIHRyZWFzdXJlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy/lvZPliY3lrp3nrrFpZFxuICAgIHByaXZhdGUgbm93SWQ6IG51bWJlciA9IG51bGw7XG5cbiAgICAvL+WuneeuseaXtumXtFxuICAgIHByaXZhdGUgdGltZTpudW1iZXIgPSBudWxsO1xuXG4gICAgLy/ph5HluIFcbiAgICBwcml2YXRlIGNvaW46bnVtYmVyID0gMDtcblxuICAgIC8v5Ymp5L2Z5qyh5pWwXG4gICAgcHJpdmF0ZSB0cmVhc3VyZU51bTpudW1iZXIgPSAyMDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1RyZWFzdXJlX1N0YXJ0VGltZSwgKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnRyZWFzdXJlTnVtIC09MTtcblxuICAgICAgICAgICAgdGhpcy50cmVhc3VyZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy50aW1lID0gMTgwO1xuXG4gICAgICAgIH0sIHRoaXMpO1xuLy9maXggYnVnXG5cbiAgICAgICAgdXRpbC5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDpVcmxDb25zdC50cmVhc3VyZUJveF9yZXNpZHVhbCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyZWFzdXJlTnVtID0gcmVzLnRpbWVzO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGUsJ3V0aWwudXNlckRhdGEubm92aWNlR3VpZGUnKVxuICAgICAgICAgICAgICAgIGlmKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGU9PS0xKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYodGhpcy50cmVhc3VyZU51bT4wJiZ0aGlzLnRpbWU9PTApe1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmZseUFuaSgpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UcmVhc3VyZV9TaG93LCgpPT57XG5cbiAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6LW36aOeXG4gICAgICovXG4gICAgZmx5QW5pKCkge1xuICAgICAgICAvLyBYTVNESy5wb3N0KHtcbiAgICAgICAgICAgIC8vIHVybDogVXJsQ29uc3QudHJlYXN1cmVCb3hfSXNnZXQsXG4gICAgICAgIC8vICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhICYmIHJlcy5kYXRhLnNob3dCb3ggIT0gMSkgeyAgICAgICAvL+mihuWPlui/h1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBkYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMudHJlYXN1cmVEYXRhKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IHRyZWFzdXJlSWQ6IG51bWJlciA9IG51bGw7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkYXRhW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubWluIDw9IHV0aWwudXNlckRhdGEudHVycmV0TGV2ZWwgJiYgaXRlbS5tYXggPiB1dGlsLnVzZXJEYXRhLnR1cnJldExldmVsKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdHJlYXN1cmVJZCA9IGl0ZW0uaWQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHRyZWFzdXJlSWQpIHtcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNoZWNrSWQgPSAoaWQpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWQgPT0gdHJlYXN1cmVJZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBpc0V4aXN0OiBib29sZWFuID0gdXRpbC51c2VyRGF0YS5oYXZlVHJlYXN1cmUuc29tZShjaGVja0lkKTtcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKGlzRXhpc3QpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vd0lkID09IHRyZWFzdXJlSWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3dJZCA9IHRyZWFzdXJlSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmvILmta7lrp3nrrHlh7rnjrBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWFzdXJlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuYWlyYm9ybmVfdHJlYXN1cmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLmvILmta7lrp3nrrHlh7rnjrBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gKVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIGxldCBpZDpudW1iZXIgPSB1dGlsLmNoZWNrVHJlYXN1cmVTaG93KCk7XG4gICAgICAgIC8vIGlmKHRoaXMubm93SWQ9PWlkKXtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIHRoaXMubm93SWQgPSBpZDtcblxuICAgICAgICAvLyB0aGlzLnRyZWFzdXJlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgLy8gVHJhY2tNZ3IuYWlyYm9ybmVfdHJlYXN1cmUoe1xuICAgICAgICAvLyAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5ryC5rWu5a6d566x5Ye6546wXCJcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG5cbiAgICAvKirngrnlh7vlrp3nrrEgKi9cbiAgICBjbGlja0J0bigpIHtcbiAgICAgICAgLy8gaWYodXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSE9PS0xKXJldHVybjtcbiAgICAgICAgLy8gdGhpcy50cmVhc3VyZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICB0aGlzLnNob3dQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lVHJlYXN1cmUpO1xuICAgICAgICBUcmFja01nci5haXJib3JuZV90cmVhc3VyZSh7XG4gICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLmiZPlvIDmvILmta7lrp3nrrFcIlxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgaWYodGhpcy50aW1lPT1udWxsfHx0aGlzLnRyZWFzdXJlTnVtPD0wKXJldHVybjtcbiAgICAgICAgdGhpcy50aW1lIC09ZHQ7XG4gICAgICAgIGlmKHRoaXMudGltZTw9MCl7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5mbHlBbmkoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==