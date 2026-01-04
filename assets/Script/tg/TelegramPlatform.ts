
import { AssistCtr } from "../Assist/AssistCtr";
import Singleton from "../base/Singleton";
import { t } from "../Language/LanguageData";
import PageManage from "../PageManage";
import { TimeTools } from "../util/TimeTools";
import { ApiService } from "./ApiService";
import { Global } from "./Global";

const Telegram = window["Telegram"]

export class TelegramPlatform extends Singleton {

    static get ins() {
        return super.getInstance<TelegramPlatform>();
    }

    private videoIdx: number = 0
    private videoAd: any = null

    private eIdx: any = 0

    private onclicka_SpotID: number = 6073808

    private isOnClickAdShow: boolean = false

    private adCount: number = 0

    private lastAdTimeMs: number = 0  //最后一次广告展示时间
    private isVideoCb: boolean = false //是否有视频回调


    onLoad() {
        this.adCount = 0
    }

    getUserId() {
        return Telegram.WebApp.initDataUnsafe.user.id
    }


    getPlatform(): string {
        return "Telegram"
    }

    onShareCallBack() {

    }

    doInit() {
        Telegram.WebApp.onEvent("shareMessageSent", () => {
            this.onShareCallBack()
        })
        Telegram.WebApp.onEvent("shareMessageFailed", (event: { error: string }) => {
        })

        // this.initRewardAd()
        this.initOnClickAd()
    }

    private initOnClickAd() {
        if (window["initCdTma"] && this.onclicka_SpotID) {
            window["initCdTma"]({ id: this.onclicka_SpotID })
                .then((show) => {
                    window["showOnclickaAd"] = show
                })
                .catch(e => console.log(e))

            let self = this
            var div = document.getElementById("i_s_a_overlay");
            if (div) {
                div.addEventListener('click', function (event) {
                    if (event.target["className"].indexOf("vast_player_close") > -1) {
                        // console.log('ad close按钮被点击了！');
                        self.onVideoCallBack()
                        self.stopInterval()
                    }
                });
            }
        }
    }



    checkShowEnterButton(): void {
        let btnEnter = cc.find("Canvas/bg/btnEnter")
        btnEnter.active = false
        let loginTypes = cc.find("Canvas/loginTypes")
        loginTypes.active = false
    }


    // adsgram广告Id
    _adUnitIds: string = '15970';
    initRewardAd() {
        this.videoAd = null;
        this.videoAd = window["Adsgram"].init({
            blockId: this._adUnitIds,
        });

        this.videoAd.addEventListener('onSkip', () => {
            //用户直接关闭了广告
            console.log("用户直接关闭广告")
            this.onVideoErrorCallBack()
        });

        this.videoAd.addEventListener('onReward', () => {
            //用户看完了广告
            clearInterval(this.eIdx)
            this.onVideoCallBack()
        });

        this.videoAd.addEventListener('onComplete', () => {
            //当用户观看插页横幅广告直至结束或关闭它时
            this.onVideoErrorCallBack()
        });
        this.videoAd.addEventListener('onError', () => {
            //当用户观看插页横幅广告直至结束或关闭它时
            console.log("广告播放失败")
            this.onVideoErrorCallBack()
        });
        this.videoAd.addEventListener('onBannerNotFound', () => {
            //当没有横幅可显示时
            console.log("没有广告可显示")
            this.onVideoErrorCallBack()
        })
        this.videoAd.addEventListener('onNonStopShow', () => {
            console.log("用户尝试连续观看多个广告")
            this.onVideoErrorCallBack()
        })
    }

    onVideoErrorCallBack() {
        clearInterval(this.eIdx)
        // GameApp.hideLoading()
    }

    private isIos() {
        const userAgent = navigator.userAgent || navigator.vendor || window["opera"];
        let isIos = /iPad|iPhone|iPod|Macintosh/i.test(userAgent) && !window["MSStream"];
        return isIos
        // return cc.sys.OS_IOS
    }


