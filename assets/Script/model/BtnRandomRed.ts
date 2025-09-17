import { AssistCtr } from "../Assist/AssistCtr";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

export interface randomRedData {
    remainNum: number,                 //剩余次数    
}

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

    onEnable() {
        let self = this;
        if (!util.chekcToday()) {
            util.setStorage(util.localDiary.randomRedTimeNum, 60);
        }

        let randomRedTimeNum = util.getStorage(util.localDiary.randomRedTimeNum)
        if (randomRedTimeNum == null) {
            util.setStorage(util.localDiary.randomRedTimeNum, 60);
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
            AssistCtr.showToastTip(`${util.randomRedTimeNum}s后可领取`);
        }
        else {
            cc.game.emit(NameTs.Game_Pop_Open, { name: pageTs.pageName.GameRandomRedPrize });
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
        }
        else {
            self.unschedule(self.timerFun);
            self.lable_time.node.active = false;
            self.fudaiNode.setAnimation(0, "r", true);
            self.kelingqu.active = true;
            util.randomRedTimeNum = 0;
        }
        util.randomRedTimeNum--;
    }

    updateData() {
        let self = this;
        XMSDK.getdataStr({
            url: UrlConst.btnRandomRedCount,
            onSuccess: res => {
                if (res.code === 0 && res.data) {
                    if (!this.isValid) {
                        return;
                    }

                    if (res.data.remainingTimes > 0) {
                        if (res.data.remainingTimes == 99) {
                            self.lable_time.node.active = false;
                            self.fudaiNode.setAnimation(0, "r", true);
                            self.kelingqu.active = true;
                        }
                        else {
                            if (!self.onceEnter) {
                                util.randomRedTimeNum = 60;
                            }
                            this.onceEnter = false;
                            this.openTimer();
                        }
                    }
                    else {
                        this.node.active = false;
                    }
                } else {
                    XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: res => {

            }
        })
    }

}
