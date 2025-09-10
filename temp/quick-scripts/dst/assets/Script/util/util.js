
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1dGlsXFx1dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQW9JO0FBQ3BJLDJDQUFzQztBQUV0Qyx1REFBa0Q7QUFDbEQsNkNBQTRDO0FBQzVDLHFEQUFnRDtBQUNoRCwrQ0FBOEM7QUFFOUMsc0VBQWlFO0FBR2pFLGlEQUFnRDtBQUNoRCxpQ0FBZ0M7QUFFaEMseUNBQXlDO0FBQ3pDO0lBQUE7UUFFSSxpQkFBaUI7UUFDakIsWUFBTyxHQUFhO1lBQ2hCLGdCQUFNLENBQUMsVUFBVTtZQUNqQixnQkFBTSxDQUFDLE9BQU87WUFDZCxnQkFBTSxDQUFDLFdBQVc7WUFDbEIsZ0JBQU0sQ0FBQyxPQUFPO1lBQ2QsZ0JBQU0sQ0FBQyxRQUFRO1lBQ2YsZ0JBQU0sQ0FBQyxRQUFRO1lBQ2YsZ0JBQU0sQ0FBQyxZQUFZO1lBQ25CLGdCQUFNLENBQUMsYUFBYTtZQUNwQixnQkFBTSxDQUFDLE1BQU07WUFDYixnQkFBTSxDQUFDLFVBQVU7U0FDcEIsQ0FBQztRQUVGLFVBQVU7UUFDVixlQUFVLEdBQVE7WUFDZCxZQUFZLEVBQUUsY0FBYztZQUM1QixXQUFXLEVBQUUsYUFBYTtZQUMxQixZQUFZLEVBQUUsY0FBYztZQUM1QixVQUFVLEVBQUUsWUFBWTtZQUN4QixRQUFRLEVBQUUsVUFBVTtZQUNwQixjQUFjLEVBQUUsZ0JBQWdCO1lBQ2hDLGVBQWUsRUFBRSxpQkFBaUI7WUFDbEMsVUFBVSxFQUFFLFlBQVk7WUFDeEIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFlBQVksRUFBRSxjQUFjO1NBQy9CLENBQUE7UUFFRCxjQUFTLEdBQVcsYUFBYSxDQUFDLENBQUMsT0FBTztRQUUxQyxjQUFTLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFVO1FBRW5ELGVBQVUsR0FBcUIsSUFBSSxHQUFHLEVBQUUs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QVc7UUFDWCxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsWUFBWSxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNYLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDbkY7YUFBTTtZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFJTCxXQUFDO0FBQUQsQ0Fwb0RBLEFBb29EQyxJQUFBO0FBR0Qsa0JBQWUsSUFBSSxJQUFJLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgZ2FtZVN0YXRlLCBQb29sSW5mbywgcHJvcEluZm8sIHByb3BTdGF0ZSwgcHJvcFR5cGUsIHNvdW5kSW5mbywgdGhpbmdUeXBlLCB0dXJyZXRJbmZvLCB1cGRhdGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCB1c2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xuaW1wb3J0IGpzb25TaW5nbGV0b24gZnJvbSBcIi4uL2Jhc2UvanNvblNpbmdsZXRvblwiO1xuaW1wb3J0IHsgVGV4dEN0ciB9IGZyb20gXCIuLi9Bc3Npc3QvVGV4dEN0clwiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcbmltcG9ydCB7IFVybENvbnN0IH0gZnJvbSBcIi4uL3NlcnZlci9VcmxDb25zdFwiO1xuaW1wb3J0IHsgR2FtZUVmZmVjdCB9IGZyb20gXCIuLi9lZmZlY3QvR2FtZUVmZmVjdFwiO1xuaW1wb3J0IEFkQ29udHJvbGxlciBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHsgQXNzaXN0Q3RyIH0gZnJvbSBcIi4uL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4vVG9vbHNcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vZGF0YS91c2VyRGF0YVwiO1xuLy8gaW1wb3J0IGVuY3J5cHQgPSByZXF1aXJlKCdlbmNyeXB0anMnKTtcbmNsYXNzIHV0aWwge1xuXG4gICAgLyoq6ZyA6KaB5Yqg6L2955qEanNvbuWIl+ihqCAqL1xuICAgIGpzb25BcnI6IHN0cmluZ1tdID0gW1xuICAgICAgICBOYW1lVHMudHVycmV0RGF0YSxcbiAgICAgICAgTmFtZVRzLm1hcERhdGEsXG4gICAgICAgIE5hbWVUcy5tb25zdGVyRGF0YSxcbiAgICAgICAgTmFtZVRzLmJ1eURhdGEsXG4gICAgICAgIE5hbWVUcy5wcm9wRGF0YSxcbiAgICAgICAgTmFtZVRzLmNvaW5EYXRhLFxuICAgICAgICBOYW1lVHMudHJlYXN1cmVEYXRhLFxuICAgICAgICBOYW1lVHMubW9uc3RlcklkRGF0YSxcbiAgICAgICAgTmFtZVRzLmdrRGF0YSxcbiAgICAgICAgTmFtZVRzLmJ1bGxldERhdGFcbiAgICBdO1xuXG4gICAgLyoq5pys5Zyw5a2X5YW4ICovXG4gICAgbG9jYWxEaWFyeTogYW55ID0ge1xuICAgICAgICBoYXZlVHJlYXN1cmU6IFwiaGF2ZVRyZWFzdXJlXCIsLy/lrp3ol4/mlbDmja5cbiAgICAgICAgbm92aWNlR3VpZGU6IFwibm92aWNlR3VpZGVcIiwgLy/mlrDmiYvmjIflr7zpobrluo9cbiAgICAgICAgR2V0VHVycmV0TnVtOiBcIkdldFR1cnJldE51bVwiLC8v6I635b6X54Ku5aGUXG4gICAgICAgIEdldERheVRpbWU6IFwiR2V0RGF5VGltZVwiLC8v5LuK5aSp5pel5pyfXG4gICAgICAgIGF1dG9Qcm9wOiBcImF1dG9Qcm9wXCIsLy/oh6rliqjpgZPlhbdcbiAgICAgICAgdW5sb2NraW5nX3RpbWU6IFwidW5sb2NraW5nX3RpbWVcIiwvL+ino+mUgeaXtumXtFxuICAgICAgICBzeW50aGVzaXNfdGltZXM6IFwic3ludGhlc2lzX3RpbWVzXCIsLy/lkIjmiJDmrKHmlbBcbiAgICAgICAgcHJvcENvbmZpZzogXCJwcm9wQ29uZmlnXCIsLy/pgZPlhbfor6bnu4booahcbiAgICAgICAgb2ZmbGluZVRpbWU6IFwib2ZmbGluZVRpbWVcIiwvL+emu+e6v+aXtumXtFxuICAgICAgICBvbmxpbmVUaW1lOiBcIm9ubGluZVRpbWVcIiwgLy/lnKjnur/ml7bpl7RcbiAgICAgICAgcmFuZG9tUmVkVGltZU51bTogXCJyYW5kb21SZWRUaW1lTnVtXCIsLy/pmo/mnLrnuqLljIXml7bpl7RcbiAgICAgICAgZWFyblByb2dyZXNzOiBcImVhcm5Qcm9ncmVzc1wiLC8v5bGV546w5omL5oyH5qyh5pWwXG4gICAgfVxuXG4gICAgc2VjcmV0a2V5OiBzdHJpbmcgPSAnb3Blbl9zZXNhbWUnOyAvLyDliqDlr4blr4bpkqVcblxuICAgIEdsb2JhbE1hcDogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXAoKTsgLy/nlKjmiLflgqjlrZjmn5DkupvkuJzopb9cblxuICAgIE1vbnN0ZXJNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwKCk7IC8v5YKo5a2Y5oCq5YW95Lic6KW/XG5cbiAgICBpcGhvbmVYVG9wOiBudW1iZXIgPSA1MDsvL+WImOa1t+Wxj+mrmOW6plxuXG4gICAgdG91Y2hJZDogbnVtYmVyOyAvL3RvdWNoaWRcblxuICAgIHNhdmluZ1BvdExvY2s6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuino+mUgeS6humHkeW4gemjnuWFpeWtmOmSsee9kFxuXG4gICAgaGVhdmVuVG91Y2g6IGJvb2xlYW47Ly/nlKjkuo7pmLLph43lpI3ngrnlh7tcblxuICAgIE9wZW5pbmdfdGltZXNfbGV2ZWw6IG51bWJlciA9IDA7Ly/lvIDlkK/mrKHmlbBcblxuICAgIGlzQ2hlY2tUYXNrUmVkOiBib29sZWFuID0gdHJ1ZTsgLy/mmK/lkKbmo4DmtYvpppbpobXku7vliqHnuqLngrlcblxuICAgIGFkUHJlT2JqOiBhbnkgPSB7fTsgLy/pooTliqDovb3lub/lkYrnmoRcblxuICAgIC8qKueUqOaIt+aVsOaNriAqL1xuICAgIHVzZXJEYXRhOiBVc2VyRGF0YSA9IHtcbiAgICAgICAgcG9vbDogW10sXG4gICAgICAgIGNvaW46IDAsXG4gICAgICAgIGhvbmdiYW86IDAsXG4gICAgICAgIGN1c3RvbXM6IHsgYmlnOiAxLCBzbWFsbDogMSB9LCAvLyDlhbPljaEg5aSn5YWzIOWwj+WFs1xuICAgICAgICBwcm9kdWN0OiA0MCxcbiAgICAgICAgdHVycmV0TGV2ZWw6IDEsIC8v54Ku5Y+w562J57qnXG4gICAgICAgIHByb3A6IFtcbiAgICAgICAgICAgIC8qKuWGsOWGuyAqL1xuICAgICAgICAgICAgeyB0eXBlOiAxLCBudW06IDAsIHRpbWU6IG51bGwsIHVzZTogcHJvcFN0YXRlLmVuZCB9LFxuICAgICAgICAgICAgLyoq55S15Ye7Ki9cbiAgICAgICAgICAgIHsgdHlwZTogMiwgbnVtOiAwLCB0aW1lOiBudWxsLCB1c2U6IHByb3BTdGF0ZS5lbmQgfSxcbiAgICAgICAgICAgIC8qKuaKpOe9qSovXG4gICAgICAgICAgICB7IHR5cGU6IDMsIG51bTogMCwgdGltZTogbnVsbCwgdXNlOiBwcm9wU3RhdGUuZW5kIH0sXG4gICAgICAgICAgICAvKirmuIXlsY8qL1xuICAgICAgICAgICAgeyB0eXBlOiA0LCBudW06IDAsIHRpbWU6IG51bGwsIHVzZTogcHJvcFN0YXRlLmVuZCB9LFxuICAgICAgICAgICAgLyoq6Ieq5Yqo5ZCI5oiQKi9cbiAgICAgICAgICAgIHsgdHlwZTogNSwgbnVtOiAwLCB0aW1lOiBudWxsLCB1c2U6IHByb3BTdGF0ZS5lbmQgfSxcbiAgICAgICAgICAgIC8qKuWinuiDvSovXG4gICAgICAgICAgICB7IHR5cGU6IDYsIG51bTogMCwgdGltZTogbnVsbCwgdXNlOiBwcm9wU3RhdGUuZW5kIH1cbiAgICAgICAgXSxcbiAgICAgICAgZXhjaGFuZ2VSYXRlOiAxMDAwMCxcbiAgICAgICAgbmV3VXNlcjogdHJ1ZSxcbiAgICAgICAgY29tcG91bmRUaW1lczogMCxcbiAgICAgICAgbm92aWNlR3VpZGU6IDEsXG4gICAgICAgIGJ1eUNvdW50OiAwLFxuICAgICAgICBlbXB0eUJveE5vOiAtMSxcbiAgICAgICAgaGVhdmVuUG9vbDogW10sXG4gICAgICAgIGhhdmVUcmVhc3VyZTogW10sXG4gICAgICAgIHRlcm1Db2luOiAwLFxuICAgICAgICBvZmZsaW5lSW5jb21lOiB7XG4gICAgICAgICAgICByZXdhcmQ6IDAsXG4gICAgICAgICAgICBtdWx0aXBsZVJld2FyZDogMFxuICAgICAgICB9LFxuICAgICAgICB2ZXJzaW9uOiAwLFxuICAgICAgICBHZXRUdXJyZXROdW06IDE4LFxuICAgICAgICBHZXREYXlUaW1lOiBudWxsLFxuICAgICAgICBhdXRvUHJvcDogbnVsbCxcbiAgICAgICAgYWlyYm9ybmVDb3VudDogMCxcbiAgICAgICAgdW5sb2NraW5nX3RpbWU6IDAsXG4gICAgICAgIHN5bnRoZXNpc190aW1lczogMCxcbiAgICAgICAgc3ludGhlc2lzX0FsbDogMCxcbiAgICAgICAgcHJvcENvbmZpZzogbnVsbCxcbiAgICAgICAgcmVzaXN0QXR0YWNrVGltZXM6IDAsXG4gICAgICAgIGxvY2FsQ29tcG91bmRUaW1lOiAwLFxuICAgICAgICBkYXlFbnRlclNpZ25OdW06IG51bGwsXG4gICAgICAgIGdvbGRXaGVlbENvdW50OiBudWxsLFxuICAgICAgICBzYXZpbmdQb3ROdW06IDAsXG4gICAgfTtcblxuICAgIC8qKkFC5rWL6K+VICovXG4gICAgQUJfVGVzdDogYW55ID0ge1xuICAgICAgICBsb2NrX3R1cnJldF90ZXN0OiBcIkJcIixcbiAgICAgICAgaGVhdmVuX2NvaW5fdGVzdDogXCJCXCIsXG4gICAgICAgIG5ld19oYW5kX3Rlc3Q6IFwiQlwiLFxuICAgICAgICAvLyB3YWxsZXRfdGVzdDpcIkFcIixcbiAgICB9XG5cbiAgICAvL+ingueci+inhumikeasoeaVsFxuICAgIGFkdmVydGlzaW5nX251bTogbnVtYmVyID0gMDtcbiAgICAvL+eci+inhumikeiOt+WPlumBk+WFt+aAu+asoeaVsFxuICAgIHByb3BzX251bWJlcjogbnVtYmVyID0gMDtcblxuICAgIC8v5ri45oiP5pe26Ze0XG4gICAgZ2FtZVRpbWU6IG51bWJlciA9IDA7XG4gICAgLy/pgZPlhbfkvb/nlKjmrKHmlbBcbiAgICBnYW1lUHJvcE51bTogbnVtYmVyID0gMDtcblxuICAgIC8v54K55Ye75LqG5pqC5YGcXG4gICAgaXNTdG9wOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvL+eUqOaIt+ihjOS4ulxuICAgIGJlaGF2aW9yUmV3YXJkVm9MaXN0OiBhbnkgPSBudWxsO1xuXG4gICAgLy/ov4flhbPlpZblirFcbiAgICBnYW1lTGV2ZWxQYXNzUmV3YXJkVm9MaXN0OiBhbnkgPSBbXTtcblxuICAgIC8v5LiL5LiA5YWz55qE5aWW5YqxXG4gICAgZ2FtZUxldmVsUGFzc1Jld2FyZE5leHRWb0xpc3Q6IGFueSA9IFtdO1xuXG4gICAgLy/lhbPljaHmgKrnianphY3nva5cbiAgICBtYXBDb25maWc6IGFueSA9IG51bGw7XG5cbiAgICAvL+mBk+WFt+mFjee9ruihqFxuICAgIHByb3BEYXRhOiBhbnkgPSBudWxsO1xuXG4gICAgLy/pgZPlhbflhbfkvZPmlbDlgLxcbiAgICBwcm9wQ29uZmlnOiBhbnkgPSBudWxsO1xuXG4gICAgLy/lnKjnur/ml7bpl7Tplb/luqZcbiAgICBvbmxpbmVfdGltZSA9IDYwMDtcblxuICAgIC8qKuWkqemZjemHkeW4geeCueWHu+asoeaVsCovXG4gICAgaGVhdmVuQ2xpY2tOdW06IG51bWJlciA9IDE7XG5cbiAgICAvKirmmK/lkKbliLDml7bpl7Tlj5HpgIHmlbDmja4z56eSICovXG4gICAgaXNTZW5kVHVycmV0RGF0YTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoq5piv5ZCm5Yiw5pe26Ze05Y+R6YCB5pWw5o2uM+enkiAqL1xuICAgIGlzU2VuZENvaW5EYXRhOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKirlj4zlgI3mlLbnm4ogKi9cbiAgICBkb3VibGVFYXJuOiBhbnkgPSB7IHVzZTogcHJvcFN0YXRlLmVuZCwgdGltZTogbnVsbCB9O1xuXG4gICAgLyoq5LiK5LiA5qyh5LiK5Lyg55qE5pWw5o2uICovXG4gICAgbGFzdERhdGE6IGFueSA9IHtcbiAgICAgICAgY29tcG91bmRUaW1lczogbnVsbCwgLy/lkIjmiJDmrKHmlbBcbiAgICAgICAgaGlnaGVzdEJhdHRlcnlMZXZlbDogbnVsbCwgLy/mnIDpq5jngq7loZRcbiAgICAgICAgcG9pbnQ6IG51bGwsIC8v6YeR5biBXG4gICAgICAgIHVzZXJCYXR0ZXJ5TnVtOiBudWxsLCAvL+WkmuWwkeS4queCruWhlFxuICAgICAgICB1c2VyTWFwRGV0YWlsOiBbXSAvL+axoOWhmOaVsOaNrlxuICAgIH07XG5cbiAgICAvL+mfs+aViOmFjee9rlxuICAgIHNvdW5kU2V0OiBzb3VuZEluZm8gPSB7XG4gICAgICAgIGJnbTogMSwgLy/og4zmma/pn7PmlYhcbiAgICAgICAgc291bmQ6IDEgLy/mma7pgJrpn7PmlYhcbiAgICB9O1xuXG4gICAgbWFwU2l6ZTogYW55ID0ge1xuICAgICAgICB3aWR0aDogNzUwLCAvL+WcsOWbvuWuveW6plxuICAgICAgICBncmlkOiBudWxsLCAvL+WcsOWbvuagvOWtkOWkp+Wwj1xuICAgICAgICBzdGFydEdyaWRQb3M6IG51bGwgLy/liJ3lp4vkvY3nva5cbiAgICB9Oy8v5Zyw5Zu+5aSn5bCPXG5cbiAgICAvL+WtmOWCqOW9k+WJjeWFs+WNoeeahOeCruWhlOS9jee9ruWSjOWbnuaUtueahOS9jee9rlxuICAgIGxldmVsTWFwOiBhbnkgPSBbXTtcbiAgICAvL+WtmOWCqOW9k+WJjeWFs+WNoeeahOaAquWFvVxuICAgIGxldmVsTW9uc3RlckFycjogeyBpZDogbnVtYmVyLCBudW06IG51bWJlciB9W10gPSBbXTtcbiAgICAvL+W9k+WJjeaAquWFveaVsOmHj1xuICAgIGxldmVsTW9uc3Rlck51bTogbnVtYmVyO1xuICAgIC8v5b2T5YmN5ri45oiP54q25oCBXG4gICAgbGV2ZWxTdGF0ZTogbnVtYmVyID0gZ2FtZVN0YXRlLmRlZmF1bHQ7XG4gICAgLy/otK3kubDmrKHmlbBcbiAgICBidXlDb3VudDogbnVtYmVyID0gMDtcbiAgICAvL+S7iuWkqeaYr+WQpuetvuWIsFxuICAgIGlzT2tTaWduOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy/mmK/lkKbmnInlnKjnur/lpZblirHnuqLljIVcbiAgICBpc1NpZ25PbkxpbmVSZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL+i3neemu+S4iuasoeiOt+W+l+maj+acuue6ouWMheaXtumXtFxuICAgIHVwVHVycmV0UmFuZG9tUmVkVGltZSA9IDA7XG4gICAgLy/lvZPliY3lnKjnur/ml7bpl7RcbiAgICBvbmxpbmVUaW1lTnVtID0gMDtcbiAgICAvL+maj+acuue6ouWMheaXtumXtFxuICAgIHJhbmRvbVJlZFRpbWVOdW0gPSA2MDtcbiAgICAvL+WkqemZjemHkeW4geeahOinhumikeaVsOmHj1xuICAgIGV4aXN0VmlkZW9Db2luTnVtOiBudW1iZXIgPSAwO1xuXG4gICAgLy/kuLTml7blj5jph49cbiAgICB0ZW1wUGFybTogb2JqZWN0ID0ge307XG4gICAgLyoqXG4gICAgICog5qOA5p+l5rGg5aGY5ZOq5Liq5L2N572u5piv56m655qEXG4gICAgICovXG4gICAgY2hlY2tQb29sKCk6IG51bWJlciB7XG5cbiAgICAgICAgbGV0IGxvYWN0aW9uOiBudW1iZXIgPSBudWxsOy8v5L2N572uXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsTWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMubGV2ZWxNYXBbaV07XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuR2V0UG9vbERhdGEoaXRlbS5ubyk7XG4gICAgICAgICAgICBsZXQgaGVhdmVuSXRlbSA9IFRvb2xzLkdldEFyckRhdGEoXCJub1wiLCBpdGVtLm5vLCB0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2wpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxldmVsID09IC0xICYmIGRhdGEuc3RhdGUgPT0gMSAmJiBoZWF2ZW5JdGVtLmlkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5ubyAhPSB0aGlzLnVzZXJEYXRhLmVtcHR5Qm94Tm8pIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hY3Rpb24gPSBpdGVtLm5vO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvYWN0aW9uO1xuICAgIH1cblxuICAgIHNldEludChfa2V5LCBfdmFsdWUpIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKF9rZXksIF92YWx1ZS50b1N0cmluZygpKVxuICAgIH1cblxuICAgIGdldEludChfa2V5LCBkZWYpIHtcbiAgICAgICAgdmFyIGRzID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKF9rZXkpXG4gICAgICAgIGlmIChkcyA9PSBcIlwiIHx8IGRzID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW50KF9rZXksIGRlZik7XG4gICAgICAgICAgICBkcyA9IGRlZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTnVtYmVyKGRzKVxuICAgIH1cblxuICAgIGdldFN0cmluZyhfa2V5KSB7XG4gICAgICAgIHJldHVybiBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oX2tleSlcbiAgICB9XG5cblxuICAgIHNldFN0cmluZyhfa2V5LCBfdmFsdWUpIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKF9rZXksIF92YWx1ZS50b1N0cmluZygpKVxuICAgIH1cblxuICAgIGluaWRhdGEoKSB7XG4gICAgICAgIC8v6YeR5biBXG4gICAgICAgIHRoaXMudXNlckRhdGEudmVyc2lvbiA9IDU0ODtcbiAgICAgICAgdGhpcy5kb3VibGVFYXJuLnVzZSA9IDA7XG4gICAgICAgIHRoaXMuZG91YmxlRWFybi50aW1lID0gMDtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5jb2luID0gdGhpcy5nZXRJbnQoXCJnb2xkaGJcIiwgMClcbiAgICAgICAgdGhpcy51c2VyRGF0YS5leGNoYW5nZVJhdGUgPSB0aGlzLmdldEludChcImV4Y2hhbmdlUmF0ZVwiLCAxMDAwMClcbiAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9kdWN0ID0gdGhpcy5nZXRJbnQoXCJwcm9kdWN0XCIsIDQwKVxuICAgICAgICB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnID0gdGhpcy5nZXRJbnQoXCJjdXN0b21zYmlnXCIsIDEpXG4gICAgICAgIHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCA9IHRoaXMuZ2V0SW50KFwiY3VzdG9tc3NtYWxsXCIsIDEpXG4gICAgICAgIHRoaXMudXNlckRhdGEubmV3VXNlciA9IHRydWUgLy90aGlzLmdldEludChcIm5ld3VzZXJcIiwxKT09MT90cnVlOmZhbHNlO1xuICAgICAgICB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsID0gdGhpcy5nZXRJbnQoXCJ0dXJyZXRMZXZlbFwiLCAxKVxuXG4gICAgICAgIGxldCBwc2RkID0gdGhpcy5nZXRTdHJpbmcoXCJtYXBwb29sXCIpXG4gICAgICAgIGlmIChwc2RkID09IFwiXCIgfHwgcHNkZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRQb29sKCk7XG4gICAgICAgICAgICBsZXQgZGRzID0gSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyRGF0YS5wb29sKVxuICAgICAgICAgICAgdGhpcy5zZXRTdHJpbmcoXCJtYXBwb29sXCIsIGRkcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEucG9vbCA9IEpTT04ucGFyc2UocHNkZClcbiAgICAgICAgICAgIHRoaXMucmVwYWlyUG9vbCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzYXZlZGF0YSgpIHtcblxuICAgICAgICB0aGlzLnNldEludChcImdvbGRoYlwiLCB0aGlzLnVzZXJEYXRhLmNvaW4pXG4gICAgICAgIHRoaXMuc2V0SW50KFwiZXhjaGFuZ2VSYXRlXCIsIHRoaXMudXNlckRhdGEuZXhjaGFuZ2VSYXRlKVxuICAgICAgICB0aGlzLnNldEludChcInByb2R1Y3RcIiwgdGhpcy51c2VyRGF0YS5wcm9kdWN0KVxuICAgICAgICB0aGlzLnNldEludChcImN1c3RvbXNiaWdcIiwgdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZylcbiAgICAgICAgdGhpcy5zZXRJbnQoXCJjdXN0b21zc21hbGxcIiwgdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsKVxuICAgICAgICB0aGlzLnVzZXJEYXRhLm5ld1VzZXIgPSB0cnVlIC8vdGhpcy5nZXRJbnQoXCJuZXd1c2VyXCIsMSk9PTE/dHJ1ZTpmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRJbnQoXCJ0dXJyZXRMZXZlbFwiLCB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsKVxuXG4gICAgICAgIGxldCBkZHMgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJEYXRhLnBvb2wpXG4gICAgICAgIHRoaXMuc2V0U3RyaW5nKFwibWFwcG9vbFwiLCBkZHMpXG4gICAgfVxuXG5cbiAgICAvL+WIpOaWreaYr+S4jeaYr+etvuWIsOS7iuWkqVxuICAgIGNhblNpbmdlKCkge1xuICAgICAgICB2YXIgY2FuZ2V0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgZGF0cyA9IFtcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIl07XG4gICAgICAgIHZhciBkZCA9IHRoaXMuZ2V0U3RyaW5nKFwic2luZ2RhZGFcIik7XG5cbiAgICAgICAgaWYgKGRkID09IFwiXCIgfHwgZGQgPT0gbnVsbCB8fCBkZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RyaW5nKFwic2luZ2RhZGFcIiwgSlNPTi5zdHJpbmdpZnkoZGF0cykpO1xuICAgICAgICAgICAgLy8sSlNPTi5zdHJpbmdpZnko6KGo5ZCNKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0cyA9IEpTT04ucGFyc2UoZGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3J0ZSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0c1tpXSA9PSBcIjBcIikge1xuICAgICAgICAgICAgICAgIHJlc3J0ZSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzcnRlID09IDApIHtcbiAgICAgICAgICAgIGRhdHMgPSBbXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCJdO1xuICAgICAgICAgICAgdGhpcy5zZXRTdHJpbmcoXCJzaW5nZGFkYVwiLCBKU09OLnN0cmluZ2lmeShkYXRzKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciB0ZHN0ciA9IGQuZ2V0RnVsbFllYXIoKSArIFwiXCIgKyBkLmdldE1vbnRoKCkgKyBcIlwiICsgZC5nZXREYXRlKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzaW5nIDogIFwiICt0ZHN0ciApO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRkc3RyID09IGRhdHNbaV0pIHtcbiAgICAgICAgICAgICAgICBjYW5nZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuICFjYW5nZXQ7XG4gICAgfVxuXG5cbiAgICBzaW5nbGVuKCkge1xuICAgICAgICB2YXIgZGQgPSB0aGlzLmdldFN0cmluZyhcInNpbmdkYWRhXCIpO1xuICAgICAgICB2YXIgZGF0cyA9IEpTT04ucGFyc2UoZGQpO1xuXG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0c1tpXSAhPSBcIjBcIikge1xuICAgICAgICAgICAgICAgIGluZGV4ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBzaW5ndG9kYXkoKSB7XG4gICAgICAgIHZhciBkZCA9IHRoaXMuZ2V0U3RyaW5nKFwic2luZ2RhZGFcIik7XG4gICAgICAgIHZhciBkYXRzID0gSlNPTi5wYXJzZShkZCk7XG4gICAgICAgIHZhciBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHRkc3RyID0gZC5nZXRGdWxsWWVhcigpICsgXCJcIiArIGQuZ2V0TW9udGgoKSArIFwiXCIgKyBkLmdldERhdGUoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRzW2ldID09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgZGF0c1tpXSA9IHRkc3RyO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcblxuICAgICAgICAgICAgICAgIGkgPSA4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RyaW5nKFwic2luZ2RhZGFcIiwgSlNPTi5zdHJpbmdpZnkoZGF0cykpO1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDnlKjkuo7mlrDmiYvvvIzliJ3lp4vljJbnlKjmiLfmlbDmja5cbiAgICAgKi9cbiAgICBpbml0UG9vbCgpIHtcblxuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTc7IGkrKykge1xuXG4gICAgICAgICAgICAvL+WIneWni+WMluaxoOWhmFxuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wb29sLnB1c2goe1xuICAgICAgICAgICAgICAgIG5vOiBpLCAvL+esrOWHoOS4quS9jee9rlxuICAgICAgICAgICAgICAgIGxldmVsOiBpID09IDEgPyAxIDogLTEsLy8tMeS4uuepulxuICAgICAgICAgICAgICAgIHN0YXRlOiAxIC8v6buY6K6k5YmNOOS4quino+mUgVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKuS/ruWkjeaXp+aVsOaNriovXG4gICAgcmVwYWlyUG9vbCgpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5wb29sW2ldLnN0YXRlID09IDApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMudXNlckRhdGEucG9vbFtpXS5zdGF0ZSA9IDE7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbph5HluIHkvY3nva5cbiAgICAgKi9cbiAgICBpbml0SGVhdmVuUG9vbCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxNzsgaSsrKSB7XG4gICAgICAgICAgICAvL+WIneWni+WMlumHkeW4geaxoOWhmFxuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sLnB1c2goe1xuICAgICAgICAgICAgICAgIG5vOiBpLCAvL+S9jee9rlxuICAgICAgICAgICAgICAgIGlkOiBudWxsLCAvL+mHkeW4gWlkXG4gICAgICAgICAgICAgICAgdmFsdWU6IG51bGwsIC8v5aSa5bCR5YC8XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlueCruWPsOeahOaVsOaNrlxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqdcbiAgICAgKi9cbiAgICBHZXRUdXJyZXREYXRhKGxldmVsOiBudW1iZXIpOiB0dXJyZXRJbmZvIHtcblxuICAgICAgICBsZXQgZGF0YTogdHVycmV0SW5mbyA9IG51bGw7XG5cbiAgICAgICAgbGV0IHR1cnJldERhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy50dXJyZXREYXRhKTtcblxuICAgICAgICBkYXRhID0gVG9vbHMuZGVlcENsb25lKFRvb2xzLkdldEFyckRhdGEoXCJsZXZlbFwiLCBsZXZlbCwgdHVycmV0RGF0YSkpO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS/neWtmOS4gOS4i+axoOWhmOaVsOaNrlxuICAgICAqIEBwYXJhbSBpZCDkvY3nva5cbiAgICAgKiBAcGFyYW0gbGV2ZWwg562J57qnIG51bGzlsLHmmK/liKDpmaRcbiAgICAgKi9cbiAgICBzYXZlUG9vbChpZDogbnVtYmVyLCBsZXZlbDogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICAvLyBsZXQgaXNFeGlzdDpudW1iZXIgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLnBvb2xbaV07XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5wb29sW2ldLm5vID09IGlkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmxldmVsID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6KGM5Li65aWW5YqxXG4gICAgICogQHBhcmFtIHR5cGUgMS3nrKzkuIDmrKHop6PplIHmlrDngq7loZTvvIwyLea2iOeBreaAquWFve+8jDMt6Kej6ZSB54Ku5aGUIDQt5a6M5oiQ5YWz5Y2hIDUu5ZCI5oiQXG4gICAgICovXG4gICAgR2V0QmVoYXZpb3JSZXdhcmRWbyh0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIi0tLS0tLS0xMjMtLS0tLS0tYmVoYXZpb3JSZXdhcmRWb0xpc3QgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuYmVoYXZpb3JSZXdhcmRWb0xpc3QpIClcbiAgICAgICAgcmV0dXJuIFRvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsIHR5cGUsIHRoaXMuYmVoYXZpb3JSZXdhcmRWb0xpc3QpLnJld2FyZDtcblxuICAgIH1cblxuXG4gICAgZ2V0bm93bWFwZGF0YSgpIHtcblxuICAgICAgICB0aGlzLm1hcENvbmZpZyA9IHRoaXMuZ2V0TWFwZGF0YSh0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5L+d5a2Y5LiA5LiL6YeR5biB5rGg5aGY5pWw5o2uXG4gICAgICogQHBhcmFtIG5vIOS9jee9rlxuICAgICAqIEBwYXJhbSBpZCDph5HluIFpZCBudWxs5bCx5piv5Yig6ZmkXG4gICAgICogQHBhcmFtIHZhbHVlIOWkmuWwkeWAvCBudWxs5bCx5piv5Yig6ZmkXG4gICAgICovXG4gICAgc2F2ZUhlYXZlblBvb2wobm86IG51bWJlciwgaWQ6IG51bWJlciA9IG51bGwsIHZhbHVlOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIC8vIGxldCBpc0V4aXN0Om51bWJlciA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbFtpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2xbaV0ubm8gPT0gbm8pIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgfHwgaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IGlkO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlumHkeW4geaxoOWhmOeahOacieWkmuWwkeS4qlxuICAgICAqL1xuICAgIGdldEhlYXZlblBvb2woKSB7XG5cbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2xbaV07XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sW2ldLmlkKSB7XG4gICAgICAgICAgICAgICAgbnVtKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOafpeWkqemZjemHkeW4gei/meS4quS9jee9ruaYr+WQpuS4uuacieS4nOilv1xuICAgICAqIEBwYXJhbSBubyDkvY3nva5cbiAgICAgKi9cbiAgICBjaGVja0hlYXZlblBvb2wobm86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXNFeGlzdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEuaGVhdmVuUG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLmhlYXZlblBvb2xbaV07XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sW2ldLm5vID09IG5vKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNFeGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzRXhpc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICog6L+U5Zue5piv5ZCm5piv5paw562J57qnXG4gICAgICogQHBhcmFtIGxldmVsIOetiee6p1xuICAgICAqL1xuXG4gICAgdXBMZXZlbChsZXZlbDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChsZXZlbCA+IHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWwpIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeWFs+WNoeaAquWFvemFjee9rlxuICAgICAqL1xuICAgIEdldEN1c3RvbXNNb25zdGVySW5mbygpIHtcblxuICAgICAgICB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnID0gdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZyA+IDQ1ID8gNDUgOiB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnO1xuICAgICAgICBsZXQgbWFwRGF0YSA9IHRoaXMuZ2V0TWFwZGF0YSh0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdldEN1c3RvbXNNb25zdGVySW5mbyA6IFwiKyBKU09OLnN0cmluZ2lmeShtYXBEYXRhKSlcbiAgICAgICAgLy8gbGV0IG1hcERhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5tYXBEYXRhKTtcblxuICAgICAgICAvL+i/lOWbnuaVsOaNrlxuICAgICAgICBsZXQgZGF0YSA9IG1hcERhdGFbdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsIC0gMV07XG5cbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDtpPG1hcERhdGEubGVuZ3RoO2krKyl7XG5cbiAgICAgICAgLy8gICAgIGlmKG1hcERhdGFbaV0uaWQ9PXRoaXMudXNlckRhdGEuY3VzdG9tcy5iaWcpe1xuXG4gICAgICAgIC8vICAgICAgICAgZm9yKGxldCBqID0gMDtqPG1hcERhdGFbaV0uY3VzdG9tcy5sZW5ndGg7aisrKXtcblxuICAgICAgICAvLyAgICAgICAgICAgICBpZihtYXBEYXRhW2ldLmN1c3RvbXNbal0ubGV2ZWw9PXRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBkYXRhID0gbWFwRGF0YVtpXS5jdXN0b21zW2pdLm1vbnN0ZXI7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vICAgICAgICAgfVxuXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgbGV0IEFyciA9IFtdO1xuICAgICAgICBkYXRhID0gZGF0YS5sZXZlbENvbmZpZy5zcGxpdChcIitcIik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGxldCBpdGVtID0gZGF0YVtpXS5zcGxpdChcIi1cIik7XG5cbiAgICAgICAgICAgIGxldCBpZCA9IGl0ZW1bMF07XG4gICAgICAgICAgICBsZXQgbnVtID0gaXRlbVsxXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICAgICAgICAgIEFyci5wdXNoKGlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFycjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeWFs+WNoeWcsOWbvumFjee9rlxuICAgICAqL1xuICAgIEdldEN1c3RvbXNNYXAoKSB7XG4gICAgICAgIGxldCBtYXBEYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMubWFwRGF0YSk7XG4gICAgICAgIC8v6L+U5Zue5pWw5o2uXG4gICAgICAgIGxldCBkYXRhID0gVG9vbHMuR2V0QXJyRGF0YShcImlkXCIsIDEsIG1hcERhdGEpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS1HZXRDdXN0b21zTWFwLS0tLS0tLS0tLTptYXAgOiBcIisgbWFwRGF0YSApXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmui/h+S9jee9ruadpeiOt+WPlueUqOaIt+aVsOaNrlxuICAgICAqIEBwYXJhbSBsb2FjdGlvbiDlk6rkuKpcbiAgICAgKi9cblxuICAgIEdldFBvb2xEYXRhKGxvYWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBudWxsO1xuICAgICAgICBkYXRhID0gVG9vbHMuR2V0QXJyRGF0YShcIm5vXCIsIGxvYWN0aW9uLCB0aGlzLnVzZXJEYXRhLnBvb2wpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCa6L+H5L2N572u5p2l6I635Y+WTWFw5pWw5o2uXG4gICAgICogQHBhcmFtIGxvYWN0aW9uIOWTquS4qlxuICAgICAqL1xuICAgIEdldFBsYWNlRGF0YShsb2FjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRhID0gbnVsbDtcblxuICAgICAgICBkYXRhID0gVG9vbHMuR2V0QXJyRGF0YShcIm5vXCIsIGxvYWN0aW9uLCB0aGlzLmxldmVsTWFwKTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmgKrlhb3mlbDmja5cbiAgICAgKiBAcGFyYW0gbm8g562J57qnXG4gICAgICovXG5cbiAgICBHZXRNb25zdGVyRGF0YShsZXZlbDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMubW9uc3RlckRhdGEpO1xuXG4gICAgICAgIHJldHVybiBUb29scy5HZXRBcnJEYXRhKFwibm9cIiwgbGV2ZWwsIGRhdGEpO1xuXG4gICAgfVxuXG4gICAgLyoq5qOA5p+l5pyA6auY57qn5Yir55qE54Ku5aGU5pe25piv5ZCm6LaF6L+H5Lik5LiqICovXG4gICAgY2hla1Bvb2xIYXZlVHdvKCkge1xuXG4gICAgICAgIGxldCBsZXZlbDogbnVtYmVyID0gdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbDtcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLnBvb2xbaV07XG4gICAgICAgICAgICBpZiAoaXRlbS5sZXZlbCA9PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIG51bSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW0gPj0gMjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluaAquWFveminOiJslxuICAgICAqIEBwYXJhbSBsZXZlbCDnrYnnuqdcbiAgICAgKi9cblxuICAgIEdldE1vbnN0ZXJDb2xvcihsZXZlbDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMubW9uc3RlckRhdGEpO1xuICAgICAgICByZXR1cm4gVG9vbHMuR2V0QXJyRGF0YShcIm5vXCIsIGxldmVsLCBkYXRhKS5jb2xvcjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWFs+WNoeaAquWFvWlkXG4gICAgICogQHBhcmFtIGlkIGlkXG4gICAgICovXG5cbiAgICBHZXRNb25zdGVySWREYXRhKGlkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5tb25zdGVySWREYXRhKTtcbiAgICAgICAgcmV0dXJuIFRvb2xzLkdldEFyckRhdGEoXCJpZFwiLCBpZCwgZGF0YSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blnLDlm77nmoTkvY3nva5cbiAgICAgKiBAcGFyYW0geCDmqKrlkJFcbiAgICAgKiBAcGFyYW0geSDnq5blkJFcbiAgICAgKi9cbiAgICBHZXRNYXBQb3MoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBjYy5WZWMyIHtcblxuICAgICAgICBsZXQgcG9zOiBjYy5WZWMyID0gY2MudjIoKTtcblxuICAgICAgICBwb3MueCA9IHRoaXMubWFwU2l6ZS5zdGFydEdyaWRQb3MueCArIHggKiB0aGlzLm1hcFNpemUuZ3JpZDtcbiAgICAgICAgcG9zLnkgPSB0aGlzLm1hcFNpemUuc3RhcnRHcmlkUG9zLnkgLSB5ICogdGhpcy5tYXBTaXplLmdyaWQ7XG4gICAgICAgIHJldHVybiBwb3M7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7lvZPliY3lhbPljaEg6Led56a757uI54K55pyA6L+R55qE5oCq5YW9XG4gICAgICogQHBhcmFtIGlkIOaAquWFvWlkXG4gICAgICogQHBhcmFtIG51bSDliankvZnlpJrlsJHmraVcbiAgICAgKi9cbiAgICBzZXRMZXZlbE1vbnN0ZXJEYXRhKGlkOiBudW1iZXIsIG51bTogbnVtYmVyKSB7XG5cbiAgICAgICAgbGV0IGlzRXhpc3Q6IGJvb2xlYW4gPSBUb29scy5zZXRBcnJEYXRhKFwiaWRcIiwgaWQsIFwibnVtXCIsIG51bSwgdGhpcy5sZXZlbE1vbnN0ZXJBcnIpO1xuICAgICAgICBpZiAoIWlzRXhpc3QpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxNb25zdGVyQXJyLnB1c2goeyBpZCwgbnVtIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvcnRGbiA9IChhLCBiKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBiZWZvcmU6IG51bWJlciA9IGEubnVtIC0gYi5udW07XG5cbiAgICAgICAgICAgIGlmIChhLm51bSA9PSBiLm51bSkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IGEuaWQgLSBiLmlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sZXZlbE1vbnN0ZXJBcnIuc29ydChzb3J0Rm4pO1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIoOmZpOW9k+WJjeWFs+WNoSDnmoTmgKrnialcbiAgICAgKiBAcGFyYW0gaWQg56ys5Yeg5LiqXG4gICAgICovXG4gICAgZGVsZWN0TGV2ZWxNb25zdGVyKGlkOiBudW1iZXIpIHtcblxuICAgICAgICBsZXQgaXNTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsTW9uc3RlckFyci5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbE1vbnN0ZXJBcnJbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsTW9uc3RlckFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgaXNTdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmnIDov5Hnu4jngrnnmoTmgKrlhb1cbiAgICAgKi9cbiAgICBnZXRGaXJzdE1vbnN0ZXIoKSB7XG4gICAgICAgIC8v6buY6K6k56ys5LiA5LiqXG4gICAgICAgIHJldHVybiB0aGlzLmxldmVsTW9uc3RlckFyclswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmnIDpnaDov5Hoh6rlt7HnmoTmgKrlhb1cbiAgICAgKiBAcGFyYW0gcG9zIOiHquW3seS9jee9rlxuICAgICAqIEBwYXJhbSBkaXN0YW5jZU51bSDkvJjlhYjlsITnqIvot53nprtcbiAgICAgKi9cbiAgICBnZXRDbG9zZU1vbnN0ZXIocG9zOiBjYy5WZWMyLCBkaXN0YW5jZU51bTogbnVtYmVyID0gMjUwKSB7XG4gICAgICAgIC8v5pyA6Z2g6L+R6Ieq5bex55qEXG4gICAgICAgIGxldCBjbG9zZU1vbnNldHIgPSB7IGlkOiBudWxsLCBkaXN0YW5jZTogbnVsbCwgbnVtOiBudWxsLCBpc0Nsb3NlOiBmYWxzZSB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZXZlbE1vbnN0ZXJBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnICsgXCItXCIgKyB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwgKyBcIl9Nb25zdGVyX1wiICsgdGhpcy5sZXZlbE1vbnN0ZXJBcnJbaV0uaWQ7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0OiBjYy5Ob2RlID0gdGhpcy5Nb25zdGVyTWFwLmdldChuYW1lKTtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3M6IGNjLlZlYzIgPSB0YXJnZXQuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZTogbnVtYmVyID0gdGFyZ2V0UG9zLnN1Yihwb3MpLm1hZygpO1xuICAgICAgICAgICAgaWYgKChjbG9zZU1vbnNldHIuaWQgPT0gbnVsbCB8fCBkaXN0YW5jZSA8IGNsb3NlTW9uc2V0ci5kaXN0YW5jZSkgJiYgZGlzdGFuY2UgPD0gZGlzdGFuY2VOdW0pIHtcbiAgICAgICAgICAgICAgICBjbG9zZU1vbnNldHIuaWQgPSB0aGlzLmxldmVsTW9uc3RlckFycltpXS5pZDtcbiAgICAgICAgICAgICAgICBjbG9zZU1vbnNldHIuZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICBjbG9zZU1vbnNldHIubnVtID0gdGhpcy5sZXZlbE1vbnN0ZXJBcnJbaV0ubnVtO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjbG9zZU1vbnNldHIuaWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjbG9zZU1vbnNldHIuZGlzdGFuY2U7XG4gICAgICAgICAgICBjbG9zZU1vbnNldHIuaXNDbG9zZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gY2xvc2VNb25zZXRyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHN0cjogYW55ID0gdGhpcy5nZXRGaXJzdE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIGlmICghc3RyKSByZXR1cm47XG4gICAgICAgICAgICBzdHIuaXNDbG9zZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbG9zZU1vbnNldHIsJ2Nsb3NlTW9uc2V0cicpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aqM6K+B5piv5ZCm6L+Y5Zyo6Z2g6L+R5oCq5YW9XG4gICAgICogQHBhcmFtIGRhdGEge3Bvczroh6rlt7HnmoTkvY3nva4saWQ6fVxuICAgICAqL1xuICAgIGNoZWNrTW9uc3RlckNsb3NlKGRhdGE6IHsgcG9zOiBjYy5WZWMyLCBpZDogbnVtYmVyLCBkaXN0YW5jZU51bTogbnVtYmVyIH0pIHtcblxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gdGhpcy51c2VyRGF0YS5jdXN0b21zLmJpZyArIFwiLVwiICsgdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsICsgXCJfTW9uc3Rlcl9cIiArIGRhdGEuaWQ7XG4gICAgICAgIGxldCB0YXJnZXQ6IGNjLk5vZGUgPSB0aGlzLk1vbnN0ZXJNYXAuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBsZXQgdGFyZ2V0UG9zOiBjYy5WZWMyID0gdGFyZ2V0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBkaXN0YW5jZTogbnVtYmVyID0gdGFyZ2V0UG9zLnN1YihkYXRhLnBvcykubWFnKCk7XG4gICAgICAgIHJldHVybiBkaXN0YW5jZSA8IGRhdGEuZGlzdGFuY2VOdW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W55u45ZCM55qE562J57qn55qE54Ku5Y+wXG4gICAgICogQHBhcmFtIGxldmVsIOetiee6p1xuICAgICAqL1xuICAgIGdldFBvb2xTYW1lTGV2ZWxUdXJyZXQobGV2ZWw6IG51bWJlcikge1xuXG4gICAgICAgIGxldCBzYW1lTGV2ZWwgPSBUb29scy5HZXRBcnJEYXRhKFwibGV2ZWxcIiwgbGV2ZWwsIHRoaXMudXNlckRhdGEucG9vbCwgLTEpO1xuICAgICAgICByZXR1cm4gc2FtZUxldmVsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L+d5a2Y6YCa5YWz5L+h5oGv77yM5bm25LiUKzFcbiAgICAgKi9cblxuICAgIHNhdmVDdXN0b21MZXZlbCgpOiBib29sZWFuIHtcblxuXG4gICAgICAgIC8vIGxldCBtYXBEYXRhID0gdGhpcy5tYXBDb25maWc7XG5cbiAgICAgICAgLy8gaWYodGhpcy5tYXBDb25maWcubGVuZ3RoPHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCsxKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwi6LaF6L+H5LqGXCIpXG4gICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgIC8vIH1cblxuICAgICAgICBsZXQgSXNVcDogYm9vbGVhbiA9IGZhbHNlOyAvL+aYr+WQpuWNh+e6p1xuXG4gICAgICAgIGlmICh0aGlzLm1hcENvbmZpZy5sZW5ndGggPCB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwgKyAxKSB7XG4gICAgICAgICAgICB0aGlzLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ2FtZUxldmVsQ29tcGxldGVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IHsgbGV2ZWw6IHRoaXMudXNlckRhdGEuY3VzdG9tcy5iaWcgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZUxldmVsUGFzc1Jld2FyZFZvTGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5yZXdhcmRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3QucHVzaChyZXMucmV3YXJkTGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlrozmiJDlhbPljaHkuIrmiqUhXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuYmlnICs9IDE7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwgPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXRJbnQoXCJjdXN0b21zYmlnXCIsIHRoaXMudXNlckRhdGEuY3VzdG9tcy5iaWcpXG4gICAgICAgICAgICB0aGlzLnNldEludChcImN1c3RvbXNzbWFsbFwiLCB0aGlzLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui2hei/h+S6huWwj+WFs+WNoeeahOeahOmVv+W6pizlsI/lhbPljaHlj5jkuLox77yM5aSn5YWz5Y2hKzFcIik7XG4gICAgICAgICAgICBJc1VwID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuY3VzdG9tcy5zbWFsbCArPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXRJbnQoXCJjdXN0b21zc21hbGxcIiwgdGhpcy51c2VyRGF0YS5jdXN0b21zLnNtYWxsKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIElzVXA7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDkuqfog71cbiAgICAgKiBAcGFyYW0gbnVtIOWKoOWkmuWwkeS4qijpu5jorqQxKVxuICAgICAqIEBwYXJhbSB0eXBlIOaZrumAmueahDDvvIjlj6rog73lop7liqAyMOWmguaenOi2hei/h+WImeS4jeWinuWKoO+8iVxuICAgICAqL1xuICAgIHByb2R1Y3RUdXJyZXQobnVtOiBudW1iZXIgPSAxLCB0eXBlOiBudW1iZXIgPSAwKSB7XG5cbiAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9kdWN0ICs9IG51bTtcbiAgICAgICAgaWYgKHR5cGUgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5hZGRQcm9kdWN0KDApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbog73ljYfnuqcgXG4gICAgICogQHBhcmFtIGxldmVsIOetiee6p1xuICAgICovXG4gICAgY2hlY2tVcGRhdGVMZXZlbChsZXZlbDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRhID0ganNvblNpbmdsZXRvbi5zaW5nbGV0b24uZ2V0SnNvbihOYW1lVHMudHVycmV0RGF0YSk7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IGxldmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlop7liqDlpJrlsJHkuKrkuqfog73miJbogIXlh4/lsJFcbiAgICAgKiBAcGFyYW0gbnVtIOaVsOmHj1xuICAgICAqL1xuICAgIGFkZFByb2R1Y3QobnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9kdWN0ICs9IG51bTtcbiAgICAgICAgLy8gaWYodGhpcy51c2VyRGF0YS5wcm9kdWN0KzE+Z2FtZU51bWVyaWNhbC5Qcm9kdWN0TWF4KXtcbiAgICAgICAgLy8gICAgIHRoaXMudXNlckRhdGEucHJvZHVjdCA9IGdhbWVOdW1lcmljYWwuUHJvZHVjdE1heDtcbiAgICAgICAgLy8gfWVsc2UgXG4gICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLnByb2R1Y3QgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLnByb2R1Y3QgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhLCB1cGRhdGVUeXBlLnByb2R1Y3QpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlop7liqDlpJrlsJHkuKrph5HluIHmiJbogIXlh4/lsJFcbiAgICAgKiBAcGFyYW0gbnVtIOaVsOmHj1xuICAgICAqL1xuICAgIGFkZENvaW4obnVtKSB7XG4gICAgICAgIHRoaXMudXNlckRhdGEuY29pbiArPSBwYXJzZUludChudW0pO1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5jb2luIDwgMCkge1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5jb2luID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNhdmVkYXRhKCk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9XYWxsZXRfQWRkQ29pbiwgbnVtKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1ZpZXdfVXNlckRhdGFVcGRhdGEsIHVwZGF0ZVR5cGUuY29pbik7XG4gICAgfVxuXG4gICAgLyoq5pyf6Ze05Yqg5aSa5bCR6YeR5biBXG4gICAgICogQHBhcmFtIG51bSDmlbDlgLxcbiAgICAqL1xuICAgIGFkZFRlcm1Db2luKG51bTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudXNlckRhdGEudGVybUNvaW4gKz0gbnVtO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6LSt5Lmw55qE562J57qn5bm26L+U5Zue562J57qnXG4gICAgICovXG4gICAgZ2V0QnV5UmFuZG9tTGV2ZWwoKTogbnVtYmVyIHtcblxuICAgICAgICBsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLmJ1eURhdGEpO1xuXG4gICAgICAgIC8v5Y2V54us55qE562J57qnXG4gICAgICAgIGxldCBsZXZlbDogbnVtYmVyID0gbnVsbDtcblxuICAgICAgICBsZXQgc21hbGxEYXRhID0geyBudW06IDAsIGxldmVsOiAwIH07XG5cbiAgICAgICAgbGV0IHN0ciA9IFRvb2xzLkdldEFyckRhdGEoXCJsZXZlbFwiLCB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsLCBkYXRhKTtcbiAgICAgICAgbGV0IHJhbmRvbUxldmVsOiBudW1iZXIgPSBudWxsO1xuICAgICAgICBpZiAoIXN0cikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmib7kuI3liLB+XCIgKyB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsICsgXCLnuqfnmoTngq7loZTotK3kubDkv6Hmga9cIilcbiAgICAgICAgICAgIHN0ciA9IGRhdGFbZGF0YS5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBhcnIgPSBKU09OLnBhcnNlKHN0ci5hcnIpO1xuICAgICAgICAgICAgcmFuZG9tTGV2ZWwgPSB0aGlzLkdldFdlaWd0aExldmVsKGFycik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLnBvb2xbaV07XG4gICAgICAgICAgICBpZiAoaXRlbS5sZXZlbCA9PSAtMSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoc21hbGxEYXRhLmxldmVsID09IDAgfHwgc21hbGxEYXRhLmxldmVsID4gaXRlbS5sZXZlbCkge1xuICAgICAgICAgICAgICAgIHNtYWxsRGF0YS5sZXZlbCA9IGl0ZW0ubGV2ZWw7XG4gICAgICAgICAgICAgICAgc21hbGxEYXRhLm51bSA9IDE7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNtYWxsRGF0YS5sZXZlbCA9PSBpdGVtLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgc21hbGxEYXRhLm51bSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzbWFsbERhdGEubnVtID09IDEgJiYgcmFuZG9tTGV2ZWwgPj0gc21hbGxEYXRhLmxldmVsKSB7XG4gICAgICAgICAgICBsZXZlbCA9IHNtYWxsRGF0YS5sZXZlbDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pyJ5Y2V54us55qE54Ku5aGUXCIsIGxldmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKClcbiAgICAgICAgICAgIC8vIGxldmVsID0gTnVtYmVyKHN0ci5taW4pO1xuICAgICAgICAgICAgLy8gbGV0IG1heExldmVsOm51bWJlciA9IE51bWJlcihzdHIubWF4KTtcbiAgICAgICAgICAgIC8vIGlmKGxldmVsK3RoaXMuYnV5Q291bnQ+bWF4TGV2ZWwpe1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuYnV5Q291bnQgPSAwO1xuICAgICAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgICAgICAvLyAgICAgbGV2ZWwgKz0gdGhpcy5idXlDb3VudDtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIHRoaXMuYnV5Q291bnQrKztcbiAgICAgICAgICAgIGxldmVsID0gcmFuZG9tTGV2ZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxldmVsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDpgJrov4fmnYPph43ojrflj5bnrYnnuqdcbiAgICAqL1xuICAgIEdldFdlaWd0aExldmVsKGRhdGE6IGFueVtdKSB7XG5cbiAgICAgICAgbGV0IGFyciA9IFRvb2xzLmRlZXBDbG9uZShkYXRhKTtcblxuICAgICAgICBsZXQgc3RyID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBhcnJbaV07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaXRlbS53ZWlndGg7IGorKykge1xuXG4gICAgICAgICAgICAgICAgc3RyLnB1c2goaXRlbS5pZCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGxldCByYW5kb206IG51bWJlciA9IFRvb2xzLkdldFJhbmRvbSgwLCBzdHIubGVuZ3RoIC0gMSk7XG4gICAgICAgIGxldCBpZDogbnVtYmVyID0gc3RyW3JhbmRvbV07XG4gICAgICAgIGlmIChpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZCA9IGFyclswXS5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBOdW1iZXIoaWQpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qOA5rWL5Zyo5ZOq6YeMXG4gICAgICogQHBhcmFtIHBvcyDngrkg5Z+65LqO5Lit5b+D54K5Y2MudjJcbiAgICAgKiBAcGFyYW0gY2FsbCDlm57osIMgXG4gICAgICovXG4gICAgY2hlY2tUb3VjaFBvb2wocG9zOiBjYy5WZWMyLCBjYWxsOiBGdW5jdGlvbikge1xuXG4gICAgICAgIGxldCBkYXRhOiBudW1iZXIgPSBudWxsO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZXZlbE1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmxldmVsTWFwW2ldO1xuICAgICAgICAgICAgLy/moLzlrZDnmoTkvY3nva5cblxuICAgICAgICAgICAgbGV0IHN0ciA9IHtcbiAgICAgICAgICAgICAgICB4OiBudWxsLFxuICAgICAgICAgICAgICAgIHk6IG51bGwsXG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlID09IHRoaW5nVHlwZS50dXJyZXQpIHtcbiAgICAgICAgICAgICAgICBzdHIueCA9IHRoaXMubWFwU2l6ZS5zdGFydEdyaWRQb3MueCArIGl0ZW0ueCAqIHRoaXMubWFwU2l6ZS5ncmlkO1xuICAgICAgICAgICAgICAgIHN0ci55ID0gdGhpcy5tYXBTaXplLnN0YXJ0R3JpZFBvcy55IC0gaXRlbS55ICogdGhpcy5tYXBTaXplLmdyaWQ7XG4gICAgICAgICAgICAgICAgc3RyLndpZHRoID0gdGhpcy5tYXBTaXplLmdyaWQ7XG4gICAgICAgICAgICAgICAgc3RyLmhlaWdodCA9IHRoaXMubWFwU2l6ZS5ncmlkO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT0gdGhpbmdUeXBlLnJlY3ljbGUpIHtcbiAgICAgICAgICAgICAgICBzdHIueCA9IGl0ZW0ucG9zLng7XG4gICAgICAgICAgICAgICAgc3RyLnkgPSBpdGVtLnBvcy55O1xuICAgICAgICAgICAgICAgIHN0ci53aWR0aCA9IGl0ZW0ud2lkdGg7XG4gICAgICAgICAgICAgICAgc3RyLmhlaWdodCA9IGl0ZW0uaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbGV0IGl0ZW1YOm51bWJlciA9IHV0aWwubWFwU2l6ZS5zdGFydEdyaWRQb3MueCtpdGVtLngqdXRpbC5tYXBTaXplLmdyaWQ7XG4gICAgICAgICAgICAvLyBsZXQgaXRlbVk6bnVtYmVyID0gdXRpbC5tYXBTaXplLnN0YXJ0R3JpZFBvcy55LWl0ZW0ueSp1dGlsLm1hcFNpemUuZ3JpZDtcblxuICAgICAgICAgICAgaWYgKHN0ci55ICsgc3RyLmhlaWdodCAvIDIgPj0gcG9zLnkgJiYgcG9zLnkgPj0gc3RyLnkgLSBzdHIuaGVpZ2h0IC8gMiAmJlxuICAgICAgICAgICAgICAgIHN0ci54ICsgc3RyLndpZHRoIC8gMiA+PSBwb3MueCAmJiBwb3MueCA+PSBzdHIueCAtIHN0ci53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09IHRoaW5nVHlwZS5yZWN5Y2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmVjeWNsZUZuKCk7XG4gICAgICAgICAgICAgICAgICAgIC8v6buY6K6k5Z6D5Zy+5Li6MTAwXG4gICAgICAgICAgICAgICAgICAgIGNhbGwoMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRhID0gaXRlbS5ubztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSGVhdmVuUG9vbChkYXRhKSkge1xuICAgICAgICAgICAgZGF0YSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YSA9PSB0aGlzLnVzZXJEYXRhLmVtcHR5Qm94Tm8pIHtcbiAgICAgICAgICAgIGRhdGEgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbChkYXRhKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIpOaWreaYr+WQpuWcqOWtmOWcqFxuICAgICAqIEBwYXJhbSBubyDnrKzlh6DkuKpcbiAgICAgKi9cbiAgICBjaGVja05vRXhpc3Qobm86IG51bWJlcik6IGJvb2xlYW4ge1xuXG4gICAgICAgIGxldCBkYXRhID0gVG9vbHMuR2V0QXJyRGF0YShcIm5vXCIsIG5vLCB0aGlzLnVzZXJEYXRhLnBvb2wpO1xuICAgICAgICBpZiAoZGF0YS5sZXZlbCA9PSAtMSAmJiBkYXRhLnN0YXRlID09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnlKjmiLfpgZPlhbfmlbDph49cbiAgICAgKiBAcGFyYW0gdHlwZSDnsbvlnotcbiAgICAgKi9cbiAgICBHZXRQcm9wTnVtKHR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF0YTogcHJvcEluZm8gPSBUb29scy5HZXRBcnJEYXRhKFwidHlwZVwiLCB0eXBlLCB0aGlzLnVzZXJEYXRhLnByb3ApO1xuICAgICAgICByZXR1cm4gZGF0YS5udW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6YGT5YW35oyB57ut5pe26Ze0XG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LXG4gICAgICovXG4gICAgR2V0UHJvcFRpbWUodHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwcm9wRGF0YSA9IHRoaXMucHJvcENvbmZpZztcbiAgICAgICAgY29uc29sZS5sb2cocHJvcERhdGEsICdwcm9wRGF0YScpXG4gICAgICAgIGxldCBkYXRhID0gVG9vbHMuR2V0QXJyRGF0YShcInR5cGVcIiwgdHlwZSwgcHJvcERhdGEpO1xuICAgICAgICByZXR1cm4gTnVtYmVyKGRhdGEudGltZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L2/55So5ZOq5Liq57G75Z6L6YGT5YW3XG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6L6YGT5YW3XG4gICAgICovXG4gICAgVXNlUHJvcCh0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gTnVtYmVyKHR5cGUpIC0gMTtcbiAgICAgICAgLy8gdGhpcy51c2VyRGF0YS5wcm9wW251bV0udGltZSA9IHRoaXMuR2V0UHJvcFRpbWUodHlwZSk7XG4gICAgICAgIHRoaXMudXNlckRhdGEucHJvcFtudW1dLnRpbWUgPSA2MDtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9wW251bV0udXNlID0gcHJvcFN0YXRlLnN0YXJ0O1xuICAgICAgICB0aGlzLnVzZXJEYXRhLnByb3BbbnVtXS5udW0gLT0gMTtcbiAgICAgICAgaWYgKHR5cGUgPT0gcHJvcFR5cGUuY2xzKSB7ICAgICAgICAgICAgICAgICAgICAgICAgIC8v5riF5bGPICAgICAgICAgICAgXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLlRvb2xfRWZmZWN0X05hbWUuR2FtZV9Qcm9wX0Nscyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBwcm9wVHlwZS5hdXRvKSB7ICAgICAgICAgICAgICAgICAgLy/oh6rliqjlkIjmiJBcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuVG9vbF9FZmZlY3RfTmFtZS5HYW1lX1Byb3BfQXR1byk7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IHByb3BUeXBlLnNob2NrKSB7ICAgICAgICAgICAgICAgICAgLy/nlLXlh7tcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuVG9vbF9FZmZlY3RfTmFtZS5HYW1lX1Byb3BfU2hvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gcHJvcFR5cGUuc2hpZWxkKSB7ICAgICAgICAgICAgICAgICAvL+aKpOebvlxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9TaGllbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gcHJvcFR5cGUuZnJvemVuKSB7ICAgICAgICAgICAgICAgICAvL+WGsOWGu1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9Gcm96ZW4pO1xuICAgICAgICB9XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Ub29sX1VzZSwgdHlwZSk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qcm9wSXRlbV9VcGRhdGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuS9v+eUqOaIkOWKn1wiLCB0eXBlLCB0aGlzLnVzZXJEYXRhLnByb3BbbnVtXSwgcHJvcFN0YXRlLnN0YXJ0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blvZPliY3mnIDpq5jnrYnnuqfnmoTngq7loZTmlbDnu4Qy5Liq5Lul5LiK55qEXG4gICAgICovXG4gICAgR2V0VHVycmV0QXV0bygpIHtcbiAgICAgICAgbGV0IHBvb2w6IFBvb2xJbmZvW10gPSBUb29scy5kZWVwQ2xvbmUodGhpcy51c2VyRGF0YS5wb29sKTtcbiAgICAgICAgaWYgKHBvb2wubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xuICAgICAgICBsZXQgc29ydEZuID0gKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGxldCBudW0gPSBiLmxldmVsIC0gYS5sZXZlbDtcbiAgICAgICAgICAgIHJldHVybiBudW07XG4gICAgICAgIH1cbiAgICAgICAgcG9vbCA9IHBvb2wuc29ydChzb3J0Rm4pO1xuICAgICAgICBsZXQgTmV3QXJyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGFyciA9IFRvb2xzLkdldEFyckRhdGEoXCJsZXZlbFwiLCBwb29sW2ldLmxldmVsLCBwb29sLCAtMSk7XG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA+IDEgJiYgdGhpcy5jaGVja1VwZGF0ZUxldmVsKGFyclswXS5sZXZlbCArIDEpKSB7XG4gICAgICAgICAgICAgICAgTmV3QXJyID0gYXJyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChOZXdBcnIubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvKirmo4Dmn6XmnIDpq5ggKi9cbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVXBkYXRlTGV2ZWwoTmV3QXJyWzBdLmxldmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHBvb2wgPSBudWxsO1xuICAgICAgICByZXR1cm4gTmV3QXJyLnNsaWNlKDAsIDIpO1xuICAgIH1cblxuICAgIC8qKuiOt+WPlueUqOaIt+W9k+WJjeaPkOeOsOmHkeminSAqL1xuICAgIGZpbmRHb2xkQ2FzaCgpIHtcbiAgICAgICAgbGV0IGNhc2ggPSB0aGlzLnVzZXJEYXRhLmNvaW4gLyB0aGlzLnVzZXJEYXRhLmV4Y2hhbmdlUmF0ZSB8fCAwXG4gICAgICAgIHJldHVybiBUZXh0Q3RyLnRyaWdnZXJOdW1iZXIoY2FzaClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlj5HpgIHlv6vnhadcbiAgICAgKi9cbiAgICBzZW5kVHVycmV0RGF0YShjYWxsPzogRnVuY3Rpb24pIHtcblxuICAgICAgICBpZiAodGhpcy5pc1NlbmRUdXJyZXREYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5pyq5Yiw5Y+R6YCB5b+r54Wn5pe26Ze0O1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTZW5kVHVycmV0RGF0YSA9IHRydWU7XG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcblxuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5idXlDb3VudCA+IDAgfHwgdGhpcy51c2VyRGF0YS5jb21wb3VuZFRpbWVzKSB7XG4gICAgICAgICAgICBkYXRhLnVzZXJNYXBEZXRhaWwgPSB0aGlzLnVzZXJEYXRhLnBvb2w7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmJ1eUNvdW50ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxhc3REYXRhLmNvbXBvdW5kVGltZXMgIT09IHRoaXMudXNlckRhdGEuY29tcG91bmRUaW1lcyAmJiB0aGlzLnVzZXJEYXRhLmNvbXBvdW5kVGltZXMgPiAwKSB7XG4gICAgICAgICAgICBkYXRhLmNvbXBvdW5kVGltZXMgPSB0aGlzLnVzZXJEYXRhLmNvbXBvdW5kVGltZXM7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmNvbXBvdW5kVGltZXMgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhc3REYXRhLmhpZ2hlc3RCYXR0ZXJ5TGV2ZWwgIT09IHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWwpIHtcbiAgICAgICAgICAgIGRhdGEuaGlnaGVzdEJhdHRlcnlMZXZlbCA9IHRoaXMudXNlckRhdGEudHVycmV0TGV2ZWw7XG4gICAgICAgICAgICB0aGlzLmxhc3REYXRhLmhpZ2hlc3RCYXR0ZXJ5TGV2ZWwgPSB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLnRlcm1Db2luID4gMCkge1xuICAgICAgICAgICAgZGF0YS5wb2ludCA9IHRoaXMudXNlckRhdGEudGVybUNvaW47XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLnRlcm1Db2luID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sYXN0RGF0YS51c2VyQmF0dGVyeU51bSAhPT0gdGhpcy51c2VyRGF0YS5wcm9kdWN0ICYmIHRoaXMudXNlckRhdGEucHJvZHVjdCA+IDApIHtcbiAgICAgICAgICAgIGRhdGEudXNlckJhdHRlcnlOdW0gPSB0aGlzLnVzZXJEYXRhLnByb2R1Y3Q7XG4gICAgICAgICAgICB0aGlzLmxhc3REYXRhLnVzZXJCYXR0ZXJ5TnVtID0gdGhpcy51c2VyRGF0YS5wcm9kdWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudXNlckRhdGEucmVzaXN0QXR0YWNrVGltZXMgPiAwKSB7XG4gICAgICAgICAgICBkYXRhLnJlc2lzdEF0dGFja1RpbWVzID0gdGhpcy51c2VyRGF0YS5yZXNpc3RBdHRhY2tUaW1lcztcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEucmVzaXN0QXR0YWNrVGltZXMgPSAwO1xuICAgICAgICB9XG5cblxuICAgICAgICBYTVNESy50cmFja1VzZXJQcm9wZXJ0aWVzKHtcbiAgICAgICAgICAgIGNvaW5fYmFsYW5jZTogdGhpcy51c2VyRGF0YS5jb2luICsgXCLph5HluIFcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VyRGF0YS52ZXJzaW9uICs9IDE7XG4gICAgICAgIGRhdGEudmVyc2lvbiA9IHRoaXMudXNlckRhdGEudmVyc2lvbjtcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KGRhdGEpID09IFwie31cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzU2VuZFR1cnJldERhdGEgPSBmYWxzZTtcbiAgICAgICAgfSwgMzAwMCk7XG5cbiAgICAgICAgdGhpcy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ2FtZUxldmVsUmVwb3J0LFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2hlY2tUYXNrUmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn1wiKVxuICAgICAgICAgICAgICAgIGNhbGwgJiYgY2FsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOWksei0pVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph5HluIHlv6vnhadcbiAgICAgKi9cblxuICAgIHNlbmRDb2luRGF0YShjYWxsPzogRnVuY3Rpb24pIHtcblxuICAgICAgICBpZiAodGhpcy5pc1NlbmRDb2luRGF0YSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzU2VuZENvaW5EYXRhID0gdHJ1ZTtcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHt9O1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS50ZXJtQ29pbiA+IDApIHtcbiAgICAgICAgICAgIGRhdGEucG9pbnQgPSB0aGlzLnVzZXJEYXRhLnRlcm1Db2luO1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS50ZXJtQ29pbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51c2VyRGF0YS52ZXJzaW9uICs9IDE7XG4gICAgICAgIGRhdGEudmVyc2lvbiA9IHRoaXMudXNlckRhdGEudmVyc2lvbjtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzU2VuZENvaW5EYXRhID0gZmFsc2U7XG4gICAgICAgIH0sIDMwMDApO1xuICAgICAgICB0aGlzLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nYW1lTGV2ZWxSZXBvcnQsXG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg6YeR5biB5oiQ5YqfXCIpXG4gICAgICAgICAgICAgICAgY2FsbCAmJiBjYWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg6YeR5biB5aSx6LSlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN562J57qn54Ku5aGU55qE5aSp6ZmN6YeR5biB5pe26Ze0XG4gICAgICovXG4gICAgR2V0SGVhdmVuVGltZSgpOiBudW1iZXIge1xuXG4gICAgICAgIC8vIGxldCBjb2luRGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLmNvaW5EYXRhKTtcbiAgICAgICAgLy8gLy/lvZPliY3mnIDpq5jnrYnnuqfnmoTngq7loZRcbiAgICAgICAgLy8gbGV0IGxldmVsOiBudW1iZXIgPSB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsO1xuICAgICAgICAvLyAvL+m7mOiupDYwc1xuICAgICAgICAvLyBsZXQgdGltZTogbnVtYmVyID0gNjA7XG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgY29pbkRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgIGxldCBpdGVtID0gY29pbkRhdGFbaV07XG4gICAgICAgIC8vICAgICBpZiAoaXRlbS5taW4gPD0gbGV2ZWwgJiYgaXRlbS5tYXggPj0gbGV2ZWwpIHtcbiAgICAgICAgLy8gICAgICAgICB0aW1lID0gaXRlbS50aW1lO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IFRvb2xzLkdldFJhbmRvbSgzMCwgNjApO1xuXG4gICAgICAgIHJldHVybiB0aW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWkqemZjemHkeW4geeahOS9jee9riDmsqHmnInnrKblkIjlsLFudWxsXG4gICAgICovXG4gICAgR2V0SGVhdmVuUGxhY2UoKTogbnVtYmVyIHtcbiAgICAgICAgLy/nqbrnmoTkvY3nva5cbiAgICAgICAgbGV0IGVtcHR5UGxhY2UgPSBUb29scy5HZXRBcnJEYXRhKFwibGV2ZWxcIiwgLTEsIHRoaXMudXNlckRhdGEucG9vbCwgLTEpO1xuICAgICAgICBpZiAoIWVtcHR5UGxhY2UpIHJldHVybiBudWxsO1xuICAgICAgICAvL+espuWQiOeahOS9jee9rlxuICAgICAgICBsZXQgY29uZm9ybVBsYWNlID0gVG9vbHMuR2V0QXJyRGF0YShcInN0YXRlXCIsIDEsIGVtcHR5UGxhY2UsIC0xKTtcbiAgICAgICAgaWYgKCFjb25mb3JtUGxhY2UpIHJldHVybiBudWxsO1xuXG4gICAgICAgIC8v56ym5ZCI55qE5pWw57uEXG4gICAgICAgIGxldCBuZXdBcnIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25mb3JtUGxhY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY29uZm9ybVBsYWNlW2ldO1xuICAgICAgICAgICAgbGV0IGhlYXZlbkl0ZW0gPSBUb29scy5HZXRBcnJEYXRhKFwibm9cIiwgaXRlbS5ubywgdGhpcy51c2VyRGF0YS5oZWF2ZW5Qb29sKTtcbiAgICAgICAgICAgIGxldCBpc0hhdmVFbXB0eUJveCA9IGhlYXZlbkl0ZW0ubm8gPT0gdGhpcy51c2VyRGF0YS5lbXB0eUJveE5vO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS5ubyA9PSBoZWF2ZW5JdGVtLm5vICYmIGhlYXZlbkl0ZW0uaWQgPT0gbnVsbCAmJiAhaXNIYXZlRW1wdHlCb3gpIHtcbiAgICAgICAgICAgICAgICBuZXdBcnIucHVzaChpdGVtLm5vKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+maj+acuuS4gOS4qlxuICAgICAgICBsZXQgcmFuZG9tTnVtID0gVG9vbHMuR2V0UmFuZG9tKDAsIG5ld0Fyci5sZW5ndGggLSAxKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycltyYW5kb21OdW1dO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W54Ku5by55pWw5o2uXG4gICAgICovXG4gICAgR2V0QnVsbGV0RGF0YSh0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5nZXRKc29uKE5hbWVUcy5idWxsZXREYXRhKTtcbiAgICAgICAgcmV0dXJuIFRvb2xzLkdldEFyckRhdGEoXCJ0eXBlXCIsIHR5cGUsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlueIhueCuOWQjeWtl1xuICAgICAqL1xuICAgIEdldEJvb21OYW1lKHR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLmJ1bGxldERhdGEpO1xuICAgICAgICByZXR1cm4gVG9vbHMuR2V0QXJyRGF0YShcInR5cGVcIiwgdHlwZSwgZGF0YSkuYm9vbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbpoobov4flrp3nrrEgXG4gICAgICog5aaC5p6c56ym5ZCI5bCx6L6T5Ye65a6d566xaWQg5LiN56ym5ZCI5bCxbnVsbFxuICAgICovXG4gICAgY2hlY2tUcmVhc3VyZVNob3coKTogbnVtYmVyIHtcbiAgICAgICAgWE1TREsucG9zdCh7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LnRyZWFzdXJlQm94X0lzZ2V0LFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSAmJiByZXMuZGF0YS5zaG93Qm94ICE9IDEpIHsgICAgICAgLy/pooblj5bov4dcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLnRyZWFzdXJlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmVhc3VyZUlkOiBudW1iZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm1pbiA8PSB0aGlzLnVzZXJEYXRhLnR1cnJldExldmVsICYmIGl0ZW0ubWF4ID4gdGhpcy51c2VyRGF0YS50dXJyZXRMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWFzdXJlSWQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmVhc3VyZUlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGVja0lkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkID09IHRyZWFzdXJlSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNFeGlzdDogYm9vbGVhbiA9IHRoaXMudXNlckRhdGEuaGF2ZVRyZWFzdXJlLnNvbWUoY2hlY2tJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0V4aXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmVhc3VyZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkv53lrZjlrp3ol4/nirbmgIFcbiAgICAgKiBAcGFyYW0gaWQgaWRcbiAgICAgKi9cbiAgICBzYXZlVHJlYXN1cmVEYXRhKGlkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGNoZWNrSWQgPSAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT0gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlzRXhpc3Q6IGJvb2xlYW4gPSB0aGlzLnVzZXJEYXRhLmhhdmVUcmVhc3VyZS5zb21lKGNoZWNrSWQpO1xuXG4gICAgICAgIGlmIChpc0V4aXN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5a6d6JeP5a2Y5Zyo6L+H5LqGXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5oYXZlVHJlYXN1cmUucHVzaChpZCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0b3JhZ2UoXCJoYXZlVHJlYXN1cmVcIiwgdGhpcy51c2VyRGF0YS5oYXZlVHJlYXN1cmUpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWtmOacrOWcsOaVsOaNrlxuICAgICAqIEBwYXJhbSBrZXkg6ZSu5ZCNXG4gICAgICogQHBhcmFtIHZhbHVlIOWAvFxuICAgICAqL1xuICAgIHNldFN0b3JhZ2Uoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgbGV0IGRhdGFTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIC8vbGV0IGVuY3J5cHRlZCA9IGVuY3J5cHQuZW5jcnlwdChkYXRhU3RyaW5nLHRoaXMuc2VjcmV0a2V5LDI1Nik7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGRhdGFTdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluacrOWcsOWAvFxuICAgICAqIEBwYXJhbSBrZXkg6ZSu5ZCNXG4gICAgICovXG4gICAgZ2V0U3RvcmFnZShrZXk6IHN0cmluZykge1xuICAgICAgICBsZXQgY2lwaGVyVGV4dCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICBpZiAoY2lwaGVyVGV4dCA9PSBudWxsIHx8IGNpcGhlclRleHQgPT0gXCJcIiB8fCBjaXBoZXJUZXh0ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy9sZXQgdmFsdWUgPSBKU09OLnBhcnNlKGVuY3J5cHQuZGVjcnlwdChjaXBoZXJUZXh0LHRoaXMuc2VjcmV0a2V5LDI1NikpO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShjaXBoZXJUZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDop6PplIHmlrDlnLDmlrlcbiAgICAgKi9cbiAgICB1bmxvY2tQbGFjZSgpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlckRhdGEucG9vbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnVzZXJEYXRhLnBvb2xbaV07XG4gICAgICAgICAgICBpZiAoaXRlbS5zdGF0ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wb29sW2ldLnN0YXRlID0gMTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuino+mUgeaWsOS9jee9rlwiLCBpdGVtLm5vKTtcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVW5sb2NrX1BsYWNlLCBpdGVtLm5vKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdXJsIOWcsOWdgFxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxuICAgICAqIEBwYXJhbSBjYWxsIOWbnuiwg1xuICAgICAqL1xuICAgIHBvc3Qob2JqOiB7IHVybDogc3RyaW5nLCBkYXRhPzogYW55LCBzdWNjZXNzPzogRnVuY3Rpb24sIGZhaWw/OiBGdW5jdGlvbiB9KSB7XG5cbiAgICAgICAgWE1TREsucG9zdCh7XG4gICAgICAgICAgICB1cmw6IG9iai51cmwsXG4gICAgICAgICAgICBkYXRhOiBvYmouZGF0YSxcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuivt+axguaIkOWKn1wiICsgb2JqLnVybCwgcmVzKVxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvYmouc3VjY2VzcyAmJiBvYmouc3VjY2VzcyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYmouZmFpbCAmJiBvYmouZmFpbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcbiAgICAgICAgICAgICAgICBvYmouZmFpbCAmJiBvYmouZmFpbChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICBnZXRkYXRhU3RyKG9iajogeyB1cmw6IHN0cmluZywgZGF0YT86IGFueSwgc3VjY2Vzcz86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24gfSkge1xuXG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBvYmoudXJsLFxuICAgICAgICAgICAgZGF0YTogb2JqLmRhdGEsXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor7fmsYLmiJDlip9cIiArIG9iai51cmwsIHJlcylcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnN1Y2Nlc3MgJiYgb2JqLnN1Y2Nlc3MocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmZhaWwgJiYgb2JqLmZhaWwoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG4gICAgICAgICAgICAgICAgb2JqLmZhaWwgJiYgb2JqLmZhaWwoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5Yik5pat5piv5ZCm5b2T5aSpXG4gICAgICovXG5cbiAgICBjaGVrY1RvZGF5KCkge1xuICAgICAgICBsZXQgZGF5ID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gICAgICAgIGxldCBpc0RheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAoZGF5ID09IHRoaXMudXNlckRhdGEuR2V0RGF5VGltZSkge1xuICAgICAgICAgICAgaXNEYXkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNEYXkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RvcmFnZSh0aGlzLmxvY2FsRGlhcnkuR2V0RGF5VGltZSwgZGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc0RheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpooTliqDovb3lub/lkYpcbiAgICAgKiBAcGFyYW0gcG9zIOS9jee9rlxuICAgICAqIEBwYXJhbSBpc1ZpZXcg5piv5ZCm5Li65L+h5oGv5rWBXG4gICAgICovXG5cbiAgICBwcmVsb2FkQWQocG9zLCBpc1ZpZXc6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMuYWRQcmVPYmpbcG9zXSkge1xuICAgICAgICAgICAgdGhpcy5hZFByZU9ialtwb3NdID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChpc1ZpZXcpIHtcbiAgICAgICAgICAgICAgICBBZENvbnRyb2xsZXIucHJlVmlld0FkKHBvcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIEFkQ29udHJvbGxlci5wcmVWaWRlb0FkKHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9vVwiICsgKGlzVmlldyA/IFwi5L+h5oGv5rWBXCIgOiBcIuinhumikVwiKSArIHBvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hZFByZU9ialtwb3NdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliKDpmaRcIiArIChpc1ZpZXcgPyBcIuS/oeaBr+a1gVwiIDogXCLop4bpopFcIikgKyBwb3MgKyBcIuiusOW9lVwiKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrnqbrlnLDlrp3nrrFcbiAgICAgKi9cbiAgICBzaG93RW1wdHlCb3goKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmVtcHR5Qm94Tm8gPCAwKSB7XG4gICAgICAgICAgICBsZXQgbG9jYXRpb246IG51bWJlciA9IHRoaXMuY2hlY2tQb29sKCk7XG4gICAgICAgICAgICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuayoeacieS9jee9rlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEuZW1wdHlCb3hObyA9IGxvY2F0aW9uO1xuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5TaG93X0VtcHR5X0JveCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnrKzkuIDkuKrku7vliqFcbiAgICAgKi9cbiAgICBnZXRGaXN0VGFzayhjYWxsOiBGdW5jdGlvbikge1xuICAgICAgICAvL+S7u+WKoeWujOaIkOmhuuW6j1xuICAgICAgICBsZXQgdGFza09yZGVyMTogbnVtYmVyW10gPSBbMiwgNywgNCwgOCwgNl07XG4gICAgICAgIGxldCB0YXNrT3JkZXIyOiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0XTtcbiAgICAgICAgLy/ku7vliqHnsbvlnosgMDrml6XluLggMTrmiJDlsLFcbiAgICAgICAgbGV0IHRhc2tUeXBlOiBudW1iZXIgPSBudWxsO1xuICAgICAgICAvL+espuWQiOeahOS7u+WKoVxuICAgICAgICBsZXQgc3RyID0gW107XG5cbiAgICAgICAgbGV0IGNoZWNrVGFzayA9IChhcnIpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRhc2tUeXBlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjYWxsKG51bGwsIHRhc2tUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvcmRlciA9IHRhc2tUeXBlID09IDAgPyB0YXNrT3JkZXIxIDogdGFza09yZGVyMjtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlci5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdHIubGVuZ3RoOyBqKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXJbaV0gPT0gc3RyW2pdLnRhc2tUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsKHN0cltqXSwgdGFza1R5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QudGFza19kYXlfbWFpbixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMubGlzdDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS50YXNrVHlwZSA9PSAyICYmIHRoaXMudXNlckRhdGEubG9jYWxDb21wb3VuZFRpbWUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckRhdGEubG9jYWxDb21wb3VuZFRpbWUgPSBsaXN0W2ldLnVzZXJUYXNrVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS5idXR0b25UeXBlICE9PSA0ICYmIGxpc3RbaV0udGFza1R5cGUgIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrVHlwZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyLnB1c2gobGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXNrVHlwZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5hY2hpZXZlbWVudF9tYWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMubGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMubGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2ldLmJ1dHRvblR5cGUgIT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza1R5cGUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyLnB1c2gobGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tUYXNrKHN0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVGFzayhzdHIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+R6YCB55yL6KeG6aKR6I635Y+W54Ku5aGU6K6w5b2VXG4gICAgICovXG4gICAgc2VuZFR1cnJldE51bSgpIHtcbiAgICAgICAgdGhpcy5wb3N0KHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3Qud2F0Y2hWaWRlb0FkZEJhdHRlcnksXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLorrDlvZXnnIvop4bpopHojrflvpfngq7loZTku7vliqFcIilcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVGFza191cGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiusOW9leeci+inhumikeiOt+W+l+eCruWhlOS7u+WKoeWksei0pVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldFRlbXBQYXJtKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnRlbXBQYXJtW25hbWVdID0gdmFsdWVcbiAgICB9XG5cbiAgICBnZXRUZW1wUGFybShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcFBhcm1bbmFtZV1cbiAgICB9XG5cbiAgICBnZXRNYXBkYXRhKGJpZ21hcCkge1xuICAgICAgICBsZXQgZGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLmdrRGF0YSk7XG4gICAgICAgIGxldCBud2RhdGEgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2ldW1wibGV2ZWxOb1wiXSA9PSBiaWdtYXAgKyBcIlwiKSB7XG4gICAgICAgICAgICAgICAgbndkYXRhLnB1c2goZGF0YVtpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbndkYXRhXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5Li6YueUqOaIt1xuICAgICAqL1xuICAgIGNoZWNrVGVzdEIobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB1c2VyOiBzdHJpbmcgPSBBc3Npc3RDdHIuaXNBVGVzdCgpID8gXCJBXCIgOiBcIkJcIjtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW9k+WJjeeUqOaIt++8mlwiICsgdXNlcik7XG4gICAgICAgIC8vIGxldCB2YWxpdWUgPSB0aGlzLkFCX1Rlc3RbbmFtZV1bdXNlcl07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5b2T5YmN55So5oi3MjIyMu+8mlwiICsgdmFsaXVlKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5BQl9UZXN0W25hbWVdW3VzZXJdID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKuemu+e6v+WinuWKoOeCruWhlOasoeaVsCovXG4gICAgb2ZmbGluZVR1cnJldFByb2R1Y3QoKSB7XG4gICAgICAgIC8v5b2T5YmN5pe26Ze0XG4gICAgICAgIGxldCBub3dUaW1lOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgLy/kuIrkuIDmrKHml7bpl7RcbiAgICAgICAgbGV0IGxhc3RUaW1lOiBudW1iZXIgPSB0aGlzLmdldFN0b3JhZ2UodGhpcy5sb2NhbERpYXJ5Lm9mZmxpbmVUaW1lKSB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgLy/mr48zMOenkuS4gOS4qiDmjaLnrpdcbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IE1hdGguZmxvb3IoKG5vd1RpbWUgLSBsYXN0VGltZSkgLyAxMDAwIC8gMzApO1xuICAgICAgICBjb25zb2xlLmxvZygn56a757q/5aKe5YqgJyArIHRpbWUgKyBcIuS4queCruWhlCznprvnur/ml7bpl7TkuLrvvJpcIiArIChub3dUaW1lIC0gbGFzdFRpbWUpIC8gMTAwMCk7XG4gICAgICAgIGlmICh0aW1lIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy51c2VyRGF0YS5wcm9kdWN0ICsgdGltZSA+IDIwKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJEYXRhLnByb2R1Y3QgPSB0aGlzLnVzZXJEYXRhLnByb2R1Y3QgPiAyMCA/IHRoaXMudXNlckRhdGEucHJvZHVjdCA6IDIwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0VHVycmV0KHRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RvcmFnZSh0aGlzLmxvY2FsRGlhcnkub2ZmbGluZVRpbWUsIG51bGwpO1xuICAgIH1cblxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBuZXcgdXRpbCgpOyJdfQ==