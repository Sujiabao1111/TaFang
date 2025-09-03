"use strict";
cc._RF.push(module, '8280cg4/q5AFL9B8JC8n4id', 'ToastObject');
// Script/server/xmsdk_cocos/Utils/ToastObject.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastObject = void 0;
var XMToast_1 = require("./XMToast");
var ToastObject = /** @class */ (function () {
    function ToastObject(_text, _duration) {
        this.duration = null;
        this.position = null;
        this.x = 0;
        this.y = 0;
        this.retryLoadBgCount = 0;
        this.bgSpriteFrame = null;
        this.text = _text;
        this.duration = _duration;
    }
    ToastObject.prototype.setPosition = function (pos, _x, _y) {
        if (pos == null || pos == undefined) {
            pos = XMToast_1.PosConfig.BOTTOM;
        }
        this.position = pos;
        this.x = _x;
        this.y = _y;
    };
    ToastObject.prototype.show = function () {
        //加载背景纹理
        if (this.bgSpriteFrame == null) {
            this.loadBg();
            return;
        }
        var canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
        var width = canvas.node.width;
        var height = canvas.node.height;
        //默认使用短时间提示
        if (this.duration == null || this.duration == undefined) {
            this.duration = XMToast_1.DurConfig.SHORT;
        }
        //背景图片设置
        var bgNode = new cc.Node();
        bgNode.opacity = 200; //设置背景图片透明度
        bgNode.zIndex = 10000;
        // 添加一个精灵背景
        var bgSprite = bgNode.addComponent(cc.Sprite);
        bgSprite.type = cc.Sprite.Type.SLICED;
        //添加一个widget组件, 方便定位
        var widget = bgNode.addComponent(cc.Widget);
        widget.alignMode = cc.Widget.AlignMode.ONCE;
        // 添加一个Layout
        var bgLayout = bgNode.addComponent(cc.Layout);
        bgLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        // 添加一个Label
        var textNode = new cc.Node();
        var textLabel = textNode.addComponent(cc.Label);
        // Label文字设置
        textLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        textLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        textLabel.fontSize = XMToast_1.TextConfig.FONT_SIZE;
        textLabel.lineHeight = XMToast_1.TextConfig.LINE_HIGHT;
        textLabel.string = this.text;
        //背景图片和文本内容间距
        bgLayout.paddingLeft = XMToast_1.TextConfig.H_PADDING;
        bgLayout.paddingRight = XMToast_1.TextConfig.H_PADDING;
        bgLayout.paddingTop = XMToast_1.TextConfig.V_PADDING;
        bgLayout.paddingBottom = XMToast_1.TextConfig.V_PADDING;
        //文本过长时，设置为自动换行
        if (this.text.length * textLabel.fontSize > (width - XMToast_1.TextConfig.W_SPACEING)) {
            textNode.width = (width - XMToast_1.TextConfig.W_SPACEING);
            textLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        }
        bgNode.addChild(textNode);
        if (this.bgSpriteFrame) {
            bgSprite.getComponent(cc.Sprite).spriteFrame = this.bgSpriteFrame;
        }
        // 设置toast位置
        if (this.position == XMToast_1.PosConfig.CENTER) {
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.top = 0;
            widget.bottom = 0;
            textNode.setAnchorPoint(0.5, 0.5);
        }
        else if (this.position == XMToast_1.PosConfig.TOP) {
            widget.isAlignTop = true;
            widget.isAlignBottom = false;
            widget.isAbsoluteTop = true;
            widget.top = XMToast_1.TextConfig.B_SPACEING;
            textNode.setAnchorPoint(0.5, 1);
        }
        else if (this.position == XMToast_1.PosConfig.BOTTOM) {
            widget.isAlignTop = false;
            widget.isAlignBottom = true;
            widget.isAbsoluteBottom = true;
            widget.bottom = XMToast_1.TextConfig.B_SPACEING;
            textNode.setAnchorPoint(0.5, 0);
        }
        canvas.node.addChild(bgNode);
        var finished = cc.callFunc(function (target) {
            bgNode.destroy();
        }, this);
        var action = cc.sequence(cc.moveBy(this.duration, cc.v2(0, 0)), cc.fadeOut(0.3), finished);
        bgNode.runAction(action);
    };
    ToastObject.prototype.loadBg = function () {
        if (this.retryLoadBgCount >= 3) {
            this.bgSpriteFrame = new cc.SpriteFrame();
            this.show();
            return;
        }
        cc.loader.loadRes("Toast/bgSprite", function (err, ret) {
            if (err) {
                this.retryLoadBgCount++;
                console.info("bgSprite加载失败", err);
            }
            else {
                this.bgSpriteFrame = new cc.SpriteFrame(ret);
                this.bgSpriteFrame.insetTop = 24;
                this.bgSpriteFrame.insetBottom = 24;
                this.bgSpriteFrame.insetLeft = 40;
                this.bgSpriteFrame.insetRight = 40;
            }
            //加载完成再调用
            this.show();
        }.bind(this));
    };
    return ToastObject;
}());
exports.ToastObject = ToastObject;

cc._RF.pop();