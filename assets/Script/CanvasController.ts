
import baseTs from "./base/baseTs";
import jsonSingleton from "./base/jsonSingleton";
import NameTs from "./common/NameTs";
import { setLanguage } from "./Language/LanguageData";
import PageManage from "./PageManage";
import soundController from "./soundController";
import { Tools } from "./util/Tools";
import util from "./util/util";


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

    @property({ type: cc.Node, displayName: "网络失败" })
    private noLine: cc.Node = null;

    @property({ type: cc.JsonAsset, displayName: "关卡数据" })
    private mapdata: cc.JsonAsset = null;


    private jinqule: boolean = false;

    onLoad() {

        // cc.macro.CLEANUP_IMAGE_CACHE = false;
        // cc.dynamicAtlasManager.enabled = true;
        // cc.dynamicAtlasManager.showDebug(true);

        Tools.updateResolution();

        // 设置语言
        let languageType = Tools.getStorage("LanguageType");
        let index = languageType == undefined || languageType == null ? 1 : languageType;
        setLanguage(Number(index));


        // 关掉load页面
        cc.game.on(NameTs.Close_LoadPage, res => {
            this.loadPage.active = false;
        }, this);

        // XMSDK.initialize();
        util.inidata()
        this.loadingJson();
        jsonSingleton.singleton.jsonData[NameTs.gkData] = this.mapdata.json;
        this.getAllLocalStorage();

        util.userData.offlineIncome = {
            reward: 0,
            multipleReward: 0
        }

        let dds = []
        dds.forEach(element => {
            util.userData.prop[element.propId - 1].num = element.propNum;
        });
        // util.userData.prop = res;

        //进度数据
        let propdata = [{ "type": "1", "name": "冰冻", "explain": "冰冻怪物\n10s", "time": "10", "level": "1" }, { "type": "2", "name": "电击", "explain": "怪物接受额外伤害+20", "time": "3", "level": "1" }, { "type": "3", "name": "护罩", "explain": "保护水晶塔\n30s", "time": "30", "level": "25" }, { "type": "4", "name": "清屏", "explain": "消灭所有怪兽", "time": "0", "level": "45" }, { "type": "5", "name": "自动合成", "explain": "炮塔自动合成\n30s", "time": "30", "level": "5" }, { "type": "6", "name": "增能", "explain": "炮塔攻击力X2\n20s", "time": "20", "level": "1" }];

        let ab_test = [{ "lock_turret_test": { "A": "true", "B": "true" } }, { "heaven_coin_test": { "A": "true", "B": "true" } }, { "new_hand_test": { "A": "true", "B": "true" } }]

        if (propdata) {
            util.propConfig = propdata;
            //console.log("道具详细说明",util.propConfig);
        }

        util.online_time = 10 * 60;
        if (ab_test) {
            let test = ab_test;
            for (let i = 0; i < test.length; i++) {
                let key: string = Object.keys(test[i])[0];
                util.AB_Test[key] = test[i][key];
            }
        }


        //初始化一些数据
        util.userData.airborneCount = 15;

        if (util.userData.noviceGuide == 1 && util.userData.newUser == true) {
            util.userData.product = 40;
        }

        if (util.userData.turretLevel > 1) {
            util.userData.noviceGuide = -1;
            util.setStorage(util.localDiary.noviceGuide, -1);
        }

        util.behaviorRewardVoList = [{ "type": 1, "reward": 50 }, { "type": 2, "reward": 4 }, { "type": 4, "reward": 75 }, { "type": 5, "reward": 50 }];

        util.mapConfig = util.getMapdata(util.userData.customs.big);

        util.propConfig = null
        this.jinqule = true;
    }



    start() {
        // this.scheduleOnce(() => {
        //     if (!this.jinqule && this.noLine) {
        //         this.noLine.active = true;
        //     }
        // }, 30);
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
     * 拉去用户数据
     * @param call 回调
     */
    initUser(call: Function) {

    }

    initUserData(call: Function) {

    }


    /**
     * 重新加载场景
     */
    AgainScene() {
        cc.director.loadScene("game");
    }

}
