import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gameNumerical, propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import tool from "../util/tool";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gamePassReward2 extends baseTs {

    @property({type:cc.Label,displayName:"金币"})
    private rewardLabel1:cc.Label = null;

    
    @property({type:cc.Label,displayName:"翻倍金币"})
    private rewardLabel2:cc.Label = null;
    
    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;

    
    @property({type:cc.Node,displayName:"倍数"})
    private multipleNode:cc.Node = null;

    private coin:any;

    private xinxiliui:number;

    onLoad () {

        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3,{angle:10}).to(.2,{angle:0})
        ).start();
        
    }    
    /**
     * 
     */
    init(){
        //获取用户行为4
        this.coin = tool.GetArrData("type", 4, util.behaviorRewardVoList).reward||150;

        this.rewardLabel1.string = "+"+this.coin+"红包币";
        
        this.rewardLabel2.string = this.coin*10+"";

        AdController.loadInfoAd(AdPosition.GamePassCoinView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度

        

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "通关成功",
        });



        util.getdataStr({
            url:UrlConst.gameLevelIndex,
            success:(data)=>{
                if(!this.isValid){
                    return;
                }
				console.log("设置一次----------------------------------------------------------" + JSON.stringify( data.mapConfig ) )
               // util.behaviorRewardVoList = data.behaviorRewardVoList
			   util.getnowmapdata();
                util.mapConfig = data.mapConfig;
              
            }
        })

    }

    start () {

    }

    /**
     * 获取
     */
    getBtn(str,e){

        let isVideo:boolean = e==1;
        soundController.singleton.clickAudio();

        let successFn:Function  = ()=>{

            let coin:number = this.coin*(isVideo?10:1);

            cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:coin,num:10});
            util.addTermCoin(coin);
    
            this.closeBtn();
    
            cc.game.emit(NameTs.Game_Start);

            

        }

        if(isVideo){

            AdController.loadAd(AdPosition.GamePassReward,()=>{
                
                successFn();
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            });

            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "通关成功",
                ck_module:"多倍领取",
                active_ad_hcdg:"激励视频"
            }); 

        }else{
            successFn();
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "通关成功",
                ck_module:"领取",
            }); 
        }

        
        
        
    }

    /**
     * 关闭
     */
    closeBtn(){
        soundController.singleton.clickAudio();
        this.closePage();

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: "通关成功",
            ck_module:"点击领取",
        })
        
    }

    onEnable() {
       
    }


    onDisable() {

        AdController.hideInfoAd(AdPosition.GamePassCoinView);

    }

    // update (dt) {}
}
