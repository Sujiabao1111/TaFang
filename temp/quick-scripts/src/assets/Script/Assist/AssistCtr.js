"use strict";
cc._RF.push(module, '67573FQFuJC4rHah/hjaHuj', 'AssistCtr');
// Script/Assist/AssistCtr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistCtr = void 0;
var AdPosition_1 = require("../common/AdPosition");
var NameTs_1 = require("../common/NameTs");
var PropConst_1 = require("../common/PropConst");
var AdController_1 = require("../server/xmsdk_cocos/AD/AdController");
var AdUtil_1 = require("../server/xmsdk_cocos/AD/AdUtil");
var AppInfo_1 = require("../server/xmsdk_cocos/Config/AppInfo");
var util_1 = require("../util/util");
exports.AssistCtr = {
    cloneObject: function (obj) {
        var cache = [];
        var str = JSON.stringify(obj, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // 移除
                    return;
                }
                // 收集所有的值
                cache.push(value);
            }
            return value;
        });
        cache = null; // 清空变量，便于垃圾回收机制回收
        return JSON.parse(str);
    },
    nodeToWorld: function (pos, node) {
        return node.convertToWorldSpaceAR(pos);
    },
    worldToNode: function (worldPos, node) {
        return node.convertToNodeSpaceAR(worldPos);
    },
    formatDate: function (date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
    },
    /**
     *
     * @param value 秒
     */
    formatSeconds: function (value) {
        var result = parseInt(value);
        var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
        var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
        var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        var res = '';
        //res += `${h}:`;
        res += m + ":";
        res += "" + s;
        return res;
    },
    //距离24点还有多久
    formatData24: function () {
        var date = new Date();
        var temphh = 23 - date.getHours();
        var tempMinutes = 59 - date.getMinutes();
        var tempSeconds = 59 - date.getSeconds();
        var hh = (temphh < 10 ? '0' + temphh : temphh) + ':';
        var mm = (tempMinutes < 10 ? '0' + tempMinutes : tempMinutes) + ':';
        var ss = (tempSeconds < 10 ? '0' + tempSeconds : tempSeconds);
        return hh + mm + ss;
    },
    convertNumber: function (num) {
        if (num === void 0) { num = 0; }
        if (typeof num != 'number') {
            num = Number(num);
        }
        if (isNaN(num)) {
            num = 0;
        }
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + 'w';
        }
        else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    },
    findPropSprite: function (type, keyId, sucCall, errCall) {
        if (type == PropConst_1.REWARD_TYPE.PROPS) {
            if (PropConst_1.PROPS[keyId]) {
                cc.resources.load("ActivyResource/Image/Prop/" + PropConst_1.PROPS[keyId].icon, cc.SpriteFrame, function (err, spriteFrame) {
                    if (err) {
                        if (errCall)
                            errCall;
                    }
                    ;
                    if (sucCall)
                        sucCall(spriteFrame);
                });
            }
        }
        else {
            if (PropConst_1.POINT[keyId]) {
                cc.resources.load("ActivyResource/Image/Point/" + PropConst_1.POINT[keyId].name, cc.SpriteFrame, function (err, spriteFrame) {
                    if (err) {
                        if (errCall)
                            errCall;
                    }
                    ;
                    if (sucCall)
                        sucCall(spriteFrame);
                });
            }
        }
        return null;
    },
    removeEleFromArray: function (ele, arr) {
        var index = arr.indexOf(ele);
        if (index >= 0) {
            arr.splice(index, 1);
        }
        return arr;
    },
    hasEleInArray: function (ele, arr) {
        return arr.indexOf(ele) > -1;
    },
    findArrInArr: function (arr1, arr2) {
        var arr = [];
        for (var m in arr2) {
            if (arr2[m] && arr1.indexOf(arr2[m]) > -1) {
                arr.push(arr2[m]);
            }
        }
        return arr;
    },
    findArrNoArr: function (arr1, arr2) {
        var arr = [];
        for (var m in arr2) {
            if (arr2[m] && arr1.indexOf(arr2[m]) == -1) {
                arr.push(arr2[m]);
            }
        }
        return arr;
    },
    playAnimate: function (spriteFrame, startNode, target, callback) {
        var canvasNode = cc.director.getScene().getChildByName('Canvas');
        var startPos = canvasNode.convertToNodeSpaceAR(startNode.convertToWorldSpaceAR(cc.v2(0, 0)));
        var endPos = canvasNode.convertToNodeSpaceAR(target.convertToWorldSpaceAR(cc.v2(0, 0)));
        var node = new cc.Node();
        //node.setContentSize(136, 136);
        node.zIndex = 2001;
        node.setPosition(startPos);
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        sprite.type = cc.Sprite.Type.SIMPLE;
        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        sprite.trim = false;
        node.scale = 1;
        node.parent = canvasNode;
        var actions = [];
        var midPos = cc.v2(startPos.x + 150, startPos.y - 150);
        var bezier = [startPos, midPos, endPos];
        var bezierTo = cc.bezierTo(0.5, bezier);
        var scaleTo = cc.scaleTo(0.5, 0.3, 0.3);
        actions.push(cc.delayTime(0.3));
        actions.push(cc.spawn(scaleTo, bezierTo));
        actions.push(cc.fadeOut(0.2));
        actions.push(cc.callFunc(function () {
            node.destroy();
            callback && callback(target);
        }));
        node.runAction(cc.sequence(actions));
    },
    showToastTip: function (msg) {
        var _this = this;
        if (this.isShowMsg)
            return;
        this.isShowMsg = true;
        setTimeout(function () {
            _this.isShowMsg = false;
        }, 1500);
        cc.director.emit(NameTs_1.default.Show_Toast, msg);
    },
    //检查插屏概率
    checkIsOpenInserAd: function (id, isLoad) {
        if (isLoad === void 0) { isLoad = true; }
        var random = Math.random();
        var isPlay = false;
        AdUtil_1.AdUtil.inserAdIsPlay["inserAd" + id] = true;
        if (id == AdPosition_1.AdPosition.SignAwardInsert) {
            if (id == AdPosition_1.AdPosition.SignAwardInsert && !util_1.default.userData.newUser) {
                if (random <= 0.5) {
                    isPlay = true;
                }
            }
        }
        AdUtil_1.AdUtil.inserAdIsPlay["inserAd" + id] = isPlay;
        if (AdUtil_1.AdUtil.inserAdIsPlay["inserAd" + id] == true && isLoad) {
            AdUtil_1.AdUtil.loadAdVideo(id);
            console.log("\u9884\u52A0\u8F7D\u5E7F\u544Aid" + id + "\u9884\u52A0\u8F7D\u4E86");
        }
        console.log("\u9884\u52A0\u8F7D\u5E7F\u544Aid" + id + ",\u662F\u5426\u8981\u9884\u52A0\u8F7D\u4E86" + isLoad + ",\u968F\u673A\u5230\u7684\u6982\u7387" + random);
    },
    //加载插屏视频
    loadAdInsertVideo: function (adPosition, suc) {
        if (suc === void 0) { suc = function () { }; }
        if (AdUtil_1.AdUtil.inserAdIsPlay["inserAd" + adPosition]) {
            AdController_1.default.loadAd(AdPosition_1.AdPosition.SignAwardInsert, suc);
        }
    },
    //特殊图鉴处理
    checkTuJian: function (level) {
        var tempTuJian = [5, 9, 11, 17, 22, 25, 30, 34, 29, 28, 38];
        for (var i = 0; i < tempTuJian.length; i++) {
            if (tempTuJian[i] == level) {
                return true;
            }
        }
        return false;
    },
    //检查当前等级替换的地图
    checkLvBg: function (curLv) {
        var mapData = [
            { mapId: 1, minLv: 1, maxLv: 15, color: "#BB420E" },
            { mapId: 2, minLv: 16, maxLv: 42, color: "#BB420E" },
            { mapId: 1, minLv: 43, maxLv: 69, color: "#BB420E" },
            { mapId: 1, minLv: 70, maxLv: 9999, color: "#1C83BC" },
        ];
        for (var i = 0; i < mapData.length; i++) {
            if (curLv >= mapData[i].minLv && curLv <= mapData[i].maxLv) {
                return mapData[i];
            }
        }
        return mapData[mapData.length - 1];
    },
    //排序
    sortArray: function (sortArray, compareProperty, targetArray) {
        targetArray.sort(function (a, b) {
            var aScore = 100;
            var bScore = 100;
            for (var i = 0; i < sortArray.length; i++) {
                if (a[compareProperty] != null && b[compareProperty] != null) {
                    if (a[compareProperty] == sortArray[i]) {
                        aScore = aScore * i;
                    }
                    if (b[compareProperty] == sortArray[i]) {
                        bScore = bScore * i;
                    }
                }
            }
            return aScore - bScore;
        });
    },
    isATest: function () {
        return AppInfo_1.getPhead().ab_user_type == "A";
    },
};

cc._RF.pop();