    async video(call: Function) {
        let now = TimeTools._ins.getNowTime()
        let interval = now - this.lastAdTimeMs
        // 点击过于频繁
        if (interval < 1000 * 2) { //限制点击观看广告的频率
            return
        }
        this.lastAdTimeMs = now
        this.call = call;

        this.isVideoCb = false;

        // PageManage.singleton.Loading();
        // const msg = await ApiService.ins.getAgentAdConfig(Global.ins?.user?.inviter);
        // const rsp = msg?.response;
        // if (msg.status === 200 && rsp.success && rsp?.data.length > 0) {
        //     const agent_ad_config = rsp.data;
        //     // 过滤可用的广告配置（state=1）
        //     const availableAds = agent_ad_config.filter(ad => ad.state === 1);

        //     if (availableAds.length > 0) {
        //         // 计算总权重
        //         const totalWeight = availableAds.reduce((sum, ad) => sum + ad.weight, 0);

        //         // 生成随机数（0到总权重之间）
        //         const random = Math.random() * totalWeight;

        //         // 根据权重选择广告
        //         let cumulativeWeight = 0;
        //         let selectedAd: AgentAdConfigItem = null;

        //         for (const ad of availableAds) {
        //             cumulativeWeight += ad.weight;
        //             if (random <= cumulativeWeight) {
        //                 selectedAd = ad;
        //                 break;
        //             }
        //         }

        //         if (selectedAd) {
        //             console.log('根据权重选择的广告配置:', selectedAd);
        //             // 这里添加使用 selectedAd 的逻辑
        //             // 例如：根据 ad_type 选择不同的广告平台展示
        //             if (selectedAd.ad_type === 'adsgram') {
        //                 this._showAdsgramAd();
        //                 return;
        //             }
        //         }
        //     }
        // }

        console.log("进入playdeckIsOpen===>", window?.playdeckIsOpen);
        if (window?.playdeckIsOpen) {
            this.set_playdeck_showAd_cb(call) //设置playdeck回调函数
            Playdeck_showAd()
            PageManage.singleton.hideLoading()
            return;
        }


        PageManage.singleton.Loading();
        let Ad = "monetag";
        if (this.adCount >= 2) {
            Ad = "adsgram"
        }
        this.adCount++;
        console.log("广告类型：" + Ad);
        //苹果系统只支持adsgram广告
        switch (Ad) {
            case "adsgram":
                this._showAdsgramAd();
                this.adCount = 0;
                break
            case "onclicka":
                this._showOnclickaAd();
                break
            case "monetag":
                this._showMonetag();
                break
            default:
                // if (GameConfig.Mode == "dev") {
                //     this.onVideoCallBack()
                // }
                // GameApp.hideLoading()
                break
        }

    }

    set_playdeck_showAd_cb(callback) {
        window.playdeckShowAdCallback = callback
    }

    private call: Function = null

    onVideoCallBack() {
        //已经回调过了，不需要再处理回调
        if (this.isVideoCb) {
            return
        }
        PageManage.singleton.hideLoading()
        this.isVideoCb = true;
        this.call && this.call()
        this.call = null;
        // this.onVideoCallBack()
        // this.adCount++
    }

    //展示adsgram广告
    private _showAdsgramAd() {
        console.log("initAdsgramAd===", window["Adsgram"]);
        if (!window["Adsgram"]) {
            this._showMonetag();
            return;
        }
        this.initRewardAd()
        // this.addBtnListener(this.getAdsgramBtn.bind(this))
        let self = this
        this.videoAd.show().then(() => {
            console.log("Adsgram 广告播放完成")
            ApiService.ins.Reportaction("ads");
            PageManage.singleton.hideLoading()
        }).catch((e) => {
            console.log("Adsgram 广告播放失败，错误原因:", e)
            PageManage.singleton.hideLoading()
            AssistCtr.showToastTip(t("tips.reward_obtain_failed"));
            // GameApp.showTip("show ad error! " + e.message)
        }).finally(() => {
            self.stopInterval()
            PageManage.singleton.hideLoading()
        })
    }

    //展示onclicka广告
    private _showOnclickaAd() {
        this.addBtnListener(this.getOnclickaBtn.bind(this))
        let self = this
        window["showOnclickaAd"]().then(() => {
            console.log('onclicka 广告播放完成')
            //1秒后检查广告是否自动关闭了，如果自动关闭了，就发放奖励
            setTimeout(() => {
                var div = document.getElementById("i_s_a_overlay");
                if (div && div.style.display == "none") {
                    self.onVideoCallBack()
                }
            }, 1000)
        }).catch((e) => {
            // GameApp.showTip(e.message)
        }).finally(() => {
            self.stopInterval()
            PageManage.singleton.hideLoading()
        })
    }

    private _showMonetag() {
        // this.addBtnListener(this.getMonetag.bind(this))
        // @ts-ignore
        // console.log("initMonetagAd===", show_9876818());
        // @ts-ignore
        show_9876818().then(() => {
            console.log("Monetag广告成功")
            ApiService.ins.Reportaction("ads");
            // GameApp.showTip('You have seen an ad!');
            this.onVideoCallBack()
            // You need to add your user reward function here, which will be executed after the user watches the ad.
            // For more details, please refer to the detailed instructions.
            // alert('You have seen an ad!');
        }).catch((e) => {
            PageManage.singleton.hideLoading()
            console.log("Monetag广告失败:", e)
            // UIManager.ins.showToast(t("tips.networkError"));
        })
    }

