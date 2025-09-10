
import * as i18n from './LanguageData';


const { ccclass, property, executeInEditMode, menu } = cc._decorator;

@ccclass('LocalizedSpriteItem')
class LocalizedSpriteItem {
    @property()
    language: string = 'zh';
    @property({
        type: cc.SpriteFrame,
    })
    spriteFrame: cc.SpriteFrame | null = null;
}

@ccclass
@menu('i18n/LocalizedSprite')
@executeInEditMode
export class LocalizedSprite extends cc.Component {
    sprite: cc.Sprite | null = null;

    @property({
        type: LocalizedSpriteItem,
    })
    spriteList = [];

    language: string = 'zh';

    onLoad() {
        if (!i18n.ready) {
            i18n.init();
        }
        this.fetchRender();
    }

    protected onEnable(): void {
        if (this.language !== i18n._language) {
            this.updateSprite();
        }
    }

    fetchRender() {
        let sprite = this.getComponent('cc.Sprite') as cc.Sprite;
        if (sprite) {
            this.sprite = sprite;
            this.updateSprite();
            return;
        }
    }

    updateSprite() {
        this.language = i18n._language;
        if (!this.sprite) {
            console.log('updateSprite no sprite', this.node.name);
            return;
        }
        for (let i = 0; i < this.spriteList.length; i++) {
            const item = this.spriteList[i];
            // @ts-ignore
            if (item.language === i18n._language) {
                // @ts-ignore
                this.sprite.spriteFrame = item.spriteFrame;
                break;
            }
        }
    }
}
