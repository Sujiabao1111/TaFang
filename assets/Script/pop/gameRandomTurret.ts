import { log } from "console";
import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { t } from "../Language/LanguageData";
import soundController from "../soundController";
import { ApiService } from "../tg/ApiService";
import { Global } from "../tg/Global";
import jsonSingleton from "../base/jsonSingleton";
import NameTs from "../common/NameTs";
import util from "../util/util";
import { Tools } from "../util/Tools";
import { BuyType } from "../common/PropConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameRandomTurret extends baseTs {

    @property(cc.Node)
    private layoutNode: cc.Node = null;
    @property(cc.Node)
    private maskNode: cc.Node = null;
    @property(cc.Node)
    private clickBtn: cc.Node = null;
    @property(cc.Node)
    private clickBtn2: cc.Node = null;

    @property(cc.Node)
    private itmeNode: cc.Node = null;
    @property(cc.SpriteFrame)
    private itmeBg: cc.SpriteFrame[] = [];


    private itemList: cc.Node[] = [];
    private itemWidth: number = 122; // 每个item的宽度
    private itemGap: number = 10; // 间隔
    private isScrolling: boolean = false;
    private targetIndex: number = 0; // 目标中奖索引（0-5）
    private initialPositions: number[] = []; // 记录初始位置
    private turretData: any = null;
    private levelArr = [];
    private awardLevel = 0;

    private awardBodyFrame: cc.SpriteFrame = null;
    private awardFootFrame: cc.SpriteFrame = null;

    protected onLoad(): void {
        this.initItems();
    }


    // 初始化6个item
    private initItems() {
        this.maskNode.active = false;

        this.turretData = jsonSingleton.singleton.getJson(NameTs.turretData);
        let data = jsonSingleton.singleton.getJson(NameTs.buyData);
        let str = Tools.GetArrData("level", util.userData.turretLevel, data);
        this.levelArr = []
        if (str) {
            let arr = JSON.parse(str.arr);
            for (let i = 0; i < arr.length; i++) {
                this.levelArr.push(arr[i].id - 1);
            }
            console.log("|arr========", this.levelArr);
        } else {
            this.levelArr = [0, 1, 2, 3, 4, 5];
        }

        this.itemList = [];
        this.initialPositions = [];
        this.layoutNode.removeAllChildren();
        for (let i = 0; i < 6; i++) {
            let item = cc.instantiate(this.itmeNode);
            item.getChildByName("item").getChildByName("image_frame").getComponent(cc.Sprite).spriteFrame = this.itmeBg[0];
            item.active = true;
            item.y = 0;
            item.x = (this.itemWidth / 2) + i * (this.itemWidth + this.itemGap);
            item.name = "item_" + i;
            this.setItemData(item, i);
            this.layoutNode.addChild(item);
            this.itemList.push(item);
            this.initialPositions.push(item.x); // 记录初始x位置

            // 给每个item打标记，方便后续识别
            item['initialIndex'] = i;
        }

        this.setBtn();

    }

    private setBtn() {
        console.log("Global.ins.userData.random_box =", Global.ins.userData.random_box);
        this.clickBtn.active = Global.ins.userData.random_box <= 0;
        this.clickBtn2.active = Global.ins.userData.random_box > 0;
    }



    // 预加载中奖等级资源
    private preloadAwardFrames(level: number, done: () => void) {
        const data = this.turretData[level];
        let loaded = 0;
        const check = () => { if (++loaded === 2) done(); };
        this.loadAny(data.body, cc.SpriteFrame, (res) => { this.awardBodyFrame = res; check(); }, () => { check(); });
        this.loadAny(data.foot, cc.SpriteFrame, (res) => { this.awardFootFrame = res; check(); }, () => { check(); });
    }

    // 修改 getAwardLevel：先得到等级再预加载
    private getAwardLevel() {

        // 获取this.levelArr里面的最高等级
        let maxLevel = Math.max(...this.levelArr);
        //在随机加1-3级
        maxLevel += Math.floor(Math.random() * 4);
        // 限制最大等级
        this.awardLevel = Math.min(maxLevel, this.turretData.length - 1);

        for (let i = 0; i < this.itemList.length; i++) {
            const item = this.itemList[i];
            item.getChildByName("item").getChildByName("image_frame").getComponent(cc.Sprite).spriteFrame = this.itmeBg[0];
        }

        if (this.awardLevel >= this.turretData.length) this.awardLevel = this.turretData.length - 1;

        this.preloadAwardFrames(this.awardLevel, () => {
            // 资源预加载完成后再开始滚动（如果需要自动开始可在此调用 startScroll）
            console.log("预加载完成 中奖等级:", this.awardLevel + 1);
        });
    }

    // 开始滚动抽奖（提前设置中奖 item）
    private startScroll() {
        if (this.isScrolling) return;
        this.maskNode.active = true;
        this.targetIndex = 2; // 中间位置
        this.getAwardLevel();

        // 提前设置中奖item内容（用预加载的帧，若未完成则先走普通加载）
        this.scheduleOnce(() => {
            const winItem = this.itemList[this.targetIndex];
            this.setItemData(winItem, this.awardLevel, true); // true 表示不再随机覆盖
        }, 1)

        this.isScrolling = true;

        let speed = 5, maxSpeed = 30, minSpeed = 2;
        let acceleration = 1.5, deceleration = 0.8;
        let isAccelerating = true;
        let totalMoved = 0;
        let randomRounds = 6;
        let oneRoundDistance = (this.itemWidth + this.itemGap) * 6;
        let targetDistance = oneRoundDistance * randomRounds;

        const updateCallback = () => {
            if (isAccelerating) {
                speed += acceleration;
                if (speed >= maxSpeed) { speed = maxSpeed; isAccelerating = false; }
            } else {
                if (totalMoved >= targetDistance - 400) {
                    speed -= deceleration;
                    if (speed < minSpeed) speed = minSpeed;
                }
            }

            for (let item of this.itemList) {
                item.x -= speed;
                if (item.x < -(this.itemWidth + this.itemGap)) {
                    item.x += (this.itemWidth + this.itemGap) * this.itemList.length;
                    // 跳过中奖位置，不再随机覆盖
                    if (item['initialIndex'] === this.targetIndex) continue;
                    let randomLevel = Math.floor(Math.random() * 47);
                    this.setItemData(item, randomLevel);
                }
            }

            totalMoved += speed;
            if (totalMoved >= targetDistance && speed <= minSpeed) {
                this.unschedule(updateCallback);
                this.stopAtTarget();
            }
        };

        // 给一帧时间让预加载生效（若资源已在则立即滚动）
        this.schedule(updateCallback, 0.016);
    }

    // 停在目标位置（不再重新设置，避免闪烁）
    private stopAtTarget() {
        let tweenCount = 0;
        for (let item of this.itemList) {
            const targetX = this.initialPositions[item['initialIndex']];
            cc.tween(item)
                .to(0.25, { x: targetX }, { easing: 'sineOut' })
                .call(() => {
                    if (++tweenCount === this.itemList.length) {
                        this.isScrolling = false;
                        this.showResult();
                    }
                })
                .start();
        }
    }

    // 显示中奖结果（只换底框，不重新加载主体资源）
    private async showResult() {
        const item = this.itemList[this.targetIndex];
        item.getChildByName("item").getChildByName("image_frame").getComponent(cc.Sprite).spriteFrame = this.itmeBg[1];
        console.log("中奖索引:", this.targetIndex, "等级:", this.awardLevel + 1);

        let tempNode = cc.instantiate(item.getChildByName("item").getChildByName("haveNode"));
        for (let i = 0; i < tempNode.children.length; i++) {
            tempNode.children[i].scale = 1.3;
        }

        if (Global.ins.userData.random_box > 0) {
            let response2 = await ApiService.ins.useRandomBox();
            if (response2 && response2?.success) {
                util.productTurret(1);
                Global.ins.userData.random_box = response2.data.userdata.random_box;
                this.setBtn();
                cc.game.emit(NameTs.Game_Effect_turret, {
                    node: this.node,
                    num: 1,
                    parent: cc.director.getScene().getChildByName('Canvas'),
                    cloneNode: tempNode,
                    callBack: async () => {
                        cc.game.emit(NameTs.Game_Buy_update, this.awardLevel + 1);
                        this.maskNode.active = false;
                        this.isClick = false;
                    }
                });
            } else {
                this.maskNode.active = false;
                this.isClick = false;
            }
        }

    }

    // 修改 setItemData 支持使用预加载帧
    private setItemData(item: cc.Node, lv: number, isAward: boolean = false) {
        const item2 = item.getChildByName("item");
        const lable_lv = item2.getChildByName("lable_lv").getComponent(cc.Label);
        const dizuo = item2.getChildByName("haveNode").getChildByName("image_icon2").getComponent(cc.Sprite);
        const body = item2.getChildByName("haveNode").getChildByName("image_icon").getComponent(cc.Sprite);
        lv = Math.min(lv, this.turretData.length - 1);
        const data = this.turretData[lv];
        lable_lv.string = "lv" + data.level;

        if (isAward && this.awardBodyFrame && this.awardFootFrame) {
            console.log("datadatadata", data);
            body.spriteFrame = this.awardBodyFrame;
            dizuo.spriteFrame = this.awardFootFrame;
        } else {
            this.loadAny(data.body, cc.SpriteFrame, (res) => { body.spriteFrame = res; }, () => { body.spriteFrame = null; });
            this.loadAny(data.foot, cc.SpriteFrame, (res) => { dizuo.spriteFrame = res; }, () => { dizuo.node.destroy(); });
        }

        dizuo.node.x = Number(data.TujianItemX);
        dizuo.node.y = Number(data.TujianItemY);
    }



    private isClick = false;
    async clickBuy() {
        if (this.isClick) return;
        this.isClick = true;

        soundController.singleton.clickAudio();
        const msg = await ApiService.ins.paycheckin(BuyType.RandomTurret);
        const rsp = msg?.response;
        if (msg.status === 200 && rsp && rsp.success) {
            // const m = await ApiService.ins.purchaseDone(rsp.data.oid);
            // if (m.status === 200 && m.response?.success) {
            //     AssistCtr.showToastTip(t('tips.buy_success'));
            //     let response1 = await ApiService.ins.getUserinfo();
            //     if (response1 && response1?.success) {
            //         if (response1.data.userdata.random_box > 0) {
            //             this.startScroll();
            //         }
            //     }
            // }

            try {
                Global.ins.payment(rsp.data, (status) => {
                    console.log(`tg star pay status :${status}`);
                    if (status === "paid") {
                        const checkFun = async (count: number) => {
                            const m = await ApiService.ins.checkOrder(rsp.data.oid);
                            if (m.status === 200 && m.response?.success) {
                                AssistCtr.showToastTip(t('tips.buy_success'));
                                let response1 = await ApiService.ins.getUserinfo();
                                if (response1 && response1?.success) {
                                    if (response1.data.userdata.random_box > 0) {
                                        this.startScroll();
                                    }
                                }
                            } else {
                                if (--count > 0) {
                                    console.log('checkOrder again', count);
                                    await new Promise(resolve => setTimeout(resolve, 2000));
                                    await checkFun(count);
                                }
                                else {
                                    ApiService.ins.showError(m);
                                }
                            }
                        }
                        checkFun(5);
                    }
                    this.isClick = false;
                })
            } catch (error) {
                console.log(error);
            }
        }
        else {
            ApiService.ins.showError(msg);
            this.isClick = false;
        }
    }

    clickClose() {
        this.closePage();
    }

}
