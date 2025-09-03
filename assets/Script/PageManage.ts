import { gameState, propType } from "./common/faceTs";
import NameTs from "./common/NameTs";
import pageTs from "./common/pageTs";
import tool from "./util/tool";
import util from "./util/util";
const {ccclass, property} = cc._decorator;

@ccclass
export default class PageManage extends cc.Component {

    
    //打开的窗口中是否有重复的，如果有则不打开
    pageOpenArr:Map<string,string>  = new Map();

    //打开的预制体
    pageOpen:Map<string,any> = new Map();

    //父类
    parent:cc.Node;

    public static singleton:PageManage = null;


    //打开的数量
    openNum:number = 0;

    /**需要打开页面的数组 */
    private pageArr:{name:string,data:any}[] = [];
    /**现在打开的是哪个 */
    private nowPage:string = null;
    

    onLoad(){

        if(PageManage.singleton){
            return;
        }else{
            PageManage.singleton = this;
        }

    }    

    /**
     * 检查是否在停止页面上
     */
    checkStopGame(pageName:string){

        let checkAdult = (name) => {
            return name == pageName;
        }

        return pageTs.stopGamePage.some(checkAdult)

    }

    /**
     * 检查是否能二级弹窗
     */
     checkTwoPopGame(pageName:string){

        let checkAdult = (name) => {
            return name == pageName;
        }

        return pageTs.twoPopPage.some(checkAdult)

    }

    /**
     * 检查是否能最高弹窗
     */
     checkTopPopGame(pageName:string){

        let checkAdult = (name) => {
            return name == pageName;
        }

        return pageTs.topPopPage.some(checkAdult)

    }
    

    /**
     * 打开哪个页面
     * @param name 哪个
     * @param data 数据
     */
    showPage(name:string,data:any=null){
        if(this.pageOpenArr.has(name))return;

        let successFn:Function = (Prefab:cc.Node)=>{            
            //如果有则不打开
            if(this.pageOpenArr.has(name))return;

            this.pageOpen.set(Prefab.name,Prefab);

            let PrefabTs = Prefab.getComponent(Prefab.name);
            Prefab.setParent(this.parent);
            // this.pageOpen.set(Prefab.name,Prefab);
            if(PrefabTs){
                PrefabTs.init&&PrefabTs.init(data);
                if(PrefabTs.isAni)this.showAni(Prefab);
            }
            if(this.checkStopGame(name)){
                this.openNum++;
            }
            // if(util.levelState != gameState.stop 
            //     && name != pageTs.pageName.GameAdLoading
            //     && name != pageTs.pageName.GameStart
            //     && name != pageTs.pageName.GameEnd){
            //     util.levelState = gameState.stop;
            //     cc.game.emit(NameTs.Game_Stop);
            // }

            if(util.levelState != gameState.stop&& name != pageTs.pageName.GameAdLoading
                    && name != pageTs.pageName.GameStart
                    && name != pageTs.pageName.GameEnd&&this.openNum>0){
                util.levelState = gameState.stop;
                cc.game.emit(NameTs.Game_Stop);
            }

            this.pageOpenArr.set(name,name);
            return PrefabTs;
        }
        

        if(name != pageTs.pageName.GameAdLoading&&!this.checkTwoPopGame(name)){

            if(this.checkTopPopGame(this.nowPage)&&(name !== pageTs.pageName.GameWallet)){
                this.pageArr.push({name,data});
                return;
            }

            if(this.nowPage!==name){
                let item = null;
                if(this.pageArr.length>0){
                    item = this.pageArr[0];
                    this.closePage(item.name,false);
                }
                this.pageArr.unshift({name,data});
                this.nowPage = null;
                if(item){
                    this.pageArr.push(item);
                }
            }
            if(this.nowPage!==null){
                return;
            }
            if(this.nowPage==null){
                this.nowPage = name;
            }
        }
        

        

        if(this.pageOpen.has(name)){

            console.log(this.pageOpen.get(name),'this.pageOpen.get(name)')

            let Prefab:cc.Node = cc.instantiate(this.pageOpen.get(name));            

            successFn(Prefab);

        }else{
            cc.resources.load(pageTs.pageUrl[name],cc.Prefab,(err,res)=>{

                let Prefab = cc.instantiate(res);                                
    
                successFn(Prefab);
    
            })
        }
    }

