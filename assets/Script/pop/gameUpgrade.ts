import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameUpgrade extends baseTs {

    @property({type:cc.Label,displayName:"炮塔数量"})
    private turretNumLabel:cc.Label = null;

    // @property({type:cc.Node,displayName:"光"})
    // private light:cc.Node = null;

    @property({type:cc.Sprite,displayName:"炮塔身"})
    private turretBody:cc.Sprite = null;

    @property({type:cc.Sprite,displayName:"炮塔脚"})
    private turretFoot:cc.Sprite = null;

    
    @property({type:cc.Label,displayName:"等级"})
    private levelLabel:cc.Label = null;
    
    @property({type:cc.Label,displayName:"名字"})
    private nameLabel:cc.Label = null;
    
    
    @property({type:[cc.Node],displayName:"按钮"})
    private arrBtn:cc.Node[] = [];
    
    // @property({type:cc.Node,displayName:"倍数"})
    // private multipleNode:cc.Node = null;

    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;
    
    
    @property({type:cc.Node,displayName:"倍数"})
    private multipleNode:cc.Node = null;
    
    @property({type:cc.Label,displayName:"倍数金币"})
    private lable_addGold2:cc.Label = null;

    
    /**金币 */
    private coin:number = 1;
    /**原始数量 */
    private num:number = 5;

    private initData:any;

    onLoad () {

    }

    start () {

        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();
        
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3,{angle:10}).to(.2,{angle:0})
        ).start();
    }

    /**初始化 */
    init(data){

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "解锁新炮塔",
        });

        this.initData = util.GetTurretData(util.userData.turretLevel);

        if(this.initData.level==2){
            TrackMgr.rookie_process({
                activity_state :"首次解锁炮塔弹窗",
                synthesis_successful:true
            });
            if(util.checkTestB(NameTs.lock_turret_test)){
                util.addTermCoin(2800);
                this.coin = 2800;
            }else{
                this.coin = util.GetBehaviorRewardVo(1);
            }
            this.turretNumLabel.string  = "+"+this.coin+"红包币";
        }else{
            
            this.turretNumLabel.string  = "+"+this.num+"炮塔";
        }

        console.log(this.coin,'this.coin')

        
        
        //存合成次数和时间
        util.setStorage(util.localDiary.unlocking_time,util.userData.unlocking_time);

        
        this.levelLabel.string = "Lv."+this.initData.level;
        this.nameLabel.string = this.initData.name;

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

        util.sendTurretData();
        cc.game.emit(NameTs.Game_Buy_update);

        XMSDK.trackUserProperties({
            top_synthesis: util.userData.compoundTimes,
        });

        if(!util.adPreObj[AdPosition.UnlcokTurret]){
            util.preloadAd(AdPosition.UnlcokTurret);
        }

        this.arrBtn[0].active = util.userData.noviceGuide==2;
        this.arrBtn[1].active = this.arrBtn[2].active =  util.userData.noviceGuide!==2;
        
    }


    /**
     * 获取
     */
    getBtn(e,res){
        soundController.singleton.clickAudio();
        if(util.userData.noviceGuide==2){
            if(!util.checkTestB(NameTs.new_hand_test)){
                this.showPage(pageTs.pageName.GameGuide2,3);
            }
            cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:this.coin,num:5});
            util.addTermCoin(this.coin);
            util.sendTurretData();
            this.closePage();
            return;
        }

        let successFn = ()=>{
            let num:number = this.num*(res==1?2:1);
            cc.game.emit(NameTs.Game_Effect_turret,{node:this.node,num});
            util.productTurret(num);
            this.closePage();
            // this.showPage(pageTs.pageName.GameGetTurret,{num,name:pageTs.pageName.GameUpgrade}); 

            if(res == 1){
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "解锁新炮塔",
                    ck_module:"多倍领取",
                    active_ad_hcdg:"激励视频"
                }); 
            }
            else{
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "解锁新炮塔",
                    ck_module:"普通领取",                    
                }); 
            }
        }

        if(res==1){
            AdController.loadAd(AdPosition.UnlcokTurret,()=>{
                util.preloadAd(AdPosition.UnlcokTurret);
                successFn();
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }else{
            successFn();
        }

    }

   /**
     * 加载图片
     */
    loadSprite(name:string,call:Function){
        cc.resources.load(this.initData[name],cc.SpriteFrame,(err,res:cc.SpriteFrame)=>{

            if(err){
                console.error("找不到该图片",err);
            }
            call(res);

        });
    }
    onEnable() {
        AdController.loadInfoAd(AdPosition.UnlcokTurretView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        // if(util.adPreObj[AdPosition.UnlcokTurretView]){
        //     util.preloadAd(AdPosition.UnlcokTurretView,true);
        // }
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.UnlcokTurretView);
    }
    // update (dt) {}
}
