"use strict";
cc._RF.push(module, '9bc6bveGQ5OwZ8hb+WlatXB', 'BigWheelRuleModal');
// Script/NewBigWheel/BigWheelRuleModal.ts

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
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
/*
 * @Descripttion:
 * @version:
 * @Author: mies
 * @Date: 2021-02-24 14:45:47
 * @LastEditors: mies
 * @LastEditTime: 2021-03-02 14:34:06
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BigWheelRuleModal = /** @class */ (function (_super) {
    __extends(BigWheelRuleModal, _super);
    function BigWheelRuleModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_content = null;
        return _this;
    }
    BigWheelRuleModal.prototype.onClose = function (event) {
        if (event) {
            soundController_1.default.singleton.clickAudio();
        }
        this.node.destroy();
        TrackMgr_1.default.AppDialogClick_hcdg({
            dialog_name_hcdg: '大转盘规则弹窗',
            ck_module: '关闭'
        });
    };
    BigWheelRuleModal.prototype.open = function (beginDate, endDate) {
        this.node.parent = cc.Canvas.instance.node;
        this.node.active = true;
        this.node.opacity = 0;
        console.log("规则开始时间", beginDate);
        console.log("规则结束时间", endDate);
        this.lable_content.string = "1\u3001\u672C\u6D3B\u52A8\u4E3A\u6982\u7387\u62BD\u5956\uFF0C\u5728\u6D3B\u52A8\u671F\u5185\u96C6\u9F50\u624B\u673A\u788E\u7247\u6216\u62BD\u4E2D\u624B\u673A\u5373\u53EF\u514D\u8D39\u5151\u6362\u534E\u4E3AP40\u624B\u673A\uFF0C\u788E\u7247\u6536\u96C6\u6D3B\u52A8\u5468\u671F\u4E3A7\u5929\uFF0C7\u5929\u540E\u624B\u673A\u788E\u7247\u6E05\u96F6\uFF1B\n\n2\u3001\u6BCF\u4E2A\u7528\u6237\u6BCF\u5929\u67091\u6B21\u514D\u8D39\u62BD\u5956\u673A\u4F1A\uFF0C\u62BD\u5956\u673A\u4F1A\u4EC5\u5F53\u5929\u6709\u6548\uFF0C\u672A\u4F7F\u7528\u5219\u7B2C\u4E8C\u5929\u6E05\u96F6\uFF0C\u6B21\u65E5\u91CD\u7F6E\u62BD\u5956\u6B21\u6570\uFF1B\n\n3\u3001\u514D\u8D39\u62BD\u5956\u6B21\u6570\u4F7F\u7528\u5B8C\u540E\u53EF\u901A\u8FC7\u89C2\u770B\u89C6\u9891\u548C\u5B8C\u6210\u6307\u5B9A\u4EFB\u52A1\u83B7\u53D6\u989D\u5916\u62BD\u5956\u6B21\u6570\uFF0C\u89C2\u770B\u89C6\u9891\u83B7\u5F97\u62BD\u5956\u6B21\u6570\u6BCF\u65E5\u4E0A\u965010\u6B21\uFF1B\n\n4\u3001\u5151\u6362\u5546\u54C1\u65F6\uFF0C\u9700\u8981\u586B\u5199\u6536\u8D27\u4FE1\u606F\uFF08\u5305\u62EC\u59D3\u540D\u3001\u8054\u7CFB\u65B9\u5F0F\u3001\u6536\u8D27\u5730\u5740\u7B49\uFF09\uFF0C\u5546\u54C1\u5C06\u57283\u5929\u5185\u5BC4\u51FA\uFF1B\n\n<size=28>\u672C\u671F\u6D3B\u52A8\u65F6\u95F4:" + beginDate + "\u81F3" + endDate + "</size>";
        cc.tween(this.node)
            .to(.2, { opacity: 255 })
            .start();
        TrackMgr_1.default.AppBuyProductDialog_hcdg({
            dialog_page: '幸运大转盘页',
            dialog_name_hcdg: '大转盘规则弹窗'
        });
    };
    __decorate([
        property(cc.RichText)
    ], BigWheelRuleModal.prototype, "lable_content", void 0);
    BigWheelRuleModal = __decorate([
        ccclass
    ], BigWheelRuleModal);
    return BigWheelRuleModal;
}(cc.Component));
exports.default = BigWheelRuleModal;

cc._RF.pop();