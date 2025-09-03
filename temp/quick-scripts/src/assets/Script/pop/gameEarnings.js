"use strict";
cc._RF.push(module, '09f411D94FCZ5bts/BBI1cH', 'gameEarnings');
// Script/pop/gameEarnings.ts

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
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameEarnings = /** @class */ (function (_super) {
    __extends(gameEarnings, _super);
    function gameEarnings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layoutNode = null;
        _this.timeLabel = null;
        _this.stateArr = [];
        _this.feed_node = null;
        _this.time = 0;
        //当前第几个
        _this.no = -1;
        return _this;
        // update (dt) {}
    }
    gameEarnings.prototype.init = function () {
        var _this = this;
        util_1.default.post({
            url: UrlConst_1.UrlConst.doubleEarn,
            success: function (res) {
                if (!_this.isValid) {
                    return;
                }
                _this.getState(res);
            }
        });
        // let json =  {
        //     leftTime: 0,
        //     list:[
        //         {incomeNodeName: "30s", incomeNodeId: 30, incomeNodeTime: "30"},
        //         {incomeNodeName: "100s", incomeNodeId: 100, incomeNodeTime: "100"},
        //         {incomeNodeName: "150s", incomeNodeId: 150, incomeNodeTime: "150"},
        //         {incomeNodeName: "200s", incomeNodeId: 200, incomeNodeTime: "200"},
        //         {incomeNodeName: "300s", incomeNodeId: 300, incomeNodeTime: "300"}
        //     ],
        //     nowLitNode: -1,
        //     popupState: 1
        // }
        // this.getState(json);
        /**加载双倍收益视频 */
        // if (!util.adPreObj[AdPosition.Earning]) {
        //     util.preloadAd(AdPosition.Earning);
        // }
    };
    gameEarnings.prototype.start = function () {
    };
    /**
     * 设置状态
     * @param data 数据
     */
    gameEarnings.prototype.getState = function (data) {
        var _this = this;
        this.data = data;
        if (data && data.list && this.layoutNode && this.layoutNode.children) {
            this.layoutNode.children.forEach(function (item, index) {
                var dataItem = data.list[index];
                //查找第几个
                if (dataItem && data.nowLitNode == dataItem.incomeNodeId && data.nowLitNode !== -1) {
                    _this.no = index;
                }
                console.log(dataItem.incomeNodeId <= data.nowLitNode, 'dataItem.incomeNodeId<=data.nowLitNode');
                if (item) {
                    //改变颜色
                    item.children[0].active = dataItem.incomeNodeId <= data.nowLitNode;
                    //改变颜色
                    if (dataItem.incomeNodeId <= data.nowLitNode) {
                        if (dataItem.incomeNodeId == data.nowLitNode && data.popupState == 1) {
                            item.children[1].opacity = 255;
                        }
                        else {
                            item.children[1].opacity = 102;
                        }
                    }
                    //修改节点label文字
                    item.children[1].children[0].getComponent(cc.Label).string = dataItem.incomeNodeName;
                    if (index > 0 && dataItem.incomeNodeId <= data.nowLitNode) {
                        item.children[2].active = true;
                    }
                }
            });
        }
        //转化为s
        this.time = Math.floor(data.leftTime / 1000);
        console.log(data.popupState, 'data.popupState', this.no);
        this.setState(data.popupState);
    };
    /**开启倒计时 */
    gameEarnings.prototype.openDJS = function () {
        var _this = this;
        this.schedule(function () {
            _this.time -= 1;
            if (_this.time <= 0) {
                _this.time = 0;
                _this.no += 1;
                if (_this.no >= _this.data.list.length) {
                    _this.data.popupState = 2;
                    _this.data.incomeNodeId = _this.data.list[_this.data.list.length - 1].incomeNodeId;
                }
                else {
                    _this.data.popupState = 0;
                    _this.data.incomeNodeId = _this.data.list[_this.no];
                }
                _this.getState(_this.data);
                _this.unscheduleAllCallbacks();
            }
            _this.timeLabel.string = tool_1.default.changeTime(_this.time);
        }, 1);
    };
    /**
     * 状态 未加速-0，加速中-1，加速次数已用完-2
     * @param type
     */
    gameEarnings.prototype.setState = function (type) {
        this.stateArr[0].active =
            this.stateArr[1].active =
                this.stateArr[2].active = false;
        var text = null;
        this.popupState = type;
        switch (type) {
            case 0:
                TrackMgr_1.default.double_revenue({
                    activity_state: "未加速",
                    today_times: this.data.list.length - this.no - 1
                });
                TrackMgr_1.default.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "收益翻倍弹窗（未加速状态）"
                });
                break;
            case 1:
                TrackMgr_1.default.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "收益翻倍弹窗（加速中）"
                });
                cc.game.emit(NameTs_1.default.Game_Earnings_Linster, this.time);
                this.openDJS();
                break;
            case 2:
                TrackMgr_1.default.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "收益翻倍弹窗（次数用完）"
                });
                text = "次数已用完";
                TrackMgr_1.default.double_revenue({
                    activity_state: "未次数已用完加速",
                });
                break;
        }
        this.stateArr[type].active = true;
    };
    /**
     * 关闭页面
     */
    gameEarnings.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
        var text = null;
        switch (this.popupState) {
            case 0:
                text = "收益翻倍弹窗（未加速状态）";
                break;
            case 1:
                text = "收益翻倍弹窗（加速中）";
                break;
            case 2:
                text = "收益翻倍弹窗（次数用完）";
                break;
        }
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: text,
            ck_module: "关闭",
        });
    };
    /**
     * 开启
     */
    gameEarnings.prototype.openBtn = function () {
        var _this = this;
        soundController_1.default.singleton.clickAudio();
        if (!this.data)
            return;
        if (this.data.popupState == 2) {
            AssistCtr_1.AssistCtr.showToastTip("加速次数已用完");
            return;
        }
        AdController_1.default.loadAd(AdPosition_1.AdPosition.Earning, function () {
            // util.preloadAd(AdPosition.Earning);
            util_1.default.post({
                url: UrlConst_1.UrlConst.activateEarn,
                success: function (res) {
                    AssistCtr_1.AssistCtr.showToastTip("加速成功");
                    _this.no += 1;
                    util_1.default.doubleEarn.use = true;
                    var time = Number(_this.data.list[_this.no].incomeNodeTime);
                    util_1.default.doubleEarn.time = time;
                    _this.data.incomeNodeId = time;
                    _this.data.leftTime = time * 1000;
                    _this.data.popupState = 1;
                    _this.data.nowLitNode = time;
                    _this.getState(_this.data);
                    TrackMgr_1.default.double_revenue({
                        activity_state: "加速中",
                        acceleration_time: time + "s"
                    });
                    TrackMgr_1.default.AppDialogClick_hcdg({
                        dialog_name_hcdg: "收益翻倍弹窗（未加速状态）",
                        ck_module: "免费领取",
                        active_ad_hcdg: "激励视频"
                    });
                },
                fail: function () {
                    AssistCtr_1.AssistCtr.showToastTip("加速失败");
                }
            });
        }, function () {
            AssistCtr_1.AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    };
    gameEarnings.prototype.onEnable = function () {
        AdController_1.default.loadInfoAd(AdPosition_1.AdPosition.EarningView, 636, this.feed_node); //636:feedNode信息流容器节点的宽度
    };
    gameEarnings.prototype.onDisable = function () {
        AdController_1.default.hideInfoAd(AdPosition_1.AdPosition.EarningView);
    };
    __decorate([
        property({ type: cc.Node, displayName: "layout盒子" })
    ], gameEarnings.prototype, "layoutNode", void 0);
    __decorate([
        property({ type: cc.Label, displayName: "时间" })
    ], gameEarnings.prototype, "timeLabel", void 0);
    __decorate([
        property({ type: [cc.Node], displayName: "状态盒子" })
    ], gameEarnings.prototype, "stateArr", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "信息流" })
    ], gameEarnings.prototype, "feed_node", void 0);
    gameEarnings = __decorate([
        ccclass
    ], gameEarnings);
    return gameEarnings;
}(baseTs_1.default));
exports.default = gameEarnings;

cc._RF.pop();