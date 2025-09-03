import btn from "../prefab/tool/script/btn";
import { AssistCtr } from "./Assist/AssistCtr";
import baseTs from "./base/baseTs";
import jsonSingleton from "./base/jsonSingleton";
import { AdPosition } from "./common/AdPosition";
import { propState } from "./common/faceTs";
import NameTs from "./common/NameTs";
import ModelTip from "./model/ModelTip";
import PageManage from "./PageManage";
import { UrlConst } from "./server/UrlConst";
import AdController from "./server/xmsdk_cocos/AD/AdController";
import { AppInfo } from "./server/xmsdk_cocos/Config/AppInfo";
import XMSDK from "./server/xmsdk_cocos/XMSDK";
import soundController from "./soundController";
import tool from "./util/tool";
import util from "./util/util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CanvasController extends baseTs {


    @property({ type: cc.Node, displayName: "基础位置" })
    BaseBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "Ui位置" })
    UiBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "特效位置" })
    EffectBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "弹窗位置" })
    PopBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "toast弹窗" })
    modelTip: cc.Node = null;
    
    @property({ type: cc.Node, displayName: "道具位置" })
    PropBox: cc.Node = null;
    
    @property({ type: cc.Node, displayName: "加载页" })
    loadPage: cc.Node = null;
    
    @property({ type: cc.Node, displayName: "网络失败" })
    noLine: cc.Node = null;

	 @property({ type: cc.JsonAsset, displayName: "关卡数据" })
	 mapdata: cc.JsonAsset = null;
	

    private jinqule:boolean = false;
