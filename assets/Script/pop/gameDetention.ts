import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameDetention extends baseTs {

    @property(cc.Node)
    feed_node: cc.Node = null;

    onEnable(){
       
    }

    onDisable(){
    }


    start () {

    }

    clickClose(){
        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: `挽留弹窗`,
            ck_module: "继续游戏"
        })

        this.closePage();
    }

    clickExit(){
        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: `挽留弹窗`,
            ck_module: "残忍离去"
        })

        XMSDK.exitGame();
        //退出时间
        util.setStorage(util.localDiary.offlineTime,new Date().getTime());
        XMSDK.trackUserProperties({
            synthesis_times_hcdg: util.userData.synthesis_All,
        });
        util.userData.synthesis_All = 0;
    }

    
}
