import baseTs from "../base/baseTs";
import { setLanguage } from "../Language/LanguageData";
import soundController from "../soundController";
import { Tools } from "../util/Tools";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameSet extends baseTs {



    @property({ type: cc.Node, tooltip: "音效" })
    private btn_sfx: cc.Node = null;

    @property({ type: cc.Node, tooltip: "语种" })
    private languageLayout: cc.Node = null;

    @property(cc.Label)
    private lable_version: cc.Label = null;


    onLoad() {
        this.setLanguageState();
        this.setSfxBtnState();
    }

    /**
     * 点击音效开关
     * @param event 点击的反馈
     * @param res 传参
     */
    clickSound(toggle: cc.Toggle) {
        console.log("set_sfx_btn", toggle.isChecked);
        Tools.setStorage("isPlayAudio", toggle.isChecked ? 1 : 0);
        soundController.singleton.isPlayMusic = toggle.isChecked;
        if (!toggle.isChecked) {
            soundController.singleton.stopAllAudio();
        } else {
            soundController.singleton.playBGM();
        }
        soundController.singleton.clickAudio();
        this.setSfxBtnState();
    }

    private setSfxBtnState() {
        let isPlayAudio = Tools.getStorage("isPlayAudio");
        console.log("set_sfx_isPlayAudio:", isPlayAudio);
        let isChecked = isPlayAudio || isPlayAudio == null ? true : false;
        console.log("set_sfx_toggle.isChecked:", isChecked);
        this.btn_sfx.getComponent(cc.Toggle).isChecked = isChecked;
    }


    /**
       * 设置语言
       *
       * @param e 事件对象
       * @param lang 语言类型，字符串类型
       */
    set_Language(e, lang: string) {
        soundController.singleton.clickAudio();
        Tools.setStorage("LanguageType", Number(lang));
        this.setLanguageState();
    }

    public setLanguageState() {
        let languageType = Tools.getStorage("LanguageType");
        let index = languageType == undefined || languageType == null ? 1 : languageType;
        for (let i = 0; i < this.languageLayout.children.length; i++) {
            this.languageLayout.children[i].getComponent(cc.Toggle).isChecked = index == i;
            console.log("isChecked", this.languageLayout.children[i].getComponent(cc.Toggle).isChecked);
        }

        setLanguage(Number(index))
    }




    /**关闭页面 */
    closeBtn() {
        soundController.singleton.clickAudio();
        this.closePage();
    }
}
