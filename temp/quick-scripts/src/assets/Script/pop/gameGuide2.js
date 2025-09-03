"use strict";
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