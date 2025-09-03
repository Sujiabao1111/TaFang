// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

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
        if(!util.adPreObj[AdPosition.turretRandomRed]){
            util.preloadAd(AdPosition.turretRandomRed);
        } 
    }

    clickDoubleGet() {
        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: '合成炮塔奖励弹窗',
            ck_module: '领取奖励',
            active_ad_hcdg:"激励视频"
        })

        AdController.loadAd(AdPosition.turretRandomRed, (res) => {
            cc.game.emit(NameTs.Game_Effect_coin, { node:this.node,value: this.prizeNum,num:10});
            util.addTermCoin(this.prizeNum);
            this.closePage();
            if(util.adPreObj[AdPosition.turretRandomRed]){
                util.preloadAd(AdPosition.turretRandomRed);
            } 
        }, () => {
            this.closePage();
            AssistCtr.showToastTip("加载视频失败，请稍后！");
            
        })
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

        AdController.loadInfoAd(AdPosition.turretRandomRedView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.turretRandomRedView);        
    }
}
