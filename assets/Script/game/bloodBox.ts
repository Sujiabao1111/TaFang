import NameTs from "../common/NameTs";
import pool from "../common/pool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class bloodBox extends cc.Component {

    @property({type:cc.Prefab,displayName:"血"})
    private bloodPre:cc.Prefab = null;

    
    /**血对象池 */
    private bloodPool:pool; 

    onLoad () {
        let item:cc.Node = cc.instantiate(this.bloodPre);
        this.bloodPool = new pool(item,1);
        
        /**监听创建 */
        cc.game.on(NameTs.Game_Monster_Blood_Creater,(data)=>{
            this.bloodPool.createEnemy(this.node,data);
        },this);

        /**监听销毁 */
        cc.game.on(NameTs.Game_Monster_Blood_Killed,(data)=>{
            this.bloodPool.onEnemyKilled(data);
        },this);


    }

    start () {

    }

    // update (dt) {}
}
