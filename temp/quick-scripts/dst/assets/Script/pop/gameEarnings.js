
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
var NameTs_1 = require("../common/NameTs");
var UrlConst_1 = require("../server/UrlConst");
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
        // AdController.loadAd(AdPosition.Earning, () => {
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
        // }, () => {
        //     AssistCtr.showToastTip("加载视频失败，请稍后！");
        // });
    };
    gameEarnings.prototype.onEnable = function () {
    };
    gameEarnings.prototype.onDisable = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVFYXJuaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQseUNBQW9DO0FBRXBDLDJDQUFzQztBQUN0QywrQ0FBOEM7QUFFOUMsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1QyxxQ0FBZ0M7QUFDaEMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFNO0lBQWhEO1FBQUEscUVBMFBDO1FBdlBXLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFjLEVBQUUsQ0FBQztRQUd6QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBTTFCLFVBQUksR0FBVyxDQUFDLENBQUM7UUFFekIsT0FBTztRQUNDLFFBQUUsR0FBVyxDQUFDLENBQUMsQ0FBQzs7UUFvT3hCLGlCQUFpQjtJQUNyQixDQUFDO0lBaE9HLDJCQUFJLEdBQUo7UUFBQSxpQkE0QkM7UUExQkcsY0FBSSxDQUFDLElBQUksQ0FBQztZQUNOLEdBQUcsRUFBRSxtQkFBUSxDQUFDLFVBQVU7WUFDeEIsT0FBTyxFQUFFLFVBQUMsR0FBRztnQkFDVCxJQUFHLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBQztvQkFDYixPQUFPO2lCQUNWO2dCQUNELEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUdILGdCQUFnQjtRQUNoQixtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLDJFQUEyRTtRQUMzRSw4RUFBOEU7UUFDOUUsOEVBQThFO1FBQzlFLDhFQUE4RTtRQUM5RSw2RUFBNkU7UUFDN0UsU0FBUztRQUNULHNCQUFzQjtRQUN0QixvQkFBb0I7UUFD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SUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQzttREFDZDtJQVpqQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBMFBoQztJQUFELG1CQUFDO0NBMVBELEFBMFBDLENBMVB5QyxnQkFBTSxHQTBQL0M7a0JBMVBvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcclxuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xyXG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XHJcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xyXG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XHJcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XHJcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcclxuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVFYXJuaW5ncyBleHRlbmRzIGJhc2VUcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwibGF5b3V055uS5a2QXCIgfSlcclxuICAgIHByaXZhdGUgbGF5b3V0Tm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIGRpc3BsYXlOYW1lOiBcIuaXtumXtFwiIH0pXHJcbiAgICBwcml2YXRlIHRpbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5Ob2RlXSwgZGlzcGxheU5hbWU6IFwi54q25oCB55uS5a2QXCIgfSlcclxuICAgIHByaXZhdGUgc3RhdGVBcnI6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuS/oeaBr+a1gVwiIH0pXHJcbiAgICBwcml2YXRlIGZlZWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8v5b2T5YmN56ys5Yeg5LiqXHJcbiAgICBwcml2YXRlIG5vOiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICAvL+exu+Wei1xyXG4gICAgcG9wdXBTdGF0ZTogbnVtYmVyO1xyXG5cclxuICAgIGluaXQoKSB7XHJcblxyXG4gICAgICAgIHV0aWwucG9zdCh7XHJcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZG91YmxlRWFybixcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdGF0ZShyZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvLyBsZXQganNvbiA9ICB7XHJcbiAgICAgICAgLy8gICAgIGxlZnRUaW1lOiAwLFxyXG4gICAgICAgIC8vICAgICBsaXN0OltcclxuICAgICAgICAvLyAgICAgICAgIHtpbmNvbWVOb2RlTmFtZTogXCIzMHNcIiwgaW5jb21lTm9kZUlkOiAzMCwgaW5jb21lTm9kZVRpbWU6IFwiMzBcIn0sXHJcbiAgICAgICAgLy8gICAgICAgICB7aW5jb21lTm9kZU5hbWU6IFwiMTAwc1wiLCBpbmNvbWVOb2RlSWQ6IDEwMCwgaW5jb21lTm9kZVRpbWU6IFwiMTAwXCJ9LFxyXG4gICAgICAgIC8vICAgICAgICAge2luY29tZU5vZGVOYW1lOiBcIjE1MHNcIiwgaW5jb21lTm9kZUlkOiAxNTAsIGluY29tZU5vZGVUaW1lOiBcIjE1MFwifSxcclxuICAgICAgICAvLyAgICAgICAgIHtpbmNvbWVOb2RlTmFtZTogXCIyMDBzXCIsIGluY29tZU5vZGVJZDogMjAwLCBpbmNvbWVOb2RlVGltZTogXCIyMDBcIn0sXHJcbiAgICAgICAgLy8gICAgICAgICB7aW5jb21lTm9kZU5hbWU6IFwiMzAwc1wiLCBpbmNvbWVOb2RlSWQ6IDMwMCwgaW5jb21lTm9kZVRpbWU6IFwiMzAwXCJ9XHJcbiAgICAgICAgLy8gICAgIF0sXHJcbiAgICAgICAgLy8gICAgIG5vd0xpdE5vZGU6IC0xLFxyXG4gICAgICAgIC8vICAgICBwb3B1cFN0YXRlOiAxXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMuZ2V0U3RhdGUoanNvbik7XHJcblxyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nirbmgIFcclxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBnZXRTdGF0ZShkYXRhKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGlzdCAmJiB0aGlzLmxheW91dE5vZGUgJiYgdGhpcy5sYXlvdXROb2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Tm9kZS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4geyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhSXRlbSA9IGRhdGEubGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAvL+afpeaJvuesrOWHoOS4qlxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFJdGVtICYmIGRhdGEubm93TGl0Tm9kZSA9PSBkYXRhSXRlbS5pbmNvbWVOb2RlSWQgJiYgZGF0YS5ub3dMaXROb2RlICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm8gPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFJdGVtLmluY29tZU5vZGVJZCA8PSBkYXRhLm5vd0xpdE5vZGUsICdkYXRhSXRlbS5pbmNvbWVOb2RlSWQ8PWRhdGEubm93TGl0Tm9kZScpXHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pS55Y+Y6aKc6ImyXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlblswXS5hY3RpdmUgPSBkYXRhSXRlbS5pbmNvbWVOb2RlSWQgPD0gZGF0YS5ub3dMaXROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pS55Y+Y6aKc6ImyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFJdGVtLmluY29tZU5vZGVJZCA8PSBkYXRhLm5vd0xpdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFJdGVtLmluY29tZU5vZGVJZCA9PSBkYXRhLm5vd0xpdE5vZGUgJiYgZGF0YS5wb3B1cFN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW5bMV0ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW5bMV0ub3BhY2l0eSA9IDEwMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+S/ruaUueiKgueCuWxhYmVs5paH5a2XXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFJdGVtLmluY29tZU5vZGVOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgZGF0YUl0ZW0uaW5jb21lTm9kZUlkIDw9IGRhdGEubm93TGl0Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+i9rOWMluS4unNcclxuICAgICAgICB0aGlzLnRpbWUgPSBNYXRoLmZsb29yKGRhdGEubGVmdFRpbWUgLyAxMDAwKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnBvcHVwU3RhdGUsICdkYXRhLnBvcHVwU3RhdGUnLCB0aGlzLm5vKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZGF0YS5wb3B1cFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlvIDlkK/lgJLorqHml7YgKi9cclxuICAgIG9wZW5ESlMoKSB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSAtPSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vICs9IDE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ubyA+PSB0aGlzLmRhdGEubGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucG9wdXBTdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmluY29tZU5vZGVJZCA9IHRoaXMuZGF0YS5saXN0W3RoaXMuZGF0YS5saXN0Lmxlbmd0aCAtIDFdLmluY29tZU5vZGVJZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnBvcHVwU3RhdGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5pbmNvbWVOb2RlSWQgPSB0aGlzLmRhdGEubGlzdFt0aGlzLm5vXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RhdGUodGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9IHRvb2wuY2hhbmdlVGltZSh0aGlzLnRpbWUpO1xyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeKtuaAgSDmnKrliqDpgJ8tMO+8jOWKoOmAn+S4rS0x77yM5Yqg6YCf5qyh5pWw5bey55So5a6MLTJcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBzZXRTdGF0ZSh0eXBlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXRlQXJyWzBdLmFjdGl2ZSA9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVBcnJbMV0uYWN0aXZlID1cclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUFyclsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcHVwU3RhdGUgPSB0eXBlO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBUcmFja01nci5kb3VibGVfcmV2ZW51ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5pyq5Yqg6YCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlfdGltZXM6IHRoaXMuZGF0YS5saXN0Lmxlbmd0aCAtIHRoaXMubm8gLSAxXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBUcmFja01nci5BcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IFwi5pS255uK57+75YCN5by556qX77yI5pyq5Yqg6YCf54q25oCB77yJXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nX25hbWVfaGNkZzogXCLmlLbnm4rnv7vlgI3lvLnnqpfvvIjliqDpgJ/kuK3vvIlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FYXJuaW5nc19MaW5zdGVyLCB0aGlzLnRpbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuREpTKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaUtuebiue/u+WAjeW8ueeql++8iOasoeaVsOeUqOWujO+8iVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIuasoeaVsOW3sueUqOWujFwiO1xyXG4gICAgICAgICAgICAgICAgVHJhY2tNZ3IuZG91YmxlX3JldmVudWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuacquasoeaVsOW3sueUqOWujOWKoOmAn1wiLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGVBcnJbdHlwZV0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63pobXpnaJcclxuICAgICAqL1xyXG4gICAgY2xvc2VCdG4oKSB7XHJcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHRleHQgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wb3B1cFN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIuaUtuebiue/u+WAjeW8ueeql++8iOacquWKoOmAn+eKtuaAge+8iVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCLmlLbnm4rnv7vlgI3lvLnnqpfvvIjliqDpgJ/kuK3vvIlcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCLmlLbnm4rnv7vlgI3lvLnnqpfvvIjmrKHmlbDnlKjlrozvvIlcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVHJhY2tNZ3IuQXBwRGlhbG9nQ2xpY2tfaGNkZyh7XHJcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6IHRleHQsXHJcbiAgICAgICAgICAgIGNrX21vZHVsZTogXCLlhbPpl61cIixcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5ZCvXHJcbiAgICAgKi9cclxuICAgIG9wZW5CdG4oKSB7XHJcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSlyZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5wb3B1cFN0YXRlID09IDIpIHtcclxuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOmAn+asoeaVsOW3sueUqOWujFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLkVhcm5pbmcsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5FYXJuaW5nKTtcclxuICAgICAgICAgICAgdXRpbC5wb3N0KHtcclxuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuYWN0aXZhdGVFYXJuLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLliqDpgJ/miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ubyArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWwuZG91YmxlRWFybi51c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lOiBudW1iZXIgPSBOdW1iZXIodGhpcy5kYXRhLmxpc3RbdGhpcy5ub10uaW5jb21lTm9kZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHV0aWwuZG91YmxlRWFybi50aW1lID0gdGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaW5jb21lTm9kZUlkID0gdGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEubGVmdFRpbWUgPSB0aW1lICogMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucG9wdXBTdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLm5vd0xpdE5vZGUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RhdGUodGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5kb3VibGVfcmV2ZW51ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuWKoOmAn+S4rVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlbGVyYXRpb25fdGltZTogdGltZSArIFwic1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBcIuaUtuebiue/u+WAjeW8ueeql++8iOacquWKoOmAn+eKtuaAge+8iVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBja19tb2R1bGU6IFwi5YWN6LS56aKG5Y+WXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZV9hZF9oY2RnOlwi5r+A5Yqx6KeG6aKRXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Yqg6YCf5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vIH0sICgpID0+IHtcclxuICAgICAgICAvLyAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcChcIuWKoOi9veinhumikeWksei0pe+8jOivt+eojeWQju+8gVwiKTtcclxuICAgICAgICAvLyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHsvLzYzNjpmZWVkTm9kZeS/oeaBr+a1geWuueWZqOiKgueCueeahOWuveW6plxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19