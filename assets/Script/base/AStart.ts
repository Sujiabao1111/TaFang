import tool from "../util/tool";

class Point {
    x=0;
    y=0;
    G=0;//G值 开始点 到当前点的移动量
    H=0;//H值　当前点移动目的地的移动量估算值
    father=null;
    Console(){
        console.log("x:"+this.x+" and y:"+this.y);
    }
    Init(x,y,father){
        this.x=x;
        this.y=y;
        this.father=father;
    }
}



export default class AStar{

    /**地图存放二维数组*/
    map:number[][]=[];
    /**行数*/
    rowCount:number=0;
    /**列数*/
    colCount:number=0;
    /**出发点*/
    startPoint:Point = new Point();
    /**终点*/
    endPoint:Point = new Point();
    /**存放Opint类的open数组*/
    openList:any=[];
    /**存在Opint类的close数组*/
    closeList:any=[];
    /**最终行走路线 */


    /**初始化 
     * @param map 二维数组
     * @param rowCount 行数
     * @param colCount 列数
    */
    init(map:number[][],rowCount:number,colCount:number){
       this.map = this.changeMap(map);
       this.rowCount = rowCount;
       this.colCount = colCount;
    }

    /**
     * 转变成该寻路方法的地图二维数组 
     * 以前 0 空 1炮塔位置 2开始点 3结束点 4 道路
     * 现在0 空（道路）　1 开始点　2 结束点　3 障碍物
     * @param map 二维数组
     */
    private changeMap(map:number[][]){

        let newMap:number[][] = tool.deepClone(map);
        
        for(let i = 0;i<newMap.length;i++){
            for(let j = 0;j<newMap[i].length;j++){
                let item = newMap[i][j];
                if(item==0||item==1){
                    newMap[i][j]=3;
                }else if(item==2){
                    newMap[i][j]=1;
                    this.startPoint.x = i;
                    this.startPoint.y = j;
                }else if(item==3){
                    newMap[i][j]=2;
                    this.endPoint.x = i;
                    this.endPoint.y = j;
                }else if(item==4){
                    newMap[i][j]=0;
                }
            }
        }
        return newMap;
    }

    /**
     * 
     * @param x 
     * @param y 
     */

    private IsBar(x,y){
        if(this.map[x][y]==3){
            return true;
        }
        else{
            return false;
        }
    }
    /**当前坐标是否在OpenList*/
    private IsInOpenList(x,y){
            for(var i=0;i<this.openList.length;i++){
                if(this.openList[i].x==x&&this.openList[i].y==y){
                    return true;
                }

            }
        return false;
    }
    /**当前坐标是否在CloseList*/
    private IsInCloseList(x,y){
        for(var i=0;i<this.closeList.length;i++){
            if(this.closeList[i].x==x&&this.closeList[i].y==y){
                return true;
            }

        }
        return false;
    }
    /**计算G值;(p是Point类)*/
    private GetG(p){
        if(p.father==null){
            return 0;
        }
        return p.father.G+1;
    }
    /**计算H值*/
    private GetH(p,pb){
        return Math.abs(p.x-pb.x)+Math.abs(p.y-pb.y);
    }
    /**添加当前点的上下左右相邻的方格到Open列表中*/
    private AddNeiToOpenList(curPoint){
        for(var x=curPoint.x-1;x<=curPoint.x+1;x++){
                for(var y=curPoint.y-1;y<=curPoint.y+1;y++){
                    //排除自身以及超出下标的点
                    if((x>=0&&x<this.colCount&&y>=0&&y<this.rowCount)&&!(curPoint.x==x&&curPoint.y==y)){
                        //排除斜对角
                        if(Math.abs(x-curPoint.x)+Math.abs(y-curPoint.y)==1){
                            //不是障碍物且不在关闭列表中
                            if(this.IsBar(x,y)==false&&this.IsInCloseList(x,y)==false){
                                //不存在Open列表
                                if(this.IsInOpenList(x,y)==false){
                                    var point=new Point();
                                    point.x=x;
                                    point.y=y;
                                    point.father=curPoint;
                                    point.G=this.GetG(point);
                                    point.H=this.GetH(point,this.endPoint);
                                    this.openList.push(point);
                                }
                            }
                        }
                    }
                }
        }
    }
    /**
     * 在openlist集合中获取G+H为最小的Point点
     */
    private GetMinFFromOpenList(){
        var minPoint=null;
        var index=0;
        for(var i=0;i<this.openList.length;i++){
            if(minPoint==null||minPoint.G+minPoint.H>=this.openList[i].G+this.openList[i].H){
                minPoint=this.openList[i];
                index=i;
            }
        }
        return{
            minPoint:minPoint,
            index:index
        }
    }
    /**
     * 
     * @param x 
     * @param y 
     */
    private GetPointFromOpenList(x,y){
        for(var i=0;i<this.openList.length;i++){
            if(this.openList[i].x==x&&this.openList[i].y==y){
                return this.openList[i];
            }
        }
        return null;

    }
    /**
     * 开始寻找节点并返寻走路线 如果有返回数组，没有就返回null
     * @param call 回调
     */
    FindPoint(call:Function){
        console.log(this);
        this.openList.push(this.startPoint);
        while(this.IsInOpenList(this.endPoint.x,this.endPoint.y)==false||this.openList.length==0){
            let data = this.GetMinFFromOpenList();
            var curPoint=data.minPoint;
            var index=data.index;
            if(curPoint==null){
                call&&call(null);
                return null;
            }
            this.openList.splice(index,1);
            this.closeList.push(curPoint);
            this.AddNeiToOpenList(curPoint);
        }
        var p=this.GetPointFromOpenList(this.endPoint.x,this.endPoint.y);
        while(p.father!=null){
            p= p.father;
            this.map[p.x][p.y]=4;
        }
        //把终结点也设置成4
        this.map[this.endPoint.x][this.endPoint.y]=4;

        //添加结束点
        this.closeList.push(this.endPoint);
        call&&call(this.closeList);
    }

   
};
