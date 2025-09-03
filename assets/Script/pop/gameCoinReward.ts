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
export default class gameCoinReward extends baseTs {

    @property({type:cc.Label,displayName:"文字"})
    private rewardLabel:cc.Label = null;
    
    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;

    //多少个金币
    private coin:number = null;
    //
    private initData:any;


    onLoad () {

       
    }


    /**
     * 
     * @param data 数据
     */
    init(data){
        this.coin  = data.coin;
        this.rewardLabel.string = "+"+ this.coin;
        
    }

    start () {

    }

    /**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             .,..........................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
     * 获取
     */
    getBtn(e,res){
        
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Effect_coin,{node:e.target,value:this.coin,num:10});
        
        this.closePage();
    }
    
    onEnable() {   
        AdController.loadInfoAd(AdPosition.CoinRewardView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        
        if(util.adPreObj[AdPosition.CoinRewardView]){
            util.preloadAd(AdPosition.CoinRewardView,true);
        } 
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.CoinRewardView);
        //预加载金币信息流
        if(!util.adPreObj[AdPosition.CoinRewardView]&&util.getHeavenPool()>0){
            util.preloadAd(AdPosition.CoinRewardView,true);
        }
    }

    // update (dt) {}
}
