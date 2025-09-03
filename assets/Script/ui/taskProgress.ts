import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class taskProgress extends baseTs {

    
    @property(cc.ProgressBar)
    taskProgress:cc.ProgressBar = null; //任务进度条

    @property(cc.Label)
    tasklabel1:cc.Label = null; //任务标题

    @property(cc.Label)
    tasklabel2:cc.Label = null; //任务标题
    
    @property(cc.Node)
    hongbao:cc.Node = null; //红包


    private initData:any;

    private taskType:number = null;//任务类型

    onLoad () {

        cc.game.on(NameTs.Game_Task_Progress, ()=>{
            this.setState();
        });

        cc.game.on(NameTs.Game_Task_updata, ()=>{
            this.setState();
        });


    }

    /**
     * 展现任务
     */
    showGameTask(){
        this.showPage(pageTs.pageName.GameTask);

        if(this.initData){
            TrackMgr.taskbar_click({
                activity_state: this.initData.taskTitle,
                task_progress: this.taskProgress.progress>=1?"已完成":((this.initData.taskType==2?util.userData.localCompoundTime:this.initData.userTaskValue)+"/"+this.initData.taskValue),
                task_type: this.taskType==0?"日常任务":"成就任务",   
            });
    
            TrackMgr.AppClick({
                app_page_title: "首页",
                app_ck_module: "任务进度入口",
                app_exposure_type: "icon",
            });
        }
    }

    start () {
        
        this.setState();
        
        

    }

    /**设置状态 */

    setState(){


        // this.taskProgress.progress = 
        util.getFistTask((res,taskType)=>{

            this.taskProgress.node.getParent().active = res!==null;
            this.taskType = taskType;
            if(res){

                this.initData = res;

                this.taskProgress.progress = (res.taskType==2?util.userData.localCompoundTime:res.userTaskValue)/res.taskValue;

                this.tasklabel1.string = res.taskTitle+"(";

                this.tasklabel2.string = this.taskProgress.progress>=1?"已完成":((res.taskType==2?util.userData.localCompoundTime:res.userTaskValue)+"/"+res.taskValue);
                
                this.hongbao.stopAllActions();
                this.hongbao.x = 162;
                if(this.taskProgress.progress>=1){
                    cc.tween(this.hongbao).repeatForever(
                        cc.tween().by(.1,{x:5}).by(.2,{x:-10}).by(.1,{x:5}).delay(.3)
                    ).start();
                }
                
            }

        });

    }

    // update (dt) {}
}
