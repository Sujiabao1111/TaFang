
import { RELEASE_TYPE_ENUM } from "../common/PropConst";
import { TelegramPlatform } from "./TelegramPlatform";

export class AdManager {
    public static openAd: boolean = true;    //是否开启广告


    /** 发布平台类型 releaseType值严格对应cdn渠道文件夹名称*/
    public static releaseType: RELEASE_TYPE_ENUM;


    public static initTgAd() {
        if (window["Telegram"] != undefined) {
            this.releaseType = RELEASE_TYPE_ENUM.Telegram;
        } else {
            this.releaseType = RELEASE_TYPE_ENUM.h5;
        }

        console.log("当前平台:", this.releaseType);

    }


    /**
  * 播放视频激励广告
  * @param finishBack 视频完成回调
  * @param errorBack  视频失败回调
  */
    public static showVideoAd(finishBack?: Function, errorBack?: Function, data?: number, freeType?: number) {
        if (!this.openAd) { return; }
        console.log("广告类型=====", this.releaseType);
        switch (this.releaseType) {
            case RELEASE_TYPE_ENUM.Telegram:
                TelegramPlatform.ins.video(finishBack);
                break
            default:
                if (finishBack) { finishBack(); };
                break;
        }
    }







}
window['AdManager'] = AdManager;


