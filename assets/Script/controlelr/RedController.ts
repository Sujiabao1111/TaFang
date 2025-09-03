import { onPrizeRedItemData } from "../onPrizeGet/OnPrizeGet";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

export interface onPrizeData {
    onPrizeRedData: Array<onPrizeRedItemData>           //全部红包全部信息
}

class RedController {
    //检查任务红点
    checkTaskRed(call) {
        let okNum = 0;
        util.getdataStr({
            url: UrlConst.task_day_main,
            success: (res) => {
                if (res.list) {
                    let list = res.list;
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].buttonType == 3) {
                            okNum++;
                        }
                    }
                    util.getdataStr({
                        url: UrlConst.achievement_main,
                        success: (res) => {
                            if (res && res.list) {
                                let list = res.list;
                                for (let i = 0; i < list.length; i++) {
                                    if (list[i].buttonType == 3) {
                                        okNum++;
                                    }
                                }
                                call && call(okNum)
                            }
                        }
                    });
                }
            }
        });
    }

    signRed: cc.Node = null;
    onPrizeData = null;
    //初始化签到处红点信息
    initSignRedData(redNode: cc.Node) {
        this.signRed = redNode;

        XMSDK.getdataStr({
            url: UrlConst.sign_main,
            onSuccess: res => {
                if (res.code === 0 && res.data) {
                    if (res && res.data) {
                        util.isOkSign = res.data.todayChecked;
                    }
                }
            },
            onFail: err => {

            }
        }
        )

        XMSDK.getdataStr({
            url: UrlConst.onPrizeGetRewardMain,
            onSuccess: res => {
                if (res.code === 0 && res.data) {
                    this.onPrizeData = res.data;
                } else {
                    XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: res => {

            }
        })
    }

    //检查首页签到红点
    checkMainSignRed() {
        let self = this;
        if (self.signRed && self.onPrizeData) {
            let allRedData = self.onPrizeData.onPrizeRedData;
            let isHaveGet = false;  //是否有可领取的红包
            let curTime = util.onlineTimeNum;
            let redData: onPrizeRedItemData = null;
            for (let i = 0; i < allRedData.length; i++) {
                redData = allRedData[i];
                if (redData.state == 0 && redData.waitTime <= curTime) {
                    isHaveGet = true;
                }
            }

            if (!util.isOkSign || isHaveGet) {
                if (!self.signRed.active) {
                    self.signRed.active = true;

                    TrackMgr.little_red_dots({
                        activity_state: "小红点展示",
                        activity_position: "签到",
                    })


                    if (redData) {
                        TrackMgr.Online_rewards({
                            activity_state: "在线奖励达成",
                            reward_state: `${redData.waitTime / 60}分钟`,
                        })
                    }
                }
            }
            else if (self.signRed.active) {
                self.signRed.active = false;
            }
        }
    }

    wheelRed: cc.Node = null;
    wheelCount = 0; //转盘剩余次数
    initGoldWheelData(wheelRed: cc.Node) {
        this.wheelRed = wheelRed;
        XMSDK.getdataStr({
            url: UrlConst.goldWheel_index,
            onSuccess: res => {
                if (res.code === 0) {
                    this.wheelCount = res.data.times;

                    if(this.wheelCount > 0){
                        this.checkMainGoldWheelRed(true);
                    }                    
                }
                else {

                }
            },
            onFail: err => {

            }
        })
    }

    checkMainGoldWheelRed(state?: boolean) {        
        if (this.wheelRed) {
            if (state != null) {
                this.wheelRed.active = state;
            }
            else {
                if (util.userData.product <= 5) {
                    if(this.wheelCount > 0){
                        if (!this.wheelRed.active) {
                            this.wheelRed.active = true;
                            TrackMgr.little_red_dots({
                                activity_state: "小红点展示",
                                activity_position: "大转盘",
                            })
                        }
                    }
                }
                else if (this.wheelRed.active) {
                    this.wheelRed.active = false;
                }
            }
        }
    }
}

export default new RedController();