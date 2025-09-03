import baseTs from "../base/baseTs";
import { gameState, updateType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pool from "../common/pool";
import soundController from "../soundController";
import tool from "../util/tool";
import util from "../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class effect extends baseTs {

    private coinPool:pool; //金币池塘
    
    private numPool:pool; //数字池塘

    private turretPool:pool; //炮塔池塘


    private coinParentPos:cc.Vec2;//飞去哪里

    private turretParentPos:cc.Vec2;//飞去哪里
    
    private coinParentPos2:cc.Vec2;//飞去哪里

    onLoad(){

        this.loadAny("prefab/effect/coin",cc.Prefab,(res)=>{

            this.coinPool = new pool(res);

        });

        this.loadAny("prefab/effect/num",cc.Prefab,(res)=>{

            this.numPool = new pool(res);

        });

        this.loadAny("prefab/effect/turret",cc.Prefab,(res)=>{

            this.turretPool = new pool(res);

        });

        cc.game.on(NameTs.Game_Effect_coin,(res)=>{
            if(!res.noMusic){
                soundController.singleton.playMusic(NameTs.music_goldAdd);
            }
            this.creatorCoin(res);
            
        },this);

        cc.game.on(NameTs.Game_Effect_turret,(res)=>{

            this.creatorTurret(res);

        },this);

        cc.game.on(NameTs.Game_SavingPost_AddCoin,()=>{
            if(!util.savingPotLock)return;
            this.creatorCoin2();

        },this);
        
    }

    start () {

    }

    /**
     * 金币特效
     * @param node 节点
     * @param num 多少个
     * @param value 需要增加多少值
     */
    creatorCoin(data:{node:cc.Node,num:number,value:number,parent?:cc.Node}){
        if(!this.coinParentPos){
            let coinNode:cc.Node = util.GlobalMap.get("coin");
            this.coinParentPos = coinNode.parent.convertToWorldSpaceAR(coinNode.getPosition());
            this.coinParentPos = this.node.convertToNodeSpaceAR(this.coinParentPos);
        }                 
        if(data && (!data.node || !data.node.parent)){
            data.node = cc.director.getScene().getChildByName('Canvas');
        }
        let pos:cc.Vec2 = data.node.parent.convertToWorldSpaceAR(data.node.getPosition());
        pos = this.node.convertToNodeSpaceAR(pos);

        let len:number =  data.num||1;
        // let centerPos:cc.Vec2 = cc.Vec2.clone(pos.add(this.coinParentPos).div(2));
        let delayTime:number = .05+(.3/len);
        let actionTime:number = .5+(.2/len);
        for(let i = 0;i<len;i++){
            let item:cc.Node = this.coinPool.createEnemy(data.parent||this.node);
            item.setPosition(pos);
            // let pos1:cc.Vec2 = cc.v2();
            // pos1.x = centerPos.x + Math.cos(Math.PI*tool.GetRandom(0,360)/180)*tool.GetRandom(300,350);
            // pos1.y = centerPos.y + Math.sin(Math.PI*tool.GetRandom(0,360)/180)*tool.GetRandom(50,100);
            item.scale = 0;
            cc.tween(item).delay(i*delayTime).to(.1,{scale:1}).
            to(actionTime,{x:this.coinParentPos.x,y:this.coinParentPos.y})
            // bezierTo(.7,pos,pos1,this.coinParentPos)
            .to(.1,{scale:1.25}).call(()=>{
                this.killedCoin(item);
                if(i==len-1){
                    util.addCoin(data.value);           
                    this.createNum(data.value,this.coinParentPos);
                }
            }).start();
            
        }
    }

    /**
     * 复制一份金币特效
     * @param node 节点
     * @param num 多少个
     */
     creatorCoin2(){

        let data = {
            node:null,
            num:5,
            parent:null,
        }

        if(!this.coinParentPos2){
            let coinNode:cc.Node = util.GlobalMap.get("savingPot");
            this.coinParentPos2 = coinNode.parent.convertToWorldSpaceAR(coinNode.getPosition());
            this.coinParentPos2 = this.node.convertToNodeSpaceAR(this.coinParentPos2);
        }       
        if(data && (!data.node || !data.node.parent)){
            data.node = cc.director.getScene().getChildByName('Canvas');
        }
        let pos:cc.Vec2 = data.node.parent.convertToWorldSpaceAR(data.node.getPosition());
        pos = this.node.convertToNodeSpaceAR(pos);

        let len:number =  data.num||1;
        let delayTime:number = .05+(.3/len);
        let actionTime:number = .5+(.2/len);
        for(let i = 0;i<len;i++){
            let item:cc.Node = this.coinPool.createEnemy(data.parent||this.node);
            item.setPosition(pos);
            item.scale = 0;
            cc.tween(item).delay(i*delayTime).to(.1,{scale:1}).
            to(actionTime,{x:this.coinParentPos2.x,y:this.coinParentPos2.y})
            .to(.1,{scale:1.25}).call(()=>{
                this.killedCoin(item);
            }).start();
            
        }
    }


    /**
     * 
     * @param res 数据
     */
    createNum(num:number,pos:cc.Vec2,parent?:cc.Node){
        if(this.numPool){
            let item:cc.Node = this.numPool.createEnemy(parent||this.node);
            item.setPosition(pos.x+100,pos.y-60);
            item.getComponent(cc.Sprite).enabled = num>=100;
            item.children[1]&&(item.children[1].getComponent(cc.Label).string = "+"+ num);
            item.opacity = 0;
            cc.tween(item).to(.1,{opacity:255}).by(.3,{y:30}).to(.1,{opacity:0}).call(()=>{
                this.numPool.onEnemyKilled(item);
            }).start();
        }
    }

    /**
     * 
     * @param res 数据
     */
    creatorTurret(data:{node:cc.Node,num:number,parent?:cc.Node}){
        if(!this.turretParentPos){
            let turretNode:cc.Node = util.GlobalMap.get("turretBuy");
            this.turretParentPos = turretNode.parent.convertToWorldSpaceAR(turretNode.getPosition());
            this.turretParentPos = this.node.convertToNodeSpaceAR(this.turretParentPos);
        }

        if(data && (!data.node || !data.node.parent)){
            data.node = cc.director.getScene().getChildByName('Canvas');
        } 

        let pos:cc.Vec2 = data.node.parent.convertToWorldSpaceAR(data.node.getPosition());
        pos = this.node.convertToNodeSpaceAR(pos);
        let len:number =  data.num||1;
        let centerPos:cc.Vec2 = cc.Vec2.clone(pos.add(this.turretParentPos).div(2));
        for(let i = 0;i<len;i++){
            let item:cc.Node = this.turretPool.createEnemy(data.parent||this.node);
            // item.
            item.setPosition(pos);
            let pos1:cc.Vec2 = cc.v2();
            pos1.x = centerPos.x + Math.cos(Math.PI*tool.GetRandom(0,360)/180)*tool.GetRandom(300,350);
            pos1.y = centerPos.y + Math.sin(Math.PI*tool.GetRandom(0,360)/180)*tool.GetRandom(50,100);
            item.scale = 0;
            cc.tween(item).delay(i*.1).to(.1,{scale:.4}).bezierTo(.5,pos,pos1,this.turretParentPos).to(.1,{scale:.45}).call(()=>{
                this.killedCoin(item);
                if(i==len-1){
                    cc.game.emit(NameTs.Game_View_UserDataUpdata,updateType.product);
                }
            }).start();
            
        }

    }
    

    /**
     * 删除
     * @param node 节点
     */
    killedCoin(node:cc.Node){
        this.coinPool.onEnemyKilled(node);
    }

    


}
