import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pool from "../common/pool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class hurtCirtBox extends baseTs {

    /**暴击伤害对象池 */
    private hurtPool2:pool; 

    onLoad () {
        this.loadAny("prefab/turret/turretHurt2",cc.Prefab,(res)=>{            
            this.hurtPool2 = new pool(res,20);
        });
        
        /**监听创建 */
        cc.game.on(NameTs.Game_Hurt_Crit_Creator,(data)=>{

            this.hurtPool2.createEnemy(this.node,data);
            
        },this);

        /**监听销毁 */
        cc.game.on(NameTs.Game_Hurt_Crit_Killed,(data)=>{

            this.hurtPool2.onEnemyKilled(data);
            
        },this);


    }

    start () {

    }


    

    
    
    // update (dt) {}
}
