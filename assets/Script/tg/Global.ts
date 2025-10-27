
import Singleton from "../base/Singleton";
import { Tools } from "../util/Tools";
import util from "../util/util";
import { ApiService } from "./ApiService";
const Telegram = window["Telegram"]


declare global {
    interface Window {
        playdeckIsOpen: boolean;
        requestPaymentCallback: Function;
        invoiceClosedCallback: Function;
        playdeckShowAdCallback: Function;
    }

    function Playdeck_showAd(): void;
    function Playdeck_requestPayment(amount: number, description: string, orderId: string): void;
}


export class Global extends Singleton {
    static get ins() {
        return super.getInstance<Global>();
    }

    our_easing = { easing: 'quadInOut' }; //{ easing: 'quadInOut' };

    /** 是否上报过任务通知 */
    public isReportTask = {
        /** 订阅 */
        Subscribe: false,
        /** 加群 */
        AddGroup: false,
        /** 投票 */
        Vote: false,
        /** 使用底部三个道具 */
        item: false,
        /** 使用复活 */
        revive: false,
    };

    public curPassStageGold = 0;

    public show_mine = true;
    public isHaveAdFreeCount = true;
    public proplist = [];
    public newbenefits = 0; // "1":未领取，"2":已领取 

    public loading_rate = 0;
    public ticket: string = "";
    public uid: number = 5190946;

    public user: User;
    public userData: NewUserData;
    /** 游戏配置信息 */
    gameConfig: GameConfig;
    cardPackConfig: CardPackConfigInfo[];




    private _userName = "";
    public get user_Name(): string {
        return this._userName;
    }
    public set user_Name(value: string) {
        this._userName = value;
    }

    public avatar_url: string;
    public initPlayer(user: User, userdata: NewUserData) {
        this.user = user;
        this.user_Name = user.name;
        this.setUserData(userdata);
        if (user.avatar != null && user.avatar != '' && this.avatar_url == null) {
            this.avatar_url = user.avatar;
        }
    }

    /**
     * 根据ID获取道具配置信息
     *
     * @param id 道具ID
     * @returns 返回对应的道具配置信息，如果未找到则返回undefined
     */
    getPropsCfg(id: number) {
        return this.gameConfig.PropCfg.find(x => x.id == id);
    }


    /**
     * 根据ID获取道具数量
     *
     * @param id 道具ID
     * @returns 返回对应的道具配置数量，如果未找到则返回undefined
     */
    getPropsNum(id: number) {
        return this.proplist.find(x => x.prop_id == id);
    }

    /** 游戏金币(ton) */
    public get ton_coin(): number {
        return Global.ins?.userData?.coin;
    }

    /** 显示金额 */
    async usd_coin(): Promise<number> {
        const price = await this.GetTonUsdPrice();
        const usd = this.ton_coin * price;
        return usd;
    };

    /**
    * 获取TON与USD的汇率
    *
    * @returns 返回TON与USD的汇率，如果获取失败则返回0
    */
    async GetTonUsdPrice() {
        try {
            let resp = await fetch(`https://tonapi.io/v2/rates?tokens=ton&currencies=usd`)
            let r = await resp.json()
            return r.rates.TON.prices.USD
        } catch (e) {
            console.warn('GetTonUsdPrice error: ', e);
            return 0
        }
    }






    /**
     * 设置用户数据
     */
    setUserData(userData: NewUserData) {
        this.userData = userData;
        util.userData.coin = this.userData.game_coin;
        // util.userData.product = this.userData.energy;
        this.setCurLevel();
    }

    setCurLevel() {
        if (this.userData.stage == 0) {
            util.userData.customs.big = 1;
            util.userData.customs.small = 1;
        } else {
            let level = Tools.getBigSmall(this.userData.stage)
            util.mapConfig = util.getMapdata(level.big);
            if (util.mapConfig.length < level.small + 1) {
                util.userData.customs.big = level.big + 1;
                util.userData.customs.small = 1;
            } else {
                util.userData.customs.big = level.big;
                util.userData.customs.small = level.small + 1;
            }
        }
        console.log("当前关卡等级", util.userData.customs.big + "-" + util.userData.customs.small);
    }




    /** 获取今日已通过关卡数 */
    today_passed: number = 0;

    /** 宝箱出现率提升关卡 */
    _box_up_lv: number = 0;
    /** 宝箱出现率提升关卡 */
    // get box_up_lv(): number {
    //     // return Math.ceil(GlobalData.cur_lvl / 5) * 5;
    // }

    /**
    * 签到天数
    */
    receive_day: number;




    /** 广告免费次数  2:复活 6:解锁 7:刷新 8:磁铁 */
    AdTypeCount = [0, 0, 2, 0, 0, 0, 2, 2, 2]
    resetADCount() {
        /** 广告免费次数 */
        Global.ins.AdTypeCount = [0, 0, 2, 0, 0, 0, 2, 2, 2]
        if (CC_DEBUG) {
            Global.ins.AdTypeCount = [0, 0, 10, 0, 0, 0, 3, 3, 3]
        }
    }

    _reviveCount: number = 0;
    /**
     * 获取复活计数
     *
     */
    get reviveCount() {
        return this._reviveCount;
    }

    /**
     * 复活使用一次
     */
    reviveUse() {
        this._reviveCount++;
    }

    /**
     * 重置复活次数
     */
    resetReviveCount() {
        this._reviveCount = 0;
    }

    /**
    * 是否有周卡
    */
    isHaveWeekCard() {
        let isWeek = (Global.ins.userData.card_type & Math.pow(2, 1)) !== 0
        return isWeek
    }

    payment(order, cb) {
        if (window?.playdeckIsOpen) {
            this.set_playdeck_invoiceClosed_cb(cb)
            var amount = Math.floor(order.usd / 0.495 * 25)
            Playdeck_requestPayment(amount, "TowerGame", order.oid)
            return
        }
        this.openInvoice(order.link, cb)
    }

    public openInvoice(url: string, callback: any) {
        if (CC_DEBUG) {
            console.error("telegram web app is not inited!");
            return null;
        }
        Telegram?.WebApp.openInvoice(url, callback);
    }

    // 设置playdeck请求付款回调函数
    set_playdeck_requestPayment_cb(callback) {
        // 获取支付回调函数
        window.requestPaymentCallback = callback
    }

    //设置playdeck invoiceClosed回调
    set_playdeck_invoiceClosed_cb(callback) {
        window.invoiceClosedCallback = callback
    }

    set_playdeck_showAd_cb(callback) {
        window.playdeckShowAdCallback = callback
    }

    public openTelegramLink(url: string) {
        if (CC_DEBUG) {
            console.error("telegram web app is not inited!");
            return null;
        }
        Telegram?.WebApp.openTelegramLink(url);
    }

    public openLink(url: string) {
        if (CC_DEBUG) {
            console.error("telegram web app is not inited!");
            return null;
        }

        Telegram?.WebApp.openLink(url, {
            tryBrowser: 'chrome',
            tryInstantView: true,
        })
    }



}
