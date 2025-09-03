import NameTs from "../../common/NameTs";
import util from "../../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class monsterHp extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property({type:cc.ProgressBar,displayName:"血条"})
    hp: cc.ProgressBar = null;

    // onLoad () {}

    /**数据 */
    private initData:any;
    /**目标 */
    private targetNode:cc.Node = null;
    
    /**怪兽名字*/
    private monsetrName:string;

    /**运动中 */
    private isRuning:boolean = false;

    private cc_game:any;

    /**
     * 设置血条
     * @param num 血条
     */
    setHp(num:number){
        this.hp.progress = num;
    }


    onLoad(){
        

    }

    init(data){
        this.targetNode = null;
        this.node.opacity = 0;
        this.hp.progress = 1;
        this.setHp(1);
        this.isRuning = true;
        this.initData = data;
        this.monsetrName = util.userData.customs.big+"-"+util.userData.customs.small+"_Monster_"+this.initData.id;
        this.targetNode = util.MonsterMap.get(this.monsetrName);
        if(!this.targetNode){
            this.isRuning = false;
            this.destroySelf();
        } 
        this.cc_game = cc.game.on(NameTs.Game_Monster_Hp_Linster+this.monsetrName,(data)=>{
            this.checkSelf(data);
        },this);
        this.scheduleOnce(()=>{
            this.node.opacity = 255;
        },.5);
    }
    /**判断是否自己 */
    private checkSelf(data){
        if(data==0){
            this.isRuning = false;
            this.destroySelf();
            return;
        }
        this.setHp(data);
    }
    

    update(){

        // console.log(this.initData.id,'this.initData.node')
        if(!this.isRuning)return;
        if(!this.targetNode||(this.targetNode&&!this.targetNode.getPosition)){
            this.isRuning = false;
            this.destroySelf();
            return;
        } 
        // console.log(this.targetNode.x,'this.targetNode')
        // if(this.targetNode&&this.targetNode.getPosition){
            // let pos:cc.Vec2 = this.targetNode.getPosition();
            this.node.x = this.targetNode.x||0;
            this.node.y = (this.targetNode.y||0)+60;
        // }

    }

    start () {

    }

    /**回收自己 */
    destroySelf(){
        //回收自己
        this.node.opacity = 0;
        cc.game.off(NameTs.Game_Monster_Hp_Linster+this.monsetrName,this.cc_game,this);
        this.cc_game = null;
        cc.game.emit(NameTs.Game_Monster_Hp_Killed,this.node);
    }
    // update (dt) {}
}
