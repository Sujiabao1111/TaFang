"use strict";
cc._RF.push(module, 'c6d85lfwEBGCZh73JG0M+ta', 'util');
// Script/util/util.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var jsonSingleton_1 = require("../base/jsonSingleton");
var tool_1 = require("./tool");
var TextCtr_1 = require("../Assist/TextCtr");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var AssistCtr_1 = require("../Assist/AssistCtr");
// import encrypt = require('encryptjs');
var util = /** @class */ (function () {
    function util() {
        /**需要加载的json列表 */
        this.jsonArr = [
            NameTs_1.default.turretData,
            NameTs_1.default.mapData,
            NameTs_1.default.monsterData,
            NameTs_1.default.buyData,
            NameTs_1.default.propData,
            NameTs_1.default.coinData,
            NameTs_1.default.treasureData,
            NameTs_1.default.monsterIdData,
            NameTs_1.default.gkData,
            NameTs_1.default.bulletData
        ];
        /**本地字典 */
        this.localDiary = {
            haveTreasure: "haveTreasure",
            noviceGuide: "noviceGuide",
            GetTurretNum: "GetTurretNum",
            GetDayTime: "GetDayTime",
            autoProp: "autoProp",
            unlocking_time: "unlocking_time",
            synthesis_times: "synthesis_times",
            propConfig: "propConfig",
            offlineTime: "offlineTime",
            onlineTime: "onlineTime",
            randomRedTimeNum: "randomRedTimeNum",
            earnProgress: "earnProgress",
        };
        this.secretkey = 'open_sesame'; // 加密密钥
        this.GlobalMap = new Map(); //用户储存某些东西
        this.MonsterMap = new Map(); //储存怪兽东西
        this.savingPotLock = false; //是否解锁了金币飞入存钱罐
        this.Opening_times_level = 0; //开启次数
        this.isCheckTaskRed = true; //是否检测首页任务红点
        this.adPreObj = {}; //预加载广告的
        /**用户数据 */
        this.userData = {
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
                { type: 1, num: 0, time: null, use: faceTs_1.propState.end },
                /**电击*/
                { type: 2, num: 0, time: null, use: faceTs_1.propState.end },
                /**护罩*/
                { type: 3, num: 0, time: null, use: faceTs_1.propState.end },
                /**清屏*/
                { type: 4, num: 0, time: null, use: faceTs_1.propState.end },
                /**自动合成*/
                { type: 5, num: 0, time: null, use: faceTs_1.propState.end },
                /**增能*/
                { type: 6, num: 0, time: null, use: faceTs_1.propState.end }
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
                reward: 0,
                multipleReward: 0
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
            savingPotNum: 0,
        };
        /**AB测试 */
        this.AB_Test = {
            lock_turret_test: "B",
            heaven_coin_test: "B",
            new_hand_test: "B",
        };
        //观看视频次数
        this.advertising_num = 0;
        //看视频获取道具总次数
        this.props_number = 0;
        //游戏时间
        this.gameTime = 0;
        //道具使用次数
        this.gamePropNum = 0;
        //点击了暂停
        this.isStop = false;
        //用户行为
        this.behaviorRewardVoList = null;
        //过关奖励
        this.gameLevelPassRewardVoList = [];
        //下一关的奖励
        this.gameLevelPassRewardNextVoList = [];
        //关卡怪物配置
        this.mapConfig = null;
        //道具配置表
        this.propData = null;
        //道具具体数值
        this.propConfig = null;
        //在线时间长度
        this.online_time = 600;
        /**天降金币点击次数*/
        this.heavenClickNum = 1;
        /**是否到时间发送数据3秒 */
        this.isSendTurretData = false;
        /**是否到时间发送数据3秒 */
        this.isSendCoinData = false;
        /**双倍收益 */
        this.doubleEarn = { use: faceTs_1.propState.end, time: null };
        /**上一次上传的数据 */
        this.lastData = {
            compoundTimes: null,
            highestBatteryLevel: null,
            point: null,
            userBatteryNum: null,
            userMapDetail: [] //池塘数据
        };
        //音效配置
        this.soundSet = {
            bgm: 1,
            sound: 1 //普通音效
        };
        this.mapSize = {
            width: 750,
            grid: null,
            startGridPos: null //初始位置
        }; //地图大小
        //存储当前关卡的炮塔位置和回收的位置
        this.levelMap = [];
        //存储当前关卡的怪兽
        this.levelMonsterArr = [];
        //当前游戏状态
        this.levelState = faceTs_1.gameState.default;
        //购买次数
        this.buyCount = 0;
        //今天是否签到
        this.isOkSign = false;
        //是否有在线奖励红包
        this.isSignOnLineRed = false;
        //距离上次获得随机红包时间
        this.upTurretRandomRedTime = 0;
        //当前在线时间
        this.onlineTimeNum = 0;
        //随机红包时间
        this.randomRedTimeNum = 60;
        //天降金币的视频数量
        this.existVideoCoinNum = 0;
        //临时变量
        this.tempParm = {};
    }
    /**
     * 检查池塘哪个位置是空的
     */
    util.prototype.checkPool = function () {
        var loaction = null; //位置
        for (var i = 0; i < this.levelMap.length; i++) {
            var item = this.levelMap[i];
            var data = this.GetPoolData(item.no);
            var heavenItem = tool_1.default.GetArrData("no", item.no, this.userData.heavenPool);
            if (data && data.level == -1 && data.state == 1 && heavenItem.id == null) {
                if (item.no != this.userData.emptyBoxNo) {
                    loaction = item.no;
                    break;
                }
            }
        }
        return loaction;
    };
    util.prototype.setInt = function (_key, _value) {
        cc.sys.localStorage.setItem(_key, _value.toString());
    };
    util.prototype.getInt = function (_key, def) {
        var ds = cc.sys.localStorage.getItem(_key);
        if (ds == "" || ds == null) {
            this.setInt(_key, def);
            ds = def;
        }
        return Number(ds);
    };
    util.prototype.getString = function (_key) {
        return cc.sys.localStorage.getItem(_key);
    };
    util.prototype.setString = function (_key, _value) {
        cc.sys.localStorage.setItem(_key, _value.toString());
    };
    util.prototype.inidata = function () {
        //金币
        this.userData.version = 548;
        this.doubleEarn.use = 0;
        this.doubleEarn.time = 0;
        this.userData.coin = this.getInt("goldhb", 0);
        this.userData.exchangeRate = this.getInt("exchangeRate", 10000);
        this.userData.product = this.getInt("product", 40);
        this.userData.customs.big = this.getInt("customsbig", 1);
        this.userData.customs.small = this.getInt("customssmall", 1);
        this.userData.newUser = true; //this.getInt("newuser",1)==1?true:false;
        this.userData.turretLevel = this.getInt("turretLevel", 1);
        var psdd = this.getString("mappool");
        if (psdd == "" || psdd == null) {
            this.initPool();
            var dds = JSON.stringify(this.userData.pool);
            this.setString("mappool", dds);
        }
        else {
            this.userData.pool = JSON.parse(psdd);
            this.repairPool();
        }
    };
    util.prototype.savedata = function () {
        this.setInt("goldhb", this.userData.coin);
        this.setInt("exchangeRate", this.userData.exchangeRate);
        this.setInt("product", this.userData.product);
        this.setInt("customsbig", this.userData.customs.big);
        this.setInt("customssmall", this.userData.customs.small);
        this.userData.newUser = true; //this.getInt("newuser",1)==1?true:false;
        this.setInt("turretLevel", this.userData.turretLevel);
        var dds = JSON.stringify(this.userData.pool);
        this.setString("mappool", dds);
    };
    //判断是不是签到今天
    util.prototype.canSinge = function () {
        var canget = true;
        var d = new Date();
        var dats = ["0", "0", "0", "0", "0", "0", "0"];
        var dd = this.getString("singdada");
        if (dd == "" || dd == null || dd == undefined) {
            this.setString("singdada", JSON.stringify(dats));
            //,JSON.stringify(表名)
        }
        else {
            dats = JSON.parse(dd);
        }
        var resrte = 0;
        for (var i = 0; i < 7; i++) {
            if (dats[i] == "0") {
                resrte = 1;
            }
        }
        if (resrte == 0) {
            dats = ["0", "0", "0", "0", "0", "0", "0"];
            this.setString("singdada", JSON.stringify(dats));
        }
        var tdstr = d.getFullYear() + "" + d.getMonth() + "" + d.getDate();
        //console.log("sing :  " +tdstr );
        for (var i = 0; i < 7; i++) {
            if (tdstr == dats[i]) {
                canget = false;
            }
        }
        return !canget;
    };
    util.prototype.singlen = function () {
        var dd = this.getString("singdada");
        var dats = JSON.parse(dd);
        var index = 0;
        for (var i = 0; i < 7; i++) {
            if (dats[i] != "0") {
                index += 1;
            }
        }
        return index;
    };
    util.prototype.singtoday = function () {
        var dd = this.getString("singdada");
        var dats = JSON.parse(dd);
        var d = new Date();
        var tdstr = d.getFullYear() + "" + d.getMonth() + "" + d.getDate();
        var index = 0;
        for (var i = 0; i < 7; i++) {
            if (dats[i] == "0") {
                dats[i] = tdstr;
                index = i;
                i = 8;
            }
        }
        this.setString("singdada", JSON.stringify(dats));
        return index;
    };
    /**
     * 用于新手，初始化用户数据
     */
    util.prototype.initPool = function () {
        for (var i = 1; i < 17; i++) {
            //初始化池塘
            this.userData.pool.push({
                no: i,
                level: i == 1 ? 1 : -1,
                state: 1 //默认前8个解锁
            });
        }
    };
    /**修复旧数据*/
    util.prototype.repairPool = function () {
        for (var i = 0; i < this.userData.pool.length; i++) {
            if (this.userData.pool[i].state == 0) {
                this.userData.pool[i].state = 1;
            }
        }
    };
    /**
     * 初始化金币位置
     */
    util.prototype.initHeavenPool = function () {
        for (var i = 1; i < 17; i++) {
            //初始化金币池塘
            this.userData.heavenPool.push({
                no: i,
                id: null,
                value: null,
            });
        }
    };
    /**
     * 获取炮台的数据
     * @param level 等级
     */
    util.prototype.GetTurretData = function (level) {
        var data = null;
        var turretData = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.turretData);
        data = tool_1.default.deepClone(tool_1.default.GetArrData("level", level, turretData));
        return data;
    };
    /**
     * 保存一下池塘数据
     * @param id 位置
     * @param level 等级 null就是删除
     */
    util.prototype.savePool = function (id, level) {
        if (level === void 0) { level = null; }
        // let isExist:number = null;
        for (var i = 0; i < this.userData.pool.length; i++) {
            var item = this.userData.pool[i];
            if (this.userData.pool[i].no == id) {
                if (level) {
                    item.level = level;
                }
                else {
                    item.level = -1;
                }
                break;
            }
        }
    };
    /**
     * 获取行为奖励
     * @param type 1-第一次解锁新炮塔，2-消灭怪兽，3-解锁炮塔 4-完成关卡 5.合成
     */
    util.prototype.GetBehaviorRewardVo = function (type) {
        //console.log("-------123-------behaviorRewardVoList : " + JSON.stringify(this.behaviorRewardVoList) )
        return tool_1.default.GetArrData("type", type, this.behaviorRewardVoList).reward;
    };
    util.prototype.getnowmapdata = function () {
        this.mapConfig = this.getMapdata(this.userData.customs.big);
    };
    /**
     * 保存一下金币池塘数据
     * @param no 位置
     * @param id 金币id null就是删除
     * @param value 多少值 null就是删除
     */
    util.prototype.saveHeavenPool = function (no, id, value) {
        if (id === void 0) { id = null; }
        if (value === void 0) { value = null; }
        // let isExist:number = null;
        for (var i = 0; i < this.userData.heavenPool.length; i++) {
            var item = this.userData.heavenPool[i];
            if (this.userData.heavenPool[i].no == no) {
                if (value || id) {
                    item.id = id;
                    item.value = value;
                }
                else {
                    item.id = null;
                    item.value = null;
                }
                break;
            }
        }
    };
    /**
     * 获取金币池塘的有多少个
     */
    util.prototype.getHeavenPool = function () {
        var num = 0;
        for (var i = 0; i < this.userData.heavenPool.length; i++) {
            // let item = this.userData.heavenPool[i];
            if (this.userData.heavenPool[i].id) {
                num++;
            }
        }
        return num;
    };
    /**
     * 检查天降金币这个位置是否为有东西
     * @param no 位置
     */
    util.prototype.checkHeavenPool = function (no) {
        var isExist = false;
        for (var i = 0; i < this.userData.heavenPool.length; i++) {
            var item = this.userData.heavenPool[i];
            if (this.userData.heavenPool[i].no == no) {
                if (item.id) {
                    isExist = true;
                }
                break;
            }
        }
        return isExist;
    };
    /**
     * 升级
     * 返回是否是新等级
     * @param level 等级
     */
    util.prototype.upLevel = function (level) {
        if (level > this.userData.turretLevel) {
            this.userData.turretLevel = level;
            return true;
        }
        return false;
    };
    /**
     * 获取当前关卡怪兽配置
     */
    util.prototype.GetCustomsMonsterInfo = function () {
        var mapData = this.getMapdata(this.userData.customs.big);
        //console.log("GetCustomsMonsterInfo : "+ JSON.stringify(mapData))
        // let mapData = jsonSingleton.singleton.getJson(NameTs.mapData);
        //返回数据
        var data = mapData[this.userData.customs.small - 1];
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
        var Arr = [];
        data = data.levelConfig.split("+");
        for (var i = 0; i < data.length; i++) {
            var item = data[i].split("-");
            var id = item[0];
            var num = item[1];
            for (var j = 0; j < num; j++) {
                Arr.push(id);
            }
        }
        return Arr;
    };
    /**
     * 获取当前关卡地图配置
     */
    util.prototype.GetCustomsMap = function () {
        var mapData = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.mapData);
        //返回数据
        var data = tool_1.default.GetArrData("id", 1, mapData);
        //console.log("--------GetCustomsMap----------:map : "+ mapData )
        return data;
    };
    /**
     * 通过位置来获取用户数据
     * @param loaction 哪个
     */
    util.prototype.GetPoolData = function (loaction) {
        var data = null;
        data = tool_1.default.GetArrData("no", loaction, this.userData.pool);
        return data;
    };
    /**
     * 通过位置来获取Map数据
     * @param loaction 哪个
     */
    util.prototype.GetPlaceData = function (loaction) {
        var data = null;
        data = tool_1.default.GetArrData("no", loaction, this.levelMap);
        return data;
    };
    /**
     * 获取怪兽数据
     * @param no 等级
     */
    util.prototype.GetMonsterData = function (level) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.monsterData);
        return tool_1.default.GetArrData("no", level, data);
    };
    /**检查最高级别的炮塔时是否超过两个 */
    util.prototype.chekPoolHaveTwo = function () {
        var level = this.userData.turretLevel;
        var num = 0;
        for (var i = 0; i < this.userData.pool.length; i++) {
            var item = this.userData.pool[i];
            if (item.level == level) {
                num++;
            }
        }
        return num >= 2;
    };
    /**
     * 获取怪兽颜色
     * @param level 等级
     */
    util.prototype.GetMonsterColor = function (level) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.monsterData);
        return tool_1.default.GetArrData("no", level, data).color;
    };
    /**
     * 获取关卡怪兽id
     * @param id id
     */
    util.prototype.GetMonsterIdData = function (id) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.monsterIdData);
        return tool_1.default.GetArrData("id", id, data);
    };
    /**
     * 获取地图的位置
     * @param x 横向
     * @param y 竖向
     */
    util.prototype.GetMapPos = function (x, y) {
        var pos = cc.v2();
        pos.x = this.mapSize.startGridPos.x + x * this.mapSize.grid;
        pos.y = this.mapSize.startGridPos.y - y * this.mapSize.grid;
        return pos;
    };
    /**
     * 设置当前关卡 距离终点最近的怪兽
     * @param id 怪兽id
     * @param num 剩余多少步
     */
    util.prototype.setLevelMonsterData = function (id, num) {
        var isExist = tool_1.default.setArrData("id", id, "num", num, this.levelMonsterArr);
        if (!isExist) {
            this.levelMonsterArr.push({ id: id, num: num });
        }
        var sortFn = function (a, b) {
            var before = a.num - b.num;
            if (a.num == b.num) {
                before = a.id - b.id;
            }
            return before;
        };
        this.levelMonsterArr.sort(sortFn);
    };
    /**
     * 删除当前关卡 的怪物
     * @param id 第几个
     */
    util.prototype.delectLevelMonster = function (id) {
        var isSuccess = false;
        for (var i = 0; i < this.levelMonsterArr.length; i++) {
            if (this.levelMonsterArr[i].id == id) {
                this.levelMonsterArr.splice(i, 1);
                isSuccess = true;
                break;
            }
        }
    };
    /**
     * 获取最近终点的怪兽
     */
    util.prototype.getFirstMonster = function () {
        //默认第一个
        return this.levelMonsterArr[0];
    };
    /**
     * 获取最靠近自己的怪兽
     * @param pos 自己位置
     * @param distanceNum 优先射程距离
     */
    util.prototype.getCloseMonster = function (pos, distanceNum) {
        if (distanceNum === void 0) { distanceNum = 250; }
        //最靠近自己的
        var closeMonsetr = { id: null, distance: null, num: null, isClose: false };
        for (var i = 0; i < this.levelMonsterArr.length; i++) {
            var name = this.userData.customs.big + "-" + this.userData.customs.small + "_Monster_" + this.levelMonsterArr[i].id;
            var target = this.MonsterMap.get(name);
            if (!target)
                continue;
            var targetPos = target.getPosition();
            var distance = targetPos.sub(pos).mag();
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
        }
        else {
            var str = this.getFirstMonster();
            if (!str)
                return;
            str.isClose = false;
            return str;
        }
        // console.log(closeMonsetr,'closeMonsetr')
    };
    /**
     * 验证是否还在靠近怪兽
     * @param data {pos:自己的位置,id:}
     */
    util.prototype.checkMonsterClose = function (data) {
        var name = this.userData.customs.big + "-" + this.userData.customs.small + "_Monster_" + data.id;
        var target = this.MonsterMap.get(name);
        if (!target)
            return false;
        var targetPos = target.getPosition();
        var distance = targetPos.sub(data.pos).mag();
        return distance < data.distanceNum;
    };
    /**
     * 获取相同的等级的炮台
     * @param level 等级
     */
    util.prototype.getPoolSameLevelTurret = function (level) {
        var sameLevel = tool_1.default.GetArrData("level", level, this.userData.pool, -1);
        return sameLevel;
    };
    /**
     * 保存通关信息，并且+1
     */
    util.prototype.saveCustomLevel = function () {
        // let mapData = this.mapConfig;
        // if(this.mapConfig.length<this.userData.customs.small+1){
        //     console.log("超过了")
        //     return;
        // }
        var IsUp = false; //是否升级
        if (this.mapConfig.length < this.userData.customs.small + 1) {
            this.getdataStr({
                url: UrlConst_1.UrlConst.gameLevelCompleted,
                data: { level: this.userData.customs.big },
                success: function (res) {
                    // this.gameLevelPassRewardVoList = [];
                    // for (let i = 0; i < res.rewardList.length; i++) {
                    //     this.gameLevelPassRewardVoList.push(res.rewardList[i]);
                    // }
                    console.log("完成关卡上报!");
                }
            });
            this.userData.customs.big += 1;
            this.userData.customs.small = 1;
            this.setInt("customsbig", this.userData.customs.big);
            this.setInt("customssmall", this.userData.customs.small);
            console.log("超过了小关卡的的长度,小关卡变为1，大关卡+1");
            IsUp = true;
        }
        else {
            this.userData.customs.small += 1;
            this.setInt("customssmall", this.userData.customs.small);
        }
        return IsUp;
    };
    /**
     * 产能
     * @param num 加多少个(默认1)
     * @param type 普通的0（只能增加20如果超过则不增加）
     */
    util.prototype.productTurret = function (num, type) {
        if (num === void 0) { num = 1; }
        if (type === void 0) { type = 0; }
        this.userData.product += num;
        if (type == 0) {
            this.addProduct(0);
        }
    };
    /**
     * 检查是否能升级
     * @param level 等级
    */
    util.prototype.checkUpdateLevel = function (level) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.turretData);
        if (data.length < level) {
            return false;
        }
        return true;
    };
    /**
     * 增加多少个产能或者减少
     * @param num 数量
     */
    util.prototype.addProduct = function (num) {
        this.userData.product += num;
        // if(this.userData.product+1>gameNumerical.ProductMax){
        //     this.userData.product = gameNumerical.ProductMax;
        // }else 
        if (this.userData.product < 0) {
            this.userData.product = 0;
        }
        cc.game.emit(NameTs_1.default.Game_View_UserDataUpdata, faceTs_1.updateType.product);
    };
    /**
     * 增加多少个金币或者减少
     * @param num 数量
     */
    util.prototype.addCoin = function (num) {
        this.userData.coin += parseInt(num);
        if (this.userData.coin < 0) {
            this.userData.coin = 0;
        }
        this.savedata();
        cc.game.emit(NameTs_1.default.Game_Wallet_AddCoin, num);
        cc.game.emit(NameTs_1.default.Game_View_UserDataUpdata, faceTs_1.updateType.coin);
    };
    /**期间加多少金币
     * @param num 数值
    */
    util.prototype.addTermCoin = function (num) {
        this.userData.termCoin += num;
    };
    /**
     * 获取购买的等级并返回等级
     */
    util.prototype.getBuyRandomLevel = function () {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.buyData);
        //单独的等级
        var level = null;
        var smallData = { num: 0, level: 0 };
        var str = tool_1.default.GetArrData("level", this.userData.turretLevel, data);
        var randomLevel = null;
        if (!str) {
            console.log("找不到~" + this.userData.turretLevel + "级的炮塔购买信息");
            str = data[data.length - 1];
        }
        else {
            var arr = JSON.parse(str.arr);
            randomLevel = this.GetWeigthLevel(arr);
        }
        for (var i = 0; i < this.userData.pool.length; i++) {
            var item = this.userData.pool[i];
            if (item.level == -1)
                continue;
            if (smallData.level == 0 || smallData.level > item.level) {
                smallData.level = item.level;
                smallData.num = 1;
                continue;
            }
            else if (smallData.level == item.level) {
                smallData.num += 1;
            }
        }
        if (smallData.num == 1 && randomLevel >= smallData.level) {
            level = smallData.level;
            console.log("有单独的炮塔", level);
        }
        else {
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
    };
    /**
    * 通过权重获取等级
    */
    util.prototype.GetWeigthLevel = function (data) {
        var arr = tool_1.default.deepClone(data);
        var str = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            for (var j = 0; j < item.weigth; j++) {
                str.push(item.id);
            }
        }
        var random = tool_1.default.GetRandom(0, str.length - 1);
        var id = str[random];
        if (id == null) {
            id = arr[0].id;
        }
        return Number(id);
    };
    /**
     * 检测在哪里
     * @param pos 点 基于中心点cc.v2
     * @param call 回调
     */
    util.prototype.checkTouchPool = function (pos, call) {
        var data = null;
        for (var i = 0; i < this.levelMap.length; i++) {
            var item = this.levelMap[i];
            //格子的位置
            var str = {
                x: null,
                y: null,
                width: null,
                height: null,
            };
            if (item.type == faceTs_1.thingType.turret) {
                str.x = this.mapSize.startGridPos.x + item.x * this.mapSize.grid;
                str.y = this.mapSize.startGridPos.y - item.y * this.mapSize.grid;
                str.width = this.mapSize.grid;
                str.height = this.mapSize.grid;
            }
            else if (item.type == faceTs_1.thingType.recycle) {
                str.x = item.pos.x;
                str.y = item.pos.y;
                str.width = item.width;
                str.height = item.height;
            }
            // let itemX:number = util.mapSize.startGridPos.x+item.x*util.mapSize.grid;
            // let itemY:number = util.mapSize.startGridPos.y-item.y*util.mapSize.grid;
            if (str.y + str.height / 2 >= pos.y && pos.y >= str.y - str.height / 2 &&
                str.x + str.width / 2 >= pos.x && pos.x >= str.x - str.width / 2) {
                if (item.type == faceTs_1.thingType.recycle) {
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
    };
    /**
     * 判断是否在存在
     * @param no 第几个
     */
    util.prototype.checkNoExist = function (no) {
        var data = tool_1.default.GetArrData("no", no, this.userData.pool);
        if (data.level == -1 && data.state == 1) {
            return true;
        }
        return false;
    };
    /**
     * 获取用户道具数量
     * @param type 类型
     */
    util.prototype.GetPropNum = function (type) {
        var data = tool_1.default.GetArrData("type", type, this.userData.prop);
        return data.num;
    };
    /**
     * 获取道具持续时间
     * @param type 类型
     */
    util.prototype.GetPropTime = function (type) {
        var propData = this.propConfig;
        console.log(propData, 'propData');
        var data = tool_1.default.GetArrData("type", type, propData);
        return Number(data.time);
    };
    /**
     * 使用哪个类型道具
     * @param type 类型道具
     */
    util.prototype.UseProp = function (type) {
        var num = Number(type) - 1;
        this.userData.prop[num].time = this.GetPropTime(type);
        this.userData.prop[num].use = faceTs_1.propState.start;
        this.userData.prop[num].num -= 1;
        if (type == faceTs_1.propType.cls) { //清屏            
            cc.game.emit(NameTs_1.default.Tool_Effect_Name.Game_Prop_Cls);
        }
        else if (type == faceTs_1.propType.auto) { //自动合成
            cc.game.emit(NameTs_1.default.Tool_Effect_Name.Game_Prop_Atuo);
        }
        else if (type == faceTs_1.propType.shock) { //电击
            cc.game.emit(NameTs_1.default.Tool_Effect_Name.Game_Prop_Shock);
        }
        else if (type == faceTs_1.propType.shield) { //护盾
            cc.game.emit(NameTs_1.default.Tool_Effect_Name.Game_Prop_Shield);
        }
        else if (type == faceTs_1.propType.frozen) { //冰冻
            cc.game.emit(NameTs_1.default.Tool_Effect_Name.Game_Prop_Frozen);
        }
        cc.game.emit(NameTs_1.default.Game_Tool_Use, type);
        cc.game.emit(NameTs_1.default.Game_PropItem_Update);
        console.log("使用成功", type, this.userData.prop[num], faceTs_1.propState.start);
    };
    /**
     * 获取当前最高等级的炮塔数组2个以上的
     */
    util.prototype.GetTurretAuto = function () {
        var pool = tool_1.default.deepClone(this.userData.pool);
        if (pool.length < 2)
            return false;
        var sortFn = function (a, b) {
            var num = b.level - a.level;
            return num;
        };
        pool = pool.sort(sortFn);
        var NewArr = [];
        for (var i = 0; i < pool.length; i++) {
            var arr = tool_1.default.GetArrData("level", pool[i].level, pool, -1);
            if (arr.length > 1 && this.checkUpdateLevel(arr[0].level + 1)) {
                NewArr = arr;
                break;
            }
        }
        if (NewArr.length < 2)
            return false;
        /**检查最高 */
        if (!this.checkUpdateLevel(NewArr[0].level)) {
            return false;
        }
        pool = null;
        return NewArr.slice(0, 2);
    };
    /**获取用户当前提现金额 */
    util.prototype.findGoldCash = function () {
        var cash = this.userData.coin / this.userData.exchangeRate || 0;
        return TextCtr_1.TextCtr.triggerNumber(cash);
    };
    /**
     * 发送快照
     */
    util.prototype.sendTurretData = function (call) {
        var _this = this;
        if (this.isSendTurretData) {
            console.error("未到发送快照时间;");
            return;
        }
        this.isSendTurretData = true;
        var data = {};
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
        XMSDK_1.default.trackUserProperties({
            coin_balance: this.userData.coin + "金币",
        });
        this.userData.version += 1;
        data.version = this.userData.version;
        if (JSON.stringify(data) == "{}") {
            return;
        }
        setTimeout(function () {
            _this.isSendTurretData = false;
        }, 3000);
        this.getdataStr({
            url: UrlConst_1.UrlConst.gameLevelReport,
            data: data,
            success: function () {
                _this.isCheckTaskRed = true;
                console.log("上传成功");
                call && call();
            },
            fail: function () {
                console.log("上传失败");
            }
        });
    };
    /**
     * 金币快照
     */
    util.prototype.sendCoinData = function (call) {
        var _this = this;
        if (this.isSendCoinData)
            return;
        this.isSendCoinData = true;
        var data = {};
        if (this.userData.termCoin > 0) {
            data.point = this.userData.termCoin;
            this.userData.termCoin = 0;
        }
        this.userData.version += 1;
        data.version = this.userData.version;
        setTimeout(function () {
            _this.isSendCoinData = false;
        }, 3000);
        this.getdataStr({
            url: UrlConst_1.UrlConst.gameLevelReport,
            data: data,
            success: function () {
                console.log("上传金币成功");
                call && call();
            },
            fail: function () {
                console.log("上传金币失败");
            }
        });
    };
    /**
     * 获取当前等级炮塔的天降金币时间
     */
    util.prototype.GetHeavenTime = function () {
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
        var time = tool_1.default.GetRandom(30, 60);
        return time;
    };
    /**
     * 获取天降金币的位置 没有符合就null
     */
    util.prototype.GetHeavenPlace = function () {
        //空的位置
        var emptyPlace = tool_1.default.GetArrData("level", -1, this.userData.pool, -1);
        if (!emptyPlace)
            return null;
        //符合的位置
        var conformPlace = tool_1.default.GetArrData("state", 1, emptyPlace, -1);
        if (!conformPlace)
            return null;
        //符合的数组
        var newArr = [];
        for (var i = 0; i < conformPlace.length; i++) {
            var item = conformPlace[i];
            var heavenItem = tool_1.default.GetArrData("no", item.no, this.userData.heavenPool);
            var isHaveEmptyBox = heavenItem.no == this.userData.emptyBoxNo;
            if (item.no == heavenItem.no && heavenItem.id == null && !isHaveEmptyBox) {
                newArr.push(item.no);
            }
        }
        //随机一个
        var randomNum = tool_1.default.GetRandom(0, newArr.length - 1);
        return newArr[randomNum];
    };
    /**
     * 获取炮弹数据
     */
    util.prototype.GetBulletData = function (type) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.bulletData);
        return tool_1.default.GetArrData("type", type, data);
    };
    /**
     * 获取爆炸名字
     */
    util.prototype.GetBoomName = function (type) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.bulletData);
        return tool_1.default.GetArrData("type", type, data).boom;
    };
    /**
     * 检查是否领过宝箱
     * 如果符合就输出宝箱id 不符合就null
    */
    util.prototype.checkTreasureShow = function () {
        var _this = this;
        XMSDK_1.default.post({
            url: UrlConst_1.UrlConst.treasureBox_Isget,
            onSuccess: function (res) {
                if (res.code === 0 && res.data && res.data.showBox != 1) { //领取过
                    return null;
                }
                else {
                    var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.treasureData);
                    var treasureId_1 = null;
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        if (item.min <= _this.userData.turretLevel && item.max > _this.userData.turretLevel) {
                            treasureId_1 = item.id;
                            break;
                        }
                    }
                    if (treasureId_1) {
                        var checkId = function (id) {
                            return id == treasureId_1;
                        };
                        var isExist = _this.userData.haveTreasure.some(checkId);
                        if (isExist) {
                            return null;
                        }
                        else {
                            return treasureId_1;
                        }
                    }
                }
            },
            onFail: function (err) {
            }
        });
        return null;
    };
    /**
     * 保存宝藏状态
     * @param id id
     */
    util.prototype.saveTreasureData = function (id) {
        var checkId = function (item) {
            return item == id;
        };
        var isExist = this.userData.haveTreasure.some(checkId);
        if (isExist) {
            console.error("宝藏存在过了");
        }
        else {
            this.userData.haveTreasure.push(id);
            this.setStorage("haveTreasure", this.userData.haveTreasure);
        }
    };
    /**
     * 存本地数据
     * @param key 键名
     * @param value 值
     */
    util.prototype.setStorage = function (key, value) {
        var dataString = JSON.stringify(value);
        //let encrypted = encrypt.encrypt(dataString,this.secretkey,256);
        cc.sys.localStorage.setItem(key, dataString);
    };
    /**
     * 获取本地值
     * @param key 键名
     */
    util.prototype.getStorage = function (key) {
        var cipherText = cc.sys.localStorage.getItem(key);
        if (cipherText == null || cipherText == "" || cipherText == undefined) {
            return null;
        }
        //let value = JSON.parse(encrypt.decrypt(cipherText,this.secretkey,256));
        return JSON.parse(cipherText);
    };
    /**
     * 解锁新地方
     */
    util.prototype.unlockPlace = function () {
        for (var i = 0; i < this.userData.pool.length; i++) {
            var item = this.userData.pool[i];
            if (item.state == 0) {
                this.userData.pool[i].state = 1;
                console.log("解锁新位置", item.no);
                cc.game.emit(NameTs_1.default.Game_Unlock_Place, item.no);
                break;
            }
        }
    };
    /**
     *
     * @param url 地址
     * @param data 数据
     * @param call 回调
     */
    util.prototype.post = function (obj) {
        XMSDK_1.default.post({
            url: obj.url,
            data: obj.data,
            onSuccess: function (res) {
                console.log("请求成功" + obj.url, res);
                if (res.code === 0) {
                    obj.success && obj.success(res.data);
                }
                else {
                    obj.fail && obj.fail(false);
                }
            },
            onFail: function (err) {
                obj.fail && obj.fail(false);
            }
        });
    };
    util.prototype.getdataStr = function (obj) {
        XMSDK_1.default.getdataStr({
            url: obj.url,
            data: obj.data,
            onSuccess: function (res) {
                console.log("请求成功" + obj.url, res);
                if (res.code === 0) {
                    obj.success && obj.success(res.data);
                }
                else {
                    obj.fail && obj.fail(false);
                }
            },
            onFail: function (err) {
                obj.fail && obj.fail(false);
            }
        });
    };
    /**
     * 判断是否当天
     */
    util.prototype.chekcToday = function () {
        var day = new Date().getDate();
        var isDay = false;
        if (day == this.userData.GetDayTime) {
            isDay = true;
        }
        else {
            isDay = false;
            this.setStorage(this.localDiary.GetDayTime, day);
        }
        return isDay;
    };
    /**
     * 预加载广告
     * @param pos 位置
     * @param isView 是否为信息流
     */
    util.prototype.preloadAd = function (pos, isView) {
        if (isView === void 0) { isView = false; }
        if (!this.adPreObj[pos]) {
            this.adPreObj[pos] = true;
            if (isView) {
                AdController_1.default.preViewAd(pos);
            }
            else {
                AdController_1.default.preVideoAd(pos);
            }
            console.log("加载" + (isView ? "信息流" : "视频") + pos);
        }
        else {
            delete this.adPreObj[pos];
            console.log("删除" + (isView ? "信息流" : "视频") + pos + "记录");
        }
    };
    /**
     * 显示空地宝箱
     */
    util.prototype.showEmptyBox = function () {
        if (this.userData.emptyBoxNo < 0) {
            var location = this.checkPool();
            if (!location) {
                console.error("没有位置");
                // TrackMgr.airborne_gold({
                //     activity_state: "金币下发",
                //     distribution_status: false,
                //     failure_reasons: "没有位置"
                // })
                TrackMgr_1.default.empty_treasure({
                    activity_state: "\u5B9D\u7BB1\u4E0B\u53D1",
                    distribution_status: false,
                    failure_reasons: "\u5F53\u524D\u6CA1\u6709\u7A7A\u5730\uFF1B\u573A\u5730\u4E0A\u6709\u672A\u5F00\u542F\u5B9D\u7BB1",
                });
                return;
            }
            TrackMgr_1.default.empty_treasure({
                activity_state: "\u5B9D\u7BB1\u4E0B\u53D1",
                distribution_status: true,
            });
            TrackMgr_1.default.AppBuyProductDialog_hcdg({
                dialog_name_hcdg: "\u7A7A\u964D\u5B9D\u7BB1\uFF08\u672A\u7838\u5F00\uFF09"
            });
            this.userData.emptyBoxNo = location;
            cc.game.emit(NameTs_1.default.Show_Empty_Box);
        }
    };
    /**
     * 获取第一个任务
     */
    util.prototype.getFistTask = function (call) {
        var _this = this;
        //任务完成顺序
        var taskOrder1 = [2, 7, 4, 8, 6];
        var taskOrder2 = [1, 2, 3, 4];
        //任务类型 0:日常 1:成就
        var taskType = null;
        //符合的任务
        var str = [];
        var checkTask = function (arr) {
            if (taskType == null) {
                call(null, taskType);
                return;
            }
            var order = taskType == 0 ? taskOrder1 : taskOrder2;
            for (var i = 0; i < order.length; i++) {
                for (var j = 0; j < str.length; j++) {
                    if (order[i] == str[j].taskType) {
                        call(str[j], taskType);
                        return;
                    }
                }
            }
        };
        this.getdataStr({
            url: UrlConst_1.UrlConst.task_day_main,
            success: function (res) {
                if (res.list) {
                    var list = res.list;
                    for (var i = 0; i < list.length; i++) {
                        // let item = list[i];
                        if (list[i].taskType == 2 && _this.userData.localCompoundTime == 0) {
                            _this.userData.localCompoundTime = list[i].userTaskValue;
                        }
                        if (list[i].buttonType !== 4 && list[i].taskType !== 1) {
                            taskType = 0;
                            str.push(list[i]);
                            //     break;
                        }
                    }
                    if (taskType == null) {
                        str = [];
                        _this.getdataStr({
                            url: UrlConst_1.UrlConst.achievement_main,
                            success: function (res) {
                                if (res && res.list) {
                                    var list_1 = res.list;
                                    for (var i = 0; i < list_1.length; i++) {
                                        if (list_1[i].buttonType !== 4) {
                                            taskType = 1;
                                            // break;
                                            str.push(list_1[i]);
                                        }
                                    }
                                    checkTask(str);
                                }
                            }
                        });
                    }
                    else {
                        checkTask(str);
                    }
                }
            }
        });
    };
    /**
     * 发送看视频获取炮塔记录
     */
    util.prototype.sendTurretNum = function () {
        this.post({
            url: UrlConst_1.UrlConst.watchVideoAddBattery,
            success: function () {
                console.log("记录看视频获得炮塔任务");
                cc.game.emit(NameTs_1.default.Game_Task_updata);
            },
            fail: function () {
                console.log("记录看视频获得炮塔任务失败");
            }
        });
    };
    util.prototype.setTempParm = function (name, value) {
        this.tempParm[name] = value;
    };
    util.prototype.getTempParm = function (name) {
        return this.tempParm[name];
    };
    util.prototype.getMapdata = function (bigmap) {
        //jsonArr.gkData
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.gkData);
        //console.log(bigmap + " jsonArr.gkData ----------------------------- :" +  JSON.stringify( data ) )
        var nwdata = [];
        for (var i = 0; i < data.length; i++) {
            //console.log("-------# " + JSON.stringify(data[i]) )
            if (data[i]["levelNo"] == bigmap + "") {
                nwdata.push(data[i]);
            }
        }
        return nwdata;
    };
    /**
     * 是否为b用户
     */
    util.prototype.checkTestB = function (name) {
        var user = AssistCtr_1.AssistCtr.isATest() ? "A" : "B";
        return this.AB_Test[name][user] == "true" ? true : false;
    };
    /**离线增加炮塔次数*/
    util.prototype.offlineTurretProduct = function () {
        //当前时间
        var nowTime = new Date().getTime();
        //上一次时间
        var lastTime = this.getStorage(this.localDiary.offlineTime) || new Date().getTime();
        //每30秒一个 换算
        var time = Math.floor((nowTime - lastTime) / 1000 / 30);
        console.log('离线增加' + time + "个炮塔,离线时间为：" + (nowTime - lastTime) / 1000);
        if (time <= 0) {
            return;
        }
        if (this.userData.product + time > 20) {
            this.userData.product = this.userData.product > 20 ? this.userData.product : 20;
        }
        else {
            this.productTurret(time);
        }
        this.setStorage(this.localDiary.offlineTime, null);
    };
    return util;
}());
exports.default = new util();

cc._RF.pop();