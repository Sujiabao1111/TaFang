import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameGuide extends baseTs {

    @property({displayName:"指导盒子",type:cc.Node})
    private content:cc.Node = null;
    
    @property({displayName:"遮罩盒子",type:cc.Node})
    private maskBox:cc.Node = null;

    @property({displayName:"跳过页面",type:cc.Node})
    private skipNode:cc.Node = null;
    
    // @property({displayName:"等级",type:cc.RichText})
    // private levelLabel:cc.RichText = null;

    @property({displayName:"app的名字",type:cc.Label})
    private appName:cc.Label = null;
    // LIFE-CYCLE CALLBACKS:


    onLoad () {

        if(XMSDK.getAppName){
            console.log(XMSDK.getAppName(),'XMSDK.getAppName()=============')
        }else{
            console.log("没有这个方法")
        }

        let name:string = (XMSDK.getAppName&&XMSDK.getAppName())||"塔防无敌";
        this.appName.string = "欢迎您来到「"+name+"」";
        
        util.setStorage(util.localDiary.noviceGuide,-1);

        cc.game.on(NameTs.Game_Novice_Open,(res)=>{

            this.setState(res);

        },this);

        cc.game.on(NameTs.Game_Novice_Close,()=>{

            this.closePage();

        },this);

    }

    /**
     * 第几个
     */
    init(data){

        this.setState(data||1)

    }

    start () {

    }

    /**
     * 状态
     * @param type 第几个
     */
    setState(type:number){

        let str:any = {};
        switch(type){
            case 1:
                str.activity_state ="欢迎页";
                break;
            case 2:
                str.activity_state ="指引购买炮塔页";
                break;
            case 3:
                str.activity_state ="拖拽合成效果页";
                break;
            case 4:
                str.activity_state ="全部红包可提现页";
                break;
            case 5:
                str.activity_state ="开始赢钱页面展示";
                break;

        }
        if(str.activity_state){
            TrackMgr.rookie_process_2(str);
        }

        util.userData.noviceGuide = type;

        this.skipNode.active = type==1||type>3;

        if(this.content && this.content.children){
            this.content.children.forEach(item=>{
                item.active = false;
            });
        }

        if(this.maskBox && this.maskBox.children){
            this.maskBox.children.forEach(item=>{
                item.active = false;
            });
        }

        if(this.content && this.content.children){
            this.content.children[type-1].active = this.maskBox.children[type-1].active = true;
        }        

        let Widget:cc.Widget = this.maskBox.children[type-1].getComponent(cc.Widget);
        if(Widget){
            Widget.top += Number(util.iphoneXTop);
        }


        //存储本地
        //util.setStorage(util.localDiary.noviceGuide,type);



        if(type==2||type==3){
            let hand:cc.Node = this.content.children[type-1].getChildByName("hand");
            this.handAni(hand,type==2?0:1);
        }
        
    }

    /**
     * 跳过
     */
    skipBtn(){

        soundController.singleton.clickAudio();

        if(util.userData.noviceGuide==4){
            TrackMgr.rookie_process_2({
                activity_state :"「全部红包可提现页」任意位置点击",
            });
        }

        if(util.userData.noviceGuide==5){
            TrackMgr.rookie_process_2({
                activity_state :"开始赢钱按钮点击",
            });
            cc.game.emit(NameTs.Game_Treasure_Show);
            this.closePage();
            TrackMgr.rookie_process_2({
                activity_state :"关卡开启",
            });
            // this.showPage(pageTs.pageName.GameStart);
            cc.game.emit(NameTs.Game_Start);
            return
        }
        
        let num:number = util.userData.noviceGuide+1;
        

        this.setState(num);
    }


    /**
     * 手的动画
     * @param node 节点
     * @param type 类型 0点击 1拖拽
     */
    handAni(node:cc.Node,type:number){
        // cc.tween(node.children[0]).repeatForever(cc.tween().to(0,{scale:0,opacity:255}).to(1,{scale:1}).to(.2,{opacity:0})).delay(.5).start();
        // cc.tween(node.children[1]).repeatForever(cc.tween().to(0,{scale:0,opacity:255}).delay(.5).to(1,{scale:1}).to(.2,{opacity:0})).start();
        if(type==0){
            // cc.tween(node).repeatForever(cc.tween().by(.2,{y:-10}).by(.2,{y:10}).delay(.5)).start();
        }else if(type==1){
            cc.tween(node).repeatForever(cc.tween().by(.5,{x:120}).delay(.5).by(.3,{x:-120})).start();
        }
    }

    // update (dt) {}
}
