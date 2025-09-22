import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import UserData from "../data/userData";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import { Tools } from "../util/Tools";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class turretBuy extends baseTs {

    @property(cc.Node)
    touchNode: cc.Node = null; //用于拖动位置的

    @property(cc.Node)
    buyBtnNode: cc.Node = null; //购买按钮

    @property({ displayName: "等级", type: cc.Label })
    levelLabel: cc.Label = null;


    @property({ displayName: "视频炮塔", type: cc.Label })
    videoNum: cc.Label = null;

    @property({ type: sp.Skeleton, displayName: "炮" })
    paoBody: sp.Skeleton = null;

    //接触时间
    private touchTime: number = 0;
    //是否在接触
    private isTouch: boolean = false;

    private level: number = null;

    private turretData: any;

    private turretNum: number = 0;



    public get _userData(): UserData {
        return util.userData;
    }

    onLoad() {

        this.setVideoNum();

        let initPos: cc.Vec2 = this.node.getPosition();
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.touchTime = 0;
            this.isTouch = true;
            cc.tween(this.buyBtnNode).to(.1, { scale: 1.1 }).start();
            cc.tween(this.node).to(.1, { scale: 1.1 }).start();
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (this._userData.noviceGuide == 1 || this._userData.product == 0) return;
            let movePos: cc.Vec2 = event.getDelta();
            this.node.x += movePos.x;
            this.node.y += movePos.y;

        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            soundController.singleton.clickAudio();
            if (this._userData.noviceGuide == 2) {
                cc.game.emit(NameTs.Game_Turret_Creator);
                cc.game.emit(NameTs.Game_Novice_Open, 3);
                return;
            }
            if (this._userData.product == 5 && Math.random() < 0.5 && this._userData.airborneCount > 0) {
                this.showPage(pageTs.pageName.GameGetOtherTurret, this.level);
                return;
            } else {
                // console.log("不出现天降炮塔!")
            }

            if (this._userData.product == 1) {
                this.setVideoNum();
            }

            if (this._userData.product == 0 && this._userData.GetTurretNum > 0) {
                this.showPage(pageTs.pageName.GameGetVideoTurret, { num: this.turretNum });
                return;
            }
            if (this.touchTime < 0.3) {
                cc.game.emit(NameTs.Game_Turret_Creator, { level: this.level });
            } else {
                let poolBox: cc.Node = this.touchNode;
                let pos: cc.Vec2 = this.node.getParent().convertToWorldSpaceAR(this.node.getPosition());
                pos = poolBox.convertToNodeSpaceAR(pos);
                util.checkTouchPool(pos, (num) => {
                    if (num !== 100 && num && util.checkNoExist(num)) {
                        cc.game.emit(NameTs.Game_Turret_Creator, { level: this.level, location: num });
                    }
                });

            }
            soundController.singleton.clickAudio();
            this.node.setPosition(initPos);
            cc.tween(this.buyBtnNode).to(.1, { scale: 1 }).start();
            cc.tween(this.node).to(.1, { scale: 1 }).start();

        }, this);

        cc.game.on(NameTs.Game_Buy_update, () => {
            this.setLevel();
        }, this);

        this.setLevel();
    }

    start() {

    }


    /**
     * 更新炮塔
     */
    setLevel() {

        this.level = util.getBuyRandomLevel();
        this.levelLabel.string = String(this.level);

        //炮塔属性
        this.turretData = util.GetTurretData(this.level);

        // this.loadSprite("body",res=>{
        //     this.paoBody.spriteFrame = res;
        // });
        // this.loadSprite("foot",res=>{
        //     this.paoFoot.spriteFrame = res;
        // });


        this.loadSpine(this.paoBody, "pao");

    }

    update(dt) {

        if (this.isTouch) {
            this.touchTime += dt;
        }

    }

    /**
     * 设置视频炮塔数量
     */
    setVideoNum() {
        this.turretNum = Tools.GetRandom(8, 12);
        this.videoNum.string = "+" + this.turretNum;
    }


    /**
     * 加载图片
     */
    loadSpine(spine: sp.Skeleton, name: string) {
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + this.turretData.spineName, sp.SkeletonData, (error, sp: sp.SkeletonData) => {
            spine.skeletonData = sp;
            this.paoBody.node.y = Number(this.turretData.buyY);
        });

    }
}
