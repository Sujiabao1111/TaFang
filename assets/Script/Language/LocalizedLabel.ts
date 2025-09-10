import * as i18n from './LanguageData';
const { ccclass, property, executeInEditMode, menu } = cc._decorator;

@ccclass
@menu('i18n/LocalizedLabel')
@executeInEditMode
export class LocalizedLabel extends cc.Component {
    label: cc.Label | null = null;

    @property({ visible: false })
    key: string = '';


    @property({ displayName: 'Key', visible: true })
    get _key() {
        return this.key;
    }
    set _key(str: string) {
        this.key = str;
        this.updateLabel();
    }

    @property({ visible: false })
    Insert: string = '';

    @property({ displayName: 'Insert', visible: true })
    get _Insert() {
        return this.Insert;
    }
    set _Insert(str: string) {
        this.Insert = str;
        this.updateLabel();
    }

    language: string = 'zh';

    onLoad() {
        if (!i18n.ready) {
            i18n.init();
        }

        this.fetchRender();
    }


    protected onEnable(): void {
        if (this.language !== i18n._language) {
            this.fetchRender();
        }
    }

    fetchRender() {
        let label
        if (!this.label) {
            label = this.getComponent('cc.Label') as cc.Label;
            this.label = label;
        }

        if (!this.node.getComponent(cc.LabelOutline)) {
            let labelOutline = this.node.addComponent(cc.LabelOutline);
            labelOutline.color = new cc.Color().fromHEX("#000000");
            labelOutline.width = 3;
        }


        if (this.label) {
            this.updateLabel();
            return;
        }
    }

    updateLabel() {
        this.label && (this.label.string = i18n.t(this.key, this.Insert));
        // console.log('updateLabel', this.key, this.label.string);
    }
}
