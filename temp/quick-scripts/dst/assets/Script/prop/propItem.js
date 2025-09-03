
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
var AssistCtr_1 = require("../Assist/AssistCtr");
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
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
        var data = tool_1.default.GetArrData("type", this.propId, util_1.default.propConfig);
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
        var data = tool_1.default.GetArrData("type", this.propId, util_1.default.propConfig);
        TrackMgr_1.default.tool_used({
            tool_name: data.name,
            use_success: isSuccess,
            is_video_tool: isVideo,
            level: "第" + util_1.default.userData.customs.big + "关",
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwcm9wXFxwcm9wSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBR3BDLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsK0NBQThDO0FBRTlDLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQU07SUFBNUM7UUFBQSxxRUFzTkM7UUFuTlcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsU0FBRyxHQUFjLElBQUksQ0FBQztRQUd0QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBSWhDLE1BQU07UUFDRSxhQUFPLEdBQVcsQ0FBQyxDQUFDOztRQXdMNUIsaUJBQWlCO0lBQ3JCLENBQUM7SUFoTEcseUJBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCx3QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDZCQUFVLEdBQVY7UUFDSSxJQUFJLElBQUksQ0FB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TSxFQUFFLENBQUM7K0NBQ2Y7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7OENBQ2Q7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7eUNBQ25CO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO2dEQUNaO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO2dEQUNkO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOzZDQUNmO0lBeEJmLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FzTjVCO0lBQUQsZUFBQztDQXRORCxBQXNOQyxDQXROcUMsZ0JBQU0sR0FzTjNDO2tCQXROb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgcHJvcFByb3BlcnR5LCBwcm9wVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9BRC9BZENvbnRyb2xsZXJcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHByb3BJdGVtIGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLlkI3lrZdcIiB9KVxuICAgIHByaXZhdGUgbmFtZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi6K+05piOXCIgfSlcbiAgICBwcml2YXRlIGV4cGxhaW5MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuaMgee7reaXtumXtFwiIH0pXG4gICAgcHJpdmF0ZSB0aW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLmlbDph49cIiB9KVxuICAgIHByaXZhdGUgbnVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZSwgZGlzcGxheU5hbWU6IFwi5Zu+54mHXCIgfSlcbiAgICBwcml2YXRlIHBpYzogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLnrYnnuqdcIiB9KVxuICAgIHByaXZhdGUgbGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi6ZmQ5Yi255uS5a2QXCIgfSlcbiAgICBwcml2YXRlIGFzdHJpY3RCb3g6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5aKe5YqgXCIgfSlcbiAgICBwcml2YXRlIGFkZEljb246IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpbml0RGF0YTtcblxuICAgIC8v6YGT5YW35pWw6YePXG4gICAgcHJpdmF0ZSBwcm9wTnVtOiBudW1iZXIgPSAwO1xuICAgIC8v5piv5ZCm6KKr6ZmQ5Yi2XG4gICAgcHJpdmF0ZSBpc0FzdHJpY3Q6IGJvb2xlYW47XG5cbiAgICAvL+WIl+ihqGlkXG4gICAgcHJpdmF0ZSBpZDogbnVtYmVyO1xuICAgIC8v6YGT5YW3aWRcbiAgICBwcml2YXRlIHByb3BJZDogbnVtYmVyO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1Byb3BJdGVtX1VwZGF0ZSwgdGhpcy5zZXREYXRhLCB0aGlzKTtcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TdGFydCwgdGhpcy51cGRhdGVEYXRhLCB0aGlzKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXREYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQodGhpcy5pbml0RGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja5cbiAgICAgKi9cbiAgICBpbml0KGRhdGEpIHtcblxuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YTtcblxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pbml0RGF0YS5pZDtcblxuICAgICAgICB0aGlzLm5hbWVMYWJlbC5zdHJpbmcgPSB0aGlzLmluaXREYXRhLmNvbmZpZ05hbWU7XG5cbiAgICAgICAgLy8gaWYodGhpcy5pbml0RGF0YS5wcm9wSXNzdWVEZXRhaWxMaXN0WzBdLnByb3BzSWQ9PXByb3BUeXBlLmF1dG8pe1xuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB9XG5cblxuICAgICAgICBpZih0aGlzLmlzQXN0cmljdCAmJiAodXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZyA+PSB0aGlzLmluaXREYXRhLnByb3BJc3N1ZURldGFpbExpc3RbMF0ubGV2ZWwpKXtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzpcIuaBreWWnOino+mUgeaWsOmBk+WFt1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmga3llpzop6PplIHmlrDpgZPlhbdcIixcbiAgICAgICAgICAgICAgICBja19tb2R1bGU6XCLmlLbkuItcIixcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQXN0cmljdCA9IHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcgPCB0aGlzLmluaXREYXRhLnByb3BJc3N1ZURldGFpbExpc3RbMF0ubGV2ZWw7XG4gICAgICAgIHRoaXMucHJvcElkID0gdGhpcy5pbml0RGF0YS5wcm9wSXNzdWVEZXRhaWxMaXN0WzBdLnByb3BzSWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdERhdGEudGltZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9IHRoaXMuaW5pdERhdGEudGltZSArIFwic1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXhwbGFpbkxhYmVsLnN0cmluZyA9IHRoaXMuaW5pdERhdGEuZXhwbGFpbjtcblxuICAgICAgICB0aGlzLmxvYWRBbnkoXCJ0ZXh0dXJlL3Byb3AvcHJvcFwiICsgdGhpcy5wcm9wSWQsIGNjLlNwcml0ZUZyYW1lLCByZXMgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnBpYy5zcHJpdGVGcmFtZSA9IHJlcztcblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoaXMuYXN0cmljdEJveC5hY3RpdmUgPSB0aGlzLmlzQXN0cmljdDtcblxuICAgICAgICBpZiAodGhpcy5pc0FzdHJpY3QpIHtcbiAgICAgICAgICAgIHRoaXMucGljLm5vZGUuY29sb3IgPSBjYy5jb2xvcigxNDgsIDE0OCwgMTQ4LCAyNTUpO1xuICAgICAgICAgICAgdGhpcy5udW1MYWJlbC5ub2RlLmdldFBhcmVudCgpLmFjdGl2ZSA9IHRoaXMuYWRkSWNvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSBcIueCruWhlFwiICsgdGhpcy5pbml0RGF0YS5sZXZlbCArIFwi57qnXFxu6Kej6ZSBXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGljLm5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXREYXRhKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkvb/nlKhcbiAgICAgKi9cbiAgICBVc2VCdG4oKSB7XG4gICAgICAgIGxldCBkYXRhID0gdG9vbC5HZXRBcnJEYXRhKFwidHlwZVwiLCB0aGlzLnByb3BJZCwgdXRpbC5wcm9wQ29uZmlnKTtcbiAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm5hbWUgIT0gXCJcIil7XG4gICAgICAgICAgICBUcmFja01nci5BcHBDbGljayh7XG4gICAgICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6aaW6aG1XCIsXG4gICAgICAgICAgICAgICAgYXBwX2NrX21vZHVsZTogYOmBk+WFty0ke2RhdGEubmFtZX1gLFxuICAgICAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImJhbm5lclwiLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMuaXNBc3RyaWN0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbml0RGF0YSAmJiB0aGlzLmluaXREYXRhLnByb3BJc3N1ZURldGFpbExpc3RbMF0gJiYgdGhpcy5pbml0RGF0YS5wcm9wSXNzdWVEZXRhaWxMaXN0WzBdLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChgJHt0aGlzLmluaXREYXRhLnByb3BJc3N1ZURldGFpbExpc3RbMF0ubGV2ZWx95YWz6Kej6ZSBYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi6ZmQ5Yi26YGT5YW3LOi/mOacquWIsOetiee6p1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24ucGxheU11c2ljKE5hbWVUcy5jbGlja05vQWxsb3dlZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcE51bSA8PSAwKSB7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOlwi5pyq6I635b6X6K+l6YGT5YW3XCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuacquiOt+W+l+ivpemBk+WFt1wiLFxuICAgICAgICAgICAgICAgIGNrX21vZHVsZTpcIumihuWPllwiLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qb3BfT3Blbiwge1xuICAgICAgICAgICAgICAgIG5hbWU6IHBhZ2VUcy5wYWdlTmFtZS5HYW1lVG9vbEdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSWQ6IHRoaXMucHJvcElkLCAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogdGhpcy5ub2RlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1dGlsLnByb3BzX251bWJlcisrO1xuICAgICAgICAgICAgWE1TREsudHJhY2tVc2VyUHJvcGVydGllcyh7XG4gICAgICAgICAgICAgICAgcHJvcHNfbnVtYmVyOiB1dGlsLnByb3BzX251bWJlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHV0aWwucG9zdCh7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LnVzZVByb3AsXG4gICAgICAgICAgICBkYXRhOiB7IHByb3BJZDogdGhpcy5wcm9wSWQgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRNVHJhY2soZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbC5Vc2VQcm9wKHRoaXMucHJvcElkKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5L2/55So6YGT5YW3XCIsIHRoaXMucHJvcElkKTtcbiAgICAgICAgdGhpcy5zZW5kTVRyYWNrKHRydWUsIGZhbHNlKTtcbiAgICAgICAgdXRpbC5nYW1lUHJvcE51bSArPSAxO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKirmmK/lkKYgKi9cbiAgICBzZW5kTVRyYWNrKGlzU3VjY2VzczogYm9vbGVhbiwgaXNWaWRlbzogYm9vbGVhbikge1xuXG4gICAgICAgIGxldCBkYXRhID0gdG9vbC5HZXRBcnJEYXRhKFwidHlwZVwiLCB0aGlzLnByb3BJZCwgdXRpbC5wcm9wQ29uZmlnKTtcblxuICAgICAgICBUcmFja01nci50b29sX3VzZWQoe1xuICAgICAgICAgICAgdG9vbF9uYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgICAgICB1c2Vfc3VjY2VzczogaXNTdWNjZXNzLFxuICAgICAgICAgICAgaXNfdmlkZW9fdG9vbDogaXNWaWRlbyxcbiAgICAgICAgICAgIGxldmVsOiBcIuesrFwiICsgdXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZyArIFwi5YWzXCIsXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvKirorr7nva7kuIDkuIvpgZPlhbfmlbDph48gKi9cbiAgICBzZXREYXRhKCkge1xuXG4gICAgICAgIHRoaXMucHJvcE51bSA9IHV0aWwuR2V0UHJvcE51bSh0aGlzLnByb3BJZCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm51bUxhYmVsLm5vZGUuZ2V0UGFyZW50KCkuYWN0aXZlID0gdGhpcy5wcm9wTnVtID4gMDtcblxuICAgICAgICB0aGlzLmFkZEljb24uYWN0aXZlID0gdGhpcy5wcm9wTnVtID09IDA7XG5cbiAgICAgICAgdGhpcy5udW1MYWJlbC5zdHJpbmcgPSB0aGlzLnByb3BOdW0gKyBcIlwiO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5ub2RlLndpZHRoID0gdGhpcy5wcm9wTnVtID09IDA/MDo4MDtcbiAgICB9XG5cbiAgICBcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=