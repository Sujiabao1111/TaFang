import { AssistCtr } from "../Assist/AssistCtr";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import PageManage from "../PageManage";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class taskItem extends cc.Component {

    @property({type:cc.Label,displayName:"标题"})
    private titleLabel: cc.Label = null;

    @property({type:cc.ProgressBar,displayName:"进度条"})
    private Progress: cc.ProgressBar = null;
    
    @property({type:cc.Label,displayName:"进度条文字"})
    private ProgressLabel: cc.Label = null;

    @property({type:cc.Label,displayName:"金币"})
    private coinLabel: cc.Label = null;
    
    @property({type:[cc.Node],displayName:"状态按钮"})
    private btnArr: cc.Node[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private initData:any = null;
    //类型
    private typeTask:number = 0;

    //收益
    private isEarnings:boolean = false;
    //转盘
    private isTurntable:boolean = false;

    start () {

    }

    /**
     * 初始化
     * @param data 数据
     * @param type 类型 0是每日 1成就
     */
    init(data,type){
        this.initData = data;
        this.typeTask = type;
        this.titleLabel.string = this.initData.taskTitle;

        if(this.initData.taskType==6&&this.typeTask==0){
            this.isEarnings = true;
        }else if(this.initData.taskType==3&&this.typeTask==0){
            this.isTurntable = true;
        }

        this.Progress.progress = this.initData.userTaskValue/this.initData.taskValue;
        
        this.ProgressLabel.string = this.initData.userTaskValue+"/"+this.initData.taskValue;
        this.ProgressLabel.node.active = this.Progress.progress<1;

        if(this.typeTask==0){
            this.coinLabel.string = this.initData.rewardValue;
        }else{
            this.coinLabel.string = this.initData.reward.rewardValue;
        }


        this.btnArr[0].active = this.btnArr[1].active =this.btnArr[2].active =this.btnArr[3].active =false;
        let showNum:number = 0;
        switch(this.initData.buttonType){
            case 1:
                showNum = 0;
                break;
            case 3:
                showNum = 1;
                break;
            case 4:
                showNum = this.typeTask==0?2:3;
                break;
        }
        this.btnArr[showNum].active = true;
    }


    /**按钮 */
    getBtn(event,res){
        soundController.singleton.clickAudio();
        //地址
        let url:string =this.typeTask==0?UrlConst.task_day_commonGet:UrlConst.achievement_commonGet;
        //金币数
        let coin:number  = this.typeTask==0?this.initData.rewardValue:this.initData.reward.rewardValue;
        let data:any = {};
        if(this.typeTask==0){
            data.id = this.initData.id;
        }else{
            data.taskId = this.initData.id;
        }
        TrackMgr.MissionPriceClick({
            mission_name: this.initData.taskTitle,
            mission_type: this.typeTask==0?"日常任务":"成就任务",
            mission_button: "领取",
            mission_coin: coin
        });


        if(this.initData&&this.initData.taskTitle){
            AdController.loadAd(AdPosition.TaskDayDoubleGet,()=>{
                if(this.initData){
                    util.getdataStr({
                        url,
                        data,
                        success:()=>{
                            if(!this.isValid){
                                return;
                            }
                            cc.game.emit(NameTs.Game_Task_updata);
                            console.log(this.typeTask,'this.initData.typeTask')
                            TrackMgr.finish_task({
                                mission_name: this.initData.taskTitle,
                                mission_type: this.typeTask==0?"日常任务":"成就任务",
                                mission_coin: coin
                            });
                            PageManage.singleton.closePage(pageTs.pageName.GameTask);
                            cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:coin,num:10});
                            AssistCtr.showToastTip("完成"+(this.typeTask==0?"日常":"成就")+"任务获得"+coin+"红包币");
                        },
                        fail:()=>{
                            AssistCtr.showToastTip("领取失败");
                        }
                    })
                }
                if(util.adPreObj[AdPosition.TaskDayDoubleGet]){
                    util.preloadAd(AdPosition.TaskDayDoubleGet);
                }
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }else{
            AssistCtr.showToastTip("领取失败");
            // this.closeBtn();
        }

        
        // PageManage.singleton.showPage(pageTs.pageName.GameTaskReward,{
        //     coin,
        //     url,
        //     data,
        //     typeTask:this.typeTask,
        //     taskTitle:this.initData.taskTitle
        // });
        // PageManage.singleton.closePage(pageTs.pageName.GameTask);
    }

    /**
     * 关闭
     */
    closeBtn(){
        soundController.singleton.clickAudio();
        PageManage.singleton.closePage(pageTs.pageName.GameTask);
        let successFn = (call?)=>{
            AdController.loadAd(AdPosition.TaskDayDoubleGet,()=>{
                call&&call();
                // cc.game.emit(NameTs.Game_Task_updata);
                if(util.adPreObj[AdPosition.TaskDayDoubleGet]){
                    util.preloadAd(AdPosition.TaskDayDoubleGet);
                }
            },()=>{
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            });
        }

        if(this.isEarnings){
            PageManage.singleton.showPage(pageTs.pageName.GameEarnings);
        }else if(this.isTurntable){
            PageManage.singleton.showPage(pageTs.pageName.GameGoldWheel);
        }else if(this.initData.taskType==8&&this.typeTask==0){
            //每日任务看视频补充炮塔
            successFn(()=>{
                util.sendTurretNum(); 
                util.productTurret(10);
                util.userData.GetTurretNum-=1;
                AssistCtr.showToastTip("获得10个炮塔！");
                util.setStorage(util.localDiary.GetTurretNum,util.userData.GetTurretNum);
                cc.game.emit(NameTs.Game_Effect_turret,{node:this.node,num:10,parent:null});
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "任务弹窗",
                    ck_module: "补充炮塔",
                    active_ad_hcdg:"激励视频"
                })
            });
        }else if(this.initData.taskType==4&&this.typeTask==0){
            //每日任务累计看视频
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "任务弹窗",
                ck_module: "累计15次激励视频",
                active_ad_hcdg:"激励视频"
            })
            successFn();
        }else if(this.initData.taskType==5&&this.typeTask==1){
            //打开漂浮宝箱
            PageManage.singleton.showPage(pageTs.pageName.GameTreasure);
        }else if(this.initData.taskType==6&&this.typeTask==1){
            //成就任务累计观看视频
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "成就弹窗",
                ck_module: this.initData.taskTitle,
                active_ad_hcdg:"激励视频"
            })
            successFn();
        }else{
            PageManage.singleton.closePage(pageTs.pageName.GameTask);
        }
        TrackMgr.MissionPriceClick({
            mission_name: this.initData.taskTitle,
            mission_type: this.typeTask==0?"日常任务":"成就任务",
            mission_button: "前往",
        })

        
    }
    

    // update (dt) {}
}
