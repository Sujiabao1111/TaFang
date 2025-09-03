/**
 * 工具类
 * 黎伟权
 * 2021.1.14
 */
class tool  {

  /**
   * 深度拷贝
   * @param obj 任何一个
   */
  deepClone (obj:any) {
        if (typeof obj !== 'object') {
          return obj;
        }
        if (!obj) { // obj 是 null的情况
          return obj;
        }
        if (obj instanceof Date) {
          return new Date(obj);
        }
        if (obj instanceof RegExp) {
          return new RegExp(obj);
        }
        if (obj instanceof Function) {
          return obj;
        }
        let newObj;
        if (obj instanceof Array) {
          newObj = [];
          for(let i = 0, len = obj.length; i < len; i++){
              newObj.push(this.deepClone(obj[i]));//递归操作嵌套对象
           }
           return newObj;
        }
        newObj = {};
        for(let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] !== 'object') {
              newObj[key] = obj[key];
            } else {
              newObj[key] = this.deepClone(obj[key]);//递归操作嵌套对象
            }
          }
        }
        return newObj;
    }
      
    /**
     * 获取数组里面某个东西并返回东西，没有则null
     * @param key Key名
     * @param value 值
     * @param arr 数组
     * @param num 取多少个（相同的值得时候）不写默认1个，-1则全部
     */
    GetArrData(key:string,value:any,arr:any[],num:number = 1){
        let newArr:any[] = [];
        if(arr&&arr.length>0){
          for(let i = 0;i<arr.length;i++){

            if(arr[i][key]==value){
              newArr.push(this.deepClone(arr[i]));
              if(num>=newArr.length){
                  break;
              }
            }
          }
        }
        //console.log("GetArrData -----------: "+ newArr.length)
		//console.log("GetArrData ----2-------: "+ newArr)
        if(newArr.length>0){
          if(num==1){
			//console.log("GetArrData -----------: 返回 "+ newArr[0])
            return newArr[0];
          }else{
			//console.log("GetArrData -----------: 返回2")
            return newArr;
          }
        }else{
			//console.log("GetArrData -----------: 返回空")
          return null;
        }
    }
    /**
     * 重设数组里面某个东西并返回是否成功
     * @param key1 查找Key名
     * @param value1 查找值
     * @param key2 需要修改Key名
     * @param value2 需要修改的值
     * @param arr 数组
     */
    setArrData(key1:string,value1:any,key2:string,value2:any,arr:any[]):boolean{
        //默认失败
        let isSuccess:boolean = false;

        for(let i = 0;i<arr.length;i++){

            if(arr[i][key1]==value1){
                arr[i][key2] = value2;
                isSuccess = true;
                break;
            }
        }

        return isSuccess;
    }

    /**
     * 获取随机数
     * @param min 最小
     * @param max 最大
     * @param type 类型 0:丢弃小数部分,保留整数部分 1:向上取整,有小数就整数部分加1
     * 2:向下取整,丢弃小数部分 3:四舍五入 4:不做任何转义
     */
    GetRandom(min:number,max:number,type:number=0){

      let minNum:number = Number(min);
      let maxNum:number = Number(max);
      let num:number = Math.random() * (maxNum - minNum )+ minNum;
      switch(type){
          case 0 :
            num = parseInt(num.toString());
            break;
          case 1:
            num = Math.ceil(num);
            break;
          case 2:
            num = Math.floor(num);
            break;
          case 3:
            num = Math.round(num);
            break;
          case 4:
            break;
      }

      return num;

    }
    
    /**
     * 求两点之间的角度
     * @param p1 点1
     * @param p2 点2
     */
    GetPosAngle(p1:cc.Vec2,p2:cc.Vec2){
      //计算出朝向
        let dx:number = p2.x - p1.x;
        let dy:number = p2.y - p1.y;
        let dir:cc.Vec2 = cc.v2(dx,dy);
    
        //根据朝向计算出夹角弧度
        let angle:number = dir.signAngle(cc.v2(1,0));
  
        //将弧度转换为欧拉角
        let degree:number = angle / Math.PI * 180+90;

        return -degree

    }
    
    /**
     * 打乱数组
     * @param arr 数组
     */
    randomArr(arr:any[]){
        arr.sort(() => Math.random() - 0.5);
        return arr;
    }

    /**
     * 时间换算
     * @param time 
     * @param num 1:秒 2：秒和分 3：全都有
     */
    changeTime(time:number,num:number=2){

        let h:number = Math.floor(time/60/60);
        let m:number = Math.floor(time/60);
        let s:number = Math.floor(time%60);

        let hStr = (h<10?"0":"")+h;
        let mStr = (m<10?"0":"")+m;
        let sStr = (s<10?"0":"")+s;

        let str = null;

        if(num==3){
          str = hStr+":"+mStr+":"+sStr;
        }else if(num==2){
          str = mStr+":"+sStr;
        }else{
          str = sStr;
        }
        return str;

    }

    /** 
     * 距离特定的时间还差多少
     * @param hours 小时 默认凌晨
    */
    formatData(hours:number = 24):string{        
        let date: any = new Date();        
        let temphh = hours - 1 - date.getHours();
        let tempMinutes = 59 - date.getMinutes();
        let tempSeconds = 59 - date.getSeconds();
        if(temphh<0){
          temphh+=24;
        }
        let hh = (temphh < 10 ? '0' + temphh : temphh) + ':';
        let mm = (tempMinutes < 10 ? '0' + tempMinutes : tempMinutes) + ':';
        let ss = (tempSeconds < 10 ? '0' + tempSeconds : tempSeconds);
        return hh + mm + ss;
    }

    /**
     * 单位转换
     * @param num1 传入数字
     * @param num2 保留多少位(默认2)
     */
    changeUnit(num1:number,num2:number=2):string{
      //换算长度
      let newNum:number = String(num1).length;
      let isTreeMultiple:boolean = newNum%3==0;
      let Len:number = Math.floor(newNum/3);
      //单位
      let unit:string[] = ["","K","M","B","T","Q"];
      if(Len>unit.length-1){
         Len = unit.length-1;
      }
      Len -= isTreeMultiple?1:0;
      let str:string = (num1/(Math.pow(1000,Len))).toFixed(num2);
      for(let i = 0;i<2;){
        let lastNum:string = str.substr(-1);
        if(lastNum == "0"){
            str = str.substr(0,str.lastIndexOf("0"));
             i++; 
        }else{
            break;
        }
      }
      if(str.substr(-1)=="."){
        str = str.substr(0,str.lastIndexOf("."));
      }
      return str+unit[Len];

    }
   
    
}

export default new tool();