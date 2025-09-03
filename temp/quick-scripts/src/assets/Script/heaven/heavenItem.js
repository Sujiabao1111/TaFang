"use strict";
cc._RF.push(module, '3b9efP+rSJAmarFKQ0l6qP1', 'heavenItem');
// Script/heaven/heavenItem.ts

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
var pageTs_1 = require("../common/pageTs");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var heavenItem = /** @class */ (function (_super) {
    __extends(heavenItem, _super);
    function heavenItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**是否需要视频 */
        _this.isVideo = true;
        return _this;
        // update (dt) {}
    }
    /**数据 */
    heavenItem.prototype.init = function (data) {
        this.initData = data.data;
        this.no = data.no;
        var pos = cc.Vec2.clone(util_1.default.GetPlaceData(data.no).pos);
        this.node.setPosition(pos);
        this.node.opacity = 0;
        this.node.stopAllActions();
        cc.tween(this.node).by(0, { y: 200 }).by(.4, { y: -200, opacity: 255 }).repeatForever(cc.tween().delay(Math.random()).to(.5, { y: pos.y + 10 }).to(.5, { y: pos.y })).start();
        this.checkTwoHeaven();
        console.log("位置：" + this.no, "," + (this.isVideo ? "" : "不") + "看视频红包");
    };
    heavenItem.prototype.start = function () {
    };
    /**
     * 点击
     */
    heavenItem.prototype.clickBtn = function () {
        if (util_1.default.heavenTouch)
            return;
        util_1.default.heavenTouch = true;
        // console.log(PageManage.singleton.findPage(pageTs.pageName.GameHeavenReward),'PageManage.singleton.findPage(pageTs.pageName.GameHeavenReward)')
        // if(!PageManage.singleton.findPage(pageTs.pageName.GameHeavenReward)){
        soundController_1.default.singleton.clickAudio();
        this.showPage(pageTs_1.default.pageName.GameHeavenReward, { data: this.initData, no: this.no, item: this.node, isVideo: this.isVideo, node: this.node });
        TrackMgr_1.default.airborne_gold({
            activity_state: "金币点击",
        });
        // }                                
    };
    /**
     * 检测是否有两个天降金币
     */
    heavenItem.prototype.checkTwoHeaven = function () {
        if (!util_1.default.checkTestB(NameTs_1.default.heaven_coin_test)) {
            this.isVideo = true;
            return;
        }
        if (util_1.default.existVideoCoinNum < 2) {
            this.isVideo = Math.random() > .5;
            if (this.isVideo) {
                util_1.default.existVideoCoinNum++;
            }
        }
        else {
            this.isVideo = false;
        }
    };
    heavenItem = __decorate([
        ccclass
    ], heavenItem);
    return heavenItem;
}(baseTs_1.default));
exports.default = heavenItem;

cc._RF.pop();