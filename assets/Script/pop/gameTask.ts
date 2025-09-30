import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import { UrlConst } from "../server/UrlConst";
import soundController from "../soundController";
import taskItem from "../task/taskItem";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameTask extends baseTs {

    public static instance: gameTask = null;

    @property({ type: cc.Prefab, displayName: "item預製體" })
    private dailyPre: cc.Prefab = null;

    @property({ type: [cc.Node], displayName: "每日任务按钮" })
    private DailySelect: cc.Node[] = [];

    @property({ type: [cc.Node], displayName: "成就任务按钮" })
    private AchievementSelect: cc.Node[] = [];

    @property({ type: cc.Node, displayName: "每日盒子" })
    private DailyView: cc.Node = null;

    @property({ type: cc.Node, displayName: "成就盒子" })
    private AchievementView: cc.Node = null;

    @property({ type: cc.Node, displayName: "每日Content" })
    private DailyContent: cc.Node = null;

    @property({ type: cc.Node, displayName: "成就Content" })
    private AchievementContent: cc.Node = null;

    @property({ type: cc.Node, displayName: "每日任务红点" })
    private taskRed: cc.Node = null;

    @property({ type: cc.Node, displayName: "成就任务红点" })
    private achievementRed: cc.Node = null;

    //当前第几个
    private selectNum: number = 0;

    //每日数据
    private DailyData: TaskData[] = [];

    //成就数据
    private AchievementData: TaskData[] = [];

    private dayRedNum = 0;
    private passRedNum = 0;

    onLoad() {
        gameTask.instance = this;
        cc.game.on(NameTs.Game_Task_updata, () => {
            this.updataTask(this.selectNum);
        }, this);

        cc.game.on(NameTs.UPDATE_TASK, () => {
            this.updataTask(this.selectNum);
        }, this);

        if (CC_DEBUG) {
            cc.game.on(NameTs.ACTIVATED, () => {
                this.updataTask(this.selectNum);
            }, this);
        }

    }

    onDisable() {
        cc.game.emit(NameTs.Game_Main_Task_updata, this.dayRedNum + this.passRedNum);
    }

    /**
    * 初始化
    */
    init(taskData: TaskData[]) {
        for (let i = 0; i < taskData.length; i++) {
            if (taskData[i].task_type == "1") {
                this.DailyData.push(taskData[i]);
            } else {
                this.AchievementData.push(taskData[i]);
            }
        }

        this.updataTask(0);
        this.updataTask(1);
        console.log("taskData", taskData);
    }

    /**
     * 选择哪个
     * @param event 
     * @param res 
     */
    selectBtn(event, res) {
        soundController.singleton.clickAudio();
        let num: number = Number(res);
        if (this.selectNum == num) return;
        this.selectNum = num;
        this.DailySelect[0].active = this.AchievementSelect[0].active = this.DailyView.active = res == 0;
        this.DailySelect[1].active = this.AchievementSelect[1].active = this.AchievementView.active = res == 1;
    }

    /**
     * 更新item
     * @param num 0:每日 1：成就
     * @param res 是否有数据
     */
    updataTask(num: number = 0) {
        let list = num == 0 ? this.DailyData : this.AchievementData;
        let parentNode = num == 0 ? this.DailyContent : this.AchievementContent;
        parentNode.removeAllChildren();
        for (let i = 0; i < list.length; i++) {                        //生成
            let item = cc.instantiate(this.dailyPre);
            item.parent = parentNode;
        }
        let childArray = parentNode.children;      //设置数据
        for (let i = 0; i < childArray.length; i++) {
            if (list[i]) {
                childArray[i].getComponent(taskItem).init(list[i], num);
            }
        }
    }



    /**
     * 创建任务item
     */
    createDailyItem(num) {

        // let parent:cc.Node = num==0?this.DailyContent:this.AchievementContent;



        // let data = num==0?this.DailyData:this.AchievementData;
        // let successFn = ()=>{
        //     data.forEach(element => {
        //         let item:cc.Node = cc.instantiate(this.dailyPre);
        //         item.setParent(parent);
        //         let itemTs = item.getComponent(item.name);

        //         itemTs.init(element,num);

        //     });
        // }

        // if(this.dailyPre){
        //     successFn();

        // }else{
        //     this.loadAny("prefab/gameTask/taskItem",cc.Prefab,(res)=>{
        //         this.dailyPre = res;
        //         successFn();
        //     });
        // }
    }


    /**
     * 关闭
     */

    closeBtn() {
        soundController.singleton.clickAudio();
        this.closePage();
    }

}
