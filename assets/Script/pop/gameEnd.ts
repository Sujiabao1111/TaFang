import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { customsInfo } from "../common/faceTs";
import NameTs from "../common/NameTs";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameEnd extends baseTs {


    @property({type:cc.Label,displayName:"关卡"})
    private customLabel:cc.Label = null;

    @property({type:cc.Label,displayName:"重玩按钮label"})
    private againLabel:cc.Label = null;

    
    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;

    // onLoad () {}
    //重来时间
    private time:number = 3;

    start () {

    }

    /**初始化 */
    init(){
        let customs:customsInfo = util.userData.customs;
        this.customLabel.string = "关卡"+customs.big+"-"+customs.small;
        this.againLabel.string =  "重来("+this.time+")";
        this.schedule(()=>{
            this.time -=1;
            if(this.time==0){
                this.closeBtn();
                return;
            }
            this.againLabel.string =  "重来("+this.time+")";
        },1);

        TrackMgr.AppGamedate({
            is_challenge_suc: true,
            game_level_hcdg: "第"+util.userData.customs.big+"关",
            level_hcdg:"第"+util.userData.customs.small+"波",
            game_time: util.gameTime+"s",     
            use_tool:String(util.gamePropNum), 
        });
    }

    /**
     * 关闭页面
     */
    closeBtn(){
        soundController.singleton.clickAudio();
        this.unscheduleAllCallbacks();
        this.closePage();
        cc.game.emit(NameTs.Game_Again);
    }

    onEnable() {
        AdController.loadInfoAd(AdPosition.GameFailView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.GameFailView);
    }


    // update (dt) {}
}
