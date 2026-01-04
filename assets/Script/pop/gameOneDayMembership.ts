import { log } from "console";
import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { BuyType } from "../common/PropConst";
import { t } from "../Language/LanguageData";
import soundController from "../soundController";
import { ApiService } from "../tg/ApiService";
import { Global } from "../tg/Global";
import NameTs from "../common/NameTs";
import { Tools } from "../util/Tools";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameOneDayMembership extends baseTs {


    @property(cc.Node)
    private buyBtn: cc.Node = null;

    onLoad() {

        this.init();
    }

    private async init() {

        console.log(" Global.ins.userData.vip_type=", Global.ins.userData.vip_type);

        let isVip = (Global.ins.userData.vip_type == 1 || Global.ins.userData.vip_type >= 3);

        Tools.setSpriteState(this.buyBtn, isVip, isVip);

        this.buyBtn.getChildByName("label2").active = isVip;
        this.buyBtn.getChildByName("xingNode").active = Global.ins.userData.vip_type == 0 || Global.ins.userData.vip_type == 2;

    }

    private isClick = false;
    async clickBuy() {
        if (this.isClick) return;
        this.isClick = true;

        soundController.singleton.clickAudio();
        const msg = await ApiService.ins.paycheckin(BuyType.OneDayVIP);
        const rsp = msg?.response;
        if (msg.status === 200 && rsp && rsp.success) {
            // const m = await ApiService.ins.purchaseDone(rsp.data.oid);
            // if (m.status === 200 && m.response?.success) {
            //     AssistCtr.showToastTip(t('tips.buy_success'));
            //     let response1 = await ApiService.ins.getUserinfo();
            //     if (response1 && response1?.success) {
            //         if (response1.data.userdata.vip_type == 1 || response1.data.userdata.vip_type >= 3) {
            //             Global.ins.ondayvipcd = response1.data.ondayvipcd;
            //             console.log("Global.ins.ondayvipcd=", Global.ins.ondayvipcd);
            //             cc.game.emit(NameTs.BUY_ONEDAYVIP_SUCCESS);
            //             this.init();
            //         }
            //     }
            // }

            try {
                Global.ins.payment(rsp.data, (status) => {
                    console.log(`tg star pay status :${status}`);
                    if (status === "paid") {
                        const checkFun = async (count: number) => {
                            const m = await ApiService.ins.checkOrder(rsp.data.oid);
                            if (m.status === 200 && m.response?.success) {
                                AssistCtr.showToastTip(t('tips.buy_success'));
                                let response1 = await ApiService.ins.getUserinfo();
                                if (response1 && response1?.success) {
                                    if (response1.data.userdata.vip_type == 1 || response1.data.userdata.vip_type >= 3) {
                                        Global.ins.ondayvipcd = response1.data.ondayvipcd;
                                        console.log("Global.ins.ondayvipcd=", Global.ins.ondayvipcd);
                                        this.init();
                                        this.scheduleOnce(() => {
                                            cc.game.emit(NameTs.BUY_ONEDAYVIP_SUCCESS);
                                        }, 0.1)
                                    }
                                }
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

    clickClose() {
        this.closePage();
    }

}
