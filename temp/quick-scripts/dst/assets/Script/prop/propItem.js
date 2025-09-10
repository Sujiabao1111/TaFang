
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/prop/propItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3e6eyF3DpCUrwg5smpHP9Y', 'propItem');
// Script/prop/propItem.ts

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
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var propItem = /** @class */ (function (_super) {
    __extends(propItem, _super);
    function propItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.explainLabel = null;
        _this.timeLabel = null;
        _this.numLabel = null;
        _this.pic = null;
        _this.levelLabel = null;
        _this.astrictBox = null;
        _this.addIcon = null;
        //道具数量
        _this.propNum = 0;
        return _this;
        // update (dt) {}
    }
    propItem.prototype.onLoad = function () {
        cc.game.on(NameTs_1.default.Game_PropItem_Update, this.setData, this);
        cc.game.on(NameTs_1.default.Game_Start, this.updateData, this);
    };
    propItem.prototype.start = function () {
    };
    propItem.prototype.updateData = function () {
        if (this.initData) {
            this.init(this.initData);
        }
    };
    /**
     * 初始化
     * @param data 数据
     */
    propItem.prototype.init = function (data) {
        var _this = this;
        this.initData = data;
        this.id = this.initData.id;
        this.nameLabel.string = this.initData.configName;
        // if(this.initData.propIssueDetailList[0].propsId==propType.auto){
        //     this.node.active = false;
        // }
        if (this.isAstrict && (util_1.default.userData.customs.big >= this.initData.propIssueDetailList[0].level)) {
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "恭喜解锁新道具"
            });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "恭喜解锁新道具",
                ck_module: "收下",
            });
        }
        this.isAstrict = util_1.default.userData.customs.big < this.initData.propIssueDetailList[0].level;
        this.propId = this.initData.propIssueDetailList[0].propsId;
        if (this.initData.time > 0) {
            this.timeLabel.string = this.initData.time + "s";
        }
        else {
            this.timeLabel.node.active = false;
        }
        this.explainLabel.string = this.initData.explain;
        this.loadAny("texture/prop/prop" + this.propId, cc.SpriteFrame, function (res) {
            _this.pic.spriteFrame = res;
        });
        this.astrictBox.active = this.isAstrict;
        if (this.isAstrict) {
            this.pic.node.color = cc.color(148, 148, 148, 255);
            this.numLabel.node.getParent().active = this.addIcon.active = false;
            this.levelLabel.string = "炮塔" + this.initData.level + "级\n解锁";
        }
        else {
            this.pic.node.color = cc.color(255, 255, 255, 255);
        }
        this.setData();
    };
    /**
     * 使用
     */
    propItem.prototype.UseBtn = function () {
        var _this = this;
        var data = Tools_1.Tools.GetArrData("type", this.propId, util_1.default.propConfig);
        if (data && data.name != "") {
            TrackMgr_1.default.AppClick({
                app_page_title: "首页",
                app_ck_module: "\u9053\u5177-" + data.name,
                app_exposure_type: "banner",
            });
        }
        if (this.isAstrict) {
            if (this.initData && this.initData.propIssueDetailList[0] && this.initData.propIssueDetailList[0].level) {
                AssistCtr_1.AssistCtr.showToastTip(this.initData.propIssueDetailList[0].level + "\u5173\u89E3\u9501");
            }
            else {
                AssistCtr_1.AssistCtr.showToastTip("限制道具,还未到等级");
            }
            soundController_1.default.singleton.playMusic(NameTs_1.default.clickNoAllowed);
            return;
        }
        soundController_1.default.singleton.clickAudio();
        if (this.propNum <= 0) {
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "未获得该道具"
            });
            TrackMgr_1.default.AppDialogClick_hcdg({
                dialog_name_hcdg: "未获得该道具",
                ck_module: "领取",
            });
            cc.game.emit(NameTs_1.default.Game_Pop_Open, {
                name: pageTs_1.default.pageName.GameToolGet,
                data: {
                    id: this.id,
                    propId: this.propId,
                    node: this.node
                }
            });
            util_1.default.props_number++;
            XMSDK_1.default.trackUserProperties({
                props_number: util_1.default.props_number,
            });
            return;
        }
        util_1.default.post({
            url: UrlConst_1.UrlConst.useProp,
            data: { propId: this.propId },
            success: function () {
            },
            fail: function () {
                _this.sendMTrack(false, false);
            }
        });
        util_1.default.UseProp(this.propId);
        this.setData();
        console.log("使用道具", this.propId);
        this.sendMTrack(true, false);
        util_1.default.gamePropNum += 1;
    };
    /**是否 */
    propItem.prototype.sendMTrack = function (isSuccess, isVideo) {
        var data = Tools_1.Tools.GetArrData("type", this.propId, util_1.default.propConfig);
    };
    /**设置一下道具数量 */
    propItem.prototype.setData = function () {
        this.propNum = util_1.default.GetPropNum(this.propId);
        this.numLabel.node.getParent().active = this.propNum > 0;
        this.addIcon.active = this.propNum == 0;
        this.numLabel.string = this.propNum + "";
        // this.node.width = this.propNum == 0?0:80;
    };
    __decorate([
        property({ type: cc.Label, displayName: "名字" })
    ], propItem.prototype, "nameLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "说明" })
    ], propItem.prototype, "explainLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "持续时间" })
    ], propItem.prototype, "timeLabel", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "数量" })
    ], propItem.prototype, "numLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, displayName: "图片" })
    ], propItem.prototype, "pic", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "等级" })
    ], propItem.prototype, "levelLabel", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "限制盒子" })
    ], propItem.prototype, "astrictBox", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "增加" })
    ], propItem.prototype, "addIcon", void 0);
    propItem = __decorate([
        ccclass
    ], propItem);
    return propItem;
}(baseTs_1.default));
exports.default = propItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwcm9wXFxwcm9wSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBR3BDLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsK0NBQThDO0FBQzlDLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHVDQUFzQztBQUN0QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQU07SUFBNUM7UUFBQSxxRUFpTkM7UUE5TVcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsU0FBRyxHQUFjLElBQUksQ0FBQztRQUd0QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBSWhDLE1BQU07UUFDRSxhQUFPLEdBQVcsQ0FBQyxDQUFDOztRQW1MNUIsaUJBQWlCO0lBQ3JCLENBQUM7SUEzS0cseUJBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCx3QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDZCQUFVLEdBQVY7UUFDSSxJQUFJLElBQUksQ0FB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O3lDQUNuQjtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztnREFDWjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQztnREFDZDtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQzs2Q0FDZjtJQXhCZixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBaU41QjtJQUFELGVBQUM7Q0FqTkQsQUFpTkMsQ0FqTnFDLGdCQUFNLEdBaU4zQztrQkFqTm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCB7IHByb3BQcm9wZXJ0eSwgcHJvcFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi91dGlsL1Rvb2xzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwcm9wSXRlbSBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5ZCN5a2XXCIgfSlcbiAgICBwcml2YXRlIG5hbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuivtOaYjlwiIH0pXG4gICAgcHJpdmF0ZSBleHBsYWluTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmjIHnu63ml7bpl7RcIiB9KVxuICAgIHByaXZhdGUgdGltZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5pWw6YePXCIgfSlcbiAgICBwcml2YXRlIG51bUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TcHJpdGUsIGRpc3BsYXlOYW1lOiBcIuWbvueJh1wiIH0pXG4gICAgcHJpdmF0ZSBwaWM6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi562J57qnXCIgfSlcbiAgICBwcml2YXRlIGxldmVsTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIumZkOWItuebkuWtkFwiIH0pXG4gICAgcHJpdmF0ZSBhc3RyaWN0Qm94OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuWinuWKoFwiIH0pXG4gICAgcHJpdmF0ZSBhZGRJY29uOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgaW5pdERhdGE7XG5cbiAgICAvL+mBk+WFt+aVsOmHj1xuICAgIHByaXZhdGUgcHJvcE51bTogbnVtYmVyID0gMDtcbiAgICAvL+aYr+WQpuiiq+mZkOWItlxuICAgIHByaXZhdGUgaXNBc3RyaWN0OiBib29sZWFuO1xuXG4gICAgLy/liJfooahpZFxuICAgIHByaXZhdGUgaWQ6IG51bWJlcjtcbiAgICAvL+mBk+WFt2lkXG4gICAgcHJpdmF0ZSBwcm9wSWQ6IG51bWJlcjtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Qcm9wSXRlbV9VcGRhdGUsIHRoaXMuc2V0RGF0YSwgdGhpcyk7XG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfU3RhcnQsIHRoaXMudXBkYXRlRGF0YSwgdGhpcyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5pbml0RGF0YSkge1xuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMuaW5pdERhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyWXG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICovXG4gICAgaW5pdChkYXRhKSB7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaW5pdERhdGEuaWQ7XG5cbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gdGhpcy5pbml0RGF0YS5jb25maWdOYW1lO1xuXG4gICAgICAgIC8vIGlmKHRoaXMuaW5pdERhdGEucHJvcElzc3VlRGV0YWlsTGlzdFswXS5wcm9wc0lkPT1wcm9wVHlwZS5hdXRvKXtcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgaWYgKHRoaXMuaXNBc3RyaWN0ICYmICh1dGlsLnVzZXJEYXRhLmN1c3RvbXMuYmlnID49IHRoaXMuaW5pdERhdGEucHJvcElzc3VlRGV0YWlsTGlzdFswXS5sZXZlbCkpIHtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmga3llpzop6PplIHmlrDpgZPlhbdcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5oGt5Zac6Kej6ZSB5paw6YGT5YW3XCIsXG4gICAgICAgICAgICAgICAgY2tfbW9kdWxlOiBcIuaUtuS4i1wiLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNBc3RyaWN0ID0gdXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZyA8IHRoaXMuaW5pdERhdGEucHJvcElzc3VlRGV0YWlsTGlzdFswXS5sZXZlbDtcbiAgICAgICAgdGhpcy5wcm9wSWQgPSB0aGlzLmluaXREYXRhLnByb3BJc3N1ZURldGFpbExpc3RbMF0ucHJvcHNJZDtcblxuICAgICAgICBpZiAodGhpcy5pbml0RGF0YS50aW1lID4gMCkge1xuICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gdGhpcy5pbml0RGF0YS50aW1lICsgXCJzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHBsYWluTGFiZWwuc3RyaW5nID0gdGhpcy5pbml0RGF0YS5leHBsYWluO1xuXG4gICAgICAgIHRoaXMubG9hZEFueShcInRleHR1cmUvcHJvcC9wcm9wXCIgKyB0aGlzLnByb3BJZCwgY2MuU3ByaXRlRnJhbWUsIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMucGljLnNwcml0ZUZyYW1lID0gcmVzO1xuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5hc3RyaWN0Qm94LmFjdGl2ZSA9IHRoaXMuaXNBc3RyaWN0O1xuXG4gICAgICAgIGlmICh0aGlzLmlzQXN0cmljdCkge1xuICAgICAgICAgICAgdGhpcy5waWMubm9kZS5jb2xvciA9IGNjLmNvbG9yKDE0OCwgMTQ4LCAxNDgsIDI1NSk7XG4gICAgICAgICAgICB0aGlzLm51bUxhYmVsLm5vZGUuZ2V0UGFyZW50KCkuYWN0aXZlID0gdGhpcy5hZGRJY29uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IFwi54Ku5aGUXCIgKyB0aGlzLmluaXREYXRhLmxldmVsICsgXCLnuqdcXG7op6PplIFcIlxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5waWMubm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldERhdGEoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS9v+eUqFxuICAgICAqL1xuICAgIFVzZUJ0bigpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBUb29scy5HZXRBcnJEYXRhKFwidHlwZVwiLCB0aGlzLnByb3BJZCwgdXRpbC5wcm9wQ29uZmlnKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5uYW1lICE9IFwiXCIpIHtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgICAgICBhcHBfcGFnZV90aXRsZTogXCLpppbpobVcIixcbiAgICAgICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBg6YGT5YW3LSR7ZGF0YS5uYW1lfWAsXG4gICAgICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiYmFubmVyXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5pc0FzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXREYXRhICYmIHRoaXMuaW5pdERhdGEucHJvcElzc3VlRGV0YWlsTGlzdFswXSAmJiB0aGlzLmluaXREYXRhLnByb3BJc3N1ZURldGFpbExpc3RbMF0ubGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKGAke3RoaXMuaW5pdERhdGEucHJvcElzc3VlRGV0YWlsTGlzdFswXS5sZXZlbH3lhbPop6PplIFgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLpmZDliLbpgZPlhbcs6L+Y5pyq5Yiw562J57qnXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5TXVzaWMoTmFtZVRzLmNsaWNrTm9BbGxvd2VkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wTnVtIDw9IDApIHtcblxuXG4gICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5pyq6I635b6X6K+l6YGT5YW3XCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuacquiOt+W+l+ivpemBk+WFt1wiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLpooblj5ZcIixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwYWdlVHMucGFnZU5hbWUuR2FtZVRvb2xHZXQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElkOiB0aGlzLnByb3BJZCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogdGhpcy5ub2RlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1dGlsLnByb3BzX251bWJlcisrO1xuICAgICAgICAgICAgWE1TREsudHJhY2tVc2VyUHJvcGVydGllcyh7XG4gICAgICAgICAgICAgICAgcHJvcHNfbnVtYmVyOiB1dGlsLnByb3BzX251bWJlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHV0aWwucG9zdCh7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LnVzZVByb3AsXG4gICAgICAgICAgICBkYXRhOiB7IHByb3BJZDogdGhpcy5wcm9wSWQgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRNVHJhY2soZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbC5Vc2VQcm9wKHRoaXMucHJvcElkKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5L2/55So6YGT5YW3XCIsIHRoaXMucHJvcElkKTtcbiAgICAgICAgdGhpcy5zZW5kTVRyYWNrKHRydWUsIGZhbHNlKTtcbiAgICAgICAgdXRpbC5nYW1lUHJvcE51bSArPSAxO1xuXG4gICAgfVxuXG4gICAgLyoq5piv5ZCmICovXG4gICAgc2VuZE1UcmFjayhpc1N1Y2Nlc3M6IGJvb2xlYW4sIGlzVmlkZW86IGJvb2xlYW4pIHtcblxuICAgICAgICBsZXQgZGF0YSA9IFRvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsIHRoaXMucHJvcElkLCB1dGlsLnByb3BDb25maWcpO1xuXG4gICAgXG5cbiAgICB9XG5cbiAgICAvKirorr7nva7kuIDkuIvpgZPlhbfmlbDph48gKi9cbiAgICBzZXREYXRhKCkge1xuXG4gICAgICAgIHRoaXMucHJvcE51bSA9IHV0aWwuR2V0UHJvcE51bSh0aGlzLnByb3BJZCk7XG5cbiAgICAgICAgdGhpcy5udW1MYWJlbC5ub2RlLmdldFBhcmVudCgpLmFjdGl2ZSA9IHRoaXMucHJvcE51bSA+IDA7XG5cbiAgICAgICAgdGhpcy5hZGRJY29uLmFjdGl2ZSA9IHRoaXMucHJvcE51bSA9PSAwO1xuXG4gICAgICAgIHRoaXMubnVtTGFiZWwuc3RyaW5nID0gdGhpcy5wcm9wTnVtICsgXCJcIjtcblxuICAgICAgICAvLyB0aGlzLm5vZGUud2lkdGggPSB0aGlzLnByb3BOdW0gPT0gMD8wOjgwO1xuICAgIH1cblxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19