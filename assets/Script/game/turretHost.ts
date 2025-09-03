import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import util from "../util/util";
import turret from "./turret/turret";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turretHost extends baseTs {

    @property({displayName:"炮塔",type:cc.Prefab})
    private turretPre:cc.Prefab = null;

    /**炮塔js */
    private turretJs:turret = null;

    onLoad(){

        this.initTurret(util.userData.turretLevel);

        cc.game.on(NameTs.Game_Pop_Open,(res)=>{
            if(res == pageTs.pageName.GameUpgrade){
                this.updateTurrert();
            }

        },this);

    }

    /**
     * 还原用户炮塔
     * @param level 等级
     */
    initTurret(level:number){
        let item:cc.Node = cc.instantiate(this.turretPre);
        item.getComponent(item.name).init({level});
        item.setParent(this.node);
        item.setPosition(10,320);
        this.turretJs = item.getComponent(turret);
        // this.createTurret({level:38,location:1,isFree:true});
    }

    /**
     * 更新炮塔
     */
    updateTurrert(){
        this.turretJs.upLevel();
    }

    
}
