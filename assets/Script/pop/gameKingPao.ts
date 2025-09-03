import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import Marquee from "../model/Marquee";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

export interface kingPaoTask {
    achieve: number	                    //0:未完成 1:完成
    id: number                          //主键
    process: number                     //进度情况        
    processTarget: number	            //进度目标
    status: number	                    //任务状态：0：无状态；1：签到任务；2：通关任务；3：看视频任务
    type: number	                    //任务类型： 0：炮王进度任务 1：炮王合成任务 2：炮王200兑换任务
    title: string
}

export interface marquee{
    msg:string,
    time:number
}

export interface kingPaoData {
    taskList:Array<kingPaoTask>
    turretKingRedEnvelopeDetailDTO:{
        bonusPerCapita:number,
        createDate:string,
        todayReceive:number,
        total:number,
        yesterdayRedEnvelope:number
    }
    marquee:Array<marquee>
}


const {ccclass, property} = cc._decorator;

@ccclass
export default class gameKingPao extends baseTs {

    @property(cc.Node)
    ruleNode:cc.Node = null;

    @property(Marquee)
    marquee:Marquee = null;

    @property(cc.Label)
    lable_shareMoney:cc.Label = null;

    @property(cc.Label)
    lable_dayMoney:cc.Label = null;

    @property(cc.Label)
    lable_dayNum:cc.Label = null;

    @property(cc.Label)
    lable_goNum:cc.Label = null;    

    @property(cc.Node)
    kingTaskContent:cc.Node = null;        

    @property(cc.Node)
    KingTaskItem:cc.Node = null;

    private kingPaoData:kingPaoData = null;    

    onLoad(){
        cc.game.on(NameTs.Game_KingPaoTask_Update, this.updateData, this);
    }

    onEnable(){
        TrackMgr.artillery_bonus({
            activity_state:`「百万分红」页面展示`
        })
    }

    start () {

    }

    init(data:kingPaoData){
        this.kingPaoData = data;        
        this.setData();  
        this.marquee.updateMarqueeList(data.marquee); 
    }

    setData(){
        let data = this.kingPaoData;        
        if(data){
            this.lable_shareMoney.string = data.turretKingRedEnvelopeDetailDTO.yesterdayRedEnvelope + "";
            this.lable_dayMoney.string = data.turretKingRedEnvelopeDetailDTO.bonusPerCapita + "";
            this.lable_dayNum.string = data.turretKingRedEnvelopeDetailDTO.total + "";
            this.lable_goNum.string = data.turretKingRedEnvelopeDetailDTO.todayReceive + "";   
        }     

        let kingTask = data.taskList;
        let childAll = this.kingTaskContent.children;
        let addNum = kingTask.length - childAll.length;
        if(addNum > 0){
            for(let i = 0; i < addNum; i++){
                let itemNode = cc.instantiate(this.KingTaskItem);
                itemNode.x = childAll[0].x;
                itemNode.y = childAll[0].y;
                itemNode.parent = this.kingTaskContent;
                itemNode.active = true;
            }
        }

        for(let i = 0; i < childAll.length; i++){
            let item = childAll[i];
            item.name = `${i}`;
            if(kingTask[i] && item){
                if(kingTask[i].achieve == 1){
                    item.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = `兑换`;
                }
                else if(kingTask[i].achieve == 2){
                    item.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = `已兑换`;
                }

                if(i == 0){
                    let strNum = (kingTask[i].process/kingTask[i].processTarget) * 100;                    
                    var y = String(strNum).indexOf(".") + 1;//获取小数点的位置                    
                    if(y > 0) {
                        strNum = Number(strNum.toFixed(2));
                    }

                    item.getChildByName(`lable_kindProgress`).getComponent(cc.RichText).string = `<color=#FFFFFF>${kingTask[i].title}:</c><color=#FCFF15>${strNum}%</color>`;                    
                    item.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = `加${30}%`;


                    XMSDK.getdataStr({
                        url: UrlConst.kingPaoProgress,
                        onSuccess: res => {
                            if (res.code === 0) {
                                if(!this.isValid){
                                    return;
                                }

                                if(res.data){
                                    item.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = `加${res.data.percent}%`;
                                }                                       
                            }
                            else {
                                if(res){
                                    AssistCtr.showToastTip(res.message);
                                }       
                            }
                        },
                        onFail: err => {
            
                        }
                    })           
                }                  
                else{
                    if(kingTask[i].type == 2){
                        item.getChildByName(`lable_kindProgress`).getComponent(cc.RichText).string = `<color=#FFFFFF>${kingTask[i].title}:</c><color=#FCFF15>${Math.floor(kingTask[i].process / util.userData.exchangeRate)}</color><color=#FFFFFF>/${Math.floor(kingTask[i].processTarget / util.userData.exchangeRate)}</color>`;
                    }
                    else{
                        item.getChildByName(`lable_kindProgress`).getComponent(cc.RichText).string = `<color=#FFFFFF>${kingTask[i].title}:</c><color=#FCFF15>${kingTask[i].process}</color><color=#FFFFFF>/${kingTask[i].processTarget}</color>`;
                    }                    
                }                         
                let process = (kingTask[i].process/kingTask[i].processTarget);
                if(process >= 1){
                    process = 1;
                }
                let proGressWidth = (item.getChildByName(`rectNode`).width - 7) * process;
                if(proGressWidth > 1 && proGressWidth < 25){
                    proGressWidth = 25;
                }                
                item.getChildByName(`rectNode`).getChildByName(`progressNode`).width = proGressWidth;                     
            }               
        }
    }

