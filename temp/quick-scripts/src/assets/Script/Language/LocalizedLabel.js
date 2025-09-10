"use strict";
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