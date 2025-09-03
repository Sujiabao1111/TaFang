
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb250cm9sZWxyXFxSZXdhcmRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiwyQ0FBd0Q7QUFDeEQscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLElBQU0sU0FBUyxHQUFHO0lBQ2QsSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0NBQ1AsQ0FBQTtBQUNELElBQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUV2RDtJQUE4QyxvQ0FBWTtJQUExRDtRQUFBLHFFQXFGQztRQWxGRyxpQkFBVyxHQUEwQixFQUFFLENBQUE7UUFFdkMsb0JBQWMsR0FBMEIsRUFBRSxDQUFBO1FBRzFDLGdCQUFVLEdBQTBCLEVBQUUsQ0FBQTtRQUd0QyxpQkFBVyxHQUEwQixFQUFFLENBQUE7O0lBMEUzQyxDQUFDO3lCQXJGb0IsZ0JBQWdCO0lBYWpDLGlDQUFNLEdBQU47UUFDSSxrQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO0lBQ3BDLENBQUM7SUFDRCwwQ0FBZSxHQUFmLFVBQWdCLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDM0QsQ0FBQztJQUNELDZDQUFrQixHQUFsQixVQUFtQixPQUFlO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENB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QUFDO3dEQUNXO0lBR3RDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lEQUNZO0lBWHRCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBcUZwQztJQUFELHVCQUFDO0NBckZELEFBcUZDLENBckY2QyxFQUFFLENBQUMsU0FBUyxHQXFGekQ7a0JBckZvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQERlc2NyaXB0dGlvbjog55So5LqO5o6n5Yi25aWW5Yqx55qE5pS25Y+RXG4gKiBAdmVyc2lvbjogXG4gKiBAQXV0aG9yOiBtaWVzXG4gKiBARGF0ZTogMjAyMS0wMi0yNCAxMDoyODo1NlxuICogQExhc3RFZGl0b3JzOiBtaWVzXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIxLTAyLTI1IDEwOjQxOjI3XG4gKi9cbi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBwcm9wVHlwZSwgdXBkYXRlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBQb2ludE5hbWUgPSBbXG4gICAgXCLph5HluIFcIixcbiAgICBcIue6ouWMhVwiLFxuICAgIFwi54Ku5Y+wXCJcbl1cbmNvbnN0IFByb3BOYW1lID0gW1wi5Yaw5Ya7XCIsIFwi55S15Ye7XCIsIFwi5oqk572pXCIsIFwi5riF5bGPXCIsIFwi6Ieq5Yqo5ZCI5oiQXCIsIFwi5aKe6IO9XCJdXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkQ29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTogUmV3YXJkQ29udHJvbGxlciA9IG51bGxcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwb2ludFNwcml0ZTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW11cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwb2ludEJpZ1Nwcml0ZTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW11cblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHByb3BTcHJpdGU6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdXG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwaG9uZVNwcml0ZTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW11cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgUmV3YXJkQ29udHJvbGxlci5pbnN0YW5jZSA9IHRoaXNcbiAgICB9XG4gICAgZmluZFBvaW50U3ByaXRlKHBvaW50SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wb2ludFNwcml0ZVtwb2ludElkXSB8fCB0aGlzLnBvaW50U3ByaXRlWzBdXG4gICAgfVxuICAgIGZpbmRQb2ludEJpZ1Nwcml0ZShwb2ludElkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRCaWdTcHJpdGVbcG9pbnRJZF0gfHwgdGhpcy5wb2ludEJpZ1Nwcml0ZVswXVxuICAgIH1cblxuICAgIGZpbmRQcm9wU3ByaXRlKHByb3BJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BTcHJpdGVbcHJvcElkXSB8fCB0aGlzLnByb3BTcHJpdGVbMF1cbiAgICB9XG5cbiAgICBmaW5kUGhvbmVTcHJpdGUocHJvcElkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGhvbmVTcHJpdGVbcHJvcElkXSB8fCB0aGlzLnBob25lU3ByaXRlWzBdXG4gICAgfVxuICAgIGZpbmRQcm9wTmFtZShwcm9wSWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gUHJvcE5hbWVbcHJvcElkXVxuICAgIH1cbiAgICBmaW5kUG9pbnROYW1lKHBvaW50SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gUG9pbnROYW1lW3BvaW50SWRdXG4gICAgfVxuICAgIGdhaW5Qb2ludChwb2ludElkOiBudW1iZXIsIGNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHBvaW50SWQgPT0gdXBkYXRlVHlwZS5jb2luKSB7XG4gICAgICAgICAgICB1dGlsLmFkZENvaW4oY291bnQpXG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRJZCA9PSB1cGRhdGVUeXBlLnByb2R1Y3QpIHtcbiAgICAgICAgICAgIHV0aWwuYWRkUHJvZHVjdChjb3VudClcbiAgICAgICAgfVxuICAgIH1cbiAgICBnYWluUHJvcChwcm9wSWQ6IG51bWJlciwgY291bnQ6IG51bWJlcikge1xuICAgICAgICBsZXQgYXJyOiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXMocHJvcFR5cGUpXG4gICAgICAgIHV0aWwudXNlckRhdGEucHJvcFthcnJbcHJvcElkIC0gMV1dLm51bSArPSBjb3VudFxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmkq3mlL7kuIDkuKrotJ3loZ7lsJTmm7Lnur/nmoTmkq3mlL7ovajov7ks55So5LqO6YeR5biB77yM56CW55+z77yM6YGT5YW36aOe5YWl6IOM5YyFXG4gICAgICogQHBhcmFtIHNwcml0ZUZyYW1lIFxuICAgICAqIEBwYXJhbSBzdGFydE5vZGUgXG4gICAgICogQHBhcmFtIHRhcmdldCBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAgICogQHBhcmFtIHNjYWxlIFxuICAgICAqL1xuICAgIHBsYXlBbmltYXRlKHNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSwgc3RhcnROb2RlOiBjYy5Ob2RlLCB0YXJnZXROb2RlOiBjYy5Ob2RlLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGNhbnZhc05vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKTtcbiAgICAgICAgbGV0IHN0YXJ0UG9zID0gY2FudmFzTm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKSk7XG4gICAgICAgIGxldCBlbmRQb3MgPSBjYW52YXNOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKSk7XG5cbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICBub2RlLnNldENvbnRlbnRTaXplKDEzNiwgMTM2KTtcbiAgICAgICAgbm9kZS56SW5kZXggPSAyMDAxO1xuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHN0YXJ0UG9zKTtcbiAgICAgICAgbGV0IHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICBzcHJpdGUudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNJTVBMRTtcbiAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLlJBVztcbiAgICAgICAgc3ByaXRlLnRyaW0gPSBmYWxzZTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBjYW52YXNOb2RlO1xuICAgICAgICBsZXQgYWN0aW9ucyA9IFtdO1xuICAgICAgICBsZXQgbWlkUG9zID0gY2MudjIoc3RhcnRQb3MueCArIDE1MCwgc3RhcnRQb3MueSAtIDE1MCk7XG4gICAgICAgIGxldCBiZXppZXIgPSBbc3RhcnRQb3MsIG1pZFBvcywgZW5kUG9zXTtcbiAgICAgICAgbGV0IGJlemllclRvID0gY2MuYmV6aWVyVG8oMC41LCBiZXppZXIpO1xuICAgICAgICBsZXQgc2NhbGVUbyA9IGNjLnNjYWxlVG8oMC41LCAwLjMsIDAuMylcbiAgICAgICAgYWN0aW9ucy5wdXNoKGNjLmRlbGF5VGltZSgwLjMpKTtcbiAgICAgICAgYWN0aW9ucy5wdXNoKGNjLnNwYXduKHNjYWxlVG8sIGJlemllclRvKSk7XG4gICAgICAgIGFjdGlvbnMucHVzaChjYy5mYWRlT3V0KDAuMikpXG4gICAgICAgIGFjdGlvbnMucHVzaChjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHRhcmdldE5vZGUpO1xuICAgICAgICB9KSlcblxuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhY3Rpb25zKSk7XG4gICAgfVxufVxuIl19