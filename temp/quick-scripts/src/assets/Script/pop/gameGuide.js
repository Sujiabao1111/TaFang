"use strict";
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