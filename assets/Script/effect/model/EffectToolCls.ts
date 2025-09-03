
import NameTs from "../../common/NameTs";
import ModelFunc from "../ModelFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EffectToolCls extends cc.Component {

    onEnable() {
        this.node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, this.completeAnimation, this)
        this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation("zhadan", 1)
    }
    onDisable() {
        this.node.getComponent(dragonBones.ArmatureDisplay).off(dragonBones.EventObject.COMPLETE, this.completeAnimation, this)
    }
    completeAnimation() {
        ModelFunc.removeModel(NameTs.Tool_Effect_Name.Game_Prop_Cls, this.node);
    }
}