    /**删除数组指定的页面名字 */
    delectPageArr(name:string){
        console.log(this.pageArr.length,'删除前');
        for(let i = 0;i<this.pageArr.length;i++){
            if(this.pageArr[i].name == name){
                this.pageArr.splice(i,1);
                console.log("删除掉")
                break;
            }
        }
        console.log(this.pageArr.length,'删除后');

    }

    /**
     * 预加载
     * @param name 哪个页面
     */
    preloadPage(name:string){
        cc.resources.preload(pageTs.pageUrl[name],cc.Prefab);
    }

    /**
     * 关闭哪个页面
     * @param name 哪个
     * @param ani 是否有动画
    */
    closePage(name:string,ani:boolean = true){            
        let deleteName = name.replace(name[0],name[0].toUpperCase());
        this.pageOpenArr.delete(deleteName);

        let str:string = name.replace(name[0],name[0].toLowerCase());
        let node = this.pageOpen.get(str);
        
        if(name != pageTs.pageName.GameAdLoading&&!this.checkTwoPopGame(name)){
            this.delectPageArr(deleteName);
            this.nowPage = null;
        }else{
            ani = false;
        }

        if(ani){
            this.closeAni(node)
        }else{
            this.destroyPage(node);
        }

        if(this.checkStopGame(deleteName)){
            this.openNum--;
            if(this.openNum < 0){
                this.openNum = 0;
            }
        }
        console.log(this.openNum,'this.openNum')
        if(util.levelState==gameState.stop&&!util.isStop 
            && deleteName != pageTs.pageName.GameAdLoading 
            && deleteName != pageTs.pageName.GameStart
            && deleteName != pageTs.pageName.GameEnd
            && this.openNum == 0)
        {
            util.levelState = gameState.start;
            cc.game.emit(NameTs.Game_Resume);
        }
        
    }

    /**
     * 展现下一个页面
     */
    showNextPage(){
        console.log(this.pageArr.length,'this.pageArr')
        if(this.pageArr.length>0&&this.pageArr[0]){
            let item = this.pageArr[0];
            this.showPage(item.name,item.data);
            this.pageArr.splice(0,1);
        }

    }

    /**
     * 查找当前打开的页面
     * @param name 页面名字
     */
     findPage(name:string){
        let str:string = name.replace(name[0],name[0].toLowerCase());
        let node = this.pageOpen.get(str);        
        if(node && node.name != ""){            
            return this.pageOpen.get(str);
        }
        return null;
    }
    
    /**开场动画 
     * @param node 节点
    */
    showAni(node:cc.Node){
        if(node.name == `gameWalletRecord`){
            return;
        }
        let bg:cc.Node = node.getChildByName("bg");
        let conetnt:cc.Node = node.getChildByName("content");
        
        if(bg){
            bg.opacity = 0;
            cc.tween(bg).to(.1,{opacity:150}).start();
        }
        if(conetnt){
            conetnt.scale = 0;
            cc.tween(conetnt).to(.2,{scale:1}).start();
        }
    }
    /**
     * 关闭动画
     * @param node 节点
     */
    closeAni(node:cc.Node){

        if(node){
            if(node.name == `gameWalletRecord`||node.name == `gameKingPao`||node.name == `gameKingPaoProgress`){
                this.destroyPage(node);
                return;
            }

            if(node.name != ""){
                let bg:cc.Node = node.getChildByName("bg");
                let conetnt:cc.Node = node.getChildByName("content");
                if(bg)cc.tween(bg).to(.2,{opacity:0}).start();
                if(conetnt)cc.tween(conetnt).to(.1,{scale:0}).start();
                this.scheduleOnce(()=>{
                    this.destroyPage(node);
                },.2);
            }
            else{
                this.destroyPage(node);
            }
        }
    }

    /**
     * 销毁页面
     */
    destroyPage(node:cc.Node,isShow:boolean = true){
        if(node){
            node.destroy&&node.destroy();
            node.removeFromParent&&node.removeFromParent();
            cc.assetManager.releaseAsset(this.pageOpen.get(node.name));
            if(isShow)this.showNextPage();
        }
    }
}
