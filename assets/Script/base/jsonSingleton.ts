class jsonSingleton{

    jsonData:any = {};

    public static singleton:jsonSingleton = null;

    /**
     * 加载哪些
     * @param arr 数组
     * @param call 回调
     */
    loadJson(arr:string[],call:Function=()=>{}){
        let len:number = arr.length;
        if(len<=0){
            call&&call();
            return;
        }
        if(arr){
            arr.forEach(name=>{
				
                cc.resources.load('data/'+name, (err, jsonAsset:cc.JsonAsset)=> {
                    len--;
                    this.jsonData[name] = jsonAsset.json;
					
                    if(len==0){
                        call&&call();
                    }
                });
            })
        }
    }
    /**
     * 
     * @param name 哪个数据
     */
    getJson(name){
        return this.jsonData[name];
    }
    
}

jsonSingleton.singleton = new jsonSingleton();
export default jsonSingleton;
