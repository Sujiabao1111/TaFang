import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turretLevel extends baseTs {

    @property({displayName:"等级",type:cc.Label})
    levelLabel: cc.Label = null;
    
    @property({displayName:"renminb",type:cc.Label})
    rbmLabel: cc.Label = null;
    
    @property({displayName:"光",type:cc.Node})
    lightNode: cc.Node = null;
    
    // @property({type:sp.Skeleton,displayName:"炮"})
    // paoBody: sp.Skeleton = null;

    @property({type:cc.ProgressBar,displayName:"进度"})
    rmbProgress: cc.ProgressBar = null;


    private level:number = null;

    private turretData:any;

    private data = [
        // {
        //     amount:0.1,
        //     level:10,
        // },
        // {
        //     amount:0.3,
        //     level:20,
        // },
    ];

    //当前进行
    private nowNo:number = 0;
    onLoad () {

       

        cc.tween(this.rbmLabel.node.getParent()).repeatForever(
            cc.tween().to(.3,{angle:10}).to(.2,{angle:0})
        ).start();

        cc.tween(this.lightNode).by(1,{angle:-360}).repeatForever().start();
    }

    update(){
        
    }

    /**
     * 更新炮塔
     */
    setLevel(){
        //炮塔属性
        if(this.data.length==0){
            this.node.active = false;
            return
        }
        this.turretData = util.GetTurretData(this.data[this.nowNo].level);
        //this.rbmLabel.string = this.data[this.nowNo].amount+"元";
        this.levelLabel.string = "Lv"+this.data[this.nowNo].level;
        this.rmbProgress.progress  = util.userData.turretLevel/this.data[this.nowNo].level;
        
        // this.loadSpine(this.paoBody,"pao");

        this.setState();
    }
    /**
     * 设置状态
     */
    setState(){
        
        console.log(this.rmbProgress.progress>=1,'this.rmbProgress.progress>=1')
        this.lightNode.active = this.rmbProgress.progress>=1;

        this.lightNode.stopAllActions();
        
        if(this.lightNode.active){
            cc.tween(this.lightNode).by(1,{angle:-360}).repeatForever().start();
        }
    }

    /**
     * 加载图片
     */
    loadSpine(spine:sp.Skeleton,name:string){

        cc.resources.load("spine/turret/"+this.turretData.DynamicResources+"/"+name+"/"+this.turretData.spineName,sp.SkeletonData, (error, sp:sp.SkeletonData) => {
            spine.skeletonData = sp;
        });

    }
}
