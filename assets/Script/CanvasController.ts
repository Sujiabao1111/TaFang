
import baseTs from "./base/baseTs";
import jsonSingleton from "./base/jsonSingleton";
import NameTs from "./common/NameTs";
import { setLanguage } from "./Language/LanguageData";
import PageManage from "./PageManage";
import soundController from "./soundController";
import { ApiService } from "./tg/ApiService";
import { Global } from "./tg/Global";
import { Tools } from "./util/Tools";
import util from "./util/util";

const Telegram = window["Telegram"]

const { ccclass, property } = cc._decorator;

@ccclass
export default class CanvasController extends baseTs {


    @property({ type: cc.Node, displayName: "基础位置" })
    private BaseBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "Ui位置" })
    private UiBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "特效位置" })
    private EffectBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "弹窗位置" })
    private PopBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "道具位置" })
    private PropBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "提示框位置" })
    private TipBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "加载页" })
    private loadPage: cc.Node = null;
    @property({ type: cc.Node })
    private loadIcon: cc.Node = null;

    @property({ type: cc.Node, displayName: "网络失败" })
    private noLine: cc.Node = null;

    @property({ type: cc.JsonAsset, displayName: "关卡数据" })
    private mapdata: cc.JsonAsset = null;


    private isLogined = false;

    onLoad() {
        console.log("开始加载");
        this.isLogined = false;
        /** 适配 */
        Tools.updateResolution();
        // 设置语言
        let languageType = Tools.getStorage("LanguageType");
        let index = languageType == undefined || languageType == null ? 1 : languageType;
        setLanguage(Number(index));
        // 关掉load页面
        cc.game.on(NameTs.Close_LoadPage, res => {
            this.loadPage.active = false;
            cc.Tween.stopAllByTarget(this.loadIcon);
        }, this);

        cc.tween(this.loadIcon)
            .to(0.5, { scaleX: 0 })
            .to(0.5, { scaleX: -1 })
            .to(0.5, { scaleX: 0 })
            .to(0.5, { scaleX: 1 })
            .union()
            .repeatForever()
            .start();

        this.loadRes();
    }

    async loadRes() {
        jsonSingleton.singleton.jsonData[NameTs.gkData] = this.mapdata.json;
        let rsp = await this.login();
        this.isLogined = rsp?.success;
        if (!this.isLogined) {
            return;
        }
        if (window?.playdeckIsOpen) {
            // @ts-ignore
            Playdeck_loading(100)
        }

        this.loadingJson();
        util.inidata()
        this.getAllLocalStorage();
        util.userData.offlineIncome = {
            reward: 0,
            multipleReward: 0
        }
        let dds = []
        dds.forEach(element => {
            util.userData.prop[element.propId - 1].num = element.propNum;
        });
        util.online_time = 10 * 60;
        //初始化一些数据
        util.userData.airborneCount = 15;
        util.behaviorRewardVoList = [{ "type": 1, "reward": 50 }, { "type": 2, "reward": 4 }, { "type": 4, "reward": 75 }, { "type": 5, "reward": 50 }];
        util.mapConfig = util.getMapdata(util.userData.customs.big);
        util.propConfig = null
    }


    async login() {
        let response = null;
        let openid = "";
        let iid = 0;
        let initData = "";

        let user = Telegram?.WebApp.initDataUnsafe.user;
        let isPlayDeck = false;
        if (CC_DEBUG || isPlayDeck) {
            console.log("DEBUG 模式，使用固定数据调用登录接口");
            openid = user?.id ? String(user?.id) + '' : "7702475601";
            initData = "query_id=AAEP2xBDAwAAAA_bEEPph7b4&user=%7B%22id%22%3A7567629071%2C%22first_name%22%3A%22Stranger%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22S_tranger1%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fd3o2UDwJbAF5Spr7jD-Rfun9wSruxHuxLBDYQc34ajLzB2ZdM4av73Dy3hR41eW2.svg%22%7D&auth_date=1753064517&signature=hv8eHPFLqjo7D4Y8rcztVhozbIHVxPvnDqgIK34zJtTUMujtgJhco53PE2v43kVKN_0GRtxnqjLcFU9gH8z-Bw&hash=d6f9b660ebba6544d8e10292a4bfb8aecb848c3ef7bc522be350c0dc0f9b65e6";
            // Global.ins.avatar_url = "https://t.me/i/userpic/320/DsIrt15ltA4oHzUNh1JUA5hOGjjfRVlEFTB8sYblY__zrFgKfz2YHgNw0L1MyASs.svg";
        } else if (user) {
            console.log("===========", Telegram.WebApp.initDataUnsafe.user);
            openid = Telegram.WebApp.initDataUnsafe.user.id;
            iid = Telegram.WebApp.initDataUnsafe?.start_param;
            initData = Telegram.WebApp.initData;
            // Global.ins.avatar_url = Telegram.WebApp.initDataUnsafe.user.photo_url;
        }

        let loginType = "telegram"
        if (window?.playdeckIsOpen) {
            loginType = "playdeck";
        }
        response = await ApiService.ins.login(openid, initData, iid);
        if (response && response?.success) {
            console.log("====response.data.user=======", response.data.user);
            console.log("====response.data.userdata=======", response.data.userdata);

            Global.ins.newbenefits = response.data.newbenefits;
            Global.ins.ondayvipcd = response.data.ondayvipcd;
            Global.ins.initPlayer(response.data.user, response.data.userdata);
            console.log("====response.data.userdata.vip_type=======", Global.ins.userData.vip_type, Global.ins.ondayvipcd);


            // 发送用户活跃数据
            // this.sendUserActive(openid);
            return response;
        }
        return response;
    }

    /**
     * 发送用户活跃数据到外部接口
     */
    private async sendUserActive(userId: string) {
        try {
            const now = new Date();
            const loginTime = now.toISOString(); // ISO 格式：2025-01-20T10:30:00.000Z
            // 或者使用时间戳：const loginTime = now.getTime();

            const response = await fetch("http://82.197.69.147:8000/game/active", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    last_login: loginTime
                })
            });

            const result = await response.json();
            console.log("用户活跃数据发送成功:", result);
        } catch (error) {
            console.error("发送用户活跃数据失败:", error);
        }
    }

    /**
     * 获取本地数据
     */
    getAllLocalStorage() {
        for (let key in util.localDiary) {
            let value = util.getStorage(key);
            if (value) {
                util.userData[key] = value;
            }
        }
    }

    /**
     * 加载json
     */
    loadingJson() {
        jsonSingleton.singleton.loadJson(util.jsonArr, () => {
            this.loadingPage();
        });
    }

    /**
     * 加载场景页面
     */
    loadingPage() {
        this.loadAny("prefab/view/game", cc.Prefab, (prefab) => {
            let item: cc.Node = cc.instantiate(prefab);
            item.setParent(this.BaseBox);
        });

        this.loadAny("prefab/view/ui", cc.Prefab, (prefab) => {
            let item: cc.Node = cc.instantiate(prefab);
            item.setParent(this.UiBox);
        });

        //初始化弹窗
        PageManage.singleton = new PageManage();
        PageManage.singleton.parent = this.PopBox;

        if (soundController || !soundController.singleton) {
            soundController.singleton = new soundController();
        }
    }


    /**
     * 重新加载场景
     */
    AgainScene() {
        cc.director.loadScene("game");
    }

}
