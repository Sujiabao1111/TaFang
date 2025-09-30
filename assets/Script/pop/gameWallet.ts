import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { updateType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import pool from "../common/pool";
import { t } from "../Language/LanguageData";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import { ApiService, ChannelType } from "../tg/ApiService";
import { Global } from "../tg/Global";
import { WalletMgr } from "../tg/WalletMgr";
import TrackMgr from "../TrackMgr/TrackMgr";
import { Tools } from "../util/Tools";
import util from "../util/util";

const { ccclass, property } = cc._decorator;
@ccclass
export default class gameWallet extends baseTs {

    @property(cc.Label)
    private lable_myGold: cc.Label = null;
    @property(cc.Label)
    private lable_myTon: cc.Label = null;

    @property(cc.Node)
    private unBindLayer: cc.Node = null;
    @property(cc.Node)
    private bindLayer: cc.Node = null;
    /** 钱包链接 */
    @property({ type: cc.Label })
    private walletLabel: cc.Label = null;

    @property({ type: cc.EditBox })
    private editBox: cc.EditBox = null;

    @property(cc.Node)
    private ruleView: cc.Node = null;


    //增加东西
    @property(cc.Prefab)
    private addCoinItem: cc.Prefab = null;
    //在哪里增加
    @property(cc.Node)
    private addCoinBox: cc.Node = null;


    private channel_type: ChannelType = ChannelType.ton;

    private walletPool: pool;

    onLoad() {


    }

    init(data) {

        let userData = util.userData;
        this.lable_myGold.string = String(userData.coin);
        this.lable_myTon.string = "0";

        this.walletPool = new pool(cc.instantiate(this.addCoinItem));
        //数据更新
        cc.game.on(NameTs.Game_View_UserDataUpdata, (res) => {
            if (res == updateType.coin) {
                let userData = util.userData;
                this.lable_myGold.string = String(userData.coin);
            }
        }, this);

        //增加金币
        cc.game.on(NameTs.Game_Wallet_AddCoin, (res) => {
            if (res > 0) {
                this.createNum(res)
            }
        }, this);

        this.set_bind_wallet(WalletMgr.ins.isConnected());

    }

    set_bind_wallet(bind: boolean) {
        if (bind) {
            this.bindLayer.active = true;
            this.unBindLayer.active = false;
            this.walletLabel.string = Tools.truncateString(WalletMgr.ins.getAddress());
        } else {
            this.bindLayer.active = false;
            this.unBindLayer.active = true;
        }
    }

    /**
     * 连接到钱包
     * 尝试连接到钱包，如果连接成功，则显示绑定钱包成功的提示信息。
     */
    async connectToWallet() {
        // automaticlly connect wallet
        try {
            if (!WalletMgr.ins.isConnected()) {
                const connectedWallet = await WalletMgr.ins.doInitWalletContext(async () => {
                    const msg = await ApiService.ins.bindWallet(WalletMgr.ins.getAddress());
                    if (msg.status === 200 && msg.response.success) {
                        this.set_bind_wallet(true);
                    } else {
                        // AssistCtr.showToastTip(msg);
                        ApiService.ins.showError(msg);
                    }
                });
            }
        } catch (error) {
            console.warn('Error connecting to wallet:');
            console.log(String(error));
        }
    }

    /**
     * 断开与钱包的连接
     */
    async discnnectWallet() {
        try {
            if (WalletMgr.ins.isConnected()) {
                await WalletMgr.ins.doTonDisconnect();
            }
            const msg = await ApiService.ins.unbindWallet();
            if (msg.status === 200 && msg.response.success) {
                this.set_bind_wallet(false);
            }
        }
        catch (error) {
            console.warn('Error unconnecting to wallet:');
            console.log(String(error));
        }
    }

    /**
     * 复制钱包地址
     */
    copy_wallet_address() {
        if (Tools.copyToClipboard(WalletMgr.ins.getAddress())) {
            AssistCtr.showToastTip(t('tips.copy_success'));
        } else {
            AssistCtr.showToastTip(t('tips.copy_fail'));
        }
    }




    /**
   * 提现功能处理函数
   *
   * 当调用该函数时，将尝试从输入框（editBox）中获取数值，并进行一系列校验。
   * 如果数值有效（非空、非负且为有效数字），则调用ApiService.ins.submitWithdraw方法提交提现请求，
   * 并处理响应结果。
   */
    onWithdrawal() {
        let num = Number(this.editBox.string);
        if (!num || num < 0 || isNaN(num)) {
            this.editBox.string = '';
            return;
        }
        ApiService.ins.submitWithdraw(num, this.channel_type).then(rsp => {
            console.log('withdrawal', rsp);
            if (rsp.status === 200 && rsp.response.success) {
                this.lable_myTon.string = Tools.getNumStr(Global.ins.ton_coin);
                AssistCtr.showToastTip(t('tips.withdrawal_success'))
            }
            else {
                ApiService.ins.showError(rsp);
            }
        })
    }


    clickClose() {
        soundController.singleton.clickAudio();
        this.closePage();
    }



    /**
     * 
     * @param num 数量
     * @param pos 位置
     */
    createNum(num: number) {
        let item: cc.Node = this.walletPool.createEnemy(this.addCoinBox);
        item.setParent(this.addCoinBox);
        item.setPosition(0, 0);
        item.getComponent(cc.Sprite).enabled = false;
        item.opacity = 255;
        item.children[1] && (item.children[1].getComponent(cc.Label).string = "+" + num);
        item.scale = 1.1;
        cc.tween(item).parallel(
            cc.tween().by(.5, { y: 84 }),
            cc.tween().delay(.25).to(.25, { opacity: 0 })
        ).call(() => {
            this.walletPool.onEnemyKilled(item);
        }).start();
    }

}
