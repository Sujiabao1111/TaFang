import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gameState, propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pool from "../common/pool";
import UserData from "../data/userData";
import { t } from "../Language/LanguageData";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";
import turret from "./turret/turret";

//#region 炮台 炮台 炮台 炮台 炮台
const { ccclass, property } = cc._decorator;

@ccclass
export default class turretBox extends baseTs {

    private turretPool: pool; //对象池

    @property({ displayName: "炮塔", type: cc.Prefab })
    private turretPre: cc.Prefab = null;

    private isOpenAuto: boolean = false;//是否启动

    //合成时间
    private autoTime: number = 1;

    //是否拿起
    private isTouch: boolean = false;

    public get _userData(): UserData {
        return util.userData;
    }

    onLoad() {

        // 监听创建炮台
        cc.game.on(NameTs.Game_Turret_Creator, res => {
            this.createTurret(res);
        }, this);

        // 监听销毁炮台
        cc.game.on(NameTs.Game_Turret_Killed, res => {
            if (res.node) {
                res.node.destroy();
                res.node.removeFromParent();
                res.node = null;
            }
            if (res.no || res.no === undefined) {
                cc.game.emit("turret_bg_" + res.no);
                cc.game.emit("turret_label_" + res.no);
            }
            // this.turretPool.onEnemyKilled(res);

        }, this);

        // 监听自动合成
        cc.game.on(NameTs.Tool_Effect_Name.Game_Prop_Atuo, () => {
            this.isOpenAuto = true;
        }, this);

        // 监听关闭自动合成
        cc.game.on(NameTs.Close_Prop_Atuo, () => {
            console.log("关闭自动合成");
            this.isOpenAuto = false;
        }, this);

        // 拿起
        cc.game.on(NameTs.Game_Turret_PickUp, (res) => {
            this.isTouch = true;
        }, this);

        // 放下
        cc.game.on(NameTs.Game_Turret_PutDown, (res) => {
            this.isTouch = false;
        }, this);

        //点击了空地宝箱
        cc.game.on(NameTs.Click_Empty_Box, (no) => {
            this.createTurret({ level: null, location: no, isFree: true }, true);
        }, this);


        // this.loadAny("prefab/turret/turret",cc.Prefab,(res)=>{            
        // this.turretPool = new pool(res,16);
        // console.log(this.turretPool,'turretPool')

        // });

        this.initTurret();

    }

    /**
     * 还原用户炮塔
     */
    initTurret() {
        if (util && this._userData && this._userData.pool) {
            console.log("还原用户炮塔数据", this._userData.pool);
            this._userData.pool.forEach(item => {
                if (item.level > 0) {
                    this.createTurret({ level: item.level, location: item.no, isFree: true });
                }
            });
        }

        //预加载解锁炮塔信息流
        // if(!util.adPreObj[AdPosition.UnlcokTurretView]&&util.chekPoolHaveTwo()){
        //     util.preloadAd(AdPosition.UnlcokTurretView,true);
        // }


    }

    /**
     * 创建炮塔
     * @param level 等级
     * @param location 位置
     */
    createTurret(data: { level: number, location: number, isFree: boolean } = { level: null, location: null, isFree: false }, isClickEmptyBox = false) {
        let level: number = data.level;
        let location: number = data.location;

        if (this._userData.product <= 0 && !data.isFree) {
            AssistCtr.showToastTip(t('tips.InsufficientEnergy'));
            return;
        }

        let loaction = location || util.checkPool(); //看看是哪个

        if (loaction == null) {
            AssistCtr.showToastTip(t('tips.noEmptySpace'));
            this.scheduleOnce(() => {
                AssistCtr.showToastTip(t('tips.noEmptySpace2'));
            }, 0.5)
            return;
        }

        // 如果有就直接等级没有就随机
        level = level || util.getBuyRandomLevel();
        if (!data.isFree) util.addProduct(-1);
        this._userData.buyCount += 1;
        util.savePool(loaction, level);
        if (!data.isFree) cc.game.emit(NameTs.Game_Buy_update);
        let item: cc.Node = cc.instantiate(this.turretPre);
        item.getComponent(item.name).init({ level: level, no: loaction });
        item.setParent(this.node);

        // this.turretPool.createEnemy(this.node,{level:level,no:loaction});      

        if (isClickEmptyBox) {
            item.scale = 0.6;
            cc.tween(item).to(0.08, { scale: 1.1 }).to(0.04, { scale: 1 }).start();

        }
    }


    /**开启自动合成 */
    /***************自动合成炮台*********** */
    openAuto() {

        // if(!this._userData.prop[propType.auto-1].use){
        //     this.unscheduleAllCallbacks();
        //     return;
        // }

        let arr = util.GetTurretAuto();
        if (!arr) return;
        let node1: cc.Node = util.GlobalMap.get("turret_" + arr[0].no);
        if (!node1) return;
        let node2: cc.Node = util.GlobalMap.get("turret_" + arr[1].no);
        if (!node2) return;
        let node2Pos: cc.Vec2 = cc.v2();
        if (node2.getPosition) {
            node2Pos = node2.getPosition();
        }
        node1.zIndex = 99;

        cc.tween(node1).to(.2, { x: node2Pos.x, y: node2Pos.y }).call(() => {
            node1.getComponent(turret).GetType(arr[1].no);
        }).start();

    }

    update(dt) {
        if (this.isOpenAuto && !this.isTouch && util.levelState == gameState.start) {
            this.autoTime -= dt;
            if (this.autoTime < 0) {
                this.autoTime = 0.5; // 合成时间
                this.openAuto();
                cc.game.emit(NameTs.Game_Turret_Creator);
            }
        }
    }


}
