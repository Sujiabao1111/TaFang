import { AdPosition } from "../common/AdPosition";
import { gameState } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pool from "../common/pool";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class heavenBox extends cc.Component {

    

    // LIFE-CYCLE CALLBACKS:
    @property({type:cc.Prefab,displayName:"天降金币的预制体"})
    private heavenPre:cc.Prefab = null;

    //池塘
    private pool:pool = null;

    //天降次数
    private heavenNum:number = 100;//剩余次数
    // //存在多少个
    private existCoinNum:number = 0;

    

    //判断是否进行天降金币
    private HeavenData:{ing:boolean,time:number} = {ing:false,time:null};

    onLoad () {

        util.initHeavenPool();

        let item:cc.Node = cc.instantiate(this.heavenPre);
        this.pool = new pool(item,5);

        //天降金币
        // cc.game.on(NameTs.Game_Start,(res)=>{
        //     if(this.HeavenData.ing)return;
            this.HeavenData.time = util.GetHeavenTime();
            this.HeavenData.ing = true;
        // },this);

        util.getdataStr({
            url:UrlConst.heavenCoin_main,
            success:(res)=>{
                if(res && res.list){
                    if(!this.isValid){
                        return;
                    }

                    this.heavenNum = res.remainingTimes+res.list.length;
                    res.list.forEach(element => {
                        this.createHeaven(element);
                    });
                }
            },
            fail:()=>{

            }
        });
        //回收
        cc.game.on(NameTs.Game_Heaven_killed,(node)=>{
            this.pool.onEnemyKilled(node);
            this.existCoinNum--;
        },this);

        // this.createHeaven();

        // console.log(util.userData.heavenPool,'this.userData.heavenPool')
    

        

    }

    start () {

    }

    /**
     * 添加金币监听
     * @param dt 
     */
    HeavenMonitor(dt){
        if(util.levelState!==gameState.start||this.heavenNum<=0)return;
        if(this.HeavenData.ing){
            this.HeavenData.time-=dt;
            // console.log(this.HeavenData.time,'this.HeavenData.time')
            if(this.HeavenData.time<0){
                this.HeavenData.time = util.GetHeavenTime();
                this.createHeaven();
            }
        }
    }

    /**
     * 创建天降金币
     * @param data {id:numberm,coin:number}
     */
    createHeaven(data?:{id:number,point:number}){
        //超过12个就886
        if(this.existCoinNum>=12)return;

        //预加载金币信息流
        if(!util.adPreObj[AdPosition.HeavenCoinView]){
            util.preloadAd(AdPosition.HeavenCoinView,true);
        }

        let location:number = util.GetHeavenPlace();
        if(!location){
            //console.error("没有位置");
            TrackMgr.airborne_gold({
                activity_state: "金币下发",
                distribution_status: false,
                failure_reasons: "没有位置"
            })
            return;
        }
        
        //占位置
        let successFn = (data)=>{
            if(util.checkHeavenPool(location)){
                location = util.GetHeavenPlace();
            }
            this.existCoinNum++;
            util.saveHeavenPool(location,data.id,data.point);
            this.pool.createEnemy(this.node,{no:location,data});
        }
        if(data){
            successFn(data);
        }else{
            util.saveHeavenPool(location,1,1);
            util.getdataStr({
                url:UrlConst.heavenCoin_get,
                success:(res)=>{
                    if(!this.isValid){
                        return;
                    }

                    util.saveHeavenPool(location,null);
                    if(res.id!==null){
                        successFn(res);
                        TrackMgr.airborne_gold({
                            activity_state: "金币下发",
                            distribution_status: true,
                        })
                    }else{
                        if(res.id==null&&res.distanceTime==null){
                            this.existCoinNum = 12;
                            util.saveHeavenPool(location,null);
                            return;
                        }
                        this.HeavenData.time = Math.floor(res.distanceTime/1000);
                        console.error("未到时间")
                        TrackMgr.airborne_gold({
                            activity_state: "金币下发",
                            distribution_status: false,
                            failure_reasons: "未到时间"
                        })
                    }
                },
                fail:(error)=>{
                    util.saveHeavenPool(location,null);
                    TrackMgr.airborne_gold({
                        activity_state: "金币下发",
                        distribution_status: false,
                        failure_reasons: error
                    })
                    console.error("错误："+error)
                }
            })
        };
        

    }


    /**
     * 
     * @param dt 
     */


    update (dt) {
        
        this.HeavenMonitor(dt);
    }


    
}
