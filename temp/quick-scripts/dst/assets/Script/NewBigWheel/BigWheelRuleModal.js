
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/NewBigWheel/BigWheelRuleModal.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcQmlnV2hlZWxSdWxlTW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUU1Qzs7Ozs7OztHQU9HO0FBQ0csSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBK0MscUNBQVk7SUFBM0Q7UUFBQSxxRUErQkM7UUE3QkcsbUJBQWEsR0FBZ0IsSUFBSSxDQUFBOztJQTZCckMsQ0FBQztJQTVCRyxtQ0FBTyxHQUFQLFVBQVEsS0FBSztRQUNULElBQUksS0FBSyxFQUFFO1lBQ1AseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUE7U0FDekM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7WUFDekIsZ0JBQWdCLEVBQUUsU0FBUztZQUMzQixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsZ0NBQUksR0FBSixVQUFLLFNBQVMsRUFBRSxPQUFPO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLDR0Q0FBa1AsU0FBUyxjQUFJLE9BQU8sWUFBUyxDQUFDO1FBRTVTLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNkLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDeEIsS0FBSyxFQUFFLENBQUM7UUFDVCxrQkFBUSxDQUFDLHdCQUF3QixDQUFDO1lBQzlCLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLGdCQUFnQixFQUFFLFNBQVM7U0FDOUIsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQTVCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzREQUNXO0lBRmhCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBK0JyQztJQUFELHdCQUFDO0NBL0JELEFBK0JDLENBL0I4QyxFQUFFLENBQUMsU0FBUyxHQStCMUQ7a0JBL0JvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcblxuLypcbiAqIEBEZXNjcmlwdHRpb246IFxuICogQHZlcnNpb246IFxuICogQEF1dGhvcjogbWllc1xuICogQERhdGU6IDIwMjEtMDItMjQgMTQ6NDU6NDdcbiAqIEBMYXN0RWRpdG9yczogbWllc1xuICogQExhc3RFZGl0VGltZTogMjAyMS0wMy0wMiAxNDozNDowNlxuICovXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmlnV2hlZWxSdWxlTW9kYWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBsYWJsZV9jb250ZW50OiBjYy5SaWNoVGV4dCA9IG51bGxcbiAgICBvbkNsb3NlKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICBUcmFja01nci5BcHBEaWFsb2dDbGlja19oY2RnKHtcbiAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICflpKfovaznm5jop4TliJnlvLnnqpcnLFxuICAgICAgICAgICAgY2tfbW9kdWxlOiAn5YWz6ZetJ1xuICAgICAgICB9KVxuICAgIH1cbiAgICBvcGVuKGJlZ2luRGF0ZSwgZW5kRGF0ZSkge1xuICAgICAgICB0aGlzLm5vZGUucGFyZW50ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGU7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCLop4TliJnlvIDlp4vml7bpl7RcIiwgYmVnaW5EYXRlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCLop4TliJnnu5PmnZ/ml7bpl7RcIiwgZW5kRGF0ZSk7XG5cbiAgICAgICAgdGhpcy5sYWJsZV9jb250ZW50LnN0cmluZyA9IGAx44CB5pys5rS75Yqo5Li65qaC546H5oq95aWW77yM5Zyo5rS75Yqo5pyf5YaF6ZuG6b2Q5omL5py656KO54mH5oiW5oq95Lit5omL5py65Y2z5Y+v5YWN6LS55YWR5o2i5Y2O5Li6UDQw5omL5py677yM56KO54mH5pS26ZuG5rS75Yqo5ZGo5pyf5Li6N+Wkqe+8jDflpKnlkI7miYvmnLrnoo7niYfmuIXpm7bvvJtcXG5cXG4y44CB5q+P5Liq55So5oi35q+P5aSp5pyJMeasoeWFjei0ueaKveWlluacuuS8mu+8jOaKveWlluacuuS8muS7heW9k+WkqeacieaViO+8jOacquS9v+eUqOWImeesrOS6jOWkqea4hembtu+8jOasoeaXpemHjee9ruaKveWlluasoeaVsO+8m1xcblxcbjPjgIHlhY3otLnmir3lpZbmrKHmlbDkvb/nlKjlrozlkI7lj6/pgJrov4fop4LnnIvop4bpopHlkozlrozmiJDmjIflrprku7vliqHojrflj5bpop3lpJbmir3lpZbmrKHmlbDvvIzop4LnnIvop4bpopHojrflvpfmir3lpZbmrKHmlbDmr4/ml6XkuIrpmZAxMOasoe+8m1xcblxcbjTjgIHlhZHmjaLllYblk4Hml7bvvIzpnIDopoHloavlhpnmlLbotKfkv6Hmga/vvIjljIXmi6zlp5PlkI3jgIHogZTns7vmlrnlvI/jgIHmlLbotKflnLDlnYDnrYnvvInvvIzllYblk4HlsIblnKgz5aSp5YaF5a+E5Ye677ybXFxuXFxuPHNpemU9Mjg+5pys5pyf5rS75Yqo5pe26Ze0OiR7YmVnaW5EYXRlfeiHsyR7ZW5kRGF0ZX08L3NpemU+YDtcblxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgICAgICAudG8oLjIsIHsgb3BhY2l0eTogMjU1IH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcEJ1eVByb2R1Y3REaWFsb2dfaGNkZyh7XG4gICAgICAgICAgICAgICAgZGlhbG9nX3BhZ2U6ICflubjov5DlpKfovaznm5jpobUnLFxuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICflpKfovaznm5jop4TliJnlvLnnqpcnXG4gICAgICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==