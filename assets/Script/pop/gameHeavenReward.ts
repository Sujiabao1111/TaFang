import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gameNumerical } from "../common/faceTs";
import NameTs from "../common/NameTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameHeavenReward extends baseTs {

    @property({type:cc.Label,displayName:"文字"})
    private rewardLabel:cc.Label = null;
    
    @property({type:cc.Node,displayName:"倍数"})
    private multipleNode:cc.Node = null;

    
    @property({type:cc.Label,displayName:"倍数金币"})
    private lable_addGold2:cc.Label = null;
    
    @property({type:cc.Node,displayName:"放弃领取"})
    private closeBtnNode:cc.Node = null;
    
    // @property({type:cc.Node,displayName:"视频icon"})
    // private videoIcon:cc.Node = null;
    
    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;

    @property({type:cc.Node,displayName:"直接领取B"})
    private get_node:cc.Node = null;
    
    @property({type:cc.Node,displayName:"直接领取A"})
    private get_node2:cc.Node = null;

    //多少个金币
    private coin:number = null;
    //剩余次数
    private heavenNum:number = null;
    //是否需要看视频 
    private isVideo:boolean = false;
    //
    private initData:any;

    private item:cc.Node;
    private no:number;

    private isClickGet = false;    //是否点击了领取

    private heavenItem:cc.Node;

    onLoad () {

        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();

        this.scheduleOnce(()=>{

            if(util.checkTestB(NameTs.heaven_coin_test)){
                this.closeBtnNode.active = true;
            }else{
                this.get_node2.active = true;
            }

        },gameNumerical.closeTime);

        
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3,{angle:10}).to(.2,{angle:0})
        ).start();
    }


    /**
     * 
     * @param data 数据
     */
    init(data){
        if(data && data.data){
            this.initData = data.data;
            this.coin = this.initData.point;
            this.rewardLabel.string = "+"+this.coin+"红包币";
    
            this.lable_addGold2.string = this.coin*10+"";

            this.heavenItem = data.item||this.node;

            // this.isVideo = util.heavenClickNum==3;

            // if(this.isVideo){
                
            // }
    
            // this.videoIcon.active = this.isVideo;

            this.isVideo = data.isVideo?true:false;
            this.get_node.active = !this.isVideo;
            this.closeBtnNode.getParent().active = this.isVideo;

            
        }    
        if(!util.adPreObj[AdPosition.HeavenCoin]){
            util.preloadAd(AdPosition.HeavenCoin);
        }
        TrackMgr.airborne_gold({
            activity_state: "金币奖励弹窗",
        })

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "空降金币"
        })

        if(util.checkTestB(NameTs.heaven_coin_test)){
            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "空投金币"+(this.isVideo?"":"不")+"需看视频弹窗（B用户）"
            })
        }
        this.item = data.item;
        this.no = data.no;     
        util.heavenTouch = false;  

        if(!this.initData.id||this.initData.id=="")
        {
            console.error("该空降金币没有id，给予消除");
            util.saveHeavenPool(this.no,null);
            cc.game.emit(NameTs.Game_Heaven_killed,this.item);
        }
        

    }

    start () {

    }

    /**
     * 获取
     */
    getBtn(e,res){
        if(this.isClickGet){
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(() => {
            this.isClickGet = false;
        }, 2);


        let num:number = Number(res);

        soundController.singleton.clickAudio();

        let coin:number = this.coin*(num==1?10:1);

        let successFn = ()=>{
            cc.game.emit(NameTs.Game_Effect_coin,{node:this.heavenItem,value:coin,num:10});
            util.addTermCoin(coin);
            this.closePage();
            util.heavenClickNum++;
            util.saveHeavenPool(this.no,null);
            cc.game.emit(NameTs.Game_Heaven_killed,this.item);
            this.SendPost();
        }
        if(util.checkTestB(NameTs.heaven_coin_test)){
            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "空投金币"+(num==1?"":"不")+"需看视频弹窗（B用户）"
            });

            
        } 
        if(num==1){
            AdController.loadAd(AdPosition.HeavenCoin,()=>{
                successFn();
                TrackMgr.airborne_gold({
                    activity_state: "点击「视频icon领取金币」按钮",
                });
                if(util.adPreObj[AdPosition.HeavenCoin]){
                    util.preloadAd(AdPosition.HeavenCoin);
                }
                if(util.checkTestB(NameTs.heaven_coin_test)){
                    util.existVideoCoinNum--;
                }
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降金币",
                ck_module:"翻倍领取",
                active_ad_hcdg:"激励视频"
            });

            if(util.checkTestB(NameTs.heaven_coin_test)){
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "空投金币需看视频弹窗（B用户）",
                    ck_module:"领取",
                    active_ad_hcdg:"激励视频"
                });
            } 
            
        }else{
            successFn();
            TrackMgr.airborne_gold({
                activity_state: "点击「领取金币」按钮",
            })
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降金币",
                ck_module:"收下",
            }); 
            if(util.checkTestB(NameTs.heaven_coin_test)){
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "空投金币不需看视频弹窗（B用户）",
                    ck_module:"直接领取",
                });
            }
        }
        
    }

    /**
     * 关闭
     */
    closeBtn(){
        soundController.singleton.clickAudio();
        this.closePage();
        TrackMgr.airborne_gold({
            activity_state: "点击「放弃奖励」按钮",
        })

        if(util.checkTestB(NameTs.heaven_coin_test)){
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "空投金币需看视频弹窗（B用户）",
                ck_module:"关闭",
            });
        }
        // this.SendPost();

    }

    /**发送金币 */
    SendPost(){
        if(this.initData){
            util.getdataStr({
                url:UrlConst.heavenCoin_receive,
                data:{id:this.initData.id},
                success:()=>{
                    console.log("领取成功,"+UrlConst.heavenCoin_receive)
                },
                fail:()=>{
                    console.log("失败了,"+UrlConst.heavenCoin_receive)
                }
            });
        }
    }

    
    onEnable() {   
        AdController.loadInfoAd(AdPosition.HeavenCoinView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
        
        if(util.adPreObj[AdPosition.HeavenCoinView]){
            util.preloadAd(AdPosition.HeavenCoinView,true);
        } 
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.HeavenCoinView);
        //预加载金币信息流
        if(!util.adPreObj[AdPosition.HeavenCoinView]&&util.getHeavenPool()>0){
            util.preloadAd(AdPosition.HeavenCoinView,true);
        }
    }

    // update (dt) {}
}
