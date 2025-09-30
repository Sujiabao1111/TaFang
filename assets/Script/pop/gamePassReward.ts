
import { log } from "console";
import baseTs from "../base/baseTs";
import { gameNumerical, propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import { t } from "../Language/LanguageData";
import { UrlConst } from "../server/UrlConst";
import soundController from "../soundController";
import { ApiService } from "../tg/ApiService";
import { Global } from "../tg/Global";
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




    onLoad() {
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        ).start();

    }


    /**
     * 
     */
    init() {
        this.rewardLabel1.string = "+" + Global.ins.curPassStageGold;
        this.rewardLabel2.string = Global.ins.curPassStageGold * 2 + "";
    }


    /**
     * 获取
     */
    async getBtn(str, e) {
        let isVideo: boolean = e == 1;
        soundController.singleton.clickAudio();
        if (isVideo) {
            let res = await ApiService.ins.getDoubleReward(Global.ins.curPassStageGold, "passstage");
            if (res.response.success) {
                console.log("双倍金币领取成功", res.response.data.prize);
                cc.game.emit(NameTs.Game_Effect_coin, { node: this.node, value: res.response.data.prize * 2, num: 5 });
                this.closeBtn();
                cc.game.emit(NameTs.Game_Start);
            }
        } else {
            cc.game.emit(NameTs.Game_Effect_coin, { node: this.node, value: Global.ins.curPassStageGold, num: 5 });
            this.closeBtn();
            cc.game.emit(NameTs.Game_Start);
        }
    }

    /**
     * 关闭
     */
    closeBtn() {
        soundController.singleton.clickAudio();
        this.closePage();
    }

}
