import AStar from "../base/AStart";
import baseTs from "../base/baseTs";
import { gamePass, gameState, monsterInfo } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import pool from "../common/pool";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import tool from "../util/tool";
import util from "../util/util";


const {ccclass, property} = cc._decorator;

@ccclass
export default class monsertBox extends baseTs {


    @property({displayName:"怪兽",type:cc.Prefab})
    private monsertPre:cc.Prefab = null;


    /**寻路算法 */
    private AStar:AStar;

    /**行走路线 */
    private walkData:any = {id:null,data:null};
    
    // private pool:pool; //对象池
    

    private isCome:boolean = false;
    
    onLoad () {

        this.AStar = new AStar();

        // this.loadAny("prefab/monster/monster",cc.Prefab,(res)=>{
        //     this.pool = new pool(res);
        // });


        //监听销毁
        cc.game.on(NameTs.Game_Monster_Killed,res=>{
            if(res.node){
                util.levelMonsterNum --;
                if(res.coin>0){
                    cc.game.emit(NameTs.Game_Effect_coin,{node:res.node,value:res.coin,noMusic:true});
                    util.addTermCoin(res.coin);
                }
                // this.pool.onEnemyKilled(res.node);
                res.node.destroy();
                res.node.removeFromParent();
                res.node = null;
                // util.addCoin(res.coin);
                if(util.levelMonsterNum<=0&&util.levelState == gameState.start){
                    console.log("打完了,准备加载下一关");
                    
                    util.levelState = gameState.end;
                    util.sendTurretData();
                    util.userData.resistAttackTimes = 1;
					util.getnowmapdata();
                    cc.game.emit(NameTs.Game_Task_Progress);
                    TrackMgr.AppGamedate({
                        is_challenge_suc: true,
                        game_level_hcdg: "第" + util.userData.customs.big + "关",
                        level_hcdg: "第" + util.userData.customs.small + "波",
                        game_time: util.gameTime.toFixed(1) + "s",
                        use_tool: String(util.gamePropNum),
                    });

                    if(util.saveCustomLevel()){
                        cc.game.emit(NameTs.Game_End,gamePass.success);
                    }else{
                        // this.showPage(pageTs.pageName.GameStart);
                        cc.game.emit(NameTs.Game_Start);
                    }
                }
            }
        },this);

        //加载下一关
        cc.game.on(NameTs.Game_Load_Monster,()=>{
            this.loadNextMonster();
        },this);

        //重玩
        cc.game.on(NameTs.Game_Again,()=>{
            this.clearAllMonster();
            util.userData.customs.small = (util.userData.customs.small-1<1)?1:(util.userData.customs.small-1);
            console.log(util.userData.customs.small,'util.userData.customs.small')
            cc.game.emit(NameTs.Game_View_CustomsUpdata);
            this.loadNextMonster();
        },this);

    }

    /**
     * 初始化
     */
    init(){
        // 获取地图数据
        let mapData = util.GetCustomsMap();
        //初始化某些数据
        util.levelMonsterArr = [];
        util.levelMonsterNum = 0;
        util.MonsterMap.clear();

        /**行走路线 */
        this.AStar.init(mapData.map,mapData.xLen,mapData.yLen);
        this.AStar.FindPoint(res=>{

            if(!res){
                console.error("道路不通")
                return;
            }

            this.walkData = {id:mapData.id,data:res};

            this.loadMonster();

        });


        
    }

    start () {
    }

    /**
     * 加载当前关卡怪兽数据
    */
    loadMonster(){
        this.isCome = true;

        //拷贝一份防止属性串改
        let monsterData = tool.deepClone(util.GetCustomsMonsterInfo());

        

        let monsterArr:any[] = monsterData;
        //将怪兽放进数组
        // for(let i = 0;i<monsterData.length;i++){
        //     let item = monsterData[i];
        //     for(let j = 0;j<item.num;j++){
        //         monsterArr.push({level:item.level,hp:item.hp});
        //     }
        // }
        //数组打乱

        // monsterArr = [100101,100102,100103,100104,100105,100106,100107,100108,100109,100110,100111,100112,100113,100114,100115,100116]
        // monsterArr = [100102]



        monsterArr = tool.randomArr(monsterArr);
        //设置结束条件（怪兽的数量）
        util.levelMonsterNum = monsterArr.length;
        util.levelState = gameState.start;
        let zIndex:number = monsterArr.length;
        for(let i = 0;i<monsterArr.length;i++){
            let monster:monsterInfo = util.GetMonsterIdData(monsterArr[i]);
            zIndex--;
            this.createMonster(monster,i,zIndex);
        }

        this.scheduleOnce(()=>{
            this.isCome = false;
        },0.2);
    }

    /**
     * 创建怪兽
     * @param data 怪兽数据
     * @param id 第几个
     * @param zIndex 层级
     */
    createMonster(data:monsterInfo,id:number,zIndex:number){
        
        // this.pool.createEnemy(this.node,{data,walk:this.walkData.data,id});
        let item:cc.Node = cc.instantiate(this.monsertPre);
        item.getComponent(item.name).init({data,walk:this.walkData.data,id});
        item.setParent(this.node);
        item.zIndex = zIndex;
    }


    /**
     * 加载下一关怪兽
     * @param id 地图id
     */
    loadNextMonster(){
        if(this.isCome)return;
        let mapData = util.GetCustomsMap();
        if(this.walkData.id&&this.walkData.id==mapData.id){
            this.loadMonster();
            return;
        }
       
        this.init();
    }

    /**
     * 清除所有
     */
    clearAllMonster(){

        cc.game.emit(NameTs.Game_Monster_clearAll);

    }


    

    // update (dt) {}
}
