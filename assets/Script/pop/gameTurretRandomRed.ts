
import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import TrackMgr from "../TrackMgr/TrackMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameTurretRandomRed extends baseTs {

    @property(cc.RichText)
    lable_prizeNum: cc.RichText = null;

    @property(cc.Node)
    btn_closeNode: cc.Node = null;

    @property(cc.Node)
    feed_node: cc.Node = null;

    prizeNum: number = 600;

    start() {
        this.btn_closeNode.active = false;
        this.scheduleOnce(() => {
            this.btn_closeNode.active = true;
        }, 3)
    }

    onLoad(){
        
    }

    clickDoubleGet() {
       

        // AdController.loadAd(AdPosition.turretRandomRed, (res) => {
            cc.game.emit(NameTs.Game_Effect_coin, { node:this.node,value: this.prizeNum,num:10});
            this.closePage();
            // if(util.adPreObj[AdPosition.turretRandomRed]){
            //     util.preloadAd(AdPosition.turretRandomRed);
            // } 
        // }, () => {
        //     this.closePage();
        //     AssistCtr.showToastTip(t("tips.reward_obtain_failed"));
            
        // })
    }

    clickClose(){
        this.closePage();       
        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: '合成炮塔奖励弹窗',
            ck_module: '放弃奖励'
        })
    }

    onEnable() {
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "合成炮塔奖励弹窗"
        })

        // AdController.loadInfoAd(AdPosition.turretRandomRedView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
    }


    onDisable() {
        // AdController.hideInfoAd(AdPosition.turretRandomRedView);        
    }
}
