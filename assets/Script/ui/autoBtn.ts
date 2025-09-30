import { AssistCtr } from "../Assist/AssistCtr";
import { AdPosition } from "../common/AdPosition";
import { propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import { AdManager } from "../tg/AdManager";
import TrackMgr from "../TrackMgr/TrackMgr";
import { Tools } from "../util/Tools";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class autoBtn extends cc.Component {

    //时间
    @property(cc.Label)
    private timeLabel: cc.Label = null;

    //锁
    @property(cc.Node)
    private lockIcon: cc.Node = null;

    //手
    @property(cc.Node)
    private hand: cc.Node = null;

    private timeNum: number = 30;

    onLoad() {
        this.setState();
    }


    /**设置状态 */
    setState() {
        let autoPropTime = util.getStorage(util.localDiary.autoPropTime)
        console.log("自动合成时间：", autoPropTime);
        if (autoPropTime == null) {
            this.setIsShowAdIcon(true);
            util.setStorage(util.localDiary.autoPropTime, 0);
        } else if (autoPropTime > 0) {
            util.autoPropTimeNum = autoPropTime;
            this.setIsShowAdIcon(false);
            this.scheduleOnce(() => {
                util.UseProp(propType.auto);
            }, 1)
            this.openTimer();
        }
    }


    private setIsShowAdIcon(isShow: boolean) {
        this.lockIcon.active = isShow;
        this.node.color = isShow ? cc.color(107, 107, 107, 255) : cc.color(255, 255, 255, 255);
    }

    /**
     * 使用道具
     */
    useBtn() {
        if (this.timeLabel.node.getParent().active) {
            // AssistCtr.showToastTip("正在使用中!");
            return;
        }
        soundController.singleton.clickAudio();

        AdManager.showVideoAd(() => {
            this.setIsShowAdIcon(false);
            util.UseProp(propType.auto);
            util.autoPropTimeNum = this.timeNum;
            this.openTimer();
        }, () => {

        });
    }

    openTimer() {
        if (util.autoPropTimeNum > 0) {
            this.timeLabel.node.parent.active = true;
            this.timeLabel.string = Tools.changeTime(util.autoPropTimeNum);
            this.schedule(this.timerFun, 1)
        } else {
            this.timeLabel.node.parent.active = false;
            cc.game.emit(NameTs.Close_Prop_Atuo); // 关闭自动合成
            this.setIsShowAdIcon(true);
        }
    }

    timerFun() {
        if (util.autoPropTimeNum > 0) {
            this.timeLabel.string = Tools.changeTime(util.autoPropTimeNum);
        } else {
            this.unschedule(this.timerFun);
            this.timeLabel.node.parent.active = false;
            cc.game.emit(NameTs.Close_Prop_Atuo); // 关闭自动合成
            this.setIsShowAdIcon(true);
            util.autoPropTimeNum = 0;
        }
        util.autoPropTimeNum--;
    }


}
