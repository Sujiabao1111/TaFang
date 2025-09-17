import Progress from "../../prefab/tool/script/Progress";
import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import { t } from "../Language/LanguageData";
import NewPlayerTaskModel from "../model/NewPlayerTaskModel";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";


export interface withdrawTaskItemVoMap {
    buttonType: number	        //按钮类型: 1-进行中, 2-待领取, 3-已领取
    day: number                 //天数
    id: number                  //任务ID        
    progress: number	        //提现进度
    taskTitle: string	        //任务标题
    type: number	            //任务类型：1-完成任务, 2-通关, 3-获得星星, 4-观看广告视频, 5-使用道具, 6-抽手机, 7-金币转盘，9-合成任务
    taskValue: number	        //任务达标数量    
    userTaskValue: number       //用户当前达标数量
    taskType: number           // 炮塔等级达到:0  观看视频:1  完成日常任务:2  累计获得金币:3
    taskTitleValue: number     // 任务标题值
}

export interface newPlayerTask {
    totalProgress: number                  //提现总进度
    userCurrentProgress: number            //用户完成进度
    withdrawTaskItemVoMap

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
    private toggleContent: cc.Node = null;

    @property(Progress)
    private progress: Progress = null;

    @property(cc.Label)
    private lable_progress: cc.Label = null;

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Prefab)
    private newPlayerTaskModel = null;

    private newPlayerTask: newPlayerTask;
    private curClickTab = 0;

    private onceEnter = true;       //是否第一次进入



    // 炮塔等级达到:0  观看视频:1  完成日常任务:2  累计获得金币:3


    private defaultData: newPlayerTask = {
        userCurrentProgress: 5,
        totalProgress: 100,
        withdrawTaskItemVoMap: {
            1: [
                { id: 1, taskType: 0, taskTitleValue: 10, buttonType: 3, taskTitle: "炮塔等级达到10级", taskValue: 10, userTaskValue: 21, progress: 5, day: 1, type: 1 },
                { id: 2, taskType: 1, taskTitleValue: 5, taskTitle: "观看视频5次", buttonType: 1, taskValue: 5, userTaskValue: 0, progress: 5, day: 1, type: 2 },
                { id: 3, taskType: 2, taskTitleValue: 1, taskTitle: "完成日常任务1个", buttonType: 2, taskValue: 1, userTaskValue: 6, progress: 5, day: 1, type: 3 },
                { id: 4, taskType: 3, taskTitleValue: 2000, taskTitle: "累计红包获得2000", buttonType: 2, taskValue: 2000, userTaskValue: 171428, progress: 10, day: 1, type: 4 }
            ],
            2: [
                { id: 5, taskType: 0, taskTitleValue: 20, taskTitle: "炮塔等级达到20级", buttonType: 2, taskValue: 20, userTaskValue: 21, progress: 5, day: 2, type: 1 },
                { id: 6, taskType: 1, taskTitleValue: 10, taskTitle: "观看视频10次", buttonType: 1, taskValue: 10, userTaskValue: 0, progress: 5, day: 2, type: 2 },
                { id: 7, taskType: 2, taskTitleValue: 5, taskTitle: "完成日常任务5个", buttonType: 2, taskValue: 5, userTaskValue: 6, progress: 5, day: 2, type: 3 },
                { id: 8, taskType: 3, taskTitleValue: 5000, taskTitle: "累计红包获得5000", buttonType: 2, taskValue: 5000, userTaskValue: 171428, progress: 10, day: 2, type: 4 }
            ],
            3: [
                { id: 9, taskType: 0, taskTitleValue: 25, taskTitle: "炮塔等级达到25级", buttonType: 1, taskValue: 25, userTaskValue: 21, progress: 2, day: 3, type: 1 },
                { id: 10, taskType: 1, taskTitleValue: 20, taskTitle: "观看视频20次", buttonType: 1, taskValue: 20, userTaskValue: 0, progress: 2, day: 3, type: 2 },
                { id: 11, taskType: 2, taskTitleValue: 15, taskTitle: "完成日常任务15个", buttonType: 1, taskValue: 15, userTaskValue: 6, progress: 2, day: 3, type: 3 },
                { id: 12, taskType: 3, taskTitleValue: 10000, taskTitle: "累计红包获得10000", buttonType: 2, taskValue: 10000, userTaskValue: 171428, progress: 10, day: 3, type: 4 }
            ],
            4: [
                { id: 13, taskType: 0, taskTitleValue: 30, taskTitle: "炮塔等级达到30级", buttonType: 1, taskValue: 30, userTaskValue: 21, progress: 2, day: 4, type: 1 },
                { id: 14, taskType: 1, taskTitleValue: 30, taskTitle: "观看视频30次", buttonType: 1, taskValue: 30, userTaskValue: 0, progress: 2, day: 4, type: 2 },
                { id: 15, taskType: 2, taskTitleValue: 20, taskTitle: "完成日常任务20个", buttonType: 1, taskValue: 20, userTaskValue: 6, progress: 2, day: 4, type: 3 },
                { id: 16, taskType: 3, taskTitleValue: 20000, taskTitle: "累计红包获得20000", buttonType: 2, taskValue: 20000, userTaskValue: 171428, progress: 5, day: 4, type: 4 }
            ],
            5: [
                { id: 17, taskType: 0, taskTitleValue: 35, taskTitle: "炮塔等级达到35级", buttonType: 1, taskValue: 35, userTaskValue: 21, progress: 2, day: 5, type: 1 },
                { id: 18, taskType: 1, taskTitleValue: 50, taskTitle: "观看视频50次", buttonType: 1, taskValue: 50, userTaskValue: 0, progress: 1, day: 5, type: 2 },
                { id: 19, taskType: 2, taskTitleValue: 30, taskTitle: "完成日常任务30个", buttonType: 1, taskValue: 30, userTaskValue: 6, progress: 1, day: 5, type: 3 },
                { id: 20, taskType: 3, taskTitleValue: 30000, taskTitle: "累计红包获得30000", buttonType: 2, taskValue: 30000, userTaskValue: 171428, progress: 5, day: 5, type: 4 }
            ],
            6: [
                { id: 21, taskType: 0, taskTitleValue: 40, taskTitle: "炮塔等级达到40级", buttonType: 1, taskValue: 40, userTaskValue: 21, progress: 2, day: 6, type: 1 },
                { id: 22, taskType: 1, taskTitleValue: 100, taskTitle: "观看视频100次", buttonType: 1, taskValue: 100, userTaskValue: 0, progress: 1, day: 6, type: 2 },
                { id: 23, taskType: 2, taskTitleValue: 40, taskTitle: "完成日常任务40个", buttonType: 1, taskValue: 40, userTaskValue: 6, progress: 1, day: 6, type: 3 },
                { id: 24, taskType: 3, taskTitleValue: 50000, taskTitle: "累计红包获得50000", buttonType: 2, taskValue: 50000, userTaskValue: 171428, progress: 5, day: 6, type: 4 }
            ],
            7:
                [
                    { id: 26, taskType: 1, taskTitleValue: 300, taskTitle: "观看视频300次", buttonType: 1, taskValue: 300, userTaskValue: 0, progress: 1, day: 7, type: 2 },
                    { id: 27, taskType: 2, taskTitleValue: 80, taskTitle: "完成日常任务80个", buttonType: 1, taskValue: 80, userTaskValue: 6, progress: 2, day: 7, type: 3 },
                    { id: 28, taskType: 3, taskTitleValue: 200000, taskTitle: "累计红包获得200000", buttonType: 1, taskValue: 200000, userTaskValue: 171428, progress: 2, day: 7, type: 4 }
                ]
        },
        withdrawItemVo: { id: 6, amount: "5", point: 50000 },
        currentDay: 133

    }


    onLoad() {
        //this.allNewPlayerTask = allNewPlayerTask;
        cc.game.on(NameTs.Game_NewPlayerTaskGet, this.updateProGress, this);
        cc.game.on(NameTs.bindWechatSuccess, this.wxSucFun, this);
    }



    init(data: newPlayerTask) {

        data = this.defaultData;

        let toggleItems = this.toggleContent.children;
        for (let i = 0; i < toggleItems.length; i++) {
            toggleItems[i].getChildByName("lable_font").getComponent(cc.Label).string = t('main.第_天', i + 1);
        }

        if (data) {
            this.newPlayerTask = data;
            if (this.lable_progress) {
                this.lable_progress.string = t("main.提现进度") + `: ${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`;
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

            this.newPlayerTask = this.defaultData;
            if (this.lable_progress) {
                this.lable_progress.string = `${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`;
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
    }

    clickGetMoney() {
        let self = this;
        if (this.newPlayerTask) {
            if (this.newPlayerTask.totalProgress == this.newPlayerTask.userCurrentProgress) {
                // if (!this.newPlayerTask.weChat) {
                //     XMSDK.authWechat();
                //     TrackMgr.newcomer_mission({
                //         activity_state: `点击「领现金」按钮`,
                //         receiving_status: false,
                //         withdrawal_progress: `提现进度:${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`
                //     })
                // }
                // else {
                XMSDK.post({
                    url: UrlConst.wallet_get,
                    data: {
                        id: self.newPlayerTask.withdrawItemVo.id,
                        type: 0
                    },
                    onSuccess: res => {
                        if (res.code === 0) {
                            if (!this.isValid) {
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
            // }
            // else {
            //     TrackMgr.newcomer_mission({
            //         activity_state: `点击「领现金」按钮`,
            //         receiving_status: false,
            //         withdrawal_progress: `提现进度:${this.newPlayerTask.userCurrentProgress}/${this.newPlayerTask.totalProgress}`
            //     })

            //     AssistCtr.showToastTip("进度条未满,不能提现5元现金")
            // }
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