    clickGet(){
        TrackMgr.artillery_bonus({
            activity_state:`点击「领现金」按钮`
        })

        if(this.kingPaoData && this.kingPaoData.taskList){
            if(this.kingPaoData.taskList[0] && (this.kingPaoData.taskList[0].processTarget == this.kingPaoData.taskList[0].process)){
                AssistCtr.showToastTip(`人工审核中`)
            }
        }
        AssistCtr.showToastTip(`获得炮王可每日领取分红`)
    }

    updateData(){
        XMSDK.getdataStr({
            url: UrlConst.kingPaoTaskData,
            onSuccess: res => {
                if (res.code === 0 && res.data) {
                    if(!this.isValid){
                        return;
                    }

                    this.init(res.data);
                }
                else {

                }
            },
            onFail: err => {

            }
        })
    }

    clickTaskGo(e){
        let clickIndex = parseInt(e.target.parent.name);

        if(this.kingPaoData && this.kingPaoData.taskList){
            if(this.kingPaoData.taskList[clickIndex] && this.kingPaoData.taskList[clickIndex].achieve == 1){                
                XMSDK.post({
                    url: UrlConst.kingPaoGet,
                    data: {
                        id: this.kingPaoData.taskList[clickIndex].id
                    },
                    onSuccess: res => {
                        if (res.code === 0) {
                            if(!this.isValid){
                                return;
                            }

                            AssistCtr.showToastTip(`兑换成功，人工审核中`);
                            this.updateData();
                        }
                        else {
                            if(res){
                                AssistCtr.showToastTip(res.message);
                            }       
                        }
                    },
                    onFail: err => {
        
                    }
                })     
                return;      
            }
            else if(this.kingPaoData.taskList[clickIndex] && this.kingPaoData.taskList[clickIndex].achieve == 2){
                AssistCtr.showToastTip(`已兑换`);
                return;
            }            
        } 

        if(clickIndex == 0){                       
            cc.game.emit(NameTs.Game_Pop_Open, {
                name:pageTs.pageName.GameKingPaoProgress,
                data: {
                    clickTarget:0,
                    progress:`${this.kingPaoData.taskList[clickIndex].process}/${this.kingPaoData.taskList[clickIndex].processTarget}`
                },                
            });
        }
        else{
            if(this.kingPaoData && this.kingPaoData.taskList){
                if(this.kingPaoData.taskList[clickIndex]){
                    TrackMgr.artillery_bonus({
                        activity_state:`${this.kingPaoData.taskList[clickIndex].title}`,
                        button_hcdg:`${this.kingPaoData.taskList[clickIndex].title}按钮`,
                        task_progress:`${this.kingPaoData.taskList[clickIndex].process}/${this.kingPaoData.taskList[clickIndex].processTarget}`
                    })
                }
            } 
            this.closePage();
        }
    }

    clickClose(){
        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: `百万分红`,
            ck_module: `返回`
        })  

        this.closePage();
    }

    clickOpenProgress(){
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameKingPaoProgress);
    }

    clickCloseRule(){
        this.ruleNode.active = false;
    }

    clickOpenRule(e, index){
        if(index == 0){
            TrackMgr.artillery_bonus({
                activity_state:`「玩家说明」点击`
            })
        }
        else if(index == 1){
            TrackMgr.artillery_bonus({
                activity_state:`「获得分红炮王说明」点击`
            })
        }
        this.ruleNode.active = true;
    }
}
