import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pool from "../common/pool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class hurtBox extends baseTs {

    /**伤害对象池 */
    private hurtPool:pool; 

    onLoad () {

        this.loadAny("prefab/turret/turretHurt",cc.Prefab,(res)=>{            
            this.hurtPool = new pool(res,20);
        });


        /**监听创建 */
        cc.game.on(NameTs.Game_Hurt_Creator,(data)=>{

            this.hurtPool.createEnemy(this.node,data);
            
        },this);

        /**监听销毁 */
        cc.game.on(NameTs.Game_Hurt_Killed,(data)=>{

            this.hurtPool.onEnemyKilled(data);
            
        },this);


    }

    start () {

    }


    

    
    
    // update (dt) {}
}