    detectDevice() {
        const ua = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipod|blackberry/i.test(ua);
        const isTablet = /ipad|tablet|playbook/i.test(ua);
        if (isMobile && !isTablet) {
            return 'phone';
        } else if (isTablet) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    private getAdsgramBtn() {
        const allDivs = document.querySelectorAll('div');
        const externalDivs = Array.from(allDivs).filter(
            (div) => {
                return div.parentNode === document.documentElement
            }
        );
        if (externalDivs.length == 0) {
            return null
        }
        let btn = externalDivs[0].shadowRoot.querySelector('._button_pbmuc_1') || externalDivs[0].shadowRoot.querySelector('._button_1u3uw_1 _visible_1u3uw_46');
        if (btn) {
            return [btn]
        }
        return null
    }

    private getOnclickaBtn() {
        let div = document.querySelector('.vast_player_click_link');
        if (div) {
            return [div]
        }

        let element = document.getElementsByClassName('vast_player__vpaid-frame')
        let a = element[0]["contentDocument"].querySelector("#main-content")
        let list = []
        if (a) {
            list.push(a)
        }
        let b = element[0]["contentDocument"].querySelector(".button_url")
        if (b) {
            list.push(b)
        }
        if (list.length == 0) {
            return null
        }
        return list
    }


    private getMonetag() {
        let iframes = document.getElementsByTagName("iframe")
        let a = iframes[1].contentDocument
        return [a]
    }

    private addBtnListener(getBtnFunc: Function) {
        let self = this;
        let isClick = false;
        let eventType = this.detectDevice() == "desktop" ? "click" : "touchstart";

        let lastBtns: HTMLElement[] = [];
        let callback = function (event: Event) {
            if (isClick) {
                return;
            }
            // 点击成功，停止定时器
            isClick = true;
            self.stopInterval();

            // GameApp.send({
            //     MsgId: CMsgDefine.MsgId_C2S_OnClickVideo,
            //     Sign: self.videoSign,
            //     Vid: self.vid,
            //     M: Utils.getVideoMask(self.vid, true),
            // });

            // 移除所有按钮的事件监听器
            lastBtns.forEach(btn => {
                btn.removeEventListener(eventType, callback);
            });
            console.log('玩家点击广告前往按钮');
        };

        // 定义一个add函数
        let addBtnListener = function () {
            // 已经点击过，不再监听
            if (isClick) return;
            try {
                let btns = getBtnFunc();
                if (!btns || btns.length === 0) {
                    console.log("----------------找不到广告前往按钮---------------");
                    return false;
                }

                // 检查按钮数组是否发生变化
                let isSame = btns.length === lastBtns.length &&
                    btns.every((btn, i) => btn === lastBtns[i]);

                if (isSame) {
                    console.log("----------------广告前往按钮未发生变化--------------");
                    return;
                }

                // 移除旧按钮的事件监听器
                lastBtns.forEach(btn => {
                    btn.removeEventListener(eventType, callback);
                });

                // 添加新按钮的事件监听器
                btns.forEach(btn => {
                    btn.addEventListener(eventType, callback);
                });

                // 更新lastBtns
                lastBtns = btns.slice(); // 使用slice创建新数组

            } catch (e) {
                console.log('------------------查找广告前往按钮失败--------------------', e);
                return false;
            }
        };
        clearInterval(this.eIdx)
        this.eIdx = setInterval(() => {
            console.log("--------------尝试查找广告前往按钮并绑定点击事件-------------");
            // 每秒尝试绑定
            addBtnListener();
        }, 1000);
    }

    stopInterval() {
        if (this.eIdx != 0) {
            clearInterval(this.eIdx)
            this.eIdx = 0
        }
    }

    share(sign: string) {
        // super.share(sign)
        // // GameApp.showLoading(true, 9999)
        // let accType = this.getCurAccType()
        // let tgId = Telegram.WebApp.initDataUnsafe.user.id
        // GameApp.post(`/botApi/getTgUuid?tgid=${tgId}&accTyp=${accType}`, {}, (ret: boolean, rsp: any) => {
        //     GameApp.hideLoading()
        //     console.log("getTgUuid", ret, rsp)
        //     let obj = JSON.parse(rsp)
        //     this.setFromUuid(obj.data)
        // const url = 'https://t.me/share/url?url=' + `https://t.me/RichIsland_bot/app?startapp=${this._sFromUuid}`;
        const url = 'https://t.me/share/url?url=' + `https://t.me/GemJam_bot/gemjam`;
        Telegram.WebApp.openTelegramLink(url)
        // Telegram.WebApp.shareMessage('l7ZaHWG9evZStbho', () => {
        //     console.log("分享成功")
        // })
        this.onShareCallBack()
        // })
    }

    joinChat() {
        const url = 'https://t.me/RGislandNews'
        Telegram.WebApp.openTelegramLink(url)
    }

    goVeto() {
        // const url = 'https://t.me/GemJam_bot/center?startapp=app_regalisland'
        // Telegram.WebApp.openTelegramLink(url)
        // setTimeout(() => {
        //     GameApp.send({
        //         MsgId: CMsgDefine.MsgId_C2S_GetVoteReward
        //     })
        // }, 2000)
    }


    //获取当前的环境，只判断是ios还是安卓
    protected getDevice(): string {
        if (this.isIos()) {
            return "ios"
        }
        //安卓TODO
        return ""
    }

}
