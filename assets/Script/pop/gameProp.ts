import baseTs from "../base/baseTs";
import jsonSingleton from "../base/jsonSingleton";
import NameTs from "../common/NameTs";
import propItem from "../prop/propItem";
import soundController from "../soundController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameProp extends baseTs {

    @property({type:cc.Node,displayName:"layout框"})
    private layOutContent: cc.Node = null;

    /**道具预制体 */
    private propPre:cc.Prefab;
    // onLoad () {}

    /**初始化 */
    init(){
        /**道具 */
        let propData = jsonSingleton.singleton.getJson(NameTs.propData);
        
        this.loadAny("prefab/prop/propItem",cc.Prefab,(pre:cc.Prefab)=>{

            this.propPre = pre;
            if(propData){
                propData.forEach(value => {
                    let item:cc.Node = cc.instantiate(pre);
                    item.setParent(this.layOutContent);
                    let itemTs:propItem = item.getComponent(propItem);
                    if(itemTs)itemTs.init&&itemTs.init(value);
                });
            }
        });

    }
    
    start () {

    }

    /**关闭 */
    closeBtn(){
        soundController.singleton.clickAudio();
        this.propPre = null;
        this.closePage();
    }

    // update (dt) {}
}
