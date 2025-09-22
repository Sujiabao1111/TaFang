import { log } from "console";
import AStar from "../base/AStart";
import baseTs from "../base/baseTs";
import { gamePass, gameState, monsterInfo } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import pool from "../common/pool";
import UserData from "../data/userData";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import { Tools } from "../util/Tools";
import util from "../util/util";


//#region 怪兽 怪兽 怪兽 怪兽 怪兽

const { ccclass, property } = cc._decorator;

@ccclass
export default class monsertBox extends baseTs {


    @property({ displayName: "怪兽", type: cc.Prefab })
    private monsertPre: cc.Prefab = null;


    /**寻路算法 */
    private AStar: AStar;

    /**行走路线 */
    private walkData: any = { id: null, data: null };

    // private pool:pool; //对象池


    private isCome: boolean = false;

    public get _userData(): UserData {
        return util.userData;
    }

    onLoad() {

        this.AStar = new AStar();

        // this.loadAny("prefab/monster/monster",cc.Prefab,(res)=>{
        //     this.pool = new pool(res);
        // });


        //监听销毁
        cc.game.on(NameTs.Game_Monster_Killed, res => {
            if (res.node) {
                util.levelMonsterNum--;
                // 击杀怪物加金币
                // if (res.coin > 0) {
                //     cc.game.emit(NameTs.Game_Effect_coin, { node: res.node, value: res.coin, noMusic: true });
                //     util.addTermCoin(res.coin);
                // }

                res.node.destroy();
                res.node.removeFromParent();
                res.node = null;
                this.nextLevel();
            }
        }, this);

        // 加载下一关
        cc.game.on(NameTs.Game_Load_Monster, () => {
            this.loadNextMonster();
        }, this);

        // 重玩
        cc.game.on(NameTs.Game_Again, () => {
            this.clearAllMonster();
            // this._userData.customs.small = (this._userData.customs.small - 1 < 1) ? 1 : (this._userData.customs.small - 1);
            // console.log(this._userData.customs.small, 'this._userData.customs.small')
            cc.game.emit(NameTs.Game_View_CustomsUpdata);
            this.loadNextMonster();
        }, this);

    }

    private async nextLevel() {
        if (util.levelMonsterNum <= 0 && util.levelState == gameState.start) {
            console.log("打完了,准备加载下一关");
            util.levelState = gameState.end;
            this._userData.resistAttackTimes = 1;
            util.getnowmapdata();
            cc.game.emit(NameTs.Game_Task_Progress);
            let res = await util.saveCustomLevel();
            if (res.IsSuccess) {
                if (res.IsUp) {
                    cc.game.emit(NameTs.Game_End, gamePass.success);
                } else {
                    cc.game.emit(NameTs.Game_End, gamePass.smallSuccess);
                }
            }
        }
    }

    /**
     * 初始化
     */
    init() {
        // 获取地图数据
        let mapData = util.GetCustomsMap();
        //初始化某些数据
        util.levelMonsterArr = [];
        util.levelMonsterNum = 0;
        util.MonsterMap.clear();

        /**行走路线 */
        this.AStar.init(mapData.map, mapData.xLen, mapData.yLen);
        this.AStar.FindPoint(res => {
            if (!res) {
                console.error("道路不通")
                return;
            }
            this.walkData = { id: mapData.id, data: res };
            this.loadMonster();
        });



    }

    start() {
    }

    /**
     * 加载当前关卡怪兽数据
    */
    loadMonster() {
        this.isCome = true;

        //拷贝一份防止属性串改
        let monsterData = Tools.deepClone(util.GetCustomsMonsterInfo());

        let monsterArr: any[] = monsterData;
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



        monsterArr = Tools.randomArr(monsterArr);
        //设置结束条件（怪兽的数量）
        util.levelMonsterNum = monsterArr.length;
        util.levelState = gameState.start;
        let zIndex: number = monsterArr.length;

        for (let i = 0; i < monsterArr.length; i++) {
            let monster: monsterInfo = util.GetMonsterIdData(monsterArr[i]);
            zIndex--;
            let isLast: boolean = (i == monsterArr.length - 1);
            this.createMonster(monster, i, zIndex, isLast);
        }

        this.scheduleOnce(() => {
            this.isCome = false;
        }, 0.2);
    }

    /**
     * 创建怪兽
     * @param data 怪兽数据
     * @param id 第几个
     * @param zIndex 层级
     */
    createMonster(data: monsterInfo, id: number, zIndex: number, isLast: boolean) {
        // this.pool.createEnemy(this.node,{data,walk:this.walkData.data,id});
        let item: cc.Node = cc.instantiate(this.monsertPre);
        item.getComponent(item.name).init({ data, walk: this.walkData.data, id, isLast });
        item.setParent(this.node);
        item.zIndex = zIndex;
    }


    /**
     * 加载下一关怪兽
     * @param id 地图id
     */
    loadNextMonster() {
        if (this.isCome) return;
        let mapData = util.GetCustomsMap();
        if (this.walkData.id && this.walkData.id == mapData.id) {
            this.loadMonster();
            return;
        }
        this.init();
    }

    /**
     * 清除所有
     */
    clearAllMonster() {
        cc.game.emit(NameTs.Game_Monster_clearAll);
    }


}
