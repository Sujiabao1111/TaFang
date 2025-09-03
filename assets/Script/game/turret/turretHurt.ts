import NameTs from "../../common/NameTs";
import tool from "../../util/tool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turretHurt extends cc.Component {

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
        
        this.hurtLabel.string = tool.changeUnit(data.value);

        let coinParentPos:cc.Vec2 = cc.v2(pos.x+(80*(Math.random()>.5?1:-1)),pos.y-200);
        let centerPos:cc.Vec2 = cc.Vec2.clone(pos.add(coinParentPos).div(2));
        let pos1:cc.Vec2 = cc.v2();
        pos1.x = centerPos.x + Math.cos(Math.PI*tool.GetRandom(0,360)/180)*50;
        pos1.y = centerPos.y-50 ;
        this.node.opacity = 255;
        cc.tween(this.node).parallel(
            cc.tween().bezierTo(1,pos,pos1,pos1),
            cc.tween().to(1,{opacity:0})
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
        cc.game.emit(NameTs.Game_Hurt_Killed,this.node);
    }

}
