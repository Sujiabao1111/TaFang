import { walletRecordData } from "../pop/gameWalletRecord";
import soundController from "../soundController";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WalletRecord extends cc.Component{   
    
    @property(cc.Label)
    lable_money:cc.Label = null;

    @property(cc.Label)
    lable_time:cc.Label = null;

    @property(cc.Label)
    lable_state:cc.Label = null;

    @property(cc.Label)
    lable_explain:cc.Label = null;

    @property(cc.Node)
    haveExplain:cc.Node = null;

    start () {

    }   

    onDisable(){
        
    }

    updateData(data:walletRecordData){
        let self = this;
        self.lable_money.string = `${data.amount}元`;
        self.lable_time.string = self.formatDate(data.createTime);

        let tempColor = new cc.Color();

        if(data.state == 0){
            self.lable_state.string = "审核中";
            self.lable_state.node.color = tempColor.fromHEX("#FF7709");
        } 
        else if(data.state == 2){
            self.lable_state.string = "审核不通过";
            self.lable_state.node.color = tempColor.fromHEX("#CD241E");            
        } 
        else if(data.state == 3){
            self.lable_state.string = "审核已转账";
            self.lable_state.node.color = tempColor.fromHEX("#1E9914");
        }        

        if(data.state != 2){                     
            self.haveExplain.active = false;
            self.lable_explain.node.active = false;
            self.node.height = 140;           
        }
        else{
            self.lable_explain.string = data.remark;
            self.lable_explain.node.active = true;                        
            self.haveExplain.active = true;       
            self.node.height = 280;               
        }        
    }

    formatDate(date) {
        var date:any = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;
    }

    // update (dt) {},
};
