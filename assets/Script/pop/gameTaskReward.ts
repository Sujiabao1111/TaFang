import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gameNumerical } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import PageManage from "../PageManage";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameTaskReward extends baseTs {

    @property({type:cc.Label,displayName:"文字"})
    private rewardLabel:cc.Label = null;
    
    // @property({type:cc.Node,displayName:"光"})
    // private light:cc.Node = null;
    
    @property({type:cc.Node,displayName:"放弃领取"})
    private closeBtnNode:cc.Node = null;
    
    // @property({type:cc.Node,displayName:"视频icon"})
    // private videoIcon:cc.Node = null;
    
    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;

    //多少个金币
    private coin:number = null;
    //
    private initData:any;



    onLoad () {

        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();

        this.scheduleOnce(()=>{

            this.closeBtnNode.active = true;

        },gameNumerical.closeTime);
    }


    /**
     * 
     * @param data 数据
     */
    init(data){
        this.coin  = data.coin;
        if(this.rewardLabel){
            this.rewardLabel.string = "+"+ this.coin+"红包币";
        }
        this.initData = data;
        if(!util.adPreObj[AdPosition.TaskDayDoubleGet]){
            util.preloadAd(AdPosition.TaskDayDoubleGet);
        }

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: (this.initData.typeTask==0?"日常任务":"成就任务")+ `红包待领取弹窗`,
        })

        
        console.log(this.initData,'this.initData')
        
    }

    start () {

    }

    /**
     * 获取
     */
    getBtn(e,res){
        
        soundController.singleton.clickAudio();

        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg:(this.initData.typeTask==0?"日常任务":"成就任务")+ `红包待领取弹窗`,
            ck_module: "领取",
            active_ad_hcdg:"激励视频"
        })
        if(this.initData&&this.initData.taskTitle){
            AdController.loadAd(AdPosition.TaskDayDoubleGet,()=>{
                if(this.initData){
                    util.getdataStr({
                        url:this.initData.url||(this.initData.typeTask==0?UrlConst.task_day_commonGet:UrlConst.achievement_commonGet),
                        data:this.initData.data,
                        success:()=>{
                            if(!this.isValid){
                                return;
                            }

                            cc.game.emit(NameTs.Game_Task_updata);
                            TrackMgr.finish_task({
                                mission_name: this.initData.taskTitle,
                                mission_type: this.initData.typeTask==0?"日常任务":"成就任务",
                                mission_coin: this.coin
                            });
                            TrackMgr.AppDialogClick_hcdg({                
                                dialog_name_hcdg: (this.initData.typeTask==0?"日常任务":"成就任务")+ `红包领取成功弹窗`,
                                ck_module: "领取",
                            })
                            TrackMgr.AppBuyProductDialog_hcdg({
                                dialog_name_hcdg: (this.initData.typeTask==0?"日常任务":"成就任务")+ `红包领取成功弹窗`,
                            })
                            PageManage.singleton.showPage(pageTs.pageName.GameCoinReward,{coin:this.coin});
                            this.closePage();
                        },
                        fail:()=>{
                            AssistCtr.showToastTip("领取失败");
                        }
                    })
                }
                if(util.adPreObj[AdPosition.TaskDayDoubleGet]){
                    util.preloadAd(AdPosition.TaskDayDoubleGet);
                }
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }else{
            AssistCtr.showToastTip("领取失败");
            this.closeBtn();
        }
        
    }

    /**
     * 关闭
     */
    closeBtn(){
        soundController.singleton.clickAudio();
        this.closePage();
        // this.SendPost();
        PageManage.singleton.showPage(pageTs.pageName.GameTask);
        // TrackMgr.MissionPriceClick({
        //     mission_name: this.initData.taskTitle,
        //     mission_type: this.initData.typeTask==0?"日常任务":"成就任务",
        //     mission_button: "放弃领取",
        //     mission_coin: this.coin
        // })
        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: (this.initData.typeTask==0?"日常任务":"成就任务")+ `红包待领取弹窗`,
            ck_module: "关闭"
        })
    }
    
    onEnable() {   
        AdController.loadInfoAd(AdPosition.TaskRewardView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        
        if(util.adPreObj[AdPosition.TaskRewardView]){
            util.preloadAd(AdPosition.TaskRewardView,true);
        } 
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.TaskRewardView);
        //预加载金币信息流
        if(!util.adPreObj[AdPosition.TaskRewardView]&&util.getHeavenPool()>0){
            util.preloadAd(AdPosition.TaskRewardView,true);
        }
    }

    // update (dt) {}
}
