import util from "../../util/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turretEffect extends cc.Component {

    @property(cc.Sprite)
    bodySprite: cc.Sprite = null;

    @property(cc.Sprite)
    footSprite: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    private level:number = 1;
    private initData:any;

    init(){


        this.level = util.userData.turretLevel;

        
        this.initData = util.GetTurretData(this.level);

        this.loadSprite("body",(res)=>{
            this.bodySprite&&(this.bodySprite.spriteFrame = res);
        })
        this.loadSprite("foot",(res)=>{
            if(this.footSprite&&res){
                this.footSprite.node.active = true;
                this.footSprite.spriteFrame = res
            }else{
                this.footSprite.node.active = false;
            }
            if(Number(this.initData.spriteFootY)>0){
                this.footSprite&&(this.footSprite.node.y = Number(this.initData.spriteFootY));
            }
        })

    }

    onLoad () {}

    start () {

    }

    /**
     * 加载图片
     */
     loadSprite(name:string,call:Function){
        cc.resources.load(this.initData[name],cc.SpriteFrame,(err,res:cc.SpriteFrame)=>{

            if(err){
                console.error("找不到该图片",err);
                return;
            }
            call(res);

        });
    }

    // update (dt) {}
}
