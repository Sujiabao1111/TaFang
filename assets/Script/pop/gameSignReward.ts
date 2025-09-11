import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gameNumerical } from "../common/faceTs";
import NameTs from "../common/NameTs";
import { t } from "../Language/LanguageData";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";
import gameSign, { signItemData, signRewardData } from "./gameSign";

export const SignDayRedpack = [0, 0, 1, 0, 0, 0, 1]
const { ccclass, property } = cc._decorator;

@ccclass
export default class PannelReward extends baseTs {
    @property(cc.Node)
    viewport: cc.Node = null;

    @property(cc.Node)
    passView: cc.Node = null;

    @property(cc.Node)
    doubleGoldNode: cc.Node = null;

    @property(cc.Label)
    lable_redAddNum: cc.Label = null;

    @property(cc.Label)
    lable_changNum: cc.Label = null;

    @property(cc.Label)
    lable_rewardListTipGold: cc.Label = null;

    @property(cc.Node)
    feed_node: cc.Node = null;

    @property(cc.Node)
    doubleBtnNode: cc.Node = null;

    @property(cc.Node)
    closeBtnNode: cc.Node = null;

    @property(cc.Node)
    getBtnNode: cc.Node = null;


    //---------------过度页------------------------
    @property(cc.Sprite)
    img_prize: cc.Sprite = null;

    @property(cc.Label)
    lable_prize: cc.Label = null;

    @property(cc.SpriteFrame)
    img_goldIcon: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    img_redIcon: cc.SpriteFrame = null;
    @property({ type: cc.Node, displayName: "倍数" })
    private multipleNode: cc.Node = null;

    @property({ type: cc.Label, displayName: "倍数金币" })
    private lable_addGold2: cc.Label = null;


    data = null;
    gaintype = null;
    rewardList: Array<signRewardData> = null;
    rewardNodeList = null;


    tempNode = null;
    isRedpack = null;
    addGold = null;
    /**签到天数 */
    signDays: number = 1;

    /**是否改变了 */
    isChange: boolean = false;

