import Progress from "../../prefab/tool/script/Progress";
import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import NewPlayerTaskModel from "../model/NewPlayerTaskModel";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";


export interface withdrawTaskItemVoMap {
    buttonType: number	         //按钮类型: 1-进行中, 2-待领取, 3-已领取
    day: number                  //天数
    id: number                   //任务ID        
    progress: number	        //提现进度
    taskTitle: string	        //任务标题
    type: number	        //任务类型：1-完成任务, 2-通关, 3-获得星星, 4-观看广告视频, 5-使用道具, 6-抽手机, 7-金币转盘，9-合成任务
    taskValue: number	        //任务达标数量    
    userTaskValue: number       //用户当前达标数量
}

export interface newPlayerTask {
    totalProgress: number                  //提现总进度
    userCurrentProgress: number            //用户完成进度
    withdrawTaskItemVoMap: Object
    weChat: {                    //微信信息
        avatarUrl: string	     //头像
        nickname: string         //昵称
    }
    withdrawItemVo: {
        amount: string
        id: number
        point: number
    }
    currentDay: number            //当前天数
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameNewPlayerTask extends baseTs {

    @property(cc.Node)
    toggleContent: cc.Node = null;

    @property(Progress)
    progress: Progress = null;

    @property(cc.Label)
    lable_progress: cc.Label = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    newPlayerTaskModel = null;

    private newPlayerTask: newPlayerTask;
    private curClickTab = 0;

    private onceEnter = true;       //是否第一次进入

    onLoad() {
        //this.allNewPlayerTask = allNewPlayerTask;
        cc.game.on(NameTs.Game_NewPlayerTaskGet, this.updateProGress, this);
        cc.game.on(NameTs.bindWechatSuccess, this.wxSucFun, this);
    }

    onEnable() {
        TrackMgr.newcomer_mission({
            activity_state: `「新人任务」弹窗展示`
        })

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: `新人任务`
        })
    }

    init(data: newPlayerTask) {
        let toggleItems = this.toggleContent.children;
        for (let i = 0; i < toggleItems.length; i++) {
            toggleItems[i].getChildByName("lable_font").getComponent(cc.Label).string = `第${i + 1}天`;
        }

        if (data) {
            this.newPlayerTask = data;
            if(this.lable_progress){
                this.lable_progress.string = `提现进度:${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`;
            }
            this.progress.setProgressImage(this.newPlayerTask.userCurrentProgress / this.newPlayerTask.totalProgress);
            this.showRed(true);
        }
    }

    showRed(isLoc: boolean) {
        let toggleItems = this.toggleContent.children;
        let newPlayerTask = this.newPlayerTask.withdrawTaskItemVoMap;
        let onceRed = null;
        for (let i in newPlayerTask) {
            let taskTabOnAll = newPlayerTask[i];
            let isShowRed = false;
            let day = -1;

            for (let j = 0; j < taskTabOnAll.length; j++) {
                let taskItem = taskTabOnAll[j];
                if (taskItem && this.onceEnter) {
                    TrackMgr.newcomer_mission({
                        activity_state: `任务完成情况汇总上报`,
                        days: taskItem.day + "",
                        task_type: taskItem.taskTitle,
                        task_completion_status: taskItem.buttonType == 1 ? `待完成` : `完成`
                    })
                }

                if (taskItem) {
                    day = taskItem.day;
                    if (taskItem.buttonType == 2 && toggleItems[day - 1]) {
                        isShowRed = true;
                    }
                }
            }

            if (toggleItems[day - 1]) {
                toggleItems[day - 1].getChildByName("img_red").active = isShowRed;
                if (isShowRed && onceRed == null) {
                    onceRed = day - 1;
                }
            }
        }


        if (this.onceEnter) {
            if (isLoc && onceRed) {
                if (this.newPlayerTask.currentDay + 1 < onceRed) {
                    onceRed = 0;
                }
                this.clickTab(null, onceRed, isLoc);
            }
            else {
                this.clickTab(null, 0, isLoc);
            }
        }



        this.onceEnter = false;
    }

    clickTab(e, index, isLoc = false) {
        if (this.newPlayerTask && this.newPlayerTask.currentDay + 1 >= parseInt(index)) {
            let curClickTab = null;

            let tempColor = new cc.Color();
            let toggleItems = this.toggleContent.children;


            for (let i = 0; i < toggleItems.length; i++) {
                if (i == index) {
                    toggleItems[i].getChildByName("Background").active = false;
                    toggleItems[i].getChildByName("checkmark").active = true;
                    toggleItems[i].getChildByName("lable_font").color = tempColor.fromHEX("#BC1902")

                    curClickTab = i;

                    if (isLoc) {
                        this.toggleContent.x = -254 - 103 * i;
                        TrackMgr.newcomer_mission({
                            activity_state: `点击第x天按钮`,
                            red_dot: toggleItems[i].getChildByName("img_red").active,
                            days: `第${(parseInt(index) + 1)}天`,
                            task_show: true
                        })
                    }
                    else {
                        TrackMgr.newcomer_mission({
                            activity_state: `点击第x天按钮`,
                            red_dot: toggleItems[i].getChildByName("img_red").active,
                            days: `第${(parseInt(index) + 1)}天`,
                            task_show: false
                        })
                    }
                }
                else {
                    toggleItems[i].getChildByName("Background").active = true;
                    toggleItems[i].getChildByName("checkmark").active = false;
                    toggleItems[i].getChildByName("lable_font").color = tempColor.fromHEX("#D26C41")
                }
            }


            this.setTabData(curClickTab);
        }
        else {
            AssistCtr.showToastTip(`累积登录${parseInt(index ? index : 1)}天可开启`);
        }
    }

    setTabData(curClickTab) {
        if (curClickTab != null) {
            this.curClickTab = curClickTab;

            let tabTaskData = this.newPlayerTask.withdrawTaskItemVoMap[`${curClickTab + 1}`];
            AssistCtr.sortArray([2, 1, 3], "buttonType", tabTaskData);

            let addNum = tabTaskData.length - this.content.children.length;
            if (addNum > 0) {
                for (let i = 0; i < addNum; i++) {
                    let pre: cc.Node = cc.instantiate(this.newPlayerTaskModel);
                    pre.parent = this.content;
                }
            }
            else if (addNum < 0) {
                addNum = Math.abs(addNum);
                let maxChildrenIndex = this.content.children.length - 1;

                for (let i = 0; i < addNum; i++) {
                    if (maxChildrenIndex > 0 && this.content.children[maxChildrenIndex]) {
                        this.content.children[maxChildrenIndex].destroy();
                        maxChildrenIndex--;
                    }
                }
            }

            let preChild = this.content.children;
            for (let i = 0; i < preChild.length; i++) {
                preChild[i].getComponent(NewPlayerTaskModel).initData(tabTaskData[i]);
            }
        }
    }

    updateProGress(data) {
        if (this.newPlayerTask) {
			
            XMSDK.getdataStr({
                url: UrlConst.newPlayerTaskData,
                onSuccess: res => {
                    if (res.code === 0 && res.data) {
                        if(!this.isValid){
                            return;
                        }

                        this.newPlayerTask = res.data;
                        if(this.lable_progress){
                            this.lable_progress.string = `提现进度:${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`;
                        }
                        if (data) {
                            this.progress.setPercent(this.newPlayerTask.userCurrentProgress / this.newPlayerTask.totalProgress, data.target);
                        }
                        else {
                            this.progress.setProgressImage(this.newPlayerTask.userCurrentProgress / this.newPlayerTask.totalProgress);
                        }
                        this.setTabData(this.curClickTab);
                        this.showRed(true);
                    }
                    else {

                    }
                },
                onFail: err => {

                }
            }
            )
        }
    }

    clickGetMoney() {
        let self = this;
        if (this.newPlayerTask) {
            if (this.newPlayerTask.totalProgress == this.newPlayerTask.userCurrentProgress) {
                if (!this.newPlayerTask.weChat) {
                    XMSDK.authWechat();
                    TrackMgr.newcomer_mission({
                        activity_state: `点击「领现金」按钮`,
                        receiving_status: false,
                        withdrawal_progress: `提现进度:${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`
                    })
                }
                else {
                    XMSDK.post({
                        url: UrlConst.wallet_get,
                        data: {
                            id: self.newPlayerTask.withdrawItemVo.id,
                            type: 0
                        },
                        onSuccess: res => {
                            if (res.code === 0) {
                                if(!this.isValid){
                                    return;
                                }

                                AssistCtr.showToastTip(`你的提现已申请成功，稍后可在微信查看是否转账成功。`);
                                util.addCoin(-self.newPlayerTask.withdrawItemVo.point);
                                this.closePage();
                                cc.game.emit(NameTs.Game_CloseNewPlayerTask);

                                TrackMgr.newcomer_mission({
                                    activity_state: `点击「领现金」按钮`,
                                    receiving_status: true,
                                    withdrawal_progress: `提现进度:${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`
                                })
                            }
                            else {
                                let str = `${res.message}`;
                                AssistCtr.showToastTip(str);
                                TrackMgr.newcomer_mission({
                                    activity_state: `点击「领现金」按钮`,
                                    receiving_status: false,
                                    withdrawal_progress: `提现进度:${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`
                                })
                            }
                        },
                        onFail: err => {

                        }
                    })
                }
            }
            else {
                TrackMgr.newcomer_mission({
                    activity_state: `点击「领现金」按钮`,
                    receiving_status: false,
                    withdrawal_progress: `提现进度:${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`
                })

                AssistCtr.showToastTip("进度条未满,不能提现5元现金")
            }
        }
    }

    wxSucFun() {
        AssistCtr.showToastTip("绑定成功");
        this.updateProGress(null);
    }

    clickClose() {
        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: `新人任务`,
            ck_module: `关闭`
        })

        this.closePage();
    }
}
