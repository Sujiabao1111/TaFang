
import baseTs from "../base/baseTs";
import { gameNumerical, gamePass, gameState, propInfo, propState, propType, thingType, updateType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import RedController from "../controlelr/RedController";
import userData from "../data/userData";
import PageManage from "../PageManage";
import soundController from "../soundController";
import { Global } from "../tg/Global";
import util from "../util/util";

const { ccclass, property } = cc._decorator;
@ccclass
export default class ui extends baseTs {

    @property(cc.Label)
    private customsLabel: cc.Label = null; //关卡label

    @property(cc.Node)
    private videoIcon: cc.Node = null; //视频

    @property(cc.Widget)
    private topBar: cc.Widget = null; //顶部

    @property(cc.Label)
    private productLabel: cc.Label = null; //产能值

    @property(cc.Node)
    private touchNode: cc.Node = null; //用于拖动位置的

    @property(cc.Label)
    private coinLabel: cc.Label = null; //金币

    @property(cc.Node)
    private buyBtnNode: cc.Node = null; //购买按钮

    @property(cc.Node)
    private turret: cc.Node = null; //炮塔


    @property(cc.Node)
    private propBox: cc.Node = null; //道具弹窗

    @property(cc.Node)
    private buyEnergy: cc.Node = null; //进度条

    @property(cc.Node)        //新手任务Icon
    private btn_newPlayerTask: cc.Node = null;


    @property({ type: cc.Node, displayName: "垃圾回收节点" })
    private recycleNode: cc.Node = null;

    @property(cc.Sprite)
    private gameStatePic: cc.Sprite = null; //开关Sprite

    @property([cc.SpriteFrame])
    private gameStateSpriteFrame: cc.SpriteFrame[] = []; //开关SpriteFrame

    private productNum: number;//产能
    private EnergyNum: number = 0;//产能

    @property(cc.Node)      //首页任务红点
    private mainTask_red: cc.Node = null;

    @property(cc.Label)     //首页红点可领取任务数量
    private lable_redNum: cc.Label = null;


    @property(cc.Node)      //一日会员
    private oneDayVip: cc.Node = null;


    onLoad() {


        // this.topBar.top += Number(util.iphoneXTop);

        //数据更新
        cc.game.on(NameTs.Game_View_UserDataUpdata, (res) => {
            this.updateData(res);
        }, this);

        this.productNum = gameNumerical.ProductTime;

        this.updateData(updateType.product);
        this.updateData(updateType.coin);

        util.GlobalMap.set("coin", this.coinLabel.node.getParent().children[0]);
        util.GlobalMap.set("turretBuy", this.turret);


        //拿起
        cc.game.on(NameTs.Game_Turret_PickUp, (res) => {

            this.buyBtnNode.active = false;
            this.turret.active = false;
            this.recycleNode.active = true;

        }, this);

        //放下
        cc.game.on(NameTs.Game_Turret_PutDown, (res) => {

            this.buyBtnNode.active = true;
            this.turret.active = true;
            this.recycleNode.active = false;

        }, this);

        //关卡标题更新
        cc.game.on(NameTs.Game_View_CustomsUpdata, () => {
            this.changeLevelData();
        }, this);

        cc.game.on(NameTs.Game_Tool_Use, () => {
            if (util.levelState == gameState.stop) {
                this.stopGame();
            }
        }, this)

        cc.game.on(NameTs.Game_Stop, () => {
            this.gameStatePic.spriteFrame = this.gameStateSpriteFrame[util.levelState == 1 ? 1 : 0];
        }, this)

        cc.game.on(NameTs.Game_Resume, () => {
            this.gameStatePic.spriteFrame = this.gameStateSpriteFrame[util.levelState == 1 ? 1 : 0];
        }, this)

        // cc.game.on(NameTs.onBackPressed, () => {
        //     console.log("安卓调用物理返回键并取消cocos监听");
        //     cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onBackPressed, this);
        //     this.onBackPressed();
        // }, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onBackPressed, this);

        cc.game.on(NameTs.Game_Start, () => {
            if (util.isCheckTaskRed) {
                util.isCheckTaskRed = false;
                RedController.checkTaskRed((okNum) => {
                    if (okNum && okNum > 0) {
                        this.mainTask_red.active = true;
                        this.lable_redNum.string = okNum;
                    }
                    else {
                        this.mainTask_red.active = false;
                    }
                })
            }
        }, this);

        cc.game.on(NameTs.Game_Main_Task_updata, (res) => {
            if (res != null) {
                util.isCheckTaskRed = false;
                this.mainTask_red.active = res > 0;
                this.lable_redNum.string = res;
            }
        }, this);

        if (!util.chekcToday()) {
            util.userData.GetTurretNum = 18;
            util.setStorage(util.localDiary.GetTurretNum, util.userData.GetTurretNum);
        }

        cc.tween(this.buyEnergy).repeatForever(cc.tween().to(2, { x: 319 / 2 }).to(0, { x: -319 / 2 })).start();

        this.btn_newPlayerTask.active = Global.ins.newbenefits == 1;
        // this.btn_newPlayerTask.active = true;
        if (this.btn_newPlayerTask.active) {
            if (this.btn_newPlayerTask.getChildByName("light")) {
                let image = this.btn_newPlayerTask.getChildByName("light");
                image.active = true;
                image.stopAllActions();
                cc.tween(image).by(1, { angle: -360 }).repeatForever().start();
            }
        }
        cc.game.on(NameTs.Game_CloseNewPlayerTask, () => {
            this.btn_newPlayerTask.active = false;
        }, this);


        // RedController.initGoldWheelData(this.wheel_red);
        // RedController.initSignRedData(this.signRed_red);
    }

    start() {
        this.changeLevelData();
        // 将垃圾箱放进levelMap数组进去
        this.scheduleOnce(() => {
            let pos: cc.Vec2 = this.recycleNode.getParent().convertToWorldSpaceAR(this.recycleNode.getPosition());
            pos = this.touchNode.convertToNodeSpaceAR(pos);
            util.levelMap.push({
                type: thingType.recycle,
                pos: pos,
                width: this.recycleNode.width,
                height: this.recycleNode.height
            });
        }, .1);
    }


    /**
     * 购买
     */
    buyBtn() {
        cc.game.emit(NameTs.Game_Turret_Creator);
    }

    /**
     * 暂停游戏
     */
    stopGame() {
        soundController.singleton.clickAudio();
        util.levelState = util.levelState == gameState.stop ? gameState.start : gameState.stop;
        cc.game.emit(util.levelState == gameState.stop ? NameTs.Game_Stop : NameTs.Game_Resume);
        this.gameStatePic.spriteFrame = this.gameStateSpriteFrame[util.levelState == 1 ? 1 : 0];
        util.isStop = !util.isStop;
    }

    /**
     * 设置游戏
     */
    SetGame() {
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameSet);
    }
    
    /**
     * 图鉴
     */
    TuJianGame() {
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTuJian);
    }

    /**
     * 道具
     */
    PropGame() {
        soundController.singleton.clickAudio();
        this.propBox.active = !this.propBox.active;
        // cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameProp);
    }

    /**
     * 签到
     */
    SignGame() {
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameSign);
    }

    /**
     * 提现
     */
    walletGame(e, data) {
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameWallet);
    }

    /**
     * 任务
     */
    async TaskGame() {
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameTask);
    }

    /**
     * 一日会员
     */
    async clickOneDayVip() {
        soundController.singleton.clickAudio();
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameOneDayMembership);
    }

    /**
    * 随机炮塔
    */
    async clickRandomTurret() {
        soundController.singleton.clickAudio();
        this.showPage(pageTs.pageName.GameRandomTurret, null);
    }

    async clickPass() {
        soundController.singleton.clickAudio();
        this.showPage(pageTs.pageName.GamePass, null);
    }

    /**
     * 点击物理返回键
     */
    onBackPressed() {

    }

    /**
     * 展示新手任务
     */
    clickNewPlayerTask() {
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameNewPlayerTask);
    }

    /**
     * 展示炮王任务
     */
    async clickKingPaoTask() {
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameKingPao);

    }

    /**
     * 点击金币转盘
     */
    clickGoldWheel() {
        PageManage.singleton.showPage(pageTs.pageName.GameGoldWheel)
        RedController.checkMainGoldWheelRed(false);
    }


    /**
    * 抽手机
    */
    clickNewBigWheel() {


    }

    /**
     * 增加储存值
     */

    productTurret(dt: number) {
        if (util.userData.product >= gameNumerical.ProductMax) {
            this.buyEnergy.y = -50 + 30 * 5;
            return;
        }
        if (util.levelState == gameState.stop) return;
        util.gameTime += dt;
        this.productNum -= dt;
        this.EnergyNum += dt;
        this.buyEnergy.y = -50 + this.EnergyNum * 5;
        if (this.productNum <= 0) {
            console.log(this.EnergyNum, 'this.EnergyNum')
            this.EnergyNum = 0;
            this.buyEnergy.y = -50;
            this.productNum = gameNumerical.ProductTime;
            util.productTurret();
            this.updateData(updateType.product);
            return;
        }
    }

    /**
     * 更新数据
     * @param type 哪个
     */
    updateData(type: number) {
        let userData = util.userData;
        switch (type) {
            case updateType.coin:
                this.coinLabel.string = String(userData.coin);
                break;
            case updateType.product:
                this.productLabel.string = userData.product + "/" + gameNumerical.ProductMax;
                if (util.userData.GetTurretNum > 0) {
                    this.productLabel.node.active = userData.product > 0;
                    this.videoIcon.active = userData.product <= 0;
                } else {
                    this.videoIcon.active = false;
                    this.productLabel.node.active = true;
                }
                // RedController.checkMainGoldWheelRed();
                break;
        }

    }

    update(dt) {
        this.productTurret(dt);
        this.propMonitor(dt);
    }


    /**
     * 道具使用监听
     * @param dt 
     */
    propMonitor(dt) {
        let propData: propInfo[] = util.userData.prop;
        let frozenData = propData[propType.frozen - 1];
        let shockData = propData[propType.shock - 1];
        let shieldData = propData[propType.shield - 1];
        let autoData = propData[propType.auto - 1];
        let energizedData = propData[propType.energized - 1];
        this.propCountDown(frozenData, dt);
        this.propCountDown(shockData, dt);
        this.propCountDown(shieldData, dt);
        this.propCountDown(autoData, dt);
        this.propCountDown(energizedData, dt);
        this.propCountDown(util.doubleEarn, dt);
    }

    /**
     * 倒计时
     * @param data 数据
     * @param dt 
     */
    propCountDown(data, dt) {
        if (data.use == propState.start && util.levelState == gameState.start) {
            data.time -= dt;
            if (data.time <= 0) {
                data.use = propState.end;
                data.time = null;
                if (data.type == 3) {
                    cc.game.emit(NameTs.Close_Shield)
                }
            }
        }
    }

    /**
     * 更新关卡title
     */
    changeLevelData() {
        let userData: userData = util.userData;//用户数据
        let bigLevel: number = userData.customs.big; //大关卡
        let samllLevel: number = userData.customs.small;//小关卡
        // console.log("关卡" + bigLevel + "-" + samllLevel);
        this.customsLabel.string = bigLevel + "-" + samllLevel;
    }




}
