import { AssistCtr } from "../Assist/AssistCtr";
import { AdPosition } from "../common/AdPosition";
import { updateType } from "../common/faceTs";
import RewardController from "../controlelr/RewardController";
import Ajax from "../server/ServerMgr/Ajax";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import { AdUtil } from "../server/xmsdk_cocos/AD/AdUtil";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBigWheelChou extends cc.Component {
    @property(cc.Node)
    prizeNode: cc.Node = null
    @property(cc.Node)
    btn_clickChou: cc.Node = null
    @property(cc.Node)
    chouItemNode: cc.Node = null
    @property(cc.Node)
    btn_clickFreeChou: cc.Node = null
    @property(cc.Node)
    btn_clickNoCountChou: cc.Node = null
    @property(cc.Node)
    btn_clickVideoChou: cc.Node = null
    @property(cc.Node)
    btn_clickTaskChou: cc.Node = null
    @property(cc.Label)
    lable_remainChou: cc.Label = null
    @property(cc.Node)
    controller: cc.Node
    @property([cc.SpriteFrame])
    selectImg: Array<cc.SpriteFrame> = []

    maxPrizeIndex: number;
    lotteryData: any;
    wheelItems: any[];
    wheelAwardCount: number;
    wheelIsRunning: boolean;
    turnNumber: number;
    speed: number;
    currentFps: number;
    turnId: number;
    hasWheelDraw: boolean;
    getPrizeIndex: number;
    wheelRunEndallback: any;
    controllerJs: any;
    freeTimes: number;
    doubleData: any;
    prizeData: any;
    turnIdArray: any = [];
    itemListV2: any;
    isOnEvent: any;


    onLoad() {
        let self = this;

        self.maxPrizeIndex = self.prizeNode.children.length;

        self.lotteryData = null;
        self.wheelItems = [];
        self.wheelAwardCount = 0;
        self.wheelIsRunning = false;
        self.turnNumber = 0;// 转动格数
        self.speed = 0;// 速度（多少帧跳一格）
        self.currentFps = 0;// 与speed配合
        self.turnId = 0;// 下发的要转到的坑位
        self.hasWheelDraw = false;// 与turnId配合
        self.getPrizeIndex = 0;// 当前选中坑位（实际坑位从1开始）
        self.wheelRunEndallback = null;

        self.controllerJs = this.controller.getComponent("NewBigWheelController");
    }

    start() {

    }

    clickChou(eventData) {
        let self = this;
        if (!self.controllerJs) return
        let data = self.controllerJs.getData();
        let isLookVideo = false;
        if (eventData && eventData.isNewBigTaskItem) {
            isLookVideo = true;
        }

        // 是否可以点击旋转：数据是否下载完成、奖品是否全部装载完成、转盘是否在转动
        if (self.wheelIsRunning) {
            return;
        }
        // Global.audioUtils.playClick();
        let type = data.buttonType;
        if (type == 1 && !isLookVideo) {          //免费抽
            TrackMgr.lotto_phone_click({
                activity_button_click: "免费抽奖"
            })
            XMSDK.getdataStr({
                url: UrlConst.newBigWheel_action,
                onSuccess: res => {
                    if (res.code === 0) {
                        this.turnId = this.checkTurnId(res.data.id);
                        if (this.turnId == null) {
                            return;
                        }

                        this.doubleData = res.data;
                        this.startAni();

                        TrackMgr.LuckDraw({
                            awad_name: this.getStr(res.data.id),
                            awad_result: true
                        })
                    }
                    else {
                        if (res.data && res.data.id) {
                            TrackMgr.LuckDraw({
                                awad_name: this.getStr(res.data.id),
                                awad_result: false
                            })
                        }

                        XMSDK.toast(res.message || '网络出错~');
                    }
                },
                onFail: err => {
                    XMSDK.toast('网络出错~');
                }
            })
        }
        else if (type == 2 || isLookVideo) {        //看视频
            if (!eventData || !eventData.isNewBigTaskItem) {
                AdController.loadAd(AdPosition.WheelGetRestTimes, () => {
                    //延迟10毫秒，才不会出现请求超时失败问题
                    XMSDK.post({
                        url: UrlConst.newBigWheel_watch,
                        onSuccess: res => {
                            if (res.code === 0) {
                                this.turnId = this.checkTurnId(res.data.id);
                                if (this.turnId == null) {
                                    return;
                                }

                                this.doubleData = res.data;
                                this.startAni();
                                TrackMgr.LuckDraw({
                                    awad_name: this.getStr(res.data.id),
                                    awad_result: true
                                })
                                // XMSDK.track({
                                //     eventName: SAConst.wheel.LuckDraw,
                                //     props: {
                                //         awad_name: this.getStr(res.data.id),
                                //         awad_result: true
                                //     }
                                // });

                            } else {
                                if (res.data && res.data.id) {
                                    TrackMgr.LuckDraw({
                                        awad_name: this.getStr(res.data.id),
                                        awad_result: false
                                    })
                                    // XMSDK.track({
                                    //     eventName: SAConst.wheel.LuckDraw,
                                    //     props: {
                                    //         awad_name: this.getStr(res.data.id),
                                    //         awad_result: false
                                    //     }
                                    // });
                                }

                                XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                            }
                        },
                        onFail: res => {

                        }
                    })
                }, () => {
                    AssistCtr.showToastTip("加载视频失败，请稍后！");
                })
            }
            else {

                XMSDK.post({
                    url: UrlConst.newBigWheel_watch,
                    onSuccess: res => {
                        if (res.code === 0) {
                            this.turnId = this.checkTurnId(res.data.id);
                            if (this.turnId == null) {
                                return;
                            }

                            this.doubleData = res.data;
                            this.startAni();
                            TrackMgr.LuckDraw({
                                awad_name: this.getStr(res.data.id),
                                awad_result: true
                            })
                            // XMSDK.track({
                            //     eventName: SAConst.wheel.LuckDraw,
                            //     props: {
                            //         awad_name: this.getStr(res.data.id),
                            //         awad_result: true
                            //     }
                            // });

                        } else {
                            if (res.data && res.data.id) {
                                TrackMgr.LuckDraw({
                                    awad_name: this.getStr(res.data.id),
                                    awad_result: false
                                })
                                // XMSDK.track({
                                //     eventName: SAConst.wheel.LuckDraw,
                                //     props: {
                                //         awad_name: this.getStr(res.data.id),
                                //         awad_result: false
                                //     }
                                // });
                            }

                            XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                        }
                    },
                    onFail: res => {

                    }
                })
            }
        }
        else if (type == 3) {         //做任务
            this.controllerJs.moveTaskPos();
            XMSDK.toast("完成任务可获得抽奖次数");
        }
        else if (type == 4) {         //任务次数用完
            XMSDK.toast("今日抽奖次数已用完，请明日再来");
        }
    }

    startAni() {
        let self = this;
        this.turnNumber = this.maxPrizeIndex * 2 - this.turnId;
        this.speed = 5;

        this.wheelIsRunning = true;
        util.setTempParm("newBigWheel_wheelIsRunning", true);
        self.controllerJs.setScroller(false);
    }

    update(dt) {
        if (this.wheelIsRunning && (this.turnNumber > 0)) {
            this.currentFps++;
            if (this.currentFps >= this.speed) {
                // 转了一格
                this.turnNumber--;
                if (this.turnNumber <= 0) {
                    if (this.turnId >= 0) {
                        if (this.hasWheelDraw) {
                            this.wheelIsRunning = false;
                            this.hasWheelDraw = false;
                            //this.wheelRunEndallback && this.wheelRunEndallback();
                            this.openPrizeWin();
                        } else {
                            this.hasWheelDraw = true;
                        }
                        this.turnNumber = this.maxPrizeIndex + (this.maxPrizeIndex - this.getPrizeIndex) + (this.getPrizeIndex + (this.turnId - this.getPrizeIndex));
                        if (this.turnNumber >= 16) {
                            this.turnNumber -= 8;
                        }
                    }
                }

                if (this.wheelIsRunning) {
                    // 转动效果
                    let child = this.prizeNode.children[this.getPrizeIndex];

                    this.getPrizeIndex++;
                    if (this.getPrizeIndex >= this.maxPrizeIndex) {
                        this.getPrizeIndex = 0;
                    }

                    let childEnd = this.prizeNode.children[this.getPrizeIndex];

                    if (child && childEnd) {
                        child.getComponent(cc.Sprite).spriteFrame = this.selectImg[0];
                        childEnd.getComponent(cc.Sprite).spriteFrame = this.selectImg[1];
                    }



                    // 调整速度
                    this.currentFps = 0;
                    if (this.hasWheelDraw) {
                        // this.speed++;
                        this.speed = this.easeOutCirc(this.speed);
                    }
                }
                else {
                    let child = this.prizeNode.children[this.getPrizeIndex];
                    if (child) {
                        child.getComponent(cc.Sprite).spriteFrame = this.selectImg[1];
                    }
                }
            }
        }
    }

    checkTurnId(id) {
        let self = this;
        let turnIdArray = self.turnIdArray;
        self.prizeData = null;
        if(turnIdArray&&turnIdArray.length){
            for (let i = 0; i < turnIdArray.length; i++) {
                if (turnIdArray[i].id == id) {
                    self.prizeData = turnIdArray[i];
                    return turnIdArray[i].index;
                }
            }
        }
        
        return null;
    }

    easeOutCirc(pos) {
        return Math.sqrt(Math.pow((pos + 1), 2) + 16);
    }

    updateWinData(data) {
        let self = this;
        let chouNodeArray = self.chouItemNode.children;                 //更新转盘信息
        let itemListV2 = data.itemListV2;
        let times = data.times;
        self.freeTimes = times;
        self.itemListV2 = itemListV2;
        self.lable_remainChou.string = `还剩${times}次`;

        self.turnIdArray = [];

        for (let i = 0; i < itemListV2.length; i++) {
            let item = chouNodeArray[i];
            if (item) {
                let chouItemData = itemListV2[i];

                if (chouItemData.type == 1) {//道具
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController.instance.findPropSprite(chouItemData.keyId)
                }
                else if (chouItemData.type == 2) {//点值
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController.instance.findPointSprite(chouItemData.keyId)
                }
                else if (chouItemData.type == 4) {//手机碎片
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController.instance.findPhoneSprite(0);
                }
                else if (chouItemData.type == 5) {
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController.instance.findPhoneSprite(1);
                }
                else {
                    item.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RewardController.instance.findPhoneSprite(2);
                }

                if (chouItemData.rewardValue) {
                    item.getChildByName("num").getComponent(cc.Label).string = `手机碎片*${chouItemData.rewardValue}`;
                }
                else {
                    if (chouItemData.type == 5) {
                        item.getChildByName("num").getComponent(cc.Label).string = "手机";
                    }
                    else if (chouItemData.type == 2) {
                        if (chouItemData.keyId == updateType.hongbao) {
                            item.getChildByName("num").getComponent(cc.Label).string = "红包币";
                        } else if (chouItemData.keyId == updateType.product) {
                            item.getChildByName("num").getComponent(cc.Label).string = "炮台";
                        }

                    }
                    else {
                        item.getChildByName("num").getComponent(cc.Label).string = `谢谢参与`;
                    }
                }

                self.turnIdArray.push({ index: i, id: chouItemData.id, type: chouItemData.type });
            }
        }
        self.setChouBtnType(data.buttonType);

        if (!self.isOnEvent) {
            cc.director.on("NewBigWheelPrize_againChou", self.clickChou, self);
        }
        self.isOnEvent = true;
    }

    getStr(id) {
        let self = this;
        let itemListV2 = self.itemListV2;
        let str = ``;
        for (let i = 0; i < itemListV2.length; i++) {
            let chouItemData = itemListV2[i];
            if (chouItemData.id == id) {
                let chouItemData = itemListV2[i];
                if (chouItemData.type == 1) {
                    str = RewardController.instance.findPropName(chouItemData.keyId);
                }
                else if (chouItemData.type == 2) {
                    str = RewardController.instance.findPointName(chouItemData.keyId);
                }
                else if (chouItemData.type == 4) {
                    str = `手机碎片`;
                }
                else if (chouItemData.type == 5) {
                    str = `手机`;
                }
            }
        }
        return str;
    }

    getType(id) {
        let self = this;
        let itemListV2 = self.itemListV2;
        let str = ``;
        for (let i = 0; i < itemListV2.length; i++) {
            let chouItemData = itemListV2[i];
            if (chouItemData.id == id) {
                return chouItemData.type
            }
        }
    }

    setChouBtnType(type) {
        let self = this;

        self.btn_clickFreeChou.active = false;
        self.btn_clickNoCountChou.active = false;
        self.btn_clickVideoChou.active = false;
        self.btn_clickTaskChou.active = false;

        if (type == 1) {
            self.btn_clickFreeChou.active = true;
            self.btn_clickFreeChou.stopAllActions();
            self.btn_clickFreeChou.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 0.9), cc.scaleTo(0.3, 1))));
            TrackMgr.lotto_dial({
                click_lotto_state: "还剩1次"
            })
            // XMSDK.track({
            //     eventName: SAConst.lotto_dial,
            //     props: {
            //         click_lotto_state: "还剩1次",
            //     }
            // });
        }
        else if (type == 2) {
            self.btn_clickVideoChou.active = true;
            self.btn_clickVideoChou.stopAllActions();
            self.btn_clickVideoChou.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 0.9), cc.scaleTo(0.3, 1))));
            TrackMgr.lotto_dial({
                click_lotto_state: "看视频"
            })
            // XMSDK.track({
            //     eventName: SAConst.lotto_dial,
            //     props: {
            //         click_lotto_state: "看视频",
            //     }
            // });
        }
        else if (type == 3) {
            self.btn_clickTaskChou.active = true;
            TrackMgr.lotto_dial({
                click_lotto_state: "去做任务"
            })
            // XMSDK.track({
            //     eventName: SAConst.lotto_dial,
            //     props: {
            //         click_lotto_state: "去做任务",
            //     }
            // });
        }
        else if (type == 4) {
            self.btn_clickNoCountChou.active = true;
            TrackMgr.lotto_dial({
                click_lotto_state: "明日再来"
            })
            // XMSDK.track({
            //     eventName: SAConst.lotto_dial,
            //     props: {
            //         click_lotto_state: "明日再来",
            //     }
            // });
        }
    }

    openPrizeWin() {
        let self = this;
        let prizeData = self.prizeData;
        if (!prizeData) {
            return;
        }

        if (prizeData.type == 6) {
            let mainStr = this.getStr(prizeData.id);

            this.controllerJs.openPrizeWin(null, mainStr, this.doubleData);

            util.setTempParm("newBigWheel_wheelIsRunning", false);
            this.controllerJs.setScroller(true);
        }
        else {
            let mainStr = this.getStr(prizeData.id);

            this.controllerJs.openPrizeWin(prizeData.type, mainStr, this.doubleData);

            util.setTempParm("newBigWheel_wheelIsRunning", false);
            this.controllerJs.setScroller(true);
        }
    }

    chouOk() {
        let self = this;
    }

}
