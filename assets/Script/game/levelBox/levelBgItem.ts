import NameTs from "../../common/NameTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class levelBgItem extends cc.Component {

    /**目标位置 */
    private targetNode:cc.Node = null;

    private turretFn:any;

    //是否在删除
    private isKilled:boolean = false;
    
    private initData:any;

    start () {

    }

    init(data){
        this.initData = data;
        this.targetNode = data.node;
        this.isKilled = false;
        this.turretFn = cc.game.on("turret_bg_"+data.no,()=>{
            this.killSelf();
        },this);
    }
    /**删除自己 */
    killSelf(){
        this.isKilled = true;
        cc.game.off("turret_bg_"+this.initData.no,this.turretFn,this);
        cc.game.emit(NameTs.Game_LevelLabel_Killed,this.node);
    }

    update (dt) {
        if(this.isKilled)return;
        if(!this.targetNode || !this.targetNode.isValid){
            this.killSelf();
            return;
        }                
        let pos:cc.Vec2 = this.targetNode&&this.targetNode.getPosition&&this.targetNode.getPosition();
        this.node.x = pos.x-47.931;
        this.node.y = pos.y+36.495;
        
    }
}
