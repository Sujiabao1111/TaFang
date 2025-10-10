
import baseTs from "../base/baseTs";
import pageTs from "../common/pageTs";
import SignModel from "../model/SignModel";
import soundController from "../soundController";
import { ApiService } from "../tg/ApiService";





const { ccclass, property } = cc._decorator;
@ccclass
export default class gameSign extends baseTs {

    @property({ type: cc.Node, tooltip: "" })
    private layoutSignItem: cc.Node = null;

    @property(cc.Node)
    private btn_single: cc.Node = null;
    @property(cc.Node)
    private btn_has: cc.Node = null;




    private _configs: SignInConfig[] = [];
    private _current_status: SignInCurrenStatus = null;
    private _signDay: number = 0;


    init(data: GetSignInConfigResponse) {
        console.log("gameSign: ", data);
        this._configs = data.configs;
        this._current_status = data.current_status;


        this.setData();

    }



    private setData() {
        this.btn_single.active = !this._current_status.has_signed_today;
        this.btn_has.active = this._current_status.has_signed_today;
        this._signDay = !this._current_status.has_signed_today ? this._current_status.current_day : this._current_status.current_day - 1;

        for (let i = 0; i < this.layoutSignItem.children.length; i++) {
            let item = this.layoutSignItem.children[i];
            item.getComponent(SignModel).init(this._configs[i], i, this._signDay, this._current_status.has_signed_today);
        }
    }



    async clickSingle() {
        soundController.singleton.clickAudio();
        let rewards = JSON.parse(this._configs[this._signDay].rewards);
        let rewardsValue = rewards[0][2];


        let res = await ApiService.ins.SignIn();
        if (res.response?.success) {
            // this.showPage(pageTs.pageName.GameSign, res.response);
            this.showPage(pageTs.pageName.GameRewardPro, { coin: 1000 });
        }


    }


    openSignReward(type) {

    }

    clickClose() {
        soundController.singleton.clickAudio();

        this.closePage();


    }

}
