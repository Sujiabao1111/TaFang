import { log } from "console";
import { bulletInfo, gameState } from "../../common/faceTs";
import NameTs from "../../common/NameTs";
import pageTs from "../../common/pageTs";
import { ApiService } from "../../tg/ApiService";
import TrackMgr from "../../TrackMgr/TrackMgr";
import util from "../../util/util";
import turretFactiory from "../turretFactory";

const { ccclass, property } = cc._decorator;

@ccclass
export default class turret extends turretFactiory {


    @property(cc.Node)
    private xingLayout: cc.Node = null;

    @property({ type: sp.Skeleton, displayName: "炮" })
    private paoBody: sp.Skeleton = null;

    @property({ type: sp.Skeleton, displayName: "口" })
    private paoFoot: sp.Skeleton = null;

    @property(cc.SpriteFrame)
    private iconFrame: cc.SpriteFrame[] = [];

    // @property({type:cc.Sprite,displayName:"炮身"})
    // paoBody: cc.Sprite = null;

    // @property({type:cc.Sprite,displayName:"泡脚"})
    // paoFoot: cc.Sprite = null;

    @property(cc.Node)
    pao: cc.Node = null;

    initData;//初始化数据

    private isAngle: boolean = false;//是否在旋转中

    start() {

    }



    /**
     * 攻击
     * @param id 子弹
     */
    attackFn() {
        // this.pao.stopAllActions();
        // this.pao.scale = 0.4;

        //没有目标 停止动画

        // if(this.bullet.targetId==null||util.levelState==gameState.stop||util.levelState==gameState.end){
        //     this.stopAttack();
        //     return;
        // }


        // cc.tween(this.pao).call(()=>{
        //     cc.game.emit(NameTs.Game_Turret_Bullet_Creator,this.bullet);
        // }).delay(1/atkTime).call(()=>{
        //     this.attackFn();
        // }).start();

        let atkTime: number = this.turretData.speed; //攻击速度
        if (!atkTime) {
            atkTime = 2;
        }

        let nodeParent: cc.Node = this.node.getParent();
        this.unscheduleAllCallbacks();
        this.schedule(() => {
            if (util.levelState == gameState.stop || util.levelState == gameState.end) return;
            if (this.bullet.targetId == null) {
                this.attackData = null;
                return;
            }
            this.isAngle = false;
            this.setPao(() => {
                let bulletPos: cc.Vec2 = cc.Vec2.clone(this.paoFoot.node.getPosition());

                if (Number(this.turretData.bulletY) > 0) {
                    bulletPos.y += Number(this.turretData.bulletY);
                }

                bulletPos = this.paoBody.node.convertToWorldSpaceAR(bulletPos);
                bulletPos = nodeParent.convertToNodeSpaceAR(bulletPos);
                this.bullet.initPos = this.node.getPosition();
                // this.paoBody.clearTracks();
                if (this.initData.level !== 37) {
                    this.paoBody.setAnimation(0, "animation", false);
                }
                if (this.turretData.mouth) {
                    // this.paoFoot.clearTracks();
                    this.paoFoot.setAnimation(0, "animation", false);
                }
                cc.game.emit(NameTs.Game_Turret_Bullet_Creator, { data: this.bullet, pos: bulletPos });
            });

        }, 1 / atkTime);



    }

    init(data) {




        this.initData = data;
        this.initData.level = Number(this.initData.level);




        if (data.no) {
            let pos: cc.Vec2 = cc.Vec2.clone(util.GetPlaceData(data.no).pos);
            this.node.setPosition(pos);
        }
        this.setName();
        util.GlobalMap.set("turret_" + data.no, this.node);
        this.attackData = null;
    }


    private setXingNode() {
        this.xingLayout.active = this.initData.level >= 39;
        if (this.xingLayout.active) {
            let xingData = util.getLevelXing(this.initData.level);
            for (let i = 0; i < this.xingLayout.children.length; i++) {
                this.xingLayout.children[i].active = i < xingData.iconCount;
                if (this.xingLayout.children[i].active) {
                    this.xingLayout.children[i].getComponent(cc.Sprite).spriteFrame = this.iconFrame[xingData.iconType];
                }
            }
        }
    }

