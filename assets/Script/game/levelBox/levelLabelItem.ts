import NameTs from "../../common/NameTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class levelLabelItem extends cc.Component {

    @property(cc.Label)
    private label:cc.Label = null;//文字

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
        this.label.string = data.level;
        this.isKilled = false;
        this.turretFn = cc.game.on("turret_label_"+data.no,()=>{
            this.killSelf();
        },this);
    }

    /**删除自己 */
    killSelf(){
        this.isKilled = true;
        cc.game.off("turret_label_"+this.initData.no,this.turretFn,this);
        cc.game.emit(NameTs.Game_LevelLabel_Killed,this.node);
    }

    update (dt) {
        if(this.isKilled)return;
        if(!this.targetNode || !this.targetNode.isValid){
            this.killSelf();
            return;
        }
        try{
            if(this.targetNode&&this.targetNode.getPosition){
                let pos:cc.Vec2 = this.targetNode.getPosition();
                this.node.x = pos.x-48.878;
                this.node.y = pos.y+40.735;
            }
        }catch(error){
            console.log(error,this.initData.no,'error')
        }
        
    }


}
