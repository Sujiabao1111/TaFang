
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
var NameTs_1 = require("../common/NameTs");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
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
        if (util_1.default.userData.noviceGuide == 5) {
            cc.game.emit(NameTs_1.default.Game_Treasure_Show);
            this.closePage();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHdWlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsMkNBQXNDO0FBR3RDLHFEQUFnRDtBQUNoRCxzREFBaUQ7QUFDakQscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFNO0lBQTdDO1FBQUEscUVBbUtDO1FBaEtXLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRWpDLGlEQUFpRDtRQUNqRCx5Q0FBeUM7UUFHakMsYUFBTyxHQUFhLElBQUksQ0FBQzs7UUFtSmpDLGlCQUFpQjtJQUNyQixDQUFDO0lBbkpHLHdCQUF3QjtJQUd4QiwwQkFBTSxHQUFOO1FBQUEsaUJBeUJDO1FBdkJHLElBQUksZUFBSyxDQUFDLFVBQVUsRUFBRTtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFBO1NBQ3JFO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQ3hCO1FBRUQsSUFBSSxJQUFJLEdBQVcsQ0FBQyxlQUFLLENBQUMsVUFBVSxJQUFJLGVBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQztRQUN0RSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUU1QyxjQUFJLENBQUMsVUFBVSxDQUFDLGNBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakQsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFF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RSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyRztJQUNMLENBQUM7SUE3SkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7OENBQ2pCO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDOzhDQUNqQjtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzsrQ0FDaEI7SUFNakM7UUFEQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7OENBQ25CO0lBZmhCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FtSzdCO0lBQUQsZ0JBQUM7Q0FuS0QsQUFtS0MsQ0FuS3NDLGdCQUFNLEdBbUs1QztrQkFuS29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBnYW1lR3VpZGUgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5oyH5a+855uS5a2QXCIsIHR5cGU6IGNjLk5vZGUgfSlcbiAgICBwcml2YXRlIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi6YGu572p55uS5a2QXCIsIHR5cGU6IGNjLk5vZGUgfSlcbiAgICBwcml2YXRlIG1hc2tCb3g6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi6Lez6L+H6aG16Z2iXCIsIHR5cGU6IGNjLk5vZGUgfSlcbiAgICBwcml2YXRlIHNraXBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eSh7ZGlzcGxheU5hbWU6XCLnrYnnuqdcIix0eXBlOmNjLlJpY2hUZXh0fSlcbiAgICAvLyBwcml2YXRlIGxldmVsTGFiZWw6Y2MuUmljaFRleHQgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwiYXBw55qE5ZCN5a2XXCIsIHR5cGU6IGNjLkxhYmVsIH0pXG4gICAgcHJpdmF0ZSBhcHBOYW1lOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICBpZiAoWE1TREsuZ2V0QXBwTmFtZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coWE1TREsuZ2V0QXBwTmFtZSgpLCAnWE1TREsuZ2V0QXBwTmFtZSgpPT09PT09PT09PT09PScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuayoeaciei/meS4quaWueazlVwiKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IChYTVNESy5nZXRBcHBOYW1lICYmIFhNU0RLLmdldEFwcE5hbWUoKSkgfHwgXCLloZTpmLLml6DmlYxcIjtcbiAgICAgICAgdGhpcy5hcHBOYW1lLnN0cmluZyA9IFwi5qyi6L+O5oKo5p2l5Yiw44CMXCIgKyBuYW1lICsgXCLjgI1cIjtcblxuICAgICAgICB1dGlsLnNldFN0b3JhZ2UodXRpbC5sb2NhbERpYXJ5Lm5vdmljZUd1aWRlLCAtMSk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Ob3ZpY2VfT3BlbiwgKHJlcykgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHJlcyk7XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Ob3ZpY2VfQ2xvc2UsICgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICB9LCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOesrOWHoOS4qlxuICAgICAqL1xuICAgIGluaXQoZGF0YSkge1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZGF0YSB8fCAxKVxuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnirbmgIFcbiAgICAgKiBAcGFyYW0gdHlwZSDnrKzlh6DkuKpcbiAgICAgKi9cbiAgICBzZXRTdGF0ZSh0eXBlOiBudW1iZXIpIHtcblxuICAgICAgICBsZXQgc3RyOiBhbnkgPSB7fTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgc3RyLmFjdGl2aXR5X3N0YXRlID0gXCLmrKLov47pobVcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBzdHIuYWN0aXZpdHlfc3RhdGUgPSBcIuaMh+W8lei0reS5sOeCruWhlOmhtVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHN0ci5hY3Rpdml0eV9zdGF0ZSA9IFwi5ouW5ou95ZCI5oiQ5pWI5p6c6aG1XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgc3RyLmFjdGl2aXR5X3N0YXRlID0gXCLlhajpg6jnuqLljIXlj6/mj5DnjrDpobVcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBzdHIuYWN0aXZpdHlfc3RhdGUgPSBcIuW8gOWni+i1oumSsemhtemdouWxleekulwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICAgICAgdXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5za2lwTm9kZS5hY3RpdmUgPSB0eXBlID09IDEgfHwgdHlwZSA+IDM7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudCAmJiB0aGlzLmNvbnRlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hc2tCb3ggJiYgdGhpcy5tYXNrQm94LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tCb3guY2hpbGRyZW4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250ZW50ICYmIHRoaXMuY29udGVudC5jaGlsZHJlbikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW3R5cGUgLSAxXS5hY3RpdmUgPSB0aGlzLm1hc2tCb3guY2hpbGRyZW5bdHlwZSAtIDFdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgV2lkZ2V0OiBjYy5XaWRnZXQgPSB0aGlzLm1hc2tCb3guY2hpbGRyZW5bdHlwZSAtIDFdLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xuICAgICAgICBpZiAoV2lkZ2V0KSB7XG4gICAgICAgICAgICBXaWRnZXQudG9wICs9IE51bWJlcih1dGlsLmlwaG9uZVhUb3ApO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL+WtmOWCqOacrOWcsFxuICAgICAgICAvL3V0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkubm92aWNlR3VpZGUsdHlwZSk7XG5cblxuXG4gICAgICAgIGlmICh0eXBlID09IDIgfHwgdHlwZSA9PSAzKSB7XG4gICAgICAgICAgICBsZXQgaGFuZDogY2MuTm9kZSA9IHRoaXMuY29udGVudC5jaGlsZHJlblt0eXBlIC0gMV0uZ2V0Q2hpbGRCeU5hbWUoXCJoYW5kXCIpO1xuICAgICAgICAgICAgdGhpcy5oYW5kQW5pKGhhbmQsIHR5cGUgPT0gMiA/IDAgOiAxKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6Lez6L+HXG4gICAgICovXG4gICAgc2tpcEJ0bigpIHtcblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuXG4gICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlID09IDUpIHtcblxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1RyZWFzdXJlX1Nob3cpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdGFydCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBudW06IG51bWJlciA9IHV0aWwudXNlckRhdGEubm92aWNlR3VpZGUgKyAxO1xuXG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShudW0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5omL55qE5Yqo55S7XG4gICAgICogQHBhcmFtIG5vZGUg6IqC54K5XG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LIDDngrnlh7sgMeaLluaLvVxuICAgICAqL1xuICAgIGhhbmRBbmkobm9kZTogY2MuTm9kZSwgdHlwZTogbnVtYmVyKSB7XG4gICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUuY2hpbGRyZW5bMF0pLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50bygwLHtzY2FsZTowLG9wYWNpdHk6MjU1fSkudG8oMSx7c2NhbGU6MX0pLnRvKC4yLHtvcGFjaXR5OjB9KSkuZGVsYXkoLjUpLnN0YXJ0KCk7XG4gICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUuY2hpbGRyZW5bMV0pLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50bygwLHtzY2FsZTowLG9wYWNpdHk6MjU1fSkuZGVsYXkoLjUpLnRvKDEse3NjYWxlOjF9KS50byguMix7b3BhY2l0eTowfSkpLnN0YXJ0KCk7XG4gICAgICAgIGlmICh0eXBlID09IDApIHtcbiAgICAgICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS5ieSguMix7eTotMTB9KS5ieSguMix7eToxMH0pLmRlbGF5KC41KSkuc3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IDEpIHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS5ieSguNSwgeyB4OiAxMjAgfSkuZGVsYXkoLjUpLmJ5KC4zLCB7IHg6IC0xMjAgfSkpLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19