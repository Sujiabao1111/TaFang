import NameTs from "../../common/NameTs";
import util from "../../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class monsterShadow extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    /**数据 */
    private initData:any;
    /**目标 */
    private targetNode:cc.Node = null;
    
    /**怪兽名字*/
    private monsetrName:string;
 

    onLoad(){
        
    }

    init(data){
        this.initData = data;
        this.monsetrName = util.userData.customs.big+"-"+util.userData.customs.small+"_Monster_"+this.initData.id;
        this.targetNode = util.MonsterMap.get(this.monsetrName);
        if(this.targetNode){
            this.node.setPosition(this.targetNode.getPosition());
        }else{
            this.destroySelf();
        }
        cc.game.on(NameTs.Game_Monster_Shadow_Linster+this.monsetrName,(data)=>{
            this.destroySelf();
        },this);
    }

    update(){

        // console.log(this.initData.id,'this.initData.node')

        if(!this.targetNode){
            this.destroySelf();
            this.targetNode = null;
            return;
        } 
        // console.log(this.targetNode.x,'this.targetNode')
        let pos:cc.Vec2 = this.targetNode.getPosition();
        this.node.x = pos.x;
        this.node.y = pos.y;

    }

    start () {

    }

    /**回收自己 */
    destroySelf(){
        //回收自己
        cc.game.off(NameTs.Game_Monster_Shadow_Linster+this.monsetrName,this.destroySelf);
        cc.game.emit(NameTs.Game_Monster_Hp_Killed,this.node);
    }
    // update (dt) {}
}
