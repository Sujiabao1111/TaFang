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
    private DailyData: any = [];
    //成就数据
    private AchievementData: any = [];

    // private dailyPre: cc.Prefab = null;

    private dayRedNum = 0;
    private passRedNum = 0;

    onLoad() {

        cc.game.on(NameTs.Game_Task_updata, () => {


            if (this.selectNum == 0) {
                //this.DailyContent.removeAllChildren();
            } else {
                //this.AchievementContent.removeAllChildren();
            }
            this.updataTask(this.selectNum);
        }, this);

        
        if(!util.adPreObj[AdPosition.TaskDayDoubleGet]){
            util.preloadAd(AdPosition.TaskDayDoubleGet);
        }

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "任务弹窗",
        });
    }

    onDisable(){
        cc.game.emit(NameTs.Game_Main_Task_updata, this.dayRedNum + this.passRedNum);
    }

    start() {
        
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

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: num==0?"任务弹窗":"成就弹窗",
        });
    }

    /**
     * 更新item
     * @param num 0:每日 1：成就
     * @param res 是否有数据
     */
    updataTask(num: number = 0,data:any=null) {
        if (num == 0) {

            let successFn = (res)=>{
                if(!this.isValid){
                    return;
                }
                this.dayRedNum = 0;   
                this.DailyData = res.list;
                this.createDailyItem(num);

                let list = res.list;
                let DailyContentLen:number = 0;
                if(this.DailyContent&&this.DailyContent.children){
                    DailyContentLen = this.DailyContent.children.length;
                }
                let addNum = list.length - DailyContentLen;
                for (let i = 0; i < addNum; i++) {                        //生成
                    let item = cc.instantiate(this.dailyPre);
                    item.parent = this.DailyContent;
                }

                let childArray = this.DailyContent.children;      //设置数据
                for (let i = 0; i < childArray.length; i++) {
                    if (list[i]) {
                        childArray[i].getComponent(taskItem).init(list[i], num);
                    }
                }


                if(list){
                    let okNum = 0;
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].buttonType == 3) {
                            okNum++;
                        }
                    }
                    if(okNum > 0){
                        this.taskRed.active = true;
                    }                    
                    else{
                        this.taskRed.active = false;
                    }
                    this.dayRedNum = okNum;
                }
                else{
                    this.taskRed.active = false;
                }     
            }

            if(data){
                successFn(data);
            }else{
                util.getdataStr({
                    url: UrlConst.task_day_main,
                    success: (res) => {        
                        successFn(res);          
                    }
                });
            }

            
        } else {
            let successFn = (res)=>{
                if(!this.isValid){
                    return;
                }

                this.AchievementData = res.list;
                this.createDailyItem(num);
                this.passRedNum = 0;

                let list = res.list;
                if(!this.AchievementContent){
                    return;
                }
                let AchievementContentLen:number = 0;
                if(this.AchievementContent&&this.AchievementContent.children){
                    AchievementContentLen = this.AchievementContent.children.length;
                }
                let addNum = list.length - AchievementContentLen;
                for (let i = 0; i < addNum; i++) {                        //生成
                    let item = cc.instantiate(this.dailyPre);
                    item.parent = this.AchievementContent;
                }

                let childArray = this.AchievementContent.children;      //设置数据
                for (let i = 0; i < childArray.length; i++) {
                    if (list[i]) {
                        childArray[i].getComponent(taskItem).init(list[i], num);
                    }
                }
                
                if (list) {
                    let okNum = 0;
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].buttonType == 3) {
                            okNum++;
                        }
                    }
                    if (okNum > 0) {
                        this.achievementRed.active = true;
                    }
                    else {
                        this.achievementRed.active = false;
                    }
                    this.passRedNum = okNum;
                }
                else {
                    this.achievementRed.active = false;
                }


            }

            if(data){
                successFn(data);
            }else{

                util.getdataStr({
                    url: UrlConst.achievement_main,
                    success: (res) => {
                        successFn(res);
                    }
                });

            }
            
        }





    }

    /**
     * 初始化
     */
    init(data) {

        // if (!this.dailyPre) {
        //     this.loadAny("prefab/gameTask/taskItem", cc.Prefab, (res) => {
        //         this.dailyPre = res;
                this.updataTask(0,data||null);
                this.updataTask(1);
        //     });
        // }

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: "任务弹窗",
            ck_module:"展现",
        })

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

    onDestroy() {
        //释放
        // cc.assetManager.releaseAsset(this.dailyPre);
    }
    /**
     * 关闭
     */

    closeBtn() {

        soundController.singleton.clickAudio();

        this.closePage();

    }


    // update (dt) {}
}
