import baseTs from "../../base/baseTs";
import { thingType } from "../../common/faceTs";
import NameTs from "../../common/NameTs";
import { UrlConst } from "../../server/UrlConst";
import XMSDK from "../../server/xmsdk_cocos/XMSDK";
import util from "../../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class poolBox extends baseTs {
    

    @property({type:cc.Prefab,displayName:"怪物道路"})
    private monsterWayPre:cc.Prefab = null;

    @property({type:cc.Prefab,displayName:"炮塔位置"})
    private PlaceItemPre:cc.Prefab = null;
    
    @property({type:cc.Prefab,displayName:"开始位置"})
    private startPointPre:cc.Prefab = null;

    @property({type:cc.Prefab,displayName:"结束位置"})
    private endPointPre:cc.Prefab = null;



    private turretNo:number=0;

    onLoad () {
        
        this.init();
    }

    start () {
        
        

    }

    public init(){

        this.loadMap();


    }
    //加载地图
    loadMap(){
        
        let mapData = util.GetCustomsMap();
        if(!mapData){
            console.error("加载地图失败");
            return;
        }
        //设置地图大小
        util.mapSize.width = cc.winSize.width;

        //设置格子大小
        util.mapSize.grid = util.mapSize.width/mapData.xLen;
        //设置初始格子位置
        util.mapSize.startGridPos = {
            x:-util.mapSize.grid*mapData.xLen/2+util.mapSize.grid/2,
            y:util.mapSize.grid*mapData.yLen/2-util.mapSize.grid/2
        }
        for(let i = 0;i<mapData.map.length;i++){
            let y:number = i;
            for(let j = 0;j<mapData.map[i].length;j++){
                let x:number = j;
				//console.log('make---------------------------:' +mapData.map[i][j] )
               this.loadType({x,y,type:mapData.map[i][j]});
            }
        }

        

    }

    

    /**
     * 加载类型
     */

    loadType(data:any){
        let str = {
            node:null,
            name:null,
            pos:null,
            data:null
        }

        if(data.type!==0){
            str.pos ={
                x:util.mapSize.startGridPos.x+data.x*util.mapSize.grid,
                y:util.mapSize.startGridPos.y-data.y*util.mapSize.grid
            }
        }
        
        switch(data.type){

            case 0:
                break;
            case 1://炮塔位置
                str.node = cc.instantiate(this.PlaceItemPre);
                str.name = "placeItem";
                this.turretNo++;
                util.levelMap.push({
                    x:data.x,
                    y:data.y,
                    type:thingType.turret,
                    no:this.turretNo,
                    pos:str.pos
                });
                str.data = {id:this.turretNo};

                // if(!util.checkNoExist(this.turretNo)){
                //     util.userData.pool.push({no:this.turretNo,level:-1,state:this.turretNo<9?1:0});
                // }
                break;
            case 2://开始位置
                // str.node = cc.instantiate(this.startPointPre);
                // str.name = "startPoint";
                break;
            case 3://结束位置
                // str.node = cc.instantiate(this.endPointPre);
                // str.name = "endPoint";
                break;
            case 4://怪物道路
                // str.node = cc.instantiate(this.monsterWayPre);
                // str.name = "monsterWay";
                break;
        }

        if(str.name){
            str.node.setPosition(
                util.mapSize.startGridPos.x+data.x*util.mapSize.grid,
                util.mapSize.startGridPos.y-data.y*util.mapSize.grid,
            )
            str.node.setParent(this.node);
            let nodeTs = str.node.getComponent(str.name);
            //初始化
            if(nodeTs)nodeTs.init&&nodeTs.init(str.data);
        }
        

    }

    


    // update (dt) {}
}
