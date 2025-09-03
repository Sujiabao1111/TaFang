import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameAdLoading extends baseTs {

    onLoad(){
        cc.game.once(NameTs.Close_AdLoading, this.closePage, this);
    }

    onEnable() {
        this.node.zIndex = 3001;        

        this.scheduleOnce(() => {
            if(this.node) this.closePage();            
        }, 5);
    }
}
