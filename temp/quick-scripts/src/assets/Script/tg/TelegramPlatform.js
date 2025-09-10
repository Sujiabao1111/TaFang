"use strict";
cc._RF.push(module, '1777534D8lIpb3+dvmFnv60', 'TelegramPlatform');
// Script/tg/TelegramPlatform.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramPlatform = void 0;
var AssistCtr_1 = require("../Assist/AssistCtr");
var Singleton_1 = require("../base/Singleton");
var LanguageData_1 = require("../Language/LanguageData");
var PageManage_1 = require("../PageManage");
var TimeTools_1 = require("../util/TimeTools");
var ApiService_1 = require("./ApiService");
var Global_1 = require("./Global");
var Telegram = window["Telegram"];
var TelegramPlatform = /** @class */ (function (_super) {
    __extends(TelegramPlatform, _super);
    function TelegramPlatform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.videoIdx = 0;
        _this.videoAd = null;
        _this.eIdx = 0;
        _this.onclicka_SpotID = 6073808;
        _this.isOnClickAdShow = false;
        _this.adCount = 0;
        _this.lastAdTimeMs = 0; //最后一次广告展示时间
        _this.isVideoCb = false; //是否有视频回调
        // adsgram广告Id
        _this._adUnitIds = '12256';
        _this.call = null;
        return _this;
    }
    Object.defineProperty(TelegramPlatform, "ins", {
        get: function () {
            return _super.getInstance.call(this);
        },
        enumerable: false,
        configurable: true
    });
    TelegramPlatform.prototype.onLoad = function () {
        this.adCount = 0;
    };
    TelegramPlatform.prototype.getUserId = function () {
        return Telegram.WebApp.initDataUnsafe.user.id;
    };
    TelegramPlatform.prototype.getPlatform = function () {
        return "Telegram";
    };
    TelegramPlatform.prototype.onShareCallBack = function () {
    };
    TelegramPlatform.prototype.doInit = function () {
        var _this = this;
        Telegram.WebApp.onEvent("shareMessageSent", function () {
            _this.onShareCallBack();
        });
        Telegram.WebApp.onEvent("shareMessageFailed", function (event) {
        });
        // this.initRewardAd()
        this.initOnClickAd();
    };
    TelegramPlatform.prototype.initOnClickAd = function () {
        if (window["initCdTma"] && this.onclicka_SpotID) {
            window["initCdTma"]({ id: this.onclicka_SpotID })
                .then(function (show) {
                window["showOnclickaAd"] = show;
            })
                .catch(function (e) { return console.log(e); });
            var self_1 = this;
            var div = document.getElementById("i_s_a_overlay");
            if (div) {
                div.addEventListener('click', function (event) {
                    if (event.target["className"].indexOf("vast_player_close") > -1) {
                        // console.log('ad close按钮被点击了！');
                        self_1.onVideoCallBack();
                        self_1.stopInterval();
                    }
                });
            }
        }
    };
    TelegramPlatform.prototype.checkShowEnterButton = function () {
        var btnEnter = cc.find("Canvas/bg/btnEnter");
        btnEnter.active = false;
        var loginTypes = cc.find("Canvas/loginTypes");
        loginTypes.active = false;
    };
    TelegramPlatform.prototype.initRewardAd = function () {
        var _this = this;
        this.videoAd = null;
        this.videoAd = window["Adsgram"].init({
            blockId: this._adUnitIds,
        });
        this.videoAd.addEventListener('onSkip', function () {
            //用户直接关闭了广告
            console.log("用户直接关闭广告");
            _this.onVideoErrorCallBack();
        });
        this.videoAd.addEventListener('onReward', function () {
            //用户看完了广告
            clearInterval(_this.eIdx);
            _this.onVideoCallBack();
        });
        this.videoAd.addEventListener('onComplete', function () {
            //当用户观看插页横幅广告直至结束或关闭它时
            _this.onVideoErrorCallBack();
        });
        this.videoAd.addEventListener('onError', function () {
            //当用户观看插页横幅广告直至结束或关闭它时
            console.log("广告播放失败");
            _this.onVideoErrorCallBack();
        });
        this.videoAd.addEventListener('onBannerNotFound', function () {
            //当没有横幅可显示时
            console.log("没有广告可显示");
            _this.onVideoErrorCallBack();
        });
        this.videoAd.addEventListener('onNonStopShow', function () {
            console.log("用户尝试连续观看多个广告");
            _this.onVideoErrorCallBack();
        });
    };
    TelegramPlatform.prototype.onVideoErrorCallBack = function () {
        clearInterval(this.eIdx);
        // GameApp.hideLoading()
    };
    TelegramPlatform.prototype.isIos = function () {
        var userAgent = navigator.userAgent || navigator.vendor || window["opera"];
        var isIos = /iPad|iPhone|iPod|Macintosh/i.test(userAgent) && !window["MSStream"];
        return isIos;
        // return cc.sys.OS_IOS
    };
    TelegramPlatform.prototype.video = function (call) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var now, interval, msg, rsp, agent_ad_config, availableAds, totalWeight, random, cumulativeWeight, selectedAd, _i, availableAds_1, ad, Ad;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        now = TimeTools_1.TimeTools._ins.getNowTime();
                        interval = now - this.lastAdTimeMs;
                        // 点击过于频繁
                        if (interval < 1000 * 2) { //限制点击观看广告的频率
                            return [2 /*return*/];
                        }
                        this.lastAdTimeMs = now;
                        this.call = call;
                        this.isVideoCb = false;
                        PageManage_1.default.singleton.Loading();
                        return [4 /*yield*/, ApiService_1.ApiService.ins.getAgentAdConfig((_b = (_a = Global_1.Global.ins) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.inviter)];
                    case 1:
                        msg = _c.sent();
                        rsp = msg === null || msg === void 0 ? void 0 : msg.response;
                        if (msg.status === 200 && rsp.success && (rsp === null || rsp === void 0 ? void 0 : rsp.data.length) > 0) {
                            agent_ad_config = rsp.data;
                            availableAds = agent_ad_config.filter(function (ad) { return ad.state === 1; });
                            if (availableAds.length > 0) {
                                totalWeight = availableAds.reduce(function (sum, ad) { return sum + ad.weight; }, 0);
                                random = Math.random() * totalWeight;
                                cumulativeWeight = 0;
                                selectedAd = null;
                                for (_i = 0, availableAds_1 = availableAds; _i < availableAds_1.length; _i++) {
                                    ad = availableAds_1[_i];
                                    cumulativeWeight += ad.weight;
                                    if (random <= cumulativeWeight) {
                                        selectedAd = ad;
                                        break;
                                    }
                                }
                                if (selectedAd) {
                                    console.log('根据权重选择的广告配置:', selectedAd);
                                    // 这里添加使用 selectedAd 的逻辑
                                    // 例如：根据 ad_type 选择不同的广告平台展示
                                    if (selectedAd.ad_type === 'adsgram') {
                                        this._showAdsgramAd();
                                        return [2 /*return*/];
                                    }
                                }
                            }
                        }
                        if (window === null || window === void 0 ? void 0 : window.playdeckIsOpen) {
                            this.set_playdeck_showAd_cb(call); //设置playdeck回调函数
                            Playdeck_showAd();
                            PageManage_1.default.singleton.hideLoading();
                            return [2 /*return*/];
                        }
                        PageManage_1.default.singleton.Loading();
                        Ad = "monetag";
                        if (this.adCount >= 2) {
                            Ad = "adsgram";
                        }
                        this.adCount++;
                        console.log("广告类型：" + Ad);
                        //苹果系统只支持adsgram广告
                        switch (Ad) {
                            case "adsgram":
                                this._showAdsgramAd();
                                this.adCount = 0;
                                break;
                            case "onclicka":
                                this._showOnclickaAd();
                                break;
                            case "monetag":
                                this._showMonetag();
                                break;
                            default:
                                // if (GameConfig.Mode == "dev") {
                                //     this.onVideoCallBack()
                                // }
                                // GameApp.hideLoading()
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TelegramPlatform.prototype.set_playdeck_showAd_cb = function (callback) {
        window.playdeckShowAdCallback = callback;
    };
    TelegramPlatform.prototype.onVideoCallBack = function () {
        //已经回调过了，不需要再处理回调
        if (this.isVideoCb) {
            return;
        }
        PageManage_1.default.singleton.hideLoading();
        this.isVideoCb = true;
        this.call && this.call();
        this.call = null;
        // this.onVideoCallBack()
        // this.adCount++
    };
    //展示adsgram广告
    TelegramPlatform.prototype._showAdsgramAd = function () {
        console.log("initAdsgramAd===", window["Adsgram"]);
        if (!window["Adsgram"]) {
            this._showMonetag();
            return;
        }
        this.initRewardAd();
        // this.addBtnListener(this.getAdsgramBtn.bind(this))
        var self = this;
        this.videoAd.show().then(function () {
            console.log("Adsgram 广告播放完成");
            PageManage_1.default.singleton.hideLoading();
        }).catch(function (e) {
            console.log("Adsgram 广告播放失败，错误原因:", e);
            PageManage_1.default.singleton.hideLoading();
            AssistCtr_1.AssistCtr.showToastTip(LanguageData_1.t("tips.reward_obtain_failed"));
            // GameApp.showTip("show ad error! " + e.message)
        }).finally(function () {
            self.stopInterval();
            PageManage_1.default.singleton.hideLoading();
        });
    };
    //展示onclicka广告
    TelegramPlatform.prototype._showOnclickaAd = function () {
        this.addBtnListener(this.getOnclickaBtn.bind(this));
        var self = this;
        window["showOnclickaAd"]().then(function () {
            console.log('onclicka 广告播放完成');
            //1秒后检查广告是否自动关闭了，如果自动关闭了，就发放奖励
            setTimeout(function () {
                var div = document.getElementById("i_s_a_overlay");
                if (div && div.style.display == "none") {
                    self.onVideoCallBack();
                }
            }, 1000);
        }).catch(function (e) {
            // GameApp.showTip(e.message)
        }).finally(function () {
            self.stopInterval();
            PageManage_1.default.singleton.hideLoading();
        });
    };
    TelegramPlatform.prototype._showMonetag = function () {
        var _this = this;
        // this.addBtnListener(this.getMonetag.bind(this))
        // @ts-ignore
        // console.log("initMonetagAd===", show_9547267());
        // @ts-ignore
        show_9547267().then(function () {
            console.log("Monetag广告成功");
            // GameApp.showTip('You have seen an ad!');
            _this.onVideoCallBack();
            // You need to add your user reward function here, which will be executed after the user watches the ad.
            // For more details, please refer to the detailed instructions.
            // alert('You have seen an ad!');
        }).catch(function (e) {
            PageManage_1.default.singleton.hideLoading();
            console.log("Monetag广告失败:", e);
            // UIManager.ins.showToast(t("tips.networkError"));
        });
    };
    TelegramPlatform.prototype.detectDevice = function () {
        var ua = navigator.userAgent.toLowerCase();
        var isMobile = /android|webos|iphone|ipod|blackberry/i.test(ua);
        var isTablet = /ipad|tablet|playbook/i.test(ua);
        if (isMobile && !isTablet) {
            return 'phone';
        }
        else if (isTablet) {
            return 'tablet';
        }
        else {
            return 'desktop';
        }
    };
    TelegramPlatform.prototype.getAdsgramBtn = function () {
        var allDivs = document.querySelectorAll('div');
        var externalDivs = Array.from(allDivs).filter(function (div) {
            return div.parentNode === document.documentElement;
        });
        if (externalDivs.length == 0) {
            return null;
        }
        var btn = externalDivs[0].shadowRoot.querySelector('._button_pbmuc_1') || externalDivs[0].shadowRoot.querySelector('._button_1u3uw_1 _visible_1u3uw_46');
        if (btn) {
            return [btn];
        }
        return null;
    };
    TelegramPlatform.prototype.getOnclickaBtn = function () {
        var div = document.querySelector('.vast_player_click_link');
        if (div) {
            return [div];
        }
        var element = document.getElementsByClassName('vast_player__vpaid-frame');
        var a = element[0]["contentDocument"].querySelector("#main-content");
        var list = [];
        if (a) {
            list.push(a);
        }
        var b = element[0]["contentDocument"].querySelector(".button_url");
        if (b) {
            list.push(b);
        }
        if (list.length == 0) {
            return null;
        }
        return list;
    };
    TelegramPlatform.prototype.getMonetag = function () {
        var iframes = document.getElementsByTagName("iframe");
        var a = iframes[1].contentDocument;
        return [a];
    };
    TelegramPlatform.prototype.addBtnListener = function (getBtnFunc) {
        var self = this;
        var isClick = false;
        var eventType = this.detectDevice() == "desktop" ? "click" : "touchstart";
        var lastBtns = [];
        var callback = function (event) {
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
            lastBtns.forEach(function (btn) {
                btn.removeEventListener(eventType, callback);
            });
            console.log('玩家点击广告前往按钮');
        };
        // 定义一个add函数
        var addBtnListener = function () {
            // 已经点击过，不再监听
            if (isClick)
                return;
            try {
                var btns = getBtnFunc();
                if (!btns || btns.length === 0) {
                    console.log("----------------找不到广告前往按钮---------------");
                    return false;
                }
                // 检查按钮数组是否发生变化
                var isSame = btns.length === lastBtns.length &&
                    btns.every(function (btn, i) { return btn === lastBtns[i]; });
                if (isSame) {
                    console.log("----------------广告前往按钮未发生变化--------------");
                    return;
                }
                // 移除旧按钮的事件监听器
                lastBtns.forEach(function (btn) {
                    btn.removeEventListener(eventType, callback);
                });
                // 添加新按钮的事件监听器
                btns.forEach(function (btn) {
                    btn.addEventListener(eventType, callback);
                });
                // 更新lastBtns
                lastBtns = btns.slice(); // 使用slice创建新数组
            }
            catch (e) {
                console.log('------------------查找广告前往按钮失败--------------------', e);
                return false;
            }
        };
        clearInterval(this.eIdx);
        this.eIdx = setInterval(function () {
            console.log("--------------尝试查找广告前往按钮并绑定点击事件-------------");
            // 每秒尝试绑定
            addBtnListener();
        }, 1000);
    };
    TelegramPlatform.prototype.stopInterval = function () {
        if (this.eIdx != 0) {
            clearInterval(this.eIdx);
            this.eIdx = 0;
        }
    };
    TelegramPlatform.prototype.share = function (sign) {
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
        var url = 'https://t.me/share/url?url=' + "https://t.me/GemJam_bot/gemjam";
        Telegram.WebApp.openTelegramLink(url);
        // Telegram.WebApp.shareMessage('l7ZaHWG9evZStbho', () => {
        //     console.log("分享成功")
        // })
        this.onShareCallBack();
        // })
    };
    TelegramPlatform.prototype.joinChat = function () {
        var url = 'https://t.me/RGislandNews';
        Telegram.WebApp.openTelegramLink(url);
    };
    TelegramPlatform.prototype.goVeto = function () {
        // const url = 'https://t.me/GemJam_bot/center?startapp=app_regalisland'
        // Telegram.WebApp.openTelegramLink(url)
        // setTimeout(() => {
        //     GameApp.send({
        //         MsgId: CMsgDefine.MsgId_C2S_GetVoteReward
        //     })
        // }, 2000)
    };
    //获取当前的环境，只判断是ios还是安卓
    TelegramPlatform.prototype.getDevice = function () {
        if (this.isIos()) {
            return "ios";
        }
        //安卓TODO
        return "";
    };
    return TelegramPlatform;
}(Singleton_1.default));
exports.TelegramPlatform = TelegramPlatform;

cc._RF.pop();