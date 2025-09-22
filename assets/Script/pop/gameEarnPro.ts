import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import turret from "../game/turret/turret";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class gameEarnPro extends baseTs {

    @property(cc.Label)
    lable_redAddNum: cc.Label = null;

    @property(cc.Label)
    lable_goldNum: cc.Label = null;


    @property({ type: cc.Node, displayName: "倍数" })
    private multipleNode: cc.Node = null;

    private redAmountNum = 500;

    private coinItem: cc.Node = null;

    start() {
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        ).start();
    }


    onDisable() {
    }

    init(data) {

        this.redAmountNum = data.coin;
        this.lable_goldNum.string = "+" + this.redAmountNum;
        this.lable_redAddNum.string = this.redAmountNum * 3 + "";

        this.coinItem = util.GlobalMap.get("earnProgress") || this.node;

    }

    clickGet(e, src) {
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
                    // AssistCtr.showToastTip("网络出错~");
                    this.closePage();
                }
            })
        }

        successFn();

    }



}
