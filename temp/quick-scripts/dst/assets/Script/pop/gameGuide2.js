
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameGuide2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '695e766dQhD4adF+8aI/Emd', 'gameGuide2');
// Script/pop/gameGuide2.ts

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
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameGuide2 = /** @class */ (function (_super) {
    __extends(gameGuide2, _super);
    function gameGuide2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.maskBox = null;
        _this.skipNode = null;
        _this.levelLabel = null;
        _this.appName = null;
        // LIFE-CYCLE CALLBACKS:
        _this.data = [];
        return _this;
        // update (dt) {}
    }
    gameGuide2.prototype.onLoad = function () {
        var _this = this;
        var name = (XMSDK_1.default.getAppName && XMSDK_1.default.getAppName()) || "塔防无敌";
        this.appName.string = "欢迎来到「" + name + "」";
        util_1.default.setStorage(util_1.default.localDiary.noviceGuide, -1);
        cc.game.on(NameTs_1.default.Game_Novice_Open, function (res) {
            _this.setState(res);
        }, this);
        cc.game.on(NameTs_1.default.Game_Novice_Close, function () {
            _this.closePage();
        }, this);
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.wallet_main2,
            success: function (res) {
                // for(let i =0 ;i<res.cashOutList.length;i++){
                //     let item = res.cashOutList[i];
                //     if(item.required>0){
                //         this.data.push({
                //             amount:item.amount,
                //             level:item.required
                //         })
                //     }
                // }
                if (!_this.isValid) {
                    return;
                }
                _this.data = [];
                for (var key in res.cashOutMap) {
                    var cashOutMapItem = res.cashOutMap[key];
                    for (var j = 0; j < cashOutMapItem.length; j++) {
                        if (cashOutMapItem[j].rules) {
                            for (var k = 0; k < cashOutMapItem[j].rules.length; k++) {
                                var item = cashOutMapItem[j].rules[k];
                                if (item.type == 1 && _this.data.push) {
                                    _this.data.push({
                                        amount: cashOutMapItem[j].amount,
                                        level: item.demand
                                    });
                                }
                            }
                        }
                    }
                }
                var newerLevel = (_this.data[0] && _this.data[0].level) || 18;
                _this.levelLabel.string = "<color=#BB420E>合成到</c><color=#F92222>" + newerLevel + "级</c><color=#BB420E>炮塔\n可立即提现哦！</c>";
            },
        });
    };
    /**
     * 第几个
     */
    gameGuide2.prototype.init = function (data) {
        this.setState(data || 1);
    };
    gameGuide2.prototype.start = function () {
    };
    /**
     * 状态
     * @param type 第几个
     */
    gameGuide2.prototype.setState = function (type) {
        var str = {};
        switch (type) {
            case 2:
                str.activity_state = "欢迎页";
                str.click_event = "点击";
                break;
            case 4:
                str.activity_state = "提现金额到账";
                str.click_event = "点击";
                break;
            case 5:
                str.activity_state = "合成10级提现提示";
                str.click_event = "点击";
                break;
        }
        if (str.activity_state) {
            TrackMgr_1.default.rookie_process(str);
        }
        util_1.default.userData.noviceGuide = type;
        this.skipNode.active = type > 2;
        console.log(this.skipNode, type, 'asfasfasfasf');
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
        if (type == 1 || type == 2 || type == 6) {
            var hand = this.content.children[type - 1].getChildByName("hand");
            this.handAni(hand, type == 2 ? 1 : 0);
        }
    };
    /**
     * 跳过
     */
    gameGuide2.prototype.skipBtn = function () {
        soundController_1.default.singleton.clickAudio();
        if (util_1.default.userData.noviceGuide == 5) {
            TrackMgr_1.default.rookie_process({
                activity_state: "怪兽们出来了",
                click_event: "点击"
            });
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
    gameGuide2.prototype.handAni = function (node, type) {
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
    ], gameGuide2.prototype, "content", void 0);
    __decorate([
        property({ displayName: "遮罩盒子", type: cc.Node })
    ], gameGuide2.prototype, "maskBox", void 0);
    __decorate([
        property({ displayName: "跳过页面", type: cc.Node })
    ], gameGuide2.prototype, "skipNode", void 0);
    __decorate([
        property({ displayName: "等级", type: cc.RichText })
    ], gameGuide2.prototype, "levelLabel", void 0);
    __decorate([
        property({ displayName: "app的名字", type: cc.Label })
    ], gameGuide2.prototype, "appName", void 0);
    gameGuide2 = __decorate([
        ccclass
    ], gameGuide2);
    return gameGuide2;
}(baseTs_1.default));
exports.default = gameGuide2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVHdWlkZTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLDJDQUFzQztBQUV0QywrQ0FBOEM7QUFDOUMscURBQWdEO0FBQ2hELHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFNO0lBQTlDO1FBQUEscUVBb05DO1FBak5XLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFHdkIsYUFBTyxHQUFXLElBQUksQ0FBQztRQUd2QixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBR3hCLGdCQUFVLEdBQWUsSUFBSSxDQUFDO1FBRzlCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFaEMsd0JBQXdCO1FBRWhCLFVBQUksR0FBRyxFQUNkLENBQUM7O1FBK0xGLGlCQUFpQjtJQUNyQixDQUFDO0lBOUxHLDJCQUFNLEdBQU47UUFBQSxpQkFtRUM7UUFqRUcsSUFBSSxJQUFJLEdBQVUsQ0FBQyxlQUFLLENBQUMsVUFBVSxJQUFFLGVBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFFLE1BQU0sQ0FBQztRQUVqRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQztRQUV2QyxjQUFJLENBQUMsVUFBVSxDQUFDLGNBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEQsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsRUFBQyxVQUFDLEdBQUc7WUFFbkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2QixDQUFDLEVBQUMsSUFBSSxD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TztPQUNhLFVBQVUsQ0FvTjlCO0lBQUQsaUJBQUM7Q0FwTkQsQUFvTkMsQ0FwTnVDLGdCQUFNLEdBb043QztrQkFwTm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgWE1TREsgZnJvbSBcIi4uL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi4vc291bmRDb250cm9sbGVyXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZUd1aWRlMiBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi5oyH5a+855uS5a2QXCIsdHlwZTpjYy5Ob2RlfSlcbiAgICBwcml2YXRlIGNvbnRlbnQ6Y2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIumBrue9qeebkuWtkFwiLHR5cGU6Y2MuTm9kZX0pXG4gICAgcHJpdmF0ZSBtYXNrQm94OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIui3s+i/h+mhtemdolwiLHR5cGU6Y2MuTm9kZX0pXG4gICAgcHJpdmF0ZSBza2lwTm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi562J57qnXCIsdHlwZTpjYy5SaWNoVGV4dH0pXG4gICAgcHJpdmF0ZSBsZXZlbExhYmVsOmNjLlJpY2hUZXh0ID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwiYXBw55qE5ZCN5a2XXCIsdHlwZTpjYy5MYWJlbH0pXG4gICAgcHJpdmF0ZSBhcHBOYW1lOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgcHJpdmF0ZSBkYXRhID0gW1xuICAgIF07XG5cbiAgICBvbkxvYWQgKCkgeyAgIFxuXG4gICAgICAgIGxldCBuYW1lOnN0cmluZyA9IChYTVNESy5nZXRBcHBOYW1lJiZYTVNESy5nZXRBcHBOYW1lKCkpfHxcIuWhlOmYsuaXoOaVjFwiO1xuXG4gICAgICAgIHRoaXMuYXBwTmFtZS5zdHJpbmcgPSBcIuasoui/juadpeWIsOOAjFwiK25hbWUrXCLjgI1cIjtcbiAgICAgICAgXG4gICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkubm92aWNlR3VpZGUsLTEpO1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTm92aWNlX09wZW4sKHJlcyk9PntcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShyZXMpO1xuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Ob3ZpY2VfQ2xvc2UsKCk9PntcblxuICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcblxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIHV0aWwuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LndhbGxldF9tYWluMixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBmb3IobGV0IGkgPTAgO2k8cmVzLmNhc2hPdXRMaXN0Lmxlbmd0aDtpKyspe1xuXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBpdGVtID0gcmVzLmNhc2hPdXRMaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKGl0ZW0ucmVxdWlyZWQ+MCl7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBhbW91bnQ6aXRlbS5hbW91bnQsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV2ZWw6aXRlbS5yZXF1aXJlZFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC8vICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvcihsZXQga2V5IGluIHJlcy5jYXNoT3V0TWFwKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhc2hPdXRNYXBJdGVtID0gcmVzLmNhc2hPdXRNYXBba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqPGNhc2hPdXRNYXBJdGVtLmxlbmd0aDtqKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2FzaE91dE1hcEl0ZW1bal0ucnVsZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7azxjYXNoT3V0TWFwSXRlbVtqXS5ydWxlcy5sZW5ndGg7aysrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYXNoT3V0TWFwSXRlbVtqXS5ydWxlc1trXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS50eXBlPT0xJiZ0aGlzLmRhdGEucHVzaCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OmNhc2hPdXRNYXBJdGVtW2pdLmFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDppdGVtLmRlbWFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBuZXdlckxldmVsOm51bWJlciA9ICh0aGlzLmRhdGFbMF0mJnRoaXMuZGF0YVswXS5sZXZlbCl8fDE4O1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPVwiPGNvbG9yPSNCQjQyMEU+5ZCI5oiQ5YiwPC9jPjxjb2xvcj0jRjkyMjIyPlwiK25ld2VyTGV2ZWwrXCLnuqc8L2M+PGNvbG9yPSNCQjQyMEU+54Ku5aGUXFxu5Y+v56uL5Y2z5o+Q546w5ZOm77yBPC9jPlwiO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOesrOWHoOS4qlxuICAgICAqL1xuICAgIGluaXQoZGF0YSl7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShkYXRhfHwxKVxuXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog54q25oCBXG4gICAgICogQHBhcmFtIHR5cGUg56ys5Yeg5LiqXG4gICAgICovXG4gICAgc2V0U3RhdGUodHlwZTpudW1iZXIpe1xuXG4gICAgICAgIGxldCBzdHI6YW55ID0ge307XG4gICAgICAgIHN3aXRjaCh0eXBlKXtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBzdHIuYWN0aXZpdHlfc3RhdGUgPVwi5qyi6L+O6aG1XCI7XG4gICAgICAgICAgICAgICAgc3RyLmNsaWNrX2V2ZW50ID0gXCLngrnlh7tcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBzdHIuYWN0aXZpdHlfc3RhdGUgPVwi5o+Q546w6YeR6aKd5Yiw6LSmXCI7XG4gICAgICAgICAgICAgICAgc3RyLmNsaWNrX2V2ZW50ID0gXCLngrnlh7tcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBzdHIuYWN0aXZpdHlfc3RhdGUgPVwi5ZCI5oiQMTDnuqfmj5DnjrDmj5DnpLpcIjtcbiAgICAgICAgICAgICAgICBzdHIuY2xpY2tfZXZlbnQgPSBcIueCueWHu1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICAgICAgaWYoc3RyLmFjdGl2aXR5X3N0YXRlKXtcbiAgICAgICAgICAgIFRyYWNrTWdyLnJvb2tpZV9wcm9jZXNzKHN0cik7XG4gICAgICAgIH1cblxuICAgICAgICB1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlID0gdHlwZTtcblxuICAgICAgICB0aGlzLnNraXBOb2RlLmFjdGl2ZSA9IHR5cGU+MjtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNraXBOb2RlLHR5cGUsJ2FzZmFzZmFzZmFzZicpO1xuXG4gICAgICAgIGlmKHRoaXMuY29udGVudCAmJiB0aGlzLmNvbnRlbnQuY2hpbGRyZW4pe1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuLmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMubWFza0JveCAmJiB0aGlzLm1hc2tCb3guY2hpbGRyZW4pe1xuICAgICAgICAgICAgdGhpcy5tYXNrQm94LmNoaWxkcmVuLmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuY29udGVudCAmJiB0aGlzLmNvbnRlbnQuY2hpbGRyZW4pe1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW3R5cGUtMV0uYWN0aXZlID0gdGhpcy5tYXNrQm94LmNoaWxkcmVuW3R5cGUtMV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgbGV0IFdpZGdldDpjYy5XaWRnZXQgPSB0aGlzLm1hc2tCb3guY2hpbGRyZW5bdHlwZS0xXS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcbiAgICAgICAgaWYoV2lkZ2V0KXtcbiAgICAgICAgICAgIFdpZGdldC50b3AgKz0gTnVtYmVyKHV0aWwuaXBob25lWFRvcCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8v5a2Y5YKo5pys5ZywXG4gICAgICAgIC8vdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5ub3ZpY2VHdWlkZSx0eXBlKTtcblxuXG5cbiAgICAgICAgaWYodHlwZT09MXx8dHlwZT09Mnx8dHlwZT09Nil7XG4gICAgICAgICAgICBsZXQgaGFuZDpjYy5Ob2RlID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW3R5cGUtMV0uZ2V0Q2hpbGRCeU5hbWUoXCJoYW5kXCIpO1xuICAgICAgICAgICAgdGhpcy5oYW5kQW5pKGhhbmQsdHlwZT09Mj8xOjApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi3s+i/h1xuICAgICAqL1xuICAgIHNraXBCdG4oKXtcblxuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICBpZih1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlPT01KXtcbiAgICAgICAgICAgIFRyYWNrTWdyLnJvb2tpZV9wcm9jZXNzKHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eV9zdGF0ZSA6XCLmgKrlhb3ku6zlh7rmnaXkuoZcIixcbiAgICAgICAgICAgICAgICBjbGlja19ldmVudDogXCLngrnlh7tcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHJlYXN1cmVfU2hvdyk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUGFnZSgpO1xuICAgICAgICAgICAgLy8gdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0KTtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdGFydCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IG51bTpudW1iZXIgPSB1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlKzE7XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUobnVtKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOaJi+eahOWKqOeUu1xuICAgICAqIEBwYXJhbSBub2RlIOiKgueCuVxuICAgICAqIEBwYXJhbSB0eXBlIOexu+WeiyAw54K55Ye7IDHmi5bmi71cbiAgICAgKi9cbiAgICBoYW5kQW5pKG5vZGU6Y2MuTm9kZSx0eXBlOm51bWJlcil7XG4gICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUuY2hpbGRyZW5bMF0pLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50bygwLHtzY2FsZTowLG9wYWNpdHk6MjU1fSkudG8oMSx7c2NhbGU6MX0pLnRvKC4yLHtvcGFjaXR5OjB9KSkuZGVsYXkoLjUpLnN0YXJ0KCk7XG4gICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUuY2hpbGRyZW5bMV0pLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50bygwLHtzY2FsZTowLG9wYWNpdHk6MjU1fSkuZGVsYXkoLjUpLnRvKDEse3NjYWxlOjF9KS50byguMix7b3BhY2l0eTowfSkpLnN0YXJ0KCk7XG4gICAgICAgIGlmKHR5cGU9PTApe1xuICAgICAgICAgICAgLy8gY2MudHdlZW4obm9kZSkucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLmJ5KC4yLHt5Oi0xMH0pLmJ5KC4yLHt5OjEwfSkuZGVsYXkoLjUpKS5zdGFydCgpO1xuICAgICAgICB9ZWxzZSBpZih0eXBlPT0xKXtcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS5ieSguNSx7eDoxMjB9KS5kZWxheSguNSkuYnkoLjMse3g6LTEyMH0pKS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==