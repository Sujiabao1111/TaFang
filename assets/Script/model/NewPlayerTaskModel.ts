
import NameTs from "../common/NameTs";
import { getLanguage, Language, t } from "../Language/LanguageData";
import { ApiService } from "../tg/ApiService";
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


    private myData: TaskData = null;

    private taskTitleType: Array<string> = ["炮塔等级达到", "观看视频", "完成日常任务", "累计获得金币"];

    initData(data: TaskData) {
        if (data) {
            this.myData = data;

            this.setTaskTitle(data);
            this.setBtn();

            this.lable_progress.string = `</c><color=#669E00>${data.task_progress}</c>/<color=#D26C41>${data.target_value}</c>`;
            this.lable_addProgress.string = ` +${data.rewards}`;

        }
    }

    private setBtn() {
        if (this.myData.task_progress >= this.myData.target_value && this.myData.can_receive == 0) {
            this.gouNode.active = true;
            this.btn_Node.active = false;
        } else {
            this.btn_Node.active = true;
            this.gouNode.active = false;
            Tools.setSpriteState(this.btn_Node, this.myData.can_receive == 0);
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
            this.myData.can_receive = 0;
            this.setBtn();
            cc.game.emit(NameTs.UPDATE_NEWPLAYER_TASK, res.response.data.progress);
        }

    }
}
