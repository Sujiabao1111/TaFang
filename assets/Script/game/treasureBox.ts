import baseTs from "../base/baseTs";
import jsonSingleton from "../base/jsonSingleton";
import { gameState } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import UserData from "../data/userData";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class treasureBox extends baseTs {

    @property({ type: cc.Node, displayName: "宝箱" })
    private treasure: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    //当前宝箱id
    private nowId: number = null;

    //宝箱时间
    private time: number = null;

    //金币
    private coin: number = 0;

    //剩余次数
    private treasureNum: number = 20;

    public get _userData(): UserData {
        return util.userData;
    }

    onLoad() {

        cc.game.on(NameTs.Game_Treasure_StartTime, () => {
            this.treasureNum -= 1;
            this.treasure.active = false;
            this.time = 180;
        }, this);

        util.getdataStr({
            url: UrlConst.treasureBox_residual,
            success: res => {
                if (!this.isValid) {
                    return;
                }
                this.treasureNum = res.times;
                if (this._userData.noviceGuide == -1) {
                    this.time = 0;
                }
            }
        });

        cc.game.on(NameTs.Game_Treasure_Show, () => {
            this.time = 0;
        }, this);

    }

    start() {

    }

    /**
     * 起飞
     */
    flyAni() {

        console.log("漂浮宝箱出现")
        this.treasure.active = true;


    }


    /**点击宝箱 */
    clickBtn() {
        soundController.singleton.clickAudio();
        this.showPage(pageTs.pageName.GameTreasure);
    }


    update(dt) {
        // if (this.time == null || this.treasureNum <= 0) return;
        // this.time -= dt;
        // if (this.time <= 0) {
        //     this.time = null;
        //     this.flyAni();
        // }
    }
}
