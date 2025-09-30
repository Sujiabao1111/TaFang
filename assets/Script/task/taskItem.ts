import { AssistCtr } from "../Assist/AssistCtr";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { getLanguage, Language, t } from "../Language/LanguageData";
import PageManage from "../PageManage";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import { ApiService } from "../tg/ApiService";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class taskItem extends cc.Component {

    @property({ type: cc.Label, displayName: "标题" })
    private titleLabel: cc.Label = null;

    @property({ type: cc.ProgressBar, displayName: "进度条" })
    private Progress: cc.ProgressBar = null;

    @property({ type: cc.Label, displayName: "进度条文字" })
    private ProgressLabel: cc.Label = null;

    @property({ type: cc.Label, displayName: "金币" })
    private coinLabel: cc.Label = null;

    @property(cc.Node)
    private task_go_node: cc.Node = null;
    @property(cc.Node)
    private complete_node: cc.Node = null;
    @property(cc.Node)
    private lingqu_node: cc.Node = null;


    private _go_task: Function;

    private initData: any = null;
    //类型
    private typeTask: number = 0;



    /**
     * 初始化
     * @param data 数据
     * @param type 类型 0是每日 1成就
     */
    init(data: TaskData, type) {
        this.initData = data;
        this.typeTask = type;

        this.setTaskTitle(data);
        this.setItemType(data);
        let rewards = this.initData.rewards;
        let rewardArr = [];
        try {
            if (typeof rewards === "string" && rewards) {
                rewardArr = JSON.parse(rewards);
            }
        } catch (e) {
            rewardArr = [1, 0, 100];
        }
        if (rewardArr.length > 0) {
            this.coinLabel.string = rewardArr[0][2];
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
        this.titleLabel.string = titleData[langKey] || titleData["en"] || "";
    }

    private setItemType(data: TaskData) {

        let target_type = parseInt(data.target_type);
        switch (target_type) {

            case 1://通关
                this.setProgress();
                if (data.target_value <= data.task_progress) {
                    this.isCanLingQu()
                } else {
                    this.setBtnState(true, false, false);
                    this._go_task = async () => {
                        this.closeBtn();
                    }
                }
                break;
            case 2://分享游戏
                this.setProgress();
                if (data.target_value <= data.task_progress) {
                    this.isCanLingQu()
                } else {
                    this.setBtnState(true, false, false);
                    this._go_task = async () => {
                        let res = await ApiService.ins.shareGame();
                        if (res.response.success) {
                            this.initData.can_receive = 1;
                            this.setBtnState(false, false, true);
                            // cc.game.emit(NameTs.UPDATE_TASK);
                        }
                    }
                }
                break;

            // case 4://订阅频道
            //     this.progress_label.string = '';
            //     if (task_require <= task_progress) {
            //         this.task_go_node.active = false;
            //         this.complete_node.active = true;
            //     }
            //     else {
            //         this.task_go_node.active = true;
            //         this.complete_node.active = false;
            //         this._go_task = () => {
            //             ApiService.ins.joinChannel();
            //             // EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_TASK);
            //         }
            //     }
            //     break;
            // case 5://关注群组
            //     this.progress_label.string = '';
            //     if (task_require <= task_progress) {
            //         this.task_go_node.active = false;
            //         this.complete_node.active = true;
            //     }
            //     else {
            //         this.task_go_node.active = true;
            //         this.complete_node.active = false;
            //         this._go_task = () => {
            //             ApiService.ins.joinGroup();
            //             // EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_TASK);
            //         }
            //     }
            //     break;
            // case 6://投票
            //     this.progress_label.string = '';
            //     if (task_require <= task_progress) {
            //         this.task_go_node.active = false;
            //         this.complete_node.active = true;
            //     }
            //     else {
            //         this.task_go_node.active = true;
            //         this.complete_node.active = false;
            //         this._go_task = async () => {
            //             await ApiService.ins.toVote();
            //             this.scheduleOnce(() => {
            //                 EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_TASK);
            //             }, 2)
            //         }
            //     }
            //     break;
            // case 11://挖矿
            //     this.progress_label.string = '';
            //     if (task_require <= task_progress) {
            //         this.task_go_node.active = false;
            //         this.complete_node.active = true;
            //     }
            //     else {
            //         this.task_go_node.active = true;
            //         this.complete_node.active = false;
            //         this._go_task = () => {
            //             TaskAction.instance.close_task();
            //             UIManager.ins.showUI("MiningPop", BUNDLE_TYPE_ENUM.GAME_PLAY);
            //         }
            //     }
            //     break;

            // case 12://道具
            // case 13://复活
            // case 100://全清
            //     this.progress_label.string = `${task_progress}/${task_require}`;
            //     this.task_go_node.active = false;
            //     if (task_require <= task_progress) {
            //         this.task_go_node.active = false;
            //         this.complete_node.active = true;
            //         this._go_task = async () => {

            //         }
            //     }
            //     else {
            //         this.task_go_node.active = true;
            //         this.complete_node.active = false;
            //         this._go_task = async () => {
            //             MenuUI.instance.startGame();
            //         }
            //     }
            //     break;
            // case 114514://换量
            //     this.progress_label.string = '';
            //     if (task_require <= task_progress) {
            //         this.task_go_node.active = false;
            //         this.complete_node.active = true;
            //     }
            //     else {
            //         this.task_go_node.active = true;
            //         this.complete_node.active = false;
            //         this._go_task = async () => {
            //             await ApiService.ins.completeExchangeTask(id);

            //             if (data.jump_url.startsWith('https://t.me')) {
            //                 Global.ins.openTelegramLink(data.jump_url);
            //             } else {
            //                 Global.ins.openLink(data.jump_url)
            //             };

            //             if (CC_DEBUG) {
            //                 EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
            //             }
            //         }
            //     }
            //     break;
            // default:
            //     this.progress_label.string = `${task_progress}/${task_require}`;
            //     break;
        }
    }

    private setProgress() {
        this.ProgressLabel.string = `${this.initData.task_progress}/${this.initData.target_value}`;
        this.Progress.progress = this.initData.task_progress / this.initData.target_value;
    }

    private isCanLingQu() {
        if (this.initData.can_receive == 1) {
            this.setBtnState(false, false, true);
        } else {
            this.setBtnState(false, true, false);
        }
        this._go_task = async () => {
        }
    }

    private setBtnState(go: boolean, complete: boolean, lingqu: boolean) {
        this.task_go_node.active = go;
        this.complete_node.active = complete;
        this.lingqu_node.active = lingqu;
    }




    go() {
        if (this._go_task) this._go_task();
    }

    /**按钮 */
    async getBtn(event) {
        soundController.singleton.clickAudio();
        let res = await ApiService.ins.claimTaskReward(this.initData.id);
        if (res.response.success) {
            this.initData.can_receive = 0;
            this.setBtnState(false, true, false);
            let coin = parseInt(this.coinLabel.string)
            cc.game.emit(NameTs.Game_Effect_coin, { node: this.node, value: coin, num: 5, parent: cc.director.getScene().getChildByName('Canvas'), isAdd: true });
        }
    }

    /**
     * 关闭
     */
    closeBtn() {
        // soundController.singleton.clickAudio();
        PageManage.singleton.closePage(pageTs.pageName.GameTask);
    }


}
