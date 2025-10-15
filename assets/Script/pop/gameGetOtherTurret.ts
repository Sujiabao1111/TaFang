import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { updateType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { t } from "../Language/LanguageData";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import { AdManager } from "../tg/AdManager";
import TrackMgr from "../TrackMgr/TrackMgr";
import { Tools } from "../util/Tools";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameGetOtherTurret extends baseTs {

    @property({ type: cc.Label, displayName: "数量" })
    private numLabel: cc.Label = null;

    // @property({type:cc.Node,displayName:"光"})
    // private light:cc.Node = null;

    @property({ type: cc.Sprite, displayName: "炮塔身" })
    private turretBody: cc.Sprite = null;

    @property({ type: cc.Sprite, displayName: "炮塔脚" })
    private turretFoot: cc.Sprite = null;

    @property({ type: cc.Node, displayName: "倍数" })
    private multipleNode: cc.Node = null;

    @property({ type: cc.Label, displayName: "倍数金币" })
    private lable_addGold2: cc.Label = null;

    @property({ type: [cc.Node], displayName: "按钮" })
    private ArrBtn: cc.Node[] = [];


    /**金币 */
    private num: number = 0;

    private initData: any;

    private isVideo: boolean = false;

    onLoad() {

    }

    start() {

        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
        ).start();
    }

    /**初始化 */
    init(data) {

        this.initData = util.GetTurretData(data);

        // this.num = Tools.GetRandom(3,8);
        this.num = 2;

        this.numLabel.string = "+" + this.num + t("main.炮塔");

        this.lable_addGold2.string = this.num * 3 + "";

        this.loadSprite("body", (res) => {
            this.turretBody && (this.turretBody.spriteFrame = res);
        });

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
        });

        this.ArrBtn[0].active = this.ArrBtn[1].active = true;
        this.ArrBtn[2].active = false;
        this.isVideo = false;
    }


    /**
     * 获取
     */
    getBtn(e, res) {
        soundController.singleton.clickAudio();
        this.isVideo = res == 1;//是否看视频
        let num: number = this.num * (this.isVideo ? 3 : 1);

        let successFn = () => {
            this.closePage();
            util.userData.airborneCount -= 1;
            util.productTurret(num);
            cc.game.emit(NameTs.Game_Effect_turret, { node: this.node, num });
            AssistCtr.showToastTip(t('main.Got_turrets', num));

        }

        if (res == 1) {
            AdManager.showVideoAd(() => {
                successFn();
            }, () => {

            });
        } else {
            successFn();
        }

    }




    /**看完视频 */
    videoShow() {
        this.numLabel.string = "+" + this.num * (this.isVideo ? 3 : 1);
        this.ArrBtn[0].active = this.ArrBtn[1].active = false;
        this.ArrBtn[2].active = true;
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
