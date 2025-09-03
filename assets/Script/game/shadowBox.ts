import NameTs from "../common/NameTs";
import pool from "../common/pool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class shadowBox extends cc.Component {

    @property({type:cc.Prefab,displayName:"影子"})
    private shadowPre:cc.Prefab = null;

    
    /**血量对象池 */
    private shadowPool:pool; 

    onLoad () {
        let item:cc.Node = cc.instantiate(this.shadowPre);
        this.shadowPool = new pool(item,1);
        
        /**监听创建 */
        cc.game.on(NameTs.Game_Monster_Shadow_Creater,(data)=>{
            this.shadowPool.createEnemy(this.node,data);
        },this);

        /**监听销毁 */
        cc.game.on(NameTs.Game_Monster_Shadow_Killed,(data)=>{
            this.shadowPool.onEnemyKilled(data);
        },this);


    }

    start () {

    }

    // update (dt) {}
}
