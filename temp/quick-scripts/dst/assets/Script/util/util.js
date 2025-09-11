
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
var TextCtr_1 = require("../Assist/TextCtr");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var UrlConst_1 = require("../server/UrlConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var AssistCtr_1 = require("../Assist/AssistCtr");
var Tools_1 = require("./Tools");
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
        this.iphoneXTop = 50; //刘海屏高度
        this.savingPotLock = false; //是否解锁了金币飞入存钱罐
        this.Opening_times_level = 0; //开启次数
        this.isCheckTaskRed = true; //是否检测首页任务红点
        this.adPreObj = {}; //预加载广告的
        /**用户数据 */
        this.userData = {
            pool: [],
            coin: 0,
            hongbao: 0,
            customs: { big: 1, small: 1 },
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
            var heavenItem = Tools_1.Tools.GetArrData("no", item.no, this.userData.heavenPool);
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
        data = Tools_1.Tools.deepClone(Tools_1.Tools.GetArrData("level", level, turretData));
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
        return Tools_1.Tools.GetArrData("type", type, this.behaviorRewardVoList).reward;
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
        this.userData.customs.big = this.userData.customs.big > 45 ? 45 : this.userData.customs.big;
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
        var data = Tools_1.Tools.GetArrData("id", 1, mapData);
        //console.log("--------GetCustomsMap----------:map : "+ mapData )
        return data;
    };
    /**
     * 通过位置来获取用户数据
     * @param loaction 哪个
     */
    util.prototype.GetPoolData = function (loaction) {
        var data = null;
        data = Tools_1.Tools.GetArrData("no", loaction, this.userData.pool);
        return data;
    };
    /**
     * 通过位置来获取Map数据
     * @param loaction 哪个
     */
    util.prototype.GetPlaceData = function (loaction) {
        var data = null;
        data = Tools_1.Tools.GetArrData("no", loaction, this.levelMap);
        return data;
    };
    /**
     * 获取怪兽数据
     * @param no 等级
     */
    util.prototype.GetMonsterData = function (level) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.monsterData);
        return Tools_1.Tools.GetArrData("no", level, data);
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
        return Tools_1.Tools.GetArrData("no", level, data).color;
    };
    /**
     * 获取关卡怪兽id
     * @param id id
     */
    util.prototype.GetMonsterIdData = function (id) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.monsterIdData);
        return Tools_1.Tools.GetArrData("id", id, data);
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
        var isExist = Tools_1.Tools.setArrData("id", id, "num", num, this.levelMonsterArr);
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
        var sameLevel = Tools_1.Tools.GetArrData("level", level, this.userData.pool, -1);
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
        var str = Tools_1.Tools.GetArrData("level", this.userData.turretLevel, data);
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
        var arr = Tools_1.Tools.deepClone(data);
        var str = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            for (var j = 0; j < item.weigth; j++) {
                str.push(item.id);
            }
        }
        var random = Tools_1.Tools.GetRandom(0, str.length - 1);
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
        var data = Tools_1.Tools.GetArrData("no", no, this.userData.pool);
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
        var data = Tools_1.Tools.GetArrData("type", type, this.userData.prop);
        return data.num;
    };
    /**
     * 获取道具持续时间
     * @param type 类型
     */
    util.prototype.GetPropTime = function (type) {
        var propData = this.propConfig;
        console.log(propData, 'propData');
        var data = Tools_1.Tools.GetArrData("type", type, propData);
        return Number(data.time);
    };
    /**
     * 使用哪个类型道具
     * @param type 类型道具
     */
    util.prototype.UseProp = function (type) {
        var num = Number(type) - 1;
        // this.userData.prop[num].time = this.GetPropTime(type);
        this.userData.prop[num].time = 60;
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
        // console.log("使用成功", type, this.userData.prop[num], propState.start);
    };
    /**
     * 获取当前最高等级的炮塔数组2个以上的
     */
    util.prototype.GetTurretAuto = function () {
        var pool = Tools_1.Tools.deepClone(this.userData.pool);
        if (pool.length < 2)
            return false;
        var sortFn = function (a, b) {
            var num = b.level - a.level;
            return num;
        };
        pool = pool.sort(sortFn);
        var NewArr = [];
        for (var i = 0; i < pool.length; i++) {
            var arr = Tools_1.Tools.GetArrData("level", pool[i].level, pool, -1);
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
        var time = Tools_1.Tools.GetRandom(30, 60);
        return time;
    };
    /**
     * 获取天降金币的位置 没有符合就null
     */
    util.prototype.GetHeavenPlace = function () {
        //空的位置
        var emptyPlace = Tools_1.Tools.GetArrData("level", -1, this.userData.pool, -1);
        if (!emptyPlace)
            return null;
        //符合的位置
        var conformPlace = Tools_1.Tools.GetArrData("state", 1, emptyPlace, -1);
        if (!conformPlace)
            return null;
        //符合的数组
        var newArr = [];
        for (var i = 0; i < conformPlace.length; i++) {
            var item = conformPlace[i];
            var heavenItem = Tools_1.Tools.GetArrData("no", item.no, this.userData.heavenPool);
            var isHaveEmptyBox = heavenItem.no == this.userData.emptyBoxNo;
            if (item.no == heavenItem.no && heavenItem.id == null && !isHaveEmptyBox) {
                newArr.push(item.no);
            }
        }
        //随机一个
        var randomNum = Tools_1.Tools.GetRandom(0, newArr.length - 1);
        return newArr[randomNum];
    };
    /**
     * 获取炮弹数据
     */
    util.prototype.GetBulletData = function (type) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.bulletData);
        return Tools_1.Tools.GetArrData("type", type, data);
    };
    /**
     * 获取爆炸名字
     */
    util.prototype.GetBoomName = function (type) {
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.bulletData);
        return Tools_1.Tools.GetArrData("type", type, data).boom;
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
                return;
            }
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
        var data = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.gkData);
        var nwdata = [];
        for (var i = 0; i < data.length; i++) {
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
        // console.log("当前用户：" + user);
        // let valiue = this.AB_Test[name][user];
        // console.log("当前用户2222：" + valiue);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsXFx1dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQW9JO0FBQ3BJLDJDQUFzQztBQUV0Qyx1REFBa0Q7QUFDbEQsNkNBQTRDO0FBQzVDLHFEQUFnRDtBQUNoRCwrQ0FBOEM7QUFFOUMsc0VBQWlFO0FBR2pFLGlEQUFnRDtBQUNoRCxpQ0FBZ0M7QUFFaEMseUNBQXlDO0FBQ3pDO0lBQUE7UUFFSSxpQkFBaUI7UUFDakIsWUFBTyxHQUFhO1lBQ2hCLGdCQUFNLENBQUMsVUFBVTtZQUNqQixnQkFBTSxDQUFDLE9BQU87WUFDZCxnQkFBTSxDQUFDLFdBQVc7WUFDbEIsZ0JBQU0sQ0FBQyxPQUFPO1lBQ2QsZ0JBQU0sQ0FBQyxRQUFRO1lBQ2YsZ0JBQU0sQ0FBQyxRQUFRO1lBQ2YsZ0JBQU0sQ0FBQyxZQUFZO1lBQ25CLGdCQUFNLENBQUMsYUFBYTtZQUNwQixnQkFBTSxDQUFDLE1BQU07WUFDYixnQkFBTSxDQUFDLFVBQVU7U0FDcEIsQ0FBQztRQUVGLFVBQVU7UUFDVixlQUFVLEdBQVE7WUFDZCxZQUFZLEVBQUUsY0FBYztZQUM1QixXQUFXLEVBQUUsYUFBYTtZQUMxQixZQUFZLEVBQUUsY0FBYztZQUM1QixVQUFVLEVBQUUsWUFBWTtZQUN4QixRQUFRLEVBQUUsVUFBVTtZQUNwQixjQUFjLEVBQUUsZ0JBQWdCO1lBQ2hDLGVBQWUsRUFBRSxpQkFBaUI7WUFDbEMsVUFBVSxFQUFFLFlBQVk7WUFDeEIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFlBQVksRUFBRSxjQUFjO1NBQy9CLENBQUE7UUFFRCxjQUFTLEdBQVcsYUFBYSxDQUFDLENBQUMsT0FBTztRQUUxQyxjQUFTLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFVO1FBRW5ELGVBQVUsR0FBcUIsSUFBSSxHQUFHLEVBQUUs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QVc7UUFDWCxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsWUFBWSxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNYLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDbkY7YUFBTTtZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFJTCxXQUFDO0FBQUQsQ0Fub0RBLEFBbW9EQyxJQUFBO0FBR0Qsa0JBQWUsSUFBSSxJQUFJLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgZ2FtZVN0YXRlLCBQb29sSW5mbywgcHJvcEluZm8sIHByb3BTdGF0ZSwgcHJvcFR5cGUsIHNvdW5kSW5mbywgdGhpbmdUeXBlLCB0dXJyZXRJbmZvLCB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCB1c2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xuaW1wb3J0IGpzb25TaW5nbGV0b24gZnJvbSBcIi4uL2Jhc2UvanNvblNpbmdsZXRvblwiO1xuaW1wb3J0IHsgVGV4dEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvVGV4dEN0clwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IHsgR2FtZUVmZmVjdCB9IGZyb20gXCIuLi9lZmZlY3QvR2FtZUVmZmVjdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4vVG9vbHNcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xuLy8gaW1wb3J0IGVuY3J5cHQgPSByZXF1aXJlKCdlbmNyeXB0anMnKTtcbmNsYXNzIHV0aWwge1xuXG4gICAgLyoq6ZyA6KaB5Yqg6L2955qEanNvbuWIl+ihqCAqL1xuICAgIGpzb25BcnI6IHN0cmluZ1tdID0gW1xuICAgICAgICBOYW1lVHMudHVycmV0RGF0YSxcbiAgICAgICAgTmFtZVRzLm1hcERhdGEsXG4gICAgICAgIE5hbWVUcy5tb25zdGVyRGF0YSxcbiAgICAgICAgTmFtZVRzLmJ1eURhdGEsXG4gICAgICAgIE5hbWVUcy5wcm9wRGF0YSxcbiAgICAgICAgTmFtZVRzLmNvaW5EYXRhLFxuICAgICAgICBOYW1lVHMudHJlYXN1cmVEYXRhLFxuICAgICAgICBOYW1lVHMubW9uc3RlcklkRGF0YSxcbiAgICAgICAgTmFtZVRzLmdrRGF0YSxcbiAgICAgICAgTmFtZVRzLmJ1bGxldERhdGFcbiAgICBdO1xuXG4gICAgLyoq5pys5Zyw5a2X5YW4ICovXG4gICAgbG9jYWxEaWFyeTogYW55ID0ge1xuICAgICAgICBoYXZlVHJlYXN1cmU6IFwiaGF2ZVRyZWFzdXJlXCIsLy/lrp3ol4/mlbDmja5cbiAgICAgICAgbm92aWNlR3VpZGU6IFwibm92aWNlR3VpZGVcIiwgLy/mlrDmiYvmjIflr7zpobrluo9cbiAgICAgICAgR2V0VHVycmV0TnVtOiBcIkdldFR1cnJldE51bVwiLC8v6I635b6X54Ku5aGUXG4gICAgICAgIEdldERheVRpbWU6IFwiR2V0RGF5VGltZVwiLC8v5LuK5aSp5pel5pyfXG4gICAgICAgIGF1dG9Qcm9wOiBcImF1dG9Qcm9wXCIsLy/oh6rliqjpgZPlhbdcbiAgICAgICAgdW5sb2NraW5nX3RpbWU6IFwidW5sb2NraW5nX3RpbWVcIiwvL+ino+mUgeaXtumXtFxuICAgICAgICBzeW50aGVzaXNfdGltZXM6IFwic3ludGhlc2lzX3RpbWVzXCIsLy/lkIjmiJDmrKHmlbBcbiAgICAgICAgcHJvcENvbmZpZzogXCJwcm9wQ29uZmlnXCIsLy/pgZPlhbfor6bnu4booahcbiAgICAgICAgb2ZmbGluZVRpbWU6IFwib2ZmbGluZVRpbWVcIiwvL+emu+e6v+aXtumXtFxuICAgICAgICBvbmxpbmVUaW1lOiBcIm9ubGluZVRpbWVcIiwgLy/lnKjnur/ml7bpl7RcbiAgICAgICAgcmFuZG9tUmVkVGltZU51bTogXCJyYW5kb21SZWRUaW1lTnVtXCIsLy/pmo/mnLrnuqLljIXml7bpl7RcbiAgICAgICAgZWFyblByb2dyZXNzOiBcImVhcm5Qcm9ncmVzc1wiLC8v5bGV546w5omL5oyH5qyh5pWwXG4gICAgfVxuXG4gICAgc2VjcmV0a2V5OiBzdHJpbmcgPSAnb3Blbl9zZXNhbWUnOyAvLyDliqDlr4blr4bpkqVcblxuICAgIEdsb2JhbE1hcDogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXAoKTsgLy/nlKjmiLflgqjlrZjmn5DkupvkuJzopb9cblxuICAgIE1vbnN0ZXJNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwKCk7IC8v5YKo5a2Y5oCq5YW95Lic6KW/XG5cbiAgICBpcGhvbmVYVG9wOiBudW1iZXIgPSA1MDsvL+WImOa1t+Wxj+mrmOW6plxuXG4gICAgdG91Y2hJZDogbnVtYmVyOyAvL3RvdWNoaWRcblxuICAgIHNhdmluZ1BvdExvY2s6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuino+mUgeS6humHkeW4gemjnuWFpeWtmOmSsee9kFxuXG4gICAgaGVhdmVuVG91Y2g6IGJvb2xlYW47Ly/nlKjkuo7pmLLph43lpI3ngrnlh7tcblxuICAgIE9wZW5pbmdfdGltZXNfbGV2ZWw6IG51bWJlciA9IDA7Ly/lvIDlkK/mrKHmlbBcblxuICAgIGlzQ2hlY2tUYXNrUmVkOiBib29sZWFuID0gdHJ1ZTsgLy/mmK/lkKbmo4DmtYvpppbpobXku7vliqHnuqLngrlcblxuICAgIGFkUHJlT2JqOiBhbnkgPSB7fTsgLy/pooTliqDovb3lub/lkYrnmoRcblxuICAgIC8qKueUqOaIt+aVsOaNriAqL1xuICAgIHVzZXJEYXRhOiBVc2VyRGF0YSA9IHtcbiAgICAgICAgcG9vbDogW10sXG4gICAgICAgIGNvaW46IDAsXG4gICAgICAgIGhvbmdiYW86IDAsXG4gICAgICAgIGN1c3RvbXM6IHsgYmlnOiAxLCBzbWFsbDogMSB9LCAvLyDlhbPljaEg5aSn5YWzIOWwj+WFs1xuICAgICAgICBwcm9kdWN0OiA0MCxcbiAgICAgICAgdHVycmV0TGV2ZWw6IDEsIC8v54Ku5Y+w562J57qnXG4gICAgICAgIHByb3A6IFtcbiAgICAgICAgICAgIC8qKuWGsOWGuyAqL1xuICAgICAgICAgICAgeyB0eXBlOiAxLCBudW06IDAsIHRpbWU6IG51bGwsIHVzZTogcHJvcFN0YXRlLmVuZCB9LFxuICAgICAgICAgICAgLyoq55S15Ye7Ki9cbiAgICAgICAgICAgIHsgdHlwZTogMiwgbnVtOiAwLCB0aW1lOiBudWxsLCB1c2U6IHByb3BTdGF0ZS5lbmQgfSxcbiAgICAgICAgICAgIC8qKuaKpOe9qSovXG4gICAgICAgICAgICB7IHR5cGU6IDMsIG51bTogMCwgdGltZTogbnVsbCwgdXNlOiBwcm9wU3RhdGUuZW5kIH0sXG4gICAgICAgICAgICAvKirmuIXlsY8qL1xuICAgICAgICAgICAgeyB0eXBlOiA0LCBudW06IDAsIHRpbWU6IG51bGwsIHVzZTogcHJvcFN0YXRlLmVuZCB9LFxuICAgICAgICAgICAgLyoq6Ieq5Yqo5ZCI5oiQKi9cbiAgICAgICAgICAgIHsgdHlwZTogNSwgbnVtOiAwLCB0aW1lOiBudWxsLCB1c2U6IHByb3BTdGF0ZS5lbmQgfSxcbiAgICAgICAgICAgIC8qKuWinuiDvSovXG4gICAgICAgICAgICB7IHR5cGU6IDYsIG51bTogMCwgdGltZTogbnVsbCwgdXNlOiBwcm9wU3RhdGUuZW5kIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhjaGFuZ2VSYXRlOiAxMDAwMCxcbiAgICAgICAgbmV3VXNlcjogdHJ1ZSxcbiAgICAgICAgY29tcG91bmRUaW1lczogMCxcbiAgICAgICAgbm92aWNlR3VpZGU6IDEsXG4gICAgICAgIGJ1eUNvdW50OiAwLFxuICAgICAgICBlbXB0eUJveE5vOiAtMSxcbiAgICAgICAgaGVhdmVuUG9vbDogW10sXG4gICAgICAgIGhhdmVUcmVhc3VyZTogW10sXG4gICAgICAgIHRlcm1Db2luOiAwLFxuICAgICAgICBvZmZsaW5lSW5jb21lOiB7XG4gICAgICAgICAgICByZXdhcmQ6IDAsXG4gICAgICAgICAgICBtdWx0aXBsZVJld2FyZDogMFxuICAgICAgICB9LFxuICAgICAgICB2ZXJzaW9uOiAwLFxuICAgICAgICBHZXRUdXJyZXROdW06IDE4LFxuICAgICAgICBHZXREYXlUaW1lOiBudWxsLFxuICAgICAgICBhdXRvUHJvcDogbnVsbCxcbiAgICAgICAgYWlyYm9ybmVDb3VudDogMCxcbiAgICAgICAgdW5sb2NraW5nX3RpbWU6IDAsXG4gICAgICAgIHN5bnRoZXNpc190aW1lczogMCxcbiAgICAgICAgc3ludGhlc2lzX0FsbDogMCxcbiAgICAgICAgcHJvcENvbmZpZzogbnVsbCxcbiAgICAgICAgcmVzaXN0QXR0YWNrVGltZXM6IDAsXG4gICAgICAgIGxvY2FsQ29tcG91bmRUaW1lOiAwLFxuICAgICAgICBkYXlFbnRlclNpZ25OdW06IG51bGwsXG4gICAgICAgIGdvbGRXaGVlbENvdW50OiBudWxsLFxuICAgICAgICBzYXZpbmdQb3ROdW06IDAsXG4gICAgfTtcblxuICAgIC8qKkFC5rWL6K+VICovXG4gICAgQUJfVGVzdDogYW55ID0ge1xuICAgICAgICBsb2NrX3R1cnJldF90ZXN0OiBcIkJcIixcbiAgICAgICAgaGVhdmVuX2NvaW5fdGVzdDogXCJCXCIsXG4gICAgICAgIG5ld19oYW5kX3Rlc3Q6IFwiQlwiLFxuICAgICAgICAvLyB3YWxsZXRfdGVzdDpcIkFcIixcbiAgICB9XG5cbiAgICAvL+ingueci+inhumikeasoeaVsFxuICAgIGFkdmVydGlzaW5nX251bTogbnVtYmVyID0gMDtcbiAgICAvL+eci+inhumikeiOt+WPlumBk+WFt+aAu+asoeaVsFxuICAgIHByb3BzX251bWJlcjogbnVtYmVyID0gMDtcblxuICAgIC8v5ri45oiP5pe26Ze0XG4gICAgZ2FtZVRpbWU6IG51bWJlciA9IDA7XG4gICAgLy/pgZPlhbfkvb/nlKjmrKHmlbBcbiAgICBnYW1lUHJvcE51bTogbnVtYmVyID0gMDtcblxuICAgIC8v54K55Ye75LqG5pqC5YGcXG4gICAgaXNTdG9wOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvL+eUqOaIt+ihjOS4ulxuICAgIGJlaGF2aW9yUmV3YXJkVm9MaXN0OiBhbnkgPSBudWxsO1xuXG4gICAgLy/ov4flhbPlpZblirFcbiAgICBnYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0OiBhbnkgPSBbXTtcblxuICAgIC8v5LiL5LiA5YWz55qE5aWW5YqxXG4gICAgZ2FtZUxldmVsUGFzc1Jld2FyZE5leHRWb0xpc3Q6IGFueSA9IFtdO1xuXG4gICAgLy/lhbPljaHmgKrnianphY3nva5cbiAgICBtYXBDb25maWc6IGFueSA9IG51bGw7XG5cbiAgICAvL+mBk+WFt+mFjee9ruihqFxuICAgIHByb3BEYXRhOiBhbnkgPSBudWxsO1xuXG4gICAgLy/pgZPlhbflhbfkvZPmlbDlgLxcbiAgICBwcm9wQ29uZmlnOiBhbnkgPSBudWxsO1xuXG4gICAgLy/lnKjnur/ml7bpl7Tplb/luqZcbiAgICBvbmxpbmVfdGltZSA9IDYwMDtcblxuICAgIC8qKuWkqemZjemHkeW4geeCueWHu+asoeaVsCovXG4gICAgaGVhdmVuQ2xpY2tOdW06IG51bWJlciA9IDE7XG5cbiAgICAvKirmmK/lkKbliLDml7bpl7Tlj5HpgIHmlbDmja4z56eSICovXG4gICAgaXNTZW5kVHVycmV0RGF0YTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoq5piv5ZCm5Yiw5pe26Ze05Y+R6YCB5pWw5o2uM+enkiAqL1xuICAgIGlzU2VuZENvaW5EYXRhOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKirlj4zlgI3mlLbnm4ogKi9cbiAgICBkb3VibGVFYXJuOiBhbnkgPSB7IHVzZTogcHJvcFN0YXRlLmVuZCwgdGltZTogbnVsbCB9O1xuXG4gICAgLyoq5LiK5LiA5qyh5LiK5Lyg55qE5pWw5o2uICovXG4gICAgbGFzdERhdGE6IGFueSA9IHtcbiAgICAgICAgY29tcG91bmRUaW1lczogbnVsbCwgLy/lkIjmiJDmrKHmlbBcbiAgICAgICAgaGlnaGVzdEJhdHRlcnlMZXZlbDogbnVsbCwgLy/mnIDpq5jngq7loZRcbiAgICAgICAgcG9pbnQ6IG51bGwsIC8v6YeR5biBXG4gICAgICAgIHVzZXJCYXR0ZXJ5TnVtOiBudWxsLCAvL+WkmuWwkeS4queCruWhlFxuICAgICAgICB1c2VyTWFwRGV0YWlsOiBbXSAvL+axoOWhmOaVsOaNrlxuICAgIH07XG5cbiAgICAvL+mfs+aViOmFjee9rlxuICAgIHNvdW5kU2V0OiBzb3VuZEluZm8gPSB7XG4gICAgICAgIGJnbTogMSwgLy/og4zmma/pn7PmlYhcbiAgICAgICAgc291bmQ6IDEgLy/mma7pgJrpn7PmlYhcbiAgICB9O1xuXG4gICAgbWFwU2l6ZTogYW55ID0ge1xuICAgICAgICB3aWR0aDogNzUwLCAvL+WcsOWbvuWuveW6plxuICAgICAgICBncmlkOiBudWxsLCAvL+WcsOWbvuagvOWtkOWkp+Wwj1xuICAgICAgICBzdGFydEdyaWRQb3M6IG51bGwgLy/liJ3lp4vkvY3nva5cbiAgICB9Oy8v5Zyw5Zu+5aSn5bCPXG5cbiAgICAvL+WtmOWCqOW9k+WJjeWFs+WNoeeahOeCruWhlOS9jee9ruWSjOWbnuaUtueahOS9jee9rlxuICAgIGxldmVsTWFwOiBhbnkgPSBbXTtcbiAgICAvL+WtmOWCqOW9k+WJjeWFs+WNoeeahOaAquWFvVxuICAgIGxldmVsTW9uc3RlckFycjogeyBpZDogbnVtYmVyLCBudW06IG51bWJlciB9W10gPSBbXTtcbiAgICAvL+W9k+WJjeaAquWFveaVsOmHj1xuICAgIGxldmVsTW9uc3Rlck51bTogbnVtYmVyO1xuICAgIC8v5b2T5YmN5ri45oiP54q25oCBXG4gICAgbGV2ZWxTdGF0ZTogbnVtYmVyID0gZ2FtZVN0YXRlLmRlZmF1bHQ7XG4gICAgLy/otK3kubDmrKHmlbBcbiAgICBidXlDb3VudDogbnVtYmVyID0gMDtcbiAgICAvL+S7iuWkqeaYr+WQpuetvuWIsFxuICAgIGlzT2tTaWduOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy/mmK/lkKbmnInlnKjnur/lpZblirHnuqLljIVcbiAgICBpc1NpZ25PbkxpbmVSZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL+i3neemu+S4iuasoeiOt+W+l+maj+acuue6ouWMheaXtumXtFxuICAgIHVwVHVycmV0UmFuZG9tUmVkVGltZSA9IDA7XG4gICAgLy/lvZPliY3lnKjnur/ml7bpl7RcbiAgICBvbmxpbmVUaW1lTnVtID0gMDtcbiAgICAvL+maj+acuue6ouWMheaXtumXtFxuICAgIHJhbmRvbVJlZFRpbWVOdW0gPSA2MDtcbiAgICAvL+WkqemZjemHkeW4geeahOinhumikeaVsOmHj1xuICAgIGV4aXN0VmlkZW9Db2luTnVtOiBudW1iZXIgPSAwO1xuXG4gICAgLy/kuLTml7blj5jph49cbiAgICB0ZW1wUGFybTogb2JqZWN0ID0ge307XG4gICAgLyoqXG4gICAgICog5qOA5p+l5rGg5aGY5ZOq5Liq5L2N572u5piv56m655qEXG4gICAgICovXG4gICAgY2hlY2tQb29sKCk6IG51bWJlciB7XG5cbiAgICAgICAgbGV0IGxvYWN0aW9uOiBudW1iZXIgPSBudWxsOy8v5L2N572uXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsTWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMubGV2ZWxNYXBbaV07XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuR2V0UG9vbERhdGEoaXRlbS5ubyk7XG4gICAgICAgICAgICBsZXQgaGVhdmVuSXRlbSA9IFRvb2xzLkdldEFyckRhdGEoXCJub1wiLCBpdGVtLm5vLCB0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2wpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxldmVsID09IC0xICYmIGRhdGEuc3RhdGUgPT0gMSAmJiBoZWF2ZW5JdGVtLmlkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5ubyAhPSB0aGlzLnVzZXJEYXRhLmVtcHR5Qm94Tm8pIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hY3Rpb24gPSBpdGVtLm5vO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvYWN0aW9uO1xuICAgIH1cblxuICAgIHNldEludChfa2V5LCBfdmFsdWUpIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKF9rZXksIF92YWx1ZS50b1N0cmluZygpKVxuICAgIH1cblxuICAgIGdldEludChfa2V5LCBkZWYpIHtcbiAgICAgICAgdmFyIGRzID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKF9rZXkpXG4gICAgICAgIGlmIChkcyA9PSBcIlwiIHx8IGRzID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW50KF9rZXksIGRlZik7XG4gICAgICAgICAgICBkcyA9IGRlZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTnVtYmVyKGRzKVxuICAgIH1cblxuICAgIGdldFN0cmluZyhfa2V5KSB7XG4gICAgICAgIHJldHVybiBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oX2tleSlcbiAgICB9XG5cblxuICAgIHNldFN0cmluZyhfa2V5LCBfdmFsdWUpIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKF9rZXksIF92YWx1ZS50b1N0cmluZygpKVxuICAgIH1cblxuICAgIGluaWRhdGEoKSB7XG4gICAgICAgIC8v6YeR5biBXG4gICAgICAgIHRoaXMudXNlckRhdGEudmVyc2lvbiA9IDU0ODtcbiAgICAgICAgdGhpcy5kb3VibGVFYXJuLnVzZSA9IDA7XG4gICAgICAgIHRoaXMuZG91YmxlRWFybi50aW1lID0gMDtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5jb2luID0gdGhpcy5nZXRJbnQoXCJnb2xkaGJcIiwgMClcbiAgICAgICAgdGhpcy51c2VyRGF0YS5leGNoYW5nZVJhdGUgPSB0aGlzLmdldEludChcImV4Y2hhbmdlUmF0ZVwiLCAxMDAwMClcbiAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9kdWN0ID0gdGhpcy5nZXRJbnQoXCJwcm9kdWN0XCIsIDQwKVxuICAgICAgICB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnID0gdGhpcy5nZXRJbnQoXCJjdXN0b21zYmlnXCIsIDEpXG4gICAgICAgIHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCA9IHRoaXMuZ2V0SW50KFwiY3VzdG9tc3NtYWxsXCIsIDEpXG4gICAgICAgIHRoaXMudXNlckRhdGEubmV3VXNlciA9IHRydWUgLy90aGlzLmdldEludChcIm5ld3VzZXJcIiwxKT09MT90cnVlOmZhbHNlO1xuICAgICAgICB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsID0gdGhpcy5nZXRJbnQoXCJ0dXJyZXRMZXZlbFwiLCAxKVxuXG4gICAgICAgIGxldCBwc2RkID0gdGhpcy5nZXRTdHJpbmcoXCJtYXBwb29sXCIpXG4gICAgICAgIGlmIChwc2RkID09IFwiXCIgfHwgcHNkZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRQb29sKCk7XG4gICAgICAgICAgICBsZXQgZGRzID0gSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyRGF0YS5wb29sKVxuICAgICAgICAgICAgdGhpcy5zZXRTdHJpbmcoXCJtYXBwb29sXCIsIGRkcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEucG9vbCA9IEpTT04ucGFyc2UocHNkZClcbiAgICAgICAgICAgIHRoaXMucmVwYWlyUG9vbCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzYXZlZGF0YSgpIHtcblxuICAgICAgICB0aGlzLnNldEludChcImdvbGRoYlwiLCB0aGlzLnVzZXJEYXRhLmNvaW4pXG4gICAgICAgIHRoaXMuc2V0SW50KFwiZXhjaGFuZ2VSYXRlXCIsIHRoaXMudXNlckRhdGEuZXhjaGFuZ2VSYXRlKVxuICAgICAgICB0aGlzLnNldEludChcInByb2R1Y3RcIiwgdGhpcy51c2VyRGF0YS5wcm9kdWN0KVxuICAgICAgICB0aGlzLnNldEludChcImN1c3RvbXNiaWdcIiwgdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZylcbiAgICAgICAgdGhpcy5zZXRJbnQoXCJjdXN0b21zc21hbGxcIiwgdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsKVxuICAgICAgICB0aGlzLnVzZXJEYXRhLm5ld1VzZXIgPSB0cnVlIC8vdGhpcy5nZXRJbnQoXCJuZXd1c2VyXCIsMSk9PTE/dHJ1ZTpmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRJbnQoXCJ0dXJyZXRMZXZlbFwiLCB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsKVxuXG4gICAgICAgIGxldCBkZHMgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJEYXRhLnBvb2wpXG4gICAgICAgIHRoaXMuc2V0U3RyaW5nKFwibWFwcG9vbFwiLCBkZHMpXG4gICAgfVxuXG5cbiAgICAvL+WIpOaWreaYr+S4jeaYr+etvuWIsOS7iuWkqVxuICAgIGNhblNpbmdlKCkge1xuICAgICAgICB2YXIgY2FuZ2V0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgZGF0cyA9IFtcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIl07XG4gICAgICAgIHZhciBkZCA9IHRoaXMuZ2V0U3RyaW5nKFwic2luZ2RhZGFcIik7XG5cbiAgICAgICAgaWYgKGRkID09IFwiXCIgfHwgZGQgPT0gbnVsbCB8fCBkZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RyaW5nKFwic2luZ2RhZGFcIiwgSlNPTi5zdHJpbmdpZnkoZGF0cykpO1xuICAgICAgICAgICAgLy8sSlNPTi5zdHJpbmdpZnko6KGo5ZCNKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0cyA9IEpTT04ucGFyc2UoZGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3J0ZSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0c1tpXSA9PSBcIjBcIikge1xuICAgICAgICAgICAgICAgIHJlc3J0ZSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzcnRlID09IDApIHtcbiAgICAgICAgICAgIGRhdHMgPSBbXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCJdO1xuICAgICAgICAgICAgdGhpcy5zZXRTdHJpbmcoXCJzaW5nZGFkYVwiLCBKU09OLnN0cmluZ2lmeShkYXRzKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciB0ZHN0ciA9IGQuZ2V0RnVsbFllYXIoKSArIFwiXCIgKyBkLmdldE1vbnRoKCkgKyBcIlwiICsgZC5nZXREYXRlKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzaW5nIDogIFwiICt0ZHN0ciApO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRkc3RyID09IGRhdHNbaV0pIHtcbiAgICAgICAgICAgICAgICBjYW5nZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuICFjYW5nZXQ7XG4gICAgfVxuXG5cbiAgICBzaW5nbGVuKCkge1xuICAgICAgICB2YXIgZGQgPSB0aGlzLmdldFN0cmluZyhcInNpbmdkYWRhXCIpO1xuICAgICAgICB2YXIgZGF0cyA9IEpTT04ucGFyc2UoZGQpO1xuXG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0c1tpXSAhPSBcIjBcIikge1xuICAgICAgICAgICAgICAgIGluZGV4ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBzaW5ndG9kYXkoKSB7XG4gICAgICAgIHZhciBkZCA9IHRoaXMuZ2V0U3RyaW5nKFwic2luZ2RhZGFcIik7XG4gICAgICAgIHZhciBkYXRzID0gSlNPTi5wYXJzZShkZCk7XG4gICAgICAgIHZhciBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHRkc3RyID0gZC5nZXRGdWxsWWVhcigpICsgXCJcIiArIGQuZ2V0TW9udGgoKSArIFwiXCIgKyBkLmdldERhdGUoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRzW2ldID09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgZGF0c1tpXSA9IHRkc3RyO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcblxuICAgICAgICAgICAgICAgIGkgPSA4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RyaW5nKFwic2luZ2RhZGFcIiwgSlNPTi5zdHJpbmdpZnkoZGF0cykpO1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDnlKjkuo7mlrDmiYvvvIzliJ3lp4vljJbnlKjmiLfmlbDmja5cbiAgICAgKi9cbiAgICBpbml0UG9vbCgpIHtcblxuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTc7IGkrKykge1xuXG4gICAgICAgICAgICAvL+WIneWni+WMluaxoOWhmFxuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wb29sLnB1c2goe1xuICAgICAgICAgICAgICAgIG5vOiBpLCAvL+esrOWHoOS4quS9jee9rlxuICAgICAgICAgICAgICAgIGxldmVsOiBpID09IDEgPyAxIDogLTEsLy8tMeS4uuepulxuICAgICAgICAgICAgICAgIHN0YXRlOiAxIC8v6buY6K6k5YmNOOS4quino+mUgVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKuS/ruWkjeaXp+aVsOaNriovXG4gICAgcmVwYWlyUG9vbCgpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5wb29sW2ldLnN0YXRlID09IDApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMudXNlckRhdGEucG9vbFtpXS5zdGF0ZSA9IDE7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbph5HluIHkvY3nva5cbiAgICAgKi9cbiAgICBpbml0SGVhdmVuUG9vbCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxNzsgaSsrKSB7XG4gICAgICAgICAgICAvL+WIneWni+WMlumHkeW4geaxoOWhmFxuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sLnB1c2goe1xuICAgICAgICAgICAgICAgIG5vOiBpLCAvL+S9jee9rlxuICAgICAgICAgICAgICAgIGlkOiBudWxsLCAvL+mHkeW4gWlkXG4gICAgICAgICAgICAgICAgdmFsdWU6IG51bGwsIC8v5aSa5bCR5YC8XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlueCruWPsOeahOaVsOaNrlxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqdcbiAgICAgKi9cbiAgICBHZXRUdXJyZXREYXRhKGxldmVsOiBudW1iZXIpOiB0dXJyZXRJbmZvIHtcblxuICAgICAgICBsZXQgZGF0YTogdHVycmV0SW5mbyA9IG51bGw7XG5cbiAgICAgICAgbGV0IHR1cnJldERhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy50dXJyZXREYXRhKTtcblxuICAgICAgICBkYXRhID0gVG9vbHMuZGVlcENsb25lKFRvb2xzLkdldEFyckRhdGEoXCJsZXZlbFwiLCBsZXZlbCwgdHVycmV0RGF0YSkpO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS/neWtmOS4gOS4i+axoOWhmOaVsOaNrlxuICAgICAqIEBwYXJhbSBpZCDkvY3nva5cbiAgICAgKiBAcGFyYW0gbGV2ZWwg562J57qnIG51bGzlsLHmmK/liKDpmaRcbiAgICAgKi9cbiAgICBzYXZlUG9vbChpZDogbnVtYmVyLCBsZXZlbDogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICAvLyBsZXQgaXNFeGlzdDpudW1iZXIgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLnBvb2xbaV07XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5wb29sW2ldLm5vID09IGlkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmxldmVsID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6KGM5Li65aWW5YqxXG4gICAgICogQHBhcmFtIHR5cGUgMS3nrKzkuIDmrKHop6PplIHmlrDngq7loZTvvIwyLea2iOeBreaAquWFve+8jDMt6Kej6ZSB54Ku5aGUIDQt5a6M5oiQ5YWz5Y2hIDUu5ZCI5oiQXG4gICAgICovXG4gICAgR2V0QmVoYXZpb3JSZXdhcmRWbyh0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIi0tLS0tLS0xMjMtLS0tLS0tYmVoYXZpb3JSZXdhcmRWb0xpc3QgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuYmVoYXZpb3JSZXdhcmRWb0xpc3QpIClcbiAgICAgICAgcmV0dXJuIFRvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsIHR5cGUsIHRoaXMuYmVoYXZpb3JSZXdhcmRWb0xpc3QpLnJld2FyZDtcblxuICAgIH1cblxuXG4gICAgZ2V0bm93bWFwZGF0YSgpIHtcblxuICAgICAgICB0aGlzLm1hcENvbmZpZyA9IHRoaXMuZ2V0TWFwZGF0YSh0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5L+d5a2Y5LiA5LiL6YeR5biB5rGg5aGY5pWw5o2uXG4gICAgICogQHBhcmFtIG5vIOS9jee9rlxuICAgICAqIEBwYXJhbSBpZCDph5HluIFpZCBudWxs5bCx5piv5Yig6ZmkXG4gICAgICogQHBhcmFtIHZhbHVlIOWkmuWwkeWAvCBudWxs5bCx5piv5Yig6ZmkXG4gICAgICovXG4gICAgc2F2ZUhlYXZlblBvb2wobm86IG51bWJlciwgaWQ6IG51bWJlciA9IG51bGwsIHZhbHVlOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIC8vIGxldCBpc0V4aXN0Om51bWJlciA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbFtpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2xbaV0ubm8gPT0gbm8pIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgfHwgaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IGlkO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlumHkeW4geaxoOWhmOeahOacieWkmuWwkeS4qlxuICAgICAqL1xuICAgIGdldEhlYXZlblBvb2woKSB7XG5cbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2xbaV07XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sW2ldLmlkKSB7XG4gICAgICAgICAgICAgICAgbnVtKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOafpeWkqemZjemHkeW4gei/meS4quS9jee9ruaYr+WQpuS4uuacieS4nOilv1xuICAgICAqIEBwYXJhbSBubyDkvY3nva5cbiAgICAgKi9cbiAgICBjaGVja0hlYXZlblBvb2wobm86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXNFeGlzdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2xbaV07XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sW2ldLm5vID09IG5vKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNFeGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzRXhpc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICog6L+U5Zue5piv5ZCm5piv5paw562J57qnXG4gICAgICogQHBhcmFtIGxldmVsIOetiee6p1xuICAgICAqL1xuXG4gICAgdXBMZXZlbChsZXZlbDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChsZXZlbCA+IHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWwpIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeWFs+WNoeaAquWFvemFjee9rlxuICAgICAqL1xuICAgIEdldEN1c3RvbXNNb25zdGVySW5mbygpIHtcblxuICAgICAgICB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnID0gdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZyA+IDQ1ID8gNDUgOiB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnO1xuICAgICAgICBsZXQgbWFwRGF0YSA9IHRoaXMuZ2V0TWFwZGF0YSh0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdldEN1c3RvbXNNb25zdGVySW5mbyA6IFwiKyBKU09OLnN0cmluZ2lmeShtYXBEYXRhKSlcbiAgICAgICAgLy8gbGV0IG1hcERhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5tYXBEYXRhKTtcblxuICAgICAgICAvL+i/lOWbnuaVsOaNrlxuICAgICAgICBsZXQgZGF0YSA9IG1hcERhdGFbdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsIC0gMV07XG5cbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDtpPG1hcERhdGEubGVuZ3RoO2krKyl7XG5cbiAgICAgICAgLy8gICAgIGlmKG1hcERhdGFbaV0uaWQ9PXRoaXMudXNlckRhdGEuY3VzdG9tcy5iaWcpe1xuXG4gICAgICAgIC8vICAgICAgICAgZm9yKGxldCBqID0gMDtqPG1hcERhdGFbaV0uY3VzdG9tcy5sZW5ndGg7aisrKXtcblxuICAgICAgICAvLyAgICAgICAgICAgICBpZihtYXBEYXRhW2ldLmN1c3RvbXNbal0ubGV2ZWw9PXRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBkYXRhID0gbWFwRGF0YVtpXS5jdXN0b21zW2pdLm1vbnN0ZXI7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vICAgICAgICAgfVxuXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgbGV0IEFyciA9IFtdO1xuICAgICAgICBkYXRhID0gZGF0YS5sZXZlbENvbmZpZy5zcGxpdChcIitcIik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGxldCBpdGVtID0gZGF0YVtpXS5zcGxpdChcIi1cIik7XG5cbiAgICAgICAgICAgIGxldCBpZCA9IGl0ZW1bMF07XG4gICAgICAgICAgICBsZXQgbnVtID0gaXRlbVsxXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICAgICAgICAgIEFyci5wdXNoKGlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFycjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeWFs+WNoeWcsOWbvumFjee9rlxuICAgICAqL1xuICAgIEdldEN1c3RvbXNNYXAoKSB7XG4gICAgICAgIGxldCBtYXBEYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMubWFwRGF0YSk7XG4gICAgICAgIC8v6L+U5Zue5pWw5o2uXG4gICAgICAgIGxldCBkYXRhID0gVG9vbHMuR2V0QXJyRGF0YShcImlkXCIsIDEsIG1hcERhdGEpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS1HZXRDdXN0b21zTWFwLS0tLS0tLS0tLTptYXAgOiBcIisgbWFwRGF0YSApXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmui/h+S9jee9ruadpeiOt+WPlueUqOaIt+aVsOaNrlxuICAgICAqIEBwYXJhbSBsb2FjdGlvbiDlk6rkuKpcbiAgICAgKi9cblxuICAgIEdldFBvb2xEYXRhKGxvYWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBudWxsO1xuICAgICAgICBkYXRhID0gVG9vbHMuR2V0QXJyRGF0YShcIm5vXCIsIGxvYWN0aW9uLCB0aGlzLnVzZXJEYXRhLnBvb2wpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCa6L+H5L2N572u5p2l6I635Y+WTWFw5pWw5o2uXG4gICAgICogQHBhcmFtIGxvYWN0aW9uIOWTquS4qlxuICAgICAqL1xuICAgIEdldFBsYWNlRGF0YShsb2FjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRhID0gbnVsbDtcblxuICAgICAgICBkYXRhID0gVG9vbHMuR2V0QXJyRGF0YShcIm5vXCIsIGxvYWN0aW9uLCB0aGlzLmxldmVsTWFwKTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmgKrlhb3mlbDmja5cbiAgICAgKiBAcGFyYW0gbm8g562J57qnXG4gICAgICovXG5cbiAgICBHZXRNb25zdGVyRGF0YShsZXZlbDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMubW9uc3RlckRhdGEpO1xuXG4gICAgICAgIHJldHVybiBUb29scy5HZXRBcnJEYXRhKFwibm9cIiwgbGV2ZWwsIGRhdGEpO1xuXG4gICAgfVxuXG4gICAgLyoq5qOA5p+l5pyA6auY57qn5Yir55qE54Ku5aGU5pe25piv5ZCm6LaF6L+H5Lik5LiqICovXG4gICAgY2hla1Bvb2xIYXZlVHdvKCkge1xuXG4gICAgICAgIGxldCBsZXZlbDogbnVtYmVyID0gdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbDtcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLnBvb2xbaV07XG4gICAgICAgICAgICBpZiAoaXRlbS5sZXZlbCA9PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIG51bSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW0gPj0gMjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluaAquWFveminOiJslxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqdcbiAgICAgKi9cblxuICAgIEdldE1vbnN0ZXJDb2xvcihsZXZlbDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMubW9uc3RlckRhdGEpO1xuICAgICAgICByZXR1cm4gVG9vbHMuR2V0QXJyRGF0YShcIm5vXCIsIGxldmVsLCBkYXRhKS5jb2xvcjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWFs+WNoeaAquWFvWlkXG4gICAgICogQHBhcmFtIGlkIGlkXG4gICAgICovXG5cbiAgICBHZXRNb25zdGVySWREYXRhKGlkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5tb25zdGVySWREYXRhKTtcbiAgICAgICAgcmV0dXJuIFRvb2xzLkdldEFyckRhdGEoXCJpZFwiLCBpZCwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5Zyw5Zu+55qE5L2N572uXG4gICAgICogQHBhcmFtIHgg5qiq5ZCRXG4gICAgICogQHBhcmFtIHkg56uW5ZCRXG4gICAgICovXG4gICAgR2V0TWFwUG9zKHg6IG51bWJlciwgeTogbnVtYmVyKTogY2MuVmVjMiB7XG5cbiAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IGNjLnYyKCk7XG5cbiAgICAgICAgcG9zLnggPSB0aGlzLm1hcFNpemUuc3RhcnRHcmlkUG9zLnggKyB4ICogdGhpcy5tYXBTaXplLmdyaWQ7XG4gICAgICAgIHBvcy55ID0gdGhpcy5tYXBTaXplLnN0YXJ0R3JpZFBvcy55IC0geSAqIHRoaXMubWFwU2l6ZS5ncmlkO1xuICAgICAgICByZXR1cm4gcG9zO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5b2T5YmN5YWz5Y2hIOi3neemu+e7iOeCueacgOi/keeahOaAquWFvVxuICAgICAqIEBwYXJhbSBpZCDmgKrlhb1pZFxuICAgICAqIEBwYXJhbSBudW0g5Ymp5L2Z5aSa5bCR5q2lXG4gICAgICovXG4gICAgc2V0TGV2ZWxNb25zdGVyRGF0YShpZDogbnVtYmVyLCBudW06IG51bWJlcikge1xuXG4gICAgICAgIGxldCBpc0V4aXN0OiBib29sZWFuID0gVG9vbHMuc2V0QXJyRGF0YShcImlkXCIsIGlkLCBcIm51bVwiLCBudW0sIHRoaXMubGV2ZWxNb25zdGVyQXJyKTtcbiAgICAgICAgaWYgKCFpc0V4aXN0KSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsTW9uc3RlckFyci5wdXNoKHsgaWQsIG51bSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzb3J0Rm4gPSAoYSwgYikgPT4ge1xuXG4gICAgICAgICAgICBsZXQgYmVmb3JlOiBudW1iZXIgPSBhLm51bSAtIGIubnVtO1xuXG4gICAgICAgICAgICBpZiAoYS5udW0gPT0gYi5udW0pIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBhLmlkIC0gYi5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJlZm9yZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGV2ZWxNb25zdGVyQXJyLnNvcnQoc29ydEZuKTtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKDpmaTlvZPliY3lhbPljaEg55qE5oCq54mpXG4gICAgICogQHBhcmFtIGlkIOesrOWHoOS4qlxuICAgICAqL1xuICAgIGRlbGVjdExldmVsTW9uc3RlcihpZDogbnVtYmVyKSB7XG5cbiAgICAgICAgbGV0IGlzU3VjY2VzczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZXZlbE1vbnN0ZXJBcnIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxNb25zdGVyQXJyW2ldLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbE1vbnN0ZXJBcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGlzU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5pyA6L+R57uI54K555qE5oCq5YW9XG4gICAgICovXG4gICAgZ2V0Rmlyc3RNb25zdGVyKCkge1xuICAgICAgICAvL+m7mOiupOesrOS4gOS4qlxuICAgICAgICByZXR1cm4gdGhpcy5sZXZlbE1vbnN0ZXJBcnJbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5pyA6Z2g6L+R6Ieq5bex55qE5oCq5YW9XG4gICAgICogQHBhcmFtIHBvcyDoh6rlt7HkvY3nva5cbiAgICAgKiBAcGFyYW0gZGlzdGFuY2VOdW0g5LyY5YWI5bCE56iL6Led56a7XG4gICAgICovXG4gICAgZ2V0Q2xvc2VNb25zdGVyKHBvczogY2MuVmVjMiwgZGlzdGFuY2VOdW06IG51bWJlciA9IDI1MCkge1xuICAgICAgICAvL+acgOmdoOi/keiHquW3seeahFxuICAgICAgICBsZXQgY2xvc2VNb25zZXRyID0geyBpZDogbnVsbCwgZGlzdGFuY2U6IG51bGwsIG51bTogbnVsbCwgaXNDbG9zZTogZmFsc2UgfTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGV2ZWxNb25zdGVyQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZyArIFwiLVwiICsgdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsICsgXCJfTW9uc3Rlcl9cIiArIHRoaXMubGV2ZWxNb25zdGVyQXJyW2ldLmlkO1xuICAgICAgICAgICAgbGV0IHRhcmdldDogY2MuTm9kZSA9IHRoaXMuTW9uc3Rlck1hcC5nZXQobmFtZSk7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkgY29udGludWU7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0UG9zOiBjYy5WZWMyID0gdGFyZ2V0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBsZXQgZGlzdGFuY2U6IG51bWJlciA9IHRhcmdldFBvcy5zdWIocG9zKS5tYWcoKTtcbiAgICAgICAgICAgIGlmICgoY2xvc2VNb25zZXRyLmlkID09IG51bGwgfHwgZGlzdGFuY2UgPCBjbG9zZU1vbnNldHIuZGlzdGFuY2UpICYmIGRpc3RhbmNlIDw9IGRpc3RhbmNlTnVtKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VNb25zZXRyLmlkID0gdGhpcy5sZXZlbE1vbnN0ZXJBcnJbaV0uaWQ7XG4gICAgICAgICAgICAgICAgY2xvc2VNb25zZXRyLmRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgY2xvc2VNb25zZXRyLm51bSA9IHRoaXMubGV2ZWxNb25zdGVyQXJyW2ldLm51bTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xvc2VNb25zZXRyLmlkICE9PSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgY2xvc2VNb25zZXRyLmRpc3RhbmNlO1xuICAgICAgICAgICAgY2xvc2VNb25zZXRyLmlzQ2xvc2UgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGNsb3NlTW9uc2V0cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdHI6IGFueSA9IHRoaXMuZ2V0Rmlyc3RNb25zdGVyKCk7XG4gICAgICAgICAgICBpZiAoIXN0cikgcmV0dXJuO1xuICAgICAgICAgICAgc3RyLmlzQ2xvc2UgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xvc2VNb25zZXRyLCdjbG9zZU1vbnNldHInKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmqjOivgeaYr+WQpui/mOWcqOmdoOi/keaAquWFvVxuICAgICAqIEBwYXJhbSBkYXRhIHtwb3M66Ieq5bex55qE5L2N572uLGlkOn1cbiAgICAgKi9cbiAgICBjaGVja01vbnN0ZXJDbG9zZShkYXRhOiB7IHBvczogY2MuVmVjMiwgaWQ6IG51bWJlciwgZGlzdGFuY2VOdW06IG51bWJlciB9KSB7XG5cbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IHRoaXMudXNlckRhdGEuY3VzdG9tcy5iaWcgKyBcIi1cIiArIHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCArIFwiX01vbnN0ZXJfXCIgKyBkYXRhLmlkO1xuICAgICAgICBsZXQgdGFyZ2V0OiBjYy5Ob2RlID0gdGhpcy5Nb25zdGVyTWFwLmdldChuYW1lKTtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgbGV0IHRhcmdldFBvczogY2MuVmVjMiA9IHRhcmdldC5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgZGlzdGFuY2U6IG51bWJlciA9IHRhcmdldFBvcy5zdWIoZGF0YS5wb3MpLm1hZygpO1xuICAgICAgICByZXR1cm4gZGlzdGFuY2UgPCBkYXRhLmRpc3RhbmNlTnVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluebuOWQjOeahOetiee6p+eahOeCruWPsFxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqdcbiAgICAgKi9cbiAgICBnZXRQb29sU2FtZUxldmVsVHVycmV0KGxldmVsOiBudW1iZXIpIHtcblxuICAgICAgICBsZXQgc2FtZUxldmVsID0gVG9vbHMuR2V0QXJyRGF0YShcImxldmVsXCIsIGxldmVsLCB0aGlzLnVzZXJEYXRhLnBvb2wsIC0xKTtcbiAgICAgICAgcmV0dXJuIHNhbWVMZXZlbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS/neWtmOmAmuWFs+S/oeaBr++8jOW5tuS4lCsxXG4gICAgICovXG5cbiAgICBzYXZlQ3VzdG9tTGV2ZWwoKTogYm9vbGVhbiB7XG5cblxuICAgICAgICAvLyBsZXQgbWFwRGF0YSA9IHRoaXMubWFwQ29uZmlnO1xuXG4gICAgICAgIC8vIGlmKHRoaXMubWFwQ29uZmlnLmxlbmd0aDx0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwrMSl7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIui2hei/h+S6hlwiKVxuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgbGV0IElzVXA6IGJvb2xlYW4gPSBmYWxzZTsgLy/mmK/lkKbljYfnuqdcblxuICAgICAgICBpZiAodGhpcy5tYXBDb25maWcubGVuZ3RoIDwgdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsICsgMSkge1xuICAgICAgICAgICAgdGhpcy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgICAgICB1cmw6IFVybENvbnN0LmdhbWVMZXZlbENvbXBsZXRlZCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGxldmVsOiB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCByZXMucmV3YXJkTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5nYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0LnB1c2gocmVzLnJld2FyZExpc3RbaV0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5a6M5oiQ5YWz5Y2h5LiK5oqlIVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZyArPSAxO1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsID0gMTtcbiAgICAgICAgICAgIHRoaXMuc2V0SW50KFwiY3VzdG9tc2JpZ1wiLCB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnKVxuICAgICAgICAgICAgdGhpcy5zZXRJbnQoXCJjdXN0b21zc21hbGxcIiwgdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLotoXov4fkuoblsI/lhbPljaHnmoTnmoTplb/luqYs5bCP5YWz5Y2h5Y+Y5Li6Me+8jOWkp+WFs+WNoSsxXCIpO1xuICAgICAgICAgICAgSXNVcCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuc2V0SW50KFwiY3VzdG9tc3NtYWxsXCIsIHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBJc1VwO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5Lqn6IO9XG4gICAgICogQHBhcmFtIG51bSDliqDlpJrlsJHkuKoo6buY6K6kMSlcbiAgICAgKiBAcGFyYW0gdHlwZSDmma7pgJrnmoQw77yI5Y+q6IO95aKe5YqgMjDlpoLmnpzotoXov4fliJnkuI3lop7liqDvvIlcbiAgICAgKi9cbiAgICBwcm9kdWN0VHVycmV0KG51bTogbnVtYmVyID0gMSwgdHlwZTogbnVtYmVyID0gMCkge1xuXG4gICAgICAgIHRoaXMudXNlckRhdGEucHJvZHVjdCArPSBudW07XG4gICAgICAgIGlmICh0eXBlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkUHJvZHVjdCgwKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qOA5p+l5piv5ZCm6IO95Y2H57qnIFxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqdcbiAgICAqL1xuICAgIGNoZWNrVXBkYXRlTGV2ZWwobGV2ZWw6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLnR1cnJldERhdGEpO1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCBsZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aKe5Yqg5aSa5bCR5Liq5Lqn6IO95oiW6ICF5YeP5bCRXG4gICAgICogQHBhcmFtIG51bSDmlbDph49cbiAgICAgKi9cbiAgICBhZGRQcm9kdWN0KG51bTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudXNlckRhdGEucHJvZHVjdCArPSBudW07XG4gICAgICAgIC8vIGlmKHRoaXMudXNlckRhdGEucHJvZHVjdCsxPmdhbWVOdW1lcmljYWwuUHJvZHVjdE1heCl7XG4gICAgICAgIC8vICAgICB0aGlzLnVzZXJEYXRhLnByb2R1Y3QgPSBnYW1lTnVtZXJpY2FsLlByb2R1Y3RNYXg7XG4gICAgICAgIC8vIH1lbHNlIFxuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5wcm9kdWN0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9kdWN0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVmlld19Vc2VyRGF0YVVwZGF0YSwgdXBkYXRlVHlwZS5wcm9kdWN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5aKe5Yqg5aSa5bCR5Liq6YeR5biB5oiW6ICF5YeP5bCRXG4gICAgICogQHBhcmFtIG51bSDmlbDph49cbiAgICAgKi9cbiAgICBhZGRDb2luKG51bSkge1xuICAgICAgICB0aGlzLnVzZXJEYXRhLmNvaW4gKz0gcGFyc2VJbnQobnVtKTtcbiAgICAgICAgaWYgKHRoaXMudXNlckRhdGEuY29pbiA8IDApIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuY29pbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zYXZlZGF0YSgpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfV2FsbGV0X0FkZENvaW4sIG51bSk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhLCB1cGRhdGVUeXBlLmNvaW4pO1xuICAgIH1cblxuICAgIC8qKuacn+mXtOWKoOWkmuWwkemHkeW4gVxuICAgICAqIEBwYXJhbSBudW0g5pWw5YC8XG4gICAgKi9cbiAgICBhZGRUZXJtQ29pbihudW06IG51bWJlcikge1xuICAgICAgICB0aGlzLnVzZXJEYXRhLnRlcm1Db2luICs9IG51bTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlui0reS5sOeahOetiee6p+W5tui/lOWbnuetiee6p1xuICAgICAqL1xuICAgIGdldEJ1eVJhbmRvbUxldmVsKCk6IG51bWJlciB7XG5cbiAgICAgICAgbGV0IGRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5idXlEYXRhKTtcblxuICAgICAgICAvL+WNleeLrOeahOetiee6p1xuICAgICAgICBsZXQgbGV2ZWw6IG51bWJlciA9IG51bGw7XG5cbiAgICAgICAgbGV0IHNtYWxsRGF0YSA9IHsgbnVtOiAwLCBsZXZlbDogMCB9O1xuXG4gICAgICAgIGxldCBzdHIgPSBUb29scy5HZXRBcnJEYXRhKFwibGV2ZWxcIiwgdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbCwgZGF0YSk7XG4gICAgICAgIGxldCByYW5kb21MZXZlbDogbnVtYmVyID0gbnVsbDtcbiAgICAgICAgaWYgKCFzdHIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5om+5LiN5YiwflwiICsgdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbCArIFwi57qn55qE54Ku5aGU6LSt5Lmw5L+h5oGvXCIpXG4gICAgICAgICAgICBzdHIgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gSlNPTi5wYXJzZShzdHIuYXJyKTtcbiAgICAgICAgICAgIHJhbmRvbUxldmVsID0gdGhpcy5HZXRXZWlndGhMZXZlbChhcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnVzZXJEYXRhLnBvb2wubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy51c2VyRGF0YS5wb29sW2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWwgPT0gLTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKHNtYWxsRGF0YS5sZXZlbCA9PSAwIHx8IHNtYWxsRGF0YS5sZXZlbCA+IGl0ZW0ubGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBzbWFsbERhdGEubGV2ZWwgPSBpdGVtLmxldmVsO1xuICAgICAgICAgICAgICAgIHNtYWxsRGF0YS5udW0gPSAxO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzbWFsbERhdGEubGV2ZWwgPT0gaXRlbS5sZXZlbCkge1xuICAgICAgICAgICAgICAgIHNtYWxsRGF0YS5udW0gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc21hbGxEYXRhLm51bSA9PSAxICYmIHJhbmRvbUxldmVsID49IHNtYWxsRGF0YS5sZXZlbCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBzbWFsbERhdGEubGV2ZWw7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacieWNleeLrOeahOeCruWhlFwiLCBsZXZlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygpXG4gICAgICAgICAgICAvLyBsZXZlbCA9IE51bWJlcihzdHIubWluKTtcbiAgICAgICAgICAgIC8vIGxldCBtYXhMZXZlbDpudW1iZXIgPSBOdW1iZXIoc3RyLm1heCk7XG4gICAgICAgICAgICAvLyBpZihsZXZlbCt0aGlzLmJ1eUNvdW50Pm1heExldmVsKXtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJ1eUNvdW50ID0gMDtcbiAgICAgICAgICAgIC8vIH1lbHNle1xuICAgICAgICAgICAgLy8gICAgIGxldmVsICs9IHRoaXMuYnV5Q291bnQ7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyB0aGlzLmJ1eUNvdW50Kys7XG4gICAgICAgICAgICBsZXZlbCA9IHJhbmRvbUxldmVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZXZlbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICog6YCa6L+H5p2D6YeN6I635Y+W562J57qnXG4gICAgKi9cbiAgICBHZXRXZWlndGhMZXZlbChkYXRhOiBhbnlbXSkge1xuXG4gICAgICAgIGxldCBhcnIgPSBUb29scy5kZWVwQ2xvbmUoZGF0YSk7XG5cbiAgICAgICAgbGV0IHN0ciA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGxldCBpdGVtID0gYXJyW2ldO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGl0ZW0ud2VpZ3RoOyBqKyspIHtcblxuICAgICAgICAgICAgICAgIHN0ci5wdXNoKGl0ZW0uaWQpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmFuZG9tOiBudW1iZXIgPSBUb29scy5HZXRSYW5kb20oMCwgc3RyLmxlbmd0aCAtIDEpO1xuICAgICAgICBsZXQgaWQ6IG51bWJlciA9IHN0cltyYW5kb21dO1xuICAgICAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgaWQgPSBhcnJbMF0uaWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gTnVtYmVyKGlkKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOa1i+WcqOWTqumHjFxuICAgICAqIEBwYXJhbSBwb3Mg54K5IOWfuuS6juS4reW/g+eCuWNjLnYyXG4gICAgICogQHBhcmFtIGNhbGwg5Zue6LCDIFxuICAgICAqL1xuICAgIGNoZWNrVG91Y2hQb29sKHBvczogY2MuVmVjMiwgY2FsbDogRnVuY3Rpb24pIHtcblxuICAgICAgICBsZXQgZGF0YTogbnVtYmVyID0gbnVsbDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGV2ZWxNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5sZXZlbE1hcFtpXTtcbiAgICAgICAgICAgIC8v5qC85a2Q55qE5L2N572uXG5cbiAgICAgICAgICAgIGxldCBzdHIgPSB7XG4gICAgICAgICAgICAgICAgeDogbnVsbCxcbiAgICAgICAgICAgICAgICB5OiBudWxsLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PSB0aGluZ1R5cGUudHVycmV0KSB7XG4gICAgICAgICAgICAgICAgc3RyLnggPSB0aGlzLm1hcFNpemUuc3RhcnRHcmlkUG9zLnggKyBpdGVtLnggKiB0aGlzLm1hcFNpemUuZ3JpZDtcbiAgICAgICAgICAgICAgICBzdHIueSA9IHRoaXMubWFwU2l6ZS5zdGFydEdyaWRQb3MueSAtIGl0ZW0ueSAqIHRoaXMubWFwU2l6ZS5ncmlkO1xuICAgICAgICAgICAgICAgIHN0ci53aWR0aCA9IHRoaXMubWFwU2l6ZS5ncmlkO1xuICAgICAgICAgICAgICAgIHN0ci5oZWlnaHQgPSB0aGlzLm1hcFNpemUuZ3JpZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09IHRoaW5nVHlwZS5yZWN5Y2xlKSB7XG4gICAgICAgICAgICAgICAgc3RyLnggPSBpdGVtLnBvcy54O1xuICAgICAgICAgICAgICAgIHN0ci55ID0gaXRlbS5wb3MueTtcbiAgICAgICAgICAgICAgICBzdHIud2lkdGggPSBpdGVtLndpZHRoO1xuICAgICAgICAgICAgICAgIHN0ci5oZWlnaHQgPSBpdGVtLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGxldCBpdGVtWDpudW1iZXIgPSB1dGlsLm1hcFNpemUuc3RhcnRHcmlkUG9zLngraXRlbS54KnV0aWwubWFwU2l6ZS5ncmlkO1xuICAgICAgICAgICAgLy8gbGV0IGl0ZW1ZOm51bWJlciA9IHV0aWwubWFwU2l6ZS5zdGFydEdyaWRQb3MueS1pdGVtLnkqdXRpbC5tYXBTaXplLmdyaWQ7XG5cbiAgICAgICAgICAgIGlmIChzdHIueSArIHN0ci5oZWlnaHQgLyAyID49IHBvcy55ICYmIHBvcy55ID49IHN0ci55IC0gc3RyLmhlaWdodCAvIDIgJiZcbiAgICAgICAgICAgICAgICBzdHIueCArIHN0ci53aWR0aCAvIDIgPj0gcG9zLnggJiYgcG9zLnggPj0gc3RyLnggLSBzdHIud2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PSB0aGluZ1R5cGUucmVjeWNsZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlY3ljbGVGbigpO1xuICAgICAgICAgICAgICAgICAgICAvL+m7mOiupOWeg+WcvuS4ujEwMFxuICAgICAgICAgICAgICAgICAgICBjYWxsKDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0YSA9IGl0ZW0ubm87XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja0hlYXZlblBvb2woZGF0YSkpIHtcbiAgICAgICAgICAgIGRhdGEgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEgPT0gdGhpcy51c2VyRGF0YS5lbXB0eUJveE5vKSB7XG4gICAgICAgICAgICBkYXRhID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGwoZGF0YSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3mmK/lkKblnKjlrZjlnKhcbiAgICAgKiBAcGFyYW0gbm8g56ys5Yeg5LiqXG4gICAgICovXG4gICAgY2hlY2tOb0V4aXN0KG5vOiBudW1iZXIpOiBib29sZWFuIHtcblxuICAgICAgICBsZXQgZGF0YSA9IFRvb2xzLkdldEFyckRhdGEoXCJub1wiLCBubywgdGhpcy51c2VyRGF0YS5wb29sKTtcbiAgICAgICAgaWYgKGRhdGEubGV2ZWwgPT0gLTEgJiYgZGF0YS5zdGF0ZSA9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W55So5oi36YGT5YW35pWw6YePXG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LXG4gICAgICovXG4gICAgR2V0UHJvcE51bSh0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGE6IHByb3BJbmZvID0gVG9vbHMuR2V0QXJyRGF0YShcInR5cGVcIiwgdHlwZSwgdGhpcy51c2VyRGF0YS5wcm9wKTtcbiAgICAgICAgcmV0dXJuIGRhdGEubnVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlumBk+WFt+aMgee7reaXtumXtFxuICAgICAqIEBwYXJhbSB0eXBlIOexu+Wei1xuICAgICAqL1xuICAgIEdldFByb3BUaW1lKHR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgcHJvcERhdGEgPSB0aGlzLnByb3BDb25maWc7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb3BEYXRhLCAncHJvcERhdGEnKVxuICAgICAgICBsZXQgZGF0YSA9IFRvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsIHR5cGUsIHByb3BEYXRhKTtcbiAgICAgICAgcmV0dXJuIE51bWJlcihkYXRhLnRpbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS9v+eUqOWTquS4quexu+Wei+mBk+WFt1xuICAgICAqIEBwYXJhbSB0eXBlIOexu+Wei+mBk+WFt1xuICAgICAqL1xuICAgIFVzZVByb3AodHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBudW06IG51bWJlciA9IE51bWJlcih0eXBlKSAtIDE7XG4gICAgICAgIC8vIHRoaXMudXNlckRhdGEucHJvcFtudW1dLnRpbWUgPSB0aGlzLkdldFByb3BUaW1lKHR5cGUpO1xuICAgICAgICB0aGlzLnVzZXJEYXRhLnByb3BbbnVtXS50aW1lID0gNjA7XG4gICAgICAgIHRoaXMudXNlckRhdGEucHJvcFtudW1dLnVzZSA9IHByb3BTdGF0ZS5zdGFydDtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9wW251bV0ubnVtIC09IDE7XG4gICAgICAgIGlmICh0eXBlID09IHByb3BUeXBlLmNscykgeyAgICAgICAgICAgICAgICAgICAgICAgICAvL+a4heWxjyAgICAgICAgICAgIFxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9DbHMpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gcHJvcFR5cGUuYXV0bykgeyAgICAgICAgICAgICAgICAgIC8v6Ieq5Yqo5ZCI5oiQXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLlRvb2xfRWZmZWN0X05hbWUuR2FtZV9Qcm9wX0F0dW8pO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBwcm9wVHlwZS5zaG9jaykgeyAgICAgICAgICAgICAgICAgIC8v55S15Ye7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLlRvb2xfRWZmZWN0X05hbWUuR2FtZV9Qcm9wX1Nob2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLnNoaWVsZCkgeyAgICAgICAgICAgICAgICAgLy/miqTnm75cbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuVG9vbF9FZmZlY3RfTmFtZS5HYW1lX1Byb3BfU2hpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLmZyb3plbikgeyAgICAgICAgICAgICAgICAgLy/lhrDlhrtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuVG9vbF9FZmZlY3RfTmFtZS5HYW1lX1Byb3BfRnJvemVuKTtcbiAgICAgICAgfVxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVG9vbF9Vc2UsIHR5cGUpO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUHJvcEl0ZW1fVXBkYXRlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLkvb/nlKjmiJDlip9cIiwgdHlwZSwgdGhpcy51c2VyRGF0YS5wcm9wW251bV0sIHByb3BTdGF0ZS5zdGFydCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN5pyA6auY562J57qn55qE54Ku5aGU5pWw57uEMuS4quS7peS4iueahFxuICAgICAqL1xuICAgIEdldFR1cnJldEF1dG8oKSB7XG4gICAgICAgIGxldCBwb29sOiBQb29sSW5mb1tdID0gVG9vbHMuZGVlcENsb25lKHRoaXMudXNlckRhdGEucG9vbCk7XG4gICAgICAgIGlmIChwb29sLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgbGV0IHNvcnRGbiA9IChhLCBiKSA9PiB7XG4gICAgICAgICAgICBsZXQgbnVtID0gYi5sZXZlbCAtIGEubGV2ZWw7XG4gICAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgICB9XG4gICAgICAgIHBvb2wgPSBwb29sLnNvcnQoc29ydEZuKTtcbiAgICAgICAgbGV0IE5ld0FyciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvb2wubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBhcnIgPSBUb29scy5HZXRBcnJEYXRhKFwibGV2ZWxcIiwgcG9vbFtpXS5sZXZlbCwgcG9vbCwgLTEpO1xuICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPiAxICYmIHRoaXMuY2hlY2tVcGRhdGVMZXZlbChhcnJbMF0ubGV2ZWwgKyAxKSkge1xuICAgICAgICAgICAgICAgIE5ld0FyciA9IGFycjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoTmV3QXJyLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgLyoq5qOA5p+l5pyA6auYICovXG4gICAgICAgIGlmICghdGhpcy5jaGVja1VwZGF0ZUxldmVsKE5ld0FyclswXS5sZXZlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwb29sID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIE5ld0Fyci5zbGljZSgwLCAyKTtcbiAgICB9XG5cbiAgICAvKirojrflj5bnlKjmiLflvZPliY3mj5DnjrDph5Hpop0gKi9cbiAgICBmaW5kR29sZENhc2goKSB7XG4gICAgICAgIGxldCBjYXNoID0gdGhpcy51c2VyRGF0YS5jb2luIC8gdGhpcy51c2VyRGF0YS5leGNoYW5nZVJhdGUgfHwgMFxuICAgICAgICByZXR1cm4gVGV4dEN0ci50cmlnZ2VyTnVtYmVyKGNhc2gpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+R6YCB5b+r54WnXG4gICAgICovXG4gICAgc2VuZFR1cnJldERhdGEoY2FsbD86IEZ1bmN0aW9uKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTZW5kVHVycmV0RGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuacquWIsOWPkemAgeW/q+eFp+aXtumXtDtcIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU2VuZFR1cnJldERhdGEgPSB0cnVlO1xuICAgICAgICBsZXQgZGF0YTogYW55ID0ge307XG5cbiAgICAgICAgaWYgKHRoaXMudXNlckRhdGEuYnV5Q291bnQgPiAwIHx8IHRoaXMudXNlckRhdGEuY29tcG91bmRUaW1lcykge1xuICAgICAgICAgICAgZGF0YS51c2VyTWFwRGV0YWlsID0gdGhpcy51c2VyRGF0YS5wb29sO1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5idXlDb3VudCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYXN0RGF0YS5jb21wb3VuZFRpbWVzICE9PSB0aGlzLnVzZXJEYXRhLmNvbXBvdW5kVGltZXMgJiYgdGhpcy51c2VyRGF0YS5jb21wb3VuZFRpbWVzID4gMCkge1xuICAgICAgICAgICAgZGF0YS5jb21wb3VuZFRpbWVzID0gdGhpcy51c2VyRGF0YS5jb21wb3VuZFRpbWVzO1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5jb21wb3VuZFRpbWVzID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sYXN0RGF0YS5oaWdoZXN0QmF0dGVyeUxldmVsICE9PSB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsKSB7XG4gICAgICAgICAgICBkYXRhLmhpZ2hlc3RCYXR0ZXJ5TGV2ZWwgPSB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsO1xuICAgICAgICAgICAgdGhpcy5sYXN0RGF0YS5oaWdoZXN0QmF0dGVyeUxldmVsID0gdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS50ZXJtQ29pbiA+IDApIHtcbiAgICAgICAgICAgIGRhdGEucG9pbnQgPSB0aGlzLnVzZXJEYXRhLnRlcm1Db2luO1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS50ZXJtQ29pbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGFzdERhdGEudXNlckJhdHRlcnlOdW0gIT09IHRoaXMudXNlckRhdGEucHJvZHVjdCAmJiB0aGlzLnVzZXJEYXRhLnByb2R1Y3QgPiAwKSB7XG4gICAgICAgICAgICBkYXRhLnVzZXJCYXR0ZXJ5TnVtID0gdGhpcy51c2VyRGF0YS5wcm9kdWN0O1xuICAgICAgICAgICAgdGhpcy5sYXN0RGF0YS51c2VyQmF0dGVyeU51bSA9IHRoaXMudXNlckRhdGEucHJvZHVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLnJlc2lzdEF0dGFja1RpbWVzID4gMCkge1xuICAgICAgICAgICAgZGF0YS5yZXNpc3RBdHRhY2tUaW1lcyA9IHRoaXMudXNlckRhdGEucmVzaXN0QXR0YWNrVGltZXM7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLnJlc2lzdEF0dGFja1RpbWVzID0gMDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgWE1TREsudHJhY2tVc2VyUHJvcGVydGllcyh7XG4gICAgICAgICAgICBjb2luX2JhbGFuY2U6IHRoaXMudXNlckRhdGEuY29pbiArIFwi6YeR5biBXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlckRhdGEudmVyc2lvbiArPSAxO1xuICAgICAgICBkYXRhLnZlcnNpb24gPSB0aGlzLnVzZXJEYXRhLnZlcnNpb247XG4gICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShkYXRhKSA9PSBcInt9XCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1NlbmRUdXJyZXREYXRhID0gZmFsc2U7XG4gICAgICAgIH0sIDMwMDApO1xuXG4gICAgICAgIHRoaXMuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LmdhbWVMZXZlbFJlcG9ydCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NoZWNrVGFza1JlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrkvKDmiJDlip9cIilcbiAgICAgICAgICAgICAgICBjYWxsICYmIGNhbGwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrkvKDlpLHotKVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeR5biB5b+r54WnXG4gICAgICovXG5cbiAgICBzZW5kQ29pbkRhdGEoY2FsbD86IEZ1bmN0aW9uKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTZW5kQ29pbkRhdGEpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc1NlbmRDb2luRGF0YSA9IHRydWU7XG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMudXNlckRhdGEudGVybUNvaW4gPiAwKSB7XG4gICAgICAgICAgICBkYXRhLnBvaW50ID0gdGhpcy51c2VyRGF0YS50ZXJtQ29pbjtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEudGVybUNvaW4gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXNlckRhdGEudmVyc2lvbiArPSAxO1xuICAgICAgICBkYXRhLnZlcnNpb24gPSB0aGlzLnVzZXJEYXRhLnZlcnNpb247XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1NlbmRDb2luRGF0YSA9IGZhbHNlO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgdGhpcy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ2FtZUxldmVsUmVwb3J0LFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOmHkeW4geaIkOWKn1wiKVxuICAgICAgICAgICAgICAgIGNhbGwgJiYgY2FsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOmHkeW4geWksei0pVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeetiee6p+eCruWhlOeahOWkqemZjemHkeW4geaXtumXtFxuICAgICAqL1xuICAgIEdldEhlYXZlblRpbWUoKTogbnVtYmVyIHtcblxuICAgICAgICAvLyBsZXQgY29pbkRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5jb2luRGF0YSk7XG4gICAgICAgIC8vIC8v5b2T5YmN5pyA6auY562J57qn55qE54Ku5aGUXG4gICAgICAgIC8vIGxldCBsZXZlbDogbnVtYmVyID0gdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbDtcbiAgICAgICAgLy8gLy/pu5jorqQ2MHNcbiAgICAgICAgLy8gbGV0IHRpbWU6IG51bWJlciA9IDYwO1xuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGNvaW5EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICBsZXQgaXRlbSA9IGNvaW5EYXRhW2ldO1xuICAgICAgICAvLyAgICAgaWYgKGl0ZW0ubWluIDw9IGxldmVsICYmIGl0ZW0ubWF4ID49IGxldmVsKSB7XG4gICAgICAgIC8vICAgICAgICAgdGltZSA9IGl0ZW0udGltZTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGxldCB0aW1lOiBudW1iZXIgPSBUb29scy5HZXRSYW5kb20oMzAsIDYwKTtcblxuICAgICAgICByZXR1cm4gdGltZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blpKnpmY3ph5HluIHnmoTkvY3nva4g5rKh5pyJ56ym5ZCI5bCxbnVsbFxuICAgICAqL1xuICAgIEdldEhlYXZlblBsYWNlKCk6IG51bWJlciB7XG4gICAgICAgIC8v56m655qE5L2N572uXG4gICAgICAgIGxldCBlbXB0eVBsYWNlID0gVG9vbHMuR2V0QXJyRGF0YShcImxldmVsXCIsIC0xLCB0aGlzLnVzZXJEYXRhLnBvb2wsIC0xKTtcbiAgICAgICAgaWYgKCFlbXB0eVBsYWNlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgLy/nrKblkIjnmoTkvY3nva5cbiAgICAgICAgbGV0IGNvbmZvcm1QbGFjZSA9IFRvb2xzLkdldEFyckRhdGEoXCJzdGF0ZVwiLCAxLCBlbXB0eVBsYWNlLCAtMSk7XG4gICAgICAgIGlmICghY29uZm9ybVBsYWNlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAvL+espuWQiOeahOaVsOe7hFxuICAgICAgICBsZXQgbmV3QXJyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZm9ybVBsYWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNvbmZvcm1QbGFjZVtpXTtcbiAgICAgICAgICAgIGxldCBoZWF2ZW5JdGVtID0gVG9vbHMuR2V0QXJyRGF0YShcIm5vXCIsIGl0ZW0ubm8sIHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbCk7XG4gICAgICAgICAgICBsZXQgaXNIYXZlRW1wdHlCb3ggPSBoZWF2ZW5JdGVtLm5vID09IHRoaXMudXNlckRhdGEuZW1wdHlCb3hObztcblxuICAgICAgICAgICAgaWYgKGl0ZW0ubm8gPT0gaGVhdmVuSXRlbS5ubyAmJiBoZWF2ZW5JdGVtLmlkID09IG51bGwgJiYgIWlzSGF2ZUVtcHR5Qm94KSB7XG4gICAgICAgICAgICAgICAgbmV3QXJyLnB1c2goaXRlbS5ubyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/pmo/mnLrkuIDkuKpcbiAgICAgICAgbGV0IHJhbmRvbU51bSA9IFRvb2xzLkdldFJhbmRvbSgwLCBuZXdBcnIubGVuZ3RoIC0gMSk7XG4gICAgICAgIHJldHVybiBuZXdBcnJbcmFuZG9tTnVtXTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlueCruW8ueaVsOaNrlxuICAgICAqL1xuICAgIEdldEJ1bGxldERhdGEodHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMuYnVsbGV0RGF0YSk7XG4gICAgICAgIHJldHVybiBUb29scy5HZXRBcnJEYXRhKFwidHlwZVwiLCB0eXBlLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bniIbngrjlkI3lrZdcbiAgICAgKi9cbiAgICBHZXRCb29tTmFtZSh0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5idWxsZXREYXRhKTtcbiAgICAgICAgcmV0dXJuIFRvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsIHR5cGUsIGRhdGEpLmJvb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qOA5p+l5piv5ZCm6aKG6L+H5a6d566xIFxuICAgICAqIOWmguaenOespuWQiOWwsei+k+WHuuWuneeusWlkIOS4jeespuWQiOWwsW51bGxcbiAgICAqL1xuICAgIGNoZWNrVHJlYXN1cmVTaG93KCk6IG51bWJlciB7XG4gICAgICAgIFhNU0RLLnBvc3Qoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC50cmVhc3VyZUJveF9Jc2dldCxcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDAgJiYgcmVzLmRhdGEgJiYgcmVzLmRhdGEuc2hvd0JveCAhPSAxKSB7ICAgICAgIC8v6aKG5Y+W6L+HXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy50cmVhc3VyZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHJlYXN1cmVJZDogbnVtYmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGRhdGFbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5taW4gPD0gdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbCAmJiBpdGVtLm1heCA+IHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVhc3VyZUlkID0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHJlYXN1cmVJZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpZCA9PSB0cmVhc3VyZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzRXhpc3Q6IGJvb2xlYW4gPSB0aGlzLnVzZXJEYXRhLmhhdmVUcmVhc3VyZS5zb21lKGNoZWNrSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFeGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJlYXN1cmVJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L+d5a2Y5a6d6JeP54q25oCBXG4gICAgICogQHBhcmFtIGlkIGlkXG4gICAgICovXG4gICAgc2F2ZVRyZWFzdXJlRGF0YShpZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjaGVja0lkID0gKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtID09IGlkO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpc0V4aXN0OiBib29sZWFuID0gdGhpcy51c2VyRGF0YS5oYXZlVHJlYXN1cmUuc29tZShjaGVja0lkKTtcblxuICAgICAgICBpZiAoaXNFeGlzdCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuWuneiXj+WtmOWcqOi/h+S6hlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuaGF2ZVRyZWFzdXJlLnB1c2goaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdG9yYWdlKFwiaGF2ZVRyZWFzdXJlXCIsIHRoaXMudXNlckRhdGEuaGF2ZVRyZWFzdXJlKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlrZjmnKzlnLDmlbDmja5cbiAgICAgKiBAcGFyYW0ga2V5IOmUruWQjVxuICAgICAqIEBwYXJhbSB2YWx1ZSDlgLxcbiAgICAgKi9cbiAgICBzZXRTdG9yYWdlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGxldCBkYXRhU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAvL2xldCBlbmNyeXB0ZWQgPSBlbmNyeXB0LmVuY3J5cHQoZGF0YVN0cmluZyx0aGlzLnNlY3JldGtleSwyNTYpO1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBkYXRhU3RyaW5nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmnKzlnLDlgLxcbiAgICAgKiBAcGFyYW0ga2V5IOmUruWQjVxuICAgICAqL1xuICAgIGdldFN0b3JhZ2Uoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGNpcGhlclRleHQgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgaWYgKGNpcGhlclRleHQgPT0gbnVsbCB8fCBjaXBoZXJUZXh0ID09IFwiXCIgfHwgY2lwaGVyVGV4dCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vbGV0IHZhbHVlID0gSlNPTi5wYXJzZShlbmNyeXB0LmRlY3J5cHQoY2lwaGVyVGV4dCx0aGlzLnNlY3JldGtleSwyNTYpKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY2lwaGVyVGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6Kej6ZSB5paw5Zyw5pa5XG4gICAgICovXG4gICAgdW5sb2NrUGxhY2UoKSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnVzZXJEYXRhLnBvb2wubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy51c2VyRGF0YS5wb29sW2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlckRhdGEucG9vbFtpXS5zdGF0ZSA9IDE7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop6PplIHmlrDkvY3nva5cIiwgaXRlbS5ubyk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1VubG9ja19QbGFjZSwgaXRlbS5ubyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHVybCDlnLDlnYBcbiAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja5cbiAgICAgKiBAcGFyYW0gY2FsbCDlm57osINcbiAgICAgKi9cbiAgICBwb3N0KG9iajogeyB1cmw6IHN0cmluZywgZGF0YT86IGFueSwgc3VjY2Vzcz86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24gfSkge1xuXG4gICAgICAgIFhNU0RLLnBvc3Qoe1xuICAgICAgICAgICAgdXJsOiBvYmoudXJsLFxuICAgICAgICAgICAgZGF0YTogb2JqLmRhdGEsXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor7fmsYLmiJDlip9cIiArIG9iai51cmwsIHJlcylcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnN1Y2Nlc3MgJiYgb2JqLnN1Y2Nlc3MocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmZhaWwgJiYgb2JqLmZhaWwoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG4gICAgICAgICAgICAgICAgb2JqLmZhaWwgJiYgb2JqLmZhaWwoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgZ2V0ZGF0YVN0cihvYmo6IHsgdXJsOiBzdHJpbmcsIGRhdGE/OiBhbnksIHN1Y2Nlc3M/OiBGdW5jdGlvbiwgZmFpbD86IEZ1bmN0aW9uIH0pIHtcblxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogb2JqLnVybCxcbiAgICAgICAgICAgIGRhdGE6IG9iai5kYXRhLFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+35rGC5oiQ5YqfXCIgKyBvYmoudXJsLCByZXMpXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5zdWNjZXNzICYmIG9iai5zdWNjZXNzKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5mYWlsICYmIG9iai5mYWlsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG9iai5mYWlsICYmIG9iai5mYWlsKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOWIpOaWreaYr+WQpuW9k+WkqVxuICAgICAqL1xuXG4gICAgY2hla2NUb2RheSgpIHtcbiAgICAgICAgbGV0IGRheSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xuICAgICAgICBsZXQgaXNEYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKGRheSA9PSB0aGlzLnVzZXJEYXRhLkdldERheVRpbWUpIHtcbiAgICAgICAgICAgIGlzRGF5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzRGF5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNldFN0b3JhZ2UodGhpcy5sb2NhbERpYXJ5LkdldERheVRpbWUsIGRheSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXNEYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aKE5Yqg6L295bm/5ZGKXG4gICAgICogQHBhcmFtIHBvcyDkvY3nva5cbiAgICAgKiBAcGFyYW0gaXNWaWV3IOaYr+WQpuS4uuS/oeaBr+a1gVxuICAgICAqL1xuXG4gICAgcHJlbG9hZEFkKHBvcywgaXNWaWV3OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkUHJlT2JqW3Bvc10pIHtcbiAgICAgICAgICAgIHRoaXMuYWRQcmVPYmpbcG9zXSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoaXNWaWV3KSB7XG4gICAgICAgICAgICAgICAgQWRDb250cm9sbGVyLnByZVZpZXdBZChwb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBBZENvbnRyb2xsZXIucHJlVmlkZW9BZChwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDovb1cIiArIChpc1ZpZXcgPyBcIuS/oeaBr+a1gVwiIDogXCLop4bpopFcIikgKyBwb3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWRQcmVPYmpbcG9zXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yig6ZmkXCIgKyAoaXNWaWV3ID8gXCLkv6Hmga/mtYFcIiA6IFwi6KeG6aKRXCIpICsgcG9zICsgXCLorrDlvZVcIik7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pi+56S656m65Zyw5a6d566xXG4gICAgICovXG4gICAgc2hvd0VtcHR5Qm94KCkge1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5lbXB0eUJveE5vIDwgMCkge1xuICAgICAgICAgICAgbGV0IGxvY2F0aW9uOiBudW1iZXIgPSB0aGlzLmNoZWNrUG9vbCgpO1xuICAgICAgICAgICAgaWYgKCFsb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmsqHmnInkvY3nva5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmVtcHR5Qm94Tm8gPSBsb2NhdGlvbjtcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuU2hvd19FbXB0eV9Cb3gpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W56ys5LiA5Liq5Lu75YqhXG4gICAgICovXG4gICAgZ2V0RmlzdFRhc2soY2FsbDogRnVuY3Rpb24pIHtcbiAgICAgICAgLy/ku7vliqHlrozmiJDpobrluo9cbiAgICAgICAgbGV0IHRhc2tPcmRlcjE6IG51bWJlcltdID0gWzIsIDcsIDQsIDgsIDZdO1xuICAgICAgICBsZXQgdGFza09yZGVyMjogbnVtYmVyW10gPSBbMSwgMiwgMywgNF07XG4gICAgICAgIC8v5Lu75Yqh57G75Z6LIDA65pel5bi4IDE65oiQ5bCxXG4gICAgICAgIGxldCB0YXNrVHlwZTogbnVtYmVyID0gbnVsbDtcbiAgICAgICAgLy/nrKblkIjnmoTku7vliqFcbiAgICAgICAgbGV0IHN0ciA9IFtdO1xuXG4gICAgICAgIGxldCBjaGVja1Rhc2sgPSAoYXJyKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0YXNrVHlwZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2FsbChudWxsLCB0YXNrVHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb3JkZXIgPSB0YXNrVHlwZSA9PSAwID8gdGFza09yZGVyMSA6IHRhc2tPcmRlcjI7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JkZXIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3RyLmxlbmd0aDsgaisrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyW2ldID09IHN0cltqXS50YXNrVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbChzdHJbal0sIHRhc2tUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LnRhc2tfZGF5X21haW4sXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5saXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmxpc3Q7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0udGFza1R5cGUgPT0gMiAmJiB0aGlzLnVzZXJEYXRhLmxvY2FsQ29tcG91bmRUaW1lID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmxvY2FsQ29tcG91bmRUaW1lID0gbGlzdFtpXS51c2VyVGFza1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0uYnV0dG9uVHlwZSAhPT0gNCAmJiBsaXN0W2ldLnRhc2tUeXBlICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza1R5cGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGxpc3RbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGFza1R5cGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuYWNoaWV2ZW1lbnRfbWFpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmxpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS5idXR0b25UeXBlICE9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tUeXBlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGxpc3RbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVGFzayhzdHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1Rhc2soc3RyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWPkemAgeeci+inhumikeiOt+WPlueCruWhlOiusOW9lVxuICAgICAqL1xuICAgIHNlbmRUdXJyZXROdW0oKSB7XG4gICAgICAgIHRoaXMucG9zdCh7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LndhdGNoVmlkZW9BZGRCYXR0ZXJ5LFxuICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K6w5b2V55yL6KeG6aKR6I635b6X54Ku5aGU5Lu75YqhXCIpXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLorrDlvZXnnIvop4bpopHojrflvpfngq7loZTku7vliqHlpLHotKVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZXRUZW1wUGFybShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy50ZW1wUGFybVtuYW1lXSA9IHZhbHVlXG4gICAgfVxuXG4gICAgZ2V0VGVtcFBhcm0obmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBQYXJtW25hbWVdXG4gICAgfVxuXG4gICAgZ2V0TWFwZGF0YShiaWdtYXApIHtcbiAgICAgICAgbGV0IGRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5na0RhdGEpO1xuICAgICAgICBsZXQgbndkYXRhID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtpXVtcImxldmVsTm9cIl0gPT0gYmlnbWFwICsgXCJcIikge1xuICAgICAgICAgICAgICAgIG53ZGF0YS5wdXNoKGRhdGFbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG53ZGF0YVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYr+WQpuS4umLnlKjmiLdcbiAgICAgKi9cbiAgICBjaGVja1Rlc3RCKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdXNlcjogc3RyaW5nID0gQXNzaXN0Q3RyLmlzQVRlc3QoKSA/IFwiQVwiIDogXCJCXCI7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlvZPliY3nlKjmiLfvvJpcIiArIHVzZXIpO1xuICAgICAgICAvLyBsZXQgdmFsaXVlID0gdGhpcy5BQl9UZXN0W25hbWVdW3VzZXJdO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW9k+WJjeeUqOaItzIyMjLvvJpcIiArIHZhbGl1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuQUJfVGVzdFtuYW1lXVt1c2VyXSA9PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKirnprvnur/lop7liqDngq7loZTmrKHmlbAqL1xuICAgIG9mZmxpbmVUdXJyZXRQcm9kdWN0KCkge1xuICAgICAgICAvL+W9k+WJjeaXtumXtFxuICAgICAgICBsZXQgbm93VGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIC8v5LiK5LiA5qyh5pe26Ze0XG4gICAgICAgIGxldCBsYXN0VGltZTogbnVtYmVyID0gdGhpcy5nZXRTdG9yYWdlKHRoaXMubG9jYWxEaWFyeS5vZmZsaW5lVGltZSkgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIC8v5q+PMzDnp5LkuIDkuKog5o2i566XXG4gICAgICAgIGxldCB0aW1lOiBudW1iZXIgPSBNYXRoLmZsb29yKChub3dUaW1lIC0gbGFzdFRpbWUpIC8gMTAwMCAvIDMwKTtcbiAgICAgICAgY29uc29sZS5sb2coJ+emu+e6v+WinuWKoCcgKyB0aW1lICsgXCLkuKrngq7loZQs56a757q/5pe26Ze05Li677yaXCIgKyAobm93VGltZSAtIGxhc3RUaW1lKSAvIDEwMDApO1xuICAgICAgICBpZiAodGltZSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudXNlckRhdGEucHJvZHVjdCArIHRpbWUgPiAyMCkge1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9kdWN0ID0gdGhpcy51c2VyRGF0YS5wcm9kdWN0ID4gMjAgPyB0aGlzLnVzZXJEYXRhLnByb2R1Y3QgOiAyMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFR1cnJldCh0aW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0b3JhZ2UodGhpcy5sb2NhbERpYXJ5Lm9mZmxpbmVUaW1lLCBudWxsKTtcbiAgICB9XG5cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgbmV3IHV0aWwoKTsiXX0=