import NameTs from "../../common/NameTs";
import soundController from "../../soundController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class shopItem2 extends cc.Component {

    @property({type:cc.Label,displayName:"状态文本"})
    private stateLabel: cc.Label = null;

    @property({type:cc.Sprite,displayName:"图片"})
    private pic: cc.Sprite = null;

    private initData:any;

    start () {

    }

    onLoad(){

       

    }

    init(data){

        // cc.resources.load()
        this.initData = data.data;
        this.stateLabel.string = data.id;
        this.node.zIndex  = data.id;
    }

    /**
     * 点击
     */
    click(){
        soundController.singleton.clickAudio();
     
    }

    // update (dt) {}
}
