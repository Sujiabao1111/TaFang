import { AdPosition } from "../common/AdPosition";
import { bulletInfo, gameState, thingType, turretInfo } from "../common/faceTs";
import NameTs from "../common/NameTs";
import TrackMgr from "../TrackMgr/TrackMgr";
import tool from "../util/tool";
import util from "../util/util";
import turret from "./turret/turret";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turretFactiory extends cc.Component {

 

    initData;//初始化数据

    turretData:turretInfo; //炮台的数据

    private initPos:cc.Vec2;//出生在哪里

    //攻击目标
    attackData:any;

    //子弹属性

    bullet:bulletInfo;

    //是否在拿着
    isTouch:boolean;

    //炮头
    pao:cc.Node;

    //存储当前相同等级的炮塔
    sameLevelTurret:any[];

    //touchid
    touchId:number;

    start () {

    }

    onLoad(){
        //获取存放地址
        if(this.initData.no){
            this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
            this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this);


            //拿起
            cc.game.on(NameTs.Game_Turret_PickUp,(res)=>{
                if(res.level !== this.initData.level){
                    this.node.opacity = 150;
                }
            },this);

            //放下
            cc.game.on(NameTs.Game_Turret_PutDown,(res)=>{
                if(res.level !== this.initData.level){
                    this.node.opacity = 255;
                }

            },this);

        }
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this);
        
        // this.touchArr = new Map();

        //监听该目标怪兽死亡后重设子弹目标
        cc.game.on(NameTs.Game_Monster_Killed,(data)=>{
            //如果没有目标就退出
            if(this.bullet.targetId==null){
                this.attackData = null;
                return;
            }

            if(data.id==this.bullet.targetId){
                this.bullet.targetId = null;
                this.attackData = null;
                this.stopAttack();
            }

        },this);

        

        //监听游戏暂停
        cc.game.on(NameTs.Game_Stop,()=>{
            
            this.stopAttack();

        },this);

        //监听游戏继续
        cc.game.on(NameTs.Game_Resume,()=>{
            
            this.resumeAttack();

        },this);
        
    }

    /**
     * 触碰开始
     * @param event 
     */
    private touchStart(event){
        this.touchId = event.getID();
        if(util.touchId&&util.touchId !== this.touchId){return}
        util.touchId = this.touchId;
        this.PickUp();
        this.isTouch = true;
        this.node.zIndex = 99;
        this.bullet.targetId = null;
        this.attackData = null;
        this.stopAttack();
        this.pao.angle = 0;
        this.initPos = this.node.getPosition();
    }

    /**
     * 触碰移动
     * @param event 
     */
    private touchMove(event){
        if(util.touchId !== this.touchId){return}
        let movePos:cc.Vec2 = event.getDelta();
        this.node.x +=movePos.x;
        this.node.y +=movePos.y; 
    }

    /**
     * 触碰结束
     * @param event 
     */
    private touchEnd(event){
        if(util.touchId !== this.touchId){return}
        this.isTouch = false;
        this.PutDown();
        util.touchId = null;
        this.carshPlace(()=>{
            this.node.setPosition(this.initPos);
            this.node.zIndex = 0;
            // cc.tween(this.node).to(.2,{x:this.initPos.x,y:this.initPos.y}).call(()=>{
                
            // }).start();
        })
    }

    /**
     * 检查里面在哪个里面
     * @param call 回调
     */

    carshPlace(call:Function){

        let pos:cc.Vec2 = this.node.getPosition();

        util.checkTouchPool(pos,(num)=>{
            if(num&&num!==this.initData.no){
                if(num==100){
                    if(util.userData.noviceGuide==2){
                        call();
                    }else{
                        this.recycleFn();
                    }
                }else{
                    if(util.userData.noviceGuide==2&&num>2){
                        call();
                    }else{
                        this.GetType(num,call);
                    }
                }
            }else{
                call();
            }

        });

    }

    /**
     * 判断是交换还是升级
     * @param no 第几个
     * @param call 回调
     */
    GetType(no:number,call:Function=()=>{}){
        if(!this.initData.no||!no){
            call();
            return;
        }
        //获取炮台位置的位置
        let otherData = util.GetPoolData(no);
        let otherPlaceData = util.GetPlaceData(no);
        let otherPos:cc.Vec2 = cc.Vec2.clone(otherPlaceData.pos);
        if(otherData.level==-1){
            console.log("找个空位坐下");
            if(!util.checkNoExist(no)){
                call();
                console.log("未解锁");
                return;
            }
            util.savePool(this.initData.no);
            this.node.setPosition(otherPos);
            util.savePool(no,this.initData.level);
            //删除以前的
            cc.game.emit(NameTs.Game_Turret_Killed,{no:this.initData.no});
            this.createLevelBg(no,this.initData.level);
            util.GlobalMap.delete("turret_"+this.initData.no);
            this.initData.no = no;
            //更新现在的
            util.GlobalMap.set("turret_"+no,this.node);
            this.node.zIndex = 0;
        }else{
            
            let otherNode:cc.Node = util.GlobalMap.get("turret_"+no);
            //升级
            if(otherData.level==this.initData.level){

                if(!util.checkUpdateLevel(this.initData.level+1)){
                    console.error("等级超过最大等级了!");
                    call();
                    return 
                }
                //合成奖励
                let coin:number = util.GetBehaviorRewardVo(5);

                if(util.userData.noviceGuide == 2||(util.userData.noviceGuide == 3&&util.checkTestB(NameTs.new_hand_test))){
                   let CoinParent:cc.Node = cc.director.getScene().getChildByName('Canvas');
                   cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:coin,num:5,parent:CoinParent});
                }else{
                    cc.game.emit(NameTs.Game_Effect_coin,{node:this.node,value:coin,num:5});
                }
                util.addTermCoin(coin);
                
                util.userData.compoundTimes+=1;
                util.userData.localCompoundTime+=1;
                cc.game.emit(NameTs.Game_Task_updata);
                util.userData.synthesis_times+=1;
                util.userData.synthesis_All+=1;
                util.savePool(this.initData.no,null);
                let pos:cc.Vec2 = cc.Vec2.clone(otherPos);
                this.node.setPosition(pos);
                otherNode.zIndex = this.node.zIndex = 99;
                cc.game.emit(NameTs.Game_Turret_Killed,{no});
                cc.game.emit(NameTs.Game_Turret_Killed,{no:this.initData.no});
                cc.tween(otherNode).by(.1,{x:50}).by(.1,{x:-50}).call(()=>{
                    otherNode.zIndex = 0;
                    cc.game.emit(NameTs.Game_Turret_Killed,{node:otherNode,no:null});
                }).start();
                //删除以前的
                util.GlobalMap.delete("turret_"+this.initData.no);
                //更新现在的
                util.GlobalMap.set("turret_"+no,this.node);
                this.upLevel(no);
                cc.tween(this.node).by(.1,{x:-50}).by(.1,{x:50}).call(()=>{
                    this.node.zIndex = 0;
                }).start();

                //预加载解锁炮塔信息流
                // if(!util.adPreObj[AdPosition.UnlcokTurretView]&&util.chekPoolHaveTwo()){
                //     util.preloadAd(AdPosition.UnlcokTurretView,true);
                // }

            }else{ //交换
                let selfNo:number = this.initData.no;
                let selfPlaceData = util.GetPlaceData(selfNo);
                let selfPos:cc.Vec2 = cc.Vec2.clone(selfPlaceData.pos);
                //交换位置
                otherNode.setPosition(selfPos.x,selfPos.y);
                this.node.setPosition(otherPos.x,otherPos.y);
                //保存数据
                util.savePool(selfNo,otherData.level);
                util.savePool(no,this.initData.level);
                
                //修改位置no
                otherNode.getComponent("turret").initData.no = selfNo;
                this.initData.no = no;
                //删除以前的
                util.GlobalMap.set("turret_"+selfNo,otherNode);
                //更新现在的
                util.GlobalMap.set("turret_"+no,this.node);
                this.node.zIndex = otherNode.zIndex = 0;
                
                //删除以前的
                cc.game.emit(NameTs.Game_Turret_Killed,{no:this.initData.no});
                this.createLevelBg(no,otherData.level);
                cc.game.emit(NameTs.Game_Turret_Killed,{no:selfNo});
                otherNode.getComponent("turret").createLevelBg(selfNo,this.initData.level);
            }


        }
    }

    /**设置名字 */
    setName() {}

    /**设置数据 */
    setData(data){
        this.init(data);
    }
    init(data){};

    /**
     * 升级
     */
    upLevel(no){}

    /**监听是否有怪 */
    update(dt){
        if(util.levelState !== gameState.start)return
        //如果有就退出
        if(this.isTouch)return;
        let pos:cc.Vec2 = this.node.getPosition();
        if(this.attackData){
            this.setPao();
            if(this.attackData&&this.attackData.isClose){
                if(util.checkMonsterClose({pos,id:this.attackData.id,distanceNum:this.initData.no?250:375}))return;
            }else{
                let newData = util.getCloseMonster(pos,this.initData.no?250:375);
                if(this.attackData&&newData.id == this.attackData.id){
                    return;
                }else{
                    // this.attackFn();
                }
            }
        }
        this.attackData = util.getCloseMonster(pos,this.initData.no?250:375);

        if(!this.attackData)return;
        this.bullet.targetId = this.attackData.id;
        this.attackFn();

    }

    /**设置目标 */
    setTarget(){

        

    }
    
    /**
     * 攻击
     */
    attackFn(){}

    /**
     * 回收
     */
    recycleFn(){

        util.savePool(this.initData.no,null);
        util.GlobalMap.delete("turret_"+this.initData.no);
        cc.game.emit(NameTs.Game_Turret_Killed,{node:this.node,no:this.initData.no});
        TrackMgr.AppClick({
            app_page_title: "首页",
            app_ck_module: "回收炮塔",
            app_exposure_type: "banner",
        });
    }

    /**
     * 拿起
     */

    PickUp(){

        //相同等级的炮台数据
        // this.sameLevelTurret = util.getPoolSameLevelTurret(this.initData.level)
        this.sameLevelTurret = util.getPoolSameLevelTurret(this.initData.level)
        if(this.sameLevelTurret){
            for(let i = 0;i<this.sameLevelTurret.length;i++){
                cc.game.emit(NameTs.Game_Same_Place_PickUp,{id:this.sameLevelTurret[i].no});
            }
        }

        cc.game.emit(NameTs.Game_Turret_PickUp,{id:this.initData.no,level:this.initData.level,host:this.initData.no});


    }

    /**
     * 放下
     */

    PutDown(){

        // this.sameLevelTurret.forEach((item:any)=>{


        // });

        if(this.sameLevelTurret){
            for(let i = 0;i<this.sameLevelTurret.length;i++){
                cc.game.emit(NameTs.Game_Same_Place_PutDown,{id:this.sameLevelTurret[i].no});
            }
        }
        
        cc.game.emit(NameTs.Game_Turret_PutDown,{id:this.initData.no,level:this.initData.level});

        this.sameLevelTurret = null;

    }
    /**两点角度 */
    GetAngle():number{

        let monsetrName = util.userData.customs.big+"-"+util.userData.customs.small+"_Monster_"+this.bullet.targetId;
        let targetNode:cc.Node= util.MonsterMap.get(monsetrName);

        if(!targetNode){
            this.bullet.targetId = null;
            this.attackData = null;
            return 0;
        }


        let targetPos:cc.Vec2 = cc.Vec2.clone(targetNode.getPosition());

        targetPos = targetNode.parent.convertToWorldSpaceAR(targetPos);
        targetPos = this.node.parent.convertToNodeSpaceAR(targetPos);

        let angle:number = tool.GetPosAngle(this.bullet.initPos,targetPos);

        
       
        return angle;
    }

    /**设置炮塔角度 */
    setPao(){};

    /**停止攻击 */
    stopAttack(){}
    /**恢复攻击 */
    resumeAttack(){}

    /**
     * 加载图片
     */
    loadSpine(spine:sp.Skeleton,name:string){
        let mouthName:string = this.turretData.mouthName;
        cc.resources.load("spine/turret/"+this.turretData.DynamicResources+"/"+name+"/"+(name=="mouth"?mouthName:this.turretData.spineName),sp.SkeletonData, (error, sp:sp.SkeletonData) => {
            spine.skeletonData = sp;
            spine.setAnimation(0,"animation",false);
        });
    }

    /**
     * 创建等级背景板
     */
    createLevelBg(no:number,level:number){
        cc.game.emit(NameTs.Game_LevelBg_Creator,{node:this.node,no});
        cc.game.emit(NameTs.Game_LevelLabel_Creator,{node:this.node,no,level:this.initData.level});

    }
}
