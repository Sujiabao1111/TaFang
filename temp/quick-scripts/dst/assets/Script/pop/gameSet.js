
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameSet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '26c8aN9C9BEZYNdGYXhzmUO', 'gameSet');
// Script/pop/gameSet.ts

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
var baseTs_1 = require("../base/baseTs");
var LanguageData_1 = require("../Language/LanguageData");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameSet = /** @class */ (function (_super) {
    __extends(gameSet, _super);
    function gameSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_sfx = null;
        _this.languageLayout = null;
        _this.lable_version = null;
        return _this;
    }
    gameSet.prototype.onLoad = function () {
        this.setLanguageState();
        this.setSfxBtnState();
    };
    /**
     * 点击音效开关
     * @param event 点击的反馈
     * @param res 传参
     */
    gameSet.prototype.clickSound = function (toggle) {
        console.log("set_sfx_btn", toggle.isChecked);
        Tools_1.Tools.setStorage("isPlayAudio", toggle.isChecked ? 1 : 0);
        soundController_1.default.singleton.isPlayMusic = toggle.isChecked;
        if (!toggle.isChecked) {
            soundController_1.default.singleton.stopAllAudio();
        }
        else {
            soundController_1.default.singleton.playBGM();
        }
        soundController_1.default.singleton.clickAudio();
        this.setSfxBtnState();
    };
    gameSet.prototype.setSfxBtnState = function () {
        var isPlayAudio = Tools_1.Tools.getStorage("isPlayAudio");
        console.log("set_sfx_isPlayAudio:", isPlayAudio);
        var isChecked = isPlayAudio || isPlayAudio == null ? true : false;
        console.log("set_sfx_toggle.isChecked:", isChecked);
        this.btn_sfx.getComponent(cc.Toggle).isChecked = isChecked;
    };
    /**
       * 设置语言
       *
       * @param e 事件对象
       * @param lang 语言类型，字符串类型
       */
    gameSet.prototype.set_Language = function (e, lang) {
        soundController_1.default.singleton.clickAudio();
        Tools_1.Tools.setStorage("LanguageType", Number(lang));
        this.setLanguageState();
    };
    gameSet.prototype.setLanguageState = function () {
        var languageType = Tools_1.Tools.getStorage("LanguageType");
        var index = languageType == undefined || languageType == null ? 1 : languageType;
        for (var i = 0; i < this.languageLayout.children.length; i++) {
            this.languageLayout.children[i].getComponent(cc.Toggle).isChecked = index == i;
            console.log("isChecked", this.languageLayout.children[i].getComponent(cc.Toggle).isChecked);
        }
        LanguageData_1.setLanguage(Number(index));
    };
    /**关闭页面 */
    gameSet.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    __decorate([
        property({ type: cc.Node, tooltip: "音效" })
    ], gameSet.prototype, "btn_sfx", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "语种" })
    ], gameSet.prototype, "languageLayout", void 0);
    __decorate([
        property(cc.Label)
    ], gameSet.prototype, "lable_version", void 0);
    gameSet = __decorate([
        ccclass
    ], gameSet);
    return gameSet;
}(baseTs_1.default));
exports.default = gameSet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVTZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLHlEQUF1RDtBQUN2RCxzREFBaUQ7QUFDakQsdUNBQXNDO0FBRWhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFNO0lBQTNDO1FBQUEscUVBNkVDO1FBeEVXLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFHL0IsbUJBQWEsR0FBYSxJQUFJLENBQUM7O0lBa0UzQyxDQUFDO0lBL0RHLHdCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw0QkFBVSxHQUFWLFVBQVcsTUFBaUI7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLGFBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUQseUJBQWUsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDbkIseUJBQWUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDNUM7YUFBTTtZQUNILHlCQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxnQ0FBYyxHQUF0QjtRQUNJLElBQUksV0FBVyxHQUFHLGFBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLFNBQVMsR0FBRyxXQUFXLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvRCxDQUFDO0lBR0Q7Ozs7O1NBS0s7SUFDTCw4QkFBWSxHQUFaLFVBQWEsQ0FBQyxFQUFFLElBQVk7UUFDeEIseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsYUFBSyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLGtDQUFnQixHQUF2QjtRQUNJLElBQUksWUFBWSxHQUFHLGFBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEQsSUFBSSxLQUFLLEdBQUcsWUFBWSxJQUFJLFNBQVMsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNqRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDL0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvRjtRQUVELDBCQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUtELFVBQVU7SUFDViwwQkFBUSxHQUFSO1FBQ0kseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUF2RUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7NENBQ1g7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7bURBQ0o7SUFHdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDb0I7SUFYdEIsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTZFM0I7SUFBRCxjQUFDO0NBN0VELEFBNkVDLENBN0VvQyxnQkFBTSxHQTZFMUM7a0JBN0VvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IHNldExhbmd1YWdlIH0gZnJvbSBcIi4uL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi91dGlsL1Rvb2xzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lU2V0IGV4dGVuZHMgYmFzZVRzIHtcblxuXG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCB0b29sdGlwOiBcIumfs+aViFwiIH0pXG4gICAgcHJpdmF0ZSBidG5fc2Z4OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwi6K+t56eNXCIgfSlcbiAgICBwcml2YXRlIGxhbmd1YWdlTGF5b3V0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYmxlX3ZlcnNpb246IGNjLkxhYmVsID0gbnVsbDtcblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNldExhbmd1YWdlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRTZnhCdG5TdGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeCueWHu+mfs+aViOW8gOWFs1xuICAgICAqIEBwYXJhbSBldmVudCDngrnlh7vnmoTlj43ppohcbiAgICAgKiBAcGFyYW0gcmVzIOS8oOWPglxuICAgICAqL1xuICAgIGNsaWNrU291bmQodG9nZ2xlOiBjYy5Ub2dnbGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRfc2Z4X2J0blwiLCB0b2dnbGUuaXNDaGVja2VkKTtcbiAgICAgICAgVG9vbHMuc2V0U3RvcmFnZShcImlzUGxheUF1ZGlvXCIsIHRvZ2dsZS5pc0NoZWNrZWQgPyAxIDogMCk7XG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uaXNQbGF5TXVzaWMgPSB0b2dnbGUuaXNDaGVja2VkO1xuICAgICAgICBpZiAoIXRvZ2dsZS5pc0NoZWNrZWQpIHtcbiAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uc3RvcEFsbEF1ZGlvKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLnBsYXlCR00oKTtcbiAgICAgICAgfVxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5zZXRTZnhCdG5TdGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U2Z4QnRuU3RhdGUoKSB7XG4gICAgICAgIGxldCBpc1BsYXlBdWRpbyA9IFRvb2xzLmdldFN0b3JhZ2UoXCJpc1BsYXlBdWRpb1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRfc2Z4X2lzUGxheUF1ZGlvOlwiLCBpc1BsYXlBdWRpbyk7XG4gICAgICAgIGxldCBpc0NoZWNrZWQgPSBpc1BsYXlBdWRpbyB8fCBpc1BsYXlBdWRpbyA9PSBudWxsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNldF9zZnhfdG9nZ2xlLmlzQ2hlY2tlZDpcIiwgaXNDaGVja2VkKTtcbiAgICAgICAgdGhpcy5idG5fc2Z4LmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA9IGlzQ2hlY2tlZDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAgICog6K6+572u6K+t6KiAXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIGUg5LqL5Lu25a+56LGhXG4gICAgICAgKiBAcGFyYW0gbGFuZyDor63oqIDnsbvlnovvvIzlrZfnrKbkuLLnsbvlnotcbiAgICAgICAqL1xuICAgIHNldF9MYW5ndWFnZShlLCBsYW5nOiBzdHJpbmcpIHtcbiAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgIFRvb2xzLnNldFN0b3JhZ2UoXCJMYW5ndWFnZVR5cGVcIiwgTnVtYmVyKGxhbmcpKTtcbiAgICAgICAgdGhpcy5zZXRMYW5ndWFnZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldExhbmd1YWdlU3RhdGUoKSB7XG4gICAgICAgIGxldCBsYW5ndWFnZVR5cGUgPSBUb29scy5nZXRTdG9yYWdlKFwiTGFuZ3VhZ2VUeXBlXCIpO1xuICAgICAgICBsZXQgaW5kZXggPSBsYW5ndWFnZVR5cGUgPT0gdW5kZWZpbmVkIHx8IGxhbmd1YWdlVHlwZSA9PSBudWxsID8gMSA6IGxhbmd1YWdlVHlwZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxhbmd1YWdlTGF5b3V0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlTGF5b3V0LmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA9IGluZGV4ID09IGk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzQ2hlY2tlZFwiLCB0aGlzLmxhbmd1YWdlTGF5b3V0LmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRMYW5ndWFnZShOdW1iZXIoaW5kZXgpKVxuICAgIH1cblxuXG5cblxuICAgIC8qKuWFs+mXremhtemdoiAqL1xuICAgIGNsb3NlQnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICB9XG59XG4iXX0=