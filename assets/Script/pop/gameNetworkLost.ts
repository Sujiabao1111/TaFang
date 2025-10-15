import baseTs from "../base/baseTs";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameNetworkLost extends baseTs {

    @property(cc.Node)
    btn_closeNode: cc.Node = null;

    callback: Function = null

    init(callback: Function) {
        this.node.zIndex = 999;
        this.callback = callback;

        if (XMSDK.openNetWorkCount > 2) {
            this.btn_closeNode.active = true;
        }
        else {
            this.btn_closeNode.active = false;
        }
    }
    btnComfirm() {
        this.callback && this.callback()
        this.callback = null
        this.closePage();
    }

    clickClose() {
        this.closePage();
    }
}
