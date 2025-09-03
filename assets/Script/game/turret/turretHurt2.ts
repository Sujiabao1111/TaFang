import NameTs from "../../common/NameTs";
import tool from "../../util/tool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turretHurt2 extends cc.Component {

    @property({type:cc.Label,displayName:"数值"})
    hurtLabel:cc.Label = null;

    start () {
        

    }

    /**初始化 */
    init(data){
        //设置出生位置
        let pos:cc.Vec2 = data.pos;
        this.node.setPosition(pos);
        
        // this.node.scale = 0;
        // this.node.opacity = 255;
        // cc.tween(this.node).to(.1,{scale:1}).by(.3,{x:20,y:-10}).call(()=>{
        //     this.destroyhurt();
        // }).start();
        
        this.hurtLabel.string = "~"+tool.changeUnit(data.value);
        this.node.scale = 1;
        this.node.opacity = 255;
        cc.tween(this.node).parallel(
            cc.tween().by(.8,{y:100}),
            cc.tween().to(.15,{scale:1.2}).to(.15,{scale:1}),
            cc.tween().delay(.4).to(.4,{opacity:0})
        ).call(()=>{
            this.destroyhurt();
        }).start();
        
        

    }

    /**回收自己 */
    destroyhurt(){
        //回收自己
        // this.node.destroy();
        // this.node.removeFromParent();
        // return
        cc.game.emit(NameTs.Game_Hurt_Crit_Killed,this.node);
    }

}
