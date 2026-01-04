import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import { BuyType } from "../common/PropConst";
import { t } from "../Language/LanguageData";
import soundController from "../soundController";
import { ApiService } from "../tg/ApiService";
import { Global } from "../tg/Global";
import { Tools } from "../util/Tools";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gamePass extends baseTs {

    @property(cc.Node)
    private luckyBtn: cc.Node = null;
    @property(cc.Node)
    private xingNum: cc.Node = null;
    @property(cc.Node)
    private freeNode: cc.Node = null;
    @property(cc.Node)
    private luckyNode: cc.Node = null;
    @property(cc.ScrollView)
    private scrollView: cc.ScrollView = null;


    onLoad() {

        this.initData();
    }

    private passData: UserGrowtData[] = [];
    private turret_level = 0;
    private vip_type = 0;

    private async initData() {
        this.node.opacity = 0;
        let response = await ApiService.ins.getUserGrowth();
        if (response && response?.success) {
            let response2 = await ApiService.ins.getUserinfo();
            if (response2 && response2?.success) {
                this.node.opacity = 255;
                this.turret_level = response2.data.userdata.turret_level;
                this.vip_type = response2.data.userdata.vip_type;
                this.passData = response.data;
                //倒序
                this.passData = this.passData.reverse();
                this.initView();
                console.log("this.passData  turret_level  vip_type = ", this.passData, this.turret_level, this.vip_type);
            } else {
                this.closePage();
            }
        } else {
            this.closePage();
        }

        let value = 1;
        let turretLevel = util.userData.turretLevel;
        if (turretLevel >= 35) {
            value = 0;
        }
        if (turretLevel >= 25 && turretLevel < 35) {
            value = 0.3;
        }

        this.scrollView.scrollToPercentVertical(value, 0);

    }

    private initView() {

        this.luckyBtn.getComponent(cc.Button).interactable = this.vip_type < 2;
        // Tools.setSpriteState(this.luckyBtn, this.vip_type >= 2);
        this.xingNum.active = this.vip_type < 2;
        let levelArr = [5, 10, 15, 20, 25, 30, 35, 40, 45];
        for (let i = 0; i < this.passData.length; i++) {
            let freeNode = this.freeNode.children[i];
            let luckyNode = this.luckyNode.children[i];
            freeNode.getChildByName("label").getComponent(cc.Label).string = this.passData[i].coin + "";
            luckyNode.getChildByName("label").getComponent(cc.Label).string = this.passData[i].vip_coin + "";
            freeNode.getChildByName("jiangli").active = this.passData[i].normal_get == 0 && this.turret_level >= levelArr[i];
            luckyNode.getChildByName("suoNode").active = this.vip_type >= 2 ? false : true;
            luckyNode.getChildByName("jiangli").active = this.passData[i].vip_get == 0 && this.turret_level >= levelArr[i] && this.vip_type >= 2;
            freeNode.getChildByName("end").active = this.passData[i].normal_get == 1;
            luckyNode.getChildByName("end").active = this.passData[i].vip_get == 1;
            freeNode.getChildByName("label").active = this.passData[i].normal_get == 0;
            luckyNode.getChildByName("label").active = this.passData[i].vip_get == 0;
            if (this.passData[i].normal_get == 1) {
                Tools.setSpriteState(freeNode, true, true);
            } else {
                freeNode.getComponent(cc.Button).interactable = this.turret_level >= levelArr[i];


            }

            if (this.passData[i].vip_get == 1) {
                Tools.setSpriteState(luckyNode, true, true);
            } else {
                luckyNode.getComponent(cc.Button).interactable = this.turret_level >= levelArr[i];

            }
        }
    }


    private async clickFree(event: cc.Event) {
        let index = event.target.name;
        console.log("index=========", index);
        let response = await ApiService.ins.getGrowthReward(this.passData[parseInt(index)].id, 0);
        if (response && response?.success) {
            this.passData[parseInt(index)].normal_get = 1;
            cc.game.emit(NameTs.Game_Effect_coin, {
                node: event.target, value: response.data.coin, num: 5,
                parent: cc.director.getScene().getChildByName('Canvas'), isAdd: true
            });
            this.initView();
        }

    }

    private async clickLucky(event: cc.Event) {
        let index = event.target.name;
        console.log("index=========", index);
        let response = await ApiService.ins.getGrowthReward(this.passData[parseInt(index)].id, 1);
        if (response && response?.success) {
            this.passData[parseInt(index)].vip_get = 1;
            cc.game.emit(NameTs.Game_Effect_coin, {
                node: event.target, value: response.data.coin, num: 5,
                parent: cc.director.getScene().getChildByName('Canvas'), isAdd: true
            });
            this.initView();
        }

    }


    private isClick = false;
    async clickBuy() {
        if (this.isClick) return;
        this.isClick = true;

        soundController.singleton.clickAudio();
        const msg = await ApiService.ins.paycheckin(BuyType.PassVIP);
        const rsp = msg?.response;
        if (msg.status === 200 && rsp && rsp.success) {
            // const m = await ApiService.ins.purchaseDone(rsp.data.oid);
            // if (m.status === 200 && m.response?.success) {
            //     AssistCtr.showToastTip(t('tips.buy_success'));
            //     let response1 = await ApiService.ins.getUserinfo();
            //     if (response1 && response1?.success) {
            //         this.node.opacity = 255;
            //         this.turret_level = response1.data.userdata.turret_level;
            //         this.vip_type = response1.data.userdata.vip_type;
            //         this.initView();
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
                                    if (response1.data.userdata.vip_type >= 2) {
                                        this.node.opacity = 255;
                                        this.turret_level = response1.data.userdata.turret_level;
                                        this.vip_type = response1.data.userdata.vip_type;
                                        this.initView();
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
        // 调用关闭页面的方法
        this.closePage();
    }

}
