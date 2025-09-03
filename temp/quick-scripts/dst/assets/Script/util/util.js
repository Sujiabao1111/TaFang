
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/util/util.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsXFx1dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQW1KO0FBQ25KLDJDQUFzQztBQUV0Qyx1REFBa0Q7QUFDbEQsK0JBQTBCO0FBQzFCLDZDQUE0QztBQUM1QyxxREFBZ0Q7QUFDaEQsK0NBQThDO0FBRTlDLHNFQUFpRTtBQUVqRSxpREFBNEM7QUFDNUMsaURBQWdEO0FBQ2hELHlDQUF5QztBQUN6QztJQUFBO1FBRUksaUJBQWlCO1FBQ2pCLFlBQU8sR0FBYTtZQUNoQixnQkFBTSxDQUFDLFVBQVU7WUFDakIsZ0JBQU0sQ0FBQyxPQUFPO1lBQ2QsZ0JBQU0sQ0FBQyxXQUFXO1lBQ2xCLGdCQUFNLENBQUMsT0FBTztZQUNkLGdCQUFNLENBQUMsUUFBUTtZQUNmLGdCQUFNLENBQUMsUUFBUTtZQUNmLGdCQUFNLENBQUMsWUFBWTtZQUNuQixnQkFBTSxDQUFDLGFBQWE7WUFDMUIsZ0JBQU0sQ0FBQyxNQUFNO1lBQ1AsZ0JBQU0sQ0FBQyxVQUFVO1NBQ3BCLENBQUM7UUFFRixVQUFVO1FBQ1YsZUFBVSxHQUFRO1lBQ2QsWUFBWSxFQUFFLGNBQWM7WUFDNUIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsWUFBWSxFQUFFLGNBQWM7WUFDNUIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsY0FBYyxFQUFFLGdCQUFnQjtZQUNoQyxlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFdBQVcsRUFBRSxhQUFhO1lBQzFCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLGdCQUFnQixFQUFDLGtCQUFrQjtZQUNuQyxZQUFZLEVBQUMsY0FBYztTQUM5QixDQUFBO1FBRUQsY0FBUyxHQUFXLGFBQWEsQ0FBQyxDQUFDLE9BQU87UUFFMUMsY0FBUyxHQUFxQixJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsVUFBVTtRQUVuRCxlQUFVLEdBQXFCLElB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QUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgZ2FtZU51bWVyaWNhbCwgZ2FtZVN0YXRlLCBQb29sSW5mbywgcHJvcEluZm8sIHByb3BTdGF0ZSwgcHJvcFR5cGUsIHNvdW5kSW5mbywgdGhpbmdUeXBlLCB0dXJyZXRJbmZvLCB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCB1c2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xuaW1wb3J0IGpzb25TaW5nbGV0b24gZnJvbSBcIi4uL2Jhc2UvanNvblNpbmdsZXRvblwiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4vdG9vbFwiO1xuaW1wb3J0IHsgVGV4dEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvVGV4dEN0clwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IHsgR2FtZUVmZmVjdCB9IGZyb20gXCIuLi9lZmZlY3QvR2FtZUVmZmVjdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbi8vIGltcG9ydCBlbmNyeXB0ID0gcmVxdWlyZSgnZW5jcnlwdGpzJyk7XG5jbGFzcyB1dGlsIHtcblxuICAgIC8qKumcgOimgeWKoOi9veeahGpzb27liJfooaggKi9cbiAgICBqc29uQXJyOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgTmFtZVRzLnR1cnJldERhdGEsXG4gICAgICAgIE5hbWVUcy5tYXBEYXRhLFxuICAgICAgICBOYW1lVHMubW9uc3RlckRhdGEsXG4gICAgICAgIE5hbWVUcy5idXlEYXRhLFxuICAgICAgICBOYW1lVHMucHJvcERhdGEsXG4gICAgICAgIE5hbWVUcy5jb2luRGF0YSxcbiAgICAgICAgTmFtZVRzLnRyZWFzdXJlRGF0YSxcbiAgICAgICAgTmFtZVRzLm1vbnN0ZXJJZERhdGEsXG5cdFx0TmFtZVRzLmdrRGF0YSxcbiAgICAgICAgTmFtZVRzLmJ1bGxldERhdGFcbiAgICBdO1xuXG4gICAgLyoq5pys5Zyw5a2X5YW4ICovXG4gICAgbG9jYWxEaWFyeTogYW55ID0ge1xuICAgICAgICBoYXZlVHJlYXN1cmU6IFwiaGF2ZVRyZWFzdXJlXCIsLy/lrp3ol4/mlbDmja5cbiAgICAgICAgbm92aWNlR3VpZGU6IFwibm92aWNlR3VpZGVcIiwgLy/mlrDmiYvmjIflr7zpobrluo9cbiAgICAgICAgR2V0VHVycmV0TnVtOiBcIkdldFR1cnJldE51bVwiLC8v6I635b6X54Ku5aGUXG4gICAgICAgIEdldERheVRpbWU6IFwiR2V0RGF5VGltZVwiLC8v5LuK5aSp5pel5pyfXG4gICAgICAgIGF1dG9Qcm9wOiBcImF1dG9Qcm9wXCIsLy/oh6rliqjpgZPlhbdcbiAgICAgICAgdW5sb2NraW5nX3RpbWU6IFwidW5sb2NraW5nX3RpbWVcIiwvL+ino+mUgeaXtumXtFxuICAgICAgICBzeW50aGVzaXNfdGltZXM6IFwic3ludGhlc2lzX3RpbWVzXCIsLy/lkIjmiJDmrKHmlbBcbiAgICAgICAgcHJvcENvbmZpZzogXCJwcm9wQ29uZmlnXCIsLy/pgZPlhbfor6bnu4booahcbiAgICAgICAgb2ZmbGluZVRpbWU6IFwib2ZmbGluZVRpbWVcIiwvL+emu+e6v+aXtumXtFxuICAgICAgICBvbmxpbmVUaW1lOiBcIm9ubGluZVRpbWVcIiwgLy/lnKjnur/ml7bpl7RcbiAgICAgICAgcmFuZG9tUmVkVGltZU51bTpcInJhbmRvbVJlZFRpbWVOdW1cIiwvL+maj+acuue6ouWMheaXtumXtFxuICAgICAgICBlYXJuUHJvZ3Jlc3M6XCJlYXJuUHJvZ3Jlc3NcIiwvL+WxleeOsOaJi+aMh+asoeaVsFxuICAgIH1cblxuICAgIHNlY3JldGtleTogc3RyaW5nID0gJ29wZW5fc2VzYW1lJzsgLy8g5Yqg5a+G5a+G6ZKlXG5cbiAgICBHbG9iYWxNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwKCk7IC8v55So5oi35YKo5a2Y5p+Q5Lqb5Lic6KW/XG5cbiAgICBNb25zdGVyTWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpOyAvL+WCqOWtmOaAquWFveS4nOilv1xuXG4gICAgaXBob25lWFRvcDogbnVtYmVyOy8v5YiY5rW35bGP6auY5bqmXG5cbiAgICB0b3VjaElkOiBudW1iZXI7IC8vdG91Y2hpZFxuXG4gICAgc2F2aW5nUG90TG9jazpib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbop6PplIHkuobph5HluIHpo57lhaXlrZjpkrHnvZBcblxuICAgIGhlYXZlblRvdWNoOiBib29sZWFuOy8v55So5LqO6Ziy6YeN5aSN54K55Ye7XG5cbiAgICBPcGVuaW5nX3RpbWVzX2xldmVsOiBudW1iZXIgPSAwOy8v5byA5ZCv5qyh5pWwXG5cbiAgICBpc0NoZWNrVGFza1JlZDogYm9vbGVhbiA9IHRydWU7IC8v5piv5ZCm5qOA5rWL6aaW6aG15Lu75Yqh57qi54K5XG5cbiAgICBhZFByZU9iajogYW55ID0ge307IC8v6aKE5Yqg6L295bm/5ZGK55qEXG5cbiAgICAvKirnlKjmiLfmlbDmja4gKi9cbiAgICB1c2VyRGF0YTogdXNlckRhdGEgPSB7XG4gICAgICAgIHBvb2w6IFtdLFxuICAgICAgICBjb2luOiAwLFxuICAgICAgICBob25nYmFvOiAwLFxuICAgICAgICBjdXN0b21zOiB7XG4gICAgICAgICAgICBiaWc6IDEsXG4gICAgICAgICAgICBzbWFsbDogMVxuICAgICAgICB9LFxuICAgICAgICBwcm9kdWN0OiA0MCxcbiAgICAgICAgdHVycmV0TGV2ZWw6IDEsXG4gICAgICAgIHByb3A6IFtcbiAgICAgICAgICAgIC8qKuWGsOWGuyAqL1xuICAgICAgICAgICAgeyB0eXBlOiAxLCBudW06IDAsIHRpbWU6IG51bGwsIHVzZTogcHJvcFN0YXRlLmVuZCB9LFxuICAgICAgICAgICAgLyoq55S15Ye7Ki9cbiAgICAgICAgICAgIHsgdHlwZTogMiwgbnVtOiAwLCB0aW1lOiBudWxsLCB1c2U6IHByb3BTdGF0ZS5lbmQgfSxcbiAgICAgICAgICAgIC8qKuaKpOe9qSovXG4gICAgICAgICAgICB7IHR5cGU6IDMsIG51bTogMCwgdGltZTogbnVsbCwgdXNlOiBwcm9wU3RhdGUuZW5kIH0sXG4gICAgICAgICAgICAvKirmuIXlsY8qL1xuICAgICAgICAgICAgeyB0eXBlOiA0LCBudW06IDAsIHRpbWU6IG51bGwsIHVzZTogcHJvcFN0YXRlLmVuZCB9LFxuICAgICAgICAgICAgLyoq6Ieq5Yqo5ZCI5oiQKi9cbiAgICAgICAgICAgIHsgdHlwZTogNSwgbnVtOiAwLCB0aW1lOiBudWxsLCB1c2U6IHByb3BTdGF0ZS5lbmQgfSxcbiAgICAgICAgICAgIC8qKuWinuiDvSovXG4gICAgICAgICAgICB7IHR5cGU6IDYsIG51bTogMCwgdGltZTogbnVsbCwgdXNlOiBwcm9wU3RhdGUuZW5kIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhjaGFuZ2VSYXRlOiAxMDAwMCxcbiAgICAgICAgbmV3VXNlcjogdHJ1ZSxcbiAgICAgICAgY29tcG91bmRUaW1lczogMCxcbiAgICAgICAgbm92aWNlR3VpZGU6IDEsXG4gICAgICAgIGJ1eUNvdW50OiAwLFxuICAgICAgICBlbXB0eUJveE5vOiAtMSxcbiAgICAgICAgaGVhdmVuUG9vbDogW10sXG4gICAgICAgIGhhdmVUcmVhc3VyZTogW10sXG4gICAgICAgIHRlcm1Db2luOiAwLFxuICAgICAgICBvZmZsaW5lSW5jb21lOiB7XG4gICAgICAgICAgICByZXdhcmQ6MCxcbiAgICAgICAgICAgIG11bHRpcGxlUmV3YXJkOjBcbiAgICAgICAgfSxcbiAgICAgICAgdmVyc2lvbjogMCxcbiAgICAgICAgR2V0VHVycmV0TnVtOiAxOCxcbiAgICAgICAgR2V0RGF5VGltZTogbnVsbCxcbiAgICAgICAgYXV0b1Byb3A6IG51bGwsXG4gICAgICAgIGFpcmJvcm5lQ291bnQ6IDAsXG4gICAgICAgIHVubG9ja2luZ190aW1lOiAwLFxuICAgICAgICBzeW50aGVzaXNfdGltZXM6IDAsXG4gICAgICAgIHN5bnRoZXNpc19BbGw6IDAsXG4gICAgICAgIHByb3BDb25maWc6IG51bGwsXG4gICAgICAgIHJlc2lzdEF0dGFja1RpbWVzOiAwLFxuICAgICAgICBsb2NhbENvbXBvdW5kVGltZTogMCxcbiAgICAgICAgZGF5RW50ZXJTaWduTnVtOiBudWxsLFxuICAgICAgICBnb2xkV2hlZWxDb3VudDogbnVsbCxcbiAgICAgICAgc2F2aW5nUG90TnVtOjAsXG4gICAgfTtcblxuICAgIC8qKkFC5rWL6K+VICovXG4gICAgQUJfVGVzdDogYW55ID0ge1xuICAgICAgICBsb2NrX3R1cnJldF90ZXN0OiBcIkJcIixcbiAgICAgICAgaGVhdmVuX2NvaW5fdGVzdDogXCJCXCIsXG4gICAgICAgIG5ld19oYW5kX3Rlc3Q6XCJCXCIsXG4gICAgICAgIC8vIHdhbGxldF90ZXN0OlwiQVwiLFxuICAgIH1cblxuICAgIC8v6KeC55yL6KeG6aKR5qyh5pWwXG4gICAgYWR2ZXJ0aXNpbmdfbnVtOiBudW1iZXIgPSAwO1xuICAgIC8v55yL6KeG6aKR6I635Y+W6YGT5YW35oC75qyh5pWwXG4gICAgcHJvcHNfbnVtYmVyOiBudW1iZXIgPSAwO1xuXG4gICAgLy/muLjmiI/ml7bpl7RcbiAgICBnYW1lVGltZTogbnVtYmVyID0gMDtcbiAgICAvL+mBk+WFt+S9v+eUqOasoeaVsFxuICAgIGdhbWVQcm9wTnVtOiBudW1iZXIgPSAwO1xuXG4gICAgLy/ngrnlh7vkuobmmoLlgZxcbiAgICBpc1N0b3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8v55So5oi36KGM5Li6XG4gICAgYmVoYXZpb3JSZXdhcmRWb0xpc3Q6IGFueSA9IG51bGw7XG5cbiAgICAvL+i/h+WFs+WlluWKsVxuICAgIGdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3Q6IGFueSA9IFtdO1xuXG4gICAgLy/kuIvkuIDlhbPnmoTlpZblirFcbiAgICBnYW1lTGV2ZWxQYXNzUmV3YXJkTmV4dFZvTGlzdDogYW55ID0gW107XG5cbiAgICAvL+WFs+WNoeaAqueJqemFjee9rlxuICAgIG1hcENvbmZpZzogYW55ID0gbnVsbDtcblxuICAgIC8v6YGT5YW36YWN572u6KGoXG4gICAgcHJvcERhdGE6IGFueSA9IG51bGw7XG5cbiAgICAvL+mBk+WFt+WFt+S9k+aVsOWAvFxuICAgIHByb3BDb25maWc6IGFueSA9IG51bGw7XG5cbiAgICAvL+WcqOe6v+aXtumXtOmVv+W6plxuICAgIG9ubGluZV90aW1lID0gNjAwO1xuXG4gICAgLyoq5aSp6ZmN6YeR5biB54K55Ye75qyh5pWwKi9cbiAgICBoZWF2ZW5DbGlja051bTogbnVtYmVyID0gMTtcblxuICAgIC8qKuaYr+WQpuWIsOaXtumXtOWPkemAgeaVsOaNrjPnp5IgKi9cbiAgICBpc1NlbmRUdXJyZXREYXRhOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgLyoq5piv5ZCm5Yiw5pe26Ze05Y+R6YCB5pWw5o2uM+enkiAqL1xuICAgIGlzU2VuZENvaW5EYXRhOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKirlj4zlgI3mlLbnm4ogKi9cbiAgICBkb3VibGVFYXJuOiBhbnkgPSB7IHVzZTogcHJvcFN0YXRlLmVuZCwgdGltZTogbnVsbCB9O1xuXG4gICAgLyoq5LiK5LiA5qyh5LiK5Lyg55qE5pWw5o2uICovXG4gICAgbGFzdERhdGE6IGFueSA9IHtcbiAgICAgICAgY29tcG91bmRUaW1lczogbnVsbCwgLy/lkIjmiJDmrKHmlbBcbiAgICAgICAgaGlnaGVzdEJhdHRlcnlMZXZlbDogbnVsbCwgLy/mnIDpq5jngq7loZRcbiAgICAgICAgcG9pbnQ6IG51bGwsIC8v6YeR5biBXG4gICAgICAgIHVzZXJCYXR0ZXJ5TnVtOiBudWxsLCAvL+WkmuWwkeS4queCruWhlFxuICAgICAgICB1c2VyTWFwRGV0YWlsOiBbXSAvL+axoOWhmOaVsOaNrlxuICAgIH07XG5cbiAgICAvL+mfs+aViOmFjee9rlxuICAgIHNvdW5kU2V0OiBzb3VuZEluZm8gPSB7XG4gICAgICAgIGJnbTogMSwgLy/og4zmma/pn7PmlYhcbiAgICAgICAgc291bmQ6IDEgLy/mma7pgJrpn7PmlYhcbiAgICB9O1xuXG4gICAgbWFwU2l6ZTogYW55ID0ge1xuICAgICAgICB3aWR0aDogNzUwLCAvL+WcsOWbvuWuveW6plxuICAgICAgICBncmlkOiBudWxsLCAvL+WcsOWbvuagvOWtkOWkp+Wwj1xuICAgICAgICBzdGFydEdyaWRQb3M6IG51bGwgLy/liJ3lp4vkvY3nva5cbiAgICB9Oy8v5Zyw5Zu+5aSn5bCPXG5cbiAgICAvL+WtmOWCqOW9k+WJjeWFs+WNoeeahOeCruWhlOS9jee9ruWSjOWbnuaUtueahOS9jee9rlxuICAgIGxldmVsTWFwOiBhbnkgPSBbXTtcbiAgICAvL+WtmOWCqOW9k+WJjeWFs+WNoeeahOaAquWFvVxuICAgIGxldmVsTW9uc3RlckFycjogeyBpZDogbnVtYmVyLCBudW06IG51bWJlciB9W10gPSBbXTtcbiAgICAvL+W9k+WJjeaAquWFveaVsOmHj1xuICAgIGxldmVsTW9uc3Rlck51bTogbnVtYmVyO1xuICAgIC8v5b2T5YmN5ri45oiP54q25oCBXG4gICAgbGV2ZWxTdGF0ZTogbnVtYmVyID0gZ2FtZVN0YXRlLmRlZmF1bHQ7XG4gICAgLy/otK3kubDmrKHmlbBcbiAgICBidXlDb3VudDogbnVtYmVyID0gMDtcbiAgICAvL+S7iuWkqeaYr+WQpuetvuWIsFxuICAgIGlzT2tTaWduOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy/mmK/lkKbmnInlnKjnur/lpZblirHnuqLljIVcbiAgICBpc1NpZ25PbkxpbmVSZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIC8v6Led56a75LiK5qyh6I635b6X6ZqP5py657qi5YyF5pe26Ze0XG4gICAgdXBUdXJyZXRSYW5kb21SZWRUaW1lID0gMDtcbiAgICAvL+W9k+WJjeWcqOe6v+aXtumXtFxuICAgIG9ubGluZVRpbWVOdW0gPSAwO1xuICAgIC8v6ZqP5py657qi5YyF5pe26Ze0XG4gICAgcmFuZG9tUmVkVGltZU51bSA9IDYwO1xuICAgIC8v5aSp6ZmN6YeR5biB55qE6KeG6aKR5pWw6YePXG4gICAgZXhpc3RWaWRlb0NvaW5OdW06IG51bWJlciA9IDA7XG5cbiAgICAvL+S4tOaXtuWPmOmHj1xuICAgIHRlbXBQYXJtOiBvYmplY3QgPSB7fTtcbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmsaDloZjlk6rkuKrkvY3nva7mmK/nqbrnmoRcbiAgICAgKi9cbiAgICBjaGVja1Bvb2woKTogbnVtYmVyIHtcblxuICAgICAgICBsZXQgbG9hY3Rpb246IG51bWJlciA9IG51bGw7Ly/kvY3nva5cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGV2ZWxNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5sZXZlbE1hcFtpXTtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5HZXRQb29sRGF0YShpdGVtLm5vKTtcbiAgICAgICAgICAgIGxldCBoZWF2ZW5JdGVtID0gdG9vbC5HZXRBcnJEYXRhKFwibm9cIiwgaXRlbS5ubywgdGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZXZlbCA9PSAtMSAmJiBkYXRhLnN0YXRlID09IDEgJiYgaGVhdmVuSXRlbS5pZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubm8gIT0gdGhpcy51c2VyRGF0YS5lbXB0eUJveE5vKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWN0aW9uID0gaXRlbS5ubztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2FjdGlvbjtcbiAgICB9XG5cblx0c2V0SW50KF9rZXksX3ZhbHVlKXtcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShfa2V5LF92YWx1ZS50b1N0cmluZygpKVxuICAgICAgICB9XG5cdFxuXHQgZ2V0SW50KF9rZXksZGVmKXtcblx0XHRcdFxuXHRcdFx0dmFyIGRzID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKF9rZXkpXG5cdFx0XHRpZiggZHMgPT0gXCJcIiB8fCBkcyA9PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnNldEludChfa2V5LGRlZik7XG5cdFx0XHRcdGRzID0gZGVmO1xuXHRcdFx0fVxuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihkcylcbiAgICAgICAgfVxuXG5cdGdldFN0cmluZyhfa2V5KVxuXHR7XG5cdFx0cmV0dXJuIGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShfa2V5KVxuXHR9XG5cdFxuXHRcblx0c2V0U3RyaW5nKF9rZXksX3ZhbHVlKVxuXHR7XG5cdFx0Y2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKF9rZXksX3ZhbHVlLnRvU3RyaW5nKCkpXG5cdH1cblxuXHRpbmlkYXRhKCl7XG5cdFx0Ly/ph5HluIFcblx0XHR0aGlzLnVzZXJEYXRhLnZlcnNpb24gPSA1NDg7XG5cdFx0dGhpcy5kb3VibGVFYXJuLnVzZSA9IDA7XG4gICAgICAgIHRoaXMuZG91YmxlRWFybi50aW1lID0gMDtcblx0XHR0aGlzLnVzZXJEYXRhLmNvaW4gPSB0aGlzLmdldEludChcImdvbGRoYlwiLDApXG5cdFx0dGhpcy51c2VyRGF0YS5leGNoYW5nZVJhdGUgPSB0aGlzLmdldEludChcImV4Y2hhbmdlUmF0ZVwiLDEwMDAwKVxuXHRcdHRoaXMudXNlckRhdGEucHJvZHVjdCA9IHRoaXMuZ2V0SW50KFwicHJvZHVjdFwiLDQwKVxuXHRcdHRoaXMudXNlckRhdGEuY3VzdG9tcy5iaWcgPSB0aGlzLmdldEludChcImN1c3RvbXNiaWdcIiwxKVxuXHRcdHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCA9IHRoaXMuZ2V0SW50KFwiY3VzdG9tc3NtYWxsXCIsMSlcblx0XHR0aGlzLnVzZXJEYXRhLm5ld1VzZXIgPXRydWUgLy90aGlzLmdldEludChcIm5ld3VzZXJcIiwxKT09MT90cnVlOmZhbHNlO1xuXHRcdHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWw9dGhpcy5nZXRJbnQoXCJ0dXJyZXRMZXZlbFwiLDEpXG5cdFx0XG5cdFx0bGV0IHBzZGQgPSB0aGlzLmdldFN0cmluZyhcIm1hcHBvb2xcIilcblx0XHRpZiggcHNkZCA9PSBcIlwiIHx8IHBzZGQgPT1udWxsIClcblx0XHR7XG5cdFx0XHR0aGlzLmluaXRQb29sKCk7XG5cdFx0XHRsZXQgZGRzID0gIEpTT04uc3RyaW5naWZ5KCB0aGlzLnVzZXJEYXRhLnBvb2wpXG5cdFx0XHR0aGlzLnNldFN0cmluZyggXCJtYXBwb29sXCIgLGRkcylcblx0XHR9ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMudXNlckRhdGEucG9vbCA9ICBKU09OLnBhcnNlKHBzZGQpXG5cdFx0XHQgdGhpcy5yZXBhaXJQb29sKCk7XG5cdFx0fVxuXHRcdFxuXHR9XG5cdFxuXHRzYXZlZGF0YSgpXG5cdHtcblx0XHRcblx0XHR0aGlzLnNldEludChcImdvbGRoYlwiLHRoaXMudXNlckRhdGEuY29pbilcblx0XHR0aGlzLnNldEludChcImV4Y2hhbmdlUmF0ZVwiLHRoaXMudXNlckRhdGEuZXhjaGFuZ2VSYXRlKVxuXHRcdHRoaXMuc2V0SW50KFwicHJvZHVjdFwiLHRoaXMudXNlckRhdGEucHJvZHVjdClcblx0XHQgdGhpcy5zZXRJbnQoXCJjdXN0b21zYmlnXCIsdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZylcblx0XHQgdGhpcy5zZXRJbnQoXCJjdXN0b21zc21hbGxcIix0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwpXG5cdFx0dGhpcy51c2VyRGF0YS5uZXdVc2VyID10cnVlIC8vdGhpcy5nZXRJbnQoXCJuZXd1c2VyXCIsMSk9PTE/dHJ1ZTpmYWxzZTtcblx0XHR0aGlzLnNldEludChcInR1cnJldExldmVsXCIsdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbClcblx0XHRcblx0XHRsZXQgZGRzID0gIEpTT04uc3RyaW5naWZ5KCB0aGlzLnVzZXJEYXRhLnBvb2wpXG5cdFx0dGhpcy5zZXRTdHJpbmcoIFwibWFwcG9vbFwiICxkZHMpXG5cdH1cblx0XG5cdFxuXHQvL+WIpOaWreaYr+S4jeaYr+etvuWIsOS7iuWkqVxuXHRjYW5TaW5nZSgpXG5cdHtcblx0XHR2YXIgY2FuZ2V0ID0gdHJ1ZTtcblx0XHR2YXIgZCA9IG5ldyBEYXRlKCk7XG5cdFx0dmFyIGRhdHMgID0gW1wiMFwiLFwiMFwiLFwiMFwiLFwiMFwiLFwiMFwiLFwiMFwiLFwiMFwiXTtcblx0XHR2YXIgZGQgPSB0aGlzLmdldFN0cmluZyhcInNpbmdkYWRhXCIpO1x0XHRcblx0XHRcblx0XHRpZiggZGQgPT0gXCJcIiB8fCBkZD09IG51bGwgfHwgZGQgPT0gdW5kZWZpbmVkIClcblx0XHR7XG5cdFx0XHQgdGhpcy5zZXRTdHJpbmcoXCJzaW5nZGFkYVwiLEpTT04uc3RyaW5naWZ5KGRhdHMpKTtcdFx0XG5cdFx0XHQvLyxKU09OLnN0cmluZ2lmeSjooajlkI0pXG5cdFx0fWVsc2Vcblx0XHR7XG5cdFx0XHRkYXRzID0gIEpTT04ucGFyc2UoZGQgKTtcblx0XHR9XG5cdFx0XG5cdFx0dmFyIHJlc3J0ZSA9IDA7XG5cdFx0Zm9yKHZhciBpPTA7aTw3O2krKylcblx0XHR7XG5cdFx0XHRpZiggZGF0c1tpXSA9PSBcIjBcIiApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3J0ZSA9IDE7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdGlmKCByZXNydGUgPT0gMCApXG5cdFx0e1xuXHRcdFx0ZGF0cyAgPSBbXCIwXCIsXCIwXCIsXCIwXCIsXCIwXCIsXCIwXCIsXCIwXCIsXCIwXCJdO1xuXHRcdFx0dGhpcy5zZXRTdHJpbmcoXCJzaW5nZGFkYVwiLEpTT04uc3RyaW5naWZ5KGRhdHMpKTtcdFx0XG5cdFx0fVxuXHRcdFxuXHRcdFxuXHRcdHZhciB0ZHN0ciA9IGQuZ2V0RnVsbFllYXIoKSArXCJcIisgZC5nZXRNb250aCgpK1wiXCIrZC5nZXREYXRlKCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhcInNpbmcgOiAgXCIgK3Rkc3RyICk7XG5cdFx0Zm9yKCB2YXIgaSA9IDA7aTw3O2krKyApXG5cdFx0e1xuXHRcdFx0aWYoIHRkc3RyID09IGRhdHNbaV0gKVxuXHRcdFx0e1xuXHRcdFx0XHRjYW5nZXQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0XG5cdFx0cmV0dXJuICFjYW5nZXQ7XG5cdH1cblx0XG5cdFxuXHRzaW5nbGVuKClcblx0e1xuXHRcdHZhciBkZCA9IHRoaXMuZ2V0U3RyaW5nKFwic2luZ2RhZGFcIik7XHRcblx0XHR2YXIgZGF0cyA9ICBKU09OLnBhcnNlKGRkICk7XG5cdFx0XG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHRmb3IoIHZhciBpID0gMDtpPDc7aSsrIClcblx0XHR7XG5cdFx0XHRpZiggZGF0c1tpXSAhPSBcIjBcIiApXG5cdFx0XHR7XG5cdFx0XHRcdGluZGV4Kz0xXG5cdFx0XHR9XG5cdFx0fVxuXHRcdCBcblx0XHRyZXR1cm4gXHRpbmRleDtcdCBcblx0fVxuXHRcblx0c2luZ3RvZGF5KClcblx0e1xuXHRcdHZhciBkZCA9IHRoaXMuZ2V0U3RyaW5nKFwic2luZ2RhZGFcIik7XHRcblx0XHR2YXIgZGF0cyA9ICBKU09OLnBhcnNlKGRkICk7XG5cdFx0dmFyIGQgPSBuZXcgRGF0ZSgpO1xuXHRcdHZhciB0ZHN0ciA9IGQuZ2V0RnVsbFllYXIoKSArXCJcIisgZC5nZXRNb250aCgpK1wiXCIrZC5nZXREYXRlKCk7XG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHRmb3IoIHZhciBpID0gMDtpPDc7aSsrIClcblx0XHR7XG5cdFx0XHRpZiggZGF0c1tpXSA9PSBcIjBcIiApXG5cdFx0XHR7XG5cdFx0XHRcdGRhdHNbaV0gPSB0ZHN0cjtcblx0XHRcdFx0aW5kZXggPSBpO1xuXHRcdFx0XHRcblx0XHRcdFx0aT0gODtcblx0XHRcdH1cblx0XHR9XG5cdFx0IHRoaXMuc2V0U3RyaW5nKFwic2luZ2RhZGFcIixKU09OLnN0cmluZ2lmeShkYXRzKSk7XG5cdFx0cmV0dXJuIFx0aW5kZXg7XHQgXG5cdH1cblxuXG4gICAgLyoqXG4gICAgICog55So5LqO5paw5omL77yM5Yid5aeL5YyW55So5oi35pWw5o2uXG4gICAgICovXG4gICAgaW5pdFBvb2woKSB7XG5cblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDE3OyBpKyspIHtcblxuICAgICAgICAgICAgLy/liJ3lp4vljJbmsaDloZhcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEucG9vbC5wdXNoKHtcbiAgICAgICAgICAgICAgICBubzogaSwgLy/nrKzlh6DkuKrkvY3nva5cbiAgICAgICAgICAgICAgICBsZXZlbDogaSA9PSAxID8gMSA6IC0xLC8vLTHkuLrnqbpcbiAgICAgICAgICAgICAgICBzdGF0ZTogMSAvL+m7mOiupOWJjTjkuKrop6PplIFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKirkv67lpI3ml6fmlbDmja4qL1xuICAgIHJlcGFpclBvb2woKSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnVzZXJEYXRhLnBvb2wubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMudXNlckRhdGEucG9vbFtpXS5zdGF0ZSA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhLnBvb2xbaV0uc3RhdGUgPSAxO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyW6YeR5biB5L2N572uXG4gICAgICovXG4gICAgaW5pdEhlYXZlblBvb2woKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTc7IGkrKykge1xuICAgICAgICAgICAgLy/liJ3lp4vljJbph5HluIHmsaDloZhcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbC5wdXNoKHtcbiAgICAgICAgICAgICAgICBubzogaSwgLy/kvY3nva5cbiAgICAgICAgICAgICAgICBpZDogbnVsbCwgLy/ph5HluIFpZFxuICAgICAgICAgICAgICAgIHZhbHVlOiBudWxsLCAvL+WkmuWwkeWAvFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bngq7lj7DnmoTmlbDmja5cbiAgICAgKiBAcGFyYW0gbGV2ZWwg562J57qnXG4gICAgICovXG4gICAgR2V0VHVycmV0RGF0YShsZXZlbDogbnVtYmVyKTogdHVycmV0SW5mbyB7XG5cbiAgICAgICAgbGV0IGRhdGE6IHR1cnJldEluZm8gPSBudWxsO1xuXG4gICAgICAgIGxldCB0dXJyZXREYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMudHVycmV0RGF0YSk7XG5cbiAgICAgICAgZGF0YSA9IHRvb2wuZGVlcENsb25lKHRvb2wuR2V0QXJyRGF0YShcImxldmVsXCIsIGxldmVsLCB0dXJyZXREYXRhKSk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L+d5a2Y5LiA5LiL5rGg5aGY5pWw5o2uXG4gICAgICogQHBhcmFtIGlkIOS9jee9rlxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqcgbnVsbOWwseaYr+WIoOmZpFxuICAgICAqL1xuICAgIHNhdmVQb29sKGlkOiBudW1iZXIsIGxldmVsOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIC8vIGxldCBpc0V4aXN0Om51bWJlciA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy51c2VyRGF0YS5wb29sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMudXNlckRhdGEucG9vbFtpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLnBvb2xbaV0ubm8gPT0gaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5sZXZlbCA9IGxldmVsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGV2ZWwgPSAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5booYzkuLrlpZblirFcbiAgICAgKiBAcGFyYW0gdHlwZSAxLeesrOS4gOasoeino+mUgeaWsOeCruWhlO+8jDIt5raI54Gt5oCq5YW977yMMy3op6PplIHngq7loZQgNC3lrozmiJDlhbPljaEgNS7lkIjmiJBcbiAgICAgKi9cbiAgICBHZXRCZWhhdmlvclJld2FyZFZvKHR5cGU6IG51bWJlcikge1xuXHRcdC8vY29uc29sZS5sb2coXCItLS0tLS0tMTIzLS0tLS0tLWJlaGF2aW9yUmV3YXJkVm9MaXN0IDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmJlaGF2aW9yUmV3YXJkVm9MaXN0KSApXG4gICAgICAgIHJldHVybiB0b29sLkdldEFyckRhdGEoXCJ0eXBlXCIsIHR5cGUsIHRoaXMuYmVoYXZpb3JSZXdhcmRWb0xpc3QpLnJld2FyZDtcblxuICAgIH1cblx0XG5cdFxuXHRnZXRub3dtYXBkYXRhKClcblx0e1xuXHRcdFxuICAgICAgIHRoaXMubWFwQ29uZmlnID0gdGhpcy5nZXRNYXBkYXRhKHRoaXMudXNlckRhdGEuY3VzdG9tcy5iaWcpO1xuXHRcdFxuXHR9XG5cdFxuXG4gICAgLyoqXG4gICAgICog5L+d5a2Y5LiA5LiL6YeR5biB5rGg5aGY5pWw5o2uXG4gICAgICogQHBhcmFtIG5vIOS9jee9rlxuICAgICAqIEBwYXJhbSBpZCDph5HluIFpZCBudWxs5bCx5piv5Yig6ZmkXG4gICAgICogQHBhcmFtIHZhbHVlIOWkmuWwkeWAvCBudWxs5bCx5piv5Yig6ZmkXG4gICAgICovXG4gICAgc2F2ZUhlYXZlblBvb2wobm86IG51bWJlciwgaWQ6IG51bWJlciA9IG51bGwsIHZhbHVlOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIC8vIGxldCBpc0V4aXN0Om51bWJlciA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbFtpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2xbaV0ubm8gPT0gbm8pIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgfHwgaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IGlkO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlumHkeW4geaxoOWhmOeahOacieWkmuWwkeS4qlxuICAgICAqL1xuICAgIGdldEhlYXZlblBvb2woKSB7XG5cbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2xbaV07XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sW2ldLmlkKSB7XG4gICAgICAgICAgICAgICAgbnVtKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOafpeWkqemZjemHkeW4gei/meS4quS9jee9ruaYr+WQpuS4uuacieS4nOilv1xuICAgICAqIEBwYXJhbSBubyDkvY3nva5cbiAgICAgKi9cbiAgICBjaGVja0hlYXZlblBvb2wobm86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXNFeGlzdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2xbaV07XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sW2ldLm5vID09IG5vKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNFeGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzRXhpc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICog6L+U5Zue5piv5ZCm5piv5paw562J57qnXG4gICAgICogQHBhcmFtIGxldmVsIOetiee6p1xuICAgICAqL1xuXG4gICAgdXBMZXZlbChsZXZlbDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChsZXZlbCA+IHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWwpIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeWFs+WNoeaAquWFvemFjee9rlxuICAgICAqL1xuICAgIEdldEN1c3RvbXNNb25zdGVySW5mbygpIHtcblxuICAgICAgICBsZXQgbWFwRGF0YSA9IHRoaXMuZ2V0TWFwZGF0YSh0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnKTtcblx0XHQvL2NvbnNvbGUubG9nKFwiR2V0Q3VzdG9tc01vbnN0ZXJJbmZvIDogXCIrIEpTT04uc3RyaW5naWZ5KG1hcERhdGEpKVxuICAgICAgICAvLyBsZXQgbWFwRGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLm1hcERhdGEpO1xuXG4gICAgICAgIC8v6L+U5Zue5pWw5o2uXG4gICAgICAgIGxldCBkYXRhID0gbWFwRGF0YVt0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwgLSAxXTtcblxuICAgICAgICAvLyBmb3IobGV0IGkgPSAwO2k8bWFwRGF0YS5sZW5ndGg7aSsrKXtcblxuICAgICAgICAvLyAgICAgaWYobWFwRGF0YVtpXS5pZD09dGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZyl7XG5cbiAgICAgICAgLy8gICAgICAgICBmb3IobGV0IGogPSAwO2o8bWFwRGF0YVtpXS5jdXN0b21zLmxlbmd0aDtqKyspe1xuXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKG1hcERhdGFbaV0uY3VzdG9tc1tqXS5sZXZlbD09dGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGRhdGEgPSBtYXBEYXRhW2ldLmN1c3RvbXNbal0ubW9uc3RlcjtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG5cbiAgICAgICAgLy8gICAgICAgICB9XG5cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICBsZXQgQXJyID0gW107XG4gICAgICAgIGRhdGEgPSBkYXRhLmxldmVsQ29uZmlnLnNwbGl0KFwiK1wiKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkYXRhW2ldLnNwbGl0KFwiLVwiKTtcblxuICAgICAgICAgICAgbGV0IGlkID0gaXRlbVswXTtcbiAgICAgICAgICAgIGxldCBudW0gPSBpdGVtWzFdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgICAgICAgICAgICAgQXJyLnB1c2goaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQXJyO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN5YWz5Y2h5Zyw5Zu+6YWN572uXG4gICAgICovXG4gICAgR2V0Q3VzdG9tc01hcCgpIHtcblxuICAgICAgICBsZXQgbWFwRGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLm1hcERhdGEpO1xuXG4gICAgICAgIC8v6L+U5Zue5pWw5o2uXG5cbiAgICAgICAgbGV0IGRhdGEgPSB0b29sLkdldEFyckRhdGEoXCJpZFwiLCAxLCBtYXBEYXRhKTtcblx0XHQvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS1HZXRDdXN0b21zTWFwLS0tLS0tLS0tLTptYXAgOiBcIisgbWFwRGF0YSApXG4gICAgICAgIHJldHVybiBkYXRhO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgJrov4fkvY3nva7mnaXojrflj5bnlKjmiLfmlbDmja5cbiAgICAgKiBAcGFyYW0gbG9hY3Rpb24g5ZOq5LiqXG4gICAgICovXG5cbiAgICBHZXRQb29sRGF0YShsb2FjdGlvbjogbnVtYmVyKSB7XG5cbiAgICAgICAgbGV0IGRhdGEgPSBudWxsO1xuICAgICAgICBkYXRhID0gdG9vbC5HZXRBcnJEYXRhKFwibm9cIiwgbG9hY3Rpb24sIHRoaXMudXNlckRhdGEucG9vbCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJrov4fkvY3nva7mnaXojrflj5ZNYXDmlbDmja5cbiAgICAgKiBAcGFyYW0gbG9hY3Rpb24g5ZOq5LiqXG4gICAgICovXG4gICAgR2V0UGxhY2VEYXRhKGxvYWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBudWxsO1xuXG4gICAgICAgIGRhdGEgPSB0b29sLkdldEFyckRhdGEoXCJub1wiLCBsb2FjdGlvbiwgdGhpcy5sZXZlbE1hcCk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5oCq5YW95pWw5o2uXG4gICAgICogQHBhcmFtIG5vIOetiee6p1xuICAgICAqL1xuXG4gICAgR2V0TW9uc3RlckRhdGEobGV2ZWw6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLm1vbnN0ZXJEYXRhKTtcblxuICAgICAgICByZXR1cm4gdG9vbC5HZXRBcnJEYXRhKFwibm9cIiwgbGV2ZWwsIGRhdGEpO1xuXG4gICAgfVxuXG4gICAgLyoq5qOA5p+l5pyA6auY57qn5Yir55qE54Ku5aGU5pe25piv5ZCm6LaF6L+H5Lik5LiqICovXG4gICAgY2hla1Bvb2xIYXZlVHdvKCkge1xuXG4gICAgICAgIGxldCBsZXZlbDogbnVtYmVyID0gdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbDtcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLnBvb2xbaV07XG4gICAgICAgICAgICBpZiAoaXRlbS5sZXZlbCA9PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIG51bSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW0gPj0gMjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluaAquWFveminOiJslxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqdcbiAgICAgKi9cblxuICAgIEdldE1vbnN0ZXJDb2xvcihsZXZlbDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMubW9uc3RlckRhdGEpO1xuICAgICAgICByZXR1cm4gdG9vbC5HZXRBcnJEYXRhKFwibm9cIiwgbGV2ZWwsIGRhdGEpLmNvbG9yO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5YWz5Y2h5oCq5YW9aWRcbiAgICAgKiBAcGFyYW0gaWQgaWRcbiAgICAgKi9cblxuICAgIEdldE1vbnN0ZXJJZERhdGEoaWQ6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLm1vbnN0ZXJJZERhdGEpO1xuICAgICAgICByZXR1cm4gdG9vbC5HZXRBcnJEYXRhKFwiaWRcIiwgaWQsIGRhdGEpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5Zyw5Zu+55qE5L2N572uXG4gICAgICogQHBhcmFtIHgg5qiq5ZCRXG4gICAgICogQHBhcmFtIHkg56uW5ZCRXG4gICAgICovXG4gICAgR2V0TWFwUG9zKHg6IG51bWJlciwgeTogbnVtYmVyKTogY2MuVmVjMiB7XG5cbiAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IGNjLnYyKCk7XG5cbiAgICAgICAgcG9zLnggPSB0aGlzLm1hcFNpemUuc3RhcnRHcmlkUG9zLnggKyB4ICogdGhpcy5tYXBTaXplLmdyaWQ7XG4gICAgICAgIHBvcy55ID0gdGhpcy5tYXBTaXplLnN0YXJ0R3JpZFBvcy55IC0geSAqIHRoaXMubWFwU2l6ZS5ncmlkO1xuICAgICAgICByZXR1cm4gcG9zO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5b2T5YmN5YWz5Y2hIOi3neemu+e7iOeCueacgOi/keeahOaAquWFvVxuICAgICAqIEBwYXJhbSBpZCDmgKrlhb1pZFxuICAgICAqIEBwYXJhbSBudW0g5Ymp5L2Z5aSa5bCR5q2lXG4gICAgICovXG4gICAgc2V0TGV2ZWxNb25zdGVyRGF0YShpZDogbnVtYmVyLCBudW06IG51bWJlcikge1xuXG4gICAgICAgIGxldCBpc0V4aXN0OiBib29sZWFuID0gdG9vbC5zZXRBcnJEYXRhKFwiaWRcIiwgaWQsIFwibnVtXCIsIG51bSwgdGhpcy5sZXZlbE1vbnN0ZXJBcnIpO1xuICAgICAgICBpZiAoIWlzRXhpc3QpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxNb25zdGVyQXJyLnB1c2goeyBpZCwgbnVtIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvcnRGbiA9IChhLCBiKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBiZWZvcmU6IG51bWJlciA9IGEubnVtIC0gYi5udW07XG5cbiAgICAgICAgICAgIGlmIChhLm51bSA9PSBiLm51bSkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IGEuaWQgLSBiLmlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sZXZlbE1vbnN0ZXJBcnIuc29ydChzb3J0Rm4pO1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIoOmZpOW9k+WJjeWFs+WNoSDnmoTmgKrnialcbiAgICAgKiBAcGFyYW0gaWQg56ys5Yeg5LiqXG4gICAgICovXG4gICAgZGVsZWN0TGV2ZWxNb25zdGVyKGlkOiBudW1iZXIpIHtcblxuICAgICAgICBsZXQgaXNTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsTW9uc3RlckFyci5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbE1vbnN0ZXJBcnJbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsTW9uc3RlckFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgaXNTdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmnIDov5Hnu4jngrnnmoTmgKrlhb1cbiAgICAgKi9cbiAgICBnZXRGaXJzdE1vbnN0ZXIoKSB7XG4gICAgICAgIC8v6buY6K6k56ys5LiA5LiqXG4gICAgICAgIHJldHVybiB0aGlzLmxldmVsTW9uc3RlckFyclswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmnIDpnaDov5Hoh6rlt7HnmoTmgKrlhb1cbiAgICAgKiBAcGFyYW0gcG9zIOiHquW3seS9jee9rlxuICAgICAqIEBwYXJhbSBkaXN0YW5jZU51bSDkvJjlhYjlsITnqIvot53nprtcbiAgICAgKi9cbiAgICBnZXRDbG9zZU1vbnN0ZXIocG9zOiBjYy5WZWMyLCBkaXN0YW5jZU51bTogbnVtYmVyID0gMjUwKSB7XG4gICAgICAgIC8v5pyA6Z2g6L+R6Ieq5bex55qEXG4gICAgICAgIGxldCBjbG9zZU1vbnNldHIgPSB7IGlkOiBudWxsLCBkaXN0YW5jZTogbnVsbCwgbnVtOiBudWxsLCBpc0Nsb3NlOiBmYWxzZSB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZXZlbE1vbnN0ZXJBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnICsgXCItXCIgKyB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwgKyBcIl9Nb25zdGVyX1wiICsgdGhpcy5sZXZlbE1vbnN0ZXJBcnJbaV0uaWQ7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0OiBjYy5Ob2RlID0gdGhpcy5Nb25zdGVyTWFwLmdldChuYW1lKTtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3M6IGNjLlZlYzIgPSB0YXJnZXQuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZTogbnVtYmVyID0gdGFyZ2V0UG9zLnN1Yihwb3MpLm1hZygpO1xuICAgICAgICAgICAgaWYgKChjbG9zZU1vbnNldHIuaWQgPT0gbnVsbCB8fCBkaXN0YW5jZSA8IGNsb3NlTW9uc2V0ci5kaXN0YW5jZSkgJiYgZGlzdGFuY2UgPD0gZGlzdGFuY2VOdW0pIHtcbiAgICAgICAgICAgICAgICBjbG9zZU1vbnNldHIuaWQgPSB0aGlzLmxldmVsTW9uc3RlckFycltpXS5pZDtcbiAgICAgICAgICAgICAgICBjbG9zZU1vbnNldHIuZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICBjbG9zZU1vbnNldHIubnVtID0gdGhpcy5sZXZlbE1vbnN0ZXJBcnJbaV0ubnVtO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjbG9zZU1vbnNldHIuaWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjbG9zZU1vbnNldHIuZGlzdGFuY2U7XG4gICAgICAgICAgICBjbG9zZU1vbnNldHIuaXNDbG9zZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gY2xvc2VNb25zZXRyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHN0cjogYW55ID0gdGhpcy5nZXRGaXJzdE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIGlmICghc3RyKSByZXR1cm47XG4gICAgICAgICAgICBzdHIuaXNDbG9zZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbG9zZU1vbnNldHIsJ2Nsb3NlTW9uc2V0cicpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aqM6K+B5piv5ZCm6L+Y5Zyo6Z2g6L+R5oCq5YW9XG4gICAgICogQHBhcmFtIGRhdGEge3Bvczroh6rlt7HnmoTkvY3nva4saWQ6fVxuICAgICAqL1xuICAgIGNoZWNrTW9uc3RlckNsb3NlKGRhdGE6IHsgcG9zOiBjYy5WZWMyLCBpZDogbnVtYmVyLCBkaXN0YW5jZU51bTogbnVtYmVyIH0pIHtcblxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZyArIFwiLVwiICsgdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsICsgXCJfTW9uc3Rlcl9cIiArIGRhdGEuaWQ7XG4gICAgICAgIGxldCB0YXJnZXQ6IGNjLk5vZGUgPSB0aGlzLk1vbnN0ZXJNYXAuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBsZXQgdGFyZ2V0UG9zOiBjYy5WZWMyID0gdGFyZ2V0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBkaXN0YW5jZTogbnVtYmVyID0gdGFyZ2V0UG9zLnN1YihkYXRhLnBvcykubWFnKCk7XG4gICAgICAgIHJldHVybiBkaXN0YW5jZSA8IGRhdGEuZGlzdGFuY2VOdW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W55u45ZCM55qE562J57qn55qE54Ku5Y+wXG4gICAgICogQHBhcmFtIGxldmVsIOetiee6p1xuICAgICAqL1xuICAgIGdldFBvb2xTYW1lTGV2ZWxUdXJyZXQobGV2ZWw6IG51bWJlcikge1xuXG4gICAgICAgIGxldCBzYW1lTGV2ZWwgPSB0b29sLkdldEFyckRhdGEoXCJsZXZlbFwiLCBsZXZlbCwgdGhpcy51c2VyRGF0YS5wb29sLCAtMSk7XG4gICAgICAgIHJldHVybiBzYW1lTGV2ZWw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkv53lrZjpgJrlhbPkv6Hmga/vvIzlubbkuJQrMVxuICAgICAqL1xuXG4gICAgc2F2ZUN1c3RvbUxldmVsKCk6IGJvb2xlYW4ge1xuXG5cbiAgICAgICAgLy8gbGV0IG1hcERhdGEgPSB0aGlzLm1hcENvbmZpZztcblxuICAgICAgICAvLyBpZih0aGlzLm1hcENvbmZpZy5sZW5ndGg8dGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsKzEpe1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLotoXov4fkuoZcIilcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGxldCBJc1VwOiBib29sZWFuID0gZmFsc2U7IC8v5piv5ZCm5Y2H57qnXG5cbiAgICAgICAgaWYgKHRoaXMubWFwQ29uZmlnLmxlbmd0aCA8IHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCArIDEpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nYW1lTGV2ZWxDb21wbGV0ZWQsXG4gICAgICAgICAgICAgICAgZGF0YTogeyBsZXZlbDogdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZyB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0ID0gW107XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzLnJld2FyZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZ2FtZUxldmVsUGFzc1Jld2FyZFZvTGlzdC5wdXNoKHJlcy5yZXdhcmRMaXN0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWujOaIkOWFs+WNoeS4iuaKpSFcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuY3VzdG9tcy5iaWcgKz0gMTtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCA9IDE7XG5cdFx0XHR0aGlzLnNldEludChcImN1c3RvbXNiaWdcIix0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnKVxuXHRcdFx0dGhpcy5zZXRJbnQoXCJjdXN0b21zc21hbGxcIix0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui2hei/h+S6huWwj+WFs+WNoeeahOeahOmVv+W6pizlsI/lhbPljaHlj5jkuLox77yM5aSn5YWz5Y2hKzFcIik7XG4gICAgICAgICAgICBJc1VwID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCArPSAxO1xuXHRcdFx0dGhpcy5zZXRJbnQoXCJjdXN0b21zc21hbGxcIix0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gSXNVcDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOS6p+iDvVxuICAgICAqIEBwYXJhbSBudW0g5Yqg5aSa5bCR5LiqKOm7mOiupDEpXG4gICAgICogQHBhcmFtIHR5cGUg5pmu6YCa55qEMO+8iOWPquiDveWinuWKoDIw5aaC5p6c6LaF6L+H5YiZ5LiN5aKe5Yqg77yJXG4gICAgICovXG4gICAgcHJvZHVjdFR1cnJldChudW06IG51bWJlciA9IDEsIHR5cGU6IG51bWJlciA9IDApIHtcblxuICAgICAgICB0aGlzLnVzZXJEYXRhLnByb2R1Y3QgKz0gbnVtO1xuICAgICAgICBpZiAodHlwZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFByb2R1Y3QoMCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOafpeaYr+WQpuiDveWNh+e6pyBcbiAgICAgKiBAcGFyYW0gbGV2ZWwg562J57qnXG4gICAgKi9cbiAgICBjaGVja1VwZGF0ZUxldmVsKGxldmVsOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy50dXJyZXREYXRhKTtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgbGV2ZWwpIHtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aKe5Yqg5aSa5bCR5Liq5Lqn6IO95oiW6ICF5YeP5bCRXG4gICAgICogQHBhcmFtIG51bSDmlbDph49cbiAgICAgKi9cbiAgICBhZGRQcm9kdWN0KG51bTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudXNlckRhdGEucHJvZHVjdCArPSBudW07XG4gICAgICAgIC8vIGlmKHRoaXMudXNlckRhdGEucHJvZHVjdCsxPmdhbWVOdW1lcmljYWwuUHJvZHVjdE1heCl7XG4gICAgICAgIC8vICAgICB0aGlzLnVzZXJEYXRhLnByb2R1Y3QgPSBnYW1lTnVtZXJpY2FsLlByb2R1Y3RNYXg7XG4gICAgICAgIC8vIH1lbHNlIFxuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5wcm9kdWN0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9kdWN0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVmlld19Vc2VyRGF0YVVwZGF0YSwgdXBkYXRlVHlwZS5wcm9kdWN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5aKe5Yqg5aSa5bCR5Liq6YeR5biB5oiW6ICF5YeP5bCRXG4gICAgICogQHBhcmFtIG51bSDmlbDph49cbiAgICAgKi9cbiAgICBhZGRDb2luKG51bSkge1xuICAgICAgICB0aGlzLnVzZXJEYXRhLmNvaW4gKz0gcGFyc2VJbnQobnVtKTtcbiAgICAgICAgaWYgKHRoaXMudXNlckRhdGEuY29pbiA8IDApIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuY29pbiA9IDA7XG4gICAgICAgIH1cblx0XHR0aGlzLnNhdmVkYXRhKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9XYWxsZXRfQWRkQ29pbixudW0pO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVmlld19Vc2VyRGF0YVVwZGF0YSwgdXBkYXRlVHlwZS5jb2luKTtcbiAgICB9XG5cbiAgICAvKirmnJ/pl7TliqDlpJrlsJHph5HluIFcbiAgICAgKiBAcGFyYW0gbnVtIOaVsOWAvFxuICAgICovXG4gICAgYWRkVGVybUNvaW4obnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy51c2VyRGF0YS50ZXJtQ29pbiArPSBudW07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5botK3kubDnmoTnrYnnuqflubbov5Tlm57nrYnnuqdcbiAgICAgKi9cbiAgICBnZXRCdXlSYW5kb21MZXZlbCgpOiBudW1iZXIge1xuXG4gICAgICAgIGxldCBkYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMuYnV5RGF0YSk7XG5cbiAgICAgICAgLy/ljZXni6znmoTnrYnnuqdcbiAgICAgICAgbGV0IGxldmVsOiBudW1iZXIgPSBudWxsO1xuXG4gICAgICAgIGxldCBzbWFsbERhdGEgPSB7IG51bTogMCwgbGV2ZWw6IDAgfTtcblxuICAgICAgICBsZXQgc3RyID0gdG9vbC5HZXRBcnJEYXRhKFwibGV2ZWxcIiwgdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbCwgZGF0YSk7XG4gICAgICAgIGxldCByYW5kb21MZXZlbDogbnVtYmVyID0gbnVsbDtcbiAgICAgICAgaWYgKCFzdHIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5om+5LiN5YiwflwiICsgdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbCArIFwi57qn55qE54Ku5aGU6LSt5Lmw5L+h5oGvXCIpXG4gICAgICAgICAgICBzdHIgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gSlNPTi5wYXJzZShzdHIuYXJyKTtcbiAgICAgICAgICAgIHJhbmRvbUxldmVsID0gdGhpcy5HZXRXZWlndGhMZXZlbChhcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnVzZXJEYXRhLnBvb2wubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy51c2VyRGF0YS5wb29sW2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWwgPT0gLTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKHNtYWxsRGF0YS5sZXZlbCA9PSAwIHx8IHNtYWxsRGF0YS5sZXZlbCA+IGl0ZW0ubGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBzbWFsbERhdGEubGV2ZWwgPSBpdGVtLmxldmVsO1xuICAgICAgICAgICAgICAgIHNtYWxsRGF0YS5udW0gPSAxO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzbWFsbERhdGEubGV2ZWwgPT0gaXRlbS5sZXZlbCkge1xuICAgICAgICAgICAgICAgIHNtYWxsRGF0YS5udW0gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc21hbGxEYXRhLm51bSA9PSAxICYmIHJhbmRvbUxldmVsID49IHNtYWxsRGF0YS5sZXZlbCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBzbWFsbERhdGEubGV2ZWw7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacieWNleeLrOeahOeCruWhlFwiLCBsZXZlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygpXG4gICAgICAgICAgICAvLyBsZXZlbCA9IE51bWJlcihzdHIubWluKTtcbiAgICAgICAgICAgIC8vIGxldCBtYXhMZXZlbDpudW1iZXIgPSBOdW1iZXIoc3RyLm1heCk7XG4gICAgICAgICAgICAvLyBpZihsZXZlbCt0aGlzLmJ1eUNvdW50Pm1heExldmVsKXtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJ1eUNvdW50ID0gMDtcbiAgICAgICAgICAgIC8vIH1lbHNle1xuICAgICAgICAgICAgLy8gICAgIGxldmVsICs9IHRoaXMuYnV5Q291bnQ7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyB0aGlzLmJ1eUNvdW50Kys7XG4gICAgICAgICAgICBsZXZlbCA9IHJhbmRvbUxldmVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZXZlbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICog6YCa6L+H5p2D6YeN6I635Y+W562J57qnXG4gICAgKi9cbiAgICBHZXRXZWlndGhMZXZlbChkYXRhOiBhbnlbXSkge1xuXG4gICAgICAgIGxldCBhcnIgPSB0b29sLmRlZXBDbG9uZShkYXRhKTtcblxuICAgICAgICBsZXQgc3RyID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBhcnJbaV07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaXRlbS53ZWlndGg7IGorKykge1xuXG4gICAgICAgICAgICAgICAgc3RyLnB1c2goaXRlbS5pZCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGxldCByYW5kb206IG51bWJlciA9IHRvb2wuR2V0UmFuZG9tKDAsIHN0ci5sZW5ndGggLSAxKTtcbiAgICAgICAgbGV0IGlkOiBudW1iZXIgPSBzdHJbcmFuZG9tXTtcbiAgICAgICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgICAgICAgIGlkID0gYXJyWzBdLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE51bWJlcihpZCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4DmtYvlnKjlk6rph4xcbiAgICAgKiBAcGFyYW0gcG9zIOeCuSDln7rkuo7kuK3lv4PngrljYy52MlxuICAgICAqIEBwYXJhbSBjYWxsIOWbnuiwgyBcbiAgICAgKi9cbiAgICBjaGVja1RvdWNoUG9vbChwb3M6IGNjLlZlYzIsIGNhbGw6IEZ1bmN0aW9uKSB7XG5cbiAgICAgICAgbGV0IGRhdGE6IG51bWJlciA9IG51bGw7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsTWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMubGV2ZWxNYXBbaV07XG4gICAgICAgICAgICAvL+agvOWtkOeahOS9jee9rlxuXG4gICAgICAgICAgICBsZXQgc3RyID0ge1xuICAgICAgICAgICAgICAgIHg6IG51bGwsXG4gICAgICAgICAgICAgICAgeTogbnVsbCxcbiAgICAgICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT0gdGhpbmdUeXBlLnR1cnJldCkge1xuICAgICAgICAgICAgICAgIHN0ci54ID0gdGhpcy5tYXBTaXplLnN0YXJ0R3JpZFBvcy54ICsgaXRlbS54ICogdGhpcy5tYXBTaXplLmdyaWQ7XG4gICAgICAgICAgICAgICAgc3RyLnkgPSB0aGlzLm1hcFNpemUuc3RhcnRHcmlkUG9zLnkgLSBpdGVtLnkgKiB0aGlzLm1hcFNpemUuZ3JpZDtcbiAgICAgICAgICAgICAgICBzdHIud2lkdGggPSB0aGlzLm1hcFNpemUuZ3JpZDtcbiAgICAgICAgICAgICAgICBzdHIuaGVpZ2h0ID0gdGhpcy5tYXBTaXplLmdyaWQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PSB0aGluZ1R5cGUucmVjeWNsZSkge1xuICAgICAgICAgICAgICAgIHN0ci54ID0gaXRlbS5wb3MueDtcbiAgICAgICAgICAgICAgICBzdHIueSA9IGl0ZW0ucG9zLnk7XG4gICAgICAgICAgICAgICAgc3RyLndpZHRoID0gaXRlbS53aWR0aDtcbiAgICAgICAgICAgICAgICBzdHIuaGVpZ2h0ID0gaXRlbS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBsZXQgaXRlbVg6bnVtYmVyID0gdXRpbC5tYXBTaXplLnN0YXJ0R3JpZFBvcy54K2l0ZW0ueCp1dGlsLm1hcFNpemUuZ3JpZDtcbiAgICAgICAgICAgIC8vIGxldCBpdGVtWTpudW1iZXIgPSB1dGlsLm1hcFNpemUuc3RhcnRHcmlkUG9zLnktaXRlbS55KnV0aWwubWFwU2l6ZS5ncmlkO1xuXG4gICAgICAgICAgICBpZiAoc3RyLnkgKyBzdHIuaGVpZ2h0IC8gMiA+PSBwb3MueSAmJiBwb3MueSA+PSBzdHIueSAtIHN0ci5oZWlnaHQgLyAyICYmXG4gICAgICAgICAgICAgICAgc3RyLnggKyBzdHIud2lkdGggLyAyID49IHBvcy54ICYmIHBvcy54ID49IHN0ci54IC0gc3RyLndpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT0gdGhpbmdUeXBlLnJlY3ljbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZWN5Y2xlRm4oKTtcbiAgICAgICAgICAgICAgICAgICAgLy/pu5jorqTlnoPlnL7kuLoxMDBcbiAgICAgICAgICAgICAgICAgICAgY2FsbCgxMDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGEgPSBpdGVtLm5vO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tIZWF2ZW5Qb29sKGRhdGEpKSB7XG4gICAgICAgICAgICBkYXRhID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhID09IHRoaXMudXNlckRhdGEuZW1wdHlCb3hObykge1xuICAgICAgICAgICAgZGF0YSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxsKGRhdGEpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yik5pat5piv5ZCm5Zyo5a2Y5ZyoXG4gICAgICogQHBhcmFtIG5vIOesrOWHoOS4qlxuICAgICAqL1xuICAgIGNoZWNrTm9FeGlzdChubzogbnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB0b29sLkdldEFyckRhdGEoXCJub1wiLCBubywgdGhpcy51c2VyRGF0YS5wb29sKTtcbiAgICAgICAgaWYgKGRhdGEubGV2ZWwgPT0gLTEgJiYgZGF0YS5zdGF0ZSA9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W55So5oi36YGT5YW35pWw6YePXG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LXG4gICAgICovXG4gICAgR2V0UHJvcE51bSh0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGE6IHByb3BJbmZvID0gdG9vbC5HZXRBcnJEYXRhKFwidHlwZVwiLCB0eXBlLCB0aGlzLnVzZXJEYXRhLnByb3ApO1xuICAgICAgICByZXR1cm4gZGF0YS5udW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6YGT5YW35oyB57ut5pe26Ze0XG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LXG4gICAgICovXG4gICAgR2V0UHJvcFRpbWUodHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwcm9wRGF0YSA9IHRoaXMucHJvcENvbmZpZztcbiAgICAgICAgY29uc29sZS5sb2cocHJvcERhdGEsICdwcm9wRGF0YScpXG4gICAgICAgIGxldCBkYXRhID0gdG9vbC5HZXRBcnJEYXRhKFwidHlwZVwiLCB0eXBlLCBwcm9wRGF0YSk7XG4gICAgICAgIHJldHVybiBOdW1iZXIoZGF0YS50aW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkvb/nlKjlk6rkuKrnsbvlnovpgZPlhbdcbiAgICAgKiBAcGFyYW0gdHlwZSDnsbvlnovpgZPlhbdcbiAgICAgKi9cbiAgICBVc2VQcm9wKHR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgbnVtOiBudW1iZXIgPSBOdW1iZXIodHlwZSkgLSAxO1xuICAgICAgICB0aGlzLnVzZXJEYXRhLnByb3BbbnVtXS50aW1lID0gdGhpcy5HZXRQcm9wVGltZSh0eXBlKTtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9wW251bV0udXNlID0gcHJvcFN0YXRlLnN0YXJ0O1xuICAgICAgICB0aGlzLnVzZXJEYXRhLnByb3BbbnVtXS5udW0gLT0gMTtcbiAgICAgICAgaWYgKHR5cGUgPT0gcHJvcFR5cGUuY2xzKSB7ICAgICAgICAgICAgICAgICAgICAgICAgIC8v5riF5bGPICAgICAgICAgICAgXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLlRvb2xfRWZmZWN0X05hbWUuR2FtZV9Qcm9wX0Nscyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBwcm9wVHlwZS5hdXRvKSB7ICAgICAgICAgICAgICAgICAgLy/oh6rliqjlkIjmiJBcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuVG9vbF9FZmZlY3RfTmFtZS5HYW1lX1Byb3BfQXR1byk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBwcm9wVHlwZS5zaG9jaykgeyAgICAgICAgICAgICAgICAgIC8v55S15Ye7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLlRvb2xfRWZmZWN0X05hbWUuR2FtZV9Qcm9wX1Nob2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLnNoaWVsZCkgeyAgICAgICAgICAgICAgICAgLy/miqTnm75cbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuVG9vbF9FZmZlY3RfTmFtZS5HYW1lX1Byb3BfU2hpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLmZyb3plbikgeyAgICAgICAgICAgICAgICAgLy/lhrDlhrtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuVG9vbF9FZmZlY3RfTmFtZS5HYW1lX1Byb3BfRnJvemVuKTtcbiAgICAgICAgfVxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVG9vbF9Vc2UsIHR5cGUpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUHJvcEl0ZW1fVXBkYXRlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCLkvb/nlKjmiJDlip9cIiwgdHlwZSwgdGhpcy51c2VyRGF0YS5wcm9wW251bV0sIHByb3BTdGF0ZS5zdGFydCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN5pyA6auY562J57qn55qE54Ku5aGU5pWw57uEMuS4quS7peS4iueahFxuICAgICAqL1xuICAgIEdldFR1cnJldEF1dG8oKSB7XG4gICAgICAgIGxldCBwb29sOiBQb29sSW5mb1tdID0gdG9vbC5kZWVwQ2xvbmUodGhpcy51c2VyRGF0YS5wb29sKTtcbiAgICAgICAgaWYgKHBvb2wubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xuICAgICAgICBsZXQgc29ydEZuID0gKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGxldCBudW0gPSBiLmxldmVsIC0gYS5sZXZlbDtcbiAgICAgICAgICAgIHJldHVybiBudW07XG4gICAgICAgIH1cbiAgICAgICAgcG9vbCA9IHBvb2wuc29ydChzb3J0Rm4pO1xuICAgICAgICBsZXQgTmV3QXJyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGFyciA9IHRvb2wuR2V0QXJyRGF0YShcImxldmVsXCIsIHBvb2xbaV0ubGV2ZWwsIHBvb2wsIC0xKTtcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID4gMSAmJiB0aGlzLmNoZWNrVXBkYXRlTGV2ZWwoYXJyWzBdLmxldmVsICsgMSkpIHtcbiAgICAgICAgICAgICAgICBOZXdBcnIgPSBhcnI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE5ld0Fyci5sZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8qKuajgOafpeacgOmrmCAqL1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tVcGRhdGVMZXZlbChOZXdBcnJbMF0ubGV2ZWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcG9vbCA9IG51bGw7XG4gICAgICAgIHJldHVybiBOZXdBcnIuc2xpY2UoMCwgMik7XG4gICAgfVxuXG4gICAgLyoq6I635Y+W55So5oi35b2T5YmN5o+Q546w6YeR6aKdICovXG4gICAgZmluZEdvbGRDYXNoKCkge1xuICAgICAgICBsZXQgY2FzaCA9IHRoaXMudXNlckRhdGEuY29pbiAvIHRoaXMudXNlckRhdGEuZXhjaGFuZ2VSYXRlIHx8IDBcbiAgICAgICAgcmV0dXJuIFRleHRDdHIudHJpZ2dlck51bWJlcihjYXNoKVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlj5HpgIHlv6vnhadcbiAgICAgKi9cbiAgICBzZW5kVHVycmV0RGF0YShjYWxsPzogRnVuY3Rpb24pIHtcblxuICAgICAgICBpZiAodGhpcy5pc1NlbmRUdXJyZXREYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5pyq5Yiw5Y+R6YCB5b+r54Wn5pe26Ze0O1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTZW5kVHVycmV0RGF0YSA9IHRydWU7XG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcblxuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5idXlDb3VudCA+IDAgfHwgdGhpcy51c2VyRGF0YS5jb21wb3VuZFRpbWVzKSB7XG4gICAgICAgICAgICBkYXRhLnVzZXJNYXBEZXRhaWwgPSB0aGlzLnVzZXJEYXRhLnBvb2w7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmJ1eUNvdW50ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxhc3REYXRhLmNvbXBvdW5kVGltZXMgIT09IHRoaXMudXNlckRhdGEuY29tcG91bmRUaW1lcyAmJiB0aGlzLnVzZXJEYXRhLmNvbXBvdW5kVGltZXMgPiAwKSB7XG4gICAgICAgICAgICBkYXRhLmNvbXBvdW5kVGltZXMgPSB0aGlzLnVzZXJEYXRhLmNvbXBvdW5kVGltZXM7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmNvbXBvdW5kVGltZXMgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhc3REYXRhLmhpZ2hlc3RCYXR0ZXJ5TGV2ZWwgIT09IHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWwpIHtcbiAgICAgICAgICAgIGRhdGEuaGlnaGVzdEJhdHRlcnlMZXZlbCA9IHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWw7XG4gICAgICAgICAgICB0aGlzLmxhc3REYXRhLmhpZ2hlc3RCYXR0ZXJ5TGV2ZWwgPSB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLnRlcm1Db2luID4gMCkge1xuICAgICAgICAgICAgZGF0YS5wb2ludCA9IHRoaXMudXNlckRhdGEudGVybUNvaW47XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLnRlcm1Db2luID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sYXN0RGF0YS51c2VyQmF0dGVyeU51bSAhPT0gdGhpcy51c2VyRGF0YS5wcm9kdWN0ICYmIHRoaXMudXNlckRhdGEucHJvZHVjdCA+IDApIHtcbiAgICAgICAgICAgIGRhdGEudXNlckJhdHRlcnlOdW0gPSB0aGlzLnVzZXJEYXRhLnByb2R1Y3Q7XG4gICAgICAgICAgICB0aGlzLmxhc3REYXRhLnVzZXJCYXR0ZXJ5TnVtID0gdGhpcy51c2VyRGF0YS5wcm9kdWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudXNlckRhdGEucmVzaXN0QXR0YWNrVGltZXMgPiAwKSB7XG4gICAgICAgICAgICBkYXRhLnJlc2lzdEF0dGFja1RpbWVzID0gdGhpcy51c2VyRGF0YS5yZXNpc3RBdHRhY2tUaW1lcztcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEucmVzaXN0QXR0YWNrVGltZXMgPSAwO1xuICAgICAgICB9XG5cblxuICAgICAgICBYTVNESy50cmFja1VzZXJQcm9wZXJ0aWVzKHtcbiAgICAgICAgICAgIGNvaW5fYmFsYW5jZTogdGhpcy51c2VyRGF0YS5jb2luICsgXCLph5HluIFcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXNlckRhdGEudmVyc2lvbiArPSAxO1xuICAgICAgICBkYXRhLnZlcnNpb24gPSB0aGlzLnVzZXJEYXRhLnZlcnNpb247XG4gICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShkYXRhKSA9PSBcInt9XCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNTZW5kVHVycmV0RGF0YSA9IGZhbHNlO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgdGhpcy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ2FtZUxldmVsUmVwb3J0LFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2hlY2tUYXNrUmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn1wiKVxuICAgICAgICAgICAgICAgIGNhbGwgJiYgY2FsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOWksei0pVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph5HluIHlv6vnhadcbiAgICAgKi9cblxuICAgIHNlbmRDb2luRGF0YShjYWxsPzogRnVuY3Rpb24pe1xuXG4gICAgICAgIGlmKHRoaXMuaXNTZW5kQ29pbkRhdGEpcmV0dXJuO1xuICAgICAgICB0aGlzLmlzU2VuZENvaW5EYXRhID0gdHJ1ZTtcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHt9O1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS50ZXJtQ29pbiA+IDApIHtcbiAgICAgICAgICAgIGRhdGEucG9pbnQgPSB0aGlzLnVzZXJEYXRhLnRlcm1Db2luO1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS50ZXJtQ29pbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51c2VyRGF0YS52ZXJzaW9uICs9IDE7XG4gICAgICAgIGRhdGEudmVyc2lvbiA9IHRoaXMudXNlckRhdGEudmVyc2lvbjtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzU2VuZENvaW5EYXRhID0gZmFsc2U7XG4gICAgICAgIH0sIDMwMDApO1xuICAgICAgICB0aGlzLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nYW1lTGV2ZWxSZXBvcnQsXG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg6YeR5biB5oiQ5YqfXCIpXG4gICAgICAgICAgICAgICAgY2FsbCAmJiBjYWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg6YeR5biB5aSx6LSlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN562J57qn54Ku5aGU55qE5aSp6ZmN6YeR5biB5pe26Ze0XG4gICAgICovXG4gICAgR2V0SGVhdmVuVGltZSgpOiBudW1iZXIge1xuXG4gICAgICAgIC8vIGxldCBjb2luRGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLmNvaW5EYXRhKTtcbiAgICAgICAgLy8gLy/lvZPliY3mnIDpq5jnrYnnuqfnmoTngq7loZRcbiAgICAgICAgLy8gbGV0IGxldmVsOiBudW1iZXIgPSB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsO1xuICAgICAgICAvLyAvL+m7mOiupDYwc1xuICAgICAgICAvLyBsZXQgdGltZTogbnVtYmVyID0gNjA7XG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgY29pbkRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgIGxldCBpdGVtID0gY29pbkRhdGFbaV07XG4gICAgICAgIC8vICAgICBpZiAoaXRlbS5taW4gPD0gbGV2ZWwgJiYgaXRlbS5tYXggPj0gbGV2ZWwpIHtcbiAgICAgICAgLy8gICAgICAgICB0aW1lID0gaXRlbS50aW1lO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgbGV0IHRpbWU6bnVtYmVyID0gdG9vbC5HZXRSYW5kb20oMzAsNjApO1xuXG4gICAgICAgIHJldHVybiB0aW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWkqemZjemHkeW4geeahOS9jee9riDmsqHmnInnrKblkIjlsLFudWxsXG4gICAgICovXG4gICAgR2V0SGVhdmVuUGxhY2UoKTogbnVtYmVyIHtcbiAgICAgICAgLy/nqbrnmoTkvY3nva5cbiAgICAgICAgbGV0IGVtcHR5UGxhY2UgPSB0b29sLkdldEFyckRhdGEoXCJsZXZlbFwiLCAtMSwgdGhpcy51c2VyRGF0YS5wb29sLCAtMSk7XG4gICAgICAgIGlmICghZW1wdHlQbGFjZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIC8v56ym5ZCI55qE5L2N572uXG4gICAgICAgIGxldCBjb25mb3JtUGxhY2UgPSB0b29sLkdldEFyckRhdGEoXCJzdGF0ZVwiLCAxLCBlbXB0eVBsYWNlLCAtMSk7XG4gICAgICAgIGlmICghY29uZm9ybVBsYWNlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAvL+espuWQiOeahOaVsOe7hFxuICAgICAgICBsZXQgbmV3QXJyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZm9ybVBsYWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNvbmZvcm1QbGFjZVtpXTtcbiAgICAgICAgICAgIGxldCBoZWF2ZW5JdGVtID0gdG9vbC5HZXRBcnJEYXRhKFwibm9cIiwgaXRlbS5ubywgdGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sKTtcbiAgICAgICAgICAgIGxldCBpc0hhdmVFbXB0eUJveCA9IGhlYXZlbkl0ZW0ubm8gPT0gdGhpcy51c2VyRGF0YS5lbXB0eUJveE5vO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS5ubyA9PSBoZWF2ZW5JdGVtLm5vICYmIGhlYXZlbkl0ZW0uaWQgPT0gbnVsbCAmJiAhaXNIYXZlRW1wdHlCb3gpIHtcbiAgICAgICAgICAgICAgICBuZXdBcnIucHVzaChpdGVtLm5vKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+maj+acuuS4gOS4qlxuICAgICAgICBsZXQgcmFuZG9tTnVtID0gdG9vbC5HZXRSYW5kb20oMCwgbmV3QXJyLmxlbmd0aCAtIDEpO1xuICAgICAgICByZXR1cm4gbmV3QXJyW3JhbmRvbU51bV07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bngq7lvLnmlbDmja5cbiAgICAgKi9cbiAgICBHZXRCdWxsZXREYXRhKHR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLmJ1bGxldERhdGEpO1xuICAgICAgICByZXR1cm4gdG9vbC5HZXRBcnJEYXRhKFwidHlwZVwiLCB0eXBlLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bniIbngrjlkI3lrZdcbiAgICAgKi9cbiAgICBHZXRCb29tTmFtZSh0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5idWxsZXREYXRhKTtcbiAgICAgICAgcmV0dXJuIHRvb2wuR2V0QXJyRGF0YShcInR5cGVcIiwgdHlwZSwgZGF0YSkuYm9vbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbpoobov4flrp3nrrEgXG4gICAgICog5aaC5p6c56ym5ZCI5bCx6L6T5Ye65a6d566xaWQg5LiN56ym5ZCI5bCxbnVsbFxuICAgICovXG4gICAgY2hlY2tUcmVhc3VyZVNob3coKTogbnVtYmVyIHtcbiAgICAgICAgWE1TREsucG9zdCh7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LnRyZWFzdXJlQm94X0lzZ2V0LFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSAmJiByZXMuZGF0YS5zaG93Qm94ICE9IDEpIHsgICAgICAgLy/pooblj5bov4dcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLnRyZWFzdXJlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmVhc3VyZUlkOiBudW1iZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm1pbiA8PSB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsICYmIGl0ZW0ubWF4ID4gdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWFzdXJlSWQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmVhc3VyZUlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGVja0lkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkID09IHRyZWFzdXJlSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNFeGlzdDogYm9vbGVhbiA9IHRoaXMudXNlckRhdGEuaGF2ZVRyZWFzdXJlLnNvbWUoY2hlY2tJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0V4aXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmVhc3VyZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkv53lrZjlrp3ol4/nirbmgIFcbiAgICAgKiBAcGFyYW0gaWQgaWRcbiAgICAgKi9cbiAgICBzYXZlVHJlYXN1cmVEYXRhKGlkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGNoZWNrSWQgPSAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT0gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlzRXhpc3Q6IGJvb2xlYW4gPSB0aGlzLnVzZXJEYXRhLmhhdmVUcmVhc3VyZS5zb21lKGNoZWNrSWQpO1xuXG4gICAgICAgIGlmIChpc0V4aXN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5a6d6JeP5a2Y5Zyo6L+H5LqGXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5oYXZlVHJlYXN1cmUucHVzaChpZCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0b3JhZ2UoXCJoYXZlVHJlYXN1cmVcIiwgdGhpcy51c2VyRGF0YS5oYXZlVHJlYXN1cmUpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWtmOacrOWcsOaVsOaNrlxuICAgICAqIEBwYXJhbSBrZXkg6ZSu5ZCNXG4gICAgICogQHBhcmFtIHZhbHVlIOWAvFxuICAgICAqL1xuICAgIHNldFN0b3JhZ2Uoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgbGV0IGRhdGFTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIC8vbGV0IGVuY3J5cHRlZCA9IGVuY3J5cHQuZW5jcnlwdChkYXRhU3RyaW5nLHRoaXMuc2VjcmV0a2V5LDI1Nik7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGRhdGFTdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluacrOWcsOWAvFxuICAgICAqIEBwYXJhbSBrZXkg6ZSu5ZCNXG4gICAgICovXG4gICAgZ2V0U3RvcmFnZShrZXk6IHN0cmluZykge1xuICAgICAgICBsZXQgY2lwaGVyVGV4dCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICBpZiAoY2lwaGVyVGV4dCA9PSBudWxsIHx8IGNpcGhlclRleHQgPT0gXCJcIiB8fCBjaXBoZXJUZXh0ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy9sZXQgdmFsdWUgPSBKU09OLnBhcnNlKGVuY3J5cHQuZGVjcnlwdChjaXBoZXJUZXh0LHRoaXMuc2VjcmV0a2V5LDI1NikpO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShjaXBoZXJUZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDop6PplIHmlrDlnLDmlrlcbiAgICAgKi9cbiAgICB1bmxvY2tQbGFjZSgpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLnBvb2xbaV07XG4gICAgICAgICAgICBpZiAoaXRlbS5zdGF0ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wb29sW2ldLnN0YXRlID0gMTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuino+mUgeaWsOS9jee9rlwiLCBpdGVtLm5vKTtcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVW5sb2NrX1BsYWNlLCBpdGVtLm5vKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdXJsIOWcsOWdgFxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxuICAgICAqIEBwYXJhbSBjYWxsIOWbnuiwg1xuICAgICAqL1xuICAgIHBvc3Qob2JqOiB7IHVybDogc3RyaW5nLCBkYXRhPzogYW55LCBzdWNjZXNzPzogRnVuY3Rpb24sIGZhaWw/OiBGdW5jdGlvbiB9KSB7XG5cbiAgICAgICAgWE1TREsucG9zdCh7XG4gICAgICAgICAgICB1cmw6IG9iai51cmwsXG4gICAgICAgICAgICBkYXRhOiBvYmouZGF0YSxcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivt+axguaIkOWKn1wiICsgb2JqLnVybCwgcmVzKVxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvYmouc3VjY2VzcyAmJiBvYmouc3VjY2VzcyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYmouZmFpbCAmJiBvYmouZmFpbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcbiAgICAgICAgICAgICAgICBvYmouZmFpbCAmJiBvYmouZmFpbChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgZ2V0ZGF0YVN0cihvYmo6IHsgdXJsOiBzdHJpbmcsIGRhdGE/OiBhbnksIHN1Y2Nlc3M/OiBGdW5jdGlvbiwgZmFpbD86IEZ1bmN0aW9uIH0pIHtcblxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogb2JqLnVybCxcbiAgICAgICAgICAgIGRhdGE6IG9iai5kYXRhLFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+35rGC5oiQ5YqfXCIgKyBvYmoudXJsLCByZXMpXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5zdWNjZXNzICYmIG9iai5zdWNjZXNzKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5mYWlsICYmIG9iai5mYWlsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG9iai5mYWlsICYmIG9iai5mYWlsKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOWIpOaWreaYr+WQpuW9k+WkqVxuICAgICAqL1xuXG4gICAgY2hla2NUb2RheSgpIHtcblxuICAgICAgICBsZXQgZGF5ID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gICAgICAgIGxldCBpc0RheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAoZGF5ID09IHRoaXMudXNlckRhdGEuR2V0RGF5VGltZSkge1xuICAgICAgICAgICAgaXNEYXkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNEYXkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RvcmFnZSh0aGlzLmxvY2FsRGlhcnkuR2V0RGF5VGltZSwgZGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc0RheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpooTliqDovb3lub/lkYpcbiAgICAgKiBAcGFyYW0gcG9zIOS9jee9rlxuICAgICAqIEBwYXJhbSBpc1ZpZXcg5piv5ZCm5Li65L+h5oGv5rWBXG4gICAgICovXG5cbiAgICBwcmVsb2FkQWQocG9zLCBpc1ZpZXc6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMuYWRQcmVPYmpbcG9zXSkge1xuICAgICAgICAgICAgdGhpcy5hZFByZU9ialtwb3NdID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChpc1ZpZXcpIHtcbiAgICAgICAgICAgICAgICBBZENvbnRyb2xsZXIucHJlVmlld0FkKHBvcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIEFkQ29udHJvbGxlci5wcmVWaWRlb0FkKHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9vVwiICsgKGlzVmlldyA/IFwi5L+h5oGv5rWBXCIgOiBcIuinhumikVwiKSArIHBvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hZFByZU9ialtwb3NdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliKDpmaRcIiArIChpc1ZpZXcgPyBcIuS/oeaBr+a1gVwiIDogXCLop4bpopFcIikgKyBwb3MgKyBcIuiusOW9lVwiKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrnqbrlnLDlrp3nrrFcbiAgICAgKi9cbiAgICBzaG93RW1wdHlCb3goKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmVtcHR5Qm94Tm8gPCAwKSB7XG4gICAgICAgICAgICBsZXQgbG9jYXRpb246IG51bWJlciA9IHRoaXMuY2hlY2tQb29sKCk7XG4gICAgICAgICAgICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuayoeacieS9jee9rlwiKTtcbiAgICAgICAgICAgICAgICAvLyBUcmFja01nci5haXJib3JuZV9nb2xkKHtcbiAgICAgICAgICAgICAgICAvLyAgICAgYWN0aXZpdHlfc3RhdGU6IFwi6YeR5biB5LiL5Y+RXCIsXG4gICAgICAgICAgICAgICAgLy8gICAgIGRpc3RyaWJ1dGlvbl9zdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC8vICAgICBmYWlsdXJlX3JlYXNvbnM6IFwi5rKh5pyJ5L2N572uXCJcbiAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgIFRyYWNrTWdyLmVtcHR5X3RyZWFzdXJlKHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IGDlrp3nrrHkuIvlj5FgLFxuICAgICAgICAgICAgICAgICAgICBkaXN0cmlidXRpb25fc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZmFpbHVyZV9yZWFzb25zOiBg5b2T5YmN5rKh5pyJ56m65Zyw77yb5Zy65Zyw5LiK5pyJ5pyq5byA5ZCv5a6d566xYCxcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVHJhY2tNZ3IuZW1wdHlfdHJlYXN1cmUoe1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBg5a6d566x5LiL5Y+RYCxcbiAgICAgICAgICAgICAgICBkaXN0cmlidXRpb25fc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKHtcbiAgICAgICAgICAgICAgICBkaWFsb2dfbmFtZV9oY2RnOiBg56m66ZmN5a6d566x77yI5pyq56C45byA77yJYFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5lbXB0eUJveE5vID0gbG9jYXRpb247XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLlNob3dfRW1wdHlfQm94KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluesrOS4gOS4quS7u+WKoVxuICAgICAqL1xuICAgIGdldEZpc3RUYXNrKGNhbGw6IEZ1bmN0aW9uKSB7XG4gICAgICAgIC8v5Lu75Yqh5a6M5oiQ6aG65bqPXG4gICAgICAgIGxldCB0YXNrT3JkZXIxOiBudW1iZXJbXSA9IFsyLCA3LCA0LCA4LCA2XTtcbiAgICAgICAgbGV0IHRhc2tPcmRlcjI6IG51bWJlcltdID0gWzEsIDIsIDMsIDRdO1xuICAgICAgICAvL+S7u+WKoeexu+WeiyAwOuaXpeW4uCAxOuaIkOWwsVxuICAgICAgICBsZXQgdGFza1R5cGU6IG51bWJlciA9IG51bGw7XG4gICAgICAgIC8v56ym5ZCI55qE5Lu75YqhXG4gICAgICAgIGxldCBzdHIgPSBbXTtcblxuICAgICAgICBsZXQgY2hlY2tUYXNrID0gKGFycikgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGFza1R5cGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNhbGwobnVsbCwgdGFza1R5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9yZGVyID0gdGFza1R5cGUgPT0gMCA/IHRhc2tPcmRlcjEgOiB0YXNrT3JkZXIyO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9yZGVyLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN0ci5sZW5ndGg7IGorKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlcltpXSA9PSBzdHJbal0udGFza1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGwoc3RyW2pdLCB0YXNrVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC50YXNrX2RheV9tYWluLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMubGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5saXN0O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2ldLnRhc2tUeXBlID09IDIgJiYgdGhpcy51c2VyRGF0YS5sb2NhbENvbXBvdW5kVGltZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5sb2NhbENvbXBvdW5kVGltZSA9IGxpc3RbaV0udXNlclRhc2tWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2ldLmJ1dHRvblR5cGUgIT09IDQgJiYgbGlzdFtpXS50YXNrVHlwZSAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tUeXBlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIucHVzaChsaXN0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2tUeXBlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmFjaGlldmVtZW50X21haW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5saXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5saXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0uYnV0dG9uVHlwZSAhPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrVHlwZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIucHVzaChsaXN0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1Rhc2soc3RyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tUYXNrKHN0cik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlj5HpgIHnnIvop4bpopHojrflj5bngq7loZTorrDlvZVcbiAgICAgKi9cbiAgICBzZW5kVHVycmV0TnVtKCkge1xuXG4gICAgICAgIHRoaXMucG9zdCh7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LndhdGNoVmlkZW9BZGRCYXR0ZXJ5LFxuICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K6w5b2V55yL6KeG6aKR6I635b6X54Ku5aGU5Lu75YqhXCIpXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLorrDlvZXnnIvop4bpopHojrflvpfngq7loZTku7vliqHlpLHotKVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cbiAgICBzZXRUZW1wUGFybShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy50ZW1wUGFybVtuYW1lXSA9IHZhbHVlXG4gICAgfVxuICAgIGdldFRlbXBQYXJtKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy50ZW1wUGFybVtuYW1lXVxuICAgIH1cblxuXHRnZXRNYXBkYXRhKGJpZ21hcClcblx0e1xuXHRcdC8vanNvbkFyci5na0RhdGFcblx0XHRsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLmdrRGF0YSk7XG5cdFx0Ly9jb25zb2xlLmxvZyhiaWdtYXAgKyBcIiBqc29uQXJyLmdrRGF0YSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSA6XCIgKyAgSlNPTi5zdHJpbmdpZnkoIGRhdGEgKSApXG5cdFx0bGV0IG53ZGF0YSA9IFtdXG5cdFx0XG5cdFx0Zm9yIChsZXQgaT0wO2k8ZGF0YS5sZW5ndGg7aSsrKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiLS0tLS0tLSMgXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW2ldKSApXG5cdFx0XHRpZiggZGF0YVtpXVtcImxldmVsTm9cIl0gPT0gYmlnbWFwK1wiXCIpXG5cdFx0XHR7XG5cdFx0XHRcdG53ZGF0YS5wdXNoKGRhdGFbaV0pKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gbndkYXRhXG5cdH1cblxuICAgIC8qKlxuICAgICAqIOaYr+WQpuS4umLnlKjmiLdcbiAgICAgKi9cbiAgICBjaGVja1Rlc3RCKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdXNlcjpzdHJpbmcgPSBBc3Npc3RDdHIuaXNBVGVzdCgpP1wiQVwiOlwiQlwiO1xuICAgICAgICByZXR1cm4gdGhpcy5BQl9UZXN0W25hbWVdW3VzZXJdPT1cInRydWVcIj90cnVlOmZhbHNlO1xuICAgIH1cblxuICAgIC8qKuemu+e6v+WinuWKoOeCruWhlOasoeaVsCovXG4gICAgb2ZmbGluZVR1cnJldFByb2R1Y3QoKSB7XG4gICAgICAgIC8v5b2T5YmN5pe26Ze0XG4gICAgbGV0IG5vd1RpbWU6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAvL+S4iuS4gOasoeaXtumXtFxuICAgICAgICBsZXQgbGFzdFRpbWU6IG51bWJlciA9IHRoaXMuZ2V0U3RvcmFnZSh0aGlzLmxvY2FsRGlhcnkub2ZmbGluZVRpbWUpIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAvL+avjzMw56eS5LiA5LiqIOaNoueul1xuICAgICAgICBsZXQgdGltZTogbnVtYmVyID0gTWF0aC5mbG9vcigobm93VGltZSAtIGxhc3RUaW1lKSAvIDEwMDAgLyAzMCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCfnprvnur/lop7liqAnICsgdGltZSArIFwi5Liq54Ku5aGULOemu+e6v+aXtumXtOS4uu+8mlwiICsgKG5vd1RpbWUgLSBsYXN0VGltZSkgLyAxMDAwKTtcbiAgICAgICAgaWYgKHRpbWUgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLnByb2R1Y3QgKyB0aW1lID4gMjApIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEucHJvZHVjdCA9IHRoaXMudXNlckRhdGEucHJvZHVjdCA+IDIwID8gdGhpcy51c2VyRGF0YS5wcm9kdWN0IDogMjA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RUdXJyZXQodGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdG9yYWdlKHRoaXMubG9jYWxEaWFyeS5vZmZsaW5lVGltZSwgbnVsbCk7XG4gICAgfVxuXG5cbiAgICBcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBuZXcgdXRpbCgpOyJdfQ==