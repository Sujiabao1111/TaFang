
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '206145o74dFQLeRbCmkBzmq', 'AdController');
// Script/server/xmsdk_cocos/AD/AdController.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameTs_1 = require("../../../common/NameTs");
var pageTs_1 = require("../../../common/pageTs");
var util_1 = require("../../../util/util");
var XMSDK_1 = require("../XMSDK");
var AdUtil_1 = require("./AdUtil");
var AdviewUtil_1 = require("./AdviewUtil");
var AdController = /** @class */ (function () {
    function AdController() {
    }
    //普通广告
    AdController.loadAd = function (position, callback, failback) {
        console.log(position, '播放视频');
        if (true) {
            callback && callback();
            return;
        }
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameAdLoading);
        AdUtil_1.AdUtil.loadAd(position, function (res) {
            console.log("检查", JSON.stringify(res), position);
            if (AdUtil_1.AdUtil.isViewFinished(res) && res.position == position) {
                setTimeout(function () {
                    console.log("播放视频广告成功");
                    util_1.default.advertising_num++;
                    XMSDK_1.default.trackUserProperties({
                        coin_balance: util_1.default.advertising_num,
                    });
                    cc.game.emit(NameTs_1.default.Game_SavingPost_AddCoin);
                    callback && callback();
                }, 200);
            }
            else if (res.status == AdController.AD_CODE.LOAD_FAIL) {
                failback && failback();
            }
        });
    };
    AdController.loadInsertAd = function (position, callback) {
        if (true) {
            callback && callback();
            return;
        }
        cc.game.emit(NameTs_1.default.Game_Pop_Open, pageTs_1.default.pageName.GameAdLoading);
        AdUtil_1.AdUtil.loadAd(position, function (res) {
            // console.log("接收loadAd", res)
            setTimeout(function () {
                console.log("检查", res, position);
                if (AdUtil_1.AdUtil.isViewFinished(res, true) && res.position == position) {
                    console.log("播放插屏广告成功");
                    callback && callback();
                }
            }, 200);
        });
    };
    AdController.loadInfoAd = function (position, adBoxWidth, adBox, isGdtMinAd) {
        if (isGdtMinAd === void 0) { isGdtMinAd = false; }
        console.log("asfasfas11" + position);
        if (true) {
            return;
        }
        console.log("调用loadInfoad:" + position);
        // cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameAdLoading);
        AdviewUtil_1.AdviewUtil.loadAd(position, adBoxWidth, adBox, isGdtMinAd);
    };
    AdController.hideInfoAd = function (position) {
        AdviewUtil_1.AdviewUtil.hideAd(position);
    };
    AdController.showAd = function (position) {
        AdUtil_1.AdUtil.showAd(position);
    };
    /**预加载视频或者插屏 */
    AdController.preVideoAd = function (position) {
        AdUtil_1.AdUtil.loadAdVideo(position);
    };
    /**预加载信息流 */
    AdController.preViewAd = function (position) {
        var adBoxWidth = 636; // 一般固定为636
        AdviewUtil_1.AdviewUtil.loadPreAd(position, adBoxWidth);
        console.log("asfasfas22" + position);
    };
    AdController.AD_CODE = {
        LOAD_SUCCESS: 1,
        LOAD_FAIL: 2,
        CLICK_AD: 3,
        SHOW_SUCCESS: 4,
        SHOW_FAIL: 5,
        CLOSE_AD: 6,
        REWARD_SUCCESS: 9,
    };
    return AdController;
}());
exports.default = AdController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBRFxcQWRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsaURBQTRDO0FBQzVDLGlEQUE0QztBQUM1QywyQ0FBc0M7QUFDdEMsa0NBQTZCO0FBQzdCLG1DQUFrQztBQUNsQywyQ0FBMEM7QUFFMUM7SUFBQTtJQWtGQSxDQUFDO0lBdEVHLE1BQU07SUFDQyxtQkFBTSxHQUFiLFVBQWMsUUFBZ0IsRUFBRSxRQUFrQixFQUFFLFFBQW1CO1FBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzVCLElBQUksSUFBSSxFQUFFO1lBQ04sUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQ3RCLE9BQU07U0FDVDtRQUNELEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLGVBQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQUMsR0FBRztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ2hELElBQUksZUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRTtnQkFDeEQsVUFBVSxDQUFDO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3hCLGNBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDdkIsZUFBSyxDQUFDLG1CQUFtQixDQUFDO3dCQUN0QixZQUFZLEVBQUUsY0FBSSxDQUFDLGVBQWU7cUJBQ3JDLENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBQzdDLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQTtnQkFDMUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ1g7aUJBQ0ksSUFBRyxHQUFHLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDO2dCQUNqRCxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7YUFDMUI7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTSx5QkFBWSxHQUFuQixVQUFvQixRQUFnQixFQUFFLFFBQWtCO1FBQ3BELElBQUksSUFBSSxFQUFFO1lBQ04sUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQ3RCLE9BQU07U0FDVDtRQUNELEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLGVBQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQUMsR0FBRztZQUN4QiwrQkFBK0I7WUFDL0IsVUFBVSxDQUFDO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDaEMsSUFBSSxlQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRTtvQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtvQkFDdkIsUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFBO2lCQUN6QjtZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVaLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNNLHVCQUFVLEdBQWpCLFVBQWtCLFFBQWdCLEVBQUUsVUFBa0IsRUFBRSxLQUFjLEVBQUUsVUFBa0I7UUFBbEIsMkJBQUEsRUFBQSxrQkFBa0I7UUFDdEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUMsUUFBUSxDQUFDLENBQUE7UUFDbEMsSUFBSSxJQUFJLEVBQUU7WUFDTixPQUFNO1NBQ1Q7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsQ0FBQTtRQUN2QyxxRUFBcUU7UUFDckUsdUJBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUNNLHVCQUFVLEdBQWpCLFVBQWtCLFFBQVE7UUFDdEIsdUJBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUNNLG1CQUFNLEdBQWIsVUFBYyxRQUFnQjtRQUMxQixlQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFDRCxlQUFlO0lBQ1IsdUJBQVUsR0FBakIsVUFBa0IsUUFBZ0I7UUFDOUIsZUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBQ0QsWUFBWTtJQUNMLHNCQUFTLEdBQWhCLFVBQWlCLFFBQWdCO1FBQzdCLElBQUksVUFBVSxHQUFVLEdBQUcsQ0FBQSxDQUFDLFdBQVc7UUFDdkMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUE5RU0sb0JBQU8sR0FBRztRQUNiLFlBQVksRUFBRSxDQUFDO1FBQ2YsU0FBUyxFQUFFLENBQUM7UUFDWixRQUFRLEVBQUUsQ0FBQztRQUNYLFlBQVksRUFBRSxDQUFDO1FBQ2YsU0FBUyxFQUFFLENBQUM7UUFDWixRQUFRLEVBQUUsQ0FBQztRQUNYLGNBQWMsRUFBRSxDQUFDO0tBQ3BCLENBQUE7SUF3RUwsbUJBQUM7Q0FsRkQsQUFrRkMsSUFBQTtrQkFsRm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQERlc2NyaXB0dGlvbjogXG4gKiBAdmVyc2lvbjogXG4gKiBAQXV0aG9yOiBtaWVzXG4gKiBARGF0ZTogMjAyMS0wMS0yNyAxMTo1MDozMFxuICogQExhc3RFZGl0b3JzOiBtaWVzXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIxLTAyLTA4IDEwOjIzOjI2XG4gKi9cbmltcG9ydCB7IEFkUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL0FkUG9zaXRpb25cIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi8uLi8uLi91dGlsL3V0aWxcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vWE1TREtcIjtcbmltcG9ydCB7IEFkVXRpbCB9IGZyb20gXCIuL0FkVXRpbFwiO1xuaW1wb3J0IHsgQWR2aWV3VXRpbCB9IGZyb20gXCIuL0Fkdmlld1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRDb250cm9sbGVyIHtcblxuICAgIHN0YXRpYyBBRF9DT0RFID0ge1xuICAgICAgICBMT0FEX1NVQ0NFU1M6IDEsLy/liqDovb3miJDlip9cbiAgICAgICAgTE9BRF9GQUlMOiAyLC8v5Yqg6L295aSx6LSlXG4gICAgICAgIENMSUNLX0FEOiAzLC8v54K55Ye75oiQ5YqfXG4gICAgICAgIFNIT1dfU1VDQ0VTUzogNCwvL+aYvuekuuaIkOWKn1xuICAgICAgICBTSE9XX0ZBSUw6IDUsLy/mmL7npLrlpLHotKVcbiAgICAgICAgQ0xPU0VfQUQ6IDYsLy/lhbPpl61cbiAgICAgICAgUkVXQVJEX1NVQ0NFU1M6IDksLy/lpZblirHmiJDlip9cbiAgICB9XG5cbiAgICAvL+aZrumAmuW5v+WRilxuICAgIHN0YXRpYyBsb2FkQWQocG9zaXRpb246IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uLCBmYWlsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uLCfmkq3mlL7op4bpopEnKVxuICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1BvcF9PcGVuLCBwYWdlVHMucGFnZU5hbWUuR2FtZUFkTG9hZGluZyk7XG4gICAgICAgIEFkVXRpbC5sb2FkQWQocG9zaXRpb24sIChyZXMpID0+IHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5qOA5p+lXCIsIEpTT04uc3RyaW5naWZ5KHJlcyksIHBvc2l0aW9uKVxuICAgICAgICAgICAgaWYgKEFkVXRpbC5pc1ZpZXdGaW5pc2hlZChyZXMpICYmIHJlcy5wb3NpdGlvbiA9PSBwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaSreaUvuinhumikeW5v+WRiuaIkOWKn1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5hZHZlcnRpc2luZ19udW0rKztcbiAgICAgICAgICAgICAgICAgICAgWE1TREsudHJhY2tVc2VyUHJvcGVydGllcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luX2JhbGFuY2U6IHV0aWwuYWR2ZXJ0aXNpbmdfbnVtLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1NhdmluZ1Bvc3RfQWRkQ29pbik7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihyZXMuc3RhdHVzID09IEFkQ29udHJvbGxlci5BRF9DT0RFLkxPQURfRkFJTCl7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZhaWxiYWNrICYmIGZhaWxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyBsb2FkSW5zZXJ0QWQocG9zaXRpb246IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lQWRMb2FkaW5nKTtcbiAgICAgICAgQWRVdGlsLmxvYWRBZChwb3NpdGlvbiwgKHJlcykgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmjqXmlLZsb2FkQWRcIiwgcmVzKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmo4Dmn6VcIiwgcmVzLCBwb3NpdGlvbilcbiAgICAgICAgICAgICAgICBpZiAoQWRVdGlsLmlzVmlld0ZpbmlzaGVkKHJlcywgdHJ1ZSkgJiYgcmVzLnBvc2l0aW9uID09IHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pKt5pS+5o+S5bGP5bm/5ZGK5oiQ5YqfXCIpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyBsb2FkSW5mb0FkKHBvc2l0aW9uOiBudW1iZXIsIGFkQm94V2lkdGg6IG51bWJlciwgYWRCb3g6IGNjLk5vZGUsIGlzR2R0TWluQWQgPSBmYWxzZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFzZmFzZmFzMTFcIitwb3NpdGlvbilcbiAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwi6LCD55SobG9hZEluZm9hZDpcIiArIHBvc2l0aW9uKVxuICAgICAgICAvLyBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUG9wX09wZW4sIHBhZ2VUcy5wYWdlTmFtZS5HYW1lQWRMb2FkaW5nKTtcbiAgICAgICAgQWR2aWV3VXRpbC5sb2FkQWQocG9zaXRpb24sIGFkQm94V2lkdGgsIGFkQm94LCBpc0dkdE1pbkFkKVxuICAgIH1cbiAgICBzdGF0aWMgaGlkZUluZm9BZChwb3NpdGlvbikge1xuICAgICAgICBBZHZpZXdVdGlsLmhpZGVBZChwb3NpdGlvbilcbiAgICB9XG4gICAgc3RhdGljIHNob3dBZChwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIEFkVXRpbC5zaG93QWQocG9zaXRpb24pXG4gICAgfVxuICAgIC8qKumihOWKoOi9veinhumikeaIluiAheaPkuWxjyAqL1xuICAgIHN0YXRpYyBwcmVWaWRlb0FkKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgQWRVdGlsLmxvYWRBZFZpZGVvKHBvc2l0aW9uKVxuICAgIH1cbiAgICAvKirpooTliqDovb3kv6Hmga/mtYEgKi9cbiAgICBzdGF0aWMgcHJlVmlld0FkKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGFkQm94V2lkdGg6bnVtYmVyID0gNjM2IC8vIOS4gOiIrOWbuuWumuS4ujYzNlxuICAgICAgICBBZHZpZXdVdGlsLmxvYWRQcmVBZChwb3NpdGlvbixhZEJveFdpZHRoKVxuICAgICAgICBjb25zb2xlLmxvZyhcImFzZmFzZmFzMjJcIitwb3NpdGlvbilcbiAgICB9XG5cbn1cbiJdfQ==