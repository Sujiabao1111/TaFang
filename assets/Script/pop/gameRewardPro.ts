import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gameNumerical } from "../common/faceTs";
import NameTs from "../common/NameTs";
import turret from "../game/turret/turret";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

/**
  * 排行榜条目数据
  */
interface rewardData {
    /** 分数 */
    score: number;
    /** 是否加倍 */
    isDouble: boolean;
    item: Node;
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class gameRewardPro extends baseTs {

    @property(cc.Label)
    private doubleLable: cc.Label = null;

    @property(cc.Label)
    private lable_goldNum: cc.Label = null;
    @property(cc.Node)
    private doubleGetBtn: cc.Node = null;
    @property(cc.Node)
    private getBtn: cc.Node = null;
    @property(cc.Node)
    private btn_closeNode: cc.Node = null;

    @property({ type: cc.Node, displayName: "倍数" })
    private multipleNode: cc.Node = null;

    private redAmountNum = 500;

    private coinItem: cc.Node = null;

    start() {
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        ).start();
    }



    //  data: {
    //     coin: number,
    //     isDouble: boolean,
    //     isVideo: boolean
    //     item: cc.Node
    // }
    init(data) {
        this.redAmountNum = data.coin;
        this.lable_goldNum.string = "+" + this.redAmountNum;

        this.doubleGetBtn.active = data.isDouble;
        this.getBtn.active = !data.isDouble;
        if (data.isDouble) {
            this.doubleLable.string = this.redAmountNum * 3 + "";
            this.scheduleOnce(() => {
                this.btn_closeNode.active = true;
            }, gameNumerical.closeTime);
        }

        this.coinItem = data.item || this.node;

    }

    clickDoubleGet(e, src) {
        soundController.singleton.clickAudio();
        let isVideo: boolean = src == 1 ? true : false;

        let successFn = () => {
            let coin: number = this.redAmountNum * (isVideo ? 3 : 1);
            util.getdataStr({
                url: UrlConst.earnProgressReceive,
                success: res => {
                    cc.game.emit(NameTs.Game_Effect_coin, { node: this.coinItem, value: coin, num: 10 });
                    if (isVideo) {
                        util.addTermCoin(this.redAmountNum * 2);
                    }
                    this.closePage();
                },
                fail: res => {
                    this.closePage();
                }
            })
        }
        successFn();
    }

    clickGet(e, src) {
        soundController.singleton.clickAudio();
        let successFn = () => {
            util.getdataStr({
                url: UrlConst.earnProgressReceive,
                success: res => {
                    cc.game.emit(NameTs.Game_Effect_coin, { node: this.coinItem, value: this.redAmountNum, num: 10 });
                    this.closePage();
                },
                fail: res => {
                    this.closePage();
                }
            })
        }

        successFn();

    }



}
