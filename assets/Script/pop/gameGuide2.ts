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
export default class gameGuide2 extends baseTs {

    @property({displayName:"指导盒子",type:cc.Node})
    private content:cc.Node = null;
    
    @property({displayName:"遮罩盒子",type:cc.Node})
    private maskBox:cc.Node = null;

    @property({displayName:"跳过页面",type:cc.Node})
    private skipNode:cc.Node = null;
    
    @property({displayName:"等级",type:cc.RichText})
    private levelLabel:cc.RichText = null;
    
    @property({displayName:"app的名字",type:cc.Label})
    private appName:cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    private data = [
    ];

    onLoad () {   

        let name:string = (XMSDK.getAppName&&XMSDK.getAppName())||"塔防无敌";

        this.appName.string = "欢迎来到「"+name+"」";
        
        util.setStorage(util.localDiary.noviceGuide,-1);

        cc.game.on(NameTs.Game_Novice_Open,(res)=>{

            this.setState(res);

        },this);

        cc.game.on(NameTs.Game_Novice_Close,()=>{

            this.closePage();

        },this);

        util.getdataStr({
            url: UrlConst.wallet_main2,
            success: res => {

                // for(let i =0 ;i<res.cashOutList.length;i++){

                //     let item = res.cashOutList[i];

                //     if(item.required>0){

                //         this.data.push({
                //             amount:item.amount,
                //             level:item.required
                //         })

                //     }


                // }
                if(!this.isValid){
                    return;
                }

                this.data = [];
                for(let key in res.cashOutMap){
                    let cashOutMapItem = res.cashOutMap[key];
                    for(let j = 0;j<cashOutMapItem.length;j++){
                        if(cashOutMapItem[j].rules){
                            for(let k = 0;k<cashOutMapItem[j].rules.length;k++){
                                let item = cashOutMapItem[j].rules[k];
                                if(item.type==1&&this.data.push){
                                    this.data.push({
                                        amount:cashOutMapItem[j].amount,
                                        level:item.demand
                                    })
                                }
                            }
                        }
                        
                    }
                }
                let newerLevel:number = (this.data[0]&&this.data[0].level)||18;
                this.levelLabel.string ="<color=#BB420E>合成到</c><color=#F92222>"+newerLevel+"级</c><color=#BB420E>炮塔\n可立即提现哦！</c>";

            },
        });

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
            case 2:
                str.activity_state ="欢迎页";
                str.click_event = "点击";
                break;
            case 4:
                str.activity_state ="提现金额到账";
                str.click_event = "点击";
                break;
            case 5:
                str.activity_state ="合成10级提现提示";
                str.click_event = "点击";
                break;

        }
        if(str.activity_state){
            TrackMgr.rookie_process(str);
        }

        util.userData.noviceGuide = type;

        this.skipNode.active = type>2;

        console.log(this.skipNode,type,'asfasfasfasf');

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



        if(type==1||type==2||type==6){
            let hand:cc.Node = this.content.children[type-1].getChildByName("hand");
            this.handAni(hand,type==2?1:0);
        }
        
    }

    /**
     * 跳过
     */
    skipBtn(){

        soundController.singleton.clickAudio();

        if(util.userData.noviceGuide==5){
            TrackMgr.rookie_process({
                activity_state :"怪兽们出来了",
                click_event: "点击"
            });
            cc.game.emit(NameTs.Game_Treasure_Show);
            this.closePage();
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
