import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { updateType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import tool from "../util/tool";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameGetTurret extends baseTs {

    @property({type:cc.Label,displayName:"数量"})
    private numLabel:cc.Label = null;

    // @property({type:cc.Node,displayName:"光"})
    // private light:cc.Node = null;

    @property({type:cc.Sprite,displayName:"炮塔身"})
    private turretBody:cc.Sprite = null;

    @property({type:cc.Sprite,displayName:"炮塔脚"})
    private turretFoot:cc.Sprite = null;
    
    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;
    
    /**金币 */
    private num:number = 0;

    private initData:any;

    private dataName:string = null;

    onLoad () {

    }

    start () {

        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
    }

    /**初始化 */
    init(data){
        let level:number = data.level||util.getBuyRandomLevel();
        
        this.initData = util.GetTurretData(level);
        this.num = data.num;
        this.numLabel.string = "+"+this.num;

        this.loadSprite("body",(res)=>{
            this.turretBody&&(this.turretBody.spriteFrame = res);
        })
        this.loadSprite("foot",(res)=>{
            if(this.turretFoot&&res){
                this.turretFoot.node.active = true;
                this.turretFoot.spriteFrame = res
            }else{
                this.turretFoot.node.active = false;
            }
            if(Number(this.initData.spriteFootY)>0){
                this.turretFoot&&(this.turretFoot.node.y = Number(this.initData.spriteFootY));
            }
        })
        this.dataName = data.name;
        if (this.dataName) {

            if (this.dataName == pageTs.pageName.GameUpgrade) {
                TrackMgr.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "获得炮塔弹窗（解锁新炮塔）",
                });
            } else {
                TrackMgr.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "获得炮塔弹窗（额外获得炮塔）",
                });
            }

        }

        // util.preloadAd(AdPosition.GetTurretView);
        // util.preloadAd(AdPosition.GetTurret);
    }


    /**
     * 获取
     */
    getBtn(){
        soundController.singleton.clickAudio();

        util.productTurret(this.num);
        cc.game.emit(NameTs.Game_Effect_turret,{node:this.node,num:this.num});

        
        AssistCtr.showToastTip("获得"+this.num+"个炮塔！");

        this.closePage();

        if(this.dataName){

            if(this.dataName==pageTs.pageName.GameUpgrade){
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "获得炮塔弹窗（解锁新炮塔）",
                    ck_module:"收下"
                });
            }else{
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "获得炮塔弹窗（额外获得炮塔）",
                    ck_module:"收下"
                });
            }

        }else{
            
            util.userData.GetTurretNum-=1;

            util.setStorage(util.localDiary.GetTurretNum,util.userData.GetTurretNum);
        }
    }

   /**
     * 加载图片
     */
    loadSprite(name:string,call:Function){
        cc.resources.load(this.initData[name],cc.SpriteFrame,(err,res:cc.SpriteFrame)=>{
            if(err){
                console.error("找不到该图片",err);
                return;
            }
            call(res);

        });
    }
    onEnable() {
        AdController.loadInfoAd(AdPosition.GetTurretView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.GetTurretView]){
        //     util.preloadAd(AdPosition.GetTurretView,true);
        // } 
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.GetTurretView);
    }
    // update (dt) {}
}
