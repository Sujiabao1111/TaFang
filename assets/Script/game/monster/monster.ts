import NameTs from "../../common/NameTs";
import tool from "../../util/tool";
import util from "../../util/util";
import monsterFactory from "../monsterFactory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class monster extends monsterFactory {
    
    // @property({type:cc.ProgressBar,displayName:"血条"})
    // hp: cc.ProgressBar = null;

    // @property({type:cc.Node,displayName:"冰冻"})
    // FrozenNode: cc.Node = null;
    
    @property({type:dragonBones.ArmatureDisplay,displayName:"怪兽图片"})
    monsterSpine:dragonBones.ArmatureDisplay = null;
    
    // @property({type:cc.Node,displayName:"影子"})
    // shadowNode: cc.Node = null;
    
    initData;//初始化数据

    start () {


        
    }
        


    /**
     * 攻击
     */
    attackFn(){

        

    }

    init(data){
        this.initData = data.data;

        this.monsterSpine.node.opacity = 255;
        let randomNum:number  = tool.GetRandom(1,16);
        if(randomNum==4||randomNum==9||randomNum==14){
            randomNum += 1;
        }
        let level:number = this.initData.level>16?randomNum:this.initData.level;
        this.colorLevel = level;

        this.monsterData = util.GetMonsterData(this.colorLevel);
        this.walkNo = 0;
        this.walkArr = tool.deepClone(data.walk);
        //初始位置
        this.initPos= cc.Vec2.clone(util.GetMapPos(this.walkArr[this.walkNo].y,this.walkArr[this.walkNo].x));
        this.node.setPosition(this.initPos);
        this.setName();
        this.monsterSpine.node.scale = 0;
        //默认变小
        this.id = data.id;
        //设置血量
        this.monsterHp = Number(this.initData.hp);
        /**储存怪物的node */
        this.monsetrName = util.userData.customs.big+"-"+util.userData.customs.small+"_Monster_"+this.id;
        util.MonsterMap.set(this.monsetrName,this.node);
        /**初始化冰冻效果 */
        this.isFrozen = false;
        // this.FrozenNode.active = false;
        this.closeFrozen();
        /**初始化护罩效果 */
        this.isShield = false;
        // this.shadowNode.active = false;
        this.startAni();
        this.monsterSpine = this.monsterSpine;

        cc.game.on(NameTs.Game_Monster_Bruise+this.monsetrName,(res)=>{
            this.monsterBruise(res.num,res.crit);
        },this);
    }

    /**
     * 设置名字
     */
    setName(){
        // this.loadSprite((res)=>{
        //     this.monsterPicNode.spriteFrame = res;
        // });

        this.loadSpine();

    }

    

    /**
     * 出厂动画
     */
    startAni(){

        //停止提前的动画
        this.node.stopAllActions();
        this.monsterSpine.node.y = Number(this.monsterData.y);
        cc.tween(this.monsterSpine.node).delay(this.id).to(.3,{scale:Number(this.monsterData.scale)}).call(()=>{
            cc.game.emit(NameTs.Game_Monster_Hp_Creater,{id:this.id});
            this.walk();
            // this.shadowNode.active = true;
            cc.game.emit(NameTs.Game_Monster_Shadow_Creater,{id:this.id});
        }).start();

    }


    /**
     * 死亡动画
     */
    dieAni(call){        
        this.node.stopAllActions();
        cc.tween(this.monsterSpine.node).to(.3,{scale:0}).call(()=>{call()}).start();
    }
    

    // /**
    //  * 设置血条
    //  * @param num 血条
    //  */
    // setHp(num:number){
    //     this.hp.node.opacity = 255;
    //     this.hp.progress = num;

    // }
    /**
     * 开启冰冻
     */
    openFrozen(){
        // this.FrozenNode.active = true;
        this.monsterSpine.node.color = cc.color(11,190,255,255);
        this.monsterSpine.node.opacity = 178;
    }

    /**
     * 关闭冰冻
     */
    closeFrozen(){
        // this.FrozenNode.active = false;
        
        this.monsterSpine.node.color = cc.color(255,255,255,255);
        this.monsterSpine.node.opacity = 255;
    }

    //  /**暂停走 */
    //  stopWalk(){
    //     this.monsterSprite.node.pauseAllActions();
    // }

    // /**继续走 */
    // resumeWalk(){
    //     this.monsterSprite.node.resumeAllActions();
    // }

    // update (dt) {}
}
