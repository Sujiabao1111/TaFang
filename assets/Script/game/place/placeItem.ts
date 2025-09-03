import { AssistCtr } from "../../Assist/AssistCtr";
import NameTs from "../../common/NameTs";
import tool from "../../util/tool";
import util from "../../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class placeItem extends cc.Component {

    @property({type:cc.Sprite,displayName:"背景"})
    private bg:cc.Sprite = null;
    
    @property({type:[cc.SpriteFrame],displayName:"背景图"})
    private bgSpriteFrame:cc.SpriteFrame[] = [];

    @property({type:cc.Node,displayName:"锁"})
    private lock:cc.Node = null;

    @property({type:cc.Node,displayName:"相同等级的"})
    private sameNode:cc.Node = null;

    @property(dragonBones.ArmatureDisplay)
    private turretBox:dragonBones.ArmatureDisplay = null;

    //初始化数据
    private initData:any;

    //状态
    private state:number = 0;
   
    onLoad () {

        //拿起
        cc.game.on(NameTs.Game_Same_Place_PickUp,(res)=>{
            if(res.id == this.initData.id){
                this.sameNode.active = true;
            }

        },this);

        //放下
        cc.game.on(NameTs.Game_Same_Place_PutDown,(res)=>{

            if(res.id == this.initData.id){
                this.sameNode.active = false;
            }

        },this);

        cc.game.on(NameTs.Game_Unlock_Place,(res)=>{
            
            if(this.initData.id==res){
                this.state = 1;
                this.setState();
            }

        },this);
        
        cc.game.on(NameTs.Show_Empty_Box, ()=>{
            if(this.initData.id == util.userData.emptyBoxNo){
                this.turretBox.node.active = true;
                this.turretBox.playAnimation("dropbox", 0);
            }            
            else{
                this.turretBox.node.active = false;
            }
        })
    }

    start () {

    }

    /**初始化 */
    init(data){
        this.initData = data;
        let placeData = tool.GetArrData("no",this.initData.id,util.userData.pool);
		//console.log(" placeData :   " + placeData)
        this.state = placeData.state;
        // this.setState();
    }

    /**状态修改背景 */
    setState(){
        if(this.bg){
            this.bg.spriteFrame = this.bgSpriteFrame[this.state==1?0:1];
        }        

        if(this.lock){
            this.lock.active = this.state==0;
        }        
    }
    
    /**
     * 点击
     */
    clickBtn(){
        // if(this.state==0){
        //     AssistCtr.showToastTip("地块待解锁!");
        //     return;
        // }
        if(this.turretBox.node.active){                        
            this.turretBox.playAnimation("dropbox_open", 1);
            this.scheduleOnce(()=>{            
                cc.game.emit(NameTs.Click_Empty_Box, this.initData.id);
            }, 0.5)    
            
            this.scheduleOnce(()=>{            
                util.userData.emptyBoxNo = -1;
                this.turretBox.node.active = false;
            }, 1)             
        }
    }

    // update (dt) {}
}
