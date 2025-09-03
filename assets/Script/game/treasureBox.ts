import baseTs from "../base/baseTs";
import jsonSingleton from "../base/jsonSingleton";
import { gameState } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class treasureBox extends baseTs {

    @property({ type: cc.Node, displayName: "宝箱" })
    private treasure: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    //当前宝箱id
    private nowId: number = null;

    //宝箱时间
    private time:number = null;

    //金币
    private coin:number = 0;

    //剩余次数
    private treasureNum:number = 20;

    onLoad() {

        cc.game.on(NameTs.Game_Treasure_StartTime, () => {

            this.treasureNum -=1;

            this.treasure.active = false;

            this.time = 180;

        }, this);
//fix bug

        util.getdataStr({
            url:UrlConst.treasureBox_residual,
            success:res=>{
                if(!this.isValid){
                    return;
                }

                this.treasureNum = res.times;
                console.log(util.userData.noviceGuide,'util.userData.noviceGuide')
                if(util.userData.noviceGuide==-1){
                    this.time = 0;
                }
                // if(this.treasureNum>0&&this.time==0){
                //     this.flyAni();
                // }
            }
        });

        cc.game.on(NameTs.Game_Treasure_Show,()=>{

            this.time = 0;

        },this);

    }

    start() {

    }

    /**
     * 起飞
     */
    flyAni() {
        // XMSDK.post({
            // url: UrlConst.treasureBox_Isget,
        //     onSuccess: res => {
        //         if (res.code === 0 && res.data && res.data.showBox != 1) {       //领取过
        //             return null;
        //         }
        //         else {
        //             let data = jsonSingleton.singleton.getJson(NameTs.treasureData);
        //             let treasureId: number = null;
        //             for (let i = 0; i < data.length; i++) {
        //                 let item = data[i];
        //                 if (item.min <= util.userData.turretLevel && item.max > util.userData.turretLevel) {
        //                     treasureId = item.id;
        //                     break;
        //                 }
        //             }
        //             if (treasureId) {

        //                 let checkId = (id) => {
        //                     return id == treasureId;
        //                 }
        //                 let isExist: boolean = util.userData.haveTreasure.some(checkId);

        //                 if (isExist) {
        //                     return null;
        //                 } else {                            
        //                     if (this.nowId == treasureId) {
        //                         return;
        //                     }
        
        //                     this.nowId = treasureId;
                            console.log("漂浮宝箱出现")
                            this.treasure.active = true;
                            TrackMgr.airborne_treasure({
                                activity_state: "漂浮宝箱出现"
                            });
        //                 }                       
        //             }
        //         }
        //     },
        //     onFail: err => {

        //     }
        // }
        // )
        
        
        // let id:number = util.checkTreasureShow();
        // if(this.nowId==id){
        //     return;
        // }

        // this.nowId = id;

        // this.treasure.active = true;

        // TrackMgr.airborne_treasure({
        //     activity_state: "漂浮宝箱出现"
        // });
    }


    /**点击宝箱 */
    clickBtn() {
        // if(util.userData.noviceGuide!==-1)return;
        // this.treasure.active = false;

        soundController.singleton.clickAudio();

        this.showPage(pageTs.pageName.GameTreasure);
        TrackMgr.airborne_treasure({
            activity_state: "打开漂浮宝箱"
        });
    }


    update (dt) {
        if(this.time==null||this.treasureNum<=0)return;
        this.time -=dt;
        if(this.time<=0){
            this.time = null;
            this.flyAni();
        }
    }
}
