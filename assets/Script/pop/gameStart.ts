import baseTs from "../base/baseTs";
import { customsInfo } from "../common/faceTs";
import NameTs from "../common/NameTs";
import soundController from "../soundController";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameStart extends baseTs {



    @property({type:cc.Label,displayName:"关卡"})
    private customLabel:cc.Label = null;

    private djsNum:number = 0;

    start () {

      

    }

    /**
     * 初始化
     */
    init(){

        this.djsNum =1;
        this.schedule(()=>{
            this.djsNum --;
            if(this.djsNum<=0){
                this.close();
                this.unscheduleAllCallbacks();
                return;
            }
        },1);
        
        let customs:customsInfo = util.userData.customs;
        this.customLabel.string = "关卡"+customs.big+"-"+customs.small;

    }

    /**
     * 关闭页面
     */
    close(){
        this.unscheduleAllCallbacks();
        //soundController.singleton.clickAudio();
        console.log("asfasfasf===============")
        this.closePage();
        cc.game.emit(NameTs.Game_Start);
        util.gameTime = 0;
        util.gamePropNum = 0;
    }




    // update (dt) {}
}
