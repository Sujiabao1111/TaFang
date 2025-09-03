import { Configs } from "./XMLoad";

export class LoadObject {
    loadNode: cc.Node = null;
    text: string;
    retryLoadBgCount: number = 0;

    private bgSpriteFrame: cc.SpriteFrame = null;

    constructor(_text: string) {
        this.text = _text;
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

        // load
        let loadNode = new cc.Node();
        loadNode.zIndex = 10000;
        
        // 添加一个widget组件, 铺满全屏
        let widget = loadNode.addComponent(cc.Widget);
        widget.alignMode = cc.Widget.AlignMode.ALWAYS;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.isAlignLeft= true;
        widget.isAlignRight = true;
        widget.top = 0;
        widget.bottom = 0;
        widget.left = 0;
        widget.right = 0;
        // 添加一个防穿透
        loadNode.addComponent(cc.BlockInputEvents);

        // 添加一个load内容层
        let loadWrap = new cc.Node();
        // 添加一个load内容层精灵背景
        let bgSprite = loadWrap.addComponent(cc.Sprite);
        bgSprite.type = cc.Sprite.Type.SLICED;
        bgSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        bgSprite.node.opacity = 200;

        // 添加一个load的icon
        let loadIcon = new cc.Node();
        let loadSprite = loadIcon.addComponent(cc.Sprite);
        loadSprite.type = cc.Sprite.Type.SIMPLE;
        loadSprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        cc.loader.load("http://imgs.gmilesquan.com/task-center1127/loading.png", function (err, ret) {
            if (err) {
                console.info("loadIcon加载失败", err);
                
            } else {
                loadSprite.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(ret);

                if (!this.text) {
                    loadWrap.width = ret.width + Configs.PADDING * 2;
                }

                // 给load的icon加一个360°的转动
                let rotateAction = cc.repeatForever(
                    cc.sequence(cc.rotateBy(1, 360), cc.callFunc(function () {
                        loadIcon.angle = 0;
                    }, this))
                );

                loadIcon.runAction(rotateAction);
            }
            
            // 等icon加到load内容层，再来设置load内容层精灵背景，防止视觉上的感差
            if (this.bgSpriteFrame) {
                bgSprite.getComponent(cc.Sprite).spriteFrame = this.bgSpriteFrame;
            }
            
        }.bind(this));

        // 添加一个Layout，自动撑开load内容层
        let bgLayout = loadWrap.addComponent(cc.Layout);
        bgLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        bgLayout.type = cc.Layout.Type.VERTICAL;
        bgLayout.padding = Configs.PADDING;

        // 把load的icon加到load内容层
        loadWrap.addChild(loadIcon);

        // 如果有提示语才建立Label，加入到load内容层
        if (this.text) {
            loadWrap.width = Configs.WIDTH;
            bgLayout.spacingY = Configs.PADDING;
            // 添加一个Label，用于load提示
            let textNode = new cc.Node();
            let textLabel = textNode.addComponent(cc.Label);
            // Label文字设置
            textLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            textLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
            textLabel.fontSize = Configs.FONT_SIZE;
            textLabel.lineHeight = Configs.LINE_HIGHT;
            textLabel.string = this.text;
            //文本过长时，设置为自动换行
            if (this.text.length * textLabel.fontSize > (Configs.WIDTH - Configs.PADDING * 2)) {
                textNode.width = (Configs.WIDTH - Configs.PADDING * 2);
                textLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            }

            loadWrap.addChild(textNode);
        }

        this.loadNode = loadNode;
        loadNode.addChild(loadWrap);
        canvas.node.addChild(loadNode);
    }

    public hide(): void {
        if (this.loadNode) {
            this.loadNode.destroy();
        }
    }

    private loadBg(): void {
        if(this.retryLoadBgCount >= 3){
            this.bgSpriteFrame = new cc.SpriteFrame();
            this.show();
            return
        }
        cc.loader.loadRes("Toast/bgSprite", function (err, ret) {
            if (err) {
                this.retryLoadBgCount ++;
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