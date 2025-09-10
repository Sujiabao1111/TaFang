
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Language/LocalizedSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3badbaQ88ZKIous2vFB1l6k', 'LocalizedSprite');
// Script/Language/LocalizedSprite.ts

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
exports.LocalizedSprite = void 0;
var i18n = require("./LanguageData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, menu = _a.menu;
var LocalizedSpriteItem = /** @class */ (function () {
    function LocalizedSpriteItem() {
        this.language = 'zh';
        this.spriteFrame = null;
    }
    __decorate([
        property()
    ], LocalizedSpriteItem.prototype, "language", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
        })
    ], LocalizedSpriteItem.prototype, "spriteFrame", void 0);
    LocalizedSpriteItem = __decorate([
        ccclass('LocalizedSpriteItem')
    ], LocalizedSpriteItem);
    return LocalizedSpriteItem;
}());
var LocalizedSprite = /** @class */ (function (_super) {
    __extends(LocalizedSprite, _super);
    function LocalizedSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.spriteList = [];
        _this.language = 'zh';
        return _this;
    }
    LocalizedSprite.prototype.onLoad = function () {
        if (!i18n.ready) {
            i18n.init();
        }
        this.fetchRender();
    };
    LocalizedSprite.prototype.onEnable = function () {
        if (this.language !== i18n._language) {
            this.updateSprite();
        }
    };
    LocalizedSprite.prototype.fetchRender = function () {
        var sprite = this.getComponent('cc.Sprite');
        if (sprite) {
            this.sprite = sprite;
            this.updateSprite();
            return;
        }
    };
    LocalizedSprite.prototype.updateSprite = function () {
        this.language = i18n._language;
        if (!this.sprite) {
            console.log('updateSprite no sprite', this.node.name);
            return;
        }
        for (var i = 0; i < this.spriteList.length; i++) {
            var item = this.spriteList[i];
            // @ts-ignore
            if (item.language === i18n._language) {
                // @ts-ignore
                this.sprite.spriteFrame = item.spriteFrame;
                break;
            }
        }
    };
    __decorate([
        property({
            type: LocalizedSpriteItem,
        })
    ], LocalizedSprite.prototype, "spriteList", void 0);
    LocalizedSprite = __decorate([
        ccclass,
        menu('i18n/LocalizedSprite'),
        executeInEditMode
    ], LocalizedSprite);
    return LocalizedSprite;
}(cc.Component));
exports.LocalizedSprite = LocalizedSprite;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMYW5ndWFnZVxcTG9jYWxpemVkU3ByaXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxQ0FBdUM7QUFHakMsSUFBQSxLQUFpRCxFQUFFLENBQUMsVUFBVSxFQUE1RCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxpQkFBaUIsdUJBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHckU7SUFBQTtRQUVJLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFJeEIsZ0JBQVcsR0FBMEIsSUFBSSxDQUFDO0lBQzlDLENBQUM7SUFMRztRQURDLFFBQVEsRUFBRTt5REFDYTtJQUl4QjtRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVztTQUN2QixDQUFDOzREQUN3QztJQU54QyxtQkFBbUI7UUFEeEIsT0FBTyxDQUFDLHFCQUFxQixDQUFDO09BQ3pCLG1CQUFtQixDQU94QjtJQUFELDBCQUFDO0NBUEQsQUFPQyxJQUFBO0FBS0Q7SUFBcUMsbUNBQVk7SUFBakQ7UUFBQSxxRUFnREM7UUEvQ0csWUFBTSxHQUFxQixJQUFJLENBQUM7UUFLaEMsZ0JBQVUsR0FBRyxFQUFFLENBQUM7UUFFaEIsY0FBUSxHQUFXLElBQUksQ0FBQzs7SUF3QzVCLENBQUM7SUF0Q0csZ0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVTLGtDQUFRLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBYyxDQUFDO1FBQ3pELElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLE9BQU87U0FDVjtJQUNMLENBQUM7SUFFRCxzQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELE9BQU87U0FDVjtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLGFBQWE7WUFDYixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEMsYUFBYTtnQkFDYixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUMzQyxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7SUF6Q0Q7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsbUJBQW1CO1NBQzVCLENBQUM7dURBQ2M7SUFOUCxlQUFlO1FBSDNCLE9BQU87UUFDUCxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDNUIsaUJBQWlCO09BQ0wsZUFBZSxDQWdEM0I7SUFBRCxzQkFBQztDQWhERCxBQWdEQyxDQWhEb0MsRUFBRSxDQUFDLFNBQVMsR0FnRGhEO0FBaERZLDBDQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBpMThuIGZyb20gJy4vTGFuZ3VhZ2VEYXRhJztcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ0xvY2FsaXplZFNwcml0ZUl0ZW0nKVxuY2xhc3MgTG9jYWxpemVkU3ByaXRlSXRlbSB7XG4gICAgQHByb3BlcnR5KClcbiAgICBsYW5ndWFnZTogc3RyaW5nID0gJ3poJztcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICB9KVxuICAgIHNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSB8IG51bGwgPSBudWxsO1xufVxuXG5AY2NjbGFzc1xuQG1lbnUoJ2kxOG4vTG9jYWxpemVkU3ByaXRlJylcbkBleGVjdXRlSW5FZGl0TW9kZVxuZXhwb3J0IGNsYXNzIExvY2FsaXplZFNwcml0ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgc3ByaXRlOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IExvY2FsaXplZFNwcml0ZUl0ZW0sXG4gICAgfSlcbiAgICBzcHJpdGVMaXN0ID0gW107XG5cbiAgICBsYW5ndWFnZTogc3RyaW5nID0gJ3poJztcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgaWYgKCFpMThuLnJlYWR5KSB7XG4gICAgICAgICAgICBpMThuLmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZldGNoUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5sYW5ndWFnZSAhPT0gaTE4bi5fbGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3ByaXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmZXRjaFJlbmRlcigpIHtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50KCdjYy5TcHJpdGUnKSBhcyBjYy5TcHJpdGU7XG4gICAgICAgIGlmIChzcHJpdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTcHJpdGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNwcml0ZSgpIHtcbiAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGkxOG4uX2xhbmd1YWdlO1xuICAgICAgICBpZiAoIXRoaXMuc3ByaXRlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlU3ByaXRlIG5vIHNwcml0ZScsIHRoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3ByaXRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuc3ByaXRlTGlzdFtpXTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGlmIChpdGVtLmxhbmd1YWdlID09PSBpMThuLl9sYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IGl0ZW0uc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=