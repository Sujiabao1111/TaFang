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
export default class gamePassReward extends baseTs {

    @property({type:cc.Label,displayName:"文字"})
    private rewardLabel:cc.Label = null;

    @property({type:cc.Label,displayName:"道具文字"})
    private propLabel:cc.Label = null;
    
    // @property({type:cc.Node,displayName:"光"})
    // private light:cc.Node = null;
    
    @property({type:[cc.Node],displayName:"标题"})
    private titleArr:cc.Node[] = [];
    
    @property({type:cc.Sprite,displayName:"图片"})
    private pic:cc.Sprite = null;
    
    @property({type:[cc.SpriteFrame],displayName:"图片集合"})
    private picSpriteFrame:cc.SpriteFrame[] = [];
    
    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;

    //类型
    private typeNum:number = 1;
    //
    private initData:any;

    private xinxiliui:number;

    onLoad () {

        // cc.tween(this.light).repeatForever(
        //     cc.tween().to(1,{scale:1}).to(1,{scale:1.1})
        // ).start();

        
    }    
    /**
     * 
     */
    init(){
        this.initData = util.gameLevelPassRewardVoList[0];

        let text:string = null;
        let titleNum:number = 0;

      
        
        switch(Number(this.initData.rewardType)){

            case 1:
                titleNum = 2;
                let data = tool.GetArrData("type",this.initData.rewardKey,util.propConfig);
                text = data.explain;
                this.loadAny("texture/prop/prop"+data.type,cc.SpriteFrame,(res)=>{
                    this.pic.spriteFrame = res;
                });
                this.xinxiliui = AdPosition.UnlcokPropView;

                TrackMgr.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg:"恭喜获得新道具"
                })
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "恭喜获得新道具",
                    ck_module:"收下",
                })
                break;
            case 3:
                text = "";
                titleNum = 1;
                this.pic.spriteFrame =  this.picSpriteFrame[1];
                this.xinxiliui = AdPosition.UnlcokPlaceView;
                break;
            case 2:
                titleNum = 0;
                text = "+"+this.initData.rewardValue+"红包币";
                this.pic.spriteFrame =  this.picSpriteFrame[0];
                this.xinxiliui = AdPosition.GamePassCoinView;
                break;
        }
        console.log(this.xinxiliui,'this.xinxiliui')
        if(this.xinxiliui)AdController.loadInfoAd(this.xinxiliui, 636, this.feed_node);//636:feedNode信息流容器节点的宽度

        this.titleArr[titleNum].active = true;
        this.propLabel.node.active = this.rewardLabel.node.active = false;
        
        if(this.initData.rewardType&&this.initData.rewardType==1){
            this.propLabel.string = text;
            this.propLabel.node.active = true;
        }else{
            this.rewardLabel.string = text;
            this.rewardLabel.node.active = true;
        }

    }

    start () {

    }

    /**
     * 获取
     */
    getBtn(){

        soundController.singleton.clickAudio();
        // cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:this.coin});
        // util.addTermCoin(this.coin);

        switch(Number(this.initData.rewardType)){

            case 1:
                util.userData.prop[this.initData.rewardKey-1].num+=this.initData.rewardValue;
                break;
            case 3:
                util.unlockPlace();
                break;
            case 2:
                cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:this.initData.rewardValue,num:10});
                util.addTermCoin(this.initData.rewardValue);
                break;
        }
        util.gameLevelPassRewardVoList.splice(0,1);

        this.closeBtn();

        if(util.gameLevelPassRewardVoList.length>0){
            this.showPage(pageTs.pageName.GamePassReward);
        }else{
            for(let i = 0;i<util.gameLevelPassRewardNextVoList.length;i++){
                util.gameLevelPassRewardVoList.push(util.gameLevelPassRewardNextVoList[i]);
            }
            util.gameLevelPassRewardNextVoList = [];

            console.log(util.gameLevelPassRewardNextVoList,util.gameLevelPassRewardVoList,'util.gameLevelPassRewardNextVoList')
            // this.showPage(pageTs.pageName.GameStart);
            cc.game.emit(NameTs.Game_Start);
        }
    }

    /**
     * 关闭
     */
    closeBtn(){
        soundController.singleton.clickAudio();
        this.closePage();
        
    }

    onEnable() {
       
    }


    onDisable() {
        if(this.xinxiliui)AdController.hideInfoAd(this.xinxiliui);

        cc.game.emit(NameTs.Game_PropItem_Update);
    }

    // update (dt) {}
}
