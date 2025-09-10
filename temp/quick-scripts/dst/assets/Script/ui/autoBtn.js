
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/autoBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '64859sFAm1Gg7uc/WfjK6hp', 'autoBtn');
// Script/ui/autoBtn.ts

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
var faceTs_1 = require("../common/faceTs");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var autoBtn = /** @class */ (function (_super) {
    __extends(autoBtn, _super);
    function autoBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //时间
        _this.timeLabel = null;
        //锁
        _this.lockIcon = null;
        //手
        _this.hand = null;
        _this.time = 10;
        return _this;
    }
    autoBtn.prototype.onLoad = function () {
        // cc.game.on(NameTs.Game_Start, res => {
        //     if (util.userData.customs.big == this.initData.level && this.isLock) {
        //         util.userData.autoProp = 0;
        this.setState();
        //     }
        // }, this);
    };
    /**设置状态 */
    autoBtn.prototype.setState = function () {
        // if (util.userData.customs.big >= this.initData.level) {
        this.node.color = cc.color(255, 255, 255, 255);
        this.lockIcon.active = false;
        this.isLock = false;
        // } else {
        //     this.node.color = cc.color(107, 107, 107, 255);
        //     this.lockIcon.active = true;
        //     this.isLock = true;
        // }
        // if (util.userData.autoProp == 0) {
        //     this.hand.active = true;
        //     this.time = 10;
        // }
    };
    autoBtn.prototype.start = function () {
        // if (util && util.propData) {
        //     for (let i = 0; i < util.propData.length; i++) {
        //         let item = util.propData[i];
        //         if (item.propIssueDetailList[0].propsId == propType.auto) {
        //             this.initData = item.propIssueDetailList[0];
        //             break;
        //         }
        //     }
        //     this.setState();
        // }
    };
    /**
     * 使用道具
     */
    autoBtn.prototype.useBtn = function () {
        soundController_1.default.singleton.clickAudio();
        if (this.timeLabel.node.getParent().active) {
            AssistCtr_1.AssistCtr.showToastTip("正在使用中!");
            return;
        }
        if (this.isLock) {
            AssistCtr_1.AssistCtr.showToastTip(this.initData.level + "关解锁!");
            return;
        }
        var isVideo = true;
        if (util_1.default.userData.prop[faceTs_1.propType.auto - 1].num > 0 || util_1.default.userData.autoProp == 0) {
            isVideo = false;
        }
        // let successFn = () => {
        // util.UseProp(this.initData.propsId);
        util_1.default.UseProp(faceTs_1.propType.auto);
        // this.setData();
        // console.log("使用道具", this.initData.propsId);
        this.sendMTrack(true, isVideo);
        util_1.default.gamePropNum += 1;
        this.djs();
        util_1.default.userData.autoProp = 1;
        this.closeHand();
        util_1.default.setStorage(util_1.default.localDiary.autoProp, util_1.default.userData.autoProp);
        // }
        // console.log(isVideo, 'isVideo')
        // if (isVideo) {
        //     AdController.loadAd(AdPosition.autoVideo, () => {
        //         util.post({
        //             url: UrlConst.getUseProp,
        //             data: { propId: this.initData.propsId },
        //             success: () => {
        //                 if (!this.isValid) {
        //                     return;
        //                 }
        //                 successFn();
        //             },
        //             fail: () => {
        //                 this.sendMTrack(false, false);
        //             }
        //         });
        //     }, () => {
        //     });
        // } else {
        //     successFn();
        // }
    };
    /**倒计时 */
    autoBtn.prototype.djs = function () {
        var _this = this;
        var time = util_1.default.userData.prop[faceTs_1.propType.auto - 1].time;
        if (time) {
            this.timeLabel.node.getParent().active = true;
            this.timeLabel.string = Tools_1.Tools.changeTime(time - 1);
        }
        this.schedule(function () {
            var time = util_1.default.userData.prop[faceTs_1.propType.auto - 1].time;
            if (!time) {
                _this.unscheduleAllCallbacks();
                _this.timeLabel.node.getParent().active = false;
                // cc.game.emit(NameTs.Close_Prop_Atuo); // 关闭自动合成
                return;
            }
            _this.timeLabel.string = Tools_1.Tools.changeTime(time);
        }, 1);
    };
    autoBtn.prototype.update = function (dt) {
        if (this.time > 0) {
            this.time -= dt;
            if (this.time < 0) {
                this.time = 0;
                this.closeHand();
            }
        }
    };
    /**关闭手势 */
    autoBtn.prototype.closeHand = function () {
        this.hand.active = false;
        if (util_1.default.userData.autoProp == 2) {
            util_1.default.setStorage(util_1.default.localDiary.autoProp, 2);
        }
    };
    /**是否 */
    autoBtn.prototype.sendMTrack = function (isSuccess, isVideo) {
    };
    __decorate([
        property(cc.Label)
    ], autoBtn.prototype, "timeLabel", void 0);
    __decorate([
        property(cc.Node)
    ], autoBtn.prototype, "lockIcon", void 0);
    __decorate([
        property(cc.Node)
    ], autoBtn.prototype, "hand", void 0);
    autoBtn = __decorate([
        ccclass
    ], autoBtn);
    return autoBtn;
}(cc.Component));
exports.default = autoBtn;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcYXV0b0J0bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFFaEQsMkNBQTRDO0FBSzVDLHNEQUFpRDtBQUVqRCx1Q0FBc0M7QUFDdEMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBc0tDO1FBcEtHLElBQUk7UUFFSixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRTNCLEdBQUc7UUFFSCxjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLEdBQUc7UUFFSCxVQUFJLEdBQVksSUFBSSxDQUFDO1FBU2IsVUFBSSxHQUFXLEVBQUUsQ0FBQzs7SUFpSjlCLENBQUM7SUEvSUcsd0JBQU0sR0FBTjtRQUVJLHlDQUF5QztRQUN6Qyw2RUFBNkU7UUFDN0Usc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixRQUFRO1FBQ1IsWUFBWTtJQUNoQixDQUFDO0lBR0QsVUFBVTtJQUNWLDBCQUFRLEdBQVI7UUFDSSwwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsV0FBVztRQUNYLHNEQUFzRDtRQUN0RCxtQ0FBbUM7UUFDbkMsMEJBQTBCO1FBQzFCLElBQUk7UUFFSixxQ0FBcUM7UUFDckMsK0JBQStCO1FBQy9CLHNCQUFzQjtRQUN0QixJQUFJO0lBRVIsQ0FBQztJQUVELHVCQUFL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QUFELGNBQUM7Q0F0S0QsQUFzS0MsQ0F0S29DLEVBQUUsQ0FBQyxTQUFTLEdBc0toRDtrQkF0S29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3Npc3RDdHIgfSBmcm9tIFwiLi4vQXNzaXN0L0Fzc2lzdEN0clwiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgcHJvcFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uL3V0aWwvVG9vbHNcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGF1dG9CdG4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLy/ml7bpl7RcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGltZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvL+mUgVxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxvY2tJY29uOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8v5omLXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaGFuZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIHByaXZhdGUgaW5pdERhdGE6IGFueTtcblxuICAgIC8v5piv5ZCm6ZSB552AXG4gICAgcHJpdmF0ZSBpc0xvY2s6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIHRpbWU6IG51bWJlciA9IDEwO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgICAgIC8vIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfU3RhcnQsIHJlcyA9PiB7XG4gICAgICAgIC8vICAgICBpZiAodXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZyA9PSB0aGlzLmluaXREYXRhLmxldmVsICYmIHRoaXMuaXNMb2NrKSB7XG4gICAgICAgIC8vICAgICAgICAgdXRpbC51c2VyRGF0YS5hdXRvUHJvcCA9IDA7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSwgdGhpcyk7XG4gICAgfVxuXG5cbiAgICAvKirorr7nva7nirbmgIEgKi9cbiAgICBzZXRTdGF0ZSgpIHtcbiAgICAgICAgLy8gaWYgKHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcgPj0gdGhpcy5pbml0RGF0YS5sZXZlbCkge1xuICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xuICAgICAgICB0aGlzLmxvY2tJY29uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTG9jayA9IGZhbHNlO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmNvbG9yID0gY2MuY29sb3IoMTA3LCAxMDcsIDEwNywgMjU1KTtcbiAgICAgICAgLy8gICAgIHRoaXMubG9ja0ljb24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIHRoaXMuaXNMb2NrID0gdHJ1ZTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGlmICh1dGlsLnVzZXJEYXRhLmF1dG9Qcm9wID09IDApIHtcbiAgICAgICAgLy8gICAgIHRoaXMuaGFuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgdGhpcy50aW1lID0gMTA7XG4gICAgICAgIC8vIH1cblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvLyBpZiAodXRpbCAmJiB1dGlsLnByb3BEYXRhKSB7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHV0aWwucHJvcERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgaXRlbSA9IHV0aWwucHJvcERhdGFbaV07XG4gICAgICAgIC8vICAgICAgICAgaWYgKGl0ZW0ucHJvcElzc3VlRGV0YWlsTGlzdFswXS5wcm9wc0lkID09IHByb3BUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5pbml0RGF0YSA9IGl0ZW0ucHJvcElzc3VlRGV0YWlsTGlzdFswXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgdGhpcy5zZXRTdGF0ZSgpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L2/55So6YGT5YW3XG4gICAgICovXG4gICAgdXNlQnRuKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICBpZiAodGhpcy50aW1lTGFiZWwubm9kZS5nZXRQYXJlbnQoKS5hY3RpdmUpIHtcbiAgICAgICAgICAgIEFzc2lzdEN0ci5zaG93VG9hc3RUaXAoXCLmraPlnKjkvb/nlKjkuK0hXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNMb2NrKSB7XG4gICAgICAgICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKHRoaXMuaW5pdERhdGEubGV2ZWwgKyBcIuWFs+ino+mUgSFcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXNWaWRlbzogYm9vbGVhbiA9IHRydWU7XG4gICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLnByb3BbcHJvcFR5cGUuYXV0byAtIDFdLm51bSA+IDAgfHwgdXRpbC51c2VyRGF0YS5hdXRvUHJvcCA9PSAwKSB7XG4gICAgICAgICAgICBpc1ZpZGVvID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxldCBzdWNjZXNzRm4gPSAoKSA9PiB7XG4gICAgICAgIC8vIHV0aWwuVXNlUHJvcCh0aGlzLmluaXREYXRhLnByb3BzSWQpO1xuICAgICAgICB1dGlsLlVzZVByb3AocHJvcFR5cGUuYXV0byk7XG4gICAgICAgIC8vIHRoaXMuc2V0RGF0YSgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuS9v+eUqOmBk+WFt1wiLCB0aGlzLmluaXREYXRhLnByb3BzSWQpO1xuICAgICAgICB0aGlzLnNlbmRNVHJhY2sodHJ1ZSwgaXNWaWRlbyk7XG4gICAgICAgIHV0aWwuZ2FtZVByb3BOdW0gKz0gMTtcbiAgICAgICAgdGhpcy5kanMoKTtcbiAgICAgICAgdXRpbC51c2VyRGF0YS5hdXRvUHJvcCA9IDE7XG4gICAgICAgIHRoaXMuY2xvc2VIYW5kKCk7XG4gICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkuYXV0b1Byb3AsIHV0aWwudXNlckRhdGEuYXV0b1Byb3ApO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlzVmlkZW8sICdpc1ZpZGVvJylcblxuICAgICAgICAvLyBpZiAoaXNWaWRlbykge1xuICAgICAgICAvLyAgICAgQWRDb250cm9sbGVyLmxvYWRBZChBZFBvc2l0aW9uLmF1dG9WaWRlbywgKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHV0aWwucG9zdCh7XG4gICAgICAgIC8vICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ2V0VXNlUHJvcCxcbiAgICAgICAgLy8gICAgICAgICAgICAgZGF0YTogeyBwcm9wSWQ6IHRoaXMuaW5pdERhdGEucHJvcHNJZCB9LFxuICAgICAgICAvLyAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xuICAgICAgICAvLyAgICAgICAgICAgICB9LFxuICAgICAgICAvLyAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNVHJhY2soZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgfSwgKCkgPT4ge1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBzdWNjZXNzRm4oKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8qKuWAkuiuoeaXtiAqL1xuICAgIGRqcygpIHtcbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IHV0aWwudXNlckRhdGEucHJvcFtwcm9wVHlwZS5hdXRvIC0gMV0udGltZTtcbiAgICAgICAgaWYgKHRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLm5vZGUuZ2V0UGFyZW50KCkuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnN0cmluZyA9IFRvb2xzLmNoYW5nZVRpbWUodGltZSAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IHV0aWwudXNlckRhdGEucHJvcFtwcm9wVHlwZS5hdXRvIC0gMV0udGltZTtcbiAgICAgICAgICAgIGlmICghdGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLm5vZGUuZ2V0UGFyZW50KCkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gY2MuZ2FtZS5lbWl0KE5hbWVUcy5DbG9zZV9Qcm9wX0F0dW8pOyAvLyDlhbPpl63oh6rliqjlkIjmiJBcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSBUb29scy5jaGFuZ2VUaW1lKHRpbWUpO1xuICAgICAgICB9LCAxKTtcblxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy50aW1lID4gMCkge1xuICAgICAgICAgICAgdGhpcy50aW1lIC09IGR0O1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VIYW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKuWFs+mXreaJi+WKvyAqL1xuICAgIGNsb3NlSGFuZCgpIHtcbiAgICAgICAgdGhpcy5oYW5kLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAodXRpbC51c2VyRGF0YS5hdXRvUHJvcCA9PSAyKSB7XG4gICAgICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5LmF1dG9Qcm9wLCAyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuaYr+WQpiAqL1xuICAgIHNlbmRNVHJhY2soaXNTdWNjZXNzOiBib29sZWFuLCBpc1ZpZGVvOiBib29sZWFuKSB7XG4gICAgfVxuXG59XG4iXX0=