import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import PageManage from "../PageManage";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";

export interface kingPaoPressData {
    percent: number,                //进度百分比
    process: number,                //任务进度
    processTarget: number,          //任务总目标
    status:number,                  //任务状态：0：无状态；1：打卡任务；2:签到任务；3：通关任务；4：看视频任务
    sign:boolean,                   //当是打卡任务的时候适用，是否打卡
}


const { ccclass, property } = cc._decorator;

@ccclass
export default class gameKingPaoProgress extends baseTs {

    @property(cc.Node)
    img_videoIcon: cc.Node = null;

    @property(cc.Node)
    lable_btnType: cc.Node = null;

    @property(cc.RichText)
    lable_progress: cc.RichText = null;

    @property(cc.RichText)
    lable_progressTip: cc.RichText = null;

    kingPaoPressData:kingPaoPressData = null;            

    start() {

    }

    onEnable(){
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: `百万分红`
        })
    }

    init(data:kingPaoPressData) {
        this.kingPaoPressData = data;        
        this.img_videoIcon.active = false;
        this.lable_btnType.x = 0;

        if(data.status == 1){
            this.lable_progress.string = `<color=#BB420E>累计打卡${data.processTarget}天(</c><color=#669E00>${data.process}</color><color=#BB420E>/${data.processTarget})</color>`
            this.img_videoIcon.active = true;
            this.lable_btnType.x = 29;
            this.lable_btnType.getComponent(cc.Label).string = `打卡`;

            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "打卡任务弹窗"
            })
        }        
        else if(data.status == 2){
            this.lable_progress.string = `<color=#BB420E>累计签到${data.processTarget}天(</c><color=#669E00>${data.process}</color><color=#BB420E>/${data.processTarget})</color>`;
            this.lable_btnType.getComponent(cc.Label).string = `去签到`;

            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "签到任务弹窗"
            })
        }
        else if(data.status == 3){
            this.lable_progress.string = `<color=#BB420E>通过${data.processTarget}关(</c><color=#669E00>${data.process}</color><color=#BB420E>/${data.processTarget})</color>`;
            this.lable_btnType.getComponent(cc.Label).string = `去闯关`;

            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "通关任务弹窗"
            })
        }
        else if(data.status == 4){
            this.lable_progress.string = `<color=#BB420E>累计观看视频${data.processTarget}个(</c><color=#669E00>${data.process}</color><color=#BB420E>/${data.processTarget})</color>`
            this.lable_btnType.getComponent(cc.Label).string = `去完成`;

            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: `看${data.processTarget}个视频任务弹窗`
            })
        }
        else{
            this.closePage();
            return;
        }
        this.lable_progressTip.string = `<color=#D26C41>即可增加</c><color=#F92222>${data.percent}%</color><color=#D26C41>进度</color>`
    }

    updateData(){
        XMSDK.getdataStr({
            url: UrlConst.kingPaoProgress,
            onSuccess: res => {
                if (res.code === 0 && res.data) {
                    if(!this.isValid){
                        return;
                    }

                    this.init(res.data);
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

    clickOk(){
        if(this.kingPaoPressData){
            if(this.kingPaoPressData.status != 4){
                TrackMgr.AppDialogClick_hcdg({                
                    dialog_name_hcdg: `${this.lable_btnType.getComponent(cc.Label).string}任务弹窗`,
                    ck_module: `${this.lable_btnType.getComponent(cc.Label).string}`
                })    
            }
            else{
                TrackMgr.AppDialogClick_hcdg({                
                    dialog_name_hcdg: `看500视频任务弹窗弹窗`,
                    ck_module: `去完成`
                })    
            }

            

            if(this.kingPaoPressData.status == 1){                
                AdController.loadAd(AdPosition.kingTaskSign, (res) => {
                    if(this && this.kingPaoPressData){
                        XMSDK.post({
                            url: UrlConst.kingPaoOpen,
                            data: {
                                status: this.kingPaoPressData.status
                            },
                            onSuccess: res => {
                                if (res.code === 0) {
                                    if(!this.isValid){
                                        return;
                                    }

                                    AssistCtr.showToastTip(`今日打卡成功!明日再来哦~`);
                                    this.closePage();     
                                    cc.game.emit(NameTs.Game_KingPaoTask_Update);
                                }
                                else {
                                    if(res){
                                        AssistCtr.showToastTip(res.message);
                                    }   
                                }
                            },
                            onFail: err => {
                
                            }
                        }
                        )
                    }
                }, () => {
                    AssistCtr.showToastTip("加载视频失败，请稍后！");
                })     
                TrackMgr.AppDialogClick_hcdg({
                    dialog_name_hcdg: "打卡任务弹窗",
                    ck_module:"打卡",
                    active_ad_hcdg:"激励视频"
                });
            }
            else if(this.kingPaoPressData.status == 2){
                cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameSign);
                this.closePage();
            }
            else{
                this.closePage();
                if(PageManage.singleton.findPage(pageTs.pageName.GameKingPao)){
                    PageManage.singleton.closePage(pageTs.pageName.GameKingPao, false);
                }                              
            }
        }
    }

    clickClose() {
        if(this.kingPaoPressData.status != 4){
            TrackMgr.AppDialogClick_hcdg({                
                dialog_name_hcdg: `${this.lable_btnType.getComponent(cc.Label).string}任务弹窗`,
                ck_module: "关闭"
            })
    
        }
        else{
            TrackMgr.AppDialogClick_hcdg({                
                dialog_name_hcdg: `看500视频任务弹窗弹窗`,
                ck_module: `关闭`
            }) 
        }

        this.closePage();
    }
}
