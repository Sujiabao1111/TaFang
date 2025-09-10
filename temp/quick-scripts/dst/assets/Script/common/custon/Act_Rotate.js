
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/custon/Act_Rotate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b61ecVRcmBGq63YR8n35XaQ', 'Act_Rotate');
// Script/common/custon/Act_Rotate.ts

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
exports.Act_Rotate = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var Act_Rotate = /** @class */ (function (_super) {
    __extends(Act_Rotate, _super);
    function Act_Rotate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 2;
        return _this;
    }
    Act_Rotate.prototype.onLoad = function () {
    };
    Act_Rotate.prototype.start = function () {
        cc.tween(this.node)
            .by(this.speed, { angle: 360 })
            .repeatForever()
            .start();
    };
    __decorate([
        property({ tooltip: '旋转1圈的时间' })
    ], Act_Rotate.prototype, "speed", void 0);
    Act_Rotate = __decorate([
        ccclass
    ], Act_Rotate);
    return Act_Rotate;
}(cc.Component));
exports.Act_Rotate = Act_Rotate;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXGN1c3RvblxcQWN0X1JvdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBZ0MsOEJBQVk7SUFBNUM7UUFBQSxxRUFjQztRQVpHLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBWXRCLENBQUM7SUFWYSwyQkFBTSxHQUFoQjtJQUVBLENBQUM7SUFFRCwwQkFBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDOUIsYUFBYSxFQUFFO2FBQ2YsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQVhEO1FBREMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzZDQUNmO0lBRlQsVUFBVTtRQUR0QixPQUFPO09BQ0ssVUFBVSxDQWN0QjtJQUFELGlCQUFDO0NBZEQsQUFjQyxDQWQrQixFQUFFLENBQUMsU0FBUyxHQWMzQztBQWRZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgQWN0X1JvdGF0ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiAn5peL6L2sMeWciOeahOaXtumXtCcgfSlcclxuICAgIHNwZWVkOiBudW1iZXIgPSAyO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcclxuICAgICAgICAgICAgLmJ5KHRoaXMuc3BlZWQsIHsgYW5nbGU6IDM2MCB9KVxyXG4gICAgICAgICAgICAucmVwZWF0Rm9yZXZlcigpXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19