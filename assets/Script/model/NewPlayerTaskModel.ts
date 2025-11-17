
import NameTs from "../common/NameTs";
import { getLanguage, Language, t } from "../Language/LanguageData";
import { ApiService } from "../tg/ApiService";
import { Global } from "../tg/Global";
import { Tools } from "../util/Tools";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewPlayerTaskModel extends cc.Component {

    @property(cc.Label)
    private lable_title: cc.Label = null;

    @property(cc.RichText)
    private lable_progress: cc.RichText = null;

    @property(cc.Label)
    private lable_addProgress: cc.Label = null;

    @property(cc.Node)
    private btn_Node: cc.Node = null;
    @property(cc.Node)
    private gouNode: cc.Node = null;
    @property(cc.Node)
    private goBtn: cc.Node = null;


    private myData: TaskData = null;
    private curClickTab: number = 0;
    private index: number = 0;
    private target_value: number = 0;

    initData(data: TaskData, curClickTab: number, index: number) {
        this.curClickTab = curClickTab;
        this.index = index;
        if (data) {
            this.myData = data;
            // this.myData.can_receive = 0
            this.setTaskTitle(data);
            this.setBtn();
            this.target_value = data.target_value;

            this.lable_progress.string = `</c><color=#669E00>${data.task_progress}</c>/<color=#D26C41>${this.target_value}</c>`;
            this.lable_addProgress.string = ` +${data.rewards}`;
        }
    }

    private setBtn() {

        this.goBtn.active = false;
        if ((this.myData.id == 10 || this.myData.id == 25) && this.myData.can_receive == 0) {
            this.goBtn.active = true
        }
        // this.goBtn.active = this.curClickTab == 5 && this.index == 2 && this.myData.can_receive == 0;

        if (this.myData.can_receive == 2) {
            this.gouNode.active = true;
            this.btn_Node.active = false;
        } else {
            this.btn_Node.active = true;
            this.gouNode.active = false;
            Tools.setSpriteState(this.btn_Node, this.myData.can_receive == 0);
        }

        if (this.goBtn.active) {
            this.btn_Node.active = false;
            this.gouNode.active = false;
        }
    }

    private setTaskTitle(data) {
        let desc = data.desc;
        let titleData = {};
        try {
            if (typeof desc === "string" && desc) {
                titleData = JSON.parse(desc);
            }
        } catch (e) {
            titleData = {};
        }
        // 默认英文
        let langKey = "en";
        switch (getLanguage()) {
            case Language.zh:
            case Language.zhHant:
                langKey = "zh-hant"; break;
            case Language.en:
                langKey = "en"; break;
            case Language.ar:
                langKey = "ar"; break;
            case Language.id:
                langKey = "id"; break;
            case Language.ru:
                langKey = "ru"; break;
            case Language.th:
                langKey = "th"; break;
        }
        this.lable_title.string = titleData[langKey] || titleData["en"] || "";
    }

    async clickBtn() {
        let res = await ApiService.ins.getNewbenefitsReward(this.myData.id);
        if (res.response.success) {
            this.myData.can_receive = 2;
            this.setBtn();
            cc.game.emit(NameTs.UPDATE_NEWPLAYER_TASK, res.response.data.progress);
        }
    }

    private async clickChannel() {
        // 订阅
        if (this.myData.id == 10) {
            ApiService.ins.joinChannel();
            let res = await ApiService.ins.botnotify(Global.ins.user.openid, "subscribe");
            if (res.response.success) {
                this.scheduleOnce(() => {
                    this.myData.can_receive = 1;
                    this.setBtn();
                    cc.game.emit(NameTs.UPDATE_NEWPLAYER_TASK, res.response.data.progress);
                }, 2)
            }
        } else if (this.myData.id == 25) {
            // 群组
            ApiService.ins.joinGroup();
            let res = await ApiService.ins.botnotify(Global.ins.user.openid, "addgroup");
            if (res.response.success) {
                this.scheduleOnce(() => {
                    this.myData.can_receive = 1;
                    this.setBtn();
                    cc.game.emit(NameTs.UPDATE_NEWPLAYER_TASK, res.response.data.progress);
                }, 2)
            }
        }
    }
}
