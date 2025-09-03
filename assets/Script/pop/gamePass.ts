import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { customsInfo } from "../common/faceTs";
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
export default class gamePass extends baseTs {


    // @property({type:cc.Label,displayName:"倒计时Label"})
    // private djsLabel:cc.Label = null;

    @property({type:cc.Label,displayName:"关卡"})
    private customLabel:cc.Label = null;
    // private djsNum:number = 3;

    // @property({type:cc.Node,displayName:"光"})
    // private light:cc.Node = null;


    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;
    start () {

        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();

    }

    /**
     * 初始化
     */
    init(){

  
        let text = null;
        for(let i =0;i<util.behaviorRewardVoList.length;i++){
            let item = util.behaviorRewardVoList[i];
            console.log(item.rewardType,'item.rewardType')
            switch(Number(item.rewardType)){

                case 1:
                    text = "道具"
                    break;
                case 2:
                    text = "地块"
                    break;
                case 3:
                    text = "金币"
                    break;

            }

            text += text +"+"; 

        }
        
  
        
        let customs:customsInfo = util.userData.customs;
        this.customLabel.string = "关卡"+customs.big+"-"+customs.small;

        util.getdataStr({
            url:UrlConst.gameLevelIndex,
            success:(data)=>{
                if(!this.isValid){
                    return;
                }
console.log("设置er次----------------------------------------------------------" + JSON.stringify( data.mapConfig ) )
                //util.behaviorRewardVoList = data.behaviorRewardVoList;
               // util.mapConfig = data.mapConfig;
			   util.getnowmapdata();
                util.gameLevelPassRewardNextVoList = data.gameLevelPassRewardVoList||[];
                console.log(tool.GetArrData("type",4,data.behaviorRewardVoList).reward,data.behaviorRewardVoList,'tool.GetArrData("type",4,data.behaviorRewardVoList).reward')
                util.gameLevelPassRewardNextVoList.push({
                    rewardType:2,
                    rewardValue:tool.GetArrData("type",4,data.behaviorRewardVoList).reward
                });
            }
        })

    }

    /**
     * 关闭页面
     */
    close(){
        soundController.singleton.clickAudio();
        
        this.closePage();
        if(util.gameLevelPassRewardVoList.length>0){
            // for(let i = 0;i<util.gameLevelPassRewardVoList.length;i++){
                this.showPage(pageTs.pageName.GamePassReward);
            // }
        }else{
            // this.showPage(pageTs.pageName.GameStart);
            cc.game.emit(NameTs.Game_Start);
        }
        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: "通关成功",
            ck_module:"点击领取",
        })
    }

    onEnable() {
        AdController.loadInfoAd(AdPosition.GamePssView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        
        // if(util.adPreObj[AdPosition.GamePssView]){
        //     util.preloadAd(AdPosition.GamePssView,true);
        // }

        if(!util.adPreObj[AdPosition.GamePassCoinView]){
            util.preloadAd(AdPosition.GamePassCoinView,true);
        }

        if(!util.adPreObj[AdPosition.UnlcokPropView]){
            util.preloadAd(AdPosition.UnlcokPropView,true);
        }
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.GamePssView);
    }


    // update (dt) {}
}