    onEnable() {
        // UIFunc.openUI(ActivityPannelName.PannelTempNode, (node, script) => {
        //     this.tempNode = node;
        // })        


        this.scheduleOnce(() => {

            this.closeBtnNode.active = true;

        }, gameNumerical.closeTime);
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        ).start();
    }

    onDisable() {
     

        if (this.data && this.data[`callBack`]) {
            this.data[`callBack`]();
        }

        util.isOkSign = true;
    }

    init(signAwardData) {
        this.isChange = false;
        let data = signAwardData.list;
        let index = signAwardData.currentDay;
        let gaintype = signAwardData.type;
        this.signDays = signAwardData.signDays;
        if (gaintype == 1) {
            this.viewport.active = true;
            this.passView.active = false;
        }
        else {
            this.viewport.active = false;
            this.passView.active = true;

      

            setTimeout(() => {
                this.viewport && (this.viewport.active = true);
                this.passView && (this.passView.active = false);
            }, 10000);
        }

        this.data = signAwardData;
        this.gaintype = gaintype;
        this.viewport.opacity = 255;
        this.rewardList = data.rewardList;
        this.isRedpack = SignDayRedpack[index];
        let item = this.rewardList[0];
        let change = util.userData.exchangeRate;
        let gold = 0;

        this.doubleBtnNode.active = this.gaintype == 1;

        this.getBtnNode.active = this.gaintype == 2;

        if (item) {
            gold = this.gaintype == 1 ? item.rewardValue : this.gaintype == 2 ? item.rewardPlusValue : item.rewardPlusValue - item.rewardValue
            this.lable_redAddNum.string = "+" + gold + t('main.红包');
            this.lable_changNum.string = `红包${util.userData.coin + gold} ≈ ${((util.userData.coin + gold) / change).toFixed(2)}元`;
            this.lable_rewardListTipGold.string = `${util.userData.coin + gold} ≈ ${((util.userData.coin + gold) / change).toFixed(2)}元`;

            this.lable_addGold2.string = gold * 2 + "";
        }

        if (!this.isRedpack) {
            this.img_prize.spriteFrame = this.img_goldIcon;
            this.lable_prize.string = `+${gold}` + t('main.红包');
        }
        else {
            this.img_prize.spriteFrame = this.img_redIcon;
            this.lable_prize.string = `+${gold / util.userData.exchangeRate}元`;
        }

        this.addGold = gold;
        //GameInfo.gainGold(gold);

        if (this.gaintype == 2) {
            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "普通签到成功弹窗"
            })
        }

    }



    finishAnimation() {
        this.closePage();
    }

    startAnimation() {
        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: `签到成功弹窗`,
            ck_module: "收下"
        })

        soundController.singleton.clickAudio();
        let callback = () => {
            if (!this.isRedpack) {
                for (let m in this.rewardList) {
                    // AssistCtr.findPropSprite(this.rewardList[m].type, this.rewardList[m].keyId, (spriteFrame) => {
                    //     if (this.rewardNodeList[m]) {
                    //         let temp = this.tempNode.getComponent(PannelTempNode).getGoldNode();
                    //         AssistCtr.playAnimate(spriteFrame, this.rewardNodeList[m], temp, () => {
                    //             this.finishAnimation();
                    //         });
                    //     }

                    // }, () => {
                    //     cc.error("加载图片失败", this.rewardList[m].type, this.rewardList[m].keyId);
                    //     this.quit();
                    // })
                    //cc.game.emit(NameTs.Game_Effect_coin,{node:this.rewardNodeList[m], value:res.coin});
                }
                cc.game.emit(NameTs.Game_Effect_coin, { node: this.doubleGoldNode, value: this.addGold });
                this.finishAnimation();
            }
            else {
                cc.game.emit(NameTs.Game_Effect_coin, { node: this.doubleGoldNode, value: this.addGold });
                this.finishAnimation();

                // let temp = this.tempNode.getComponent(PannelTempNode).getGoldNode();
                // AssistCtr.playAnimate(this.doubleGoldNode.getComponent(cc.Sprite).spriteFrame, this.doubleGoldNode, temp, () => {
                //     this.finishAnimation();
                // });
            }
        }
        this.viewport.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(callback)))
    }


    /**双倍收下 */
    doubleBtn(e, res) {
        soundController.singleton.clickAudio();




        let num = Number(res);

        if (this.gaintype == 2 || this.isChange) {
            num = 1;
        }

        let url: string = num ? UrlConst.sign_videoGet : UrlConst.sign_commonGet;

        let day: string = `第${this.signDays}天`;

        let coin: number = num ? this.rewardList[0].rewardPlusValue : this.rewardList[0].rewardValue;

        let successFn = () => {

            XMSDK.getdataStr({
                url,
                onSuccess: res => {
                    if (res.code === 0) {
                        this.closePage();

                        cc.game.emit(NameTs.Game_Effect_coin, { node: this.doubleGoldNode, value: coin, num: 10 });
                    }
                    else {
                        TrackMgr.Signin_new({
                            get_state: false,
                            get_type: this.isChange || this.gaintype == 2 ? "双倍领取" : "单倍直接领取",
                            get_days: day,
                        })
                    }
                },
                onFail: err => {

                }
            })
            this.closePage();

     
        }

        if (num == 1 && this.gaintype == 1 && !this.isChange) {
            this.viewport && (this.viewport.active = false);
            this.passView && (this.passView.active = true);

            this.lable_prize.string = "+" + coin + t('main.红包');
            // AdController.loadAd(AdPosition.VideoSignDouble, (res) => {
                // successFn();
             
                console.log("看视频")
                this.doubleBtnNode && (this.doubleBtnNode.active = false);
                this.getBtnNode && (this.getBtnNode.active = true);
                this.lable_redAddNum.string = "+" + coin + t('main.红包');
                // this.gaintype = 2;
                this.isChange = true;//636:feedNode信息流容器节点的宽度  
            // }, () => {
            //     AssistCtr.showToastTip(t("tips.reward_obtain_failed"));
            // });

            setTimeout(() => {
                this.viewport && (this.viewport.active = true);
                this.passView && (this.passView.active = false);
            }, 10000);

            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: `普通签到成功弹窗`,
                ck_module: "翻倍领取",
                active_ad_hcdg: "激励视频"
            })

        } else {
            successFn();
            let text: string = this.isChange || this.gaintype == 2 ? "双倍领取" : "单倍直接领取";
            TrackMgr.Signin_new({
                get_state: true,
                get_type: text,
                get_days: day,
            })
            console.log("不看视频")
            if (!this.isChange && this.gaintype !== 2) {
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: `普通签到成功弹窗`,
                    ck_module: "直接领取"
                })
            }
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: `签到成功弹窗`,
                ck_module: "收下"
            });
        }



    }
};
