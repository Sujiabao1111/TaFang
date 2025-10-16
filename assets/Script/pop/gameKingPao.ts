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

    @property(cc.Node)
    private node2: cc.Node = null;

    @property(Marquee)
    private marquee: Marquee = null;
    @property(Marquee)
    private marquee1: Marquee = null;
    @property(Marquee)
    private marquee2: Marquee = null;

    @property(cc.Label)
    private moneyLabel: cc.Label = null;

    @property(cc.Label)
    private timesNumLabel: cc.Label = null;

    @property(cc.Label)
    private checkInNumLabel: cc.Label = null;


    private _countdown;
    private _curSeconds;

    onLoad() {

    }

    init(data: CheckInInfoData) {
        this.moneyLabel.string = `${data.pool}`;
        this.checkInNumLabel.string = `${data.signcnt}`;
        // let endTimes = data.cd * 1000
        this._curSeconds = data.cd;
        const diff = TimeTools._ins.getTimeHMS2(data.cd);

        this.timesNumLabel && (this.timesNumLabel.string = diff);
        if (diff != '00:00:00') {
            clearTimeout(this._countdown);
            this.countdown(data.cd);
        }
        else {
            clearTimeout(this._countdown);
        }

        let marquee = [
            { "msg": `${t('main.恭喜')}${"ID:78***15"}${t('main.提现金额')}${"0.2Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:56***87"}${t('main.提现金额')}${"0.4Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:81***27"}${t('main.提现金额')}${"0.2Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:32***11"}${t('main.提现金额')}${"0.5Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:51***93"}${t('main.提现金额')}${"0.3Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:33***71"}${t('main.提现金额')}${"0.2Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:71***00"}${t('main.提现金额')}${"0.3Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:65***22"}${t('main.提现金额')}${"0.4Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:31***87"}${t('main.提现金额')}${"0.5Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:22***81"}${t('main.提现金额')}${"0.2Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:55***18"}${t('main.提现金额')}${"0.4Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:33***79"}${t('main.提现金额')}${"0.2Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:11***57"}${t('main.提现金额')}${"0.2Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:34***31"}${t('main.提现金额')}${"0.5Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:81***53"}${t('main.提现金额')}${"0.3Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:34***88"}${t('main.提现金额')}${"0.2Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:75***46"}${t('main.提现金额')}${"0.3Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:85***32"}${t('main.提现金额')}${"0.4Ton"}`, "time": '' },
            { "msg": `${t('main.恭喜')}${"ID:21***48"}${t('main.提现金额')}${"0.5Ton"}`, "time": '' },
        ]

        let list = [];
        let list1 = [];
        let list2 = [];



        // 随机打乱
        function shuffle<T>(arr: T[]): T[] {
            let array = arr.slice();
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // 随机打乱
        let shuffled = shuffle(marquee);
        list = shuffled.slice(0, 15);
        let LyoutNode = this.node2.getChildByName("ScrollView").getChildByName("view").getChildByName("content");
        let itmeNode = this.node2.getChildByName("itmeNode");
        LyoutNode.removeAllChildren();
        for (let i = 0; i < list.length; i++) {                        //生成
            let item = cc.instantiate(itmeNode);
            item.active = true;
            item.getChildByName("lable_marqueeItem").getComponent(cc.Label).string = list[i].msg;
            item.parent = LyoutNode;
        }


        // // 分成3组，每组4个，不重复
        // list1 = shuffled.slice(4, 8);
        // list2 = shuffled.slice(8, 12);
        // this.marquee.updateMarqueeList(list);
        // this.marquee1.updateMarqueeList(list1);
        // this.marquee2.updateMarqueeList(list2);
    }

    /**
    * 倒计时函数
    * @param endTime 倒计时结束时间（以毫秒为单位的时间戳）
    */
    countdown(endTime: number) {
        this._curSeconds--;
        const diff = TimeTools._ins.getTimeHMS2(this._curSeconds);
        if (diff != '00:00:00') {
            clearTimeout(this._countdown);
            this._countdown = setTimeout(() => { this.countdown(this._curSeconds); }, 1000)
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
