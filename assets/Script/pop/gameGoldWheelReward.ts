/*
 * @Descripttion: 
 * @version: 
 * @Author: mies
 * @Date: 2021-02-24 17:41:47
 * @LastEditors: mies
 * @LastEditTime: 2021-02-26 14:50:55
 */
import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import { REWARD_TYPE } from "../common/PropConst";
import RewardController from "../controlelr/RewardController";
import { t } from "../Language/LanguageData";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import { ApiService } from "../tg/ApiService";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameGoldWheelReward extends cc.Component {

    @property({ type: cc.Label, displayName: "文字" })
    private rewardLabel: cc.Label = null;

    @property(cc.Sprite)
    private rewardSprite: cc.Sprite = null;

    //多少个金币
    private coin: number = null;

    private initData: any;
    private closeCall: any;
    private isClickGetPrize: boolean = false;

    /**
     * 
     * @param data 数据
     */
    init(data, closeCall?) {
        this.coin = data.value;
        this.closeCall = closeCall;
        this.rewardLabel.string = "+" + this.coin;
        this.rewardSprite.spriteFrame = data.type == 1 ? RewardController.instance.findPointBigSprite(2) : RewardController.instance.findPointBigSprite(1)
        this.initData = data;
        this.isClickGetPrize = true
    }

    /**
     * 关闭
     */
    closeBtn() {
        soundController.singleton.clickAudio();
        this.node.active = false;
    }

    /**
     * 获取
     */
    getBtn(e, res) {
        this.getPrize();
    }

    getPrize() {
        if (this.isClickGetPrize) {
            this.isClickGetPrize = false;
            soundController.singleton.clickAudio();
            this.startAnimation();
        }
    }

    async startAnimation() {
        this.isClickGetPrize = true;
        this.closeCall && this.closeCall();
        this.node.active = false;

        if (this.initData.type == 2) {
            let reward_key = 1001;
            // let reward_type = this.initData.type == 2 ? REWARD_TYPE.gold : REWARD_TYPE.turret;
            let res = await ApiService.ins.getReward(reward_key, REWARD_TYPE.gold, this.coin);
            if (res.response.success) {
                AssistCtr.showToastTip(t("tips.receive_success"));
                if (this.initData.type == 2) {
                    cc.game.emit(NameTs.Game_Effect_coin, { node: this.rewardSprite.node, value: this.coin, num: 10, parent: cc.director.getScene().getChildByName('Canvas') });
                }
            } else {
                AssistCtr.showToastTip(t("tips.rewardFail"));
            }
        } else {
            util.productTurret(this.coin);
            cc.game.emit(NameTs.Game_Effect_turret, { node: this.rewardSprite.node, num: 5, parent: cc.director.getScene().getChildByName('Canvas') });
        }

    }


}
