"use strict";
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