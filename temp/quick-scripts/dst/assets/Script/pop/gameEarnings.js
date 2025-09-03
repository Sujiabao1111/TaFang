
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVFYXJuaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLG1EQUFrRDtBQUNsRCwyQ0FBc0M7QUFDdEMsK0NBQThDO0FBQzlDLHNFQUFpRTtBQUNqRSxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUErUEM7UUE1UFcsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixjQUFRLEdBQWMsRUFBRSxDQUFDO1FBR3pCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFNMUIsVUFBSSxHQUFXLENBQUMsQ0FBQztRQUV6QixPQUFPO1FBQ0MsUUFBRSxHQUFXLENBQUMsQ0FBQyxDQUFDOztRQXlPeEIsaUJBQWlCO0lBQ3JCLENBQUM7SUFyT0csMkJBQUksR0FBSjtRQUFBLGlCQStCQztRQTdCRyxjQUFJLENBQUMsSUFBSSxDQUFDO1lBQ04sR0FBRyxFQUFFLG1CQUFRLENBQUMsVUFBVTtZQUN4QixPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUNULElBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFDO29CQUNiLE9BQU87aUJBQ1Y7Z0JBQ0QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBR0gsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixhQUFhO1FBQ2IsMkVBQTJFO1FBQzNFLDhFQUE4RTtRQUM5RSw4RUFBOEU7UUFDOUUsOEVBQThFO1FBQzlFLDZFQUE2RTtRQUM3RSxTQUFTO1FB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LENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUM7b0RBQ2xCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO21EQUNiO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQztrREFDbEI7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7bURBQ2Q7SUFaakIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQStQaEM7SUFBRCxtQkFBQztDQS9QRCxBQStQQyxDQS9QeUMsZ0JBQU0sR0ErUC9DO2tCQS9Qb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVFYXJuaW5ncyBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCJsYXlvdXTnm5LlrZBcIiB9KVxuICAgIHByaXZhdGUgbGF5b3V0Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgZGlzcGxheU5hbWU6IFwi5pe26Ze0XCIgfSlcbiAgICBwcml2YXRlIHRpbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdLCBkaXNwbGF5TmFtZTogXCLnirbmgIHnm5LlrZBcIiB9KVxuICAgIHByaXZhdGUgc3RhdGVBcnI6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5L+h5oGv5rWBXCIgfSlcbiAgICBwcml2YXRlIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBvbkxvYWQgKCkge31cblxuICAgIHByaXZhdGUgZGF0YTogYW55O1xuXG4gICAgcHJpdmF0ZSB0aW1lOiBudW1iZXIgPSAwO1xuXG4gICAgLy/lvZPliY3nrKzlh6DkuKpcbiAgICBwcml2YXRlIG5vOiBudW1iZXIgPSAtMTtcblxuICAgIC8v57G75Z6LXG4gICAgcG9wdXBTdGF0ZTogbnVtYmVyO1xuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICB1dGlsLnBvc3Qoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5kb3VibGVFYXJuLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RhdGUocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBsZXQganNvbiA9ICB7XG4gICAgICAgIC8vICAgICBsZWZ0VGltZTogMCxcbiAgICAgICAgLy8gICAgIGxpc3Q6W1xuICAgICAgICAvLyAgICAgICAgIHtpbmNvbWVOb2RlTmFtZTogXCIzMHNcIiwgaW5jb21lTm9kZUlkOiAzMCwgaW5jb21lTm9kZVRpbWU6IFwiMzBcIn0sXG4gICAgICAgIC8vICAgICAgICAge2luY29tZU5vZGVOYW1lOiBcIjEwMHNcIiwgaW5jb21lTm9kZUlkOiAxMDAsIGluY29tZU5vZGVUaW1lOiBcIjEwMFwifSxcbiAgICAgICAgLy8gICAgICAgICB7aW5jb21lTm9kZU5hbWU6IFwiMTUwc1wiLCBpbmNvbWVOb2RlSWQ6IDE1MCwgaW5jb21lTm9kZVRpbWU6IFwiMTUwXCJ9LFxuICAgICAgICAvLyAgICAgICAgIHtpbmNvbWVOb2RlTmFtZTogXCIyMDBzXCIsIGluY29tZU5vZGVJZDogMjAwLCBpbmNvbWVOb2RlVGltZTogXCIyMDBcIn0sXG4gICAgICAgIC8vICAgICAgICAge2luY29tZU5vZGVOYW1lOiBcIjMwMHNcIiwgaW5jb21lTm9kZUlkOiAzMDAsIGluY29tZU5vZGVUaW1lOiBcIjMwMFwifVxuICAgICAgICAvLyAgICAgXSxcbiAgICAgICAgLy8gICAgIG5vd0xpdE5vZGU6IC0xLFxuICAgICAgICAvLyAgICAgcG9wdXBTdGF0ZTogMVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHRoaXMuZ2V0U3RhdGUoanNvbik7XG5cbiAgICAgICAgLyoq5Yqg6L295Y+M5YCN5pS255uK6KeG6aKRICovXG4gICAgICAgIC8vIGlmICghdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkVhcm5pbmddKSB7XG4gICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkVhcm5pbmcpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7nirbmgIFcbiAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja5cbiAgICAgKi9cbiAgICBnZXRTdGF0ZShkYXRhKSB7XG5cbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxpc3QgJiYgdGhpcy5sYXlvdXROb2RlICYmIHRoaXMubGF5b3V0Tm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXROb2RlLmNoaWxkcmVuLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBkYXRhSXRlbSA9IGRhdGEubGlzdFtpbmRleF07XG4gICAgICAgICAgICAgICAgLy/mn6Xmib7nrKzlh6DkuKpcbiAgICAgICAgICAgICAgICBpZiAoZGF0YUl0ZW0gJiYgZGF0YS5ub3dMaXROb2RlID09IGRhdGFJdGVtLmluY29tZU5vZGVJZCAmJiBkYXRhLm5vd0xpdE5vZGUgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm8gPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YUl0ZW0uaW5jb21lTm9kZUlkIDw9IGRhdGEubm93TGl0Tm9kZSwgJ2RhdGFJdGVtLmluY29tZU5vZGVJZDw9ZGF0YS5ub3dMaXROb2RlJylcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAvL+aUueWPmOminOiJslxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGRhdGFJdGVtLmluY29tZU5vZGVJZCA8PSBkYXRhLm5vd0xpdE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIC8v5pS55Y+Y6aKc6ImyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhSXRlbS5pbmNvbWVOb2RlSWQgPD0gZGF0YS5ub3dMaXROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUl0ZW0uaW5jb21lTm9kZUlkID09IGRhdGEubm93TGl0Tm9kZSAmJiBkYXRhLnBvcHVwU3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW5bMV0ub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlblsxXS5vcGFjaXR5ID0gMTAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8v5L+u5pS56IqC54K5bGFiZWzmloflrZdcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFJdGVtLmluY29tZU5vZGVOYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmIGRhdGFJdGVtLmluY29tZU5vZGVJZCA8PSBkYXRhLm5vd0xpdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW5bMl0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy/ovazljJbkuLpzXG4gICAgICAgIHRoaXMudGltZSA9IE1hdGguZmxvb3IoZGF0YS5sZWZ0VGltZSAvIDEwMDApO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnBvcHVwU3RhdGUsICdkYXRhLnBvcHVwU3RhdGUnLCB0aGlzLm5vKVxuICAgICAgICB0aGlzLnNldFN0YXRlKGRhdGEucG9wdXBTdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoq5byA5ZCv5YCS6K6h5pe2ICovXG4gICAgb3BlbkRKUygpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgLT0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWUgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ubyArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vID49IHRoaXMuZGF0YS5saXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucG9wdXBTdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5pbmNvbWVOb2RlSWQgPSB0aGlzLmRhdGEubGlzdFt0aGlzLmRhdGEubGlzdC5sZW5ndGggLSAxXS5pbmNvbWVOb2RlSWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnBvcHVwU3RhdGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaW5jb21lTm9kZUlkID0gdGhpcy5kYXRhLmxpc3RbdGhpcy5ub107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RhdGUodGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9IHRvb2wuY2hhbmdlVGltZSh0aGlzLnRpbWUpO1xuICAgICAgICB9LCAxKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOeKtuaAgSDmnKrliqDpgJ8tMO+8jOWKoOmAn+S4rS0x77yM5Yqg6YCf5qyh5pWw5bey55So5a6MLTJcbiAgICAgKiBAcGFyYW0gdHlwZSBcbiAgICAgKi9cbiAgICBzZXRTdGF0ZSh0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUFyclswXS5hY3RpdmUgPVxuICAgICAgICAgICAgdGhpcy5zdGF0ZUFyclsxXS5hY3RpdmUgPVxuICAgICAgICAgICAgdGhpcy5zdGF0ZUFyclsyXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgbGV0IHRleHQ6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIHRoaXMucG9wdXBTdGF0ZSA9IHR5cGU7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLmRvdWJsZV9yZXZlbnVlKHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5pyq5Yqg6YCfXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5X3RpbWVzOiB0aGlzLmRhdGEubGlzdC5sZW5ndGggLSB0aGlzLm5vIC0gMVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmlLbnm4rnv7vlgI3lvLnnqpfvvIjmnKrliqDpgJ/nirbmgIHvvIlcIlxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaUtuebiue/u+WAjeW8ueeql++8iOWKoOmAn+S4re+8iVwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWFybmluZ3NfTGluc3RlciwgdGhpcy50aW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5ESlMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaUtuebiue/u+WAjeW8ueeql++8iOasoeaVsOeUqOWujO+8iVwiXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRleHQgPSBcIuasoeaVsOW3sueUqOWujFwiO1xuICAgICAgICAgICAgICAgIFRyYWNrTWdyLmRvdWJsZV9yZXZlbnVlKHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5pyq5qyh5pWw5bey55So5a6M5Yqg6YCfXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQXJyW3R5cGVdLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63pobXpnaJcbiAgICAgKi9cbiAgICBjbG9zZUJ0bigpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG5cbiAgICAgICAgbGV0IHRleHQgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKHRoaXMucG9wdXBTdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRleHQgPSBcIuaUtuebiue/u+WAjeW8ueeql++8iOacquWKoOmAn+eKtuaAge+8iVwiO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGV4dCA9IFwi5pS255uK57+75YCN5by556qX77yI5Yqg6YCf5Lit77yJXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGV4dCA9IFwi5pS255uK57+75YCN5by556qX77yI5qyh5pWw55So5a6M77yJXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IHRleHQsXG4gICAgICAgICAgICBja19tb2R1bGU6IFwi5YWz6ZetXCIsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5byA5ZCvXG4gICAgICovXG4gICAgb3BlbkJ0bigpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIGlmKCF0aGlzLmRhdGEpcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5kYXRhLnBvcHVwU3RhdGUgPT0gMikge1xuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOmAn+asoeaVsOW3sueUqOWujFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEFkQ29udHJvbGxlci5sb2FkQWQoQWRQb3NpdGlvbi5FYXJuaW5nLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkVhcm5pbmcpO1xuICAgICAgICAgICAgdXRpbC5wb3N0KHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmFjdGl2YXRlRWFybixcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDpgJ/miJDlip9cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm8gKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5kb3VibGVFYXJuLnVzZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lOiBudW1iZXIgPSBOdW1iZXIodGhpcy5kYXRhLmxpc3RbdGhpcy5ub10uaW5jb21lTm9kZVRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB1dGlsLmRvdWJsZUVhcm4udGltZSA9IHRpbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5pbmNvbWVOb2RlSWQgPSB0aW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEubGVmdFRpbWUgPSB0aW1lICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnBvcHVwU3RhdGUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEubm93TGl0Tm9kZSA9IHRpbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RhdGUodGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuZG91YmxlX3JldmVudWUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5Yqg6YCf5LitXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlbGVyYXRpb25fdGltZTogdGltZSArIFwic1wiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmlLbnm4rnv7vlgI3lvLnnqpfvvIjmnKrliqDpgJ/nirbmgIHvvIlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNrX21vZHVsZTogXCLlhY3otLnpooblj5ZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOmAn+Wksei0pVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6L296KeG6aKR5aSx6LSl77yM6K+356iN5ZCO77yBXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmxvYWRJbmZvQWQoQWRQb3NpdGlvbi5FYXJuaW5nVmlldywgNjM2LCB0aGlzLmZlZWRfbm9kZSk7Ly82MzY6ZmVlZE5vZGXkv6Hmga/mtYHlrrnlmajoioLngrnnmoTlrr3luqZcbiAgICB9XG5cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgQWRDb250cm9sbGVyLmhpZGVJbmZvQWQoQWRQb3NpdGlvbi5FYXJuaW5nVmlldyk7XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19