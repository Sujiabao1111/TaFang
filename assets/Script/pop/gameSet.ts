import baseTs from "../base/baseTs";
import { AppInfo } from "../server/xmsdk_cocos/Config/AppInfo";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameSet extends baseTs {

    @property({type:cc.Sprite,displayName:"背景音效"})
    private BGMSprite:cc.Sprite = null;

    @property({type:cc.Sprite,displayName:"普通音效"})
    private soundSprite:cc.Sprite = null;

    @property({type:[cc.SpriteFrame],displayName:"开关"})
    private switchSpriteFrame:cc.SpriteFrame[] = [];

    @property(cc.Label)
    private lable_version:cc.Label = null;

    //初始化
    init(){
        this.BGMSprite.spriteFrame = this.switchSpriteFrame[util.soundSet.bgm];
        this.soundSprite.spriteFrame = this.switchSpriteFrame[util.soundSet.sound];
    }

    onEnable(){
        this.BGMSprite.spriteFrame = this.switchSpriteFrame[util.soundSet.bgm];
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg:"设置弹窗"
        })
        this.lable_version.string = `当前游戏版本${AppInfo.version}`;
    }

    start () {
        //console.log("tt当前版本号", AppInfo.version);
    }

    /**
     * 点击音效开关
     * @param event 点击的反馈
     * @param res 传参
     */
    clickSound(event,res){

        if(res==0){
            util.soundSet.bgm = util.soundSet.bgm==1?0:1;
            if(util.soundSet.bgm){
                soundController.singleton.playBGM();
            }else{
                soundController.singleton.stopBGM();
            }
            this.BGMSprite.spriteFrame = this.switchSpriteFrame[util.soundSet.bgm];

            TrackMgr.AppDialogClick_hcdg({                
                dialog_name_hcdg: `设置弹窗`,
                ck_module: "音乐"
            })
        }else{
            util.soundSet.sound = util.soundSet.sound==1?0:1;
            this.soundSprite.spriteFrame = this.switchSpriteFrame[util.soundSet.sound];

            TrackMgr.AppDialogClick_hcdg({                
                dialog_name_hcdg: `设置弹窗`,
                ck_module: "音效"
            })
        }

    }

    clickUserh5() {        
        soundController.singleton.clickAudio();    
        XMSDK.launchSceneSdkPage({
            "type": "webview",
            "param": {
                "title":'用户协议',
                "isFullScreen": false,
                "htmlUrl": `http://ilovevideo.cn/callshow-front/agreements/term-service-fkdgs.html`,
                "showTitle": true
            }
        })
        
        TrackMgr.AppViewScreen({
            app_page_title: "用户协议"
        })

        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: `设置弹窗`,
            ck_module: "用户协议"
        })
    }

    clickPrivacyh5() {        
        soundController.singleton.clickAudio();    
        XMSDK.launchSceneSdkPage({
            "type": "webview",
            "param": {
                "title":'隐私政策',
                "isFullScreen": false,
                "htmlUrl": `http://ilovevideo.cn/callshow-front/agreements/privacy-policy-fkdgs.html`,
                "showTitle": true
            }
        })
        
        TrackMgr.AppViewScreen({
            app_page_title: "隐私政策"
        })

        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: `设置弹窗`,
            ck_module: "隐私政策"
        })
    }

    clickFanKui() {
        soundController.singleton.clickAudio();
        XMSDK.showCustomerService();     
        
        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: `设置弹窗`,
            ck_module: "反馈建议"
        })
    }

    clickRemoveMy() {
        soundController.singleton.clickAudio();
        XMSDK.cancelAccount();     
        
        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: `设置弹窗`,
            ck_module: "注销账户"
        })
    }

    /**关闭页面 */
    closeBtn(){
        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: `设置弹窗`,
            ck_module: "关闭"
        })

        soundController.singleton.clickAudio();
        this.closePage();
    }

    // update (dt) {}
}
