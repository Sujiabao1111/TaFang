
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/controlelr/RewardController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb250cm9sZWxyXFxSZXdhcmRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiwyQ0FBd0Q7QUFDeEQscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLElBQU0sU0FBUyxHQUFHO0lBQ2QsSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0NBQ1AsQ0FBQTtBQUNELElBQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUV2RDtJQUE4QyxvQ0FBWTtJQUExRDtRQUFBLHFFQXdGQztRQXJGRyxpQkFBVyxHQUEwQixFQUFFLENBQUE7UUFFdkMsb0JBQWMsR0FBMEIsRUFBRSxDQUFBO1FBRzFDLGdCQUFVLEdBQTBCLEVBQUUsQ0FBQTtRQUd0QyxpQkFBVyxHQUEwQixFQUFFLENBQUE7O0lBNkUzQyxDQUFDO3lCQXhGb0IsZ0JBQWdCO0lBYWpDLGlDQUFNLEdBQU47UUFDSSxrQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO0lBQ3BDLENBQUM7SUFFRCwwQ0FBZSxHQUFmLFVBQWdCLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDM0QsQ0FBQztJQUVELDZDQUFrQixHQUFsQixVQUFtQixPQUFlO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENB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QUFDO3dEQUNXO0lBR3RDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lEQUNZO0lBWHRCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBd0ZwQztJQUFELHVCQUFDO0NBeEZELEFBd0ZDLENBeEY2QyxFQUFFLENBQUMsU0FBUyxHQXdGekQ7a0JBeEZvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBARGVzY3JpcHR0aW9uOiDnlKjkuo7mjqfliLblpZblirHnmoTmlLblj5FcclxuICogQHZlcnNpb246IFxyXG4gKiBAQXV0aG9yOiBtaWVzXHJcbiAqIEBEYXRlOiAyMDIxLTAyLTI0IDEwOjI4OjU2XHJcbiAqIEBMYXN0RWRpdG9yczogbWllc1xyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIxLTAyLTI1IDEwOjQxOjI3XHJcbiAqL1xyXG4vLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBwcm9wVHlwZSwgdXBkYXRlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XHJcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IFBvaW50TmFtZSA9IFtcclxuICAgIFwi6YeR5biBXCIsXHJcbiAgICBcIue6ouWMhVwiLFxyXG4gICAgXCLngq7lj7BcIlxyXG5dXHJcbmNvbnN0IFByb3BOYW1lID0gW1wi5Yaw5Ya7XCIsIFwi55S15Ye7XCIsIFwi5oqk572pXCIsIFwi5riF5bGPXCIsIFwi6Ieq5Yqo5ZCI5oiQXCIsIFwi5aKe6IO9XCJdXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZENvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTogUmV3YXJkQ29udHJvbGxlciA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgcG9pbnRTcHJpdGU6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHBvaW50QmlnU3ByaXRlOiBBcnJheTxjYy5TcHJpdGVGcmFtZT4gPSBbXVxyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgcHJvcFNwcml0ZTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW11cclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHBob25lU3ByaXRlOiBBcnJheTxjYy5TcHJpdGVGcmFtZT4gPSBbXVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBSZXdhcmRDb250cm9sbGVyLmluc3RhbmNlID0gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRQb2ludFNwcml0ZShwb2ludElkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludFNwcml0ZVtwb2ludElkXSB8fCB0aGlzLnBvaW50U3ByaXRlWzBdXHJcbiAgICB9XHJcblxyXG4gICAgZmluZFBvaW50QmlnU3ByaXRlKHBvaW50SWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50QmlnU3ByaXRlW3BvaW50SWRdIHx8IHRoaXMucG9pbnRCaWdTcHJpdGVbMF1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kUHJvcFNwcml0ZShwcm9wSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BTcHJpdGVbcHJvcElkXSB8fCB0aGlzLnByb3BTcHJpdGVbMF1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kUGhvbmVTcHJpdGUocHJvcElkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waG9uZVNwcml0ZVtwcm9wSWRdIHx8IHRoaXMucGhvbmVTcHJpdGVbMF1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kUHJvcE5hbWUocHJvcElkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gUHJvcE5hbWVbcHJvcElkXVxyXG4gICAgfVxyXG4gICAgZmluZFBvaW50TmFtZShwb2ludElkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gUG9pbnROYW1lW3BvaW50SWRdXHJcbiAgICB9XHJcbiAgICBnYWluUG9pbnQocG9pbnRJZDogbnVtYmVyLCBjb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHBvaW50SWQgPT0gdXBkYXRlVHlwZS5jb2luKSB7XHJcbiAgICAgICAgICAgIHV0aWwuYWRkQ29pbihjb3VudClcclxuICAgICAgICB9IGVsc2UgaWYgKHBvaW50SWQgPT0gdXBkYXRlVHlwZS5wcm9kdWN0KSB7XHJcbiAgICAgICAgICAgIHV0aWwuYWRkUHJvZHVjdChjb3VudClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnYWluUHJvcChwcm9wSWQ6IG51bWJlciwgY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhcnI6IEFycmF5PHN0cmluZz4gPSBPYmplY3Qua2V5cyhwcm9wVHlwZSlcclxuICAgICAgICB1dGlsLnVzZXJEYXRhLnByb3BbYXJyW3Byb3BJZCAtIDFdXS5udW0gKz0gY291bnRcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5LiA5Liq6LSd5aGe5bCU5puy57q/55qE5pKt5pS+6L2o6L+5LOeUqOS6jumHkeW4ge+8jOegluefs++8jOmBk+WFt+mjnuWFpeiDjOWMhVxyXG4gICAgICogQHBhcmFtIHNwcml0ZUZyYW1lIFxyXG4gICAgICogQHBhcmFtIHN0YXJ0Tm9kZSBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUgXHJcbiAgICAgKi9cclxuICAgIHBsYXlBbmltYXRlKHNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSwgc3RhcnROb2RlOiBjYy5Ob2RlLCB0YXJnZXROb2RlOiBjYy5Ob2RlLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgY2FudmFzTm9kZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpO1xyXG4gICAgICAgIGxldCBzdGFydFBvcyA9IGNhbnZhc05vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoc3RhcnROb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkpO1xyXG4gICAgICAgIGxldCBlbmRQb3MgPSBjYW52YXNOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKSk7XHJcblxyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICBub2RlLnNldENvbnRlbnRTaXplKDEzNiwgMTM2KTtcclxuICAgICAgICBub2RlLnpJbmRleCA9IDIwMDE7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcyk7XHJcbiAgICAgICAgbGV0IHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgc3ByaXRlLnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TSU1QTEU7XHJcbiAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLlJBVztcclxuICAgICAgICBzcHJpdGUudHJpbSA9IGZhbHNlO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gY2FudmFzTm9kZTtcclxuICAgICAgICBsZXQgYWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGxldCBtaWRQb3MgPSBjYy52MihzdGFydFBvcy54ICsgMTUwLCBzdGFydFBvcy55IC0gMTUwKTtcclxuICAgICAgICBsZXQgYmV6aWVyID0gW3N0YXJ0UG9zLCBtaWRQb3MsIGVuZFBvc107XHJcbiAgICAgICAgbGV0IGJlemllclRvID0gY2MuYmV6aWVyVG8oMC41LCBiZXppZXIpO1xyXG4gICAgICAgIGxldCBzY2FsZVRvID0gY2Muc2NhbGVUbygwLjUsIDAuMywgMC4zKVxyXG4gICAgICAgIGFjdGlvbnMucHVzaChjYy5kZWxheVRpbWUoMC4zKSk7XHJcbiAgICAgICAgYWN0aW9ucy5wdXNoKGNjLnNwYXduKHNjYWxlVG8sIGJlemllclRvKSk7XHJcbiAgICAgICAgYWN0aW9ucy5wdXNoKGNjLmZhZGVPdXQoMC4yKSlcclxuICAgICAgICBhY3Rpb25zLnB1c2goY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodGFyZ2V0Tm9kZSk7XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGFjdGlvbnMpKTtcclxuICAgIH1cclxufVxyXG4iXX0=