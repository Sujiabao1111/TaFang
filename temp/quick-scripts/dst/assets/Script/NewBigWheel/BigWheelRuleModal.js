
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxOZXdCaWdXaGVlbFxcQmlnV2hlZWxSdWxlTW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUU1Qzs7Ozs7OztHQU9HO0FBQ0csSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBK0MscUNBQVk7SUFBM0Q7UUFBQSxxRUErQkM7UUE3QkcsbUJBQWEsR0FBZ0IsSUFBSSxDQUFBOztJQTZCckMsQ0FBQztJQTVCRyxtQ0FBTyxHQUFQLFVBQVEsS0FBSztRQUNULElBQUksS0FBSyxFQUFFO1lBQ1AseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUE7U0FDekM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLGtCQUFRLENBQUMsbUJBQW1CLENBQUM7WUFDekIsZ0JBQWdCLEVBQUUsU0FBUztZQUMzQixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsZ0NBQUksR0FBSixVQUFLLFNBQVMsRUFBRSxPQUFPO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLDR0Q0FBa1AsU0FBUyxjQUFJLE9BQU8sWUFBUyxDQUFDO1FBRTVTLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNkLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDeEIsS0FBSyxFQUFFLENBQUM7UUFDVCxrQkFBUSxDQUFDLHdCQUF3QixDQUFDO1lBQzlCLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLGdCQUFnQixFQUFFLFNBQVM7U0FDOUIsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQTVCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzREQUNXO0lBRmhCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBK0JyQztJQUFELHdCQUFDO0NBL0JELEFBK0JDLENBL0I4QyxFQUFFLENBQUMsU0FBUyxHQStCMUQ7a0JBL0JvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xyXG5cclxuLypcclxuICogQERlc2NyaXB0dGlvbjogXHJcbiAqIEB2ZXJzaW9uOiBcclxuICogQEF1dGhvcjogbWllc1xyXG4gKiBARGF0ZTogMjAyMS0wMi0yNCAxNDo0NTo0N1xyXG4gKiBATGFzdEVkaXRvcnM6IG1pZXNcclxuICogQExhc3RFZGl0VGltZTogMjAyMS0wMy0wMiAxNDozNDowNlxyXG4gKi9cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpZ1doZWVsUnVsZU1vZGFsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGxhYmxlX2NvbnRlbnQ6IGNjLlJpY2hUZXh0ID0gbnVsbFxyXG4gICAgb25DbG9zZShldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIFRyYWNrTWdyLkFwcERpYWxvZ0NsaWNrX2hjZGcoe1xyXG4gICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiAn5aSn6L2s55uY6KeE5YiZ5by556qXJyxcclxuICAgICAgICAgICAgY2tfbW9kdWxlOiAn5YWz6ZetJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBvcGVuKGJlZ2luRGF0ZSwgZW5kRGF0ZSkge1xyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6KeE5YiZ5byA5aeL5pe26Ze0XCIsIGJlZ2luRGF0ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLop4TliJnnu5PmnZ/ml7bpl7RcIiwgZW5kRGF0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMubGFibGVfY29udGVudC5zdHJpbmcgPSBgMeOAgeacrOa0u+WKqOS4uuamgueOh+aKveWllu+8jOWcqOa0u+WKqOacn+WGhembhum9kOaJi+acuueijueJh+aIluaKveS4reaJi+acuuWNs+WPr+WFjei0ueWFkeaNouWNjuS4ulA0MOaJi+acuu+8jOeijueJh+aUtumbhua0u+WKqOWRqOacn+S4ujflpKnvvIw35aSp5ZCO5omL5py656KO54mH5riF6Zu277ybXFxuXFxuMuOAgeavj+S4queUqOaIt+avj+WkqeaciTHmrKHlhY3otLnmir3lpZbmnLrkvJrvvIzmir3lpZbmnLrkvJrku4XlvZPlpKnmnInmlYjvvIzmnKrkvb/nlKjliJnnrKzkuozlpKnmuIXpm7bvvIzmrKHml6Xph43nva7mir3lpZbmrKHmlbDvvJtcXG5cXG4z44CB5YWN6LS55oq95aWW5qyh5pWw5L2/55So5a6M5ZCO5Y+v6YCa6L+H6KeC55yL6KeG6aKR5ZKM5a6M5oiQ5oyH5a6a5Lu75Yqh6I635Y+W6aKd5aSW5oq95aWW5qyh5pWw77yM6KeC55yL6KeG6aKR6I635b6X5oq95aWW5qyh5pWw5q+P5pel5LiK6ZmQMTDmrKHvvJtcXG5cXG4044CB5YWR5o2i5ZWG5ZOB5pe277yM6ZyA6KaB5aGr5YaZ5pS26LSn5L+h5oGv77yI5YyF5ous5aeT5ZCN44CB6IGU57O75pa55byP44CB5pS26LSn5Zyw5Z2A562J77yJ77yM5ZWG5ZOB5bCG5ZyoM+WkqeWGheWvhOWHuu+8m1xcblxcbjxzaXplPTI4PuacrOacn+a0u+WKqOaXtumXtDoke2JlZ2luRGF0ZX3oh7Mke2VuZERhdGV9PC9zaXplPmA7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcclxuICAgICAgICAgICAgLnRvKC4yLCB7IG9wYWNpdHk6IDI1NSB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcclxuICAgICAgICAgICAgICAgIGRpYWxvZ19wYWdlOiAn5bm46L+Q5aSn6L2s55uY6aG1JyxcclxuICAgICAgICAgICAgICAgIGRpYWxvZ19uYW1lX2hjZGc6ICflpKfovaznm5jop4TliJnlvLnnqpcnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19