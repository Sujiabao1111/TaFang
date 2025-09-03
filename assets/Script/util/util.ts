
import { gameNumerical, gameState, PoolInfo, propInfo, propState, propType, soundInfo, thingType, turretInfo, updateType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import userData from "../data/userData";
import jsonSingleton from "../base/jsonSingleton";
import tool from "./tool";
import { TextCtr } from "../Assist/TextCtr";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import { UrlConst } from "../server/UrlConst";
import { GameEffect } from "../effect/GameEffect";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import { AdPosition } from "../common/AdPosition";
import TrackMgr from "../TrackMgr/TrackMgr";
import { AssistCtr } from "../Assist/AssistCtr";
// import encrypt = require('encryptjs');
class util {

    /**需要加载的json列表 */
    jsonArr: string[] = [
        NameTs.turretData,
        NameTs.mapData,
        NameTs.monsterData,
        NameTs.buyData,
        NameTs.propData,
        NameTs.coinData,
        NameTs.treasureData,
        NameTs.monsterIdData,
		NameTs.gkData,
        NameTs.bulletData
    ];

    /**本地字典 */
    localDiary: any = {
        haveTreasure: "haveTreasure",//宝藏数据
        noviceGuide: "noviceGuide", //新手指导顺序
        GetTurretNum: "GetTurretNum",//获得炮塔
        GetDayTime: "GetDayTime",//今天日期
        autoProp: "autoProp",//自动道具
        unlocking_time: "unlocking_time",//解锁时间
        synthesis_times: "synthesis_times",//合成次数
        propConfig: "propConfig",//道具详细表
        offlineTime: "offlineTime",//离线时间
        onlineTime: "onlineTime", //在线时间
        randomRedTimeNum:"randomRedTimeNum",//随机红包时间
        earnProgress:"earnProgress",//展现手指次数
    }

    secretkey: string = 'open_sesame'; // 加密密钥

    GlobalMap: Map<string, any> = new Map(); //用户储存某些东西

    MonsterMap: Map<string, any> = new Map(); //储存怪兽东西

    iphoneXTop: number;//刘海屏高度

    touchId: number; //touchid

    savingPotLock:boolean = false;//是否解锁了金币飞入存钱罐

    heavenTouch: boolean;//用于防重复点击

    Opening_times_level: number = 0;//开启次数

    isCheckTaskRed: boolean = true; //是否检测首页任务红点

    adPreObj: any = {}; //预加载广告的

    /**用户数据 */
    userData: userData = {
        pool: [],
        coin: 0,
        hongbao: 0,
        customs: {
            big: 1,
            small: 1
        },
        product: 40,
        turretLevel: 1,
        prop: [
            /**冰冻 */
            { type: 1, num: 0, time: null, use: propState.end },
            /**电击*/
            { type: 2, num: 0, time: null, use: propState.end },
            /**护罩*/
            { type: 3, num: 0, time: null, use: propState.end },
            /**清屏*/
            { type: 4, num: 0, time: null, use: propState.end },
            /**自动合成*/
            { type: 5, num: 0, time: null, use: propState.end },
            /**增能*/
            { type: 6, num: 0, time: null, use: propState.end }
        ],
        exchangeRate: 10000,
        newUser: true,
        compoundTimes: 0,
        noviceGuide: 1,
        buyCount: 0,
        emptyBoxNo: -1,
        heavenPool: [],
        haveTreasure: [],
        termCoin: 0,
        offlineIncome: {
            reward:0,
            multipleReward:0
        },
        version: 0,
        GetTurretNum: 18,
        GetDayTime: null,
        autoProp: null,
        airborneCount: 0,
        unlocking_time: 0,
        synthesis_times: 0,
        synthesis_All: 0,
        propConfig: null,
        resistAttackTimes: 0,
        localCompoundTime: 0,
        dayEnterSignNum: null,
        goldWheelCount: null,
        savingPotNum:0,
    };

    /**AB测试 */
    AB_Test: any = {
        lock_turret_test: "B",
        heaven_coin_test: "B",
        new_hand_test:"B",
        // wallet_test:"A",
    }

    //观看视频次数
    advertising_num: number = 0;
    //看视频获取道具总次数
    props_number: number = 0;

    //游戏时间
    gameTime: number = 0;
    //道具使用次数
    gamePropNum: number = 0;

    //点击了暂停
    isStop: boolean = false;

    //用户行为
    behaviorRewardVoList: any = null;

    //过关奖励
    gameLevelPassRewardVoList: any = [];

    //下一关的奖励
    gameLevelPassRewardNextVoList: any = [];

    //关卡怪物配置
    mapConfig: any = null;

    //道具配置表
    propData: any = null;

    //道具具体数值
    propConfig: any = null;

    //在线时间长度
    online_time = 600;

    /**天降金币点击次数*/
    heavenClickNum: number = 1;

    /**是否到时间发送数据3秒 */
    isSendTurretData: boolean = false;
    
    /**是否到时间发送数据3秒 */
    isSendCoinData: boolean = false;

    /**双倍收益 */
    doubleEarn: any = { use: propState.end, time: null };

    /**上一次上传的数据 */
    lastData: any = {
        compoundTimes: null, //合成次数
        highestBatteryLevel: null, //最高炮塔
        point: null, //金币
        userBatteryNum: null, //多少个炮塔
        userMapDetail: [] //池塘数据
    };

    //音效配置
    soundSet: soundInfo = {
        bgm: 1, //背景音效
        sound: 1 //普通音效
    };

    mapSize: any = {
        width: 750, //地图宽度
        grid: null, //地图格子大小
        startGridPos: null //初始位置
    };//地图大小

    //存储当前关卡的炮塔位置和回收的位置
    levelMap: any = [];
    //存储当前关卡的怪兽
    levelMonsterArr: { id: number, num: number }[] = [];
    //当前怪兽数量
    levelMonsterNum: number;
    //当前游戏状态
    levelState: number = gameState.default;
    //购买次数
    buyCount: number = 0;
    //今天是否签到
    isOkSign: boolean = false;
    //是否有在线奖励红包
    isSignOnLineRed:boolean = false;
    //距离上次获得随机红包时间
    upTurretRandomRedTime = 0;
    //当前在线时间
    onlineTimeNum = 0;
    //随机红包时间
    randomRedTimeNum = 60;
    //天降金币的视频数量
    existVideoCoinNum: number = 0;

    //临时变量
    tempParm: object = {};
    /**
     * 检查池塘哪个位置是空的
     */
    checkPool(): number {

        let loaction: number = null;//位置

        for (let i = 0; i < this.levelMap.length; i++) {
            let item = this.levelMap[i];
            let data = this.GetPoolData(item.no);
            let heavenItem = tool.GetArrData("no", item.no, this.userData.heavenPool);

            if (data && data.level == -1 && data.state == 1 && heavenItem.id == null) {
                if (item.no != this.userData.emptyBoxNo) {
                    loaction = item.no;
                    break;
                }
            }
        }
        return loaction;
    }

	setInt(_key,_value){
            cc.sys.localStorage.setItem(_key,_value.toString())
        }
	
	 getInt(_key,def){
			
			var ds = cc.sys.localStorage.getItem(_key)
			if( ds == "" || ds == null)
			{
				this.setInt(_key,def);
				ds = def;
			}
            return Number(ds)
        }

	getString(_key)
	{
		return cc.sys.localStorage.getItem(_key)
	}
	
	
	setString(_key,_value)
	{
		cc.sys.localStorage.setItem(_key,_value.toString())
	}

	inidata(){
		//金币
		this.userData.version = 548;
		this.doubleEarn.use = 0;
        this.doubleEarn.time = 0;
		this.userData.coin = this.getInt("goldhb",0)
		this.userData.exchangeRate = this.getInt("exchangeRate",10000)
		this.userData.product = this.getInt("product",40)
		this.userData.customs.big = this.getInt("customsbig",1)
		this.userData.customs.small = this.getInt("customssmall",1)
		this.userData.newUser =true //this.getInt("newuser",1)==1?true:false;
		this.userData.turretLevel=this.getInt("turretLevel",1)
		
		let psdd = this.getString("mappool")
		if( psdd == "" || psdd ==null )
		{
			this.initPool();
			let dds =  JSON.stringify( this.userData.pool)
			this.setString( "mappool" ,dds)
		}else
		{
			this.userData.pool =  JSON.parse(psdd)
			 this.repairPool();
		}
		
	}
	
	savedata()
	{
		
		this.setInt("goldhb",this.userData.coin)
		this.setInt("exchangeRate",this.userData.exchangeRate)
		this.setInt("product",this.userData.product)
		 this.setInt("customsbig",this.userData.customs.big)
		 this.setInt("customssmall",this.userData.customs.small)
		this.userData.newUser =true //this.getInt("newuser",1)==1?true:false;
		this.setInt("turretLevel",this.userData.turretLevel)
		
		let dds =  JSON.stringify( this.userData.pool)
		this.setString( "mappool" ,dds)
	}
	
	
	//判断是不是签到今天
	canSinge()
	{
		var canget = true;
		var d = new Date();
		var dats  = ["0","0","0","0","0","0","0"];
		var dd = this.getString("singdada");		
		
		if( dd == "" || dd== null || dd == undefined )
		{
			 this.setString("singdada",JSON.stringify(dats));		
			//,JSON.stringify(表名)
		}else
		{
			dats =  JSON.parse(dd );
		}
		
		var resrte = 0;
		for(var i=0;i<7;i++)
		{
			if( dats[i] == "0" )
			{
				resrte = 1;
			}
		}
		
		if( resrte == 0 )
		{
			dats  = ["0","0","0","0","0","0","0"];
			this.setString("singdada",JSON.stringify(dats));		
		}
		
		
		var tdstr = d.getFullYear() +""+ d.getMonth()+""+d.getDate();
		//console.log("sing :  " +tdstr );
		for( var i = 0;i<7;i++ )
		{
			if( tdstr == dats[i] )
			{
				canget = false;
			}
		}
		
		
		return !canget;
	}
	
	
	singlen()
	{
		var dd = this.getString("singdada");	
		var dats =  JSON.parse(dd );
		
		var index = 0;
		for( var i = 0;i<7;i++ )
		{
			if( dats[i] != "0" )
			{
				index+=1
			}
		}
		 
		return 	index;	 
	}
	
	singtoday()
	{
		var dd = this.getString("singdada");	
		var dats =  JSON.parse(dd );
		var d = new Date();
		var tdstr = d.getFullYear() +""+ d.getMonth()+""+d.getDate();
		var index = 0;
		for( var i = 0;i<7;i++ )
		{
			if( dats[i] == "0" )
			{
				dats[i] = tdstr;
				index = i;
				
				i= 8;
			}
		}
		 this.setString("singdada",JSON.stringify(dats));
		return 	index;	 
	}


    /**
     * 用于新手，初始化用户数据
     */
    initPool() {


        for (let i = 1; i < 17; i++) {

            //初始化池塘
            this.userData.pool.push({
                no: i, //第几个位置
                level: i == 1 ? 1 : -1,//-1为空
                state: 1 //默认前8个解锁
            });
        }

    }

    /**修复旧数据*/
    repairPool() {

        for (let i = 0; i < this.userData.pool.length; i++) {

            if (this.userData.pool[i].state == 0) {

                this.userData.pool[i].state = 1;

            }

        }

    }

    /**
     * 初始化金币位置
     */
    initHeavenPool() {
        for (let i = 1; i < 17; i++) {
            //初始化金币池塘
            this.userData.heavenPool.push({
                no: i, //位置
                id: null, //金币id
                value: null, //多少值
            });
        }
    }

    /**
     * 获取炮台的数据
     * @param level 等级
     */
    GetTurretData(level: number): turretInfo {

        let data: turretInfo = null;

        let turretData = jsonSingleton.singleton.getJson(NameTs.turretData);

        data = tool.deepClone(tool.GetArrData("level", level, turretData));

        return data;
    }

    /**
     * 保存一下池塘数据
     * @param id 位置
     * @param level 等级 null就是删除
     */
    savePool(id: number, level: number = null) {
        // let isExist:number = null;
        for (let i = 0; i < this.userData.pool.length; i++) {
            let item = this.userData.pool[i];
            if (this.userData.pool[i].no == id) {
                if (level) {
                    item.level = level;
                } else {
                    item.level = -1;
                }
                break;
            }
        }
    }

    /**
     * 获取行为奖励
     * @param type 1-第一次解锁新炮塔，2-消灭怪兽，3-解锁炮塔 4-完成关卡 5.合成
     */
    GetBehaviorRewardVo(type: number) {
		//console.log("-------123-------behaviorRewardVoList : " + JSON.stringify(this.behaviorRewardVoList) )
        return tool.GetArrData("type", type, this.behaviorRewardVoList).reward;

    }
	
	
	getnowmapdata()
	{
		
       this.mapConfig = this.getMapdata(this.userData.customs.big);
		
	}
	

    /**
     * 保存一下金币池塘数据
     * @param no 位置
     * @param id 金币id null就是删除
     * @param value 多少值 null就是删除
     */
    saveHeavenPool(no: number, id: number = null, value: number = null) {
        // let isExist:number = null;
        for (let i = 0; i < this.userData.heavenPool.length; i++) {
            let item = this.userData.heavenPool[i];
            if (this.userData.heavenPool[i].no == no) {
                if (value || id) {
                    item.id = id;
                    item.value = value;
                } else {
                    item.id = null;
                    item.value = null;
                }
                break;
            }
        }
    }

    /**
     * 获取金币池塘的有多少个
     */
    getHeavenPool() {

        let num: number = 0;

        for (let i = 0; i < this.userData.heavenPool.length; i++) {
            // let item = this.userData.heavenPool[i];
            if (this.userData.heavenPool[i].id) {
                num++;
            }
        }

        return num;
    }

    /**
     * 检查天降金币这个位置是否为有东西
     * @param no 位置
     */
    checkHeavenPool(no: number): boolean {
        let isExist: boolean = false;
        for (let i = 0; i < this.userData.heavenPool.length; i++) {
            let item = this.userData.heavenPool[i];
            if (this.userData.heavenPool[i].no == no) {
                if (item.id) {
                    isExist = true;
                }
                break;
            }
        }

        return isExist;
    }

    /**
     * 升级
     * 返回是否是新等级
     * @param level 等级
     */

    upLevel(level: number): boolean {
        if (level > this.userData.turretLevel) {
            this.userData.turretLevel = level;
            return true;
        }

        return false;
    }

    /**
     * 获取当前关卡怪兽配置
     */
    GetCustomsMonsterInfo() {

        let mapData = this.getMapdata(this.userData.customs.big);
		//console.log("GetCustomsMonsterInfo : "+ JSON.stringify(mapData))
        // let mapData = jsonSingleton.singleton.getJson(NameTs.mapData);

        //返回数据
        let data = mapData[this.userData.customs.small - 1];

        // for(let i = 0;i<mapData.length;i++){

        //     if(mapData[i].id==this.userData.customs.big){

        //         for(let j = 0;j<mapData[i].customs.length;j++){

        //             if(mapData[i].customs[j].level==this.userData.customs.small){
        //                 data = mapData[i].customs[j].monster;
        //                 break;
        //             }

        //         }

        //     }
        // }
        let Arr = [];
        data = data.levelConfig.split("+");

        for (let i = 0; i < data.length; i++) {

            let item = data[i].split("-");

            let id = item[0];
            let num = item[1];

            for (let j = 0; j < num; j++) {
                Arr.push(id);
            }

        }

        return Arr;

    }

    /**
     * 获取当前关卡地图配置
     */
    GetCustomsMap() {

        let mapData = jsonSingleton.singleton.getJson(NameTs.mapData);

        //返回数据

        let data = tool.GetArrData("id", 1, mapData);
		//console.log("--------GetCustomsMap----------:map : "+ mapData )
        return data;


    }

    /**
     * 通过位置来获取用户数据
     * @param loaction 哪个
     */

    GetPoolData(loaction: number) {

        let data = null;
        data = tool.GetArrData("no", loaction, this.userData.pool);
        return data;
    }
    /**
     * 通过位置来获取Map数据
     * @param loaction 哪个
     */
    GetPlaceData(loaction: number) {
        let data = null;

        data = tool.GetArrData("no", loaction, this.levelMap);

        return data;
    }

    /**
     * 获取怪兽数据
     * @param no 等级
     */

    GetMonsterData(level: number) {
        let data = jsonSingleton.singleton.getJson(NameTs.monsterData);

        return tool.GetArrData("no", level, data);

    }

    /**检查最高级别的炮塔时是否超过两个 */
    chekPoolHaveTwo() {

        let level: number = this.userData.turretLevel;
        let num: number = 0;

        for (let i = 0; i < this.userData.pool.length; i++) {
            let item = this.userData.pool[i];
            if (item.level == level) {
                num++;
            }
        }
        return num >= 2;

    }

    /**
     * 获取怪兽颜色
     * @param level 等级
     */

    GetMonsterColor(level: number) {
        let data = jsonSingleton.singleton.getJson(NameTs.monsterData);
        return tool.GetArrData("no", level, data).color;

    }

    /**
     * 获取关卡怪兽id
     * @param id id
     */

    GetMonsterIdData(id: number) {
        let data = jsonSingleton.singleton.getJson(NameTs.monsterIdData);
        return tool.GetArrData("id", id, data);

    }

    /**
     * 获取地图的位置
     * @param x 横向
     * @param y 竖向
     */
    GetMapPos(x: number, y: number): cc.Vec2 {

        let pos: cc.Vec2 = cc.v2();

        pos.x = this.mapSize.startGridPos.x + x * this.mapSize.grid;
        pos.y = this.mapSize.startGridPos.y - y * this.mapSize.grid;
        return pos;

    }

    /**
     * 设置当前关卡 距离终点最近的怪兽
     * @param id 怪兽id
     * @param num 剩余多少步
     */
    setLevelMonsterData(id: number, num: number) {

        let isExist: boolean = tool.setArrData("id", id, "num", num, this.levelMonsterArr);
        if (!isExist) {
            this.levelMonsterArr.push({ id, num });
        }

        let sortFn = (a, b) => {

            let before: number = a.num - b.num;

            if (a.num == b.num) {
                before = a.id - b.id;
            }

            return before;
        }

        this.levelMonsterArr.sort(sortFn);

    }
    /**
     * 删除当前关卡 的怪物
     * @param id 第几个
     */
    delectLevelMonster(id: number) {

        let isSuccess: boolean = false;

        for (let i = 0; i < this.levelMonsterArr.length; i++) {

            if (this.levelMonsterArr[i].id == id) {
                this.levelMonsterArr.splice(i, 1);
                isSuccess = true;
                break;
            }

        }

    }

    /**
     * 获取最近终点的怪兽
     */
    getFirstMonster() {
        //默认第一个
        return this.levelMonsterArr[0];
    }

    /**
     * 获取最靠近自己的怪兽
     * @param pos 自己位置
     * @param distanceNum 优先射程距离
     */
    getCloseMonster(pos: cc.Vec2, distanceNum: number = 250) {
        //最靠近自己的
        let closeMonsetr = { id: null, distance: null, num: null, isClose: false };

        for (let i = 0; i < this.levelMonsterArr.length; i++) {
            let name: string = this.userData.customs.big + "-" + this.userData.customs.small + "_Monster_" + this.levelMonsterArr[i].id;
            let target: cc.Node = this.MonsterMap.get(name);
            if (!target) continue;
            let targetPos: cc.Vec2 = target.getPosition();
            let distance: number = targetPos.sub(pos).mag();
            if ((closeMonsetr.id == null || distance < closeMonsetr.distance) && distance <= distanceNum) {
                closeMonsetr.id = this.levelMonsterArr[i].id;
                closeMonsetr.distance = distance;
                closeMonsetr.num = this.levelMonsterArr[i].num;
                continue;
            }
        }
        if (closeMonsetr.id !== null) {
            delete closeMonsetr.distance;
            closeMonsetr.isClose = true;
            return closeMonsetr;
        } else {
            let str: any = this.getFirstMonster();
            if (!str) return;
            str.isClose = false;
            return str;
        }
        // console.log(closeMonsetr,'closeMonsetr')
    }

    /**
     * 验证是否还在靠近怪兽
     * @param data {pos:自己的位置,id:}
     */
    checkMonsterClose(data: { pos: cc.Vec2, id: number, distanceNum: number }) {

        let name: string = this.userData.customs.big + "-" + this.userData.customs.small + "_Monster_" + data.id;
        let target: cc.Node = this.MonsterMap.get(name);
        if (!target) return false;
        let targetPos: cc.Vec2 = target.getPosition();
        let distance: number = targetPos.sub(data.pos).mag();
        return distance < data.distanceNum;
    }

    /**
     * 获取相同的等级的炮台
     * @param level 等级
     */
    getPoolSameLevelTurret(level: number) {

        let sameLevel = tool.GetArrData("level", level, this.userData.pool, -1);
        return sameLevel;

    }

    /**
     * 保存通关信息，并且+1
     */

    saveCustomLevel(): boolean {


        // let mapData = this.mapConfig;

        // if(this.mapConfig.length<this.userData.customs.small+1){
        //     console.log("超过了")
        //     return;
        // }

        let IsUp: boolean = false; //是否升级

        if (this.mapConfig.length < this.userData.customs.small + 1) {
            this.getdataStr({
                url: UrlConst.gameLevelCompleted,
                data: { level: this.userData.customs.big },
                success: (res) => {
                    // this.gameLevelPassRewardVoList = [];
                    // for (let i = 0; i < res.rewardList.length; i++) {
                    //     this.gameLevelPassRewardVoList.push(res.rewardList[i]);
                    // }
                    console.log("完成关卡上报!")
                }
            });
            this.userData.customs.big += 1;
            this.userData.customs.small = 1;
			this.setInt("customsbig",this.userData.customs.big)
			this.setInt("customssmall",this.userData.customs.small)
            console.log("超过了小关卡的的长度,小关卡变为1，大关卡+1");
            IsUp = true;
        } else {
            this.userData.customs.small += 1;
			this.setInt("customssmall",this.userData.customs.small)
        }

        return IsUp;
    }


    /**
     * 产能
     * @param num 加多少个(默认1)
     * @param type 普通的0（只能增加20如果超过则不增加）
     */
    productTurret(num: number = 1, type: number = 0) {

        this.userData.product += num;
        if (type == 0) {
            this.addProduct(0);
        }

    }

    /**
     * 检查是否能升级 
     * @param level 等级
    */
    checkUpdateLevel(level: number) {
        let data = jsonSingleton.singleton.getJson(NameTs.turretData);
        if (data.length < level) {

            return false;
        }

        return true;
    }

    /**
     * 增加多少个产能或者减少
     * @param num 数量
     */
    addProduct(num: number) {
        this.userData.product += num;
        // if(this.userData.product+1>gameNumerical.ProductMax){
        //     this.userData.product = gameNumerical.ProductMax;
        // }else 
        if (this.userData.product < 0) {
            this.userData.product = 0;
        }
        cc.game.emit(NameTs.Game_View_UserDataUpdata, updateType.product);
    }
    /**
     * 增加多少个金币或者减少
     * @param num 数量
     */
    addCoin(num) {
        this.userData.coin += parseInt(num);
        if (this.userData.coin < 0) {
            this.userData.coin = 0;
        }
		this.savedata();
        cc.game.emit(NameTs.Game_Wallet_AddCoin,num);
        cc.game.emit(NameTs.Game_View_UserDataUpdata, updateType.coin);
    }

    /**期间加多少金币
     * @param num 数值
    */
    addTermCoin(num: number) {
        this.userData.termCoin += num;
    }


    /**
     * 获取购买的等级并返回等级
     */
    getBuyRandomLevel(): number {

        let data = jsonSingleton.singleton.getJson(NameTs.buyData);

        //单独的等级
        let level: number = null;

        let smallData = { num: 0, level: 0 };

        let str = tool.GetArrData("level", this.userData.turretLevel, data);
        let randomLevel: number = null;
        if (!str) {
            console.log("找不到~" + this.userData.turretLevel + "级的炮塔购买信息")
            str = data[data.length - 1];
        } else {
            let arr = JSON.parse(str.arr);
            randomLevel = this.GetWeigthLevel(arr);
        }

        for (let i = 0; i < this.userData.pool.length; i++) {
            let item = this.userData.pool[i];
            if (item.level == -1) continue;
            if (smallData.level == 0 || smallData.level > item.level) {
                smallData.level = item.level;
                smallData.num = 1;
                continue;
            } else if (smallData.level == item.level) {
                smallData.num += 1;
            }
        }
        if (smallData.num == 1 && randomLevel >= smallData.level) {
            level = smallData.level;
            console.log("有单独的炮塔", level);
        } else {
            // console.log()
            // level = Number(str.min);
            // let maxLevel:number = Number(str.max);
            // if(level+this.buyCount>maxLevel){
            //     this.buyCount = 0;
            // }else{
            //     level += this.buyCount;
            // }
            // this.buyCount++;
            level = randomLevel;
        }
        return level;

    }

    /**
    * 通过权重获取等级
    */
    GetWeigthLevel(data: any[]) {

        let arr = tool.deepClone(data);

        let str = [];

        for (let i = 0; i < arr.length; i++) {

            let item = arr[i];

            for (let j = 0; j < item.weigth; j++) {

                str.push(item.id);

            }

        }
        let random: number = tool.GetRandom(0, str.length - 1);
        let id: number = str[random];
        if (id == null) {
            id = arr[0].id;
        }

        return Number(id);

    }

    /**
     * 检测在哪里
     * @param pos 点 基于中心点cc.v2
     * @param call 回调 
     */
    checkTouchPool(pos: cc.Vec2, call: Function) {

        let data: number = null;

        for (let i = 0; i < this.levelMap.length; i++) {
            let item = this.levelMap[i];
            //格子的位置

            let str = {
                x: null,
                y: null,
                width: null,
                height: null,
            }

            if (item.type == thingType.turret) {
                str.x = this.mapSize.startGridPos.x + item.x * this.mapSize.grid;
                str.y = this.mapSize.startGridPos.y - item.y * this.mapSize.grid;
                str.width = this.mapSize.grid;
                str.height = this.mapSize.grid;
            } else if (item.type == thingType.recycle) {
                str.x = item.pos.x;
                str.y = item.pos.y;
                str.width = item.width;
                str.height = item.height;
            }
            // let itemX:number = util.mapSize.startGridPos.x+item.x*util.mapSize.grid;
            // let itemY:number = util.mapSize.startGridPos.y-item.y*util.mapSize.grid;

            if (str.y + str.height / 2 >= pos.y && pos.y >= str.y - str.height / 2 &&
                str.x + str.width / 2 >= pos.x && pos.x >= str.x - str.width / 2) {
                if (item.type == thingType.recycle) {
                    // this.recycleFn();
                    //默认垃圾为100
                    call(100);
                    return;
                }
                data = item.no;
                break;
            }
        }

        if (this.checkHeavenPool(data)) {
            data = null;
        }

        if (data == this.userData.emptyBoxNo) {
            data = null;
        }

        call(data);

    }

    /**
     * 判断是否在存在
     * @param no 第几个
     */
    checkNoExist(no: number): boolean {

        let data = tool.GetArrData("no", no, this.userData.pool);
        if (data.level == -1 && data.state == 1) {
            return true;
        }
        return false;
    }

    /**
     * 获取用户道具数量
     * @param type 类型
     */
    GetPropNum(type: number) {
        let data: propInfo = tool.GetArrData("type", type, this.userData.prop);
        return data.num;
    }

    /**
     * 获取道具持续时间
     * @param type 类型
     */
    GetPropTime(type: number) {
        let propData = this.propConfig;
        console.log(propData, 'propData')
        let data = tool.GetArrData("type", type, propData);
        return Number(data.time);
    }

    /**
     * 使用哪个类型道具
     * @param type 类型道具
     */
    UseProp(type: number) {
        let num: number = Number(type) - 1;
        this.userData.prop[num].time = this.GetPropTime(type);
        this.userData.prop[num].use = propState.start;
        this.userData.prop[num].num -= 1;
        if (type == propType.cls) {                         //清屏            
            cc.game.emit(NameTs.Tool_Effect_Name.Game_Prop_Cls);
        } else if (type == propType.auto) {                  //自动合成
            cc.game.emit(NameTs.Tool_Effect_Name.Game_Prop_Atuo);
        }
        else if (type == propType.shock) {                  //电击
            cc.game.emit(NameTs.Tool_Effect_Name.Game_Prop_Shock);
        }
        else if (type == propType.shield) {                 //护盾
            cc.game.emit(NameTs.Tool_Effect_Name.Game_Prop_Shield);
        }
        else if (type == propType.frozen) {                 //冰冻
            cc.game.emit(NameTs.Tool_Effect_Name.Game_Prop_Frozen);
        }
        cc.game.emit(NameTs.Game_Tool_Use, type);
        cc.game.emit(NameTs.Game_PropItem_Update);
        console.log("使用成功", type, this.userData.prop[num], propState.start);
    }

    /**
     * 获取当前最高等级的炮塔数组2个以上的
     */
    GetTurretAuto() {
        let pool: PoolInfo[] = tool.deepClone(this.userData.pool);
        if (pool.length < 2) return false;
        let sortFn = (a, b) => {
            let num = b.level - a.level;
            return num;
        }
        pool = pool.sort(sortFn);
        let NewArr = [];
        for (let i = 0; i < pool.length; i++) {
            let arr = tool.GetArrData("level", pool[i].level, pool, -1);
            if (arr.length > 1 && this.checkUpdateLevel(arr[0].level + 1)) {
                NewArr = arr;
                break;
            }
        }
        if (NewArr.length < 2) return false;
        /**检查最高 */
        if (!this.checkUpdateLevel(NewArr[0].level)) {
            return false;
        }
        pool = null;
        return NewArr.slice(0, 2);
    }

    /**获取用户当前提现金额 */
    findGoldCash() {
        let cash = this.userData.coin / this.userData.exchangeRate || 0
        return TextCtr.triggerNumber(cash)
    }
    /**
     * 发送快照
     */
    sendTurretData(call?: Function) {

        if (this.isSendTurretData) {
            console.error("未到发送快照时间;")
            return;
        }
        this.isSendTurretData = true;
        let data: any = {};

        if (this.userData.buyCount > 0 || this.userData.compoundTimes) {
            data.userMapDetail = this.userData.pool;
            this.userData.buyCount = 0;
        }

        if (this.lastData.compoundTimes !== this.userData.compoundTimes && this.userData.compoundTimes > 0) {
            data.compoundTimes = this.userData.compoundTimes;
            this.userData.compoundTimes = 0;
        }
        if (this.lastData.highestBatteryLevel !== this.userData.turretLevel) {
            data.highestBatteryLevel = this.userData.turretLevel;
            this.lastData.highestBatteryLevel = this.userData.turretLevel;
        }
        if (this.userData.termCoin > 0) {
            data.point = this.userData.termCoin;
            this.userData.termCoin = 0;
        }
        if (this.lastData.userBatteryNum !== this.userData.product && this.userData.product > 0) {
            data.userBatteryNum = this.userData.product;
            this.lastData.userBatteryNum = this.userData.product;
        }

        if (this.userData.resistAttackTimes > 0) {
            data.resistAttackTimes = this.userData.resistAttackTimes;
            this.userData.resistAttackTimes = 0;
        }


        XMSDK.trackUserProperties({
            coin_balance: this.userData.coin + "金币",
        });
        this.userData.version += 1;
        data.version = this.userData.version;
        if (JSON.stringify(data) == "{}") {
            return;
        }
        setTimeout(() => {
            this.isSendTurretData = false;
        }, 3000);
        this.getdataStr({
            url: UrlConst.gameLevelReport,
            data,
            success: () => {
                this.isCheckTaskRed = true;
                console.log("上传成功")
                call && call();
            },
            fail: () => {
                console.log("上传失败")
            }
        });
    }

    /**
     * 金币快照
     */

    sendCoinData(call?: Function){

        if(this.isSendCoinData)return;
        this.isSendCoinData = true;
        let data: any = {};
        if (this.userData.termCoin > 0) {
            data.point = this.userData.termCoin;
            this.userData.termCoin = 0;
        }
        this.userData.version += 1;
        data.version = this.userData.version;
        setTimeout(() => {
            this.isSendCoinData = false;
        }, 3000);
        this.getdataStr({
            url: UrlConst.gameLevelReport,
            data,
            success: () => {
                console.log("上传金币成功")
                call && call();
            },
            fail: () => {
                console.log("上传金币失败")
            }
        });

    }

    /**
     * 获取当前等级炮塔的天降金币时间
     */
    GetHeavenTime(): number {

        // let coinData = jsonSingleton.singleton.getJson(NameTs.coinData);
        // //当前最高等级的炮塔
        // let level: number = this.userData.turretLevel;
        // //默认60s
        // let time: number = 60;
        // for (let i = 0; i < coinData.length; i++) {
        //     let item = coinData[i];
        //     if (item.min <= level && item.max >= level) {
        //         time = item.time;
        //         break;
        //     }
        // }

        let time:number = tool.GetRandom(30,60);

        return time;
    }

    /**
     * 获取天降金币的位置 没有符合就null
     */
    GetHeavenPlace(): number {
        //空的位置
        let emptyPlace = tool.GetArrData("level", -1, this.userData.pool, -1);
        if (!emptyPlace) return null;
        //符合的位置
        let conformPlace = tool.GetArrData("state", 1, emptyPlace, -1);
        if (!conformPlace) return null;

        //符合的数组
        let newArr = [];
        for (let i = 0; i < conformPlace.length; i++) {
            let item = conformPlace[i];
            let heavenItem = tool.GetArrData("no", item.no, this.userData.heavenPool);
            let isHaveEmptyBox = heavenItem.no == this.userData.emptyBoxNo;

            if (item.no == heavenItem.no && heavenItem.id == null && !isHaveEmptyBox) {
                newArr.push(item.no);
            }
        }
        //随机一个
        let randomNum = tool.GetRandom(0, newArr.length - 1);
        return newArr[randomNum];

    }

    /**
     * 获取炮弹数据
     */
    GetBulletData(type: number) {
        let data = jsonSingleton.singleton.getJson(NameTs.bulletData);
        return tool.GetArrData("type", type, data);
    }

    /**
     * 获取爆炸名字
     */
    GetBoomName(type: number) {
        let data = jsonSingleton.singleton.getJson(NameTs.bulletData);
        return tool.GetArrData("type", type, data).boom;
    }

    /**
     * 检查是否领过宝箱 
     * 如果符合就输出宝箱id 不符合就null
    */
    checkTreasureShow(): number {
        XMSDK.post({
            url: UrlConst.treasureBox_Isget,
            onSuccess: res => {
                if (res.code === 0 && res.data && res.data.showBox != 1) {       //领取过
                    return null;
                }
                else {
                    let data = jsonSingleton.singleton.getJson(NameTs.treasureData);
                    let treasureId: number = null;
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i];
                        if (item.min <= this.userData.turretLevel && item.max > this.userData.turretLevel) {
                            treasureId = item.id;
                            break;
                        }
                    }
                    if (treasureId) {

                        let checkId = (id) => {
                            return id == treasureId;
                        }
                        let isExist: boolean = this.userData.haveTreasure.some(checkId);

                        if (isExist) {
                            return null;
                        } else {
                            return treasureId;
                        }

                    }
                }
            },
            onFail: err => {

            }
        }
        )
        return null;
    }

    /**
     * 保存宝藏状态
     * @param id id
     */
    saveTreasureData(id: number) {
        let checkId = (item) => {
            return item == id;
        }
        let isExist: boolean = this.userData.haveTreasure.some(checkId);

        if (isExist) {
            console.error("宝藏存在过了");
        } else {
            this.userData.haveTreasure.push(id);
            this.setStorage("haveTreasure", this.userData.haveTreasure);

        }

    }

    /**
     * 存本地数据
     * @param key 键名
     * @param value 值
     */
    setStorage(key: string, value: any) {
        let dataString = JSON.stringify(value);
        //let encrypted = encrypt.encrypt(dataString,this.secretkey,256);
        cc.sys.localStorage.setItem(key, dataString);
    }

    /**
     * 获取本地值
     * @param key 键名
     */
    getStorage(key: string) {
        let cipherText = cc.sys.localStorage.getItem(key);
        if (cipherText == null || cipherText == "" || cipherText == undefined) {
            return null;
        }
        //let value = JSON.parse(encrypt.decrypt(cipherText,this.secretkey,256));
        return JSON.parse(cipherText);
    }

    /**
     * 解锁新地方
     */
    unlockPlace() {

        for (let i = 0; i < this.userData.pool.length; i++) {
            let item = this.userData.pool[i];
            if (item.state == 0) {
                this.userData.pool[i].state = 1;
                console.log("解锁新位置", item.no);
                cc.game.emit(NameTs.Game_Unlock_Place, item.no);
                break;
            }
        }

    }


    /**
     * 
     * @param url 地址
     * @param data 数据
     * @param call 回调
     */
    post(obj: { url: string, data?: any, success?: Function, fail?: Function }) {

        XMSDK.post({
            url: obj.url,
            data: obj.data,
            onSuccess: res => {
                console.log("请求成功" + obj.url, res)
                if (res.code === 0) {
                    obj.success && obj.success(res.data);
                }
                else {
                    obj.fail && obj.fail(false);
                }
            },
            onFail: err => {
                obj.fail && obj.fail(false);
            }
        });

    }


  getdataStr(obj: { url: string, data?: any, success?: Function, fail?: Function }) {

        XMSDK.getdataStr({
            url: obj.url,
            data: obj.data,
            onSuccess: res => {
                console.log("请求成功" + obj.url, res)
                if (res.code === 0) {
                    obj.success && obj.success(res.data);
                }
                else {
                    obj.fail && obj.fail(false);
                }
            },
            onFail: err => {
                obj.fail && obj.fail(false);
            }
        });

    }


    /**
     * 判断是否当天
     */

    chekcToday() {

        let day = new Date().getDate();
        let isDay: boolean = false;
        if (day == this.userData.GetDayTime) {
            isDay = true;
        } else {
            isDay = false;
            this.setStorage(this.localDiary.GetDayTime, day);
        }

        return isDay;
    }

    /**
     * 预加载广告
     * @param pos 位置
     * @param isView 是否为信息流
     */

    preloadAd(pos, isView: boolean = false) {
        if (!this.adPreObj[pos]) {
            this.adPreObj[pos] = true;
            if (isView) {
                AdController.preViewAd(pos);
            } else {
                AdController.preVideoAd(pos);
            }
            console.log("加载" + (isView ? "信息流" : "视频") + pos);
        } else {
            delete this.adPreObj[pos];
            console.log("删除" + (isView ? "信息流" : "视频") + pos + "记录");
        }


    }

    /**
     * 显示空地宝箱
     */
    showEmptyBox() {
        if (this.userData.emptyBoxNo < 0) {
            let location: number = this.checkPool();
            if (!location) {
                console.error("没有位置");
                // TrackMgr.airborne_gold({
                //     activity_state: "金币下发",
                //     distribution_status: false,
                //     failure_reasons: "没有位置"
                // })
                TrackMgr.empty_treasure({
                    activity_state: `宝箱下发`,
                    distribution_status: false,
                    failure_reasons: `当前没有空地；场地上有未开启宝箱`,
                })

                return;
            }
            TrackMgr.empty_treasure({
                activity_state: `宝箱下发`,
                distribution_status: true,
            })

            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: `空降宝箱（未砸开）`
            })

            this.userData.emptyBoxNo = location;
            cc.game.emit(NameTs.Show_Empty_Box);
        }
    }

    /**
     * 获取第一个任务
     */
    getFistTask(call: Function) {
        //任务完成顺序
        let taskOrder1: number[] = [2, 7, 4, 8, 6];
        let taskOrder2: number[] = [1, 2, 3, 4];
        //任务类型 0:日常 1:成就
        let taskType: number = null;
        //符合的任务
        let str = [];

        let checkTask = (arr) => {

            if (taskType == null) {
                call(null, taskType);
                return;
            }

            let order = taskType == 0 ? taskOrder1 : taskOrder2;

            for (let i = 0; i < order.length; i++) {

                for (let j = 0; j < str.length; j++) {

                    if (order[i] == str[j].taskType) {
                        call(str[j], taskType);
                        return;
                    }

                }

            }

        }

        this.getdataStr({
            url: UrlConst.task_day_main,
            success: (res) => {
                if (res.list) {
                    let list = res.list;
                    for (let i = 0; i < list.length; i++) {
                        // let item = list[i];
                        if (list[i].taskType == 2 && this.userData.localCompoundTime == 0) {
                            this.userData.localCompoundTime = list[i].userTaskValue;
                        }
                        if (list[i].buttonType !== 4 && list[i].taskType !== 1) {
                            taskType = 0;
                            str.push(list[i]);
                            //     break;
                        }
                    }
                    if (taskType == null) {
                        str = [];
                        this.getdataStr({
                            url: UrlConst.achievement_main,
                            success: (res) => {
                                if (res && res.list) {
                                    let list = res.list;
                                    for (let i = 0; i < list.length; i++) {
                                        if (list[i].buttonType !== 4) {
                                            taskType = 1;
                                            // break;
                                            str.push(list[i]);
                                        }
                                    }
                                    checkTask(str);
                                }
                            }
                        });
                    } else {
                        checkTask(str);
                    }

                }
            }
        });

    }

    /**
     * 发送看视频获取炮塔记录
     */
    sendTurretNum() {

        this.post({
            url: UrlConst.watchVideoAddBattery,
            success: () => {
                console.log("记录看视频获得炮塔任务")
                cc.game.emit(NameTs.Game_Task_updata);
            },
            fail: () => {
                console.log("记录看视频获得炮塔任务失败")
            }
        })

    }
    setTempParm(name: string, value: any) {
        this.tempParm[name] = value
    }
    getTempParm(name: string) {
        return this.tempParm[name]
    }

	getMapdata(bigmap)
	{
		//jsonArr.gkData
		let data = jsonSingleton.singleton.getJson(NameTs.gkData);
		//console.log(bigmap + " jsonArr.gkData ----------------------------- :" +  JSON.stringify( data ) )
		let nwdata = []
		
		for (let i=0;i<data.length;i++) {
			//console.log("-------# " + JSON.stringify(data[i]) )
			if( data[i]["levelNo"] == bigmap+"")
			{
				nwdata.push(data[i]))
			}
		}
		
		return nwdata
	}

    /**
     * 是否为b用户
     */
    checkTestB(name: string): boolean {
        let user:string = AssistCtr.isATest()?"A":"B";
        return this.AB_Test[name][user]=="true"?true:false;
    }

    /**离线增加炮塔次数*/
    offlineTurretProduct() {
        //当前时间
    let nowTime: number = new Date().getTime();
        //上一次时间
        let lastTime: number = this.getStorage(this.localDiary.offlineTime) || new Date().getTime();
        //每30秒一个 换算
        let time: number = Math.floor((nowTime - lastTime) / 1000 / 30);
        console.log('离线增加' + time + "个炮塔,离线时间为：" + (nowTime - lastTime) / 1000);
        if (time <= 0) {
            return;
        }
        if (this.userData.product + time > 20) {
            this.userData.product = this.userData.product > 20 ? this.userData.product : 20;
        } else {
            this.productTurret(time);
        }
        this.setStorage(this.localDiary.offlineTime, null);
    }


    
}


export default new util();