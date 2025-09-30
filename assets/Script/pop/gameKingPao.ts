import { log } from "console";
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import Marquee from "../model/Marquee";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import { TimeTools } from "../util/TimeTools";
import { ApiService } from "../tg/ApiService";
import soundController from "../soundController";
import { BuyType } from "../common/PropConst";
import { Global } from "../tg/Global";
import { UIManager } from "../base/UIManager";
import { t } from "../Language/LanguageData";
import { AssistCtr } from "../Assist/AssistCtr";
import PageManage from "../PageManage";
export interface marquee {
    msg: string,
    time: number
}


const { ccclass, property } = cc._decorator;
@ccclass
export default class gameKingPao extends baseTs {

    @property(cc.Node)
    private ruleNode: cc.Node = null;

    @property(Marquee)
    private marquee: Marquee = null;

    @property(cc.Label)
    private moneyLabel: cc.Label = null;

    @property(cc.Label)
    private timesNumLabel: cc.Label = null;

    @property(cc.Label)
    private checkInNumLabel: cc.Label = null;


    private _countdown;

    onLoad() {

    }

    init(data: CheckInInfoData) {
        this.moneyLabel.string = `${data.pool}`;
        this.checkInNumLabel.string = `${data.signcnt}`;
        let endTimes = data.cd * 1000
        const diff = TimeTools._ins.getTimeHMS(endTimes);
        this.timesNumLabel && (this.timesNumLabel.string = diff);
        if (diff != '00:00:00') {
            clearTimeout(this._countdown);
            this.countdown(endTimes);
        }
        else {
            clearTimeout(this._countdown);
        }

        let marquee = [
            { "msg": "恭喜ID7850715成功提现127.75元", "time": "03:20:58" },
            { "msg": "恭喜ID5587956成功提现127.75元", "time": "07:21:41" }
        ]
        log("marquee===", marquee);
        this.marquee.updateMarqueeList(marquee);
    }

    /**
    * 倒计时函数
    *
    * @param endTime 倒计时结束时间（以毫秒为单位的时间戳）
    */
    countdown(endTime: number) {
        const diff = TimeTools._ins.getTimeHMS(endTime);
        if (diff != '00:00:00') {
            clearTimeout(this._countdown);
            this._countdown = setTimeout(() => { this.countdown(endTime); }, 1000)
            this.timesNumLabel && (this.timesNumLabel.string = diff);
        }
        else {
            clearTimeout(this._countdown);
            this.timesNumLabel && (this.timesNumLabel.string = "00:00:00");
        }
    }


    private isClick = false;
    async clickBuy_CheckIn() {
        if (this.isClick) return;
        this.isClick = true;
        soundController.singleton.clickAudio();
        const msg = await ApiService.ins.paycheckin();
        const rsp = msg?.response;
        if (msg.status === 200 && rsp && rsp.success) {
            try {
                Global.ins.payment(rsp.data, (status) => {
                    console.log(`tg star pay status :${status}`);
                    if (status === "paid") {
                        const checkFun = async (count: number) => {
                            const m = await ApiService.ins.checkOrder(rsp.data.oid);
                            if (m.status === 200 && m.response?.success) {
                                AssistCtr.showToastTip(t('tips.buy_success'));
                            } else {
                                if (--count > 0) {
                                    console.log('checkOrder again', count);
                                    await new Promise(resolve => setTimeout(resolve, 2000));
                                    await checkFun(count);
                                }
                                else {
                                    ApiService.ins.showError(m);
                                }
                            }
                        }
                        checkFun(5);
                    }
                    this.isClick = false;
                })
            } catch (error) {
                console.log(error);
            }
        }
        else {
            ApiService.ins.showError(msg);
            this.isClick = false;
        }
    }


    closePage() {
        clearTimeout(this._countdown);
        if (this.node) {
            PageManage.singleton.closePage(this.node.name);
        }
    }

    clickCloseRule() {
        this.ruleNode.active = false;
    }

    clickOpenRule(e, index) {
        this.ruleNode.active = true;
    }
}
