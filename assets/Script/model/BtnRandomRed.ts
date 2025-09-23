import { AssistCtr } from "../Assist/AssistCtr";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { RewardType } from "../common/PropConst";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BtnRandomRed extends cc.Component {

    @property(cc.Label)
    private lable_time: cc.Label = null;

    @property({ type: sp.Skeleton })
    private fudaiNode: sp.Skeleton = null;
    @property(cc.Node)
    private kelingqu: cc.Node = null;

    private onceEnter = true;
    private _randomRedTimes = 300;
    onEnable() {
        let self = this;
        if (!util.chekcToday()) {
            util.setStorage(util.localDiary.randomRedTimeNum, this._randomRedTimes);
        }

        let randomRedTimeNum = util.getStorage(util.localDiary.randomRedTimeNum)
        if (randomRedTimeNum == null) {
            util.setStorage(util.localDiary.randomRedTimeNum, this._randomRedTimes);
        }
        util.randomRedTimeNum = randomRedTimeNum;
        self.lable_time.string = AssistCtr.formatSeconds(util.randomRedTimeNum);
        self.updateData();
        util.GlobalMap.set("RandomRed", this.node);
    }

    onLoad() {
        cc.game.on(NameTs.randomRedUpdate, this.updateData, this);
    }

    clickOpen() {
        let self = this;
        if (self.lable_time.node.active) {

        }
        else {
            cc.game.emit(NameTs.Game_Pop_Open, { name: pageTs.pageName.GameRandomRedPrize, data: RewardType.Fudai });
        }
    }

    openTimer() {
        let self = this;
        if (util.randomRedTimeNum > 0) {
            self.lable_time.string = AssistCtr.formatSeconds(util.randomRedTimeNum);
            self.lable_time.node.active = true;
            self.fudaiNode.setAnimation(0, "d", false);
            self.kelingqu.active = false;
            self.schedule(self.timerFun, 1)
        }
        else {
            self.lable_time.node.active = false;
            self.fudaiNode.setAnimation(0, "r", true);
            self.kelingqu.active = true;
        }
    }

    timerFun() {
        let self = this;
        if (util.randomRedTimeNum > 0) {
            self.lable_time.string = AssistCtr.formatSeconds(util.randomRedTimeNum);
        } else {
            self.unschedule(self.timerFun);
            self.lable_time.node.active = false;
            self.fudaiNode.setAnimation(0, "r", true);
            self.kelingqu.active = true;
            util.randomRedTimeNum = 0;
        }
        util.randomRedTimeNum--;
    }

    updateData() {
        if (!this.onceEnter) {
            util.randomRedTimeNum = this._randomRedTimes;
        }
        this.onceEnter = false;
        this.openTimer();
    }

}
