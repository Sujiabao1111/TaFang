import pool from "./pool";

export default class scrollTs{

    private parent:cc.Node; //在哪里生成
    private scrollView:cc.ScrollView;//滚动
    private prefabItem:cc.Node;//item的节点
    private num:number;//默认只用20个
    private data:any;//数据

    private pool:pool;

    private startNum:number;
    private endNum:number;

    constructor(parent:cc.Node,scrollView:cc.ScrollView,prefabItem:cc.Prefab,data:any,num:number = data.length){

        this.parent = parent;
        this.scrollView = scrollView;
        this.prefabItem = cc.instantiate(prefabItem);
        this.num = num;
        this.pool = new pool(this.prefabItem,20);
        this.data = data;
        this.init();
    }


    init(){
        this.endNum = this.num;
        this.startNum = 0;
        for(let i = 0;i<this.num;i++){
            if(this.data[i]){
                this.createItem(i,this.data[i]);
            }            
        }

        // this.scrollView.node.on("scroll-to-bottom",(res:cc.ScrollView)=>{

        //     console.log("前减后加");
        //     this.createFn(8,false);

        // },this);

        // this.scrollView.node.on("scroll-to-top",(res:cc.ScrollView)=>{

        //     console.log("前加后减");
        //     this.createFn(8,true);

        // },this);

    }


    createFn(num:number,before:boolean){

        if(this.startNum-num<0&&before)return;
        //减掉
        for(let i = num;i>0;){
            this.clearItem(this.parent.children[!before?0:this.parent.childrenCount]);
            i--;
        }
        
        //增加
        for(let i = 0;i<num;i++){
            let id:number = this.endNum+i;
            if(before){
                id = this.startNum-1-i;
            }
            this.createItem(id,this.data[id]);
        }

        let scrollY:number  = 0;
        if(before){
            this.startNum -=num;
            this.endNum -=num;
            scrollY = this.prefabItem.height*3+2*10;
        }else{
            this.startNum +=num;
            this.endNum +=num;
            scrollY = this.prefabItem.height*2+1*10;
        }
        this.scrollView.setContentPosition(cc.v2(0,scrollY));
    }


    /**
     * 创建
     * @param data 数据
     */
    createItem(i,data){
        this.pool.createEnemy(this.parent,{id:i,data});
    }

    /**
     * 回收
     * @param node 节点
     */
    clearItem(node:cc.Node){

        this.pool.onEnemyKilled(node);

    }
    
}
