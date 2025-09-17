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
    private time: number = 120;

    //金币
    private coin: number = 0;

    //剩余次数
    private treasureNum: number = 20;

    //自动关闭宝箱计时器
    private _autoCloseTimer = null;

    public get _userData(): UserData {
        return util.userData;
    }

    onLoad() {

        cc.game.on(NameTs.Game_Treasure_StartTime, () => {
            this.treasureNum -= 1;
            this.treasure.active = false;
            this.time = 120;
        }, this);

        util.getdataStr({
            url: UrlConst.treasureBox_residual,
            success: res => {
                if (!this.isValid) {
                    return;
                }
                this.treasureNum = res.times;
                if (this._userData.noviceGuide == -1) {
                    this.time = 120;
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
        if (!this.treasure.active) {
            if (this.time == null || this.treasureNum <= 0) {
                return;
            }
            this.time -= dt;
            if (this.time <= 0) {
                this.time = null;
                this.flyAni();
                this._autoCloseTimer = 60;
            }

        }

        // 自动关闭宝箱逻辑
        if (this.treasure.active && this._autoCloseTimer != null) {
            this._autoCloseTimer -= dt;
            if (this._autoCloseTimer <= 0) {
                console.log("漂浮宝箱关闭")
                this.treasure.active = false;
                this._autoCloseTimer = null;
                this.time = 120; // 重置时间
            }
        }
    }
}
