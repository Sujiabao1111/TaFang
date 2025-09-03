"use strict";
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