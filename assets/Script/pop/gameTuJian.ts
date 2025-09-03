import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import jsonSingleton from "../base/jsonSingleton";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import scrollTs from "../common/scrollTs";
import tuJianItem from "../game/tuJian/tuJianItem";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";
import { kingPaoData, kingPaoTask } from "./gameKingPao";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameTuJian extends baseTs {

    @property(cc.Sprite)
    image_showImg: cc.Sprite = null;

    @property(cc.Sprite)
    image_showImg2: cc.Sprite = null;

    @property(cc.Node)
    image_propertyFrame2: cc.Node = null;

    @property(cc.Node)
    tab_turret: cc.Node = null;

    @property(cc.Node)
    tab_monster: cc.Node = null;

    @property(cc.Node)
    noTabNode: cc.Node = null;

    @property(cc.Node)
    haveTabNode: cc.Node = null;

    @property(cc.SpriteFrame)
    tabSprArray: Array<cc.SpriteFrame> = [];

    @property({ type: cc.Node, displayName: "炮塔content" })
    private turretContent: cc.Node = null;

    @property({ type: cc.ScrollView, displayName: "炮塔滚动栏" })
    private turretView: cc.ScrollView = null;

    @property({ type: cc.Node, displayName: "怪兽content" })
    private monsterContent: cc.Node = null;

    @property({ type: cc.ScrollView, displayName: "怪兽滚动栏" })
    private monsterView: cc.ScrollView = null;

    @property({ type: cc.Prefab, displayName: "Item" })
    private turretItem: cc.Prefab = null;

    @property({ type: cc.Label, displayName: "图鉴名字" })
    private lable_name: cc.Label = null;

    @property({ type: cc.Label, displayName: "图鉴等级" })
    private lable_lv: cc.Label = null;

    @property({ type: cc.Label, displayName: "图鉴属性1" })
    private lable_property1: cc.Label = null;

    @property({ type: cc.Label, displayName: "图鉴属性2" })
    private lable_property2: cc.Label = null;

    @property({ type: cc.Label, displayName: "图鉴标题1" })
    private lable_propertyTitle1: cc.Label = null;

    @property({ type: cc.Label, displayName: "图鉴标题2" })
    private lable_propertyTitle2: cc.Label = null;

    @property({ type: cc.Label, displayName: "描述标题" })
    private lable_describeTitle: cc.Label = null;

    @property({ type: cc.Label, displayName: "描述" })
    private lable_describe: cc.Label = null;

    @property(cc.Node)
    kingTaskItem: cc.Node = null;

    onceEnter = false;                              //是否初次进入

    curClickTurretTujian: tuJianItem = null;        //当前选中的炮塔
    curClickTurretData = null;                      //当前选中的炮塔信息

    curClickMonsterTujian: tuJianItem = null;       //当前选中的怪兽
    curClickMonsterData = null;                     //当前选中的怪兽信息

    tabData = null;
    kingItemData:kingPaoTask = null;

    onEnable() {
        if (this.onceEnter) {                 //不是初次进入不需要刷新图鉴信息
            this.updateMain();
        }
        this.onceEnter = true;

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "图鉴弹窗"
        })

        this.updatekingData();
    }

    onLoad() {
        let turretData = jsonSingleton.singleton.getJson(NameTs.turretData);
        let monsterData = jsonSingleton.singleton.getJson(NameTs.monsterData);

        // for(let i = 0; i < turretData.length; i++){
        //     let pre = cc.instantiate(this.turretItem);
        //     pre.getComponent(tuJianItem).init(turretData[i]);
        //     pre.parent = this.turretContent;
        // }


        // for(let i = 0; i < monsterData.length; i++){
        //     let pre = cc.instantiate(this.turretItem);
        //     pre.getComponent(tuJianItem).init(monsterData[i]);
        //     pre.parent = this.monsterContent;
        // }

        // let aaa = Math.max(turretData.length, monsterData.length);
        // let maxDataNum = Math.ceil(Math.max(turretData.length, monsterData.length) / 4);
        // if(maxDataNum == 0){
        //     maxDataNum = 1;
        // }

        // let maxHeight = (141.6 * 2) * maxDataNum + this.turretContent.getComponent(cc.Layout).spacingY;
        // this.turretContent.height = maxHeight;
        // this.monsterContent.height = maxHeight;
        // cc.error("aaa", aaa, maxDataNum, maxHeight);

        new scrollTs(this.turretContent, this.turretView, this.turretItem, turretData);
        new scrollTs(this.monsterContent, this.monsterView, this.turretItem, monsterData);

        cc.game.on(NameTs.Game_TuJian_UpData, this.updateTuJian, this);
        cc.game.on(NameTs.Game_KingPaoTask_Update, this.updatekingData, this);
    }

    updatekingData(){
        XMSDK.getdataStr({
            url: UrlConst.kingPaoTaskData,
            onSuccess: res => {
                if (res.code === 0 && res.data) {
                    if(!this.isValid){
                        return;
                    }

                    if(!this || !this.kingTaskItem){
                        return;                       
                    }
                    let data: kingPaoData = res.data;                    
                    let itemData = data.taskList[0];
                    this.kingItemData = itemData;
                    let strNum = (itemData.process/itemData.processTarget) * 100;                    
                    var y = String(strNum).indexOf(".") + 1;//获取小数点的位置                    
                    if(y > 0) {
                        strNum = Number(strNum.toFixed(2));
                    }
                    this.kingTaskItem.getChildByName(`lable_kindProgress`).getComponent(cc.RichText).string = `<color=#FFFFFF>${itemData.title}:</c><color=#FCFF15>${strNum}%</color>`; 

                    let process = (itemData.process / itemData.processTarget);
                    if(process >= 1){
                        process = 1;
                    }

                    let proGressWidth = (this.kingTaskItem.getChildByName(`rectNode`).width - 7) * process;
                    if (proGressWidth > 1 && proGressWidth < 25) {
                        proGressWidth = 25;
                    }
                    this.kingTaskItem.getChildByName(`rectNode`).getChildByName(`progressNode`).width = proGressWidth;
                    this.kingTaskItem.active = true;                    

                    if(itemData.achieve == 1){
                        this.kingTaskItem.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = `兑换`;
                    }
                    else if(itemData.achieve == 2){
                        this.kingTaskItem.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = `已兑换`;
                    }
                    else{
                        this.kingTaskItem.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = `${data.turretKingRedEnvelopeDetailDTO.bonusPerCapita}元`;
                    }
                }
                else {
                    this.kingTaskItem.active = false;
                }
            },
            onFail: err => {

            }
        }
        )
    }

    start() {
        this.clickTab(null, 1);
    }

    clickClose() {
        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: `图鉴弹窗`,
            ck_module: "关闭"
        })

        soundController.singleton.clickAudio();
        this.closePage();
    }

    /**
     * 
     * @param e 
     * @param data 1.防御塔 2.怪兽
     */
    clickTab(e, data) {
        let self = this;
        let tempColor = new cc.Color();
        soundController.singleton.clickAudio();

        if (data == 1 && self.tabData != 1) {
            self.tab_turret.y += 11;
            self.tab_monster.y -= 11;
            self.tab_turret.getComponent(cc.Sprite).spriteFrame = this.tabSprArray[1];
            self.tab_turret.getChildByName("lable").color = tempColor.fromHEX(`#FFFFFF`);
            self.tab_turret.getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#BB420E`);

            self.tab_monster.getComponent(cc.Sprite).spriteFrame = this.tabSprArray[0];
            self.tab_monster.getChildByName("lable").color = tempColor.fromHEX(`#FFC498`);
            self.tab_monster.getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#942C00`);

            self.turretView.node.active = true;
            self.monsterView.node.active = false;
            if (self.curClickTurretData) {
                self.updateTuJian(self.curClickTurretData);
            }
            else {
                let turretContent = this.turretContent.children;
                if (turretContent && turretContent.length > 0) {
                    turretContent[0].getComponent(tuJianItem).click();
                }
            }

            self.tab_monster.parent = this.noTabNode;
            self.tab_turret.parent = this.haveTabNode;

            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: `图鉴弹窗`,
                ck_module: "炮塔"
            })
        }
        else if (data == 2 && self.tabData != 2) {
            self.tab_turret.y -= 11;
            self.tab_monster.y += 11;
            self.tab_turret.getComponent(cc.Sprite).spriteFrame = this.tabSprArray[0];
            self.tab_turret.getChildByName("lable").color = tempColor.fromHEX(`#FFC498`);
            self.tab_turret.getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#942C00`);

            self.tab_monster.getComponent(cc.Sprite).spriteFrame = this.tabSprArray[1];
            self.tab_monster.getChildByName("lable").color = tempColor.fromHEX(`#FFFFFF`);
            self.tab_monster.getChildByName("lable").getComponent(cc.LabelOutline).color = tempColor.fromHEX(`#BB420E`);

            self.turretView.node.active = false;
            self.monsterView.node.active = true;
            if (self.curClickMonsterData) {
                self.updateTuJian(self.curClickMonsterData);
            }
            else {
                let monsterContent = this.monsterContent.children;
                if (monsterContent && monsterContent.length > 0) {
                    monsterContent[0].getComponent(tuJianItem).click();
                }
            }

            self.tab_monster.parent = this.haveTabNode;
            self.tab_turret.parent = this.noTabNode;

            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: `图鉴弹窗`,
                ck_module: "怪物"
            })
        }
        self.tabData = data;
    }

    updateTuJian(info) {
        if (info) {
            let data = info.data;
            let target: tuJianItem = info.target;    //锁定当前点击框
            if (data.walkCd) {        //怪兽
                this.lable_propertyTitle1.string = `速   度:`;
                this.lable_property1.string = `${data.speed}`;

                // this.lable_propertyTitle2.string = `血   量:`;
                // this.lable_property2.string = `${data.hp}`;                
                this.lable_propertyTitle2.node.active = false;
                this.lable_property2.node.active = false;
                this.image_propertyFrame2.active = false;


                if (this.curClickMonsterTujian) {                //取消当前选中框状态
                    this.curClickMonsterTujian.setCliCkState(false);
                }
                this.curClickMonsterTujian = target;
                this.curClickMonsterData = info;

                this.loadImage(Number(data.sprite), 2, (res) => {
                    this.image_showImg.spriteFrame = res;
                })
                this.image_showImg2.node.active = false;
                this.lable_describeTitle.string = `怪兽说明`;
            }
            else {                   //炮塔
                this.lable_propertyTitle1.string = `攻   速:`;
                this.lable_propertyTitle2.string = `攻击力:`;
                this.lable_property1.string = `${data.speed}发/秒`;
                this.lable_property2.string = `${data.atk}`;

                this.lable_propertyTitle2.node.active = true;
                this.lable_property2.node.active = true;
                this.image_propertyFrame2.active = true;


                if (this.curClickTurretTujian) {                //取消当前选中框状态
                    this.curClickTurretTujian.setCliCkState(false);
                }
                this.curClickTurretTujian = target;
                this.curClickTurretData = info;

                this.loadAny(data.body, cc.SpriteFrame, (res) => {
                    this.image_showImg.spriteFrame = res;
                }, () => { if (this.node) this.node.destroy(); })

                this.loadAny(data.foot, cc.SpriteFrame, (res) => {
                    this.image_showImg2.spriteFrame = res;
                }, () => {
                    if (this.node) this.image_showImg2.spriteFrame = null;
                })
                this.image_showImg2.node.x = Number(data.TujianX);
                this.image_showImg2.node.y = Number(data.TujianY);
                // if (AssistCtr.checkTuJian(data.level)) {
                //     this.image_showImg2.node.x = -214.63;
                //     this.image_showImg2.node.y = 85;
                //     if (data.level == 5) {
                //         this.image_showImg2.node.y = 87;
                //     }
                //     else if (data.level == 9) {
                //         // this.image_showImg2.node.x = -215;
                //         // this.image_showImg2.node.y = 82;
                //     }
                //     else if(data.level == 17){                        
                //         this.image_showImg2.node.y = 82;
                //     }   
                //     else if (data.level == 22) {
                //         this.image_showImg2.node.y = 88;
                //     }
                //     else if(data.level == 29){                        
                //         this.image_showImg2.node.y = 81;
                //     }  
                //     else if (data.level == 30) {
                //         this.image_showImg2.node.x = -212;
                //         this.image_showImg2.node.y = 86;
                //     }
                //     else if(data.level == 38){                        
                //         this.image_showImg2.node.y = 68;
                //     }  
                // }
                // else {
                //     this.image_showImg2.node.x = -214;
                //     this.image_showImg2.node.y = 42;
                // }

                // if(AssistCtr.checkTuJian(data.level)){
                //     this.image_icon2.node.x = 0; 
                //     this.image_icon2.node.y = 0;
                //     if(data.level == 5){
                //         this.image_icon2.node.y = -2;
                //     }
                //     else if(data.level == 9){
                //         this.image_icon2.node.x = -1;
                //         this.image_icon2.node.y = -3;
                //     }  
                //     else if(data.level == 17){                        
                //         this.image_icon2.node.y = -3;
                //     }       
                //     else if(data.level == 30){
                //         this.image_icon2.node.x = 2;
                //         this.image_icon2.node.y = 1;
                //     } 
                //     else if(data.level == 29){                        
                //         this.image_icon2.node.y = -4;
                //     }   
                //     else if(data.level == 38){                        
                //         this.image_icon2.node.y = -17;
                //     }                         
                // }
                // else{
                //     this.image_icon2.node.y = -26;
                // }

                // if(AssistCtr.checkTuJian(data.level)){
                //     this.image_showImg2.node.y = 85;
                // }
                // else{
                //     this.image_showImg2.node.y = 40;
                // }


                this.image_showImg2.node.active = true;

                this.lable_describeTitle.string = `炮塔说明`;
            }
            this.lable_describe.string = data.describe;
            this.lable_name.string = data.name;
            this.lable_lv.string = `Lv${data.level}`;

            target.setCliCkState(true);
        }
    }

    updateMain() {
        let turretContent = this.turretContent.children;
        for (let i = 0; i < turretContent.length; i++) {
            turretContent[i].getComponent(tuJianItem).updateData();
        }


        let monsterContent = this.monsterContent.children;
        for (let i = 0; i < monsterContent.length; i++) {
            monsterContent[i].getComponent(tuJianItem).updateData();
        }
    }

    clickOpenKingPaoProgress() {
        if(this.kingItemData){
            if(this.kingItemData.achieve == 1){                
                XMSDK.post({
                    url: UrlConst.kingPaoGet,
                    data: {
                        id: this.kingItemData.id
                    },
                    onSuccess: res => {
                        if(!this.isValid){
                            return;
                        }

                        if (res.code === 0) {
                            AssistCtr.showToastTip(`兑换成功，人工审核中`);
                            this.kingItemData.achieve = 2;
                            this.kingTaskItem.getChildByName("btnNode").getChildByName("lable").getComponent(cc.Label).string = `已兑换`;
                        }
                        else {
                            if(res){
                                AssistCtr.showToastTip(res.message);
                            }       
                        }
                    },
                    onFail: err => {
        
                    }
                })           
            }
            else if(this.kingItemData.achieve == 2){
                AssistCtr.showToastTip(`已兑换`);
            }
            else{
                cc.game.emit(NameTs.Game_Pop_Open, {
                    name: pageTs.pageName.GameKingPaoProgress,
                    data: {
                        clickTarget: 1,
                        progress: `${this.kingItemData.process}/${this.kingItemData.processTarget}`
                    },
                });
            }
        }
        else{
            cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameKingPaoProgress);
        }        
    }
}
