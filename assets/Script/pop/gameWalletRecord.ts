import baseTs from "../base/baseTs";
import WalletRecord from "../model/WalletRecord";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";

const { ccclass, property } = cc._decorator;

export interface walletRecordData {
    amount: string	    //现金（元）
    createTime: number	//提现时间
    remark: string	    //备注
    state: number       //状态: 0-审核中 2-审核不通过 3-已转账
}

@ccclass
export default class gameWalletRecord extends baseTs {

    @property(cc.Node)
    haveRecordNode: cc.Node = null;

    @property(cc.Node)
    noRecordNode: cc.Node = null;

    @property(cc.Prefab)
    walletRecordPre: cc.Prefab = null;

    @property(cc.Node)
    recordContent: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onEnable() {
        XMSDK.post({
            url: UrlConst.wallet_record,
            onSuccess: res => {
                if(!this.isValid){
                    return;
                }

                if (res.code === 0) {
                    let recordData: Array<walletRecordData> = res.data.list;
                    let recordChild = this.recordContent.children;
                    let addNum = 0;         //需要添加的recordItem
                    if (recordChild.length < recordData.length) {
                        addNum = recordData.length - recordChild.length;
                    }
                    for (let i = 0; i < addNum; i++) {
                        let recordItem = cc.instantiate(this.walletRecordPre);
                        recordItem.parent = this.recordContent;
                        recordItem.active = true;
                    }

                    if (recordData.length > 0) {
                        this.noRecordNode.active = false;
                        this.haveRecordNode.active = true;

                        for (let i = 0; i < recordData.length; i++) {
                            if (recordChild[i]) {
                                recordChild[i].getComponent(WalletRecord).updateData(recordData[i]);
                            }
                        }
                    }
                    else {
                        this.noRecordNode.active = true;
                        this.haveRecordNode.active = false;
                    }
                }
                else {

                }
            },
            onFail: err => {

            }
        })
    }

    clickClose() {
        soundController.singleton.clickAudio();
        this.closePage();
    }
}
