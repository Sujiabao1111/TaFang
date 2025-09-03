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
export default class gameTreasure extends baseTs {

    @property({type:cc.ProgressBar,displayName:"进度条"})
    private progress:cc.ProgressBar = null;
    
    @property({type:cc.Node,displayName:"宝箱页面"})
    private content1:cc.Node = null;
    
    @property({type:cc.Node,displayName:"金币页"})
    private content2:cc.Node = null;

    @property({type:cc.Label,displayName:"金币label"})
    private coinLabel:cc.Label = null;

    @property({type:cc.Node,displayName:"关闭1"})
    private closeBtnNode1:cc.Node = null;
    
    @property({type:cc.Node,displayName:"关闭2"})
    private closeBtnNode2:cc.Node = null;
    
    @property({type:cc.Node,displayName:"金币"})
    private goldNode:cc.Node = null;
    
    @property({type:cc.Node,displayName:"金币Box"})
    private goldBox:cc.Node = null;

    
    @property({type:cc.Node,displayName:"手指"})
    private hand:cc.Node = null;

    @property({type:dragonBones.ArmatureDisplay,displayName:"宝箱骨骼"})
    private boxDragon:dragonBones.ArmatureDisplay = null;

    // @property({type:cc.ParticleSystem,displayName:"粒子"})
    // private Particle:cc.ParticleSystem = null;

    
    @property({type:cc.Node,displayName:"信息流"})
    private feed_node:cc.Node = null;
    
    /**金币 */
    private coin:number = 0;

    //宝箱id
    private id:number = null;

    //是否播放
    private isRuning:boolean = false;

    //点击次数
    private clickNum:number = 0;

    private isStart:boolean = false;

    onLoad () {
        this.progress.progress = 0;
        this.closeBtnNode1.active = this.closeBtnNode2.active = false;
        this.unscheduleAllCallbacks();

        
    }

    start () {
        this.scheduleOnce(()=>{
            this.closeBtnNode1.active = true;
        },gameNumerical.closeTime);

        
    }

    init(data){
        // this.id = data;
        

        this.isStart = true;

        TrackMgr.airborne_treasure({
            activity_state: "漂浮宝箱弹窗",
        })

        util.getdataStr({
            url:UrlConst.treasureBox_residual,
            success:res=>{
                if(!this.isValid){
                    return;
                }

                this.coin = res.coin;
                this.coinLabel.string ="+"+ this.coin+"红包币";
            }
        });

        //预加载宝箱
        if(!util.adPreObj[AdPosition.TreasureBox]){
            util.preloadAd(AdPosition.TreasureBox);
        }
        

    }

    /**
     * 点击
     */
    clickBtn(){
        soundController.singleton.clickAudio();
        this.progress.progress += .1;
        // this.Particle.resetSystem();
        this.createGold();
        this.boxDragon.playAnimation("shake-red",1);
        this.clickNum++;
        if(this.progress.progress>=1){
            this.isStart = false;
            this.content1.active = false;
            this.content2.active = true;
            this.scheduleOnce(()=>{
                this.closeBtnNode2.active = true;
            },gameNumerical.closeTime);

            TrackMgr.airborne_treasure({
                activity_state: "点击「砸开宝箱」按钮",
                button:this.clickNum,
            });
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降宝箱（未砸开）",
                ck_module:"狂点砸开",
            }); 
        }
        
    }

    /**产金币 */
    createGold(){

        let item:cc.Node = cc.instantiate(this.goldNode);
        item.active = true;
        item.setParent(this.goldBox);

    }

    /**
     * 关闭的
     */
    closeBtn(e,res){
        soundController.singleton.clickAudio();
        // util.saveTreasureData(this.id);
        this.closePage();
        TrackMgr.airborne_treasure({
            activity_state: "点击「放弃奖励」按钮",
            coin:this.coin,
            getcoin_status:false
        })

        if(res==0){
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降宝箱（未砸开）",
                ck_module:"残忍放弃",
            }); 
        }else{
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "空降宝箱（已砸开）",
                ck_module:"放弃领取",
            }); 
        }

        
    }

    /**
     * 增加金币
     */
    getBtn(){

        soundController.singleton.clickAudio();

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: "空降宝箱（已砸开）",
            ck_module:"领取1000红包币",
            active_ad_hcdg:"激励视频"
        });
        
        AdController.loadAd(AdPosition.TreasureBox,()=>{
            
            util.preloadAd(AdPosition.TreasureBox);
            // cc.game.emit(NameTs.Game_Treasure_StartTime);

            util.getdataStr({
                url:UrlConst.treasureBox_get2,
                success:res=>{
                    if(!this.isValid){
                        return;
                    }

                    if(res==null){
                        AssistCtr.showToastTip("宝箱还未到时间");
                        this.closePage();
                        return;
                    }
                    cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:this.coin,num:10});
                    AssistCtr.showToastTip("获得"+this.coin+"红包币");
                    util.addTermCoin(this.coin);
                    TrackMgr.airborne_treasure({
                        activity_state: "点击「领金币」按钮",
                        coin:this.coin
                    });
                    cc.game.emit(NameTs.Game_Treasure_StartTime);
                    this.closePage();
                }
            });
        }, () => {
            AssistCtr.showToastTip("加载视频失败，请稍后！");
        });

    }

    onEnable() {   
        AdController.loadInfoAd(AdPosition.TreasureBoxView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.TreasureBoxView);
    }
    
    update (dt) {

        if(this.isStart){
            this.progress.progress -= 0.003;
            if(this.progress.progress<0){
                this.progress.progress = 0;
            }
        }

    }
}
