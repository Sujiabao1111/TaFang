import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { customsInfo, updateType } from "../common/faceTs";
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
export default class gameSavingPot extends baseTs {

    @property({type:cc.Label,displayName:"金币"})
    private coinLabel:cc.Label = null;
    
    @property({type:cc.Label,displayName:"倒计时"})
    private timeLabel:cc.Label = null;

    @property({type:cc.Node,displayName:"领取按钮"})
    private getBtnNode:cc.Node = null;
    
    @property({type:cc.Node,displayName:"明日按钮"})
    private tomorrowBtnNode:cc.Node = null;
    
    @property({type:cc.Widget,displayName:"提现按钮widget"})
    walletBtnWidget:cc.Widget = null; //提现按钮

    @property({type:cc.Label,displayName:"钱包金币"})
    private walletLabel:cc.Label = null;

    private coin:number = 0;//随机金币
    
    onLoad(){

        //数据更新
        cc.game.on(NameTs.Game_View_UserDataUpdata,(res)=>{

            if(res==updateType.coin){
                let userData = util.userData;
                this.walletLabel.string = String(userData.coin);
            }

        },this);

        cc.game.emit(NameTs.Game_View_UserDataUpdata,updateType.coin);
        
        this.walletBtnWidget.top += Number(util.iphoneXTop);

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "存钱罐弹窗",
        });
        
    }

    start () {

    }

    /**初始化 */
    init(){

        util.post({
            url:UrlConst.savingPotIndex,
            success:(data)=>{
                let state:number = 0;
                if(data){
                    this.coin = data.point;
                    state = data.status;
                }
                if(state==0){
                    cc.game.emit(NameTs.Game_SavingPost_Icon);
                }
                this.tomorrowBtnNode&&(this.tomorrowBtnNode.active = state==0?true:false);
                this.getBtnNode&&(this.getBtnNode.active = state==1?true:false);
                this.setState();
            },
            fail:()=>{
                this.tomorrowBtnNode&&(this.tomorrowBtnNode.active = true);
                this.getBtnNode&&(this.getBtnNode.active = false);
                this.setState();
                AssistCtr.showToastTip("网络问题，请稍后！");
            }
        })

        
        
        
    }

    /**设置东西 */
    setState(){
        this.coinLabel.string = this.coin+"红包币";
        this.getBtnNode.stopAllActions();
        if(this.getBtnNode.active){
            cc.tween(this.getBtnNode).repeatForever(
                cc.tween().to(.5,{scale:1.1}).to(.5,{scale:1})
            ).start();
        }

        if(this.tomorrowBtnNode.active){
            this.unscheduleAllCallbacks();
            this.timeLabel.string ="倒计时 "+tool.formatData(5);
            this.schedule(()=>{
                this.timeLabel.string ="倒计时 "+ tool.formatData(5);
                if(tool.formatData(5)=="00:00:00"){
                    this.init();
                }
            },1);
        }
    }

    getBtn(){

        soundController.singleton.clickAudio();

        util.post({
            url:UrlConst.savingPotReceive,
            success:()=>{
                TrackMgr.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "存钱罐弹窗",
                    dialog_enter: "领取"
                });
                let savingPotIcon:cc.Node = util.GlobalMap.get("savingPot")||this.node;
                cc.game.emit(NameTs.Game_Effect_coin,{node:savingPotIcon,value:this.coin,num:10});
                cc.game.emit(NameTs.Game_SavingPost_Icon);
                this.tomorrowBtnNode.active = true;
                this.getBtnNode.active = false;
                this.setState();
                AssistCtr.showToastTip("获取"+this.coin+"红包币");
                this.closePage();
            },
            fail:()=>{
                AssistCtr.showToastTip("网络问题，请稍后！");
            }
        })

    }

    /**
     * 关闭页面
     */
    closeBtn(){
        soundController.singleton.clickAudio();
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "存钱罐弹窗",
            dialog_enter: "关闭"
        });
        this.closePage();
    }

    
    /**提现 */
    walletBtn(){
        TrackMgr.AppClick({
            app_page_title: "转盘",
            app_ck_module: "提现",
            app_exposure_type: "icon",
        })
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Pop_Open,pageTs.pageName.GameWallet);
    }

    // update (dt) {}
}
