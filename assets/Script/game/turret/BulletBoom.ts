import baseTs from "../../base/baseTs";
import { bulletInfo, gameState } from "../../common/faceTs";
import NameTs from "../../common/NameTs";
import util from "../../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletBoom extends cc.Component {


    @property({type:sp.Skeleton ,displayName:"爆炸"})
    private spine:sp.Skeleton  = null;

    //子弹数据
    private bulletData:any;
    start () {

    }

    /**初始化 */
    init(data){

        
        
        this.bulletData = util.GetBulletData(data.type);
        
        let monsetrName:string = util.userData.customs.big+"-"+util.userData.customs.small+"_Monster_"+data.id;
        let targetNode:cc.Node = util.MonsterMap.get(monsetrName);

        if(!targetNode){
            this.destroyBoom();
            return
        }

        this.node.setPosition(targetNode.getPosition());
        this.loadSpine(data.type);
       

        this.node.y += Number(this.bulletData.boomY);

        // this.scheduleOnce(()=>{
        //     this.destroyBoom();
        // },5);
        this.spine.setCompleteListener(()=>{
            this.destroyBoom();
        });
    }

    /**
     * 加载龙骨
     * @param type 类型
     */
    loadSpine(type:number){
        let name:string = this.bulletData.boom;
        cc.resources.load("spine/turret/"+type+"/boom/"+name,sp.SkeletonData, (error, sp:sp.SkeletonData) => {
            if(error){                                
                return;
            }
            this.spine.skeletonData = sp;
            this.spine.setAnimation(0,"animation",false);
        });

    }

    /**回收自己 */
    destroyBoom(){
        //回收自己
        cc.game.emit(NameTs.Game_Bullet_Boom_Killed,this.node);
    }

}
