import * as crypto from "crypto";

/**
 * 工具类
 * 黎伟权
 * 2021.1.14
 */

const env = window["wx"] || window["tt"] || window["ks"] || window["qq"];


export class Tools {

  /**
   * 深度拷贝
   * @param obj 任何一个
   */
  public static deepClone(obj: any) {
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
      for (let i = 0, len = obj.length; i < len; i++) {
        newObj.push(this.deepClone(obj[i]));//递归操作嵌套对象
      }
      return newObj;
    }
    newObj = {};
    for (let key in obj) {
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
  public static GetArrData(key: string, value: any, arr: any[], num: number = 1) {
    let newArr: any[] = [];
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] == value) {
          newArr.push(this.deepClone(arr[i]));
          if (num >= newArr.length) {
            break;
          }
        }
      }
    }
    if (newArr.length > 0) {
      if (num == 1) {
        return newArr[0];
      } else {
        return newArr;
      }
    } else {
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
  public static setArrData(key1: string, value1: any, key2: string, value2: any, arr: any[]): boolean {
    //默认失败
    let isSuccess: boolean = false;

    for (let i = 0; i < arr.length; i++) {

      if (arr[i][key1] == value1) {
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
  public static GetRandom(min: number, max: number, type: number = 0) {

    let minNum: number = Number(min);
    let maxNum: number = Number(max);
    let num: number = Math.random() * (maxNum - minNum) + minNum;
    switch (type) {
      case 0:
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
  public static GetPosAngle(p1: cc.Vec2, p2: cc.Vec2) {
    //计算出朝向
    let dx: number = p2.x - p1.x;
    let dy: number = p2.y - p1.y;
    let dir: cc.Vec2 = cc.v2(dx, dy);

    //根据朝向计算出夹角弧度
    let angle: number = dir.signAngle(cc.v2(1, 0));

    //将弧度转换为欧拉角
    let degree: number = angle / Math.PI * 180 + 90;

    return -degree

  }

  /**
   * 打乱数组
   * @param arr 数组
   */
  public static randomArr(arr: any[]) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
  }

  /**
   * 时间换算
   * @param time 
   * @param num 1:秒 2：秒和分 3：全都有
   */
  public static changeTime(time: number, num: number = 2) {

    let h: number = Math.floor(time / 60 / 60);
    let m: number = Math.floor(time / 60);
    let s: number = Math.floor(time % 60);

    let hStr = (h < 10 ? "0" : "") + h;
    let mStr = (m < 10 ? "0" : "") + m;
    let sStr = (s < 10 ? "0" : "") + s;

    let str = null;

    if (num == 3) {
      str = hStr + ":" + mStr + ":" + sStr;
    } else if (num == 2) {
      str = mStr + ":" + sStr;
    } else {
      str = sStr;
    }
    return str;

  }

  /** 
   * 距离特定的时间还差多少
   * @param hours 小时 默认凌晨
  */
  public static formatData(hours: number = 24): string {
    let date: any = new Date();
    let temphh = hours - 1 - date.getHours();
    let tempMinutes = 59 - date.getMinutes();
    let tempSeconds = 59 - date.getSeconds();
    if (temphh < 0) {
      temphh += 24;
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
  public static changeUnit(num1: number, num2: number = 2): string {
    //换算长度
    let newNum: number = String(num1).length;
    let isTreeMultiple: boolean = newNum % 3 == 0;
    let Len: number = Math.floor(newNum / 3);
    //单位
    let unit: string[] = ["", "K", "M", "B", "T", "Q"];
    if (Len > unit.length - 1) {
      Len = unit.length - 1;
    }
    Len -= isTreeMultiple ? 1 : 0;
    let str: string = (num1 / (Math.pow(1000, Len))).toFixed(num2);
    for (let i = 0; i < 2;) {
      let lastNum: string = str.substr(-1);
      if (lastNum == "0") {
        str = str.substr(0, str.lastIndexOf("0"));
        i++;
      } else {
        break;
      }
    }
    if (str.substr(-1) == ".") {
      str = str.substr(0, str.lastIndexOf("."));
    }
    return str + unit[Len];

  }



  public static storageKey: string = "_v1.0.0";
  /**
      * 存储本地数据
      * @param {*} isObject 是否是一个对象或者数组
      */
  public static setStorage(key: string, value: any, isObject = false) {
    key = this.storageKey + key;
    if (env) {
      return env.setStorageSync(key, value);
    }
    if (isObject) {
      value = JSON.stringify(value);
    }
    /** 默认cocos 存储数据方法 */
    cc.sys.localStorage.setItem(key, value);
  };

  /**
  * 获取存储数据
  * @param {*} isObject 是否是一个对象或者数组
  */
  public static getStorage(key: string, isObject = false) {
    key = this.storageKey + key;
    let temp = null;

    if (env) {
      temp = <any>env.getStorageSync(key);
      if (temp == "") {
        temp = null;
      }
    } else {
      temp = <any>cc.sys.localStorage.getItem(key);
      if (!temp || temp.toString() == "NaN" || temp.toString() == "null") {
        temp = null;
      } else if (isObject) {
        temp = JSON.parse(temp);
      } else if (typeof temp === "boolean") {

      } else if (!isNaN(temp)) {
        temp = parseInt(temp);
      }
    }
    return temp;
  };


  /**
  * 截断字符串函数
  *
  * @param str 要截断的字符串
  * @returns 截断后的字符串，格式为"前5个字符...最后2个字符"
  */
  public static truncateString(str: string): string {
    return `${str.slice(0, 5)}...${str.slice(-2)}`;
  }


  /**
 * 将文本复制到剪贴板
 *
 * @param textToCopy 要复制到剪贴板的文本
 */
  public static copyToClipboard(textToCopy: string) {
    if (textToCopy == undefined || textToCopy == '') {
      return false;
    }

    // 创建一个临时的textarea元素，将文本放入其中
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // 选中文本
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    try {
      // 尝试执行复制操作
      document.execCommand('copy');
      console.log('Text copied to clipboard:', textToCopy);
    } catch (err) {
      console.error('Unable to copy text to clipboard');
      return false;

    }

    // 移除临时元素
    document.body.removeChild(textarea);
    return true;
  }

  /**
 * 将数字转换为字符串，并根据指定条件格式化数字。
 *
 * @param num 需要转换的数字。
 * @param minFixed 当小数字于10000时，如果小数部分不足此值，则按此值补足小数部分。默认为0。
 * @param fixed 小数点后的固定位数。默认为7。
 * @returns 格式化后的数字字符串。
 */
  public static getNumStr(num: number, minFixed: number = 0, fixed: number = 7): string {
    if (num == undefined || isNaN(num)) {
      return '';
    }
    if (num < 10000) {
      // if (minFixed > 0) {
      // 	const str = num.toString();
      // 	const [intPart, decPart = ''] = str.split('.');
      // 	if (decPart.length >= minFixed) {
      // 		return +num.toFixed(fixed) + ''; // 已有足够小数位，直接返回
      // 	}
      // 	num.toFixed(minFixed);
      // }
      return +num.toFixed(fixed) + '';
    }
    return (num / 1000).toFixed(2) + 'k';
  }

  /** 适配 */
  public static updateResolution() {
    let canvas = cc.find('Canvas').getComponent(cc.Canvas);
    let a = canvas.designResolution.width / canvas.designResolution.height;
    let b = cc.winSize.width / cc.winSize.height;
    canvas.fitHeight = a < b;
    canvas.fitWidth = a >= b;
    cc.view.setResizeCallback(() => {
      // cc.log(canvas.designResolution, cc.winSize, canvas)
      // cc.log(cc.view.getDesignResolutionSize(), cc.view.getVisibleSize())
    });
  }




  /**
    * 节点的图片置灰色或者默认
    * @param nodeT 节点
    * @param isGray 是否置灰色
    * @param isAllChild 是否所以节点
    */
  public static setSpriteState(nodeT: cc.Node, isGray: boolean, isAllChild: boolean = false) {
    let matUrl = isGray ? cc.Material.getBuiltinMaterial('2d-gray-sprite') : cc.Material.getBuiltinMaterial('2d-sprite');
    if (isAllChild) {
      let coms = nodeT.getComponentsInChildren(cc.Sprite);
      for (let i = 0; i < coms.length; i++) {
        coms[i].setMaterial(0, matUrl);
      }
      return;
    }
    nodeT.getComponent(cc.Sprite).setMaterial(0, matUrl);
    if (nodeT.getComponent(cc.Button)) {
      nodeT.getComponent(cc.Button).interactable = !isGray;
    }
  };


  //随机字符串
  public static getSuiJiNonce() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public static sortAndStringify(obj: Record<string, any>): string {
    // 获取对象的所有键并按升序排序
    const sortedKeys = Object.keys(obj).sort();
    // 按照排序后的键拼接字符串
    const result = sortedKeys.map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&');
    return result;
  }

  public static generateLocalSignature(data: string): string {
    let hmacKey = Buffer.from('MDRhNmdIQmw5eGtYVUFzZ3hadVo5Yk5aeDRMWWhlb2pwcjhIRll1L1BQcz0=', 'base64');
    const hmac = crypto.createHmac('sha256', hmacKey);
    hmac.update(data);
    // 生成签名并确保移除所有可能的空白字符
    const signature = hmac.digest('base64').trim();
    console.log('Local signature length:', signature.length);
    console.log('Local signature first 40 chars:', signature.substring(0, 40));
    console.log('Local signature last 40 chars:', signature.substring(signature.length - 40));
    return signature;
  }



  // 获取合并关卡结果
  public static getBigSmall(num: number) {
    const str = num.toString();
    let big = str.slice(0, -1);  // 前面的
    let small = str.slice(-1);   // 最后一
    return { big: parseInt(big), small: parseInt(small) };
  }




}