//更-多-源-码-联-系-Q:30-387-459-55
    onLoad() {

        // cc.macro.CLEANUP_IMAGE_CACHE = false;
        // cc.dynamicAtlasManager.enabled = true;
        // cc.dynamicAtlasManager.showDebug(true);

        cc.director.on(NameTs.Show_Toast, res => {
            if (this.modelTip) {
                let modelTipTs: ModelTip = this.modelTip.getComponent(ModelTip);
                modelTipTs.showMessage(res);
            }
        },this);

        cc.game.on(NameTs.Close_LoadPage,res=>{
            this.loadPage.active = false;
        },this);

        XMSDK.initialize();
		util.inidata()
		this.loadingJson();
		jsonSingleton.singleton.jsonData[NameTs.gkData] = this.mapdata.json;
        this.getAllLocalStorage();        
		
		
		
		
		 util.userData.offlineIncome ={
                        reward:0,
                        multipleReward:0
                    } 
		
		
		
	
					let dds = []
                    dds.forEach(element => {
                        util.userData.prop[element.propId - 1].num = element.propNum;
                    });
                    // util.userData.prop = res;
                    console.log(dds, '用户背包');
            
		
		//进度数据
					let propdata = [{"type":"1","name":"冰冻","explain":"冰冻怪物\n10s","time":"10","level":"1"},{"type":"2","name":"电击","explain":"怪物接受额外伤害+20","time":"3","level":"1"},{"type":"3","name":"护罩","explain":"保护水晶塔\n30s","time":"30","level":"25"},{"type":"4","name":"清屏","explain":"消灭所有怪兽","time":"0","level":"45"},{"type":"5","name":"自动合成","explain":"炮塔自动合成\n30s","time":"30","level":"5"},{"type":"6","name":"增能","explain":"炮塔攻击力X2\n20s","time":"20","level":"1"}];
				
				let  ab_test=[{"lock_turret_test":{"A":"true","B":"true"}},{"heaven_coin_test":{"A":"true","B":"true"}},{"new_hand_test":{"A":"true","B":"true"}}]
				
				
				
                if(propdata){
                    util.propConfig = propdata;
                    //console.log("道具详细说明",util.propConfig);
                }

               util.online_time = 10 * 60; 
                if(ab_test){
                    let test = ab_test;
                    for(let i = 0;i<test.length;i++){
                        let key:string = Object.keys(test[i])[0];
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
					util.behaviorRewardVoList =[{"type":1,"reward":50},{"type":2,"reward":4},{"type":4,"reward":75},{"type":5,"reward":50}];
					

                    util.mapConfig = util.getMapdata(util.userData.customs.big);

                 		
					util.propConfig=null
					this.jinqule = true;
                    util.iphoneXTop = XMSDK.getLiuHaiHeight();
		
		

       
		
		
		
	
        
        
      

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

    start() {
        XMSDK.finishCocosLaunch();
        this.scheduleOnce(()=>{
            if(!this.jinqule&&this.noLine){
                this.noLine.active = true;
            }
        },30);
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

        // this.loadAny("prefab/view/propContent", cc.Prefab, (prefab) => {
        //     let item: cc.Node = cc.instantiate(prefab);

        //     item.setParent(this.PropBox);

        // });

        //初始化弹窗
        PageManage.singleton = new PageManage();
        PageManage.singleton.parent = this.PopBox;


        

        if(soundController || !soundController.singleton){            
            soundController.singleton = new soundController();
        }

        if (!cc.sys.isNative) { 
            soundController.isPlayMusic = true;
            soundController.singleton.playBGM();
        }
    }


    /**
     * 拉去用户数据
     * @param call 回调
     */
    initUser(call: Function) {
        XMSDK.post({
            url: UrlConst.gameInfoIndex,
            onSuccess: res => {
                let data = res.data;
                let goldPoint = data.goldPoint;
                
                this.initUserData(call);
            },
            onFail: err => {
                
            }
        });
    }

    initUserData(call: Function) {
        XMSDK.getdataStr({
            url: UrlConst.gameLevelIndex,
            onSuccess: res => {
                console.log("请求成功gameLevelIndex", res)
                if (res.code === 0 && res.data) {
                    let data = res.data;
                    let userGameMapSnapShotVO = data.userGameMapSnapShotVO;

                    if (data.leftTime !== 0) {
                        util.doubleEarn.use = propState.start;
                        util.doubleEarn.time = Number(data.leftTime);
                    }

                    //util.userData.customs.big = data.level + 1;

                    util.userData.newUser = userGameMapSnapShotVO.newUser;
                    util.userData.turretLevel = userGameMapSnapShotVO.userBatteryDTO.highestLevel;

                    if (userGameMapSnapShotVO.userMapDetail == null) {
                        util.initPool();
                    } else {
                        util.userData.pool = userGameMapSnapShotVO.userMapDetail;
                        util.repairPool();
                    }

                   /* util.userData.product = userGameMapSnapShotVO.userBatteryDTO.num;

                    if (util.userData.noviceGuide == 1 && util.userData.newUser == true) {
                        util.userData.product = 40;
                    }*/

                    if (util.userData.turretLevel > 1) {
                        util.userData.noviceGuide = -1;
                        util.setStorage(util.localDiary.noviceGuide, -1);
                    }

                    util.behaviorRewardVoList = data.behaviorRewardVoList;
                    util.mapConfig = data.mapConfig;

                    
                    // util.userData.customs.small = util.mapConfig.length-1;

                    // util.gameLevelPassRewardVoList.push({
                    //     rewardType: 2,
                    //     rewardValue: tool.GetArrData("type", 4, data.behaviorRewardVoList).reward
                    // });
                    // util.gameLevelPassRewardVoList = tool.GetArrData("type", 4, data.behaviorRewardVoList).reward;

                    util.userData.version = userGameMapSnapShotVO.version;

                    console.log(util.userData, ' userData');
                    call && call();
                }
                else {

                }
            },
            onFail: err => {

            }
        });

        
        

        
    }
    /**
     * 重新加载场景
     */
    AgainScene(){

        cc.director.loadScene("game");

    }

    // update (dt) {}
}