    /**
     * 设置属性
     */
    setName() {
        this.node.zIndex = 0;
        // this.label.string = this.initData.level;
        this.pao.angle = 0;

        this.setXingNode();

        //炮塔属性
        this.turretData = util.GetTurretData(this.initData.level);
        this.paoFoot.node.active = this.turretData.mouth ? true : false;


        this.paoFoot.node.y = Number(this.turretData.mouthY);
        this.bullet = {
            type: this.turretData.bulletType || 1,
            targetId: null,
            initPos: cc.Vec2.clone(this.node.position),
            atk: Math.floor(this.turretData.atk),
            speed: 1000,
            crit: this.turretData.crit || 15 //默认15几率
        }

        this.loadSpine(this.paoBody, "pao");

        this.loadSpine(this.paoFoot, "mouth");

        // cc.game.emit(NameTs.Game_Turret_Killed,{no:this.initData.no});
        //销毁等级牌和文字
        setTimeout(() => {
            this.createLevelBg(this.initData.no, this.initData.level);
        }, 100);

    }

    /**
     * 升级
     * @param no 哪个位置
     */
    upLevel(no?: number) {
        this.initData.level += 1;
        if (no) {
            this.initData.no = no;
        }
        if (util.upLevel(this.initData.level) && this.initData.no) {
            ApiService.ins.getCraftnewturret(util.userData.turretLevel);
            cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameUpgrade);
            if (util.userData.noviceGuide == 2) {
                cc.game.emit(NameTs.Game_Novice_Close);
            }

        } else if (util.userData.turretLevel >= 7 && this.initData.no) {
            // if (util.upTurretRandomRedTime) {
            //     let curTimer = new Date().getTime();
            //     let padTime = curTimer - util.upTurretRandomRedTime;
            //     if (padTime >= 60000) {
            //         util.upTurretRandomRedTime = curTimer;
            //         console.log("1111111111111111");
            //         cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTurretRandomRed);
            //     }
            //     else if (padTime >= 30000) {
            //         let randomNum = Math.random();
            //         if (randomNum <= 0.2) {
            //             util.upTurretRandomRedTime = curTimer;
            //             console.log("12222222222222222222222");
            //             cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTurretRandomRed);
            //         }
            //     }
            // }
            // else {
            //     util.upTurretRandomRedTime = new Date().getTime();
            //     console.log("333333333333333333333333");
            //     cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTurretRandomRed);
            // }
        }


        if (this.initData.no) {
            util.savePool(no, this.initData.level);
            util.buyCount = 0;
        } else if (this.initData.no === undefined) {
            cc.game.emit(NameTs.Game_Turret_Killed, { no: undefined });
        }
        this.setName();
        this.attackData = this.bullet.targetId = null;
    }

    /**
     * 设置炮塔角度
     * @param call 回调 
     */
    setPao(call?: Function) {

        if (this.turretData.rotation == 1) {
            if (this.isAngle) return;
            let lastAngle: number = this.pao.angle;
            let nowAngle: number = this.GetAngle();
            this.isAngle = true;
            let angleNum: number = Math.abs(lastAngle - nowAngle);
            if ((nowAngle > -260 && nowAngle <= -270)) {
                nowAngle += 360;
                this.pao.angle = nowAngle;
                angleNum = 10;
            }
            else if (nowAngle > 0 && nowAngle <= 90) {
                nowAngle -= 360;
                angleNum = 10;
            }
            if (angleNum > 5 && angleNum < 360) {
                cc.tween(this.pao).to(angleNum / 1000, { angle: nowAngle }).call(() => {
                    this.isAngle = false;
                    call && call();
                }).start();
            } else {
                this.pao.angle = nowAngle;
                this.isAngle = false;
                call && call();
            }
        } else {
            call && call();
        }
    }

    /**停止攻击 */
    stopAttack() {

        // this.paoBody.stop();
        // this.paoFoot.setAnimation(1,"",false);
        this.pao.stopAllActions();
        // this.pao.scale = 0.4;
    }

    /**继续攻击 */
    resumeAttack() {
        this.attackFn();
    }

}
