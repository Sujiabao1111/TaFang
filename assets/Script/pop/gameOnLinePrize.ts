import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameOnLinePrize extends baseTs {

    @property(cc.Node)
    node_gold:cc.Node = null;

    @property(cc.Label)
    lable_addGold:cc.Label = null;

    @property(cc.Node)
    feed_node: cc.Node = null;

    @property(cc.Sprite)
    private titleSpr:cc.Sprite = null;

    @property(cc.SpriteFrame)
    private titleSprFrame:Array<cc.SpriteFrame> = [];

    @property(cc.Node)
    btnCommon:cc.Node = null;

    @property(cc.Node)
    btnNode:cc.Node = null;

    @property(cc.Node)
    btn_get:cc.Node = null;

    @property({type:cc.Label,displayName:"倍数金币"})
    private lable_addGold2:cc.Label = null;
    
    @property({type:cc.Node,displayName:"倍数"})
    private multipleNode:cc.Node = null;

    private addGold = 0;        

    private isClickGet = false;    //是否点击了领取

    onLoad(){
        
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3,{angle:10}).to(.2,{angle:0})
        ).start();
    }

    clickDouble(){
        if(this.isClickGet){
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(() => {
            this.isClickGet = false;
        }, 2);

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: "在线时长弹窗",
            ck_module:"双倍领取",
            active_ad_hcdg:"激励视频"
        })

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "在线时长翻倍成功弹窗",
        })

        AdController.loadAd(AdPosition.VideoOnLinePrize, (res) => {
            // if(this.addGold){
                this.addGold = this.addGold * 2;
            //     this.lable_addGold.string = "+"+this.addGold+"红包币";
            // } 

            // this.showGetBtn();
            // if(this.titleSprFrame&&this.titleSprFrame[1]){
            //     this.titleSpr.spriteFrame = this.titleSprFrame[1];
            // }

            this.clickGet();
        }, () => {
            AssistCtr.showToastTip("加载视频失败，请稍后！");
        })               
    }

    clickCommon(){
        if(this.isClickGet){
            return;
        }
        this.isClickGet = true;
        this.scheduleOnce(() => {
            this.isClickGet = false;
        }, 2);

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: "在线时长弹窗",
            ck_module:"普通领取"
        })        
        this.clickGet();
    }

    clickGet(){
        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: "在线时长弹窗",
            ck_module:"收下"
        })       

        cc.game.emit(NameTs.Game_Effect_coin, { node: this.node_gold, value: this.addGold,num:10});
        util.addTermCoin(this.addGold);
        this.closePage();
    }

    init(data){
        if(data){
            this.lable_addGold.string = `+${data.point}`+"红包币";
            this.addGold = data.point;
            this.lable_addGold2.string = data.point*2+"";
            
        }    
        else{
            this.lable_addGold.string = "";
            this.addGold = 0;
        }    
    }

    showGetBtn(){    
        if(this.btnNode){
            this.btnNode.active = false;  
        }   
        if(this.btn_get){
            this.btn_get.active = true;
        }     
    }

    onEnable(){
        AdController.loadInfoAd(AdPosition.InfoGameOnLinePrize, 636, this.feed_node);//636:feedNode信息流容器节点的宽度

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg:"在线时长弹窗"
        })

        this.titleSpr.spriteFrame = this.titleSprFrame[0];
        if(this.btnNode){
            this.btnNode.active = true;
        }
        this.btnCommon.active = false;
        this.scheduleOnce(() => {
            if(this.node) this.btnCommon.active = true;     
        }, 3);

        this.btn_get.active = false;                
    }

    onDisable(){    
        AdController.hideInfoAd(AdPosition.InfoGameOnLinePrize);        
    }

}
