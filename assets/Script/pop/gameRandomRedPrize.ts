
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import { ISDOUBLE, REWARD_KEY, REWARD_TYPE, RewardNodeType } from "../common/PropConst";
import soundController from "../soundController";
import { AdManager } from "../tg/AdManager";
import { ApiService } from "../tg/ApiService";
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

    start() {
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        ).start();

    }

    private _type = ""
    init(type) {

        this._type = type;
        this.redAmountNum = Tools.GetRandom(5000, 8000);
        if (this._type == RewardNodeType.Box) {
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
        let key = 0
        let coinItem = null;
        if (this._type == RewardNodeType.Fudai) {
            key = REWARD_KEY.zaixian
            coinItem = util.GlobalMap.get("RandomRed") || this.node;
        } else if (this._type == RewardNodeType.Kills) {
            key = REWARD_KEY.kills
            coinItem = util.GlobalMap.get("KillsNode") || this.node;
        } else if (this._type == RewardNodeType.Box) {
            key = REWARD_KEY.box
            coinItem = this.node;
        }
        let tempfun = () => {
            this.closePage();
            cc.game.emit(NameTs.Game_Task_updata);

            if (this._type == RewardNodeType.Kills) {
                cc.game.emit(NameTs.Game_Kills_Updata, false);
            } else if (this._type == RewardNodeType.Fudai) {
                cc.game.emit(NameTs.randomRedUpdate);
            }
        }

        let prize = 0
        if (isVideo) {
            AdManager.showVideoAd(async () => {
                let res = await ApiService.ins.getReward(key, REWARD_TYPE.gold, this.redAmountNum, ISDOUBLE.yes);
                if (res.response.success) {
                    cc.game.emit(NameTs.Game_Effect_coin, { node: coinItem, value: this.redAmountNum * 2, num: 5 });
                    tempfun();
                }
            }, () => {
            });
        } else {
            let res = await ApiService.ins.getReward(key, REWARD_TYPE.gold, this.redAmountNum, ISDOUBLE.no);
            if (res.response.success) {
                console.log("福袋领取成功");
                cc.game.emit(NameTs.Game_Effect_coin, { node: coinItem, value: this.redAmountNum, num: 5 });
                tempfun();
            }
        }

    }

}
