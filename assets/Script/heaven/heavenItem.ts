import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import PageManage from "../PageManage";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
const {ccclass, property} = cc._decorator;

@ccclass
export default class heavenItem extends baseTs {


    private initData:any;
    //位置
    private no:number;
    
    /**是否需要视频 */
    private isVideo:boolean = true;
    
    /**数据 */
    init(data){
        this.initData = data.data;
        this.no = data.no;
        let pos:cc.Vec2 = cc.Vec2.clone(util.GetPlaceData(data.no).pos);
        this.node.setPosition(pos);
        this.node.opacity = 0;
        this.node.stopAllActions();
        cc.tween(this.node).by(0,{y:200}).by(.4,{y:-200,opacity:255}).repeatForever(
            cc.tween().delay(Math.random()).to(.5,{y:pos.y+10}).to(.5,{y:pos.y})
        ).start();


        this.checkTwoHeaven();

       console.log("位置："+this.no,","+(this.isVideo?"":"不")+"看视频红包");

    }

    start () {

    }

    /**
     * 点击
     */
    clickBtn(){        
        if(util.heavenTouch)return;
        util.heavenTouch = true;
        // console.log(PageManage.singleton.findPage(pageTs.pageName.GameHeavenReward),'PageManage.singleton.findPage(pageTs.pageName.GameHeavenReward)')
        // if(!PageManage.singleton.findPage(pageTs.pageName.GameHeavenReward)){
            soundController.singleton.clickAudio();
            
            this.showPage(pageTs.pageName.GameHeavenReward,{data:this.initData,no:this.no,item:this.node,isVideo:this.isVideo,node:this.node});
            TrackMgr.airborne_gold({
                activity_state: "金币点击",
            })   
        // }                                
    }
    /**
     * 检测是否有两个天降金币
     */
     checkTwoHeaven(){
        if(!util.checkTestB(NameTs.heaven_coin_test)){
            this.isVideo = true;
            return;
        }
        if(util.existVideoCoinNum<2){
            this.isVideo = Math.random()>.5;
            if(this.isVideo){
                util.existVideoCoinNum++;
            }
        }else{
            this.isVideo = false;
        }

    }

    // update (dt) {}
}
