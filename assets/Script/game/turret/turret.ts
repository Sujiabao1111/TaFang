import { bulletInfo, gameState } from "../../common/faceTs";
import NameTs from "../../common/NameTs";
import pageTs from "../../common/pageTs";
import TrackMgr from "../../TrackMgr/TrackMgr";
import tool from "../../util/tool";
import util from "../../util/util";
import turretFactiory from "../turretFactory";

const { ccclass, property } = cc._decorator;

@ccclass
export default class turret extends turretFactiory {

    // @property(cc.Label)
    // label: cc.Label = null;

    @property({ type: sp.Skeleton, displayName: "炮" })
    paoBody: sp.Skeleton = null;

    @property({ type: sp.Skeleton, displayName: "口" })
    paoFoot: sp.Skeleton = null;

    // @property({type:cc.Sprite,displayName:"炮身"})
    // paoBody: cc.Sprite = null;

    // @property({type:cc.Sprite,displayName:"泡脚"})
    // paoFoot: cc.Sprite = null;

    @property(cc.Node)
    pao: cc.Node = null;

    initData;//初始化数据

    private isAngle:boolean = false;//是否在旋转中

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
        let atkTime: number = this.turretData.speed;
        if (!atkTime) {
            atkTime = 2;
        }

        let nodeParent:cc.Node = this.node.getParent();
        this.unscheduleAllCallbacks();
        this.schedule(() => {
            if (util.levelState == gameState.stop || util.levelState == gameState.end) return;
            if (this.bullet.targetId == null) {
                this.attackData = null;
                return;
            }
            this.isAngle = false;
            this.setPao(()=>{
                let bulletPos:cc.Vec2 = cc.Vec2.clone(this.paoFoot.node.getPosition());

                if(Number(this.turretData.bulletY)>0){
                    bulletPos.y +=Number(this.turretData.bulletY);
                }
                // if(this.initData.level==16||this.initData.level==38){
                //     bulletPos.y +=30;
                // }else if(this.initData.level==18||this.initData.level==29||this.initData.level==31||this.initData.level==21){
                //     bulletPos.y +=50;
                // }
                bulletPos = this.paoBody.node.convertToWorldSpaceAR(bulletPos);
                bulletPos = nodeParent.convertToNodeSpaceAR(bulletPos);
                this.bullet.initPos = this.node.getPosition();
                // this.paoBody.clearTracks();
                if(this.initData.level!==37){
                    this.paoBody.setAnimation(0, "animation", false);
                }
                if(this.turretData.mouth){
                    // this.paoFoot.clearTracks();
                    this.paoFoot.setAnimation(0, "animation", false);
                }
                cc.game.emit(NameTs.Game_Turret_Bullet_Creator, {data:this.bullet,pos:bulletPos});
            });
            
        }, 1 / atkTime);



    }

    init(data) {

        this.initData = data;
        this.initData.level = Number(this.initData.level);
        if(data.no){
            let pos: cc.Vec2 = cc.Vec2.clone(util.GetPlaceData(data.no).pos);
            this.node.setPosition(pos);
        }
        this.setName();
        util.GlobalMap.set("turret_" + data.no, this.node);
        this.attackData = null;
    }

    /**
     * 设置属性
     */
    setName() {
        this.node.zIndex = 0;
        // this.label.string = this.initData.level;
        this.pao.angle = 0;
        //炮塔属性
        this.turretData = util.GetTurretData(this.initData.level);
        this.paoFoot.node.active = this.turretData.mouth?true:false;

        // if(this.turretData.level==5||this.initData.level==9||this.initData.level==11||this.initData.level==17||this.initData.level==22||this.initData.level==34){
        //     this.paoFoot.node.y = 0;
        // }else if(this.turretData.level==24||this.turretData.level==25||this.turretData.level==26||this.turretData.level==35){
        //     this.paoFoot.node.y = 80;
        // }else{
        //     this.paoFoot.node.y = 52;
        // }
        this.paoFoot.node.y = Number(this.turretData.mouthY);
        this.bullet = {
            type: this.turretData.bulletType || 1,
            targetId: null,
            initPos: cc.Vec2.clone(this.node.position),
            atk: Math.floor(this.turretData.atk),
            speed: 1000,
            crit:this.turretData.crit||15 //默认15几率
        }

        this.loadSpine(this.paoBody, "pao");

        this.loadSpine(this.paoFoot, "mouth");

        // cc.game.emit(NameTs.Game_Turret_Killed,{no:this.initData.no});
        //销毁等级牌和文字
        setTimeout(() => {
            this.createLevelBg(this.initData.no,this.initData.level);
        }, 100);

    }

    /**
     * 升级
     * @param no 哪个位置
     */
    upLevel(no?: number) {
        this.initData.level += 1;
        if(no){
            this.initData.no = no;
        }
        if (util.upLevel(this.initData.level)&&this.initData.no) {
            cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameUpgrade);
            if (util.userData.noviceGuide == 2) {
                
                if(util.checkTestB(NameTs.new_hand_test)){
                    TrackMgr.rookie_process_2({
                        activity_state:"拖拽合成成功"
                    });
                }else{
                    TrackMgr.rookie_process({
                        activity_state :"拖拽合成效果页",
                        click_event: "点击"
                    });
                    cc.game.emit(NameTs.Game_Novice_Close);
                }
                
            }

            // cc.game.emit(NameTs.Game_Treasure_create);
        }
        else if(util.userData.turretLevel >= 7 && this.initData.no){
            if(util.upTurretRandomRedTime){
                let curTimer = new Date().getTime();
                let padTime = curTimer - util.upTurretRandomRedTime;                
                if(padTime >= 60000){
                    util.upTurretRandomRedTime = curTimer;
                    cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTurretRandomRed);
                }
                else if(padTime >= 30000){
                    let randomNum = Math.random();                    
                    if(randomNum <= 0.2){
                        util.upTurretRandomRedTime = curTimer;
                        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTurretRandomRed);
                    }
                }
            }
            else{
                util.upTurretRandomRedTime = new Date().getTime();
                cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTurretRandomRed);
            }            
        }


        if(this.initData.no){
            util.savePool(no, this.initData.level);
            util.buyCount = 0; 
        }else if(this.initData.no === undefined){
            cc.game.emit(NameTs.Game_Turret_Killed,{no:undefined});
        }
        this.setName();
        this.attackData = this.bullet.targetId = null;       
    }

    /**
     * 设置炮塔角度
     * @param call 回调 
     */
    setPao(call?:Function) {

        if(this.turretData.rotation==1){
            if(this.isAngle)return;
            let lastAngle:number = this.pao.angle;
            let nowAngle:number = this.GetAngle();
            this.isAngle = true;
            let angleNum:number = Math.abs(lastAngle-nowAngle);
            if((nowAngle>-260&&nowAngle<=-270)){
                nowAngle += 360;
                this.pao.angle = nowAngle;
                angleNum = 10;
            }
            else if(nowAngle>0&&nowAngle<=90){
                nowAngle -= 360;
                angleNum = 10;
            }
            if(angleNum>5&&angleNum<360){
                cc.tween(this.pao).to(angleNum/1000,{angle:nowAngle}).call(()=>{
                    this.isAngle = false;
                    call&&call();
                }).start();
            }else{
                this.pao.angle = nowAngle;
                this.isAngle = false;
                call&&call();
            }
        }else{
            call&&call();
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
