import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { customsInfo } from "../common/faceTs";
import NameTs from "../common/NameTs";
import { t } from "../Language/LanguageData";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameEnd extends baseTs {


    @property({ type: cc.Label, displayName: "关卡" })
    private customLabel: cc.Label = null;

    @property({ type: cc.Label, displayName: "重玩按钮label" })
    private againLabel: cc.Label = null;


    // onLoad () {}
    //重来时间
    private time: number = 3;

    start() {

    }

    /**初始化 */
    init() {
        let customs: customsInfo = util.userData.customs;
        // this.customLabel.string = "关卡" + customs.big + "-" + customs.small;
        this.againLabel.string = t("main.replay") + "(" + this.time + ")";
        this.schedule(() => {
            this.time -= 1;
            if (this.time == 0) {
                this.closeBtn();
                return;
            }
            this.againLabel.string = "重来(" + this.time + ")";
        }, 1);
    }

    /**
     * 关闭页面
     */
    closeBtn() {
        soundController.singleton.clickAudio();
        this.unscheduleAllCallbacks();
        this.closePage();
        cc.game.emit(NameTs.Game_Again);
    }

}
