import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { t } from "../Language/LanguageData";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameUpgrade extends baseTs {



    @property({ type: cc.Sprite, displayName: "炮塔身" })
    private turretBody: cc.Sprite = null;

    @property({ type: cc.Sprite, displayName: "炮塔脚" })
    private turretFoot: cc.Sprite = null;





    @property({ type: [cc.Node], displayName: "按钮" })
    private arrBtn: cc.Node[] = [];




    /**原始数量 */
    private num: number = 5;

    private initData: any;

    onLoad() {

    }

    start() {
    }

    /**初始化 */
    init(data) {
        this.initData = util.GetTurretData(util.userData.turretLevel);
        // if (this.initData.level == 2) {
        //     if (util.checkTestB(NameTs.lock_turret_test)) {
        //         this.coin = 2800;
        //     } else {
        //         this.coin = util.GetBehaviorRewardVo(1);
        //     }
        //     this.turretNumLabel.string = "+" + this.coin + "红包币";
        // } else {
        //     this.turretNumLabel.string = "+" + this.num + "炮塔";
        // }



        // 存合成次数和时间
        util.setStorage(util.localDiary.unlocking_time, util.userData.unlocking_time);

        this.loadSprite("body", (res) => {
            this.turretBody && (this.turretBody.spriteFrame = res);
        })

        this.loadSprite("foot", (res) => {
            if (this.turretFoot && res) {
                this.turretFoot.node.active = true;
                this.turretFoot.spriteFrame = res
            } else {
                this.turretFoot.node.active = false;
            }
            if (Number(this.initData.spriteFootY) > 0) {
                this.turretFoot && (this.turretFoot.node.y = Number(this.initData.spriteFootY));
            }
        })

        cc.game.emit(NameTs.Game_Buy_update);

        this.arrBtn[0].active = util.userData.noviceGuide == 2;
        this.arrBtn[1].active = this.arrBtn[2].active = util.userData.noviceGuide !== 2;
    }

    /**
     * 获取
     */
    getBtn(e, res) {
        soundController.singleton.clickAudio();
        if (util.userData.noviceGuide == 2) {
            util.addCoin(0);
            this.closePage();
            return;
        }

        let successFn = () => {
            let num: number = this.num * (res == 1 ? 2 : 1);
            cc.game.emit(NameTs.Game_Effect_turret, { node: this.node, num });
            util.productTurret(num);
            this.closePage();

        }

        if (res == 1) {
            successFn();
        } else {
            successFn();
        }
    }

    /**
      * 加载图片
      */
    loadSprite(name: string, call: Function) {
        cc.resources.load(this.initData[name], cc.SpriteFrame, (err, res: cc.SpriteFrame) => {
            if (err) {
                console.error("找不到该图片", err);
            }
            call(res);
        });
    }



}
