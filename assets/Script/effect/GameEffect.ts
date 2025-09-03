import NameTs from "../common/NameTs"
import ModelFunc from "./ModelFunc"
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
export const GameEffect = {
    playToolCls(){
        ModelFunc.createModel(NameTs.Tool_Effect_Name.Game_Prop_Cls, cc.director.getScene().getChildByName('Canvas'), (node, script) => {
            if (script) {
                
            }
        })
    },

    playToolShock(){
        ModelFunc.createModel(NameTs.Tool_Effect_Name.Game_Prop_Shock, cc.director.getScene().getChildByName('Canvas'), (node, script) => {
            if (script) {
                
            }
        })
    },

    playToolFrozen(){
        ModelFunc.createModel(NameTs.Tool_Effect_Name.Game_Prop_Frozen, cc.director.getScene().getChildByName('Canvas'), (node, script) => {
            if (script) {
                script.openPlist();
            }
        })
    },
}