"use strict";
cc._RF.push(module, '6396eO9/7tHQYv6WMuIh00h', 'RewardController');
// Script/controlelr/RewardController.ts

"use strict";
/*
 * @Descripttion: 用于控制奖励的收发
 * @version:
 * @Author: mies
 * @Date: 2021-02-24 10:28:56
 * @LastEditors: mies
 * @LastEditTime: 2021-02-25 10:41:27
 */
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var faceTs_1 = require("../common/faceTs");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PointName = [
    "金币",
    "红包",
    "炮台"
];
var PropName = ["冰冻", "电击", "护罩", "清屏", "自动合成", "增能"];
var RewardController = /** @class */ (function (_super) {
    __extends(RewardController, _super);
    function RewardController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pointSprite = [];
        _this.pointBigSprite = [];
        _this.propSprite = [];
        _this.phoneSprite = [];
        return _this;
    }
    RewardController_1 = RewardController;
    RewardController.prototype.onLoad = function () {
        RewardController_1.instance = this;
    };
    RewardController.prototype.findPointSprite = function (pointId) {
        return this.pointSprite[pointId] || this.pointSprite[0];
    };
    RewardController.prototype.findPointBigSprite = function (pointId) {
        return this.pointBigSprite[pointId] || this.pointBigSprite[0];
    };
    RewardController.prototype.findPropSprite = function (propId) {
        return this.propSprite[propId] || this.propSprite[0];
    };
    RewardController.prototype.findPhoneSprite = function (propId) {
        return this.phoneSprite[propId] || this.phoneSprite[0];
    };
    RewardController.prototype.findPropName = function (propId) {
        return PropName[propId];
    };
    RewardController.prototype.findPointName = function (pointId) {
        return PointName[pointId];
    };
    RewardController.prototype.gainPoint = function (pointId, count) {
        if (pointId == faceTs_1.updateType.coin) {
            util_1.default.addCoin(count);
        }
        else if (pointId == faceTs_1.updateType.product) {
            util_1.default.addProduct(count);
        }
    };
    RewardController.prototype.gainProp = function (propId, count) {
        var arr = Object.keys(faceTs_1.propType);
        util_1.default.userData.prop[arr[propId - 1]].num += count;
    };
    /**
     * 播放一个贝塞尔曲线的播放轨迹,用于金币，砖石，道具飞入背包
     * @param spriteFrame
     * @param startNode
     * @param target
     * @param callback
     * @param scale
     */
    RewardController.prototype.playAnimate = function (spriteFrame, startNode, targetNode, callback) {
        var canvasNode = cc.director.getScene().getChildByName('Canvas');
        var startPos = canvasNode.convertToNodeSpaceAR(startNode.convertToWorldSpaceAR(cc.v2(0, 0)));
        var endPos = canvasNode.convertToNodeSpaceAR(targetNode.convertToWorldSpaceAR(cc.v2(0, 0)));
        var node = new cc.Node();
        node.setContentSize(136, 136);
        node.zIndex = 2001;
        node.setPosition(startPos);
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        sprite.type = cc.Sprite.Type.SIMPLE;
        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        sprite.trim = false;
        node.parent = canvasNode;
        var actions = [];
        var midPos = cc.v2(startPos.x + 150, startPos.y - 150);
        var bezier = [startPos, midPos, endPos];
        var bezierTo = cc.bezierTo(0.5, bezier);
        var scaleTo = cc.scaleTo(0.5, 0.3, 0.3);
        actions.push(cc.delayTime(0.3));
        actions.push(cc.spawn(scaleTo, bezierTo));
        actions.push(cc.fadeOut(0.2));
        actions.push(cc.callFunc(function () {
            node.destroy();
            callback && callback(targetNode);
        }));
        node.runAction(cc.sequence(actions));
    };
    var RewardController_1;
    RewardController.instance = null;
    __decorate([
        property([cc.SpriteFrame])
    ], RewardController.prototype, "pointSprite", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RewardController.prototype, "pointBigSprite", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RewardController.prototype, "propSprite", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RewardController.prototype, "phoneSprite", void 0);
    RewardController = RewardController_1 = __decorate([
        ccclass
    ], RewardController);
    return RewardController;
}(cc.Component));
exports.default = RewardController;

cc._RF.pop();