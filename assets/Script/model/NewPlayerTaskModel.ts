import { AssistCtr } from "../Assist/AssistCtr";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import PageManage from "../PageManage";
import { withdrawTaskItemVoMap } from "../pop/gameNewPlayerTask";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewPlayerTaskModel extends cc.Component {

    @property(cc.Label)
    lable_title: cc.Label = null;

    @property(cc.RichText)
    lable_progress: cc.RichText = null;

    @property(cc.Label)
    lable_addProgress: cc.Label = null;

    @property(cc.Node)
    btn_Node: cc.Node = null;

    @property(cc.SpriteFrame)
    btnSprArray: Array<cc.SpriteFrame> = [];

    myData: withdrawTaskItemVoMap = null;


    start() {

    }

    initData(data: withdrawTaskItemVoMap) {
        if (data) {
            let self = this;
            self.lable_title.string = data.taskTitle;
            self.lable_progress.string = `<color=#D26C41>完成度:</c><color=#669E00>${data.userTaskValue}</c>/<color=#D26C41>${data.taskValue}</c>`;
            self.lable_addProgress.string = `+${data.progress}`;
            self.btn_Node.getComponent(cc.Sprite).spriteFrame = this.btnSprArray[data.buttonType];

            let tempColor = new cc.Color();
            if (data.buttonType == 1) {               //按钮类型: 1-进行中, 2-待领取, 3-已领取
                self.node.getChildByName(`lable_btn`).getComponent(cc.Label).string = `前往`;
                self.node.getChildByName(`lable_btn`).getComponent(cc.LabelOutline).color = tempColor.fromHEX("#D25400");
            }
            else if (data.buttonType == 2) {
                self.node.getChildByName(`lable_btn`).getComponent(cc.Label).string = `领取`;
                self.node.getChildByName(`lable_btn`).getComponent(cc.LabelOutline).color = tempColor.fromHEX("#4F7A00");
            }
            else if (data.buttonType == 3) {
                self.node.getChildByName(`lable_btn`).getComponent(cc.Label).string = `已领取`;
                self.node.getChildByName(`lable_btn`).getComponent(cc.LabelOutline).color = tempColor.fromHEX("#757575");
            }
            self.myData = data;
        }
    }

    clickBtn() {
        let data = this.myData;
        if(data){
            TrackMgr.newcomer_mission({
                activity_state: `任务项按钮点击`,
                days: `第${this.myData.day}天`,
                task_type: this.myData.taskTitle,
                button_hcdg: this.node.getChildByName(`lable_btn`).getComponent(cc.Label).string
            })
    
    
            if (data.buttonType == 1) {               //按钮类型: 1-进行中, 2-前往, 3-待领取, 4-已领取
                if (data.type == 3) {
                    cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTask);
                }
                PageManage.singleton.closePage(pageTs.pageName.GameNewPlayerTask);
            }
            else if (data.buttonType == 2) {
                XMSDK.getdataStr({
                    url: UrlConst.newPlayerTaskGet,
                    data: {
                        taskId: this.myData.id
                    },
                    onSuccess: res => {
                        if (res.code === 0) {
                            if(!this.isValid){
                                return;
                            }

                            if(this.myData){
                                AssistCtr.showToastTip("领取成功");
                                cc.game.emit(NameTs.Game_NewPlayerTaskGet, {
                                    target: this.btn_Node
                                });
        
                                TrackMgr.newcomer_mission({
                                    activity_state: `任务领取成功`,
                                    days: this.myData.day + "",
                                    task_type: this.myData.taskTitle,
                                })
                            }
                        }
                        else {
                            if (res) {
                                AssistCtr.showToastTip(res.message);
                            }
                        }
                    },
                    onFail: err => {
    
                    }
                }
                )
            }
            else if (data.buttonType == 3) {
                AssistCtr.showToastTip("已领取");
            }
        }        
    }
}
