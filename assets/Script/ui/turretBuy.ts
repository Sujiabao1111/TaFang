import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import tool from "../util/tool";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turretBuy extends baseTs {

    @property(cc.Node)
    touchNode:cc.Node = null; //用于拖动位置的
    
    @property(cc.Node)
    buyBtnNode:cc.Node = null; //购买按钮

    @property({displayName:"等级",type:cc.Label})
    levelLabel: cc.Label = null;
    
    
    @property({displayName:"视频炮塔",type:cc.Label})
    videoNum: cc.Label = null;
    
    @property({type:sp.Skeleton,displayName:"炮"})
    paoBody: sp.Skeleton = null;

    //接触时间
    private touchTime:number = 0;
    //是否在接触
    private isTouch:boolean = false;

    private level:number = null;

    private turretData:any;

    private turretNum:number = 0;

    onLoad () {

        this.setVideoNum();

        let initPos:cc.Vec2  = this.node.getPosition();
        this.node.on(cc.Node.EventType.TOUCH_START,()=>{
            TrackMgr.AppClick({
                app_page_title: "首页",
                app_ck_module: "炮塔",
                app_exposure_type: "banner",
            })
            this.touchTime = 0;
            this.isTouch = true;
            cc.tween(this.buyBtnNode).to(.1,{scale:1.1}).start();
            cc.tween(this.node).to(.1,{scale:1.1}).start();
        },this);
        

        
        //预加载空降炮塔信息流
        // if(!util.adPreObj[AdPosition.GetOtherTurretView]&&util.userData.product==5){
        //     util.preloadAd(AdPosition.GetOtherTurretView,true);
        // }

        // if(util.userData.product==0&&!util.adPreObj[AdPosition.GetTurretView]){
        //     util.preloadAd(AdPosition.GetTurretView,true);
        // }

        this.node.on(cc.Node.EventType.TOUCH_MOVE,(event)=>{
            if(util.userData.noviceGuide==1||util.userData.product==0)return;
            let movePos:cc.Vec2 = event.getDelta();
            this.node.x +=movePos.x;
            this.node.y +=movePos.y; 

        },this);

        this.node.on(cc.Node.EventType.TOUCH_END,(event)=>{
            soundController.singleton.clickAudio();
            if(util.checkTestB(NameTs.new_hand_test)){
                if(util.userData.noviceGuide==2){
                    cc.game.emit(NameTs.Game_Turret_Creator);
                    TrackMgr.rookie_process_2({
                        activity_state:"点击任意位置购买炮塔"
                    });
                    cc.game.emit(NameTs.Game_Novice_Open,3);
                    return;
                }
            }else if(util.userData.noviceGuide==1){
                cc.game.emit(NameTs.Game_Turret_Creator);
                cc.game.emit(NameTs.Game_Novice_Open,2);
                return;
            }
            if(util.userData.product==5&&Math.random()<.5&&util.userData.airborneCount>0){
                this.showPage(pageTs.pageName.GameGetOtherTurret,this.level);
                return;
            }else{
                console.log("不出现天降炮塔!")
            }
            
            //预加载空降炮塔信息流
            // if(!util.adPreObj[AdPosition.GetOtherTurretView]&&util.userData.product==6){
            //     util.preloadAd(AdPosition.GetOtherTurretView,true);
            // }

            if(util.userData.product==1){
                // if(!util.adPreObj[AdPosition.GetTurretView]){
                //     util.preloadAd(AdPosition.GetTurretView,true);
                // }
                this.setVideoNum();
            }

            if(util.userData.product==0&&util.userData.GetTurretNum>0){
                this.showPage(pageTs.pageName.GameGetVideoTurret,{num:this.turretNum});  
                return;
            }
            if(this.touchTime<.3){                
                cc.game.emit(NameTs.Game_Turret_Creator,{level:this.level});
            }else{
                let poolBox:cc.Node = this.touchNode;
                let pos:cc.Vec2 = this.node.getParent().convertToWorldSpaceAR(this.node.getPosition());
                pos = poolBox.convertToNodeSpaceAR(pos);
                util.checkTouchPool(pos,(num)=>{
                    if(num!==100&&num&&util.checkNoExist(num)){
                        cc.game.emit(NameTs.Game_Turret_Creator,{level:this.level,location:num});
                    }
                });
                
            }
            soundController.singleton.clickAudio();
            this.node.setPosition(initPos);
            cc.tween(this.buyBtnNode).to(.1,{scale:1}).start();
            cc.tween(this.node).to(.1,{scale:1}).start();
            TrackMgr.AppClick({
                app_page_title: "首页",
                app_ck_module: "放置炮塔",
                app_exposure_type: "banner",
            });
        },this);

        cc.game.on(NameTs.Game_Buy_update,()=>{

            this.setLevel();

        },this);

        this.setLevel();
    }

    start () {

    }
    

    /**
     * 更新炮塔
     */
    setLevel(){
        
        this.level = util.getBuyRandomLevel();
        this.levelLabel.string = String(this.level);

        //炮塔属性
        this.turretData = util.GetTurretData(this.level);

        // this.loadSprite("body",res=>{
        //     this.paoBody.spriteFrame = res;
        // });
        // this.loadSprite("foot",res=>{
        //     this.paoFoot.spriteFrame = res;
        // });

        
        this.loadSpine(this.paoBody,"pao");

    }

    update (dt) {

        if(this.isTouch){
            this.touchTime+=dt;
        }

    }

    /**
     * 设置视频炮塔数量
     */
    setVideoNum(){

        this.turretNum = tool.GetRandom(8,12);

        this.videoNum.string = "+"+this.turretNum;

    }

    /**
     * 加载图片
     */
    // loadSprite(name:string,call:Function){
    //     cc.resources.load("/texture/turret/"+name+"_"+this.level,cc.SpriteFrame,(err,res:cc.SpriteFrame)=>{

    //         if(err){
    //             console.error("找不到该图片",err);
    //             return;
    //         }
    //         call(res);

    //     });
    // }

    /**
     * 加载图片
     */
    loadSpine(spine:sp.Skeleton,name:string){

        //console.log(this.turretData,'name==========')

        cc.resources.load("spine/turret/"+this.turretData.DynamicResources+"/"+name+"/"+this.turretData.spineName,sp.SkeletonData, (error, sp:sp.SkeletonData) => {
            spine.skeletonData = sp;
            this.paoBody.node.y = Number(this.turretData.buyY);
        });

    }
}
