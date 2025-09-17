
import baseTs from "../base/baseTs";
import { gameNumerical, propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import { t } from "../Language/LanguageData";
import { UrlConst } from "../server/UrlConst";
import soundController from "../soundController";
import { Tools } from "../util/Tools";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gamePassReward extends baseTs {

    @property({ type: cc.Label, displayName: "金币" })
    private rewardLabel1: cc.Label = null;


    @property({ type: cc.Label, displayName: "翻倍金币" })
    private rewardLabel2: cc.Label = null;



    @property({ type: cc.Node, displayName: "倍数" })
    private multipleNode: cc.Node = null;

    private coin: any;


    onLoad() {
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        ).start();

    }


    /**
     * 
     */
    init() {
        //获取用户行为4
        this.coin = Tools.GetArrData("type", 4, util.behaviorRewardVoList).reward || 150;

        this.rewardLabel1.string = "+" + this.coin;

        this.rewardLabel2.string = this.coin * 10 + "";

        util.getdataStr({
            url: UrlConst.gameLevelIndex,
            success: (data) => {
                if (!this.isValid) {
                    return;
                }
                console.log("设置一次----------------------------------------------------------" + JSON.stringify(data.mapConfig))
                // util.behaviorRewardVoList = data.behaviorRewardVoList
                util.getnowmapdata();
                util.mapConfig = data.mapConfig;

            }
        })

    }


    /**
     * 获取
     */
    getBtn(str, e) {

        let isVideo: boolean = e == 1;
        soundController.singleton.clickAudio();

        let successFn: Function = () => {

            let coin: number = this.coin * (isVideo ? 10 : 1);

            cc.game.emit(NameTs.Game_Effect_coin, { node: this.node, value: coin, num: 10 });

            util.addTermCoin(coin);

            this.closeBtn();
            cc.game.emit(NameTs.Game_Start);
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
