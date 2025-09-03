import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pool from "../common/pool";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class bulletBox extends baseTs {

    /**子弹对象池 */
    private bulletPool:pool; 
    
    /**炸开对象池 */
    private boomPool:pool; 

    onLoad () {

        /**初始化对象池 */
        this.loadAny("prefab/turret/turretBullet",cc.Prefab,(res)=>{

            let item:cc.Node = cc.instantiate(res);

            this.bulletPool = new pool(item,10);

        });

        /**初始化对象池 */
        this.loadAny("prefab/turret/BulletBoom",cc.Prefab,(res)=>{

            let item:cc.Node = cc.instantiate(res);

            this.boomPool = new pool(item,40);

        });

        /**监听创建 */
        cc.game.on(NameTs.Game_Turret_Bullet_Creator,(data)=>{

            this.bulletPool.createEnemy(this.node,data);

        },this);

        /**监听创建 */
        cc.game.on(NameTs.Game_Bullet_Boom_Creator,(data)=>{

            this.boomPool.createEnemy(this.node,data);

        },this);

        /**监听销毁 */
        cc.game.on(NameTs.Game_Turret_Bullet_Killed,(data)=>{

            this.bulletPool.onEnemyKilled(data);
            
        },this);

        /**监听销毁 */
        cc.game.on(NameTs.Game_Bullet_Boom_Killed,(data)=>{

            this.boomPool.onEnemyKilled(data);
            
        },this);


    }

    start () {

    }


    
    
    // update (dt) {}
}
