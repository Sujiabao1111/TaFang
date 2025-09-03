import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pool from "../common/pool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class levelBox extends baseTs {

    /**背景对象池 */
    @property(cc.Prefab)
    private levelBgItem:cc.Prefab = null;

    /**背景对象池 */
    private bgPool:pool; 

    onLoad () {
        let item:cc.Node = cc.instantiate(this.levelBgItem);
        this.bgPool = new pool(item,16);

        /**监听创建 */
        cc.game.on(NameTs.Game_LevelBg_Creator,(data)=>{
            this.bgPool.createEnemy(this.node,data);
        },this);

        /**监听销毁 */
        cc.game.on(NameTs.Game_LevelBg_Killed,(data)=>{
            if(data){
                this.bgPool.onEnemyKilled(data);
            }
        },this);


    }

    start () {

    }


    

    
    
    // update (dt) {}
}
