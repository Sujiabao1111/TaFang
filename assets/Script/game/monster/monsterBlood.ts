import NameTs from "../../common/NameTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class monsterBlood extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property({displayName:"龙骨",type:dragonBones.ArmatureDisplay})
    private ArmatureDisplay:dragonBones.ArmatureDisplay = null;


    onLoad(){
        
    }

    init(data){
        let tempColor = new cc.Color();
        tempColor.fromHEX(data.color);
        
        this.node.setPosition(data.pos);

        this.ArmatureDisplay.node.color = tempColor;

        this.ArmatureDisplay.playAnimation("monsterblood",1);
       
        this.scheduleOnce(()=>{
            this.destroySelf();
        },1);
        
    }

   
    start () {

    }

    /**回收自己 */
    destroySelf(){
        //回收自己
        cc.game.emit(NameTs.Game_Monster_Blood_Killed,this.node);
    }
    // update (dt) {}
}
