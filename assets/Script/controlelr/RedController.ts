
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";



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
                    if (this.wheelCount > 0) {
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
                    if (this.wheelCount > 0) {
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