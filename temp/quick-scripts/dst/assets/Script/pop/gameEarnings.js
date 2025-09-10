
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameEarnings.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09f411D94FCZ5bts/BBI1cH', 'gameEarnings');
// Script/pop/gameEarnings.ts

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVFYXJuaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBc0M7QUFDdEMsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUErUEM7UUE1UFcsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixjQUFRLEdBQWMsRUFBRSxDQUFDO1FBR3pCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFNMUIsVUFBSSxHQUFXLENBQUMsQ0FBQztRQUV6QixPQUFPO1FBQ0MsUUFBRSxHQUFXLENBQUMsQ0FBQyxDQUFDOztRQXlPeEIsaUJBQWlCO0lBQ3JCLENBQUM7SUFyT0csMkJBQUksR0FBSjtRQUFBLGlCQStCQztRQTdCRyxjQUFJLENBQUMsSUFBSSxDQUFDO1lBQ04sR0FBRyxFQUFFLG1CQUFRLENBQUMsVUFBVTtZQUN4QixPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUNULElBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFDO29CQUNiLE9BQU87aUJBQ1Y7Z0JBQ0QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBR0gsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixhQUFhO1FBQ2IsMkVBQTJFO1FBQzNFLDhFQUE4RTtRQUM5RSw4RUFBOEU7UUFDOUUsOEVBQThFO1FBQzlFLDZFQUE2RTtRQUM3RSxTQUFTO1FB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LENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUM7b0RBQ2xCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO21EQUNiO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQztrREFDbEI7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7bURBQ2Q7SUFaakIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQStQaEM7SUFBRCxtQkFBQztDQS9QRCxBQStQQyxDQS9QeUMsZ0JBQU0sR0ErUC9DO2tCQS9Qb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XHJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XHJcbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcclxuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xyXG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcclxuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vdXRpbC90b29sXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lRWFybmluZ3MgZXh0ZW5kcyBiYXNlVHMge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcImxheW91dOebkuWtkFwiIH0pXHJcbiAgICBwcml2YXRlIGxheW91dE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsLCBkaXNwbGF5TmFtZTogXCLml7bpl7RcIiB9KVxyXG4gICAgcHJpdmF0ZSB0aW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTm9kZV0sIGRpc3BsYXlOYW1lOiBcIueKtuaAgeebkuWtkFwiIH0pXHJcbiAgICBwcml2YXRlIHN0YXRlQXJyOiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLkv6Hmga/mtYFcIiB9KVxyXG4gICAgcHJpdmF0ZSBmZWVkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHByaXZhdGUgZGF0YTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgdGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvL+W9k+WJjeesrOWHoOS4qlxyXG4gICAgcHJpdmF0ZSBubzogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLy/nsbvlnotcclxuICAgIHBvcHVwU3RhdGU6IG51bWJlcjtcclxuXHJcbiAgICBpbml0KCkge1xyXG5cclxuICAgICAgICB1dGlsLnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmRvdWJsZUVhcm4sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RhdGUocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gbGV0IGpzb24gPSAge1xyXG4gICAgICAgIC8vICAgICBsZWZ0VGltZTogMCxcclxuICAgICAgICAvLyAgICAgbGlzdDpbXHJcbiAgICAgICAgLy8gICAgICAgICB7aW5jb21lTm9kZU5hbWU6IFwiMzBzXCIsIGluY29tZU5vZGVJZDogMzAsIGluY29tZU5vZGVUaW1lOiBcIjMwXCJ9LFxyXG4gICAgICAgIC8vICAgICAgICAge2luY29tZU5vZGVOYW1lOiBcIjEwMHNcIiwgaW5jb21lTm9kZUlkOiAxMDAsIGluY29tZU5vZGVUaW1lOiBcIjEwMFwifSxcclxuICAgICAgICAvLyAgICAgICAgIHtpbmNvbWVOb2RlTmFtZTogXCIxNTBzXCIsIGluY29tZU5vZGVJZDogMTUwLCBpbmNvbWVOb2RlVGltZTogXCIxNTBcIn0sXHJcbiAgICAgICAgLy8gICAgICAgICB7aW5jb21lTm9kZU5hbWU6IFwiMjAwc1wiLCBpbmNvbWVOb2RlSWQ6IDIwMCwgaW5jb21lTm9kZVRpbWU6IFwiMjAwXCJ9LFxyXG4gICAgICAgIC8vICAgICAgICAge2luY29tZU5vZGVOYW1lOiBcIjMwMHNcIiwgaW5jb21lTm9kZUlkOiAzMDAsIGluY29tZU5vZGVUaW1lOiBcIjMwMFwifVxyXG4gICAgICAgIC8vICAgICBdLFxyXG4gICAgICAgIC8vICAgICBub3dMaXROb2RlOiAtMSxcclxuICAgICAgICAvLyAgICAgcG9wdXBTdGF0ZTogMVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0aGlzLmdldFN0YXRlKGpzb24pO1xyXG5cclxuICAgICAgICAvKirliqDovb3lj4zlgI3mlLbnm4rop4bpopEgKi9cclxuICAgICAgICAvLyBpZiAoIXV0aWwuYWRQcmVPYmpbQWRQb3NpdGlvbi5FYXJuaW5nXSkge1xyXG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkVhcm5pbmcpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nirbmgIFcclxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBnZXRTdGF0ZShkYXRhKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGlzdCAmJiB0aGlzLmxheW91dE5vZGUgJiYgdGhpcy5sYXlvdXROb2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Tm9kZS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4geyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhSXRlbSA9IGRhdGEubGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAvL+afpeaJvuesrOWHoOS4qlxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFJdGVtICYmIGRhdGEubm93TGl0Tm9kZSA9PSBkYXRhSXRlbS5pbmNvbWVOb2RlSWQgJiYgZGF0YS5ub3dMaXROb2RlICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm8gPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFJdGVtLmluY29tZU5vZGVJZCA8PSBkYXRhLm5vd0xpdE5vZGUsICdkYXRhSXRlbS5pbmNvbWVOb2RlSWQ8PWRhdGEubm93TGl0Tm9kZScpXHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pS55Y+Y6aKc6ImyXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlblswXS5hY3RpdmUgPSBkYXRhSXRlbS5pbmNvbWVOb2RlSWQgPD0gZGF0YS5ub3dMaXROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pS55Y+Y6aKc6ImyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFJdGVtLmluY29tZU5vZGVJZCA8PSBkYXRhLm5vd0xpdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFJdGVtLmluY29tZU5vZGVJZCA9PSBkYXRhLm5vd0xpdE5vZGUgJiYgZGF0YS5wb3B1cFN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW5bMV0ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW5bMV0ub3BhY2l0eSA9IDEwMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+S/ruaUueiKgueCuWxhYmVs5paH5a2XXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFJdGVtLmluY29tZU5vZGVOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgZGF0YUl0ZW0uaW5jb21lTm9kZUlkIDw9IGRhdGEubm93TGl0Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+i9rOWMluS4unNcclxuICAgICAgICB0aGlzLnRpbWUgPSBNYXRoLmZsb29yKGRhdGEubGVmdFRpbWUgLyAxMDAwKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnBvcHVwU3RhdGUsICdkYXRhLnBvcHVwU3RhdGUnLCB0aGlzLm5vKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZGF0YS5wb3B1cFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlvIDlkK/lgJLorqHml7YgKi9cclxuICAgIG9wZW5ESlMoKSB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSAtPSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vICs9IDE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ubyA+PSB0aGlzLmRhdGEubGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucG9wdXBTdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmluY29tZU5vZGVJZCA9IHRoaXMuZGF0YS5saXN0W3RoaXMuZGF0YS5saXN0Lmxlbmd0aCAtIDFdLmluY29tZU5vZGVJZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnBvcHVwU3RhdGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5pbmNvbWVOb2RlSWQgPSB0aGlzLmRhdGEubGlzdFt0aGlzLm5vXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RhdGUodGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9IHRvb2wuY2hhbmdlVGltZSh0aGlzLnRpbWUpO1xyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeKtuaAgSDmnKrliqDpgJ8tMO+8jOWKoOmAn+S4rS0x77yM5Yqg6YCf5qyh5pWw5bey55So5a6MLTJcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBzZXRTdGF0ZSh0eXBlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXRlQXJyWzBdLmFjdGl2ZSA9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVBcnJbMV0uYWN0aXZlID1cclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUFyclsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcHVwU3RhdGUgPSB0eXBlO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBUcmFja01nci5kb3VibGVfcmV2ZW51ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5pyq5Yqg6YCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlfdGltZXM6IHRoaXMuZGF0YS5saXN0Lmxlbmd0aCAtIHRoaXMubm8gLSAxXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5pS255uK57+75YCN5by556qX77yI5pyq5Yqg6YCf54q25oCB77yJXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmlLbnm4rnv7vlgI3lvLnnqpfvvIjliqDpgJ/kuK3vvIlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FYXJuaW5nc19MaW5zdGVyLCB0aGlzLnRpbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuREpTKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaUtuebiue/u+WAjeW8ueeql++8iOasoeaVsOeUqOWujO+8iVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIuasoeaVsOW3sueUqOWujFwiO1xyXG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuZG91YmxlX3JldmVudWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuacquasoeaVsOW3sueUqOWujOWKoOmAn1wiLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGVBcnJbdHlwZV0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63pobXpnaJcclxuICAgICAqL1xyXG4gICAgY2xvc2VCdG4oKSB7XHJcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHRleHQgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wb3B1cFN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIuaUtuebiue/u+WAjeW8ueeql++8iOacquWKoOmAn+eKtuaAge+8iVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCLmlLbnm4rnv7vlgI3lvLnnqpfvvIjliqDpgJ/kuK3vvIlcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCLmlLbnm4rnv7vlgI3lvLnnqpfvvIjmrKHmlbDnlKjlrozvvIlcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IHRleHQsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLlhbPpl61cIixcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5ZCvXHJcbiAgICAgKi9cclxuICAgIG9wZW5CdG4oKSB7XHJcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSlyZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5wb3B1cFN0YXRlID09IDIpIHtcclxuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOmAn+asoeaVsOW3sueUqOWujFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLkVhcm5pbmcsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5FYXJuaW5nKTtcclxuICAgICAgICAgICAgdXRpbC5wb3N0KHtcclxuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuYWN0aXZhdGVFYXJuLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDpgJ/miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ubyArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWwuZG91YmxlRWFybi51c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lOiBudW1iZXIgPSBOdW1iZXIodGhpcy5kYXRhLmxpc3RbdGhpcy5ub10uaW5jb21lTm9kZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWwuZG91YmxlRWFybi50aW1lID0gdGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaW5jb21lTm9kZUlkID0gdGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEubGVmdFRpbWUgPSB0aW1lICogMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucG9wdXBTdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLm5vd0xpdE5vZGUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RhdGUodGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5kb3VibGVfcmV2ZW51ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuWKoOmAn+S4rVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlbGVyYXRpb25fdGltZTogdGltZSArIFwic1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaUtuebiue/u+WAjeW8ueeql++8iOacquWKoOmAn+eKtuaAge+8iVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5YWN6LS56aKG5Y+WXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6YCf5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICBBZENvbnRyb2xsZXIubG9hZEluZm9BZChBZFBvc2l0aW9uLkVhcm5pbmdWaWV3LCA2MzYsIHRoaXMuZmVlZF9ub2RlKTsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5FYXJuaW5nVmlldyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19