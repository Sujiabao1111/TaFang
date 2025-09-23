import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import { RewardType } from "../common/PropConst";
import turret from "../game/turret/turret";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import { ApiService } from "../tg/ApiService";
import TrackMgr from "../TrackMgr/TrackMgr";
import { Tools } from "../util/Tools";
import util from "../util/util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class gameRandomRedPrize extends baseTs {


    @property(cc.RichText)
    private lable_prizeNum: cc.RichText = null;

    @property(cc.Node)
    private btn_closeNode: cc.Node = null;

    @property(cc.Label)
    private lable_goldNum: cc.Label = null;

    @property({ type: cc.Node, displayName: "倍数" })
    private multipleNode: cc.Node = null;

    private redAmountNum = 200;
    private power = 2;

    private coinItem: cc.Node = null;

    start() {
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        ).start();

    }

    private _type = ""
    init(type) {

        this._type = type;
        this.redAmountNum = Tools.GetRandom(5000, 8000);
        if (this._type == RewardType.Fudai) {
            this.coinItem = util.GlobalMap.get("RandomRed") || this.node;
        } else if (this._type == RewardType.Kills) {
            this.coinItem = util.GlobalMap.get("KillsNode") || this.node;
        } else if (this._type == RewardType.Box) {
            this.coinItem = this.node;
            this.redAmountNum = Tools.GetRandom(10000, 18888);
        }

        this.lable_goldNum.string = `+${this.redAmountNum}`;
        this.lable_prizeNum.string = `<outline color=#D25400 width=4><color=#FFFC00>${this.redAmountNum * this.power}</color>`
        this.btn_closeNode.active = false;
        this.scheduleOnce(() => {
            this.btn_closeNode.active = true;
        }, 2);
    }

    async clickGet(str, e) {
        soundController.singleton.clickAudio();
        let isVideo: boolean = e == 1;

        let prize = 0
        if (isVideo) {
            let res = await ApiService.ins.getDoubleReward(this.redAmountNum, "fudai");
            if (res.response.success) {
                console.log("福袋加倍领取成功", res.response.data.prize);
                prize = res.response.data.prize; cc.game.emit(NameTs.Game_Effect_coin, { node: this.node, value: res.response.data.prize, num: 5 });
            }
        } else {
            let reward_key = 1001
            let reward_type = 1
            let res = await ApiService.ins.getReward(reward_key, reward_type, this.redAmountNum);
            if (res.response.success) {
                console.log("福袋领取成功");
                prize = this.redAmountNum;
            }
        }
        cc.game.emit(NameTs.Game_Effect_coin, { node: this.coinItem, value: prize, num: 5 });
        this.closePage();
        cc.game.emit(NameTs.randomRedUpdate);
        cc.game.emit(NameTs.Game_Task_updata);

        if (this._type == RewardType.Kills) {
            cc.game.emit(NameTs.Game_Kills_Updata, false);
        }

    }




}
