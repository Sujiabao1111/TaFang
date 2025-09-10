
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Language/LocalizedLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5107aup8qxEvY3taY+LrMyk', 'LocalizedLabel');
// Script/Language/LocalizedLabel.ts

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
exports.LocalizedLabel = void 0;
var i18n = require("./LanguageData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, menu = _a.menu;
var LocalizedLabel = /** @class */ (function (_super) {
    __extends(LocalizedLabel, _super);
    function LocalizedLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.key = '';
        _this.Insert = '';
        _this.language = 'zh';
        return _this;
    }
    Object.defineProperty(LocalizedLabel.prototype, "_key", {
        get: function () {
            return this.key;
        },
        set: function (str) {
            this.key = str;
            this.updateLabel();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LocalizedLabel.prototype, "_Insert", {
        get: function () {
            return this.Insert;
        },
        set: function (str) {
            this.Insert = str;
            this.updateLabel();
        },
        enumerable: false,
        configurable: true
    });
    LocalizedLabel.prototype.onLoad = function () {
        if (!i18n.ready) {
            i18n.init();
        }
        this.fetchRender();
    };
    LocalizedLabel.prototype.onEnable = function () {
        if (this.language !== i18n._language) {
            this.fetchRender();
        }
    };
    LocalizedLabel.prototype.fetchRender = function () {
        var label;
        if (!this.label) {
            label = this.getComponent('cc.Label');
            this.label = label;
        }
        if (!this.node.getComponent(cc.LabelOutline)) {
            var labelOutline = this.node.addComponent(cc.LabelOutline);
            labelOutline.color = new cc.Color().fromHEX("#000000");
            labelOutline.width = 3;
        }
        if (this.label) {
            this.updateLabel();
            return;
        }
    };
    LocalizedLabel.prototype.updateLabel = function () {
        this.label && (this.label.string = i18n.t(this.key, this.Insert));
        // console.log('updateLabel', this.key, this.label.string);
    };
    __decorate([
        property({ visible: false })
    ], LocalizedLabel.prototype, "key", void 0);
    __decorate([
        property({ displayName: 'Key', visible: true })
    ], LocalizedLabel.prototype, "_key", null);
    __decorate([
        property({ visible: false })
    ], LocalizedLabel.prototype, "Insert", void 0);
    __decorate([
        property({ displayName: 'Insert', visible: true })
    ], LocalizedLabel.prototype, "_Insert", null);
    LocalizedLabel = __decorate([
        ccclass,
        menu('i18n/LocalizedLabel'),
        executeInEditMode
    ], LocalizedLabel);
    return LocalizedLabel;
}(cc.Component));
exports.LocalizedLabel = LocalizedLabel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMYW5ndWFnZVxcTG9jYWxpemVkTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUNqQyxJQUFBLEtBQWlELEVBQUUsQ0FBQyxVQUFVLEVBQTVELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGlCQUFpQix1QkFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUtyRTtJQUFvQyxrQ0FBWTtJQUFoRDtRQUFBLHFFQXFFQztRQXBFRyxXQUFLLEdBQW9CLElBQUksQ0FBQztRQUc5QixTQUFHLEdBQVcsRUFBRSxDQUFDO1FBYWpCLFlBQU0sR0FBVyxFQUFFLENBQUM7UUFXcEIsY0FBUSxHQUFXLElBQUksQ0FBQzs7SUF5QzVCLENBQUM7SUE3REcsc0JBQUksZ0NBQUk7YUFBUjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixDQUFDO2FBQ0QsVUFBUyxHQUFXO1lBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUpBO0lBVUQsc0JBQUksbUNBQU87YUFBWDtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBQ0QsVUFBWSxHQUFXO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7T0FKQTtJQVFELCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO1FBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHUyxpQ0FBUSxHQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxvQ0FBVyxHQUFYO1FBQ0ksSUFBSSxLQUFLLENBQUE7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBYSxDQUFDO1lBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMxQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0QsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkQsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDMUI7UUFHRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsT0FBTztTQUNWO0lBQ0wsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLDJEQUEyRDtJQUMvRCxDQUFDO0lBaEVEO1FBREMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOytDQUNaO0lBSWpCO1FBREMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OENBRy9DO0lBT0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7a0RBQ1Q7SUFHcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztpREFHbEQ7SUF0QlEsY0FBYztRQUgxQixPQUFPO1FBQ1AsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQzNCLGlCQUFpQjtPQUNMLGNBQWMsQ0FxRTFCO0lBQUQscUJBQUM7Q0FyRUQsQUFxRUMsQ0FyRW1DLEVBQUUsQ0FBQyxTQUFTLEdBcUUvQztBQXJFWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGkxOG4gZnJvbSAnLi9MYW5ndWFnZURhdGEnO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KCdpMThuL0xvY2FsaXplZExhYmVsJylcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZWRMYWJlbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBsYWJlbDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB2aXNpYmxlOiBmYWxzZSB9KVxyXG4gICAga2V5OiBzdHJpbmcgPSAnJztcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6ICdLZXknLCB2aXNpYmxlOiB0cnVlIH0pXHJcbiAgICBnZXQgX2tleSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXk7XHJcbiAgICB9XHJcbiAgICBzZXQgX2tleShzdHI6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMua2V5ID0gc3RyO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHkoeyB2aXNpYmxlOiBmYWxzZSB9KVxyXG4gICAgSW5zZXJ0OiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogJ0luc2VydCcsIHZpc2libGU6IHRydWUgfSlcclxuICAgIGdldCBfSW5zZXJ0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkluc2VydDtcclxuICAgIH1cclxuICAgIHNldCBfSW5zZXJ0KHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5JbnNlcnQgPSBzdHI7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxhbmd1YWdlOiBzdHJpbmcgPSAnemgnO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBpZiAoIWkxOG4ucmVhZHkpIHtcclxuICAgICAgICAgICAgaTE4bi5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZldGNoUmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5sYW5ndWFnZSAhPT0gaTE4bi5fbGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5mZXRjaFJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFJlbmRlcigpIHtcclxuICAgICAgICBsZXQgbGFiZWxcclxuICAgICAgICBpZiAoIXRoaXMubGFiZWwpIHtcclxuICAgICAgICAgICAgbGFiZWwgPSB0aGlzLmdldENvbXBvbmVudCgnY2MuTGFiZWwnKSBhcyBjYy5MYWJlbDtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkpIHtcclxuICAgICAgICAgICAgbGV0IGxhYmVsT3V0bGluZSA9IHRoaXMubm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKTtcclxuICAgICAgICAgICAgbGFiZWxPdXRsaW5lLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChcIiMwMDAwMDBcIik7XHJcbiAgICAgICAgICAgIGxhYmVsT3V0bGluZS53aWR0aCA9IDM7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUxhYmVsKCkge1xyXG4gICAgICAgIHRoaXMubGFiZWwgJiYgKHRoaXMubGFiZWwuc3RyaW5nID0gaTE4bi50KHRoaXMua2V5LCB0aGlzLkluc2VydCkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd1cGRhdGVMYWJlbCcsIHRoaXMua2V5LCB0aGlzLmxhYmVsLnN0cmluZyk7XHJcbiAgICB9XHJcbn1cclxuIl19