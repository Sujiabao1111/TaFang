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

        cc.game.on(NameTs.Game_Shop_MonsterItem,(res)=>{
            if(res==this.initData.level){
                this.stateLabel.string = "选中"
            }else{
                this.stateLabel.string = "";
            }
        },this);

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
        cc.game.emit(NameTs.Game_Shop_UpData,this.initData.level);
        cc.game.emit(NameTs.Game_Shop_MonsterItem,this.initData.level);
    }

    // update (dt) {}
}
