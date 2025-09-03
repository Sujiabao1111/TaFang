import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gameState, propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pool from "../common/pool";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";
import turret from "./turret/turret";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turretBox extends baseTs {

    private turretPool:pool; //对象池

    @property({displayName:"炮塔",type:cc.Prefab})
    private turretPre:cc.Prefab = null;

    private isOpenAuto:boolean = false;//是否启动
    
    //合成时间
    private autoTime:number = 1;
    //是否拿起
    private isTouch:boolean = false;

    onLoad(){

        //监听创建
        cc.game.on(NameTs.Game_Turret_Creator,res=>{
            
            this.createTurret(res);

        },this);

        

        //监听销毁
        cc.game.on(NameTs.Game_Turret_Killed,res=>{
            if(res.node){
                res.node.destroy();
                res.node.removeFromParent();
                res.node = null;
            }
            if(res.no||res.no===undefined){
                cc.game.emit("turret_bg_"+res.no);
                cc.game.emit("turret_label_"+res.no);
            }
            // this.turretPool.onEnemyKilled(res);

        },this);

        //监听自动合成
        cc.game.on(NameTs.Tool_Effect_Name.Game_Prop_Atuo,()=>{
            this.isOpenAuto = true;
        },this);

        //拿起
        cc.game.on(NameTs.Game_Turret_PickUp,(res)=>{
            
            this.isTouch = true;

        },this);

        //放下
        cc.game.on(NameTs.Game_Turret_PutDown,(res)=>{

            this.isTouch = false;

        },this);

        //点击了空地宝箱
        cc.game.on(NameTs.Click_Empty_Box,(no)=>{

            this.createTurret({level:null, location:no, isFree:true}, true);

        },this);        

        
        // this.loadAny("prefab/turret/turret",cc.Prefab,(res)=>{            
            // this.turretPool = new pool(res,16);
            // console.log(this.turretPool,'turretPool')
            
        // });

        this.initTurret();

    }

    /**
     * 还原用户炮塔
     */
    initTurret(){
        if(util && util.userData && util.userData.pool){
            util.userData.pool.forEach(item=>{
                if(item.level>0){
                    this.createTurret({level:item.level,location:item.no,isFree:true});
                }
            });
        }


        //预加载解锁炮塔信息流
        // if(!util.adPreObj[AdPosition.UnlcokTurretView]&&util.chekPoolHaveTwo()){
        //     util.preloadAd(AdPosition.UnlcokTurretView,true);
        // }

        // for(let i = 1;i<6;i++){
        //     this.createTurret({level:i+16,location:i,isFree:true});
        // }

        // this.createTurret({level:7,location:13,isFree:true});
        // this.createTurret({level:20,location:14,isFree:true});
        // this.createTurret({level:19,location:4,isFree:true});
        // this.createTurret({level:19,location:5,isFree:true});
        // this.createTurret({level:19,location:6,isFree:true});
        // this.createTurret({level:19,location:7,isFree:true});
        // this.createTurret({level:19,location:8,isFree:true});
    }

    /**
     * 创建炮塔
     * @param level 等级
     * @param location 位置
     */
    createTurret(data:{level:number,location:number,isFree:boolean}={level:null,location:null,isFree:false}, isClickEmptyBox = false){
        let level:number = data.level;
        let location:number = data.location;
        
        if(util.userData.product<=0&&!data.isFree){
            AssistCtr.showToastTip("不够能量");
            return;
        }


        let loaction = location||util.checkPool(); //看看是哪个

        if(loaction==null){
            AssistCtr.showToastTip("没有空地了，先把炮塔合成或回收吧！");
            return;
        }

        //如果有就直接等级没有就随机
        level = level||util.getBuyRandomLevel();
        if(!data.isFree)util.addProduct(-1);
        util.userData.buyCount+=1;
        util.savePool(loaction,level);
        if(!data.isFree)cc.game.emit(NameTs.Game_Buy_update);
        let item:cc.Node = cc.instantiate(this.turretPre);
        item.getComponent(item.name).init({level:level,no:loaction});
        item.setParent(this.node);

        // this.turretPool.createEnemy(this.node,{level:level,no:loaction});      
        
        if(isClickEmptyBox){
            item.scale = 0.6;
            cc.tween(item).to(0.08, {scale: 1.1}).to(0.04, {scale: 1}).start();            

            TrackMgr.empty_treasure({
                activity_state:`宝箱点击`,
                turret_level: level,
                pun_number:`第${util.userData.customs.big}-${util.userData.customs.small}关`               
            })

            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: `空降宝箱（已砸开）`
            })
        }
    }


    /**开启自动合成 */
    openAuto(){
        
        if(!util.userData.prop[propType.auto-1].use){
            this.unscheduleAllCallbacks();
            return;
        }
        let arr = util.GetTurretAuto();
        if(!arr)return;
        let node1:cc.Node = util.GlobalMap.get("turret_"+arr[0].no);
        if(!node1)return;
        let node2:cc.Node = util.GlobalMap.get("turret_"+arr[1].no);
        if(!node2)return;
        let node2Pos:cc.Vec2 = cc.v2();
        if(node2.getPosition){
            node2Pos = node2.getPosition();
        }
        node1.zIndex = 99;

        cc.tween(node1).to(.2,{x:node2Pos.x,y:node2Pos.y}).call(()=>{
            node1.getComponent(turret).GetType(arr[1].no);
        }).start();

    }

    update (dt) {

        if(this.isOpenAuto&&!this.isTouch&&util.levelState==gameState.start){
            this.autoTime-=dt;
            if(this.autoTime<0){
                this.autoTime = 1.5;
                this.openAuto();
            }
        }

    }

    
}
