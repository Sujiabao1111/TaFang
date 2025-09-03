
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/heaven/heavenItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3b9efP+rSJAmarFKQ0l6qP1', 'heavenItem');
// Script/heaven/heavenItem.ts

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
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var heavenItem = /** @class */ (function (_super) {
    __extends(heavenItem, _super);
    function heavenItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**是否需要视频 */
        _this.isVideo = true;
        return _this;
        // update (dt) {}
    }
    /**数据 */
    heavenItem.prototype.init = function (data) {
        this.initData = data.data;
        this.no = data.no;
        var pos = cc.Vec2.clone(util_1.default.GetPlaceData(data.no).pos);
        this.node.setPosition(pos);
        this.node.opacity = 0;
        this.node.stopAllActions();
        cc.tween(this.node).by(0, { y: 200 }).by(.4, { y: -200, opacity: 255 }).repeatForever(cc.tween().delay(Math.random()).to(.5, { y: pos.y + 10 }).to(.5, { y: pos.y })).start();
        this.checkTwoHeaven();
        console.log("位置：" + this.no, "," + (this.isVideo ? "" : "不") + "看视频红包");
    };
    heavenItem.prototype.start = function () {
    };
    /**
     * 点击
     */
    heavenItem.prototype.clickBtn = function () {
        if (util_1.default.heavenTouch)
            return;
        util_1.default.heavenTouch = true;
        // console.log(PageManage.singleton.findPage(pageTs.pageName.GameHeavenReward),'PageManage.singleton.findPage(pageTs.pageName.GameHeavenReward)')
        // if(!PageManage.singleton.findPage(pageTs.pageName.GameHeavenReward)){
        soundController_1.default.singleton.clickAudio();
        this.showPage(pageTs_1.default.pageName.GameHeavenReward, { data: this.initData, no: this.no, item: this.node, isVideo: this.isVideo, node: this.node });
        TrackMgr_1.default.airborne_gold({
            activity_state: "金币点击",
        });
        // }                                
    };
    /**
     * 检测是否有两个天降金币
     */
    heavenItem.prototype.checkTwoHeaven = function () {
        if (!util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
            this.isVideo = true;
            return;
        }
        if (util_1.default.existVideoCoinNum < 2) {
            this.isVideo = Math.random() > .5;
            if (this.isVideo) {
                util_1.default.existVideoCoinNum++;
            }
        }
        else {
            this.isVideo = false;
        }
    };
    heavenItem = __decorate([
        ccclass
    ], heavenItem);
    return heavenItem;
}(baseTs_1.default));
exports.default = heavenItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxoZWF2ZW5cXGhlYXZlbkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBRXBDLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFHdEMsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFDaEMsOEJBQThCO0FBQzlCLDRDQUE0QztBQUM1Qyw0QkFBNEI7QUFDdEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQU07SUFBOUM7UUFBQSxxRUFxRUM7UUE5REcsWUFBWTtRQUNKLGFBQU8sR0FBVyxJQUFJLENBQUM7O1FBNEQvQixpQkFBaUI7SUFDckIsQ0FBQztJQTNERyxRQUFRO0lBQ1IseUJBQUksR0FBSixVQUFLLElBQUk7UUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FDdkUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUN2RSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBR1YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsR0FBRyxHQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQSxHQUFHLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBQztJQUVoRSxDQUFDO0lBRUQsMEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRDs7T0FFRztJQUNILDZCQUFRLEdBQVI7UUFDSSxJQUFHLGNBQUksQ0FBQyxXQUFXO1lBQUMsT0FBTztRQUMzQixjQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixpSkFBaUo7UUFDakosd0VBQXdFO1FBQ3BFLHlCQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXZDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbkksa0JBQVEsQ0FBQyxhQUFhLENBQUM7WUFDbkIsY0FBYyxFQUFFLE1BQU07U0FDekIsQ0FBQyxDQUFBO1FBQ04sb0NBQW9DO0lBQ3hDLENBQUM7SUFDRDs7T0FFRztJQUNGLG1DQUFjLEdBQWQ7UUFDRyxJQUFHLENBQUMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7WUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsT0FBTztTQUNWO1FBQ0QsSUFBRyxjQUFJLENBQUMsaUJBQWlCLEdBQUMsQ0FBQyxFQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEVBQUUsQ0FBQztZQUNoQyxJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUM7Z0JBQ1osY0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDNUI7U0FDSjthQUFJO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDeEI7SUFFTCxDQUFDO0lBbEVnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBcUU5QjtJQUFELGlCQUFDO0NBckVELEFBcUVDLENBckV1QyxnQkFBTSxHQXFFN0M7a0JBckVvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCBQYWdlTWFuYWdlIGZyb20gXCIuLi9QYWdlTWFuYWdlXCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcbi8v55S15a2Q6YKu5Lu2cHVoYWxza2lqc2VtZW5AZ21haWwuY29tXG4vL+a6kOeggee9keermSDlvIB2cG7lhajlsYDmqKHlvI/miZPlvIAgaHR0cDovL3dlYjNpbmN1YmF0b3JzLmNvbS9cbi8v55S15oqlaHR0cHM6Ly90Lm1lL2dhbWVjb2RlOTk5XG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGhlYXZlbkl0ZW0gZXh0ZW5kcyBiYXNlVHMge1xuXG5cbiAgICBwcml2YXRlIGluaXREYXRhOmFueTtcbiAgICAvL+S9jee9rlxuICAgIHByaXZhdGUgbm86bnVtYmVyO1xuICAgIFxuICAgIC8qKuaYr+WQpumcgOimgeinhumikSAqL1xuICAgIHByaXZhdGUgaXNWaWRlbzpib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICAvKirmlbDmja4gKi9cbiAgICBpbml0KGRhdGEpe1xuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YS5kYXRhO1xuICAgICAgICB0aGlzLm5vID0gZGF0YS5ubztcbiAgICAgICAgbGV0IHBvczpjYy5WZWMyID0gY2MuVmVjMi5jbG9uZSh1dGlsLkdldFBsYWNlRGF0YShkYXRhLm5vKS5wb3MpO1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5ieSgwLHt5OjIwMH0pLmJ5KC40LHt5Oi0yMDAsb3BhY2l0eToyNTV9KS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgY2MudHdlZW4oKS5kZWxheShNYXRoLnJhbmRvbSgpKS50byguNSx7eTpwb3MueSsxMH0pLnRvKC41LHt5OnBvcy55fSlcbiAgICAgICAgKS5zdGFydCgpO1xuXG5cbiAgICAgICAgdGhpcy5jaGVja1R3b0hlYXZlbigpO1xuXG4gICAgICAgY29uc29sZS5sb2coXCLkvY3nva7vvJpcIit0aGlzLm5vLFwiLFwiKyh0aGlzLmlzVmlkZW8/XCJcIjpcIuS4jVwiKStcIueci+inhumikee6ouWMhVwiKTtcblxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeCueWHu1xuICAgICAqL1xuICAgIGNsaWNrQnRuKCl7ICAgICAgICBcbiAgICAgICAgaWYodXRpbC5oZWF2ZW5Ub3VjaClyZXR1cm47XG4gICAgICAgIHV0aWwuaGVhdmVuVG91Y2ggPSB0cnVlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhQYWdlTWFuYWdlLnNpbmdsZXRvbi5maW5kUGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUhlYXZlblJld2FyZCksJ1BhZ2VNYW5hZ2Uuc2luZ2xldG9uLmZpbmRQYWdlKHBhZ2VUcy5wYWdlTmFtZS5HYW1lSGVhdmVuUmV3YXJkKScpXG4gICAgICAgIC8vIGlmKCFQYWdlTWFuYWdlLnNpbmdsZXRvbi5maW5kUGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUhlYXZlblJld2FyZCkpe1xuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVIZWF2ZW5SZXdhcmQse2RhdGE6dGhpcy5pbml0RGF0YSxubzp0aGlzLm5vLGl0ZW06dGhpcy5ub2RlLGlzVmlkZW86dGhpcy5pc1ZpZGVvLG5vZGU6dGhpcy5ub2RlfSk7XG4gICAgICAgICAgICBUcmFja01nci5haXJib3JuZV9nb2xkKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZTogXCLph5HluIHngrnlh7tcIixcbiAgICAgICAgICAgIH0pICAgXG4gICAgICAgIC8vIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmo4DmtYvmmK/lkKbmnInkuKTkuKrlpKnpmY3ph5HluIFcbiAgICAgKi9cbiAgICAgY2hlY2tUd29IZWF2ZW4oKXtcbiAgICAgICAgaWYoIXV0aWwuY2hlY2tUZXN0QihOYW1lVHMuaGVhdmVuX2NvaW5fdGVzdCkpe1xuICAgICAgICAgICAgdGhpcy5pc1ZpZGVvID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZih1dGlsLmV4aXN0VmlkZW9Db2luTnVtPDIpe1xuICAgICAgICAgICAgdGhpcy5pc1ZpZGVvID0gTWF0aC5yYW5kb20oKT4uNTtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNWaWRlbyl7XG4gICAgICAgICAgICAgICAgdXRpbC5leGlzdFZpZGVvQ29pbk51bSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaXNWaWRlbyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19