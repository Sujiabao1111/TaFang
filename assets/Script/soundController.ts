import NameTs from "./common/NameTs";
import { Tools } from "./util/Tools";

const { ccclass, property } = cc._decorator;

@ccclass
export default class soundController extends cc.Component {

    private Map: Map<string, any> = new Map();

    public static singleton: soundController = null;

    public isPlayMusic = false;

    private bgmId = null;      //bgm创建id

    onLoad() {

        if (soundController.singleton === null) {
            soundController.singleton = this;
        }
    }

    public initIsPlayMusic() {
        let isPlayAudio = Tools.getStorage("isPlayAudio");
        soundController.singleton.isPlayMusic = isPlayAudio || isPlayAudio == null ? true : false;
    }

    /**
     * 播放背景音乐
     */
    public playBGM() {
        if (!this.isPlayMusic) return;
        if (this.bgmId !== null) {
            this.resumeBGM();
            return;
        }
        this.loadMusic(NameTs.Game_Music_BGM, (res) => {
            this.bgmId = cc.audioEngine.play(res, true, 1);
        });
    }

    /**
     * 点击
     */
    public clickAudio() {
        if (!this.isPlayMusic) return;
        this.playSound(NameTs.Game_Music_Click, false, 1);
    }

    /**
     * 播放死亡音效
     */
    public playDeadAudio() {
        if (!this.isPlayMusic) return;
        this.playSound(NameTs.Game_Monster_Dead, false, 1);
    }

    /**
     * 播放音效
     */
    public playMusic(name: string) {
        if (!this.isPlayMusic) return;
        this.playSound(name, false, 1);
    }


    /**
     * 暂停背景音乐
     */
    public stopBGM() {
        cc.audioEngine.stop(this.bgmId);
    }
    /**
     * 恢复背景音乐
     */
    public resumeBGM() {
        cc.audioEngine.resumeMusic();
    }


    /** 停止播放所有音效 包含音乐 */
    public stopAllAudio() {
        this.stopBGM();
        cc.audioEngine.stopAll();
    };

    /**
     * 加载
     * @param Url 地址
     * @param call 回调
     */
    loadMusic(Url: string, call: Function) {

        let successFn = (data: cc.AudioClip) => {
            call(data);
        }

        if (this.Map.has(Url)) {
            let data = this.Map.get(Url);
            successFn(data.audio);
        } else {
            cc.resources.load(Url, cc.AudioClip, (err, res: cc.AudioClip) => {
                if (err) {
                    console.error(err);
                    return
                }
                this.Map.set(Url, {
                    audio: res,
                    id: null
                });
                successFn(res);
            });
        }


    }

    /**
     * 播放音效
     * @param Url 地址
     * @param loop 是否循环
     * @param Volume 声音大小0-1
     */
    playSound(Url: string, loop: boolean, Volume: number) {
        if (!this.isPlayMusic) return;
        this.loadMusic(Url, (res) => {
            cc.audioEngine.play(res, loop, Volume);
        });
    }

    /**
     * 清理音效
     * @param Url 地址
     */
    clearSound(Url: string) {

        if (this.Map.has(Url)) {

            let audio = this.Map.get(Url);

            cc.audioEngine.uncache(audio.audio);
        }
    }

    /**
     * 清理所有音效
     */
    clearAllSound() {
        cc.audioEngine.uncacheAll();
    }

    /**
     * 暂停所有音效
     */
    stopAllSound() {
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 暂停所有音效
     */
    resumeAllSound() {
        cc.audioEngine.resumeAllEffects();
    }

}
