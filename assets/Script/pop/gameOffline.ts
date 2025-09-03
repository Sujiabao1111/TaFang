import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { customsInfo } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameOffline extends baseTs {


    @property({type:cc.Label,displayName:"获得金币"})
    private coinLabel:cc.Label = null;

    @property({type:cc.Label,displayName:"自己一共多少金币"})
    private coinAllLabel:cc.Label = null;

    @property({type:cc.Label,displayName:"兑换rmb"})
    private rmbLabel:cc.Label = null;

    @property({type:cc.Node,displayName:"勾选"})
    private videoIcon:cc.Node = null;

    // @property({type:cc.Node,displayName:"光"})
    // private light:cc.Node = null;


    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;

    private coin:number = null; //单倍
    private coin2:number = 0;//多倍

    private isVideo:boolean = true;
    start () {

        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();

    }

    /**
     * 初始化
     */
    init(){
       
        this.coin = util.userData.offlineIncome.reward;

        this.coin2 = util.userData.offlineIncome.multipleReward;

        this.coinLabel.string = "+"+this.coin2+"红包币";

        this.coinAllLabel.string = String(util.userData.coin);

        this.rmbLabel.string = "= "+util.userData.coin/10000+"元";

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "离线金币弹窗"
        });

    }


    onEnable() {
        AdController.loadInfoAd(AdPosition.OfflineView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度   
        // if(util.adPreObj[AdPosition.OfflineView]){
        //    util.preloadAd(AdPosition.OfflineView,true);
        // } 
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.OfflineView);
    }

    /**获取 */
    getBtn(){
        soundController.singleton.clickAudio();
        let coin:number = this.isVideo?this.coin2:this.coin;
        let successFn = ()=>{
            util.post({
                url: this.isVideo?UrlConst.getOfflineDouble:UrlConst.getOfflineCommon,
                success: (res) => {
                    if(!this.isValid){
                        return;
                    }

                    cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:coin,num:10});
                    AssistCtr.showToastTip("获得"+coin+"红包币");
                    this.closePage();
                    // this.showPage(pageTs.pageName.GameStart);
                    cc.game.emit(NameTs.Game_Start);
                },
                fail:(res)=>{
                    AssistCtr.showToastTip("领取失败！");
                    this.closePage();
                }
            });
        }
        if(this.isVideo){
            AdController.loadAd(AdPosition.Offline,()=>{
                successFn();
                // util.preloadAd(AdPosition.Offline);
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            });

            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "离线金币弹窗",
                ck_module:"翻倍领取",
                active_ad_hcdg:"激励视频"
            });
        }else{
            successFn();
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "离线金币弹窗",
                ck_module:"直接收下",
            });
        }
        


    }

    /**选择*/
    selectBtn(){

        soundController.singleton.clickAudio();

        this.isVideo = !this.isVideo;

        this.videoIcon.active = this.isVideo;

        this.coinLabel.string = "+"+(this.isVideo?this.coin2:this.coin)+"金币";
    }


    // update (dt) {}
}
