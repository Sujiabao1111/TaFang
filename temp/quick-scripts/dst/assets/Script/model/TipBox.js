
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/model/TipBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee073stBU9HCYaZG0UZ5P8P', 'TipBox');
// Script/model/TipBox.ts

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
var NameTs_1 = require("../common/NameTs");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TipBox = /** @class */ (function (_super) {
    __extends(TipBox, _super);
    function TipBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tipsNode = null;
        return _this;
        // showSpecailMessage(text: string, position: cc.Vec3, delayTime: number = 2) {
        //     this.tip_label.string = text
        //     this.node.position = position
        //     this.node.opacity = 255
        //     this.node.runAction(cc.sequence(cc.moveBy(delayTime / 2, 0, 100), cc.delayTime(delayTime / 4), cc.fadeOut(delayTime / 4), cc.callFunc(() => {
        //         this.node.active = false;
        //     })))
        // }
        // update (dt) {}
    }
    TipBox.prototype.onLoad = function () {
        var _this = this;
        this.node.removeAllChildren();
        cc.director.on(NameTs_1.default.Show_Toast, function (res) {
            var tipNode = cc.instantiate(_this.tipsNode);
            tipNode.parent = _this.node;
            tipNode.position = cc.v3(0, 0, 0);
            tipNode.getChildByName("label").getComponent(cc.Label).string = res;
            _this.showMessage(tipNode);
        }, this);
    };
    TipBox.prototype.showMessage = function (item) {
        item.active = true;
        item.position = cc.v3(0, 0, 0);
        // item.opacity = 255;
        //action
        cc.tween(item)
            .delay(1.3)
            .to(1, { opacity: 0 }, { easing: cc.easing.quintOut })
            .start();
        cc.tween(item)
            .to(1, { position: cc.v3(0, 150) }, { easing: cc.easing.quintOut })
            .delay(0.3)
            .to(1, { position: cc.v3(0, 0) }, { easing: cc.easing.quintOut })
            .call(function (node) { return node.destroy(); })
            .start();
        // cc.tween(item).to(1, { y: 250 }).to(0.8, { opacity: 0 }).call(() => {
        //     item.destroy();
        // }).start();
    };
    __decorate([
        property(cc.Node)
    ], TipBox.prototype, "tipsNode", void 0);
    TipBox = __decorate([
        ccclass
    ], TipBox);
    return TipBox;
}(cc.Component));
exports.default = TipBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxtb2RlbFxcVGlwQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzQztBQUVoQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQXFEQztRQWxERyxjQUFRLEdBQVksSUFBSSxDQUFDOztRQXVDekIsK0VBQStFO1FBQy9FLG1DQUFtQztRQUNuQyxvQ0FBb0M7UUFDcEMsOEJBQThCO1FBQzlCLG9KQUFvSjtRQUNwSixvQ0FBb0M7UUFDcEMsV0FBVztRQUVYLElBQUk7UUFFSixpQkFBaUI7SUFDckIsQ0FBQztJQS9DYSx1QkFBTSxHQUFoQjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsVUFBVSxFQUFFLFVBQUEsR0FBRztZQUNqQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUM7WUFDM0IsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDakMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFFcEUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM3QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsNEJBQVcsR0FBWCxVQUFZLElBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDOUIsc0JBQXNCO1FBRXRCLFFBQVE7UUFDUixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNULEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckQsS0FBSyxFQUFFLENBQUM7UUFFYixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNULEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2xFLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNoRSxJQUFJLENBQUMsVUFBQyxJQUFlLElBQUssT0FBQSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQWQsQ0FBYyxDQUFDO2FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBR2Isd0VBQXdFO1FBQ3hFLHNCQUFzQjtRQUN0QixjQUFjO0lBQ2xCLENBQUM7SUFyQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDTztJQUhSLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FxRDFCO0lBQUQsYUFBQztDQXJERCxBQXFEQyxDQXJEbUMsRUFBRSxDQUFDLFNBQVMsR0FxRC9DO2tCQXJEb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpcEJveCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0aXBzTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICBjYy5kaXJlY3Rvci5vbihOYW1lVHMuU2hvd19Ub2FzdCwgcmVzID0+IHtcbiAgICAgICAgICAgIGxldCB0aXBOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50aXBzTm9kZSk7XG4gICAgICAgICAgICB0aXBOb2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIHRpcE5vZGUucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKVxuICAgICAgICAgICAgdGlwTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVzO1xuXG4gICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKHRpcE5vZGUpXG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIHNob3dNZXNzYWdlKGl0ZW06IGNjLk5vZGUpIHtcbiAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBpdGVtLnBvc2l0aW9uID0gY2MudjMoMCwgMCwgMClcbiAgICAgICAgLy8gaXRlbS5vcGFjaXR5ID0gMjU1O1xuXG4gICAgICAgIC8vYWN0aW9uXG4gICAgICAgIGNjLnR3ZWVuKGl0ZW0pXG4gICAgICAgICAgICAuZGVsYXkoMS4zKVxuICAgICAgICAgICAgLnRvKDEsIHsgb3BhY2l0eTogMCB9LCB7IGVhc2luZzogY2MuZWFzaW5nLnF1aW50T3V0IH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcblxuICAgICAgICBjYy50d2VlbihpdGVtKVxuICAgICAgICAgICAgLnRvKDEsIHsgcG9zaXRpb246IGNjLnYzKDAsIDE1MCkgfSwgeyBlYXNpbmc6IGNjLmVhc2luZy5xdWludE91dCB9KVxuICAgICAgICAgICAgLmRlbGF5KDAuMylcbiAgICAgICAgICAgIC50bygxLCB7IHBvc2l0aW9uOiBjYy52MygwLCAwKSB9LCB7IGVhc2luZzogY2MuZWFzaW5nLnF1aW50T3V0IH0pXG4gICAgICAgICAgICAuY2FsbCgobm9kZTogY2MuUHJlZmFiKSA9PiBub2RlLmRlc3Ryb3koKSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG5cbiAgICAgICAgLy8gY2MudHdlZW4oaXRlbSkudG8oMSwgeyB5OiAyNTAgfSkudG8oMC44LCB7IG9wYWNpdHk6IDAgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgIC8vICAgICBpdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgLy8gfSkuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvLyBzaG93U3BlY2FpbE1lc3NhZ2UodGV4dDogc3RyaW5nLCBwb3NpdGlvbjogY2MuVmVjMywgZGVsYXlUaW1lOiBudW1iZXIgPSAyKSB7XG4gICAgLy8gICAgIHRoaXMudGlwX2xhYmVsLnN0cmluZyA9IHRleHRcbiAgICAvLyAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gcG9zaXRpb25cbiAgICAvLyAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTVcbiAgICAvLyAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoZGVsYXlUaW1lIC8gMiwgMCwgMTAwKSwgY2MuZGVsYXlUaW1lKGRlbGF5VGltZSAvIDQpLCBjYy5mYWRlT3V0KGRlbGF5VGltZSAvIDQpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gICAgIH0pKSlcblxuICAgIC8vIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=