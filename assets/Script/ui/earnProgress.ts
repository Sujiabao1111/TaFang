
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { RewardNodeType } from "../common/PropConst";
import soundController from "../soundController";
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

        util.GlobalMap.set("KillsNode", this.node);

        // 监听击杀进度
        cc.game.on(NameTs.Game_Kills_Updata, (isadd) => {
            if (this.curKillsNum >= this.nextGearNum) {
                return;
            }
            if (isadd) {
                this.curKillsNum = this.curKillsNum + 1;
            }
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
        this.checkFill();
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
        cc.game.emit(NameTs.Game_Pop_Open, { name: pageTs.pageName.GameRandomRedPrize, data: RewardNodeType.Kills });
        this.hand.active = false;
        this.curKillsNum = 0;
        util.setStorage(util.localDiary.killsValue, this.curKillsNum)

    }



}
