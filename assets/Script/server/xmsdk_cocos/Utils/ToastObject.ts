import { DurConfig, TextConfig, PosConfig } from "./XMToast";

export class ToastObject {
    text: string;
    duration: number = null;
    position: PosConfig = null;
    x: number = 0;
    y: number = 0;

    retryLoadBgCount: number = 0;

    private bgSpriteFrame: cc.SpriteFrame = null;

    constructor(_text: string, _duration: number) {
        this.text = _text;
        this.duration = _duration;
    }

    public setPosition(pos: PosConfig, _x: number, _y: number): void {
        if (pos == null || pos == undefined) {
            pos = PosConfig.BOTTOM;
        }
        this.position = pos;
        this.x = _x;
        this.y = _y;
    }

    public show(): void {
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
            this.duration = DurConfig.SHORT;
        }

        //背景图片设置
        let bgNode = new cc.Node();
        bgNode.opacity = 200;//设置背景图片透明度
        bgNode.zIndex = 10000;
        // 添加一个精灵背景
        let bgSprite = bgNode.addComponent(cc.Sprite);
        bgSprite.type = cc.Sprite.Type.SLICED;
        //添加一个widget组件, 方便定位
        let widget = bgNode.addComponent(cc.Widget);
        widget.alignMode = cc.Widget.AlignMode.ONCE;
        // 添加一个Layout
        let bgLayout = bgNode.addComponent(cc.Layout);
        bgLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        // 添加一个Label
        let textNode = new cc.Node();
        let textLabel = textNode.addComponent(cc.Label);

        // Label文字设置
        textLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        textLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        textLabel.fontSize = TextConfig.FONT_SIZE;
        textLabel.lineHeight = TextConfig.LINE_HIGHT;
        textLabel.string = this.text;

        //背景图片和文本内容间距
        bgLayout.paddingLeft = TextConfig.H_PADDING;
        bgLayout.paddingRight = TextConfig.H_PADDING;
        bgLayout.paddingTop = TextConfig.V_PADDING;
        bgLayout.paddingBottom = TextConfig.V_PADDING;

        //文本过长时，设置为自动换行
        if (this.text.length * textLabel.fontSize > (width - TextConfig.W_SPACEING)) {
            textNode.width = (width - TextConfig.W_SPACEING);
            textLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        }

        bgNode.addChild(textNode);

        if (this.bgSpriteFrame) {
            bgSprite.getComponent(cc.Sprite).spriteFrame = this.bgSpriteFrame;
        }

        // 设置toast位置
        if (this.position == PosConfig.CENTER) {
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.top = 0;
            widget.bottom = 0;
            textNode.setAnchorPoint(0.5, 0.5);

        } else if (this.position == PosConfig.TOP) {
            widget.isAlignTop = true;
            widget.isAlignBottom = false;
            widget.isAbsoluteTop = true;
            widget.top = TextConfig.B_SPACEING;
            textNode.setAnchorPoint(0.5, 1);

        } else if (this.position == PosConfig.BOTTOM) {
            widget.isAlignTop = false;
            widget.isAlignBottom = true;
            widget.isAbsoluteBottom = true;
            widget.bottom = TextConfig.B_SPACEING;
            textNode.setAnchorPoint(0.5, 0);
        }

        canvas.node.addChild(bgNode);

        let finished = cc.callFunc((target) => {
            bgNode.destroy();
        }, this);
        let action = cc.sequence(cc.moveBy(this.duration, cc.v2(0, 0)), cc.fadeOut(0.3), finished);

        bgNode.runAction(action);
    }

    private loadBg(): void {
        if(this.retryLoadBgCount >= 3){
            this.bgSpriteFrame = new cc.SpriteFrame();
            this.show();
            return;
        }
        cc.loader.loadRes("Toast/bgSprite", function (err, ret) {
            if (err) {
                this.retryLoadBgCount++;
                console.info("bgSprite加载失败", err);
            } else {
                this.bgSpriteFrame = new cc.SpriteFrame(ret);
                this.bgSpriteFrame.insetTop = 24;
                this.bgSpriteFrame.insetBottom = 24;
                this.bgSpriteFrame.insetLeft = 40;
                this.bgSpriteFrame.insetRight = 40;
            }

            //加载完成再调用
            this.show();
        }.bind(this));
    }
}
