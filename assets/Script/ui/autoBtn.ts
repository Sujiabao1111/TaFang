import { AssistCtr } from "../Assist/AssistCtr";
import { AdPosition } from "../common/AdPosition";
import { propType } from "../common/faceTs";
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
export default class autoBtn extends cc.Component {

    //时间
    @property(cc.Label)
    timeLabel: cc.Label = null;
    
    //锁
    @property(cc.Node)
    lockIcon: cc.Node = null;

    //手
    @property(cc.Node)
    hand: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    private initData:any;

    //是否锁着
    private isLock:boolean;

    private time:number = 10;

    onLoad () {

        cc.game.on(NameTs.Game_Start,res=>{
            if(util.userData.customs.big == this.initData.level&&this.isLock){
                util.userData.autoProp = 0;
                this.setState();
            }
        },this);
    }    

    /**设置状态 */
    setState(){
        if(util.userData.customs.big>=this.initData.level){
            this.node.color = cc.color(255,255,255,255);
            this.lockIcon.active  = false;
            this.isLock = false;
        }else{
            this.node.color = cc.color(107,107,107,255);
            this.lockIcon.active  = true;
            this.isLock = true;
        }
        
        if(util.userData.autoProp==0){
            this.hand.active = true;
            this.time = 10;
        }

    }

    start () {
        if(util && util.propData){
            for(let i = 0;i<util.propData.length;i++){
                let item = util.propData[i];
                if(item.propIssueDetailList[0].propsId==propType.auto){
                    this.initData = item.propIssueDetailList[0];
                    break;
                }
            }
            this.setState();
        }       
    }

    /**
     * 使用道具
     */
    useBtn(){
        soundController.singleton.clickAudio();
        TrackMgr.AppClick({
            app_page_title: "首页",
            app_ck_module: "自动合成按钮",
            app_exposure_type: "icon",
        });
        if(this.timeLabel.node.getParent().active){
            AssistCtr.showToastTip("正在使用中!");
            return;
        }
        if(this.isLock){
            AssistCtr.showToastTip(this.initData.level+"关解锁!");
            return;
        }
        let isVideo:boolean = true;
        if(util.userData.prop[propType.auto-1].num>0||util.userData.autoProp==0){
            isVideo = false
        }

        let successFn = ()=>{
            util.UseProp(this.initData.propsId);
            // this.setData();
            console.log("使用道具", this.initData.propsId);
            this.sendMTrack(true, isVideo);
            util.gamePropNum += 1;
            this.djs();
            util.userData.autoProp = 1;
            this.closeHand();
            util.setStorage(util.localDiary.autoProp,util.userData.autoProp);
        }
        console.log(isVideo,'isVideo')
        if(isVideo){
            AdController.loadAd(AdPosition.autoVideo,()=>{
                util.post({
                    url: UrlConst.getUseProp,
                    data: { propId: this.initData.propsId },
                    success: () => {
                        if(!this.isValid){
                            return;
                        }
                        successFn();
                    },
                    fail: () => {
                        this.sendMTrack(false, false);
                    }
                });
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }else{
            successFn();
        }

        

    }

    /**倒计时 */
    djs(){
        this.timeLabel.node.getParent().active = true;
        this.schedule(()=>{
            let time:number = util.userData.prop[propType.auto-1].time;
            if(!time){
                this.unscheduleAllCallbacks();
                this.timeLabel.node.getParent().active = false;
                return;
            }
            this.timeLabel.string = tool.changeTime(time);
        },1);

    }

    update(dt){

        if(this.time>0){
            this.time-=dt;
            if(this.time<0){
                this.time = 0;
                this.closeHand();
            }
        }
        
    }

    /**关闭手势 */
    closeHand(){
        this.hand.active = false;
        if(util.userData.autoProp==2){
            util.setStorage(util.localDiary.autoProp,2);
        }
    }

    /**是否 */
    sendMTrack(isSuccess: boolean, isVideo: boolean) {

        let data = tool.GetArrData("type", this.initData.propsId, util.propConfig);

        TrackMgr.tool_used({
            tool_name: data.name,
            use_success: isSuccess,
            is_video_tool: isVideo,
            level: "第" + util.userData.customs.big + "关",
        })

    }

    // update (dt) {}
}
