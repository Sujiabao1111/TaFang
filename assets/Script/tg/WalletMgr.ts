import Singleton from "../base/Singleton";


const connector = window["connector"]

export class WalletMgr extends Singleton {
    static get ins() {
        return super.getInstance<WalletMgr>();
    }

    // 链接钱包
    doInitWalletContext(callbacks?: Function) {
        if (!window["Telegram"]) {
            console.log("web不支持")
            return
        }
        console.log("链接钱包");
        
        // @ts-ignore
        doInitWalletContext(() => {
            console.log("链接钱包成功")
            // GameApp.send({
            //     MsgId: CMsgDefine.MsgId_C2S_BindWallet,
            //     WalletAddr: this.getAddress()
            // })
            callbacks && callbacks()
        })
    }

    // 断开链接钱包
    doTonDisconnect(callbacks?: Function) {
        if (!window["Telegram"]) {
            console.log("web不支持")
            return
        }
        console.log("断开链接钱包")
        // @ts-ignore
        doTonDisconnect().then(() => {
            console.log("断开链接钱包成功")
            // GameApp.dispatchEvent("E_OnRefreshWalletContext")
            callbacks && callbacks()
        })
    }

    // 获取Ton 可以换多少Usd
    GetTonUsdPrice(callbacks: Function) {
        if (!window["Telegram"]) {
            console.log("web不支持")
            callbacks(1)
            return
        }
        // @ts-ignore
        GetTonUsdPrice().then((rate) => {
            callbacks(rate)
        })
    }

    // 钱包是否链接
    isConnected() {
        if (!window["Telegram"]) {
            console.log("WEB默认没有链接")
            // 
            //web返回true
            // if (GameConfig.Mode == "dev") {
            //     return true
            // }
            return false
        }
        return connector ? connector.connected : false
    }

    // 获取钱包地址
    getAddress() {
        if (!window["Telegram"]) {
            console.log("WEB默认没有链接")
            return "fakeAddress"
        }

        if (!connector) {
            console.log("先判断钱包是否链接")
            return "fakeAddress"
        }
        return connector.account.address
    }

    // 获取钱包名字
    getAppName() {
        if (!window["Telegram"]) {
            console.log("WEB默认没有链接")
            return "fakeAppName"
        }
        if (!connector) {
            console.log("先判断钱包是否链接")
            return "fakeAppName"
        }
        return connector.walletInfo.appName
    }

}