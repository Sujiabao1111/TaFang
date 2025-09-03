import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import soundController from "../soundController";
import tool from "../util/tool";
import util from "../util/util";
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
const {ccclass, property} = cc._decorator;

@ccclass
export default class savingPotBtn extends baseTs {

    @property({type:cc.Label,displayName:"时间"})
    private timeLabel:cc.Label = null;
    
    @property({type:cc.Node,displayName:"角标"})
    private getPoint:cc.Node = null;

    @property({type:dragonBones.ArmatureDisplay,displayName:"龙骨"})
    private dragon:dragonBones.ArmatureDisplay = null;//龙骨

    private isUnlock:boolean = false;//是否解锁

    private btn:cc.Button = null;

    onLoad () {

        this.btn = this.node.getComponent(cc.Button);

        // this.dragon = this.node.getComponent(dragonBones.ArmatureDisplay);

        cc.game.on(NameTs.Game_SavingPost_Icon,()=>{
            if(!this.isUnlock)return;
            util.savingPotLock = true;
            this.setSate();
        },this);

        cc.game.on(NameTs.Game_SavingPost_Lock,()=>{
            if(this.isUnlock)return;
            this.LockFn();
        },this);

        util.getdataStr({
            url:UrlConst.wallet_main2,
            success:(data)=>{
                console.log(data,'data=========');
                if(data&&data.cashOutMap&&data.cashOutMap[1]){
                    for(let i = 0;i<data.cashOutMap[1].length;i++){
                        if((data.cashOutMap[1][i].type==1&&AssistCtr.isATest())||(data.cashOutMap[1][i].type==9&&!AssistCtr.isATest())){
                            this.isUnlock = data.cashOutMap[1][i].hasWithdraw==1;
                            break;
                        }
                    }
                }
                if(!this.isUnlock){
                    this.btn.enabled = false;
                    this.node.opacity = 0;
                }else{
                    this.LockFn();
                }
                console.log("是否解锁了该功能："+(this.isUnlock?"是":"不是"));
            },
            fail:()=>{
                this.btn.enabled = false;
                this.node.opacity = 0;
                console.log("请求失败");
            }
        })

    }


    /**解锁功能 */
    LockFn(){
        console.log("解锁该功能！");
        // util.savingPotLock = true;
        this.btn.enabled = true;
        this.node.opacity = 255;
        util.post({
            url:UrlConst.savingPotIndex,
            success:(data)=>{
                if(this.isUnlock){
                    util.savingPotLock = data.status==0;
                }
                this.setSate(Number(data&&data.status)||0);
            },
            fail:()=>{
                this.btn.enabled = false;
                this.node.opacity = 0;
                console.log("获取失败,暂时关闭")
            }
        });
    }

    start () {


    }

    /**
     * 设置状态
     * @param num 0不能拿1能拿
     */
    setSate(num:number = 0){
        if(this.timeLabel){
            this.timeLabel.node.active = num==0;
            if(this.timeLabel.node.active){
                this.unscheduleAllCallbacks();
                this.timeLabel.string = tool.formatData(5);
                this.schedule(()=>{
                    this.timeLabel.string = tool.formatData(5);
                    if(tool.formatData(5)=="00:00:00"){
                        this.setSate(1);
                    }
                },1);
            }
            
        }
        
        this.dragon&&this.dragon.playAnimation(num==1?"kelingqu":"normal",-1);

        console.log(num,'num============')

        this.getPoint.active = num==1;

        if(num==1){
            this.getPoint.stopAllActions();
            cc.tween(this.getPoint).repeatForever(
                cc.tween().to(.3,{angle:10}).to(.2,{angle:0})
            ).start();
        }
        
        
    }

    /**
     * 展现
     */
    showPot(){
        soundController.singleton.clickAudio();
        this.showPage(pageTs.pageName.GameSavingPot);
    }

    // update (dt) {}
}
