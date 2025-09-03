import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pool from "../common/pool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class levelBox extends baseTs {

    /**背景对象池 */
    @property(cc.Prefab)
    private levelLabelItem:cc.Prefab = null;
    /**字对象池 */
    private labelPool:pool; 

    onLoad () {

        // this.loadAny("prefab/levelBox/levelLabelItem",cc.Prefab,(res)=>{            
        //     this.labelPool = new pool(res,16);
        // });
        
        let item:cc.Node = cc.instantiate(this.levelLabelItem);
        this.labelPool = new pool(item,16);

        /**监听创建 */
        cc.game.on(NameTs.Game_LevelLabel_Creator,(data)=>{
            this.labelPool.createEnemy(this.node,data);
        },this);

        /**监听销毁 */
        cc.game.on(NameTs.Game_LevelLabel_Killed,(data)=>{
            if(data && data.isValid){
                this.labelPool.onEnemyKilled(data);
            }
        },this);

    }

    start () {

    }


    

    
    
    // update (dt) {}
}
