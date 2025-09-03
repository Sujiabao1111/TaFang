import { gamePass, gameState, monsterInfo, propState, propType, thingType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import soundController from "../soundController";
import tool from "../util/tool";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class monsterFactory extends cc.Component {

 
    /**初始数据 */
    initData:monsterInfo;

    /**出生在哪里 */
    initPos:cc.Vec2;

    /**当前行走第几个数组(默认为0)*/
    walkNo:number;
    /**当前行走轨迹*/
    walkArr:any[];
    
    /**怪物的id */
    id:number;
    
    /**怪兽血量 */
    monsterHp:number;

    /**是否进行中冰冻 */
    isFrozen:boolean = false;
    
    /**是否进行中保护 */
    isShield:boolean = false;

    /**怪兽图片 */
    monsterSpine:dragonBones.ArmatureDisplay;

    /**mapName */
    monsetrName:string ;

    /**颜色等级 */
    colorLevel:number;

    /**怪兽数据 */
    monsterData:any;

    onLoad(){

        cc.game.on(NameTs.Game_End,()=>{

            this.stopWalk();

        },this);

        

        //监听游戏暂停
        cc.game.on(NameTs.Game_Stop,()=>{
            
            this.stopWalk();

        },this);

        //监听游戏继续
        cc.game.on(NameTs.Game_Resume,()=>{
            
            this.resumeWalk();

        },this);

        //清屏道具
        cc.game.on(NameTs.Tool_Effect_Name.Game_Prop_Cls,(res)=>{
            if(this.walkNo>0){
                this.clearMonster();
            }
        },this);
        //普通消除，不会有金币
        cc.game.on(NameTs.Game_Monster_clearAll,(res)=>{
            this.clearMonster2();
        },this);
    }


    /**行走 */
    walk(){
        if(this.walkNo>=this.walkArr.length-1){
            if(this.isShield)return;
            this.GameEnd();
            console.log("走到总店了")
            return
        }
        this.walkNo++;
        this.node.zIndex = this.walkNo;
        //设置当前
        util.setLevelMonsterData(this.id,this.walkArr.length-1-this.walkNo);
        let nextPos:cc.Vec2 = util.GetMapPos(this.walkArr[this.walkNo].y,this.walkArr[this.walkNo].x);
        cc.tween(this.node).to(Number(this.initData.speed)/77,{x:nextPos.x,y:nextPos.y}).call(()=>{
            this.walk();
        }).start();
    }

    /**
     * 结束游戏
     */
    GameEnd(){

        util.sendTurretData();
        util.levelState = gameState.end;
        cc.game.emit(NameTs.Game_End,gamePass.fail);

    }
    
    /**
     * 怪兽受伤
     * @param atk 扣多少血
     * @param citr 暴击
     */

    monsterBruise(atk:number,crit:number=1){
        // if(this.)
        //暴击
        atk *= crit;
        //增能
        let energizedNum:number = util.userData.prop[propType.energized-1].use?1:0;
        //电击
        let shockNum:number = util.userData.prop[propType.shock-1].use?.2:0;
        //伤害
        let hurtNum:number  = Math.floor(Number(atk)*(1+shockNum+energizedNum));
        //扣血
        this.monsterHp -= hurtNum;


        //伤害值
        if(crit==1){
            cc.game.emit(NameTs.Game_Hurt_Creator,{value:hurtNum,pos:this.node.getPosition()});
        }else{
            cc.game.emit(NameTs.Game_Hurt_Crit_Creator,{value:hurtNum*crit,pos:this.node.getPosition()});
        }

        this.setHp(this.monsterHp/this.initData.hp);

        if(this.monsterHp<=0){
            this.clearMonster();
            soundController.singleton.playDeadAudio();
            return;
        }
    }

    /**设置血量 */
    setHp(num){
        cc.game.emit(NameTs.Game_Monster_Hp_Linster+this.monsetrName,num);
    }

    update(dt){

        if(util.levelState!==gameState.start)return;
        if(util.userData.prop[propType.frozen-1].use==propState.start&&this.walkNo>0&&!this.isFrozen){
            this.isFrozen = true;
            this.openFrozen();
            this.stopWalk();
        }else if(util.userData.prop[propType.frozen-1].use == propState.end&&this.isFrozen){
            this.closeFrozen();
            this.resumeWalk();
        }
        if(util.userData.prop[propType.shield-1].use==propState.start&&!this.isShield){
            this.isShield = true;
        }else if(util.userData.prop[propType.shield-1].use==propState.end&&this.isShield){
            this.isShield = false;
            
        }
    }


    /**暂停走 */
    stopWalk(){
        this.node.pauseAllActions();
        this.monsterSpine.node.pauseAllActions();
    }

    /**继续走 */
    resumeWalk(){
        this.isFrozen = false;
        this.monsterSpine.node.resumeAllActions();
        this.node.resumeAllActions();
    }

    /**
     * 开启冰冻
     */
    openFrozen(){
    }

    /**
     * 关闭冰冻
     */
    closeFrozen(){
    }

    /**
     * 清理怪兽
     */
    clearMonster(){
        util.MonsterMap.delete(this.monsetrName);
        this.node.stopAllActions();
        util.delectLevelMonster(this.id);
        let Earn:number = 1;
        if(util.doubleEarn.use){
            Earn = 2;
        }
        let pos:cc.Vec2 = this.node.getPosition();
        let coin:number = util.GetBehaviorRewardVo(2);
        let color:cc.Color = util.GetMonsterColor(this.colorLevel);
        cc.game.off(NameTs.Game_Monster_Bruise+this.monsetrName);
        cc.game.emit(NameTs.Game_Monster_Killed,{id:this.id,node:this.node,coin:coin*Earn});
        cc.game.emit(NameTs.Game_Monster_Shadow_Linster+this.monsetrName);
        cc.game.emit(NameTs.Game_Monster_Hp_Linster+this.monsetrName,0);
        cc.game.emit(NameTs.Game_Monster_Blood_Creater,{pos,color});
    }

    /**
     * 普通清除
     */
    clearMonster2(){
        util.MonsterMap.delete(this.monsetrName);
        this.node.stopAllActions();
        util.delectLevelMonster(this.id);
        cc.game.off(NameTs.Game_Monster_Bruise+this.monsetrName);
        cc.game.emit(NameTs.Game_Monster_Killed,{id:this.id,node:this.node,coin:0});
        cc.game.emit(NameTs.Game_Monster_Shadow_Linster+this.monsetrName);
        cc.game.emit(NameTs.Game_Monster_Hp_Linster+this.monsetrName,0);
    }

    /**
     * 加载图片
     */
    loadSpine(){
        
        // cc.resources.load("/texture/monster/monster"+Number(level),cc.SpriteFrame,(err,res:cc.SpriteFrame)=>{

        //     if(err){
        //         console.error("找不到该图片",err);
        //         return;
        //     }

        // });
        // let monsterData = util.GetMonsterData(level);
        // console.log(monsterData,'monsterData')
        this.monsterSpine.armatureName = this.monsterData.armature;
        this.monsterSpine.animationName = this.monsterData.animation;
        this.monsterSpine.playTimes = 0;


    }

    /**
     * 死亡动画
     * @param call 回调
     */
    dieAni(call:Function){}
}
