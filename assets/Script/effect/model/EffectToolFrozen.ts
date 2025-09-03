
import NameTs from "../../common/NameTs";
import ModelFunc from "../ModelFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EffectToolFrozen extends cc.Component {
    //龙骨
    @property(dragonBones.ArmatureDisplay)
    private dragon:dragonBones.ArmatureDisplay = null;

    onLoad(){

        this.dragon.node.scaleX = cc.winSize.width/this.dragon.node.width*1.2;
        this.dragon.node.scaleY = cc.winSize.height/this.dragon.node.height*1.33;
        console.log(this.dragon.node.scaleX,cc.winSize.width,this.dragon.node.width,cc.winSize.height,'this.dragon.node.scaleX')
    }

    onEnable() {        
        setTimeout(() => {
            this.completeAnimation();            
        }, 3000);        
    }
    onDisable() {
        
    }
    completeAnimation() {
        this.node.active = false;
        // this.dragon.node.active = false;
        ModelFunc.removeModel(NameTs.Tool_Effect_Name.Game_Prop_Frozen, this.node);
    }
    openPlist(){
        this.node.active = true;
        // this.dragon.playAnimation("bingdong",0);
    }
}
