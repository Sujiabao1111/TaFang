const tonweb = new window.TonWeb(new window.TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC", { apiKey: 'a84d03dcc6fbe5243e04276c172ca47235f293d4870f90a6bd37f5ccfad648a7' }));
const Address = tonweb.utils.Address;
const Cell = tonweb.boc.Cell;
const JettonMinter = window.TonWeb.token.jetton.JettonMinter;

const wausdt = new JettonMinter(tonweb.provider, {
    adminAddress: new Address("EQBkQP48aUEDg5Y5RRc8SxFHm_C5tNcJDlh3e9pYHC-ZmG2M"),
    address: new Address("EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs"),
    code: Cell.oneFromBoc('b5ee9c720101040100740002516d12f0c6ae480800c881fc78d28207072c728a2e7896228f37e17369ae121cb0eef7b4b0385f33304001020842028f452d7a4dfd74066b682365177259ed05734435be76b5fd4bd5d8af2b7c3d68010003003e68747470733a2f2f7465746865722e746f2f757364742d746f6e2e6a736f6e')
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function GetTonUsdPrice() {
    try {
        let resp = await fetch(`https://tonapi.io/v2/rates?tokens=ton&currencies=usd`)
        let r = await resp.json()
        return r.rates.TON.prices.USD
    } catch (e) {
        return -1
    }
}


// ton支付
async function dotransfer(tonamount, walletAddress, transferId) {
    let body = new Cell()
    body.bits.writeUint(0, 32)
    body.bits.writeString(transferId)
    let payload = window.TonWeb.utils.bytesToBase64(await body.toBoc());
    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
            {
                address: walletAddress,//"UQBLni9eVw93_2JjlMt2C4y_c2nH3qxVIuhxG_S6UWBShTuQ",  // destination address
                amount: tonweb.utils.toNano(`${tonamount}`).toString(),               // Toncoin 
                payload: payload
            }
        ]
    }
    try {
        console.log(`begin transaction`)
        const result = await tonConnectUI.sendTransaction(transaction, { skipRedirectToWallet: 'ios' })
        console.log(`end transaction`, result.boc)
    } catch (e) {
        console.log(`exception`)
        console.log(e)
        // return null
    }
}

//测试ton-usdt订单
async function testUsdtTransfer() {
    await dotransferUsdtDollar(
        0.01,
        "UQA6OVrDnyzqX7AfMaQprsZiqVPat0oWdtzvw1mvyAfFDUh5",
        "EQB3KJgkpMQus6sdpULjktZt_vHWjt6dgrRzwYQZWBYf4kzn",
        "202505231031580007280001"
    )
}

// usdt支付
async function dotransferUsdtDollar(amount, walletAddress, jettonAddress, transferId) {
    //1e6 = 1000000 = 1USDT
    // let amount_test = 1e6 // tether usdt 6 decimal,test amount 1USD
    const destAddress = new Address(walletAddress);
    // const srcAddress = new Address(tonConnectUI.account.address);
    const body = new Cell();
    body.bits.writeUint(0xf8a7ea5, 32)                 // jetton transfer op code
    // body.bits.writeUint(Number(transferId), 64)        // 将订单号作为queryId
    body.bits.writeUint(Date.now(), 64)
    body.bits.writeCoins(amount * 1e6)                 // 假设USDT精度为6位小数
    body.bits.writeAddress(destAddress)                // 目标地址
    body.bits.writeBit(1)  //启用custompay
    body.bits.writeStringTail(transferId)              // 订单号
    // body.bits.writeAddress(srcAddress)                 // 来源地址

    // // // 地址写入需要单独处理
    // const recipientCell = new Cell();
    // recipientCell.bits.writeAddress(destAddress);
    // body.refs.push(recipientCell);

    // const senderCell = new Cell();
    // senderCell.bits.writeAddress(srcAddress);
    // body.refs.push(senderCell);

    // 添加订单元数据
    // const metaCell = new Cell();
    // metaCell.bits.writeUint(0, 32)
    // metaCell.bits.writeString(`${transferId}`);
    // body.refs.push(metaCell);
    let payload = window.TonWeb.utils.bytesToBase64(await body.toBoc());
    // // find wallet's jetton contract address
    // let jettonAddress = await wausdt.getJettonWalletAddress(new Address(walletAddress))

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
            {
                address: jettonAddress,                // sender's jetton contract address
                amount: tonweb.utils.toNano("0.01").toString(), // for commission fees, excess will be returned
                payload: payload
            }
        ]
    }
    try {
        // todo addorder and get usdt amount
        console.log(`begin usdt transaction`)
        // const lastTx = undefined//(await tonweb.getTransactions(tonConnectUI.account.address, 1))[0]
        // let lastTxHash = `${Date.now()}`
        // if (lastTx !== undefined && lastTx !== null) {
        //     lastTxHash = lastTx.transaction_id.hash
        // }
        // console.log(`${lastTx},${jaddress.toString()}`)
        // console.log(`ulastTxHash:${lastTxHash}`)

        const result = await tonConnectUI.sendTransaction(transaction, { skipRedirectToWallet: 'ios' })
        console.log(`end usdt transaction`, result.boc)
        // var txHash = lastTxHash
        // // for user experience, dont wait order result, after user sign it and over this function
        // while (txHash == lastTxHash) {
        //     await sleep(1100) // some delay between API calls
        //     let tx = (await tonweb.getTransactions(tonConnectUI.account.address, 1))[0]
        //     txHash = tx.transaction_id.hash
        // }
        // console.log(`uresult:${JSON.stringify(result)}`)
        // console.log(`after pending doneu, do Post to server :${txHash}`)
        // // order complate, then post payment request on telegram
        // return txHash
    } catch (e) {
        console.log(`exception u`)
        console.log(e)
        // return null
    }
}

async function connectToWallet(tonConnectUI, call) {
    // automaticlly connect wallet
    const connectedWallet = await tonConnectUI.connectWallet();
    // Do something with connectedWallet if needed
    console.log(connectedWallet);
    if (tonConnectUI.connected) {
        call && call()
        console.log(`already connected,current Address is ${tonConnectUI.account.address}`)
        tonConnectUI.closeModal()
    }
}

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://car.vazhenina.com/tg/tonconnect-manifest.json',
    buttonRootId: 'ton-connect'
});
tonConnectUI.uiOptions = {
    actionsConfiguration: {
        returnStrategy: 'back',
        twaReturnUrl: 'https://t.me/TGCoinTower_bot/towergame',
        // modals: ['before', 'success', 'error'],
        notifications: ['before', 'success', 'error']
    }
};

// const currentWallet = tonConnectUI.wallet;
// const currentWalletInfo = tonConnectUI.walletInfo;
// const currentAccount = tonConnectUI.account;
// const currentIsConnectedStatus = tonConnectUI.connected;
window.connector = tonConnectUI;

// connector.restoreConnection();

// Call the function

function doInitWalletContext(call) {
    try {
        connectToWallet(tonConnectUI, call).catch(error => {
            console.error("Error connecting to wallet:", error);
        });
    } catch (e) {
        console.log(`exception2:${e}`)
        tonConnectUI.closeModal();
    }
}

async function doTonDisconnect() {
    await tonConnectUI.disconnect();
}

// doInitWalletContext()