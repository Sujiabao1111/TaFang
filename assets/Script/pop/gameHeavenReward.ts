import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gameNumerical } from "../common/faceTs";
import NameTs from "../common/NameTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameHeavenReward extends baseTs {

    @property({ type: cc.Label, displayName: "文字" })
    private rewardLabel: cc.Label = null;

    @property({ type: cc.Node, displayName: "倍数" })
    private multipleNode: cc.Node = null;


    @property({ type: cc.Label, displayName: "倍数金币" })
    private lable_addGold2: cc.Label = null;

    @property({ type: cc.Node, displayName: "放弃领取" })
    private closeBtnNode: cc.Node = null;




    @property({ type: cc.Node, displayName: "直接领取B" })
    private get_node: cc.Node = null;

    @property({ type: cc.Node, displayName: "直接领取A" })
    private get_node2: cc.Node = null;

    //多少个金币
    private coin: number = null;
    //剩余次数
    private heavenNum: number = null;
    //是否需要看视频 
    private isVideo: boolean = false;
    //
    private initData: any;

    private item: cc.Node;
    private no: number;

    private isClickGet = false;    //是否点击了领取

    private heavenItem: cc.Node;

    onLoad() {

        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();

        this.scheduleOnce(() => {
            if (util.checkTestB(NameTs.heaven_coin_test)) {
                this.closeBtnNode.active = true;
            } else {
                this.get_node2.active = true;
            }
        }, gameNumerical.closeTime);


        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        ).start();
    }


    /**
     * 
     * @param data 数据
     */
    init(data) {
        if (data && data.data) {
            this.initData = data.data;
            this.coin = this.initData.point;
            this.rewardLabel.string = "+" + this.coin;

            this.lable_addGold2.string = this.coin * 10 + "";

            this.heavenItem = data.item || this.node;

            this.isVideo = data.isVideo ? true : false;
            this.get_node.active = !this.isVideo;
            this.closeBtnNode.getParent().active = this.isVideo;

        }

        this.item = data.item;
        this.no = data.no;
        util.heavenTouch = false;

    }



    /**
     * 获取
     */
    getBtn(e, res) {
        if (this.isClickGet) {
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(() => {
            this.isClickGet = false;
        }, 2);


        let num: number = Number(res);

        soundController.singleton.clickAudio();

        let coin: number = this.coin * (num == 1 ? 10 : 1);

        let successFn = () => {
            cc.game.emit(NameTs.Game_Effect_coin, { node: this.heavenItem, value: coin, num: 10 });
            util.addTermCoin(coin);
            this.closePage();
            util.heavenClickNum++;
            util.saveHeavenPool(this.no, null);
            cc.game.emit(NameTs.Game_Heaven_killed, this.item);
        }

        successFn();
    }

    /**
     * 关闭
     */
    closeBtn() {
        soundController.singleton.clickAudio();
        this.closePage();
    }

}
