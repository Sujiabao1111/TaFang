import NameTs from "../common/NameTs";
import pool from "../common/pool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class hpBox extends cc.Component {

    @property({type:cc.Prefab,displayName:"血量条"})
    private hpPre:cc.Prefab = null;

    
    /**血量对象池 */
    private hpPool:pool; 

    onLoad () {
        let item:cc.Node = cc.instantiate(this.hpPre);
        this.hpPool = new pool(item);
        
        /**监听创建 */
        cc.game.on(NameTs.Game_Monster_Hp_Creater,(data)=>{
            this.hpPool.createEnemy(this.node,data);
        },this);

        /**监听销毁 */
        cc.game.on(NameTs.Game_Monster_Hp_Killed,(data)=>{
            // data.destroy();
            // return
            this.hpPool.onEnemyKilled(data);
        },this);


    }

    start () {

    }

    // update (dt) {}
}
