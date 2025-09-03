export class Loading {
    loadingIns: cc.Node = null;
    text: string;
    disableClick: boolean;
    loading:boolean = false;

    constructor(_text: string, disableClick: boolean) {
        this.text = _text;
        this.disableClick = disableClick;
    }
    public openLoading(text?: string): void{
        // if(!this.loading){
        //     this.loading = true;

        //     cc.loader.loadRes('/Prefabs/Loading', (err, prefab)=>{
        //         this.loading = false;
        //         if (err) {
        //             cc.error(err.message || err);
        //             return null;
        //         }
        //         this.loadingIns = cc.instantiate(prefab);
        //         this.loadingIns.getComponent('LoadinController').setListenerStatus(this.disableClick);
        //         if(text){
        //             this.loadingIns.getChildByName('content').getChildByName('label').getComponent(cc.Label).string = text; 
        //         }
        //         cc.director.getScene().getComponentInChildren(cc.Canvas).node.addChild(this.loadingIns);
                
        //     });
        // }   
    }

    public closeLoading(): void{
        // if(this.loadingIns){
        //     this.loadingIns.destroy();
        // }else{
        //     let loadingNode = cc.director.getScene().getComponentInChildren(cc.Canvas).node.getChildByName('Loading');
        //     if(loadingNode){
        //         loadingNode.removeFromParent();
        //     }else{
        //         let sid = setInterval(()=>{
        //             if(cc.director.getScene().getComponentInChildren(cc.Canvas).node.getChildByName('Loading')){
        //                 cc.director.getScene().getComponentInChildren(cc.Canvas).node.getChildByName('Loading').removeFromParent();
        //                 clearInterval(sid);
        //             }
                    
        //         },200)
        //     }
        // }
    }
}