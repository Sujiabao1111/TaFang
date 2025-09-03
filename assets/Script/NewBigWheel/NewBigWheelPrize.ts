import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import RewardController from "../controlelr/RewardController";
import PageManage from "../PageManage";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";
import NewBigWheelPrizeAward from "./NewBigWheelPrizeAward";



const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBigWheelPrize extends cc.Component {
    @property(cc.Sprite)
    adwardImg: cc.Sprite = null
    @property(cc.Node)
    progressBar: cc.Node = null
    @property(cc.Label)
    lable_suiBian: cc.Label = null
    @property(cc.Node)
    feedNode: cc.Node = null
    @property(cc.Node)
    hwProgress: cc.Node = null
    @property(cc.RichText)
    label_prizeTitle: cc.RichText = null
    @property(cc.RichText)
    lable_title: cc.RichText = null
    @property(cc.Node)
    btnSuiPian: cc.Node = null
    @property(cc.Node)
    btnGold: cc.Node = null
    @property(cc.RichText)
    lable_btnGold: cc.RichText = null
    @property(cc.Label)
    lable_goldNum: cc.Label = null
    @property(cc.RichText)
    phoneTip: cc.RichText = null
    @property(cc.Node)
    layout: cc.Node = null
    @property(cc.Node)
    sorryNode: cc.Node = null

    openAdTimer: any;
    type: any;
    doubleData: any;
    dialoadBaseProp: { awad_dialog: string; awad_double_dialog: string; };
    canGetDouble: any;
    maiDianStr: any;

    @property(NewBigWheelPrizeAward)
    newBigWheelPrizeAward: NewBigWheelPrizeAward = null

    start() {

    }

    onLoad() {

    }
    onEnable() {
        AdController.loadInfoAd(AdPosition.WheelDialogFeed, 636, this.feedNode)
        if (this.checkIsOpenInserAd()) {
            AdController.loadAd(AdPosition.InsertBigWheel, () => {

            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            })
            // this.openAdTimer && clearTimeout(this.openAdTimer)
            // this.openAdTimer = setTimeout(() => {
            //     this.openAdTimer = null;

            // }, 1000);
        }
    }

    onDisable() {
        AdController.hideInfoAd(AdPosition.WheelDialogFeed)
        cc.director.emit("moveChouPos");

        if (this.openAdTimer != null) {
            clearTimeout(this.openAdTimer);
            this.openAdTimer = null;
        }
    }
    checkIsOpenInserAd() {
        let random = Math.random()
        console.log("是否播放插屏", random, util.userData.newUser)
        return random <= 0.4 && !util.userData.newUser
    }
    barUpdate(data, type, maiDianStr, doubleData) {
        let self = this;
        self.type = type;

        // self.btnSuiPian.active = false;
        self.btnGold.active = false;
        self.layout.active = false;
        self.sorryNode.active = false;

        if (type == 4 || type == 5) {
            self.layout.active = true;
            self.hwProgress.active = true;
            let width = data.currentPhoneFragments / data.phoneFragmentsExchangeTotal * this.progressBar.parent.width;
            if (width > 0 && width < 20) {
                width = 20;
            }
            cc.tween(this.progressBar)
                .to(.2, { width: width })
                .start();

            this.lable_suiBian.string = data.currentPhoneFragments + '/' + data.phoneFragmentsExchangeTotal;
            self.lable_title.string = `<color=#ffffff><outline color=#D25400 width=4>获得碎片</outline></color>`;
            self.btnSuiPian.active = true;

            if (doubleData && doubleData.rewardValue) {
                self.phoneTip.string = `<color=#D25400 >恭喜获得<color=#FF3E2A>${doubleData.rewardValue}</color>手机碎片</color>`;
                self.label_prizeTitle.string = `<color=#ffffff><outline color=#4F7A00 width=4>继续抽奖</outline></color>`;
            }
            else if (doubleData && doubleData.rewardPhoneFragments) {
                self.phoneTip.string = `<color=#D25400 >恭喜获得<color=#FF3E2A>${doubleData.rewardPhoneFragments}</color>手机碎片</color>`;
                self.label_prizeTitle.string = `<color=#ffffff><outline color=#4F7A00 width=4>去抽奖</outline></color>`;
            }

            self.phoneTip.node.active = true;
        }
        else if (type == 2) {
            // self.layout.active = true;
            // self.phoneTip.node.active = false;
            // self.hwProgress.active = false;
            self.lable_title.string = `<color=#ffffff><outline color=#D25400 width=4>获得金币</outline></color>`;
            self.btnGold.active = true;

            if (doubleData) {
                this.doubleData = doubleData;
                this.lable_btnGold.string = `<outline color=#4F7A00 width=3><color=#ffffff>${this.doubleData.doubleValue}倍再领取</color><color=#FFFC00>${this.doubleData.doubleValue * this.doubleData.rewardValue}<color></outline>`
                this.lable_goldNum.string = `+${this.doubleData.rewardValue}`;
            }
        }
        else {
            self.lable_title.string = `<color=#ffffff><outline color=#D25400 width=4>谢谢参与</outline></color>`;
            self.sorryNode.active = true;
        }

        this.dialoadBaseProp = {
            awad_dialog: maiDianStr + '奖励弹窗',
            awad_double_dialog: this.canGetDouble ? `${maiDianStr}奖励翻倍弹窗` : ''
        };
        TrackMgr.LuckDrawProductDialog(this.dialoadBaseProp)
        // XMSDK.track({
        //     eventName: SAConst.wheel.LuckDrawProductDialog,
        //     props: this.dialoadBaseProp,
        // });

        this.maiDianStr = maiDianStr;
    }

    clickDouble() {
        AdController.loadAd(AdPosition.WheelDouble, () => {
            XMSDK.getdataStr({
                url: UrlConst.newBigWheel_actionDouble,
                data: {
                    doubleId: this.doubleData.doubleId,
                },
                onSuccess: res => {
                    if (res.code === 0) {
                        this.openAward();
                        this.closePage();

                    } else {

                    }
                },
                onFail: err => {

                }
            })
        }, () => {
            AssistCtr.showToastTip("加载视频失败，请稍后！");
        })
    }

    openAward() {
        let count = this.doubleData.doubleValue * this.doubleData.rewardValue
        let spriteFrame = null
        if (this.type == 2) {
            spriteFrame = RewardController.instance.findPointBigSprite(1)
            // util.addTermCoin(count);
            // util.addTermCoin(this.doubleData.rewardValue);
            count +=this.doubleData.rewardValue;
            cc.game.emit(NameTs.Game_Effect_coin, { value: count});
        } else if (this.type == 4) {
            spriteFrame = RewardController.instance.findPhoneSprite(1)
        } else if (this.type == 5) {
            spriteFrame = RewardController.instance.findPointBigSprite(1)
            // util.addTermCoin(this.doubleData.rewardValue);
            count +=this.doubleData.rewardValue;
            cc.game.emit(NameTs.Game_Effect_coin, { value: count});
        }
        this.newBigWheelPrizeAward.startAni(spriteFrame, count)
        // PageManage.singleton.showPage(pageTs.pageName.NewBigWheelPrizeAward)
        // let prefab = PageManage.singleton.findPage(pageTs.pageName.NewBigWheelPrizeAward)
        // if (prefab && prefab.getComponent(pageTs.pageName.NewBigWheelPrizeAward)) {
        //     prefab.getComponent(pageTs.pageName.NewBigWheelPrizeAward).startAni(this.doubleData.doubleValue * this.doubleData.rewardValue);
        // }
    }

    clickChou() {
        let self = this;
        cc.director.emit("NewBigWheelPrize_againChou", { isCheckKing: true });
        TrackMgr.LuckDrawDialogClick(Object.assign({}, this.dialoadBaseProp, { ck_module: `去抽奖` }))
        // XMSDK.track({
        //     eventName: SAConst.wheel.LuckDrawDialogClick,
        //     props: Object.assign({}, this.dialoadBaseProp, { ck_module: `去抽奖` })
        // });

        this.closePage();
    }

    clickClose() {
        // XMSDK.track({
        //     eventName: SAConst.wheel.LuckDrawDialogClick,
        //     props: Object.assign({}, this.dialoadBaseProp, { ck_module: `关闭` })
        // });
        TrackMgr.LuckDrawDialogClick(Object.assign({}, this.dialoadBaseProp, { ck_module: `关闭` }))
        AdController.hideInfoAd(AdPosition.WheelDialogFeed)
        this.closePage();
    }
    closePage() {
        this.node.active = false
    }
}
