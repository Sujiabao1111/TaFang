import baseTs from "../../base/baseTs";
import { bulletInfo, gameState } from "../../common/faceTs";
import NameTs from "../../common/NameTs";
import tool from "../../util/tool";
import util from "../../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turretBullet extends cc.Component {

    @property({type:cc.Sprite,displayName:"炮弹图片"})
    bulletPic: cc.Sprite = null;
    
    @property({type:sp.Skeleton,displayName:"炮弹骨骼"})
    bulletSpine: sp.Skeleton = null;

    // onLoad () {}
    /**目标节点*/
    private targetNode:cc.Node;

    /**初始数据 */
    private initData;

    /**是否瞬间 */
    private isMoment:boolean = false;

    //子弹数据
    private bulletData:any;

    //是否旋转
    private isAngle:boolean = null;

    start () {
        
    }

    /**初始化 */
    init(data){        
        this.initData = data.data;
        
        this.bulletPic.node.active = this.bulletSpine.node.active = false;
        this.bulletData = util.GetBulletData(this.initData.type);
        // if(!this.bulletPic){
        //     let aaa = this.initData.type;
        // }
        let pos:cc.Vec2 = cc.Vec2.clone(data.pos);
        //设置出生位置
        // this.destroyIng = false;
        this.isMoment = false;
        this.node.setPosition(pos);
        this.node.angle = this.bulletSpine.node.angle = this.bulletPic.node.angle = 0;
        this.isAngle = this.bulletData.type == 1?false:null;
        this.bulletSpine.node.scale = 1;

        //用于出厂动画
        // this.node.scale = 0;

        let name:string = util.userData.customs.big+"-"+util.userData.customs.small+"_Monster_"+this.initData.targetId;
        this.targetNode = util.MonsterMap.get(name);

        //如果找不到就删除
        if(!this.targetNode){
            this.destroyBullet();
            return;
        }

        if(this.bulletData.bulletSpine==1){
            this.bulletSpine.node.active = true;
            this.isMoment = true;
            this.loadSpine();
        }else{
            this.bulletPic.node.active = true
            this.isMoment = false;
            this.loadSprite();
        }

    }

    /**
     * 加载图片
     */
    loadSprite(){
        if(this.bulletPic){
            this.bulletPic.spriteFrame = null;
        } 
        cc.resources.load("spine/turret/"+this.bulletData.type+"/bullet/paodan",cc.SpriteFrame, (error, res:cc.SpriteFrame) => {
            if(this.bulletPic){
                this.bulletPic.spriteFrame = res;
            }    
        });

    }

    /**
     * 加载龙骨
     */
    loadSpine(){
        if(this.bulletSpine){
            this.bulletSpine.skeletonData = null;
        }
        cc.resources.load("spine/turret/"+this.bulletData.type+"/bullet/"+this.bulletData.name,sp.SkeletonData, (error, sp:sp.SkeletonData) => {
            if(error){
                cc.warn(error);
                return;
            }
            this.bulletSpine.skeletonData = sp;
            if(this.bulletData.Spine==1){
                this.bulletSpine.setAnimation(0,this.bulletData.animationName,this.bulletData.loop=="1");
                this.isMoment = false;
            }else{
                this.bulletSpine.clearTracks();
                this.playAni();
            }
        });

    }

    update (dt) {
        //游戏暂停
        if(util.levelState == gameState.stop||this.isMoment)return;
        //没有父节点或者目标
        if(!this.targetNode||!this.targetNode.parent){
            this.destroyBullet();
            return;
        };
        //目标点
        let targetPos:cc.Vec2 = cc.Vec2.clone(this.targetNode.getPosition());

        targetPos = this.targetNode.parent.convertToWorldSpaceAR(targetPos);
        targetPos = this.node.parent.convertToNodeSpaceAR(targetPos);
       
        let selfPos:cc.Vec2 = this.node.getPosition();
        //距离
        if(this.isAngle==null){
            this.node.angle = tool.GetPosAngle(selfPos,targetPos);
        }

        let distance:number = selfPos.sub(targetPos).mag();
        if(distance<=this.targetNode.width/2){
            this.targetNode = null;
            this.hurtMonster();
            this.destroyBullet();
            return;
        }
        
        let normalizeVec: cc.Vec2 = targetPos.subtract(selfPos).normalize();

        this.node.x += normalizeVec.x * this.initData.speed * dt;
        this.node.y += normalizeVec.y * this.initData.speed * dt;

    }



    /**
     * 播放动画
     */
    playAni(){
        if(!this.targetNode||!this.targetNode.parent||!this.isMoment){
            this.destroyBullet();
            return
        }

        //目标点
        let targetPos:cc.Vec2 = this.targetNode.getPosition();

        if(!targetPos||!this.node.parent){
            this.destroyBullet();
            return
        }
        targetPos = this.targetNode.parent.convertToWorldSpaceAR(targetPos);
        targetPos = this.node.parent.convertToNodeSpaceAR(targetPos);
       
        let selfPos:cc.Vec2 = this.node.getPosition();

        //距离
        this.node.angle = tool.GetPosAngle(selfPos,targetPos);

        let distance:number = targetPos.sub(selfPos).mag();
        
        this.bulletSpine.node.y = Number(this.bulletData.Y);
        let nodeWidth:number = Number(this.bulletData.width);

        this.bulletSpine.node.scaleY = distance/(this.bulletData.bulletSpine==1?nodeWidth:this.bulletSpine.node.height)*1.3;
        if(!targetPos||!this.node.parent){
            this.destroyBullet();
            return
        }

        
        // this.bulletSpine.node.opacity = 0;
        this.bulletSpine.setAnimation(0,this.bulletData.animationName,false);

        if(this.bulletData.type == 30){
            this.scheduleOnce(()=>{
                this.hurtMonster();
            },.1);
        }else{
            this.hurtMonster();
        }

        // this.bulletSpine.setCompleteListener(()=>{
        //     this.destroyBullet();
        // });
        this.scheduleOnce(()=>{
            this.destroyBullet();
        },.5);

    }

    /**回收自己 */
    destroyBullet(){
        //回收自己
        cc.game.emit(NameTs.Game_Turret_Bullet_Killed,this.node);
       
    }

    /**受伤 */
    hurtMonster(){
        //暴击
        let crit:number = (Math.random()<(this.initData.crit/100))?2:1;
        //爆炸伤害
        cc.game.emit(NameTs.Game_Bullet_Boom_Creator,{type:this.initData.type,id:this.initData.targetId});
        //怪物受伤
        let monsetrName:string = util.userData.customs.big+"-"+util.userData.customs.small+"_Monster_"+this.initData.targetId;
        cc.game.emit(NameTs.Game_Monster_Bruise+monsetrName,{num:this.initData.atk,crit});
        
    }
}
