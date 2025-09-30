
import baseTs from "../base/baseTs";
import { gameNumerical } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { RewardNodeType } from "../common/PropConst";
import soundController from "../soundController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameTreasure extends baseTs {

    @property({ type: cc.ProgressBar, displayName: "进度条" })
    private progress: cc.ProgressBar = null;

    @property({ type: cc.Node, displayName: "宝箱页面" })
    private content1: cc.Node = null;

    @property({ type: cc.Node, displayName: "关闭1" })
    private closeBtnNode1: cc.Node = null;

    @property({ type: cc.Node, displayName: "金币" })
    private goldNode: cc.Node = null;

    @property({ type: cc.Node, displayName: "金币Box" })
    private goldBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "手指" })
    private hand: cc.Node = null;

    @property({ type: dragonBones.ArmatureDisplay, displayName: "宝箱骨骼" })
    private boxDragon: dragonBones.ArmatureDisplay = null;


    /**金币 */
    private coin: number = 0;


    //点击次数
    private clickNum: number = 0;

    private isStart: boolean = false;

    onLoad() {
        this.progress.progress = 0;
        this.closeBtnNode1.active = false;
        this.unscheduleAllCallbacks();
    }

    start() {
        this.scheduleOnce(() => {
            this.closeBtnNode1.active = true;
        }, gameNumerical.closeTime);
    }

    init(data) {
        this.isStart = true;

    }

    /**
     * 点击
     */
    clickBtn() {
        soundController.singleton.clickAudio();
        this.progress.progress += .1;
        this.createGold();
        this.boxDragon.playAnimation("shake-red", 1);
        this.clickNum++;
        if (this.progress.progress >= 1) {
            this.isStart = false;
            this.content1.active = false;
            this.closePage();
            
            cc.game.emit(NameTs.Game_Pop_Open, { name: pageTs.pageName.GameRandomRedPrize, data: RewardNodeType.Box });

        }

    }

    /**产金币 */
    createGold() {
        let item: cc.Node = cc.instantiate(this.goldNode);
        item.active = true;
        item.setParent(this.goldBox);

    }

    /**
     * 关闭的
     */
    closeBtn(e, res) {
        soundController.singleton.clickAudio();
        this.closePage();
    }

    update(dt) {
        if (this.isStart) {
            this.progress.progress -= 0.003;
            if (this.progress.progress < 0) {
                this.progress.progress = 0;
            }
        }

    }
}
