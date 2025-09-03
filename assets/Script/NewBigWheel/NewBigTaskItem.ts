import { AssistCtr } from "../Assist/AssistCtr";
import { AdPosition } from "../common/AdPosition";
import Ajax from "../server/ServerMgr/Ajax";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBigTaskItem extends cc.Component {

    @property(cc.Node)
    private controller: cc.Node = null;

    controllerJs: any = null
    curNum: any = null
    allNum: any = null
    taskItemData
    isClickItem
    onLoad() {
        this.controllerJs = this.controller.getComponent("NewBigWheelController");
    }

    start() {

    }

    setVideoTast(curNum, allNum) {
        let self = this;
        self.node.getChildByName("btn_taskClick").active = false;
        self.node.getChildByName("btn_taskGo").active = false;
        self.node.getChildByName("btn_taskGray").active = false;
        self.node.getChildByName("New Node").getChildByName("lable_taskCount").getComponent(cc.RichText).string = `<color=#AA520D>（</c><color=#F5663F>${curNum}</color><color=#AA520D>/${allNum}）</c>`;
        if (curNum < allNum) {
            self.node.getChildByName("btn_taskGo").active = true;
        }
        else {
            self.node.getChildByName("btn_taskGray").active = true;
        }
        this.curNum = curNum;
        this.allNum = allNum;
    }

    clickVideoTask() {
        let self = this;
        if (this.curNum >= this.allNum) {
            XMSDK.toast("今日已领取，请明日再来");
            return;
        }

        this.controllerJs.moveChouPos();
        AdController.loadAd(AdPosition.WheelGetRestTimes, () => {
            //广告观看完毕，关闭后
            setTimeout(() => {
                cc.director.emit("NewBigWheelPrize_againChou", { isNewBigTaskItem: true });
            }, 10);
        }, () => {
            AssistCtr.showToastTip("加载视频失败，请稍后！");
        })
    }

    setTaskItem(taskItemData) {
        let self = this;

        self.node.getChildByName("New Node").getChildByName("lable_taskTitle").getComponent(cc.Label).string = taskItemData.taskTitle;
        self.node.getChildByName("btn_taskClick").active = false;
        self.node.getChildByName("btn_taskGo").active = false;
        self.node.getChildByName("btn_taskGray").active = false;

        if (taskItemData.buttonType == 2) {
            self.node.getChildByName("btn_taskGo").active = true;
        }
        else if (taskItemData.buttonType == 3) {
            self.node.getChildByName("btn_taskClick").active = true;
        }
        else if (taskItemData.buttonType == 4) {
            self.node.getChildByName("btn_taskGray").active = true;
        }

        self.node.getChildByName("New Node").getChildByName("lable_taskCount").getComponent(cc.RichText).string = `<color=#AA520D>（</c><color=#F5663F>${taskItemData.userTaskValue}</color><color=#AA520D>/${taskItemData.taskValue}）</c>`;
        self.taskItemData = taskItemData;
    }

    clickItem() {
        let self = this;
        if (self.isClickItem) {
            return;
        }
        self.isClickItem = true;
        setTimeout(() => {
            self.isClickItem = false;
        }, 1000);

        // Global.audioUtils.playClick();
        soundController.singleton.clickAudio();

        let type = self.taskItemData.taskType;

        if (self.taskItemData.buttonType == 3) {
            TrackMgr.lotto_phone_click({
                activity_button_click: "领取抽奖机会",
                activity_state:self.taskItemData.taskTitle,
            })
            let taskId = self.taskItemData.id;
            XMSDK.post({
                url: UrlConst.newBigWheel_taskCheckIn,
                data: {
                    id: taskId
                },
                onSuccess: res => {
                    if(!this.isValid){
                        return;
                    }

                    if (res.code === 0) {
                        this.controllerJs.updateWinData();
                        XMSDK.toast("抽奖次数+1");
                        this.controllerJs.moveChouPos();
                    }
                    else {
                        XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                    }
                },
                onFail: res => {
                    XMSDK.toast('网络出错~', 2.5, 1);
                }
            })
            return;
        }
        else if (self.taskItemData.buttonType == 4) {
            XMSDK.toast("今日已领取，请明日再来");
            return;
        } else if (self.taskItemData.buttonType == 2) {
            this.controllerJs.closePage()
        }
    }
}
