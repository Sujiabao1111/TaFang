import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import { POINT, PROPS, REWARD_TYPE } from "../common/PropConst";
import turret from "../game/turret/turret";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import { AdUtil } from "../server/xmsdk_cocos/AD/AdUtil";
import { getPhead } from "../server/xmsdk_cocos/Config/AppInfo";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import util from "../util/util";

export const AssistCtr = {

    cloneObject(obj) {//使用json作深度拷贝
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
        return JSON.parse(str)
    },

    nodeToWorld(pos: cc.Vec2, node: cc.Node) {
        return node.convertToWorldSpaceAR(pos)
    },
    worldToNode(worldPos: cc.Vec2, node: cc.Node) {
        return node.convertToNodeSpaceAR(worldPos)
    },

    formatDate(date) {
        var date: any = new Date(date);
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
    formatSeconds(value):string {
        let result = parseInt(value);
        let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

        let res = '';
        //res += `${h}:`;
        res += `${m}:`;
        res += `${s}`;
        return res;     
    },

    //距离24点还有多久
    formatData24():string{        
        var date: any = new Date();        
        let temphh = 23 - date.getHours();
        let tempMinutes = 59 - date.getMinutes();
        let tempSeconds = 59 - date.getSeconds();

        var hh = (temphh < 10 ? '0' + temphh : temphh) + ':';
        var mm = (tempMinutes < 10 ? '0' + tempMinutes : tempMinutes) + ':';
        var ss = (tempSeconds < 10 ? '0' + tempSeconds : tempSeconds);
        return hh + mm + ss;
    },

    convertNumber(num = 0) {
        if (typeof num != 'number') {
            num = Number(num);
        }
        if (isNaN(num)) {
            num = 0;
        }
        if(num >= 10000){
            return  (num / 10000).toFixed(1) + 'w';
        }
        else if(num >= 1000){
            return  (num / 1000).toFixed(1) + 'k';
        }
        return num;
    },

    findPropSprite(type, keyId, sucCall, errCall?) {
        if (type == REWARD_TYPE.PROPS) {
            if (PROPS[keyId]) {
                cc.resources.load(`ActivyResource/Image/Prop/${PROPS[keyId].icon}`, cc.SpriteFrame, function (err, spriteFrame) {
                    if (err) {
                        if (errCall) errCall
                    };
                    if (sucCall) sucCall(spriteFrame);
                });
            }
        } else {
            if (POINT[keyId]) {
                cc.resources.load(`ActivyResource/Image/Point/${POINT[keyId].name}`, cc.SpriteFrame, function (err, spriteFrame) {
                    if (err) {
                        if (errCall) errCall
                    };
                    if (sucCall) sucCall(spriteFrame);
                });
            }

        }
        return null
    },
    removeEleFromArray(ele: any, arr: Array<any>) {
        let index = arr.indexOf(ele)
        if (index >= 0) {
            arr.splice(index, 1)
        }
        return arr
    },
    hasEleInArray(ele: any, arr: Array<any>) {
        return arr.indexOf(ele) > -1
    },
    findArrInArr(arr1, arr2) {//返回arr2和arr1中同时存在的值
        let arr = []
        for (let m in arr2) {
            if (arr2[m] && arr1.indexOf(arr2[m]) > -1) {
                arr.push(arr2[m])
            }
        }
        return arr
    },
    findArrNoArr(arr1, arr2) {//返回arr2中除去arr1的值
        let arr = []
        for (let m in arr2) {
            if (arr2[m] && arr1.indexOf(arr2[m]) == -1) {
                arr.push(arr2[m])
            }
        }
        return arr
    },
    playAnimate(spriteFrame, startNode, target, callback) {
        let canvasNode = cc.director.getScene().getChildByName('Canvas');
        let startPos = canvasNode.convertToNodeSpaceAR(startNode.convertToWorldSpaceAR(cc.v2(0, 0)));
        let endPos = canvasNode.convertToNodeSpaceAR(target.convertToWorldSpaceAR(cc.v2(0, 0)));

        let node = new cc.Node();
        //node.setContentSize(136, 136);
        node.zIndex = 2001;
        node.setPosition(startPos);
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        sprite.type = cc.Sprite.Type.SIMPLE;
        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        sprite.trim = false;
        node.scale = 1;
        node.parent = canvasNode;
        let actions = [];
        let midPos = cc.v2(startPos.x + 150, startPos.y - 150);
        let bezier = [startPos, midPos, endPos];
        let bezierTo = cc.bezierTo(0.5, bezier);
        let scaleTo = cc.scaleTo(0.5, 0.3, 0.3)
        actions.push(cc.delayTime(0.3));
        actions.push(cc.spawn(scaleTo, bezierTo));
        actions.push(cc.fadeOut(0.2))
        actions.push(cc.callFunc(() => {
            node.destroy();
            callback && callback(target);
        }))

        node.runAction(cc.sequence(actions));
    },

    showToastTip(msg: string) {
        if (this.isShowMsg) return
        this.isShowMsg = true
        setTimeout(() => {
            this.isShowMsg = false
        }, 1500);

        cc.director.emit(NameTs.Show_Toast, msg);
    },

    //检查插屏概率
    checkIsOpenInserAd(id, isLoad = true) {
        let random = Math.random();
        let isPlay = false;
        AdUtil.inserAdIsPlay[`inserAd${id}`] = true;

        if (id == AdPosition.SignAwardInsert) {
            if (id == AdPosition.SignAwardInsert && !util.userData.newUser) {
                if (random <= 0.5) {
                    isPlay = true;
                }
            }
        }
        AdUtil.inserAdIsPlay[`inserAd${id}`] = isPlay;

        if (AdUtil.inserAdIsPlay[`inserAd${id}`] == true && isLoad) {
            AdUtil.loadAdVideo(id);
            console.log(`预加载广告id${id}预加载了`);
        }
        console.log(`预加载广告id${id},是否要预加载了${isLoad},随机到的概率${random}`);
    },

    //加载插屏视频
    loadAdInsertVideo(adPosition: number, suc = () => { }) {
        if (AdUtil.inserAdIsPlay[`inserAd${adPosition}`]) {
            AdController.loadAd(AdPosition.SignAwardInsert, suc);
        }
    },

    //特殊图鉴处理
    checkTuJian(level) {
        let tempTuJian = [5, 9, 11, 17, 22, 25, 30, 34, 29, 28, 38];
        for (let i = 0; i < tempTuJian.length; i++) {
            if (tempTuJian[i] == level) {
                return true;
            }
        }
        return false;
    },

    //检查当前等级替换的地图
    checkLvBg(curLv: number) {
        let mapData = [
            { mapId: 1, minLv: 1, maxLv: 15, color: "#BB420E" },
            { mapId: 2, minLv: 16, maxLv: 42, color: "#BB420E" },
            { mapId: 1, minLv: 43, maxLv: 69, color: "#BB420E" },
            { mapId: 1, minLv: 70, maxLv: 9999, color: "#1C83BC" },         
        ]

        for (let i = 0; i < mapData.length; i++) {
            if (curLv >= mapData[i].minLv && curLv <= mapData[i].maxLv) {
                return mapData[i];
            }
        }
        return mapData[mapData.length - 1];
    },  

    //排序
    sortArray(sortArray, compareProperty:string, targetArray){
        targetArray.sort((a, b)=>{
            let aScore = 100;
            let bScore = 100;
            for(let i = 0; i < sortArray.length; i++){
                if(a[compareProperty] != null && b[compareProperty] != null){
                    if(a[compareProperty] == sortArray[i]){
                        aScore = aScore * i;
                    }
                    if(b[compareProperty] == sortArray[i]){
                        bScore = bScore * i;
                    }
                }
            }
            return aScore - bScore;
        })
    },

    isATest() {//是否为AB中的A用户
        return getPhead().ab_user_type == "A"
    },

}