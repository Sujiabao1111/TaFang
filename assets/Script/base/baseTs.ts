import PageManage from "../PageManage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class baseTs extends cc.Component {


    @property({displayName:"是否开启动画"})
    isAni:boolean = true;

    /**
     * 加载预制体
     * @param url 地址
     * @param type 类型
     * @param call 回调
     */
    loadAny(url:string,type:any,call:Function, fail?:Function){
		console.log("loadAny : " +url )
        cc.resources.load(url,type,(err,res)=>{
            if(err){
                cc.error("加载资源失败",err);
                if(fail){
                    fail(); 
                }
                return;
            }
            call&&call(res);
        })

    }

    /**
     * 加载图片
     * @param url 地址
     * @param type 1.炮塔  2.怪兽  3.炮塔底座
     * @param call 回调
     */
    loadImage(level:number, type:number, call:Function, fail?:Function){
        if(type == 1){
            cc.resources.load(`texture/turret/body_${level}`, cc.SpriteFrame, (err,res)=>{
                if(err){
                    cc.error("加载资源失败",err);
                    fail && fail();
                    return;
                }
                call&&call(res);
            })
        }
        else if(type == 2){
            cc.resources.load(`texture/monster/monster${level}`, cc.SpriteFrame, (err,res)=>{
                if(err){
                    cc.error("加载资源失败",err);
                    fail && fail();
                    return;
                }
                call&&call(res);
            })
        }
        else if(type == 3){
            cc.resources.load(`texture/turret/foot_${level}`, cc.SpriteFrame, (err,res)=>{
                if(err){
                    cc.error("加载资源失败",err);
                    fail && fail();
                    return;
                }
                call&&call(res);
            })
        }
    }

    /**
     * 打开哪个
     * @param name 哪个
     */
    showPage(name:string, data = null){
        PageManage.singleton.showPage(name, data);
    }

    /**
     * 关闭
     */
    closePage(){
        if(this.node){
            PageManage.singleton.closePage(this.node.name);
        }        

    }


    // update (dt) {}
}
