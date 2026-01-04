import { AssistCtr } from "../Assist/AssistCtr";
import { AdPosition } from "../common/AdPosition";
import { propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import { AdManager } from "../tg/AdManager";
import { ApiService } from "../tg/ApiService";
import { Global } from "../tg/Global";
import TrackMgr from "../TrackMgr/TrackMgr";
import { TimeTools } from "../util/TimeTools";
import { Tools } from "../util/Tools";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class autoBtn extends cc.Component {

    //时间
    @property(cc.Label)
    private timeLabel: cc.Label = null;
    @property(cc.Label)
    private titleLabel: cc.Label = null;

    //锁
    @property(cc.Node)
    private lockIcon: cc.Node = null;

    //手
    @property(cc.Node)
    private hand: cc.Node = null;

    private timeNum: number = 30;

    onLoad() {
        this.isHaveOneDayVip();
        cc.game.on(NameTs.BUY_ONEDAYVIP_SUCCESS, (res) => {
            this.isHaveOneDayVip();
        }, this);
    }

    private isHaveOneDayVip() {
        if (Global.ins.userData.vip_type == 1 || Global.ins.userData.vip_type >= 3) {
            if (Global.ins.ondayvipcd > 0) {
                this.setIsShowAdIcon(false);
                util.UseProp(propType.auto);
                this.timeLabel.node.parent.active = true;
                this.timeLabel.string = TimeTools._ins.getTimeHMS2(Global.ins.ondayvipcd);
                this.schedule(this.timerFun2, 1)
            } else {
                this.timeLabel.node.parent.active = false;
                cc.game.emit(NameTs.Close_Prop_Atuo); // 关闭自动合成
                this.setIsShowAdIcon(true);
                
            }
        } else {
            this.setState();
        }
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
        this.lockIcon && (this.lockIcon.active = isShow)
        this.titleLabel.node.active = isShow;
        this.node.color = isShow ? cc.color(107, 107, 107, 255) : cc.color(255, 255, 255, 255);
    }

    /**
     * 使用道具
     */
    useBtn() {
        if (this.timeLabel.node.getParent().active || Global.ins.userData.vip_type == 1 || Global.ins.userData.vip_type >= 3) {
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

    openTimer2() {
        if (Global.ins.ondayvipcd > 0) {
            this.timeLabel.node.parent.active = true;
            const diff = TimeTools._ins.getTimeHMS2(Global.ins.ondayvipcd);
            this.timeLabel.string = diff;
            this.schedule(this.timerFun2, 1)
        } else {
            this.timeLabel.node.parent.active = false;
        }
    }

    async timerFun2() {
        if (Global.ins.ondayvipcd > 0) {
            if (!Global.ins.isOpenAuto) {
                util.UseProp(propType.auto);
            }
            this.timeLabel.string = TimeTools._ins.getTimeHMS2(Global.ins.ondayvipcd);
        } else {
            this.unschedule(this.timerFun2);
            this.timeLabel.node.parent.active = false;
            cc.game.emit(NameTs.Close_Prop_Atuo); // 关闭自动合成
            this.setIsShowAdIcon(true);
            Global.ins.ondayvipcd = 0;
            Global.ins.isOpenAuto = false;
            let response2 = await ApiService.ins.getUserinfo();
            if (response2 && response2?.success) {
                Global.ins.userData.vip_type = response2.data.userdata.vip_type;
            }
        }
        Global.ins.ondayvipcd--;
    }


}
