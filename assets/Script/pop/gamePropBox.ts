import baseTs from "../base/baseTs";
import jsonSingleton from "../base/jsonSingleton";
import NameTs from "../common/NameTs";
import propItem from "../prop/propItem";
import { UrlConst } from "../server/UrlConst";
import util from "../util/util";
const {ccclass, property} = cc._decorator;

@ccclass
export default class gamePropBox extends baseTs {

    @property({type:cc.Node,displayName:"layout框"})
    private layOutContent: cc.Node = null;

    @property({type:cc.ScrollView,displayName:"滚动条"})
    private ScrollView: cc.ScrollView = null;

    private propData = new Map();

    onLoad () {

        /**道具 */
        // let propData = jsonSingleton.singleton.getJson(NameTs.propData);
        this.loadAny("prefab/prop/propItem2",cc.Prefab,(pre:cc.Prefab)=>{
            if(util && util.propData){
                util.propData.forEach((value) => {
                    let item:cc.Node = cc.instantiate(pre);
                    item.setParent(this.layOutContent);
                    let itemTs:propItem = item.getComponent(propItem);
                    if(itemTs)itemTs.init&&itemTs.init(value);
                    this.propData.set("prop_"+value.propIssueDetailList[0].propsId,item);
                });
            }
            cc.game.emit(NameTs.Game_PropItem_Update);
            this.ScrollView.scrollToPercentHorizontal(.05,.2);
        });

        
        cc.game.on(NameTs.Game_PropItem_Update,()=>{
            this.checkUpDateProp();
        }, this);
    }
    
    start () {

    }

    onEnable(){
        
    }
    /**
     * 
     */
    checkUpDateProp(){
        let num:number = 0;//道具大于0的有几个
        for(let i = 0;i<util.userData.prop.length;i++){
            let item:cc.Node = this.propData.get("prop_"+util.userData.prop[i].type);
            console.log(util.userData.prop[i].num,'util.userData.prop[i].num');
            if(item){
                item.active = util.userData.prop[i].num > 0;
            }
            if(util.userData.prop[i].num > 0){
                num++;
            }
        }

        if(num==1){
            this.node.width = 120;
        }else if(num == 2){
            this.node.width = 200;
        }else{
            this.node.width = 255;
        }
        this.node.height = num==0?0:90;
    }


    // update (dt) {}
}
