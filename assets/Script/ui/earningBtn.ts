import NameTs from "../common/NameTs";
import soundController from "../soundController";
import tool from "../util/tool";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class earningBtn extends cc.Component {

    @property(cc.Node)
    pic: cc.Node = null; //图片

    @property(cc.Node)
    spine: cc.Node = null; //收益
    
    @property(cc.Label)
    timeLabel: cc.Label = null; //时间

    // LIFE-CYCLE CALLBACKS:

    /**时间 */
    private time:number;

    onLoad () {

        cc.game.on(NameTs.Game_Earnings_Linster,(res)=>{
            this.time = res;
            this.setState();
        },this);

    }

    start () {

    }

    /**
     * 设置状态
     */
    setState(){
        
        this.pic.active = this.time<=0;
        this.spine.active = this.time>0;
        this.timeLabel.node.getParent().active = this.time>0;

        if(this.time>0){
            this.djs();
        }

    }

    /**
     * 倒计时 
    */
    djs(){
        this.schedule(()=>{
            this.time--;
            if(this.time<=0){
                this.unscheduleAllCallbacks();
                this.setState();
                return;
            }
            this.timeLabel.string = tool.changeTime(this.time);
        },1);

    }
    // update (dt) {}
}
