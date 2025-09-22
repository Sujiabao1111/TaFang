import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class earnProgress extends baseTs {


    @property(cc.ProgressBar)
    private taskProgress: cc.ProgressBar = null; //任务进度条

    @property(cc.Label)
    private tasklabel1: cc.Label = null; // 当前击杀数

    @property(cc.Label)
    private tasklabel2: cc.Label = null; // 需要击杀数

    @property(cc.Node)
    private hand: cc.Node = null; //手势

    private curKillsNum: number = 0;
    private nextGearNum: number = 200;



    onLoad() {

        this.curKillsNum = util.getStorage(util.localDiary.killsValue)
        if (this.curKillsNum == null) {
            this.curKillsNum = 0;
        }

        this.init();
        // 监听击杀进度
        cc.game.on(NameTs.Game_Kills_Updata, () => {
            if (this.curKillsNum >= this.nextGearNum) {
                return;
            }
            this.curKillsNum = this.curKillsNum + 1;
            this.tasklabel1.string = this.curKillsNum + "";
            util.setStorage(util.localDiary.killsValue, this.curKillsNum)
            this.taskProgress.progress = this.curKillsNum / this.nextGearNum;
            this.checkFill();
        }, this);
    }


    init() {
        this.tasklabel1.string = this.curKillsNum + "";
        this.tasklabel2.string = "/" + this.nextGearNum;
        this.taskProgress.progress = this.curKillsNum / this.nextGearNum;
    }

    /**
    * 检查是否满了
    */
    checkFill() {
        if (this.curKillsNum >= this.nextGearNum && !this.hand.active) {
            this.hand.active = true;
        }
    }


    /**
     * 展现任务
     */
    showGameEarn() {
        if (this.curKillsNum < this.nextGearNum) {
            return;
        }
        soundController.singleton.clickAudio();
        this.showPage(pageTs.pageName.GameRewardPro, { coin: 500 });
        this.hand.active = false;
        this.curKillsNum = 0;
        util.setStorage(util.localDiary.killsValue, this.curKillsNum)
    }



}
