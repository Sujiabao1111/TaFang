import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { updateType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import pool from "../common/pool";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

export interface cashMap {
    amount: string	    //提现金额（元）
    banner: string	    //按钮
    id: number	        //业务ID
    required: number	//关卡要求
    mark: string	    //角标
    markResource: string //角标资源
    point: number	    //提现所需金币
    sortNo: number	    //排序号    
    type: number        //类型: 0-普通 1-新人
    grouping: number     //分组，1-快速提现2-日常提现
    hasWithdraw: number  //该选项是否已提现，1-已提现2-未提现
    rules: Array<Array<rule>>
    clockInToday: number //今日是否打卡0-今日已打卡，1-直接打卡，2-视频打卡
}

export interface rule {
    demand: number                   //要求数量
    type: number                     //规则类型，1-炮塔等级2-红包金额3-打卡总次数4-累计激励视频总次数5-前置任务
    userCurrentProgress: number      //用户当前进度
}

export interface walletData {
    bindAliPay: boolean          //是否已绑定支付宝账号
    cashOutMap: {
        1: Array<cashMap>               //提现列表
        2: Array<cashMap>               //提现列表
    }
    gold: {                      //金币
        exchangeAmount: string	 //可兑换金额(元)
        exchangeRate: number	 //汇率，兑换一元所需金币值
        goldPoint: number	     //金币值
    }
    marquee: Array<string>,       //跑马灯
    newUserList: Array<cashMap>  //新人专享列表
    rule: string	             //提现规则
    weChat: {                    //微信信息
        avatarUrl: string	     //头像
        nickname: string         //昵称
    }
}

export interface videoCardMain {
    clockInDays: number,        //已打卡天数
    needClockInDays: number,    //需要打卡的天数
    todayChecked: boolean,      //今日是否已打卡 false-未打卡 true-已打卡
}

@ccclass
export default class gameWallet extends baseTs {

    @property(cc.Label)
    lable_myGold: cc.Label = null;

    @property(cc.Label)
    lable_money: cc.Label = null;

    @property(cc.Node)
    sucView: cc.Node = null;

    @property(cc.Node)
    ruleView: cc.Node = null;

    @property(cc.Node)
    tipFrameView: cc.Node = null;

    @property(cc.Node)
    selectLayout: cc.Node = null;

    @property(cc.Node)
    selectLayout2: cc.Node = null;

    @property(cc.Node)
    img_frame: cc.Node = null;

    @property([cc.SpriteFrame])
    selectSprArray: Array<cc.SpriteFrame> = [];

    @property(cc.Node)
    spine_shou: cc.Node = null;

    @property(cc.Node)
    conditionNode: cc.Node = null;

    @property(cc.Node)
    layout_tiXianTip: cc.Node = null;

    @property(cc.Node)
    btn_goPass: cc.Node = null;

    @property(cc.SpriteFrame)
    btnSprArray: Array<cc.SpriteFrame> = [];

    @property(cc.Node)
    btn_selectMoney: cc.Node = null;

    //提现规则---------------------------
    @property(cc.Label)
    lable_ruleContent: cc.Label = null;

    //提现成功---------------------------
    @property(cc.Label)
    lable_sucTip: cc.Label = null;

    //提现提示
    @property(cc.Label)
    lable_tipNeedPass: cc.Label = null;

    //增加东西
    @property(cc.Prefab)
    addCoinItem: cc.Prefab = null;
    //在哪里增加
    @property(cc.Node)
    addCoinBox: cc.Node = null;


    //------脚本变量------
    private curSelectNode: cc.Node = null;       //当前选中的金额框       
    private closeCallback: Function = null;
    private wxData = null;

    private isInsert: boolean = false;
    private onceEnter: boolean = true;

    private tempRules: Array<rule> = [];

    private btnDataStr = `cashData`;

    private tixian_state = `当前选择的提现档位`;

    private walletPool:pool ;

    onLoad() {
        cc.game.on(NameTs.bindWechatSuccess, this.wxSucFun, this);
    }

    init(data) {
        if (data) {
            this.setData(data);
        }

        this.isInsert = Math.random() > .5;

        if (this.isInsert) {
            AdController.preVideoAd(AdPosition.WalletAwardInsert);
        }

        //数据更新
        cc.game.on(NameTs.Game_View_UserDataUpdata,(res)=>{
            if(res==updateType.coin){
                let userData = util.userData;
                this.lable_myGold.string = String(userData.coin);
            }
        },this);

        //增加金币
        cc.game.on(NameTs.Game_Wallet_AddCoin,(res)=>{
            if(res>0){
                this.createNum(res)
            }
        },this);

        this.walletPool = new pool(cc.instantiate(this.addCoinItem));

    }

    onEnable() {
        //this.initData();
        TrackMgr.AppViewScreen({
            app_page_title: "提现页"
        })
    }

    onDisable() {
        if (this.spine_shou.active) {
            this.spine_shou.active = false;
        }
        this.ruleView.active = false;
        this.sucView.active = false;
        this.tipFrameView.active = false;
        this.closeCallback && this.closeCallback();
        this.closeCallback = null;

        this.walletPool.clearPool();
    }

    public openGuide() {
        this.spine_shou.active = true;
    }

    wxSucFun() {
        AssistCtr.showToastTip("绑定成功");
        this.initData();
    }

    initData() {
        XMSDK.getdataStr({
            url: UrlConst.wallet_main2,
            onSuccess: res => {
                if (!this.isValid) {
                    return;
                }

                if (res.code === 0 && res.data) {
                    this.setData(res.data)
                }
                else {

                }
            },
            onFail: err => {

            }
        }
        )
    }
    setCloseCall(callback: Function) {
        this.closeCallback = callback
    }

    setlayout(parentNode: cc.Node, data: Array<cashMap>, pre: cc.Node, maxNum: number) {
        let parentNodeChild = parentNode.children;
        let addNum = data.length - parentNodeChild.length;
        if (addNum > maxNum) {
            addNum = maxNum;
        }
        if (addNum > 0) {
            for (let i = 0; i < addNum; i++) {
                let ins = cc.instantiate(pre);
                ins.parent = parentNode;
            }
        }
        else {
            addNum = Math.abs(addNum);
            for (let i = 0; i < addNum; i++) {
                if (parentNodeChild[0]) {
                    parentNodeChild[0].destroy();
                }
            }
        }

        for (let i = 0; i < parentNodeChild.length; i++) {
            parentNodeChild[i].targetOff(this);
            parentNodeChild[i].on(cc.Node.EventType.TOUCH_END, () => {
                soundController.singleton.clickAudio();
                if (parentNodeChild[i] && parentNodeChild[i][`${this.btnDataStr}`] && parentNodeChild[i][`${this.btnDataStr}`].hasWithdraw == 1) {
                    AssistCtr.showToastTip("已提现")
                }
                else {
                    this.clickSelectMoney(parentNodeChild[i]);
                }
            }, this)
        }

        let tempColor = new cc.Color();
        for (let i = 0; i < data.length; i++) {   //遍历提现列表            
            if (parentNodeChild[i] && data[i]) {
                let cash: cashMap = data[i];
                let tempAllRules = [];
                for (let key in cash.rules) {
                    tempAllRules.push(cash.rules[key]);
                }
                cash.rules = tempAllRules;

                parentNodeChild[i].getChildByName("layout").getChildByName("lable_num").getComponent(cc.Label).string = cash.amount;
                parentNodeChild[i][`${this.btnDataStr}`] = cash;
                parentNodeChild[i].active = true;

                parentNodeChild[i].getChildByName("layout").getChildByName("lable_num").color = tempColor.fromHEX("#BB420E");
                parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").color = tempColor.fromHEX("#FFFFFF");

                let btnType = (cash.mark != "可打卡" || (cash.clockInToday != 0 && cash.clockInToday != 3));
                if (cash.mark && cash.mark != "" && cash.hasWithdraw == 2 && cash.markResource && cash.markResource != "" && btnType) {
                    if (cash.sortNo == 2 && cash.clockInToday == 0) {
                        let allRules = cash.rules;
                        let isCanCard = true;
                        for (let i = 0; i < allRules.length; i++) {
                            let rules = allRules[i];
                            for (let j = 0; j < rules.length; j++) {
                                if (rules[j].type == 3) {
                                    if (rules[j].userCurrentProgress >= rules[j].demand) {
                                        isCanCard = false;
                                    }
                                    else {
                                        isCanCard = true;
                                    }
                                }
                            }
                        }
                        if (isCanCard) {
                            let str = AssistCtr.formatData24();
                            parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").getComponent(cc.Label).string = str;
                            parentNodeChild[i].getChildByName("img_state").getChildByName("lable").getComponent(cc.Label).string = str;
                            this.schedule(() => {
                                let str = AssistCtr.formatData24();
                                parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").getComponent(cc.Label).string = str;
                                parentNodeChild[i].getChildByName("img_state").getChildByName("lable").getComponent(cc.Label).string = str;
                            }, 1)
                            this.setMarkImage(parentNodeChild[i].getChildByName("img_state").getComponent(cc.Sprite), `${cash.markResource}`)
                        }
                        else {
                            parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").getComponent(cc.Label).string = cash.mark;
                            parentNodeChild[i].getChildByName("img_state").getChildByName("lable").getComponent(cc.Label).string = cash.mark;
                            this.setMarkImage(parentNodeChild[i].getChildByName("img_state").getComponent(cc.Sprite), `${cash.markResource}`)
                        }
                    }
                    else {
                        parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").getComponent(cc.Label).string = cash.mark;
                        parentNodeChild[i].getChildByName("img_state").getChildByName("lable").getComponent(cc.Label).string = cash.mark;
                        this.setMarkImage(parentNodeChild[i].getChildByName("img_state").getComponent(cc.Sprite), `${cash.markResource}`)
                    }
                }
                else {
                    parentNodeChild[i].getChildByName("img_state").getChildByName("lable_state").active = false;
                    parentNodeChild[i].getChildByName("img_state").active = false;
                }

                if (cash.hasWithdraw == 1) {
                    parentNodeChild[i].opacity = 150;
                    console.log("已提现:",cash.amount);
                    if((cash.type==1&&AssistCtr.isATest())||(cash.type==9&&!AssistCtr.isATest())){
                        cc.game.emit(NameTs.Game_SavingPost_Lock);
                    }
                }
                else {
                    parentNodeChild[i].opacity = 255;
                }
            }
        }
    }

    setData(data: walletData) {
        let self = this;

        if (self.lable_myGold) {
            // self.lable_myGold.string = `${AssistCtr.convertNumber(data.gold.goldPoint)}`;
            self.lable_myGold.string = data.gold.goldPoint+"";
        }
        if (self.lable_money) {
            self.lable_money.string = `约${data.gold.exchangeAmount}元`;
        }
        self.setlayout(self.selectLayout, data.cashOutMap[1], self.btn_selectMoney, 6);
        self.setlayout(self.selectLayout2, data.cashOutMap[2], self.btn_selectMoney, 3);

        self.setEffect();

        if (data.weChat) {
            this.wxData = data.weChat;
        }
        else {
            this.wxData = null;
        }

        if (self.lable_ruleContent) {
            self.lable_ruleContent.string = data.rule;
        }

        self.setClickBtn();
    }

    //设置动态效果
    setEffect() {
        let self = this;
        let selectLayout = self.selectLayout.children;
        for (let i = 0; i < selectLayout.length; i++) {
            if (selectLayout[i]) {
                let btnData: cashMap = selectLayout[i][`${this.btnDataStr}`];
                if (btnData) {
                    let btnType = (btnData.mark != "可打卡" || (btnData.clockInToday != 0 && btnData.clockInToday != 3));
                    if (((btnData.amount == "0.3" && btnData.mark == "今日可领") || btnData.amount == "10") && btnData.hasWithdraw == 2 && btnType) {
                        //clockInToday: number //今日是否打卡0-今日已打卡，1-直接打卡，2-视频打卡
                        if (selectLayout[i]) {
                            if (selectLayout[i].getChildByName("img_state") && selectLayout[i].getChildByName("img_state").active) {
                                selectLayout[i].getChildByName("img_state").stopAllActions();
                                // cc.tween(selectLayout[i].getChildByName("img_state")).repeatForever(
                                //     cc.tween().by(0.32, { y: 10 }, { easing: "easeInSine" }).by(0.32, { y: -10 }, { easing: "easeOutSine" })
                                // ).start();

                                cc.tween(selectLayout[i].getChildByName("img_state")).repeatForever(
                                    cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })
                                ).start();
                            }
                            if (selectLayout[i].getChildByName("guangNode") && selectLayout[i].getChildByName("guangNode").getChildByName("saoguang")) {
                                let saoGuang: cc.Node = selectLayout[i].getChildByName("guangNode").getChildByName("saoguang");
                                saoGuang.stopAllActions();
                                saoGuang.x = -145;
                                selectLayout[i].getChildByName("guangNode").active = true;
                                cc.tween(saoGuang).repeatForever(
                                    cc.tween().to(0.64, { x: 150 }).delay(0.64).call(() => { saoGuang.x = -145 })
                                ).start();
                            }
                        }
                    }
                    else {
                        if (selectLayout[i].getChildByName("img_state")) {
                            selectLayout[i].getChildByName("img_state").stopAllActions();
                            selectLayout[i].getChildByName("img_state").angle = 0;
                        }
                        if (selectLayout[i].getChildByName("guangNode")) {
                            let saoGuang: cc.Node = selectLayout[i].getChildByName("guangNode").getChildByName("saoguang");
                            saoGuang.stopAllActions();
                            saoGuang.x = -145;
                            selectLayout[i].getChildByName("guangNode").active = false;
                        }
                    }
                }
            }
        }
    }

    //设置角标
    setMarkImage(targetSpr: cc.Sprite, urlStr: string) {
        this.loadAny(urlStr, cc.SpriteFrame, (res) => {
            if (targetSpr) {
                targetSpr.spriteFrame = res;
                targetSpr.node.active = true;
            }
        }, () => { if (targetSpr) targetSpr.node.active = false; })
    }

    setClickBtn() {
        let self = this;
        let selectNode = self.selectLayout.children;
        let onceTarget = null;
        for (let i = 0; i < selectNode.length; i++) {
            if (selectNode[i] && selectNode[i][`${self.btnDataStr}`] && selectNode[i][`${self.btnDataStr}`].hasWithdraw == 2) {
                onceTarget = selectNode[i];
                break;
            }
        }
        if (!onceTarget) {
            let selectNode2 = self.selectLayout2.children;
            for (let i = 0; i < selectNode2.length; i++) {
                if (selectNode2[i] && selectNode2[i][`${self.btnDataStr}`] && selectNode2[i][`${self.btnDataStr}`].hasWithdraw == 2) {
                    onceTarget = selectNode2[i];
                    break;
                }
            }
        }


        if (selectNode && selectNode.length > 0) {
            if (self.onceEnter) {
                if (onceTarget) {
                    self.clickSelectMoney(onceTarget);
                }
                self.onceEnter = false;
            }
            else {
                if (self.curSelectNode && self.curSelectNode[`${this.btnDataStr}`] && self.curSelectNode[`${this.btnDataStr}`].hasWithdraw == 2) {
                    self.clickSelectMoney(self.curSelectNode);
                }
                else {
                    if (onceTarget) {
                        self.clickSelectMoney(onceTarget);
                    }
                    else {
                        if (self.curSelectNode) {
                            self.curSelectNode.getComponent(cc.Sprite).spriteFrame = self.selectSprArray[0];
                        }
                        self.conditionNode.active = false;
                        self.img_frame.height = 780;
                    }
                }
            }
        }
    }

    clickSelectMoney(target: cc.Node) {
        let self = this;

        if (self.curSelectNode) {
            self.curSelectNode.getComponent(cc.Sprite).spriteFrame = self.selectSprArray[0];
        }
        self.curSelectNode = target;
        if (!self.curSelectNode[`${this.btnDataStr}`]) {
            return;
        }

        let curSelectData: cashMap = self.curSelectNode[`${this.btnDataStr}`];
        target.getComponent(cc.Sprite).spriteFrame = self.selectSprArray[1];

        let isHaveCard = false;         //是否有打卡任务        
        let tempRule = [];                      //分类好当前组提现要求
        let tempRuleData: Array<rule> = [];      //当前组提现要求数据
        let allRules = curSelectData.rules;
        for (let i = 0; i < allRules.length; i++) {
            let rules = allRules[i];
            for (let j = 0; j < rules.length; j++) {
                if (rules[j].type != 5 && rules[j].userCurrentProgress < rules[j].demand) {
                    tempRuleData = rules;
                    break;
                }
            }
            if (tempRuleData && tempRuleData.length > 0) {
                break;
            }
        }
        if (tempRuleData && tempRuleData.length == 0) {
            tempRuleData = allRules[allRules.length - 1];
        }
        self.tempRules = tempRuleData;


        if (tempRuleData && tempRuleData.length > 0) {
            let rulesA = tempRuleData;
            for (let i = 0; i < rulesA.length; i++) {
                if (rulesA[i].type != 5) {
                    if (rulesA[i].type == 3) {
                        isHaveCard = true;
                    }
                    tempRule.push(rulesA[i]);
                }
            }
        }

        if (tempRule && tempRule.length > 0) {
            self.conditionNode.active = true;
            let layoutChild = self.layout_tiXianTip.children;
            for (let i = 0; i < layoutChild.length; i++) {
                layoutChild[i].active = false;
            }


            self.img_frame.height = 983;
            self.btn_goPass.stopAllActions();
            self.btn_goPass.scale = 1;
            let isOkRules = false;          //是否完成需求            

            let tempColor = new cc.Color();
            let rules = tempRule;
            let okNum = 0;
            for (let i = 0; i < rules.length; i++) {
                let ruleData = rules[i];
                let lableTiXianTip = self.layout_tiXianTip.children[i];

                if (lableTiXianTip) {
                    if (ruleData.userCurrentProgress >= ruleData.demand) {
                        lableTiXianTip.color = tempColor.fromHEX("#507900");
                    }
                    else {
                        lableTiXianTip.color = tempColor.fromHEX("#F00F00");
                    }

                    if (ruleData.type == 1) {
                        lableTiXianTip.getComponent(cc.Label).string = `炮塔等级达到${ruleData.demand}级(${ruleData.userCurrentProgress}/${ruleData.demand})`;
                    }
                    else if (ruleData.type == 2) {
                        lableTiXianTip.getComponent(cc.Label).string = `需红包金额${AssistCtr.convertNumber(ruleData.demand)}(${AssistCtr.convertNumber(ruleData.userCurrentProgress)}/${AssistCtr.convertNumber(ruleData.demand)})`;
                    }
                    else if (ruleData.type == 3) {
                        lableTiXianTip.getComponent(cc.Label).string = `需打卡${ruleData.demand}次,已打卡(${ruleData.userCurrentProgress}/${ruleData.demand})`;
                    }
                    else if (ruleData.type == 4) {
                        lableTiXianTip.getComponent(cc.Label).string = `需累计激励视频总次数${ruleData.demand}次(${ruleData.userCurrentProgress}/${ruleData.demand})`;
                    }
                    lableTiXianTip.active = true;
                }
                if (ruleData.userCurrentProgress >= ruleData.demand) {
                    okNum++;
                }
            }
            if (okNum >= rules.length) {
                isOkRules = true;
            }

            if (isOkRules) {
                self.btn_goPass.active = false;
                self.conditionNode.getChildByName("img_finish").active = true;
            }
            else {
                self.btn_goPass.active = true;
                self.conditionNode.getChildByName("img_finish").active = false;

                if (isHaveCard) {
                    if (curSelectData.clockInToday == 0) {
                        self.btn_goPass.getChildByName(`layout`).getChildByName(`lable`).getComponent(cc.Label).string = `已打卡`;
                        self.btn_goPass.getChildByName(`layout`).getChildByName(`lable`).getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#757575`);
                        self.btn_goPass.getComponent(cc.Sprite).spriteFrame = self.btnSprArray[1];
                        self.btn_goPass.getChildByName(`layout`).getChildByName(`img_icon`).active = false;
                    }
                    else if (curSelectData.clockInToday == 3) {
                        self.btn_goPass.getChildByName(`layout`).getChildByName(`img_icon`).active = false;
                        self.btn_goPass.getChildByName(`layout`).getChildByName(`lable`).getComponent(cc.Label).string = `去合成`;
                        self.btn_goPass.getChildByName(`layout`).getChildByName(`lable`).getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#507900`);
                        self.btn_goPass.getComponent(cc.Sprite).spriteFrame = self.btnSprArray[0];
                    }
                    else {
                        if (curSelectData.clockInToday == 1) {
                            self.btn_goPass.getChildByName(`layout`).getChildByName(`img_icon`).active = false;
                        }
                        else {
                            self.btn_goPass.getChildByName(`layout`).getChildByName(`img_icon`).active = true;
                        }

                        cc.tween(self.btn_goPass).repeatForever(
                            cc.tween().to(.4, { scale: 1.2 }).to(.4, { scale: 1 })
                        ).start();

                        self.btn_goPass.getChildByName(`layout`).getChildByName(`lable`).getComponent(cc.Label).string = `打卡`;
                        self.btn_goPass.getChildByName(`layout`).getChildByName(`lable`).getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#507900`);
                        self.btn_goPass.getComponent(cc.Sprite).spriteFrame = self.btnSprArray[0];
                    }
                }
                else {
                    self.btn_goPass.getChildByName(`layout`).getChildByName(`img_icon`).active = false;
                    self.btn_goPass.getChildByName(`layout`).getChildByName(`lable`).getComponent(cc.Label).string = `去合成`;
                    self.btn_goPass.getChildByName(`layout`).getChildByName(`lable`).getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#507900`);
                    self.btn_goPass.getComponent(cc.Sprite).spriteFrame = self.btnSprArray[0];
                }
            }
        }
        else {
            self.conditionNode.active = false;
            self.img_frame.height = 780;
        }
        if (isHaveCard) {
            if (curSelectData.mark) {
                self.tixian_state = `${curSelectData.amount}打卡任务<${curSelectData.mark}>`
            }
            else {
                self.tixian_state = `${curSelectData.amount}打卡任务<无>`
            }
        }
        else {
            if (curSelectData.mark) {
                self.tixian_state = `${curSelectData.amount}档位<${curSelectData.mark}>`
            }
            else {
                self.tixian_state = `${curSelectData.amount}档位<无>`
            }
        }
        let str1 = this.checkIsTiXian(curSelectData);
        let str2 = this.checkIsTiXian2();
        if(str1==""&&str2==""){
            if(!util.adPreObj[AdPosition.getWalletMoneyVideo]){
                util.preloadAd(AdPosition.getWalletMoneyVideo);
            }
        }
        cc.error("选中的按钮", curSelectData);
    }

    clickOpenRule() {
        soundController.singleton.clickAudio();
        this.ruleView.active = true;

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: `提现规则`,
        })

        TrackMgr.AppClick({
            app_page_title: "我的钱包",
            app_ck_module: "提现规则",
            app_exposure_type: "icon",
        })
    }

    clickGetMoney() {
        let self = this;
        soundController.singleton.clickAudio();

        let curSelectData = self.curSelectNode[`${this.btnDataStr}`];

        if (!self.curSelectNode || !curSelectData) {
            AssistCtr.showToastTip("请选择提现金额");
        }
        else if (self.curSelectNode && curSelectData && self.wxData) {
            let str1 = this.checkIsTiXian(curSelectData);
            let str2 = this.checkIsTiXian2();
            if (str1 != "") {
                AssistCtr.showToastTip(str1);
            }
            else {
                AdController.loadAd(AdPosition.getWalletMoneyVideo, (res) => {

                    if(util.adPreObj[AdPosition.getWalletMoneyVideo]){
                        util.preloadAd(AdPosition.getWalletMoneyVideo);
                    }

                    if (str2 != "") {
                        AssistCtr.showToastTip(str2);
                    }
                    else {
                        
                        util.sendCoinData(()=>{

                            XMSDK.post({
                                url: UrlConst.wallet_get,
                                data: {
                                    id: curSelectData.id,
                                    type: 0
                                },
                                onSuccess: res => {
                                    if (!this.isValid) {
                                        return;
                                    }
    
                                    if (res.code === 0) {
                                        soundController.singleton.clickAudio();
                                        self.sucView.active = true;
                                        self.lable_sucTip.string = `你的提现已申请成功，稍后可在微信\n查看是否转账成功。`;
                                        self.initData();
    
                                        util.addCoin(-curSelectData.point)
                                        //GameInfo.useGold(parseInt(curSelectData.amount) * GameInfo.getChangeRate());
                                        TrackMgr.apply_for_withdrawal({
                                            applications_amount: Number(curSelectData.amount),
                                            application_status: `成功`,
                                            applications_level: Number(curSelectData.amount),
                                            is_satisfy_condition: true,
                                            markStr: curSelectData.mark,
                                        })
    
                                        TrackMgr.AppBuyProductDialog_hcdg({
                                            dialog_name_hcdg: `提现申请成功`,
                                        })
                                    }
                                    else {
                                        let str = `${res.message}`;
    
                                        TrackMgr.apply_for_withdrawal({
                                            applications_amount: Number(curSelectData.amount),
                                            application_status: `失败`,
                                            failure_cause: `${res.message}`,
                                            applications_level: Number(curSelectData.amount),
                                            is_satisfy_condition: false,
                                            markStr: curSelectData.mark,
                                        })
                                        // self.lable_tipNeedPass.string = `${str}`;
                                        // self.tipFrameView.active = true;
                                        AssistCtr.showToastTip(str);
                                    }
                                },
                                onFail: err => {
    
                                }
                            })
                        });

                    }
                }, () => {
                    TrackMgr.apply_for_withdrawal({
                        applications_amount: Number(curSelectData.amount),
                        application_status: `失败`,
                        failure_cause: `成功提现激励视频无完整播放`,
                        applications_level: Number(curSelectData.amount),
                        is_satisfy_condition: false,
                        markStr: curSelectData.mark,
                    })
                    AssistCtr.showToastTip("加载视频失败，请稍后！");
                    
                })
            }
        }
        else if (!self.wxData) {
            self.clickBangDingwx();
        }
    }

    checkIsTiXian(curSelectData: cashMap): string {
        let self = this;
        let str = "";
        let rules = self.tempRules;
        let tempRule2: Array<rule> = [];

        if (rules) {
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].type != 5) {
                    tempRule2.push(rules[i]);
                }
            }
        }

        ///规则类型，1-炮塔等级2-红包金额3-打卡总次数4-累计激励视频总次数5-前置任务
        if (str == "") {
            if (self.conditionNode.active && !self.conditionNode.getChildByName("img_finish").active) {
                if (tempRule2 && tempRule2.length > 0) {
                    for (let i = 0; i < tempRule2.length; i++) {
                        let ruleData = tempRule2[i];
                        if (ruleData.userCurrentProgress < ruleData.demand) {
                            if (ruleData.type == 1) {
                                str = `炮塔等级到${ruleData.demand}级可提现`;
                            }
                            else if (ruleData.type == 2) {
                                if (util.userData.coin < curSelectData.point) {
                                    let curGold = parseInt(curSelectData.amount) - parseInt(util.findGoldCash());
                                    if (curGold) {
                                        str = `再赚${curGold}元就能提现啦!`;
                                    }
                                    else {
                                        str = `再赚${curSelectData.amount}元就能提现啦!`;
                                    }

                                    TrackMgr.apply_for_withdrawal({
                                        applications_amount: Number(curSelectData.amount),
                                        application_status: `失败`,
                                        failure_cause: "金币数不足",
                                        applications_level: Number(curSelectData.amount),
                                        is_satisfy_condition: false,
                                        markStr: curSelectData.mark,
                                    })
                                }
                            }
                            else if (ruleData.type == 3) {
                                str = `还需打卡${ruleData.demand - ruleData.userCurrentProgress}天!`;
                            }
                            else if (ruleData.type == 4) {
                                str = `还需累积看视频${ruleData.demand - ruleData.userCurrentProgress}次!`;
                            }
                            break;
                        }
                    }
                }
            }
        }
        return str;
    }

    checkIsTiXian2() {
        let self = this;
        let str = "";
        let rules = self.tempRules;
        let tempRule1: Array<rule> = [];

        if (rules) {
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].type == 5) {
                    tempRule1.push(rules[i]);
                }
            }
        }

        let selectBtnChild1 = this.selectLayout.children;
        let selectBtnChild2 = this.selectLayout2.children;
        for (let i = 0; i < tempRule1.length; i++) {
            let targetId = tempRule1[i].demand;
            for (let j = 0; j < selectBtnChild1.length; j++) {
                if (selectBtnChild1[j] && selectBtnChild1[j][`${this.btnDataStr}`]) {
                    let btnData: cashMap = selectBtnChild1[j][`${this.btnDataStr}`];
                    if (btnData.id == targetId && btnData.hasWithdraw == 2) {
                        if (btnData.mark && btnData.mark != "") {
                            str = `请先提现${btnData.mark}${btnData.amount}元`;
                        }
                        else {
                            str = `请先提现${btnData.amount}元`;
                        }
                        break;
                    }
                }
            }

            if (str == "") {
                for (let j = 0; j < selectBtnChild2.length; j++) {
                    if (selectBtnChild2[j] && selectBtnChild2[j][`${this.btnDataStr}`]) {
                        let btnData: cashMap = selectBtnChild2[j][`${this.btnDataStr}`];
                        if (btnData.id == targetId && btnData.hasWithdraw == 2) {
                            if (btnData.mark && btnData.mark != "") {
                                str = `请先提现${btnData.mark}${btnData.amount}元`;
                            }
                            else {
                                str = `请先提现${btnData.amount}元`;
                            }
                            break;
                        }
                    }
                }
            }
            else {
                break;
            }
        }
        return str;
    }

    clickOpenRecord() {
        // UIFunc.openUI(ActivityPannelName.PannelWalletRecord, (node, script) => {

        // })
        soundController.singleton.clickAudio();

        TrackMgr.AppViewScreen({
            app_page_title: "提现记录"
        })

        TrackMgr.AppClick({
            app_page_title: "我的钱包",
            app_ck_module: "提现记录",
            app_exposure_type: "icon",
        })

        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameWalletRecord);
    }

    clickBangDingwx() {
        let self = this;
        XMSDK.authWechat();
    }

    clickClose() {
        soundController.singleton.clickAudio();
        this.closePage();

        if (this.isInsert) {
            AdController.loadAd(AdPosition.WalletAwardInsert, () => { console.log("关闭提现奖励插屏广告播放完成") });
        }
    }

    //提现成功------------------------------
    clickCloseSucTip() {
        soundController.singleton.clickAudio();
        this.sucView.active = false;

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: `提现申请成功`,
            ck_module: "我知道了",
            active_ad_hcdg: "激励视频"
        })
    }

    //提现规则------------------------------
    clickCloseRule() {
        soundController.singleton.clickAudio();
        this.ruleView.active = false;

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: `提现规则`,
            ck_module: "我知道了"
        })
    }

    //提现提示------------------------------
    clickGoPass() {
        soundController.singleton.clickAudio();
        let curSelectData: cashMap = this.curSelectNode[`${this.btnDataStr}`];
        let rules = this.tempRules;
        let clockInDays = 0;
        if (rules && rules.length > 0) {
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].type == 3) {
                    clockInDays = rules[i].userCurrentProgress;
                }
            }
        }
        //规则类型，1-炮塔等级2-红包金额3-打卡总次数4-累计激励视频总次数5-前置任务

        let btnStr = this.btn_goPass.getChildByName(`layout`).getChildByName(`lable`).getComponent(cc.Label).string;
        if (btnStr == "打卡") {
            if (curSelectData.clockInToday == 1) {
                TrackMgr.activity_getMoney({
                    activity_state: `点击打卡`,
                    button_hcdg1: `打卡`,
                    tixian_state: this.tixian_state,
                    daka_days: `第${clockInDays}天`,
                })

                this.sendDaCard(curSelectData.type, clockInDays)
            }
            else {
                TrackMgr.activity_getMoney({
                    activity_state: `点击打卡`,
                    button_hcdg1: `视频打卡`,
                    tixian_state: this.tixian_state,
                    daka_days: `第${clockInDays}天`,
                })

                AdController.loadAd(AdPosition.walletCardVideo, (res) => {
                    this.sendDaCard(curSelectData.type, clockInDays)
                }, () => {
                    AssistCtr.showToastTip("加载视频失败，请稍后！");
                })
            }
        }
        else if (btnStr == "已打卡") {
            TrackMgr.activity_getMoney({
                activity_state: `点击打卡`,
                button_hcdg1: `已打卡`,
                tixian_state: this.tixian_state,
                daka_days: `第${clockInDays}天`,
            })
            AssistCtr.showToastTip(`今日已打卡,明日再来~`)
        }
        else if (btnStr == "去合成") {
            this.closePage();
        }
    }

    sendDaCard(type: number, clockInDays) {
        XMSDK.getdataStr({
            url: UrlConst.videoCardOk,
            data: {
                cashOutType: type
            },
            onSuccess: res => {
                if (!this.isValid) {
                    return;
                }

                if (res.code === 0) {
                    TrackMgr.activity_getMoney({
                        activity_state: `打卡过程`,
                        button_hcdg1: `打卡`,
                        tixian_state: this.tixian_state,
                        successful_clock_in: true,
                        daka_days: `第${clockInDays}天`,
                    })

                    AssistCtr.showToastTip(`打卡成功`);
                    this.initData();
                }
                else {
                    TrackMgr.activity_getMoney({
                        activity_state: `打卡过程`,
                        button_hcdg1: `打卡`,
                        tixian_state: this.tixian_state,
                        successful_clock_in: false,
                        daka_days: `第${clockInDays}天`,
                    })

                    if (res) {
                        AssistCtr.showToastTip(res.message);
                    }
                }
            },
            onFail: err => {

            }
        })
    }

    clickCloseTip() {
        this.tipFrameView.active = false;
    }


    /**
     * 
     * @param num 数量
     * @param pos 位置
     */
    createNum(num:number){
        let item:cc.Node = this.walletPool.createEnemy(this.addCoinBox);
        item.setParent(this.addCoinBox);
        item.setPosition(0,0);
        item.getComponent(cc.Sprite).enabled = false;
        item.opacity = 255;
        item.children[1]&&(item.children[1].getComponent(cc.Label).string = "+"+ num);
        item.scale = 1.1;
        cc.tween(item).parallel(
            cc.tween().by(.5,{y:84}),
            cc.tween().delay(.25).to(.25,{opacity:0})
        ).call(()=>{
            this.walletPool.onEnemyKilled(item);
        }).start();
    }

}
