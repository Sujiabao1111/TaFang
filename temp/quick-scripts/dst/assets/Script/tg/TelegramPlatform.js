
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/tg/TelegramPlatform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0Z1xcVGVsZWdyYW1QbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQWdEO0FBQ2hELCtDQUEwQztBQUMxQyx5REFBNkM7QUFDN0MsNENBQXVDO0FBQ3ZDLCtDQUE4QztBQUM5QywyQ0FBMEM7QUFDMUMsbUNBQWtDO0FBRWxDLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUVuQztJQUFzQyxvQ0FBUztJQUEvQztRQUFBLHFFQWdmQztRQTFlVyxjQUFRLEdBQVcsQ0FBQyxDQUFBO1FBQ3BCLGFBQU8sR0FBUSxJQUFJLENBQUE7UUFFbkIsVUFBSSxHQUFXLENBQUMsQ0FBQTtRQUVoQixxQkFBZSxHQUFXLE9BQU8sQ0FBQTtRQUVqQyxxQkFBZSxHQUFZLEtBQUssQ0FBQTtRQUVoQyxhQUFPLEdBQVcsQ0FBQyxDQUFBO1FBRW5CLGtCQUFZLEdBQVcsQ0FBQyxDQUFBLENBQUUsWUFBWTtRQUN0QyxlQUFTLEdBQVksS0FBSyxDQUFBLENBQUMsU0FBUztRQStENUMsY0FBYztRQUNkLGdCQUFVLEdBQVcsT0FBTyxDQUFDO1FBb0pyQixVQUFJLEdBQWEsSUFBSSxDQUFBOztJQTBRakMsQ0FBQztJQTllRyxzQkFBVyx1QkFBRzthQUFkO1lBQ0ksT0FBTyxPQUFNLFdBQVcsV0FBb0IsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQWlCRCxpQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDSSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7SUFDakQsQ0FBQztJQUdELHNDQUFXLEdBQVg7UUFDSSxPQUFPLFVBQVUsQ0FBQTtJQUNy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R0FBRyxHQUFHLDJCQUEyQixDQUFBO1FBQ3ZDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVELGlDQUFNLEdBQU47UUFDSSx3RUFBd0U7UUFDeEUsd0NBQXdDO1FBQ3hDLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsb0RBQW9EO1FBQ3BELFNBQVM7UUFDVCxXQUFXO0lBQ2YsQ0FBQztJQUdELHFCQUFxQjtJQUNYLG9DQUFTLEdBQW5CO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZCxPQUFPLEtBQUssQ0FBQTtTQUNmO1FBQ0QsUUFBUTtRQUNSLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0FoZkEsQUFnZkMsQ0FoZnFDLG1CQUFTLEdBZ2Y5QztBQWhmWSw0Q0FBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcclxuaW1wb3J0IFNpbmdsZXRvbiBmcm9tIFwiLi4vYmFzZS9TaW5nbGV0b25cIjtcclxuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9MYW5ndWFnZS9MYW5ndWFnZURhdGFcIjtcclxuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4uL1BhZ2VNYW5hZ2VcIjtcclxuaW1wb3J0IHsgVGltZVRvb2xzIH0gZnJvbSBcIi4uL3V0aWwvVGltZVRvb2xzXCI7XHJcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tIFwiLi9BcGlTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gXCIuL0dsb2JhbFwiO1xyXG5cclxuY29uc3QgVGVsZWdyYW0gPSB3aW5kb3dbXCJUZWxlZ3JhbVwiXVxyXG5cclxuZXhwb3J0IGNsYXNzIFRlbGVncmFtUGxhdGZvcm0gZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgaW5zKCkge1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRJbnN0YW5jZTxUZWxlZ3JhbVBsYXRmb3JtPigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmlkZW9JZHg6IG51bWJlciA9IDBcclxuICAgIHByaXZhdGUgdmlkZW9BZDogYW55ID0gbnVsbFxyXG5cclxuICAgIHByaXZhdGUgZUlkeDogbnVtYmVyID0gMFxyXG5cclxuICAgIHByaXZhdGUgb25jbGlja2FfU3BvdElEOiBudW1iZXIgPSA2MDczODA4XHJcblxyXG4gICAgcHJpdmF0ZSBpc09uQ2xpY2tBZFNob3c6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIHByaXZhdGUgYWRDb3VudDogbnVtYmVyID0gMFxyXG5cclxuICAgIHByaXZhdGUgbGFzdEFkVGltZU1zOiBudW1iZXIgPSAwICAvL+acgOWQjuS4gOasoeW5v+WRiuWxleekuuaXtumXtFxyXG4gICAgcHJpdmF0ZSBpc1ZpZGVvQ2I6IGJvb2xlYW4gPSBmYWxzZSAvL+aYr+WQpuacieinhumikeWbnuiwg1xyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5hZENvdW50ID0gMFxyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJZCgpIHtcclxuICAgICAgICByZXR1cm4gVGVsZWdyYW0uV2ViQXBwLmluaXREYXRhVW5zYWZlLnVzZXIuaWRcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0UGxhdGZvcm0oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJUZWxlZ3JhbVwiXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUNhbGxCYWNrKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkb0luaXQoKSB7XHJcbiAgICAgICAgVGVsZWdyYW0uV2ViQXBwLm9uRXZlbnQoXCJzaGFyZU1lc3NhZ2VTZW50XCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblNoYXJlQ2FsbEJhY2soKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgVGVsZWdyYW0uV2ViQXBwLm9uRXZlbnQoXCJzaGFyZU1lc3NhZ2VGYWlsZWRcIiwgKGV2ZW50OiB7IGVycm9yOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5pdFJld2FyZEFkKClcclxuICAgICAgICB0aGlzLmluaXRPbkNsaWNrQWQoKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdE9uQ2xpY2tBZCgpIHtcclxuICAgICAgICBpZiAod2luZG93W1wiaW5pdENkVG1hXCJdICYmIHRoaXMub25jbGlja2FfU3BvdElEKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd1tcImluaXRDZFRtYVwiXSh7IGlkOiB0aGlzLm9uY2xpY2thX1Nwb3RJRCB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNob3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dbXCJzaG93T25jbGlja2FBZFwiXSA9IHNob3dcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlKSlcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpX3NfYV9vdmVybGF5XCIpO1xyXG4gICAgICAgICAgICBpZiAoZGl2KSB7XHJcbiAgICAgICAgICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0W1wiY2xhc3NOYW1lXCJdLmluZGV4T2YoXCJ2YXN0X3BsYXllcl9jbG9zZVwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhZCBjbG9zZeaMiemSruiiq+eCueWHu+S6hu+8gScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9uVmlkZW9DYWxsQmFjaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RvcEludGVydmFsKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGNoZWNrU2hvd0VudGVyQnV0dG9uKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBidG5FbnRlciA9IGNjLmZpbmQoXCJDYW52YXMvYmcvYnRuRW50ZXJcIilcclxuICAgICAgICBidG5FbnRlci5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGxldCBsb2dpblR5cGVzID0gY2MuZmluZChcIkNhbnZhcy9sb2dpblR5cGVzXCIpXHJcbiAgICAgICAgbG9naW5UeXBlcy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBhZHNncmFt5bm/5ZGKSWRcclxuICAgIF9hZFVuaXRJZHM6IHN0cmluZyA9ICcxMjI1Nic7XHJcblxyXG4gICAgaW5pdFJld2FyZEFkKCkge1xyXG4gICAgICAgIHRoaXMudmlkZW9BZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy52aWRlb0FkID0gd2luZG93W1wiQWRzZ3JhbVwiXS5pbml0KHtcclxuICAgICAgICAgICAgYmxvY2tJZDogdGhpcy5fYWRVbml0SWRzLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZpZGVvQWQuYWRkRXZlbnRMaXN0ZW5lcignb25Ta2lwJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+eUqOaIt+ebtOaOpeWFs+mXreS6huW5v+WRilxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+ebtOaOpeWFs+mXreW5v+WRilwiKVxyXG4gICAgICAgICAgICB0aGlzLm9uVmlkZW9FcnJvckNhbGxCYWNrKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy52aWRlb0FkLmFkZEV2ZW50TGlzdGVuZXIoJ29uUmV3YXJkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+eUqOaIt+eci+WujOS6huW5v+WRilxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZUlkeClcclxuICAgICAgICAgICAgdGhpcy5vblZpZGVvQ2FsbEJhY2soKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZpZGVvQWQuYWRkRXZlbnRMaXN0ZW5lcignb25Db21wbGV0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgLy/lvZPnlKjmiLfop4LnnIvmj5LpobXmqKrluYXlub/lkYrnm7Toh7Pnu5PmnZ/miJblhbPpl63lroPml7ZcclxuICAgICAgICAgICAgdGhpcy5vblZpZGVvRXJyb3JDYWxsQmFjaygpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52aWRlb0FkLmFkZEV2ZW50TGlzdGVuZXIoJ29uRXJyb3InLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v5b2T55So5oi36KeC55yL5o+S6aG15qiq5bmF5bm/5ZGK55u06Iez57uT5p2f5oiW5YWz6Zet5a6D5pe2XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK5pKt5pS+5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIHRoaXMub25WaWRlb0Vycm9yQ2FsbEJhY2soKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudmlkZW9BZC5hZGRFdmVudExpc3RlbmVyKCdvbkJhbm5lck5vdEZvdW5kJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+W9k+ayoeacieaoquW5heWPr+aYvuekuuaXtlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuayoeacieW5v+WRiuWPr+aYvuekulwiKVxyXG4gICAgICAgICAgICB0aGlzLm9uVmlkZW9FcnJvckNhbGxCYWNrKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMudmlkZW9BZC5hZGRFdmVudExpc3RlbmVyKCdvbk5vblN0b3BTaG93JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+Wwneivlei/nue7reingueci+WkmuS4quW5v+WRilwiKVxyXG4gICAgICAgICAgICB0aGlzLm9uVmlkZW9FcnJvckNhbGxCYWNrKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvblZpZGVvRXJyb3JDYWxsQmFjaygpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZUlkeClcclxuICAgICAgICAvLyBHYW1lQXBwLmhpZGVMb2FkaW5nKClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzSW9zKCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3dbXCJvcGVyYVwiXTtcclxuICAgICAgICBsZXQgaXNJb3MgPSAvaVBhZHxpUGhvbmV8aVBvZHxNYWNpbnRvc2gvaS50ZXN0KHVzZXJBZ2VudCkgJiYgIXdpbmRvd1tcIk1TU3RyZWFtXCJdO1xyXG4gICAgICAgIHJldHVybiBpc0lvc1xyXG4gICAgICAgIC8vIHJldHVybiBjYy5zeXMuT1NfSU9TXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIHZpZGVvKGNhbGw6IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIGxldCBub3cgPSBUaW1lVG9vbHMuX2lucy5nZXROb3dUaW1lKClcclxuICAgICAgICBsZXQgaW50ZXJ2YWwgPSBub3cgLSB0aGlzLmxhc3RBZFRpbWVNc1xyXG4gICAgICAgIC8vIOeCueWHu+i/h+S6jumikee5gVxyXG4gICAgICAgIGlmIChpbnRlcnZhbCA8IDEwMDAgKiAyKSB7IC8v6ZmQ5Yi254K55Ye76KeC55yL5bm/5ZGK55qE6aKR546HXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RBZFRpbWVNcyA9IG5vd1xyXG4gICAgICAgIHRoaXMuY2FsbCA9IGNhbGw7XHJcblxyXG4gICAgICAgIHRoaXMuaXNWaWRlb0NiID0gZmFsc2U7XHJcblxyXG4gICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLkxvYWRpbmcoKVxyXG4gICAgICAgIGNvbnN0IG1zZyA9IGF3YWl0IEFwaVNlcnZpY2UuaW5zLmdldEFnZW50QWRDb25maWcoR2xvYmFsLmlucz8udXNlcj8uaW52aXRlcik7XHJcbiAgICAgICAgY29uc3QgcnNwID0gbXNnPy5yZXNwb25zZTtcclxuICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gMjAwICYmIHJzcC5zdWNjZXNzICYmIHJzcD8uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFnZW50X2FkX2NvbmZpZyA9IHJzcC5kYXRhO1xyXG5cclxuICAgICAgICAgICAgLy8g6L+H5ruk5Y+v55So55qE5bm/5ZGK6YWN572u77yIc3RhdGU9Me+8iVxyXG4gICAgICAgICAgICBjb25zdCBhdmFpbGFibGVBZHMgPSBhZ2VudF9hZF9jb25maWcuZmlsdGVyKGFkID0+IGFkLnN0YXRlID09PSAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVBZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g6K6h566X5oC75p2D6YeNXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbFdlaWdodCA9IGF2YWlsYWJsZUFkcy5yZWR1Y2UoKHN1bSwgYWQpID0+IHN1bSArIGFkLndlaWdodCwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g55Sf5oiQ6ZqP5py65pWw77yIMOWIsOaAu+adg+mHjeS5i+mXtO+8iVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tID0gTWF0aC5yYW5kb20oKSAqIHRvdGFsV2VpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOagueaNruadg+mHjemAieaLqeW5v+WRilxyXG4gICAgICAgICAgICAgICAgbGV0IGN1bXVsYXRpdmVXZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkQWQ6IEFnZW50QWRDb25maWdJdGVtID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGFkIG9mIGF2YWlsYWJsZUFkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1bXVsYXRpdmVXZWlnaHQgKz0gYWQud2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5kb20gPD0gY3VtdWxhdGl2ZVdlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEFkID0gYWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmoLnmja7mnYPph43pgInmi6nnmoTlub/lkYrphY3nva46Jywgc2VsZWN0ZWRBZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6L+Z6YeM5re75Yqg5L2/55SoIHNlbGVjdGVkQWQg55qE6YC76L6RXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5L6L5aaC77ya5qC55o2uIGFkX3R5cGUg6YCJ5oup5LiN5ZCM55qE5bm/5ZGK5bmz5Y+w5bGV56S6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkQWQuYWRfdHlwZSA9PT0gJ2Fkc2dyYW0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dBZHNncmFtQWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdz8ucGxheWRlY2tJc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRfcGxheWRlY2tfc2hvd0FkX2NiKGNhbGwpIC8v6K6+572ucGxheWRlY2vlm57osIPlh73mlbBcclxuICAgICAgICAgICAgUGxheWRlY2tfc2hvd0FkKClcclxuICAgICAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5Mb2FkaW5nKClcclxuICAgICAgICBsZXQgQWQgPSBcIm1vbmV0YWdcIjtcclxuICAgICAgICBpZiAodGhpcy5hZENvdW50ID49IDIpIHtcclxuICAgICAgICAgICAgQWQgPSBcImFkc2dyYW1cIlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkQ291bnQrKztcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuexu+Wei++8mlwiICsgQWQpO1xyXG4gICAgICAgIC8v6Iu55p6c57O757uf5Y+q5pSv5oyBYWRzZ3JhbeW5v+WRilxyXG4gICAgICAgIHN3aXRjaCAoQWQpIHtcclxuICAgICAgICAgICAgY2FzZSBcImFkc2dyYW1cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dBZHNncmFtQWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwib25jbGlja2FcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dPbmNsaWNrYUFkKCk7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwibW9uZXRhZ1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd01vbmV0YWcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoR2FtZUNvbmZpZy5Nb2RlID09IFwiZGV2XCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLm9uVmlkZW9DYWxsQmFjaygpXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lQXBwLmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRfcGxheWRlY2tfc2hvd0FkX2NiKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgd2luZG93LnBsYXlkZWNrU2hvd0FkQ2FsbGJhY2sgPSBjYWxsYmFja1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsbDogRnVuY3Rpb24gPSBudWxsXHJcblxyXG4gICAgb25WaWRlb0NhbGxCYWNrKCkge1xyXG4gICAgICAgIC8v5bey57uP5Zue6LCD6L+H5LqG77yM5LiN6ZyA6KaB5YaN5aSE55CG5Zue6LCDXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWaWRlb0NiKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgdGhpcy5pc1ZpZGVvQ2IgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2FsbCAmJiB0aGlzLmNhbGwoKVxyXG4gICAgICAgIHRoaXMuY2FsbCA9IG51bGw7XHJcbiAgICAgICAgLy8gdGhpcy5vblZpZGVvQ2FsbEJhY2soKVxyXG4gICAgICAgIC8vIHRoaXMuYWRDb3VudCsrXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL+WxleekumFkc2dyYW3lub/lkYpcclxuICAgIHByaXZhdGUgX3Nob3dBZHNncmFtQWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbml0QWRzZ3JhbUFkPT09XCIsIHdpbmRvd1tcIkFkc2dyYW1cIl0pO1xyXG4gICAgICAgIGlmICghd2luZG93W1wiQWRzZ3JhbVwiXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93TW9uZXRhZygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdFJld2FyZEFkKClcclxuICAgICAgICAvLyB0aGlzLmFkZEJ0bkxpc3RlbmVyKHRoaXMuZ2V0QWRzZ3JhbUJ0bi5iaW5kKHRoaXMpKVxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHRoaXMudmlkZW9BZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRzZ3JhbSDlub/lkYrmkq3mlL7lrozmiJBcIilcclxuICAgICAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRzZ3JhbSDlub/lkYrmkq3mlL7lpLHotKXvvIzplJnor6/ljp/lm6A6XCIsIGUpXHJcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgQXNzaXN0Q3RyLnNob3dUb2FzdFRpcCh0KFwidGlwcy5yZXdhcmRfb2J0YWluX2ZhaWxlZFwiKSk7XHJcbiAgICAgICAgICAgIC8vIEdhbWVBcHAuc2hvd1RpcChcInNob3cgYWQgZXJyb3IhIFwiICsgZS5tZXNzYWdlKVxyXG4gICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnN0b3BJbnRlcnZhbCgpXHJcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV56S6b25jbGlja2Hlub/lkYpcclxuICAgIHByaXZhdGUgX3Nob3dPbmNsaWNrYUFkKCkge1xyXG4gICAgICAgIHRoaXMuYWRkQnRuTGlzdGVuZXIodGhpcy5nZXRPbmNsaWNrYUJ0bi5iaW5kKHRoaXMpKVxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdpbmRvd1tcInNob3dPbmNsaWNrYUFkXCJdKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbmNsaWNrYSDlub/lkYrmkq3mlL7lrozmiJAnKVxyXG4gICAgICAgICAgICAvLzHnp5LlkI7mo4Dmn6Xlub/lkYrmmK/lkKboh6rliqjlhbPpl63kuobvvIzlpoLmnpzoh6rliqjlhbPpl63kuobvvIzlsLHlj5HmlL7lpZblirFcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpX3NfYV9vdmVybGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpdiAmJiBkaXYuc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25WaWRlb0NhbGxCYWNrKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBHYW1lQXBwLnNob3dUaXAoZS5tZXNzYWdlKVxyXG4gICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnN0b3BJbnRlcnZhbCgpXHJcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Nob3dNb25ldGFnKCkge1xyXG4gICAgICAgIC8vIHRoaXMuYWRkQnRuTGlzdGVuZXIodGhpcy5nZXRNb25ldGFnLmJpbmQodGhpcykpXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW5pdE1vbmV0YWdBZD09PVwiLCBzaG93Xzk1NDcyNjcoKSk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHNob3dfOTU0NzI2NygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1vbmV0YWflub/lkYrmiJDlip9cIilcclxuICAgICAgICAgICAgLy8gR2FtZUFwcC5zaG93VGlwKCdZb3UgaGF2ZSBzZWVuIGFuIGFkIScpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVmlkZW9DYWxsQmFjaygpXHJcbiAgICAgICAgICAgIC8vIFlvdSBuZWVkIHRvIGFkZCB5b3VyIHVzZXIgcmV3YXJkIGZ1bmN0aW9uIGhlcmUsIHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgdGhlIHVzZXIgd2F0Y2hlcyB0aGUgYWQuXHJcbiAgICAgICAgICAgIC8vIEZvciBtb3JlIGRldGFpbHMsIHBsZWFzZSByZWZlciB0byB0aGUgZGV0YWlsZWQgaW5zdHJ1Y3Rpb25zLlxyXG4gICAgICAgICAgICAvLyBhbGVydCgnWW91IGhhdmUgc2VlbiBhbiBhZCEnKTtcclxuICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTW9uZXRhZ+W5v+WRiuWksei0pTpcIiwgZSlcclxuICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmlucy5zaG93VG9hc3QodChcInRpcHMubmV0d29ya0Vycm9yXCIpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGRldGVjdERldmljZSgpIHtcclxuICAgICAgICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBjb25zdCBpc01vYmlsZSA9IC9hbmRyb2lkfHdlYm9zfGlwaG9uZXxpcG9kfGJsYWNrYmVycnkvaS50ZXN0KHVhKTtcclxuICAgICAgICBjb25zdCBpc1RhYmxldCA9IC9pcGFkfHRhYmxldHxwbGF5Ym9vay9pLnRlc3QodWEpO1xyXG4gICAgICAgIGlmIChpc01vYmlsZSAmJiAhaXNUYWJsZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdwaG9uZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1RhYmxldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3RhYmxldCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICdkZXNrdG9wJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBZHNncmFtQnRuKCkge1xyXG4gICAgICAgIGNvbnN0IGFsbERpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcclxuICAgICAgICBjb25zdCBleHRlcm5hbERpdnMgPSBBcnJheS5mcm9tKGFsbERpdnMpLmZpbHRlcihcclxuICAgICAgICAgICAgKGRpdikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpdi5wYXJlbnROb2RlID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGV4dGVybmFsRGl2cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYnRuID0gZXh0ZXJuYWxEaXZzWzBdLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLl9idXR0b25fcGJtdWNfMScpIHx8IGV4dGVybmFsRGl2c1swXS5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5fYnV0dG9uXzF1M3V3XzEgX3Zpc2libGVfMXUzdXdfNDYnKTtcclxuICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbYnRuXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T25jbGlja2FCdG4oKSB7XHJcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52YXN0X3BsYXllcl9jbGlja19saW5rJyk7XHJcbiAgICAgICAgaWYgKGRpdikge1xyXG4gICAgICAgICAgICByZXR1cm4gW2Rpdl1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmFzdF9wbGF5ZXJfX3ZwYWlkLWZyYW1lJylcclxuICAgICAgICBsZXQgYSA9IGVsZW1lbnRbMF1bXCJjb250ZW50RG9jdW1lbnRcIl0ucXVlcnlTZWxlY3RvcihcIiNtYWluLWNvbnRlbnRcIilcclxuICAgICAgICBsZXQgbGlzdCA9IFtdXHJcbiAgICAgICAgaWYgKGEpIHtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKGEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiID0gZWxlbWVudFswXVtcImNvbnRlbnREb2N1bWVudFwiXS5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbl91cmxcIilcclxuICAgICAgICBpZiAoYikge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goYilcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3RcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNb25ldGFnKCkge1xyXG4gICAgICAgIGxldCBpZnJhbWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpZnJhbWVcIilcclxuICAgICAgICBsZXQgYSA9IGlmcmFtZXNbMV0uY29udGVudERvY3VtZW50XHJcbiAgICAgICAgcmV0dXJuIFthXVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkQnRuTGlzdGVuZXIoZ2V0QnRuRnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGlzQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICBsZXQgZXZlbnRUeXBlID0gdGhpcy5kZXRlY3REZXZpY2UoKSA9PSBcImRlc2t0b3BcIiA/IFwiY2xpY2tcIiA6IFwidG91Y2hzdGFydFwiO1xyXG5cclxuICAgICAgICBsZXQgbGFzdEJ0bnM6IEhUTUxFbGVtZW50W10gPSBbXTtcclxuICAgICAgICBsZXQgY2FsbGJhY2sgPSBmdW5jdGlvbiAoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChpc0NsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g54K55Ye75oiQ5Yqf77yM5YGc5q2i5a6a5pe25ZmoXHJcbiAgICAgICAgICAgIGlzQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLnN0b3BJbnRlcnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2FtZUFwcC5zZW5kKHtcclxuICAgICAgICAgICAgLy8gICAgIE1zZ0lkOiBDTXNnRGVmaW5lLk1zZ0lkX0MyU19PbkNsaWNrVmlkZW8sXHJcbiAgICAgICAgICAgIC8vICAgICBTaWduOiBzZWxmLnZpZGVvU2lnbixcclxuICAgICAgICAgICAgLy8gICAgIFZpZDogc2VsZi52aWQsXHJcbiAgICAgICAgICAgIC8vICAgICBNOiBVdGlscy5nZXRWaWRlb01hc2soc2VsZi52aWQsIHRydWUpLFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIOenu+mZpOaJgOacieaMiemSrueahOS6i+S7tuebkeWQrOWZqFxyXG4gICAgICAgICAgICBsYXN0QnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnjqnlrrbngrnlh7vlub/lkYrliY3lvoDmjInpkq4nKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDlrprkuYnkuIDkuKphZGTlh73mlbBcclxuICAgICAgICBsZXQgYWRkQnRuTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIOW3sue7j+eCueWHu+i/h++8jOS4jeWGjeebkeWQrFxyXG4gICAgICAgICAgICBpZiAoaXNDbGljaykgcmV0dXJuO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0bnMgPSBnZXRCdG5GdW5jKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJ0bnMgfHwgYnRucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS3mib7kuI3liLDlub/lkYrliY3lvoDmjInpkq4tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOajgOafpeaMiemSruaVsOe7hOaYr+WQpuWPkeeUn+WPmOWMllxyXG4gICAgICAgICAgICAgICAgbGV0IGlzU2FtZSA9IGJ0bnMubGVuZ3RoID09PSBsYXN0QnRucy5sZW5ndGggJiZcclxuICAgICAgICAgICAgICAgICAgICBidG5zLmV2ZXJ5KChidG4sIGkpID0+IGJ0biA9PT0gbGFzdEJ0bnNbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1NhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS3lub/lkYrliY3lvoDmjInpkq7mnKrlj5HnlJ/lj5jljJYtLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g56e76Zmk5pen5oyJ6ZKu55qE5LqL5Lu255uR5ZCs5ZmoXHJcbiAgICAgICAgICAgICAgICBsYXN0QnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDmt7vliqDmlrDmjInpkq7nmoTkuovku7bnm5HlkKzlmahcclxuICAgICAgICAgICAgICAgIGJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5pu05pawbGFzdEJ0bnNcclxuICAgICAgICAgICAgICAgIGxhc3RCdG5zID0gYnRucy5zbGljZSgpOyAvLyDkvb/nlKhzbGljZeWIm+W7uuaWsOaVsOe7hFxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLeafpeaJvuW5v+WRiuWJjeW+gOaMiemSruWksei0pS0tLS0tLS0tLS0tLS0tLS0tLS0tJywgZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5lSWR4KVxyXG4gICAgICAgIHRoaXMuZUlkeCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLeWwneivleafpeaJvuW5v+WRiuWJjeW+gOaMiemSruW5tue7keWumueCueWHu+S6i+S7ti0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgIC8vIOavj+enkuWwneivlee7keWumlxyXG4gICAgICAgICAgICBhZGRCdG5MaXN0ZW5lcigpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5lSWR4ICE9IDApIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmVJZHgpXHJcbiAgICAgICAgICAgIHRoaXMuZUlkeCA9IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hhcmUoc2lnbjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gc3VwZXIuc2hhcmUoc2lnbilcclxuICAgICAgICAvLyAvLyBHYW1lQXBwLnNob3dMb2FkaW5nKHRydWUsIDk5OTkpXHJcbiAgICAgICAgLy8gbGV0IGFjY1R5cGUgPSB0aGlzLmdldEN1ckFjY1R5cGUoKVxyXG4gICAgICAgIC8vIGxldCB0Z0lkID0gVGVsZWdyYW0uV2ViQXBwLmluaXREYXRhVW5zYWZlLnVzZXIuaWRcclxuICAgICAgICAvLyBHYW1lQXBwLnBvc3QoYC9ib3RBcGkvZ2V0VGdVdWlkP3RnaWQ9JHt0Z0lkfSZhY2NUeXA9JHthY2NUeXBlfWAsIHt9LCAocmV0OiBib29sZWFuLCByc3A6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBHYW1lQXBwLmhpZGVMb2FkaW5nKClcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJnZXRUZ1V1aWRcIiwgcmV0LCByc3ApXHJcbiAgICAgICAgLy8gICAgIGxldCBvYmogPSBKU09OLnBhcnNlKHJzcClcclxuICAgICAgICAvLyAgICAgdGhpcy5zZXRGcm9tVXVpZChvYmouZGF0YSlcclxuICAgICAgICAvLyBjb25zdCB1cmwgPSAnaHR0cHM6Ly90Lm1lL3NoYXJlL3VybD91cmw9JyArIGBodHRwczovL3QubWUvUmljaElzbGFuZF9ib3QvYXBwP3N0YXJ0YXBwPSR7dGhpcy5fc0Zyb21VdWlkfWA7XHJcbiAgICAgICAgY29uc3QgdXJsID0gJ2h0dHBzOi8vdC5tZS9zaGFyZS91cmw/dXJsPScgKyBgaHR0cHM6Ly90Lm1lL0dlbUphbV9ib3QvZ2VtamFtYDtcclxuICAgICAgICBUZWxlZ3JhbS5XZWJBcHAub3BlblRlbGVncmFtTGluayh1cmwpXHJcbiAgICAgICAgLy8gVGVsZWdyYW0uV2ViQXBwLnNoYXJlTWVzc2FnZSgnbDdaYUhXRzlldlpTdGJobycsICgpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLliIbkuqvmiJDlip9cIilcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIHRoaXMub25TaGFyZUNhbGxCYWNrKClcclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG5cclxuICAgIGpvaW5DaGF0KCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9ICdodHRwczovL3QubWUvUkdpc2xhbmROZXdzJ1xyXG4gICAgICAgIFRlbGVncmFtLldlYkFwcC5vcGVuVGVsZWdyYW1MaW5rKHVybClcclxuICAgIH1cclxuXHJcbiAgICBnb1ZldG8oKSB7XHJcbiAgICAgICAgLy8gY29uc3QgdXJsID0gJ2h0dHBzOi8vdC5tZS9HZW1KYW1fYm90L2NlbnRlcj9zdGFydGFwcD1hcHBfcmVnYWxpc2xhbmQnXHJcbiAgICAgICAgLy8gVGVsZWdyYW0uV2ViQXBwLm9wZW5UZWxlZ3JhbUxpbmsodXJsKVxyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBHYW1lQXBwLnNlbmQoe1xyXG4gICAgICAgIC8vICAgICAgICAgTXNnSWQ6IENNc2dEZWZpbmUuTXNnSWRfQzJTX0dldFZvdGVSZXdhcmRcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9LCAyMDAwKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+iOt+WPluW9k+WJjeeahOeOr+Wig++8jOWPquWIpOaWreaYr2lvc+i/mOaYr+WuieWNk1xyXG4gICAgcHJvdGVjdGVkIGdldERldmljZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSW9zKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiaW9zXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lronljZNUT0RPXHJcbiAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgIH1cclxuXHJcbn1cclxuIl19