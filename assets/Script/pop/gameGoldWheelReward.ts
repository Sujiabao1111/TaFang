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
import { AdPosition } from "../common/AdPosition";
import { gameNumerical, updateType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import RewardController from "../controlelr/RewardController";
import PageManage from "../PageManage";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameGoldWheelReward extends baseTs {

    @property({ type: cc.Label, displayName: "文字" })
    private rewardLabel: cc.Label = null;

    // @property({ type: cc.Node, displayName: "光" })
    // private light: cc.Node = null;

    @property({ type: cc.Node, displayName: "放弃领取" })
    private closeBtnNode: cc.Node = null;

    @property(cc.Sprite)
    private rewardSprite: cc.Sprite = null;

    // @property({type:cc.Node,displayName:"视频icon"})
    // private videoIcon:cc.Node = null;

    @property({ type: cc.Node, displayName: "信息流" })
    private feed_node: cc.Node = null;

    //多少个金币
    private coin: number = null;
    //
    private initData: any;
    closeCall: any;
    isClickGetPrize: boolean = false;

    /**
     * 
     * @param data 数据
     */
    init(data, closeCall?) {
        this.coin = data.reward.value;
        this.closeCall = closeCall;
        this.rewardLabel.string = "+" + this.coin;
        this.rewardSprite.spriteFrame = data.reward.type == 1 ? RewardController.instance.findPointBigSprite(2) : RewardController.instance.findPointBigSprite(1)
        this.initData = data;
        this.isClickGetPrize = true
    }

    start() {

    }

    /**
     * 获取
     */
    getBtn(e, res) {
        this.getPrize();
    }

    /**
     * 关闭
     */
    closeBtn() {
        soundController.singleton.clickAudio();
        this.node.active = false;
        // this.SendPost();
    }
    getPrize() {
        let self = this;
        if (self.isClickGetPrize) {
            self.isClickGetPrize = false;

            soundController.singleton.clickAudio();

            XMSDK.getdataStr({
                url: UrlConst.goldWheel_checkIn,
                data: {
                    id: this.initData.id
                },
                onSuccess: res => {
                    if(!this.isValid){
                        return;
                    }

                    if (res.code === 0) {
                        TrackMgr.AppDialogClick_hcdg({
                            dialog_name_hcdg: "金币转盘获得奖励弹窗",
                            ck_module: "收下",
                            dialog_enter: "首页金币转盘",
                        })
                        // XMSDK.track({
                        //     eventName: SAConst.AppDialogClick,
                        //     props: {
                        //         dialog_name2: "金币转盘获得奖励弹窗",
                        //         ck_module: "收下",
                        //         dialog_enter: this.isMain ? "首页金币转盘" : "限时礼包收下跳转",
                        //     }
                        // });
                        self.startAnimation();
                        // if (self.initData.reward.type == updateType.hongbao) {
                        //     util.userData.coin += Number(self.initData.reward.value)
                        // } else if (self.initData.reward.type == updateType.product) {
                        //     util.userData.product += Number(self.initData.reward.value)
                        // }
                    }
                    else {
                        XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                        self.isClickGetPrize = true;
                    }
                },
                onFail: err => {
                    XMSDK.toast('网络出错~', 2.5, 1);
                    self.isClickGetPrize = true;
                }
            })
        }
    }
    startAnimation() {
        let self = this;
        self.isClickGetPrize = true;
        self.closeCall && self.closeCall();
        self.node.active = false;
        if (this.initData.reward.type == 2) {
            // util.addTermCoin(this.coin)
            cc.game.emit(NameTs.Game_Effect_coin, { node: this.rewardSprite.node, value: this.coin,num:10,parent:cc.director.getScene().getChildByName('Canvas')});
            AssistCtr.showToastTip("获取"+this.coin+"红包币");
        } else if (this.initData.reward.type == 1) {
            util.productTurret(this.coin);
            cc.game.emit(NameTs.Game_Effect_turret, { node: this.rewardSprite.node, num: this.coin ,parent:cc.director.getScene().getChildByName('Canvas')});
            AssistCtr.showToastTip("获得"+this.coin+"个炮塔！");
        }
    }

    onEnable() {
        AdController.loadInfoAd(AdPosition.goldWheelInfo, 636, this.feed_node);//636:feedNode信息流容器节点的宽度

        // if(util.adPreObj[AdPosition.TaskRewardView]){
        //     util.preloadAd(AdPosition.TaskRewardView,true);
        // } 
        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1, { scale: 1 }).to(1, { scale: 1.1 })
        // ).start();
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.goldWheelInfo);
        // //预加载金币信息流
        // if(!util.adPreObj[AdPosition.TaskRewardView]&&util.getHeavenPool()>0){
        //     util.preloadAd(AdPosition.TaskRewardView,true);
        // }
    }

    // update (dt) {}
}
