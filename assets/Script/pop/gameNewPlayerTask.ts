
import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import { t } from "../Language/LanguageData";
import NewPlayerTaskModel from "../model/NewPlayerTaskModel";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";
import { Tools } from "../util/Tools";
import soundController from "../soundController";
import { ApiService } from "../tg/ApiService";


const { ccclass, property } = cc._decorator;
@ccclass
export default class gameNewPlayerTask extends baseTs {

    @property(cc.Label)
    private rewardTonLabel: cc.Label = null;
    @property(cc.Label)
    private lable_progress: cc.Label = null;
    @property(cc.Node)
    private btn_green: cc.Node = null;
    @property(cc.ProgressBar)
    private tonProgress: cc.ProgressBar = null;

    @property(cc.Node)
    private toggleContent: cc.Node = null;

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Prefab)
    private newPlayerTaskModel = null;

    private redArr = [] // 有红点的任务



    // 炮塔等级达到:0  观看视频:1  完成日常任务:2  累计获得金币:3
    private defaultData = {
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
        cc.game.on(NameTs.UPDATE_NEWPLAYER_TASK, this.updateProGress, this);
    }

    private _data: NewbenefitsData = null;
    private TaskItemVoMap = [[], [], [], [], [], [], []]


    init(data: NewbenefitsData) {
        this._data = data;
        this._data.curday = this._data.curday > 6 ? 6 : this._data.curday;
        let toggleItems = this.toggleContent.children;
        for (let i = 0; i < toggleItems.length; i++) {
            toggleItems[i].getChildByName("lable_font").getComponent(cc.Label).string = t('main.第_天', i + 1);
            toggleItems[i].getChildByName("suo").active = i > this._data.curday;
            toggleItems[i].getComponent(cc.Button).interactable = !toggleItems[i].getChildByName("suo").active;
        }

        this.rewardTonLabel.string = data.rewardTon + "Ton"
        if (this.lable_progress) {
            this.lable_progress.string = t("main.提现进度") + `: ${data.progress}/${data.limit}`;
        }

        this.tonProgress.progress = (data.progress / data.limit);
        Tools.setSpriteState(this.btn_green, this.tonProgress.progress < 1);
        for (let i = 0; i < data.list.length; i++) {
            let index = parseInt(data.list[i].day) - 1;
            this.TaskItemVoMap[index].push(data.list[i]);
        }
        console.log("this.TaskItemVoMap====", this.TaskItemVoMap);
        const w_n = toggleItems[0].width;
        const s_l = this.toggleContent.getComponent(cc.Layout).spacingX;

        let value = 0;
        if (this._data.curday == 4) {
            value = 2;
        } else if (this._data.curday >= 5) {
            value = 3;
        }

        this.toggleContent.parent.getComponent(cc.ScrollView).scrollToOffset(cc.v2((w_n + s_l) * value, 0), 0.001);
        this.toggleContent.parent.getComponent(cc.ScrollView).scrollToLeft();

        this.showRed(true);
        this.clickTab(null, this._data.curday);
    }


    async clickGetMoney() {
        soundController.singleton.clickAudio();
        let res = await ApiService.ins.getNewbenefitston();
        if (res.response.success) {
            this.closePage();
            cc.game.emit(NameTs.Game_CloseNewPlayerTask);
        }
    }

    showRed(isReset: boolean = false) {
        if (isReset) {
            this.redArr = [];
            for (let i = 0; i < this.TaskItemVoMap.length; i++) {
                let data = this.TaskItemVoMap[i];
                for (let j = 0; j < data.length; j++) {
                    if (data[j].can_receive == 1) {
                        this.redArr.push(i);
                        break;
                    }
                }
            }
        }

        let toggleItems = this.toggleContent.children;
        for (let i = 0; i < toggleItems.length; i++) {
            toggleItems[i].getChildByName("img_red").active = this.redArr.indexOf(i) != -1 && !toggleItems[i].getChildByName("suo").active;
        }
    }

    clickTab(e, index) {
        if (this.redArr.indexOf(parseInt(index)) != -1) {
            this.redArr.splice(this.redArr.indexOf(parseInt(index)), 1);
            this.showRed();
        }
        let curClickTab = null;
        let tempColor = new cc.Color();
        let toggleItems = this.toggleContent.children;
        for (let i = 0; i < toggleItems.length; i++) {
            if (i == index) {
                toggleItems[i].getChildByName("Background").active = false;
                toggleItems[i].getChildByName("checkmark").active = true;
                toggleItems[i].getChildByName("lable_font").color = tempColor.fromHEX("#BC1902")
                curClickTab = i;
            } else {
                toggleItems[i].getChildByName("Background").active = true;
                toggleItems[i].getChildByName("checkmark").active = false;
                toggleItems[i].getChildByName("lable_font").color = tempColor.fromHEX("#D26C41")
            }
        }
        this.setTabData(curClickTab);
    }

    setTabData(curClickTab) {
        this.content.removeAllChildren();
        let tabTaskData = this.TaskItemVoMap[curClickTab];
        for (let i = 0; i < tabTaskData.length; i++) {
            let pre: cc.Node = cc.instantiate(this.newPlayerTaskModel);
            pre.parent = this.content;
            pre.getComponent(NewPlayerTaskModel).initData(tabTaskData[i]);
        }
    }

    updateProGress(progress) {
        if (this.lable_progress) {
            this.lable_progress.string = t("main.提现进度") + `: ${progress}/${this._data.limit}`;
        }
        this.tonProgress.progress = (progress / this._data.limit);
        Tools.setSpriteState(this.btn_green, this.tonProgress.progress < 1);
    }

    clickClose() {
        this.closePage();
    }
}
