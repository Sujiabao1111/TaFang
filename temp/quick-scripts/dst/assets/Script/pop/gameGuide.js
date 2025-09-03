
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameGuide.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7a1f86Dl2pCfp7lvHjFPL/K', 'gameGuide');
// Script/pop/gameGuide.ts

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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameGuide = /** @class */ (function (_super) {
    __extends(gameGuide, _super);
    function gameGuide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.maskBox = null;
        _this.skipNode = null;
        // @property({displayName:"等级",type:cc.RichText})
        // private levelLabel:cc.RichText = null;
        _this.appName = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    gameGuide.prototype.onLoad = function () {
        var _this = this;
        if (XMSDK_1.default.getAppName) {
            console.log(XMSDK_1.default.getAppName(), 'XMSDK.getAppName()=============');
        }
        else {
            console.log("没有这个方法");
        }
        var name = (XMSDK_1.default.getAppName && XMSDK_1.default.getAppName()) || "塔防无敌";
        this.appName.string = "欢迎您来到「" + name + "」";
        util_1.default.setStorage(util_1.default.localDiary.noviceGuide, -1);
        cc.game.on(NameTs_1.default.Game_Novice_Open, function (res) {
            _this.setState(res);
        }, this);
        cc.game.on(NameTs_1.default.Game_Novice_Close, function () {
            _this.closePage();
        }, this);
    };
    /**
     * 第几个
     */
    gameGuide.prototype.init = function (data) {
        this.setState(data || 1);
    };
    gameGuide.prototype.start = function () {
    };
    /**
     * 状态
     * @param type 第几个
     */
    gameGuide.prototype.setState = function (type) {
        var str = {};
        switch (type) {
            case 1:
                str.activity_state = "欢迎页";
                break;
            case 2:
                str.activity_state = "指引购买炮塔页";
                break;
            case 3:
                str.activity_state = "拖拽合成效果页";
                break;
            case 4:
                str.activity_state = "全部红包可提现页";
                break;
            case 5:
                str.activity_state = "开始赢钱页面展示";
                break;
        }
        if (str.activity_state) {
            TrackMgr_1.default.rookie_process_2(str);
        }
        util_1.default.userData.noviceGuide = type;
        this.skipNode.active = type == 1 || type > 3;
        if (this.content && this.content.children) {
            this.content.children.forEach(function (item) {
                item.active = false;
            });
        }
        if (this.maskBox && this.maskBox.children) {
            this.maskBox.children.forEach(function (item) {
                item.active = false;
            });
        }
        if (this.content && this.content.children) {
            this.content.children[type - 1].active = this.maskBox.children[type - 1].active = true;
        }
        var Widget = this.maskBox.children[type - 1].getComponent(cc.Widget);
        if (Widget) {
            Widget.top += Number(util_1.default.iphoneXTop);
        }
        //存储本地
        //util.setStorage(util.localDiary.noviceGuide,type);
        if (type == 2 || type == 3) {
            var hand = this.content.children[type - 1].getChildByName("hand");
            this.handAni(hand, type == 2 ? 0 : 1);
        }
    };
    /**
     * 跳过
     */
    gameGuide.prototype.skipBtn = function () {
        soundController_1.default.singleton.clickAudio();
        if (util_1.default.userData.noviceGuide == 4) {
            TrackMgr_1.default.rookie_process_2({
                activity_state: "「全部红包可提现页」任意位置点击",
            });
        }
        if (util_1.default.userData.noviceGuide == 5) {
            TrackMgr_1.default.rookie_process_2({
                activity_state: "开始赢钱按钮点击",
            });
            cc.game.emit(NameTs_1.default.Game_Treasure_Show);
            this.closePage();
            TrackMgr_1.default.rookie_process_2({
                activity_state: "关卡开启",
            });
            // this.showPage(pageTs.pageName.GameStart);
            cc.game.emit(NameTs_1.default.Game_Start);
            return;
        }
        var num = util_1.default.userData.noviceGuide + 1;
        this.setState(num);
    };
    /**
     * 手的动画
     * @param node 节点
     * @param type 类型 0点击 1拖拽
     */
    gameGuide.prototype.handAni = function (node, type) {
        // cc.tween(node.children[0]).repeatForever(cc.tween().to(0,{scale:0,opacity:255}).to(1,{scale:1}).to(.2,{opacity:0})).delay(.5).start();
        // cc.tween(node.children[1]).repeatForever(cc.tween().to(0,{scale:0,opacity:255}).delay(.5).to(1,{scale:1}).to(.2,{opacity:0})).start();
        if (type == 0) {
            // cc.tween(node).repeatForever(cc.tween().by(.2,{y:-10}).by(.2,{y:10}).delay(.5)).start();
        }
        else if (type == 1) {
            cc.tween(node).repeatForever(cc.tween().by(.5, { x: 120 }).delay(.5).by(.3, { x: -120 })).start();
        }
    };
    __decorate([
        property({ displayName: "指导盒子", type: cc.Node })
    ], gameGuide.prototype, "content", void 0);
    __decorate([
        property({ displayName: "遮罩盒子", type: cc.Node })
    ], gameGuide.prototype, "maskBox", void 0);
    __decorate([
        property({ displayName: "跳过页面", type: cc.Node })
    ], gameGuide.prototype, "skipNode", void 0);
    __decorate([
        property({ displayName: "app的名字", type: cc.Label })
    ], gameGuide.prototype, "appName", void 0);
    gameGuide = __decorate([
        ccclass
    ], gameGuide);
    return gameGuide;
}(baseTs_1.default));
exports.default = gameGuide;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHdWlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBR3RDLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLHFDQUFnQztBQUUxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBTTtJQUE3QztRQUFBLHFFQWdMQztRQTdLVyxhQUFPLEdBQVcsSUFBSSxDQUFDO1FBR3ZCLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFHdkIsY0FBUSxHQUFXLElBQUksQ0FBQztRQUVoQyxpREFBaUQ7UUFDakQseUNBQXlDO1FBR2pDLGFBQU8sR0FBWSxJQUFJLENBQUM7O1FBZ0toQyxpQkFBaUI7SUFDckIsQ0FBQztJQWhLRyx3QkFBd0I7SUFHeEIsMEJBQU0sR0FBTjtRQUFBLGlCQXlCQztRQXZCRyxJQUFHLGVBQUssQ0FBQyxVQUFVLEVBQUM7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsVUFBVSxFQUFFLEVBQUMsaUNBQWlDLENBQUMsQ0FBQTtTQUNwRTthQUFJO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUN4QjtRQUVELElBQUksSUFBSSxHQUFVLENBQUMsZUFBSyxDQUFDLFVBQVUsSUFBRSxlQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBRSxNQUFNLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFDLElBQUksR0FBQyxHQUFHLENBQUM7UUFFeEMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxjQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhELEVBQUUsQ0FBQyxJ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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVHdWlkZSBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi5oyH5a+855uS5a2QXCIsdHlwZTpjYy5Ob2RlfSlcbiAgICBwcml2YXRlIGNvbnRlbnQ6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIumBrue9qeebkuWtkFwiLHR5cGU6Y2MuTm9kZX0pXG4gICAgcHJpdmF0ZSBtYXNrQm94OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIui3s+i/h+mhtemdolwiLHR5cGU6Y2MuTm9kZX0pXG4gICAgcHJpdmF0ZSBza2lwTm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICAvLyBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi562J57qnXCIsdHlwZTpjYy5SaWNoVGV4dH0pXG4gICAgLy8gcHJpdmF0ZSBsZXZlbExhYmVsOmNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7ZGlzcGxheU5hbWU6XCJhcHDnmoTlkI3lrZdcIix0eXBlOmNjLkxhYmVsfSlcbiAgICBwcml2YXRlIGFwcE5hbWU6Y2MuTGFiZWwgPSBudWxsO1xuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIGlmKFhNU0RLLmdldEFwcE5hbWUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coWE1TREsuZ2V0QXBwTmFtZSgpLCdYTVNESy5nZXRBcHBOYW1lKCk9PT09PT09PT09PT09JylcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuayoeaciei/meS4quaWueazlVwiKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5hbWU6c3RyaW5nID0gKFhNU0RLLmdldEFwcE5hbWUmJlhNU0RLLmdldEFwcE5hbWUoKSl8fFwi5aGU6Ziy5peg5pWMXCI7XG4gICAgICAgIHRoaXMuYXBwTmFtZS5zdHJpbmcgPSBcIuasoui/juaCqOadpeWIsOOAjFwiK25hbWUrXCLjgI1cIjtcbiAgICAgICAgXG4gICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkubm92aWNlR3VpZGUsLTEpO1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTm92aWNlX09wZW4sKHJlcyk9PntcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShyZXMpO1xuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Ob3ZpY2VfQ2xvc2UsKCk9PntcblxuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56ys5Yeg5LiqXG4gICAgICovXG4gICAgaW5pdChkYXRhKXtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKGRhdGF8fDEpXG5cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnirbmgIFcbiAgICAgKiBAcGFyYW0gdHlwZSDnrKzlh6DkuKpcbiAgICAgKi9cbiAgICBzZXRTdGF0ZSh0eXBlOm51bWJlcil7XG5cbiAgICAgICAgbGV0IHN0cjphbnkgPSB7fTtcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHN0ci5hY3Rpdml0eV9zdGF0ZSA9XCLmrKLov47pobVcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBzdHIuYWN0aXZpdHlfc3RhdGUgPVwi5oyH5byV6LSt5Lmw54Ku5aGU6aG1XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgc3RyLmFjdGl2aXR5X3N0YXRlID1cIuaLluaLveWQiOaIkOaViOaenOmhtVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHN0ci5hY3Rpdml0eV9zdGF0ZSA9XCLlhajpg6jnuqLljIXlj6/mj5DnjrDpobVcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBzdHIuYWN0aXZpdHlfc3RhdGUgPVwi5byA5aeL6LWi6ZKx6aG16Z2i5bGV56S6XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgICAgICBpZihzdHIuYWN0aXZpdHlfc3RhdGUpe1xuICAgICAgICAgICAgVHJhY2tNZ3Iucm9va2llX3Byb2Nlc3NfMihzdHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5za2lwTm9kZS5hY3RpdmUgPSB0eXBlPT0xfHx0eXBlPjM7XG5cbiAgICAgICAgaWYodGhpcy5jb250ZW50ICYmIHRoaXMuY29udGVudC5jaGlsZHJlbil7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW4uZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5tYXNrQm94ICYmIHRoaXMubWFza0JveC5jaGlsZHJlbil7XG4gICAgICAgICAgICB0aGlzLm1hc2tCb3guY2hpbGRyZW4uZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5jb250ZW50ICYmIHRoaXMuY29udGVudC5jaGlsZHJlbil7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bdHlwZS0xXS5hY3RpdmUgPSB0aGlzLm1hc2tCb3guY2hpbGRyZW5bdHlwZS0xXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICBsZXQgV2lkZ2V0OmNjLldpZGdldCA9IHRoaXMubWFza0JveC5jaGlsZHJlblt0eXBlLTFdLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xuICAgICAgICBpZihXaWRnZXQpe1xuICAgICAgICAgICAgV2lkZ2V0LnRvcCArPSBOdW1iZXIodXRpbC5pcGhvbmVYVG9wKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy/lrZjlgqjmnKzlnLBcbiAgICAgICAgLy91dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5Lm5vdmljZUd1aWRlLHR5cGUpO1xuXG5cblxuICAgICAgICBpZih0eXBlPT0yfHx0eXBlPT0zKXtcbiAgICAgICAgICAgIGxldCBoYW5kOmNjLk5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bdHlwZS0xXS5nZXRDaGlsZEJ5TmFtZShcImhhbmRcIik7XG4gICAgICAgICAgICB0aGlzLmhhbmRBbmkoaGFuZCx0eXBlPT0yPzA6MSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6Lez6L+HXG4gICAgICovXG4gICAgc2tpcEJ0bigpe1xuXG4gICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24uY2xpY2tBdWRpbygpO1xuXG4gICAgICAgIGlmKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGU9PTQpe1xuICAgICAgICAgICAgVHJhY2tNZ3Iucm9va2llX3Byb2Nlc3NfMih7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGUgOlwi44CM5YWo6YOo57qi5YyF5Y+v5o+Q546w6aG144CN5Lu75oSP5L2N572u54K55Ye7XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGU9PTUpe1xuICAgICAgICAgICAgVHJhY2tNZ3Iucm9va2llX3Byb2Nlc3NfMih7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGUgOlwi5byA5aeL6LWi6ZKx5oyJ6ZKu54K55Ye7XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UcmVhc3VyZV9TaG93KTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYWdlKCk7XG4gICAgICAgICAgICBUcmFja01nci5yb29raWVfcHJvY2Vzc18yKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZSA6XCLlhbPljaHlvIDlkK9cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdGFydCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IG51bTpudW1iZXIgPSB1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlKzE7XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUobnVtKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOaJi+eahOWKqOeUu1xuICAgICAqIEBwYXJhbSBub2RlIOiKgueCuVxuICAgICAqIEBwYXJhbSB0eXBlIOexu+WeiyAw54K55Ye7IDHmi5bmi71cbiAgICAgKi9cbiAgICBoYW5kQW5pKG5vZGU6Y2MuTm9kZSx0eXBlOm51bWJlcil7XG4gICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUuY2hpbGRyZW5bMF0pLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50bygwLHtzY2FsZTowLG9wYWNpdHk6MjU1fSkudG8oMSx7c2NhbGU6MX0pLnRvKC4yLHtvcGFjaXR5OjB9KSkuZGVsYXkoLjUpLnN0YXJ0KCk7XG4gICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUuY2hpbGRyZW5bMV0pLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50bygwLHtzY2FsZTowLG9wYWNpdHk6MjU1fSkuZGVsYXkoLjUpLnRvKDEse3NjYWxlOjF9KS50byguMix7b3BhY2l0eTowfSkpLnN0YXJ0KCk7XG4gICAgICAgIGlmKHR5cGU9PTApe1xuICAgICAgICAgICAgLy8gY2MudHdlZW4obm9kZSkucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLmJ5KC4yLHt5Oi0xMH0pLmJ5KC4yLHt5OjEwfSkuZGVsYXkoLjUpKS5zdGFydCgpO1xuICAgICAgICB9ZWxzZSBpZih0eXBlPT0xKXtcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS5ieSguNSx7eDoxMjB9KS5kZWxheSguNSkuYnkoLjMse3g6LTEyMH0pKS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==